<template>
	<div
		class="board-item__inner__list"
		:class="{ 'board-list__red': taskItem.priority === TASK_PRIORITY_TYPE.HIGH }"
		:data-task-ordering="taskItem.ordering"
		:data-task-id="taskItem.id"
		@click="$store.state.taskModalId = taskItem.id"
	>

		<h6>{{ taskItem.name }}</h6>

		<div class="board-item__inner__list__settings">

			<div
				class="list-settings__date"
				v-if="$moment(taskItem.endDate).isValid()"
			>
				<span :class="statusClass[ taskItem.status ]">
					<template v-if="$moment().diff($moment(taskItem.endDate), 'years') > 0">
						{{ taskItem.endDate | filterDateMonth }}
					</template>
					<template v-else>
						{{ taskItem.endDate | filterMonthTime }}
					</template>
				</span>
			</div>

			<div
				class="list-settings_comment"
				v-if="taskItem.commentCount > 0"
			>
				<img
					src="/img/svg/comment.svg"
					alt=""
				>
				<span>{{ taskItem.commentCount }}</span>
			</div>

			<div
				class="list-settings__action__type"
				v-if="taskItem.lastCommentType"
			>
				<span :class="commentClass[ taskItem.lastCommentType ]">
					{{ $t(`TASK_COMMENT_TYPE.${taskItem.lastCommentType}`) }}
				</span>
			</div>

			<div
				class="list-settings_checkbox"
				v-if="taskItem.checkListCount"
			>
				<img
					src="/img/svg/checkbox.svg"
					alt=""
				>
				<span>{{ taskItem.checkListCount.checkedCount }} - {{ taskItem.checkListCount.totalCount }}</span>
			</div>

			<div
				class="list-settings__users__main"
				v-if="taskItem.members.length > 0"
			>
				<div
					class="list-settings__user"
					v-for="item in taskItem.members"
					:title="item.employee.firstName + ' ' + item.employee.lastName"
				>
					<img
						v-if="item.employee.photoFile"
						:src="$store.state.url + item.employee.photoFile.url"
					>
					<div v-else>{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}</div>
				</div>
			</div>

			<div
				class="list-settings__users__colors"
				v-if="taskItem.tags.length > 0"
			>
				<div class="list-color__main">
					<div
						class="list-color__main__item"
						v-for="item in taskItem.tags"
						:key="item.id"
						:style="{ background: item.projectTag.color }"
					>
						{{ item.projectTag.name }}
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import { TASK_COMMENT_TYPE, TASK_PRIORITY_TYPE, TASK_STATUS_TYPE } from '../../../../../../constants';

export default {
	name: 'BoardTask',
	props: {
		taskItem: {
			type: Object,
			required: true,
			default: {},
		},
	},
	data() {
		return {
			TASK_PRIORITY_TYPE,
			statusClass: {
				[ TASK_STATUS_TYPE.RED ]: 'danger',
				[ TASK_STATUS_TYPE.YELLOW ]: 'warning',
				[ TASK_STATUS_TYPE.GREEN ]: 'success',
			},
			commentClass: {
				[ TASK_COMMENT_TYPE.INFORMATION ]: '',
				[ TASK_COMMENT_TYPE.SOLUTION ]: 'success',
				[ TASK_COMMENT_TYPE.PROBLEM ]: 'danger',
			},
		};
	},
};
</script>