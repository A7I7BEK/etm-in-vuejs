import Vue from 'vue';
import Axios from 'axios';
import router from '../router';
import store from '../store';
import notification from './vue-notification-config';
import { token, RemoveAllTokens } from '../services/TokenService';
import { URL_BASE, LANG } from '../defaults';



const instance = Axios.create({
	baseURL: URL_BASE,
	headers: {
		common: {
			'X-Requested-With': 'XMLHttpRequest',
		}
	}
});



instance.interceptors.request.use(config => {
	config.headers = {
		'Accept-Language': localStorage.getItem('lang') ? localStorage.getItem('lang') : LANG,
	};

	if (token.Get())
	{
		config.headers.Authorization = 'Bearer ' + token.Get();
	}

	return config;
}, error => Promise.reject(error));



instance.interceptors.response.use(response => response, error => {

	if (!error.response || error.response.status === 401)
	{
		RemoveAllTokens();
		store.state.permissionList = [];
		store.state.userProfile = {};
		router.push({ name: 'authLogin' });
	}

	notification.error(error.response.data.error.friendlyMessage);

	return Promise.reject(error);
});



Vue.prototype.$api = instance;
// Vue.prototype.$http = instance;
