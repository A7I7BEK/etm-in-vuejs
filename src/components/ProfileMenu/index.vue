<script>
	import BaseRightMenu from '../BaseRightMenu';
	import ProfileMenuModalInfo from './ProfileMenuModalInfo/index';
	import ProfileMenuModalPassword from './ProfileMenuModalPassword/index';
	import { RemoveAllTokens } from '../../services/TokenService';


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
		methods: {
			ChangeLang(lang)
			{
				this.$i18n.locale = lang;
				localStorage.setItem('lang', lang);

				this.$api
					.post('/users/change/language', {
						langCode: lang,
					});
			},
			Logout()
			{
				RemoveAllTokens();
				this.$store.state.permissionList = [];
				this.$store.state.userProfile = {};
				this.$router.push({ name: 'authLogin' });
			},
		}
	};
</script>

<template src="./template.html"></template>