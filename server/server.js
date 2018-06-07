/* global CWD, process */
import express from 'express';
import compression from 'compression';
import path from 'path';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from './../www/js/app/index';

const serverPort = process.env.PORT || 3000; // eslint-disable-line no-process-env

const app = express();

app.use(compression());

app.get(['/', '/app-1'], (req, res) => {
    const context = {};

    const jsx = <StaticRouter context={context} url={req.url}>
        <App/>
    </StaticRouter>;
    // const reactDom = renderToString(jsx);
    // const reduxState = store.getState();
    // const helmetData = Helmet.renderStatic();

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlTemplate(renderToString(jsx)));
});

app.use(express.static(path.resolve(CWD, 'dist')));

app.listen(serverPort);

console.log('Server start to listen:', serverPort);

const hash = Date.now().toString(10);

function htmlTemplate(reactDom) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mobile Hub - SSR</title>
        
            <meta charset="UTF-8"/>
        
            <meta
                name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
        
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <link href="/main.css?${hash}" rel="stylesheet"/>
        </head>
        <body>
            <div class="js-app-wrapper">${reactDom}</div>
            <script src="/main.js?${hash}"></script>
        </body>
        </html>
    `;
}
