<template>
  <div class="personal">
    <!-- 图片预览编辑 -->
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeupload">
      <img v-if="form.avatar" :src="form.avatar" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <!-- 内容模块 -->
    <el-form ref="form" class="per-form" :model="form" label-width="80px">
      <el-form-item :label="$t('persinfo.name')">
        <el-input v-model="form.name" class="input-width" :disabled="disabled"
        clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('persinfo.description')">
        <el-input
        class="input-width" 
        type="textarea"
        :rows="2"
        :disabled="disabled"
        placeholder="请输入内容"
        v-model="form.description"
        clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="edit" ref="refBtn">{{$t('com.edit')}}</el-button>
        <el-button type="primary" @click="editSave">保存</el-button> 
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      imageUrl: '',
      disabled: true,
      btnText: '',
      param: null,
      userInfo: '',
      form: {
          avatar: '',
          name: '',
          description: '',
          _id: ''
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  watch: {

  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  methods: {
    // 加载用户信息
    getUserInfo () {
      this.userInfo = JSON.parse(this.userinfo)
      this.form = {
        avatar: this.userInfo.data.avatar || '',
        name: this.userInfo.data.name,
        description: this.userInfo.data.description,
        _id: this.userInfo.data._id
      }
      //重新写一个表单上传的方法
      this.param = new FormData()
      this.disabled = true
    },
    handleAvatarSuccess(res, file) {
    },
    beforeupload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
        //创建临时的路径来展示图片
        const windowURL = window.URL || window.webkitURL
        
        this.form.avatar=windowURL.createObjectURL(file)
        this.param.append('avatar', file, new Date().getTime()+'image.png') // 封装到formdata中
        return false
    },
    edit() {
      this.disabled = !this.disabled
    },
    editSave () {
      // 校验图片链接
      if (this.form.avatar.indexOf('avatar') > -1 && this.form.avatar){
         this.param.append('avatar', this.form.avatar)
      }

      this.param.append('name', this.form.name)
      this.param.append('description', this.form.description)
      this.param.append('_id', this.form._id)
      // if (this.userInfo.data.avatar == this.form.avatar && this.userInfo.data.name == this.form.name && this.userInfo.data.description == this.form.description) {
      //   this.$message.error('请输入修改信息！')
      //   return false
      // }

      this.$store.dispatch('editPersInfo', this.param).then(res=> {
        if (res.code == 0) {
          this.$message.success(res.msg)
          // 重新加载用户信息
          this.getUserInfo()
          // 展示刷新整个页面 后面存到vuex 中 更改
          // window.location.reload()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed gray;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  margin-top: 10px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}
.per-form {
  .input-width {
    width: 240px;
  }
}
</style>
