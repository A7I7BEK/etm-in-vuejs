<script>
import { LANG_LOCALE, PERMISSION_TYPE } from '../../constants';
import { langSet } from '../../services/LanguageService';
import { clearAllTokens } from '../../services/TokenService';
import { clearProfile } from '../../utils/clearProfile';
import BaseRightMenu from '../BaseRightMenu';
import ProfileMenuModalInfo from './ProfileMenuModalInfo/index';
import ProfileMenuModalPassword from './ProfileMenuModalPassword/index';


export default {
	name: 'ProfileMenu',
	components: {
		BaseRightMenu,
		ProfileMenuModalInfo,
		ProfileMenuModalPassword,
	},
	props: {
		className: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			LANG_LOCALE,
			PERMISSION_TYPE,
		};
	},
	methods: {
		ChangeLang(lang) {
			this.$i18n.locale = lang;
			langSet(lang);

			this.$api
				.post('/users/change-language', {
					langCode: lang,
				});
		},
		Logout() {
			clearAllTokens();
			clearProfile();
		},
	}
};
</script>

<template src="./template.html"></template>