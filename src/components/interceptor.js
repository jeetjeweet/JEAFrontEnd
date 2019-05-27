const axios = require('axios');

export default function setup() {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('token');
        if(token){
            config.headers.token = token;
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // // Add a response interceptor
    // axios.interceptors.response.use(function (response) {
    //     // Do something with response data
    //     console.log('response interceptor');
    //
    //     return response;
    // }, function (error) {
    //     // Do something with response error
    //     return Promise.reject(error);
    // });
}