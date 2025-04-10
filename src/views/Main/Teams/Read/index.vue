<template>
	<base-crud-page-read
		v-if="can(PERMISSION_TYPE.GROUP.READ)"
		:title-name="titleName"
		:title-table="$tc('menu.team', 1)"
		:back-url="{ name: 'mainTeams' }"
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
						<th>{{ $tc('menu.user', 2) }}</th>
						<td>
							<ul class="az_crud_read_tb_ls">
								<li v-for="item in model.employees">
									<span class="txt">
										{{ item.firstName }}
										{{ item.lastName }}
										{{ item.middleName }}
									</span>

									<i
										v-if="item.id === model.leader.id"
										class="fa fa-user-secret ml-2"
										:title="$t('teamLeader')"
									></i>
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
	name: 'TeamsRead',
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
				.get('/groups/' + this.id)
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