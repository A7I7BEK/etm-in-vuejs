<script>
	import BaseModal from '../../BaseModal';


	export default {
		name: 'GuideMenuModal',
		components: {
			BaseModal,
		},
		props: {
			resource: {
				type: Object,
				required: true,
				default: {},
			},
		},
		data()
		{
			return {};
		},
		created()
		{
		},
		methods: {}
	};
</script>

<template src="./template.html"></template>