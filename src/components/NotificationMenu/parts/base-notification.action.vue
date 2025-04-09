<template>
	<div class="az_action_item">
		<component
			:is="componentMap[ notification.type ]"
			:notifType="notification.type"
			:action="notification.action"
		></component>
	</div>
</template>

<script>
import { NOTIFICATION_TYPE } from '../../../constants';
import NotificationCheckListItemAction from './notification-check-list-item.action.vue';
import NotificationCommentAction from './notification-comment.action.vue';
import NotificationTaskAction from './notification-task.action.vue';



export default {
	name: 'BaseNotificationAction',
	props: {
		notification: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			componentMap: {
				[ NOTIFICATION_TYPE.TASK ]: NotificationTaskAction,
				[ NOTIFICATION_TYPE.COMMENT ]: NotificationCommentAction,
				[ NOTIFICATION_TYPE.CHECK_LIST_ITEM ]: NotificationCheckListItemAction,
			},
		};
	},
};
</script>