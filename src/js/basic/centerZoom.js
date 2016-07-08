function getParam() {
    var paramStr = location.search.replace(/^\?/, '');
    var paramArr = paramStr.split('&');
    var paramObj = {}
    for (var i in paramArr) {
        var params = paramArr[i].split('=');
        if (!params[0]) continue
        paramObj[params[0]] = params[1];
    }
    return paramObj;
}

var centerZoom = function (map) {
    if(!map) return false;
    
}

export default centerZoom;