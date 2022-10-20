var et=Object.defineProperty;var K=(s,t)=>{for(var e in t)et(s,e,{get:t[e],enumerable:!0})};var st="[object Module]",j=s=>!!(s&&(!!Object.keys(s).reduce((e,o)=>{let r=Object.getOwnPropertyDescriptor(s,o),n=r&&r.get&&!r.set?1:0;return e+n},0)||Object.prototype.toString.call(s)===st));var B=(s,t)=>{if(s&&typeof s=="object"&&t&&typeof t=="object"){let e=JSON.stringify(s),o=JSON.stringify(t);return e===o}else return s===t},k=(s,t)=>Promise.all(Object.getOwnPropertySymbols(s).map(e=>t(e,s[e]))),m=(s,t)=>{let e=t.path[s];if(!e)throw new Error("Invalid Path Type");return e.filter(r=>typeof r=="string").join(t.keySeparator)},M=(s,t)=>{let e=s;return typeof s=="string"?e=s.split(t.keySeparator):typeof s=="symbol"&&(e=[s]),{id:e[0],path:e.slice(1)}},g=(s,t,e,o,r=!0)=>{if(s instanceof Function&&s(t,e,o),r&&window.ESMonitorState){let n=window.ESMonitorState.callback;window.ESMonitorState.state[t]={output:o,value:e},g(n,t,e,o,!1)}};var ot=60,F=class{constructor(t,e){this.listeners={};this.setOptions=(t={})=>{for(let e in t)this[e]=t[e]};this.add=t=>{let e=t.sub;this.listeners[e]=t,this.start()};this.get=t=>this.listeners[t];this.remove=t=>{delete this.listeners[t],Object.keys(this.listeners).length||this.stop()};this.poll=t=>{k(t,(e,o)=>{let{callback:r,current:n,history:i}=o;o.path.resolved||(o.path.resolved=m("output",o)),B(n,i)||(g(r,o.path.resolved,{},n),typeof n=="object"?Array.isArray(n)?i=[...n]:i={...n}:t[e].history=n)})};this.start=(t=this.listeners)=>{this.sps?this.#t||(console.warn("[escode]: Starting Polling!"),this.#t=setInterval(()=>this.poll(t),1e3/this.sps)):this.sps=ot};this.stop=()=>{this.#t&&(console.warn("[escode]: Stopped Polling!"),clearInterval(this.#t))};t&&(this.listeners=t),e&&(this.sps=e)}#t;#e;get sps(){return this.#e}set sps(t){this.#e=t;let e=this.listeners;Object.keys(e).length&&(this.stop(),this.start())}};var v={};K(v,{functionExecution:()=>T,functions:()=>V,info:()=>U,register:()=>X,set:()=>D,setterExecution:()=>A,setters:()=>Z});window.ESMonitorState={state:{},callback:void 0,info:{}};var z=window.ESMonitorState;var rt=async(s,t)=>{let e=globalThis.performance.now(),o=await s(...t),r=globalThis.performance.now();return{output:o,value:r-e}},H={performance:rt},Q=async(s,t,e)=>{let o={value:{},output:void 0},r={...z.info,...e};for(let n in r)if(r[n]&&H[n]){let i=s;s=async(...a)=>{let l=await H[n](i,a);return o.value[n]=l.value,l.output}}return o.output=await s(...t),o};var S=Symbol("isProxy"),x=Symbol("fromInspectable");var P=".";var E=(s,t)=>t.hasOwnProperty(s)||s in t,C=(s,t,e={})=>{let o=e.fallbacks??[],r=e.keySeparator??P;typeof t=="string"?t=t.split(r):typeof t=="symbol"&&(t=[t]);let n;t=[...t];let i=s,a=!1;for(let l=0;l<t.length;l++){if(!i){let p="Could not get path";throw console.error(p,t,i),new Error(p)}a||(a=!!i.__esInspectable);let c=t[l];if(!E(c,i)&&i.hasOwnProperty("esComponents"))for(let p in o){let f=o[p];if(E(f,i)){i=i[f];break}}if(n=E(c,i),n)i=i[c];else{a?i.__esInspectable||console.warn("Might be ignoring incorrectly..."):console.error(`Will not get updates from: ${t.filter(p=>typeof p=="string").join(r)}`);return}}return e.output==="info"?{value:i,exists:n}:i},_=(s,t,e,o={})=>{let r=o?.create??!1,n=o?.keySeparator??P;typeof s=="string"?s=s.split(n):typeof s=="symbol"&&(s=[s]),s=[...s];let i=[...s],a=i.pop();for(let l=0;l<i.length;l++){let c=i[l],p=E(c,e);if(r&&!p&&(e[c]={},p=!0),p)e=e[c];else{let f="Could not set path";throw console.error(f,s),new Error(f)}e.esComponents&&(e=e.esComponents)}e[a]=t};var G={};K(G,{functions:()=>it,objects:()=>at});var it=s=>({apply:async function(t,e,o){try{let r=t;o[0]?.[x]&&(r=o[0].value,o=o.slice(1));let i=s.listeners.functions,a=s.path.join(s.options.keySeparator),l=i?i[a]:void 0,c,p={};l?(p=await T(e,l,r,o),c=p.output):(c=await r.apply(e,o),p=s?.state?.[a]?.value??{});let f=s.options.callback;return g(f,a,p,c),c}catch(r){console.warn("Cannot run function:",r,s.path,s.parent,t,o)}}}),at=s=>({get(t,e,o){return e===S?!0:Reflect.get(t,e,o)},set(t,e,o,r){if(e===S)return!0;let n=[...s.path,e].join(s.options.keySeparator),i=o?.[x];i&&(o=o.value);let a=s.listeners.setters;if(!t.hasOwnProperty(e)&&typeof s.options.globalCallback=="function"){let p=s.path[0];D("setters",n,o,s.options.globalCallback,{[p]:s.root},s.listeners,s.options)}if(o){let p=s.create(e,t,o);p&&(o=p)}if(a){let p=a[n];p&&A(p,o)}let l=s.options.callback,c=s?.state?.[n]?.value??{};return g(l,n,c,o),i?!0:Reflect.set(t,e,o,r)}});var lt=(s,t,e)=>{try{e===void 0&&(e=s[t])}catch(c){return c}if(s[t]&&s[t][S])return!1;let r=typeof e,n=r==="object",i=r=="function";if(!e||!(n||i)||e instanceof Element||e instanceof EventTarget)return!1;let l=n&&j(e);if(i)return!0;{let c=Object.getOwnPropertyDescriptor(s,t);if(c&&(c.value&&c.writable||c.set)){if(!l)return!0}else if(!s.hasOwnProperty(t))return!0}return!1},O=class{constructor(t={},e={},o,r){this.path=[];this.listeners={};this.state={};this.set=(t,e,o)=>{this.state[t]={output:o,value:e},_(t,o,this.proxy,{create:!0})};this.check=lt;this.create=(t,e,o,r=!1)=>{let n=this.check(e,t,o);if(o===void 0&&(o=e[t]),n&&!(n instanceof Error))return e[t]=new O(o,this.options,t,this),e[t];if(r)try{this.proxy[t]=o??e[t]}catch(i){let a=j(e),l=[...this.path,t];console.error(`Could not set value (${l.join(this.options.keySeparator)})${a?" because the parent is an ESM.":""}`,a?"":i)}};if(e.pathFormat||(e.pathFormat="relative"),e.keySeparator||(e.keySeparator=P),t.__esProxy)this.proxy=t.__esProxy;else if(t[S])this.proxy=t;else{this.target=t,this.options=e,this.parent=r,this.parent?(this.root=this.parent.root,this.path=[...this.parent.path],this.state=this.parent.state??{}):this.root=t,o&&this.path.push(o),this.options.listeners&&(this.listeners=this.options.listeners),this.options.path&&(this.options.path instanceof Function?this.path=this.options.path(this.path):Array.isArray(this.options.path)?this.path=this.options.path:console.log("Invalid path",this.options.path)),this.path&&(this.path=this.path.filter(a=>typeof a=="string")),this.options.keySeparator||(this.options.keySeparator=P);let n=this.options.type;n!="object"&&(n=typeof t=="function"?"function":"object");let i=G[`${n}s`](this);this.proxy=new Proxy(t,i),Object.defineProperty(t,"__esProxy",{value:this.proxy,enumerable:!1}),Object.defineProperty(t,"__esInspectable",{value:this,enumerable:!1});for(let a in t){if(!this.parent){let l=t[a];if(typeof l=="function")t[a]=async(...c)=>await this.proxy[a]({[x]:!0,value:l},...c);else try{Object.defineProperty(t,a,{get:()=>l,set:c=>{l=c,this.proxy[a]={[x]:!0,value:c}},enumerable:!0,configurable:!0})}catch{console.error(`Could not reassign ${a} to a top-level setter...`)}}this.create(a,t,void 0,!0)}}return this.proxy}};var R=(s,t,e,o)=>{let r=o.reference,n=Array.isArray(s)?s[0]:typeof s=="string"?s.split(e.keySeparator)[0]:s,i=o.hasOwnProperty("static")?!o.static:!1;i&&!globalThis.Proxy&&(i=!1,console.warn("Falling back to using function interception and setters...")),i&&(t=new O(t,{pathFormat:e.pathFormat,keySeparator:e.keySeparator,listeners:o.listeners,path:l=>l.filter(c=>!e.fallbacks||!e.fallbacks.includes(c))},n));let a={keySeparator:e.keySeparator,...o};return _(s,t,r,a),t};var U=(s,t,e,o,r,n,i)=>{typeof e=="string"&&(e=e.split(i.keySeparator));let a=e.join(i.keySeparator),l=r,c=d=>C(r,d,{keySeparator:i.keySeparator,fallbacks:i.fallbacks}),p=(d,I)=>R(d,I,i,{reference:r,listeners:n}),f=i.onUpdate,h={};f&&typeof f=="object"&&f.callback instanceof Function&&(h=f.info??{},f=f.callback);let u=[s,...e],y={absolute:u,relative:a.split(i.keySeparator),parent:u.slice(0,-1)};y.output=y[i.pathFormat];let b={id:s,path:y,keySeparator:i.keySeparator,infoToOutput:h,callback:async(...d)=>{let I=await t(...d);return f instanceof Function&&f(...d),I},get current(){return c(b.path.absolute)},set current(d){p(b.path.absolute,d)},get parent(){return c(b.path.parent)},get reference(){return l[s]},set reference(d){l[s]=d},original:o,history:typeof o=="object"?Object.assign({},o):o,sub:Symbol("subscription"),last:e.slice(-1)[0]};return b},X=(s,t,e)=>{let o=m("absolute",s);t[o]||(t[o]={}),t[o][s.sub]=s,e&&(e[s.sub]=o)},J={functions:V,setters:Z},D=(s,t,e,o,r,n,i)=>{let{id:a,path:l}=M(t,i),c=U(a,o,l,e,r,J,i);if(J[s])J[s](c,n[s],n.lookup);else{let p=m("absolute",c);n[s][p][c.sub]=c,n.lookup&&(n.lookup[c.sub]=p)}},ct=(s,t)=>t[m("absolute",s)],Y=(s,t,e,o)=>{if(!ct(s,t)){let r=s.parent,n=r[s.last];e(n,r)}X(s,t,o)},A=async(s,t)=>{await k(s,(e,o)=>{let r=m("output",o);g(o.callback,r,{},t)})};function Z(s,t,e){Y(s,t,(o,r)=>{let n=o;if(!r[S]){let i=!0;try{delete r[s.last]}catch{console.error("Unable to redeclare setters. May already be a dynamic object..."),i=!1}if(i)try{Object.defineProperty(r,s.last,{get:()=>n,set:async a=>{n=a;let l=Object.assign({},t[m("absolute",s)]);A(l,a)},enumerable:!0,configurable:!0})}catch(a){throw a}}},e)}var T=async(s,t,e,o)=>{t=Object.assign({},t);let r=Object.getOwnPropertySymbols(t),n=t[r[0]]??{},i=await Q(async(...a)=>await e.call(s,...a),o,n.infoToOutput);return await k(t,(a,l)=>{let c=m("output",l);g(l.callback,c,i.value,i.output)}),i};function V(s,t,e){Y(s,t,(o,r)=>{r[S]||(r[s.last]=async function(...n){let i=t[m("absolute",s)];return T(this,i,s.original,n)})},e)}var tt=(s,t,e)=>{let o=e.accumulator;o||(o=e.accumulator={});let r=e.ignore||[],n=e.path||[],i=e.condition||!0,a=[],l=[],c=(p,f={},h)=>{for(let u in p){if(r.includes(u))continue;let y=p[u],w=[...h.path,u],b={typeof:typeof y,name:y?.constructor?.name,simple:!0,object:y&&typeof y=="object",path:w};if(b.object){let d=b.name;if(d==="Object"||d==="Array"){b.simple=!0;let I=a.indexOf(y);if(I!==-1)f[u]=l[I];else{a.push(y);let N=i instanceof Function?i(u,y,b):i;b.pass=N,f[u]=t(u,y,b),N&&(l.push(f[u]),f[u]=c(y,f[u],{...h,path:w}))}}else b.simple=!1,f[u]=t(u,y,b)}else f[u]=t(u,y,b)}return f};return c(s,o,{path:n})};var L=class{constructor(t={}){this.poller=new F;this.options={pathFormat:"relative",keySeparator:P};this.listeners={polling:this.poller.listeners,functions:{},setters:{},lookup:{}};this.references={};this.get=(t,e)=>C(this.references,t,{keySeparator:this.options.keySeparator,fallbacks:this.options.fallbacks,output:e});this.set=(t,e,o={})=>{let r={...o};return r.reference||(r.reference=this.references),r.listeners||(r.listeners=this.listeners),R(t,e,this.options,r)};this.on=(t,e)=>{let o=M(t,this.options);return this.listen(o.id,e,o.path)};this.getInfo=(t,e,o,r)=>{let n=U(t,e,o,r,this.references,this.listeners,this.options);return this.listeners.lookup[n.sub]=m("absolute",n),n};this.listen=(t,e,o=[],r={})=>{typeof o=="string"?o=o.split(this.options.keySeparator):typeof o=="symbol"&&(o=[o]);let n=o,i=this.references[t];if(!i){console.error(`Reference ${t} does not exist.`);return}r.poll||(r.poll=j(i)),r.seen||(r.seen=[]);let a=r;this.references[t]||(this.references[t]=i);let l=this.get([t,...n]),c=(f,h=!1)=>!(f&&typeof f=="object")||f instanceof Element?!1:h?!0:!Array.isArray(f),p={};if(c(l,!0))l.__esInspectable&&(l.__esInspectable.options.globalCallback=e),tt(l,(f,h,u)=>{if(!u.pass){let y=[...n,...u.path],w=this.listen(t,e,y,a);Object.assign(p,w)}},{condition:(f,h)=>c(h)});else{let f;try{if(a.poll)f=this.getInfo(t,e,n,l),this.poller.add(f);else{let h="setters";typeof l=="function"&&(h="functions"),f=this.getInfo(t,e,n,l),this.add(h,f)}}catch(h){console.error("Fallback to polling:",o,h),f=this.getInfo(t,e,n,l),this.poller.add(f)}if(p[m("absolute",f)]=f.sub,this.options.onInit instanceof Function){let h={};for(let u in f.infoToOutput)h[u]=void 0;this.options.onInit(m("output",f),h)}}return p};this.add=(t,e)=>{v[t]?v[t](e,this.listeners[t],this.listeners.lookup):this.listeners[t][m("absolute",e)][e.sub]=e};this.remove=t=>{t||(t={...this.listeners.functions,...this.listeners.setters,...this.listeners.polling}),typeof t!="object"&&(t={sub:t});for(let e in t){let o=t[e],r=n=>{this.unsubscribe(n)===!1&&console.warn(`Subscription for ${e} does not exist.`,n)};typeof o!="symbol"?k(o,r):r(o)}return!0};this.unsubscribe=t=>{let e=this.listeners.lookup[t],o=this.poller.get(t),r=this.listeners.functions[e],n=r?.[t],i=this.listeners.setters[e],a=i?.[t];if(o)this.poller.remove(t);else if(n)delete r[t],Object.getOwnPropertySymbols(r).length||(n.current=n.original);else if(a){if(delete i[t],!Object.getOwnPropertySymbols(i).length){let l=a.parent,c=a.last,p=l[c];Object.defineProperty(l,c,{value:p,writable:!0})}}else return!1;delete this.listeners.lookup[t]};Object.defineProperty(this.listeners,"lookup",{value:{},enumerable:!1,configurable:!1}),Object.assign(this.options,t),this.poller.setOptions(t.polling)}};var Tt=L;export{Tt as default};
//# sourceMappingURL=index.esm.js.map