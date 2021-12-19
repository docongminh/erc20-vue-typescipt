import Vue from "vue";
import VueRouter from "vue-router";
import NativeTokenView from "../views/NativeToken.vue";
import Erc20TokenView from "../views/Erc20Token.vue";
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "NativeToken",
        component: NativeTokenView,
    },
    {
        path: "/erc20",
        name: "Erc20Token",
        component: Erc20TokenView,
    },
];
const router = new VueRouter({
    routes,
});
export default router;
//# sourceMappingURL=index.js.map