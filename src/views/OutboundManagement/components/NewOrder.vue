<template>
  <div class="main">
    <div class="search">
      <el-steps :active="active" finish-status="success" space="30%" style="margin:80px 100px 20px 450px">
        <el-step title="填写出库单基本信息"></el-step>
        <el-step title="填写承运商信息"></el-step>
        <el-step title="填写货品明细信息"></el-step>
      </el-steps>

      <div v-if="active==0">
        <div class="steps">
          <template>
            <el-form label-position="top" :rules="rules" :model="ruleForm">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="出库单号" prop="order">
                    <el-input style="width:90%; margin:"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="仓库名称" prop="warehouse">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="库区名称" prop="area">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="货主" prop="owner">
                    <el-input style="width:90%; margin:" prefix-icon="el-icon-search" placeholder="请输入货主名称/编码">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出库类型" prop="type">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注" prop="remark">
                    <el-input style="width:90%; margin:"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <div class="buttonBox" style="border-top:1px solid #f1f1f1; display: flex; justify-content: center;">
                  <el-button style="margin-top: 20px;margin-right:25px; width: 200px;" round @click="toHome" type="warning"
                  plain>
                  返回</el-button>
                  <el-button style="margin-top: 20px; width: 200px;" round @click="next(options)" type="warning">下一步</el-button>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </div>
      </div>
      <div v-if="active==1">
        <div class="steps">
          <template>
            <el-form label-position="top" :rules="rules" :model="ruleForm">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="出库单号" prop="order">
                    <el-input style="width:90%; margin:"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="仓库名称" prop="warehouse">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="库区名称" prop="area">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="货主" prop="owner">
                    <el-input style="width:90%; margin:" prefix-icon="el-icon-search" placeholder="请输入货主名称/编码">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出库类型" prop="type">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注" prop="remark">
                    <el-input style="width:90%; margin:"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <div class="buttonBox" style="border-top:1px solid #f1f1f1; display: flex; justify-content: center;">
                  <el-button style="margin-top: 20px;margin-right:25px; width: 200px;" round @click="before" type="warning"
                  plain>
                  上一步</el-button>
                  <el-button style="margin-top: 20px; width: 200px;" round @click="next" type="warning">下一步</el-button>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </div>
      </div>
      <div v-if="active==2">
        <div class="steps">
          <template>
            <el-form label-position="top" :rules="rules" :model="ruleForm">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="出库单号" prop="order">
                    <el-input style="width:90%; margin:"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="仓库名称" prop="warehouse">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="库区名称" prop="area">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="货主" prop="owner">
                    <el-input style="width:90%; margin:" prefix-icon="el-icon-search" placeholder="请输入货主名称/编码">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出库类型" prop="type">
                    <el-select v-model="value" placeholder="请选择" style="width:90%; margin:" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注" prop="remark">
                    <el-input style="width:90%; margin:"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <div class="buttonBox" style="border-top:1px solid #f1f1f1; display: flex; justify-content: center;">
                  <el-button style="margin-top: 20px;margin-right:25px; width: 200px;" round @click="before" type="warning"
                  plain>
                  上一步</el-button>
                  <el-button style="margin-top: 20px; width: 200px;" round @click="next" type="warning">下一步</el-button>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      order: '',
      warehouse: '',
      area: '',
      owner: '',
      type: '',
      remark:'',  
      options:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      rules: {
        order: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        warehouse: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
        ],
        area: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
        ],
        owner: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
        ],
        remark: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    next(options) {
      if (this.active++ > 2) return this.active = 0
      this.$refs[options].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    before() {
      this.active--
    },
    toHome() {
      this.$router.push('/OutboundManagement/outboundDeliveryOrder')
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  background-color: rgba(227, 228, 229, 0.693);
  padding: 20px;

  .search {
    width: 100%;
    background-color: #fff;
    padding: 20px 20px 10px 20px;
    margin-bottom: 20px;
    border-radius: 10px;

  }
}
</style>    