<template>
    <el-container class="startedme-container">
        <el-header height="25px">
            <span style="margin-left:3%;width:20%">标题</span>
            <div class="vertical-divider"></div>
            <span style="width:37%">内容</span>
            <div class="vertical-divider"></div>
            <span style="width:18%">创建时间</span>
            <div class="vertical-divider"></div>
            <span>操作</span>
            <el-button type="primary" size="small" style="float:right;margin-right:-120px;margin-top:-5px;">发起流程</el-button>
        </el-header>
        <el-main>
            <p>当前没有任何内容</p>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'topbar',
    data() {
        return {

        };
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.startedme-container {
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
        p {
            margin: 0 0 10px;
            text-align: center;
            margin-top: 250px;
            color: rgb(136,147,167);
        }
    }
}
</style>