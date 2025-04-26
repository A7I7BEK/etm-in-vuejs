<template>
	<input type="text" v-mask="config" :value="display" @input="onInput"/>
</template>

<script>
	import mask from './directive';
	import tokens from './tokens';
	import masker from './masker';


	export default {
		name: 'TheMask',
		props: {
			value: [String, Number],
			mask: {
				type: [String, Array],
				required: true
			},
			masked: { // by default emits the value unformatted, change to true to format with the mask
				type: Boolean,
				default: false // raw
			},
			tokens: {
				type: Object,
				default: () => tokens
			}
		},
		directives: { mask },
		data()
		{
			return {
				lastValue: null, // avoid unecessary emit when has no change
				display: this.value
			};
		},
		watch: {
			value(newValue)
			{
				if (newValue === this.lastValue)
				{
					return; // stop value from reiteration
				}

				this.lastValue = this.display = newValue;
			},
		},
		computed: {
			config()
			{
				return {
					mask: this.mask,
					tokens: this.tokens,
				};
			}
		},
		methods: {
			onInput(e)
			{
				if (e.isTrusted)
				{
					return;
				} // ignore native event

				this.display = e.target.value; // imitating v-model
				let value = this.display;


				if (!this.masked)
				{
					value = masker(value, this.mask, false, this.tokens);
				}

				this.lastValue = value;
				this.$emit('input', value);
			},
		}
	};
</script>
