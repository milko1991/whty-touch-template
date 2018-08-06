/*
 * @Author: yigeng
 * @description: {}
 * @Date: 2018-06-13 12:04:29
 * @Last Modified by: yigeng
 * @Last Modified time: 2018-08-03 13:17:49
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  isLoading: false
};
const actions = {
};
const mutations = {
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading;
  }
};
const getters = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
