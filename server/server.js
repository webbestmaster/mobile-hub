/* global CWD, process */
import express from 'express';
import compression from 'compression';
import path from 'path';

import React from 'react';
import {renderToString, renderToNodeStream} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from './../www/js/app/index';

const serverPort = process.env.PORT || 3000; // eslint-disable-line no-process-env

const app = express();

app.use(compression());

// <template part>
const hash = Date.now().toString(10);

const templateBegin = `<!DOCTYPE html>
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
            <div class="js-app-wrapper">`;

const templateEnd = `</div>
            <script src="/main.js?${hash}"></script>
        </body>
        </html>`;

// </template part>

app.get(['/', '/app-1'], (req, res) => {
    const context = {key: 'the router static context'};

    const jsx = <StaticRouter context={context} url={req.url}>
        <App/>
    </StaticRouter>;

    res.writeHead(200, {'Content-Type': 'text/html'});

    const stream = renderToNodeStream(jsx);

    res.write(templateBegin);

    stream.pipe(res, {end: false});
    stream.on('end', () => {
        res.write(templateEnd);
        res.end();
    });

    stream.on('error', () => {
        res.write('<h1>Smth wrong</h1>' + templateEnd);
        res.end();
    });

    // res.end([templateBegin, renderToString(jsx), templateEnd].join(''));
});

app.use(express.static(path.resolve(CWD, 'dist')));

app.listen(serverPort);

console.log('Server start to listen:', serverPort);
