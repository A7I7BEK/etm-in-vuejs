import Vue from 'vue';
import Vuex from 'vuex';
import { API_URL, DOMAIN_URL, META_DATA } from './constants';


Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		loader: false,
		url: API_URL,
		domainUrl: DOMAIN_URL,
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
			title: META_DATA.title,
			description: META_DATA.description,
			keywords: META_DATA.keywords,
			image: META_DATA.image,
		},
		notificationAlert: false,
	},
	mutations: {
		setProjectSelectionList(state, data) {
			state.projectSelectionList = data;
		},
	}
});