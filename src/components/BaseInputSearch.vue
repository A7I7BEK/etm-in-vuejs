<template>
	<div class="form-group">
		<label
			class="az_base_lbl"
			:class="labelClass"
		>
			{{ $t('search') }}
		</label>


		<input
			type="text"
			class="form-control az_base_inp"
			:class="[ { 'ftr': isFilter }, inputClass ]"
			:placeholder="$t('search')"
			v-model="model"
		>
	</div>
</template>

<script>
export default {
	name: 'BaseInputSearch',
	props: {
		value: {
			type: String,
			default: '',
		},
		labelClass: {
			type: [ String, Object, Array ],
			default: null,
		},
		inputClass: {
			type: [ String, Object, Array ],
			default: null,
		},
		isFilter: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			emitTimerId: 0,
		};
	},
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(val) {
				clearTimeout(this.emitTimerId);
				this.emitTimerId = setTimeout(() => {

					this.$emit('update:value', val);

				}, 500);
			}
		}
	},
};
</script>