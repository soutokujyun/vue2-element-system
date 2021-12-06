<template>
	<el-container class="app-wrapper" :class="classObj">
		<sidebar />
		<el-container class="main-container">
			<el-header height="unset">
				<navbar />
				<tags-view />
			</el-header>
			<el-main>
				<app-main />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import { Sidebar, Navbar, AppMain, TagsView } from './components'
import { mapState } from 'vuex'
export default {
	name: "Layout",
    components: {
        Sidebar,
		Navbar,
		TagsView,
		AppMain
    },
	computed: {
		...mapState({
			sidebar: state => state.app.sidebar
		}),
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened
			}
		}
	},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
}
.el-header {
	padding: 0;
}
</style>
