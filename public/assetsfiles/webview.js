(() => {
var Bt=Object.defineProperty,qt=Object.defineProperties;var jt=Object.getOwnPropertyDescriptors;var Ze=Object.getOwnPropertySymbols;var zt=Object.prototype.hasOwnProperty,Wt=Object.prototype.propertyIsEnumerable;var Qe=(_,f,v)=>f in _?Bt(_,f,{enumerable:!0,configurable:!0,writable:!0,value:v}):_[f]=v,$=(_,f)=>{for(var v in f||(f={}))zt.call(f,v)&&Qe(_,v,f[v]);if(Ze)for(var v of Ze(f))Wt.call(f,v)&&Qe(_,v,f[v]);return _},M=(_,f)=>qt(_,jt(f));(function(){"use strict";var b;const _="modulepreload",f=function(n){return"/"+n},v={},ee=function(e,t,i){let s=Promise.resolve();function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return e().catch(o)})},$e=(n,e)=>[...e.querySelectorAll(n)],Xe=n=>{const t=new DOMParser().parseFromString(n,"text/html");return{head:t.querySelector("head"),body:t.querySelector("body")}},et=(n,e,t)=>{const i=new RegExp(`heyflow\\[(?:'|")${e}(?:'|")\\]`,"g"),s=`heyflow['${t}']`;n.head.innerHTML=n.head.innerHTML.replace(i,s),n.body.innerHTML=n.body.innerHTML.replace(i,s);const o=n.head.querySelector("#window-props");return o&&(o.innerHTML=o.innerHTML.replace(e,t)),n},Ee=()=>{const n=document.querySelectorAll("heyflow-wrapper");return Array.from(n).reduce((e,t)=>{const i=t.getAttribute("flow-id");return i&&e.push(i),e},[])},tt=()=>({VITE_FLOW_URL_PATTERN:"https://mini-serve.prd.heyflow.com/[FLOW_ID]",VITE_API_ENDPOINT:"https://api.prd.heyflow.com"}),it=n=>{for(const[e,t]of Object.entries(n))if(t===void 0)throw new Error(`Missing variable ${e} in env`);return n},nt=tt(),Se=it(nt),{VITE_API_ENDPOINT:st}=Se,K=async({flowID:n,embeddedFlowIDs:e,message:t,severity:i,data:s})=>{const o=$({flowID:n,embeddedFlowIDs:e,message:t,severity:i,userAgent:window.navigator.userAgent,hostname:window.location.hostname,pathname:window.location.pathname},s?{data:s}:{});await fetch(`${st}/widget/logs`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).catch(r=>{console.error("Error sending widget log:",r,o)})},S=({message:n,error:e,flowID:t})=>{const i={message:n,severity:"error",data:{error:`${e.name} ${e.message}`}};if(t)K(M($({},i),{flowID:t}));else{const s=Ee();s.length>0&&K(M($({},i),{embeddedFlowIDs:s}))}};window.addEventListener("unhandledrejection",n=>{var i;const e=(i=n.reason)==null?void 0:i.stack;if(!(e!=null&&e.includes("/webview.js")))return;const t=Ee();t.length>0&&K({embeddedFlowIDs:t,message:"Unhandled rejection",severity:"error",data:{error:`${n.reason}`}})}),ee(()=>Promise.resolve().then(()=>gt),void 0).then(n=>n.default()).catch(n=>{console.error(n),S({message:"Failed to import loader-element",error:n})}),ee(()=>Promise.resolve().then(()=>Ct),void 0).then(n=>n.default()).catch(n=>{console.error(n),S({message:"Failed to import modal-element",error:n})}),ee(()=>Promise.resolve().then(()=>Ht),void 0).then(n=>n.default()).catch(n=>{console.error(n),S({message:"Failed to import heyflow-wrapper",error:n})});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=window,te=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ie=Symbol(),Ae=new WeakMap;let Ce=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(te&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ae.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ae.set(t,e))}return e}toString(){return this.cssText}};const xe=n=>new Ce(typeof n=="string"?n:n+"",void 0,ie),ne=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new Ce(t,n,ie)},ot=(n,e)=>{te?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=Y.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},Oe=te?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return xe(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var se;const G=window,Te=G.trustedTypes,rt=Te?Te.emptyScript:"",ke=G.reactiveElementPolyfillSupport,oe={toAttribute(n,e){switch(e){case Boolean:n=n?rt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch(i){t=null}}return t}},Pe=(n,e)=>e!==n&&(e==e||n==n),re={attribute:!0,type:String,converter:oe,reflect:!1,hasChanged:Pe},le="finalized";let H=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);s!==void 0&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=re){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||re}static finalize(){if(this.hasOwnProperty(le))return!1;this[le]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Oe(s))}else e!==void 0&&t.push(Oe(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return ot(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=re){var s;const o=this.constructor._$Ep(e,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:oe).toAttribute(t,i.type);this._$El=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),a=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:oe;this._$El=o,this[o]=a.fromAttribute(t,r.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Pe)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw t=!1,this._$Ek(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};H[le]=!0,H.elementProperties=new Map,H.elementStyles=[],H.shadowRootOptions={mode:"open"},ke==null||ke({ReactiveElement:H}),((se=G.reactiveElementVersions)!==null&&se!==void 0?se:G.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ae;const J=window,N=J.trustedTypes,Ie=N?N.createPolicy("lit-html",{createHTML:n=>n}):void 0,de="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,Re="?"+A,lt=`<${Re}>`,k=document,B=()=>k.createComment(""),q=n=>n===null||typeof n!="object"&&typeof n!="function",Le=Array.isArray,at=n=>Le(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",he=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Me=/-->/g,He=/>/g,P=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ne=/'/g,Ue=/"/g,De=/^(?:script|style|textarea|title)$/i,dt=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),C=dt(1),x=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Fe=new WeakMap,I=k.createTreeWalker(k,129,null,!1);function Be(n,e){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(e):e}const ht=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":"",r=j;for(let a=0;a<t;a++){const l=n[a];let h,p,d=-1,c=0;for(;c<l.length&&(r.lastIndex=c,p=r.exec(l),p!==null);)c=r.lastIndex,r===j?p[1]==="!--"?r=Me:p[1]!==void 0?r=He:p[2]!==void 0?(De.test(p[2])&&(s=RegExp("</"+p[2],"g")),r=P):p[3]!==void 0&&(r=P):r===P?p[0]===">"?(r=s!=null?s:j,d=-1):p[1]===void 0?d=-2:(d=r.lastIndex-p[2].length,h=p[1],r=p[3]===void 0?P:p[3]==='"'?Ue:Ne):r===Ue||r===Ne?r=P:r===Me||r===He?r=j:(r=P,s=void 0);const u=r===P&&n[a+1].startsWith("/>")?" ":"";o+=r===j?l+lt:d>=0?(i.push(h),l.slice(0,d)+de+l.slice(d)+A+u):l+A+(d===-2?(i.push(void 0),a):u)}return[Be(n,o+(n[t]||"<?>")+(e===2?"</svg>":"")),i]};class z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const a=e.length-1,l=this.parts,[h,p]=ht(e,t);if(this.el=z.createElement(h,i),I.currentNode=this.el.content,t===2){const d=this.el.content,c=d.firstChild;c.remove(),d.append(...c.childNodes)}for(;(s=I.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const c of s.getAttributeNames())if(c.endsWith(de)||c.startsWith(A)){const u=p[r++];if(d.push(c),u!==void 0){const L=s.getAttribute(u.toLowerCase()+de).split(A),g=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:g[2],strings:L,ctor:g[1]==="."?pt:g[1]==="?"?mt:g[1]==="@"?ft:Z})}else l.push({type:6,index:o})}for(const c of d)s.removeAttribute(c)}if(De.test(s.tagName)){const d=s.textContent.split(A),c=d.length-1;if(c>0){s.textContent=N?N.emptyScript:"";for(let u=0;u<c;u++)s.append(d[u],B()),I.nextNode(),l.push({type:2,index:++o});s.append(d[c],B())}}}else if(s.nodeType===8)if(s.data===Re)l.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(A,d+1))!==-1;)l.push({type:7,index:o}),d+=A.length-1}o++}}static createElement(e,t){const i=k.createElement("template");return i.innerHTML=e,i}}function U(n,e,t=n,i){var s,o,r,a;if(e===x)return e;let l=i!==void 0?(s=t._$Co)===null||s===void 0?void 0:s[i]:t._$Cl;const h=q(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==h&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),h===void 0?l=void 0:(l=new h(n),l._$AT(n,t,i)),i!==void 0?((r=(a=t)._$Co)!==null&&r!==void 0?r:a._$Co=[])[i]=l:t._$Cl=l),l!==void 0&&(e=U(n,l._$AS(n,e.values),l,i)),e}class ct{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:k).importNode(i,!0);I.currentNode=o;let r=I.nextNode(),a=0,l=0,h=s[0];for(;h!==void 0;){if(a===h.index){let p;h.type===2?p=new W(r,r.nextSibling,this,e):h.type===1?p=new h.ctor(r,h.name,h.strings,this,e):h.type===6&&(p=new wt(r,this,e)),this._$AV.push(p),h=s[++l]}a!==(h==null?void 0:h.index)&&(r=I.nextNode(),a++)}return I.currentNode=k,o}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class W{constructor(e,t,i,s){var o;this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),q(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):at(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==m&&q(this._$AH)?this._$AA.nextSibling.data=e:this.$(k.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=z.createElement(Be(s.h,s.h[0]),this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(i);else{const r=new ct(o,this),a=r.u(this.options);r.v(i),this.$(a),this._$AH=r}}_$AC(e){let t=Fe.get(e.strings);return t===void 0&&Fe.set(e.strings,t=new z(e)),t}T(e){Le(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new W(this.k(B()),this.k(B()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Z{constructor(e,t,i,s,o){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=U(this,e,t,0),r=!q(e)||e!==this._$AH&&e!==x,r&&(this._$AH=e);else{const a=e;let l,h;for(e=o[0],l=0;l<o.length-1;l++)h=U(this,a[i+l],t,l),h===x&&(h=this._$AH[l]),r||(r=!q(h)||h!==this._$AH[l]),h===m?e=m:e!==m&&(e+=(h!=null?h:"")+o[l+1]),this._$AH[l]=h}r&&!s&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class pt extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}const ut=N?N.emptyScript:"";class mt extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==m?this.element.setAttribute(this.name,ut):this.element.removeAttribute(this.name)}}class ft extends Z{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=U(this,e,t,0))!==null&&i!==void 0?i:m)===x)return;const s=this._$AH,o=e===m&&s!==m||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==m&&(s===m||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class wt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const qe=J.litHtmlPolyfillSupport;qe==null||qe(z,W),((ae=J.litHtmlVersions)!==null&&ae!==void 0?ae:J.litHtmlVersions=[]).push("2.8.0");const yt=(n,e,t)=>{var i,s;const o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let r=o._$litPart$;if(r===void 0){const a=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new W(e.insertBefore(B(),a),a,void 0,t!=null?t:{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ce,pe;class R extends H{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=yt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return x}}R.finalized=!0,R._$litElement$=!0,(ce=globalThis.litElementHydrateSupport)===null||ce===void 0||ce.call(globalThis,{LitElement:R});const je=globalThis.litElementPolyfillSupport;je==null||je({LitElement:R}),((pe=globalThis.litElementVersions)!==null&&pe!==void 0?pe:globalThis.litElementVersions=[]).push("3.3.3");function ue(n,e){customElements.get(n)===void 0&&customElements.define(n,e)}const vt=()=>ue("loader-element",Q),ye=class ye extends R{render(){return C`<div>
      <svg
        id="dots"
        width="75px"
        height="16px"
        viewBox="0 0 132 70"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>dots</title>
        <defs></defs>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="darkgrey"
          fill-rule="evenodd"
        >
          <g id="dots">
            <circle id="dot1" cx="-40" cy="35" r="35"></circle>
            <circle id="dot2" cx="65" cy="35" r="35"></circle>
            <circle id="dot3" cx="165" cy="35" r="35"></circle>
          </g>
        </g>
      </svg>
    </div>`}};ye.styles=ne`
    div {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 2rem;
    }
    img {
      width: 8rem;
    }
    #dots #dot1 {
      animation: load 0.8s infinite;
    }
    #dots #dot2 {
      animation: load 0.8s infinite;
      animation-delay: 0.1s;
    }
    #dots #dot3 {
      animation: load 0.8s infinite;
      animation-delay: 0.2s;
    }
    @keyframes load {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `;let Q=ye;const gt=Object.freeze(Object.defineProperty({__proto__:null,LoaderElement:Q,default:vt},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?M($({},e),{finisher(t){t.createProperty(e.key,n)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}},bt=(n,e,t)=>{e.constructor.createProperty(t,n)};function w(n){return(e,t)=>t!==void 0?bt(n,e,t):_t(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function X(n){return w(M($({},n),{state:!0}))}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var me;((me=window.HTMLSlotElement)===null||me===void 0?void 0:me.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},We=n=>(...e)=>({_$litDirective$:n,values:e});let Ve=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=We(class extends Ve{constructor(n){var e;if(super(n),n.type!==ze.ATTRIBUTE||n.name!=="class"||((e=n.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(e=>n[e]).join(" ")+" "}update(n,[e]){var t,i;if(this.it===void 0){this.it=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!(!((t=this.nt)===null||t===void 0)&&t.has(o))&&this.it.add(o);return this.render(e)}const s=n.element.classList;this.it.forEach(o=>{o in e||(s.remove(o),this.it.delete(o))});for(const o in e){const r=!!e[o];r===this.it.has(o)||!((i=this.nt)===null||i===void 0)&&i.has(o)||(r?(s.add(o),this.it.add(o)):(s.remove(o),this.it.delete(o)))}return x}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ke="important",$t=" !"+Ke,Ye=We(class extends Ve{constructor(n){var e;if(super(n),n.type!==ze.ATTRIBUTE||n.name!=="style"||((e=n.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((e,t)=>{const i=n[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(n,[e]){const{style:t}=n.element;if(this.ht===void 0){this.ht=new Set;for(const i in e)this.ht.add(i);return this.render(e)}this.ht.forEach(i=>{e[i]==null&&(this.ht.delete(i),i.includes("-")?t.removeProperty(i):t[i]="")});for(const i in e){const s=e[i];if(s!=null){this.ht.add(i);const o=typeof s=="string"&&s.endsWith($t);i.includes("-")||o?t.setProperty(i,o?s.slice(0,-11):s,o?Ke:""):t[i]=s}}return x}}),Et=`@keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(20%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOutToBottom {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20%);
  }
}

.hey__modal-wrapper {
  margin: 0 auto;
  position: absolute;
  left: -10000px;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -10000;
}

.hey__modal-wrapper-visible {
  visibility: visible !important;
  z-index: 1000;
  left: 0;
}

.hey__modal {
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 1001;
  transition: top 0.2s;
}

.hey__modal_web-component {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100vw;
}

.hey__modal-web-component-wrapper {
  position: absolute;
  z-index: 1001;
  overflow-y: scroll;
  scrollbar-width: none;
  width: fit-content;
  max-height: 100%;
  max-width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::-webkit-scrollbar {
    display: none;
  }
}

.hey__modal-web-component-wrapper_with-close-btn {
  // space for the close button
  padding: 0 20px;
  max-width: calc(100% - 40px);

  &.hey__modal-web-component-wrapper_auto-width {
    padding: 0;
    max-width: 100%;
  }
}

.hey__modal-web-component-wrapper_auto-width {
  width: 100%;
}

.hey__modal-visible {
  opacity: 1;
  animation: 0.2s ease-out 0s 1 slideInFromBottom;
}

.hey__modal-hide {
  animation: 0.2s ease-out 0s 1 slideOutToBottom;
  opacity: 0;
  z-index: -1000;
}

.hey__modal-full-screen {
  top: 0 !important;
  left: 0 !important;
  height: 100%;
  width: 100% !important;
  overflow: scroll;

  ::slotted(heyflow-wrapper) {
    --heyflow-widget-height: 100%;
  }
}

.hey__modal-full-height {
  height: 100%;

  iframe {
    height: 100% !important;
  }
}

.hey__overlay {
  position: fixed;
  display: none;
  opacity: 0;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.75);
  height: 100%;
  width: 100%;
  z-index: -999;
  transition: background, 0.2s;
}

.hey__overlay-visible {
  display: block;
  opacity: 1;
  z-index: 999;
}

.hey__close-modal-button {
  outline: none;
  font: inherit;
  visibility: visible;
  position: absolute;
  cursor: pointer;
  transition: top 0.2s ease 0s;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 8px;
  right: 8px;
  z-index: 6;
  appearance: none;
  background: #cbcbcf;
  border: 0;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  padding: 0;
  color: #56565d;

  &:hover {
    background: #27272a;
    color: #c8c8ca;
  }

  svg {
    width: 12px;
    height: 12px;
  }
}

.hey__close-modal-button_full-screen {
  top: 5px;
  right: 5px;
}

.hey__modal-full-height .hey__close-modal-button {
  top: 0;
}
`;var St=Object.defineProperty,O=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,r;o>=0;o--)(r=n[o])&&(s=r(e,t,s)||s);return s&&St(e,t,s),s};const fe="heyflow-modal-element:open",At=()=>ue("heyflow-modal-element",y),ve=class ve extends R{constructor(){super(...arguments),this.WIDGET_TAG_NAME="HEYFLOW-WRAPPER",this.bodyOverflow="",this.isFullscreen=!1,this.modalId="",this.overlayBackgroundColor="rgba(0, 0, 0, 0.6)",this.hideCloseButton=!1,this.isOpened=!1,this.areFlowStylesSet=!1,this.areFlowEventListenersSet=!1,this.doesFlowHaveWidth=!1,this.boundOnKeyDown=this.onKeyDown.bind(this),this.boundOnCustomEvent=this.onCustomEvent.bind(this),this.boundOnIframeMessage=this.onIframeMessage.bind(this)}connectedCallback(){var e;try{super.connectedCallback(),this.modalId||console.warn("Please set `modal-id`"),this.bodyOverflow=document.body.style.overflow,document.addEventListener("keydown",this.boundOnKeyDown),window.addEventListener(fe,this.boundOnCustomEvent)}catch(t){const i=(e=this.querySelector(this.WIDGET_TAG_NAME.toLowerCase()))==null?void 0:e.getAttribute("flow-id");console.warn("An error occurred while initialising modal element",{error:t,flowID:i}),S({flowID:i,message:"Error initializing modal element",error:t})}}disconnectedCallback(){document.removeEventListener("keydown",this.boundOnKeyDown),window.removeEventListener("message",this.boundOnIframeMessage),window.removeEventListener(fe,this.boundOnCustomEvent),super.disconnectedCallback()}openModal(){document.body.style.overflow="hidden",this.isOpened=!0,this.setPropertiesBasedOnWidget()}closeModal(){document.body.style.overflow=this.bodyOverflow,this.isOpened=!1}setPropertiesBasedOnWidget(){var e,t,i,s;if(this.slotChild||(this.slotChild=(t=(e=this.shadowRoot)==null?void 0:e.querySelector("slot"))==null?void 0:t.assignedElements()[0]),((i=this.slotChild)==null?void 0:i.tagName)===this.WIDGET_TAG_NAME){!this.areFlowStylesSet&&!this.isFullscreen&&this.setStylesBasedOnFlow(),this.areFlowEventListenersSet||window.addEventListener("message",this.boundOnIframeMessage);const o=(s=this.slotChild)==null?void 0:s.getAttribute("style-config");let r={};if(o)try{r=JSON.parse(o)}catch(a){r={}}r.width&&(this.doesFlowHaveWidth=!0)}}onKeyDown(e){e.code==="Escape"&&this.closeModal()}onCustomEvent(e){var t;e.type===fe&&((t=e.detail)==null?void 0:t.modalId)===this.modalId&&this.openModal()}setStylesBasedOnFlow(){var s,o,r,a;this.areFlowStylesSet=!0;const{"width-mid":e,"width-wide":t}=(r=(o=(s=window.heyflow)==null?void 0:s.constants)==null?void 0:o.STYLES)!=null?r:{"width-mid":800,"width-wide":1200},i=document.createElement("style");i.innerHTML=`
			@media screen and (min-width: ${e}) {
				.hey__modal-wrapper .hey__modal-web-component-wrapper {
					top: 50%;
					left: 50%;
					right: auto;
					bottom: auto;
					transform: translate(-50%, -50%);
					max-height: 90%;
					max-width: min(${e}, 80%);
					padding: 20px;
				}
			}

			@media screen and (min-width: ${t}) {
				.hey__modal-wrapper .hey__modal-web-component-wrapper {
					max-width: min(${t}, 60%);
				}
			}
		`,(a=this.shadowRoot)==null||a.appendChild(i)}onIframeMessage(e){var i,s;if(!e.data)return;let t;try{t=JSON.parse(e.data)}catch(o){return}if(["goToScreen","goBack"].includes(t.event)&&["","true"].includes(String((i=this.slotChild)==null?void 0:i.getAttribute("scroll-up-on-navigation")))){const o=(s=this.shadowRoot)==null?void 0:s.querySelector(".hey__modal-web-component-wrapper");o&&(o.scrollTop=0)}t.event==="closeModal"&&this.closeModal()}render(){return C`
      <div
        class=${V({"hey__modal-wrapper":!0,"hey__modal-wrapper-visible":this.isOpened})}
        style=${Ye({display:this.isOpened?"block":"none"})}
      >
        <div
          class=${V({hey__modal:!0,"hey__modal_web-component":!0,"hey__modal-visible":this.isOpened,"hey__modal-hide":!this.isOpened,"hey__modal-full-screen":this.isFullscreen})}
        >
          <div
            class=${V({"hey__modal-web-component-wrapper":!0,"hey__modal-web-component-wrapper_auto-width":!this.doesFlowHaveWidth,"hey__modal-web-component-wrapper_with-close-btn":!this.hideCloseButton})}
          >
            <slot></slot>
            ${this.hideCloseButton?C``:C`
                  <button
                    aria-label="Close"
                    title="Close"
                    class=${V({"hey__close-modal-button":!0,"hey__close-modal-button_full-screen":this.isFullscreen})}
                    @click="${this.closeModal}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        fill="currentColor"
                        d="M11.747 10.535a.858.858 0 1 1-1.214 1.214L6 7.214l-4.535 4.533a.859.859 0 0 1-1.214-1.214L4.786 6 .253 1.466A.858.858 0 1 1 1.467.252L6 4.787 10.535.25a.858.858 0 1 1 1.214 1.214L7.214 6l4.533 4.535Z"
                      />
                    </svg>
                  </button>
                `}
          </div>
          <div
            class=${V({hey__overlay:!0,"hey__overlay-visible":this.isOpened})}
            style="background-color: ${this.overlayBackgroundColor}"
            @click="${this.closeModal}"
          ></div>
        </div>
      </div>
    `}};ve.styles=ne`
    ${xe(Et.toString())}
  `;let y=ve;O([w({attribute:"full-screen",type:Boolean})],y.prototype,"isFullscreen"),O([w({attribute:"modal-id",type:String})],y.prototype,"modalId"),O([w({attribute:"overlay-background-color",type:String})],y.prototype,"overlayBackgroundColor"),O([w({attribute:"hide-close-button",type:Boolean})],y.prototype,"hideCloseButton"),O([X()],y.prototype,"isOpened"),O([X()],y.prototype,"areFlowStylesSet"),O([X()],y.prototype,"areFlowEventListenersSet"),O([X()],y.prototype,"doesFlowHaveWidth");const Ct=Object.freeze(Object.defineProperty({__proto__:null,ModalElement:y,default:At},Symbol.toStringTag,{value:"Module"}));class xt{constructor(){this.queue=[],this.acquired=!1}async acquire(){if(!this.acquired)this.acquired=!0;else return new Promise((e,t)=>{this.queue.push(e)})}async release(){if(this.queue.length===0&&this.acquired){this.acquired=!1;return}const e=this.queue.shift();if(e!==void 0)return new Promise(t=>{e(),t()})}}class Ge{static set(e,t){try{window.localStorage.setItem(e,t)}catch(i){console.warn("Failed to write to localStorage:",i)}}static get(e){try{return window.localStorage.getItem(e)}catch(t){return console.warn("Failed to read from localStorage:",t),null}}}const Ot=n=>{const e={"x-is-heyflow-embed":"true"},t=Ge.get(`heyflow-variant-${n}`);return t!==null&&(e["x-heyflow-variant"]=t),e},Tt=async n=>{const e=It(n);console.log("flowSrc ",e);const t=await fetch(e,{headers:Ot(n)}),i=t.headers.get("x-heyflow-variant");if(i!==null&&Ge.set(`heyflow-variant-${n}`,i),!t.ok){const s=`Error while fetching Flow: ${t.status}`;throw new Error(s)}return t.text()},{VITE_FLOW_URL_PATTERN:kt}=Se,Pt="[FLOW_ID]",It=n=>kt.replace(Pt,n);var Rt=Object.defineProperty,T=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,r;o>=0;o--)(r=n[o])&&(s=r(e,t,s)||s);return s&&Rt(e,t,s),s};const we=new xt,Lt=()=>ue("heyflow-wrapper",Je),Mt=.01,E=(b=class extends R{constructor(){super(...arguments),this.scriptQueue=[],this.embedIndex=0,this.embedReference="",this.boundOnLessCompiled=this.onLessCompiled.bind(this),this.boundOnIframeMessage=this.onIframeMessage.bind(this),this.template=b.loadingTemplate,this.dynamicHeight=!1,this.urlParams="",this.scrollUpOnNavigation=!1,this.lang=navigator.language,this.getSafeNumber=e=>e&&!isNaN(e)?e:0}getHeyflowWindowContext(){var e;return(e=window.heyflow)==null?void 0:e[this.embedReference]}setWidthOverrides(){var o,r,a,l,h,p;const{"width-narrow":e,"width-mid":t,"width-wide":i}=(p=(h=(r=(o=window.heyflow)==null?void 0:o.constants)==null?void 0:r.STYLES)!=null?h:(l=(a=this.getHeyflowWindowContext())==null?void 0:a.constants)==null?void 0:l.STYLES)!=null?p:{};Object.entries({"width-narrow":e,"width-mid":t,"width-wide":i}).forEach(([d,c])=>{document.documentElement.style.setProperty(`--heyflow-widget-${d}`,c)})}getStyleConfig(){var t;return!this.dynamicHeight&&((t=this.styleConfig)==null?void 0:t.height)!==void 0?$({overflow:"auto"},this.styleConfig):!!this.closest("heyflow-modal-element")&&this.styleConfig.width==="100%"?M($({},this.styleConfig),{width:"100vw"}):this.styleConfig}render(){return C`
      <article
        class="heyflow-widget-root"
        style=${Ye($({},this.getStyleConfig()))}
        lang="${this.lang}"
      >
        ${this.template}
      </article>
    `}async connectedCallback(){var e;await we.acquire(),window.embeds=(e=window.embeds)!=null?e:new Set;try{if(super.connectedCallback(),!this.flowId)return;this.setupEmbedReference(),await this.updateTemplateWithFlow(),this.detectIFrameEnvironment(),this.setupEventListeners(),this.injectFontDefinitions(),this.initFlow(),this.setupResizeObserver()}catch(t){console.warn("An error occurred while initialising a heyflow widget",{error:t,flowId:this.flowId,embedIndex:this.embedIndex}),(t==null?void 0:t.message)!=="Error while fetching Flow: 404"&&S({flowID:this.flowId,message:"Error initializing heyflow-wrapper",error:t})}finally{await we.release()}}disconnectedCallback(){we.release(),window.removeEventListener("lessCompiled",this.boundOnLessCompiled),window.removeEventListener("message",this.boundOnIframeMessage),window.embeds.delete(this.embedReference)}detectIFrameEnvironment(){var e,t;window.top!==window.self&&((t=(e=this.shadowRoot)==null?void 0:e.querySelector("article"))==null||t.classList.add("parent-is-iframe"))}setupEmbedReference(){document.querySelectorAll("heyflow-wrapper").length!==1&&(this.embedIndex=window.embeds.size),this.embedReference=`${this.flowId}-${this.embedIndex}`,window.embeds.add(this.embedReference),this.setAttribute("index",this.embedReference)}async updateTemplateWithFlow(){var t;const e=Xe(await Tt(this.flowId));this.flow=et(e,this.flowId,this.embedReference);try{await this.injectFlowStyles(),this.enqueueScripts(),await this.injectScripts()}catch(i){throw S({flowID:this.flowId,message:"Error injecting assets while initialising widget",error:i}),i}this.template=(t=C`${this.flow.body}`)!=null?t:b.fallbackTemplate,await this.updateComplete}async injectFlowStyles(){return new Promise(e=>{var l,h,p;let t=!1,i=(l=this.flow)==null?void 0:l.head.querySelector("style#less\\:static-flow-src-style");if(!i){const d=(h=this.flow)==null?void 0:h.head.querySelectorAll("style");i=d==null?void 0:d[(d==null?void 0:d.length)-1]}const s=(p=this.flow)==null?void 0:p.head.querySelectorAll('link[rel="stylesheet"]'),o=d=>{var c;try{(c=this.shadowRoot)==null||c.appendChild(d)}catch(u){throw S({flowID:this.flowId,message:"Error appending style related node to shadowRoot",error:u}),u}},r=d=>()=>{clearTimeout(d),e()},a=d=>(c,u,L,g,D)=>{clearTimeout(d),D&&S({flowID:this.flowId,message:"Error loading stylesheet",error:D})};i&&(i.innerHTML=i.innerHTML.replace(/:root/g,":host").replace(/(\d)(rem)/g,"$1em"),o(i)),s==null||s.forEach(d=>{const c=d.href.split("/").pop();if(c!=null&&c.match(/app(?:-.+|)\.css/)||c!=null&&c.match(/flow(?:-.+|)\.css/)){const u=document.createElement("link"),L=c.replace("flow","app");u.href=`${d.href.replace(c,L)}?q=${this.embedReference}`,u.rel=d.rel,t=!0;const g=setTimeout(()=>{K({flowID:this.flowId,message:"Stylesheet has not been loaded after 5000ms",data:{filename:c}})},5e3);u.onload=r(g),u.onerror=a(g),o(u),d.remove()}}),(!i&&!(s!=null&&s.length)||!t)&&e()})}enqueueScripts(){if(this.flow){const e=$e("script",this.flow.head);this.scriptQueue=e}}async injectScripts(){return new Promise(e=>{const t=this.scriptQueue.filter(o=>o.src);let i=0;function s(){i++,i===t.length&&e()}this.scriptQueue.forEach(o=>{var a;const r=document.createElement("script");o.src?(r.src=o.src,r.type=o.type,r.onload=s,r.onerror=()=>{console.warn(`failed to inject script from: ${r.src}, please disable your ad-blocker`)}):r.innerHTML=o.innerHTML,o.src.match(/app(?:-.+|)\.js/)&&o.type==="module"&&(r.src=`${o.src}?q=${this.embedReference}`),(a=this.shadowRoot)==null||a.appendChild(r)}),t.length||e()})}injectFontDefinitions(){this.flow&&$e('link[as="style"]',this.flow.head).forEach(t=>{const i=document.createElement("link");i.rel="stylesheet",i.href=t.href,document.head.appendChild(i)})}onLessCompiled(){var t;const e=document.getElementById("less:static-flow-src-style");e&&((t=this.shadowRoot)==null||t.appendChild(e))}onIframeMessage(e){var i;if(!e.data)return;let t;try{t=JSON.parse(e.data)}catch(s){return}if(["goToScreen","goBack"].includes(t.event)&&this.scrollUpOnNavigation){const s=document.querySelector(`[index="${t.widgetWrapperRef}"]`),o=(i=s==null?void 0:s.shadowRoot)==null?void 0:i.querySelector('[data-id="heyflow-main"]');this.dynamicHeight?s==null||s.scrollIntoView():o&&(o.scrollTop=0,o.scrollIntoView())}}setupEventListeners(){window.addEventListener("lessCompiled",this.boundOnLessCompiled),window.addEventListener("message",this.boundOnIframeMessage)}initFlow(){var e,t;this.setWidthOverrides(),document.dispatchEvent(new CustomEvent("finishedInjection",{detail:{urlParams:this.urlParams,embedReference:this.embedReference}})),this.screen&&((e=window.heyflow)!=null&&e.setAlternativeInitialScreen?window.heyflow.setAlternativeInitialScreen(this.screen,!0):(t=this.getHeyflowWindowContext())==null||t.setAlternativeInitialScreen(this.screen,!0)),delete window.currentlyMounting}setupResizeObserver(){var i;const e=new ResizeObserver(s=>{const o=s[0].borderBoxSize[0].blockSize;this.handleDynamicSizing(Math.ceil(o))}),t=(i=this.shadowRoot)==null?void 0:i.querySelector("form");t&&e.observe(t)}handleDynamicSizing(e){var t,i,s,o,r,a,l,h,p,d,c,u,L,g;if(this.dynamicHeight){const D=(t=this.shadowRoot)==null?void 0:t.querySelector("form + div"),ge=(i=this.shadowRoot)==null?void 0:i.querySelector("form"),_e=(s=this.shadowRoot)==null?void 0:s.querySelector("header"),be=(o=this.shadowRoot)==null?void 0:o.querySelector(".footer-container"),F=(r=this.shadowRoot)==null?void 0:r.querySelector(".heyflow-widget-root"),Nt=this.getSafeNumber(parseInt((l=(a=F==null?void 0:F.style)==null?void 0:a.borderTopWidth)!=null?l:"0",10)+parseInt((p=(h=F==null?void 0:F.style)==null?void 0:h.borderBottomWidth)!=null?p:"0",10)),Ut=ge?this.getSafeNumber(parseInt((d=getComputedStyle(ge).marginTop)!=null?d:0)+parseInt((c=getComputedStyle(ge).marginBottom)!=null?c:0)):0,Dt=Math.floor(e*Mt),Ft=((u=_e==null?void 0:_e.clientHeight)!=null?u:0)+((L=be==null?void 0:be.clientHeight)!=null?L:0)+((g=D==null?void 0:D.clientHeight)!=null?g:0)+e+Nt+Ut+Dt;this.styleConfig=M($({},this.styleConfig),{height:`${Ft}px`})}}},b.fallbackTemplate=C`<p>
    🤕 Error integrating Heyflow, check javascript console for details!
  </p>`,b.loadingTemplate=C`<loader-element />`,b.styles=ne`
    :host {
      all: initial;
      width: 100%;
    }

    /*Workaround to make Material Icons Work https://github.com/google/material-design-icons/issues/1165*/
    .material-icons {
      font-family: 'Material Icons';
      font-style: normal;
    }

    .heyflow-widget-root {
      margin: 0 auto;
      // We set --heyflow-widget-height in modal-element if needed
      height: var(--heyflow-widget-height, 600px);
      max-width: 100%;
    }

    /* TODO these are hacky overrides to fix sizing issues if the web component is embedded inside of an iframe.
		The iframe class is set only if the web component is running inside of an iframe.*/
    .parent-is-iframe .multiple-choice .option-content.picture {
      height: auto;
    }

    /* This prevents weird whitespace problem under large images. */
    .parent-is-iframe .block-content.image-block {
      display: flex;
    }

    .parent-is-iframe img {
      /* overrides an inline style. */
      height: auto !important;
      max-height: 100%;
    }

    /* adds an overflow hidden to the span in the button cause it shows scroll bars in Safari and this would break the button */
    .generic-button-block .content .label,
    .generic-button-block .content .line2 {
      overflow: hidden;
    }

    /* !importants are here because of packages/flow/src/style/x_responsive.less */
    form section > .block > .inner-wide {
      width: min(var(--heyflow-widget-width-wide), 100%) !important;
    }

    form section > .block > .inner-mid {
      width: min(var(--heyflow-widget-width-mid), 100%) !important;
    }

    form section > .block > .inner-narrow {
      width: min(var(--heyflow-widget-width-narrow), 100%) !important;
    }
  `,b);T([w()],E.prototype,"template"),T([w({attribute:"flow-id"})],E.prototype,"flowId"),T([w({attribute:"screen"})],E.prototype,"screen"),T([w({attribute:"style-config",type:Object})],E.prototype,"styleConfig"),T([w({attribute:"dynamic-height",type:Boolean})],E.prototype,"dynamicHeight"),T([w({attribute:"url-parameters"})],E.prototype,"urlParams"),T([w({attribute:"scroll-up-on-navigation",type:Boolean})],E.prototype,"scrollUpOnNavigation"),T([w({attribute:"lang"})],E.prototype,"lang");let Je=E;const Ht=Object.freeze(Object.defineProperty({__proto__:null,HeyflowWrapper:Je,default:Lt},Symbol.toStringTag,{value:"Module"}))})();
})()