<template>
    <div id="formDesign">
        <el-form :model="dynamicValidateForm" :rules="rules" ref="dynamicValidateForm">
            <el-form-item label="表单名称：" prop="input">
                <el-input 
                    v-model="dynamicValidateForm.input"
                    placeholder="请输入表单名称"
                    class="input-name"
                    style="width:85%">
                </el-input>
                <el-button type="primary" @click="getjson()" style="float:right;margin-left:15px;position:fixed">保存表单</el-button>
            </el-form-item>
        </el-form>
        <fm-making-form 
            class="formMaking"
            ref="makingform"
            style="height: 500px;"
            preview>
            <template slot="action"></template>
        </fm-making-form>
    </div>
</template>

<script>
export default {
    name: 'formDesign',
    inject:['reload'],
    // props: ['apptitle'],
    data() {
        return {
            dynamicValidateForm: {
                input: '',
            },
            storage: '',
            rules: {
                input:[
                    { required: true, message: '请输入表单名称', trigger: 'blur' },
                ]
            },
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
        }
    },
    mounted() {
        this.$nextTick( function(){
            this.getinitalize(1)
        })
    },
    // watch:{
    //     apptitle:function(val) {
    //         console.log(val)
    //     }
    // },
    methods: {
        //得到路由传过来的参数
        getinitalize() {
            this.$refs.makingform.setJSON(this.jsonData)
        },
        /**获取设计器json数据**/
        getjson() {
            console.log(this.$root.apptitle)
            console.log(this.$refs.makingform)
            console.log(JSON.stringify(this.$refs.makingform.getJSON()));
            //写入a字段
            this.storage = this.$refs.makingform.getJSON();
            // this.dialogVisible = true;
            console.log(this.storage)
            // this.$refs.dynamicValidateForm.validate((valid) => {
            //     if(valid) {
            //         var Params = {
            //             icon_cls: "",
            //             oapp_id: this.$root.apptitle,
            //             form_name: this.dynamicValidateForm.input,
            //             model_json: this.storage.list,
            //             created_by: "sasas"
            //         }
            //         console.log(Params)
            //         this.$ajax({
            //             url:'/api/form/model/create',
            //             method: 'post',
            //             contentType: "application/json; charset=utf-8",
            //             data: Params
            //         }).then( res => {
            //             console.log(res.data.obj.id)
            //             // res.data  = JSON.parse(res.data)
            //             // console.log(res.data)
            //             if(res.data.obj.id) {
            //                 this.$root.appid = res.data.obj.id
            //                 this.$message({
            //                     type: 'success',
            //                     message: '保存成功' 
            //                 });
            //                 this.reload();
            //             }
            //             else {
            //                 this.$message({
            //                     type: 'error',
            //                     message: '保存失败' 
            //                 });
            //             }
            //         }).catch( error => {
            //             console.log()
            //         })
            //     }
            //     else {
            //         console.log('错误')
            //         return false;
            //     }
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
#formDesign {
    // padding: 30px 20px;
    height: 87vh;
    .input-name {
        margin-bottom: 15px;
    }
}
</style>
<style>
.fm2-container{
    height:88% !important;
}
.fm2-container .el-footer {
    display: none;
}
</style>

