<template>
	<div class="modal-right">
		<div class="modal-header">
			<div
				class="mw-switch us-n"
				v-if="
					can(PERMISSION_TYPE.TASK.UPDATE) &&
					can(PERMISSION_TYPE.TASK_TIMER.START) &&
					can(PERMISSION_TYPE.TASK_TIMER.STOP)
				"
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
					v-if="$store.state.taskModalData.priority"
					:class="priorityClass[ $store.state.taskModalData.priority ]"
				>
					{{ $t(`TASK_PRIORITY_TYPE.${$store.state.taskModalData.priority}`) }}
				</span>
				<span v-else>{{ $t('notSet') }}</span>
			</div>

			<div class="mw-priority align-items-center">
				<h5>{{ $t('timeSpent') }}:</h5>
				<span>{{ $store.state.taskModalData.totalTimeSpent | filterTimeSeconds }}</span>
			</div>
		</div>


		<div
			class="modal-body"
			v-if="
				can(PERMISSION_TYPE.TASK.UPDATE) ||
				can(PERMISSION_TYPE.TASK.DELETE)
			"
		>

			<task-modal-right-member v-if="
				can(PERMISSION_TYPE.TASK_MEMBER.CREATE) &&
				can(PERMISSION_TYPE.TASK_MEMBER.DELETE)
			"></task-modal-right-member>

			<task-modal-right-priority></task-modal-right-priority>

			<task-modal-right-level></task-modal-right-level>

			<task-modal-right-checklist v-if="
				can(PERMISSION_TYPE.CHECK_LIST_GROUP.CREATE)
			"></task-modal-right-checklist>

			<task-modal-right-deadline></task-modal-right-deadline>

			<task-modal-right-attachment v-if="
				can(PERMISSION_TYPE.TASK_ATTACHMENT.CREATE)
			"></task-modal-right-attachment>

			<task-modal-right-label v-if="
				can(PERMISSION_TYPE.TASK_TAG.CREATE) &&
				can(PERMISSION_TYPE.TASK_TAG.DELETE)
			"></task-modal-right-label>

			<task-modal-right-share></task-modal-right-share>


			<h6 v-if="
				can(PERMISSION_TYPE.TASK.MOVE) ||
				can(PERMISSION_TYPE.TASK.COPY)
			">
				{{ $t('actions') }}
			</h6>

			<task-modal-right-move v-if="
				can(PERMISSION_TYPE.TASK.MOVE)
			"></task-modal-right-move>

			<task-modal-right-copy v-if="
				can(PERMISSION_TYPE.TASK.COPY)
			"></task-modal-right-copy>

			<task-modal-right-delete v-if="
				can(PERMISSION_TYPE.TASK.DELETE)
			"></task-modal-right-delete>

		</div>
	</div>
</template>


<script>
import { PERMISSION_TYPE, TASK_PRIORITY_TYPE, TASK_TIMER_TYPE } from '../../../../../constants';
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
			PERMISSION_TYPE,
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
		async ToggleTaskTimer() {
			let status = this.$store.state.taskModalData.timerStatus === TASK_TIMER_TYPE.STOP ?
				TASK_TIMER_TYPE.START : TASK_TIMER_TYPE.STOP;

			this.$store.state.taskModalData.timerStatus = status;

			await this.$api.post('/task-timer', {
				taskId: this.$store.state.taskModalData.id,
				timerStatus: status,
			});
		}
	},
};
</script>