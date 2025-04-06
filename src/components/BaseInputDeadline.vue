<template>
	<div class="form-group">
		<label
			class="az_base_lbl"
			:class="labelClass"
		>{{ labelText }}</label>


		<datepicker
			class="az_base_datepicker"
			:class="[ { 'ftr': isFilter }, datepickerClass ]"
			:input-class="{ 'az_base_inp': true, ...computedInputClass }"
			:language="lang[ $i18n.locale ]"
			bootstrap-styling
			v-bind="{
				'format': 'd.MM.yyyy',
				'full-month-name': true,
				'disabled-dates': {
					to: disableTo ? new Date() : null,
					from: disableFrom ? new Date() : null,
				},
				'placeholder': $t('select'),
				'monday-first': true,
				'clear-button': true,
				'clear-button-icon': 'fa fa-times',
				...$attrs
			}"
			v-model="model"
		></datepicker>

	</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { en, ru, uz } from '../assets/vuejs-datepicker/locale/index';



export default {
	name: 'BaseInputDeadline',
	components: {
		Datepicker,
	},
	inheritAttrs: false,
	props: {
		value: {
			type: [ Date, String ],
			default: null,
		},
		labelClass: {
			type: [ String, Object, Array ],
			default: null,
		},
		labelText: {
			type: String,
			default: 'Label',
		},
		datepickerClass: {
			type: [ String, Object, Array ],
			default: null,
		},
		inputClass: {
			type: [ String, Object ],
			default: null,
		},
		isFilter: {
			type: Boolean,
			default: false,
		},
		disableTo: {
			type: Boolean,
			default: false,
		},
		disableFrom: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			lang: {
				en,
				ru,
				uz,
			},
		};
	},
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('update:value', val);
			}
		},
		computedInputClass() {
			if (typeof this.inputClass === 'string') {
				return this.inputClass.split(' ').reduce((tot, val) => ({ ...tot, [ val ]: true }), {});
			}

			return this.inputClass;
		},
	},
};
</script>