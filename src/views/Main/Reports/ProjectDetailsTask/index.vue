<script>
import BaseReportTable from '../../../../components/BaseReportTable';
import { PERMISSION_TYPE } from '../../../../constants';


export default {
	name: "MainReportsProjectDetailsTask",
	components: {
		BaseReportTable,
	},
	data: () => ({
		PERMISSION_TYPE,
		projectSelectionList: [],
		projectSelected: null,

		projectDataList: [],
		pagination: {
			count: 0,
			page: 1,
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
			this.GetProjectAll();
		},
		'projectSelected'(val) {
			if (val) {
				this.GetProjectAll();
			}
		}
	},
	created() {
		this.GetProjectSelectionAll();
	},
	mounted() {
	},
	methods: {
		GetProjectSelectionAll() {
			this.$api
				.get('/projects/selection')
				.then(response => {
					this.projectSelectionList = response.data.data;
				});
		},
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
				.get('reports/task/by/projectWithUser', {
					params: {
						'projectId': this.projectSelected,
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
				.get('file/report/personal/upload', {
					params: {
						'projectId': this.projectSelected,
						'page': this.pagination.page,
						'pageSize': this.pagination.range,
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

<template src="./template.html"></template>