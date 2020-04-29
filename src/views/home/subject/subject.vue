<template>
  <div>
    <!-- 查询标题 -->
    <el-card>
      <!-- :inline="true"将表单form下面的form-item由块级元素转换成块元素,不让他们独占一行 -->
      <el-form :inline="true"
               :model="form"
               ref="form">
        <el-form-item label-width="75px"
                      label="学科编号"
                      prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label-width="75px"
                      label="学科名称"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label-width="75px"
                      label="创建者"
                      prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label-width="75px"
                      label="状态"
                      v-model="form.status"
                      prop="select">
          <el-select placeholder="请选择状态"
                     v-model="form.select">
            <el-option label="禁用"
                       value="0"></el-option>
            <!-- value是实际选项的值,label是显示的值 -->
            <el-option label="启用"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary"
                     @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 查询内容 -->
    <el-card>
      <el-table :data="tableData">
        <el-table-column lable="序号"
                         width="50px">
          <template slot-scope="scope">
            <!--问题:翻到第二页的时候,序号号又是从一开始,并不是链接前一页的序列号           
            解决:真实的序列号:当前页-1*页容量(一页几条)+当前序列号(从0开始)+1-->
            {{
              (pagination.current - 1) * pagination.pageSize + scope.$index + 1
            }}
          </template>
        </el-table-column>
        <el-table-column label="学科编号"
                         prop="rid"> </el-table-column>
        <el-table-column label="学科名称"
                         prop="name"> </el-table-column>
        <el-table-column label="简称"
                         prop="short_name"> </el-table-column>
        <el-table-column label="创建者"
                         prop="username"> </el-table-column>
        <el-table-column label="创建日期"
                         prop="create_time"> </el-table-column>
        <el-table-column label="状态"
                         width="80px">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column lable="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">
              {{ scope.row.status == 0 ? '启用' : '禁用' }}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div>
        <el-pagination class="pagination"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pagination.current"
                       :page-sizes="[1, 2, 3, 4]"
                       :page-size="pagination.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pagination.total">
        </el-pagination>
      </div>
    </el-card>
    <addsubject ref="addRef"
                @complete="search()"
                :mode="mode"> </addsubject>
    <!-- 在新增组件中复用,加上编辑功能,加上一个mode用于区分是编辑还是新增,当编辑是改变mode的值 -->
  </div>
</template>
<script>
import {
  getsubjectlist,
  setsubjectstatus,
  delsubjectdata,

} from '@/api/subject.js';

// 导入新增弹框
import addsubject from './addsubject.vue';
export default {
  data () {
    return {
      mode: "add",  //默认先是新增,编辑时再改变,用于区分
      pagination: {
        current: 1, //当前页
        total: 0, //总共多少条
        pageSize: 1 //页面容量:一页多少条
      },
      form: {
        select: '', //下拉框
        rid: '', //学科编号
        name: '', //学科名称
        username: '', //创建者
        status: '' //状态
      },
      tableData: [] //必须是空数组
    };
  },

  components: {
    addsubject
  },
  methods: {
    // 封装调用接口方法,拿到服务器返回信息
    getData () {
      let _pageInfo = {
        limit: this.pagination.pageSize, // 一页多少条
        page: this.pagination.current, //当前页
        ...this.form
      };
      // 打开页面调用接口默认显示学科列表
      getsubjectlist(_pageInfo).then((res) => {
        this.tableData = res.data.items; //把所有数据赋给tabledata
        this.pagination.total = res.data.pagination.total; // 把请求的总条数赋值给总条数
      });
    },

    // 页容量改变时  必须立马回到第一页
    handleSizeChange (size) {
      this.pagination.pageSize = size; //调用页容量改变的方法,返回一页有多少条数据赋值给服务器,服务器再返回数据
      this.pagination.current = 1; // 注意!!!!在第二页之后单击改变页容量的时候,第二页或许没有数据,就会先出现暂无数据,再跳转回第一页,出现小BUG,所以要立马跳转回第一页
      this.getData();
    },

    // 页码改变
    handleCurrentChange (page) {
      this.pagination.current = page; //把当前页赋值给pagination再传给服务器,服务器返回当前页数据渲染
      this.getData();
    },

    // 搜索功能点击
    search () {
      // 当搜索时要先回到第一页,否则查找的数据在目前页没有的话,会出现小跳转BUG
      this.pagination.current = 1;

      //输入搜索关键字之后点击搜索功能,重新调用接口,把输入框的值传给服务器
      this.getData();
    },

    // 清除按钮功能
    reset () {
      // 调用表单的resetFieids方法,
      // 1:使用前提示参数都有相应的prop绑定,没有绑定的参数无法清空,整个表单也需要用model绑定整个表单
      // 2:在form表单上定义一个ref=值.通过refs调用resetFields方法,把整个表单重置
      this.$refs.form.resetFields();
      // 重置后调用搜索功能,输错文字后,重置就是回到第一页数据
      this.search();
    },

    // 点击启用,禁用状态按钮
    setStatus (id) {
      // 向服务器发送请求更改状态
      setsubjectstatus({ id: id }).then(() => {
        // 在响应拦截已经做了处理,能走到这步就是已经更改成功
        this.$message.success('更改状态成功');
        // 更改table数据
        this.search();
      });
    },

    // 删除按钮功能
    del (id) {
      // 删除的时候要先提示客户是否确定删除,用到element的弹框方法
      this.$confirm('你是否确定删除?', '提示框', {
        confirmButtonText: '确定',
        concelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定之后的处理
          // 调用接口传入id删除整行数据
          delsubjectdata({ id: id }).then(() => {
            // 在响应拦截已经做了处理,能走到这步就是已经删除成功
            this.$message.success('删除成功');
            // 更改table数据
            this.search();
          });
        })
        .catch(() => {
          // 取消的处理
        });
    },

    // 新增学科
    add () {
      this.mode = "add",
        this.form = {
          select: '', //下拉框
          rid: '', //学科编号
          name: '', //学科名称
          username: '', //创建者
          status: '' //状态
        },
        this.$refs.addRef.dialogFormVisible = true;
    },

    // 编辑功能
    edit (row) {
      this.mode = "edit",  //编辑时改变mode的值改成编辑.原本是add新增,用于复用区分
        // 通过refs属性修改addsubject组件的form表单的值
        // this.$refs.addRef.form = row;  //这样绑定的整行数据,在修改编辑的时候,form表单会马上跟着修改
        this.$refs.addRef.form = JSON.parse(JSON.stringify(row));  //把整行数据对象先转成字符串再转成对象,那么他们的存储空间不一样,表单就不会跟着改变了
      this.$refs.addRef.dialogFormVisible = true;

    }
  },
  created () {
    // 修改网页标题
    document.title = this.$route.meta.title;

    //打开页面调用接口默认显示学科列表
    this.getData();
  }
};
</script>

<style scoped>
.pagination {
  text-align: center;
  margin-top: 50px;
}
</style>
