import VueI18n from 'vue-i18n';
import Vue from 'vue';
Vue.use(VueI18n)


const messages = {
    'en': {
        connect: "Metamask Connection",
        wallet: "Wallet",
        to: "To",
        amount: "Amount",
        address: "Address",
        transfertToken: "Transfer Token",
        send: "Send Token",
        balance: "Balance",
        contract: "New Contract",
        contract_addr: "Contract Address"
    },
    'vi': {
        connect: "Kết nối MetaMask",
        wallet: "Ví",
        to: "Đến",
        amount: "Số Token",
        address: "Địa chỉ",
        transfertToken: "Chuyển Token",
        send: "Gửi",
        balance: "Số Dư",
        contract: "Khởi tạo Contract",
        contract_addr: "Địa chỉ contract"
    }
};

const i18n = new VueI18n({
    locale: 'vi', // set locale
    fallbackLocale: 'vi', // set fallback locale
    messages, // set locale messages
});

export default i18n;