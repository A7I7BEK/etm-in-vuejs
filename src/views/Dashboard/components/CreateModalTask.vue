<template>
	<div
		class="modal fade modal_task"
		id="modalCreateTask"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{{ $t('boardColumn.addTask') }}</h5>
					<button
						class="close"
						type="button"
						data-dismiss="modal"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<form
						@submit.prevent="CreateTask"
						id="taskCreateForm"
					>
						<div>
							<label class="az_base_lbl">{{ $t('name') }}</label>
							<input
								class="form-control az_base_inp"
								type="text"
								:class="{ 'is-invalid': $v.taskName.$error }"
								ref="taskNameInput"
								v-model.trim="taskName"
							>
						</div>
					</form>
				</div>

				<div class="d-flex justify-content-between p-3">
					<button
						class="btn az_base_btn btn-default button-effect"
						type="button"
						data-dismiss="modal"
					>{{ $t('cancel') }}</button>
					<button
						class="btn az_base_btn btn-primary button-effect"
						form="taskCreateForm"
						type="submit"
					>{{ $t('save') }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';


export default {
	name: 'CreateModalTask',
	data() {
		return {
			taskName: null,
		};
	},
	validations: {
		taskName: {
			required,
		},
	},
	mounted() {
		$('#modalCreateTask').on('shown.bs.modal', () => {
			this.$refs.taskNameInput.focus();
		});

		$('#modalCreateTask').on('hidden.bs.modal', () => {
			this.taskName = null;
			this.$v.$reset();
			this.$store.state.createModalTaskId = 0;
		});
	},
	methods: {
		CreateTask() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			this.$api
				.post('/tasks', {
					projectId: Number(this.$route.params.id),
					columnId: this.$store.state.createModalTaskId,
					name: this.taskName,
				})
				.then(response => {
					$('#modalCreateTask').modal('hide');
				});
		},
	}
};
</script>