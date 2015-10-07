import React from 'react';
import {Link} from 'react-router';

class UserItem extends React.Component {
  render() {
    let user = this.props.user;
    return (
      <li>
        <Link to={`/user/${user._id}`} className="ui-avatar" style={{"display": "block"}}>
          <span style={{"background-image": "url('"+user.avatar+"')"}}></span>
        </Link>
        <Link to={`/user/${user._id}`} className="ui-list-info ui-border-t">
          <h4 className="ui-nowrap">{user.name}</h4>
          <p className="ui-nowrap">{user.detail}</p>
        </Link>
      </li>
    );    
  }
}

export default UserItem;