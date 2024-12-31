<template>
	<div class="modal-right">
		<div class="modal-header">
			<div class="mw-switch us-n"
				 v-if="can('TASK_UPDATE') && can('TASK_CREATE_TIME')"
				 @click="ToggleTaskTimer"
			>
				<div class="switch-start switch-item" v-if="$store.state.taskModalData.timeEntryType === $store.state.TASK_TIMER.STOP">
					<div class="mw-switch-icon">
						<i class="fa fa-power-off"></i>
					</div>
					<span>{{$t('start')}}</span>
				</div>

				<div class="switch-stop switch-item" v-else>
					<div class="mw-switch-icon">
						<i class="fa fa-power-off"></i>
					</div>
					<span>{{$t('stop')}}</span>
				</div>
			</div>


			<div class="mw-priority align-items-center">
				<h5>{{$t('priority')}}:</h5>
				<span v-if="$store.state.taskModalData.taskPriorityType"
					  :class="[
						{'p-danger': $store.state.taskModalData.taskPriorityType.value === $store.state.TASK_PRIORITY_TYPE.HIGH},
						{'p-warning': $store.state.taskModalData.taskPriorityType.value === $store.state.TASK_PRIORITY_TYPE.NORMAL},
						{'p-success': $store.state.taskModalData.taskPriorityType.value === $store.state.TASK_PRIORITY_TYPE.LOW}
					  ]"
				>
					{{ $t($store.state.taskModalData.taskPriorityType.value) }}
				</span>
				<span v-else>{{$t('notSet')}}</span>
			</div>
		</div>


		<div class="modal-body" v-if="can('TASK_UPDATE')">

			<task-modal-right-member v-if="can('TASK_MEMBER_CREATE') && can('TASK_MEMBER_DELETE')"></task-modal-right-member>

			<task-modal-right-priority></task-modal-right-priority>

			<task-modal-right-level></task-modal-right-level>

			<task-modal-right-checklist v-if="can('CHECKLIST_GROUP_CREATE')"></task-modal-right-checklist>

			<task-modal-right-deadline></task-modal-right-deadline>

			<task-modal-right-attachment v-if="can('TASK_ATTACHMENT_CREATE')"></task-modal-right-attachment>

			<task-modal-right-label v-if="can('TASK_TAG_CREATE') && can('TASK_TAG_DELETE')"></task-modal-right-label>

			<task-modal-right-share></task-modal-right-share>


			<h6 v-if="can('TASK_MOVE') || can('TASK_COPY')">{{$t('actions')}}</h6>

			<task-modal-right-move v-if="can('TASK_MOVE')"></task-modal-right-move>

			<task-modal-right-copy v-if="can('TASK_COPY')"></task-modal-right-copy>

			<task-modal-right-delete v-if="can('TASK_DELETE')"></task-modal-right-delete>

		</div>
	</div>
</template>


<script>
	import TaskModalRightMember from './TaskModalRightMember';
	import TaskModalRightPriority from './TaskModalRightPriority';
	import TaskModalRightLevel from './TaskModalRightLevel';
	import TaskModalRightChecklist from './TaskModalRightChecklist';
	import TaskModalRightDeadline from './TaskModalRightDeadline';
	import TaskModalRightAttachment from './TaskModalRightAttachment';
	import TaskModalRightLabel from './TaskModalRightLabel';
	import TaskModalRightMove from './TaskModalRightMove';
	import TaskModalRightCopy from './TaskModalRightCopy';
	import TaskModalRightDelete from './TaskModalRightDelete';
	import TaskModalRightShare from './TaskModalRightShare';


	export default {
		name: 'TaskModalRight',
		components: {
			TaskModalRightShare,
			TaskModalRightDelete,
			TaskModalRightCopy,
			TaskModalRightMove,
			TaskModalRightLabel,
			TaskModalRightAttachment,
			TaskModalRightDeadline,
			TaskModalRightChecklist,
			TaskModalRightLevel,
			TaskModalRightPriority,
			TaskModalRightMember,
		},
		created()
		{
			this.GetProjectSelectionAll();
		},
		methods: {
			GetProjectSelectionAll()
			{
				this.$api
					.get('projects/selection')
					.then(response => {
						this.$store.commit('setProjectSelectionList', response.data.data);
					});
			},
			ToggleTaskTimer()
			{
				let status = this.$store.state.taskModalData.timeEntryType === this.$store.state.TASK_TIMER.STOP ?
					this.$store.state.TASK_TIMER.START : this.$store.state.TASK_TIMER.STOP;

				this.$store.state.taskModalData.timeEntryType = status;
				this.$api
					.post('taskTimer', {
						id: this.$store.state.taskModalData.id,
						entryTypeCode: status,
					});
			}
		},
	};
</script>