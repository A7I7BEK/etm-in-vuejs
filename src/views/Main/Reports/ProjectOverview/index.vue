<script>
import BaseReportTab from '../../../../components/BaseReportTab';
import { PROJECT_TYPE } from '../../../../constants';
import TypeKanbanOverall from './components/TypeKanbanOverall';
import TypeKanbanProject from './components/TypeKanbanProject';
import TypeTrello from './components/TypeTrello';


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
	methods: {
		GetProjectSelectionAll() {
			this.$api
				.get('/projects/selection', {
					params: {
						projectType: PROJECT_TYPE.TRELLO
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