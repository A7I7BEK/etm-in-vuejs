const TOKEN_KEY = 'Authorization';
const REFRESH_TOKEN_KEY = 'Refresh';
const EXPIRE_TIME = 'Expire';



export const token = {
	Save(token)
	{
		localStorage.setItem(TOKEN_KEY, token);
	},
	Get()
	{
		return localStorage.getItem(TOKEN_KEY);
	},
	Remove()
	{
		localStorage.removeItem(TOKEN_KEY);
	},
};



export const refreshToken = {
	Save(token)
	{
		localStorage.setItem(REFRESH_TOKEN_KEY, token);
	},
	Get()
	{
		return localStorage.getItem(REFRESH_TOKEN_KEY);
	},
	Remove()
	{
		localStorage.removeItem(REFRESH_TOKEN_KEY);
	},
};



export const expireTime = {
	Save(time)
	{
		localStorage.setItem(EXPIRE_TIME, time);
	},
	Get()
	{
		return parseInt(localStorage.getItem(EXPIRE_TIME));
	},
	Remove()
	{
		localStorage.removeItem(EXPIRE_TIME);
	},
};



export function RemoveAllTokens()
{
	token.Remove();
	refreshToken.Remove();
	expireTime.Remove();
}



export default {
	token,
	refreshToken,
	expireTime,
	RemoveAllTokens,
};