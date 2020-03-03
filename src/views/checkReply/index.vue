<template>
    <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">未审核留言</el-menu-item>
        <el-menu-item index="2">已发布留言</el-menu-item>
        <el-menu-item index="3">忽略留言</el-menu-item>
    </el-menu>

        <el-table
                :data="commentsData"
                stripe
                style="width: 100%"
                v-loading = "pictLoading"
                element-loading-background = "rgba(0, 0, 0, 0.5)"
                element-loading-text = "数据正在加载中"
                element-loading-spinner = "el-icon-loading">
            <el-table-column
                    prop="reviewer.id"
                    label="用户id"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="reviewer.username"
                    label="用户姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="留言时间"
                    width="180">
            </el-table-column>
            <el-table-column label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status===1">已发布</span>
                    <span v-else-if="scope.row.status===2">已忽略</span>
                    <span v-else>
                    <el-button
                            @click="handleCheck(scope.$index,scope.row)"
                            size="small"
                            type="primary"
                            icon="edit">发布
                    </el-button>
                    <el-button
                            @click="handleUnCheck(scope.$index,scope.row)"
                            size="small"
                            type="danger"
                            icon="delete">忽略
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
        data() {
            return {
                //分页参数
                totalNum: 0,
                pageSize: 8,
                currentPage:1,
                pictLoading:true,

                //new分类数组
                commentsData: [],
                unCheckedCommentsData:[],
                publishedCommentsData:[],
                ignoredCommentsData:[],

                //index选择参数
                activeIndex:'1',
                selectTab:''
            }
        },
        mounted(){
            //初始化所有数据
            this.loadData(0);
            this.loadData(1);
            this.loadData(2);
        },
        methods:{
            loadData(state){
                this.pictLoading=true;
                utils.request({
                    invoke: utils.api.getCommentsList,
                    params:{
                        status: state,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(res=>{
                    console.log(res);
                    this.totalNum=res.total;
                    if(state===0){
                        this.unCheckedCommentsData=res.data;
                        for(let i=0;i<this.unCheckedCommentsData.length;i++){
                            this.unCheckedCommentsData[i].createTime=this.unCheckedCommentsData[i].createTime.replace("T"," ");
                        }
                    }
                    else if(state===1){
                        this.publishedCommentsData=res.data;
                        for(let i=0;i<this.publishedCommentsData.length;i++){
                            this.publishedCommentsData[i].createTime=this.publishedCommentsData[i].createTime.replace("T"," ");
                        }
                    }
                    else if(state===2){
                        this.ignoredCommentsData=res.data;
                        for(let i=0;i<this.ignoredCommentsData.length;i++){
                            this.ignoredCommentsData[i].createTime=this.ignoredCommentsData[i].createTime.replace("T"," ");
                        }
                    }
                    this.pictLoading=false;
                })
            },
            //分页处理
            handleCurrentChange(current){
                if(this.selectTab===1)this.loadData(0);
                if(this.selectTab===2)this.loadData(1);
                if(this.selectTab===3)this.loadData(2);
                this.currentPage=current;
            },
            //index切换处理
            handleSelect(e){
                this.selectTab =e;
                if(e === '1'){
                    this.loadData(0);
                    this.commentsData = this.unCheckedCommentsData;}
                else if(e==='2'){
                    this.loadData(1);
                    this.commentsData = this.publishedCommentsData;}
                else if(e==='3'){
                    this.loadData(2);
                    this.commentsData = this.ignoredCommentsData;}
            },
            //留言忽略处理
            handleUnCheck(index,row){
                this.$confirm('请再次确认是否忽略该留言?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'info',
                        message: '该留言已忽略'
                    });
                    this.commentsData.splice(index, 1);
                    utils.request({
                        invoke: utils.api.auditComment,
                        params:{
                            commentId:row.id,
                            auditOption:2
                        }
                    }).then(res=>{
                        console.log(res);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '取消操作'
                    });
                });
            },
            //留言通过处理
            handleCheck(index,row){
                this.$confirm('请再次确认是否使得该留言所有人可见?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '留言已发布'
                    });
                    this.commentsData.splice(index, 1);
                    utils.request({
                        invoke: utils.api.auditComment,
                        params:{
                            commentId:row.id,
                            auditOption:1
                        }
                    }).then(res=>{
                        console.log(res);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '取消操作'
                    });
                });
            }
        }
    }
</script>