<template>
	<base-crud-page-update
		v-if="can('TASK_UPDATE')"
		:title-name="titleName"
		:title-table="$tc('menu.task', 1)"
		:back-url="{ name: 'mainTasks' }"
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
	name: 'TasksUpdate',
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
				.get('/tasks/' + this.id)
				.then(response => {
					const data = response.data.data;

					this.model.SetData(data);
					this.titleName = data.name;
					this.$store.state.metaData.title = this.$route.meta.title(data.name);
				});
		},
		save() {
			this.$api
				.put('/tasks/' + this.id, this.model.GetData())
				.then(response => {
					this.$router.push({ name: 'mainTasks' });
				});
		}
	}
};
</script>