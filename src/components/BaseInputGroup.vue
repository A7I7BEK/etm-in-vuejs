<template>
	<div class="form-group">
		<label
			class="az_base_lbl"
			:class="labelClass"
		>{{ $tc('menu.team', 2) }}</label>


		<select
			class="form-control az_base_inp"
			:class="[ { 'ftr': isFilter }, inputClass ]"
			v-model="model"
		>
			<option :value="0">{{ $t('select') }}</option>

			<option
				v-for="item in recordList"
				:value="item.id"
			>
				{{ item.name }}

				<template v-if="showOrganization"> => {{ item.organization.name }}</template>
			</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'BaseInputGroup',
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
		showOrganization: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
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
				.get('/groups')
				.then(response => {
					this.recordList = response.data.data;
				});
		}
	},
};
</script>