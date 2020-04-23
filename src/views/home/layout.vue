<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold icon" @click="collapse = !collapse"></i>
        <img
          class="title"
          src="../../assets/img/矢量智能对象 拷贝 9.png"
          alt=""
        />
        <span class="heima">黑马面面</span>
      </div>
      <div class="right">
        <img class="rightImg" :src="$store.state.userInfo.avatar" alt="" />
        <span class="rightFont">{{ $store.state.userInfo.username }},你好</span>
        <el-button type="primary" @click="exit"> 退出</el-button>
      </div>
    </el-header>
    <!-- 左边导航栏 -->
    <el-container>
      <el-aside width="auto" class="aside">
        <!-- $route.fullpath:是指当前路由路径,包括参数 例:home/start/name=111 -->
        <!--  $route.path 是指当前路由路径,不包括参数  例:/home/start,后面参数忽略 -->

        <!-- :default-active默认跳转到... -->
        <el-menu
          :router="true"
          :default-active="$route.path"
          :collapse="!collapse"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <!-- 所有的子组件就是为了替换主组件的view的 -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { getUserInfo, exitLogin } from '@/api/home.js';
import { removeToken } from '@/utils/token.js';
import { getToken } from '../../utils/token';
export default {
  data() {
    return {
      userInfo: '',
      collapse: true
    };
  },
  created() {
    // 进行基本判断,无token跳转到登录页面,无需调用下面的接口,有token就会继续下一步,发送请求,调用用户信息
    if (!getToken()) {
      this.$router.push('/');
      return;
    }
    // 调用获取用户信息
    getUserInfo().then((res) => {
      this.userInfo = res.data;
      this.userInfo.avatar =
        process.env.VUE_APP_URL + '/' + this.userInfo.avatar;
      // 把用户信息保存到共享数据state里面
      this.$store.state.userInfo = this.userInfo;
    });
  },
  methods: {
    // exit () {
    //   removeToken();
    //   this.$router.push("/");
    // }
    exit() {
      this.$confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //  调用退出借口,发送请求给服务端删除token信息
        exitLogin().then(() => {
          removeToken();
          this.$message('退出成功!');
          this.$router.push('/');
        });
      });
    }
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;

  .header {
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
      }
      .title {
        margin: 0px 10px;
      }
      .heima {
        width: 92px;
        height: 22px;
        line-height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }

    .right {
      display: flex;
      align-items: center;
      .rightFont {
        margin: 0px 10px;
        height: 15px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
      }
      .rightImg {
        font-size: 30px;
        width: 50px;
      }
    }
  }

  .aside {
    height: calc(100% - 60px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 160px;
    }
  }
}
</style>
