<template>
	<el-aside>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				default-active="2"
				@open="handleOpen"
				@close="handleClose"
				:background-color="variables.menuBg"
				:text-color="variables.menuText"
				:active-text-color="variables.menuActiveText"
			>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>
					<span slot="title">导航二</span>
				</el-menu-item>
				<el-menu-item index="3" disabled>
					<i class="el-icon-document"></i>
					<span slot="title">导航三</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
			</el-menu>
		</el-scrollbar>
	</el-aside>
</template>

<script>
import variables from "@/styles/variables.scss";
export default {
	computed: {
		variables() {
			return variables;
		},
	},
};
</script>

<style lang="scss" scoped></style>
