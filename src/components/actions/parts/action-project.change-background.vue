<template>
	<i18n
		tag="p"
		:path="`actionItem.${action.activityType}`"
	></i18n>
</template>

<script>
export default {
	name: 'ActionProjectChangeBackground',
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