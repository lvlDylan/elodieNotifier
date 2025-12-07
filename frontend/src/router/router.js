import {createRouter, createWebHistory} from "vue-router"

import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue";

const routes = [
    { path: "/login", component: Login, name: "Login" },
    { path: "/", component: Dashboard, name: "Dashboard", meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const hasPassword = sessionStorage.getItem("pass");

    if (requiresAuth && !isAuthenticated && !hasPassword) {
        next("/login");
    } else if (to.path === "/login" && isAuthenticated && hasPassword) {
        next("/");
    } else {
        next();
    }
})

export default router;