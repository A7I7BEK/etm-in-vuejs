<template>
	<base-crud-page-update
		v-if="can(PERMISSION_TYPE.ROLE.UPDATE)"
		:title-name="titleName"
		:title-table="$tc('menu.role', 1)"
		:back-url="{ name: 'mainRoles' }"
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
	name: 'RolesUpdate',
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
				permissionIds: [],
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
				.get('/roles/' + this.id)
				.then(response => {
					let data = response.data.data;

					this.model.SetData({
						name: data.name,
						permissionIds: data.permissions.map(x => x.id),
						organizationId: data.organization.id,
					});

					this.titleName = data.name;
					this.$store.state.metaData.title = this.$route.meta.title(data.name);
				});
		},
		save() {
			this.$api
				.put('/roles/' + this.id, this.model.GetData())
				.then(response => {
					this.$router.push({ name: 'mainRoles' });
				});
		}
	}
};
</script>