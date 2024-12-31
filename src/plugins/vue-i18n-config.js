import Vue from 'vue';
import VueI18n from 'vue-i18n';
import uz from '../translations/uz';
import ru from '../translations/ru';
import en from '../translations/en';
import { LANG } from '../defaults';


Vue.use(VueI18n);


const i18n = new VueI18n({
	locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : LANG,
	messages: { uz, ru, en },
});



export default i18n;