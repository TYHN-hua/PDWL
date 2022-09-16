<template>
  <div style="padding:20px">
    <search search-two="仓库名称" search-three="仓库状态" @search="search" />
    <warehouseList style="margin-top:20px" :warehouse-list="warehouseList" />
    <page style="margin-top:20px" :page.sync="page" @pageSizeChange="pageSizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
import search from './components/search.vue'
import warehouseList from './components/warehouseList.vue'
import page from './components/page.vue'
import { getWarehouseByPage } from '@/api/baseInfo/warehouse'
export default {
  components: {
    search,
    warehouseList,
    page
  },
  data() {
    return {
      warehouseList: [],
      // warehouseInfo: {},
      page: {
        like_code: '',
        like_name: '',
        current: 1,
        status: '',
        size: 10,
        descs: '',
        total: ''
      }
    }
  },
  created() {
    this.getWarehouseByPage()
  },
  methods: {
    // async getAllWarehouse() {
    //   const { data } = await getAllWarehouse()
    //   this.warehouseList = data
    //   console.log(data)
    // },
    async getWarehouseByPage() {
      const { data } = await getWarehouseByPage(this.page)
      this.warehouseList = data.records
      this.warehouseInfo = data
      this.page.current = data.current
      this.page.total = data.total
      this.page.size = data.size
      // console.log(this.warehouseList)
    },
    pageSizeChange(size) {
      this.page.size = size
      delete this.page.total
      this.getWarehouseByPage()
    },
    currentChange(current) {
      this.page.current = current
      delete this.page.total
      this.getWarehouseByPage()
    },
    search(val) {
      this.page = { ...this.page, ...val }
      console.log(this.page)
      delete this.page.total
      this.getWarehouseByPage()
    }
  }
}
</script>

<style>

</style>
