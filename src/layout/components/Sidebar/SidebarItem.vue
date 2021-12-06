<template>
	<div v-if="!item.hidden">
		<template v-if="hasOneShowingChild(item.children,item)">
			<el-menu-item :index="resolvePath(onlyOneChild.path)" :route="resolvePath(onlyOneChild.path)">
				<i v-if="onlyOneChild.meta.icon" :class="[`el-icon-${onlyOneChild.meta.icon}`, 'svg-icon']"></i>
				<span slot="title">{{onlyOneChild.meta.title}}</span>
			</el-menu-item>
		</template>
	
		<template v-else>
			<el-submenu :index="resolvePath(item.path)">
				<template slot="title">
					<i :class="[`el-icon-${item.meta.icon}`, 'svg-icon']"></i>
					<span slot="title">{{item.meta.title}}</span>
				</template>
				<el-menu-item v-for="child in item.children" :key="resolvePath(child.path)" :route="resolvePath(child.path)" :index="resolvePath(child.path)" class="nest-menu">{{child.meta.title}}</el-menu-item>
			</el-submenu>
		</template>
	</div>
</template>

<script>
import path from 'path'
export default {
	props: {
		item: {
			type: Object,
			required: true
		},
		basePath: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			onlyOneChild: null
		}
	},
	methods: {
		hasOneShowingChild(children = [], parent) {
			const showingChildren = children.filter(item => {
				if (item.hidden) {
					return false
				} else {
					return true;
				}
			});

			if (showingChildren.length === 1) {
				this.onlyOneChild = showingChildren[0];
				return true
			}

			if (showingChildren.length === 0) {
				this.onlyOneChild = { ...parent, path: '' }
				return true
			}

			return false;
		},
		resolvePath(routePath) {
			return path.resolve(this.basePath, routePath);
		}
	},
};
</script>

<style lang="scss" scoped></style>
