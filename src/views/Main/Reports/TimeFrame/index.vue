<script>
	import VueCal from 'vue-cal'
	import 'vue-cal/dist/vuecal.css'
	import 'vue-cal/dist/i18n/ru.js'



	export default {
		name: "MainReportsTimeFrame",
		components: {
			VueCal,
		},
		data:() => ({
			employeeList: [],
			employeeSelected: null,
			startDate: null,
			endDate: null,

			events: [],
		}),
		watch: {
			'employeeSelected'(val) {
				if (val) {
					this.GetDataAll();
				}
				else {
					this.events = [];
				}
			}
		},
		created() {
			this.GetEmployeeAll();
		},
		mounted() {
		},
		methods: {
			CalendarReady(val) {
				if (val.view === 'week') {
					this.startDate = this.$moment(val.startDate).format();
					this.endDate = this.$moment(val.endDate).format();
				}
			},
			CalendarChange(val) {
				if (val.view === 'week') {
					this.startDate = this.$moment(val.startDate).format();
					this.endDate = this.$moment(val.endDate).format();
					if (this.employeeSelected) {
						this.GetDataAll();
					}
				}
			},


			GetEmployeeAll() {
				this.$api
					.get('employees')
					.then(response => {
						this.employeeList = response.data.data;
					});
			},
			GetDataAll() {
				this.$api
					.get('reports/person/full/weekly', {
						params: {
							'startDate': this.startDate,
							'endDate': this.endDate,
							'userId': this.employeeSelected,
						}
					})
					.then(response => {
						this.events = response.data.data;
					});
			},
		}
	}
</script>

<template src="./template.html"></template>