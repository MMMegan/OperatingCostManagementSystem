<template>
    <div>
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <div class="detail">
            <el-row :gutter="30">
                <el-col :span="4" >
                    <el-image :src="require('../assets/site.jpg')" fit="fill" style="width: 100px;height:100px"></el-image>
                </el-col>
                <el-col :span="14" class="detailSite" >
                    <div class="detailSite">
                        <h1 class="title">{{stadium.name}}</h1>
                        <P class="address"><i class="el-icon-location-outline"></i>{{stadium.location}}</P>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="siteDiv" >
            <el-row :gutter="20" class="rowS">
                <el-col :span="6" v-for="item in selectSite" style="margin-top:10px" :key="item.id">
                    <site :item = "item"></site>
                </el-col>
            </el-row>
        </div>
        <el-pagination
                background
                class="page"
                layout="prev, pager, next"
                :current-page.sync="currentPage"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :pager-count="5"
                :total="totalNum">
        </el-pagination>
        </div>

</template>
<script>
    import site from './site'
    import  utils from '../utils'
    export default {
        data(){
            return {
                stadium:{
                },
                selectSite: [],
                totalNum: 0,
                pageSize:4,
                currentPage:1
            }
        },
        components:{site},
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            handleCurrentChange(){
                this.initPage(this.currentPage);
            },
            initPage(current){
                utils.request({
                    invoke: utils.api.getTotalsite,
                    params:{
                        pageNum: current,
                        pageSize: this.pageSize,
                        id: this.$route.params.id
                    }
                }).then(res =>{
                    console.log(res);
                    this.selectSite =res.data;
                    this.totalNum = res.total;
                })
            },


        },
        mounted() {
            let stadiumId = this.$route.params.id;
            utils.request({
                invoke: utils.api.getStadiumById,
                params:{
                    id: stadiumId
                }
            }).then(res =>{
                console.log(res);
                this.stadium=res.data;
            })
            this.initPage(this.currentPage);
        }
    }
</script>
<style scoped>
    .detail{
        margin-top: 20px;
    }
    .detailSite{
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
    .page{
        position: fixed;
        bottom: 30px;
        left: 50%;
    }
    .siteDiv{
        margin-top: 20px;
    }
</style>