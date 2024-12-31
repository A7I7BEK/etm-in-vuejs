import Vue from 'vue';



Vue.directive('lowercase', {
	update(el, binding, vnode, oldVnode)
	{
		el.value = el.value.toLowerCase();
		el.dispatchEvent(new Event('input'));
	},
});