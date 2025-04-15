<template>
	<section class="main-block">
		<sidebar-menu class="active"></sidebar-menu>


		<div class="main-content active">

			<router-view />

		</div>
	</section>
</template>
<script>
import SidebarMenu from "./components/SidebarMenu";

export default {
	components: {
		SidebarMenu,
	}
};
</script>