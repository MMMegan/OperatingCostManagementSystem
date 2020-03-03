<template>
    <el-scrollbar
            class="bar"
            :style="{height: scrollHeight}"
            ref="scrollbarContainer">
    <div>
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <div class="detail">
           <el-row :gutter="30">
               <el-col :span="4" >
                   <el-image :src="require('../assets/site2.jpg')" fit="fill" style="width: 100px;height:100px"></el-image>
               </el-col>
               <el-col :span="14" class="detailSite" >
                   <div class="detailSite">
                       <h1 class="title">{{site.name}}</h1>
                       <p class="color:#606266">{{site.description}}</p>
                       <p>租金：<span style="color: red;font-weight: bolder">{{site.rent}}</span>元/小时</p>
                       <P class="address"><i class="el-icon-location-outline"></i>{{site.location}}</P>
                   </div>
               </el-col>
           </el-row>
        </div>
        <div style="margin-top: 20px;">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-date-picker
                            v-model="dateTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="margin-top: 5px" @change="dateChange"
                             :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-time-select
                            id="startTime"
                            placeholder="起始时间"
                            style="margin-top: 5px"
                            v-model="time.startTime"
                           format="timestamp"
                            @change="startChange"
                            :picker-options="{start: '08:30',step: '00:30',end: '18:30' }">
                    </el-time-select>
                    <el-time-select
                            id="endTime"
                            placeholder="结束时间"
                            style="margin-top: 5px"
                            v-model="time.endTime"
                            @change="endChange"
                            :picker-options="{start: '08:30',step: '00:30',end: '18:30',minTime: time.startTime}">
                    </el-time-select>
                </el-col>
                <el-col :span="10">
                   <el-card body-style="padding: 10px" class="card">
                       <h1>订单信息</h1>
                       <el-divider class="divider"></el-divider>
                       <div class="bookBox">
                       <P><span>场地：</span>{{order.siteName}}</P>
                       <P><span>开始时间：</span>{{order.startTime}}</P>
                       <P><span>结束时间：</span>{{order.endTime}}</P>
                       <P><span>租金：</span>{{order.rent}}</P>
                       </div>
                       <el-divider class="divider"></el-divider>
                       <el-button type="danger" @click="book">预定</el-button>
                   </el-card>
                </el-col>
            </el-row>
        </div>
       <div>
           <comment-unit :comment="comment" :siteId="site.id"></comment-unit>
       </div>
    </div>
    </el-scrollbar>
</template>
<script>
    import  commentUnit from './commentUnit'
    import  utils from '../utils'
    export default {
        data(){
            return {
            site:{
            },
                dateTime:'',
                time:{
                   startTime:'',
                    endTime:''
                },
                selectSite: '',
                order:{
                    siteName: '',
                    siteId: '',
                    rent:'',
                    startTime:'',
                    endTime:''
                },
                comment:[],
                scrollHeight:'0px',
                pickerOptions1: {
           disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        }        
            }
        },
        components:{commentUnit},
     methods:{
         goBack(){
             this.$router.go(-1);
         },
         checkEmpty(){
            if(this.order.startTime ===''||this.order.endTime===''){
               alert('请选择相关信息。');
               return false;
            }
           else  if(!this.$store.state.loginState)
            {
               alert('请先登录。');
                return false;
            }
            return true;

         },
         book(){
            if( !this.checkEmpty()){
                return ;
            }
             utils.request({
                 invoke: utils.api.createOrder,
                 params:{
                     siteId: this.site.id,
                     siteName: this.site.name,
                     rent: this.order.rent,
                     startTime: this.order.startTime,
                     endTime: this.order.endTime
                 }
             }).then(res =>{
                 console.log(res);
                 if(res.code === 200)              
                alert('预约成功');
                else{
                    alert(res.message);
                }
             }).catch(res =>{
                 alert('预约失败');
             })
         },
         dateChange(e){
             console.log(e);
         },
         startChange(e){
             console.log(e);
             this.order.startTime = this.dateTime +' '+ e+':00';
             this.comCount();
         },
         endChange(e){
             console.log(e);
             this.order.endTime = this.dateTime +' '+ e+':00';
            this.comCount();
         },
         comCount(){
             if(this.order.startTime&&this.order.endTime)
             {
                 let newTime1 = new Date(this.order.startTime);
                 let newTime2 = new Date(this.order.endTime);
                 let diff = newTime2.getTime() - newTime1.getTime();
                 diff = diff / (1000 * 60*60);
                 this.order.rent = diff*this.site.rent;
             }
         }

     },
        mounted() {
            this.scrollHeight = window.innerHeight*0.7 + 'px';
            console.log(this.$route.params.id);
            utils.request({
                invoke: utils.api.getSiteById,
                params:{
                    id: this.$route.params.id
                }
            }).then(res =>{
                console.log(res);
                this.site= res.data;
                this.order.siteName = this.site.name;
                this.order.siteId = this.site.id;
            })
            utils.request({
                invoke: utils.api.getComments,
                params:{
                    siteId: this.$route.params.id
                }
            }).then(res =>{
                console.log(res);
                this.comment = res.data;
                for(let i=0;i<this.comment.length;i++){
                    this.comment[i].createTime = this.comment[i].createTime.replace("T"," ");
                    console.log(this.comment[i].createTime);
                }
            })
        }
    }
</script>
<style scoped>
 .detail{
     margin-top: 20px;
 }
    .detailSite{
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content:flex-start;*/
        float: left;

    }
    .title{
        margin-top:0;
        margin-right: 0;
    }
    .address{
        color: #666666;
        font-size: 14px;
    }
    .card span{
        color: #606266;
    }

    .bookBox{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

</style>