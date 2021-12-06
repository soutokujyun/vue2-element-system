export default {
    namespaced: true,
    state: {
        sidebar: {
            opened: true
        }
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened;
        }
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        }
    }
}