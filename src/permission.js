import router from './router'
import { getToken } from "@/utils/auth"
import store from '@/store'
import { Message } from "element-ui"

const whiteList = ['/login'] // no redirect whitelist

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
