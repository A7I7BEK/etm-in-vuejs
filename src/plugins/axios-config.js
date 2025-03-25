import Axios from 'axios';
import Vue from 'vue';
import { URL_BASE } from '../defaults';
import { langGet } from '../services/LanguageService';
import { accessTokenGet, clearAllTokens } from '../services/TokenService';
import { clearProfile } from '../utils/clearProfile';
import notification from './vue-notification-config';



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
		'Accept-Language': langGet(),
	};

	if (accessTokenGet()) {
		config.headers.Authorization = 'Bearer ' + accessTokenGet();
	}

	return config;
}, error => Promise.reject(error));



instance.interceptors.response.use(response => response, error => {

	if (!error.response || error.response.status === 401) {
		clearAllTokens();
		clearProfile();
	}

	notification.error(error.response.data.error.friendlyMessage);

	return Promise.reject(error);
});



Vue.prototype.$api = instance;
// Vue.prototype.$http = instance;
