<template>
	<i18n
		tag="p"
		:path="`actionItem.${activityTypePlus}`"
	>
		<template
			#oldProjectName
			v-if="action.details.action === 'migrate'"
		>
			{{ action.details.oldProject.name }}
		</template>

		<template
			#oldColumnName
			v-if="action.details.action === 'move'"
		>
			{{ action.details.oldColumn.name }}
		</template>
		<template
			#newColumnName
			v-if="action.details.action === 'move'"
		>
			{{ action.details.newColumn.name }}
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
	name: 'ActionTaskMove',
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
		activityTypePlus() {
			const { activityType, details } = this.action;

			return activityType + details.action;
		}
	},
	methods: {
		showModal() {
			this.$store.state.taskModalId = this.action.task.id;
		}
	},
};
</script>