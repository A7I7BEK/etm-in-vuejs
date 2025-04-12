<template>
	<base-crud-page-create
		v-if="$store.state.systemAdmin"
		:title="$tc('menu.organization', 1)"
		:back-url="{ name: 'mainOrganizations' }"
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
	name: 'OrganizationsCreate',
	components: {
		TheForm,
		BaseCrudPageCreate,
	},
	data() {
		return {
			PERMISSION_TYPE,
			model: new FormService({
				name: '',
				email: '',
			}),
		};
	},
	methods: {
		save() {
			this.$api
				.post('/organizations', this.model.GetData())
				.then(response => {
					this.$router.push({ name: 'mainOrganizations' });
				});
		}
	}
};
</script>