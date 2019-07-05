<template>
    <el-container class="waitread-container">
        <el-header height="25px">
            <!-- <span style="margin-left:3%;width:20%">标题</span>
            <div class="vertical-divider"></div>
            <span style="width:37%">内容</span>
            <div class="vertical-divider"></div>
            <span style="width:18%">接收时间</span>
            <div class="vertical-divider"></div>
            <span>操作</span> -->
            <el-row :gutter="23">
                <el-col :span="6">
                    <span style="margin-left:20%;">标题</span>
                    <div class="vertical-divider" style="float:right"></div>
                </el-col>
                <el-col :span="0.5">&nbsp;</el-col>
                <el-col :span="9">
                    <span>内容</span>
                    <div class="vertical-divider" style="float:right"></div>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                    <span>接收时间</span>
                    <div class="vertical-divider" style="float:right"></div>
                </el-col>
                <el-col :span="3.5">
                    <span>操作</span>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-card v-for="(item,index) in showlist" :key="index">
                <el-row :gutter="23" class="rowstyle">
                    <el-col :span="1">
                        <div><span class="username">海杰</span></div>
                    </el-col>
                    <el-col :span="4">
                        <span @click="dialogVisible = false;getKey(item)">胡海杰的请假说明-此标签点击新增即可查看</span>
                    </el-col>
                    <el-col :span="0.5">&nbsp;</el-col>
                    <el-col :span="9">
                        <span>采购管理</span><br>
                        <span style="color:orange;line-height:2">抄送节点</span>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="5">
                        <!-- <span>2019/06/18</span><br>
                        <span style="line-height:2">14:50:21</span> -->
                        <span>{{item.createdTime}}</span>
                    </el-col>
                    <el-col :span="3.5">
                        <el-button type="primary" size="small" @click="readRight(item)">已阅</el-button>
                    </el-col>
                </el-row>
            </el-card>
            <div class="addPage" :hidden="dialogVisible">
                <span style="float:left;line-height:3.2;font-size:16px;padding-left:20px;">使用说明</span>
                <div class="navbar-header">
                    <el-button @click="dialogVisible = true"><i class="el-icon-close"></i><span>关闭</span></el-button>
                    <!-- <el-button v-for="(item,index) in buttonlist2" :key="index">
                        <svg-icon :icon-class="item.iconCls"/><span>{{item.name}}</span>
                    </el-button> -->
                </div>
                <div class="main" style="padding:40px;">
                    <fm-generate-form
                        :data="jsonData"
                        :remote="remoteFuncs"
                        :value="values"
                        ref="generateForm">
                    </fm-generate-form>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'topbar',
    inject:['reload'],
    data() {
        return {
            showlist: [],
            dialogVisible: true,
            buttonlist2: [],
            //表单渲染
            jsonData: {
                "list": [
                {
                    "type": "input",
                    "name": "单行文本",
                    "icon": "icon-input",
                    "options": {
                    "width": "100%",
                    "defaultValue": "",
                    "required": false,
                    "dataType": "string",
                    "pattern": "",
                    "placeholder": "",
                    "remoteFunc": "func_1540908864000_94322"
                    },
                    "key": "1540908864000_94322",
                    "model": "input_1540908864000_94322",
                    "rules": [
                    {
                        "type": "string",
                        "message": "单行文本格式不正确"
                    }
                    ]
                }
                ],
                "config": {
                "labelWidth": 100,
                "labelPosition": "top",
                "size": "small"
                }
            },
            values: {},
            remoteFuncs: {},
            clickitem: ''
        };
    },
    mounted () {
        this.$nextTick( function(){
            this.getShowList(1);
        })
    },
    methods: {
        //展示页面数据
        getShowList() {
            var Params = {
                user_id: "user",
                task_type: 1
            }
            console.log(Params)
            this.$ajax({
                url:'/my-api/form/inst/show',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                console.log(res.data.obj);
                this.showlist = res.data.obj;
                for(var i=0;i<res.data.obj.length;i++)
                    this.showlist[i].createdTime = this.getTime(res.data.obj[i].createdTime) 
            }).catch( error => {
                console.log()
            })
        },
        //得到点击的位置信息
        getKey(item) {
            var result = JSON.parse(item.formValue);
            this.jsonData = JSON.parse(item.formInstJson)
            this.values = result 
            this.clickitem = item
            console.log(this.clickitem)
        },
        //待阅节点已阅按钮
        readRight(item) {
            this.getKey(item);
            console.log(item)
            var Params = {
                form_inst_id: this.clickitem.id,
                proc_inst_id: this.clickitem.procInstId,
                editor: 'user1',
                task_id: this.clickitem.taskId,
                form_inst_value: this.clickitem.formValue
            }
            console.log(Params)
            this.$ajax({
                url:'/my-api/form/inst/read',
                method: 'post',
                contentType: "application/json; charset=utf-8",
                data: Params
            }).then( res => {
                if(res.status == 200) {
                    this.$message({
                        type: 'success',
                        message: '已阅成功',
                    });
                this.reload();
                } else {
                    this.$message({
                        type: 'error',
                        message: '已阅失败',
                    });
                }
            }).catch( error => {
                console.log()
            })
        },
        //将毫秒数转换成日期格式
        getTime(str) {
            var oDate = new Date(str);
            var oMonth = oDate.getMonth()+1;  
            var oDay = oDate.getDate();
            var oDate1 = oDate.getFullYear()+'/'+this.getzf(oMonth)+'/'+this.getzf(oDay);
            var oDate2 = this.getzf(oDate.getHours())+':'+this.getzf(oDate.getMinutes())+':'+this.getzf(oDate.getSeconds());
            return oDate1+' '+oDate2;
        },
        //转换日期首位补零
        getzf(num) {
            if(parseInt(num)<10) {
                num = '0'+ num;
            }
            return num;
        }
    }
}
</script>

<style lang="scss" scoped>
.waitread-container {
    height: 87vh;
    background: rgb(243,245,248);
    margin-left: 8%;
    margin-right: 8%;
    .el-header {
        span {
            color: rgb(136,147,167);
            float: left;
            font-size:15px;
        }
        .vertical-divider {
            float: left;
            height: 16px;
            color: rgb(213,219,230);
            padding: 0 !important;
            margin: 0px 35px 0px 10px !important;
            height: 25px;
            border-left: 1px solid;
            font-size: 0;
        }
    }
    .el-main {
        padding-left: 0px;
        padding-right: 0px;
        // p {
        //     margin: 0 0 10px;
        //     text-align: center;
        //     margin-top: 250px;
        //     color: rgb(136,147,167);
        // }
        .el-card {
            padding: 20px;
            box-shadow: 0 2px 8px 0 rgba(95,134,218,.1);
            padding-left: 20px;
            margin-bottom: 15px;
            .rowstyle {
                //垂直居中
                display: flex;
                justify-content: center;
                align-items: center;
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
                cursor: pointer;
                color: #fff;
            }
            span {
                display:inline;
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
}
</style>
<style>
.waitread-container .el-card {
    padding: 20px !important;
}
.waitread-container .el-card__body {
    padding: 0px !important;
}
</style>