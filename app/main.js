import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute} from 'react-router';
import AppRoute from './router/approute.jsx';

import CARDS from './handlers/cards.jsx';
import CARD from './handlers/card.jsx'
import SERACH from './handlers/search.jsx';
import USER from './handlers/user.jsx';
import SIGNIN from './handlers/signIn.jsx';
import SIGNUP from './handlers/signUp.jsx';

import SM from './css/frozen.css';
import BASIC from './css/less/basic.less';

import Zepto from './lib/zepto.js';
import SMJS from './lib/frozen.js';


let routes = (
    <Route handler={AppRoute}>
      <DefaultRoute name="cards" handler={CARDS}/>
      <Route name="search" handler={SERACH}/>
      <Route name="user/:id" handler={USER}/>
      <Route name="signIn" handler={SIGNIN}/>
      <Route name="signUp" handler={SIGNUP}/>
      <Route name="card/:id" handler={CARD}/>
    </Route>
);

/**
 * render UIs
 */
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});