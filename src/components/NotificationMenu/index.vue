<script>
	import BaseRightMenu from '../BaseRightMenu';
	import ActionItem from '../../views/Dashboard/components/ActionItem.vue';
	import { SocketService } from '../../services/SocketService';
	import { token } from '../../services/TokenService';
	import { ORDER } from '../../constants';



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
					pageSize: 10,
					totalCount: 0,
				},
				socketNotif: new SocketService({
					url: this.$store.state.url,
					path: '/ws-notifications',
					token: token.Get(),
				}),
			};
		},
		created()
		{
			this.GetNotificationList();
			this.ListenSocketNotification();
			this.socketNotif.connect();
			this.socketNotif.enableMonitoring();
		},
		beforeDestroy()
		{
			this.socketNotif.disconnect();
			this.notificationList = [];
			this.AlarmSwitcher();
		},
		methods: {
			GetNotificationList(step = 0)
			{
				this.paramsNotification.pageSize += step;

				this.$api
					.get('notifications', {
						params: {
							page: 0,
							pageSize: this.paramsNotification.pageSize,
							sortBy: 'id',
							sortDirection: ORDER.DESC,
						}
					})
					.then(response => {
						this.notificationList = response.data.data;
						this.paramsNotification.totalCount = response.data.totalCount;
						this.AlarmSwitcher();
					});
			},
			ListenSocketNotification()
			{
				this.socketNotif.socket.on('notif-insert', (data) => {
					this.notificationList.unshift(data);
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