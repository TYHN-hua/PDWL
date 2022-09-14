<template>
  <div style="background-color: #f5f1f1" class="header">
    <el-card class="box-card">
      <el-form :model="formData">
        <div class="form-top">
          <el-form-item prop="code">
            <p>盘点单号</p>
            <el-input v-model="formData.code" placeholder="请输入" />
          </el-form-item>
          <el-form-item prop="status">
            <p>盘点状态</p>
            <template>
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option v-for="item in statusList" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </template>
          </el-form-item>
          <el-form-item prop="type">
            <p>盘点类型</p>
            <template>
              <el-select v-model="formData.type" placeholder="请选择">
                <el-option v-for="item in typeList" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
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
          <el-form-item prop="ownerName">
            <p>货主</p>
            <template>
              <el-select v-model="formData.ownerName" placeholder="请选择" @focus="ownerIdBtn">
                <el-option v-for="(item,index) in ownerNameList" :key="index" :label="item.name" :value="item.name" />
              </el-select>
            </template>
          </el-form-item>
          <el-form-item prop="areaId">
            <p>盘点库区</p>
            <template>
              <el-cascader v-model="plain" :options="rangArr" :props="optionProps" />
            </template>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" round @click="addBtn">新增盘点单</el-button>
        <el-button type="warning" plain round class="set-btn">生产盘点单任务</el-button>
        <el-table ref="multipleTable" :data="list" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" width="120" align="center" type="index" />
          <el-table-column label="盘点单号" width="120" align="center" prop="code" />
          <el-table-column label="货主" width="120" align="center" prop="ownerName" />
          <el-table-column label="盘点单状态" width="120" align="center" prop="status" :formatter="statusFn" :filters="filters" />
          <el-table-column label="创建时间" width="260" align="center" sortable prop="createTime" />
          <el-table-column label="计划盘点时间" width="260" align="center" sortable prop="planCheckTime" />
          <el-table-column label="盘点原因" width="120" align="center" prop="reason" :formatter="reasonFn" :filters="[{text: '规划', value: '规划'}, {text: '货主', value: '规划'}, {text: '差异', value: '差异'}]" />
          <el-table-column label="盘点维度" width="120" align="center" prop="dimension" :formatter="dimensionFn" :filters="[{text: '库位', value: '库位'}, {text: '货品', value: '货品'}]" />
          <el-table-column label="盘点类型" width="120" align="center" prop="type" :formatter="typeFn" :filters="[{text: '随机盘点', value: '随机盘点'}, {text: '计划盘点', value: '计划盘点'}]" />
          <el-table-column label="盘点仓库" width="120" align="center" prop="warehouseName" />
          <el-table-column label="盘点库区" width="120" align="center" prop="areaName" />
          <el-table-column label="创建人" width="120" align="center" prop="createName" />
          <el-table-column fixed="right" label="操作" width="260" align="center">
            <template slot-scope="{row}">
              <el-button v-if="row.status == 2 || row.status == 3 || row.status == 4 || row.status == 5 || row.status == 6 ? true : false" type="text" size="small" style="color: #ffb200">查看详情</el-button>
              <el-button v-if="row.status == 1 ? true : false" type="text" size="small" style="color: #ffb200">修改详情</el-button>
              <el-button v-if="row.status == 1 ? true : false" type="text" size="small" style="color: #ffb200">生成盘点任务</el-button>
              <el-button v-if="row.status == 1 ? true : false" type="text" size="small" style="color: #ffb200">取消</el-button>
            </template>
          </el-table-column>
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
import { getInventory, getOwnerId } from '@/api/rolls'
import rolls from '@/api/constant/rolls'
export default {
  name: 'Inventorylist',
  data() {
    return {
      filters: [
        { text: '新建', value: '新建' },
        { text: '一盘中', value: '一盘中' },
        { text: '一盘完成', value: '一盘完成' },
        { text: '复盘中', value: '复盘中' },
        { text: '复盘完成', value: '复盘完成' },
        { text: '已取消', value: '已取消' }
      ],
      code: '',
      current: 1,
      size: 10,
      total: 0,
      pages: 1,
      list: [],
      ownerNameList: [],
      statusList: [
        { id: 1, value: '新建' },
        { id: 2, value: '一盘中' },
        { id: 3, value: '一盘完成' },
        { id: 4, value: '复盘中' },
        { id: 5, value: '复盘完成' },
        { id: 6, value: '已取消' }
      ],
      typeList: [{ id: 'SJPD', value: '随机盘点' }, { id: 'JHPD', value: '计划盘点' }],
      formData: {
        code: '',
        status: null,
        type: null,
        ownerName: null,
        areaId: null
      },
      plain: [],
      rangArr: [],
      optionProps: {
        value: '',
        lable: '',
        chilidren: ''
      }
    }
  },
  mounted() {
    this.getInventory()
  },
  methods: {
    async getInventory() {
      const res = await getInventory({ code: '', current: this.current, size: this.size })
      this.list = res.data.records
      this.total = Number(res.data.total)
      // console.log(this.list)
    },
    // 盘点单状态： 1新建、2一盘中、3一盘完成、4复盘中、5复盘完成、6已取消
    statusFn(row, column, cellValue, index) {
      const obj = rolls.status.find(ele => ele.id === cellValue)
      return obj ? obj.value : '新建'
    },
    // 盘点原因 规划:GH、货主:HZ、差异:CY
    reasonFn(row, column, cellValue, index) {
      const obj = rolls.reason.find(ele => ele.id === cellValue)
      return obj ? obj.value : '规划'
    },
    // 盘点维度 库位:KW、货品:HP
    dimensionFn(row, column, cellValue, index) {
      const obj = rolls.dimension.find(ele => ele.id === cellValue)
      return obj ? obj.value : '库位'
    },
    // 盘点类型 随机盘点:SJPD、计划盘点:JHPD
    typeFn(row, column, cellValue, index) {
      const obj = rolls.type.find(ele => ele.id === cellValue)
      return obj ? obj.value : '随机盘点'
    },
    async ownerIdBtn() {
      const res = await getOwnerId()
      this.ownerNameList = res.data
      // console.log(this.ownerNameList)
    },
    // 搜索
    async searchBtn() {
      console.log(this.formData.type)
      const res = await getInventory({ ...this.formData, code: '', current: this.current, size: this.size })
      this.list = res.data.records
      // console.log(this.list)
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
    // 新增盘点单
    addBtn() {
      this.$router.push('/rolls/addinventory')
    },
    handleSizeChange() {
      // console.log(this.size)
      this.getInventory()
    },
    handleCurrentChange() {
      // console.log(this.current)
      this.getInventory()
    }
  }
}

</script>

<style lang="scss" scoped>
  .header {
    background-color: #f5f1f1;
    padding: 20px 30px;
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
