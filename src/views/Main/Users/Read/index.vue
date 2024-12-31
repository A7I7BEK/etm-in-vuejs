<template>
	<base-crud-page-read
			v-if="can('EMPLOYEE_READ')"
			:title-name="titleName"
			:title-table="$tc('menu.user', 1)"
			:back-url="{ name: 'mainUsers' }"
	>
		<template #table v-if="Object.keys(model).length > 0">

			<table class="table az_crud_read_tb">
				<tbody>
				<tr>
					<th>{{ $t('id') }}</th>
					<td>{{ model.id }}</td>
				</tr>
				<tr>
					<th>{{ $t('userName') }}</th>
					<td>{{ model.userName }}</td>
				</tr>
				<tr>
					<th>{{ $t('firstName') }}</th>
					<td>{{ model.firstName }}</td>
				</tr>
				<tr>
					<th>{{ $t('lastName') }}</th>
					<td>{{ model.lastName }}</td>
				</tr>
				<tr>
					<th>{{ $t('middleName') }}</th>
					<td>{{ model.middleName }}</td>
				</tr>
				<tr>
					<th>{{ $t('birthday') }}</th>
					<td>{{ model.birthDate | filterDate }}</td>
				</tr>
				<tr>
					<th>{{ $t('email') }}</th>
					<td>{{ model.email }}</td>
				</tr>
				<tr>
					<th>{{ $t('phoneNumber') }}</th>
					<td>+998 {{ model.phoneNumber | filterPhoneNumber }}</td>
				</tr>
				<tr>
					<th>{{ $tc('menu.role', 2) }}</th>
					<td>
						<ul class="az_crud_read_tb_ls">
							<li v-for="item in model.roles">{{ item.roleName }}</li>
						</ul>
					</td>
				</tr>
				<tr v-if="$store.state.userProfile.systemAdmin">
					<th>{{ $t('systemAdmin') }}</th>
					<td>
						<i class="fa fa-check-circle" v-if="model.systemAdmin"></i>
						<i class="fa fa-times-circle" v-else></i>
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
		name: 'UsersRead',
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
					.get('employees/' + this.id)
					.then(response => {
						this.model = response.data.data;
						this.titleName = response.data.data.userName;
						this.$store.state.metaData.title = this.$route.meta.title(response.data.data.userName);
					});
			},
		}
	};
</script>