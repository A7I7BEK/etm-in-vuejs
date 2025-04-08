<script>
import BaseAction from '../../../../../components/actions/base-action.vue';
import BaseRightMenu from '../../../../../components/BaseRightMenu';
import { ORDER } from '../../../../../constants';
import CommentItem from '../../CommentItem';


export default {
	name: 'RightMenuAction',
	components: {
		BaseRightMenu,
		BaseAction,
		CommentItem
	},
	data() {
		return {
			actionPageSize: 20,
			actionList: [],
			actionTotalCount: 0,

			commentPageSize: 20,
			commentList: [],
			commentTotalCount: 0,
		};
	},
	watch: {
		'$store.state.rightMenuActionStarter'() {
			this.GetTaskActionList();
			this.GetTaskCommentList();
		}
	},
	created() {
	},
	methods: {
		GetTaskActionList(pageCount = 0) {
			if (pageCount > 0) {
				this.actionPageSize += pageCount;
			}
			else {
				this.actionPageSize = 20;
			}

			this.$api
				.get('/actions', {
					params: {
						page: 1,
						pageSize: this.actionPageSize,
						sortBy: 'id',
						sortDirection: ORDER.DESC,
						projectId: this.$route.params.id,
					}
				})
				.then(response => {
					const { data, meta } = response.data;

					this.actionList = data;
					this.actionTotalCount = meta.totalItems;
				});
		},
		GetTaskCommentList(pageCount = 0) {
			if (pageCount > 0) {
				this.commentPageSize += pageCount;
			}
			else {
				this.commentPageSize = 20;
			}

			this.$api
				.get('/task-comments', {
					params: {
						page: 1,
						pageSize: this.commentPageSize,
						sortBy: 'id',
						sortDirection: ORDER.DESC,
						projectId: this.$route.params.id,
					}
				})
				.then(response => {
					const { data, meta } = response.data;

					this.commentList = data;
					this.commentTotalCount = meta.totalItems;
				});
		},
	}
};
</script>

<template src="./template.html"></template>