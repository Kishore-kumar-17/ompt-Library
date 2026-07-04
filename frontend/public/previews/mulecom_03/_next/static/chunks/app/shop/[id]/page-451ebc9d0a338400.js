(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[516],{713:function(e,t,n){Promise.resolve().then(n.t.bind(n,8173,23)),Promise.resolve().then(n.t.bind(n,231,23)),Promise.resolve().then(n.bind(n,898))},8030:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(2265);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),u=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((e,t,n)=>!!e&&n.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,r.forwardRef)((e,t)=>{let{color:n="currentColor",size:i=24,strokeWidth:o=2,absoluteStrokeWidth:a,className:c="",children:l,iconNode:d,...f}=e;return(0,r.createElement)("svg",{ref:t,...s,width:i,height:i,stroke:n,strokeWidth:a?24*Number(o)/Number(i):o,className:u("lucide",c),...f},[...d.map(e=>{let[t,n]=e;return(0,r.createElement)(t,n)}),...Array.isArray(l)?l:[l]])}),a=(e,t)=>{let n=(0,r.forwardRef)((n,s)=>{let{className:a,...c}=n;return(0,r.createElement)(o,{ref:s,iconNode:t,className:u("lucide-".concat(i(e)),a),...c})});return n.displayName="".concat(e),n}},2940:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("CircleCheckBig",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},9715:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]])},6246:function(e,t,n){"use strict";/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(2265),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},u=r.useState,s=r.useEffect,o=r.useLayoutEffect,a=r.useDebugValue;function c(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!i(e,n)}catch(e){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=u({inst:{value:n,getSnapshot:t}}),i=r[0].inst,l=r[1];return o(function(){i.value=n,i.getSnapshot=t,c(i)&&l({inst:i})},[e,n,t]),s(function(){return c(i)&&l({inst:i}),e(function(){c(i)&&l({inst:i})})},[e]),a(n),n};t.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:l},4453:function(e,t,n){"use strict";/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(2265),i=n(554),u="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=i.useSyncExternalStore,o=r.useRef,a=r.useEffect,c=r.useMemo,l=r.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var d=o(null);if(null===d.current){var f={hasValue:!1,value:null};d.current=f}else f=d.current;var m=s(e,(d=c(function(){function e(e){if(!a){if(a=!0,s=e,e=r(e),void 0!==i&&f.hasValue){var t=f.value;if(i(t,e))return o=t}return o=e}if(t=o,u(s,e))return t;var n=r(e);return void 0!==i&&i(t,n)?(s=e,t):(s=e,o=n)}var s,o,a=!1,c=void 0===n?null:n;return[function(){return e(t())},null===c?void 0:function(){return e(c())}]},[t,n,r,i]))[0],d[1]);return a(function(){f.hasValue=!0,f.value=m},[m]),l(m),m}},554:function(e,t,n){"use strict";e.exports=n(6246)},5006:function(e,t,n){"use strict";e.exports=n(4453)},898:function(e,t,n){"use strict";n.d(t,{default:function(){return a}});var r=n(7437),i=n(2940),u=n(9715),s=n(2265),o=n(3490);function a(e){let{product:t}=e,n=(0,o.x)(e=>e.addItem),[a,c]=(0,s.useState)(!1);return(0,r.jsx)("button",{onClick:function(){n({productId:t.id,slug:t.slug,name:t.name,shopId:t.shopId,shopName:t.shopName,priceINR:t.priceINR,quantity:1,image:t.images[0],dispatchDays:t.dispatchDays,returnEligible:t.returnEligible}),c(!0),setTimeout(()=>c(!1),2e3)},className:"w-full h-12 text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90",style:{background:a?"var(--trust)":"var(--action)",borderRadius:"var(--radius-btn)",transition:"background 0.2s"},children:a?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Z,{size:16}),"Added to cart"]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.Z,{size:16}),"Add to cart"]})})}},3490:function(e,t,n){"use strict";let r;n.d(t,{x:function(){return m}});let i=e=>{let t;let n=new Set,r=(e,r)=>{let i="function"==typeof e?e(t):e;if(!Object.is(i,t)){let e=t;t=(null!=r?r:"object"!=typeof i||null===i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,u={setState:r,getState:i,getInitialState:()=>s,subscribe:e=>(n.add(e),()=>n.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},s=t=e(r,i,u);return u},u=e=>e?i(e):i;var s=n(2265),o=n(5006);let{useDebugValue:a}=s,{useSyncExternalStoreWithSelector:c}=o,l=!1,d=e=>e,f=e=>{"function"!=typeof e&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");let t="function"==typeof e?u(e):e,n=(e,n)=>(function(e,t=d,n){n&&!l&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),l=!0);let r=c(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,n);return a(r),r})(t,e,n);return Object.assign(n,t),n},m=(r=(e,t)=>({items:[],addItem:t=>e(e=>e.items.find(e=>e.productId===t.productId)?{items:e.items.map(e=>e.productId===t.productId?{...e,quantity:e.quantity+1}:e)}:{items:[...e.items,t]}),removeItem:t=>e(e=>({items:e.items.filter(e=>e.productId!==t)})),updateQty:(t,n)=>e(e=>({items:0===n?e.items.filter(e=>e.productId!==t):e.items.map(e=>e.productId===t?{...e,quantity:n}:e)})),clearCart:()=>e({items:[]}),totalItems:()=>t().items.reduce((e,t)=>e+t.quantity,0)}))?f(r):f}},function(e){e.O(0,[231,173,971,23,744],function(){return e(e.s=713)}),_N_E=e.O()}]);