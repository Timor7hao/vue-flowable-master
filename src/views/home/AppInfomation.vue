<template>
    <el-container class="home-container">
        <el-header>
            <svg-icon :icon-class="appicon"/>
            <span>{{appname}}</span>
            <el-dropdown placement="bottom-start" style="width:40px;">
                <span>
                    <i class="el-icon-s-tools"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="el-dropdown-link1">
                    <el-dropdown-item>重命名</el-dropdown-item>
                    <el-dropdown-item divided>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- 右侧 user-->
            <span class="username" @click="toReg()">user</span>
            <el-tooltip
                class="item"
                effect="dark"
                content="应用工厂"
                placement="bottom">
                <i class="el-icon-setting" @click="toMyApp()"></i>
            </el-tooltip>
        </el-header>
        <el-container>
            <el-aside width="250px">
                <el-menu :default-active="activeIndex" @select="handleSelect">
                    <el-menu-item v-for="(item,index) in formlist" :key="index" :index="String(index)">
                        <div class="barstyle"></div>
                        <svg-icon :icon-class="item.iconCls"/>
                        <span slot="title">{{item.name}}</span>
                        <i class="el-icon-s-tools"></i>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div class="table">
                    <el-button type="primary" style="float:left;padding-left:15px;margin-top:1px;margin-right:15px;" @click="dialogVisible = false"><i class="el-icon-plus"></i> 新增</el-button>
                    <div class="buttongroup">
                        <!-- <el-button><i class="el-icon-download" style="color:#17c295"></i> 导入</el-button>
                        <el-button><i class="el-icon-upload2" style="color:#fabb0c"></i> 导出</el-button>
                        <el-button><i class="el-icon-delete" style="color:#e97763"></i> 删除</el-button> -->
                        <el-button v-for="(item,index) in buttonlist1" :key="index">
                            <svg-icon :class="colorstyle[index]" :icon-class="item.iconCls"/>{{item.name}}
                        </el-button>
                    </div>
                    <el-dropdown style="float:right;padding-left:25px">
                        <span>列表<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown" class="el-dropdown-link2">
                            <el-dropdown-item>列表</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown style="float:right">
                        <span>全部<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown" class="el-dropdown-link3">
                            <el-dropdown-item>全部</el-dropdown-item>
                            <el-dropdown-item>我部门的</el-dropdown-item>
                            <el-dropdown-item>我的</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        :default-sort = "{prop: 'date', order: 'descending'}">
                        <el-table-column prop="number" label="序号" width="200"></el-table-column>
                        <el-table-column prop="title" label="数据标题" width="360"></el-table-column>
                        <el-table-column prop="appname" label="应用名称" sortable width="330"></el-table-column>
                        <el-table-column prop="status" label="流程状态" sortable width="200"></el-table-column>
                    </el-table>
                </div>
                <div class="addPage" :hidden="dialogVisible">
                    <span style="float:left;line-height:3.2;font-size:16px;padding-left:20px;">使用说明</span>
                    <div class="navbar-header">
                        <el-button @click="dialogVisible = true"><i class="el-icon-close"></i><span>关闭</span></el-button>
                        <!-- <el-button><i class="el-icon-full-screen"></i><span>全屏</span></el-button> -->
                        <el-button v-for="(item,index) in buttonlist2" :key="index">
                            <svg-icon :icon-class="item.iconCls"/><span>{{item.name}}</span>
                        </el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { options } from '@/icons/icon.json'
export default {
    name: 'Dashboard',
    inject:['reload'],
    data() {
        return {
            //页面传过来的值
            appid: '',
            appicon: '',
            appname: '',
            apppath: '',
            //应用列表
            formlist: [],
            activeIndex: '0',
            activeKey: '0',
            //按钮列表,应用按钮和表单按钮两个部分
            buttonlist: [],
            buttonlist1: [],
            buttonlist2: [],
            tableData: [{
                number: '1',
                title: '采购管理',
                appname: '采购管理',
                status: '进行中'
            }],
            dialogVisible: true,
            // applist: [],
            // appname: '',
            // value: '',
            // options: options,
            // pagesize:4,
            // currentPage:1
            colorstyle:[
                "ss1",
                "ss2",
                "ss3",
                "ss4",
                "ss5",
                "ss6",
                "ss7"
            ]
        }
    },
    created () {
        this.getParams()
    },
    mounted () {
        this.$nextTick( function(){
            this.getAppFormList(1)
        })
    },
    watch: {
        '$route':'getParams'
    },
    methods: {
        //得到路由传过来的参数
        getParams() {
            const routerParamsid = this.$route.query.appId
            const routerParamsicon = this.$route.query.appIcon
            const routerParamsname = this.$route.query.appName
            const routerParamspath = this.$route.query.appPath
            this.appid = routerParamsid;
            this.appicon = routerParamsicon;
            this.appname = routerParamsname;
            this.apppath = routerParamspath;
            console.log(routerParamsid)
            console.log(routerParamsicon)
            console.log(routerParamsname)
            console.log(routerParamspath)
        },
        // 得到APP应用及其表单的列表
        getAppFormList() {
            var Params = {}
            this.$ajax({
                url:'/dev-api/menu/form/menus/'+ this.apppath,
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                console.log(res.data)
                this.formlist=[]
                for(let i=0;i<res.data[0].children.length;i++)
                {
                    let obj = {}
                    obj.id = res.data[0].children[i].id
                    obj.name = res.data[0].children[i].name
                    obj.iconCls = res.data[0].children[i].iconCls
                    obj.path = res.data[0].children[i].path
                    this.formlist.push(obj)
                    // this.buttonlist = []
                    // for(let j=0;j<res.data[0].children[i].children.length;j++)
                    // {
                    //     let obj2 = {}
                    //     obj2.id = res.data[0].children[i].children[j].id
                    //     obj2.name = res.data[0].children[i].children[j].name
                    //     obj2.iconCls = res.data[0].children[i].children[j].iconCls
                    //     obj2.path = res.data[0].children[i].children[j].path
                    //     obj2.sort = res.data[0].children[i].children[j].sort
                    //     this.buttonlist.push(obj2)
                    // }
                }
                this.buttonlist = []
                console.log(this.activeKey)
                for(let j=0;j<res.data[0].children[this.activeKey].children.length;j++)
                    {
                        let obj2 = {}
                        obj2.id = res.data[0].children[this.activeKey].children[j].id
                        obj2.name = res.data[0].children[this.activeKey].children[j].name
                        obj2.iconCls = res.data[0].children[this.activeKey].children[j].iconCls
                        obj2.path = res.data[0].children[this.activeKey].children[j].path
                        obj2.sort = res.data[0].children[this.activeKey].children[j].sort
                        this.buttonlist.push(obj2)
                    }
                console.log(this.formlist)
                console.log(this.buttonlist)
                this.buttonlist1 = []
                this.buttonlist2 = []
                for(let k=0;k<this.buttonlist.length;k++)
                {
                    if(this.buttonlist[k].path.indexOf("list")!=-1)
                        this.buttonlist1.push(this.buttonlist[k])
                    else if(this.buttonlist[k].path.indexOf("form")!=-1)
                        this.buttonlist2.push(this.buttonlist[k])
                }
                console.log(this.buttonlist1)
                console.log(this.buttonlist2)
            }).catch( error => {
                console.log()
            })
        },
        //得到导航栏的选中信息
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
            this.activeKey = key;
            console.log(this.activeKey)
            this.getAppFormList();
        },
        // getAppList() {
        //     var Params = {}
        //     // console.log(Params)
        //     this.$ajax({
        //         url: '/dev-api/application/appList',
        //         method: 'get',y
        
        //         contentType: "application/json; charset=utf-8",
        //         params: Params
        //     }).then( res => {
        //         this.applist=[]
        //         console.log(res)
        //         for(let i=0;i<res.data.length;i++)
        //         {
        //             let obj = {}
        //             obj.id = res.data[i].id
        //             obj.applicationName = res.data[i].applicationName
        //             obj.iconCls = res.data[i].iconCls
        //             // console.log(res.data[i].id + "--" +res.data[i].applicationName+"--"+res.data[i].iconCls)
        //             // console.log(obj)
        //             // console.log(this.applist)
        //             this.applist.push(obj)
        //         }
        //         console.log(this.applist)
        //     }).catch( error => {
        //         console.log()
        //     })
        // },
        // //新建应用
        // newApp() {
        //     console.log(this.appname)
        //     console.log(this.value)
        //     var Params = {
        //         applicationName: this.appname,
        //         iconCls: this.value,
        //     }
        //     console.log(Params)
        //     this.$ajax({
        //         url: '/dev-api/application/addApp',
        //         method: 'post',
        //         contentType: "application/json; charset=utf-8",
        //         data: Params
        //     }).then( res => {
        //         console.log(res)
        //         this.reload();
        //         this.$message({
        //             type: 'success',
        //             message: '新建应用成功'
        //         });
        //         // let obj = {}
        //         // console.log(res.data)
        //         // for(var i=0;i<res.data.length;i++)
        //         // {
        //         //     obj.id = res.data[i].id
        //         //     obj.applicationName = res.data[i].applicationName
        //         //     obj.iconCls = res.data[i].iconCls
        //         //     this.applist.push(obj)
        //         // }
        //         // console.log(this.applist)
        //         // _this.tableData1 = res.data.data;
        //     }).catch( error => {
        //         console.log()
        //     })
        // },
        // toMyWork() {

        // },
        // async logout() {
        //     await this.$store.dispatch('user/logout')
        //     this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        // },
        toMyApp() {
            this.$router.push({
                path: '/app'
            })
        },
        // toReg(){
        //     this.$router.push({
        //         path: '/reg'
        //     })
        // },
        // toDefineHome(){
        //     this.$router.push({
        //         path:'/homedesigner'
        //     })
        // },
        // toAppInfomation() {
        //     this.$router.push({
        //         path:'/appinfomation'
        //     })
        // }
    }
}
</script>

<style>
.el-dropdown-link1.el-dropdown-menu {
    width:130px;
    padding-top:6px;
    padding-bottom:6px;
}
.el-dropdown-link2.el-dropdown-menu {
    padding:0px;
}
.el-dropdown-link3.el-dropdown-menu {
    padding:0px;
}
.ss1 {
    background: black;
    color: white;
}
.ss2 {
    background: purple;
    color:#17c295;
}
.ss3 {
    background: green;
    color:#fabb0c;
}
.ss4 {
    background: yellow;
    color: #e97763;
}
.ss5 {
    background: gray;
    color:gray;
}
.ss6 {
    background: pink;
}
</style>

<style lang="scss" scoped>
@keyframes bounceInRight {
    0% { right:-200px; opacity: 0.2 } 
    25% { right:0px; opacity: 1 } 
    // 75% { right:10px; opacity: 0.8 } 
    // 100% { right:0px; opacity: 1; } 
}

.home-container {
    height: 100vh;
    .el-header {
        color: #333;
        line-height: 50px;
        border-bottom: 1px solid #efefef;
        background: linear-gradient(180deg,#f9fafd,#e7eef8);
        .svg-icon {
            float:left;
            font-size:28px;
            margin-top:18px;
        }
        span {
            font-size: 16px;
            color: #304265;
            white-space: nowrap;
            margin-left:10px;
            line-height:60px;
        }
        .el-icon-s-tools {
            margin-left:5px;
            color: #B0B0B0;
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
    }
    .el-aside {
        background:#f3f5f8;
        box-shadow: 2px 0 5px 0px #e0e5f0;
        .el-menu {
            border-right: 0px;
            background: #f3f5f8;
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
            i {
                float:right;
                margin-top:21px;
                font-size:16px;
                display:none;
                // display: block;
            }
        }
        .el-menu-item:hover{ 
            background: #ecf1f7 !important;
            i {
                display: block;
            }
            .barstyle {
                display: block;
            }
        }
        .el-menu-item.is-active {
            background-color: #ecf1f7 !important;
            i {
                display: block;
            }
            .barstyle {
                display: block;
            }
        }
    }

    .el-main {
        padding:20px;
        background:white;
        .buttongroup {
            .el-button {
                border: white;
                padding:15px;
                float:left;
            }
            .el-button:hover {
                background-color: #F8F8F8;
            }
        }
        .addPage {
            width: 65%;
            height: 100vh;
            background-color: white;
            box-shadow: -3px -3px 5px #E0E0E0;
            position: fixed;
            right: 0;
            top: 80px;
            animation: bounceInRight 3s cubic-bezier(0.215, 0.610, 0.355, 1.000);
            .navbar-header {
                height:52px;
                background:#f3f5f8;
                border-bottom: 1px solid #E0E0E0;
                .el-button {
                    float: right;
                    height: 51px;
                    border: 0;
                    border-left: 1px solid #E0E0E0;
                    border-radius: 0px;
                    margin-left:0px;
                    // i {
                    //     vertical-align: middle;
                    //     font-size: 20px;
                    //     color: #8AAED1;
                    // }
                    .svg-icon {
                        vertical-align: middle;
                        font-size: 20px;
                        color: #8AAED1;
                    }
                    span {
                        font-size:15px;
                        font-family: 'icomoon';
                        color: #333333;
                        line-height: 2;
                    }
                }
            }
        }
    }
    body > .el-container {
        margin-bottom: 40px;
    }
}
</style>
