<template>
	<div>
		<div class="az_ovw_select">
			<select
				class="form-control az_base_inp"
				v-model="projectSelected"
			>
				<option :value="null">{{ $t('choose') }}</option>
				<option
					v-for="item in projectList"
					:value="item.id"
				>{{ item.name }}</option>
			</select>
		</div>


		<template v-if="projectDataList.length > 0">
			<div class="az_overview_tb_bx">
				<table class="az_overview_tb">
					<thead>
						<tr>
							<td>{{ $t('repoerts.boardName') }}</td>
							<td>{{ $t('repoerts.numberBoards') }}</td>
						</tr>
					</thead>


					<tbody>
						<tr v-for="item in projectDataList">
							<td>
								<div class="d-flex align-items-center">
									<div
										class="az_ovw_color mr-3"
										:style="{ 'background': item.color }"
									></div> {{ item.columnName }}
								</div>
							</td>
							<td>{{ item.count }}</td>
						</tr>


						<tr class="az_ovw_total">
							<td>{{ $t('repoerts.sumTasks') }}</td>
							<td>{{ projectDataTotal }}</td>
						</tr>
					</tbody>
				</table>
			</div>


			<div
				class="az_overview_chart_kan"
				v-if="series.length > 0"
			>
				<vue-apex-charts
					type="pie"
					width="100%"
					:options="chartOptions"
					:series="series"
					:key="chartKey"
				/>
			</div>
		</template>
		<template v-else-if="projectNoTask">
			<div class="az_overview_no_task">
				<img
					src="@/assets/img/svg/list.svg"
					alt=""
				>
				<div class="txt">{{ $t('repoerts.noTask') }}</div>
			</div>
		</template>

	</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';


export default {
	name: "TypeTrello",
	components: {
		VueApexCharts,
	},
	props: {
		projectList: {
			type: Array,
			required: true,
			default: []
		},
	},
	data: () => ({
		projectSelected: null,
		projectDataList: [],
		projectDataTotal: 0,
		projectNoTask: false,

		series: [],
		chartOptions: {
			colors: [],
			labels: [],
			legend: {
				show: false,
			},
			responsive: [ {
				breakpoint: 1200,
				options: {
					chart: {
						width: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			} ]
		},
		chartKey: 0,
	}),
	watch: {
		'projectSelected'(val) {
			if (val) {
				this.GetProjectOne(val);
			}
			else {
				this.projectDataList = [];
				this.projectDataTotal = 0;
				this.projectNoTask = false;
			}
		}
	},
	created() {
	},
	mounted() {
	},
	methods: {
		GetProjectOne(id) {
			this.$api
				.get('reports/by/projects/trello', {
					params: {
						'projectId': id
					}
				})
				.then(response => {
					if (response.data.data.reportDtos) {
						this.projectDataList = response.data.data.reportDtos;
						this.projectDataTotal = response.data.data.total;


						let tempSeries = [], tempLabel = [], tempColor = [];
						this.projectDataList.forEach(item => {
							let randomColor = '#' + (Math.floor(Math.random() * 7340031) + 1048576).toString(16);

							tempSeries.push(item.count);
							tempLabel.push(item.columnName);
							tempColor.push(randomColor);
							item.color = randomColor;
						});

						this.series = tempSeries;
						this.chartOptions.labels = tempLabel;
						this.chartOptions.colors = tempColor;

						this.chartKey++;
					}
					else {
						this.projectDataList = [];
						this.projectDataTotal = 0;
						this.projectNoTask = true;
					}
				});
		},
	}
};
</script>