<template>
    <div>
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <div class="detail">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{news.title}}</span>
                    </div>
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-image
                                        style="width: 100px; height: 100px"
                                        :src="require('../assets/news.jpg')"></el-image>
                            </el-col>
                           <el-col :span="15">
                               <P>{{news.content}}</P>
                               <P style=" color: #909399">{{news.createTime}}</P>
                               <P style=" color: #909399">{{news.writer.username}}</P>
                           </el-col>
                        </el-row>
                    </div>

                </el-card>
    </div>

    </div>
</template>
<script>
    import  utils from '../utils'
    export default{
        data(){
            return{
              news:{},
                id:0
            }
        },

        methods:{
            init(){
                this.id = this.$route.params.id;
            },
            goBack(){
                this.$router.go(-1);
            }
        },
         mounted(){
            this.init();
        console.log(this.id);
             utils.request({
                 invoke: utils.api.getNews,
                 params:{
                         id: this.id
                 }
             }).then(res =>{
                 console.log(res);
                 this.news = res.data;
             })


        }


    }
</script>
<style scoped>
.box-card{
    width: 60%;
    margin-top: 20px;
}
.detail{
    display: flex;
    justify-content: center;
}
</style>