<script>
import BaseModal from '../../../../../../components/BaseModal';
import { COLOR_LIST } from '../../../../../../constants';


export default {
	name: 'BackgroundModal',
	components: {
		BaseModal,
	},
	data() {
		return {
			COLOR_LIST,
		};
	},
	computed: {
		computedBackground() {
			let color = '', img = '', background = this.$store.state.projectData.background;

			if (!background) {
				img = this.$store.state.backgroundImg;
			}
			else if (background.charAt(0) === '#') {
				color = background;
			}
			else {
				img = this.$store.state.url + background;
			}

			return { color, img };
		},
	},
	methods: {
		UploadPhoto(event) {
			if (event.target.files.length === 0) {
				return;
			}


			let formData = new FormData();
			formData.append('file', event.target.files[ 0 ]);


			this.$store.state.loader = true;
			this.$api
				.post('/resource/upload-one', formData, {
					params: {
						minWidth: 1920,
						minHeight: 1080,
					}
				})
				.then(response => {
					this.ChangeBackground(response.data.data.url);
				})
				.finally(() => {
					event.target.value = '';
					this.$store.state.loader = false;
				});
		},
		ResetBackground() {
			this.ChangeBackground(null);
		},
		ChangeBackground(value) {
			this.$api
				.post('/projects/background', {
					background: value,
					projectId: this.$store.state.projectData.id,
				})
				.then(response => {
					this.$store.state.projectData.background = value;
				});
		},
	}
};
</script>

<template src="./template.html"></template>