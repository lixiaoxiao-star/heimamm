<template>
  <div>
    <!-- 企业列表头部 -->
    <el-card class="business">
      <el-form :model="form"
               ref="formRef"
               label-width="150px"
               :inline="true">
        <el-form-item label="企业编号"
                      prop="eid">
          <el-input class="setwidth"
                    v-model="form.eid"></el-input>
        </el-form-item>

        <el-form-item label="企业名称"
                      prop="name">
          <el-input class="setwidth"
                    v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者"
                      prop="username">
          <el-input class="setwidth"
                    v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="状态"
                      prop="status">
          <el-select v-model="form.status">
            <el-option value="1"
                       label="启用"></el-option>
            <el-option value="0"
                       label="禁用"></el-option>
          </el-select>
          <el-form-item class="button">
            <el-button type="primary"
                       @click="search">搜索</el-button>
            <el-button @click="eliminate">清除</el-button>
            <el-button type="primary"
                       @click="add">+新增企业</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 显示数据 -->
    <el-card class="tableData">
      <el-table :data="tableData">
        <el-table-column label="序号"
                         width="100px">
          <template slot-scope="scope">{{(pagination.currentpage-1)*pagination.pagesize+scope.$index+1}}</template>
          <!-- 序号优化,第二页第一条数据 
          当前页-1*页容量+当前数据所在下标+1
          -->

        </el-table-column>
        <el-table-column label="企业编号"
                         prop="eid"></el-table-column>
        <el-table-column label="企业名称"
                         prop="name"></el-table-column>
        <el-table-column label="创建者"
                         prop="username"></el-table-column>
        <el-table-column label="创建日期"
                         prop="create_time"></el-table-column>
        <el-table-column label="状态"
                         width="80px"
                         prop="create_time">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}"> {{scope.row.status==1?"启用":"禁用"}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="300px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setstatus(scope.row.id)"
                       :type="scope.row.status==1?'info':'success'">{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pagination.currentpage"
                     :page-sizes="[10, 2, 100, 20]"
                     :page-size="pagination.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total">
      </el-pagination>
    </div>
    <!-- 新增子组件 -->
    <addBusiness ref="addBusiness"
                 @search="getData"
                 :mode="modeFather"></addBusiness>
  </div>

</template>
<script>
import addBusiness from "./addBusiness.vue"
import { getBusinessData, delBusinessData, setBusinesststus } from "@/api/business.js"
export default {
  components: {
    addBusiness
  },
  data () {
    return {
      // 弹窗默认是新增
      modeFather: "add",
      // 分页器
      pagination: {
        currentpage: 1, //当前页
        pagesize: 10, //每页多少条
        total: 10,   //总共多少条


      },
      form: {
        status: "",  //状态
        name: "", // 企业名称
        eid: "",  //企业ID
        username: "",  //用户名
      },
      tableData: [], //表格数据
    }
  },


  created () {
    // 打开页面自动刷新数据
    this.getData();

  },
  methods: {

    // 封装打开页面数据函数
    getData () {
      let _params = {
        page: this.pagination.currentpage,
        limit: this.pagination.pagesize,
        ...this.form
      };
      // 打开页面自动刷新数据
      getBusinessData(_params).then((res) => {
        this.tableData = res.data.items; //把服务器拿到的数据给tabledata渲染
        this.pagination.total = res.data.pagination.total  //服务器返回的总条数给到分页器的总条数
      });
    },
    // 搜索功能
    search () {
      this.pagination.currentpage = 1
      this.getData()
    },
    // 页容量改变
    handleSizeChange (val) {
      this.pagination.currentpage = 1
      this.pagination.pagesize = val;
      this.search();
    },
    // 当前在哪一页(页码改变时)
    handleCurrentChange (val) {
      this.pagination.currentpage = 1
      this.pagination.currentpage = val;
      this.getData();
    },

    // 清除数据功能
    eliminate () {
      // 清空表单
      // this.form = {
      //   status: "",  //状态
      //   name: "", // 企业名称
      //   eid: "",  //企业ID
      //   username: "",  //用户名
      // },

      // 或者使用清空表单方法
      this.$refs.formRef.resetFields();
      // 调接口显示数据
      this.getData();
    },

    // 更改状态
    setstatus (id) {
      setBusinesststus({ id: id }).then(() => {
        this.$message.success("更改成功");
        this.getData();
      })
    },

    // 新增功能
    add () {
      this.modeFather = "add";  //用于区分是编辑还是新增
      this.$refs.addBusiness.dialogVisible = true  //单击新增让add子组件显示

    },

    // 删除功能
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 在axios里把id:id传给服务器删除
        delBusinessData({ id: id }).then(() => {
          // 提示用户删除成功
          this.$message.success("删除成功");
          this.search()
        })
      }).catch(e => e)
        //function(e){return e} 
        // 捕获错误.并且返回错误.就是不处理
    },

    // 编辑功能
    edit (row) {
      // row就是我们需要编辑的表单数据
      /* 
      1:新增与编辑写在一个组件里面,既然是一个组件,我们写一个自定义mode参数,让新增组件可以区分当前是在编辑还是新增
      props传值
      1:在子组件身上定义一个属性,属性名="属性值" 
      2:子组件接收该值 props:["属性名"]
      2:要编辑数据得传递给子组件,通过ref修改新增组件的form数据
      通过refs访问子组件的form表单,给他重新赋值
      1:在子组件身上定义一个ref ref="值"
      2:通过ref访问子组件的form
      this.$refs.值.form=row的数据     
      3:让子组件显示
      4:提交数据给服务器更新数据
      */
      this.modeFather = "edit";   //用于区分是编辑还是新增
      this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));   //把数据转成字符串再转成对象,就不在一个栈里,就不会同时更改数据
      this.$refs.addBusiness.dialogVisible = true  //让子组件显示
    }
  }
}


</script>
  
<style scoped lang="less">
.business {
  .setwidth {
    width: 150px;
  }

  .button {
    margin-left: 30px;
  }
}

// 中间显示数据部分
.tableData {
  margin-top: 30px;
  .red {
    color: red;
  }
}

// 分页器
.pagination {
  margin: 30px;
  text-align: center;
}
</style>