import Vue from 'vue';



Vue.directive('number', {
	update(el, binding, vnode, oldVnode)
	{
		el.value = el.value.replace(/[^0-9]/g, '');
		el.dispatchEvent(new Event('input'));
	},
});