<template>
  <!-- 1:上传地址   action="http://........"

2:参数  name="值"  该值就是上传文件的参数

3:是否显示上传列表 :show-file-list="false"

4:上传成功的回调函数:  on-success
   function(){}
成功回调函数里面有个res就是接口返回信息

5:上传前处理(还没调用上传接口前的处理)  before-upload
上传前处理有一个file文件信息,通过file文件信息能够限制上传格式(file,type),大小等控制,(file.size)以字节,该回调函数return的值就是控制让不让你通过上传  true通过,false不通过

6:上传后处理 -->
  <!-- :visible.sync弹窗是否显示 -->

  <!-- 弹窗 -->
  <el-dialog :visible.sync="dialogFormVisible"
             class="register"
             width="600px"
             :show-close="false">
    <div slot="title"
         class="title">用户注册</div>

    <el-form :model="form"
             ref="formRef"
             :rules="rules"
             label-width="100px">
      <!-- 头像 -->
      <el-form-item label="头像"
                    prop="avatar">
        <el-upload class="avatar-uploader"
                   :action="baseUrl + '/uploads'"
                   name="image"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl"
               :src="imageUrl"
               class="avatar" />
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item label="昵称"
                    prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item prop="phone"
                    label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password"
                    label="密码">
        <el-input v-model="form.password"
                  :show-password="true"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item prop="code"
                    label="图形码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7"
                  :offset="1">
            <!-- 点击验证码的时候加个随机数改变地址,切换验证码 -->
            <img class="img"
                 :src="form.codeUrl"
                 @click="clickCode"
                 alt="" />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="rcode"
                    label="验证码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7"
                  :offset="1">
            <el-button @click="getRcode"
                       :disabled="totaltime!=60">获取验证码<span v-if="totaltime!=60"> {{totaltime}}</span> </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="center">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary"
                 @click="Qrules">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// import axios from 'axios';
import { getPhoneCode, register } from "@/api/register.js"
export default {
  data () {
    return {
      form: {
        avatar: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        code: '',
        rcode: '',
        codeUrl: process.env.VUE_APP_URL + '/captcha?type=sendsms',

      },
      totaltime: 60,
      dialogFormVisible: false,
      imageUrl: '',
      baseUrl: process.env.VUE_APP_URL,

      // 验证规则
      rules: {
        // 头像
        avatar: [{ required: true, message: '请上传头像', trigger: 'change' }],
        // 昵称
        username: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        // 邮箱
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback('请输入正确的邮箱地址');
              }
            }
          }
        ],
        // 手机号
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
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
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '请输入6到12位密码', trigger: 'change' }
        ],
        // 图形码
        code: [
          { required: true, message: '请输入图形码', trigger: 'change' },
          { min: 4, max: 4, message: '请输入6到12位密码', trigger: 'change' }
        ],
        // 验证码
        rcode: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      }
    };
  },

  // 侦听器,第一个是新值,第二个是旧值,如果只传一个,那就是新值
  watch: {
    dialogFormVisible (newVal) {
      if (newVal == false) {
        // 调用resetFields方法将这个表单重置
        this.$refs.formRef.resetFields();
        this.imageUrl = "";
      }
    }  },
  methods: {
    // 点击取消按钮
    cancel () {
      this.dialogFormVisible = false
    },

    // 点击获取验证码
    // 访问el-form上的validateField方法,该方法有两个参数
    // 第一个是要验证的项,支持string和array
    // 第二个参数是一个function  function的参数是验证时的错误信息返回,当返回信息为空(就是没有错误)
    // 需求是两次都通过才行
    getRcode () {
      let pass = true;
      this.$refs.formRef.validateField(['phone', 'code'], error => {
        if (error != '') {
          pass = false;
        }
      });
      if (pass === false) {
        return;
      } else {

        // 请求前设置一个倒计时定时器
        this.totaltime--;
        let timeID = setInterval(() => {
          this.totaltime--;
          if (this.totaltime <= 0) {
            clearInterval(timeID);
            this.totaltime = 60
          }
        }, 1000);
        // 用来调用接口获取验证码;
        // axios({
        //   url: process.env.VUE_APP_URL + '/sendsms',
        //   method: 'post',
        //   data: {
        //     code: this.form.code,
        //     phone: this.form.phone
        //   },
        //   withCredentials: true

        // 封装在外面的调用接口
        getPhoneCode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          console.log(res);
          this.$message.success(res.data.captcha + '')
        });
      }
    },
    // 图形验证码
    clickCode () {
      this.form.codeUrl =
        process.env.VUE_APP_URL + '/captcha?type=sendsms&t=' + Date.now();
    },
    // 确定注册按钮的点击,触发全局验证
    Qrules () {
      this.$refs.formRef.validate(result => {
        console.log(result)
        if (result) {
          register(this.form).then(res => {
            console.log("注册返回信息", res);          
              this.$message.success("注册成功");
              this.dialogFormVisible = false;          
          })
        }

      });
    },

    // 上传成功处理
    handleAvatarSuccess (res) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res.data.file_path);
      this.imageUrl = this.baseUrl + '/' + res.data.file_path;
      this.form.avatar = res.data.file_path;
      this.$refs.formRef.validateField('avatar');
    },
    // 上传前处理
    beforeAvatarUpload (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
//scoped:局部样式,不影响其他组件,但是有些类名控制不了
.register {
  .title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    background: rgb(3, 192, 249, 1);
  }
  .center {
    text-align: center;
  }
  .img {
    width: 100%;
  }
}
</style>

<style lang="less">
//怕影响全局可以多写一个style调一些样式
.register {
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
