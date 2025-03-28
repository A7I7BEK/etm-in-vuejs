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
				organizationId: 0,
				userIds: [],
				leaderId: 0,
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
					this.model.organizationId = data.organizationId;
					this.model.userIds = data.employeeGroups.map(x => {
						return {
							id: x.employeeId,
							firstName: x.employeeInfo.firstName,
							lastName: x.employeeInfo.lastName,
							middleName: x.employeeInfo.middleName,
						};
					});

					setTimeout(() => {
						this.model.leaderId = data.employeeGroups.find(x => x.leader).employeeId;
					}, 50);

					this.titleName = data.name;
					this.$store.state.metaData.title = this.$route.meta.title(data.name);
				});
		},
		save() {
			let postData = this.model.GetData();
			postData.userIds.find(x => x.id === postData.leaderId).leader = true;


			this.$api
				.put('/groups/' + this.id, postData)
				.then(response => {
					this.$router.push({ name: 'mainTeams' });
				});
		}
	}
};
</script>