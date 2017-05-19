<template>
    <div style="padding:25px;height:700px">
        <el-row>
            <el-col :span="24" style="text-align:center;padding-bottom: 25px;">
                <span class="requestFormTitle">{{query.label.formTitle}}</span>
            </el-col>
        </el-row>
        <div class="boxdiv">
            <el-form ref="form" :model="query" label-width="100px">
                <el-row>
                    <el-col :span="12" style="text-align:left;">
                        <el-form-item :label="query.label.requestId">
                            <el-input v-model="query.criteria.requestId" style="width:200px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="text-align:left;">
                        <el-form-item :label="query.label.workCategory">
                            <el-select v-model="query.criteria.workCategory" style="width:200px;">
                                <el-option v-for="workcategory in query.datasource.workCategory" :label="workcategory.name" :value="workcategory.name" :key="workcategory.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" style="text-align:left;">
                        <el-form-item :label="query.label.company">
                            <el-select :disabled="!isAdmin" filterable v-model="query.criteria.company" v-on:change="handleCompanyChange" style="width:200px;">
                                <el-option v-for="company in query.datasource.companySource" :label="company.name" :value="company.name" :key="company.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="text-align:left;">
                        <el-form-item :label="query.label.requester">
                            <el-select filterable v-model="query.criteria.requester" style="width:200px;">
                                <el-option v-for="req in query.datasource.companyAdmin" :label="req.name" :value="req.name" :key="req.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" style="text-align:left;">
                        <el-form-item :label="query.label.creationtime">
                            <el-date-picker v-model="query.criteria.creationtime" type="daterange" placeholder="选择日期范围">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="text-align:left;">
                        <el-form-item :label="query.label.returntime">
                            <el-date-picker v-model="query.criteria.returntime" type="daterange" placeholder="选择实际返回日期范围">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item :label="query.label.workers">
                    <el-select filterable multiple v-model="query.criteria.workers" style="width:100%">
                        <el-option v-for="workers in query.datasource.companyEmployee" :label="workers.name" :value="workers.name" :key="workers.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="textAlignRight" style="margin-bottom:0;">
                    <el-button type="primary" @click="queryWorkForm">按所选条件查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-tabs v-model="activeTabName">
             <el-tab-pane  label="表格统计" name="summaryTableTab">
                    <el-table :data="summaryTable" border style="width:100%">
                        <el-table-column prop="company" label="派工单位" label-class-name="forcastHeader" width="150">
                        </el-table-column>
                        <el-table-column prop="workhourNum" label="工作总量" label-class-name="forcastHeader" width="100">
                        </el-table-column>
                        <el-table-column prop="requestNum"  label="工单数量" label-class-name="forcastHeader" width="100">
                        </el-table-column>
                        <el-table-column  prop="wageNum" label="工钱总额" label-class-name="forcastHeader" width="100">
                        </el-table-column>
                        <el-table-column  prop="worker" label="作业人员" label-class-name="forcastHeader">
                        </el-table-column>
                    </el-table>
             </el-tab-pane>
            <el-tab-pane label="综合统计" name="summaryTab">
                 <el-form ref="form" :model="summary" label-width="100px">
                    <el-row>
                        <el-col :span="8" style="text-align:left;">
                            <el-form-item label="派工单位:">
                                <label>{{summary.company}}</label>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8" style="text-align:left;">
                            <el-form-item label="工作总量:">
                               <label>{{summary.workhourNum}}</label>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" style="text-align:left;">
                            <el-form-item label="工单数量:">
                                <label>{{summary.requestNum}}</label>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="text-align:left;">
                            <el-form-item label="工钱总额:">
                               <label>{{summary.wageNum}}</label>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" style="text-align:left;">
                            <el-form-item label="派工日期:">
                               <label>{{summary.creationtime}}</label>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16" style="text-align:left;">
                            <el-form-item label="完工日期:">
                                <label>{{summary.returntime}}</label>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align:left;">
                            <el-form-item label="作业人员:">
                               <label>{{summary.worker}}</label>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="详细清单" name="detailTab">
                <div style="height:700px; padding-top:5px;">
                    <el-table :data="WorkFormDataSource" border max-height="650" style="width:100%">
                        <el-table-column prop="requestId" label="工单编号" label-class-name="forcastHeader" width="150">
                        </el-table-column>
                        <el-table-column prop="company" label="派工单位" label-class-name="forcastHeader" width="120">
                        </el-table-column>
                        <el-table-column prop="requester" label="派工人员" label-class-name="forcastHeader" width="100">
                        </el-table-column>
                        <el-table-column prop="creationtime" label="派工时间" label-class-name="forcastHeader" width="150">
                        </el-table-column>
                        <el-table-column prop="returntime" label="返回时间" label-class-name="forcastHeader" width="150">
                        </el-table-column>
                        <el-table-column prop="workCategory" label="工作类别" label-class-name="forcastHeader" width="150">
                        </el-table-column>
                        <el-table-column prop="workitem" label="工作任务" label-class-name="forcastHeader" width="250">
                        </el-table-column>
                        <el-table-column prop="workhour" label="工作数量" label-class-name="forcastHeader" width="100">
                        </el-table-column>
                        <el-table-column prop="requestwage" label="工钱" label-class-name="forcastHeader" width="100">
                        </el-table-column>
                        <el-table-column prop="worker" label="工作人员" label-class-name="forcastHeader" width="100">
                        </el-table-column>
                    </el-table>
                </div>
         </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'QueryWorkHome',
        data: function() {
            return {
                 activeTabName:"detailTab",
                WorkFormDataSource: [],
                fullscreenLoading: false,
                isAdmin: false,
                summaryTable:[],
                summary:{
                    company:'',
                    worker:'',
                    requester:'',
                    workCategory:'',
                    requestNum:'',
                    wageNum:'',
                    workhourNum:'',
                    creationtime:'',
                    returntime:''
                },
                query: {
                    label: {
                        formTitle: "作业人员查询模块",
                        requestId: "派工单号:",
                        company: "派工单位:",
                        creationtime: "派工时间:",
                        workers: "工作人员:",
                        workCategory: "任务类别:",
                        returntime: "实际返回时间:",
                        requester: "派工人员:"
                    },
                    criteria: {
                        requestId: "",
                        company: "",
                        creationtime: "",
                        workers: [],
                        workCategory: "",
                        returntime: "",
                        requester: ""
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
            queryWorkForm: function() {
                var wcriteria = {};
                if (this.query.criteria.requestId !== "") {
                    wcriteria.requestId = this.query.criteria.requestId;
                }
                if (this.query.criteria.company !== "" && this.query.criteria.company !== "All") {
                    wcriteria.company = this.query.criteria.company;
                }
                if (this.query.criteria.requester !== "" && this.query.criteria.requester !== "All") {
                    wcriteria.requester = this.query.criteria.requester;
                }
                if (this.query.criteria.creationtime !== "" && this.query.criteria.creationtime[0] !== null && this.query.criteria.creationtime[1] !== null) {
                    wcriteria.creationtime = this.query.criteria.creationtime;
                    this.summary.creationtime= this.query.criteria.creationtime;
                }else{
                    this.summary.creationtime="";
                }
                if (this.query.criteria.workers.length > 0) {
                    var needworks = true;
                    var workers = this.query.criteria.workers;
                    for (var i = 0; i < workers.length; i++) {
                        if (workers[i] === "All") {
                            needworks = false;
                            break;
                        }
                    }
    
                    if (needworks) {
                        wcriteria.workers = this.query.criteria.workers;
                    }
                }
                if (this.query.criteria.workCategory !== "" && this.query.criteria.workCategory !== "All") {
                    wcriteria.workCategory = this.query.criteria.workCategory;
                }
                if (this.query.criteria.returntime !== "" && this.query.criteria.returntime[0] !== null && this.query.criteria.returntime[1] !== null) {
                    wcriteria.returntime = this.query.criteria.returntime;
                    this.summary.returntime= this.query.criteria.returntime;
                }else{
                    this.summary.returntime= "";
                }
                this.queryData(wcriteria);
    
            },
            queryData: function(wcriteria) {
                var self = this;
                this.$store.state.wcriteria = wcriteria;
                this.$http.post("/queryWorkForm/worker", {
                    data: wcriteria
                }).then(function(res) {
                    self.WorkFormDataSource = res.body;
                    self.updateSummary(res.body);
                })
            },
            updateSummary:function(source){
                 var summary={
                    company:'',
                    worker:'',
                    requester:'',
                    workCategory:'',
                    requestNum:0,
                    wageNum:0,
                    workhourNum:0,
                    returntime: "",
                    requester: ""
                }
                var sumTable={};
                var needupdate=false;
                for(var i=0;i<source.length;i++){
                    needupdate=true;
                    var curCompany=source[i].company;
                    var curObj;

                    if(sumTable[curCompany]){
                        curObj=sumTable[curCompany];
                    }else{
                        curObj={
                            company:source[i].company
                        };
                        if(summary.company===""){
                            summary.company=source[i].company
                        }else{
                             summary.company=summary.company+"," +source[i].company
                        }
                    }

                    var worker=source[i].worker;
                    if(summary.worker.indexOf(worker)<0){
                        if(summary.worker===""){
                            summary.worker=worker
                        }else{
                            summary.worker=summary.worker+"," +worker
                        }
                    }
                    if(curObj.worker){
                        if(curObj.worker.indexOf(worker)<0){
                            if(curObj.worker===""){
                                 curObj.worker=worker
                            }else{
                                curObj.worker=curObj.worker+"," +worker
                              }
                            }
                    }else{
                        curObj.worker=worker
                    }
                    
                    if(summary.requester.indexOf(source[i].requester)<0){
                        if(summary.requester===""){
                            summary.requester=source[i].requester
                        }else{
                             summary.requester=summary.requester+"," +source[i].requester
                        }
                    }
                    if(curObj.requester){
                        if(curObj.requester.indexOf(source[i].requester)<0){
                            if(curObj.requester===""){
                                curObj.requester=source[i].requester
                            }else{
                                curObj.requester=curObj.requester+"," +source[i].requester
                            }
                        }
                    }else{
                        curObj.requester=source[i].requester
                    }


                    if(summary.workCategory.indexOf(source[i].workCategory)<0){
                        if(summary.workCategory===""){
                            summary.workCategory=source[i].workCategory
                        }else{
                             summary.workCategory=summary.workCategory+"," +source[i].workCategory
                        }
                    }
                    if(curObj.workCategory){
                        if(curObj.workCategory.indexOf(source[i].workCategory)<0){
                            if(curObj.workCategory===""){
                                curObj.workCategory=source[i].workCategory
                            }else{
                                curObj.workCategory=curObj.workCategory+"," +source[i].workCategory
                            }
                        }
                    }else{
                        curObj.workCategory=source[i].workCategory;
                    }


                    summary.requestNum++;
                    if(curObj.requestNum){
                        curObj.requestNum++
                    }else{
                        curObj.requestNum=1;
                    }
                    summary.wageNum=summary.wageNum+source[i].requestwage
                    if(curObj.wageNum){
                        curObj.wageNum=curObj.wageNum+source[i].requestwage
                    }else{
                        curObj.wageNum=source[i].requestwage
                    }

                    summary.workhourNum=summary.workhourNum+source[i].workhour
                    if(curObj.workhourNum){
                        curObj.workhourNum=curObj.workhourNum+source[i].workhour
                    }else{
                        curObj.workhourNum=source[i].workhour
                    }
                    sumTable[curCompany]=curObj;
                }
                

                var returntime='';
                if(this.summary.returntime!==''){
                    var date1=new Date(this.summary.returntime[0]);
                    var d1=date1.getFullYear()+"-" + (date1.getMonth()+1)+"-" + date1.getDate()
                    var date2=new Date(this.summary.returntime[1])
                    var d2=date2.getFullYear()+"-" + (date2.getMonth()+1)+"-" + date2.getDate()
                    returntime=d1+ " -- " + d2;
                }
                var creationtime='';
                if(this.summary.creationtime!==''){
                    var date1=new Date(this.summary.creationtime[0]);
                    var d1=date1.getFullYear()+"-" + (date1.getMonth()+1)+"-" + date1.getDate()
                    var date2=new Date(this.summary.creationtime[1])
                    var d2=date2.getFullYear()+"-" + (date2.getMonth()+1)+"-" + date2.getDate()
                    creationtime=d1+ " -- " + d2;
                }
                
                summary.returntime=returntime;
                summary.creationtime=creationtime;
                if(needupdate){
                    this.summary=summary;
                    this.summaryTable=[];
                    for(var key in sumTable){
                        this.summaryTable.push(sumTable[key]);
                    }
                }else{
                    this.summaryTable=[];
                    this.summary={
                        company:'',
                        worker:'',
                        requester:'',
                        workCategory:'',
                        requestNum:'',
                        wageNum:'',
                        workhourNum:'',
                        creationtime:'',
                        returntime:''
                    }
                }
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
                        self.$store.state.curUser.fullname = response.body.fullname;
                        self.$store.state.curUser.isAdmin = response.body.role === "Admin" ? true : false;
                        self.$store.state.curUser.isAdminOffice = response.body.role === "AdminOffice" ? true : false;
                        // if (response.body.role === "Admin" || response.body.role === "AdminOffice") {
                        //     self.$store.state.curUser.isAdmin = true;
                        // } else {
                        //     self.$store.state.curUser.isAdmin = false;
                        // }
                    }
                    if (callback) {
                        callback();
                    }
                })
            },
            toAddAll: function(source) {
                var haveAll = false;
                var newsource = [];
                for (var i = 0; i < source.length; i++) {
                    newsource.push(source[i]);
                    if (source[i].name === "All") {
                        haveAll = true;
                    }
                }
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
                        self.query.datasource.companyEmployee = self.toAddAll(self.$store.state.configdoc["companyEmployee"]["data"]);
                        // self.query.datasource.companyEmployee.push({name:"All",attr:""});
                        // self.request.datasource.workItem = self.$store.state.configdoc["workItem"]["data"];
                        self.query.datasource.workCategory = self.toAddAll(self.$store.state.configdoc["workCategory"]["data"]);
                        //self.toAddAll(self.query.datasource.workCategory);
                        // self.request.datasource.securityTools = self.$store.state.configdoc["securityTools"]["data"];
                        // self.request.datasource.spareParts = self.$store.state.configdoc["spareParts"]["data"];
                        if (self.$store.state.curUser.isAdmin || self.$store.state.curUser.isAdminOffice) {
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
                        this.query.datasource.companyEmployee = self.toAddAll(this.$store.state.configdoc["companyEmployee"]["data"]);
                        // self.query.datasource.companyEmployee.push({name:"All",attr:""});
                        // this.request.datasource.workItem = this.$store.state.configdoc["workItem"]["data"];
                        // self.request.datasource.securityTools = self.$store.state.configdoc["securityTools"]["data"];
                        // self.request.datasource.spareParts = self.$store.state.configdoc["spareParts"]["data"];
                        this.query.datasource.workCategory = self.toAddAll(this.$store.state.configdoc["workCategory"]["data"]);
                        //self.toAddAll(self.query.datasource.workCategory);
                    }
                    if (self.$store.state.curUser.isAdmin || self.$store.state.curUser.isAdminOffice) {
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
            setInitialCriteria: function() {
                var self = this;
                var criteria = {
                    requestId: self.$store.state.wcriteria.requestId ? self.$store.state.wcriteria.requestId : "",
                    company: self.$store.state.wcriteria.company ? self.$store.state.wcriteria.company : "",
                    creationtime: self.$store.state.wcriteria.creationtime ? self.$store.state.wcriteria.creationtime : "",
                    workers: self.$store.state.wcriteria.workers ? self.$store.state.wcriteria.workers : [],
                    workCategory: self.$store.state.wcriteria.workCategory ? self.$store.state.wcriteria.workCategory : "",
                    returntime: self.$store.state.wcriteria.returntime ? self.$store.state.wcriteria.returntime : "",
                    requester: self.$store.state.wcriteria.requester ? self.$store.state.wcriteria.requester : "",
                };
                self.query.criteria = criteria;
                self.queryWorkForm();
            },
            initialRequestData: function() {
                var self = this;
                self.query.criteria.company = self.$store.state.curUser.company
                console.log(self.query.criteria.company);
                self.handleCompanyChange(self.query.criteria.company);
                if (self.$store.state.wcriteria !== "") {
                    self.setInitialCriteria();
                }
    
            },
            handleCompanyChange: function(value) {
                var self = this;
                if (value !== this.query.previousValue.company) {
                    self.updateCompanyEmployee(value);
                    self.updatecompanyAdmin(value);
                    self.query.previousValue.company = value;
                }
            },
            updateCompanyEmployee: function(value) {
                this.query.criteria.workers=[];
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
            updatecompanyAdmin: function(value) {
                this.query.criteria.requester="";
                var source = this.$store.state.configdoc["companyAdmin"]["data"];
                var companyAdminSource = [{
                    name: "All",
                    attr: ""
                }];
                for (var i = 0; i < source.length; i++) {
                    if (source[i].attr === value) {
                        companyAdminSource.push(source[i]);
                    }
                }
                this.$set(this.query.datasource, "companyAdmin", companyAdminSource);
            },
            handleEdit: function(index, row) {
                this.$emit('RightComponentEvent', {
                    data: row,
                    viewName: "WorkFormDetail",
                    class: "animated bounceInRight",
                    menuitems: "WorkFormDetail",
                    action: "Edit",
                    previousView: "QueryWorkForm"
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