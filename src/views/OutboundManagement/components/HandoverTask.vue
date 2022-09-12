<template>
  <div class="main">
    <div class="search">
      <el-form :inline="true" class="demo-form-inline" label-position="top">
        <el-form-item label="出库单号" style="width:20%;margin-left: 20px;">
          <el-input v-model="search" placeholder="请输入" style="background-color: #f8f5f5;"></el-input>
        </el-form-item>
        <el-form-item label="运单编号" style="width:20%;margin-left: 20px;">
          <el-input v-model="search" placeholder="请输入" style="background-color: #f8f5f5;"></el-input>
        </el-form-item>
        <el-form-item label="货主名称" style="width:20%;margin-left: 20px;">
          <el-input v-model="search" placeholder="请输入" style="background-color: #f8f5f5;"></el-input>
        </el-form-item>
      </el-form>
      <div class="textRight">
        <el-button type="warning" style="margin-left:10px;"  round>搜索</el-button>
        <el-button type="info" plain style="margin-left:30px;margin-right: 30px;"  round>重置</el-button>
      </div>
    </div>
    <div class="result">
      <div>
        <el-button type="success" round style="margin:20px 0 20px 30px">新增出库单</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%"
        :header-cell-style="{ background: 'rgb(249,246,238)',color:'#909399'}" 
        :row-class-name="tableRowClassName" 
        :row-style="{ height: '0px'}"
        :cell-style="{padding: '0px'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="code" label="出库单号" width="150">
        </el-table-column>
        <el-table-column prop="province" label="货主运单编号" width="150">
        </el-table-column>
        <el-table-column prop="status" label="出库类型" width="150">
        </el-table-column>
        <el-table-column prop="personNa me" label="货主名称" width="150">
        </el-table-column>
        <el-table-column prop="warehouseId" label="出库仓库" width="200">
        </el-table-column>
        <el-table-column prop="areaId" label="出库库区" width="200">
        </el-table-column>
        <el-table-column prop="planOutTime" label="计划出库时间" width="150" sortable>
        </el-table-column>
        <el-table-column prop="goodsNum" label="货品数量" width="150" sortable>
        </el-table-column>
        <el-table-column prop="status" label="出库单状态" width="150" 
        :filters="[{text: '新建', value: '1'}, {text: '拣货中', value: '2'}, {text: '已取消', value: '3'}, {text: '拣货完成', value: '4'},{text: '交接中', value: '5'},{text: '交接完成', value: '6'}]"
        :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="createName" label="创建人" width="150">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope" >
            <el-button @click="handleClick(scope.row)" type="text" size="small" style="color:#ffb200;">查看详情</el-button>
            <el-button type="text" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block" style="margin-top:10px;">
    <el-pagination align='center'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
    </div>
  </div>
</template>
  
<script>
import { GetWarehouseList } from '@/api/OutboundManagement'

export default {

  name: 'HandoverTask',
  //
  data() {
    return {
      list: [],
      search: "",
      options: [],
      value: "",
      tableData: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  mounted() {
    this.GetWarehouseList()
  },
  methods: {
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
    },
           //每页条数改变时触发 选择一页显示多少行
     handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
         this.currentPage = 1;
         this.pageSize = val;
     },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.currentPage = val;
     },
    // formatterFn(row, column, cellValue, index) {
    //   const obj = this.tableData.typeName.find(ele => ele.typeId === cellValue * 1)
    //   // return obj ? obj.value : '非正式'
    //   // return ?.
    //   // ?.  不是 es6  obj?.value  obj 存在吗 存在 obj.value
    //   // ?? obj?.value ?? '非正式'    表达式1 ?? 表达式2  表达式1 成立吗 成立 取表达式1的返回值  不成立(null 或者是 undefined) 取表达式2的返回值
    //   return obj?.value ?? '非正式'
    // },

    //   btnDialogForm() {
    //     this.$refs.GetWarehouseList.show()
    //   },
    //   lastPage() {
    //     this.page.pageIndex = (this.page.pageIndex * 1 - 1).toString()
    //     // this.$emit('update:page', this.page)
    //   },
    //   nextPage() {
    //     this.page.pageIndex = (this.page.pageIndex * 1 + 1).toString()
    //     // this.$emit('update:page', this.page)
    //   },
    //   findFn() {
    //     getSearch()
    //   },
  // async getSearch() {
  //   await getSearch()

  // },
  async GetWarehouseList() {
    console.log('=============');
    const { data } = await GetWarehouseList()
    this.tableData = data
    console.log(data);
    },
  
  tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "";
      } else {
        return "warning-row";
      }
    },
}
    }
</script>
  
<style lang="scss" scoped>
::v-deep .el-table__row.warning-row {
  background: #fdfcf9;
}

::v-deep .el-table tbody tr:hover > td {
  background: #f8ebd6 !important;
}

.main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  background-color: rgba(227, 228, 229, 0.693);
  padding: 20px;

  .search {
    width: 100%;
    background-color: #fff;
    padding-top: 20px;
    padding-left: 10px;
    margin-bottom: 20px;
    border-radius: 10px;

    .demo-form-inline {
      width: 78%;
      display: inline;

      :deep(.el-form-item__label) {
        font-size: 12px;
      }
    }
    .textRight {
      padding: 50px 10px;
      float: right;
    }
  }

  .result {
    background-color: #fff;
    border-radius: 10px;
    padding-bottom: 30px;
  }
}
</style>
  