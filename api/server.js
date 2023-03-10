'use strict';

const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const fs = require('fs');

const init = async () => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        "routes": {
            "cors": {
                "origin": ["http://localhost:3000"],
                "headers": ["Accept", "Content-Type"],
                "additionalHeaders": ["X-Requested-With"]
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            try {
                const rawData = fs.readFileSync('./api/db.json');
                const items = JSON.parse(rawData);
                const searchQuery = request.query.search;

                if (searchQuery) {
                    const item = items.filter(item => item.includes(searchQuery));
                    if (!item) {
                        throw Boom.badRequest('Search term not found');
                    }
                    return h.response(item).type('application/json').code(200);
                }
    
                return h.response(items).type('application/json').code(200);
            } catch (err) {
                throw Boom.badRequest(err.message);
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();