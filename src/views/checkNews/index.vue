<template>
    <div id="table">

        <!--发布按钮-->
        <el-row>
            <el-col :span="24">
                <div class="table-grid-content">
                    <el-button
                            type="primary"
                            @click="addRow()">+ 发布新闻
                    </el-button>
                </div>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <div class="Table-table">
            <el-table
                    id="table"
                    :data="newsData"
                    ref="newsData"
                    height="600"
                    border
                    element-loading-background = "rgba(0, 0, 0, 0.5)"
                    element-loading-text = "数据正在加载中"
                    element-loading-spinner = "el-icon-loading">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="writer"
                        label="作者"
                        width="100"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="新闻标题"
                        width="150"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="新闻内容"
                        width="240"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="新闻发布时间"
                        width="180"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="opp"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index,scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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

        <!-- 编辑窗口 -->
        <el-dialog
                title="编辑"
                :visible.sync="editFormVisible">
            <el-form
                    :model="editForm"
                    ref="editForm">
                <el-form-item
                        label="新闻作者"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="editForm.writer"
                            autocomplete="off"
                            disabled>
                    </el-input>
                </el-form-item>

                <el-form-item
                        label="新闻标题"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="editForm.title"
                            autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item
                        label="新闻内容"
                        :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            v-model="editForm.content"
                            autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item
                        label="新闻发布时间"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="editForm.createTime"
                            autocomplete="off"
                            disabled>
                    </el-input>
                </el-form-item>

            </el-form>

            <div>
                <el-button @click="cancel()">取消</el-button>
                <el-button
                        type="primary"
                        v-on:click="submitEditRow()"
                        :loading="addLoading"
                >确定</el-button>
            </div>

        </el-dialog>

        <!-- 发布窗口 -->
        <el-dialog
                title="发布"
                :visible.sync="addFormVisible">
            <el-form
                    :model="addForm"
                    ref="addForm">
                <el-form-item
                        label="新闻标题"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="addForm.title"
                            placeholder="请输入新闻标题"
                            autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item
                        label="新闻内容"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="addForm.content"
                            type="textarea"
                            placeholder="请输入新闻内容"
                            autocomplete="off">
                    </el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="mini"
                           @click="cancel()">取消
                </el-button>
                <el-button
                        type="mini"
                        @click="submitAddRow()">确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import  utils from '../../utils'

    let _index; //定义一个全局变量，以获取行数据的行号

    export default {
        data() {
            return {
                //分页参数
                totalNum: 0,
                pageSize: 10,
                currentPage:1,
                pictLoading:true,

                //新闻存储数组
                checked: true,
                newsData: [],
                formLabelWidth: '120px',

                editFormVisible: false,//是否显示编辑窗口
                editForm: [],

                addFormVisible: false,//是否显示新增窗口
                addLoading: false,
                addForm:[],

                //日期选择应大于当前时间
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
            }
        },
        mounted() {
            this.loadData(this.currentPage);
        },
        methods: {
            //分页处理
            handleCurrentChange() {
                this.loadData(this.currentPage);
            },
            //获取新闻数据
            loadData(current){
                utils.request({
                    invoke: utils.api.listNews,
                    params:{
                        pageSize:this.pageSize,
                        pageNum:current
                    }
                }).then(res =>{
                    console.log(res);
                    this.newsData = res.data;
                    this.totalNum = res.total;
                    for(let i=0;i<this.newsData.length;i++){
                        this.newsData[i].createTime=this.newsData[i].createTime.replace("T"," ");
                    }
                })
            },

            //编辑数据
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                _index = index;
                console.log(index);
            },
            //保存编辑
            submitEditRow() {
                let editData = _index;
                if(this.editForm.title===''||this.editForm.content===''){
                    this.$message.error('修改后的内容每一项都不准为空')
                }
                else{
                this.newsData[editData].title = this.editForm.title;
                this.newsData[editData].content = this.editForm.content;
                utils.request({
                    invoke: utils.api.updateNews,
                    params:{
                        id:this.newsData[editData].id,
                        title: this.newsData[editData].title,
                        content: this.newsData[editData].content,
                        image:null
                    }
                }).then(res =>{
                    this.$message.success('新闻修改成功');
                    this.editFormVisible = false;
                    console.log(_index);
                    this.loadData(this.currentPage);
                }).catch(res=>{
                    this.$message.error('新闻修改失败');
                })
                }
            },

            //新增数据
            addRow (){
                this.addFormVisible = true;
                this.addForm={
                    title:'',
                    content:'',
                }
            },
            //将新增的数据添加到表格中
            submitAddRow() {
                if(this.addForm.title===''||this.addForm.content===''){
                    this.$message.error('新增的内容每一项都不准为空');
                }
                else{
                    this.newsData = this.newsData || [];
                    this.newsData.push({
                        title: this.addForm.title,
                        content: this.addForm.content,
                 });
                    utils.request({
                        invoke: utils.api.publishNews,
                        params:{
                            title:this.addForm.title,
                            content:this.addForm.content,
                            image:null,
                        }
                    }).then(res =>{
                        console.log(res);
                        this.addFormVisible = false;
                        this.loadData(this.currentPage)
                    })
                }
            },
            cancel() {
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.loadData();
            },

            //删除新闻
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该条新闻, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.newsData.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                    });
                    utils.request({
                        invoke: utils.api.deleteNews,
                        params:{
                            newsId: row.id,
                        }
                    }).then(res =>{
                        console.log(res);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '取消删除',
                    })
                })
            },
        },
    }
</script>

<style>
    .table-grid-content {
        border-radius: 4px;
        height: 50px;
        background: #ebeef5;
        padding: 10px;
        float: left;
    }

    .Table-table {
        padding: 5px;
    }
    .el-table td {
        padding: 0px;
    }
    .el-table th {
        padding: 0px;
    }
    .page{
        position: fixed;
        bottom: 30px;
        left: 50%;
    }
</style>
