import { io } from 'socket.io-client';


export class SocketService
{
	constructor ({ url, path, token, roomId })
	{
		this.url = url;
		this.path = path;

		this.socket = io(url, {
			path,
			query: {
				roomId,
			},
			auth: {
				token,
			},
			forceNew: true,
			autoConnect: false,
		});
	}


	connect()
	{
		this.socket.connect();
	}


	disconnect()
	{
		this.socket.disconnect();
		this.socket.off();
	}


	enableMonitoring()
	{
		this.socket.on('connect', () =>
		{
			console.log(`{${this.url + this.path}} [connect] Socket Id: ${this.socket.id}`);

			const engine = this.socket.io.engine;
			console.log(`{${this.url + this.path}} [connect] Engine Transport: ${engine.transport.name}`);
			// in most cases, prints "polling"

			engine.once('upgrade', () =>
			{
				/**
				 * called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
				 */

				console.log(`{${this.url + this.path}} [connect] Engine Transport (upgraded): ${engine.transport.name}`);
				// in most cases, prints "websocket"
			});
		});

		this.socket.on('connect_error', (error) =>
		{
			if (this.socket.active)
			{
				/**
				 * temporary failure, the socket will automatically try to reconnect
				 */

				console.log(`{${this.url + this.path}} [connect_error] temporary...`);
			}
			else
			{
				/**
				 * the connection was denied by the server
				 * in that case, `socket.connect()` must be manually called in order to reconnect
				 */

				console.log(`{${this.url + this.path}} [connect_error] Error Message: ${error.message}`);
			}
		});

		this.socket.on('disconnect', (reason) =>
		{
			if (this.socket.active)
			{
				/**
				 * temporary disconnection, the socket will automatically try to reconnect
				 */

				console.log(`{${this.url + this.path}} [disconnect] temporary...`);
			}
			else
			{
				/**
				 * the connection was forcefully closed by the server or the client itself
				 * in that case, `socket.connect()` must be manually called in order to reconnect
				 */

				console.log(`{${this.url + this.path}} [disconnect] Reason: ${reason}`);
			}
		});
	}
}
