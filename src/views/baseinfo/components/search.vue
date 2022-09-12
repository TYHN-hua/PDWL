<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="6">
          <p class="text">{{ searchOne }}</p>
          <el-input v-model="searchInfo.like_code" placeholder="请输入" />
        </el-col>
        <el-col :span="6">
          <p class="text">{{ searchTwo }}</p>
          <el-input v-model="searchInfo.like_name" placeholder="请输入" />
        </el-col>
        <el-col :span="6">
          <p class="text">{{ searchThree }}</p>
          <el-select v-if="searchThree === '仓库状态' || '库位状态'" v-model="searchInfo.status" placeholder="请选择" style="width:100%" @change="handleChange">
            <el-option label="不限" value="" />
            <el-option label="启用" value="1" />
            <el-option label="停用" value="0" />
          </el-select>
          <el-input v-else v-model="searchInfo.status" placeholder="请输入" />
        </el-col>
        <el-col :span="6">
          <p class="text" style="opacity:0"> as</p>
          <el-button type="primary" round style="color : black;background-color :#ffb200;border:unset" @click="search">搜索</el-button>
          <el-button type="primary" round style="color : black;background-color:#f8f5f5;border:unset" @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <div />
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    searchOne: {
      type: String,
      default: '仓库编号'
    },
    searchTwo: {
      type: String,
      default: '仓库编号'
    },
    searchThree: {
      type: String,
      default: '仓库编号'
    }
  },
  data() {
    return {
      searchInfo: {
        like_code: '',
        like_name: '',
        status: null
      }

    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    search() {
      this.$emit('search', this.searchInfo)
    },
    reset() {
      this.searchInfo = {
        like_code: '',
        like_name: '',
        status: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 12px;
  color: #887e7e;
}
::v-deep .el-input__inner {
  background-color: #f8f5f5;
}
.el-col {
  padding-right: 30px;
}
</style>
