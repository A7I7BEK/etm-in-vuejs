<template>
	<div class="mw-menu__item mw-menu__checklist custom-dropdown__main" data-custom-drop>
		<a href="#" data-custom-drop-btn>
			<div class="mw-menu__item__icon">
				<i class="fa fa-check-square-o"></i>
			</div>
			<span>{{$t('checkList')}}</span>
		</a>


		<div class="custom-dropdown right" data-custom-drop-body>
			<div class="member-all__top">
				<h3>{{$t('addTaskList')}}</h3>
			</div>


			<div class="menu-checklist__content">
				<form @submit.prevent="CreateChecklistGroup">
					<div class="form-group">
						<label>{{$t('name')}}</label>
						<input class="form-control"
							   type="text"
							   :class="{'is-invalid': $v.checklistGroupName.$error}"
							   v-model="checklistGroupName"
							   :placeholder="$t('checkList')"
						>
					</div>

					<button type="submit" class="menu-checklist_add button-effect">{{$t('add')}}</button>
				</form>
			</div>
		</div>

	</div>
</template>

<script>
	import { required } from 'vuelidate/lib/validators';


	export default {
		name: 'TaskModalRightChecklist',
		data()
		{
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
			CreateChecklistGroup()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}

				this.$api
					.post('checkListGroups', {
						name: this.checklistGroupName,
						taskId: this.$store.state.taskModalData.id,
					})
					.then(response => {
						this.GetChecklistGroupAll();
						this.$v.$reset();
						this.checklistGroupName = null;
					});
			},
			GetChecklistGroupAll()
			{
				this.$api
					.get('checkListGroups', {
						params: {
							sortBy: 'id',
							taskId: this.$store.state.taskModalData.id,
						}
					})
					.then(response => {
						this.$store.state.taskModalData.checkListGroups = response.data.data;
						this.$store.state.taskModalActionStarter++;
					});
			},
		}
	};
</script>