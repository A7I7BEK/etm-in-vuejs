<template>
	<div
		class="board-item__inner__list"
		:class="{ 'board-list__red': taskItem.timerStatus === TASK_TIMER_TYPE.START }"
		:data-task-ordering="taskItem.ordering"
		:data-task-id="taskItem.id"
		@click="$store.state.taskModalId = taskItem.id"
	>

		<h6>{{ taskItem.name }}</h6>

		<div
			v-if="taskItem.priority || taskItem.level"
			class="board-item__inner__list__lev_prio"
		>
			<div
				v-if="taskItem.priority === TASK_PRIORITY_TYPE.HIGH"
				class="board-item__inner__list__priority"
			>
				<i class="fa fa-fire"></i>
			</div>

			<div
				v-if="taskItem.level"
				class="board-item__inner__list__level"
				:class="{ 'high': taskItem.level === TASK_LEVEL_TYPE.HIGH }"
			>
				<i
					class="fa"
					:class="levelClass[ taskItem.level ]"
				></i>
			</div>
		</div>

		<div class="board-item__inner__list__settings">

			<div
				v-if="taskItem.startDate || taskItem.endDate"
				class="list-settings__date"
			>
				<p :class="statusClass[ taskItem.status ]">
					<template v-if="taskItem.startDate">
						{{ taskItem.startDate | filterDateTime2 }}
					</template>
					<template v-else>...</template>
				</p>
				<span>-</span>
				<p :class="statusClass[ taskItem.status ]">
					<template v-if="taskItem.endDate">
						{{ taskItem.endDate | filterDateTime2 }}
					</template>
					<template v-else>...</template>
				</p>
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
					:title="item.projectMember.employee.firstName + ' ' + item.projectMember.employee.lastName"
				>
					<img
						v-if="item.projectMember.employee.photoFile"
						:src="$store.state.url + item.projectMember.employee.photoFile.url"
					>
					<div v-else>
						{{ item.projectMember.employee.firstName.charAt(0) + item.projectMember.employee.lastName.charAt(0) }}
					</div>
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
import {
	TASK_COMMENT_TYPE,
	TASK_LEVEL_TYPE,
	TASK_PRIORITY_TYPE,
	TASK_STATUS_TYPE,
	TASK_TIMER_TYPE
} from '../../../../../../constants';


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
			TASK_LEVEL_TYPE,
			TASK_PRIORITY_TYPE,
			TASK_TIMER_TYPE,
			levelClass: {
				[ TASK_LEVEL_TYPE.HIGH ]: 'fa-chevron-up',
				[ TASK_LEVEL_TYPE.NORMAL ]: 'fa-minus',
				[ TASK_LEVEL_TYPE.LOW ]: 'fa-chevron-down',
			},
			statusClass: {
				[ TASK_STATUS_TYPE.RED ]: 'danger',
				[ TASK_STATUS_TYPE.YELLOW ]: 'warning',
				// [ TASK_STATUS_TYPE.GREEN ]: 'success',
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