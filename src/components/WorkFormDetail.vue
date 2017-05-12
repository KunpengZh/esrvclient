<template>
    <div style="padding:25px;height:700px">
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
                        <el-select :disabled="isEdithModel" filterable v-model="request.data.company">
                            <el-option v-for="company in request.datasource.companySource" :label="company.name" :value="company.name" :key="company.name"></el-option>
                        </el-select>
                    </td>
                    <td width="10%">{{request.label.requester}}</td>
                    <td width="22%">
                        <el-select :disabled="isEdithModel" filterable v-model="request.data.requester">
                            <el-option v-for="requester in request.datasource.companyAdmin" :label="requester.name" :value="requester.name" :key="requester.name"></el-option>
                        </el-select>
                    </td>
                    <td width="10%">{{request.label.creationtime}}</td>
                    <td width="25%">{{request.data.creationtime}}</td>
                </tr>
                <tr>
                    <td>{{request.label.workers}}</td>
                    <td colspan="3" style="text-align: left;">
                        <el-select :disabled="isEdithModel" filterable multiple v-model="request.data.workers" style="width:100%">
                            <el-option v-for="workers in request.datasource.companyEmployee" :label="workers.name" :value="workers.name" :key="workers.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.workhour}}</td>
                    <td>
                        {{request.data.workhour.text}}
                    </td>
                </tr>
                <tr>
                    <td>{{request.label.workCategory}}</td>
                    <td>
                        <el-select :disabled="isEdithModel" v-model="request.data.workCategory">
                            <el-option v-for="workcategory in request.datasource.workCategory" :label="workcategory.name" :value="workcategory.name" :key="workcategory.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.workitem}}</td>
                    <td>
                        <el-select :disabled="isEdithModel" v-model="request.data.workitem">
                            <el-option v-for="workitem in request.datasource.workItem" :label="workitem.name" :value="workitem.name" :key="workitem.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.workersnumber}}</td>
                    <td>{{workersnumber}}</td>
                </tr>
                <tr>
                    <td>{{request.label.worklocation}}</td>
                    <td colspan="3">
                        <el-input :disabled="isWorkFormClosed" v-model="request.data.worklocation" placeholder="请输入工作地点"></el-input>
                    </td>
                    <td>{{request.label.returntime}}</td>
                    <td>
                        <el-date-picker :disabled="isWorkFormClosed || !isEdithModel" @change="calculateWorkHour" v-model="request.data.returntime" format="yyyy-MM-dd HH:mm:ss" align="right" type="datetime" placeholder="选择返回时间">
                        </el-date-picker>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <el-input type="textarea" :disabled="isWorkFormClosed" :rows="2" placeholder="工作主要内容" v-model="request.data.workcomments">
                        </el-input>
                    </td>
                </tr>
            </table>
        </el-form>
        <el-row class="textAlignRight">
            <el-col :span="24">
                <el-button type="primary" @click="showUploadDialog()" v-show="!isWorkFormClosed">上传照片</el-button>
                <el-button type="primary" @click="saveRequest()" v-show="!isWorkFormClosed">保存退出</el-button>
                <el-button type="primary" @click="completeRequestForm()" v-show="isEdithModel && !isWorkFormClosed">完成工单</el-button>
                <el-button type="warning" @click="returnData()" v-show="!isWorkFormClosed">取 消</el-button>
            </el-col>
        </el-row>
        <el-row style="border:1px solid #ccc; margin-top:10px;">
            <el-col :span="8" v-for="doc in workdocuments" :key="doc.key">
                <el-card :body-style="{ padding: '10px' }" style="margin:5px;">
                    <img :src="doc.filename" class="image">
                    <div style="padding: 14px;">
                        <span>{{doc.description}}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ doc.uploadtime }}</time>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div>
            <div class="v-modal" style="z-index: 2000;" v-show="dialogFormVisible"></div>
            <div class="el-dialog__wrapper" style="z-index: 2001;" v-show="dialogFormVisible">
                <div id="uploadDialog" class="el-dialog configDialog" style="padding:25px;">
                    <span slot="title" class="dialog-title dialogtitle">{{uplaodDialogTitle}}</span>
                    <el-row class="uplaodrow">
                        <el-col :span="24">
                            <el-upload class="upload-demo" ref="upload" action="/workformapi/upload" :auto-upload="false" :on-success="onSuccessUpload" :data="uploadParam()">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                <el-button size="small" type="warning" @click="cancelUpload()">取 消</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form>
                            <el-form-item label="输入照片描述">
                                <el-input v-model="picdescription" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WorkFormDetail',
        props: ["options"],
        data() {
            return {
                isWorkFormClosed: false,
                isEdithModel: true,
                dialogFormVisible: false,
                uplaodDialogTitle: "上传现场照片",
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
                    data: this.options.data,
                    datasource: {
                        companySource: [],
                        companyAdmin: [],
                        companyEmployee: [],
                        workItem: [],
                        workCategory: []
                    }
                },
                workdocuments: [],
                picdescription: "",
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                var self = this;
                if (this.request.data.requestStatus === "Closed") {
                    this.isWorkFormClosed = true;
                } else {
                    this.isWorkFormClosed = false;
                }
                if (this.$store.state.configdoc.companySource.length <= 0) {
                    this.loadConfigData(function() {
                        
                        self.request.datasource.companySource = self.$store.state.configdoc["companySource"]["data"];
                        self.request.datasource.companyAdmin = self.$store.state.configdoc["companyAdmin"]["data"];
                        self.request.datasource.companyEmployee = self.$store.state.configdoc["companyEmployee"]["data"];
                        self.request.datasource.workItem = self.$store.state.configdoc["workItem"]["data"];
                        self.request.datasource.workCategory = self.$store.state.configdoc["workCategory"]["data"];
                        self.isEdithModel = true;
                    })
                } else {
                    if (this.request.datasource.companySource.length <= 0) {
                        this.request.datasource.companySource = this.$store.state.configdoc["companySource"]["data"];
                        this.request.datasource.companyAdmin = this.$store.state.configdoc["companyAdmin"]["data"];
                        this.request.datasource.companyEmployee = this.$store.state.configdoc["companyEmployee"]["data"];
                        this.request.datasource.workItem = this.$store.state.configdoc["workItem"]["data"];
                        this.request.datasource.workCategory = this.$store.state.configdoc["workCategory"]["data"];
                    }
                    this.isEdithModel = true;
                }
                this.calculateWorkDocuments(this.request.data.workdocument);
            })
        },
        computed: {
            workersnumber: function() {
                return this.request.data.workers.length;
            },
        },
        methods: {
            showUploadDialog: function() {
                this.dialogFormVisible = true
            },
            completeRequestForm: function() {
                var self = this;
                if (!this.validateRequestForm()) {
                    return;
                }
                if (this.request.data.returntime === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: "请填写返回时间"
                    });
                    return;
                }
                this.request.data.requestStatus = "Closed";
                this.saveRequest();
            },
            calculateWorkHour: function(returntime) {
                if (returntime !== "") {
                    var returntimestamp = Math.floor(Date.parse(new Date(returntime)) / 1000 / 60);
                    var createtimestamp = Math.floor(Date.parse(new Date(this.request.data.creationtime)) / 1000 / 60);
                    if (returntimestamp <= createtimestamp) {
                        this.$notify.error({
                            title: 'Error',
                            message: "返回时间不能早于派工时间:" + this.request.data.creationtime
                        });
                        this.request.data.returntime = "";
                        return;
                    } else {
                        //this.request.data.workhour = Math.ceil((returntimestamp - createtimestamp) / 60);
                        this.request.data.workhour.text = Math.floor((returntimestamp - createtimestamp) / 60) + "小时 " + ((returntimestamp - createtimestamp) % 60) + "分钟";
                        this.request.data.workhour.minutes = returntimestamp - createtimestamp;
                    }
                }
            },
            saveRequest: function() {
                var self = this;
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
                        this.returnData(res.body);
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: res.body
                        });
                        return;
                    }
                });
            },
            returnData: function(data) {
                this.$emit('RightComponentEvent', {
                    data: data,
                    viewName: "WorkForm",
                    class: "animated bounceInLeft",
                    menuitems: "WorkForm"
                });
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
            switchView: function() {
                this.returnData();
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
                var returntime = this.request.data.returntime;
                if (returntime !== "") {
                    var returntimestamp = Date.parse(new Date(returntime)) / 1000 / 60;
                    var createtimestamp = Date.parse(new Date(this.request.data.creationtime)) / 1000 / 60;
                    if (returntimestamp <= createtimestamp) {
                        this.$notify.error({
                            title: 'Error',
                            message: "返回时间不能早于派工时间"
                        });
                        return false;
                    }
                }
                return true;
            },
            onSuccessUpload: function(res) {
                this.$refs.upload.uploadFiles = [];
                if (res.message) {
                    this.$notify.error({
                        title: 'Error',
                        message: res.message
                    });
                } else if (res.length > 0) {
                    if (res[0]["workdocument"]) {
                        this.request.data.workdocument = res[0]["workdocument"];
                        // this.$set(this.request.data, "workdocument", res[0]["workdocument"]);
                        this.calculateWorkDocuments(this.request.data.workdocument);
                    }
                }
            },
            calculateWorkDocuments: function(source) {
                if (!typeof source === 'Object') {
                    console.log("only Array allowed for Work documents")
                    return;
                }
                var newWorkdocuments = [];
                for (var i = 0; i < source.length; i++) {
                    var filename = source[i].filename.replace("public", "");
                    var doc = {
                        key: i,
                        filename: filename,
                        uploadtime: source[i].uploadtime,
                        description: source[i].description
                    };
                    newWorkdocuments.push(doc);
                }
                //console.log(newWorkdocuments);
                //this.$set(this.workdocuments,'workdocuments', newWorkdocuments);
                this.workdocuments = newWorkdocuments;
            },
            cancelUpload: function() {
                this.dialogFormVisible = false;
                this.picdescription = "";
            },
            submitUpload: function() {
                var uploadFiles = this.$refs.upload.uploadFiles;
                if (uploadFiles.length > 1) {
                    this.$notify.error({
                        title: 'Error',
                        message: "每次只能上传一个文件"
                    });
                    return;
                }
                this.$refs.upload.submit();
            },
            uploadParam: function() {
                if (!this.request.data.workdocument) {
                    this.request.data.workdocument = [];
                }
                return {
                    requestId: this.request.data.requestId,
                    description: this.picdescription
                }
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
    
    .uplaodrow {
        margin-top: 50px;
    }
    
    #uploadDialog {
        top: 15%;
        width: 600px;
        height: 450px;
        padding-top: 40px;
    }
    
    .dialogtitle {
        font-size: 24px;
        font-weight: bolder;
        margin-bottom: 20px;
        width: 500px;
    }
    
    .forcastHeader {
        font-size: 14px;
        font-weight: normal;
    }
    
    .time {
        font-size: 13px;
        color: #999;
    }
    
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    
    .button {
        padding: 0;
        float: right;
    }
    
    .image {
        width: 100%;
        display: block;
    }
    
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
</style>