import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//创建Vuex实例
const store = new Vuex.Store({

  state: {
    // 存储token
    Token: localStorage.getItem('Token') ? localStorage.getItem('Token') : '',
    // 存储token的时间，判断时效
    TokenTime: localStorage.getItem('TokenTime') ? localStorage.getItem('TokenTime') : '',
    // 存用户名
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    // 存菜单权限
    menuid: localStorage.getItem('menuid') ? localStorage.getItem('menuid') : '',
    //页面公用收藏数
    collectNum: 0,
    tokenStatus: true
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, token) {
      state.Token = token.Token;
      localStorage.setItem('Token', token.Token);
    },
    // 存token时，同时存入时间
    changeTokentime(state, time) {
      state.TokenTime = time.TokenTime;
      localStorage.setItem('TokenTime', time.TokenTime);
    },
    //存用户名
    changeName(state, user) {
      state.username = user.username;
      localStorage.setItem('username', user.username);
    },
    //存菜单权限
    changeMenuid(state, menuid) {
      state.menuid = menuid.menuid;
      localStorage.setItem('menuid', menuid.menuid);
    },
    //删除token
    del_token() {
      console.log('删除token');
    },
    //页面增加收藏数
    addCollect(state) {
      state.collectNum += 1;
    },
    //页面减少收藏数
    reduceCollect(state) {
      if (state.collectNum > 0) {
        state.collectNum -= 1;
      }
    },
    updateTokenStatus(state, bool) {
      state.tokenStatus = bool
    }
  }

});

export default store;
