import Axios from 'axios';
import Vue from 'vue';
import { API_URL } from '../constants';
import { langGet } from '../services/LanguageService';
import { accessTokenGet, clearAllTokens, expireTimeGet, refreshTokenGet, setAllTokens } from '../services/TokenService';
import { clearProfile } from '../utils/clearProfile';
import notification from './vue-notification-config';


// Regular API client with interceptors
const apiClient = Axios.create({
	baseURL: API_URL,
	headers: {
		common: {
			'X-Requested-With': 'XMLHttpRequest',
		}
	}
});


// Separate instance for token refresh to avoid interceptor loops
const apiRefreshToken = Axios.create({
	baseURL: API_URL,
	headers: {
		common: {
			'X-Requested-With': 'XMLHttpRequest',
		}
	}
});


// These functions help to implement pending requests feature
let isRefreshing = false;
let refreshSubscribers = [];
function executeSubscribers(token) {
	refreshSubscribers.forEach((callback) => callback(token));
	refreshSubscribers = [];
}
function addRefreshSubscriber(callback) {
	refreshSubscribers.push(callback);
}


apiClient.interceptors.request.use(async (config) => {

	config.headers = {
		'Accept-Language': langGet(),
	};


	if (!accessTokenGet()) {
		return config;
	}


	// Check if the access token is expired and refresh it if necessary
	if (Date.now() > expireTimeGet() - 60 * 1000) {
		if (isRefreshing) {
			return new Promise((resolve) => {
				addRefreshSubscriber((token) => {
					config.headers.Authorization = `Bearer ${token}`;
					resolve(config);
				});
			});
		}

		isRefreshing = true;

		try {
			const resp = await apiRefreshToken.post('/auth/refresh-token', {
				refreshToken: refreshTokenGet(),
			});
			setAllTokens(resp.data.data);

			// Execute all pending requests with the new token
			// These are callbacks which are a Macrotasks
			// and will be executed after the current task
			executeSubscribers(accessTokenGet());
			isRefreshing = false;
		}
		catch (error) {
			isRefreshing = false;
			return Promise.reject(error);
		}
	}


	config.headers.Authorization = `Bearer ${accessTokenGet()}`;
	return config;

}, error => Promise.reject(error));



apiClient.interceptors.response.use(response => response, error => {

	if (!error.response || error.response.status === 401) {
		clearAllTokens();
		clearProfile();
	}


	const { message } = error.response.data;

	if (Array.isArray(message)) {
		const errorList = message.map(val => `<p>- ${val}</p>`).join('');
		notification.error(errorList);
	}
	else {
		notification.error(message);
	}

	return Promise.reject(error);
});



Vue.prototype.$api = apiClient;
// Vue.prototype.$http = apiClient;
