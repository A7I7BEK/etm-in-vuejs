<template>
	<base-crud-page-update
		v-if="can('GROUP_UPDATE')"
		:title-name="titleName"
		:title-table="$tc('menu.team', 1)"
		:back-url="{ name: 'mainTeams' }"
	>
		<template #form>

			<the-form
				:model="model"
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
	name: 'TeamsUpdate',
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
				name: '',
				employeeIds: [],
				leaderId: 0,
				organizationId: 0,
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
				.get('/groups/' + this.id)
				.then(response => {
					let data = response.data.data;

					this.model.name = data.name;
					this.model.leaderId = data.leader.id;
					this.model.employeeIds = data.employees.map(item => {
						return {
							id: item.id,
							firstName: item.firstName,
							lastName: item.lastName,
							middleName: item.middleName,
						};
					});
					this.model.organizationId = data.organization.id;


					this.titleName = data.name;
					this.$store.state.metaData.title = this.$route.meta.title(data.name);
				});
		},
		save() {
			let postData = this.model.GetData();
			postData.employeeIds.map(a => a.id);


			this.$api
				.put('/groups/' + this.id, postData)
				.then(response => {
					this.$router.push({ name: 'mainTeams' });
				});
		}
	}
};
</script>