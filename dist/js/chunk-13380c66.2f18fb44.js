(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13380c66"],{"365c":function(e,t,n){"use strict";var a=n("be3b"),i=n("99b1"),r=n.n(i),o={houser:function(e,t,n){return a["a"].get(r.a.HouseManagers,{page:e,limit:t,address_id:n})},audit:function(e,t,n){return a["a"].post(r.a.CheckManagers,{id:e,state:t,self:n})},addresses:function(e,t,n,i){return a["a"].get(r.a.Addresses,{page:e,limit:t,area_id:n,address:i})},rooms:function(e){return a["a"].post(r.a.Rooms,e)},gainRooms:function(e,t,n){return a["a"].get(r.a.Rooms,{page:e,limit:t,address_id:n})},delBuilding:function(e){return a["a"].del(r.a.DelBuilding,{id:e})},pushAddressFace:function(e){return a["a"].post(r.a.PushAddressFace,{address_id:e})},createAddress:function(e){return a["a"].post(r.a.CreateAddress,e)},gainAddress:function(e,t){return a["a"].get(r.a.GainAddress,{page:e,limit:t})},addressState:function(e){return a["a"].post(r.a.AddressState,e)},visitorCode:function(e){return a["a"].post(r.a.VisitorCode,e)},households:function(e,t,n,i,o,s,u,l){return a["a"].get(r.a.Households,{page:e,limit:t,user_id:n,address_id:i,type:o,state:s,room_id:u,name:l})},addressResidents:function(e,t,n,i){return a["a"].get(r.a.AddressResidents,{page:e,limit:t,address_id:n,type:i})},faceLogs:function(e,t,n){return a["a"].get(r.a.FaceLogs,{page:e,limit:t,face_id:n})},searchHousehold:function(e,t,n,i){return a["a"].get(r.a.Households,{page:e,limit:t,name:n,keyword:i})},delHousehold:function(e,t){return a["a"].del(r.a.Household,{id:e,self:t})},banners:function(e,t){return a["a"].get(r.a.Banners,{page:e,limit:t})},banner:function(e){return a["a"].post(r.a.Banner,e)},message:function(e){return a["a"].post(r.a.Message,e)},messages:function(e,t){return a["a"].get(r.a.Messages,{page:e,limit:t})},messageType:function(e){return a["a"].post(r.a.MessageType,e)},messageTypes:function(e,t){return a["a"].get(r.a.MessageTypes,{page:e,limit:t})},delDocumentType:function(e){return a["a"].del(r.a.DelDocumentType,{id:e})},documents:function(e,t){return a["a"].get(r.a.Documents,{page:e,limit:t})},delDocument:function(e){return a["a"].del(r.a.DelDocument,{id:e})},document:function(e){return a["a"].post(r.a.Document,e)},documentDel:function(e){return a["a"].del(r.a.DocumentDel,{id:e})},delBanner:function(e){return a["a"].del(r.a.DelBanner,{id:e})},role:function(e){return a["a"].post(r.a.Role,e)},getRole:function(e,t){return a["a"].get(r.a.Role,{page:e,limit:t})},delRole:function(e){return a["a"].del(r.a.Role,{id:e})},user:function(e){return a["a"].post(r.a.User,e)},users:function(e,t){return a["a"].get(r.a.Users,{page:e,limit:t})},delUser:function(e){return a["a"].del(r.a.User,{id:e})},areas:function(e,t,n){return a["a"].get(r.a.Areas,{page:e,limit:t,parent_id:n})},buys:function(e,t){return a["a"].get(r.a.Buys,{page:e,limit:t})},buy:function(e){return a["a"].post(r.a.Buy,e)},server:function(e,t,n,i,o){return a["a"].get(r.a.Server,{page:e,limit:t,product_id:n,keyword:i,areas_id:o})},setProduct:function(e){return a["a"].post(r.a.SetProduct,e)},userServes:function(e,t){return a["a"].get(r.a.UserServes,{user_id:e,face_id:t})},delServer:function(e){return a["a"].del(r.a.DelServer,{id:e})},dangerFace:function(e,t,n){return a["a"].get(r.a.DangerFace,{page:e,limit:t,address_id:n})},addDangerFace:function(e){return a["a"].post(r.a.DangerFace,e)},address:function(e,t,n){return a["a"].get(r.a.Address,{page:e,limit:t,area_id:n})},dangerLog:function(e,t,n){return a["a"].get(r.a.DangerLog,{page:e,limit:t,danger_id:n})},failFace:function(e){return a["a"].post(r.a.FailFace,{id:e})},pushFace:function(e){return a["a"].post(r.a.PushFace,{id:e})},statistics:function(e,t,n,i){return a["a"].get(r.a.Statistics,{page:e,limit:t,area_id:n,address_id:i})},visitors:function(e,t,n,i){return a["a"].get(r.a.Visitors,{page:e,limit:t,address_id:n,room_id:i})},matchFace:function(e,t){return a["a"].post(r.a.MatchFace,{user_id:e,self:t})},verifyPerson:function(e){return a["a"].post(r.a.VerifyPerson,e)},creation:function(e){return a["a"].post(r.a.Creation,e)},userInfo:function(e){return a["a"].get(r.a.UserInfo,{name:e})},editFace:function(e,t,n,i){return a["a"].post(r.a.EditFace,{user_id:e,self:t,href:n,id:i})},getConfigs:function(){return a["a"].get(r.a.Configs)},delFaceSwitch:function(e){return a["a"].del(r.a.Configs,{id:e})},faceSwitch:function(e){return a["a"].post(r.a.Configs,e)},withdraws:function(e,t,n,i){return a["a"].get(r.a.Withdraws,{page:e,limit:t,name:n,keyword:i})},createRaw:function(e){return a["a"].post(r.a.CreateRaw,e)},withdraw:function(e){return a["a"].post(r.a.Withdraw,{id:e})},withdrawsRec:function(e,t,n,i){return a["a"].get(r.a.WithdrawsRec,{page:e,limit:t,user_id:n,address_id:i})},delWhite:function(e){return a["a"].del(r.a.DelWhite,{id:e})},rent:function(e,t,n,i){return a["a"].get(r.a.Households,{page:e,limit:t,address_id:n,type:i})},commission:function(e,t,n,i){return a["a"].get(r.a.Commission,{page:e,limit:t,name:n,keyword:i})},createCommission:function(e){return a["a"].post(r.a.CreateCommission,e)},notCommission:function(e){return a["a"].get(r.a.NotCommission,{area_id:e})},commissionRec:function(e,t,n){return a["a"].get(r.a.CommissionRec,{page:e,limit:t,address_id:n})},commissionRecord:function(e,t,n){return a["a"].get(r.a.CommissionRecord,{page:e,limit:t,address_id:n})},delCommission:function(e){return a["a"].del(r.a.DelCommission,{id:e})},payCommission:function(e){return a["a"].post(r.a.PayCommission,{id:e})}};t["a"]=o},"58d5":function(e,t,n){"use strict";n.r(t);var a,i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[n("div",{staticClass:"handle-box"},[n("div",{staticClass:"btn"},[n("el-button",{attrs:{type:"primary"},on:{click:e.addDocument}},[e._v("添加文档")])],1)]),n("el-dialog",{attrs:{visible:e.dialogDocument,title:"文档编辑",width:"60%"},on:{"update:visible":function(t){e.dialogDocument=t}}},[n("el-form",{attrs:{"label-width":"80px",model:e.form}},[n("el-form-item",{attrs:{label:"文档标题"}},[n("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),n("el-form-item",{attrs:{label:"文档内容"}},[n("quill-editor",{ref:"myQuillEditor",staticStyle:{height:"430px",margin:"0 0 60px 0"},attrs:{options:e.editorOption},model:{value:e.form.detail,callback:function(t){e.$set(e.form,"detail",t)},expression:"form.detail"}}),n("el-upload",{staticClass:"avatar-uploader quill-img",staticStyle:{display:"none"},attrs:{action:"https://api.fengniaotuangou.cn/api/upload","before-upload":e.beforeUpload,"on-success":e.quillImgSuccess}},[n("el-button",{attrs:{size:"small",type:"primary",id:"imgInput","element-loading-text":"插入中,请稍候"}},[e._v("点击上传")])],1)],1),n("div",{staticClass:"submit"},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.newDocument}},[e._v("提交")])],1)],1)],1)],1),n("el-table",{attrs:{data:e.tableDate,border:"","header-cell-style":{background:"#f0f0f0"}}},[n("el-table-column",{attrs:{prop:"id",label:"文档ID"}}),n("el-table-column",{attrs:{prop:"title",label:"文档标题"}}),n("el-table-column",{attrs:{prop:"updated_at",label:"更新时间"}}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),n("el-dialog",{attrs:{visible:e.dialogDel,title:"删除年级",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[n("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除该文档")]),n("span",[n("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),n("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)]),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":e.current,"page-sizes":[10,20,30,40,50],"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1)],1)},r=[],o=n("365c"),s=n("953d"),u=(n("a7539"),n("8096"),n("14e1"),{name:"document",components:{quillEditor:s["quillEditor"]},data:function(){return{loading:!0,dialogDocument:!1,form:{title:"",detail:""},editorOption:{placeholder:"请输入文档内容",theme:"snow",modules:{toolbar:{container:[["bold","italic","underline","strike"],["blockquote","code-block"],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image"]],handlers:{image:function(e){e?document.querySelector(".quill-img input").click():this.quill.format("image",!1)}}}}},tableDate:[],dialogDel:!1,id:"",current:1,size:10,total:0}},mounted:function(){this.getDocument(this.current,this.size)},methods:{getDocument:function(e,t){var n=this;o["a"].documents(e,t).then((function(e){n.loading=!1,n.tableDate=e.data,n.total=e.total})).catch((function(e){n.loading=!1}))},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.getDocument(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.getDocument(1,e),t.current=1},addDocument:function(){var e=this;e.dialogDocument=!0,e.form={}},newDocument:function(){var e=this;o["a"].document(e.form).then((function(t){e.$message.success("提交成功"),e.dialogDocument=!1,e.getDocument(e.current,e.size),e.form={}}))},beforeUpload:function(){a=this.$loading({lock:!0,text:"图片上传中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},quillImgSuccess:function(e,t){var n=this.$refs.myQuillEditor.quill;if(a.close(),e.data){var i=n.getSelection().index;n.insertEmbed(i,"image",e.data),n.setSelection(i+1)}else this.$message.error("图片插入失败")},handleEdit:function(e,t){var n=this;n.dialogDocument=!0,n.form=t},handleDelete:function(e,t){var n=this;n.dialogDel=!0,n.id=t.id},toDel:function(){var e=this;o["a"].delDocument(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getDocument(e.current,e.size)}))}}}),l=u,d=n("2877"),c=Object(d["a"])(l,i,r,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-13380c66.2f18fb44.js.map