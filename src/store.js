import Vue from 'vue';
import Vuex from 'vuex';
import { URL_IMG } from './defaults';


Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		PROJECT_TYPE_TRELLO: 'TRELLO',
		PROJECT_TYPE_KANBAN: 'KANBAN',
		TASK_COMMENT_TYPE_CODE: 'TASK_COMMENT_TYPE',
		TASK_PRIORITY_TYPE_CODE: 'TASK_PRIORITY_TYPE',
		TASK_LEVEL_TYPE_CODE: 'TASK_LEVEL_TYPE',
		TASK_LEVEL_TYPE: {
			HIGH: 'HIGH_LEVEL',
			NORMAL: 'NORMAL_LEVEL',
			LOW: 'LOW_LEVEL',
		},
		TASK_PRIORITY_TYPE: {
			HIGH: 'HIGH_PRIORITY',
			NORMAL: 'NORMAL_PRIORITY',
			LOW: 'LOW_PRIORITY',
		},
		TASK_STATUS_TYPE: {
			RED: 'RED',
			GREEN: 'GREEN',
			YELLOW: 'YELLOW',
			BLUE: 'BLUE',
		},
		TASK_COMMENT_TYPE: {
			INFORMATION: 'INFORMATION',
			PROBLEM: 'PROBLEM',
			SOLUTION: 'SOLUTION',
		},
		TASK_TIMER: {
			START: 'START',
			STOP: 'STOP',
		},
		loader: false,
		url: URL_IMG,
		refreshTokenIntervalId: 0,
		userProfile: {},
		permissionList: [],
		projectData: null,
		projectDataIsFiltered: false,
		dashboardFilter: {
			search: '',
			selectedTag: [],
			selectedMember: [],
			selectedStatus: [],
			selectedPriority: [],
			selectedLevel: [],
		},
		taskModalId: 0,
		taskModalData: null,
		projectSelectionList: [],
		createModalTaskId: 0,
		taskModalActionStarter: 0,
		colorList: [
			'#7d97c7',
			'#333c40',
			'#ae2b41',
			'#916dd5',
			'#ffba5a',
			'#4acb8b',
			'#fa163f',
			'#12cad6',
			'#7e0cf5',
			'#f45905',
			'#0c9463',
			'#1089ff',
		],
		socket: {
			notification: null,
			online: null,
			task: null,
			column: null,
			action: null,
		},
		rightMenuActionStarter: 0,
		metaData: {
			title: 'Test title',
			description: 'Test description',
			keywords: 'Test keyword',
			image: 'https://etm.crm24.uz/img/favicon_alert.png',
		},
		faviconSimple: '/img/favicon.png',
		faviconAlert: '/img/favicon_alert.png',
		notificationAlert: false,
	},
	mutations: {
		setModalTaskPriorityType(state, data) {
			state.taskModalData = { ...state.taskModalData, 'taskPriorityType': data };
		},
		setModalTaskLevelType(state, data) {
			state.taskModalData = { ...state.taskModalData, 'taskLevelType': data };
		},
		setProjectSelectionList(state, data) {
			state.projectSelectionList = data;
		},

		setSocketNotification(state, data) {
			state.socket.notification = data;
		},
		setSocketOnline(state, data) {
			state.socket.online = data;
		},
		setSocketTask(state, data) {
			state.socket.task = data;
		},
		setSocketColumn(state, data) {
			state.socket.column = data;
		},
		setSocketAction(state, data) {
			state.socket.action = data;
		},
	}
});