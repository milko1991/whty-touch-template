/*
 * @Author: yigeng
 * @description: {} 开发环境下使用同步组件、生产环境下使用异步组件 //! important!!!
 * @Date: 2018-06-13 13:58:04
 * @Last Modified by: Yiool
 * @Last Modified time: 2018-12-29 17:38:42
 */

import Vue from 'vue';
import Router from 'vue-router';

import store from '../store/index';
// import HelloWorld from '@/components/HelloWorld'; // 同步加载路由组件
// const HelloWorld = () => import(/* webpackChunkName:'HelloWorld' */ '@/components/HelloWorld'); // 异步加载路由组件

Vue.use(Router);

// 场景变量
// const IS_IN_JXB = process.env.SCENE === 'jxb';
// const IS_IN_WECHAT = process.env.SCENE === 'wechat';

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'Index',
    component: () => import('@/pages/Index')
  }, {
    path: '/helloWord',
    name: 'HelloWorld',
    component: () => import('@/components/HelloWorld')
  }]
});

router.beforeEach(function (to, from, next) {
  next();
});

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  });
});

export default router;
