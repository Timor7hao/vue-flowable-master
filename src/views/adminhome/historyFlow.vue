<template>
    <el-container id="historyflow-container">
        <el-header>
            <h1>流程跟踪</h1>
            <div class="right-tabs">
                <div><i class="el-icon-switch-button" style="font-size:18px;"></i></div>
                <div class="vertical-divider"></div>
                <div><span class="username">user</span></div>
            </div>
        </el-header>
        <el-main>
            <el-card>
                <div class="search-section">
                    <el-form :inline="true" :model="formInline" label-width="90px" size="small">
                        <el-form-item label="执行id" >
                            <el-input v-model="formInline.user" placeholder="执行id" style="width:250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="流程key">
                            <el-input v-model="formInline.user" placeholder="流程key" style="width:250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="流程实例id">
                            <el-input v-model="formInline.user" placeholder="流程实例id" style="width:250px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search">搜索</el-button>
                            <el-button icon="el-icon-delete">清空</el-button>
                        </el-form-item>
                    </el-form>
                    <br>
                    <el-table :data="tableData" border style="width: 100%;height:69vh;" size="small" :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}">
                        <el-table-column type="selection" width="60" fixed></el-table-column>
                        <el-table-column type="index" width="60" fixed></el-table-column>
                        <el-table-column prop="startid" label="执行id" width="360"></el-table-column>
                        <el-table-column prop="flowkey" label="流程key" width="100"></el-table-column>
                        <el-table-column prop="flowid" label="流程实例id" width="360"></el-table-column>
                        <el-table-column prop="status" label="状态" width="100"></el-table-column>
                        <el-table-column prop="startman" label="发起人" width="120"></el-table-column>
                        <el-table-column prop="starttime" label="开始时间" width="180"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button  @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-delete">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        style="float:right;margin-top:10px;"
                        background
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                    </el-pagination>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'topbar',
    data() {
        return {
            formInline: {
                user: '',
                region: ''
            },
            tableData: [{
                startid: '1578ee64-9cae-11e9-92b3-0242da45491b',
                flowkey: 'Leave',
                flowid: '1578ee64-9cae-11e9-92b3-0242da45491b',
                status: '激活',
                startman: '管理员',
                starttime: '2019-07-02 17:45:11'
            }, {
                startid: '1578ee64-9cae-11e9-92b3-0242da45491b',
                flowkey: 'Leave',
                flowid: '1578ee64-9cae-11e9-92b3-0242da45491b',
                status: '激活',
                startman: '管理员',
                starttime: '2019-07-02 17:45:11'
            }]
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
#historyflow-container {
    height:100vh;
    .el-header {
        background: rgb(0,33,64);
        h1 {
            color: white;
            font-size: 22px;
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
            width: 140px;
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
            background: rgb(56,161,242);
            border-radius: 30px;
            overflow: hidden;
            margin-right: 20px;
            cursor: pointer;
            color: #fff;
            float: right;
            margin-top: 13px;
        }
    }
    .el-main {
        background-color: #f3f5f8;
        padding:12px;
        .el-card {
            border: none;
            padding-top: 20px;
            height: 89vh;
        }
    }
}
</style>
