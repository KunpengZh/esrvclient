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
                    <el-col :span="16" style="text-align:left;">
                        <el-form-item :label="query.label.company">
                            <el-select :disabled="!isAdmin" filterable multiple v-model="query.criteria.company" style="width:80%">
                                <el-option v-for="company in query.datasource.companySource" :label="company.name" :value="company.name" :key="company.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="text-align:left;">
                        <el-form-item :label="query.label.month">
                            <el-date-picker v-model="query.criteria.month" type="year" placeholder="选择年份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="textAlignRight" style="margin-bottom:0;">
                    <el-button type="primary" @click="queryWorkForm">按所选条件查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-tabs v-model="activeTabName" >
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
                     <el-row class="textAlignRight" style="margin-top:20px;">
                        <el-col :span="24">
                            <el-button type="primary" @click="pringWorkForm()">打印预览</el-button>
                        </el-col>
                     </el-row>
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
                        <el-table-column prop="requestwage" label="总工钱" label-class-name="forcastHeader" width="100">
                        </el-table-column>
                        <el-table-column prop="strworkers" label="工作人员" label-class-name="forcastHeader" width="250">
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
                    company:[],
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
                        formTitle: "年报查询模块",
                        company: "派工单位:",
                        month: "选择年份:"
                    },
                    criteria: {
                        company: [],
                        month:""
                    },
                    datasource: {
                        companySource: [],
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
                var ycriteria = {};
                if (this.query.criteria.company.length>0) {
                    var companySource=this.query.criteria.company;
                    var findAll=false;
                    for(var i=0;i<companySource.length;i++){
                        if(companySource[i]==="All"){
                            findAll=true;
                        }
                    }
                    if(!findAll){
                        ycriteria.company = this.query.criteria.company;
                    }
                } 

                if (this.query.criteria.month !== "") {
                    ycriteria.year = this.query.criteria.month;
                }else{
                    this.$notify.error({
                        title: 'Error',
                        message: "请选择年份"
                    });
                    return;
                }
               
               this.queryData(ycriteria);
    
            },
            queryData: function(mcriteria) {
                var self = this;
                this.$http.post("/queryWorkForm/year", {
                    data: mcriteria
                }).then(function(res) {
                    self.WorkFormDataSource = self.buildRequestData(res.body);
                    self.updateSummary(res.body);
                })
            },
            buildRequestData:function(data){
                for(var k=0;k<data.length;k++){
                    var sworkers = data[k].workers;
                    var workers='';
                    for (var i = 0; i < sworkers.length; i++) {
                        if (i === 0) {
                            workers = sworkers[i];
                        } else {
                            workers = workers+" , " + sworkers[i];
                        }
                    };
                    data[k].strworkers=workers;
                }
                return data;
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

                    var workers=source[i].workers;
                    for(var k=0;k<workers.length;k++){
                        var worker=workers[k];
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
                        //self.query.datasource.companyEmployee = self.toAddAll(self.$store.state.configdoc["companyEmployee"]["data"]);
                        // self.query.datasource.companyEmployee.push({name:"All",attr:""});
                        // self.request.datasource.workItem = self.$store.state.configdoc["workItem"]["data"];
                        //self.query.datasource.workCategory = self.toAddAll(self.$store.state.configdoc["workCategory"]["data"]);
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
                        //this.query.datasource.companyEmployee = self.toAddAll(this.$store.state.configdoc["companyEmployee"]["data"]);
                        // self.query.datasource.companyEmployee.push({name:"All",attr:""});
                        // this.request.datasource.workItem = this.$store.state.configdoc["workItem"]["data"];
                        // self.request.datasource.securityTools = self.$store.state.configdoc["securityTools"]["data"];
                        // self.request.datasource.spareParts = self.$store.state.configdoc["spareParts"]["data"];
                        //this.query.datasource.workCategory = self.toAddAll(this.$store.state.configdoc["workCategory"]["data"]);
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
            initialRequestData: function() {
                var self = this;
                self.query.criteria.company = [self.$store.state.curUser.company]
                
            },
            pringWorkForm:function(){
                if(window.sessionStorage){
                    sessionStorage.setItem("ToPrintAnnuallyReportData",JSON.stringify(this.summaryTable));
                    var path=window.location.protocol+"//"+window.location.host+"/printAnnuallyReport";
                    window.open(path);  
                }else{
                    this.$notify.error({
                        title: 'Error',
                        message: "你的浏览器不支持此功能，请升级"
                    });
                    return;
                } 
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