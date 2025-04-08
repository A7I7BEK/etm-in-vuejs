<template>
	<i18n
		tag="p"
		:path="`actionItem.${action.activityType}`"
	>
		<template #name>
			{{ action.task.name }}
		</template>
	</i18n>
</template>

<script>
export default {
	name: 'ActionTaskDelete',
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
};
</script>