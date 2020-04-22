//获取LocalStorage
export function getLocalStorage(key, _this) {
    // console.log(localStorage.getItem(key));
    var exp = 60 * 60 * 3 * 1000; // 三小时的毫秒数
    if (localStorage.getItem(key)!="undefined") {
        var vals = localStorage.getItem(key); // 获取本地存储的值 
        var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
        // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间 
        var isTimed = (new Date().getTime() - dataObj) > exp;
        // console.log(isTimed)
        if (isTimed) {
            localStorage.removeItem(key);
            _this.$router.push({
                name: "login"
            });
        } else {
            _this.$router.push({
                name: "enterpriseRecommend"
            });
        }
    }
}