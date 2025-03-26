<template>
	<base-crud-page-update
		v-if="can('EMPLOYEE_UPDATE') && can('USER_ATTACH_ROLE')"
		:title-name="titleName"
		:title-table="$tc('menu.user', 1)"
		:back-url="{ name: 'mainUsers' }"
	>
		<template #form>

			<the-form
				:model="model"
				:model-second="modelSecond"
				edit
				@emit:submit="save"
			/>

		</template>
	</base-crud-page-update>
</template>

<script>
import BaseCrudPageUpdate from '../../../../components/BaseCrudPageUpdate';
import FormService from '../../../../services/FormService';
import TheForm from '../components/TheForm';


export default {
	name: 'UsersUpdate',
	components: {
		BaseCrudPageUpdate,
		TheForm,
	},
	props: {
		id: {
			type: [ Number, String ],
			default: 0,
		}
	},
	data() {
		return {
			model: new FormService({
				firstName: '',
				lastName: '',
				middleName: '',
				birthDate: null,
				resourceFile: {
					id: null,
				},
				photoUrl: '',
				user: {
					organizationId: 0,
					id: 0,
					userName: '',
					email: '',
					phoneNumber: '',
				},
			}),
			modelSecond: new FormService({
				userId: 0,
				roleIds: [],
			}),
			titleName: '',
		};
	},
	mounted() {
		this.getOne();
	},
	methods: {
		getOne() {
			this.$api
				.get('employees/' + this.id)
				.then(response => {
					let data = response.data.data;

					this.model.SetData({
						firstName: data.firstName,
						lastName: data.lastName,
						middleName: data.middleName,
						birthDate: data.birthDate ? data.birthDate : null,
						photoUrl: data.photoUrl ? data.photoUrl : '',
						user: {
							organizationId: data.organizationId,
							id: data.userId,
							userName: data.userName,
							email: data.email,
							phoneNumber: '998' + data.phoneNumber,
						},
					});

					this.modelSecond.SetData({
						userId: data.userId,
						roleIds: data.roles.map(x => x.id),
					});

					this.titleName = data.userName;
					this.$store.state.metaData.title = this.$route.meta.title(data.userName);
				});
		},
		save() {
			let postData = this.model.GetData();
			postData.birthDate =
				this.$moment(postData.birthDate).isValid() ? this.$moment(postData.birthDate).format('DD-MM-YYYY') : null;

			this.$api
				.put('employees/' + this.id, postData)
				.then(response => {
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