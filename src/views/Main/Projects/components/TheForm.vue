<template>
	<form @submit.prevent="submit">

		<base-input-organization
			class="az_base_form_gr"
			v-if="!edit && $store.state.systemAdmin"
			:input-class="{ 'is-invalid': $v.model.organizationId.$error }"
			:value.sync="$v.model.organizationId.$model"
		></base-input-organization>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('name') }}</label>
			<input
				class="form-control az_base_inp"
				type="text"
				:class="{ 'is-invalid': $v.model.name.$error }"
				v-model.trim="$v.model.name.$model"
			>
		</div>


		<base-input-project-type
			class="az_base_form_gr"
			v-if="!edit"
			:input-class="{ 'is-invalid': $v.model.projectType.$error }"
			:value.sync="$v.model.projectType.$model"
		></base-input-project-type>


		<base-input-group
			class="az_base_form_gr"
			external
			:resource="groupList"
			:input-class="{ 'is-invalid': $v.model.groupId.$error }"
			:value.sync="$v.model.groupId.$model"
		></base-input-group>


		<base-input-manager
			class="az_base_form_gr"
			external
			:resource="managerList"
			:input-class="{ 'is-invalid': $v.model.managerId.$error }"
			:value.sync="$v.model.managerId.$model"
		></base-input-manager>


		<button
			class="btn az_base_btn btn-primary"
			type="submit"
		>
			<i class="fa fa-save mr-1"></i>
			{{ $t('save') }}
		</button>

	</form>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators';
import BaseInputGroup from '../../../../components/BaseInputGroup';
import BaseInputManager from '../../../../components/BaseInputManager';
import BaseInputOrganization from '../../../../components/BaseInputOrganization';
import BaseInputProjectType from '../../../../components/BaseInputProjectType';


export default {
	name: 'TheForm',
	components: {
		BaseInputManager,
		BaseInputGroup,
		BaseInputProjectType,
		BaseInputOrganization,
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
			managerList: [],
			groupList: [],
		};
	},
	validations() {
		let options = {
			model: {
				name: {
					required,
				},
				groupId: {
					required,
					minValue: minValue(1),
				},
				managerId: {
					required,
					minValue: minValue(1),
				},
			}
		};


		if (!this.edit) {
			options.model.projectType = {
				required,
			};

			if (this.$store.state.systemAdmin) {
				options.model.organizationId = {
					required,
					minValue: minValue(1),
				};
			}
		}

		return options;
	},
	watch: {
		'model.organizationId'(val) {
			if (this.$store.state.systemAdmin) {
				if (!this.edit) {
					this.model.groupId = 0;
					this.groupList = [];

					this.model.managerId = 0;
					this.managerList = [];
				}

				this.getGroupAll(val);
				this.getManagerAll(val);
			}
		}
	},
	mounted() {
		if (!this.$store.state.systemAdmin) {
			this.getGroupAll();
			this.getManagerAll();
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
		getGroupAll(organizationId = null) {
			this.$api
				.get('/groups', {
					params: {
						organizationId: organizationId,
					}
				})
				.then(response => {
					this.groupList = response.data.data;
				});
		},
		getManagerAll(organizationId = null) {
			this.$api
				.get('/employees', {
					params: {
						organizationId: organizationId,
					}
				})
				.then(response => {
					this.managerList = response.data.data;
				});
		},
	}
};
</script>