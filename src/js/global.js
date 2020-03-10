import axios from 'axios';
import {
    format,
    formatRelative
} from 'date-fns';
import {
    ja,
    enUS,
    zhCN
} from 'date-fns/locale';

const host = "http://localhost:9000"

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

export function f(date, formatStr) {
    return format(date, formatStr);
};

export function fromNow(date, locale) {
    if (locale == "zh_cn") return formatRelative(date, new Date(), {
        locale: zhCN
    });
    else if (locale == "ja") return formatRelative(date, new Date(), {
        locale: ja
    });
    else return formatRelative(date, new Date(), {
        locale: enUS
    });
};