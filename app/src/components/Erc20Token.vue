<template>
  <div className="mt-10 relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      className="lg:flex md:flex text-xl justify-center items-center mx-auto border-orange-500 max-w-2xl py-4 px-4"
    >
      <div className="font-semibold p-2">
        <span className="text-gray-800">{{ $t('transfertToken')}}</span>
      </div>
    </div>
    <div
      className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 flex flex-col"
    >
      <input
        type="text"
        required
        v-model="contractAddress"
        placeholder="Contract Address"
      />
      <button
        className="btn btn-green mt-1"
        type="button"
        @click="newContractInstant"
      >
        {{$t('contract')}}
      </button>

      <hr className="mt-4" />

      <input type="text" required placeholder="To" v-model="transferTo" />
      <input type="text" required placeholder="amount" v-model="amount" />
      <button className="btn btn-green mt-1" type="button" @click="sendToken">
        {{$t('send')}}
      </button>
      <hr className="mt-4" />
      <input type="text" required placeholder="Address" v-model="addrCheck" />
      <button
        className="btn btn-green mt-1"
        type="button"
        @click="checkBalance"
      >
        {{$t('balance')}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ethers, utils } from "ethers";
import Token from "../artifacts/contracts/StandardToken.sol/StandardToken.json";

@Component
export default class Erc20Token extends Vue {
  @Prop() private msg!: string;
  private contractAddress = "";
  private addrCheck = "";
  private amount = "";
  private transferTo = "";
  // get balance of the token contract
  async checkBalance(): Promise<void> {
    if (ethers.utils.isAddress(this.addrCheck)) {
      const balance = await this.$store.state.contract.balanceOf(
        this.addrCheck
      );
      console.log(`balance: ${utils.formatUnits(balance.toString())}`);
    } else {
      alert("[ERROR] Address to get balance is empty !");
    }
  }
  async newContractInstant(): Promise<void> {
    if (
      this.$store.state.provider !== null &&
      ethers.utils.isAddress(this.contractAddress)
    ) {
      const iContract = new ethers.Contract(
        this.contractAddress,
        Token.abi,
        this.$store.state.provider
      );
      console.log(iContract);
      //
      this.$store.state.contract = iContract;
      const symbol = await this.$store.state.contract.symbol();
      const name = await this.$store.state.contract.name();
      const decimal = await this.$store.state.contract.decimals();
      const balance = await this.$store.state.contract.balanceOf(
        this.$store.state.walletAccount
      );
      console.log(
        `New Contract: ${name} - ${symbol} - ${decimal} - ${utils.formatUnits(
          balance.toString()
        )}`
      );
    } else {
      alert(`[ERROR] Provider is null or wrong format contract address`);
    }
  }

  // send a transaction to the token contract
  async sendToken(): Promise<void> {
    if (
      this.$store.state.provider !== null &&
      ethers.utils.isAddress(this.transferTo)
    ) {
      const signer = this.$store.state.provider.getSigner();
      const contract = new ethers.Contract(
        this.contractAddress,
        Token.abi,
        signer
      );
      const transaction = await contract.transfer(
        this.transferTo,
        utils.parseUnits(this.amount)
      );
      // Wait for the transaction to be mined...
      const transaction_info = await transaction.wait();
      alert(`[Success] Transaction Hash: ${transaction_info.blockHash}`);
      const balance = await contract.balanceOf(this.$store.state.walletAccount);
      console.log(`balance: ${utils.formatUnits(balance.toString())}`);
    } else {
      alert("[ERROR] provider is null or wrong address format");
    }
  }
}
</script>
