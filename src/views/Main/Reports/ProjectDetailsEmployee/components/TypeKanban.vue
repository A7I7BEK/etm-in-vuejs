<template>
	<div>
		<div class="az_report_nav">
			<div class="az_report_nav_it">
				<label class="az_base_lbl">{{ $t('repoerts.boardName') }}</label>
				<select
					class="form-control az_base_inp"
					v-model="selectedData.project"
				>
					<option :value="null">{{ $t('choose') }}</option>
					<option
						v-for="item in projectList"
						:value="item.id"
					>{{ item.name }}</option>
				</select>
			</div>

			<div class="az_report_nav_it">
				<label class="az_base_lbl">{{ $t('fullName') }}</label>
				<select
					class="form-control az_base_inp"
					v-model="selectedData.member"
				>
					<option :value="null">{{ $t('choose') }}</option>
					<option
						v-for="item in memberList"
						:value="item.id"
					>{{ item.firstName }} {{ item.lastName }}</option>
				</select>
			</div>
		</div>


		<template v-if="selectedData.project || selectedData.member">
			<base-report-table class="mt-3">
				<template #head>
					<tr>
						<th colspan="2"></th>
						<th colspan="5">{{ $t('statusNameOfBoards') }}</th>
						<th colspan="2">{{ $t('resolution') }}</th>
						<th colspan="4">{{ $t('byTerm') }}</th>
						<th colspan="4">{{ $t('taskPriority') }}</th>
						<th colspan="4">{{ $t('taskDifficultyLevel') }}</th>
						<th colspan="3">{{ $t('comments') }}</th>
					</tr>
					<tr>
						<th>{{ $t('performers') }}</th>
						<th>{{ $t('nameProject') }}</th>

						<th>{{ $t('NEW') }}</th>
						<th>{{ $t('DOING') }}</th>
						<th>{{ $t('DONE') }}</th>
						<th>{{ $t('VERIFY') }}</th>
						<th>{{ $t('ARCHIVE') }}</th>

						<th>{{ $t('notDone') }}</th>
						<th>{{ $t('completed') }}</th>

						<th>{{ $t('overdue') }}</th>
						<th>{{ $t('expires') }}</th>
						<th>{{ $t('enoughTime') }}<br></th>
						<th>{{ $t('notDelivered') }}</th>

						<th>{{ $t('priorityHigh') }}</th>
						<th>{{ $t('priorityNormal') }}</th>
						<th>{{ $t('priorityLow') }}</th>
						<th>{{ $t('notDelivered') }}</th>

						<th>{{ $t('complicated') }}</th>
						<th>{{ $t('priorityNormal') }}</th>
						<th>{{ $t('easy') }}</th>
						<th>{{ $t('notDelivered') }}</th>

						<th>{{ $t('information') }}</th>
						<th>{{ $t('problem') }}</th>
						<th>{{ $t('solution') }}</th>
					</tr>
				</template>


				<template #body>
					<tr
						v-for="(item, index) in projectDataList"
						:key="index"
					>
						<td>{{ item.employeeName }}</td>
						<td>{{ item.projectName }}</td>

						<td>{{ item.task_column_new }}</td>
						<td>{{ item.task_column_doing }}</td>
						<td>{{ item.task_column_done }}</td>
						<td>{{ item.task_column_verify }}</td>
						<td>{{ item.task_column_archive }}</td>

						<td>{{ item.task_process }}</td>
						<td>{{ item.task_completed }}</td>

						<td>{{ item.deadline_red }}</td>
						<td>{{ item.deadline_yellow }}</td>
						<td>{{ item.deadline_green }}</td>
						<td>{{ item.deadline_default }}</td>

						<td>{{ item.high_priority }}</td>
						<td>{{ item.normal_priority }}</td>
						<td>{{ item.low_priority }}</td>
						<td>{{ item.default_priority }}</td>

						<td>{{ item.high_level }}</td>
						<td>{{ item.normal_level }}</td>
						<td>{{ item.low_level }}</td>
						<td>{{ item.default_level }}</td>

						<td>{{ item.task_comment_type_information }}</td>
						<td>{{ item.task_comment_type_problem }}</td>
						<td>{{ item.task_comment_type_decision }}</td>
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
				v-if="can('REPORT_MANAGERS_MEMBERS_UPLOAD')"
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


export default {
	name: "ProjectDetailsManagerTypeKanban",
	components: {
		BaseReportTable,
	},
	data: () => ({
		projectList: [],
		memberList: [],
		selectedData: {
			project: null,
			member: null,
		},


		projectDataList: [],
		pagination: {
			count: 0,
			page: 0,
			range: 10,
		},
		inputPage: 1,
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
		'selectedData.project'() {
			this.GetMemberList();
		},
		'selectedData.member'() {
			this.GetProjectList();
		},
		'selectedData': {
			handler(val) {
				this.GetDataAll();
			},
			deep: true
		},
	},
	created() {
		this.GetMemberList();
		this.GetProjectList();
	},
	methods: {
		GetProjectList() {
			this.$api
				.get('projects/selection', {
					params: {
						'projectKanban': true,
						'memberId': this.selectedData.member,
					}
				})
				.then(response => {
					this.projectList = response.data.data;
				});
		},
		GetMemberList() {
			this.$api
				.get('/employees', {
					params: {
						projectId: this.selectedData.project,
					}
				})
				.then(response => {
					this.memberList = response.data.data;
				});
		},


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
				.get('reports/by/project/kanban/managersAndMember', {
					params: {
						'projectId': this.selectedData.project,
						'userId': this.selectedData.member,
						'page': this.pagination.page,
						'pageSize': this.pagination.range,
					}
				})
				.then(response => {
					this.projectDataList = response.data.data;
					this.pagination.count = response.data.totalCount;
				});
		},
		ExportToFile() {
			this.$api
				.get('file/report/full/upload', {
					params: {
						'projectId': this.selectedData.project,
						'userId': this.selectedData.member,
						'page': this.pagination.page,
						'pageSize': this.pagination.range,
						'uploadKanban': true,
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
	},
};
</script>