(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/pages/agent/query"],{313:function(e,t,n){"use strict";(function(e,t){var o=n(4);n(26);o(n(25));var i=o(n(314));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n(1)["default"],n(2)["createPage"])},314:function(e,t,n){"use strict";n.r(t);var o=n(315),i=n(317);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n(319),n(321);var u,a=n(50),s=Object(a["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,"26d2d3ad",null,!1,o["components"],u);s.options.__file="packageA/pages/agent/query.vue",t["default"]=s.exports},315:function(e,t,n){"use strict";n.r(t);var o=n(316);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},316:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return i})),n.d(t,"staticRenderFns",(function(){return u})),n.d(t,"recyclableRender",(function(){return r})),n.d(t,"components",(function(){return o}));try{o={uNavbar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(n.bind(null,831))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,878))},uLoadmore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loadmore/u-loadmore")]).then(n.bind(null,891))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){return e.$mHelper.goBack()})},r=!1,u=[];i._withStripped=!0},317:function(e,t,n){"use strict";n.r(t);var o=n(318),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},318:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(194),i={data:function(){return{list:[],keyword:"",page:1,pageSize:10,total:0,pageNumber:0,status:"loadmore",select:""}},onLoad:function(e){e.select&&(this.select=e.select),this.getList()},onReachBottom:function(){console.log("我滚动到底部了~"),this.page>=this.pageNumber?this.status="nomore":(this.status="loading",this.pageSize+=this.pageSize,this.getList())},onPullDownRefresh:function(){this.page=1,this.getList(),e.startPullDownRefresh({})},methods:{getList:function(){var t=this;(0,o.getSelectXiaji)({page:this.page,pageSize:this.pageSize,stxt:this.keyword}).then((function(n){e.stopPullDownRefresh(),t.total=n.totalnum,t.pageNumber=Math.ceil(Number(n.totalnum)/t.pageSize),console.log(t.pageNumber),1==t.page?t.list=n.huobanlist:t.list=t.list.concat(n.huobanlist),t.page>=t.pageNumber?t.status="nomore":t.status="loadmore"}))},loadmore:function(){this.page>=this.pageNumber?this.status="nomore":(this.status="loading",this.pageSize+=this.pageSize,this.getList())},search:function(){this.page,this.getList()},selectItem:function(t){this.select=t.bianhao;var n=getCurrentPages(),o=n[n.length-2];console.log(o),o.$vm.handleSelectAgent(t),e.navigateBack({delta:1})}}};t.default=i}).call(this,n(2)["default"])},319:function(e,t,n){"use strict";n.r(t);var o=n(320),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},320:function(e,t,n){},321:function(e,t,n){"use strict";n.r(t);var o=n(322),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},322:function(e,t,n){}},[[313,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/packageA/pages/agent/query.js.map