<script>
import FormService from '../../../services/FormService';
import { refreshTokenGet, setAllTokens, setRefreshTokenInterval } from '../../../services/TokenService';
import { setProfile } from '../../../utils/setProfile';


export default {
	name: 'Login',
	data() {
		return {
			model: new FormService({
				userName: null,
				password: null,
			}),
		};
	},
	created() {
		clearInterval(this.$store.state.refreshTokenIntervalId);
	},
	methods: {
		LoginUser() {
			this.$api
				.post('/auth/login', this.model.GetData())
				.then(response => {
					setAllTokens(response.data.data);
					setRefreshTokenInterval(this.RefreshToken);
					this.GetProfileInfo();
				});
		},
		RefreshToken() {
			this.$api
				.post('/auth/refresh-token', {
					refreshToken: refreshTokenGet(),
				})
				.then(response => {
					setAllTokens(response.data.data);
				});
		},
		GetProfileInfo() {
			this.$api
				.get('/users/me')
				.then(response => {
					setProfile(response.data.data);
					this.$router.push('/');
				});
		},
	}
};
</script>

<template src="./template.html"></template>