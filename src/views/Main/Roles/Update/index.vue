<template>
	<base-crud-page-update
			v-if="can('ROLE_UPDATE')"
			:title-name="titleName"
			:title-table="$tc('menu.role', 1)"
			:back-url="{ name: 'mainRoles' }"
	>
		<template #form>

			<the-form :model="model" edit @emit:submit="save"/>

		</template>
	</base-crud-page-update>
</template>

<script>
	import BaseCrudPageUpdate from '../../../../components/BaseCrudPageUpdate';
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
				type: [Number, String],
				default: 0,
			}
		},
		data()
		{
			return {
				model: new FormService({
					roleName: '',
					codeName: '',
					permissions: [],
					organizationId: 0,
				}),
				titleName: '',
			};
		},
		mounted()
		{
			this.getOne();
		},
		methods: {
			getOne()
			{
				this.$api
					.get('roles/' + this.id)
					.then(response => {
						let data = response.data.data;

						this.model.SetData({
							roleName: data.roleName,
							codeName: data.codeName,
							permissions: data.permissions.map(x => x.id),
							organizationId: data.organizationId,
						});

						this.titleName = data.roleName;
						this.$store.state.metaData.title = this.$route.meta.title(data.roleName);
					});
			},
			save()
			{
				let postData = this.model.GetData();
				postData.permissions = postData.permissions.map(x => ({ id: x }));


				this.$api
					.put('roles/' + this.id, postData)
					.then(response => {
						this.$router.push({ name: 'mainRoles' });
					});
			}
		}
	};
</script>