<template>
	<base-crud-page-create
			v-if="can('ROLE_CREATE')"
			:title="$tc('menu.role', 1)"
			:back-url="{ name: 'mainRoles' }"
	>
		<template #form>

			<the-form :model="model" @emit:submit="save"/>

		</template>
	</base-crud-page-create>
</template>

<script>
	import BaseCrudPageCreate from '../../../../components/BaseCrudPageCreate';
	import FormService from '../../../../services/FormService';
	import TheForm from '../components/TheForm';


	export default {
		name: 'RolesCreate',
		components: {
			TheForm,
			BaseCrudPageCreate,
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
			};
		},
		methods: {
			save()
			{
				let postData = this.model.GetData();
				postData.permissions = postData.permissions.map(x => ({ id: x }));


				this.$api
					.post('roles', postData)
					.then(response => {
						this.$router.push({ name: 'mainRoles' });
					});
			}
		}
	};
</script>