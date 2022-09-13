<template>
  <div style="padding:20px">
    <el-card>
      <el-form ref="formData" :rules="rules" :model="formData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="库区" prop="location">
              <el-cascader
                ref="hahaha"
                v-model="formData.location"
                :options="warehouseList"
                :props="optionProps"
                placeholder="请选择"
                style="width:100%"
                @expand-change="handleChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库位编号">
              <el-input v-model="formData.code" disabled placeholder="请选择" style="width:100%" value-key="id" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="name" label="库位名称">
              <el-input v-model="formData.name" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="temperatureType" label="温度类型">
              <el-select v-model="formData.temperatureType" placeholder="请选择" style="width:100%">
                <el-option label="常温" value="CW" />
                <el-option label="冷藏" value="LC" />
                <el-option label="恒温" value="HW" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="6">
            <el-form-item prop="bearingType" label="承重类型">
              <el-select v-model="formData.bearingType" placeholder="请选择" style="width:100%">
                <el-option label="重型" value="ZX" />
                <el-option label="轻型" value="QX" />
                <el-option label="中型" value="BX" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="useType" label="用途属性">
              <el-select v-model="formData.useType" placeholder="请选择" style="width:100%">
                <el-option label="入库缓存区" value="RKHCQ" />
                <el-option label="出库缓存区" value="CKHCQ" />
                <el-option label="存储区" value="CCQ" />
                <el-option label="分拣区" value="FJQ" />
                <el-option label="质检区" value="ZJQ" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="6">
            <el-form-item prop="maxVolume" label="承载体积">
              <el-input v-model="formData.maxVolume" placeholder="请输入">
                <template slot="append">
                  <div style="font-size:14px">m³</div>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承载上限">
              <el-input v-model="formData.maxNum" placeholder="请输入">
                <template slot="append">
                  <div style="font-size:14px">个</div>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承载重量">
              <el-input v-model="formData.maxWeight" placeholder="请输入">
                <template slot="append">
                  <div style="font-size:14px">Kg</div>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px" align="bottom" type="flex">
          <el-col :span="4">
            <el-form-item prop="name" label="库位排/列/层">
              <el-input v-model="formData.locationRow" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="name">
              <el-input v-model="formData.locationColumn" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="name">
              <el-input v-model="formData.locationLayer" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="name" label="库位长/宽/高">
              <el-input v-model="formData.locationLength" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="name">
              <el-input v-model="formData.locationWidth" placeholder="请输入" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="name">
              <el-input v-model="formData.locationHigh" placeholder="请输入" style="width:100%" />
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
import { getAllReservoirList, addNewReservoir, editReservoir } from '@/api/baseInfo/reservoir'
import { getAllWarehouse } from '@/api/baseInfo/warehouse'
import { getNextCodeOfKW } from '@/api/baseInfo/location'
export default {
  data() {
    return {
      optionProps: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          setTimeout(() => {
            console.log(node, resolve)
            const { level } = node
            if (level === 0) {
              getAllWarehouse().then((res) => {
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
              getAllReservoirList(node.data.value).then((res) => {
                // console.log(res.data)
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

      },
      warehouseList: [],
      formData: {
        bearingType: '',
        code: '',
        areaId: '',
        location: [],
        locationColumn: '',
        locationHigh: '',
        locationLayer: '',
        locationLength: '',
        locationRow: '',
        locationWidth: '',
        maxNum: '',
        maxVolume: '',
        maxWeight: '',
        name: '',
        status: '',
        temperatureType: '',
        useType: '',
        warehouseId: ''
      },
      rules: {
        location: [
          { required: true, message: '请选择库区名称', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入库区名称', trigger: 'blur' }
        ],
        useType: [
          { required: true, message: '请选择所属仓库', trigger: 'change' }
        ],
        temperatureType: [
          { required: true, message: '请选择温度类型', trigger: 'change' }
        ],
        maxVolume: [
          { required: true, message: '请输入承载体积', trigger: 'blur' }
        ],
        bearingType: [
          { required: true, message: '请选择承重类型', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入库区编号', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      loading: false
    }
  },
  created() {
    // this.getAllWarehouse()
    if (this.$route.path.slice(-4) === 'null') {
      this.getNextCodeOfKW()
    } else {
      this.formData = this.$store.state.reservoir.reservoir
      this.formData.status = this.formData.status.toString()
      // this.formData.locationCode = []
      // this.formData.locationCode.push(this.formData.province, this.formData.city, this.formData.area)
      // this.isShow = true
      // console.log(this.formData)
    }
  },
  methods: {
    handleChange() {
      console.log(this.$refs.hahaha)
    },
    async getNextCodeOfKW() {
      const res = await getNextCodeOfKW()
      this.formData.code = res.data
      // console.log(res)
    },
    async getAllWarehouse() {
      const { data } = await getAllWarehouse({ status: 1 })
      this.warehouseList = data
      // console.log(data)
    },
    // async getReservoirList(id) {
    //   const { data } = await getAllReservoirList(id)
    //   console.log(data)
    // },
    back() {
      this.$refs.formData.resetFields()
      this.$router.back()
    },
    async submit() {
      try {
        await this.$refs.formData.validate()
        if (this.$route.path.slice(-4) === 'null') {
          await addNewReservoir(this.formData)
          this.$message.success('添加成功')
        } else {
          await editReservoir(this.formData)
          this.$message.success('修改库区成功')
        }
        this.$router.back()
      } catch (e) {
        console.log(e)
      }
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
