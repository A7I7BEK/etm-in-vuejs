<template>
	<div>
		<form @submit.prevent="SendOTP">
			<div class="d-flex align-items-center justify-content-center mb-4 us-n">
				<label
					class="auth_form_switch_opt"
					:class="{ 'active': otpType === 'email' }"
					@click="otpType = 'email'"
				>{{ $t('email') }}
				</label>

				<div class="custom-control custom-switch auth_form_switch">
					<input
						class="custom-control-input"
						id="contactTypeSwitch"
						type="checkbox"
						v-model="otpType"
						false-value="email"
						true-value="phoneNumber"
					>
					<label
						class="custom-control-label"
						for="contactTypeSwitch"
					></label>
				</div>

				<label
					class="auth_form_switch_opt"
					:class="{ 'active': otpType === 'phoneNumber' }"
					@click="otpType = 'phoneNumber'"
				>{{ $t('phoneNumber') }}
				</label>
			</div>


			<div
				class="auth_form_group"
				v-show="otpType === 'email'"
			>
				<label class="az_base_lbl">{{ $t('email') }}</label>
				<input
					class="form-control az_base_inp"
					type="email"
					:class="{ 'is-invalid': $v.model.email.$error }"
					v-model="$v.model.email.$model"
				>
			</div>

			<base-input-phone
				class="auth_form_group"
				v-show="otpType === 'phoneNumber'"
				:input-class="{ 'is-invalid': $v.model.phoneNumber.$error }"
				:value.sync="$v.model.phoneNumber.$model"
			></base-input-phone>


			<button
				class="btn az_base_btn btn-primary btn-block"
				type="submit"
			>{{ $t('submit') }}</button>
		</form>


		<div class="text-center mt-5">
			<router-link
				class="auth_link"
				:to="{ name: 'authLogin' }"
			>{{ $t('login') }}</router-link>
		</div>
	</div>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators';
import BaseInputPhone from '../../../../components/BaseInputPhone';
import FormService from '../../../../services/FormService';


export default {
	name: 'ContactEntry',
	components: {
		BaseInputPhone,
	},
	data() {
		return {
			otpType: 'email',
			model: new FormService({
				email: null,
				phoneNumber: null,
			}),
		};
	},
	validations: {
		model: {
			email: {
				required,
				email,
			},
			phoneNumber: {
				required,
				minLength: minLength(9),
			},
		},
	},
	methods: {
		SendOTP() {
			this.$v.$touch();
			if ((this.otpType === 'phoneNumber' && this.$v.model.phoneNumber.$invalid) ||
				(this.otpType === 'email' && this.$v.model.email.$invalid)) {
				return;
			}


			this.$store.state.loader = true;
			this.$api
				.post('/auth/forgot-password/send', {
					contactEmailOrPhone: this.model[ this.otpType ],
				})
				.then(response => {
					this.$emit('emit:data', {
						otpId: response.data.data.otpId,
						type: this.otpType,
						[ this.otpType ]: this.model[ this.otpType ],
					});
				})
				.finally(() => {
					this.$store.state.loader = false;
				});
		},
	}
};
</script>