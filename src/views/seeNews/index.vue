<template>
    <div>
    <div class="newDiv">
        <el-timeline v-for="(newsItems,index) in news" :key="index" class="timeline">
            <el-timeline-item :timestamp=newsItems.createTime placement="top" color='#B3C0D1' >
               <news-unit :news="newsItems"></news-unit>
            </el-timeline-item>
        </el-timeline>
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
    import newsUnit from  '../../components/news'
    import  utils from '../../utils'
    export default {
            data(){
                return{
                    news:[],
                    totalNum: 0,
                    pageSize: 4,
                    currentPage:1

                }
            },
        components:{newsUnit},
        methods:{
            handleCurrentChange(){
                this.init();
            },
            init(){
                utils.request({
                    invoke: utils.api.getcatalogNews,
                    params:{
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(res =>{
                    console.log(res);
                    this.news = res.data;
                    this.totalNum = res.total;
                })
            }
        },

        mounted() {
           this.init();
        }
    }
</script>
<style scoped>
 .newDiv{
     width:100%;
 }
    .timeline{
        display: flex;
        float: left;
    }

 .page{
     position: fixed;
     bottom: 30px;
     left: 50%;
 }
</style>