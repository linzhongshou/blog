import axios from 'axios'

/* eslint-disable */
const service = axios.create({
    // baseURL: process.env.BASE_API,
    timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    }
);

export default service