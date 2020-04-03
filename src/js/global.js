import axios from 'axios';
import {
    format,
    formatRelative,
    isToday
} from 'date-fns';
import {
    ja,
    enUS,
    zhCN
} from 'date-fns/locale';
import {
    Message
} from 'element-ui';
import router from './../router/index';
import i18n from './../i18n/i18n';

axios.defaults.baseURL = "http://localhost:9000";

const _handleErrorPage = (code, message) => {
    if (code == 500) {
        Message.error(message);
        router.push({
            name: "Error"
        });
    } else {
        router.push({
            name: "NotFound"
        });
    }
};
const filterDates = [new Date(2020, 3, 4), new Date(new Date().getFullYear(), 11, 13)];

axios.interceptors.request.use((config) => {
    return config;
}, err => {
    Message.error({
        message: i18n.t("timedOut")
    });
    return Promise.resolve(err);
});
axios.interceptors.response.use((data) => {
    if (data.status && data.status == 200 && data.data.error) {
        Message.error({
            message: data.data.errorMsg
        });
    }
    return data;
}, (err) => {
    if (err && err.response) {
        let code = err.response.status,
            message = err.response.data;
        _handleErrorPage(code, message);
    } else {
        Message.error({
            message: i18n.t("connectFail")
        });
    }
    return Promise.reject(err);
});

export function call(api, methods, params) {
    if (methods.toUpperCase() == "GET") return axios.get(api, {
        params
    });
    else if (methods.toUpperCase() == "POST") return axios.post(api, {
        params
    });
    else if (methods.toUpperCase() == "DELETE") return axios.delete(api, {
        params
    });
    else if (methods.toUpperCase() == "PUT") return axios.put(api, {
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

export function filterDate() {
    return filterDates.some(date => isToday(date));
}