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
	data() {
		return {
			PERMISSION_TYPE,
		};
	},
};
</script>

<template src="./template.html"></template>