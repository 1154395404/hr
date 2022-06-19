/*
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /!* has no token*!/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
*/
import router from "@/router"
import store from "@/store"
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';

const whiteList = ['/login', '/404'];// * 设置守卫白名单
/*
 next()放过
  next（false） 跳转终止
  next（地址） 跳转某个地址
 */
router.beforeEach((to, from, next) => {
  nprogress.start();
  if (store.getters.token) {// * 如果有token
    if (to.path === '/login') {// * 如果跳转的路径为 login 就跳转首页
      next('/')
    } else {// * 否则 直接放行
      next();
    }
  } else {// * 如果没有token
    if (whiteList.includes(to.path)) {// * 如果在白名单直接放行
      next();
    } else {
      next('/login');
    }
  }
  nprogress.done();
})
router.afterEach(() => {

})
