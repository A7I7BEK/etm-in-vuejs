<script>
import imgFaviconSimple from '../../assets/img/favicon.png';
import imgFaviconAlert from '../../assets/img/favicon_alert.png';
import { API_URL, ORDER } from '../../constants';
import { SocketService } from '../../services/SocketService';
import { accessTokenGet } from '../../services/TokenService';
import BaseRightMenu from '../BaseRightMenu';
import BaseNotificationAction from './parts/base-notification.action.vue';


const SORT_PROP = {
	ID: 'id',
	TYPE: 'type',
	SEEN_AT: 'seenAt',
	ACTION: 'action',
	USER: 'user',
};


export default {
	name: 'NotificationMenu',
	components: {
		BaseRightMenu,
		BaseNotificationAction,
	},
	data() {
		return {
			notif: {
				list: [],
				totalItems: 0,
				params: {
					page: 1,
					pageSize: 10,
					sortBy: SORT_PROP.ID,
					sortDirection: ORDER.DESC,
				},
			},
			socketNotif: new SocketService({
				url: API_URL,
				path: '/ws-notifications',
				token: accessTokenGet(),
			}),
		};
	},
	async created() {
		await this.GetNotificationList();
		this.ListenSocketNotification();
		this.socketNotif.connect();
	},
	beforeDestroy() {
		this.socketNotif.disconnect();
		this.notif.list = [];
		this.AlarmSwitcher();
	},
	methods: {
		async GetNotificationList() {
			const { data: { data, meta } } = await this.$api.get('/notifications', {
				params: this.notif.params,
			});

			this.notif.list = data;
			this.notif.totalItems = meta.totalItems;
			this.AlarmSwitcher();
		},
		async GetNotificationMore(size) {
			this.notif.params.pageSize += size;
			await this.GetNotificationList();
		},
		ListenSocketNotification() {
			this.socketNotif.socket.on('notif-insert', (data) => {
				this.notif.list.unshift(data);
				this.AlarmSwitcher();
			});
		},
		async GoToNotification(item) {
			await this.$api.post('/notifications/seen', {
				allNotification: false,
				notificationId: item.id,
			});

			this.$set(item, 'seenAt', true);
			this.AlarmSwitcher();

			if (this.$route.name === 'dashboard') {
				this.$store.state.taskModalId = item.action.task.id;
			}

			try {
				await this.$router.push({
					name: 'dashboard',
					params: {
						id: item.action.project.id,
						taskId: item.action.task.id,
					}
				});
			} catch (error) {
				console.log(error.name);
			}
		},
		async MarkAllAsRead() {
			this.$refs.markAll.click();

			await this.$api.post('/notifications/seen', {
				allNotification: true,
				notificationId: 999,
			});

			await this.GetNotificationList();
		},
		async DeleteAll() {
			this.$refs.markAll.click();

			await this.$api.delete('/notifications/clear', {
				data: {
					allNotification: true,
					notificationId: 999,
				}
			});

			await this.GetNotificationList();
		},
		AlarmSwitcher() {
			let status = this.notif.list.some(x => !x.seenAt);
			this.$store.state.notificationAlert = status;
			document.getElementById('favicon').href = status ? imgFaviconAlert : imgFaviconSimple;
		},
	}
};
</script>

<template src="./template.html"></template>