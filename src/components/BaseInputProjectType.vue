<template>
	<div class="form-group">
		<label class="az_base_lbl" :class="labelClass">{{ $t('projectType') }}</label>


		<select class="form-control az_base_inp" :class="[{'ftr': isFilter}, inputClass]" v-model="model">
			<option :value="''">{{ $t('select') }}</option>

			<option :value="$store.state.PROJECT_TYPE_TRELLO">{{ $store.state.PROJECT_TYPE_TRELLO }}</option>
			<option :value="$store.state.PROJECT_TYPE_KANBAN">{{ $store.state.PROJECT_TYPE_KANBAN }}</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: 'BaseInputProjectType',
		props: {
			value: {
				type: String,
				default: '',
			},
			labelClass: {
				type: [String, Object, Array],
				default: null,
			},
			inputClass: {
				type: [String, Object, Array],
				default: null,
			},
			isFilter: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			model: {
				get()
				{
					return this.value;
				},
				set(val)
				{
					this.$emit('update:value', val);
				}
			}
		},
	};
</script>