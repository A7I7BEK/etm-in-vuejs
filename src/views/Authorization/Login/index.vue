<script>
import FormService from '../../../services/FormService';
import { setAllTokens } from '../../../services/TokenService';
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
	methods: {
		async LoginUser() {
			const resp = await this.$api.post('/auth/login', this.model.GetData());
			setAllTokens(resp.data.data);

			await this.GetProfileInfo();
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