import React from 'react';
import {Link} from 'react-router';

class Item extends React.Component {
  openDetail () {
    require.ensure([], () => {
      var Profile = require('../js/lib/kk.js');
    });
  }
  render() {
    let joke = this.props.joke;
    return (
      <li className="ui-border-t">
        <Link to={`/card/${joke._id}`} className="ui-list-img" style={{"display": "block"}}>
          <span style={{"backgroundImage": "url('"+joke.photo+"')"}}></span>
        </Link>
        <Link to={`/card/${joke._id}`} className="ui-list-info">
          <h4 className="ui-nowrap">{joke.title}</h4>
          <p className="ui-nowrap">{joke.content}</p>
        </Link>
      </li>
    );    
  }
}

export default Item;