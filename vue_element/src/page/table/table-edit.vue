<template>
    <div class="table-edit clearfix">
        <el-button class="add-data" type="primary" round @click="newlyAdded">{{isText}}</el-button>
        <el-button class="export-table" type="primary" round @click="exportExcel">导出表格</el-button>
        <div class="table-form">
            <el-form :rules="model.rules" :model="model"  ref="form">
                <!-- 表布局 -->
                <el-table
                border
                style="width: 100%;"
                :data="model.tableData"
                id="out-table"
                >
                <!-- :span-method="objectSpanMethod"  -->
                <!-- :default-sort = "{prop: 'date', order: 'descending'}" -->
                <el-table-column
                    width="180"
                    label="姓名"
                    header-align="center">
                    <template slot-scope="scope">
                            <el-form-item :prop="'tableData.' + scope.$index + '.name'" :rules='model.rules.name'>
                                <el-input  v-model="scope.row.name" :disabled="scope.row.disabled"></el-input>
                            </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                    width="180"
                    label="年龄"
                    header-align="center">
                    <template slot-scope="scope">
                            <el-form-item :prop="'tableData.' + scope.$index + '.age'" :rules='model.rules.age'>
                              <el-input v-model="scope.row.age" :disabled="scope.row.disabled"></el-input>
                            </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                    width="180"
                    label="性别"
                    header-align="center">
                    <template slot-scope="scope">
                                <!-- :rules='model.rules.sex'  在这里 select默认值 不做表单校验 会有冲突-->
                                <el-form-item :prop="'tableData.' + scope.$index + '.sex'">
                                 <el-select v-model="scope.row.sex" placeholder="请选择性别" value-key="id" :disabled="scope.row.disabled">
                                    <el-option
                                      v-for="item in sexList"
                                      :key="item.id"
                                      :label="item.value"
                                      :value="item.id">
                                      <!-- | setSex -->
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                        </template>
                    </el-table-column>
                <el-table-column
                    width="280"
                    label="介绍"
                    header-align="center"
                    >
                        <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.introduce'" :rules='model.rules.introduce'>
                                    <el-input v-model="scope.row.introduce" :disabled="scope.row.disabled"></el-input>
                                </el-form-item>
                        </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    header-align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleSave(scope.$index, scope.row)" :disabled="scope.row.disabled">保存</el-button>
                        <el-button
                          size="mini"
                          type="info"
                          @click="handleEdit(scope.$index, scope.row)" 
                          v-if="scope.row && Object.keys(scope.row).length > 5" >编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)" 
                          v-if="scope.row && Object.keys(scope.row).length > 5">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </el-form>
        </div>
        <el-pagination
          v-if="model.tableData.length"
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
// 表格导出插件
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      isText: "新增",
      total: 1,
      pageNo: 1,
      pageSize: 5,
      tableData: [],
      sexList: [
        {
          id: "1",
          value: "男"
        },
        {
          id: "0",
          value: "女"
        },
        {
          id: "2",
          value: "保密"
        }
      ],
      analysisArray: [], // 解析表格数据 合并单元格
      model: {
        rules: {
          name: {
            type: "string",
            required: true,
            message: "请输入姓名",
            trigger: "focus"
          },
          age: {
            type: "string",
            required: true,
            message: "请输入年龄",
            trigger: "focus"
          },
          // sex:{ type:'string',required:true,message:'请选择性别',trigger:'change'},
          introduce: {
            type: "string",
            required: true,
            message: "必填字段",
            trigger: "focus"
          }
        },
        tableData: [
          // {name:'',age:'',sex:'2',introduce:''} 默认为空值
        ]
      },
      newData: [{ name: "", age: "", sex: "2", introduce: "", disabled: false }]
    };
  },
  filters: {
    setSex(val) {
      switch (val) {
        case 0:
          return "女";
        case 1:
          return "男";
          break;
        default:
          return "保密";
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 表格导出
    exportExcel() {
      /**
       * 由于页面数据⬆️可编辑数据 所以导出表格会出现问题  建议表格导出走后台接口
       */
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "表格数据.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 解析表格数据
    setdates(arr) {
      var obj = {},
        k;
      // 循环遍历数据 查询出数据相同的次数
      for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i].age;
        if (obj[k]) {
          obj[k]++;
        } else {
          obj[k] = 1;
        }
      }
      // console.log(obj) 保存结果{el-'元素'，count-出现次数}
      for (var o in obj) {
        if (obj[o] === 1) {
          this.analysisArray.push(0);
        } else {
          for (let i = 0; i < obj[o]; i++) {
            if (i === 0) {
              this.analysisArray.push(obj[o]);
            } else {
              this.analysisArray.push(1);
            }
          }
        }
      }
    },
    // 合并单元格处理 element 提供了 :span-method
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (this.analysisArray[rowIndex] > 1) {
          console.log(this.analysisArray);
          console.log("---", this.analysisArray[rowIndex]);
          return {
            rowspan: this.analysisArray[rowIndex],
            colspan: 1
          };
        } else if (this.analysisArray[rowIndex] == 0) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // 获取表格数据
    getTableData() {
      this.$store
        .dispatch("getTableData", {
          page: this.pageNo,
          rows: this.pageSize
        })
        .then(res => {
          this.model.tableData = res.rows;
          // 增加一个禁用标示
          for (let item of this.model.tableData) {
            item.disabled = true;
          }
          this.total = res.total;
          this.setdates(this.model.tableData);
        });
    },
    // 新增数据
    newlyAdded() {
      if (this.isText === "新增") {
        // this.newData = [{name:'',age:'',sex:'2',introduce:'', disabled: false}]
        this.model.tableData.push(this.newData);
        this.isText = "移除";
      } else {
        this.model.tableData.pop(this.model.tableData);
        this.isText = "新增";
      }
    },
    handleSave(index, row) {
      // debugger;
      // 页面本身参数只有4个  这里判断length大于5 代表更新数据 此时存在id
      // 根据id 更新数据
      if (Object.keys(row).length > 5) {
        let { _id, name, age, sex, introduce } = row;
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$store
              .dispatch("getUpdateTable", {
                _id: row._id,
                name: row.name,
                age: row.age,
                sex: row.sex,
                introduce: row.introduce
              })
              .then(res => {
                if (res.code == 0) {
                  this.getTableData();
                } else {
                  this.$message.error(res.msg);
                }
              });
          }
        });
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$store.dispatch("addTableData", row).then(res => {
              if (res.code == 0) {
                this.$message.success(res.msg);
                this.getTableData();
                this.isText = "新增";
              }
            });
          }
        });
      }
    },
    // 如果this.addColumn 为true 表示为新增数据 编辑 删除按钮无效
    handleEdit(index, row) {
      // 为了避免表格编辑校验问题 其他数据设置为不可点击 当前数据为编辑状态
      this.model.tableData.forEach((item, index) => {
        item.disabled = true;
        this.$set(this.model.tableData, index, item);
      });
      row.disabled = false;
      this.$set(this.model.tableData, index, row);
    },
    handleDelete(index, row) {
      this.$confirm("确认删除数据吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("deleteTable", { _id: row._id }).then(res => {
            if (res.code == 0) {
              this.getTableData();
            }
          });
        })
        .catch(() => {});
    },
    pageNumClick(val) {
      this.pageNo = val;
      this.getTableData(this.pageNo);
    },
    prevClick(val) {
      this.pageNo = val;
      this.getTableData(this.pageNo);
    },
    nextClick(val) {
      this.pageNo = val;
      this.getTableData(this.pageNo);
    }
  }
};
</script>


<style lang="scss">
.table-edit {
  .add-data {
    margin: 20px 0;
  }
  .el-input.is-disabled .el-input__inner {
    text-align: center;
    background-color: transparent;
    border-color: transparent;
    border: none;
  }
  .el-input.is-disabled .el-input__icon {
    display: none;
  }
  // .el-form-item {
  //   margin-bottom: 0;
  // }
  .add-data {
    float: left;
  }
  .export-table {
    float: right;
  }
  
}
</style>
