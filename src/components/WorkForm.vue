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
                <el-table-column prop="workCategory" label="工作类别" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column prop="workitem" label="工作任务" label-class-name="forcastHeader">
                </el-table-column>
                <el-table-column prop="workhour" label="工作数量" label-class-name="forcastHeader">
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
        name: 'WorkForm',
        props: ["options"],
        data() {
            return {
                WorkFormDataSource: [],
            }
        },
        mounted: function() {
            var self=this;
            this.$nextTick(function() {
                if (!this.$store.state.curUser.isAuthenticated) {
                    this.getCureUser(function(){
                        self.$http.get("/workformapi/getr").then(function(res) {
                        self.WorkFormDataSource = res.body;
                    })
                    });
                }else{
                    this.$http.get("/workformapi/getr").then(function(res) {
                        this.WorkFormDataSource = res.body;
                    })
                }
                
            })
        },
        methods: {
            getCureUser: function(callback) {
                this.$http.get('/login/isAuthenticated').then(response => {
                    var isAuthenticated = false;
                    if (response.body && response.body.isAuthenticated) {
                        isAuthenticated = response.body.isAuthenticated;
                    }
                    if (isAuthenticated) {
                        this.$store.state.curUser.username = response.body.username;
                        this.$store.state.curUser.isAuthenticated = response.body.isAuthenticated;
                        this.$store.state.curUser.role = response.body.role;
                        this.$store.state.curUser.company = response.body.company;
                        this.$store.state.curUser.fullname = response.body.fullname;
                        this.$store.state.curUser.isAdmin = response.body.role==="Admin"?true:false;
                        this.$store.state.curUser.isAdminOffice = response.body.role==="AdminOffice"?true:false;
                        if(callback){
                            callback();
                        }
                    } else {
                        this.$router.push({
                            path: '/login'
                        })
                    }
                })
            },
            handleEdit: function(index, row) {
                this.$emit('RightComponentEvent', {
                    data: row,
                    viewName: "WorkFormDetail",
                    class: "animated bounceInRight",
                    menuitems: "WorkFormDetail",
                    action: "Edit",
                    previousView:"WorkForm"
                });
            },
            switchView: function(viewname) {
                var isEmergency=false;
                
                if(viewname==="/createemergencyrequest"){
                    isEmergency=true;
                }
                
                this.$emit('RightComponentEvent', {
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
                        chargerName:"",
                        chargerID:""
                    },
                    class: "animated bounceInRight",
                    menuitems: "WorkFormDetail",
                    viewName:"WorkFormDetail",
                    previousView:"WorkForm",
                    action: "Create",
                    isEmergency:isEmergency
                });
            }
        }
    }
</script>

<style>
    .forcastHeader {
        font-size: 14px;
        font-weight: normal;
    }
</style>