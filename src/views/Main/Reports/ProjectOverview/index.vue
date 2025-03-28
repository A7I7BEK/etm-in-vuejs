<script>
import BaseReportTab from '../../../../components/BaseReportTab';
import TypeTrello from './components/TypeTrello';
import TypeKanbanOverall from './components/TypeKanbanOverall';
import TypeKanbanProject from './components/TypeKanbanProject';


export default {
	name: "MainReportsProjectOverview",
	components: {
		BaseReportTab,
		TypeTrello,
		TypeKanbanOverall,
		TypeKanbanProject,
	},
	data: () => ({
		projectSelectionList: [],
	}),
	created() {
		this.GetProjectSelectionAll();
	},
	mounted() {
	},
	methods: {
		GetProjectSelectionAll() {
			this.$api
				.get('/projects/selection', {
					params: {
						'projectTrello': true
					}
				})
				.then(response => {
					this.projectSelectionList = response.data.data;
				});
		},
	}
};
</script>

<template src="./template.html"></template>