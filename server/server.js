import express from 'express';
import path from 'path';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from './www/js/app/index';

const serverPort = 1337;

const app = express();

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

app.use(express.static(path.resolve(__dirname, 'dist')));


app.listen(serverPort);

console.log('Server start to listen:', serverPort);


function htmlTemplate(reactDom) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
        </head>
        
        <body>
            <div class="js-app-wrapper">${reactDom}</div>
            <script src="/main.js"></script>
        </body>
        </html>
    `;
}
