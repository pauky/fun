import React from 'react';
import Router from 'react-router';
import {RouteHandler, Link } from 'react-router';

/**
 * router, to hold the state of UI 
 */
class AppRoute extends React.Component {

  navigateBack() {
    Router.History.back();
  }

  render() {
    return (
      <div>
        <header className="ui-header ui-header-positive ui-border-b">
          <i className="ui-icon-return" onClick={this.navigateBack.bind(this)}></i>
          <h1>Fun</h1>
        </header>
        <footer className="ui-footer ui-footer-btn">
          <ul className="ui-tiled ui-border-t">
            <li data-href="index.html" className="ui-border-r">
              <Link to={`/`}>
                <i className="ui-icon-home ui-icon"></i>
                首页
              </Link>
            </li>
            <li data-href="ui.html" className="ui-border-r">
              <Link to={`/search`}>
                <i className="ui-icon-search ui-icon"></i>
                搜索
              </Link>
            </li>
            <li data-href="js.html">
              <Link to={`/user/${window.user ? window.user._id : 'null'}`}>
                <i className="ui-icon-personal ui-icon"></i>
                我
              </Link>
            </li>
          </ul>
        </footer>
        <section className="ui-container">
          <RouteHandler/>
        </section>
      </div>
    );
  }
}

export default AppRoute;