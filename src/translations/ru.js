import { NOTIFICATION_TYPE, PERMISSION_TYPE } from '../constants';


export default {
	dashboard: {
		language: 'Язык',
		languageChange: 'Сменить язык',
	},
	notification: {
		error: 'Ошибка',
		warning: 'Предупреждение',
		success: 'Успешно',
	},
	menu: {
		home: 'Главная',
		task: 'Задача | Задачи',
		project: 'Проект | Проекты',
		user: 'Пользователь | Пользователи',
		role: 'Роль | Роли',
		organization: 'Организация | Организации',
		permission: 'Доступ | Доступы',
		team: 'Команда | Команды',
		report: 'Отчет | Отчеты',
		projectOverview: 'Общий обзор проектов',
		timeSeries: 'Табель рабочего времени',
		timeFrame: 'Обзор занятости ',
		projectDetailsTask: 'Детальный отчет проектов',
		projectDetailsManager: 'Отчет менеджера проектов',
		projectDetailsEmployee: 'Отчет исполнителей проекта',
	},
	repoerts: {
		kanban: 'Kanban',
		boardName: 'Название проекта',
		numberBoards: 'Количество проектов',
		sumTasks: 'Количество задач',
		noTask: 'Нет задачи'
	},
	actionItem: {
		[ PERMISSION_TYPE.CHECK_LIST_GROUP.CREATE ]: 'создал группу контрольных списков "{groupName}" в задаче "{taskName}"',
		[ PERMISSION_TYPE.CHECK_LIST_GROUP.UPDATE ]: 'отредактировал группу контрольного списка "{groupName}" в задаче "{taskName}"',
		[ PERMISSION_TYPE.CHECK_LIST_GROUP.DELETE ]: 'удалил группу контрольного списка "{groupName}" из задачи "{taskName}"',
		[ PERMISSION_TYPE.CHECK_LIST_ITEM.CREATE ]: 'создал элемент контрольного списка "{itemName}" в задаче "{taskName}"',
		[ PERMISSION_TYPE.CHECK_LIST_ITEM.UPDATE ]: 'отредактировал элемент контрольного списка "{itemName}" в задаче "{taskName}"',
		[ PERMISSION_TYPE.CHECK_LIST_ITEM.DELETE ]: 'удалил элемент контрольного списка "{itemName}" из задачи "{taskName}"',
		[ PERMISSION_TYPE.PROJECT_COLUMN.CREATE ]: 'создал столбец "{name}"',
		[ PERMISSION_TYPE.PROJECT_COLUMN.UPDATE ]: 'отредактировал столбец "{name}"',
		[ PERMISSION_TYPE.PROJECT_COLUMN.DELETE ]: 'удалил столбец "{name}"',
		[ PERMISSION_TYPE.PROJECT_COLUMN.MOVE ]: 'изменил порядок столбца "{name}"',
		[ PERMISSION_TYPE.PROJECT_MEMBER.CREATE ]: 'добавил сотрудников "{employeeNames}" в проект',
		[ PERMISSION_TYPE.PROJECT_MEMBER.DELETE ]: 'удалил сотрудника "{employeeName}" из проекта',
		[ PERMISSION_TYPE.PROJECT_TAG.CREATE ]: 'создал тег проекта "{name}"',
		[ PERMISSION_TYPE.PROJECT_TAG.UPDATE ]: 'отредактировал тег проекта "{name}"',
		[ PERMISSION_TYPE.PROJECT_TAG.DELETE ]: 'удалил тег проекта "{name}"',
		[ PERMISSION_TYPE.PROJECT.CREATE ]: 'создал этот проект',
		[ PERMISSION_TYPE.PROJECT.UPDATE ]: 'редактировал проект',
		[ PERMISSION_TYPE.PROJECT.CHANGE_BACKGROUND ]: 'изменил фон проекта',
		[ PERMISSION_TYPE.TASK_ATTACHMENT.CREATE ]: 'добавил файл "{fileName}" в задачу "{taskName}"',
		[ PERMISSION_TYPE.TASK_ATTACHMENT.DELETE ]: 'удалил файл "{fileName}" из задачи "{taskName}"',
		[ PERMISSION_TYPE.TASK_COMMENT.CREATE ]: 'прокомментировал задачу "{taskName}"',
		[ PERMISSION_TYPE.TASK_COMMENT.UPDATE ]: 'обновил комментарий в задаче "{taskName}"',
		[ PERMISSION_TYPE.TASK_COMMENT.DELETE ]: 'удалил комментарий в задаче "{taskName}"',
		[ PERMISSION_TYPE.TASK_DEADLINE.CREATE ]: 'установил время для задачи "{taskName}"',
		[ PERMISSION_TYPE.TASK_DEADLINE.UPDATE ]: 'обновил время задачи "{taskName}"',
		[ PERMISSION_TYPE.TASK_DEADLINE.DELETE ]: 'удалил время задачи "{taskName}"',
		[ PERMISSION_TYPE.TASK_MEMBER.CREATE ]: 'добавил участника "{employeeName}" в задачу "{taskName}"',
		[ PERMISSION_TYPE.TASK_MEMBER.DELETE ]: 'удалил участника "{employeeName}" из задачи "{taskName}"',
		[ PERMISSION_TYPE.TASK_TAG.CREATE ]: 'добавил тег "{tagName}" в задачу "{taskName}"',
		[ PERMISSION_TYPE.TASK_TAG.DELETE ]: 'удалил тег "{tagName}" из задачи "{taskName}"',
		[ PERMISSION_TYPE.TASK_TIMER.START ]: 'запустил таймер задачи "{taskName}"',
		[ PERMISSION_TYPE.TASK_TIMER.STOP ]: 'остановил таймер задачи "{taskName}"',
		[ PERMISSION_TYPE.TASK.CREATE ]: 'создал задачу "{name}"',
		[ PERMISSION_TYPE.TASK.UPDATE ]: 'отредактировал задачу "{name}"',
		[ PERMISSION_TYPE.TASK.DELETE ]: 'удалил задачу "{name}"',
		[ PERMISSION_TYPE.TASK.COPY ]: 'создал копию задачи "{newName}" из "{originalName}"',
		[ PERMISSION_TYPE.TASK.MOVE + 'migrate' ]: 'перенес задачу "{taskName}" из проекта "oldProjectName"',
		[ PERMISSION_TYPE.TASK.MOVE + 'move' ]: 'переместил задачу "{taskName}" из столбца "{oldColumnName}" в столбец "{newColumnName}"',
		[ PERMISSION_TYPE.TASK.MOVE + 'reorder' ]: 'изменил порядок задачи "{taskName}"',
	},
	notifItem: {
		[ NOTIFICATION_TYPE.TASK ]: 'обновил вашу задачу "{taskName}"',
		[ NOTIFICATION_TYPE.COMMENT ]: 'упомянул вас в комментарии к задаче "{taskName}"',
		[ NOTIFICATION_TYPE.CHECK_LIST_ITEM ]: 'упомянул вас в пункте контрольного списка "{itemName}" в задаче "{taskName}"',
	},
	boardColumn: {
		addTask: 'Добавить задачу',
		commentedCard: 'прокомментировал(а) карта'
	},
	profileMenuModal: {
		editProfile: 'Редактировать профиль',
		uploadPhoto: 'Загрузить фото'
	},
	COLUMN_KANBAN_TYPE: {
		'TO DO': 'НОВЫЙ',
		'IN PROGRESS': 'В ПРОГРЕССЕ',
		'DONE': 'СДЕЛАНО',
		'VERIFY': 'ПРОВЕРКА',
		'ARCHIVE': 'АРХИВ',
	},
	TASK_LEVEL_TYPE: {
		HIGH_LEVEL: 'Высокий',
		NORMAL_LEVEL: 'Средний',
		LOW_LEVEL: 'Низкий',
	},
	TASK_PRIORITY_TYPE: {
		HIGH_PRIORITY: 'Высокий',
		NORMAL_PRIORITY: 'Средний',
		LOW_PRIORITY: 'Низкий',
	},
	TASK_COMMENT_TYPE: {
		INFORMATION: 'Информация',
		PROBLEM: 'Проблема',
		SOLUTION: 'Решение',
	},
	TASK_STATUS_TYPE: {
		RED: 'Просроченный',
		YELLOW: 'Истекающий',
		GREEN: 'Есть срок',
		BLUE: 'Нет срока',
	},
	TASK_TIMER_TYPE: {
		START: 'Старт',
		STOP: 'Стоп',
	},
	createTask: 'Создать задачу',
	taskTitle: 'Введите название задачи',
	nameIsRequired: '«Название задачи» обязательно для заполнения!',
	thereIsNoData: ' Нет данных',
	projectIsRequired: 'Обязательно выберите проект',
	status: 'Выберите столбец',
	statusIsRequired: 'Обязательно выберите столбец',
	filter: 'Фильтр',
	search: 'Поиск',
	nameProject: 'Название проекта',
	taskName: ' Название задачи',
	deadline: 'Крайний срок',
	cancel: 'Отмена',
	add: 'Добавить',
	fullName: 'Ф.И.О',
	userName: 'Имя пользователя',
	birthday: 'Дата рождения',
	edit: 'Редактировать',
	delete: 'Удалить',
	addUser: ' Добавить пользователя',
	uploadPhoto: 'Загрузить фото',
	password: 'Пароль',
	name: 'Название',
	firstName: 'Имя',
	lastName: 'Фамилия',
	middleName: 'Отчество',
	language: 'Язык',
	email: 'E-mail',
	save: 'Сохранить',
	userEditing: 'Редактирование пользователя',
	editPhoto: 'Редактировать фото',
	addRole: 'Добавить роль',
	nameRequiredField: 'Имя обязательное поле',
	codeName: 'Кодовое имя',
	codenameRequiredField: 'Кодовое имя обязательное поле',
	id: 'ID',
	accessQuantity: 'Кол-во доступа',
	permissions: 'Доступы',
	editRole: 'Редактировать роль',
	availablePermissions: 'Доступные разрешения',
	resolution: 'Резолюция',
	editPermissions: 'Редактировать разрешения',
	normal: 'Обычный',
	shownWith: 'Показано с',
	by: 'по',
	of: 'из',
	emailAddress: 'Email address',
	profile: 'Профиль',
	rememberMyPreference: 'Сохранить мои предпочтений',
	submit: 'Отправить',
	downloadExcel: 'Скачать в Excel',
	day: 'День',
	week: 'Неделя',
	month: 'Месяц',
	year: 'Год',
	monday: 'Понедельник',
	tuesday: 'Вторник',
	wednesday: 'Среда',
	thursday: 'Четверг',
	friday: 'Пятница',
	saturday: 'Суббота',
	sunday: 'Воскресения',
	total: 'Итог',
	january: 'Январь',
	february: 'Февраль',
	mart: 'Март',
	april: 'Апрель',
	may: 'Май',
	june: 'Июнь',
	july: 'Июль',
	august: 'Август',
	september: 'Сентябрь',
	october: 'Октябрь',
	november: 'Ноябрь',
	december: 'Декабрь',
	choose: 'Выбрать',
	executor: 'Исполнитель',
	priority: 'Приоритет',
	deadlineLast: 'Срок (Дедлайн)',
	timeSpent: 'Затраченное время',
	menuW: 'Меню',
	taskSearch: 'Поиск задачи',
	taskStatus: 'Статус задачи',
	changeBackground: 'Сменить фон',
	projectSettings: 'Настройки проекта',
	actionsAndComments: 'Комментарии & Действия',
	actions: 'Действия',
	enterSearchTerm: 'Введите поисковый запрос: слово, метку, имя участника или срок выполнения.',
	column: 'Колонка',
	attachment: 'Вложение',
	changeAttachment: 'Изменить вложение',
	linkName: 'Название ссылки',
	hideSelected: 'Скрыть отмеченные',
	showTagged: ' Показать отмеченные',
	tagSomeone: ' Отметить кого-то',
	taskParticipants: 'Участники задачи',
	description: 'описание',
	tags: 'Метки',
	members: 'Участники',
	deadlineS: 'Срок',
	notSet: 'Не задано',
	kvartalOne: 'квартал - 1',
	kvartalTwo: 'квартал - 2',
	kvartalThree: 'квартал - 3',
	kvartalFour: 'квартал - 4',
	addTags: 'Добавить метки',
	kvartal: 'Квартал',
	copyCard: 'Копирование карточки',
	copy: 'Копирование',
	copyTo: 'Копировать в',
	moveCard: 'Перемещение карточки',
	position: 'Позиция',
	move: 'Переместить',
	difficultyLevel: 'Уровень сложности',
	taskCompletionDate: 'Дата выполнения задачи',
	date: 'Дата',
	time: 'Время',
	hour: 'Час',
	minute: 'Минут',
	chooseDateTime: 'Выберите дату и время вместе',
	remove: 'Убрать',
	checkList: 'Чек лист',
	addTaskList: 'Добавить чек лист',

	phoneNumber: 'Номер телефона',
	changePassword: 'Изменит пароль',
	currentPassword: 'Текущий пароль',
	fieldRequired: 'Поле обязательно',
	minimumRequired: 'Требуется минимум 6 символов',
	passwordRepeatNew: 'Повторите новый пароль',
	fieldNewPassword: 'Поле не совпадает с полем Новый пароль',
	logout: 'Выйти',
	boardMembers: 'Участники доски',
	invite: 'Пригласить',
	inviteBoard: 'Пригласить на доску',
	searchEmployeeName: 'Поиск имени работника',
	workerFound: 'Работник не найден',
	addList: 'Добавить список',
	addNewColumn: 'Добавить новый столбец',
	createProject: 'Создать проект',
	all: 'Все',
	manager: 'Менеджер',
	managers: 'Менеджеры',
	percent: 'Процент',
	group: 'Группа',
	typeProject: 'Вид проекта',
	editProject: 'Редактировать проект',
	create: 'Создать',
	teamName: 'Название команды',
	departments: 'Ведомства',
	BranchMaintenanceTerminals: 'Филиал по ремонту и сервисному обслуживанию терминалов, банкоматов',
	nameEmployee: 'Ф.И.О сотрудника',
	more: 'Больше',
	areYouSure: 'Вы уверены?',
	cannotUndoAction: 'Вы не можете отменить это действие!',
	deleteTask: 'Удалить карточку',
	saveAsPdf: 'Сохранить как PDF',
	close: 'закрыть',

	createLabel: 'Создать метка',
	newPassword: 'Новый пароль',
	comments: 'Комментарии',
	nameOfEmployees: 'Ф.И.О сотрудников',
	notifications: 'Уведомления',
	markAllAsRead: 'Отметить все как прочитанные',
	deleteAll: 'Удалить все',
	allRightsReserved: 'Все права защищены',
	noList: 'Нет списка',
	newName: 'Новое имя',
	indicateTheReasonForTheChange: 'Укажите причину изменения',
	completion: 'Завершение',
	color: 'Цвет',
	share: 'Поделиться',
	shareViaEmail: 'Поделиться по Эл. адрес',
	shareViaTelegram: 'Поделиться по Telegram',
	writeAComment: 'Напишите комментарий ...',
	workers: 'работники',
	added: 'Добавлено',
	hoursAgo: ' час(ов) назад',
	minutesAgo: ' минут(а) назад',
	secondsAgo: ' секунд(а) назад',
	in: 'в ',
	addElement: 'Добавить элемент',
	taskDescription: 'Описание задачи',
	addedATask: 'добавил(а) задачу ',
	byTerm: 'По сроком',
	taskPriority: 'Приоритет задачи',
	taskDifficultyLevel: 'Уровень сложности задачи',
	notDone: 'Не выполнен',
	completed: 'Выполнен',
	overdue: 'Просрочено',
	expires: 'Срок истекает',
	enough: 'Достаточно',
	notDelivered: 'Не поставлен',
	complicated: 'Сложный',
	easy: 'Легкий',
	enoughTime: 'Достаточно времени',
	qrPaymentVending: 'QR-вендинг',
	toDo: 'Сделать',
	electronicTaskManagement: 'Электронное управление задачами',
	attachRole: 'Присоединить роль',
	searchCodeName: 'Поиск кодовое имя',
	statusNameOfBoards: 'Статус (название досок)',
	performers: 'Исполнители',
	pleaseCheckOneOrMoreUsers: 'Пожалуйста, проверьте одного или нескольких пользователей!',
	pleaseChooseATeamLeader: 'Пожалуйста, выберите руководителя команды!',
	confirmDelete: 'Вы действительно хотите удалить?',
	WEEKLY_INTERVAL: 'Неделя',
	MONTHLY_INTERVAL: 'Месяц',
	QUARTER_INTERVAL: 'Квартал',
	YEARLY_INTERVAL: 'Год',
	thisWeek: 'Эта неделя',
	lastWeek: 'Прошлая неделя',
	last7Days: 'Последние 7 дней',
	instruction: 'Инструкция',
	guideVideo: 'Видео',
	guidePDF: 'PDF документы',
	guidePPT: 'Презентация',
	noTaskFound: 'Задача не найдена!',
	searchInThisProject: 'в проекте "{message}"',
	paginationText: ' Показано с {shownText} по {fromText} из {toText}',
	wasOnline: 'Был(а) онлайн',
	searchResult: 'результатов поиска',
	board: 'Доска',
	list: 'Список',

	Changed: 'Изменено',
	successfullyDeleted: 'Успешно удалено!',
	FileUploadedSuccessfully: 'Файл успешно загружен!',
	passwordChanged: 'Ваш пароль успешно изменен!',
	profileEdited: 'Ваш профиль успешно отредактирован!',
	SuccessfullyUpdated: 'Успешно обновлено!',
	EditedBy: 'Отредактировано',
	SuccessfullyAdded: 'Успешно добавлено!',
	SuccessfullyCreated: 'Успешно создан!',
	SuccessfullyChanged: 'Успешно изменено!',
	SuccessfullySent: 'Успешно отправлено!',
	TheTimerIsRunning: 'Таймер запущен!',
	TimerStopped: 'Таймер остановлен',
	Added: 'Добавлена',
	DeadlineSuccessfully: 'Срок изменился!',

	select: 'Выбрать',
	projectType: 'Тип проекта',
	columnName: 'Название колонки',
	notAvailable: 'Недоступна',
	deadlineType: 'Тип срока',
	deadlineDate: 'Дата срока',
	hasNoDeadline: 'Нет срока',
	inNextDay: 'Следующий день',
	inNextWeek: 'Следующая неделя',
	inNextMonth: 'Следующий месяц',
	roleAbsent: 'Роль отсутствует',
	columns: 'Колонки',
	organizationName: 'Название организации',
	register: 'Зарегистрироваться',
	login: 'Войти',
	back: 'Назад',
	confirm: 'Подтвердить',
	confirmationCode: 'Код-подтверждение',
	confirmationCodeSent: 'Код подтверждения отправлен на электронную почту {email} и номер телефона {phoneNumber}',
	confirmationCodeSentSmall: 'Код подтверждения отправлен на {text}',
	passwordRepeat: 'Повторите пароль',
	forgotPassword: 'Забыли пароль?',
	resend: 'Переотправить',
	pasteScreenshot: 'Вставьте скриншот сюда',
	crudCreate: 'Создать новый(ая) {text}',
	crudEdit: 'Редактировать {table} "{name}"',
	crudRead: 'Посмотреть {table} "{name}"',
	crudPasswordReset: 'Сбросить пароль пользователя "{name}"',
	teamLeader: 'Лидер команды',
	photo: 'Фото',
	clear: 'Очистить',
	selectedUsers: 'Выбранные пользователи',
	table: 'Таблица | Таблицы',
	other: 'Другой | Другие',
	tasksIamAssigned: 'Задачи, которые мне назначены',
	editInDashboard: 'Редактировать в доске',
	openInDashboard: 'Открыть в доске',
	createdDate: 'Дата создания',
	deadlineStartDate: 'Начало срока',
	deadlineEndDate: 'Окончание срока',
	systemAdmin: 'Системный администратор',
	notSpecified: 'Не указана',
	passwordRecovery: 'Восстановление пароля',
	projectInDashboard: 'Проект "{name}" – Доска',
	meta: {
		description: {
			login: 'ETM Логин - страница входа в систему',
			registration: 'ETM Регистрация - страница регистрации для новых пользователей',
			recovery: 'ETM Восстановление - Страница восстановления пароля для пользователей',
		},
		keywords: {
			login: 'логин, вход, авторизоваться',
			registration: 'регистрация, учет, учетная запись, авторизоваться',
			recovery: 'восстановления, пароль, забыл, авторизоваться',
		},
	},
	systemCreated: 'Создано системой',
	unknown: 'Неизвестный',
};