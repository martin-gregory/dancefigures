/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$3=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$2,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$2(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$1=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$1:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

(() => {
    let _classDecorators = [t('workshop-site')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = i;
    let _isMenuOpen_decorators;
    let _isMenuOpen_initializers = [];
    let _isMenuOpen_extraInitializers = [];
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _isMenuOpen_decorators = [n({ type: Boolean })];
            __esDecorate(null, null, _isMenuOpen_decorators, { kind: "field", name: "isMenuOpen", static: false, private: false, access: { has: obj => "isMenuOpen" in obj, get: obj => obj.isMenuOpen, set: (obj, value) => { obj.isMenuOpen = value; } }, metadata: _metadata }, _isMenuOpen_initializers, _isMenuOpen_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        isMenuOpen = __runInitializers(this, _isMenuOpen_initializers, false);
        static styles = i$3 `
    :host {
      display: block;
    }

    /* Navigation */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #d97706;
    }

    .nav-links {
      display: flex;
      gap: 32px;
    }

    .nav-links a {
      color: #374151;
      text-decoration: none;
      transition: color 0.3s;
    }

    .nav-links a:hover {
      color: #d97706;
    }

    .menu-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      flex-direction: column;
      gap: 4px;
    }

    .menu-btn span {
      width: 24px;
      height: 2px;
      background: #374151;
    }

    .mobile-menu {
      display: none;
      background: white;
      border-top: 1px solid #e5e7eb;
    }

    .mobile-menu.open {
      display: block;
    }

    .mobile-menu a {
      display: block;
      padding: 12px 20px;
      color: #374151;
      text-decoration: none;
    }

    .mobile-menu a:hover {
      background: #fef3c7;
    }

    /* Hero */
    .hero {
      margin-top: 64px;
      height: calc(100vh - 64px);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
    }

    .hero-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      padding: 20px;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 7vw, 4.5rem);
      margin-bottom: 24px;
      font-weight: bold;
    }

    .hero p {
      font-size: clamp(1.125rem, 2vw, 1.5rem);
      margin-bottom: 32px;
      max-width: 800px;
    }

    .btn {
      display: inline-block;
      background: #d97706;
      color: white;
      padding: 16px 32px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 18px;
      transition: all 0.3s;
    }

    .btn:hover {
      background: #b45309;
      transform: scale(1.05);
    }

    /* Section */
    section {
      padding: 80px 20px;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.5rem);
      font-weight: bold;
      color: #1f2937;
      text-align: center;
      margin-bottom: 48px;
    }

    /* About */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 48px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }

    .about-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .about-text p {
      color: #4b5563;
      margin-bottom: 16px;
      line-height: 1.8;
    }

    /* Workshops */
    .bg-gray {
      background: #f9fafb;
    }

    .workshops-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .workshop-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s;
    }

    .workshop-card:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    .workshop-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .workshop-content {
      padding: 24px;
    }

    .workshop-title {
      font-size: 24px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 16px;
    }

    .workshop-meta {
      color: #6b7280;
      margin-bottom: 16px;
    }

    .workshop-price {
      font-size: 28px;
      font-weight: bold;
      color: #d97706;
      margin-bottom: 16px;
    }

    .workshop-card button {
      width: 100%;
      background: #d97706;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .workshop-card button:hover {
      background: #b45309;
    }

   
    /* Contact */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .contact-item {
      display: flex;
      gap: 12px;
    }

    .contact-item h3 {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .contact-item p {
      color: #6b7280;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .contact-form input,
    .contact-form textarea {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 16px;
      font-family: inherit;
    }

    .contact-form input:focus,
    .contact-form textarea:focus {
      outline: none;
      border-color: #d97706;
      box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
    }

    .contact-form button {
      background: #d97706;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .contact-form button:hover {
      background: #b45309;
    }

    /* Footer */
    footer {
      background: #1f2937;
      color: white;
      padding: 32px 20px;
      text-align: center;
    }

    footer p {
      margin-bottom: 16px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 24px;
    }

    .footer-links a {
      color: white;
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-links a:hover {
      color: #fbbf24;
    }

    /* Responsive */
    @media (min-width: 768px) {
      .menu-btn {
        display: none;
      }

      .about-grid {
        grid-template-columns: 1fr 1fr;
      }

      .workshops-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      /* .carousel-item {
        flex: 0 0 33.333%;
      } */

      .contact-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 767px) {
      .nav-links {
        display: none;
      }

      .menu-btn {
        display: flex;
      }
    }
  `;
        connectedCallback() {
            super.connectedCallback();
        }
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
        handleSubmit() {
            alert('Message sent! We\'ll get back to you soon.');
        }
        render() {
            return b `
          <!-- Navigation -->
          <nav>
            <div class="nav-container">
              <div class="logo">Artisan Studio</div>
              <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#workshops">Workshops</a>
                <a href="#gallery">Gallery</a>
                <a href="#contact">Contact</a>
              </div>
              <button class="menu-btn" @click=${this.toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div class="mobile-menu ${this.isMenuOpen ? 'open' : ''}">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#workshops">Workshops</a>
              <a href="#gallery">Gallery</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>

          <!-- Hero -->
          <section id="home" class="hero">
            <img class="hero-image" src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=2000&h=1200&fit=crop" alt="Painting Workshop" />
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <h1>Unleash Your Creativity</h1>
              <p>Join our painting workshops and discover the artist within you</p>
              <a href="#workshops" class="btn">Explore Workshops</a>
            </div>
          </section>

          <slot name="hero"></slot>

          <!-- About -->
          <section id="about">
            <div class="about-grid">
              <div class="about-text">
                <h2 class="section-title">About Our Studio</h2>
                <p>Welcome to Artisan Studio, where creativity meets community. For over a decade, we've been inspiring artists of all levels to explore their passion for painting in a supportive and vibrant environment.</p>
                <p>Our experienced instructors bring years of expertise and a genuine love for teaching. Whether you're picking up a brush for the first time or looking to refine your technique, we have the perfect workshop for you.</p>
                <p>Join our community of creative souls and embark on an artistic journey that will transform the way you see the world.</p>
              </div>
              <div>
                <img class="about-image" src="https://images.unsplash.com/photo-1561489396-888724a1543d?w=800&h=600&fit=crop" alt="Art Studio" />
              </div>
            </div>
          </section>

          <!-- Workshops -->
          <section id="workshops" class="bg-gray">
            <h2 class="section-title">Our Workshops</h2>
            <div class="workshops-grid">
              <div class="workshop-card">
                <img class="workshop-image" src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" alt="Beginner Watercolor" />
                <div class="workshop-content">
                  <h3 class="workshop-title">Beginner Watercolor</h3>
                  <p class="workshop-meta">⏱️ 4 weeks</p>
                  <div class="workshop-price">$150</div>
                  <button>Enroll Now</button>
                </div>
              </div>
              <div class="workshop-card">
                <img class="workshop-image" src="https://images.unsplash.com/photo-1524721696987-b9527df9e512?w=600&h=400&fit=crop" alt="Acrylic Techniques" />
                <div class="workshop-content">
                  <h3 class="workshop-title">Acrylic Techniques</h3>
                  <p class="workshop-meta">⏱️ 6 weeks</p>
                  <div class="workshop-price">$200</div>
                  <button>Enroll Now</button>
                </div>
              </div>
              <div class="workshop-card">
                <img class="workshop-image" src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&h=400&fit=crop" alt="Portrait Painting" />
                <div class="workshop-content">
                  <h3 class="workshop-title">Portrait Painting</h3>
                  <p class="workshop-meta">⏱️ 8 weeks</p>
                  <div class="workshop-price">$280</div>
                  <button>Enroll Now</button>
                </div>
              </div>
            </div>
          </section>

          <slot name="gallery"></slot>

          <!-- Contact -->
          <section id="contact" class="bg-gray">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-grid">
              <div class="contact-info">
                <div class="contact-item">
                  <div>📍</div>
                  <div>
                    <h3>Location</h3>
                    <p>123 Creative Avenue<br />Art District, CA 90210</p>
                  </div>
                </div>
                <div class="contact-item">
                  <div>📞</div>
                  <div>
                    <h3>Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                <div class="contact-item">
                  <div>✉️</div>
                  <div>
                    <h3>Email</h3>
                    <p>hello@artisanstudio.com</p>
                  </div>
                </div>
              </div>
              <div class="contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message" rows="4"></textarea>
                <button @click=${this.handleSubmit}>Send Message</button>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer>
            <p>© 2026 Artisan Studio. All rights reserved.</p>
            <div class="footer-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Pinterest</a>
            </div>
          </footer>
        `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _isMenuOpen_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    });
    return _classThis;
})();

(() => {
    let _classDecorators = [t('hero-parallax')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = i;
    let _layers_decorators;
    let _layers_initializers = [];
    let _layers_extraInitializers = [];
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _layers_decorators = [n({ type: Array })];
            __esDecorate(null, null, _layers_decorators, { kind: "field", name: "layers", static: false, private: false, access: { has: obj => "layers" in obj, get: obj => obj.layers, set: (obj, value) => { obj.layers = value; } }, metadata: _metadata }, _layers_initializers, _layers_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static styles = i$3 `
    :host {
      display: block;
      position: relative;
      width: 100vw;
      width: 100%;
      overflow: hidden;
      height: 90vh;
      min-height: 400px;
      /* max-height: 900px; */
    }
    .layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
    }
    .layer img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position:0 30%;
      user-drag: none;
      pointer-events: none;
    }
  `;
        layers = __runInitializers(this, _layers_initializers, [
            // Sample config: list your images and their parallax speed factor (higher = moves more)
            // { src: '/assets/9print-1024x1536.jpg', speed: 0.1 },
            // { src: '/assets/held-by-the-wind.jpg', speed: 0.3 },
            { src: '/assets/test-1.jpg', speed: 0, startPos: '-320' },
            { src: '/assets/test-2.png', speed: 0.02, startPos: '-400' },
            { src: '/assets/test-3.png', speed: 0.02, startPos: '-470', direction: 'up' },
            { src: '/assets/test-4.png', speed: 0.07, startPos: '-500', stopPos: '200' },
            // { src: '/assets/layer3.png', speed: 0.6 },
        ]);
        onScroll = (__runInitializers(this, _layers_extraInitializers), () => {
            const scrollY = window.scrollY - 1000;
            // Animate layers
            this.layers.forEach((layer, idx) => {
                const el = this.renderRoot.querySelectorAll('.layer img')[idx];
                const base = layer.direction === 'up' ? -layer.speed * scrollY : layer.speed * scrollY;
                // If stopPos is defined, limit the movement
                if (layer.stopPos) {
                    const stopValue = parseInt(layer.stopPos);
                    if (base + (layer.startPos ? parseInt(layer.startPos) : 0) > stopValue) {
                        // Exceeded stop position
                        el.style.objectPosition = `50% ${stopValue}px`;
                        return;
                    }
                }
                if (el) {
                    // el.style.transform = `translateY(${scrollY * layer.speed}px)`;
                    el.style.objectPosition = `50% ${base + (layer.startPos ? parseInt(layer.startPos) : 0)}px`;
                    // el.style.objectPosition = `50% ${scrollY * layer.speed + (layer.startPos ? parseInt(layer.startPos) : 0)}px`;
                }
            });
        });
        connectedCallback() {
            super.connectedCallback();
            window.addEventListener('scroll', this.onScroll, { passive: true });
        }
        disconnectedCallback() {
            window.removeEventListener('scroll', this.onScroll);
            super.disconnectedCallback();
        }
        render() {
            return b `
      <div>
        ${this.layers.map((layer) => b `
            <div class="layer">
              <img src="${layer.src}" alt="Hero Layer" draggable="false" />
            </div>
          `)}
      </div>
      <slot></slot>
    `;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    });
    return _classThis;
})();

(() => {
    let _classDecorators = [t('instagram-gallery')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = i;
    let _currentSlide_decorators;
    let _currentSlide_initializers = [];
    let _currentSlide_extraInitializers = [];
    let _instagramPosts_decorators;
    let _instagramPosts_initializers = [];
    let _instagramPosts_extraInitializers = [];
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _currentSlide_decorators = [n({ type: Number })];
            _instagramPosts_decorators = [n({ type: Array })];
            __esDecorate(null, null, _currentSlide_decorators, { kind: "field", name: "currentSlide", static: false, private: false, access: { has: obj => "currentSlide" in obj, get: obj => obj.currentSlide, set: (obj, value) => { obj.currentSlide = value; } }, metadata: _metadata }, _currentSlide_initializers, _currentSlide_extraInitializers);
            __esDecorate(null, null, _instagramPosts_decorators, { kind: "field", name: "instagramPosts", static: false, private: false, access: { has: obj => "instagramPosts" in obj, get: obj => obj.instagramPosts, set: (obj, value) => { obj.instagramPosts = value; } }, metadata: _metadata }, _instagramPosts_initializers, _instagramPosts_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        currentSlide = __runInitializers(this, _currentSlide_initializers, 0);
        instagramPosts = (__runInitializers(this, _currentSlide_extraInitializers), __runInitializers(this, _instagramPosts_initializers, [
            {
                id: 1,
                url: 'https://www.instagram.com/p/DH53pOko2WD/',
                image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=800&fit=crop',
                caption: "Watercolor landscapes from last weekend's workshop!",
                likes: 234,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=800&h=800&fit=crop',
                caption: 'Abstract art session - so much creativity!',
                likes: 189,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop',
                caption: 'Our cozy studio space awaits you',
                likes: 312,
            },
            {
                id: 4,
                image: 'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca4?w=800&h=800&fit=crop',
                caption: 'Student showcase - amazing progress!',
                likes: 267,
            },
            {
                id: 5,
                image: 'https://images.unsplash.com/photo-1524721696987-b9527df9e512?w=800&h=800&fit=crop',
                caption: 'Acrylic pouring techniques workshop',
                likes: 298,
            },
            {
                id: 6,
                image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=800&fit=crop',
                caption: 'Portrait painting masterclass highlights',
                likes: 421,
            },
        ]));
        static styles = i$3 `
    :host {
      display: block;
    }

    /* Gallery */
    .instagram-header {
      text-align: center;
      margin-bottom: 16px;
      color: #d97706;
      font-size: 18px;
    }

    .carousel-container {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }

    .carousel-wrapper {
      overflow: hidden;
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s ease-out;
    }

    .carousel-item {
      flex: 0 0 100%;
      padding: 8px;
    }

    .instagram-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .instagram-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .instagram-caption {
      padding: 16px;
    }

    .instagram-caption p {
      color: #374151;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .instagram-likes {
      color: #6b7280;
      font-size: 14px;
    }

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: background 0.3s;
      font-size: 20px;
    }

    .carousel-btn:hover {
      background: white;
    }

    .carousel-btn.prev {
      left: 10px;
    }

    .carousel-btn.next {
      right: 10px;
    }
        /* Responsive */
    @media (min-width: 768px) {
      /* .menu-btn {
        display: none;
      }

      .about-grid {
        grid-template-columns: 1fr 1fr;
      }

      .workshops-grid {
        grid-template-columns: repeat(3, 1fr);
      } */

      .carousel-item {
        flex: 0 0 33.333%;
      }
/* 
      .contact-grid {
        grid-template-columns: 1fr 1fr;
      } */
    }

    @media (max-width: 767px) {
      /* .nav-links {
        display: none;
      }

      .menu-btn {
        display: flex;
      } */
    }
  `;
        connectedCallback() {
            super.connectedCallback();
            this.startCarouselAutoplay();
        }
        nextSlide() {
            this.currentSlide =
                (this.currentSlide + 1) % (this.instagramPosts.length - 2);
        }
        prevSlide() {
            this.currentSlide =
                (this.currentSlide - 1 + (this.instagramPosts.length - 2)) %
                    (this.instagramPosts.length - 2);
        }
        startCarouselAutoplay() {
            setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
        render() {
            return b `
      <section id="gallery">
        <h2 class="section-title">Follow Our Journey</h2>
        <div class="instagram-header">📷 @artisanstudio</div>
        <div class="carousel-container">
          <div class="carousel-wrapper">
            <div
              class="carousel-track"
              style="transform: translateX(-${this.currentSlide * 33.333}%)"
            >
              ${this.instagramPosts.map((post) => b `
                  <div class="carousel-item">
                    <a
                      class="instagram-card"
                      href="${post.url || '#'}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        class="instagram-image"
                        src="${post.image}"
                        alt="${post.caption}"
                      />
                      <div class="instagram-caption">
                        <p>${post.caption}</p>
                        <span class="instagram-likes">❤️ ${post.likes}</span>
                      </div>
                    </a>
                  </div>
                `)}
            </div>
          </div>
          <button class="carousel-btn prev" @click=${this.prevSlide}>‹</button>
          <button class="carousel-btn next" @click=${this.nextSlide}>›</button>
        </div>
      </section>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instagramPosts_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    });
    return _classThis;
})();
//# sourceMappingURL=index.js.map
