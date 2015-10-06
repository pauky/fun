import React from 'react/addons';
import http from '../js/module/http.js';
import Item from '../components/item.jsx';
import UserItem from '../components/user-item.jsx';

/**
 *  search page 
 */
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.types = {'uncompleted': 0, 'completed': 1, 'all': 2};
    this.limit = 20;
    this.state = {
      jokes: [],
      searchType: ''
    };
    this.loadingDisplay = 'none';
    this.searchListParam = {
      limit: 20,
      skip: 0,
      lock: false,
      end: false,
      bot: 40,
      page: 1,
      searchType: '',
      keyword: ''
    }
  }

  // 在初始化渲染执行之后立刻调用一次
  componentDidMount() {
    var _self = this;
    $('.ui-searchbar').tap(function(){
        $('.ui-searchbar-wrap').addClass('focus');
        $('.ui-searchbar-input input').focus();
    });
    $('.ui-searchbar-cancel').tap(function(){
        $('.ui-searchbar-wrap').removeClass('focus');
    });
    $(window).scroll(function(){
      if((_self.searchListParam.bot+$(window).scrollTop()) >=($(document).height()-$(window).height())){
        if (_self.searchListParam.lock || _self.searchListParam.end) {
          return false;
        }
        _self.searchListParam.skip = _self.searchListParam.limit * _self.searchListParam.page;
        _self.getSearchRes();
      }
    });
  }

  getSearchRes(skip) {
    var _self = this;
    _self.searchListParam.lock = true;
    http.search(
      _self.searchListParam.searchType,
      _self.searchListParam.keyword,
      _self.searchListParam.skip,
      _self.searchListParam.limit)
      .then(function (res) {
        if (res.error) {
          return console.log(res);
        }
        _self.searchListParam.lock = false;
        if (res.result.result.data.length < _self.searchListParam.limit) {
          _self.searchListParam.end = true;
        }
        if (_self.state.searchType === res.result.type) {
          _self.setState({
            jokes: _self.state.jokes.concat(res.result.result.data),
            searchType: res.result.type
          });
        } else {
          _self.setState({
            jokes: res.result.result.data,
            searchType: res.result.type
          });
        }
      })
  }

  onSearchInputKeyDown(e) {
    var _self = this;
    if (e.charCode === 13) {
      _self.searchListParam.lock = false;
      _self.searchListParam.end = false;
      _self.searchListParam.searchType = $('input[name="searchType"]:checked').val();
      _self.searchListParam.keyword = e.target.value;
      _self.searchListParam.skip = 0;
      this.getSearchRes();
    }
  }

  render() {
    let taskList = this.state.jokes;
    let tasks = [];
    switch (this.state.searchType) {
      case 'joke':
        tasks = taskList.map(function(task) {
          return (
            <Item joke={task}/>
          );
        });
        break;
      case 'user':
        tasks = taskList.map(function(user) {
          return (
            <UserItem user={user}/>
          );
        });
        break;
    }
    
    return (
      <section className="search-page">
        <div className="ui-searchbar-wrap ui-border-b">
            <div className="ui-searchbar ui-border-radius">
                <i className="ui-icon-search"></i>
                <div className="ui-searchbar-text">搜索号码（2-10位）</div>
                <div className="ui-searchbar-input">
                  <input onKeyPress={this.onSearchInputKeyDown.bind(this)} />
                </div>
                <i className="ui-icon-close"></i>
            </div>
            <button className="ui-searchbar-cancel">取消</button>
        </div>
        <div className="search-type">
          <div className="ui-form-item ui-form-item-radio ui-border-b">
            <label className="ui-radio" for="searchType">
                <input type="radio" name="searchType" defaultChecked defaultValue="joke" />
            </label>
            <p>搜索笑话</p>
          </div>
          <div className="ui-form-item ui-form-item-radio ui-border-b">
            <label className="ui-radio" for="searchType">
                <input type="radio" name="searchType" defaultValue="user" />
            </label>
            <p>搜索用户</p>
          </div>
        </div>
        <section id="list">
          <ul className="ui-list ui-list-link ui-border-tb">
          {tasks}
          </ul>
          <div className="ui-loading-wrap" style={{display: this.searchListParam.lock ? '-webkit-box' : 'none'}}>
            <p>加载中</p>
            <i className="ui-loading"></i>
          </div>
        </section>
      </section>
    );
  }
}

export default Search;