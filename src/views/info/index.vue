<template>
    <div class="infoDiv">
        <P class="title">个人信息管理</P>
    <div class="info">
        <el-form ref="userInfo"
                 :model="userInfo"
                 status-icon
                 :rules="rules"
                 label-width="80px">
            <el-form-item label="昵称">
                <div class="box1">
                <el-input v-model="userInfo.name" style="width: 300px"></el-input>
                <el-button type="primary" @click="changeName" style="margin-left: 10px">确认修改</el-button>
                <el-button @click="cancelName">取消</el-button>
                </div>
            </el-form-item>
            <el-form-item label="旧密码" >
                <div class="box1">
                <el-input v-model="userInfo.password" show-password style="width: 300px"></el-input>
                <el-button type="primary" @click="changePassword" style="margin-left: 10px">确认修改</el-button>
                <el-button @click="cancelPassword">取消</el-button>
                </div>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <div class="box1">
                <el-input v-model="userInfo.newPassword" show-password style="width: 270px"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <div class="box1">
                    <el-input v-model="userInfo.confirmPassword" show-password style="width: 270px"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="联系方式">
                <div class="box1">
                <el-input v-model="userInfo.phone" style="width: 300px"></el-input>
                <el-button type="primary" @click="changePhone" style="margin-left: 10px">确认修改</el-button>
                <el-button @click="cancelPhone">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>
<script>
    import  utils from '../../utils'
    export default {
    data(){
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.userInfo.confirmPassword !== '') {
                    this.$refs.ruleForm.validateField('confirmPassword');
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userInfo.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                this.isSame = 1;
                callback();
            }
        };
        return{
            userInfo:{
                userId:'',
                name:'',
                phone: '',
                password:'',
                newPassword: '',
                confirmPassword:''
            },
            oldInfo:{},
            id:'',
            isSame:0,
            rules: {
                newPassword: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                confirmPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
        methods:{
            init(){
                this.id = this.$store.state.userId;
            },
            changeName(){
                utils.request({
                    invoke: utils.api.updateUsername,
                    params:{
                        newName: this.userInfo.name
                    }
                }).then(res =>{
                      console.log(res);
                    if(res.code === 200)
                       {alert('修改名称成功');
                        this.$store.state.userName = this.userInfo.name;}
                        else
                        alert(res.message);

                })
            },
            cancelName(){
              this.userInfo.name = this.oldInfo.username;
            },
            changePassword(){

                if(this.userInfo.password === this.userInfo.newPassword)
                {
                     alert('新密码与原密码一样');
                     return;
                }
                if(this.isSame) {
                    utils.request({
                        invoke: utils.api.updatePassword,
                        params: {
                            oldPassword: this.userInfo.password,
                            newPassword: this.userInfo.newPassword
                        }
                    }).then(res => {
                        console.log(res);
                        if(res.code === 200)
                        alert('修改密码成功');
                        else
                        alert(res.message);
                    })
                }
            },
            cancelPassword(){
                this.userInfo.newPassword = '';
                this.userInfo.password = '';
                this.userInfo.confirmPassword='';
            },
            changePhone(){
                utils.request({
                    invoke: utils.api.updateTelephone,
                    params:{
                        telephone: this.userInfo.phone,
                    }
                }).then(res =>{
                    console.log(res);
                    if(res.code === 200)
                        alert('修改电话成功');
                        else
                        alert(res.message);
                })
            },
            cancelPhone(){
                this.userInfo.phone = this.oldInfo.telephone;
            }
        },
        mounted() {
         this.init();
            utils.request({
                invoke: utils.api.getUser,
                params:{
                    id: this.id
                }
            }).then(res =>{
                console.log(res);
                this.oldInfo = res.data;
                this.userInfo.name = this.oldInfo.username;
                this.userInfo.password = '';
                this.userInfo.phone = this.oldInfo.telephone;
            })
        }
    }
</script>
<style scoped>
.info{
    width:60%;
    margin-top: 30px;
}
    .infoDiv{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }

    .title{
        font-size: 16px;
        font-weight: bolder;
    }
    .box1{
        display: flex;
        flex-direction: row;
    }

</style>