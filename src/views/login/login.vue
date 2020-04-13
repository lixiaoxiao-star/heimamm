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
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入手机号"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :show-password="true"
            prefix-icon="el-icon-unlock"
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
              <el-input
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
                v-model="form.code"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <img src="@/assets/img/矢量智能对象 拷贝 9.png" alt=""
            /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.check"
            >我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
              type="primary"
              >隐私条款</el-link
            >
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="loginClick()"
            >登录</el-button
          >
          <br />
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="rigth">
      <img src="../../assets/img/login_banner_ele.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        phone: '',
        password: '',
        code: '',
        check: ''
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空哦', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空哦', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6到12位密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空哦', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    loginClick() {
      this.$refs.formRef.validate((result) => {
        this.$message.success(result + ''); //布尔值转字符串
      });
    }
  }
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
    .btn {
      width: 100%;
    }
    .btn:nth-child(1) {
      margin-bottom: 26px;
    }
  }
}
</style>
