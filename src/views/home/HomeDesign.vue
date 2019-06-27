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
            <h2>自定义首页</h2>
            <el-popover
                placement="bottom-start"
                width="320"
                trigger="hover">
                <div class="operation-guide" style="padding:10px;color:#304265;line-height:1.6">
                    <h4 style="font-size:15px;margin:0;margin-bottom:5px">操作引导</h4>
                    <div>1、将左侧组件拖入网格区域<br/>2、拖动网格区域的组件卡片边框调整大小<br/>3、拖动卡片进行网格位置布局</div>
                </div>
                <i class="el-icon-question" slot="reference"></i>
            </el-popover>
            <el-button type="primary">确定</el-button>
            <el-button @click="toHome()">取消</el-button>
        </el-header>
        
        <el-container>
            <el-aside width="200px;">
                <h2>基础组件</h2>
                <el-input placeholder="我的流程" disabled></el-input>
                <el-input placeholder="提醒事项"></el-input>
                <h2>报表组件</h2>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <h2>采购入库报表</h2>
                <div v-if="visible">
                    <i slot="suffix" title="show" @click="change('show')" class="el-icon-arrow-up"></i>
                    <el-card style="background:#f7fafc;width:200px;"><i class="el-icon-tickets"></i> 明细表</el-card>
                    <br/>
                    <el-card style="background:#f7fafc;width:200px;"><i class="el-icon-postcard"></i> 汇总表</el-card>
                </div>
                <div v-else>
                    <i slot="suffix" title="show" @click="change('hide')" class="el-icon-arrow-down"></i>
                </div>
            </el-aside>
            <el-main>
                <!-- <el-row :gutter="20">
                    <el-col :span="15">
                    <div class="grid-content bg-purple">
                        <div class="shared-head">
                        <span class="head__title"> 我的流程</span>
                        <div class="message__more">更多</div>
                        </div>
                        <ul class="work-list__content">
                        <li class="to_do_list">
                            <div class="todo__title">代办</div>
                            <span class="todo__count">0</span>
                        </li>
                        <li class="to_do_list">
                            <div class="todo__title">代阅</div>
                            <span class="todo__count">0</span>
                        </li>
                        <li class="to_do_list">
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
                </el-row> -->

                <!-- <div>
                    <grid-layout
                        :is-draggable="true"
                        :is-resizable="true"
                        :is-mirrored="false"
                        :layoutList="layout">
                    </grid-layout>
                </div> -->
                <grid-layout
                    :layout="layoutData"
                    :col-num="12"
                    :row-height="5"
                    :is-draggable="true"
                    :is-resizable="true"
                    :is-mirrored="false"
                    :vertical-compact="true"
                    :margin="[10, 10]"
                    :use-css-transforms="true"
                >
                    <grid-item v-for="(item,index) in layoutData"
                                :x="item.x"
                                :y="item.y"
                                :w="item.w"
                                :h="item.h"
                                :i="item.i"
                                :key="item.i"
                    >
                    {{index}}
                    </grid-item>
                </grid-layout>



<!-- 
                <el-row :gutter="24">
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <img src="" alt="">
                            <el-button type="text" @click="toDefineHome()">自定义首页添加内容</el-button>
                        </div>
                    </el-col>
                </el-row> -->
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
const GridLayout = VueGridLayout.GridLayout
const GridItem = VueGridLayout.GridItem
// import { GridLayout,GridItem } from 'vue-grid-layout'
// let testLayout = [
//         {"x":0,"y":0,"w":2,"h":2,"i":"0"},
//         {"x":2,"y":0,"w":2,"h":4,"i":"1"},
//     ];

export default {
    name: 'Dashboard',
    components: {
            // ResponsiveGridLayout,
            GridLayout,
            GridItem,
        },
    // computed: {
    //     ...mapGetters([
    //     'name'
    //     ])
    // },
    data(){
        return {
            value: '选项1',
            options:[{
                value:'选项1',
                label: '采购管理'
            }],
            visible:true,
            layoutData : [
                {"x":0,"y":0,"w":2,"h":2,"i":"0"},
                {"x":2,"y":0,"w":2,"h":4,"i":"1"},
            ]
            //
            // layout: JSON.parse(JSON.stringify(testLayout)),
            // layout2: JSON.parse(JSON.stringify(testLayout)),
            // draggable: true,
            // resizable: true,
            // mirrored: false,
            // responsive: true,
            // rowHeight: 30,
            // colNum: 12,
            // index: 0
        };
    },
    // mounted: function () {
    //     this.index = this.layout.length;
    // },
    methods: {
        //
        //  clicked: function() {
        //         window.alert("CLICK!");
        //     },
        //     increaseWidth: function() {
        //         let width = document.getElementById("content").offsetWidth;
        //         width += 20;
        //         document.getElementById("content").style.width = width+"px";
        //     },
        //     decreaseWidth: function() {
        //         let width = document.getElementById("content").offsetWidth;
        //         width -= 20;
        //         document.getElementById("content").style.width = width+"px";
        //     },
        //     removeItem: function(item) {
        //         //console.log("### REMOVE " + item.i);
        //         this.layout.splice(this.layout.indexOf(item), 1);
        //     },
        //     addItem: function() {
        //         // let self = this;
        //         //console.log("### LENGTH: " + this.layout.length);
        //         let item = {"x":0,"y":0,"w":2,"h":2,"i":this.index+"", whatever: "bbb"};
        //         this.index++;
        //         this.layout.push(item);
        //     },
        //     move: function(){
        //         // console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
        //     },
        //     resize: function(){
        //         // console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        //     },
        //     moved: function(i, newX, newY){
        //         console.log("### MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
        //     },
        //     resized: function(i, newH, newW, newHPx, newWPx){
        //         console.log("### RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        //     },
        //     /**
        //      * Add change direction button
        //      */
        //     changeDirection() {
        //         let documentDirection = getDocumentDir();
        //         let toggle = "";
        //         if (documentDirection === "rtl") {
        //             toggle = "ltr"
        //         } else {
        //             toggle = "rtl"
        //         }
        //         setDocumentDir(toggle);
        //         //eventBus.$emit('directionchange');
        //     },
        //
        change(value) {
            this.visible = !(value === 'show');
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
        toHome() {
            this.$router.push({
                path: '/home'
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
        }
    }
}
</script>
<style lang="scss" scoped>
.home-container {
    height: 100vh;
    .el-header,
    .el-footer {
        color: #333;
        line-height: 50px;
        border-bottom: 1px solid #efefef;
        // box-shadow: 0 0 8px 0 #e0e5f0;
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
        h2{
            position: relative;
            padding-top: 5px;
            // padding-bottom: 17px;
            line-height: 22px;
            font-size: 16px;
            font-weight: 600;
            color: #304265;
            float:left;
        }
        .el-icon-question {
            font-size: 18px;
            margin-top: 20px;
            margin-left: 10px;
            cursor: pointer;
            color: #C0C0C0;
        }
        .el-button {
            float:right;
            width:90px;
            height: 40px;
            margin:10px;
            margin-right:0px;
        }
    }
    .el-aside{
        padding:15px;
        width: 230px;
        h2 {
            position: relative;
            padding-top: 5px;
            padding-left: 10px;
            line-height: 22px;
            font-size: 16px;
            font-weight: 600;
            color: #304265;
            float:left; 
        }
        .el-input {
            width:200px;
            padding-bottom:10px;
        }
        .el-select {
            width:200px;
            padding-bottom:8px;
        }
        .el-icon-arrow-down,.el-icon-arrow-up{
            float:right;
            margin-top:20px;
        }
    }
    .el-main {
        color: #333;
        text-align: center;
        height: 100pv;
        display: grid;
        // padding: 50px 100px;
        background-color: #f3f5f8;
    
    .vue-grid-item {
        background: aquamarine;
    }
    .designer-sidebar{
        flex-basis: 248px;
        min-width: 248px;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        padding-bottom: 30px;
        background: #fff;
        -webkit-box-shadow: 0 0 8px 0 #e0e5f0;
        box-shadow: 0 0 8px 0 #e0e5f0;
        border-radius: 0 4px 4px 0;
        overflow-x: hidden;
        overflow-y: auto; 
    }
    .el-row {
        margin-bottom: 30px;
        &:first-child {
            height: 320px;
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
        min-height: 36px;
        height: 100%;
    }
    }

    body > .el-container {
        margin-bottom: 40px;
    }
}
</style>
