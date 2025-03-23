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
				return this.$store.state.projectData.taskStatusTypes.filter(a => a !== this.$store.state.TASK_STATUS_TYPE.BLUE);
			},
			storePriorityList()
			{
				return this.$store.state.projectData.taskPriorityTypes;
			},
			storeLevelList()
			{
				return this.$store.state.projectData.taskLevelTypes;
			},
		},
	};
</script>

<template src="./template.html"></template>