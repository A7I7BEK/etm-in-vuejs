import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import store from "../store";



let stompClient = null;

export function Connect(url, token) {
	const socket = new SockJS(url + '/ws?access_token=' + token);
	stompClient = Stomp.over(socket);

	stompClient.connect({}, frame => {
		console.log('Connection:', frame);

		SubscribeNotification();
		SubscribeOnline();
		SubscribeTask();
		SubscribeColumn();
		SubscribeAction();
	});
}
export function Disconnect() {
	stompClient.disconnect();
}




function SubscribeNotification() {
	stompClient.subscribe('/user/queue/reply', message => {
		console.log('/user/queue/reply', JSON.parse(message.body));

		store.commit('setSocketNotification', JSON.parse(message.body));
	});
}
function SubscribeOnline() {
	stompClient.subscribe('/topic/public', message => {
		console.log('/topic/public', JSON.parse(message.body));

		store.commit('setSocketOnline', JSON.parse(message.body));
	});
}
function SubscribeTask() {
	stompClient.subscribe('/user/task/reply', message => {
		console.log('/user/task/reply', JSON.parse(message.body));

		store.commit('setSocketTask', JSON.parse(message.body));
	});
}
function SubscribeColumn() {
	stompClient.subscribe('/user/column/reply', message => {
		console.log('/user/column/reply', JSON.parse(message.body));

		store.commit('setSocketColumn', JSON.parse(message.body));
	});
}
function SubscribeAction() {
	stompClient.subscribe('/user/action/reply', message => {
		console.log('/user/action/reply', JSON.parse(message.body));

		store.commit('setSocketAction', JSON.parse(message.body));
	});
}



export default {
	Connect,
	Disconnect,
};