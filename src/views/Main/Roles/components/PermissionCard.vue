<template>
	<div class="az_role_form_perm">
		<div
			class="az_crud_ftr"
			data-custom-accordion
		>
			<div
				class="az_crud_ftr_ttl"
				data-custom-accordion-btn
			>
				<p>{{ $tc(resource.title, 2) }}</p>

				<i class="fa fa-angle-down"></i>
			</div>


			<div
				class="az_crud_ftr_cnt"
				data-custom-accordion-body
				style="display: none;"
			>
				<div class="az_crud_ftr_cnt_inr">

					<div class="az_role_form_tb pb-3">
						<base-crud-table table-class="w-100">

							<template #head>
								<tr>
									<th class="width-50">
										<div class="custom-control custom-checkbox az_base_custom_chk">
											<input
												class="custom-control-input"
												:id="'roleCheckAll' + resource.title"
												type="checkbox"
												v-model="checkboxAllChecked"
												@change="toggleCheckboxAll($event.target.checked)"
											>
											<label
												class="custom-control-label"
												:for="'roleCheckAll' + resource.title"
											></label>
										</div>
									</th>

									<th>{{ $t('name') }}</th>

									<th>{{ $t('codeName') }}</th>
								</tr>
							</template>


							<template
								#body
								v-if="resource.list.length > 0"
							>
								<tr
									class="az_role_form_tb_tr_chk"
									v-for="item in resource.list"
									:key="item.id"
									@click="toggleCheckboxOne(item.id)"
								>
									<td>
										<div class="custom-control custom-checkbox az_base_custom_chk">
											<input
												class="custom-control-input"
												type="checkbox"
												:id="'roleCheckOne' + item.id"
												:value="item.id"
												v-model="model.permissionIds"
											>
											<label
												class="custom-control-label"
												:for="'roleCheckOne' + item.id"
											></label>
										</div>
									</td>

									<td>
										<div class="az_crud_tb_txt">{{ item.name }}</div>
									</td>

									<td>
										<div class="az_crud_tb_txt">{{ item.codeName }}</div>
									</td>
								</tr>
							</template>

						</base-crud-table>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BaseCrudTable from '../../../../components/BaseCrudTable';


export default {
	name: 'PermissionCard',
	components: {
		BaseCrudTable,
	},
	props: {
		resource: {
			type: Object,
			required: true,
		},
		model: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			checkboxAllChecked: false,
		};
	},
	mounted() {
		this.trackCheckboxAll();
	},
	methods: {
		toggleCheckboxOne(id) {
			let foundIndex = this.model.permissionIds.indexOf(id);

			if (foundIndex > -1) {
				this.model.permissionIds.splice(foundIndex, 1);
			}
			else {
				this.model.permissionIds.push(id);
			}

			this.trackCheckboxAll();
		},
		toggleCheckboxAll(checked) {
			let data = this.resource.list.map(a => a.id);


			if (checked) {
				const difference = data.filter(a => !this.model.permissionIds.includes(a));
				this.model.permissionIds.push(...difference);
			}
			else {
				this.model.permissionIds = this.model.permissionIds.filter(a => !data.includes(a));
			}
		},
		trackCheckboxAll() {
			let data = this.resource.list.map(a => a.id);
			this.checkboxAllChecked = data.every(a => this.model.permissionIds.includes(a));
		},
	}
};
</script>