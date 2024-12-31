<template>
	<div>
		<div class="az_overview_tb_bx">
			<table class="az_overview_tb">
				<thead>
				<tr>
					<td>{{$t('repoerts.boardName')}}</td>

					<td>
						<div class="d-flex flex-column align-items-center">
							<div class="az_ovw_color mb-2" style="background:#64D0DA;"></div>
							{{$t('NEW')}}
						</div>
					</td>
					<td>
						<div class="d-flex flex-column align-items-center">
							<div class="az_ovw_color mb-2" style="background:#877BEB;"></div>
							{{$t('DOING')}}
						</div>
					</td>
					<td>
						<div class="d-flex flex-column align-items-center">
							<div class="az_ovw_color mb-2" style="background:#EA4A66;"></div>
							{{$t('VERIFY')}}
						</div>
					</td>
					<td>
						<div class="d-flex flex-column align-items-center">
							<div class="az_ovw_color mb-2" style="background:#FE7297;"></div>
							{{$t('DONE')}}
						</div>
					</td>
					<td>
						<div class="d-flex flex-column align-items-center">
							<div class="az_ovw_color mb-2" style="background:#FFC65B;"></div>
							{{$t('ARCHIVE')}}
						</div>
					</td>

					<td class="az_ovw_total">
						{{$t('repoerts.sumTasks')}}
					</td>
				</tr>
				</thead>


				<tbody>
				<tr v-for="item in projectDataList">
					<td>{{ item.projectName }}</td>

					<td>{{ item.reportDtos.NEW }}</td>
					<td>{{ item.reportDtos.DOING }}</td>
					<td>{{ item.reportDtos.VERIFY }}</td>
					<td>{{ item.reportDtos.DONE }}</td>
					<td>{{ item.reportDtos.ARCHIVE }}</td>

					<td class="az_ovw_total">{{ item.countByProject }}</td>
				</tr>
				</tbody>
			</table>
		</div>

		<div class="jplist-panel box panel-bottom">
			<div>
				<select class="jplist-select" v-model="pagination.range">
					<option :value="3">3</option>
					<option :value="5">5</option>
					<option :value="10">10</option>
				</select>


				<div class="panel-bottom__pagination">
					<button type="button" :disabled="pagination.page === 0" @click="GetProjectAll('page', 0)">
						<svg xmlns="http://www.w3.org/2000/svg" width="12.41" height="12"
							 viewBox="0 0 12.41 12">
							<path id="ic_first_page_24px"
								  d="M18.41,16.59,13.82,12l4.59-4.59L17,6l-6,6,6,6ZM6,6H8V18H6Z"
								  transform="translate(-6 -6)" fill="#495e75"/>
						</svg>
					</button>
					<button type="button" :disabled="pagination.page === 0" @click="GetProjectAll('diff', -1)">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
							 viewBox="0 0 16 16">
							<path id="ic_arrow_back_24px"
								  d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z"
								  transform="translate(-4 -4)" fill="#495e75"/>
						</svg>
					</button>

					<form @submit.prevent="GetProjectAll('page', inputPage - 1)">
						<input type="number" min="1" :max="computedLastPage + 1" v-model="inputPage">
					</form>

					<button type="button" :disabled="pagination.page === computedLastPage" @click="GetProjectAll('diff', 1)">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
							 viewBox="0 0 16 16">
							<path id="ic_arrow_back_24px"
								  d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z"
								  transform="translate(20 20) rotate(180)" fill="#495e75"/>
						</svg>
					</button>
					<button type="button" :disabled="pagination.page === computedLastPage" @click="GetProjectAll('page', computedLastPage)">
						<svg xmlns="http://www.w3.org/2000/svg" width="12.41" height="12"
							 viewBox="0 0 12.41 12">
							<path id="ic_first_page_24px"
								  d="M18.41,16.59,13.82,12l4.59-4.59L17,6l-6,6,6,6ZM6,6H8V18H6Z"
								  transform="translate(18.41 18) rotate(180)" fill="#495e75"/>
						</svg>
					</button>
				</div>
			</div>


            <i18n class="jplist-label" tag="div" path="paginationText">
                <template #shownText>{{ computedItemFrom }}</template>
                <template #fromText><template>{{ computedItemTo }}</template></template>
                <template #toText><template>{{ pagination.count }}</template></template>
            </i18n>
		</div>


		<div class="az_overview_chart_kan" v-if="chartOptions.xaxis.categories.length > 0">
			<vue-apex-charts width="100%" type="bar" :options="chartOptions" :series="series" :key="chartKey"/>
		</div>
	</div>
</template>

<script>
	import VueApexCharts from 'vue-apexcharts'


	export default {
		name: "TypeKanbanProject",
		components: {
			VueApexCharts,
		},
		data: () => ({
			projectDataList: [],
			pagination: {
				count: 0,
				page: 0,
				range: 5,
			},
			inputPage: 1,


			series: [
				{
					name: 'New',
					data: []
				},
				{
					name: 'Doing',
					data: []
				},
				{
					name: 'Verify',
					data: []
				},
				{
					name: 'Done',
					data: []
				},
				{
					name: 'Archive',
					data: []
				},
			],
			chartOptions: {
				colors: ['#64D0DA', '#877BEB', '#EA4A66', '#FE7297', '#FFC65B'],
				xaxis: {
					categories: [],
				},
				chart: {
					type: 'bar',
					stacked: true,
				},
				fill: {
					opacity: 1,
				},
				legend: {
					show: false,
				},
				plotOptions: {
					bar: {
						horizontal: false,
						dataLabels: {
							position: 'center',
						}
					},
				},
			},
			chartKey: 0,
		}),
		computed: {
			computedLastPage() {
				return this.pagination.count > 0 ? Math.ceil(this.pagination.count / this.pagination.range) - 1 : 0;
			},
			computedItemFrom() {
				return (this.pagination.range * this.pagination.page) + 1;
			},
			computedItemTo() {
				return (this.pagination.range * this.inputPage) < this.pagination.count ? (this.pagination.range * this.inputPage) : this.pagination.count;
			},
		},
		watch: {
			'pagination.range'() {
				this.GetProjectAll();
			},
			'projectDataList'() {
				let tempName = [], tempNew = [], tempDoing = [], tempVerify = [], tempDone = [], tempArchive = [];

				this.projectDataList.forEach(item => {
					tempName.push(item.projectName);
					tempNew.push(item.reportDtos.NEW);
					tempDoing.push(item.reportDtos.DOING);
					tempVerify.push(item.reportDtos.VERIFY);
					tempDone.push(item.reportDtos.DONE);
					tempArchive.push(item.reportDtos.ARCHIVE);
				});


				this.chartOptions.xaxis.categories = tempName;
				this.series[0].data = tempNew;
				this.series[1].data = tempDoing;
				this.series[2].data = tempVerify;
				this.series[3].data = tempDone;
				this.series[4].data = tempArchive;

				this.chartKey++;
			},
		},
		created() {
			this.GetProjectAll();
		},
		methods: {
			GetProjectAll(type, page) {

				if (type === 'diff') {
					this.pagination.page += page;
				}
				else if (type === 'page') {
					this.pagination.page = page;
				}
				else {
					this.pagination.page = 0;
				}

				this.inputPage = this.pagination.page + 1;

				this.$api
					.get('reports/by/projects/kanban', {
						params: {
							'page': this.pagination.page,
							'perPage': this.pagination.range,
						}
					})
					.then(response => {
						this.projectDataList = response.data.data;
						this.pagination.count = response.data.totalCount;
					});
			},
		}
	}
</script>