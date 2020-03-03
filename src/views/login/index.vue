
<template>
    <div  class="login">
    <div class="LoginBoard">
           <div class="inputDiv">
               <el-row :gutter="10">
                   <el-col :span="11">
                       <span>名称</span>
                   </el-col>
                   <el-col :span="8">
                       <div class="inputBorder">
                           <input type="text" v-model="userName"></input>
                       </div>
                   </el-col>
               </el-row>
               <el-row :gutter="10" style="margin-top: 10px">
                   <el-col :span="11">
                       <span>密码</span>
                   </el-col>
                   <el-col :span="8">
                       <div class="inputBorder">
                       <input type="password" v-model="password"></input>
                       </div>
                   </el-col>
               </el-row>
                <el-row :gutter="10" style="margin-top: 10px" v-if="ifShow">
                   <el-col :span="11">
                       <span>确认密码</span>
                   </el-col>
                   <el-col :span="8">
                       <div class="inputBorder">
                       <input type="password" v-model="confirmPassword"></input>
                       </div>
                   </el-col>
               </el-row>
           </div>
            <div class="buttonDIV">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-button type="primary" plain @click="loginHandle" class="logIN">登录</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="primary" plain @click="registerHandle">注册</el-button>
                    </el-col>
                </el-row>
            </div>
    </div>
    </div>
</template>
<script>
    import  utils from '../../utils'
    export default {
        data: () => ({
            userName:'',
            password:'',
            confirmPassword:'',
            ifShow:false,
            clickRegister:0
        }),
      methods:{
           loginHandle () {
               // this.$store.commit('LOGIN',{userId:this.userId,identity:1});
               // if(this.userID === '1')
               //     this.$router.push({name:'index'});
               // else
               //     this.$router.push({name:'AdminIndex'});
               utils.request({
                   invoke: utils.api.login,
                   params:{
                           username: this.userName,
                           password: this.password
                   }
               }).then(res =>{
                   console.log(res);
                    if(res.code === 200){
                   let userData = res.data;
                       this.$store.commit('LOGIN',{
                           userId:userData.id,
                           userName:userData.username,
                           identity:userData.admin});
                       if(!userData.admin){
                           this.$router.push({name:'index'});
                       }
                       else
                           this.$router.push({name:'AdminIndex'});
                   }
                   else{
                        alert(res.message);
                   }
               });


          },
          registerHandle(){
              if(!this.clickRegister)
              {this.ifShow= true;
                this.clickRegister++;
              }
              else{
              if(this.password==''||this.userName==''||this.confirmPassword=='')
              alert("请输入名称或密码。");
              else if(this.password!=this.confirmPassword)
              alert("两次输入密码不一致。")
              else
              this.register();
              }

          },
          register(){
              utils.request({
                  invoke: utils.api.register,
                  params:{
                      username: this.userName,
                      password: this.password,
                  }
              }).then(res =>{
                  console.log("进入注册");
                  console.log(res);
                  if(res.code === 200){
                      alert("注册成功");
                       this.ifShow =false;                     
                      }
                  else{
                      alert(res.message);
                  }
                
              })
          }
      },
      mounted(){
          this.ifShow =false;
            this.clickRegister=0;
      }
    }
</script>
<style scoped>
    .login{
        display: flex;
        justify-content: center;
        align-items: center;
    }
.LoginBoard{
    width:80%;
}
    .buttonDIV{
        margin-top: 20px;
    }
    .inputDiv{
       z-index: 999;
    }
    .inputDiv input{
        border:0;
        background-color:transparent;
    }

    .inputDiv span{
        color: #000080;
    }
    .inputBorder{
        border-bottom: 2px solid #1E90FF;
        width: 130px
    }


</style>