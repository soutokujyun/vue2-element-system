import { login, getInfo } from "@/api/user";
export default {
    namespaced: true,
    state: {
        token: "",
        username: "",
        roles: []
    },
    mutations: {
        // 设置TOKEN
        SET_TOKEN(state, token) {
            state.token = token;
        },
        // 设置username
        SET_NAME(state, username) {
            state.username = username;
        },
        // 设置role
        SET_ROLES(state, roles) {
            state.roles = roles;
        },
    },
    getters: {
        token: state => {
            return state.token
        }
    },
    actions: {
        login({ commit }, userInfo) {
            const { username, password } = userInfo;
            return new Promise((resolve, reject) => {
                login({ username: username.trim(), password: password })
                    .then((response) => {
                        const { token, username } = response;
                        commit("SET_TOKEN", token);
                        commit("SET_NAME", username);
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        // get user info
        getInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data  = response;

                    if (!data) {
                        reject('Verification failed, please Login again.')
                    }

                    const { roles, username} = data

                    // roles must be a non-empty array
                    if (!roles || roles.length <= 0) {
                        reject('getInfo: roles must be a non-null array!')
                    }

                    commit('SET_ROLES', roles)
                    commit('SET_NAME', username)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({ commit }) {
            commit("SET_TOKEN", "");
            commit("SET_NAME", "");
        }
    }
};
