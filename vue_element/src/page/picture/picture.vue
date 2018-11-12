<template>
    <div class="picture">
        <img class="img-more" v-show="isHidden" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1535703103&di=57596d6c41fdadad1c6324ff44eec655&src=http://f.hiphotos.baidu.com/zhidao/pic/item/3b292df5e0fe9925015087c435a85edf8cb171c2.jpg" alt="">
        <!-- 图片展示 预览 删除图片不好控制-->
        <!-- <vue-preview  v-loading="loading" :slides="previewList" @close="handleClose" ></vue-preview> -->
        
        <!-- 图片预览 移入鼠标显示删除按钮 -->
        <div class="p-preview">
          <div class="p-block" v-for="(item, index) in imgList" :key="index">
            <i class="el-icon-circle-close-outline p-delete" @click="deleteImg(item._id)"></i>
             <img v-preview="item.img" width="300" height="300" :src="item.img" :alt="item.title"
              preview-title-enable="false"
              preview-nav-enable="true">
          </div>
        </div>
      
        <!-- 分页 -->
        <el-pagination
        v-show="isPagination"
        background
        layout="prev, pager, next"
        @current-change="pageNumClick"
        @prev-click="prevClick"
        @next-click="nextClick"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 6,
      loading: false,
      isHidden: false,
      imgList: [],
      previewList: [],
      isPagination: true
    };
  },
  mounted() {
    this.getImgList();
  },
  methods: {
    getImgList() {
      this.loading = true;
      this.$store
        .dispatch("getUploadPageList", {
          page: this.pageNo,
          rows: this.pageSize
        })
        .then(res => {
          let imgObj = {};
          this.loading = false;
          // 防止数据问题 在请求成功后先清除原有数据
          imgObj = {};

          // 解析后得到的数据格式
          this.imgList = res.rows;
          this.total = res.total;
          if (this.total == 0) {
            this.isPagination = false;
            this.isHidden = true;
          }
        });
    },
    // 随机页码
    pageNumClick(val) {
      this.pageNo = val;
      this.getImgList(this.pageNo);
    },
    // 上一页
    prevClick(val) {
      this.pageNo = val;
      this.getImgList(this.pageNo);
    },
    // 下一页
    nextClick(val) {
      this.pageNo = val;
      this.getImgList(this.pageNo);
    },
    handleClose() {},
    // 删除图片
    deleteImg(id) {
      this.$confirm("确认删除图片吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.$store.dispatch("deletePicture", { _id: id }).then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.getImgList(this.pageNo);
          } else {
            this.$message.success(res.msg);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" >
.picture {
  width: 100%;
  .img-more {
    width: 100%;
  }

  // 由于插件样式 通过c3属性选择器覆盖样式
  //  div[itemscope*='itemscope'] {
  //      display: flex !important;
  //      flex-wrap: wrap;
  //      figure[itemprop*='associatedMedia'] {
  //         display: flex;
  //         justify-content: center;
  //         flex: 0 0 33.3333%;
  //         margin-top: 15px;
  //          img {
  //             width: 300px;
  //             height: 300px;
  //          }
  //      }
  //  }

  .p-preview {
    display: flex;
    flex-wrap: wrap;
    .p-block {
      position: relative;
      display: flex;
      justify-content: center;
      flex: 0 0 33.3333%;
      margin-top: 15px;
    }
    .p-delete {
      position: absolute;
      top: 0;
      right: 12%;
      font-size: 26px;
      color: #fff;
      cursor: pointer;
    }
    img {
      width: 300px;
      height: 300px;
    }
  }

  // 分页样式
  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
