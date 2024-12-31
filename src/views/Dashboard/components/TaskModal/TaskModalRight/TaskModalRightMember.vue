<template>
	<div class="mw-menu__item mw-menu__user custom-dropdown__main" data-custom-drop>
		<a href="#" data-custom-drop-btn>
			<div class="mw-menu__item__icon">
				<i class="fa fa-users"></i>
			</div>
			<span>{{$t('members')}}</span>
		</a>

		<div class="custom-dropdown right" data-custom-drop-body>
			<div class="menu-user__dropdown__title">
				<h4>{{$t('members')}}</h4>
			</div>


			<div class="boardofusers" v-if="computedProjectMemberList.length > 0">

				<label class="boardofusers__item mb-0 cur-p"
					   v-for="item in computedProjectMemberList"
					   :key="item.id"
					   :title="item.employee.firstName + ' ' + item.employee.lastName"
				>
					<input type="checkbox" hidden v-model="item.checked" @change="ProjectMemberToggle(item)">

					<div class="boardofusers-ava">
						<img v-if="item.employee.photoUrl" :src="$store.state.url + item.employee.photoUrl">
						<strong v-else>
							{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}
						</strong>
					</div>

					<div class="user-checkbox__main">
						<div class="boardofusers__checkbox"></div>
					</div>
				</label>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TaskModalRightMember',
		computed: {
			computedProjectMemberList()
			{
				let memberList = [];

				memberList = this.$store.state.projectData.members.map(item => {
					if (this.$store.state.taskModalData.members.some(x => x.employee.id === item.employee.id))
					{
						return { ...item, 'checked': true };
					}
					return { ...item, 'checked': false };
				});

				return memberList;
			}
		},
		methods: {
			ProjectMemberToggle(item)
			{
				if (item.checked)
				{
					this.AddMember(item.projectMember.id);
				}
				else
				{
					this.DeleteMember(item.projectMember.id);
				}
			},
			AddMember(id)
			{
				this.$api
					.post('taskMembers', {
						projectMemberId: id,
						taskId: this.$store.state.taskModalData.id
					})
					.then(response => {
						this.GetTaskMemberAll();
					});
			},
			DeleteMember(id)
			{
				this.$api
					.delete('taskMembers', {
						data: {
							projectMemberId: id,
							taskId: this.$store.state.taskModalData.id
						}
					})
					.then(response => {
						this.GetTaskMemberAll();
					});
			},
			GetTaskMemberAll()
			{
				this.$api
					.get('taskMembers', {
						params: {
							taskId: this.$store.state.taskModalData.id
						}
					})
					.then(response => {
						this.$store.state.taskModalData.members = response.data.data;
						this.$store.state.taskModalActionStarter++;
					});
			},
		},
	};
</script>