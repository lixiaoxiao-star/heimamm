<template>
  <!-- 最外层的class名字使用组件名 -->
  <div class="login">
    <div class="left"></div>
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
  }
}
</style>
