<template>
	<form @submit.prevent="submit">

		<base-input-organization
				class="az_base_form_gr"
				v-if="!edit && $store.state.userProfile.systemAdmin"
				:input-class="{'is-invalid': $v.model.organizationId.$error}"
				:value.sync="$v.model.organizationId.$model"
		></base-input-organization>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('name') }}</label>
			<input class="form-control az_base_inp"
				   type="text"
				   :class="{'is-invalid': $v.model.roleName.$error}"
				   v-model.trim="$v.model.roleName.$model">
		</div>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('codeName') }}</label>
			<input class="form-control az_base_inp"
				   type="text"
				   :class="{'is-invalid': $v.model.codeName.$error}"
				   v-model.trim="$v.model.codeName.$model"
				   v-uppercase
			>
		</div>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $tc('menu.permission', 2) }}</label>
			<permission-card
					:class="{'is-invalid': $v.model.permissions.$error}"
					v-for="item in permissionList"
					:resource="item"
					:model="model"
			></permission-card>
		</div>


		<button class="btn az_base_btn btn-primary" type="submit">
			<i class="fa fa-save mr-1"></i>
			{{ $t('save') }}
		</button>

	</form>
</template>

<script>
	import BaseInputOrganization from '../../../../components/BaseInputOrganization';
	import PermissionCard from './PermissionCard';
	import { required } from 'vuelidate/lib/validators';


	const notZero = (value) => +value !== 0;


	export default {
		name: 'TheForm',
		components: {
			PermissionCard,
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
		data()
		{
			return {
				permissionList: [],
			};
		},
		validations()
		{
			let options = {
				model: {
					roleName: {
						required,
					},
					codeName: {
						required,
					},
					permissions: {
						required,
					},
				}
			};


			if (!this.edit && this.$store.state.userProfile.systemAdmin)
			{
				options.model.organizationId = {
					notZero,
				};
			}

			return options;
		},
		created()
		{
			this.getPermissionAll();
		},
		methods: {
			submit()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}

				this.$emit('emit:submit');
			},
			getPermissionAll()
			{
				this.$api
					.get('permissions')
					.then(response => {
						let data = {
							project: [],
							task: [],
							report: [],
							table: [],
							other: [],
						};

						response.data.data.forEach(x => {
							if (x.name.indexOf('PROJECT') === 0)
							{
								data.project.push(x);
							}
							else if (
								x.name.indexOf('TASK') === 0
								||
								x.name.indexOf('CHECKLIST') === 0
							)
							{
								data.task.push(x);
							}
							else if (x.name.indexOf('REPORT') === 0)
							{
								data.report.push(x);
							}
							else if (
								x.name.indexOf('ROLE') === 0
								||
								x.name.indexOf('EMPLOYEE') === 0
								||
								x.name.indexOf('USER') === 0
								||
								x.name.indexOf('GROUP') === 0
								||
								x.name.indexOf('PERMISSION') === 0
								||
								x.name.indexOf('ORGANIZATION') === 0
							)
							{
								data.table.push(x);
							}
							else
							{
								data.other.push(x);
							}
						});

						this.permissionList = [
							{
								title: 'menu.project',
								list: data.project,
							},
							{
								title: 'menu.task',
								list: data.task,
							},
							{
								title: 'menu.report',
								list: data.report,
							},
							{
								title: 'table',
								list: data.table,
							},
							{
								title: 'other',
								list: data.other,
							},
						];
					});
			},
		}
	};
</script>