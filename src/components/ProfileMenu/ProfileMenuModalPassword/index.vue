<script>
	import BaseModal from '../../BaseModal';
	import FormService from '../../../services/FormService';
	import { required, minLength, sameAs } from 'vuelidate/lib/validators';


	export default {
		name: 'ProfileMenuModalPassword',
		components: {
			BaseModal,
		},
		data: () => ({
			model: new FormService({
				currentPassword: null,
				newPassword: null,
				newPasswordRepeat: null,
			}),
		}),
		validations: {
			model: {
				currentPassword: {
					required,
				},
				newPassword: {
					required,
					minLength: minLength(6),
				},
				newPasswordRepeat: {
					sameAsPassword: sameAs('newPassword'),
				},
			},
		},
		mounted()
		{
			$('#profilePassword').on('hidden.bs.modal', () => {
				this.$v.$reset();
				this.model.Reset();
			});
		},
		methods: {
			ChangePassword()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}

				this.$api
					.post('auth/change/password', this.model.GetData())
					.then(response => {
						$('#profilePassword').modal('hide');
						this.$notification.success(this.$t('passwordChanged'));
					});
			},
		}
	};
</script>

<template src="./template.html"></template>