<template>
  <div className="mt-10 relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      className="lg:flex md:flex text-xl justify-center items-center mx-auto border-orange-500 max-w-2xl py-4 px-4"
    >
      <div className="font-semibold p-2">
        <span className="text-gray-800">Transfer ETH</span>
      </div>
    </div>

    <div
      className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 flex flex-col"
    >
      <input type="text" required v-model="addrTransfer" placeholder="To" />
      <input type="number" required v-model="amount" placeholder="amount" />
      <button
        className="btn btn-green mt-1"
        type="button"
        @click="sendNativeToken"
      >
        Send token
      </button>

      <hr className="mt-4" />

      <input type="text" required v-model="addrBalance" placeholder="Address" />
      <button className="btn btn-green mt-1" type="button" @click="getBalance">
        Balance
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ethers, utils } from "ethers";

@Component
export default class NativeToken extends Vue {
  @Prop() private msg!: string;
  private addrTransfer = "";
  private addrBalance = "";
  private amount = "";

  async getBalance(): Promise<void> {
    if (ethers.utils.isAddress(this.addrBalance)) {
      const nativebalance = await this.$store.state.provider.getBalance(
        this.addrBalance
      );
      alert(`native balance: ${ethers.utils.formatEther(nativebalance)}`);
      console.log(`native balance: ${ethers.utils.formatEther(nativebalance)}`);
    }
  }
  //
  sendNativeToken(): void {
    if (
      this.$store.state.provider !== null &&
      ethers.utils.isAddress(this.addrTransfer)
    ) {
      // send a transaction to the token contract
      const signer = this.$store.state.provider.getSigner();
      const tx = {
        to: this.addrTransfer,
        value: ethers.utils.parseEther(this.amount),
      };
      console.log(tx);
      signer
        .sendTransaction(tx)
        .then((result: any) => {
          alert(`Transaction hash: ${result.hash}`);
          this.$store.state.provider
            .getBalance(this.$store.state.walletAccount)
            .then((balance: any) => {
              alert(`Balance after: ${ethers.utils.formatEther(balance)}`);
              console.log(
                `Balance after: ${ethers.utils.formatEther(balance)}`
              );
            });
        })
        .catch((error: any) => {
          console.error(`Fail Send Token ${error}`);
          // If the request fails, the Promise will reject with an error.
        });
    }
  }
}
</script>
