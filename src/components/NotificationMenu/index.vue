<script>
import { FAVICON_ALERT, FAVICON_SIMPLE, ORDER } from '../../constants';
import { SocketService } from '../../services/SocketService';
import { token } from '../../services/TokenService';
import ActionItem from '../../views/Dashboard/components/ActionItem.vue';
import BaseRightMenu from '../BaseRightMenu';



export default {
	name: 'NotificationMenu',
	components: {
		BaseRightMenu,
		ActionItem,
	},
	data() {
		return {
			notif: {
				list: [],
				totalItems: 0,
				params: {
					page: 1,
					pageSize: 10,
					sortBy: 'id',
					sortDirection: ORDER.DESC,
				},
			},
			socketNotif: new SocketService({
				url: this.$store.state.url,
				path: '/ws-notifications',
				token: token.Get(),
			}),
		};
	},
	created() {
		this.GetNotificationList();
		this.ListenSocketNotification();
		this.socketNotif.connect();
		this.socketNotif.enableMonitoring();
	},
	beforeDestroy() {
		this.socketNotif.disconnect();
		this.notif.list = [];
		this.AlarmSwitcher();
	},
	methods: {
		GetNotificationList() {
			this.$api
				.get('notifications', {
					params: this.notif.params,
				})
				.then(response => {
					this.notif.list = response.data.data;
					this.notif.totalItems = response.data.meta.totalItems;
					this.AlarmSwitcher();
				});
		},
		GetNotificationMore(size) {
			this.notif.params.pageSize += size;
			this.GetNotificationList();
		},
		ListenSocketNotification() {
			this.socketNotif.socket.on('notif-insert', (data) => {
				this.notif.list.unshift(data);
				this.AlarmSwitcher();
			});
		},
		GoToNotification(item) {
			this.$api
				.post('notifications/seen', {
					allNotification: false,
					notificationId: item.id,
				})
				.then(response => {
					this.$set(item, 'seenAt', true);
					this.AlarmSwitcher();
				});


			if (this.$route.name === 'dashboard') {
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
		MarkAllAsRead() {
			this.$refs.markAll.click();

			this.$api
				.post('notifications/seen', {
					allNotification: true,
					notificationId: 999,
				})
				.then(response => {
					this.GetNotificationList();
				});
		},
		DeleteAll() {
			this.$refs.markAll.click();

			this.$api
				.post('notifications/clear', {
					allNotification: true,
					notificationId: 999,
				})
				.then(response => {
					this.GetNotificationList();
				});
		},
		AlarmSwitcher() {
			let status = this.notif.list.some(x => !x.seenAt);
			this.$store.state.notificationAlert = status;
			document.getElementById('favicon').href = status ? FAVICON_ALERT : FAVICON_SIMPLE;
		},
	}
};
</script>

<template src="./template.html"></template>