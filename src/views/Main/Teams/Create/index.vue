<template>
	<base-crud-page-create
		v-if="can(PERMISSION_TYPE.GROUP.CREATE)"
		:title="$tc('menu.team', 1)"
		:back-url="{ name: 'mainTeams' }"
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
	name: 'TeamsCreate',
	components: {
		TheForm,
		BaseCrudPageCreate,
	},
	data() {
		return {
			PERMISSION_TYPE,
			model: new FormService({
				name: '',
				employeeIds: [],
				leaderId: 0,
				organizationId: 0,
			}),
		};
	},
	methods: {
		save() {
			const postData = this.model.GetData();
			postData.employeeIds = postData.employeeIds.map(a => a.id);


			this.$api
				.post('/groups', postData)
				.then(response => {
					this.$router.push({ name: 'mainTeams' });
				});
		}
	}
};
</script>