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
        <fm-making-form upload
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
    props: ['apptitle','appid','formName','formid','formjson'],
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
            //是否修改，为0保存表单，为1修改表单
            wheaterModifier: 0,
            // jsonData: {
            //     "list": [
            //     {
            //         "type": "input",
            //         "name": "单行文本",
            //         "icon": "icon-input",
            //         "options": {
            //         "width": "100%",
            //         "defaultValue": "",
            //         "required": false,
            //         "dataType": "string",
            //         "pattern": "",
            //         "placeholder": "",
            //         "remoteFunc": "func_1540908864000_94322"
            //         },
            //         "key": "1540908864000_94322",
            //         "model": "input_1540908864000_94322",
            //         "rules": [
            //         {
            //             "type": "string",
            //             "message": "单行文本格式不正确"
            //         }
            //         ]
            //     }
            //     ],
            //     "config": {
            //     "labelWidth": 100,
            //     "labelPosition": "top",
            //     "size": "small"
            //     }
            // },
            values: {},
            remoteFuncs: {},
        }
    },
    mounted() {
        this.$nextTick( function(){
            this.getinitalize(1)
        })
    },
    watch:{
        // apptitle:function(val) {
        //     console.log(val)
        // },
        // formName:function(val) {
        //     console.log(val)
        // },
        // formid:function(val) {
        //     console.log(val)
        // },
        // formjson:function(val) {
        //     console.log(val)
        // }
    },
    methods: {
        //得到路由传过来的参数
        getinitalize() {
            // this.$refs.makingform.setJSON(this.jsonData)
            console.log(this.apptitle)
            console.log(this.appid)
            console.log(this.formName)
            console.log(this.formid)
            console.log(this.formjson)
            if(this.formjson) {
                console.log("formjson:"+JSON.parse(this.formjson))
                this.dynamicValidateForm.input = this.formName;
                this.$refs.makingform.setJSON(JSON.parse(this.formjson));
                this.wheaterModifier = 1;
            }
        },
        /**获取设计器json数据**/
        getjson() {
            // console.log(this.apptitle)
            console.log(this.$refs.makingform)
            console.log(JSON.stringify(this.$refs.makingform.getJSON()));
            this.storage = this.$refs.makingform.getJSON();
            console.log(this.storage)
            this.$refs.dynamicValidateForm.validate((valid) => {
                if(valid) {
                    //如果新创建，则保存表单
                    if(this.wheaterModifier == 0) {
                        var Params = {
                            icon_cls: "",
                            oapp_id: this.appid,
                            form_name: this.dynamicValidateForm.input,
                            model_json: this.storage,
                            created_by: "sasas"
                        }
                        console.log(Params)
                        this.$ajax({
                            url:'/my-api/form/model/create',
                            method: 'post',
                            contentType: "application/json; charset=utf-8",
                            data: Params
                        }).then( res => {
                            console.log(res.data.obj.id)
                            if(res.data.obj.id) {
                                this.$root.appid = res.data.obj.id
                                this.$message({
                                    type: 'success',
                                    message: '保存成功' 
                                });
                                //添加到权限中
                                var Params2 = {
                                    applicationId: this.appid,
                                    formModelId: res.data.obj.id,
                                    formName: this.dynamicValidateForm.input,
                                    groupId: "1",
                                    groupName: "test",
                                    iconCls: "",
                                }
                                console.log(Params2)
                                this.$ajax({
                                    url:'/dev-api/menu/form/add',
                                    method: 'post',
                                    contentType: "application/json; charset=utf-8",
                                    data: Params2
                                }).then( res2 => {
                                    console.log(res2)
                                    if(res2.data.status==200)
                                        this.$message({
                                            type: 'success',
                                            message: '添加权限操作成功' 
                                        });
                                    else {
                                        this.$message({
                                            type: 'error',
                                            message: '添加权限操作失败' 
                                        });
                                    }
                                    //绑定场景与表单
                                    // var Params3 = {
                                    //     formModelId: res.data.obj.id,
                                    //     sceneId: 'e65edc60-96ee-11e9-ac96-005056c00001',
                                    // }
                                    // // console.log(Params2)
                                    // this.$ajax({
                                    //     url:'/dev-api/menu/form/add',
                                    //     method: 'post',
                                    //     contentType: "application/json; charset=utf-8",
                                    //     data: Params3
                                    // }).then( res3 => {
                                    //     console.log("绑定场景成功")
                                    // }).catch( error => {
                                    //     console.log("绑定场景失败")
                                    // })
                                }).catch( error => {
                                    this.$message({
                                        type: 'error',
                                        message: '添加权限失败' 
                                    });
                                    console.log()
                                })
                            }
                            else {
                                this.$message({
                                    type: 'error',
                                    message: '保存失败' 
                                });
                            }
                        }).catch( error => {
                            console.log()
                        })
                    }
                    //修改表单
                    else {
                        var Params = {
                            form_model_id: this.formid,
                            form_name: this.dynamicValidateForm.input,
                            model_json: this.storage,
                            group_id: -1,
                            icon_cls: "",
                        }
                        console.log(Params)
                        this.$ajax({
                            url:'/my-api/form/model/edit',
                            method: 'put',
                            contentType: "application/json; charset=utf-8",
                            data: Params
                        }).then( res => {
                            this.$message({
                                type: 'success',
                                message: '修改表单成功' 
                            });
                        }).catch( error => {
                            this.$message({
                                type: 'success',
                                message: '修改表单失败' 
                            });
                            console.log()
                        })
                    }
                }
                else {
                    console.log('错误')
                    return false;
                }
            })
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

