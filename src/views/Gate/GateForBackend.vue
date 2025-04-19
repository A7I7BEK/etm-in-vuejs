<script>

const ACTION_TYPE = {
	CONFIRM_EMAIL: 'confirm_email',
	SHARE_TASK: 'share_task',
};


export default {
	name: 'GateForBackend',
	created() {
		const { action } = this.$route.query;

		if (action === ACTION_TYPE.CONFIRM_EMAIL) {
			this.$router.push('/'); // Temp
		}
		else if (action === ACTION_TYPE.SHARE_TASK) {
			this.$router.push({
				name: 'mainTasksRead',
				params: { id: this.$route.query.task_id }
			});
		}
	},
};
</script>

<template></template>