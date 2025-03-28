import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { LANG } from '../constants';
import { langGet } from '../services/LanguageService';
import en from '../translations/en';
import ru from '../translations/ru';
import uz from '../translations/uz';


Vue.use(VueI18n);


export default new VueI18n({
	locale: langGet(),
	messages: {
		[ LANG.Uzbek ]: uz,
		[ LANG.English ]: en,
		[ LANG.Russian ]: ru,
	},
});