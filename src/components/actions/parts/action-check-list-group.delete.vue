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


export default {
	name: 'ActionCheckListGroupDelete',
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
				[ PERMISSION_TYPE.CHECK_LIST_GROUP.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.CHECK_LIST_GROUP.UPDATE ]: 'ComponentA',
				[ PERMISSION_TYPE.CHECK_LIST_GROUP.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.CHECK_LIST_ITEM.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.CHECK_LIST_ITEM.UPDATE ]: 'ComponentA',
				[ PERMISSION_TYPE.CHECK_LIST_ITEM.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_COLUMN.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_COLUMN.UPDATE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_COLUMN.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_COLUMN.MOVE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_MEMBER.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_MEMBER.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_TAG.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_TAG.UPDATE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT_TAG.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT.UPDATE ]: 'ComponentA',
				[ PERMISSION_TYPE.PROJECT.CHANGE_BACKGROUND ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_ATTACHMENT.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_ATTACHMENT.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_COMMENT.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_COMMENT.UPDATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_COMMENT.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_DEADLINE.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_DEADLINE.UPDATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_DEADLINE.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_MEMBER.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_MEMBER.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_TAG.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_TAG.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_TIMER.START ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK_TIMER.STOP ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK.CREATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK.UPDATE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK.DELETE ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK.COPY ]: 'ComponentA',
				[ PERMISSION_TYPE.TASK.MOVE ]: 'ComponentA',
			},
		};
	},
};
</script>