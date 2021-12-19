import Vue from "vue";
import Vuex from "vuex";
import {ethers} from "ethers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    provider: ethers.providers.JsonRpcProvider,
    contract: ethers.Contract,
    walletAccount: "",
  },
  mutations: {},
  actions: {},
  modules: {},
});
