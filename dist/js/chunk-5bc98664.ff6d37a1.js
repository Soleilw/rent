(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5bc98664"],{"365c":function(e,t,a){"use strict";var n=a("be3b"),r=a("99b1"),i=a.n(r),o={houser:function(e,t,a){return n["a"].get(i.a.HouseManagers,{page:e,limit:t,address_id:a})},audit:function(e,t){return n["a"].post(i.a.CheckManagers,{id:e,state:t})},addresses:function(e,t,a,r){return n["a"].get(i.a.Addresses,{page:e,limit:t,area_id:a,address:r})},rooms:function(e){return n["a"].post(i.a.Rooms,e)},households:function(e,t,a,r,o,l,s,u){return n["a"].get(i.a.Households,{page:e,limit:t,user_id:a,address_id:r,type:o,state:l,room_id:s,name:u})},searchHousehold:function(e,t,a){return n["a"].get(i.a.Households,{page:e,limit:t,name:a})},delHousehold:function(e){return n["a"].del(i.a.Household,{id:e})},banners:function(e,t){return n["a"].get(i.a.Banners,{page:e,limit:t})},banner:function(e){return n["a"].post(i.a.Banner,e)},message:function(e){return n["a"].post(i.a.Message,e)},messages:function(e,t){return n["a"].get(i.a.Messages,{page:e,limit:t})},messageType:function(e){return n["a"].post(i.a.MessageType,e)},messageTypes:function(e,t){return n["a"].get(i.a.MessageTypes,{page:e,limit:t})},delDocumentType:function(e){return n["a"].del(i.a.DelDocumentType,{id:e})},documents:function(e,t){return n["a"].get(i.a.Documents,{page:e,limit:t})},delDocument:function(e){return n["a"].del(i.a.DelDocument,{id:e})},document:function(e){return n["a"].post(i.a.Document,e)},documentDel:function(e){return n["a"].del(i.a.DocumentDel,{id:e})},delBanner:function(e){return n["a"].del(i.a.DelBanner,{id:e})},role:function(e){return n["a"].post(i.a.Role,e)},getRole:function(e,t){return n["a"].get(i.a.Role,{page:e,limit:t})},delRole:function(e){return n["a"].del(i.a.Role,{id:e})},user:function(e){return n["a"].post(i.a.User,e)},users:function(e,t){return n["a"].get(i.a.Users,{page:e,limit:t})},delUser:function(e){return n["a"].del(i.a.User,{id:e})},areas:function(e,t,a){return n["a"].get(i.a.Areas,{page:e,limit:t,parent_id:a})},buys:function(e,t){return n["a"].get(i.a.Buys,{page:e,limit:t})},buy:function(e){return n["a"].post(i.a.Buy,e)},server:function(e,t,a){return n["a"].get(i.a.Server,{page:e,limit:t,product_id:a})},setProduct:function(e){return n["a"].post(i.a.SetProduct,e)},userServes:function(e,t){return n["a"].get(i.a.UserServes,{user_id:e,addresses_id:t})},delServer:function(e){return n["a"].del(i.a.DelServer,{id:e})},dangerFace:function(e,t,a){return n["a"].get(i.a.DangerFace,{page:e,limit:t,address_id:a})}};t["a"]=o},"74e9":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("div",{staticClass:"btn"},[a("el-input",{staticClass:"search",attrs:{placeholder:"输入用户名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(e.renter_name)}},model:{value:e.renter_name,callback:function(t){e.renter_name=t},expression:"renter_name"}})],1),a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.search(e.renter_name)}}},[e._v("搜索")])],1),a("el-table",{attrs:{data:e.tableData,"empty-text":"暂无数据"}},[a("el-table-column",{attrs:{prop:"id",label:"用户ID",align:"center"}}),a("el-table-column",{attrs:{prop:"snapshot.name",label:"用户名",align:"center"}}),a("el-table-column",{attrs:{prop:"typeString",label:"用户身份",align:"center"}}),a("el-table-column",{attrs:{prop:"snapshot",label:"人脸照片",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.snapshot?a("div",[a("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[a("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.snapshot.href}}),a("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.snapshot.href},slot:"reference"})])],1):a("div",[a("span",[e._v("--暂无图片--")])])]}}])}),a("el-table-column",{attrs:{prop:"snapshot.phone",label:"手机号",align:"center"}}),a("el-table-column",{attrs:{prop:"snapshot.card_number",label:"身份证",align:"center",width:"200px"}}),a("el-table-column",{attrs:{prop:"address.address",label:"房屋地址",align:"center",width:"300px"}}),a("el-table-column",{attrs:{prop:"room.door_number",label:"房屋编号",align:"center"}}),a("el-table-column",{attrs:{prop:"state",label:"审核状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?a("div",[a("span",[e._v("待审核")])]):e._e(),2==t.row.state?a("div",[a("span",{staticStyle:{color:"green"}},[e._v("已通过")])]):e._e(),3==t.row.state?a("div",[a("span",{staticStyle:{color:"red"}},[e._v("未通过")])]):e._e()]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleLogs(t.$index,t.row)}}},[e._v("进出记录")]),1==t.row.state?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleAudit(t.$index,t.row)}}},[e._v("审核")]):e._e(),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.openServe(t.$index,t.row)}}},[e._v("开通服务")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.openedServe(t.$index,t.row)}}},[e._v("已开通的服务")]),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("el-dialog",{attrs:{title:"进出记录",visible:e.dialogLogs},on:{"update:visible":function(t){e.dialogLogs=t}}},[a("div",{staticClass:"box"},[a("el-table",{attrs:{data:e.logsData}},[a("el-table-column",{attrs:{prop:"id",label:"用户ID",align:"center"}}),a("el-table-column",{attrs:{prop:"id",label:"用户名",align:"center"}}),a("el-table-column",{attrs:{prop:"id",label:"手机号",align:"center"}}),a("el-table-column",{attrs:{prop:"id",label:"房屋名称",align:"center"}}),a("el-table-column",{attrs:{prop:"id",label:"房屋单元",align:"center"}}),a("el-table-column",{attrs:{prop:"id",label:"人脸照片",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{"min-width":"80px","min-height":"80px"},attrs:{src:e,alt:""}})]}}])}),a("el-table-column",{attrs:{prop:"id",label:"真实姓名",align:"center"}}),a("el-table-column",{attrs:{prop:"id",label:"用户身份",align:"center"}})],1)],1),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentLogsPage,"page-sizes":[10,20,30,40,50],"page-size":e.pageSizeLogs,layout:"sizes, prev, pager, next, jumper",total:e.totalLogsPage},on:{"current-change":e.handleCurrentLogs,"update:currentPage":function(t){e.currentLogsPage=t},"update:current-page":function(t){e.currentLogsPage=t},"size-change":e.handleSizeLogs}})],1)]),a("el-dialog",{attrs:{visible:e.dialogAudit,title:"审核",width:"20%",align:"center"},on:{"update:visible":function(t){e.dialogAudit=t}}},[a("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否通过审核")]),a("span",[a("el-button",{attrs:{type:"primary"},on:{click:e.toAudit}},[e._v("通过")]),a("el-button",{attrs:{type:"danger"},on:{click:e.unAudit}},[e._v("不通过")])],1)]),a("el-dialog",{attrs:{visible:e.dialogDel,title:"删除住户",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[a("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除该住户")]),a("span",[a("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)]),a("el-dialog",{attrs:{title:"开通服务",visible:e.dialogOpenServe,width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogOpenServe=t}}},[a("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[a("el-select",{attrs:{placeholder:"请选择需要开通的服务"},on:{change:e.serveChange},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}},e._l(e.serviceLists,(function(e){return a("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1)],1),a("div",[a("el-button",{attrs:{type:"primary"},on:{click:e.toConfirm}},[e._v("确定")]),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogOpenServe=!1}}},[e._v("取消")])],1)]),a("el-dialog",{attrs:{title:"进出记录",visible:e.dialogOpenedServe},on:{"update:visible":function(t){e.dialogOpenedServe=t}}},[a("div",{staticClass:"box"},[a("el-table",{attrs:{data:e.serviceList}},[a("el-table-column",{attrs:{prop:"id",label:"订单ID",align:"center"}}),a("el-table-column",{attrs:{prop:"name",label:"商品名称",align:"center"}}),a("el-table-column",{attrs:{prop:"time",label:"商品有效期(天)",align:"center"}}),a("el-table-column",{attrs:{prop:"expireTime",label:"到期时间",align:"center"}})],1)],1),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentLogsPage,"page-sizes":[10,20,30,40,50],"page-size":e.pageSizeLogs,layout:"sizes, prev, pager, next, jumper",total:e.totalLogsPage},on:{"current-change":e.handleCurrentLogs,"update:currentPage":function(t){e.currentLogsPage=t},"update:current-page":function(t){e.currentLogsPage=t},"size-change":e.handleSizeLogs}})],1)]),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40,50],"page-size":e.pageSize,layout:"sizes, prev, pager, next, jumper",total:e.totalPage},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange}})],1)],1)},r=[],i=a("365c"),o={data:function(){return{loading:!1,form:{identity:""},tableData:[],currentPage:1,pageSize:10,totalPage:0,dialogLogs:!1,logsData:[],currentLogsPage:1,pageSizeLogs:10,totalLogsPage:0,dialogAudit:!1,renter_id:"",renter_name:"",id:"",dialogDel:!1,dialogOpenServe:!1,dialogOpenedServe:!1,serviceLists:[],serviceList:[],title:"",product_id:"",serveForm:{user_id:"",area_id:"",product_id:"",address_id:""},user_id:"",addresses_id:""}},mounted:function(){this.getAllRent()},methods:{getAllRent:function(){var e=this;i["a"].households(e.currentPage,e.pageSize).then((function(t){e.tableData=t.data,e.totalPage=t.total}))},search:function(){var e=this;i["a"].searchHousehold(e.currentPage,e.pageSize,e.renter_name).then((function(t){e.tableData=t.data,e.totalPage=1,e.renter_name="",e.$message.success("搜索成功！")}))},handleLogs:function(){var e=this;e.dialogLogs=!0},handleAudit:function(e,t){var a=this;a.renter_id=t.id,a.dialogAudit=!0},toAudit:function(){var e=this;i["a"].audit(e.renter_id,2).then((function(t){e.$message.success("提交成功"),e.dialogAudit=!1,e.getAllRent()}))},unAudit:function(){var e=this;i["a"].audit(e.renter_id,3).then((function(t){e.$message.success("提交成功"),e.dialogAudit=!1,e.getAllRent()}))},serveChange:function(e){var t=this;t.serveForm.product_id=e,console.log(t.serveForm.product_id)},openServe:function(e,t){var a=this;console.log("openServe",e),console.log("openServe",t),a.dialogOpenServe=!0,a.serveForm={user_id:t.user_id,areas_id:t.address.area_id,product_id:a.product_id,addresses_id:t.address_id},i["a"].buys(a.currentPage,a.pageSize).then((function(e){console.log(e),a.serviceLists=e.data}))},openedServe:function(e,t){var a=this;a.dialogOpenedServe=!0,console.log("openedServe",t),a.user_id=t.user_id,a.addresses_id=t.address_id,i["a"].userServes(a.user_id,a.addresses_id).then((function(e){console.log(e),a.serviceList=e}))},toConfirm:function(){var e=this;console.log(e.serveForm),i["a"].setProduct(e.serveForm).then((function(t){console.log("toConfirm",t),e.$message.success("开通成功！"),e.dialogOpenServe=!1,e.title=""}))},handleDel:function(e,t){var a=this;a.id=t.id,a.dialogDel=!0},toDel:function(){var e=this;i["a"].delHousehold(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getAllRent()}))},handleCurrentChange:function(e){var t=this;t.currentPage=e,i["a"].households(e,t.pageSize).then((function(e){t.tableData=e.data}))},handleSizeChange:function(e){var t=this;t.pageSize=e,i["a"].households(t.currentPage,e).then((function(e){t.tableData=e.data,t.totalPage=e.total,t.currentPage=1}))},handleCurrentLogs:function(e){},handleSizeLogs:function(e){}}},l=o,s=(a("c01d"),a("2877")),u=Object(s["a"])(l,n,r,!1,null,"3f116934",null);t["default"]=u.exports},"9ab2":function(e,t,a){},c01d:function(e,t,a){"use strict";var n=a("9ab2"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-5bc98664.ff6d37a1.js.map