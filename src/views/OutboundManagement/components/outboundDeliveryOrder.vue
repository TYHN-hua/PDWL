<template>
    <div class="main">
      <div class="search">
        <el-form :inline="true" class="demo-form-inline" label-position="top">
        <el-form-item label="出库单号" style="width:20%;margin-left: 20px;">
          <el-input v-model="search" placeholder="请输入" style="background-color: #f8f5f5;"></el-input>
        </el-form-item>
        <el-form-item label="运单编号" style="width:20%;margin-left: 20px;">
          <el-input v-model="search" placeholder="请输入" style="background-color: #f8f5f5;"></el-input>
        </el-form-item>
        <el-form-item label="货主名称" style="width:20%;margin-left: 20px;">
          <el-input v-model="search" placeholder="请输入" style="background-color: #f8f5f5;"></el-input>
        </el-form-item>
      </el-form>
      <div class="textRight">
        <el-button type="warning" style="margin-left:10px;" @click="findFn" round>搜索</el-button>
        <el-button type="info" plain style="margin-left:30px;margin-right: 30px;" @click="findFn" round>重置</el-button>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import {GetWarehouseList } from '@/api/OutboundManagement'
  
  export default {
    components: {

    },
    name: 'outboundDeliveryOrder',
    //
    data() {
      return {
        list:[],
          search:"",
          options: [{
            value: '选项1',
            label: '代办'
          }, {
            value: '选项2',
            label: '进行'
          }, {
            value: '选项3',
            label: '取消'
          }, {
            value: '选项4',
            label: '完成'
          }],
          value:"",
          tableData: []
        }
    },
    mounted() {
        this.GetWarehouseList()
      },
    methods: {
      // formatterFn(row, column, cellValue, index) {
      //   const obj = this.tableData.typeName.find(ele => ele.typeId === cellValue * 1)
      //   // return obj ? obj.value : '非正式'
      //   // return ?.
      //   // ?.  不是 es6  obj?.value  obj 存在吗 存在 obj.value
      //   // ?? obj?.value ?? '非正式'    表达式1 ?? 表达式2  表达式1 成立吗 成立 取表达式1的返回值  不成立(null 或者是 undefined) 取表达式2的返回值
      //   return obj?.value ?? '非正式'
      // },

    //   btnDialogForm() {
    //     this.$refs.GetWarehouseList.show()
    //   },
    //   lastPage() {
    //     this.page.pageIndex = (this.page.pageIndex * 1 - 1).toString()
    //     // this.$emit('update:page', this.page)
    //   },
    //   nextPage() {
    //     this.page.pageIndex = (this.page.pageIndex * 1 + 1).toString()
    //     // this.$emit('update:page', this.page)
    //   },
    //   findFn() {
    //     getSearch()
    //   },
  
      async getSearch() {
        await getSearch()
   
      },
      async GetWarehouseList() {
        console.log('=============');
        const { data } = await GetWarehouseList()
        console.log(data);
      }
    }
    }
  </script>
  
  <style lang="scss" scoped>
  .main {
    min-height: calc(100vh - 50px);
      width: 100%;
      position: relative;
      background-color: rgba(227, 228, 229, 0.693);
      padding: 20px;
    .search {
      width: 100%;
      background-color: #fff;
      padding-top: 20px;
      padding-left: 10px;
      margin-bottom: 20px;
      border-radius: 10px;
      .demo-form-inline {
        width: 78%;
        display: inline;
      :deep(.el-form-item__label) {
          font-size: 12px;
        }
      }
      .textRight {
        padding: 50px 10px;
        float: right;
      }
    }
    .result {
      background-color: #fff;
    }
  }
  </style>
  