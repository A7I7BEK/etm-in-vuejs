<script>
import { minLength, required, sameAs } from 'vuelidate/lib/validators';
import FormService from '../../../services/FormService';
import BaseModal from '../../BaseModal';


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
				minLength: minLength(10),
			},
			newPasswordRepeat: {
				sameAsPassword: sameAs('newPassword'),
			},
		},
	},
	mounted() {
		$('#profilePassword').on('hidden.bs.modal', () => {
			this.$v.$reset();
			this.model.Reset();
		});
	},
	methods: {
		ChangePassword() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			this.$api
				.post('/users/change-password', this.model.GetData())
				.then(response => {
					$('#profilePassword').modal('hide');
					this.$notification.success(this.$t('passwordChanged'));
				});
		},
	}
};
</script>

<template src="./template.html"></template>