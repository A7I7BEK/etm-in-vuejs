<template>
	<div>
		<div class="az_overview_tb_bx">
			<table class="az_overview_tb">
				<thead>
				<tr>
					<td>{{$t('repoerts.boardName')}} </td>
					<td>{{$t('repoerts.numberBoards')}}</td>
				</tr>
				</thead>


				<tbody>
				<tr>
					<td>
						<div class="d-flex align-items-center">
							<div class="az_ovw_color mr-3" style="background:#64D0DA;"></div>{{$t('NEW')}}
						</div>
					</td>
					<td>{{ projectData.NEW }}</td>
				</tr>
				<tr>
					<td>
						<div class="d-flex align-items-center">
							<div class="az_ovw_color mr-3" style="background:#877BEB;"></div> {{$t('DOING')}}
						</div>
					</td>
					<td>{{ projectData.DOING }}</td>
				</tr>
				<tr>
					<td>
						<div class="d-flex align-items-center">
							<div class="az_ovw_color mr-3" style="background:#EA4A66;"></div>  {{$t('VERIFY')}}
						</div>
					</td>
					<td>{{ projectData.VERIFY }}</td>
				</tr>
				<tr>
					<td>
						<div class="d-flex align-items-center">
							<div class="az_ovw_color mr-3" style="background:#FE7297;"></div>{{$t('DONE')}}
						</div>
					</td>
					<td>{{ projectData.DONE }}</td>
				</tr>
				<tr>
					<td>
						<div class="d-flex align-items-center">
							<div class="az_ovw_color mr-3" style="background:#FFC65B;"></div>{{$t('ARCHIVE')}}
						</div>
					</td>
					<td>{{ projectData.ARCHIVE }}</td>
				</tr>


				<tr class="az_ovw_total">
					<td>{{$t('repoerts.sumTasks')}}</td>
					<td>{{ projectDataTotal }}</td>
				</tr>
				</tbody>
			</table>
		</div>


		<div class="az_overview_chart_kan" v-if="series.length > 0">
			<vue-apex-charts type="pie" width="100%" :options="chartOptions" :series="series"/>
		</div>
	</div>
</template>

<script>
	import VueApexCharts from 'vue-apexcharts'


	export default {
		name: "TypeKanbanOverall",
		components: {
			VueApexCharts,
		},
		data:() => ({
			projectData: {},
			projectDataTotal: 0,

			series: [],
			chartOptions: {
				colors:['#64D0DA', '#877BEB', '#EA4A66', '#FE7297', '#FFC65B'],
				labels: ['New', 'Doing', 'Verify', 'Done', 'Archive'],
				legend: {
					show: false,
				},
			}
		}),
		created() {
			this.GetProjectAll();
		},
		methods: {
			GetProjectAll() {
				this.$api
					.get('reports/by/projects/kanban', {
						params: {
							'forAllProject': true
						}
					})
					.then(response => {
						if (response.data.data[0].reportDtos) {
							this.projectData = response.data.data[0].reportDtos;

							Object.values(this.projectData).forEach(item => {
								this.projectDataTotal += parseInt(item);
							});

							this.series = [
								parseInt(this.projectData.NEW),
								parseInt(this.projectData.DOING),
								parseInt(this.projectData.VERIFY),
								parseInt(this.projectData.DONE),
								parseInt(this.projectData.ARCHIVE),
							];
						}
					});
			},
		}
	}
</script>