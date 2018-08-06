/*
 * @Author: yigeng
 * @description: {} 开发环境下使用同步组件、生产环境下使用异步组件 //! important!!!
 * @Date: 2018-06-13 13:58:04
 * @Last Modified by: yigeng
 * @Last Modified time: 2018-08-06 14:14:33
 */

import Vue from 'vue';
import Router from 'vue-router';

import store from '../store/index';
import HelloWorld from '@/components/HelloWorld'; // 同步加载路由组件
// const HelloWorld = () => import(/* webpackChunkName:'HelloWorld' */ '@/components/HelloWorld'); // 异步加载路由组件

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
});

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true});
  next();
});

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false});
});

export default router;
