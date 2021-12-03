<template>
    <div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                background-color="#304156"
                text-color="#bfcbd9"
                :unique-opened="false"
                active-text-color="#409eff"
                :collapse-transition="false"
                :router="true"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in permission_routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
export default {
    components: {
        SidebarItem,
    },
    computed: {
        ...mapGetters(['permission_routes', 'sidebar']),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        isCollapse() {
            return !this.sidebar.opened
        }
    },
};
</script>

<style lang="scss" scoped>
</style>