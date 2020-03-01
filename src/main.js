import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import './style/theme/index.css';
// import 'element-ui/lib/theme-chalk/display.css';
import i18n from './i18n/i18n';
import moment from 'moment';

Vue.use(ElementUI);
Vue.prototype.$moment = moment;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
