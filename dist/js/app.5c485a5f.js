(function(e){function n(n){for(var r,o,u=n[0],s=n[1],i=n[2],d=0,l=[];d<u.length;d++)o=u[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&l.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(n);while(l.length)l.shift()();return c.push.apply(c,i||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],r=!0,o=1;o<t.length;o++){var u=t[o];0!==a[u]&&(r=!1)}r&&(c.splice(n--,1),e=s(s.s=t[0]))}return e}var r={},o={app:0},a={app:0},c=[];function u(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-09dea4a4":"d106d59f","chunk-157fa938":"b26565ac","chunk-1ab03178":"d93d49d3","chunk-23780558":"289717a5","chunk-99b053e8":"417d8b45","chunk-364928c2":"710bdae6","chunk-46f63dd2":"93e83218","chunk-52e350f6":"5d4282be","chunk-586cd034":"fa2e4ca6","chunk-6f9298c2":"a4b2b32b","chunk-d9dec7d8":"1d9b3186","chunk-e2bf3ecc":"974c8937","chunk-53fe0f83":"64b4a3ef","chunk-36269870":"783c4a6f","chunk-41c043ba":"4ef91579","chunk-efa118a0":"f82e3d90"}[e]+".js"}function s(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.e=function(e){var n=[],t={"chunk-09dea4a4":1,"chunk-157fa938":1,"chunk-1ab03178":1,"chunk-23780558":1,"chunk-364928c2":1,"chunk-46f63dd2":1,"chunk-586cd034":1,"chunk-6f9298c2":1,"chunk-53fe0f83":1,"chunk-36269870":1,"chunk-41c043ba":1,"chunk-efa118a0":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-09dea4a4":"8e5ebb3f","chunk-157fa938":"4784fd6c","chunk-1ab03178":"a695c1db","chunk-23780558":"59e38391","chunk-99b053e8":"31d6cfe0","chunk-364928c2":"0d4e8262","chunk-46f63dd2":"6405ab7d","chunk-52e350f6":"31d6cfe0","chunk-586cd034":"7e37f38f","chunk-6f9298c2":"d26a80e0","chunk-d9dec7d8":"31d6cfe0","chunk-e2bf3ecc":"31d6cfe0","chunk-53fe0f83":"9fe9b845","chunk-36269870":"40d35844","chunk-41c043ba":"686d9d78","chunk-efa118a0":"66df57b0"}[e]+".css",a=s.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var i=c[u],d=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(d===r||d===a))return n()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){i=l[u],d=i.getAttribute("data-href");if(d===r||d===a)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],f.parentNode.removeChild(f),t(c)},f.href=a;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)n.push(r[2]);else{var c=new Promise((function(n,t){r=a[e]=[n,t]}));n.push(r[2]=c);var i,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=u(e);var l=new Error;i=function(n){d.onerror=d.onload=null,clearTimeout(f);var t=a[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,t[1](l)}a[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:d})}),12e4);d.onerror=d.onload=i,document.head.appendChild(d)}return Promise.all(n)},s.m=e,s.c=r,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)s.d(t,r,function(n){return e[n]}.bind(null,r));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=n,i=i.slice();for(var l=0;l<i.length;l++)n(i[l]);var f=d;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){t("db4d"),e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("45fc"),t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),o=(t("be3b"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[e.isRouterRefresh?t("router-view"):e._e()],1)}),a=[],c={provide:function(){return{reload:this.reload}},data:function(){return{isRouterRefresh:!0}},methods:{reload:function(){this.isRouterRefresh=!1,this.$nextTick((function(){this.isRouterRefresh=!0}))}}},u=c,s=(t("5c0b"),t("2877")),i=Object(s["a"])(u,o,a,!1,null,null,null),d=i.exports,l=(t("d3b7"),t("8c4f")),f=[{path:"/resident",name:"resident",component:function(){return t.e("chunk-46f63dd2").then(t.bind(null,"74e9"))},meta:{title:"住户管理",icon:"el-icon-s-custom"}},{path:"/house",name:"house",component:function(){return t.e("chunk-d9dec7d8").then(t.bind(null,"bda8"))},meta:{title:"房屋管理",icon:"el-icon-s-home"},children:[{path:"/houses",name:"houses",component:function(){return t.e("chunk-efa118a0").then(t.bind(null,"7218"))},meta:{title:"房屋列表"}}]},{path:"/picture",name:"picture",component:function(){return t.e("chunk-52e350f6").then(t.bind(null,"0c7e"))},meta:{title:"图文管理",icon:"el-icon-picture-outline"},children:[{path:"/banner",name:"banner",component:function(){return Promise.all([t.e("chunk-e2bf3ecc"),t.e("chunk-36269870")]).then(t.bind(null,"60b0"))},meta:{title:"轮播图管理"}},{path:"/message",name:"message",component:function(){return Promise.all([t.e("chunk-e2bf3ecc"),t.e("chunk-23780558"),t.e("chunk-53fe0f83")]).then(t.bind(null,"9953"))},meta:{title:"资讯管理"}},{path:"/document",name:"document",component:function(){return Promise.all([t.e("chunk-23780558"),t.e("chunk-99b053e8")]).then(t.bind(null,"58d5"))},meta:{title:"文档管理"}}]},{path:"/buy",name:"buy",component:function(){return t.e("chunk-09dea4a4").then(t.bind(null,"8649"))},meta:{title:"购买服务管理",icon:"el-icon-bank-card"}},{path:"/suspected",name:"suspected",component:function(){return Promise.all([t.e("chunk-e2bf3ecc"),t.e("chunk-41c043ba")]).then(t.bind(null,"9e8d"))},meta:{title:"可疑人物信息",icon:"el-icon-picture"}},{path:"/permission",name:"permission",component:function(){return t.e("chunk-157fa938").then(t.bind(null,"b9e5"))},meta:{title:"权限管理",icon:"el-icon-setting"}}],h=f;r["default"].use(l["a"]);var m=new l["a"]({mode:"history",routes:[{path:"/login",name:"login",component:function(){return t.e("chunk-1ab03178").then(t.bind(null,"dd7b"))},meta:{title:"登录"}}]}),p=[{path:"",component:function(){return t.e("chunk-586cd034").then(t.bind(null,"e0f0"))},name:"container",redirect:"desktop",meta:{requiresAuth:!0,title:"首页"},children:[{path:"/desktop",component:function(){return t.e("chunk-6f9298c2").then(t.bind(null,"07c3"))},name:"desktop",meta:{title:"首页",icon:"el-icon-s-home"}}]},{path:"*",component:function(){return t.e("chunk-364928c2").then(t.bind(null,"8cdb"))}}],g=t("2f62"),b=(t("99af"),t("7db0"),t("2909")),k=(t("96cf"),t("1da1")),v=(t("4de4"),t("4160"),t("caad"),t("d81d"),t("b0c0"),t("2532"),t("159b"),t("5530"));function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],t=n.filter((function(n){return e.includes(n.name)})).map((function(n){return Object(v["a"])(Object(v["a"])({},n),{},{children:n.children?S(e,n.children):null})}));return t}var w=t("7ded"),y={namespaced:!0,state:{permissionList:null,sidebarMenu:[],currentMenu:"",control_list:[],permissions:[]},getters:{},mutations:{SET_PERMISSION:function(e,n){e.permissionList=n},CLEAR_PERMISSION:function(e){e.permissionList=null},SET_MENU:function(e,n){e.sidebarMenu=n},CLEAR_MENU:function(e){e.sidebarMenu=[]},SET_CURRENT_MENU:function(e,n){e.currentMenu=n},SET_CONTROL_LIST:function(e,n){e.control_list=n},SET_NICKNAME:function(e,n){e.nickname=n},SET_PERMISSIONS:function(e,n){e.permissions=n}},actions:{FETCH_PERMISSION:function(e){return Object(k["a"])(regeneratorRuntime.mark((function n(){var t,r,o,a,c,u,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t=e.commit,e.state,r=localStorage.getItem("token"),n.next=4,w["a"].userInfo(r);case 4:o=n.sent,localStorage.setItem("permissions",o.permissions),t("SET_PERMISSIONS",o.permissions),a=S(o.permissions,h),c=p.find((function(e){return""===e.path})),u=c.children,t("SET_CONTROL_LIST",[].concat(Object(b["a"])(u),Object(b["a"])(h))),u.push.apply(u,Object(b["a"])(a)),t("SET_MENU",u),s=m.options.routes,m.addRoutes(p),t("SET_PERMISSION",[].concat(Object(b["a"])(s),Object(b["a"])(p)));case 16:case"end":return n.stop()}}),n)})))()}}},E={permission:y},M={collapse:!1,crumbList:[]},P={collapseChage:function(e){e.collapse=!e.collapse},setCrumbList:function(e,n){e.crumbList=n}};r["default"].use(g["a"]);var T=new g["a"].Store({state:M,modules:E,mutations:P}),_=t("5c96"),I=t.n(_),O=(t("0fae"),t("313e")),R=t.n(O);t("73718"),t("5aa7");r["default"].use(I.a),r["default"].prototype.$echarts=R.a,r["default"].use(R.a),r["default"].config.productionTip=!1,m.beforeEach((function(e,n,t){document.title="".concat(e.meta.title," - 图巴诺出租屋安全系统");var r=localStorage.getItem("token");r?T.state.permission.permissionList?"/login"!==e.path?t():t(n.fullPath):T.dispatch("permission/FETCH_PERMISSION").then((function(){t({path:e.path})})):e.matched.length>0&&!e.matched.some((function(e){return e.meta.requiresAuth}))?t():t({path:"/login"})})),m.afterEach((function(e,n,t){var r=e.matched;T.commit("setCrumbList",r),T.commit("permission/SET_CURRENT_MENU",e.path)})),new r["default"]({router:m,store:T,render:function(e){return e(d)}}).$mount("#app")},"5aa7":function(e,n,t){},"5c0b":function(e,n,t){"use strict";var r=t("9c0c"),o=t.n(r);o.a},73718:function(e,n,t){},"7ded":function(e,n,t){"use strict";var r=t("be3b"),o=t("99b1"),a=t.n(o),c={login:function(e){return r["a"].post(a.a.Login,e)},userInfo:function(e){return r["a"].get(a.a.Permissions,{token:e})},logout:function(){return r["a"].get(a.a.Logout)},resetPassword:function(e){return r["a"].post(a.a.ResetPassword,e)}};n["a"]=c},"99b1":function(e,n){var t="https://chu.fengniaotuangou.cn",r={Login:t+"/login",Logout:t+"/logout",ResetPassword:t+"/reset/password",Permissions:t+"/permissions",HouseManagers:t+"/house/managers",CheckManagers:t+"/check/managers",Addresses:t+"/addresses",Rooms:t+"/rooms",Households:t+"/households",Household:t+"/household",AddressResidents:t+"/address/residents",FaceLogs:t+"/face/logs",DelBuilding:t+"/room",Banner:t+"/banner",Banners:t+"/banners",Document:t+"/help/doc",Documents:t+"/help/docs",DelDocument:t+"/help/doc",Message:t+"/document",Messages:t+"/documents",MessageType:t+"/document/type",MessageTypes:t+"/document/type",DocumentDel:t+"/document",DelBanner:t+"/banner",DelDocumentType:t+"/document/type",Role:t+"/role",User:t+"/user",Users:t+"/users",Areas:t+"/areas",Buys:t+"/products",Buy:t+"/product",Server:t+"/orders",DelServer:t+"/product",SetProduct:t+"/set/Product",UserServes:t+"/user/serves",DangerFace:t+"/danger/face",Address:t+"/addresses",DangerLog:t+"/danger/log",Statistics:t+"/statistics"};e.exports=r},"9c0c":function(e,n,t){},be3b:function(e,n,t){"use strict";t("d3b7"),t("ac1f"),t("5319");var r=t("bc3a"),o=t.n(r),a=t("5c96"),c=void 0,u=t("4328"),s={},i=o.a.create({timeout:5e3,headers:{"Content-Type":"application/x-www-form-urlencoded"}});i.interceptors.request.use((function(e){var n=localStorage.getItem("token");return n&&(e.headers.common["token"]="".concat(n)),e}),(function(e){return Promise.reject(e)})),i.interceptors.response.use((function(e){if(200===e.status)switch(e.data.code){case 10001:a["Message"].warning({message:"请重新登录"}),setTimeout((function(){localStorage.removeItem("username"),localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("permissions"),window.location.reload(),c.$router.replace("/login")}),1e3);break;case 10002:a["Message"].warning({message:e.data.toast});break;case 10003:a["Message"].warning({message:e.data.toast});break;case 10004:a["Message"].warning({message:e.data.toast});break;case 10005:a["Message"].warning({message:e.data.toast});break;default:return e.data}}),(function(e){return e.response.status&&a["Message"].warning({message:e.response.data.msg}),"need login"===e.response.data.msg&&(a["Message"].warning({message:"请重新登录"}),localStorage.removeItem("username"),localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("permissions"),window.location.reload(),c.$router.replace("/login")),Promise.reject(e)})),s.get=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(t,r){i.get(e,{params:n}).then((function(e){t(e.data)})).catch((function(e){r(e)}))}))},s.del=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(t,r){i.delete(e,{params:n}).then((function(e){t(e.data)})).catch((function(e){r(e)}))}))},s.post=function(e,n){return new Promise((function(t,r){i.post(e,u.stringify(n)).then((function(e){t(e.data)})).catch((function(e){r(e)}))}))},s.put=function(e,n){return new Promise((function(t,r){i.put(e,u.stringify(n)).then((function(e){t(e.data)})).catch((function(e){r(e)}))}))},n["a"]=s}});
//# sourceMappingURL=app.5c485a5f.js.map