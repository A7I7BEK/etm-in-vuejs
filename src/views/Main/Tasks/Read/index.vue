<template>
	<base-crud-page-read
		v-if="can(PERMISSION_TYPE.TASK.READ)"
		:title-name="titleName"
		:title-table="$tc('menu.task', 1)"
		:back-url="{ name: 'mainTasks' }"
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
						<th>{{ $t('description') }}</th>
						<td>{{ model.description }}</td>
					</tr>
					<tr>
						<th>{{ $t('createdDate') }}</th>
						<td>{{ model.createdAt | filterDateTime }}</td>
					</tr>
					<tr>
						<th>{{ $t('deadlineStartDate') }}</th>
						<td>{{ model.startDate | filterDateTime }}</td>
					</tr>
					<tr>
						<th>{{ $t('deadlineEndDate') }}</th>
						<td>
							<div
								class="az_crud_tb_sts"
								v-if="$moment(model.endDate).isValid()"
								:class="statusClass[ model.status ]"
							>
								{{ model.endDate | filterDateTime }}
							</div>
						</td>
					</tr>
					<tr>
						<th>{{ $t('taskStatus') }}</th>
						<td>{{ model.status }}</td>
					</tr>
					<tr>
						<th>{{ $t('nameProject') }}</th>
						<td>{{ model.project.name }}</td>
					</tr>
					<tr>
						<th>{{ $t('columnName') }}</th>
						<td>{{ model.column.name }}</td>
					</tr>
					<tr>
						<th>{{ $t('difficultyLevel') }}</th>
						<td>{{ model.level ? $t(`TASK_LEVEL_TYPE.${model.level}`) : '' }}</td>
					</tr>
					<tr>
						<th>{{ $t('priority') }}</th>
						<td>{{ model.priority ? $t(`TASK_PRIORITY_TYPE.${model.priority}`) : '' }}</td>
					</tr>
				</tbody>
			</table>

		</template>
	</base-crud-page-read>
</template>

<script>
import BaseCrudPageRead from '../../../../components/BaseCrudPageRead';
import { PERMISSION_TYPE, TASK_STATUS_TYPE } from '../../../../constants';


export default {
	name: 'TasksRead',
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
			statusClass: {
				[ TASK_STATUS_TYPE.RED ]: 'danger',
				[ TASK_STATUS_TYPE.YELLOW ]: 'warning',
				[ TASK_STATUS_TYPE.GREEN ]: 'success',
				[ TASK_STATUS_TYPE.BLUE ]: 'default',
			},
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
				.get('/tasks/' + this.id)
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