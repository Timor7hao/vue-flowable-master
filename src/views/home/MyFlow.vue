<template>
    <el-container class="myflow-container">
        <el-header>
            <el-button class="backbutton" @click="toHome()"><i class="el-icon-back" style="font-size:20px"></i></el-button>
            <span>我的流程</span>
            <el-menu
                router
                :default-active="activemenu"
                class="el-menu-demo"
                mode="horizontal">
                <!-- <el-menu-item index="/myflow/waitdone">待办<div class="nav-badge">3</div></el-menu-item> -->
                <el-menu-item index="/myflow/waitdone">待办</el-menu-item>
                <el-menu-item index="/myflow/waitread">待阅</el-menu-item>
                <el-menu-item index="/myflow/startedme">我发起的</el-menu-item>
                <el-menu-item index="/myflow/wholeflow">全部</el-menu-item>
            </el-menu> 
            <div class="right-tabs">
                <div><i class="el-icon-warning-outline"></i></div>
                <div><span class="username">user</span></div>
            </div>
        </el-header>
        <el-main>
            <transition>
                <router-view></router-view>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'topbar',
    data() {
        return {
            //页面传过来的值
            method: '',
            // activemenu: '/myflow/waitdone',
            activemenu:'',
        };
    },
    created () {
        this.getParams()
    },
    watch: {
        '$route':'getParams'
    },
    methods: {
        //得到路由传过来的参数
        getParams() {
            const routerParamsmethod = this.$route.query.method
            this.method = routerParamsmethod;
            console.log(this.method)
            if(this.method == 0) {
                this.activemenu = '/myflow/waitdone'
                this.$router.push('/myflow/waitdone')
            }
            else if(this.method == 1) {
                this.activemenu = '/myflow/waitread'
                this.$router.push('/myflow/waitread')
            }
            else if(this.method == 2) {
                this.activemenu = '/myflow/startedme'
                this.$router.push('/myflow/startedme')
            }
            else if(this.method == 3) {
                this.activemenu = '/myflow/wholeflow'
                this.$router.push('/myflow/wholeflow')
            }
        },
        toHome() {
            this.$router.push({
                path: '/home'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.myflow-container {
    height: 100vh;
    .el-header {
        background: linear-gradient(180deg,#f9fafd,#e7eef8);
        .backbutton {
            float: left;
            height: 60px;
            margin-left:-20px;
            border-radius: 0px;
            border: 0px;
            border-right: 1px solid rgba(224,227,233,.7);
            background: linear-gradient(180deg,#f9fafd,#e7eef8);
        }
        .backbutton:hover {
            background: rgb(236, 241, 247);
            color: #304265;
        }
        span {
            color: #304265;
            float: left;
            font-size:16px;
            line-height: 60px;
            margin-left: 20px;
        }
        .el-menu {
            background: linear-gradient(180deg,#f9fafd,#e7eef8);
            width: 40%;
            padding-left:80px;
            margin: 0 auto;
            .el-menu-item {
                margin-right: 25px;
                font-size: 16px;
                .nav-badge {
                    display: inline;
                    align-items: center;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    padding: 2px 8px;
                    margin: 1px 0 0 3px;
                    border-radius: 12px;
                    background: #ffdbe8;
                    color: #ff4384;
                    font-size: 12px;
                }
            }
            .el-menu-item:hover {
                background: linear-gradient(180deg,#f9fafd,#e7eef8);
            }
            .el-menu-item.is-active {
                background: linear-gradient(180deg,#f9fafd,#e7eef8);
            }
        }
        .right-tabs {
            position: absolute;
            float: right;
            right: 10px;
            top: 0;
            height: 66px;
            line-height: 63px;
            margin: 0;
            padding: 0;
            text-align: center;
            // border: 1px solid;
            // color: white;
            width: 110px;
            display: flex;
            & > div {
                display: inline-block;
                padding: 0 6px;
                cursor: pointer;
            }
            .el-icon-warning-outline {
                font-size:18px;
            }
            .username {
                //圆形姓名
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                width: 34px;
                height: 34px;
                background: #107fff;
                border-radius: 30px;
                overflow: hidden;
                margin-right: 20px;
                cursor: pointer;
                color: #fff;
                float: right;
                margin-top: 10px;
            }
        }
    }
    .el-main {
        background: rgb(243,245,248);
    }
}
</style>
<style>
.waitread-container .el-card {
    padding: 20px;
}
.waitread-container .el-card__body {
    padding: 0px;
}
</style>
