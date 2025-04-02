<script>
import { minValue, required } from 'vuelidate/lib/validators';
import BaseModal from '../../../../../../components/BaseModal';
import FormService from '../../../../../../services/FormService';


export default {
	name: 'SettingsModal',
	components: {
		BaseModal,
	},
	props: {
		starter: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	data() {
		return {
			model: new FormService({
				id: this.$store.state.projectData.id,
				name: this.$store.state.projectData.name,
				groupId: this.$store.state.projectData.group.id,
				managerId: this.$store.state.projectData.manager.id,
				organizationId: 0,
			}),
			groupList: [],
			managerList: [],
		};
	},
	validations() {
		let options = {
			model: {
				name: {
					required,
				},
				groupId: {
					required,
					minValue: minValue(1),
				},
				managerId: {
					required,
					minValue: minValue(1),
				},
			}
		};

		return options;
	},
	watch: {
		'starter'() {
			this.GetGroupList();
			this.GetManagerList();
		}
	},
	mounted() {
		$('#settingsModal').on('hidden.bs.modal', () => {
			this.model.Reset();
			this.$v.$reset();
		});
	},
	methods: {
		GetGroupList() {
			this.$api
				.get('/groups')
				.then(response => {
					this.groupList = response.data.data;
				});
		},
		GetManagerList() {
			this.$api
				.get('/employees')
				.then(response => {
					this.managerList = response.data.data;
				});
		},
		Save() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			this.$api
				.put('/projects/' + this.model.id, this.model.GetData())
				.then(response => {
					const data = response.data.data;

					this.$store.state.projectData.name = data.name;
					this.$store.state.projectData.group = data.group;
					this.$store.state.projectData.members = data.members;
					this.$store.state.projectData.manager = data.manager;

					$('#settingsModal').modal('hide');
				});
		},
	}
};
</script>

<template src="./template.html"></template>