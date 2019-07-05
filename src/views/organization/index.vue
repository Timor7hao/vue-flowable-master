<template>
    <el-container id="organization-container">
        <el-main>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="padding:20px;"> 
                <!-- <el-menu-item index="0" @click="placestucture()">场景结构设置</el-menu-item>
                <el-menu-item index="1" @click="placemember()" style="margin-left:10%">场景成员设置</el-menu-item>
                <div id="buttongroup1" style="display:block">
                    <el-button type="primary" size="mini" style="float:right;margin-top:12px">保存</el-button>
                    <el-button type="primary" size="mini" style="float:right;margin-right:8px;margin-top:12px">同步组织机构</el-button>
                </div>
                <div id="buttongroup2" style="display:none">
                    <el-button type="primary" size="mini" style="float:right;margin-top:12px">添加</el-button>
                    <el-button type="danger" size="mini" style="float:right;margin-right:8px;margin-top:12px">批量移除</el-button>
                </div> -->
                <el-input placeholder="搜索单位和部门" style="float:left;width:250px;">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div id="buttongroup2">
                    <el-button type="primary" size="mini" style="float:right;margin-top:12px">同步组织机构树</el-button>
                    <el-button type="danger" size="mini" style="float:right;margin-right:30px;margin-top:12px">批量移除</el-button>
                    <el-button type="primary" size="mini" style="float:right;margin-right:20px;margin-top:12px">新增</el-button>
                </div>
            </el-menu>
            <el-card>
                <!-- <span>{{title}}</span> -->
                <el-tree 
                    :props="props"
                    :data="treeData" 
                    @node-click="handleNodeClick"
                    default-expand-all
                    highlight-current>
                </el-tree>
            </el-card>
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
    .el-main {
        // margin-right: 10px;
        // border: 1px solid #e0e0e0;
        border-left:none;
        padding-top:10px;
        background-color:rgb(242,245,248);
        .el-card {
            margin-top:20px;
            height:75vh;
            display: block;
            margin-left:1.5%;
            margin-right:1.5%;
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
        // span {
        //     line-height: 3.5;
        //     font-size: 15px;
        //     // font-weight: 500;
        //     padding-left: 8px;
        //     color: #555;
        // }
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

