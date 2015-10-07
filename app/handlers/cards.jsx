import React from 'react';
import Item from '../components/item.jsx';
import http from '../js/module/http.js';
import {RouteHandler, Link } from 'react-router';

/**
 *  Show all cards 
 */
class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
    this.loadingDisplay = '-webkit-box';
  }

  // getInitialState() {
  //   console.log('getInitialState');
  //   return {
  //     jokes: []
  //   };
  // }

  componentDidMount() {
    var _self = this;
    let lock = false;
    let end = false;
    let bot = 40;
    let skip = 0;
    let limit = 10;
    let page = 1;
    // 加载更多笑话的公共方法
    function loadMore() {
      lock = true;
      http.jokeLoadMore(skip, limit)
        .then(function (res) {
          lock = false;
          if (res.error) {
            return console.log(res);
          }
          skip = limit * page;
          page += 1;
          if (res.result.data.length < limit) {
            end = true;
            _self.loadingDisplay = 'none';
          }
          _self.setState({
            jokes: _self.state.jokes.concat(res.result.data)
          });
        });
    }
    loadMore();
    // 监听窗口滚动条滚动，加载更多笑话
    $(window).scroll(function(){
      if((bot+$(window).scrollTop()) >=($(document).height()-$(window).height())){
        if (lock || end) {
          return false;
        }
        loadMore();
      }
    });
  }

  render() {

    let taskList = this.state.jokes;

    let tasks = taskList.map(function(task) {
      return (
        <Item joke={task}/>
      );
    });

    return (
      <section id="list">
        <ul className="ui-list ui-list-link ui-border-tb">
        {tasks}
        </ul>
        <div className="ui-loading-wrap" style={{display: this.loadingDisplay}}>
          <p>加载中</p>
          <i className="ui-loading"></i>
        </div>
      </section>
    );

  }
}

export default Cards;