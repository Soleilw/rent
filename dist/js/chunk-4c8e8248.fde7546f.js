(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c8e8248"],{1276:function(e,t,a){"use strict";var n=a("d784"),r=a("44e7"),i=a("825a"),o=a("1d80"),l=a("4840"),s=a("8aa5"),c=a("50c4"),u=a("14c3"),d=a("9263"),f=a("d039"),g=[].push,p=Math.min,m=4294967295,h=!f((function(){return!RegExp(m,"y")}));n("split",2,(function(e,t,a){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,a){var n=String(o(this)),i=void 0===a?m:a>>>0;if(0===i)return[];if(void 0===e)return[n];if(!r(e))return t.call(n,e,i);var l,s,c,u=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,h=new RegExp(e.source,f+"g");while(l=d.call(h,n)){if(s=h.lastIndex,s>p&&(u.push(n.slice(p,l.index)),l.length>1&&l.index<n.length&&g.apply(u,l.slice(1)),c=l[0].length,p=s,u.length>=i))break;h.lastIndex===l.index&&h.lastIndex++}return p===n.length?!c&&h.test("")||u.push(""):u.push(n.slice(p)),u.length>i?u.slice(0,i):u}:"0".split(void 0,0).length?function(e,a){return void 0===e&&0===a?[]:t.call(this,e,a)}:t,[function(t,a){var r=o(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,r,a):n.call(String(r),t,a)},function(e,r){var o=a(n,e,this,r,n!==t);if(o.done)return o.value;var d=i(e),f=String(this),g=l(d,RegExp),v=d.unicode,b=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(h?"y":"g"),y=new g(h?d:"^(?:"+d.source+")",b),x=void 0===r?m:r>>>0;if(0===x)return[];if(0===f.length)return null===u(y,f)?[f]:[];var _=0,w=0,k=[];while(w<f.length){y.lastIndex=h?w:0;var C,I=u(y,h?f:f.slice(w));if(null===I||(C=p(c(y.lastIndex+(h?0:w)),f.length))===_)w=s(f,w,v);else{if(k.push(f.slice(_,w)),k.length===x)return k;for(var S=1;S<=I.length-1;S++)if(k.push(I[S]),k.length===x)return k;w=_=C}}return k.push(f.slice(_)),k}]}),!h)},5118:function(e,t,a){(function(e){var n="undefined"!==typeof e&&e||"undefined"!==typeof self&&self||window,r=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(r.call(setTimeout,n,arguments),clearTimeout)},t.setInterval=function(){return new i(r.call(setInterval,n,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(n,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},a("6017"),t.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof e&&e.clearImmediate||this&&this.clearImmediate}).call(this,a("c8ba"))},"5bbc":function(e,t,a){},6017:function(e,t,a){(function(e,t){(function(e,a){"use strict";if(!e.setImmediate){var n,r=1,i={},o=!1,l=e.document,s=Object.getPrototypeOf&&Object.getPrototypeOf(e);s=s&&s.setTimeout?s:e,"[object process]"==={}.toString.call(e.process)?g():p()?m():e.MessageChannel?h():l&&"onreadystatechange"in l.createElement("script")?v():b(),s.setImmediate=c,s.clearImmediate=u}function c(e){"function"!==typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),a=0;a<t.length;a++)t[a]=arguments[a+1];var o={callback:e,args:t};return i[r]=o,n(r),r++}function u(e){delete i[e]}function d(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(a,n);break}}function f(e){if(o)setTimeout(f,0,e);else{var t=i[e];if(t){o=!0;try{d(t)}finally{u(e),o=!1}}}}function g(){n=function(e){t.nextTick((function(){f(e)}))}}function p(){if(e.postMessage&&!e.importScripts){var t=!0,a=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=a,t}}function m(){var t="setImmediate$"+Math.random()+"$",a=function(a){a.source===e&&"string"===typeof a.data&&0===a.data.indexOf(t)&&f(+a.data.slice(t.length))};e.addEventListener?e.addEventListener("message",a,!1):e.attachEvent("onmessage",a),n=function(a){e.postMessage(t+a,"*")}}function h(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;f(t)},n=function(t){e.port2.postMessage(t)}}function v(){var e=l.documentElement;n=function(t){var a=l.createElement("script");a.onreadystatechange=function(){f(t),a.onreadystatechange=null,e.removeChild(a),a=null},e.appendChild(a)}}function b(){n=function(e){setTimeout(f,0,e)}}})("undefined"===typeof self?"undefined"===typeof e?this:e:self)}).call(this,a("c8ba"),a("4362"))},"9e8d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中"}},[a("div",{staticClass:"handle-box"},[a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addDangerFace}},[e._v("添加可疑人物")])],1)]),a("el-dialog",{attrs:{title:"添加可疑人物",visible:e.dialogDangerFace,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogDangerFace=t}}},[a("div",{staticClass:"box"},[a("el-form",{attrs:{model:e.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"身份证号"}},[a("el-input",{attrs:{placeholder:"请输入身份证号"},model:{value:e.form.number,callback:function(t){e.$set(e.form,"number",t)},expression:"form.number"}})],1),a("el-form-item",{attrs:{label:"通知相似度"}},[a("el-input",{attrs:{placeholder:"请输入通知相似度(保留一位小数, 例如78.9)"},model:{value:e.form.notify_score,callback:function(t){e.$set(e.form,"notify_score",t)},expression:"form.notify_score"}})],1),a("el-form-item",{attrs:{label:"通知手机号"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入手机号, 多个手机号用逗号分隔(例如: 13212312312,13212312312)"},model:{value:e.notify_user,callback:function(t){e.notify_user=t},expression:"notify_user"}})],1),a("el-form-item",{attrs:{label:"人脸图片"}},[a("el-upload",{ref:"upload",attrs:{action:"https://api.fengniaotuangou.cn/api/upload",limit:1,"before-upload":e.beforeAvatarUpload,"on-change":e.handleChange,"on-success":e.handleAvatarSuccess,"on-remove":e.handleRemove,"on-exceed":e.handleExceed,"auto-upload":!1}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("选择图片")])],1),e.hasNewImage?a("div",{staticStyle:{color:"red","font-size":"12px"}},[e._v("* 点击文件名可删除所选图片")]):e._e(),a("div",{staticClass:"up-img"},[a("img",{staticClass:"pic-box",attrs:{src:e.form.href}})])],1),a("div",{staticClass:"submit"},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.upload}},[e._v("提交")])],1)],1)],1)],1)]),a("el-table",{attrs:{data:e.tableData,"empty-text":"暂无数据",border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[a("el-table-column",{attrs:{prop:"id",label:"ID"}}),a("el-table-column",{attrs:{prop:"name",label:"名称"}}),a("el-table-column",{attrs:{prop:"created_at",label:"时间"}}),a("el-table-column",{attrs:{prop:"number",label:"人脸证件号"}}),a("el-table-column",{attrs:{prop:"href",label:"人脸图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.href?a("div",[a("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[a("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.href}}),a("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.href},slot:"reference"})])],1):a("div",[a("span",[e._v("--暂无图片--")])])]}}])}),a("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleLogs(t.$index,t.row)}}},[e._v("进出记录")])]}}])})],1),a("el-dialog",{attrs:{title:"进出记录",visible:e.dialogLogs,width:"80%"},on:{"update:visible":function(t){e.dialogLogs=t}}},[a("div",{staticClass:"box"},[a("el-table",{attrs:{data:e.logsData,border:"","header-cell-style":{background:"#f0f0f0"},"max-height":"620"}},[a("el-table-column",{attrs:{prop:"danger.name",label:"姓名"}}),a("el-table-column",{attrs:{prop:"danger.number",label:"证件号"}}),a("el-table-column",{attrs:{prop:"danger.href",label:"人脸照片"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.danger?a("div",[a("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[a("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.danger.href}}),a("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.danger.href},slot:"reference"})])],1):a("div",[a("span",[e._v("--暂无图片--")])])]}}])}),a("el-table-column",{attrs:{prop:"score",label:"相似度"}}),a("el-table-column",{attrs:{prop:"log.image",label:"抓拍照片"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.log?a("div",[a("el-popover",{attrs:{placement:"top-start",title:"",trigger:"click"}},[a("img",{staticStyle:{"max-width":"800px","max-height":"800px"},attrs:{src:t.row.log.image}}),a("img",{staticStyle:{"max-width":"180px","max-height":"80px"},attrs:{slot:"reference",src:t.row.log.image},slot:"reference"})])],1):a("div",[a("span",[e._v("--暂无图片--")])])]}}])}),a("el-table-column",{attrs:{prop:"log.timestamp",label:"抓拍时间"}}),a("el-table-column",{attrs:{prop:"address",label:"抓拍地址"}})],1)],1),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.logsCurrent,"page-sizes":[10,20,30,40,50],"page-size":e.logsSize,layout:"sizes, prev, pager, next, jumper",total:e.logsTotal},on:{"current-change":e.logsCurrentChange,"update:currentPage":function(t){e.logsCurrent=t},"update:current-page":function(t){e.logsCurrent=t},"size-change":e.logsSizeChange}})],1)]),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.current,"page-sizes":[10,20,30,40,50],"page-size":e.size,layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"size-change":e.sizeChange}})],1)],1)},r=[],i=(a("4160"),a("d3b7"),a("ac1f"),a("3ca3"),a("1276"),a("159b"),a("ddb0"),a("2b3d"),a("365c")),o=(a("3022"),a("25f0"),a("5319"),{});function l(e){return e=e.toString(),e[1]?e:"0"+e}o.formatTime=function(e,t){var a=["Y","M","D","h","m","s"],n=[],r=new Date(1e3*e);for(var i in n.push(r.getFullYear()),n.push(l(r.getMonth()+1)),n.push(l(r.getDate())),n.push(l(r.getHours())),n.push(l(r.getMinutes())),n.push(l(r.getSeconds())),n)t=t.replace(a[i],n[i]);return t};var s=o,c=(a("5118"),{data:function(){return{loading:!0,tableData:[],current:1,size:10,total:0,dialogDangerFace:!1,qiniuaddr:"https://tu.fengniaotuangou.cn",hasNewImage:!1,form:{name:"",number:"",href:"",notify_score:"",notify_user:""},dialogLogs:!1,logsData:[],danger_id:"",logsCurrent:1,logsSize:10,logsTotal:0,notify_user:""}},mounted:function(){this.getDangerFace(this.current,this.size)},methods:{getDangerFace:function(e,t){var a=this;i["a"].dangerFace(e,t).then((function(e){a.loading=!1,a.tableData=e.data.data,a.total=e.data.total})).catch((function(e){a.loading=!1}))},currentChange:function(e){var t=this;t.current=e,t.loading=!0,t.getDangerFace(e,t.size)},sizeChange:function(e){var t=this;t.size=e,t.loading=!0,t.getDangerFace(1,e),t.current=1},addDangerFace:function(){var e=this;e.dialogDangerFace=!0},handleLogs:function(e,t){var a=this;a.dialogLogs=!0,a.danger_id=t.danger_id,a.logsCurrent=1,a.getFaceLogs(a.logsCurrent,a.logsSize)},getFaceLogs:function(e,t){var a=this,n=this;i["a"].dangerLog(e,t,n.danger_id).then((function(e){a.$message.success("获取数据成功"),n.logsData=e.data.data,n.logsTotal=e.data.total,n.logsData.forEach((function(e){e.log.timestamp=s.formatTime(e.log.timestamp,"Y-M-D h:m:s")}))}))},logsCurrentChange:function(e){var t=this;t.logsCurrent=e,t.getFaceLogs(e,t.logsSize)},logsSizeChange:function(e){var t=this;t.logsSize=e,t.getFaceLogs(1,e),t.logsCurrent=1},handleRemove:function(e,t){var a=this;a.form.href="",a.hasNewImage=!1},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleChange:function(e){var t=this;t.form.href=URL.createObjectURL(e.raw),t.hasNewImage=!0},handleAvatarSuccess:function(e,t){var a=this;a.form.href=e.data;var n=a.notify_user.split(","),r=[];n.forEach((function(e){e="+86"+e,r.push(e)})),a.form.notify_user=r.toString(),i["a"].addDangerFace(a.form).then((function(e){a.$message.success("上传成功"),a.getDangerFace(a.current,a.size),a.$refs.upload.clearFiles(),a.form={name:"",number:"",href:"",notify_score:"",notify_user:""},a.notify_user="",a.dialogDangerFace=!1}))},handleExceed:function(e,t){var a=this;a.$message.error("上传图片不能超过1张!"),a.$refs.upload.clearFiles(),a.form.href="",a.form.id=""},upload:function(){var e=this;e.$refs.upload.submit()},getQiniuToken:function(){var e=this;axios.get("https://api.fengniaotuangou.cn/api/upload/token").then((function(t){e.imgData.token=t.data.uptoken}))}}}),u=c,d=(a("c758"),a("2877")),f=Object(d["a"])(u,n,r,!1,null,"160fb719",null);t["default"]=f.exports},c758:function(e,t,a){"use strict";var n=a("5bbc"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-4c8e8248.fde7546f.js.map