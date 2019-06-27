<template>
  <div class="login-container">
    <el-form
      ref="regForm"
      :model="regForm"

      class="login-form"
      auto-complete="on"
      label-position="left"
      label-width="100px"
    >
      <div class="title-container">
        <h3 class="title">资产云☁️</h3>
        <h3 class="title">注册页面</h3>
      </div>

      <!-- 用户类型 -->
      <el-form-item
        prop="usertype"
        label="用户类型"
      >
        <el-select
          v-model="regForm.usertype"
          placeholder="请选择身份"
        >
          <el-option
            label="管理员"
            value="1"
          ></el-option>
          <el-option
            label="普通用户"
            value="2"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 真实姓名 -->
      <el-form-item
        prop="realname"
        label='真实姓名'
      >
        <el-input
          ref="realname"
          v-model="regForm.realname"
          placeholder="真实姓名"
          name="realname"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item
        prop="username"
        label='昵称'
      >
        <el-input
          ref="username"
          v-model="regForm.username"
          name="username"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别">
        <el-radio-group v-model="regForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 出生日期 -->
      <el-form-item label="出生日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="regForm.date"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <!-- 手机号码 -->
      <el-form-item
        prop="tel"
        label='手机号码'
      >
        <el-input
          ref="tel"
          v-model="regForm.tel"
          placeholder="手机号码"
          name="tel"
          type="text"
        />
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item
        prop="mail"
        label='邮箱'
      >
        <el-input
          ref="mail"
          v-model="regForm.mail"
          placeholder="邮箱"
          name="mail"
          type="text"
        />
      </el-form-item>

      <!-- 证件类型 -->
      <el-form-item
        prop="cardtype"
        label="证件类型"
      >
        <el-select
          v-model="regForm.cardtype"
          placeholder="请选择证件类型"
        >
          <el-option
            label="身份证"
            value="1"
          ></el-option>
          <el-option
            label="护照"
            value="2"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 居住地址 -->
      <el-form-item
        prop="addr"
        label='居住地址'
      >
        <el-input
          ref="addr"
          v-model="regForm.addr"
          placeholder="证件号码"
          name="addr"
        />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item
        prop="password"
        label="密码"
      >
        <el-input
          ref="password"
          v-model="regForm.password"
          placeholder="Password"
          name="password"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码确认"
      >
        <el-input
          ref="password"
          v-model="regForm.password2"
          placeholder="Password"
          name="password"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleReg"
      >注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { login } from '@/api/user'

export default {
  name: 'Reg',
  data() {



    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      regForm: {
        usertype:'',//
        realname:'',
        username: '',
        sex:'',
        date:'',
        tel:'',
        mail:'',
        cardtype:'',
        addr:'',
      },
      //   loginRules: {
      //     accountName: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //     pwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
      //   },
        loading: false,
      //   passwordType: 'password',
      //   redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleReg() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          this.loading = true

          login(this.regForm).then(response => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })


          // this.$store.dispatch('login', this.regForm).then(() => {
          //   this.$router.push({ path: this.redirect || '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

// /* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 388px;;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 560px;
    max-width: 100%;
    padding: 30px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    // border: aqua 1px solid;
  }

  .title-container {
    text-align: center;
    color: $dark_gray;
    margin-bottom: 40px;
  }
}
</style>
