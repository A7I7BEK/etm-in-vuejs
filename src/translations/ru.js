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
		CREATE_PROJECT: 'создал(а) этот проект',
		DELETE_PROJECT: 'удалил(а) этот проект',
		CHANGE_PROJECT: 'переименовал(а) этот проект с "{oldProName}" на "{newProName}"',
		INVITE_MEMBER: 'добавил(а) "{inviteUser}" в этот проект',
		REMOVE_MEMBER: 'удалил(а) "{removeUser}" из этого проекта',
		ADD_PROJECT_COLUMN: 'добавил(а) колонку "{addProColumn}" в этот проект',
		UPDATE_PROJECT_COLUMN: 'переименовал(а) колонку с "{updateNameColumn}" на "{newNameColumn}"',
		DELETED_PROJECT_COLUMN: 'удалил(а) колонку "{text}"',
		CREATE_TASK: 'создал(а) задачу "{task}" в столбце "{column}"',
		UPDATE_TASK: 'обновил(а) задачу "{oldTask}" на "{newTask}"',
		DELETE_TASK: 'удалил(а) задание "{text}"',
		MOVE_TASK: 'переместил(а) задачу "{task}" из столбца "{oldColumn}" в столбец "{newColumn}"',
		COPY_TASK: 'скопировал(а) задачу "{oldTask}" в столбец "{column}" как "{newTask}"',
		JOIN_TASK_MEMBER: 'добавил(а) "{joinMember}" в задачу "{joinTask}"',
		REMOVE_TASK_MEMBER: 'удалил(а) учасника "{removeUser}" с задачи "{joinTask}"',
		CREATE_CHECKLIST_GROUP: 'добавил(а) контрольный список "{createGroup}" в задаче "{taskName}"',
		DELETE_CHECKLIST_GROUP: 'удалил(а) контролный список "{deleteGroup}" с задачи "{taskName}"',
		CREATE_CHECKLIST_ITEM: 'добавил(а) элемент контрольного списка "{checkListName}" в задачу "{taskName}"',
		DELETE_CHECKLIST_ITEM: 'удалил(а) элемент контрольного списка "{checkListText}" с задачи "{taskName}"',
		COMPLETE_CHECKLIST_ITEM: 'отметил(а) элемент контрольного списка "{checkListText}" в задаче "{taskName}"',
		ADD_COMMENT: 'добавил(а) комментарий "{addComment}" в задачу "{addName}"',
		ADD_CHECKLIST: 'добавил(а) элемент контрольного списка "{checkListName}" в задачу "{taskName}"',
		CHANGE_COMMENT: 'изменил(а) комментарий c "{changeCommentOld}" на "{changeCommentNew}" в задаче "{taskName}"',
		DELETE_COMMENT: 'удалил(а) комментарий "{deleteComment}" с задачи "{taskName}"',
		ADD_ATTACHMENT: 'прикрепил(а) файл "{addAttachment}" в задачу "{taskName}"',
		DELETE_ATTACHMENT: 'удалил(а) файл "{deleteAttachment}" с задачи "{taskName}"',
		ADD_DUE_DATE: 'поставил(а) срок до "{addDate}" на задачу "{taskName}"',
	},
	boardColumn: {
		addTask: 'Добавить задачу',
		commentedCard: 'прокомментировал(а) карта'
	},
	profileMenuModal: {
		editProfile: 'Редактировать профиль',
		uploadPhoto: 'Загрузить фото'
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
	priorityHigh: 'Срочный',
	priorityNormal: 'Средний',
	priorityLow: 'Низкий',
	changeBackground: 'Сменить фон',
	projectSettings: 'Настройки проекта',
	actionsAndComments: 'Комментарии & Действия',
	actions: 'Действия',
	enterSearchTerm: 'Введите поисковый запрос: слово, метку, имя участника или срок выполнения.',
	column: 'Колонка',
	problem: 'Проблема',
	solution: 'Решение',
	information: 'Информация',
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
	start: 'Старт',
	stop: 'Стоп',
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
	permission: {
		AUTH_TRY_CREATE: 'Создание автиризации',
		AUTH_TRY_READ: 'Просмотр автиризации',
		BACKGROUND_CREATE: 'Создание фона',
		BACKGROUND_DELETE: 'Удаление фона',
		BACKGROUND_READ: 'Просмотр фона',
		BACKGROUND_UPDATE: 'Обновление фона',
		CERTIFICATE_UPDATE: 'Обновление сертификата',
		CHECKLIST_GROUP_CREATE: 'Создание контрольного списока',
		CHECKLIST_GROUP_DELETE: 'Удаление контрольного списока',
		CHECKLIST_GROUP_READ: 'Просмотр контрольного списока',
		CHECKLIST_GROUP_UPDATE: 'Обновление контрольного списока',
		COIN_CREATE_AND_UPDATE: 'Создание и обновление денег',
		COIN_READ: 'Создание денег',
		EMPLOYEE_ALL_WITH_PHOTO: 'Для всего для пользователей с фотографией',
		EMPLOYEE_CREATE: 'Создание пользователей',
		EMPLOYEE_DELETE: 'Удаление пользователей',
		EMPLOYEE_READ: 'Просмотр пользователей',
		EMPLOYEE_UPDATE: 'Обновление пользователей',
		ERROR_MESSAGE_CREATE: 'Создание сообщения об ошибке',
		ERROR_MESSAGE_DELETE: 'Удаление сообщения об ошибке',
		ERROR_MESSAGE_READ: 'Просмотр сообщения об ошибке',
		ERROR_MESSAGE_UPDATE: 'Обновление сообщения об ошибке',
		FILE_STORAGE_CREATE: 'Создание файлового хранилища',
		FILE_STORAGE_READ: 'Просмотр файлового хранилищац',
		GROUP_CREATE: 'Создание команды',
		GROUP_DELETE: 'Удаление команды',
		GROUP_READ: 'Просмотр команды',
		GROUP_UPDATE: 'Обновление команды',
		LANGUAGE_READ: 'Просмотр команды',
		PERMISSION_CREATE: 'Создание разрешения',
		PERMISSION_DELETE: 'Удаление разрешения',
		PERMISSION_READ: 'Просмотр разрешения',
		PERMISSION_UPDATE: 'Обновление разрешения',
		PROJECT_CHANGE_PHOTO: 'Изменение фотографии проекта',
		PROJECT_COLUMN_CREATE: 'Создание колонки проекта',
		PROJECT_COLUMN_DELETE: 'Удаление колонки проекта',
		PROJECT_COLUMN_READ: 'Просмотр колонки проекта',
		PROJECT_COLUMN_READ_DETAILS: 'Просмотр деталей колонки проекта',
		PROJECT_COLUMN_UPDATE: 'Обновление колонки проекта',
		PROJECT_CREATE: 'Создание проекта',
		PROJECT_DELETE: 'Удаление проекта',
		PROJECT_MEMBER_CREATE: 'Создание участников проекта',
		PROJECT_MEMBER_READ: 'Просмотр участников проекта',
		PROJECT_MEMBER_READ_EMPLOYEE: 'Просмотр участников прикрепленных к проекту',
		PROJECT_READ: 'Просмотр проекта',
		PROJECT_READ_DETAILS: 'Просмотр деталей проекта',
		PROJECT_TAG_CREATE: 'Создание меток проекта',
		PROJECT_TAG_DELETE: 'Удаление меток проекта',
		PROJECT_TAG_READ: 'Просмотр меток проекта',
		PROJECT_TAG_UPDATE: 'Обновление меток проекта',
		PROJECT_UPDATE: 'Обновление проекта',
		ROLE_ATTACH_PERMISSION: 'Прикрепление разрешений к роли',
		ROLE_CREATE: 'Создание роля',
		ROLE_DELETE: 'Удаление роля',
		ROLE_READ: 'Просмотр роля',
		ROLE_UPDATE: 'Обновление роля',
		SUB_TYPE_CREATE: 'Создание под типа',
		TASK_ACTION_READ: 'Просмотр действий задач',
		TASK_ATTACHMENT_CREATE: 'Прикрепление файлов к задаче',
		TASK_ATTACHMENT_READ: 'Просмотр файлов в задаче',
		TASK_CHECK_CREATE: 'Создание проверки задачи',
		TASK_CHECK_DELETE: 'Удаление проверки задачи',
		TASK_CHECK_READ: 'Просмотр проверки задачи',
		TASK_CHECK_UPDATE: 'Обновление проверки задачи',
		TASK_COMMENT_CREATE: 'Создание комментария задачи',
		TASK_COMMENT_DELETE: 'Удаление комментария задачи',
		TASK_COMMENT_READ: 'Просмотр комментария задачи',
		TASK_COMMENT_UPDATE: 'Обновление комментария задачи',
		TASK_CREATE: 'Создание задачи',
		TASK_CREATE_TIME: 'Создание времени задачи',
		TASK_DELETE: 'Удаление задачи',
		TASK_MEMBER_CREATE: 'Создание участников задачи',
		TASK_MEMBER_DELETE: 'Удаление участников задачи',
		TASK_MEMBER_READ: 'Просмотр участников задачи',
		TASK_MOVE: 'Перемещение задачи',
		TASK_READ: 'Просмотр задачи',
		TASK_READ_DETAILS: 'Просмотр деталей задачи',
		TASK_TAG_CREATE: 'Создание меток задачи',
		TASK_TAG_DELETE: 'Удаление меток задачи',
		TASK_TAG_READ: 'Просмотр меток задачи',
		TASK_TAG_UPDATE: 'Обновление меток задачи',
		TASK_UPDATE: 'Обновление задачи',
		TYPE_CREATE: 'Создание типа',
		TYPE_DELETE: 'Удаление типа',
		TYPE_READ: 'Просмотр типа',
		TYPE_UPDATE: 'Обновление типа',
		USER_ATTACH_ROLE: 'Прикрепление роля к пользователю',
		USER_CREATE: 'Создание пользователя',
		USER_DELETE: 'Удаление пользователя',
		USER_READ: 'Просмотр пользователя',
		USER_UPDATE: 'Обновление пользователя',
		REPORT_KANBAN_PROJECT_MANAGER_AND_MEMBER: 'Kanban отчет о руководителей и сотрудников',
		REPORT_TRELLO_PROJECT_MANAGER_AND_MEMBER: 'Trello отчет о руководителей и сотрудников',
		REPORT_CHART_KANBAN_PROJECT: 'Kanban отчет в графике',
		REPORT_CHART_TRELLO_PROJECT: 'Trello отчет в графике',
		REPORT_KANBAN_TRELLO_PROJECT_WITH_USER: 'Отчет о задании в проекте',
		REPORT_TIME_LEFT: 'Отчет о времени',
		REPORT_MANAGERS_MEMBERS_UPLOAD: 'Файл экспорт о руководителей и сотрудников',
		REPORT_PERSONAL_UPLOAD: 'Файл экспорт о задании в проекте',
		REPORT_TIME_LEFT_UPLOAD: 'Файл экспорт о времени',
		TASK_COPY: 'Копирование задачи',
		USER_LAST_LOGIN_CREATE: 'Последний вход пользователя создать',
		USER_LAST_LOGIN_READ: 'Последнее чтение пользователя',
		MANAGER_RENAME_TASK_PROJECT: 'Возможность переименовать название проектов и задач',
		ORGANIZATION_CREATE: 'Создание Организаций',
		ORGANIZATION_UPDATE: 'Редактирование Организаций',
		ORGANIZATION_DELETE: 'Удаление Организаций',
		ORGANIZATION_READ: 'Чтение Организаций',
		EMPLOYEE_PASSWORD_CHANGE: 'Сброс пароля',
		EMPLOYEE_PROFILE_UPDATE: 'Редактирование профиля',
		ALARM_READ: 'Чтение сигнал тревоги',
		ALARM_UPDATE: 'Редактирование сигнал тревоги',
		PROJECT_ARCHIVE: 'Архивировать проект',
	},
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

	HIGH_LEVEL: 'Высокий',
	NORMAL_LEVEL: 'Нормальный',
	LOW_LEVEL: 'Низкий',
	HIGH_PRIORITY: 'Высокий',
	NORMAL_PRIORITY: 'Нормальный',
	LOW_PRIORITY: 'Низкий',

	YELLOW: 'Истекает срок',
	GREEN: 'Достаточно времени',
	RED: 'Просрочено',

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
	DeadlineSuccessfully: 'Срок успешно установлен!',

	NEW: 'Новый',
	DOING: 'Выполняется',
	DONE: 'Сделано',
	VERIFY: 'Проверено',
	ARCHIVE: 'Архив',

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
};