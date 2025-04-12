<template>
	<base-crud-page-update
		v-if="$store.state.systemAdmin"
		:title-name="titleName"
		:title-table="$tc('menu.organization', 1)"
		:back-url="{ name: 'mainOrganizations' }"
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
import { PERMISSION_TYPE } from '../../../../constants';
import FormService from '../../../../services/FormService';
import TheForm from '../components/TheForm';


export default {
	name: 'OrganizationsUpdate',
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
			PERMISSION_TYPE,
			model: new FormService({
				name: '',
				email: '',
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
				.get('/organizations/' + this.id)
				.then(response => {
					const data = response.data.data;

					this.model.SetData(data);
					this.titleName = data.name;
					this.$store.state.metaData.title = this.$route.meta.title(data.name);
				});
		},
		save() {
			this.$api
				.put('/organizations/' + this.id, this.model.GetData())
				.then(response => {
					this.$router.push({ name: 'mainOrganizations' });
				});
		}
	}
};
</script>