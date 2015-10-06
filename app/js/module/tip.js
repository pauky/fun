
class Tip {
	/*
	* tipContent 提示内容
	* statyTime 提示停留时间
	* type 提示类型
	* cb 关闭时回调
	*/
	showTip(tipContent, stayTime, type, cb) {
    var
      el,
      noop = function () {};
    cb = cb || noop;
    el = $.tips({
        content: tipContent,
        stayTime:2000,
        type: type
    })
    el.on("tips:hide",function() {
      cb();
    })
  }
}

export default new Tip();