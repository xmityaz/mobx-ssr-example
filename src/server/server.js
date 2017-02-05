import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'mobx-react';
// import { runJobs } from 'react-jobs/ssr';
import { Resolver } from "react-resolver";


import express from 'express';

import Root from '../common/components/root';
import appstate from '../common/stores/appstate';
import routes from '../common/routes';

const app = express();
//const appstate = initState();
//console.log(appstate, Date.now());

const renderView = (componentHTML, initialState) => {
    const HTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>MobX Test</title>
                <script>
                    window.__INITIAL_STATE__ = ${ JSON.stringify(initialState)};
                </script>
            </head>
            <body>
                <div id="root">${componentHTML}</div>
                <script type="application/javascript" src="/bundle.js"></script>
            </body>
        </html>
    `;

    return HTML;
};

app.use(express.static(__dirname + '/../../dist/'));

app.get('/api/user', (req, res) => {
    res.json({
        firstName: 'Pablo',
        lastName: 'Escobar'
    });
});


app.use((req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {

        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) return res.status(404).end('Not found');

        // const appstate = new AppState();
        appstate.addItem('foo');
        appstate.addItem('bar');


        const component = (
            <Provider appstate={appstate}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        Resolver.resolve(() => component)
            .then(({ Resolved }) => {
                const componentHTML = renderToString(<Resolved />);
                const initialState = { appstate: appstate.toJson() };
                console.log(initialState);

                res.send(renderView(componentHTML, initialState));
            })

    });
});

app.listen(3000);
