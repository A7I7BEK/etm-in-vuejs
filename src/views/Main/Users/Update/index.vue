<template>
	<base-crud-page-update
		v-if="
			can(PERMISSION_TYPE.EMPLOYEE.UPDATE) &&
			can(PERMISSION_TYPE.USER.ATTACH_ROLE)
		"
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
import { PERMISSION_TYPE } from '../../../../constants';
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
			PERMISSION_TYPE,
			model: new FormService({
				firstName: '',
				lastName: '',
				middleName: '',
				birthDate: null,
				photoFileId: 0,
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
					this.model.photoFileId = data.photoFile ? data.photoFile.id : 0;

					this.modelSecond.SetData({
						userId: data.user.id,
						roleIds: data.user.roles.map(x => x.id),
					});

					this.titleName = data.user.userName;
					this.$store.state.metaData.title = this.$route.meta.title(data.user.userName);
				});
		},
		async save() {
			this.model.middleName = this.model.middleName || null;

			try {
				await this.$api.post('/users/attach-role', this.modelSecond.GetData());
				await this.$api.put('/employees/' + this.id, this.model.GetData());

				this.$router.push({ name: 'mainUsers' });
			} catch (error) {
				console.warn(error);
			}

			this.$store.state.loader = false;
		},
	}
};
</script>