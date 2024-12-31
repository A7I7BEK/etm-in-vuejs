<template>
	<base-crud-page-read
			v-if="can('TASK_READ')"
			:title-name="titleName"
			:title-table="$tc('menu.task', 1)"
			:back-url="{ name: 'mainTasks' }"
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
					<th>{{ $t('description') }}</th>
					<td>{{ model.description }}</td>
				</tr>
				<tr>
					<th>{{ $t('createdDate') }}</th>
					<td>{{ model.startAt | filterDateTime }}</td>
				</tr>
				<tr>
					<th>{{ $t('deadlineStartDate') }}</th>
					<td>{{ model.startDate | filterDateTime }}</td>
				</tr>
				<tr>
					<th>{{ $t('deadlineEndDate') }}</th>
					<td>
						<div class="az_crud_tb_sts"
							 v-if="$moment(model.deadLine).isValid()"
							 :class="
									 {
									 	'danger': model.status === $store.state.TASK_STATUS_TYPE.RED,
									 	'warning': model.status === $store.state.TASK_STATUS_TYPE.YELLOW,
									 	'success': model.status === $store.state.TASK_STATUS_TYPE.GREEN,
									 	'default': model.status === $store.state.TASK_STATUS_TYPE.BLUE,
									 }">
							{{ model.deadLine | filterDateTime }}
						</div>
					</td>
				</tr>
				<tr>
					<th>{{ $t('taskStatus') }}</th>
					<td>{{ model.status }}</td>
				</tr>
				<tr>
					<th>{{ $t('nameProject') }}</th>
					<td>{{ model.projectName }}</td>
				</tr>
				<tr>
					<th>{{ $t('columnName') }}</th>
					<td>{{ model.columnName }}</td>
				</tr>
				<tr>
					<th>{{ $t('difficultyLevel') }}</th>
					<td>{{ model.taskLevelType ? $t(model.taskLevelType.value) : '' }}</td>
				</tr>
				<tr>
					<th>{{ $t('priority') }}</th>
					<td>{{ model.taskPriorityType ? $t(model.taskPriorityType.value) : '' }}</td>
				</tr>
				</tbody>
			</table>

		</template>
	</base-crud-page-read>
</template>

<script>
	import BaseCrudPageRead from '../../../../components/BaseCrudPageRead';


	export default {
		name: 'TasksRead',
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
					.get('tasks/' + this.id)
					.then(response => {
						this.model = response.data.data;
						this.titleName = response.data.data.name;
						this.$store.state.metaData.title = this.$route.meta.title(response.data.data.name);
					});
			},
		}
	};
</script>