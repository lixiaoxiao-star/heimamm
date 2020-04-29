<template>
  <!-- 新增学科 -->
  <el-dialog class="addsubject"
             :visible.sync="dialogFormVisible"
             width="600px">
    <!-- 头部 -->
    <div slot="title"
         class="title">{{mode=="add"?"新增学科":"编辑学科"}}</div>

    <!-- 表单 -->
    <el-form :model="form"
             :rules="rules"
             label-width="100px"
             ref="formRef">
      <el-form-item prop="rid"
                    label="学科编号">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item prop="name"
                    label="学科名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="short_name"
                    label="学科简称">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item prop="intro"
                    label="学科简介">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item prop="remark"
                    label="学科备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>

    <!-- 尾部 -->
    <div slot="footer"
         class="footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary"
                 @click="subClick">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addsubjectdata, editsubjectdata } from '@/api/subject.js';
export default {
  props: {  //子组件要用props接收
    mode: {
      type: String,    //设置默认值是字符串
      default: "add",  //默认输出是add新增
    },  },
  data () {
    return {

      dialogFormVisible: false, //设置对话框显示还是消失
      form: {
        rid: '', //学科编号
        name: '', //学科名称
        short_name: '', //学科简称
        intro: '', //学科简介
        remark: '' //学科备注
      },

      rules: {
        rid: [
          { required: true, message: '请输入正确的学科编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入正确的学科名称', trigger: 'blur' }
        ]
      }
    };
  },
  // 监听方法
  watch: {
    // 监听这个变量,如果发生改变,传参是两个参数,新值和旧值,只传一个就是新值
    dialogFormVisible (newval) {
      // 当新值等于false,也就是关闭这个对话框时
      if (newval == false) {
        // 清空整个表单  //注意:需要清空的项必须要有prop属性绑定
        this.$refs.formRef.resetFields();
      }
    },
    mode () {
      // 异步操作,以防form表单还没渲染成功
      this.$nextTick(() => {
        // 当mode值改变时清空表单验证方法
        this.$refs.formRef.clearValidate();
      })
    }
  },
  methods: {
    // 点击确定按钮
    subClick () {
      // 触发整个表单验证
      this.$refs.formRef.validate((result) => {
        if (result) {
          // 表单认证通过之后调接口上传新增数据
          // 新增触发
          if (this.mode == "add") {
            addsubjectdata(this.form).then(() => {
              //1: 弹出对话框提示用户
              this.$message.success('新增成功');
              //2: 关掉对话框
              this.dialogFormVisible = false;
              // 3:重新调用父组件的搜索方法
              // this.$parent.search();
              // 使用emit实现
              // 1:在父组件引入子组件的自身上绑定方法
              // 2:调用emit触发complete方法,complete=search搜索方法
              this.$emit('complete');
            })
          } else {
            editsubjectdata(this.form).then(() => {
              //1: 弹出对话框提示用户
              this.$message.success('编辑成功');
              //2: 关掉对话框
              this.dialogFormVisible = false;
              // 2:调用emit触发complete方法,complete=search搜索方法
              this.$emit('complete');
            })


          }

        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.addsubject {
  .title {
    background: rgba(64, 158, 255, 1);
    font-size: 18px;
    font-family: Microsoft YaHei;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    width: 600px;
    height: 53px;
    line-height: 53px;
  }

  .footer {
    text-align: center;
  }
}
</style>

<style>
.el-dialog__header {
  padding: 0px !important;
}

.el-icon-close:before {
  color: white;
}
</style>
