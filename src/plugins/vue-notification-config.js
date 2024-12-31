import Vue from 'vue';
import Notifications from 'vue-notification';
import i18n from '../plugins/vue-i18n-config';


Vue.use(Notifications);


const notification = {
	error(text, title = i18n.t('notification.error'))
	{
		Vue.notify({
			group: 'simple',
			type: 'error',
			title: title,
			text: text,
			// duration: -1,
		});
	},
	warn(text, title = i18n.t('notification.warning'))
	{
		Vue.notify({
			group: 'simple',
			type: 'warn',
			title: title,
			text: text,
			// duration: -1,
		});
	},
	success(text, title = i18n.t('notification.success'))
	{
		Vue.notify({
			group: 'simple',
			type: 'success',
			title: title,
			text: text,
			// duration: -1,
		});
	}
};

Vue.prototype.$notification = notification;



export default notification;