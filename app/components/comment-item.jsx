import React from 'react';
import {Link} from 'react-router';
import filter from '../js/module/filter.js';

class Item extends React.Component {
  render() {
    let comment = this.props.comment;
    return (
      <li className="ui-border-t">
        <p>
          <Link to={`/user/${comment.userInfo._id}`}>{comment.userInfo.name} </Link>
          <span className="date">{filter.fmtDateTime(comment.lastUpdateTime, 'yyyy-MM-dd hh:mm:ss')}</span>
        </p>
        <h4>{comment.content}</h4>
      </li>
    );    
  }
}

export default Item;