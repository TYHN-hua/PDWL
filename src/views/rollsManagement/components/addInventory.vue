<template>
  <div class="header">
    <el-card class="box-card">
      <el-steps :active="active" space="50%" :align-center="true">
        <el-step description="填写基础信息" />
        <el-step description="填写盘点清单" />
      </el-steps>
      <div v-if="isshow">
        <el-form :model="formData">
          <div class="form-top">
            <el-form-item prop="code">
              <p>盘点单号</p>
              <el-input v-model="formData.code" placeholder="请输入" :disabled="true" />
            </el-form-item>
            <el-form-item prop="reason">
              <p>盘点原因</p>
              <template>
                <el-select v-model="formData.reason" placeholder="请选择">
                  <el-option v-for="item in reasonList" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item prop="dimension">
              <p>盘点维度</p>
              <template>
                <el-select v-model="formData.dimension" placeholder="请选择">
                  <el-option v-for="item in dimensionList" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item prop="type">
              <p>盘点类型</p>
              <template>
                <el-select v-model="formData.type" placeholder="请选择">
                  <el-option v-for="item in typeList" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </template>
            </el-form-item>
          </div>
          <div class="form-bottom">
            <el-form-item prop="areaId">
              <p>库区</p>
              <template>
                <el-cascader v-model="formData.areaId" :props="optionProps" />
              </template>
            </el-form-item>
            <el-form-item prop="ownerName">
              <p>货主</p>
              <template>
                <el-select v-model="formData.ownerName" placeholder="请选择" @focus="ownerIdBtn">
                  <el-option v-for="(item,index) in ownerNameList" :key="index" :label="item.name" :value="item.name" />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item prop="time">
              <p>计划时间</p>
              <template>
                <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" />
              </template>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-else style="margin-top:50px">
        <el-row type="flex">
          <el-col :span="6">
            <el-button type="success" round>添加盘点清单</el-button>
            <el-button round>删除盘点清单</el-button>
          </el-col>
        </el-row>
        <div style="position: relative; width: 100%; height:360px;">
          <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
            <img src="../../../assets/images/inventory.png" alt="" width="160">
            <p style="text-align: center;">暂无盘点清单</p>
          </div>
        </div>
      </div>
      <el-row type="flex" justify="center" class="fotter">
        <el-col :span="8">
          <el-button round style="width: 170px;" @click="handleClose">返回</el-button>
          <el-button type="warning" round style="width: 170px;" @click="nextBtn">下一步</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getOwnerId, getwarehouseList, getAreaList, getNextPD } from '@/api/rolls'
export default {
  name: 'AddInventory',
  data() {
    return {
      active: 0,
      value1: '',
      formData: {
        code: '',
        reason: null,
        dimension: null,
        type: null,
        areaId: null,
        ownerName: null,
        time: null
      },
      typeList: [{
        id: 'SJPD',
        value: '随机盘点'
      }, {
        id: 'JHPD',
        value: '计划盘点'
      }],
      reasonList: [{
        id: 'GH',
        value: '规划'
      }, {
        id: 'HZ',
        value: '货主'
      }, {
        id: 'CY',
        value: '差异'
      }],
      dimensionList: [{
        id: 'KW',
        value: '库位'
      }, {
        id: 'HP',
        value: '货品'
      }],
      ownerNameList: [],
      isshow: true,
      value: [],
      warehouseList: [],
      optionProps: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          setTimeout(() => {
            console.log(node, resolve)
            const {
              level
            } = node
            if (level === 0) {
              getwarehouseList().then((res) => {
                // console.log(res)
                if (res.data.length > 0) {
                  const nodes = res.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                    leaf: level >= 1
                  }))
                  resolve(nodes)
                } else {
                  resolve([])
                }
              })
            } else if (level === 1) {
              console.log(node)
              getAreaList({ warehouseId: node.data.value }).then((res) => {
                console.log(res)
                if (res.data.length > 0) {
                  const nodes = res.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                    leaf: level >= 1
                  }))
                  resolve(nodes)
                } else {
                  resolve([])
                }
              })
            } else {
              resolve([])
            }
          }, 0)
        }
      }
    }
  },
  mounted() {
    this.getNextPD()
  },
  methods: {
    // 获取货主
    async ownerIdBtn() {
      const res = await getOwnerId()
      this.ownerNameList = res.data
    // console.log(this.ownerNameList)
    },
    nextBtn() {
      if (this.active++ > 1) this.active = 0
      this.isshow = false
    },
    // 返回
    handleClose() {
      // this.$router.back()
      this.isshow = true
    },
    async getNextPD() {
      const res = await getNextPD()
      this.formData.code = res.data
    }
  }
}

</script>

<style lang="scss" scoped>
  .header {
    background-color: #fdfafa;
    padding: 20px 30px;
  }

  .fotter {
    margin-top: 50px;
  }

  .el-form {
    margin-top: 20px;

    .form-top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
    }

    .form-bottom {
      display: flex;
    }
  }

  .el-input {
    width: 85%;
  }

  .el-select {
    width: 85%;
  }

  .el-cascader {
    width: 85%;
  }

  .el-form-item {
    width: 25%;
    margin-bottom: 0;

    .el-input {
      background-color: #f8f5f5 !important;
    }

    .el-input__inner {
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      background: #f8f5f5 !important;
      border-radius: 6px;
    }
  }

  .box-card {
    padding: 0px 30px;
    margin-bottom: 20px;
  }

  .set-btn {
    margin-left: 30px;
  }

  .el-steps {
    margin-top: 50px;
  }

</style>
