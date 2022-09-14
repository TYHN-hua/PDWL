<template>
  <div style="background-color: #f5f1f1" class="header">
    <el-card class="box-card">
      <el-form :model="formData">
        <div class="form-top">
          <el-form-item prop="checkCode">
            <p>盘点编号</p>
            <template>
              <el-input v-model="formData.checkCode" placeholder="请输入" />
            </template>
          </el-form-item>
          <el-form-item prop="status">
            <p>任务状态</p>
            <template>
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option v-for="item in statusList" :key="item.id + '1'" :label="item.value" :value="item.id" />
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
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" round>生产损益单</el-button>
        <el-button type="warning" plain round class="set-btn">生成复盘</el-button>
        <el-table ref="multipleTable" :data="list" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" width="120" align="center" type="index" />
          <el-table-column label="盘点单号" width="120" align="center" prop="checkCode" />
          <el-table-column label="任务编号" width="120" align="center" prop="code" />
          <el-table-column label="任务状态" width="120" align="center" prop="status" :formatter="statusFn" />
          <el-table-column label="创建时间" width="180" sortable align="center" prop="createTime" />
          <el-table-column label="计划作业时间" width="180" sortable align="center" prop="planTaskTime" />
          <el-table-column label="货主" width="120" align="center" prop="ownerName" />
          <el-table-column label="盘点维度" width="120" align="center" prop="dimension" :formatter="dimensionFn" />
          <el-table-column label="盘点类型" width="120" align="center" prop="type" :formatter="typeFn" />
          <el-table-column label="仓库" width="120" align="center" prop="warehouseName" />
          <el-table-column label="库区" width="120" align="center" prop="areaName" />
          <el-table-column label="库存总数" width="120" align="center" prop="stockTotal" />
          <el-table-column label="盘点次数" width="120" align="center" prop="checkNum" :formatter="checkNumFn" :filters="[{ text: '一盘', value: 1 },{ text: '复盘', value: 2 }]" />
          <el-table-column label="盘点人" width="120" align="center" prop="personName" />
          <el-table-column label="盘点总数" width="120" align="center" prop="checkTotal" />
          <el-table-column label="差异合计" width="120" align="center" prop="differenceNum" />
          <el-table-column label="创建人" width="120" align="center" prop="createName" />
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template slot-scope="{row}">
              <el-button v-if="row.status == 2 ? true : false" type="text" size="small" style="color: #ffb200">盘点录入</el-button>
              <el-button v-if="row.status == 2 ? true : false" type="text" size="small" style="color: #ffb200">完成盘点</el-button>
              <el-button v-if="row.status == 3 || row.status == 4 || row.status == 5 ? true : false" type="text" size="small" style="color: #ffb200">查看详情</el-button>
              <el-button v-if="row.status == 4 ? true : false" type="text" size="small" style="color: #ffb200">查看损益明细</el-button>
              <el-button v-if="row.status == 1 ? true : false" type="text" size="small" style="color: #ffb200">分配</el-button>
              <el-button v-if="row.status == 3 ? true : false" type="text" size="small" style="color: #ffb200">生成损益</el-button>
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
          @size-change="handleChange"
          @current-change="handleChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { searchCheckTask } from '@/api/rolls'
import rolls from '@/api/constant/rolls'
export default {
  name: 'Inventorylist',
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      formData: {
        checkCode: '',
        status: '',
        type: ''
      },
      statusList: [
        { id: 1, value: '待分配' },
        { id: 2, value: '待盘点' },
        { id: 3, value: '盘点中' },
        { id: 4, value: '盘点已完成' },
        { id: 5, value: '已生成损益' }
      ],
      typeList: [{ id: 'SJPD', value: '随机盘点' }, { id: 'JHPD', value: '计划盘点' }],
      list: []

    }
  },
  mounted() {
    this.searchCheckTask()
  },
  methods: {
    async searchBtn() {
      const res = await searchCheckTask({ ...this.formData, size: this.size, current: this.current })
      this.list = res.data.records
    },
    resetBtn() {
      this.formData = {
        checkCode: '',
        status: '',
        type: ''
      }
    },
    statusFn(row, column, cellValue, index) {
      const obj = rolls.statusFn.find(ele => ele.id === cellValue)
      return obj ? obj.value : '盘点中'
    },
    checkNumFn(row, column, cellValue, index) {
      const obj = rolls.checkNumFn.find(ele => ele.id === cellValue)
      return obj ? obj.value : '一盘'
    },
    typeFn(row, column, cellValue, index) {
      const obj = rolls.type.find(ele => ele.id === cellValue)
      return obj ? obj.value : '随机盘点'
    },
    dimensionFn(row, column, cellValue, index) {
      const obj = rolls.dimension.find(ele => ele.id === cellValue)
      return obj ? obj.value : '库位'
    },
    // 分页查询盘点任务明细
    async searchCheckTask() {
      const res = await searchCheckTask({ size: this.size, current: this.current })
      this.list = res.data.records
      this.total = Number(res.data.total)
    },
    handleChange() {
      this.searchCheckTask()
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
