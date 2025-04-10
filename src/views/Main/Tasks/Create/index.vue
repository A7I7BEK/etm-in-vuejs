<template>
	<base-crud-page-create
		v-if="can(PERMISSION_TYPE.TASK.CREATE)"
		:title="$tc('menu.task', 1)"
		:back-url="{ name: 'mainTasks' }"
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
	name: 'TasksCreate',
	components: {
		TheForm,
		BaseCrudPageCreate,
	},
	data() {
		return {
			PERMISSION_TYPE,
			model: new FormService({
				name: '',
				organizationId: 0,
				projectId: 0,
				columnId: 0,
			}),
		};
	},
	methods: {
		save() {
			this.$api
				.post('/tasks', this.model.GetData())
				.then(response => {
					this.$router.push({ name: 'mainTasks' });
				});
		}
	}
};
</script>