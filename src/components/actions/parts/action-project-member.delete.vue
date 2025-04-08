<template>
	<i18n
		tag="p"
		:path="`actionItem.${action.activityType}`"
	>
		<template #employeeName>
			{{ employeeName }}
		</template>
	</i18n>
</template>

<script>
export default {
	name: 'ActionProjectMemberDelete',
	props: {
		action: {
			type: Object,
			required: true,
		},
		clickable: {
			type: Boolean,
			default: true,
		}
	},
	computed: {
		employeeName() {
			const { employee } = this.action.details;

			return (employee.firstName + ' ' + employee.lastName);
		}
	},
};
</script>