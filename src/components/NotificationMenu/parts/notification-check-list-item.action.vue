<template>
	<i18n
		tag="p"
		:path="`notifItem.${notifType}`"
	>
		<template #itemName>
			{{ action.details.checkListItem.text }}
		</template>

		<template #taskName>
			<a
				href="#"
				@click.prevent="showModal"
			>
				{{ action.task.name }}
			</a>
		</template>
	</i18n>
</template>

<script>
export default {
	name: 'NotificationCheckListItemAction',
	props: {
		notifType: {
			type: String,
			required: true,
		},
		action: {
			type: Object,
			required: true,
		},
	},
	methods: {
		showModal() {
			this.$store.state.taskModalId = this.action.task.id;
		}
	},
};
</script>