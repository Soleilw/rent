(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-99b053e8"],{"365c":function(e,t,a){"use strict";var n=a("be3b"),i=a("99b1"),r=a.n(i),o={houser:function(e,t,a){return n["a"].get(r.a.HouseManagers,{page:e,limit:t,address_id:a})},audit:function(e,t){return n["a"].post(r.a.CheckManagers,{id:e,state:t})},addresses:function(e,t,a,i){return n["a"].get(r.a.Addresses,{page:e,limit:t,area_id:a,address:i})},rooms:function(e){return n["a"].post(r.a.Rooms,e)},gainRooms:function(e,t,a){return n["a"].get(r.a.Rooms,{page:e,limit:t,address_id:a})},delBuilding:function(e){return n["a"].del(r.a.DelBuilding,{id:e})},households:function(e,t,a,i,o,l,s,u){return n["a"].get(r.a.Households,{page:e,limit:t,user_id:a,address_id:i,type:o,state:l,room_id:s,name:u})},addressResidents:function(e,t,a,i){return n["a"].get(r.a.AddressResidents,{page:e,limit:t,address_id:a,type:i})},faceLogs:function(e,t,a){return n["a"].get(r.a.FaceLogs,{page:e,limit:t,face_id:a})},searchHousehold:function(e,t,a){return n["a"].get(r.a.Households,{page:e,limit:t,name:a})},searchAddress:function(e,t,a){return n["a"].get(r.a.Households,{page:e,limit:t,keyword:a})},delHousehold:function(e){return n["a"].del(r.a.Household,{id:e})},banners:function(e,t){return n["a"].get(r.a.Banners,{page:e,limit:t})},banner:function(e){return n["a"].post(r.a.Banner,e)},message:function(e){return n["a"].post(r.a.Message,e)},messages:function(e,t){return n["a"].get(r.a.Messages,{page:e,limit:t})},messageType:function(e){return n["a"].post(r.a.MessageType,e)},messageTypes:function(e,t){return n["a"].get(r.a.MessageTypes,{page:e,limit:t})},delDocumentType:function(e){return n["a"].del(r.a.DelDocumentType,{id:e})},documents:function(e,t){return n["a"].get(r.a.Documents,{page:e,limit:t})},delDocument:function(e){return n["a"].del(r.a.DelDocument,{id:e})},document:function(e){return n["a"].post(r.a.Document,e)},documentDel:function(e){return n["a"].del(r.a.DocumentDel,{id:e})},delBanner:function(e){return n["a"].del(r.a.DelBanner,{id:e})},role:function(e){return n["a"].post(r.a.Role,e)},getRole:function(e,t){return n["a"].get(r.a.Role,{page:e,limit:t})},delRole:function(e){return n["a"].del(r.a.Role,{id:e})},user:function(e){return n["a"].post(r.a.User,e)},users:function(e,t){return n["a"].get(r.a.Users,{page:e,limit:t})},delUser:function(e){return n["a"].del(r.a.User,{id:e})},areas:function(e,t,a){return n["a"].get(r.a.Areas,{page:e,limit:t,parent_id:a})},buys:function(e,t){return n["a"].get(r.a.Buys,{page:e,limit:t})},buy:function(e){return n["a"].post(r.a.Buy,e)},server:function(e,t,a,i,o){return n["a"].get(r.a.Server,{page:e,limit:t,product_id:a,keyword:i,areas_id:o})},setProduct:function(e){return n["a"].post(r.a.SetProduct,e)},userServes:function(e,t){return n["a"].get(r.a.UserServes,{user_id:e,addresses_id:t})},delServer:function(e){return n["a"].del(r.a.DelServer,{id:e})},dangerFace:function(e,t,a){return n["a"].get(r.a.DangerFace,{page:e,limit:t,address_id:a})},addDangerFace:function(e){return n["a"].post(r.a.DangerFace,e)},address:function(e,t,a){return n["a"].get(r.a.Address,{page:e,limit:t,area_id:a})},dangerLog:function(e,t,a){return n["a"].get(r.a.DangerLog,{page:e,limit:t,danger_id:a})},statistics:function(e,t,a,i){return n["a"].get(r.a.Statistics,{page:e,limit:t,area_id:a,address_id:i})}};t["a"]=o},"58d5":function(e,t,a){"use strict";a.r(t);var n,i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"handle-box"},[a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addDocument}},[e._v("添加文档")])],1)]),a("el-dialog",{attrs:{visible:e.dialogDocument,title:"文档编辑"},on:{"update:visible":function(t){e.dialogDocument=t}}},[a("div",{staticClass:"box"},[a("div",{staticStyle:{margin:"0 10px"}},[a("h3",{staticStyle:{height:"40px","line-height":"40px"}},[e._v("文档标题")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.form.title,expression:"form.title"}],staticStyle:{width:"100%",height:"30px","line-height":"30px","font-size":"15px"},attrs:{type:"text"},domProps:{value:e.form.title},on:{input:function(t){t.target.composing||e.$set(e.form,"title",t.target.value)}}}),a("h3",{staticStyle:{height:"40px","line-height":"40px"}},[e._v("文档内容")]),a("quill-editor",{ref:"myQuillEditor",staticStyle:{height:"430px",margin:"0 0 60px 0"},attrs:{options:e.editorOption},model:{value:e.form.detail,callback:function(t){e.$set(e.form,"detail",t)},expression:"form.detail"}}),a("el-upload",{staticClass:"avatar-uploader quill-img",staticStyle:{display:"none"},attrs:{action:"https://api.fengniaotuangou.cn/api/upload","before-upload":e.beforeUpload,"on-success":e.quillImgSuccess}},[a("el-button",{attrs:{size:"small",type:"primary",id:"imgInput","element-loading-text":"插入中,请稍候"}},[e._v("点击上传")])],1),a("div",{staticClass:"submit"},[a("el-button",{attrs:{type:"primary"},on:{click:e.newDocument}},[e._v("提交")])],1)],1)])]),a("el-table",{attrs:{data:e.tableDate,border:"","header-cell-style":{background:"#f0f0f0"}}},[a("el-table-column",{attrs:{label:"名称",type:"selection"}}),a("el-table-column",{attrs:{prop:"id",label:"文档ID"}}),a("el-table-column",{attrs:{prop:"title",label:"文档标题"}}),a("el-table-column",{attrs:{prop:"updated_at",label:"更新时间"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("el-dialog",{attrs:{visible:e.dialogDel,title:"删除年级",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[a("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除该文档")]),a("span",[a("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)]),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40,50],"page-size":10,layout:"sizes, prev, pager, next, jumper",total:e.totalPage},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange}})],1)],1)},r=[],o=a("365c"),l=a("953d"),s=(a("a7539"),a("8096"),a("14e1"),{name:"document",components:{quillEditor:l["quillEditor"]},data:function(){return{dialogDocument:!1,form:{title:"",detail:""},editorOption:{placeholder:"请输入文档内容",theme:"snow",modules:{toolbar:{container:[["bold","italic","underline","strike"],["blockquote","code-block"],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image"]],handlers:{image:function(e){e?document.querySelector(".quill-img input").click():this.quill.format("image",!1)}}}}},tableDate:[],dialogDel:!1,id:"",currentPage:1,totalPage:0}},mounted:function(){this.getDocument()},methods:{getDocument:function(){var e=this;o["a"].documents(e.currentPage).then((function(t){e.tableDate=t.data,e.totalPage=t.total}))},newDocument:function(){var e=this;o["a"].document(e.form).then((function(t){e.$message.success("提交成功"),e.dialogDocument=!1,e.getDocument(),e.form={},e.currentPage=1}))},addDocument:function(){var e=this;e.dialogDocument=!0,e.form={title:"",detail:""}},beforeUpload:function(){n=this.$loading({lock:!0,text:"图片上传中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},quillImgSuccess:function(e,t){var a=this.$refs.myQuillEditor.quill;if(n.close(),e.data){var i=a.getSelection().index;a.insertEmbed(i,"image",e.data),a.setSelection(i+1)}else this.$message.error("图片插入失败")},handleEdit:function(e,t){var a=this;a.dialogDocument=!0,a.form=t},handleDelete:function(e,t){var a=this;a.dialogDel=!0,a.id=t.id},toDel:function(){var e=this;o["a"].delDocument(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getDocument(),e.currentPage=1}))},handleCurrentChange:function(e){var t=this;t.getDocument()},handleSizeChange:function(e){var t=this;o["a"].documents(t.currentPage,e).then((function(e){t.tableDate=e.data,t.totalPage=e.total}))}}}),u=s,c=a("2877"),d=Object(c["a"])(u,i,r,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-99b053e8.417d8b45.js.map