<template>
	<form @submit.prevent="submit">

		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('name') }}</label>
			<input
				class="form-control az_base_inp"
				type="text"
				:class="{ 'is-invalid': $v.model.name.$error }"
				v-model.trim="$v.model.name.$model"
			>
		</div>


		<base-input-organization
			class="az_base_form_gr"
			v-if="!edit && $store.state.userProfile.systemAdmin"
			:input-class="{ 'is-invalid': $v.model.organizationId.$error }"
			:value.sync="$v.model.organizationId.$model"
		></base-input-organization>


		<base-input-project
			class="az_base_form_gr"
			v-if="!edit"
			external
			:resource="projectList"
			:disabled="$store.state.userProfile.systemAdmin && !model.organizationId"
			:input-class="{ 'is-invalid': $v.model.projectId.$error }"
			:value.sync="$v.model.projectId.$model"
		></base-input-project>


		<base-input-column
			class="az_base_form_gr"
			v-if="!edit"
			external
			:resource="columnList"
			:disabled="!model.projectId"
			:input-class="{ 'is-invalid': $v.model.columnId.$error }"
			:value.sync="$v.model.columnId.$model"
		></base-input-column>


		<div class="d-flex justify-content-between">
			<button
				class="btn az_base_btn btn-primary"
				type="submit"
			>
				<i class="fa fa-save mr-1"></i>
				{{ $t('save') }}
			</button>


			<router-link
				class="btn az_base_btn btn-warning"
				v-if="edit"
				:to="{ name: 'dashboard', params: { id: model.projectId, taskId: model.id } }"
			>
				<i class="fa fa-external-link align-middle mr-1"></i>
				{{ $t('editInDashboard') }}
			</router-link>
		</div>

	</form>
</template>

<script>
import BaseInputOrganization from '../../../../components/BaseInputOrganization';
import BaseInputProject from '../../../../components/BaseInputProject';
import BaseInputColumn from '../../../../components/BaseInputColumn';
import { required } from 'vuelidate/lib/validators';


const notZero = (value) => +value !== 0;


export default {
	name: 'TheForm',
	components: {
		BaseInputOrganization,
		BaseInputColumn,
		BaseInputProject,
	},
	props: {
		model: {
			type: Object,
			required: true,
		},
		edit: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			projectList: [],
			columnList: [],
		};
	},
	validations() {
		let options = {
			model: {
				name: {
					required,
				},
			}
		};


		if (!this.edit) {
			options.model.projectId = {
				notZero,
			};

			options.model.columnId = {
				notZero,
			};

			if (this.$store.state.userProfile.systemAdmin) {
				options.model.organizationId = {
					notZero,
				};
			}
		}

		return options;
	},
	watch: {
		'model.organizationId'(val) {
			if (this.edit) {
				return;
			}

			this.model.projectId = 0;
			this.projectList = [];

			if (val) {
				this.getProjectList(val);
			}
		},
		'model.projectId'(val) {
			if (this.edit) {
				return;
			}

			this.model.columnId = 0;
			this.columnList = [];

			if (val) {
				this.getColumnList(val);
			}
		},
	},
	mounted() {
		if (!this.edit && !this.$store.state.userProfile.systemAdmin) {
			this.getProjectList(0);
		}
	},
	methods: {
		submit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			this.$emit('emit:submit');
		},
		getProjectList(organizationId) {
			this.$api
				.get('/projects/selection', {
					params: {
						organizationId: organizationId,
					}
				})
				.then(response => {
					this.projectList = response.data.data;
				});
		},
		getColumnList(projectId) {
			this.$api
				.get('/project-columns/selection', {
					params: {
						projectId: projectId,
					}
				})
				.then(response => {
					this.columnList = response.data.data;
				});
		}
	}
};
</script>