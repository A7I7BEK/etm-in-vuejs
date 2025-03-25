// @ts-nocheck
import $store from "../store";


const TOKEN_KEY = 'Authorization';
const REFRESH_TOKEN_KEY = 'Refresh';
const EXPIRE_TIME = 'Expire';


export function accessTokenSet(token) {
	localStorage.setItem(TOKEN_KEY, token);
}
export function accessTokenGet() {
	return localStorage.getItem(TOKEN_KEY);
}
export function accessTokenRemove() {
	localStorage.removeItem(TOKEN_KEY);
}



export function refreshTokenSet(token) {
	localStorage.setItem(REFRESH_TOKEN_KEY, token);
}
export function refreshTokenGet() {
	return localStorage.getItem(REFRESH_TOKEN_KEY);
}
export function refreshTokenRemove() {
	localStorage.removeItem(REFRESH_TOKEN_KEY);
}



export function expireTimeSet(time) {
	localStorage.setItem(EXPIRE_TIME, time);
}
export function expireTimeGet() {
	return parseInt(localStorage.getItem(EXPIRE_TIME) || '0');
}
export function expireTimeRemove() {
	localStorage.removeItem(EXPIRE_TIME);
}



export function setAllTokens(data) {
	accessTokenSet(data.accessToken);
	refreshTokenSet(data.refreshToken);
	expireTimeSet(Date.now() + data.expiresIn * 1000);
}

export function clearAllTokens() {
	accessTokenRemove();
	refreshTokenRemove();
	expireTimeRemove();
}



export function setRefreshTokenInterval(expireCallback) {
	$store.state.refreshTokenIntervalId = setInterval(() => {
		if (Date.now() > expireTimeGet() - 60 * 1000) {
			expireCallback();
		}
	}, 1000);
}