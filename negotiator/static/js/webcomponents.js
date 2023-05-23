(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=n=>t=>typeof t=="function"?((e,s)=>(customElements.define(e,s),s))(n,t):((e,s)=>{const{kind:i,elements:o}=s;return{kind:i,elements:o,finisher(r){customElements.define(e,r)}}})(n,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}};function rt(n){return(t,e)=>e!==void 0?((s,i,o)=>{i.constructor.createProperty(o,s)})(n,t,e):vt(n,t)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var R;((R=window.HTMLSlotElement)===null||R===void 0?void 0:R.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=window,K=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lt=Symbol(),J=new WeakMap;let _t=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==lt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(K&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=J.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&J.set(e,t))}return t}toString(){return this.cssText}};const ft=n=>new _t(typeof n=="string"?n:n+"",void 0,lt),mt=(n,t)=>{K?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=U.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)})},Z=K?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ft(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const H=window,F=H.trustedTypes,gt=F?F.emptyScript:"",G=H.reactiveElementPolyfillSupport,I={toAttribute(n,t){switch(t){case Boolean:n=n?gt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ht=(n,t)=>t!==n&&(t==t||n==n),j={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:ht};let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=j){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||j}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Z(i))}else t!==void 0&&e.push(Z(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return mt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=j){var i;const o=this.constructor._$Ep(t,s);if(o!==void 0&&s.reflect===!0){const r=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:I).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=i.getPropertyOptions(o),d=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:I;this._$El=o,this[o]=d.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ht)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,o)=>this[o]=i),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},G==null||G({ReactiveElement:g}),((L=H.reactiveElementVersions)!==null&&L!==void 0?L:H.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;const T=window,A=T.trustedTypes,Q=A?A.createPolicy("lit-html",{createHTML:n=>n}):void 0,V="$lit$",v=`lit$${(Math.random()+"").slice(9)}$`,at="?"+v,yt=`<${at}>`,m=document,C=()=>m.createComment(""),w=n=>n===null||typeof n!="object"&&typeof n!="function",dt=Array.isArray,At=n=>dt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",D=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X=/-->/g,Y=/>/g,_=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tt=/'/g,et=/"/g,ct=/^(?:script|style|textarea|title)$/i,Et=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),ut=Et(1),E=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),st=new WeakMap,f=m.createTreeWalker(m,129,null,!1),bt=(n,t)=>{const e=n.length-1,s=[];let i,o=t===2?"<svg>":"",r=S;for(let l=0;l<e;l++){const h=n[l];let $,a,c=-1,p=0;for(;p<h.length&&(r.lastIndex=p,a=r.exec(h),a!==null);)p=r.lastIndex,r===S?a[1]==="!--"?r=X:a[1]!==void 0?r=Y:a[2]!==void 0?(ct.test(a[2])&&(i=RegExp("</"+a[2],"g")),r=_):a[3]!==void 0&&(r=_):r===_?a[0]===">"?(r=i??S,c=-1):a[1]===void 0?c=-2:(c=r.lastIndex-a[2].length,$=a[1],r=a[3]===void 0?_:a[3]==='"'?et:tt):r===et||r===tt?r=_:r===X||r===Y?r=S:(r=_,i=void 0);const x=r===_&&n[l+1].startsWith("/>")?" ":"";o+=r===S?h+yt:c>=0?(s.push($),h.slice(0,c)+V+h.slice(c)+v+x):h+v+(c===-2?(s.push(void 0),l):x)}const d=o+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Q!==void 0?Q.createHTML(d):d,s]};class P{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const d=t.length-1,l=this.parts,[h,$]=bt(t,e);if(this.el=P.createElement(h,s),f.currentNode=this.el.content,e===2){const a=this.el.content,c=a.firstChild;c.remove(),a.append(...c.childNodes)}for(;(i=f.nextNode())!==null&&l.length<d;){if(i.nodeType===1){if(i.hasAttributes()){const a=[];for(const c of i.getAttributeNames())if(c.endsWith(V)||c.startsWith(v)){const p=$[r++];if(a.push(c),p!==void 0){const x=i.getAttribute(p.toLowerCase()+V).split(v),N=/([.?@])?(.*)/.exec(p);l.push({type:1,index:o,name:N[2],strings:x,ctor:N[1]==="."?Ct:N[1]==="?"?Pt:N[1]==="@"?Ot:M})}else l.push({type:6,index:o})}for(const c of a)i.removeAttribute(c)}if(ct.test(i.tagName)){const a=i.textContent.split(v),c=a.length-1;if(c>0){i.textContent=A?A.emptyScript:"";for(let p=0;p<c;p++)i.append(a[p],C()),f.nextNode(),l.push({type:2,index:++o});i.append(a[c],C())}}}else if(i.nodeType===8)if(i.data===at)l.push({type:2,index:o});else{let a=-1;for(;(a=i.data.indexOf(v,a+1))!==-1;)l.push({type:7,index:o}),a+=v.length-1}o++}}static createElement(t,e){const s=m.createElement("template");return s.innerHTML=t,s}}function b(n,t,e=n,s){var i,o,r,d;if(t===E)return t;let l=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl;const h=w(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==h&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),h===void 0?l=void 0:(l=new h(n),l._$AT(n,e,s)),s!==void 0?((r=(d=e)._$Co)!==null&&r!==void 0?r:d._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=b(n,l._$AS(n,t.values),l,s)),t}class St{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:m).importNode(s,!0);f.currentNode=o;let r=f.nextNode(),d=0,l=0,h=i[0];for(;h!==void 0;){if(d===h.index){let $;h.type===2?$=new O(r,r.nextSibling,this,t):h.type===1?$=new h.ctor(r,h.name,h.strings,this,t):h.type===6&&($=new xt(r,this,t)),this._$AV.push($),h=i[++l]}d!==(h==null?void 0:h.index)&&(r=f.nextNode(),d++)}return f.currentNode=m,o}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class O{constructor(t,e,s,i){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(o=i==null?void 0:i.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=b(this,t,e),w(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):At(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&w(this._$AH)?this._$AA.nextSibling.data=t:this.$(m.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=P.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(s);else{const r=new St(o,this),d=r.u(this.options);r.v(s),this.$(d),this._$AH=r}}_$AC(t){let e=st.get(t.strings);return e===void 0&&st.set(t.strings,e=new P(t)),e}T(t){dt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new O(this.k(C()),this.k(C()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class M{constructor(t,e,s,i,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=b(this,t,e,0),r=!w(t)||t!==this._$AH&&t!==E,r&&(this._$AH=t);else{const d=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=b(this,d[s+l],e,l),h===E&&(h=this._$AH[l]),r||(r=!w(h)||h!==this._$AH[l]),h===u?t=u:t!==u&&(t+=(h??"")+o[l+1]),this._$AH[l]=h}r&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ct extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const wt=A?A.emptyScript:"";class Pt extends M{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,wt):this.element.removeAttribute(this.name)}}class Ot extends M{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=b(this,t,e,0))!==null&&s!==void 0?s:u)===E)return;const i=this._$AH,o=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==u&&(i===u||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class xt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){b(this,t)}}const it=T.litHtmlPolyfillSupport;it==null||it(P,O),((z=T.litHtmlVersions)!==null&&z!==void 0?z:T.litHtmlVersions=[]).push("2.7.4");const Nt=(n,t,e)=>{var s,i;const o=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=o._$litPart$;if(r===void 0){const d=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=r=new O(t.insertBefore(C(),d),d,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var k,B;class y extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return E}}y.finalized=!0,y._$litElement$=!0,(k=globalThis.litElementHydrateSupport)===null||k===void 0||k.call(globalThis,{LitElement:y});const nt=globalThis.litElementPolyfillSupport;nt==null||nt({LitElement:y});((B=globalThis.litElementVersions)!==null&&B!==void 0?B:globalThis.litElementVersions=[]).push("3.3.2");var Ut=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,pt=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ht(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=(s?r(t,e,i):r(i))||i);return s&&i&&Ut(t,e,i),i};let W=class extends y{constructor(){super(...arguments),this.messages=[]}createRenderRoot(){return this}renderMessage(n){return ut`<div class="message ${n.role}">${n.content}</div>`}render(){return this.messages.map(this.renderMessage)}};pt([rt({attribute:"messages",type:Array})],W.prototype,"messages",2);W=pt([ot("chat-messages")],W);var Tt=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,$t=(n,t,e,s)=>{for(var i=s>1?void 0:s?Mt(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=(s?r(t,e,i):r(i))||i);return s&&i&&Tt(t,e,i),i};let q=class extends y{constructor(){super(...arguments),this.negotiation={id:"",messages:[]}}createRenderRoot(){return this}render(){return ut`
            <chat-messages .messages=${this.negotiation.messages}></chat-messages>
            
            <form action="/negotiation/${this.negotiation.id}/message" method="post" class="new-message">
                <input type="text" name="message">
                <button type="submit">Send</button>
            </form>
        `}};$t([rt({attribute:"negotiation",type:Object})],q.prototype,"negotiation",2);q=$t([ot("negotiation-chat")],q);