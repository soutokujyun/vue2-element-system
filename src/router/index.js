import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";
import store from '@/store'
import { Message } from "element-ui"
import Layout from '@/layout'

Vue.use(VueRouter);

const whiteList = ['/login'] // no redirect whitelist

export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index'),
                meta: { title: 'Dashboard', icon: 's-home' }
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index"),
        hidden: true
    },
];

// 默认动态路由
export const asyncRoutes = [
    {
        path: '/about',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'About',
                component: () => import('@/views/about/index'),
                meta: { title: 'About', icon: 'orange' }
            }
        ]
    },
    {
        path: '/support',
        component: Layout,
        redirect: '/support/service',
        name: 'Support',
        meta: {
            title: 'Support',
            icon: 'coffee'
        },
        children: [
            {
                path: 'inprovement',
                component: () => import('@/views/support/inprovement'),
                name: 'Inprovement',
                meta: { title: 'Inprovement' }
            },
            {
                path: 'learn',
                component: () => import('@/views/support/learn'),
                name: 'Learn',
                meta: { title: 'Learn' }
            },
            {
                path: 'service',
                component: () => import('@/views/support/service'),
                name: 'Service',
                meta: { title: 'Service' }
            },
            
        ]
    }
]


const router = new VueRouter({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
});

router.beforeEach(async (to, from, next) => {

    document.title = to.meta.title || "Element System";
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next();
            } else {
                // request user info
                try {
                    // get user info
                    const { roles } = await store.dispatch('user/getInfo')
                    // generate routes map based on roles
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
                    // dynamically add accessible routes
                    for (let accessRoute of accessRoutes) {
                        router.addRoute(accessRoute);
                    }
                    // next to page
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch('user/logout')
                    Message.error({
                        message: error || 'Has Error'
                    })
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next("/login?redirect=" + to.fullPath);
        }
    }
});

export default router;
