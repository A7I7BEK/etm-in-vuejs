<template>
	<base-crud-page-read
			v-if="can('ORGANIZATION_READ')"
			:title-name="titleName"
			:title-table="$tc('menu.organization', 1)"
			:back-url="{ name: 'mainOrganizations' }"
	>
		<template #table v-if="Object.keys(model).length > 0">

			<table class="table az_crud_read_tb">
				<tbody>
				<tr>
					<th>{{ $t('id') }}</th>
					<td>{{ model.id }}</td>
				</tr>
				<tr>
					<th>{{ $t('name') }}</th>
					<td>{{ model.name }}</td>
				</tr>
				<tr>
					<th>{{ $t('email') }}</th>
					<td>{{ model.email }}</td>
				</tr>
				</tbody>
			</table>

		</template>
	</base-crud-page-read>
</template>

<script>
	import BaseCrudPageRead from '../../../../components/BaseCrudPageRead';


	export default {
		name: 'OrganizationsRead',
		components: {
			BaseCrudPageRead,
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
				model: {},
				titleName: '',
			};
		},
		created()
		{
			this.getOne();
		},
		methods: {
			getOne()
			{
				this.$api
					.get('organizations/' + this.id)
					.then(response => {
						this.model = response.data.data;
						this.titleName = response.data.data.name;
						this.$store.state.metaData.title = this.$route.meta.title(response.data.data.name);
					});
			},
		}
	};
</script>