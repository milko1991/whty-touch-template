// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import 'flexible-ty';

import App from './App';
import router from './router';
import store from './store/index';
import api from './api/index';

import {
  WechatPlugin,
  XButton
} from 'vux';

Vue.component('x-button', XButton);
Vue.use(WechatPlugin);

FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
