/*____________________ Dev Server ____________________*/
export const DEV_API_URL = 'http://localhost:3001';
export const DEV_IMG_URL = '';


/*____________________ Prod Server ____________________*/
export const PROD_API_URL = '';
export const PROD_IMG_URL = '';


/*____________________ Defaults ____________________*/
export const DEFAULT_API_URL = PROD_API_URL;
export const DEFAULT_IMG_URL = PROD_IMG_URL;


/*____________________ Others ____________________*/
export const LANG = {
	Uzbek: 'uz',
	English: 'en',
	Russian: 'ru',
};
export const LANG_LOCALE = {
	[ LANG.Uzbek ]: 'O‘zbekcha',
	[ LANG.English ]: 'English',
	[ LANG.Russian ]: 'Русский',
};
export const HANDLE_PARAMS = {
	PAGE: 'PAGE',
	PAGE_SIZE: 'PAGE_SIZE',
	SEARCH: 'SEARCH',
	SORT_BY: 'SORT_BY',
	ORGANIZATION: 'ORGANIZATION',
	PROJECT: 'PROJECT',
	COLUMN: 'COLUMN',
	GROUP: 'GROUP',
	MANAGER: 'MANAGER',
	PROJECT_TYPE: 'PROJECT_TYPE',
	OWN_TASK: 'OWN_TASK',
	DEADLINE: 'DEADLINE',
	DEADLINE_TYPE: 'DEADLINE_TYPE',
};
export const ORDER = {
	ASC: 'ASC',
	DESC: 'DESC',
};
export const ORDER_REVERSE = {
	[ ORDER.ASC ]: ORDER.DESC,
	[ ORDER.DESC ]: ORDER.ASC,
};
export const PROJECT_TYPE = {
	TRELLO: 'TRELLO',
	KANBAN: 'KANBAN',
};
export const COLUMN_KANBAN_TYPE = {
	TO_DO: 'TO DO',
	IN_PROGRESS: 'IN PROGRESS',
	DONE: 'DONE',
	VERIFY: 'VERIFY',
	ARCHIVE: 'ARCHIVE',
};
export const TASK_LEVEL_TYPE = {
	HIGH: 'HIGH_LEVEL',
	NORMAL: 'NORMAL_LEVEL',
	LOW: 'LOW_LEVEL',
};
export const TASK_PRIORITY_TYPE = {
	HIGH: 'HIGH_PRIORITY',
	NORMAL: 'NORMAL_PRIORITY',
	LOW: 'LOW_PRIORITY',
};
export const TASK_STATUS_TYPE = {
	RED: 'RED',
	YELLOW: 'YELLOW',
	GREEN: 'GREEN',
	BLUE: 'BLUE',
};
export const TASK_COMMENT_TYPE = {
	INFORMATION: 'INFORMATION',
	PROBLEM: 'PROBLEM',
	SOLUTION: 'SOLUTION',
};
export const TASK_TIMER_TYPE = {
	START: 'START',
	STOP: 'STOP',
};
export const NOTIFICATION_TYPE = {
	TASK: 'TASK',
	COMMENT: 'COMMENT',
	CHECK_LIST_ITEM: 'CHECK_LIST_ITEM',
};
export const COLOR_LIST = [
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
];
export const META_DATA = {
	title: 'Test title',
	description: 'Test description',
	keywords: 'Test keyword',
	image: 'https://etm.crm24.uz/img/favicon_alert.png',
};
export const FAVICON_SIMPLE = '/img/favicon.png';
export const FAVICON_ALERT = '/img/favicon_alert.png';


export const PERMISSION_TYPE = {
	ORGANIZATION: {
		CREATE: 'ORGANIZATION_CREATE',
		READ: 'ORGANIZATION_READ',
		UPDATE: 'ORGANIZATION_UPDATE',
		DELETE: 'ORGANIZATION_DELETE',
	},
	PERMISSION: {
		READ: 'PERMISSION_READ',
	},
	ROLE: {
		CREATE: 'ROLE_CREATE',
		READ: 'ROLE_READ',
		UPDATE: 'ROLE_UPDATE',
		DELETE: 'ROLE_DELETE',
		UPDATE_ADMINS: 'ROLE_UPDATE_ADMINS',
	},
	USER: {
		GET_ME: 'USER_GET_ME',
		ATTACH_ROLE: 'USER_ATTACH_ROLE',
		CHANGE_PASSWORD: 'USER_CHANGE_PASSWORD',
		CHANGE_LANGUAGE: 'USER_CHANGE_LANGUAGE',
		UPDATE_PROFILE: 'USER_UPDATE_PROFILE',
	},
	EMPLOYEE: {
		CREATE: 'EMPLOYEE_CREATE',
		READ: 'EMPLOYEE_READ',
		UPDATE: 'EMPLOYEE_UPDATE',
		DELETE: 'EMPLOYEE_DELETE',
		CHANGE_PASSWORD: 'EMPLOYEE_CHANGE_PASSWORD',
	},
	GROUP: {
		CREATE: 'GROUP_CREATE',
		READ: 'GROUP_READ',
		UPDATE: 'GROUP_UPDATE',
		DELETE: 'GROUP_DELETE',
	},
	PROJECT: {
		CREATE: 'PROJECT_CREATE',
		READ: 'PROJECT_READ',
		UPDATE: 'PROJECT_UPDATE',
		DELETE: 'PROJECT_DELETE',
		CHANGE_BACKGROUND: 'PROJECT_CHANGE_BACKGROUND',
		READ_DETAILS: 'PROJECT_READ_DETAILS',
	},
	PROJECT_COLUMN: {
		CREATE: 'PROJECT_COLUMN_CREATE',
		READ: 'PROJECT_COLUMN_READ',
		UPDATE: 'PROJECT_COLUMN_UPDATE',
		DELETE: 'PROJECT_COLUMN_DELETE',
		MOVE: 'PROJECT_COLUMN_MOVE',
	},
	PROJECT_MEMBER: {
		CREATE: 'PROJECT_MEMBER_CREATE',
		READ: 'PROJECT_MEMBER_READ',
		DELETE: 'PROJECT_MEMBER_DELETE',
	},
	PROJECT_TAG: {
		CREATE: 'PROJECT_TAG_CREATE',
		READ: 'PROJECT_TAG_READ',
		UPDATE: 'PROJECT_TAG_UPDATE',
		DELETE: 'PROJECT_TAG_DELETE',
	},
	TASK: {
		CREATE: 'TASK_CREATE',
		READ: 'TASK_READ',
		UPDATE: 'TASK_UPDATE',
		DELETE: 'TASK_DELETE',
		COPY: 'TASK_COPY',
		MOVE: 'TASK_MOVE',
		READ_DETAILS: 'TASK_READ_DETAILS',
	},
	TASK_MEMBER: {
		CREATE: 'TASK_MEMBER_CREATE',
		READ: 'TASK_MEMBER_READ',
		DELETE: 'TASK_MEMBER_DELETE',
	},
	TASK_TAG: {
		CREATE: 'TASK_TAG_CREATE',
		READ: 'TASK_TAG_READ',
		DELETE: 'TASK_TAG_DELETE',
	},
	TASK_COMMENT: {
		CREATE: 'TASK_COMMENT_CREATE',
		READ: 'TASK_COMMENT_READ',
		UPDATE: 'TASK_COMMENT_UPDATE',
		DELETE: 'TASK_COMMENT_DELETE',
	},
	TASK_DEADLINE: {
		CREATE: 'TASK_CREATE_TIME',
		UPDATE: 'TASK_UPDATE_TIME',
		DELETE: 'TASK_DELETE_TIME',
	},
	TASK_ATTACHMENT: {
		CREATE: 'TASK_ATTACHMENT_CREATE',
		READ: 'TASK_ATTACHMENT_READ',
		DELETE: 'TASK_ATTACHMENT_DELETE',
	},
	TASK_TIMER: {
		START: 'TASK_TIMER_START',
		STOP: 'TASK_TIMER_STOP',
		READ: 'TASK_TIMER_READ',
	},
	CHECK_LIST_GROUP: {
		CREATE: 'CHECKLIST_GROUP_CREATE',
		READ: 'CHECKLIST_GROUP_READ',
		UPDATE: 'CHECKLIST_GROUP_UPDATE',
		DELETE: 'CHECKLIST_GROUP_DELETE',
	},
	CHECK_LIST_ITEM: {
		CREATE: 'CHECKLIST_ITEM_CREATE',
		READ: 'CHECKLIST_ITEM_READ',
		UPDATE: 'CHECKLIST_ITEM_UPDATE',
		DELETE: 'CHECKLIST_ITEM_DELETE',
	},
	SHARE: {
		EMAIL: 'SHARE_TASK_EMAIL',
		TELEGRAM: 'SHARE_TASK_TELEGRAM',
	},
	ACTION: {
		READ: 'ACTION_READ',
	},
	NOTIFICATION: {
		READ: 'NOTIFICATION_READ',
		UPDATE: 'NOTIFICATION_UPDATE',
		DELETE: 'NOTIFICATION_DELETE',
	},
	REPORT: {
		MANAGERS_MEMBERS_KANBAN: 'REPORT_KANBAN_PROJECT_MANAGER_AND_MEMBER',
		MANAGERS_MEMBERS_TRELLO: 'REPORT_TRELLO_PROJECT_MANAGER_AND_MEMBER',
		USER_KANBAN_TRELLO: 'REPORT_KANBAN_TRELLO_PROJECT_WITH_USER',
		CHART_KANBAN: 'REPORT_CHART_KANBAN_PROJECT',
		CHART_TRELLO: 'REPORT_CHART_TRELLO_PROJECT',
		TIME_LEFT: 'REPORT_TIME_LEFT',
		MANAGERS_MEMBERS_UPLOAD: 'REPORT_MANAGERS_MEMBERS_UPLOAD',
		USER_UPLOAD: 'REPORT_PERSONAL_UPLOAD',
		TIME_LEFT_UPLOAD: 'REPORT_TIME_LEFT_UPLOAD',
	}
};
