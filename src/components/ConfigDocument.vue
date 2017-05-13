<template>
    <div>
        <div>
            <el-menu mode="horizontal">
                <el-menu-item v-show="companySource" index="1" @click="handleCreate()">新建单位</el-menu-item>
                <el-menu-item v-show="companySource" index="2" @click="handleImport()">导入派工单位</el-menu-item>
                <el-menu-item v-show="companyAdmin" index="1" @click="handleCreate()">新建派工人员</el-menu-item>
                <el-menu-item v-show="companyAdmin" index="2" @click="handleImport()">导入派工人员</el-menu-item>
                <el-menu-item v-show="companyEmployee" index="1" @click="handleCreate()">新建工作人员</el-menu-item>
                <el-menu-item v-show="companyEmployee" index="2" @click="handleImport()">导入工作人员</el-menu-item>
                <el-menu-item v-show="workItem" index="1" @click="handleCreate()">新建工作任务</el-menu-item>
                <el-menu-item v-show="workItem" index="2" @click="handleImport()">导入工作任务</el-menu-item>
                <el-menu-item v-show="showWorkCategory" index="1" @click="handleCreate()">新建工作类别</el-menu-item>
                <el-menu-item v-show="showWorkCategory" index="2" @click="handleImport()">导入工作类别</el-menu-item>
                <el-menu-item v-show="showSecurityTools" index="1" @click="handleCreate()">新建安全工具</el-menu-item>
                <el-menu-item v-show="showSecurityTools" index="2" @click="handleImport()">导入安全工具</el-menu-item>
                <el-menu-item v-show="showSpareParts" index="1" @click="handleCreate()">新建备品备件</el-menu-item>
                <el-menu-item v-show="showSpareParts" index="2" @click="handleImport()">导入备品备件</el-menu-item>
            </el-menu>
        </div>
        <div style="height:700px; padding:20px;">
            <el-table :data="ConfigDataSource" border style="width: 100%" max-height="650">
                <el-table-column prop="id" label="行序号" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column prop="name" :label="collabel" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column v-if="showlevel2" prop="attr" :label="col2label" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column v-if="showlevel3" prop="attr" :label="col3label" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column v-if="showlevel4" prop="workCategory" :label="col4label" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                         <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                         <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
</template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <div class="v-modal" style="z-index: 2000;" v-show="createFormVisible"></div>
            <div class="el-dialog__wrapper" style="z-index: 2001;" v-show="createFormVisible">
                <div id="createNewDialog" class="el-dialog configDialog" style="padding:25px;">
                    <span slot="title" class="dialog-title dialogtitle">{{newCreateDialogTitle}}</span>
                    <el-form>
                    <el-row style="margin:10px;">
                        <el-col :span="7">
                                <el-form-item :label="collabel">
                                    <el-input v-model="newTextInput" auto-complete="off"></el-input>
                                </el-form-item>
                        </el-col>
                       
                        <el-col :span="7" :offset="1" v-show="showlevel2">
                                <el-form-item :label="col2label" >
                                    <el-select v-model="attr" placeholder="所属公司">
                                        <el-option v-for="company in companyDataSource" :label="company.name" :value="company.name" :key="company.id"></el-option>
                                    </el-select>
                                </el-form-item>
                        </el-col>
                        
                        <el-col :span="7" :offset="1" v-show="showlevel3">
                                <el-form-item :label="col3label" >
                                    <el-input v-model="attr" auto-complete="off"></el-input>
                                </el-form-item>
                        </el-col>
                         <el-col :span="7" :offset="1" v-show="showlevel4">
                                <el-form-item :label="col4label" >
                                    <el-select v-model="workCategory" placeholder="所属类别">
                                        <el-option v-for="category in workCategoryDataSource" :label="category.name" :value="category.name" :key="category.id"></el-option>
                                    </el-select>
                                </el-form-item>
                        </el-col>
                    </el-row>
                     </el-form>
                    <el-row>
                        <el-col :span="24">
                            <div class="dialog-footer textAlignRight" style="margin-bottom:15px;">
                                <el-button v-show="isCreateModel" type="primary" @click="handleConfirmSaveNew()">保存到服务器</el-button>
                                <el-button v-show="isCreateModel" type="primary" @click="handleAddNew()">增 加</el-button>
                                <el-button v-show="isEditModel" type="primary" @click="handleEditSave()">保存修改</el-button>
                                <el-button type="warning" @click="handleCancelNew()">取 消</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-show="isCreateModel">
                        <el-col :span="24">
                            <el-table :data="newTextInputList" style="width: 100%" max-height="250">
                                <el-table-column prop="name" :label="collabel" label-class-name="forcastHeader">
                                </el-table-column>
                                <el-table-column v-if="showlevel2" prop="attr" :label="col2label" label-class-name="forcastHeader">
                                </el-table-column>
                                <el-table-column v-if="showlevel3" prop="attr" :label="col3label" label-class-name="forcastHeader">
                                </el-table-column>
                                <el-table-column v-if="showlevel4" prop="workCategory" :label="col4label" label-class-name="forcastHeader">
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div>
            <div class="v-modal" style="z-index: 2000;" v-show="dialogFormVisible"></div>
            <div class="el-dialog__wrapper" style="z-index: 2001;" v-show="dialogFormVisible">
                <div id="uploadDialog" class="el-dialog configDialog" style="padding:25px;">
                    <span slot="title" class="dialog-title dialogtitle">{{uplaodDialogTitle}}</span>
                    <el-row class="uplaodrow">
                        <el-col :span="24">
                            <el-upload style="text-align:center" drag :on-success="onSuccess" :data="uploadParam" :before-upload="beforeUpload" action="/esrvapi/uploadconfigdoc">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">Drag files here，or <em>Click to Select files for upload</em></div>
                                <div class="el-upload__tip" slot="tip">Only txt file allowed</div>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer textAlignRight">
        
                        <el-button @click="dialogFormVisible=false">取 消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ConfigDocument',
        props: ["options"],
        data: function() {
            return {
                currentCategory: "companySource",
                uplaodDialogTitle: "上传派工单位",
                newCreateDialogTitle: "新建派工单位",
                collabel: "派工单位",
                col2label: "所属公司",
                col3label: "定额工资",
                col4label: "所属类别",
                showlevel2: false,
                showlevel3: false,
                showlevel4: false,
                showSecurityTools:false,
                showSpareParts:false,
                companySource: true,
                companyAdmin: false,
                companyEmployee: false,
                workItem: false,
                showWorkCategory: false,
                dialogFormVisible: false,
                createFormVisible: false,
                isCreateModel: false,
                isEditModel: false,
                ConfigDataSource: this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']),
                companyDataSource: this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']),
                workCategoryDataSource: this.buildConfigDataSource(this.$store.state.configdoc['workCategory']['data']),
                newTextInput: '',
                attr: '',
                workCategory: '',
                newTextInputList: [],
                originalText: ''
            }
        },
        mounted: function() {
            this.$nextTick(function() {});
        },
        methods: {
            handleCreate: function() {
                this.isCreateModel = true;
                this.isEditModel = false;
                this.createFormVisible = true;
                this.newCreateDialogTitle = "新建" + this.collabel;
            },
            handleImport: function(value) {
                this.dialogFormVisible = true;
            },
            handleCancelNew: function() {
                this.createFormVisible = false;
                this.newTextInput = "";
                this.attr = "";
                this.workCategory = "";
                this.newTextInputList = [];
                this.isCreateModel = false;
                this.isEditModel = false;
                this.originalText = '';
                // this.showlevel2 = false;
                // this.showlevel3 = false;
            },
            handleAddNew: function() {
                if (this.newTextInput === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: '新建' + this.collabel + "不能为空"
                    });
                    return;
                }
                if (this.showlevel2 && this.attr === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: '新建' + this.col2label + "不能为空"
                    });
                    return;
                }
                if (this.showlevel3 && this.attr === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: '新建' + this.col3label + "不能为空"
                    });
                    return;
                }
                if (this.showlevel4 && this.workCategory === "") {
                    this.$notify.error({
                        title: 'Error',
                        message: this.col4label + "不能为空"
                    });
                    return;
                }
                var obj = {
                    "name": this.newTextInput,
                    "attr": this.attr
                };
                if (this.showlevel4) {
                    obj["workCategory"] = this.workCategory;
                }
                this.newTextInputList.push(obj);
                this.newTextInput = "";
                this.attr = "";
                this.workCategory = "";
            },
            handleConfirmSaveNew: function() {
                if (this.newTextInput !== "") {
                    var obj = {
                        "name": this.newTextInput,
                        "attr": this.attr,
                    };
                    if (this.showlevel4) {
                        obj["workCategory"] = this.workCategory;
                    }
                    this.newTextInputList.push(obj);
                    this.newTextInput = "";
                    this.attr = "";
                }
                if (this.newTextInputList.length === 0) {
                    this.$notify.error({
                        title: 'Error',
                        message: '没有添加新数据'
                    });
                    return;
                }
                if (!this.$store.state.configdoc[this.currentCategory]['data']) {
                    this.$store.state.configdoc[this.currentCategory]['data'] = [];
                }
                for (let i = 0; i < this.newTextInputList.length; i++) {
                    this.$store.state.configdoc[this.currentCategory]['data'].push(this.newTextInputList[i]);
                }
                //console.log(this.$store.state.configdoc[this.currentCategory]['data']);
                this.updateConfigDoc(this.$store.state.configdoc[this.currentCategory]['data']);
                this.handleCancelNew();
            },
            buildConfigDataSource: function(obj) {
                var datasource = [];
                if (!obj) {
                    return datasource;
                }
                for (let i = 0; i < obj.length; i++) {
                        var newobj = {
                            id: i,
                            name: typeof obj[i] == "string" ? obj[i] : obj[i]["name"],
                            attr: typeof obj[i] == "string" ? "" : obj[i]["attr"],
                        };
                        if (this.showlevel4) {
                            newobj.workCategory = obj[i]["workCategory"] ? obj[i]["workCategory"] : "";
                        }
                        datasource.push(newobj);
                    }
                    return datasource;
                },
            switchView: function(viewname) {
                        switch (viewname) {
                            case "/companySource":
                                this.showSecurityTools=false;
                                this.showSpareParts=false;
                                this.companySource = true;
                                this.companyAdmin = false;
                                this.companyEmployee = false;
                                this.workItem = false;
                                this.showWorkCategory = false;
                                this.currentCategory = "companySource";
                                this.uplaodDialogTitle = "上传派工单位";
                                this.collabel = "派工单位";
                                this.showlevel2 = false;
                                this.showlevel3 = false;
                                this.showlevel4 = false;
                                this.ConfigDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                //this.companyDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                break;
                            case "/companyAdmin":
                                this.showSecurityTools=false;
                                this.showSpareParts=false;
                                this.companySource = false;
                                this.companyAdmin = true;
                                this.companyEmployee = false;
                                this.workItem = false;
                                this.showWorkCategory = false;
                                this.currentCategory = "companyAdmin";
                                this.uplaodDialogTitle = "上传派工人员";
                                this.collabel = "派工人员";
                                this.showlevel2 = true;
                                this.showlevel3 = false;
                                this.showlevel4 = false;
                                this.ConfigDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companyAdmin']['data']);
                                this.companyDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                break;
                            case "/companyEmployee":
                                this.showSecurityTools=false;
                                this.showSpareParts=false;
                                this.companySource = false;
                                this.companyAdmin = false;
                                this.companyEmployee = true;
                                this.workItem = false;
                                this.showWorkCategory = false;
                                this.currentCategory = "companyEmployee";
                                this.uplaodDialogTitle = "上传工作人员";
                                this.collabel = "工作人员";
                                this.showlevel2 = true;
                                this.showlevel3 = false;
                                this.showlevel4 = false;
                                this.ConfigDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companyEmployee']['data']);
                                this.companyDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                break;
                            case "/workItem":
                                this.showSecurityTools=false;
                                this.showSpareParts=false;
                                this.companySource = false;
                                this.companyAdmin = false;
                                this.companyEmployee = false;
                                this.workItem = true;
                                this.showWorkCategory = false;
                                this.currentCategory = "workItem";
                                this.uplaodDialogTitle = "上传工作任务";
                                this.collabel = "工作任务";
                                this.showlevel2 = false;
                                this.showlevel3 = true;
                                this.showlevel4 = true;
                                this.ConfigDataSource = this.buildConfigDataSource(this.$store.state.configdoc['workItem']['data']);
                                //this.companyDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                this.workCategoryDataSource = this.buildConfigDataSource(this.$store.state.configdoc['workCategory']['data']);
                                break;
                            case "/showWorkCategory":
                                this.showSecurityTools=false;
                                this.showSpareParts=false;
                                this.companySource = false;
                                this.companyAdmin = false;
                                this.companyEmployee = false;
                                this.workItem = false;
                                this.showWorkCategory = true;
                                this.currentCategory = "workCategory";
                                this.uplaodDialogTitle = "上传工作定额";
                                this.collabel = "工作定额";
                                this.showlevel2 = false;
                                this.showlevel3 = false;
                                this.showlevel4 = false;
                                this.ConfigDataSource = this.buildConfigDataSource(this.$store.state.configdoc['workCategory']['data']);
                                //this.companyDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                break;
                            case "/securityTools":
                                this.companySource = false;
                                this.companyAdmin = false;
                                this.companyEmployee = false;
                                this.workItem = false;
                                this.showWorkCategory = false;
                                this.showSecurityTools=true;
                                this.showSpareParts=false;
                                this.currentCategory = "securityTools";
                                this.uplaodDialogTitle = "上传安全工具";
                                this.collabel = "安全工具";
                                this.showlevel2 = false;
                                this.showlevel3 = false;
                                this.showlevel4 = false;
                                this.ConfigDataSource = this.buildConfigDataSource(this.$store.state.configdoc['securityTools']['data']);
                                //this.companyDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                break;
                            case "/spareParts":
                                this.companySource = false;
                                this.companyAdmin = false;
                                this.companyEmployee = false;
                                this.workItem = false;
                                this.showWorkCategory = false;
                                this.showSecurityTools=false;
                                this.showSpareParts=true;
                                this.currentCategory = "spareParts";
                                this.uplaodDialogTitle = "上传备品备件";
                                this.collabel = "备品备件";
                                this.showlevel2 = false;
                                this.showlevel3 = false;
                                this.showlevel4 = false;
                                this.ConfigDataSource = this.buildConfigDataSource(this.$store.state.configdoc['spareParts']['data']);
                                //this.companyDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                break;
                            default:
                                this.companySource = true;
                                this.companyAdmin = false;
                                this.companyEmployee = false;
                                this.workItem = false;
                                this.showWorkCategory = false;
                                this.showSecurityTools=false;
                                this.showSpareParts=false;
                                this.currentCategory = "companySource";
                                this.uplaodDialogTitle = "上传派工单位";
                                this.collabel = "派工单位";
                                this.showlevel2 = false;
                                this.showlevel3 = false;
                                this.showlevel4 = false;
                                this.ConfigDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                                //this.companyDataSource = this.buildConfigDataSource(this.$store.state.configdoc['companySource']['data']);
                        }
                    },
                    beforeUpload: function(doc) {
                        this.fullscreenLoading = true;
                    },
                    onSuccess: function(response) {
                        this.fullscreenLoading = false;
                        this.$emit('switchViewEvent', {
                            data: response,
                            "viewName": "ForcastTableView"
                        });
                    },
                    handleEditSave: function() {
                        if (this.newTextInput === "") {
                            this.$notify.error({
                                title: 'Error',
                                message: '新建' + this.collabel + "不能为空"
                            });
                            return;
                        }
                        if (this.showlevel2 || this.showlevel3) {
                            if (this.attr === "") {
                                this.$notify.error({
                                    title: 'Error',
                                    message: '数据不能为空'
                                });
                                return;
                            }
                        }
                        if (this.showlevel4 && this.workCategory === "") {
                            this.$notify.error({
                                title: 'Error',
                                message: this.col4label + "不能为空"
                            });
                            return;
                        }
                        var curSource = this.$store.state.configdoc[this.currentCategory]['data']
                        var needupdate = false;
                        for (let i = 0; i < curSource.length; i++) {
                            if (curSource[i]["name"] === this.originalText) {
                                curSource[i]['name'] = this.newTextInput;
                                curSource[i]['attr'] = this.attr;
                                if (this.showlevel4){
                                    curSource[i]['workCategory']=this.workCategory;
                                }
                                needupdate = true;
                                break;
                            }
                        }
                        if (!needupdate) {
                            this.$notify.info({
                                title: '无需更新',
                                message: '没有数据需要更新'
                            });
                            return;
                        }
                        this.updateConfigDoc(curSource);
                        this.handleCancelNew();
                    },
                    updateConfigDoc: function(newdata) {
                        this.$http.post("/esrvapi/updateconfigdoc", {
                            "configCategory": {
                                "category": this.currentCategory
                            },
                            "configData": newdata
                        }).then(function(res) {
                            var result = res.body;
                            if (result.message) {
                                this.$notify.error({
                                    title: 'Error',
                                    message: result.message
                                });
                            } else {
                                this.$notify.info({
                                    title: '更新成功',
                                    message: '数据已经更新到服务器'
                                });
                                this.$store.state.configdoc[this.currentCategory]['data'] = newdata;
                                var newDataSource = this.buildConfigDataSource(newdata);
                                this.ConfigDataSource = newDataSource;
                                // this.$set(this.$store.state.configdoc[this.currentCategory]['data'], newdata);
                                // var newDataSource = this.buildConfigDataSource(newdata);
                                // this.$set(this.ConfigDataSource, newDataSource);
                            }
                        });
                    },
                    handleEdit: function(index, row) {
                        this.newCreateDialogTitle = "编辑" + this.collabel;
                        this.newTextInput = row.name;
                        this.originalText = row.name;
                        this.attr = row.attr;
                        this.workCategory=row.workCategory;
                        this.isCreateModel = false;
                        this.isEditModel = true;
                        this.createFormVisible = true;
                    },
                    handleDelete: function(index, row) {
                        var curSource = this.$store.state.configdoc[this.currentCategory]['data']
                        var needupdate = false;
                        for (let i = 0; i < curSource.length; i++) {
                            if (curSource[i]["name"] === row.name) {
                                curSource.splice(i, 1);
                                needupdate = true;
                                break;
                            }
                        }
                        if (!needupdate) {
                            this.$notify.info({
                                title: '无需更新',
                                message: '没有数据需要更新'
                            });
                            return;
                        }
                        this.updateConfigDoc(curSource);
                        this.handleCancelNew();
                    }
            },
            computed: {
                uploadParam: function() {
                    return {
                        category: this.currentCategory
                    }
                }
            },
        }
</script>

<style>
    .uplaodrow {
        margin-top: 50px;
    }
    
    #createNewDialog {
        top: 10%;
        width: 650px;
        height: 500px;
        padding-top: 40px;
    }
    
    #uploadDialog {
        top: 15%;
        width: 500px;
        height: 400px;
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
</style>