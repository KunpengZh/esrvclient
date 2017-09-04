<template>
    <div style="padding:25px;height:700px">
        <el-row>
            <el-col :span="24" style="text-align:center;padding-bottom: 5px;">
                <span class="requestFormTitle">{{request.label.formTitle}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="text-align:right;padding:10px; padding-right:30px;">
                <span>{{request.label.requestId}}</span>
                <span>{{request.data.requestId}}</span>
            </el-col>
        </el-row>
        <el-form :model="request">
            <table class="bordered" width="100%">
                <tr>
                    <td width="10%">{{request.label.company}}</td>
                    <td width="23%">
                        <span>{{request.data.company}}</span>
                    </td>
                    <td width="10%">{{request.label.requester}}</td>
                    <td width="22%">
                        <span>{{request.data.requester}}</span>
                    </td>
                    <td width="10%">{{request.label.creationtime}}</td>
                    <td width="25%">{{request.data.creationtime}}</td>
                </tr>
                <tr>
                    <td>{{request.label.chargerName}}</td>
                    <td>
                        <span>{{request.data.chargerName}}</span>
                    </td>
                    <td>{{request.label.workers}}</td>
                    <td>
                        <span>{{request.data.workers}}</span>
                    </td>
                    <td>{{request.label.workhour}}</td>
                    <td>
                        <span>{{request.data.workhour}}</span>
                    </td>
                </tr>
                <tr>
                    <td>{{request.label.workCategory}}</td>
                    <td>
                        <span>{{request.data.workCategory}}</span>
                    </td>
                    <td>{{request.label.workitem}}</td>
                    <td>
                        <span>{{request.data.workitem}}</span>
                    </td>
                    <td>{{request.label.workersnumber}}</td>
                    <td>{{request.data.workersnumber}}</td>
                </tr>
                <tr>
                    <td>{{request.label.isSecurityTools}}</td>
                    <td>
                        <span>{{request.data.isSecurityTools}}</span>
                    </td>
                    <td>{{request.label.isSpareParts}}</td>
                    <td>
                        <span>{{request.data.isSpareParts}}</span>
                    </td>
                    <td>{{request.label.sanPiaoZhiXing}}</td>
                    <td>
                        <span>{{request.data.sanPiaoZhiXing}}</span>
                    </td>
                </tr>
                <tr>
                    <td>{{request.label.securityTools}}</td>
                    <td>
                        <p v-for="tool in request.data.securityTools" :key="tool">{{tool}}</p>
                    </td>
                    <td>{{request.label.spareParts}}</td>
                    <td>
                        <p v-for="part in request.data.spareParts" :key="part">{{part}}</p>
                    </td>
                    <td>{{request.label.planreturntime}}</td>
                    <td>
                        <span>{{request.data.planreturntime}}</span>
                    </td>
                </tr>
                <tr>
                    <td>{{request.label.worklocation}}</td>
                    <td colspan="3">
                        <span>{{request.data.worklocation}}</span>
                    </td>
                    <td>{{request.label.returntime}}</td>
                    <td>
                        <span>{{request.data.returntime}}</span>
                    </td>
                </tr>
                <tr>
                    <td>工作内容</td>
                    <td colspan="5">
                        <span>{{request.data.workcomments}}</span>
                    </td>
                </tr>
            </table>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'WorkFormPrint',
    data: function() {
        var requestData;
        if (window.sessionStorage) {
            if (sessionStorage.getItem("ToPrintWorkFormData")) {
                requestData = JSON.parse(sessionStorage.getItem("ToPrintWorkFormData"));
                console.log(requestData);
            } else {
                requestData = {
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
                        workcomments: "工作内容",
                        chargerName: '负责人'
                    },
                    data: this.options.data,
                    datasource: {
                        companySource: [],
                        companyAdmin: [],
                        companyEmployee: [],
                        workItem: [],
                        workCategory: [],
                        securityTools: [],
                        spareParts: []
                    },
                    previousValue: {
                        company: "",
                        workCategory: "",
                    }
                }
            }
        } else {
            this.$notify.error({
                title: 'Error',
                message: "你的浏览器不支持此功能，请升级"
            });
            return {};
        };
        return {
            request: this.buildRequestData(requestData)
        }
    },
    methods: {
        buildRequestData: function(data) {
            var requestData = data;
            var planreturntime = "";
            if (data.data.planreturntime) {
                planreturntime = data.data.planreturntime.replace(/\T/g, " ");
                planreturntime = planreturntime.slice(0, 19);
            }

            var workers = "";
            for (var i = 0; i < data.data.workers.length; i++) {
                if (i === 0) {
                    workers = data.data.workers[i];
                } else {
                    workers = workers + " , " + data.data.workers[i];
                }
            };

            var isSecurityTools = "";
            if (data.data.isSecurityTools === "Yes") {
                isSecurityTools = "是";
            } else {
                isSecurityTools = "否";
            }

            var isSpareParts = "";
            if (data.data.isSpareParts === "Yes") {
                isSpareParts = "是";
            } else {
                isSpareParts = "否";
            }

            var sanPiaoZhiXing = "";
            if (data.data.sanPiaoZhiXing === "Yes") {
                sanPiaoZhiXing = "是";
            } else {
                sanPiaoZhiXing = "否";
            }

            // var securityTools = "";
            // for (var i = 0; i < data.data.securityTools.length; i++) {
            //     if (i === 0) {
            //         securityTools = data.data.securityTools[i];
            //     } else {
            //         securityTools =securityTools+ " , " + data.data.securityTools[i];
            //     }
            // };

            // var spareParts = "";
            // for (var i = 0; i < data.data.spareParts.length; i++) {
            //     if (i === 0) {
            //         spareParts = data.data.spareParts[i];
            //     } else {
            //         spareParts = spareParts+" , " + data.data.spareParts[i];
            //     }
            // };
            var securityTools = [];
            for (var i = 0; i < data.data.securityTools.length; i++) {
                securityTools.push((i + 1) + ". " + data.data.securityTools[i]);
            };

            var spareParts = [];
            for (var i = 0; i < data.data.spareParts.length; i++) {
                spareParts.push((i + 1) + ". " + data.data.spareParts[i]);
            };


            requestData.data.planreturntime = planreturntime;
            requestData.data.workers = workers;
            requestData.data.isSecurityTools = isSecurityTools;
            requestData.data.isSpareParts = isSpareParts;
            requestData.data.sanPiaoZhiXing = sanPiaoZhiXing;
            requestData.data.securityTools = securityTools;
            requestData.data.spareParts = spareParts;
            return requestData;
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
    padding-left: 15px;
    padding-right: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
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