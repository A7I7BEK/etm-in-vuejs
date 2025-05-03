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
import { setAllTokens } from '../../../services/TokenService';
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