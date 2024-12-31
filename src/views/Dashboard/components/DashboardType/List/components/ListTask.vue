<template>
	<div class="ln_board_item1_body_1" @click="$store.state.taskModalId = taskItem.id">
		<div class="ln_board_item1_body_1_left"
			 :class="{'high': taskItem.taskPriorityType && taskItem.taskPriorityType.value === $store.state.TASK_PRIORITY_TYPE.HIGH}">
			<p class="ln_board_item1_body_1_left_pp">{{ taskItem.name }}</p>
		</div>


		<div class="ln_board_item1_body_1_right">
			<div class="ln_board_item1_body_1_right_00"
				 v-if="$moment(taskItem.deadLine).isValid()"
				 :class="[
				 	{'danger': taskItem.status === $store.state.TASK_STATUS_TYPE.RED},
				 	{'warning': taskItem.status === $store.state.TASK_STATUS_TYPE.YELLOW},
				 	{'success': taskItem.status === $store.state.TASK_STATUS_TYPE.GREEN}
				 ]"
			>
				<p v-if="$moment().diff($moment(taskItem.deadLine), 'years') > 0">
					{{ taskItem.deadLine | filterDateMonth }}
				</p>
				<p v-else>
					{{ taskItem.deadLine | filterMonthTime }}
				</p>
			</div>


			<div class="ln_board_item1_body_1_right_11" v-if="taskItem.checkListCount.totalCount > 0 || taskItem.commentCount > 0">
				<div class="ln_board_item1_____11" v-if="taskItem.checkListCount.totalCount > 0">
					<img src="/img/rom3.png">
					<span>{{ taskItem.checkListCount.checkedCount }} - {{ taskItem.checkListCount.totalCount }}</span>
				</div>

				<div class="ln_board_item1_____11" v-if="taskItem.commentCount > 0">
					<img src="/img/rom1.png">
					<span>{{ taskItem.commentCount }}</span>
				</div>
				<div class="ln_board_item1_____11" v-if="taskItem.lastCommentType && Object.keys(taskItem.lastCommentType).length > 0">
					<span class="ln_color_green" v-if="taskItem.lastCommentType.value === $store.state.TASK_COMMENT_TYPE.SOLUTION">{{$t('solution')}}</span>
					<span class="ln_color_red" v-else-if="taskItem.lastCommentType.value === $store.state.TASK_COMMENT_TYPE.PROBLEM">{{$t('problem')}}</span>
					<span v-else-if="taskItem.lastCommentType.value === $store.state.TASK_COMMENT_TYPE.INFORMATION">{{$t('information')}}</span>
				</div>
			</div>


			<div class="ln_board_item1_header_right" v-if="computedMembers.list.length > 0">
				<div class="ln_board_header_left_2 ln_margin_left5">
					<button class="ln_common32_btn"
							v-for="item in computedMembers.list"
							:class="{'ln_width_auto': !item.employee.photoUrl}"
							:title="item.employee.firstName + ' ' + item.employee.lastName"
					>
						<img class="ln_common32_btn_person" v-if="item.employee.photoUrl" :src="$store.state.url + item.employee.photoUrl">
						<span class="ln_common32_btn_name" v-else>{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}</span>
					</button>

					<button class="ln_common32_btn ln_bg_color_dark ln_width_auto button-effect" v-if="computedMembers.remainder > 0">
						<span class="ln_common32_btn_number">+{{ computedMembers.remainder }}</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ListTask',
		props: {
			taskItem: {
				type: Object,
				required: true,
				default: {},
			},
		},
		computed: {
			computedMembers()
			{
				let tempMembers = {
					list: [],
					remainder: 0,
				};

				tempMembers.list = this.taskItem.members.length > 4 ? this.taskItem.members.slice(0, 3) : this.taskItem.members;
				tempMembers.remainder = this.taskItem.members.length > 4 ? this.taskItem.members.length - 4 : 0;
				return tempMembers;
			},
		}
	};
</script>