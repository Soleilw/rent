(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41c043ba"],{1276:function(e,t,n){"use strict";var r=n("d784"),a=n("44e7"),o=n("825a"),i=n("1d80"),l=n("4840"),s=n("8aa5"),u=n("50c4"),c=n("14c3"),f=n("9263"),p=n("d039"),g=[].push,d=Math.min,h=4294967295,m=!p((function(){return!RegExp(h,"y")}));r("split",2,(function(e,t,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var r=String(i(this)),o=void 0===n?h:n>>>0;if(0===o)return[];if(void 0===e)return[r];if(!a(e))return t.call(r,e,o);var l,s,u,c=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),d=0,m=new RegExp(e.source,p+"g");while(l=f.call(m,r)){if(s=m.lastIndex,s>d&&(c.push(r.slice(d,l.index)),l.length>1&&l.index<r.length&&g.apply(c,l.slice(1)),u=l[0].length,d=s,c.length>=o))break;m.lastIndex===l.index&&m.lastIndex++}return d===r.length?!u&&m.test("")||c.push(""):c.push(r.slice(d)),c.length>o?c.slice(0,o):c}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var a=i(this),o=void 0==t?void 0:t[e];return void 0!==o?o.call(t,a,n):r.call(String(a),t,n)},function(e,a){var i=n(r,e,this,a,r!==t);if(i.done)return i.value;var f=o(e),p=String(this),g=l(f,RegExp),b=f.unicode,y=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(m?"y":"g"),v=new g(m?f:"^(?:"+f.source+")",y),x=void 0===a?h:a>>>0;if(0===x)return[];if(0===p.length)return null===c(v,p)?[p]:[];var w=0,S=0,D=[];while(S<p.length){v.lastIndex=m?S:0;var z,O=c(v,m?p:p.slice(S));if(null===O||(z=d(u(v.lastIndex+(m?0:S)),p.length))===w)S=s(p,S,b);else{if(D.push(p.slice(w,S)),D.length===x)return D;for(var _=1;_<=O.length-1;_++)if(D.push(O[_]),D.length===x)return D;S=w=z}}return D.push(p.slice(w)),D}]}),!m)},"28a0":function(e,t){"function"===typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},3022:function(e,t,n){(function(e){var r=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++)n[t[r]]=Object.getOwnPropertyDescriptor(e,t[r]);return n},a=/%[sdj%]/g;t.format=function(e){if(!S(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(l(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,o=r.length,i=String(e).replace(a,(function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return e}})),s=r[n];n<o;s=r[++n])v(s)||!_(s)?i+=" "+s:i+=" "+l(s);return i},t.deprecate=function(n,r){if("undefined"!==typeof e&&!0===e.noDeprecation)return n;if("undefined"===typeof e)return function(){return t.deprecate(n,r).apply(this,arguments)};var a=!1;function o(){if(!a){if(e.throwDeprecation)throw new Error(r);e.traceDeprecation?console.trace(r):console.error(r),a=!0}return n.apply(this,arguments)}return o};var o,i={};function l(e,n){var r={seen:[],stylize:u};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),y(n)?r.showHidden=n:n&&t._extend(r,n),z(r.showHidden)&&(r.showHidden=!1),z(r.depth)&&(r.depth=2),z(r.colors)&&(r.colors=!1),z(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=s),f(r,e,r.depth)}function s(e,t){var n=l.styles[t];return n?"["+l.colors[n][0]+"m"+e+"["+l.colors[n][1]+"m":e}function u(e,t){return e}function c(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}function f(e,n,r){if(e.customInspect&&n&&L(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var a=n.inspect(r,e);return S(a)||(a=f(e,a,r)),a}var o=p(e,n);if(o)return o;var i=Object.keys(n),l=c(i);if(e.showHidden&&(i=Object.getOwnPropertyNames(n)),P(n)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return g(n);if(0===i.length){if(L(n)){var s=n.name?": "+n.name:"";return e.stylize("[Function"+s+"]","special")}if(O(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(j(n))return e.stylize(Date.prototype.toString.call(n),"date");if(P(n))return g(n)}var u,y="",v=!1,x=["{","}"];if(b(n)&&(v=!0,x=["[","]"]),L(n)){var w=n.name?": "+n.name:"";y=" [Function"+w+"]"}return O(n)&&(y=" "+RegExp.prototype.toString.call(n)),j(n)&&(y=" "+Date.prototype.toUTCString.call(n)),P(n)&&(y=" "+g(n)),0!==i.length||v&&0!=n.length?r<0?O(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),u=v?d(e,n,r,l,i):i.map((function(t){return h(e,n,r,l,t,v)})),e.seen.pop(),m(u,y,x)):x[0]+y+x[1]}function p(e,t){if(z(t))return e.stylize("undefined","undefined");if(S(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return w(t)?e.stylize(""+t,"number"):y(t)?e.stylize(""+t,"boolean"):v(t)?e.stylize("null","null"):void 0}function g(e){return"["+Error.prototype.toString.call(e)+"]"}function d(e,t,n,r,a){for(var o=[],i=0,l=t.length;i<l;++i)T(t,String(i))?o.push(h(e,t,n,r,String(i),!0)):o.push("");return a.forEach((function(a){a.match(/^\d+$/)||o.push(h(e,t,n,r,a,!0))})),o}function h(e,t,n,r,a,o){var i,l,s;if(s=Object.getOwnPropertyDescriptor(t,a)||{value:t[a]},s.get?l=s.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):s.set&&(l=e.stylize("[Setter]","special")),T(r,a)||(i="["+a+"]"),l||(e.seen.indexOf(s.value)<0?(l=v(n)?f(e,s.value,null):f(e,s.value,n-1),l.indexOf("\n")>-1&&(l=o?l.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+l.split("\n").map((function(e){return"   "+e})).join("\n"))):l=e.stylize("[Circular]","special")),z(i)){if(o&&a.match(/^\d+$/))return l;i=JSON.stringify(""+a),i.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(i=i.substr(1,i.length-2),i=e.stylize(i,"name")):(i=i.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),i=e.stylize(i,"string"))}return i+": "+l}function m(e,t,n){var r=e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0);return r>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function b(e){return Array.isArray(e)}function y(e){return"boolean"===typeof e}function v(e){return null===e}function x(e){return null==e}function w(e){return"number"===typeof e}function S(e){return"string"===typeof e}function D(e){return"symbol"===typeof e}function z(e){return void 0===e}function O(e){return _(e)&&"[object RegExp]"===E(e)}function _(e){return"object"===typeof e&&null!==e}function j(e){return _(e)&&"[object Date]"===E(e)}function P(e){return _(e)&&("[object Error]"===E(e)||e instanceof Error)}function L(e){return"function"===typeof e}function k(e){return null===e||"boolean"===typeof e||"number"===typeof e||"string"===typeof e||"symbol"===typeof e||"undefined"===typeof e}function E(e){return Object.prototype.toString.call(e)}function F(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(n){if(z(o)&&(o=Object({NODE_ENV:"production",BASE_URL:"/"}).NODE_DEBUG||""),n=n.toUpperCase(),!i[n])if(new RegExp("\\b"+n+"\\b","i").test(o)){var r=e.pid;i[n]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",n,r,e)}}else i[n]=function(){};return i[n]},t.inspect=l,l.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},l.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=b,t.isBoolean=y,t.isNull=v,t.isNullOrUndefined=x,t.isNumber=w,t.isString=S,t.isSymbol=D,t.isUndefined=z,t.isRegExp=O,t.isObject=_,t.isDate=j,t.isError=P,t.isFunction=L,t.isPrimitive=k,t.isBuffer=n("d60a");var C=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function N(){var e=new Date,t=[F(e.getHours()),F(e.getMinutes()),F(e.getSeconds())].join(":");return[e.getDate(),C[e.getMonth()],t].join(" ")}function T(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",N(),t.format.apply(t,arguments))},t.inherits=n("28a0"),t._extend=function(e,t){if(!t||!_(t))return e;var n=Object.keys(t),r=n.length;while(r--)e[n[r]]=t[n[r]];return e};var $="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function I(e,t){if(!e){var n=new Error("Promise was rejected with a falsy value");n.reason=e,e=n}return t(e)}function R(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');function n(){for(var n=[],r=0;r<arguments.length;r++)n.push(arguments[r]);var a=n.pop();if("function"!==typeof a)throw new TypeError("The last argument must be of type Function");var o=this,i=function(){return a.apply(o,arguments)};t.apply(this,n).then((function(t){e.nextTick(i,null,t)}),(function(t){e.nextTick(I,t,i)}))}return Object.setPrototypeOf(n,Object.getPrototypeOf(t)),Object.defineProperties(n,r(t)),n}t.promisify=function(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');if($&&e[$]){var t=e[$];if("function"!==typeof t)throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,$,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,n,r=new Promise((function(e,r){t=e,n=r})),a=[],o=0;o<arguments.length;o++)a.push(arguments[o]);a.push((function(e,r){e?n(e):t(r)}));try{e.apply(this,a)}catch(i){n(i)}return r}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),$&&Object.defineProperty(t,$,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,r(e))},t.promisify.custom=$,t.callbackify=R}).call(this,n("4362"))},"9e8d":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[n("div",{staticClass:"handle-box"},[n("div",{staticClass:"btn"},[n("el-button",{attrs:{type:"primary"},on:{click:e.addDangerFace}},[e._v("添加可疑人物")])],1)]),n("el-dialog",{attrs:{title:"添加可疑人物",visible:e.dialogDangerFace,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDangerFace=t}}},[n("div",{staticClass:"box"},[n("el-form",{attrs:{model:e.form,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"姓名"}},[n("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"身份证号"}},[n("el-input",{attrs:{placeholder:"请输入身份证号"},model:{value:e.form.number,callback:function(t){e.$set(e.form,"number",t)},expression:"form.number"}})],1),n("el-form-item",{attrs:{label:"通知相似度"}},[n("el-input",{attrs:{placeholder:"请输入通知相似度(保留一位小数, 例如78.9)"},model:{value:e.form.notify_score,callback:function(t){e.$set(e.form,"notify_score",t)},expression:"form.notify_score"}})],1),n("el-form-item",{attrs:{label:"通知手机号"}},[n("el-input",{attrs:{type:"textarea",placeholder:"请输入手机号, 多个手机号用逗号分隔(例如: 13212312312,13212312312)"},model:{value:e.notify_user,callback:function(t){e.notify_user=t},expression:"notify_user"}})],1),n("el-form-item",{attrs:{label:"人脸图片"}},[n("el-upload",{ref:"upload",attrs:{action:"https://api.fengniaotuangou.cn/api/upload",limit:1,"before-upload":e.beforeAvatarUpload,"on-change":e.handleChange,"on-success":e.handleAvatarSuccess,"on-remove":e.handleRemove,"on-exceed":e.handleExceed,"auto-upload":!1}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("选择图片")])],1),e.hasNewImage?n("div",{staticStyle:{color:"red","font-size":"12px"}},[e._v("* 点击文件名可删除所选图片")]):e._e(),n("div",{staticClass:"up-img"},[n("img",{staticClass:"pic-box",attrs:{src:e.form.href}})])],1),n("div",{staticClass:"submit"},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.upload}},[e._v("提交")])],1)],1)],1)],1)]),n("el-table",{attrs:{data:e.tableData,"empty-text":"暂无数据",border:"","header-cell-style":{background:"#f0f0f0"}}},[n("el-table-column",{attrs:{prop:"id",label:"ID"}}),n("el-table-column",{attrs:{prop:"",label:"设备ID"}}),n("el-table-column",{attrs:{prop:"name",label:"名称"}}),n("el-table-column",{attrs:{prop:"created_at",label:"时间"}}),n("el-table-column",{attrs:{prop:"number",label:"人脸证件号"}}),n("el-table-column",{attrs:{prop:"href",label:"人脸图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.href?n("div",[n("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[n("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.href}}),n("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.href},slot:"reference"})])],1):n("div",[n("span",[e._v("--暂无图片--")])])]}}])}),n("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return e.handleLogs(t.$index,t.row)}}},[e._v("进出记录")])]}}])})],1),n("el-dialog",{attrs:{title:"进出记录",visible:e.dialogLogs},on:{"update:visible":function(t){e.dialogLogs=t}}},[n("div",{staticClass:"box"},[n("el-table",{attrs:{data:e.logsData,border:"","header-cell-style":{background:"#f0f0f0"}}},[n("el-table-column",{attrs:{prop:"danger.name",label:"姓名"}}),n("el-table-column",{attrs:{prop:"address",label:"地址"}}),n("el-table-column",{attrs:{prop:"danger.number",label:"证件号"}}),n("el-table-column",{attrs:{prop:"log.timestamp",label:"时间"}}),n("el-table-column",{attrs:{prop:"danger.href",label:"人脸照片"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.danger.href?n("div",[n("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[n("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.danger.href}}),n("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.danger.href},slot:"reference"})])],1):n("div",[n("span",[e._v("--暂无图片--")])])]}}])})],1)],1),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":e.currentLogsPage,"page-sizes":[10,20,30,40,50],"page-size":e.pageSizeLogs,layout:"sizes, prev, pager, next, jumper",total:e.totalLogsPage},on:{"current-change":e.handleCurrentLogs,"update:currentPage":function(t){e.currentLogsPage=t},"update:current-page":function(t){e.currentLogsPage=t},"size-change":e.handleSizeLogs}})],1)]),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40,50],"page-size":e.pageSize,layout:"sizes, prev, pager, next, jumper",total:e.totalPage},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange}})],1)],1)},a=[],o=(n("4160"),n("d3b7"),n("ac1f"),n("3ca3"),n("1276"),n("159b"),n("ddb0"),n("2b3d"),n("365c")),i=(n("3022"),n("25f0"),n("5319"),{});function l(e){return e=e.toString(),e[1]?e:"0"+e}i.formatTime=function(e,t){var n=["Y","M","D","h","m","s"],r=[],a=new Date(1e3*e);for(var o in r.push(a.getFullYear()),r.push(l(a.getMonth()+1)),r.push(l(a.getDate())),r.push(l(a.getHours())),r.push(l(a.getMinutes())),r.push(l(a.getSeconds())),r)t=t.replace(n[o],r[o]);return t};var s=i,u={data:function(){return{loading:!1,tableData:[],currentPage:1,pageSize:10,totalPage:0,dialogDangerFace:!1,qiniuaddr:"https://tu.fengniaotuangou.cn",hasNewImage:!1,form:{name:"",number:"",href:"",notify_score:"",notify_user:""},dialogLogs:!1,logsData:[],danger_id:"",currentLogsPage:1,pageSizeLogs:10,totalLogsPage:0,notify_user:""}},mounted:function(){this.getDangerFace()},methods:{getDangerFace:function(){var e=this;o["a"].dangerFace(e.currentPage,e.pageSize).then((function(t){console.log("getDangerFace",t.data.data),e.tableData=t.data.data,e.totalPage=t.data.total}))},addDangerFace:function(){var e=this;e.dialogDangerFace=!0},handleLogs:function(e,t){var n=this;n.dialogLogs=!0,n.danger_id=t.danger_id,console.log(t),n.getFaceLogs()},getFaceLogs:function(){var e=this;o["a"].dangerLog(e.currentLogsPage,e.pageSizeLogs,e.danger_id).then((function(t){console.log("getFaceLogs",t.data.data),e.logsData=t.data.data,e.totalLogsPage=t.data.total,e.logsData.forEach((function(e){e.log.timestamp=s.formatTime(e.log.timestamp,"Y-M-D h:m:s")}))}))},handleRemove:function(e,t){var n=this;n.form.href="",n.hasNewImage=!1},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleChange:function(e){var t=this;t.form.href=URL.createObjectURL(e.raw),t.hasNewImage=!0},handleAvatarSuccess:function(e,t){var n=this;t.url=e.data,n.form.href=t.url;var r=n.notify_user.split(","),a=[];r.forEach((function(e){e="+86"+e,a.push(e)})),n.form.notify_user=a.toString(),o["a"].addDangerFace(n.form).then((function(e){n.$message.success("上传成功"),n.currentPage=1,n.getDangerFace(),n.$refs.upload.clearFiles(),n.form={name:"",number:"",href:"",notify_score:"",notify_user:""},n.notify_user="",n.dialogDangerFace=!1}))},handleExceed:function(e,t){var n=this;n.$message.error("上传图片不能超过1张!"),n.$refs.upload.clearFiles(),n.form.href="",n.form.id=""},upload:function(){var e=this;e.$refs.upload.submit()},getQiniuToken:function(){var e=this;axios.get("https://api.fengniaotuangou.cn/api/upload/token").then((function(t){e.imgData.token=t.data.uptoken}))},handleCurrentChange:function(e){var t=this;console.log(e),t.currentPage=e,o["a"].dangerFace(e,t.pageSize).then((function(e){t.tableData=e.data.data}))},handleSizeChange:function(e){var t=this;console.log(e),t.pageSize=e,o["a"].dangerFace(t.currentPage,e).then((function(e){t.tableData=e.data.data,t.totalPage=e.data.total,t.currentPage=1}))},handleCurrentLogs:function(e){var t=this;t.currentLogsPage=e,o["a"].dangerLog(e,t.pageSizeLogs,t.danger_id).then((function(e){t.logsData=e.data.data,t.logsData.forEach((function(e){e.log.timestamp=s.formatTime(e.log.timestamp,"Y-M-D h:m:s")}))}))},handleSizeLogs:function(e){var t=this;t.pageSizeLogs=e,o["a"].dangerLog(t.currentLogsPage,e,t.danger_id).then((function(e){t.logsData=e.data.data,t.logsData.forEach((function(e){e.log.timestamp=s.formatTime(e.log.timestamp,"Y-M-D h:m:s")}))}))}}},c=u,f=(n("cff0"),n("2877")),p=Object(f["a"])(c,r,a,!1,null,"bc47ab12",null);t["default"]=p.exports},c575:function(e,t,n){},cff0:function(e,t,n){"use strict";var r=n("c575"),a=n.n(r);a.a},d60a:function(e,t){e.exports=function(e){return e&&"object"===typeof e&&"function"===typeof e.copy&&"function"===typeof e.fill&&"function"===typeof e.readUInt8}}}]);
//# sourceMappingURL=chunk-41c043ba.4ef91579.js.map