<template>
	<div class="modal-left">
		<div class="modal-header">
			<div class="mw-title az_task_mdl_hd">
				<div class="d-flex align-items-center az_task_mdl_hd_text">
					<div
						class="mr-2"
						v-if="can('TASK_UPDATE')"
					>
						<div
							class="d-flex"
							v-if="taskNameEditMode"
						>
							<button
								type="button"
								class="btn btn-sm az_r_menu_ttl_btn"
								@click="EditTaskName"
							>
								<b class="fa fa-check"></b>
							</button>
							<button
								type="button"
								class="btn btn-sm az_r_menu_ttl_btn"
								@click="taskNameEditMode = false;"
							>
								<b class="fa fa-close"></b>
							</button>
						</div>
						<div
							class="d-flex"
							v-else
						>
							<button
								type="button"
								class="btn btn-sm az_r_menu_ttl_btn"
								@click="taskNameEditMode = true; taskNameForEdit = $store.state.taskModalData.name"
							>
								<b class="fa fa-pencil"></b>
							</button>
						</div>
					</div>

					<div class="flex-fill">
						<form
							@submit.prevent="EditTaskName"
							v-if="taskNameEditMode"
						>
							<input
								type="text"
								class="form-control dn_text_area"
								:class="{ 'is-invalid': $v.taskNameForEdit.$error }"
								v-model.trim="taskNameForEdit"
							>
						</form>
						<h5
							class="modal-title new-team"
							v-else
						>{{ $store.state.taskModalData.name }}</h5>
					</div>
				</div>

				<button
					type="button"
					class="mw-close"
					data-dismiss="modal"
					aria-label="Close"
				>
					<p>{{ $t('close') }}</p>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="mw-title__bottom">
				<div class="mw-title__btm__left">
					<span>{{ $t('column') }}</span>
					<div class="column-name">
						<a
							href="#"
							@click.prevent
						>
							{{ $store.state.taskModalData.columnName }}
						</a>
					</div>
				</div>

				<div class="mw-title__btm__right">
					<span>{{ $t('difficultyLevel') }}:</span>
					<span
						v-if="$store.state.taskModalData.taskLevelType">{{ $t($store.state.taskModalData.taskLevelType) }}</span>
					<span v-else>{{ $t('notSet') }}</span>
					<!--<div-->
					<!--v-if="$store.state.taskModalData.taskLevelType"-->
					<!--class="level-status"-->
					<!--:class="[-->
					<!--{'danger': $store.state.taskModalData.taskLevelType === TASK_LEVEL_TYPE.HIGH},-->
					<!--{'warning': $store.state.taskModalData.taskLevelType === TASK_LEVEL_TYPE.NORMAL},-->
					<!--{'success': $store.state.taskModalData.taskLevelType === TASK_LEVEL_TYPE.LOW}-->
					<!--]"-->
					<!--&gt;-->
					<!--<span>{{ $store.state.taskModalData.taskLevelType.name }}</span>-->
					<!--</div>-->
				</div>
			</div>
		</div>


		<div class="modal-body">
			<div class="modal-body__home">

				<task-modal-left-information></task-modal-left-information>

				<task-modal-left-attachment v-if="can('TASK_ATTACHMENT_READ')"></task-modal-left-attachment>

				<task-modal-left-description></task-modal-left-description>

				<template v-if="can('CHECKLIST_GROUP_READ')">
					<task-modal-left-checklist
						v-for="item in $store.state.taskModalData.checkListGroups"
						:key="item.id"
						:check-list-data-prop="item"
					></task-modal-left-checklist>
				</template>

				<task-modal-left-activity></task-modal-left-activity>

			</div>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { TASK_LEVEL_TYPE } from '../../../../../constants';
import TaskModalLeftActivity from './TaskModalLeftActivity';
import TaskModalLeftAttachment from './TaskModalLeftAttachment';
import TaskModalLeftChecklist from './TaskModalLeftChecklist';
import TaskModalLeftDescription from './TaskModalLeftDescription';
import TaskModalLeftInformation from './TaskModalLeftInformation';


export default {
	name: 'TaskModalLeft',
	components: {
		TaskModalLeftActivity,
		TaskModalLeftChecklist,
		TaskModalLeftDescription,
		TaskModalLeftAttachment,
		TaskModalLeftInformation,
	},
	data() {
		return {
			TASK_LEVEL_TYPE,
			taskNameEditMode: false,
			taskNameForEdit: null,
		};
	},
	validations: {
		taskNameForEdit: {
			required,
		},
	},
	methods: {
		EditTaskName() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			this.$api
				.put('/tasks/' + this.$store.state.taskModalData.id, {
					name: this.taskNameForEdit,
				})
				.then(response => {
					this.$store.state.taskModalData.name = this.taskNameForEdit;
					this.taskNameEditMode = false;
					this.taskNameForEdit = null;
					this.$v.$reset();
				});
		},
	}
};
</script>