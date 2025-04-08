<template>
	<i18n
		tag="p"
		:path="`actionItem.${action.activityType}`"
	>
		<template #employeeNames>
			{{ employeeNames }}
		</template>
	</i18n>
</template>

<script>
export default {
	name: 'ActionProjectMemberCreate',
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
		employeeNames() {
			const { employees } = this.action.details;

			return employees.map(a => (a.firstName + ' ' + a.lastName)).join(', ');
		}
	},
};
</script>