<template>
    <div class="form-container">
        <el-container>
            <el-header>
                <el-menu
                    router
                    :default-active="'/form/formDesign'"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="rgba(0,33,64,0)"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="/form/formDesign"><svg-icon icon-class="icon-formdesign"/>&nbsp;表单设计</el-menu-item>
                    <el-menu-item index="/form/flowDesign"><svg-icon icon-class="icon-flowdesign"/>&nbsp;流程设计</el-menu-item>
                    <el-menu-item index="/form/listDesign"><svg-icon icon-class="icon-listdesign"/>&nbsp;列表设计</el-menu-item>
                    <el-menu-item index="/form/formSetting"><svg-icon icon-class="icon-formsetting"/>&nbsp;表单设置</el-menu-item>
                </el-menu>
                <div class="right-tabs">
                    <div><span @click="toBack()">返回</span></div>
                    <div class="vertical-divider"></div>
                    <div><i class="el-icon-warning-outline"></i></div>
                    <div class="vertical-divider"></div>
                    <div><span class="username">user</span></div>
                </div>
            </el-header>
            <el-main>
                <transition>
                    <keep-alive v-if="isReloadAlive">
                        <router-view :apptitle="apptitle" :appid="appid" :formName="formName" :formid="formid" :formjson="formjson"></router-view>
                    </keep-alive>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //页面传过来的值
            apptitle: '',
            appid: '',
            formName: '',
            formid: '',
            formjson: '',
            input: '',
            dialogVisible: false,
            //判断是否刷新页面
            isReloadAlive: true,
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
            console.log(this.$route.query.appid)
            const routerParamstitle = this.$route.query.apptitle
            const routerParamsid = this.$route.query.appid
            const routerParamsformname = this.$route.query.formName
            const routerParamsformid = this.$route.query.formid
            const routerParamsjson = this.$route.query.formjson
            this.apptitle = routerParamstitle;
            this.appid = routerParamsid;
            this.formName = routerParamsformname
            this.formid = routerParamsformid
            this.formjson = routerParamsjson;
            console.log(this.apptitle)
            console.log(this.appid)
            console.log(this.formName)
            console.log(this.formid)
            console.log(this.formjson)
            if(this.apptitle && this.appid)
            {
                this.$root.apptitle = this.apptitle
                // this.$root.appid = this.appid
            }
            // console.log(this.$root.apptitle)
            // console.log(this.$root.appid)
        },
        toBack() {
            this.$router.push({ path: '/app' })
        },
    }
}
</script>

<style  lang="scss" scoped>
.form-container {
    height:100vh;
    .el-header {
        background: rgb(0,33,64);
        position:fixed;
        width:100%;
        z-index: 999;
        .el-button {
            border-radius: 0px;
            margin-left: -22px;
            height:60px;
            background: rgb(0,33,64);
        }
        .el-menu-demo {
            width:70%;
            padding-left:34%;
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
            color: white;
            width: 200px;
            display: flex;

            & > div {
                display: inline-block;
                padding: 0 16px;
                cursor: pointer;
            }

            .vertical-divider {
                height: 16px;
                color: white;
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
    .el-main {
        margin-top:60px;
    }
}
</style>




