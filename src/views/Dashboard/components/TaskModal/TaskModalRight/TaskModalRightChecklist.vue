<template>
	<div
		class="mw-menu__item mw-menu__checklist custom-dropdown__main"
		data-custom-drop
	>
		<a
			href="#"
			data-custom-drop-btn
		>
			<div class="mw-menu__item__icon">
				<i class="fa fa-check-square-o"></i>
			</div>
			<span>{{ $t('checkList') }}</span>
		</a>


		<div
			class="custom-dropdown right"
			data-custom-drop-body
		>
			<div class="member-all__top">
				<h3>{{ $t('addTaskList') }}</h3>
			</div>


			<div class="menu-checklist__content">
				<form @submit.prevent="CreateChecklistGroup">
					<div class="form-group">
						<label>{{ $t('name') }}</label>
						<input
							class="form-control"
							type="text"
							:class="{ 'is-invalid': $v.checklistGroupName.$error }"
							v-model="checklistGroupName"
							:placeholder="$t('checkList')"
						>
					</div>

					<button
						type="submit"
						class="menu-checklist_add button-effect"
					>
						{{ $t('add') }}
					</button>
				</form>
			</div>
		</div>

	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';


export default {
	name: 'TaskModalRightChecklist',
	data() {
		return {
			checklistGroupName: null,
		};
	},
	validations: {
		checklistGroupName: {
			required
		}
	},
	methods: {
		async CreateChecklistGroup() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			await this.$api.post('/check-list-groups', {
				name: this.checklistGroupName,
				taskId: this.$store.state.taskModalData.id,
			});
			await this.GetChecklistGroupAll();

			this.checklistGroupName = null;
			this.$v.$reset();
			this.$store.state.taskModalActionStarter++;
		},
		async GetChecklistGroupAll() {
			const resp = await this.$api.get('/check-list-groups', {
				params: {
					taskId: this.$store.state.taskModalData.id,
				}
			});

			this.$store.state.taskModalData.checkListGroups = resp.data.data;
		},
	}
};
</script>