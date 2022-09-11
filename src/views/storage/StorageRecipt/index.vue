<template>
  <div>
<el-card class="topNavForm">
  <el-form class="demo-form-inline" >
    <el-form-item label="审批人">
      <el-input placeholder="审批人" label-width="30%"/>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-input placeholder="审批人" label-width="30%"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-input placeholder="审批人" label-width="30%"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button round class="btnOne" @click="onSubmit">搜索</el-button>
      <el-button round class="btnTwo" @click="onSubmit">重置</el-button>
    </el-form-item>
    </el-form>
  </el-card>

  <el-card>
    <!-- 按钮部分 -->
  <el-button round class="btnFirst" @click="addStorageRecipt">新增入库单</el-button>
  <el-button round class="btnSecond">生成收货任务</el-button>
  <br>
  <br>
    <!-- 列表部分 -->
  <el-table
    v-loading="loading"
    :data="reciptList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="code"
      label="入库单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="billCode"
      label="运单编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="planArrivalTime"
      label="计划到达时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="ownerId"
      label="货主编号"
      width="300">
    </el-table-column>
    <el-table-column
      prop="ownerName"
      label="货主名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="wareName"
      label="仓库名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="license"
      label="车牌号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="deliveryName"
      label="送货人名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="deliveryPhone"
      label="送货人电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="入库单状态"
      width="120">
    </el-table-column>
     <el-table-column
      prop="planNum"
      label="预计到货数"
      width="120">
    </el-table-column>
     <el-table-column
      prop="createName"
      label="创建人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="120">
    </el-table-column>
    <el-table-column fixed="operation" label="操作" width="100">
      <template slot-scope="scope">
        <el-button  style="color:#5f84ff" @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页组件 -->
   <div class="block">
    <el-pagination
      ref="storageRecipt"
      v-model="storageReciptDialog"
      :page-sizes="[5, 10, 15]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </el-card>
  </div>
</template>

<script>
import { getStorageReciptAllList } from '@/api/storage'
export default {
  nameL: 'StorageIndex',
  data() {
    return {
      loading: false,
      reciptList: [],
      page: {
        page: 1,
        size:10
      },
      total: 0,
      storageReciptDialog: false,
      formInline:false
    }
  },
  created() {
    this.getStorageReciptAllList()
  },
  methods: {
    addStorageRecipt() {
      
    },
    handleClick(row) {
        console.log(row);
      },
    handleSizeChange() {
      
    },
    handleCurrentChange() {
      
    },
   
    async getStorageReciptAllList() {
      const res = await getStorageReciptAllList()
      console.log(res);
    }
  },
  //  tableRowClassName({ row, rowIndex }) {
    //   if (rowIndex === 1) {
    //     return 'warning-row';
    //   } else if (rowIndex === 3) {
    //     return 'success-row';
    //   }
    //   return '';
    // },
  }
</script>
<style>
  /* .storage-table{
    background: #f0f9eb;
  } */
  .topNavForm{
    display: flex;
    
  }
  .btnOne{
    background-color: #ffb200;
    border:none;
  }
  .btnTwo{
    background-color: #f8f5f5;
    border:none;
  }
  .btnFirst{
    background-color: #00be76;
    color:#fff;
    border:none;
  }
  .btnSecond{
    background-color: #f8f5f5;
  }
 .el-table .warning-row {
    background: #ffffff;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>