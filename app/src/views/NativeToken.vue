<template>
  <div
    className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
  >
    <NativeToken />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NativeToken from "../components/NativeToken.vue"; // @ is an alias to /src

@Component({
  components: {
    NativeToken,
  },
})
export default class NativeTokenView extends Vue {}
</script>
