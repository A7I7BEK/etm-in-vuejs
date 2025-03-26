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
		ListenEmitConfirm(val) {
			setAllTokens(val);
			setRefreshTokenInterval(this.RefreshToken);
			this.GetProfileInfo();
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