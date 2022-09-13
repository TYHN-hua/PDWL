<template>
  <div>
    <el-card>
      <el-row type="flex">
        <el-col>
          <el-button
            type="primary"
            style="margin-bottom:20px;background-color:#00be76;border:unset"
            round
            @click="$router.push(`/baseinfo/reservoirDetail/${a}`)"
          >新增库位</el-button>
        </el-col>
        <div style="display: flex">
          <el-button
            type="primary"
            style="margin-bottom:20px;background-color:#f8f5f5;color:black; border:unset"
            round
          >下载库位模板</el-button>
          <el-button
            type="primary"
            style="margin-bottom:20px;background-color:#f8f5f5;color:black; border:unset"
            round
          >导入库位信息</el-button>
        </div>
      </el-row>
      <template>
        <el-table
          :data="binLocationList"
          border
          style="width: 100%"
          :header-cell-style="tableStyle"
        >
          <el-table-column
            type="index"
            label="序号"
            width="68"
            align="center"
          />
          <el-table-column
            prop="warehouseName"
            label="所属仓库"
            width="150"
            align="center"
          />
          <el-table-column
            prop="code"
            label="仓库编号"
            width="150"
            align="center"
          />
          <el-table-column
            prop="name"
            label="库区名称"
            width="152"
            align="center"
          />
          <el-table-column
            prop="temperatureType"
            label="温度类型"
            width="150"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.temperatureType | ToTemperatureType }}</template>
          </el-table-column>
          <el-table-column
            prop="bearingType"
            width="200"
            label="承重类型"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.bearingType | TobearingType }}</template></el-table-column>
          <el-table-column
            prop="useType"
            label="用途属性"
            width="150"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.useType | ToUseType }}</template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="库区状态"
            align="center"
            width="150"
          >
            <template slot-scope="scope">{{ scope.row.status | ToStatus }}</template>
          </el-table-column>
          <el-table-column
            prop="personName"
            label="负责人"
            align="center"
            width="150"
          />
          <el-table-column
            prop="phone"
            label="联系电话"
            align="center"
            width="150"
          />
          <el-table-column
            prop="includedNum"
            label="库位数量"
            align="center"
            width="150"
          />
          <el-table-column
            prop="updateTime"
            label="更新时间"
            align="center"
            width="200"
          />
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <el-button style="color:#ffb200" type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
              <el-button style="color:#ffb200" type="text" size="small" @click="changeReservoirStatus(scope.row)">{{ scope.row.status? '停用': '启用' }}</el-button>
              <el-button style="color:#ffb200" type="text" size="small" @click="delReservoir(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getReservoirInfo, editReservoir, delReservoir } from '@/api/baseInfo/reservoir'
export default {
  props: {
    binLocationList: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    return {
      a: null,
      formData: {}
    }
  },
  methods: {
    async edit(id) {
      this.$router.push(`/baseinfo/reservoirDetail/${id}`)
      const { data } = await getReservoirInfo(id)
      this.$store.dispatch('reservoir/settingReservoir', data)
      console.log(data)
    },
    tableStyle() {
      return 'background-color: #f9f6ee'
    },

    async changeReservoirStatus(row) {
      try {
        var data = {
          id: row.id
        }
        if (row.status === 1) {
          data.status = 0
        } else {
          data.status = 1
        }
        await editReservoir(data)
        this.$message.success('修改成功')
        location.reload()
      } catch (e) {
        console.log(e)
      }
    },
    async delReservoir(id) {
      try {
        await this.$confirm('确定删除吗', '提示', { type: 'warning' })
        await delReservoir(id)
        this.$message.success('删除成功')
        location.reload()
      } catch (e) {
        console.log(e)
      }
    }

  }
}
</script>

<style>

</style>
