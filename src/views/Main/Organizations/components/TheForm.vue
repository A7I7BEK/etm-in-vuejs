<template>
	<form @submit.prevent="submit">

		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('name') }}</label>
			<input class="form-control az_base_inp"
				   type="text"
				   :class="{'is-invalid': $v.model.name.$error}"
				   v-model.trim="$v.model.name.$model">
		</div>

		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('email') }}</label>
			<input class="form-control az_base_inp"
				   type="email"
				   :class="{'is-invalid': $v.model.email.$error}"
				   v-model.trim="$v.model.email.$model">
		</div>


		<button class="btn az_base_btn btn-primary" type="submit">
			<i class="fa fa-save mr-1"></i>
			{{ $t('save') }}
		</button>

	</form>
</template>

<script>
	import { required, email } from 'vuelidate/lib/validators';


	export default {
		name: 'TheForm',
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
		validations()
		{
			let options = {
				model: {
					name: {
						required,
					},
					email: {
						required,
						email,
					},
				}
			};

			return options;
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
			}
		}
	};
</script>