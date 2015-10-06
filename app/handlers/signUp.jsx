import React from 'react';
import {RouteHandler, Link } from 'react-router';
import http from '../js/module/http.js';
import tip from '../js/module/tip.js';
import regularExpression from '../js/module/regular-expression.js';
/**
 *  search page 
 */
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.types = {'uncompleted': 0, 'completed': 1, 'all': 2};
  }

  signUp() {
    let $signUPForm = $('.sign-up-form');
    let email = $signUPForm.find('input[name="email"]').val();
    let username = $signUPForm.find('input[name="username"]').val();
    let password = $signUPForm.find('input[name="password"]').val();
    let repeatPassword = $signUPForm.find('input[name="repeatPassword"]').val();
    if (!email) {
      return tip.showTip('邮箱不能为空', 2000, 'warn');
    }
    if (!regularExpression.emailRegExp.test(email)) {
      return tip.showTip('邮箱格式错误，如：example@qq.com', 2000, 'warn');
    }
    if (!username) {
      return tip.showTip('用户名不能为空', 2000, 'warn');
    }
    if (!password) {
      return tip.showTip('密码不能为空', 2000, 'warn');
    }
    if (password !== repeatPassword) {
      return tip.showTip('两次密码不一致', 2000, 'warn');
    }
    http.userSignUp(email, password, username)
      .then(function (res) {
        if (res.error) {
          switch (res.errorCode) {
            case 1003:
              tip.showTip('账号已存在', 2000, 'warn');
              break;
          }
        }
        console.log(res);
      })
  }

  render() {
    return (
      <div className="ui-form ui-border-t sign-up-form">
        <form action="javascript:;">
          <div className="ui-form-item ui-border-b">
              <label>
                  账号
              </label>
              <input type="text" placeholder="邮箱" name="email" />
          </div>
          <div className="ui-form-item ui-border-b">
              <label>
                  用户名
              </label>
              <input type="text" placeholder="用户名" name="username" />
          </div>
          <div className="ui-form-item ui-form-item-textarea ui-border-b">
              <label>
                  密码
              </label>
              <input type="password" placeholder="密码" name="password" />
          </div>
          <div className="ui-form-item ui-form-item-textarea ui-border-b">
              <label>
                  重复密码
              </label>
              <input type="password" placeholder="重复密码" name="repeatPassword" />
          </div>
          <div className="ui-btn-wrap">
            <button className="ui-btn-lg ui-btn-primary" onClick={this.signUp.bind(this)}>
              注册
            </button>
            <Link to={`/signIn`} className="sign-in-link">
              去登录
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;