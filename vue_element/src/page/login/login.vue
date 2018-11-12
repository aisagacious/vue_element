<template>
    <div class="layout">
        <div class="login" v-show="!isLogin">
          <el-form class="login-form" autoComplete="on" ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" @submit.native.prevent>
              <div class="login-container">
                  <h3 class="title">{{$t('login.title')}}</h3>
                  <lang-select class="set-lang"></lang-select>
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
              <el-form-item >
                  <div @click="isLogin = true" class="set-cur">
                    <el-tag type="success">{{$t('register.btn')}}</el-tag>
                  </div>
              </el-form-item>
              <!-- @click.native.prevent -->
              <el-button class="login-submit" type="primary" @click.native.prevent="onSubmit" v-loading="logining">{{$t('login.login')}}</el-button>
          </el-form>
      </div>
      <Register v-show="isLogin" @success="getRegister"></Register>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import LangSelect from '@/components/LangSelect'
import Register from './register.vue'
import {mapActions} from 'vuex'
import * as types from '../../vuex/mutations-types'
export default {
  components: {LangSelect,Register},
  data() {
      const phone = /^[1][3,4,5,7,8,9][0-9]{9}$/
      /* 自定义表单校验 */
      const validUsername = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入手机号'))
        }else if(!phone.test(value)){
            callback(new Error('请输入正确的手机号'))
        }else {
          callback()
        }
      }
      const validPassword = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码不能小于6位'))
          } else {
            callback()
          }
      }
    return {
        isLogin: false,
        logining: false,
        verifCodeImg: '',
        thisCode: '',
        loginForm: {
            user: '',
            pwd: ''
        },
        // 登录校验
        loginRules: {
            user: [{ required: true, trigger: 'blur', validator: validUsername }],
            pwd: [{ required: true, trigger: 'blur', validator: validPassword }]
        }
    }
  },
  computed: {
    ...mapActions(['loginUserInfo'])
  },
  mounted() {
  },
  methods: {
    
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
         if (valid) {
             this.logining = true
             this.$store.dispatch('loginUserInfo', this.loginForm).then(res=> {
                if(res.code == 0) {
                  // 设置有效期 7天 { expires: 7 }
                  //  Cookies.set('userInfo', JSON.stringify(res))
                  this.$router.push({ path: '/map' })
                }else {
                  this.$message.error(res.msg)
                }
                 this.logining = false
             })
         }else {
             return false
         }
      })
    },
    getRegister (val) {
      this.isLogin = val
      this.logining = false
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
.login {
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
      right: 0;
    }
}


</style>
