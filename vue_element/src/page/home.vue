<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<!-- {{collapsed?'': $t('user.title')}} -->
				{{$t('user.title')}}
			</el-col>
			<el-col :span="9">
				<div class="tools" @click.prevent="collapse">
					<i font-size="24" class="el-icon-menu"></i>
				</div>
			</el-col>
			<el-col :span="1" class="surname">
        
				<!-- 中英切换 -->
				<lang-select class="set-lang"></lang-select>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="isUser.avatar" /> {{isUser.user}}</span>
					<el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>设置</el-dropdown-item> -->
						<el-dropdown-item >个人信息</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf" :key="index">
							<template slot="title"><i :class="item.iconCls"></i>{{getRouteTitle(item.name)}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{getRouteTitle(child.name)}}</el-menu-item>
            </el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{getRouteTitle(item.children[0].name)}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item" :key="index">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{getRouteTitle(child.name)}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;z-index:1000;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ getRouteTitle(item.name) }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import Cookies from 'js-cookie'
import LangSelect from '@/components/LangSelect'
import {getRouteTitle} from '@/utils/i18n'
import {mapGetters} from 'vuex'
	export default {
		components: {LangSelect},
		data() {
			return {
				sysName:'vue-element',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
			}
    },
    computed: {
      ...mapGetters(['userinfo', 'isUser'])
    },
		created() {
      // this.getUserInfo()
		},
		mounted() {
			
		},
		methods: {
      // 获取用户信息
      getUserInfo () {
        // 使用setTimeout 解决router.beforeEach 跳转取不到值问题
        setTimeout(()=> { // Cookies.get('userInfo')
          let userInfo = this.userinfo;
            if (userInfo) {
              userInfo = JSON.parse(userInfo);
              this.sysUserAvatar = userInfo.data.avatar;
              // if (!userInfo.data.name) {
                this.sysUserName = userInfo.data.user;
              // }else {
              //   this.sysUserName = userInfo.data.name;
              // }
            }
        },0)
      },
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					Cookies.remove('userInfo');
					this.$router.push('/login');
				}).catch(()=> {
          
        })
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed = !this.collapsed;

				// 解决导航栏折叠样式问题
				document.querySelector('.el-menu-vertical-demo').style.width = '230px';
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			getRouteTitle
		}
	}

</script>
<style>
</style>

<style scoped lang="scss">
	$color-primary: #20a0ff;
	.surname {
		float: right;
	}
  .set-lang {
    margin-top: 12px;
  }
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
				text-align: center;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 6px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
				i {
					font-size: 24px;
				}
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				position: relative;
				flex:0 0 230px;
				width: 230px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
				
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.menu-expanded ul {
				width: auto;
			}
			.content-container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					.title {
						width: 200px;
						float: right;
						color: #475669;
					}
					.breadcrumb-inner {
						float: left;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
					margin-top: 15px;
				}
			}
		}
	}
</style>