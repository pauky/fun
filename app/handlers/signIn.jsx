import React from 'react';
import {RouteHandler, Link } from 'react-router';
import http from '../js/module/http.js';
import regularExpression from '../js/module/regular-expression.js';
import tip from '../js/module/tip.js';

/**
 *  search page 
 */
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.types = {'uncompleted': 0, 'completed': 1, 'all': 2};
  }

  userSignIn() {
    let $signInForm = $('.sign-in-form');
    let email = $signInForm.find('input[name="email"]').val();
    let password = $signInForm.find('input[name="password"]').val();
    if (!email) {
      return tip.showTip('邮箱不能为空', 2000, 'warn');
    }
    if (!password) {
      return tip.showTip('密码不能为空', 2000, 'warn');
    }
    if (!regularExpression.emailRegExp.test(email)) {
      return tip.showTip('邮箱格式错误，如：example@qq.com', 2000, 'warn');
    }
    http.userSignIn(email, password)
      .then(function (res) {
        if (res.error) {
          switch (res.errorCode) {
            case 1001:
              tip.showTip('账号不存在', 2000, 'warn');
              break;
            case 1002:
              tip.showTip('密码错误', 2000, 'warn');
              break;
          }
          return console.log(res);
        }
        window.location.reload();
      })
  }

  render() {
    return (
      <div className="ui-form ui-border-t sign-in-form">
        <form action="javascript:;">
          <div className="ui-form-item ui-border-b">
              <label>
                  账号
              </label>
              <input type="text" placeholder="邮箱" name="email" />
          </div>
          <div className="ui-form-item ui-form-item-textarea ui-border-b">
              <label>
                  密码
              </label>
              <input type="password" placeholder="密码" name="password" />
          </div>
          <div className="ui-btn-wrap">
            <button className="ui-btn-lg ui-btn-primary" onClick={this.userSignIn.bind(this)}>
              登录
            </button>
            <Link className="sign-up-link" to={`/signUp`}>
              去注册
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;