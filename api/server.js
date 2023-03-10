'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            const rawData = fs.readFileSync('./api/db.json');
            const myData = JSON.parse(rawData);
            return h.response(myData).type('application/json');
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