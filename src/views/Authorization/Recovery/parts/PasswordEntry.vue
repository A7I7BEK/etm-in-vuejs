<template>
	<div>
		<form @submit.prevent="Change">
			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('newPassword') }}</label>
				<input class="form-control az_base_inp"
					   type="password"
					   :class="{'is-invalid': $v.model.password.$error}"
					   v-model="$v.model.password.$model">
			</div>

			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('passwordRepeatNew') }}</label>
				<input class="form-control az_base_inp"
					   type="password"
					   :class="{'is-invalid': $v.model.passwordRepeat.$error}"
					   v-model="$v.model.passwordRepeat.$model">
			</div>


			<button class="btn az_base_btn btn-primary btn-block" type="submit">{{ $t('save') }}</button>
		</form>


		<div class="text-center mt-5">
			<a class="auth_link" href="#" @click.prevent="$emit('emit:back')">{{ $t('back') }}</a>
		</div>
	</div>
</template>

<script>
	import FormService from '../../../../services/FormService';
	import { required, sameAs } from 'vuelidate/lib/validators';


	export default {
		name: 'PasswordEntry',
		props: {
			resource: {
				type: Object,
				required: true,
			}
		},
		data()
		{
			return {
				model: new FormService({
					password: null,
					passwordRepeat: null,
				}),
			};
		},
		validations: {
			model: {
				password: {
					required,
				},
				passwordRepeat: {
					sameAsPassword: sameAs('password'),
				},
			},
		},
		methods: {
			Change()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}


				this.$store.state.loader = true;
				this.$api
					.post('auth/forgot/password/change/password', {
						uniqueKey: this.resource.uniqueKey,
						password: this.model.password,
					})
					.then(response => {
						this.$router.push({ name: 'authLogin' });
					})
					.finally(() => {
						this.$store.state.loader = false;
					});
			},
		}
	};
</script>