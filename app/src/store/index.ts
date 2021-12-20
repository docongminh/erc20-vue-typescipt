import Vue from "vue";
import Vuex from "vuex";
import { ethers } from "ethers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    provider: null,
    contract: null,
    walletAccount: null,
  },
  mutations: {},
  actions: {},
  modules: {},
});
