<template>
    <div class="cutting">
        <!-- 禁止拖拽上传图片 :disable-drag-and-drop="true" -->
        <div class="croppa_box">
            <div class="croppa-photo">
                <croppa v-model="croppa" 
                    :show-remove-button="true" 
                    :width="600" 
                    :height="600" 
                    :prevent-white-space="true"
                    :zoom-speed="5"
                    :initial-image="isImg"
                    :show-loading="true" 
                    initial-size="natural"
                    initial-position="center" 
                    :placeholder="$t('pictext.placetext')" 
                    >
                </croppa>

                <div class="croppa_btns_box_top">
                    <el-tooltip class="item" effect="dark" content="上移" placement="top">
                        <el-button type="primary" circle @click="croppa.moveUpwards(10)" icon="el-icon-arrow-up"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="下移" placement="top">
                        <el-button type="primary" circle @click="croppa.moveDownwards(10)" icon="el-icon-arrow-down"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="左移" placement="top">
                        <el-button type="primary" circle @click="croppa.moveLeftwards(10)" icon="el-icon-arrow-left"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="右移" placement="top">
                        <el-button type="primary" circle @click="croppa.moveRightwards(10)" icon="el-icon-arrow-right"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="放大" placement="top">
                        <el-button type="primary" circle @click="croppa.zoomIn(10)" icon="el-icon-zoom-in"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="缩小" placement="top">
                        <el-button type="primary" circle @click="croppa.zoomOut(10)" icon="el-icon-zoom-out"></el-button>
                    </el-tooltip>
                </div>
            </div>
            
             <div class="croppa_btns_box">
                <div class="croppa_btns_box_bottom">
                    <el-button type="primary" round @click="croppa.rotate()">{{$t('pictext.rotate')}}90°</el-button>
                    <el-button type="primary" round @click="croppa.rotate(2)">{{$t('pictext.rotate')}}180°</el-button>
                    <el-button type="primary" round @click="croppa.rotate(-1)">{{$t('pictext.rotate')}}-90°</el-button>
                    <el-button type="primary" round @click="croppa.flipX()">{{$t('pictext.flip_flipping')}}</el-button>
                    <el-button type="primary" round @click="croppa.flipY()">{{$t('pictext.vert_flipping')}}</el-button>
                </div>
                <p slot="footer" class="dialog-footer">
                    <el-button plain type="primary" @click="uploadCroppedImage">{{$t('com.confirm')}}</el-button>
                </p>
             </div>
            </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isImg: "",
      croppa: {}
    };
  },
  mounted() {},
  methods: {
    //图片裁剪 上传
    uploadCroppedImage() {
      this.croppa.generateBlob(
        blob => {
          // 编写代码上传裁剪的图像文件
          if (!blob) {
            this.$message.success("请选择图片上传、或者拖拽上传！");
            return false;
          }
          // this.croppa.generateDataUrl() base64
          let formdata = new FormData();
          formdata.append("img", blob, new Date().getTime() + ".png"); // 封装到formdata中

          //uploadFile接口和post两处不同
          //一：是header设置为'Content-Type': 'multipart/form-data'
          //二：千万不要对data数据进行Qs.stringify()...太坑了
          this.$store.dispatch("uploadFile", formdata).then(res => {
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.$router.push({path:'/picture'})
            } else {
              this.$message.success(res.msg);
            }
          });
        },
        "image/jpeg",
        0.8
      ); // 80%压缩文件
    }
  }
};
</script>

<style lang="scss" scoped>
.cutting {
  .croppa_box {
    display: flex;
    margin-top: 20px;
    .croppa_btns_box_top {
      margin-top: 15px;
    }
    .croppa_btns_box_top,
    .croppa_btns_box_bottom {
      display: flex;
      justify-content: space-around;
    }
    .croppa_btns_box_bottom {
      margin-top: 150px;
    }
    .dialog-footer {
      width: 100%;
      button {
        display: block;
        margin: 150px auto;
      }
    }
  }
}
</style>
