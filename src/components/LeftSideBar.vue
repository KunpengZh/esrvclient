<template>
    <div class="oneui leftSideBar">
        <h3 class="paddingBottom">工单生成</h3>
        <ul class="marginBottom">
            <li class="paddingBottom"><a href="/workform" v-on:click="triggerEvent">工单派工</a>
            </li>
        </ul>
        <h3 class="paddingBottom">汇总查询</h3>
        <ul class="marginBottom">
            <li class="paddingBottom" id="bom-upload"><a href="/queryWorkform" v-on:click="triggerEvent">按工单查询</a></li>
            <li class="paddingBottom" id="bom-upload"><a href="/queryWorker" v-on:click="triggerEvent">作业人员查询</a></li>
        </ul>
        <h3 class="paddingBottom">汇总打印</h3>
        <ul class="marginBottom">
            <li class="paddingBottom" id="bom-upload"><a href="#">生成月报</a>
            </li>
            <li class="paddingBottom" id="bom-show"><a href="#">生成年报</a>
            </li>
            <li class="paddingBottom" id="bom-show"><a href="#">按派工单位月明细报表</a>
            </li>
            <li class="paddingBottom" id="bom-show"><a href="#">按派工单位年明细报表</a>
            </li>
        </ul>
        <h3 class="paddingBottom" v-if="isAdmin">管理员工具</h3>
        <ul class="marginBottom" v-if="isAdmin">
            <li class="paddingBottom" id="bom-upload"><a href="/configdocument" v-on:click="triggerEvent">数据导入</a>
            </li>
            <li class="paddingBottom" id="bom-show"><a href="/usermanager" v-on:click="triggerEvent">用户管理</a>
            </li>
        </ul>
    </div>
</template>

<<script>
    export default {
        name: 'left-side-bar',
        data: function() {
            return {
                isAdmin: this.$store.state.curUser.isAdmin
            }
        },
        methods: {
            triggerEvent: function(e) {
                e.preventDefault();
                e.stopPropagation();
                var pathname = e.target.pathname;
                switch (pathname) {
                    case "/configdocument":
                        this.$emit('LeftSideBarEvent', 'configdocument');
                        break;
                    case "/usermanager":
                        this.$emit('LeftSideBarEvent', 'UserManager');
                        break;
                    case "/workform":
                        this.$emit('LeftSideBarEvent', 'workform');
                        break;
                    case "/queryWorkform":
                        this.$emit('LeftSideBarEvent', 'queryWorkform');
                        break;
                    case "/queryWorker":
                        this.$emit('LeftSideBarEvent','queryWorker');
                        break;
                }
            }
        }
    }
</script>

<style>
    .leftSideBar {
        padding: 10px;
        font-size: 14px;
    }
</style>

