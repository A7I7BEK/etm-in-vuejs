<template>
	<div class="mw-attachment">
		<div class="mw-attachment__top">
			<div class="mw-attachment__title">
				<div class="mw-attachment__icon">
					<i
						class="fa fa-paperclip"
						aria-hidden="true"
					></i>
				</div>
				<h3>{{ $t('attachment') }} </h3>
			</div>

			<div class="az_attach_screen us-n">
				<input
					class="inp"
					id="attachmentScreenshot"
					type="text"
					@paste="SaveClipboardImage"
				>
				<label
					class="lbl"
					for="attachmentScreenshot"
				>{{ $t('pasteScreenshot') }}</label>
			</div>
		</div>


		<div
			class="mw-attachment__content"
			v-if="$store.state.taskModalData.attachments.length > 0"
		>
			<div
				class="mw-attachment__item"
				v-for="item in $store.state.taskModalData.attachments"
				:key="item.id"
			>
				<div class="mw-attachment__item__photo">
					<a
						class="fancybox"
						data-fancybox="gallery"
						v-if="item.mimeType.split('/')[ 0 ] === 'image'"
						:href="$store.state.url + item.url"
					>
						<img :src="$store.state.url + item.url">
					</a>


					<a
						v-else
						:href="$store.state.url + item.url"
						download
					>
						<span>{{ item.url.split('.')[ 1 ] }}</span>
					</a>
				</div>

				<div class="mw-attachment__main">
					<h5>{{ item.name }}</h5>
					<span>
						{{ $t('added') }}
						{{
							$moment(item.now).diff($moment(item.createdAt), 'hours') > 24 ? ($t('in') + $moment(item.createdAt).format('D.MM.YYYY')) :
								$moment(item.now).diff($moment(item.createdAt), 'hours') > 0 ? ($moment(item.now).diff($moment(item.createdAt), 'hours') + $t('hoursAgo')) :
									$moment(item.now).diff($moment(item.createdAt), 'minutes') > 0 ? ($moment(item.now).diff($moment(item.createdAt), 'minutes') + $t('minutesAgo')) :
										($moment(item.now).diff($moment(item.createdAt), 'seconds') + $t('secondsAgo'))
						}}
					</span>


					<div
						class="attachment-main__bottom"
						v-if="can('TASK_UPDATE')"
					>
						<div
							class="attachment-change__block"
							data-custom-drop
						>
							<div
								class="attachment-change__block__inner"
								data-custom-drop-btn
								@click="attachmentName = item.name"
							>
								<span>{{ $t('edit') }}</span>
								<div>
									<i class="fa fa-pencil"></i>
								</div>
							</div>

							<div
								class="attachment-change__inner"
								data-custom-drop-body
							>
								<div class="attachment-change__top">
									<h3>{{ $t('changeAttachment') }}</h3>
								</div>

								<div class="attachment-change__body">
									<form @submit.prevent="Update(item.id)">
										<div class="form-group">
											<label>
												{{ $t('linkName') }}
												<input
													class="form-control"
													type="text"
													:class="{ 'is-invalid': $v.attachmentName.$error }"
													v-model="attachmentName"
												>
											</label>

											<button
												class="button-effect"
												type="submit"
											>{{ $t('save') }}</button>
										</div>
									</form>
								</div>
							</div>
						</div>


						<div
							class="attachment-delete__block"
							@click="Delete(item.id)"
						>
							<span>{{ $t('delete') }}</span>
							<div class="attachment-delete__icon">
								<i class="fa fa-trash"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';


export default {
	name: 'TaskModalLeftAttachment',
	data() {
		return {
			attachmentName: null,
		};
	},
	validations: {
		attachmentName: {
			required
		},
	},
	methods: {
		GetTaskAttachmentList() {
			this.$api
				.get('/task-attachments', {
					params: {
						taskId: this.$store.state.taskModalData.id
					}
				})
				.then(response => {
					this.$store.state.taskModalData.attachments = response.data.data;
					this.$store.state.taskModalActionStarter++;
				});
		},
		Update(id) {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			document.dispatchEvent(new Event('mousedown'));

			this.$api
				.put('/resource/' + id, {
					name: this.attachmentName
				})
				.then(response => {
					this.GetTaskAttachmentList();
				});
		},
		Delete(id) {
			if (confirm(this.$t('confirmDelete'))) {
				this.$api
					.delete('/resource/' + id)
					.then(response => {
						this.GetTaskAttachmentList();
					});
			}
		},
		SaveClipboardImage(event) {
			if (event.clipboardData.files.length === 0) {
				return;
			}


			let formData = new FormData();
			formData.append('file', event.clipboardData.files[ 0 ]);


			this.$store.state.loader = true;
			this.$api
				.post('/resource/upload-one', formData)
				.then(response => {
					this.AttachFileToTask(response.data.data.id);
				})
				.finally(() => {
					setTimeout(() => {
						this.$store.state.loader = false;
					}, 500);
				});
		},
		AttachFileToTask(fileId) {
			this.$api
				.post('/task-attachments', {
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
	}
};
</script>