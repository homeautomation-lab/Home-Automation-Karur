(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const oa=()=>{};var zi={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw je(e)},je=function(n){return new Error("Firebase Database ("+js.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ra=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[i++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],r=n[t++],a=n[t++],l=((s&7)<<18|(o&63)<<12|(r&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const o=n[t++],r=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(o&63)<<6|r&63)}}return e.join("")},ii={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const o=n[s],r=s+1<n.length,a=r?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,u=o>>2,h=(o&3)<<4|a>>4;let d=(a&15)<<2|c>>6,p=c&63;l||(p=64,r||(d=64)),i.push(t[u],t[h],t[d],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ks(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ra(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const h=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||a==null||c==null||h==null)throw new aa;const d=o<<2|a>>4;if(i.push(d),c!==64){const p=a<<4&240|c>>2;if(i.push(p),h!==64){const y=c<<6&192|h;i.push(y)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class aa extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ys=function(n){const e=Ks(n);return ii.encodeByteArray(e,!0)},Bt=function(n){return Ys(n).replace(/\./g,"")},Ln=function(n){try{return ii.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function la(n){return Qs(void 0,n)}function Qs(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!ca(t)||(n[t]=Qs(n[t],e[t]));return n}function ca(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=()=>ua().__FIREBASE_DEFAULTS__,ha=()=>{if(typeof process>"u"||typeof zi>"u")return;const n=zi.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},fa=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ln(n[1]);return e&&JSON.parse(e)},Xs=()=>{try{return oa()||da()||ha()||fa()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},pa=n=>{var e,t;return(t=(e=Xs())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ma=n=>{const e=pa(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Js=()=>{var n;return(n=Xs())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function _a(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Bt(JSON.stringify(t)),Bt(JSON.stringify(r)),""].join(".")}const st={};function ya(){const n={prod:[],emulator:[]};for(const e of Object.keys(st))st[e]?n.emulator.push(e):n.prod.push(e);return n}function va(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let ji=!1;function Ca(n,e){if(typeof window>"u"||typeof document>"u"||!si(window.location.host)||st[n]===e||st[n]||ji)return;st[n]=e;function t(d){return`__firebase__banner__${d}`}const i="__firebase__banner",o=ya().prod.length>0;function r(){const d=document.getElementById(i);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,p){d.setAttribute("width","24"),d.setAttribute("id",p),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{ji=!0,r()},d}function u(d,p){d.setAttribute("id",p),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function h(){const d=va(i),p=t("text"),y=document.getElementById(p)||document.createElement("span"),I=t("learnmore"),O=document.getElementById(I)||document.createElement("a"),Q=t("preprendIcon"),X=document.getElementById(Q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const J=d.element;a(J),u(O,I);const Z=c();l(X,Q),J.append(X,y,O,Z),document.body.appendChild(J)}o?(y.innerText="Preview backend disconnected.",X.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(X.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,y.innerText="Preview backend running in this workspace."),y.setAttribute("id",p)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zs(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ba())}function Sa(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function wa(){return js.NODE_ADMIN===!0}function Ta(){try{return typeof indexedDB=="object"}catch{return!1}}function Ea(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia="FirebaseError";class wt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Ia,Object.setPrototypeOf(this,wt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,eo.prototype.create)}}class eo{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],r=o?Ra(o,i):"Error",a=`${this.serviceName}: ${r} (${s}).`;return new wt(s,a,i)}}function Ra(n,e){return n.replace(Aa,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Aa=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(n){return JSON.parse(n)}function $(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to=function(n){let e={},t={},i={},s="";try{const o=n.split(".");e=dt(Ln(o[0])||""),t=dt(Ln(o[1])||""),s=o[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},ka=function(n){const e=to(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Na=function(n){const e=to(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function He(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ki(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Vt(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Wt(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const o=n[s],r=e[s];if(Yi(o)&&Yi(r)){if(!Wt(o,r))return!1}else if(o!==r)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Yi(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)i[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],o=this.chain_[1],r=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^o&(r^a),u=1518500249):(c=o^r^a,u=1859775393):h<60?(c=o&r|a&(o|r),u=2400959708):(c=o^r^a,u=3395469782);const d=(s<<5|s>>>27)+c+l+u+i[h]&4294967295;l=a,a=r,r=(o<<30|o>>>2)&4294967295,o=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+r&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const o=this.buf_;let r=this.inbuf_;for(;s<t;){if(r===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(o[r]=e.charCodeAt(s),++r,++s,r===this.blockSize){this.compress_(o),r=0;break}}else for(;s<t;)if(o[r]=e[s],++r,++s,r===this.blockSize){this.compress_(o),r=0;break}}this.inbuf_=r,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let o=24;o>=0;o-=8)e[i]=this.chain_[s]>>o&255,++i;return e}}function oi(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const o=s-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");const r=n.charCodeAt(i)-56320;s=65536+(o<<10)+r}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},cn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(n){return n&&n._delegate?n._delegate:n}class ht{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Te="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new ln;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(La(e))try{this.getOrInitializeService({instanceIdentifier:Te})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});i.resolve(o)}catch{}}}}clearInstance(e=Te){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Te){return this.instances.has(e)}getOptions(e=Te){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,r]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);i===a&&r.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),o=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;o.add(e),this.onInitCallbacks.set(s,o);const r=this.instances.get(s);return r&&e(r,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Ma(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Te){return this.component?this.component.multipleInstances?e:Te:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ma(n){return n===Te?void 0:n}function La(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Oa(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var N;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(N||(N={}));const $a={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},Ba=N.INFO,Va={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},Wa=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Va[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class no{constructor(e){this.name=e,this._logLevel=Ba,this._logHandler=Wa,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?$a[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const Ua=(n,e)=>e.some(t=>n instanceof t);let Qi,Xi;function Ha(){return Qi||(Qi=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function qa(){return Xi||(Xi=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const io=new WeakMap,Fn=new WeakMap,so=new WeakMap,bn=new WeakMap,ri=new WeakMap;function Ga(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",r)},o=()=>{t(me(n.result)),s()},r=()=>{i(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",r)});return e.then(t=>{t instanceof IDBCursor&&io.set(t,n)}).catch(()=>{}),ri.set(e,n),e}function za(n){if(Fn.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",r),n.removeEventListener("abort",r)},o=()=>{t(),s()},r=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",r),n.addEventListener("abort",r)});Fn.set(n,e)}let $n={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Fn.get(n);if(e==="objectStoreNames")return n.objectStoreNames||so.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return me(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ja(n){$n=n($n)}function Ka(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Sn(this),e,...t);return so.set(i,e.sort?e.sort():[e]),me(i)}:qa().includes(n)?function(...e){return n.apply(Sn(this),e),me(io.get(this))}:function(...e){return me(n.apply(Sn(this),e))}}function Ya(n){return typeof n=="function"?Ka(n):(n instanceof IDBTransaction&&za(n),Ua(n,Ha())?new Proxy(n,$n):n)}function me(n){if(n instanceof IDBRequest)return Ga(n);if(bn.has(n))return bn.get(n);const e=Ya(n);return e!==n&&(bn.set(n,e),ri.set(e,n)),e}const Sn=n=>ri.get(n);function Qa(n,e,{blocked:t,upgrade:i,blocking:s,terminated:o}={}){const r=indexedDB.open(n,e),a=me(r);return i&&r.addEventListener("upgradeneeded",l=>{i(me(r.result),l.oldVersion,l.newVersion,me(r.transaction),l)}),t&&r.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{o&&l.addEventListener("close",()=>o()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Xa=["get","getKey","getAll","getAllKeys","count"],Ja=["put","add","delete","clear"],wn=new Map;function Ji(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(wn.get(e))return wn.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Ja.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Xa.includes(t)))return;const o=async function(r,...a){const l=this.transaction(r,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return wn.set(e,o),o}ja(n=>({...n,get:(e,t,i)=>Ji(e,t)||n.get(e,t,i),has:(e,t)=>!!Ji(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(el(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function el(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Bn="@firebase/app",Zi="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new no("@firebase/app"),tl="@firebase/app-compat",nl="@firebase/analytics-compat",il="@firebase/analytics",sl="@firebase/app-check-compat",ol="@firebase/app-check",rl="@firebase/auth",al="@firebase/auth-compat",ll="@firebase/database",cl="@firebase/data-connect",ul="@firebase/database-compat",dl="@firebase/functions",hl="@firebase/functions-compat",fl="@firebase/installations",pl="@firebase/installations-compat",ml="@firebase/messaging",_l="@firebase/messaging-compat",gl="@firebase/performance",yl="@firebase/performance-compat",vl="@firebase/remote-config",Cl="@firebase/remote-config-compat",bl="@firebase/storage",Sl="@firebase/storage-compat",wl="@firebase/firestore",Tl="@firebase/ai",El="@firebase/firestore-compat",Il="firebase",Rl="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn="[DEFAULT]",Al={[Bn]:"fire-core",[tl]:"fire-core-compat",[il]:"fire-analytics",[nl]:"fire-analytics-compat",[ol]:"fire-app-check",[sl]:"fire-app-check-compat",[rl]:"fire-auth",[al]:"fire-auth-compat",[ll]:"fire-rtdb",[cl]:"fire-data-connect",[ul]:"fire-rtdb-compat",[dl]:"fire-fn",[hl]:"fire-fn-compat",[fl]:"fire-iid",[pl]:"fire-iid-compat",[ml]:"fire-fcm",[_l]:"fire-fcm-compat",[gl]:"fire-perf",[yl]:"fire-perf-compat",[vl]:"fire-rc",[Cl]:"fire-rc-compat",[bl]:"fire-gcs",[Sl]:"fire-gcs-compat",[wl]:"fire-fst",[El]:"fire-fst-compat",[Tl]:"fire-vertex","fire-js":"fire-js",[Il]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=new Map,kl=new Map,Wn=new Map;function es(n,e){try{n.container.addComponent(e)}catch(t){ue.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ht(n){const e=n.name;if(Wn.has(e))return ue.debug(`There were multiple attempts to register component ${e}.`),!1;Wn.set(e,n);for(const t of Ut.values())es(t,n);for(const t of kl.values())es(t,n);return!0}function Nl(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Pl(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_e=new eo("app","Firebase",Dl);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new ht("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw _e.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol=Rl;function oo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Vn,automaticDataCollectionEnabled:!0},e),s=i.name;if(typeof s!="string"||!s)throw _e.create("bad-app-name",{appName:String(s)});if(t||(t=Js()),!t)throw _e.create("no-options");const o=Ut.get(s);if(o){if(Wt(t,o.options)&&Wt(i,o.config))return o;throw _e.create("duplicate-app",{appName:s})}const r=new Fa(s);for(const l of Wn.values())r.addComponent(l);const a=new xl(t,i,r);return Ut.set(s,a),a}function Ml(n=Vn){const e=Ut.get(n);if(!e&&n===Vn&&Js())return oo();if(!e)throw _e.create("no-app",{appName:n});return e}function Be(n,e,t){var i;let s=(i=Al[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const o=s.match(/\s|\//),r=e.match(/\s|\//);if(o||r){const a=[`Unable to register library "${s}" with version "${e}":`];o&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&r&&a.push("and"),r&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ue.warn(a.join(" "));return}Ht(new ht(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll="firebase-heartbeat-database",Fl=1,ft="firebase-heartbeat-store";let Tn=null;function ro(){return Tn||(Tn=Qa(Ll,Fl,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ft)}catch(t){console.warn(t)}}}}).catch(n=>{throw _e.create("idb-open",{originalErrorMessage:n.message})})),Tn}async function $l(n){try{const t=(await ro()).transaction(ft),i=await t.objectStore(ft).get(ao(n));return await t.done,i}catch(e){if(e instanceof wt)ue.warn(e.message);else{const t=_e.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ue.warn(t.message)}}}async function ts(n,e){try{const i=(await ro()).transaction(ft,"readwrite");await i.objectStore(ft).put(e,ao(n)),await i.done}catch(t){if(t instanceof wt)ue.warn(t.message);else{const i=_e.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ue.warn(i.message)}}}function ao(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl=1024,Vl=30;class Wl{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Hl(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ns();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(r=>r.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Vl){const r=ql(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){ue.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ns(),{heartbeatsToSend:i,unsentEntries:s}=Ul(this._heartbeatsCache.heartbeats),o=Bt(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return ue.warn(t),""}}}function ns(){return new Date().toISOString().substring(0,10)}function Ul(n,e=Bl){const t=[];let i=n.slice();for(const s of n){const o=t.find(r=>r.agent===s.agent);if(o){if(o.dates.push(s.date),is(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),is(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Hl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ta()?Ea().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await $l(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return ts(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return ts(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function is(n){return Bt(JSON.stringify({version:2,heartbeats:n})).length}function ql(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(n){Ht(new ht("platform-logger",e=>new Za(e),"PRIVATE")),Ht(new ht("heartbeat",e=>new Wl(e),"PRIVATE")),Be(Bn,Zi,n),Be(Bn,Zi,"esm2017"),Be("fire-js","")}Gl("");var zl="firebase",jl="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Be(zl,jl,"app");var ss={};const os="@firebase/database",rs="1.0.20";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lo="";function Kl(n){lo=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),$(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:dt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return he(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Yl(e)}}catch{}return new Ql},Ie=co("localStorage"),Xl=co("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ve=new no("@firebase/database"),Jl=(function(){let n=1;return function(){return n++}})(),uo=function(n){const e=xa(n),t=new Da;t.update(e);const i=t.digest();return ii.encodeByteArray(i)},Tt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Tt.apply(null,i):typeof i=="object"?e+=$(i):e+=i,e+=" "}return e};let ot=null,as=!0;const Zl=function(n,e){f(!0,"Can't turn on custom loggers persistently."),Ve.logLevel=N.VERBOSE,ot=Ve.log.bind(Ve)},H=function(...n){if(as===!0&&(as=!1,ot===null&&Xl.get("logging_enabled")===!0&&Zl()),ot){const e=Tt.apply(null,n);ot(e)}},Et=function(n){return function(...e){H(n,...e)}},Un=function(...n){const e="FIREBASE INTERNAL ERROR: "+Tt(...n);Ve.error(e)},de=function(...n){const e=`FIREBASE FATAL ERROR: ${Tt(...n)}`;throw Ve.error(e),new Error(e)},j=function(...n){const e="FIREBASE WARNING: "+Tt(...n);Ve.warn(e)},ec=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&j("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ho=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},tc=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},qe="[MIN_NAME]",Ne="[MAX_NAME]",Ye=function(n,e){if(n===e)return 0;if(n===qe||e===Ne)return-1;if(e===qe||n===Ne)return 1;{const t=ls(n),i=ls(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},nc=function(n,e){return n===e?0:n<e?-1:1},Ze=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+$(e))},ai=function(n){if(typeof n!="object"||n===null)return $(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=$(e[i]),t+=":",t+=ai(n[e[i]]);return t+="}",t},fo=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function K(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const po=function(n){f(!ho(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,o,r,a,l;n===0?(o=0,r=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),o=a+i,r=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(o=0,r=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);for(l=e;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);c.push(s?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},ic=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},sc=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function oc(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const rc=new RegExp("^-?(0*)\\d{1,10}$"),ac=-2147483648,lc=2147483647,ls=function(n){if(rc.test(n)){const e=Number(n);if(e>=ac&&e<=lc)return e}return null},Qe=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw j("Exception was thrown by user callback.",t),e},Math.floor(0))}},cc=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},rt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Pl(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){j(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(H("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',j(e)}}class Lt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Lt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li="5",mo="v",_o="s",go="r",yo="f",vo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Co="ls",bo="p",Hn="ac",So="websocket",wo="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,t,i,s,o=!1,r="",a=!1,l=!1,c=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=o,this.persistenceKey=r,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ie.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ie.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function hc(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Eo(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===So)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===wo)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);hc(n)&&(t.ns=n.namespace);const s=[];return K(t,(o,r)=>{s.push(o+"="+r)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(){this.counters_={}}incrementCounter(e,t=1){he(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return la(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En={},In={};function ci(n){const e=n.toString();return En[e]||(En[e]=new fc),En[e]}function pc(n,e){const t=n.toString();return In[t]||(In[t]=e()),In[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Qe(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs="start",_c="close",gc="pLPCommand",yc="pRTLPCB",Io="id",Ro="pw",Ao="ser",vc="cb",Cc="seg",bc="ts",Sc="d",wc="dframe",ko=1870,No=30,Tc=ko-No,Ec=25e3,Ic=3e4;class $e{constructor(e,t,i,s,o,r,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.transportSessionId=r,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Et(e),this.stats_=ci(t),this.urlFn=l=>(this.appCheckToken&&(l[Hn]=this.appCheckToken),Eo(t,wo,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new mc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ic)),tc(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ui((...o)=>{const[r,a,l,c,u]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,r===cs)this.id=a,this.password=l;else if(r===_c)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+r)},(...o)=>{const[r,a]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(r,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[cs]="t",i[Ao]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[vc]=this.scriptTagHolder.uniqueCallbackIdentifier),i[mo]=li,this.transportSessionId&&(i[_o]=this.transportSessionId),this.lastSessionId&&(i[Co]=this.lastSessionId),this.applicationId&&(i[bo]=this.applicationId),this.appCheckToken&&(i[Hn]=this.appCheckToken),typeof location<"u"&&location.hostname&&vo.test(location.hostname)&&(i[go]=yo);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){$e.forceAllow_=!0}static forceDisallow(){$e.forceDisallow_=!0}static isAvailable(){return $e.forceAllow_?!0:!$e.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!ic()&&!sc()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=$(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Ys(t),s=fo(i,Tc);for(let o=0;o<s.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[o]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[wc]="t",i[Io]=e,i[Ro]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=$(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ui{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Jl(),window[gc+this.uniqueCallbackIdentifier]=e,window[yc+this.uniqueCallbackIdentifier]=t,this.myIFrame=ui.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const r="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(r),this.myIFrame.doc.close()}catch(a){H("frame writing exception"),a.stack&&H(a.stack),H(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||H("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Io]=this.myID,e[Ro]=this.myPW,e[Ao]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+No+i.length<=ko;){const r=this.pendingSegs.shift();i=i+"&"+Cc+s+"="+r.seg+"&"+bc+s+"="+r.ts+"&"+Sc+s+"="+r.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Ec)),o=()=>{clearTimeout(s),i()};this.addTag(e,o)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{H("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc=16384,Ac=45e3;let qt=null;typeof MozWebSocket<"u"?qt=MozWebSocket:typeof WebSocket<"u"&&(qt=WebSocket);class ee{constructor(e,t,i,s,o,r,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Et(this.connId),this.stats_=ci(t),this.connURL=ee.connectionURL_(t,r,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,o){const r={};return r[mo]=li,typeof location<"u"&&location.hostname&&vo.test(location.hostname)&&(r[go]=yo),t&&(r[_o]=t),i&&(r[Co]=i),s&&(r[Hn]=s),o&&(r[bo]=o),Eo(e,So,r)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ie.set("previous_websocket_failure",!0);try{let i;wa(),this.mySock=new qt(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ee.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&qt!==null&&!ee.forceDisallow_}static previouslyFailed(){return Ie.isInMemoryStorage||Ie.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ie.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=dt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=$(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=fo(t,Rc);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Ac))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ee.responsesRequiredToBeHealthy=2;ee.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{static get ALL_TRANSPORTS(){return[$e,ee]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=ee&&ee.isAvailable();let i=t&&!ee.previouslyFailed();if(e.webSocketOnly&&(t||j("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ee];else{const s=this.transports_=[];for(const o of pt.ALL_TRANSPORTS)o&&o.isAvailable()&&s.push(o);pt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}pt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc=6e4,Nc=5e3,Pc=10*1024,Dc=100*1024,Rn="t",us="d",xc="s",ds="r",Oc="e",hs="o",fs="a",ps="n",ms="p",Mc="h";class Lc{constructor(e,t,i,s,o,r,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=o,this.onMessage_=r,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Et("c:"+this.id+":"),this.transportManager_=new pt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=rt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Dc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Pc?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Rn in e){const t=e[Rn];t===fs?this.upgradeIfSecondaryHealthy_():t===ds?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===hs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Ze("t",e),i=Ze("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ms,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:fs,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ps,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Ze("t",e),i=Ze("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Ze(Rn,e);if(us in e){const i=e[us];if(t===Mc){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===ps){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===xc?this.onConnectionShutdown_(i):t===ds?this.onReset_(i):t===Oc?Un("Server Error: "+i):t===hs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Un("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),li!==i&&j("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),rt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(kc))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):rt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Nc))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ms,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ie.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let o=0;o<s.length;o++)if(s[o].callback===t&&(!i||i===s[o].context)){s.splice(o,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt extends Do{static getInstance(){return new Gt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Zs()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s=32,gs=768;class k{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function A(){return new k("")}function b(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function ve(n){return n.pieces_.length-n.pieceNum_}function P(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new k(n.pieces_,e)}function xo(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Fc(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Oo(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Mo(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new k(e,0)}function B(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof k)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new k(t,0)}function w(n){return n.pieceNum_>=n.pieces_.length}function G(n,e){const t=b(n),i=b(e);if(t===null)return e;if(t===i)return G(P(n),P(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function di(n,e){if(ve(n)!==ve(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function te(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(ve(n)>ve(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class $c{constructor(e,t){this.errorPrefix_=t,this.parts_=Oo(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=cn(this.parts_[i]);Lo(this)}}function Bc(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=cn(e),Lo(n)}function Vc(n){const e=n.parts_.pop();n.byteLength_-=cn(e),n.parts_.length>0&&(n.byteLength_-=1)}function Lo(n){if(n.byteLength_>gs)throw new Error(n.errorPrefix_+"has a key path longer than "+gs+" bytes ("+n.byteLength_+").");if(n.parts_.length>_s)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+_s+") or object contains a cycle "+Ee(n))}function Ee(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi extends Do{static getInstance(){return new hi}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et=1e3,Wc=300*1e3,ys=30*1e3,Uc=1.3,Hc=3e4,qc="server_kill",vs=3;class ce extends Po{constructor(e,t,i,s,o,r,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=o,this.authTokenProvider_=r,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ce.nextPersistentConnectionId_++,this.log_=Et("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=et,this.maxReconnectDelay_=Wc,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");hi.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Gt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,o={r:s,a:e,b:t};this.log_($(o)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new ln,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:r=>{const a=r.d;r.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),t.promise}listen(e,t,i,s){this.initConnection_();const o=e._queryIdentifier,r=e._path.toString();this.log_("Listen called for "+r+" "+o),this.listens.has(r)||this.listens.set(r,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(r).has(o),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(r).set(o,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const o={p:i},r="q";e.tag&&(o.q=t._queryObject,o.t=e.tag),o.h=e.hashFn(),this.sendRequest(r,o,a=>{const l=a.d,c=a.s;ce.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&he(e,"w")){const i=He(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',o=t._path.toString();j(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Na(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ys)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=ka(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const o=s.s,r=s.d||"error";this.authToken_===e&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,r))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const o={p:e},r="n";s&&(o.q=i,o.t=s),this.sendRequest(r,o)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const o={p:t,d:i};this.log_("onDisconnect "+e,o),this.sendRequest(e,o,r=>{s&&setTimeout(()=>{s(r.s,r.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,o){this.initConnection_();const r={p:t,d:i};o!==void 0&&(r.h=o),this.outstandingPuts_.push({action:e,request:r,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,o=>{this.log_(t+" response",o),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(o.s,o.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const o=i.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+$(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Un("Unrecognized action received from server: "+$(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=et,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=et,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Hc&&(this.reconnectDelay_=et),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Uc)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ce.nextConnectionId_++,o=this.lastSessionId;let r=!1,a=null;const l=function(){a?a.close():(r=!0,i())},c=function(h){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);r?H("getToken() completed but was canceled"):(H("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new Lc(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{j(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(qc)},o))}catch(h){this.log_("Failed to get token: "+h),r||(this.repoInfo_.nodeAdmin&&j(h),l())}}}interrupt(e){H("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){H("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ki(this.interruptReasons_)&&(this.reconnectDelay_=et,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(o=>ai(o)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new k(e).toString();let s;if(this.listens.has(i)){const o=this.listens.get(i);s=o.get(t),o.delete(t),o.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){H("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=vs&&(this.reconnectDelay_=ys,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){H("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=vs&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+lo.replace(/\./g,"-")]=1,Zs()?e["framework.cordova"]=1:Sa()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Gt.getInstance().currentlyOnline();return Ki(this.interruptReasons_)&&e}}ce.nextPersistentConnectionId_=0;ce.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new S(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new S(qe,e),s=new S(qe,t);return this.compare(i,s)!==0}minPost(){return S.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dt;class Fo extends un{static get __EMPTY_NODE(){return Dt}static set __EMPTY_NODE(e){Dt=e}compare(e,t){return Ye(e.name,t.name)}isDefinedOn(e){throw je("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return S.MIN}maxPost(){return new S(Ne,Dt)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new S(e,Dt)}toString(){return".key"}}const We=new Fo;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t,i,s,o=null){this.isReverse_=s,this.resultGenerator_=o,this.nodeStack_=[];let r=1;for(;!e.isEmpty();)if(e=e,r=t?i(e.key,t):1,s&&(r*=-1),r<0)this.isReverse_?e=e.left:e=e.right;else if(r===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class W{constructor(e,t,i,s,o){this.key=e,this.value=t,this.color=i??W.RED,this.left=s??z.EMPTY_NODE,this.right=o??z.EMPTY_NODE}copy(e,t,i,s,o){return new W(e??this.key,t??this.value,i??this.color,s??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const o=i(e,s.key);return o<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):o===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return z.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return z.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,W.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,W.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}W.RED=!0;W.BLACK=!1;class Gc{copy(e,t,i,s,o){return this}insert(e,t,i){return new W(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class z{constructor(e,t=z.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new z(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,W.BLACK,null,null))}remove(e){return new z(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,W.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new xt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new xt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new xt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new xt(this.root_,null,this.comparator_,!0,e)}}z.EMPTY_NODE=new Gc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zc(n,e){return Ye(n.name,e.name)}function fi(n,e){return Ye(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qn;function jc(n){qn=n}const $o=function(n){return typeof n=="number"?"number:"+po(n):"string:"+n},Bo=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&he(e,".sv"),"Priority must be a string or number.")}else f(n===qn||n.isEmpty(),"priority of unexpected type.");f(n===qn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cs;class V{static set __childrenNodeConstructor(e){Cs=e}static get __childrenNodeConstructor(){return Cs}constructor(e,t=V.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Bo(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new V(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:V.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return w(e)?this:b(e)===".priority"?this.priorityNode_:V.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:V.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=b(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||ve(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,V.__childrenNodeConstructor.EMPTY_NODE.updateChild(P(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+$o(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=po(this.value_):e+=this.value_,this.lazyHash_=uo(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===V.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof V.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=V.VALUE_TYPE_ORDER.indexOf(t),o=V.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(o>=0,"Unknown leaf type: "+i),s===o?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}V.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vo,Wo;function Kc(n){Vo=n}function Yc(n){Wo=n}class Qc extends un{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),o=i.compareTo(s);return o===0?Ye(e.name,t.name):o}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return S.MIN}maxPost(){return new S(Ne,new V("[PRIORITY-POST]",Wo))}makePost(e,t){const i=Vo(e);return new S(t,new V("[PRIORITY-POST]",i))}toString(){return".priority"}}const x=new Qc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc=Math.log(2);class Jc{constructor(e){const t=o=>parseInt(Math.log(o)/Xc,10),i=o=>parseInt(Array(o+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const zt=function(n,e,t,i){n.sort(e);const s=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=n[l],d=t?t(h):h,new W(d,h.node,W.BLACK,null,null);{const p=parseInt(u/2,10)+l,y=s(l,p),I=s(p+1,c);return h=n[p],d=t?t(h):h,new W(d,h.node,W.BLACK,y,I)}},o=function(l){let c=null,u=null,h=n.length;const d=function(y,I){const O=h-y,Q=h;h-=y;const X=s(O+1,Q),J=n[O],Z=t?t(J):J;p(new W(Z,J.node,I,null,X))},p=function(y){c?(c.left=y,c=y):(u=y,c=y)};for(let y=0;y<l.count;++y){const I=l.nextBitIsOne(),O=Math.pow(2,l.count-(y+1));I?d(O,W.BLACK):(d(O,W.BLACK),d(O,W.RED))}return u},r=new Jc(n.length),a=o(r);return new z(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let An;const Le={};class le{static get Default(){return f(Le&&x,"ChildrenNode.ts has not been loaded"),An=An||new le({".priority":Le},{".priority":x}),An}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=He(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof z?t:null}hasIndex(e){return he(this.indexSet_,e.toString())}addIndex(e,t){f(e!==We,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const o=t.getIterator(S.Wrap);let r=o.getNext();for(;r;)s=s||e.isDefinedOn(r.node),i.push(r),r=o.getNext();let a;s?a=zt(i,e.getCompare()):a=Le;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new le(u,c)}addToIndexes(e,t){const i=Vt(this.indexes_,(s,o)=>{const r=He(this.indexSet_,o);if(f(r,"Missing index implementation for "+o),s===Le)if(r.isDefinedOn(e.node)){const a=[],l=t.getIterator(S.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),zt(a,r.getCompare())}else return Le;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new S(e.name,a))),l.insert(e,e.node)}});return new le(i,this.indexSet_)}removeFromIndexes(e,t){const i=Vt(this.indexes_,s=>{if(s===Le)return s;{const o=t.get(e.name);return o?s.remove(new S(e.name,o)):s}});return new le(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tt;class C{static get EMPTY_NODE(){return tt||(tt=new C(new z(fi),null,le.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Bo(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||tt}updatePriority(e){return this.children_.isEmpty()?this:new C(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?tt:t}}getChild(e){const t=b(e);return t===null?this:this.getImmediateChild(t).getChild(P(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new S(e,t);let s,o;t.isEmpty()?(s=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),o=this.indexMap_.addToIndexes(i,this.children_));const r=s.isEmpty()?tt:this.priorityNode_;return new C(s,r,o)}}updateChild(e,t){const i=b(e);if(i===null)return t;{f(b(e)!==".priority"||ve(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(P(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,o=!0;if(this.forEachChild(x,(r,a)=>{t[r]=a.val(e),i++,o&&C.INTEGER_REGEXP_.test(r)?s=Math.max(s,Number(r)):o=!1}),!e&&o&&s<2*i){const r=[];for(const a in t)r[a]=t[a];return r}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+$o(this.getPriority().val())+":"),this.forEachChild(x,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":uo(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const o=s.getPredecessorKey(new S(e,t));return o?o.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new S(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new S(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,S.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)<0;)s.getNext(),o=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,S.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)>0;)s.getNext(),o=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===It?-1:0}withIndex(e){if(e===We||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new C(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===We||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(x),s=t.getIterator(x);let o=i.getNext(),r=s.getNext();for(;o&&r;){if(o.name!==r.name||!o.node.equals(r.node))return!1;o=i.getNext(),r=s.getNext()}return o===null&&r===null}else return!1;else return!1}}resolveIndex_(e){return e===We?null:this.indexMap_.get(e.toString())}}C.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Zc extends C{constructor(){super(new z(fi),C.EMPTY_NODE,le.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return C.EMPTY_NODE}isEmpty(){return!1}}const It=new Zc;Object.defineProperties(S,{MIN:{value:new S(qe,C.EMPTY_NODE)},MAX:{value:new S(Ne,It)}});Fo.__EMPTY_NODE=C.EMPTY_NODE;V.__childrenNodeConstructor=C;jc(It);Yc(It);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu=!0;function U(n,e=null){if(n===null)return C.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new V(t,U(e))}if(!(n instanceof Array)&&eu){const t=[];let i=!1;if(K(n,(r,a)=>{if(r.substring(0,1)!=="."){const l=U(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new S(r,l)))}}),t.length===0)return C.EMPTY_NODE;const o=zt(t,zc,r=>r.name,fi);if(i){const r=zt(t,x.getCompare());return new C(o,U(e),new le({".priority":r},{".priority":x}))}else return new C(o,U(e),le.Default)}else{let t=C.EMPTY_NODE;return K(n,(i,s)=>{if(he(n,i)&&i.substring(0,1)!=="."){const o=U(s);(o.isLeafNode()||!o.isEmpty())&&(t=t.updateImmediateChild(i,o))}}),t.updatePriority(U(e))}}Kc(U);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu extends un{constructor(e){super(),this.indexPath_=e,f(!w(e)&&b(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),o=i.compareTo(s);return o===0?Ye(e.name,t.name):o}makePost(e,t){const i=U(e),s=C.EMPTY_NODE.updateChild(this.indexPath_,i);return new S(t,s)}maxPost(){const e=C.EMPTY_NODE.updateChild(this.indexPath_,It);return new S(Ne,e)}toString(){return Oo(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu extends un{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Ye(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return S.MIN}maxPost(){return S.MAX}makePost(e,t){const i=U(e);return new S(t,i)}toString(){return".value"}}const iu=new nu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uo(n){return{type:"value",snapshotNode:n}}function Ge(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function mt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function _t(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function su(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e){this.index_=e}updateChild(e,t,i,s,o,r){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(r!=null&&(i.isEmpty()?e.hasChild(t)?r.trackChildChange(mt(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?r.trackChildChange(Ge(t,i)):r.trackChildChange(_t(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(x,(s,o)=>{t.hasChild(s)||i.trackChildChange(mt(s,o))}),t.isLeafNode()||t.forEachChild(x,(s,o)=>{if(e.hasChild(s)){const r=e.getImmediateChild(s);r.equals(o)||i.trackChildChange(_t(s,o,r))}else i.trackChildChange(Ge(s,o))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?C.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.indexedFilter_=new pi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=gt.getStartPost_(e),this.endPost_=gt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,o,r){return this.matches(new S(t,i))||(i=C.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,o,r)}updateFullNode(e,t,i){t.isLeafNode()&&(t=C.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(C.EMPTY_NODE);const o=this;return t.forEachChild(x,(r,a)=>{o.matches(new S(r,a))||(s=s.updateImmediateChild(r,C.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new gt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,o,r){return this.rangedFilter_.matches(new S(t,i))||(i=C.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,o,r):this.fullLimitUpdateChild_(e,t,i,o,r)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=C.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=C.EMPTY_NODE.withIndex(this.index_);let o;this.reverse_?o=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let r=0;for(;o.hasNext()&&r<this.limit_;){const a=o.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),r++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(C.EMPTY_NODE);let o;this.reverse_?o=s.getReverseIterator(this.index_):o=s.getIterator(this.index_);let r=0;for(;o.hasNext();){const a=o.getNext();r<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?r++:s=s.updateImmediateChild(a.name,C.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,o){let r;if(this.reverse_){const h=this.index_.getCompare();r=(d,p)=>h(p,d)}else r=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new S(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let d=s.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const p=d==null?1:r(d,l);if(u&&!i.isEmpty()&&p>=0)return o!=null&&o.trackChildChange(_t(t,i,h)),a.updateImmediateChild(t,i);{o!=null&&o.trackChildChange(mt(t,h));const I=a.updateImmediateChild(t,C.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(o!=null&&o.trackChildChange(Ge(d.name,d.node)),I.updateImmediateChild(d.name,d.node)):I}}else return i.isEmpty()?e:u&&r(c,l)>=0?(o!=null&&(o.trackChildChange(mt(c.name,c.node)),o.trackChildChange(Ge(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,C.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=x}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:qe}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ne}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===x}copy(){const e=new mi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function ru(n){return n.loadsAllData()?new pi(n.getIndex()):n.hasLimit()?new ou(n):new gt(n)}function bs(n){const e={};if(n.isDefault())return e;let t;if(n.index_===x?t="$priority":n.index_===iu?t="$value":n.index_===We?t="$key":(f(n.index_ instanceof tu,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=$(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=$(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+$(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=$(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+$(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ss(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==x&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends Po{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Et("p:rest:"),this.listens_={}}listen(e,t,i,s){const o=e._path.toString();this.log_("Listen called for "+o+" "+e._queryIdentifier);const r=jt.getListenId_(e,i),a={};this.listens_[r]=a;const l=bs(e._queryParams);this.restRequest_(o+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(o,h,!1,i),He(this.listens_,r)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",s(d,null)}})}unlisten(e,t){const i=jt.getListenId_(e,t);delete this.listens_[i]}get(e){const t=bs(e._queryParams),i=e._path.toString(),s=new ln;return this.restRequest_(i+".json",t,(o,r)=>{let a=r;o===404&&(a=null,o=null),o===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,o])=>{s&&s.accessToken&&(t.auth=s.accessToken),o&&o.token&&(t.ac=o.token);const r=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Pa(t);this.log_("Sending REST request for "+r);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+r+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=dt(a.responseText)}catch{j("Failed to parse JSON response for "+r+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&j("Got unsuccessful REST response for "+r+" Status: "+a.status),i(a.status);i=null}},a.open("GET",r,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(){this.rootNode_=C.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(){return{value:null,children:new Map}}function Ho(n,e,t){if(w(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=b(e);n.children.has(i)||n.children.set(i,Kt());const s=n.children.get(i);e=P(e),Ho(s,e,t)}}function Gn(n,e,t){n.value!==null?t(e,n.value):lu(n,(i,s)=>{const o=new k(e.toString()+"/"+i);Gn(s,o,t)})}function lu(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&K(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ws=10*1e3,uu=30*1e3,du=300*1e3;class hu{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new cu(e);const i=ws+(uu-ws)*Math.random();rt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;K(e,(s,o)=>{o>0&&he(this.statsToReport_,s)&&(t[s]=o,i=!0)}),i&&this.server_.reportStats(t),rt(this.reportStats_.bind(this),Math.floor(Math.random()*2*du))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ne;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ne||(ne={}));function qo(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function _i(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function gi(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=ne.ACK_USER_WRITE,this.source=qo()}operationForChild(e){if(w(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new k(e));return new Yt(A(),t,this.revert)}}else return f(b(this.path)===e,"operationForChild called for unrelated child."),new Yt(P(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t){this.source=e,this.path=t,this.type=ne.LISTEN_COMPLETE}operationForChild(e){return w(this.path)?new yt(this.source,A()):new yt(this.source,P(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=ne.OVERWRITE}operationForChild(e){return w(this.path)?new Pe(this.source,A(),this.snap.getImmediateChild(e)):new Pe(this.source,P(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=ne.MERGE}operationForChild(e){if(w(this.path)){const t=this.children.subtree(new k(e));return t.isEmpty()?null:t.value?new Pe(this.source,A(),t.value):new vt(this.source,A(),t)}else return f(b(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new vt(this.source,P(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(w(e))return this.isFullyInitialized()&&!this.filtered_;const t=b(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function pu(n,e,t,i){const s=[],o=[];return e.forEach(r=>{r.type==="child_changed"&&n.index_.indexedValueChanged(r.oldSnap,r.snapshotNode)&&o.push(su(r.childName,r.snapshotNode))}),nt(n,s,"child_removed",e,i,t),nt(n,s,"child_added",e,i,t),nt(n,s,"child_moved",o,i,t),nt(n,s,"child_changed",e,i,t),nt(n,s,"value",e,i,t),s}function nt(n,e,t,i,s,o){const r=i.filter(a=>a.type===t);r.sort((a,l)=>_u(n,a,l)),r.forEach(a=>{const l=mu(n,a,o);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function mu(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function _u(n,e,t){if(e.childName==null||t.childName==null)throw je("Should only compare child_ events.");const i=new S(e.childName,e.snapshotNode),s=new S(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n,e){return{eventCache:n,serverCache:e}}function at(n,e,t,i){return dn(new Ce(e,t,i),n.serverCache)}function Go(n,e,t,i){return dn(n.eventCache,new Ce(e,t,i))}function Qt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function De(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kn;const gu=()=>(kn||(kn=new z(nc)),kn);class D{static fromObject(e){let t=new D(null);return K(e,(i,s)=>{t=t.set(new k(i),s)}),t}constructor(e,t=gu()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:A(),value:this.value};if(w(e))return null;{const i=b(e),s=this.children.get(i);if(s!==null){const o=s.findRootMostMatchingPathAndValue(P(e),t);return o!=null?{path:B(new k(i),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(w(e))return this;{const t=b(e),i=this.children.get(t);return i!==null?i.subtree(P(e)):new D(null)}}set(e,t){if(w(e))return new D(t,this.children);{const i=b(e),o=(this.children.get(i)||new D(null)).set(P(e),t),r=this.children.insert(i,o);return new D(this.value,r)}}remove(e){if(w(e))return this.children.isEmpty()?new D(null):new D(null,this.children);{const t=b(e),i=this.children.get(t);if(i){const s=i.remove(P(e));let o;return s.isEmpty()?o=this.children.remove(t):o=this.children.insert(t,s),this.value===null&&o.isEmpty()?new D(null):new D(this.value,o)}else return this}}get(e){if(w(e))return this.value;{const t=b(e),i=this.children.get(t);return i?i.get(P(e)):null}}setTree(e,t){if(w(e))return t;{const i=b(e),o=(this.children.get(i)||new D(null)).setTree(P(e),t);let r;return o.isEmpty()?r=this.children.remove(i):r=this.children.insert(i,o),new D(this.value,r)}}fold(e){return this.fold_(A(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,o)=>{i[s]=o.fold_(B(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,A(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(w(e))return null;{const o=b(e),r=this.children.get(o);return r?r.findOnPath_(P(e),B(t,o),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,A(),t)}foreachOnPath_(e,t,i){if(w(e))return this;{this.value&&i(t,this.value);const s=b(e),o=this.children.get(s);return o?o.foreachOnPath_(P(e),B(t,s),i):new D(null)}}foreach(e){this.foreach_(A(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(B(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.writeTree_=e}static empty(){return new ie(new D(null))}}function lt(n,e,t){if(w(e))return new ie(new D(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let o=i.value;const r=G(s,e);return o=o.updateChild(r,t),new ie(n.writeTree_.set(s,o))}else{const s=new D(t),o=n.writeTree_.setTree(e,s);return new ie(o)}}}function Ts(n,e,t){let i=n;return K(t,(s,o)=>{i=lt(i,B(e,s),o)}),i}function Es(n,e){if(w(e))return ie.empty();{const t=n.writeTree_.setTree(e,new D(null));return new ie(t)}}function zn(n,e){return Oe(n,e)!=null}function Oe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(G(t.path,e)):null}function Is(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(x,(i,s)=>{e.push(new S(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new S(i,s.value))}),e}function ge(n,e){if(w(e))return n;{const t=Oe(n,e);return t!=null?new ie(new D(t)):new ie(n.writeTree_.subtree(e))}}function jn(n){return n.writeTree_.isEmpty()}function ze(n,e){return zo(A(),n.writeTree_,e)}function zo(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,o)=>{s===".priority"?(f(o.value!==null,"Priority writes must always be leaf nodes"),i=o.value):t=zo(B(n,s),o,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(B(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(n,e){return Qo(e,n)}function yu(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=lt(n.visibleWrites,e,t)),n.lastWriteId=i}function vu(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Cu(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,o=!1,r=n.allWrites.length-1;for(;s&&r>=0;){const a=n.allWrites[r];a.visible&&(r>=t&&bu(a,i.path)?s=!1:te(i.path,a.path)&&(o=!0)),r--}if(s){if(o)return Su(n),!0;if(i.snap)n.visibleWrites=Es(n.visibleWrites,i.path);else{const a=i.children;K(a,l=>{n.visibleWrites=Es(n.visibleWrites,B(i.path,l))})}return!0}else return!1}function bu(n,e){if(n.snap)return te(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&te(B(n.path,t),e))return!0;return!1}function Su(n){n.visibleWrites=jo(n.allWrites,wu,A()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function wu(n){return n.visible}function jo(n,e,t){let i=ie.empty();for(let s=0;s<n.length;++s){const o=n[s];if(e(o)){const r=o.path;let a;if(o.snap)te(t,r)?(a=G(t,r),i=lt(i,a,o.snap)):te(r,t)&&(a=G(r,t),i=lt(i,A(),o.snap.getChild(a)));else if(o.children){if(te(t,r))a=G(t,r),i=Ts(i,a,o.children);else if(te(r,t))if(a=G(r,t),w(a))i=Ts(i,A(),o.children);else{const l=He(o.children,b(a));if(l){const c=l.getChild(P(a));i=lt(i,A(),c)}}}else throw je("WriteRecord should have .snap or .children")}}return i}function Ko(n,e,t,i,s){if(!i&&!s){const o=Oe(n.visibleWrites,e);if(o!=null)return o;{const r=ge(n.visibleWrites,e);if(jn(r))return t;if(t==null&&!zn(r,A()))return null;{const a=t||C.EMPTY_NODE;return ze(r,a)}}}else{const o=ge(n.visibleWrites,e);if(!s&&jn(o))return t;if(!s&&t==null&&!zn(o,A()))return null;{const r=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(te(c.path,e)||te(e,c.path))},a=jo(n.allWrites,r,e),l=t||C.EMPTY_NODE;return ze(a,l)}}}function Tu(n,e,t){let i=C.EMPTY_NODE;const s=Oe(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(x,(o,r)=>{i=i.updateImmediateChild(o,r)}),i;if(t){const o=ge(n.visibleWrites,e);return t.forEachChild(x,(r,a)=>{const l=ze(ge(o,new k(r)),a);i=i.updateImmediateChild(r,l)}),Is(o).forEach(r=>{i=i.updateImmediateChild(r.name,r.node)}),i}else{const o=ge(n.visibleWrites,e);return Is(o).forEach(r=>{i=i.updateImmediateChild(r.name,r.node)}),i}}function Eu(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const o=B(e,t);if(zn(n.visibleWrites,o))return null;{const r=ge(n.visibleWrites,o);return jn(r)?s.getChild(t):ze(r,s.getChild(t))}}function Iu(n,e,t,i){const s=B(e,t),o=Oe(n.visibleWrites,s);if(o!=null)return o;if(i.isCompleteForChild(t)){const r=ge(n.visibleWrites,s);return ze(r,i.getNode().getImmediateChild(t))}else return null}function Ru(n,e){return Oe(n.visibleWrites,e)}function Au(n,e,t,i,s,o,r){let a;const l=ge(n.visibleWrites,e),c=Oe(l,A());if(c!=null)a=c;else if(t!=null)a=ze(l,t);else return[];if(a=a.withIndex(r),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=r.getCompare(),d=o?a.getReverseIteratorFrom(i,r):a.getIteratorFrom(i,r);let p=d.getNext();for(;p&&u.length<s;)h(p,i)!==0&&u.push(p),p=d.getNext();return u}else return[]}function ku(){return{visibleWrites:ie.empty(),allWrites:[],lastWriteId:-1}}function Xt(n,e,t,i){return Ko(n.writeTree,n.treePath,e,t,i)}function yi(n,e){return Tu(n.writeTree,n.treePath,e)}function Rs(n,e,t,i){return Eu(n.writeTree,n.treePath,e,t,i)}function Jt(n,e){return Ru(n.writeTree,B(n.treePath,e))}function Nu(n,e,t,i,s,o){return Au(n.writeTree,n.treePath,e,t,i,s,o)}function vi(n,e,t){return Iu(n.writeTree,n.treePath,e,t)}function Yo(n,e){return Qo(B(n.treePath,e),n.writeTree)}function Qo(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const o=s.type;if(t==="child_added"&&o==="child_removed")this.changeMap.set(i,_t(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&o==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&o==="child_changed")this.changeMap.set(i,mt(i,s.oldSnap));else if(t==="child_changed"&&o==="child_added")this.changeMap.set(i,Ge(i,e.snapshotNode));else if(t==="child_changed"&&o==="child_changed")this.changeMap.set(i,_t(i,e.snapshotNode,s.oldSnap));else throw je("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Xo=new Du;class Ci{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Ce(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return vi(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:De(this.viewCache_),o=Nu(this.writes_,s,t,1,i,e);return o.length===0?null:o[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xu(n){return{filter:n}}function Ou(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Mu(n,e,t,i,s){const o=new Pu;let r,a;if(t.type===ne.OVERWRITE){const c=t;c.source.fromUser?r=Kn(n,e,c.path,c.snap,i,s,o):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!w(c.path),r=Zt(n,e,c.path,c.snap,i,s,a,o))}else if(t.type===ne.MERGE){const c=t;c.source.fromUser?r=Fu(n,e,c.path,c.children,i,s,o):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),r=Yn(n,e,c.path,c.children,i,s,a,o))}else if(t.type===ne.ACK_USER_WRITE){const c=t;c.revert?r=Vu(n,e,c.path,i,s,o):r=$u(n,e,c.path,c.affectedTree,i,s,o)}else if(t.type===ne.LISTEN_COMPLETE)r=Bu(n,e,t.path,i,o);else throw je("Unknown operation type: "+t.type);const l=o.getChanges();return Lu(e,r,l),{viewCache:r,changes:l}}function Lu(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),o=Qt(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(o)||!i.getNode().getPriority().equals(o.getPriority()))&&t.push(Uo(Qt(e)))}}function Jo(n,e,t,i,s,o){const r=e.eventCache;if(Jt(i,t)!=null)return e;{let a,l;if(w(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=De(e),u=c instanceof C?c:C.EMPTY_NODE,h=yi(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),h,o)}else{const c=Xt(i,De(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,o)}else{const c=b(t);if(c===".priority"){f(ve(t)===1,"Can't have a priority with additional path components");const u=r.getNode();l=e.serverCache.getNode();const h=Rs(i,t,u,l);h!=null?a=n.filter.updatePriority(u,h):a=r.getNode()}else{const u=P(t);let h;if(r.isCompleteForChild(c)){l=e.serverCache.getNode();const d=Rs(i,t,r.getNode(),l);d!=null?h=r.getNode().getImmediateChild(c).updateChild(u,d):h=r.getNode().getImmediateChild(c)}else h=vi(i,c,e.serverCache);h!=null?a=n.filter.updateChild(r.getNode(),c,h,u,s,o):a=r.getNode()}}return at(e,a,r.isFullyInitialized()||w(t),n.filter.filtersNodes())}}function Zt(n,e,t,i,s,o,r,a){const l=e.serverCache;let c;const u=r?n.filter:n.filter.getIndexedFilter();if(w(t))c=u.updateFullNode(l.getNode(),i,null);else if(u.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=u.updateFullNode(l.getNode(),p,null)}else{const p=b(t);if(!l.isCompleteForPath(t)&&ve(t)>1)return e;const y=P(t),O=l.getNode().getImmediateChild(p).updateChild(y,i);p===".priority"?c=u.updatePriority(l.getNode(),O):c=u.updateChild(l.getNode(),p,O,y,Xo,null)}const h=Go(e,c,l.isFullyInitialized()||w(t),u.filtersNodes()),d=new Ci(s,h,o);return Jo(n,h,t,s,d,a)}function Kn(n,e,t,i,s,o,r){const a=e.eventCache;let l,c;const u=new Ci(s,e,o);if(w(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,r),l=at(e,c,!0,n.filter.filtersNodes());else{const h=b(t);if(h===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=at(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=P(t),p=a.getNode().getImmediateChild(h);let y;if(w(d))y=i;else{const I=u.getCompleteChild(h);I!=null?xo(d)===".priority"&&I.getChild(Mo(d)).isEmpty()?y=I:y=I.updateChild(d,i):y=C.EMPTY_NODE}if(p.equals(y))l=e;else{const I=n.filter.updateChild(a.getNode(),h,y,d,u,r);l=at(e,I,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function As(n,e){return n.eventCache.isCompleteForChild(e)}function Fu(n,e,t,i,s,o,r){let a=e;return i.foreach((l,c)=>{const u=B(t,l);As(e,b(u))&&(a=Kn(n,a,u,c,s,o,r))}),i.foreach((l,c)=>{const u=B(t,l);As(e,b(u))||(a=Kn(n,a,u,c,s,o,r))}),a}function ks(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Yn(n,e,t,i,s,o,r,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;w(t)?c=i:c=new D(null).setTree(t,i);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const p=e.serverCache.getNode().getImmediateChild(h),y=ks(n,p,d);l=Zt(n,l,new k(h),y,s,o,r,a)}}),c.children.inorderTraversal((h,d)=>{const p=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!p){const y=e.serverCache.getNode().getImmediateChild(h),I=ks(n,y,d);l=Zt(n,l,new k(h),I,s,o,r,a)}}),l}function $u(n,e,t,i,s,o,r){if(Jt(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(w(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Zt(n,e,t,l.getNode().getChild(t),s,o,a,r);if(w(t)){let c=new D(null);return l.getNode().forEachChild(We,(u,h)=>{c=c.set(new k(u),h)}),Yn(n,e,t,c,s,o,a,r)}else return e}else{let c=new D(null);return i.foreach((u,h)=>{const d=B(t,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),Yn(n,e,t,c,s,o,a,r)}}function Bu(n,e,t,i,s){const o=e.serverCache,r=Go(e,o.getNode(),o.isFullyInitialized()||w(t),o.isFiltered());return Jo(n,r,t,i,Xo,s)}function Vu(n,e,t,i,s,o){let r;if(Jt(i,t)!=null)return e;{const a=new Ci(i,e,s),l=e.eventCache.getNode();let c;if(w(t)||b(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Xt(i,De(e));else{const h=e.serverCache.getNode();f(h instanceof C,"serverChildren would be complete if leaf node"),u=yi(i,h)}u=u,c=n.filter.updateFullNode(l,u,o)}else{const u=b(t);let h=vi(i,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=n.filter.updateChild(l,u,h,P(t),a,o):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,C.EMPTY_NODE,P(t),a,o):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(r=Xt(i,De(e)),r.isLeafNode()&&(c=n.filter.updateFullNode(c,r,o)))}return r=e.serverCache.isFullyInitialized()||Jt(i,A())!=null,at(e,c,r,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new pi(i.getIndex()),o=ru(i);this.processor_=xu(o);const r=t.serverCache,a=t.eventCache,l=s.updateFullNode(C.EMPTY_NODE,r.getNode(),null),c=o.updateFullNode(C.EMPTY_NODE,a.getNode(),null),u=new Ce(l,r.isFullyInitialized(),s.filtersNodes()),h=new Ce(c,a.isFullyInitialized(),o.filtersNodes());this.viewCache_=dn(h,u),this.eventGenerator_=new fu(this.query_)}get query(){return this.query_}}function Uu(n){return n.viewCache_.serverCache.getNode()}function Hu(n){return Qt(n.viewCache_)}function qu(n,e){const t=De(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!w(e)&&!t.getImmediateChild(b(e)).isEmpty())?t.getChild(e):null}function Ns(n){return n.eventRegistrations_.length===0}function Gu(n,e){n.eventRegistrations_.push(e)}function Ps(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(o=>{const r=o.createCancelEvent(t,s);r&&i.push(r)})}if(e){let s=[];for(let o=0;o<n.eventRegistrations_.length;++o){const r=n.eventRegistrations_[o];if(!r.matches(e))s.push(r);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(o+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Ds(n,e,t,i){e.type===ne.MERGE&&e.source.queryId!==null&&(f(De(n.viewCache_),"We should always have a full cache before handling merges"),f(Qt(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,o=Mu(n.processor_,s,e,t,i);return Ou(n.processor_,o.viewCache),f(o.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=o.viewCache,Zo(n,o.changes,o.viewCache.eventCache.getNode(),null)}function zu(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(x,(o,r)=>{i.push(Ge(o,r))}),t.isFullyInitialized()&&i.push(Uo(t.getNode())),Zo(n,i,t.getNode(),e)}function Zo(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return pu(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let en;class er{constructor(){this.views=new Map}}function ju(n){f(!en,"__referenceConstructor has already been defined"),en=n}function Ku(){return f(en,"Reference.ts has not been loaded"),en}function Yu(n){return n.views.size===0}function bi(n,e,t,i){const s=e.source.queryId;if(s!==null){const o=n.views.get(s);return f(o!=null,"SyncTree gave us an op for an invalid query."),Ds(o,e,t,i)}else{let o=[];for(const r of n.views.values())o=o.concat(Ds(r,e,t,i));return o}}function tr(n,e,t,i,s){const o=e._queryIdentifier,r=n.views.get(o);if(!r){let a=Xt(t,s?i:null),l=!1;a?l=!0:i instanceof C?(a=yi(t,i),l=!1):(a=C.EMPTY_NODE,l=!1);const c=dn(new Ce(a,l,!1),new Ce(i,s,!1));return new Wu(e,c)}return r}function Qu(n,e,t,i,s,o){const r=tr(n,e,i,s,o);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,r),Gu(r,t),zu(r,t)}function Xu(n,e,t,i){const s=e._queryIdentifier,o=[];let r=[];const a=be(n);if(s==="default")for(const[l,c]of n.views.entries())r=r.concat(Ps(c,t,i)),Ns(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||o.push(c.query));else{const l=n.views.get(s);l&&(r=r.concat(Ps(l,t,i)),Ns(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||o.push(l.query)))}return a&&!be(n)&&o.push(new(Ku())(e._repo,e._path)),{removed:o,events:r}}function nr(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ye(n,e){let t=null;for(const i of n.views.values())t=t||qu(i,e);return t}function ir(n,e){if(e._queryParams.loadsAllData())return fn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function sr(n,e){return ir(n,e)!=null}function be(n){return fn(n)!=null}function fn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tn;function Ju(n){f(!tn,"__referenceConstructor has already been defined"),tn=n}function Zu(){return f(tn,"Reference.ts has not been loaded"),tn}let ed=1;class xs{constructor(e){this.listenProvider_=e,this.syncPointTree_=new D(null),this.pendingWriteTree_=ku(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function or(n,e,t,i,s){return yu(n.pendingWriteTree_,e,t,i,s),s?At(n,new Pe(qo(),e,t)):[]}function Re(n,e,t=!1){const i=vu(n.pendingWriteTree_,e);if(Cu(n.pendingWriteTree_,e)){let o=new D(null);return i.snap!=null?o=o.set(A(),!0):K(i.children,r=>{o=o.set(new k(r),!0)}),At(n,new Yt(i.path,o,t))}else return[]}function Rt(n,e,t){return At(n,new Pe(_i(),e,t))}function td(n,e,t){const i=D.fromObject(t);return At(n,new vt(_i(),e,i))}function nd(n,e){return At(n,new yt(_i(),e))}function id(n,e,t){const i=wi(n,t);if(i){const s=Ti(i),o=s.path,r=s.queryId,a=G(o,e),l=new yt(gi(r),a);return Ei(n,o,l)}else return[]}function nn(n,e,t,i,s=!1){const o=e._path,r=n.syncPointTree_.get(o);let a=[];if(r&&(e._queryIdentifier==="default"||sr(r,e))){const l=Xu(r,e,t,i);Yu(r)&&(n.syncPointTree_=n.syncPointTree_.remove(o));const c=l.removed;if(a=l.events,!s){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(o,(d,p)=>be(p));if(u&&!h){const d=n.syncPointTree_.subtree(o);if(!d.isEmpty()){const p=rd(d);for(let y=0;y<p.length;++y){const I=p[y],O=I.query,Q=cr(n,I);n.listenProvider_.startListening(ct(O),Ct(n,O),Q.hashFn,Q.onComplete)}}}!h&&c.length>0&&!i&&(u?n.listenProvider_.stopListening(ct(e),null):c.forEach(d=>{const p=n.queryToTagMap.get(pn(d));n.listenProvider_.stopListening(ct(d),p)}))}ad(n,c)}return a}function rr(n,e,t,i){const s=wi(n,i);if(s!=null){const o=Ti(s),r=o.path,a=o.queryId,l=G(r,e),c=new Pe(gi(a),l,t);return Ei(n,r,c)}else return[]}function sd(n,e,t,i){const s=wi(n,i);if(s){const o=Ti(s),r=o.path,a=o.queryId,l=G(r,e),c=D.fromObject(t),u=new vt(gi(a),l,c);return Ei(n,r,u)}else return[]}function Qn(n,e,t,i=!1){const s=e._path;let o=null,r=!1;n.syncPointTree_.foreachOnPath(s,(d,p)=>{const y=G(d,s);o=o||ye(p,y),r=r||be(p)});let a=n.syncPointTree_.get(s);a?(r=r||be(a),o=o||ye(a,A())):(a=new er,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;o!=null?l=!0:(l=!1,o=C.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,y)=>{const I=ye(y,A());I&&(o=o.updateImmediateChild(p,I))}));const c=sr(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=pn(e);f(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const p=ld();n.queryToTagMap.set(d,p),n.tagToQueryMap.set(p,d)}const u=hn(n.pendingWriteTree_,s);let h=Qu(a,e,t,u,o,l);if(!c&&!r&&!i){const d=ir(a,e);h=h.concat(cd(n,e,d))}return h}function Si(n,e,t){const s=n.pendingWriteTree_,o=n.syncPointTree_.findOnPath(e,(r,a)=>{const l=G(r,e),c=ye(a,l);if(c)return c});return Ko(s,e,o,t,!0)}function od(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const h=G(c,t);i=i||ye(u,h)});let s=n.syncPointTree_.get(t);s?i=i||ye(s,A()):(s=new er,n.syncPointTree_=n.syncPointTree_.set(t,s));const o=i!=null,r=o?new Ce(i,!0,!1):null,a=hn(n.pendingWriteTree_,e._path),l=tr(s,e,a,o?r.getNode():C.EMPTY_NODE,o);return Hu(l)}function At(n,e){return ar(e,n.syncPointTree_,null,hn(n.pendingWriteTree_,A()))}function ar(n,e,t,i){if(w(n.path))return lr(n,e,t,i);{const s=e.get(A());t==null&&s!=null&&(t=ye(s,A()));let o=[];const r=b(n.path),a=n.operationForChild(r),l=e.children.get(r);if(l&&a){const c=t?t.getImmediateChild(r):null,u=Yo(i,r);o=o.concat(ar(a,l,c,u))}return s&&(o=o.concat(bi(s,n,i,t))),o}}function lr(n,e,t,i){const s=e.get(A());t==null&&s!=null&&(t=ye(s,A()));let o=[];return e.children.inorderTraversal((r,a)=>{const l=t?t.getImmediateChild(r):null,c=Yo(i,r),u=n.operationForChild(r);u&&(o=o.concat(lr(u,a,l,c)))}),s&&(o=o.concat(bi(s,n,i,t))),o}function cr(n,e){const t=e.query,i=Ct(n,t);return{hashFn:()=>(Uu(e)||C.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?id(n,t._path,i):nd(n,t._path);{const o=oc(s,t);return nn(n,t,null,o)}}}}function Ct(n,e){const t=pn(e);return n.queryToTagMap.get(t)}function pn(n){return n._path.toString()+"$"+n._queryIdentifier}function wi(n,e){return n.tagToQueryMap.get(e)}function Ti(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new k(n.substr(0,e))}}function Ei(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=hn(n.pendingWriteTree_,e);return bi(i,t,s,null)}function rd(n){return n.fold((e,t,i)=>{if(t&&be(t))return[fn(t)];{let s=[];return t&&(s=nr(t)),K(i,(o,r)=>{s=s.concat(r)}),s}})}function ct(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Zu())(n._repo,n._path):n}function ad(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=pn(i),o=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(o)}}}function ld(){return ed++}function cd(n,e,t){const i=e._path,s=Ct(n,e),o=cr(n,t),r=n.listenProvider_.startListening(ct(e),s,o.hashFn,o.onComplete),a=n.syncPointTree_.subtree(i);if(s)f(!be(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!w(c)&&u&&be(u))return[fn(u).query];{let d=[];return u&&(d=d.concat(nr(u).map(p=>p.query))),K(h,(p,y)=>{d=d.concat(y)}),d}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening(ct(u),Ct(n,u))}}return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ii(t)}node(){return this.node_}}class Ri{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=B(this.path_,e);return new Ri(this.syncTree_,t)}node(){return Si(this.syncTree_,this.path_)}}const ud=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Os=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return dd(n[".sv"],e,t);if(typeof n[".sv"]=="object")return hd(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},dd=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},hd=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const r=s.getValue();return typeof r!="number"?i:r+i},fd=function(n,e,t,i){return Ai(e,new Ri(t,n),i)},ur=function(n,e,t){return Ai(n,new Ii(e),t)};function Ai(n,e,t){const i=n.getPriority().val(),s=Os(i,e.getImmediateChild(".priority"),t);let o;if(n.isLeafNode()){const r=n,a=Os(r.getValue(),e,t);return a!==r.getValue()||s!==r.getPriority().val()?new V(a,U(s)):n}else{const r=n;return o=r,s!==r.getPriority().val()&&(o=o.updatePriority(new V(s))),r.forEachChild(x,(a,l)=>{const c=Ai(l,e.getImmediateChild(a),t);c!==l&&(o=o.updateImmediateChild(a,c))}),o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Ni(n,e){let t=e instanceof k?e:new k(e),i=n,s=b(t);for(;s!==null;){const o=He(i.node.children,s)||{children:{},childCount:0};i=new ki(s,i,o),t=P(t),s=b(t)}return i}function Xe(n){return n.node.value}function dr(n,e){n.node.value=e,Xn(n)}function hr(n){return n.node.childCount>0}function pd(n){return Xe(n)===void 0&&!hr(n)}function mn(n,e){K(n.node.children,(t,i)=>{e(new ki(t,n,i))})}function fr(n,e,t,i){t&&e(n),mn(n,s=>{fr(s,e,!0)})}function md(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function kt(n){return new k(n.parent===null?n.name:kt(n.parent)+"/"+n.name)}function Xn(n){n.parent!==null&&_d(n.parent,n.name,n)}function _d(n,e,t){const i=pd(t),s=he(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Xn(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Xn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd=/[\[\].#$\/\u0000-\u001F\u007F]/,yd=/[\[\].#$\u0000-\u001F\u007F]/,Nn=10*1024*1024,pr=function(n){return typeof n=="string"&&n.length!==0&&!gd.test(n)},mr=function(n){return typeof n=="string"&&n.length!==0&&!yd.test(n)},vd=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),mr(n)},Cd=function(n,e,t,i){Pi(oi(n,"value"),e,t)},Pi=function(n,e,t){const i=t instanceof k?new $c(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ee(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ee(i)+" with contents = "+e.toString());if(ho(e))throw new Error(n+"contains "+e.toString()+" "+Ee(i));if(typeof e=="string"&&e.length>Nn/3&&cn(e)>Nn)throw new Error(n+"contains a string greater than "+Nn+" utf8 bytes "+Ee(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,o=!1;if(K(e,(r,a)=>{if(r===".value")s=!0;else if(r!==".priority"&&r!==".sv"&&(o=!0,!pr(r)))throw new Error(n+" contains an invalid key ("+r+") "+Ee(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Bc(i,r),Pi(n,a,i),Vc(i)}),s&&o)throw new Error(n+' contains ".value" child '+Ee(i)+" in addition to actual children.")}},_r=function(n,e,t,i){if(!mr(t))throw new Error(oi(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},bd=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),_r(n,e,t)},gr=function(n,e){if(b(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Sd=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!pr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!vd(t))throw new Error(oi(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Di(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],o=s.getPath();t!==null&&!di(o,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:o}),t.events.push(s)}t&&n.eventLists_.push(t)}function yr(n,e,t){Di(n,t),vr(n,i=>di(i,e))}function ae(n,e,t){Di(n,t),vr(n,i=>te(i,e)||te(e,i))}function vr(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const o=s.path;e(o)?(Td(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Td(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();ot&&H("event: "+t.toString()),Qe(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ed="repo_interrupt",Id=25;class Rd{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new wd,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Kt(),this.transactionQueueTree_=new ki,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Ad(n,e,t){if(n.stats_=ci(n.repoInfo_),n.forceRestClient_||cc())n.server_=new jt(n.repoInfo_,(i,s,o,r)=>{Ms(n,i,s,o,r)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ls(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{$(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new ce(n.repoInfo_,e,(i,s,o,r)=>{Ms(n,i,s,o,r)},i=>{Ls(n,i)},i=>{Nd(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=pc(n.repoInfo_,()=>new hu(n.stats_,n.server_)),n.infoData_=new au,n.infoSyncTree_=new xs({startListening:(i,s,o,r)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=Rt(n.infoSyncTree_,i._path,l),setTimeout(()=>{r("ok")},0)),a},stopListening:()=>{}}),Oi(n,"connected",!1),n.serverSyncTree_=new xs({startListening:(i,s,o,r)=>(n.server_.listen(i,o,s,(a,l)=>{const c=r(a,l);ae(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function kd(n){const t=n.infoData_.getNode(new k(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function xi(n){return ud({timestamp:kd(n)})}function Ms(n,e,t,i,s){n.dataUpdateCount++;const o=new k(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let r=[];if(s)if(i){const l=Vt(t,c=>U(c));r=sd(n.serverSyncTree_,o,l,s)}else{const l=U(t);r=rr(n.serverSyncTree_,o,l,s)}else if(i){const l=Vt(t,c=>U(c));r=td(n.serverSyncTree_,o,l)}else{const l=U(t);r=Rt(n.serverSyncTree_,o,l)}let a=o;r.length>0&&(a=gn(n,o)),ae(n.eventQueue_,a,r)}function Ls(n,e){Oi(n,"connected",e),e===!1&&xd(n)}function Nd(n,e){K(e,(t,i)=>{Oi(n,t,i)})}function Oi(n,e,t){const i=new k("/.info/"+e),s=U(t);n.infoData_.updateSnapshot(i,s);const o=Rt(n.infoSyncTree_,i,s);ae(n.eventQueue_,i,o)}function Cr(n){return n.nextWriteId_++}function Pd(n,e,t){const i=od(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const o=U(s).withIndex(e._queryParams.getIndex());Qn(n.serverSyncTree_,e,t,!0);let r;if(e._queryParams.loadsAllData())r=Rt(n.serverSyncTree_,e._path,o);else{const a=Ct(n.serverSyncTree_,e);r=rr(n.serverSyncTree_,e._path,o,a)}return ae(n.eventQueue_,e._path,r),nn(n.serverSyncTree_,e,t,null,!0),o},s=>(_n(n,"get for query "+$(e)+" failed: "+s),Promise.reject(new Error(s))))}function Dd(n,e,t,i,s){_n(n,"set",{path:e.toString(),value:t,priority:i});const o=xi(n),r=U(t,i),a=Si(n.serverSyncTree_,e),l=ur(r,a,o),c=Cr(n),u=or(n.serverSyncTree_,e,l,c,!0);Di(n.eventQueue_,u),n.server_.put(e.toString(),r.val(!0),(d,p)=>{const y=d==="ok";y||j("set at "+e+" failed: "+d);const I=Re(n.serverSyncTree_,c,!y);ae(n.eventQueue_,e,I),Ld(n,s,d,p)});const h=Er(n,e);gn(n,h),ae(n.eventQueue_,h,[])}function xd(n){_n(n,"onDisconnectEvents");const e=xi(n),t=Kt();Gn(n.onDisconnect_,A(),(s,o)=>{const r=fd(s,o,n.serverSyncTree_,e);Ho(t,s,r)});let i=[];Gn(t,A(),(s,o)=>{i=i.concat(Rt(n.serverSyncTree_,s,o));const r=Er(n,s);gn(n,r)}),n.onDisconnect_=Kt(),ae(n.eventQueue_,A(),i)}function Od(n,e,t){let i;b(e._path)===".info"?i=Qn(n.infoSyncTree_,e,t):i=Qn(n.serverSyncTree_,e,t),yr(n.eventQueue_,e._path,i)}function Fs(n,e,t){let i;b(e._path)===".info"?i=nn(n.infoSyncTree_,e,t):i=nn(n.serverSyncTree_,e,t),yr(n.eventQueue_,e._path,i)}function Md(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Ed)}function _n(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),H(t,...e)}function Ld(n,e,t,i){e&&Qe(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let o=s;i&&(o+=": "+i);const r=new Error(o);r.code=s,e(r)}})}function br(n,e,t){return Si(n.serverSyncTree_,e,t)||C.EMPTY_NODE}function Mi(n,e=n.transactionQueueTree_){if(e||yn(n,e),Xe(e)){const t=wr(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Fd(n,kt(e),t)}else hr(e)&&mn(e,t=>{Mi(n,t)})}function Fd(n,e,t){const i=t.map(c=>c.currentWriteId),s=br(n,e,i);let o=s;const r=s.hash();for(let c=0;c<t.length;c++){const u=t[c];f(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=G(e,u.path);o=o.updateChild(h,u.currentOutputSnapshotRaw)}const a=o.val(!0),l=e;n.server_.put(l.toString(),a,c=>{_n(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,u=u.concat(Re(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();yn(n,Ni(n.transactionQueueTree_,e)),Mi(n,n.transactionQueueTree_),ae(n.eventQueue_,e,u);for(let d=0;d<h.length;d++)Qe(h[d])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{j("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}gn(n,e)}},r)}function gn(n,e){const t=Sr(n,e),i=kt(t),s=wr(n,t);return $d(n,s,i),i}function $d(n,e,t){if(e.length===0)return;const i=[];let s=[];const r=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=G(t,l.path);let u=!1,h;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,s=s.concat(Re(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Id)u=!0,h="maxretry",s=s.concat(Re(n.serverSyncTree_,l.currentWriteId,!0));else{const d=br(n,l.path,r);l.currentInputSnapshot=d;const p=e[a].update(d.val());if(p!==void 0){Pi("transaction failed: Data returned ",p,l.path);let y=U(p);typeof p=="object"&&p!=null&&he(p,".priority")||(y=y.updatePriority(d.getPriority()));const O=l.currentWriteId,Q=xi(n),X=ur(y,d,Q);l.currentOutputSnapshotRaw=y,l.currentOutputSnapshotResolved=X,l.currentWriteId=Cr(n),r.splice(r.indexOf(O),1),s=s.concat(or(n.serverSyncTree_,l.path,X,l.currentWriteId,l.applyLocally)),s=s.concat(Re(n.serverSyncTree_,O,!0))}else u=!0,h="nodata",s=s.concat(Re(n.serverSyncTree_,l.currentWriteId,!0))}ae(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(d){setTimeout(d,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}yn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Qe(i[a]);Mi(n,n.transactionQueueTree_)}function Sr(n,e){let t,i=n.transactionQueueTree_;for(t=b(e);t!==null&&Xe(i)===void 0;)i=Ni(i,t),e=P(e),t=b(e);return i}function wr(n,e){const t=[];return Tr(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Tr(n,e,t){const i=Xe(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);mn(e,s=>{Tr(n,s,t)})}function yn(n,e){const t=Xe(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,dr(e,t.length>0?t:void 0)}mn(e,i=>{yn(n,i)})}function Er(n,e){const t=kt(Sr(n,e)),i=Ni(n.transactionQueueTree_,e);return md(i,s=>{Pn(n,s)}),Pn(n,i),fr(i,s=>{Pn(n,s)}),t}function Pn(n,e){const t=Xe(e);if(t){const i=[];let s=[],o=-1;for(let r=0;r<t.length;r++)t[r].status===3||(t[r].status===1?(f(o===r-1,"All SENT items should be at beginning of queue."),o=r,t[r].status=3,t[r].abortReason="set"):(f(t[r].status===0,"Unexpected transaction status in abort"),t[r].unwatcher(),s=s.concat(Re(n.serverSyncTree_,t[r].currentWriteId,!0)),t[r].onComplete&&i.push(t[r].onComplete.bind(null,new Error("set"),!1,null))));o===-1?dr(e,void 0):t.length=o+1,ae(n.eventQueue_,kt(e),s);for(let r=0;r<i.length;r++)Qe(i[r])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bd(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Vd(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):j(`Invalid query segment '${t}' in query '${n}'`)}return e}const $s=function(n,e){const t=Wd(n),i=t.namespace;t.domain==="firebase.com"&&de(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&de("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||ec();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new To(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new k(t.pathString)}},Wd=function(n){let e="",t="",i="",s="",o="",r=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(u,h)),u<h&&(s=Bd(n.substring(u,h)));const d=Vd(n.substring(Math.min(n.length,h)));c=e.indexOf(":"),c>=0?(r=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const y=e.indexOf(".");i=e.substring(0,y).toLowerCase(),t=e.substring(y+1),o=i}"ns"in d&&(o=d.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:r,scheme:a,pathString:s,namespace:o}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+$(this.snapshot.exportVal())}}class Hd{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return w(this._path)?null:xo(this._path)}get ref(){return new fe(this._repo,this._path)}get _queryIdentifier(){const e=Ss(this._queryParams),t=ai(e);return t==="{}"?"default":t}get _queryObject(){return Ss(this._queryParams)}isEqual(e){if(e=Ke(e),!(e instanceof Li))return!1;const t=this._repo===e._repo,i=di(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Fc(this._path)}}class fe extends Li{constructor(e,t){super(e,t,new mi,!1)}get parent(){const e=Mo(this._path);return e===null?null:new fe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class bt{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new k(e),i=Jn(this.ref,e);return new bt(this._node.getChild(t),i,x)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new bt(s,Jn(this.ref,i),x)))}hasChild(e){const t=new k(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function re(n,e){return n=Ke(n),n._checkNotDeleted("ref"),e!==void 0?Jn(n._root,e):n._root}function Jn(n,e){return n=Ke(n),b(n._path)===null?bd("child","path",e):_r("child","path",e),new fe(n._repo,B(n._path,e))}function qd(n){return gr("remove",n._path),Ae(n,null)}function Ae(n,e){n=Ke(n),gr("set",n._path),Cd("set",e,n._path);const t=new ln;return Dd(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Gd(n){n=Ke(n);const e=new Ir(()=>{}),t=new vn(e);return Pd(n._repo,n,t).then(i=>new bt(i,new fe(n._repo,n._path),n._queryParams.getIndex()))}class vn{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Ud("value",this,new bt(e.snapshotNode,new fe(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Hd(this,e,t):null}matches(e){return e instanceof vn?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function zd(n,e,t,i,s){let o;if(typeof i=="object"&&(o=void 0,s=i),typeof i=="function"&&(o=i),s&&s.onlyOnce){const l=t,c=(u,h)=>{Fs(n._repo,n,a),l(u,h)};c.userCallback=t.userCallback,c.context=t.context,t=c}const r=new Ir(t,o||void 0),a=new vn(r);return Od(n._repo,n,a),()=>Fs(n._repo,n,a)}function Rr(n,e,t,i){return zd(n,"value",e,t,i)}ju(fe);Ju(fe);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd="FIREBASE_DATABASE_EMULATOR_HOST",Zn={};let Kd=!1;function Yd(n,e,t,i){const s=e.lastIndexOf(":"),o=e.substring(0,s),r=si(o);n.repoInfo_=new To(e,r,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function Qd(n,e,t,i,s){let o=i||n.options.databaseURL;o===void 0&&(n.options.projectId||de("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),H("Using default host for project ",n.options.projectId),o=`${n.options.projectId}-default-rtdb.firebaseio.com`);let r=$s(o,s),a=r.repoInfo,l;typeof process<"u"&&ss&&(l=ss[jd]),l?(o=`http://${l}?ns=${a.namespace}`,r=$s(o,s),a=r.repoInfo):r.repoInfo.secure;const c=new dc(n.name,n.options,e);Sd("Invalid Firebase Database URL",r),w(r.path)||de("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Jd(a,n,c,new uc(n,t));return new Zd(u,n)}function Xd(n,e){const t=Zn[e];(!t||t[n.key]!==n)&&de(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Md(n),delete t[n.key]}function Jd(n,e,t,i){let s=Zn[e.name];s||(s={},Zn[e.name]=s);let o=s[n.toURLString()];return o&&de("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new Rd(n,Kd,t,i),s[n.toURLString()]=o,o}class Zd{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Ad(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new fe(this._repo,A())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Xd(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&de("Cannot call "+e+" on a deleted database.")}}function eh(n=Ml(),e){const t=Nl(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=ma("database");i&&th(t,...i)}return t}function th(n,e,t,i={}){n=Ke(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,o=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Wt(i,o.repoInfo_.emulatorOptions))return;de("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let r;if(o.repoInfo_.nodeAdmin)i.mockUserToken&&de('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Lt(Lt.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:ga(i.mockUserToken,n.app.options.projectId);r=new Lt(a)}si(e)&&(_a(e),Ca("Database",!0)),Yd(o,s,i,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nh(n){Kl(Ol),Ht(new ht("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return Qd(i,s,o,t)},"PUBLIC").setMultipleInstances(!0)),Be(os,rs,n),Be(os,rs,"esm2017")}ce.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ce.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};nh();const Y={switchRoot:"SWITCH_CONTROL",motorRoot:"MOTOR_CONTROL",alarmRoot:"ALARM_CONTROLS",layoutRoot:"HOME_CONSOLE_LAYOUT",switchCount:40,motorCount:10,alarmCount:10,switchPrefix:"SW",motorPrefix:"M",alarmPrefix:"alarm",onTimingSuffix:"-ON_TIMING",offTimingSuffix:"-OFF_TIMING",pushSuffix:"-PUSH"};function Dn(n,e){return Array.from({length:e},(t,i)=>`${n}${i+1}`)}function Bs(n,e,t,i){const s=[];for(let o=1;o<=e;o++)s.push(`${n}${o}${t}`,`${n}${o}${i}`);return s}function Vs(n,e,t){return Array.from({length:e},(i,s)=>`${n}${s+1}${t}`)}function Ar(n){const e={...Y,...n},t=Math.max(1,parseInt(e.switchCount,10)||40),i=Math.max(1,parseInt(e.motorCount,10)||10),s=Math.max(1,parseInt(e.alarmCount,10)||10);return{switches:{root:e.switchRoot,toggles:Dn(e.switchPrefix,t),timings:Bs(e.switchPrefix,t,e.onTimingSuffix,e.offTimingSuffix)},motors:{root:e.motorRoot,toggles:Dn(e.motorPrefix,i),timings:Bs(e.motorPrefix,i,e.onTimingSuffix,e.offTimingSuffix),pushes:Vs(e.motorPrefix,i,e.pushSuffix)},alarms:{root:e.alarmRoot,toggles:Dn(e.alarmPrefix,s),pushes:Vs(e.alarmPrefix,s,e.pushSuffix)},meta:{switchCount:t,motorCount:i,alarmCount:s,switchPrefix:e.switchPrefix,motorPrefix:e.motorPrefix,alarmPrefix:e.alarmPrefix,onTimingSuffix:e.onTimingSuffix,offTimingSuffix:e.offTimingSuffix,pushSuffix:e.pushSuffix}}}let Nt=Ar(Y);function Fi(n){Nt=Ar(n)}function se(){return Nt}function ih(){return Nt.meta}function q(n,e){return`${n}/${e}`}function sh(){const n=[],e=Nt;for(const t of e.switches.toggles)n.push(q(e.switches.root,t));for(const t of e.motors.toggles)n.push(q(e.motors.root,t));for(const t of e.alarms.toggles)n.push(q(e.alarms.root,t));return n}function Ws(){const n=Nt;return[n.switches.root,n.motors.root,n.alarms.root]}const it={apiKey:"BA-uvbNTaghDMHFyuXkufGFvxrUVK_w_mJaneN0SzJsVWo3uW7",authDomain:"home-automation-009.firebaseapp.com",databaseURL:"https://home-automation-009-default-rtdb.firebaseio.com",projectId:"home-automation-009",storageBucket:"home-automation-009.firebasestorage.app",messagingSenderId:"",appId:"L6K7qAS8Lc2bAS5nwMuhw3oCiVlTTxoS7jf6w"},$i="lumina-dev-config";function Cn(){try{const n=localStorage.getItem($i);return n?JSON.parse(n):null}catch{return null}}function oh(){const n=Cn(),e={...Y,...(n==null?void 0:n.paths)||{}};return Fi(e),{paths:e,firebase:Bi()}}function Bi(){const n=Cn(),e=(n==null?void 0:n.firebase)||{};return{...it,...e,apiKey:e.apiKey||it.apiKey,databaseURL:e.databaseURL||it.databaseURL,appId:e.appId||it.appId}}function kr(){var e;const n=Cn();return((e=n==null?void 0:n.paths)==null?void 0:e.layoutRoot)||Y.layoutRoot}function Vi(){const n=Cn();return{firebase:{apiKey:"",authDomain:"",databaseURL:"",projectId:"",storageBucket:"",messagingSenderId:"",appId:"",...it,...(n==null?void 0:n.firebase)||{}},paths:{...Y,...(n==null?void 0:n.paths)||{}},useFileFirebase:!(n!=null&&n.firebase)||Object.keys(n.firebase).length===0}}function Nr({firebase:n,paths:e}){const t={version:1,updatedAt:Date.now(),firebase:{apiKey:String(n.apiKey||"").trim(),authDomain:String(n.authDomain||"").trim(),databaseURL:String(n.databaseURL||"").trim(),projectId:String(n.projectId||"").trim(),storageBucket:String(n.storageBucket||"").trim(),messagingSenderId:String(n.messagingSenderId||"").trim(),appId:String(n.appId||"").trim()},paths:{switchRoot:String(e.switchRoot||Y.switchRoot).trim(),motorRoot:String(e.motorRoot||Y.motorRoot).trim(),alarmRoot:String(e.alarmRoot||Y.alarmRoot).trim(),layoutRoot:String(e.layoutRoot||Y.layoutRoot).trim(),switchCount:xn(e.switchCount,1,64,Y.switchCount),motorCount:xn(e.motorCount,1,32,Y.motorCount),alarmCount:xn(e.alarmCount,1,32,Y.alarmCount),switchPrefix:String(e.switchPrefix||"SW").trim(),motorPrefix:String(e.motorPrefix||"M").trim(),alarmPrefix:String(e.alarmPrefix||"alarm").trim(),onTimingSuffix:String(e.onTimingSuffix||"-ON_TIMING").trim(),offTimingSuffix:String(e.offTimingSuffix||"-OFF_TIMING").trim(),pushSuffix:String(e.pushSuffix||"-PUSH").trim()}};return localStorage.setItem($i,JSON.stringify(t)),Fi(t.paths),t}function Pr(){localStorage.removeItem($i),Fi(Y)}function xn(n,e,t,i){const s=parseInt(n,10);return Number.isNaN(s)?i:Math.min(t,Math.max(e,s))}function Dr(){const n=Bi();return(n==null?void 0:n.apiKey)&&!String(n.apiKey).includes("YOUR_")&&(n==null?void 0:n.appId)&&!String(n.appId).includes("YOUR_")&&(n==null?void 0:n.databaseURL)}function rh(){const n=ih();return`${n.switchCount} switches · ${n.motorCount} motors · ${n.alarmCount} alarms`}function ke(n,e,t,i){return{key:e,root:n,kind:t,defaultLabel:i??xr(e,t)}}function Ot(n,e){if(!n.startsWith(e))return null;const t=n.slice(e.length).match(/^(\d+)/);return t?t[1]:null}function xr(n,e){const{meta:t}=se();if(e==="switch"||n.startsWith(t.switchPrefix)){const i=Ot(n,t.switchPrefix);return i?`Switch ${i}`:n}if(e==="motor"||n.startsWith(t.motorPrefix)){const i=Ot(n,t.motorPrefix);return i?`Motor ${i}`:n}if(e==="alarm"||n.startsWith(t.alarmPrefix)||n.startsWith("ALRM")){let i=Ot(n,t.alarmPrefix);return!i&&n.startsWith("ALRM")&&(i=Ot(n,"ALRM")),i?`Alarm ${i}`:n}return n}function Or(n,e,t){return n.endsWith(e)?"timing-on":n.endsWith(t)?"timing-off":null}function ah(){const{switches:n,meta:e}=se(),{root:t,toggles:i,timings:s}=n;return[...i.map(o=>ke(t,o,"switch")),...s.map(o=>{const r=Or(o,e.onTimingSuffix,e.offTimingSuffix);return r?ke(t,o,r,o):null}).filter(Boolean)]}function lh(){const{motors:n,meta:e}=se(),{root:t,toggles:i,timings:s,pushes:o}=n;return[...i.map(r=>ke(t,r,"motor")),...o.map(r=>ke(t,r,"motor-push",r)),...s.map(r=>{const a=Or(r,e.onTimingSuffix,e.offTimingSuffix);return a?ke(t,r,a,r):null}).filter(Boolean)]}function ch(){const{alarms:n}=se(),{root:e,toggles:t,pushes:i}=n;return[...t.map(s=>ke(e,s,"alarm")),...i.map(s=>ke(e,s,"alarm-push",s))]}let ei=null;function Wi(){ei={switch:ah(),motor:lh(),alarm:ch()}}function Mr(){return ei||Wi(),ei}function Ue(n){const e=Mr();return n==="switch"?e.switch:n==="motor"?e.motor:e.alarm}function Lr(n){return n==="switch"?Ue("switch").filter(e=>e.kind==="switch"):n==="motor"?Ue("motor").filter(e=>e.kind==="motor"):Ue("alarm").filter(e=>e.kind==="alarm")}function Fr(n){const{onTimingSuffix:e,offTimingSuffix:t}=se().meta;return{on:`${n}${e}`,off:`${n}${t}`}}function $r(n){return n==="switch"||n==="motor"}function Ui(n){const e=Mr();return e.switch.find(t=>t.key===n)||e.motor.find(t=>t.key===n)||e.alarm.find(t=>t.key===n)}function uh(n){return n==="timing-on"||n==="timing-off"}function St(n){return`${n}${se().meta.pushSuffix}`}const Br="lumina-room-layout-v4",Hi=25,sn=1+Hi;let Ft=null;function dh(n){Ft=n}function Vr(){return`id-${Date.now()}-${Math.random().toString(36).slice(2,8)}`}function on(){return{switchRooms:[{id:"switch-main",name:"Switches",devices:[]}],motorRooms:[{id:"motor-main",name:"Motors",devices:[]}],alarmRooms:[{id:"alarm-security",name:"Security",devices:[]}]}}function hh(n,e,t){const i=xr(e,t),s=String(n||"").trim();if(!s||s===e||s.toLowerCase()===e.toLowerCase())return i;const o=s.toLowerCase(),r=i.toLowerCase();return o===r||o===`${t} ${r}`||o===`${t} ${e.toLowerCase()}`||t==="alarm"&&/^alarm\s+/i.test(s)&&o.includes(e.toLowerCase())||t==="switch"&&/^switch\s+/i.test(s)&&o.includes(e.toLowerCase())||t==="motor"&&/^motor\s+/i.test(s)&&o.includes(e.toLowerCase())?i:s}function fh(n){return!n||typeof n!="object"?null:{id:n.id||Vr(),name:String(n.name||"Room"),devices:Array.isArray(n.devices)?n.devices.filter(e=>e&&e.firebaseKey&&!ph(e.firebaseKey)).map(e=>{const t=e.kind||mh(e.firebaseKey);return{firebaseKey:e.firebaseKey,label:hh(e.label,e.firebaseKey,t),kind:t,controlMode:Wr(e.controlMode,t)}}):[]}}function ph(n){const{meta:e}=se();return n.endsWith(e.onTimingSuffix)||n.endsWith(e.offTimingSuffix)||n.endsWith(e.pushSuffix)}function mh(n){const{meta:e}=se();return n.endsWith(e.onTimingSuffix)?"timing-on":n.endsWith(e.offTimingSuffix)?"timing-off":n.startsWith(e.switchPrefix)?"switch":n.startsWith(e.motorPrefix)?n.endsWith(e.pushSuffix)?"motor-push":"motor":n.startsWith(e.alarmPrefix)||n.startsWith("ALRM")?n.endsWith(e.pushSuffix)?"alarm-push":"alarm":"switch"}function Wr(n,e){return e==="switch"?"toggle":n==="push"||n==="toggle"?n:e==="motor"||e==="alarm"?"push":"toggle"}function Ur(n){return(n==null?void 0:n.controlMode)==="push"}function Hr(n){return n==="motor"||n==="alarm"}function qr(n){const e=on();if(!n||typeof n!="object")return e;const t=(i,s)=>Array.isArray(i)?i.map(fh).filter(Boolean):s;return{switchRooms:t(n.switchRooms,e.switchRooms),motorRooms:t(n.motorRooms,e.motorRooms),alarmRooms:t(n.alarmRooms,e.alarmRooms)}}function _h(){try{const n=localStorage.getItem(Br);return n?qr(JSON.parse(n)):on()}catch{return on()}}function gh(n){try{localStorage.setItem(Br,JSON.stringify(n))}catch{}}function we(n){gh(n),Ft==null||Ft(n)}function Je(n,e){return e==="switch"?n.switchRooms:e==="motor"?n.motorRooms:n.alarmRooms}function Gr(n,e){return Je(n,e).length}function $t(n,e){return Gr(n,e)<sn}function Se(n,e,t){return Je(n,e).find(i=>i.id===t)}function yh(n,e,t){const i=Je(n,e);if(i.length>=sn)return{room:null,error:`Limit reached: max ${Hi} additional rooms (${sn} total per type).`};const s={id:Vr(),name:t.trim()||"New Room",devices:[]};return i.push(s),we(n),{room:s,error:null}}function vh(n,e,t){const i=Je(n,e);if(i.length<=1)return{error:"Keep at least one room in this category."};const s=i.findIndex(o=>o.id===t);return s>=0&&i.splice(s,1),we(n),{error:null}}function Ch(n,e,t,i){const s=Se(n,e,t);s&&(s.name=i.trim()||s.name),we(n)}function bh(n,e,t,i,s){const o=Se(n,e,t),r=o==null?void 0:o.devices.find(a=>a.firebaseKey===i);r&&(r.label=s.trim()||r.label),we(n)}function Sh(n,e,t,i,s="toggle"){const o=Se(n,e,t),r=Lr(e).find(a=>a.key===i);return!o||!r||o.devices.some(a=>a.firebaseKey===i)?!1:(o.devices.push({firebaseKey:r.key,label:r.defaultLabel,kind:r.kind,controlMode:Wr(s,r.kind)}),we(n),!0)}function wh(n,e,t,i){const s=Se(n,e,t);s&&(s.devices=s.devices.filter(o=>o.firebaseKey!==i),we(n))}function zr(n,e){const t=Lr(e),i=new Set;for(const s of Je(n,e))for(const o of s.devices)i.add(o.firebaseKey);return t.filter(s=>!i.has(s.key))}function Th(n){const e=n.trim().split(/\s+/);return e.length>=2?(e[0][0]+e[1][0]).toUpperCase():n.slice(0,2).toUpperCase()}let Us=null;function Eh(n,e,t){const i=kr();return Rr(re(n,i),s=>{const o=s.val();if(o&&typeof o=="object"&&(o.switchRooms||o.motorRooms||o.alarmRooms))e(qr(o));else{const r=_h();e(r),jr(n,r)}},s=>t==null?void 0:t(s))}function jr(n,e,t={}){if(!n)return;const i=kr();clearTimeout(Us),Us=setTimeout(()=>{Ae(re(n,i),{version:4,updatedAt:Date.now(),switchRooms:e.switchRooms,motorRooms:e.motorRooms,alarmRooms:e.alarmRooms}).then(()=>{var s;return(s=t.onOk)==null?void 0:s.call(t)}).catch(s=>{var o;return(o=t.onErr)==null?void 0:o.call(t,s)})},350)}function Ih(){const n=se();return[{root:n.switches.root,allowed:new Set([...n.switches.toggles,...n.switches.timings])},{root:n.motors.root,allowed:new Set([...n.motors.toggles,...n.motors.timings,...n.motors.pushes])},{root:n.alarms.root,allowed:new Set([...n.alarms.toggles,...n.alarms.pushes])}]}async function Kr(n){const e=Ih(),t=[];for(const{root:i,allowed:s}of e){const r=(await Gd(re(n,i))).val();if(!(!r||typeof r!="object"))for(const a of Object.keys(r))s.has(a)||(await qd(re(n,q(i,a))),t.push(`${i}/${a}`))}return t}function ti(n){const e=new Set([...Ue("switch").map(t=>t.key),...Ue("motor").map(t=>t.key),...Ue("alarm").map(t=>t.key)]);for(const t of["switch","motor","alarm"])for(const i of Je(n,t))i.devices=i.devices.filter(s=>e.has(s.firebaseKey));return n}async function Rh(n,e){await Kr(n);const t=ti(e);return we(t),t}function rn(n){if(n==null||n==="")return{hour12:7,minute:0,am:!0};const e=String(n).trim(),t=e.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);if(t){let o=parseInt(t[1],10);const r=parseInt(t[2],10),a=t[3].toUpperCase()==="PM";return o===12?o=a?12:0:a&&(o+=12),On(o%24,r)}const i=e.match(/^(\d{1,2}):(\d{2})$/);if(i)return On(parseInt(i[1],10)%24,parseInt(i[2],10));const s=parseInt(e,10);return!Number.isNaN(s)&&s>=0&&s<1440?On(Math.floor(s/60)%24,s%60):{hour12:7,minute:0,am:!0}}function On(n,e){const t=n<12;let i=n%12;return i===0&&(i=12),{hour12:i,minute:e,am:t}}function Ah({hour12:n,minute:e,am:t}){const i=kh(n,t),s=String(i).padStart(2,"0"),o=String(e).padStart(2,"0");return`${s}:${o}`}function ni({hour12:n,minute:e,am:t}){const i=String(e).padStart(2,"0");return`${n}:${i} ${t?"AM":"PM"}`}function kh(n,e){return e?n===12?0:n:n===12?12:n+12}function qi(n){return n===12?12:n}function Nh(n,e,t,i){const s=t-n,o=i-e;let r=Math.atan2(o,s)*180/Math.PI+90;return r<0&&(r+=360),r}function Ph(n){let e=Math.round(n/30)%12;return e===0&&(e=12),e}function Dh(n){return Math.round(n/6)%60}function Yr(n,e){return e==="minute"?n.minute*6:qi(n.hour12)%12*30}oh();Wi();const Hs=new Set(["1","ON","on","true","TRUE",!0,1]);function xe(n){return n==null?!1:Hs.has(n)||Hs.has(String(n).trim())}function xh(n){return xe(n)?"0":"1"}function T(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function Oh(){return"Welcome Back!"}function Mh(n){const e=se();for(const t of e.motors.toggles){const i=Fr(t),s=n[q(e.motors.root,i.on)],o=n[q(e.motors.root,i.off)];if(s||o){const r=s?ni(rn(s)):"—",a=o?ni(rn(o)):"—";return`${t} · ON ${r} · OFF ${a}`}}return"Set ON/OFF times on motors or switches from room view"}function ut(n){const e=Ui(n);return e?q(e.root,n):null}function Qr(n,e){const t=sh(),i=t.length,s=t.filter(r=>xe(n[r])).length,o=e.switchRooms.length+e.motorRooms.length+e.alarmRooms.length;return{total:i,active:s,roomCount:o}}function Xr(n,e){return n.devices.filter(t=>{if(uh(t.kind))return!1;const i=ut(t.firebaseKey);return i&&xe(e[i])}).length}function Lh(){return`
    <div class="shell shell--setup shell--dev-only">
      <main class="setup-card setup-card--wide">
        <p class="brand"><span class="brand__lumina">Lumina</span><span class="brand__slash">/OS</span></p>
        <h1>Connect Firebase</h1>
        <p>Add credentials below (saved in this browser), then <strong>Save & reload</strong>.</p>
      </main>
    </div>
  `}function Fh(n){const e=n.ui.timeModal.time,t=n.ui.timeModal.picking;return(t==="minute"?[0,5,10,15,20,25,30,35,40,45,50,55]:[12,1,2,3,4,5,6,7,8,9,10,11]).map((s,o)=>{const r=o*30-90,a=50+40*Math.cos(r*Math.PI/180),l=50+40*Math.sin(r*Math.PI/180),c=t==="minute"?e.minute===s||s===0&&e.minute===0:qi(e.hour12)===s,u=t==="minute"?String(s).padStart(2,"0"):s===12?"12":String(s).padStart(2,"0");return`<button type="button" class="clock-num ${c?"clock-num--sel":""}"
        data-action="pick-clock-val" data-val="${s}"
        style="left:${a}%;top:${l}%">${u}</button>`}).join("")}function $h(n){const e=n.ui.timeModal;if(!e)return"";const t=e.time,i=e.kind==="timing-on"?"Set ON time":"Set OFF time",s=e.picking==="hour",o=Yr(t,e.picking),r=s?"Drag the hand or tap an hour":"Drag the hand or tap minutes (00–55)";return`
    <div class="modal-backdrop" data-action="backdrop-close">
      <div class="modal modal__panel modal--time" role="dialog" aria-modal="true">
        <header class="modal__head">
          <h2>${T(i)}</h2>
          <button type="button" class="modal__close" data-action="close-modal" aria-label="Close">×</button>
        </header>
        <p class="modal__device">${T(e.label)} · <code>${T(e.firebaseKey)}</code></p>
        <div class="digital-time">
          <button type="button" class="digital-time__part ${s?"digital-time__part--active":""}" data-action="pick-mode" data-mode="hour" data-digital-hour>${String(t.hour12).padStart(2,"0")}</button>
          <span class="digital-time__sep">:</span>
          <button type="button" class="digital-time__part ${s?"":"digital-time__part--active"}" data-action="pick-mode" data-mode="minute" data-digital-minute>${String(t.minute).padStart(2,"0")}</button>
        </div>
        <p class="clock-hint">${r}</p>
        <div class="clock-face" data-clock-face>
          <div class="clock-face__dial"></div>
          ${Fh(n)}
          <div class="clock-hand" data-clock-hand style="transform: rotate(${o}deg)"></div>
          <div class="clock-hand-hit" data-clock-hand-hit style="transform: rotate(${o}deg)"></div>
          <div class="clock-center"></div>
        </div>
        <div class="ampm">
          <button type="button" class="ampm__btn ${t.am?"ampm__btn--on":""}" data-action="set-ampm" data-am="1">AM</button>
          <button type="button" class="ampm__btn ${t.am?"":"ampm__btn--on"}" data-action="set-ampm" data-am="0">PM</button>
        </div>
        <div class="minute-row">
          <label>Minutes</label>
          <input type="range" min="0" max="59" value="${t.minute}" data-action="minute-range" data-minute-slider />
          <span data-minute-label>${String(t.minute).padStart(2,"0")}</span>
        </div>
        <footer class="modal__foot modal__foot--spread">
          ${e.hasTime?'<button type="button" class="btn-outline btn-outline--danger" data-action="clear-time">Turn off timing</button>':"<span></span>"}
          <div class="modal__foot-actions">
            <button type="button" class="btn-ghost" data-action="close-modal">Cancel</button>
            <button type="button" class="btn-primary" data-action="save-time">Set time</button>
          </div>
        </footer>
      </div>
    </div>
  `}function Bh(n){return n.ui.toast?`<div class="toast" role="status">${T(n.ui.toast)}</div>`:""}function Vh(n,e){var r;const t=e==="switch"?"switch":e==="motor"?"motor":"alarm",i=((r=n.ui.draft)==null?void 0:r.newRoomName)??"",s=Gr(n.layout,e),o=!$t(n.layout,e);return`
    <div class="modal-backdrop" data-action="backdrop-close">
      <div class="modal modal--sm modal__panel">
        <header class="modal__head"><h2>Add ${t} room</h2>
          <button type="button" class="modal__close" data-action="close-modal">×</button>
        </header>
        <p class="modal__hint">${s}/${sn} rooms · up to ${Hi} additional saved to Firebase</p>
        <label class="field-label">Room name</label>
        <input class="field-input" id="new-room-name" data-draft="newRoomName" value="${T(i)}" placeholder="e.g. Living Room" ${o?"disabled":""} />
        ${o?'<p class="modal__warn">Room limit reached for this category.</p>':""}
        <footer class="modal__foot">
          <button type="button" class="btn-ghost" data-action="close-modal">Cancel</button>
          <button type="button" class="btn-primary" data-action="confirm-add-room" ${o?"disabled":""}>Create room</button>
        </footer>
      </div>
    </div>
  `}function Wh(n,e,t){var u,h;const i=zr(n.layout,e);if(!i.length)return`
      <div class="modal-backdrop" data-action="backdrop-close">
        <div class="modal modal--sm modal__panel">
          <p>All channels are used in other rooms. Remove a device from another room first, then add it here.</p>
          <footer class="modal__foot"><button type="button" class="btn-primary" data-action="close-modal">OK</button></footer>
        </div>
      </div>`;const s=((u=n.ui.draft)==null?void 0:u.addDeviceKey)??i[0].key,o=((h=n.ui.draft)==null?void 0:h.addDeviceControlMode)??"toggle",r=Hr(e),a=i.map(d=>{const p=d.key===s?" selected":"",y=e==="alarm"?d.defaultLabel:`${d.defaultLabel} (${d.key})`;return`<option value="${T(d.key)}"${p}>${T(y)}</option>`}).join(""),l=r?`
        <p class="field-label">Control type</p>
        <div class="control-mode-picker" role="radiogroup" aria-label="Control type">
          <label class="control-mode-picker__option">
            <input type="radio" name="add-device-control" value="toggle" data-draft="addDeviceControlMode"
              ${o==="toggle"?"checked":""} />
            <span class="control-mode-picker__box">
              <span class="control-mode-picker__title">Toggle</span>
              <span class="control-mode-picker__desc">On/off switch · uses main channel key</span>
            </span>
          </label>
          <label class="control-mode-picker__option">
            <input type="radio" name="add-device-control" value="push" data-draft="addDeviceControlMode"
              ${o==="push"?"checked":""} />
            <span class="control-mode-picker__box">
              <span class="control-mode-picker__title">Push button</span>
              <span class="control-mode-picker__desc">Momentary · creates <code>${T(St(s))}</code> in Firebase</span>
            </span>
          </label>
        </div>`:'<p class="modal__hint">Switch channels use an on/off toggle. ON/OFF schedules are added automatically.</p>',c=r?"Motors and alarms can use a toggle or a momentary push button. ON/OFF schedules are added for motors.":"";return`
    <div class="modal-backdrop" data-action="backdrop-close">
      <div class="modal modal--sm modal__panel">
        <header class="modal__head"><h2>Add device</h2>
          <button type="button" class="modal__close" data-action="close-modal">×</button>
        </header>
        ${c?`<p class="modal__hint">${c}</p>`:""}
        <label class="field-label">Channel</label>
        <select class="field-input" id="add-device-key" data-draft="addDeviceKey">${a}</select>
        ${l}
        <footer class="modal__foot">
          <button type="button" class="btn-ghost" data-action="close-modal">Cancel</button>
          <button type="button" class="btn-primary" data-action="confirm-add-device" data-room-id="${T(t)}">Add</button>
        </footer>
      </div>
    </div>
  `}function Uh(n,e,t){return`
    <button type="button" class="pill-switch ${t?"pill-switch--on":""}" data-action="toggle"
      data-group="${T((n==null?void 0:n.root)??"")}" data-key="${T(e.firebaseKey)}">
      <span class="pill-switch__knob"></span>
    </button>`}function Hh(n,e){const t=St(e.firebaseKey);return`
    <button type="button" class="push-btn" data-action="push-hold"
      data-group="${T((n==null?void 0:n.root)??"")}" data-key="${T(t)}"
      aria-label="Push ${T(e.label)}">
      <span class="push-btn__bezel" aria-hidden="true">
        <span class="push-btn__cap">PUSH</span>
      </span>
    </button>`}function qs({timingKey:n,kind:e,label:t,values:i,root:s}){const o=i[q(s,n)],r=!!o,a=r?ni(rn(o)):"Off";return`
    <button type="button" class="schedule-btn${r?"":" schedule-btn--off"}" data-action="open-time"
      data-key="${T(n)}" data-kind="${e}" data-label="${T(t)}">
      <span class="schedule-btn__k">${e==="timing-on"?"ON":"OFF"}</span>
      <span class="schedule-btn__v">${T(a)}</span>
    </button>`}function Gs(n){return n==="switch"?"Tap name to rename switch":n==="motor"?"Tap name to rename":"Tap name to rename alarm"}function qh(n,e,t,i){const s=ut(n.firebaseKey),o=s?t[s]:"",r=Ui(n.firebaseKey),a=Ur(n),l=a&&r?q(r.root,St(n.firebaseKey)):"",c=l?xe(t[l]):!1,u=a?c:xe(o),h=$r(n.kind)?Fr(n.firebaseKey):null,d=a?Hh(r,n):Uh(r,n,u),p=h?`<div class="schedule-pair">
        ${qs({timingKey:h.on,kind:"timing-on",label:`${n.label} ON`,values:t,root:r.root})}
        ${qs({timingKey:h.off,kind:"timing-off",label:`${n.label} OFF`,values:t,root:r.root})}
      </div>`:"",y=a?` · push · ${St(n.firebaseKey)}`:" · toggle";return`
    <div class="device-block ${u?a?"device-block--push":"device-block--on":""}">
      <div class="device-row-wrap">
        <div class="device-row">
          <button type="button" class="device-row__edit" data-action="edit-label" data-key="${T(n.firebaseKey)}" title="${T(Gs(i))}">
            <span class="device-row__title">${T(n.label)}</span>
            <span class="device-row__meta">${T(e.name)}</span>
            <span class="device-row__hint">${T(Gs(i))} · <code>${T(n.firebaseKey)}</code>${y}${h?" · ON/OFF timing":""}</span>
          </button>
          ${d}
        </div>
        <button type="button" class="icon-btn" title="Remove from room" data-action="remove-device" data-key="${T(n.firebaseKey)}">−</button>
      </div>
      ${p}
    </div>`}function Gh(n){const{roomType:e,roomId:t}=n.ui,i=Se(n.layout,e,t);if(!i)return"";const s=Xr(i,n.values),o=e==="switch"?"Switches":e==="motor"?"Motors":"Alarm",r=i.devices.map(a=>qh(a,i,n.values,e)).join("");return`
    <section class="room-detail">
      <button type="button" class="back-link" data-action="go-overview">← My Home</button>
      <div class="room-detail__head">
        <div>
          <span class="room-detail__type">${o}</span>
          <h1 class="room-detail__title" data-action="edit-room-name" data-room-id="${i.id}">${T(i.name)}</h1>
          <p class="room-detail__sub">${s} active · ${i.devices.length} devices</p>
        </div>
        <div class="room-detail__actions">
          <button type="button" class="btn-outline" data-action="open-add-device" data-room-id="${i.id}">+ Add device</button>
          <button type="button" class="btn-outline btn-outline--danger" data-action="delete-room" data-room-id="${i.id}">Delete room</button>
        </div>
      </div>
      <div class="device-list">${r||'<p class="empty">No devices — add SW/Motor channels from Firebase.</p>'}</div>
    </section>`}function Mn(n,e,t){return n.map(i=>{const s=Xr(i,t),o=s===0,r=i.devices.filter(a=>$r(a.kind)).length;return`
        <button type="button" class="zone-card ${o?"zone-card--idle":"zone-card--active"}"
          data-action="open-room" data-room-type="${e}" data-room-id="${i.id}">
          <span class="zone-card__abbr">${T(Th(i.name))}</span>
          ${s>0?`<span class="zone-card__count">${s}</span>`:""}
          <span class="zone-card__status">${o?"Idle":"Active"}</span>
          <h3 class="zone-card__name">${T(i.name)}</h3>
          <p class="zone-card__meta">${i.devices.length} devices · ${r} schedules</p>
          <span class="zone-card__arrow">↗</span>
        </button>`}).join("")}function zh(n){const{values:e,layout:t,connected:i,error:s}=n,o=Qr(e,t);return`
    <div class="topbar__chips">
      <span class="chip ${s?"status--error":i?"status--ok":"status--warn"}"><span class="chip__dot"></span>${T(s?"Error":i?"System Online":"Connecting…")}</span>
      <span class="chip chip--muted">${o.active}/${o.total} active</span>
    </div>`}function jh(n){const e=n.ui.view==="overview"||n.ui.view==="room"?zh(n):"";return`
    <header class="app-bar">
      <button type="button" class="menu-btn" data-action="toggle-menu"
        aria-label="${n.ui.menuOpen?"Close menu":"Open menu"}"
        aria-expanded="${n.ui.menuOpen?"true":"false"}">
        <span class="menu-btn__line" aria-hidden="true"></span>
        <span class="menu-btn__line" aria-hidden="true"></span>
        <span class="menu-btn__line" aria-hidden="true"></span>
      </button>
      <div class="app-bar__end">${e}</div>
    </header>`}function Kh(n){const e=n.ui.view==="overview"||n.ui.view==="room",t=n.ui.view==="settings",i=n.ui.view==="developer";return`
    <div class="menu-backdrop ${n.ui.menuOpen?"menu-backdrop--open":""}" data-action="close-menu" aria-hidden="${n.ui.menuOpen?"false":"true"}"></div>
    <aside class="menu-drawer ${n.ui.menuOpen?"menu-drawer--open":""}" role="navigation" aria-label="Main menu" aria-hidden="${n.ui.menuOpen?"false":"true"}">
      <nav class="menu-drawer__nav">
        <button type="button" class="menu-drawer__item ${e?"menu-drawer__item--active":""}" data-action="go-overview">My Home</button>
        <button type="button" class="menu-drawer__item ${t?"menu-drawer__item--active":""}" data-action="go-settings">Settings</button>
        <button type="button" class="menu-drawer__item ${i?"menu-drawer__item--active":""}" data-action="go-developer">Developer</button>
      </nav>
    </aside>`}function Yh(n){const{values:e,layout:t,connected:i}=n,s=Qr(e,t),o=Mh(e);return`
    <section class="hero">
      <div class="hero-brand">
        <p class="hero-brand__title">Smart Living Control</p>
        <p class="hero-brand__sub">Personalized Home Control</p>
      </div>
      <h1 class="hero__title">${Oh()}</h1>
      <p class="hero__sub">System synchronized. ${s.roomCount} rooms · ${rh()}.</p>
      <div class="hero__stats">
        <div><span class="hero__stat-k">Active</span><span class="hero__stat-v">${s.active}/${s.total}</span></div>
        <div><span class="hero__stat-k">Motors</span><span class="hero__stat-v">${t.motorRooms.length}</span></div>
        <div><span class="hero__stat-k">Rooms</span><span class="hero__stat-v">${s.roomCount}</span></div>
      </div>
    </section>

    <section class="event-card">
      <span class="event-card__icon">🔔</span>
      <p class="event-card__text">${T(o)}</p>
    </section>

    <section class="section-block">
      <div class="section-head">
        <h2>Control Zones</h2>
        <button type="button" class="btn-text" data-action="open-add-room" data-room-type="switch" ${$t(t,"switch")?"":"disabled"}>+ Add room</button>
      </div>
      <div class="zone-grid">${Mn(t.switchRooms,"switch",e)}</div>
    </section>

    <section class="section-block">
      <div class="section-head">
        <h2>Pump Control</h2>
        <button type="button" class="btn-text" data-action="open-add-room" data-room-type="motor" ${$t(t,"motor")?"":"disabled"}>+ Add room</button>
      </div>
      <div class="zone-grid">${Mn(t.motorRooms,"motor",e)}</div>
    </section>

    <section class="section-block">
      <div class="section-head">
        <h2>Alert Zones</h2>
        <button type="button" class="btn-text" data-action="open-add-room" data-room-type="alarm" ${$t(t,"alarm")?"":"disabled"}>+ Add room</button>
      </div>
      <div class="zone-grid">${Mn(t.alarmRooms,"alarm",e)}</div>
    </section>

    `}function F(n,e,t,i="text"){return`
    <label class="dev-field">
      <span class="dev-field__label">${T(e)}</span>
      <input class="dev-field__input" type="${i}" id="${n}" data-dev-field="${n}" value="${T(t??"")}" />
    </label>`}function Qh(n){const e=an();return ef.map(t=>(e.selectedSound,t.id,`
      <div class="sound-option \${isSelected ? "sound-option--selected" : ""}" data-action="select-sound" data-sound-id="\${snd.id}">
        <div class="sound-option__info">
          <span class="sound-option__name">\${escapeHtml(snd.name)}</span>
          <span class="sound-option__desc">\${escapeHtml(snd.desc)}</span>
        </div>
        <div class="sound-option__actions">
          <button type="button" class="sound-option__preview-btn" data-action="preview-sound" data-sound-id="\${snd.id}" title="Preview sound">
            ▶
          </button>
          <div class="sound-option__radio">
            <span class="sound-option__radio-dot"></span>
          </div>
        </div>
      </div>
    `)).join(""),`
    <p class="settings-intro">Customize the user experience settings. Clicks are synthesized in real-time using Web Audio API.</p>
    
    <section class="settings-panel">
      <div class="settings-row">
        <div>
          <h3>Click Sound Effects</h3>
          <p class="settings-row-desc">Play audio feedback when tapping switches and options</p>
        </div>
        <button type="button" class="pill-switch \${cfg.enabled ? "pill-switch--on" : ""}" data-action="toggle-sound-master">
          <span class="pill-switch__knob"></span>
        </button>
      </div>
    </section>

    <section class="settings-panel settings-panel--sounds \${cfg.enabled ? "" : "settings-panel--disabled"}">
      <h2>Select Sound Track</h2>
      <div class="sounds-list">
        \${options}
      </div>
    </section>
  `}function Jr(n){const e=n.devDraft||Vi(),t=se();return`
    <p class="dev-intro">Credentials and Firebase paths are stored in this browser. After saving, the page reloads to connect with new settings.</p>

    <section class="dev-panel">
      <h2>Firebase credentials</h2>
      <div class="dev-grid">
        ${F("fb-apiKey","apiKey",e.firebase.apiKey)}
        ${F("fb-authDomain","authDomain",e.firebase.authDomain)}
        ${F("fb-databaseURL","databaseURL",e.firebase.databaseURL)}
        ${F("fb-projectId","projectId",e.firebase.projectId)}
        ${F("fb-storageBucket","storageBucket",e.firebase.storageBucket)}
        ${F("fb-messagingSenderId","messagingSenderId",e.firebase.messagingSenderId)}
        ${F("fb-appId","appId",e.firebase.appId)}
      </div>
    </section>

    <section class="dev-panel">
      <h2>Firebase paths & channel counts</h2>
      <div class="dev-grid">
        ${F("path-switchRoot","Switch root path",e.paths.switchRoot)}
        ${F("path-motorRoot","Motor root path",e.paths.motorRoot)}
        ${F("path-alarmRoot","Alarm root path",e.paths.alarmRoot)}
        ${F("path-layoutRoot","Room layout path",e.paths.layoutRoot)}
        ${F("path-switchCount","Switch count",e.paths.switchCount,"number")}
        ${F("path-motorCount","Motor count",e.paths.motorCount,"number")}
        ${F("path-alarmCount","Alarm count",e.paths.alarmCount,"number")}
        ${F("path-switchPrefix","Switch key prefix",e.paths.switchPrefix)}
        ${F("path-motorPrefix","Motor key prefix",e.paths.motorPrefix)}
        ${F("path-alarmPrefix","Alarm key prefix",e.paths.alarmPrefix)}
        ${F("path-onTimingSuffix","ON timing suffix",e.paths.onTimingSuffix)}
        ${F("path-offTimingSuffix","OFF timing suffix",e.paths.offTimingSuffix)}
      </div>
      <p class="dev-preview">Channels: ${T(t.switches.root)}/SW1–SW${t.meta.switchCount} · ${T(t.motors.root)}/M1–M${t.meta.motorCount} · ${T(t.alarms.root)}/${T(t.meta.alarmPrefix)}1–${T(t.meta.alarmPrefix)}${t.meta.alarmCount}. Lowering a count removes extra keys from Firebase on save.</p>
    </section>

    <footer class="dev-actions">
      ${Dr()?'<button type="button" class="btn-ghost" data-action="go-overview">← My Home</button>':""}
      <button type="button" class="btn-ghost" data-action="reset-dev-config">Reset defaults</button>
      <button type="button" class="btn-primary" data-action="save-dev-config">Save & reload</button>
    </footer>`}function Zr(){const n=document.querySelectorAll("[data-dev-field]"),e={},t={};return n.forEach(i=>{const s=i.dataset.devField,o=i.type==="number"?i.value:i.value.trim();s.startsWith("fb-")&&(e[s.slice(3)]=o),s.startsWith("path-")&&(t[s.slice(5)]=o)}),{firebase:e,paths:t}}function Xh(n){const e=n.ui.view==="developer"?Jr(n):n.ui.view==="settings"?Qh():n.ui.view==="room"?Gh(n):Yh(n);return`
    ${Kh(n)}
    <div class="shell ${n.ui.menuOpen?"shell--menu-open":""}">
      ${jh(n)}
      <main class="main">
        ${n.layoutSync==="saving"?'<p class="sync-banner sync-banner--saving">Saving layout to Firebase…</p>':""}
        ${n.layoutSync==="saved"?'<p class="sync-banner sync-banner--saved">Layout saved permanently</p>':""}
        ${n.layoutSync==="error"?'<p class="sync-banner sync-banner--error">Could not save layout — check Firebase rules</p>':""}
        ${e}
      </main>
    </div>
    ${Bh(n)}`}function Jh(n){return n.ui.modal==="time"?$h(n):n.ui.modal==="add-room"?Vh(n,n.ui.addRoomType):n.ui.modal==="add-device"?Wh(n,n.ui.roomType,n.ui.roomId):""}function oe(n){var e;(e=n.ui.clockAbort)==null||e.abort(),n.ui.modal=null,n.ui.timeModal=null,n.ui.draft={}}async function ea(n,e,t){const i=Ui(e);if(!i)return;const s=St(e),o=q(i.root,s);t[o]===void 0&&(await Ae(re(n,o),"0"),t[o]="0")}async function Zh(n,e,t,i,s){const o=Se(e,t,i);if(o)for(const r of o.devices)Ur(r)&&await ea(n,r.firebaseKey,s)}const ta="lumina-sound-settings",ef=[{id:1,name:"Classic Tactile Tick",desc:"Short sweep, high pitch, crisp digital click."},{id:2,name:"Bubbly Wet Pop",desc:"Fast upward frequency sweep. Wet, satisfying bubble burst."},{id:3,name:"Mechanical Switch",desc:"Triangle wave with white noise burst. Tactile micro-switch sound."},{id:4,name:"Organic Wood Tap",desc:"Decaying low-mid frequency sweep. Sounds like a small woodblock knock."},{id:5,name:"Futuristic UI Beep",desc:"Two-tone digital pitch shift. Clean high-tech indicator click."},{id:6,name:"Soft Guitar Pluck",desc:"Damped triangle pluck. Warm, musical acoustic tap."},{id:7,name:"Metallic Chime",desc:"Modulated clean frequencies. Metallic ring-modulated tap."},{id:8,name:"Digital Droplet",desc:"High frequency rapid slide downwards. Digital liquid bead."},{id:9,name:"Water Splash",desc:"Up-down pitch modulation. Soft drop of water hitting a pool."},{id:10,name:"Warm Bass Pulse",desc:"Low-pass filtered pulse. Deep, non-intrusive haptic touch."},{id:11,name:"Subtle Snip",desc:"High-pass filtered noise click. Sounds like scissors or a dry snap."},{id:12,name:"Double Blip",desc:"Two micro-beeps in rapid succession. Classic notification beep."},{id:13,name:"Card Flip",desc:"Low mechanical pitch snap. Sounds like a card slide or switch lever."},{id:14,name:"Glass Ping",desc:"Pure high sine wave. Extremely clean crystal-like long chime."},{id:15,name:"Haptic Buzz",desc:"Low frequency triangle vibrato. Simulates a mobile vibration haptic."},{id:16,name:"Radar Pulse",desc:"Resonant soft sweep. Premium radar sonar echo tap."},{id:17,name:"Space Zip",desc:"Ultra-fast cyber sweep. Quick laser-like tech feedback."},{id:18,name:"Spring Pop",desc:"Wobbly pitch slide down and up. Playful bouncing action."},{id:19,name:"Digital Chirp",desc:"Synthesized bird-like twin frequency chirp. Highly responsive."},{id:20,name:"Echo Tap",desc:"Tick click followed by a half-volume echo 50ms later."}];function an(){try{const n=localStorage.getItem(ta);if(n)return JSON.parse(n)}catch{}return{enabled:!0,selectedSound:1}}function zs(n){try{localStorage.setItem(ta,JSON.stringify(n))}catch{}}let Fe=null;function Mt(n=null){const e=an();if(!e.enabled&&n===null)return;const t=n!==null?n:e.selectedSound;try{Fe||(Fe=new(window.AudioContext||window.webkitAudioContext)),Fe.state==="suspended"&&Fe.resume();const i=Fe.currentTime;tf(t,Fe,i)}catch(i){console.warn("Audio playback failed",i)}}function tf(n,e,t){switch(n){case 1:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(1200,t),i.frequency.exponentialRampToValueAtTime(120,t+.06),s.gain.setValueAtTime(.08,t),s.gain.exponentialRampToValueAtTime(.001,t+.06),i.start(t),i.stop(t+.06);break}case 2:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(150,t),i.frequency.exponentialRampToValueAtTime(1800,t+.08),s.gain.setValueAtTime(.1,t),s.gain.exponentialRampToValueAtTime(.001,t+.08),i.start(t),i.stop(t+.08);break}case 3:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="triangle",i.frequency.setValueAtTime(600,t),i.frequency.setValueAtTime(100,t+.025),s.gain.setValueAtTime(.12,t),s.gain.exponentialRampToValueAtTime(.001,t+.03),i.start(t),i.stop(t+.03);const o=e.sampleRate*.015,r=e.createBuffer(1,o,e.sampleRate),a=r.getChannelData(0);for(let u=0;u<o;u++)a[u]=Math.random()*2-1;const l=e.createBufferSource();l.buffer=r;const c=e.createGain();c.gain.setValueAtTime(.02,t),c.gain.exponentialRampToValueAtTime(.001,t+.015),l.connect(c),c.connect(e.destination),l.start(t);break}case 4:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(80,t+.12),s.gain.setValueAtTime(.15,t),s.gain.exponentialRampToValueAtTime(.001,t+.12),i.start(t),i.stop(t+.12);break}case 5:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="triangle",i.frequency.setValueAtTime(1400,t),i.frequency.setValueAtTime(2200,t+.04),s.gain.setValueAtTime(.05,t),s.gain.exponentialRampToValueAtTime(.001,t+.08),i.start(t),i.stop(t+.08);break}case 6:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="triangle",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(200,t+.15),s.gain.setValueAtTime(.12,t),s.gain.exponentialRampToValueAtTime(.001,t+.15),i.start(t),i.stop(t+.15);break}case 7:{const i=e.createGain();i.connect(e.destination),i.gain.setValueAtTime(.05,t),i.gain.exponentialRampToValueAtTime(.001,t+.18),[880,1200,1500].forEach(s=>{const o=e.createOscillator();o.connect(i),o.type="sine",o.frequency.setValueAtTime(s,t),o.start(t),o.stop(t+.18)});break}case 8:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(2500,t),i.frequency.exponentialRampToValueAtTime(1e3,t+.05),s.gain.setValueAtTime(.08,t),s.gain.exponentialRampToValueAtTime(.001,t+.05),i.start(t),i.stop(t+.05);break}case 9:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(600,t),i.frequency.exponentialRampToValueAtTime(2400,t+.04),i.frequency.exponentialRampToValueAtTime(800,t+.08),s.gain.setValueAtTime(.08,t),s.gain.exponentialRampToValueAtTime(.001,t+.08),i.start(t),i.stop(t+.08);break}case 10:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(150,t),i.frequency.exponentialRampToValueAtTime(50,t+.12),s.gain.setValueAtTime(.3,t),s.gain.exponentialRampToValueAtTime(.001,t+.12),i.start(t),i.stop(t+.12);break}case 11:{const i=e.sampleRate*.015,s=e.createBuffer(1,i,e.sampleRate),o=s.getChannelData(0);for(let c=0;c<i;c++)o[c]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=s;const a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=2500,a.Q.value=5;const l=e.createGain();l.gain.setValueAtTime(.06,t),l.gain.exponentialRampToValueAtTime(.001,t+.015),r.connect(a),a.connect(l),l.connect(e.destination),r.start(t);break}case 12:{const i=(s,o)=>{const r=e.createOscillator(),a=e.createGain();r.connect(a),a.connect(e.destination),r.type="sine",r.frequency.setValueAtTime(o,s),a.gain.setValueAtTime(.04,s),a.gain.exponentialRampToValueAtTime(.001,s+.03),r.start(s),r.stop(s+.03)};i(t,1800),i(t+.06,2e3);break}case 13:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sawtooth",i.frequency.setValueAtTime(220,t),i.frequency.exponentialRampToValueAtTime(40,t+.04);const o=e.createBiquadFilter();o.type="lowpass",o.frequency.value=800,i.disconnect(s),i.connect(o),o.connect(s),s.gain.setValueAtTime(.12,t),s.gain.exponentialRampToValueAtTime(.001,t+.04),i.start(t),i.stop(t+.04);break}case 14:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(3200,t),s.gain.setValueAtTime(.06,t),s.gain.exponentialRampToValueAtTime(.001,t+.2),i.start(t),i.stop(t+.2);break}case 15:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="triangle",i.frequency.setValueAtTime(70,t),i.frequency.setValueAtTime(65,t+.04),s.gain.setValueAtTime(.4,t),s.gain.exponentialRampToValueAtTime(.001,t+.045),i.start(t),i.stop(t+.045);break}case 16:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(1e3,t),i.frequency.exponentialRampToValueAtTime(800,t+.18),s.gain.setValueAtTime(.07,t),s.gain.exponentialRampToValueAtTime(.001,t+.18),i.start(t),i.stop(t+.18);break}case 17:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(3500,t),i.frequency.exponentialRampToValueAtTime(300,t+.045),s.gain.setValueAtTime(.08,t),s.gain.exponentialRampToValueAtTime(.001,t+.045),i.start(t),i.stop(t+.045);break}case 18:{const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(350,t),i.frequency.exponentialRampToValueAtTime(600,t+.04),i.frequency.exponentialRampToValueAtTime(150,t+.09),s.gain.setValueAtTime(.08,t),s.gain.exponentialRampToValueAtTime(.001,t+.09),i.start(t),i.stop(t+.09);break}case 19:{const i=e.createOscillator(),s=e.createOscillator(),o=e.createGain(),r=e.createGain();i.connect(o),o.connect(e.destination),s.connect(r),r.connect(e.destination),i.type="sine",i.frequency.setValueAtTime(1400,t),s.type="sine",s.frequency.setValueAtTime(850,t),o.gain.setValueAtTime(.05,t),o.gain.exponentialRampToValueAtTime(.001,t+.07),r.gain.setValueAtTime(.05,t),r.gain.exponentialRampToValueAtTime(.001,t+.07),i.start(t),i.stop(t+.07),s.start(t),s.stop(t+.07);break}case 20:{const i=(s,o)=>{const r=e.createOscillator(),a=e.createGain();r.connect(a),a.connect(e.destination),r.type="sine",r.frequency.setValueAtTime(1200,s),r.frequency.exponentialRampToValueAtTime(120,s+.05),a.gain.setValueAtTime(o,s),a.gain.exponentialRampToValueAtTime(.001,s+.05),r.start(s),r.stop(s+.05)};i(t,.08),i(t+.075,.03);break}}}function nf(n){const e=document.getElementById("app"),t={connected:!1,error:null,values:{},layout:on(),layoutReady:!1,layoutSync:null,devDraft:null,ui:{view:"overview",roomType:"switch",roomId:null,modal:null,addRoomType:"switch",timeModal:null,draft:{},pushHeld:new Set,menuOpen:!1}};let i=null,s=null,o=!1,r=!1,a=0,l=null;function c(){i!=null&&i.isConnected&&(s!=null&&s.isConnected)||(e.innerHTML='<div id="app-shell"></div><div id="app-modal"></div>',i=document.getElementById("app-shell"),s=document.getElementById("app-modal"))}function u(){c(),i.innerHTML=Xh(t),s.innerHTML=Jh(t),I(),t.ui.modal==="time"&&p()}function h(){const m=t.ui.timeModal;if(!m||!s)return;const g=m.time,_=Yr(g,m.picking),M=s.querySelector("[data-clock-hand]"),L=s.querySelector("[data-clock-hand-hit]");M&&(M.style.transform=`rotate(${_}deg)`),L&&(L.style.transform=`rotate(${_}deg)`);const v=s.querySelector("[data-digital-hour]"),E=s.querySelector("[data-digital-minute]");v&&(v.textContent=String(g.hour12).padStart(2,"0")),E&&(E.textContent=String(g.minute).padStart(2,"0"));const R=s.querySelector("[data-minute-slider]"),Pt=s.querySelector("[data-minute-label]");R&&(R.value=String(g.minute)),Pt&&(Pt.textContent=String(g.minute).padStart(2,"0")),s.querySelectorAll(".clock-num").forEach(pe=>{const Me=parseInt(pe.dataset.val,10),sa=m.picking==="minute"?g.minute===Me:qi(g.hour12)===Me;pe.classList.toggle("clock-num--sel",sa)}),s.querySelectorAll(".digital-time__part").forEach(pe=>{const Me=pe.dataset.mode==="hour";pe.classList.toggle("digital-time__part--active",Me?m.picking==="hour":m.picking==="minute")})}function d(m,g){const _=t.ui.timeModal,M=s==null?void 0:s.querySelector("[data-clock-face]");if(!_||!M)return;const L=M.getBoundingClientRect(),v=L.left+L.width/2,E=L.top+L.height/2,R=Nh(v,E,m,g);_.picking==="minute"?_.time.minute=Dh(R):_.time.hour12=Ph(R),h()}function p(){var E;(E=t.ui.clockAbort)==null||E.abort();const m=new AbortController;t.ui.clockAbort=m;const{signal:g}=m,_=s==null?void 0:s.querySelector("[data-clock-face]");if(!_)return;const M=R=>{R.target.closest(".clock-num")||(R.preventDefault(),_.setPointerCapture(R.pointerId),_.classList.add("clock-face--dragging"),d(R.clientX,R.clientY))},L=R=>{_.hasPointerCapture(R.pointerId)&&(R.preventDefault(),d(R.clientX,R.clientY))},v=R=>{_.hasPointerCapture(R.pointerId)&&(_.releasePointerCapture(R.pointerId),_.classList.remove("clock-face--dragging"))};_.addEventListener("pointerdown",M,{signal:g}),_.addEventListener("pointermove",L,{signal:g}),_.addEventListener("pointerup",v,{signal:g}),_.addEventListener("pointercancel",v,{signal:g})}function y(){o||(o=!0,requestAnimationFrame(()=>{if(o=!1,r||t.ui.modal){O();return}u()}))}function I(){t.ui.modal==="add-room"&&requestAnimationFrame(()=>{const m=s==null?void 0:s.querySelector("#new-room-name");m==null||m.focus()})}function O(){i&&(i.querySelectorAll("[data-action='toggle']").forEach(m=>{var M,L;const g=q(m.dataset.group,m.dataset.key),_=xe(t.values[g]);m.classList.toggle("pill-switch--on",_),(M=m.closest(".device-block"))==null||M.classList.toggle("device-block--on",_),(L=m.closest(".device-row-wrap"))==null||L.classList.toggle("device-row-wrap--on",_)}),i.querySelectorAll("[data-action='push-hold']").forEach(m=>{var M;const g=q(m.dataset.group,m.dataset.key),_=t.ui.pushHeld.has(g)||xe(t.values[g]);(M=m.closest(".device-block"))==null||M.classList.toggle("device-block--push",_)}))}async function Q(m,g){var M;if(!m)return;const _=q(m.dataset.group,m.dataset.key);(M=m.closest(".device-block"))==null||M.classList.toggle("device-block--push",g),g?t.ui.pushHeld.add(_):t.ui.pushHeld.delete(_);try{await Ae(re(n,_),g?"1":"0")}catch(L){t.error=L.message,u()}}async function X(m){var _;if(!l)return;const g=l;(m==null?void 0:m.pointerId)!=null&&((_=g.hasPointerCapture)!=null&&_.call(g,m.pointerId))&&g.releasePointerCapture(m.pointerId),l=null,await Q(g,!1)}function J(){const m=s==null?void 0:s.querySelector("#new-room-name");m&&(t.ui.draft.newRoomName=m.value);const g=s==null?void 0:s.querySelector("#add-device-key");g&&(t.ui.draft.addDeviceKey=g.value);const _=s==null?void 0:s.querySelector('input[name="add-device-control"]:checked');_&&(t.ui.draft.addDeviceControlMode=_.value)}function Z(m,g=3500){t.ui.toast=m,u(),clearTimeout(t.ui.toastTimer),t.ui.toastTimer=setTimeout(()=>{t.ui.toast=null,u()},g)}function na(){t.layoutSync="saving",clearTimeout(t.layoutSyncTimer),t.layoutSyncTimer=setTimeout(()=>{t.layoutSync==="saving"&&u()},50)}function ia(){t.layoutSync="saved",u(),clearTimeout(t.layoutSyncTimer),t.layoutSyncTimer=setTimeout(()=>{t.layoutSync=null,u()},2e3)}dh(m=>{a=Date.now()+900,na(),jr(n,m,{onOk:()=>ia(),onErr:()=>{t.layoutSync="error",Z("Firebase could not save rooms. Add HOME_CONSOLE_LAYOUT to database rules."),u()}})}),(async()=>{try{await Kr(n),t.layout=ti(t.layout),we(t.layout),u()}catch(m){Z(`Channel sync: ${m.message}`)}})(),Eh(n,m=>{Date.now()<a||(t.layout=ti(m),t.layoutReady=!0,u())},()=>{t.layoutSync="error",Z("Cannot load room layout from Firebase. Using local backup."),u()}),u();const Gi=new Set;for(const m of Ws())Rr(re(n,m),g=>{const _=g.val()||{};for(const[M,L]of Object.entries(_))t.values[q(m,M)]=L;Gi.add(m),Gi.size>=Ws().length&&(t.connected=!0),y()},g=>{t.error=g.message,y()});e.addEventListener("pointerdown",async m=>{const g=m.target.closest("[data-action='push-hold']");g&&(Mt(),m.preventDefault(),l=g,g.setPointerCapture(m.pointerId),await Q(g,!0))}),e.addEventListener("pointerup",m=>{X(m)}),e.addEventListener("pointercancel",m=>{X(m)}),e.addEventListener("input",m=>{var _;const g=(_=m.target.dataset)==null?void 0:_.draft;if(g&&t.ui.draft&&(t.ui.draft[g]=m.target.value),m.target.matches("#add-device-key")&&t.ui.modal==="add-device"){t.ui.draft.addDeviceKey=m.target.value,u();return}m.target.matches("[data-action='minute-range']")&&t.ui.timeModal&&(t.ui.timeModal.time.minute=parseInt(m.target.value,10),t.ui.timeModal.picking="minute",h())}),e.addEventListener("click",async m=>{var M,L;const g=m.target.closest("[data-action]");if(!g)return;Mt();const _=g.dataset.action;if(_==="backdrop-close"){if(m.target!==g)return;oe(t),u();return}if(_==="toggle-menu"){t.ui.menuOpen=!t.ui.menuOpen,u();return}if(_==="close-menu"){t.ui.menuOpen=!1,u();return}if(_==="go-overview"){t.ui.view="overview",t.ui.menuOpen=!1,oe(t),u();return}if(_==="go-developer"){t.ui.view="developer",t.ui.menuOpen=!1,t.devDraft=Vi(),oe(t),u();return}if(_==="go-settings"){t.ui.view="settings",t.ui.menuOpen=!1,oe(t),u();return}if(_==="toggle-sound-master"){const v=an();v.enabled=!v.enabled,zs(v),u();return}if(_==="select-sound"){const v=parseInt(g.dataset.soundId,10),E=an();E.selectedSound=v,zs(E),Mt(v),u();return}if(_==="preview-sound"){m.stopPropagation();const v=parseInt(g.dataset.soundId,10);Mt(v);return}if(_==="save-dev-config"){Nr(Zr()),Wi();try{await Rh(n,t.layout)}catch(v){t.error=v.message,Z(`Settings saved; prune failed: ${v.message}`),u();return}location.reload();return}if(_==="reset-dev-config"){confirm("Reset all developer settings to defaults?")&&(Pr(),location.reload());return}if(_==="open-room"){t.ui.view="room",t.ui.roomType=g.dataset.roomType,t.ui.roomId=g.dataset.roomId,oe(t),u(),Zh(n,t.layout,t.ui.roomType,t.ui.roomId,t.values);return}if(_==="open-add-room"){J(),t.ui.modal="add-room",t.ui.addRoomType=g.dataset.roomType,t.ui.draft={newRoomName:""},u();return}if(_==="confirm-add-room"){m.preventDefault(),J();const v=((M=t.ui.draft.newRoomName)==null?void 0:M.trim())||"New Room",{room:E,error:R}=yh(t.layout,t.ui.addRoomType,v);if(R){Z(R);return}oe(t),t.ui.view="room",t.ui.roomType=t.ui.addRoomType,t.ui.roomId=E.id,Z(`Room "${E.name}" saved permanently`),u();return}if(_==="delete-room"){const{error:v}=vh(t.layout,t.ui.roomType,g.dataset.roomId);if(v){Z(v);return}t.ui.view="overview",Z("Room deleted"),u();return}if(_==="open-add-device"){J();const v=zr(t.layout,t.ui.roomType);t.ui.modal="add-device",t.ui.roomId=g.dataset.roomId,t.ui.draft={addDeviceKey:((L=v[0])==null?void 0:L.key)??"",addDeviceControlMode:(Hr(t.ui.roomType),"toggle")},u();return}if(_==="confirm-add-device"){m.preventDefault(),J();const v=t.ui.draft.addDeviceKey,E=t.ui.draft.addDeviceControlMode??"toggle";if(v&&Sh(t.layout,t.ui.roomType,t.ui.roomId,v,E)&&E==="push")try{await ea(n,v,t.values)}catch(R){t.error=R.message}oe(t),u();return}if(_==="close-modal"){oe(t),u();return}if(_==="edit-room-name"){r=!0;const v=Se(t.layout,t.ui.roomType,t.ui.roomId),E=prompt("Room name",(v==null?void 0:v.name)??"");r=!1,E!=null&&Ch(t.layout,t.ui.roomType,t.ui.roomId,E),u();return}if(_==="edit-label"){m.stopPropagation(),r=!0;const v=g.dataset.key,E=Se(t.layout,t.ui.roomType,t.ui.roomId),R=E==null?void 0:E.devices.find(Me=>Me.firebaseKey===v),Pt=t.ui.roomType==="switch"?"Switch display name":t.ui.roomType==="motor"?"Motor display name":"Alarm display name",pe=prompt(Pt,(R==null?void 0:R.label)??v);r=!1,pe!=null&&bh(t.layout,t.ui.roomType,t.ui.roomId,v,pe),u();return}if(_==="remove-device"){wh(t.layout,t.ui.roomType,t.ui.roomId,g.dataset.key),u();return}if(_==="toggle"){const v=q(g.dataset.group,g.dataset.key);try{await Ae(re(n,v),xh(t.values[v]))}catch(E){t.error=E.message,u()}return}if(_==="open-time"){const v=ut(g.dataset.key),E=v?t.values[v]:"";t.ui.modal="time",t.ui.timeModal={firebaseKey:g.dataset.key,kind:g.dataset.kind,label:g.dataset.label,time:rn(E),hasTime:!!E,picking:"hour"},u();return}if(_==="pick-clock-val"){const v=parseInt(g.dataset.val,10);t.ui.timeModal.picking==="minute"?t.ui.timeModal.time.minute=v:t.ui.timeModal.time.hour12=v===0?12:v,h();return}if(_==="pick-mode"){t.ui.timeModal.picking=g.dataset.mode,u();return}if(_==="set-ampm"){t.ui.timeModal.time.am=g.dataset.am==="1",h();return}if(_==="save-time"){const v=t.ui.timeModal,E=ut(v.firebaseKey);if(E)try{await Ae(re(n,E),Ah(v.time))}catch(R){t.error=R.message}oe(t),u();return}if(_==="clear-time"){const v=t.ui.timeModal,E=ut(v.firebaseKey);if(E)try{await Ae(re(n,E),"")}catch(R){t.error=R.message}oe(t),u();return}})}function sf(){var e,t;const n=document.getElementById("app");if(!Dr()){n.innerHTML=Lh()+'<div id="dev-mount"></div>';const i=document.getElementById("dev-mount"),s={devDraft:Vi()};i.innerHTML=Jr(s),(e=i.querySelector('[data-action="save-dev-config"]'))==null||e.addEventListener("click",()=>{Nr(Zr()),location.reload()}),(t=i.querySelector('[data-action="reset-dev-config"]'))==null||t.addEventListener("click",()=>{confirm("Reset to defaults?")&&(Pr(),location.reload())});return}nf(eh(oo(Bi())))}sf();
