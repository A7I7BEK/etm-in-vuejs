<template>
	<div class="mw-menu__item mw-attachment">
		<a href="#">
			<div class="mw-menu__item__icon">
				<i class="fa fa-paperclip"></i>
			</div>
			<span>{{$t('attachment')}}</span>
		</a>

		<div class="attachment-upload__block">
			<label class="file-upload__label">
				<input class="file-upload__input"
					   id="upload-attachment"
					   type="file"
					   name="file-upload"
					   hidden
					   @change="SaveFile"
				>
			</label>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TaskModalRightAttachment',
		methods: {
			SaveFile(event)
			{
				if (event.target.files.length === 0)
				{
					return;
				}


				let formData = new FormData();
				formData.append('file', event.target.files[0]);


				this.$store.state.loader = true;
				this.$api
					.post('/resource/upload/file', formData)
					.then(response => {
						this.AttachFileToTask(response.data.data.id);
					})
					.finally(() => {
						event.target.value = '';
						this.$store.state.loader = false;
					});
			},
			AttachFileToTask(fileId)
			{
				this.$api
					.post('taskAttachments', {
						attachments: [
							{
								id: fileId
							}
						],
						taskId: this.$store.state.taskModalData.id
					})
					.then(response => {
						this.GetTaskAttachmentList();
						this.$notification.success(this.$t('FileUploadedSuccessfully'));
					});
			},
			GetTaskAttachmentList()
			{
				this.$api
					.get('taskAttachments', {
						params:{
							taskId: this.$store.state.taskModalData.id
						}
					})
					.then(response => {
						this.$store.state.taskModalData.attachments = response.data.data;
						this.$store.state.taskModalActionStarter++;
					});
			},
		}
	};
</script>