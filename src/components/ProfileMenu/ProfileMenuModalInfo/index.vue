<script>
import { email, minLength, required } from 'vuelidate/lib/validators';
import FormService from '../../../services/FormService';
import BaseInputDeadline from '../../BaseInputDeadline';
import BaseInputPhone from '../../BaseInputPhone';
import BaseModal from '../../BaseModal';


export default {
	name: 'ProfileMenuModalInfo',
	components: {
		BaseModal,
		BaseInputPhone,
		BaseInputDeadline,
	},
	data() {
		return {
			model: new FormService({
				employee: {
					firstName: '',
					lastName: '',
					middleName: '',
					birthDate: null,
					photoUrl: null,
					resourceFile: {
						id: 0,
					},
				},
				userName: '',
				email: '',
				phoneNumber: '',
			}),
		};
	},
	validations: {
		model: {
			employee: {
				firstName: {
					required,
				},
				lastName: {
					required,
				},
			},
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
		},
	},
	mounted() {
		$('#profileModal').on('show.bs.modal', () => {
			let data = structuredClone(this.$store.state.userProfile);

			this.model.SetData(data);
			this.model.phoneNumber = '998' + this.model.phoneNumber;
		});


		$('#profileModal').on('hidden.bs.modal', () => {
			this.$v.$reset();
			this.model.Reset();
		});
	},
	methods: {
		Save() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			let postData = this.model.GetData();
			if (this.$moment(postData.employee.birthDate).isValid()) {
				postData.employee.birthDate = this.$moment(postData.employee.birthDate).format('DD-MM-YYYY');
			}
			else {
				postData.employee.birthDate = null;
			}


			this.$api
				.post('/users/update-profile', postData)
				.then(response => {
					$('#profileModal').modal('hide');
					this.GetProfileInfo();
					this.$notification.success(this.$t('profileEdited'));
				});
		},
		UploadPhoto(event) {
			if (event.target.files.length === 0) {
				return;
			}


			let formData = new FormData();
			formData.append('file', event.target.files[ 0 ]);


			this.$store.state.loader = true;
			this.$api
				.post('/resource/upload/file', formData, {
					params: {
						minWidth: 100,
						minHeight: 100,
					}
				})
				.then(response => {
					this.model.employee.photoUrl = response.data.data.url;
					this.model.employee.resourceFile.id = response.data.data.id;
				})
				.finally(() => {
					event.target.value = '';
					this.$store.state.loader = false;
				});
		},
		DeletePhoto() {
			this.model.employee.photoUrl = null;
			this.model.employee.resourceFile.id = 0;
		},
		GetProfileInfo() {
			this.$api
				.get('/users/me')
				.then(response => {
					this.$store.state.userProfile = response.data.data;
				});
		},
	}
};
</script>

<template src="./template.html"></template>