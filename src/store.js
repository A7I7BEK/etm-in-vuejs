import Vue from 'vue';
import Vuex from 'vuex';
import { BACKGROUND_IMAGE, DEFAULT_URL } from './constants';


Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		loader: false,
		url: DEFAULT_URL,
		backgroundImg: BACKGROUND_IMAGE,
		refreshTokenIntervalId: 0,
		userProfile: null,
		systemAdmin: false,
		permissionList: [],
		projectData: null,
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
		createTaskColumnId: 0,
		taskModalActionStarter: 0,
		rightMenuActionStarter: 0,
		metaData: {
			title: 'Test title',
			description: 'Test description',
			keywords: 'Test keyword',
			image: 'https://etm.crm24.uz/img/favicon_alert.png',
		},
		notificationAlert: false,
	},
	mutations: {
		setProjectSelectionList(state, data) {
			state.projectSelectionList = data;
		},
	}
});