<template>
    <div>111155551</div>
    <!-- <div class="app-container">
        <div>hhh</div>
        <iframe
            :src="src"
            frameborder="0"
            width="100%"
            height="100%">
        </iframe>
    </div> -->
</template>

<script>
export default {
    name: 'topbar',
    components: {

    },
    computed: {

    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
    // data() {
    //     return {
    //         src: ''
    //         }
    //     },
    //     watch: {
    //         $route() {
    //             this.getSrc()
    //         }
    //     },
    //     created() {
    //         this.getSrc()
    //     },
    //     methods: {
    //         getSrc() {
    //             let meta = this.$route.meta
    //             // if (meta && meta.root) {
    //                 // this.src='/static/flowable-'+meta.root+'/index.html'
    //             if (meta) {
    //                 this.src='/static/flowable-modeler/index.html'
    //                 if (meta.page) {
    //                 this.src += '#/' + meta.page
    //                 }
    //             }
    //         }
    //     }
    }
</script>

<style lang="scss" scoped>
// .topbar {
//     // border: 2px solid black;
//     color: #333;
//     text-align: center;

//     height: 60px;
//     line-height: 50px;
//     width: 100%;
//     background: #fff;

//     img {
//         float: left;
//         height: 30px;
//         display: inline-block;
//         margin-top: 10px;
//     }
//     .top-title {
//         float: left;
//         margin: 0px 30px;
//         font-size: 26px;
//     }
//     .el-menu {
//         border: 1px saddlebrown solid !important;
//         width: 50%;
//         margin-left: 180px;
//     }
// }
</style>
