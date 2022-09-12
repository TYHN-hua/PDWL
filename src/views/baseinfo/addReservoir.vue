<template>
  <div style="padding:20px">
    <el-card>
      <el-form ref="formData" :rules="rules" :model="formData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="库区编号" prop="code">
              <el-input v-model="formData.code" placeholder="" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="warehouseName" label="所属仓库">
              <el-select v-model="formData.warehouseName" placeholder="请选择" style="width:100%" value-key="id">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.type" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="name" label="库区名称">
              <el-input v-model="formData.name" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="tempeartureType" label="温度类型">
              <el-select v-model="formData.tempeartureType" placeholder="请选择" style="width:100%">
                <el-option label="中转仓" value="ZZ" />
                <el-option label="加工仓" value="JG" />
                <el-option label="储备仓" value="CB" />
                <el-option label="冷藏仓" value="LC" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="6">
            <el-form-item prop="bearingType" label="承重类型">
              <el-select v-model="formData.bearingType" placeholder="请选择" style="width:100%">
                <el-option label="中转仓" value="ZZ" />
                <el-option label="加工仓" value="JG" />
                <el-option label="储备仓" value="CB" />
                <el-option label="冷藏仓" value="LC" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="useType" label="用途属性">
              <el-select v-model="formData.useType" placeholder="请选择" style="width:100%">
                <el-option label="中转仓" value="ZZ" />
                <el-option label="加工仓" value="JG" />
                <el-option label="储备仓" value="CB" />
                <el-option label="冷藏仓" value="LC" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负责人" prop="personName">
              <el-input v-model="formData.personName" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="formData.phone" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="8">
            <el-form-item prop="status" label="库区状态">
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

        <el-row :gutter="20" style="margin-top:30px" type="flex" justify="center">
          <el-button type="primary" round style="background-color :#f8f5f5;border:unset;color:black;width:200px;height:40px;margin-right:20px" @click="back">返回</el-button>
          <el-button v-loading="loading" type="primary" round style="background-color : #ffb200;border:unset;color:black;width:200px;height:40px" @click="submit">提交</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getNextCodeofKQ } from '@/api/baseInfo/reservoir'
import { getAllWarehouse } from '@/api/baseInfo/warehouse'
export default {
  data() {
    return {
      warehouseList: [],
      formData: {
        bearingType: '',
        code: '',
        id: '',
        includedNum: '',
        name: '',
        personName: '',
        phone: '',
        status: '',
        temperatureType: '',
        type: '',
        useType: '',
        warehouseId: '',
        warehouseName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入库区名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择用途属性', trigger: 'change' }
        ],
        warehouseName: [
          { required: true, message: '请选择所属仓库', trigger: 'change' }
        ],
        temperatureType: [
          { required: true, message: '请选择温度类型', trigger: 'change' }
        ],
        personName: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        bearingType: [
          { required: true, message: '请选择承重类型', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入库区编号', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入库区编号', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created() {
    this.getNextCodeofKQ()
    this.getAllWarehouse()
  },
  methods: {
    async getNextCodeofKQ() {
      const res = await getNextCodeofKQ()
      this.formData.code = res.data
      // console.log(res)
    },
    async getAllWarehouse() {
      const { data } = await getAllWarehouse({ status: 1 })
      this.warehouseList = data
      console.log(data)
    },
    back() {
      this.$router.back()
    },
    submit() {
      console.log(1)
    }
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
