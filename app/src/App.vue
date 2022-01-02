<template>
  <div id="app">
    <div id="language">
      <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
        {{entry.title}}
      </button>
    </div>  
    <div id="metamask" v-if="status">{{$t('connect')}}: 🟢</div>
    <div id="metamask" v-else>{{$t('connect')}}: 🔴</div>
    <div>
      {{$t('wallet')}}: <span id="wallet">{{ $store.state.walletAccount }} </span>
    </div>
    <div id="nav">
      <router-link to="/">Native Token</router-link> |
      <router-link to="/erc20">ERC20 Token</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ethers, utils } from "ethers";
import i18n from "./plugin/i18n";

declare global {
  export interface Window {
    ethereum: any;
  }
}

@Component
export default class MetamaskConnection extends Vue {
  @Prop() private msg!: string;
  private status = false;
  private languages = [
        { flag: 'us', language: 'en', title: 'English' },
        { flag: 'vi', language: 'vi', title: 'Tiếng Việt' }
      ]
  changeLocale(locale: string): void {
      i18n.locale = locale;
  }
  // request access to the user's MetaMask account
  mounted(): void {
    if (window.ethereum?.request) {
      // connect to metamask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: Array<string>) => {
          this.$store.state.provider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          this.status = true;
          this.$store.state.walletAccount = result[0];
        })
        .catch((error: any): void => {
          console.error(error);
          alert("Please install MetaMask browser extension");
        });
    } else {
      alert(
        "Missing install Metamask. Please access https://metamask.io/ to install extension on your browser"
      );
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#metamask {
  color: #2c3e50;
}

#language button {
  padding: 10px;
  border: 1px solid green;
  font-size: 15px;
  margin: 15px;
}

#wallet {
  font-weight: bold;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
