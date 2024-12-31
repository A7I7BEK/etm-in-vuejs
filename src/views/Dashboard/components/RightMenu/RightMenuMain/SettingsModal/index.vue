<script>
	import BaseModal from '../../../../../../components/BaseModal';
	import FormService from '../../../../../../services/FormService';
	import { required, minValue } from 'vuelidate/lib/validators';


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
		data()
		{
			return {
				model: new FormService({
					id: this.$store.state.projectData.id,
					name: this.$store.state.projectData.name,
					codeName: this.$store.state.projectData.codeName,
					group: {
						id: this.$store.state.projectData.group.id
					},
					manager: {
						id: this.$store.state.projectData.manager ? this.$store.state.projectData.manager.id : 0
					},
					organizationId: this.$store.state.projectData.organizationId,
				}),
				groupList: [],
				managerList: [],
			};
		},
		validations: {
			model: {
				name: {
					required,
				},
				codeName: {
					required,
				},
				group: {
					id: {
						required,
						minValue: minValue(1),
					},
				},
				manager: {
					id: {
						required,
						minValue: minValue(1),
					},
				},
			},
		},
		watch: {
			'starter'()
			{
				this.GetGroupList();
				this.GetManagerList();
			}
		},
		mounted()
		{
			$('#settingsModal').on('hidden.bs.modal', () => {
				this.model.Reset();
				this.$v.$reset();
			});
		},
		methods: {
			GetGroupList()
			{
				this.$api
					.get('/groups')
					.then(response => {
						this.groupList = response.data.data;
					});
			},
			GetManagerList()
			{
				this.$api
					.get('/employees', {
						params: {
							'isManager': true,
						}
					})
					.then(response => {
						this.managerList = response.data.data;
					});
			},
			Save()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}

				this.$api
					.put('projects/' + this.model.id, this.model.GetData())
					.then(response => {
						this.$store.state.projectData.name = response.data.name;
						this.$store.state.projectData.codeName = response.data.codeName;
						this.$store.state.projectData.group = response.data.group;
						this.$store.state.projectData.members = response.data.members;
						this.$store.state.projectData.manager = response.data.manager;

						$('#settingsModal').modal('hide');
					});
			},
		}
	};
</script>

<template src="./template.html"></template>