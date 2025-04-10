<template>
	<base-crud-page-create
		v-if="can(PERMISSION_TYPE.PROJECT.CREATE)"
		:title="$tc('menu.project', 1)"
		:back-url="{ name: 'mainProjects' }"
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
	name: 'ProjectsCreate',
	components: {
		TheForm,
		BaseCrudPageCreate,
	},
	data() {
		return {
			PERMISSION_TYPE,
			model: new FormService({
				name: '',
				projectType: '',
				groupId: 0,
				managerId: 0,
				organizationId: 0,
			}),
		};
	},
	methods: {
		save() {
			this.$api
				.post('/projects', this.model.GetData())
				.then(response => {
					this.$router.push({ name: 'mainProjects' });
				});
		}
	}
};
</script>