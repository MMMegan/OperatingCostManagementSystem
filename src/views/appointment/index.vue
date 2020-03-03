<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">已审核订单</el-menu-item>
            <el-menu-item index="2">未审核订单</el-menu-item>
        </el-menu>
    <el-table
            :data="tableData"
            stripe
            style="width: 100%">
        <el-table-column type="expand">
            <template scope="props">
                <el-form label-position="left"  inline class="demo-table-expand" size="small" label-width="80px" >
                    <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="开始日期">
                                    <div id="start">                                     
                                    <el-date-picker
                                            id="start"
                                            v-model="props.row.startTime"
                                            type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                    </div>
                                </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="结束日期">
                                <div id="finishTime">
                                <el-date-picker
                                        v-model="props.row.endTime"
                                        type="datetime"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        @click="handleEdit(props.$index,props.row)">确认修改</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        @click="handleCancel(props.$index,props.row)">取消修改</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
        </el-table-column>
         <el-table-column
                prop="stadiumName"
                label="场馆"
                width="150">
        </el-table-column>
        <el-table-column
                prop="siteName"
                label="场地"
                width="150">
        </el-table-column>
        <el-table-column
                prop="rent"
                label="租金"
                width="100">
        </el-table-column>
        <el-table-column
                prop="startTime"
                label="开始日期"
                 width="180">
        </el-table-column>
        <el-table-column
                prop="endTime"
                label="结束日期"
                width="180">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
            </template>
        </el-table-column>
    </el-table>
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
    import  utils from '../../utils'
    export default {
        data() {
            return {
                activeIndex: '1',
                totalNum:0,
                totalNum1: 0,
                totalNum2: 0,
                pageSize: 6,
                currentPage:1,
                unCheckedOrder:[],
                checkedOrder:[],
                tableData:[],
                oldOrder:{},
                selectTab:''
            }
        },
        methods:{
       async  handleEdit(index,row) {
                console.log(index, row);
                let newTime1 = new Date(row.startTime);
                let newTime2 = new Date(row.endTime);
                let diff = newTime2.getTime() - newTime1.getTime();
                diff = diff / (1000 * 60*60);
                this.tableData[index].rent = diff*88;
               await utils.request({
                    invoke: utils.api.getOrder,
                    params:{
                        orderId: row.id
                    }
                }).then(res =>{
                    this.oldOrder = res.data;
                })
             await   utils.request({
                    invoke: utils.api.userUpdateOrder,
                    params:{
                        orderId: row.id,
                        siteId: row.siteId,
                        oldStartTime:this.oldOrder.startTime.replace("T"," "),
                        startTime: row.startTime,
                        endTime: row.endTime
                    }
                }).then(res =>{
                    if(res.code===200)
                    alert('修改成功');
                    else{
                         alert(res.message);
                    }
                }).catch(res=>{
                    alert('修改失败');
                })
            },
            handleCancel(index,row){
                 utils.request({
                    invoke: utils.api.getOrder,
                    params:{
                        orderId: row.id
                    }
                }).then(res =>{
                    this.oldOrder = res.data;
                     this.tableData[index].startTime = this.oldOrder.startTime.replace("T"," ");
                this.tableData[index].endTime = this.oldOrder.endTime.replace("T"," ");
                })
            },
            handleCurrentChange(index){
             if(this.selectTab === '1')
             { this.initOrder(1);
             this.tableData = this.checkedOrder.slice(0);
             }
             else{
                 this.initOrder(0);
             this.tableData = this.unCheckedOrder.slice(0);
             }

            },
            handleDelete(index,row){
                utils.request({
                    invoke: utils.api.userCancelOrder,
                    params:{
                        orderId: row.id
                    }
                }).then(res =>{
                    console.log(res);
                    alert('取消成功');

                }).catch(res=>{
                   alert('取消失败');
                })
            },
            handleSelect(e){
               this.selectTab =e;
               this.changePageNum(e);
                this.tableData = new Array();
               if(e === '1')
                   this.tableData = this.checkedOrder.slice(0);
                else this.tableData =this.unCheckedOrder.slice(0);
            },
            changePageNum(e){
               if(e === '1')
                this.totalNum = this.totalNum1;
                else
                 this.totalNum = this.totalNum2;
                 this.currentPage = 1;
            },
            initOrder(isCheck){
                utils.request({
                    invoke: utils.api.siteListOrderByUser,
                    params:{
                        status: isCheck,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(res =>{
                    console.log(res);
                    if(isCheck)
                    this.totalNum1 = res.total;
                    else
                     this.totalNum2 = res.total;
                    if(isCheck)
                    { this.checkedOrder = res.data;
                       for(let i=0;i<this.checkedOrder.length;i++){
                           this.checkedOrder[i].startTime=this.checkedOrder[i].startTime.replace("T"," ");
                           this.checkedOrder[i].endTime=this.checkedOrder[i].endTime.replace("T"," ");
                       }
                    }
                    else
                    {this.unCheckedOrder = res.data;
                        for(let i=0;i<this.unCheckedOrder.length;i++){
                            this.unCheckedOrder[i].startTime=this.unCheckedOrder[i].startTime.replace("T"," ");
                            this.unCheckedOrder[i].endTime=this.unCheckedOrder[i].endTime.replace("T"," ");
                        }
                    }
                })
            }
        },
        mounted() {
            this.initOrder(1);
            this.initOrder(0);
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