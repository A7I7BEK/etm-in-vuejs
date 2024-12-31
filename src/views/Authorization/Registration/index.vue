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
	import AccountDetails from './parts/AccountDetails';
	import OtpConfirm from './parts/OtpConfirm';
	import TokenService from '../../../services/TokenService';


	export default {
		name: 'Registration',
		components: {
			AccountDetails,
			OtpConfirm,
		},
		data()
		{
			return {
				step: 'account',
				accountData: {},
			};
		},
		methods: {
			ListenEmitAccount(val)
			{
				this.accountData = val;
				this.step = 'confirm';
			},
			ListenEmitConfirm(val)
			{
				TokenService.token.Save(val.sessionToken);
				TokenService.refreshToken.Save(val.refreshToken);
				TokenService.expireTime.Save((+new Date() / 1000) + val.expiresIn);


				this.$store.state.refreshTokenIntervalId = setInterval(() => {
					if (+new Date() / 1000 > TokenService.expireTime.Get() - 60)
					{
						this.RefreshToken();
					}
				}, 1000);


				this.GetProfileInfo();
			},
			RefreshToken()
			{
				this.$api
					.post('auth/refresh-token', {
						'refreshToken': TokenService.refreshToken.Get(),
					})
					.then(response => {
						TokenService.token.Save(response.data.data.sessionToken);
						TokenService.refreshToken.Save(response.data.data.refreshToken);
						TokenService.expireTime.Save((+new Date() / 1000) + response.data.data.expiresIn);
					});
			},
			GetProfileInfo()
			{
				this.$api
					.get('users/me')
					.then(response => {
						this.$store.state.userProfile = response.data.data;
						this.$i18n.locale = response.data.data.language.code;
						localStorage.setItem('lang', response.data.data.language.code);


						let sortedPermissions = [];
						response.data.data.roles.forEach(role => {
							role.permissions.forEach(perm => {
								if (sortedPermissions.findIndex(x => x.codeName === perm.codeName) < 0)
								{
									sortedPermissions.push(perm);
								}
							});
						});
						this.$store.state.permissionList = sortedPermissions;


						this.$router.push('/');
					});
			},
		}
	};
</script>