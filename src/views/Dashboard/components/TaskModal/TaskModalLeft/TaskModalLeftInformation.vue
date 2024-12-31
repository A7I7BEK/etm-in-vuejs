<template>
	<div class="m-home__top">

		<div class="mw-tags home-top__item" v-if="can('TASK_TAG_READ')">
			<div class="home-top__item__title">
				<div class="home-top__item__title__inner">
					<div class="home-top__item__title__icon">
						<i class="fa fa-bookmark" aria-hidden="true"></i>
					</div>
					<h3>{{$t('tags')}}</h3>
				</div>
			</div>

			<div class="mw-tags__inner">
				<div class="mw-tags__item"
					 v-for="item in $store.state.taskModalData.tags"
					 :key="item.id"
					 :style="{ background: item.color }"
				>{{ item.name }}</div>

				<!--<div class="mw-tags__item mw-tags__item__add button-effect"></div>-->
			</div>
		</div>


		<div class="mw-users home-top__item" v-if="can('TASK_MEMBER_READ')">
			<div class="home-top__item__title">
				<div class="home-top__item__title__inner">
					<div class="home-top__item__title__icon">
						<i class="fa fa-users" aria-hidden="true"></i>
					</div>
					<h3>{{$t('members')}}</h3>
				</div>
			</div>

			<div class="home-top__item__inner">
				<div class="mw-users__item"
					 v-for="item in $store.state.taskModalData.members"
					 :key="item.employee.id"
					 :title="item.employee.firstName + ' ' + item.employee.lastName"
				>
					<div class="mw-users__item__img">
						<strong v-if="item.employee.photoUrl.trim() === ''">{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}</strong>
						<img v-else :src="$store.state.url + item.employee.photoUrl" class="h-100">
					</div>
				</div>

				<!--<div class="mw-users__item">-->
					<!--<div class="mw-users__item__img mw-user__all">-->
						<!--<strong>+12</strong>-->
					<!--</div>-->
				<!--</div>-->

				<!--<div class="mw-users__item button-effect">-->
					<!--<div class="mw-users__item__img mw-user__add">-->
						<!--<strong>+</strong>-->
					<!--</div>-->
				<!--</div>-->

			</div>
		</div>


		<div class="mw-term home-top__item">
			<div class="home-top__item__title">
				<div class="home-top__item__title__inner">
					<div class="home-top__item__title__icon">
						<i class="fa fa-clock-o" aria-hidden="true"></i>
					</div>
					<h3>{{$t('deadlineS')}}</h3>
				</div>
			</div>

			<div class="home-top__item__inner">
				<div class="mw-term__date"
					 :class="[
					 {'term-danger': $store.state.taskModalData.status === $store.state.TASK_STATUS_TYPE.RED},
					 {'term-warning': $store.state.taskModalData.status === $store.state.TASK_STATUS_TYPE.YELLOW},
					 {'term-success': $store.state.taskModalData.status === $store.state.TASK_STATUS_TYPE.GREEN}
					 ]"
				>
					<span v-if="$moment($store.state.taskModalData.deadLine).isValid()">
						<template v-if="$moment().diff($moment($store.state.taskModalData.deadLine), 'years') > 0">
							{{ $store.state.taskModalData.deadLine | filterDateMonth }}
						</template>
						<template v-else>
							{{ $store.state.taskModalData.deadLine | filterMonthTime }}
						</template>
					</span>
					<span v-else>{{$t('notSet')}}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "TaskModalLeftInformation"
	}
</script>