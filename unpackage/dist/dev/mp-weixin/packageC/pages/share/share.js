(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageC/pages/share/share"],{723:function(e,n,t){"use strict";(function(e,n){var o=t(4);t(26);o(t(25));var r=o(t(724));e.__webpack_require_UNI_MP_PLUGIN__=t,n(r.default)}).call(this,t(1)["default"],t(2)["createPage"])},724:function(e,n,t){"use strict";t.r(n);var o=t(725),r=t(727);for(var a in r)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(a);var c,i=t(50),u=Object(i["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],c);u.options.__file="packageC/pages/share/share.vue",n["default"]=u.exports},725:function(e,n,t){"use strict";t.r(n);var o=t(726);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},726:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return a})),t.d(n,"components",(function(){return o}));try{o={uNavbar:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(t.bind(null,831))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){return e.$mHelper.goBack()})},a=!1,c=[];r._withStripped=!0},727:function(e,n,t){"use strict";t.r(n);var o=t(728),r=t.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a},728:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(194),r={data:function(){return{imgUrl:"",show:!1,list:[{name:"长按保存图片",color:"#ffaa7f",fontSize:"20"}]}},onLoad:function(){this.getImgUrl()},methods:{getImgUrl:function(){var e=this;(0,o.getShareImg)().then((function(n){e.imgUrl=n.imgurl}))},handleSave:function(){e.showModal({title:"分享",content:"保存二维码至相册",confirmText:"确定",cancelText:"取消",success:function(e){e.confirm}})},saveImage:function(){console.log(this.imgUrl)},transImage:function(){var n=this;e.showLoading({title:"正在转换..."});var t=document.getElementById("canvasImg");html2canvas(t,{allowTaint:!0,useCORS:!0}).then((function(t){var o=t.toDataURL("image/png");console.log(o),n.downloadIamge(o,"plantCardImg.png"),e.hideLoading()}))},downloadIamge:function(n,t){var o=new Image;o.setAttribute("crossOrigin","anonymous"),o.onload=function(){var n=document.createElement("canvas");n.width=o.width,n.height=o.height;var r=n.getContext("2d");r.drawImage(o,0,0,o.width,o.height);var a=n.toDataURL("image/png"),c=document.createElement("a"),i=new MouseEvent("click");c.download=t||"photo",c.href=a,c.dispatchEvent(i),e.showToast({title:"图片已保存",icon:"success"})},o.src=n}}};n.default=r}).call(this,t(2)["default"])}},[[723,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/packageC/pages/share/share.js.map