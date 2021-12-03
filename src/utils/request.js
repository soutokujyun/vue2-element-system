import axios from "axios";
import { getToken } from "./auth";
import { Message } from "element-ui";
import store from "@/store";

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000 * 5,
});

instance.interceptors.request.use(
    (config) => {
        if (store.getters['user/token'] != '') {
            config.headers.common["Authorization"] = "Bearer " + getToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        let res = response.data;
        // if (res.code !== 200) {
        //     Message({
        //         message: res.message || "Error",
        //         type: "error",
        //         duration: 3 * 1000,
        //     });

        //     return Promise.reject(new Error(res.message || "Error"));
        // }
        return res;
    },
    (error) => {
        Message({
            message: error.response.data,
            type: "error",
            duration: 3 * 1000,
        });
        return Promise.reject(error);
    }
);

export default instance;
