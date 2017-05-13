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
            this.$nextTick(function() {
                if (this.$store.state.curUser.isAuthenticated) {
                    this.getCureUser();
                }
                this.$http.get("/workformapi/getr").then(function(res) {
                    this.WorkFormDataSource = res.body;
                })
            })
        },
        methods: {
            getCureUser: function() {
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
                        if (response.body.role === "Admin") {
                            this.$store.state.curUser.isAdmin = true;
                        } else {
                            this.$store.state.curUser.isAdmin = false;
                        }
                        this.$router.push({
                            path: '/home'
                        })
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
                    action: "Edit"
                });
            },
            switchView: function() {
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
                    },
                    viewName: "WorkFormDetail",
                    class: "animated bounceInRight",
                    menuitems: "WorkFormDetail",
                    action: "Create"
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