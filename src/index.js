'use strict';

const dotenv = require('dotenv');
dotenv.config();

const redirectTime = process.env.REDIRECT_TIME;
const baseURL = process.env.PROJECT_URL;
const pixel = process.env.FB_PIXEL_ID;
const port = process.env.SERVER_PORT;


const Hapi = require('@hapi/hapi');
const fs = require('fs');
const rawpage = fs.readFileSync('src/redirect.html', 'utf8');
let replacedPage = rawpage.replace(/PIXEL_REPLACE/g, pixel);
replacedPage = replacedPage.replace(/TIME_REPLACE/g, redirectTime);
const initialPage = replacedPage;


const init = async () => {
    const server = new Hapi.server({
        port: port,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            let fullURL = baseURL + "?";
            for(const [k,v] of Object.entries(request.query)) {
                fullURL = fullURL + k + "=" + v + "&"
            }
            const finalPage = initialPage.replace(/LINK_REPLACE/g, fullURL);

            return h.response(finalPage);

        }
    });

    console.log("Starting server...");
    await server.start();
    console.log('Server running on %s', server.info.uri);
}


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
