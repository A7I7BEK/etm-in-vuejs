<template>
	<div class="mw-menu__item mw-attachment">
		<a href="#">
			<div class="mw-menu__item__icon">
				<i class="fa fa-paperclip"></i>
			</div>
			<span>{{ $t('attachment') }}</span>
		</a>

		<div class="attachment-upload__block">
			<label class="file-upload__label">
				<input
					class="file-upload__input"
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
		async SaveFile(event) {
			if (event.target.files.length === 0) {
				return;
			}

			this.$store.state.loader = true;

			let formData = new FormData();
			formData.append('file', event.target.files[ 0 ]);

			try {
				const resp = await this.$api.post('/resource/upload-one', formData);
				await this.AttachFileToTask(resp.data.data.id);
				await this.GetTaskAttachmentList();

				this.$notification.success(this.$t('FileUploadedSuccessfully'));
			} catch (error) {
				console.warn(error);
			}

			event.target.value = '';
			this.$store.state.loader = false;
		},
		async AttachFileToTask(fileId) {
			await this.$api.post('/task-attachments', {
				fileId,
				taskId: this.$store.state.taskModalData.id
			});
		},
		async GetTaskAttachmentList() {
			const resp = await this.$api.get('/task-attachments', {
				params: {
					taskId: this.$store.state.taskModalData.id
				}
			});

			this.$store.state.taskModalData.attachments = resp.data.data;
			this.$store.state.taskModalActionStarter++;
		},
	}
};
</script>