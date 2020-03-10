import axios from 'axios';

const host = "http://47.111.165.97:9000";

export function call(api, methods, params) {
    if (methods.toUpperCase() == "GET") return axios.get(host + api, {
        params
    });
    else if (methods.toUpperCase() == "POST") return axios.post(host + api, {
        params
    });
    else if (methods.toUpperCase() == "DELETE") return axios.delete(host + api, {
        params
    });
    else if (methods.toUpperCase() == "PUT") return axios.put(host + api, {
        params
    });
};