<template functional>
    <div v-if="!props.item.hidden">
        <template v-if="!props.item.children || props.item.children.length == 1">
            <el-menu-item
                :index="props.basePath + '/' + props.item.children[0].path"
            >
                <i :class="'el-icon-' + props.item.children[0].meta.icon" class="svg-icon"></i>
                <span slot="title">{{
                    props.item.children[0].meta.title
                }}</span>
            </el-menu-item>
        </template>
        <template v-else>
            <el-submenu :index="props.basePath">
                <template slot="title">
                    <i :class="'el-icon-' + props.item.meta.icon" class="svg-icon"></i>
                    <span slot="title">{{ props.item.name }}</span>
                </template>
                <el-menu-item
                    v-for="mi in props.item.children"
                    :key="mi.path"
                    :index="props.basePath + '/' + mi.path"
                >
                    <span slot="title">{{ mi.name }}</span>
                </el-menu-item>
            </el-submenu>
        </template>
    </div>
</template>
