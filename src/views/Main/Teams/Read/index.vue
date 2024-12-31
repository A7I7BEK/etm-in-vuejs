<template>
	<base-crud-page-read
			v-if="can('GROUP_READ')"
			:title-name="titleName"
			:title-table="$tc('menu.team', 1)"
			:back-url="{ name: 'mainTeams' }"
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
					<th>{{ $tc('menu.user', 2) }}</th>
					<td>
						<ul class="az_crud_read_tb_ls">
							<li v-for="item in model.employeeGroups">
								<span class="txt">
									{{ item.employeeInfo.firstName + ' ' + item.employeeInfo.lastName + ' ' + item.employeeInfo.middleName }}
								</span>

								<i class="fa fa-user-secret ml-2" v-if="item.leader" :title="$t('teamLeader')"></i>
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
		name: 'TeamsRead',
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
					.get('groups/' + this.id)
					.then(response => {
						this.model = response.data.data;
						this.titleName = response.data.data.name;
						this.$store.state.metaData.title = this.$route.meta.title(response.data.data.name);
					});
			},
		}
	};
</script>