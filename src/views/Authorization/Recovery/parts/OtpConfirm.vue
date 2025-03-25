<template>
	<div>
		<form @submit.prevent="ConfirmOTP">
			<div class="auth_form_group">
				<label class="az_base_lbl">{{ $t('confirmationCode') }}</label>
				<input
					class="form-control az_base_inp"
					type="text"
					:class="{ 'is-invalid': $v.otpCode.$error }"
					v-model="$v.otpCode.$model"
				>

				<div class="auth_inp_text">
					<i18n
						class="mb-2"
						tag="div"
						path="confirmationCodeSentSmall"
					>
						<template #text>
							<span
								class="hlt"
								v-if="resource.type === 'phoneNumber'"
							>{{ resource.phoneNumber | filterPhoneNumber }}</span>
							<span
								class="hlt"
								v-else
							>{{ resource.email }}</span>
						</template>
					</i18n>

					<a
						class="auth_link"
						href="#"
						@click.prevent="ResendOTP"
					>
						{{ $t('resend') }}
						<i class="fa fa-repeat"></i>
					</a>
				</div>
			</div>


			<button
				class="btn az_base_btn btn-primary btn-block"
				type="submit"
			>{{ $t('confirm') }}</button>
		</form>


		<div class="text-center mt-5">
			<a
				class="auth_link"
				href="#"
				@click.prevent="$emit('emit:back')"
			>{{ $t('back') }}</a>
		</div>
	</div>
</template>

<script>
import { alphaNum, minLength, required } from 'vuelidate/lib/validators';


export default {
	name: 'OtpConfirm',
	props: {
		resource: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			otpCode: null,
		};
	},
	validations: {
		otpCode: {
			required,
			alphaNum,
			minLength: minLength(6),
		},
	},
	methods: {
		ConfirmOTP() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			this.$store.state.loader = true;
			this.$api
				.post('/auth/forgot-password/confirm', {
					otpId: this.resource.otpId,
					otpCode: this.otpCode,
				})
				.then(response => {
					this.$emit('emit:data', response.data.data);
				})
				.finally(() => {
					this.$store.state.loader = false;
				});
		},
		ResendOTP() {
			this.$store.state.loader = true;
			this.$api
				.post('/auth/forgot-password/resend', {
					otpId: this.resource.otpId,
				})
				.finally(() => {
					this.$store.state.loader = false;
				});
		},
	}
};
</script>