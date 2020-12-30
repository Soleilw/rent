(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77cfc1f5"],{"0978":function(e,t,a){"use strict";var s=a("e57f"),i=a.n(s);i.a},"52ee":function(e,t,a){},9953:function(e,t,a){"use strict";a.r(t);var s,i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"资讯管理",name:"manege"}},[a("message-manage")],1),a("el-tab-pane",{attrs:{label:"资讯类型",name:"type"}},[a("message-type")],1)],1)],1)},l=[],n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[a("div",{staticClass:"handle-box"},[a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addMessageMs}},[e._v("添加资讯")])],1)]),a("el-table",{attrs:{data:e.tableDate,border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[a("el-table-column",{attrs:{prop:"id",label:"资讯ID"}}),a("el-table-column",{attrs:{prop:"type.title",label:"资讯类型"}}),a("el-table-column",{attrs:{prop:"cover",label:"资讯缩略图"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{src:e.row.cover}})]}}])}),a("el-table-column",{attrs:{prop:"page_view",label:"资讯浏览量"}}),a("el-table-column",{attrs:{prop:"is_show",label:"推送状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.is_show?a("div",[a("span",[e._v("已推送")])]):e._e(),2==t.row.is_show?a("div",[a("span",[e._v("未推送")])]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"updated_at",label:"更新时间"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.current,"page-sizes":[10,20,30,40,50],"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1),a("el-dialog",{attrs:{visible:e.dialogMessageMs,title:"文档编辑",width:"60%"},on:{"update:visible":function(t){e.dialogMessageMs=t}}},[a("el-form",{attrs:{"label-width":"80px",model:e.form}},[a("el-form-item",{attrs:{label:"资讯标题"}},[a("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"资讯分类"}},[a("el-select",{attrs:{placeholder:"请选择资讯分类"},on:{change:e.typeChange},model:{value:e.form.type_id,callback:function(t){e.$set(e.form,"type_id",t)},expression:"form.type_id"}},e._l(e.typeList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"是否推送"}},[a("el-select",{attrs:{placeholder:"请选择是否推送"},on:{change:e.pushChange},model:{value:e.form.is_show,callback:function(t){e.$set(e.form,"is_show",t)},expression:"form.is_show"}},e._l(e.pushList,(function(e){return a("el-option",{key:e.is_show,attrs:{label:e.name,value:e.is_show}})})),1)],1),a("el-form-item",{attrs:{label:"资讯封面"}},[a("el-upload",{ref:"upload",attrs:{action:"https://api.fengniaotuangou.cn/api/upload",limit:1,"before-upload":e.beforeAvatarUpload,"on-success":e.handleAvatarSuccess,"on-remove":e.handleRemove,"on-exceed":e.handleExceed}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("选择图片")])],1),e.hasNewImage?a("div",{staticStyle:{color:"red","font-size":"12px"}},[e._v("* 点击文件名可删除所选图片")]):e._e(),a("div",{staticClass:"up-img"},[a("img",{staticClass:"pic-box",attrs:{src:e.imageUrl}})])],1),a("el-form-item",{attrs:{label:"资讯内容"}},[a("quill-editor",{ref:"myQuillEditor",staticStyle:{height:"430px",margin:"0 0 60px 0"},attrs:{options:e.editorOption},model:{value:e.form.detail,callback:function(t){e.$set(e.form,"detail",t)},expression:"form.detail"}}),a("el-upload",{staticClass:"avatar-uploader quill-img",staticStyle:{display:"none"},attrs:{action:"https://api.fengniaotuangou.cn/api/upload","before-upload":e.beforeUpload,"on-success":e.quillImgSuccess}},[a("el-button",{attrs:{size:"small",type:"primary",id:"imgInput","element-loading-text":"插入中,请稍候"}},[e._v("点击上传")])],1)],1),a("div",{staticClass:"submit"},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.newMessageMs}},[e._v("提交")])],1)],1)],1)],1),a("el-dialog",{attrs:{visible:e.dialogDel,title:"删除资讯",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[a("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除")]),a("span",[a("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)])],1)},o=[],r=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("365c")),c=a("953d"),u=(a("a7539"),a("8096"),a("14e1"),a("3022"),{name:"messagems",components:{quillEditor:c["quillEditor"]},data:function(){return{loading:!0,hasNewImage:!1,disabled:!1,dialogMessageMs:!1,dialogDel:!1,form:{id:"",type_id:"",title:"",detail:"",cover:"",is_show:""},title:"",typeList:[],pushList:[{is_show:1,name:"推送"},{is_show:2,name:"取消推送"}],editorOption:{placeholder:"请输入文档内容",theme:"snow",modules:{toolbar:{container:[["bold","italic","underline","strike"],["blockquote","code-block"],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image"]],handlers:{image:function(e){e?document.querySelector(".quill-img input").click():this.quill.format("image",!1)}}}}},tableDate:[],current:1,total:0,size:10,imageUrl:"",is_show:2,name:""}},mounted:function(){this.getMessageType(),this.getMessages(this.current,this.size)},methods:{getMessageType:function(){var e=this;r["a"].messageTypes(1).then((function(t){e.typeList=t.data}))},getMessages:function(e,t){var a=this;r["a"].messages(e,t).then((function(e){a.loading=!1,a.tableDate=e.data,a.total=e.total})).catch((function(e){a.loading=!1}))},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.getMessages(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.getMessages(1,e),t.current=1},addMessageMs:function(){var e=this;e.dialogMessageMs=!0,e.hasNewImage=!1,e.form={},e.imageUrl="",e.$refs.upload&&e.$refs.upload.clearFiles()},typeChange:function(e){this.form.type_id=e},pushChange:function(e){this.form.is_show=e},newMessageMs:function(){var e=this;r["a"].message(e.form).then((function(t){e.$message.success("提交成功"),e.dialogMessageMs=!1,e.getMessages(e.current,e.size),e.form={}}))},handleEdit:function(e,t){var a=this;a.dialogMessageMs=!0,a.form=t,a.form={id:t.id,type_id:t.type_id,title:t.title,detail:t.detail,cover:t.cover,is_show:t.is_show}},handleDelete:function(e,t){var a=this;a.dialogDel=!0,a.id=t.id},toDel:function(){var e=this;r["a"].documentDel(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getMessages(e.current,e.size)}))},beforeUpload:function(){s=this.$loading({lock:!0,text:"图片上传中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},quillImgSuccess:function(e,t){var a=this.$refs.myQuillEditor.quill;if(s.close(),e.data){var i=a.getSelection().index;a.insertEmbed(i,"image",e.data),a.setSelection(i+1)}else this.$message.error("图片插入失败")},handleRemove:function(e,t){var a=this;a.imageUrl="",a.hasNewImage=!1},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleAvatarSuccess:function(e,t){var a=this;a.imageUrl=URL.createObjectURL(t.raw),a.$message.success("上传成功"),a.form.cover=t.response.data,a.hasNewImage=!0},handleExceed:function(e,t){var a=this;a.$message.error("上传图片不能超过1张!"),a.$refs.upload.clearFiles(),a.imageUrl=""}}}),d=u,g=(a("bda75"),a("2877")),p=Object(g["a"])(d,n,o,!1,null,"46ea1d69",null),m=p.exports,f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[a("div",{staticClass:"handle-box"},[a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addMessageType}},[e._v("添加资讯类型")])],1)]),a("el-dialog",{attrs:{title:"新增资讯类型",visible:e.dialogMessageType,width:"40%"},on:{"update:visible":function(t){e.dialogMessageType=t}}},[a("div",{staticClass:"btn"},[a("el-form",{attrs:{model:e.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"资讯分类名"}},[a("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"资讯分类图标"}},[a("el-upload",{ref:"upload",attrs:{action:"https://api.fengniaotuangou.cn/api/upload",limit:1,"before-upload":e.beforeAvatarUpload,"on-success":e.handleAvatarSuccess,"on-remove":e.handleRemove,"on-exceed":e.handleExceed}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("选择图片")])],1),e.hasNewImage?a("div",{staticStyle:{color:"red","font-size":"12px"}},[e._v("* 点击文件名可删除所选图片")]):e._e(),a("div",{staticClass:"up-img"},[a("img",{staticClass:"pic-box",attrs:{src:e.form.href}})])],1)],1),a("div",{staticClass:"submit"},[a("el-button",{attrs:{type:"primary"},on:{click:e.newMessageType}},[e._v("提交")])],1)],1)]),a("el-table",{attrs:{data:e.tableDate,border:"","header-cell-style":{background:"#f0f0f0"}}},[a("el-table-column",{attrs:{prop:"id",label:"分类ID"}}),a("el-table-column",{attrs:{prop:"title",label:"分类标题"}}),a("el-table-column",{attrs:{prop:"href",label:"分类图标"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{src:e.row.href}})]}}])}),a("el-table-column",{attrs:{prop:"updated_at",label:"更新时间"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.current,"page-sizes":[10,20,30,40,50],"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1),a("el-dialog",{attrs:{visible:e.dialogDel,title:"删除资讯",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[a("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除")]),a("span",[a("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)])],1)},h=[],b={name:"messagetype",data:function(){return{loading:!0,hasNewImage:!1,dialogMessageType:!1,dialogDel:!1,form:{title:"",href:""},disabled:!1,tableDate:[],current:1,size:10,total:0}},mounted:function(){this.getMessageType(this.current,this.size)},methods:{getMessageType:function(e,t){var a=this;r["a"].messageTypes(e,t).then((function(e){a.loading=!1,a.tableDate=e.data,a.total=e.total})).catch((function(e){a.loading=!1}))},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.getMessageType(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.getMessageType(1,e),t.current=1},addMessageType:function(){var e=this;e.dialogMessageType=!0,e.hasNewImage=!1,e.form.href="",e.$refs.upload&&e.$refs.upload.clearFiles()},newMessageType:function(){var e=this;r["a"].messageType(e.form).then((function(t){e.$message.success("提交成功"),e.dialogMessageType=!1,e.getMessageType(e.current,e.size),e.form={}}))},handleDelete:function(e,t){var a=this;a.dialogDel=!0,a.id=t.id},toDel:function(){var e=this;e.dialogDel=!1,r["a"].delDocumentType(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getMessageType(e.current,e.size)}))},handleRemove:function(e,t){var a=this;a.form.href="",a.hasNewImage=!1},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleAvatarSuccess:function(e,t){var a=this;a.$message.success("上传成功"),a.form.href=t.response.data,a.hasNewImage=!0},handleExceed:function(e,t){var a=this;a.$message.error("上传图片不能超过1张!"),a.$refs.upload.clearFiles(),a.form.href="",a.form.title=""}}},v=b,y=(a("0978"),Object(g["a"])(v,f,h,!1,null,"ff4751f4",null)),_=y.exports,w={components:{messageManage:m,messageType:_},data:function(){return{activeName:"manege"}}},x=w,M=Object(g["a"])(x,i,l,!1,null,null,null);t["default"]=M.exports},bda75:function(e,t,a){"use strict";var s=a("52ee"),i=a.n(s);i.a},e57f:function(e,t,a){}}]);
//# sourceMappingURL=chunk-77cfc1f5.823eef4c.js.map