webpackJsonp([3,13],{"1oTU":function(e,t){},"4R6/":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={data:function(){var e=this,t=/^[1][3,4,5,7,8,9][0-9]{9}$/;return{logining:!1,verifCodeImg:"",thisCode:"",loginForm:{user:"",pwd:"",verifCode:""},loginRules:{user:[{required:!0,trigger:"blur",validator:function(e,i,o){i?t.test(i)?o():o(new Error("请输入正确的手机号")):o(new Error("请输入手机号"))}}],pwd:[{required:!0,trigger:"blur",validator:function(e,t,i){t.length<6?i(new Error("密码不能小于6位")):i()}}],verifCode:[{required:!0,trigger:"blur",validator:function(t,i,o){i?i!=e.thisCode?o(new Error("验证码错误")):o():o(new Error("请输入验证码"))}}]}}},mounted:function(){this.getVerifcode()},methods:{onSubmit:function(){var e=this;this.$refs.loginForm.validate(function(t){if(!t)return!1;e.logining=!0,e.$store.dispatch("registerInfo",e.loginForm).then(function(t){0==t.code&&(e.$message.success(t.msg),e.isLoginFlag()),e.logining=!1})})},getVerifcode:function(){var e=this;this.$store.dispatch("getVerifcode").then(function(t){e.verifCodeImg=t.img,e.thisCode=t.code})},isLoginFlag:function(){this.$emit("success",!1)}}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"register"},[i("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{autoComplete:"on",model:e.loginForm,rules:e.loginRules,"label-position":"left"}},[i("div",{staticClass:"login-container"},[i("h3",{staticClass:"title"},[e._v(e._s(e.$t("register.title")))])]),e._v(" "),i("el-form-item",{attrs:{prop:"user"}},[i("el-input",{attrs:{name:"username",placeholder:"请输入手机号",autoComplete:"on"},model:{value:e.loginForm.user,callback:function(t){e.$set(e.loginForm,"user",t)},expression:"loginForm.user"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"pwd"}},[i("el-input",{attrs:{type:"password",name:"password",placeholder:"请输入密码",autoComplete:"off"},model:{value:e.loginForm.pwd,callback:function(t){e.$set(e.loginForm,"pwd",t)},expression:"loginForm.pwd"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"verifCode"}},[i("el-input",{staticClass:"input-code",attrs:{type:"text",name:"verifCode",placeholder:"请输入验证码",autoComplete:"off"},model:{value:e.loginForm.verifCode,callback:function(t){e.$set(e.loginForm,"verifCode",t)},expression:"loginForm.verifCode"}}),e._v(" "),i("div",{staticClass:"set-verif",domProps:{innerHTML:e._s(e.verifCodeImg)},on:{click:e.getVerifcode}}),e._v(" "),i("div",{staticClass:"set-cur",on:{click:e.isLoginFlag}},[i("el-tag",{attrs:{type:"warning"}},[e._v(e._s(e.$t("login.login")))])],1)],1),e._v(" "),i("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.logining,expression:"logining"}],staticClass:"login-submit",attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.onSubmit(t)}}},[e._v(e._s(e.$t("register.btn")))])],1)],1)},staticRenderFns:[]};var r=i("vSla")(o,n,!1,function(e){i("y30U")},"data-v-12806a9b",null);t.default=r.exports},QrVH:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("4YfN"),n=i.n(o),r=(i("uAC3"),i("wAeJ")),s=i("4R6/"),a=i("9rMa"),l=(i("XuKi"),{components:{LangSelect:r.a,Register:s.default},data:function(){var e=/^[1][3,4,5,7,8,9][0-9]{9}$/;return{isLogin:!1,logining:!1,verifCodeImg:"",thisCode:"",loginForm:{user:"",pwd:""},loginRules:{user:[{required:!0,trigger:"blur",validator:function(t,i,o){i?e.test(i)?o():o(new Error("请输入正确的手机号")):o(new Error("请输入手机号"))}}],pwd:[{required:!0,trigger:"blur",validator:function(e,t,i){t.length<6?i(new Error("密码不能小于6位")):i()}}]}}},computed:n()({},Object(a.b)(["loginUserInfo"])),mounted:function(){},methods:{onSubmit:function(){var e=this;this.$refs.loginForm.validate(function(t){if(!t)return!1;e.logining=!0,e.$store.dispatch("loginUserInfo",e.loginForm).then(function(t){0==t.code?e.$router.push({path:"/map"}):e.$message.error(t.msg),e.logining=!1})})},getRegister:function(e){this.isLogin=e,this.logining=!1}}}),u={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"layout"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLogin,expression:"!isLogin"}],staticClass:"login"},[i("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{autoComplete:"on",model:e.loginForm,rules:e.loginRules,"label-position":"left"},nativeOn:{submit:function(e){e.preventDefault()}}},[i("div",{staticClass:"login-container"},[i("h3",{staticClass:"title"},[e._v(e._s(e.$t("login.title")))]),e._v(" "),i("lang-select",{staticClass:"set-lang"})],1),e._v(" "),i("el-form-item",{attrs:{prop:"user"}},[i("el-input",{attrs:{name:"username",placeholder:"请输入手机号",autoComplete:"on"},model:{value:e.loginForm.user,callback:function(t){e.$set(e.loginForm,"user",t)},expression:"loginForm.user"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"pwd"}},[i("el-input",{attrs:{type:"password",name:"password",placeholder:"请输入密码",autoComplete:"off"},model:{value:e.loginForm.pwd,callback:function(t){e.$set(e.loginForm,"pwd",t)},expression:"loginForm.pwd"}})],1),e._v(" "),i("el-form-item",[i("div",{staticClass:"set-cur",on:{click:function(t){e.isLogin=!0}}},[i("el-tag",{attrs:{type:"success"}},[e._v(e._s(e.$t("register.btn")))])],1)]),e._v(" "),i("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.logining,expression:"logining"}],staticClass:"login-submit",attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.onSubmit(t)}}},[e._v(e._s(e.$t("login.login")))])],1)],1),e._v(" "),i("Register",{directives:[{name:"show",rawName:"v-show",value:e.isLogin,expression:"isLogin"}],on:{success:e.getRegister}})],1)},staticRenderFns:[]};var c=i("vSla")(l,u,!1,function(e){i("1oTU")},"data-v-a5b03018",null);t.default=c.exports},iqLU:function(e,t){},wAeJ:function(e,t,i){"use strict";var o=i("4YfN"),n=i.n(o),r=i("9rMa"),s={computed:n()({},Object(r.c)(["language"])),mounted:function(){},methods:{handleSetLanguage:function(e){this.$i18n.locale=e,this.$store.dispatch("setLanguage",e),this.$message({message:"switch language success",type:"success"})}}},a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("el-dropdown",{on:{command:this.handleSetLanguage}},[t("span",{staticClass:"el-dropdown-link"},[t("i",{staticClass:"el-img-setting"})]),this._v(" "),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{command:"zh",disabled:"zh"===this.language}},[this._v("中文")]),this._v(" "),t("el-dropdown-item",{attrs:{command:"en",disabled:"en"===this.language}},[this._v("英文")])],1)],1)],1)},staticRenderFns:[]};var l=i("vSla")(s,a,!1,function(e){i("iqLU")},"data-v-0271b4fc",null);t.a=l.exports},y30U:function(e,t){}});
//# sourceMappingURL=3.65b153cd8534ff86bc4d.js.map