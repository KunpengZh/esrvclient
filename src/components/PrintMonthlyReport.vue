<template>
    <div style="padding:30px;">
        <el-row>
            <el-col :span="24" style="text-align:center">
                <h1 style="padding:30px;">派工单月报告</h1>
            </el-col>
        </el-row>
        <el-table :data="summaryTable" border style="width:100%">
            <el-table-column prop="company" label="派工单位" label-class-name="forcastHeader" width="150">
            </el-table-column>
            <el-table-column prop="workhourNum" label="工作总量" label-class-name="forcastHeader" width="100">
            </el-table-column>
            <el-table-column prop="requestNum" label="工单数量" label-class-name="forcastHeader" width="100">
            </el-table-column>
            <el-table-column prop="wageNum" label="工钱总额" label-class-name="forcastHeader" width="100">
            </el-table-column>
            <el-table-column prop="worker" label="作业人员" label-class-name="forcastHeader">
            </el-table-column>
        </el-table>
    
    </div>
</template>

<script>
    export default {
        name: 'QueryWorkHome',
        data: function() {
            var requestData;
            if (window.sessionStorage) {
                if (sessionStorage.getItem("ToPrintMonthlyReportData")) {
                    requestData = JSON.parse(sessionStorage.getItem("ToPrintMonthlyReportData"));
                    console.log(requestData);
                } else {
                    requestData=[];
                }
            }else {
                this.$notify.error({
                    title: 'Error',
                    message: "你的浏览器不支持此功能，请升级"
                });
                return {};
            };
            return {
                summaryTable: requestData
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