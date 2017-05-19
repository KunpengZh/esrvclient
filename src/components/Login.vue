<template>
    <div class="homediv" >
        <el-row>
            <el-col :span="3" :offset="2">
                <div class="commentAvatarDivBig">
                    <img class="commentAvatarImageBig" src="/imgs/icon.png">
                </div>
            </el-col>
            <el-col :span="18">
                <el-row style="margin-bottom:10px;">
                    <el-col :span="24">
                        <img src="/imgs/tite1.png" style="width:400px;height:80px;">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="18" :offset="4">
                        <img src="/imgs/tite2.png" style="width:450px;height:70px;">
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" :offset="8">
                <el-form ref="loginForm" id="loginForm" label-width="80px" style="margin-top:30px;" action="/login" method="post">
                    <el-form-item label="用户名:">
                        <el-input v-model="username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input type="password" v-model="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <label style="color:red">{{errorMsg}}</label>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">登陆</el-button>
                         <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'login',
    data: function () {
        return {
            username: '',
            password: '',
            errorMsg:''
        }
    },
    methods:{
        onSubmit:function(){
            let options = { emulateJSON: true };
            this.$http.post("/login",{"username":this.username,"password":this.password},options).then(function(response) {
               if(response.body && response.body.isAuthenticated){
                    this.$store.state.curUser.username=response.body.username;
                    this.$store.state.curUser.isAuthenticated=response.body.isAuthenticated;
                    this.$store.state.curUser.role=response.body.role;
                    this.$store.state.curUser.fullname=response.body.fullname;
                    this.$store.state.curUser.company=response.body.company;
                    this.$store.state.curUser.isAdmin = response.body.role==="Admin"?true:false;
                    this.$store.state.curUser.isAdminOffice = response.body.role==="AdminOffice"?true:false;
                    // if(response.body.role==="Admin"){
                    //     this.$store.state.curUser.isAdmin=true;
                    // }else{
                    //     this.$store.state.curUser.isAdmin=false;
                    // }
                   this.$router.push({
                        path: '/home'
                    })
               }else if(response.body && response.body.message){
                    this.errorMsg=response.body.message;
               }
            });
        }
    }
}
</script>
<style>
.homediv {
    padding: 30px;
    margin-top:100px;
}
</style>