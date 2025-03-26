<script>
import BaseRightMenu from '../../../../../components/BaseRightMenu';
import { TASK_LEVEL_TYPE, TASK_PRIORITY_TYPE, TASK_STATUS_TYPE } from '../../../../../constants';


export default {
	name: 'RightMenuSearch',
	components: {
		BaseRightMenu,
	},
	data() {
		return {
			TASK_LEVEL_TYPE,
			TASK_PRIORITY_TYPE,
			TASK_STATUS_TYPE,
		};
	},
	computed: {
		storeTagList() {
			return this.$store.state.projectData.tags;
		},
		storeMemberList() {
			return this.$store.state.projectData.members;
		},
	},
};
</script>

<template src="./template.html"></template>