<script>
import BaseAction from '../../../../../components/actions/base-action.vue';
import BaseRightMenu from '../../../../../components/BaseRightMenu';
import { DEFAULT_API_URL } from '../../../../../constants';
import { SocketService } from '../../../../../services/SocketService';
import { accessTokenGet } from '../../../../../services/TokenService';
import BackgroundModal from './BackgroundModal/index';
import SettingsModal from './SettingsModal/index';


export default {
	name: 'RightMenuMain',
	components: {
		BaseRightMenu,
		BaseAction,
		BackgroundModal,
		SettingsModal,
	},
	data() {
		return {
			socketAction: new SocketService({
				url: DEFAULT_API_URL,
				path: '/ws-actions',
				token: accessTokenGet(),
				roomId: this.$route.params.id,
			}),
			settingsModalStarter: 0,
		};
	},
	computed: {
		computedBackground() {
			let value = '', img = false, background = this.$store.state.projectData.background;
			if (background.charAt(0) === '#') {
				value = 'background-color:' + background;
				img = false;
			}
			else {
				value = this.$store.state.url + background;
				img = true;
			}
			return { img, value };
		},
	},
	created() {
		this.listenSocketAction();
		this.socketAction.connect();
	},
	beforeDestroy() {
		this.socketAction.disconnect();
	},
	methods: {
		listenSocketAction() {
			this.socketAction.socket.on('action-insert', (data) => {
				this.$store.state.projectData.actions.unshift(data);
			});
		},
	}
};
</script>

<template src="./template.html"></template>