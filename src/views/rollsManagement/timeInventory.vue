<template>
  <div style="background-color: #f5f1f1" class="header">
    <el-card class="box-card">
      <el-form :model="formData">
        <div class="form-top">
          <el-form-item prop="warehouseId">
            <p>仓库</p>
            <template>
              <el-select v-model="formData.warehouseId" placeholder="请选择" @focus="warehouseFn">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </template>
          </el-form-item>
          <el-form-item prop="areaId">
            <p>库区</p>
            <template>
              <el-select v-model="formData.areaId" placeholder="请选择" @focus="areaNameFn">
                <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </template>
          </el-form-item>
          <el-form-item prop="locationId">
            <p>库位</p>
            <template>
              <el-select v-model="formData.locationId" placeholder="请选择" @focus="locationNameFn">
                <el-option v-for="item in locationList" :key="item.id" :label="item.name" :value="item.id" />
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
            <p>货主名称</p>
            <template>
              <el-input v-model="formData.ownerName" placeholder="请输入" />
            </template>
          </el-form-item>
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
        <el-table ref="multipleTable" :data="list" style="width: 100%">
          <el-table-column label="序号" width="120" align="center" type="index" />
          <el-table-column label="仓库名称" width="120" align="center" prop="warehouseName" />
          <el-table-column label="库区编号" width="120" align="center" prop="locationCode" />
          <el-table-column label="库区名称" width="120" align="center" prop="areaName" />
          <el-table-column label="库位名称" width="120" align="center" prop="locationName" />
          <el-table-column label="货主编码" width="120" align="center" prop="ownerCode" />
          <el-table-column label="货主名称" width="120" align="center" prop="ownerName" />
          <el-table-column label="货品编码" width="120" align="center" sortable prop="goodsCode" />
          <el-table-column label="货品条码" width="120" align="center" prop="goodsBarCode" />
          <el-table-column label="货品名称" width="120" align="center" sortable prop="goodsName" />
          <el-table-column label="单位" width="120" align="center" prop="goodsUnit" />
          <el-table-column label="总库存数" fixed="right" width="120" align="center" prop="total" />
          <el-table-column label="可用库存" fixed="right" width="120" align="center" prop="free" />
          <el-table-column label="冻结库存" fixed="right" width="120" align="center" prop="frozen" />
          <el-table-column fixed="right" label="操作" width="120" align="center">
            <template slot-scope="{row}">
              <el-button type="text" size="small" style="color: #ffb200" @click="logBtn(row)">库存日志</el-button>
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
    <inventory-log :dialog-visible.sync="dialogVisible" :location="location" :location-name="locationName" :location-id="locationId" />
  </div>
</template>

<script>
import { getwarehouseList, getAreaList, getLocationList, getstock, getstockRecordList } from '@/api/rolls'
import inventoryLog from './components/inventoryLog'
// import rolls from '@/api/constant/rolls'
export default {
  name: 'Inventorylist',
  components: {
    inventoryLog
  },
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      formData: {
        warehouseId: '',
        areaId: '',
        locationId: '',
        ownerName: '',
        goodsName: ''
      },
      warehouseList: [],
      areaList: [],
      locationList: [],
      list: [],
      dialogVisible: false,
      location: [],
      locationName: '',
      locationId: ''
    }
  },
  mounted() {
    this.getstock()
  },
  methods: {
    // 获取仓库列表
    async warehouseFn() {
      const res = await getwarehouseList()
      this.warehouseList = res.data
    },
    // 获取库区列表
    async areaNameFn() {
      if (this.formData.warehouseId) {
        const res = await getAreaList({ status: 1, warehouseId: this.formData.warehouseId })
        this.areaList = res.data
      } else {
        this.$message.error('请先选择仓库')
      }
    },
    // 获取库位列表
    async locationNameFn() {
      if (this.formData.areaId) {
        const res = await getLocationList({ status: 1, areaId: this.formData.areaId })
        this.locationList = res.data
      } else {
        this.$message.error('请先选择库区')
      }
    },
    // 搜索库存明细
    async searchBtn() {
      const res = await getstock({ ...this.formData, current: this.current, size: this.size })
      this.list = res.data.records
    },
    // 重置
    resetBtn() {
      this.formData = {
        warehouseId: '',
        areaId: '',
        locationId: '',
        ownerName: '',
        goodsName: ''
      }
    },
    // 获取库存列表
    async getstock() {
      const res = await getstock({ current: this.current, size: this.size })
      this.list = res.data.records
      this.total = Number(res.data.total)
    },
    // 库存日志
    async logBtn(val) {
      const res = await getstockRecordList({ locationId: val.locationId, size: this.size, current: this.current })
      this.location = res.data.records
      this.locationName = val.locationName
      this.locationId = val.locationId
      this.dialogVisible = true
    },
    handleChange() {
      this.getstock()
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
