<template>
  <!-- :visible.sync弹窗是否显示 -->
  <el-dialog
    :visible.sync="dialogFormVisible"
    class="register"
    width="600px"
    :show-close="false"
  >
    <div slot="title" class="title">用户注册</div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>

<style lang="less">
.register {
  .title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    background: rgb(70, 98, 223);
  }
  .el-dialog__header {
    padding: 0;
  }
}
</style>
