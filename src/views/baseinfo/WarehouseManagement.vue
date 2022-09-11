<template>
  <div style="padding:20px">
    <search search-two="仓库名称" search-three="仓库状态" />
    <list style="margin-top:20px" :warehouse-list="warehouseList" />
  </div>
</template>

<script>
import search from './components/search.vue'
import list from './components/list.vue'
import { getAllWarehouse } from '@/api/warehouse'
export default {
  components: {
    search,
    list
  },
  data() {
    return {
      warehouseList: []
    }
  },
  created() {
    this.getAllWarehouse()
  },
  methods: {
    async getAllWarehouse() {
      const res = await getAllWarehouse()
      // this.warehouseList = data
      console.log(res)
    }
  }
}
</script>

<style>

</style>
