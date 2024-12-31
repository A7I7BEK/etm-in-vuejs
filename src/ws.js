import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'


let stompClient = null;

const connection = function connect() {
	const socket = new SockJS('http://192.168.45.247:9080/ws?access_token=1e75187a-0b6d-4867-894e-8482b96db505');
	stompClient = Stomp.over(socket);

	stompClient.connect({}, frame => {
		console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', frame);

		stompClient.subscribe('/user/queue/reply', message => {
			console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', message);
		});
	})
};


export function sendMessage(message) {
	stompClient.send("/app/changeMessage", {}, JSON.stringify(message))
}


export default connection;
