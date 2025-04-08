<template>
	<i18n
		tag="p"
		:path="`actionItem.${action.activityType}`"
	>
		<template #taskName>
			<a
				href="#"
				@click.prevent="showModal"
				v-if="clickable"
			>
				{{ action.task.name }}
			</a>
			<template v-else>
				{{ action.task.name }}
			</template>
		</template>
	</i18n>
</template>

<script>
export default {
	name: 'ActionTaskDeadlineDelete',
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
	methods: {
		showModal() {
			this.$store.state.taskModalId = this.action.task.id;
		}
	},
};
</script>