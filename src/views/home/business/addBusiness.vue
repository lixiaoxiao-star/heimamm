<template>
  <div class="add">
    <el-dialog :visible.sync="dialogVisible"
               @close="close">
      <div slot="title"
           class="title"> {{mode=="edit"?"编辑企业":"新增企业"}}</div>

      <el-form :model="form"
               ref="formRef"
               :rules="rules"
               label-width="150px">
        <el-form-item label="企业编号"
                      prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>

        <el-form-item label="企业名称"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="企业简称"
                      prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>

        <el-form-item label="企业间介"
                      prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>

        <el-form-item label="企业备注"
                      prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"
                   @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addBusinessData, editBusinesData } from "@/api/business.js"
export default {

  data () {
    return {
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [{ required: true, message: "请输入企业简称", trigger: "blur" }],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }],
      },
      dialogVisible: false,
      form: {
        eid: '',  //企业编号
        name: '',  //企业名称
        short_name: "", //简称
        intro: "",//企业简介
        remark: "", //企业备注
      },
    }

  },

  props: {
    search: {
      type: String,
    },
    mode: {
      type: String,
    }
  },

  methods: {
    // 点击确定按钮触发表单全局验证
    confirm () {
      // 验证表单
      this.$refs.formRef.validate(result => {
        console.log(this.form);
        // 表单验证通过时
        if (result) {
          if (this.mode == "add") {
            // 验证通过调用新增接口请求
            addBusinessData(this.form).then(() => {
              this.$message.success("新增成功");  //提示信息
              this.dialogVisible = false;  //关闭弹窗
              this.$emit("search");   //触发search触发父组件的刷新数据
              this.$refs.formRef.resetFields();  //清空表单
            })
          } else {
            //  验证通过调用编辑接口请求
            editBusinesData(this.form).then(() => {
              this.$message.success("修改成功");  //提示信息
              this.dialogVisible = false;  //关闭弹窗
              this.$emit("search");   //触发search触发父组件的刷新数据
              this.$refs.formRef.resetFields();  //清空表单
            })
          }
        }
      })
    },

    // 关闭弹窗时触发
    close () {
      this.$refs.formRef.resetFields();  //清空表单
      this.form = this.$options.data().form  //关闭弹窗后,表单恢复初始状态
    },

    // 取消按钮的点击事件
    cancel () {
      this.dialogVisible = false;  //关闭弹窗
    }
  },
}
</script>
  
<style scoped lang="less">
.add {
  width: 600px;
  .title {
    color: white;
    height: 53px;
    line-height: 53px;
    text-align: center;
    background: rgba(14, 162, 250);
  }
  .footer {
    text-align: center;
  }
}
</style>