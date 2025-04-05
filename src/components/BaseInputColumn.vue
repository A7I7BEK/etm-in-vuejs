<template>
	<div class="form-group">
		<label
			class="az_base_lbl"
			:class="labelClass"
		>{{ $t('columns') }}</label>


		<select
			class="form-control az_base_inp"
			:class="[ { 'ftr': isFilter }, inputClass ]"
			:disabled="disabled"
			v-model="model"
		>
			<option :value="0">{{ $t('select') }}</option>

			<option
				v-for="item in recordList"
				:value="item.id"
			>
				{{ item.projectType === PROJECT_TYPE.KANBAN ? $t(item.name) : item.name }}

				<template v-if="showProject"> => {{ item.project.name }}</template>
			</option>
		</select>
	</div>
</template>

<script>
import { PROJECT_TYPE } from '../constants';

export default {
	name: 'BaseInputColumn',
	props: {
		value: {
			type: Number,
			default: 0,
		},
		external: {
			type: Boolean,
			default: false,
		},
		resource: {
			type: Array,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			default: false,
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
		showProject: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			PROJECT_TYPE,
			recordList: this.resource,
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
	watch: {
		'resource'(val) {
			this.recordList = val;
		},
	},
	created() {
		if (!this.external) {
			this.GetList();
		}
	},
	methods: {
		GetList() {
			this.$api
				.get('/project-columns/selection')
				.then(response => {
					this.recordList = response.data.data;
				});
		}
	},
};
</script>