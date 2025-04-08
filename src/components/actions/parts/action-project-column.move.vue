<template>
	<i18n
		tag="p"
		:path="`actionItem.${action.activityType}`"
	>
		<template #name>
			{{ action.details.column.name }}
		</template>
	</i18n>
</template>

<script>
export default {
	name: 'ActionProjectColumnMove',
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