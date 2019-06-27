<template>
    <div id="flowDesign">
        <iframe
            src="static/flowable-modeler/index.html"
            frameborder="0"
            width="100%"
            height="1000px">
        </iframe>
    </div>
</template>

<script>
import { Script } from 'vm';
export default {
    name: 'flowDesign',
    // props: ['apptitle'],
    data() {
        return {
            vuetitle: "mytitle",
            vueid: "myid",
            vuemy: "1",
        }
    },
    created () {
        let self = this
        if(this.$root.appid && this.$root.apptitle) {
            window[this.vuetitle] = ()=> {
                return this.$root.apptitle
            }
            window[this.vueid] = ()=> {
                // self.getWindowId()
                return this.$root.appid
            }
        }
        else {
            this.$message({
                type: 'error',
                message: '请先保存表单模型' 
            });
        }
    },
    // mounted: function() {
    //     this.$nextTick(function() {

    //     })
    // },
    methods: {
        //把全局变量数据暴露到windows中
        getWindowTitle() {
            // a=this.$root.apptitle
            return this.$root.apptitle
        },
        getWindowId() {
            return this.$root.appid
        }
            // alert(this.$root.apptitle,this.$root.appid)
            // console.log(this.$root.apptitle)
            // if(this.$root.appid=='')
            //     console.log("请先保存表单设计")
            // console.log(this.$root.appid)
        // },
        // getParams:function(params) {
        //     console.log(params)
        // }
    }
}
</script>

<style lang="scss" scoped>
#flowDesign {
    // height: 87vh;
}
</style>
<style>
iframe {
    height: 86vh;
}
</style>

