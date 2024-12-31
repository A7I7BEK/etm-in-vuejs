<template>
	<div class="board-item__inner__list" @click="$store.state.taskModalId = taskItem.id"
		 :class="{'board-list__red': taskItem.taskPriorityType && taskItem.taskPriorityType.value === $store.state.TASK_PRIORITY_TYPE.HIGH}">

		<h6>{{ taskItem.name }}</h6>

		<div class="board-item__inner__list__settings">

			<div class="list-settings__date" v-if="$moment(taskItem.deadLine).isValid()">
				<span :class="[
					{'danger': taskItem.status === $store.state.TASK_STATUS_TYPE.RED},
					{'warning': taskItem.status === $store.state.TASK_STATUS_TYPE.YELLOW},
					{'success': taskItem.status === $store.state.TASK_STATUS_TYPE.GREEN}
				]">
					<template v-if="$moment().diff($moment(taskItem.deadLine), 'years') > 0">
						{{ taskItem.deadLine | filterDateMonth }}
					</template>
					<template v-else>
						{{ taskItem.deadLine | filterMonthTime }}
					</template>
				</span>
			</div>

			<div class="list-settings_comment" v-if="taskItem.commentCount > 0">
				<img src="/img/svg/comment.svg" alt="">
				<span>{{ taskItem.commentCount }}</span>
			</div>

			<div class="list-settings__action__type" v-if="taskItem.lastCommentType && Object.keys(taskItem.lastCommentType).length > 0">
				<span class="success" v-if="taskItem.lastCommentType.value === $store.state.TASK_COMMENT_TYPE.SOLUTION">{{$t('solution')}}</span>
				<span class="danger" v-else-if="taskItem.lastCommentType.value === $store.state.TASK_COMMENT_TYPE.PROBLEM">{{$t('problem')}}</span>
				<span v-else-if="taskItem.lastCommentType.value === $store.state.TASK_COMMENT_TYPE.INFORMATION">{{$t('information')}}</span>
			</div>

			<div class="list-settings_checkbox" v-if="taskItem.checkListCount.totalCount > 0">
				<img src="/img/svg/checkbox.svg" alt="">
				<span>{{ taskItem.checkListCount.checkedCount }} - {{ taskItem.checkListCount.totalCount }}</span>
			</div>

			<div class="list-settings__users__main" v-if="taskItem.members.length > 0">
				<div class="list-settings__user" v-for="item in taskItem.members" :title="item.employee.firstName + ' ' + item.employee.lastName">
					<img v-if="item.employee.photoUrl" :src="$store.state.url + item.employee.photoUrl">
					<div v-else>{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}</div>
				</div>
			</div>

			<div class="list-settings__users__colors" v-if="taskItem.tagList.length > 0">
				<div class="list-color__main">
					<div class="list-color__main__item"
						 v-for="item in taskItem.tagList"
						 :key="item.id"
						 :style="{ background: item.color }"
					>
						{{ item.name }}
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'BoardTask',
		props: {
			taskItem: {
				type: Object,
				required: true,
				default: {},
			},
		},
	};
</script>