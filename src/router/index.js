import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import phoneIndex from '@/components/phoneIndex.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path: '/',
      redirect: '/phoneIndex' //重定向到登录页面 
    },  
    {
      path: '/index',
      name: 'index',
      component: index
      
    },
    {
      path: '/phoneIndex',
      name: 'phoneIndex',
      component: phoneIndex
      
    }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;
