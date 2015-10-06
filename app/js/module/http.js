import md5 from 'md5';
import Zepto from '../../lib/zepto.js';
import '../../lib/zeptojs/callbacks.js';
import '../../lib/zeptojs/deferred.js';
let _ooRoot = "";
let _ooApi = "/api";
class Http {
	// 注册
	userSignUp (email, password, name) {
		var _data = {
			url :_ooApi + "/user/signUp",
			type: 'post',
			data:{
				email: email,
				password: md5(password),
				name: name
			}
		};
		return $.ajax(_data);
	}

	// 登录
	userSignIn (email, password) {
		var _data = {
			url :_ooApi + "/user/signIn",
			type: 'post',
			data:{
				email: email,
				password: md5(password)
			}
		};
		return $.ajax(_data);
	}

	// 登出
	userSignOut () {
		var _data = {
			url :_ooApi + "/user/signOut",
			type: 'post'
		};
		return $.ajax(_data);
	}

	// add joke
	jokeAddJoke (title, content) {
		var _data = {
			url :_ooApi + "/joke/addJoke",
			type: 'post',
			data: {
				title: title,
				content: content
			}
		};
		return $.ajax(_data);
	}

	// loadMore joke
	jokeLoadMore (skip, limit) {
		var _data = {
			url :_ooApi + "/joke/loadMore",
			type: 'get',
			data: {
				skip: skip,
				limit: limit
			}
		};
		return $.ajax(_data);
	}

	/**
	 *  搜索
	 * @param type 搜索类型
	 * @param keyword 搜索关键字
	 * @param skip 跳过的条数
	 * @param limit 每次显示条数
	 */
	search (type, keyword, skip, limit) {
		var _data = {
			url :_ooApi + "/search",
			type: 'get',
			data: {
				type: type,
				keyword: keyword,
				skip: skip,
				limit: limit
			}
		};
		return $.ajax(_data);
	}

	/*
	* /api/joke/getJokeDetail
	* 获取joke详情
	* @param joke id
	*/
	jokeGetJokeDetail (id) {
		var _data = {
			url :_ooApi + "/joke/getJokeDetail",
			type: 'get',
			data: {
				id: id
			}
		};
		return $.ajax(_data);
	}

	/**
	 * 评论笑话
	 * URL: `/api/comment/addJokeComment`
	 * @param {String} jokeId 笑话ID
	 * @param {String} content 评论内容
	 * @param {String} replyCommentId 回复评论的ID
	 */
	commentAddJokeComment (jokeId, content, replyCommentId) {
		var _data = {
			url :_ooApi + "/comment/addJokeComment",
			type: 'post',
			data: {
				jokeId: jokeId,
				content: content,
				replyCommentId: replyCommentId
			}
		};
		return $.ajax(_data);
	}

	/**
	*  获取笑话更多评论
	*  URL: `/api/comment/getJokeComment`
	* @param jokeId
	* @param skip
	* @param limit
	* @param req
	* @param res
	* @returns {*|exports|module.exports}
	*/
	commentGetJokeComment(jokeId, skip, limit) {
		var _data = {
			url :_ooApi + "/comment/getJokeComment",
			type: 'post',
			data: {
				jokeId: jokeId,
				skip: skip,
				limit: limit
			}
		};
		return $.ajax(_data);
	}

	/**
	 *  获取用户信息
	 * URL: `/api/user/getUserInfo`
	 * @param id 用户id
	 * **/
	userGetUserInfo(id) {
		var _data = {
			url :_ooApi + "/user/getUserInfo",
			type: 'get',
			data: {
				id: id
			}
		};
		return $.ajax(_data);
	}


}

export default new Http();