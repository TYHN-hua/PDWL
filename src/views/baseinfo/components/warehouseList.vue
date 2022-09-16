<template>
  <div>
    <el-card>
      <el-button type="primary" style="margin-bottom:20px;background-color:#00be76;border:unset" round @click="$router.push(`/baseinfo/detail/${a}`)">新增仓库</el-button>
      <template>
        <el-table
          :data="warehouseList"
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
            prop="code"
            label="仓库编码"
            width="150"
            align="center"
          />
          <el-table-column
            prop="name"
            label="仓库名称"
            width="152"
            align="center"
          />
          <el-table-column
            prop="type"
            label="仓库类型"
            width="150"
            align="center"
          />
          <el-table-column
            prop="location"
            width="200"
            label="省/市/区"
            align="center"
          />
          <el-table-column
            prop="address"
            label="详细地址"
            width="150"
            align="center"
          />
          <el-table-column
            prop="status"
            label="仓库状态"
            align="center"
            width="150"
          >
            <template slot-scope="scope">{{ scope.row.status | ToStatus }}</template>
          </el-table-column>
          <el-table-column
            prop="surface"
            label="仓库面积㎡"
            align="center"
            width="150"
          />
          <el-table-column
            prop="includedNum"
            label="库区数量"
            align="center"
            width="150"
          />
          <el-table-column
            prop="personName"
            label="负责人"
            width="150"
            align="center"
          />
          <el-table-column
            prop="phone"
            label="联系电话"
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
              <el-button style="color:#ffb200" type="text" size="small" @click="changeWarehouseStatus(scope.row)">{{ scope.row.status? '停用': '启用' }}</el-button>
              <el-button style="color:#ffb200" type="text" size="small" @click="delWarehouse(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getWarehouseDetailById, changeWarehouseStatus, delWarehouse } from '@/api/baseInfo/warehouse'
export default {
  props: {
    warehouseList: {
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
      this.$router.push(`/baseinfo/detail/${id}`)
      const { data } = await getWarehouseDetailById(id)
      this.$store.dispatch('warehouse/settingHouseDetail', data)
      // console.log(id)
    },
    tableStyle() {
      return 'background-color: #f9f6ee'
    },

    async changeWarehouseStatus(row) {
      try {
        var data = {
          id: row.id
        }
        if (row.status === 1) {
          data.status = 0
        } else {
          data.status = 1
        }
        await changeWarehouseStatus(data)
        this.$message.success('修改成功')
        location.reload()
      } catch (e) {
        console.log(e)
      }
    },
    async delWarehouse(id) {
      try {
        await this.$confirm('确定删除吗', '提示', { type: 'warning' })
        await delWarehouse(id)
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
