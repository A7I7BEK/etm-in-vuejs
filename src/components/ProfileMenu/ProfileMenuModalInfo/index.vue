<script>
	import BaseModal from '../../BaseModal';
	import BaseInputPhone from '../../BaseInputPhone';
	import BaseInputDeadline from '../../BaseInputDeadline';
	import FormService from '../../../services/FormService';
	import { email, minLength, required } from 'vuelidate/lib/validators';


	export default {
		name: 'ProfileMenuModalInfo',
		components: {
			BaseModal,
			BaseInputPhone,
			BaseInputDeadline,
		},
		data()
		{
			return {
				model: new FormService({
					id: 0,
					firstName: '',
					lastName: '',
					middleName: '',
					birthDate: null,
					resourceFile: {
						id: null,
					},
					photoUrl: '',
					user: {
						id: 0,
						userName: '',
						email: '',
						phoneNumber: '',
					},
				}),
			};
		},
		validations: {
			model: {
				firstName: {
					required,
				},
				lastName: {
					required,
				},
				user: {
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
		},
		mounted()
		{
			$('#profileModal').on('show.bs.modal', () => {
				let data = this.$store.state.userProfile;


				this.model.SetData({
					id: data.id,
					firstName: data.firstName,
					lastName: data.lastName,
					middleName: data.middleName,
					birthDate: data.birthDate ? data.birthDate : null,
					photoUrl: data.photoUrl ? data.photoUrl : '',
					user: {
						id: data.userId,
						userName: data.userName,
						email: data.email,
						phoneNumber: '998' + data.phoneNumber,
					},
				});
			});


			$('#profileModal').on('hidden.bs.modal', () => {
				this.$v.$reset();
				this.model.Reset();
			});
		},
		methods: {
			Save()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}


				let postData = this.model.GetData();
				postData.birthDate =
					this.$moment(postData.birthDate).isValid() ? this.$moment(postData.birthDate).format('DD-MM-YYYY') : null;

				this.$api
					.put('employees/profile/update/' + postData.id, postData)
					.then(response => {
						$('#profileModal').modal('hide');
						this.GetProfileInfo();
						this.$notification.success(this.$t('profileEdited'));
					});
			},
			UploadPhoto(event)
			{
				if (event.target.files.length === 0)
				{
					return;
				}


				let formData = new FormData();
				formData.append('file', event.target.files[0]);


				this.$store.state.loader = true;
				this.$api
					.post('/resource/upload/file', formData, {
						params: {
							minWidth: 100,
							minHeight: 100,
						}
					})
					.then(response => {
						this.model.photoUrl = response.data.data.url;
						this.model.resourceFile.id = response.data.data.id;
					})
					.finally(() => {
						event.target.value = '';
						this.$store.state.loader = false;
					});
			},
			DeletePhoto()
			{
				this.model.photoUrl = '';
				this.model.resourceFile.id = 0;
			},
			GetProfileInfo()
			{
				this.$api
					.get('users/me')
					.then(response => {
						this.$store.state.userProfile = response.data.data;
					});
			},
		}
	};
</script>

<template src="./template.html"></template>