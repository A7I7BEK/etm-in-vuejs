<template>
	<div>
		<div class="ln_header_bx">
			<div class="ln_header">
				<div class="ln_heder_left">
					<router-link
						:to="{ name: 'main' }"
						class="ln_heder__tomain"
					>
						<img src="/img/mylogo.png">
					</router-link>


					<div class="ln_cover_squares">
						<button
							type="button"
							class="ln_btn_square48 button-effect"
							data-custom-switch-btn="#sidebarMenu"
							v-if="$route.name.includes('dashboard')"
						>
							<i class="fa fa-reorder"></i>
						</button>
						<button
							type="button"
							class="ln_btn_square48 button-effect menu_toggle_btn"
							v-else
						>
							<i class="fa fa-reorder"></i>
						</button>

						<router-link
							:to="{ name: 'main' }"
							class="ln_btn_square48 button-effect"
						>
							<i class="fa fa-home"></i>
						</router-link>

						<form @submit.prevent>
							<div class="az_all_search">
								<div class="ln_search_header ln_btn_square48">
									<input
										class="ln_search_header_input"
										type="text"
										:placeholder="$t('search')"
										v-model="searchText"
										:class="{ 'active': inputOpen }"
										@click="inputOpen = true"
									>
									<i class="fa fa-search"></i>
								</div>

								<div
									class="az_all_search_hint"
									v-if="searchResultShow"
								>
									<ul
										class="az_all_search_hint_ls"
										v-if="searchResultList.length > 0"
									>
										<li v-for="item in searchResultList">
											<a
												href="#"
												@click.prevent="GoToTask(item)"
											>
												<span class="name">{{ item.name }}</span>
												<span class="capt">
													{{ $t('searchInThisProject', { message: item.project.name }) }}
												</span>
											</a>
										</li>
									</ul>

									<div
										class="az_all_search_hint_no"
										v-else
									>{{ $t('noTaskFound') }}</div>
								</div>
							</div>
						</form>
					</div>
				</div>


				<div class="ln_cover_squares">
					<button
						type="button"
						class="ln_btn_square48 button-effect"
						data-custom-switch-btn="#guideMenu"
					>
						<i class="fa fa-question-circle"></i>
					</button>

					<button
						type="button"
						class="ln_btn_square48 button-effect"
						data-custom-switch-btn="#notificationMenu"
						:class="{ 'danger': $store.state.notificationAlert }"
					>
						<i class="fa fa-bell"></i>
					</button>

					<button
						type="button"
						class="ln_btn_square48 ln_marginr0"
						data-custom-switch-btn="#profileMenu"
					>
						<img
							v-if="$store.state.userProfile.employee.photoFile"
							:src="$store.state.url + $store.state.userProfile.employee.photoFile.url"
						>
						<i
							class="fa fa-user"
							v-else
						></i>
					</button>
				</div>
			</div>
		</div>


		<guide-menu></guide-menu>

		<notification-menu></notification-menu>

		<profile-menu></profile-menu>


		<router-view />
	</div>
</template>
<script>
import GuideMenu from '../components/GuideMenu/index';
import NotificationMenu from '../components/NotificationMenu/index';
import ProfileMenu from '../components/ProfileMenu/index';


export default {
	components: {
		GuideMenu,
		ProfileMenu,
		NotificationMenu,
	},
	data() {
		return {
			searchText: null,
			searchTimerId: 0,
			searchResultList: [],
			searchResultShow: false,
			inputOpen: false,
		};
	},
	watch: {
		'searchText'(val) {
			clearTimeout(this.searchTimerId);
			if (val && val.trim()) {
				this.searchTimerId = setTimeout(() => {
					this.$api
						.get('/tasks', {
							params: {
								page: 0,
								pageSize: 10,
								allSearch: val,
							}
						})
						.then(response => {
							this.searchResultList = response.data.data;
							this.searchResultShow = true;
						});
				}, 500);
			}
			else {
				this.searchResultShow = false;
			}
		},
	},
	mounted() {
		document.addEventListener('click', (e) => {
			if (!e.target.closest('.az_all_search')) {
				this.inputOpen = false;
				this.searchResultShow = false;
			}
		});
	},
	methods: {
		GoToTask(item) {
			if (this.$route.name === 'dashboard') {
				this.$store.state.taskModalId = item.id;
			}

			this.$router.push({
				name: 'dashboard',
				params: {
					'id': item.project.id,
					'taskId': item.id,
				}
			}).catch(err => {
				console.log(err.name);
			});


			this.inputOpen = false;
			this.searchResultShow = false;
		},
	},
};
</script>