<script>
import TypeKanban from './components/TypeKanban';
import TypeTrello from './components/TypeTrello';
import BaseReportTab from '../../../../components/BaseReportTab';

export default {
	name: "MainReportsProjectDetailsManager",
	components: {
		BaseReportTab,
		TypeKanban,
		TypeTrello,
	},
	data: () => ({
		managerList: [],
	}),
	created() {
		this.GetManagerAll();
	},
	mounted() {
	},
	methods: {
		GetManagerAll() {
			this.$api
				.get('/employees')
				.then(response => {
					this.managerList = response.data.data;
				});
		},
	}
};
</script>

<template src="./template.html"></template>