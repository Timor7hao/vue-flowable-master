<template>
    <el-container class="home-container">
        <el-header>
            <img class="logo" src="https://cn.vuejs.org/images/logo.png">
            <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                size="small">
            </el-input>
            <!-- 右侧 user-->
            <span class="username" @click="toReg()">user</span>
            <!-- 右侧 应用工厂-->
            <el-tooltip
                class="item"
                effect="dark"
                content="应用工厂"
                placement="bottom">
                <i class="el-icon-setting" @click="toMyApp()"></i>
            </el-tooltip>
        </el-header>
        <el-header style="box-shadow: 0 1.5px 8px 0 #e0e5f0;background:white">
            <el-button class="button1" shadow="hover"  @click="dialogVisible = true">
                <svg-icon icon-class="icon-add" style="font-size:28px;"/> &nbsp;新建应用
            </el-button>
            <el-button class="button2" shadow="hover" v-for="(item,index) in applist" :key="index" @click="toAppInfomation(item.id,item.iconCls,item.applicationName,item.path)"> 
                <svg-icon :icon-class="item.iconCls" style="font-size:28px;"/> &nbsp;{{item.applicationName}}
            </el-button>
            <!-- 对话框 -->
            <el-dialog
                title="新建应用"
                :visible.sync="dialogVisible"
                width="520px"
                center>
                <el-form>
                    <el-form-item label="应用名称：">
                        <el-input placeholder="请输入应用名称" v-model="appname" clearable></el-input>
                        <!-- <el-input v-model="newappname" placeholder="请输入应用名称" clearable></el-input> -->
                    </el-form-item>
                    <el-form-item label="应用图标：">
                        <el-select placeholder="请选择应用图标" v-model="value">
                            <el-card>
                                <!-- 待完善 -->
                                <el-pagination small layout="prev, pager, next" :total="50"> </el-pagination>
                                <el-option style="width:50px;float:left;border: 1px solid #e6edfd" 
                                    v-for="item in options" 
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"> 
                                    <svg-icon style="font-size:24px;" :icon-class="item.value" />
                                </el-option>
                            </el-card>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="newApp()">确 定</el-button>
                </span>
            </el-dialog>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="15">
                <div class="grid-content bg-purple">
                    <div class="shared-head">
                        <span class="head__title"> 我的流程</span>
                        <div class="message__more">全部</div>
                    </div>
                    <ul class="work-list__content">
                        <li class="to_do_list" @click="toMyFlow(0)">
                            <div class="todo__title">待办</div>
                            <span class="todo__count">{{myflowlist[0].count}}</span>
                        </li>
                        <li class="to_do_list" @click="toMyFlow(1)">
                            <div class="todo__title">待阅</div>
                            <span class="todo__count">{{myflowlist[1].count}}</span>
                        </li>
                        <li class="to_do_list" @click="toMyFlow(2)">
                            <div class="todo__title">我发起的</div>
                            <span class="todo__count">0</span>
                        </li>
                    </ul>
                </div>
                </el-col>
                <el-col :span="9">
                    <div class="grid-content bg-purple">
                        <div class="shared-head">
                            <span class="head__title"> 提醒事项</span>
                            <div class="message__more">更多</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <div class="grid-content bg-purple" style="height:415px;margin-top:20px;">
                        <img src="" alt="">
                        <el-button type="text" @click="toDefineHome()">自定义首页添加内容</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { options } from '@/icons/icon.json'

export default {
    name: 'Dashboard',
    inject:['reload'],
    data() {
        return {
            dialogVisible: false,
            applist: [],
            appname: '',
            value: '',
            options: options,
            myflowlist: [{
                taskType: 0,
                count: 0,
            },{
                taskType: 1,
                count: 0,
            },{
                taskType: 2,
                count: 0,
            }],
            // pagesize:4,
            // currentPage:1
        }
    },
    mounted () {
        this.$nextTick( function(){
            this.getAppList(1);
            this.myFlowList(1)
        })
    },
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    methods: {
        //得到APP应用列表
        getAppList() {
            var Params = {}
            // console.log(Params)
            this.$ajax({
                // url: '/dev-api/application/appList',
                url:'/dev-api/menu/app/menus/e65edc60-96ee-11e9-ac96-005056c00001',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                this.applist=[]
                console.log(res)
                for(let i=0;i<res.data.length;i++)
                {
                    let obj = {}
                    obj.id = res.data[i].id
                    obj.applicationName = res.data[i].name
                    obj.iconCls = res.data[i].iconCls
                    obj.path = res.data[i].path
                    this.applist.push(obj)
                }
                console.log(this.applist)
            }).catch( error => {
                console.log()
            })
        },
        //得到我的流程的数据
        myFlowList() {
            var Params = {
                user_id: 'user1'
            }
            this.$ajax({
                url:'/my-api/form/inst/count',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                console.log(res.data.obj)
                this.myflowlist = res.data.obj
            }).catch( error => {
                console.log()
            })
        },
        //新建应用
        newApp() {
            console.log(this.appname)
            console.log(this.value)
            var Params = {
                applicationName: this.appname,
                iconCls: this.value,
            }
            console.log(Params)
            this.$ajax({
                // url: '/dev-api/application/addApp',
                url: '/dev-api/menu/app/add',
                method: 'post',
                contentType: "application/json; charset=utf-8",
                data: Params
            }).then( res => {
                console.log(res)
                this.reload();
                this.$message({
                    type: 'success',
                    message: '新建应用成功'
                });
            }).catch( error => {
                console.log()
            })
        },
        toMyWork() {

        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        toMyApp() {
            this.$router.push({
                path: '/app'
            })
        },
        toReg(){
            this.$router.push({
                path: '/reg'
            })
        },
        toDefineHome(){
            this.$router.push({
                path:'/homedesigner'
            })
        },
        toMyFlow(method) {
            this.$router.push({
                path:'/myflow',
                query: {
                    method: method,
                }
            })
        },
        toAppInfomation(id,icon,appname,path) {
            this.$router.push({
                path:'/appinfomation',
                query: {
                    appId:id,
                    appIcon:icon,
                    appName:appname,
                    appPath:path,
                }
            })
        }
    }
}
</script>

<style>
.el-scrollbar__view {
    padding: 6px !important;
    width:300px;
}
.el-card__body {
    padding: 6px;
}
.el-select-dropdown__item {
    padding: 2px 14px;
    margin: 2px;
}
</style>

<style lang="scss" scoped>
.home-container {
    height: 100vh;
    .el-header,
    .el-footer {
        color: #333;
        line-height: 50px;
        border-bottom: 1px solid #efefef;
    }
    .el-header {
        background: linear-gradient(180deg,#f9fafd,#e7eef8);
        img {
            float: left;
            height: 30px;
            line-height: 60px;
            margin: 16px 20px;
        }
        .el-input {
            // 头部搜索框
            float: left;
            width: 220px;
            margin: 5px 30px;
        }
        ul {
            list-style: none;
            font: 15px verdana, arial, sans-serif; /* 设置文字大小和字体样式 */
            li {
                float: right; /* 往左浮动 */
                list-style: none; /* 将默认的列表符号去掉 */
                padding: 0; /* 将默认的内边距去掉 */
                margin: 0; /* 将默认的外边距去掉 */
                display: inline;
                // line-height: 30px;
                padding: 0px 12px;
                &:hover {
                cursor: pointer;
                color: powderblue;
                }
            }
        }
        .first-ul li {
            border-right: 2px solid rgb(79, 82, 79);
            &:last-child {
                border-left: 2px solid rgb(79, 82, 79);
            }
        }
        .el-icon-setting {
            float: right;
            font-size: 26px;
            margin-top: 15px;
            margin-right: 30px;
            cursor: pointer;
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
        .button1{
            margin-left:80px;
            margin-top:5px;
            width:140px;
            height:50px;
            border: white;
            font-size:15px;
            line-height: 30px;
            border-radius:10px;
        }
        .button1:hover {
            background: rgba(250, 250, 250, 0.9);
        }
        .button2{
            margin-left:0px;
            margin-top:5px;
            width:140px;
            height:50px;
            border: white;
            font-size:15px;
            line-height: 30px;
            border-radius:10px;
        }
        .button2:hover {
            background: rgba(250, 250, 250, 0.9);
        }
        .svg-icon {
            font-size:30px;
            float:left;
        }
        .el-dialog {
            .el-form-item {
                margin-left:35px;
            }
            .el-input {
                margin-left:0px;
                width:300px;;
            }
            .el-select {
                width:300px;
                .el-option {
                    width:20%;
                    margin:10px;
                    .svg-icon{
                        size:70px;
                    }
                }
            }
            // .icons-select {
            //     .fip-box {
            //         display: inline-block;
            //         margin: 2px;
            //         width: 60px;
            //         line-height: 42px;
            //         text-align: center;
            //         cursor: pointer;
            //         vertical-align: top;
            //         height: 40px;
            //         border: 1px solid #efefef;
            //     }
            //     span .current-icon:hover {
            //         background-color: #2d7fff;
            //         color: #fff;
            //         border: 1px solid #298cba;
            //     }
            // }
        }
    }

    .el-main {
        // color: white;
        text-align: center;
        height: 100%;
        display: grid;
        padding: 30px 100px;
        background-color: #f3f5f8;

    .el-row {
        // padding-bottom: 10px;
        &:first-child {
            height: 350px;
        }
        .shared-head {
            padding: 0 16px 0 20px;
            height: 56px;
            border-bottom: 1px solid rgba(235, 237, 245, 0.9);
            width: 100%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        .head__title {
            font-size: 16px;
            padding: 10px 12px;
            position: relative;
            color: #304265;
        }
        .head__title:before {
            content: " ";
            width: 4px;
            height: 16px;
            background: -webkit-gradient(
                linear,
                left top,
                left bottom,
                from(#25b6ff),
                to(#107fff)
            );
            background: linear-gradient(180deg, #25b6ff, #107fff);
            border-radius: 3px;
            position: absolute;
            left: 0;
            top: 13px;
            }
        }
        .message__more {
            margin-left: auto;
            font-size: 14px;
            color: #8893a7;
            cursor: pointer;
            -webkit-transition: color 0.2s;
            transition: color 0.2s;
        }
        .work-list__content {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            padding: 33px 36px;
            height: calc(100% - 56px);
            min-height: 238px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            list-style: none;
            margin: 0;
            // padding: 0;
            padding: 10px 40px;
            .to_do_list {
                // border: 1px solid;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                width: 28%;
                border-radius: 6px;
                background-color: #fff;
                cursor: pointer;
                -webkit-transition: all 0.2s ease;
                transition: all 0.2s ease;


                &:hover {
                    background-color: #f7fafc;
                    .todo__title {
                    background: #fff;
                    color: #107fff;
                    -webkit-box-shadow: 0 0 8px 0 #e6edfd;
                    box-shadow: 0 0 8px 0 #e6edfd;
                }
            }
            .todo__title {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                width: 65%;
                min-width: 74px;
                max-width: 150px;
                height: 32px;
                margin: 0 0 18px 0;
                font-size: 16px;
                border-radius: 16px;
                background: #f7fafc;
                -webkit-box-shadow: 0 0 0 0 #e6edfd;
                box-shadow: 0 0 0 0 #e6edfd;
                color: #8893a7;
                -webkit-transition: all 0.2s ease 0.05s;
                transition: all 0.2s ease 0.05s;
            }
            .todo__count {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                position: relative;
                font-size: 50px;
                font-weight: 500;
                color: #304265;
                -webkit-transition: color 0.2s 0.05s;
                transition: color 0.2s 0.05s;

                &:hover{
                color: #107fff;
                }
            }
            }
        }
    }
    .el-col {
        height: 100%;
        border-radius: 6px;
    }
    .bg-purple {
        background-color: #fff;
        border-radius: 4px;
        height: 100%;
        border: 1px solid #304265;
    }
    .grid-content {
        border-radius: 4px;
        // min-height: 36px;
        margin-top:0px;
        // margin-bottom:50px;
        height: 100%;
        border-color:white;
        box-shadow: 0 1.5px 8px 0 #e0e5f0;
    }
}
body > .el-container {
    margin-bottom: 40px;
}
}
</style>
