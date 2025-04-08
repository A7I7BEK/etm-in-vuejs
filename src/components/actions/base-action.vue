<template>
	<div class="az_action_item">
		<component
			:is="componentMap[ action.activityType ]"
			:action="action"
			:clickable="clickable"
		></component>
	</div>
</template>

<script>
import { PERMISSION_TYPE } from '../../constants';
import ActionCheckListGroupCreate from './parts/action-check-list-group.create.vue';
import ActionCheckListGroupDelete from './parts/action-check-list-group.delete.vue';
import ActionCheckListGroupUpdate from './parts/action-check-list-group.update.vue';
import ActionCheckListItemCreate from './parts/action-check-list-item.create.vue';
import ActionCheckListItemDelete from './parts/action-check-list-item.delete.vue';
import ActionCheckListItemUpdate from './parts/action-check-list-item.update.vue';
import ActionProjectColumnCreate from './parts/action-project-column.create.vue';
import ActionProjectColumnDelete from './parts/action-project-column.delete.vue';
import ActionProjectColumnMove from './parts/action-project-column.move.vue';
import ActionProjectColumnUpdate from './parts/action-project-column.update.vue';
import ActionProjectMemberCreate from './parts/action-project-member.create.vue';
import ActionProjectMemberDelete from './parts/action-project-member.delete.vue';
import ActionProjectTagCreate from './parts/action-project-tag.create.vue';
import ActionProjectTagDelete from './parts/action-project-tag.delete.vue';
import ActionProjectTagUpdate from './parts/action-project-tag.update.vue';
import ActionProjectChangeBackground from './parts/action-project.change-background.vue';
import ActionProjectCreate from './parts/action-project.create.vue';
import ActionProjectUpdate from './parts/action-project.update.vue';
import ActionTaskAttachmentCreate from './parts/action-task-attachment.create.vue';
import ActionTaskAttachmentDelete from './parts/action-task-attachment.delete.vue';
import ActionTaskCommentCreate from './parts/action-task-comment.create.vue';
import ActionTaskCommentDelete from './parts/action-task-comment.delete.vue';
import ActionTaskCommentUpdate from './parts/action-task-comment.update.vue';
import ActionTaskDeadlineCreate from './parts/action-task-deadline.create.vue';
import ActionTaskDeadlineDelete from './parts/action-task-deadline.delete.vue';
import ActionTaskDeadlineUpdate from './parts/action-task-deadline.update.vue';
import ActionTaskMemberCreate from './parts/action-task-member.create.vue';
import ActionTaskMemberDelete from './parts/action-task-member.delete.vue';
import ActionTaskTagCreate from './parts/action-task-tag.create.vue';
import ActionTaskTagDelete from './parts/action-task-tag.delete.vue';
import ActionTaskTimerStart from './parts/action-task-timer.start.vue';
import ActionTaskTimerStop from './parts/action-task-timer.stop.vue';
import ActionTaskCopy from './parts/action-task.copy.vue';
import ActionTaskCreate from './parts/action-task.create.vue';
import ActionTaskDelete from './parts/action-task.delete.vue';
import ActionTaskMove from './parts/action-task.move.vue';
import ActionTaskUpdate from './parts/action-task.update.vue';



export default {
	name: 'BaseAction',
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
	data() {
		return {
			componentMap: {
				[ PERMISSION_TYPE.CHECK_LIST_GROUP.CREATE ]: ActionCheckListGroupCreate,
				[ PERMISSION_TYPE.CHECK_LIST_GROUP.UPDATE ]: ActionCheckListGroupUpdate,
				[ PERMISSION_TYPE.CHECK_LIST_GROUP.DELETE ]: ActionCheckListGroupDelete,
				[ PERMISSION_TYPE.CHECK_LIST_ITEM.CREATE ]: ActionCheckListItemCreate,
				[ PERMISSION_TYPE.CHECK_LIST_ITEM.UPDATE ]: ActionCheckListItemUpdate,
				[ PERMISSION_TYPE.CHECK_LIST_ITEM.DELETE ]: ActionCheckListItemDelete,
				[ PERMISSION_TYPE.PROJECT_COLUMN.CREATE ]: ActionProjectColumnCreate,
				[ PERMISSION_TYPE.PROJECT_COLUMN.UPDATE ]: ActionProjectColumnUpdate,
				[ PERMISSION_TYPE.PROJECT_COLUMN.DELETE ]: ActionProjectColumnDelete,
				[ PERMISSION_TYPE.PROJECT_COLUMN.MOVE ]: ActionProjectColumnMove,
				[ PERMISSION_TYPE.PROJECT_MEMBER.CREATE ]: ActionProjectMemberCreate,
				[ PERMISSION_TYPE.PROJECT_MEMBER.DELETE ]: ActionProjectMemberDelete,
				[ PERMISSION_TYPE.PROJECT_TAG.CREATE ]: ActionProjectTagCreate,
				[ PERMISSION_TYPE.PROJECT_TAG.UPDATE ]: ActionProjectTagUpdate,
				[ PERMISSION_TYPE.PROJECT_TAG.DELETE ]: ActionProjectTagDelete,
				[ PERMISSION_TYPE.PROJECT.CREATE ]: ActionProjectCreate,
				[ PERMISSION_TYPE.PROJECT.UPDATE ]: ActionProjectUpdate,
				[ PERMISSION_TYPE.PROJECT.CHANGE_BACKGROUND ]: ActionProjectChangeBackground,
				[ PERMISSION_TYPE.TASK_ATTACHMENT.CREATE ]: ActionTaskAttachmentCreate,
				[ PERMISSION_TYPE.TASK_ATTACHMENT.DELETE ]: ActionTaskAttachmentDelete,
				[ PERMISSION_TYPE.TASK_COMMENT.CREATE ]: ActionTaskCommentCreate,
				[ PERMISSION_TYPE.TASK_COMMENT.UPDATE ]: ActionTaskCommentUpdate,
				[ PERMISSION_TYPE.TASK_COMMENT.DELETE ]: ActionTaskCommentDelete,
				[ PERMISSION_TYPE.TASK_DEADLINE.CREATE ]: ActionTaskDeadlineCreate,
				[ PERMISSION_TYPE.TASK_DEADLINE.UPDATE ]: ActionTaskDeadlineUpdate,
				[ PERMISSION_TYPE.TASK_DEADLINE.DELETE ]: ActionTaskDeadlineDelete,
				[ PERMISSION_TYPE.TASK_MEMBER.CREATE ]: ActionTaskMemberCreate,
				[ PERMISSION_TYPE.TASK_MEMBER.DELETE ]: ActionTaskMemberDelete,
				[ PERMISSION_TYPE.TASK_TAG.CREATE ]: ActionTaskTagCreate,
				[ PERMISSION_TYPE.TASK_TAG.DELETE ]: ActionTaskTagDelete,
				[ PERMISSION_TYPE.TASK_TIMER.START ]: ActionTaskTimerStart,
				[ PERMISSION_TYPE.TASK_TIMER.STOP ]: ActionTaskTimerStop,
				[ PERMISSION_TYPE.TASK.CREATE ]: ActionTaskCreate,
				[ PERMISSION_TYPE.TASK.UPDATE ]: ActionTaskUpdate,
				[ PERMISSION_TYPE.TASK.DELETE ]: ActionTaskDelete,
				[ PERMISSION_TYPE.TASK.COPY ]: ActionTaskCopy,
				[ PERMISSION_TYPE.TASK.MOVE ]: ActionTaskMove,
			},
		};
	},
};
</script>