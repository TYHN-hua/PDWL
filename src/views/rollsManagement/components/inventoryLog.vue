<template>
  <el-dialog title="库存日志" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <span style="margin-bottom: 10px; display: block;">日期</span>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <div>
        <el-button type="warning" round @click="searchBtn">搜 索</el-button>
        <el-button round @click="resetBtn">重 置</el-button>
      </div>
    </div>
    <div v-if="isShow" class="bigimg">
      <div class="img">
        <img src="../../../assets/images/inventory.png" alt="" width="160">
        <p style="text-align: center;">暂无库存</p>
      </div>
    </div>
    <el-row v-else>
      <el-table ref="multipleTable" :data="location" style="width: 100%">
        <el-table-column label="序号" width="120" align="center" type="index" />
        <el-table-column label="任务类型" width="120" align="center" prop="type" :formatter="typeFn" />
        <el-table-column label="原始总库存" width="120" align="center" prop="original" />
        <el-table-column label="原始可用库存" width="120" align="center" prop="originalFree" />
        <el-table-column label="变动方式" width="120" align="center" prop="way" :formatter="wayFn" />
        <el-table-column label="操作库存" width="120" align="center" prop="alteration" />
        <el-table-column label="操作后总库存" width="120" align="center" prop="result" />
        <el-table-column label="操作后可用库存" width="180" align="center" sortable prop="resultFree" />
        <el-table-column label="库位名称" width="120" align="center" prop="locationName">
          <template>
            {{ locationName }}
          </template>
        </el-table-column>
        <el-table-column label="更新人员" width="120" align="center" sortable prop="updateName" />
        <el-table-column label="更新时间" width="180" align="center" prop="updateTime" />
      </el-table>
    </el-row>
  </el-dialog>
</template>

<script>
import { getstockRecordList } from '@/api/rolls'
import rolls from '@/api/constant/rolls'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    location: {
      type: Array,
      default: () => ([])
    },
    locationName: {
      type: String,
      default: ''
    },
    locationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value1: '',
      list: [],
      size: 10,
      current: 1,
      total: 0,
      isShow: false
    }
  },
  methods: {
    // 关闭
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    // 任务类型
    typeFn(row, column, cellValue, index) {
      const obj = rolls.idSource.find(ele => ele.id === cellValue)
      return obj ? obj.value : '盘点'
    },
    // 变动方式
    wayFn(row, column, cellValue, index) {
      const obj = rolls.wayFn.find(ele => ele.id === cellValue)
      return obj ? obj.value : '-'
    },
    // 搜索
    async searchBtn() {
      // console.log(this.value1)
      const res = await getstockRecordList({ locationId: this.locationId, size: this.size, current: this.current, ge_createTime: this.value1[0], le_createTime: this.value1[1] })
      if (res.data.records === []) {
        console.log(res.data.records)
        this.$parent.location = res.data.records
        this.isShow = false
      } else {
        this.isShow = true
      }
      console.log(this.$parent)
    },
    resetBtn() {
      this.$parent.logBtn(this.locationId)
      this.value1 = ''
      this.isShow = false
    }
  }
}
</script>

<style>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bigimg {
  position: relative;
  width: 100%;
  height: 384.6px;
}
.img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  /* background-color: red; */
}
</style>
