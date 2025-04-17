import Moment from 'moment';
import Vue from 'vue';



Vue.filter('filterDate', (val) => {
	return Moment(val).isValid() ? Moment(val).format('D.MM.YYYY') : '';
});

Vue.filter('filterDateTime', (val) => {
	return Moment(val).isValid() ? Moment(val).format('D.MM.YYYY, HH:mm:ss') : '';
});

Vue.filter('filterDateTime2', (val) => {
	return Moment(val).isValid() ? Moment(val).format('DD.MM.YYYY, HH:mm') : '';
});

Vue.filter('filterTimeDate', (val) => {
	return Moment(val).isValid() ? Moment(val).format('HH:mm:ss, D.MM.YYYY') : '';
});

Vue.filter('filterTimeMonth', (val) => {
	return Moment(val).isValid() ? Moment(val).format('HH:mm:ss, D MMMM') : '';
});

Vue.filter('filterMonthTime', (val) => {
	return Moment(val).isValid() ? Moment(val).format('D MMMM, HH:mm:ss') : '';
});

Vue.filter('filterMonth', (val) => {
	return Moment(val).isValid() ? Moment(val).format('D MMMM') : '';
});

Vue.filter('filterDateMonth', (val) => {
	return Moment(val).isValid() ? Moment(val).format('D MMMM YYYY') : '';
});




Vue.filter('filterTimeDateStr', (val) => {
	return val ? val.split(' ').reverse().join(' ') : '';
});

Vue.filter('filterTimeLeftMinutes', (val) => {
	if (typeof val === 'number') {
		let duration = Moment.duration(val, 'minutes');
		return (duration.asDays() > 9 ? Math.floor(duration.asDays()) : '0' + Math.floor(duration.asDays())) + ':' +
			(duration.hours() > 9 ? duration.hours() : '0' + duration.hours()) + ':' +
			(duration.minutes() > 9 ? duration.minutes() : '0' + duration.minutes());
	}

	return '';
});

Vue.filter('filterTimeSeconds', (val) => {
	if (!Number.isFinite(val)) {
		return '';
	}

	const duration = Moment.duration(val, 'seconds');
	const time = [];

	if (duration.asDays() > 1) time.push(Math.floor(duration.asDays()) + 'd');
	if (duration.hours() > 0) time.push(duration.hours() + 'h');
	if (duration.minutes() > 0) time.push(duration.minutes() + 'm');
	if (duration.seconds() > 0) time.push(duration.seconds() + 's');

	return time.join(', ');
});

Vue.filter('filterPhoneNumber', (val) => {
	return val ? '(' + val.slice(0, 2) + ') ' + val.slice(2, 5) + '-' + val.slice(5, 7) + '-' + val.slice(7) : '';
});
