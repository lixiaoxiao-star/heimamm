<template>
  <!-- 最外层的class名字使用组件名 -->
  <div class="login">
    <div class="left">
      <div class="title">
        <span><img src="../../assets/img/矢量智能对象 拷贝 9.png"
               alt="" /></span>
        <span class="titleName">黑马面面</span>
        <span class="titleline">|</span>
        <span class="titleName1"> 用户登录</span>
      </div>
      <el-form :model="form"
               :rules="rules"
               ref="formRef">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user-solid"
                    placeholder="请输入手机号"
                    v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :show-password="true"
                    prefix-icon="el-icon-unlock"
                    placeholder="请输入密码"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key"
                        placeholder="请输入验证码"
                        v-model="form.code"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="codess"
                   alt=""
                   @click="imgclick"
                   class="codeimg" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="form.check">我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn"
                     type="primary"
                     @click="loginClick()">登录</el-button>
          <br />
          <el-button class="btn"
                     type="primary"
                     @click="registerClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="rigth">
      <img src="../../assets/img/login_banner_ele.png"
           alt="" />
    </div>

    <register ref="registerRef"> </register>
  </div>
</template>

<script>
import register from './register.vue';
import { tologin } from '../../api/login.js';
import { setToken, getToken } from '../../utils/token.js';
export default {
  name: 'login',
  components: {
    register
  },
  data () {
    return {
      codess: process.env.VUE_APP_URL + '/captcha?type=login',
      form: {
        phone: '',
        password: '',
        code: '',
        check: ''
      },
      rules: {
        // 手机号
        phone: [
          { required: true, message: '手机号不能为空哦', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback('请输入正确的手机号码');
              }
            }
          }
        ],
        // 密码
        password: [
          { required: true, message: '密码不能为空哦', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6到12位密码', trigger: 'blur' }
        ],
        // 验证码
        code: [
          { required: true, message: '验证码不能为空哦', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
        ],
        // 协议
        check: [
          { required: true, message: '验证码不能为空哦', trigger: 'change' },
          {
            validator: (reus, vaule, callback) => {
              if (vaule) {
                callback();
              } else {
                callback('请勾选协议');
              }
            }
          }
        ]
      }
    };
  },
  created () {
    // 判断如果登录过了,就直接跳转到主页
    if (getToken()) {
      this.$router.push("/home");
    }
  },

  methods: {
    // 验证码点击切换图片
    imgclick () {
      this.codess =
        process.env.VUE_APP_URL + '/captcha?type=login&t' + Date.now();
    },
    // 注册点击
    registerClick () {
      this.$refs.registerRef.dialogFormVisible = true;
    },
    // 登陆点击
    loginClick () {
      this.$refs.formRef.validate((result) => {
        if (result == true) {
          tologin(this.form).then((res) => {
            this.$message.success('登录成功'); //布尔值转字符串
            console.log(res);
            setToken(res.data.token);
            this.$router.push("home")
          }).catch(err => err);
        }
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

    .codeimg {
      width: 100%;
    }

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
