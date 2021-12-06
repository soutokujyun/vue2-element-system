const state = {
    visitedViews: []
}

const mutations = {
    ADD_VISITED_VIEWS(state, route) {
        state.visitedViews.push(route)
    }
}

const actions = {
    addView({commit}, route) {
        console.log(route);
        commit('ADD_VISITED_VIEWS', route)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}