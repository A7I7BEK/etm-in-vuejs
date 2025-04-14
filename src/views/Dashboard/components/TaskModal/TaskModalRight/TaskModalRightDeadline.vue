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

											<timeselector
												class="vue_timeselector"
												:class="{ 'is-invalid': $v.start.time.$error }"
												displayFormat="HH:mm"
												:h24="true"
												v-model="start.time"
											>
												<template slot="hours">
													<span>{{ $t('hour') }}</span>
												</template>
												<template slot="minutes">
													<span>{{ $t('minute') }}</span>
												</template>
											</timeselector>

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

											<timeselector
												class="vue_timeselector"
												:class="{ 'is-invalid': $v.end.time.$error }"
												displayFormat="HH:mm"
												:h24="true"
												v-model="end.time"
											>
												<template slot="hours">
													<span>{{ $t('hour') }}</span>
												</template>
												<template slot="minutes">
													<span>{{ $t('minute') }}</span>
												</template>
											</timeselector>

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
import Timeselector from 'vue-timeselector';
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
		Timeselector,
	},
	data() {
		return {
			ACTION_TYPE,
			dateAction: null,
			start: {
				date: null,
				time: null,
				dateFormatted: '',
				delComment: '',
				disabledDates: {
					to: null,
					from: null,
				},
			},
			end: {
				date: null,
				time: null,
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
				date: {
					required,
				},
				time: {
					required,
				},
			},
			end: {
				date: {
					required,
				},
				time: {
					required,
				},
			},
		};

		if (this.dateAction === ACTION_TYPE.DELETE_START) {
			options.start.delComment = {
				required,
			};
		}
		else if (this.dateAction === ACTION_TYPE.DELETE_END) {
			options.end.delComment = {
				required,
			};
		}
		else if (this.dateAction === ACTION_TYPE.UPDATE) {
			options.updateComment = {
				required,
			};
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
			this.start.time = new Date(startDate);
		}

		const { endDate } = this.$store.state.taskModalData;
		if (endDate) {
			this.end.date = new Date(endDate);
			this.end.time = new Date(endDate);
		}
	},
	mounted() {
		document.addEventListener('click', this.resetWhenClose);
	},
	destroyed() {
		document.removeEventListener('click', this.resetWhenClose);
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
			const sTime = this.$moment(this.start.time).format('HH:mm:ss');
			const eDate = this.$moment(this.end.date).format('YYYY-MM-DD');
			const eTime = this.$moment(this.end.time).format('HH:mm:ss');

			const resp = await this.$api.post('/task-deadline', {
				startDate: sDate + ' ' + sTime,
				endDate: eDate + ' ' + eTime,
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
			const sTime = this.$moment(this.start.time).format('HH:mm:ss');
			const eDate = this.$moment(this.end.date).format('YYYY-MM-DD');
			const eTime = this.$moment(this.end.time).format('HH:mm:ss');

			const resp = await this.$api.put('/task-deadline', {
				startDate: sDate + ' ' + sTime,
				endDate: eDate + ' ' + eTime,
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
			this.start.time = null;
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
			this.end.time = null;
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

		resetWhenClose(e) {
			if (!e.target.closest('#modalRightDeadlineBody')) {
				this.$v.$reset();
			}
		},
	},
};
</script>



<style>
.vue_timeselector .vtimeselector__box {
	height: 200px;
	top: calc(100% + 2px);
	border: 1px solid #e3ebf3;
	border-radius: 6px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
}

.vue_timeselector .vtimeselector__box__list--hours {
	border-right: 1px solid #e3ebf3;
}

.vue_timeselector .vtimeselector__box__head {
	color: #a4b4c5;
}

.vue_timeselector .vtimeselector__box__item {
	font-size: 14px;
	color: #000;
}

.vue_timeselector .timeselector__box__item--is-disabled {
	background-color: transparent;
	color: #a4b4c5;
}

.vue_timeselector .vtimeselector__box__item:not(.timeselector__box__item--is-disabled):not(.timeselector__box__item--is-selected):hover {
	background: #e3ebf3;
}

.vue_timeselector .vtimeselector__box__item--hours {
	margin-left: 3px;
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

.vtimeselector__clear {
	display: none !important;
}

.vue_datepicker .vdp-datepicker__calendar span.cell.day.selected.disabled {
	color: #fff !important;
}

.vtimeselector__box__item {
	padding: .4em 0;
	font-size: 13px;
	color: #6c7584;
}

.vtimeselector__box__list::-webkit-scrollbar {
	width: 3px;
}

.timeselector__box__item--is-selected {
	background: #75a4ef;
	color: #ffffff !important;
}
</style>