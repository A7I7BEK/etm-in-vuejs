
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRE_TIME = 'access_token_expire_time';


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
	return Number(localStorage.getItem(EXPIRE_TIME)) || 0;
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
