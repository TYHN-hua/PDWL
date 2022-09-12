<template>
  <div style="padding:20px">
    <el-card>
      <el-form v-if="isShow" ref="formData" :rules="rules" :model="formData">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="仓库编码">
              <el-input v-model="formData.code" placeholder="" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="name" label="仓库名称">
              <el-input v-model="formData.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="type" label="仓库类型">
              <el-select v-model="formData.type" placeholder="请选择" style="width:100%">
                <el-option label="中转仓" value="ZZ" />
                <el-option label="加工仓" value="JG" />
                <el-option label="储备仓" value="CB" />
                <el-option label="冷藏仓" value="LC" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="16">
            <el-form-item prop="location" label="省/市/区">
              <el-cascader
                v-model="formData.locationCode"
                :options="options"
                style="width:100%"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="16">
            <el-form-item prop="address" label="详细地址">
              <el-input v-model="formData.address" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="status" label="仓库状态">
              <el-row />
              <el-row :gutter="10" align="middle" type="flex" style="height:40px">
                <el-radio-group v-model="formData.status">
                  <el-radio label="1">启用</el-radio>
                  <el-radio label="0">停用</el-radio>
                </el-radio-group>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="8">
            <el-form-item label="仓库面积">
              <el-input v-model="formData.surface" placeholder="请输入">
                <template slot="append">
                  <div style="font-size:14px">㎡</div>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" prop="personName">
              <el-input v-model="formData.personName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="formData.phone" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px" type="flex" justify="center">
          <el-button type="primary" round style="background-color :#f8f5f5;border:unset;color:black;width:200px;height:40px;margin-right:20px" @click="back">返回</el-button>
          <el-button v-loading="loading" type="primary" round style="background-color : #ffb200;border:unset;color:black;width:200px;height:40px" @click="submit">提交</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { getNewCode, addNewWarehouse, changeWarehouseStatus } from '@/api/warehouse'
export default {
  data() {
    return {
      formData: {
        code: '',
        address: '',
        area: '',
        city: '',
        location: null,
        name: '',
        personName: '',
        phone: '',
        province: '',
        status: '',
        surface: '',
        type: '',
        locationCode: ''

      },

      rules: {
        name: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择仓库类型', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请选择省市区', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择仓库状态', trigger: 'change' }
        ],
        personName: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ]
      },
      options: regionData,
      loading: false,
      isShow: false

    }
  },
  created() {
    if (this.$route.path.slice(-4) === 'null') {
      this.getNewCode()
    } else {
      this.formData = this.$store.state.warehouse.houseDetail
      this.formData.status = this.formData.status.toString()
      this.formData.locationCode = []
      this.formData.locationCode.push(this.formData.province, this.formData.city, this.formData.area)
      this.isShow = true
    }
  },

  methods: {
    handleChange(value) {
      console.log(value)
      let str = ''
      value.forEach(item => {
        str += CodeToText[item] + '/' // 将地区码转化为文字
      })
      this.formData.province = value[0]
      this.formData.city = value[1]
      this.formData.area = value[2]
      this.formData.location = str.substring(0, str.length - 1)
      console.log(str)
    },
    async submit() {
      try {
        await this.$refs.formData.validate()
        this.loading = true
        if (this.$route.path.slice(-4) === 'null') {
          await addNewWarehouse(this.formData)
          this.$message.success('添加成功')
        } else {
          await changeWarehouseStatus(this.formData)
          this.$message.success('编辑成功')
        }
        this.$router.back()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async getNewCode() {
      const { data } = await getNewCode()
      this.formData.code = data
      console.log(this.formData.code)
      this.isShow = true
    },
    back() {
      this.$router.back()
      this.formData.code = ''
    }
    // async changeWarehouseStatus() {
    //   const res = await changeWarehouseStatus(this.formData)
    //   console.log(res)
    // }

  }

}
</script>

<style lang="scss" scoped>
span {
  font-size: 12px;
  color: #a09898;
  line-height: 2.5;
}
::v-deep input {
  background-color: #f8f5f5;
}
::v-deep .el-form-item__content {
  margin-left: 0;
}
</style>
