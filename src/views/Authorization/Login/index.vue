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
		async LoginUser() {
			const resp = await this.$api.post('/auth/login', this.model.GetData());

			setAllTokens(resp.data.data);
			setRefreshTokenInterval(this.RefreshToken);

			await this.GetProfileInfo();
		},
		async RefreshToken() {
			const resp = await this.$api.post('/auth/refresh-token', {
				refreshToken: refreshTokenGet(),
			});

			setAllTokens(resp.data.data);
		},
		async GetProfileInfo() {
			const resp = await this.$api.get('/users/me');

			setProfile(resp.data.data);

			this.$router
				.push('/')
				.catch(err => {
					console.log(err.name);
				});
		},
	}
};
</script>

<template src="./template.html"></template>