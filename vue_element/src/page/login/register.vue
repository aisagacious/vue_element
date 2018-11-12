<template>
    <div class="register">
        <el-form class="login-form" autoComplete="on" ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left">
            <div class="login-container">
                <h3 class="title">{{$t('register.title')}}</h3>
            </div>
            <el-form-item prop="user">
               <el-input
                    name="username"
                    placeholder="请输入手机号"
                    v-model="loginForm.user"
                    autoComplete="on"
                    >
                    <!-- clearable 清除输入框内容 -->
                </el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                 <el-input
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    v-model="loginForm.pwd"
                    autoComplete="off"
                    >
                </el-input>
            </el-form-item>
            <el-form-item prop="verifCode">
               <el-input
                    class="input-code"
                    type="text"
                    name="verifCode"
                    placeholder="请输入验证码"
                    v-model="loginForm.verifCode"
                    autoComplete="off"
                    >
                </el-input>
              <div class="set-verif" v-html="verifCodeImg" @click="getVerifcode">
              </div>
                <div @click="isLoginFlag" class="set-cur">
                  <el-tag type="warning">{{$t('login.login')}}</el-tag>
                </div>
            </el-form-item>
            <!-- .native.prevent -->
            <el-button class="login-submit" type="primary" @click.native.prevent="onSubmit" v-loading="logining">{{$t('register.btn')}}</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
      const phone = /^[1][3,4,5,7,8,9][0-9]{9}$/
      /* 自定义表单校验 */
      const validUsername1 = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入手机号'))
        }else if (!phone.test(value)){
            callback(new Error('请输入正确的手机号'))
        }else {
            callback()
        }
      }
      const validPassword1 = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码不能小于6位'))
          } else {
            callback()
          }
      }
      const validVerif = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入验证码'))
        }else if(value != this.thisCode ) {
          callback(new Error('验证码错误'))
        }else {
          callback()
        }
      }
    return {
        logining: false,
        verifCodeImg: '',
        thisCode: '',
        loginForm: {
            user: '',
            pwd: '',
            verifCode: ''
        },
        // 登录校验
        loginRules: {
            user: [{ required: true, trigger: 'blur', validator: validUsername1 }],
            pwd: [{ required: true, trigger: 'blur', validator: validPassword1 }],
            verifCode: [{ required: true, trigger: 'blur', validator: validVerif }]
        }
    }
  },
  mounted() {
    this.getVerifcode()
  },
  methods: {
    onSubmit() {
      
      this.$refs.loginForm.validate(valid => {
         if (valid) {
             this.logining = true
             this.$store.dispatch('registerInfo', this.loginForm).then(res=> {
               if (res.code == 0) {
                 this.$message.success(res.msg)
                 this.isLoginFlag()
               }
                 this.logining = false
             })
         }else {
             return false
         }
      })
    },
    // 获取验证码
    getVerifcode() {
      this.$store.dispatch('getVerifcode').then(res=> {
        this.verifCodeImg = res.img
        this.thisCode = res.code
      })
    },
    isLoginFlag () {
      this.$emit('success', false)
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
    height: 100%;
    width: 100%;
    background: url('../../assets/img/login.jpg') 0 0/100% 100% no-repeat;
}
.login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background: #fff;
    .login-container {
        position: relative;
        .title {
            font-size: 26px;
            color: #000;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .set-lang {
            color: #fff;
            position: absolute;
            top: 5px;
            right: 0px;
        }
    }
    .login-submit {
        width: 100%;
        margin-top: 35px;
    }
    .set-verif {
      display: inline-block;
      height: 36px;
      cursor: pointer;
      vertical-align: top;
    }
    .input-code {
      width: 150px;
    }
    .set-cur {
      cursor: pointer;
    }
    .el-tag--medium {
      position: absolute;
      top:4px;
      right: 0;
    }
}

</style>
