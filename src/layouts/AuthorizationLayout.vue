<template>
	<section class="auth_sec">
		<div class="auth_bx">
			<div class="auth">
				<div class="auth_logo">
					<img src="@/assets/img/svg/logo-login.svg">
				</div>



				<router-view />



			</div>
		</div>


		<div class="auth_copy">
			<div class="auth_copy_txt">
				Copyright &copy; 2016-{{ new Date().getFullYear() }} ETM.
				{{ $t('allRightsReserved') }}
			</div>
		</div>
	</section>
</template>