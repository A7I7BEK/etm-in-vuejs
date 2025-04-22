<template>
	<div id="app">
		<!-- <div
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
		</div> -->

		<div
			class="loader_bx"
			:class="{ 'active': $store.state.loader }"
		>

			<div class="loader-pulse">
				<img src="/img/favicon.png" />
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
import { META_DATA } from './constants';
import { accessTokenGet, refreshTokenGet, setAllTokens, setRefreshTokenInterval } from './services/TokenService';
import { setProfile } from './utils/setProfile';


export default {
	watch: {
		'$route': {
			handler(to, from) {
				this.$store.state.metaData.title = to.meta.title ? to.meta.title() : META_DATA.title;
				this.$store.state.metaData.description = to.meta.description ? to.meta.description() : META_DATA.description;
				this.$store.state.metaData.keywords = to.meta.keywords ? to.meta.keywords() : META_DATA.keywords;
			},
			immediate: true
		}
	},
	async created() {
		if (accessTokenGet()) {
			setRefreshTokenInterval(this.RefreshToken);
			await this.GetProfileInfo();
		}
	},
	methods: {
		async RefreshToken() {
			const resp = await this.$api.post('/auth/refresh-token', {
				refreshToken: refreshTokenGet(),
			});

			setAllTokens(resp.data.data);
		},
		async GetProfileInfo() {
			const resp = await this.$api.get('/users/me');

			setProfile(resp.data.data);
		},
	}
};
</script>


<style>
.loader_bx {
	background: rgb(255 255 255 / 80%);
}

.loader-pulse img {
	width: 70px;
	height: 70px;
	transform-origin: center;
	animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.8);
		opacity: 0.6;
	}

	50% {
		transform: scale(1.1);
		opacity: 1;
	}

	100% {
		transform: scale(0.8);
		opacity: 0.6;
	}
}
</style>