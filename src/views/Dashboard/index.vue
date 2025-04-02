<script>
import { ORDER } from '../../constants';
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
			socketColumn: new SocketService({
				url: this.$store.state.url,
				path: '/ws-project-columns',
				token: accessTokenGet(),
				roomId: this.$route.params.id,
			}),
			socketTask: new SocketService({
				url: this.$store.state.url,
				path: '/ws-tasks',
				token: accessTokenGet(),
				roomId: this.$route.params.id,
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
			let tempMembers = {
				list: [],
				remainder: 0,
			};
			let memberList = this.$store.state.projectData.members;

			tempMembers.list = memberList.slice(0, 4);
			tempMembers.remainder = memberList.length > 4 ? memberList.length - 4 : 0;
			return tempMembers;
		},
		computedBackground() {
			let style = '', background = this.$store.state.projectData.background;

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
		'$route.params.id'(newVal, oldVal) {
			if (+newVal !== +oldVal) {
				this.GetAll();
			}
		},
		'$store.state.socket.online'(val) {
			clearTimeout(this.socketTimerId);

			this.socketTimerId = setTimeout(() => {
				let member = this.$store.state.projectData.members.find(x => x.employee.user.id === val.userId);
				if (member) {
					this.$set(member.employee.user, 'isOnline', val.isOnline);
					this.$set(member.employee.user, 'lastOnlineAt', val.lastOnlineAt);
				}
			}, 2000);
		},
	},
	created() {
		this.GetAll();
		this.ListenSocketColumn();
		this.ListenSocketTask();
	},
	beforeDestroy() {
		this.socketColumn.disconnect();
		this.socketTask.disconnect();
		this.$store.state.projectData = null;
	},
	methods: {
		GetAll() {
			this.$store.state.loader = true;

			this.$api
				.get('/projects/' + this.$route.params.id + '/details')
				.then(response => {
					this.$store.state.projectData = response.data.data;
					this.$store.state.metaData.title = this.$route.meta.title(response.data.data.name);

					this.socketColumn.connect();
					this.socketColumn.enableMonitoring();

					this.socketTask.connect();
					this.socketTask.enableMonitoring();
				})
				.finally(() => {
					setTimeout(() => {
						this.$store.state.loader = false;
					}, 1000);
				});
		},
		GetEmployeeAll() {
			this.$api
				.get('/project-members', {
					params: {
						'projectId': this.$route.params.id,
						'sortBy': 'id',
						'sortDirection': ORDER.DESC,
					}
				})
				.then(response => {
					this.$store.state.projectData.members = response.data.data;
				});
		},
		AddEmployeeList() {
			let selectedList = this.employeeList.filter(item => item.checked);
			let userIdList = selectedList.map(item => ({ id: item.id }));

			this.$api
				.post('/project-members', {
					'projectId': this.$store.state.projectData.id,
					'userIds': userIdList,
				})
				.then(response => {
					this.GetEmployeeAll();
					this.employeeSearch = null;
					this.employeeList = null;
				});
		},
		DeleteMember(id) {
			if (confirm(this.$t('confirmDelete'))) {
				this.$api
					.delete('/project-members/' + id)
					.then(response => {
						this.GetEmployeeAll();
						this.$notification.success(this.$t('successfullyDeleted'));
					});
			}
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
		ReorderArray(array) {
			array.forEach((item, index) => {
				item.ordering = index;
			});
		},



		FilterTasks() {
			let projectDataCopy = JSON.parse(JSON.stringify(this.$store.state.projectData));

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
						tagFound = !!selectedTag.find(id => item.tagList.find(x => x.projectTagId === id));
					}
					if (selectedMember.length > 0) {
						memberFound = !!selectedMember.find(id => item.members.find(x => x.employee.id === id));
					}
					if (selectedStatus.length > 0) {
						statusFound = !!selectedStatus.find(x => x === item.status);
					}
					if (selectedPriority.length > 0) {
						priorityFound = false;
						if (item.taskPriorityType) {
							priorityFound = !!selectedPriority.find(x => x === item.taskPriorityType.id);
						}
					}
					if (selectedLevel.length > 0) {
						levelFound = false;
						if (item.taskLevelType) {
							levelFound = !!selectedLevel.find(x => x === item.taskLevelType.id);
						}
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