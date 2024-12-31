<template>
	<div>
		<form @submit.prevent="Register">
			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('organizationName') }}</label>
				<input class="form-control az_base_inp"
					   type="text"
					   :class="{'is-invalid': $v.model.organizationName.$error}"
					   v-model="$v.model.organizationName.$model">
			</div>

			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('userName') }}</label>
				<input class="form-control az_base_inp"
					   type="text"
					   :class="{'is-invalid': $v.model.userName.$error}"
					   v-model="$v.model.userName.$model">
			</div>

			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('firstName') }}</label>
				<input class="form-control az_base_inp"
					   type="text"
					   :class="{'is-invalid': $v.model.firstName.$error}"
					   v-model="$v.model.firstName.$model">
			</div>

			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('lastName') }}</label>
				<input class="form-control az_base_inp"
					   type="text"
					   :class="{'is-invalid': $v.model.lastName.$error}"
					   v-model="$v.model.lastName.$model">
			</div>

			<base-input-phone
					class="auth_form_group"
					:input-class="{'is-invalid': $v.model.phoneNumber.$error}"
					:value.sync="$v.model.phoneNumber.$model"
			></base-input-phone>

			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('email') }}</label>
				<input class="form-control az_base_inp"
					   type="email"
					   :class="{'is-invalid': $v.model.email.$error}"
					   v-model="$v.model.email.$model">
			</div>

			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('password') }}</label>
				<input class="form-control az_base_inp"
					   type="password"
					   :class="{'is-invalid': $v.model.password.$error}"
					   v-model="$v.model.password.$model">
			</div>

			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('passwordRepeat') }}</label>
				<input class="form-control az_base_inp"
					   type="password"
					   :class="{'is-invalid': $v.model.passwordRepeat.$error}"
					   v-model="$v.model.passwordRepeat.$model">
			</div>


			<button class="btn az_base_btn btn-primary btn-block" type="submit">{{ $t('register') }}</button>
		</form>


		<div class="text-center mt-5">
			<router-link class="auth_link" :to="{ name: 'authLogin' }">{{ $t('login') }}</router-link>
		</div>
	</div>
</template>

<script>
	import BaseInputPhone from '../../../../components/BaseInputPhone';
	import FormService from '../../../../services/FormService';
	import { email, minLength, required, sameAs } from 'vuelidate/lib/validators';


	export default {
		name: 'AccountDetails',
		components: {
			BaseInputPhone,
		},
		data()
		{
			return {
				model: new FormService({
					organizationName: null,
					userName: null,
					firstName: null,
					lastName: null,
					email: null,
					phoneNumber: null,
					password: null,
					passwordRepeat: null,
				}),
			};
		},
		validations: {
			model: {
				organizationName: {
					required,
				},
				userName: {
					required,
				},
				firstName: {
					required,
				},
				lastName: {
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
				password: {
					required,
				},
				passwordRepeat: {
					sameAsPassword: sameAs('password'),
				},
			},
		},
		methods: {
			Register()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}


				this.$store.state.loader = true;
				this.$api
					.post('auth/organizations/create/user', this.model.GetData())
					.then(response => {
						this.$emit('emit:data', {
							otpId: response.data.data.id,
							...this.model.GetData()
						});
					})
					.finally(() => {
						this.$store.state.loader = false;
					});
			},
		}
	};
</script>