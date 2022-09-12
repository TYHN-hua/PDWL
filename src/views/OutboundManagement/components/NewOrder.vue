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
            <el-form>
              <el-form-item>
                <el-input></el-input>
                <el-input></el-input>
                <el-input></el-input>
              </el-form-item>
            </el-form>
          </template>
        </div>
        <div class="buttonBox" style="border-top:1px solid #f1f1f1; display: flex; justify-content: center;">
          <el-button style="margin-top: 20px;margin-right:25px; width: 200px;" round @click="before" type="warning" plain>
            返回</el-button>
          <el-button style="margin-top: 20px; width: 200px;" round @click="next" type="warning">下一步</el-button>
        </div>
      </div>
      <div v-if="active==1">
        <div class="steps">
          <template>
            <el-form>
              <el-form-item>
                <el-input></el-input>
              </el-form-item>
            </el-form>
          </template>
        </div>
        <div class="buttonBox" style="border-top:1px solid #f1f1f1; display: flex; justify-content: center;">
          <el-button style="margin-top: 20px;margin-right:25px; width: 200px;" round @click="before" type="warning" plain>
            上一步</el-button>
          <el-button style="margin-top: 20px; width: 200px;" round @click="next" type="warning">下一步</el-button>
        </div>
      </div>
      <div v-if="active==2">
        <div class="steps">
          <template>
            <el-form>
              <el-form-item>
                <el-input></el-input>
              </el-form-item>
            </el-form>
          </template>
        </div>
        <div class="buttonBox" style="border-top:1px solid #f1f1f1; display: flex; justify-content: center;">
          <el-button style="margin-top: 20px;margin-right:25px; width: 200px;" round @click="before" type="warning" plain>
            上一步</el-button>
          <el-button style="margin-top: 20px; width: 200px;" round @click="next" type="warning">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    before() {
      this.active--
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
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;

  }
}
</style>    