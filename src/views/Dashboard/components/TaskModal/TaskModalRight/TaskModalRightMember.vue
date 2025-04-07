<template>
	<div
		class="mw-menu__item mw-menu__user custom-dropdown__main"
		data-custom-drop
	>
		<a
			href="#"
			data-custom-drop-btn
		>
			<div class="mw-menu__item__icon">
				<i class="fa fa-users"></i>
			</div>
			<span>{{ $t('members') }}</span>
		</a>

		<div
			class="custom-dropdown right"
			data-custom-drop-body
		>
			<div class="menu-user__dropdown__title">
				<h4>{{ $t('members') }}</h4>
			</div>


			<div
				class="boardofusers"
				v-if="computedProjectMemberList.length > 0"
			>

				<label
					class="boardofusers__item mb-0 cur-p"
					v-for="item in computedProjectMemberList"
					:key="item.id"
					:title="item.employee.firstName + ' ' + item.employee.lastName"
				>
					<input
						type="checkbox"
						hidden
						v-model="item.checked"
						@change="ProjectMemberToggle(item)"
					>

					<div class="boardofusers-ava">
						<img
							v-if="item.employee.photoFile"
							:src="$store.state.url + item.employee.photoFile.url"
						>
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
		computedProjectMemberList() {
			const memberList = [];
			const prMembers = this.$store.state.projectData.members;
			const tsMembers = this.$store.state.taskModalData.members;

			memberList = prMembers.map(item => {
				const checked = tsMembers.some(a => a.projectMember.employee.id === item.employee.id);

				return {
					...item,
					checked,
				};
			});

			return memberList;
		}
	},
	methods: {
		async GetTaskMemberAll() {
			const resp = await this.$api.get('/task-members', {
				params: {
					taskId: this.$store.state.taskModalData.id
				}
			});

			this.$store.state.taskModalData.members = resp.data.data;
			this.$store.state.taskModalActionStarter++;
		},
		async ProjectMemberToggle(item) {
			if (item.checked) {
				await this.AddMember(item.id);
			}
			else {
				await this.DeleteMember(item.id);
			}
		},
		async AddMember(id) {
			await this.$api.post('/task-members', {
				projectMemberId: id,
				taskId: this.$store.state.taskModalData.id
			});

			await this.GetTaskMemberAll();
		},
		async DeleteMember(id) {
			await this.$api.delete('/task-members', {
				data: {
					projectMemberId: id,
					taskId: this.$store.state.taskModalData.id
				}
			});

			await this.GetTaskMemberAll();
		},
	},
};
</script>