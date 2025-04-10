<script>
import BaseReportTab from '../../../../components/BaseReportTab';
import { PERMISSION_TYPE } from '../../../../constants';
import TypeKanban from './components/TypeKanban';
import TypeTrello from './components/TypeTrello';

export default {
	name: "MainReportsProjectDetailsManager",
	components: {
		BaseReportTab,
		TypeKanban,
		TypeTrello,
	},
	data: () => ({
		PERMISSION_TYPE,
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