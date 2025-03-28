// @ts-nocheck
import Vue from 'vue';
import Router from 'vue-router';
import $i18n from './plugins/vue-i18n-config';
import { accessTokenGet } from './services/TokenService';


Vue.use(Router);


const router = new Router({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('./layouts/BaseLayout'),
			redirect: { name: 'main' },
			children: [
				{
					path: 'main',
					name: 'main',
					component: () => import('./layouts/MainLayout'),
					redirect: { name: 'mainTasks' },
					children: [
						{
							path: 'tasks',
							name: 'mainTasks',
							component: () => import('./views/Main/Tasks/index'),
							redirect: { name: 'mainTasksList' },
							children: [
								{
									path: 'index',
									name: 'mainTasksList',
									component: () => import('./views/Main/Tasks/List/index'),
									meta: {
										title() {
											return $i18n.tc('menu.task', 2) + ' | ETM';
										},
									},
								},
								{
									path: 'create',
									name: 'mainTasksCreate',
									component: () => import('./views/Main/Tasks/Create/index'),
									meta: {
										title() {
											return $i18n.t('crudCreate', {
												text: $i18n.tc('menu.task', 1).toLowerCase(),
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'update/:id',
									props: true,
									name: 'mainTasksUpdate',
									component: () => import('./views/Main/Tasks/Update/index'),
									meta: {
										title(name) {
											return $i18n.t('crudEdit', {
												table: $i18n.tc('menu.task', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'read/:id',
									props: true,
									name: 'mainTasksRead',
									component: () => import('./views/Main/Tasks/Read/index'),
									meta: {
										title(name) {
											return $i18n.t('crudRead', {
												table: $i18n.tc('menu.task', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
							]
						},
						{
							path: 'projects',
							name: 'mainProjects',
							component: () => import('./views/Main/Projects/index'),
							redirect: { name: 'mainProjectsList' },
							children: [
								{
									path: 'index',
									name: 'mainProjectsList',
									component: () => import('./views/Main/Projects/List/index'),
									meta: {
										title() {
											return $i18n.tc('menu.project', 2) + ' | ETM';
										},
									},
								},
								{
									path: 'create',
									name: 'mainProjectsCreate',
									component: () => import('./views/Main/Projects/Create/index'),
									meta: {
										title() {
											return $i18n.t('crudCreate', {
												text: $i18n.tc('menu.project', 1).toLowerCase(),
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'update/:id',
									props: true,
									name: 'mainProjectsUpdate',
									component: () => import('./views/Main/Projects/Update/index'),
									meta: {
										title(name) {
											return $i18n.t('crudEdit', {
												table: $i18n.tc('menu.project', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'read/:id',
									props: true,
									name: 'mainProjectsRead',
									component: () => import('./views/Main/Projects/Read/index'),
									meta: {
										title(name) {
											return $i18n.t('crudRead', {
												table: $i18n.tc('menu.project', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
							]
						},
						{
							path: 'teams',
							name: 'mainTeams',
							component: () => import('./views/Main/Teams/index'),
							redirect: { name: 'mainTeamsList' },
							children: [
								{
									path: 'index',
									name: 'mainTeamsList',
									component: () => import('./views/Main/Teams/List/index'),
									meta: {
										title() {
											return $i18n.tc('menu.team', 2) + ' | ETM';
										},
									},
								},
								{
									path: 'create',
									name: 'mainTeamsCreate',
									component: () => import('./views/Main/Teams/Create/index'),
									meta: {
										title() {
											return $i18n.t('crudCreate', {
												text: $i18n.tc('menu.team', 1).toLowerCase(),
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'update/:id',
									props: true,
									name: 'mainTeamsUpdate',
									component: () => import('./views/Main/Teams/Update/index'),
									meta: {
										title(name) {
											return $i18n.t('crudEdit', {
												table: $i18n.tc('menu.team', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'read/:id',
									props: true,
									name: 'mainTeamsRead',
									component: () => import('./views/Main/Teams/Read/index'),
									meta: {
										title(name) {
											return $i18n.t('crudRead', {
												table: $i18n.tc('menu.team', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
							]
						},
						{
							path: 'users',
							name: 'mainUsers',
							component: () => import('./views/Main/Users/index'),
							redirect: { name: 'mainUsersList' },
							children: [
								{
									path: 'index',
									name: 'mainUsersList',
									component: () => import('./views/Main/Users/List/index'),
									meta: {
										title() {
											return $i18n.tc('menu.user', 2) + ' | ETM';
										},
									},
								},
								{
									path: 'create',
									name: 'mainUsersCreate',
									component: () => import('./views/Main/Users/Create/index'),
									meta: {
										title() {
											return $i18n.t('crudCreate', {
												text: $i18n.tc('menu.user', 1).toLowerCase(),
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'update/:id',
									props: true,
									name: 'mainUsersUpdate',
									component: () => import('./views/Main/Users/Update/index'),
									meta: {
										title(name) {
											return $i18n.t('crudEdit', {
												table: $i18n.tc('menu.user', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'read/:id',
									props: true,
									name: 'mainUsersRead',
									component: () => import('./views/Main/Users/Read/index'),
									meta: {
										title(name) {
											return $i18n.t('crudRead', {
												table: $i18n.tc('menu.user', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'password-reset/:id',
									props: true,
									name: 'mainUsersPasswordReset',
									component: () => import('./views/Main/Users/PasswordReset/index'),
									meta: {
										title(name) {
											return $i18n.t('crudPasswordReset', {
												name: name,
											}) + ' | ETM';
										},
									},
								},
							]
						},
						{
							path: 'roles',
							name: 'mainRoles',
							component: () => import('./views/Main/Roles/index'),
							redirect: { name: 'mainRolesList' },
							children: [
								{
									path: 'index',
									name: 'mainRolesList',
									component: () => import('./views/Main/Roles/List/index'),
									meta: {
										title() {
											return $i18n.tc('menu.role', 2) + ' | ETM';
										},
									},
								},
								{
									path: 'create',
									name: 'mainRolesCreate',
									component: () => import('./views/Main/Roles/Create/index'),
									meta: {
										title() {
											return $i18n.t('crudCreate', {
												text: $i18n.tc('menu.role', 1).toLowerCase(),
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'update/:id',
									props: true,
									name: 'mainRolesUpdate',
									component: () => import('./views/Main/Roles/Update/index'),
									meta: {
										title(name) {
											return $i18n.t('crudEdit', {
												table: $i18n.tc('menu.role', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'read/:id',
									props: true,
									name: 'mainRolesRead',
									component: () => import('./views/Main/Roles/Read/index'),
									meta: {
										title(name) {
											return $i18n.t('crudRead', {
												table: $i18n.tc('menu.role', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
							]
						},
						{
							path: 'permissions',
							name: 'mainPermissions',
							component: () => import('./views/Main/Permissions/index'),
							redirect: { name: 'mainPermissionsList' },
							children: [
								{
									path: 'index',
									name: 'mainPermissionsList',
									component: () => import('./views/Main/Permissions/List/index'),
									meta: {
										title() {
											return $i18n.tc('menu.permission', 2) + ' | ETM';
										},
									},
								},
								{
									path: 'read/:id',
									props: true,
									name: 'mainPermissionsRead',
									component: () => import('./views/Main/Permissions/Read/index'),
									meta: {
										title(name) {
											return $i18n.t('crudRead', {
												table: $i18n.tc('menu.permission', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
							]
						},
						{
							path: 'organizations',
							name: 'mainOrganizations',
							component: () => import('./views/Main/Organizations/index'),
							redirect: { name: 'mainOrganizationsList' },
							children: [
								{
									path: 'index',
									name: 'mainOrganizationsList',
									component: () => import('./views/Main/Organizations/List/index'),
									meta: {
										title() {
											return $i18n.tc('menu.organization', 2) + ' | ETM';
										},
									},
								},
								{
									path: 'create',
									name: 'mainOrganizationsCreate',
									component: () => import('./views/Main/Organizations/Create/index'),
									meta: {
										title() {
											return $i18n.t('crudCreate', {
												text: $i18n.tc('menu.organization', 1).toLowerCase(),
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'update/:id',
									props: true,
									name: 'mainOrganizationsUpdate',
									component: () => import('./views/Main/Organizations/Update/index'),
									meta: {
										title(name) {
											return $i18n.t('crudEdit', {
												table: $i18n.tc('menu.organization', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
								{
									path: 'read/:id',
									props: true,
									name: 'mainOrganizationsRead',
									component: () => import('./views/Main/Organizations/Read/index'),
									meta: {
										title(name) {
											return $i18n.t('crudRead', {
												table: $i18n.tc('menu.organization', 1).toLowerCase(),
												name: name,
											}) + ' | ETM';
										},
									},
								},
							]
						},



						{
							path: 'reports',
							name: 'mainReports',
							component: () => import('./views/Main/Reports/index'),
							redirect: { name: 'mainReportsProjectOverview' },
							children: [
								{
									path: 'project-overview',
									name: 'mainReportsProjectOverview',
									component: () => import('./views/Main/Reports/ProjectOverview/index'),
									meta: {
										title() {
											return $i18n.t('menu.projectOverview') + ' | ETM';
										},
									},
								},
								{
									path: 'time-series',
									name: 'mainReportsTimeSeries',
									component: () => import('./views/Main/Reports/TimeSeries/index'),
									meta: {
										title() {
											return $i18n.t('menu.timeSeries') + ' | ETM';
										},
									},
								},
								{
									path: 'time-frame',
									name: 'mainReportsTimeFrame',
									component: () => import('./views/Main/Reports/TimeFrame/index'),
									meta: {
										title() {
											return $i18n.t('menu.timeFrame') + ' | ETM';
										},
									},
								},
								{
									path: 'project-details-task',
									name: 'mainReportsProjectDetailsTask',
									component: () => import('./views/Main/Reports/ProjectDetailsTask/index'),
									meta: {
										title() {
											return $i18n.t('menu.projectDetailsTask') + ' | ETM';
										},
									},
								},
								{
									path: 'project-details-manager',
									name: 'mainReportsProjectDetailsManager',
									component: () => import('./views/Main/Reports/ProjectDetailsManager/index'),
									meta: {
										title() {
											return $i18n.t('menu.projectDetailsManager') + ' | ETM';
										},
									},
								},
								{
									path: 'project-details-employee',
									name: 'mainReportsProjectDetailsEmployee',
									component: () => import('./views/Main/Reports/ProjectDetailsEmployee/index'),
									meta: {
										title() {
											return $i18n.t('menu.projectDetailsEmployee') + ' | ETM';
										},
									},
								},
							]
						},
					]
				},
				{
					path: 'dashboard/:id/:taskId?',
					name: 'dashboard',
					component: () => import('./views/Dashboard/index'),
					meta: {
						title(name) {
							return $i18n.t('projectInDashboard', {
								name: name,
							}) + ' | ETM';
						},
					},
				},
			]
		},



		{
			path: '/auth',
			name: 'auth',
			component: () => import('./layouts/AuthorizationLayout'),
			redirect: { name: 'authLogin' },
			meta: {
				public: true
			},
			children: [
				{
					path: 'login',
					name: 'authLogin',
					component: () => import('./views/Authorization/Login/index'),
					meta: {
						title() {
							return $i18n.t('login') + ' | ETM';
						},
						description() {
							return $i18n.t('meta.description.login');
						},
						keywords() {
							return $i18n.t('meta.keywords.login');
						},
					},
				},
				{
					path: 'registration',
					name: 'authRegistration',
					component: () => import('./views/Authorization/Registration/index'),
					meta: {
						title() {
							return $i18n.t('register') + ' | ETM';
						},
						description() {
							return $i18n.t('meta.description.registration');
						},
						keywords() {
							return $i18n.t('meta.keywords.registration');
						},
					},
				},
				{
					path: 'recovery',
					name: 'authRecovery',
					component: () => import('./views/Authorization/Recovery/index'),
					meta: {
						title() {
							return $i18n.t('passwordRecovery') + ' | ETM';
						},
						description() {
							return $i18n.t('meta.description.recovery');
						},
						keywords() {
							return $i18n.t('meta.keywords.recovery');
						},
					},
				},
			]
		},
	]
});


router.beforeEach((to, from, next) => {
	let hasToken = !!accessTokenGet();
	let isPublic = to.matched.some(record => record.meta.public);

	if (hasToken && isPublic) {
		return next(from.fullPath);
	}

	if (!hasToken && !isPublic) {
		return next({ name: 'authLogin' });
	}

	next();



	$('.modal').modal('hide');
});



export default router;