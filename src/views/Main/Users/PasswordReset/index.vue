<template>
	<div
		class="az_base_box"
		v-if="can(PERMISSION_TYPE.EMPLOYEE.CHANGE_PASSWORD)"
	>

		<div class="az_crud_ttl mb-5">
			<div class="az_crud_ttl_left">
				<router-link
					class="btn az_base_btn btn-default icon mr-3"
					:to="{ name: 'mainUsers' }"
				>
					<i class="fa fa-arrow-left"></i>
				</router-link>

				<i18n
					v-if="employee.user"
					class="az_crud_ttl_txt"
					tag="h3"
					path="crudPasswordReset"
				>
					<template #name>{{ employee.user.userName }}</template>
				</i18n>
			</div>
		</div>


		<div class="maw-700 m-auto">
			<form @submit.prevent="submit">

				<div class="az_base_form_gr">
					<label class="az_base_lbl">{{ $t('password') }}</label>
					<div class="az_base_inp_pass">
						<input
							class="form-control az_base_inp"
							:type="passwordShow ? 'text' : 'password'"
							:class="{ 'is-invalid': $v.password.$error }"
							v-model="$v.password.$model"
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


				<button
					class="btn az_base_btn btn-primary"
					type="submit"
				>
					<i class="fa fa-save mr-1"></i>
					{{ $t('save') }}
				</button>

			</form>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { PERMISSION_TYPE } from '../../../../constants';


export default {
	name: 'TheForm',
	props: {
		id: {
			type: [ Number, String ],
			default: 0,
		}
	},
	data() {
		return {
			PERMISSION_TYPE,
			password: '',
			passwordShow: false,
			employee: {},
		};
	},
	validations() {
		return {
			password: {
				required,
			},
		};
	},
	created() {
		this.getUser();
	},
	methods: {
		getUser() {
			this.$api
				.get('/employees/' + this.id)
				.then(response => {
					const data = response.data.data;
					this.employee = data;
					this.$store.state.metaData.title = this.$route.meta.title(data.user.userName);
				});
		},
		submit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			this.$api
				.post('/employees/change-password', {
					employeeId: Number(this.id),
					password: this.password,
				})
				.then(response => {
					this.$router.push({ name: 'mainUsers' });
				});
		},
	}
};
</script>