<template>
  <el-container class="home-container is-vertical app-layout">
    <topbar class="topbar-con"></topbar>
    <AppMain class="appmain-con"></AppMain>
  </el-container>
</template>

<script>
import { topbar, AppMain } from './components'

export default {
  name: 'AppLayout',
  components: {
    topbar,
    AppMain
  },
  computed: {
    // sidebar() {
    //   return this.$store.state.app.sidebar
    // },
    // device() {
    //   return this.$store.state.app.device
    // },
    // fixedHeader() {
    //   return this.$store.state.settings.fixedHeader
    // },
    // classObj() {
    //   return {
    //     hideSidebar: !this.sidebar.opened,
    //     openSidebar: this.sidebar.opened,
    //     withoutAnimation: this.sidebar.withoutAnimation,
    //     mobile: this.device === 'mobile'
    //   }
    // }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  height: 100%;
  .topbar-con {
    width: 100%;
  }
  .appmain-con {
    width: 100%;
    // border: 6px solid red;
    height: 100%;
    padding: 0px;
  }
}
</style>
