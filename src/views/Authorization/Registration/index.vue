<template>
	<div>
		<keep-alive include="AccountDetails">
			<account-details
				v-if="step === 'account'"
				@emit:data="ListenEmitAccount"
			></account-details>


			<otp-confirm
				v-else-if="step === 'confirm'"
				:resource="accountData"
				@emit:data="ListenEmitConfirm"
				@emit:back="step = 'account'"
			></otp-confirm>
		</keep-alive>
	</div>
</template>

<script>
import { refreshTokenGet, setAllTokens, setRefreshTokenInterval } from '../../../services/TokenService';
import { setProfile } from '../../../utils/setProfile';
import AccountDetails from './parts/AccountDetails';
import OtpConfirm from './parts/OtpConfirm';


export default {
	name: 'Registration',
	components: {
		AccountDetails,
		OtpConfirm,
	},
	data() {
		return {
			step: 'account',
			accountData: {},
		};
	},
	methods: {
		ListenEmitAccount(val) {
			this.accountData = val;
			this.step = 'confirm';
		},
		async ListenEmitConfirm(val) {
			setAllTokens(val);
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