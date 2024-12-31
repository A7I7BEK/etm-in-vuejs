<script>
	import BaseModal from '../../../../../../components/BaseModal';


	export default {
		name: 'BackgroundModal',
		components: {
			BaseModal,
		},
		data: () => ({}),
		computed: {
			computedBackground()
			{
				let value = '', img = false, background = this.$store.state.projectData.background;
				if (background.charAt(0) === '#')
				{
					value = background;
					img = false;
				}
				else
				{
					value = this.$store.state.url + background;
					img = true;
				}
				return { img, value };
			},
		},
		created()
		{
		},
		mounted()
		{
		},
		methods: {
			UploadPhoto(event)
			{
				if (event.target.files.length === 0)
				{
					return;
				}


				let formData = new FormData();
				formData.append('file', event.target.files[0]);


				this.$store.state.loader = true;
				this.$api
					.post('/resource/upload/file', formData, {
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
			ChangeBackground(value)
			{
				this.$api
					.post('projects/background', {
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