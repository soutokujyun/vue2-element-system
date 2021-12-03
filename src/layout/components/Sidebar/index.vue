<template>
	<el-aside>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				default-active="2"
				:background-color="variables.menuBg"
				:text-color="variables.menuText"
				:active-text-color="variables.menuActiveText"
			>
				<sidebar-item></sidebar-item>
			</el-menu>
		</el-scrollbar>
	</el-aside>
</template>

<script>
import variables from "@/styles/variables.scss";
import SidebarItem from './SidebarItem.vue';

export default {
	components: {
		SidebarItem,
	},
	computed: {
		variables() {
			return variables;
		},
	},
};
</script>

<style lang="scss" scoped></style>
