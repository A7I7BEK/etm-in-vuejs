<script>
import BaseAction from '../../../../../components/actions/base-action.vue';
import BaseRightMenu from '../../../../../components/BaseRightMenu';
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
	watch: {
		'$store.state.socket.action'(val) {
			// TODO: Socket action
			if (this.$store.state.projectData.id === val.projectId) {
				this.$store.state.projectData.actions = val.taskActionDtos;
			}
		},
	},
};
</script>

<template src="./template.html"></template>