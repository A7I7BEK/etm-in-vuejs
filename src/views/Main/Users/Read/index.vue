<template>
	<base-crud-page-read
		v-if="can(PERMISSION_TYPE.EMPLOYEE.READ)"
		:title-name="titleName"
		:title-table="$tc('menu.user', 1)"
		:back-url="{ name: 'mainUsers' }"
	>
		<template
			#table
			v-if="Object.keys(model).length > 0"
		>

			<table class="table az_crud_read_tb">
				<tbody>
					<tr>
						<th>{{ $t('id') }}</th>
						<td>{{ model.id }}</td>
					</tr>
					<tr>
						<th>{{ $t('userName') }}</th>
						<td>{{ model.user.userName }}</td>
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
						<td>{{ model.user.email }}</td>
					</tr>
					<tr>
						<th>{{ $t('phoneNumber') }}</th>
						<td>+998 {{ model.user.phoneNumber | filterPhoneNumber }}</td>
					</tr>
					<tr>
						<th>{{ $tc('menu.role', 2) }}</th>
						<td>
							<ul class="az_crud_read_tb_ls">
								<li v-for="item in model.user.roles">{{ item.name }}</li>
							</ul>
						</td>
					</tr>
					<tr>
						<th>{{ $t('systemAdmin') }}</th>
						<td>
							<i
								class="fa fa-check-circle"
								v-if="model.user.marks.registered"
							></i>
							<i
								class="fa fa-times-circle"
								v-else
							></i>
						</td>
					</tr>
				</tbody>
			</table>

		</template>
	</base-crud-page-read>
</template>

<script>
import BaseCrudPageRead from '../../../../components/BaseCrudPageRead';
import { PERMISSION_TYPE } from '../../../../constants';


export default {
	name: 'UsersRead',
	components: {
		BaseCrudPageRead,
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
			model: {},
			titleName: '',
		};
	},
	created() {
		this.getOne();
	},
	methods: {
		getOne() {
			this.$api
				.get('/employees/' + this.id)
				.then(response => {
					const data = response.data.data;
					this.model = data;
					this.titleName = data.user.userName;
					this.$store.state.metaData.title = this.$route.meta.title(data.user.userName);
				});
		},
	}
};
</script>