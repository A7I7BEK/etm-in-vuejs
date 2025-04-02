<template>
	<base-crud-page-update
		v-if="can('PROJECT_UPDATE')"
		:title-name="titleName"
		:title-table="$tc('menu.project', 1)"
		:back-url="{ name: 'mainProjects' }"
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
	name: 'ProjectsUpdate',
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
				groupId: 0,
				managerId: 0,
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
				.get('/projects/' + this.id)
				.then(response => {
					let data = response.data.data;

					this.model.SetData({
						name: data.name,
						groupId: data.group.id,
						managerId: data.manager.id,
						organizationId: data.organization.id,
					});

					this.titleName = data.name;
					this.$store.state.metaData.title = this.$route.meta.title(data.name);
				});
		},
		save() {
			this.$api
				.put('/projects/' + this.id, this.model.GetData())
				.then(response => {
					this.$router.push({ name: 'mainProjects' });
				});
		}
	}
};
</script>