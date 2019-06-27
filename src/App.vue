<template>
    <div id="app">
        <!-- <router-view /> -->
        <router-view v-if="isReloadAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    //页面刷新方法定义
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return{
            isReloadAlive: true
        }
    },
    methods: {
        reload() {
            this.isReloadAlive = false;
            this.$nextTick(function(){
                this.isReloadAlive = true;
            })
        }
    }
}
</script>


<style>
body, html {
    font-family: Hiragino Sans GB,Microsoft YaHei,SimSun,Arial,Helvetica Neue,Helvetica!important;
}
</style>

