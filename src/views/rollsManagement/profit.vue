<template>
  <div style="background-color: #f5f1f1" class="header">
    <el-card class="box-card">
      <el-form :model="formData">
        <div class="form-top">
          <el-form-item prop="code">
            <p>损益单号</p>
            <el-input v-model="formData.code" placeholder="请输入" />
          </el-form-item>
          <el-form-item prop="status">
            <p>损益单状态</p>
            <template>
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option v-for="item in statusList" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </template>
          </el-form-item>
          <el-form-item prop="ownerName">
            <p>货主名称</p>
            <template>
              <el-input v-model="formData.ownerName" placeholder="请输入" />
            </template>
          </el-form-item>
          <el-form-item>
            <p style="opacity: 0">11</p>
            <template>
              <el-button type="warning" round @click="searchBtn">搜索</el-button>
              <el-button type="info" round @click="resetBtn">重置</el-button>
            </template>
          </el-form-item>
        </div>
        <div class="form-bottom">
          <el-form-item prop="goodsName">
            <p>货品名称</p>
            <template>
              <el-input v-model="formData.goodsName" placeholder="请输入" />
            </template>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <div class="combined">合计<span>{{ sum.total }}个</span><span>{{ sum.money }}元</span></div>
        <el-table ref="multipleTable" :data="list" style="width: 100%">
          <el-table-column label="序号" width="120" align="center" type="index" />
          <el-table-column label="损益单号" width="120" align="center" prop="code" />
          <el-table-column label="仓库名称" width="120" align="center" prop="warehouseName" />
          <el-table-column label="库区名称" width="120" align="center" prop="areaName" />
          <el-table-column label="库位名称" width="120" align="center" prop="locationName" />
          <el-table-column label="货主名称" width="120" align="center" sortable prop="ownerName" />
          <el-table-column label="货品名称" width="120" align="center" sortable prop="goodsName" />
          <el-table-column label="损益数量" width="120" align="center" prop="idNum" />
          <el-table-column label="损益金额" width="120" align="center" sortable prop="idMoney" />
          <el-table-column label="创建人" width="120" align="center" prop="createName" />
          <el-table-column label="创建时间" width="180" align="center" sortable prop="createTime" />
          <el-table-column label="损益来源" width="120" align="center" prop="idSource" :formatter="idSourceFn" :filters="[{text: '盘点', value: 'PD'}, {text: '上架', value: 'SJ'}, {text: '拣货', value: 'JH'}]" />
          <el-table-column label="任务编号" width="120" align="center" prop="taskCode" />
          <el-table-column label="损益单状态" width="120" align="center" prop="status" :formatter="statusFn" :filters="[{text: '新建', value: '1'}, {text: '已调整', value: '2'}, {text: '已取消', value: '3'}]" />
          <el-table-column label="处理人" width="120" align="center" prop="updateName" />
          <el-table-column label="处理时间" width="180" align="center" sortable prop="updateTime" />
          <el-table-column fixed="right" label="操作" width="200" align="center" />
        </el-table>
      </el-row>
      <div style="text-align: center; margin-top: 20px">
        <el-pagination
          :total="total"
          :current-page.sync="current"
          :page-sizes="[10, 5]"
          :page-size.sync="size"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getIncreaseDecrease, getProfitSum, getIncreaseDecreaseList } from '@/api/rolls'
import rolls from '@/api/constant/rolls'
export default {
  name: 'Inventorylist',
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      formData: {
        code: '',
        status: '',
        ownerName: '',
        goodsName: ''

      },
      statusList: [
        { id: 1, value: '新建' },
        { id: 2, value: '已调整' },
        { id: 3, value: '已取消' }
      ],
      sum: {},
      list: []
    }
  },
  mounted() {
    this.getProfitSum()
    this.getIncreaseDecreaseList()
  },
  methods: {
    // 搜索
    async searchBtn() {
      const res = await getIncreaseDecrease({ ...this.formData, current: this.current, size: this.size })
      console.log(res)
      this.list = res.data.records
    },
    // 重置
    resetBtn() {
      this.formData = {
        code: '',
        status: null,
        type: null,
        ownerName: null,
        areaId: null
      }
      this.searchBtn()
    },
    // 获取损益单总数
    async getProfitSum() {
      const res = await getProfitSum({ current: this.current, size: this.size })
      this.sum = res.data
      console.log(this.sum)
    },
    // 获取损益单列表
    async getIncreaseDecreaseList() {
      const res = await getIncreaseDecreaseList({ current: this.current, size: this.size })
      this.list = res.data.records
      console.log(res)
      this.total = Number(res.data.total)
      // this.pages = this.cupagesrrent - 1
    },
    // 损益来源 盘点:PD、上架:SJ、拣货:JH
    idSourceFn(row, column, cellValue, index) {
      const obj = rolls.idSource.find(ele => ele.id === cellValue)
      return obj ? obj.value : '盘点'
    },
    // 损益单状态 1.新建、2已调整、3已取消
    statusFn(row, column, cellValue, index) {
      const obj = rolls.statusfn.find(ele => ele.id === cellValue)
      return obj ? obj.value : '新建'
    },
    handleCurrentChange(val) {
      this.getIncreaseDecreaseList()
    },
    handleSizeChange() {
      this.getIncreaseDecreaseList()
    }
  }
}

</script>

<style lang="scss" scoped>
  .header {
    background-color: #f5f1f1;
    padding: 20px 30px;
  }
  .combined {
    margin: 0 0 20px 20px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    line-height: 32px;
    padding-left: 9px;
    width: fit-content;
    span {
      padding-left: 18px;
      padding-right: 18px;
      color: #ffb200;
    }
  }

  .el-form {
    .form-top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
    }

    .form-bottom {
      display: flex;
    }
  }

  .el-input {
    width: 70%;
  }

  .el-select {
    width: 70%;
  }
  .el-cascader {
    width: 70%;
  }

  .el-form-item {
    width: 25%;
    margin-bottom: 0;

    .el-input__inner {
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      background: #f8f5f5;
      border-radius: 6px;
    }
  }

  .box-card {
    padding: 0px 30px;
    margin-bottom: 20px;
  }

  .set-btn {
    margin-left: 30px;
  }

</style>
