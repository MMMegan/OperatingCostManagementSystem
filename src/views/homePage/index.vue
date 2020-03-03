<template>
    <div class="home">
        <!-- <div style="margin-top: 15px;" class="searchDiv">
            <el-input placeholder="请输入内容" v-model="search" class="input-with-select" @change="searchChange">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div> -->
        <div class="bookBox">
    </div>
        <div class="stadiumDiv" >
            <el-row :gutter="20" class="rowS">
                <el-col :span="6" v-for="item in selectStadium" style="margin-top:10px" :key="item.id">
                    <stadium :item = "item"></stadium>
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
    import stadium from '../../components/stadium'
    import  utils from '../../utils'
    export default {
 data(){
     return{
         search:'',
         radio1: '',
         pageSize:8,
         totalNum:0,
         currentPage:1,
         stadiumData:[],
         selectStadium:[]
     }
 },
         components:{stadium},
        methods:{
            handleCurrentChange(){
                this.initPage(this.currentPage);
            },
            initPage(current){
                utils.request({
                    invoke: utils.api.getStadium,
                    params:{
                        pageNum: current,
                        pageSize: this.pageSize
                    }
                }).then(res =>{
                    console.log(res);
                    this.selectStadium = res.data;
                    this.totalNum = res.total;
                    console.log(this.selectStadium);
                })
            },
            searchChange(){
                if(!this.search){
                    this.selectStadium= this.stadiumData;
                }
                let searchString = this.search.trim();
                let searchArray=[];
                searchArray = this.stadiumData.filter(function(item){
                    if(item.name.indexOf(searchString)!== -1){
                        return item;
                    }
                })
                this.totalNum = searchArray.length;
                this.selectStadium= searchArray;
            }
        },

        mounted() {
            this.initPage(this.currentPage);
        }
    }
</script>
<style scoped>
.searchDiv{
    float: left;
    width:50%;
}
    .home{
        display: flex;
        flex-direction: column;
    }
    .bookBox{
        margin-top:10px;
    }
    .stadiumDiv{
        margin-top:10px;
        width: 100%;

    }

    .rowS{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .page{
        position: fixed;
        bottom: 30px;
        left: 50%;
    }

 </style>