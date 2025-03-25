const LANG = 'Lang';


export function langSet(lang) {
	localStorage.setItem(LANG, lang);
}
export function langGet() {
	return localStorage.getItem(LANG) || 'en';
}
export function langRemove() {
	localStorage.removeItem(LANG);
}
