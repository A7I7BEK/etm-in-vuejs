<template>
	<i18n
		tag="p"
		:path="`actionItem.${action.activityType}`"
	>
		<template #employeeName>
			{{ employeeName }}
		</template>

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
	name: 'ActionTaskMemberCreate',
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
			const { member } = this.action.details;

			return (member.firstName + ' ' + member.lastName);
		}
	},
	methods: {
		showModal() {
			this.$store.state.taskModalId = this.action.task.id;
		}
	},
};
</script>