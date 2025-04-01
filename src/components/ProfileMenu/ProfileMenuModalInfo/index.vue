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
					photoFileId: 0,
				},
				userName: '',
				email: '',
				phoneNumber: '',
			}),
			photoFile: null,
			photoFileUrl: null,
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
			this.model.phoneNumber = '998' + data.phoneNumber;
			this.model.employee.photoFileId = data.employee.photoFile?.id || 0;
		});


		$('#profileModal').on('hidden.bs.modal', () => {
			this.$v.$reset();
			this.model.Reset();
			this.DeleteTempPhoto();
		});
	},
	methods: {
		async Save() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			this.$store.state.loader = true;


			await this.SavePhoto();


			let postData = this.model.GetData();
			if (this.$moment(postData.employee.birthDate).isValid()) {
				postData.employee.birthDate = this.$moment(postData.employee.birthDate).format('DD-MM-YYYY');
			}
			else {
				postData.employee.birthDate = null;
			}


			await this.$api.post('/users/update-profile', postData);
			await this.GetProfileInfo();


			$('#profileModal').modal('hide');
			this.$notification.success(this.$t('profileEdited'));
			this.$store.state.loader = false;
		},
		async SavePhoto() {
			if (!this.photoFile) {
				return;
			}


			let formData = new FormData();
			formData.append('file', this.photoFile);


			await this.$api
				.post('/resource/upload-one', formData, {
					params: {
						minWidth: 100,
						minHeight: 100,
					}
				})
				.then(response => {
					this.model.employee.photoFileId = response.data.data.id;
				});
		},
		UploadPhoto(event) {
			if (event.target.files.length === 0) {
				return;
			}

			this.photoFile = event.target.files[ 0 ];
			this.photoFileUrl = URL.createObjectURL(this.photoFile);
			event.target.value = '';
		},
		DeleteTempPhoto() {
			this.photoFile = null;
			this.photoFileUrl = null;
		},
		DeleteRealPhoto() {
			this.model.employee.photoFileId = 0;
		},
		async GetProfileInfo() {
			await this.$api
				.get('/users/me')
				.then(response => {
					this.$store.state.userProfile = response.data.data;
				});
		},
	}
};
</script>

<template src="./template.html"></template>