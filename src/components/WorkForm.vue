<template>
    <div>
        <div style="height:700px; padding:20px;">
            <el-table :data="WorkFormDataSource" border style="width: 100%" max-height="650">
                <el-table-column prop="requestId" label="工单编号" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column prop="company" label="派工单位" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column prop="requester" label="派工人员" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column prop="creationtime" label="派工时间" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column prop="returntime" label="返回时间" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column prop="workitem" label="工作任务" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                                                 <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
</template>
                </el-table-column>
            </el-table>
        </div>
  <div>
    <div class="v-modal" style="z-index: 2000;" v-show="dialogFormVisible"></div>
    <div class="el-dialog__wrapper" style="z-index: 2001;" v-show="dialogFormVisible">
      <div id="formdialog" class="el-dialog" style="padding:25px; padding-top:40px;">
        <el-row>
            <el-col :span="24" style="text-align:center;padding-bottom: 5px;">
                <span class="requestFormTitle">{{request.label.formTitle}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="text-align:right;padding: 10px;">
                <span>{{request.label.requestId}}</span>
                <span>{{request.data.requestId}}</span>
            </el-col>
        </el-row>
        <el-form :model="request">
            <table class="bordered" width="100%">
            <tr>
                <td width="10%">{{request.label.company}}</td>
                <td width="23%">
                    <el-select  filterable v-model="request.data.company" v-on:change="handleCompanyChange">
                        <el-option v-for="company in request.datasource.companySource" :label="company.name" :value="company.name" :key="company.name"></el-option>
                    </el-select>
                </td>
                <td width="10%">{{request.label.requester}}</td>
                <td width="22%">
                    <el-select  filterable v-model="request.data.requester" >
                        <el-option v-for="requester in request.datasource.companyAdmin" :label="requester.name" :value="requester.name" :key="requester.name"></el-option>
                    </el-select>
                </td>
                <td width="10%">{{request.label.creationtime}}</td>
                <td width="25%">{{request.data.creationtime}}</td>
            </tr>
            <tr>
                <td>{{request.label.workers}}</td>
                <td colspan="3" style="text-align: left;">
                    <el-select  filterable multiple v-model="request.data.workers" style="width:100%" >
                        <el-option v-for="workers in request.datasource.companyEmployee" :label="workers.name" :value="workers.name" :key="workers.name"></el-option>
                    </el-select>
                </td>
                <td>{{request.label.workhour}}</td>
                <td >
                    {{request.data.workhour.text}}
                </td>
            </tr>
            <tr>
                <td>{{request.label.workCategory}}</td>
                 <td>
                    <el-select  v-model="request.data.workCategory" v-on:change="handleWorkCategoryChange">
                        <el-option v-for="workcategory in request.datasource.workCategory" :label="workcategory.name" :value="workcategory.name" :key="workcategory.name"></el-option>
                    </el-select>
                </td>
                <td>{{request.label.workitem}}</td>
                 <td>
                    <el-select  v-model="request.data.workitem">
                        <el-option v-for="workitem in request.datasource.workItem" :label="workitem.name" :value="workitem.name" :key="workitem.name"></el-option>
                    </el-select>
                </td>
                <td>{{request.label.workersnumber}}</td>
                <td>{{workersnumber}}</td>
            </tr>
            <tr>
                <td>{{request.label.worklocation}}</td>
                <td colspan="3">
                    <el-input  v-model="request.data.worklocation" placeholder="请输入工作地点"></el-input>
                </td>
                <td>{{request.label.returntime}}</td>
                <td>
                <el-date-picker :disabled="true"  v-model="request.data.returntime" format="yyyy-MM-dd HH:mm:ss" align="right" type="datetime" placeholder="选择返回时间">
                </el-date-picker>
                </td>
            </tr>
            <tr>
            <td colspan="6">
            <el-input type="textarea"  :rows="2" placeholder="工作主要内容" v-model="request.data.workcomments">
            </el-input>
            </td>
            </tr>
            </table>
            </el-form>
        <div slot="footer" class="dialog-footer textAlignRight">
          <el-button type="primary" @click="saveAndCreateNew()" >保存并创建新单</el-button>
          <el-button type="primary" @click="saveRequestForm()">保存退出</el-button>
          <el-button type="warning" @click="cancel()">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: 'WorkForm',
        props: ["options"],
        data() {
            return {
                WorkFormDataSource: [],
                dialogFormVisible: false,
                request: {
                    label: {
                        formTitle: "献县供服公司工作派工单",
                        requestId: "编号:",
                        company: "派工单位",
                        requester: "派工人员",
                        creationtime: "派工时间",
                        workitem: "工作任务",
                        workCategory: "任务类别",
                        worklocation: "工作地点",
                        workers: "作业人员",
                        workersnumber: "工作人数",
                        workhour: "工时",
                        returntime: "返回时间"
                    },
                    data: {
                        requestId: "",
                        company: "",
                        requester: "",
                        creationtime: "",
                        workitem: "",
                        workCategory: "",
                        worklocation: "",
                        workers: [],
                        workersnumber: "",
                        workhour: {
                            text: "",
                            minutes: 0
                        },
                        returntime: "",
                        workcomments: "",
                        workdocument: [],
                        requestStatus: "New",
                    },
                    datasource: {
                        companySource: [],
                        companyAdmin: [],
                        companyEmployee: [],
                        workItem: [],
                        workCategory: []
                    },
                    previousValue: {
                        company: "",
                        workCategory: "",
                    }
                }
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.$http.get("/workformapi/getr").then(function(res) {
                    this.WorkFormDataSource = res.body;
                })
            })
        },
        computed: {
            workersnumber: function() {
                return this.request.data.workers.length;
            }
        },
        methods: {
            handleCompanyChange: function(value) {
                if (value !== this.request.previousValue.company) {
                    this.request.data.requester = "";
                    this.request.data.workers = [];
                    this.updateCompanyAdmin(value);
                    this.updateCompanyEmployee(value);
                    this.request.previousValue.company = value;
                }
            },
            updateCompanyAdmin: function(value) {
                var source = this.$store.state.configdoc["companyAdmin"]["data"];
                var companyAdminSource = [];
                for (var i = 0; i < source.length; i++) {
                    if (source[i].attr === value) {
                        companyAdminSource.push(source[i]);
                    }
                }
                this.$set(this.request.datasource, "companyAdmin", companyAdminSource);
            },
            updateCompanyEmployee: function(value) {
                var source = this.$store.state.configdoc["companyEmployee"]["data"];
                var companyEmployeeSource = [];
                for (var i = 0; i < source.length; i++) {
                    if (source[i].attr === value) {
                        companyEmployeeSource.push(source[i]);
                    }
                }
                this.$set(this.request.datasource, "companyEmployee", companyEmployeeSource);
            },
            handleWorkCategoryChange: function(value) {
                if (value !== this.request.previousValue.workCategory) {
                    this.request.data.workitem = "";
                    this.updateWorkItems(value);
                    this.request.previousValue.workCategory = value;
                }
            },
            updateWorkItems: function(value) {
                var source = this.$store.state.configdoc["workItem"]["data"];
                var workItemSource = [];
                for (var i = 0; i < source.length; i++) {
                    if (source[i].workCategory === value) {
                        workItemSource.push(source[i]);
                    }
                }
                this.$set(this.request.datasource, "workItem", workItemSource);
            },
            handleEdit: function(index, row) {
                this.$emit('RightComponentEvent', {
                    data: row,
                    viewName: "WorkFormDetail",
                    class: "animated bounceInRight",
                    menuitems: "WorkFormDetail"
                });
            },
            saveAndCreateNew: function(index, row) {
                var self = this;
                this.saveRequest(function() {
                    self.restoreRequestStatus();
                    self.$http.get('/workformapi/requestid').then(function(res) {
                        var strbody = res.body;
                        if (!strbody.requestId || !strbody.strtime) {
                            this.$notify.error({
                                title: 'Error',
                                message: "未能从服务器取得派工单编号"
                            });
                            return;
                        }
                        self.request.data.creationtime = strbody.strtime;
                        self.request.data.requestId = strbody.requestId;
                    })
                })
            },
            saveRequestForm: function() {
                var self = this;
                this.saveRequest(function() {
                    self.cancel();
                })
            },
            saveRequest: function(callback) {
                this.request.data.workersnumber = this.workersnumber;
                if (!this.validateRequestForm()) {
                    return;
                }
                this.$http.post("/workformapi/save", {
                    data: this.request.data
                }).then(function(res) {
                    if (res.status === 200 && res.body.requestId) {
                        this.$notify.info({
                            title: '保存成功',
                            message: "保存成功"
                        });
                        var tsource = this.WorkFormDataSource;
                        tsource.push(res.body);
                        this.$set(this.WorkFormDataSource, tsource);
                        if (callback) {
                            callback();
                        }
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: res.body
                        });
                        return;
                    }
                });
            },
            restoreRequestStatus: function() {
                for (let key in this.request.data) {
                    this.request.data[key] = '';
                }
                this.request.data.requestStatus = "New";
                this.request.data.workhour = {
                    text: "",
                    minutes: 0
                }
                this.request.datasource.companyAdmin = [];
                this.request.datasource.companyEmployee = [];
                this.request.datasource.workItem=[];
            },
            cancel: function() {
                this.dialogFormVisible = false;
                this.restoreRequestStatus();
            },
            switchView: function() {
                this.handleCreate();
            },
            handleCreate: function() {
                var self = this;
                if (this.$store.state.configdoc.companySource.length <= 0) {
                    this.loadConfigData(function() {
                        self.$http.get('/workformapi/requestid').then(function(res) {
                            var strbody = res.body;
                            if (!strbody.requestId || !strbody.strtime) {
                                this.$notify.error({
                                    title: 'Error',
                                    message: "未能从服务器取得派工单编号"
                                });
                                return;
                            }
                            self.request.data.creationtime = strbody.strtime;
                            self.request.data.requestId = strbody.requestId;
                            self.dialogFormVisible = true;
                        })
                    })
                } else {
                    if (this.request.datasource.companySource.length <= 0) {
                        this.request.datasource.companySource = this.$store.state.configdoc["companySource"]["data"];
                        //this.request.datasource.companyAdmin = this.$store.state.configdoc["companyAdmin"]["data"];
                        //this.request.datasource.companyEmployee = this.$store.state.configdoc["companyEmployee"]["data"];
                        //this.request.datasource.workItem = this.$store.state.configdoc["workItem"]["data"];
                        this.request.datasource.workCategory = this.$store.state.configdoc["workCategory"]["data"];
                    }
                    self.$http.get('/workformapi/requestid').then(function(res) {
                        var strbody = res.body;
                        if (!strbody.requestId || !strbody.strtime) {
                            this.$notify.error({
                                title: 'Error',
                                message: "未能从服务器取得派工单编号"
                            });
                            return;
                        }
                        self.request.data.creationtime = strbody.strtime;
                        self.request.data.requestId = strbody.requestId;
                        self.dialogFormVisible = true;
                    })
                }
            },
            loadConfigData: function(callback) {
                this.$http.get('/esrvapi/getallconfigdoc').then(function(res) {
                    var docList = res.body;
                    for (var i = 0; i < docList.length; i++) {
                        var key = docList[i].category;
                        this.$store.state.configdoc[key] = docList[i]
                    }
                    this.request.datasource.companySource = this.$store.state.configdoc["companySource"]["data"];
                    //this.request.datasource.companyAdmin = this.$store.state.configdoc["companyAdmin"]["data"];
                    //this.request.datasource.companyEmployee = this.$store.state.configdoc["companyEmployee"]["data"];
                    //this.request.datasource.workItem = this.$store.state.configdoc["workItem"]["data"];
                    this.request.datasource.workCategory = this.$store.state.configdoc["workCategory"]["data"];
                    if (callback) {
                        callback();
                    }
                })
            },
            validateRequestForm: function() {
                if (this.request.data.company === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: "派工单位不能为空"
                    });
                    return false;
                }
                if (this.request.data.requester === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: "派工人员不能为空"
                    });
                    return false;
                }
                if (this.request.data.workitem === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: "工作任务不能为空"
                    });
                    return false;
                }
                if (this.request.data.worklocation === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: "工作地点不能为空"
                    });
                    return false;
                }
                if (this.request.data.workers.length <= 0) {
                    this.$notify.error({
                        title: 'Error',
                        message: "作业人员不能为空"
                    });
                    return false;
                }
                if (this.request.data.workCategory==="") {
                    this.$notify.error({
                        title: 'Error',
                        message: "任务类别不能为空"
                    });
                    return false;
                }
                // var returntime = this.request.data.returntime;
                // if (returntime !== "") {
                //     var returntimestamp = Date.parse(new Date(returntime)) / 1000 / 60;
                //     var createtimestamp = Date.parse(new Date(this.request.data.creationtime)) / 1000 / 60;
                //     if (returntimestamp <= createtimestamp) {
                //         this.$notify.error({
                //             title: 'Error',
                //             message: "返回时间不能早于派工时间"
                //         });
                //         return false;
                //     }
                // }
                return true;
            }
        }
    }
</script>

<style>
    .requestFormTitle {
        font-size: 24px;
        font-weight: bolder;
        margin-bottom: 20px;
        width: 500px;
    }
    
    .forcastHeader {
        font-size: 14px;
        font-weight: normal;
    }
    
    #formdialog {
        top: 10%;
        width: 950px;
        height: 550px;
    }
    
    
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    
    
    /*the CSS Style for  Table*/
    
    .bordered {
        margin-top: 3px;
        margin-bottom: 15px;
        font-size: 13px;
        border: 1px solid #ccc;
        *border-collapse: collapse;
        /* IE7 and lower */
        border-spacing: 0;
        /*border: solid #ccc 1px;*/
        background-color: #ffffff;
    }
    
    .bordered tr:hover {
        background: #fbf8e9;
        -o-transition: all 0.1s ease-in-out;
        -webkit-transition: all 0.1s ease-in-out;
        -moz-transition: all 0.1s ease-in-out;
        -ms-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;
    }
    
    .bordered td,
    .bordered th {
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }
    
    .bordered td:first-child,
    .bordered th:first-child {
        border-left: none;
    }
    
    
    /*End the CSS Style for Table*/
</style>