<template>
	<base-crud-page-read
		v-if="can(PERMISSION_TYPE.ROLE.READ)"
		:title-name="titleName"
		:title-table="$tc('menu.role', 1)"
		:back-url="{ name: 'mainRoles' }"
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
						<th>{{ $t('name') }}</th>
						<td>{{ model.name }}</td>
					</tr>
					<tr>
						<th>{{ $t('systemCreated') }}</th>
						<td>
							<i
								class="fa fa-check"
								v-if="model.systemCreated"
							></i>
							<i
								class="fa fa-minus"
								v-else
							></i>
						</td>
					</tr>
					<tr>
						<th>{{ $tc('menu.organization', 1) }}</th>
						<td>{{ model.organization.name }}</td>
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
									{{ $t(`permissionItem.${item.codeName}`) }}
									<b>
										({{ item.codeName }})
									</b>
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
import { PERMISSION_TYPE } from '../../../../constants';


export default {
	name: 'RolesRead',
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
				.get('/roles/' + this.id)
				.then(response => {
					const data = response.data.data;
					this.model = data;
					this.titleName = data.name;
					this.$store.state.metaData.title = this.$route.meta.title(data.name);
				});
		},
	}
};
</script>