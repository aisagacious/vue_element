webpackJsonp([12],{"1tdT":function(t,e){},zqjY:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={components:{Phone:a("b3a0").default},data:function(){return{total:1,pageNo:1,pageSize:3,tableData:[],thisText:"",thisTitle:""}},mounted:function(){this.getTable()},methods:{getTable:function(){var t=this;this.$store.dispatch("getArticle",{page:this.pageNo,rows:this.pageSize}).then(function(e){t.tableData=e.rows,t.total=e.total})},formatter:function(t,e){return t.address},filterTag:function(t,e){return e.tag===t},filterHandler:function(t,e,a){return e[a.property]===t},pageNumClick:function(t){this.pageNo=t,this.getTable(this.pageNo)},prevClick:function(t){this.pageNo=t,this.getTable(this.pageNo)},nextClick:function(t){this.pageNo=t,this.getTable(this.pageNo)},handleInfo:function(t,e){this.thisTitle=e.title,this.thisText=e.content}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.tableData}},[a("el-table-column",{attrs:{prop:"title",label:t.$t("com.title"),"header-align":"center",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:t.$t("com.first_picture"),align:"center",width:"180"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"head_pic",attrs:{src:t.row.img,width:"100",height:"100"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"time",label:t.$t("com.date"),sortable:"",align:"center",width:"180","filter-method":t.filterHandler}}),t._v(" "),a("el-table-column",{attrs:{prop:"content",label:t.$t("com.content"),align:"center",formatter:t.formatter},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"table-content",staticStyle:{width:"100px",height:"100px",overflow:"auto"},domProps:{innerHTML:t._s(e.row.content)}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("com.article"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleInfo(e.$index,e.row)}}},[t._v("查看")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","current-page":t.pageNo,"page-size":t.pageSize,total:t.total},on:{"current-change":t.pageNumClick,"prev-click":t.prevClick,"next-click":t.nextClick,"update:currentPage":function(e){t.pageNo=e}}})],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content-img"},[a("div",{staticClass:"grid-body"},[a("Phone",{attrs:{ueText:t.thisText,title:t.thisTitle}})],1)])])],1)],1)},staticRenderFns:[]};var l=a("vSla")(n,i,!1,function(t){a("1tdT")},null,null);e.default=l.exports}});
//# sourceMappingURL=12.778d948eedba1b5755fa.js.map