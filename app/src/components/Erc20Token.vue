<template>
  <div className="mt-10 relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      className="lg:flex md:flex text-xl justify-center items-center mx-auto border-orange-500 max-w-2xl py-4 px-4"
    >
      <div className="font-semibold p-2">
        <span className="text-gray-800">Transfer Token</span>
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
        New Contract
      </button>

      <hr className="mt-4" />

      <input type="text" required placeholder="To" v-model="transferTo" />
      <input type="text" required placeholder="amount" v-model="amount" />
      <button className="btn btn-green mt-1" type="button" @click="sendToken">
        Send token
      </button>
      <hr className="mt-4" />
      <input type="text" required placeholder="Address" v-model="addrCheck" />
      <button
        className="btn btn-green mt-1"
        type="button"
        @click="checkBalance"
      >
        Get Balance
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
  // private provider = this.$store.state.provider;
  private provider = new ethers.providers.Web3Provider(window.ethereum);
  // get balance of the token contract
  async checkBalance(): Promise<void> {
    console.log(`address: ${this.addrCheck}`)
    const contract = new ethers.Contract(
      this.contractAddress,
      Token.abi,
      this.provider
    );
    const balance = await contract.balanceOf(this.addrCheck);
    console.log(`balance: ${utils.formatUnits(balance.toString())}`);
  }
  async newContractInstant(): Promise<void> {
    console.log(` provider: ${this.provider}`);
    console.log(`Contract address: ${this.contractAddress}`);
    try {
      const iContract = new ethers.Contract(
        this.contractAddress,
        Token.abi,
        this.provider
      );
      console.log(iContract);
      //
      this.$store.state.contract = iContract;
      const symbol = await iContract.symbol();
      const name = await iContract.name();
      const decimal = await iContract.decimals();
      const balance = await iContract.balanceOf(
        this.$store.state.walletAccount
      );
      console.log(
        `New Contract: ${name} - ${symbol} - ${decimal} - ${utils.formatUnits(
          balance.toString()
        )}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  // send a transaction to the token contract
  async sendToken(): Promise<void> {
    const signer = this.provider.getSigner();
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
  }
}
</script>
