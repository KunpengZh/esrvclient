export default {
  "UserManager": [
    {
      "id":"0001",
      "pathname":"/createNewUser",
      "menu":"新建用户",
      "event":"handleCreateNewUser"
    }
  ],
  "ConfigDocument":[
    {
      "id":"0001",
      "pathname":"/serviceCompany",
      "menu":"派工单位",
      "event":"switchView"
    },{
      "id":"0002",
      "pathname":"/companyAdmin",
      "menu":"派工人员",
      "event":"switchView"
    },{
      "id":"0003",
      "pathname":"/companyEmployee",
      "menu":"工作人员",
      "event":"switchView"
    },
    {
      "id":"0004",
      "pathname":"/showWorkCategory",
      "menu":"工作类别",
      "event":"switchView"
    },{
      "id":"0005",
      "pathname":"/workItem",
      "menu":"工作任务",
      "event":"switchView"
    },
    {
      "id":"0006",
      "pathname":"/securityTools",
      "menu":"安全工具",
      "event":"switchView"
    },
    {
      "id":"0007",
      "pathname":"/spareParts",
      "menu":"备品备件",
      "event":"switchView"
    }
  ],
  "WorkForm":[
    {
      "id":"0001",
      "pathname":"/createrequest",
      "menu":"新建派工单",
      "event":"switchView"
    }
  ],
  "WorkFormDetail":[
    {
      "id":"0001",
      "pathname":"/goback",
      "menu":"  返回前页",
      "event":"switchView"
    }
  ],
  "queryWorkform":[]
}
