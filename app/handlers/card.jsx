import React from 'react';
import Router from 'react-router';
import {RouteHandler, Link } from 'react-router';
import http from '../js/module/http.js';
import tip from '../js/module/tip.js';
import filter from '../js/module/filter.js';
import CommentItem from '../components/comment-item.jsx';

/**
 *  Show all tasks 
 */
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.jokeId = this.props.params.id;
    this.state = {
      joke: {}
    };
    this.commentListParam = {
      limit: 10,
      skip: 10,
      lock: false,
      end: false,
      bot: 40,
      page: 2
    }
    // Router.HashLocation.push('search')
  }

  componentDidMount() {
    var _self = this;
    _self.$comment = $('input[name="comment"');
    http.jokeGetJokeDetail(_self.jokeId)
      .then(function (res) {
        if (res.error) {
          return console.log(res);
        }
        console.log(res);
        res.result.lastUpdateTime = filter.fmtDateTime(res.result.lastUpdateTime, 'yyyy-MM-dd');
        _self.setState({
          joke: res.result
        });
      });
    $(window).scroll(function(){
      if((_self.commentListParam.bot+$(window).scrollTop()) >=($(document).height()-$(window).height())){
        if (_self.commentListParam.lock || _self.commentListParam.end) {
          return false;
        }
        _self.commentListParam.lock = true;
        http.commentGetJokeComment(_self.jokeId, _self.commentListParam.skip, _self.commentListParam.limit)
          .then(function (res) {
            _self.commentListParam.lock = false;
            if (res.error) {
              return console.log(res);
            }
            _self.commentListParam.skip = _self.commentListParam.limit * _self.commentListParam.page;
            _self.commentListParam.page += 1;
            if (res.result.length < _self.commentListParam.limit) {
              _self.commentListParam.end = true;
            }
            _self.state.joke.comments = _self.state.joke.comments.concat(res.result);
            _self.setState({
              joke: _self.state.joke
            });
          });
      }
    });
  }

  // 增加评论
  addComment() {
    var _self = this;
    var content = _self.$comment.val();
    if (!$.trim(content)) {
      return tip.showTip('评论内容不能为空', 2000, 'warn');
    }
    http.commentAddJokeComment(_self.jokeId, content)
      .then(function (res) {
        if (res.error) {
          return console.log(res);
        }
        _self.state.joke.comments.unshift(res.result);
        _self.setState({
          joke: _self.state.joke
        });
        tip.showTip('评论成功', 2000, 'success');
        _self.$comment.val('');
      });
  }

  render() {
    this.state.joke.comments = this.state.joke.comments || [];
    var comments = this.state.joke.comments.map(function (comment) {
      return (
        <CommentItem comment={comment} />
      );
    });
    return (
      <div className="joke-detail-page">
      	<h1 className="title">{this.state.joke.title}</h1>
        <div className="author-and-time">
          <ul className="ui-row">
            <li className="ui-col ui-col-50 author">说笑人: {this.state.joke.authorInfo ? this.state.joke.authorInfo.name : ''}</li>
            <li className="ui-col ui-col-50 time">说笑时间：{this.state.joke.lastUpdateTime}</li>
          </ul>
        </div>
      	<div className="joke-content">
      		<div>{this.state.joke.content}</div>
      	</div>
        <div className="joke-comment">
          <section className="ui-input-wrap ui-border-t">
            <div className="ui-input ui-border-radius">
              <input type="text" name="comment" placeholder="我也说一句..." />
            </div>
            <button className="ui-btn" onClick={this.addComment.bind(this)}>评论</button>
          </section>
          <section className="comments-list">
            <ul className="ui-list ui-list-pure ui-border-tb">
              {comments}
            </ul>
            <div className="ui-loading-wrap" style={{display: this.commentListParam.lock ? '-webkit-box' : 'none'}}>
              <p>加载中</p>
              <i className="ui-loading"></i>
            </div>
          </section>
        </div>
    	</div>
    );
  }
}

export default Card;