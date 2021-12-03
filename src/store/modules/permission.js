import { asyncRoutes, constantRoutes } from "@/router"
export default {
    namespaced: true,
    state: {
        routes: []
    },
    mutations: {
        // 设置菜单
        SET_ROUTES(state, routes) {
            // state.routes = routes;
            state.routes = constantRoutes.concat(routes)
        },
    },
    actions: {
        generateRoutes({ commit }, roles) {
            return new Promise(resolve => {
                let accessedRoutes;
                // accessedRoutes = asyncRoutes || [];
                if (roles.includes('admin')) {
                    accessedRoutes = asyncRoutes || []
                } else {
                    // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
                commit('SET_ROUTES', accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    }
}