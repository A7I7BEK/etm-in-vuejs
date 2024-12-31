<template>
	<div class="mw-menu__item mw-menu__term custom-dropdown__main" data-custom-drop>
		<a href="#" data-custom-drop-btn>
			<div class="mw-menu__item__icon">
				<i class="fa fa-clock-o" aria-hidden="true"></i>
			</div>
			<span>{{$t('deadlineS')}}</span>
		</a>

		<div class="custom-dropdown right" id="modalRightDeadlineBody" style="width: 640px" data-custom-drop-body>
			<div class="member-all__top">
				<h3>{{$t('taskCompletionDate')}}</h3>
			</div>
			<div class="menu-term__content">
				<div class="row">
					<div class="col-6">
						<div>
							<h5 class="mb-2" style="color: #495E75;">
								{{$t('start')}}
							</h5>
							<div class="mb-3">
								<div class="term-content__top">
									<div class="term-menu__date">
										<label>{{$t('date')}}</label>
										<div :class="{'is-invalid': $v.startDateFormatted.$error}" class="term-menu__date__inner">
											<input type="text" class="w-100" readonly :value="startDateFormatted">

											<div class="term-date__icon">
												<i class="fa fa-calendar" aria-hidden="true"></i>
											</div>
										</div>
									</div>


									<div class="term-menu__time">
										<label>{{$t('time')}}</label>
										<div class="term-menu__time__inner">

											<timeselector class="vue_timeselector"
														  :class="{'is-invalid': $v.startTime.$error}"
														  displayFormat="HH:mm"
														  :h24="true"
														  v-model="startTime"
											>
												<template slot="hours">
													<span>{{$t('hour')}}</span>
												</template>
												<template slot="minutes">
													<span>{{$t('minute')}}</span>
												</template>
											</timeselector>

											<div class="term-time__icon">
												<i class="fa fa-calendar" aria-hidden="true"></i>
											</div>
										</div>
									</div>
								</div>

								<div class="invalid-feedback mt-2 d-block" v-if="$v.$error">{{$t('chooseDateTime')}}</div>
							</div>
							<div class="term__calendar">
								<datepicker
										format="d.MM.yyyy"
										wrapper-class="vue_datepicker"
										:inline="true"
										:monday-first="true"
										:disabled-dates="startDisabledDates"
										v-model="startDate"
								></datepicker>
							</div>
							<template v-if="dateStatus === 'start'">
								<div class="form-group mt-4" style="color: #495e75;">
									<label for="startTaskDate" class="mb-1 cur-p">{{$t('indicateTheReasonForTheChange')}}</label>
									<input id="startTaskDate" v-model="dateComment" :class="{'is-invalid': $v.dateComment.$error}" class="form-control" type="text" >
								</div>
							</template>
							<div class="term-calendar__bottom flex-wrap" :class="{'justify-content-between': dateStatus === 'start'}">
								<div v-if="dateStatus === 'start'" class="term-calendar-close button-effect term-calendar__bottom__item mr-0" @click="cleanForm">
									<span>{{$t('cancel')}}</span>
								</div>
								<div class="term-calendar-close button-effect term-calendar__bottom__item mr-0" @click="startResetDeadline">
									<span>{{$t('delete')}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-6">
						<div>
							<h5 class="mb-2" style="color: #495E75;">
								{{$t('completion')}}
							</h5>
							<div class="mb-3">
								<div class="term-content__top">
									<div class="term-menu__date">
										<label>{{$t('date')}}</label>
										<div :class="{'is-invalid': $v.deadlineDateFormatted.$error}" class="term-menu__date__inner">
											<input type="text" class="w-100" readonly :value="deadlineDateFormatted">

											<div class="term-date__icon">
												<i class="fa fa-calendar" aria-hidden="true"></i>
											</div>
										</div>
									</div>


									<div class="term-menu__time">
										<label>{{$t('time')}}</label>
										<div class="term-menu__time__inner">

											<timeselector class="vue_timeselector"
														  :class="{'is-invalid': $v.deadlineTime.$error}"
														  displayFormat="HH:mm"
														  :h24="true"
														  v-model="deadlineTime"
											>
												<template slot="hours">
													<span>{{$t('hour')}}</span>
												</template>
												<template slot="minutes">
													<span>{{$t('minute')}}</span>
												</template>
											</timeselector>

											<div class="term-time__icon">
												<i class="fa fa-calendar" aria-hidden="true"></i>
											</div>
										</div>
									</div>
								</div>

								<div class="invalid-feedback mt-2 d-block" v-if="$v.$error">{{$t('chooseDateTime')}}</div>
							</div>
							<div class="term__calendar">
								<datepicker
										format="d.MM.yyyy"
										wrapper-class="vue_datepicker"
										:inline="true"
										:monday-first="true"
										:disabled-dates="deadlineDisabledDates"
										v-model="deadlineDate"
								></datepicker>
							</div>
							<template v-if="dateStatus === 'end'">
								<div class="form-group mt-4" style="color: #495e75;">
									<label for="endTaskDate" class="mb-1 cur-p">{{$t('indicateTheReasonForTheChange')}}</label>
									<input id="endTaskDate" v-model="dateComment" :class="{'is-invalid': $v.dateComment.$error}" class="form-control" type="text" >
								</div>
							</template>
							<div class="term-calendar__bottom flex-wrap" :class="{'justify-content-between': dateStatus === 'end'}">
								<div v-if="dateStatus === 'end'" class="term-calendar-close button-effect term-calendar__bottom__item mr-0" @click="cleanForm">
									<span>{{$t('cancel')}}</span>
								</div>
								<div class="term-calendar-close button-effect term-calendar__bottom__item mr-0" @click="ResetDeadline">
									<span>{{$t('delete')}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="term-calendar__bottom flex-wrap justify-content-center mt-5">
					<template v-if="dateStatus === 'change'">
						<div class="form-group mt-4 w-75 m-auto" style="color: #495e75;">
							<label for="changeTaskDate" class="mb-1 cur-p">{{$t('indicateTheReasonForTheChange')}}</label>
							<input id="changeTaskDate" v-model="dateComment" :class="{'is-invalid': $v.dateComment.$error}" class="form-control mb-3" type="text" >
							<div class="term-calendar-close button-effect term-calendar__bottom__item mr-0 mb-3 justify-content-center text-white" @click="cleanForm">
								<span>{{$t('cancel')}}</span>
							</div>
						</div>
					</template>
					<div class="term-calendar__delete term-calendar-btn button-effect term-calendar__bottom__item w-75 text-center d-block" @click="SetDeadline">
						<span>{{$t('save')}}</span>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>


<script>
	import Datepicker from 'vuejs-datepicker';
	import Timeselector from 'vue-timeselector';
	import {required} from 'vuelidate/lib/validators'
	const today = new Date(moment().format('YYYY-MM-DD'));

	export default {
		name: "TaskModalRightDeadline",
		components: {
			Datepicker,
			Timeselector,
		},
		data: () => ({
			dateStatus: '',
			dateComment: '',

			startDisabledDates: {
				to: today
				// to: new Date()
			},
			startDate: null,
			startDateFormatted: null,
			startTime: null,


			deadlineDisabledDates: {
				to: today
				// to: new Date()
			},
			deadlineDate: null,
			deadlineDateFormatted: null,
			deadlineTime: null
		}),
		watch: {
			'deadlineDate'(val) {
				this.deadlineDateFormatted = this.$moment(val).isValid() ? this.$moment(val).format('D.MM.YYYY') : '';
			},
			'startDate'(val) {
				this.startDateFormatted = this.$moment(val).isValid() ? this.$moment(val).format('D.MM.YYYY') : '';
			},
		},
		created() {
			this.createdDate()
			if (this.$store.state.taskModalData.deadLine !== '') {
				this.deadlineTime = this.deadlineDate = this.$moment(this.$store.state.taskModalData.deadLine).toDate();
			}
			if (this.$store.state.taskModalData.startDate !== '') {
				this.startTime = this.startDate = this.$moment(this.$store.state.taskModalData.startDate).toDate();
			}
		},
		mounted() {
			document.addEventListener('click', (e) => {
				if (!e.target.closest('#modalRightDeadlineBody')) {
					this.$v.$reset();
				}
			});
		},
		methods: {
			cleanForm() {
				this.dateComment = '';
				this.dateStatus = '';
			},
			createdDate() {
				let momentDate = +this.$moment().subtract(1, 'days');
				let date = new Date(momentDate)
				this.deadlineDisabledDates.to = date
				this.startDisabledDates.to = date
			},
			SetDeadline() {
				this.$v.deadlineDateFormatted.$touch();
				this.$v.deadlineTime.$touch();
				this.$v.startDateFormatted.$touch();
				this.$v.startTime.$touch();

				if (
					this.$v.deadlineDateFormatted.$invalid
					|| this.$v.deadlineTime.$invalid
					|| this.$v.startTime.$invalid
					|| this.$v.startDateFormatted.$invalid
				)
				{
					return;
				}

				const { startDate, deadLine } = this.$store.state.taskModalData;

				if (startDate || deadLine) {
					if (this.dateStatus === 'change') {
						this.$v.dateComment.$touch();
						if (this.$v.dateComment.$invalid) {
							return
						}
						this.$api
							.put('taskDeadline', {
								"changesComment": this.dateComment,
								"checked": true,
								'deadLine': this.$moment(this.deadlineDate).format('YYYY-MM-DD') + ' ' + this.$moment(this.deadlineTime).format('HH:mm:ss'),
								'startDate': this.$moment(this.startDate).format('YYYY-MM-DD') + ' ' + this.$moment(this.startTime).format('HH:mm:ss'),
								'taskId': this.$store.state.taskModalData.id
							})
							.then(response => {
								this.cleanForm();
								this.GetTaskOne();
								this.$v.$reset();
								$(document).click();
								this.$notification.success(this.$t('DeadlineSuccessfully'));
							});
					} else {
						this.dateStatus = 'change';
					}
				}
				else {
					this.$api
						.post('taskDeadline', {
							"checked": true,
							'deadLine': this.$moment(this.deadlineDate).format('YYYY-MM-DD') + ' ' + this.$moment(this.deadlineTime).format('HH:mm:ss'),
							'startDate': this.$moment(this.startDate).format('YYYY-MM-DD') + ' ' + this.$moment(this.startTime).format('HH:mm:ss'),
							'taskId': this.$store.state.taskModalData.id
						})
						.then(response => {
							this.GetTaskOne();
							this.$v.$reset();
							$(document).click();
							this.$notification.success(this.$t('DeadlineSuccessfully'));
						});
				}
			},
			startResetDeadline() {
				if (this.dateStatus === 'start') {
					this.$v.dateComment.$touch();
					if (this.$v.dateComment.$invalid) {
						return
					}
					this.$api.delete('taskDeadline', { data:  {
							"changesComment": this.dateComment,
							"startDate": true,
							"taskId": this.$store.state.taskModalData.id
						}})
						.then(response => {
							this.GetTaskOne();
							$(document).click();
							this.$notification.success('Срок успешно удален!');

							this.startDate = null;
							this.startTime = new Date(moment().format('YYYY-MM-DD') + 'T00:00:00');
							this.cleanForm();
							this.$v.$reset();
						});
				} else {
					this.dateStatus = 'start';
				}
			},
			ResetDeadline() {
				if (this.dateStatus === 'end') {
					this.$v.dateComment.$touch();
					if (this.$v.dateComment.$invalid) {
						return
					}
					this.$api.delete('taskDeadline', { data: {
							"changesComment": this.dateComment,
							"deadLine": true,
							"taskId": this.$store.state.taskModalData.id
						}})
						.then(response => {
							this.GetTaskOne();
							$(document).click();
							this.$notification.success('Срок успешно удален!');

							this.deadlineDate = null;
							this.deadlineTime = new Date(moment().format('YYYY-MM-DD') + 'T00:00:00');
							this.cleanForm();
							this.$v.$reset();
						});
				} else {
					this.dateStatus = 'end';
				}


			},
			GetTaskOne() {
				this.$api
					.get('tasks/' + this.$store.state.taskModalData.id)
					.then(response => {
						this.$store.state.taskModalData.deadLine = response.data.data.deadLine;
						this.$store.state.taskModalData.startDate = response.data.data.startDate;
						this.$store.state.taskModalData.status = response.data.data.status;

						this.$store.state.taskModalActionStarter++;
					});
			},
		},
		validations: {
			dateComment: {
				required
			},

			deadlineDateFormatted: {
				required
			},
			deadlineTime: {
				required
			},
			startDateFormatted: {
				required
			},
			startTime: {
				required
			},
		},
	}
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

	.term__calendar span.day__month_btn.up, .term__calendar .month__year_btn.up {
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

	span.cell.month.disabled, span.cell.day.disabled, span.cell.year.disabled {
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