<template>
	<select
		class="form-control az_base_inp"
		:value="value"
		@change="$emit('input', +$event.target.value)"
	>
		<option
			v-for="item in range"
			:value="item"
		>
			{{ item }}
		</option>
	</select>
</template>

<script>
export default {
	name: 'BaseCrudRange',
	props: {
		range: {
			type: Array,
			default: () => [ 10, 20, 50 ],
		},
		value: {
			type: Number,
			default: 10,
		},
	},
};
</script>