<script>
	import BaseRightMenu from '../BaseRightMenu';
	import GuideMenuModal from './GuideMenuModal/index';


	export default {
		name: 'GuideMenu',
		components: {
			BaseRightMenu,
			GuideMenuModal,
		},
		data()
		{
			return {
				guideGroupList: [
					{
						name: 'guideVideo',
						guideList: [
							{
								name: 'Reklama',
								type: 'video',
								prevLink: 'https://drive.google.com/file/d/1lVtn9UZW17-de-IZKhIIetrt2a9eiRKe/preview',
								downLink: 'https://drive.google.com/file/d/1lVtn9UZW17-de-IZKhIIetrt2a9eiRKe/view',
							},
						]
					},
					{
						name: 'guidePDF',
						guideList: [
							{
								name: 'HTTP without S',
								type: 'PDF',
								prevLink: 'http://www.africau.edu/images/default/sample.pdf',
								downLink: 'http://www.africau.edu/images/default/sample.pdf',
							},
							{
								name: 'HTTP with S',
								type: 'PDF',
								prevLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
								downLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
							},
						]
					},
					{
						name: 'guidePPT',
						guideList: [
							{
								name: 'PowerPoint to MP4',
								type: 'video',
								prevLink: 'https://www.youtube.com/embed/FOm9lOFbPIs',
								downLink: 'https://youtu.be/FOm9lOFbPIs',
							},
							{
								name: 'Test PPT to MP4',
								type: 'video',
								prevLink: 'https://drive.google.com/file/d/1edT5cU9MIRXWLCixWC9rhOu43NSUyZQx/preview',
								downLink: 'https://drive.google.com/file/d/1edT5cU9MIRXWLCixWC9rhOu43NSUyZQx/view',
							},
						]
					},
				],
				guideSelected: {},
			};
		},
		created()
		{
		},
		mounted()
		{
			$('#guideMenuModal').on('hidden.bs.modal', () => {
				this.guideSelected = {};
			});
		},
		methods: {
		}
	};
</script>

<template src="./template.html"></template>