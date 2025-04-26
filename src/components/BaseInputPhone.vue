<template>
	<div class="form-group">
		<label
			class="az_base_lbl"
			:class="labelClass"
		>{{ $t('phoneNumber') }}</label>


		<the-mask
			class="form-control az_base_inp"
			:class="[ { 'ftr': isFilter }, inputClass ]"
			v-bind="{
				'mask': '+998 (##) ###-##-##',
				'placeholder': '+998 (##) ###-##-##',
				...$attrs
			}"
			v-model="model"
		></the-mask>

	</div>
</template>

<script>
import { TheMask } from '../assets/plugins/vue-the-mask/src/index';


export default {
	name: 'BaseInputPhone',
	components: {
		TheMask,
	},
	inheritAttrs: false,
	props: {
		value: {
			type: String,
			default: null,
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
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('update:value', val);
			}
		}
	},
};
</script>