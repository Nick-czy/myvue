exports.install = function (Vue) {
  Vue.prototype.commonTipsError = function (result) {
    this.$message({
      message: result,
      type: "error"
    });
  };
  Vue.prototype.commonTipsSuccess = function (result) {
    this.$message({
      message: result,
      type: "success"
    });
  };
  Vue.prototype.commonTips = function (result) {
    this.$message({
      message: result
    });
  };
  Vue.prototype.commonEncryptCode = function (result) {
    // console.log(result);
    // console.log(this.$crypto.AES.encrypt(result,localStorage.getItem('Token')).toString());
    var encryptcode =this.$crypto.AES.encrypt(result,localStorage.getItem('Token')).toString();
    return encodeURIComponent(encryptcode);
    // return result;
  };
  Vue.prototype.commonDecryptCode = function (result) {
    // console.log(result);
    // console.log(this.$crypto.AES.decrypt(result,localStorage.getItem('Token')).toString(CryptoJS.enc.Utf8));
    var decryptcode =decodeURIComponent(result);
    decryptcode =this.$crypto.AES.decrypt(decryptcode,localStorage.getItem('Token')).toString(this.$crypto.enc.Utf8)
    // console.log(decryptcode);
    return decryptcode;
    // return result;
  };
  
  // //防抖
  // Vue.prototype.debounce = function (fn, wait) {
  //   console.log(wait)
  //   let timeout = null
  //   return function () {
  //     if (timeout !== null) clearTimeout(timeout)
  //     timeout = setTimeout(fn, wait);
  //   }
  // }
  // //节流
  // Vue.prototype.throttle = function () {
  //   let that = this
  //   let now = +new Date();
  //   if (lastTime && lastTime - now < 1000) {
  //     clearTimeout(timer)
  //   }
  //   timer = setTimeout(function () {
  //     console.log('点击')
  //     lastTime = +new Date()
  //   }, 200)
  // }
}
