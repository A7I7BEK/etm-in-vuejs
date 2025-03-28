<template>
	<base-crud-page-read
		v-if="can('PROJECT_READ')"
		:title-name="titleName"
		:title-table="$tc('menu.project', 1)"
		:back-url="{ name: 'mainProjects' }"
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
						<th>{{ $t('codeName') }}</th>
						<td>{{ model.codeName }}</td>
					</tr>
					<tr>
						<th>{{ $tc('menu.team', 1) }}</th>
						<td>{{ model.group.name }}</td>
					</tr>
					<tr>
						<th>{{ $t('members') }}</th>
						<td>
							<ul class="az_crud_read_tb_ls">
								<li v-for="item in model.members">
									<span class="txt">
										{{ item.employee.firstName + ' ' + item.employee.lastName + ' ' + item.employee.middleName }}
									</span>

									<i
										class="fa fa-user-secret ml-2"
										v-if="item.employee.isTeamLeader"
										:title="$t('teamLeader')"
									></i>
									<i
										class="fa fa-star ml-2"
										v-if="item.employee.id === model.manager.id"
										:title="$t('manager')"
									></i>
								</li>
							</ul>
						</td>
					</tr>
					<tr>
						<th>{{ $t('projectType') }}</th>
						<td>{{ model.projectType.value }}</td>
					</tr>
					<tr>
						<th>{{ $t('manager') }}</th>
						<td>{{ model.manager.firstName + ' ' + model.manager.lastName + ' ' + model.manager.middleName }}
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
	name: 'ProjectsRead',
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
				.get('/projects/' + this.id)
				.then(response => {
					this.model = response.data.data;
					this.titleName = response.data.data.name;
					this.$store.state.metaData.title = this.$route.meta.title(response.data.data.name);
				});
		},
	}
};
</script>