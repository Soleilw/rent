(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e3329ca"],{"28a0":function(e,t){"function"===typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},"2c12":function(e,t,n){"use strict";var r=n("e043"),a=n.n(r);a.a},3022:function(e,t,n){(function(e){var r=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++)n[t[r]]=Object.getOwnPropertyDescriptor(e,t[r]);return n},a=/%[sdj%]/g;t.format=function(e){if(!D(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(l(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,o=r.length,i=String(e).replace(a,(function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return e}})),c=r[n];n<o;c=r[++n])v(c)||!P(c)?i+=" "+c:i+=" "+l(c);return i},t.deprecate=function(n,r){if("undefined"!==typeof e&&!0===e.noDeprecation)return n;if("undefined"===typeof e)return function(){return t.deprecate(n,r).apply(this,arguments)};var a=!1;function o(){if(!a){if(e.throwDeprecation)throw new Error(r);e.traceDeprecation?console.trace(r):console.error(r),a=!0}return n.apply(this,arguments)}return o};var o,i={};function l(e,n){var r={seen:[],stylize:u};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),y(n)?r.showHidden=n:n&&t._extend(r,n),S(r.showHidden)&&(r.showHidden=!1),S(r.depth)&&(r.depth=2),S(r.colors)&&(r.colors=!1),S(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=c),p(r,e,r.depth)}function c(e,t){var n=l.styles[t];return n?"["+l.colors[n][0]+"m"+e+"["+l.colors[n][1]+"m":e}function u(e,t){return e}function s(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}function p(e,n,r){if(e.customInspect&&n&&j(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var a=n.inspect(r,e);return D(a)||(a=p(e,a,r)),a}var o=f(e,n);if(o)return o;var i=Object.keys(n),l=s(i);if(e.showHidden&&(i=Object.getOwnPropertyNames(n)),_(n)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return d(n);if(0===i.length){if(j(n)){var c=n.name?": "+n.name:"";return e.stylize("[Function"+c+"]","special")}if(x(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(z(n))return e.stylize(Date.prototype.toString.call(n),"date");if(_(n))return d(n)}var u,y="",v=!1,O=["{","}"];if(h(n)&&(v=!0,O=["[","]"]),j(n)){var w=n.name?": "+n.name:"";y=" [Function"+w+"]"}return x(n)&&(y=" "+RegExp.prototype.toString.call(n)),z(n)&&(y=" "+Date.prototype.toUTCString.call(n)),_(n)&&(y=" "+d(n)),0!==i.length||v&&0!=n.length?r<0?x(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),u=v?g(e,n,r,l,i):i.map((function(t){return m(e,n,r,l,t,v)})),e.seen.pop(),b(u,y,O)):O[0]+y+O[1]}function f(e,t){if(S(t))return e.stylize("undefined","undefined");if(D(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return w(t)?e.stylize(""+t,"number"):y(t)?e.stylize(""+t,"boolean"):v(t)?e.stylize("null","null"):void 0}function d(e){return"["+Error.prototype.toString.call(e)+"]"}function g(e,t,n,r,a){for(var o=[],i=0,l=t.length;i<l;++i)$(t,String(i))?o.push(m(e,t,n,r,String(i),!0)):o.push("");return a.forEach((function(a){a.match(/^\d+$/)||o.push(m(e,t,n,r,a,!0))})),o}function m(e,t,n,r,a,o){var i,l,c;if(c=Object.getOwnPropertyDescriptor(t,a)||{value:t[a]},c.get?l=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(l=e.stylize("[Setter]","special")),$(r,a)||(i="["+a+"]"),l||(e.seen.indexOf(c.value)<0?(l=v(n)?p(e,c.value,null):p(e,c.value,n-1),l.indexOf("\n")>-1&&(l=o?l.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+l.split("\n").map((function(e){return"   "+e})).join("\n"))):l=e.stylize("[Circular]","special")),S(i)){if(o&&a.match(/^\d+$/))return l;i=JSON.stringify(""+a),i.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(i=i.substr(1,i.length-2),i=e.stylize(i,"name")):(i=i.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),i=e.stylize(i,"string"))}return i+": "+l}function b(e,t,n){var r=e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0);return r>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function h(e){return Array.isArray(e)}function y(e){return"boolean"===typeof e}function v(e){return null===e}function O(e){return null==e}function w(e){return"number"===typeof e}function D(e){return"string"===typeof e}function k(e){return"symbol"===typeof e}function S(e){return void 0===e}function x(e){return P(e)&&"[object RegExp]"===C(e)}function P(e){return"object"===typeof e&&null!==e}function z(e){return P(e)&&"[object Date]"===C(e)}function _(e){return P(e)&&("[object Error]"===C(e)||e instanceof Error)}function j(e){return"function"===typeof e}function E(e){return null===e||"boolean"===typeof e||"number"===typeof e||"string"===typeof e||"symbol"===typeof e||"undefined"===typeof e}function C(e){return Object.prototype.toString.call(e)}function B(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(n){if(S(o)&&(o=Object({NODE_ENV:"production",BASE_URL:"/"}).NODE_DEBUG||""),n=n.toUpperCase(),!i[n])if(new RegExp("\\b"+n+"\\b","i").test(o)){var r=e.pid;i[n]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",n,r,e)}}else i[n]=function(){};return i[n]},t.inspect=l,l.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},l.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=h,t.isBoolean=y,t.isNull=v,t.isNullOrUndefined=O,t.isNumber=w,t.isString=D,t.isSymbol=k,t.isUndefined=S,t.isRegExp=x,t.isObject=P,t.isDate=z,t.isError=_,t.isFunction=j,t.isPrimitive=E,t.isBuffer=n("d60a");var A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function T(){var e=new Date,t=[B(e.getHours()),B(e.getMinutes()),B(e.getSeconds())].join(":");return[e.getDate(),A[e.getMonth()],t].join(" ")}function $(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",T(),t.format.apply(t,arguments))},t.inherits=n("28a0"),t._extend=function(e,t){if(!t||!P(t))return e;var n=Object.keys(t),r=n.length;while(r--)e[n[r]]=t[n[r]];return e};var N="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function R(e,t){if(!e){var n=new Error("Promise was rejected with a falsy value");n.reason=e,e=n}return t(e)}function H(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');function n(){for(var n=[],r=0;r<arguments.length;r++)n.push(arguments[r]);var a=n.pop();if("function"!==typeof a)throw new TypeError("The last argument must be of type Function");var o=this,i=function(){return a.apply(o,arguments)};t.apply(this,n).then((function(t){e.nextTick(i,null,t)}),(function(t){e.nextTick(R,t,i)}))}return Object.setPrototypeOf(n,Object.getPrototypeOf(t)),Object.defineProperties(n,r(t)),n}t.promisify=function(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');if(N&&e[N]){var t=e[N];if("function"!==typeof t)throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,N,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,n,r=new Promise((function(e,r){t=e,n=r})),a=[],o=0;o<arguments.length;o++)a.push(arguments[o]);a.push((function(e,r){e?n(e):t(r)}));try{e.apply(this,a)}catch(i){n(i)}return r}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),N&&Object.defineProperty(t,N,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,r(e))},t.promisify.custom=N,t.callbackify=H}).call(this,n("4362"))},"365c":function(e,t,n){"use strict";var r=n("be3b"),a=n("99b1"),o=n.n(a),i={houser:function(e,t,n){return r["a"].get(o.a.HouseManagers,{page:e,limit:t,address_id:n})},audit:function(e,t){return r["a"].post(o.a.CheckManagers,{id:e,state:t})},addresses:function(e,t,n,a){return r["a"].get(o.a.Addresses,{page:e,limit:t,area_id:n,address:a})},rooms:function(e){return r["a"].post(o.a.Rooms,e)},households:function(e,t,n,a,i,l,c,u){return r["a"].get(o.a.Households,{page:e,limit:t,user_id:n,address_id:a,type:i,state:l,room_id:c,name:u})},searchHousehold:function(e,t,n){return r["a"].get(o.a.Households,{page:e,limit:t,name:n})},delHousehold:function(e){return r["a"].del(o.a.Household,{id:e})},banners:function(e,t){return r["a"].get(o.a.Banners,{page:e,limit:t})},banner:function(e){return r["a"].post(o.a.Banner,e)},message:function(e){return r["a"].post(o.a.Message,e)},messages:function(e,t){return r["a"].get(o.a.Messages,{page:e,limit:t})},messageType:function(e){return r["a"].post(o.a.MessageType,e)},messageTypes:function(e,t){return r["a"].get(o.a.MessageTypes,{page:e,limit:t})},delDocumentType:function(e){return r["a"].del(o.a.DelDocumentType,{id:e})},documents:function(e,t){return r["a"].get(o.a.Documents,{page:e,limit:t})},delDocument:function(e){return r["a"].del(o.a.DelDocument,{id:e})},document:function(e){return r["a"].post(o.a.Document,e)},documentDel:function(e){return r["a"].del(o.a.DocumentDel,{id:e})},delBanner:function(e){return r["a"].del(o.a.DelBanner,{id:e})},role:function(e){return r["a"].post(o.a.Role,e)},getRole:function(e,t){return r["a"].get(o.a.Role,{page:e,limit:t})},delRole:function(e){return r["a"].del(o.a.Role,{id:e})},user:function(e){return r["a"].post(o.a.User,e)},users:function(e,t){return r["a"].get(o.a.Users,{page:e,limit:t})},delUser:function(e){return r["a"].del(o.a.User,{id:e})},areas:function(e,t,n){return r["a"].get(o.a.Areas,{page:e,limit:t,parent_id:n})},buys:function(e,t){return r["a"].get(o.a.Buys,{page:e,limit:t})},buy:function(e){return r["a"].post(o.a.Buy,e)},server:function(e,t,n){return r["a"].get(o.a.Server,{page:e,limit:t,product_id:n})},delServer:function(e){return r["a"].del(o.a.DelServer,{id:e})}};t["a"]=i},8649:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[n("div",{staticClass:"btn"},[n("el-button",{attrs:{type:"primary"},on:{click:e.addBuy}},[e._v("添加购买服务")])],1),n("el-dialog",{attrs:{title:"添加购买服务",visible:e.dialogBuy},on:{"update:visible":function(t){e.dialogBuy=t}}},[n("div",{staticClass:"box"},[n("el-form",{attrs:{model:e.form,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"选择服务"}},[n("el-checkbox",{on:{change:e.handleCheckAllService},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),n("div",{staticClass:"service"},e._l(e.serviceList,(function(t,r){return n("div",{key:r},[n("el-checkbox-group",{staticClass:"service-item",model:{value:e.form.service,callback:function(t){e.$set(e.form,"service",t)},expression:"form.service"}},[n("el-checkbox",{attrs:{label:t},on:{change:e.oneChange}},[e._v(e._s(t.name))])],1)],1)})),0)],1),n("el-form-item",{attrs:{label:"商品名称"}},[n("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),n("el-form-item",{attrs:{label:"商品价格"}},[n("el-input",{model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1),n("el-form-item",{attrs:{label:"商品时长"}},[n("el-input",{model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}})],1),n("el-form-item",{attrs:{label:"商品描述"}},[n("el-input",{model:{value:e.form.detail,callback:function(t){e.$set(e.form,"detail",t)},expression:"form.detail"}})],1),n("div",{staticClass:"submit"},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.newBuy}},[e._v("提交")])],1)],1)],1)],1)]),n("el-dialog",{attrs:{title:"订单列表",visible:e.showServiceOrder,width:"80%"},on:{"update:visible":function(t){e.showServiceOrder=t}}},[n("div",{staticClass:"box"},[n("div",[n("el-table",{attrs:{data:e.orderData}},[n("el-table-column",{attrs:{prop:"no",label:"订单ID",align:"center"}}),n("el-table-column",{attrs:{prop:"user_id",label:"用户ID",align:"center"}}),n("el-table-column",{attrs:{prop:"user_name",label:"用户名",align:"center"}}),n("el-table-column",{attrs:{prop:"name",label:"商品名称",align:"center"}}),n("el-table-column",{attrs:{prop:"price",label:"商品价格",align:"center"}}),n("el-table-column",{attrs:{prop:"time",label:"商品时长",align:"center"}}),n("el-table-column",{attrs:{prop:"status",label:"订单状态",align:"center"}}),n("el-table-column",{attrs:{prop:"create_id",label:"创建时间",align:"center"}})],1),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":e.currentOrderPage,"page-sizes":[10,20,30,40,50],"page-size":e.orderPageSize,layout:"sizes, prev, pager, next, jumper",total:e.orderTotalPage},on:{"current-change":e.handleOrderChange,"update:currentPage":function(t){e.currentOrderPage=t},"update:current-page":function(t){e.currentOrderPage=t},"size-change":e.handleOrderSizeChange}})],1)],1)])]),n("el-table",{attrs:{data:e.tableDate}},[n("el-table-column",{attrs:{label:"名称",type:"selection",align:"center"}}),n("el-table-column",{attrs:{prop:"id",label:"商品ID",align:"center",width:"100px"}}),n("el-table-column",{attrs:{prop:"title",label:"商品名称",align:"center"}}),n("el-table-column",{attrs:{prop:"price",label:"商品价格",align:"center"}}),n("el-table-column",{attrs:{prop:"time",label:"商品时长(天)",align:"center"}}),n("el-table-column",{attrs:{prop:"detail",label:"商品描述",align:"center"}}),n("el-table-column",{attrs:{prop:"service[0].name",label:"服务权限",align:"center"}}),n("el-table-column",{attrs:{prop:"created_at",label:"创建时间",align:"center"}}),n("el-table-column",{attrs:{prop:"updated_at",label:"更新时间",align:"center"}}),n("el-table-column",{attrs:{label:"操作",align:"center",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑服务")]),n("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(n){return e.handleOrder(t.$index,t.row)}}},[e._v("服务订单")]),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.delservice(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),n("el-dialog",{attrs:{visible:e.dialogDel,title:"删除年级",width:"20%",align:"center","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDel=t}}},[n("div",{staticStyle:{"font-size":"20px","margin-bottom":"30px"}},[e._v("是否删除该住户")]),n("span",[n("el-button",{attrs:{type:"primary"},on:{click:e.toDel}},[e._v("删除")]),n("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogDel=!1}}},[e._v("取消")])],1)]),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40,50],"page-size":e.pageSize,layout:"sizes, prev, pager, next, jumper",total:e.totalPage},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange}})],1)],1)},a=[],o=(n("4160"),n("159b"),n("365c")),i=(n("3022"),{name:"buy",data:function(){return{loading:!0,dialogBuy:!1,showServiceOrder:!1,checkAll:!1,dialogDel:!1,serviceIdList:[],serviceList:[{title:"InAndOut",name:"进出"}],form:{title:"",price:"",detail:"",service:[],school:"",time:""},financial:"订单列表",financialList:[{value:1,label:"订单列表"},{value:2,label:"财务统计"}],orderData:[],orderPageSize:10,orderTotalPage:0,currentOrderPage:1,tableDate:[],currentPage:1,totalPage:0,pageSize:10,product_id:"",id:""}},mounted:function(){this.getBuys()},methods:{getBuys:function(){var e=this;o["a"].buys(e.currentPage,e.pageSize).then((function(t){e.tableDate=t.data,e.totalPage=t.total,e.loading=!1})).catch((function(t){e.loading=!1,console.log(t)}))},newBuy:function(){var e=this;console.log("newBuy",e.form),o["a"].buy(e.form).then((function(t){e.dialogBuy=!1,e.$message.success("提交成功"),e.getBuys(),e.currentPage=1,e.form={},e.form.service=[]}))},addBuy:function(){var e=this;e.dialogBuy=!0,e.checkAll=!1,e.form={title:"",price:"",detail:"",service:[],school:"",time:""}},handleCheckAllService:function(e){var t=this;t.form.service=e?t.serviceList:[]},oneChange:function(){var e=this;console.log("oneChange",e.form),6===e.form.service.length?e.checkAll=!0:e.checkAll=!1},handleEdit:function(e,t){var n=this;n.dialogBuy=!0,console.log("handleEdit",t),n.form=t,6===n.form.service.length?n.checkAll=!0:n.checkAll=!1},handleOrder:function(e,t){var n=this;n.showServiceOrder=!0,n.product_id=t.id,o["a"].server(1,n.pageSize,n.product_id).then((function(e){n.orderData=e.data,n.orderTotalPage=e.total,n.currentOrderPage=1,n.orderData.forEach((function(e){switch(e.status){case 1:e.status="提交";break;case 2:e.status="已付款";break;case 3:e.status="无效"}})),n.$message.success("获取数据成功")}))},delservice:function(e,t){var n=this;n.id=t.id,n.dialogDel=!0},toDel:function(){var e=this;o["a"].delServer(e.id).then((function(t){e.$message.success("删除成功"),e.dialogDel=!1,e.getBuys()}))},handleCurrentChange:function(e){var t=this;t.getBuys()},handleSizeChange:function(e){var t=this;o["a"].buys(t.currentPage,e).then((function(e){t.tableDate=e.data,t.totalPage=e.total}))},handleOrderChange:function(e){var t=this;t.currentOrderPage=e,o["a"].server(e,t.orderPageSize,t.product_id).then((function(e){t.orderData=e.data,t.orderTotalPage=e.total,t.orderData.forEach((function(e){switch(e.status){case 1:e.status="提交";break;case 2:e.status="已付款";break;case 3:e.status="无效"}}))}))},handleOrderSizeChange:function(e){var t=this;o["a"].server(t.currentOrderPage,e,t.product_id).then((function(e){t.orderData=e.data,t.orderTotalPage=e.total,t.orderData.forEach((function(e){switch(e.status){case 1:e.status="提交";break;case 2:e.status="已付款";break;case 3:e.status="无效"}}))}))}}}),l=i,c=(n("2c12"),n("2877")),u=Object(c["a"])(l,r,a,!1,null,"05f417c0",null);t["default"]=u.exports},d60a:function(e,t){e.exports=function(e){return e&&"object"===typeof e&&"function"===typeof e.copy&&"function"===typeof e.fill&&"function"===typeof e.readUInt8}},e043:function(e,t,n){}}]);
//# sourceMappingURL=chunk-6e3329ca.0a5afd1a.js.map