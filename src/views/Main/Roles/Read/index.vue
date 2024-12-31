<template>
	<base-crud-page-read
			v-if="can('ROLE_READ')"
			:title-name="titleName"
			:title-table="$tc('menu.role', 1)"
			:back-url="{ name: 'mainRoles' }"
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
					<td>{{ model.roleName }}</td>
				</tr>
				<tr>
					<th>{{ $t('codeName') }}</th>
					<td>{{ model.codeName }}</td>
				</tr>
				<tr>
					<th>{{ $t('accessQuantity') }}</th>
					<td>{{ model.permissions.length }}</td>
				</tr>
				<tr>
					<th>{{ $tc('menu.permission', 2) }}</th>
					<td>
						<ul class="az_crud_read_tb_ls">
							<li v-for="item in model.permissions">
								{{ item.codeName }} - {{ $t('permission.' + item.codeName) }}
							</li>
						</ul>
					</td>
				</tr>
				</tbody>
			</table>

		</template>
	</base-crud-page-read>
</template>

<script>
	import BaseCrudPageRead from '../../../../components/BaseCrudPageRead';


	export default {
		name: 'RolesRead',
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
					.get('roles/' + this.id)
					.then(response => {
						this.model = response.data.data;
						this.titleName = response.data.data.roleName;
						this.$store.state.metaData.title = this.$route.meta.title(response.data.data.roleName);
					});
			},
		}
	};
</script>