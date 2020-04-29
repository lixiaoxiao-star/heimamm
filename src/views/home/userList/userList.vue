<template>
  <!-- 用户列表 -->
  <!-- 表头 -->
  <div class="userList">
    <el-card class="userList">
      <el-form :model="form"
               ref="formRef"
               label-width="100px"
               :inline="true">

        <el-form-item label="用户名称">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-select placeholder="请选择状态">
            <el-option value=""
                       label=""> </el-option>
            <el-option value=""
                       label=""> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 显示数据区域 -->
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="序号">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>

        <el-table-column label="用户名"></el-table-column>
        <el-table-column label="电话"></el-table-column>
        <el-table-column label="邮箱"></el-table-column>
        <el-table-column label="角色"></el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 表单
      form: {

      },
      // 表格
      pagination: {
        total: 10,
        pagesize: 1,
        currentpage: 1,
      }
    }
  },
}
</script>
  
<style scoped>
/* 分页器 */
.pagination {
  text-align: center;
}
</style>