<template>
    <div id="table">

        <!--添加按钮-->
        <el-row>
            <el-col :span="24">
                <div class="table-grid-address">
                    <el-button
                            type="primary"
                            @click="addRow()"
                    >+ 添加场馆</el-button>
                </div>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <div class="Table-table">
            <el-table
                    id="table"
                    :data="stadiumData"
                    ref="stadiumData"
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
                        prop="name"
                        label="场馆名称"
                        width="200"
                        sortable>
                </el-table-column>

                <el-table-column
                        prop="location"
                        label="场馆地址"
                        width="250"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="siteDetails"
                        label="场馆详情"
                        width="120">
                    <template scope="props">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="checkSiteDetails(props.$index,props.row)">查看
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="opp"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index,scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--详情窗口-->
        <el-dialog
                title="场馆详情"
                :visible.sync="detailsFormVisible">
            <el-table
                    id="detailTable"
                    :data="siteData"
                    ref="siteData">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="场地名称"
                    width="80">
                </el-table-column>
                <el-table-column
                        prop="rent"
                        label="租金(/小时)"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="location"
                        label="场地位置"
                        width="150">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="场地描述"
                    width="140">
                </el-table-column>
                <el-table-column
                        prop="opp"
                        label="操作">
                    <template slot-scope="props">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDeleteSite(props.$index,props.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-button
                        type="primary"
                        @click="addDetailRow()"
                >+ 添加场地</el-button>
                <el-button @click="cancel()">确认</el-button>
            </div>
        </el-dialog>

        <!-- 编辑场馆窗口 -->
        <el-dialog
                title="编辑场馆信息"
                :visible.sync="editFormVisible">
            <el-form
                    :model="editForm"
                    ref="editForm">
                <el-form-item
                        label="场馆名称"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="editForm.name"
                            autocomplete="off">
                    </el-input>
                </el-form-item>


                <el-form-item
                        label="场馆地址"
                        :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            v-model="editForm.location"
                            autocomplete="off">
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

        <!-- 添加场馆窗口 -->
        <el-dialog
                title="添加场馆"
                :visible.sync="addFormVisible">
            <el-form
                    :model="addForm"
                    ref="addForm">
                <el-form-item
                        label="场馆名称"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="addForm.name"
                            placeholder="请输入场馆名称"
                            autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item
                        label="场馆地址"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="addForm.location"
                            type="textarea"
                            placeholder="请输入场馆地址"
                            autocomplete="off">
                    </el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="cancel()">取消</el-button>
                <el-button
                        type="primary"
                        @click="submitAddRow()"
                        :loading="addLoading"
                >确定</el-button>
            </div>
        </el-dialog>

        <!-- 添加场地窗口 -->
        <el-dialog
                title="添加场地"
                :visible.sync="detailsAddFormVisible">
            <el-form
                    :model="detailsAddForm"
                    ref="detailsAddForm">
                <el-form-item
                        label="场地名称"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="detailsAddForm.name"
                            placeholder="请输入场地名称"
                            autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item
                        label="场地租金"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="detailsAddForm.rent"
                            placeholder="请输入场地每小时租金"
                            autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item
                        label="场地位置"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="detailsAddForm.location"
                            placeholder="请输入场地位置"
                            autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item
                        label="场地描述"
                        :label-width="formLabelWidth">
                    <el-input
                            v-model="detailsAddForm.description"
                            type="textarea"
                            placeholder="请简要描述该场地"
                            autocomplete="off">
                    </el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="cancel()">取消</el-button>
                <el-button
                        type="primary"
                        @click="submitAddDetailRow()"
                        :loading="addLoading"
                >确定</el-button>
            </div>
        </el-dialog>

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

    var _index; //定义一个全局变量，以获取行数据的行号
    var tmpRow;
    export default {
        data() {
            return {
                formLabelWidth: '120px',

                //场馆和场地数组及其分类
                checked: true,
                stadiumData: [],
                tempStadiumData:[],//使用其得到stadium的Id
                siteData:[],

                //是否显示编辑场馆窗口
                detailsForm:[],
                detailsFormVisible:false,//是否显示场馆详情窗口,
                editFormVisible: false,
                editForm: [],
                addFormVisible: false,//是否显示新增场馆窗口

                addForm: [],
                detailsAddFormVisible:false,//是否显示新增场地窗口
                detailsAddForm:[],

                //分页值
                activeIndex: '1',
                totalNum: 0,
                pageSize: 10,
                currentPage:1,
                addLoading: false,
                //日期
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
            }
        },
        mounted(){
          this.loadStadiumData(this.currentPage);
        },
        methods: {
            //分页处理
            handleCurrentChange() {
                this.loadStadiumData(this.currentPage);
            },
            //获取场馆数据
            loadStadiumData(current) {
                utils.request({
                    invoke: utils.api.getStadium,
                    params: {
                        pageNum:current,
                        pageSize:this.pageSize,
                    }
                }).then(res=>{
                    console.log(res);
                    this.stadiumData=res.data;
                    this.totalNum = res.total;
                })
            },
            //每个场馆根据场地获取场地数据
            loadSiteData(row){
                utils.request({
                    invoke: utils.api.getTotalsite,
                    params: {
                        id:row.id,
                        pageNum:this.currentPage,
                        pageSize:this.pageSize,
                    }
                }).then(res=>{
                    console.log(res);
                    this.siteData=res.data;
                })
            },
            //编辑场馆数据
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                tmpRow=row;
                _index = index;
                console.log(index, row);
                console.log(_index, row);
                //取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
            },
            //保存场馆数据的编辑
            submitEditRow() {
                let editData = _index;
                if(this.editForm.name===''||this.editForm.location===''){
                    this.$message.error('修改后的内容每一项都不准为空')
                }
                else{
                    this.stadiumData[editData].name= this.editForm.name;
                    this.stadiumData[editData].location= this.editForm.location;
                    utils.request({
                        invoke: utils.api.updateStadium,
                        params:{
                            id:tmpRow.id,
                            name:this.editForm.name,
                            location:this.editForm.location,
                            image:null
                        }
                    }).then(res =>{
                        this.$message.success('场馆信息修改成功');
                        this.editFormVisible = false;
                        console.log(_index);
                        this.loadStadiumData(this.currentPage);
                    }).catch(res=>{
                        this.$message.error('场馆信息修改失败');
                    })
                }
            },

            //新增场馆数据
            addRow() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    location: '',
                }
            },
            //将新增的场馆数据添加到表格中
            submitAddRow() {
                if(this.addForm.name===''||this.addForm.location===''){
                    this.$message.error('新增的内容每一项都不准为空');
                }
                else{
                    this.stadiumData = this.stadiumData || []
                    this.stadiumData.push({
                        name: this.addForm.name,
                        location: this.addForm.location,
                     });
                    utils.request({
                        invoke: utils.api.createStadium,
                        params:{
                            name: this.addForm.name,
                            location: this.addForm.location,
                            image:null,
                        }
                    }).then(res =>{
                        console.log(res);
                        this.addFormVisible = false;
                        this.loadStadiumData(this.currentPage);
                    })
                }
            },

            //新增场地数据
            addDetailRow(){
                this.detailsAddFormVisible=true;
                this.detailsAddForm = {
                    name:'',
                    rent:'',
                    location:'',
                    description:'',
                }
            },
            //将新增的场地数据加到表格中
            submitAddDetailRow(){
                if(this.detailsAddForm.name===''||this.detailsAddForm.location===''||
                    this.detailsAddForm.rent===''||this.detailsAddForm.description===''){
                    this.$message.error('新增的内容每一项都不准为空');
                }
                else{
                    this.siteData = this.siteData||[];
                    this.siteData.push({
                        name:this.detailsAddForm.name,
                        rent:this.detailsAddForm.rent,
                        location:this.detailsAddForm.location,
                        description:this.detailsAddForm.description,
                        image:null,
                    });
                    utils.request({
                        invoke: utils.api.createSite,
                        params:{
                            stadiumId:this.tmpRow.id,
                            name: this.detailsAddForm.name,
                            rent: this.detailsAddForm.rent,
                            location: this.detailsAddForm.location,
                            description:this.detailsAddForm.description,
                            image:null,
                        }
                    }).then(res =>{
                        console.log(res);
                        this.detailsAddFormVisible = false;
                    })
                }
            },

            cancel() {
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.detailsFormVisible=false;
                this.detailsAddFormVisible=false;
            },
            //删除场馆数据
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该场馆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.stadiumData.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                    });
                    utils.request({
                        invoke: utils.api.deleteStadium,
                        params:{
                            id: row.id,
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
            //删除场地数据
            handleDeleteSite(index,row){
                this.$confirm('此操作将永久删除该场地, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$message({
                        type: 'success',
                        message: '删除成功',
                    });
                    this.siteData.splice(index, 1);
                    utils.request({
                        invoke: utils.api.deleteSiteById,
                        params:{
                            id: row.id,
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

            //查看详情
            checkSiteDetails(index,row){
                this.detailsFormVisible=true;
                this.loadSiteData(row);
                this.detailsForm=this.siteData;
                this.tmpRow=row;
            }
        },
    }
</script>

<style>
    .table-grid-address {
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
</style>
