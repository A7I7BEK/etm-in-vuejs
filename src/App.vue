<template>
	<div id="app">
		<div
			class="loader_bx"
			:class="{ 'active': $store.state.loader }"
		>
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


		<router-view />


		<notifications
			class="az_notification"
			group="simple"
			position="top right"
			:duration="5000"
		></notifications>


		<vue-headful v-bind="{
			'lang': $i18n.locale,
			...$store.state.metaData
		}"></vue-headful>
	</div>
</template>

<script>
import { accessTokenGet, refreshTokenGet, setAllTokens, setRefreshTokenInterval } from './services/TokenService';
import { setProfile } from './utils/setProfile';


export default {
	watch: {
		'$route': {
			handler(to, from) {
				this.$store.state.metaData.title = to.meta.title ? to.meta.title() : 'ETM';
				this.$store.state.metaData.description = to.meta.description ? to.meta.description() : 'Test description';
				this.$store.state.metaData.keywords = to.meta.keywords ? to.meta.keywords() : 'Test keyword';
			},
			immediate: true
		}
	},
	created() {
		if (accessTokenGet()) {
			setRefreshTokenInterval(this.RefreshToken);
			this.GetProfileInfo();
		}
	},
	methods: {
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
				.get('users/me')
				.then(response => {
					setProfile(response.data.data);
					this.$router.push('/');
				});
		},
	}
};
</script>
