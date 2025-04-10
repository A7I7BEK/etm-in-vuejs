<template>
	<base-crud-page-create
		v-if="can(PERMISSION_TYPE.ROLE.CREATE)"
		:title="$tc('menu.role', 1)"
		:back-url="{ name: 'mainRoles' }"
	>
		<template #form>

			<the-form
				:model="model"
				@emit:submit="save"
			/>

		</template>
	</base-crud-page-create>
</template>

<script>
import BaseCrudPageCreate from '../../../../components/BaseCrudPageCreate';
import { PERMISSION_TYPE } from '../../../../constants';
import FormService from '../../../../services/FormService';
import TheForm from '../components/TheForm';


export default {
	name: 'RolesCreate',
	components: {
		TheForm,
		BaseCrudPageCreate,
	},
	data() {
		return {
			PERMISSION_TYPE,
			model: new FormService({
				name: '',
				permissionIds: [],
				organizationId: 0,
			}),
		};
	},
	methods: {
		save() {
			this.$api
				.post('/roles', this.model.GetData())
				.then(response => {
					this.$router.push({ name: 'mainRoles' });
				});
		}
	}
};
</script>