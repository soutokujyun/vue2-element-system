import { getToken, setToken, removeToken } from "@/utils/auth";

export default (store) => {
    // 初始化时从localStorage获取数据
    const token = getToken();
    if (token) {
        store.commit("user/SET_TOKEN", token);
    }
    // 用户状态发生变化时缓存之
    store.subscribe((mutation, state) => {
        if (mutation.type === "user/SET_TOKEN") {
            if (state.user.token == '') {
                removeToken();
            } else {
                setToken(state.user.token);
            }
        }
    });
};
