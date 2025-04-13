<template>
	<div class="form-group">
		<label
			class="az_base_lbl"
			:class="labelClass"
		>{{ $t('projectType') }}</label>


		<select
			class="form-control az_base_inp"
			:class="[ { 'ftr': isFilter }, inputClass ]"
			v-model="model"
		>
			<option :value="''">{{ $t('select') }}</option>

			<option :value="PROJECT_TYPE.TRELLO">{{ PROJECT_TYPE.TRELLO }}</option>
			<option :value="PROJECT_TYPE.KANBAN">{{ PROJECT_TYPE.KANBAN }}</option>
		</select>
	</div>
</template>

<script>
import { PROJECT_TYPE } from '../constants';

export default {
	name: 'BaseInputProjectType',
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
			PROJECT_TYPE,
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
		}
	},
};
</script>