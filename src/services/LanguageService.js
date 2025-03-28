import { LANG } from '../constants';


const LANGUAGE = 'Lang';


export function langSet(lang) {
	localStorage.setItem(LANGUAGE, lang);
}
export function langGet() {
	return localStorage.getItem(LANGUAGE) || LANG.English;
}
export function langRemove() {
	localStorage.removeItem(LANGUAGE);
}
