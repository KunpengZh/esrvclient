<template>
    <div>
  <div style="height:700px; padding:20px;">
    <el-table :data="UserDataSource" border style="width: 100%" max-height="650">
      <el-table-column prop="username" label="用户ID" label-class-name="forcastHeader">
      </el-table-column>
      <el-table-column prop="fullname" label="用户全名" label-class-name="forcastHeader">
      </el-table-column>
      <el-table-column prop="role" label="用户角色" label-class-name="forcastHeader">
      </el-table-column>
      <el-table-column prop="company" label="用户公司" label-class-name="forcastHeader">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div>
    <div class="v-modal" style="z-index: 2000;" v-show="dialogFormVisible"></div>
    <div class="el-dialog__wrapper" style="z-index: 2001;" v-show="dialogFormVisible">
      <div id="userdialog" class="el-dialog">
        <el-form :model="user">
          <el-form-item label="用户ID" :label-width="formLabelWidth">
            <el-input v-model="user.username" auto-complete="off" :disabled="isEditModel"></el-input>
          </el-form-item>
          <el-form-item label="用户全称" :label-width="formLabelWidth">
            <el-input v-model="user.fullname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属公司" :label-width="formLabelWidth">
            <el-select v-model="user.company" placeholder="请选择用户角色">
              <el-option v-for="company in companySource" :label="company.name" :value="company.name" :key="company.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户角色" :label-width="formLabelWidth">
            <el-select v-model="user.role" placeholder="请选择用户角色">
              <el-option label="管理员" value="Admin"></el-option>
              <el-option label="普通用户" value="User"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户密码" :label-width="formLabelWidth" v-show="showResetPssword">
            <el-input v-model="user.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer textAlignRight">
          <el-button type="warning" @click="showResetPssword=true" v-show="isEditModel">重置密码</el-button>
          <el-button type="primary" @click="confirmUserDialog()" v-show="isEditModel">确 定</el-button>
          <el-button type="primary" @click="configmCreateNewUser()" v-show="isCreateModel">保存用户</el-button>
          <el-button @click="cancelUserDialog">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        props: ["options"],
        data() {
            var companySource=[];
            if(this.$store.state.configdoc.companySource && this.$store.state.configdoc.companySource.data){
                companySource=this.$store.state.configdoc.companySource.data
            }
            return {
                UserDataSource: this.options.data,
                dialogFormVisible: false,
                showResetPssword: false,
                isCreateModel:false,
                isEditModel:false,
                menuActiveIndex:'1',
                user: {
                    username: '',
                    fullname: '',
                    company: '',
                    password: '',
                    role: "",
                },
                formLabelWidth: '120px',
                companySource: companySource,
                originUser: {
                    username: '',
                    fullname: '',
                    company: '',
                    password: '',
                    role: "",
                }
            }
        },
        methods: {
            handleEdit: function(index, row) {
                this.isCreateModel=false,
                this.isEditModel=true,
                this.dialogFormVisible = true;
                this.showResetPssword = false;
                this.user.username = row.username;
                this.user.fullname = row.fullname ? row.fullname : row.username;
                this.user.role = row.role ? row.role : "";
                this.user.company = row.company ? row.company : "";
                this.user.password = '';
                this.originUser.fullname = row.fullname ? row.fullname : "";
                this.originUser.role = row.role ? row.role : "";
                this.originUser.company = row.company ? row.company : "";
                this.originUser.password = '';
            },
            handleDelete: function(index, row) {
                var deleteUser = {
                    "condition": {
                        "username": row.username
                    }
                }
                this.$http.post("/esrvadmin/deleteuser", deleteUser).then(function(res) {
                    var result = res.body;
                    if (result.ok === 1) {
                        if (result.n > 0) {
                            this.$notify.info({
                                title: 'User Deletion',
                                message: result.n + "'s user has been deleted."
                            });
                            var newUserSource = this.UserDataSource;
                            for (var i = 0; i < newUserSource.length; i++) {
                                if (newUserSource[i].username === row.username) {
                                    newUserSource.splice(i, 1);
                                    break;
                                }
                            }
                            this.$set(this.UserDataSource, newUserSource);
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: "No User been deleted"
                            });
                        }
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Delete User function failed'
                        });
                    }
                })
            },
            configmCreateNewUser:function(){
                if(this.user.username==="" ||this.user.username.length<6 ){
                    this.$notify.error({
                            title: 'Error',
                            message: '请填入用户登陆ID,不能少于6位'
                    });
                    return;
                }
                if(this.user.fullname===""){
                    this.$notify.error({
                            title: 'Error',
                            message: '请填入用户全名'
                    });
                    return;
                }
                if(this.user.role===""){
                    this.$notify.error({
                            title: 'Error',
                            message: '请填入用户角色'
                    });
                    return;
                }
                if(this.user.company===""){
                    this.$notify.error({
                            title: 'Error',
                            message: '请选择用户公司名称'
                    });
                    return;
                }
                if(this.user.password==="" || this.user.password.length<8){
                    this.$notify.error({
                            title: 'Error',
                            message: '请输入用户密码，最少8位'
                    });
                    return;
                }
                var newUser={
                    "username":this.user.username,
                    "fullname":this.user.fullname,
                    "company":this.user.company,
                    "role":this.user.role,
                    "password":this.user.password
                }
                let options = { emulateJSON: true };
                this.$http.post("/login/signup",newUser,options).then(function(res) {
                    var result=res.body;
                    if(!result._id && result.message){
                        this.$notify.error({
                            title: 'Error',
                            message: result.message
                        });
                    }else{
                        this.UserDataSource.push(result);
                        this.$set(this.UserDataSource,this.UserDataSource);
                        this.isCreateModel=false,
                        this.isEditModel=false,
                        this.dialogFormVisible = false;
                        this.showResetPssword=false;
                    }
                });
            },
            confirmUserDialog: function(params) {
                var updateUser = {
                    condition: {
                        "username": this.user.username
                    },
                    data: {}
                }
                var needUpdate = false;
                if (this.user.fullname !== this.originUser.fullname) {
                    updateUser.data.fullname = this.user.fullname;
                    needUpdate = true;
                }
                if (this.user.role !== this.originUser.role) {
                    updateUser.data.role = this.user.role;
                    needUpdate = true;
                }
                if (this.user.company !== this.originUser.company) {
                    updateUser.data.company = this.user.company;
                    needUpdate = true;
                }
                if (this.user.password !== this.originUser.password) {
                    if(this.user.password!=="" && this.user.password.length<8){
                        this.$notify.error({
                            title: 'Error',
                            message: '你输入的密码不符合最少8位的规则'
                        });
                        return;
                    }
                    updateUser.data.password = this.user.password;
                    needUpdate = true;
                }
                if (needUpdate) {
                    this.$http.post("/esrvadmin/updateuser", updateUser).then(function(res) {
                        if (!res.body.length > 0) {
                            console.log("no data returned");
                            this.$notify.info({
                                title: 'Info',
                                message: '没有用户被更新！'
                            });
                            return;
                        }
                        var newUserData = res.body[0];
                        for (var i = 0; i < this.UserDataSource.length; i++) {
                            if (this.UserDataSource[i]._id === newUserData._id) {
                                this.$set(this.UserDataSource, i, newUserData);
                                break;
                            }
                        }
                    })
                }
                this.$notify.info({
                    title: 'Info',
                    message: '用户更新成功！'
                });
                this.dialogFormVisible = false;
                this.originUser = {
                    username: '',
                    fullname: '',
                    company: '',
                    password: '',
                    role: "",
                };
                this.user = {
                    username: '',
                    fullname: '',
                    company: '',
                    password: '',
                    role: "",
                }
            },
            cancelUserDialog: function() {
                this.dialogFormVisible = false;
                this.user = {
                    username: '',
                    fullname: '',
                    company: '',
                    password: '',
                    role: "",
                }
            },
            handleCreateNewUser:function(){
                this.isCreateModel=true,
                this.isEditModel=false,
                this.user = {
                    username: '',
                    fullname: '',
                    company: '',
                    password: '',
                    role: "",
                };
                this.originUser = {
                    username: '',
                    fullname: '',
                    company: '',
                    password: '',
                    role: "",
                }
                this.dialogFormVisible = true;
                this.showResetPssword=true;
            }
        }
    }
</script>

<style>
    .forcastHeader {
        font-size: 14px;
        font-weight: normal;
    }
    #userdialog {
        top: 10%;
        width: 600px;
        height: 500px;
        padding: 20px;
        padding-top: 40px;
    }
</style>