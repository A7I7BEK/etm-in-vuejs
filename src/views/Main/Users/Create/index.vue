<template>
	<base-crud-page-create
		v-if="can('EMPLOYEE_CREATE') && can('USER_ATTACH_ROLE')"
		:title="$tc('menu.user', 1)"
		:back-url="{ name: 'mainUsers' }"
	>
		<template #form>

			<the-form
				:model="model"
				:model-second="modelSecond"
				@emit:submit="save"
			/>

		</template>
	</base-crud-page-create>
</template>

<script>
import BaseCrudPageCreate from '../../../../components/BaseCrudPageCreate';
import FormService from '../../../../services/FormService';
import TheForm from '../components/TheForm.vue';


export default {
	name: 'UsersCreate',
	components: {
		TheForm,
		BaseCrudPageCreate,
	},
	data() {
		return {
			model: new FormService({
				firstName: '',
				lastName: '',
				middleName: '',
				birthDate: null,
				photoUrl: null,
				resourceFile: {
					id: null,
				},
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
				roleIds: [],
			}),
		};
	},
	methods: {
		save() {
			let postData = this.model.GetData();
			if (this.$moment(postData.birthDate).isValid()) {
				postData.birthDate = this.$moment(postData.birthDate).format('DD-MM-YYYY');
			}
			else {
				postData.birthDate = null;
			}


			this.$api
				.post('/employees', postData)
				.then(response => {
					this.modelSecond.userId = response.data.data.user.id;
					this.attachRole();
				});
		},
		attachRole() {
			this.$api
				.post('/users/attach-role', this.modelSecond.GetData())
				.then(response => {
					this.$router.push({ name: 'mainUsers' });
				});
		},
	}
};
</script>