<template>
    <div id="homelayout" style="height:100%" v-loading.fullscreen.lock="fullscreenLoading">
        <el-row class="headerContainer">
            <el-col :span="2">
                <div class="commentAvatarDiv">
                    <img class="commentAvatarImage" src="/imgs/elpower.png">
                </div>
            </el-col>
            <el-col :span="3">
                <div class="appTitle">
                    <span>献县供电派工单系统</span>
                </div>
            </el-col>
            <el-col :span="18" style="height:60px;">
                <ul class="headerPrimaryActionsTrailing">
                    <li class="menuUser" v-for="menuitem in menuitems" :key="menuitem.id">
                        <div class="menuOptions">
                            <a :href="menuitem.pathname" v-on:click="triggerMenuEvent" style="color:white;">{{menuitem.menu}}</a>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="1" style="height:60px;">
                <div id="logoutdiv">
                    <el-button type="text" class="el-icon-menu" style="color:white;" v-on:click="logout">&nbsp&nbsp&nbsp退出</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row style="height:100%;">
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <left-side-bar v-on:LeftSideBarEvent="LeftSideBarEvent"></left-side-bar>
                </div>
            </el-col>
            <el-col :span="20" style="height:100%; border-left: 1px solid lightgray;">
                <div class="grid-content bg-purple-light" style=" height:100%">
                    <component ref="rightComponent" v-bind:is="currentView" v-on:RightComponentEvent="RightComponentEvent" v-bind:options="opt" v-bind:class="rightComponentClass"></component>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import leftSideBar from '@/components/LeftSideBar'
    import UserManager from '@/components/UserManager'
    import ConfigDocument from '@/components/ConfigDocument'
    import commonDataSource from '@/components/commondatasources'
    import WorkForm from '@/components/WorkForm'
    import WorkFormDetail from '@/components/WorkFormDetail'
    import QueryWorkForm from '@/components/QueryWorkForm'
    import QueryWorker from '@/components/QueryWorker'
    import QueryMonthly from '@/components/QueryMonthly'
    import QueryAnnually from '@/components/QueryAnnually'
    
    export default {
        name: 'homelayout',
        components: {
            leftSideBar,
            WorkFormDetail,
            WorkForm,
            QueryWorkForm,
            QueryWorker,
            QueryMonthly,
            QueryAnnually
        },
        data: function() {
            return {
                fullscreenLoading: false,
                currentView: WorkForm,
                opt: {},
                menuitems: commonDataSource.AdminRolesName.indexOf(this.$store.state.curUser.role)>=0?commonDataSource.WorkForm:[],
                rightComponentClass: "animated bounceInDown"
            }
        },
        methods: {
            RightComponentEvent: function(options) {
                this.opt.data = options.data;
                this.opt.action = options.action;
                this.opt.previousView = options.previousView;
                this.rightComponentClass = options.class;
                if (options.menuitems) {
                    this.menuitems = commonDataSource[options.menuitems];
                }else{
                    this.menuitems=[];
                }
                if (options.isEmergency) {
                    this.opt.isEmergency = options.isEmergency;
                }else{
                    this.opt.isEmergency=false;
                }
                
                this.currentView = options.viewName;
            },
            LeftSideBarEvent: function(viewName) {
                var self = this;
                switch (viewName) {
                    case "UserManager":
                        this.fullscreenLoading = true;
                        this.$http.get('/esrvadmin/allusers').then(response => {
                            var obj = {
                                viewName: 'UserManager',
                                data: response.body
                            }
                            self.switchViewEvent(obj);
                        }, response => {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Loading data failed from ' + url
                            });
                        });
                        break;
                    case "configdocument":
                        this.loadConfigData(function() {
                            self.switchViewEvent({
                                "viewName": "ConfigDocument"
                            });
                        });
                        break;
                    case "workform":
                        this.switchViewEvent({
                            "viewName": "WorkForm"
                        });
                        break;
                    case "emergencyworkform":
                        this.switchViewEvent({
                            "viewName": "EmerencyWorkForm"
                        });
                        break;
                    case "queryWorkform":
                        this.switchViewEvent({
                            "viewName": "QueryWorkForm"
                        });
                        break;
                    case "queryWorker":
                        this.switchViewEvent({
                            "viewName": "QueryWorker"
                        });
                        break;
                    case "queryMonthly":
                        this.switchViewEvent({
                            "viewName": "QueryMonthly"
                        });
                        break;
                    case "queryAnnually":
                        this.switchViewEvent({
                            "viewName": "QueryAnnually"
                        });
                        break;
                    default:
                        this.currentView = Home;
                }
            },
            switchViewEvent: function(options) {
                var self = this;
                switch (options.viewName) {
                    case "UserManager":
                        if (!self.$store.state.configdoc.companySource || self.$store.state.configdoc.companySource.length <= 0) {
                            self.loadConfigData(function() {
                                self.opt.data = options.data;
                                self.currentView = UserManager;
                                self.fullscreenLoading = false;
                                self.menuitems = commonDataSource.UserManager;
                            });
                        } else {
                            self.opt.data = options.data;
                            self.currentView = UserManager;
                            self.fullscreenLoading = false;
                            self.menuitems = commonDataSource.UserManager;
                        }
                        break;
                    case "ConfigDocument":
                        self.currentView = ConfigDocument;
                        self.fullscreenLoading = false;
                        self.menuitems = commonDataSource.ConfigDocument;
                        break;
                    case "WorkForm":
                        self.currentView = WorkForm;
                        self.fullscreenLoading = false;
                        self.menuitems = commonDataSource.WorkForm;
                        break;
                    case "QueryWorkForm":
                        self.currentView = QueryWorkForm;
                        self.fullscreenLoading = false;
                        self.menuitems = commonDataSource.queryWorkform;
                        break;
                    case "QueryWorker":
                        self.currentView = QueryWorker;
                        self.fullscreenLoading = false;
                        self.menuitems = commonDataSource.queryWorker;
                        break;
                    case "QueryMonthly":
                        self.currentView = QueryMonthly;
                        self.fullscreenLoading = false;
                        self.menuitems = commonDataSource.queryMonthly;
                        break;
                    case "QueryAnnually":
                        self.currentView = QueryAnnually;
                        self.fullscreenLoading = false;
                        self.menuitems = commonDataSource.queryAnnually;
                        break;
                    default:
                        self.fullscreenLoading = false;
                        self.menuitems = [];
                        self.currentView = Home;
                }
            },
            buildConfigDataSource: function(obj) {
                var datasource = [];
                if (!obj) {
                    return datasource;
                }
                for (let i = 0; i < obj.length; i++) {
                    datasource.push({
                        id: i,
                        name: typeof obj[i] == "string" ? obj[i] : obj[i]["name"],
                        attr: typeof obj[i] == "string" ? "" : obj[i]["attr"],
                    })
                }
                return datasource;
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
            logout: function() {
                this.$store.state.qcriteria = "";
                this.$store.state.curUser = {
                    username: "",
                    role: "",
                    isAdmin: false,
                    isAdminOffice:false,
                    company: "",
                    fullname: "",
                    isAuthenticated: false
                }
                this.$store.state.configdoc = {
                    companySource: [],
                    companyAdmin: [],
                    companyEmployee: [],
                    workItem: [],
                    workCategory: [],
                    spareParts: [],
                    securityTools: []
                }
                this.$http.get("/logout").then(function(res) {
                    this.$router.push({
                        path: '/login'
                    })
                })
            },
            triggerMenuEvent: function(e) {
                e.preventDefault();
                e.stopPropagation();
                var pathname = e.target.pathname;
                for (var i = 0; i < this.menuitems.length; i++) {
                    if (pathname === this.menuitems[i].pathname) {
                        this.$refs.rightComponent[this.menuitems[i].event](pathname);
                    }
                }
            }
        }
    }
</script>

<style>
    .headerContainer {
        background-color: #57A8FF;
        font-size: 12px;
        height: 70px;
        position: relative;
        width: 100%;
        z-index: 999;
        box-shadow: 0 0 10px 0 #696969;
        padding: 5px;
        margin: 0;
        /*rgba(0,0,0,.5);*/
    }
    
    .headerPrimaryActionsTrailing {
        list-style: none;
        margin: 0;
        padding: 0;
        padding-right: 20px;
        text-align: right;
        text-decoration: none;
    }
    
    .headerPrimaryActionsTrailing>li {
        display: inline-block;
    }
    
    .menuUser,
    .menuUser>div {
        padding-right: 15px;
    }
    
    .menuUser .menuOptions {
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        font-weight:500;
    }
    
    #logoutdiv {
        float: right;
        padding-right: 10px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        color: white;
        font-size: 18px;
        font-weight: bolder;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>

