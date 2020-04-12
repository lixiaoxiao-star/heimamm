<template>
  <!-- 最外层的class名字使用组件名 -->
  <div class="login">
    <div class="left">
      <div class="title">
        <span
          ><img src="../../assets/img/矢量智能对象 拷贝 9.png" alt=""
        /></span>
        <span class="titleName">黑马面面</span>
        <span class="titleline">|</span>
        <span class="titleName1"> 用户登录</span>
      </div>
    </div>
    <div class="rigth">
      <img src="../../assets/img/login_banner_ele.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  height: 100%;
  justify-content: space-around; //中间的边距是两边的2倍
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 50px 45px 86px 43px;

    .titleName {
      width: 94px;
      height: 22px;
      font-size: 24px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin: 0 15px;
    }

    .titleName1 {
      width: 87px;
      height: 21px;
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin-left: 15px;
    }
  }
}
</style>
