<template>
    <div>
    <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            v-loading = "pictLoading"
            element-loading-background = "rgba(0, 0, 0, 0.5)"
            element-loading-text = "数据正在加载中"
            element-loading-spinner = "el-icon-loading">

        <el-table-column
                prop="username"
                label="姓名"
                width="330">
        </el-table-column>
        <el-table-column
                prop="telephone"
                label="电话"
                width="330">
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        :type="scope.row.type"
                        @click="handleAuthority(scope.$index,scope.row)">
                    <span v-if="scope.row.admin">管理员</span>
                    <span v-else>升级权限</span>
                </el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index,scope.row)">删除用户
                </el-button>
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
                pageSize: 8,
                currentPage:1,
                totalNum:0,
                pictLoading:true,

                //用户数据数组
                tableData: [],
            }
        },
        mounted(){
           this.loadData(this.currentPage);
        },
        methods: {
            //加载用户数据
            loadData(current){
                this.pictLoading=true;
                utils.request({
                    invoke: utils.api.listUser,
                    params:{
                        pageNum:current,
                        pageSize:this.pageSize
                    }
                }).then(res =>{
                    console.log(res);
                    this.tableData = res.data;
                    this.totalNum = res.total;
                }).catch(err=>{
                    console.log(err);
                })
                this.pictLoading=false;
            },
            //分页
            handleCurrentChange() {
                this.loadData(this.currentPage);
            },

            //删除用户
            handleDelete(index,row) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                    });
                    this.tableData.splice(index, 1);
                    utils.request({
                        invoke: utils.api.deleteUser,
                        params:{
                            userId:row.id,
                        }
                    }).then(res=>{
                        console.log(res);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: "取消删除"
                    })
                })
            },
            //修改权限
            handleAuthority(index,row) {
                this.$confirm('此操作将升级用户权限为管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    row.type = 'success';
                    utils.request({
                        invoke: utils.api.changePermission,
                        params:{
                            userId:row.id,
                            permission:1
                        }
                    }).then(res=>{
                        console.log(res);
                        this.$message({
                            type: 'success',
                            message: '升级成功',
                        });
                        this.loadData(this.currentPage);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: "升级失败"
                    })
                })

            }
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