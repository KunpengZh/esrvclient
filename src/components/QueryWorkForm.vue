<template>
    <div style="padding:25px;height:700px">
        <el-row>
            <el-col :span="24" style="text-align:center;padding-bottom: 25px;">
                <span class="requestFormTitle">{{query.label.formTitle}}</span>
            </el-col>
        </el-row>
        <div class="boxdiv">
            <el-form ref="form" :model="query" label-width="150px">
                <el-form-item :label="query.label.requestId">
                    <el-input v-model="query.criteria.requestId" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item :label="query.label.company">
                    <el-select :disabled="!isAdmin" filterable v-model="query.criteria.company" v-on:change="handleCompanyChange">
                        <el-option v-for="company in query.datasource.companySource" :label="company.name" :value="company.name" :key="company.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="query.label.creationtime">
                    <el-date-picker v-model="query.criteria.creationtime" type="daterange" placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="query.label.workers">
                    <el-select filterable multiple v-model="query.criteria.workers" style="width:100%">
                        <el-option v-for="workers in query.datasource.companyEmployee" :label="workers.name" :value="workers.name" :key="workers.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="query.label.workCategory">
                    <el-select v-model="query.criteria.workCategory">
                        <el-option v-for="workcategory in query.datasource.workCategory" :label="workcategory.name" :value="workcategory.name" :key="workcategory.name"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item :label="query.label.returntime">
                    <el-date-picker v-model="query.criteria.returntime" type="daterange" placeholder="选择实际返回日期范围">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <el-row class="textAlignRight">
            <el-col :span="24">
                <el-button type="primary" @click="queryWorkForm">按所选条件查询</el-button>
            </el-col>
            </el-row>
        </div>
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
    </div>
</template>

<script>
    export default {
        name: 'QueryWorkHome',
        data: function() {
            return {
                WorkFormDataSource:[],
                fullscreenLoading: false,
                isAdmin: false,
                query: {
                    label: {
                        formTitle: "综合查询模块:",
                        requestId: "派工单号:",
                        company: "派工单位:",
                        creationtime: "派工时间:",
                        workers: "工作人员:",
                        workCategory: "任务类别:",
                        returntime: "实际返回时间:"
                    },
                    criteria: {
                        requestId: "",
                        company: "",
                        creationtime: "",
                        workers: [],
                        workCategory: "",
                        returntime: ""
                    },
                    datasource: {
                        companySource: [],
                        companyAdmin: [],
                        companyEmployee: [],
                        workItem: [],
                        workCategory: [],
                        securityTools: [],
                        spareParts: []
                    },
                    previousValue: {
                        company: "",
                    }
                }
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                var self = this;
                if (!this.$store.state.curUser.isAuthenticated) {
                    this.getCureUser(this.initialstatus);
                } else {
                    this.initialstatus();
                }
    
            })
        },
        methods: {
            queryWorkForm:function(){
                var qcriteria={};
                if(this.query.criteria.requestId!==""){
                    qcriteria.requestId=this.query.criteria.requestId;
                }
                if(this.query.criteria.company!=="" && this.query.criteria.company!=="All"){
                    qcriteria.company=this.query.criteria.company;
                }
                if(this.query.criteria.creationtime!=="" && this.query.criteria.creationtime[0]!==null && this.query.criteria.creationtime[1]!==null){
                    qcriteria.creationtime=this.query.criteria.creationtime;
                }
                if(this.query.criteria.workers.length>0){
                    var needworks=true;
                    var workers=this.query.criteria.workers;
                    for(var i=0;i<workers.length;i++){
                        if(workers[i]==="All"){
                            needworks=false;
                            break;
                        }
                    }
                    
                    if(needworks){
                        qcriteria.workers=this.query.criteria.workers;
                    }                 
                }
                if(this.query.criteria.workCategory!=="" && this.query.criteria.workCategory!=="All"){
                    qcriteria.workCategory=this.query.criteria.workCategory;
                }
                if(this.query.criteria.returntime!=="" && this.query.criteria.returntime[0]!==null && this.query.criteria.returntime[1]!==null){
                    qcriteria.returntime=this.query.criteria.returntime;
                }

               this.queryData(qcriteria);

            },
            queryData:function(qcriteria){
                var self=this;
                this.$store.state.qcriteria=qcriteria;
                this.$http.post("/queryWorkForm", {data:qcriteria}).then(function(res){
                    self.WorkFormDataSource=res.body;
                })
            },
            getCureUser: function(callback) {
                self.$http.get('/login/isAuthenticated').then(response => {
                    var isAuthenticated = false;
                    if (response.body && response.body.isAuthenticated) {
                        isAuthenticated = response.body.isAuthenticated;
                    }
                    if (isAuthenticated) {
                        self.$store.state.curUser.username = response.body.username;
                        self.$store.state.curUser.isAuthenticated = response.body.isAuthenticated;
                        self.$store.state.curUser.role = response.body.role;
                        self.$store.state.curUser.company = response.body.company;
                        this.$store.state.curUser.fullname = response.body.fullname;
                        if (response.body.role === "Admin") {
                            self.$store.state.curUser.isAdmin = true;
                        } else {
                            self.$store.state.curUser.isAdmin = false;
                        }
                    }
                    if (callback) {
                        callback();
                    }
                })
            },
            toAddAll: function(source) {
                var haveAll = false;
                var newsource=[];
                for(var i=0;i<source.length;i++) {
                    newsource.push(source[i]);
                    if (source[i].name === "All") {
                        haveAll = true;
                    }
                }
                // var haveAll = false;
                // for (var i = 0; i < source.length; i++) {
                //     if (source[i].name === "All") {
                //         haveAll = true;
                //         break;
                //     }
    
                // }
                if (!haveAll) {
                    newsource.push({
                        name: "All",
                        attr: ""
                    });
                }
                return newsource;
            },
            initialstatus: function() {
                var self = this;
                if (this.$store.state.configdoc.companySource.length <= 0) {
                    this.loadConfigData(function() {
                        self.query.datasource.companySource = self.toAddAll(self.$store.state.configdoc["companySource"]["data"]);
                        //self.toAddAll(self.query.datasource.companySource);
                        //self.query.datasource.companySource.push({name:"All",attr:""});
                        // self.request.datasource.companyAdmin = self.$store.state.configdoc["companyAdmin"]["data"];
                        // self.query.datasource.companyEmployee = self.$store.state.configdoc["companyEmployee"]["data"];
                        // self.query.datasource.companyEmployee.push({name:"All",attr:""});
                        // self.request.datasource.workItem = self.$store.state.configdoc["workItem"]["data"];
                        self.query.datasource.workCategory = self.toAddAll(self.$store.state.configdoc["workCategory"]["data"]);
                        //self.toAddAll(self.query.datasource.workCategory);
                        // self.request.datasource.securityTools = self.$store.state.configdoc["securityTools"]["data"];
                        // self.request.datasource.spareParts = self.$store.state.configdoc["spareParts"]["data"];
                        if (self.$store.state.curUser.isAdmin) {
                            self.isAdmin = true;
                        } else {
                            self.isAdmin = false;
                        }
                        self.initialRequestData();
                    })
                } else {
                    if (this.query.datasource.companySource.length <= 0) {
                        this.query.datasource.companySource = self.toAddAll(this.$store.state.configdoc["companySource"]["data"]);
                        //self.toAddAll(self.query.datasource.companySource);
                        // this.request.datasource.companyAdmin = this.$store.state.configdoc["companyAdmin"]["data"];
                        // this.query.datasource.companyEmployee = this.$store.state.configdoc["companyEmployee"]["data"];
                        // self.query.datasource.companyEmployee.push({name:"All",attr:""});
                        // this.request.datasource.workItem = this.$store.state.configdoc["workItem"]["data"];
                        // self.request.datasource.securityTools = self.$store.state.configdoc["securityTools"]["data"];
                        // self.request.datasource.spareParts = self.$store.state.configdoc["spareParts"]["data"];
                        this.query.datasource.workCategory = self.toAddAll(this.$store.state.configdoc["workCategory"]["data"]);
                        //self.toAddAll(self.query.datasource.workCategory);
                    }
                    if (self.$store.state.curUser.isAdmin) {
                        self.isAdmin = true;
                    } else {
                        self.isAdmin = false;
                    }
    
                    self.initialRequestData();
                }
            },
            loadConfigData: function(callback) {
                this.$http.get('/esrvapi/getallconfigdoc').then(function(res) {
                    var docList = res.body;
                    for (var i = 0; i < docList.length; i++) {
                        var key = docList[i].category;
                        this.$store.state.configdoc[key] = docList[i]
                    }
                    if (callback) {
                        callback();
                    }
                })
            },
            setInitialCriteria:function(){
                var self=this;
                var  criteria= {
                            requestId: self.$store.state.qcriteria.requestId?self.$store.state.qcriteria.requestId:"",
                            company: self.$store.state.qcriteria.company?self.$store.state.qcriteria.company:"",
                            creationtime: self.$store.state.qcriteria.creationtime?self.$store.state.qcriteria.creationtime:"",
                            workers: self.$store.state.qcriteria.workers?self.$store.state.qcriteria.workers:[],
                            workCategory: self.$store.state.qcriteria.workCategory?self.$store.state.qcriteria.workCategory:"",
                            returntime: self.$store.state.qcriteria.returntime?self.$store.state.qcriteria.returntime:""
                        };
                     self.query.criteria=criteria;
                     self.queryWorkForm();
            },
            initialRequestData: function() {
                var self = this;
                self.query.criteria.company = self.$store.state.curUser.company
                self.handleCompanyChange(self.query.criteria.company);
                if(self.$store.state.qcriteria!==""){
                    self.setInitialCriteria();
                }
    
            },
            handleCompanyChange: function(value) {
                var self = this;
                if (value !== this.query.previousValue.company) {
                    self.updateCompanyEmployee(value);
                    self.query.previousValue.company = value;
                }
            },
            updateCompanyEmployee: function(value) {
                var source = this.$store.state.configdoc["companyEmployee"]["data"];
                var companyEmployeeSource = [{
                    name: "All",
                    attr: ""
                }];
                for (var i = 0; i < source.length; i++) {
                    if (source[i].attr === value) {
                        companyEmployeeSource.push(source[i]);
                    }
                }
                this.$set(this.query.datasource, "companyEmployee", companyEmployeeSource);
            },
            handleEdit: function(index, row) {
                this.$emit('RightComponentEvent', {
                    data: row,
                    viewName: "WorkFormDetail",
                    class: "animated bounceInRight",
                    menuitems: "WorkFormDetail",
                    action: "Edit",
                    previousView:"QueryWorkForm"
                });
            }
        }
    }
</script>

<style>
    .boxdiv {
        border: solid 1px #DCDCDC;
        padding: 15px;
    }
    
    .querylabel {
        height: 100%;
    }
</style>