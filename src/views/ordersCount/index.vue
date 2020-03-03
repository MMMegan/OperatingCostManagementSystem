<template>
    <div class="order">

        <div class="searchWord">
            <el-input
                    v-model="search"
                    style="display: inline-block;width:100%"
                    placeholder="请根据用户/场馆/场地/租金/开始日期关键字搜索相关订单">
            </el-input>
        </div>
        <!--表格-->
        <div style="margin-top: 20px" >
        <el-table
                ref="orderTable"
                :data="tables"
                stripe
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="stadiumName"
                    label="场馆"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="siteName"
                    label="场地"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="rent"
                    label="租金"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="开始日期"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="结束日期">
            </el-table-column>
        </el-table>
        </div>
            <el-pagination
                    background
                    class="page"
                    layout="total,prev, pager, next"
                    :current-page.sync="currentPage"
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    :pager-count="5"
                    :total="totalNum">
            </el-pagination>
    </div>
</template>
<script>
    import  utils from '../../utils'

    export default {

        data() {
            return {
                order:[],
                //分页
                    pageSize: 8,
                    currentPage:1,
                    totalNum:0,

                search:''
            }
        },

        computed:{
            tables(){
                const search=this.search;
                if(search){
                    return this.order.filter(data=>{
                        return Object.keys(data).some(key=>{
                            if(key==="user.username"){

                            }
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.order
            }
        },

        mounted(){
            this.initPage(this.currentPage);
        },

        methods:{
            initPage(current){
                    utils.request({
                        invoke: utils.api.listOrder,
                        params:{
                            status:1,
                            pageSize:this.pageSize,
                            pageNum:current
                        }
                    }).then(res =>{
                        console.log(res);
                        this.order = res.data;
                        this.totalNum = res.total;
                        for(let i=0;i<this.order.length;i++){
                            this.order[i].startTime=this.order[i].startTime.replace("T"," ");
                            this.order[i].endTime=this.order[i].endTime.replace("T"," ");
                        }
                    })
            },
            handleCurrentChange() {
                this.initPage(this.currentPage);
            },
        }
    }
</script>
<style scoped>
    .page{
        position: fixed;
        bottom: 30px;
        left: 50%;
    }
</style>