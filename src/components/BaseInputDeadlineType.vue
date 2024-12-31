<template>
	<div class="form-group">
		<label class="az_base_lbl" :class="labelClass">{{ $t('deadlineType') }}</label>


		<select class="form-control az_base_inp" :class="[{'ftr': isFilter}, inputClass]" v-model="model">
			<option :value="null">{{ $t('select') }}</option>

			<option v-for="item in recordList" :value="item">{{ $t(item) }}</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: 'BaseInputDeadlineType',
		props: {
			value: {
				type: String,
				default: null,
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
		data()
		{
			return {
				recordList: [
					'hasNoDeadline',
					'inNextDay',
					'inNextWeek',
					'inNextMonth',
					'overdue',
				],
			};
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