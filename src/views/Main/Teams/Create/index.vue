<template>
	<base-crud-page-create
		v-if="can('GROUP_CREATE')"
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
			model: new FormService({
				name: '',
				organizationId: 0,
				userIds: [],
				leaderId: 0,
			}),
		};
	},
	methods: {
		save() {
			let postData = this.model.GetData();
			postData.userIds.find(x => x.id === postData.leaderId).leader = true;


			this.$api
				.post('/groups', postData)
				.then(response => {
					this.$router.push({ name: 'mainTeams' });
				});
		}
	}
};
</script>