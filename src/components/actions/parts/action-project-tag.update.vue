<template>
	<i18n
		tag="p"
		:path="`actionItem.${action.activityType}`"
	>
		<template #name>
			{{ action.details.tag.name }}
		</template>
	</i18n>
</template>

<script>
export default {
	name: 'ActionProjectTagUpdate',
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