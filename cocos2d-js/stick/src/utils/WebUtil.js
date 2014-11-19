/**
 * Created by Administrator on 2014/9/25.
 */

//获取QueryString的数组
function getQueryString() {
    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
    for (var i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }
    return result;
}


//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

// 获取viewport视口宽度
function getViewportWidth() {
    return window.innerWidth;
}

function getViewportHeight() {
    return window.innerHeight;
}

function getUserAgent() {
    return window.navigator.userAgent;
}

var isLandscape = (getViewportWidth() > getViewportHeight());
// 长宽比 960 / 640 = 1.500; 1136 / 640 = 1.775
var lenWidthRatio = isLandscape ? (getViewportWidth() / getViewportHeight()) : (getViewportHeight() / getViewportWidth());
var designHeight = 1136;
if (lenWidthRatio <= 1.501) {
    designHeight = 960;
}


var errStatUrlPre = "http://203.195.202.83:9000/api/game/stat?";
// var errStatUrlPre = "http://localhost:9000/api/game/stat?";
/**
 * 监视出错信息
 * @param msg
 * @param url
 * @param l    行号
 * @param col  列号（有的浏览器不支持)
 * @param errorObj 错误堆栈
 */
window.onerror = function(msg, url, l, col, errorObj) {
    // 跨域的错误无法处理
    if (msg !== "Script error.") {
        var data = {
            msg: msg,
            url: url,
            row: l,
            col: col,
            stack: errorObj ? errorObj.stack : errorObj
        };
        var url = errStatUrlPre + "cmd=" + 0 + "&data=" + JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
    }

}
