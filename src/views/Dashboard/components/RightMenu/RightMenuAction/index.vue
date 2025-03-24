<script>
	import BaseRightMenu from '../../../../../components/BaseRightMenu';
	import ActionItem from '../../ActionItem';
	import CommentItem from '../../CommentItem';
	import { ORDER } from '../../../../../constants';


	export default {
		name: 'RightMenuAction',
		components: {
			BaseRightMenu,
			ActionItem,
			CommentItem
		},
		data()
		{
			return {
				actionTotalCount: 0,
				actionPerPage: 20,
				commentTotalCount: 0,
				commentPerPage: 20,
				actionList: [],
				commentList: [],
			};
		},
		watch: {
			'$store.state.rightMenuActionStarter'()
			{
				this.GetTaskActionList();
				this.GetTaskCommentList();
			}
		},
		created()
		{
		},
		methods: {
			GetTaskActionList(pageCount = 0)
			{
				if (pageCount > 0)
				{
					this.actionPerPage += pageCount;
				}
				else
				{
					this.actionPerPage = 20;
				}

				this.$api
					.get('taskActions', {
						params: {
							'page': 0,
							'perPage': this.actionPerPage,
							'sortBy': 'id',
							'sortDirection': ORDER.DESC,
							'projectId': this.$route.params.id,
						}
					})
					.then(response => {
						this.actionList = response.data.data;
						this.actionTotalCount = response.data.totalCount;
					});
			},
			GetTaskCommentList(pageCount = 0)
			{
				if (pageCount > 0)
				{
					this.commentPerPage += pageCount;
				}
				else
				{
					this.commentPerPage = 20;
				}

				this.$api
					.get('taskComments', {
						params: {
							'page': 0,
							'perPage': this.commentPerPage,
							'sortBy': 'id',
							'sortDirection': ORDER.DESC,
							'projectId': this.$route.params.id,
							'forMenu': true
						}
					})
					.then(response => {
						this.commentList = response.data.data;
						this.commentTotalCount = response.data.totalCount;
					});
			},
		}
	};
</script>

<template src="./template.html"></template>