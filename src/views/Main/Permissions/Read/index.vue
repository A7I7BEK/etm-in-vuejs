<template>
	<base-crud-page-read
		v-if="can(PERMISSION_TYPE.PERMISSION.READ)"
		:title-name="titleName"
		:title-table="$tc('menu.permission', 1)"
		:back-url="{ name: 'mainPermissions' }"
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
						<td>{{ $t(`permissionItem.${model.codeName}`) }}</td>
					</tr>
					<tr>
						<th>{{ $t('codeName') }}</th>
						<td>{{ model.codeName }}</td>
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
	name: 'PermissionsRead',
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
				.get('/permissions/' + this.id)
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