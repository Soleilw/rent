(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-157fa938"],{"0badd":function(e,t,n){"use strict";var a=n("f193"),r=n.n(a);r.a},"28a0":function(e,t){"function"===typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},3022:function(e,t,n){(function(e){var a=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),n={},a=0;a<t.length;a++)n[t[a]]=Object.getOwnPropertyDescriptor(e,t[a]);return n},r=/%[sdj%]/g;t.format=function(e){if(!x(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(s(arguments[n]));return t.join(" ")}n=1;for(var a=arguments,o=a.length,i=String(e).replace(r,(function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(a[n++]);case"%d":return Number(a[n++]);case"%j":try{return JSON.stringify(a[n++])}catch(t){return"[Circular]"}default:return e}})),l=a[n];n<o;l=a[++n])v(l)||!P(l)?i+=" "+l:i+=" "+s(l);return i},t.deprecate=function(n,a){if("undefined"!==typeof e&&!0===e.noDeprecation)return n;if("undefined"===typeof e)return function(){return t.deprecate(n,a).apply(this,arguments)};var r=!1;function o(){if(!r){if(e.throwDeprecation)throw new Error(a);e.traceDeprecation?console.trace(a):console.error(a),r=!0}return n.apply(this,arguments)}return o};var o,i={};function s(e,n){var a={seen:[],stylize:c};return arguments.length>=3&&(a.depth=arguments[2]),arguments.length>=4&&(a.colors=arguments[3]),y(n)?a.showHidden=n:n&&t._extend(a,n),C(a.showHidden)&&(a.showHidden=!1),C(a.depth)&&(a.depth=2),C(a.colors)&&(a.colors=!1),C(a.customInspect)&&(a.customInspect=!0),a.colors&&(a.stylize=l),d(a,e,a.depth)}function l(e,t){var n=s.styles[t];return n?"["+s.colors[n][0]+"m"+e+"["+s.colors[n][1]+"m":e}function c(e,t){return e}function u(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}function d(e,n,a){if(e.customInspect&&n&&O(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var r=n.inspect(a,e);return x(r)||(r=d(e,r,a)),r}var o=p(e,n);if(o)return o;var i=Object.keys(n),s=u(i);if(e.showHidden&&(i=Object.getOwnPropertyNames(n)),R(n)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return f(n);if(0===i.length){if(O(n)){var l=n.name?": "+n.name:"";return e.stylize("[Function"+l+"]","special")}if(D(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(S(n))return e.stylize(Date.prototype.toString.call(n),"date");if(R(n))return f(n)}var c,y="",v=!1,_=["{","}"];if(b(n)&&(v=!0,_=["[","]"]),O(n)){var k=n.name?": "+n.name:"";y=" [Function"+k+"]"}return D(n)&&(y=" "+RegExp.prototype.toString.call(n)),S(n)&&(y=" "+Date.prototype.toUTCString.call(n)),R(n)&&(y=" "+f(n)),0!==i.length||v&&0!=n.length?a<0?D(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),c=v?m(e,n,a,s,i):i.map((function(t){return g(e,n,a,s,t,v)})),e.seen.pop(),h(c,y,_)):_[0]+y+_[1]}function p(e,t){if(C(t))return e.stylize("undefined","undefined");if(x(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return k(t)?e.stylize(""+t,"number"):y(t)?e.stylize(""+t,"boolean"):v(t)?e.stylize("null","null"):void 0}function f(e){return"["+Error.prototype.toString.call(e)+"]"}function m(e,t,n,a,r){for(var o=[],i=0,s=t.length;i<s;++i)$(t,String(i))?o.push(g(e,t,n,a,String(i),!0)):o.push("");return r.forEach((function(r){r.match(/^\d+$/)||o.push(g(e,t,n,a,r,!0))})),o}function g(e,t,n,a,r,o){var i,s,l;if(l=Object.getOwnPropertyDescriptor(t,r)||{value:t[r]},l.get?s=l.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):l.set&&(s=e.stylize("[Setter]","special")),$(a,r)||(i="["+r+"]"),s||(e.seen.indexOf(l.value)<0?(s=v(n)?d(e,l.value,null):d(e,l.value,n-1),s.indexOf("\n")>-1&&(s=o?s.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+s.split("\n").map((function(e){return"   "+e})).join("\n"))):s=e.stylize("[Circular]","special")),C(i)){if(o&&r.match(/^\d+$/))return s;i=JSON.stringify(""+r),i.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(i=i.substr(1,i.length-2),i=e.stylize(i,"name")):(i=i.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),i=e.stylize(i,"string"))}return i+": "+s}function h(e,t,n){var a=e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0);return a>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function b(e){return Array.isArray(e)}function y(e){return"boolean"===typeof e}function v(e){return null===e}function _(e){return null==e}function k(e){return"number"===typeof e}function x(e){return"string"===typeof e}function w(e){return"symbol"===typeof e}function C(e){return void 0===e}function D(e){return P(e)&&"[object RegExp]"===j(e)}function P(e){return"object"===typeof e&&null!==e}function S(e){return P(e)&&"[object Date]"===j(e)}function R(e){return P(e)&&("[object Error]"===j(e)||e instanceof Error)}function O(e){return"function"===typeof e}function A(e){return null===e||"boolean"===typeof e||"number"===typeof e||"string"===typeof e||"symbol"===typeof e||"undefined"===typeof e}function j(e){return Object.prototype.toString.call(e)}function z(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(n){if(C(o)&&(o=Object({NODE_ENV:"production",BASE_URL:"/"}).NODE_DEBUG||""),n=n.toUpperCase(),!i[n])if(new RegExp("\\b"+n+"\\b","i").test(o)){var a=e.pid;i[n]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",n,a,e)}}else i[n]=function(){};return i[n]},t.inspect=s,s.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},s.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=b,t.isBoolean=y,t.isNull=v,t.isNullOrUndefined=_,t.isNumber=k,t.isString=x,t.isSymbol=w,t.isUndefined=C,t.isRegExp=D,t.isObject=P,t.isDate=S,t.isError=R,t.isFunction=O,t.isPrimitive=A,t.isBuffer=n("d60a");var E=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function F(){var e=new Date,t=[z(e.getHours()),z(e.getMinutes()),z(e.getSeconds())].join(":");return[e.getDate(),E[e.getMonth()],t].join(" ")}function $(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",F(),t.format.apply(t,arguments))},t.inherits=n("28a0"),t._extend=function(e,t){if(!t||!P(t))return e;var n=Object.keys(t),a=n.length;while(a--)e[n[a]]=t[n[a]];return e};var U="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function L(e,t){if(!e){var n=new Error("Promise was rejected with a falsy value");n.reason=e,e=n}return t(e)}function G(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');function n(){for(var n=[],a=0;a<arguments.length;a++)n.push(arguments[a]);var r=n.pop();if("function"!==typeof r)throw new TypeError("The last argument must be of type Function");var o=this,i=function(){return r.apply(o,arguments)};t.apply(this,n).then((function(t){e.nextTick(i,null,t)}),(function(t){e.nextTick(L,t,i)}))}return Object.setPrototypeOf(n,Object.getPrototypeOf(t)),Object.defineProperties(n,a(t)),n}t.promisify=function(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');if(U&&e[U]){var t=e[U];if("function"!==typeof t)throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,U,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,n,a=new Promise((function(e,a){t=e,n=a})),r=[],o=0;o<arguments.length;o++)r.push(arguments[o]);r.push((function(e,a){e?n(e):t(a)}));try{e.apply(this,r)}catch(i){n(i)}return a}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),U&&Object.defineProperty(t,U,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,a(e))},t.promisify.custom=U,t.callbackify=G}).call(this,n("4362"))},"365c":function(e,t,n){"use strict";var a=n("be3b"),r=n("99b1"),o=n.n(r),i={houser:function(e,t,n){return a["a"].get(o.a.HouseManagers,{page:e,limit:t,address_id:n})},audit:function(e,t,n){return a["a"].post(o.a.CheckManagers,{id:e,state:t,self:n})},auditFamily:function(e,t,n){return a["a"].post(o.a.CheckManagers,{id:e,state:t,self:n})},addresses:function(e,t,n,r){return a["a"].get(o.a.Addresses,{page:e,limit:t,area_id:n,address:r})},rooms:function(e){return a["a"].post(o.a.Rooms,e)},gainRooms:function(e,t,n){return a["a"].get(o.a.Rooms,{page:e,limit:t,address_id:n})},delBuilding:function(e){return a["a"].del(o.a.DelBuilding,{id:e})},households:function(e,t,n,r,i,s,l,c){return a["a"].get(o.a.Households,{page:e,limit:t,user_id:n,address_id:r,type:i,state:s,room_id:l,name:c})},addressResidents:function(e,t,n,r){return a["a"].get(o.a.AddressResidents,{page:e,limit:t,address_id:n,type:r})},faceLogs:function(e,t,n){return a["a"].get(o.a.FaceLogs,{page:e,limit:t,face_id:n})},searchHousehold:function(e,t,n){return a["a"].get(o.a.Households,{page:e,limit:t,name:n})},searchAddress:function(e,t,n){return a["a"].get(o.a.Households,{page:e,limit:t,keyword:n})},delHousehold:function(e,t){return a["a"].del(o.a.Household,{id:e,self:t})},banners:function(e,t){return a["a"].get(o.a.Banners,{page:e,limit:t})},banner:function(e){return a["a"].post(o.a.Banner,e)},message:function(e){return a["a"].post(o.a.Message,e)},messages:function(e,t){return a["a"].get(o.a.Messages,{page:e,limit:t})},messageType:function(e){return a["a"].post(o.a.MessageType,e)},messageTypes:function(e,t){return a["a"].get(o.a.MessageTypes,{page:e,limit:t})},delDocumentType:function(e){return a["a"].del(o.a.DelDocumentType,{id:e})},documents:function(e,t){return a["a"].get(o.a.Documents,{page:e,limit:t})},delDocument:function(e){return a["a"].del(o.a.DelDocument,{id:e})},document:function(e){return a["a"].post(o.a.Document,e)},documentDel:function(e){return a["a"].del(o.a.DocumentDel,{id:e})},delBanner:function(e){return a["a"].del(o.a.DelBanner,{id:e})},role:function(e){return a["a"].post(o.a.Role,e)},getRole:function(e,t){return a["a"].get(o.a.Role,{page:e,limit:t})},delRole:function(e){return a["a"].del(o.a.Role,{id:e})},user:function(e){return a["a"].post(o.a.User,e)},users:function(e,t){return a["a"].get(o.a.Users,{page:e,limit:t})},delUser:function(e){return a["a"].del(o.a.User,{id:e})},areas:function(e,t,n){return a["a"].get(o.a.Areas,{page:e,limit:t,parent_id:n})},buys:function(e,t){return a["a"].get(o.a.Buys,{page:e,limit:t})},buy:function(e){return a["a"].post(o.a.Buy,e)},server:function(e,t,n,r,i){return a["a"].get(o.a.Server,{page:e,limit:t,product_id:n,keyword:r,areas_id:i})},setProduct:function(e){return a["a"].post(o.a.SetProduct,e)},userServes:function(e,t){return a["a"].get(o.a.UserServes,{user_id:e,addresses_id:t})},delServer:function(e){return a["a"].del(o.a.DelServer,{id:e})},dangerFace:function(e,t,n){return a["a"].get(o.a.DangerFace,{page:e,limit:t,address_id:n})},addDangerFace:function(e){return a["a"].post(o.a.DangerFace,e)},address:function(e,t,n){return a["a"].get(o.a.Address,{page:e,limit:t,area_id:n})},dangerLog:function(e,t,n){return a["a"].get(o.a.DangerLog,{page:e,limit:t,danger_id:n})},failFace:function(e){return a["a"].post(o.a.FailFace,{id:e})},pushFace:function(e){return a["a"].post(o.a.PushFace,{id:e})},statistics:function(e,t,n,r){return a["a"].get(o.a.Statistics,{page:e,limit:t,area_id:n,address_id:r})},visitors:function(e,t,n,r){return a["a"].get(o.a.Visitors,{page:e,limit:t,address_id:n,room_id:r})},matchFace:function(e,t){return a["a"].post(o.a.MatchFace,{user_id:e,self:t})},verifyPerson:function(e,t){return a["a"].post(o.a.VerifyPerson,{user_id:e,self:t})},creation:function(e){return a["a"].post(o.a.Creation,e)},userInfo:function(e){return a["a"].get(o.a.UserInfo,{name:e})},editFace:function(e,t,n){return a["a"].post(o.a.EditFace,{user_id:e,self:t,href:n})}};t["a"]=i},b7cc:function(e,t,n){"use strict";var a=n("d9f3"),r=n.n(a);r.a},b9e5:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-tabs",{on:{"tab-click":e.changeActive},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"角色管理",name:"role"}},[n("v-role")],1),n("el-tab-pane",{attrs:{label:"用户管理",name:"user"}},[n("v-user")],1)],1)],1)},r=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"handle-box"},[n("div",{staticClass:"btn"},[n("el-button",{attrs:{type:"primary"},on:{click:e.addRole}},[e._v("添加角色")])],1)]),n("el-table",{attrs:{data:e.tableData,border:"","header-cell-style":{background:"#f0f0f0"}}},[n("el-table-column",{attrs:{prop:"id",label:"ID"}}),n("el-table-column",{attrs:{prop:"name",label:"角色名"}}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑权限")]),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),n("el-dialog",{attrs:{visible:e.dialogDel,title:"删除角色",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[n("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除该角色")]),n("span",[n("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),n("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)]),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40,50],"page-size":10,layout:"sizes, prev, pager, next, jumper",total:e.totalPage},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange}})],1),n("el-dialog",{attrs:{title:"添加角色",visible:e.dialogRole,width:"50%","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogRole=t}}},[n("div",{staticClass:"box"},[n("el-form",{attrs:{model:e.form,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"角色名称"}},[n("el-input",{attrs:{placeholder:"请输入角色名",disabled:e.disabledRole},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),n("el-form-item",{attrs:{label:"选择权限"}},[n("el-checkbox",{on:{change:e.AllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),n("div",{staticClass:"permission"},[n("el-checkbox-group",{staticClass:"permission-item",model:{value:e.form.permissions,callback:function(t){e.$set(e.form,"permissions",t)},expression:"form.permissions"}},[n("el-checkbox",{attrs:{label:"resident",border:""},on:{change:e.oneChange}},[n("span",{staticStyle:{"font-weight":"bold"}},[e._v("住户管理页")])]),n("el-checkbox",{attrs:{label:"residentGet"},on:{change:e.oneChange}},[e._v("获取住户")])],1)],1),n("div",{staticClass:"permission"},[n("el-checkbox-group",{staticClass:"permission-item",model:{value:e.form.permissions,callback:function(t){e.$set(e.form,"permissions",t)},expression:"form.permissions"}},[n("el-checkbox",{attrs:{label:"house",border:""},on:{change:e.oneChange}},[n("span",{staticStyle:{"font-weight":"bold"}},[e._v("房屋管理页")])]),n("el-checkbox",{attrs:{label:"houses"},on:{change:e.oneChange}},[e._v("房屋列表")]),n("el-checkbox",{attrs:{label:"housesAdd"},on:{change:e.oneChange}},[e._v("新增房屋")]),n("el-checkbox",{attrs:{label:"housesGet"},on:{change:e.oneChange}},[e._v("获取房屋")])],1)],1),n("div",{staticClass:"permission"},[n("el-checkbox-group",{staticClass:"permission-item",model:{value:e.form.permissions,callback:function(t){e.$set(e.form,"permissions",t)},expression:"form.permissions"}},[n("el-checkbox",{attrs:{label:"picture",border:""},on:{change:e.oneChange}},[n("span",{staticStyle:{"font-weight":"bold"}},[e._v("图文管理")])]),n("el-checkbox",{attrs:{label:"banner"},on:{change:e.oneChange}},[e._v("轮播图")]),n("el-checkbox",{attrs:{label:"bannerAdd"},on:{change:e.oneChange}},[e._v("添加轮播图")]),n("el-checkbox",{attrs:{label:"bannerGet"},on:{change:e.oneChange}},[e._v("获取轮播图")]),n("el-checkbox",{attrs:{label:"bannerDel"},on:{change:e.oneChange}},[e._v("删除轮播图")]),n("el-checkbox",{attrs:{label:"document"},on:{change:e.oneChange}},[e._v("文档管理")]),n("el-checkbox",{attrs:{label:"documentAdd"},on:{change:e.oneChange}},[e._v("添加文档")]),n("el-checkbox",{attrs:{label:"documentGet"},on:{change:e.oneChange}},[e._v("获取文档")]),n("el-checkbox",{attrs:{label:"documentDel"},on:{change:e.oneChange}},[e._v("删除文档")]),n("el-checkbox",{attrs:{label:"documentEdit"},on:{change:e.oneChange}},[e._v("编辑文档")])],1)],1),n("div",{staticClass:"permission"},[n("el-checkbox-group",{staticClass:"permission-item",model:{value:e.form.permissions,callback:function(t){e.$set(e.form,"permissions",t)},expression:"form.permissions"}},[n("el-checkbox",{attrs:{label:"message",border:""},on:{change:e.oneChange}},[n("span",{staticStyle:{"font-weight":"bold"}},[e._v("资讯管理")])]),n("el-checkbox",{attrs:{label:"message"},on:{change:e.oneChange}},[e._v("资讯管理")]),n("el-checkbox",{attrs:{label:"messageAdd"},on:{change:e.oneChange}},[e._v("添加资讯")]),n("el-checkbox",{attrs:{label:"messageGet"},on:{change:e.oneChange}},[e._v("获取资讯")]),n("el-checkbox",{attrs:{label:"messageDel"},on:{change:e.oneChange}},[e._v("删除资讯")]),n("el-checkbox",{attrs:{label:"messageEdit"},on:{change:e.oneChange}},[e._v("编辑")]),n("el-checkbox",{attrs:{label:"typeAdd"},on:{change:e.oneChange}},[e._v("添加资讯类型")]),n("el-checkbox",{attrs:{label:"typeGet"},on:{change:e.oneChange}},[e._v("获取资讯类型")]),n("el-checkbox",{attrs:{label:"typeDel"},on:{change:e.oneChange}},[e._v("删除")])],1)],1),n("div",{staticClass:"permission"},[n("el-checkbox-group",{staticClass:"permission-item",model:{value:e.form.permissions,callback:function(t){e.$set(e.form,"permissions",t)},expression:"form.permissions"}},[n("el-checkbox",{attrs:{label:"permission",border:""},on:{change:e.oneChange}},[n("span",{staticStyle:{"font-weight":"bold"}},[e._v("角色管理页")])]),n("el-checkbox",{attrs:{label:"roleAdd"},on:{change:e.oneChange}},[e._v("新增角色")]),n("el-checkbox",{attrs:{label:"roleDel"},on:{change:e.oneChange}},[e._v("删除角色")]),n("el-checkbox",{attrs:{label:"roleEdit"},on:{change:e.oneChange}},[e._v("编辑权限")]),n("el-checkbox",{attrs:{label:"roleGet"},on:{change:e.oneChange}},[e._v("获取角色列表")])],1)],1),n("div",{staticClass:"permission",staticStyle:{"margin-left":"140px"}},[n("el-checkbox-group",{staticClass:"permission-item",model:{value:e.form.permissions,callback:function(t){e.$set(e.form,"permissions",t)},expression:"form.permissions"}},[n("el-checkbox",{attrs:{label:"manageAdd"},on:{change:e.oneChange}},[e._v("新增管理员")]),n("el-checkbox",{attrs:{label:"manageDel"},on:{change:e.oneChange}},[e._v("删除管理员")]),n("el-checkbox",{attrs:{label:"manageEdit"},on:{change:e.oneChange}},[e._v("编辑管理员")]),n("el-checkbox",{attrs:{label:"manageGet"},on:{change:e.oneChange}},[e._v("管理员列表")]),n("el-checkbox",{attrs:{label:"manageResetPwd"},on:{change:e.oneChange}},[e._v("重置密码")])],1)],1),n("div",{staticClass:"permission"},[n("el-checkbox-group",{staticClass:"permission-item",model:{value:e.form.permissions,callback:function(t){e.$set(e.form,"permissions",t)},expression:"form.permissions"}},[n("el-checkbox",{attrs:{label:"buy",border:""},on:{change:e.oneChange}},[n("span",{staticStyle:{"font-weight":"bold"}},[e._v("购买服务管理页")])]),n("el-checkbox",{attrs:{label:"buyAdd"},on:{change:e.oneChange}},[e._v("添加购买服务")]),n("el-checkbox",{attrs:{label:"compileBuy"},on:{change:e.oneChange}},[e._v("编辑服务")]),n("el-checkbox",{attrs:{label:"orderServe"},on:{change:e.oneChange}},[e._v("服务订单")]),n("el-checkbox",{attrs:{label:"checkBuy"},on:{change:e.oneChange}},[e._v("查询服务")]),n("el-checkbox",{attrs:{label:"delBuy"},on:{change:e.oneChange}},[e._v("删除")])],1)],1)],1),n("div",{staticClass:"submit"},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.newRole}},[e._v("提交")])],1)],1)],1)],1)])],1)},i=[],s=(n("b0c0"),n("365c")),l=(n("3022"),{data:function(){return{dialogRole:!1,form:{title:"",name:"",permissions:[]},stateList:[{label:"启用",value:1},{label:"禁用",value:0}],tableData:[],checkAll:!1,permissionList:["resident","residentGet","house","houses","housesAdd","housesGet","picture","banner","bannerAdd","bannerGet","bannerDel","message","messageAdd","messageGet","messageDel","messageEdit","typeAdd","typeGet","typeDel","document","documentAdd","documentGet","documentDel","documentEdit","buy","buyAdd","compileBuy","orderServe","delBuy","checkBuy","suspected","permission","roleGet","roleAdd","roleEdit","roleDel","manageGet","manageAdd","manageEdit","manageDel","manageResetPwd"],dialogDel:!1,id:"",disabledRole:!1,currentPage:1,totalPage:0}},mounted:function(){this.getRoles()},methods:{addRole:function(){var e=this;e.dialogRole=!0,e.form={title:"",name:"",permissions:[]},e.disabledRole=!1,e.checkAll=!0,!0===e.checkAll&&(e.form.permissions=e.checkAll?e.permissionList:[])},getRoles:function(){var e=this;s["a"].getRole(e.currentPage).then((function(t){e.tableData=t.data,e.totalPage=t.total}))},newRole:function(){var e=this;e.form.name=e.form.title,s["a"].role(e.form).then((function(t){e.dialogRole=!1,e.$message.success("提交成功"),e.getRoles(),e.currentPage=1,e.form={},e.form.permissions=[]}))},handleEdit:function(e,t){var n=this;n.dialogRole=!0,n.disabledRole=!0,n.form=t,n.form.permissions=t.permissions,n.checkAll=t.permissions.length>=n.permissionList.length},AllChange:function(e){var t=this;t.form.permissions=e?t.permissionList:[]},oneChange:function(e){var t=this;console.log(t.form.permissions),t.checkAll=t.form.permissions.length>=t.permissionList.length},handleDel:function(e,t){var n=this;n.dialogDel=!0,n.id=t.id},toDel:function(){var e=this;s["a"].delRole(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getRoles(),e.currentPage=1}))},handleCurrentChange:function(e){var t=this;t.getRoles()},handleSizeChange:function(e){}}}),c=l,u=(n("b7cc"),n("2877")),d=Object(u["a"])(c,o,i,!1,null,"8ae338dc",null),p=d.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"handle-box"},[n("div",{staticClass:"btn"},[n("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("添加用户")])],1)]),n("el-table",{attrs:{data:e.tableData,border:"","header-cell-style":{background:"#f0f0f0"}}},[n("el-table-column",{attrs:{prop:"id",label:"ID"}}),n("el-table-column",{attrs:{prop:"name",label:"账号"}}),n("el-table-column",{attrs:{prop:"role",label:"角色名"}}),n("el-table-column",{attrs:{prop:"community",label:"社区"}}),n("el-table-column",{attrs:{prop:"enable",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{domProps:{textContent:e._s("1"==t.row.enable?"启用":"禁用")}})]}}])}),n("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return e.handleReset(t.$index,t.row)}}},[e._v("重置密码")]),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),n("el-dialog",{attrs:{visible:e.dialogDel,title:"删除角色",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[n("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除该角色")]),n("span",[n("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),n("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)]),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40,50],"page-size":10,layout:"sizes, prev, pager, next, jumper",total:e.totalPage},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange}})],1),n("el-dialog",{attrs:{title:"添加用户",visible:e.dialogUser,width:"60%","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogUser=t}}},[n("div",{staticClass:"box"},[n("el-form",{attrs:{model:e.form,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"账号"}},[n("el-input",{attrs:{placeholder:"请输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),n("el-form-item",{attrs:{label:"输入密码"}},[n("el-input",{attrs:{placeholder:"请输入密码",type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),n("el-form-item",{attrs:{label:"选择角色"}},[n("el-select",{attrs:{placeholder:"请选择角色"},model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}},e._l(e.rolesList,(function(e){return n("el-option",{key:e.title,attrs:{label:e.name,value:e.title}})})),1)],1),n("el-form-item",{attrs:{label:"选择社区"}},[n("el-select",{staticStyle:{"margin-right":"10px"},attrs:{placeholder:"请选择省份"},on:{change:e.proChange},model:{value:e.pro_id,callback:function(t){e.pro_id=t},expression:"pro_id"}},e._l(e.proList,(function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1),n("el-select",{staticStyle:{"margin-right":"10px"},attrs:{placeholder:"请选择市级"},on:{change:e.cityChange},model:{value:e.city_id,callback:function(t){e.city_id=t},expression:"city_id"}},e._l(e.cityList,(function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1),n("el-select",{staticStyle:{"margin-right":"10px"},attrs:{placeholder:"请选择区级"},on:{change:e.areasChange},model:{value:e.areas_id,callback:function(t){e.areas_id=t},expression:"areas_id"}},e._l(e.communityList,(function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1),n("el-select",{staticStyle:{"margin-right":"10px"},attrs:{placeholder:"请选择社区"},on:{change:e.communityChange},model:{value:e.community_id,callback:function(t){e.community_id=t},expression:"community_id"}},e._l(e.areaList,(function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1)],1),n("el-form-item",{attrs:{label:"选择状态"}},[n("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.form.enable,callback:function(t){e.$set(e.form,"enable",t)},expression:"form.enable"}},e._l(e.stateList,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("div",{staticClass:"submit"},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.newUser}},[e._v("提交")])],1)],1)],1)],1)]),n("el-dialog",{attrs:{title:"修改密码",visible:e.dialogResetPassWord,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogResetPassWord=t}}},[n("div",{staticClass:"box"},[n("el-form",{attrs:{model:e.pwdForm,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"旧密码"}},[n("el-input",{model:{value:e.pwdForm.old_password,callback:function(t){e.$set(e.pwdForm,"old_password",t)},expression:"pwdForm.old_password"}})],1),n("el-form-item",{attrs:{label:"新密码"}},[n("el-input",{model:{value:e.pwdForm.new_password,callback:function(t){e.$set(e.pwdForm,"new_password",t)},expression:"pwdForm.new_password"}})],1),n("el-form-item",{attrs:{label:"再次确认新密码"}},[n("el-input",{model:{value:e.pwdForm.confirm_password,callback:function(t){e.$set(e.pwdForm,"confirm_password",t)},expression:"pwdForm.confirm_password"}})],1),n("div",{staticClass:"submit"},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.ChangePassword}},[e._v("提交")])],1)],1)],1)],1)])],1)},m=[],g={data:function(){return{dialogUser:!1,form:{id:"",username:"",password:"",enable:"",role:"",areas_id:""},stateList:[{label:"启用",value:1},{label:"禁用",value:2}],proList:[],pro_id:"",cityList:[],city_id:"",communityList:[],community_id:"",areaList:[],areas_id:"",rolesList:[],tableData:[],dialogResetPassWord:!1,pwdForm:{new_password:"",old_password:"",confirm_password:"",id:""},dialogDel:!1,id:"",currentPage:1,totalPage:0}},mounted:function(){this.getPro(),this.getRoles(),this.getUsers()},methods:{getPro:function(){var e=this;s["a"].areas(e.currentPage,100,0).then((function(t){e.proList=t.data}))},proChange:function(e){this.getCity(e)},getCity:function(e){var t=this;s["a"].areas(t.currentPage,100,e).then((function(e){t.cityList=e.data}))},cityChange:function(e){this.getCommunity(e)},getCommunity:function(e){var t=this;s["a"].areas(t.currentPage,100,e).then((function(e){t.communityList=e.data}))},areasChange:function(e){this.getAreas(e)},communityChange:function(e){this.form.areas_id=e},getAreas:function(e){var t=this;s["a"].areas(t.currentPage,100,e).then((function(e){t.areaList=e.data}))},getRoles:function(){var e=this;s["a"].getRole(e.currentPage).then((function(t){e.rolesList=t.data}))},getUsers:function(){var e=this;s["a"].users(e.currentPage).then((function(t){e.tableData=t.data,e.totalPage=t.total}))},addUser:function(){var e=this;e.dialogUser=!0,e.form={id:"",username:"",password:"",enable:"",role:"",areas_id:""},e.pro_id="",e.city_id="",e.areas_id="",e.community_id=""},newUser:function(){var e=this;e.form.username&&e.form.password&&e.form.enable&&e.form.role&&e.form.areas_id?s["a"].user(e.form).then((function(t){e.dialogUser=!1,e.$message.success("提交成功"),e.getUsers(),e.currentPage=1,e.form={}})):e.$message.warning("请补充完整信息")},handleEdit:function(e,t){var n=this;n.dialogUser=!0,n.form.username=t.name,n.form.role=t.role,n.form.enable=t.enable,n.pro_id=t.province,n.city_id=t.city,n.areas_id=t.area,n.community_id=t.community,n.form.areas_id=t.areas_id,n.form.id=t.id},handleReset:function(e,t){var n=this;n.dialogResetPassWord=!0,n.pwdForm.id=t.id},ChangePassword:function(){var e=this;e.pwdForm.new_password===e.pwdForm.confirm_password?s["a"].resetPassword(e.pwdForm).then((function(t){e.dialogResetPassWord=!1,e.$message.success("修改成功"),e.getUsers(),e.currentPage=1,e.pwdForm={}})):e.$message.error("新密码与确认密码不一致")},handleDel:function(e,t){var n=this;n.dialogDel=!0,n.id=t.id},toDel:function(){var e=this;s["a"].delUser(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getUsers(),e.currentPage=1}))},handleCurrentChange:function(e){var t=this;t.getUsers()},handleSizeChange:function(e){var t=this;s["a"].users(t.currentPage,e).then((function(e){t.tableData=e.data,t.totalPage=e.total}))}}},h=g,b=(n("0badd"),Object(u["a"])(h,f,m,!1,null,"704e050e",null)),y=b.exports,v={components:{vRole:p,vUser:y},data:function(){return{activeName:"role"}},methods:{changeActive:function(){this.activeName,"user"===this.activeName&&(s["a"].getRole(1).then((function(e){})),s["a"].users(1).then((function(e){})))}}},_=v,k=Object(u["a"])(_,a,r,!1,null,null,null);t["default"]=k.exports},d60a:function(e,t){e.exports=function(e){return e&&"object"===typeof e&&"function"===typeof e.copy&&"function"===typeof e.fill&&"function"===typeof e.readUInt8}},d9f3:function(e,t,n){},f193:function(e,t,n){}}]);
//# sourceMappingURL=chunk-157fa938.aaa392a7.js.map