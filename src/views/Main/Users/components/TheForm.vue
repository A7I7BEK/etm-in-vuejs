<template>
	<form @submit.prevent="submit">

		<div class="az_prfl_mod_photo">
			<label class="az_prfl_mod_photo_img fx-c">
				<input
					id="userCrudPhotoUpload"
					type="file"
					accept="image/*"
					hidden
					@change="uploadPhoto"
				>

				<img
					class="img"
					v-if="photoFileUrl"
					key="tempImg"
					:src="photoFileUrl"
				>
				<img
					class="img"
					v-else-if="model.photoFileId"
					key="img"
					:src="$store.state.url + model.photoFile.url"
				>
				<img
					class="prvw"
					v-else
					key="prvw"
					src="/img/svg/sidebar_user.svg"
				>
			</label>


			<label
				class="az_prfl_mod_photo_txt del"
				v-if="photoFileUrl"
				key="delTemp"
				@click="deleteTempPhoto"
			>
				<span class="txt">{{ $t('delete') }}</span>
				<i class="fa fa-minus-circle"></i>
			</label>
			<label
				class="az_prfl_mod_photo_txt del"
				v-else-if="model.photoFileId"
				key="delReal"
				@click="deleteRealPhoto"
			>
				<span class="txt">{{ $t('delete') }}</span>
				<i class="fa fa-minus-circle"></i>
			</label>
			<label
				class="az_prfl_mod_photo_txt"
				for="userCrudPhotoUpload"
				v-else
				key="upl"
			>
				<span class="txt">{{ $t('profileMenuModal.uploadPhoto') }}</span>
				<i class="fa fa-plus-circle"></i>
			</label>
		</div>


		<base-input-organization
			class="az_base_form_gr"
			v-if="!edit && $store.state.systemAdmin"
			:input-class="{ 'is-invalid': $v.model.user.organizationId.$error }"
			:value.sync="$v.model.user.organizationId.$model"
		></base-input-organization>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $tc('menu.role', 2) }}</label>
			<div
				class="az_base_inp_role"
				:class="{ 'is-invalid': $v.modelSecond.roleIds.$error }"
			>

				<label
					class="az_base_inp_role_badge"
					v-for="item in roleList"
				>
					<input
						class="inp"
						type="checkbox"
						hidden
						:value="item.id"
						v-model="$v.modelSecond.roleIds.$model"
					>
					<div class="bt">{{ item.name }}</div>
				</label>

			</div>
		</div>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('userName') }}</label>
			<input
				class="form-control az_base_inp"
				type="text"
				:class="{ 'is-invalid': $v.model.user.userName.$error }"
				v-model.trim="$v.model.user.userName.$model"
				v-lowercase
			>
		</div>


		<div
			class="az_base_form_gr"
			v-if="!edit"
		>
			<label class="az_base_lbl">{{ $t('password') }}</label>
			<div class="az_base_inp_pass">
				<input
					class="form-control az_base_inp"
					:type="passwordShow ? 'text' : 'password'"
					:class="{ 'is-invalid': $v.model.user.password.$error }"
					v-model="$v.model.user.password.$model"
				>

				<button
					class="bt"
					type="button"
					tabindex="-1"
					@click="passwordShow = !passwordShow"
				>
					<i
						class="fa fa-eye-slash"
						v-if="passwordShow"
					></i>
					<i
						class="fa fa-eye"
						v-else
					></i>
				</button>
			</div>
		</div>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('email') }}</label>
			<input
				class="form-control az_base_inp"
				type="text"
				:class="{ 'is-invalid': $v.model.user.email.$error }"
				v-model.trim="$v.model.user.email.$model"
			>
		</div>


		<base-input-phone
			class="az_base_form_gr"
			:input-class="{ 'is-invalid': $v.model.user.phoneNumber.$error }"
			:value.sync="$v.model.user.phoneNumber.$model"
		></base-input-phone>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('firstName') }}</label>
			<input
				class="form-control az_base_inp"
				type="text"
				:class="{ 'is-invalid': $v.model.firstName.$error }"
				v-model.trim="$v.model.firstName.$model"
			>
		</div>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('lastName') }}</label>
			<input
				class="form-control az_base_inp"
				type="text"
				:class="{ 'is-invalid': $v.model.lastName.$error }"
				v-model.trim="$v.model.lastName.$model"
			>
		</div>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('middleName') }}</label>
			<input
				class="form-control az_base_inp"
				type="text"
				v-model.trim="model.middleName"
			>
		</div>


		<base-input-deadline
			class="az_base_form_gr"
			:label-text="$t('birthday')"
			disable-from
			:value.sync="model.birthDate"
		></base-input-deadline>


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
import { email, minLength, required } from 'vuelidate/lib/validators';
import BaseInputDeadline from '../../../../components/BaseInputDeadline';
import BaseInputOrganization from '../../../../components/BaseInputOrganization';
import BaseInputPhone from '../../../../components/BaseInputPhone';


const notZero = (value) => +value !== 0;


export default {
	name: 'TheForm',
	components: {
		BaseInputOrganization,
		BaseInputDeadline,
		BaseInputPhone,
	},
	props: {
		model: {
			type: Object,
			required: true,
		},
		modelSecond: {
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
			roleList: [],
			passwordShow: false,
			photoFile: null,
			photoFileUrl: null,
		};
	},
	validations() {
		let options = {
			model: {
				firstName: {
					required,
				},
				lastName: {
					required,
				},
				user: {
					userName: {
						required,
					},
					email: {
						required,
						email,
					},
					phoneNumber: {
						required,
						minLength: minLength(9),
					},
				}
			},
			modelSecond: {
				roleIds: {
					required,
				},
			}
		};


		if (!this.edit) {
			options.model.user.password = {
				required
			};

			if (this.$store.state.systemAdmin) {
				options.model.user.organizationId = {
					notZero,
				};
			}
		}

		return options;
	},
	watch: {
		'model.user.organizationId'(val) {
			if (this.$store.state.systemAdmin) {
				if (!this.edit) {
					this.modelSecond.roleIds = [];
					this.roleList = [];
				}

				this.getRoleAll(val);
			}
		}
	},
	mounted() {
		if (!this.$store.state.systemAdmin) {
			this.getRoleAll();
		}
	},
	methods: {
		async submit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			this.$store.state.loader = true;
			await this.savePhoto();


			this.$emit('emit:submit');
		},
		getRoleAll(organizationId = 0) {
			this.$api
				.get('/roles', {
					params: {
						organizationId: organizationId,
					}
				})
				.then(response => {
					this.roleList = response.data.data;
				});
		},
		async savePhoto() {
			if (!this.photoFile) {
				return;
			}


			let formData = new FormData();
			formData.append('file', this.photoFile);


			const resp = await this.$api.post('/resource/upload-one', formData, {
				params: {
					minWidth: 100,
					minHeight: 100,
				}
			});
			this.model.photoFileId = resp.data.data.id;
		},
		uploadPhoto(event) {
			if (event.target.files.length === 0) {
				return;
			}

			this.photoFile = event.target.files[ 0 ];
			this.photoFileUrl = URL.createObjectURL(this.photoFile);
			event.target.value = '';
		},
		deleteTempPhoto() {
			this.photoFile = null;
			this.photoFileUrl = null;
		},
		deleteRealPhoto() {
			this.model.photoFileId = 0;
		},
	}
};
</script>