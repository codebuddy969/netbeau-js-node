"use strict";

const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");
const Joi = require("joi");
const fs = require("fs");

const init = async () => {
    const FILE_PATH = "./api/db.json";

    const server = Hapi.server({
        port: 3001,
        host: "localhost",
        routes: {
            cors: {
                origin: ["http://localhost:3000"],
                headers: ["Accept", "Content-Type"],
                additionalHeaders: ["X-Requested-With"],
            },
        },
    });

    server.route({
        method: "POST",
        path: "/",
        handler: async (request, h) => {
            try {
                const {item} = request.payload;

                fs.readFile(FILE_PATH, "utf8", (error, data) => {
                    if (error) {
                        throw Boom.badRequest("Failed to read the file!");
                    }

                    const dataArray = JSON.parse(data);

                    dataArray.push(item);

                    fs.writeFile(
                        FILE_PATH,
                        JSON.stringify(dataArray),
                        "utf8",
                        (error) => {
                            if (error) {
                                throw Boom.badRequest(
                                    "Failed to write the file!"
                                );
                            }
                        }
                    );
                });

                return h
                    .response({message: "Item added successfully!"})
                    .code(201);
            } catch (error) {
                console.error(error);
                return h.response("Internal server error").code(500);
            }
        },
        options: {
            validate: {
                payload: Joi.object({
                    item: Joi.string().min(2).max(10),
                }),
            },
        },
    });

    server.route({
        method: "GET",
        path: "/",
        handler: (request, h) => {
            try {
                const rawData = fs.readFileSync(FILE_PATH);
                const items = JSON.parse(rawData);
                const searchQuery = request.query.search;

                if (searchQuery) {
                    const item = items.filter((item) =>
                        item.includes(searchQuery)
                    );
                    if (!item) {
                        throw Boom.badRequest("Search term not found");
                    }
                    return h.response(item).type("application/json").code(200);
                }

                return h.response(items).type("application/json").code(200);
            } catch (err) {
                throw Boom.badRequest(err.message);
            }
        },
    });

    server.route({
        method: "GET",
        path: "/jsonplaceholder-data",
        handler: async (request, h) => {
            const fetch = (await import('node-fetch')).default;

            const url = "https://jsonplaceholder.typicode.com/posts";
            const controller = new AbortController();
            const signal = controller.signal;
            const timeout = setTimeout(() => {
                controller.abort();
            }, 5000);

            try {
                const response = await fetch(url, {signal});
                const data = await response.json();
                return h.response(data).type("application/json").code(200);
            } catch (error) {
                console.log(error.name === "AbortError" ? "Request timed out" : `Request failed: ${error}`);
            } finally {
                clearTimeout(timeout);
            }
        },
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();
