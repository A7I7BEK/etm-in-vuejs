<template>
	<div id="app">
		<div class="loader_bx" :class="{ 'active': $store.state.loader }">
			<div class="loader">

				<div class="loader_mask top">
					<div class="loader_plane"></div>
				</div>

				<div class="loader_mask middle">
					<div class="loader_plane"></div>
				</div>

				<div class="loader_mask bottom">
					<div class="loader_plane"></div>
				</div>

			</div>
		</div>


		<router-view/>


		<notifications
				class="az_notification"
				group="simple"
				position="top right"
				:duration="5000"
		></notifications>


		<vue-headful
				v-bind="{
					'lang': $i18n.locale,
					...$store.state.metaData
				}"
		></vue-headful>
	</div>
</template>

<script>
	import TokenService from './services/TokenService';


	export default {
		watch: {
			'$route': {
				handler(to, from)
				{
					this.$store.state.metaData.title = to.meta.title ? to.meta.title() : 'ETM';
					this.$store.state.metaData.description = to.meta.description ? to.meta.description() : 'Test description';
					this.$store.state.metaData.keywords = to.meta.keywords ? to.meta.keywords() : 'Test keyword';
				},
				immediate: true
			}
		},
		created()
		{
			if (TokenService.token.Get())
			{
				this.$store.state.refreshTokenIntervalId = setInterval(() => {
					if (+new Date() / 1000 > TokenService.expireTime.Get() - 60)
					{
						this.RefreshToken();
					}
				}, 1000);


				this.GetProfileInfo();
			}
		},
		methods: {
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
					});
			},
		}
	};
</script>
