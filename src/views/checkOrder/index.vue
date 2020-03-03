<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">未审核订单</el-menu-item>
            <el-menu-item index="2">通过订单</el-menu-item>
            <el-menu-item index="3">不通过订单</el-menu-item>
            <el-menu-item index="4">取消订单</el-menu-item>
        </el-menu>

    <el-table
            :data="orderData"
            stripe
            style="width: 100%"
            v-loading = "pictLoading"
            element-loading-background = "rgba(0, 0, 0, 0.5)"
            element-loading-text = "数据正在加载中"
            element-loading-spinner = "el-icon-loading">
        <el-table-column
                type="index"
                label="序号"
                width="50">
        </el-table-column>
        <el-table-column
                prop="userName"
                label="用户"
                width="80">
        </el-table-column>
        <el-table-column
                prop="stadiumName"
                label="场馆"
                width="100">
        </el-table-column>
        <el-table-column
                prop="siteName"
                label="场地"
                width="100">
        </el-table-column>
        <el-table-column
                prop="rent"
                label="租金"
                width="80">
        </el-table-column>
        <el-table-column
                prop="startTime"
                label="开始日期"
                width="160">
        </el-table-column>
        <el-table-column
                prop="endTime"
                label="结束日期"
                width="160">
        </el-table-column>
        <el-table-column label="审核状态">
            <template slot-scope="scope">
                <span v-if="scope.row.status===1">通过</span>
                <span v-else-if="scope.row.status===2">不通过</span>
                <span v-else-if="scope.row.status===3">已取消</span>
                <span v-else>
                    <el-button
                            @click="handleCheck(scope.$index,scope.row)"
                            size="small"
                            type="primary"
                            icon="edit">
                        <span >通过</span>
                    </el-button>
                    <el-button
                            @click="handleUnCheck(scope.$index,scope.row)"
                            size="small"
                            type="danger"
                            icon="delete">
                        <span>不通过</span>
                    </el-button>
                </span>
            </template>
        </el-table-column>
    </el-table>
    <div>
        <el-pagination
                background
                class="page"
                layout="total,prev, pager, next"
                :current-page.sync="currentPage"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :total="totalNum">
        </el-pagination>
    </div>
    </div>
</template>

<script>
    import  utils from '../../utils'
    export default {
        data(){
            return {
                //分页参数
                totalNum: 0,
                pageSize: 8,
                currentPage:1,
                pictLoading:true,

                //order分类数组
                orderData:[],
                unCheckedOrder:[],
                checkedOrder2:[],
                checkedOrder3:[],
                checkedOrder4:[],

                //index选择参数
                activeIndex:'1',
                selectTab:''
            }
        },
        mounted() {
            this.loadOrder(0);
            this.loadOrder(1);
            this.loadOrder(2);
            this.loadOrder(3);
        },
        methods:{
            //数据导入
            loadOrder(state){
                this.pictLoading=true;
                utils.request({
                    invoke: utils.api.listOrder,
                    params:{
                        status: state,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(res =>{
                    console.log(res);
                    this.totalNum=res.total;
                    if(state===0){
                        this.unCheckedOrder=res.data;
                        for(let i=0;i<this.unCheckedOrder.length;i++){
                            this.unCheckedOrder[i].startTime=this.unCheckedOrder[i].startTime.replace("T"," ");
                            this.unCheckedOrder[i].endTime=this.unCheckedOrder[i].endTime.replace("T"," ");
                        }
                    }
                    else if(state===1){
                        this.checkedOrder2=res.data;
                        for(let i=0;i<this.checkedOrder2.length;i++){
                            this.checkedOrder2[i].startTime=this.checkedOrder2[i].startTime.replace("T"," ");
                            this.checkedOrder2[i].endTime=this.checkedOrder2[i].endTime.replace("T"," ");
                        }
                    }
                    else if(state===2){
                        this.checkedOrder3=res.data;
                        for(let i=0;i<this.checkedOrder3.length;i++){
                            this.checkedOrder3[i].startTime=this.checkedOrder3[i].startTime.replace("T"," ");
                            this.checkedOrder3[i].endTime=this.checkedOrder3[i].endTime.replace("T"," ");
                        }
                    }
                    else if(state===3){
                        this.checkedOrder4=res.data;
                        for(let i=0;i<this.checkedOrder4.length;i++){
                            this.checkedOrder4[i].startTime=this.checkedOrder4[i].startTime.replace("T"," ");
                            this.checkedOrder4[i].endTime=this.checkedOrder4[i].endTime.replace("T"," ");
                        }
                    }
                    this.pictLoading=false;
                })
            },
            //分页处理
            handleCurrentChange(current){
                if(this.selectTab===1)this.loadOrder(0);
                if(this.selectTab===2)this.loadOrder(1);
                if(this.selectTab===3)this.loadOrder(2);
                if(this.selectTab===4)this.loadOrder(3);
                this.currentPage=current;
            },
            //index切换处理
            handleSelect(e){
                this.selectTab =e;
                if(e === '1'){
                    this.loadOrder(0);
                    this.orderData = this.unCheckedOrder;}
                else if(e==='2'){
                    this.loadOrder(1);
                    this.orderData = this.checkedOrder2;}
                else if(e==='3'){
                    this.loadOrder(2);
                    this.orderData = this.checkedOrder3;}
                else if(e==='4'){
                    this.loadOrder(3);
                    this.orderData = this.checkedOrder4;}
            },

            //订单不通过处理
            handleUnCheck(index,row){
                this.$confirm('请再次确认是否审核不通过?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'info',
                        message: '审核不通过'
                    });
                    this.orderData.splice(index, 1);
                    utils.request({
                        invoke: utils.api.auditOrder,
                        params:{
                            orderId:row.id,
                            auditStatus:2
                        }
                    }).then(res=>{
                        console.log(res);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '取消审核'
                    });
                });
            },
            //订单通过处理
            handleCheck(index,row){
                this.$confirm('请再次确认是否审核通过?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '审核通过'
                    });
                    this.orderData.splice(index, 1);
                    utils.request({
                        invoke: utils.api.auditOrder,
                        params:{
                            orderId:row.id,
                            auditStatus:1
                        }
                    }).then(res=>{
                        console.log(res);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '取消审核'
                    });
                });
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