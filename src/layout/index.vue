<template>
	<el-container class="app-wrapper">
		<sidebar class="sidebar-container" />
		<el-container>
			<el-header> </el-header>

			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import { Sidebar} from './components'
export default {
	name: "Layout",
    components: {
        Sidebar,
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
</style>
