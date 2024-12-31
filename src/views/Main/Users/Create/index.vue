<template>
	<base-crud-page-create
			v-if="can('EMPLOYEE_CREATE') && can('USER_ATTACH_ROLE')"
			:title="$tc('menu.user', 1)"
			:back-url="{ name: 'mainUsers' }"
	>
		<template #form>

			<the-form :model="model" :model-second="modelSecond" @emit:submit="save"/>

		</template>
	</base-crud-page-create>
</template>

<script>
	import BaseCrudPageCreate from '../../../../components/BaseCrudPageCreate';
	import FormService from '../../../../services/FormService';
	import TheForm from '../components/TheForm';


	export default {
		name: 'UsersCreate',
		components: {
			TheForm,
			BaseCrudPageCreate,
		},
		data()
		{
			return {
				model: new FormService({
					firstName: '',
					lastName: '',
					middleName: '',
					birthDate: null,
					resourceFile: {
						id: 0,
					},
					photoUrl: '',
					user: {
						organizationId: 0,
						userName: '',
						password: '',
						email: '',
						phoneNumber: '',
					}
				}),
				modelSecond: new FormService({
					userId: 0,
					roles: [],
				}),
			};
		},
		methods: {
			save()
			{
				let postData = this.model.GetData();
				postData.birthDate =
					this.$moment(postData.birthDate).isValid() ? this.$moment(postData.birthDate).format('DD-MM-YYYY') : null;


				this.$api
					.post('employees', postData)
					.then(response => {
						this.modelSecond.userId = response.data.data.id;
						this.attachRole();
					});
			},
			attachRole()
			{
				let postData = this.modelSecond.GetData();
				postData.roles = postData.roles.map(x => ({ id: x }));


				this.$api
					.post('users/attachRole', postData)
					.then(response => {
						this.$router.push({ name: 'mainUsers' });
					});
			},
		}
	};
</script>