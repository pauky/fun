import React from 'react';
import Router from 'react-router';
import {RouteHandler, Link } from 'react-router';
import http from '../js/module/http.js';
import tip from '../js/module/tip.js';

/**
 *  search page 
 */
class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
    this.userId = this.props.params.id;
  }

  // 在初始化渲染执行之后立刻调用一次
  componentDidMount() {
    var _self = this;
    if (this.userId !== 'null') {
      http.userGetUserInfo(this.userId)
        .then(function (res) {
          if (res.error) {
            return console.log(res);
          }
          _self.setState({
            user: res.result
          })
        })
    }
  }

  // 登出
  userSignOut() {
    http.userSignOut()
      .then(function (res) {
        if (res.error) {
          tip.showTip('登出失败', 2000, 'warn');
          return console.log(res);
        }
        Router.HashLocation.push('/');
      })
  }

  // 发布笑话
  addJoke() {
    let $addJoke = $('.add-joke');
    let title = $addJoke.find('input[name="title"]').val();
    let content = $addJoke.find('textarea[name="content"]').val();
    http.jokeAddJoke(title, content)
      .then(function (res) {
        if (res.error) {
          return console.log(res);
        }
        alert('success');
      })
  }

  render() {
    var
      addJokeHtml = '',
      signOurHtml = '';
    if (this.state.user) {
      // 看自己时
      if (this.state.user._id === window.user._id) {
        addJokeHtml = (
          <div className="add-joke">
            <form action="javascript:;">
              <div className="ui-form-item ui-border-b">
                  <label>
                    标题
                  </label>
                  <input type="text" placeholder="标题" name="title" />
              </div>
              <div className="ui-form-item ui-form-item-textarea ui-border-b">
                  <label>
                      内容
                  </label>
                  <textarea type="text" placeholder="内容" name="content"></textarea>
              </div>
              <div className="ui-btn-wrap">
                <button className="ui-btn-lg ui-btn-primary" onClick={this.addJoke.bind(this)}>
                  发布
                </button>
              </div>
            </form>
          </div>
        );
        signOurHtml = (
          <div>
            <button className="ui-btn-lg ui-btn-danger" onClick={this.userSignOut.bind(this)}>退出登录</button>
          </div>
        );
      }
      return (
        <div className="user-page">
          <div className="ui-avatar-lg user-avatar">
              <span style={{backgroundImage: "url('"+this.state.user.avatar+"')"}}></span>
          </div>
          <div className="username">
            {this.state.user.name}
          </div>
          {addJokeHtml}
          {signOurHtml}
        </div>
      );
    } else {
      return(
        <section className="ui-notice">
          <i></i>
          <p>您还未登录</p>
          <div className="ui-notice-btn">
            <Link to={`/signIn`} className="ui-btn-primary ui-btn-lg">登录</Link>
          </div>
        </section>
      );
    }
    
  }
}

export default Search;