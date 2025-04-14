<template>
	<base-crud-page-create
		v-if="
			can(PERMISSION_TYPE.EMPLOYEE.CREATE) &&
			can(PERMISSION_TYPE.USER.ATTACH_ROLE)
		"
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
import { PERMISSION_TYPE } from '../../../../constants';
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
		async save() {
			this.model.middleName = this.model.middleName || null;

			try {
				const resp = await this.$api.post('/employees', this.model.GetData());
				this.modelSecond.userId = resp.data.data.user.id;
				await this.$api.post('/users/attach-role', this.modelSecond.GetData());

				this.$router.push({ name: 'mainUsers' });
			} catch (error) {
				console.warn(error);
			}

			this.$store.state.loader = false;
		},
	},
};
</script>