<script>
	import BaseRightMenu from '../BaseRightMenu';
	import ActionItem from '../../views/Dashboard/components/ActionItem.vue';


	export default {
		name: 'NotificationMenu',
		components: {
			BaseRightMenu,
			ActionItem,
		},
		data()
		{
			return {
				notificationList: [],
				paramsNotification: {
					perPage: 10,
					totalCount: 0,
				},
			};
		},
		watch: {
			'$store.state.socket.notification': {
				handler(val)
				{
					if (val)
					{
						this.notificationList.unshift(JSON.parse(JSON.stringify(val)));
						this.AlarmSwitcher();
					}
				},
				immediate: true
			},
		},
		created()
		{
			this.GetNotificationList();
		},
		beforeDestroy()
		{
			this.notificationList = [];
			this.AlarmSwitcher();
		},
		methods: {
			GetNotificationList(step = 0)
			{
				this.paramsNotification.perPage += step;

				this.$api
					.get('notifications', {
						params: {
							page: 0,
							perPage: this.paramsNotification.perPage,
							sortBy: 'id',
							sortDirection: 'desc',
						}
					})
					.then(response => {
						this.notificationList = response.data.data;
						this.paramsNotification.totalCount = response.data.totalCount;
						this.AlarmSwitcher();
					});
			},
			GoToNotification(item)
			{
				this.$api
					.post('notifications/seen', {
						'allNotification': false,
						'notificationId': item.id,
					})
					.then(response => {
						this.$set(item, 'seenAt', true);
						this.AlarmSwitcher();
					});


				if (this.$route.name === 'dashboard')
				{
					this.$store.state.taskModalId = item.taskId;
				}


				this.$router.push({
					name: 'dashboard',
					params: {
						id: item.projectId,
						taskId: item.taskId,
					}
				}).catch(err => {
					console.log(err.name);
				});
			},
			MarkAllAsRead()
			{
				this.$refs.markAll.click();

				this.$api
					.post('notifications/seen', {
						'allNotification': true,
					})
					.then(response => {
						this.GetNotificationList();
					});
			},
			AlarmSwitcher()
			{
				let status = this.notificationList.some(x => !x.seenAt);
				this.$store.state.notificationAlert = status;
				document.getElementById('favicon').href = status ? this.$store.state.faviconAlert : this.$store.state.faviconSimple;
			},
		}
	};
</script>

<template src="./template.html"></template>