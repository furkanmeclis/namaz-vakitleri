import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home";
import Weekly from "./components/Weekly";


Vue.use(VueRouter);

const routes = [
    { path: "/", component: Home },
    { path:"/aylik",component: Weekly }
];

export const router = new VueRouter({
    mode: "history",
    routes
});