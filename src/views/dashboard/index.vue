<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="divLeft">
        <div class="banner">
          <img src="../../assets/images/left.png" alt="" class="img-left">
          <img src="../../assets/images/right.png" alt="" class="img-right">
          <img src="../../assets/images/user.png" alt="" class="user-header">
          <p class="user-title">仓储管理员</p>
          <p class="subject-title">我不是为了输赢，我就是认真！</p>
          <p class="subject-author">—— 罗永浩</p>
          <div class="site">
            <p class="title">北京总仓</p>
          </div>
        </div>
        <div class="backlog">
          <p class="subject">待办信息</p>
          <div class="item-list">11</div>
        </div>
      </div>
      <div class="divright">
        <div class="notes">
          <div class="subject">通知/公告</div>
          <ul>
            <li>紧急盘点通知</li>
            <li>运维服务更新通知</li>
            <li>客户入库变更通知</li>
            <li>五一放假通知</li>
            <li>品达物流系统对接通知</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-text {
  width: 100%;
  height: 451px;
  // background-color: pink;
  .divLeft {
    width: calc(100% - 261px);
    padding-right: 30px;
    float: left;
    .banner {
      position: relative;
      width: 100%;
      height: 148px;
      background: linear-gradient(270deg, rgb(255, 199, 113), rgb(255, 166, 52));
      box-shadow: rgb(188 151 69 / 12%) 0px 0px 6px 0px;
      border-radius: 12px;
      .img-left {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 148px;
      }
      .img-right {
        position: absolute;
        top: 0px;
        right: 0px;
        height: 148px;
      }
      .user-header {
        position: absolute;
        top: 31px;
        left: 43px;
        height: 62px;
      }
      .user-title {
        position: absolute;
        left: 36px;
        bottom: 20px;
        font-size: 16px;
        font-family: PingFangSC-Medium, "PingFang SC";
        font-weight: 500;
        color: rgb(51, 41, 41);
        line-height: 22px;
      }
      .subject-title {
        position: absolute;
        font-family: PingFangSC-Medium, "PingFang SC";
        font-weight: 500;
        color: rgb(255, 255, 255);
        line-height: 25px;
        top: 36px;
        left: 200px;
        font-size: 18px;
      }
      .subject-author {
        position: absolute;
        font-family: PingFangSC-Medium, "PingFang SC";
        font-weight: 500;
        color: rgb(255, 255, 255);
        line-height: 25px;
        top: 76px;
        left: 400px;
        font-size: 16px;
      }
      .site {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 147px;
        height: 40px;
        background: rgb(248, 245, 245);
        border-radius: 6px;
        opacity: 0.79;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        .title {
          font-size: 14px;
          font-weight: 500;
          color: rgb(51, 41, 41);
        }
      }
    }
    .backlog {
      width: 100%;
      height: 282px;
      background: rgb(255, 255, 255);
      box-shadow: rgb(144 142 142 / 17%) 0px 0px 6px 0px;
      border-radius: 12px;
      padding: 25px;
      margin-top: 20px;
      .subject {
        font-size: 16px;
        font-family: PingFangSC-Semibold, "PingFang SC";
        font-weight: 600;
        color: rgb(51, 41, 41);
        line-height: 22px;
      }
      .item-list {
        margin-top: 19px;
      }
    }
  }
  .divright {
    float: left;
    // background-color: orange;
    .notes {
      width: 261px;
      height: 451px;
      background: rgb(255, 255, 255);
      box-shadow: rgb(144 142 142 / 17%) 0px 0px 6px 0px;
      border-radius: 12px;
      padding: 30px;
      .subject {
        font-size: 16px;
        font-family: PingFangSC-Semibold, "PingFang SC";
        font-weight: 600;
        color: rgb(51, 41, 41);
        line-height: 22px;
      }
      li {
        font-size: 16px;
      }
    }
  }
}
</style>
