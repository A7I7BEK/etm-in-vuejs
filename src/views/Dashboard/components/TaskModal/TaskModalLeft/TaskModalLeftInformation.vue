<template>
	<div class="m-home__top">

		<div
			class="mw-tags home-top__item"
			v-if="can(PERMISSION_TYPE.TASK_TAG.READ)"
		>
			<div class="home-top__item__title">
				<div class="home-top__item__title__inner">
					<div class="home-top__item__title__icon">
						<i
							class="fa fa-bookmark"
							aria-hidden="true"
						></i>
					</div>
					<h3>{{ $t('tags') }}</h3>
				</div>
			</div>

			<div class="mw-tags__inner">
				<div
					class="mw-tags__item"
					v-for="item in $store.state.taskModalData.tags"
					:key="item.id"
					:style="{ background: item.projectTag.color }"
				>
					{{ item.projectTag.name }}
				</div>

				<!--<div class="mw-tags__item mw-tags__item__add button-effect"></div>-->
			</div>
		</div>


		<div
			class="mw-users home-top__item"
			v-if="can(PERMISSION_TYPE.TASK_MEMBER.READ)"
		>
			<div class="home-top__item__title">
				<div class="home-top__item__title__inner">
					<div class="home-top__item__title__icon">
						<i
							class="fa fa-users"
							aria-hidden="true"
						></i>
					</div>
					<h3>{{ $t('members') }}</h3>
				</div>
			</div>

			<div class="home-top__item__inner">
				<div
					class="mw-users__item"
					v-for="item in $store.state.taskModalData.members"
					:key="item.projectMember.employee.id"
					:title="item.projectMember.employee.firstName + ' ' + item.projectMember.employee.lastName"
				>
					<div class="mw-users__item__img">
						<img
							v-if="item.projectMember.employee.photoFile"
							:src="$store.state.url + item.projectMember.employee.photoFile.url"
							class="h-100"
						>
						<strong v-else>
							{{ item.projectMember.employee.firstName.charAt(0) + item.projectMember.employee.lastName.charAt(0) }}
						</strong>
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
						<i class="fa fa-clock-o"></i>
					</div>
					<h3>{{ $t('deadlineS') }}</h3>
				</div>
			</div>

			<div class="home-top__item__inner">
				<div
					class="mw-term__date"
					:class="statusClass[ $store.state.taskModalData.status ]"
				>
					<span v-if="$moment($store.state.taskModalData.endDate).isValid()">
						<template v-if="$moment().diff($moment($store.state.taskModalData.endDate), 'years') > 0">
							{{ $store.state.taskModalData.endDate | filterDateMonth }}
						</template>
						<template v-else>
							{{ $store.state.taskModalData.endDate | filterMonthTime }}
						</template>
					</span>
					<span v-else>{{ $t('notSet') }}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { PERMISSION_TYPE, TASK_STATUS_TYPE } from '../../../../../constants';

export default {
	name: "TaskModalLeftInformation",
	data() {
		return {
			PERMISSION_TYPE,
			statusClass: {
				[ TASK_STATUS_TYPE.RED ]: 'term-danger',
				[ TASK_STATUS_TYPE.YELLOW ]: 'term-warning',
				[ TASK_STATUS_TYPE.GREEN ]: 'term-success',
			},
		};
	},
};
</script>