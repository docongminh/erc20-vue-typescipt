<template>
  <Erc20Token />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Erc20Token from "../components/Erc20Token.vue"; // @ is an alias to /src

@Component({
  components: {
    Erc20Token,
  },
})
export default class Erc20TokenView extends Vue {}
</script>
