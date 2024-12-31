<script>
	import FormService from '../../../services/FormService';
	import TokenService from '../../../services/TokenService';


	export default {
		name: 'Login',
		data()
		{
			return {
				model: new FormService({
					userName: null,
					password: null,
				}),
			};
		},
		created()
		{
			clearInterval(this.$store.state.refreshTokenIntervalId);
		},
		methods: {
			LoginUser()
			{
				this.$api
					.post('auth/login', this.model.GetData())
					.then(response => {
						TokenService.token.Save(response.data.data.sessionToken);
						TokenService.refreshToken.Save(response.data.data.refreshToken);
						TokenService.expireTime.Save((+new Date() / 1000) + response.data.data.expiresIn);


						this.$store.state.refreshTokenIntervalId = setInterval(() => {
							if (+new Date() / 1000 > TokenService.expireTime.Get() - 60)
							{
								this.RefreshToken();
							}
						}, 1000);


						this.GetProfileInfo();
					});
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
						if (response.data.data.language)
						{
							this.$i18n.locale = response.data.data.language.code;
							localStorage.setItem('lang', response.data.data.language.code);
						}


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

<template src="./template.html"></template>