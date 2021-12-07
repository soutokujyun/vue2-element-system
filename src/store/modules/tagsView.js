const state = {
  visitedViews: [],
  cachedViews: []
};

const mutations = {
  ADD_VISITED_VIEWS(state, view) {
    if (state.visitedViews.some((v) => v.path == view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name",
      })
    );
  },
  DEL_VISITED_VIEW(state, view) {
    // ES6：entries方法是数组对键值对的遍历
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path == view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  ADD_CACHED_VIEW(state, view) {
    if (state.cachedViews.indexOf(view.name) == -1) {
      state.cachedViews.push(view.name);
    }
  },
  DEL_CACHED_VIEW(state, view) {
    let index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  }
};

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  addVisitedView({ commit }, view) {
    commit("ADD_VISITED_VIEWS", view);
  },
  addCachedView({ commit }, view) {
    commit("ADD_CACHED_VIEW", view);
  },
  delView({ dispatch }, view) {
    let index = state.cachedViews.indexOf(view.name);
    return new Promise(resolve => {
      dispatch('delVisitedView', view);
      dispatch('delCachedView', view);
      resolve(state.visitedViews[index - 1]);
    })
  },
  delVisitedView({ commit }, view) {
    commit("DEL_VISITED_VIEW", view);
  },
  delCachedView({ commit }, view) {
    commit("DEL_CACHED_VIEW", view);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
