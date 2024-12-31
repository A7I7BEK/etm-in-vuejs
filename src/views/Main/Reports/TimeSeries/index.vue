<script>
	import TableYear from './components/TableYear';
	import TableQuarter from './components/TableQuarter';
	import TableMonth from './components/TableMonth';
	import TableWeek from './components/TableWeek';
	import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
	import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


	export default {
		value: "MainReportsTimeSeries",
		components: {
			TableYear,
			TableQuarter,
			TableMonth,
			TableWeek,
			VueCtkDateTimePicker,
		},
		data() {
		    return {
                filterTypeSelected: null,
                filterTypeList: [
                    'WEEKLY_INTERVAL',
                    'MONTHLY_INTERVAL',
                    'QUARTER_INTERVAL',
                    'YEARLY_INTERVAL',
                ],
                dateRange: {
                    model: null,
                    maxDate: null,
                    shortcuts: [
                        { key: 'thisWeek', label: this.$t('thisWeek'), value: 'isoWeek' },
                        { key: 'lastWeek', label: this.$t('lastWeek'), value: '-isoWeek' },
                        { key: 'last7Days', label: this.$t('last7Days'), value: 6 },
                    ],
                    key: 0,
                    error: false,
                },


                selectedMonth: {
                    year: null,
                    month: null,
                },
                selectedQuarter: {
                    year: null,
                    quarter: [],
                    quarterAll: false,
                },
                selectedYear: {
                    year: null,
                },
            }
        },
		watch: {
			'filterTypeSelected'(val) {
				if (val === 'WEEKLY_INTERVAL') {
					setTimeout(() => {
						this.dateRange.key++;
					}, 100);

					this.selectedMonth = {
						year: null,
						month: null,
					};
					this.selectedQuarter = {
						year: null,
						quarter: [],
						quarterAll: false,
					};
					this.selectedYear = {
						year: null,
					};
				}
				else if (val === 'MONTHLY_INTERVAL') {
					this.dateRange.model = null;

					this.selectedQuarter = {
						year: null,
						quarter: [],
						quarterAll: false,
					};
					this.selectedYear = {
						year: null,
					};
				}
				else if (val === 'QUARTER_INTERVAL') {
					this.dateRange.model = null;

					this.selectedMonth = {
						year: null,
						month: null,
					};
					this.selectedYear = {
						year: null,
					};
				}
				else if (val === 'YEARLY_INTERVAL') {
					this.dateRange.model = null;

					this.selectedMonth = {
						year: null,
						month: null,
					};
					this.selectedQuarter = {
						year: null,
						quarter: [],
						quarterAll: false,
					};
				}
			},
			'selectedMonth.year'() {
				this.selectedMonth.month = null;
			},
			'selectedQuarter.year'() {
				this.selectedQuarter.quarter = [];
				this.selectedQuarter.quarterAll = false;
			},
			'selectedQuarter.quarterAll'(val) {
				if (val) {
					this.selectedQuarter.quarter = [1, 2, 3, 4];
				}
				else {
					this.selectedQuarter.quarter = [];
				}
			},
			'selectedQuarter.quarter'(val) {
				if (val.length === 4) {
					this.selectedQuarter.quarterAll = true;
				}
				else if (val.length === 0) {
					this.selectedQuarter.quarterAll = false;
				}
			},
		},
		created() {
		},
		methods: {
			InputDateRange(e) {
				if (e && !e.end) {
					this.dateRange.maxDate = this.$moment(e.start).add(6, 'day').toDate().toString();
				}
				else {
					this.dateRange.error = false;
					this.dateRange.maxDate = null;
				}
			},
			HideDateRange() {
				if (this.dateRange.model) {
					this.dateRange.error = !this.dateRange.model.end;
				}
			},
		}
	}
</script>

<template src="./template.html"></template>