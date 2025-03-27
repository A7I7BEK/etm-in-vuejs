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
				photoUrl: null,
				resourceFile: {
					id: null,
				},
				user: {
					organizationId: 0,
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
				.get('/employees/' + this.id)
				.then(response => {
					let data = response.data.data;

					this.model.SetData(data);
					this.model.user.organizationId = data.user.organization.id;
					this.model.user.phoneNumber = '998' + data.user.phoneNumber;

					this.modelSecond.SetData({
						userId: data.user.id,
						roleIds: data.user.roles.map(x => x.id),
					});

					this.titleName = data.user.userName;
					this.$store.state.metaData.title = this.$route.meta.title(data.user.userName);
				});
		},
		save() {
			let postData = this.model.GetData();
			if (this.$moment(postData.birthDate).isValid()) {
				postData.birthDate = this.$moment(postData.birthDate).format('DD-MM-YYYY');
			}
			else {
				postData.birthDate = null;
			}


			this.$api
				.put('/employees/' + this.id, postData)
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