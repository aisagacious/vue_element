<template>
    <div id="ueditor">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content">
            <el-input
              class="ue-input"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入标题"
              clearable
              :rows="2"
              resize="none"
              v-model="input">
            </el-input>
            <el-upload
              class="avatar-uploader"
              action="/user/ueditor/save"
              :show-file-list="false"
              :before-upload="beforeupload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
              <!-- :on-success="handleAvatarSuccess" -->
          </div>
        </el-col>
         <el-col :span="12">
          <div class="grid-content">
            <wangeditor :ueData="catchData"></wangeditor>
            <el-button @click="getData">保存</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-img">
            <div class="grid-body">
              <Phone :ueText="content" :title="input"></Phone>
            </div>
          </div>
        </el-col>
      </el-row>
      
   </div>
</template>

<script>
import wangeditor from '../../components/Ueditor'
import Phone from '../phone/phone'
import format from '../../utils/timeFilter.js'
export default {
  components: { wangeditor , Phone},
  data() {
    return {
      content: '',
      input: '',
      imageUrl: ''
    };
  },
  methods: {
    catchData(value) {
      this.content = value //在这里接受子组件传过来的参数，赋值给data里的参数
    },
    getData() {
      if (!this.input) {
        this.$message.error('请输入文章标题！')
        return false
      }
      if (!this.imageUrl) {
        this.$message.error('请上传文章首图！')
        return false
      }
      // if (this.content.indexOf('<p><br></p>' > -1)) {
      //   this.$message.error('请输入文章内容')
      //   return false
      // }
      this.param.append('title', this.input)
      this.param.append('content', this.content)
      this.param.append('time', format.fmtDate(new Date(), 'MM-dd hh:mm'))
      this.$store.dispatch('saveUeditor', this.param).then(res=> {
        
        console.log('---res', res)
      })
    },
    handleAvatarSuccess(res, file) {
      
    },
    //阻止upload的自己上传，进行再操作
    beforeupload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
        //创建临时的路径来展示图片
        const windowURL = window.URL || window.webkitURL
        
        this.imageUrl=windowURL.createObjectURL(file)
        //重新写一个表单上传的方法
        this.param = new FormData()
        this.param.append('img', file, file.name)
        return false
    }
  }
}
</script>

<style lang="scss" scoped>
.ue-input {
  margin-bottom: 10px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.grid-content-img{
  position: relative;
  height: 700px;
  background: url('../../assets/img/phone.png') 0 0/100% 100% no-repeat;
}
.grid-body {
  background-color: #fff;
  width: calc(100% - 20%);
  height: calc(100% - 30%);
  position: absolute;
  top: 15%;
  left: 10%;
  background-color: #fff;
}

</style>
