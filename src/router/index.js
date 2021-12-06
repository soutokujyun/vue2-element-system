import Vue from "vue";
import VueRouter from "vue-router";

import Layout from '@/layout'

Vue.use(VueRouter);

// 固定路由
export const constantRoutes = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index"),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index'),
                meta: { title: 'Dashboard', icon: 's-home', affix: true }
            }
        ]
    },
];

// 默认动态路由
export const asyncRoutes = [
    {
        path: '/about',
        component: Layout,
        redirect: '/about/index',
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
            icon: 'coffee',
            roles: ['editor']
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


const createRouter = () => new VueRouter({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
});

const router = createRouter();

export default router;

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }