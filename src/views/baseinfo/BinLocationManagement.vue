<template>
  <div style="padding:20px">
    <search search-one="库区名称" search-two="库位名称" search-three="库位状态" @search="search" />
    <binLocationList style="margin-top:20px" :bin-location-list="binLocationList" />
    <page style="margin-top:20px" :page.sync="page" @pageSizeChange="pageSizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
import search from './components/search.vue'
import binLocationList from './components/binLocationList.vue'
import page from './components/page.vue'
import { getLocationDetail } from '@/api/baseInfo/location'
export default {
  components: {
    search,
    binLocationList,
    page
  },
  data() {
    return {
      binLocationList: [],
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
    this.getLocationDetail()
  },
  methods: {
    // async getAllWarehouse() {
    //   const { data } = await getAllWarehouse()
    //   this.warehouseList = data
    //   console.log(data)
    // },
    async getLocationDetail() {
      const { data } = await getLocationDetail(this.page)
      this.binLocationList = data.records
      this.reservoirInfo = data
      this.page.current = data.current
      this.page.total = data.total
      this.page.size = data.size
      // console.log(data)
    },
    pageSizeChange(size) {
      this.page.size = size
      delete this.page.total
      this.getLocationDetail()
    },
    currentChange(current) {
      this.page.current = current
      delete this.page.total
      this.getLocationDetail()
    },
    search(val) {
      this.page = { ...this.page, ...val }
      console.log(this.page)
      delete this.page.total
      this.getLocationDetail()
    }
  }
}
</script>

<style>

</style>
