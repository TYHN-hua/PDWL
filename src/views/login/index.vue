<template>
  <div class="login-container">
    <div class="login">
      <div class="login-left">
        <div class="login-logo">
          <img src="@/assets/images/logo.png" alt="" style="width:150px; height:64px;">
        </div>
        <el-form ref="ruleForm" :model="loginForm" :rules="rules">
          <el-form-item prop="mobile" class="divUser">
            <div class="login-icons">
              <i class="el-icon-mobile" />
            </div>
            <el-input v-model="loginForm.mobile" type="text" />
          </el-form-item>
          <el-form-item prop="password">
            <div class="login-icons">
              <i class="el-icon-lock" />
            </div>
            <el-input v-model="loginForm.password" type="password" />
          </el-form-item>
          <el-form-item prop="checked">
            <el-checkbox v-model="loginForm.checked" class="rember">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button>立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: 'admin',
        password: '111111',
        checked: false
      },
      rules: {
        mobile: [
          { required: true, message: '账号为必填项', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 6, max: 6, message: '密码为6位', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#f8f5f5;
  $light_gray:#fff;
  $cursor: black;
;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    position: relative;

    .login {
      width: 958px;
      height: 516px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 20px rgb(93 93 93 / 33%);
      background-color: #fff;
      border-radius: 40px;

      .login-left {
        float: left;
        width: 398px;
        height: 516px;
        background: #fff;
        border-radius: 34px 0 0 34px;
        margin: 0 auto;

        .login-logo {
          margin-left: 124px;
          margin-top: 72px;
        }
      }
    }

    .login-right {
      float: right;
      background-image: url('../../assets/images/bgc.png');
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 560px;
      height: 516px;
    }
  }

  .el-input {
    display: inline-block;
    height: 50px;
    width: 230px;

    input {
      width: 230px;
      height: 50px;
      background-color: #f8f5f5;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .rember {
    width: 280px;
    height: 50px;
    background-color: #fff;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .divUser {
    margin-top: 50px;
  }
  .el-form-item {
    margin-left: 59px;
    width: 280px;
    height: 50px;
  }
  .el-form-item__content {
    width: 280px;
    height: 50px;
    background-color: #f8f5f5;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .login-icons {
    float: left;
    width: 50px;
    height: 50px;
    background: #eae7e7;
    border-radius: 8px 0 0 8px;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
  }

</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
  .el-button {
    width: 280px;
    height: 50px;
    background: #ffb200;
    border-radius: 8px;
    box-shadow: 0 2px 9px 1px rgb(255 178 0 / 47%);
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #332929;
    line-height: 22px;
  }

</style>
