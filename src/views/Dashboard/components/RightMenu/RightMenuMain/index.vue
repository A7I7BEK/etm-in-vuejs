<script>
import defaultBackgroundImg from '../../../../../assets/img/background2.jpg';
import BaseAction from '../../../../../components/actions/base-action.vue';
import BaseRightMenu from '../../../../../components/BaseRightMenu';
import { PERMISSION_TYPE, WS_URL } from '../../../../../constants';
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
			PERMISSION_TYPE,
			socketAction: new SocketService({
				url: WS_URL,
				path: '/ws-actions',
				token: accessTokenGet(),
				roomId: this.$route.params.id,
			}),
			settingsModalStarter: 0,
		};
	},
	computed: {
		computedBackground() {
			let color = '', img = '', background = this.$store.state.projectData.background;

			if (!background) {
				img = defaultBackgroundImg;
			}
			else if (background.charAt(0) === '#') {
				color = 'background-color:' + background;
			}
			else {
				img = this.$store.state.url + background;
			}

			return { color, img };
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