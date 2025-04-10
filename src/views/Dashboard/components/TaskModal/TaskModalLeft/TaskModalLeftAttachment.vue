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
						v-if="item.file.mimetype.split('/')[ 0 ] === 'image'"
						:href="$store.state.url + item.file.url"
					>
						<img :src="$store.state.url + item.file.url">
					</a>


					<a
						v-else
						:href="$store.state.url + item.file.url"
						download
					>
						<span>{{ item.file.filename.split('.')[ 1 ] }}</span>
					</a>
				</div>

				<div class="mw-attachment__main">
					<h5>{{ item.file.name }}</h5>
					<span>
						{{ $t('added') }}
						{{
							$moment().diff($moment(item.file.createdAt), 'hours') > 24 ? ($t('in') + $moment(item.file.createdAt).format('D.MM.YYYY')) :
								$moment().diff($moment(item.file.createdAt), 'hours') > 0 ? ($moment().diff($moment(item.file.createdAt), 'hours') + $t('hoursAgo')) :
									$moment().diff($moment(item.file.createdAt), 'minutes') > 0 ? ($moment().diff($moment(item.file.createdAt), 'minutes') + $t('minutesAgo')) :
										($moment().diff($moment(item.file.createdAt), 'seconds') + $t('secondsAgo'))
						}}
					</span>


					<div
						class="attachment-main__bottom"
						v-if="can(PERMISSION_TYPE.TASK.UPDATE)"
					>
						<div
							class="attachment-change__block"
							data-custom-drop
						>
							<div
								class="attachment-change__block__inner"
								data-custom-drop-btn
								@click="attachmentName = item.file.name"
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
import { PERMISSION_TYPE } from '../../../../../constants';


export default {
	name: 'TaskModalLeftAttachment',
	data() {
		return {
			PERMISSION_TYPE,
			attachmentName: null,
		};
	},
	validations: {
		attachmentName: {
			required
		},
	},
	methods: {
		async GetTaskAttachmentList() {
			const resp = await this.$api.get('/task-attachments', {
				params: {
					taskId: this.$store.state.taskModalData.id
				}
			});

			this.$store.state.taskModalData.attachments = resp.data.data;
			this.$store.state.taskModalActionStarter++;
		},
		async Update(id) {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			document.dispatchEvent(new Event('mousedown'));

			await this.$api.put('/resource/' + id, {
				name: this.attachmentName
			});
			await this.GetTaskAttachmentList();
		},
		async Delete(id) {
			if (!confirm(this.$t('confirmDelete'))) {
				return;
			}

			await this.$api.delete('/resource/id', {
				data: {
					id: id
				}
			});
			await this.GetTaskAttachmentList();
		},
		async SaveClipboardImage(event) {
			if (event.clipboardData.files.length === 0) {
				return;
			}

			this.$store.state.loader = true;

			let formData = new FormData();
			formData.append('file', event.clipboardData.files[ 0 ]);

			const resp = await this.$api.post('/resource/upload-one', formData);
			await this.AttachFileToTask(resp.data.data.id);
			await this.GetTaskAttachmentList();

			this.$notification.success(this.$t('FileUploadedSuccessfully'));
			this.$store.state.loader = false;
		},
		async AttachFileToTask(fileId) {
			await this.$api.post('/task-attachments', {
				fileId,
				taskId: this.$store.state.taskModalData.id
			});
		},
	}
};
</script>