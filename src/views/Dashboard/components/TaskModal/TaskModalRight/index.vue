<template>
	<div class="modal-right">
		<div class="modal-header">
			<div
				class="mw-switch us-n"
				v-if="can('TASK_UPDATE') && can('TASK_CREATE_TIME')"
				@click="ToggleTaskTimer"
			>
				<div
					class="switch-start switch-item"
					v-if="$store.state.taskModalData.timerStatus === TASK_TIMER_TYPE.STOP"
				>
					<div class="mw-switch-icon">
						<i class="fa fa-power-off"></i>
					</div>
					<span>{{ $t('TASK_TIMER_TYPE.START') }}</span>
				</div>

				<div
					class="switch-stop switch-item"
					v-else
				>
					<div class="mw-switch-icon">
						<i class="fa fa-power-off"></i>
					</div>
					<span>{{ $t('TASK_TIMER_TYPE.STOP') }}</span>
				</div>
			</div>


			<div class="mw-priority align-items-center">
				<h5>{{ $t('priority') }}:</h5>
				<span
					v-if="$store.state.taskModalData.taskPriorityType"
					:class="priorityClass[ $store.state.taskModalData.taskPriorityType ]"
				>
					{{ $t(`TASK_PRIORITY_TYPE.${$store.state.taskModalData.taskPriorityType}`) }}
				</span>
				<span v-else>{{ $t('notSet') }}</span>
			</div>
		</div>


		<div
			class="modal-body"
			v-if="can('TASK_UPDATE')"
		>

			<task-modal-right-member
				v-if="can('TASK_MEMBER_CREATE') && can('TASK_MEMBER_DELETE')"></task-modal-right-member>

			<task-modal-right-priority></task-modal-right-priority>

			<task-modal-right-level></task-modal-right-level>

			<task-modal-right-checklist v-if="can('CHECKLIST_GROUP_CREATE')"></task-modal-right-checklist>

			<task-modal-right-deadline></task-modal-right-deadline>

			<task-modal-right-attachment v-if="can('TASK_ATTACHMENT_CREATE')"></task-modal-right-attachment>

			<task-modal-right-label v-if="can('TASK_TAG_CREATE') && can('TASK_TAG_DELETE')"></task-modal-right-label>

			<task-modal-right-share></task-modal-right-share>


			<h6 v-if="can('TASK_MOVE') || can('TASK_COPY')">{{ $t('actions') }}</h6>

			<task-modal-right-move v-if="can('TASK_MOVE')"></task-modal-right-move>

			<task-modal-right-copy v-if="can('TASK_COPY')"></task-modal-right-copy>

			<task-modal-right-delete v-if="can('TASK_DELETE')"></task-modal-right-delete>

		</div>
	</div>
</template>


<script>
import { TASK_PRIORITY_TYPE, TASK_TIMER_TYPE } from '../../../../../constants';
import TaskModalRightAttachment from './TaskModalRightAttachment';
import TaskModalRightChecklist from './TaskModalRightChecklist';
import TaskModalRightCopy from './TaskModalRightCopy';
import TaskModalRightDeadline from './TaskModalRightDeadline';
import TaskModalRightDelete from './TaskModalRightDelete';
import TaskModalRightLabel from './TaskModalRightLabel';
import TaskModalRightLevel from './TaskModalRightLevel';
import TaskModalRightMember from './TaskModalRightMember';
import TaskModalRightMove from './TaskModalRightMove';
import TaskModalRightPriority from './TaskModalRightPriority';
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
	data() {
		return {
			TASK_TIMER_TYPE,
			priorityClass: {
				[ TASK_PRIORITY_TYPE.HIGH ]: 'p-danger',
				[ TASK_PRIORITY_TYPE.NORMAL ]: 'p-warning',
				[ TASK_PRIORITY_TYPE.LOW ]: 'p-success',
			},
		};
	},
	created() {
		this.GetProjectSelectionAll();
	},
	methods: {
		GetProjectSelectionAll() {
			this.$api
				.get('/projects/selection')
				.then(response => {
					this.$store.commit('setProjectSelectionList', response.data.data);
				});
		},
		ToggleTaskTimer() {
			let status = this.$store.state.taskModalData.timerStatus === TASK_TIMER_TYPE.STOP ?
				TASK_TIMER_TYPE.START : TASK_TIMER_TYPE.STOP;

			this.$store.state.taskModalData.timerStatus = status;
			this.$api
				.post('/task-timer', {
					id: this.$store.state.taskModalData.id,
					entryTypeCode: status,
				});
		}
	},
};
</script>