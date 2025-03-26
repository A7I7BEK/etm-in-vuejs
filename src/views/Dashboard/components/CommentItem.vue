<template>
	<div class="d-inline">
		<template>
			<p
				data-number="11"
				class="m-0"
			> {{ $t('boardColumn.commentedCard') }} </p>
			<a
				href="javascript:void(0)"
				class="m-0"
				@click="showModal"
				v-if="clickable"
			>
				{{ comment.taskName }}
			</a>
			<p
				class="m-0"
				v-else
			>
				{{ comment.taskName }}
			</p>
			<div class="allactionln_t111_dataproblem">
				<span>
					<template v-if="$moment().diff($moment(comment.createdAt), 'years') > 0">
						{{ comment.createdAt | filterDateMonth }}
					</template>
					<template v-else>
						{{ comment.createdAt | filterTimeMonth }}
					</template>
				</span>
				<span :class="commentClass[ comment.commentType ]">
					{{ $t(`TASK_COMMENT_TYPE.${comment.commentType}`) }}
				</span>
			</div>
			<div
				class="allactionln_t111_conts"
				style="word-break: break-word"
			>
				{{ comment.commentText }}
			</div>
		</template>
	</div>
</template>
<script>
import { TASK_COMMENT_TYPE } from '../../../constants';

export default {
	props: {
		comment: Object,
		clickable: {
			type: Boolean,
			default: true,
		}
	},
	data() {
		return {
			commentClass: {
				[ TASK_COMMENT_TYPE.INFORMATION ]: '',
				[ TASK_COMMENT_TYPE.SOLUTION ]: 'success',
				[ TASK_COMMENT_TYPE.PROBLEM ]: 'danger',
			},
		};
	},
	methods: {
		showModal() {
			this.$store.state.taskModalId = this.comment.taskId;
		}
	}
};
</script>

<style scoped>
.success {
	color: #61BD4F;
}

.danger {
	color: #EF5730;
}
</style>