<template>
    <div>
       <div v-for="item in commentS " :key="item.id" class="commentBox">
           <div class="detail">
               <p class="time">{{item.createTime}}</p>
           </div>
           <el-row>
               <el-col :span="20">
                   <div class="detail">
                   <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                          <p class="name">{{item.reviewer.username}}:</p> -->
                   <P style="margin-left: 5px">{{item.content}}</P>
                   </div>
               </el-col>
           </el-row>
       </div>
        <div class="inputBox">
             <el-button type="text" class="but" @click="more">加载更多评论...</el-button>
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    placeholder="请输入评论......"
                    v-model="conmentDetail">
            </el-input>
            <el-button type="danger" class="but" @click="publish">提交评论</el-button>
        </div>
    </div>

</template>
<script>
    import  utils from '../utils'
    export default {
        props:{
            comment:{
                type: Array
            },
            siteId: Number
        },
        data(){
            return{
                conmentDetail:'',
                time:'',
                commentS:[],
                num: 1
            }
        },
        methods:{
             checkLogin(){
                 if(this.conmentDetail == ''){
                     alert('请输入评论内容。');
                     return false;
                 }
            if(!this.$store.state.loginState)
            {
               alert('请先登录。');
                return false;
            }
            return true;

         },
            publish(){
                if(!this.checkLogin())
                  return ;
                utils.request({
                    invoke: utils.api.publishComment,
                    params:{
                       siteId: this.siteId,
                        content: this.conmentDetail
                    }
                }).then(res =>{
                    console.log(res);
                    alert('评论成功');
                }).catch(res =>{
                    alert('评论失败');
                })
            },
            more(){
                this.commentS = this.comment.slice(0,2*this.num);
                this.num++;
                console.log("新评论");
                console.log(this.commentS);

            }
        }
    }
</script>
<style scoped>

    .commentBox{
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: left;

    }
    .detail{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .name{
        margin-left: 5px;
        font-size: 14px;
    }
    .inputBox{
        width:60%;
        margin-left: 30px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-items: left;
    }
    .but{
        margin-top: 10px;
        width:100px;
    }
    .time{
         font-size: 12px;
        color: #909399;
    }
</style>