<template>
  <div class="table">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-table
          border
          :data="tableData"
          style="width:100%">
          <el-table-column
            prop="title"
            :label="$t('com.title')"
            header-align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('com.first_picture')"
            align="center"
            width="180">
            <!-- 解析图片 -->
            <template slot-scope="scope">
              <img :src="scope.row.img" class="head_pic" width="100" height="100"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            :label="$t('com.date')"
            sortable
            align="center"
            width="180"
            :filter-method="filterHandler"
          >
            <!-- :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]" -->
          </el-table-column>
          <el-table-column
            prop="content"
            :label="$t('com.content')"
            align="center"
            :formatter="formatter">
            <template slot-scope="scope">
              <div class="table-content" v-html="scope.row.content" style="width:100px;height:100px;overflow:auto;">
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('com.article')" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleInfo(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pageNumClick"
          @prev-click="prevClick"
          @next-click="nextClick"
          :current-page.sync="pageNo"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="8">
        <div class="grid-content-img">
            <div class="grid-body">
              <Phone :ueText="thisText" :title="thisTitle"></Phone>
            </div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Phone from '../phone/phone'
export default {
  components:{Phone},
  data() {
    return {
      total: 1,
      pageNo:1,
      pageSize:3,
      tableData: [],
      thisText: '',
      thisTitle: ''
    };
  },
  mounted() {
    this.getTable()
  },
  methods: {
    getTable() {
      this.$store.dispatch('getArticle',{
        page: this.pageNo,
        rows: this.pageSize
      }).then(res=> {
        this.tableData = res.rows
        this.total = res.total
      })     
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    pageNumClick (val) {
      this.pageNo = val
      this.getTable(this.pageNo)
    },
    prevClick (val) {
      this.pageNo = val
      this.getTable(this.pageNo)
    },
    nextClick(val) {
      this.pageNo = val
      this.getTable(this.pageNo)
    },
    // 查看当前文章信息
    handleInfo(index, row) {
      this.thisTitle = row.title
      this.thisText = row.content
    }
  }
}
</script>

<style lang="scss">
.el-pagination {
  text-align: center;
  margin-top: 10px;
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
.table-content {
  img {
    max-width: 100%;
  }
}
</style>

