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
                        <el-select :disabled="isEdithModel || !isAdmin" filterable v-model="request.data.company" v-on:change="handleCompanyChange">
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
                    <td width="25%">
                        <el-date-picker :disabled="!isEmergency" v-model="request.data.creationtime" format="yyyy-MM-dd HH:mm:ss" align="right" type="datetime">
                        </el-date-picker>
                    </td>
                </tr>
                <tr>
                    <td>{{request.label.chargerName}}</td>
                    <td style="text-align: left;">
                        <el-select :disabled="isEdithModel && !isHistoryRecord" filterable v-model="request.data.chargerName">
                            <el-option v-for="workers in request.datasource.companyChargePerson" :label="workers.name" :value="workers.name" :key="workers.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.workers}}</td>
                    <td style="text-align: left;">
                        <el-select :disabled="isEdithModel" filterable multiple v-model="request.data.workers" style="width:100%">
                            <el-option v-for="workers in request.datasource.companyEmployee" :label="workers.name" :value="workers.name" :key="workers.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.workersnumber}}</td>
                    <td>{{workersnumber}}</td>
                </tr>
                <tr>
                    <td>{{request.label.workCategory}}</td>
                    <td>
                        <el-select :disabled="isEdithModel" v-model="request.data.workCategory" v-on:change="handleWorkCategoryChange">
                            <el-option v-for="workcategory in request.datasource.workCategory" :label="workcategory.name" :value="workcategory.name" :key="workcategory.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.workitem}}</td>
                    <td>
                        <el-select :disabled="isEdithModel" v-model="request.data.workitem">
                            <el-option v-for="workitem in request.datasource.workItem" :label="workitem.name" :value="workitem.name" :key="workitem.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.workhour}}</td>
                    <td>
                        <el-input :disabled="isCreateModel || isWorkFormClosed || (isEdithModel && !isChargePerson)" v-model="request.data.workhour" placeholder="请输入工作小时数" style="width:80%" v-on:change="handleWorkhourInput"></el-input>
                    </td>

                </tr>
                <tr>
                    <td>{{request.label.isSecurityTools}}</td>
                    <td>
                        <template>
                            <el-radio-group v-model="request.data.isSecurityTools" v-on:change="handleSecurityToolsChange">
                                <el-radio :disabled="isEdithModel" class="radio" label="Yes">是</el-radio>
                                <el-radio :disabled="isEdithModel" class="radio" label="No">否</el-radio>
                            </el-radio-group>
                        </template>
                    </td>
                    <td>{{request.label.isSpareParts}}</td>
                    <td>
                        <template>
                            <el-radio-group v-model="request.data.isSpareParts" v-on:change="handleSparePartsChange">
                                <el-radio :disabled="isEdithModel" class="radio" label="Yes">是</el-radio>
                                <el-radio :disabled="isEdithModel" class="radio" label="No">否</el-radio>
                            </el-radio-group>
                        </template>
                    </td>
                    <td>{{request.label.sanPiaoZhiXing}}</td>
                    <td>
                        <template>
                            <el-radio-group v-model="request.data.sanPiaoZhiXing">
                                <el-radio :disabled="isEdithModel" class="radio" label="Yes">是</el-radio>
                                <el-radio :disabled="isEdithModel" class="radio" label="No">否</el-radio>
                            </el-radio-group>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td>{{request.label.securityTools}}</td>
                    <td>
                        <el-select :disabled="isEdithModel || lockSecurityTools" filterable multiple v-model="request.data.securityTools" style="width:100%">
                            <el-option v-for="tool in request.datasource.securityTools" :label="tool.name" :value="tool.name" :key="tool.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.spareParts}}</td>
                    <td>
                        <el-select :disabled="isEdithModel || lockSpareParts" filterable multiple v-model="request.data.spareParts" style="width:100%">
                            <el-option v-for="part in request.datasource.spareParts" :label="part.name" :value="part.name" :key="part.name"></el-option>
                        </el-select>
                    </td>
                    <td>{{request.label.planreturntime}}</td>
                    <td>
                        <el-date-picker :disabled="isEdithModel" v-model="request.data.planreturntime" format="yyyy-MM-dd HH:mm:ss" align="right" type="datetime" placeholder="选择计划返回时间">
                        </el-date-picker>
                    </td>
                </tr>
                <tr>
                    <td>{{request.label.worklocation}}</td>
                    <td colspan="3">
                        <el-input :disabled="isWorkFormClosed || (isEdithModel && !isChargePerson)" v-model="request.data.worklocation" placeholder="请输入工作地点"></el-input>
                    </td>
                    <td>{{request.label.returntime}}</td>
                    <td>
                        <el-date-picker :disabled="isWorkFormClosed || !isEdithModel || (isEdithModel && !isChargePerson)" @change="calculateWorkHour" v-model="request.data.returntime" format="yyyy-MM-dd HH:mm:ss" align="right" type="datetime" placeholder="选择返回时间">
                        </el-date-picker>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <el-input type="textarea" :disabled="isWorkFormClosed || (isEdithModel && !isChargePerson)" :rows="2" placeholder="工作主要内容" v-model="request.data.workcomments">
                        </el-input>
                    </td>
                </tr>
            </table>
        </el-form>
        <el-row class="textAlignRight">
            <el-col :span="24">
                <el-button type="primary" @click="pringWorkForm()">打印预览</el-button>
                <el-button type="primary" @click="saveAndCreateNew()" v-show="isCreateModel">保存并创建新单</el-button>
                <el-button type="primary" @click="showUploadDialog()" v-show="isEdithModel && !isWorkFormClosed && isChargePerson">上传照片</el-button>
                <el-button type="primary" @click="saveRequest()" v-show="isCreateModel || (isEdithModel && !isWorkFormClosed && isChargePerson)">保存退出</el-button>
                <el-button type="primary" @click="completeRequestForm()" v-show="isEdithModel && !isWorkFormClosed && isChargePerson">完成工单</el-button>
                <el-button type="warning" @click="returnData()" v-show="isCreateModel || (isEdithModel && !isWorkFormClosed && isChargePerson)">取 消</el-button>
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
import commonDataSource from '@/components/commondatasources';
export default {
    name: 'WorkFormDetail',
    props: ["options"],
    data() {
        return {
            isEmergency: this.options.isEmergency,
            previousView: this.options.previousView,
            isWorkFormClosed: false,
            isEdithModel: false,
            isChargePerson: true,
            isHistoryRecord: false,
            dialogFormVisible: false,
            action: this.options.action,
            isCreateModel: false,
            isAdmin: false,
            uplaodDialogTitle: "上传现场照片",
            lockSecurityTools: true,
            lockSpareParts: true,
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
                    workhour: "工作数量",
                    returntime: "实际返回时间",
                    planreturntime: "计划返回时间",
                    isSecurityTools: "领取安全工具",
                    isSpareParts: "领取备品备件",
                    securityTools: "安全工具",
                    spareParts: "备品备件",
                    sanPiaoZhiXing: "三票执行",
                    chargerName: "主负责人"
                },
                data: this.options.data,
                datasource: {
                    companySource: [],
                    companyAdmin: [],
                    companyEmployee: [],
                    companyChargePerson: [],
                    workItem: [],
                    workCategory: [],
                    securityTools: [],
                    spareParts: []
                },
                previousValue: {
                    company: "",
                    workCategory: "",
                }
            },
            workdocuments: [],
            picdescription: "",
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
    computed: {
        workersnumber: function() {
            return this.request.data.workers.length;
        },
    },
    methods: {
        initialstatus: function() {
            var self = this;
            if (this.$store.state.configdoc.companySource.length <= 0) {
                this.loadConfigData(function() {
                    self.request.datasource.companySource = self.$store.state.configdoc["companySource"]["data"];
                    // self.request.datasource.companyAdmin = self.$store.state.configdoc["companyAdmin"]["data"];
                    // self.request.datasource.companyEmployee = self.$store.state.configdoc["companyEmployee"]["data"];
                    // self.request.datasource.workItem = self.$store.state.configdoc["workItem"]["data"];
                    self.request.datasource.workCategory = self.$store.state.configdoc["workCategory"]["data"];
                    self.request.datasource.securityTools = self.$store.state.configdoc["securityTools"]["data"];
                    self.request.datasource.spareParts = self.$store.state.configdoc["spareParts"]["data"];
                    self.initialRequestData();
                })
            } else {
                if (this.request.datasource.companySource.length <= 0) {
                    this.request.datasource.companySource = this.$store.state.configdoc["companySource"]["data"];
                    // this.request.datasource.companyAdmin = this.$store.state.configdoc["companyAdmin"]["data"];
                    // this.request.datasource.companyEmployee = this.$store.state.configdoc["companyEmployee"]["data"];
                    // this.request.datasource.workItem = this.$store.state.configdoc["workItem"]["data"];
                    self.request.datasource.securityTools = self.$store.state.configdoc["securityTools"]["data"];
                    self.request.datasource.spareParts = self.$store.state.configdoc["spareParts"]["data"];
                    this.request.datasource.workCategory = this.$store.state.configdoc["workCategory"]["data"];
                }
                self.initialRequestData();
            }
        },
        initialRequestData: function() {
            var self = this;
            if (self.action === "Edit") {
                self.isCreateModel = false;
                self.isEdithModel = true;

                if (!self.request.data.chargerID || self.request.data.chargerID === '') {
                    self.isChargePerson = true;
                    self.isHistoryRecord = true;
                    self.updateCompanyEmployee(self.request.data.company);
                } else if (self.request.data.chargerID !== self.$store.state.curUser.username) {
                    self.isChargePerson = false;
                }

                if (self.$store.state.curUser.isAdminOffice || self.$store.state.curUser.isAdmin || self.$store.state.curUser.isCompanyAdmin) {
                    self.isChargePerson = true;
                }

                if (self.request.data.requestStatus === "Closed") {
                    self.isWorkFormClosed = true;
                } else {
                    self.isWorkFormClosed = false;
                }
                self.calculateWorkDocuments(self.request.data.workdocument);
            } else {
                self.isCreateModel = true;
                self.isWorkFormClosed = false;
                self.isEdithModel = false;
                if (self.$store.state.curUser.isAdminOffice || self.$store.state.curUser.isAdmin || self.$store.state.curUserisCompanyAdmin) {
                    self.isAdmin = true;
                } else {
                    self.isAdmin = false;
                }

                self.request.data.company = self.$store.state.curUser.company;
                self.request.data.requester = self.$store.state.curUser.fullname;
                self.handleCompanyChange(self.request.data.company);
            }

            if (self.isCreateModel) {
                self.$http.get('/workformapi/requestid').then(function(res) {
                    var strbody = res.body;
                    if (!strbody.requestId || !strbody.strtime) {
                        self.$notify.error({
                            title: 'Error',
                            message: "未能从服务器取得派工单编号"
                        });
                        return;
                    }
                    self.request.data.creationtime = strbody.strtime;
                    self.request.data.requestId = strbody.requestId;
                })
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
                    this.$store.state.curUser.fullname = response.body.fullname;
                    self.$store.state.curUser.isAdmin = response.body.role === "Admin" ? true : false;
                    self.$store.state.curUser.isAdminOffice = response.body.role === "AdminOffice" ? true : false;
                    // if (response.body.role === "Admin") {
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
        handleSecurityToolsChange: function(value) {
            if (value === "Yes") {
                this.lockSecurityTools = false;
            } else {
                this.lockSecurityTools = true;
                this.request.data.securityTools = [];
            }
        },
        handleSparePartsChange: function(value) {
            if (value === "Yes") {
                this.lockSpareParts = false;
            } else {
                this.lockSpareParts = true;
                this.request.data.spareParts = [];
            }
        },
        handleWorkhourInput: function(value) {
            if (isNaN(value)) {
                this.$notify.error({
                    title: 'Error',
                    message: "只能输入数字"
                });
            }
        },
        handleCompanyChange: function(value) {
            var self = this;
            if (value !== this.request.previousValue.company) {
                //this.request.data.requester = "";
                //self.request.data.requester = self.$store.state.curUser.fullname;
                self.$set(self.request.data, "requester", self.$store.state.curUser.fullname);
                //self.request.data.workers = [];
                self.$set(self.request.data, "workers", []);
                //self.request.data.chargerName = '';
                self.$set(self.request.data, "chargerName", '');
                self.updateCompanyAdmin(value);
                self.updateCompanyEmployee(value);
                self.updateCompanyChargePerson(value);
                self.request.previousValue.company = value;
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
        updateCompanyChargePerson: function(value) {
            var source = this.$store.state.configdoc["companyEmployee"]["data"];
            var companyChargePersonSource = [];
            for (var i = 0; i < source.length; i++) {
                if (source[i].attr === value && source[i].isCharger === "Yes") {
                    companyChargePersonSource.push(source[i]);
                }
            }
            this.$set(this.request.datasource, "companyChargePerson", companyChargePersonSource);
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
        showUploadDialog: function() {
            this.dialogFormVisible = true
        },
        completeRequestForm: function() {
            var self = this;
            if (!this.validateRequestForm()) {
                return;
            }
            if (this.request.data.workhour === null || this.request.data.workhour === "") {
                this.$notify.error({
                    title: 'Error',
                    message: "工作数量不能为空"
                });
                return false;
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
                    // this.request.data.workhour.text = Math.floor((returntimestamp - createtimestamp) / 60) + "小时 " + ((returntimestamp - createtimestamp) % 60) + "分钟";
                    // this.request.data.workhour.minutes = returntimestamp - createtimestamp;
                }
            }
        },
        saveAndCreateNew: function() {
            var self = this;
            this.request.data.workersnumber = this.workersnumber;
            if (!this.validateRequestForm()) {
                return;
            }
            this.validateChargePerson(function() {

                self.$http.post("/workformapi/save", {
                    data: self.request.data
                }).then(function(res) {
                    if (res.status === 200 && res.body.requestId) {
                        self.$notify.info({
                            title: '保存成功',
                            message: "保存成功"
                        });
                        self.request.data = {
                            requestId: "",
                            company: self.request.data.company,
                            requester: self.request.data.requester,
                            creationtime: "",
                            workitem: "",
                            workCategory: "",
                            worklocation: "",
                            workers: [],
                            workersnumber: "",
                            workhour: "",
                            planreturntime: "",
                            returntime: "",
                            workcomments: "",
                            workdocument: [],
                            requestStatus: "New",
                            securityTools: [],
                            spareParts: [],
                            isSpareParts: "",
                            isSecurityTools: "",
                            sanPiaoZhiXing: "",
                            chargerName: "",
                            chargerID: ""
                        }
                        //this.request.datasource.companyAdmin = [];
                        //this.request.datasource.companyEmployee = [];
                        self.request.datasource.workItem = [];
                        self.$http.get('/workformapi/requestid').then(function(res) {
                            var strbody = res.body;
                            if (!strbody.requestId || !strbody.strtime) {
                                self.$notify.error({
                                    title: 'Error',
                                    message: "未能从服务器取得派工单编号"
                                });
                                return;
                            }
                            self.request.data.creationtime = strbody.strtime;
                            self.request.data.requestId = strbody.requestId;
                        })
                    } else {
                        self.$notify.error({
                            title: 'Error',
                            message: res.body
                        });
                        return;
                    }
                });
            })
        },
        validateChargePerson: function(callback) {
            var self = this;
            var condition = {
                "fullname": this.request.data.chargerName,
                "company": this.request.data.company,
            };
            this.$http.post("/esrvapi/queryuser", {
                condition: condition
            }).then(function(res) {
                if (res.status === 200) {

                    res = res.body;

                    if (res.status === 800) {
                        self.$notify.error({
                            title: 'Error',
                            message: "你所选的工单主负责人，没有一个有效的登陆ID,所以不能做为主负责人，请更换"
                        });
                        return;
                    } else if (res.status === 500) {
                        self.$notify.error({
                            title: 'Error',
                            message: res.message
                        });
                    } else if (res.status === 200) {

                        self.request.data.chargerID = res.data.username;
                        callback()
                    }
                } else {
                    self.$notify.error({
                        title: 'Error',
                        message: res.body
                    });
                    return;
                }
            })
        },
        saveRequest: function() {
            var self = this;
            this.request.data.workersnumber = this.workersnumber;
            if (!this.validateRequestForm()) {
                return;
            }
            this.validateChargePerson(function() {
                self.$http.post("/workformapi/save", {
                    data: self.request.data
                }).then(function(res) {
                    if (res.status === 200 && res.body.requestId) {
                        self.$notify.info({
                            title: '保存成功',
                            message: "保存成功"
                        });
                        self.returnData(res.body);
                    } else {
                        self.$notify.error({
                            title: 'Error',
                            message: res.body
                        });
                        return;
                    }
                });
            })
        },
        returnData: function(data) {
            var returnOpt = {
                data: data,
                viewName: this.previousView,
                class: "animated bounceInLeft",
                menuitems: commonDataSource.AdminRolesName.indexOf(this.$store.state.curUser.role) >= 0 ? "WorkForm" : false,
                previousView: "WorkFormDetail"
            };
            this.$emit('RightComponentEvent', returnOpt);
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

            if (!this.request.data.chargerName || this.request.data.chargerName === "") {
                this.$notify.error({
                    title: 'Error',
                    message: "主负责人不能为空"
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
            if (this.request.data.workCategory === "") {
                this.$notify.error({
                    title: 'Error',
                    message: "任务类别不能为空"
                });
                return false;
            }
            if (this.request.data.planreturntime === "") {
                this.$notify.error({
                    title: 'Error',
                    message: "计划返回时间不能为空"
                });
                return false;
            }
            if (this.isCreateModel) {
                var planreturntime = this.request.data.planreturntime;
                var planreturntimestamp = Date.parse(new Date(planreturntime)) / 1000 / 60;
                var createtimestamp = Date.parse(new Date(this.request.data.creationtime)) / 1000 / 60;
                if (planreturntimestamp <= createtimestamp) {
                    this.$notify.error({
                        title: 'Error',
                        message: "计划返回时间不能早于派工时间"
                    });
                    return false;
                }
            }
            if (this.isEdithModel) {
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
        },
        pringWorkForm: function() {
            if (window.sessionStorage) {
                sessionStorage.setItem("ToPrintWorkFormData", JSON.stringify(this.request));
                var path = window.location.protocol + "//" + window.location.host + "/printWorkForm";
                window.open(path);
            } else {
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