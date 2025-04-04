
/*____________________ Defaults ____________________*/
export const DEFAULT_API_URL = '/api/v1/';
export const DEFAULT_IMG_URL = '';


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
	GROUP: 'GROUP',
	MANAGER: 'MANAGER',
	PROJECT_TYPE: 'PROJECT_TYPE',
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
