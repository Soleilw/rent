(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b17d1dc"],{"365c":function(e,t,a){"use strict";var n=a("be3b"),r=a("99b1"),i=a.n(r),o={houser:function(e,t,a){return n["a"].get(i.a.HouseManagers,{page:e,limit:t,address_id:a})},audit:function(e,t){return n["a"].post(i.a.CheckManagers,{id:e,state:t})},addresses:function(e,t,a,r){return n["a"].get(i.a.Addresses,{page:e,limit:t,area_id:a,address:r})},rooms:function(e){return n["a"].post(i.a.Rooms,e)},households:function(e,t,a,r,o,l,s,u){return n["a"].get(i.a.Households,{page:e,limit:t,user_id:a,address_id:r,type:o,state:l,room_id:s,name:u})},searchHousehold:function(e,t,a){return n["a"].get(i.a.Households,{page:e,limit:t,name:a})},delHousehold:function(e){return n["a"].del(i.a.Household,{id:e})},banners:function(e,t){return n["a"].get(i.a.Banners,{page:e,limit:t})},banner:function(e){return n["a"].post(i.a.Banner,e)},message:function(e){return n["a"].post(i.a.Message,e)},messages:function(e,t){return n["a"].get(i.a.Messages,{page:e,limit:t})},messageType:function(e){return n["a"].post(i.a.MessageType,e)},messageTypes:function(e,t){return n["a"].get(i.a.MessageTypes,{page:e,limit:t})},delDocumentType:function(e){return n["a"].del(i.a.DelDocumentType,{id:e})},documents:function(e,t){return n["a"].get(i.a.Documents,{page:e,limit:t})},delDocument:function(e){return n["a"].del(i.a.DelDocument,{id:e})},document:function(e){return n["a"].post(i.a.Document,e)},documentDel:function(e){return n["a"].del(i.a.DocumentDel,{id:e})},delBanner:function(e){return n["a"].del(i.a.DelBanner,{id:e})},role:function(e){return n["a"].post(i.a.Role,e)},getRole:function(e,t){return n["a"].get(i.a.Role,{page:e,limit:t})},delRole:function(e){return n["a"].del(i.a.Role,{id:e})},user:function(e){return n["a"].post(i.a.User,e)},users:function(e,t){return n["a"].get(i.a.Users,{page:e,limit:t})},delUser:function(e){return n["a"].del(i.a.User,{id:e})},areas:function(e,t,a){return n["a"].get(i.a.Areas,{page:e,limit:t,parent_id:a})},buys:function(e,t){return n["a"].get(i.a.Buys,{page:e,limit:t})},buy:function(e){return n["a"].post(i.a.Buy,e)},server:function(e,t,a){return n["a"].get(i.a.Server,{page:e,limit:t,product_id:a})},delServer:function(e){return n["a"].del(i.a.DelServer,{id:e})}};t["a"]=o},"60b0":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addBanner}},[e._v("添加轮播图")])],1),a("el-dialog",{attrs:{title:"上传图片",visible:e.dialogBanner,"close-on-click-modal":!1,width:"500px"},on:{"update:visible":function(t){e.dialogBanner=t}}},[a("div",{staticClass:"box"},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",[a("el-upload",{ref:"upload",attrs:{action:"https://api.fengniaotuangou.cn/api/upload",limit:1,"before-upload":e.beforeAvatarUpload,"on-change":e.handleChange,"on-success":e.handleAvatarSuccess,"on-remove":e.handleRemove,"on-exceed":e.handleExceed,"auto-upload":!1}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("选择图片")])],1),e.hasNewImage?a("div",{staticStyle:{color:"red","font-size":"12px"}},[e._v("* 点击文件名可删除所选图片")]):e._e(),a("div",{staticClass:"up-img"},[a("img",{staticClass:"pic-box",attrs:{src:e.form.href}})])],1),a("div",{staticClass:"submit"},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.upload}},[e._v("提交")])],1)],1)],1)],1)]),a("el-table",{attrs:{data:e.tableDate}},[a("el-table-column",{attrs:{prop:"id",label:"轮播图ID",align:"center"}}),a("el-table-column",{attrs:{prop:"href",label:"缩略图",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{src:e.row.href}})]}}])}),a("el-table-column",{attrs:{prop:"updated_at",label:"更新时间",align:"center"}}),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40,50],"page-size":10,layout:"sizes, prev, pager, next, jumper",total:e.totalPage},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange}})],1),a("el-dialog",{attrs:{visible:e.dialogDel,title:"删除轮播图",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[a("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除")]),a("span",[a("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)])],1)},r=[],i=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("365c")),o=a("bc3a"),l=a.n(o),s={name:"banner",data:function(){return{loading:!0,dialogBanner:!1,disabled:!1,dialogDel:!1,tableDate:[],currentPage:1,totalPage:0,qiniuaddr:"https://tu.fengniaotuangou.cn",hasNewImage:!1,form:{href:"",id:""}}},mounted:function(){this.getBanner()},methods:{getBanner:function(){var e=this;i["a"].banners(e.currentPage).then((function(t){e.tableDate=t.data,e.totalPage=t.total,e.loading=!1})).catch((function(t){e.loading=!1}))},handleDelete:function(e,t){var a=this;a.dialogDel=!0,a.id=t.id},toDel:function(){var e=this;e.dialogDel=!1,i["a"].delBanner(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getBanner(),e.currentPage=1}))},upload:function(){this.$refs.upload.submit()},addBanner:function(){var e=this;e.dialogBanner=!0,e.hasNewImage=!1,e.form.href="",e.$refs.upload&&e.$refs.upload.clearFiles()},handleRemove:function(e,t){var a=this;a.form.href="",a.hasNewImage=!1},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleChange:function(e){var t=this;t.form.href=URL.createObjectURL(e.raw),t.hasNewImage=!0},handleAvatarSuccess:function(e,t){var a=this;t.url=e.data,a.form.href=t.url,i["a"].banner(a.form).then((function(e){a.$message.success("上传成功"),a.currentPage=1,a.getBanner(),a.$refs.upload.clearFiles(),a.form.href="",a.form.id="",a.dialogBanner=!1}))},handleExceed:function(e,t){var a=this;a.$message.error("上传图片不能超过1张!"),a.$refs.upload.clearFiles(),a.form.href="",a.form.id=""},getQiniuToken:function(){var e=this;l.a.get("https://api.fengniaotuangou.cn/api/upload/token").then((function(t){e.imgData.token=t.data.uptoken}))},handleCurrentChange:function(e){var t=this;t.getBanner()},handleSizeChange:function(e){var t=this;i["a"].banners(t.currentPage,e).then((function(e){t.tableDate=e.data,t.totalPage=e.total}))}}},u=s,c=(a("be88"),a("2877")),d=Object(c["a"])(u,n,r,!1,null,"515d2b20",null);t["default"]=d.exports},bc3d:function(e,t,a){},be88:function(e,t,a){"use strict";var n=a("bc3d"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-1b17d1dc.9b32ff62.js.map