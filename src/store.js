import Vue from 'vue';
import Vuex from 'vuex';
import {
	DEFAULT_IMG_URL,
} from './constants';


Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		loader: false,
		url: DEFAULT_IMG_URL,
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