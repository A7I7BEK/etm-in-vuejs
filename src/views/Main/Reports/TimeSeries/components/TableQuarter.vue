<template>
	<div v-if="options.quarter.length > 0">
		<div class="d-flex mt-4">
			<input
				type="text"
				class="form-control az_base_inp"
				style="max-width: 300px;"
				:placeholder="$t('search')"
				v-model="searchText"
			>
		</div>


		<template v-if="dataList.length > 0">
			<base-report-table class="mt-2">
				<template #head>
					<tr>
						<th>{{ $t('nameEmployee') }}</th>

						<th
							v-for="(item, index) in dataList[ 0 ].reports"
							:key="index"
						>
							{{ $t(item.name) }}
						</th>

						<th><b>{{ $t('total') }}</b></th>
					</tr>
				</template>


				<template #body>
					<tr
						v-for="(item, index) in dataList"
						:key="index"
					>
						<td>{{ item.fio }}</td>

						<td v-for="item2 in item.reports">{{ item2.count | filterTimeLeftMinutes }}</td>

						<td><b>{{ item.totalTimeLeft | filterTimeLeftMinutes }}</b></td>
					</tr>
				</template>
			</base-report-table>


			<div class="jplist-panel box panel-bottom mt-4">
				<div>
					<select
						class="jplist-select"
						v-model="pagination.range"
					>
						<option :value="10">10</option>
						<option :value="20">20</option>
						<option :value="50">50</option>
					</select>


					<div class="panel-bottom__pagination">
						<button
							type="button"
							:disabled="pagination.page === 0"
							@click="GetDataAll('page', 0)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12.41"
								height="12"
								viewBox="0 0 12.41 12"
							>
								<path
									id="ic_first_page_24px"
									d="M18.41,16.59,13.82,12l4.59-4.59L17,6l-6,6,6,6ZM6,6H8V18H6Z"
									transform="translate(-6 -6)"
									fill="#495e75"
								/>
							</svg>
						</button>
						<button
							type="button"
							:disabled="pagination.page === 0"
							@click="GetDataAll('diff', -1)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
							>
								<path
									id="ic_arrow_back_24px"
									d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z"
									transform="translate(-4 -4)"
									fill="#495e75"
								/>
							</svg>
						</button>

						<form @submit.prevent="GetDataAll('page', inputPage - 1)">
							<input
								type="number"
								min="1"
								:max="computedLastPage + 1"
								v-model="inputPage"
							>
						</form>

						<button
							type="button"
							:disabled="pagination.page === computedLastPage"
							@click="GetDataAll('diff', 1)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
							>
								<path
									id="ic_arrow_back_24px"
									d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z"
									transform="translate(20 20) rotate(180)"
									fill="#495e75"
								/>
							</svg>
						</button>
						<button
							type="button"
							:disabled="pagination.page === computedLastPage"
							@click="GetDataAll('page', computedLastPage)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12.41"
								height="12"
								viewBox="0 0 12.41 12"
							>
								<path
									id="ic_first_page_24px"
									d="M18.41,16.59,13.82,12l4.59-4.59L17,6l-6,6,6,6ZM6,6H8V18H6Z"
									transform="translate(18.41 18) rotate(180)"
									fill="#495e75"
								/>
							</svg>
						</button>
					</div>
				</div>


				<i18n
					class="jplist-label"
					tag="div"
					path="paginationText"
				>
					<template #shownText>{{ computedItemFrom }}</template>
					<template #fromText><template>{{ computedItemTo }}</template></template>
					<template #toText><template>{{ pagination.count }}</template></template>
				</i18n>
			</div>


			<div
				class="az_report_foot"
				v-if="can(PERMISSION_TYPE.REPORT.TIME_LEFT_UPLOAD)"
			>
				<!--<button type="button" class="btn az_base_btn btn-primary mr-3">Отправить</button>-->
				<button
					type="button"
					class="btn az_base_btn btn-excel"
					@click="ExportToFile"
				>{{ $t('downloadExcel') }}</button>
			</div>
		</template>
	</div>
</template>

<script>
import BaseReportTable from '../../../../../components/BaseReportTable';
import { PERMISSION_TYPE } from '../../../../../constants';


export default {
	name: "TableYear",
	components: {
		BaseReportTable,
	},
	props: {
		options: {
			type: Object,
			required: true,
			default: {}
		},
	},
	data: () => ({
		PERMISSION_TYPE,
		dataList: [],
		pagination: {
			count: 0,
			page: 1,
			range: 10,
		},
		inputPage: 1,
		searchText: '',
		searchTextTimerId: 0,
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
			this.GetDataAll();
		},
		'options': {
			handler(val) {
				this.dataList = [];

				if (val.quarter.length > 0) {
					this.GetDataAll();
				}
			},
			deep: true
		},
		'searchText'(val) {
			clearTimeout(this.searchTextTimerId);
			this.searchTextTimerId = setTimeout(() => {
				this.GetDataAll();
			}, 500);
		},
	},
	methods: {
		GetDataAll(type, page) {

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
				.get('reports/hours/by/timeleft', {
					params: {
						'typeDateInterval': 'QUARTER_INTERVAL',
						'year': this.options.year,
						'quarterPart': this.options.quarter,
						'page': this.pagination.page,
						'pageSize': this.pagination.range,
						'fio': this.searchText,
					}
				})
				.then(response => {
					this.dataList = response.data.data;
					this.pagination.count = response.data.totalCount;
				});
		},
		ExportToFile() {
			this.$api
				.get('file/report/date/upload', {
					params: {
						'typeDateInterval': 'QUARTER_INTERVAL',
						'year': this.options.year,
						'quarterPart': this.options.quarter,
						'page': this.pagination.page,
						'pageSize': this.pagination.range,
						'fio': this.searchText,
					},
					responseType: 'blob',
				})
				.then(response => {
					const a = document.createElement("a");
					a.style.display = "none";
					document.body.appendChild(a);

					// Set the HREF to a Blob representation of the data to be downloaded
					a.setAttribute("href", window.URL.createObjectURL(new Blob([ response.data ])));

					// Use download attribute to set set desired file name
					a.setAttribute("download", 'exported.xlsx');

					a.click();

					// Cleanup
					document.body.removeChild(a);
				});
		},
	}
};
</script>