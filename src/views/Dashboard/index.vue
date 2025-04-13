<script>
import { DEFAULT_URL, ORDER, PERMISSION_TYPE } from '../../constants';
import SidebarMenu from '../../layouts/components/SidebarMenu';
import { SocketService } from '../../services/SocketService';
import { accessTokenGet } from '../../services/TokenService';
import CreateModalColumn from './components/CreateModalColumn';
import CreateModalTask from './components/CreateModalTask';
import DashboardTypeBoard from './components/DashboardType/Board/index';
import DashboardTypeList from './components/DashboardType/List/index';
import RightMenu from './components/RightMenu/index';
import TaskModal from './components/TaskModal/index';



export default {
	name: 'Dashboard',
	components: {
		DashboardTypeBoard,
		DashboardTypeList,
		CreateModalColumn,
		CreateModalTask,
		SidebarMenu,
		RightMenu,
		TaskModal,
	},
	data() {
		return {
			PERMISSION_TYPE,
			socketColumn: new SocketService({
				url: DEFAULT_URL,
				path: '/ws-project-columns',
				token: accessTokenGet(),
				roomId: this.$route.params.id,
			}),
			socketTask: new SocketService({
				url: DEFAULT_URL,
				path: '/ws-tasks',
				token: accessTokenGet(),
				roomId: this.$route.params.id,
			}),
			socketActive: new SocketService({
				url: DEFAULT_URL,
				path: '/ws-active-users',
				token: accessTokenGet(),
			}),

			projectDataFiltered: null,
			projectDataFilteredTaskCount: 0,

			employeeSearch: null,
			employeeList: null,
			employeeListTimerId: 0,

			dashboardTypeList: [ 'board', 'list' ],
			dashboardTypeSelected: 'board',

			socketTimerId: 0,
		};
	},
	computed: {
		computedMembers() {
			const tempMembers = {
				list: [],
				remainder: 0,
			};
			const memberList = structuredClone(this.$store.state.projectData.members);

			tempMembers.list = memberList.slice(0, 4);
			tempMembers.remainder = memberList.length > 4 ? memberList.length - 4 : 0;
			return tempMembers;
		},
		computedBackground() {
			let style = '', background = this.$store.state.projectData.background;

			if (!background) {
				return style;
			}

			if (background.charAt(0) === '#') {
				style = 'background-color:' + background;
			}
			else {
				style = 'background-image: url(' + this.$store.state.url + background + ')';
			}

			return style;
		},
	},
	watch: {
		'employeeSearch'(val) {
			this.employeeList = null;

			clearTimeout(this.employeeListTimerId);
			if (val && val.trim()) {
				this.employeeListTimerId = setTimeout(() => {
					const members = this.$store.state.projectData.members;

					this.$api
						.get('/employees', {
							params: {
								allSearch: val,
							}
						})
						.then(response => {
							const newEmployees = response.data.data.
								filter(emp => !members.some(memb => emp.id === memb.employee.id));

							this.employeeList = newEmployees.map(item => ({ ...item, 'checked': false }));
						});
				}, 500);
			}
		},


		'$store.state.dashboardFilter': {
			handler() {
				this.FilterTasks();
			},
			deep: true
		},
		'$store.state.projectData': {
			handler() {
				this.FilterTasks();
			},
			deep: true
		},
		async '$route.params.id'(newVal, oldVal) {
			if (+newVal !== +oldVal) {
				this.socketColumn.disconnect();
				this.socketTask.disconnect();

				this.socketColumn.roomId = newVal;
				this.socketTask.roomId = newVal;

				this.socketColumn.setup();
				this.socketTask.setup();

				await this.start();
			}
		},
	},
	async created() {
		await this.start();

		this.ListenSocketActive();
		this.socketActive.connect();
	},
	beforeDestroy() {
		this.socketColumn.disconnect();
		this.socketTask.disconnect();
		this.socketActive.disconnect();
		this.$store.state.projectData = null;
	},
	methods: {
		async start() {
			await this.GetAll();

			this.ListenSocketColumn();
			this.ListenSocketTask();

			this.socketColumn.connect();
			this.socketTask.connect();
		},
		async GetAll() {
			this.$store.state.loader = true;

			const resp = await this.$api.get('/projects/' + this.$route.params.id + '/details');
			this.$store.state.projectData = resp.data.data;
			this.$store.state.metaData.title = this.$route.meta.title(resp.data.data.name);

			setTimeout(() => {
				this.$store.state.loader = false;
			}, 500);
		},
		async GetEmployeeAll() {
			const resp = await this.$api.get('/project-members', {
				params: {
					sortBy: 'id',
					sortDirection: ORDER.DESC,
					projectId: this.$store.state.projectData.id,
				}
			});

			this.$store.state.projectData.members = resp.data.data;
		},
		async AddEmployeeList() {
			const selectedList = this.employeeList.filter(item => item.checked);
			const userIdList = selectedList.map(item => item.id);

			await this.$api.post('/project-members', {
				projectId: this.$store.state.projectData.id,
				employeeIds: userIdList,
			});
			await this.GetEmployeeAll();

			this.employeeSearch = null;
			this.employeeList = null;
		},
		async DeleteMember(id) {
			if (!confirm(this.$t('confirmDelete'))) {
				return;
			}

			await this.$api.delete('/project-members/' + id);
			await this.GetEmployeeAll();

			this.$notification.success(this.$t('successfullyDeleted'));
		},
		ListenSocketColumn() {
			this.socketColumn.socket.on('column-insert', (data) => {
				const columnList = this.$store.state.projectData.columns;
				columnList.splice(data.ordering, 0, data);
				this.ReorderArray(columnList);
			});

			this.socketColumn.socket.on('column-delete', (data) => {
				const columnList = this.$store.state.projectData.columns;
				const columnIndex = columnList.findIndex(x => x.id === data.id);
				columnList.splice(columnIndex, 1);
				this.ReorderArray(columnList);
			});

			this.socketColumn.socket.on('column-replace', (data) => {
				const columnList = this.$store.state.projectData.columns;
				Object.assign(columnList[ data.ordering ], data);
			});

			this.socketColumn.socket.on('column-reorder', (data) => {
				const columnList = this.$store.state.projectData.columns;
				const columnIndex = columnList.findIndex(x => x.id === data.id);
				const column = columnList[ columnIndex ];

				if (columnIndex === data.ordering) {
					this.ReorderArray(columnList);
					return;
				}

				columnList.splice(columnIndex, 1);
				columnList.splice(data.ordering, 0, column);
				this.ReorderArray(columnList);
			});
		},
		ListenSocketTask() {
			this.socketTask.socket.on('task-insert', (data) => {
				const column = this.$store.state.projectData.columns.find(x => x.id === data.column.id);
				column.tasks.splice(data.ordering, 0, data);
				this.ReorderArray(column.tasks);
			});

			this.socketTask.socket.on('task-delete', (data) => {
				const column = this.$store.state.projectData.columns.find(x => x.id === data.column.id);
				const taskIndex = column.tasks.findIndex(x => x.id === data.id);
				column.tasks.splice(taskIndex, 1);
				this.ReorderArray(column.tasks);
			});

			this.socketTask.socket.on('task-replace', (data) => {
				const column = this.$store.state.projectData.columns.find(x => x.id === data.column.id);
				this.$set(column.tasks, data.ordering, data);
			});

			this.socketTask.socket.on('task-reorder', (data) => {
				const column = this.$store.state.projectData.columns.find(x => x.id === data.column.id);
				const taskIndex = column.tasks.findIndex(x => x.id === data.id);
				const task = column.tasks[ taskIndex ];

				if (taskIndex === data.ordering) {
					this.ReorderArray(column.tasks);
					return;
				}

				column.tasks.splice(taskIndex, 1);
				column.tasks.splice(data.ordering, 0, task);
				this.ReorderArray(column.tasks);
			});

			this.socketTask.socket.on('task-move', (data) => {
				const oldColumn = this.$store.state.projectData.columns.find(x => x.id === data.oldColumnId);
				const newColumn = this.$store.state.projectData.columns.find(x => x.id === data.column.id);
				const taskIndex = oldColumn.tasks.findIndex(x => x.id === data.id);
				const task = oldColumn.tasks[ taskIndex ];

				if (taskIndex === -1) {
					this.ReorderArray(oldColumn.tasks);
					this.ReorderArray(newColumn.tasks);
					return;
				}

				oldColumn.tasks.splice(taskIndex, 1);
				newColumn.tasks.splice(data.ordering, 0, task);
				this.ReorderArray(oldColumn.tasks);
				this.ReorderArray(newColumn.tasks);
			});
		},
		ListenSocketActive() {
			this.socketActive.socket.on('active-user-join', (data) => {
				if (!this.$store.state.projectData) {
					return;
				}

				const memberList = this.$store.state.projectData.members;

				if (!memberList) {
					return;
				}

				clearTimeout(this.socketTimerId);
				this.socketTimerId = setTimeout(() => {
					let member = memberList.find(a => a.employee.user.id === data.userId);
					if (member) {
						this.$set(member.employee.user, 'isOnline', data.isOnline);
						this.$set(member.employee.user, 'lastOnlineAt', data.lastOnlineAt);
					}
				}, 2000);
			});
		},
		ReorderArray(array) {
			array.forEach((item, index) => {
				item.ordering = index;
			});
		},



		FilterTasks() {
			let projectDataCopy = structuredClone(this.$store.state.projectData);

			let search = this.$store.state.dashboardFilter.search;
			let selectedTag = this.$store.state.dashboardFilter.selectedTag;
			let selectedMember = this.$store.state.dashboardFilter.selectedMember;
			let selectedStatus = this.$store.state.dashboardFilter.selectedStatus;
			let selectedPriority = this.$store.state.dashboardFilter.selectedPriority;
			let selectedLevel = this.$store.state.dashboardFilter.selectedLevel;

			this.$store.state.projectDataIsFiltered =
				!!(search || selectedTag.length > 0 ||
					selectedMember.length > 0 || selectedStatus.length > 0 ||
					selectedPriority.length > 0 || selectedLevel.length > 0);


			let tempTaskCount = 0;
			projectDataCopy.columns.forEach(column => {
				column.tasks = column.tasks.filter(item => {
					let textFound = item.name.toUpperCase().includes(search.toUpperCase());
					let tagFound = true;
					let memberFound = true;
					let statusFound = true;
					let priorityFound = true;
					let levelFound = true;


					if (selectedTag.length > 0) {
						tagFound = selectedTag.some(id => item.tags.some(a => a.projectTag.id === id));
					}
					if (selectedMember.length > 0) {
						memberFound = selectedMember.some(id => item.members.some(a => a.projectMember.employee.id === id));
					}
					if (selectedStatus.length > 0) {
						statusFound = selectedStatus.some(a => a === item.status);
					}
					if (selectedPriority.length > 0) {
						priorityFound = selectedPriority.some(a => a === item.priority);
					}
					if (selectedLevel.length > 0) {
						levelFound = selectedLevel.some(a => a === item.level);
					}


					return textFound && tagFound && memberFound && statusFound && priorityFound && levelFound;
				});

				tempTaskCount += column.tasks.length;
			});


			this.projectDataFilteredTaskCount = tempTaskCount;
			this.projectDataFiltered = projectDataCopy;
		},
		ResetFilter() {
			this.$store.state.dashboardFilter.search = '';
			this.$store.state.dashboardFilter.selectedTag = [];
			this.$store.state.dashboardFilter.selectedMember = [];
			this.$store.state.dashboardFilter.selectedStatus = [];
			this.$store.state.dashboardFilter.selectedPriority = [];
			this.$store.state.dashboardFilter.selectedLevel = [];
		}
	}
};
</script>

<template src="./template.html"></template>