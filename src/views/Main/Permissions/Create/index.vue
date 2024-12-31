<template>
	<base-crud-page-create
			v-if="can('PERMISSION_CREATE')"
			:title="$tc('menu.permission', 1)"
			:back-url="{ name: 'mainPermissions' }"
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
		name: 'PermissionsCreate',
		components: {
			TheForm,
			BaseCrudPageCreate,
		},
		data()
		{
			return {
				model: new FormService({
					name: '',
					codeName: '',
				}),
			};
		},
		methods: {
			save()
			{
				this.model.codeName = this.model.name;

				this.$api
					.post('permissions', this.model.GetData())
					.then(response => {
						this.$router.push({ name: 'mainPermissions' });
					});
			}
		}
	};
</script>