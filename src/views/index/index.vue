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
                        <el-col :span="6" id="username" ><P>{{userName}}</P></el-col>
                    </el-row>
                    <el-divider class="divider"></el-divider>
                    <el-menu  router default-active="/index/homePage" style="width: 100%">
                        <el-menu-item index="/index/homePage"><i class="el-icon-s-home" ></i>场馆预约</el-menu-item>
                        <el-menu-item index="/index/appointment"><i class="el-icon-s-order"></i>订单管理</el-menu-item>
                        <el-menu-item index="/index/seeNews"><i class="el-icon-s-grid"></i>查看新闻</el-menu-item>
                        <el-menu-item index="/index/info"><i class="el-icon-s-finance"></i>我的信息</el-menu-item>
                    </el-menu>
                    <div class="logout">
                        <el-button v-if="loginState" type="primary" plain @click="handleLogout">注销</el-button>
                        <el-button v-else type="primary" plain @click="handleLogin">登录</el-button>
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
    import { mapState} from 'vuex'
    import  utils from '../../utils'
    export default {
        name: 'app',
        data: () =>({
            path: 0,
        }),
        methods:{
            handleLogout(){
                this.$store.commit('LOGOUT');
                 this.$router.push({path:'/'});
                utils.request({
                    invoke: utils.api.logout,
                    params:{
                    }
                }).then(res =>{
                    if(res.code === 200){
                        this.$store.commit('LOGOUT');
                        this.$router.push({path:'/'});
                    }
                })
            },
            handleLogin(){
                this.$router.push({path:'/'});
            }

        },
        computed:{
            ...mapState([
                'userName',
                'loginState'
            ])
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
        width:12%;
        color: #333;
        text-align: left;
        background-color: white;
    }

    #main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        width:88%;
    }

    .user{
        margin-top:10px;
    }
    .divider{
        margin:0;
    }
    .logout{
       position: fixed;
        bottom: 30px;
        left: 30px;
    }
</style>
