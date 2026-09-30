function t(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,b=_.trustedTypes,g=b?b.emptyScript:"",m=_.reactiveElementPolyfillSupport,f=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[f("elementProperties")]=new Map,A[f("finalized")]=new Map,m?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,C=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+k,T=`<${M}>`,P=document,O=()=>P.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,I="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,j=/>/g,D=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),J=new WeakMap,V=P.createTreeWalker(P,129);function K(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=R;for(let e=0;e<i;e++){const i=t[e];let r,c,h=-1,l=0;for(;l<i.length&&(a.lastIndex=l,c=a.exec(i),null!==c);)l=a.lastIndex,a===R?"!--"===c[1]?a=H:void 0!==c[1]?a=j:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=D):void 0!==c[3]&&(a=D):a===D?">"===c[0]?(a=o??R,h=-1):void 0===c[1]?h=-2:(h=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?D:'"'===c[3]?z:L):a===z||a===L?a=D:a===H||a===j?a=R:(a=D,o=void 0);const d=a===D&&t[e+1].startsWith("/>")?" ":"";n+=a===R?i+T:h>=0?(s.push(r),i.slice(0,h)+x+i.slice(h)+k+d):i+k+(-2===h?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[c,h]=F(t,e);if(this.el=Z.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(x)){const e=h[n++],i=s.getAttribute(t).split(k),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),V.nextNode(),r.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===M)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)r.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=U(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);V.currentNode=s;let o=V.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new Y(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new ot(o,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(o=V.nextNode(),n++)}return V.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new Z(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Y(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Q(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Q(this,s[i+a],e,a),r===W&&(r=this._$AH[a]),n||=!U(r)||r!==this._$AH[a],r===G?t=G:t!==G&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===W)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(Z,Y),(w.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let rt=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Y(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};rt._$litElement$=!0,rt.finalized=!0,at.litElementHydrateSupport?.({LitElement:rt});const ct=at.litElementPolyfillSupport;ct?.({LitElement:rt}),(at.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},dt=(t=lt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ut({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t=1,bt=t=>(...e)=>({_$litDirective$:t,values:e});let gt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt="important",ft=" !"+mt,$t=bt(class extends gt{constructor(t){if(super(t),t.type!==_t||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(ft);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?mt:""):i[t]=s}}return W}});var vt=a`
  :host {
    display: block;
  }

  /* Mirrors HA's tile "toggle" / select features so the bar matches the dashboard theme. */
  .bar {
    --tsc-radius: var(--control-select-border-radius, var(--feature-border-radius, 12px));
    position: relative;
    display: flex;
    height: var(--feature-height, 42px);
    margin-bottom: var(--ha-section-grid-row-gap, 8px);
    border-radius: var(--tsc-radius);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .bar::-webkit-scrollbar {
    display: none;
  }
  .track {
    position: absolute;
    inset: 0;
    border-radius: var(--tsc-radius);
    background: var(--control-select-background, var(--disabled-color));
    opacity: var(--control-select-background-opacity, 0.2);
    pointer-events: none;
  }
  .bar.align-start {
    justify-content: flex-start;
  }
  .bar.align-center {
    justify-content: center;
  }
  .bar.align-end {
    justify-content: flex-end;
  }

  .tab {
    position: relative;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 100%;
    padding: 0 20px;
    border: none;
    border-radius: var(--tsc-radius);
    background: transparent;
    color: var(--primary-text-color);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color 0.2s,
      color 0.2s;
  }
  .align-justify .tab {
    flex: 1 1 0;
  }
  .tab:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }
  .tab[aria-selected='true'] {
    background: var(--tsc-active-color, var(--grey-color, #9e9e9e));
    color: var(--white-color, #fff);
  }
  ha-icon {
    --mdc-icon-size: 22px;
    display: flex;
  }

  .panel[hidden] {
    display: none;
  }

  .message {
    padding: 16px;
    color: var(--secondary-text-color);
    text-align: center;
  }
`;const yt=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),At=(t,e)=>t.id&&yt(t.id)||t.name&&yt(t.name)||`tab-${e+1}`,wt=(t,e)=>t.name||`Tab ${e+1}`;function Ct(t,e){if(null==e||""===e)return-1;if("number"==typeof e)return e>=0&&e<t.length?e:-1;const i=yt(String(e)),s=t.findIndex((t,e)=>At(t,e)===i);return s>=0?s:/^\d+$/.test(i)&&Number(i)<t.length?Number(i):-1}function Et(t){if(t)return/^[a-z]+$/i.test(t)?`var(--${t.toLowerCase()}-color)`:t}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St={},xt=bt(class extends gt{constructor(){super(...arguments),this.key=G}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(((t,e=St)=>{t._$AH=e;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(t),this.key=e),i}}),kt={type:"grid"},Mt={default_tab:"Default tab",idle_return:"Return to default tab after (seconds, 0 = never)",color:"Selected tab colour",tab_display:"Tab display",align:"Tab alignment",name:"Name",icon:"Icon",id:"ID (optional — used by default tab and switch-tab actions)"};let Tt=class extends rt{constructor(){super(...arguments),this._tab=0,this._card=0,this._GUImode=!0,this._guiModeAvailable=!0,this._depsReady=!1,this._keys=new Map,this._label=t=>{var e;return null!==(e=Mt[t.name])&&void 0!==e?e:t.name}}connectedCallback(){super.connectedCallback(),this._loadDeps()}async _loadDeps(){try{const t=await window.loadCardHelpers(),e=await t.createCardElement({type:"vertical-stack",cards:[]});await e.constructor.getConfigElement(),await Promise.all(["hui-card-element-editor","hui-card-picker","ha-tab-group","ha-form"].map(t=>customElements.whenDefined(t)))}finally{this._depsReady=!0}}setConfig(t){var e,i,s,o;this._config=t,this._tab>=(null!==(i=null===(e=t.tabs)||void 0===e?void 0:e.length)&&void 0!==i?i:0)&&(this._tab=Math.max(0,(null!==(o=null===(s=t.tabs)||void 0===s?void 0:s.length)&&void 0!==o?o:1)-1))}get _tabs(){var t,e;return null!==(e=null===(t=this._config)||void 0===t?void 0:t.tabs)&&void 0!==e?e:[]}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_setTabs(t){this._keys.clear(),this._emit({...this._config,tabs:t})}_updateTab(t,e){const i=[...this._tabs];i[t]={...i[t],...e},this._emit({...this._config,tabs:i})}_key(t,...e){const i=`${t}-${e.join("-")}`;return this._keys.has(i)||this._keys.set(i,Math.random().toString()),this._keys.get(i)}_generalSchema(){return[{name:"default_tab",selector:{select:{mode:"dropdown",options:this._tabs.map((t,e)=>({value:At(t,e),label:wt(t,e)}))}}},{name:"idle_return",selector:{number:{min:0,max:3600,step:5,mode:"box",unit_of_measurement:"s"}}},{name:"color",selector:{ui_color:{}}},{type:"grid",name:"",schema:[{name:"tab_display",selector:{select:{mode:"dropdown",options:[{value:"both",label:"Icon and label"},{value:"icon",label:"Icon only"},{value:"label",label:"Label only"}]}}},{name:"align",selector:{select:{mode:"dropdown",options:[{value:"justify",label:"Fill width"},{value:"start",label:"Start"},{value:"center",label:"Centre"},{value:"end",label:"End"}]}}}]}]}_generalChanged(t){t.stopPropagation();const e={...t.detail.value};for(const t of Object.keys(e))void 0!==e[t]&&""!==e[t]||delete e[t];this._emit({...this._config,...e})}_selectTab(t){t.stopPropagation();const e=parseInt(t.detail.name,10);Number.isNaN(e)||e===this._tab||(this._tab=e,this._card=0,this._GUImode=!0,this._guiModeAvailable=!0)}_addTab(){const t=[...this._tabs,{name:`Tab ${this._tabs.length+1}`,cards:[]}];this._setTabs(t),this._tab=t.length-1,this._card=0}_deleteTab(){if(this._tabs.length<=1)return;const t=[...this._tabs];t.splice(this._tab,1),this._tab=Math.max(0,this._tab-1),this._card=0,this._setTabs(t)}_moveTab(t){const e=[...this._tabs],i=this._tab+t,[s]=e.splice(this._tab,1);e.splice(i,0,s),this._tab=i,this._setTabs(e)}_duplicateTab(){const t=[...this._tabs],e=JSON.parse(JSON.stringify(t[this._tab]));e.name=`${wt(e,this._tab)} copy`,delete e.id,t.splice(this._tab+1,0,e),this._tab+=1,this._setTabs(t)}_tabFormChanged(t){t.stopPropagation();const e={...t.detail.value};for(const t of Object.keys(e))void 0!==e[t]&&""!==e[t]||delete e[t];const i=[...this._tabs];i[this._tab]={...e,cards:i[this._tab].cards},this._emit({...this._config,tabs:i})}get _cards(){var t,e;return null!==(e=null===(t=this._tabs[this._tab])||void 0===t?void 0:t.cards)&&void 0!==e?e:[]}_setCards(t){this._updateTab(this._tab,{cards:t})}_selectCard(t){t.stopPropagation(),this._GUImode=!0,this._guiModeAvailable=!0,this._card=parseInt(t.detail.name,10)}_cardChanged(t){t.stopPropagation();const e=[...this._cards];e[this._card]=t.detail.config,this._guiModeAvailable=t.detail.guiModeAvailable,this._setCardsKeepKeys(e)}_setCardsKeepKeys(t){const e=new Map(this._keys);this._setCards(t),this._keys=e}_cardPicked(t){t.stopPropagation(),this._setCards([...this._cards,t.detail.config])}_deleteCard(){const t=[...this._cards];t.splice(this._card,1),this._card=Math.max(0,this._card-1),this._setCards(t)}_copyCard(){(t=>{try{sessionStorage.setItem("dashboardCardClipboard",JSON.stringify(t))}catch{}})(JSON.parse(JSON.stringify(this._cards[this._card])))}_cutCard(){this._copyCard(),this._deleteCard()}_moveCard(t){const e=[...this._cards],i=this._card+t,[s]=e.splice(this._card,1);e.splice(i,0,s),this._card=i,this._setCards(e)}_guiModeChanged(t){t.stopPropagation(),this._GUImode=t.detail.guiMode,this._guiModeAvailable=t.detail.guiModeAvailable}render(){if(!this.hass||!this._config)return G;if(!this._depsReady)return q`<p class="hint">Loading editor…</p>`;const t=this._tabs,e=t[this._tab],i=this._cards,s=!this._cardEditorEl||this._GUImode;return q`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._generalSchema()}
        .computeLabel=${this._label}
        @value-changed=${this._generalChanged}
      ></ha-form>

      <h3>Tabs</h3>
      <div class="toolbar">
        <ha-tab-group @wa-tab-show=${this._selectTab}>
          ${t.map((t,e)=>q`<ha-tab-group-tab slot="nav" .panel=${e} .active=${e===this._tab}>
              ${wt(t,e)}
            </ha-tab-group-tab>`)}
        </ha-tab-group>
        <ha-icon-button label="Add tab" @click=${this._addTab}><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
      </div>

      <div class="panel">
        <div class="options">
          <ha-icon-button label="Move tab earlier" .disabled=${0===this._tab} @click=${()=>this._moveTab(-1)}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            label="Move tab later"
            .disabled=${this._tab===t.length-1}
            @click=${()=>this._moveTab(1)}
          >
            <ha-icon icon="mdi:arrow-right"></ha-icon>
          </ha-icon-button>
          <ha-icon-button label="Duplicate tab" @click=${this._duplicateTab}>
            <ha-icon icon="mdi:content-duplicate"></ha-icon>
          </ha-icon-button>
          <ha-icon-button label="Delete tab" .disabled=${t.length<=1} @click=${this._deleteTab}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </ha-icon-button>
        </div>

        ${xt(`tab-${this._tab}`,q`<ha-form
            .hass=${this.hass}
            .data=${{name:e.name,icon:e.icon,id:e.id}}
            .schema=${[{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{name:"id",selector:{text:{}}}]}
            .computeLabel=${this._label}
            @value-changed=${this._tabFormChanged}
          ></ha-form>`)}

        <h4>Cards in “${wt(e,this._tab)}”</h4>
        <div class="toolbar">
          <ha-tab-group @wa-tab-show=${this._selectCard}>
            ${i.map((t,e)=>q`<ha-tab-group-tab slot="nav" .panel=${e} .active=${e===this._card}>
                ${e+1}
              </ha-tab-group-tab>`)}
          </ha-tab-group>
          <ha-icon-button label="Add card" @click=${()=>this._card=i.length}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </ha-icon-button>
        </div>

        <div id="editor">
          ${this._card<i.length?q`
                <div class="options">
                  <ha-icon-button
                    class="gui-mode-button"
                    label=${s?"Show code editor":"Show visual editor"}
                    .disabled=${!this._guiModeAvailable}
                    @click=${()=>{var t;return null===(t=this._cardEditorEl)||void 0===t?void 0:t.toggleMode()}}
                  >
                    <ha-icon icon=${s?"mdi:code-braces":"mdi:list-box-outline"}></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button label="Move card earlier" .disabled=${0===this._card} @click=${()=>this._moveCard(-1)}>
                    <ha-icon icon="mdi:arrow-left"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button
                    label="Move card later"
                    .disabled=${this._card===i.length-1}
                    @click=${()=>this._moveCard(1)}
                  >
                    <ha-icon icon="mdi:arrow-right"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button label="Copy card" @click=${this._copyCard}><ha-icon icon="mdi:content-copy"></ha-icon></ha-icon-button>
                  <ha-icon-button label="Cut card" @click=${this._cutCard}><ha-icon icon="mdi:content-cut"></ha-icon></ha-icon-button>
                  <ha-icon-button label="Delete card" @click=${this._deleteCard}><ha-icon icon="mdi:delete"></ha-icon></ha-icon-button>
                </div>
                ${xt(this._key("card",this._tab,this._card,i.length),q`<hui-card-element-editor
                    .hass=${this.hass}
                    .lovelace=${this.lovelace}
                    .value=${i[this._card]}
                    .sectionConfig=${kt}
                    show-visibility-tab
                    @config-changed=${this._cardChanged}
                    @GUImode-changed=${this._guiModeChanged}
                  ></hui-card-element-editor>`)}
              `:q`<hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._cardPicked}
              ></hui-card-picker>`}
        </div>
      </div>
    `}};Tt.styles=a`
    :host {
      display: block;
    }
    h3,
    h4 {
      margin: 16px 0 8px;
      font-weight: 500;
    }
    .hint {
      color: var(--secondary-text-color);
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ha-tab-group {
      flex-grow: 1;
      min-width: 0;
      --ha-tab-track-color: var(--card-background-color);
    }
    .options {
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }
    .gui-mode-button {
      margin-right: auto;
      margin-inline-end: auto;
    }
    .panel {
      border: 1px solid var(--divider-color);
      padding: 12px;
      margin-top: 4px;
    }
    #editor {
      border: 1px solid var(--divider-color);
      padding: 12px;
    }
  `,t([ut({attribute:!1})],Tt.prototype,"hass",void 0),t([ut({attribute:!1})],Tt.prototype,"lovelace",void 0),t([pt()],Tt.prototype,"_config",void 0),t([pt()],Tt.prototype,"_tab",void 0),t([pt()],Tt.prototype,"_card",void 0),t([pt()],Tt.prototype,"_GUImode",void 0),t([pt()],Tt.prototype,"_guiModeAvailable",void 0),t([pt()],Tt.prototype,"_depsReady",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("hui-card-element-editor")],Tt.prototype,"_cardEditorEl",void 0),Tt=t([ht("tabbed-section-card-editor")],Tt);console.info("%c TABBED-SECTION-CARD %c v0.1.0 ","color: white; background: #3f8fd2; font-weight: 700;","color: #3f8fd2; background: white; font-weight: 700;");const Pt=window;Pt.customCards=Pt.customCards||[],Pt.customCards.push({type:"tabbed-section-card",name:"Tabbed Section Card",description:"A tab bar where every tab is a full sections-view section.",preview:!1});const Ot=["pointerdown","keydown","wheel","touchstart"];let Ut=class extends rt{constructor(){super(...arguments),this.editMode=!1,this._active=0,this._visited=new Set,this._sectionMissing=!1,this._sections=new WeakMap,this._armIdle=()=>{var t;window.clearTimeout(this._idleTimer);const e=Number(null===(t=this._config)||void 0===t?void 0:t.idle_return);!e||e<=0||this._active===this._defaultIndex()||(this._idleTimer=window.setTimeout(()=>this._select(this._defaultIndex(),!1),1e3*e))},this._onCustomAction=t=>{var e;const i=null===(e=t.detail)||void 0===e?void 0:e.tabbed_section_card;if(!i||!this._config)return;const s=Ct(this._config.tabs,i.tab);s>=0&&this._select(s)}}static getConfigElement(){return document.createElement("tabbed-section-card-editor")}static getStubConfig(){return{type:"custom:tabbed-section-card",tabs:[{name:"Home",icon:"mdi:home",cards:[]},{name:"More",icon:"mdi:dots-horizontal",cards:[]}]}}setConfig(t){if(!t||!Array.isArray(t.tabs)||0===t.tabs.length)throw new Error("tabbed-section-card: define at least one entry in `tabs`");const e=!this._config;this._config=t,(e||this._active>=t.tabs.length)&&this._select(this._defaultIndex(),!1),this._armIdle()}getCardSize(){return 8}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}connectedCallback(){super.connectedCallback(),window.addEventListener("ll-custom",this._onCustomAction),Ot.forEach(t=>window.addEventListener(t,this._armIdle,{passive:!0,capture:!0})),this._armIdle(),customElements.get("hui-section")||window.setTimeout(()=>{customElements.get("hui-section")||(this._sectionMissing=!0)},5e3)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ll-custom",this._onCustomAction),Ot.forEach(t=>window.removeEventListener(t,this._armIdle,{capture:!0})),window.clearTimeout(this._idleTimer)}_defaultIndex(){var t,e,i;const s=Ct(null!==(e=null===(t=this._config)||void 0===t?void 0:t.tabs)&&void 0!==e?e:[],null===(i=this._config)||void 0===i?void 0:i.default_tab);return s>=0?s:0}_select(t,e=!0){this._active=t,this._visited.has(t)||(this._visited=new Set(this._visited).add(t)),requestAnimationFrame(()=>window.dispatchEvent(new Event("resize"))),e&&this._armIdle()}_sectionConfig(t){var e;let i=this._sections.get(t);return i||(i={type:"grid",cards:null!==(e=t.cards)&&void 0!==e?e:[]},this._sections.set(t,i)),i}render(){var t,e;const i=this._config;if(!i)return G;const s=null!==(t=i.tab_display)&&void 0!==t?t:"both";return q`
      <div
        class="bar align-${null!==(e=i.align)&&void 0!==e?e:"justify"}"
        role="tablist"
        style=${$t({"--tsc-active-color":Et(i.color)})}
      >
        <div class="track"></div>
        ${i.tabs.map((t,e)=>{const i=wt(t,e),o="label"!==s&&t.icon;return q`
            <button
              class="tab"
              role="tab"
              id="tab-${At(t,e)}"
              aria-selected=${e===this._active?"true":"false"}
              aria-label=${i}
              @click=${()=>this._select(e)}
            >
              ${o?q`<ha-icon .icon=${t.icon}></ha-icon>`:G}
              ${"icon"===s&&t.icon?G:q`<span>${i}</span>`}
            </button>
          `})}
      </div>
      ${this._sectionMissing?q`<div class="message">
            Tabbed Section Card needs a <b>sections</b> view — the section element isn't available here.
          </div>`:i.tabs.map((t,e)=>this._visited.has(e)?q`
                  <div class="panel" role="tabpanel" aria-labelledby="tab-${At(t,e)}" ?hidden=${e!==this._active}>
                    <hui-section
                      .hass=${this.hass}
                      .config=${this._sectionConfig(t)}
                      .preview=${this.editMode}
                      .index=${0}
                      .viewIndex=${0}
                    ></hui-section>
                  </div>
                `:G)}
    `}updated(t){t.has("_config")&&this._armIdle()}};Ut.styles=vt,t([ut({attribute:!1})],Ut.prototype,"hass",void 0),t([ut({type:Boolean})],Ut.prototype,"editMode",void 0),t([pt()],Ut.prototype,"_config",void 0),t([pt()],Ut.prototype,"_active",void 0),t([pt()],Ut.prototype,"_visited",void 0),t([pt()],Ut.prototype,"_sectionMissing",void 0),Ut=t([ht("tabbed-section-card")],Ut);export{Ut as TabbedSectionCard};
