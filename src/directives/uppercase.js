import Vue from 'vue';



Vue.directive('uppercase', {
	update(el, binding, vnode, oldVnode)
	{
		el.value = el.value.toUpperCase();
		el.dispatchEvent(new Event('input'));
	},
});