<template>
    <el-container id="adminhome-container">
        <el-header>
            <h1>平台管理员登录界面</h1>
            <div class="right-tabs">
                <div><i class="el-icon-switch-button" style="font-size:18px;"></i></div>
                <div class="vertical-divider"></div>
                <div><span class="username">user</span></div>
            </div>
        </el-header>
        <el-main>
            <el-row :gutter="14" class="card-content">
                <el-col :span="15">
                <div class="grid-content bg-purple">
                    <div class="shared-head">
                        <span class="head__title"> 1、流程监控</span>
                        <div class="message__more">全部</div>
                    </div>
                    <div class="button-group">
                        <el-row :gutter="14">
                            <el-col :span="8">
                                <el-card class="button">
                                    <div class="button-icon" style="background:rgb(49,180,141)">
                                        <svg-icon icon-class="icon-flowruning"/>
                                    </div>
                                    <div class="button-title" style="color:rgb(49,180,141)">132</div>
                                    <div class="button-title" style="font-size: 15px;">运行中</div>
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card class="button" @click="toHistoryFlow()">
                                    <div class="button-icon" style="background:rgb(56, 161, 242)">
                                        <svg-icon icon-class="icon-history"/>
                                    </div>
                                    <div class="button-title" style="color:rgb(56, 161, 242)">200</div>
                                    <div class="button-title" style="font-size: 15px;">历史流程</div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                </el-col>
                <el-col :span="9">
                    <div class="grid-content bg-purple">
                        <div class="shared-head">
                            <span class="head__title"> 2、流程日志</span>
                            <div class="message__more">更多</div>
                        </div>
                        <div class="shared-body">
                            <el-row style="line-height:26px;">
                                <el-col :span="18"><li>用户uesr发起了请假单流程</li></el-col>
                                <el-col :span="6"><span style="color:#999">2019-07-04</span></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="18"><li>用户橙粒粒的木马人儿发起了审核表流程</li></el-col>
                                <el-col :span="6"><span style="color:#999">2019-07-05</span></el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="card-content" style="margin-top:15px;height:400px;">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <div class="shared-head">
                            <span class="head__title"> 3、流程实例</span>
                            <div class="message__more">更多</div>
                        </div>
                        <el-row>
                            <el-col :span="8" style="padding-top:20px">
                                折线图
                            </el-col>
                            <el-col :span="8"></el-col>
                            <el-col :span="8"></el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
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
        toHistoryFlow() {
            this.$router.push({
                path:'/historyflow'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#adminhome-container {
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
        // padding: 0px;
        // background: rgb(240,242,245);
        // .basic-container {
        //     padding: 12px 10px;
        //     border-radius: 10px;
        //     box-sizing: border-box;
        // }
        // .el-card {
        //     height:340px;
        //     box-shadow: none;
        //     border: none!important;
        //     .cardtitle {
        //         font-size: 20px;
        //         line-height: 28px;
        //         font-weight: 500;
        //         color: rgba(0,0,0,.85);
        //         margin-bottom: 12px
        //     }
        // }
        // .card3 {
        //     margin: 0px 10px;
        // }
        // color: white;
            text-align: center;
            // height: 100%;
            display: grid;
            padding: 20px 20px;
            background-color: #f3f5f8;

        .card-content {
            // padding-bottom: 10px;
            // height: 30px;;
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
            margin-top: 0px;
            height: 100%;
            border-color: white;
            box-shadow: 0 1.5px 8px 0 #e0e5f0;
            .button-group {
                padding: 25px;
                .button {
                    border-radius: 8px;
                    box-shadow: none;
                    float: left;
                    padding: 0px 20px;
                    color: #999;
                    width: 100%;
                    height: 100px;
                    padding: 0px;
                    .button-icon {
                        float: left;
                        width: 40%;
                        height: 100px;
                        font-size: 50px;
                        color: white;
                        padding-top: 15px;
                    }
                    .button-title {
                        padding-top: 28px;
                        font-size: 28px;
                        line-height: 10px;
                        text-align: center;
                    }
                }
                .button:hover {
                    background: rgb(248, 245, 245);
                }
            }
            .shared-body {
                padding: 20px;
                width: 100%;
                color: rgb(75, 71, 71);
                li {
                    float: left;
                    padding-left: 15px;
                }
            }
        }
    }
}
</style>
<style>
#adminhome-container .el-card__body {
    padding: 0px;
}
</style>

