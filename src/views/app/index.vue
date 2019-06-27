<template>
    <el-container id="app-container">
        <el-aside width="250px">
            <!-- 显示应用列表 -->
            <span class="title">全部应用</span>
            <i class="el-icon-plus" @click="dialogVisible = true"></i>
            <el-menu :default-active="activeIndex" @select="handleSelect">
                <el-menu-item v-for="(item,index) in applist" :key="index" :index="String(index)">
                    <div class="barstyle"></div>
                    <svg-icon :icon-class="item.iconCls"/>
                    <span slot="title">{{item.applicationName}}</span>
                    <el-dropdown placement="bottom-start" style="width:40px;">
                        <i class="el-icon-s-tools"></i>
                        <el-dropdown-menu slot="dropdown" class="el-dropdown-link1">
                            <el-dropdown-item>重命名</el-dropdown-item>
                            <el-dropdown-item>报表配置到移动端首页</el-dropdown-item>
                            <el-dropdown-item>发布到钉钉工作台</el-dropdown-item>
                            <el-dropdown-item>发布给其他企业</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-menu>
            <!-- 对话框 -->
            <el-dialog
                title="新建应用"
                :visible.sync="dialogVisible"
                width="520px"
                center>
                <el-form>
                    <el-form-item label="应用名称：">
                        <el-input placeholder="请输入应用名称" v-model="appname" clearable></el-input>
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
        </el-aside>
        <!--应用列表的各类表单 -->
        <el-main>
            <span>{{title}}</span>
            <div class="buttongroup">
                <el-button @click="addform(title)"><i class="el-icon-plus"></i>表单</el-button>
                <el-button><i class="el-icon-plus"></i>报表</el-button>
                <el-button style="margin-left:20px;"><i class="el-icon-plus"></i>分组</el-button>
            </div>
            <div class="formcard" v-for="(item, index) in formlist" :key="index">
                <el-card @click.native="addform(title,item.modelJson)">
                    <svg-icon v-rainbow icon-class="icon-Financial_025"/>&nbsp;
                    <!-- <svg-icon :icon-class="item.iconCls"/> -->
                    {{item.formName}}
                </el-card>
            </div>
            <!-- <div>
                <el-button type="primary" @click="addform()">添加表单</el-button>
                <el-button type="primary">添加报表</el-button>
            </div> -->
            <!-- <div  v-for="(item, index) in formList" class="formcard" :key="index">
                <span> {{item.formname}} </span>
            </div> -->
        </el-main>
        <!-- 对话框 -->
        <!-- <el-dialog title="添加应用" :visible.sync="dialogVisible" width="30%">
        <el-input
            v-model="newappname"
            placeholder="请输入应用名称"
            clearable>
        </el-input>
        <span
            slot="footer"
            class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
            type="primary"
            @click="newapp()"
            >确 定</el-button>
        </span>
        </el-dialog> -->
    </el-container>
</template>

<script>
import { options } from '@/icons/icon.json'
// import {MakingForm} from 'form-making'
// Vue.component(MakingForm.name, MakingForm)
export default {
    data() {
        return {
            //应用列表
            applist: [],
            activeIndex: '0',
            activeKey: '0',
            //对话框及其值
            dialogVisible: false,
            appname: '',
            value: '',
            options: options,
            //右侧标题及内容
            title: '',
            id: '',
            formlist: [],
            //传每个表单所携带json
            formjson: {},
            key() {
                return this.$route.fullPath
            },
            newappname: '',
        };
    },
    directives:{
        'rainbow':{
            bind(el,binding,vnode){
                el.style.color = '#' + Math.random().toString(16).slice(2,8);//随机颜色
            }
        },
    },
    mounted () {
        this.$nextTick( function(){
            this.getAppList(1)
        })
    },
    methods: {
        //得到导航栏的选中信息
        handleSelect(key, keyPath) {
            this.activeKey = key;
            // console.log(this.activeKey)
            this.getAppFormList();
        },
        //得到APP应用列表
        getAppList() {
            var Params = {}
            this.$ajax({
                // url: '/dev-api/application/appList',
                url:'/api/application/appList',
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
                    obj.applicationName = res.data[i].applicationName
                    obj.iconCls = res.data[i].iconCls
                    obj.path = res.data[i].path
                    this.applist.push(obj)
                }
                console.log(this.applist)
                this.getAppFormList()
            }).catch( error => {
                console.log()
            })
        },
        // 得到APP应用及其表单的列表
        getAppFormList() {
            console.log(this.activeKey)
            console.log(this.applist[this.activeKey])
            this.title = this.applist[this.activeKey].applicationName
            this.id = this.applist[this.activeKey].id
            // console.log(this.applist[this.activeKey].path)
            console.log(this.title)
            console.log(this.id)
            // var Params = {}
            // this.$ajax({
            //     url:'/dev-api/menu/form/menus/'+ this.applist[this.activeKey].path,
            //     method: 'get',
            //     contentType: "application/json; charset=utf-8",
            //     params: Params
            // }).then( res => {
            //     this.formlist=[]
            //     for(let i=0;i<res.data[0].children.length;i++)
            //     {
            //         let obj = {}
            //         obj.id = res.data[0].children[i].id
            //         obj.name = res.data[0].children[i].name
            //         obj.iconCls = res.data[0].children[i].iconCls
            //         obj.path = res.data[0].children[i].path
            //         this.formlist.push(obj)
            //     }
            //     console.log(this.formlist)
            // }).catch( error => {
            // console.log()
            // })


            var Params = {
                app_id: this.id,
                user_id: "test",
                group_id: "-1",
                form_status: "-1"
            }
            this.$ajax({
                url:'/api/form/models/get',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                console.log(res.data.obj)
                this.formlist=[]
                for(let i=0;i<res.data.obj.length;i++)
                {
                    let obj2 = {}
                    obj2.id = res.data.obj[i].id
                    obj2.formName = res.data.obj[i].formName
                    obj2.iconCls = res.data.obj[i].iconCls
                    obj2.groupId = res.data.obj[i].groupId
                    obj2.modelJson = res.data.obj[i].modelJson
                    this.formlist.push(obj2)
                }
                console.log(this.formlist)
            }).catch( error => {
                this.formlist=[]
                console.log()
            })
        },
        // handleClick(index) {
        //     console.log(index);
        // },
        newapp() {
            this.dialogVisible = false;
            console.log(this.newappname);
            this.appList.push({ appid: '004', appname: this.newappname });
            this.newappname = '';
        },
        addform(title,formjson) {
            this.$router.push({ 
                path: '/form',
                query: {
                    apptitle:title,
                    formjson:formjson,
                }
            })
        },
        showform() {
            this.$router.push({ path: '/wform' })
        }
    }
};
</script>

<style lang="scss" scoped>
#app-container {
    height: 92vh;
    .el-dialog {
        height: 30%;
    }
    .el-aside {
        // background:#f3f5f8;
        background: white;
        box-shadow: 2px 0 5px 0px #e0e5f0;
        .title {
            font-size: 16px;
            color: #304265;
            margin-left: 24px;
            line-height: 60px;
        }
        .el-icon-plus {
            background: #409EFF;
            color: white;
            font-size: 12px;
            font-weight: bold;
            padding: 4px;
            border-radius: 3px;
            margin-left: 110px;
        }
        .el-menu {
            // background: #f3f5f8;
            background: white;
            border-right: 0px;
            .svg-icon {
                margin-left:5px;
                margin-right:8px;
                font-size:16px;
                vertical-align: -0.3em; 
            }
            span {
                line-height: 1.5;
            }
            .barstyle {
                width:3px;
                background:#409EFF;
                height:55px;
                float:left;
                margin-left:-20px;
                display:none;
            }
            .el-dropdown {
                float: right;
                display: none;
                .el-icon-s-tools {
                    float:right;
                    margin-top:21px;
                    font-size:16px;
                }
            }
        }
        .el-menu-item:hover { 
            background: #ecf1f7 !important;
            .el-dropdown {
                display: block;
            }
            .barstyle {
                display: block;
            }
        }
        .el-menu-item.is-active {
            background-color: #ecf1f7 !important;
            .el-dropdown {
                display: block;
            }
            .barstyle {
                display: block;
            }
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
        }
    }
    .el-main {
        padding:20px;
        // background:white;
        // background-color: #f3f5f8;
        background-color:rgb(242,245,248);
        // background-color:rgb(240,246,248);
        span {
            line-height: 2;
            font-size: 18px;
            font-weight: 600;
            padding-left: 8px;
            color: #555;
        }
        .buttongroup {
            .el-button {
                color: #409EFF;
                border: #f3f5f8;
                margin: 10px 10px 0 6px;
                padding: 12px 17px 12px 17px;
                border: 1px solid #EBEEF5;
            }
        }
        .formcard {
            margin: 30px 0 0 6px;
            .el-card {
                width: 215px;
                float: left;
                margin-right: 10px;
                margin-bottom: 10px;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,0)
            }
            .el-card:hover {
                background: #d8e0ec;
            }
        }
    }
}
</style>
<style>
.el-card__body {
    padding: 20px !important;
}
</style>



