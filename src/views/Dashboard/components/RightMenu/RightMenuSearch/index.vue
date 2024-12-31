<script>
	import BaseRightMenu from '../../../../../components/BaseRightMenu';


	export default {
		name: 'RightMenuSearch',
		components: {
			BaseRightMenu,
		},
		computed: {
			storeTagList()
			{
				return this.$store.state.projectData.tags;
			},
			storeMemberList()
			{
				return this.$store.state.projectData.members;
			},
			storeStatusList()
			{
				return this.$store.state.projectData.taskStatusType.filter(x => x.value !== this.$store.state.TASK_STATUS_TYPE.BLUE);
			},
			storePriorityList()
			{
				return this.$store.state.projectData.taskPriorityType;
			},
			storeLevelList()
			{
				return this.$store.state.projectData.taskLevelType;
			},
		},
	};
</script>

<template src="./template.html"></template>