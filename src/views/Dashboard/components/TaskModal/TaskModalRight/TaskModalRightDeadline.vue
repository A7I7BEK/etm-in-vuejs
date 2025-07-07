<template>
	<div
		class="mw-menu__item mw-menu__term custom-dropdown__main"
		data-custom-drop
	>
		<a
			href="#"
			data-custom-drop-btn
		>
			<div class="mw-menu__item__icon">
				<i class="fa fa-clock-o"></i>
			</div>
			<span>{{ $t('deadlineS') }}</span>
		</a>

		<div
			class="custom-dropdown right"
			id="modalRightDeadlineBody"
			style="width: 640px"
			data-custom-drop-body
		>
			<div class="member-all__top">
				<h3>{{ $t('taskCompletionDate') }}</h3>
			</div>
			<div class="menu-term__content">
				<div class="row">
					<div class="col-6">
						<div>
							<p
								class="mb-2"
								style="color: #495E75;"
							>
								{{ $t('deadlineStartDate') }}
							</p>
							<div class="mb-3">
								<div class="term-content__top">
									<div class="term-menu__date">
										<label>{{ $t('date') }}</label>
										<div
											:class="{ 'is-invalid': $v.start.date.$error }"
											class="term-menu__date__inner"
										>
											<input
												type="text"
												class="w-100"
												readonly
												:value="start.dateFormatted"
											>

											<div class="term-date__icon">
												<i class="fa fa-calendar"></i>
											</div>
										</div>
									</div>


									<div class="term-menu__time">
										<label>{{ $t('time') }}</label>
										<div class="term-menu__time__inner">

											<vue-timepicker
												:class="{ 'is-invalid': $v.start.time.$error }"
												hide-clear-button
												auto-scroll
												:minute-interval="10"
												v-model="start.time"
											></vue-timepicker>

											<div class="term-time__icon">
												<i class="fa fa-calendar"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="term__calendar">
								<datepicker
									format="d.MM.yyyy"
									wrapper-class="vue_datepicker"
									:inline="true"
									:monday-first="true"
									:disabled-dates="start.disabledDates"
									v-model="start.date"
								></datepicker>
							</div>
							<template v-if="dateAction === ACTION_TYPE.DELETE_START">
								<div
									class="form-group mt-4"
									style="color: #495e75;"
								>
									<label
										for="startTaskDate"
										class="mb-1 cur-p"
									>
										{{ $t('indicateTheReasonForTheChange') }}
									</label>
									<input
										id="startTaskDate"
										v-model="start.delComment"
										:class="{ 'is-invalid': $v.start.delComment.$error }"
										class="form-control"
										type="text"
									>
								</div>
							</template>
							<div
								class="term-calendar__bottom flex-wrap"
								:class="{ 'justify-content-between': dateAction === ACTION_TYPE.DELETE_START }"
							>
								<div
									v-if="dateAction === ACTION_TYPE.DELETE_START"
									class="term-calendar-close button-effect term-calendar__bottom__item mr-0"
									@click="dateAction = null"
								>
									<span>{{ $t('cancel') }}</span>
								</div>
								<div
									class="term-calendar-close button-effect term-calendar__bottom__item mr-0"
									@click="deleteStartDate"
								>
									<span>{{ $t('delete') }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-6">
						<div>
							<p
								class="mb-2"
								style="color: #495E75;"
							>
								{{ $t('deadlineEndDate') }}
							</p>
							<div class="mb-3">
								<div class="term-content__top">
									<div class="term-menu__date">
										<label>{{ $t('date') }}</label>
										<div
											class="term-menu__date__inner"
											:class="{ 'is-invalid': $v.end.date.$error }"
										>
											<input
												type="text"
												class="w-100"
												readonly
												:value="end.dateFormatted"
											>

											<div class="term-date__icon">
												<i class="fa fa-calendar"></i>
											</div>
										</div>
									</div>


									<div class="term-menu__time">
										<label>{{ $t('time') }}</label>
										<div class="term-menu__time__inner">

											<vue-timepicker
												:class="{ 'is-invalid': $v.end.time.$error }"
												hide-clear-button
												auto-scroll
												:minute-interval="10"
												v-model="end.time"
											></vue-timepicker>

											<div class="term-time__icon">
												<i class="fa fa-calendar"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="term__calendar">
								<datepicker
									format="d.MM.yyyy"
									wrapper-class="vue_datepicker"
									:inline="true"
									:monday-first="true"
									:disabled-dates="end.disabledDates"
									v-model="end.date"
								></datepicker>
							</div>
							<template v-if="dateAction === ACTION_TYPE.DELETE_END">
								<div
									class="form-group mt-4"
									style="color: #495e75;"
								>
									<label
										for="endTaskDate"
										class="mb-1 cur-p"
									>
										{{ $t('indicateTheReasonForTheChange') }}
									</label>
									<input
										id="endTaskDate"
										v-model="end.delComment"
										:class="{ 'is-invalid': $v.end.delComment.$error }"
										class="form-control"
										type="text"
									>
								</div>
							</template>
							<div
								class="term-calendar__bottom flex-wrap"
								:class="{ 'justify-content-between': dateAction === ACTION_TYPE.DELETE_END }"
							>
								<div
									v-if="dateAction === ACTION_TYPE.DELETE_END"
									class="term-calendar-close button-effect term-calendar__bottom__item mr-0"
									@click="dateAction = null"
								>
									<span>{{ $t('cancel') }}</span>
								</div>
								<div
									class="term-calendar-close button-effect term-calendar__bottom__item mr-0"
									@click="deleteEndDate"
								>
									<span>{{ $t('delete') }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="term-calendar__bottom flex-wrap justify-content-center mt-5">
					<template v-if="dateAction === ACTION_TYPE.UPDATE">
						<div
							class="form-group mt-4 w-75 m-auto"
							style="color: #495e75;"
						>
							<label
								for="changeTaskDate"
								class="mb-1 cur-p"
							>
								{{ $t('indicateTheReasonForTheChange') }}
							</label>
							<input
								id="changeTaskDate"
								v-model="updateComment"
								:class="{ 'is-invalid': $v.updateComment.$error }"
								class="form-control mb-3"
								type="text"
							>
							<div
								class="term-calendar-close button-effect term-calendar__bottom__item mr-0 mb-3 justify-content-center text-white"
								@click="dateAction = null"
							>
								<span>{{ $t('cancel') }}</span>
							</div>
						</div>
					</template>
					<div
						class="term-calendar__delete term-calendar-btn button-effect term-calendar__bottom__item w-75 text-center d-block"
						@click="setDeadline"
					>
						<span>{{ $t('save') }}</span>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>


<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import Datepicker from 'vuejs-datepicker';
import { required } from 'vuelidate/lib/validators';


const ACTION_TYPE = {
	DELETE_START: 'DELETE_START',
	DELETE_END: 'DELETE_END',
	UPDATE: 'UPDATE',
};


export default {
	name: "TaskModalRightDeadline",
	components: {
		Datepicker,
		VueTimepicker,
	},
	data() {
		return {
			ACTION_TYPE,
			dateAction: null,
			start: {
				date: null,
				time: {
					HH: '',
					mm: ''
				},
				dateFormatted: '',
				delComment: '',
				disabledDates: {
					to: null,
					from: null,
				},
			},
			end: {
				date: null,
				time: {
					HH: '',
					mm: ''
				},
				dateFormatted: '',
				delComment: '',
				disabledDates: {
					to: null,
					from: null,
				},
			},
			updateComment: '',
		};
	},
	validations() {
		const options = {
			start: {
				date: { required },
				time: {
					HH: { required },
					mm: { required },
				},
			},
			end: {
				date: { required },
				time: {
					HH: { required },
					mm: { required },
				},
			},
		};

		if (this.dateAction === ACTION_TYPE.DELETE_START) {
			options.start.delComment = { required };
		}
		else if (this.dateAction === ACTION_TYPE.DELETE_END) {
			options.end.delComment = { required };
		}
		else if (this.dateAction === ACTION_TYPE.UPDATE) {
			options.updateComment = { required };
		}

		return options;
	},
	watch: {
		'start.date'(val) {
			this.start.dateFormatted = val ? this.$moment(val).format('D.MM.YYYY') : '';
			this.end.disabledDates.to = val;
		},
		'end.date'(val) {
			this.end.dateFormatted = val ? this.$moment(val).format('D.MM.YYYY') : '';
			this.start.disabledDates.from = val;
		},
	},
	created() {
		const { startDate } = this.$store.state.taskModalData;
		if (startDate) {
			this.start.date = new Date(startDate);
			this.start.time.HH = this.$moment(startDate).format('HH');
			this.start.time.mm = this.$moment(startDate).format('mm');
		}

		const { endDate } = this.$store.state.taskModalData;
		if (endDate) {
			this.end.date = new Date(endDate);
			this.end.time.HH = this.$moment(endDate).format('HH');
			this.end.time.mm = this.$moment(endDate).format('mm');
		}
	},
	methods: {
		async setDeadline() {
			const { startDate, endDate } = this.$store.state.taskModalData;

			if (startDate || endDate) {
				await this.updateDeadline();
			}
			else {
				await this.createDeadline();
			}
		},
		async createDeadline() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			const sDate = this.$moment(this.start.date).format('YYYY-MM-DD');
			const sTime = `${this.start.time.HH}:${this.start.time.mm}:00`;
			const eDate = this.$moment(this.end.date).format('YYYY-MM-DD');
			const eTime = `${this.end.time.HH}:${this.end.time.mm}:00`;

			const resp = await this.$api.post('/task-deadline', {
				startDate: new Date(sDate + ' ' + sTime),
				endDate: new Date(eDate + ' ' + eTime),
				taskId: this.$store.state.taskModalData.id,
			});

			this.resetAll(resp.data.data);
		},
		async updateDeadline() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			if (this.dateAction !== ACTION_TYPE.UPDATE) {
				this.dateAction = ACTION_TYPE.UPDATE;
				return;
			}

			const sDate = this.$moment(this.start.date).format('YYYY-MM-DD');
			const sTime = `${this.start.time.HH}:${this.start.time.mm}:00`;
			const eDate = this.$moment(this.end.date).format('YYYY-MM-DD');
			const eTime = `${this.end.time.HH}:${this.end.time.mm}:00`;

			const resp = await this.$api.put('/task-deadline', {
				startDate: new Date(sDate + ' ' + sTime),
				endDate: new Date(eDate + ' ' + eTime),
				changesComment: this.updateComment,
				taskId: this.$store.state.taskModalData.id,
			});

			this.resetAll(resp.data.data);
		},
		async deleteStartDate() {
			if (this.dateAction !== ACTION_TYPE.DELETE_START) {
				this.dateAction = ACTION_TYPE.DELETE_START;
				return;
			}

			this.$v.start.delComment.$touch();
			if (this.$v.start.delComment.$invalid) {
				return;
			}

			const resp = await this.$api.delete('/task-deadline', {
				data: {
					startDate: true,
					changesComment: this.start.delComment,
					taskId: this.$store.state.taskModalData.id,
				}
			});

			this.start.date = null;
			this.start.time.HH = '';
			this.start.time.mm = '';
			this.resetAll(resp.data.data);
		},
		async deleteEndDate() {
			if (this.dateAction !== ACTION_TYPE.DELETE_END) {
				this.dateAction = ACTION_TYPE.DELETE_END;
				return;
			}

			this.$v.end.delComment.$touch();
			if (this.$v.end.delComment.$invalid) {
				return;
			}

			const resp = await this.$api.delete('/task-deadline', {
				data: {
					endDate: true,
					changesComment: this.end.delComment,
					taskId: this.$store.state.taskModalData.id,
				}
			});

			this.end.date = null;
			this.end.time.HH = '';
			this.end.time.mm = '';
			this.resetAll(resp.data.data);
		},
		resetAll(data) {
			this.$store.state.taskModalData.startDate = data.startDate;
			this.$store.state.taskModalData.endDate = data.endDate;
			this.$store.state.taskModalData.status = data.status;

			this.start.delComment = '';
			this.end.delComment = '';
			this.updateComment = '';
			this.dateAction = null;

			this.$v.$reset();
			$(document).click();
			this.$notification.success(this.$t('DeadlineSuccessfully'));

			this.$store.state.taskModalActionStarter++;
		},
	},
};
</script>



<style>
.vue__time-picker {
	width: 130px;
}

.vue__time-picker input.display-time {
	width: 100%;
	height: auto;
	padding: 6px 10px;
	padding-right: 35px;
	font-size: 15px;
}

.vue__time-picker .dropdown,
.vue__time-picker-dropdown {
	width: 100%;
	height: 200px;
	top: calc(100% + 2px);
	border: 1px solid #e3ebf3;
	border-radius: 6px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
}

.vue__time-picker .dropdown .select-list,
.vue__time-picker-dropdown .select-list {
	width: 100%;
	height: 100%;
}

.vue__time-picker .dropdown ul li,
.vue__time-picker-dropdown ul li {
	padding: 6px 0;
	font-size: 15px;
	color: #000;
}

.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker-dropdown ul li:not([disabled]).active,
.vue__time-picker-dropdown ul li:not([disabled]).active:hover,
.vue__time-picker-dropdown ul li:not([disabled]).active:focus {
	background: #75a4ef;
	color: #ffffff !important;
}


.vue_datepicker .vdp-datepicker__calendar span.cell {
	color: #000 !important;
}

.term__calendar span.day__month_btn.up,
.term__calendar .month__year_btn.up {
	color: #495E75;
	border-radius: 4px;
	padding: 0px 8px;
}

.vue_datepicker .vdp-datepicker__calendar {
	width: 100% !important;
	padding: 8px;
}

.vue_datepicker .vdp-datepicker__calendar .cell.selected {
	background: #75a4ef !important;
	color: #fff !important;
}

.vue_datepicker .vdp-datepicker__calendar .cell.selected:hover {
	color: #fff !important;
	background: #849DFE !important;
}

.vue_datepicker .vdp-datepicker__calendar .cell:not(.blank).day:hover {
	border: 1px solid #75a4ef !important;
}

.vue_datepicker .vdp-datepicker__calendar .cell:not(.blank).day {
	cursor: pointer;
	border: 1px solid #E3EBF3;
	border-radius: 0;
	margin: 1px;
	width: 13.5%;
}

span.cell.month {
	font-size: 13px;
	font-weight: bold;
	color: #495e75 !important;
}

.vue_datepicker .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
	border: 1px solid #75a4ef;
}

span.cell.month.disabled,
span.cell.day.disabled,
span.cell.year.disabled {
	color: #a4b4c5 !important;
}


.vue_datepicker .vdp-datepicker__calendar span.cell.day.selected.disabled {
	color: #fff !important;
}
</style>