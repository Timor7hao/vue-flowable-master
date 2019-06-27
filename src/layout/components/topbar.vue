<template>
    <header class="topbar fixed-header el-header">
        <img src="https://cn.vuejs.org/images/logo.png" alt="" class="logo" style="margin-top:17px;">
        <span class="top-title">资产云</span>
        <el-menu
            router
            :default-active="'/app'+topbarlist[0].path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="rgb(4,186,234)">
            <template v-for="(item,index) in topbarlist">
                <el-menu-item :index="'/app'+item.path" :key="index">{{item.name}}</el-menu-item>
            </template>
        </el-menu>
        <div class="right-tabs">
            <div><span @click="toHome()">首页</span></div>
            <div class="vertical-divider"> </div>
            <div><span>模板中心</span></div>
            <div class="vertical-divider"> </div>
            <div><i class="el-icon-switch-button" @click="logout()"> </i></div>
            <div class="vertical-divider"> </div>
            <div><span class="username">user</span></div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'topbar',
    data() {
        return {
            topbarlist: [
                {
                    "id": 29,
                    "path": "/application",
                    "component": "Home",
                    "name": "应用管理",
                    "iconCls": "fa fa-user-circle-o",
                    "children": [],
                    "meta": null,
                    "keepAlive": null,
                    "requireAuth": true
                },
                {
                    "id": 30,
                    "path": "/organization",
                    "component": "Home",
                    "name": "组织机构",
                    "iconCls": "fa fa-address-card-o",
                    "children": [],
                    "meta": null,
                    "keepAlive": null,
                    "requireAuth": true
                },
                {
                    "id": 31,
                    "path": "/authority",
                    "component": "Home",
                    "name": "权限管理",
                    "iconCls": "fa fa-money",
                    "children": [],
                    "meta": null,
                    "keepAlive": null,
                    "requireAuth": true
                },
                // {
                //     "id": 32,
                //     "path": "/addressInfo",
                //     "component": "Home",
                //     "name": "场景管理",
                //     "iconCls": "fa fa-bar-chart",
                //     "children": [],
                //     "meta": null,
                //     "keepAlive": null,
                //     "requireAuth": true
                // },
                // {
                //     "id": 33,
                //     "path": "/peopleInfo",
                //     "component": "Home",
                //     "name": "人员管理",
                //     "iconCls": "fa fa-bar-chart",
                //     "children": [],
                //     "meta": null,
                //     "keepAlive": null,
                //     "requireAuth": true
                // }
            ],
        };
    },
    components: {

    },
    computed: {

    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        toHome() {
            this.$router.push({ path: '/' })
        }
    }
}
</script>

<style lang="scss" scoped>
.topbar {
    border: 1px solid #e6e6e6;
    text-align: center;
    height: 62px;
    line-height: 60px;
    width: 100%;
    // background: #fff;
    // color: #333;
    // background: linear-gradient(180deg,#f9fafd,#e7eef8);
    color: white;
    background: rgb(0,33,64);
    img.logo {
        float: left;
        height: 30px;
        display: inline-block;
        margin-top: 10px;
    }
    .top-title {
        float: left;
        margin: 0px 30px;
        font-size: 26px;
    }
    .el-menu {
        width: 800px;
        display: inline-block;
        float: left;
        margin-left:10%;
        // background: linear-gradient(180deg,#f9fafd,#e7eef8);
        background: rgb(0,33,64);
        .el-menu-item {
            color: white;
        }
        .el-menu-item:hover {
            background: rgb(19, 58, 92) !important;
        }
        .el-menu-item.is-active {
            background: rgb(19, 58, 92) !important;
        }
    }
    .right-tabs {
        position: absolute;
        right: 0;
        top: 0;
        height: 66px;
        line-height: 63px;
        margin: 0;
        padding: 0;
        text-align: center;
        // border: 1px solid;

        width: 300px;
        display: flex;

        & > div {
            display: inline-block;
            padding: 0 16px;
            cursor: pointer;
        }

        .vertical-divider {
            height: 16px;
            color: #aaa;
            padding: 0 !important;
            margin: 20px 0 0px 0 !important;
            height: 22px;
            line-height: 22px;
            border-left: 1px solid;
            font-size: 0;
        }
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
            background: rgb(4,186,234);
            border-radius: 30px;
            overflow: hidden;
            margin-right: 20px;
            cursor: pointer;
            color: #fff;
            float: right;
            margin-top: 15px;
        }
}
</style>
