<template>
    <div id="index">
        <el-container id="container">
            <el-header id="header">
                MeetHere
            </el-header>
            <el-container>
                <el-aside id="aside">
                    <el-row :gutter="12" class="user">
                        <el-col :span="4"  :offset="2"> <el-avatar icon="el-icon-user-solid"></el-avatar></el-col>
                        <el-col :span="6"><P>管理员</P></el-col>
                    </el-row>
                    <el-divider class="divider"></el-divider>
                    <el-menu   router>
                        <el-menu-item index="/AdminIndex/userManagement"><i class="el-icon-s-home"></i>用户管理</el-menu-item>
                        <el-menu-item index="/AdminIndex/stadiumManagement"><i class="el-icon-s-order"></i>场馆信息管理</el-menu-item>
                        <el-menu-item index="/AdminIndex/checkOrder"><i class="el-icon-s-grid"></i>预约订单审核</el-menu-item>
                        <el-menu-item index="/AdminIndex/ordersCount"><i class="el-icon-menu"></i>预约订单统计</el-menu-item>
                        <el-menu-item index="/AdminIndex/checkNews"><i class="el-icon-s-unfold"></i>新闻动态管理</el-menu-item>
                        <el-menu-item index="/AdminIndex/checkReply"><i class="el-icon-s-finance"></i>留言审核</el-menu-item>
                    </el-menu>
                    <div class="logout">
                        <el-button type="primary" plain  @click="handleLogout">注销</el-button>
                    </div>

                </el-aside>
                <el-main id="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods:{
            handleLogout(){
                this.$store.commit('LOGOUT');
                this.$router.push({path:'/'});
            }
        }
    }
</script>

<style>
    #index {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
        width:100%;
        height:100vh;
    }
    #container{
        width:100%;
        height:100%;
    }

    #header{
        background-color: #B3C0D1;
        color: #333;
        font-size: 20px;
        font-weight: bolder;
        text-align: center;
        line-height: 60px;
        width:100%;
    }
    #aside {
        width:15%;
        color: #333;
        text-align: left;
    }

    #main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        width:85%;
    }

    .user{
        margin-top:10px;
    }
    .divider{
        margin:0;
    }
    .logout{
        margin-top:100px;
        margin-left: 15px;
    }
</style>
