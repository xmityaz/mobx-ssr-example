import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';

import appstate from '../common/stores/appstate';
import routes from '../common/routes';

// console.log(window.__INITIAL_STATE__);
// const appstate = initState(window.__INITIAL_STATE__);

render(
    <Provider appstate={ appstate }>
        <Router children={ routes } history={ browserHistory } />
    </Provider>,
    document.getElementById('root')
);
