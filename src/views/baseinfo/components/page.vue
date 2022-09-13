<template>
  <div style="text-align:center">
    <el-pagination
      :current-page="Number(page.current)"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="Number(page.size)"
      layout="total, sizes, prev, pager, next, jumper"
      :total="Number(page.total)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  created() {
    // console.log(this.page)
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pageSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val)
    }
  }
}
</script>
<style>

</style>
