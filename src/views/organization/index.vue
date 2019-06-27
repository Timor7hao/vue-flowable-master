<template>
    <el-container id="organization-container">
        <!-- <el-header>
            <div class="button-group">
                <el-button type="primary" size="medium">手工从钉钉同步组织机构</el-button>
                <el-button size="medium">任务交接</el-button>
                <el-button size="medium">设置部门经理</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="250px">
                <el-input placeholder="搜索场景">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-menu style="border-right:none">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-submenu>
                    <el-table-menu>
                        场景名称2
                    </el-table-menu>
                </el-menu>
            </el-aside>
            <el-main>
                <el-table stripe style="width:100%"  :header-cell-style="tableHeaderColor">
                    <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
                    <el-table-column prop="tel" label="手机" width="220" align="center"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="220" align="center"></el-table-column>
                    <el-table-column prop="section" label="所属部门" width="305" align="center"></el-table-column>
                    <el-table-column prop="methods" label="操作" width="200" align="center"></el-table-column>
                </el-table>
            </el-main>
        </el-container> -->
        <el-aside width="250px">
            <el-input placeholder="搜索场景">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <!-- 显示应用列表 -->
            <span class="title">全部场景</span>
            <i class="el-icon-plus" @click="dialogVisible = true"></i>
            <el-menu :default-active="activeIndex" @select="handleSelect">
                <el-menu-item v-for="(item,index) in placelist" :key="index" :index="String(index)">
                    <div class="barstyle"></div>
                    <i class="el-icon-guide"></i>
                    <span slot="title">{{item.sceneName}}</span>
                    <!-- <i class="el-icon-s-tools"></i> -->
                    <el-dropdown placement="bottom-start" style="width:40px;">
                        <i class="el-icon-s-tools"></i>
                        <el-dropdown-menu slot="dropdown" class="el-dropdown-link1">
                            <el-dropdown-item @click="rename()">重命名</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-menu>
            <!-- 对话框 -->
            <el-dialog
                title="新建场景"
                :visible.sync="dialogVisible"
                width="520px"
                center>
                <el-form>
                    <el-form-item label="场景名称：">
                        <el-input placeholder="请输入场景名称" v-model="appname" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="场景图标：">
                        <el-select placeholder="请选择场景图标" v-model="value">
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
        <el-main>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="padding-left:30%"> 
                <el-menu-item index="0" @click="placestucture()">场景结构设置</el-menu-item>
                <el-menu-item index="1" @click="placemember()" style="margin-left:10%">场景成员设置</el-menu-item>
                <div id="buttongroup1" style="display:block">
                    <el-button type="primary" size="mini" style="float:right;margin-top:12px">保存</el-button>
                    <el-button type="primary" size="mini" style="float:right;margin-right:8px;margin-top:12px">同步组织机构</el-button>
                </div>
                <div id="buttongroup2" style="display:none">
                    <el-button type="primary" size="mini" style="float:right;margin-top:12px">添加</el-button>
                    <el-button type="danger" size="mini" style="float:right;margin-right:8px;margin-top:12px">批量移除</el-button>
                </div>
            </el-menu>
            <el-card id="card1">
                <span>{{title}}</span>
                <el-tree 
                    :props="props"
                    :data="treeData" 
                    @node-click="handleNodeClick"
                    show-checkbox
                    default-expand-all
                    highlight-current>
                </el-tree>
            </el-card>
            <el-card id="card2" style="display:none">
                <span>{{title}}</span>
                <el-input placeholder="搜索" style="float:right;width:165px;margin-right:15px;margin-top:10px" size="mini">
                    <el-button slot="append" icon="el-icon-search" style="width:50px"></el-button>
                </el-input>
                <el-table stripe style="width:100%" :data="tableData" :header-cell-style="tableHeaderColor">
                    <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
                    <el-table-column prop="tel" label="手机" width="220" align="center"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="210" align="center"></el-table-column>
                    <el-table-column prop="section" label="所属部门" width="305" align="center"></el-table-column>
                    <el-table-column prop="methods" label="操作" align="center">
                        <el-button size="mini">设置主部门</el-button>
                        <el-button size="mini">授权</el-button>
                    </el-table-column>
                </el-table>
                <el-pagination
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </el-card>
            <!-- <div  v-for="(item,index) in roles" :key="index">
              <el-tree :props="props"
                       :key="item.id"
                       :data="treeData"
                       :default-checked-keys="checkedKeys"
                       node-key="id"
                       ref="tree"
                       show-checkbox
                       highlight-current
                       @check-change="handleCheckChange">
              </el-tree>
            </div> -->
        </el-main>
    </el-container>
</template>

<script>
import { options } from '@/icons/icon.json'
export default {
    name: 'organization-container',
    data() {
        return{
            //应用列表
            placelist: [{
                placeName:"场景名称1",
                iconCls:""
            },{
                placeName:"场景名称2",
                iconCls:""
            }],
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
            roles: [],
            props: {
                label: 'unitName',
                children: 'children'
            },
            treeData: [],
            // treeData: [{
            //     label: '单位 1',
            //     children: [{
            //         label: '单位 1-1',
            //         children: [{
            //              label: '单位 1-1-1'
            //         }]
            //     }]
            //     }, {
            //     label: '单位 2',
            //     children: [{
            //         label: '单位 2-1',
            //         children: [{
            //              label: '单位 2-1-1'
            //         }]
            //     }, {
            //         label: '单位 2-2',
            //         children: [{
            //              label: '单位 2-2-1'
            //         }]
            //     }]
            //     }, {
            //     label: '单位 3',
            //     children: [{
            //         label: '单位 3-1',
            //         children: [{
            //         label: '单位 3-1-1'
            //         }]
            //     }, {
            //         label: '单位 3-2',
            //         children: [{
            //         label: '单位 3-2-1'
            //         }]
            //     }]
            // }],
            checkedKeys: [],
            //场景成员管理
            tableData: [{
                name: 'cx',
                tel: '1111',
                email: '222',
                section: 'boss'
            }]
        }
    },
    mounted() {
        this.$nextTick( function(){
            this.getPlaceList(1)
        })
    },
    methods: {
        //得到导航栏的选中信息
        handleSelect(key, keyPath) {
            this.activeKey = key;
            console.log(this.activeKey)
            this.getPlaceList();
        },
        //得到场景列表
        getPlaceList() {
            console.log(this.activeKey)
            // this.title = this.placelist[this.activeKey].sceneName
            // console.log(this.title)
            // this.id = this.placelist[this.activeKey].id
            var Params = {}
            this.$ajax({
                url:'/dev-api/organ/rest/scenes',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                this.placelist=[]
                console.log(res.data.obj)
                for(let i=0;i<res.data.obj.length;i++)
                {
                    let obj2 = {}
                    obj2.id = res.data.obj[i].id
                    obj2.isDeleted = res.data.obj[i].isDeleted
                    obj2.sceneName = res.data.obj[i].sceneName
                    obj2.statue = res.data.obj[i].status
                    this.placelist.push(obj2)
                }
                this.title = this.placelist[this.activeKey].sceneName
                this.id = this.placelist[this.activeKey].id
                //得到场景结构设置渲染数据
                var Params2 = {}
                this.$ajax({
                    url:'/dev-api/organ/rest/scene/'+this.placelist[this.activeKey].id,
                    method: 'get',
                    contentType: "application/json; charset=utf-8",
                    params: Params2
                }).then( res => {
                    this.treeData=[]
                    console.log(res.data)
                    this.treeData = res.data.obj
                    // for(let i=0;i<res.data.obj.length;i++)
                    // {
                    //     let obj3 = {}
                    //     obj3.id = res.data.obj[i].id
                    //     obj3.isDeleted = res.data.obj[i].isDeleted
                    //     obj3.sceneName = res.data.obj[i].sceneName
                    //     obj3.statue = res.data.obj[i].status
                    //     this.treeData.push(obj3)
                    // }
                    // console.log(this.treeData)
                }).catch( error => {
                    console.log()
                })
            }).catch( error => {
                console.log()
            })
        },
        //场景结构与场景成员页面跳转
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
        //重命名
        rename() {
            var Params = {
                id: this.id
            }
            this.$ajax({
                url:'/dev-api/organ/rest/scene',
                method: 'put',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                this.treeData=[]
                console.log(res.data)
                this.treeData = res.data.obj
                // for(let i=0;i<res.data.obj.length;i++)
                // {
                //     let obj3 = {}
                //     obj3.id = res.data.obj[i].id
                //     obj3.isDeleted = res.data.obj[i].isDeleted
                //     obj3.sceneName = res.data.obj[i].sceneName
                //     obj3.statue = res.data.obj[i].status
                //     this.treeData.push(obj3)
                // }
                // console.log(this.treeData)
            }).catch( error => {
                console.log()
            })
        },
        handleNodeClick(data) {
            console.log(data);
        },
        // handleCheckChange(data, checked, indeterminate) {
        // //        console.log(data,checked,indeterminate)
        // },
        // 修改table header的背景色
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
            return 'background-color:rgb(255,251,239); color:#333; font-family:YouYuan;'
            }
        },
    }
}
</script>

<style lang="scss" scoped>
#organization-container {
    height:92vh;
    // .el-header {
    //     .button-group {
    //         text-align: center;
    //         margin-top:13px;
    //     }
    // }
    // .el-aside {
    //     margin-left:10px;
    //     height:83vh;
    //     border: 1px solid #e0e0e0;
    // }
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
        // margin-right: 10px;
        // border: 1px solid #e0e0e0;
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
        span {
            line-height: 3.5;
            font-size: 15px;
            // font-weight: 500;
            padding-left: 8px;
            color: #555;
        }
        // background: #000;
    }
    
}
</style>
<style>
/* .el-tree {
    padding-left:30px;
} */
.el-tree-node__content {
    margin-left:60px;
    height: 35px;
    padding-left:20px;
}
.el-tree-node__children {
    padding-left:50px;
}
</style>

