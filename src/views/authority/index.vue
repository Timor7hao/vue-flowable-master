<template>
    <el-container id="authority_container">
        <el-aside width="250px">
            <el-input placeholder="搜索角色">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <div class="button-group" style="margin:15px 0 8px 30px;">
                <el-button size="mini" type="primary" @click="dialogAddRole = true">新建角色</el-button>
                <el-button size="mini" type="primary">新建角色组</el-button>
            </div>
            <!-- 显示角色列表 -->
            <el-menu v-for="(item,index) in rolelist" :key="index">
                <el-submenu :index="String(index)">
                    <template slot="title">
                        <i class="el-icon-coordinate"></i>
                        <span>{{item.roleGroupName}}</span>
                    </template> 
                    <el-menu-item v-for="(role,index) in item.roles" :key="index">
                        {{role.roleNameZh}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
            <!-- <el-menu :default-active="rolelist[0].roleName" class="el-menu-vertical-demo">
                <el-menu-item>
                    <el-button size="mini" type="primary" @click="dialogAddRole = true">新建角色</el-button>
                    <el-button size="mini" type="primary">新建角色组</el-button>
                </el-menu-item>
                <template v-for="(item,index) in rolelist">
                    <el-menu-item :index="item.roleName" :key="index">
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{item.roleNameZh}}</span>
                    </el-menu-item>
                </template>
            </el-menu> -->
        </el-aside>
        <!-- 主界面 -->
        <el-main>
            <!-- <div class="tabs">
                <span class="tabs-tab">角色成员管理</span>
            </div>
            <div class="btn-con" style="margin-top:20px;">
                <el-button type="primary" size="small" @click="addNumber()">添加成员</el-button>
            </div>
            <el-table :data="userData" style="width: 98%">
                <el-table-column prop="id" label="工号" width="170"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="part" label="部门"></el-table-column>
                <el-table-column label="操作">
                    <template>
                    <div>
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </div>
                    </template>
                </el-table-column>
            </el-table> -->
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="padding-left:30%"> 
                <el-menu-item index="0" @click="placestucture()">角色权限设置</el-menu-item>
                <el-menu-item index="1" @click="placemember()" style="margin-left:10%">角色成员管理</el-menu-item>
                <div id="buttongroup1" style="display:block">
                    <el-button type="primary" size="mini" style="float:right;margin-top:12px">保存</el-button>
                    <el-button type="primary" size="mini" style="float:right;margin-right:8px;margin-top:12px">同步角色</el-button>
                </div>
                <div id="buttongroup2" style="display:none">
                    <el-button type="primary" size="mini" style="float:right;margin-top:12px">添加成员</el-button>
                    <el-button type="primary" size="mini" style="float:right;margin-right:8px;margin-top:12px">批量移除</el-button>
                </div>
            </el-menu>
            <el-card id="card1">
                <el-table
                    :data="tableData1"
                    :span-method="objectSpanMethod"
                    border
                    style="width: 100%; margin-top: 20px">
                    <el-table-column prop="id" label="应用权限" width="180"></el-table-column>
                    <el-table-column prop="name" label="全选"></el-table-column>
                    <el-table-column prop="amount1" label="表单权限"></el-table-column>
                    <el-table-column prop="amount2" label="列表权限"></el-table-column>
                    <el-table-column prop="amount3" label="数据权限"></el-table-column>
                </el-table>
            </el-card>
            <el-card id="card2" style="display:none">
                 <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="100"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="200"></el-table-column>
                    <el-table-column prop="tel" label="手机号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="section" label="服务部门"></el-table-column>
                </el-table>
            </el-card>
        </el-main>
        <!-- 添加成员 -->
        <el-dialog title="添加成员" :visible.sync="dialogAddNumber">
            <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddNumber = false">取 消</el-button>
                <el-button type="primary" @click="addnumbersure()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新建角色 -->
        <el-dialog title="新建角色" :visible.sync="dialogAddRole">
            <el-input v-model="rolenput" placeholder="请输入内容"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddRole = false">取 消</el-button>
                <el-button type="primary" @click="dialogAddRole = false">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
export default {
    name: 'topbar',
    data() {
        return {
            dialogAddNumber: false,
            dialogAddRole: false,
            rolenput:'',
            value1: [],
            value2: [],
            rolelist: [],
            // rolelist: [{
            //     "id": 3,
            //     "roleName": "ROLE_test1",
            //     "roleNameZh": "业务人员",
            //     "roleDescription": "测试角色",
            //     "status": true,
            //     "applicableUnitLevel": null,
            //     "productCode": null,
            //     "enableTime": "2019-05-28T02:07:59.000+0000",
            //     "disableTime": null,
            //     "updatedTime": null,
            //     "createdTime": "2019-05-28T02:07:58.684+0000",
            //     "roleGroupname": "111"
            // },
            // {
            //     "id": 4,
            //     "roleName": "ROLE_test2",
            //     "roleNameZh": "测试人员",
            //     "roleDescription": "测试角色",
            //     "status": true,
            //     "applicableUnitLevel": null,
            //     "productCode": null,
            //     "enableTime": "2019-05-28T02:08:24.000+0000",
            //     "disableTime": null,
            //     "updatedTime": null,
            //     "createdTime": "2019-05-28T02:08:23.554+0000",
            //     "roleGroupname": "222"
            // },
            // {
            //     "id": 5,
            //     "roleName": "ROLE_test3",
            //     "roleNameZh": "调配人员",
            //     "roleDescription": "测试角色",
            //     "status": true,
            //     "applicableUnitLevel": null,
            //     "productCode": null,
            //     "enableTime": "2019-05-28T02:09:49.000+0000",
            //     "disableTime": null,
            //     "updatedTime": null,
            //     "createdTime": "2019-05-28T02:09:48.943+0000",
            //     "roleGroupname": "133"
            // }],
            userData: [{
                id: '20160502',
                name: '王虎',
                part: '财务'
            }, {
                id: '20160504',
                name: 'xx虎',
                part: '销售'
            }, {
                id: '20105-01',
                name: 'ee虎',
                part: '管理'
            }, {
                id: '2016-05-03',
                name: 'll虎',
                part: '实验室'
            }],

            options: [{
                id:'212',
                value: '选项1',
                label: '李明1',
                name: '李明1',
                part: '财务'
            }, {
                id:'222',
                value: '选项2',
                label: '李明2',
                name: '李明2',
                part: '财务'


            }, {
                id:'202',
                value: '选项3',
                label: '李明3',
                name: '李明23',
                part: '财务'


            }, {
                id:'201232',
                value: '选项4',
                label: '李明4',
                name: '李明4',
                part: '开发'
            }, {
                id:'20123432',
                value: '选项5',
                label: '李明5',
                name:'李明5',
                part: '开发'
            }],
            tableData: [
                {
                    name: '王小虎',
                    tel:'--'
                },
                {
                    name: '王小虎',
                    tel:'--'
                },
                {
                    name: '王小虎',
                    tel:'--'
                }
            ],
            tableData1:[],
            activeIndex: '0',
        };
    },
    mounted() {
        this.$nextTick( function(){
            this.getRoleList(1)
        })
    },
    computed: {

    },
    methods: {
        //得到角色列表
        getRoleList() {
            var Params = {}
            this.$ajax({
                url:'/dev-api/role/roles',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                this.rolelist=[]
                console.log(res.data)
                this.rolelist = res.data;
                console.log(this.rolelist)
            }).catch( error => {
                console.log()
            })
        },
        //角色权限与角色成员页面跳转
        placestucture() {
            var ele1=document.getElementById("card1");
            var ele2=document.getElementById("card2");
            var button1=document.getElementById("buttongroup1");
            var button2=document.getElementById("buttongroup2");
            ele2.style.display = "none";
            ele1.style.display = "block";
            button2.style.display = "none";
            button1.style.display = "block";
        },
        placemember() {
            var ele1=document.getElementById("card1");
            var ele2=document.getElementById("card2");
            var button1=document.getElementById("buttongroup1");
            var button2=document.getElementById("buttongroup2");
            ele2.style.display = "block";
            ele1.style.display = "none";
            button2.style.display = "block";
            button1.style.display = "none";
        },
        //card1的合并表格
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                // return {
                //     rowspan: 2,
                //     colspan: 1
                // };
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 8,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        //card2的选中框
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClick() {

        },
        addNumber() {
            this.dialogAddNumber=true;
        },
        addnumbersure(){
            this.userData=this.userData.concat(this.value1);
            this.dialogAddNumber=false;
        },

    }
}
</script>

<style lang="scss" scoped>
#authority_container {
    // padding: 0px;
    // height: 100%;
    height: 92vh;
    .el-dialog {
        height: 30%;
    }
    .el-aside {
        background: white;
        box-shadow: 2px 0 5px 0px #e0e5f0;
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
        .el-submenu:hover { 
            background: #ecf1f7 !important;
            .el-dropdown {
                display: block;
            }
            .barstyle {
                display: block;
            }
        }
        .el-submenu.is-active {
            background-color: #ecf1f7 !important;
            .el-dropdown {
                display: block;
            }
            .barstyle {
                display: block;
            }
        }
    }
    // .el-aside {
    //     .el-menu-item:first-child {
    //     &:hover {
    //         background-color: #ffff !important;
    //     }
    //     }
    // }
    .el-main {
        // border-left: 2px solid #e7e7e7;
        border-left:none;
        padding-top:10px;
        background-color:rgb(242,245,248);
        .el-card {
            margin-top:20px;
            height:78vh;
            display: block;
            .el-pagination {
                // bottom: 0px;
                margin-top:50vh;
                text-align:center;
            }
        }
        .el-menu {
            background-color:rgb(242,245,248);
        }
        .el-menu-item:hover {
            background-color:rgb(242,245,248);
        }
        .el-menu-item.is-active {
            background-color:rgb(242,245,248);
        }
        .tabs {
            text-align: center;
            width: 60%;
            display: inline-block;
            background-color:rgb(242,245,248);
            .tabs-tab {
                display: inline-block;
                height: 100%;
                padding: 8px 16px;
                margin-right: 16px;
                box-sizing: border-box;
                cursor: pointer;
                text-decoration: none;
                position: relative;
                transition: color 0.3s ease-in-out;
                border-bottom: 3px solid #2d7fff !important;
            }
        }
        .btn-con {
            display: inline-block;
            margin-left: 20px;
        }

        .el-table {
            padding: 10px;
            // border: 1px solid;
            margin: 20px 10px;
        }
    }

    .formcard {
        float: left;
        // border: 1px solid black;
        height: 50px;
        width: 100px;
        text-align: center;
        line-height: 50px;
        background-color: #94c9ff;
        color: white;
        border-radius: 4px;
        margin: 10px 0px;
        margin-right: 30px;
        cursor: pointer;
    }
}
</style>
