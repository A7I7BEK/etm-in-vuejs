import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/vue-i18n-config';
import './plugins/axios-config';
import './plugins/vue-notification-config';
import './plugins/moment-config';
import './plugins/vuelidate-config';
import './plugins/vue-headful-config';
import './mixins/index';
import './directives/index';
import './filters';



Vue.config.productionTip = false;



new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app');
