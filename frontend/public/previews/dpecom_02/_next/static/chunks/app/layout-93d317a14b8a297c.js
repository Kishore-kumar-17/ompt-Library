(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{324:function(e,t,r){Promise.resolve().then(r.t.bind(r,231,23)),Promise.resolve().then(r.t.bind(r,1805,23)),Promise.resolve().then(r.t.bind(r,3054,23)),Promise.resolve().then(r.bind(r,7119))},8030:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var s=r(2265);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s.forwardRef)((e,t)=>{let{color:r="currentColor",size:n=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:c="",children:d,iconNode:u,...h}=e;return(0,s.createElement)("svg",{ref:t,...l,width:n,height:n,stroke:r,strokeWidth:o?24*Number(i)/Number(n):i,className:a("lucide",c),...h},[...u.map(e=>{let[t,r]=e;return(0,s.createElement)(t,r)}),...Array.isArray(d)?d:[d]])}),o=(e,t)=>{let r=(0,s.forwardRef)((r,l)=>{let{className:o,...c}=r;return(0,s.createElement)(i,{ref:l,iconNode:t,className:a("lucide-".concat(n(e)),o),...c})});return r.displayName="".concat(e),r}},1976:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(8030).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},4697:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(8030).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},7138:function(e,t,r){"use strict";r.d(t,{default:function(){return n.a}});var s=r(231),n=r.n(s)},7119:function(e,t,r){"use strict";r.d(t,{default:function(){return d}});var s=r(7437),n=r(2265),a=r(7138),l=r(1976),i=r(4697);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,r(8030).Z)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]),c=[{href:"/features",label:"Features"},{href:"/pricing",label:"Pricing"},{href:"#showcase",label:"Showcase"},{href:"#",label:"Docs"}];function d(){let[e,t]=(0,n.useState)(!1),[r,d]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let e=()=>t(window.scrollY>8);return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]),(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("nav",{className:"sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 transition-shadow duration-200 ".concat(e?"shadow-md":"shadow-sm"),children:[(0,s.jsxs)("div",{className:"max-w-6xl mx-auto px-6 h-16 flex items-center justify-between",children:[(0,s.jsxs)(a.default,{href:"/",className:"flex items-center gap-1.5 font-bold text-lg text-slate-900 hover:opacity-80 transition-opacity shrink-0",children:["Squeezed",(0,s.jsx)("span",{className:"inline-block w-2.5 h-2.5 rounded-full",style:{backgroundColor:"#FFEF5E"}})]}),(0,s.jsx)("ul",{className:"hidden md:flex items-center gap-8",children:c.map(e=>(0,s.jsx)("li",{children:(0,s.jsx)(a.default,{href:e.href,className:"text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors",children:e.label})},e.href))}),(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsx)(a.default,{href:"/dashboard",className:"text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block",children:"Sign in"}),(0,s.jsxs)(a.default,{href:"/start",className:"inline-flex items-center gap-1.5 text-sm font-semibold bg-lemon text-slate-900 px-4 py-2 rounded-card hover:-translate-y-0.5 transition-transform shadow-sm",children:["Get started free",(0,s.jsx)(l.Z,{size:13})]}),(0,s.jsx)("button",{className:"md:hidden text-slate-600 hover:text-slate-900 transition-colors ml-1 p-1",onClick:()=>d(!r),"aria-label":"Toggle menu",children:r?(0,s.jsx)(i.Z,{size:20}):(0,s.jsx)(o,{size:20})})]})]}),r&&(0,s.jsxs)("div",{className:"md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3",children:[c.map(e=>(0,s.jsx)(a.default,{href:e.href,onClick:()=>d(!1),className:"block text-sm font-medium text-slate-700 hover:text-slate-900 py-1.5",children:e.label},e.href)),(0,s.jsx)(a.default,{href:"/dashboard",onClick:()=>d(!1),className:"block text-sm font-medium text-slate-700 hover:text-slate-900 py-1.5 border-t border-slate-100 pt-3",children:"Sign in"})]})]})})}},3054:function(){},1805:function(e){e.exports={style:{fontFamily:"'__Inter_04b02f', '__Inter_Fallback_04b02f'",fontStyle:"normal"},className:"__className_04b02f",variable:"__variable_04b02f"}}},function(e){e.O(0,[810,231,971,23,744],function(){return e(e.s=324)}),_N_E=e.O()}]);