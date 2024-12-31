<script>
	import TypeKanban from './components/TypeKanban'
	import TypeTrello from './components/TypeTrello'
	import BaseReportTab from '../../../../components/BaseReportTab';

	export default {
		name: "MainReportsProjectDetailsManager",
		components: {
			BaseReportTab,
			TypeKanban,
			TypeTrello,
		},
		data(){
			return {}
		},
	}
</script>

<template src="./template.html"></template>