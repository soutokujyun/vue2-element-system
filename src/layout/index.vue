<template>
    <div :class="classObj" class="app-wrapper">
        <sidebar class="sidebar-container" />

        <div class="main-container hasTagsView">
            <div class="fixed-header">
                <navbar />
                <!-- <tags-view v-if="needTagsView" /> -->
            </div>
            <app-main />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { Sidebar, AppMain, Navbar } from "./components";
export default {
    name: "Layout",
    components: {
        Sidebar,
        AppMain,
        Navbar,
    },
    computed: {
        ...mapState({
            sidebar: (state) => state.app.sidebar,
        }),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
            };
        },
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

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}
</style>