<template>
	<div class="az_action_item">
		<template v-if="activityType === 'CREATE_PROJECT'">
            <i18n data-name="CREATE_PROJECT" tag="p" path="actionItem.CREATE_PROJECT"></i18n>
		</template>

		<template v-else-if="activityType === 'DELETE_PROJECT'">
            <i18n data-name="DELETE_PROJECT" tag="p" path="actionItem.DELETE_PROJECT"></i18n>
		</template>

		<template v-else-if="activityType === 'CHANGE_PROJECT'">
            <i18n data-name="CHANGE_PROJECT" tag="p" path="actionItem.CHANGE_PROJECT">
                <template #oldProName>{{ textParams.oldProjectName }}</template>
                <template #newProName>{{ name }}</template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'INVITE_MEMBER'">
            <i18n data-name="INVITE_MEMBER" tag="p" path="actionItem.INVITE_MEMBER">
                <template #inviteUser>{{ textParams.memberName }}</template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'REMOVE_MEMBER'">
            <i18n data-name="REMOVE_MEMBER" tag="p" path="actionItem.REMOVE_MEMBER">
                <template #removeUser>{{ textParams.memberName }}</template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'ADD_PROJECT_COLUMN'">
            <i18n data-name="ADD_PROJECT_COLUMN" tag="p" path="actionItem.ADD_PROJECT_COLUMN">
                <template #addProColumn>{{ name }}</template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'UPDATE_PROJECT_COLUMN'">
            <i18n data-name="UPDATE_PROJECT_COLUMN" tag="p" path="actionItem.UPDATE_PROJECT_COLUMN">
                <template #updateNameColumn>{{ textParams.oldProjectColumnName }}</template>
                <template #newNameColumn>{{ name }}</template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'DELETED_PROJECT_COLUMN'">
            <i18n data-name="DELETED_PROJECT_COLUMN" tag="p" path="actionItem.DELETED_PROJECT_COLUMN">
                <template #text>{{ name }}</template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'CREATE_TASK'">
			<i18n data-name="CREATE_TASK" tag="p" path="actionItem.CREATE_TASK">
				<template #column>{{ textParams.projectColumnName }}</template>
				<template #task>
					<a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
					<template v-else>{{ name }}</template>
				</template>
			</i18n>
		</template>

		<template v-else-if="activityType === 'UPDATE_TASK'">
			<i18n data-name="UPDATE_TASK" tag="p" path="actionItem.UPDATE_TASK">
				<template #oldTask>{{ textParams.oldTaskName }}</template>
				<template #newTask>
					<a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
					<template v-else>{{ name }}</template>
				</template>
			</i18n>
			<div>
				<b>Changes:</b>
				<ul>
					<li v-if="textParams.name">
						Name property changed from "{{ textParams.name.oldValue }}" to "{{ textParams.name.newValue }}"
					</li>
					<li v-if="textParams.level">
						Level property changed from "{{ textParams.level.oldValue }}" to "{{ textParams.level.newValue }}"
					</li>
					<li v-if="textParams.priority">
						Priority property changed from "{{ textParams.priority.oldValue }}" to "{{ textParams.priority.newValue }}"
					</li>
				</ul>
			</div>
		</template>

		<template v-else-if="activityType === 'DELETE_TASK'">
			<i18n data-name="DELETE_TASK" tag="p" path="actionItem.DELETE_TASK">
				<template #text>{{ name }}</template>
			</i18n>
		</template>

		<template v-else-if="activityType === 'MOVE_TASK'">
            <i18n data-name="MOVE_TASK" tag="p" path="actionItem.MOVE_TASK">
                <template #task>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
                <template #oldColumn>{{ textParams.oldProjectColumnName }}</template>
                <template #newColumn>{{ textParams.newProjectColumnName }}</template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'COPY_TASK'">
            <i18n data-name="COPY_TASK" tag="p" path="actionItem.COPY_TASK">
                <template #oldTask>{{ textParams.oldTaskName }}</template>
                <template #column>{{ textParams.projectColumnName }}</template>
                <template #newTask>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'JOIN_TASK_MEMBER'">
            <i18n data-name="JOIN_TASK_MEMBER" tag="p" path="actionItem.JOIN_TASK_MEMBER">
                <template #joinMember>{{ textParams.memberName }}</template>
                <template #joinTask>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'REMOVE_TASK_MEMBER'">
            <i18n data-name="REMOVE_TASK_MEMBER" tag="p" path="actionItem.REMOVE_TASK_MEMBER">
                <template #removeUser>{{ textParams.memberName }}</template>
                <template #joinTask>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'CREATE_CHECKLIST_GROUP'">
            <i18n data-name="CREATE_CHECKLIST_GROUP" tag="p" path="actionItem.CREATE_CHECKLIST_GROUP">
                <template #createGroup>{{ textParams.checklistGroupName }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'DELETE_CHECKLIST_GROUP'">
            <i18n data-name="DELETE_CHECKLIST_GROUP" tag="p" path="actionItem.DELETE_CHECKLIST_GROUP">
                <template #deleteGroup>{{ textParams.checkListGroupName }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
        </template>

		<template v-else-if="activityType === 'CREATE_CHECKLIST_ITEM'">
            <i18n data-name="CREATE_CHECKLIST_ITEM" tag="p" path="actionItem.CREATE_CHECKLIST_ITEM">
                <template #checkListName>{{ textParams.checkListText }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'DELETE_CHECKLIST_ITEM'">
            <i18n data-name="DELETE_CHECKLIST_ITEM" tag="p" path="actionItem.DELETE_CHECKLIST_ITEM">
                <template #checkListText>{{ textParams.checkListText }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'COMPLETE_CHECKLIST_ITEM'">
            <i18n data-name="COMPLETE_CHECKLIST_ITEM" tag="p" path="actionItem.COMPLETE_CHECKLIST_ITEM">
                <template #checkListText>{{ textParams.checkListText }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'ADD_COMMENT'">
            <i18n data-name="ADD_COMMENT" tag="p" path="actionItem.ADD_COMMENT">
                <template #addComment>{{ textParams.commentText }}</template>
                <template #addName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'ADD_CHECKLIST'">
			<i18n data-name="ADD_CHECKLIST" tag="p" path="actionItem.ADD_CHECKLIST">
				<template #checkListName>{{ textParams.checkListText }}</template>
				<template #taskName>
					<a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
					<template v-else>{{ name }}</template>
				</template>
			</i18n>
		</template>

		<template v-else-if="activityType === 'CHANGE_COMMENT'">
            <i18n data-name="CHANGE_COMMENT" tag="p" path="actionItem.CHANGE_COMMENT">
                <template #changeCommentOld>{{ textParams.oldCommentText }}</template>
                <template #changeCommentNew>{{ textParams.newCommentText }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'DELETE_COMMENT'">
            <i18n data-name="DELETE_COMMENT" tag="p" path="actionItem.DELETE_COMMENT">
                <template #deleteComment>{{ textParams.commentText }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'ADD_ATTACHMENT'">
            <i18n data-name="ADD_ATTACHMENT" tag="p" path="actionItem.ADD_ATTACHMENT">
                <template #addAttachment>{{ textParams.resourceFileName }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'DELETE_ATTACHMENT'">
            <i18n data-name="DELETE_ATTACHMENT" tag="p" path="actionItem.DELETE_ATTACHMENT">
                <template #deleteAttachment>{{ textParams.attachmentName }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>

		<template v-else-if="activityType === 'ADD_DUE_DATE'">
            <i18n data-name="ADD_DUE_DATE" tag="p" path="actionItem.ADD_DUE_DATE">
                <template #addDate>{{ textParams[0].deadLine | filterTimeDateStr }}</template>
                <template #taskName>
                    <a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
                    <template v-else>{{ name }}</template>
                </template>
            </i18n>
		</template>




		<!--________________________ ABSENT ACTIVITIES +++ ________________________-->
		<template v-else-if="activityType === 'ARCHIEVE_TASK'">
			<p data-name="ARCHIEVE_TASK">{{ textParams }} {{ '||'}} {{ name }}</p>
		</template>

		<template v-else-if="activityType === 'LEFT_TASK_MEMBER'">
			<p data-name="LEFT_TASK_MEMBER">{{ textParams }} {{ '||'}} {{ name }}</p>
		</template>

		<template v-else-if="activityType === 'UPDATE_CHECKLIST_ITEM'">
			<i18n data-name="UPDATE_CHECKLIST_ITEM" tag="p" path="actionItem.UPDATE_CHECKLIST_ITEM">
				<template #deleteAttachment>{{ textParams.oldCheckListText }}</template>
				<template #taskName>
					<a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
					<template v-else>{{ name }}</template>
				</template>
			</i18n>
		</template>

		<template v-else-if="activityType === 'UPDATE_CHECKLIST_GROUP'">
			<i18n data-name="UPDATE_CHECKLIST_GROUP" tag="p" path="actionItem.UPDATE_CHECKLIST_GROUP">
				<template #updateOldGrup>{{ textParams.oldCheckListGroupName }}</template>
				<template #updateNewGrup>{{ textParams.newCheckListGroupName }}</template>
				<template #taskName>
					<a href="#" @click.prevent="showModal" v-if="clickable">{{ name }}</a>
					<template v-else>{{ name }}</template>
				</template>
			</i18n>
		</template>

		<template v-else-if="activityType === 'ADD_ATTACHMENT_COMMENT'">
			<p data-name="ADD_ATTACHMENT_COMMENT">{{ textParams }} {{ '||'}} {{ name }}</p>
		</template>

		<template v-else-if="activityType === 'CHECK_DUE_DATE'">
			<p data-name="CHECK_DUE_DATE">{{ textParams }} {{ '||'}} {{ name }}</p>
		</template>

		<template v-else-if="activityType === 'UNCHECK_DUE_DATE'">
			<p data-name="UNCHECK_DUE_DATE">{{ textParams }} {{ '||'}} {{ name }}</p>
		</template>

		<template v-else-if="activityType === 'CONVERT_CHECKLIST_ITEM'">
			<p data-name="CONVERT_CHECKLIST_ITEM">{{ textParams }} {{ '||'}} {{ name }}</p>
		</template>

		<template v-else-if="activityType === 'BACK_ARCHIEVED_TASK'">
			<p data-name="BACK_ARCHIEVED_TASK">{{ textParams }} {{ '||'}} {{ name }}</p>
		</template>
		<!--________________________ ABSENT ACTIVITIES --- ________________________-->


	</div>
</template>
<script>
	export default {
		props: {
			action: Object,
			clickable: {
				type: Boolean,
				default: true,
			}
		},
		computed: {
			activityType() {
				if (this.action.activityType) {
					return this.action.activityType.value
				}
				return null;
			},
			textParams() {
				if (this.action.textParams) {
					return JSON.parse(this.action.textParams);
				}
				return {};
			},
			name() {
				return this.action.name
			}
		},
		methods: {
			showModal() {
				this.$store.state.taskModalId = this.action.taskId
			}
		}
	}
</script>