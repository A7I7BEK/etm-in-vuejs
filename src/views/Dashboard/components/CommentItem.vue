<template>
	<div class="d-inline">
		<template>
			<p data-number="11" class="m-0"> {{$t('boardColumn.commentedCard')}} </p>
			<a href="javascript:void(0)" class="m-0" @click="showModal" v-if="clickable">{{ name }}</a>
			<p class="m-0" v-else>{{ name }}</p>
			<div class="allactionln_t111_dataproblem">
				<span>
					<template v-if="$moment().diff($moment(commentCreatedAt), 'years') > 0">
						{{ commentCreatedAt | filterDateMonth }}
					</template>
					<template v-else>
						{{ commentCreatedAt | filterTimeMonth }}
					</template>
				</span>
				<span :class="commentColorType">{{commentType}}</span>
			</div>
			<div class="allactionln_t111_conts" style="word-break: break-word">
				{{commentText}}
			</div>
		</template>
	</div>
</template>
<script>
	export default {
		props: {
			comment: Object,
			clickable: {
				type: Boolean,
				default: true,
			}
		},
		computed: {
			commentText() {
				return this.comment.commentText
			},
			commentCreatedAt() {
				return this.comment.createdAt
			},
			commentColorType() {
				let val = this.comment.commentType.value
				if (val === 'TASK_COMMENT_TYPE_INFORMATION') {
					val = ''
				} else if(val === 'TASK_COMMENT_TYPE_DECISION') {
					val = 'success'
				} else if (val === 'TASK_COMMENT_TYPE_PROBLEM') {
					val = 'danger'
				}
				return val
			},
			commentType() {
				let val = this.comment.commentType.value
				if (val === 'TASK_COMMENT_TYPE_INFORMATION') {
					val = 'Информация'
				} else if(val === 'TASK_COMMENT_TYPE_DECISION') {
					val = 'Решение'
				} else if (val === 'TASK_COMMENT_TYPE_PROBLEM') {
					val = 'Проблема'
				}
				return val
			},
			name() {
				return this.comment.taskName
			}
		},
		methods: {
			showModal() {
				this.$store.state.taskModalId = this.comment.taskId
			}
		}
	}
</script>

<style scoped>
	.success{
		color: #61BD4F;
	}
	.danger{
		color: #EF5730;
	}
</style>