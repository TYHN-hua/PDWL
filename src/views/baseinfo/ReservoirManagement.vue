<template>
  <div style="padding:20px">
    <search search-two="库区名称" search-three="仓库状态" @search="search" />
    <reservoirList style="margin-top:20px" :reservoir-list="reservoirList" />
    <page style="margin-top:20px" :page.sync="page" @pageSizeChange="pageSizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
import search from './components/search.vue'
import reservoirList from './components/reservoirList.vue'
import page from './components/page.vue'
import { getAllWarehouse } from '@/api/baseInfo/reservoir'
export default {
  components: {
    search,
    reservoirList,
    page
  },
  data() {
    return {
      reservoirList: [],
      // warehouseInfo: {},
      page: {
        id: '',
        current: 1,
        warehouseName: '',
        size: 10,
        name: ''
      }
    }
  },
  created() {
    this.getAllWarehouse()
  },
  methods: {
    // async getAllWarehouse() {
    //   const { data } = await getAllWarehouse()
    //   this.warehouseList = data
    //   console.log(data)
    // },
    async getAllWarehouse() {
      const { data } = await getAllWarehouse(this.page)
      this.reservoirList = data.records
      this.reservoirInfo = data
      this.page.current = data.current
      this.page.total = data.total
      this.page.size = data.size
      // console.log(data)
    },
    pageSizeChange(size) {
      this.page.size = size
      delete this.page.total
      this.getAllWarehouse()
    },
    currentChange(current) {
      this.page.current = current
      delete this.page.total
      this.getAllWarehouse()
    },
    search(val) {
      this.page = { ...this.page, ...val }
      console.log(this.page)
      delete this.page.total
      this.getAllWarehouse()
    }
  }
}
</script>

<style>

</style>
