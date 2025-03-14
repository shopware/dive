"use strict";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gh="163",Ms={ROTATE:0,DOLLY:1,PAN:2},Es={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lE=0,tp=1,uE=2,ag=1,cg=2,Ji=3,Li=0,Fn=1,pi=2,Cr=0,Zs=1,np=2,ip=3,rp=4,hE=5,$r=100,fE=101,dE=102,pE=103,mE=104,gE=200,_E=201,vE=202,xE=203,$u=204,Ju=205,yE=206,SE=207,ME=208,EE=209,TE=210,bE=211,AE=212,wE=213,RE=214,CE=0,LE=1,PE=2,Ic=3,IE=4,DE=5,UE=6,NE=7,lg=0,OE=1,FE=2,rr=0,BE=1,kE=2,zE=3,HE=4,GE=5,VE=6,WE=7,sp="attached",XE="detached",ug=300,eo=301,to=302,Qu=303,eh=304,Vc=306,es=1e3,er=1001,ta=1002,En=1003,_h=1004,Ys=1005,Pn=1006,Zo=1007,Ri=1008,Lr=1009,qE=1010,YE=1011,hg=1012,fg=1013,no=1014,Ci=1015,Dc=1016,dg=1017,pg=1018,sa=1020,jE=35902,KE=1021,ZE=1022,ii=1023,$E=1024,JE=1025,$s=1026,na=1027,mg=1028,gg=1029,QE=1030,_g=1031,vg=1033,cu=33776,lu=33777,uu=33778,hu=33779,op=35840,ap=35841,cp=35842,lp=35843,xg=36196,up=37492,hp=37496,fp=37808,dp=37809,pp=37810,mp=37811,gp=37812,_p=37813,vp=37814,xp=37815,yp=37816,Sp=37817,Mp=37818,Ep=37819,Tp=37820,bp=37821,fu=36492,Ap=36494,wp=36495,eT=36283,Rp=36284,Cp=36285,Lp=36286,io=2300,ts=2301,du=2302,Pp=2400,Ip=2401,Dp=2402,tT=2500,nT=0,yg=1,th=2,iT=3200,rT=3201,Sg=0,sT=1,Qi="",nn="srgb",hn="srgb-linear",vh="display-p3",Wc="display-p3-linear",Uc="linear",kt="srgb",Nc="rec709",Oc="p3",Ts=7680,Up=519,oT=512,aT=513,cT=514,Mg=515,lT=516,uT=517,hT=518,fT=519,nh=35044,Np="300 es",tr=2e3,Fc=2001;class rs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const o=i.indexOf(t);o!==-1&&i.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let o=0,c=i.length;o<c;o++)i[o].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Op=1234567;const $o=Math.PI/180,ro=180/Math.PI;function _i(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xn[s&255]+xn[s>>8&255]+xn[s>>16&255]+xn[s>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]).toLowerCase()}function pn(s,e,t){return Math.max(e,Math.min(t,s))}function xh(s,e){return(s%e+e)%e}function dT(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function pT(s,e,t){return s!==e?(t-s)/(e-s):0}function Jo(s,e,t){return(1-t)*s+t*e}function mT(s,e,t,n){return Jo(s,e,1-Math.exp(-t*n))}function gT(s,e=1){return e-Math.abs(xh(s,e*2)-e)}function _T(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function vT(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function xT(s,e){return s+Math.floor(Math.random()*(e-s+1))}function yT(s,e){return s+Math.random()*(e-s)}function ST(s){return s*(.5-Math.random())}function MT(s){s!==void 0&&(Op=s);let e=Op+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ET(s){return s*$o}function TT(s){return s*ro}function bT(s){return(s&s-1)===0&&s!==0}function AT(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function wT(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function RT(s,e,t,n,i){const o=Math.cos,c=Math.sin,l=o(t/2),h=c(t/2),f=o((e+n)/2),d=c((e+n)/2),p=o((e-n)/2),m=c((e-n)/2),v=o((n-e)/2),M=c((n-e)/2);switch(i){case"XYX":s.set(l*d,h*p,h*m,l*f);break;case"YZY":s.set(h*m,l*d,h*p,l*f);break;case"ZXZ":s.set(h*p,h*m,l*d,l*f);break;case"XZX":s.set(l*d,h*M,h*v,l*f);break;case"YXY":s.set(h*v,l*d,h*M,l*f);break;case"ZYZ":s.set(h*M,h*v,l*d,l*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function mi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Pt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const vi={DEG2RAD:$o,RAD2DEG:ro,generateUUID:_i,clamp:pn,euclideanModulo:xh,mapLinear:dT,inverseLerp:pT,lerp:Jo,damp:mT,pingpong:gT,smoothstep:_T,smootherstep:vT,randInt:xT,randFloat:yT,randFloatSpread:ST,seededRandom:MT,degToRad:ET,radToDeg:TT,isPowerOfTwo:bT,ceilPowerOfTwo:AT,floorPowerOfTwo:wT,setQuaternionFromProperEuler:RT,normalize:Pt,denormalize:mi};class Ne{constructor(e=0,t=0){Ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),o=this.x-e.x,c=this.y-e.y;return this.x=o*n-c*i+e.x,this.y=o*i+c*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class at{constructor(e,t,n,i,o,c,l,h,f){at.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,c,l,h,f)}set(e,t,n,i,o,c,l,h,f){const d=this.elements;return d[0]=e,d[1]=i,d[2]=l,d[3]=t,d[4]=o,d[5]=h,d[6]=n,d[7]=c,d[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,c=n[0],l=n[3],h=n[6],f=n[1],d=n[4],p=n[7],m=n[2],v=n[5],M=n[8],E=i[0],x=i[3],_=i[6],P=i[1],T=i[4],I=i[7],k=i[2],O=i[5],D=i[8];return o[0]=c*E+l*P+h*k,o[3]=c*x+l*T+h*O,o[6]=c*_+l*I+h*D,o[1]=f*E+d*P+p*k,o[4]=f*x+d*T+p*O,o[7]=f*_+d*I+p*D,o[2]=m*E+v*P+M*k,o[5]=m*x+v*T+M*O,o[8]=m*_+v*I+M*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8];return t*c*d-t*l*f-n*o*d+n*l*h+i*o*f-i*c*h}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8],p=d*c-l*f,m=l*h-d*o,v=f*o-c*h,M=t*p+n*m+i*v;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=p*E,e[1]=(i*f-d*n)*E,e[2]=(l*n-i*c)*E,e[3]=m*E,e[4]=(d*t-i*h)*E,e[5]=(i*o-l*t)*E,e[6]=v*E,e[7]=(n*h-f*t)*E,e[8]=(c*t-n*o)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,o,c,l){const h=Math.cos(o),f=Math.sin(o);return this.set(n*h,n*f,-n*(h*c+f*l)+c+e,-i*f,i*h,-i*(-f*c+h*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(pu.makeScale(e,t)),this}rotate(e){return this.premultiply(pu.makeRotation(-e)),this}translate(e,t){return this.premultiply(pu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pu=new at;function Eg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ia(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function CT(){const s=ia("canvas");return s.style.display="block",s}const Fp={};function Tg(s){s in Fp||(Fp[s]=!0,console.warn(s))}const Bp=new at().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),kp=new at().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),$a={[hn]:{transfer:Uc,primaries:Nc,toReference:s=>s,fromReference:s=>s},[nn]:{transfer:kt,primaries:Nc,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Wc]:{transfer:Uc,primaries:Oc,toReference:s=>s.applyMatrix3(kp),fromReference:s=>s.applyMatrix3(Bp)},[vh]:{transfer:kt,primaries:Oc,toReference:s=>s.convertSRGBToLinear().applyMatrix3(kp),fromReference:s=>s.applyMatrix3(Bp).convertLinearToSRGB()}},LT=new Set([hn,Wc]),Ct={enabled:!0,_workingColorSpace:hn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!LT.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=$a[e].toReference,i=$a[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return $a[s].primaries},getTransfer:function(s){return s===Qi?Uc:$a[s].transfer}};function Js(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function mu(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let bs;class PT{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{bs===void 0&&(bs=ia("canvas")),bs.width=e.width,bs.height=e.height;const n=bs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=bs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ia("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),o=i.data;for(let c=0;c<o.length;c++)o[c]=Js(o[c]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Js(t[n]/255)*255):t[n]=Js(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let IT=0;class yh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:IT++}),this.uuid=_i(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let c=0,l=i.length;c<l;c++)i[c].isDataTexture?o.push(gu(i[c].image)):o.push(gu(i[c]))}else o=gu(i);n.url=o}return t||(e.images[this.uuid]=n),n}}function gu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?PT.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let DT=0;class Zt extends rs{constructor(e=Zt.DEFAULT_IMAGE,t=Zt.DEFAULT_MAPPING,n=er,i=er,o=Pn,c=Ri,l=ii,h=Lr,f=Zt.DEFAULT_ANISOTROPY,d=Qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:DT++}),this.uuid=_i(),this.name="",this.source=new yh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=c,this.anisotropy=f,this.format=l,this.internalFormat=null,this.type=h,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ug)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case es:e.x=e.x-Math.floor(e.x);break;case er:e.x=e.x<0?0:1;break;case ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case es:e.y=e.y-Math.floor(e.y);break;case er:e.y=e.y<0?0:1;break;case ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=ug;Zt.DEFAULT_ANISOTROPY=1;class It{constructor(e=0,t=0,n=0,i=1){It.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=this.w,c=e.elements;return this.x=c[0]*t+c[4]*n+c[8]*i+c[12]*o,this.y=c[1]*t+c[5]*n+c[9]*i+c[13]*o,this.z=c[2]*t+c[6]*n+c[10]*i+c[14]*o,this.w=c[3]*t+c[7]*n+c[11]*i+c[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,o;const h=e.elements,f=h[0],d=h[4],p=h[8],m=h[1],v=h[5],M=h[9],E=h[2],x=h[6],_=h[10];if(Math.abs(d-m)<.01&&Math.abs(p-E)<.01&&Math.abs(M-x)<.01){if(Math.abs(d+m)<.1&&Math.abs(p+E)<.1&&Math.abs(M+x)<.1&&Math.abs(f+v+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(f+1)/2,I=(v+1)/2,k=(_+1)/2,O=(d+m)/4,D=(p+E)/4,V=(M+x)/4;return T>I&&T>k?T<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(T),i=O/n,o=D/n):I>k?I<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(I),n=O/i,o=V/i):k<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(k),n=D/o,i=V/o),this.set(n,i,o,t),this}let P=Math.sqrt((x-M)*(x-M)+(p-E)*(p-E)+(m-d)*(m-d));return Math.abs(P)<.001&&(P=1),this.x=(x-M)/P,this.y=(p-E)/P,this.z=(m-d)/P,this.w=Math.acos((f+v+_-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class UT extends rs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new Zt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const c=n.count;for(let l=0;l<c;l++)this.textures[l]=o.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new yh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends UT{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class bg extends Zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=En,this.minFilter=En,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class NT extends Zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=En,this.minFilter=En,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xi{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,o,c,l){let h=n[i+0],f=n[i+1],d=n[i+2],p=n[i+3];const m=o[c+0],v=o[c+1],M=o[c+2],E=o[c+3];if(l===0){e[t+0]=h,e[t+1]=f,e[t+2]=d,e[t+3]=p;return}if(l===1){e[t+0]=m,e[t+1]=v,e[t+2]=M,e[t+3]=E;return}if(p!==E||h!==m||f!==v||d!==M){let x=1-l;const _=h*m+f*v+d*M+p*E,P=_>=0?1:-1,T=1-_*_;if(T>Number.EPSILON){const k=Math.sqrt(T),O=Math.atan2(k,_*P);x=Math.sin(x*O)/k,l=Math.sin(l*O)/k}const I=l*P;if(h=h*x+m*I,f=f*x+v*I,d=d*x+M*I,p=p*x+E*I,x===1-l){const k=1/Math.sqrt(h*h+f*f+d*d+p*p);h*=k,f*=k,d*=k,p*=k}}e[t]=h,e[t+1]=f,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,i,o,c){const l=n[i],h=n[i+1],f=n[i+2],d=n[i+3],p=o[c],m=o[c+1],v=o[c+2],M=o[c+3];return e[t]=l*M+d*p+h*v-f*m,e[t+1]=h*M+d*m+f*p-l*v,e[t+2]=f*M+d*v+l*m-h*p,e[t+3]=d*M-l*p-h*m-f*v,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,o=e._z,c=e._order,l=Math.cos,h=Math.sin,f=l(n/2),d=l(i/2),p=l(o/2),m=h(n/2),v=h(i/2),M=h(o/2);switch(c){case"XYZ":this._x=m*d*p+f*v*M,this._y=f*v*p-m*d*M,this._z=f*d*M+m*v*p,this._w=f*d*p-m*v*M;break;case"YXZ":this._x=m*d*p+f*v*M,this._y=f*v*p-m*d*M,this._z=f*d*M-m*v*p,this._w=f*d*p+m*v*M;break;case"ZXY":this._x=m*d*p-f*v*M,this._y=f*v*p+m*d*M,this._z=f*d*M+m*v*p,this._w=f*d*p-m*v*M;break;case"ZYX":this._x=m*d*p-f*v*M,this._y=f*v*p+m*d*M,this._z=f*d*M-m*v*p,this._w=f*d*p+m*v*M;break;case"YZX":this._x=m*d*p+f*v*M,this._y=f*v*p+m*d*M,this._z=f*d*M-m*v*p,this._w=f*d*p-m*v*M;break;case"XZY":this._x=m*d*p-f*v*M,this._y=f*v*p-m*d*M,this._z=f*d*M+m*v*p,this._w=f*d*p+m*v*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],o=t[8],c=t[1],l=t[5],h=t[9],f=t[2],d=t[6],p=t[10],m=n+l+p;if(m>0){const v=.5/Math.sqrt(m+1);this._w=.25/v,this._x=(d-h)*v,this._y=(o-f)*v,this._z=(c-i)*v}else if(n>l&&n>p){const v=2*Math.sqrt(1+n-l-p);this._w=(d-h)/v,this._x=.25*v,this._y=(i+c)/v,this._z=(o+f)/v}else if(l>p){const v=2*Math.sqrt(1+l-n-p);this._w=(o-f)/v,this._x=(i+c)/v,this._y=.25*v,this._z=(h+d)/v}else{const v=2*Math.sqrt(1+p-n-l);this._w=(c-i)/v,this._x=(o+f)/v,this._y=(h+d)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,o=e._z,c=e._w,l=t._x,h=t._y,f=t._z,d=t._w;return this._x=n*d+c*l+i*f-o*h,this._y=i*d+c*h+o*l-n*f,this._z=o*d+c*f+n*h-i*l,this._w=c*d-n*l-i*h-o*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,o=this._z,c=this._w;let l=c*e._w+n*e._x+i*e._y+o*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=c,this._x=n,this._y=i,this._z=o,this;const h=1-l*l;if(h<=Number.EPSILON){const v=1-t;return this._w=v*c+t*this._w,this._x=v*n+t*this._x,this._y=v*i+t*this._y,this._z=v*o+t*this._z,this.normalize(),this}const f=Math.sqrt(h),d=Math.atan2(f,l),p=Math.sin((1-t)*d)/f,m=Math.sin(t*d)/f;return this._w=c*p+this._w*m,this._x=n*p+this._x*m,this._y=i*p+this._y*m,this._z=o*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zp.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*i,this.y=o[1]*t+o[4]*n+o[7]*i,this.z=o[2]*t+o[5]*n+o[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=e.elements,c=1/(o[3]*t+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*i+o[12])*c,this.y=(o[1]*t+o[5]*n+o[9]*i+o[13])*c,this.z=(o[2]*t+o[6]*n+o[10]*i+o[14])*c,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,o=e.x,c=e.y,l=e.z,h=e.w,f=2*(c*i-l*n),d=2*(l*t-o*i),p=2*(o*n-c*t);return this.x=t+h*f+c*p-l*d,this.y=n+h*d+l*f-o*p,this.z=i+h*p+o*d-c*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i,this.y=o[1]*t+o[5]*n+o[9]*i,this.z=o[2]*t+o[6]*n+o[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,o=e.z,c=t.x,l=t.y,h=t.z;return this.x=i*h-o*l,this.y=o*c-n*h,this.z=n*l-i*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _u.copy(this).projectOnVector(e),this.sub(_u)}reflect(e){return this.sub(_u.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _u=new F,zp=new xi;class yi{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=hi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let c=0,l=o.count;c<l;c++)e.isMesh===!0?e.getVertexPosition(c,hi):hi.fromBufferAttribute(o,c),hi.applyMatrix4(e.matrixWorld),this.expandByPoint(hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ja.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ja.copy(n.boundingBox)),Ja.applyMatrix4(e.matrixWorld),this.union(Ja)}const i=e.children;for(let o=0,c=i.length;o<c;o++)this.expandByObject(i[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,hi),hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Uo),Qa.subVectors(this.max,Uo),As.subVectors(e.a,Uo),ws.subVectors(e.b,Uo),Rs.subVectors(e.c,Uo),vr.subVectors(ws,As),xr.subVectors(Rs,ws),Gr.subVectors(As,Rs);let t=[0,-vr.z,vr.y,0,-xr.z,xr.y,0,-Gr.z,Gr.y,vr.z,0,-vr.x,xr.z,0,-xr.x,Gr.z,0,-Gr.x,-vr.y,vr.x,0,-xr.y,xr.x,0,-Gr.y,Gr.x,0];return!vu(t,As,ws,Rs,Qa)||(t=[1,0,0,0,1,0,0,0,1],!vu(t,As,ws,Rs,Qa))?!1:(ec.crossVectors(vr,xr),t=[ec.x,ec.y,ec.z],vu(t,As,ws,Rs,Qa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const qi=[new F,new F,new F,new F,new F,new F,new F,new F],hi=new F,Ja=new yi,As=new F,ws=new F,Rs=new F,vr=new F,xr=new F,Gr=new F,Uo=new F,Qa=new F,ec=new F,Vr=new F;function vu(s,e,t,n,i){for(let o=0,c=s.length-3;o<=c;o+=3){Vr.fromArray(s,o);const l=i.x*Math.abs(Vr.x)+i.y*Math.abs(Vr.y)+i.z*Math.abs(Vr.z),h=e.dot(Vr),f=t.dot(Vr),d=n.dot(Vr);if(Math.max(-Math.max(h,f,d),Math.min(h,f,d))>l)return!1}return!0}const OT=new yi,No=new F,xu=new F;class Ui{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):OT.setFromPoints(e).getCenter(n);let i=0;for(let o=0,c=e.length;o<c;o++)i=Math.max(i,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;No.subVectors(e,this.center);const t=No.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(No,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(No.copy(e.center).add(xu)),this.expandByPoint(No.copy(e.center).sub(xu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Yi=new F,yu=new F,tc=new F,yr=new F,Su=new F,nc=new F,Mu=new F;class co{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yi.copy(this.origin).addScaledVector(this.direction,t),Yi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){yu.copy(e).add(t).multiplyScalar(.5),tc.copy(t).sub(e).normalize(),yr.copy(this.origin).sub(yu);const o=e.distanceTo(t)*.5,c=-this.direction.dot(tc),l=yr.dot(this.direction),h=-yr.dot(tc),f=yr.lengthSq(),d=Math.abs(1-c*c);let p,m,v,M;if(d>0)if(p=c*h-l,m=c*l-h,M=o*d,p>=0)if(m>=-M)if(m<=M){const E=1/d;p*=E,m*=E,v=p*(p+c*m+2*l)+m*(c*p+m+2*h)+f}else m=o,p=Math.max(0,-(c*m+l)),v=-p*p+m*(m+2*h)+f;else m=-o,p=Math.max(0,-(c*m+l)),v=-p*p+m*(m+2*h)+f;else m<=-M?(p=Math.max(0,-(-c*o+l)),m=p>0?-o:Math.min(Math.max(-o,-h),o),v=-p*p+m*(m+2*h)+f):m<=M?(p=0,m=Math.min(Math.max(-o,-h),o),v=m*(m+2*h)+f):(p=Math.max(0,-(c*o+l)),m=p>0?o:Math.min(Math.max(-o,-h),o),v=-p*p+m*(m+2*h)+f);else m=c>0?-o:o,p=Math.max(0,-(c*m+l)),v=-p*p+m*(m+2*h)+f;return n&&n.copy(this.origin).addScaledVector(this.direction,p),i&&i.copy(yu).addScaledVector(tc,m),v}intersectSphere(e,t){Yi.subVectors(e.center,this.origin);const n=Yi.dot(this.direction),i=Yi.dot(Yi)-n*n,o=e.radius*e.radius;if(i>o)return null;const c=Math.sqrt(o-i),l=n-c,h=n+c;return h<0?null:l<0?this.at(h,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,o,c,l,h;const f=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,m=this.origin;return f>=0?(n=(e.min.x-m.x)*f,i=(e.max.x-m.x)*f):(n=(e.max.x-m.x)*f,i=(e.min.x-m.x)*f),d>=0?(o=(e.min.y-m.y)*d,c=(e.max.y-m.y)*d):(o=(e.max.y-m.y)*d,c=(e.min.y-m.y)*d),n>c||o>i||((o>n||isNaN(n))&&(n=o),(c<i||isNaN(i))&&(i=c),p>=0?(l=(e.min.z-m.z)*p,h=(e.max.z-m.z)*p):(l=(e.max.z-m.z)*p,h=(e.min.z-m.z)*p),n>h||l>i)||((l>n||n!==n)&&(n=l),(h<i||i!==i)&&(i=h),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Yi)!==null}intersectTriangle(e,t,n,i,o){Su.subVectors(t,e),nc.subVectors(n,e),Mu.crossVectors(Su,nc);let c=this.direction.dot(Mu),l;if(c>0){if(i)return null;l=1}else if(c<0)l=-1,c=-c;else return null;yr.subVectors(this.origin,e);const h=l*this.direction.dot(nc.crossVectors(yr,nc));if(h<0)return null;const f=l*this.direction.dot(Su.cross(yr));if(f<0||h+f>c)return null;const d=-l*yr.dot(Mu);return d<0?null:this.at(d/c,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Je{constructor(e,t,n,i,o,c,l,h,f,d,p,m,v,M,E,x){Je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,c,l,h,f,d,p,m,v,M,E,x)}set(e,t,n,i,o,c,l,h,f,d,p,m,v,M,E,x){const _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=i,_[1]=o,_[5]=c,_[9]=l,_[13]=h,_[2]=f,_[6]=d,_[10]=p,_[14]=m,_[3]=v,_[7]=M,_[11]=E,_[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Cs.setFromMatrixColumn(e,0).length(),o=1/Cs.setFromMatrixColumn(e,1).length(),c=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*c,t[9]=n[9]*c,t[10]=n[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,o=e.z,c=Math.cos(n),l=Math.sin(n),h=Math.cos(i),f=Math.sin(i),d=Math.cos(o),p=Math.sin(o);if(e.order==="XYZ"){const m=c*d,v=c*p,M=l*d,E=l*p;t[0]=h*d,t[4]=-h*p,t[8]=f,t[1]=v+M*f,t[5]=m-E*f,t[9]=-l*h,t[2]=E-m*f,t[6]=M+v*f,t[10]=c*h}else if(e.order==="YXZ"){const m=h*d,v=h*p,M=f*d,E=f*p;t[0]=m+E*l,t[4]=M*l-v,t[8]=c*f,t[1]=c*p,t[5]=c*d,t[9]=-l,t[2]=v*l-M,t[6]=E+m*l,t[10]=c*h}else if(e.order==="ZXY"){const m=h*d,v=h*p,M=f*d,E=f*p;t[0]=m-E*l,t[4]=-c*p,t[8]=M+v*l,t[1]=v+M*l,t[5]=c*d,t[9]=E-m*l,t[2]=-c*f,t[6]=l,t[10]=c*h}else if(e.order==="ZYX"){const m=c*d,v=c*p,M=l*d,E=l*p;t[0]=h*d,t[4]=M*f-v,t[8]=m*f+E,t[1]=h*p,t[5]=E*f+m,t[9]=v*f-M,t[2]=-f,t[6]=l*h,t[10]=c*h}else if(e.order==="YZX"){const m=c*h,v=c*f,M=l*h,E=l*f;t[0]=h*d,t[4]=E-m*p,t[8]=M*p+v,t[1]=p,t[5]=c*d,t[9]=-l*d,t[2]=-f*d,t[6]=v*p+M,t[10]=m-E*p}else if(e.order==="XZY"){const m=c*h,v=c*f,M=l*h,E=l*f;t[0]=h*d,t[4]=-p,t[8]=f*d,t[1]=m*p+E,t[5]=c*d,t[9]=v*p-M,t[2]=M*p-v,t[6]=l*d,t[10]=E*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(FT,e,BT)}lookAt(e,t,n){const i=this.elements;return Wn.subVectors(e,t),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),Sr.crossVectors(n,Wn),Sr.lengthSq()===0&&(Math.abs(n.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),Sr.crossVectors(n,Wn)),Sr.normalize(),ic.crossVectors(Wn,Sr),i[0]=Sr.x,i[4]=ic.x,i[8]=Wn.x,i[1]=Sr.y,i[5]=ic.y,i[9]=Wn.y,i[2]=Sr.z,i[6]=ic.z,i[10]=Wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,c=n[0],l=n[4],h=n[8],f=n[12],d=n[1],p=n[5],m=n[9],v=n[13],M=n[2],E=n[6],x=n[10],_=n[14],P=n[3],T=n[7],I=n[11],k=n[15],O=i[0],D=i[4],V=i[8],C=i[12],w=i[1],X=i[5],J=i[9],z=i[13],te=i[2],ce=i[6],ue=i[10],xe=i[14],Q=i[3],ge=i[7],de=i[11],Ae=i[15];return o[0]=c*O+l*w+h*te+f*Q,o[4]=c*D+l*X+h*ce+f*ge,o[8]=c*V+l*J+h*ue+f*de,o[12]=c*C+l*z+h*xe+f*Ae,o[1]=d*O+p*w+m*te+v*Q,o[5]=d*D+p*X+m*ce+v*ge,o[9]=d*V+p*J+m*ue+v*de,o[13]=d*C+p*z+m*xe+v*Ae,o[2]=M*O+E*w+x*te+_*Q,o[6]=M*D+E*X+x*ce+_*ge,o[10]=M*V+E*J+x*ue+_*de,o[14]=M*C+E*z+x*xe+_*Ae,o[3]=P*O+T*w+I*te+k*Q,o[7]=P*D+T*X+I*ce+k*ge,o[11]=P*V+T*J+I*ue+k*de,o[15]=P*C+T*z+I*xe+k*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],o=e[12],c=e[1],l=e[5],h=e[9],f=e[13],d=e[2],p=e[6],m=e[10],v=e[14],M=e[3],E=e[7],x=e[11],_=e[15];return M*(+o*h*p-i*f*p-o*l*m+n*f*m+i*l*v-n*h*v)+E*(+t*h*v-t*f*m+o*c*m-i*c*v+i*f*d-o*h*d)+x*(+t*f*p-t*l*v-o*c*p+n*c*v+o*l*d-n*f*d)+_*(-i*l*d-t*h*p+t*l*m+i*c*p-n*c*m+n*h*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8],p=e[9],m=e[10],v=e[11],M=e[12],E=e[13],x=e[14],_=e[15],P=p*x*f-E*m*f+E*h*v-l*x*v-p*h*_+l*m*_,T=M*m*f-d*x*f-M*h*v+c*x*v+d*h*_-c*m*_,I=d*E*f-M*p*f+M*l*v-c*E*v-d*l*_+c*p*_,k=M*p*h-d*E*h-M*l*m+c*E*m+d*l*x-c*p*x,O=t*P+n*T+i*I+o*k;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/O;return e[0]=P*D,e[1]=(E*m*o-p*x*o-E*i*v+n*x*v+p*i*_-n*m*_)*D,e[2]=(l*x*o-E*h*o+E*i*f-n*x*f-l*i*_+n*h*_)*D,e[3]=(p*h*o-l*m*o-p*i*f+n*m*f+l*i*v-n*h*v)*D,e[4]=T*D,e[5]=(d*x*o-M*m*o+M*i*v-t*x*v-d*i*_+t*m*_)*D,e[6]=(M*h*o-c*x*o-M*i*f+t*x*f+c*i*_-t*h*_)*D,e[7]=(c*m*o-d*h*o+d*i*f-t*m*f-c*i*v+t*h*v)*D,e[8]=I*D,e[9]=(M*p*o-d*E*o-M*n*v+t*E*v+d*n*_-t*p*_)*D,e[10]=(c*E*o-M*l*o+M*n*f-t*E*f-c*n*_+t*l*_)*D,e[11]=(d*l*o-c*p*o-d*n*f+t*p*f+c*n*v-t*l*v)*D,e[12]=k*D,e[13]=(d*E*i-M*p*i+M*n*m-t*E*m-d*n*x+t*p*x)*D,e[14]=(M*l*i-c*E*i-M*n*h+t*E*h+c*n*x-t*l*x)*D,e[15]=(c*p*i-d*l*i+d*n*h-t*p*h-c*n*m+t*l*m)*D,this}scale(e){const t=this.elements,n=e.x,i=e.y,o=e.z;return t[0]*=n,t[4]*=i,t[8]*=o,t[1]*=n,t[5]*=i,t[9]*=o,t[2]*=n,t[6]*=i,t[10]*=o,t[3]*=n,t[7]*=i,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),o=1-n,c=e.x,l=e.y,h=e.z,f=o*c,d=o*l;return this.set(f*c+n,f*l-i*h,f*h+i*l,0,f*l+i*h,d*l+n,d*h-i*c,0,f*h-i*l,d*h+i*c,o*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,o,c){return this.set(1,n,o,0,e,1,c,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,o=t._x,c=t._y,l=t._z,h=t._w,f=o+o,d=c+c,p=l+l,m=o*f,v=o*d,M=o*p,E=c*d,x=c*p,_=l*p,P=h*f,T=h*d,I=h*p,k=n.x,O=n.y,D=n.z;return i[0]=(1-(E+_))*k,i[1]=(v+I)*k,i[2]=(M-T)*k,i[3]=0,i[4]=(v-I)*O,i[5]=(1-(m+_))*O,i[6]=(x+P)*O,i[7]=0,i[8]=(M+T)*D,i[9]=(x-P)*D,i[10]=(1-(m+E))*D,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let o=Cs.set(i[0],i[1],i[2]).length();const c=Cs.set(i[4],i[5],i[6]).length(),l=Cs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),e.x=i[12],e.y=i[13],e.z=i[14],fi.copy(this);const f=1/o,d=1/c,p=1/l;return fi.elements[0]*=f,fi.elements[1]*=f,fi.elements[2]*=f,fi.elements[4]*=d,fi.elements[5]*=d,fi.elements[6]*=d,fi.elements[8]*=p,fi.elements[9]*=p,fi.elements[10]*=p,t.setFromRotationMatrix(fi),n.x=o,n.y=c,n.z=l,this}makePerspective(e,t,n,i,o,c,l=tr){const h=this.elements,f=2*o/(t-e),d=2*o/(n-i),p=(t+e)/(t-e),m=(n+i)/(n-i);let v,M;if(l===tr)v=-(c+o)/(c-o),M=-2*c*o/(c-o);else if(l===Fc)v=-c/(c-o),M=-c*o/(c-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=f,h[4]=0,h[8]=p,h[12]=0,h[1]=0,h[5]=d,h[9]=m,h[13]=0,h[2]=0,h[6]=0,h[10]=v,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,i,o,c,l=tr){const h=this.elements,f=1/(t-e),d=1/(n-i),p=1/(c-o),m=(t+e)*f,v=(n+i)*d;let M,E;if(l===tr)M=(c+o)*p,E=-2*p;else if(l===Fc)M=o*p,E=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=2*f,h[4]=0,h[8]=0,h[12]=-m,h[1]=0,h[5]=2*d,h[9]=0,h[13]=-v,h[2]=0,h[6]=0,h[10]=E,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Cs=new F,fi=new Je,FT=new F(0,0,0),BT=new F(1,1,1),Sr=new F,ic=new F,Wn=new F,Hp=new Je,Gp=new xi;class Pi{constructor(e=0,t=0,n=0,i=Pi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,o=i[0],c=i[4],l=i[8],h=i[1],f=i[5],d=i[9],p=i[2],m=i[6],v=i[10];switch(t){case"XYZ":this._y=Math.asin(pn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,v),this._z=Math.atan2(-c,o)):(this._x=Math.atan2(m,f),this._z=0);break;case"YXZ":this._x=Math.asin(-pn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,v),this._z=Math.atan2(h,f)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(pn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,v),this._z=Math.atan2(-c,f)):(this._y=0,this._z=Math.atan2(h,o));break;case"ZYX":this._y=Math.asin(-pn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,v),this._z=Math.atan2(h,o)):(this._x=0,this._z=Math.atan2(-c,f));break;case"YZX":this._z=Math.asin(pn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,f),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(l,v));break;case"XZY":this._z=Math.asin(-pn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(m,f),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-d,v),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gp.setFromEuler(this),this.setFromQuaternion(Gp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pi.DEFAULT_ORDER="XYZ";class Sh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kT=0;const Vp=new F,Ls=new xi,ji=new Je,rc=new F,Oo=new F,zT=new F,HT=new xi,Wp=new F(1,0,0),Xp=new F(0,1,0),qp=new F(0,0,1),Yp={type:"added"},GT={type:"removed"},Ps={type:"childadded",child:null},Eu={type:"childremoved",child:null};class St extends rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kT++}),this.uuid=_i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new F,t=new Pi,n=new xi,i=new F(1,1,1);function o(){n.setFromEuler(t,!1)}function c(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Je},normalMatrix:{value:new at}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(Wp,e)}rotateY(e){return this.rotateOnAxis(Xp,e)}rotateZ(e){return this.rotateOnAxis(qp,e)}translateOnAxis(e,t){return Vp.copy(e).applyQuaternion(this.quaternion),this.position.add(Vp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wp,e)}translateY(e){return this.translateOnAxis(Xp,e)}translateZ(e){return this.translateOnAxis(qp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ji.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?rc.copy(e):rc.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ji.lookAt(Oo,rc,this.up):ji.lookAt(rc,Oo,this.up),this.quaternion.setFromRotationMatrix(ji),i&&(ji.extractRotation(i.matrixWorld),Ls.setFromRotationMatrix(ji),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yp),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(GT),Eu.child=e,this.dispatchEvent(Eu),Eu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(ji),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yp),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const c=this.children[n].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let o=0,c=i.length;o<c;o++)i[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,e,zT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,HT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let o=0,c=i.length;o<c;o++){const l=i[o];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const h=l.shapes;if(Array.isArray(h))for(let f=0,d=h.length;f<d;f++){const p=h[f];o(e.shapes,p)}else o(e.shapes,h)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let h=0,f=this.material.length;h<f;h++)l.push(o(e.materials,this.material[h]));i.material=l}else i.material=o(e.materials,this.material);if(this.children.length>0){i.children=[];for(let l=0;l<this.children.length;l++)i.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let l=0;l<this.animations.length;l++){const h=this.animations[l];i.animations.push(o(e.animations,h))}}if(t){const l=c(e.geometries),h=c(e.materials),f=c(e.textures),d=c(e.images),p=c(e.shapes),m=c(e.skeletons),v=c(e.animations),M=c(e.nodes);l.length>0&&(n.geometries=l),h.length>0&&(n.materials=h),f.length>0&&(n.textures=f),d.length>0&&(n.images=d),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),v.length>0&&(n.animations=v),M.length>0&&(n.nodes=M)}return n.object=i,n;function c(l){const h=[];for(const f in l){const d=l[f];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}St.DEFAULT_UP=new F(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const di=new F,Ki=new F,Tu=new F,Zi=new F,Is=new F,Ds=new F,jp=new F,bu=new F,Au=new F,wu=new F;class gi{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),di.subVectors(e,t),i.cross(di);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(e,t,n,i,o){di.subVectors(i,t),Ki.subVectors(n,t),Tu.subVectors(e,t);const c=di.dot(di),l=di.dot(Ki),h=di.dot(Tu),f=Ki.dot(Ki),d=Ki.dot(Tu),p=c*f-l*l;if(p===0)return o.set(0,0,0),null;const m=1/p,v=(f*h-l*d)*m,M=(c*d-l*h)*m;return o.set(1-v-M,M,v)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Zi)===null?!1:Zi.x>=0&&Zi.y>=0&&Zi.x+Zi.y<=1}static getInterpolation(e,t,n,i,o,c,l,h){return this.getBarycoord(e,t,n,i,Zi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(o,Zi.x),h.addScaledVector(c,Zi.y),h.addScaledVector(l,Zi.z),h)}static isFrontFacing(e,t,n,i){return di.subVectors(n,t),Ki.subVectors(e,t),di.cross(Ki).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return di.subVectors(this.c,this.b),Ki.subVectors(this.a,this.b),di.cross(Ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,o){return gi.getInterpolation(e,this.a,this.b,this.c,t,n,i,o)}containsPoint(e){return gi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,o=this.c;let c,l;Is.subVectors(i,n),Ds.subVectors(o,n),bu.subVectors(e,n);const h=Is.dot(bu),f=Ds.dot(bu);if(h<=0&&f<=0)return t.copy(n);Au.subVectors(e,i);const d=Is.dot(Au),p=Ds.dot(Au);if(d>=0&&p<=d)return t.copy(i);const m=h*p-d*f;if(m<=0&&h>=0&&d<=0)return c=h/(h-d),t.copy(n).addScaledVector(Is,c);wu.subVectors(e,o);const v=Is.dot(wu),M=Ds.dot(wu);if(M>=0&&v<=M)return t.copy(o);const E=v*f-h*M;if(E<=0&&f>=0&&M<=0)return l=f/(f-M),t.copy(n).addScaledVector(Ds,l);const x=d*M-v*p;if(x<=0&&p-d>=0&&v-M>=0)return jp.subVectors(o,i),l=(p-d)/(p-d+(v-M)),t.copy(i).addScaledVector(jp,l);const _=1/(x+E+m);return c=E*_,l=m*_,t.copy(n).addScaledVector(Is,c).addScaledVector(Ds,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ag={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mr={h:0,s:0,l:0},sc={h:0,s:0,l:0};function Ru(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ct.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ct.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ct.workingColorSpace){if(e=xh(e,1),t=pn(t,0,1),n=pn(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,c=2*n-o;this.r=Ru(c,o,e+1/3),this.g=Ru(c,o,e),this.b=Ru(c,o,e-1/3)}return Ct.toWorkingColorSpace(this,i),this}setStyle(e,t=nn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const c=i[1],l=i[2];switch(c){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=i[1],c=o.length;if(c===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){const n=Ag[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Js(e.r),this.g=Js(e.g),this.b=Js(e.b),this}copyLinearToSRGB(e){return this.r=mu(e.r),this.g=mu(e.g),this.b=mu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return Ct.fromWorkingColorSpace(yn.copy(this),e),Math.round(pn(yn.r*255,0,255))*65536+Math.round(pn(yn.g*255,0,255))*256+Math.round(pn(yn.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.fromWorkingColorSpace(yn.copy(this),t);const n=yn.r,i=yn.g,o=yn.b,c=Math.max(n,i,o),l=Math.min(n,i,o);let h,f;const d=(l+c)/2;if(l===c)h=0,f=0;else{const p=c-l;switch(f=d<=.5?p/(c+l):p/(2-c-l),c){case n:h=(i-o)/p+(i<o?6:0);break;case i:h=(o-n)/p+2;break;case o:h=(n-i)/p+4;break}h/=6}return e.h=h,e.s=f,e.l=d,e}getRGB(e,t=Ct.workingColorSpace){return Ct.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=nn){Ct.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,n=yn.g,i=yn.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Mr),this.setHSL(Mr.h+e,Mr.s+t,Mr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mr),e.getHSL(sc);const n=Jo(Mr.h,sc.h,t),i=Jo(Mr.s,sc.s,t),o=Jo(Mr.l,sc.l,t);return this.setHSL(n,i,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*i,this.g=o[1]*t+o[4]*n+o[7]*i,this.b=o[2]*t+o[5]*n+o[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new De;De.NAMES=Ag;let VT=0;class ri extends rs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:VT++}),this.uuid=_i(),this.name="",this.type="Material",this.blending=Zs,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$u,this.blendDst=Ju,this.blendEquation=$r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=Ic,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Up,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zs&&(n.blending=this.blending),this.side!==Li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$u&&(n.blendSrc=this.blendSrc),this.blendDst!==Ju&&(n.blendDst=this.blendDst),this.blendEquation!==$r&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ic&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Up&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}if(t){const o=i(e.textures),c=i(e.images);o.length>0&&(n.textures=o),c.length>0&&(n.images=c)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class nr extends ri{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi,this.combine=lg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jt=new F,oc=new Ne;class Qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=nh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Tg("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)oc.fromBufferAttribute(this,t),oc.applyMatrix3(e),this.setXY(t,oc.x,oc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=mi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array),o=Pt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nh&&(e.usage=this.usage),e}}class wg extends Qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Rg extends Qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class qt extends Qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let WT=0;const ti=new Je,Cu=new St,Us=new F,Xn=new yi,Fo=new yi,ln=new F;class on extends rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:WT++}),this.uuid=_i(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Eg(e)?Rg:wg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new at().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,n){return ti.makeTranslation(e,t,n),this.applyMatrix4(ti),this}scale(e,t,n){return ti.makeScale(e,t,n),this.applyMatrix4(ti),this}lookAt(e){return Cu.lookAt(e),Cu.updateMatrix(),this.applyMatrix4(Cu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new qt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const o=t[n];Xn.setFromBufferAttribute(o),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let o=0,c=t.length;o<c;o++){const l=t[o];Fo.setFromBufferAttribute(l),this.morphTargetsRelative?(ln.addVectors(Xn.min,Fo.min),Xn.expandByPoint(ln),ln.addVectors(Xn.max,Fo.max),Xn.expandByPoint(ln)):(Xn.expandByPoint(Fo.min),Xn.expandByPoint(Fo.max))}Xn.getCenter(n);let i=0;for(let o=0,c=e.count;o<c;o++)ln.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(ln));if(t)for(let o=0,c=t.length;o<c;o++){const l=t[o],h=this.morphTargetsRelative;for(let f=0,d=l.count;f<d;f++)ln.fromBufferAttribute(l,f),h&&(Us.fromBufferAttribute(e,f),ln.add(Us)),i=Math.max(i,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qt(new Float32Array(4*n.count),4));const c=this.getAttribute("tangent"),l=[],h=[];for(let V=0;V<n.count;V++)l[V]=new F,h[V]=new F;const f=new F,d=new F,p=new F,m=new Ne,v=new Ne,M=new Ne,E=new F,x=new F;function _(V,C,w){f.fromBufferAttribute(n,V),d.fromBufferAttribute(n,C),p.fromBufferAttribute(n,w),m.fromBufferAttribute(o,V),v.fromBufferAttribute(o,C),M.fromBufferAttribute(o,w),d.sub(f),p.sub(f),v.sub(m),M.sub(m);const X=1/(v.x*M.y-M.x*v.y);isFinite(X)&&(E.copy(d).multiplyScalar(M.y).addScaledVector(p,-v.y).multiplyScalar(X),x.copy(p).multiplyScalar(v.x).addScaledVector(d,-M.x).multiplyScalar(X),l[V].add(E),l[C].add(E),l[w].add(E),h[V].add(x),h[C].add(x),h[w].add(x))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let V=0,C=P.length;V<C;++V){const w=P[V],X=w.start,J=w.count;for(let z=X,te=X+J;z<te;z+=3)_(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const T=new F,I=new F,k=new F,O=new F;function D(V){k.fromBufferAttribute(i,V),O.copy(k);const C=l[V];T.copy(C),T.sub(k.multiplyScalar(k.dot(C))).normalize(),I.crossVectors(O,C);const X=I.dot(h[V])<0?-1:1;c.setXYZW(V,T.x,T.y,T.z,X)}for(let V=0,C=P.length;V<C;++V){const w=P[V],X=w.start,J=w.count;for(let z=X,te=X+J;z<te;z+=3)D(e.getX(z+0)),D(e.getX(z+1)),D(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,v=n.count;m<v;m++)n.setXYZ(m,0,0,0);const i=new F,o=new F,c=new F,l=new F,h=new F,f=new F,d=new F,p=new F;if(e)for(let m=0,v=e.count;m<v;m+=3){const M=e.getX(m+0),E=e.getX(m+1),x=e.getX(m+2);i.fromBufferAttribute(t,M),o.fromBufferAttribute(t,E),c.fromBufferAttribute(t,x),d.subVectors(c,o),p.subVectors(i,o),d.cross(p),l.fromBufferAttribute(n,M),h.fromBufferAttribute(n,E),f.fromBufferAttribute(n,x),l.add(d),h.add(d),f.add(d),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(E,h.x,h.y,h.z),n.setXYZ(x,f.x,f.y,f.z)}else for(let m=0,v=t.count;m<v;m+=3)i.fromBufferAttribute(t,m+0),o.fromBufferAttribute(t,m+1),c.fromBufferAttribute(t,m+2),d.subVectors(c,o),p.subVectors(i,o),d.cross(p),n.setXYZ(m+0,d.x,d.y,d.z),n.setXYZ(m+1,d.x,d.y,d.z),n.setXYZ(m+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ln.fromBufferAttribute(e,t),ln.normalize(),e.setXYZ(t,ln.x,ln.y,ln.z)}toNonIndexed(){function e(l,h){const f=l.array,d=l.itemSize,p=l.normalized,m=new f.constructor(h.length*d);let v=0,M=0;for(let E=0,x=h.length;E<x;E++){l.isInterleavedBufferAttribute?v=h[E]*l.data.stride+l.offset:v=h[E]*d;for(let _=0;_<d;_++)m[M++]=f[v++]}return new Qt(m,d,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,n=this.index.array,i=this.attributes;for(const l in i){const h=i[l],f=e(h,n);t.setAttribute(l,f)}const o=this.morphAttributes;for(const l in o){const h=[],f=o[l];for(let d=0,p=f.length;d<p;d++){const m=f[d],v=e(m,n);h.push(v)}t.morphAttributes[l]=h}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let l=0,h=c.length;l<h;l++){const f=c[l];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const f in h)h[f]!==void 0&&(e[f]=h[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const f=n[h];e.data.attributes[h]=f.toJSON(e.data)}const i={};let o=!1;for(const h in this.morphAttributes){const f=this.morphAttributes[h],d=[];for(let p=0,m=f.length;p<m;p++){const v=f[p];d.push(v.toJSON(e.data))}d.length>0&&(i[h]=d,o=!0)}o&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const f in i){const d=i[f];this.setAttribute(f,d.clone(t))}const o=e.morphAttributes;for(const f in o){const d=[],p=o[f];for(let m=0,v=p.length;m<v;m++)d.push(p[m].clone(t));this.morphAttributes[f]=d}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let f=0,d=c.length;f<d;f++){const p=c[f];this.addGroup(p.start,p.count,p.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kp=new Je,Wr=new co,ac=new Ui,Zp=new F,Ns=new F,Os=new F,Fs=new F,Lu=new F,cc=new F,lc=new Ne,uc=new Ne,hc=new Ne,$p=new F,Jp=new F,Qp=new F,fc=new F,dc=new F;class un extends St{constructor(e=new on,t=new nr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=i.length;o<c;o++){const l=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,c=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const l=this.morphTargetInfluences;if(o&&l){cc.set(0,0,0);for(let h=0,f=o.length;h<f;h++){const d=l[h],p=o[h];d!==0&&(Lu.fromBufferAttribute(p,e),c?cc.addScaledVector(Lu,d):cc.addScaledVector(Lu.sub(t),d))}t.add(cc)}return t}raycast(e,t){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ac.copy(n.boundingSphere),ac.applyMatrix4(o),Wr.copy(e.ray).recast(e.near),!(ac.containsPoint(Wr.origin)===!1&&(Wr.intersectSphere(ac,Zp)===null||Wr.origin.distanceToSquared(Zp)>(e.far-e.near)**2))&&(Kp.copy(o).invert(),Wr.copy(e.ray).applyMatrix4(Kp),!(n.boundingBox!==null&&Wr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wr)))}_computeIntersections(e,t,n){let i;const o=this.geometry,c=this.material,l=o.index,h=o.attributes.position,f=o.attributes.uv,d=o.attributes.uv1,p=o.attributes.normal,m=o.groups,v=o.drawRange;if(l!==null)if(Array.isArray(c))for(let M=0,E=m.length;M<E;M++){const x=m[M],_=c[x.materialIndex],P=Math.max(x.start,v.start),T=Math.min(l.count,Math.min(x.start+x.count,v.start+v.count));for(let I=P,k=T;I<k;I+=3){const O=l.getX(I),D=l.getX(I+1),V=l.getX(I+2);i=pc(this,_,e,n,f,d,p,O,D,V),i&&(i.faceIndex=Math.floor(I/3),i.face.materialIndex=x.materialIndex,t.push(i))}}else{const M=Math.max(0,v.start),E=Math.min(l.count,v.start+v.count);for(let x=M,_=E;x<_;x+=3){const P=l.getX(x),T=l.getX(x+1),I=l.getX(x+2);i=pc(this,c,e,n,f,d,p,P,T,I),i&&(i.faceIndex=Math.floor(x/3),t.push(i))}}else if(h!==void 0)if(Array.isArray(c))for(let M=0,E=m.length;M<E;M++){const x=m[M],_=c[x.materialIndex],P=Math.max(x.start,v.start),T=Math.min(h.count,Math.min(x.start+x.count,v.start+v.count));for(let I=P,k=T;I<k;I+=3){const O=I,D=I+1,V=I+2;i=pc(this,_,e,n,f,d,p,O,D,V),i&&(i.faceIndex=Math.floor(I/3),i.face.materialIndex=x.materialIndex,t.push(i))}}else{const M=Math.max(0,v.start),E=Math.min(h.count,v.start+v.count);for(let x=M,_=E;x<_;x+=3){const P=x,T=x+1,I=x+2;i=pc(this,c,e,n,f,d,p,P,T,I),i&&(i.faceIndex=Math.floor(x/3),t.push(i))}}}}function XT(s,e,t,n,i,o,c,l){let h;if(e.side===Fn?h=n.intersectTriangle(c,o,i,!0,l):h=n.intersectTriangle(i,o,c,e.side===Li,l),h===null)return null;dc.copy(l),dc.applyMatrix4(s.matrixWorld);const f=t.ray.origin.distanceTo(dc);return f<t.near||f>t.far?null:{distance:f,point:dc.clone(),object:s}}function pc(s,e,t,n,i,o,c,l,h,f){s.getVertexPosition(l,Ns),s.getVertexPosition(h,Os),s.getVertexPosition(f,Fs);const d=XT(s,e,t,n,Ns,Os,Fs,fc);if(d){i&&(lc.fromBufferAttribute(i,l),uc.fromBufferAttribute(i,h),hc.fromBufferAttribute(i,f),d.uv=gi.getInterpolation(fc,Ns,Os,Fs,lc,uc,hc,new Ne)),o&&(lc.fromBufferAttribute(o,l),uc.fromBufferAttribute(o,h),hc.fromBufferAttribute(o,f),d.uv1=gi.getInterpolation(fc,Ns,Os,Fs,lc,uc,hc,new Ne)),c&&($p.fromBufferAttribute(c,l),Jp.fromBufferAttribute(c,h),Qp.fromBufferAttribute(c,f),d.normal=gi.getInterpolation(fc,Ns,Os,Fs,$p,Jp,Qp,new F),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:l,b:h,c:f,normal:new F,materialIndex:0};gi.getNormal(Ns,Os,Fs,p.normal),d.face=p}return d}class Pr extends on{constructor(e=1,t=1,n=1,i=1,o=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:o,depthSegments:c};const l=this;i=Math.floor(i),o=Math.floor(o),c=Math.floor(c);const h=[],f=[],d=[],p=[];let m=0,v=0;M("z","y","x",-1,-1,n,t,e,c,o,0),M("z","y","x",1,-1,n,t,-e,c,o,1),M("x","z","y",1,1,e,n,t,i,c,2),M("x","z","y",1,-1,e,n,-t,i,c,3),M("x","y","z",1,-1,e,t,n,i,o,4),M("x","y","z",-1,-1,e,t,-n,i,o,5),this.setIndex(h),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(d,3)),this.setAttribute("uv",new qt(p,2));function M(E,x,_,P,T,I,k,O,D,V,C){const w=I/D,X=k/V,J=I/2,z=k/2,te=O/2,ce=D+1,ue=V+1;let xe=0,Q=0;const ge=new F;for(let de=0;de<ue;de++){const Ae=de*X-z;for(let ct=0;ct<ce;ct++){const Tt=ct*w-J;ge[E]=Tt*P,ge[x]=Ae*T,ge[_]=te,f.push(ge.x,ge.y,ge.z),ge[E]=0,ge[x]=0,ge[_]=O>0?1:-1,d.push(ge.x,ge.y,ge.z),p.push(ct/D),p.push(1-de/V),xe+=1}}for(let de=0;de<V;de++)for(let Ae=0;Ae<D;Ae++){const ct=m+Ae+ce*de,Tt=m+Ae+ce*(de+1),ie=m+(Ae+1)+ce*(de+1),me=m+(Ae+1)+ce*de;h.push(ct,Tt,me),h.push(Tt,ie,me),Q+=6}l.addGroup(v,Q,C),v+=Q,m+=xe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function so(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ln(s){const e={};for(let t=0;t<s.length;t++){const n=so(s[t]);for(const i in n)e[i]=n[i]}return e}function qT(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Cg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}const YT={clone:so,merge:Ln};var jT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,KT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sr extends ri{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jT,this.fragmentShader=KT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=so(e.uniforms),this.uniformsGroups=qT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const c=this.uniforms[i].value;c&&c.isTexture?t.uniforms[i]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[i]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[i]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[i]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[i]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[i]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[i]={type:"m4",value:c.toArray()}:t.uniforms[i]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Lg extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=tr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Er=new F,em=new Ne,tm=new Ne;class Mn extends Lg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ro*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($o*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ro*2*Math.atan(Math.tan($o*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Er.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Er.x,Er.y).multiplyScalar(-e/Er.z),Er.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Er.x,Er.y).multiplyScalar(-e/Er.z)}getViewSize(e,t){return this.getViewBounds(e,em,tm),t.subVectors(tm,em)}setViewOffset(e,t,n,i,o,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($o*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,o=-.5*i;const c=this.view;if(this.view!==null&&this.view.enabled){const h=c.fullWidth,f=c.fullHeight;o+=c.offsetX*i/h,t-=c.offsetY*n/f,i*=c.width/h,n*=c.height/f}const l=this.filmOffset;l!==0&&(o+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bs=-90,ks=1;class ZT extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Mn(Bs,ks,e,t);i.layers=this.layers,this.add(i);const o=new Mn(Bs,ks,e,t);o.layers=this.layers,this.add(o);const c=new Mn(Bs,ks,e,t);c.layers=this.layers,this.add(c);const l=new Mn(Bs,ks,e,t);l.layers=this.layers,this.add(l);const h=new Mn(Bs,ks,e,t);h.layers=this.layers,this.add(h);const f=new Mn(Bs,ks,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,o,c,l,h]=t;for(const f of t)this.remove(f);if(e===tr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Fc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,c,l,h,f,d]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,o),e.setRenderTarget(n,1,i),e.render(t,c),e.setRenderTarget(n,2,i),e.render(t,l),e.setRenderTarget(n,3,i),e.render(t,h),e.setRenderTarget(n,4,i),e.render(t,f),n.texture.generateMipmaps=E,e.setRenderTarget(n,5,i),e.render(t,d),e.setRenderTarget(p,m,v),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class Pg extends Zt{constructor(e,t,n,i,o,c,l,h,f,d){e=e!==void 0?e:[],t=t!==void 0?t:eo,super(e,t,n,i,o,c,l,h,f,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ig extends ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Pg(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Pr(5,5,5),o=new sr({name:"CubemapFromEquirect",uniforms:so(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:Cr});o.uniforms.tEquirect.value=t;const c=new un(i,o),l=t.minFilter;return t.minFilter===Ri&&(t.minFilter=Pn),new ZT(1,10,this).update(e,c),t.minFilter=l,c.geometry.dispose(),c.material.dispose(),this}clear(e,t,n,i){const o=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,n,i);e.setRenderTarget(o)}}const Pu=new F,$T=new F,JT=new at;class br{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pu.subVectors(n,t).cross($T.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pu),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||JT.getNormalMatrix(e),i=this.coplanarPoint(Pu).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xr=new Ui,mc=new F;class Mh{constructor(e=new br,t=new br,n=new br,i=new br,o=new br,c=new br){this.planes=[e,t,n,i,o,c]}set(e,t,n,i,o,c){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(i),l[4].copy(o),l[5].copy(c),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=tr){const n=this.planes,i=e.elements,o=i[0],c=i[1],l=i[2],h=i[3],f=i[4],d=i[5],p=i[6],m=i[7],v=i[8],M=i[9],E=i[10],x=i[11],_=i[12],P=i[13],T=i[14],I=i[15];if(n[0].setComponents(h-o,m-f,x-v,I-_).normalize(),n[1].setComponents(h+o,m+f,x+v,I+_).normalize(),n[2].setComponents(h+c,m+d,x+M,I+P).normalize(),n[3].setComponents(h-c,m-d,x-M,I-P).normalize(),n[4].setComponents(h-l,m-p,x-E,I-T).normalize(),t===tr)n[5].setComponents(h+l,m+p,x+E,I+T).normalize();else if(t===Fc)n[5].setComponents(l,p,E,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xr)}intersectsSprite(e){return Xr.center.set(0,0,0),Xr.radius=.7071067811865476,Xr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(mc.x=i.normal.x>0?e.max.x:e.min.x,mc.y=i.normal.y>0?e.max.y:e.min.y,mc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(mc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dg(){let s=null,e=!1,t=null,n=null;function i(o,c){t(o,c),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){s=o}}}function QT(s){const e=new WeakMap;function t(l,h){const f=l.array,d=l.usage,p=f.byteLength,m=s.createBuffer();s.bindBuffer(h,m),s.bufferData(h,f,d),l.onUploadCallback();let v;if(f instanceof Float32Array)v=s.FLOAT;else if(f instanceof Uint16Array)l.isFloat16BufferAttribute?v=s.HALF_FLOAT:v=s.UNSIGNED_SHORT;else if(f instanceof Int16Array)v=s.SHORT;else if(f instanceof Uint32Array)v=s.UNSIGNED_INT;else if(f instanceof Int32Array)v=s.INT;else if(f instanceof Int8Array)v=s.BYTE;else if(f instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:v,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:p}}function n(l,h,f){const d=h.array,p=h._updateRange,m=h.updateRanges;if(s.bindBuffer(f,l),p.count===-1&&m.length===0&&s.bufferSubData(f,0,d),m.length!==0){for(let v=0,M=m.length;v<M;v++){const E=m[v];s.bufferSubData(f,E.start*d.BYTES_PER_ELEMENT,d,E.start,E.count)}h.clearUpdateRanges()}p.count!==-1&&(s.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count),p.count=-1),h.onUploadCallback()}function i(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=e.get(l);h&&(s.deleteBuffer(h.buffer),e.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=e.get(l);(!d||d.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=e.get(l);if(f===void 0)e.set(l,t(l,h));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(f.buffer,l,h),f.version=l.version}}return{get:i,remove:o,update:c}}class ss extends on{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const o=e/2,c=t/2,l=Math.floor(n),h=Math.floor(i),f=l+1,d=h+1,p=e/l,m=t/h,v=[],M=[],E=[],x=[];for(let _=0;_<d;_++){const P=_*m-c;for(let T=0;T<f;T++){const I=T*p-o;M.push(I,-P,0),E.push(0,0,1),x.push(T/l),x.push(1-_/h)}}for(let _=0;_<h;_++)for(let P=0;P<l;P++){const T=P+f*_,I=P+f*(_+1),k=P+1+f*(_+1),O=P+1+f*_;v.push(T,I,O),v.push(I,k,O)}this.setIndex(v),this.setAttribute("position",new qt(M,3)),this.setAttribute("normal",new qt(E,3)),this.setAttribute("uv",new qt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.width,e.height,e.widthSegments,e.heightSegments)}}var eb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ib=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ob=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ab=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cb=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,ub=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,db=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_b=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Mb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Eb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Tb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,bb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ab=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lb="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pb=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Ib=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Db=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ub=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Nb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ob=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Fb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Gb=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Vb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Yb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$b=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qb=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,eA=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nA=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iA=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rA=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sA=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oA=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,aA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,uA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pA=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,gA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,_A=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,vA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,MA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,EA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,TA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,CA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,LA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,PA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,IA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,DA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,UA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,NA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,OA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,FA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,BA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,GA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,VA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,WA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,XA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,YA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,KA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ZA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$A=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,JA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,QA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ew=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ow=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,aw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,cw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,lw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,uw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_w=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Mw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ew=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Aw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ww=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Iw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ot={alphahash_fragment:eb,alphahash_pars_fragment:tb,alphamap_fragment:nb,alphamap_pars_fragment:ib,alphatest_fragment:rb,alphatest_pars_fragment:sb,aomap_fragment:ob,aomap_pars_fragment:ab,batching_pars_vertex:cb,batching_vertex:lb,begin_vertex:ub,beginnormal_vertex:hb,bsdfs:fb,iridescence_fragment:db,bumpmap_pars_fragment:pb,clipping_planes_fragment:mb,clipping_planes_pars_fragment:gb,clipping_planes_pars_vertex:_b,clipping_planes_vertex:vb,color_fragment:xb,color_pars_fragment:yb,color_pars_vertex:Sb,color_vertex:Mb,common:Eb,cube_uv_reflection_fragment:Tb,defaultnormal_vertex:bb,displacementmap_pars_vertex:Ab,displacementmap_vertex:wb,emissivemap_fragment:Rb,emissivemap_pars_fragment:Cb,colorspace_fragment:Lb,colorspace_pars_fragment:Pb,envmap_fragment:Ib,envmap_common_pars_fragment:Db,envmap_pars_fragment:Ub,envmap_pars_vertex:Nb,envmap_physical_pars_fragment:Yb,envmap_vertex:Ob,fog_vertex:Fb,fog_pars_vertex:Bb,fog_fragment:kb,fog_pars_fragment:zb,gradientmap_pars_fragment:Hb,lightmap_fragment:Gb,lightmap_pars_fragment:Vb,lights_lambert_fragment:Wb,lights_lambert_pars_fragment:Xb,lights_pars_begin:qb,lights_toon_fragment:jb,lights_toon_pars_fragment:Kb,lights_phong_fragment:Zb,lights_phong_pars_fragment:$b,lights_physical_fragment:Jb,lights_physical_pars_fragment:Qb,lights_fragment_begin:eA,lights_fragment_maps:tA,lights_fragment_end:nA,logdepthbuf_fragment:iA,logdepthbuf_pars_fragment:rA,logdepthbuf_pars_vertex:sA,logdepthbuf_vertex:oA,map_fragment:aA,map_pars_fragment:cA,map_particle_fragment:lA,map_particle_pars_fragment:uA,metalnessmap_fragment:hA,metalnessmap_pars_fragment:fA,morphinstance_vertex:dA,morphcolor_vertex:pA,morphnormal_vertex:mA,morphtarget_pars_vertex:gA,morphtarget_vertex:_A,normal_fragment_begin:vA,normal_fragment_maps:xA,normal_pars_fragment:yA,normal_pars_vertex:SA,normal_vertex:MA,normalmap_pars_fragment:EA,clearcoat_normal_fragment_begin:TA,clearcoat_normal_fragment_maps:bA,clearcoat_pars_fragment:AA,iridescence_pars_fragment:wA,opaque_fragment:RA,packing:CA,premultiplied_alpha_fragment:LA,project_vertex:PA,dithering_fragment:IA,dithering_pars_fragment:DA,roughnessmap_fragment:UA,roughnessmap_pars_fragment:NA,shadowmap_pars_fragment:OA,shadowmap_pars_vertex:FA,shadowmap_vertex:BA,shadowmask_pars_fragment:kA,skinbase_vertex:zA,skinning_pars_vertex:HA,skinning_vertex:GA,skinnormal_vertex:VA,specularmap_fragment:WA,specularmap_pars_fragment:XA,tonemapping_fragment:qA,tonemapping_pars_fragment:YA,transmission_fragment:jA,transmission_pars_fragment:KA,uv_pars_fragment:ZA,uv_pars_vertex:$A,uv_vertex:JA,worldpos_vertex:QA,background_vert:ew,background_frag:tw,backgroundCube_vert:nw,backgroundCube_frag:iw,cube_vert:rw,cube_frag:sw,depth_vert:ow,depth_frag:aw,distanceRGBA_vert:cw,distanceRGBA_frag:lw,equirect_vert:uw,equirect_frag:hw,linedashed_vert:fw,linedashed_frag:dw,meshbasic_vert:pw,meshbasic_frag:mw,meshlambert_vert:gw,meshlambert_frag:_w,meshmatcap_vert:vw,meshmatcap_frag:xw,meshnormal_vert:yw,meshnormal_frag:Sw,meshphong_vert:Mw,meshphong_frag:Ew,meshphysical_vert:Tw,meshphysical_frag:bw,meshtoon_vert:Aw,meshtoon_frag:ww,points_vert:Rw,points_frag:Cw,shadow_vert:Lw,shadow_frag:Pw,sprite_vert:Iw,sprite_frag:Dw},Se={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},envMapRotation:{value:new at},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},wi={basic:{uniforms:Ln([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:Ln([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new De(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:Ln([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:Ln([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:Ln([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new De(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:Ln([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:Ln([Se.points,Se.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:Ln([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:Ln([Se.common,Se.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:Ln([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:Ln([Se.sprite,Se.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new at}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:Ln([Se.common,Se.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:Ln([Se.lights,Se.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};wi.physical={uniforms:Ln([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const gc={r:0,b:0,g:0},qr=new Pi,Uw=new Je;function Nw(s,e,t,n,i,o,c){const l=new De(0);let h=o===!0?0:1,f,d,p=null,m=0,v=null;function M(x,_){let P=!1,T=_.isScene===!0?_.background:null;T&&T.isTexture&&(T=(_.backgroundBlurriness>0?t:e).get(T)),T===null?E(l,h):T&&T.isColor&&(E(T,1),P=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,c):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(s.autoClear||P)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),T&&(T.isCubeTexture||T.mapping===Vc)?(d===void 0&&(d=new un(new Pr(1,1,1),new sr({name:"BackgroundCubeMaterial",uniforms:so(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(k,O,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),qr.copy(_.backgroundRotation),qr.x*=-1,qr.y*=-1,qr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),d.material.uniforms.envMap.value=T,d.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Uw.makeRotationFromEuler(qr)),d.material.toneMapped=Ct.getTransfer(T.colorSpace)!==kt,(p!==T||m!==T.version||v!==s.toneMapping)&&(d.material.needsUpdate=!0,p=T,m=T.version,v=s.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):T&&T.isTexture&&(f===void 0&&(f=new un(new ss(2,2),new sr({name:"BackgroundMaterial",uniforms:so(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(f)),f.material.uniforms.t2D.value=T,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.toneMapped=Ct.getTransfer(T.colorSpace)!==kt,T.matrixAutoUpdate===!0&&T.updateMatrix(),f.material.uniforms.uvTransform.value.copy(T.matrix),(p!==T||m!==T.version||v!==s.toneMapping)&&(f.material.needsUpdate=!0,p=T,m=T.version,v=s.toneMapping),f.layers.enableAll(),x.unshift(f,f.geometry,f.material,0,0,null))}function E(x,_){x.getRGB(gc,Cg(s)),n.buffers.color.setClear(gc.r,gc.g,gc.b,_,c)}return{getClearColor:function(){return l},setClearColor:function(x,_=1){l.set(x),h=_,E(l,h)},getClearAlpha:function(){return h},setClearAlpha:function(x){h=x,E(l,h)},render:M}}function Ow(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=m(null);let o=i,c=!1;function l(w,X,J,z,te){let ce=!1;const ue=p(z,J,X);o!==ue&&(o=ue,f(o.object)),ce=v(w,z,J,te),ce&&M(w,z,J,te),te!==null&&e.update(te,s.ELEMENT_ARRAY_BUFFER),(ce||c)&&(c=!1,I(w,X,J,z),te!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(te).buffer))}function h(){return s.createVertexArray()}function f(w){return s.bindVertexArray(w)}function d(w){return s.deleteVertexArray(w)}function p(w,X,J){const z=J.wireframe===!0;let te=n[w.id];te===void 0&&(te={},n[w.id]=te);let ce=te[X.id];ce===void 0&&(ce={},te[X.id]=ce);let ue=ce[z];return ue===void 0&&(ue=m(h()),ce[z]=ue),ue}function m(w){const X=[],J=[],z=[];for(let te=0;te<t;te++)X[te]=0,J[te]=0,z[te]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:J,attributeDivisors:z,object:w,attributes:{},index:null}}function v(w,X,J,z){const te=o.attributes,ce=X.attributes;let ue=0;const xe=J.getAttributes();for(const Q in xe)if(xe[Q].location>=0){const de=te[Q];let Ae=ce[Q];if(Ae===void 0&&(Q==="instanceMatrix"&&w.instanceMatrix&&(Ae=w.instanceMatrix),Q==="instanceColor"&&w.instanceColor&&(Ae=w.instanceColor)),de===void 0||de.attribute!==Ae||Ae&&de.data!==Ae.data)return!0;ue++}return o.attributesNum!==ue||o.index!==z}function M(w,X,J,z){const te={},ce=X.attributes;let ue=0;const xe=J.getAttributes();for(const Q in xe)if(xe[Q].location>=0){let de=ce[Q];de===void 0&&(Q==="instanceMatrix"&&w.instanceMatrix&&(de=w.instanceMatrix),Q==="instanceColor"&&w.instanceColor&&(de=w.instanceColor));const Ae={};Ae.attribute=de,de&&de.data&&(Ae.data=de.data),te[Q]=Ae,ue++}o.attributes=te,o.attributesNum=ue,o.index=z}function E(){const w=o.newAttributes;for(let X=0,J=w.length;X<J;X++)w[X]=0}function x(w){_(w,0)}function _(w,X){const J=o.newAttributes,z=o.enabledAttributes,te=o.attributeDivisors;J[w]=1,z[w]===0&&(s.enableVertexAttribArray(w),z[w]=1),te[w]!==X&&(s.vertexAttribDivisor(w,X),te[w]=X)}function P(){const w=o.newAttributes,X=o.enabledAttributes;for(let J=0,z=X.length;J<z;J++)X[J]!==w[J]&&(s.disableVertexAttribArray(J),X[J]=0)}function T(w,X,J,z,te,ce,ue){ue===!0?s.vertexAttribIPointer(w,X,J,te,ce):s.vertexAttribPointer(w,X,J,z,te,ce)}function I(w,X,J,z){E();const te=z.attributes,ce=J.getAttributes(),ue=X.defaultAttributeValues;for(const xe in ce){const Q=ce[xe];if(Q.location>=0){let ge=te[xe];if(ge===void 0&&(xe==="instanceMatrix"&&w.instanceMatrix&&(ge=w.instanceMatrix),xe==="instanceColor"&&w.instanceColor&&(ge=w.instanceColor)),ge!==void 0){const de=ge.normalized,Ae=ge.itemSize,ct=e.get(ge);if(ct===void 0)continue;const Tt=ct.buffer,ie=ct.type,me=ct.bytesPerElement,Re=ie===s.INT||ie===s.UNSIGNED_INT||ge.gpuType===fg;if(ge.isInterleavedBufferAttribute){const Te=ge.data,qe=Te.stride,Ye=ge.offset;if(Te.isInstancedInterleavedBuffer){for(let ft=0;ft<Q.locationSize;ft++)_(Q.location+ft,Te.meshPerAttribute);w.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Te.meshPerAttribute*Te.count)}else for(let ft=0;ft<Q.locationSize;ft++)x(Q.location+ft);s.bindBuffer(s.ARRAY_BUFFER,Tt);for(let ft=0;ft<Q.locationSize;ft++)T(Q.location+ft,Ae/Q.locationSize,ie,de,qe*me,(Ye+Ae/Q.locationSize*ft)*me,Re)}else{if(ge.isInstancedBufferAttribute){for(let Te=0;Te<Q.locationSize;Te++)_(Q.location+Te,ge.meshPerAttribute);w.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Te=0;Te<Q.locationSize;Te++)x(Q.location+Te);s.bindBuffer(s.ARRAY_BUFFER,Tt);for(let Te=0;Te<Q.locationSize;Te++)T(Q.location+Te,Ae/Q.locationSize,ie,de,Ae*me,Ae/Q.locationSize*Te*me,Re)}}else if(ue!==void 0){const de=ue[xe];if(de!==void 0)switch(de.length){case 2:s.vertexAttrib2fv(Q.location,de);break;case 3:s.vertexAttrib3fv(Q.location,de);break;case 4:s.vertexAttrib4fv(Q.location,de);break;default:s.vertexAttrib1fv(Q.location,de)}}}}P()}function k(){V();for(const w in n){const X=n[w];for(const J in X){const z=X[J];for(const te in z)d(z[te].object),delete z[te];delete X[J]}delete n[w]}}function O(w){if(n[w.id]===void 0)return;const X=n[w.id];for(const J in X){const z=X[J];for(const te in z)d(z[te].object),delete z[te];delete X[J]}delete n[w.id]}function D(w){for(const X in n){const J=n[X];if(J[w.id]===void 0)continue;const z=J[w.id];for(const te in z)d(z[te].object),delete z[te];delete J[w.id]}}function V(){C(),c=!0,o!==i&&(o=i,f(o.object))}function C(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:l,reset:V,resetDefaultState:C,dispose:k,releaseStatesOfGeometry:O,releaseStatesOfProgram:D,initAttributes:E,enableAttribute:x,disableUnusedAttributes:P}}function Fw(s,e,t){let n;function i(h){n=h}function o(h,f){s.drawArrays(n,h,f),t.update(f,n,1)}function c(h,f,d){d!==0&&(s.drawArraysInstanced(n,h,f,d),t.update(f,n,d))}function l(h,f,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d;m++)this.render(h[m],f[m]);else{p.multiDrawArraysWEBGL(n,h,0,f,0,d);let m=0;for(let v=0;v<d;v++)m+=f[v];t.update(m,n,1)}}this.setMode=i,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Bw(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const l=o(c);l!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",l,"instead."),c=l);const h=t.logarithmicDepthBuffer===!0,f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,P=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:i,getMaxPrecision:o,precision:c,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:m,maxAttributes:v,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:_,maxSamples:P}}function kw(s){const e=this;let t=null,n=0,i=!1,o=!1;const c=new br,l=new at,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const v=p.length!==0||m||n!==0||i;return i=m,n=p.length,v},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,m){t=d(p,m,0)},this.setState=function(p,m,v){const M=p.clippingPlanes,E=p.clipIntersection,x=p.clipShadows,_=s.get(p);if(!i||M===null||M.length===0||o&&!x)o?d(null):f();else{const P=o?0:n,T=P*4;let I=_.clippingState||null;h.value=I,I=d(M,m,T,v);for(let k=0;k!==T;++k)I[k]=t[k];_.clippingState=I,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=P}};function f(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(p,m,v,M){const E=p!==null?p.length:0;let x=null;if(E!==0){if(x=h.value,M!==!0||x===null){const _=v+E*4,P=m.matrixWorldInverse;l.getNormalMatrix(P),(x===null||x.length<_)&&(x=new Float32Array(_));for(let T=0,I=v;T!==E;++T,I+=4)c.copy(p[T]).applyMatrix4(P,l),c.normal.toArray(x,I),x[I+3]=c.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,x}}function zw(s){let e=new WeakMap;function t(c,l){return l===Qu?c.mapping=eo:l===eh&&(c.mapping=to),c}function n(c){if(c&&c.isTexture){const l=c.mapping;if(l===Qu||l===eh)if(e.has(c)){const h=e.get(c).texture;return t(h,c.mapping)}else{const h=c.image;if(h&&h.height>0){const f=new Ig(h.height);return f.fromEquirectangularTexture(s,c),e.set(c,f),c.addEventListener("dispose",i),t(f.texture,c.mapping)}else return null}}return c}function i(c){const l=c.target;l.removeEventListener("dispose",i);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}class Xc extends Lg{constructor(e=-1,t=1,n=1,i=-1,o=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=o,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,o,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-e,c=n+e,l=i+t,h=i-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,c=o+f*this.view.width,l-=d*this.view.offsetY,h=l-d*this.view.height}this.projectionMatrix.makeOrthographic(o,c,l,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const js=4,nm=[.125,.215,.35,.446,.526,.582],Jr=20,Iu=new Xc,im=new De;let Du=null,Uu=0,Nu=0,Ou=!1;const Kr=(1+Math.sqrt(5))/2,zs=1/Kr,rm=[new F(1,1,1),new F(-1,1,1),new F(1,1,-1),new F(-1,1,-1),new F(0,Kr,zs),new F(0,Kr,-zs),new F(zs,0,Kr),new F(-zs,0,Kr),new F(Kr,zs,0),new F(-Kr,zs,0)];class sm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Du=this._renderer.getRenderTarget(),Uu=this._renderer.getActiveCubeFace(),Nu=this._renderer.getActiveMipmapLevel(),Ou=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,i,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=am(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Du,Uu,Nu),this._renderer.xr.enabled=Ou,e.scissorTest=!1,_c(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===eo||e.mapping===to?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Du=this._renderer.getRenderTarget(),Uu=this._renderer.getActiveCubeFace(),Nu=this._renderer.getActiveMipmapLevel(),Ou=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:Dc,format:ii,colorSpace:hn,depthBuffer:!1},i=om(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=om(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hw(o)),this._blurMaterial=Gw(o,e,t)}return i}_compileMaterial(e){const t=new un(this._lodPlanes[0],e);this._renderer.compile(t,Iu)}_sceneToCubeUV(e,t,n,i){const l=new Mn(90,1,t,n),h=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,m=d.toneMapping;d.getClearColor(im),d.toneMapping=rr,d.autoClear=!1;const v=new nr({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),M=new un(new Pr,v);let E=!1;const x=e.background;x?x.isColor&&(v.color.copy(x),e.background=null,E=!0):(v.color.copy(im),E=!0);for(let _=0;_<6;_++){const P=_%3;P===0?(l.up.set(0,h[_],0),l.lookAt(f[_],0,0)):P===1?(l.up.set(0,0,h[_]),l.lookAt(0,f[_],0)):(l.up.set(0,h[_],0),l.lookAt(0,0,f[_]));const T=this._cubeSize;_c(i,P*T,_>2?T:0,T,T),d.setRenderTarget(i),E&&d.render(M,l),d.render(e,l)}M.geometry.dispose(),M.material.dispose(),d.toneMapping=m,d.autoClear=p,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===eo||e.mapping===to;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=cm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=am());const o=i?this._cubemapMaterial:this._equirectMaterial,c=new un(this._lodPlanes[0],o),l=o.uniforms;l.envMap.value=e;const h=this._cubeSize;_c(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(c,Iu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const o=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),c=rm[(i-1)%rm.length];this._blur(e,i-1,i,o,c)}t.autoClear=n}_blur(e,t,n,i,o){const c=this._pingPongRenderTarget;this._halfBlur(e,c,t,n,i,"latitudinal",o),this._halfBlur(c,e,n,n,i,"longitudinal",o)}_halfBlur(e,t,n,i,o,c,l){const h=this._renderer,f=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,p=new un(this._lodPlanes[i],f),m=f.uniforms,v=this._sizeLods[n]-1,M=isFinite(o)?Math.PI/(2*v):2*Math.PI/(2*Jr-1),E=o/M,x=isFinite(o)?1+Math.floor(d*E):Jr;x>Jr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Jr}`);const _=[];let P=0;for(let D=0;D<Jr;++D){const V=D/E,C=Math.exp(-V*V/2);_.push(C),D===0?P+=C:D<x&&(P+=2*C)}for(let D=0;D<_.length;D++)_[D]=_[D]/P;m.envMap.value=e.texture,m.samples.value=x,m.weights.value=_,m.latitudinal.value=c==="latitudinal",l&&(m.poleAxis.value=l);const{_lodMax:T}=this;m.dTheta.value=M,m.mipInt.value=T-n;const I=this._sizeLods[i],k=3*I*(i>T-js?i-T+js:0),O=4*(this._cubeSize-I);_c(t,k,O,3*I,2*I),h.setRenderTarget(t),h.render(p,Iu)}}function Hw(s){const e=[],t=[],n=[];let i=s;const o=s-js+1+nm.length;for(let c=0;c<o;c++){const l=Math.pow(2,i);t.push(l);let h=1/l;c>s-js?h=nm[c-s+js-1]:c===0&&(h=0),n.push(h);const f=1/(l-2),d=-f,p=1+f,m=[d,d,p,d,p,p,d,d,p,p,d,p],v=6,M=6,E=3,x=2,_=1,P=new Float32Array(E*M*v),T=new Float32Array(x*M*v),I=new Float32Array(_*M*v);for(let O=0;O<v;O++){const D=O%3*2/3-1,V=O>2?0:-1,C=[D,V,0,D+2/3,V,0,D+2/3,V+1,0,D,V,0,D+2/3,V+1,0,D,V+1,0];P.set(C,E*M*O),T.set(m,x*M*O);const w=[O,O,O,O,O,O];I.set(w,_*M*O)}const k=new on;k.setAttribute("position",new Qt(P,E)),k.setAttribute("uv",new Qt(T,x)),k.setAttribute("faceIndex",new Qt(I,_)),e.push(k),i>js&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function om(s,e,t){const n=new ns(s,e,t);return n.texture.mapping=Vc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _c(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Gw(s,e,t){const n=new Float32Array(Jr),i=new F(0,1,0);return new sr({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Cr,depthTest:!1,depthWrite:!1})}function am(){return new sr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Cr,depthTest:!1,depthWrite:!1})}function cm(){return new sr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cr,depthTest:!1,depthWrite:!1})}function Eh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vw(s){let e=new WeakMap,t=null;function n(l){if(l&&l.isTexture){const h=l.mapping,f=h===Qu||h===eh,d=h===eo||h===to;if(f||d){let p=e.get(l);const m=p!==void 0?p.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return t===null&&(t=new sm(s)),p=f?t.fromEquirectangular(l,p):t.fromCubemap(l,p),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),p.texture;if(p!==void 0)return p.texture;{const v=l.image;return f&&v&&v.height>0||d&&v&&i(v)?(t===null&&(t=new sm(s)),p=f?t.fromEquirectangular(l):t.fromCubemap(l),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),l.addEventListener("dispose",o),p.texture):null}}}return l}function i(l){let h=0;const f=6;for(let d=0;d<f;d++)l[d]!==void 0&&h++;return h===f}function o(l){const h=l.target;h.removeEventListener("dispose",o);const f=e.get(h);f!==void 0&&(e.delete(h),f.dispose())}function c(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:c}}function Ww(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Xw(s,e,t,n){const i={},o=new WeakMap;function c(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const M in m.attributes)e.remove(m.attributes[M]);for(const M in m.morphAttributes){const E=m.morphAttributes[M];for(let x=0,_=E.length;x<_;x++)e.remove(E[x])}m.removeEventListener("dispose",c),delete i[m.id];const v=o.get(m);v&&(e.remove(v),o.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function l(p,m){return i[m.id]===!0||(m.addEventListener("dispose",c),i[m.id]=!0,t.memory.geometries++),m}function h(p){const m=p.attributes;for(const M in m)e.update(m[M],s.ARRAY_BUFFER);const v=p.morphAttributes;for(const M in v){const E=v[M];for(let x=0,_=E.length;x<_;x++)e.update(E[x],s.ARRAY_BUFFER)}}function f(p){const m=[],v=p.index,M=p.attributes.position;let E=0;if(v!==null){const P=v.array;E=v.version;for(let T=0,I=P.length;T<I;T+=3){const k=P[T+0],O=P[T+1],D=P[T+2];m.push(k,O,O,D,D,k)}}else if(M!==void 0){const P=M.array;E=M.version;for(let T=0,I=P.length/3-1;T<I;T+=3){const k=T+0,O=T+1,D=T+2;m.push(k,O,O,D,D,k)}}else return;const x=new(Eg(m)?Rg:wg)(m,1);x.version=E;const _=o.get(p);_&&e.remove(_),o.set(p,x)}function d(p){const m=o.get(p);if(m){const v=p.index;v!==null&&m.version<v.version&&f(p)}else f(p);return o.get(p)}return{get:l,update:h,getWireframeAttribute:d}}function qw(s,e,t){let n;function i(p){n=p}let o,c;function l(p){o=p.type,c=p.bytesPerElement}function h(p,m){s.drawElements(n,m,o,p*c),t.update(m,n,1)}function f(p,m,v){v!==0&&(s.drawElementsInstanced(n,m,o,p*c,v),t.update(m,n,v))}function d(p,m,v){if(v===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<v;E++)this.render(p[E]/c,m[E]);else{M.multiDrawElementsWEBGL(n,m,0,o,p,0,v);let E=0;for(let x=0;x<v;x++)E+=m[x];t.update(E,n,1)}}this.setMode=i,this.setIndex=l,this.render=h,this.renderInstances=f,this.renderMultiDraw=d}function Yw(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,c,l){switch(t.calls++,c){case s.TRIANGLES:t.triangles+=l*(o/3);break;case s.LINES:t.lines+=l*(o/2);break;case s.LINE_STRIP:t.lines+=l*(o-1);break;case s.LINE_LOOP:t.lines+=l*o;break;case s.POINTS:t.points+=l*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function jw(s,e,t){const n=new WeakMap,i=new It;function o(c,l,h){const f=c.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,p=d!==void 0?d.length:0;let m=n.get(l);if(m===void 0||m.count!==p){let C=function(){D.dispose(),n.delete(l),l.removeEventListener("dispose",C)};m!==void 0&&m.texture.dispose();const v=l.morphAttributes.position!==void 0,M=l.morphAttributes.normal!==void 0,E=l.morphAttributes.color!==void 0,x=l.morphAttributes.position||[],_=l.morphAttributes.normal||[],P=l.morphAttributes.color||[];let T=0;v===!0&&(T=1),M===!0&&(T=2),E===!0&&(T=3);let I=l.attributes.position.count*T,k=1;I>e.maxTextureSize&&(k=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const O=new Float32Array(I*k*4*p),D=new bg(O,I,k,p);D.type=Ci,D.needsUpdate=!0;const V=T*4;for(let w=0;w<p;w++){const X=x[w],J=_[w],z=P[w],te=I*k*4*w;for(let ce=0;ce<X.count;ce++){const ue=ce*V;v===!0&&(i.fromBufferAttribute(X,ce),O[te+ue+0]=i.x,O[te+ue+1]=i.y,O[te+ue+2]=i.z,O[te+ue+3]=0),M===!0&&(i.fromBufferAttribute(J,ce),O[te+ue+4]=i.x,O[te+ue+5]=i.y,O[te+ue+6]=i.z,O[te+ue+7]=0),E===!0&&(i.fromBufferAttribute(z,ce),O[te+ue+8]=i.x,O[te+ue+9]=i.y,O[te+ue+10]=i.z,O[te+ue+11]=z.itemSize===4?i.w:1)}}m={count:p,texture:D,size:new Ne(I,k)},n.set(l,m),l.addEventListener("dispose",C)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",c.morphTexture,t);else{let v=0;for(let E=0;E<f.length;E++)v+=f[E];const M=l.morphTargetsRelative?1:1-v;h.getUniforms().setValue(s,"morphTargetBaseInfluence",M),h.getUniforms().setValue(s,"morphTargetInfluences",f)}h.getUniforms().setValue(s,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}return{update:o}}function Kw(s,e,t,n){let i=new WeakMap;function o(h){const f=n.render.frame,d=h.geometry,p=e.get(h,d);if(i.get(p)!==f&&(e.update(p),i.set(p,f)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),i.get(h)!==f&&(t.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,s.ARRAY_BUFFER),i.set(h,f))),h.isSkinnedMesh){const m=h.skeleton;i.get(m)!==f&&(m.update(),i.set(m,f))}return p}function c(){i=new WeakMap}function l(h){const f=h.target;f.removeEventListener("dispose",l),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:c}}class Ug extends Zt{constructor(e,t,n,i,o,c,l,h,f,d){if(d=d!==void 0?d:$s,d!==$s&&d!==na)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===$s&&(n=no),n===void 0&&d===na&&(n=sa),super(null,i,o,c,l,h,d,n,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:En,this.minFilter=h!==void 0?h:En,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ng=new Zt,Og=new Ug(1,1);Og.compareFunction=Mg;const Fg=new bg,Bg=new NT,kg=new Pg,lm=[],um=[],hm=new Float32Array(16),fm=new Float32Array(9),dm=new Float32Array(4);function lo(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let o=lm[i];if(o===void 0&&(o=new Float32Array(i),lm[i]=o),e!==0){n.toArray(o,0);for(let c=1,l=0;c!==e;++c)l+=t,s[c].toArray(o,l)}return o}function rn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function sn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function qc(s,e){let t=um[e];t===void 0&&(t=new Int32Array(e),um[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Zw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function $w(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2fv(this.addr,e),sn(t,e)}}function Jw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;s.uniform3fv(this.addr,e),sn(t,e)}}function Qw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4fv(this.addr,e),sn(t,e)}}function eR(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;dm.set(n),s.uniformMatrix2fv(this.addr,!1,dm),sn(t,n)}}function tR(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;fm.set(n),s.uniformMatrix3fv(this.addr,!1,fm),sn(t,n)}}function nR(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;hm.set(n),s.uniformMatrix4fv(this.addr,!1,hm),sn(t,n)}}function iR(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function rR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2iv(this.addr,e),sn(t,e)}}function sR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;s.uniform3iv(this.addr,e),sn(t,e)}}function oR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4iv(this.addr,e),sn(t,e)}}function aR(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function cR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2uiv(this.addr,e),sn(t,e)}}function lR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;s.uniform3uiv(this.addr,e),sn(t,e)}}function uR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4uiv(this.addr,e),sn(t,e)}}function hR(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const o=this.type===s.SAMPLER_2D_SHADOW?Og:Ng;t.setTexture2D(e||o,i)}function fR(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Bg,i)}function dR(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||kg,i)}function pR(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Fg,i)}function mR(s){switch(s){case 5126:return Zw;case 35664:return $w;case 35665:return Jw;case 35666:return Qw;case 35674:return eR;case 35675:return tR;case 35676:return nR;case 5124:case 35670:return iR;case 35667:case 35671:return rR;case 35668:case 35672:return sR;case 35669:case 35673:return oR;case 5125:return aR;case 36294:return cR;case 36295:return lR;case 36296:return uR;case 35678:case 36198:case 36298:case 36306:case 35682:return hR;case 35679:case 36299:case 36307:return fR;case 35680:case 36300:case 36308:case 36293:return dR;case 36289:case 36303:case 36311:case 36292:return pR}}function gR(s,e){s.uniform1fv(this.addr,e)}function _R(s,e){const t=lo(e,this.size,2);s.uniform2fv(this.addr,t)}function vR(s,e){const t=lo(e,this.size,3);s.uniform3fv(this.addr,t)}function xR(s,e){const t=lo(e,this.size,4);s.uniform4fv(this.addr,t)}function yR(s,e){const t=lo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function SR(s,e){const t=lo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function MR(s,e){const t=lo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ER(s,e){s.uniform1iv(this.addr,e)}function TR(s,e){s.uniform2iv(this.addr,e)}function bR(s,e){s.uniform3iv(this.addr,e)}function AR(s,e){s.uniform4iv(this.addr,e)}function wR(s,e){s.uniform1uiv(this.addr,e)}function RR(s,e){s.uniform2uiv(this.addr,e)}function CR(s,e){s.uniform3uiv(this.addr,e)}function LR(s,e){s.uniform4uiv(this.addr,e)}function PR(s,e,t){const n=this.cache,i=e.length,o=qc(t,i);rn(n,o)||(s.uniform1iv(this.addr,o),sn(n,o));for(let c=0;c!==i;++c)t.setTexture2D(e[c]||Ng,o[c])}function IR(s,e,t){const n=this.cache,i=e.length,o=qc(t,i);rn(n,o)||(s.uniform1iv(this.addr,o),sn(n,o));for(let c=0;c!==i;++c)t.setTexture3D(e[c]||Bg,o[c])}function DR(s,e,t){const n=this.cache,i=e.length,o=qc(t,i);rn(n,o)||(s.uniform1iv(this.addr,o),sn(n,o));for(let c=0;c!==i;++c)t.setTextureCube(e[c]||kg,o[c])}function UR(s,e,t){const n=this.cache,i=e.length,o=qc(t,i);rn(n,o)||(s.uniform1iv(this.addr,o),sn(n,o));for(let c=0;c!==i;++c)t.setTexture2DArray(e[c]||Fg,o[c])}function NR(s){switch(s){case 5126:return gR;case 35664:return _R;case 35665:return vR;case 35666:return xR;case 35674:return yR;case 35675:return SR;case 35676:return MR;case 5124:case 35670:return ER;case 35667:case 35671:return TR;case 35668:case 35672:return bR;case 35669:case 35673:return AR;case 5125:return wR;case 36294:return RR;case 36295:return CR;case 36296:return LR;case 35678:case 36198:case 36298:case 36306:case 35682:return PR;case 35679:case 36299:case 36307:return IR;case 35680:case 36300:case 36308:case 36293:return DR;case 36289:case 36303:case 36311:case 36292:return UR}}class OR{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=mR(t.type)}}class FR{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=NR(t.type)}}class BR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let o=0,c=i.length;o!==c;++o){const l=i[o];l.setValue(e,t[l.id],n)}}}const Fu=/(\w+)(\])?(\[|\.)?/g;function pm(s,e){s.seq.push(e),s.map[e.id]=e}function kR(s,e,t){const n=s.name,i=n.length;for(Fu.lastIndex=0;;){const o=Fu.exec(n),c=Fu.lastIndex;let l=o[1];const h=o[2]==="]",f=o[3];if(h&&(l=l|0),f===void 0||f==="["&&c+2===i){pm(t,f===void 0?new OR(l,s,e):new FR(l,s,e));break}else{let p=t.map[l];p===void 0&&(p=new BR(l),pm(t,p)),t=p}}}class Lc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=e.getActiveUniform(t,i),c=e.getUniformLocation(t,o.name);kR(o,c,this)}}setValue(e,t,n,i){const o=this.map[t];o!==void 0&&o.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let o=0,c=t.length;o!==c;++o){const l=t[o],h=n[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,o=e.length;i!==o;++i){const c=e[i];c.id in t&&n.push(c)}return n}}function mm(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const zR=37297;let HR=0;function GR(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let c=i;c<o;c++){const l=c+1;n.push(`${l===e?">":" "} ${l}: ${t[c]}`)}return n.join(`
`)}function VR(s){const e=Ct.getPrimaries(Ct.workingColorSpace),t=Ct.getPrimaries(s);let n;switch(e===t?n="":e===Oc&&t===Nc?n="LinearDisplayP3ToLinearSRGB":e===Nc&&t===Oc&&(n="LinearSRGBToLinearDisplayP3"),s){case hn:case Wc:return[n,"LinearTransferOETF"];case nn:case vh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function gm(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+i+`

`+GR(s.getShaderSource(e),c)}else return i}function WR(s,e){const t=VR(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function XR(s,e){let t;switch(e){case BE:t="Linear";break;case kE:t="Reinhard";break;case zE:t="OptimizedCineon";break;case HE:t="ACESFilmic";break;case VE:t="AgX";break;case WE:t="Neutral";break;case GE:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function qR(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qo).join(`
`)}function YR(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function jR(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(e,i),c=o.name;let l=1;o.type===s.FLOAT_MAT2&&(l=2),o.type===s.FLOAT_MAT3&&(l=3),o.type===s.FLOAT_MAT4&&(l=4),t[c]={type:o.type,location:s.getAttribLocation(e,c),locationSize:l}}return t}function qo(s){return s!==""}function _m(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const KR=/^[ \t]*#include +<([\w\d./]+)>/gm;function ih(s){return s.replace(KR,$R)}const ZR=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function $R(s,e){let t=ot[e];if(t===void 0){const n=ZR.get(e);if(n!==void 0)t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ih(t)}const JR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xm(s){return s.replace(JR,QR)}function QR(s,e,t,n){let i="";for(let o=parseInt(e);o<parseInt(t);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function ym(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function e1(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ag?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===cg?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ji&&(e="SHADOWMAP_TYPE_VSM"),e}function t1(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case eo:case to:e="ENVMAP_TYPE_CUBE";break;case Vc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function n1(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case to:e="ENVMAP_MODE_REFRACTION";break}return e}function i1(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case lg:e="ENVMAP_BLENDING_MULTIPLY";break;case OE:e="ENVMAP_BLENDING_MIX";break;case FE:e="ENVMAP_BLENDING_ADD";break}return e}function r1(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function s1(s,e,t,n){const i=s.getContext(),o=t.defines;let c=t.vertexShader,l=t.fragmentShader;const h=e1(t),f=t1(t),d=n1(t),p=i1(t),m=r1(t),v=qR(t),M=YR(o),E=i.createProgram();let x,_,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(qo).join(`
`),x.length>0&&(x+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(qo).join(`
`),_.length>0&&(_+=`
`)):(x=[ym(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qo).join(`
`),_=[ym(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==rr?"#define TONE_MAPPING":"",t.toneMapping!==rr?ot.tonemapping_pars_fragment:"",t.toneMapping!==rr?XR("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,WR("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qo).join(`
`)),c=ih(c),c=_m(c,t),c=vm(c,t),l=ih(l),l=_m(l,t),l=vm(l,t),c=xm(c),l=xm(l),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,x=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,_=["#define varying in",t.glslVersion===Np?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Np?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const T=P+x+c,I=P+_+l,k=mm(i,i.VERTEX_SHADER,T),O=mm(i,i.FRAGMENT_SHADER,I);i.attachShader(E,k),i.attachShader(E,O),t.index0AttributeName!==void 0?i.bindAttribLocation(E,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(E,0,"position"),i.linkProgram(E);function D(X){if(s.debug.checkShaderErrors){const J=i.getProgramInfoLog(E).trim(),z=i.getShaderInfoLog(k).trim(),te=i.getShaderInfoLog(O).trim();let ce=!0,ue=!0;if(i.getProgramParameter(E,i.LINK_STATUS)===!1)if(ce=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,E,k,O);else{const xe=gm(i,k,"vertex"),Q=gm(i,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(E,i.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+J+`
`+xe+`
`+Q)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(z===""||te==="")&&(ue=!1);ue&&(X.diagnostics={runnable:ce,programLog:J,vertexShader:{log:z,prefix:x},fragmentShader:{log:te,prefix:_}})}i.deleteShader(k),i.deleteShader(O),V=new Lc(i,E),C=jR(i,E)}let V;this.getUniforms=function(){return V===void 0&&D(this),V};let C;this.getAttributes=function(){return C===void 0&&D(this),C};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(E,zR)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=HR++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=k,this.fragmentShader=O,this}let o1=0;class a1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),o=this._getShaderStage(n),c=this._getShaderCacheForMaterial(e);return c.has(i)===!1&&(c.add(i),i.usedTimes++),c.has(o)===!1&&(c.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new c1(e),t.set(e,n)),n}}class c1{constructor(e){this.id=o1++,this.code=e,this.usedTimes=0}}function l1(s,e,t,n,i,o,c){const l=new Sh,h=new a1,f=new Set,d=[],p=i.logarithmicDepthBuffer,m=i.vertexTextures;let v=i.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(C){return f.add(C),C===0?"uv":`uv${C}`}function x(C,w,X,J,z){const te=J.fog,ce=z.geometry,ue=C.isMeshStandardMaterial?J.environment:null,xe=(C.isMeshStandardMaterial?t:e).get(C.envMap||ue),Q=xe&&xe.mapping===Vc?xe.image.height:null,ge=M[C.type];C.precision!==null&&(v=i.getMaxPrecision(C.precision),v!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",v,"instead."));const de=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,Ae=de!==void 0?de.length:0;let ct=0;ce.morphAttributes.position!==void 0&&(ct=1),ce.morphAttributes.normal!==void 0&&(ct=2),ce.morphAttributes.color!==void 0&&(ct=3);let Tt,ie,me,Re;if(ge){const $t=wi[ge];Tt=$t.vertexShader,ie=$t.fragmentShader}else Tt=C.vertexShader,ie=C.fragmentShader,h.update(C),me=h.getVertexShaderID(C),Re=h.getFragmentShaderID(C);const Te=s.getRenderTarget(),qe=z.isInstancedMesh===!0,Ye=z.isBatchedMesh===!0,ft=!!C.map,q=!!C.matcap,Qe=!!xe,Ge=!!C.aoMap,Mt=!!C.lightMap,ke=!!C.bumpMap,Et=!!C.normalMap,U=!!C.displacementMap,b=!!C.emissiveMap,ee=!!C.metalnessMap,se=!!C.roughnessMap,le=C.anisotropy>0,fe=C.clearcoat>0,Fe=C.iridescence>0,pe=C.sheen>0,Pe=C.transmission>0,ze=le&&!!C.anisotropyMap,_e=fe&&!!C.clearcoatMap,Me=fe&&!!C.clearcoatNormalMap,Xe=fe&&!!C.clearcoatRoughnessMap,Ce=Fe&&!!C.iridescenceMap,Le=Fe&&!!C.iridescenceThicknessMap,rt=pe&&!!C.sheenColorMap,lt=pe&&!!C.sheenRoughnessMap,vt=!!C.specularMap,dt=!!C.specularColorMap,xt=!!C.specularIntensityMap,Ue=Pe&&!!C.transmissionMap,y=Pe&&!!C.thicknessMap,Y=!!C.gradientMap,re=!!C.alphaMap,ve=C.alphaTest>0,be=!!C.alphaHash,pt=!!C.extensions;let ut=rr;C.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(ut=s.toneMapping);const Ut={shaderID:ge,shaderType:C.type,shaderName:C.name,vertexShader:Tt,fragmentShader:ie,defines:C.defines,customVertexShaderID:me,customFragmentShaderID:Re,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:v,batching:Ye,instancing:qe,instancingColor:qe&&z.instanceColor!==null,instancingMorph:qe&&z.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Te===null?s.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:hn,alphaToCoverage:!!C.alphaToCoverage,map:ft,matcap:q,envMap:Qe,envMapMode:Qe&&xe.mapping,envMapCubeUVHeight:Q,aoMap:Ge,lightMap:Mt,bumpMap:ke,normalMap:Et,displacementMap:m&&U,emissiveMap:b,normalMapObjectSpace:Et&&C.normalMapType===sT,normalMapTangentSpace:Et&&C.normalMapType===Sg,metalnessMap:ee,roughnessMap:se,anisotropy:le,anisotropyMap:ze,clearcoat:fe,clearcoatMap:_e,clearcoatNormalMap:Me,clearcoatRoughnessMap:Xe,iridescence:Fe,iridescenceMap:Ce,iridescenceThicknessMap:Le,sheen:pe,sheenColorMap:rt,sheenRoughnessMap:lt,specularMap:vt,specularColorMap:dt,specularIntensityMap:xt,transmission:Pe,transmissionMap:Ue,thicknessMap:y,gradientMap:Y,opaque:C.transparent===!1&&C.blending===Zs&&C.alphaToCoverage===!1,alphaMap:re,alphaTest:ve,alphaHash:be,combine:C.combine,mapUv:ft&&E(C.map.channel),aoMapUv:Ge&&E(C.aoMap.channel),lightMapUv:Mt&&E(C.lightMap.channel),bumpMapUv:ke&&E(C.bumpMap.channel),normalMapUv:Et&&E(C.normalMap.channel),displacementMapUv:U&&E(C.displacementMap.channel),emissiveMapUv:b&&E(C.emissiveMap.channel),metalnessMapUv:ee&&E(C.metalnessMap.channel),roughnessMapUv:se&&E(C.roughnessMap.channel),anisotropyMapUv:ze&&E(C.anisotropyMap.channel),clearcoatMapUv:_e&&E(C.clearcoatMap.channel),clearcoatNormalMapUv:Me&&E(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xe&&E(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&E(C.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&E(C.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&E(C.sheenColorMap.channel),sheenRoughnessMapUv:lt&&E(C.sheenRoughnessMap.channel),specularMapUv:vt&&E(C.specularMap.channel),specularColorMapUv:dt&&E(C.specularColorMap.channel),specularIntensityMapUv:xt&&E(C.specularIntensityMap.channel),transmissionMapUv:Ue&&E(C.transmissionMap.channel),thicknessMapUv:y&&E(C.thicknessMap.channel),alphaMapUv:re&&E(C.alphaMap.channel),vertexTangents:!!ce.attributes.tangent&&(Et||le),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!ce.attributes.uv&&(ft||re),fog:!!te,useFog:C.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:z.isSkinnedMesh===!0,morphTargets:ce.morphAttributes.position!==void 0,morphNormals:ce.morphAttributes.normal!==void 0,morphColors:ce.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:ct,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:C.dithering,shadowMapEnabled:s.shadowMap.enabled&&X.length>0,shadowMapType:s.shadowMap.type,toneMapping:ut,useLegacyLights:s._useLegacyLights,decodeVideoTexture:ft&&C.map.isVideoTexture===!0&&Ct.getTransfer(C.map.colorSpace)===kt,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===pi,flipSided:C.side===Fn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:pt&&C.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:pt&&C.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return Ut.vertexUv1s=f.has(1),Ut.vertexUv2s=f.has(2),Ut.vertexUv3s=f.has(3),f.clear(),Ut}function _(C){const w=[];if(C.shaderID?w.push(C.shaderID):(w.push(C.customVertexShaderID),w.push(C.customFragmentShaderID)),C.defines!==void 0)for(const X in C.defines)w.push(X),w.push(C.defines[X]);return C.isRawShaderMaterial===!1&&(P(w,C),T(w,C),w.push(s.outputColorSpace)),w.push(C.customProgramCacheKey),w.join()}function P(C,w){C.push(w.precision),C.push(w.outputColorSpace),C.push(w.envMapMode),C.push(w.envMapCubeUVHeight),C.push(w.mapUv),C.push(w.alphaMapUv),C.push(w.lightMapUv),C.push(w.aoMapUv),C.push(w.bumpMapUv),C.push(w.normalMapUv),C.push(w.displacementMapUv),C.push(w.emissiveMapUv),C.push(w.metalnessMapUv),C.push(w.roughnessMapUv),C.push(w.anisotropyMapUv),C.push(w.clearcoatMapUv),C.push(w.clearcoatNormalMapUv),C.push(w.clearcoatRoughnessMapUv),C.push(w.iridescenceMapUv),C.push(w.iridescenceThicknessMapUv),C.push(w.sheenColorMapUv),C.push(w.sheenRoughnessMapUv),C.push(w.specularMapUv),C.push(w.specularColorMapUv),C.push(w.specularIntensityMapUv),C.push(w.transmissionMapUv),C.push(w.thicknessMapUv),C.push(w.combine),C.push(w.fogExp2),C.push(w.sizeAttenuation),C.push(w.morphTargetsCount),C.push(w.morphAttributeCount),C.push(w.numDirLights),C.push(w.numPointLights),C.push(w.numSpotLights),C.push(w.numSpotLightMaps),C.push(w.numHemiLights),C.push(w.numRectAreaLights),C.push(w.numDirLightShadows),C.push(w.numPointLightShadows),C.push(w.numSpotLightShadows),C.push(w.numSpotLightShadowsWithMaps),C.push(w.numLightProbes),C.push(w.shadowMapType),C.push(w.toneMapping),C.push(w.numClippingPlanes),C.push(w.numClipIntersection),C.push(w.depthPacking)}function T(C,w){l.disableAll(),w.supportsVertexTextures&&l.enable(0),w.instancing&&l.enable(1),w.instancingColor&&l.enable(2),w.instancingMorph&&l.enable(3),w.matcap&&l.enable(4),w.envMap&&l.enable(5),w.normalMapObjectSpace&&l.enable(6),w.normalMapTangentSpace&&l.enable(7),w.clearcoat&&l.enable(8),w.iridescence&&l.enable(9),w.alphaTest&&l.enable(10),w.vertexColors&&l.enable(11),w.vertexAlphas&&l.enable(12),w.vertexUv1s&&l.enable(13),w.vertexUv2s&&l.enable(14),w.vertexUv3s&&l.enable(15),w.vertexTangents&&l.enable(16),w.anisotropy&&l.enable(17),w.alphaHash&&l.enable(18),w.batching&&l.enable(19),C.push(l.mask),l.disableAll(),w.fog&&l.enable(0),w.useFog&&l.enable(1),w.flatShading&&l.enable(2),w.logarithmicDepthBuffer&&l.enable(3),w.skinning&&l.enable(4),w.morphTargets&&l.enable(5),w.morphNormals&&l.enable(6),w.morphColors&&l.enable(7),w.premultipliedAlpha&&l.enable(8),w.shadowMapEnabled&&l.enable(9),w.useLegacyLights&&l.enable(10),w.doubleSided&&l.enable(11),w.flipSided&&l.enable(12),w.useDepthPacking&&l.enable(13),w.dithering&&l.enable(14),w.transmission&&l.enable(15),w.sheen&&l.enable(16),w.opaque&&l.enable(17),w.pointsUvs&&l.enable(18),w.decodeVideoTexture&&l.enable(19),w.alphaToCoverage&&l.enable(20),C.push(l.mask)}function I(C){const w=M[C.type];let X;if(w){const J=wi[w];X=YT.clone(J.uniforms)}else X=C.uniforms;return X}function k(C,w){let X;for(let J=0,z=d.length;J<z;J++){const te=d[J];if(te.cacheKey===w){X=te,++X.usedTimes;break}}return X===void 0&&(X=new s1(s,w,C,o),d.push(X)),X}function O(C){if(--C.usedTimes===0){const w=d.indexOf(C);d[w]=d[d.length-1],d.pop(),C.destroy()}}function D(C){h.remove(C)}function V(){h.dispose()}return{getParameters:x,getProgramCacheKey:_,getUniforms:I,acquireProgram:k,releaseProgram:O,releaseShaderCache:D,programs:d,dispose:V}}function u1(){let s=new WeakMap;function e(o){let c=s.get(o);return c===void 0&&(c={},s.set(o,c)),c}function t(o){s.delete(o)}function n(o,c,l){s.get(o)[c]=l}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function h1(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Sm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Mm(){const s=[];let e=0;const t=[],n=[],i=[];function o(){e=0,t.length=0,n.length=0,i.length=0}function c(p,m,v,M,E,x){let _=s[e];return _===void 0?(_={id:p.id,object:p,geometry:m,material:v,groupOrder:M,renderOrder:p.renderOrder,z:E,group:x},s[e]=_):(_.id=p.id,_.object=p,_.geometry=m,_.material=v,_.groupOrder=M,_.renderOrder=p.renderOrder,_.z=E,_.group=x),e++,_}function l(p,m,v,M,E,x){const _=c(p,m,v,M,E,x);v.transmission>0?n.push(_):v.transparent===!0?i.push(_):t.push(_)}function h(p,m,v,M,E,x){const _=c(p,m,v,M,E,x);v.transmission>0?n.unshift(_):v.transparent===!0?i.unshift(_):t.unshift(_)}function f(p,m){t.length>1&&t.sort(p||h1),n.length>1&&n.sort(m||Sm),i.length>1&&i.sort(m||Sm)}function d(){for(let p=e,m=s.length;p<m;p++){const v=s[p];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:i,init:o,push:l,unshift:h,finish:d,sort:f}}function f1(){let s=new WeakMap;function e(n,i){const o=s.get(n);let c;return o===void 0?(c=new Mm,s.set(n,[c])):i>=o.length?(c=new Mm,o.push(c)):c=o[i],c}function t(){s=new WeakMap}return{get:e,dispose:t}}function d1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new De};break;case"SpotLight":t={position:new F,direction:new F,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new F,halfWidth:new F,halfHeight:new F};break}return s[e.id]=t,t}}}function p1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let m1=0;function g1(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function _1(s){const e=new d1,t=p1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)n.probe.push(new F);const i=new F,o=new Je,c=new Je;function l(f,d){let p=0,m=0,v=0;for(let X=0;X<9;X++)n.probe[X].set(0,0,0);let M=0,E=0,x=0,_=0,P=0,T=0,I=0,k=0,O=0,D=0,V=0;f.sort(g1);const C=d===!0?Math.PI:1;for(let X=0,J=f.length;X<J;X++){const z=f[X],te=z.color,ce=z.intensity,ue=z.distance,xe=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)p+=te.r*ce*C,m+=te.g*ce*C,v+=te.b*ce*C;else if(z.isLightProbe){for(let Q=0;Q<9;Q++)n.probe[Q].addScaledVector(z.sh.coefficients[Q],ce);V++}else if(z.isDirectionalLight){const Q=e.get(z);if(Q.color.copy(z.color).multiplyScalar(z.intensity*C),z.castShadow){const ge=z.shadow,de=t.get(z);de.shadowBias=ge.bias,de.shadowNormalBias=ge.normalBias,de.shadowRadius=ge.radius,de.shadowMapSize=ge.mapSize,n.directionalShadow[M]=de,n.directionalShadowMap[M]=xe,n.directionalShadowMatrix[M]=z.shadow.matrix,T++}n.directional[M]=Q,M++}else if(z.isSpotLight){const Q=e.get(z);Q.position.setFromMatrixPosition(z.matrixWorld),Q.color.copy(te).multiplyScalar(ce*C),Q.distance=ue,Q.coneCos=Math.cos(z.angle),Q.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),Q.decay=z.decay,n.spot[x]=Q;const ge=z.shadow;if(z.map&&(n.spotLightMap[O]=z.map,O++,ge.updateMatrices(z),z.castShadow&&D++),n.spotLightMatrix[x]=ge.matrix,z.castShadow){const de=t.get(z);de.shadowBias=ge.bias,de.shadowNormalBias=ge.normalBias,de.shadowRadius=ge.radius,de.shadowMapSize=ge.mapSize,n.spotShadow[x]=de,n.spotShadowMap[x]=xe,k++}x++}else if(z.isRectAreaLight){const Q=e.get(z);Q.color.copy(te).multiplyScalar(ce),Q.halfWidth.set(z.width*.5,0,0),Q.halfHeight.set(0,z.height*.5,0),n.rectArea[_]=Q,_++}else if(z.isPointLight){const Q=e.get(z);if(Q.color.copy(z.color).multiplyScalar(z.intensity*C),Q.distance=z.distance,Q.decay=z.decay,z.castShadow){const ge=z.shadow,de=t.get(z);de.shadowBias=ge.bias,de.shadowNormalBias=ge.normalBias,de.shadowRadius=ge.radius,de.shadowMapSize=ge.mapSize,de.shadowCameraNear=ge.camera.near,de.shadowCameraFar=ge.camera.far,n.pointShadow[E]=de,n.pointShadowMap[E]=xe,n.pointShadowMatrix[E]=z.shadow.matrix,I++}n.point[E]=Q,E++}else if(z.isHemisphereLight){const Q=e.get(z);Q.skyColor.copy(z.color).multiplyScalar(ce*C),Q.groundColor.copy(z.groundColor).multiplyScalar(ce*C),n.hemi[P]=Q,P++}}_>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=m,n.ambient[2]=v;const w=n.hash;(w.directionalLength!==M||w.pointLength!==E||w.spotLength!==x||w.rectAreaLength!==_||w.hemiLength!==P||w.numDirectionalShadows!==T||w.numPointShadows!==I||w.numSpotShadows!==k||w.numSpotMaps!==O||w.numLightProbes!==V)&&(n.directional.length=M,n.spot.length=x,n.rectArea.length=_,n.point.length=E,n.hemi.length=P,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=I,n.pointShadowMap.length=I,n.spotShadow.length=k,n.spotShadowMap.length=k,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=I,n.spotLightMatrix.length=k+O-D,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=V,w.directionalLength=M,w.pointLength=E,w.spotLength=x,w.rectAreaLength=_,w.hemiLength=P,w.numDirectionalShadows=T,w.numPointShadows=I,w.numSpotShadows=k,w.numSpotMaps=O,w.numLightProbes=V,n.version=m1++)}function h(f,d){let p=0,m=0,v=0,M=0,E=0;const x=d.matrixWorldInverse;for(let _=0,P=f.length;_<P;_++){const T=f[_];if(T.isDirectionalLight){const I=n.directional[p];I.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),I.direction.sub(i),I.direction.transformDirection(x),p++}else if(T.isSpotLight){const I=n.spot[v];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(x),I.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),I.direction.sub(i),I.direction.transformDirection(x),v++}else if(T.isRectAreaLight){const I=n.rectArea[M];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(x),c.identity(),o.copy(T.matrixWorld),o.premultiply(x),c.extractRotation(o),I.halfWidth.set(T.width*.5,0,0),I.halfHeight.set(0,T.height*.5,0),I.halfWidth.applyMatrix4(c),I.halfHeight.applyMatrix4(c),M++}else if(T.isPointLight){const I=n.point[m];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(x),m++}else if(T.isHemisphereLight){const I=n.hemi[E];I.direction.setFromMatrixPosition(T.matrixWorld),I.direction.transformDirection(x),E++}}}return{setup:l,setupView:h,state:n}}function Em(s){const e=new _1(s),t=[],n=[];function i(){t.length=0,n.length=0}function o(d){t.push(d)}function c(d){n.push(d)}function l(d){e.setup(t,d)}function h(d){e.setupView(t,d)}return{init:i,state:{lightsArray:t,shadowsArray:n,lights:e,transmissionRenderTarget:null},setupLights:l,setupLightsView:h,pushLight:o,pushShadow:c}}function v1(s){let e=new WeakMap;function t(i,o=0){const c=e.get(i);let l;return c===void 0?(l=new Em(s),e.set(i,[l])):o>=c.length?(l=new Em(s),c.push(l)):l=c[o],l}function n(){e=new WeakMap}return{get:t,dispose:n}}class x1 extends ri{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class y1 extends ri{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const S1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,M1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function E1(s,e,t){let n=new Mh;const i=new Ne,o=new Ne,c=new It,l=new x1({depthPacking:rT}),h=new y1,f={},d=t.maxTextureSize,p={[Li]:Fn,[Fn]:Li,[pi]:pi},m=new sr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:S1,fragmentShader:M1}),v=m.clone();v.defines.HORIZONTAL_PASS=1;const M=new on;M.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new un(M,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ag;let _=this.type;this.render=function(O,D,V){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||O.length===0)return;const C=s.getRenderTarget(),w=s.getActiveCubeFace(),X=s.getActiveMipmapLevel(),J=s.state;J.setBlending(Cr),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const z=_!==Ji&&this.type===Ji,te=_===Ji&&this.type!==Ji;for(let ce=0,ue=O.length;ce<ue;ce++){const xe=O[ce],Q=xe.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",xe,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;i.copy(Q.mapSize);const ge=Q.getFrameExtents();if(i.multiply(ge),o.copy(Q.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(o.x=Math.floor(d/ge.x),i.x=o.x*ge.x,Q.mapSize.x=o.x),i.y>d&&(o.y=Math.floor(d/ge.y),i.y=o.y*ge.y,Q.mapSize.y=o.y)),Q.map===null||z===!0||te===!0){const Ae=this.type!==Ji?{minFilter:En,magFilter:En}:{};Q.map!==null&&Q.map.dispose(),Q.map=new ns(i.x,i.y,Ae),Q.map.texture.name=xe.name+".shadowMap",Q.camera.updateProjectionMatrix()}s.setRenderTarget(Q.map),s.clear();const de=Q.getViewportCount();for(let Ae=0;Ae<de;Ae++){const ct=Q.getViewport(Ae);c.set(o.x*ct.x,o.y*ct.y,o.x*ct.z,o.y*ct.w),J.viewport(c),Q.updateMatrices(xe,Ae),n=Q.getFrustum(),I(D,V,Q.camera,xe,this.type)}Q.isPointLightShadow!==!0&&this.type===Ji&&P(Q,V),Q.needsUpdate=!1}_=this.type,x.needsUpdate=!1,s.setRenderTarget(C,w,X)};function P(O,D){const V=e.update(E);m.defines.VSM_SAMPLES!==O.blurSamples&&(m.defines.VSM_SAMPLES=O.blurSamples,v.defines.VSM_SAMPLES=O.blurSamples,m.needsUpdate=!0,v.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new ns(i.x,i.y)),m.uniforms.shadow_pass.value=O.map.texture,m.uniforms.resolution.value=O.mapSize,m.uniforms.radius.value=O.radius,s.setRenderTarget(O.mapPass),s.clear(),s.renderBufferDirect(D,null,V,m,E,null),v.uniforms.shadow_pass.value=O.mapPass.texture,v.uniforms.resolution.value=O.mapSize,v.uniforms.radius.value=O.radius,s.setRenderTarget(O.map),s.clear(),s.renderBufferDirect(D,null,V,v,E,null)}function T(O,D,V,C){let w=null;const X=V.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(X!==void 0)w=X;else if(w=V.isPointLight===!0?h:l,s.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const J=w.uuid,z=D.uuid;let te=f[J];te===void 0&&(te={},f[J]=te);let ce=te[z];ce===void 0&&(ce=w.clone(),te[z]=ce,D.addEventListener("dispose",k)),w=ce}if(w.visible=D.visible,w.wireframe=D.wireframe,C===Ji?w.side=D.shadowSide!==null?D.shadowSide:D.side:w.side=D.shadowSide!==null?D.shadowSide:p[D.side],w.alphaMap=D.alphaMap,w.alphaTest=D.alphaTest,w.map=D.map,w.clipShadows=D.clipShadows,w.clippingPlanes=D.clippingPlanes,w.clipIntersection=D.clipIntersection,w.displacementMap=D.displacementMap,w.displacementScale=D.displacementScale,w.displacementBias=D.displacementBias,w.wireframeLinewidth=D.wireframeLinewidth,w.linewidth=D.linewidth,V.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const J=s.properties.get(w);J.light=V}return w}function I(O,D,V,C,w){if(O.visible===!1)return;if(O.layers.test(D.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&w===Ji)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,O.matrixWorld);const z=e.update(O),te=O.material;if(Array.isArray(te)){const ce=z.groups;for(let ue=0,xe=ce.length;ue<xe;ue++){const Q=ce[ue],ge=te[Q.materialIndex];if(ge&&ge.visible){const de=T(O,ge,C,w);O.onBeforeShadow(s,O,D,V,z,de,Q),s.renderBufferDirect(V,null,z,de,O,Q),O.onAfterShadow(s,O,D,V,z,de,Q)}}}else if(te.visible){const ce=T(O,te,C,w);O.onBeforeShadow(s,O,D,V,z,ce,null),s.renderBufferDirect(V,null,z,ce,O,null),O.onAfterShadow(s,O,D,V,z,ce,null)}}const J=O.children;for(let z=0,te=J.length;z<te;z++)I(J[z],D,V,C,w)}function k(O){O.target.removeEventListener("dispose",k);for(const V in f){const C=f[V],w=O.target.uuid;w in C&&(C[w].dispose(),delete C[w])}}}function T1(s){function e(){let y=!1;const Y=new It;let re=null;const ve=new It(0,0,0,0);return{setMask:function(be){re!==be&&!y&&(s.colorMask(be,be,be,be),re=be)},setLocked:function(be){y=be},setClear:function(be,pt,ut,Ut,$t){$t===!0&&(be*=Ut,pt*=Ut,ut*=Ut),Y.set(be,pt,ut,Ut),ve.equals(Y)===!1&&(s.clearColor(be,pt,ut,Ut),ve.copy(Y))},reset:function(){y=!1,re=null,ve.set(-1,0,0,0)}}}function t(){let y=!1,Y=null,re=null,ve=null;return{setTest:function(be){be?Re(s.DEPTH_TEST):Te(s.DEPTH_TEST)},setMask:function(be){Y!==be&&!y&&(s.depthMask(be),Y=be)},setFunc:function(be){if(re!==be){switch(be){case CE:s.depthFunc(s.NEVER);break;case LE:s.depthFunc(s.ALWAYS);break;case PE:s.depthFunc(s.LESS);break;case Ic:s.depthFunc(s.LEQUAL);break;case IE:s.depthFunc(s.EQUAL);break;case DE:s.depthFunc(s.GEQUAL);break;case UE:s.depthFunc(s.GREATER);break;case NE:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}re=be}},setLocked:function(be){y=be},setClear:function(be){ve!==be&&(s.clearDepth(be),ve=be)},reset:function(){y=!1,Y=null,re=null,ve=null}}}function n(){let y=!1,Y=null,re=null,ve=null,be=null,pt=null,ut=null,Ut=null,$t=null;return{setTest:function(bt){y||(bt?Re(s.STENCIL_TEST):Te(s.STENCIL_TEST))},setMask:function(bt){Y!==bt&&!y&&(s.stencilMask(bt),Y=bt)},setFunc:function(bt,Vt,Wt){(re!==bt||ve!==Vt||be!==Wt)&&(s.stencilFunc(bt,Vt,Wt),re=bt,ve=Vt,be=Wt)},setOp:function(bt,Vt,Wt){(pt!==bt||ut!==Vt||Ut!==Wt)&&(s.stencilOp(bt,Vt,Wt),pt=bt,ut=Vt,Ut=Wt)},setLocked:function(bt){y=bt},setClear:function(bt){$t!==bt&&(s.clearStencil(bt),$t=bt)},reset:function(){y=!1,Y=null,re=null,ve=null,be=null,pt=null,ut=null,Ut=null,$t=null}}}const i=new e,o=new t,c=new n,l=new WeakMap,h=new WeakMap;let f={},d={},p=new WeakMap,m=[],v=null,M=!1,E=null,x=null,_=null,P=null,T=null,I=null,k=null,O=new De(0,0,0),D=0,V=!1,C=null,w=null,X=null,J=null,z=null;const te=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ce=!1,ue=0;const xe=s.getParameter(s.VERSION);xe.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec(xe)[1]),ce=ue>=1):xe.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec(xe)[1]),ce=ue>=2);let Q=null,ge={};const de=s.getParameter(s.SCISSOR_BOX),Ae=s.getParameter(s.VIEWPORT),ct=new It().fromArray(de),Tt=new It().fromArray(Ae);function ie(y,Y,re,ve){const be=new Uint8Array(4),pt=s.createTexture();s.bindTexture(y,pt),s.texParameteri(y,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(y,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ut=0;ut<re;ut++)y===s.TEXTURE_3D||y===s.TEXTURE_2D_ARRAY?s.texImage3D(Y,0,s.RGBA,1,1,ve,0,s.RGBA,s.UNSIGNED_BYTE,be):s.texImage2D(Y+ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,be);return pt}const me={};me[s.TEXTURE_2D]=ie(s.TEXTURE_2D,s.TEXTURE_2D,1),me[s.TEXTURE_CUBE_MAP]=ie(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[s.TEXTURE_2D_ARRAY]=ie(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),me[s.TEXTURE_3D]=ie(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Re(s.DEPTH_TEST),o.setFunc(Ic),ke(!1),Et(tp),Re(s.CULL_FACE),Ge(Cr);function Re(y){f[y]!==!0&&(s.enable(y),f[y]=!0)}function Te(y){f[y]!==!1&&(s.disable(y),f[y]=!1)}function qe(y,Y){return d[y]!==Y?(s.bindFramebuffer(y,Y),d[y]=Y,y===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=Y),y===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=Y),!0):!1}function Ye(y,Y){let re=m,ve=!1;if(y){re=p.get(Y),re===void 0&&(re=[],p.set(Y,re));const be=y.textures;if(re.length!==be.length||re[0]!==s.COLOR_ATTACHMENT0){for(let pt=0,ut=be.length;pt<ut;pt++)re[pt]=s.COLOR_ATTACHMENT0+pt;re.length=be.length,ve=!0}}else re[0]!==s.BACK&&(re[0]=s.BACK,ve=!0);ve&&s.drawBuffers(re)}function ft(y){return v!==y?(s.useProgram(y),v=y,!0):!1}const q={[$r]:s.FUNC_ADD,[fE]:s.FUNC_SUBTRACT,[dE]:s.FUNC_REVERSE_SUBTRACT};q[pE]=s.MIN,q[mE]=s.MAX;const Qe={[gE]:s.ZERO,[_E]:s.ONE,[vE]:s.SRC_COLOR,[$u]:s.SRC_ALPHA,[TE]:s.SRC_ALPHA_SATURATE,[ME]:s.DST_COLOR,[yE]:s.DST_ALPHA,[xE]:s.ONE_MINUS_SRC_COLOR,[Ju]:s.ONE_MINUS_SRC_ALPHA,[EE]:s.ONE_MINUS_DST_COLOR,[SE]:s.ONE_MINUS_DST_ALPHA,[bE]:s.CONSTANT_COLOR,[AE]:s.ONE_MINUS_CONSTANT_COLOR,[wE]:s.CONSTANT_ALPHA,[RE]:s.ONE_MINUS_CONSTANT_ALPHA};function Ge(y,Y,re,ve,be,pt,ut,Ut,$t,bt){if(y===Cr){M===!0&&(Te(s.BLEND),M=!1);return}if(M===!1&&(Re(s.BLEND),M=!0),y!==hE){if(y!==E||bt!==V){if((x!==$r||T!==$r)&&(s.blendEquation(s.FUNC_ADD),x=$r,T=$r),bt)switch(y){case Zs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case np:s.blendFunc(s.ONE,s.ONE);break;case ip:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case rp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}else switch(y){case Zs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case np:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ip:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case rp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}_=null,P=null,I=null,k=null,O.set(0,0,0),D=0,E=y,V=bt}return}be=be||Y,pt=pt||re,ut=ut||ve,(Y!==x||be!==T)&&(s.blendEquationSeparate(q[Y],q[be]),x=Y,T=be),(re!==_||ve!==P||pt!==I||ut!==k)&&(s.blendFuncSeparate(Qe[re],Qe[ve],Qe[pt],Qe[ut]),_=re,P=ve,I=pt,k=ut),(Ut.equals(O)===!1||$t!==D)&&(s.blendColor(Ut.r,Ut.g,Ut.b,$t),O.copy(Ut),D=$t),E=y,V=!1}function Mt(y,Y){y.side===pi?Te(s.CULL_FACE):Re(s.CULL_FACE);let re=y.side===Fn;Y&&(re=!re),ke(re),y.blending===Zs&&y.transparent===!1?Ge(Cr):Ge(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),o.setFunc(y.depthFunc),o.setTest(y.depthTest),o.setMask(y.depthWrite),i.setMask(y.colorWrite);const ve=y.stencilWrite;c.setTest(ve),ve&&(c.setMask(y.stencilWriteMask),c.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),c.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),b(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?Re(s.SAMPLE_ALPHA_TO_COVERAGE):Te(s.SAMPLE_ALPHA_TO_COVERAGE)}function ke(y){C!==y&&(y?s.frontFace(s.CW):s.frontFace(s.CCW),C=y)}function Et(y){y!==lE?(Re(s.CULL_FACE),y!==w&&(y===tp?s.cullFace(s.BACK):y===uE?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Te(s.CULL_FACE),w=y}function U(y){y!==X&&(ce&&s.lineWidth(y),X=y)}function b(y,Y,re){y?(Re(s.POLYGON_OFFSET_FILL),(J!==Y||z!==re)&&(s.polygonOffset(Y,re),J=Y,z=re)):Te(s.POLYGON_OFFSET_FILL)}function ee(y){y?Re(s.SCISSOR_TEST):Te(s.SCISSOR_TEST)}function se(y){y===void 0&&(y=s.TEXTURE0+te-1),Q!==y&&(s.activeTexture(y),Q=y)}function le(y,Y,re){re===void 0&&(Q===null?re=s.TEXTURE0+te-1:re=Q);let ve=ge[re];ve===void 0&&(ve={type:void 0,texture:void 0},ge[re]=ve),(ve.type!==y||ve.texture!==Y)&&(Q!==re&&(s.activeTexture(re),Q=re),s.bindTexture(y,Y||me[y]),ve.type=y,ve.texture=Y)}function fe(){const y=ge[Q];y!==void 0&&y.type!==void 0&&(s.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)}function Fe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function pe(){try{s.compressedTexImage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Pe(){try{s.texSubImage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function ze(){try{s.texSubImage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function _e(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Me(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Xe(){try{s.texStorage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Ce(){try{s.texStorage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Le(){try{s.texImage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function rt(){try{s.texImage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function lt(y){ct.equals(y)===!1&&(s.scissor(y.x,y.y,y.z,y.w),ct.copy(y))}function vt(y){Tt.equals(y)===!1&&(s.viewport(y.x,y.y,y.z,y.w),Tt.copy(y))}function dt(y,Y){let re=h.get(Y);re===void 0&&(re=new WeakMap,h.set(Y,re));let ve=re.get(y);ve===void 0&&(ve=s.getUniformBlockIndex(Y,y.name),re.set(y,ve))}function xt(y,Y){const ve=h.get(Y).get(y);l.get(Y)!==ve&&(s.uniformBlockBinding(Y,ve,y.__bindingPointIndex),l.set(Y,ve))}function Ue(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},Q=null,ge={},d={},p=new WeakMap,m=[],v=null,M=!1,E=null,x=null,_=null,P=null,T=null,I=null,k=null,O=new De(0,0,0),D=0,V=!1,C=null,w=null,X=null,J=null,z=null,ct.set(0,0,s.canvas.width,s.canvas.height),Tt.set(0,0,s.canvas.width,s.canvas.height),i.reset(),o.reset(),c.reset()}return{buffers:{color:i,depth:o,stencil:c},enable:Re,disable:Te,bindFramebuffer:qe,drawBuffers:Ye,useProgram:ft,setBlending:Ge,setMaterial:Mt,setFlipSided:ke,setCullFace:Et,setLineWidth:U,setPolygonOffset:b,setScissorTest:ee,activeTexture:se,bindTexture:le,unbindTexture:fe,compressedTexImage2D:Fe,compressedTexImage3D:pe,texImage2D:Le,texImage3D:rt,updateUBOMapping:dt,uniformBlockBinding:xt,texStorage2D:Xe,texStorage3D:Ce,texSubImage2D:Pe,texSubImage3D:ze,compressedTexSubImage2D:_e,compressedTexSubImage3D:Me,scissor:lt,viewport:vt,reset:Ue}}function b1(s,e,t,n,i,o,c){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Ne,d=new WeakMap;let p;const m=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(U,b){return v?new OffscreenCanvas(U,b):ia("canvas")}function E(U,b,ee){let se=1;const le=Et(U);if((le.width>ee||le.height>ee)&&(se=ee/Math.max(le.width,le.height)),se<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const fe=Math.floor(se*le.width),Fe=Math.floor(se*le.height);p===void 0&&(p=M(fe,Fe));const pe=b?M(fe,Fe):p;return pe.width=fe,pe.height=Fe,pe.getContext("2d").drawImage(U,0,0,fe,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+fe+"x"+Fe+")."),pe}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),U;return U}function x(U){return U.generateMipmaps&&U.minFilter!==En&&U.minFilter!==Pn}function _(U){s.generateMipmap(U)}function P(U,b,ee,se,le=!1){if(U!==null){if(s[U]!==void 0)return s[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let fe=b;if(b===s.RED&&(ee===s.FLOAT&&(fe=s.R32F),ee===s.HALF_FLOAT&&(fe=s.R16F),ee===s.UNSIGNED_BYTE&&(fe=s.R8)),b===s.RED_INTEGER&&(ee===s.UNSIGNED_BYTE&&(fe=s.R8UI),ee===s.UNSIGNED_SHORT&&(fe=s.R16UI),ee===s.UNSIGNED_INT&&(fe=s.R32UI),ee===s.BYTE&&(fe=s.R8I),ee===s.SHORT&&(fe=s.R16I),ee===s.INT&&(fe=s.R32I)),b===s.RG&&(ee===s.FLOAT&&(fe=s.RG32F),ee===s.HALF_FLOAT&&(fe=s.RG16F),ee===s.UNSIGNED_BYTE&&(fe=s.RG8)),b===s.RG_INTEGER&&(ee===s.UNSIGNED_BYTE&&(fe=s.RG8UI),ee===s.UNSIGNED_SHORT&&(fe=s.RG16UI),ee===s.UNSIGNED_INT&&(fe=s.RG32UI),ee===s.BYTE&&(fe=s.RG8I),ee===s.SHORT&&(fe=s.RG16I),ee===s.INT&&(fe=s.RG32I)),b===s.RGB&&ee===s.UNSIGNED_INT_5_9_9_9_REV&&(fe=s.RGB9_E5),b===s.RGBA){const Fe=le?Uc:Ct.getTransfer(se);ee===s.FLOAT&&(fe=s.RGBA32F),ee===s.HALF_FLOAT&&(fe=s.RGBA16F),ee===s.UNSIGNED_BYTE&&(fe=Fe===kt?s.SRGB8_ALPHA8:s.RGBA8),ee===s.UNSIGNED_SHORT_4_4_4_4&&(fe=s.RGBA4),ee===s.UNSIGNED_SHORT_5_5_5_1&&(fe=s.RGB5_A1)}return(fe===s.R16F||fe===s.R32F||fe===s.RG16F||fe===s.RG32F||fe===s.RGBA16F||fe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function T(U,b){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==En&&U.minFilter!==Pn?Math.log2(Math.max(b.width,b.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?b.mipmaps.length:1}function I(U){const b=U.target;b.removeEventListener("dispose",I),O(b),b.isVideoTexture&&d.delete(b)}function k(U){const b=U.target;b.removeEventListener("dispose",k),V(b)}function O(U){const b=n.get(U);if(b.__webglInit===void 0)return;const ee=U.source,se=m.get(ee);if(se){const le=se[b.__cacheKey];le.usedTimes--,le.usedTimes===0&&D(U),Object.keys(se).length===0&&m.delete(ee)}n.remove(U)}function D(U){const b=n.get(U);s.deleteTexture(b.__webglTexture);const ee=U.source,se=m.get(ee);delete se[b.__cacheKey],c.memory.textures--}function V(U){const b=n.get(U);if(U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(b.__webglFramebuffer[se]))for(let le=0;le<b.__webglFramebuffer[se].length;le++)s.deleteFramebuffer(b.__webglFramebuffer[se][le]);else s.deleteFramebuffer(b.__webglFramebuffer[se]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[se])}else{if(Array.isArray(b.__webglFramebuffer))for(let se=0;se<b.__webglFramebuffer.length;se++)s.deleteFramebuffer(b.__webglFramebuffer[se]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let se=0;se<b.__webglColorRenderbuffer.length;se++)b.__webglColorRenderbuffer[se]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[se]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const ee=U.textures;for(let se=0,le=ee.length;se<le;se++){const fe=n.get(ee[se]);fe.__webglTexture&&(s.deleteTexture(fe.__webglTexture),c.memory.textures--),n.remove(ee[se])}n.remove(U)}let C=0;function w(){C=0}function X(){const U=C;return U>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+i.maxTextures),C+=1,U}function J(U){const b=[];return b.push(U.wrapS),b.push(U.wrapT),b.push(U.wrapR||0),b.push(U.magFilter),b.push(U.minFilter),b.push(U.anisotropy),b.push(U.internalFormat),b.push(U.format),b.push(U.type),b.push(U.generateMipmaps),b.push(U.premultiplyAlpha),b.push(U.flipY),b.push(U.unpackAlignment),b.push(U.colorSpace),b.join()}function z(U,b){const ee=n.get(U);if(U.isVideoTexture&&Mt(U),U.isRenderTargetTexture===!1&&U.version>0&&ee.__version!==U.version){const se=U.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ct(ee,U,b);return}}t.bindTexture(s.TEXTURE_2D,ee.__webglTexture,s.TEXTURE0+b)}function te(U,b){const ee=n.get(U);if(U.version>0&&ee.__version!==U.version){ct(ee,U,b);return}t.bindTexture(s.TEXTURE_2D_ARRAY,ee.__webglTexture,s.TEXTURE0+b)}function ce(U,b){const ee=n.get(U);if(U.version>0&&ee.__version!==U.version){ct(ee,U,b);return}t.bindTexture(s.TEXTURE_3D,ee.__webglTexture,s.TEXTURE0+b)}function ue(U,b){const ee=n.get(U);if(U.version>0&&ee.__version!==U.version){Tt(ee,U,b);return}t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture,s.TEXTURE0+b)}const xe={[es]:s.REPEAT,[er]:s.CLAMP_TO_EDGE,[ta]:s.MIRRORED_REPEAT},Q={[En]:s.NEAREST,[_h]:s.NEAREST_MIPMAP_NEAREST,[Ys]:s.NEAREST_MIPMAP_LINEAR,[Pn]:s.LINEAR,[Zo]:s.LINEAR_MIPMAP_NEAREST,[Ri]:s.LINEAR_MIPMAP_LINEAR},ge={[oT]:s.NEVER,[fT]:s.ALWAYS,[aT]:s.LESS,[Mg]:s.LEQUAL,[cT]:s.EQUAL,[hT]:s.GEQUAL,[lT]:s.GREATER,[uT]:s.NOTEQUAL};function de(U,b){if(b.type===Ci&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Pn||b.magFilter===Zo||b.magFilter===Ys||b.magFilter===Ri||b.minFilter===Pn||b.minFilter===Zo||b.minFilter===Ys||b.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(U,s.TEXTURE_WRAP_S,xe[b.wrapS]),s.texParameteri(U,s.TEXTURE_WRAP_T,xe[b.wrapT]),(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)&&s.texParameteri(U,s.TEXTURE_WRAP_R,xe[b.wrapR]),s.texParameteri(U,s.TEXTURE_MAG_FILTER,Q[b.magFilter]),s.texParameteri(U,s.TEXTURE_MIN_FILTER,Q[b.minFilter]),b.compareFunction&&(s.texParameteri(U,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(U,s.TEXTURE_COMPARE_FUNC,ge[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===En||b.minFilter!==Ys&&b.minFilter!==Ri||b.type===Ci&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const ee=e.get("EXT_texture_filter_anisotropic");s.texParameterf(U,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ae(U,b){let ee=!1;U.__webglInit===void 0&&(U.__webglInit=!0,b.addEventListener("dispose",I));const se=b.source;let le=m.get(se);le===void 0&&(le={},m.set(se,le));const fe=J(b);if(fe!==U.__cacheKey){le[fe]===void 0&&(le[fe]={texture:s.createTexture(),usedTimes:0},c.memory.textures++,ee=!0),le[fe].usedTimes++;const Fe=le[U.__cacheKey];Fe!==void 0&&(le[U.__cacheKey].usedTimes--,Fe.usedTimes===0&&D(b)),U.__cacheKey=fe,U.__webglTexture=le[fe].texture}return ee}function ct(U,b,ee){let se=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(se=s.TEXTURE_3D);const le=Ae(U,b),fe=b.source;t.bindTexture(se,U.__webglTexture,s.TEXTURE0+ee);const Fe=n.get(fe);if(fe.version!==Fe.__version||le===!0){t.activeTexture(s.TEXTURE0+ee);const pe=Ct.getPrimaries(Ct.workingColorSpace),Pe=b.colorSpace===Qi?null:Ct.getPrimaries(b.colorSpace),ze=b.colorSpace===Qi||pe===Pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let _e=E(b.image,!1,i.maxTextureSize);_e=ke(b,_e);const Me=o.convert(b.format,b.colorSpace),Xe=o.convert(b.type);let Ce=P(b.internalFormat,Me,Xe,b.colorSpace,b.isVideoTexture);de(se,b);let Le;const rt=b.mipmaps,lt=b.isVideoTexture!==!0&&Ce!==xg,vt=Fe.__version===void 0||le===!0,dt=fe.dataReady,xt=T(b,_e);if(b.isDepthTexture)Ce=s.DEPTH_COMPONENT16,b.type===Ci?Ce=s.DEPTH_COMPONENT32F:b.type===no?Ce=s.DEPTH_COMPONENT24:b.type===sa&&(Ce=s.DEPTH24_STENCIL8),vt&&(lt?t.texStorage2D(s.TEXTURE_2D,1,Ce,_e.width,_e.height):t.texImage2D(s.TEXTURE_2D,0,Ce,_e.width,_e.height,0,Me,Xe,null));else if(b.isDataTexture)if(rt.length>0){lt&&vt&&t.texStorage2D(s.TEXTURE_2D,xt,Ce,rt[0].width,rt[0].height);for(let Ue=0,y=rt.length;Ue<y;Ue++)Le=rt[Ue],lt?dt&&t.texSubImage2D(s.TEXTURE_2D,Ue,0,0,Le.width,Le.height,Me,Xe,Le.data):t.texImage2D(s.TEXTURE_2D,Ue,Ce,Le.width,Le.height,0,Me,Xe,Le.data);b.generateMipmaps=!1}else lt?(vt&&t.texStorage2D(s.TEXTURE_2D,xt,Ce,_e.width,_e.height),dt&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,_e.width,_e.height,Me,Xe,_e.data)):t.texImage2D(s.TEXTURE_2D,0,Ce,_e.width,_e.height,0,Me,Xe,_e.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){lt&&vt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,xt,Ce,rt[0].width,rt[0].height,_e.depth);for(let Ue=0,y=rt.length;Ue<y;Ue++)Le=rt[Ue],b.format!==ii?Me!==null?lt?dt&&t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Ue,0,0,0,Le.width,Le.height,_e.depth,Me,Le.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Ue,Ce,Le.width,Le.height,_e.depth,0,Le.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?dt&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Ue,0,0,0,Le.width,Le.height,_e.depth,Me,Xe,Le.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Ue,Ce,Le.width,Le.height,_e.depth,0,Me,Xe,Le.data)}else{lt&&vt&&t.texStorage2D(s.TEXTURE_2D,xt,Ce,rt[0].width,rt[0].height);for(let Ue=0,y=rt.length;Ue<y;Ue++)Le=rt[Ue],b.format!==ii?Me!==null?lt?dt&&t.compressedTexSubImage2D(s.TEXTURE_2D,Ue,0,0,Le.width,Le.height,Me,Le.data):t.compressedTexImage2D(s.TEXTURE_2D,Ue,Ce,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?dt&&t.texSubImage2D(s.TEXTURE_2D,Ue,0,0,Le.width,Le.height,Me,Xe,Le.data):t.texImage2D(s.TEXTURE_2D,Ue,Ce,Le.width,Le.height,0,Me,Xe,Le.data)}else if(b.isDataArrayTexture)lt?(vt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,xt,Ce,_e.width,_e.height,_e.depth),dt&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,Me,Xe,_e.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ce,_e.width,_e.height,_e.depth,0,Me,Xe,_e.data);else if(b.isData3DTexture)lt?(vt&&t.texStorage3D(s.TEXTURE_3D,xt,Ce,_e.width,_e.height,_e.depth),dt&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,Me,Xe,_e.data)):t.texImage3D(s.TEXTURE_3D,0,Ce,_e.width,_e.height,_e.depth,0,Me,Xe,_e.data);else if(b.isFramebufferTexture){if(vt)if(lt)t.texStorage2D(s.TEXTURE_2D,xt,Ce,_e.width,_e.height);else{let Ue=_e.width,y=_e.height;for(let Y=0;Y<xt;Y++)t.texImage2D(s.TEXTURE_2D,Y,Ce,Ue,y,0,Me,Xe,null),Ue>>=1,y>>=1}}else if(rt.length>0){if(lt&&vt){const Ue=Et(rt[0]);t.texStorage2D(s.TEXTURE_2D,xt,Ce,Ue.width,Ue.height)}for(let Ue=0,y=rt.length;Ue<y;Ue++)Le=rt[Ue],lt?dt&&t.texSubImage2D(s.TEXTURE_2D,Ue,0,0,Me,Xe,Le):t.texImage2D(s.TEXTURE_2D,Ue,Ce,Me,Xe,Le);b.generateMipmaps=!1}else if(lt){if(vt){const Ue=Et(_e);t.texStorage2D(s.TEXTURE_2D,xt,Ce,Ue.width,Ue.height)}dt&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Me,Xe,_e)}else t.texImage2D(s.TEXTURE_2D,0,Ce,Me,Xe,_e);x(b)&&_(se),Fe.__version=fe.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function Tt(U,b,ee){if(b.image.length!==6)return;const se=Ae(U,b),le=b.source;t.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+ee);const fe=n.get(le);if(le.version!==fe.__version||se===!0){t.activeTexture(s.TEXTURE0+ee);const Fe=Ct.getPrimaries(Ct.workingColorSpace),pe=b.colorSpace===Qi?null:Ct.getPrimaries(b.colorSpace),Pe=b.colorSpace===Qi||Fe===pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const ze=b.isCompressedTexture||b.image[0].isCompressedTexture,_e=b.image[0]&&b.image[0].isDataTexture,Me=[];for(let y=0;y<6;y++)!ze&&!_e?Me[y]=E(b.image[y],!0,i.maxCubemapSize):Me[y]=_e?b.image[y].image:b.image[y],Me[y]=ke(b,Me[y]);const Xe=Me[0],Ce=o.convert(b.format,b.colorSpace),Le=o.convert(b.type),rt=P(b.internalFormat,Ce,Le,b.colorSpace),lt=b.isVideoTexture!==!0,vt=fe.__version===void 0||se===!0,dt=le.dataReady;let xt=T(b,Xe);de(s.TEXTURE_CUBE_MAP,b);let Ue;if(ze){lt&&vt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,xt,rt,Xe.width,Xe.height);for(let y=0;y<6;y++){Ue=Me[y].mipmaps;for(let Y=0;Y<Ue.length;Y++){const re=Ue[Y];b.format!==ii?Ce!==null?lt?dt&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y,0,0,re.width,re.height,Ce,re.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y,rt,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y,0,0,re.width,re.height,Ce,Le,re.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y,rt,re.width,re.height,0,Ce,Le,re.data)}}}else{if(Ue=b.mipmaps,lt&&vt){Ue.length>0&&xt++;const y=Et(Me[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,xt,rt,y.width,y.height)}for(let y=0;y<6;y++)if(_e){lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,0,0,Me[y].width,Me[y].height,Ce,Le,Me[y].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,rt,Me[y].width,Me[y].height,0,Ce,Le,Me[y].data);for(let Y=0;Y<Ue.length;Y++){const ve=Ue[Y].image[y].image;lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y+1,0,0,ve.width,ve.height,Ce,Le,ve.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y+1,rt,ve.width,ve.height,0,Ce,Le,ve.data)}}else{lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,0,0,Ce,Le,Me[y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,rt,Ce,Le,Me[y]);for(let Y=0;Y<Ue.length;Y++){const re=Ue[Y];lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y+1,0,0,Ce,Le,re.image[y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y+1,rt,Ce,Le,re.image[y])}}}x(b)&&_(s.TEXTURE_CUBE_MAP),fe.__version=le.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function ie(U,b,ee,se,le,fe){const Fe=o.convert(ee.format,ee.colorSpace),pe=o.convert(ee.type),Pe=P(ee.internalFormat,Fe,pe,ee.colorSpace);if(!n.get(b).__hasExternalTextures){const _e=Math.max(1,b.width>>fe),Me=Math.max(1,b.height>>fe);le===s.TEXTURE_3D||le===s.TEXTURE_2D_ARRAY?t.texImage3D(le,fe,Pe,_e,Me,b.depth,0,Fe,pe,null):t.texImage2D(le,fe,Pe,_e,Me,0,Fe,pe,null)}t.bindFramebuffer(s.FRAMEBUFFER,U),Ge(b)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,le,n.get(ee).__webglTexture,0,Qe(b)):(le===s.TEXTURE_2D||le>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,le,n.get(ee).__webglTexture,fe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function me(U,b,ee){if(s.bindRenderbuffer(s.RENDERBUFFER,U),b.depthBuffer&&!b.stencilBuffer){let se=s.DEPTH_COMPONENT24;if(ee||Ge(b)){const le=b.depthTexture;le&&le.isDepthTexture&&(le.type===Ci?se=s.DEPTH_COMPONENT32F:le.type===no&&(se=s.DEPTH_COMPONENT24));const fe=Qe(b);Ge(b)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe,se,b.width,b.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,se,b.width,b.height)}else s.renderbufferStorage(s.RENDERBUFFER,se,b.width,b.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,U)}else if(b.depthBuffer&&b.stencilBuffer){const se=Qe(b);ee&&Ge(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,b.width,b.height):Ge(b)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,U)}else{const se=b.textures;for(let le=0;le<se.length;le++){const fe=se[le],Fe=o.convert(fe.format,fe.colorSpace),pe=o.convert(fe.type),Pe=P(fe.internalFormat,Fe,pe,fe.colorSpace),ze=Qe(b);ee&&Ge(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ze,Pe,b.width,b.height):Ge(b)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ze,Pe,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Pe,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Re(U,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,U),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),z(b.depthTexture,0);const se=n.get(b.depthTexture).__webglTexture,le=Qe(b);if(b.depthTexture.format===$s)Ge(b)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(b.depthTexture.format===na)Ge(b)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Te(U){const b=n.get(U),ee=U.isWebGLCubeRenderTarget===!0;if(U.depthTexture&&!b.__autoAllocateDepthBuffer){if(ee)throw new Error("target.depthTexture not supported in Cube render targets");Re(b.__webglFramebuffer,U)}else if(ee){b.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[se]),b.__webglDepthbuffer[se]=s.createRenderbuffer(),me(b.__webglDepthbuffer[se],U,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=s.createRenderbuffer(),me(b.__webglDepthbuffer,U,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function qe(U,b,ee){const se=n.get(U);b!==void 0&&ie(se.__webglFramebuffer,U,U.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ee!==void 0&&Te(U)}function Ye(U){const b=U.texture,ee=n.get(U),se=n.get(b);U.addEventListener("dispose",k);const le=U.textures,fe=U.isWebGLCubeRenderTarget===!0,Fe=le.length>1;if(Fe||(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=b.version,c.memory.textures++),fe){ee.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(b.mipmaps&&b.mipmaps.length>0){ee.__webglFramebuffer[pe]=[];for(let Pe=0;Pe<b.mipmaps.length;Pe++)ee.__webglFramebuffer[pe][Pe]=s.createFramebuffer()}else ee.__webglFramebuffer[pe]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){ee.__webglFramebuffer=[];for(let pe=0;pe<b.mipmaps.length;pe++)ee.__webglFramebuffer[pe]=s.createFramebuffer()}else ee.__webglFramebuffer=s.createFramebuffer();if(Fe)for(let pe=0,Pe=le.length;pe<Pe;pe++){const ze=n.get(le[pe]);ze.__webglTexture===void 0&&(ze.__webglTexture=s.createTexture(),c.memory.textures++)}if(U.samples>0&&Ge(U)===!1){ee.__webglMultisampledFramebuffer=s.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let pe=0;pe<le.length;pe++){const Pe=le[pe];ee.__webglColorRenderbuffer[pe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ee.__webglColorRenderbuffer[pe]);const ze=o.convert(Pe.format,Pe.colorSpace),_e=o.convert(Pe.type),Me=P(Pe.internalFormat,ze,_e,Pe.colorSpace,U.isXRRenderTarget===!0),Xe=Qe(U);s.renderbufferStorageMultisample(s.RENDERBUFFER,Xe,Me,U.width,U.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,ee.__webglColorRenderbuffer[pe])}s.bindRenderbuffer(s.RENDERBUFFER,null),U.depthBuffer&&(ee.__webglDepthRenderbuffer=s.createRenderbuffer(),me(ee.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(fe){t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),de(s.TEXTURE_CUBE_MAP,b);for(let pe=0;pe<6;pe++)if(b.mipmaps&&b.mipmaps.length>0)for(let Pe=0;Pe<b.mipmaps.length;Pe++)ie(ee.__webglFramebuffer[pe][Pe],U,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Pe);else ie(ee.__webglFramebuffer[pe],U,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);x(b)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let pe=0,Pe=le.length;pe<Pe;pe++){const ze=le[pe],_e=n.get(ze);t.bindTexture(s.TEXTURE_2D,_e.__webglTexture),de(s.TEXTURE_2D,ze),ie(ee.__webglFramebuffer,U,ze,s.COLOR_ATTACHMENT0+pe,s.TEXTURE_2D,0),x(ze)&&_(s.TEXTURE_2D)}t.unbindTexture()}else{let pe=s.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(pe=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,se.__webglTexture),de(pe,b),b.mipmaps&&b.mipmaps.length>0)for(let Pe=0;Pe<b.mipmaps.length;Pe++)ie(ee.__webglFramebuffer[Pe],U,b,s.COLOR_ATTACHMENT0,pe,Pe);else ie(ee.__webglFramebuffer,U,b,s.COLOR_ATTACHMENT0,pe,0);x(b)&&_(pe),t.unbindTexture()}U.depthBuffer&&Te(U)}function ft(U){const b=U.textures;for(let ee=0,se=b.length;ee<se;ee++){const le=b[ee];if(x(le)){const fe=U.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Fe=n.get(le).__webglTexture;t.bindTexture(fe,Fe),_(fe),t.unbindTexture()}}}function q(U){if(U.samples>0&&Ge(U)===!1){const b=U.textures,ee=U.width,se=U.height;let le=s.COLOR_BUFFER_BIT;const fe=[],Fe=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=n.get(U),Pe=b.length>1;if(Pe)for(let ze=0;ze<b.length;ze++)t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let ze=0;ze<b.length;ze++){fe.push(s.COLOR_ATTACHMENT0+ze),U.depthBuffer&&fe.push(Fe);const _e=pe.__ignoreDepthValues!==void 0?pe.__ignoreDepthValues:!1;if(_e===!1&&(U.depthBuffer&&(le|=s.DEPTH_BUFFER_BIT),U.stencilBuffer&&pe.__isTransmissionRenderTarget!==!0&&(le|=s.STENCIL_BUFFER_BIT)),Pe&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,pe.__webglColorRenderbuffer[ze]),_e===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Fe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Fe])),Pe){const Me=n.get(b[ze]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Me,0)}s.blitFramebuffer(0,0,ee,se,0,0,ee,se,le,s.NEAREST),h&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Pe)for(let ze=0;ze<b.length;ze++){t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.RENDERBUFFER,pe.__webglColorRenderbuffer[ze]);const _e=n.get(b[ze]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.TEXTURE_2D,_e,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}}function Qe(U){return Math.min(i.maxSamples,U.samples)}function Ge(U){const b=n.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Mt(U){const b=c.render.frame;d.get(U)!==b&&(d.set(U,b),U.update())}function ke(U,b){const ee=U.colorSpace,se=U.format,le=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||ee!==hn&&ee!==Qi&&(Ct.getTransfer(ee)===kt?(se!==ii||le!==Lr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ee)),b}function Et(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(f.width=U.naturalWidth||U.width,f.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(f.width=U.displayWidth,f.height=U.displayHeight):(f.width=U.width,f.height=U.height),f}this.allocateTextureUnit=X,this.resetTextureUnits=w,this.setTexture2D=z,this.setTexture2DArray=te,this.setTexture3D=ce,this.setTextureCube=ue,this.rebindTextures=qe,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Ge}function A1(s,e){function t(n,i=Qi){let o;const c=Ct.getTransfer(i);if(n===Lr)return s.UNSIGNED_BYTE;if(n===dg)return s.UNSIGNED_SHORT_4_4_4_4;if(n===pg)return s.UNSIGNED_SHORT_5_5_5_1;if(n===jE)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===qE)return s.BYTE;if(n===YE)return s.SHORT;if(n===hg)return s.UNSIGNED_SHORT;if(n===fg)return s.INT;if(n===no)return s.UNSIGNED_INT;if(n===Ci)return s.FLOAT;if(n===Dc)return s.HALF_FLOAT;if(n===KE)return s.ALPHA;if(n===ZE)return s.RGB;if(n===ii)return s.RGBA;if(n===$E)return s.LUMINANCE;if(n===JE)return s.LUMINANCE_ALPHA;if(n===$s)return s.DEPTH_COMPONENT;if(n===na)return s.DEPTH_STENCIL;if(n===mg)return s.RED;if(n===gg)return s.RED_INTEGER;if(n===QE)return s.RG;if(n===_g)return s.RG_INTEGER;if(n===vg)return s.RGBA_INTEGER;if(n===cu||n===lu||n===uu||n===hu)if(c===kt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===cu)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===uu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===cu)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lu)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===uu)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hu)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===op||n===ap||n===cp||n===lp)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===op)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ap)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===cp)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lp)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xg)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===up||n===hp)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===up)return c===kt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===hp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fp||n===dp||n===pp||n===mp||n===gp||n===_p||n===vp||n===xp||n===yp||n===Sp||n===Mp||n===Ep||n===Tp||n===bp)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===fp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===mp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===gp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_p)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ep)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Tp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===bp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fu||n===Ap||n===wp)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===fu)return c===kt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ap)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wp)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===eT||n===Rp||n===Cp||n===Lp)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===fu)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Rp)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Cp)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lp)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sa?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class w1 extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let wr=class extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}};const R1={type:"move"};class Bu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,o=null,c=null;const l=this._targetRay,h=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){c=!0;for(const E of e.hand.values()){const x=t.getJointPose(E,n),_=this._getHandJoint(f,E);x!==null&&(_.matrix.fromArray(x.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=x.radius),_.visible=x!==null}const d=f.joints["index-finger-tip"],p=f.joints["thumb-tip"],m=d.position.distanceTo(p.position),v=.02,M=.005;f.inputState.pinching&&m>v+M?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&m<=v-M&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(l.matrix.fromArray(i.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,i.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(i.linearVelocity)):l.hasLinearVelocity=!1,i.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(i.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(R1)))}return l!==null&&(l.visible=i!==null),h!==null&&(h.visible=o!==null),f!==null&&(f.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new wr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const C1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class P1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Zt,o=e.properties.get(i);o.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,i=new sr({vertexShader:C1,fragmentShader:L1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new un(new ss(20,20),i)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class I1 extends rs{constructor(e,t){super();const n=this;let i=null,o=1,c=null,l="local-floor",h=1,f=null,d=null,p=null,m=null,v=null,M=null;const E=new P1,x=t.getContextAttributes();let _=null,P=null;const T=[],I=[],k=new Ne;let O=null;const D=new Mn;D.layers.enable(1),D.viewport=new It;const V=new Mn;V.layers.enable(2),V.viewport=new It;const C=[D,V],w=new w1;w.layers.enable(1),w.layers.enable(2);let X=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let me=T[ie];return me===void 0&&(me=new Bu,T[ie]=me),me.getTargetRaySpace()},this.getControllerGrip=function(ie){let me=T[ie];return me===void 0&&(me=new Bu,T[ie]=me),me.getGripSpace()},this.getHand=function(ie){let me=T[ie];return me===void 0&&(me=new Bu,T[ie]=me),me.getHandSpace()};function z(ie){const me=I.indexOf(ie.inputSource);if(me===-1)return;const Re=T[me];Re!==void 0&&(Re.update(ie.inputSource,ie.frame,f||c),Re.dispatchEvent({type:ie.type,data:ie.inputSource}))}function te(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",te),i.removeEventListener("inputsourceschange",ce);for(let ie=0;ie<T.length;ie++){const me=I[ie];me!==null&&(I[ie]=null,T[ie].disconnect(me))}X=null,J=null,E.reset(),e.setRenderTarget(_),v=null,m=null,p=null,i=null,P=null,Tt.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){o=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){l=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||c},this.setReferenceSpace=function(ie){f=ie},this.getBaseLayer=function(){return m!==null?m:v},this.getBinding=function(){return p},this.getFrame=function(){return M},this.getSession=function(){return i},this.setSession=async function(ie){if(i=ie,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",te),i.addEventListener("inputsourceschange",ce),x.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(k),i.renderState.layers===void 0){const me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};v=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),P=new ns(v.framebufferWidth,v.framebufferHeight,{format:ii,type:Lr,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let me=null,Re=null,Te=null;x.depth&&(Te=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=x.stencil?na:$s,Re=x.stencil?sa:no);const qe={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:o};p=new XRWebGLBinding(i,t),m=p.createProjectionLayer(qe),i.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),P=new ns(m.textureWidth,m.textureHeight,{format:ii,type:Lr,depthTexture:new Ug(m.textureWidth,m.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Ye=e.properties.get(P);Ye.__ignoreDepthValues=m.ignoreDepthValues}P.isXRRenderTarget=!0,this.setFoveation(h),f=null,c=await i.requestReferenceSpace(l),Tt.setContext(i),Tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function ce(ie){for(let me=0;me<ie.removed.length;me++){const Re=ie.removed[me],Te=I.indexOf(Re);Te>=0&&(I[Te]=null,T[Te].disconnect(Re))}for(let me=0;me<ie.added.length;me++){const Re=ie.added[me];let Te=I.indexOf(Re);if(Te===-1){for(let Ye=0;Ye<T.length;Ye++)if(Ye>=I.length){I.push(Re),Te=Ye;break}else if(I[Ye]===null){I[Ye]=Re,Te=Ye;break}if(Te===-1)break}const qe=T[Te];qe&&qe.connect(Re)}}const ue=new F,xe=new F;function Q(ie,me,Re){ue.setFromMatrixPosition(me.matrixWorld),xe.setFromMatrixPosition(Re.matrixWorld);const Te=ue.distanceTo(xe),qe=me.projectionMatrix.elements,Ye=Re.projectionMatrix.elements,ft=qe[14]/(qe[10]-1),q=qe[14]/(qe[10]+1),Qe=(qe[9]+1)/qe[5],Ge=(qe[9]-1)/qe[5],Mt=(qe[8]-1)/qe[0],ke=(Ye[8]+1)/Ye[0],Et=ft*Mt,U=ft*ke,b=Te/(-Mt+ke),ee=b*-Mt;me.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(ee),ie.translateZ(b),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert();const se=ft+b,le=q+b,fe=Et-ee,Fe=U+(Te-ee),pe=Qe*q/le*se,Pe=Ge*q/le*se;ie.projectionMatrix.makePerspective(fe,Fe,pe,Pe,se,le),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}function ge(ie,me){me===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(me.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(i===null)return;E.texture!==null&&(ie.near=E.depthNear,ie.far=E.depthFar),w.near=V.near=D.near=ie.near,w.far=V.far=D.far=ie.far,(X!==w.near||J!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),X=w.near,J=w.far,D.near=X,D.far=J,V.near=X,V.far=J,D.updateProjectionMatrix(),V.updateProjectionMatrix(),ie.updateProjectionMatrix());const me=ie.parent,Re=w.cameras;ge(w,me);for(let Te=0;Te<Re.length;Te++)ge(Re[Te],me);Re.length===2?Q(w,D,V):w.projectionMatrix.copy(D.projectionMatrix),de(ie,w,me)};function de(ie,me,Re){Re===null?ie.matrix.copy(me.matrixWorld):(ie.matrix.copy(Re.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(me.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(me.projectionMatrix),ie.projectionMatrixInverse.copy(me.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=ro*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(m===null&&v===null))return h},this.setFoveation=function(ie){h=ie,m!==null&&(m.fixedFoveation=ie),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=ie)},this.hasDepthSensing=function(){return E.texture!==null};let Ae=null;function ct(ie,me){if(d=me.getViewerPose(f||c),M=me,d!==null){const Re=d.views;v!==null&&(e.setRenderTargetFramebuffer(P,v.framebuffer),e.setRenderTarget(P));let Te=!1;Re.length!==w.cameras.length&&(w.cameras.length=0,Te=!0);for(let Ye=0;Ye<Re.length;Ye++){const ft=Re[Ye];let q=null;if(v!==null)q=v.getViewport(ft);else{const Ge=p.getViewSubImage(m,ft);q=Ge.viewport,Ye===0&&(e.setRenderTargetTextures(P,Ge.colorTexture,m.ignoreDepthValues?void 0:Ge.depthStencilTexture),e.setRenderTarget(P))}let Qe=C[Ye];Qe===void 0&&(Qe=new Mn,Qe.layers.enable(Ye),Qe.viewport=new It,C[Ye]=Qe),Qe.matrix.fromArray(ft.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(ft.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(q.x,q.y,q.width,q.height),Ye===0&&(w.matrix.copy(Qe.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),Te===!0&&w.cameras.push(Qe)}const qe=i.enabledFeatures;if(qe&&qe.includes("depth-sensing")){const Ye=p.getDepthInformation(Re[0]);Ye&&Ye.isValid&&Ye.texture&&E.init(e,Ye,i.renderState)}}for(let Re=0;Re<T.length;Re++){const Te=I[Re],qe=T[Re];Te!==null&&qe!==void 0&&qe.update(Te,me,f||c)}E.render(e,w),Ae&&Ae(ie,me),me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:me}),M=null}const Tt=new Dg;Tt.setAnimationLoop(ct),this.setAnimationLoop=function(ie){Ae=ie},this.dispose=function(){}}}const Yr=new Pi,D1=new Je;function U1(s,e){function t(x,_){x.matrixAutoUpdate===!0&&x.updateMatrix(),_.value.copy(x.matrix)}function n(x,_){_.color.getRGB(x.fogColor.value,Cg(s)),_.isFog?(x.fogNear.value=_.near,x.fogFar.value=_.far):_.isFogExp2&&(x.fogDensity.value=_.density)}function i(x,_,P,T,I){_.isMeshBasicMaterial||_.isMeshLambertMaterial?o(x,_):_.isMeshToonMaterial?(o(x,_),p(x,_)):_.isMeshPhongMaterial?(o(x,_),d(x,_)):_.isMeshStandardMaterial?(o(x,_),m(x,_),_.isMeshPhysicalMaterial&&v(x,_,I)):_.isMeshMatcapMaterial?(o(x,_),M(x,_)):_.isMeshDepthMaterial?o(x,_):_.isMeshDistanceMaterial?(o(x,_),E(x,_)):_.isMeshNormalMaterial?o(x,_):_.isLineBasicMaterial?(c(x,_),_.isLineDashedMaterial&&l(x,_)):_.isPointsMaterial?h(x,_,P,T):_.isSpriteMaterial?f(x,_):_.isShadowMaterial?(x.color.value.copy(_.color),x.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function o(x,_){x.opacity.value=_.opacity,_.color&&x.diffuse.value.copy(_.color),_.emissive&&x.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(x.map.value=_.map,t(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.bumpMap&&(x.bumpMap.value=_.bumpMap,t(_.bumpMap,x.bumpMapTransform),x.bumpScale.value=_.bumpScale,_.side===Fn&&(x.bumpScale.value*=-1)),_.normalMap&&(x.normalMap.value=_.normalMap,t(_.normalMap,x.normalMapTransform),x.normalScale.value.copy(_.normalScale),_.side===Fn&&x.normalScale.value.negate()),_.displacementMap&&(x.displacementMap.value=_.displacementMap,t(_.displacementMap,x.displacementMapTransform),x.displacementScale.value=_.displacementScale,x.displacementBias.value=_.displacementBias),_.emissiveMap&&(x.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,x.emissiveMapTransform)),_.specularMap&&(x.specularMap.value=_.specularMap,t(_.specularMap,x.specularMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest);const P=e.get(_),T=P.envMap,I=P.envMapRotation;if(T&&(x.envMap.value=T,Yr.copy(I),Yr.x*=-1,Yr.y*=-1,Yr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Yr.y*=-1,Yr.z*=-1),x.envMapRotation.value.setFromMatrix4(D1.makeRotationFromEuler(Yr)),x.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=_.reflectivity,x.ior.value=_.ior,x.refractionRatio.value=_.refractionRatio),_.lightMap){x.lightMap.value=_.lightMap;const k=s._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=_.lightMapIntensity*k,t(_.lightMap,x.lightMapTransform)}_.aoMap&&(x.aoMap.value=_.aoMap,x.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,x.aoMapTransform))}function c(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,_.map&&(x.map.value=_.map,t(_.map,x.mapTransform))}function l(x,_){x.dashSize.value=_.dashSize,x.totalSize.value=_.dashSize+_.gapSize,x.scale.value=_.scale}function h(x,_,P,T){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.size.value=_.size*P,x.scale.value=T*.5,_.map&&(x.map.value=_.map,t(_.map,x.uvTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function f(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.rotation.value=_.rotation,_.map&&(x.map.value=_.map,t(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function d(x,_){x.specular.value.copy(_.specular),x.shininess.value=Math.max(_.shininess,1e-4)}function p(x,_){_.gradientMap&&(x.gradientMap.value=_.gradientMap)}function m(x,_){x.metalness.value=_.metalness,_.metalnessMap&&(x.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,x.metalnessMapTransform)),x.roughness.value=_.roughness,_.roughnessMap&&(x.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,x.roughnessMapTransform)),_.envMap&&(x.envMapIntensity.value=_.envMapIntensity)}function v(x,_,P){x.ior.value=_.ior,_.sheen>0&&(x.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),x.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(x.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,x.sheenColorMapTransform)),_.sheenRoughnessMap&&(x.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,x.sheenRoughnessMapTransform))),_.clearcoat>0&&(x.clearcoat.value=_.clearcoat,x.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(x.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,x.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(x.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Fn&&x.clearcoatNormalScale.value.negate())),_.iridescence>0&&(x.iridescence.value=_.iridescence,x.iridescenceIOR.value=_.iridescenceIOR,x.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(x.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,x.iridescenceMapTransform)),_.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),_.transmission>0&&(x.transmission.value=_.transmission,x.transmissionSamplerMap.value=P.texture,x.transmissionSamplerSize.value.set(P.width,P.height),_.transmissionMap&&(x.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,x.transmissionMapTransform)),x.thickness.value=_.thickness,_.thicknessMap&&(x.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=_.attenuationDistance,x.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(x.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(x.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=_.specularIntensity,x.specularColor.value.copy(_.specularColor),_.specularColorMap&&(x.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,x.specularColorMapTransform)),_.specularIntensityMap&&(x.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,x.specularIntensityMapTransform))}function M(x,_){_.matcap&&(x.matcap.value=_.matcap)}function E(x,_){const P=e.get(_).light;x.referencePosition.value.setFromMatrixPosition(P.matrixWorld),x.nearDistance.value=P.shadow.camera.near,x.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function N1(s,e,t,n){let i={},o={},c=[];const l=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(P,T){const I=T.program;n.uniformBlockBinding(P,I)}function f(P,T){let I=i[P.id];I===void 0&&(M(P),I=d(P),i[P.id]=I,P.addEventListener("dispose",x));const k=T.program;n.updateUBOMapping(P,k);const O=e.render.frame;o[P.id]!==O&&(m(P),o[P.id]=O)}function d(P){const T=p();P.__bindingPointIndex=T;const I=s.createBuffer(),k=P.__size,O=P.usage;return s.bindBuffer(s.UNIFORM_BUFFER,I),s.bufferData(s.UNIFORM_BUFFER,k,O),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,T,I),I}function p(){for(let P=0;P<l;P++)if(c.indexOf(P)===-1)return c.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(P){const T=i[P.id],I=P.uniforms,k=P.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let O=0,D=I.length;O<D;O++){const V=Array.isArray(I[O])?I[O]:[I[O]];for(let C=0,w=V.length;C<w;C++){const X=V[C];if(v(X,O,C,k)===!0){const J=X.__offset,z=Array.isArray(X.value)?X.value:[X.value];let te=0;for(let ce=0;ce<z.length;ce++){const ue=z[ce],xe=E(ue);typeof ue=="number"||typeof ue=="boolean"?(X.__data[0]=ue,s.bufferSubData(s.UNIFORM_BUFFER,J+te,X.__data)):ue.isMatrix3?(X.__data[0]=ue.elements[0],X.__data[1]=ue.elements[1],X.__data[2]=ue.elements[2],X.__data[3]=0,X.__data[4]=ue.elements[3],X.__data[5]=ue.elements[4],X.__data[6]=ue.elements[5],X.__data[7]=0,X.__data[8]=ue.elements[6],X.__data[9]=ue.elements[7],X.__data[10]=ue.elements[8],X.__data[11]=0):(ue.toArray(X.__data,te),te+=xe.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,J,X.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function v(P,T,I,k){const O=P.value,D=T+"_"+I;if(k[D]===void 0)return typeof O=="number"||typeof O=="boolean"?k[D]=O:k[D]=O.clone(),!0;{const V=k[D];if(typeof O=="number"||typeof O=="boolean"){if(V!==O)return k[D]=O,!0}else if(V.equals(O)===!1)return V.copy(O),!0}return!1}function M(P){const T=P.uniforms;let I=0;const k=16;for(let D=0,V=T.length;D<V;D++){const C=Array.isArray(T[D])?T[D]:[T[D]];for(let w=0,X=C.length;w<X;w++){const J=C[w],z=Array.isArray(J.value)?J.value:[J.value];for(let te=0,ce=z.length;te<ce;te++){const ue=z[te],xe=E(ue),Q=I%k;Q!==0&&k-Q<xe.boundary&&(I+=k-Q),J.__data=new Float32Array(xe.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=I,I+=xe.storage}}}const O=I%k;return O>0&&(I+=k-O),P.__size=I,P.__cache={},this}function E(P){const T={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(T.boundary=4,T.storage=4):P.isVector2?(T.boundary=8,T.storage=8):P.isVector3||P.isColor?(T.boundary=16,T.storage=12):P.isVector4?(T.boundary=16,T.storage=16):P.isMatrix3?(T.boundary=48,T.storage=48):P.isMatrix4?(T.boundary=64,T.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),T}function x(P){const T=P.target;T.removeEventListener("dispose",x);const I=c.indexOf(T.__bindingPointIndex);c.splice(I,1),s.deleteBuffer(i[T.id]),delete i[T.id],delete o[T.id]}function _(){for(const P in i)s.deleteBuffer(i[P]);c=[],i={},o={}}return{bind:h,update:f,dispose:_}}class zg{constructor(e={}){const{canvas:t=CT(),context:n=null,depth:i=!0,stencil:o=!1,alpha:c=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:f=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=c;const v=new Uint32Array(4),M=new Int32Array(4);let E=null,x=null;const _=[],P=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nn,this._useLegacyLights=!1,this.toneMapping=rr,this.toneMappingExposure=1;const T=this;let I=!1,k=0,O=0,D=null,V=-1,C=null;const w=new It,X=new It;let J=null;const z=new De(0);let te=0,ce=t.width,ue=t.height,xe=1,Q=null,ge=null;const de=new It(0,0,ce,ue),Ae=new It(0,0,ce,ue);let ct=!1;const Tt=new Mh;let ie=!1,me=!1;const Re=new Je,Te=new Ne,qe=new F,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ft(){return D===null?xe:1}let q=n;function Qe(L,W){const Z=t.getContext(L,W);return Z!==null?Z:null}try{const L={alpha:!0,depth:i,stencil:o,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:f,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${gh}`),t.addEventListener("webglcontextlost",Y,!1),t.addEventListener("webglcontextrestored",re,!1),t.addEventListener("webglcontextcreationerror",ve,!1),q===null){const W="webgl2";if(q=Qe(W,L),q===null)throw Qe(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Ge,Mt,ke,Et,U,b,ee,se,le,fe,Fe,pe,Pe,ze,_e,Me,Xe,Ce,Le,rt,lt,vt,dt,xt;function Ue(){Ge=new Ww(q),Ge.init(),Mt=new Bw(q,Ge,e),vt=new A1(q,Ge),ke=new T1(q),Et=new Yw(q),U=new u1,b=new b1(q,Ge,ke,U,Mt,vt,Et),ee=new zw(T),se=new Vw(T),le=new QT(q),dt=new Ow(q,le),fe=new Xw(q,le,Et,dt),Fe=new Kw(q,fe,le,Et),Le=new jw(q,Mt,b),Me=new kw(U),pe=new l1(T,ee,se,Ge,Mt,dt,Me),Pe=new U1(T,U),ze=new f1,_e=new v1(Ge),Ce=new Nw(T,ee,se,ke,Fe,m,h),Xe=new E1(T,Fe,Mt),xt=new N1(q,Et,Mt,ke),rt=new Fw(q,Ge,Et),lt=new qw(q,Ge,Et),Et.programs=pe.programs,T.capabilities=Mt,T.extensions=Ge,T.properties=U,T.renderLists=ze,T.shadowMap=Xe,T.state=ke,T.info=Et}Ue();const y=new I1(T,q);this.xr=y,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const L=Ge.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=Ge.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return xe},this.setPixelRatio=function(L){L!==void 0&&(xe=L,this.setSize(ce,ue,!1))},this.getSize=function(L){return L.set(ce,ue)},this.setSize=function(L,W,Z=!0){if(y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ce=L,ue=W,t.width=Math.floor(L*xe),t.height=Math.floor(W*xe),Z===!0&&(t.style.width=L+"px",t.style.height=W+"px"),this.setViewport(0,0,L,W)},this.getDrawingBufferSize=function(L){return L.set(ce*xe,ue*xe).floor()},this.setDrawingBufferSize=function(L,W,Z){ce=L,ue=W,xe=Z,t.width=Math.floor(L*Z),t.height=Math.floor(W*Z),this.setViewport(0,0,L,W)},this.getCurrentViewport=function(L){return L.copy(w)},this.getViewport=function(L){return L.copy(de)},this.setViewport=function(L,W,Z,$){L.isVector4?de.set(L.x,L.y,L.z,L.w):de.set(L,W,Z,$),ke.viewport(w.copy(de).multiplyScalar(xe).round())},this.getScissor=function(L){return L.copy(Ae)},this.setScissor=function(L,W,Z,$){L.isVector4?Ae.set(L.x,L.y,L.z,L.w):Ae.set(L,W,Z,$),ke.scissor(X.copy(Ae).multiplyScalar(xe).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(L){ke.setScissorTest(ct=L)},this.setOpaqueSort=function(L){Q=L},this.setTransparentSort=function(L){ge=L},this.getClearColor=function(L){return L.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(L=!0,W=!0,Z=!0){let $=0;if(L){let j=!1;if(D!==null){const Ee=D.texture.format;j=Ee===vg||Ee===_g||Ee===gg}if(j){const Ee=D.texture.type,Oe=Ee===Lr||Ee===no||Ee===hg||Ee===sa||Ee===dg||Ee===pg,Be=Ce.getClearColor(),je=Ce.getClearAlpha(),Ke=Be.r,Ze=Be.g,et=Be.b;Oe?(v[0]=Ke,v[1]=Ze,v[2]=et,v[3]=je,q.clearBufferuiv(q.COLOR,0,v)):(M[0]=Ke,M[1]=Ze,M[2]=et,M[3]=je,q.clearBufferiv(q.COLOR,0,M))}else $|=q.COLOR_BUFFER_BIT}W&&($|=q.DEPTH_BUFFER_BIT),Z&&($|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Y,!1),t.removeEventListener("webglcontextrestored",re,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),ze.dispose(),_e.dispose(),U.dispose(),ee.dispose(),se.dispose(),Fe.dispose(),dt.dispose(),xt.dispose(),pe.dispose(),y.dispose(),y.removeEventListener("sessionstart",Vt),y.removeEventListener("sessionend",Wt),Tn.stop()};function Y(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function re(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const L=Et.autoReset,W=Xe.enabled,Z=Xe.autoUpdate,$=Xe.needsUpdate,j=Xe.type;Ue(),Et.autoReset=L,Xe.enabled=W,Xe.autoUpdate=Z,Xe.needsUpdate=$,Xe.type=j}function ve(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function be(L){const W=L.target;W.removeEventListener("dispose",be),pt(W)}function pt(L){ut(L),U.remove(L)}function ut(L){const W=U.get(L).programs;W!==void 0&&(W.forEach(function(Z){pe.releaseProgram(Z)}),L.isShaderMaterial&&pe.releaseShaderCache(L))}this.renderBufferDirect=function(L,W,Z,$,j,Ee){W===null&&(W=Ye);const Oe=j.isMesh&&j.matrixWorld.determinant()<0,Be=Zc(L,W,Z,$,j);ke.setMaterial($,Oe);let je=Z.index,Ke=1;if($.wireframe===!0){if(je=fe.getWireframeAttribute(Z),je===void 0)return;Ke=2}const Ze=Z.drawRange,et=Z.attributes.position;let Ht=Ze.start*Ke,gn=(Ze.start+Ze.count)*Ke;Ee!==null&&(Ht=Math.max(Ht,Ee.start*Ke),gn=Math.min(gn,(Ee.start+Ee.count)*Ke)),je!==null?(Ht=Math.max(Ht,0),gn=Math.min(gn,je.count)):et!=null&&(Ht=Math.max(Ht,0),gn=Math.min(gn,et.count));const Yt=gn-Ht;if(Yt<0||Yt===1/0)return;dt.setup(j,$,Be,Z,je);let qn,Ft=rt;if(je!==null&&(qn=le.get(je),Ft=lt,Ft.setIndex(qn)),j.isMesh)$.wireframe===!0?(ke.setLineWidth($.wireframeLinewidth*ft()),Ft.setMode(q.LINES)):Ft.setMode(q.TRIANGLES);else if(j.isLine){let nt=$.linewidth;nt===void 0&&(nt=1),ke.setLineWidth(nt*ft()),j.isLineSegments?Ft.setMode(q.LINES):j.isLineLoop?Ft.setMode(q.LINE_LOOP):Ft.setMode(q.LINE_STRIP)}else j.isPoints?Ft.setMode(q.POINTS):j.isSprite&&Ft.setMode(q.TRIANGLES);if(j.isBatchedMesh)Ft.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else if(j.isInstancedMesh)Ft.renderInstances(Ht,Yt,j.count);else if(Z.isInstancedBufferGeometry){const nt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,mo=Math.min(Z.instanceCount,nt);Ft.renderInstances(Ht,Yt,mo)}else Ft.render(Ht,Yt)};function Ut(L,W,Z){L.transparent===!0&&L.side===pi&&L.forceSinglePass===!1?(L.side=Fn,L.needsUpdate=!0,as(L,W,Z),L.side=Li,L.needsUpdate=!0,as(L,W,Z),L.side=pi):as(L,W,Z)}this.compile=function(L,W,Z=null){Z===null&&(Z=L),x=_e.get(Z),x.init(),P.push(x),Z.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(x.pushLight(j),j.castShadow&&x.pushShadow(j))}),L!==Z&&L.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(x.pushLight(j),j.castShadow&&x.pushShadow(j))}),x.setupLights(T._useLegacyLights);const $=new Set;return L.traverse(function(j){const Ee=j.material;if(Ee)if(Array.isArray(Ee))for(let Oe=0;Oe<Ee.length;Oe++){const Be=Ee[Oe];Ut(Be,Z,j),$.add(Be)}else Ut(Ee,Z,j),$.add(Ee)}),P.pop(),x=null,$},this.compileAsync=function(L,W,Z=null){const $=this.compile(L,W,Z);return new Promise(j=>{function Ee(){if($.forEach(function(Oe){U.get(Oe).currentProgram.isReady()&&$.delete(Oe)}),$.size===0){j(L);return}setTimeout(Ee,10)}Ge.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let $t=null;function bt(L){$t&&$t(L)}function Vt(){Tn.stop()}function Wt(){Tn.start()}const Tn=new Dg;Tn.setAnimationLoop(bt),typeof self<"u"&&Tn.setContext(self),this.setAnimationLoop=function(L){$t=L,y.setAnimationLoop(L),L===null?Tn.stop():Tn.start()},y.addEventListener("sessionstart",Vt),y.addEventListener("sessionend",Wt),this.render=function(L,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),y.enabled===!0&&y.isPresenting===!0&&(y.cameraAutoUpdate===!0&&y.updateCamera(W),W=y.getCamera()),L.isScene===!0&&L.onBeforeRender(T,L,W,D),x=_e.get(L,P.length),x.init(),P.push(x),Re.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Tt.setFromProjectionMatrix(Re),me=this.localClippingEnabled,ie=Me.init(this.clippingPlanes,me),E=ze.get(L,_.length),E.init(),_.push(E),mn(L,W,0,T.sortObjects),E.finish(),T.sortObjects===!0&&E.sort(Q,ge),this.info.render.frame++,ie===!0&&Me.beginShadows();const Z=x.state.shadowsArray;if(Xe.render(Z,L,W),ie===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset(),(y.enabled===!1||y.isPresenting===!1||y.hasDepthSensing()===!1)&&Ce.render(E,L),x.setupLights(T._useLegacyLights),W.isArrayCamera){const $=W.cameras;for(let j=0,Ee=$.length;j<Ee;j++){const Oe=$[j];Si(E,L,Oe,Oe.viewport)}}else Si(E,L,W);D!==null&&(b.updateMultisampleRenderTarget(D),b.updateRenderTargetMipmap(D)),L.isScene===!0&&L.onAfterRender(T,L,W),dt.resetDefaultState(),V=-1,C=null,P.pop(),P.length>0?x=P[P.length-1]:x=null,_.pop(),_.length>0?E=_[_.length-1]:E=null};function mn(L,W,Z,$){if(L.visible===!1)return;if(L.layers.test(W.layers)){if(L.isGroup)Z=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(W);else if(L.isLight)x.pushLight(L),L.castShadow&&x.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||Tt.intersectsSprite(L)){$&&qe.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Re);const Oe=Fe.update(L),Be=L.material;Be.visible&&E.push(L,Oe,Be,Z,qe.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||Tt.intersectsObject(L))){const Oe=Fe.update(L),Be=L.material;if($&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),qe.copy(L.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),qe.copy(Oe.boundingSphere.center)),qe.applyMatrix4(L.matrixWorld).applyMatrix4(Re)),Array.isArray(Be)){const je=Oe.groups;for(let Ke=0,Ze=je.length;Ke<Ze;Ke++){const et=je[Ke],Ht=Be[et.materialIndex];Ht&&Ht.visible&&E.push(L,Oe,Ht,Z,qe.z,et)}}else Be.visible&&E.push(L,Oe,Be,Z,qe.z,null)}}const Ee=L.children;for(let Oe=0,Be=Ee.length;Oe<Be;Oe++)mn(Ee[Oe],W,Z,$)}function Si(L,W,Z,$){const j=L.opaque,Ee=L.transmissive,Oe=L.transparent;x.setupLightsView(Z),ie===!0&&Me.setGlobalState(T.clippingPlanes,Z),Ee.length>0&&Mi(j,Ee,W,Z),$&&ke.viewport(w.copy($)),j.length>0&&Oi(j,W,Z),Ee.length>0&&Oi(Ee,W,Z),Oe.length>0&&Oi(Oe,W,Z),ke.buffers.depth.setTest(!0),ke.buffers.depth.setMask(!0),ke.buffers.color.setMask(!0),ke.setPolygonOffset(!1)}function Mi(L,W,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget===null){x.state.transmissionRenderTarget=new ns(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Dc:Lr,minFilter:Ri,samples:4,stencilBuffer:o});const Ke=U.get(x.state.transmissionRenderTarget);Ke.__isTransmissionRenderTarget=!0}const Ee=x.state.transmissionRenderTarget;T.getDrawingBufferSize(Te),Ee.setSize(Te.x,Te.y);const Oe=T.getRenderTarget();T.setRenderTarget(Ee),T.getClearColor(z),te=T.getClearAlpha(),te<1&&T.setClearColor(16777215,.5),T.clear();const Be=T.toneMapping;T.toneMapping=rr,Oi(L,Z,$),b.updateMultisampleRenderTarget(Ee),b.updateRenderTargetMipmap(Ee);let je=!1;for(let Ke=0,Ze=W.length;Ke<Ze;Ke++){const et=W[Ke],Ht=et.object,gn=et.geometry,Yt=et.material,qn=et.group;if(Yt.side===pi&&Ht.layers.test($.layers)){const Ft=Yt.side;Yt.side=Fn,Yt.needsUpdate=!0,ca(Ht,Z,$,gn,Yt,qn),Yt.side=Ft,Yt.needsUpdate=!0,je=!0}}je===!0&&(b.updateMultisampleRenderTarget(Ee),b.updateRenderTargetMipmap(Ee)),T.setRenderTarget(Oe),T.setClearColor(z,te),T.toneMapping=Be}function Oi(L,W,Z){const $=W.isScene===!0?W.overrideMaterial:null;for(let j=0,Ee=L.length;j<Ee;j++){const Oe=L[j],Be=Oe.object,je=Oe.geometry,Ke=$===null?Oe.material:$,Ze=Oe.group;Be.layers.test(Z.layers)&&ca(Be,W,Z,je,Ke,Ze)}}function ca(L,W,Z,$,j,Ee){L.onBeforeRender(T,W,Z,$,j,Ee),L.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),j.onBeforeRender(T,W,Z,$,L,Ee),j.transparent===!0&&j.side===pi&&j.forceSinglePass===!1?(j.side=Fn,j.needsUpdate=!0,T.renderBufferDirect(Z,W,$,j,L,Ee),j.side=Li,j.needsUpdate=!0,T.renderBufferDirect(Z,W,$,j,L,Ee),j.side=pi):T.renderBufferDirect(Z,W,$,j,L,Ee),L.onAfterRender(T,W,Z,$,j,Ee)}function as(L,W,Z){W.isScene!==!0&&(W=Ye);const $=U.get(L),j=x.state.lights,Ee=x.state.shadowsArray,Oe=j.state.version,Be=pe.getParameters(L,j.state,Ee,W,Z),je=pe.getProgramCacheKey(Be);let Ke=$.programs;$.environment=L.isMeshStandardMaterial?W.environment:null,$.fog=W.fog,$.envMap=(L.isMeshStandardMaterial?se:ee).get(L.envMap||$.environment),$.envMapRotation=$.environment!==null&&L.envMap===null?W.environmentRotation:L.envMapRotation,Ke===void 0&&(L.addEventListener("dispose",be),Ke=new Map,$.programs=Ke);let Ze=Ke.get(je);if(Ze!==void 0){if($.currentProgram===Ze&&$.lightsStateVersion===Oe)return ua(L,Be),Ze}else Be.uniforms=pe.getUniforms(L),L.onBuild(Z,Be,T),L.onBeforeCompile(Be,T),Ze=pe.acquireProgram(Be,je),Ke.set(je,Ze),$.uniforms=Be.uniforms;const et=$.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(et.clippingPlanes=Me.uniform),ua(L,Be),$.needsLights=Jc(L),$.lightsStateVersion=Oe,$.needsLights&&(et.ambientLightColor.value=j.state.ambient,et.lightProbe.value=j.state.probe,et.directionalLights.value=j.state.directional,et.directionalLightShadows.value=j.state.directionalShadow,et.spotLights.value=j.state.spot,et.spotLightShadows.value=j.state.spotShadow,et.rectAreaLights.value=j.state.rectArea,et.ltc_1.value=j.state.rectAreaLTC1,et.ltc_2.value=j.state.rectAreaLTC2,et.pointLights.value=j.state.point,et.pointLightShadows.value=j.state.pointShadow,et.hemisphereLights.value=j.state.hemi,et.directionalShadowMap.value=j.state.directionalShadowMap,et.directionalShadowMatrix.value=j.state.directionalShadowMatrix,et.spotShadowMap.value=j.state.spotShadowMap,et.spotLightMatrix.value=j.state.spotLightMatrix,et.spotLightMap.value=j.state.spotLightMap,et.pointShadowMap.value=j.state.pointShadowMap,et.pointShadowMatrix.value=j.state.pointShadowMatrix),$.currentProgram=Ze,$.uniformsList=null,Ze}function la(L){if(L.uniformsList===null){const W=L.currentProgram.getUniforms();L.uniformsList=Lc.seqWithValue(W.seq,L.uniforms)}return L.uniformsList}function ua(L,W){const Z=U.get(L);Z.outputColorSpace=W.outputColorSpace,Z.batching=W.batching,Z.instancing=W.instancing,Z.instancingColor=W.instancingColor,Z.instancingMorph=W.instancingMorph,Z.skinning=W.skinning,Z.morphTargets=W.morphTargets,Z.morphNormals=W.morphNormals,Z.morphColors=W.morphColors,Z.morphTargetsCount=W.morphTargetsCount,Z.numClippingPlanes=W.numClippingPlanes,Z.numIntersection=W.numClipIntersection,Z.vertexAlphas=W.vertexAlphas,Z.vertexTangents=W.vertexTangents,Z.toneMapping=W.toneMapping}function Zc(L,W,Z,$,j){W.isScene!==!0&&(W=Ye),b.resetTextureUnits();const Ee=W.fog,Oe=$.isMeshStandardMaterial?W.environment:null,Be=D===null?T.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:hn,je=($.isMeshStandardMaterial?se:ee).get($.envMap||Oe),Ke=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ze=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),et=!!Z.morphAttributes.position,Ht=!!Z.morphAttributes.normal,gn=!!Z.morphAttributes.color;let Yt=rr;$.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Yt=T.toneMapping);const qn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Ft=qn!==void 0?qn.length:0,nt=U.get($),mo=x.state.lights;if(ie===!0&&(me===!0||L!==C)){const bn=L===C&&$.id===V;Me.setState($,L,bn)}let Nt=!1;$.version===nt.__version?(nt.needsLights&&nt.lightsStateVersion!==mo.state.version||nt.outputColorSpace!==Be||j.isBatchedMesh&&nt.batching===!1||!j.isBatchedMesh&&nt.batching===!0||j.isInstancedMesh&&nt.instancing===!1||!j.isInstancedMesh&&nt.instancing===!0||j.isSkinnedMesh&&nt.skinning===!1||!j.isSkinnedMesh&&nt.skinning===!0||j.isInstancedMesh&&nt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&nt.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&nt.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&nt.instancingMorph===!1&&j.morphTexture!==null||nt.envMap!==je||$.fog===!0&&nt.fog!==Ee||nt.numClippingPlanes!==void 0&&(nt.numClippingPlanes!==Me.numPlanes||nt.numIntersection!==Me.numIntersection)||nt.vertexAlphas!==Ke||nt.vertexTangents!==Ze||nt.morphTargets!==et||nt.morphNormals!==Ht||nt.morphColors!==gn||nt.toneMapping!==Yt||nt.morphTargetsCount!==Ft)&&(Nt=!0):(Nt=!0,nt.__version=$.version);let Ei=nt.currentProgram;Nt===!0&&(Ei=as($,W,j));let go=!1,ar=!1,Ir=!1;const an=Ei.getUniforms(),oi=nt.uniforms;if(ke.useProgram(Ei.program)&&(go=!0,ar=!0,Ir=!0),$.id!==V&&(V=$.id,ar=!0),go||C!==L){an.setValue(q,"projectionMatrix",L.projectionMatrix),an.setValue(q,"viewMatrix",L.matrixWorldInverse);const bn=an.map.cameraPosition;bn!==void 0&&bn.setValue(q,qe.setFromMatrixPosition(L.matrixWorld)),Mt.logarithmicDepthBuffer&&an.setValue(q,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&an.setValue(q,"isOrthographic",L.isOrthographicCamera===!0),C!==L&&(C=L,ar=!0,Ir=!0)}if(j.isSkinnedMesh){an.setOptional(q,j,"bindMatrix"),an.setOptional(q,j,"bindMatrixInverse");const bn=j.skeleton;bn&&(bn.boneTexture===null&&bn.computeBoneTexture(),an.setValue(q,"boneTexture",bn.boneTexture,b))}j.isBatchedMesh&&(an.setOptional(q,j,"batchingTexture"),an.setValue(q,"batchingTexture",j._matricesTexture,b));const cr=Z.morphAttributes;if((cr.position!==void 0||cr.normal!==void 0||cr.color!==void 0)&&Le.update(j,Z,Ei),(ar||nt.receiveShadow!==j.receiveShadow)&&(nt.receiveShadow=j.receiveShadow,an.setValue(q,"receiveShadow",j.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(oi.envMap.value=je,oi.flipEnvMap.value=je.isCubeTexture&&je.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&W.environment!==null&&(oi.envMapIntensity.value=W.environmentIntensity),ar&&(an.setValue(q,"toneMappingExposure",T.toneMappingExposure),nt.needsLights&&$c(oi,Ir),Ee&&$.fog===!0&&Pe.refreshFogUniforms(oi,Ee),Pe.refreshMaterialUniforms(oi,$,xe,ue,x.state.transmissionRenderTarget),Lc.upload(q,la(nt),oi,b)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Lc.upload(q,la(nt),oi,b),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&an.setValue(q,"center",j.center),an.setValue(q,"modelViewMatrix",j.modelViewMatrix),an.setValue(q,"normalMatrix",j.normalMatrix),an.setValue(q,"modelMatrix",j.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const bn=$.uniformsGroups;for(let _o=0,ha=bn.length;_o<ha;_o++){const vo=bn[_o];xt.update(vo,Ei),xt.bind(vo,Ei)}}return Ei}function $c(L,W){L.ambientLightColor.needsUpdate=W,L.lightProbe.needsUpdate=W,L.directionalLights.needsUpdate=W,L.directionalLightShadows.needsUpdate=W,L.pointLights.needsUpdate=W,L.pointLightShadows.needsUpdate=W,L.spotLights.needsUpdate=W,L.spotLightShadows.needsUpdate=W,L.rectAreaLights.needsUpdate=W,L.hemisphereLights.needsUpdate=W}function Jc(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(L,W,Z){U.get(L.texture).__webglTexture=W,U.get(L.depthTexture).__webglTexture=Z;const $=U.get(L);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=Z===void 0,$.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,W){const Z=U.get(L);Z.__webglFramebuffer=W,Z.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(L,W=0,Z=0){D=L,k=W,O=Z;let $=!0,j=null,Ee=!1,Oe=!1;if(L){const je=U.get(L);je.__useDefaultFramebuffer!==void 0?(ke.bindFramebuffer(q.FRAMEBUFFER,null),$=!1):je.__webglFramebuffer===void 0?b.setupRenderTarget(L):je.__hasExternalTextures&&b.rebindTextures(L,U.get(L.texture).__webglTexture,U.get(L.depthTexture).__webglTexture);const Ke=L.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Oe=!0);const Ze=U.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Ze[W])?j=Ze[W][Z]:j=Ze[W],Ee=!0):L.samples>0&&b.useMultisampledRTT(L)===!1?j=U.get(L).__webglMultisampledFramebuffer:Array.isArray(Ze)?j=Ze[Z]:j=Ze,w.copy(L.viewport),X.copy(L.scissor),J=L.scissorTest}else w.copy(de).multiplyScalar(xe).floor(),X.copy(Ae).multiplyScalar(xe).floor(),J=ct;if(ke.bindFramebuffer(q.FRAMEBUFFER,j)&&$&&ke.drawBuffers(L,j),ke.viewport(w),ke.scissor(X),ke.setScissorTest(J),Ee){const je=U.get(L.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+W,je.__webglTexture,Z)}else if(Oe){const je=U.get(L.texture),Ke=W||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,je.__webglTexture,Z||0,Ke)}V=-1},this.readRenderTargetPixels=function(L,W,Z,$,j,Ee,Oe){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=U.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Oe!==void 0&&(Be=Be[Oe]),Be){ke.bindFramebuffer(q.FRAMEBUFFER,Be);try{const je=L.texture,Ke=je.format,Ze=je.type;if(Ke!==ii&&vt.convert(Ke)!==q.getParameter(q.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const et=Ze===Dc&&(Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float"));if(Ze!==Lr&&vt.convert(Ze)!==q.getParameter(q.IMPLEMENTATION_COLOR_READ_TYPE)&&Ze!==Ci&&!et){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=L.width-$&&Z>=0&&Z<=L.height-j&&q.readPixels(W,Z,$,j,vt.convert(Ke),vt.convert(Ze),Ee)}finally{const je=D!==null?U.get(D).__webglFramebuffer:null;ke.bindFramebuffer(q.FRAMEBUFFER,je)}}},this.copyFramebufferToTexture=function(L,W,Z=0){const $=Math.pow(2,-Z),j=Math.floor(W.image.width*$),Ee=Math.floor(W.image.height*$);b.setTexture2D(W,0),q.copyTexSubImage2D(q.TEXTURE_2D,Z,0,0,L.x,L.y,j,Ee),ke.unbindTexture()},this.copyTextureToTexture=function(L,W,Z,$=0){const j=W.image.width,Ee=W.image.height,Oe=vt.convert(Z.format),Be=vt.convert(Z.type);b.setTexture2D(Z,0),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,Z.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,Z.unpackAlignment),W.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,$,L.x,L.y,j,Ee,Oe,Be,W.image.data):W.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,$,L.x,L.y,W.mipmaps[0].width,W.mipmaps[0].height,Oe,W.mipmaps[0].data):q.texSubImage2D(q.TEXTURE_2D,$,L.x,L.y,Oe,Be,W.image),$===0&&Z.generateMipmaps&&q.generateMipmap(q.TEXTURE_2D),ke.unbindTexture()},this.copyTextureToTexture3D=function(L,W,Z,$,j=0){const Ee=Math.round(L.max.x-L.min.x),Oe=Math.round(L.max.y-L.min.y),Be=L.max.z-L.min.z+1,je=vt.convert($.format),Ke=vt.convert($.type);let Ze;if($.isData3DTexture)b.setTexture3D($,0),Ze=q.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)b.setTexture2DArray($,0),Ze=q.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,$.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,$.unpackAlignment);const et=q.getParameter(q.UNPACK_ROW_LENGTH),Ht=q.getParameter(q.UNPACK_IMAGE_HEIGHT),gn=q.getParameter(q.UNPACK_SKIP_PIXELS),Yt=q.getParameter(q.UNPACK_SKIP_ROWS),qn=q.getParameter(q.UNPACK_SKIP_IMAGES),Ft=Z.isCompressedTexture?Z.mipmaps[j]:Z.image;q.pixelStorei(q.UNPACK_ROW_LENGTH,Ft.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ft.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,L.min.x),q.pixelStorei(q.UNPACK_SKIP_ROWS,L.min.y),q.pixelStorei(q.UNPACK_SKIP_IMAGES,L.min.z),Z.isDataTexture||Z.isData3DTexture?q.texSubImage3D(Ze,j,W.x,W.y,W.z,Ee,Oe,Be,je,Ke,Ft.data):$.isCompressedArrayTexture?q.compressedTexSubImage3D(Ze,j,W.x,W.y,W.z,Ee,Oe,Be,je,Ft.data):q.texSubImage3D(Ze,j,W.x,W.y,W.z,Ee,Oe,Be,je,Ke,Ft),q.pixelStorei(q.UNPACK_ROW_LENGTH,et),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ht),q.pixelStorei(q.UNPACK_SKIP_PIXELS,gn),q.pixelStorei(q.UNPACK_SKIP_ROWS,Yt),q.pixelStorei(q.UNPACK_SKIP_IMAGES,qn),j===0&&$.generateMipmaps&&q.generateMipmap(Ze),ke.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?b.setTextureCube(L,0):L.isData3DTexture?b.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?b.setTexture2DArray(L,0):b.setTexture2D(L,0),ke.unbindTexture()},this.resetState=function(){k=0,O=0,D=null,ke.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return tr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===vh?"display-p3":"srgb",t.unpackColorSpace=Ct.workingColorSpace===Wc?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Hg extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pi,this.environmentIntensity=1,this.environmentRotation=new Pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Gg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=nh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=_i()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Tg("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,o=this.stride;i<o;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Cn=new F;class ra{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyMatrix4(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyNormalMatrix(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.transformDirection(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=mi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=mi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=mi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=mi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=mi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array),o=Pt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[i+o])}return new Qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ra(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[i+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Vg extends ri{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Hs;const Bo=new F,Gs=new F,Vs=new F,Ws=new Ne,ko=new Ne,Wg=new Je,vc=new F,zo=new F,xc=new F,Tm=new Ne,ku=new Ne,bm=new Ne;class O1 extends St{constructor(e=new Vg){if(super(),this.isSprite=!0,this.type="Sprite",Hs===void 0){Hs=new on;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Gg(t,5);Hs.setIndex([0,1,2,0,2,3]),Hs.setAttribute("position",new ra(n,3,0,!1)),Hs.setAttribute("uv",new ra(n,2,3,!1))}this.geometry=Hs,this.material=e,this.center=new Ne(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gs.setFromMatrixScale(this.matrixWorld),Wg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Vs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gs.multiplyScalar(-Vs.z);const n=this.material.rotation;let i,o;n!==0&&(o=Math.cos(n),i=Math.sin(n));const c=this.center;yc(vc.set(-.5,-.5,0),Vs,c,Gs,i,o),yc(zo.set(.5,-.5,0),Vs,c,Gs,i,o),yc(xc.set(.5,.5,0),Vs,c,Gs,i,o),Tm.set(0,0),ku.set(1,0),bm.set(1,1);let l=e.ray.intersectTriangle(vc,zo,xc,!1,Bo);if(l===null&&(yc(zo.set(-.5,.5,0),Vs,c,Gs,i,o),ku.set(0,1),l=e.ray.intersectTriangle(vc,xc,zo,!1,Bo),l===null))return;const h=e.ray.origin.distanceTo(Bo);h<e.near||h>e.far||t.push({distance:h,point:Bo.clone(),uv:gi.getInterpolation(Bo,vc,zo,xc,Tm,ku,bm,new Ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function yc(s,e,t,n,i,o){Ws.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(ko.x=o*Ws.x-i*Ws.y,ko.y=i*Ws.x+o*Ws.y):ko.copy(Ws),s.copy(e),s.x+=ko.x,s.y+=ko.y,s.applyMatrix4(Wg)}const Am=new F,wm=new It,Rm=new It,F1=new F,Cm=new Je,Sc=new F,zu=new Ui,Lm=new Je,Hu=new co;class B1 extends un{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sp,this.bindMatrix=new Je,this.bindMatrixInverse=new Je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new yi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Sc),this.boundingBox.expandByPoint(Sc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ui),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Sc),this.boundingSphere.expandByPoint(Sc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zu.copy(this.boundingSphere),zu.applyMatrix4(i),e.ray.intersectsSphere(zu)!==!1&&(Lm.copy(i).invert(),Hu.copy(e.ray).applyMatrix4(Lm),!(this.boundingBox!==null&&Hu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Hu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new It,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===sp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===XE?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;wm.fromBufferAttribute(i.attributes.skinIndex,e),Rm.fromBufferAttribute(i.attributes.skinWeight,e),Am.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){const c=Rm.getComponent(o);if(c!==0){const l=wm.getComponent(o);Cm.multiplyMatrices(n.bones[l].matrixWorld,n.boneInverses[l]),t.addScaledVector(F1.copy(Am).applyMatrix4(Cm),c)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Xg extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class qg extends Zt{constructor(e=null,t=1,n=1,i,o,c,l,h,f=En,d=En,p,m){super(null,c,l,h,f,d,i,o,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pm=new Je,k1=new Je;class Th{constructor(e=[],t=[]){this.uuid=_i(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let o=0,c=e.length;o<c;o++){const l=e[o]?e[o].matrixWorld:k1;Pm.multiplyMatrices(l,t[o]),Pm.toArray(n,o*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Th(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new qg(t,e,e,ii,Ci);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const o=e.bones[n];let c=t[o];c===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),c=new Xg),this.bones.push(c),this.boneInverses.push(new Je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,o=t.length;i<o;i++){const c=t[i];e.bones.push(c.uuid);const l=n[i];e.boneInverses.push(l.toArray())}return e}}class rh extends Qt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xs=new Je,Im=new Je,Mc=[],Dm=new yi,z1=new Je,Ho=new un,Go=new Ui;class H1 extends un{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,z1)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Xs),Dm.copy(e.boundingBox).applyMatrix4(Xs),this.boundingBox.union(Dm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ui),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Xs),Go.copy(e.boundingSphere).applyMatrix4(Xs),this.boundingSphere.union(Go)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,o=n.length+1,c=e*o+1;for(let l=0;l<n.length;l++)n[l]=i[c+l]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ho.geometry=this.geometry,Ho.material=this.material,Ho.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Go.copy(this.boundingSphere),Go.applyMatrix4(n),e.ray.intersectsSphere(Go)!==!1))for(let o=0;o<i;o++){this.getMatrixAt(o,Xs),Im.multiplyMatrices(n,Xs),Ho.matrixWorld=Im,Ho.raycast(e,Mc);for(let c=0,l=Mc.length;c<l;c++){const h=Mc[c];h.instanceId=o,h.object=this,t.push(h)}Mc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new rh(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new qg(new Float32Array(i*this.count),i,this.count,mg,Ci));const o=this.morphTexture.source.data.data;let c=0;for(let f=0;f<n.length;f++)c+=n[f];const l=this.geometry.morphTargetsRelative?1:1-c,h=i*e;o[h]=l,o.set(n,h+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class oa extends ri{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Um=new F,Nm=new F,Om=new Je,Gu=new co,Ec=new Ui;class Yc extends St{constructor(e=new on,t=new oa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,o=t.count;i<o;i++)Um.fromBufferAttribute(t,i-1),Nm.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Um.distanceTo(Nm);e.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,o=e.params.Line.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ec.copy(n.boundingSphere),Ec.applyMatrix4(i),Ec.radius+=o,e.ray.intersectsSphere(Ec)===!1)return;Om.copy(i).invert(),Gu.copy(e.ray).applyMatrix4(Om);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,f=new F,d=new F,p=new F,m=new F,v=this.isLineSegments?2:1,M=n.index,x=n.attributes.position;if(M!==null){const _=Math.max(0,c.start),P=Math.min(M.count,c.start+c.count);for(let T=_,I=P-1;T<I;T+=v){const k=M.getX(T),O=M.getX(T+1);if(f.fromBufferAttribute(x,k),d.fromBufferAttribute(x,O),Gu.distanceSqToSegment(f,d,m,p)>h)continue;m.applyMatrix4(this.matrixWorld);const V=e.ray.origin.distanceTo(m);V<e.near||V>e.far||t.push({distance:V,point:p.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}else{const _=Math.max(0,c.start),P=Math.min(x.count,c.start+c.count);for(let T=_,I=P-1;T<I;T+=v){if(f.fromBufferAttribute(x,T),d.fromBufferAttribute(x,T+1),Gu.distanceSqToSegment(f,d,m,p)>h)continue;m.applyMatrix4(this.matrixWorld);const O=e.ray.origin.distanceTo(m);O<e.near||O>e.far||t.push({distance:O,point:p.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=i.length;o<c;o++){const l=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}const Fm=new F,Bm=new F;class bh extends Yc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,o=t.count;i<o;i+=2)Fm.fromBufferAttribute(t,i),Bm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Fm.distanceTo(Bm);e.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class G1 extends Yc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Yg extends ri{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const km=new Je,sh=new co,Tc=new Ui,bc=new F;class V1 extends St{constructor(e=new on,t=new Yg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,o=e.params.Points.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Tc.copy(n.boundingSphere),Tc.applyMatrix4(i),Tc.radius+=o,e.ray.intersectsSphere(Tc)===!1)return;km.copy(i).invert(),sh.copy(e.ray).applyMatrix4(km);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,f=n.index,p=n.attributes.position;if(f!==null){const m=Math.max(0,c.start),v=Math.min(f.count,c.start+c.count);for(let M=m,E=v;M<E;M++){const x=f.getX(M);bc.fromBufferAttribute(p,x),zm(bc,x,h,i,e,t,this)}}else{const m=Math.max(0,c.start),v=Math.min(p.count,c.start+c.count);for(let M=m,E=v;M<E;M++)bc.fromBufferAttribute(p,M),zm(bc,M,h,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=i.length;o<c;o++){const l=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}function zm(s,e,t,n,i,o,c){const l=sh.distanceSqToPoint(s);if(l<t){const h=new F;sh.closestPointToPoint(s,h),h.applyMatrix4(n);const f=i.ray.origin.distanceTo(h);if(f<i.near||f>i.far)return;o.push({distance:f,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,object:c})}}class W1 extends Zt{constructor(e,t,n,i,o,c,l,h,f,d,p,m){super(null,c,l,h,f,d,i,o,p,m),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class X1 extends Zt{constructor(e,t,n,i,o,c,l,h,f){super(e,t,n,i,o,c,l,h,f),this.isCanvasTexture=!0,this.needsUpdate=!0}}class jc extends on{constructor(e=1,t=1,n=1,i=32,o=1,c=!1,l=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:o,openEnded:c,thetaStart:l,thetaLength:h};const f=this;i=Math.floor(i),o=Math.floor(o);const d=[],p=[],m=[],v=[];let M=0;const E=[],x=n/2;let _=0;P(),c===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new qt(p,3)),this.setAttribute("normal",new qt(m,3)),this.setAttribute("uv",new qt(v,2));function P(){const I=new F,k=new F;let O=0;const D=(t-e)/n;for(let V=0;V<=o;V++){const C=[],w=V/o,X=w*(t-e)+e;for(let J=0;J<=i;J++){const z=J/i,te=z*h+l,ce=Math.sin(te),ue=Math.cos(te);k.x=X*ce,k.y=-w*n+x,k.z=X*ue,p.push(k.x,k.y,k.z),I.set(ce,D,ue).normalize(),m.push(I.x,I.y,I.z),v.push(z,1-w),C.push(M++)}E.push(C)}for(let V=0;V<i;V++)for(let C=0;C<o;C++){const w=E[C][V],X=E[C+1][V],J=E[C+1][V+1],z=E[C][V+1];d.push(w,X,z),d.push(X,J,z),O+=6}f.addGroup(_,O,0),_+=O}function T(I){const k=M,O=new Ne,D=new F;let V=0;const C=I===!0?e:t,w=I===!0?1:-1;for(let J=1;J<=i;J++)p.push(0,x*w,0),m.push(0,w,0),v.push(.5,.5),M++;const X=M;for(let J=0;J<=i;J++){const te=J/i*h+l,ce=Math.cos(te),ue=Math.sin(te);D.x=C*ue,D.y=x*w,D.z=C*ce,p.push(D.x,D.y,D.z),m.push(0,w,0),O.x=ce*.5+.5,O.y=ue*.5*w+.5,v.push(O.x,O.y),M++}for(let J=0;J<i;J++){const z=k+J,te=X+J;I===!0?d.push(te,te+1,z):d.push(te+1,te,z),V+=3}f.addGroup(_,V,I===!0?1:2),_+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ah extends jc{constructor(e=1,t=1,n=32,i=1,o=!1,c=0,l=Math.PI*2){super(0,e,t,n,i,o,c,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:c,thetaLength:l}}static fromJSON(e){return new Ah(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wh extends on{constructor(e=.5,t=1,n=32,i=1,o=0,c=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:o,thetaLength:c},n=Math.max(3,n),i=Math.max(1,i);const l=[],h=[],f=[],d=[];let p=e;const m=(t-e)/i,v=new F,M=new Ne;for(let E=0;E<=i;E++){for(let x=0;x<=n;x++){const _=o+x/n*c;v.x=p*Math.cos(_),v.y=p*Math.sin(_),h.push(v.x,v.y,v.z),f.push(0,0,1),M.x=(v.x/t+1)/2,M.y=(v.y/t+1)/2,d.push(M.x,M.y)}p+=m}for(let E=0;E<i;E++){const x=E*(n+1);for(let _=0;_<n;_++){const P=_+x,T=P,I=P+n+1,k=P+n+2,O=P+1;l.push(T,I,O),l.push(I,k,O)}}this.setIndex(l),this.setAttribute("position",new qt(h,3)),this.setAttribute("normal",new qt(f,3)),this.setAttribute("uv",new qt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Kc extends on{constructor(e=1,t=32,n=16,i=0,o=Math.PI*2,c=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:o,thetaStart:c,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(c+l,Math.PI);let f=0;const d=[],p=new F,m=new F,v=[],M=[],E=[],x=[];for(let _=0;_<=n;_++){const P=[],T=_/n;let I=0;_===0&&c===0?I=.5/t:_===n&&h===Math.PI&&(I=-.5/t);for(let k=0;k<=t;k++){const O=k/t;p.x=-e*Math.cos(i+O*o)*Math.sin(c+T*l),p.y=e*Math.cos(c+T*l),p.z=e*Math.sin(i+O*o)*Math.sin(c+T*l),M.push(p.x,p.y,p.z),m.copy(p).normalize(),E.push(m.x,m.y,m.z),x.push(O+I,1-T),P.push(f++)}d.push(P)}for(let _=0;_<n;_++)for(let P=0;P<t;P++){const T=d[_][P+1],I=d[_][P],k=d[_+1][P],O=d[_+1][P+1];(_!==0||c>0)&&v.push(T,I,O),(_!==n-1||h<Math.PI)&&v.push(I,k,O)}this.setIndex(v),this.setAttribute("position",new qt(M,3)),this.setAttribute("normal",new qt(E,3)),this.setAttribute("uv",new qt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class q1 extends ri{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new De(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class uo extends ri{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sg,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class or extends uo{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Y1 extends oa{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Ac(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function j1(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function K1(s){function e(i,o){return s[i]-s[o]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Hm(s,e,t){const n=s.length,i=new s.constructor(n);for(let o=0,c=0;c!==n;++o){const l=t[o]*e;for(let h=0;h!==e;++h)i[c++]=s[l+h]}return i}function jg(s,e,t,n){let i=1,o=s[0];for(;o!==void 0&&o[n]===void 0;)o=s[i++];if(o===void 0)return;let c=o[n];if(c!==void 0)if(Array.isArray(c))do c=o[n],c!==void 0&&(e.push(o.time),t.push.apply(t,c)),o=s[i++];while(o!==void 0);else if(c.toArray!==void 0)do c=o[n],c!==void 0&&(e.push(o.time),c.toArray(t,t.length)),o=s[i++];while(o!==void 0);else do c=o[n],c!==void 0&&(e.push(o.time),t.push(c)),o=s[i++];while(o!==void 0)}class aa{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],o=t[n-1];e:{t:{let c;n:{i:if(!(e<i)){for(let l=n+2;;){if(i===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(o=i,i=t[++n],e<i)break t}c=t.length;break n}if(!(e>=o)){const l=t[1];e<l&&(n=2,o=l);for(let h=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(i=o,o=t[--n-1],e>=o)break t}c=n,n=0;break n}break e}for(;n<c;){const l=n+c>>>1;e<t[l]?c=l:n=l+1}if(i=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,i)}return this.interpolate_(n,o,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=e*i;for(let c=0;c!==i;++c)t[c]=n[o+c];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Z1 extends aa{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pp,endingEnd:Pp}}intervalChanged_(e,t,n){const i=this.parameterPositions;let o=e-2,c=e+1,l=i[o],h=i[c];if(l===void 0)switch(this.getSettings_().endingStart){case Ip:o=e,l=2*t-n;break;case Dp:o=i.length-2,l=t+i[o]-i[o+1];break;default:o=e,l=n}if(h===void 0)switch(this.getSettings_().endingEnd){case Ip:c=e,h=2*n-t;break;case Dp:c=1,h=n+i[1]-i[0];break;default:c=e-1,h=t}const f=(n-t)*.5,d=this.valueSize;this._weightPrev=f/(t-l),this._weightNext=f/(h-n),this._offsetPrev=o*d,this._offsetNext=c*d}interpolate_(e,t,n,i){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,f=h-l,d=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,v=this._weightNext,M=(n-t)/(i-t),E=M*M,x=E*M,_=-m*x+2*m*E-m*M,P=(1+m)*x+(-1.5-2*m)*E+(-.5+m)*M+1,T=(-1-v)*x+(1.5+v)*E+.5*M,I=v*x-v*E;for(let k=0;k!==l;++k)o[k]=_*c[d+k]+P*c[f+k]+T*c[h+k]+I*c[p+k];return o}}class $1 extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,f=h-l,d=(n-t)/(i-t),p=1-d;for(let m=0;m!==l;++m)o[m]=c[f+m]*p+c[h+m]*d;return o}}class J1 extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ni{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ac(t,this.TimeBufferType),this.values=Ac(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ac(e.times,Array),values:Ac(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new J1(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $1(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Z1(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case io:t=this.InterpolantFactoryMethodDiscrete;break;case ts:t=this.InterpolantFactoryMethodLinear;break;case du:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return io;case this.InterpolantFactoryMethodLinear:return ts;case this.InterpolantFactoryMethodSmooth:return du}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let o=0,c=i-1;for(;o!==i&&n[o]<e;)++o;for(;c!==-1&&n[c]>t;)--c;if(++c,o!==0||c!==i){o>=c&&(c=Math.max(c,1),o=c-1);const l=this.getValueSize();this.times=n.slice(o,c),this.values=this.values.slice(o*l,c*l)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let c=null;for(let l=0;l!==o;l++){const h=n[l];if(typeof h=="number"&&isNaN(h)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,h),e=!1;break}if(c!==null&&c>h){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,h,c),e=!1;break}c=h}if(i!==void 0&&j1(i))for(let l=0,h=i.length;l!==h;++l){const f=i[l];if(isNaN(f)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,f),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===du,o=e.length-1;let c=1;for(let l=1;l<o;++l){let h=!1;const f=e[l],d=e[l+1];if(f!==d&&(l!==1||f!==e[0]))if(i)h=!0;else{const p=l*n,m=p-n,v=p+n;for(let M=0;M!==n;++M){const E=t[p+M];if(E!==t[m+M]||E!==t[v+M]){h=!0;break}}}if(h){if(l!==c){e[c]=e[l];const p=l*n,m=c*n;for(let v=0;v!==n;++v)t[m+v]=t[p+v]}++c}}if(o>0){e[c]=e[o];for(let l=o*n,h=c*n,f=0;f!==n;++f)t[h+f]=t[l+f];++c}return c!==e.length?(this.times=e.slice(0,c),this.values=t.slice(0,c*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Ni.prototype.TimeBufferType=Float32Array;Ni.prototype.ValueBufferType=Float32Array;Ni.prototype.DefaultInterpolation=ts;class ho extends Ni{}ho.prototype.ValueTypeName="bool";ho.prototype.ValueBufferType=Array;ho.prototype.DefaultInterpolation=io;ho.prototype.InterpolantFactoryMethodLinear=void 0;ho.prototype.InterpolantFactoryMethodSmooth=void 0;class Kg extends Ni{}Kg.prototype.ValueTypeName="color";class oo extends Ni{}oo.prototype.ValueTypeName="number";class Q1 extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=(n-t)/(i-t);let f=e*l;for(let d=f+l;f!==d;f+=4)xi.slerpFlat(o,0,c,f-l,c,f,h);return o}}class is extends Ni{InterpolantFactoryMethodLinear(e){return new Q1(this.times,this.values,this.getValueSize(),e)}}is.prototype.ValueTypeName="quaternion";is.prototype.DefaultInterpolation=ts;is.prototype.InterpolantFactoryMethodSmooth=void 0;class fo extends Ni{}fo.prototype.ValueTypeName="string";fo.prototype.ValueBufferType=Array;fo.prototype.DefaultInterpolation=io;fo.prototype.InterpolantFactoryMethodLinear=void 0;fo.prototype.InterpolantFactoryMethodSmooth=void 0;class ao extends Ni{}ao.prototype.ValueTypeName="vector";class eC{constructor(e="",t=-1,n=[],i=tT){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=_i(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let c=0,l=n.length;c!==l;++c)t.push(nC(n[c]).scale(i));const o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,c=n.length;o!==c;++o)t.push(Ni.toJSON(n[o]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const o=t.length,c=[];for(let l=0;l<o;l++){let h=[],f=[];h.push((l+o-1)%o,l,(l+1)%o),f.push(0,1,0);const d=K1(h);h=Hm(h,1,d),f=Hm(f,1,d),!i&&h[0]===0&&(h.push(o),f.push(f[0])),c.push(new oo(".morphTargetInfluences["+t[l].name+"]",h,f).scale(1/n))}return new this(e,-1,c)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},o=/^([\w-]*?)([\d]+)$/;for(let l=0,h=e.length;l<h;l++){const f=e[l],d=f.name.match(o);if(d&&d.length>1){const p=d[1];let m=i[p];m||(i[p]=m=[]),m.push(f)}}const c=[];for(const l in i)c.push(this.CreateFromMorphTargetSequence(l,i[l],t,n));return c}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(p,m,v,M,E){if(v.length!==0){const x=[],_=[];jg(v,x,_,M),x.length!==0&&E.push(new p(m,x,_))}},i=[],o=e.name||"default",c=e.fps||30,l=e.blendMode;let h=e.length||-1;const f=e.hierarchy||[];for(let p=0;p<f.length;p++){const m=f[p].keys;if(!(!m||m.length===0))if(m[0].morphTargets){const v={};let M;for(M=0;M<m.length;M++)if(m[M].morphTargets)for(let E=0;E<m[M].morphTargets.length;E++)v[m[M].morphTargets[E]]=-1;for(const E in v){const x=[],_=[];for(let P=0;P!==m[M].morphTargets.length;++P){const T=m[M];x.push(T.time),_.push(T.morphTarget===E?1:0)}i.push(new oo(".morphTargetInfluence["+E+"]",x,_))}h=v.length*c}else{const v=".bones["+t[p].name+"]";n(ao,v+".position",m,"pos",i),n(is,v+".quaternion",m,"rot",i),n(ao,v+".scale",m,"scl",i)}}return i.length===0?null:new this(o,h,i,l)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function tC(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return oo;case"vector":case"vector2":case"vector3":case"vector4":return ao;case"color":return Kg;case"quaternion":return is;case"bool":case"boolean":return ho;case"string":return fo}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function nC(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=tC(s.type);if(s.times===void 0){const t=[],n=[];jg(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Rr={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class iC{constructor(e,t,n){const i=this;let o=!1,c=0,l=0,h;const f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){l++,o===!1&&i.onStart!==void 0&&i.onStart(d,c,l),o=!0},this.itemEnd=function(d){c++,i.onProgress!==void 0&&i.onProgress(d,c,l),c===l&&(o=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(d){i.onError!==void 0&&i.onError(d)},this.resolveURL=function(d){return h?h(d):d},this.setURLModifier=function(d){return h=d,this},this.addHandler=function(d,p){return f.push(d,p),this},this.removeHandler=function(d){const p=f.indexOf(d);return p!==-1&&f.splice(p,2),this},this.getHandler=function(d){for(let p=0,m=f.length;p<m;p+=2){const v=f[p],M=f[p+1];if(v.global&&(v.lastIndex=0),v.test(d))return M}return null}}}const rC=new iC;class os{constructor(e){this.manager=e!==void 0?e:rC,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,o){n.load(e,i,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}os.DEFAULT_MATERIAL_NAME="__DEFAULT";const $i={};class sC extends Error{constructor(e,t){super(e),this.response=t}}class Bc extends os{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=Rr.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if($i[e]!==void 0){$i[e].push({onLoad:t,onProgress:n,onError:i});return}$i[e]=[],$i[e].push({onLoad:t,onProgress:n,onError:i});const c=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,h=this.responseType;fetch(c).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||f.body===void 0||f.body.getReader===void 0)return f;const d=$i[e],p=f.body.getReader(),m=f.headers.get("Content-Length")||f.headers.get("X-File-Size"),v=m?parseInt(m):0,M=v!==0;let E=0;const x=new ReadableStream({start(_){P();function P(){p.read().then(({done:T,value:I})=>{if(T)_.close();else{E+=I.byteLength;const k=new ProgressEvent("progress",{lengthComputable:M,loaded:E,total:v});for(let O=0,D=d.length;O<D;O++){const V=d[O];V.onProgress&&V.onProgress(k)}_.enqueue(I),P()}})}}});return new Response(x)}else throw new sC(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(h){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(d=>new DOMParser().parseFromString(d,l));case"json":return f.json();default:if(l===void 0)return f.text();{const p=/charset="?([^;"\s]*)"?/i.exec(l),m=p&&p[1]?p[1].toLowerCase():void 0,v=new TextDecoder(m);return f.arrayBuffer().then(M=>v.decode(M))}}}).then(f=>{Rr.add(e,f);const d=$i[e];delete $i[e];for(let p=0,m=d.length;p<m;p++){const v=d[p];v.onLoad&&v.onLoad(f)}}).catch(f=>{const d=$i[e];if(d===void 0)throw this.manager.itemError(e),f;delete $i[e];for(let p=0,m=d.length;p<m;p++){const v=d[p];v.onError&&v.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class oC extends os{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,c=Rr.get(e);if(c!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(c),o.manager.itemEnd(e)},0),c;const l=ia("img");function h(){d(),Rr.add(e,this),t&&t(this),o.manager.itemEnd(e)}function f(p){d(),i&&i(p),o.manager.itemError(e),o.manager.itemEnd(e)}function d(){l.removeEventListener("load",h,!1),l.removeEventListener("error",f,!1)}return l.addEventListener("load",h,!1),l.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),o.manager.itemStart(e),l.src=e,l}}class aC extends os{constructor(e){super(e)}load(e,t,n,i){const o=new Zt,c=new oC(this.manager);return c.setCrossOrigin(this.crossOrigin),c.setPath(this.path),c.load(e,function(l){o.image=l,o.needsUpdate=!0,t!==void 0&&t(o)},n,i),o}}class po extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class cC extends po{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Vu=new Je,Gm=new F,Vm=new F;class Rh{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mh,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Gm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Gm),Vm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vm),t.updateMatrixWorld(),Vu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class lC extends Rh{constructor(){super(new Mn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ro*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,o=e.distance||t.far;(n!==t.fov||i!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=i,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class uC extends po{constructor(e,t,n=0,i=Math.PI/3,o=0,c=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=i,this.penumbra=o,this.decay=c,this.map=null,this.shadow=new lC}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Wm=new Je,Vo=new F,Wu=new F;class hC extends Rh{constructor(){super(new Mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ne(4,2),this._viewportCount=6,this._viewports=[new It(2,1,1,1),new It(0,1,1,1),new It(3,1,1,1),new It(1,1,1,1),new It(3,0,1,1),new It(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),Vo.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vo),Wu.copy(n.position),Wu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Wu),n.updateMatrixWorld(),i.makeTranslation(-Vo.x,-Vo.y,-Vo.z),Wm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wm)}}class Zg extends po{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new hC}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class fC extends Rh{constructor(){super(new Xc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ch extends po{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new fC}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class dC extends po{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class pC{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new F)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,o=e.z,c=this.coefficients;return t.copy(c[0]).multiplyScalar(.282095),t.addScaledVector(c[1],.488603*i),t.addScaledVector(c[2],.488603*o),t.addScaledVector(c[3],.488603*n),t.addScaledVector(c[4],1.092548*(n*i)),t.addScaledVector(c[5],1.092548*(i*o)),t.addScaledVector(c[6],.315392*(3*o*o-1)),t.addScaledVector(c[7],1.092548*(n*o)),t.addScaledVector(c[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,o=e.z,c=this.coefficients;return t.copy(c[0]).multiplyScalar(.886227),t.addScaledVector(c[1],2*.511664*i),t.addScaledVector(c[2],2*.511664*o),t.addScaledVector(c[3],2*.511664*n),t.addScaledVector(c[4],2*.429043*n*i),t.addScaledVector(c[5],2*.429043*i*o),t.addScaledVector(c[6],.743125*o*o-.247708),t.addScaledVector(c[7],2*.429043*n*o),t.addScaledVector(c[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,o=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*o,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*o,t[6]=.315392*(3*o*o-1),t[7]=1.092548*n*o,t[8]=.546274*(n*n-i*i)}}class mC extends po{constructor(e=new pC,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class Qo{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class gC extends os{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,c=Rr.get(e);if(c!==void 0){if(o.manager.itemStart(e),c.then){c.then(f=>{t&&t(f),o.manager.itemEnd(e)}).catch(f=>{i&&i(f)});return}return setTimeout(function(){t&&t(c),o.manager.itemEnd(e)},0),c}const l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader;const h=fetch(e,l).then(function(f){return f.blob()}).then(function(f){return createImageBitmap(f,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(f){return Rr.add(e,f),t&&t(f),o.manager.itemEnd(e),f}).catch(function(f){i&&i(f),Rr.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});Rr.add(e,h),o.manager.itemStart(e)}}const Lh="\\[\\]\\.:\\/",_C=new RegExp("["+Lh+"]","g"),Ph="[^"+Lh+"]",vC="[^"+Lh.replace("\\.","")+"]",xC=/((?:WC+[\/:])*)/.source.replace("WC",Ph),yC=/(WCOD+)?/.source.replace("WCOD",vC),SC=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ph),MC=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ph),EC=new RegExp("^"+xC+yC+SC+MC+"$"),TC=["material","materials","bones","map"];class bC{constructor(e,t,n){const i=n||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,o=n.length;i!==o;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Rt{constructor(e,t,n){this.path=t,this.parsedPath=n||Rt.parseTrackName(t),this.node=Rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Rt.Composite(e,t,n):new Rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(_C,"")}static parseTrackName(e){const t=EC.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const o=n.nodeName.substring(i+1);TC.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(o){for(let c=0;c<o.length;c++){const l=o[c];if(l.name===t||l.uuid===t)return l;const h=n(l.children);if(h)return h}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let o=t.propertyIndex;if(e||(e=Rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let f=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===f){f=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(f!==void 0){if(e[f]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[f]}}const c=e[i];if(c===void 0){const f=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+f+"."+i+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(o!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}h=this.BindingType.ArrayElement,this.resolvedProperty=c,this.propertyIndex=o}else c.fromArray!==void 0&&c.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=c):Array.isArray(c)?(h=this.BindingType.EntireArray,this.resolvedProperty=c):this.propertyName=i;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Rt.Composite=bC;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Ih{constructor(e){this.value=e}clone(){return new Ih(this.value.clone===void 0?this.value:this.value.clone())}}const Xm=new Je;class Dh{constructor(e,t,n=0,i=1/0){this.ray=new co(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Sh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Xm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xm),this}intersectObject(e,t=!0,n=[]){return oh(e,this,n,t),n.sort(qm),n}intersectObjects(e,t=!0,n=[]){for(let i=0,o=e.length;i<o;i++)oh(e[i],this,n,t);return n.sort(qm),n}}function qm(s,e){return s.distance-e.distance}function oh(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let o=0,c=i.length;o<c;o++)oh(i[o],e,t,!0)}}class Ym{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(pn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class AC extends bh{constructor(e=10,t=10,n=4473924,i=8947848){n=new De(n),i=new De(i);const o=t/2,c=e/t,l=e/2,h=[],f=[];for(let m=0,v=0,M=-l;m<=t;m++,M+=c){h.push(-l,0,M,l,0,M),h.push(M,0,-l,M,0,l);const E=m===o?n:i;E.toArray(f,v),v+=3,E.toArray(f,v),v+=3,E.toArray(f,v),v+=3,E.toArray(f,v),v+=3}const d=new on;d.setAttribute("position",new qt(h,3)),d.setAttribute("color",new qt(f,3));const p=new oa({vertexColors:!0,toneMapped:!1});super(d,p),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class wC extends bh{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new on;i.setAttribute("position",new qt(t,3)),i.setAttribute("color",new qt(n,3));const o=new oa({vertexColors:!0,toneMapped:!1});super(i,o),this.type="AxesHelper"}setColors(e,t,n){const i=new De,o=this.geometry.attributes.color.array;return i.set(e),i.toArray(o,0),i.toArray(o,3),i.set(t),i.toArray(o,6),i.toArray(o,9),i.set(n),i.toArray(o,12),i.toArray(o,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gh);const Zr={antialias:!0,alpha:!0,stencil:!1,shadowMapEnabled:!0,shadowMapType:cg,toneMapping:rr,canvas:void 0};class jm extends zg{constructor(e=Zr){super({antialias:e.antialias||Zr.antialias,alpha:e.alpha||Zr.alpha,preserveDrawingBuffer:!0,canvas:e.canvas}),this.paused=!1,this.running=!1,this.force=!1,this.preRenderCallbacks=new Map,this.postRenderCallbacks=new Map,this.setPixelRatio(window.devicePixelRatio),this.shadowMap.enabled=e.shadowMapEnabled||Zr.shadowMapEnabled,this.shadowMap.type=e.shadowMapType||Zr.shadowMapType,this.toneMapping=e.toneMapping||Zr.toneMapping,this.debug.checkShaderErrors=!1}Dispose(){this.StopRenderer(),this.dispose()}StartRenderer(e,t){this.setAnimationLoop((n,i)=>{this.internal_render(e,t,n,i)}),this.running=!0}PauseRenderer(){this.paused=!0}ResumeRenderer(){this.paused=!1}StopRenderer(){this.setAnimationLoop(null),this.running=!1}OnResize(e,t){this.setSize(e,t)}AddPreRenderCallback(e){const t=vi.generateUUID();return this.preRenderCallbacks.set(t,e),t}RemovePreRenderCallback(e){return this.preRenderCallbacks.has(e)?(this.preRenderCallbacks.delete(e),!0):!1}AddPostRenderCallback(e){const t=vi.generateUUID();return this.postRenderCallbacks.set(t,e),t}RemovePostRenderCallback(e){return this.postRenderCallbacks.has(e)?(this.postRenderCallbacks.delete(e),!0):!1}ForceRendering(){this.force=!0}internal_render(e,t,n,i){(this.paused||!this.running)&&!this.force||(this.preRenderCallbacks.forEach(o=>{o(n,i)}),this.render(e,t),this.postRenderCallbacks.forEach(o=>{o(n,i)}),this.force=!1)}}const RC=1,Wo=2,$g=4,Jg=8,si=16;class CC extends St{constructor(){super(),this.isDIVELight=!0,this.isDIVEAmbientLight=!0,this.name="DIVEAmbientLight",this._light=new dC(16777215,1),this._light.layers.mask=si,this.add(this._light)}SetColor(e){this._light.color=e}SetIntensity(e){this._light.intensity=e}SetEnabled(e){this._light.visible=e}}const Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];function LC(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Sn[s&255]+Sn[s>>8&255]+Sn[s>>16&255]+Sn[s>>24&255]+"-"+Sn[e&255]+Sn[e>>8&255]+"-"+Sn[e>>16&15|64]+Sn[e>>24&255]+"-"+Sn[t&63|128]+Sn[t>>8&255]+"-"+Sn[t>>16&255]+Sn[t>>24&255]+Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]).toLowerCase()}const Qg="#c20017",e_="#00ab26",t_="#0081d4",PC=Qg,IC=e_,DC=t_,Km=s=>s.isSelectTool!==void 0;var wc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Yo={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */var UC=Yo.exports,Zm;function NC(){return Zm||(Zm=1,function(s,e){(function(){var t,n="4.17.21",i=200,o="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",c="Expected a function",l="Invalid `variable` option passed into `_.template`",h="__lodash_hash_undefined__",f=500,d="__lodash_placeholder__",p=1,m=2,v=4,M=1,E=2,x=1,_=2,P=4,T=8,I=16,k=32,O=64,D=128,V=256,C=512,w=30,X="...",J=800,z=16,te=1,ce=2,ue=3,xe=1/0,Q=9007199254740991,ge=17976931348623157e292,de=NaN,Ae=4294967295,ct=Ae-1,Tt=Ae>>>1,ie=[["ary",D],["bind",x],["bindKey",_],["curry",T],["curryRight",I],["flip",C],["partial",k],["partialRight",O],["rearg",V]],me="[object Arguments]",Re="[object Array]",Te="[object AsyncFunction]",qe="[object Boolean]",Ye="[object Date]",ft="[object DOMException]",q="[object Error]",Qe="[object Function]",Ge="[object GeneratorFunction]",Mt="[object Map]",ke="[object Number]",Et="[object Null]",U="[object Object]",b="[object Promise]",ee="[object Proxy]",se="[object RegExp]",le="[object Set]",fe="[object String]",Fe="[object Symbol]",pe="[object Undefined]",Pe="[object WeakMap]",ze="[object WeakSet]",_e="[object ArrayBuffer]",Me="[object DataView]",Xe="[object Float32Array]",Ce="[object Float64Array]",Le="[object Int8Array]",rt="[object Int16Array]",lt="[object Int32Array]",vt="[object Uint8Array]",dt="[object Uint8ClampedArray]",xt="[object Uint16Array]",Ue="[object Uint32Array]",y=/\b__p \+= '';/g,Y=/\b(__p \+=) '' \+/g,re=/(__e\(.*?\)|\b__t\)) \+\n'';/g,ve=/&(?:amp|lt|gt|quot|#39);/g,be=/[&<>"']/g,pt=RegExp(ve.source),ut=RegExp(be.source),Ut=/<%-([\s\S]+?)%>/g,$t=/<%([\s\S]+?)%>/g,bt=/<%=([\s\S]+?)%>/g,Vt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Wt=/^\w*$/,Tn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,mn=/[\\^$.*+?()[\]{}|]/g,Si=RegExp(mn.source),Mi=/^\s+/,Oi=/\s/,ca=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,as=/\{\n\/\* \[wrapped with (.+)\] \*/,la=/,? & /,ua=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,Zc=/[()=,{}\[\]\/\s]/,$c=/\\(\\)?/g,Jc=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,L=/\w*$/,W=/^[-+]0x[0-9a-f]+$/i,Z=/^0b[01]+$/i,$=/^\[object .+?Constructor\]$/,j=/^0o[0-7]+$/i,Ee=/^(?:0|[1-9]\d*)$/,Oe=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Be=/($^)/,je=/['\n\r\u2028\u2029\\]/g,Ke="\\ud800-\\udfff",Ze="\\u0300-\\u036f",et="\\ufe20-\\ufe2f",Ht="\\u20d0-\\u20ff",gn=Ze+et+Ht,Yt="\\u2700-\\u27bf",qn="a-z\\xdf-\\xf6\\xf8-\\xff",Ft="\\xac\\xb1\\xd7\\xf7",nt="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",mo="\\u2000-\\u206f",Nt=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",Ei="A-Z\\xc0-\\xd6\\xd8-\\xde",go="\\ufe0e\\ufe0f",ar=Ft+nt+mo+Nt,Ir="['’]",an="["+Ke+"]",oi="["+ar+"]",cr="["+gn+"]",bn="\\d+",_o="["+Yt+"]",ha="["+qn+"]",vo="[^"+Ke+ar+bn+Yt+qn+Ei+"]",Qc="\\ud83c[\\udffb-\\udfff]",h_="(?:"+cr+"|"+Qc+")",kh="[^"+Ke+"]",el="(?:\\ud83c[\\udde6-\\uddff]){2}",tl="[\\ud800-\\udbff][\\udc00-\\udfff]",cs="["+Ei+"]",zh="\\u200d",Hh="(?:"+ha+"|"+vo+")",f_="(?:"+cs+"|"+vo+")",Gh="(?:"+Ir+"(?:d|ll|m|re|s|t|ve))?",Vh="(?:"+Ir+"(?:D|LL|M|RE|S|T|VE))?",Wh=h_+"?",Xh="["+go+"]?",d_="(?:"+zh+"(?:"+[kh,el,tl].join("|")+")"+Xh+Wh+")*",p_="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",m_="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",qh=Xh+Wh+d_,g_="(?:"+[_o,el,tl].join("|")+")"+qh,__="(?:"+[kh+cr+"?",cr,el,tl,an].join("|")+")",v_=RegExp(Ir,"g"),x_=RegExp(cr,"g"),nl=RegExp(Qc+"(?="+Qc+")|"+__+qh,"g"),y_=RegExp([cs+"?"+ha+"+"+Gh+"(?="+[oi,cs,"$"].join("|")+")",f_+"+"+Vh+"(?="+[oi,cs+Hh,"$"].join("|")+")",cs+"?"+Hh+"+"+Gh,cs+"+"+Vh,m_,p_,bn,g_].join("|"),"g"),S_=RegExp("["+zh+Ke+gn+go+"]"),M_=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,E_=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],T_=-1,Bt={};Bt[Xe]=Bt[Ce]=Bt[Le]=Bt[rt]=Bt[lt]=Bt[vt]=Bt[dt]=Bt[xt]=Bt[Ue]=!0,Bt[me]=Bt[Re]=Bt[_e]=Bt[qe]=Bt[Me]=Bt[Ye]=Bt[q]=Bt[Qe]=Bt[Mt]=Bt[ke]=Bt[U]=Bt[se]=Bt[le]=Bt[fe]=Bt[Pe]=!1;var Ot={};Ot[me]=Ot[Re]=Ot[_e]=Ot[Me]=Ot[qe]=Ot[Ye]=Ot[Xe]=Ot[Ce]=Ot[Le]=Ot[rt]=Ot[lt]=Ot[Mt]=Ot[ke]=Ot[U]=Ot[se]=Ot[le]=Ot[fe]=Ot[Fe]=Ot[vt]=Ot[dt]=Ot[xt]=Ot[Ue]=!0,Ot[q]=Ot[Qe]=Ot[Pe]=!1;var b_={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},A_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},w_={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},R_={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},C_=parseFloat,L_=parseInt,Yh=typeof wc=="object"&&wc&&wc.Object===Object&&wc,P_=typeof self=="object"&&self&&self.Object===Object&&self,fn=Yh||P_||Function("return this")(),il=e&&!e.nodeType&&e,Dr=il&&!0&&s&&!s.nodeType&&s,jh=Dr&&Dr.exports===il,rl=jh&&Yh.process,Yn=function(){try{var H=Dr&&Dr.require&&Dr.require("util").types;return H||rl&&rl.binding&&rl.binding("util")}catch{}}(),Kh=Yn&&Yn.isArrayBuffer,Zh=Yn&&Yn.isDate,$h=Yn&&Yn.isMap,Jh=Yn&&Yn.isRegExp,Qh=Yn&&Yn.isSet,ef=Yn&&Yn.isTypedArray;function Bn(H,ne,K){switch(K.length){case 0:return H.call(ne);case 1:return H.call(ne,K[0]);case 2:return H.call(ne,K[0],K[1]);case 3:return H.call(ne,K[0],K[1],K[2])}return H.apply(ne,K)}function I_(H,ne,K,we){for(var $e=-1,At=H==null?0:H.length;++$e<At;){var en=H[$e];ne(we,en,K(en),H)}return we}function jn(H,ne){for(var K=-1,we=H==null?0:H.length;++K<we&&ne(H[K],K,H)!==!1;);return H}function D_(H,ne){for(var K=H==null?0:H.length;K--&&ne(H[K],K,H)!==!1;);return H}function tf(H,ne){for(var K=-1,we=H==null?0:H.length;++K<we;)if(!ne(H[K],K,H))return!1;return!0}function lr(H,ne){for(var K=-1,we=H==null?0:H.length,$e=0,At=[];++K<we;){var en=H[K];ne(en,K,H)&&(At[$e++]=en)}return At}function fa(H,ne){var K=H==null?0:H.length;return!!K&&ls(H,ne,0)>-1}function sl(H,ne,K){for(var we=-1,$e=H==null?0:H.length;++we<$e;)if(K(ne,H[we]))return!0;return!1}function zt(H,ne){for(var K=-1,we=H==null?0:H.length,$e=Array(we);++K<we;)$e[K]=ne(H[K],K,H);return $e}function ur(H,ne){for(var K=-1,we=ne.length,$e=H.length;++K<we;)H[$e+K]=ne[K];return H}function ol(H,ne,K,we){var $e=-1,At=H==null?0:H.length;for(we&&At&&(K=H[++$e]);++$e<At;)K=ne(K,H[$e],$e,H);return K}function U_(H,ne,K,we){var $e=H==null?0:H.length;for(we&&$e&&(K=H[--$e]);$e--;)K=ne(K,H[$e],$e,H);return K}function al(H,ne){for(var K=-1,we=H==null?0:H.length;++K<we;)if(ne(H[K],K,H))return!0;return!1}var N_=cl("length");function O_(H){return H.split("")}function F_(H){return H.match(ua)||[]}function nf(H,ne,K){var we;return K(H,function($e,At,en){if(ne($e,At,en))return we=At,!1}),we}function da(H,ne,K,we){for(var $e=H.length,At=K+(we?1:-1);we?At--:++At<$e;)if(ne(H[At],At,H))return At;return-1}function ls(H,ne,K){return ne===ne?K_(H,ne,K):da(H,rf,K)}function B_(H,ne,K,we){for(var $e=K-1,At=H.length;++$e<At;)if(we(H[$e],ne))return $e;return-1}function rf(H){return H!==H}function sf(H,ne){var K=H==null?0:H.length;return K?ul(H,ne)/K:de}function cl(H){return function(ne){return ne==null?t:ne[H]}}function ll(H){return function(ne){return H==null?t:H[ne]}}function of(H,ne,K,we,$e){return $e(H,function(At,en,Dt){K=we?(we=!1,At):ne(K,At,en,Dt)}),K}function k_(H,ne){var K=H.length;for(H.sort(ne);K--;)H[K]=H[K].value;return H}function ul(H,ne){for(var K,we=-1,$e=H.length;++we<$e;){var At=ne(H[we]);At!==t&&(K=K===t?At:K+At)}return K}function hl(H,ne){for(var K=-1,we=Array(H);++K<H;)we[K]=ne(K);return we}function z_(H,ne){return zt(ne,function(K){return[K,H[K]]})}function af(H){return H&&H.slice(0,hf(H)+1).replace(Mi,"")}function kn(H){return function(ne){return H(ne)}}function fl(H,ne){return zt(ne,function(K){return H[K]})}function xo(H,ne){return H.has(ne)}function cf(H,ne){for(var K=-1,we=H.length;++K<we&&ls(ne,H[K],0)>-1;);return K}function lf(H,ne){for(var K=H.length;K--&&ls(ne,H[K],0)>-1;);return K}function H_(H,ne){for(var K=H.length,we=0;K--;)H[K]===ne&&++we;return we}var G_=ll(b_),V_=ll(A_);function W_(H){return"\\"+R_[H]}function X_(H,ne){return H==null?t:H[ne]}function us(H){return S_.test(H)}function q_(H){return M_.test(H)}function Y_(H){for(var ne,K=[];!(ne=H.next()).done;)K.push(ne.value);return K}function dl(H){var ne=-1,K=Array(H.size);return H.forEach(function(we,$e){K[++ne]=[$e,we]}),K}function uf(H,ne){return function(K){return H(ne(K))}}function hr(H,ne){for(var K=-1,we=H.length,$e=0,At=[];++K<we;){var en=H[K];(en===ne||en===d)&&(H[K]=d,At[$e++]=K)}return At}function pa(H){var ne=-1,K=Array(H.size);return H.forEach(function(we){K[++ne]=we}),K}function j_(H){var ne=-1,K=Array(H.size);return H.forEach(function(we){K[++ne]=[we,we]}),K}function K_(H,ne,K){for(var we=K-1,$e=H.length;++we<$e;)if(H[we]===ne)return we;return-1}function Z_(H,ne,K){for(var we=K+1;we--;)if(H[we]===ne)return we;return we}function hs(H){return us(H)?J_(H):N_(H)}function ai(H){return us(H)?Q_(H):O_(H)}function hf(H){for(var ne=H.length;ne--&&Oi.test(H.charAt(ne)););return ne}var $_=ll(w_);function J_(H){for(var ne=nl.lastIndex=0;nl.test(H);)++ne;return ne}function Q_(H){return H.match(nl)||[]}function e0(H){return H.match(y_)||[]}var t0=function H(ne){ne=ne==null?fn:fs.defaults(fn.Object(),ne,fs.pick(fn,E_));var K=ne.Array,we=ne.Date,$e=ne.Error,At=ne.Function,en=ne.Math,Dt=ne.Object,pl=ne.RegExp,n0=ne.String,Kn=ne.TypeError,ma=K.prototype,i0=At.prototype,ds=Dt.prototype,ga=ne["__core-js_shared__"],_a=i0.toString,Lt=ds.hasOwnProperty,r0=0,ff=function(){var r=/[^.]+$/.exec(ga&&ga.keys&&ga.keys.IE_PROTO||"");return r?"Symbol(src)_1."+r:""}(),va=ds.toString,s0=_a.call(Dt),o0=fn._,a0=pl("^"+_a.call(Lt).replace(mn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),xa=jh?ne.Buffer:t,fr=ne.Symbol,ya=ne.Uint8Array,df=xa?xa.allocUnsafe:t,Sa=uf(Dt.getPrototypeOf,Dt),pf=Dt.create,mf=ds.propertyIsEnumerable,Ma=ma.splice,gf=fr?fr.isConcatSpreadable:t,yo=fr?fr.iterator:t,Ur=fr?fr.toStringTag:t,Ea=function(){try{var r=kr(Dt,"defineProperty");return r({},"",{}),r}catch{}}(),c0=ne.clearTimeout!==fn.clearTimeout&&ne.clearTimeout,l0=we&&we.now!==fn.Date.now&&we.now,u0=ne.setTimeout!==fn.setTimeout&&ne.setTimeout,Ta=en.ceil,ba=en.floor,ml=Dt.getOwnPropertySymbols,h0=xa?xa.isBuffer:t,_f=ne.isFinite,f0=ma.join,d0=uf(Dt.keys,Dt),tn=en.max,_n=en.min,p0=we.now,m0=ne.parseInt,vf=en.random,g0=ma.reverse,gl=kr(ne,"DataView"),So=kr(ne,"Map"),_l=kr(ne,"Promise"),ps=kr(ne,"Set"),Mo=kr(ne,"WeakMap"),Eo=kr(Dt,"create"),Aa=Mo&&new Mo,ms={},_0=zr(gl),v0=zr(So),x0=zr(_l),y0=zr(ps),S0=zr(Mo),wa=fr?fr.prototype:t,To=wa?wa.valueOf:t,xf=wa?wa.toString:t;function A(r){if(Xt(r)&&!tt(r)&&!(r instanceof gt)){if(r instanceof Zn)return r;if(Lt.call(r,"__wrapped__"))return yd(r)}return new Zn(r)}var gs=function(){function r(){}return function(a){if(!Gt(a))return{};if(pf)return pf(a);r.prototype=a;var u=new r;return r.prototype=t,u}}();function Ra(){}function Zn(r,a){this.__wrapped__=r,this.__actions__=[],this.__chain__=!!a,this.__index__=0,this.__values__=t}A.templateSettings={escape:Ut,evaluate:$t,interpolate:bt,variable:"",imports:{_:A}},A.prototype=Ra.prototype,A.prototype.constructor=A,Zn.prototype=gs(Ra.prototype),Zn.prototype.constructor=Zn;function gt(r){this.__wrapped__=r,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Ae,this.__views__=[]}function M0(){var r=new gt(this.__wrapped__);return r.__actions__=In(this.__actions__),r.__dir__=this.__dir__,r.__filtered__=this.__filtered__,r.__iteratees__=In(this.__iteratees__),r.__takeCount__=this.__takeCount__,r.__views__=In(this.__views__),r}function E0(){if(this.__filtered__){var r=new gt(this);r.__dir__=-1,r.__filtered__=!0}else r=this.clone(),r.__dir__*=-1;return r}function T0(){var r=this.__wrapped__.value(),a=this.__dir__,u=tt(r),g=a<0,S=u?r.length:0,R=Ov(0,S,this.__views__),N=R.start,B=R.end,G=B-N,oe=g?B:N-1,ae=this.__iteratees__,he=ae.length,ye=0,Ie=_n(G,this.__takeCount__);if(!u||!g&&S==G&&Ie==G)return Vf(r,this.__actions__);var Ve=[];e:for(;G--&&ye<Ie;){oe+=a;for(var st=-1,We=r[oe];++st<he;){var mt=ae[st],yt=mt.iteratee,Gn=mt.type,Rn=yt(We);if(Gn==ce)We=Rn;else if(!Rn){if(Gn==te)continue e;break e}}Ve[ye++]=We}return Ve}gt.prototype=gs(Ra.prototype),gt.prototype.constructor=gt;function Nr(r){var a=-1,u=r==null?0:r.length;for(this.clear();++a<u;){var g=r[a];this.set(g[0],g[1])}}function b0(){this.__data__=Eo?Eo(null):{},this.size=0}function A0(r){var a=this.has(r)&&delete this.__data__[r];return this.size-=a?1:0,a}function w0(r){var a=this.__data__;if(Eo){var u=a[r];return u===h?t:u}return Lt.call(a,r)?a[r]:t}function R0(r){var a=this.__data__;return Eo?a[r]!==t:Lt.call(a,r)}function C0(r,a){var u=this.__data__;return this.size+=this.has(r)?0:1,u[r]=Eo&&a===t?h:a,this}Nr.prototype.clear=b0,Nr.prototype.delete=A0,Nr.prototype.get=w0,Nr.prototype.has=R0,Nr.prototype.set=C0;function Fi(r){var a=-1,u=r==null?0:r.length;for(this.clear();++a<u;){var g=r[a];this.set(g[0],g[1])}}function L0(){this.__data__=[],this.size=0}function P0(r){var a=this.__data__,u=Ca(a,r);if(u<0)return!1;var g=a.length-1;return u==g?a.pop():Ma.call(a,u,1),--this.size,!0}function I0(r){var a=this.__data__,u=Ca(a,r);return u<0?t:a[u][1]}function D0(r){return Ca(this.__data__,r)>-1}function U0(r,a){var u=this.__data__,g=Ca(u,r);return g<0?(++this.size,u.push([r,a])):u[g][1]=a,this}Fi.prototype.clear=L0,Fi.prototype.delete=P0,Fi.prototype.get=I0,Fi.prototype.has=D0,Fi.prototype.set=U0;function Bi(r){var a=-1,u=r==null?0:r.length;for(this.clear();++a<u;){var g=r[a];this.set(g[0],g[1])}}function N0(){this.size=0,this.__data__={hash:new Nr,map:new(So||Fi),string:new Nr}}function O0(r){var a=Ha(this,r).delete(r);return this.size-=a?1:0,a}function F0(r){return Ha(this,r).get(r)}function B0(r){return Ha(this,r).has(r)}function k0(r,a){var u=Ha(this,r),g=u.size;return u.set(r,a),this.size+=u.size==g?0:1,this}Bi.prototype.clear=N0,Bi.prototype.delete=O0,Bi.prototype.get=F0,Bi.prototype.has=B0,Bi.prototype.set=k0;function Or(r){var a=-1,u=r==null?0:r.length;for(this.__data__=new Bi;++a<u;)this.add(r[a])}function z0(r){return this.__data__.set(r,h),this}function H0(r){return this.__data__.has(r)}Or.prototype.add=Or.prototype.push=z0,Or.prototype.has=H0;function ci(r){var a=this.__data__=new Fi(r);this.size=a.size}function G0(){this.__data__=new Fi,this.size=0}function V0(r){var a=this.__data__,u=a.delete(r);return this.size=a.size,u}function W0(r){return this.__data__.get(r)}function X0(r){return this.__data__.has(r)}function q0(r,a){var u=this.__data__;if(u instanceof Fi){var g=u.__data__;if(!So||g.length<i-1)return g.push([r,a]),this.size=++u.size,this;u=this.__data__=new Bi(g)}return u.set(r,a),this.size=u.size,this}ci.prototype.clear=G0,ci.prototype.delete=V0,ci.prototype.get=W0,ci.prototype.has=X0,ci.prototype.set=q0;function yf(r,a){var u=tt(r),g=!u&&Hr(r),S=!u&&!g&&_r(r),R=!u&&!g&&!S&&ys(r),N=u||g||S||R,B=N?hl(r.length,n0):[],G=B.length;for(var oe in r)(a||Lt.call(r,oe))&&!(N&&(oe=="length"||S&&(oe=="offset"||oe=="parent")||R&&(oe=="buffer"||oe=="byteLength"||oe=="byteOffset")||Gi(oe,G)))&&B.push(oe);return B}function Sf(r){var a=r.length;return a?r[Rl(0,a-1)]:t}function Y0(r,a){return Ga(In(r),Fr(a,0,r.length))}function j0(r){return Ga(In(r))}function vl(r,a,u){(u!==t&&!li(r[a],u)||u===t&&!(a in r))&&ki(r,a,u)}function bo(r,a,u){var g=r[a];(!(Lt.call(r,a)&&li(g,u))||u===t&&!(a in r))&&ki(r,a,u)}function Ca(r,a){for(var u=r.length;u--;)if(li(r[u][0],a))return u;return-1}function K0(r,a,u,g){return dr(r,function(S,R,N){a(g,S,u(S),N)}),g}function Mf(r,a){return r&&bi(a,cn(a),r)}function Z0(r,a){return r&&bi(a,Un(a),r)}function ki(r,a,u){a=="__proto__"&&Ea?Ea(r,a,{configurable:!0,enumerable:!0,value:u,writable:!0}):r[a]=u}function xl(r,a){for(var u=-1,g=a.length,S=K(g),R=r==null;++u<g;)S[u]=R?t:Ql(r,a[u]);return S}function Fr(r,a,u){return r===r&&(u!==t&&(r=r<=u?r:u),a!==t&&(r=r>=a?r:a)),r}function $n(r,a,u,g,S,R){var N,B=a&p,G=a&m,oe=a&v;if(u&&(N=S?u(r,g,S,R):u(r)),N!==t)return N;if(!Gt(r))return r;var ae=tt(r);if(ae){if(N=Bv(r),!B)return In(r,N)}else{var he=vn(r),ye=he==Qe||he==Ge;if(_r(r))return qf(r,B);if(he==U||he==me||ye&&!S){if(N=G||ye?{}:hd(r),!B)return G?wv(r,Z0(N,r)):Av(r,Mf(N,r))}else{if(!Ot[he])return S?r:{};N=kv(r,he,B)}}R||(R=new ci);var Ie=R.get(r);if(Ie)return Ie;R.set(r,N),zd(r)?r.forEach(function(We){N.add($n(We,a,u,We,r,R))}):Bd(r)&&r.forEach(function(We,mt){N.set(mt,$n(We,a,u,mt,r,R))});var Ve=oe?G?kl:Bl:G?Un:cn,st=ae?t:Ve(r);return jn(st||r,function(We,mt){st&&(mt=We,We=r[mt]),bo(N,mt,$n(We,a,u,mt,r,R))}),N}function $0(r){var a=cn(r);return function(u){return Ef(u,r,a)}}function Ef(r,a,u){var g=u.length;if(r==null)return!g;for(r=Dt(r);g--;){var S=u[g],R=a[S],N=r[S];if(N===t&&!(S in r)||!R(N))return!1}return!0}function Tf(r,a,u){if(typeof r!="function")throw new Kn(c);return Io(function(){r.apply(t,u)},a)}function Ao(r,a,u,g){var S=-1,R=fa,N=!0,B=r.length,G=[],oe=a.length;if(!B)return G;u&&(a=zt(a,kn(u))),g?(R=sl,N=!1):a.length>=i&&(R=xo,N=!1,a=new Or(a));e:for(;++S<B;){var ae=r[S],he=u==null?ae:u(ae);if(ae=g||ae!==0?ae:0,N&&he===he){for(var ye=oe;ye--;)if(a[ye]===he)continue e;G.push(ae)}else R(a,he,g)||G.push(ae)}return G}var dr=$f(Ti),bf=$f(Sl,!0);function J0(r,a){var u=!0;return dr(r,function(g,S,R){return u=!!a(g,S,R),u}),u}function La(r,a,u){for(var g=-1,S=r.length;++g<S;){var R=r[g],N=a(R);if(N!=null&&(B===t?N===N&&!Hn(N):u(N,B)))var B=N,G=R}return G}function Q0(r,a,u,g){var S=r.length;for(u=it(u),u<0&&(u=-u>S?0:S+u),g=g===t||g>S?S:it(g),g<0&&(g+=S),g=u>g?0:Gd(g);u<g;)r[u++]=a;return r}function Af(r,a){var u=[];return dr(r,function(g,S,R){a(g,S,R)&&u.push(g)}),u}function dn(r,a,u,g,S){var R=-1,N=r.length;for(u||(u=Hv),S||(S=[]);++R<N;){var B=r[R];a>0&&u(B)?a>1?dn(B,a-1,u,g,S):ur(S,B):g||(S[S.length]=B)}return S}var yl=Jf(),wf=Jf(!0);function Ti(r,a){return r&&yl(r,a,cn)}function Sl(r,a){return r&&wf(r,a,cn)}function Pa(r,a){return lr(a,function(u){return Vi(r[u])})}function Br(r,a){a=mr(a,r);for(var u=0,g=a.length;r!=null&&u<g;)r=r[Ai(a[u++])];return u&&u==g?r:t}function Rf(r,a,u){var g=a(r);return tt(r)?g:ur(g,u(r))}function An(r){return r==null?r===t?pe:Et:Ur&&Ur in Dt(r)?Nv(r):jv(r)}function Ml(r,a){return r>a}function ev(r,a){return r!=null&&Lt.call(r,a)}function tv(r,a){return r!=null&&a in Dt(r)}function nv(r,a,u){return r>=_n(a,u)&&r<tn(a,u)}function El(r,a,u){for(var g=u?sl:fa,S=r[0].length,R=r.length,N=R,B=K(R),G=1/0,oe=[];N--;){var ae=r[N];N&&a&&(ae=zt(ae,kn(a))),G=_n(ae.length,G),B[N]=!u&&(a||S>=120&&ae.length>=120)?new Or(N&&ae):t}ae=r[0];var he=-1,ye=B[0];e:for(;++he<S&&oe.length<G;){var Ie=ae[he],Ve=a?a(Ie):Ie;if(Ie=u||Ie!==0?Ie:0,!(ye?xo(ye,Ve):g(oe,Ve,u))){for(N=R;--N;){var st=B[N];if(!(st?xo(st,Ve):g(r[N],Ve,u)))continue e}ye&&ye.push(Ve),oe.push(Ie)}}return oe}function iv(r,a,u,g){return Ti(r,function(S,R,N){a(g,u(S),R,N)}),g}function wo(r,a,u){a=mr(a,r),r=md(r,a);var g=r==null?r:r[Ai(Qn(a))];return g==null?t:Bn(g,r,u)}function Cf(r){return Xt(r)&&An(r)==me}function rv(r){return Xt(r)&&An(r)==_e}function sv(r){return Xt(r)&&An(r)==Ye}function Ro(r,a,u,g,S){return r===a?!0:r==null||a==null||!Xt(r)&&!Xt(a)?r!==r&&a!==a:ov(r,a,u,g,Ro,S)}function ov(r,a,u,g,S,R){var N=tt(r),B=tt(a),G=N?Re:vn(r),oe=B?Re:vn(a);G=G==me?U:G,oe=oe==me?U:oe;var ae=G==U,he=oe==U,ye=G==oe;if(ye&&_r(r)){if(!_r(a))return!1;N=!0,ae=!1}if(ye&&!ae)return R||(R=new ci),N||ys(r)?cd(r,a,u,g,S,R):Dv(r,a,G,u,g,S,R);if(!(u&M)){var Ie=ae&&Lt.call(r,"__wrapped__"),Ve=he&&Lt.call(a,"__wrapped__");if(Ie||Ve){var st=Ie?r.value():r,We=Ve?a.value():a;return R||(R=new ci),S(st,We,u,g,R)}}return ye?(R||(R=new ci),Uv(r,a,u,g,S,R)):!1}function av(r){return Xt(r)&&vn(r)==Mt}function Tl(r,a,u,g){var S=u.length,R=S,N=!g;if(r==null)return!R;for(r=Dt(r);S--;){var B=u[S];if(N&&B[2]?B[1]!==r[B[0]]:!(B[0]in r))return!1}for(;++S<R;){B=u[S];var G=B[0],oe=r[G],ae=B[1];if(N&&B[2]){if(oe===t&&!(G in r))return!1}else{var he=new ci;if(g)var ye=g(oe,ae,G,r,a,he);if(!(ye===t?Ro(ae,oe,M|E,g,he):ye))return!1}}return!0}function Lf(r){if(!Gt(r)||Vv(r))return!1;var a=Vi(r)?a0:$;return a.test(zr(r))}function cv(r){return Xt(r)&&An(r)==se}function lv(r){return Xt(r)&&vn(r)==le}function uv(r){return Xt(r)&&ja(r.length)&&!!Bt[An(r)]}function Pf(r){return typeof r=="function"?r:r==null?Nn:typeof r=="object"?tt(r)?Uf(r[0],r[1]):Df(r):Qd(r)}function bl(r){if(!Po(r))return d0(r);var a=[];for(var u in Dt(r))Lt.call(r,u)&&u!="constructor"&&a.push(u);return a}function hv(r){if(!Gt(r))return Yv(r);var a=Po(r),u=[];for(var g in r)g=="constructor"&&(a||!Lt.call(r,g))||u.push(g);return u}function Al(r,a){return r<a}function If(r,a){var u=-1,g=Dn(r)?K(r.length):[];return dr(r,function(S,R,N){g[++u]=a(S,R,N)}),g}function Df(r){var a=Hl(r);return a.length==1&&a[0][2]?dd(a[0][0],a[0][1]):function(u){return u===r||Tl(u,r,a)}}function Uf(r,a){return Vl(r)&&fd(a)?dd(Ai(r),a):function(u){var g=Ql(u,r);return g===t&&g===a?eu(u,r):Ro(a,g,M|E)}}function Ia(r,a,u,g,S){r!==a&&yl(a,function(R,N){if(S||(S=new ci),Gt(R))fv(r,a,N,u,Ia,g,S);else{var B=g?g(Xl(r,N),R,N+"",r,a,S):t;B===t&&(B=R),vl(r,N,B)}},Un)}function fv(r,a,u,g,S,R,N){var B=Xl(r,u),G=Xl(a,u),oe=N.get(G);if(oe){vl(r,u,oe);return}var ae=R?R(B,G,u+"",r,a,N):t,he=ae===t;if(he){var ye=tt(G),Ie=!ye&&_r(G),Ve=!ye&&!Ie&&ys(G);ae=G,ye||Ie||Ve?tt(B)?ae=B:jt(B)?ae=In(B):Ie?(he=!1,ae=qf(G,!0)):Ve?(he=!1,ae=Yf(G,!0)):ae=[]:Do(G)||Hr(G)?(ae=B,Hr(B)?ae=Vd(B):(!Gt(B)||Vi(B))&&(ae=hd(G))):he=!1}he&&(N.set(G,ae),S(ae,G,g,R,N),N.delete(G)),vl(r,u,ae)}function Nf(r,a){var u=r.length;if(u)return a+=a<0?u:0,Gi(a,u)?r[a]:t}function Of(r,a,u){a.length?a=zt(a,function(R){return tt(R)?function(N){return Br(N,R.length===1?R[0]:R)}:R}):a=[Nn];var g=-1;a=zt(a,kn(He()));var S=If(r,function(R,N,B){var G=zt(a,function(oe){return oe(R)});return{criteria:G,index:++g,value:R}});return k_(S,function(R,N){return bv(R,N,u)})}function dv(r,a){return Ff(r,a,function(u,g){return eu(r,g)})}function Ff(r,a,u){for(var g=-1,S=a.length,R={};++g<S;){var N=a[g],B=Br(r,N);u(B,N)&&Co(R,mr(N,r),B)}return R}function pv(r){return function(a){return Br(a,r)}}function wl(r,a,u,g){var S=g?B_:ls,R=-1,N=a.length,B=r;for(r===a&&(a=In(a)),u&&(B=zt(r,kn(u)));++R<N;)for(var G=0,oe=a[R],ae=u?u(oe):oe;(G=S(B,ae,G,g))>-1;)B!==r&&Ma.call(B,G,1),Ma.call(r,G,1);return r}function Bf(r,a){for(var u=r?a.length:0,g=u-1;u--;){var S=a[u];if(u==g||S!==R){var R=S;Gi(S)?Ma.call(r,S,1):Pl(r,S)}}return r}function Rl(r,a){return r+ba(vf()*(a-r+1))}function mv(r,a,u,g){for(var S=-1,R=tn(Ta((a-r)/(u||1)),0),N=K(R);R--;)N[g?R:++S]=r,r+=u;return N}function Cl(r,a){var u="";if(!r||a<1||a>Q)return u;do a%2&&(u+=r),a=ba(a/2),a&&(r+=r);while(a);return u}function ht(r,a){return ql(pd(r,a,Nn),r+"")}function gv(r){return Sf(Ss(r))}function _v(r,a){var u=Ss(r);return Ga(u,Fr(a,0,u.length))}function Co(r,a,u,g){if(!Gt(r))return r;a=mr(a,r);for(var S=-1,R=a.length,N=R-1,B=r;B!=null&&++S<R;){var G=Ai(a[S]),oe=u;if(G==="__proto__"||G==="constructor"||G==="prototype")return r;if(S!=N){var ae=B[G];oe=g?g(ae,G,B):t,oe===t&&(oe=Gt(ae)?ae:Gi(a[S+1])?[]:{})}bo(B,G,oe),B=B[G]}return r}var kf=Aa?function(r,a){return Aa.set(r,a),r}:Nn,vv=Ea?function(r,a){return Ea(r,"toString",{configurable:!0,enumerable:!1,value:nu(a),writable:!0})}:Nn;function xv(r){return Ga(Ss(r))}function Jn(r,a,u){var g=-1,S=r.length;a<0&&(a=-a>S?0:S+a),u=u>S?S:u,u<0&&(u+=S),S=a>u?0:u-a>>>0,a>>>=0;for(var R=K(S);++g<S;)R[g]=r[g+a];return R}function yv(r,a){var u;return dr(r,function(g,S,R){return u=a(g,S,R),!u}),!!u}function Da(r,a,u){var g=0,S=r==null?g:r.length;if(typeof a=="number"&&a===a&&S<=Tt){for(;g<S;){var R=g+S>>>1,N=r[R];N!==null&&!Hn(N)&&(u?N<=a:N<a)?g=R+1:S=R}return S}return Ll(r,a,Nn,u)}function Ll(r,a,u,g){var S=0,R=r==null?0:r.length;if(R===0)return 0;a=u(a);for(var N=a!==a,B=a===null,G=Hn(a),oe=a===t;S<R;){var ae=ba((S+R)/2),he=u(r[ae]),ye=he!==t,Ie=he===null,Ve=he===he,st=Hn(he);if(N)var We=g||Ve;else oe?We=Ve&&(g||ye):B?We=Ve&&ye&&(g||!Ie):G?We=Ve&&ye&&!Ie&&(g||!st):Ie||st?We=!1:We=g?he<=a:he<a;We?S=ae+1:R=ae}return _n(R,ct)}function zf(r,a){for(var u=-1,g=r.length,S=0,R=[];++u<g;){var N=r[u],B=a?a(N):N;if(!u||!li(B,G)){var G=B;R[S++]=N===0?0:N}}return R}function Hf(r){return typeof r=="number"?r:Hn(r)?de:+r}function zn(r){if(typeof r=="string")return r;if(tt(r))return zt(r,zn)+"";if(Hn(r))return xf?xf.call(r):"";var a=r+"";return a=="0"&&1/r==-1/0?"-0":a}function pr(r,a,u){var g=-1,S=fa,R=r.length,N=!0,B=[],G=B;if(u)N=!1,S=sl;else if(R>=i){var oe=a?null:Pv(r);if(oe)return pa(oe);N=!1,S=xo,G=new Or}else G=a?[]:B;e:for(;++g<R;){var ae=r[g],he=a?a(ae):ae;if(ae=u||ae!==0?ae:0,N&&he===he){for(var ye=G.length;ye--;)if(G[ye]===he)continue e;a&&G.push(he),B.push(ae)}else S(G,he,u)||(G!==B&&G.push(he),B.push(ae))}return B}function Pl(r,a){return a=mr(a,r),r=md(r,a),r==null||delete r[Ai(Qn(a))]}function Gf(r,a,u,g){return Co(r,a,u(Br(r,a)),g)}function Ua(r,a,u,g){for(var S=r.length,R=g?S:-1;(g?R--:++R<S)&&a(r[R],R,r););return u?Jn(r,g?0:R,g?R+1:S):Jn(r,g?R+1:0,g?S:R)}function Vf(r,a){var u=r;return u instanceof gt&&(u=u.value()),ol(a,function(g,S){return S.func.apply(S.thisArg,ur([g],S.args))},u)}function Il(r,a,u){var g=r.length;if(g<2)return g?pr(r[0]):[];for(var S=-1,R=K(g);++S<g;)for(var N=r[S],B=-1;++B<g;)B!=S&&(R[S]=Ao(R[S]||N,r[B],a,u));return pr(dn(R,1),a,u)}function Wf(r,a,u){for(var g=-1,S=r.length,R=a.length,N={};++g<S;){var B=g<R?a[g]:t;u(N,r[g],B)}return N}function Dl(r){return jt(r)?r:[]}function Ul(r){return typeof r=="function"?r:Nn}function mr(r,a){return tt(r)?r:Vl(r,a)?[r]:xd(wt(r))}var Sv=ht;function gr(r,a,u){var g=r.length;return u=u===t?g:u,!a&&u>=g?r:Jn(r,a,u)}var Xf=c0||function(r){return fn.clearTimeout(r)};function qf(r,a){if(a)return r.slice();var u=r.length,g=df?df(u):new r.constructor(u);return r.copy(g),g}function Nl(r){var a=new r.constructor(r.byteLength);return new ya(a).set(new ya(r)),a}function Mv(r,a){var u=a?Nl(r.buffer):r.buffer;return new r.constructor(u,r.byteOffset,r.byteLength)}function Ev(r){var a=new r.constructor(r.source,L.exec(r));return a.lastIndex=r.lastIndex,a}function Tv(r){return To?Dt(To.call(r)):{}}function Yf(r,a){var u=a?Nl(r.buffer):r.buffer;return new r.constructor(u,r.byteOffset,r.length)}function jf(r,a){if(r!==a){var u=r!==t,g=r===null,S=r===r,R=Hn(r),N=a!==t,B=a===null,G=a===a,oe=Hn(a);if(!B&&!oe&&!R&&r>a||R&&N&&G&&!B&&!oe||g&&N&&G||!u&&G||!S)return 1;if(!g&&!R&&!oe&&r<a||oe&&u&&S&&!g&&!R||B&&u&&S||!N&&S||!G)return-1}return 0}function bv(r,a,u){for(var g=-1,S=r.criteria,R=a.criteria,N=S.length,B=u.length;++g<N;){var G=jf(S[g],R[g]);if(G){if(g>=B)return G;var oe=u[g];return G*(oe=="desc"?-1:1)}}return r.index-a.index}function Kf(r,a,u,g){for(var S=-1,R=r.length,N=u.length,B=-1,G=a.length,oe=tn(R-N,0),ae=K(G+oe),he=!g;++B<G;)ae[B]=a[B];for(;++S<N;)(he||S<R)&&(ae[u[S]]=r[S]);for(;oe--;)ae[B++]=r[S++];return ae}function Zf(r,a,u,g){for(var S=-1,R=r.length,N=-1,B=u.length,G=-1,oe=a.length,ae=tn(R-B,0),he=K(ae+oe),ye=!g;++S<ae;)he[S]=r[S];for(var Ie=S;++G<oe;)he[Ie+G]=a[G];for(;++N<B;)(ye||S<R)&&(he[Ie+u[N]]=r[S++]);return he}function In(r,a){var u=-1,g=r.length;for(a||(a=K(g));++u<g;)a[u]=r[u];return a}function bi(r,a,u,g){var S=!u;u||(u={});for(var R=-1,N=a.length;++R<N;){var B=a[R],G=g?g(u[B],r[B],B,u,r):t;G===t&&(G=r[B]),S?ki(u,B,G):bo(u,B,G)}return u}function Av(r,a){return bi(r,Gl(r),a)}function wv(r,a){return bi(r,ld(r),a)}function Na(r,a){return function(u,g){var S=tt(u)?I_:K0,R=a?a():{};return S(u,r,He(g,2),R)}}function _s(r){return ht(function(a,u){var g=-1,S=u.length,R=S>1?u[S-1]:t,N=S>2?u[2]:t;for(R=r.length>3&&typeof R=="function"?(S--,R):t,N&&wn(u[0],u[1],N)&&(R=S<3?t:R,S=1),a=Dt(a);++g<S;){var B=u[g];B&&r(a,B,g,R)}return a})}function $f(r,a){return function(u,g){if(u==null)return u;if(!Dn(u))return r(u,g);for(var S=u.length,R=a?S:-1,N=Dt(u);(a?R--:++R<S)&&g(N[R],R,N)!==!1;);return u}}function Jf(r){return function(a,u,g){for(var S=-1,R=Dt(a),N=g(a),B=N.length;B--;){var G=N[r?B:++S];if(u(R[G],G,R)===!1)break}return a}}function Rv(r,a,u){var g=a&x,S=Lo(r);function R(){var N=this&&this!==fn&&this instanceof R?S:r;return N.apply(g?u:this,arguments)}return R}function Qf(r){return function(a){a=wt(a);var u=us(a)?ai(a):t,g=u?u[0]:a.charAt(0),S=u?gr(u,1).join(""):a.slice(1);return g[r]()+S}}function vs(r){return function(a){return ol($d(Zd(a).replace(v_,"")),r,"")}}function Lo(r){return function(){var a=arguments;switch(a.length){case 0:return new r;case 1:return new r(a[0]);case 2:return new r(a[0],a[1]);case 3:return new r(a[0],a[1],a[2]);case 4:return new r(a[0],a[1],a[2],a[3]);case 5:return new r(a[0],a[1],a[2],a[3],a[4]);case 6:return new r(a[0],a[1],a[2],a[3],a[4],a[5]);case 7:return new r(a[0],a[1],a[2],a[3],a[4],a[5],a[6])}var u=gs(r.prototype),g=r.apply(u,a);return Gt(g)?g:u}}function Cv(r,a,u){var g=Lo(r);function S(){for(var R=arguments.length,N=K(R),B=R,G=xs(S);B--;)N[B]=arguments[B];var oe=R<3&&N[0]!==G&&N[R-1]!==G?[]:hr(N,G);if(R-=oe.length,R<u)return rd(r,a,Oa,S.placeholder,t,N,oe,t,t,u-R);var ae=this&&this!==fn&&this instanceof S?g:r;return Bn(ae,this,N)}return S}function ed(r){return function(a,u,g){var S=Dt(a);if(!Dn(a)){var R=He(u,3);a=cn(a),u=function(B){return R(S[B],B,S)}}var N=r(a,u,g);return N>-1?S[R?a[N]:N]:t}}function td(r){return Hi(function(a){var u=a.length,g=u,S=Zn.prototype.thru;for(r&&a.reverse();g--;){var R=a[g];if(typeof R!="function")throw new Kn(c);if(S&&!N&&za(R)=="wrapper")var N=new Zn([],!0)}for(g=N?g:u;++g<u;){R=a[g];var B=za(R),G=B=="wrapper"?zl(R):t;G&&Wl(G[0])&&G[1]==(D|T|k|V)&&!G[4].length&&G[9]==1?N=N[za(G[0])].apply(N,G[3]):N=R.length==1&&Wl(R)?N[B]():N.thru(R)}return function(){var oe=arguments,ae=oe[0];if(N&&oe.length==1&&tt(ae))return N.plant(ae).value();for(var he=0,ye=u?a[he].apply(this,oe):ae;++he<u;)ye=a[he].call(this,ye);return ye}})}function Oa(r,a,u,g,S,R,N,B,G,oe){var ae=a&D,he=a&x,ye=a&_,Ie=a&(T|I),Ve=a&C,st=ye?t:Lo(r);function We(){for(var mt=arguments.length,yt=K(mt),Gn=mt;Gn--;)yt[Gn]=arguments[Gn];if(Ie)var Rn=xs(We),Vn=H_(yt,Rn);if(g&&(yt=Kf(yt,g,S,Ie)),R&&(yt=Zf(yt,R,N,Ie)),mt-=Vn,Ie&&mt<oe){var Kt=hr(yt,Rn);return rd(r,a,Oa,We.placeholder,u,yt,Kt,B,G,oe-mt)}var ui=he?u:this,Xi=ye?ui[r]:r;return mt=yt.length,B?yt=Kv(yt,B):Ve&&mt>1&&yt.reverse(),ae&&G<mt&&(yt.length=G),this&&this!==fn&&this instanceof We&&(Xi=st||Lo(Xi)),Xi.apply(ui,yt)}return We}function nd(r,a){return function(u,g){return iv(u,r,a(g),{})}}function Fa(r,a){return function(u,g){var S;if(u===t&&g===t)return a;if(u!==t&&(S=u),g!==t){if(S===t)return g;typeof u=="string"||typeof g=="string"?(u=zn(u),g=zn(g)):(u=Hf(u),g=Hf(g)),S=r(u,g)}return S}}function Ol(r){return Hi(function(a){return a=zt(a,kn(He())),ht(function(u){var g=this;return r(a,function(S){return Bn(S,g,u)})})})}function Ba(r,a){a=a===t?" ":zn(a);var u=a.length;if(u<2)return u?Cl(a,r):a;var g=Cl(a,Ta(r/hs(a)));return us(a)?gr(ai(g),0,r).join(""):g.slice(0,r)}function Lv(r,a,u,g){var S=a&x,R=Lo(r);function N(){for(var B=-1,G=arguments.length,oe=-1,ae=g.length,he=K(ae+G),ye=this&&this!==fn&&this instanceof N?R:r;++oe<ae;)he[oe]=g[oe];for(;G--;)he[oe++]=arguments[++B];return Bn(ye,S?u:this,he)}return N}function id(r){return function(a,u,g){return g&&typeof g!="number"&&wn(a,u,g)&&(u=g=t),a=Wi(a),u===t?(u=a,a=0):u=Wi(u),g=g===t?a<u?1:-1:Wi(g),mv(a,u,g,r)}}function ka(r){return function(a,u){return typeof a=="string"&&typeof u=="string"||(a=ei(a),u=ei(u)),r(a,u)}}function rd(r,a,u,g,S,R,N,B,G,oe){var ae=a&T,he=ae?N:t,ye=ae?t:N,Ie=ae?R:t,Ve=ae?t:R;a|=ae?k:O,a&=~(ae?O:k),a&P||(a&=-4);var st=[r,a,S,Ie,he,Ve,ye,B,G,oe],We=u.apply(t,st);return Wl(r)&&gd(We,st),We.placeholder=g,_d(We,r,a)}function Fl(r){var a=en[r];return function(u,g){if(u=ei(u),g=g==null?0:_n(it(g),292),g&&_f(u)){var S=(wt(u)+"e").split("e"),R=a(S[0]+"e"+(+S[1]+g));return S=(wt(R)+"e").split("e"),+(S[0]+"e"+(+S[1]-g))}return a(u)}}var Pv=ps&&1/pa(new ps([,-0]))[1]==xe?function(r){return new ps(r)}:su;function sd(r){return function(a){var u=vn(a);return u==Mt?dl(a):u==le?j_(a):z_(a,r(a))}}function zi(r,a,u,g,S,R,N,B){var G=a&_;if(!G&&typeof r!="function")throw new Kn(c);var oe=g?g.length:0;if(oe||(a&=-97,g=S=t),N=N===t?N:tn(it(N),0),B=B===t?B:it(B),oe-=S?S.length:0,a&O){var ae=g,he=S;g=S=t}var ye=G?t:zl(r),Ie=[r,a,u,g,S,ae,he,R,N,B];if(ye&&qv(Ie,ye),r=Ie[0],a=Ie[1],u=Ie[2],g=Ie[3],S=Ie[4],B=Ie[9]=Ie[9]===t?G?0:r.length:tn(Ie[9]-oe,0),!B&&a&(T|I)&&(a&=-25),!a||a==x)var Ve=Rv(r,a,u);else a==T||a==I?Ve=Cv(r,a,B):(a==k||a==(x|k))&&!S.length?Ve=Lv(r,a,u,g):Ve=Oa.apply(t,Ie);var st=ye?kf:gd;return _d(st(Ve,Ie),r,a)}function od(r,a,u,g){return r===t||li(r,ds[u])&&!Lt.call(g,u)?a:r}function ad(r,a,u,g,S,R){return Gt(r)&&Gt(a)&&(R.set(a,r),Ia(r,a,t,ad,R),R.delete(a)),r}function Iv(r){return Do(r)?t:r}function cd(r,a,u,g,S,R){var N=u&M,B=r.length,G=a.length;if(B!=G&&!(N&&G>B))return!1;var oe=R.get(r),ae=R.get(a);if(oe&&ae)return oe==a&&ae==r;var he=-1,ye=!0,Ie=u&E?new Or:t;for(R.set(r,a),R.set(a,r);++he<B;){var Ve=r[he],st=a[he];if(g)var We=N?g(st,Ve,he,a,r,R):g(Ve,st,he,r,a,R);if(We!==t){if(We)continue;ye=!1;break}if(Ie){if(!al(a,function(mt,yt){if(!xo(Ie,yt)&&(Ve===mt||S(Ve,mt,u,g,R)))return Ie.push(yt)})){ye=!1;break}}else if(!(Ve===st||S(Ve,st,u,g,R))){ye=!1;break}}return R.delete(r),R.delete(a),ye}function Dv(r,a,u,g,S,R,N){switch(u){case Me:if(r.byteLength!=a.byteLength||r.byteOffset!=a.byteOffset)return!1;r=r.buffer,a=a.buffer;case _e:return!(r.byteLength!=a.byteLength||!R(new ya(r),new ya(a)));case qe:case Ye:case ke:return li(+r,+a);case q:return r.name==a.name&&r.message==a.message;case se:case fe:return r==a+"";case Mt:var B=dl;case le:var G=g&M;if(B||(B=pa),r.size!=a.size&&!G)return!1;var oe=N.get(r);if(oe)return oe==a;g|=E,N.set(r,a);var ae=cd(B(r),B(a),g,S,R,N);return N.delete(r),ae;case Fe:if(To)return To.call(r)==To.call(a)}return!1}function Uv(r,a,u,g,S,R){var N=u&M,B=Bl(r),G=B.length,oe=Bl(a),ae=oe.length;if(G!=ae&&!N)return!1;for(var he=G;he--;){var ye=B[he];if(!(N?ye in a:Lt.call(a,ye)))return!1}var Ie=R.get(r),Ve=R.get(a);if(Ie&&Ve)return Ie==a&&Ve==r;var st=!0;R.set(r,a),R.set(a,r);for(var We=N;++he<G;){ye=B[he];var mt=r[ye],yt=a[ye];if(g)var Gn=N?g(yt,mt,ye,a,r,R):g(mt,yt,ye,r,a,R);if(!(Gn===t?mt===yt||S(mt,yt,u,g,R):Gn)){st=!1;break}We||(We=ye=="constructor")}if(st&&!We){var Rn=r.constructor,Vn=a.constructor;Rn!=Vn&&"constructor"in r&&"constructor"in a&&!(typeof Rn=="function"&&Rn instanceof Rn&&typeof Vn=="function"&&Vn instanceof Vn)&&(st=!1)}return R.delete(r),R.delete(a),st}function Hi(r){return ql(pd(r,t,Ed),r+"")}function Bl(r){return Rf(r,cn,Gl)}function kl(r){return Rf(r,Un,ld)}var zl=Aa?function(r){return Aa.get(r)}:su;function za(r){for(var a=r.name+"",u=ms[a],g=Lt.call(ms,a)?u.length:0;g--;){var S=u[g],R=S.func;if(R==null||R==r)return S.name}return a}function xs(r){var a=Lt.call(A,"placeholder")?A:r;return a.placeholder}function He(){var r=A.iteratee||iu;return r=r===iu?Pf:r,arguments.length?r(arguments[0],arguments[1]):r}function Ha(r,a){var u=r.__data__;return Gv(a)?u[typeof a=="string"?"string":"hash"]:u.map}function Hl(r){for(var a=cn(r),u=a.length;u--;){var g=a[u],S=r[g];a[u]=[g,S,fd(S)]}return a}function kr(r,a){var u=X_(r,a);return Lf(u)?u:t}function Nv(r){var a=Lt.call(r,Ur),u=r[Ur];try{r[Ur]=t;var g=!0}catch{}var S=va.call(r);return g&&(a?r[Ur]=u:delete r[Ur]),S}var Gl=ml?function(r){return r==null?[]:(r=Dt(r),lr(ml(r),function(a){return mf.call(r,a)}))}:ou,ld=ml?function(r){for(var a=[];r;)ur(a,Gl(r)),r=Sa(r);return a}:ou,vn=An;(gl&&vn(new gl(new ArrayBuffer(1)))!=Me||So&&vn(new So)!=Mt||_l&&vn(_l.resolve())!=b||ps&&vn(new ps)!=le||Mo&&vn(new Mo)!=Pe)&&(vn=function(r){var a=An(r),u=a==U?r.constructor:t,g=u?zr(u):"";if(g)switch(g){case _0:return Me;case v0:return Mt;case x0:return b;case y0:return le;case S0:return Pe}return a});function Ov(r,a,u){for(var g=-1,S=u.length;++g<S;){var R=u[g],N=R.size;switch(R.type){case"drop":r+=N;break;case"dropRight":a-=N;break;case"take":a=_n(a,r+N);break;case"takeRight":r=tn(r,a-N);break}}return{start:r,end:a}}function Fv(r){var a=r.match(as);return a?a[1].split(la):[]}function ud(r,a,u){a=mr(a,r);for(var g=-1,S=a.length,R=!1;++g<S;){var N=Ai(a[g]);if(!(R=r!=null&&u(r,N)))break;r=r[N]}return R||++g!=S?R:(S=r==null?0:r.length,!!S&&ja(S)&&Gi(N,S)&&(tt(r)||Hr(r)))}function Bv(r){var a=r.length,u=new r.constructor(a);return a&&typeof r[0]=="string"&&Lt.call(r,"index")&&(u.index=r.index,u.input=r.input),u}function hd(r){return typeof r.constructor=="function"&&!Po(r)?gs(Sa(r)):{}}function kv(r,a,u){var g=r.constructor;switch(a){case _e:return Nl(r);case qe:case Ye:return new g(+r);case Me:return Mv(r,u);case Xe:case Ce:case Le:case rt:case lt:case vt:case dt:case xt:case Ue:return Yf(r,u);case Mt:return new g;case ke:case fe:return new g(r);case se:return Ev(r);case le:return new g;case Fe:return Tv(r)}}function zv(r,a){var u=a.length;if(!u)return r;var g=u-1;return a[g]=(u>1?"& ":"")+a[g],a=a.join(u>2?", ":" "),r.replace(ca,`{
/* [wrapped with `+a+`] */
`)}function Hv(r){return tt(r)||Hr(r)||!!(gf&&r&&r[gf])}function Gi(r,a){var u=typeof r;return a=a??Q,!!a&&(u=="number"||u!="symbol"&&Ee.test(r))&&r>-1&&r%1==0&&r<a}function wn(r,a,u){if(!Gt(u))return!1;var g=typeof a;return(g=="number"?Dn(u)&&Gi(a,u.length):g=="string"&&a in u)?li(u[a],r):!1}function Vl(r,a){if(tt(r))return!1;var u=typeof r;return u=="number"||u=="symbol"||u=="boolean"||r==null||Hn(r)?!0:Wt.test(r)||!Vt.test(r)||a!=null&&r in Dt(a)}function Gv(r){var a=typeof r;return a=="string"||a=="number"||a=="symbol"||a=="boolean"?r!=="__proto__":r===null}function Wl(r){var a=za(r),u=A[a];if(typeof u!="function"||!(a in gt.prototype))return!1;if(r===u)return!0;var g=zl(u);return!!g&&r===g[0]}function Vv(r){return!!ff&&ff in r}var Wv=ga?Vi:au;function Po(r){var a=r&&r.constructor,u=typeof a=="function"&&a.prototype||ds;return r===u}function fd(r){return r===r&&!Gt(r)}function dd(r,a){return function(u){return u==null?!1:u[r]===a&&(a!==t||r in Dt(u))}}function Xv(r){var a=qa(r,function(g){return u.size===f&&u.clear(),g}),u=a.cache;return a}function qv(r,a){var u=r[1],g=a[1],S=u|g,R=S<(x|_|D),N=g==D&&u==T||g==D&&u==V&&r[7].length<=a[8]||g==(D|V)&&a[7].length<=a[8]&&u==T;if(!(R||N))return r;g&x&&(r[2]=a[2],S|=u&x?0:P);var B=a[3];if(B){var G=r[3];r[3]=G?Kf(G,B,a[4]):B,r[4]=G?hr(r[3],d):a[4]}return B=a[5],B&&(G=r[5],r[5]=G?Zf(G,B,a[6]):B,r[6]=G?hr(r[5],d):a[6]),B=a[7],B&&(r[7]=B),g&D&&(r[8]=r[8]==null?a[8]:_n(r[8],a[8])),r[9]==null&&(r[9]=a[9]),r[0]=a[0],r[1]=S,r}function Yv(r){var a=[];if(r!=null)for(var u in Dt(r))a.push(u);return a}function jv(r){return va.call(r)}function pd(r,a,u){return a=tn(a===t?r.length-1:a,0),function(){for(var g=arguments,S=-1,R=tn(g.length-a,0),N=K(R);++S<R;)N[S]=g[a+S];S=-1;for(var B=K(a+1);++S<a;)B[S]=g[S];return B[a]=u(N),Bn(r,this,B)}}function md(r,a){return a.length<2?r:Br(r,Jn(a,0,-1))}function Kv(r,a){for(var u=r.length,g=_n(a.length,u),S=In(r);g--;){var R=a[g];r[g]=Gi(R,u)?S[R]:t}return r}function Xl(r,a){if(!(a==="constructor"&&typeof r[a]=="function")&&a!="__proto__")return r[a]}var gd=vd(kf),Io=u0||function(r,a){return fn.setTimeout(r,a)},ql=vd(vv);function _d(r,a,u){var g=a+"";return ql(r,zv(g,Zv(Fv(g),u)))}function vd(r){var a=0,u=0;return function(){var g=p0(),S=z-(g-u);if(u=g,S>0){if(++a>=J)return arguments[0]}else a=0;return r.apply(t,arguments)}}function Ga(r,a){var u=-1,g=r.length,S=g-1;for(a=a===t?g:a;++u<a;){var R=Rl(u,S),N=r[R];r[R]=r[u],r[u]=N}return r.length=a,r}var xd=Xv(function(r){var a=[];return r.charCodeAt(0)===46&&a.push(""),r.replace(Tn,function(u,g,S,R){a.push(S?R.replace($c,"$1"):g||u)}),a});function Ai(r){if(typeof r=="string"||Hn(r))return r;var a=r+"";return a=="0"&&1/r==-1/0?"-0":a}function zr(r){if(r!=null){try{return _a.call(r)}catch{}try{return r+""}catch{}}return""}function Zv(r,a){return jn(ie,function(u){var g="_."+u[0];a&u[1]&&!fa(r,g)&&r.push(g)}),r.sort()}function yd(r){if(r instanceof gt)return r.clone();var a=new Zn(r.__wrapped__,r.__chain__);return a.__actions__=In(r.__actions__),a.__index__=r.__index__,a.__values__=r.__values__,a}function $v(r,a,u){(u?wn(r,a,u):a===t)?a=1:a=tn(it(a),0);var g=r==null?0:r.length;if(!g||a<1)return[];for(var S=0,R=0,N=K(Ta(g/a));S<g;)N[R++]=Jn(r,S,S+=a);return N}function Jv(r){for(var a=-1,u=r==null?0:r.length,g=0,S=[];++a<u;){var R=r[a];R&&(S[g++]=R)}return S}function Qv(){var r=arguments.length;if(!r)return[];for(var a=K(r-1),u=arguments[0],g=r;g--;)a[g-1]=arguments[g];return ur(tt(u)?In(u):[u],dn(a,1))}var ex=ht(function(r,a){return jt(r)?Ao(r,dn(a,1,jt,!0)):[]}),tx=ht(function(r,a){var u=Qn(a);return jt(u)&&(u=t),jt(r)?Ao(r,dn(a,1,jt,!0),He(u,2)):[]}),nx=ht(function(r,a){var u=Qn(a);return jt(u)&&(u=t),jt(r)?Ao(r,dn(a,1,jt,!0),t,u):[]});function ix(r,a,u){var g=r==null?0:r.length;return g?(a=u||a===t?1:it(a),Jn(r,a<0?0:a,g)):[]}function rx(r,a,u){var g=r==null?0:r.length;return g?(a=u||a===t?1:it(a),a=g-a,Jn(r,0,a<0?0:a)):[]}function sx(r,a){return r&&r.length?Ua(r,He(a,3),!0,!0):[]}function ox(r,a){return r&&r.length?Ua(r,He(a,3),!0):[]}function ax(r,a,u,g){var S=r==null?0:r.length;return S?(u&&typeof u!="number"&&wn(r,a,u)&&(u=0,g=S),Q0(r,a,u,g)):[]}function Sd(r,a,u){var g=r==null?0:r.length;if(!g)return-1;var S=u==null?0:it(u);return S<0&&(S=tn(g+S,0)),da(r,He(a,3),S)}function Md(r,a,u){var g=r==null?0:r.length;if(!g)return-1;var S=g-1;return u!==t&&(S=it(u),S=u<0?tn(g+S,0):_n(S,g-1)),da(r,He(a,3),S,!0)}function Ed(r){var a=r==null?0:r.length;return a?dn(r,1):[]}function cx(r){var a=r==null?0:r.length;return a?dn(r,xe):[]}function lx(r,a){var u=r==null?0:r.length;return u?(a=a===t?1:it(a),dn(r,a)):[]}function ux(r){for(var a=-1,u=r==null?0:r.length,g={};++a<u;){var S=r[a];g[S[0]]=S[1]}return g}function Td(r){return r&&r.length?r[0]:t}function hx(r,a,u){var g=r==null?0:r.length;if(!g)return-1;var S=u==null?0:it(u);return S<0&&(S=tn(g+S,0)),ls(r,a,S)}function fx(r){var a=r==null?0:r.length;return a?Jn(r,0,-1):[]}var dx=ht(function(r){var a=zt(r,Dl);return a.length&&a[0]===r[0]?El(a):[]}),px=ht(function(r){var a=Qn(r),u=zt(r,Dl);return a===Qn(u)?a=t:u.pop(),u.length&&u[0]===r[0]?El(u,He(a,2)):[]}),mx=ht(function(r){var a=Qn(r),u=zt(r,Dl);return a=typeof a=="function"?a:t,a&&u.pop(),u.length&&u[0]===r[0]?El(u,t,a):[]});function gx(r,a){return r==null?"":f0.call(r,a)}function Qn(r){var a=r==null?0:r.length;return a?r[a-1]:t}function _x(r,a,u){var g=r==null?0:r.length;if(!g)return-1;var S=g;return u!==t&&(S=it(u),S=S<0?tn(g+S,0):_n(S,g-1)),a===a?Z_(r,a,S):da(r,rf,S,!0)}function vx(r,a){return r&&r.length?Nf(r,it(a)):t}var xx=ht(bd);function bd(r,a){return r&&r.length&&a&&a.length?wl(r,a):r}function yx(r,a,u){return r&&r.length&&a&&a.length?wl(r,a,He(u,2)):r}function Sx(r,a,u){return r&&r.length&&a&&a.length?wl(r,a,t,u):r}var Mx=Hi(function(r,a){var u=r==null?0:r.length,g=xl(r,a);return Bf(r,zt(a,function(S){return Gi(S,u)?+S:S}).sort(jf)),g});function Ex(r,a){var u=[];if(!(r&&r.length))return u;var g=-1,S=[],R=r.length;for(a=He(a,3);++g<R;){var N=r[g];a(N,g,r)&&(u.push(N),S.push(g))}return Bf(r,S),u}function Yl(r){return r==null?r:g0.call(r)}function Tx(r,a,u){var g=r==null?0:r.length;return g?(u&&typeof u!="number"&&wn(r,a,u)?(a=0,u=g):(a=a==null?0:it(a),u=u===t?g:it(u)),Jn(r,a,u)):[]}function bx(r,a){return Da(r,a)}function Ax(r,a,u){return Ll(r,a,He(u,2))}function wx(r,a){var u=r==null?0:r.length;if(u){var g=Da(r,a);if(g<u&&li(r[g],a))return g}return-1}function Rx(r,a){return Da(r,a,!0)}function Cx(r,a,u){return Ll(r,a,He(u,2),!0)}function Lx(r,a){var u=r==null?0:r.length;if(u){var g=Da(r,a,!0)-1;if(li(r[g],a))return g}return-1}function Px(r){return r&&r.length?zf(r):[]}function Ix(r,a){return r&&r.length?zf(r,He(a,2)):[]}function Dx(r){var a=r==null?0:r.length;return a?Jn(r,1,a):[]}function Ux(r,a,u){return r&&r.length?(a=u||a===t?1:it(a),Jn(r,0,a<0?0:a)):[]}function Nx(r,a,u){var g=r==null?0:r.length;return g?(a=u||a===t?1:it(a),a=g-a,Jn(r,a<0?0:a,g)):[]}function Ox(r,a){return r&&r.length?Ua(r,He(a,3),!1,!0):[]}function Fx(r,a){return r&&r.length?Ua(r,He(a,3)):[]}var Bx=ht(function(r){return pr(dn(r,1,jt,!0))}),kx=ht(function(r){var a=Qn(r);return jt(a)&&(a=t),pr(dn(r,1,jt,!0),He(a,2))}),zx=ht(function(r){var a=Qn(r);return a=typeof a=="function"?a:t,pr(dn(r,1,jt,!0),t,a)});function Hx(r){return r&&r.length?pr(r):[]}function Gx(r,a){return r&&r.length?pr(r,He(a,2)):[]}function Vx(r,a){return a=typeof a=="function"?a:t,r&&r.length?pr(r,t,a):[]}function jl(r){if(!(r&&r.length))return[];var a=0;return r=lr(r,function(u){if(jt(u))return a=tn(u.length,a),!0}),hl(a,function(u){return zt(r,cl(u))})}function Ad(r,a){if(!(r&&r.length))return[];var u=jl(r);return a==null?u:zt(u,function(g){return Bn(a,t,g)})}var Wx=ht(function(r,a){return jt(r)?Ao(r,a):[]}),Xx=ht(function(r){return Il(lr(r,jt))}),qx=ht(function(r){var a=Qn(r);return jt(a)&&(a=t),Il(lr(r,jt),He(a,2))}),Yx=ht(function(r){var a=Qn(r);return a=typeof a=="function"?a:t,Il(lr(r,jt),t,a)}),jx=ht(jl);function Kx(r,a){return Wf(r||[],a||[],bo)}function Zx(r,a){return Wf(r||[],a||[],Co)}var $x=ht(function(r){var a=r.length,u=a>1?r[a-1]:t;return u=typeof u=="function"?(r.pop(),u):t,Ad(r,u)});function wd(r){var a=A(r);return a.__chain__=!0,a}function Jx(r,a){return a(r),r}function Va(r,a){return a(r)}var Qx=Hi(function(r){var a=r.length,u=a?r[0]:0,g=this.__wrapped__,S=function(R){return xl(R,r)};return a>1||this.__actions__.length||!(g instanceof gt)||!Gi(u)?this.thru(S):(g=g.slice(u,+u+(a?1:0)),g.__actions__.push({func:Va,args:[S],thisArg:t}),new Zn(g,this.__chain__).thru(function(R){return a&&!R.length&&R.push(t),R}))});function ey(){return wd(this)}function ty(){return new Zn(this.value(),this.__chain__)}function ny(){this.__values__===t&&(this.__values__=Hd(this.value()));var r=this.__index__>=this.__values__.length,a=r?t:this.__values__[this.__index__++];return{done:r,value:a}}function iy(){return this}function ry(r){for(var a,u=this;u instanceof Ra;){var g=yd(u);g.__index__=0,g.__values__=t,a?S.__wrapped__=g:a=g;var S=g;u=u.__wrapped__}return S.__wrapped__=r,a}function sy(){var r=this.__wrapped__;if(r instanceof gt){var a=r;return this.__actions__.length&&(a=new gt(this)),a=a.reverse(),a.__actions__.push({func:Va,args:[Yl],thisArg:t}),new Zn(a,this.__chain__)}return this.thru(Yl)}function oy(){return Vf(this.__wrapped__,this.__actions__)}var ay=Na(function(r,a,u){Lt.call(r,u)?++r[u]:ki(r,u,1)});function cy(r,a,u){var g=tt(r)?tf:J0;return u&&wn(r,a,u)&&(a=t),g(r,He(a,3))}function ly(r,a){var u=tt(r)?lr:Af;return u(r,He(a,3))}var uy=ed(Sd),hy=ed(Md);function fy(r,a){return dn(Wa(r,a),1)}function dy(r,a){return dn(Wa(r,a),xe)}function py(r,a,u){return u=u===t?1:it(u),dn(Wa(r,a),u)}function Rd(r,a){var u=tt(r)?jn:dr;return u(r,He(a,3))}function Cd(r,a){var u=tt(r)?D_:bf;return u(r,He(a,3))}var my=Na(function(r,a,u){Lt.call(r,u)?r[u].push(a):ki(r,u,[a])});function gy(r,a,u,g){r=Dn(r)?r:Ss(r),u=u&&!g?it(u):0;var S=r.length;return u<0&&(u=tn(S+u,0)),Ka(r)?u<=S&&r.indexOf(a,u)>-1:!!S&&ls(r,a,u)>-1}var _y=ht(function(r,a,u){var g=-1,S=typeof a=="function",R=Dn(r)?K(r.length):[];return dr(r,function(N){R[++g]=S?Bn(a,N,u):wo(N,a,u)}),R}),vy=Na(function(r,a,u){ki(r,u,a)});function Wa(r,a){var u=tt(r)?zt:If;return u(r,He(a,3))}function xy(r,a,u,g){return r==null?[]:(tt(a)||(a=a==null?[]:[a]),u=g?t:u,tt(u)||(u=u==null?[]:[u]),Of(r,a,u))}var yy=Na(function(r,a,u){r[u?0:1].push(a)},function(){return[[],[]]});function Sy(r,a,u){var g=tt(r)?ol:of,S=arguments.length<3;return g(r,He(a,4),u,S,dr)}function My(r,a,u){var g=tt(r)?U_:of,S=arguments.length<3;return g(r,He(a,4),u,S,bf)}function Ey(r,a){var u=tt(r)?lr:Af;return u(r,Ya(He(a,3)))}function Ty(r){var a=tt(r)?Sf:gv;return a(r)}function by(r,a,u){(u?wn(r,a,u):a===t)?a=1:a=it(a);var g=tt(r)?Y0:_v;return g(r,a)}function Ay(r){var a=tt(r)?j0:xv;return a(r)}function wy(r){if(r==null)return 0;if(Dn(r))return Ka(r)?hs(r):r.length;var a=vn(r);return a==Mt||a==le?r.size:bl(r).length}function Ry(r,a,u){var g=tt(r)?al:yv;return u&&wn(r,a,u)&&(a=t),g(r,He(a,3))}var Cy=ht(function(r,a){if(r==null)return[];var u=a.length;return u>1&&wn(r,a[0],a[1])?a=[]:u>2&&wn(a[0],a[1],a[2])&&(a=[a[0]]),Of(r,dn(a,1),[])}),Xa=l0||function(){return fn.Date.now()};function Ly(r,a){if(typeof a!="function")throw new Kn(c);return r=it(r),function(){if(--r<1)return a.apply(this,arguments)}}function Ld(r,a,u){return a=u?t:a,a=r&&a==null?r.length:a,zi(r,D,t,t,t,t,a)}function Pd(r,a){var u;if(typeof a!="function")throw new Kn(c);return r=it(r),function(){return--r>0&&(u=a.apply(this,arguments)),r<=1&&(a=t),u}}var Kl=ht(function(r,a,u){var g=x;if(u.length){var S=hr(u,xs(Kl));g|=k}return zi(r,g,a,u,S)}),Id=ht(function(r,a,u){var g=x|_;if(u.length){var S=hr(u,xs(Id));g|=k}return zi(a,g,r,u,S)});function Dd(r,a,u){a=u?t:a;var g=zi(r,T,t,t,t,t,t,a);return g.placeholder=Dd.placeholder,g}function Ud(r,a,u){a=u?t:a;var g=zi(r,I,t,t,t,t,t,a);return g.placeholder=Ud.placeholder,g}function Nd(r,a,u){var g,S,R,N,B,G,oe=0,ae=!1,he=!1,ye=!0;if(typeof r!="function")throw new Kn(c);a=ei(a)||0,Gt(u)&&(ae=!!u.leading,he="maxWait"in u,R=he?tn(ei(u.maxWait)||0,a):R,ye="trailing"in u?!!u.trailing:ye);function Ie(Kt){var ui=g,Xi=S;return g=S=t,oe=Kt,N=r.apply(Xi,ui),N}function Ve(Kt){return oe=Kt,B=Io(mt,a),ae?Ie(Kt):N}function st(Kt){var ui=Kt-G,Xi=Kt-oe,ep=a-ui;return he?_n(ep,R-Xi):ep}function We(Kt){var ui=Kt-G,Xi=Kt-oe;return G===t||ui>=a||ui<0||he&&Xi>=R}function mt(){var Kt=Xa();if(We(Kt))return yt(Kt);B=Io(mt,st(Kt))}function yt(Kt){return B=t,ye&&g?Ie(Kt):(g=S=t,N)}function Gn(){B!==t&&Xf(B),oe=0,g=G=S=B=t}function Rn(){return B===t?N:yt(Xa())}function Vn(){var Kt=Xa(),ui=We(Kt);if(g=arguments,S=this,G=Kt,ui){if(B===t)return Ve(G);if(he)return Xf(B),B=Io(mt,a),Ie(G)}return B===t&&(B=Io(mt,a)),N}return Vn.cancel=Gn,Vn.flush=Rn,Vn}var Py=ht(function(r,a){return Tf(r,1,a)}),Iy=ht(function(r,a,u){return Tf(r,ei(a)||0,u)});function Dy(r){return zi(r,C)}function qa(r,a){if(typeof r!="function"||a!=null&&typeof a!="function")throw new Kn(c);var u=function(){var g=arguments,S=a?a.apply(this,g):g[0],R=u.cache;if(R.has(S))return R.get(S);var N=r.apply(this,g);return u.cache=R.set(S,N)||R,N};return u.cache=new(qa.Cache||Bi),u}qa.Cache=Bi;function Ya(r){if(typeof r!="function")throw new Kn(c);return function(){var a=arguments;switch(a.length){case 0:return!r.call(this);case 1:return!r.call(this,a[0]);case 2:return!r.call(this,a[0],a[1]);case 3:return!r.call(this,a[0],a[1],a[2])}return!r.apply(this,a)}}function Uy(r){return Pd(2,r)}var Ny=Sv(function(r,a){a=a.length==1&&tt(a[0])?zt(a[0],kn(He())):zt(dn(a,1),kn(He()));var u=a.length;return ht(function(g){for(var S=-1,R=_n(g.length,u);++S<R;)g[S]=a[S].call(this,g[S]);return Bn(r,this,g)})}),Zl=ht(function(r,a){var u=hr(a,xs(Zl));return zi(r,k,t,a,u)}),Od=ht(function(r,a){var u=hr(a,xs(Od));return zi(r,O,t,a,u)}),Oy=Hi(function(r,a){return zi(r,V,t,t,t,a)});function Fy(r,a){if(typeof r!="function")throw new Kn(c);return a=a===t?a:it(a),ht(r,a)}function By(r,a){if(typeof r!="function")throw new Kn(c);return a=a==null?0:tn(it(a),0),ht(function(u){var g=u[a],S=gr(u,0,a);return g&&ur(S,g),Bn(r,this,S)})}function ky(r,a,u){var g=!0,S=!0;if(typeof r!="function")throw new Kn(c);return Gt(u)&&(g="leading"in u?!!u.leading:g,S="trailing"in u?!!u.trailing:S),Nd(r,a,{leading:g,maxWait:a,trailing:S})}function zy(r){return Ld(r,1)}function Hy(r,a){return Zl(Ul(a),r)}function Gy(){if(!arguments.length)return[];var r=arguments[0];return tt(r)?r:[r]}function Vy(r){return $n(r,v)}function Wy(r,a){return a=typeof a=="function"?a:t,$n(r,v,a)}function Xy(r){return $n(r,p|v)}function qy(r,a){return a=typeof a=="function"?a:t,$n(r,p|v,a)}function Yy(r,a){return a==null||Ef(r,a,cn(a))}function li(r,a){return r===a||r!==r&&a!==a}var jy=ka(Ml),Ky=ka(function(r,a){return r>=a}),Hr=Cf(function(){return arguments}())?Cf:function(r){return Xt(r)&&Lt.call(r,"callee")&&!mf.call(r,"callee")},tt=K.isArray,Zy=Kh?kn(Kh):rv;function Dn(r){return r!=null&&ja(r.length)&&!Vi(r)}function jt(r){return Xt(r)&&Dn(r)}function $y(r){return r===!0||r===!1||Xt(r)&&An(r)==qe}var _r=h0||au,Jy=Zh?kn(Zh):sv;function Qy(r){return Xt(r)&&r.nodeType===1&&!Do(r)}function eS(r){if(r==null)return!0;if(Dn(r)&&(tt(r)||typeof r=="string"||typeof r.splice=="function"||_r(r)||ys(r)||Hr(r)))return!r.length;var a=vn(r);if(a==Mt||a==le)return!r.size;if(Po(r))return!bl(r).length;for(var u in r)if(Lt.call(r,u))return!1;return!0}function tS(r,a){return Ro(r,a)}function nS(r,a,u){u=typeof u=="function"?u:t;var g=u?u(r,a):t;return g===t?Ro(r,a,t,u):!!g}function $l(r){if(!Xt(r))return!1;var a=An(r);return a==q||a==ft||typeof r.message=="string"&&typeof r.name=="string"&&!Do(r)}function iS(r){return typeof r=="number"&&_f(r)}function Vi(r){if(!Gt(r))return!1;var a=An(r);return a==Qe||a==Ge||a==Te||a==ee}function Fd(r){return typeof r=="number"&&r==it(r)}function ja(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=Q}function Gt(r){var a=typeof r;return r!=null&&(a=="object"||a=="function")}function Xt(r){return r!=null&&typeof r=="object"}var Bd=$h?kn($h):av;function rS(r,a){return r===a||Tl(r,a,Hl(a))}function sS(r,a,u){return u=typeof u=="function"?u:t,Tl(r,a,Hl(a),u)}function oS(r){return kd(r)&&r!=+r}function aS(r){if(Wv(r))throw new $e(o);return Lf(r)}function cS(r){return r===null}function lS(r){return r==null}function kd(r){return typeof r=="number"||Xt(r)&&An(r)==ke}function Do(r){if(!Xt(r)||An(r)!=U)return!1;var a=Sa(r);if(a===null)return!0;var u=Lt.call(a,"constructor")&&a.constructor;return typeof u=="function"&&u instanceof u&&_a.call(u)==s0}var Jl=Jh?kn(Jh):cv;function uS(r){return Fd(r)&&r>=-9007199254740991&&r<=Q}var zd=Qh?kn(Qh):lv;function Ka(r){return typeof r=="string"||!tt(r)&&Xt(r)&&An(r)==fe}function Hn(r){return typeof r=="symbol"||Xt(r)&&An(r)==Fe}var ys=ef?kn(ef):uv;function hS(r){return r===t}function fS(r){return Xt(r)&&vn(r)==Pe}function dS(r){return Xt(r)&&An(r)==ze}var pS=ka(Al),mS=ka(function(r,a){return r<=a});function Hd(r){if(!r)return[];if(Dn(r))return Ka(r)?ai(r):In(r);if(yo&&r[yo])return Y_(r[yo]());var a=vn(r),u=a==Mt?dl:a==le?pa:Ss;return u(r)}function Wi(r){if(!r)return r===0?r:0;if(r=ei(r),r===xe||r===-1/0){var a=r<0?-1:1;return a*ge}return r===r?r:0}function it(r){var a=Wi(r),u=a%1;return a===a?u?a-u:a:0}function Gd(r){return r?Fr(it(r),0,Ae):0}function ei(r){if(typeof r=="number")return r;if(Hn(r))return de;if(Gt(r)){var a=typeof r.valueOf=="function"?r.valueOf():r;r=Gt(a)?a+"":a}if(typeof r!="string")return r===0?r:+r;r=af(r);var u=Z.test(r);return u||j.test(r)?L_(r.slice(2),u?2:8):W.test(r)?de:+r}function Vd(r){return bi(r,Un(r))}function gS(r){return r?Fr(it(r),-9007199254740991,Q):r===0?r:0}function wt(r){return r==null?"":zn(r)}var _S=_s(function(r,a){if(Po(a)||Dn(a)){bi(a,cn(a),r);return}for(var u in a)Lt.call(a,u)&&bo(r,u,a[u])}),Wd=_s(function(r,a){bi(a,Un(a),r)}),Za=_s(function(r,a,u,g){bi(a,Un(a),r,g)}),vS=_s(function(r,a,u,g){bi(a,cn(a),r,g)}),xS=Hi(xl);function yS(r,a){var u=gs(r);return a==null?u:Mf(u,a)}var SS=ht(function(r,a){r=Dt(r);var u=-1,g=a.length,S=g>2?a[2]:t;for(S&&wn(a[0],a[1],S)&&(g=1);++u<g;)for(var R=a[u],N=Un(R),B=-1,G=N.length;++B<G;){var oe=N[B],ae=r[oe];(ae===t||li(ae,ds[oe])&&!Lt.call(r,oe))&&(r[oe]=R[oe])}return r}),MS=ht(function(r){return r.push(t,ad),Bn(Xd,t,r)});function ES(r,a){return nf(r,He(a,3),Ti)}function TS(r,a){return nf(r,He(a,3),Sl)}function bS(r,a){return r==null?r:yl(r,He(a,3),Un)}function AS(r,a){return r==null?r:wf(r,He(a,3),Un)}function wS(r,a){return r&&Ti(r,He(a,3))}function RS(r,a){return r&&Sl(r,He(a,3))}function CS(r){return r==null?[]:Pa(r,cn(r))}function LS(r){return r==null?[]:Pa(r,Un(r))}function Ql(r,a,u){var g=r==null?t:Br(r,a);return g===t?u:g}function PS(r,a){return r!=null&&ud(r,a,ev)}function eu(r,a){return r!=null&&ud(r,a,tv)}var IS=nd(function(r,a,u){a!=null&&typeof a.toString!="function"&&(a=va.call(a)),r[a]=u},nu(Nn)),DS=nd(function(r,a,u){a!=null&&typeof a.toString!="function"&&(a=va.call(a)),Lt.call(r,a)?r[a].push(u):r[a]=[u]},He),US=ht(wo);function cn(r){return Dn(r)?yf(r):bl(r)}function Un(r){return Dn(r)?yf(r,!0):hv(r)}function NS(r,a){var u={};return a=He(a,3),Ti(r,function(g,S,R){ki(u,a(g,S,R),g)}),u}function OS(r,a){var u={};return a=He(a,3),Ti(r,function(g,S,R){ki(u,S,a(g,S,R))}),u}var FS=_s(function(r,a,u){Ia(r,a,u)}),Xd=_s(function(r,a,u,g){Ia(r,a,u,g)}),BS=Hi(function(r,a){var u={};if(r==null)return u;var g=!1;a=zt(a,function(R){return R=mr(R,r),g||(g=R.length>1),R}),bi(r,kl(r),u),g&&(u=$n(u,p|m|v,Iv));for(var S=a.length;S--;)Pl(u,a[S]);return u});function kS(r,a){return qd(r,Ya(He(a)))}var zS=Hi(function(r,a){return r==null?{}:dv(r,a)});function qd(r,a){if(r==null)return{};var u=zt(kl(r),function(g){return[g]});return a=He(a),Ff(r,u,function(g,S){return a(g,S[0])})}function HS(r,a,u){a=mr(a,r);var g=-1,S=a.length;for(S||(S=1,r=t);++g<S;){var R=r==null?t:r[Ai(a[g])];R===t&&(g=S,R=u),r=Vi(R)?R.call(r):R}return r}function GS(r,a,u){return r==null?r:Co(r,a,u)}function VS(r,a,u,g){return g=typeof g=="function"?g:t,r==null?r:Co(r,a,u,g)}var Yd=sd(cn),jd=sd(Un);function WS(r,a,u){var g=tt(r),S=g||_r(r)||ys(r);if(a=He(a,4),u==null){var R=r&&r.constructor;S?u=g?new R:[]:Gt(r)?u=Vi(R)?gs(Sa(r)):{}:u={}}return(S?jn:Ti)(r,function(N,B,G){return a(u,N,B,G)}),u}function XS(r,a){return r==null?!0:Pl(r,a)}function qS(r,a,u){return r==null?r:Gf(r,a,Ul(u))}function YS(r,a,u,g){return g=typeof g=="function"?g:t,r==null?r:Gf(r,a,Ul(u),g)}function Ss(r){return r==null?[]:fl(r,cn(r))}function jS(r){return r==null?[]:fl(r,Un(r))}function KS(r,a,u){return u===t&&(u=a,a=t),u!==t&&(u=ei(u),u=u===u?u:0),a!==t&&(a=ei(a),a=a===a?a:0),Fr(ei(r),a,u)}function ZS(r,a,u){return a=Wi(a),u===t?(u=a,a=0):u=Wi(u),r=ei(r),nv(r,a,u)}function $S(r,a,u){if(u&&typeof u!="boolean"&&wn(r,a,u)&&(a=u=t),u===t&&(typeof a=="boolean"?(u=a,a=t):typeof r=="boolean"&&(u=r,r=t)),r===t&&a===t?(r=0,a=1):(r=Wi(r),a===t?(a=r,r=0):a=Wi(a)),r>a){var g=r;r=a,a=g}if(u||r%1||a%1){var S=vf();return _n(r+S*(a-r+C_("1e-"+((S+"").length-1))),a)}return Rl(r,a)}var JS=vs(function(r,a,u){return a=a.toLowerCase(),r+(u?Kd(a):a)});function Kd(r){return tu(wt(r).toLowerCase())}function Zd(r){return r=wt(r),r&&r.replace(Oe,G_).replace(x_,"")}function QS(r,a,u){r=wt(r),a=zn(a);var g=r.length;u=u===t?g:Fr(it(u),0,g);var S=u;return u-=a.length,u>=0&&r.slice(u,S)==a}function eM(r){return r=wt(r),r&&ut.test(r)?r.replace(be,V_):r}function tM(r){return r=wt(r),r&&Si.test(r)?r.replace(mn,"\\$&"):r}var nM=vs(function(r,a,u){return r+(u?"-":"")+a.toLowerCase()}),iM=vs(function(r,a,u){return r+(u?" ":"")+a.toLowerCase()}),rM=Qf("toLowerCase");function sM(r,a,u){r=wt(r),a=it(a);var g=a?hs(r):0;if(!a||g>=a)return r;var S=(a-g)/2;return Ba(ba(S),u)+r+Ba(Ta(S),u)}function oM(r,a,u){r=wt(r),a=it(a);var g=a?hs(r):0;return a&&g<a?r+Ba(a-g,u):r}function aM(r,a,u){r=wt(r),a=it(a);var g=a?hs(r):0;return a&&g<a?Ba(a-g,u)+r:r}function cM(r,a,u){return u||a==null?a=0:a&&(a=+a),m0(wt(r).replace(Mi,""),a||0)}function lM(r,a,u){return(u?wn(r,a,u):a===t)?a=1:a=it(a),Cl(wt(r),a)}function uM(){var r=arguments,a=wt(r[0]);return r.length<3?a:a.replace(r[1],r[2])}var hM=vs(function(r,a,u){return r+(u?"_":"")+a.toLowerCase()});function fM(r,a,u){return u&&typeof u!="number"&&wn(r,a,u)&&(a=u=t),u=u===t?Ae:u>>>0,u?(r=wt(r),r&&(typeof a=="string"||a!=null&&!Jl(a))&&(a=zn(a),!a&&us(r))?gr(ai(r),0,u):r.split(a,u)):[]}var dM=vs(function(r,a,u){return r+(u?" ":"")+tu(a)});function pM(r,a,u){return r=wt(r),u=u==null?0:Fr(it(u),0,r.length),a=zn(a),r.slice(u,u+a.length)==a}function mM(r,a,u){var g=A.templateSettings;u&&wn(r,a,u)&&(a=t),r=wt(r),a=Za({},a,g,od);var S=Za({},a.imports,g.imports,od),R=cn(S),N=fl(S,R),B,G,oe=0,ae=a.interpolate||Be,he="__p += '",ye=pl((a.escape||Be).source+"|"+ae.source+"|"+(ae===bt?Jc:Be).source+"|"+(a.evaluate||Be).source+"|$","g"),Ie="//# sourceURL="+(Lt.call(a,"sourceURL")?(a.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++T_+"]")+`
`;r.replace(ye,function(We,mt,yt,Gn,Rn,Vn){return yt||(yt=Gn),he+=r.slice(oe,Vn).replace(je,W_),mt&&(B=!0,he+=`' +
__e(`+mt+`) +
'`),Rn&&(G=!0,he+=`';
`+Rn+`;
__p += '`),yt&&(he+=`' +
((__t = (`+yt+`)) == null ? '' : __t) +
'`),oe=Vn+We.length,We}),he+=`';
`;var Ve=Lt.call(a,"variable")&&a.variable;if(!Ve)he=`with (obj) {
`+he+`
}
`;else if(Zc.test(Ve))throw new $e(l);he=(G?he.replace(y,""):he).replace(Y,"$1").replace(re,"$1;"),he="function("+(Ve||"obj")+`) {
`+(Ve?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(B?", __e = _.escape":"")+(G?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+he+`return __p
}`;var st=Jd(function(){return At(R,Ie+"return "+he).apply(t,N)});if(st.source=he,$l(st))throw st;return st}function gM(r){return wt(r).toLowerCase()}function _M(r){return wt(r).toUpperCase()}function vM(r,a,u){if(r=wt(r),r&&(u||a===t))return af(r);if(!r||!(a=zn(a)))return r;var g=ai(r),S=ai(a),R=cf(g,S),N=lf(g,S)+1;return gr(g,R,N).join("")}function xM(r,a,u){if(r=wt(r),r&&(u||a===t))return r.slice(0,hf(r)+1);if(!r||!(a=zn(a)))return r;var g=ai(r),S=lf(g,ai(a))+1;return gr(g,0,S).join("")}function yM(r,a,u){if(r=wt(r),r&&(u||a===t))return r.replace(Mi,"");if(!r||!(a=zn(a)))return r;var g=ai(r),S=cf(g,ai(a));return gr(g,S).join("")}function SM(r,a){var u=w,g=X;if(Gt(a)){var S="separator"in a?a.separator:S;u="length"in a?it(a.length):u,g="omission"in a?zn(a.omission):g}r=wt(r);var R=r.length;if(us(r)){var N=ai(r);R=N.length}if(u>=R)return r;var B=u-hs(g);if(B<1)return g;var G=N?gr(N,0,B).join(""):r.slice(0,B);if(S===t)return G+g;if(N&&(B+=G.length-B),Jl(S)){if(r.slice(B).search(S)){var oe,ae=G;for(S.global||(S=pl(S.source,wt(L.exec(S))+"g")),S.lastIndex=0;oe=S.exec(ae);)var he=oe.index;G=G.slice(0,he===t?B:he)}}else if(r.indexOf(zn(S),B)!=B){var ye=G.lastIndexOf(S);ye>-1&&(G=G.slice(0,ye))}return G+g}function MM(r){return r=wt(r),r&&pt.test(r)?r.replace(ve,$_):r}var EM=vs(function(r,a,u){return r+(u?" ":"")+a.toUpperCase()}),tu=Qf("toUpperCase");function $d(r,a,u){return r=wt(r),a=u?t:a,a===t?q_(r)?e0(r):F_(r):r.match(a)||[]}var Jd=ht(function(r,a){try{return Bn(r,t,a)}catch(u){return $l(u)?u:new $e(u)}}),TM=Hi(function(r,a){return jn(a,function(u){u=Ai(u),ki(r,u,Kl(r[u],r))}),r});function bM(r){var a=r==null?0:r.length,u=He();return r=a?zt(r,function(g){if(typeof g[1]!="function")throw new Kn(c);return[u(g[0]),g[1]]}):[],ht(function(g){for(var S=-1;++S<a;){var R=r[S];if(Bn(R[0],this,g))return Bn(R[1],this,g)}})}function AM(r){return $0($n(r,p))}function nu(r){return function(){return r}}function wM(r,a){return r==null||r!==r?a:r}var RM=td(),CM=td(!0);function Nn(r){return r}function iu(r){return Pf(typeof r=="function"?r:$n(r,p))}function LM(r){return Df($n(r,p))}function PM(r,a){return Uf(r,$n(a,p))}var IM=ht(function(r,a){return function(u){return wo(u,r,a)}}),DM=ht(function(r,a){return function(u){return wo(r,u,a)}});function ru(r,a,u){var g=cn(a),S=Pa(a,g);u==null&&!(Gt(a)&&(S.length||!g.length))&&(u=a,a=r,r=this,S=Pa(a,cn(a)));var R=!(Gt(u)&&"chain"in u)||!!u.chain,N=Vi(r);return jn(S,function(B){var G=a[B];r[B]=G,N&&(r.prototype[B]=function(){var oe=this.__chain__;if(R||oe){var ae=r(this.__wrapped__),he=ae.__actions__=In(this.__actions__);return he.push({func:G,args:arguments,thisArg:r}),ae.__chain__=oe,ae}return G.apply(r,ur([this.value()],arguments))})}),r}function UM(){return fn._===this&&(fn._=o0),this}function su(){}function NM(r){return r=it(r),ht(function(a){return Nf(a,r)})}var OM=Ol(zt),FM=Ol(tf),BM=Ol(al);function Qd(r){return Vl(r)?cl(Ai(r)):pv(r)}function kM(r){return function(a){return r==null?t:Br(r,a)}}var zM=id(),HM=id(!0);function ou(){return[]}function au(){return!1}function GM(){return{}}function VM(){return""}function WM(){return!0}function XM(r,a){if(r=it(r),r<1||r>Q)return[];var u=Ae,g=_n(r,Ae);a=He(a),r-=Ae;for(var S=hl(g,a);++u<r;)a(u);return S}function qM(r){return tt(r)?zt(r,Ai):Hn(r)?[r]:In(xd(wt(r)))}function YM(r){var a=++r0;return wt(r)+a}var jM=Fa(function(r,a){return r+a},0),KM=Fl("ceil"),ZM=Fa(function(r,a){return r/a},1),$M=Fl("floor");function JM(r){return r&&r.length?La(r,Nn,Ml):t}function QM(r,a){return r&&r.length?La(r,He(a,2),Ml):t}function eE(r){return sf(r,Nn)}function tE(r,a){return sf(r,He(a,2))}function nE(r){return r&&r.length?La(r,Nn,Al):t}function iE(r,a){return r&&r.length?La(r,He(a,2),Al):t}var rE=Fa(function(r,a){return r*a},1),sE=Fl("round"),oE=Fa(function(r,a){return r-a},0);function aE(r){return r&&r.length?ul(r,Nn):0}function cE(r,a){return r&&r.length?ul(r,He(a,2)):0}return A.after=Ly,A.ary=Ld,A.assign=_S,A.assignIn=Wd,A.assignInWith=Za,A.assignWith=vS,A.at=xS,A.before=Pd,A.bind=Kl,A.bindAll=TM,A.bindKey=Id,A.castArray=Gy,A.chain=wd,A.chunk=$v,A.compact=Jv,A.concat=Qv,A.cond=bM,A.conforms=AM,A.constant=nu,A.countBy=ay,A.create=yS,A.curry=Dd,A.curryRight=Ud,A.debounce=Nd,A.defaults=SS,A.defaultsDeep=MS,A.defer=Py,A.delay=Iy,A.difference=ex,A.differenceBy=tx,A.differenceWith=nx,A.drop=ix,A.dropRight=rx,A.dropRightWhile=sx,A.dropWhile=ox,A.fill=ax,A.filter=ly,A.flatMap=fy,A.flatMapDeep=dy,A.flatMapDepth=py,A.flatten=Ed,A.flattenDeep=cx,A.flattenDepth=lx,A.flip=Dy,A.flow=RM,A.flowRight=CM,A.fromPairs=ux,A.functions=CS,A.functionsIn=LS,A.groupBy=my,A.initial=fx,A.intersection=dx,A.intersectionBy=px,A.intersectionWith=mx,A.invert=IS,A.invertBy=DS,A.invokeMap=_y,A.iteratee=iu,A.keyBy=vy,A.keys=cn,A.keysIn=Un,A.map=Wa,A.mapKeys=NS,A.mapValues=OS,A.matches=LM,A.matchesProperty=PM,A.memoize=qa,A.merge=FS,A.mergeWith=Xd,A.method=IM,A.methodOf=DM,A.mixin=ru,A.negate=Ya,A.nthArg=NM,A.omit=BS,A.omitBy=kS,A.once=Uy,A.orderBy=xy,A.over=OM,A.overArgs=Ny,A.overEvery=FM,A.overSome=BM,A.partial=Zl,A.partialRight=Od,A.partition=yy,A.pick=zS,A.pickBy=qd,A.property=Qd,A.propertyOf=kM,A.pull=xx,A.pullAll=bd,A.pullAllBy=yx,A.pullAllWith=Sx,A.pullAt=Mx,A.range=zM,A.rangeRight=HM,A.rearg=Oy,A.reject=Ey,A.remove=Ex,A.rest=Fy,A.reverse=Yl,A.sampleSize=by,A.set=GS,A.setWith=VS,A.shuffle=Ay,A.slice=Tx,A.sortBy=Cy,A.sortedUniq=Px,A.sortedUniqBy=Ix,A.split=fM,A.spread=By,A.tail=Dx,A.take=Ux,A.takeRight=Nx,A.takeRightWhile=Ox,A.takeWhile=Fx,A.tap=Jx,A.throttle=ky,A.thru=Va,A.toArray=Hd,A.toPairs=Yd,A.toPairsIn=jd,A.toPath=qM,A.toPlainObject=Vd,A.transform=WS,A.unary=zy,A.union=Bx,A.unionBy=kx,A.unionWith=zx,A.uniq=Hx,A.uniqBy=Gx,A.uniqWith=Vx,A.unset=XS,A.unzip=jl,A.unzipWith=Ad,A.update=qS,A.updateWith=YS,A.values=Ss,A.valuesIn=jS,A.without=Wx,A.words=$d,A.wrap=Hy,A.xor=Xx,A.xorBy=qx,A.xorWith=Yx,A.zip=jx,A.zipObject=Kx,A.zipObjectDeep=Zx,A.zipWith=$x,A.entries=Yd,A.entriesIn=jd,A.extend=Wd,A.extendWith=Za,ru(A,A),A.add=jM,A.attempt=Jd,A.camelCase=JS,A.capitalize=Kd,A.ceil=KM,A.clamp=KS,A.clone=Vy,A.cloneDeep=Xy,A.cloneDeepWith=qy,A.cloneWith=Wy,A.conformsTo=Yy,A.deburr=Zd,A.defaultTo=wM,A.divide=ZM,A.endsWith=QS,A.eq=li,A.escape=eM,A.escapeRegExp=tM,A.every=cy,A.find=uy,A.findIndex=Sd,A.findKey=ES,A.findLast=hy,A.findLastIndex=Md,A.findLastKey=TS,A.floor=$M,A.forEach=Rd,A.forEachRight=Cd,A.forIn=bS,A.forInRight=AS,A.forOwn=wS,A.forOwnRight=RS,A.get=Ql,A.gt=jy,A.gte=Ky,A.has=PS,A.hasIn=eu,A.head=Td,A.identity=Nn,A.includes=gy,A.indexOf=hx,A.inRange=ZS,A.invoke=US,A.isArguments=Hr,A.isArray=tt,A.isArrayBuffer=Zy,A.isArrayLike=Dn,A.isArrayLikeObject=jt,A.isBoolean=$y,A.isBuffer=_r,A.isDate=Jy,A.isElement=Qy,A.isEmpty=eS,A.isEqual=tS,A.isEqualWith=nS,A.isError=$l,A.isFinite=iS,A.isFunction=Vi,A.isInteger=Fd,A.isLength=ja,A.isMap=Bd,A.isMatch=rS,A.isMatchWith=sS,A.isNaN=oS,A.isNative=aS,A.isNil=lS,A.isNull=cS,A.isNumber=kd,A.isObject=Gt,A.isObjectLike=Xt,A.isPlainObject=Do,A.isRegExp=Jl,A.isSafeInteger=uS,A.isSet=zd,A.isString=Ka,A.isSymbol=Hn,A.isTypedArray=ys,A.isUndefined=hS,A.isWeakMap=fS,A.isWeakSet=dS,A.join=gx,A.kebabCase=nM,A.last=Qn,A.lastIndexOf=_x,A.lowerCase=iM,A.lowerFirst=rM,A.lt=pS,A.lte=mS,A.max=JM,A.maxBy=QM,A.mean=eE,A.meanBy=tE,A.min=nE,A.minBy=iE,A.stubArray=ou,A.stubFalse=au,A.stubObject=GM,A.stubString=VM,A.stubTrue=WM,A.multiply=rE,A.nth=vx,A.noConflict=UM,A.noop=su,A.now=Xa,A.pad=sM,A.padEnd=oM,A.padStart=aM,A.parseInt=cM,A.random=$S,A.reduce=Sy,A.reduceRight=My,A.repeat=lM,A.replace=uM,A.result=HS,A.round=sE,A.runInContext=H,A.sample=Ty,A.size=wy,A.snakeCase=hM,A.some=Ry,A.sortedIndex=bx,A.sortedIndexBy=Ax,A.sortedIndexOf=wx,A.sortedLastIndex=Rx,A.sortedLastIndexBy=Cx,A.sortedLastIndexOf=Lx,A.startCase=dM,A.startsWith=pM,A.subtract=oE,A.sum=aE,A.sumBy=cE,A.template=mM,A.times=XM,A.toFinite=Wi,A.toInteger=it,A.toLength=Gd,A.toLower=gM,A.toNumber=ei,A.toSafeInteger=gS,A.toString=wt,A.toUpper=_M,A.trim=vM,A.trimEnd=xM,A.trimStart=yM,A.truncate=SM,A.unescape=MM,A.uniqueId=YM,A.upperCase=EM,A.upperFirst=tu,A.each=Rd,A.eachRight=Cd,A.first=Td,ru(A,function(){var r={};return Ti(A,function(a,u){Lt.call(A.prototype,u)||(r[u]=a)}),r}(),{chain:!1}),A.VERSION=n,jn(["bind","bindKey","curry","curryRight","partial","partialRight"],function(r){A[r].placeholder=A}),jn(["drop","take"],function(r,a){gt.prototype[r]=function(u){u=u===t?1:tn(it(u),0);var g=this.__filtered__&&!a?new gt(this):this.clone();return g.__filtered__?g.__takeCount__=_n(u,g.__takeCount__):g.__views__.push({size:_n(u,Ae),type:r+(g.__dir__<0?"Right":"")}),g},gt.prototype[r+"Right"]=function(u){return this.reverse()[r](u).reverse()}}),jn(["filter","map","takeWhile"],function(r,a){var u=a+1,g=u==te||u==ue;gt.prototype[r]=function(S){var R=this.clone();return R.__iteratees__.push({iteratee:He(S,3),type:u}),R.__filtered__=R.__filtered__||g,R}}),jn(["head","last"],function(r,a){var u="take"+(a?"Right":"");gt.prototype[r]=function(){return this[u](1).value()[0]}}),jn(["initial","tail"],function(r,a){var u="drop"+(a?"":"Right");gt.prototype[r]=function(){return this.__filtered__?new gt(this):this[u](1)}}),gt.prototype.compact=function(){return this.filter(Nn)},gt.prototype.find=function(r){return this.filter(r).head()},gt.prototype.findLast=function(r){return this.reverse().find(r)},gt.prototype.invokeMap=ht(function(r,a){return typeof r=="function"?new gt(this):this.map(function(u){return wo(u,r,a)})}),gt.prototype.reject=function(r){return this.filter(Ya(He(r)))},gt.prototype.slice=function(r,a){r=it(r);var u=this;return u.__filtered__&&(r>0||a<0)?new gt(u):(r<0?u=u.takeRight(-r):r&&(u=u.drop(r)),a!==t&&(a=it(a),u=a<0?u.dropRight(-a):u.take(a-r)),u)},gt.prototype.takeRightWhile=function(r){return this.reverse().takeWhile(r).reverse()},gt.prototype.toArray=function(){return this.take(Ae)},Ti(gt.prototype,function(r,a){var u=/^(?:filter|find|map|reject)|While$/.test(a),g=/^(?:head|last)$/.test(a),S=A[g?"take"+(a=="last"?"Right":""):a],R=g||/^find/.test(a);S&&(A.prototype[a]=function(){var N=this.__wrapped__,B=g?[1]:arguments,G=N instanceof gt,oe=B[0],ae=G||tt(N),he=function(mt){var yt=S.apply(A,ur([mt],B));return g&&ye?yt[0]:yt};ae&&u&&typeof oe=="function"&&oe.length!=1&&(G=ae=!1);var ye=this.__chain__,Ie=!!this.__actions__.length,Ve=R&&!ye,st=G&&!Ie;if(!R&&ae){N=st?N:new gt(this);var We=r.apply(N,B);return We.__actions__.push({func:Va,args:[he],thisArg:t}),new Zn(We,ye)}return Ve&&st?r.apply(this,B):(We=this.thru(he),Ve?g?We.value()[0]:We.value():We)})}),jn(["pop","push","shift","sort","splice","unshift"],function(r){var a=ma[r],u=/^(?:push|sort|unshift)$/.test(r)?"tap":"thru",g=/^(?:pop|shift)$/.test(r);A.prototype[r]=function(){var S=arguments;if(g&&!this.__chain__){var R=this.value();return a.apply(tt(R)?R:[],S)}return this[u](function(N){return a.apply(tt(N)?N:[],S)})}}),Ti(gt.prototype,function(r,a){var u=A[a];if(u){var g=u.name+"";Lt.call(ms,g)||(ms[g]=[]),ms[g].push({name:a,func:u})}}),ms[Oa(t,_).name]=[{name:"wrapper",func:t}],gt.prototype.clone=M0,gt.prototype.reverse=E0,gt.prototype.value=T0,A.prototype.at=Qx,A.prototype.chain=ey,A.prototype.commit=ty,A.prototype.next=ny,A.prototype.plant=ry,A.prototype.reverse=sy,A.prototype.toJSON=A.prototype.valueOf=A.prototype.value=oy,A.prototype.first=A.prototype.head,yo&&(A.prototype[yo]=iy),A},fs=t0();Dr?((Dr.exports=fs)._=fs,il._=fs):fn._=fs}).call(UC)}(Yo,Yo.exports)),Yo.exports}var OC=NC();const Ks=class Ks{constructor(e,t,n,i){this.registered=new Map,this.listeners=new Map,this._id=LC(),this.renderer=e,this.scene=t,this.controller=n,this.toolbox=i,this._mediaGenerator=null,this._io=null,this._ar=null,Ks.__instances.push(this)}static get(e){const t=this.__instances.find(n=>n.id===e);return t||this.__instances.find(n=>Array.from(n.registered.values()).find(i=>i.id===e))}get id(){return this._id}get mediaGenerator(){return this._mediaGenerator?Promise.resolve(this._mediaGenerator):new Promise((e,t)=>{Promise.resolve().then(()=>require("./MediaCreator-BNxZVYyZ.cjs")).then(n=>{const i=n.DIVEMediaCreator;this._mediaGenerator=new i(this.renderer,this.scene,this.controller),e(this._mediaGenerator)}).catch(n=>{console.error("DIVE: Error while lazy-loading IO module:",n),t(n)})})}get io(){return this._io?Promise.resolve(this._io):new Promise((e,t)=>{Promise.resolve().then(()=>require("./IO-CuYml7Y5.cjs")).then(n=>{const i=n.DIVEIO;this._io=new i(this.scene),e(this._io)}).catch(n=>{console.error("DIVE: Error while lazy-loading IO module:",n),t(n)})})}get ar(){return this._ar?Promise.resolve(this._ar):new Promise((e,t)=>{Promise.resolve().then(()=>require("./AR-BWQebw6-.cjs")).then(n=>{const i=n.DIVEAR;this._ar=new i(this.renderer,this.scene,this.controller),e(this._ar)}).catch(n=>{console.error("DIVE: Error while lazy-loading AR module:",n),t(n)})})}DestroyInstance(){const e=Ks.__instances.findIndex(t=>t.id===this.id);return e===-1?!1:(Ks.__instances.splice(e,1),!0)}PerformAction(e,t){let n=!1;switch(e){case"GET_ALL_SCENE_DATA":{n=this.getAllSceneData(t);break}case"GET_ALL_OBJECTS":{n=this.getAllObjects(t);break}case"GET_OBJECTS":{n=this.getObjects(t);break}case"ADD_OBJECT":{n=this.addObject(t);break}case"UPDATE_OBJECT":{n=this.updateObject(t);break}case"DELETE_OBJECT":{n=this.deleteObject(t);break}case"SELECT_OBJECT":{n=this.selectObject(t);break}case"DESELECT_OBJECT":{n=this.deselectObject(t);break}case"SET_BACKGROUND":{n=this.setBackground(t);break}case"DROP_IT":{n=this.dropIt(t);break}case"PLACE_ON_FLOOR":{n=this.placeOnFloor(t);break}case"SET_CAMERA_TRANSFORM":{n=this.setCameraTransform(t);break}case"GET_CAMERA_TRANSFORM":{n=this.getCameraTransform(t);break}case"MOVE_CAMERA":{n=this.moveCamera(t);break}case"RESET_CAMERA":{n=this.resetCamera(t);break}case"COMPUTE_ENCOMPASSING_VIEW":{n=this.computeEncompassingView(t);break}case"SET_CAMERA_LAYER":{n=this.setCameraLayer(t);break}case"ZOOM_CAMERA":{n=this.zoomCamera(t);break}case"SET_GIZMO_MODE":{n=this.setGizmoMode(t);break}case"SET_GIZMO_VISIBILITY":{n=this.setGizmoVisibility(t);break}case"SET_GIZMO_SCALE_LINKED":{n=this.setGizmoScaleLinked(t);break}case"USE_TOOL":{n=this.useTool(t);break}case"MODEL_LOADED":{n=this.modelLoaded(t);break}case"UPDATE_SCENE":{n=this.updateScene(t);break}case"GENERATE_MEDIA":{n=this.generateMedia(t);break}case"SET_PARENT":{n=this.setParent(t);break}case"EXPORT_SCENE":{n=this.exportScene(t);break}case"LAUNCH_AR":{n=new Promise((i,o)=>{this.ar.then(c=>{i(c.Launch(t))}).catch(o)});break}default:console.warn(`DIVECommunication.PerformAction: has been executed with unknown Action type ${e}`)}return this.dispatch(e,t),n}Subscribe(e,t){return this.listeners.get(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),()=>{const n=this.listeners.get(e);if(!n)return!1;const i=n.findIndex(o=>o===t);return i===-1?!1:(n.splice(i,1),!0)}}dispatch(e,t){const n=this.listeners.get(e);n&&n.forEach(i=>i(t))}getAllSceneData(e){const t={name:this.scene.name,mediaItem:null,backgroundColor:"#"+this.scene.background.getHexString(),floorEnabled:this.scene.Floor.visible,floorColor:"#"+this.scene.Floor.material.color.getHexString(),userCamera:{position:this.controller.object.position.clone(),target:this.controller.target.clone()},spotmarks:[],lights:Array.from(this.registered.values()).filter(n=>n.entityType==="light"),objects:Array.from(this.registered.values()).filter(n=>n.entityType==="model"),cameras:Array.from(this.registered.values()).filter(n=>n.entityType==="pov"),primitives:Array.from(this.registered.values()).filter(n=>n.entityType==="primitive"),groups:Array.from(this.registered.values()).filter(n=>n.entityType==="group")};return Object.assign(e,t),t}getAllObjects(e){return Object.assign(e,this.registered),this.registered}getObjects(e){if(e.ids.length===0)return[];const t=[];return this.registered.forEach(n=>{e.ids.includes(n.id)&&t.push(n)}),t}addObject(e){return this.registered.get(e.id)?!1:(e.parentId===void 0&&(e.parentId=null),this.registered.set(e.id,e),this.scene.AddSceneObject(e),!0)}updateObject(e){const t=this.registered.get(e.id);if(!t)return!1;this.registered.set(e.id,OC.merge(t,e));const n=this.registered.get(e.id);return this.scene.UpdateSceneObject({...e,id:n.id,entityType:n.entityType}),Object.assign(e,n),!0}deleteObject(e){const t=this.registered.get(e.id);return t?(t.parentId&&this.setParent({object:{id:t.id},parent:null}),t.entityType==="group"&&this.registered.forEach(n=>{n.parentId===t.id&&this.updateObject({id:n.id,parentId:null})}),Object.assign(e,t),this.registered.delete(e.id),Array.from(this.registered.values()).forEach(n=>{n.parentId&&n.parentId===e.id&&(n.parentId=null)}),this.scene.DeleteSceneObject(t),!0):!1}selectObject(e){const t=this.registered.get(e.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n||!("isSelectable"in n))return!1;const i=this.toolbox.GetActiveTool();return i&&Km(i)&&i.AttachGizmo(n),Object.assign(e,t),!0}deselectObject(e){const t=this.registered.get(e.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n||!("isSelectable"in n))return!1;const i=this.toolbox.GetActiveTool();return i&&Km(i)&&i.DetachGizmo(),Object.assign(e,t),!0}setBackground(e){return this.scene.SetBackground(e.color),!0}dropIt(e){const t=this.registered.get(e.id);return t?(this.scene.GetSceneObject(t).DropIt(),!0):!1}placeOnFloor(e){const t=this.registered.get(e.id);return t?(this.scene.PlaceOnFloor(t),!0):!1}setCameraTransform(e){return this.controller.object.position.copy(e.position),this.controller.target.copy(e.target),this.controller.update(),!0}getCameraTransform(e){const t={position:this.controller.object.position.clone(),target:this.controller.target.clone()};return Object.assign(e,t),t}moveCamera(e){let t={x:0,y:0,z:0},n={x:0,y:0,z:0};return"id"in e?(t=this.registered.get(e.id).position,n=this.registered.get(e.id).target):(t=e.position,n=e.target),this.controller.MoveTo(t,n,e.duration,e.locked),!0}setCameraLayer(e){return this.controller.object.SetCameraLayer(e.layer),!0}resetCamera(e){return this.controller.RevertLast(e.duration),!0}computeEncompassingView(e){const t=this.scene.ComputeSceneBB(),n=this.controller.ComputeEncompassingView(t);return Object.assign(e,n),n}zoomCamera(e){return e.direction==="IN"&&this.controller.ZoomIn(e.by),e.direction==="OUT"&&this.controller.ZoomOut(e.by),!0}setGizmoMode(e){return this.toolbox.SetGizmoMode(e.mode),!0}setGizmoVisibility(e){return this.toolbox.SetGizmoVisibility(e),e}setGizmoScaleLinked(e){return this.toolbox.SetGizmoScaleLinked(e),e}useTool(e){return this.toolbox.UseTool(e.tool),!0}modelLoaded(e){return this.registered.get(e.id).loaded=!0,!0}updateScene(e){return e.name!==void 0&&(this.scene.name=e.name),e.backgroundColor!==void 0&&this.scene.SetBackground(e.backgroundColor),e.gridEnabled!==void 0&&this.scene.Grid.SetVisibility(e.gridEnabled),e.floorEnabled!==void 0&&this.scene.Floor.SetVisibility(e.floorEnabled),e.floorColor!==void 0&&this.scene.Floor.SetColor(e.floorColor),e.name=this.scene.name,e.backgroundColor="#"+this.scene.background.getHexString(),e.gridEnabled=this.scene.Grid.visible,e.floorEnabled=this.scene.Floor.visible,e.floorColor="#"+this.scene.Floor.material.color.getHexString(),!0}generateMedia(e){let t={x:0,y:0,z:0},n={x:0,y:0,z:0};return"id"in e?(t=this.registered.get(e.id).position,n=this.registered.get(e.id).target):(t=e.position,n=e.target),this.mediaGenerator.then(i=>i.GenerateMedia(t,n,e.width,e.height))}setParent(e){const t=this.registered.get(e.object.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n)return!1;if(e.parent===null)return this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0;if(e.object.id===e.parent.id)return!1;const i=this.registered.get(e.parent.id);if(!i)return this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0;const o=this.scene.GetSceneObject(i);return o?(o.attach(n),this.updateObject({id:t.id,parentId:i.id}),!0):(this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0)}exportScene(e){return new Promise((t,n)=>{this.io.then(i=>{t(i.Export(e.type))}).catch(n)})}};Ks.__instances=[];let On=Ks;class FC extends St{constructor(){super(),this.isDIVELight=!0,this.isDIVEPointLight=!0,this.isMovable=!0,this.isSelectable=!0,this.gizmo=null,this.name="DIVEPointLight",this.light=new Zg(16777215,1),this.light.layers.mask=si,this.light.castShadow=!0,this.light.shadow.mapSize.width=512,this.light.shadow.mapSize.height=512,this.add(this.light);const e=.1,t=new Kc(e,e*320,e*320),n=new nr({color:this.light.color,transparent:!0,opacity:.8,side:Li});this.mesh=new un(t,n),this.mesh.layers.mask=$g,this.add(this.mesh)}SetColor(e){this.light.color=e,this.mesh.material.color=e}SetIntensity(e){this.light.intensity=e,this.mesh.material.opacity=e>.8?.8:e*.8}SetEnabled(e){this.light.visible=e}onMove(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.position})}onSelect(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("SELECT_OBJECT",{id:this.userData.id})}onDeselect(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("DESELECT_OBJECT",{id:this.userData.id})}}class BC extends St{constructor(){super(),this.isDIVELight=!0,this.isDIVESceneLight=!0,this.name="DIVESceneLight",this._hemiLight=new cC(16777215,16777215,2),this._hemiLight.layers.mask=si,this._hemiLight.position.set(0,50,0),this.add(this._hemiLight),this._dirLight=new Ch(16777215,3),this._dirLight.layers.mask=si,this._dirLight.position.set(1,1.75,1),this._dirLight.position.multiplyScalar(30),this._dirLight.castShadow=!0,this._dirLight.shadow.mapSize.width=2048,this._dirLight.shadow.mapSize.height=2048;const e=5;this._dirLight.shadow.camera.left=-5,this._dirLight.shadow.camera.right=e,this._dirLight.shadow.camera.top=e,this._dirLight.shadow.camera.bottom=-5,this._dirLight.shadow.camera.far=3500,this.add(this._dirLight)}SetColor(e){this._hemiLight.color=e,this._dirLight.color=e}SetIntensity(e){this._hemiLight.intensity=e*2,this._dirLight.intensity=e*3}SetEnabled(e){this._hemiLight.visible=e,this._dirLight.visible=e}}const Uh=s=>s.parent?Uh(s.parent):s;class Nh extends St{constructor(){super(),this.isDIVENode=!0,this.isSelectable=!0,this.isMovable=!0,this.gizmo=null,this.layers.mask=si,this._positionWorldBuffer=new F,this._boundingBox=new yi}SetPosition(e){if(!this.parent){this.position.set(e.x,e.y,e.z);return}const t=new F(e.x,e.y,e.z);this.position.copy(this.parent.worldToLocal(t)),"isDIVEGroup"in this.parent&&this.parent.UpdateLineTo(this)}SetRotation(e){this.rotation.set(e.x,e.y,e.z)}SetScale(e){this.scale.set(e.x,e.y,e.z)}SetVisibility(e){this.visible=e}SetToWorldOrigin(){var e;this.position.set(0,0,0),(e=On.get(this.userData.id))==null||e.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})}onMove(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})}onSelect(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("SELECT_OBJECT",{id:this.userData.id})}onDeselect(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("DESELECT_OBJECT",{id:this.userData.id})}}class kC extends Nh{constructor(){super(...arguments),this.isDIVEModel=!0,this._mesh=null,this._material=null}SetModel(e){this.clear(),this._boundingBox.makeEmpty(),e.scene.traverse(t=>{t.castShadow=!0,t.receiveShadow=!0,t.layers.mask=this.layers.mask,this._boundingBox.expandByObject(t),!this._mesh&&"isMesh"in t&&(this._mesh=t,this._material?this._mesh.material=this._material:this._material=t.material)}),this.add(e.scene)}SetMaterial(e){this._material||(this._material=new uo),e.vertexColors!==void 0&&(this._material.vertexColors=e.vertexColors),e.color!==void 0&&this._material.color.set(e.color),e.map!==void 0&&(this._material.map=e.map),e.normalMap!==void 0&&(this._material.normalMap=e.normalMap),e.roughness!==void 0&&(this._material.roughness=e.roughness),e.roughnessMap!==void 0&&(this._material.roughnessMap=e.roughnessMap,this._material.roughnessMap&&(this._material.roughness=1)),e.metalness!==void 0&&(this._material.metalness=e.metalness),e.metalnessMap!==void 0&&(this._material.metalnessMap=e.metalnessMap,this._material.metalnessMap&&(this._material.metalness=1)),this._mesh&&(this._mesh.material=this._material)}PlaceOnFloor(){var i,o,c,l,h;const e=this.getWorldPosition(this._positionWorldBuffer),t=e.clone();(o=(i=this._mesh)==null?void 0:i.geometry)==null||o.computeBoundingBox();const n=(l=(c=this._mesh)==null?void 0:c.geometry)==null?void 0:l.boundingBox;!n||!this._mesh||(e.y=e.y-this._mesh.localToWorld(n.min.clone()).y,e.y!==t.y&&((h=On.get(this.userData.id))==null||h.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale})))}DropIt(){if(!this.parent){console.warn("DIVEModel: DropIt() called on a model that is not in the scene.",this);return}const e=this._boundingBox.min.y*this.scale.y,t=this.localToWorld(this._boundingBox.getCenter(new F).multiply(this.scale));t.y=e+this.position.y;const n=new Dh(t,new F(0,-1,0));n.layers.mask=si;const i=n.intersectObjects(Uh(this).Root.children,!0);if(i.length>0){const o=i[0].object;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox,l=o.localToWorld(c.max.clone()),h=this.position.clone(),f=this.position.clone().setY(l.y).sub(new F(0,e,0));if(this.position.copy(f),this.position.y===h.y)return;this.onMove()}}}const Xu=new WeakMap;class zC extends os{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const o=new Bc(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,c=>{this.parse(c,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,nn).catch(n)}decodeDracoFile(e,t,n,i,o=hn,c=()=>{}){const l={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:o};return this.decodeGeometry(e,l).then(t).catch(c)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Xu.has(e)){const h=Xu.get(e);if(h.key===n)return h.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const o=this.workerNextTaskID++,c=e.byteLength,l=this._getWorker(o,c).then(h=>(i=h,new Promise((f,d)=>{i._callbacks[o]={resolve:f,reject:d},i.postMessage({type:"decode",id:o,taskConfig:t,buffer:e},[e])}))).then(h=>this._createGeometry(h.geometry));return l.catch(()=>!0).then(()=>{i&&o&&this._releaseTask(i,o)}),Xu.set(e,{key:n,promise:l}),l}_createGeometry(e){const t=new on;e.index&&t.setIndex(new Qt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],o=i.name,c=i.array,l=i.itemSize,h=new Qt(c,l);o==="color"&&(this._assignVertexColorSpace(h,i.vertexColorSpace),h.normalized=!(c instanceof Float32Array)),t.setAttribute(o,h)}return t}_assignVertexColorSpace(e,t){if(t!==nn)return;const n=new De;for(let i=0,o=e.count;i<o;i++)n.fromBufferAttribute(e,i).convertSRGBToLinear(),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new Bc(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,o)=>{n.load(e,i,void 0,o)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const o=HC.toString(),c=["/* draco decoder */",i,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([c]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(o){const c=o.data;switch(c.type){case"decode":i._callbacks[c.id].resolve(c);break;case"error":i._callbacks[c.id].reject(c);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+c.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,o){return i._taskLoad>o._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function HC(){let s,e;onmessage=function(c){const l=c.data;switch(l.type){case"init":s=l.decoderConfig,e=new Promise(function(d){s.onModuleLoaded=function(p){d({draco:p})},DracoDecoderModule(s)});break;case"decode":const h=l.buffer,f=l.taskConfig;e.then(d=>{const p=d.draco,m=new p.Decoder;try{const v=t(p,m,new Int8Array(h),f),M=v.attributes.map(E=>E.array.buffer);v.index&&M.push(v.index.array.buffer),self.postMessage({type:"decode",id:l.id,geometry:v},M)}catch(v){console.error(v),self.postMessage({type:"error",id:l.id,error:v.message})}finally{p.destroy(m)}});break}};function t(c,l,h,f){const d=f.attributeIDs,p=f.attributeTypes;let m,v;const M=l.GetEncodedGeometryType(h);if(M===c.TRIANGULAR_MESH)m=new c.Mesh,v=l.DecodeArrayToMesh(h,h.byteLength,m);else if(M===c.POINT_CLOUD)m=new c.PointCloud,v=l.DecodeArrayToPointCloud(h,h.byteLength,m);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!v.ok()||m.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+v.error_msg());const E={index:null,attributes:[]};for(const x in d){const _=self[p[x]];let P,T;if(f.useUniqueIDs)T=d[x],P=l.GetAttributeByUniqueId(m,T);else{if(T=l.GetAttributeId(m,c[d[x]]),T===-1)continue;P=l.GetAttribute(m,T)}const I=i(c,l,m,x,_,P);x==="color"&&(I.vertexColorSpace=f.vertexColorSpace),E.attributes.push(I)}return M===c.TRIANGULAR_MESH&&(E.index=n(c,l,m)),c.destroy(m),E}function n(c,l,h){const d=h.num_faces()*3,p=d*4,m=c._malloc(p);l.GetTrianglesUInt32Array(h,p,m);const v=new Uint32Array(c.HEAPF32.buffer,m,d).slice();return c._free(m),{array:v,itemSize:1}}function i(c,l,h,f,d,p){const m=p.num_components(),M=h.num_points()*m,E=M*d.BYTES_PER_ELEMENT,x=o(c,d),_=c._malloc(E);l.GetAttributeDataArrayForAllPoints(h,p,x,E,_);const P=new d(c.HEAPF32.buffer,_,M).slice();return c._free(_),{name:f,array:P,itemSize:m}}function o(c,l){switch(l){case Float32Array:return c.DT_FLOAT32;case Int8Array:return c.DT_INT8;case Int16Array:return c.DT_INT16;case Int32Array:return c.DT_INT32;case Uint8Array:return c.DT_UINT8;case Uint16Array:return c.DT_UINT16;case Uint32Array:return c.DT_UINT32}}}function $m(s,e){if(e===nT)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===th||e===yg){let t=s.getIndex();if(t===null){const c=[],l=s.getAttribute("position");if(l!==void 0){for(let h=0;h<l.count;h++)c.push(h);s.setIndex(c),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===th)for(let c=1;c<=n;c++)i.push(t.getX(0)),i.push(t.getX(c)),i.push(t.getX(c+1));else for(let c=0;c<n;c++)c%2===0?(i.push(t.getX(c)),i.push(t.getX(c+1)),i.push(t.getX(c+2))):(i.push(t.getX(c+2)),i.push(t.getX(c+1)),i.push(t.getX(c)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const o=s.clone();return o.setIndex(i),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class n_ extends os{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new qC(t)}),this.register(function(t){return new tL(t)}),this.register(function(t){return new nL(t)}),this.register(function(t){return new iL(t)}),this.register(function(t){return new jC(t)}),this.register(function(t){return new KC(t)}),this.register(function(t){return new ZC(t)}),this.register(function(t){return new $C(t)}),this.register(function(t){return new XC(t)}),this.register(function(t){return new JC(t)}),this.register(function(t){return new YC(t)}),this.register(function(t){return new eL(t)}),this.register(function(t){return new QC(t)}),this.register(function(t){return new VC(t)}),this.register(function(t){return new rL(t)}),this.register(function(t){return new sL(t)})}load(e,t,n,i){const o=this;let c;if(this.resourcePath!=="")c=this.resourcePath;else if(this.path!==""){const f=Qo.extractUrlBase(e);c=Qo.resolveURL(f,this.path)}else c=Qo.extractUrlBase(e);this.manager.itemStart(e);const l=function(f){i?i(f):console.error(f),o.manager.itemError(e),o.manager.itemEnd(e)},h=new Bc(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(e,function(f){try{o.parse(f,c,function(d){t(d),o.manager.itemEnd(e)},l)}catch(d){l(d)}},n,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let o;const c={},l={},h=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(h.decode(new Uint8Array(e,0,4))===i_){try{c[_t.KHR_BINARY_GLTF]=new oL(e)}catch(p){i&&i(p);return}o=JSON.parse(c[_t.KHR_BINARY_GLTF].content)}else o=JSON.parse(h.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const f=new xL(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});f.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const p=this.pluginCallbacks[d](f);p.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[p.name]=p,c[p.name]=!0}if(o.extensionsUsed)for(let d=0;d<o.extensionsUsed.length;++d){const p=o.extensionsUsed[d],m=o.extensionsRequired||[];switch(p){case _t.KHR_MATERIALS_UNLIT:c[p]=new WC;break;case _t.KHR_DRACO_MESH_COMPRESSION:c[p]=new aL(o,this.dracoLoader);break;case _t.KHR_TEXTURE_TRANSFORM:c[p]=new cL;break;case _t.KHR_MESH_QUANTIZATION:c[p]=new lL;break;default:m.indexOf(p)>=0&&l[p]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+p+'".')}}f.setExtensions(c),f.setPlugins(l),f.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,o){n.parse(e,t,i,o)})}}function GC(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const _t={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class VC{constructor(e){this.parser=e,this.name=_t.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const o=t.json,h=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e];let f;const d=new De(16777215);h.color!==void 0&&d.setRGB(h.color[0],h.color[1],h.color[2],hn);const p=h.range!==void 0?h.range:0;switch(h.type){case"directional":f=new Ch(d),f.target.position.set(0,0,-1),f.add(f.target);break;case"point":f=new Zg(d),f.distance=p;break;case"spot":f=new uC(d),f.distance=p,h.spot=h.spot||{},h.spot.innerConeAngle=h.spot.innerConeAngle!==void 0?h.spot.innerConeAngle:0,h.spot.outerConeAngle=h.spot.outerConeAngle!==void 0?h.spot.outerConeAngle:Math.PI/4,f.angle=h.spot.outerConeAngle,f.penumbra=1-h.spot.innerConeAngle/h.spot.outerConeAngle,f.target.position.set(0,0,-1),f.add(f.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+h.type)}return f.position.set(0,0,0),f.decay=2,Ar(f,h),h.intensity!==void 0&&(f.intensity=h.intensity),f.name=t.createUniqueName(h.name||"light_"+e),i=Promise.resolve(f),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,o=n.json.nodes[e],l=(o.extensions&&o.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(h){return n._getNodeRef(t.cache,l,h)})}}class WC{constructor(){this.name=_t.KHR_MATERIALS_UNLIT}getMaterialType(){return nr}extendParams(e,t,n){const i=[];e.color=new De(1,1,1),e.opacity=1;const o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){const c=o.baseColorFactor;e.color.setRGB(c[0],c[1],c[2],hn),e.opacity=c[3]}o.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",o.baseColorTexture,nn))}return Promise.all(i)}}class XC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=i.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}}class qC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],c=i.extensions[this.name];if(c.clearcoatFactor!==void 0&&(t.clearcoat=c.clearcoatFactor),c.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",c.clearcoatTexture)),c.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=c.clearcoatRoughnessFactor),c.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",c.clearcoatRoughnessTexture)),c.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",c.clearcoatNormalTexture)),c.clearcoatNormalTexture.scale!==void 0)){const l=c.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ne(l,l)}return Promise.all(o)}}class YC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],c=i.extensions[this.name];return c.iridescenceFactor!==void 0&&(t.iridescence=c.iridescenceFactor),c.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",c.iridescenceTexture)),c.iridescenceIor!==void 0&&(t.iridescenceIOR=c.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),c.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=c.iridescenceThicknessMinimum),c.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=c.iridescenceThicknessMaximum),c.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",c.iridescenceThicknessTexture)),Promise.all(o)}}class jC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[];t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1;const c=i.extensions[this.name];if(c.sheenColorFactor!==void 0){const l=c.sheenColorFactor;t.sheenColor.setRGB(l[0],l[1],l[2],hn)}return c.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=c.sheenRoughnessFactor),c.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",c.sheenColorTexture,nn)),c.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",c.sheenRoughnessTexture)),Promise.all(o)}}class KC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],c=i.extensions[this.name];return c.transmissionFactor!==void 0&&(t.transmission=c.transmissionFactor),c.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",c.transmissionTexture)),Promise.all(o)}}class ZC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],c=i.extensions[this.name];t.thickness=c.thicknessFactor!==void 0?c.thicknessFactor:0,c.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",c.thicknessTexture)),t.attenuationDistance=c.attenuationDistance||1/0;const l=c.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(l[0],l[1],l[2],hn),Promise.all(o)}}class $C{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=i.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}}class JC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],c=i.extensions[this.name];t.specularIntensity=c.specularFactor!==void 0?c.specularFactor:1,c.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",c.specularTexture));const l=c.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(l[0],l[1],l[2],hn),c.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",c.specularColorTexture,nn)),Promise.all(o)}}class QC{constructor(e){this.parser=e,this.name=_t.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],c=i.extensions[this.name];return t.bumpScale=c.bumpFactor!==void 0?c.bumpFactor:1,c.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",c.bumpTexture)),Promise.all(o)}}class eL{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:or}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const o=[],c=i.extensions[this.name];return c.anisotropyStrength!==void 0&&(t.anisotropy=c.anisotropyStrength),c.anisotropyRotation!==void 0&&(t.anisotropyRotation=c.anisotropyRotation),c.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",c.anisotropyTexture)),Promise.all(o)}}class tL{constructor(e){this.parser=e,this.name=_t.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const o=i.extensions[this.name],c=t.options.ktx2Loader;if(!c){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,c)}}class nL{constructor(e){this.parser=e,this.name=_t.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,o=i.textures[e];if(!o.extensions||!o.extensions[t])return null;const c=o.extensions[t],l=i.images[c.source];let h=n.textureLoader;if(l.uri){const f=n.options.manager.getHandler(l.uri);f!==null&&(h=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,c.source,h);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class iL{constructor(e){this.parser=e,this.name=_t.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,o=i.textures[e];if(!o.extensions||!o.extensions[t])return null;const c=o.extensions[t],l=i.images[c.source];let h=n.textureLoader;if(l.uri){const f=n.options.manager.getHandler(l.uri);f!==null&&(h=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,c.source,h);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class rL{constructor(e){this.name=_t.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],o=this.parser.getDependency("buffer",i.buffer),c=this.parser.options.meshoptDecoder;if(!c||!c.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(l){const h=i.byteOffset||0,f=i.byteLength||0,d=i.count,p=i.byteStride,m=new Uint8Array(l,h,f);return c.decodeGltfBufferAsync?c.decodeGltfBufferAsync(d,p,m,i.mode,i.filter).then(function(v){return v.buffer}):c.ready.then(function(){const v=new ArrayBuffer(d*p);return c.decodeGltfBuffer(new Uint8Array(v),d,p,m,i.mode,i.filter),v})})}else return null}}class sL{constructor(e){this.name=_t.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const f of i.primitives)if(f.mode!==ni.TRIANGLES&&f.mode!==ni.TRIANGLE_STRIP&&f.mode!==ni.TRIANGLE_FAN&&f.mode!==void 0)return null;const c=n.extensions[this.name].attributes,l=[],h={};for(const f in c)l.push(this.parser.getDependency("accessor",c[f]).then(d=>(h[f]=d,h[f])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(f=>{const d=f.pop(),p=d.isGroup?d.children:[d],m=f[0].count,v=[];for(const M of p){const E=new Je,x=new F,_=new xi,P=new F(1,1,1),T=new H1(M.geometry,M.material,m);for(let I=0;I<m;I++)h.TRANSLATION&&x.fromBufferAttribute(h.TRANSLATION,I),h.ROTATION&&_.fromBufferAttribute(h.ROTATION,I),h.SCALE&&P.fromBufferAttribute(h.SCALE,I),T.setMatrixAt(I,E.compose(x,_,P));for(const I in h)if(I==="_COLOR_0"){const k=h[I];T.instanceColor=new rh(k.array,k.itemSize,k.normalized)}else I!=="TRANSLATION"&&I!=="ROTATION"&&I!=="SCALE"&&M.geometry.setAttribute(I,h[I]);St.prototype.copy.call(T,M),this.parser.assignFinalMaterial(T),v.push(T)}return d.isGroup?(d.clear(),d.add(...v),d):v[0]}))}}const i_="glTF",Xo=12,Jm={JSON:1313821514,BIN:5130562};class oL{constructor(e){this.name=_t.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Xo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==i_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Xo,o=new DataView(e,Xo);let c=0;for(;c<i;){const l=o.getUint32(c,!0);c+=4;const h=o.getUint32(c,!0);if(c+=4,h===Jm.JSON){const f=new Uint8Array(e,Xo+c,l);this.content=n.decode(f)}else if(h===Jm.BIN){const f=Xo+c;this.body=e.slice(f,f+l)}c+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class aL{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=_t.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,o=e.extensions[this.name].bufferView,c=e.extensions[this.name].attributes,l={},h={},f={};for(const d in c){const p=ah[d]||d.toLowerCase();l[p]=c[d]}for(const d in e.attributes){const p=ah[d]||d.toLowerCase();if(c[d]!==void 0){const m=n.accessors[e.attributes[d]],v=Qs[m.componentType];f[p]=v.name,h[p]=m.normalized===!0}}return t.getDependency("bufferView",o).then(function(d){return new Promise(function(p,m){i.decodeDracoFile(d,function(v){for(const M in v.attributes){const E=v.attributes[M],x=h[M];x!==void 0&&(E.normalized=x)}p(v)},l,f,hn,m)})})}}class cL{constructor(){this.name=_t.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class lL{constructor(){this.name=_t.KHR_MESH_QUANTIZATION}}class r_ extends aa{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=e*i*3+i;for(let c=0;c!==i;c++)t[c]=n[o+c];return t}interpolate_(e,t,n,i){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=l*2,f=l*3,d=i-t,p=(n-t)/d,m=p*p,v=m*p,M=e*f,E=M-f,x=-2*v+3*m,_=v-m,P=1-x,T=_-m+p;for(let I=0;I!==l;I++){const k=c[E+I+l],O=c[E+I+h]*d,D=c[M+I+l],V=c[M+I]*d;o[I]=P*k+T*O+x*D+_*V}return o}}const uL=new xi;class hL extends r_{interpolate_(e,t,n,i){const o=super.interpolate_(e,t,n,i);return uL.fromArray(o).normalize().toArray(o),o}}const ni={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Qs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Qm={9728:En,9729:Pn,9984:_h,9985:Zo,9986:Ys,9987:Ri},eg={33071:er,33648:ta,10497:es},qu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ah={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Tr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fL={CUBICSPLINE:void 0,LINEAR:ts,STEP:io},Yu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function dL(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new uo({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Li})),s.DefaultMaterial}function jr(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ar(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function pL(s,e,t){let n=!1,i=!1,o=!1;for(let f=0,d=e.length;f<d;f++){const p=e[f];if(p.POSITION!==void 0&&(n=!0),p.NORMAL!==void 0&&(i=!0),p.COLOR_0!==void 0&&(o=!0),n&&i&&o)break}if(!n&&!i&&!o)return Promise.resolve(s);const c=[],l=[],h=[];for(let f=0,d=e.length;f<d;f++){const p=e[f];if(n){const m=p.POSITION!==void 0?t.getDependency("accessor",p.POSITION):s.attributes.position;c.push(m)}if(i){const m=p.NORMAL!==void 0?t.getDependency("accessor",p.NORMAL):s.attributes.normal;l.push(m)}if(o){const m=p.COLOR_0!==void 0?t.getDependency("accessor",p.COLOR_0):s.attributes.color;h.push(m)}}return Promise.all([Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){const d=f[0],p=f[1],m=f[2];return n&&(s.morphAttributes.position=d),i&&(s.morphAttributes.normal=p),o&&(s.morphAttributes.color=m),s.morphTargetsRelative=!0,s})}function mL(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function gL(s){let e;const t=s.extensions&&s.extensions[_t.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ju(t.attributes):e=s.indices+":"+ju(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+ju(s.targets[n]);return e}function ju(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function ch(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function _L(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const vL=new Je;class xL{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new GC,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,o=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,o=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&o<98?this.textureLoader=new aC(this.options.manager):this.textureLoader=new gC(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(c){return c._markDefs&&c._markDefs()}),Promise.all(this._invokeAll(function(c){return c.beforeRoot&&c.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(c){const l={scene:c[0][i.scene||0],scenes:c[0],animations:c[1],cameras:c[2],asset:i.asset,parser:n,userData:{}};return jr(o,l,i),Ar(l,i),Promise.all(n._invokeAll(function(h){return h.afterRoot&&h.afterRoot(l)})).then(function(){for(const h of l.scenes)h.updateMatrixWorld();e(l)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,o=t.length;i<o;i++){const c=t[i].joints;for(let l=0,h=c.length;l<h;l++)e[c[l]].isBone=!0}for(let i=0,o=e.length;i<o;i++){const c=e[i];c.mesh!==void 0&&(this._addNodeRef(this.meshCache,c.mesh),c.skin!==void 0&&(n[c.mesh].isSkinnedMesh=!0)),c.camera!==void 0&&this._addNodeRef(this.cameraCache,c.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),o=(c,l)=>{const h=this.associations.get(c);h!=null&&this.associations.set(l,h);for(const[f,d]of c.children.entries())o(d,l.children[f])};return o(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const o=e(t[i]);o&&n.push(o)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":i=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(o,c){return n.getDependency(e,c)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[_t.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(o,c){n.load(Qo.resolveURL(t.uri,i.path),o,void 0,function(){c(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const c=qu[i.type],l=Qs[i.componentType],h=i.normalized===!0,f=new l(i.count*c);return Promise.resolve(new Qt(f,c,h))}const o=[];return i.bufferView!==void 0?o.push(this.getDependency("bufferView",i.bufferView)):o.push(null),i.sparse!==void 0&&(o.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(o).then(function(c){const l=c[0],h=qu[i.type],f=Qs[i.componentType],d=f.BYTES_PER_ELEMENT,p=d*h,m=i.byteOffset||0,v=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,M=i.normalized===!0;let E,x;if(v&&v!==p){const _=Math.floor(m/v),P="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+_+":"+i.count;let T=t.cache.get(P);T||(E=new f(l,_*v,i.count*v/d),T=new Gg(E,v/d),t.cache.add(P,T)),x=new ra(T,h,m%v/d,M)}else l===null?E=new f(i.count*h):E=new f(l,m,i.count*h),x=new Qt(E,h,M);if(i.sparse!==void 0){const _=qu.SCALAR,P=Qs[i.sparse.indices.componentType],T=i.sparse.indices.byteOffset||0,I=i.sparse.values.byteOffset||0,k=new P(c[1],T,i.sparse.count*_),O=new f(c[2],I,i.sparse.count*h);l!==null&&(x=new Qt(x.array.slice(),x.itemSize,x.normalized));for(let D=0,V=k.length;D<V;D++){const C=k[D];if(x.setX(C,O[D*h]),h>=2&&x.setY(C,O[D*h+1]),h>=3&&x.setZ(C,O[D*h+2]),h>=4&&x.setW(C,O[D*h+3]),h>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return x})}loadTexture(e){const t=this.json,n=this.options,o=t.textures[e].source,c=t.images[o];let l=this.textureLoader;if(c.uri){const h=n.manager.getHandler(c.uri);h!==null&&(l=h)}return this.loadTextureImage(e,o,l)}loadTextureImage(e,t,n){const i=this,o=this.json,c=o.textures[e],l=o.images[t],h=(l.uri||l.bufferView)+":"+c.sampler;if(this.textureCache[h])return this.textureCache[h];const f=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=c.name||l.name||"",d.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(d.name=l.uri);const m=(o.samplers||{})[c.sampler]||{};return d.magFilter=Qm[m.magFilter]||Pn,d.minFilter=Qm[m.minFilter]||Ri,d.wrapS=eg[m.wrapS]||es,d.wrapT=eg[m.wrapT]||es,i.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[h]=f,f}loadImageSource(e,t){const n=this,i=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(p=>p.clone());const c=i.images[e],l=self.URL||self.webkitURL;let h=c.uri||"",f=!1;if(c.bufferView!==void 0)h=n.getDependency("bufferView",c.bufferView).then(function(p){f=!0;const m=new Blob([p],{type:c.mimeType});return h=l.createObjectURL(m),h});else if(c.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(h).then(function(p){return new Promise(function(m,v){let M=m;t.isImageBitmapLoader===!0&&(M=function(E){const x=new Zt(E);x.needsUpdate=!0,m(x)}),t.load(Qo.resolveURL(p,o.path),M,void 0,v)})}).then(function(p){return f===!0&&l.revokeObjectURL(h),p.userData.mimeType=c.mimeType||_L(c.uri),p}).catch(function(p){throw console.error("THREE.GLTFLoader: Couldn't load texture",h),p});return this.sourceCache[e]=d,d}assignTexture(e,t,n,i){const o=this;return this.getDependency("texture",n.index).then(function(c){if(!c)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(c=c.clone(),c.channel=n.texCoord),o.extensions[_t.KHR_TEXTURE_TRANSFORM]){const l=n.extensions!==void 0?n.extensions[_t.KHR_TEXTURE_TRANSFORM]:void 0;if(l){const h=o.associations.get(c);c=o.extensions[_t.KHR_TEXTURE_TRANSFORM].extendTexture(c,l),o.associations.set(c,h)}}return i!==void 0&&(c.colorSpace=i),e[t]=c,c})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,c=t.attributes.normal===void 0;if(e.isPoints){const l="PointsMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new Yg,ri.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,h.sizeAttenuation=!1,this.cache.add(l,h)),n=h}else if(e.isLine){const l="LineBasicMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new oa,ri.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,this.cache.add(l,h)),n=h}if(i||o||c){let l="ClonedMaterial:"+n.uuid+":";i&&(l+="derivative-tangents:"),o&&(l+="vertex-colors:"),c&&(l+="flat-shading:");let h=this.cache.get(l);h||(h=n.clone(),o&&(h.vertexColors=!0),c&&(h.flatShading=!0),i&&(h.normalScale&&(h.normalScale.y*=-1),h.clearcoatNormalScale&&(h.clearcoatNormalScale.y*=-1)),this.cache.add(l,h),this.associations.set(h,this.associations.get(n))),n=h}e.material=n}getMaterialType(){return uo}loadMaterial(e){const t=this,n=this.json,i=this.extensions,o=n.materials[e];let c;const l={},h=o.extensions||{},f=[];if(h[_t.KHR_MATERIALS_UNLIT]){const p=i[_t.KHR_MATERIALS_UNLIT];c=p.getMaterialType(),f.push(p.extendParams(l,o,t))}else{const p=o.pbrMetallicRoughness||{};if(l.color=new De(1,1,1),l.opacity=1,Array.isArray(p.baseColorFactor)){const m=p.baseColorFactor;l.color.setRGB(m[0],m[1],m[2],hn),l.opacity=m[3]}p.baseColorTexture!==void 0&&f.push(t.assignTexture(l,"map",p.baseColorTexture,nn)),l.metalness=p.metallicFactor!==void 0?p.metallicFactor:1,l.roughness=p.roughnessFactor!==void 0?p.roughnessFactor:1,p.metallicRoughnessTexture!==void 0&&(f.push(t.assignTexture(l,"metalnessMap",p.metallicRoughnessTexture)),f.push(t.assignTexture(l,"roughnessMap",p.metallicRoughnessTexture))),c=this._invokeOne(function(m){return m.getMaterialType&&m.getMaterialType(e)}),f.push(Promise.all(this._invokeAll(function(m){return m.extendMaterialParams&&m.extendMaterialParams(e,l)})))}o.doubleSided===!0&&(l.side=pi);const d=o.alphaMode||Yu.OPAQUE;if(d===Yu.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,d===Yu.MASK&&(l.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&c!==nr&&(f.push(t.assignTexture(l,"normalMap",o.normalTexture)),l.normalScale=new Ne(1,1),o.normalTexture.scale!==void 0)){const p=o.normalTexture.scale;l.normalScale.set(p,p)}if(o.occlusionTexture!==void 0&&c!==nr&&(f.push(t.assignTexture(l,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&c!==nr){const p=o.emissiveFactor;l.emissive=new De().setRGB(p[0],p[1],p[2],hn)}return o.emissiveTexture!==void 0&&c!==nr&&f.push(t.assignTexture(l,"emissiveMap",o.emissiveTexture,nn)),Promise.all(f).then(function(){const p=new c(l);return o.name&&(p.name=o.name),Ar(p,o),t.associations.set(p,{materials:e}),o.extensions&&jr(i,p,o),p})}createUniqueName(e){const t=Rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function o(l){return n[_t.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,t).then(function(h){return tg(h,l,t)})}const c=[];for(let l=0,h=e.length;l<h;l++){const f=e[l],d=gL(f),p=i[d];if(p)c.push(p.promise);else{let m;f.extensions&&f.extensions[_t.KHR_DRACO_MESH_COMPRESSION]?m=o(f):m=tg(new on,f,t),i[d]={primitive:f,promise:m},c.push(m)}}return Promise.all(c)}loadMesh(e){const t=this,n=this.json,i=this.extensions,o=n.meshes[e],c=o.primitives,l=[];for(let h=0,f=c.length;h<f;h++){const d=c[h].material===void 0?dL(this.cache):this.getDependency("material",c[h].material);l.push(d)}return l.push(t.loadGeometries(c)),Promise.all(l).then(function(h){const f=h.slice(0,h.length-1),d=h[h.length-1],p=[];for(let v=0,M=d.length;v<M;v++){const E=d[v],x=c[v];let _;const P=f[v];if(x.mode===ni.TRIANGLES||x.mode===ni.TRIANGLE_STRIP||x.mode===ni.TRIANGLE_FAN||x.mode===void 0)_=o.isSkinnedMesh===!0?new B1(E,P):new un(E,P),_.isSkinnedMesh===!0&&_.normalizeSkinWeights(),x.mode===ni.TRIANGLE_STRIP?_.geometry=$m(_.geometry,yg):x.mode===ni.TRIANGLE_FAN&&(_.geometry=$m(_.geometry,th));else if(x.mode===ni.LINES)_=new bh(E,P);else if(x.mode===ni.LINE_STRIP)_=new Yc(E,P);else if(x.mode===ni.LINE_LOOP)_=new G1(E,P);else if(x.mode===ni.POINTS)_=new V1(E,P);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+x.mode);Object.keys(_.geometry.morphAttributes).length>0&&mL(_,o),_.name=t.createUniqueName(o.name||"mesh_"+e),Ar(_,o),x.extensions&&jr(i,_,x),t.assignFinalMaterial(_),p.push(_)}for(let v=0,M=p.length;v<M;v++)t.associations.set(p[v],{meshes:e,primitives:v});if(p.length===1)return o.extensions&&jr(i,p[0],o),p[0];const m=new wr;o.extensions&&jr(i,m,o),t.associations.set(m,{meshes:e});for(let v=0,M=p.length;v<M;v++)m.add(p[v]);return m})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Mn(vi.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Xc(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ar(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,o=t.joints.length;i<o;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const o=i.pop(),c=i,l=[],h=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];if(p){l.push(p);const m=new Je;o!==null&&m.fromArray(o.array,f*16),h.push(m)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[f])}return new Th(l,h)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],o=i.name?i.name:"animation_"+e,c=[],l=[],h=[],f=[],d=[];for(let p=0,m=i.channels.length;p<m;p++){const v=i.channels[p],M=i.samplers[v.sampler],E=v.target,x=E.node,_=i.parameters!==void 0?i.parameters[M.input]:M.input,P=i.parameters!==void 0?i.parameters[M.output]:M.output;E.node!==void 0&&(c.push(this.getDependency("node",x)),l.push(this.getDependency("accessor",_)),h.push(this.getDependency("accessor",P)),f.push(M),d.push(E))}return Promise.all([Promise.all(c),Promise.all(l),Promise.all(h),Promise.all(f),Promise.all(d)]).then(function(p){const m=p[0],v=p[1],M=p[2],E=p[3],x=p[4],_=[];for(let P=0,T=m.length;P<T;P++){const I=m[P],k=v[P],O=M[P],D=E[P],V=x[P];if(I===void 0)continue;I.updateMatrix&&I.updateMatrix();const C=n._createAnimationTracks(I,k,O,D,V);if(C)for(let w=0;w<C.length;w++)_.push(C[w])}return new eC(o,void 0,_)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(o){const c=n._getNodeRef(n.meshCache,i.mesh,o);return i.weights!==void 0&&c.traverse(function(l){if(l.isMesh)for(let h=0,f=i.weights.length;h<f;h++)l.morphTargetInfluences[h]=i.weights[h]}),c})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],o=n._loadNodeShallow(e),c=[],l=i.children||[];for(let f=0,d=l.length;f<d;f++)c.push(n.getDependency("node",l[f]));const h=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([o,Promise.all(c),h]).then(function(f){const d=f[0],p=f[1],m=f[2];m!==null&&d.traverse(function(v){v.isSkinnedMesh&&v.bind(m,vL)});for(let v=0,M=p.length;v<M;v++)d.add(p[v]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const o=t.nodes[e],c=o.name?i.createUniqueName(o.name):"",l=[],h=i._invokeOne(function(f){return f.createNodeMesh&&f.createNodeMesh(e)});return h&&l.push(h),o.camera!==void 0&&l.push(i.getDependency("camera",o.camera).then(function(f){return i._getNodeRef(i.cameraCache,o.camera,f)})),i._invokeAll(function(f){return f.createNodeAttachment&&f.createNodeAttachment(e)}).forEach(function(f){l.push(f)}),this.nodeCache[e]=Promise.all(l).then(function(f){let d;if(o.isBone===!0?d=new Xg:f.length>1?d=new wr:f.length===1?d=f[0]:d=new St,d!==f[0])for(let p=0,m=f.length;p<m;p++)d.add(f[p]);if(o.name&&(d.userData.name=o.name,d.name=c),Ar(d,o),o.extensions&&jr(n,d,o),o.matrix!==void 0){const p=new Je;p.fromArray(o.matrix),d.applyMatrix4(p)}else o.translation!==void 0&&d.position.fromArray(o.translation),o.rotation!==void 0&&d.quaternion.fromArray(o.rotation),o.scale!==void 0&&d.scale.fromArray(o.scale);return i.associations.has(d)||i.associations.set(d,{}),i.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,o=new wr;n.name&&(o.name=i.createUniqueName(n.name)),Ar(o,n),n.extensions&&jr(t,o,n);const c=n.nodes||[],l=[];for(let h=0,f=c.length;h<f;h++)l.push(i.getDependency("node",c[h]));return Promise.all(l).then(function(h){for(let d=0,p=h.length;d<p;d++)o.add(h[d]);const f=d=>{const p=new Map;for(const[m,v]of i.associations)(m instanceof ri||m instanceof Zt)&&p.set(m,v);return d.traverse(m=>{const v=i.associations.get(m);v!=null&&p.set(m,v)}),p};return i.associations=f(o),o})}_createAnimationTracks(e,t,n,i,o){const c=[],l=e.name?e.name:e.uuid,h=[];Tr[o.path]===Tr.weights?e.traverse(function(m){m.morphTargetInfluences&&h.push(m.name?m.name:m.uuid)}):h.push(l);let f;switch(Tr[o.path]){case Tr.weights:f=oo;break;case Tr.rotation:f=is;break;case Tr.position:case Tr.scale:f=ao;break;default:switch(n.itemSize){case 1:f=oo;break;case 2:case 3:default:f=ao;break}break}const d=i.interpolation!==void 0?fL[i.interpolation]:ts,p=this._getArrayFromAccessor(n);for(let m=0,v=h.length;m<v;m++){const M=new f(h[m]+"."+Tr[o.path],t.array,p,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(M),c.push(M)}return c}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ch(t.constructor),i=new Float32Array(t.length);for(let o=0,c=t.length;o<c;o++)i[o]=t[o]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof is?hL:r_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function yL(s,e,t){const n=e.attributes,i=new yi;if(n.POSITION!==void 0){const l=t.json.accessors[n.POSITION],h=l.min,f=l.max;if(h!==void 0&&f!==void 0){if(i.set(new F(h[0],h[1],h[2]),new F(f[0],f[1],f[2])),l.normalized){const d=ch(Qs[l.componentType]);i.min.multiplyScalar(d),i.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const o=e.targets;if(o!==void 0){const l=new F,h=new F;for(let f=0,d=o.length;f<d;f++){const p=o[f];if(p.POSITION!==void 0){const m=t.json.accessors[p.POSITION],v=m.min,M=m.max;if(v!==void 0&&M!==void 0){if(h.setX(Math.max(Math.abs(v[0]),Math.abs(M[0]))),h.setY(Math.max(Math.abs(v[1]),Math.abs(M[1]))),h.setZ(Math.max(Math.abs(v[2]),Math.abs(M[2]))),m.normalized){const E=ch(Qs[m.componentType]);h.multiplyScalar(E)}l.max(h)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(l)}s.boundingBox=i;const c=new Ui;i.getCenter(c.center),c.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=c}function tg(s,e,t){const n=e.attributes,i=[];function o(c,l){return t.getDependency("accessor",c).then(function(h){s.setAttribute(l,h)})}for(const c in n){const l=ah[c]||c.toLowerCase();l in s.attributes||i.push(o(n[c],l))}if(e.indices!==void 0&&!s.index){const c=t.getDependency("accessor",e.indices).then(function(l){s.setIndex(l)});i.push(c)}return Ct.workingColorSpace!==hn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ct.workingColorSpace}" not supported.`),Ar(s,e),yL(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?pL(s,e.targets,t):s})}class SL{constructor(){this.progress=new Map,this.gltfloader=new n_,this.dracoloader=new zC,this.dracoloader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/"),this.gltfloader.setDRACOLoader(this.dracoloader)}async LoadGLTF(e){const t=n=>{this.progress.set(e,n.loaded/n.total)};return this.progress.set(e,0),new Promise((n,i)=>{this.gltfloader.loadAsync(e,t).then(n).catch(i)})}PollProgress(){let e=0;return this.progress.forEach(t=>{e+=t}),this.progress.size===0?1:e/this.progress.size}}class ML extends Nh{constructor(){super(),this.isDIVEPrimitive=!0,this._mesh=new un,this._mesh.layers.mask=si,this._mesh.castShadow=!0,this._mesh.receiveShadow=!0,this._mesh.material=new uo,this.add(this._mesh)}SetGeometry(e){const t=this.assembleGeometry(e);t&&(this._mesh.geometry=t,this._boundingBox.setFromObject(this._mesh))}SetMaterial(e){const t=this._mesh.material;e.vertexColors!==void 0&&(t.vertexColors=e.vertexColors),e.color!==void 0&&(t.color=new De(e.color)),e.map!==void 0&&(t.map=e.map),e.normalMap!==void 0&&(t.normalMap=e.normalMap),e.roughness!==void 0&&(t.roughness=e.roughness),e.roughnessMap!==void 0&&(t.roughnessMap=e.roughnessMap,t.roughnessMap&&(t.roughness=1)),e.metalness!==void 0&&(t.metalness=e.metalness),e.metalnessMap!==void 0&&(t.metalnessMap=e.metalnessMap,t.metalnessMap&&(t.metalness=0)),this._mesh&&(this._mesh.material=t)}PlaceOnFloor(){var i,o,c,l,h;const e=this.getWorldPosition(this._positionWorldBuffer),t=e.clone();(o=(i=this._mesh)==null?void 0:i.geometry)==null||o.computeBoundingBox();const n=(l=(c=this._mesh)==null?void 0:c.geometry)==null?void 0:l.boundingBox;!n||!this._mesh||(e.y=e.y-this._mesh.localToWorld(n.min.clone()).y,e.y!==t.y&&((h=On.get(this.userData.id))==null||h.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale})))}DropIt(){if(!this.parent){console.warn("DIVEPrimitive: DropIt() called on a model that is not in the scene.",this);return}const e=this._boundingBox.min.y*this.scale.y,t=this.localToWorld(this._boundingBox.getCenter(new F).multiply(this.scale));t.y=e+this.position.y;const n=new Dh(t,new F(0,-1,0));n.layers.mask=si;const i=n.intersectObjects(Uh(this).Root.children,!0);if(i.length>0){const o=i[0].object;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox,l=o.localToWorld(c.max.clone()),h=this.position.clone(),f=this.position.clone().setY(l.y).sub(new F(0,e,0));if(this.position.copy(f),this.position.y===h.y)return;this.onMove()}}assembleGeometry(e){switch(this._mesh.material.flatShading=!1,e.name.toLowerCase()){case"cylinder":return this.createCylinderGeometry(e);case"sphere":return this.createSphereGeometry(e);case"pyramid":return this._mesh.material.flatShading=!0,this.createPyramidGeometry(e);case"cube":case"box":return this.createBoxGeometry(e);case"cone":return this.createConeGeometry(e);case"wall":return this.createWallGeometry(e);case"plane":return this.createPlaneGeometry(e);default:return console.warn("DIVEPrimitive.assembleGeometry: Invalid geometry type:",e.name.toLowerCase()),null}}createCylinderGeometry(e){const t=new jc(e.width/2,e.width/2,e.height,64);return t.translate(0,e.height/2,0),t}createSphereGeometry(e){return new Kc(e.width/2,256,256)}createPyramidGeometry(e){const t=new Float32Array([-e.width/2,0,-e.depth/2,e.width/2,0,-e.depth/2,e.width/2,0,e.depth/2,-e.width/2,0,e.depth/2,0,e.height,0]),n=new Uint16Array([0,1,2,0,2,3,0,4,1,1,4,2,2,4,3,3,4,0]),i=new on;return i.setAttribute("position",new Qt(t,3)),i.setIndex(new Qt(n,1)),i.computeVertexNormals(),i.computeBoundingBox(),i.computeBoundingSphere(),i}createBoxGeometry(e){const t=new Pr(e.width,e.height,e.depth);return t.translate(0,e.height/2,0),t}createConeGeometry(e){const t=new Ah(e.width/2,e.height,256);return t.translate(0,e.height/2,0),t}createWallGeometry(e){const t=new Pr(e.width,e.height,e.depth||.05,16);return t.translate(0,e.height/2,0),t}createPlaneGeometry(e){const t=new Pr(e.width,e.height,e.depth);return t.translate(0,e.height/2,0),t}}class EL extends Nh{constructor(){super(),this.isDIVEGroup=!0,this.name="DIVEGroup",this._members=[],this._lines=[]}get members(){return this._members}SetPosition(e){super.SetPosition(e),this._members.forEach(t=>{"isDIVENode"in t&&t.onMove()})}SetLinesVisibility(e,t){if(!t){this._lines.forEach(i=>{i.visible=e});return}const n=this._members.indexOf(t);n!==-1&&(this._lines[n].visible=e)}attach(e){if(this._members.includes(e))return this;const t=this.createLine();return this.add(t),this._lines.push(t),super.attach(e),this._members.push(e),this.updateLineTo(t,e),this.SetLinesVisibility(!0,e),this}remove(e){const t=this._members.indexOf(e);if(t===-1)return this;const n=this._lines[t];return super.remove(n),this._lines.splice(t,1),super.remove(e),this._members.splice(t,1),this}UpdateLineTo(e){const t=this._members.indexOf(e);t!==-1&&this.updateLineTo(this._lines[t],e)}createLine(){const e=new on,t=new Y1({color:6710886,dashSize:.05,gapSize:.025}),n=new Yc(e,t);return n.visible=!1,n}updateLineTo(e,t){e.geometry.setFromPoints([new F(0,0,0),t.position.clone()]),e.computeLineDistances()}}class Oh extends St{constructor(){super(),this.isDIVERoot=!0,this.name="Root",this.loadingManager=new SL}ComputeSceneBB(){const e=new yi;return this.traverse(t=>{"isObject3D"in t&&e.expandByObject(t)}),e}GetSceneObject(e){let t;return this.traverse(n=>{t||n.userData.id===e.id&&(t=n)}),t}AddSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.updateLight(e);break}case"model":{this.updateModel(e);break}case"primitive":{this.updatePrimitive(e);break}case"group":{this.updateGroup(e);break}default:console.warn(`DIVERoot.AddSceneObject: Unknown entity type: ${e.entityType}`)}}UpdateSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.updateLight(e);break}case"model":{this.updateModel(e);break}case"primitive":{this.updatePrimitive(e);break}case"group":{this.updateGroup(e);break}default:console.warn(`DIVERoot.UpdateSceneObject: Unknown entity type: ${e.entityType}`)}}DeleteSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.deleteLight(e);break}case"model":{this.deleteModel(e);break}case"primitive":{this.deletePrimitive(e);break}case"group":{this.deleteGroup(e);break}default:console.warn(`DIVERoot.DeleteSceneObject: Unknown entity type: ${e.entityType}`)}}PlaceOnFloor(e){switch(e.entityType){case"pov":case"light":break;case"model":case"primitive":{this.placeOnFloor(e);break}default:console.warn(`DIVERoot.PlaceOnFloor: Unknown entity type: ${e.entityType}`)}}updateLight(e){let t=this.GetSceneObject(e);if(!t){switch(e.type){case"scene":{t=new BC;break}case"ambient":{t=new CC;break}case"point":{t=new FC;break}default:{console.warn(`DIVERoot.updateLight: Unknown light type: ${e.type}`);return}}t.userData.id=e.id,this.add(t)}e.name!==void 0&&e.name!==null&&(t.name=e.name),e.position!==void 0&&e.position!==null&&t.position.set(e.position.x,e.position.y,e.position.z),e.intensity!==void 0&&e.intensity!==null&&t.SetIntensity(e.intensity),e.enabled!==void 0&&e.enabled!==null&&t.SetEnabled(e.enabled),e.color!==void 0&&e.color!==null&&t.SetColor(new De(e.color)),e.visible!==void 0&&e.visible!==null&&(t.visible=e.visible),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updateModel(e){let t=this.GetSceneObject(e);t||(t=new kC,t.userData.id=e.id,t.userData.uri=e.uri,this.add(t)),e.uri!==void 0&&this.loadingManager.LoadGLTF(e.uri).then(n=>{var i;t.SetModel(n),(i=On.get(e.id))==null||i.PerformAction("MODEL_LOADED",{id:e.id})}),e.name!==void 0&&(t.name=e.name),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.material!==void 0&&t.SetMaterial(e.material),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updatePrimitive(e){let t=this.GetSceneObject(e);t||(t=new ML,t.userData.id=e.id,this.add(t)),e.name!==void 0&&(t.name=e.name),e.geometry!==void 0&&t.SetGeometry(e.geometry),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.material!==void 0&&t.SetMaterial(e.material),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updateGroup(e){let t=this.GetSceneObject(e);t||(t=new EL,t.userData.id=e.id,this.add(t)),e.name!==void 0&&(t.name=e.name),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.bbVisible!==void 0&&t.SetLinesVisibility(e.bbVisible),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}deleteLight(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteLight: Light with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deleteModel(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteModel: Model with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deletePrimitive(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deletePrimitive: Primitive with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deleteGroup(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteGroup: Group with id ${e.id} not found`);return}this.detachTransformControls(t);for(let n=t.members.length-1;n>=0;n--)this.attach(t.members[n]);t.parent.remove(t)}placeOnFloor(e){const t=this.GetSceneObject(e);t&&t.PlaceOnFloor()}setParent(e){const t=this.GetSceneObject(e);if(t)if(e.parentId!==null){const n=this.GetSceneObject({id:e.parentId});if(!n)return;n.attach(t)}else this.attach(t)}detachTransformControls(e){this.findScene(e).children.find(t=>{"isTransformControls"in t&&t.detach()})}findScene(e){return e.parent!==null?this.findScene(e.parent):e}}const TL="#888888",bL="#dddddd";class AL extends St{constructor(){super(),this.name="Grid";const e=new AC(100,100,TL,bL);e.material.depthTest=!1,e.layers.mask=Jg,this.add(e)}SetVisibility(e){this.visible=e}}class wL extends un{constructor(){super(new ss(1e4,1e4),new uo({color:new De(150/255,150/255,150/255)})),this.isFloor=!0,this.name="Floor",this.layers.mask=si,this.receiveShadow=!0,this.rotateX(-Math.PI/2)}SetVisibility(e){this.visible=e}SetColor(e){this.material.color=new De(e)}}class RL{constructor(e,t,n,i,o){this.xrLight=e,this.renderer=t,this.lightProbe=n,this.xrWebGLBinding=null,this.estimationStartCallback=o,this.frameCallback=this.onXRFrame.bind(this);const c=t.xr.getSession();if(i&&"XRWebGLBinding"in window){const l=new Ig(16);e.environment=l.texture;const h=t.getContext();switch(c.preferredReflectionFormat){case"srgba8":h.getExtension("EXT_sRGB");break;case"rgba16f":h.getExtension("OES_texture_half_float");break}this.xrWebGLBinding=new XRWebGLBinding(c,h),this.lightProbe.addEventListener("reflectionchange",()=>{this.updateReflection()})}c.requestAnimationFrame(this.frameCallback)}updateReflection(){const e=this.renderer.properties.get(this.xrLight.environment);if(e){const t=this.xrWebGLBinding.getReflectionCubeMap(this.lightProbe);t&&(e.__webglTexture=t,this.xrLight.environment.needsPMREMUpdate=!0)}}onXRFrame(e,t){if(!this.xrLight)return;t.session.requestAnimationFrame(this.frameCallback);const i=t.getLightEstimate(this.lightProbe);if(i){this.xrLight.lightProbe.sh.fromArray(i.sphericalHarmonicsCoefficients),this.xrLight.lightProbe.intensity=1;const o=Math.max(1,Math.max(i.primaryLightIntensity.x,Math.max(i.primaryLightIntensity.y,i.primaryLightIntensity.z)));this.xrLight.directionalLight.color.setRGB(i.primaryLightIntensity.x/o,i.primaryLightIntensity.y/o,i.primaryLightIntensity.z/o),this.xrLight.directionalLight.intensity=o,this.xrLight.directionalLight.position.copy(i.primaryLightDirection),this.estimationStartCallback&&(this.estimationStartCallback(),this.estimationStartCallback=null)}}dispose(){this.xrLight=null,this.renderer=null,this.lightProbe=null,this.xrWebGLBinding=null}}class CL extends wr{constructor(e,t=!0){super(),this.lightProbe=new mC,this.lightProbe.intensity=0,this.add(this.lightProbe),this.directionalLight=new Ch,this.directionalLight.intensity=0,this.add(this.directionalLight),this.environment=null;let n=null,i=!1;e.xr.addEventListener("sessionstart",()=>{const o=e.xr.getSession();"requestLightProbe"in o&&o.requestLightProbe({reflectionFormat:o.preferredReflectionFormat}).then(c=>{n=new RL(this,e,c,t,()=>{i=!0,this.dispatchEvent({type:"estimationstart"})})})}),e.xr.addEventListener("sessionend",()=>{n&&(n.dispose(),n=null),i&&this.dispatchEvent({type:"estimationend"})}),this.dispose=()=>{n&&(n.dispose(),n=null),this.remove(this.lightProbe),this.lightProbe=null,this.remove(this.directionalLight),this.directionalLight=null,this.environment=null}}}class LL extends St{constructor(e){super(),this.name="XRLightRoot",this._scene=e,this._xrLight=null,this._lightRoot=new Oh,this._lightRoot.UpdateSceneObject({id:"XRSceneLight",entityType:"light",name:"XRSceneLight",type:"scene",color:16777215,intensity:1,enabled:!0,visible:!0}),this.add(this._lightRoot)}InitLightEstimation(e){this._xrLight||(this._xrLight=new CL(e,!0),this._xrLight.layers.mask=si,this.add(this._xrLight)),this._xrLight.addEventListener("estimationstart",()=>{this.onEstimationStart()}),this._xrLight.addEventListener("estimationend",()=>{this.onEstimationEnd()})}DisposeLightEstimation(){this._xrLight&&(this._xrLight.removeEventListener("estimationstart",()=>{this.onEstimationStart()}),this._xrLight.removeEventListener("estimationend",()=>{this.onEstimationEnd()}))}onEstimationStart(){this._lightRoot.visible=!1,this._xrLight&&this._xrLight.environment&&(this._scene.environment=this._xrLight.environment)}onEstimationEnd(){this._lightRoot.visible=!0,this._scene.environment=null,this._xrLight}}class PL extends St{get XRModelRoot(){return this._xrModelRoot}get XRLightRoot(){return this._xrLightRoot}get XRHandNode(){return this._xrHandNode}constructor(e){super(),this.name="XRRoot",this._xrModelRoot=new Oh,this._xrModelRoot.name="XRModelRoot",this.add(this._xrModelRoot),this._xrShadowPlane=new un(new ss(100,100),new q1({opacity:1,transparent:!0})),this._xrModelRoot.add(this._xrShadowPlane),this._xrLightRoot=new LL(e),this._xrLightRoot.name="XRLightRoot",this.add(this._xrLightRoot),this._xrHandNode=new St,this._xrHandNode.name="XRHandNode",this.add(this._xrHandNode)}InitLightEstimation(e){this._xrLightRoot.InitLightEstimation(e)}DisposeLightEstimation(){this._xrLightRoot.DisposeLightEstimation()}}class IL extends Hg{get Root(){return this._root}get XRRoot(){return this._xrRoot}get Floor(){return this._floor}get Grid(){return this._grid}constructor(){super(),this.background=new De(16777215),this._root=new Oh,this.add(this._root),this._floor=new wL,this.add(this._floor),this._grid=new AL,this.add(this._grid),this._xrRoot=new PL(this),this._xrRoot.visible=!1,this.add(this._xrRoot)}InitXR(e){this._root.visible=!1,this._xrRoot.visible=!0,this._xrRoot.InitLightEstimation(e)}DisposeXR(){this._root.visible=!0,this._xrRoot.visible=!1,this._xrRoot.DisposeLightEstimation()}SetBackground(e){this.background=new De(e)}ComputeSceneBB(){return this.Root.ComputeSceneBB()}GetSceneObject(e){return this.Root.GetSceneObject(e)}AddSceneObject(e){this.Root.AddSceneObject(e)}UpdateSceneObject(e){this.Root.UpdateSceneObject(e)}DeleteSceneObject(e){this.Root.DeleteSceneObject(e)}PlaceOnFloor(e){this.Root.PlaceOnFloor(e)}}const jo={fov:70,near:.1,far:1e3},Qr=class Qr extends Mn{constructor(e=jo){super(e.fov||jo.fov,1,e.near||jo.near,e.far||jo.far),this.onSetCameraLayer=()=>{},this.layers.mask=Qr.EDITOR_VIEW_LAYER_MASK}OnResize(e,t){this.aspect=e/t,this.updateProjectionMatrix()}SetCameraLayer(e){this.layers.mask=e==="LIVE"?Qr.LIVE_VIEW_LAYER_MASK:Qr.EDITOR_VIEW_LAYER_MASK,this.onSetCameraLayer(this.layers.mask)}};Qr.EDITOR_VIEW_LAYER_MASK=RC|$g|Jg|si,Qr.LIVE_VIEW_LAYER_MASK=si;let kc=Qr;const ng={type:"change"},Ku={type:"start"},ig={type:"end"},Rc=new co,rg=new br,DL=Math.cos(70*vi.DEG2RAD);class UL extends rs{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ms.ROTATE,MIDDLE:Ms.DOLLY,RIGHT:Ms.PAN},this.touches={ONE:Es.ROTATE,TWO:Es.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return l.phi},this.getAzimuthalAngle=function(){return l.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(y){y.addEventListener("keydown",Me),this._domElementKeyEvents=y},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Me),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ng),n.update(),o=i.NONE},this.update=function(){const y=new F,Y=new xi().setFromUnitVectors(e.up,new F(0,1,0)),re=Y.clone().invert(),ve=new F,be=new xi,pt=new F,ut=2*Math.PI;return function($t=null){const bt=n.object.position;y.copy(bt).sub(n.target),y.applyQuaternion(Y),l.setFromVector3(y),n.autoRotate&&o===i.NONE&&J(w($t)),n.enableDamping?(l.theta+=h.theta*n.dampingFactor,l.phi+=h.phi*n.dampingFactor):(l.theta+=h.theta,l.phi+=h.phi);let Vt=n.minAzimuthAngle,Wt=n.maxAzimuthAngle;isFinite(Vt)&&isFinite(Wt)&&(Vt<-Math.PI?Vt+=ut:Vt>Math.PI&&(Vt-=ut),Wt<-Math.PI?Wt+=ut:Wt>Math.PI&&(Wt-=ut),Vt<=Wt?l.theta=Math.max(Vt,Math.min(Wt,l.theta)):l.theta=l.theta>(Vt+Wt)/2?Math.max(Vt,l.theta):Math.min(Wt,l.theta)),l.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,l.phi)),l.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Tn=!1;if(n.zoomToCursor&&O||n.object.isOrthographicCamera)l.radius=de(l.radius);else{const mn=l.radius;l.radius=de(l.radius*f),Tn=mn!=l.radius}if(y.setFromSpherical(l),y.applyQuaternion(re),bt.copy(n.target).add(y),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),d.set(0,0,0)),n.zoomToCursor&&O){let mn=null;if(n.object.isPerspectiveCamera){const Si=y.length();mn=de(Si*f);const Mi=Si-mn;n.object.position.addScaledVector(I,Mi),n.object.updateMatrixWorld(),Tn=!!Mi}else if(n.object.isOrthographicCamera){const Si=new F(k.x,k.y,0);Si.unproject(n.object);const Mi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),n.object.updateProjectionMatrix(),Tn=Mi!==n.object.zoom;const Oi=new F(k.x,k.y,0);Oi.unproject(n.object),n.object.position.sub(Oi).add(Si),n.object.updateMatrixWorld(),mn=y.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;mn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(mn).add(n.object.position):(Rc.origin.copy(n.object.position),Rc.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Rc.direction))<DL?e.lookAt(n.target):(rg.setFromNormalAndCoplanarPoint(n.object.up,n.target),Rc.intersectPlane(rg,n.target))))}else if(n.object.isOrthographicCamera){const mn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),mn!==n.object.zoom&&(n.object.updateProjectionMatrix(),Tn=!0)}return f=1,O=!1,Tn||ve.distanceToSquared(n.object.position)>c||8*(1-be.dot(n.object.quaternion))>c||pt.distanceToSquared(n.target)>c?(n.dispatchEvent(ng),ve.copy(n.object.position),be.copy(n.object.quaternion),pt.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Le),n.domElement.removeEventListener("pointerdown",ee),n.domElement.removeEventListener("pointercancel",le),n.domElement.removeEventListener("wheel",pe),n.domElement.removeEventListener("pointermove",se),n.domElement.removeEventListener("pointerup",le),n.domElement.getRootNode().removeEventListener("keydown",ze,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Me),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=i.NONE;const c=1e-6,l=new Ym,h=new Ym;let f=1;const d=new F,p=new Ne,m=new Ne,v=new Ne,M=new Ne,E=new Ne,x=new Ne,_=new Ne,P=new Ne,T=new Ne,I=new F,k=new Ne;let O=!1;const D=[],V={};let C=!1;function w(y){return y!==null?2*Math.PI/60*n.autoRotateSpeed*y:2*Math.PI/60/60*n.autoRotateSpeed}function X(y){const Y=Math.abs(y*.01);return Math.pow(.95,n.zoomSpeed*Y)}function J(y){h.theta-=y}function z(y){h.phi-=y}const te=function(){const y=new F;return function(re,ve){y.setFromMatrixColumn(ve,0),y.multiplyScalar(-re),d.add(y)}}(),ce=function(){const y=new F;return function(re,ve){n.screenSpacePanning===!0?y.setFromMatrixColumn(ve,1):(y.setFromMatrixColumn(ve,0),y.crossVectors(n.object.up,y)),y.multiplyScalar(re),d.add(y)}}(),ue=function(){const y=new F;return function(re,ve){const be=n.domElement;if(n.object.isPerspectiveCamera){const pt=n.object.position;y.copy(pt).sub(n.target);let ut=y.length();ut*=Math.tan(n.object.fov/2*Math.PI/180),te(2*re*ut/be.clientHeight,n.object.matrix),ce(2*ve*ut/be.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(te(re*(n.object.right-n.object.left)/n.object.zoom/be.clientWidth,n.object.matrix),ce(ve*(n.object.top-n.object.bottom)/n.object.zoom/be.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function xe(y){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?f/=y:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Q(y){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?f*=y:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ge(y,Y){if(!n.zoomToCursor)return;O=!0;const re=n.domElement.getBoundingClientRect(),ve=y-re.left,be=Y-re.top,pt=re.width,ut=re.height;k.x=ve/pt*2-1,k.y=-(be/ut)*2+1,I.set(k.x,k.y,1).unproject(n.object).sub(n.object.position).normalize()}function de(y){return Math.max(n.minDistance,Math.min(n.maxDistance,y))}function Ae(y){p.set(y.clientX,y.clientY)}function ct(y){ge(y.clientX,y.clientX),_.set(y.clientX,y.clientY)}function Tt(y){M.set(y.clientX,y.clientY)}function ie(y){m.set(y.clientX,y.clientY),v.subVectors(m,p).multiplyScalar(n.rotateSpeed);const Y=n.domElement;J(2*Math.PI*v.x/Y.clientHeight),z(2*Math.PI*v.y/Y.clientHeight),p.copy(m),n.update()}function me(y){P.set(y.clientX,y.clientY),T.subVectors(P,_),T.y>0?xe(X(T.y)):T.y<0&&Q(X(T.y)),_.copy(P),n.update()}function Re(y){E.set(y.clientX,y.clientY),x.subVectors(E,M).multiplyScalar(n.panSpeed),ue(x.x,x.y),M.copy(E),n.update()}function Te(y){ge(y.clientX,y.clientY),y.deltaY<0?Q(X(y.deltaY)):y.deltaY>0&&xe(X(y.deltaY)),n.update()}function qe(y){let Y=!1;switch(y.code){case n.keys.UP:y.ctrlKey||y.metaKey||y.shiftKey?z(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ue(0,n.keyPanSpeed),Y=!0;break;case n.keys.BOTTOM:y.ctrlKey||y.metaKey||y.shiftKey?z(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ue(0,-n.keyPanSpeed),Y=!0;break;case n.keys.LEFT:y.ctrlKey||y.metaKey||y.shiftKey?J(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ue(n.keyPanSpeed,0),Y=!0;break;case n.keys.RIGHT:y.ctrlKey||y.metaKey||y.shiftKey?J(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ue(-n.keyPanSpeed,0),Y=!0;break}Y&&(y.preventDefault(),n.update())}function Ye(y){if(D.length===1)p.set(y.pageX,y.pageY);else{const Y=xt(y),re=.5*(y.pageX+Y.x),ve=.5*(y.pageY+Y.y);p.set(re,ve)}}function ft(y){if(D.length===1)M.set(y.pageX,y.pageY);else{const Y=xt(y),re=.5*(y.pageX+Y.x),ve=.5*(y.pageY+Y.y);M.set(re,ve)}}function q(y){const Y=xt(y),re=y.pageX-Y.x,ve=y.pageY-Y.y,be=Math.sqrt(re*re+ve*ve);_.set(0,be)}function Qe(y){n.enableZoom&&q(y),n.enablePan&&ft(y)}function Ge(y){n.enableZoom&&q(y),n.enableRotate&&Ye(y)}function Mt(y){if(D.length==1)m.set(y.pageX,y.pageY);else{const re=xt(y),ve=.5*(y.pageX+re.x),be=.5*(y.pageY+re.y);m.set(ve,be)}v.subVectors(m,p).multiplyScalar(n.rotateSpeed);const Y=n.domElement;J(2*Math.PI*v.x/Y.clientHeight),z(2*Math.PI*v.y/Y.clientHeight),p.copy(m)}function ke(y){if(D.length===1)E.set(y.pageX,y.pageY);else{const Y=xt(y),re=.5*(y.pageX+Y.x),ve=.5*(y.pageY+Y.y);E.set(re,ve)}x.subVectors(E,M).multiplyScalar(n.panSpeed),ue(x.x,x.y),M.copy(E)}function Et(y){const Y=xt(y),re=y.pageX-Y.x,ve=y.pageY-Y.y,be=Math.sqrt(re*re+ve*ve);P.set(0,be),T.set(0,Math.pow(P.y/_.y,n.zoomSpeed)),xe(T.y),_.copy(P);const pt=(y.pageX+Y.x)*.5,ut=(y.pageY+Y.y)*.5;ge(pt,ut)}function U(y){n.enableZoom&&Et(y),n.enablePan&&ke(y)}function b(y){n.enableZoom&&Et(y),n.enableRotate&&Mt(y)}function ee(y){n.enabled!==!1&&(D.length===0&&(n.domElement.setPointerCapture(y.pointerId),n.domElement.addEventListener("pointermove",se),n.domElement.addEventListener("pointerup",le)),!vt(y)&&(rt(y),y.pointerType==="touch"?Xe(y):fe(y)))}function se(y){n.enabled!==!1&&(y.pointerType==="touch"?Ce(y):Fe(y))}function le(y){switch(lt(y),D.length){case 0:n.domElement.releasePointerCapture(y.pointerId),n.domElement.removeEventListener("pointermove",se),n.domElement.removeEventListener("pointerup",le),n.dispatchEvent(ig),o=i.NONE;break;case 1:const Y=D[0],re=V[Y];Xe({pointerId:Y,pageX:re.x,pageY:re.y});break}}function fe(y){let Y;switch(y.button){case 0:Y=n.mouseButtons.LEFT;break;case 1:Y=n.mouseButtons.MIDDLE;break;case 2:Y=n.mouseButtons.RIGHT;break;default:Y=-1}switch(Y){case Ms.DOLLY:if(n.enableZoom===!1)return;ct(y),o=i.DOLLY;break;case Ms.ROTATE:if(y.ctrlKey||y.metaKey||y.shiftKey){if(n.enablePan===!1)return;Tt(y),o=i.PAN}else{if(n.enableRotate===!1)return;Ae(y),o=i.ROTATE}break;case Ms.PAN:if(y.ctrlKey||y.metaKey||y.shiftKey){if(n.enableRotate===!1)return;Ae(y),o=i.ROTATE}else{if(n.enablePan===!1)return;Tt(y),o=i.PAN}break;default:o=i.NONE}o!==i.NONE&&n.dispatchEvent(Ku)}function Fe(y){switch(o){case i.ROTATE:if(n.enableRotate===!1)return;ie(y);break;case i.DOLLY:if(n.enableZoom===!1)return;me(y);break;case i.PAN:if(n.enablePan===!1)return;Re(y);break}}function pe(y){n.enabled===!1||n.enableZoom===!1||o!==i.NONE||(y.preventDefault(),n.dispatchEvent(Ku),Te(Pe(y)),n.dispatchEvent(ig))}function Pe(y){const Y=y.deltaMode,re={clientX:y.clientX,clientY:y.clientY,deltaY:y.deltaY};switch(Y){case 1:re.deltaY*=16;break;case 2:re.deltaY*=100;break}return y.ctrlKey&&!C&&(re.deltaY*=10),re}function ze(y){y.key==="Control"&&(C=!0,n.domElement.getRootNode().addEventListener("keyup",_e,{passive:!0,capture:!0}))}function _e(y){y.key==="Control"&&(C=!1,n.domElement.getRootNode().removeEventListener("keyup",_e,{passive:!0,capture:!0}))}function Me(y){n.enabled===!1||n.enablePan===!1||qe(y)}function Xe(y){switch(dt(y),D.length){case 1:switch(n.touches.ONE){case Es.ROTATE:if(n.enableRotate===!1)return;Ye(y),o=i.TOUCH_ROTATE;break;case Es.PAN:if(n.enablePan===!1)return;ft(y),o=i.TOUCH_PAN;break;default:o=i.NONE}break;case 2:switch(n.touches.TWO){case Es.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Qe(y),o=i.TOUCH_DOLLY_PAN;break;case Es.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ge(y),o=i.TOUCH_DOLLY_ROTATE;break;default:o=i.NONE}break;default:o=i.NONE}o!==i.NONE&&n.dispatchEvent(Ku)}function Ce(y){switch(dt(y),o){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;Mt(y),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;ke(y),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;U(y),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;b(y),n.update();break;default:o=i.NONE}}function Le(y){n.enabled!==!1&&y.preventDefault()}function rt(y){D.push(y.pointerId)}function lt(y){delete V[y.pointerId];for(let Y=0;Y<D.length;Y++)if(D[Y]==y.pointerId){D.splice(Y,1);return}}function vt(y){for(let Y=0;Y<D.length;Y++)if(D[Y]==y.pointerId)return!0;return!1}function dt(y){let Y=V[y.pointerId];Y===void 0&&(Y=new Ne,V[y.pointerId]=Y),Y.set(y.pageX,y.pageY)}function xt(y){const Y=y.pointerId===D[0]?D[1]:D[0];return V[Y]}n.domElement.addEventListener("contextmenu",Le),n.domElement.addEventListener("pointerdown",ee),n.domElement.addEventListener("pointercancel",le),n.domElement.addEventListener("wheel",pe,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",ze,{passive:!0,capture:!0}),this.update()}}var ir=Object.freeze({Linear:Object.freeze({None:function(s){return s},In:function(s){return s},Out:function(s){return s},InOut:function(s){return s}}),Quadratic:Object.freeze({In:function(s){return s*s},Out:function(s){return s*(2-s)},InOut:function(s){return(s*=2)<1?.5*s*s:-.5*(--s*(s-2)-1)}}),Cubic:Object.freeze({In:function(s){return s*s*s},Out:function(s){return--s*s*s+1},InOut:function(s){return(s*=2)<1?.5*s*s*s:.5*((s-=2)*s*s+2)}}),Quartic:Object.freeze({In:function(s){return s*s*s*s},Out:function(s){return 1- --s*s*s*s},InOut:function(s){return(s*=2)<1?.5*s*s*s*s:-.5*((s-=2)*s*s*s-2)}}),Quintic:Object.freeze({In:function(s){return s*s*s*s*s},Out:function(s){return--s*s*s*s*s+1},InOut:function(s){return(s*=2)<1?.5*s*s*s*s*s:.5*((s-=2)*s*s*s*s+2)}}),Sinusoidal:Object.freeze({In:function(s){return 1-Math.sin((1-s)*Math.PI/2)},Out:function(s){return Math.sin(s*Math.PI/2)},InOut:function(s){return .5*(1-Math.sin(Math.PI*(.5-s)))}}),Exponential:Object.freeze({In:function(s){return s===0?0:Math.pow(1024,s-1)},Out:function(s){return s===1?1:1-Math.pow(2,-10*s)},InOut:function(s){return s===0?0:s===1?1:(s*=2)<1?.5*Math.pow(1024,s-1):.5*(-Math.pow(2,-10*(s-1))+2)}}),Circular:Object.freeze({In:function(s){return 1-Math.sqrt(1-s*s)},Out:function(s){return Math.sqrt(1- --s*s)},InOut:function(s){return(s*=2)<1?-.5*(Math.sqrt(1-s*s)-1):.5*(Math.sqrt(1-(s-=2)*s)+1)}}),Elastic:Object.freeze({In:function(s){return s===0?0:s===1?1:-Math.pow(2,10*(s-1))*Math.sin((s-1.1)*5*Math.PI)},Out:function(s){return s===0?0:s===1?1:Math.pow(2,-10*s)*Math.sin((s-.1)*5*Math.PI)+1},InOut:function(s){return s===0?0:s===1?1:(s*=2,s<1?-.5*Math.pow(2,10*(s-1))*Math.sin((s-1.1)*5*Math.PI):.5*Math.pow(2,-10*(s-1))*Math.sin((s-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(s){var e=1.70158;return s===1?1:s*s*((e+1)*s-e)},Out:function(s){var e=1.70158;return s===0?0:--s*s*((e+1)*s+e)+1},InOut:function(s){var e=2.5949095;return(s*=2)<1?.5*(s*s*((e+1)*s-e)):.5*((s-=2)*s*((e+1)*s+e)+2)}}),Bounce:Object.freeze({In:function(s){return 1-ir.Bounce.Out(1-s)},Out:function(s){return s<1/2.75?7.5625*s*s:s<2/2.75?7.5625*(s-=1.5/2.75)*s+.75:s<2.5/2.75?7.5625*(s-=2.25/2.75)*s+.9375:7.5625*(s-=2.625/2.75)*s+.984375},InOut:function(s){return s<.5?ir.Bounce.In(s*2)*.5:ir.Bounce.Out(s*2-1)*.5+.5}}),generatePow:function(s){return s===void 0&&(s=4),s=s<Number.EPSILON?Number.EPSILON:s,s=s>1e4?1e4:s,{In:function(e){return Math.pow(e,s)},Out:function(e){return 1-Math.pow(1-e,s)},InOut:function(e){return e<.5?Math.pow(e*2,s)/2:(1-Math.pow(2-e*2,s))/2+.5}}}}),Ko=function(){return performance.now()},NL=function(){function s(){this._tweens={},this._tweensAddedDuringUpdate={}}return s.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},s.prototype.removeAll=function(){this._tweens={}},s.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},s.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},s.prototype.update=function(e,t){e===void 0&&(e=Ko()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var i=0;i<n.length;i++){var o=this._tweens[n[i]],c=!t;o&&o.update(e,c)===!1&&!t&&delete this._tweens[n[i]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},s}(),lh={Linear:function(s,e){var t=s.length-1,n=t*e,i=Math.floor(n),o=lh.Utils.Linear;return e<0?o(s[0],s[1],n):e>1?o(s[t],s[t-1],t-n):o(s[i],s[i+1>t?t:i+1],n-i)},Utils:{Linear:function(s,e,t){return(e-s)*t+s}}},s_=function(){function s(){}return s.nextId=function(){return s._nextId++},s._nextId=0,s}(),uh=new NL,OL=function(){function s(e,t){t===void 0&&(t=uh),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=ir.Linear.None,this._interpolationFunction=lh.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=s_.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return s.prototype.getId=function(){return this._id},s.prototype.isPlaying=function(){return this._isPlaying},s.prototype.isPaused=function(){return this._isPaused},s.prototype.getDuration=function(){return this._duration},s.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t<0?0:t,this},s.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},s.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},s.prototype.start=function(e,t){if(e===void 0&&(e=Ko()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var n in this._valuesStartRepeat)this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var i={};for(var o in this._valuesEnd)i[o]=this._valuesEnd[o];this._valuesEnd=i}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},s.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},s.prototype._setupProperties=function(e,t,n,i,o){for(var c in n){var l=e[c],h=Array.isArray(l),f=h?"array":typeof l,d=!h&&Array.isArray(n[c]);if(!(f==="undefined"||f==="function")){if(d){var p=n[c];if(p.length===0)continue;for(var m=[l],v=0,M=p.length;v<M;v+=1){var E=this._handleRelativeValue(l,p[v]);if(isNaN(E)){d=!1,console.warn("Found invalid interpolation list. Skipping.");break}m.push(E)}d&&(n[c]=m)}if((f==="object"||h)&&l&&!d){t[c]=h?[]:{};var x=l;for(var _ in x)t[c][_]=x[_];i[c]=h?[]:{};var p=n[c];if(!this._isDynamic){var P={};for(var _ in p)P[_]=p[_];n[c]=p=P}this._setupProperties(x,t[c],p,i[c],o)}else(typeof t[c]>"u"||o)&&(t[c]=l),h||(t[c]*=1),d?i[c]=n[c].slice().reverse():i[c]=t[c]||0}}},s.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},s.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},s.prototype.pause=function(e){return e===void 0&&(e=Ko()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},s.prototype.resume=function(e){return e===void 0&&(e=Ko()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},s.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},s.prototype.group=function(e){return e===void 0&&(e=uh),this._group=e,this},s.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},s.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},s.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},s.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},s.prototype.easing=function(e){return e===void 0&&(e=ir.Linear.None),this._easingFunction=e,this},s.prototype.interpolation=function(e){return e===void 0&&(e=lh.Linear),this._interpolationFunction=e,this},s.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},s.prototype.onStart=function(e){return this._onStartCallback=e,this},s.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},s.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},s.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},s.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},s.prototype.onStop=function(e){return this._onStopCallback=e,this},s.prototype.update=function(e,t){var n;if(e===void 0&&(e=Ko()),t===void 0&&(t=!0),this._isPaused)return!0;var i=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>i)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var o=e-this._startTime,c=this._duration+((n=this._repeatDelayTime)!==null&&n!==void 0?n:this._delayTime),l=this._duration+this._repeat*c,h=this._calculateElapsedPortion(o,c,l),f=this._easingFunction(h),d=this._calculateCompletionStatus(o,c);if(d==="repeat"&&this._processRepetition(o,c),this._updateProperties(this._object,this._valuesStart,this._valuesEnd,f),d==="about-to-repeat"&&this._processRepetition(o,c),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),d==="repeat"||d==="about-to-repeat")this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1;else if(d==="completed"){this._isPlaying=!1,this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var p=0,m=this._chainedTweens.length;p<m;p++)this._chainedTweens[p].start(this._startTime+this._duration,!1)}return d!=="completed"},s.prototype._calculateElapsedPortion=function(e,t,n){if(this._duration===0||e>n)return 1;var i=e%t,o=Math.min(i/this._duration,1);return o===0&&e!==0&&e%this._duration===0?1:o},s.prototype._calculateCompletionStatus=function(e,t){return this._duration!==0&&e<this._duration?"playing":this._repeat<=0?"completed":e===this._duration?"about-to-repeat":"repeat"},s.prototype._processRepetition=function(e,t){var n=Math.min(Math.trunc((e-this._duration)/t)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=n);for(var i in this._valuesStartRepeat){var o=this._valuesEnd[i];!this._yoyo&&typeof o=="string"&&(this._valuesStartRepeat[i]=this._valuesStartRepeat[i]+parseFloat(o)),this._yoyo&&this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}this._yoyo&&(this._reversed=!this._reversed),this._startTime+=t*n},s.prototype._updateProperties=function(e,t,n,i){for(var o in n)if(t[o]!==void 0){var c=t[o]||0,l=n[o],h=Array.isArray(e[o]),f=Array.isArray(l),d=!h&&f;d?e[o]=this._interpolationFunction(l,i):typeof l=="object"&&l?this._updateProperties(e[o],c,l,i):(l=this._handleRelativeValue(c,l),typeof l=="number"&&(e[o]=c+(l-c)*i))}},s.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},s.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},s}();s_.nextId;var Ii=uh;Ii.getAll.bind(Ii);Ii.removeAll.bind(Ii);Ii.add.bind(Ii);Ii.remove.bind(Ii);var FL=Ii.update.bind(Ii);const Pc={enableDamping:!0,dampingFactor:.04},ea=class ea extends UL{constructor(e,t,n,i=Pc){super(e,t.domElement),this.last=null,this.animating=!1,this.locked=!1,this.stopMoveTo=()=>{},this.stopRevertLast=()=>{},this._removePreRenderCallback=()=>{},this.preRenderCallback=()=>{this.locked||this.update()},this._animationSystem=n,this.domElement=t.domElement,this.object=e;const o=t.AddPreRenderCallback(()=>{this.preRenderCallback()});this._removePreRenderCallback=()=>{t.RemovePreRenderCallback(o)},this.enableDamping=i.enableDamping||Pc.enableDamping,this.dampingFactor=i.dampingFactor||Pc.dampingFactor,this.object.position.set(0,2,2),this.target.copy({x:0,y:.5,z:0}),this.update()}Dispose(){this._removePreRenderCallback(),this.dispose()}ComputeEncompassingView(e){const t=e.getCenter(new F),n=e.getSize(new F),i=Math.max(n.x,n.y,n.z)*1.25;return{position:this.object.position.clone().normalize().multiplyScalar(i),target:t}}ZoomIn(e){const t=e||ea.DEFAULT_ZOOM_FACTOR,{minDistance:n,maxDistance:i}=this;this.minDistance=this.maxDistance=vi.clamp(this.getDistance()-t,n+t,i-t),this.update(),this.minDistance=n,this.maxDistance=i}ZoomOut(e){const t=e||ea.DEFAULT_ZOOM_FACTOR,{minDistance:n,maxDistance:i}=this;this.minDistance=this.maxDistance=vi.clamp(this.getDistance()+t,n+t,i-t),this.update(),this.minDistance=n,this.maxDistance=i}MoveTo(e,t,n,i){if(this.animating)return;const o=e||this.object.position.clone(),c=t||this.target.clone();this.stopRevertLast(),this.locked||(this.last={pos:this.object.position.clone(),target:this.target.clone()}),this.animating=n>0,this.locked=i,this.enabled=!1;const l=this._animationSystem.Animate(this.object.position).to(o,n).easing(ir.Quadratic.Out).start(),h=this._animationSystem.Animate(this.target).to(c,n).easing(ir.Quadratic.Out).onUpdate(()=>{this.object.lookAt(this.target)}).onComplete(()=>{this.animating=!1,this.enabled=!i}).start();this.stopMoveTo=()=>{l.stop(),h.stop()}}RevertLast(e){if(this.animating||!this.locked)return;this.stopMoveTo(),this.animating=e>0,this.enabled=!1;const{pos:t,target:n}=this.last,i=this._animationSystem.Animate(this.object.position).to(t,e).easing(ir.Quadratic.Out).start(),o=this._animationSystem.Animate(this.target).to(n,e).easing(ir.Quadratic.Out).onUpdate(()=>{this.object.lookAt(this.target)}).onComplete(()=>{this.animating=!1,this.locked=!1,this.enabled=!0}).start();this.stopRevertLast=()=>{i.stop(),o.stop()}}};ea.DEFAULT_ZOOM_FACTOR=1;let hh=ea;const Bh=class Bh{get selectTool(){if(!this._selectTool){const e=require("./select/SelectTool.ts").DIVESelectTool;this._selectTool=new e(this._scene,this._controller)}return this._selectTool}constructor(e,t){this._scene=e,this._controller=t,this._selectTool=null,this._activeTool=null}Dispose(){this.removeEventListeners()}GetActiveTool(){return this._activeTool}UseTool(e){var t;switch((t=this._activeTool)==null||t.Deactivate(),e){case"select":{this.addEventListeners(),this.selectTool.Activate(),this._activeTool=this.selectTool;break}case"none":{this.removeEventListeners(),this._activeTool=null;break}default:console.warn(`DIVEToolBox.UseTool: Unknown tool: ${e}`)}}SetGizmoMode(e){this.selectTool.SetGizmoMode(e)}SetGizmoVisibility(e){this.selectTool.SetGizmoVisibility(e)}SetGizmoScaleLinked(e){this.selectTool.SetGizmoScaleLinked(e)}onPointerMove(e){var t;(t=this._activeTool)==null||t.onPointerMove(e)}onPointerDown(e){var t;(t=this._activeTool)==null||t.onPointerDown(e)}onPointerUp(e){var t;(t=this._activeTool)==null||t.onPointerUp(e)}onWheel(e){var t;(t=this._activeTool)==null||t.onWheel(e)}addEventListeners(){this._controller.domElement.addEventListener("pointermove",e=>this.onPointerMove(e)),this._controller.domElement.addEventListener("pointerdown",e=>this.onPointerDown(e)),this._controller.domElement.addEventListener("pointerup",e=>this.onPointerUp(e)),this._controller.domElement.addEventListener("wheel",e=>this.onWheel(e))}removeEventListeners(){this._controller.domElement.removeEventListener("pointermove",e=>this.onPointerMove(e)),this._controller.domElement.removeEventListener("pointerdown",e=>this.onPointerDown(e)),this._controller.domElement.removeEventListener("pointerup",e=>this.onPointerUp(e)),this._controller.domElement.removeEventListener("wheel",e=>this.onWheel(e))}};Bh.DefaultTool="select";let fh=Bh;class BL{constructor(e){this._renderer=e,this._rendererCallbackId=this._renderer.AddPreRenderCallback(()=>{this.Update()})}Dispose(){this._renderer.RemovePreRenderCallback(this._rendererCallbackId)}Update(){FL()}Animate(e){return new OL(e)}}function kL(s,e,t){return e=zc(e),jL(s,o_()?Reflect.construct(e,t||[],zc(s).constructor):e.apply(s,t))}function o_(){try{var s=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(o_=function(){return!!s})()}function zL(s,e){var t=s==null?null:typeof Symbol<"u"&&s[Symbol.iterator]||s["@@iterator"];if(t!=null){var n,i,o,c,l=[],h=!0,f=!1;try{if(o=(t=t.call(s)).next,e===0){if(Object(t)!==t)return;h=!1}else for(;!(h=(n=o.call(t)).done)&&(l.push(n.value),l.length!==e);h=!0);}catch(d){f=!0,i=d}finally{try{if(!h&&t.return!=null&&(c=t.return(),Object(c)!==c))return}finally{if(f)throw i}}return l}}function HL(s,e){if(typeof s!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var n=t.call(s,e);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}function GL(s){var e=HL(s,"string");return typeof e=="symbol"?e:String(e)}function VL(s,e){if(!(s instanceof e))throw new TypeError("Cannot call a class as a function")}function WL(s,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(s,GL(n.key),n)}}function XL(s,e,t){return e&&WL(s.prototype,e),Object.defineProperty(s,"prototype",{writable:!1}),s}function qL(s,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");s.prototype=Object.create(e&&e.prototype,{constructor:{value:s,writable:!0,configurable:!0}}),Object.defineProperty(s,"prototype",{writable:!1}),e&&dh(s,e)}function zc(s){return zc=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},zc(s)}function dh(s,e){return dh=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,i){return n.__proto__=i,n},dh(s,e)}function YL(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function jL(s,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return YL(s)}function sg(s,e){return ZL(s)||zL(s,e)||a_(s,e)||QL()}function Cc(s){return KL(s)||$L(s)||a_(s)||JL()}function KL(s){if(Array.isArray(s))return ph(s)}function ZL(s){if(Array.isArray(s))return s}function $L(s){if(typeof Symbol<"u"&&s[Symbol.iterator]!=null||s["@@iterator"]!=null)return Array.from(s)}function a_(s,e){if(s){if(typeof s=="string")return ph(s,e);var t=Object.prototype.toString.call(s).slice(8,-1);if(t==="Object"&&s.constructor&&(t=s.constructor.name),t==="Map"||t==="Set")return Array.from(s);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return ph(s,e)}}function ph(s,e){(e==null||e>s.length)&&(e=s.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=s[t];return n}function JL(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function QL(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var qs=typeof window<"u"&&window.THREE?window.THREE:{LinearFilter:Pn,Sprite:O1,SpriteMaterial:Vg,SRGBColorSpace:nn,Texture:Zt},Zu=function(s){qL(e,s);function e(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:10,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"rgba(255, 255, 255, 1)";return VL(this,e),t=kL(this,e,[new qs.SpriteMaterial]),t._text="".concat(n),t._textHeight=i,t._color=o,t._backgroundColor=!1,t._padding=0,t._borderWidth=0,t._borderRadius=0,t._borderColor="white",t._strokeWidth=0,t._strokeColor="white",t._fontFace="system-ui",t._fontSize=90,t._fontWeight="normal",t._canvas=document.createElement("canvas"),t._genCanvas(),t}return XL(e,[{key:"text",get:function(){return this._text},set:function(n){this._text=n,this._genCanvas()}},{key:"textHeight",get:function(){return this._textHeight},set:function(n){this._textHeight=n,this._genCanvas()}},{key:"color",get:function(){return this._color},set:function(n){this._color=n,this._genCanvas()}},{key:"backgroundColor",get:function(){return this._backgroundColor},set:function(n){this._backgroundColor=n,this._genCanvas()}},{key:"padding",get:function(){return this._padding},set:function(n){this._padding=n,this._genCanvas()}},{key:"borderWidth",get:function(){return this._borderWidth},set:function(n){this._borderWidth=n,this._genCanvas()}},{key:"borderRadius",get:function(){return this._borderRadius},set:function(n){this._borderRadius=n,this._genCanvas()}},{key:"borderColor",get:function(){return this._borderColor},set:function(n){this._borderColor=n,this._genCanvas()}},{key:"fontFace",get:function(){return this._fontFace},set:function(n){this._fontFace=n,this._genCanvas()}},{key:"fontSize",get:function(){return this._fontSize},set:function(n){this._fontSize=n,this._genCanvas()}},{key:"fontWeight",get:function(){return this._fontWeight},set:function(n){this._fontWeight=n,this._genCanvas()}},{key:"strokeWidth",get:function(){return this._strokeWidth},set:function(n){this._strokeWidth=n,this._genCanvas()}},{key:"strokeColor",get:function(){return this._strokeColor},set:function(n){this._strokeColor=n,this._genCanvas()}},{key:"_genCanvas",value:function(){var n=this,i=this._canvas,o=i.getContext("2d"),c=Array.isArray(this.borderWidth)?this.borderWidth:[this.borderWidth,this.borderWidth],l=c.map(function(D){return D*n.fontSize*.1}),h=Array.isArray(this.borderRadius)?this.borderRadius:[this.borderRadius,this.borderRadius,this.borderRadius,this.borderRadius],f=h.map(function(D){return D*n.fontSize*.1}),d=Array.isArray(this.padding)?this.padding:[this.padding,this.padding],p=d.map(function(D){return D*n.fontSize*.1}),m=this.text.split(`
`),v="".concat(this.fontWeight," ").concat(this.fontSize,"px ").concat(this.fontFace);o.font=v;var M=Math.max.apply(Math,Cc(m.map(function(D){return o.measureText(D).width}))),E=this.fontSize*m.length;if(i.width=M+l[0]*2+p[0]*2,i.height=E+l[1]*2+p[1]*2,this.borderWidth){if(o.strokeStyle=this.borderColor,l[0]){var x=l[0]/2;o.lineWidth=l[0],o.beginPath(),o.moveTo(x,f[0]),o.lineTo(x,i.height-f[3]),o.moveTo(i.width-x,f[1]),o.lineTo(i.width-x,i.height-f[2]),o.stroke()}if(l[1]){var _=l[1]/2;o.lineWidth=l[1],o.beginPath(),o.moveTo(Math.max(l[0],f[0]),_),o.lineTo(i.width-Math.max(l[0],f[1]),_),o.moveTo(Math.max(l[0],f[3]),i.height-_),o.lineTo(i.width-Math.max(l[0],f[2]),i.height-_),o.stroke()}if(this.borderRadius){var P=Math.max.apply(Math,Cc(l)),T=P/2;o.lineWidth=P,o.beginPath(),[!!f[0]&&[f[0],T,T,f[0]],!!f[1]&&[i.width-f[1],i.width-T,T,f[1]],!!f[2]&&[i.width-f[2],i.width-T,i.height-T,i.height-f[2]],!!f[3]&&[f[3],T,i.height-T,i.height-f[3]]].filter(function(D){return D}).forEach(function(D){var V=sg(D,4),C=V[0],w=V[1],X=V[2],J=V[3];o.moveTo(C,X),o.quadraticCurveTo(w,X,w,J)}),o.stroke()}}this.backgroundColor&&(o.fillStyle=this.backgroundColor,this.borderRadius?(o.beginPath(),o.moveTo(l[0],f[0]),[[l[0],f[0],i.width-f[1],l[1],l[1],l[1]],[i.width-l[0],i.width-l[0],i.width-l[0],l[1],f[1],i.height-f[2]],[i.width-l[0],i.width-f[2],f[3],i.height-l[1],i.height-l[1],i.height-l[1]],[l[0],l[0],l[0],i.height-l[1],i.height-f[3],f[0]]].forEach(function(D){var V=sg(D,6),C=V[0],w=V[1],X=V[2],J=V[3],z=V[4],te=V[5];o.quadraticCurveTo(C,J,w,z),o.lineTo(X,te)}),o.closePath(),o.fill()):o.fillRect(l[0],l[1],i.width-l[0]*2,i.height-l[1]*2)),o.translate.apply(o,Cc(l)),o.translate.apply(o,Cc(p)),o.font=v,o.fillStyle=this.color,o.textBaseline="bottom";var I=this.strokeWidth>0;I&&(o.lineWidth=this.strokeWidth*this.fontSize/10,o.strokeStyle=this.strokeColor),m.forEach(function(D,V){var C=(M-o.measureText(D).width)/2,w=(V+1)*n.fontSize;I&&o.strokeText(D,C,w),o.fillText(D,C,w)}),this.material.map&&this.material.map.dispose();var k=this.material.map=new qs.Texture(i);k.minFilter=qs.LinearFilter,k.colorSpace=qs.SRGBColorSpace,k.needsUpdate=!0;var O=this.textHeight*m.length+c[1]*2+d[1]*2;this.scale.set(O*i.width/i.height,O,0)}},{key:"clone",value:function(){return new this.constructor(this.text,this.textHeight,this.color).copy(this)}},{key:"copy",value:function(n){return qs.Sprite.prototype.copy.call(this,n),this.color=n.color,this.backgroundColor=n.backgroundColor,this.padding=n.padding,this.borderWidth=n.borderWidth,this.borderColor=n.borderColor,this.fontFace=n.fontFace,this.fontSize=n.fontSize,this.fontWeight=n.fontWeight,this.strokeWidth=n.strokeWidth,this.strokeColor=n.strokeColor,this}}]),e}(qs.Sprite);class og extends Xc{constructor(e,t,n){super(-1,1,1,-1,.1,100),this.layers.mask=Wo,this.axesHelper=new wC(.5),this.axesHelper.layers.mask=Wo,this.axesHelper.material.depthTest=!1,this.axesHelper.position.set(0,0,-1),this.axesHelper.setColors(new De(PC),new De(IC),new De(DC));const i=new Zu("X",.2,Qg),o=new Zu("Y",.2,e_),c=new Zu("Z",.2,t_);i.layers.mask=Wo,o.layers.mask=Wo,c.layers.mask=Wo,i.position.set(.7,0,0),o.position.set(0,.7,0),c.position.set(0,0,.7),this.axesHelper.add(i),this.axesHelper.add(o),this.axesHelper.add(c),this.add(this.axesHelper),this._renderer=e,this._scene=t,this._scene.add(this);const l=new It;this._renderCallbackId=e.AddPostRenderCallback(()=>{const h=t.background;t.background=null,e.getViewport(l),e.setViewport(0,0,150,150),e.autoClear=!1,this.SetFromCameraMatrix(n.object.matrix),e.render(t,this),e.setViewport(l),e.autoClear=!0,t.background=h})}Dispose(){this._renderer.RemovePostRenderCallback(this._renderCallbackId),this._scene.remove(this)}SetFromCameraMatrix(e){this.axesHelper.rotation.setFromRotationMatrix(new Je().extractRotation(e).invert())}}const mh=(s,e)=>{if(Object.keys(s).length===0&&Object.keys(e).length===0)return{};if(typeof s!="object"||typeof e!="object")return e;let t={};return Object.keys(e).forEach(n=>{if(!Object.keys(s).includes(n)){t={...t,[n]:e[n]};return}if(Array.isArray(e[n])){if(!Array.isArray(s[n])){t={...t,[n]:e[n]};return}const i=s[n],o=e[n];if(i.length===0&&o.length===0){t={...t};return}if(i.length!==o.length){t={...t,[n]:e[n]};return}const c=[];if(o.forEach((l,h)=>{const f=mh(i[h],o[h]);Object.keys(f).length&&c.push(o[h])}),Object.keys(c).length){t={...t,[n]:c};return}return}if(typeof e[n]=="object"){if(typeof s[n]!="object"){t={...t,[n]:e[n]};return}const i=mh(s[n],e[n]);if(Object.keys(i).length){t={...t,[n]:i};return}}s[n]!==e[n]&&(t={...t,[n]:e[n]})}),t};var c_=(s=>(s[s.UNKNWON_ERROR=0]="UNKNWON_ERROR",s[s.NO_HTTPS=1]="NO_HTTPS",s[s.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE=2]="IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE",s[s.AR_SESSION_NOT_ALLOWED=3]="AR_SESSION_NOT_ALLOWED",s))(c_||{});const Gc=class Gc{static GetSystem(){const e=navigator.platform;return/Android/.test(navigator.userAgent)?"Android":/iPhone|iPad|iPod/.test(navigator.userAgent)?"iOS":e.startsWith("Win")?"Windows":e.startsWith("Mac")?"MacOS":e.startsWith("Linux")?"Linux":"Unknown"}static async GetSupportsWebXR(){if(this._supportsWebXR!==null)return this._supportsWebXR;if(!navigator.xr)return this._supportsWebXR=!1,window.isSecureContext===!1?this._webXRUnsupportedReason=1:this._webXRUnsupportedReason=0,this._supportsWebXR;try{const e=await navigator.xr.isSessionSupported("immersive-ar");e||(this._webXRUnsupportedReason=2),this._supportsWebXR=e}catch{this._supportsWebXR=!1,this._webXRUnsupportedReason=3}return this._supportsWebXR}static GetWebXRUnsupportedReason(){return this._supportsWebXR===null?(console.log("WebXR support has not been checked yet."),null):this._webXRUnsupportedReason}static GetSupportsARQuickLook(){if(document.createElement("a").relList.supports("ar"))return!0;const t=navigator.userAgent;if(!(/iPad|iPhone|iPod/.test(t)&&!window.MSStream))return!1;const i=t.match(/OS (\d+)_/);return!i||i.length<2||parseInt(i[1],10)<12?!1:!!/^((?!chrome|android).)*safari|CriOS|FxiOS/i.test(t)}static get isMobile(){return this.GetSystem()==="Android"||this.GetSystem()==="iOS"}static get isDesktop(){return!this.isMobile}static async GetIsARCapable(){return this.GetSupportsARQuickLook()?!0:await this.GetSupportsWebXR()}};Gc._supportsWebXR=null,Gc._webXRUnsupportedReason=null;let Hc=Gc;const eP="1.18.5-beta.2",tP={version:eP};function Di(s,e){const t=(s+"e").split("e");return+(t[0]+"e"+(+t[1]+(e||0)))}function nP(s,e=0){const t=Di(s,+e);return Di(Math.ceil(t),-e)}function iP(s,e=0){const t=Di(s,+e);return Di(Math.floor(t),-e)}function l_(s,e=0){if(s<0)return-l_(-s,e);const t=Di(s,+e);return Di(Math.round(t),-e)}function rP(s,e,t){return Math.atan2(s.clone().cross(e).dot(t),e.clone().dot(s))}function sP(s,e=0){const t=Di(s,+e);return Di(Math.round(t),-e).toFixed(e)}function oP(s,e=0){const t=Di(s,+e);return Di(Math.trunc(t),-e)}function aP(s){return(vi.radToDeg(s)+360)%360}function cP(s){return vi.degToRad(s)}const lP={ceilExp:nP,floorExp:iP,roundExp:l_,toFixedExp:sP,truncateExp:oP,signedAngleTo:rP,radToDeg:aP,degToRad:cP},u_={autoResize:!0,displayAxes:!1,renderer:Zr,perspectiveCamera:jo,orbitControls:Pc};class Fh{static QuickView(e,t){const n=new Fh(t);n.Communication.PerformAction("SET_CAMERA_TRANSFORM",{position:{x:0,y:2,z:2},target:{x:0,y:.5,z:0}});const i=vi.generateUUID();n.Communication.PerformAction("ADD_OBJECT",{entityType:"light",type:"scene",name:"light",id:i,enabled:!0,visible:!0,intensity:1,color:16777215});const o=vi.generateUUID();return n.Communication.Subscribe("MODEL_LOADED",c=>{if(c.id!==o)return;const l=n.Communication.PerformAction("COMPUTE_ENCOMPASSING_VIEW",{});n.Communication.PerformAction("SET_CAMERA_TRANSFORM",{position:l.position,target:l.target})}),n.Communication.PerformAction("ADD_OBJECT",{entityType:"model",name:"object",id:o,position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},uri:e,visible:!0,loaded:!1}),n.Communication.PerformAction("UPDATE_SCENE",{backgroundColor:16777215,gridEnabled:!1,floorColor:16777215}),n}get Communication(){return this.communication}get Canvas(){return this.renderer.domElement}get Info(){return Hc}set Settings(e){var n;const t=mh(this._settings,e);t.renderer&&(this.renderer=new jm(this._settings.renderer)),t.perspectiveCamera&&(t.perspectiveCamera.fov!==void 0&&(this.perspectiveCamera.fov=t.perspectiveCamera.fov),t.perspectiveCamera.near!==void 0&&(this.perspectiveCamera.near=t.perspectiveCamera.near),t.perspectiveCamera.far!==void 0&&(this.perspectiveCamera.far=t.perspectiveCamera.far),this.perspectiveCamera.OnResize(this.renderer.domElement.width,this.renderer.domElement.height)),t.orbitControls&&(t.orbitControls.enableDamping!==void 0&&(this.orbitControls.enableDamping=t.orbitControls.enableDamping),t.orbitControls.dampingFactor!==void 0&&(this.orbitControls.dampingFactor=t.orbitControls.dampingFactor)),t.autoResize!==this._settings.autoResize&&(t.autoResize?this.addResizeObserver():this.removeResizeObserver()),t.displayAxes?this.axisCamera=new og(this.renderer,this.scene,this.orbitControls):((n=this.axisCamera)==null||n.Dispose(),this.axisCamera=null),Object.assign(this._settings,e)}constructor(e){this._settings={...u_,...e!==void 0?e:{}},this._resizeObserverId="",this._width=0,this._height=0,this.renderer=new jm(this._settings.renderer),this.scene=new IL,this.perspectiveCamera=new kc(this._settings.perspectiveCamera),this.animationSystem=new BL(this.renderer),this.orbitControls=new hh(this.perspectiveCamera,this.renderer,this.animationSystem,this._settings.orbitControls),this.toolbox=new fh(this.scene,this.orbitControls),this.communication=new On(this.renderer,this.scene,this.orbitControls,this.toolbox),this._settings.displayAxes?this.axisCamera=new og(this.renderer,this.scene,this.orbitControls):this.axisCamera=null,this._settings.autoResize&&this.addResizeObserver(),this.renderer.StartRenderer(this.scene,this.perspectiveCamera),window.DIVE={PrintScene:()=>{console.log(this.scene)}},console.log(`DIVE ${tP.version} initialized successfully!`),console.log(`
                    @@@@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@@@@@@@
               @@@@+-:::::::---------------------==------------------------------=#@@@@
            @@%=::::.......::---------------------------------------------------------+@@
          @@+:::...........::-----------------------------------------------------------#@@
        @@=:::.........::::::-------------------------------------------------------------%@
       @%:::.......:::::::-----------------------------------------------------------------#@
      @*:::.....:::::-----------------------------------------------------------------------*@
     @%::::::.::::---------------------------------------------------------------------------@@
    @@-:::::::::-----------------------------------------------------------------------------=@
    @%::::::::--------------------------------------------------------------------------------%@
    @+::::::::--------------------------------=@@@@@%-----------------------------------------%@
    @=:::::::--------------------------------*@@    @@+---------------------------------------#@
    @+:::::::-------------------------------*@        @*--------------------------------------%@
    @#::::::::-----------------------------=@@        @@=-------------------------------------%@
    @@-::::::::----------------------------@@          @@------------------------------------=@
     @%:::::::::--------------------------*@            @*-----------------------------------@@
      @*:::::::::-------------------------@@            @@----------------------------------%@
       @#::::::::::----------------------%@              @%--------------------------------%@
        @#:::::::::::-------------------=@@              @@=------------------------------%@
         @@-::::::::::::----------------%@                @%----------------------------=@@
          @@#::::::::::::::------------*@                  @*--------------------------#@@
            @@+::::::::::::::::--------@@                  @@------------------------+@@
              @@*:::::::::::::::::----@@                    @@---------------------+@@
                @@@-:::::::::::::::--#@                      @#-----------------=%@@
                   @@%-::::::::::::-%@                        @%-------------=%@@
                      @@@@+:::::::#@@                          @@*-------*@@@@
                           @@@@@@@                                @@@@@@

        `)}Dispose(){var e;this.removeResizeObserver(),this.renderer.Dispose(),this.orbitControls.Dispose(),(e=this.axisCamera)==null||e.Dispose(),this.animationSystem.Dispose(),this.toolbox.Dispose(),this.communication.DestroyInstance()}OnResize(e,t){this.renderer.OnResize(e,t),this.perspectiveCamera.OnResize(e,t)}addResizeObserver(){this._resizeObserverId=this.renderer.AddPreRenderCallback(()=>{const e=this.renderer.domElement.parentElement;if(!e)return;const{clientWidth:t,clientHeight:n}=e;t===this._width&&n===this._height||(this.OnResize(t,n),this._width=t,this._height=n)})}removeResizeObserver(){this.renderer.RemovePreRenderCallback(this._resizeObserverId)}}exports.BufferAttribute=Qt;exports.CanvasTexture=X1;exports.ClampToEdgeWrapping=er;exports.Color=De;exports.CompressedTexture=W1;exports.DIVE=Fh;exports.DIVECommunication=On;exports.DIVEDefaultSettings=u_;exports.DIVEInfo=Hc;exports.DIVEMath=lP;exports.DIVEPerspectiveCamera=kc;exports.DoubleSide=pi;exports.GLTFLoader=n_;exports.InterpolateDiscrete=io;exports.InterpolateLinear=ts;exports.LinearFilter=Pn;exports.LinearMipmapLinearFilter=Ri;exports.LinearMipmapNearestFilter=Zo;exports.MathUtils=vi;exports.Matrix4=Je;exports.Mesh=un;exports.MeshBasicMaterial=nr;exports.MirroredRepeatWrapping=ta;exports.NearestFilter=En;exports.NearestMipmapLinearFilter=Ys;exports.NearestMipmapNearestFilter=_h;exports.NoColorSpace=Qi;exports.Object3D=St;exports.PerspectiveCamera=Mn;exports.PlaneGeometry=ss;exports.PropertyBinding=Rt;exports.Quaternion=xi;exports.RGBAFormat=ii;exports.Raycaster=Dh;exports.RepeatWrapping=es;exports.RingGeometry=wh;exports.SRGBColorSpace=nn;exports.Scene=Hg;exports.ShaderMaterial=sr;exports.Source=yh;exports.Uniform=Ih;exports.Vector2=Ne;exports.Vector3=F;exports.WebGLRenderer=zg;exports.WebXRUnsupportedReason=c_;
//# sourceMappingURL=dive-_-yiZbhn.cjs.map
