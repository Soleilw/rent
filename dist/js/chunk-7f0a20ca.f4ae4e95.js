(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f0a20ca"],{"108b":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[n("div",{staticClass:"handle-box"},[n("div",{staticClass:"btn"},[n("el-button",{attrs:{type:"primary"},on:{click:e.addPosition}},[e._v("发布职位")])],1)]),n("el-dialog",{attrs:{visible:e.dialogPosition,title:"发布职位",width:"85%"},on:{"update:visible":function(t){e.dialogPosition=t}}},[n("el-form",{attrs:{"label-width":"150px",model:e.positionInfo}},[n("el-form-item",{attrs:{label:"公司名称"}},[n("el-input",{model:{value:e.positionInfo.name,callback:function(t){e.$set(e.positionInfo,"name",t)},expression:"positionInfo.name"}})],1),n("el-form-item",{attrs:{label:"公司简介"}},[n("el-input",{model:{value:e.positionInfo.intro,callback:function(t){e.$set(e.positionInfo,"intro",t)},expression:"positionInfo.intro"}})],1),n("el-form-item",{attrs:{label:"职位名称"}},[n("el-input",{model:{value:e.positionInfo.share_title,callback:function(t){e.$set(e.positionInfo,"share_title",t)},expression:"positionInfo.share_title"}})],1),n("div",{staticClass:"ipt-box"},[n("el-form-item",{attrs:{label:"联系方式"}},[n("el-input",{model:{value:e.positionInfo.price,callback:function(t){e.$set(e.positionInfo,"price",t)},expression:"positionInfo.price"}})],1),n("el-form-item",{attrs:{label:"联系方式"}},[n("el-input",{model:{value:e.positionInfo.vip_price,callback:function(t){e.$set(e.positionInfo,"vip_price",t)},expression:"positionInfo.vip_price"}})],1),n("el-form-item",{attrs:{label:"简历投递E-mail"}},[n("el-input",{model:{value:e.positionInfo.freight,callback:function(t){e.$set(e.positionInfo,"freight",t)},expression:"positionInfo.freight"}})],1)],1),n("el-form-item",{attrs:{label:"公司logo"}},[n("el-upload",{ref:"upload",attrs:{action:"https://api.fengniaotuangou.cn/api/upload",limit:1,"before-upload":e.beforeAvatarUpload,"on-success":e.handleAvatarSuccess,"on-remove":e.handleRemove,"file-list":e.files,"on-exceed":e.handleExceed,"list-type":"picture-card","on-change":e.handleChange,"auto-upload":!0}},[n("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1),n("el-form-item",{attrs:{label:"职位描述"}},[n("quill-editor",{ref:"myQuillEditor",staticStyle:{height:"430px",margin:"0 0 60px 0"},attrs:{options:e.editorOption},model:{value:e.positionInfo.detail,callback:function(t){e.$set(e.positionInfo,"detail",t)},expression:"positionInfo.detail"}}),n("el-upload",{staticClass:"avatar-uploader quill-img",staticStyle:{display:"none"},attrs:{action:"https://api.fengniaotuangou.cn/api/upload","before-upload":e.beforeUpload,"on-success":e.quillImgSuccess}},[n("el-button",{attrs:{size:"small",type:"primary",id:"imgInput","element-loading-text":"插入中,请稍候"}},[e._v("点击上传 ")])],1)],1),n("div",{staticClass:"submit"},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.newPosition}},[e._v("提交")])],1)],1)],1)],1),n("el-table",{attrs:{data:e.tableData,"empty-text":"暂无数据",border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[n("el-table-column",{attrs:{prop:"id",label:"ID"}}),n("el-table-column",{attrs:{prop:"name",label:"名称"}}),n("el-table-column",{attrs:{prop:"img",label:"图片",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.img?n("div",[n("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[n("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.img}}),n("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.img},slot:"reference"})])],1):n("div",[n("span",[e._v("--暂无图片--")])])]}}])}),n("el-table-column",{attrs:{prop:"created_at",label:"创建时间",width:"180"}}),n("el-table-column",{attrs:{label:"操作",width:"200px"}})],1)],1)},a=[],o=(n("365c"),n("8d81"),n("953d")),r=(n("a7539"),n("8096"),n("14e1"),{components:{quillEditor:o["quillEditor"]},data:function(){return{loading:!1,tableData:[],current:1,size:10,total:0,positionInfo:{},dialogPosition:!1,files:[],editorOption:{placeholder:"请输入文档内容",theme:"snow",modules:{toolbar:{container:[["bold","italic","underline","strike"],["blockquote","code-block"],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image"]],handlers:{image:function(e){e?document.querySelector(".quill-img input").click():this.quill.format("image",!1)}}}}}}},methods:{addPosition:function(){},newPosition:function(){},beforeUpload:function(){loading=this.$loading({lock:!0,text:"图片上传中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},quillImgSuccess:function(e,t){var n=this.$refs.myQuillEditor.quill;if(loading.close(),e.data){var i=n.getSelection().index;n.insertEmbed(i,"image",e.data),n.setSelection(i+1)}else this.$message.error("图片插入失败")},handleRemove:function(e,t){var n=this;n.files=t,n.goodsInfo.img=""},beforeAvatarUpload:function(e){var t=307200;return t||this.$message.error("上传图片大小不能超过300KB"),t},handleAvatarSuccess:function(e,t){var n=this;n.positionInfo.img=t.response.data},handleExceed:function(e,t){var n=this;n.$message.error("上传图片不能超过1张!")},handleChange:function(e,t){var n=this;n.files=t}}}),s=r,u=(n("e456"),n("2877")),l=Object(u["a"])(s,i,a,!1,null,"65e2c334",null);t["default"]=l.exports},"365c":function(e,t,n){"use strict";var i=n("be3b"),a=n("99b1"),o=n.n(a),r={houser:function(e,t,n){return i["a"].get(o.a.HouseManagers,{page:e,limit:t,address_id:n})},audit:function(e,t,n){return i["a"].post(o.a.CheckManagers,{id:e,state:t,self:n})},addresses:function(e,t,n,a){return i["a"].get(o.a.Addresses,{page:e,limit:t,area_id:n,address:a})},rooms:function(e){return i["a"].post(o.a.Rooms,e)},gainRooms:function(e,t,n){return i["a"].get(o.a.Rooms,{page:e,limit:t,address_id:n})},delBuilding:function(e){return i["a"].del(o.a.DelBuilding,{id:e})},pushAddressFace:function(e){return i["a"].post(o.a.PushAddressFace,{address_id:e})},createAddress:function(e){return i["a"].post(o.a.CreateAddress,e)},gainAddress:function(e,t){return i["a"].get(o.a.GainAddress,{page:e,limit:t})},addressState:function(e){return i["a"].post(o.a.AddressState,e)},visitorCode:function(e){return i["a"].post(o.a.VisitorCode,e)},households:function(e,t,n,a,r,s,u,l){return i["a"].get(o.a.Households,{page:e,limit:t,user_id:n,address_id:a,type:r,state:s,room_id:u,name:l})},addressResidents:function(e,t,n,a){return i["a"].get(o.a.AddressResidents,{page:e,limit:t,address_id:n,type:a})},addResSearch:function(e,t,n,a){return i["a"].get(o.a.AddressResidents,{page:e,limit:t,address_id:n,name:a})},faceLogs:function(e,t,n){return i["a"].get(o.a.FaceLogs,{page:e,limit:t,face_id:n})},searchHousehold:function(e,t,n,a,r,s){return i["a"].get(o.a.Households,{page:e,limit:t,name:n,keyword:a,type:r,state:s})},delHousehold:function(e,t){return i["a"].del(o.a.Household,{id:e,self:t})},banners:function(e,t){return i["a"].get(o.a.Banners,{page:e,limit:t})},banner:function(e){return i["a"].post(o.a.Banner,e)},message:function(e){return i["a"].post(o.a.Message,e)},messages:function(e,t){return i["a"].get(o.a.Messages,{page:e,limit:t})},messageType:function(e){return i["a"].post(o.a.MessageType,e)},messageTypes:function(e,t){return i["a"].get(o.a.MessageTypes,{page:e,limit:t})},delDocumentType:function(e){return i["a"].del(o.a.DelDocumentType,{id:e})},documents:function(e,t){return i["a"].get(o.a.Documents,{page:e,limit:t})},delDocument:function(e){return i["a"].del(o.a.DelDocument,{id:e})},document:function(e){return i["a"].post(o.a.Document,e)},documentDel:function(e){return i["a"].del(o.a.DocumentDel,{id:e})},delBanner:function(e){return i["a"].del(o.a.DelBanner,{id:e})},role:function(e){return i["a"].post(o.a.Role,e)},getRole:function(e,t){return i["a"].get(o.a.Role,{page:e,limit:t})},delRole:function(e){return i["a"].del(o.a.Role,{id:e})},user:function(e){return i["a"].post(o.a.User,e)},users:function(e,t){return i["a"].get(o.a.Users,{page:e,limit:t})},delUser:function(e){return i["a"].del(o.a.User,{id:e})},areas:function(e,t,n){return i["a"].get(o.a.Areas,{page:e,limit:t,parent_id:n})},buys:function(e,t){return i["a"].get(o.a.Buys,{page:e,limit:t})},buy:function(e){return i["a"].post(o.a.Buy,e)},server:function(e,t,n,a,r){return i["a"].get(o.a.Server,{page:e,limit:t,product_id:n,keyword:a,areas_id:r})},setProduct:function(e){return i["a"].post(o.a.SetProduct,e)},userServes:function(e,t){return i["a"].get(o.a.UserServes,{user_id:e,face_id:t})},delServer:function(e){return i["a"].del(o.a.DelServer,{id:e})},dangerFace:function(e,t,n){return i["a"].get(o.a.DangerFace,{page:e,limit:t,address_id:n})},addDangerFace:function(e){return i["a"].post(o.a.DangerFace,e)},address:function(e,t,n){return i["a"].get(o.a.Address,{page:e,limit:t,area_id:n})},dangerLog:function(e,t,n){return i["a"].get(o.a.DangerLog,{page:e,limit:t,danger_id:n})},failFace:function(e){return i["a"].post(o.a.FailFace,{id:e})},pushFace:function(e){return i["a"].post(o.a.PushFace,{id:e})},statistics:function(e,t,n,a){return i["a"].get(o.a.Statistics,{page:e,limit:t,area_id:n,address_id:a})},visitors:function(e,t,n,a){return i["a"].get(o.a.Visitors,{page:e,limit:t,address_id:n,room_id:a})},matchFace:function(e,t){return i["a"].post(o.a.MatchFace,{user_id:e,self:t})},verifyPerson:function(e){return i["a"].post(o.a.VerifyPerson,e)},creation:function(e){return i["a"].post(o.a.Creation,e)},userInfo:function(e){return i["a"].get(o.a.UserInfo,{name:e})},editFace:function(e,t,n,a){return i["a"].post(o.a.EditFace,{user_id:e,self:t,href:n,id:a})},getConfigs:function(){return i["a"].get(o.a.Configs)},delFaceSwitch:function(e){return i["a"].del(o.a.Configs,{id:e})},faceSwitch:function(e){return i["a"].post(o.a.Configs,e)},withdraws:function(e,t,n,a){return i["a"].get(o.a.Withdraws,{page:e,limit:t,name:n,keyword:a})},createRaw:function(e){return i["a"].post(o.a.CreateRaw,e)},withdraw:function(e){return i["a"].post(o.a.Withdraw,{id:e})},withdrawsRec:function(e,t,n,a){return i["a"].get(o.a.WithdrawsRec,{page:e,limit:t,user_id:n,address_id:a})},delWhite:function(e){return i["a"].del(o.a.DelWhite,{id:e})},rent:function(e,t,n,a){return i["a"].get(o.a.Households,{page:e,limit:t,address_id:n,type:a})},commission:function(e,t,n,a){return i["a"].get(o.a.Commission,{page:e,limit:t,name:n,keyword:a})},createCommission:function(e){return i["a"].post(o.a.CreateCommission,e)},notCommission:function(e){return i["a"].get(o.a.NotCommission,{area_id:e})},commissionRec:function(e,t,n){return i["a"].get(o.a.CommissionRec,{page:e,limit:t,address_id:n})},commissionRecord:function(e,t,n){return i["a"].get(o.a.CommissionRecord,{page:e,limit:t,address_id:n})},delCommission:function(e){return i["a"].del(o.a.DelCommission,{id:e})},payCommission:function(e){return i["a"].post(o.a.PayCommission,{id:e})},passLose:function(e){return i["a"].post(o.a.PassLose,{addresses_id:e})},roomMenber:function(e,t){return i["a"].get(o.a.RoomMenber,{address_id:e,room_id:t})}};t["a"]=r},"8d81":function(e,t,n){var i;(function(a){"use strict";function o(e,t){var n=(65535&e)+(65535&t),i=(e>>16)+(t>>16)+(n>>16);return i<<16|65535&n}function r(e,t){return e<<t|e>>>32-t}function s(e,t,n,i,a,s){return o(r(o(o(t,e),o(i,s)),a),n)}function u(e,t,n,i,a,o,r){return s(t&n|~t&i,e,t,a,o,r)}function l(e,t,n,i,a,o,r){return s(t&i|n&~i,e,t,a,o,r)}function d(e,t,n,i,a,o,r){return s(t^n^i,e,t,a,o,r)}function c(e,t,n,i,a,o,r){return s(n^(t|~i),e,t,a,o,r)}function f(e,t){var n,i,a,r,s;e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;var f=1732584193,p=-271733879,m=-1732584194,g=271733878;for(n=0;n<e.length;n+=16)i=f,a=p,r=m,s=g,f=u(f,p,m,g,e[n],7,-680876936),g=u(g,f,p,m,e[n+1],12,-389564586),m=u(m,g,f,p,e[n+2],17,606105819),p=u(p,m,g,f,e[n+3],22,-1044525330),f=u(f,p,m,g,e[n+4],7,-176418897),g=u(g,f,p,m,e[n+5],12,1200080426),m=u(m,g,f,p,e[n+6],17,-1473231341),p=u(p,m,g,f,e[n+7],22,-45705983),f=u(f,p,m,g,e[n+8],7,1770035416),g=u(g,f,p,m,e[n+9],12,-1958414417),m=u(m,g,f,p,e[n+10],17,-42063),p=u(p,m,g,f,e[n+11],22,-1990404162),f=u(f,p,m,g,e[n+12],7,1804603682),g=u(g,f,p,m,e[n+13],12,-40341101),m=u(m,g,f,p,e[n+14],17,-1502002290),p=u(p,m,g,f,e[n+15],22,1236535329),f=l(f,p,m,g,e[n+1],5,-165796510),g=l(g,f,p,m,e[n+6],9,-1069501632),m=l(m,g,f,p,e[n+11],14,643717713),p=l(p,m,g,f,e[n],20,-373897302),f=l(f,p,m,g,e[n+5],5,-701558691),g=l(g,f,p,m,e[n+10],9,38016083),m=l(m,g,f,p,e[n+15],14,-660478335),p=l(p,m,g,f,e[n+4],20,-405537848),f=l(f,p,m,g,e[n+9],5,568446438),g=l(g,f,p,m,e[n+14],9,-1019803690),m=l(m,g,f,p,e[n+3],14,-187363961),p=l(p,m,g,f,e[n+8],20,1163531501),f=l(f,p,m,g,e[n+13],5,-1444681467),g=l(g,f,p,m,e[n+2],9,-51403784),m=l(m,g,f,p,e[n+7],14,1735328473),p=l(p,m,g,f,e[n+12],20,-1926607734),f=d(f,p,m,g,e[n+5],4,-378558),g=d(g,f,p,m,e[n+8],11,-2022574463),m=d(m,g,f,p,e[n+11],16,1839030562),p=d(p,m,g,f,e[n+14],23,-35309556),f=d(f,p,m,g,e[n+1],4,-1530992060),g=d(g,f,p,m,e[n+4],11,1272893353),m=d(m,g,f,p,e[n+7],16,-155497632),p=d(p,m,g,f,e[n+10],23,-1094730640),f=d(f,p,m,g,e[n+13],4,681279174),g=d(g,f,p,m,e[n],11,-358537222),m=d(m,g,f,p,e[n+3],16,-722521979),p=d(p,m,g,f,e[n+6],23,76029189),f=d(f,p,m,g,e[n+9],4,-640364487),g=d(g,f,p,m,e[n+12],11,-421815835),m=d(m,g,f,p,e[n+15],16,530742520),p=d(p,m,g,f,e[n+2],23,-995338651),f=c(f,p,m,g,e[n],6,-198630844),g=c(g,f,p,m,e[n+7],10,1126891415),m=c(m,g,f,p,e[n+14],15,-1416354905),p=c(p,m,g,f,e[n+5],21,-57434055),f=c(f,p,m,g,e[n+12],6,1700485571),g=c(g,f,p,m,e[n+3],10,-1894986606),m=c(m,g,f,p,e[n+10],15,-1051523),p=c(p,m,g,f,e[n+1],21,-2054922799),f=c(f,p,m,g,e[n+8],6,1873313359),g=c(g,f,p,m,e[n+15],10,-30611744),m=c(m,g,f,p,e[n+6],15,-1560198380),p=c(p,m,g,f,e[n+13],21,1309151649),f=c(f,p,m,g,e[n+4],6,-145523070),g=c(g,f,p,m,e[n+11],10,-1120210379),m=c(m,g,f,p,e[n+2],15,718787259),p=c(p,m,g,f,e[n+9],21,-343485551),f=o(f,i),p=o(p,a),m=o(m,r),g=o(g,s);return[f,p,m,g]}function p(e){var t,n="",i=32*e.length;for(t=0;t<i;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}function m(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;var i=8*e.length;for(t=0;t<i;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}function g(e){return p(f(m(e),8*e.length))}function h(e,t){var n,i,a=m(e),o=[],r=[];for(o[15]=r[15]=void 0,a.length>16&&(a=f(a,8*e.length)),n=0;n<16;n+=1)o[n]=909522486^a[n],r[n]=1549556828^a[n];return i=f(o.concat(m(t)),512+8*t.length),p(f(r.concat(i),640))}function b(e){var t,n,i="0123456789abcdef",a="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),a+=i.charAt(t>>>4&15)+i.charAt(15&t);return a}function v(e){return unescape(encodeURIComponent(e))}function _(e){return g(v(e))}function y(e){return b(_(e))}function w(e,t){return h(v(e),v(t))}function C(e,t){return b(w(e,t))}function x(e,t,n){return t?n?w(t,e):C(t,e):n?_(e):y(e)}i=function(){return x}.call(t,n,t,e),void 0===i||(e.exports=i)})()},af70:function(e,t,n){},e456:function(e,t,n){"use strict";var i=n("af70"),a=n.n(i);a.a}}]);
//# sourceMappingURL=chunk-7f0a20ca.f4ae4e95.js.map