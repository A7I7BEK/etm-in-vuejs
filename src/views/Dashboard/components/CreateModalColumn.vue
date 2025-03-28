<template>
	<div
		class="modal fade modal_column"
		id="modalCreateColumn"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{{ $t('addNewColumn') }} </h5>
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
						@submit.prevent="CreateColumn"
						id="columnCreateForm"
					>
						<div>
							<label class="az_base_lbl">{{ $t('name') }}</label>
							<input
								class="form-control az_base_inp"
								type="text"
								:class="{ 'is-invalid': $v.columnName.$error }"
								ref="columnNameInput"
								v-model.trim="columnName"
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
						form="columnCreateForm"
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
	name: 'CreateModalColumn',
	data() {
		return {
			columnName: null,
		};
	},
	validations: {
		columnName: {
			required,
		},
	},
	mounted() {
		$('#modalCreateColumn').on('shown.bs.modal', () => {
			this.$refs.columnNameInput.focus();
		});

		$('#modalCreateColumn').on('hidden.bs.modal', () => {
			this.columnName = null;
			this.$v.$reset();
		});
	},
	methods: {
		CreateColumn() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			this.$api
				.post('/project-columns', {
					projectId: this.$route.params.id,
					name: this.columnName,
					codeName: this.columnName.toUpperCase().split(' ').join('_'),
					columnType: 'DEFAULT',
				})
				.then(response => {
					$('#modalCreateColumn').modal('hide');
				});
		},
	}
};
</script>