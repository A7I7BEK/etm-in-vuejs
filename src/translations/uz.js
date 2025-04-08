import { PERMISSION_TYPE } from '../constants';


export default {
	dashboard: {
		language: 'Til',
		languageChange: 'Tilni o‘zgartirish',
	},
	notification: {
		error: 'Xatolik',
		warning: 'Ogohlantirish',
		success: 'Muvaffaqiyatli',
	},
	menu: {
		home: 'Bosh sahifa',
		task: 'Vazifa | Vazifalar',
		project: 'Loyiha | Loyihalar',
		user: 'Foydalanuvchi | Foydalanuvchilar',
		role: 'Rol | Rollar',
		organization: 'Tashkilot | Tashkilotlar',
		permission: 'Huquq | Huquqlar',
		team: 'Jamoa | Jamoalar',
		report: 'Hisobot | Hisobotlar',
		projectOverview: 'Loyihalar umumiy hisoboti',
		timeSeries: 'Ish vaqti tabeli',
		timeFrame: 'Bandlik hisoboti',
		projectDetailsTask: 'Loyihalar batafsil hisoboti',
		projectDetailsManager: 'Loyiha rahbarlari hisoboti',
		projectDetailsEmployee: 'Loyiha ijrochilari hisoboti',
	},
	repoerts: {
		kanban: 'Kanban',
		boardName: 'Loyiha nomi',
		numberBoards: 'Loyihalar soni',
		sumTasks: 'Vazifalar soni',
		noTask: 'Vazifa yo‘q'
	},
	actionItem: {
		[ PERMISSION_TYPE.CHECK_LIST_GROUP.CREATE ]: '"{taskName}" nomli vazifada "{groupName}" nomli nazorat ro‘yxati guruhini yaratdi',
		[ PERMISSION_TYPE.CHECK_LIST_GROUP.UPDATE ]: '"{taskName}" nomli vazifadagi "{groupName}" nomli nazorat ro‘yxati guruhini tahrirladi',
		[ PERMISSION_TYPE.CHECK_LIST_GROUP.DELETE ]: '"{taskName}" nomli vazifadagi "{groupName}" nomli nazorat ro‘yxati guruhini o‘chirdi',
		[ PERMISSION_TYPE.CHECK_LIST_ITEM.CREATE ]: '"{taskName}" nomli vazifada "{itemName}" nomli nazorat ro‘yxati elementini yaratdi',
		[ PERMISSION_TYPE.CHECK_LIST_ITEM.UPDATE ]: '"{taskName}" nomli vazifadagi "{itemName}" nomli nazorat ro‘yxati elementini tahrirladi',
		[ PERMISSION_TYPE.CHECK_LIST_ITEM.DELETE ]: '"{taskName}" nomli vazifadagi "{itemName}" nomli nazorat ro‘yxati elementini o‘chirdi',
		[ PERMISSION_TYPE.PROJECT_COLUMN.CREATE ]: '"{name}" nomli ustun yaratdi',
		[ PERMISSION_TYPE.PROJECT_COLUMN.UPDATE ]: '"{name}" nomli ustunni tahrirladi',
		[ PERMISSION_TYPE.PROJECT_COLUMN.DELETE ]: '"{name}" nomli ustunni o‘chirdi',
		[ PERMISSION_TYPE.PROJECT_COLUMN.MOVE ]: '"{name}" nomli ustunni joyini o‘zgartirdi',
		[ PERMISSION_TYPE.PROJECT_MEMBER.CREATE ]: '"{employeeNames}" nomli xodim(lar)ni loyihaga qo‘shdi',
		[ PERMISSION_TYPE.PROJECT_MEMBER.DELETE ]: '"{employeeName}" nomli xodimni loyihadan chiqarib yubordi',
		[ PERMISSION_TYPE.PROJECT_TAG.CREATE ]: '"{name}" nomli loyiha belgisini yaratdi',
		[ PERMISSION_TYPE.PROJECT_TAG.UPDATE ]: '"{name}" nomli loyiha belgisini tahrirladi',
		[ PERMISSION_TYPE.PROJECT_TAG.DELETE ]: '"{name}" nomli loyiha belgisini o‘chirdi',
		[ PERMISSION_TYPE.PROJECT.CREATE ]: 'bu loyiha yaratildi',
		[ PERMISSION_TYPE.PROJECT.UPDATE ]: 'loyihani tahrirladi',
		[ PERMISSION_TYPE.PROJECT.CHANGE_BACKGROUND ]: 'loyihaning orqa fonini o‘zgartirdi',
		[ PERMISSION_TYPE.TASK_ATTACHMENT.CREATE ]: '"{taskName}" nomli vazifaga "{fileName}" nomli faylni biriktirdi',
		[ PERMISSION_TYPE.TASK_ATTACHMENT.DELETE ]: '"{taskName}" nomli vazifadan "{fileName}" nomli faylni o‘chirib yubordi',
		[ PERMISSION_TYPE.TASK_COMMENT.CREATE ]: '"{taskName}" nomli vazifada "{dateTime}"da izoh qoldirdi',
		[ PERMISSION_TYPE.TASK_COMMENT.UPDATE ]: '"{taskName}" nomli vazifadagi izohini "{dateTime}"da tahrirladi',
		[ PERMISSION_TYPE.TASK_COMMENT.DELETE ]: '"{taskName}" nomli vazifadagi izohini "{dateTime}"da o‘chirdi',
		[ PERMISSION_TYPE.TASK_DEADLINE.CREATE ]: '"{taskName}" nomli vazifaga muddat belgiladi',
		[ PERMISSION_TYPE.TASK_DEADLINE.UPDATE ]: '"{taskName}" nomli vazifadagi muddatni o‘zgartirdi',
		[ PERMISSION_TYPE.TASK_DEADLINE.DELETE ]: '"{taskName}" nomli vazifadagi muddatni o‘chirib yubordi',
		[ PERMISSION_TYPE.TASK_MEMBER.CREATE ]: '"{taskName}" nomli vazifaga "{employeeName}" nomli xodimni qo‘shdi',
		[ PERMISSION_TYPE.TASK_MEMBER.DELETE ]: '"{taskName}" nomli vazifadan "{employeeName}" nomli xodimni o‘chirdi',
		[ PERMISSION_TYPE.TASK_TAG.CREATE ]: '"{taskName}" nomli vazifaga "{tagName}" nomli belgi qo‘shdi',
		[ PERMISSION_TYPE.TASK_TAG.DELETE ]: '"{taskName}" nomli vazifadan "{tagName}" nomli belgini o‘chirdi',
		[ PERMISSION_TYPE.TASK_TIMER.START ]: '"{taskName}" nomli vazifaning hisoblagichini "{dateTime}"da ishga tushirdi',
		[ PERMISSION_TYPE.TASK_TIMER.STOP ]: '"{taskName}" nomli vazifaning hisoblagichini "{dateTime}"da to‘xtatdi',
		[ PERMISSION_TYPE.TASK.CREATE ]: '"{name}" nomli vazifa yaratdi',
		[ PERMISSION_TYPE.TASK.UPDATE ]: '"{name}" nomli vazifani tahrirladi',
		[ PERMISSION_TYPE.TASK.DELETE ]: '"{name}" nomli vazifani o‘chirdi',
		[ PERMISSION_TYPE.TASK.COPY ]: '"{originalName}" nomli vazifadan "{newName}" nomli nusxa yaratdi',
		[ PERMISSION_TYPE.TASK.MOVE + 'migrate' ]: '"oldProjectName" nomli loyihadan "{taskName}" nomli vazifani ko‘chirib olib keldi',
		[ PERMISSION_TYPE.TASK.MOVE + 'move' ]: '"{taskName}" nomli vazifani "{oldColumnName}" nomli ustundan "{newColumnName}" nomli ustunga ko‘chirdi',
		[ PERMISSION_TYPE.TASK.MOVE + 'reorder' ]: '"{taskName}" nomli vazifani joyini o‘zgartirdi',
	},
	boardColumn: {
		addTask: 'Vazifa qo‘shish',
		commentedCard: 'vazifani izohladi',
	},
	profileMenuModal: {
		editProfile: 'Profilni tahrirlash',
		uploadPhoto: 'Foto yuklash'
	},
	COLUMN_KANBAN_TYPE: {
		'TO DO': 'YANGI',
		'IN PROGRESS': 'JARAYONDA',
		'DONE': 'BAJARILGAN',
		'VERIFY': 'TEKSHIRISH',
		'ARCHIVE': 'ARXIV',
	},
	TASK_LEVEL_TYPE: {
		HIGH_LEVEL: 'Yuqori',
		NORMAL_LEVEL: 'O‘rta',
		LOW_LEVEL: 'Past',
	},
	TASK_PRIORITY_TYPE: {
		HIGH_PRIORITY: 'Yuqori',
		NORMAL_PRIORITY: 'O‘rta',
		LOW_PRIORITY: 'Past',
	},
	TASK_COMMENT_TYPE: {
		INFORMATION: 'Axborot',
		PROBLEM: 'Muammo',
		SOLUTION: 'Yechim',
	},
	TASK_STATUS_TYPE: {
		RED: 'Muddati o‘tgan',
		YELLOW: 'Tugayotgan',
		GREEN: 'Muddati bor',
		BLUE: 'Muddati yo‘q',
	},
	TASK_TIMER_TYPE: {
		START: 'Boshlash',
		STOP: 'To‘xtatish',
	},
	createTask: 'Vazifa yaratish',
	taskTitle: 'Vazifa nomini kiriting',
	nameIsRequired: '«Vazifa nomi» ni kiritish shart!',
	thereIsNoData: 'Ma\'lumot yo‘q',
	projectIsRequired: 'Loyihani tanlash shart',
	status: 'Holat',
	statusIsRequired: 'Ustunni tanlash shart',
	filter: 'Filtr',
	search: 'Qidirish',
	nameProject: 'Loyiha nomi',
	taskName: 'Vazifa nomi',
	deadline: 'Topshirish muddati',
	cancel: 'Bekor qilish',
	add: 'Qo‘shish',
	fullName: 'F.I.O',
	userName: 'Foydalanuvchi nomi',
	birthday: 'Tug‘ilgan sana',
	edit: 'Tahrirlash',
	delete: 'O‘chirish',
	addUser: 'Foydalanuvchini qo‘shish',
	uploadPhoto: 'Foto yuklash',
	password: 'Parol',
	name: 'Nom',
	firstName: 'Ism',
	lastName: 'Familiya',
	middleName: 'Sharif',
	language: 'Til',
	email: 'E-mail',
	save: 'Saqlash',
	userEditing: 'Foydalanuvchini tahrirlash',
	editPhoto: 'Rasmni tahrirlash',
	addRole: 'Rol qo‘shish',
	nameRequiredField: 'Ismni kiritish shart',
	codeName: 'Kod nom',
	codenameRequiredField: 'Kod nom kiritish shart',
	id: 'ID',
	accessQuantity: 'Huquqlar soni',
	permissions: 'Huquqlar',
	editRole: 'Rolni tahrirlash',
	availablePermissions: 'Mavjud huquqlar',
	resolution: 'Rezolutsiya',
	editPermissions: 'Huquqlarni tahrirlash',
	normal: 'Oddiy',
	shownWith: 'ko‘rsatish',
	by: 'gacha',
	of: 'dan',
	emailAddress: 'Elektron pochta manzili',
	profile: 'Profil',
	rememberMyPreference: 'Mening afzalliklarimni saqlash',
	submit: 'Yuborish',
	downloadExcel: 'Excelda yuklash',
	day: 'Kun',
	week: 'Hafta',
	month: 'Oy',
	year: 'Yil',
	monday: 'Dushanba',
	tuesday: 'Seshanba',
	wednesday: 'Chorshanba',
	thursday: 'Payshanba',
	friday: 'Juma',
	saturday: 'Shanba',
	sunday: 'Yakshanba',
	total: 'Jami',
	january: 'Yanvar',
	february: 'Fevral',
	mart: 'Mart',
	april: 'Aprel',
	may: 'May',
	june: 'Iyun',
	july: 'Iyul',
	august: 'Avgust',
	september: 'Sentyabr',
	october: 'Oktyabr',
	november: 'Noyabr',
	december: 'Dekabr',
	choose: 'Tanlash',
	executor: 'Ijrochi',
	priority: 'Muhimlik darajasi',
	deadlineLast: ' Oxirgi muddat',
	timeSpent: 'Sarflangan vaqt',
	menuW: 'Menyu',
	taskSearch: 'Vazifa qidirish',
	taskStatus: 'Vazifa holati',
	changeBackground: 'Orqa fonni o‘zgartirish',
	projectSettings: 'Loyiha sozlash',
	actionsAndComments: 'Izohlar & Harakatlar',
	actions: 'Harakatlar',
	enterSearchTerm: 'Qidiruv so‘zini kiriting: so‘z, belgi, ism yoki vazifa muddati',
	column: 'Ustun',
	attachment: 'Fayl yuklash',
	changeAttachment: 'Havola nomini yangilash',
	linkName: 'Link nomi',
	hideSelected: 'Belgilanganlarni bekitish',
	showTagged: 'Belgilanganlarni ko‘rsatish',
	tagSomeone: 'Belgilar',
	taskParticipants: 'Vazifa ishtirokchilari',
	description: 'Tavsif',
	tags: 'Belgilar',
	members: 'Ishtirokchilar',
	deadlineS: 'Vazifa muddati',
	notSet: 'o‘rnatilmagan',
	kvartalOne: 'kvartal - 1',
	kvartalTwo: 'kvartal - 2',
	kvartalThree: 'kvartal - 3',
	kvartalFour: 'kvartal - 4',
	addTags: 'Belgi qo‘shish',
	kvartal: 'kvartal',
	copyCard: 'Vazifani nusxalash',
	copy: 'Nusxalash',
	copyTo: '...ga nusxalash',
	moveCard: 'Vazifani ko‘chirish',
	position: 'O‘rin',
	move: 'Ko‘chirish',
	difficultyLevel: 'Qiyinlik darajasi',
	taskCompletionDate: 'Topshiriqni bajarish sanasi',
	date: 'Sana',
	time: 'Vaqt',
	hour: 'Soat',
	minute: 'Daqiqa',
	chooseDateTime: 'Sana vaqtini tanlang',
	remove: 'Olib tashlash',
	checkList: 'Nazorat ro‘yxati',
	addTaskList: 'Nazorat ro‘yxatini qo‘shish',

	phoneNumber: 'Telefon raqami',
	changePassword: 'Parolni o‘zgartirish',
	currentPassword: 'Joriy parol',
	fieldRequired: 'Majburiy maydon',
	minimumRequired: 'Minimal 6ta belgini kiritish kerak',
	passwordRepeatNew: 'Yangi parolni qayta tering',
	fieldNewPassword: 'Yangi parol bilan mos kelmayapti',
	logout: 'Chiqish',
	boardMembers: 'kengash a\'zolari',
	invite: 'Taklif qilish',
	inviteBoard: 'Loyihaga taklif qilish',
	searchEmployeeName: 'Xodimning ismini kiritish',
	workerFound: 'Ishchi topilmadi',
	addList: 'Ustun qo‘shish',
	addNewColumn: 'Yangi ustun qo‘shish',
	createProject: 'Loyiha yaratish',
	all: 'Hammasi',
	manager: 'Menejer',
	managers: 'Menejerlar',
	percent: 'Foiz',
	group: 'Guruh',
	typeProject: 'Loyiha ko‘rinishi',
	editProject: 'Loyihani tahrirlash',
	create: 'Yaratish',
	teamName: 'Guruh nomi',
	departments: 'Bo‘limlar',
	BranchMaintenanceTerminals: 'Filialga xizmat ko‘rsatish terminallari',
	nameEmployee: 'Hodim F.I.Sh',
	more: 'Ko‘p',
	areYouSure: 'Ishonchingiz komilmi?',
	cannotUndoAction: 'Siz ushbu amalni bekor qilolmaysiz',
	deleteTask: 'Vazifani o‘chirish',
	saveAsPdf: 'PDFda saqlash',
	close: 'yopish',
	permission: {
		AUTH_TRY_CREATE: 'Avtorizatsiyani yaratish',
		AUTH_TRY_READ: 'Avtorizatsiyani ko‘rish',
		BACKGROUND_CREATE: 'Fon yaratish',
		BACKGROUND_DELETE: 'Fonni o‘chirish',
		BACKGROUND_READ: 'Fonni ko‘rish',
		BACKGROUND_UPDATE: 'Fonni yangilash',
		CERTIFICATE_UPDATE: 'Sertifikatni yangilash',
		CHECKLIST_GROUP_CREATE: 'Nazorat ro‘yxatini yaratish',
		CHECKLIST_GROUP_DELETE: 'Nazorat ro‘yxatini o‘chirish',
		CHECKLIST_GROUP_READ: 'Nazorat ro‘yxatini ko‘rish',
		CHECKLIST_GROUP_UPDATE: 'Nazorat ro‘yxatini yangilash',
		COIN_CREATE_AND_UPDATE: 'Nazorat ro‘yxatini yaratish va yangilash',
		COIN_READ: 'Nazoratni ko‘rish',
		EMPLOYEE_ALL_WITH_PHOTO: 'Foydalanuvchilarni hamma rasmi bilan',
		EMPLOYEE_CREATE: 'Foydalanuvchilarni yaratish',
		EMPLOYEE_DELETE: 'Foydalanuvchilarni o‘chirish',
		EMPLOYEE_READ: 'Foydalanuvchilarni ko‘rish',
		EMPLOYEE_UPDATE: 'Foydalanuvchilarni yangilash',
		ERROR_MESSAGE_CREATE: 'Xatolik haqida xabarni yaratish',
		ERROR_MESSAGE_DELETE: 'Xatolik haqida xabarni o‘chirish',
		ERROR_MESSAGE_READ: 'Xatolik haqida xabarni ko‘rish',
		ERROR_MESSAGE_UPDATE: 'Xatolik haqida xabarni yangilash',
		FILE_STORAGE_CREATE: 'Fayl omborini yaratish',
		FILE_STORAGE_READ: 'Fayl omborini ko‘rish',
		GROUP_CREATE: 'Guruh yaratish',
		GROUP_DELETE: 'Guruhni o‘chirish',
		GROUP_READ: 'Guruhni ko‘rish',
		GROUP_UPDATE: 'Guruhni yangilash',
		LANGUAGE_READ: 'Tilni ko‘rish',
		PERMISSION_CREATE: 'Huquqni yaratish',
		PERMISSION_DELETE: 'Huquqni o‘chirish',
		PERMISSION_READ: 'Huquqni ko‘rish',
		PERMISSION_UPDATE: 'Huquqlarni yangilash',
		PROJECT_CHANGE_PHOTO: 'Loyiha rasmini o‘zgartirish',
		PROJECT_COLUMN_CREATE: 'Loyiha ustunini yaratish',
		PROJECT_COLUMN_DELETE: 'Loyiha ustunini o‘chirish',
		PROJECT_COLUMN_READ: 'Loyiha ustunini ko‘rish',
		PROJECT_COLUMN_READ_DETAILS: 'Loyiha ustutinini batafsil ko‘rish',
		PROJECT_COLUMN_UPDATE: 'Loyiha ustunini yangilash',
		PROJECT_CREATE: 'Loyihani yaratish',
		PROJECT_DELETE: 'Loyihani o‘chirish',
		PROJECT_MEMBER_CREATE: 'Loyiha ishtirokchilarini yaratish',
		PROJECT_MEMBER_READ: 'Loyiha ishtirokchilarini ko‘rish',
		PROJECT_MEMBER_READ_EMPLOYEE: 'Loyihaga biriktirilgan ishtirokchilarni ko‘rish',
		PROJECT_READ: 'Loyihani ko‘rish',
		PROJECT_READ_DETAILS: 'Loyihani batafsil ko‘rish',
		PROJECT_TAG_CREATE: 'Loyiha belgilarini yaratish',
		PROJECT_TAG_DELETE: 'Loyiha belgilarini o‘chirish',
		PROJECT_TAG_READ: 'Loyiha belgilarini ko‘rish',
		PROJECT_TAG_UPDATE: 'Loyiha belgilarini yangilash',
		PROJECT_UPDATE: 'Loyihani yangilash',
		ROLE_ATTACH_PERMISSION: 'Huquqlarni rollarga biriktirish',
		ROLE_CREATE: 'Rol yaratish',
		ROLE_DELETE: 'Rol o‘chirish',
		ROLE_READ: 'Rol ko‘rish',
		ROLE_UPDATE: 'Rol yangilash',
		SUB_TYPE_CREATE: 'Tip-osti yaratish',
		TASK_ACTION_READ: 'Vazifa harakatlarini ko‘rish',
		TASK_ATTACHMENT_CREATE: 'Vazifaga faylni biriktirish',
		TASK_ATTACHMENT_READ: 'Vazifa fayllarini ko‘rish',
		TASK_CHECK_CREATE: 'Vazifa tekshirishni yaratish',
		TASK_CHECK_DELETE: 'Vazifa tekshirishni o‘chirish',
		TASK_CHECK_READ: 'Vazifa tekshirishni ko‘rish',
		TASK_CHECK_UPDATE: 'Vazifa tekshirishni yangilash',
		TASK_COMMENT_CREATE: 'Vazifaga izoh yaratish',
		TASK_COMMENT_DELETE: 'Vazifa izohlarini o‘chirish',
		TASK_COMMENT_READ: 'Vazifa izohlarini ko‘rish',
		TASK_COMMENT_UPDATE: 'Vazifa izohlarini yangilash',
		TASK_CREATE: 'Vazifa yaratish',
		TASK_CREATE_TIME: 'Vazifa muddatini yaratish',
		TASK_DELETE: 'Vazifani o‘chirish',
		TASK_MEMBER_CREATE: 'Vazifa ishtirokchilarni yaratish',
		TASK_MEMBER_DELETE: 'Vazifa ishtirokchilarini o‘chirish',
		TASK_MEMBER_READ: 'Vazifa ishtirokchilarini ko‘rish',
		TASK_MOVE: 'Vazifani ko‘chirdi',
		TASK_READ: 'Vazifani ko‘rish',
		TASK_READ_DETAILS: 'Vazifa tafsilotlarini ko‘rish',
		TASK_TAG_CREATE: 'Vazifa tafsilotlarini yaratish',
		TASK_TAG_DELETE: 'Vazifa tafsilotlarini o‘chirish',
		TASK_TAG_READ: 'Vazifa tafsilotlarini ko‘rish',
		TASK_TAG_UPDATE: 'Vazifa tafsilotlarini yangilash',
		TASK_UPDATE: 'Vazifani yangilash',
		TYPE_CREATE: 'Turni yaratish',
		TYPE_DELETE: 'Turni o‘chirish',
		TYPE_READ: 'Turni ko‘rish',
		TYPE_UPDATE: 'Turni yangilash',
		USER_ATTACH_ROLE: 'Foydalanuvchini biriktirish roli',
		USER_CREATE: 'Foydalanuvchini yaratish',
		USER_DELETE: 'Foydalanuvchini o‘chirish',
		USER_READ: 'Foydalanuvchini ko‘rish',
		USER_UPDATE: 'Foydalanuvchini yangilash',
		REPORT_KANBAN_PROJECT_MANAGER_AND_MEMBER: 'Kanban loyihasidagi hisobot menejeri va a\'zosi',
		REPORT_TRELLO_PROJECT_MANAGER_AND_MEMBER: 'Trello loyihasidagi hisobot menejeri va a\'zosi',
		REPORT_CHART_KANBAN_PROJECT: 'Kanban loyhasidagi hisobot jadvali',
		REPORT_CHART_TRELLO_PROJECT: 'Trello loyhasidagi hisobot jadvali',
		REPORT_KANBAN_TRELLO_PROJECT_WITH_USER: 'Kanban va Trello loyhasidagi foydalanuvchi hisoboti',
		REPORT_TIME_LEFT: 'Hisobotga vaqti qoldi',
		REPORT_MANAGERS_MEMBERS_UPLOAD: 'Hisobot menejerlarini va a\'zolarini yuklaydi',
		REPORT_PERSONAL_UPLOAD: 'Shaxsiy yuklash haqida xabar berish',
		REPORT_TIME_LEFT_UPLOAD: 'Hisobotni yuklash vaqti',
		TASK_COPY: 'Vazifa nusxasini ko‘chirish',
		USER_LAST_LOGIN_CREATE: 'Foydalanuvchini oxirgi kirishni yaratish',
		USER_LAST_LOGIN_READ: 'Foydalanuvchini oxirgi kirishni ko‘rish',
		MANAGER_RENAME_TASK_PROJECT: 'Menejer nomini o‘zgartirish loyihasi',
		ORGANIZATION_CREATE: 'Tashkilot Yaratish',
		ORGANIZATION_UPDATE: 'Tashkilotni Tahrirlash',
		ORGANIZATION_DELETE: 'Tashkilotni O‘chirish',
		ORGANIZATION_READ: 'Tashkilotni ko‘rish',
		EMPLOYEE_PASSWORD_CHANGE: 'Parolni tiklash',
		EMPLOYEE_PROFILE_UPDATE: 'Profilni tahrirlash',
		ALARM_READ: 'Signalni ko‘rish',
		ALARM_UPDATE: 'Signalni tahrirlash',
		PROJECT_ARCHIVE: 'Loyihani arxivlash',
	},
	createLabel: 'Belgi yaratish',
	newPassword: 'Yangi parol',
	comments: 'Sharhlar',
	nameOfEmployees: 'Xodimlarning ismi sharifi',
	notifications: 'Xabarnoma',
	markAllAsRead: 'Barchasini o‘qilgan deb belgilash',
	deleteAll: 'Barchasini o‘chirish',
	allRightsReserved: 'Barcha huquqlar himoyalangan',
	noList: 'Ro‘yxat yo‘q',
	newName: 'Yangi nom',
	indicateTheReasonForTheChange: 'O‘zgarish sababini ko‘rsating',
	completion: 'Tugatish',
	color: 'Rang',
	share: 'Ulashish',
	shareViaEmail: 'Email orqali ulashish',
	shareViaTelegram: 'Telegram orqali ulashish',
	writeAComment: 'Izoh qoldiring ...',
	workers: 'ishchilar',
	added: 'Qo‘shilgan:',
	hoursAgo: ' soat oldin',
	minutesAgo: ' daqiqa oldin',
	secondsAgo: ' soniya oldin',
	in: '',
	addElement: 'Element qo‘shish',
	taskDescription: 'Vazifalar tavsifi',
	addedATask: 'vazifa qo‘shdi',
	byTerm: 'Muddati bo‘yicha',
	taskPriority: 'Vazifa ustuvorligi',
	taskDifficultyLevel: 'Vazifaning qiyinchilik darajasi',
	notDone: 'Tugallanmagan',
	completed: 'Tugallandi',
	overdue: 'Kechiktirilgan',
	expires: 'Muddati tugaydi',
	enough: 'Yetarli',
	notDelivered: 'Yetkazib berilmadi',
	complicated: 'Qiyin',
	easy: 'Engil',
	enoughTime: 'Vaqt yetarli',
	qrPaymentVending: 'QR to‘lovlari savdosi',
	toDo: 'Qilmoq',
	electronicTaskManagement: 'Elektron topshiriqlarni boshqarish',
	attachRole: 'Rolni biriktiring',
	searchCodeName: 'Qidiruv kod nomi',
	statusNameOfBoards: 'Holati (ustunlar nomi)',
	performers: 'Ijrochilar',
	pleaseCheckOneOrMoreUsers: 'Iltimos, bir yoki bir nechta foydalanuvchini tekshiring!',
	pleaseChooseATeamLeader: 'Iltimos, guruh rahbarini tanlang!',
	confirmDelete: 'Haqiqatan ham o‘chirmoqchimisiz?',
	WEEKLY_INTERVAL: 'Hafta',
	MONTHLY_INTERVAL: 'Oy',
	QUARTER_INTERVAL: 'Kvartal',
	YEARLY_INTERVAL: 'Yil',
	thisWeek: 'Bu hafta',
	lastWeek: 'O‘tgan hafta',
	last7Days: 'So‘nggi 7 kun',
	instruction: 'Qo‘llanma',
	guideVideo: 'Video',
	guidePDF: 'PDF xujjatlar',
	guidePPT: 'Taqdimot',
	noTaskFound: 'Vazifa topilmadi!',
	searchInThisProject: '"{message}" loyihada',
	paginationText: ' Ko‘rsatilgan: {shownText} dan {fromText} gacha {toText} tadan',
	wasOnline: 'Online edi',
	searchResult: 'ta qidiruv natijasi',
	board: 'Ustun',
	list: 'Ro‘yxat',

	Changed: 'O‘zgartirilgan',
	successfullyDeleted: 'O‘chirildi!',
	FileUploadedSuccessfully: 'Fayl yuklandi!',
	passwordChanged: 'Sizning parolingiz muvaffaqiyatli o‘zgartirildi!',
	profileEdited: 'Profilingiz muvaffaqiyatli tahrirlandi!',
	SuccessfullyUpdated: 'Yangilandi!',
	EditedBy: 'Tomonidan tahrirlangan',
	SuccessfullyAdded: 'Qo‘shildi!',
	SuccessfullyCreated: 'Yaratildi!',
	SuccessfullyChanged: 'O‘zgartirildi!',
	SuccessfullySent: 'Yuborildi!',
	TheTimerIsRunning: 'Taymer ishlamoqda!',
	TimerStopped: 'Taymer to‘xtadi',
	Added: 'Qo‘shildi',
	DeadlineSuccessfully: 'Muddati o‘zgardi!',

	select: 'Tanlang',
	projectType: 'Loyiha turi',
	columnName: 'Ustun nomi',
	notAvailable: 'Mavjud emas',
	deadlineType: 'Muddat turi',
	deadlineDate: 'Muddat sanasi',
	hasNoDeadline: 'Muddati yo‘q',
	inNextDay: 'Keyingi kun',
	inNextWeek: 'Keyingi hafta',
	inNextMonth: 'Keyingi oy',
	roleAbsent: 'Rol mavjud emas',
	columns: 'Ustunlar',
	organizationName: 'Tashkilot nomi',
	register: 'Ro‘yxatdan o‘tish',
	login: 'Kirish',
	back: 'Orqaga',
	confirm: 'Tasdiqlash',
	confirmationCode: 'Tasdiqlash kodi',
	confirmationCodeSent: 'Tasdiqlash kodi {email} email manziliga va {phoneNumber} telefon raqamiga yuborildi',
	confirmationCodeSentSmall: 'Tasdiqlash kodi {text} ga yuborildi',
	passwordRepeat: 'Parolni qayta kiriting',
	forgotPassword: 'Parolni unutdingizmi?',
	resend: 'Qayta yuborish',
	pasteScreenshot: 'Skrinshotni shu yerga qo‘ying',
	crudCreate: 'Yangi {text} yaratish',
	crudEdit: '"{name}" nomli {table}ni tahrirlash',
	crudRead: '"{name}" nomli {table}ni ko‘rish',
	crudPasswordReset: '"{name}" nomli foydalanuvchining parolini tiklash',
	teamLeader: 'Jamoa rahbari',
	photo: 'Rasm',
	clear: 'Tozalash',
	selectedUsers: 'Tanlangan foydalanuvchilar',
	table: 'Jadval | Jadvallar',
	other: 'Boshqa | Boshqalar',
	tasksIamAssigned: 'Menga topshirilgan vazifalar',
	editInDashboard: 'Doskada tahrirlash',
	createdDate: 'Yaratilgan vaqt',
	deadlineStartDate: 'Muddat boshlanish vaqti',
	deadlineEndDate: 'Muddat tugash vaqti',
	systemAdmin: 'Tizim boshqaruvchisi',
	notSpecified: 'Ko‘rsatilmagan',
	passwordRecovery: 'Parolni tiklash',
	projectInDashboard: '"{name}" nomli loyiha – Doska',
	meta: {
		description: {
			login: 'ETM Kirish - tizimga kirish sahifasi',
			registration: 'ETM Ro‘yxatdan o‘tish - yangi foydalanuvchilar uchun ro‘yxatdan o‘tish sahifasi',
			recovery: 'ETM Qayta tiklash - foydalanuvchilar uchun parolni tiklash sahifasi',
		},
		keywords: {
			login: 'kirish, kirmoq, ruxsat',
			registration: 'ro‘yxatdan o‘tish, hisob, profil, ruxsat',
			recovery: 'qayta tiklash, parol, unutmoq, ruxsat',
		},
	},
	systemCreated: 'Tizimda yaratilgan',
	unknown: 'Noma’lum',
};