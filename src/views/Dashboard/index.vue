<script>
	import DashboardTypeBoard from './components/DashboardType/Board/index';
	import DashboardTypeList from './components/DashboardType/List/index';
	import CreateModalColumn from './components/CreateModalColumn';
	import CreateModalTask from './components/CreateModalTask';
	import SidebarMenu from '../../layouts/components/SidebarMenu';
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
		data()
		{
			return {
				projectDataFiltered: null,
				projectDataFilteredTaskCount: 0,

				employeeSearch: null,
				employeeList: null,
				employeeListTimerId: 0,

				dashboardTypeList: ['board', 'list'],
				dashboardTypeSelected: 'board',

				socketTimerId: 0,
			};
		},
		computed: {
			computedMembers()
			{
				let tempMembers = {
					list: [],
					remainder: 0,
				};
				let memberList = this.$store.state.projectData.members;

				tempMembers.list = memberList.slice(0, 4);
				tempMembers.remainder = memberList.length > 4 ? memberList.length - 4 : 0;
				return tempMembers;
			},
			computedBackground()
			{
				let style = '', background = this.$store.state.projectData.background;

				if (background.charAt(0) === '#')
				{
					style = 'background-color:' + background;
				}
				else
				{
					style = 'background-image: url(' + this.$store.state.url + background + ')';
				}
				return style;
			},
		},
		watch: {
			'employeeSearch'(val)
			{
				this.employeeList = null;

				clearTimeout(this.employeeListTimerId);
				if (val && val.trim() !== '')
				{
					this.employeeListTimerId = setTimeout(() => {
						this.$api
							.get('employees', {
								params: {
									'allSearch': val,
									'withPhoto': true,
								}
							})
							.then(response => {

								this.employeeList = response.data.data.filter(item => {
									if (this.$store.state.projectData.members.findIndex(x => x.employee.id === item.id) < 0)
									{
										item.checked = false;
										return true;
									}
									return false;
								});

							});
					}, 500);
				}
			},


			'$store.state.dashboardFilter': {
				handler()
				{
					this.FilterTasks();
				},
				deep: true
			},
			'$store.state.projectData': {
				handler()
				{
					this.FilterTasks();
				},
				deep: true
			},
			'$route.params.id'(newVal, oldVal)
			{
				if (+newVal !== +oldVal)
				{
					this.GetAll();
				}
			},
			'$store.state.socket.online'(val)
			{
				clearTimeout(this.socketTimerId);

				this.socketTimerId = setTimeout(() => {
					let member = this.$store.state.projectData.members.find(x => x.employee.userName === val.userName);
					if (member)
					{
						this.$set(member, 'isOnline', val.isOnline);
						this.$set(member.employee, 'lastSeenTime', val.lastSeenTime);
					}
				}, 2000);
			},
			'$store.state.socket.task'(val)
			{

				let socketValue = JSON.parse(JSON.stringify(val));


				let columnLast = this.$store.state.projectData.columns.find(x => x.id === socketValue.lastColumnId);
				let taskLastIndex = -1;
				if (columnLast)
				{
					taskLastIndex = columnLast.tasks.findIndex(x => x.id === socketValue.id);
				}


				if (this.$store.state.projectData.id === socketValue.projectId && socketValue.eventType === 'PROJECT_TAG_EVENT')
				{
					socketValue.taskList.forEach(item => {
						let taskTemp = this.$store.state.projectData.columns.find(x => x.id === item.columnId).tasks.find(x => x.id === item.id);

						this.$set(taskTemp, 'tagList', item.tagList);
					});
				}
				else if (this.$store.state.projectData.id === socketValue.projectId)
				{
					let columnCurrent = this.$store.state.projectData.columns.find(x => x.id === socketValue.columnId);
					let taskCurrent = columnCurrent.tasks.find(x => x.id === socketValue.id);
					let taskCurrentIndex = columnCurrent.tasks.findIndex(x => x.id === socketValue.id);


					switch (socketValue.eventType)
					{

						case 'TASK_CREATE_EVENT':
							columnCurrent.tasks.splice(socketValue.ordering, 0, socketValue);
							this.ReorderArray(columnCurrent.tasks);
							break;


						case 'TASK_UPDATE_EVENT':
							this.$set(columnCurrent.tasks, taskCurrentIndex, socketValue);
							break;


						case 'TASK_DELETE_EVENT':
							columnCurrent.tasks.splice(taskCurrentIndex, 1);
							this.ReorderArray(columnCurrent.tasks);
							break;


						case 'TASK_MEMBER_EVENT':
							this.$set(taskCurrent, 'members', socketValue.members);
							break;


						case 'TASK_TAG_EVENT':
							this.$set(taskCurrent, 'tagList', socketValue.tagList);
							break;


						case 'TASK_CHECK_LIST_EVENT':
							this.$set(taskCurrent, 'checkListCount', socketValue.checkListCount);
							break;


						case 'TASK_COMMENT_EVENT':
							this.$set(taskCurrent, 'lastCommentType', socketValue.lastCommentType);
							this.$set(taskCurrent, 'commentCount', socketValue.commentCount);
							break;


						case 'TASK_ESTIMATE_EVENT':
						case 'TASK_ESTIMATE_DELETE_EVENT':
							this.$set(taskCurrent, 'startDate', socketValue.startDate);
							this.$set(taskCurrent, 'deadLine', socketValue.deadLine);
							this.$set(taskCurrent, 'status', socketValue.status);
							break;


						case 'TASK_MOVED_EVENT':
							if (taskCurrentIndex === socketValue.ordering)
							{
								return;
							}


							// Copy
							let taskCopy = JSON.parse(JSON.stringify(columnLast.tasks[taskLastIndex]));

							// Delete
							columnLast.tasks.splice(taskLastIndex, 1);

							// Update
							taskCopy.columnId = socketValue.columnId;

							// Add
							columnCurrent.tasks.splice(socketValue.ordering, 0, taskCopy);

							// Reorder
							this.ReorderArray(columnLast.tasks);
							if (socketValue.lastColumnId !== socketValue.columnId)
							{
								this.ReorderArray(columnCurrent.tasks);
							}

							break;
					}
				}
				else if (columnLast)
				{
					columnLast.tasks.splice(taskLastIndex, 1);
					this.ReorderArray(columnLast.tasks);
				}
			},
			'$store.state.socket.column'(val)
			{
				if (this.$store.state.projectData.id === val.projectId)
				{
					let socketValue = JSON.parse(JSON.stringify(val));

					let columnList = this.$store.state.projectData.columns;
					let index = columnList.findIndex(x => x.id === socketValue.id);


					switch (socketValue.eventType)
					{

						case 'PROJECT_COLUMN_CREATE_EVENT':
							columnList.push(socketValue);
							break;


						case 'PROJECT_COLUMN_UPDATE_EVENT':
							this.$set(columnList[index], 'name', socketValue.name);
							this.$set(columnList[index], 'codeName', socketValue.codeName);
							break;


						case 'PROJECT_COLUMN_DELETE_EVENT':
							columnList.splice(index, 1);
							this.ReorderArray(columnList);
							break;


						case 'PROJECT_COLUMN_MOVE_EVENT':
							if (index === socketValue.ordering)
							{
								return;
							}


							let columnCopy = JSON.parse(JSON.stringify(columnList[index]));

							columnList.splice(index, 1);
							columnList.splice(socketValue.ordering, 0, columnCopy);

							this.ReorderArray(columnList);

							break;
					}
				}
			},
		},
		created()
		{
			this.GetAll();
		},
		destroyed()
		{
			this.$store.state.projectData = null;
		},
		methods: {
			GetAll()
			{
				this.$store.state.loader = true;

				this.$api
					.get('projects/' + this.$route.params.id + '/details')
					.then(response => {
						this.$store.state.projectData = response.data.data;
						this.$store.state.metaData.title = this.$route.meta.title(response.data.data.name);
					})
					.finally(() => {
						setTimeout(() => {
							this.$store.state.loader = false;
						}, 1000);
					});
			},
			ReorderArray(array)
			{
				array.forEach((item, index) => {
					item.ordering = index;
				});
			},
			GetEmployeeAll()
			{
				this.$api
					.get('projectMembers', {
						params: {
							'projectId': this.$route.params.id,
							'sortBy': 'id',
							'sortDirection': 'desc',
						}
					})
					.then(response => {
						this.$store.state.projectData.members = response.data.data;
					});
			},
			AddEmployeeList()
			{
				let selectedList = this.employeeList.filter(item => item.checked);
				let userIdList = selectedList.map(item => ({ id: item.id }));

				this.$api
					.post('projectMembers', {
						'projectId': this.$store.state.projectData.id,
						'userIds': userIdList,
					})
					.then(response => {
						this.GetEmployeeAll();
						this.employeeSearch = null;
						this.employeeList = null;
					});
			},
			DeleteMember(id)
			{
				if (confirm(this.$t('confirmDelete')))
				{
					this.$api
						.delete('projectMembers/' + id)
						.then(response => {
							this.GetEmployeeAll();
							this.$notification.success(this.$t('successfullyDeleted'));
						});
				}
			},



			FilterTasks()
			{
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


						if (selectedTag.length > 0)
						{
							tagFound = !!selectedTag.find(id => item.tagList.find(x => x.projectTagId === id));
						}
						if (selectedMember.length > 0)
						{
							memberFound = !!selectedMember.find(id => item.members.find(x => x.employee.id === id));
						}
						if (selectedStatus.length > 0)
						{
							statusFound = !!selectedStatus.find(x => x === item.status);
						}
						if (selectedPriority.length > 0)
						{
							priorityFound = false;
							if (item.taskPriorityType)
							{
								priorityFound = !!selectedPriority.find(x => x === item.taskPriorityType.id);
							}
						}
						if (selectedLevel.length > 0)
						{
							levelFound = false;
							if (item.taskLevelType)
							{
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
			ResetFilter()
			{
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