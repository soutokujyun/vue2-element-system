<template>
	<el-aside class="sidebar-container">
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:default-active="activeMenu"
				:collapse="isCollapse"
				:background-color="variables.menuBg"
				:text-color="variables.menuText"
				:active-text-color="variables.menuActiveText"
				:unique-opened="false"
				:collapse-transition="false"
				mode="vertical"
				:router="true"
			>
				<sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
			</el-menu>
		</el-scrollbar>
	</el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from "@/styles/variables.scss";
import SidebarItem from './SidebarItem.vue';

export default {
	components: {
		SidebarItem,
	},
	computed: {
		...mapGetters([
			'sidebar',
			'permission_routes'
		]),
		variables() {
			return variables;
		},
		isCollapse() {
			return !this.sidebar.opened
		},
		activeMenu() {
			const route = this.$route
			const { meta, path } = route

			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
	},
};
</script>

<style lang="scss" scoped></style>
