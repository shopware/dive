"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vh="163",xs={ROTATE:0,DOLLY:1,PAN:2},ys={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rE=0,$d=1,sE=2,ig=1,rg=2,$i=3,wi=0,Fn=1,Ti=2,Rr=0,qs=1,Jd=2,Qd=3,ep=4,oE=5,$r=100,aE=101,cE=102,lE=103,uE=104,hE=200,fE=201,dE=202,pE=203,$u=204,Ju=205,mE=206,gE=207,_E=208,vE=209,xE=210,yE=211,SE=212,ME=213,EE=214,bE=0,TE=1,AE=2,Pc=3,wE=4,RE=5,CE=6,LE=7,sg=0,PE=1,IE=2,tr=0,DE=1,UE=2,NE=3,OE=4,FE=5,BE=6,kE=7,tp="attached",zE="detached",og=300,Zs=301,$s=302,Qu=303,eh=304,Hc=306,Js=1e3,br=1001,Ic=1002,Ln=1003,ag=1004,Wo=1005,Nn=1006,Rc=1007,Ji=1008,Cr=1009,HE=1010,GE=1011,cg=1012,lg=1013,Qs=1014,Ai=1015,Dc=1016,ug=1017,hg=1018,ia=1020,VE=35902,WE=1021,XE=1022,mi=1023,qE=1024,YE=1025,Ys=1026,Qo=1027,fg=1028,dg=1029,jE=1030,pg=1031,mg=1033,au=33776,cu=33777,lu=33778,uu=33779,np=35840,ip=35841,rp=35842,sp=35843,gg=36196,op=37492,ap=37496,cp=37808,lp=37809,up=37810,hp=37811,fp=37812,dp=37813,pp=37814,mp=37815,gp=37816,_p=37817,vp=37818,xp=37819,yp=37820,Sp=37821,hu=36492,Mp=36494,Ep=36495,KE=36283,bp=36284,Tp=36285,Ap=36286,ea=2300,eo=2301,fu=2302,wp=2400,Rp=2401,Cp=2402,ZE=2500,$E=0,_g=1,th=2,JE=3200,QE=3201,vg=0,eb=1,Er="",cn="srgb",ln="srgb-linear",xh="display-p3",Gc="display-p3-linear",Uc="linear",kt="srgb",Nc="rec709",Oc="p3",Ss=7680,Lp=519,tb=512,nb=513,ib=514,xg=515,rb=516,sb=517,ob=518,ab=519,nh=35044,Pp="300 es",Qi=2e3,Fc=2001;class ns{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let o=0,c=r.length;o<c;o++)r[o].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ip=1234567;const Ko=Math.PI/180,to=180/Math.PI;function gi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xn[s&255]+xn[s>>8&255]+xn[s>>16&255]+xn[s>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]).toLowerCase()}function dn(s,e,t){return Math.max(e,Math.min(t,s))}function yh(s,e){return(s%e+e)%e}function cb(s,e,t,n,r){return n+(s-e)*(r-n)/(t-e)}function lb(s,e,t){return s!==e?(t-s)/(e-s):0}function Zo(s,e,t){return(1-t)*s+t*e}function ub(s,e,t,n){return Zo(s,e,1-Math.exp(-t*n))}function hb(s,e=1){return e-Math.abs(yh(s,e*2)-e)}function fb(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function db(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function pb(s,e){return s+Math.floor(Math.random()*(e-s+1))}function mb(s,e){return s+Math.random()*(e-s)}function gb(s){return s*(.5-Math.random())}function _b(s){s!==void 0&&(Ip=s);let e=Ip+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vb(s){return s*Ko}function xb(s){return s*to}function yb(s){return(s&s-1)===0&&s!==0}function Sb(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Mb(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Eb(s,e,t,n,r){const o=Math.cos,c=Math.sin,l=o(t/2),h=c(t/2),f=o((e+n)/2),d=c((e+n)/2),p=o((e-n)/2),m=c((e-n)/2),v=o((n-e)/2),M=c((n-e)/2);switch(r){case"XYX":s.set(l*d,h*p,h*m,l*f);break;case"YZY":s.set(h*m,l*d,h*p,l*f);break;case"ZXZ":s.set(h*p,h*m,l*d,l*f);break;case"XZX":s.set(l*d,h*M,h*v,l*f);break;case"YXY":s.set(h*v,l*d,h*M,l*f);break;case"ZYZ":s.set(h*M,h*v,l*d,l*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function di(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Lt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ri={DEG2RAD:Ko,RAD2DEG:to,generateUUID:gi,clamp:dn,euclideanModulo:yh,mapLinear:cb,inverseLerp:lb,lerp:Zo,damp:ub,pingpong:hb,smoothstep:fb,smootherstep:db,randInt:pb,randFloat:mb,randFloatSpread:gb,seededRandom:_b,degToRad:vb,radToDeg:xb,isPowerOfTwo:yb,ceilPowerOfTwo:Sb,floorPowerOfTwo:Mb,setQuaternionFromProperEuler:Eb,normalize:Lt,denormalize:di};class Oe{constructor(e=0,t=0){Oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),o=this.x-e.x,c=this.y-e.y;return this.x=o*n-c*r+e.x,this.y=o*r+c*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class at{constructor(e,t,n,r,o,c,l,h,f){at.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,c,l,h,f)}set(e,t,n,r,o,c,l,h,f){const d=this.elements;return d[0]=e,d[1]=r,d[2]=l,d[3]=t,d[4]=o,d[5]=h,d[6]=n,d[7]=c,d[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,c=n[0],l=n[3],h=n[6],f=n[1],d=n[4],p=n[7],m=n[2],v=n[5],M=n[8],E=r[0],x=r[3],_=r[6],P=r[1],b=r[4],I=r[7],z=r[2],O=r[5],D=r[8];return o[0]=c*E+l*P+h*z,o[3]=c*x+l*b+h*O,o[6]=c*_+l*I+h*D,o[1]=f*E+d*P+p*z,o[4]=f*x+d*b+p*O,o[7]=f*_+d*I+p*D,o[2]=m*E+v*P+M*z,o[5]=m*x+v*b+M*O,o[8]=m*_+v*I+M*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8];return t*c*d-t*l*f-n*o*d+n*l*h+r*o*f-r*c*h}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8],p=d*c-l*f,m=l*h-d*o,v=f*o-c*h,M=t*p+n*m+r*v;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=p*E,e[1]=(r*f-d*n)*E,e[2]=(l*n-r*c)*E,e[3]=m*E,e[4]=(d*t-r*h)*E,e[5]=(r*o-l*t)*E,e[6]=v*E,e[7]=(n*h-f*t)*E,e[8]=(c*t-n*o)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,o,c,l){const h=Math.cos(o),f=Math.sin(o);return this.set(n*h,n*f,-n*(h*c+f*l)+c+e,-r*f,r*h,-r*(-f*c+h*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(du.makeScale(e,t)),this}rotate(e){return this.premultiply(du.makeRotation(-e)),this}translate(e,t){return this.premultiply(du.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const du=new at;function yg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ta(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function bb(){const s=ta("canvas");return s.style.display="block",s}const Dp={};function Sg(s){s in Dp||(Dp[s]=!0,console.warn(s))}const Up=new at().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Np=new at().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ka={[ln]:{transfer:Uc,primaries:Nc,toReference:s=>s,fromReference:s=>s},[cn]:{transfer:kt,primaries:Nc,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Gc]:{transfer:Uc,primaries:Oc,toReference:s=>s.applyMatrix3(Np),fromReference:s=>s.applyMatrix3(Up)},[xh]:{transfer:kt,primaries:Oc,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Np),fromReference:s=>s.applyMatrix3(Up).convertLinearToSRGB()}},Tb=new Set([ln,Gc]),Rt={enabled:!0,_workingColorSpace:ln,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Tb.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=Ka[e].toReference,r=Ka[t].fromReference;return r(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ka[s].primaries},getTransfer:function(s){return s===Er?Uc:Ka[s].transfer}};function js(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function pu(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ms;class Ab{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ms===void 0&&(Ms=ta("canvas")),Ms.width=e.width,Ms.height=e.height;const n=Ms.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ms}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ta("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),o=r.data;for(let c=0;c<o.length;c++)o[c]=js(o[c]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(js(t[n]/255)*255):t[n]=js(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wb=0;class Mg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wb++}),this.uuid=gi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let c=0,l=r.length;c<l;c++)r[c].isDataTexture?o.push(mu(r[c].image)):o.push(mu(r[c]))}else o=mu(r);n.url=o}return t||(e.images[this.uuid]=n),n}}function mu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ab.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rb=0;class Qt extends ns{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,n=br,r=br,o=Nn,c=Ji,l=mi,h=Cr,f=Qt.DEFAULT_ANISOTROPY,d=Er){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rb++}),this.uuid=gi(),this.name="",this.source=new Mg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=c,this.anisotropy=f,this.format=l,this.internalFormat=null,this.type=h,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==og)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Js:e.x=e.x-Math.floor(e.x);break;case br:e.x=e.x<0?0:1;break;case Ic:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Js:e.y=e.y-Math.floor(e.y);break;case br:e.y=e.y<0?0:1;break;case Ic:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=og;Qt.DEFAULT_ANISOTROPY=1;class It{constructor(e=0,t=0,n=0,r=1){It.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=this.w,c=e.elements;return this.x=c[0]*t+c[4]*n+c[8]*r+c[12]*o,this.y=c[1]*t+c[5]*n+c[9]*r+c[13]*o,this.z=c[2]*t+c[6]*n+c[10]*r+c[14]*o,this.w=c[3]*t+c[7]*n+c[11]*r+c[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,o;const h=e.elements,f=h[0],d=h[4],p=h[8],m=h[1],v=h[5],M=h[9],E=h[2],x=h[6],_=h[10];if(Math.abs(d-m)<.01&&Math.abs(p-E)<.01&&Math.abs(M-x)<.01){if(Math.abs(d+m)<.1&&Math.abs(p+E)<.1&&Math.abs(M+x)<.1&&Math.abs(f+v+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(f+1)/2,I=(v+1)/2,z=(_+1)/2,O=(d+m)/4,D=(p+E)/4,V=(M+x)/4;return b>I&&b>z?b<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(b),r=O/n,o=D/n):I>z?I<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(I),n=O/r,o=V/r):z<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(z),n=D/o,r=V/o),this.set(n,r,o,t),this}let P=Math.sqrt((x-M)*(x-M)+(p-E)*(p-E)+(m-d)*(m-d));return Math.abs(P)<.001&&(P=1),this.x=(x-M)/P,this.y=(p-E)/P,this.z=(m-d)/P,this.w=Math.acos((f+v+_-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cb extends ns{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new Qt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const c=n.count;for(let l=0;l<c;l++)this.textures[l]=o.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Mg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class es extends Cb{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Eg extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lb extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ci{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,o,c,l){let h=n[r+0],f=n[r+1],d=n[r+2],p=n[r+3];const m=o[c+0],v=o[c+1],M=o[c+2],E=o[c+3];if(l===0){e[t+0]=h,e[t+1]=f,e[t+2]=d,e[t+3]=p;return}if(l===1){e[t+0]=m,e[t+1]=v,e[t+2]=M,e[t+3]=E;return}if(p!==E||h!==m||f!==v||d!==M){let x=1-l;const _=h*m+f*v+d*M+p*E,P=_>=0?1:-1,b=1-_*_;if(b>Number.EPSILON){const z=Math.sqrt(b),O=Math.atan2(z,_*P);x=Math.sin(x*O)/z,l=Math.sin(l*O)/z}const I=l*P;if(h=h*x+m*I,f=f*x+v*I,d=d*x+M*I,p=p*x+E*I,x===1-l){const z=1/Math.sqrt(h*h+f*f+d*d+p*p);h*=z,f*=z,d*=z,p*=z}}e[t]=h,e[t+1]=f,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,o,c){const l=n[r],h=n[r+1],f=n[r+2],d=n[r+3],p=o[c],m=o[c+1],v=o[c+2],M=o[c+3];return e[t]=l*M+d*p+h*v-f*m,e[t+1]=h*M+d*m+f*p-l*v,e[t+2]=f*M+d*v+l*m-h*p,e[t+3]=d*M-l*p-h*m-f*v,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,o=e._z,c=e._order,l=Math.cos,h=Math.sin,f=l(n/2),d=l(r/2),p=l(o/2),m=h(n/2),v=h(r/2),M=h(o/2);switch(c){case"XYZ":this._x=m*d*p+f*v*M,this._y=f*v*p-m*d*M,this._z=f*d*M+m*v*p,this._w=f*d*p-m*v*M;break;case"YXZ":this._x=m*d*p+f*v*M,this._y=f*v*p-m*d*M,this._z=f*d*M-m*v*p,this._w=f*d*p+m*v*M;break;case"ZXY":this._x=m*d*p-f*v*M,this._y=f*v*p+m*d*M,this._z=f*d*M+m*v*p,this._w=f*d*p-m*v*M;break;case"ZYX":this._x=m*d*p-f*v*M,this._y=f*v*p+m*d*M,this._z=f*d*M-m*v*p,this._w=f*d*p+m*v*M;break;case"YZX":this._x=m*d*p+f*v*M,this._y=f*v*p+m*d*M,this._z=f*d*M-m*v*p,this._w=f*d*p-m*v*M;break;case"XZY":this._x=m*d*p-f*v*M,this._y=f*v*p-m*d*M,this._z=f*d*M+m*v*p,this._w=f*d*p+m*v*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],o=t[8],c=t[1],l=t[5],h=t[9],f=t[2],d=t[6],p=t[10],m=n+l+p;if(m>0){const v=.5/Math.sqrt(m+1);this._w=.25/v,this._x=(d-h)*v,this._y=(o-f)*v,this._z=(c-r)*v}else if(n>l&&n>p){const v=2*Math.sqrt(1+n-l-p);this._w=(d-h)/v,this._x=.25*v,this._y=(r+c)/v,this._z=(o+f)/v}else if(l>p){const v=2*Math.sqrt(1+l-n-p);this._w=(o-f)/v,this._x=(r+c)/v,this._y=.25*v,this._z=(h+d)/v}else{const v=2*Math.sqrt(1+p-n-l);this._w=(c-r)/v,this._x=(o+f)/v,this._y=(h+d)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,o=e._z,c=e._w,l=t._x,h=t._y,f=t._z,d=t._w;return this._x=n*d+c*l+r*f-o*h,this._y=r*d+c*h+o*l-n*f,this._z=o*d+c*f+n*h-r*l,this._w=c*d-n*l-r*h-o*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,o=this._z,c=this._w;let l=c*e._w+n*e._x+r*e._y+o*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=c,this._x=n,this._y=r,this._z=o,this;const h=1-l*l;if(h<=Number.EPSILON){const v=1-t;return this._w=v*c+t*this._w,this._x=v*n+t*this._x,this._y=v*r+t*this._y,this._z=v*o+t*this._z,this.normalize(),this}const f=Math.sqrt(h),d=Math.atan2(f,l),p=Math.sin((1-t)*d)/f,m=Math.sin(t*d)/f;return this._w=c*p+this._w*m,this._x=n*p+this._x*m,this._y=r*p+this._y*m,this._z=o*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Op.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Op.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*r,this.y=o[1]*t+o[4]*n+o[7]*r,this.z=o[2]*t+o[5]*n+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=e.elements,c=1/(o[3]*t+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*r+o[12])*c,this.y=(o[1]*t+o[5]*n+o[9]*r+o[13])*c,this.z=(o[2]*t+o[6]*n+o[10]*r+o[14])*c,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,o=e.x,c=e.y,l=e.z,h=e.w,f=2*(c*r-l*n),d=2*(l*t-o*r),p=2*(o*n-c*t);return this.x=t+h*f+c*p-l*d,this.y=n+h*d+l*f-o*p,this.z=r+h*p+o*d-c*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r,this.y=o[1]*t+o[5]*n+o[9]*r,this.z=o[2]*t+o[6]*n+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,o=e.z,c=t.x,l=t.y,h=t.z;return this.x=r*h-o*l,this.y=o*c-n*h,this.z=n*l-r*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return gu.copy(this).projectOnVector(e),this.sub(gu)}reflect(e){return this.sub(gu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gu=new F,Op=new Ci;class _i{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ui.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ui.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ui.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let c=0,l=o.count;c<l;c++)e.isMesh===!0?e.getVertexPosition(c,ui):ui.fromBufferAttribute(o,c),ui.applyMatrix4(e.matrixWorld),this.expandByPoint(ui);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Za.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Za.copy(n.boundingBox)),Za.applyMatrix4(e.matrixWorld),this.union(Za)}const r=e.children;for(let o=0,c=r.length;o<c;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ui),ui.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Io),$a.subVectors(this.max,Io),Es.subVectors(e.a,Io),bs.subVectors(e.b,Io),Ts.subVectors(e.c,Io),pr.subVectors(bs,Es),mr.subVectors(Ts,bs),Gr.subVectors(Es,Ts);let t=[0,-pr.z,pr.y,0,-mr.z,mr.y,0,-Gr.z,Gr.y,pr.z,0,-pr.x,mr.z,0,-mr.x,Gr.z,0,-Gr.x,-pr.y,pr.x,0,-mr.y,mr.x,0,-Gr.y,Gr.x,0];return!_u(t,Es,bs,Ts,$a)||(t=[1,0,0,0,1,0,0,0,1],!_u(t,Es,bs,Ts,$a))?!1:(Ja.crossVectors(pr,mr),t=[Ja.x,Ja.y,Ja.z],_u(t,Es,bs,Ts,$a))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ui).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ui).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Xi=[new F,new F,new F,new F,new F,new F,new F,new F],ui=new F,Za=new _i,Es=new F,bs=new F,Ts=new F,pr=new F,mr=new F,Gr=new F,Io=new F,$a=new F,Ja=new F,Vr=new F;function _u(s,e,t,n,r){for(let o=0,c=s.length-3;o<=c;o+=3){Vr.fromArray(s,o);const l=r.x*Math.abs(Vr.x)+r.y*Math.abs(Vr.y)+r.z*Math.abs(Vr.z),h=e.dot(Vr),f=t.dot(Vr),d=n.dot(Vr);if(Math.max(-Math.max(h,f,d),Math.min(h,f,d))>l)return!1}return!0}const Pb=new _i,Do=new F,vu=new F;class Di{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Pb.setFromPoints(e).getCenter(n);let r=0;for(let o=0,c=e.length;o<c;o++)r=Math.max(r,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Do.subVectors(e,this.center);const t=Do.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Do,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Do.copy(e.center).add(vu)),this.expandByPoint(Do.copy(e.center).sub(vu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qi=new F,xu=new F,Qa=new F,gr=new F,yu=new F,ec=new F,Su=new F;class so{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qi.copy(this.origin).addScaledVector(this.direction,t),qi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){xu.copy(e).add(t).multiplyScalar(.5),Qa.copy(t).sub(e).normalize(),gr.copy(this.origin).sub(xu);const o=e.distanceTo(t)*.5,c=-this.direction.dot(Qa),l=gr.dot(this.direction),h=-gr.dot(Qa),f=gr.lengthSq(),d=Math.abs(1-c*c);let p,m,v,M;if(d>0)if(p=c*h-l,m=c*l-h,M=o*d,p>=0)if(m>=-M)if(m<=M){const E=1/d;p*=E,m*=E,v=p*(p+c*m+2*l)+m*(c*p+m+2*h)+f}else m=o,p=Math.max(0,-(c*m+l)),v=-p*p+m*(m+2*h)+f;else m=-o,p=Math.max(0,-(c*m+l)),v=-p*p+m*(m+2*h)+f;else m<=-M?(p=Math.max(0,-(-c*o+l)),m=p>0?-o:Math.min(Math.max(-o,-h),o),v=-p*p+m*(m+2*h)+f):m<=M?(p=0,m=Math.min(Math.max(-o,-h),o),v=m*(m+2*h)+f):(p=Math.max(0,-(c*o+l)),m=p>0?o:Math.min(Math.max(-o,-h),o),v=-p*p+m*(m+2*h)+f);else m=c>0?-o:o,p=Math.max(0,-(c*m+l)),v=-p*p+m*(m+2*h)+f;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(xu).addScaledVector(Qa,m),v}intersectSphere(e,t){qi.subVectors(e.center,this.origin);const n=qi.dot(this.direction),r=qi.dot(qi)-n*n,o=e.radius*e.radius;if(r>o)return null;const c=Math.sqrt(o-r),l=n-c,h=n+c;return h<0?null:l<0?this.at(h,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,o,c,l,h;const f=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,m=this.origin;return f>=0?(n=(e.min.x-m.x)*f,r=(e.max.x-m.x)*f):(n=(e.max.x-m.x)*f,r=(e.min.x-m.x)*f),d>=0?(o=(e.min.y-m.y)*d,c=(e.max.y-m.y)*d):(o=(e.max.y-m.y)*d,c=(e.min.y-m.y)*d),n>c||o>r||((o>n||isNaN(n))&&(n=o),(c<r||isNaN(r))&&(r=c),p>=0?(l=(e.min.z-m.z)*p,h=(e.max.z-m.z)*p):(l=(e.max.z-m.z)*p,h=(e.min.z-m.z)*p),n>h||l>r)||((l>n||n!==n)&&(n=l),(h<r||r!==r)&&(r=h),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,qi)!==null}intersectTriangle(e,t,n,r,o){yu.subVectors(t,e),ec.subVectors(n,e),Su.crossVectors(yu,ec);let c=this.direction.dot(Su),l;if(c>0){if(r)return null;l=1}else if(c<0)l=-1,c=-c;else return null;gr.subVectors(this.origin,e);const h=l*this.direction.dot(ec.crossVectors(gr,ec));if(h<0)return null;const f=l*this.direction.dot(yu.cross(gr));if(f<0||h+f>c)return null;const d=-l*gr.dot(Su);return d<0?null:this.at(d/c,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,r,o,c,l,h,f,d,p,m,v,M,E,x){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,c,l,h,f,d,p,m,v,M,E,x)}set(e,t,n,r,o,c,l,h,f,d,p,m,v,M,E,x){const _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=r,_[1]=o,_[5]=c,_[9]=l,_[13]=h,_[2]=f,_[6]=d,_[10]=p,_[14]=m,_[3]=v,_[7]=M,_[11]=E,_[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/As.setFromMatrixColumn(e,0).length(),o=1/As.setFromMatrixColumn(e,1).length(),c=1/As.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*c,t[9]=n[9]*c,t[10]=n[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,o=e.z,c=Math.cos(n),l=Math.sin(n),h=Math.cos(r),f=Math.sin(r),d=Math.cos(o),p=Math.sin(o);if(e.order==="XYZ"){const m=c*d,v=c*p,M=l*d,E=l*p;t[0]=h*d,t[4]=-h*p,t[8]=f,t[1]=v+M*f,t[5]=m-E*f,t[9]=-l*h,t[2]=E-m*f,t[6]=M+v*f,t[10]=c*h}else if(e.order==="YXZ"){const m=h*d,v=h*p,M=f*d,E=f*p;t[0]=m+E*l,t[4]=M*l-v,t[8]=c*f,t[1]=c*p,t[5]=c*d,t[9]=-l,t[2]=v*l-M,t[6]=E+m*l,t[10]=c*h}else if(e.order==="ZXY"){const m=h*d,v=h*p,M=f*d,E=f*p;t[0]=m-E*l,t[4]=-c*p,t[8]=M+v*l,t[1]=v+M*l,t[5]=c*d,t[9]=E-m*l,t[2]=-c*f,t[6]=l,t[10]=c*h}else if(e.order==="ZYX"){const m=c*d,v=c*p,M=l*d,E=l*p;t[0]=h*d,t[4]=M*f-v,t[8]=m*f+E,t[1]=h*p,t[5]=E*f+m,t[9]=v*f-M,t[2]=-f,t[6]=l*h,t[10]=c*h}else if(e.order==="YZX"){const m=c*h,v=c*f,M=l*h,E=l*f;t[0]=h*d,t[4]=E-m*p,t[8]=M*p+v,t[1]=p,t[5]=c*d,t[9]=-l*d,t[2]=-f*d,t[6]=v*p+M,t[10]=m-E*p}else if(e.order==="XZY"){const m=c*h,v=c*f,M=l*h,E=l*f;t[0]=h*d,t[4]=-p,t[8]=f*d,t[1]=m*p+E,t[5]=c*d,t[9]=v*p-M,t[2]=M*p-v,t[6]=l*d,t[10]=E*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ib,e,Db)}lookAt(e,t,n){const r=this.elements;return Wn.subVectors(e,t),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),_r.crossVectors(n,Wn),_r.lengthSq()===0&&(Math.abs(n.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),_r.crossVectors(n,Wn)),_r.normalize(),tc.crossVectors(Wn,_r),r[0]=_r.x,r[4]=tc.x,r[8]=Wn.x,r[1]=_r.y,r[5]=tc.y,r[9]=Wn.y,r[2]=_r.z,r[6]=tc.z,r[10]=Wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,c=n[0],l=n[4],h=n[8],f=n[12],d=n[1],p=n[5],m=n[9],v=n[13],M=n[2],E=n[6],x=n[10],_=n[14],P=n[3],b=n[7],I=n[11],z=n[15],O=r[0],D=r[4],V=r[8],C=r[12],w=r[1],X=r[5],J=r[9],k=r[13],te=r[2],ce=r[6],ue=r[10],xe=r[14],Q=r[3],ge=r[7],de=r[11],Ae=r[15];return o[0]=c*O+l*w+h*te+f*Q,o[4]=c*D+l*X+h*ce+f*ge,o[8]=c*V+l*J+h*ue+f*de,o[12]=c*C+l*k+h*xe+f*Ae,o[1]=d*O+p*w+m*te+v*Q,o[5]=d*D+p*X+m*ce+v*ge,o[9]=d*V+p*J+m*ue+v*de,o[13]=d*C+p*k+m*xe+v*Ae,o[2]=M*O+E*w+x*te+_*Q,o[6]=M*D+E*X+x*ce+_*ge,o[10]=M*V+E*J+x*ue+_*de,o[14]=M*C+E*k+x*xe+_*Ae,o[3]=P*O+b*w+I*te+z*Q,o[7]=P*D+b*X+I*ce+z*ge,o[11]=P*V+b*J+I*ue+z*de,o[15]=P*C+b*k+I*xe+z*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],o=e[12],c=e[1],l=e[5],h=e[9],f=e[13],d=e[2],p=e[6],m=e[10],v=e[14],M=e[3],E=e[7],x=e[11],_=e[15];return M*(+o*h*p-r*f*p-o*l*m+n*f*m+r*l*v-n*h*v)+E*(+t*h*v-t*f*m+o*c*m-r*c*v+r*f*d-o*h*d)+x*(+t*f*p-t*l*v-o*c*p+n*c*v+o*l*d-n*f*d)+_*(-r*l*d-t*h*p+t*l*m+r*c*p-n*c*m+n*h*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8],p=e[9],m=e[10],v=e[11],M=e[12],E=e[13],x=e[14],_=e[15],P=p*x*f-E*m*f+E*h*v-l*x*v-p*h*_+l*m*_,b=M*m*f-d*x*f-M*h*v+c*x*v+d*h*_-c*m*_,I=d*E*f-M*p*f+M*l*v-c*E*v-d*l*_+c*p*_,z=M*p*h-d*E*h-M*l*m+c*E*m+d*l*x-c*p*x,O=t*P+n*b+r*I+o*z;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/O;return e[0]=P*D,e[1]=(E*m*o-p*x*o-E*r*v+n*x*v+p*r*_-n*m*_)*D,e[2]=(l*x*o-E*h*o+E*r*f-n*x*f-l*r*_+n*h*_)*D,e[3]=(p*h*o-l*m*o-p*r*f+n*m*f+l*r*v-n*h*v)*D,e[4]=b*D,e[5]=(d*x*o-M*m*o+M*r*v-t*x*v-d*r*_+t*m*_)*D,e[6]=(M*h*o-c*x*o-M*r*f+t*x*f+c*r*_-t*h*_)*D,e[7]=(c*m*o-d*h*o+d*r*f-t*m*f-c*r*v+t*h*v)*D,e[8]=I*D,e[9]=(M*p*o-d*E*o-M*n*v+t*E*v+d*n*_-t*p*_)*D,e[10]=(c*E*o-M*l*o+M*n*f-t*E*f-c*n*_+t*l*_)*D,e[11]=(d*l*o-c*p*o-d*n*f+t*p*f+c*n*v-t*l*v)*D,e[12]=z*D,e[13]=(d*E*r-M*p*r+M*n*m-t*E*m-d*n*x+t*p*x)*D,e[14]=(M*l*r-c*E*r-M*n*h+t*E*h+c*n*x-t*l*x)*D,e[15]=(c*p*r-d*l*r+d*n*h-t*p*h-c*n*m+t*l*m)*D,this}scale(e){const t=this.elements,n=e.x,r=e.y,o=e.z;return t[0]*=n,t[4]*=r,t[8]*=o,t[1]*=n,t[5]*=r,t[9]*=o,t[2]*=n,t[6]*=r,t[10]*=o,t[3]*=n,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),o=1-n,c=e.x,l=e.y,h=e.z,f=o*c,d=o*l;return this.set(f*c+n,f*l-r*h,f*h+r*l,0,f*l+r*h,d*l+n,d*h-r*c,0,f*h-r*l,d*h+r*c,o*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,o,c){return this.set(1,n,o,0,e,1,c,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,o=t._x,c=t._y,l=t._z,h=t._w,f=o+o,d=c+c,p=l+l,m=o*f,v=o*d,M=o*p,E=c*d,x=c*p,_=l*p,P=h*f,b=h*d,I=h*p,z=n.x,O=n.y,D=n.z;return r[0]=(1-(E+_))*z,r[1]=(v+I)*z,r[2]=(M-b)*z,r[3]=0,r[4]=(v-I)*O,r[5]=(1-(m+_))*O,r[6]=(x+P)*O,r[7]=0,r[8]=(M+b)*D,r[9]=(x-P)*D,r[10]=(1-(m+E))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let o=As.set(r[0],r[1],r[2]).length();const c=As.set(r[4],r[5],r[6]).length(),l=As.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],hi.copy(this);const f=1/o,d=1/c,p=1/l;return hi.elements[0]*=f,hi.elements[1]*=f,hi.elements[2]*=f,hi.elements[4]*=d,hi.elements[5]*=d,hi.elements[6]*=d,hi.elements[8]*=p,hi.elements[9]*=p,hi.elements[10]*=p,t.setFromRotationMatrix(hi),n.x=o,n.y=c,n.z=l,this}makePerspective(e,t,n,r,o,c,l=Qi){const h=this.elements,f=2*o/(t-e),d=2*o/(n-r),p=(t+e)/(t-e),m=(n+r)/(n-r);let v,M;if(l===Qi)v=-(c+o)/(c-o),M=-2*c*o/(c-o);else if(l===Fc)v=-c/(c-o),M=-c*o/(c-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=f,h[4]=0,h[8]=p,h[12]=0,h[1]=0,h[5]=d,h[9]=m,h[13]=0,h[2]=0,h[6]=0,h[10]=v,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,r,o,c,l=Qi){const h=this.elements,f=1/(t-e),d=1/(n-r),p=1/(c-o),m=(t+e)*f,v=(n+r)*d;let M,E;if(l===Qi)M=(c+o)*p,E=-2*p;else if(l===Fc)M=o*p,E=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=2*f,h[4]=0,h[8]=0,h[12]=-m,h[1]=0,h[5]=2*d,h[9]=0,h[13]=-v,h[2]=0,h[6]=0,h[10]=E,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const As=new F,hi=new tt,Ib=new F(0,0,0),Db=new F(1,1,1),_r=new F,tc=new F,Wn=new F,Fp=new tt,Bp=new Ci;class Li{constructor(e=0,t=0,n=0,r=Li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,o=r[0],c=r[4],l=r[8],h=r[1],f=r[5],d=r[9],p=r[2],m=r[6],v=r[10];switch(t){case"XYZ":this._y=Math.asin(dn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,v),this._z=Math.atan2(-c,o)):(this._x=Math.atan2(m,f),this._z=0);break;case"YXZ":this._x=Math.asin(-dn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,v),this._z=Math.atan2(h,f)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(dn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,v),this._z=Math.atan2(-c,f)):(this._y=0,this._z=Math.atan2(h,o));break;case"ZYX":this._y=Math.asin(-dn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,v),this._z=Math.atan2(h,o)):(this._x=0,this._z=Math.atan2(-c,f));break;case"YZX":this._z=Math.asin(dn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,f),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(l,v));break;case"XZY":this._z=Math.asin(-dn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(m,f),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-d,v),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bp.setFromEuler(this),this.setFromQuaternion(Bp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Li.DEFAULT_ORDER="XYZ";class Sh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ub=0;const kp=new F,ws=new Ci,Yi=new tt,nc=new F,Uo=new F,Nb=new F,Ob=new Ci,zp=new F(1,0,0),Hp=new F(0,1,0),Gp=new F(0,0,1),Vp={type:"added"},Fb={type:"removed"},Rs={type:"childadded",child:null},Mu={type:"childremoved",child:null};class Mt extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ub++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new F,t=new Li,n=new Ci,r=new F(1,1,1);function o(){n.setFromEuler(t,!1)}function c(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new tt},normalMatrix:{value:new at}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.multiply(ws),this}rotateOnWorldAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.premultiply(ws),this}rotateX(e){return this.rotateOnAxis(zp,e)}rotateY(e){return this.rotateOnAxis(Hp,e)}rotateZ(e){return this.rotateOnAxis(Gp,e)}translateOnAxis(e,t){return kp.copy(e).applyQuaternion(this.quaternion),this.position.add(kp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zp,e)}translateY(e){return this.translateOnAxis(Hp,e)}translateZ(e){return this.translateOnAxis(Gp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?nc.copy(e):nc.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Uo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yi.lookAt(Uo,nc,this.up):Yi.lookAt(nc,Uo,this.up),this.quaternion.setFromRotationMatrix(Yi),r&&(Yi.extractRotation(r.matrixWorld),ws.setFromRotationMatrix(Yi),this.quaternion.premultiply(ws.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vp),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fb),Mu.child=e,this.dispatchEvent(Mu),Mu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vp),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const c=this.children[n].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Uo,e,Nb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Uo,Ob,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let o=0,c=r.length;o<c;o++){const l=r[o];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const h=l.shapes;if(Array.isArray(h))for(let f=0,d=h.length;f<d;f++){const p=h[f];o(e.shapes,p)}else o(e.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let h=0,f=this.material.length;h<f;h++)l.push(o(e.materials,this.material[h]));r.material=l}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const h=this.animations[l];r.animations.push(o(e.animations,h))}}if(t){const l=c(e.geometries),h=c(e.materials),f=c(e.textures),d=c(e.images),p=c(e.shapes),m=c(e.skeletons),v=c(e.animations),M=c(e.nodes);l.length>0&&(n.geometries=l),h.length>0&&(n.materials=h),f.length>0&&(n.textures=f),d.length>0&&(n.images=d),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),v.length>0&&(n.animations=v),M.length>0&&(n.nodes=M)}return n.object=r,n;function c(l){const h=[];for(const f in l){const d=l[f];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Mt.DEFAULT_UP=new F(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fi=new F,ji=new F,Eu=new F,Ki=new F,Cs=new F,Ls=new F,Wp=new F,bu=new F,Tu=new F,Au=new F;class pi{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),fi.subVectors(e,t),r.cross(fi);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,n,r,o){fi.subVectors(r,t),ji.subVectors(n,t),Eu.subVectors(e,t);const c=fi.dot(fi),l=fi.dot(ji),h=fi.dot(Eu),f=ji.dot(ji),d=ji.dot(Eu),p=c*f-l*l;if(p===0)return o.set(0,0,0),null;const m=1/p,v=(f*h-l*d)*m,M=(c*d-l*h)*m;return o.set(1-v-M,M,v)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ki)===null?!1:Ki.x>=0&&Ki.y>=0&&Ki.x+Ki.y<=1}static getInterpolation(e,t,n,r,o,c,l,h){return this.getBarycoord(e,t,n,r,Ki)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(o,Ki.x),h.addScaledVector(c,Ki.y),h.addScaledVector(l,Ki.z),h)}static isFrontFacing(e,t,n,r){return fi.subVectors(n,t),ji.subVectors(e,t),fi.cross(ji).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),fi.cross(ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,o){return pi.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}containsPoint(e){return pi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,o=this.c;let c,l;Cs.subVectors(r,n),Ls.subVectors(o,n),bu.subVectors(e,n);const h=Cs.dot(bu),f=Ls.dot(bu);if(h<=0&&f<=0)return t.copy(n);Tu.subVectors(e,r);const d=Cs.dot(Tu),p=Ls.dot(Tu);if(d>=0&&p<=d)return t.copy(r);const m=h*p-d*f;if(m<=0&&h>=0&&d<=0)return c=h/(h-d),t.copy(n).addScaledVector(Cs,c);Au.subVectors(e,o);const v=Cs.dot(Au),M=Ls.dot(Au);if(M>=0&&v<=M)return t.copy(o);const E=v*f-h*M;if(E<=0&&f>=0&&M<=0)return l=f/(f-M),t.copy(n).addScaledVector(Ls,l);const x=d*M-v*p;if(x<=0&&p-d>=0&&v-M>=0)return Wp.subVectors(o,r),l=(p-d)/(p-d+(v-M)),t.copy(r).addScaledVector(Wp,l);const _=1/(x+E+m);return c=E*_,l=m*_,t.copy(n).addScaledVector(Cs,c).addScaledVector(Ls,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const bg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vr={h:0,s:0,l:0},ic={h:0,s:0,l:0};function wu(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Rt.workingColorSpace){if(e=yh(e,1),t=dn(t,0,1),n=dn(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,c=2*n-o;this.r=wu(c,o,e+1/3),this.g=wu(c,o,e),this.b=wu(c,o,e-1/3)}return Rt.toWorkingColorSpace(this,r),this}setStyle(e,t=cn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const c=r[1],l=r[2];switch(c){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=r[1],c=o.length;if(c===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const n=bg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}copyLinearToSRGB(e){return this.r=pu(e.r),this.g=pu(e.g),this.b=pu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return Rt.fromWorkingColorSpace(yn.copy(this),e),Math.round(dn(yn.r*255,0,255))*65536+Math.round(dn(yn.g*255,0,255))*256+Math.round(dn(yn.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.fromWorkingColorSpace(yn.copy(this),t);const n=yn.r,r=yn.g,o=yn.b,c=Math.max(n,r,o),l=Math.min(n,r,o);let h,f;const d=(l+c)/2;if(l===c)h=0,f=0;else{const p=c-l;switch(f=d<=.5?p/(c+l):p/(2-c-l),c){case n:h=(r-o)/p+(r<o?6:0);break;case r:h=(o-n)/p+2;break;case o:h=(n-r)/p+4;break}h/=6}return e.h=h,e.s=f,e.l=d,e}getRGB(e,t=Rt.workingColorSpace){return Rt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=cn){Rt.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,n=yn.g,r=yn.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(vr),this.setHSL(vr.h+e,vr.s+t,vr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vr),e.getHSL(ic);const n=Zo(vr.h,ic.h,t),r=Zo(vr.s,ic.s,t),o=Zo(vr.l,ic.l,t);return this.setHSL(n,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*r,this.g=o[1]*t+o[4]*n+o[7]*r,this.b=o[2]*t+o[5]*n+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new Ue;Ue.NAMES=bg;let Bb=0;class ii extends ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bb++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=qs,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$u,this.blendDst=Ju,this.blendEquation=$r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Pc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ss,this.stencilZFail=Ss,this.stencilZPass=Ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qs&&(n.blending=this.blending),this.side!==wi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$u&&(n.blendSrc=this.blendSrc),this.blendDst!==Ju&&(n.blendDst=this.blendDst),this.blendEquation!==$r&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pc&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ss&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ss&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ss&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}if(t){const o=r(e.textures),c=r(e.images);o.length>0&&(n.textures=o),c.length>0&&(n.images=c)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Tr extends ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Li,this.combine=sg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zt=new F,rc=new Oe;class en{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=nh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Sg("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rc.fromBufferAttribute(this,t),rc.applyMatrix3(e),this.setXY(t,rc.x,rc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=di(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=di(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=di(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=di(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=di(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array),o=Lt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nh&&(e.usage=this.usage),e}}class Tg extends en{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ag extends en{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class tn extends en{constructor(e,t,n){super(new Float32Array(e),t,n)}}let kb=0;const ti=new tt,Ru=new Mt,Ps=new F,Xn=new _i,No=new _i,an=new F;class un extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kb++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yg(e)?Ag:Tg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new at().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,n){return ti.makeTranslation(e,t,n),this.applyMatrix4(ti),this}scale(e,t,n){return ti.makeScale(e,t,n),this.applyMatrix4(ti),this}lookAt(e){return Ru.lookAt(e),Ru.updateMatrix(),this.applyMatrix4(Ru.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new tn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const o=t[n];Xn.setFromBufferAttribute(o),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let o=0,c=t.length;o<c;o++){const l=t[o];No.setFromBufferAttribute(l),this.morphTargetsRelative?(an.addVectors(Xn.min,No.min),Xn.expandByPoint(an),an.addVectors(Xn.max,No.max),Xn.expandByPoint(an)):(Xn.expandByPoint(No.min),Xn.expandByPoint(No.max))}Xn.getCenter(n);let r=0;for(let o=0,c=e.count;o<c;o++)an.fromBufferAttribute(e,o),r=Math.max(r,n.distanceToSquared(an));if(t)for(let o=0,c=t.length;o<c;o++){const l=t[o],h=this.morphTargetsRelative;for(let f=0,d=l.count;f<d;f++)an.fromBufferAttribute(l,f),h&&(Ps.fromBufferAttribute(e,f),an.add(Ps)),r=Math.max(r,n.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*n.count),4));const c=this.getAttribute("tangent"),l=[],h=[];for(let V=0;V<n.count;V++)l[V]=new F,h[V]=new F;const f=new F,d=new F,p=new F,m=new Oe,v=new Oe,M=new Oe,E=new F,x=new F;function _(V,C,w){f.fromBufferAttribute(n,V),d.fromBufferAttribute(n,C),p.fromBufferAttribute(n,w),m.fromBufferAttribute(o,V),v.fromBufferAttribute(o,C),M.fromBufferAttribute(o,w),d.sub(f),p.sub(f),v.sub(m),M.sub(m);const X=1/(v.x*M.y-M.x*v.y);isFinite(X)&&(E.copy(d).multiplyScalar(M.y).addScaledVector(p,-v.y).multiplyScalar(X),x.copy(p).multiplyScalar(v.x).addScaledVector(d,-M.x).multiplyScalar(X),l[V].add(E),l[C].add(E),l[w].add(E),h[V].add(x),h[C].add(x),h[w].add(x))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let V=0,C=P.length;V<C;++V){const w=P[V],X=w.start,J=w.count;for(let k=X,te=X+J;k<te;k+=3)_(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const b=new F,I=new F,z=new F,O=new F;function D(V){z.fromBufferAttribute(r,V),O.copy(z);const C=l[V];b.copy(C),b.sub(z.multiplyScalar(z.dot(C))).normalize(),I.crossVectors(O,C);const X=I.dot(h[V])<0?-1:1;c.setXYZW(V,b.x,b.y,b.z,X)}for(let V=0,C=P.length;V<C;++V){const w=P[V],X=w.start,J=w.count;for(let k=X,te=X+J;k<te;k+=3)D(e.getX(k+0)),D(e.getX(k+1)),D(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,v=n.count;m<v;m++)n.setXYZ(m,0,0,0);const r=new F,o=new F,c=new F,l=new F,h=new F,f=new F,d=new F,p=new F;if(e)for(let m=0,v=e.count;m<v;m+=3){const M=e.getX(m+0),E=e.getX(m+1),x=e.getX(m+2);r.fromBufferAttribute(t,M),o.fromBufferAttribute(t,E),c.fromBufferAttribute(t,x),d.subVectors(c,o),p.subVectors(r,o),d.cross(p),l.fromBufferAttribute(n,M),h.fromBufferAttribute(n,E),f.fromBufferAttribute(n,x),l.add(d),h.add(d),f.add(d),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(E,h.x,h.y,h.z),n.setXYZ(x,f.x,f.y,f.z)}else for(let m=0,v=t.count;m<v;m+=3)r.fromBufferAttribute(t,m+0),o.fromBufferAttribute(t,m+1),c.fromBufferAttribute(t,m+2),d.subVectors(c,o),p.subVectors(r,o),d.cross(p),n.setXYZ(m+0,d.x,d.y,d.z),n.setXYZ(m+1,d.x,d.y,d.z),n.setXYZ(m+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)an.fromBufferAttribute(e,t),an.normalize(),e.setXYZ(t,an.x,an.y,an.z)}toNonIndexed(){function e(l,h){const f=l.array,d=l.itemSize,p=l.normalized,m=new f.constructor(h.length*d);let v=0,M=0;for(let E=0,x=h.length;E<x;E++){l.isInterleavedBufferAttribute?v=h[E]*l.data.stride+l.offset:v=h[E]*d;for(let _=0;_<d;_++)m[M++]=f[v++]}return new en(m,d,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new un,n=this.index.array,r=this.attributes;for(const l in r){const h=r[l],f=e(h,n);t.setAttribute(l,f)}const o=this.morphAttributes;for(const l in o){const h=[],f=o[l];for(let d=0,p=f.length;d<p;d++){const m=f[d],v=e(m,n);h.push(v)}t.morphAttributes[l]=h}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let l=0,h=c.length;l<h;l++){const f=c[l];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const f in h)h[f]!==void 0&&(e[f]=h[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const f=n[h];e.data.attributes[h]=f.toJSON(e.data)}const r={};let o=!1;for(const h in this.morphAttributes){const f=this.morphAttributes[h],d=[];for(let p=0,m=f.length;p<m;p++){const v=f[p];d.push(v.toJSON(e.data))}d.length>0&&(r[h]=d,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const f in r){const d=r[f];this.setAttribute(f,d.clone(t))}const o=e.morphAttributes;for(const f in o){const d=[],p=o[f];for(let m=0,v=p.length;m<v;m++)d.push(p[m].clone(t));this.morphAttributes[f]=d}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let f=0,d=c.length;f<d;f++){const p=c[f];this.addGroup(p.start,p.count,p.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xp=new tt,Wr=new so,sc=new Di,qp=new F,Is=new F,Ds=new F,Us=new F,Cu=new F,oc=new F,ac=new Oe,cc=new Oe,lc=new Oe,Yp=new F,jp=new F,Kp=new F,uc=new F,hc=new F;class pn extends Mt{constructor(e=new un,t=new Tr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,c=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(o&&l){oc.set(0,0,0);for(let h=0,f=o.length;h<f;h++){const d=l[h],p=o[h];d!==0&&(Cu.fromBufferAttribute(p,e),c?oc.addScaledVector(Cu,d):oc.addScaledVector(Cu.sub(t),d))}t.add(oc)}return t}raycast(e,t){const n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sc.copy(n.boundingSphere),sc.applyMatrix4(o),Wr.copy(e.ray).recast(e.near),!(sc.containsPoint(Wr.origin)===!1&&(Wr.intersectSphere(sc,qp)===null||Wr.origin.distanceToSquared(qp)>(e.far-e.near)**2))&&(Xp.copy(o).invert(),Wr.copy(e.ray).applyMatrix4(Xp),!(n.boundingBox!==null&&Wr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wr)))}_computeIntersections(e,t,n){let r;const o=this.geometry,c=this.material,l=o.index,h=o.attributes.position,f=o.attributes.uv,d=o.attributes.uv1,p=o.attributes.normal,m=o.groups,v=o.drawRange;if(l!==null)if(Array.isArray(c))for(let M=0,E=m.length;M<E;M++){const x=m[M],_=c[x.materialIndex],P=Math.max(x.start,v.start),b=Math.min(l.count,Math.min(x.start+x.count,v.start+v.count));for(let I=P,z=b;I<z;I+=3){const O=l.getX(I),D=l.getX(I+1),V=l.getX(I+2);r=fc(this,_,e,n,f,d,p,O,D,V),r&&(r.faceIndex=Math.floor(I/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const M=Math.max(0,v.start),E=Math.min(l.count,v.start+v.count);for(let x=M,_=E;x<_;x+=3){const P=l.getX(x),b=l.getX(x+1),I=l.getX(x+2);r=fc(this,c,e,n,f,d,p,P,b,I),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(h!==void 0)if(Array.isArray(c))for(let M=0,E=m.length;M<E;M++){const x=m[M],_=c[x.materialIndex],P=Math.max(x.start,v.start),b=Math.min(h.count,Math.min(x.start+x.count,v.start+v.count));for(let I=P,z=b;I<z;I+=3){const O=I,D=I+1,V=I+2;r=fc(this,_,e,n,f,d,p,O,D,V),r&&(r.faceIndex=Math.floor(I/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const M=Math.max(0,v.start),E=Math.min(h.count,v.start+v.count);for(let x=M,_=E;x<_;x+=3){const P=x,b=x+1,I=x+2;r=fc(this,c,e,n,f,d,p,P,b,I),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function zb(s,e,t,n,r,o,c,l){let h;if(e.side===Fn?h=n.intersectTriangle(c,o,r,!0,l):h=n.intersectTriangle(r,o,c,e.side===wi,l),h===null)return null;hc.copy(l),hc.applyMatrix4(s.matrixWorld);const f=t.ray.origin.distanceTo(hc);return f<t.near||f>t.far?null:{distance:f,point:hc.clone(),object:s}}function fc(s,e,t,n,r,o,c,l,h,f){s.getVertexPosition(l,Is),s.getVertexPosition(h,Ds),s.getVertexPosition(f,Us);const d=zb(s,e,t,n,Is,Ds,Us,uc);if(d){r&&(ac.fromBufferAttribute(r,l),cc.fromBufferAttribute(r,h),lc.fromBufferAttribute(r,f),d.uv=pi.getInterpolation(uc,Is,Ds,Us,ac,cc,lc,new Oe)),o&&(ac.fromBufferAttribute(o,l),cc.fromBufferAttribute(o,h),lc.fromBufferAttribute(o,f),d.uv1=pi.getInterpolation(uc,Is,Ds,Us,ac,cc,lc,new Oe)),c&&(Yp.fromBufferAttribute(c,l),jp.fromBufferAttribute(c,h),Kp.fromBufferAttribute(c,f),d.normal=pi.getInterpolation(uc,Is,Ds,Us,Yp,jp,Kp,new F),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:l,b:h,c:f,normal:new F,materialIndex:0};pi.getNormal(Is,Ds,Us,p.normal),d.face=p}return d}class Lr extends un{constructor(e=1,t=1,n=1,r=1,o=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:o,depthSegments:c};const l=this;r=Math.floor(r),o=Math.floor(o),c=Math.floor(c);const h=[],f=[],d=[],p=[];let m=0,v=0;M("z","y","x",-1,-1,n,t,e,c,o,0),M("z","y","x",1,-1,n,t,-e,c,o,1),M("x","z","y",1,1,e,n,t,r,c,2),M("x","z","y",1,-1,e,n,-t,r,c,3),M("x","y","z",1,-1,e,t,n,r,o,4),M("x","y","z",-1,-1,e,t,-n,r,o,5),this.setIndex(h),this.setAttribute("position",new tn(f,3)),this.setAttribute("normal",new tn(d,3)),this.setAttribute("uv",new tn(p,2));function M(E,x,_,P,b,I,z,O,D,V,C){const w=I/D,X=z/V,J=I/2,k=z/2,te=O/2,ce=D+1,ue=V+1;let xe=0,Q=0;const ge=new F;for(let de=0;de<ue;de++){const Ae=de*X-k;for(let ct=0;ct<ce;ct++){const bt=ct*w-J;ge[E]=bt*P,ge[x]=Ae*b,ge[_]=te,f.push(ge.x,ge.y,ge.z),ge[E]=0,ge[x]=0,ge[_]=O>0?1:-1,d.push(ge.x,ge.y,ge.z),p.push(ct/D),p.push(1-de/V),xe+=1}}for(let de=0;de<V;de++)for(let Ae=0;Ae<D;Ae++){const ct=m+Ae+ce*de,bt=m+Ae+ce*(de+1),ie=m+(Ae+1)+ce*(de+1),me=m+(Ae+1)+ce*de;h.push(ct,bt,me),h.push(bt,ie,me),Q+=6}l.addGroup(v,Q,C),v+=Q,m+=xe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function no(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const r=s[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Rn(s){const e={};for(let t=0;t<s.length;t++){const n=no(s[t]);for(const r in n)e[r]=n[r]}return e}function Hb(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function wg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const Gb={clone:no,merge:Rn};var Vb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pr extends ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vb,this.fragmentShader=Wb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=no(e.uniforms),this.uniformsGroups=Hb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const c=this.uniforms[r].value;c&&c.isTexture?t.uniforms[r]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[r]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[r]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[r]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[r]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[r]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[r]={type:"m4",value:c.toArray()}:t.uniforms[r]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Rg extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=Qi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xr=new F,Zp=new Oe,$p=new Oe;class Cn extends Rg{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=to*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ko*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return to*2*Math.atan(Math.tan(Ko*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xr.x,xr.y).multiplyScalar(-e/xr.z),xr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xr.x,xr.y).multiplyScalar(-e/xr.z)}getViewSize(e,t){return this.getViewBounds(e,Zp,$p),t.subVectors($p,Zp)}setViewOffset(e,t,n,r,o,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ko*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,o=-.5*r;const c=this.view;if(this.view!==null&&this.view.enabled){const h=c.fullWidth,f=c.fullHeight;o+=c.offsetX*r/h,t-=c.offsetY*n/f,r*=c.width/h,n*=c.height/f}const l=this.filmOffset;l!==0&&(o+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ns=-90,Os=1;class Xb extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Cn(Ns,Os,e,t);r.layers=this.layers,this.add(r);const o=new Cn(Ns,Os,e,t);o.layers=this.layers,this.add(o);const c=new Cn(Ns,Os,e,t);c.layers=this.layers,this.add(c);const l=new Cn(Ns,Os,e,t);l.layers=this.layers,this.add(l);const h=new Cn(Ns,Os,e,t);h.layers=this.layers,this.add(h);const f=new Cn(Ns,Os,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,o,c,l,h]=t;for(const f of t)this.remove(f);if(e===Qi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Fc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,c,l,h,f,d]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,o),e.setRenderTarget(n,1,r),e.render(t,c),e.setRenderTarget(n,2,r),e.render(t,l),e.setRenderTarget(n,3,r),e.render(t,h),e.setRenderTarget(n,4,r),e.render(t,f),n.texture.generateMipmaps=E,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(p,m,v),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class Cg extends Qt{constructor(e,t,n,r,o,c,l,h,f,d){e=e!==void 0?e:[],t=t!==void 0?t:Zs,super(e,t,n,r,o,c,l,h,f,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Lg extends es{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Cg(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Nn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Lr(5,5,5),o=new Pr({name:"CubemapFromEquirect",uniforms:no(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:Rr});o.uniforms.tEquirect.value=t;const c=new pn(r,o),l=t.minFilter;return t.minFilter===Ji&&(t.minFilter=Nn),new Xb(1,10,this).update(e,c),t.minFilter=l,c.geometry.dispose(),c.material.dispose(),this}clear(e,t,n,r){const o=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,n,r);e.setRenderTarget(o)}}const Lu=new F,qb=new F,Yb=new at;class Sr{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Lu.subVectors(n,t).cross(qb.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Lu),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yb.getNormalMatrix(e),r=this.coplanarPoint(Lu).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xr=new Di,dc=new F;class Mh{constructor(e=new Sr,t=new Sr,n=new Sr,r=new Sr,o=new Sr,c=new Sr){this.planes=[e,t,n,r,o,c]}set(e,t,n,r,o,c){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(r),l[4].copy(o),l[5].copy(c),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qi){const n=this.planes,r=e.elements,o=r[0],c=r[1],l=r[2],h=r[3],f=r[4],d=r[5],p=r[6],m=r[7],v=r[8],M=r[9],E=r[10],x=r[11],_=r[12],P=r[13],b=r[14],I=r[15];if(n[0].setComponents(h-o,m-f,x-v,I-_).normalize(),n[1].setComponents(h+o,m+f,x+v,I+_).normalize(),n[2].setComponents(h+c,m+d,x+M,I+P).normalize(),n[3].setComponents(h-c,m-d,x-M,I-P).normalize(),n[4].setComponents(h-l,m-p,x-E,I-b).normalize(),t===Qi)n[5].setComponents(h+l,m+p,x+E,I+b).normalize();else if(t===Fc)n[5].setComponents(l,p,E,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xr)}intersectsSprite(e){return Xr.center.set(0,0,0),Xr.radius=.7071067811865476,Xr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xr)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(dc.x=r.normal.x>0?e.max.x:e.min.x,dc.y=r.normal.y>0?e.max.y:e.min.y,dc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(dc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Pg(){let s=null,e=!1,t=null,n=null;function r(o,c){t(o,c),n=s.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(r),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){s=o}}}function jb(s){const e=new WeakMap;function t(l,h){const f=l.array,d=l.usage,p=f.byteLength,m=s.createBuffer();s.bindBuffer(h,m),s.bufferData(h,f,d),l.onUploadCallback();let v;if(f instanceof Float32Array)v=s.FLOAT;else if(f instanceof Uint16Array)l.isFloat16BufferAttribute?v=s.HALF_FLOAT:v=s.UNSIGNED_SHORT;else if(f instanceof Int16Array)v=s.SHORT;else if(f instanceof Uint32Array)v=s.UNSIGNED_INT;else if(f instanceof Int32Array)v=s.INT;else if(f instanceof Int8Array)v=s.BYTE;else if(f instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:v,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:p}}function n(l,h,f){const d=h.array,p=h._updateRange,m=h.updateRanges;if(s.bindBuffer(f,l),p.count===-1&&m.length===0&&s.bufferSubData(f,0,d),m.length!==0){for(let v=0,M=m.length;v<M;v++){const E=m[v];s.bufferSubData(f,E.start*d.BYTES_PER_ELEMENT,d,E.start,E.count)}h.clearUpdateRanges()}p.count!==-1&&(s.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count),p.count=-1),h.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=e.get(l);h&&(s.deleteBuffer(h.buffer),e.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=e.get(l);(!d||d.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=e.get(l);if(f===void 0)e.set(l,t(l,h));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(f.buffer,l,h),f.version=l.version}}return{get:r,remove:o,update:c}}class oo extends un{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const o=e/2,c=t/2,l=Math.floor(n),h=Math.floor(r),f=l+1,d=h+1,p=e/l,m=t/h,v=[],M=[],E=[],x=[];for(let _=0;_<d;_++){const P=_*m-c;for(let b=0;b<f;b++){const I=b*p-o;M.push(I,-P,0),E.push(0,0,1),x.push(b/l),x.push(1-_/h)}}for(let _=0;_<h;_++)for(let P=0;P<l;P++){const b=P+f*_,I=P+f*(_+1),z=P+1+f*(_+1),O=P+1+f*_;v.push(b,I,O),v.push(I,z,O)}this.setIndex(v),this.setAttribute("position",new tn(M,3)),this.setAttribute("normal",new tn(E,3)),this.setAttribute("uv",new tn(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.width,e.height,e.widthSegments,e.heightSegments)}}var Kb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zb=`#ifdef USE_ALPHAHASH
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
#endif`,$b=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,eT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tT=`#ifdef USE_AOMAP
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
#endif`,nT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iT=`#ifdef USE_BATCHING
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
#endif`,rT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,sT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,oT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,aT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cT=`#ifdef USE_IRIDESCENCE
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
#endif`,lT=`#ifdef USE_BUMPMAP
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
#endif`,uT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,_T=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,vT=`#define PI 3.141592653589793
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
} // validated`,xT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yT=`vec3 transformedNormal = objectNormal;
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
#endif`,ST=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,MT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ET=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,TT="gl_FragColor = linearToOutputTexel( gl_FragColor );",AT=`
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
}`,wT=`#ifdef USE_ENVMAP
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
#endif`,RT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,CT=`#ifdef USE_ENVMAP
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
#endif`,LT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,PT=`#ifdef USE_ENVMAP
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
#endif`,IT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,DT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,UT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,NT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,OT=`#ifdef USE_GRADIENTMAP
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
}`,FT=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,BT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,HT=`uniform bool receiveShadow;
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
#endif`,GT=`#ifdef USE_ENVMAP
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
#endif`,VT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,WT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,XT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,YT=`PhysicalMaterial material;
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
#endif`,jT=`struct PhysicalMaterial {
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
}`,KT=`
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
#endif`,ZT=`#if defined( RE_IndirectDiffuse )
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
#endif`,$T=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,JT=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,QT=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eA=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tA=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,iA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sA=`#if defined( USE_POINTS_UV )
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
#endif`,oA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lA=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uA=`#ifdef USE_MORPHNORMALS
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
#endif`,hA=`#ifdef USE_MORPHTARGETS
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
#endif`,fA=`#ifdef USE_MORPHTARGETS
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
#endif`,dA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,pA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,mA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_A=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vA=`#ifdef USE_NORMALMAP
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
#endif`,xA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,SA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,MA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,EA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,TA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,AA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,RA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,CA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,LA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,IA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,DA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,UA=`float getShadowMask() {
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
}`,NA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,OA=`#ifdef USE_SKINNING
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
#endif`,FA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,BA=`#ifdef USE_SKINNING
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
#endif`,kA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,HA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,GA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,VA=`#ifdef USE_TRANSMISSION
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
#endif`,WA=`#ifdef USE_TRANSMISSION
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
#endif`,XA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,YA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const KA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ZA=`uniform sampler2D t2D;
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
}`,$A=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,QA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ew=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tw=`#include <common>
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
}`,nw=`#if DEPTH_PACKING == 3200
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
}`,iw=`#define DISTANCE
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
}`,rw=`#define DISTANCE
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
}`,sw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ow=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aw=`uniform float scale;
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
}`,cw=`uniform vec3 diffuse;
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
}`,lw=`#include <common>
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
}`,uw=`uniform vec3 diffuse;
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
}`,hw=`#define LAMBERT
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
}`,fw=`#define LAMBERT
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
}`,dw=`#define MATCAP
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
}`,pw=`#define MATCAP
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
}`,mw=`#define NORMAL
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
}`,gw=`#define NORMAL
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
}`,_w=`#define PHONG
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
}`,vw=`#define PHONG
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
}`,xw=`#define STANDARD
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
}`,yw=`#define STANDARD
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
}`,Sw=`#define TOON
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
}`,Mw=`#define TOON
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
}`,Ew=`uniform float size;
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
}`,bw=`uniform vec3 diffuse;
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
}`,Tw=`#include <common>
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
}`,Aw=`uniform vec3 color;
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
}`,ww=`uniform float rotation;
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
}`,Rw=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:Kb,alphahash_pars_fragment:Zb,alphamap_fragment:$b,alphamap_pars_fragment:Jb,alphatest_fragment:Qb,alphatest_pars_fragment:eT,aomap_fragment:tT,aomap_pars_fragment:nT,batching_pars_vertex:iT,batching_vertex:rT,begin_vertex:sT,beginnormal_vertex:oT,bsdfs:aT,iridescence_fragment:cT,bumpmap_pars_fragment:lT,clipping_planes_fragment:uT,clipping_planes_pars_fragment:hT,clipping_planes_pars_vertex:fT,clipping_planes_vertex:dT,color_fragment:pT,color_pars_fragment:mT,color_pars_vertex:gT,color_vertex:_T,common:vT,cube_uv_reflection_fragment:xT,defaultnormal_vertex:yT,displacementmap_pars_vertex:ST,displacementmap_vertex:MT,emissivemap_fragment:ET,emissivemap_pars_fragment:bT,colorspace_fragment:TT,colorspace_pars_fragment:AT,envmap_fragment:wT,envmap_common_pars_fragment:RT,envmap_pars_fragment:CT,envmap_pars_vertex:LT,envmap_physical_pars_fragment:GT,envmap_vertex:PT,fog_vertex:IT,fog_pars_vertex:DT,fog_fragment:UT,fog_pars_fragment:NT,gradientmap_pars_fragment:OT,lightmap_fragment:FT,lightmap_pars_fragment:BT,lights_lambert_fragment:kT,lights_lambert_pars_fragment:zT,lights_pars_begin:HT,lights_toon_fragment:VT,lights_toon_pars_fragment:WT,lights_phong_fragment:XT,lights_phong_pars_fragment:qT,lights_physical_fragment:YT,lights_physical_pars_fragment:jT,lights_fragment_begin:KT,lights_fragment_maps:ZT,lights_fragment_end:$T,logdepthbuf_fragment:JT,logdepthbuf_pars_fragment:QT,logdepthbuf_pars_vertex:eA,logdepthbuf_vertex:tA,map_fragment:nA,map_pars_fragment:iA,map_particle_fragment:rA,map_particle_pars_fragment:sA,metalnessmap_fragment:oA,metalnessmap_pars_fragment:aA,morphinstance_vertex:cA,morphcolor_vertex:lA,morphnormal_vertex:uA,morphtarget_pars_vertex:hA,morphtarget_vertex:fA,normal_fragment_begin:dA,normal_fragment_maps:pA,normal_pars_fragment:mA,normal_pars_vertex:gA,normal_vertex:_A,normalmap_pars_fragment:vA,clearcoat_normal_fragment_begin:xA,clearcoat_normal_fragment_maps:yA,clearcoat_pars_fragment:SA,iridescence_pars_fragment:MA,opaque_fragment:EA,packing:bA,premultiplied_alpha_fragment:TA,project_vertex:AA,dithering_fragment:wA,dithering_pars_fragment:RA,roughnessmap_fragment:CA,roughnessmap_pars_fragment:LA,shadowmap_pars_fragment:PA,shadowmap_pars_vertex:IA,shadowmap_vertex:DA,shadowmask_pars_fragment:UA,skinbase_vertex:NA,skinning_pars_vertex:OA,skinning_vertex:FA,skinnormal_vertex:BA,specularmap_fragment:kA,specularmap_pars_fragment:zA,tonemapping_fragment:HA,tonemapping_pars_fragment:GA,transmission_fragment:VA,transmission_pars_fragment:WA,uv_pars_fragment:XA,uv_pars_vertex:qA,uv_vertex:YA,worldpos_vertex:jA,background_vert:KA,background_frag:ZA,backgroundCube_vert:$A,backgroundCube_frag:JA,cube_vert:QA,cube_frag:ew,depth_vert:tw,depth_frag:nw,distanceRGBA_vert:iw,distanceRGBA_frag:rw,equirect_vert:sw,equirect_frag:ow,linedashed_vert:aw,linedashed_frag:cw,meshbasic_vert:lw,meshbasic_frag:uw,meshlambert_vert:hw,meshlambert_frag:fw,meshmatcap_vert:dw,meshmatcap_frag:pw,meshnormal_vert:mw,meshnormal_frag:gw,meshphong_vert:_w,meshphong_frag:vw,meshphysical_vert:xw,meshphysical_frag:yw,meshtoon_vert:Sw,meshtoon_frag:Mw,points_vert:Ew,points_frag:bw,shadow_vert:Tw,shadow_frag:Aw,sprite_vert:ww,sprite_frag:Rw},Se={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},envMapRotation:{value:new at},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},bi={basic:{uniforms:Rn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:Rn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ue(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:Rn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:Rn([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:Rn([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ue(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:Rn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:Rn([Se.points,Se.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:Rn([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:Rn([Se.common,Se.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:Rn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:Rn([Se.sprite,Se.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new at}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:Rn([Se.common,Se.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:Rn([Se.lights,Se.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};bi.physical={uniforms:Rn([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const pc={r:0,b:0,g:0},qr=new Li,Cw=new tt;function Lw(s,e,t,n,r,o,c){const l=new Ue(0);let h=o===!0?0:1,f,d,p=null,m=0,v=null;function M(x,_){let P=!1,b=_.isScene===!0?_.background:null;b&&b.isTexture&&(b=(_.backgroundBlurriness>0?t:e).get(b)),b===null?E(l,h):b&&b.isColor&&(E(b,1),P=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,c):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(s.autoClear||P)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Hc)?(d===void 0&&(d=new pn(new Lr(1,1,1),new Pr({name:"BackgroundCubeMaterial",uniforms:no(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(z,O,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),qr.copy(_.backgroundRotation),qr.x*=-1,qr.y*=-1,qr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),d.material.uniforms.envMap.value=b,d.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Cw.makeRotationFromEuler(qr)),d.material.toneMapped=Rt.getTransfer(b.colorSpace)!==kt,(p!==b||m!==b.version||v!==s.toneMapping)&&(d.material.needsUpdate=!0,p=b,m=b.version,v=s.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):b&&b.isTexture&&(f===void 0&&(f=new pn(new oo(2,2),new Pr({name:"BackgroundMaterial",uniforms:no(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=b,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.toneMapped=Rt.getTransfer(b.colorSpace)!==kt,b.matrixAutoUpdate===!0&&b.updateMatrix(),f.material.uniforms.uvTransform.value.copy(b.matrix),(p!==b||m!==b.version||v!==s.toneMapping)&&(f.material.needsUpdate=!0,p=b,m=b.version,v=s.toneMapping),f.layers.enableAll(),x.unshift(f,f.geometry,f.material,0,0,null))}function E(x,_){x.getRGB(pc,wg(s)),n.buffers.color.setClear(pc.r,pc.g,pc.b,_,c)}return{getClearColor:function(){return l},setClearColor:function(x,_=1){l.set(x),h=_,E(l,h)},getClearAlpha:function(){return h},setClearAlpha:function(x){h=x,E(l,h)},render:M}}function Pw(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},r=m(null);let o=r,c=!1;function l(w,X,J,k,te){let ce=!1;const ue=p(k,J,X);o!==ue&&(o=ue,f(o.object)),ce=v(w,k,J,te),ce&&M(w,k,J,te),te!==null&&e.update(te,s.ELEMENT_ARRAY_BUFFER),(ce||c)&&(c=!1,I(w,X,J,k),te!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(te).buffer))}function h(){return s.createVertexArray()}function f(w){return s.bindVertexArray(w)}function d(w){return s.deleteVertexArray(w)}function p(w,X,J){const k=J.wireframe===!0;let te=n[w.id];te===void 0&&(te={},n[w.id]=te);let ce=te[X.id];ce===void 0&&(ce={},te[X.id]=ce);let ue=ce[k];return ue===void 0&&(ue=m(h()),ce[k]=ue),ue}function m(w){const X=[],J=[],k=[];for(let te=0;te<t;te++)X[te]=0,J[te]=0,k[te]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:J,attributeDivisors:k,object:w,attributes:{},index:null}}function v(w,X,J,k){const te=o.attributes,ce=X.attributes;let ue=0;const xe=J.getAttributes();for(const Q in xe)if(xe[Q].location>=0){const de=te[Q];let Ae=ce[Q];if(Ae===void 0&&(Q==="instanceMatrix"&&w.instanceMatrix&&(Ae=w.instanceMatrix),Q==="instanceColor"&&w.instanceColor&&(Ae=w.instanceColor)),de===void 0||de.attribute!==Ae||Ae&&de.data!==Ae.data)return!0;ue++}return o.attributesNum!==ue||o.index!==k}function M(w,X,J,k){const te={},ce=X.attributes;let ue=0;const xe=J.getAttributes();for(const Q in xe)if(xe[Q].location>=0){let de=ce[Q];de===void 0&&(Q==="instanceMatrix"&&w.instanceMatrix&&(de=w.instanceMatrix),Q==="instanceColor"&&w.instanceColor&&(de=w.instanceColor));const Ae={};Ae.attribute=de,de&&de.data&&(Ae.data=de.data),te[Q]=Ae,ue++}o.attributes=te,o.attributesNum=ue,o.index=k}function E(){const w=o.newAttributes;for(let X=0,J=w.length;X<J;X++)w[X]=0}function x(w){_(w,0)}function _(w,X){const J=o.newAttributes,k=o.enabledAttributes,te=o.attributeDivisors;J[w]=1,k[w]===0&&(s.enableVertexAttribArray(w),k[w]=1),te[w]!==X&&(s.vertexAttribDivisor(w,X),te[w]=X)}function P(){const w=o.newAttributes,X=o.enabledAttributes;for(let J=0,k=X.length;J<k;J++)X[J]!==w[J]&&(s.disableVertexAttribArray(J),X[J]=0)}function b(w,X,J,k,te,ce,ue){ue===!0?s.vertexAttribIPointer(w,X,J,te,ce):s.vertexAttribPointer(w,X,J,k,te,ce)}function I(w,X,J,k){E();const te=k.attributes,ce=J.getAttributes(),ue=X.defaultAttributeValues;for(const xe in ce){const Q=ce[xe];if(Q.location>=0){let ge=te[xe];if(ge===void 0&&(xe==="instanceMatrix"&&w.instanceMatrix&&(ge=w.instanceMatrix),xe==="instanceColor"&&w.instanceColor&&(ge=w.instanceColor)),ge!==void 0){const de=ge.normalized,Ae=ge.itemSize,ct=e.get(ge);if(ct===void 0)continue;const bt=ct.buffer,ie=ct.type,me=ct.bytesPerElement,Re=ie===s.INT||ie===s.UNSIGNED_INT||ge.gpuType===lg;if(ge.isInterleavedBufferAttribute){const be=ge.data,qe=be.stride,Ye=ge.offset;if(be.isInstancedInterleavedBuffer){for(let ft=0;ft<Q.locationSize;ft++)_(Q.location+ft,be.meshPerAttribute);w.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let ft=0;ft<Q.locationSize;ft++)x(Q.location+ft);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let ft=0;ft<Q.locationSize;ft++)b(Q.location+ft,Ae/Q.locationSize,ie,de,qe*me,(Ye+Ae/Q.locationSize*ft)*me,Re)}else{if(ge.isInstancedBufferAttribute){for(let be=0;be<Q.locationSize;be++)_(Q.location+be,ge.meshPerAttribute);w.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let be=0;be<Q.locationSize;be++)x(Q.location+be);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let be=0;be<Q.locationSize;be++)b(Q.location+be,Ae/Q.locationSize,ie,de,Ae*me,Ae/Q.locationSize*be*me,Re)}}else if(ue!==void 0){const de=ue[xe];if(de!==void 0)switch(de.length){case 2:s.vertexAttrib2fv(Q.location,de);break;case 3:s.vertexAttrib3fv(Q.location,de);break;case 4:s.vertexAttrib4fv(Q.location,de);break;default:s.vertexAttrib1fv(Q.location,de)}}}}P()}function z(){V();for(const w in n){const X=n[w];for(const J in X){const k=X[J];for(const te in k)d(k[te].object),delete k[te];delete X[J]}delete n[w]}}function O(w){if(n[w.id]===void 0)return;const X=n[w.id];for(const J in X){const k=X[J];for(const te in k)d(k[te].object),delete k[te];delete X[J]}delete n[w.id]}function D(w){for(const X in n){const J=n[X];if(J[w.id]===void 0)continue;const k=J[w.id];for(const te in k)d(k[te].object),delete k[te];delete J[w.id]}}function V(){C(),c=!0,o!==r&&(o=r,f(o.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:V,resetDefaultState:C,dispose:z,releaseStatesOfGeometry:O,releaseStatesOfProgram:D,initAttributes:E,enableAttribute:x,disableUnusedAttributes:P}}function Iw(s,e,t){let n;function r(h){n=h}function o(h,f){s.drawArrays(n,h,f),t.update(f,n,1)}function c(h,f,d){d!==0&&(s.drawArraysInstanced(n,h,f,d),t.update(f,n,d))}function l(h,f,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d;m++)this.render(h[m],f[m]);else{p.multiDrawArraysWEBGL(n,h,0,f,0,d);let m=0;for(let v=0;v<d;v++)m+=f[v];t.update(m,n,1)}}this.setMode=r,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Dw(s,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const l=o(c);l!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",l,"instead."),c=l);const h=t.logarithmicDepthBuffer===!0,f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,P=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,precision:c,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:m,maxAttributes:v,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:_,maxSamples:P}}function Uw(s){const e=this;let t=null,n=0,r=!1,o=!1;const c=new Sr,l=new at,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const v=p.length!==0||m||n!==0||r;return r=m,n=p.length,v},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,m){t=d(p,m,0)},this.setState=function(p,m,v){const M=p.clippingPlanes,E=p.clipIntersection,x=p.clipShadows,_=s.get(p);if(!r||M===null||M.length===0||o&&!x)o?d(null):f();else{const P=o?0:n,b=P*4;let I=_.clippingState||null;h.value=I,I=d(M,m,b,v);for(let z=0;z!==b;++z)I[z]=t[z];_.clippingState=I,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=P}};function f(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(p,m,v,M){const E=p!==null?p.length:0;let x=null;if(E!==0){if(x=h.value,M!==!0||x===null){const _=v+E*4,P=m.matrixWorldInverse;l.getNormalMatrix(P),(x===null||x.length<_)&&(x=new Float32Array(_));for(let b=0,I=v;b!==E;++b,I+=4)c.copy(p[b]).applyMatrix4(P,l),c.normal.toArray(x,I),x[I+3]=c.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,x}}function Nw(s){let e=new WeakMap;function t(c,l){return l===Qu?c.mapping=Zs:l===eh&&(c.mapping=$s),c}function n(c){if(c&&c.isTexture){const l=c.mapping;if(l===Qu||l===eh)if(e.has(c)){const h=e.get(c).texture;return t(h,c.mapping)}else{const h=c.image;if(h&&h.height>0){const f=new Lg(h.height);return f.fromEquirectangularTexture(s,c),e.set(c,f),c.addEventListener("dispose",r),t(f.texture,c.mapping)}else return null}}return c}function r(c){const l=c.target;l.removeEventListener("dispose",r);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}class Vc extends Rg{constructor(e=-1,t=1,n=1,r=-1,o=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=o,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,o,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=n-e,c=n+e,l=r+t,h=r-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,c=o+f*this.view.width,l-=d*this.view.offsetY,h=l-d*this.view.height}this.projectionMatrix.makeOrthographic(o,c,l,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ws=4,Jp=[.125,.215,.35,.446,.526,.582],Jr=20,Pu=new Vc,Qp=new Ue;let Iu=null,Du=0,Uu=0,Nu=!1;const Kr=(1+Math.sqrt(5))/2,Fs=1/Kr,em=[new F(1,1,1),new F(-1,1,1),new F(1,1,-1),new F(-1,1,-1),new F(0,Kr,Fs),new F(0,Kr,-Fs),new F(Fs,0,Kr),new F(-Fs,0,Kr),new F(Kr,Fs,0),new F(-Kr,Fs,0)];class tm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Iu=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Uu=this._renderer.getActiveMipmapLevel(),Nu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=im(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Iu,Du,Uu),this._renderer.xr.enabled=Nu,e.scissorTest=!1,mc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zs||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Iu=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Uu=this._renderer.getActiveMipmapLevel(),Nu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:Dc,format:mi,colorSpace:ln,depthBuffer:!1},r=nm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nm(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ow(o)),this._blurMaterial=Fw(o,e,t)}return r}_compileMaterial(e){const t=new pn(this._lodPlanes[0],e);this._renderer.compile(t,Pu)}_sceneToCubeUV(e,t,n,r){const l=new Cn(90,1,t,n),h=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,m=d.toneMapping;d.getClearColor(Qp),d.toneMapping=tr,d.autoClear=!1;const v=new Tr({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),M=new pn(new Lr,v);let E=!1;const x=e.background;x?x.isColor&&(v.color.copy(x),e.background=null,E=!0):(v.color.copy(Qp),E=!0);for(let _=0;_<6;_++){const P=_%3;P===0?(l.up.set(0,h[_],0),l.lookAt(f[_],0,0)):P===1?(l.up.set(0,0,h[_]),l.lookAt(0,f[_],0)):(l.up.set(0,h[_],0),l.lookAt(0,0,f[_]));const b=this._cubeSize;mc(r,P*b,_>2?b:0,b,b),d.setRenderTarget(r),E&&d.render(M,l),d.render(e,l)}M.geometry.dispose(),M.material.dispose(),d.toneMapping=m,d.autoClear=p,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Zs||e.mapping===$s;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=rm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=im());const o=r?this._cubemapMaterial:this._equirectMaterial,c=new pn(this._lodPlanes[0],o),l=o.uniforms;l.envMap.value=e;const h=this._cubeSize;mc(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(c,Pu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),c=em[(r-1)%em.length];this._blur(e,r-1,r,o,c)}t.autoClear=n}_blur(e,t,n,r,o){const c=this._pingPongRenderTarget;this._halfBlur(e,c,t,n,r,"latitudinal",o),this._halfBlur(c,e,n,n,r,"longitudinal",o)}_halfBlur(e,t,n,r,o,c,l){const h=this._renderer,f=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,p=new pn(this._lodPlanes[r],f),m=f.uniforms,v=this._sizeLods[n]-1,M=isFinite(o)?Math.PI/(2*v):2*Math.PI/(2*Jr-1),E=o/M,x=isFinite(o)?1+Math.floor(d*E):Jr;x>Jr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Jr}`);const _=[];let P=0;for(let D=0;D<Jr;++D){const V=D/E,C=Math.exp(-V*V/2);_.push(C),D===0?P+=C:D<x&&(P+=2*C)}for(let D=0;D<_.length;D++)_[D]=_[D]/P;m.envMap.value=e.texture,m.samples.value=x,m.weights.value=_,m.latitudinal.value=c==="latitudinal",l&&(m.poleAxis.value=l);const{_lodMax:b}=this;m.dTheta.value=M,m.mipInt.value=b-n;const I=this._sizeLods[r],z=3*I*(r>b-Ws?r-b+Ws:0),O=4*(this._cubeSize-I);mc(t,z,O,3*I,2*I),h.setRenderTarget(t),h.render(p,Pu)}}function Ow(s){const e=[],t=[],n=[];let r=s;const o=s-Ws+1+Jp.length;for(let c=0;c<o;c++){const l=Math.pow(2,r);t.push(l);let h=1/l;c>s-Ws?h=Jp[c-s+Ws-1]:c===0&&(h=0),n.push(h);const f=1/(l-2),d=-f,p=1+f,m=[d,d,p,d,p,p,d,d,p,p,d,p],v=6,M=6,E=3,x=2,_=1,P=new Float32Array(E*M*v),b=new Float32Array(x*M*v),I=new Float32Array(_*M*v);for(let O=0;O<v;O++){const D=O%3*2/3-1,V=O>2?0:-1,C=[D,V,0,D+2/3,V,0,D+2/3,V+1,0,D,V,0,D+2/3,V+1,0,D,V+1,0];P.set(C,E*M*O),b.set(m,x*M*O);const w=[O,O,O,O,O,O];I.set(w,_*M*O)}const z=new un;z.setAttribute("position",new en(P,E)),z.setAttribute("uv",new en(b,x)),z.setAttribute("faceIndex",new en(I,_)),e.push(z),r>Ws&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function nm(s,e,t){const n=new es(s,e,t);return n.texture.mapping=Hc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mc(s,e,t,n,r){s.viewport.set(e,t,n,r),s.scissor.set(e,t,n,r)}function Fw(s,e,t){const n=new Float32Array(Jr),r=new F(0,1,0);return new Pr({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Eh(),fragmentShader:`

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
		`,blending:Rr,depthTest:!1,depthWrite:!1})}function im(){return new Pr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eh(),fragmentShader:`

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
		`,blending:Rr,depthTest:!1,depthWrite:!1})}function rm(){return new Pr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rr,depthTest:!1,depthWrite:!1})}function Eh(){return`

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
	`}function Bw(s){let e=new WeakMap,t=null;function n(l){if(l&&l.isTexture){const h=l.mapping,f=h===Qu||h===eh,d=h===Zs||h===$s;if(f||d){let p=e.get(l);const m=p!==void 0?p.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return t===null&&(t=new tm(s)),p=f?t.fromEquirectangular(l,p):t.fromCubemap(l,p),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),p.texture;if(p!==void 0)return p.texture;{const v=l.image;return f&&v&&v.height>0||d&&v&&r(v)?(t===null&&(t=new tm(s)),p=f?t.fromEquirectangular(l):t.fromCubemap(l),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),l.addEventListener("dispose",o),p.texture):null}}}return l}function r(l){let h=0;const f=6;for(let d=0;d<f;d++)l[d]!==void 0&&h++;return h===f}function o(l){const h=l.target;h.removeEventListener("dispose",o);const f=e.get(h);f!==void 0&&(e.delete(h),f.dispose())}function c(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:c}}function kw(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=s.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function zw(s,e,t,n){const r={},o=new WeakMap;function c(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const M in m.attributes)e.remove(m.attributes[M]);for(const M in m.morphAttributes){const E=m.morphAttributes[M];for(let x=0,_=E.length;x<_;x++)e.remove(E[x])}m.removeEventListener("dispose",c),delete r[m.id];const v=o.get(m);v&&(e.remove(v),o.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function l(p,m){return r[m.id]===!0||(m.addEventListener("dispose",c),r[m.id]=!0,t.memory.geometries++),m}function h(p){const m=p.attributes;for(const M in m)e.update(m[M],s.ARRAY_BUFFER);const v=p.morphAttributes;for(const M in v){const E=v[M];for(let x=0,_=E.length;x<_;x++)e.update(E[x],s.ARRAY_BUFFER)}}function f(p){const m=[],v=p.index,M=p.attributes.position;let E=0;if(v!==null){const P=v.array;E=v.version;for(let b=0,I=P.length;b<I;b+=3){const z=P[b+0],O=P[b+1],D=P[b+2];m.push(z,O,O,D,D,z)}}else if(M!==void 0){const P=M.array;E=M.version;for(let b=0,I=P.length/3-1;b<I;b+=3){const z=b+0,O=b+1,D=b+2;m.push(z,O,O,D,D,z)}}else return;const x=new(yg(m)?Ag:Tg)(m,1);x.version=E;const _=o.get(p);_&&e.remove(_),o.set(p,x)}function d(p){const m=o.get(p);if(m){const v=p.index;v!==null&&m.version<v.version&&f(p)}else f(p);return o.get(p)}return{get:l,update:h,getWireframeAttribute:d}}function Hw(s,e,t){let n;function r(p){n=p}let o,c;function l(p){o=p.type,c=p.bytesPerElement}function h(p,m){s.drawElements(n,m,o,p*c),t.update(m,n,1)}function f(p,m,v){v!==0&&(s.drawElementsInstanced(n,m,o,p*c,v),t.update(m,n,v))}function d(p,m,v){if(v===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<v;E++)this.render(p[E]/c,m[E]);else{M.multiDrawElementsWEBGL(n,m,0,o,p,0,v);let E=0;for(let x=0;x<v;x++)E+=m[x];t.update(E,n,1)}}this.setMode=r,this.setIndex=l,this.render=h,this.renderInstances=f,this.renderMultiDraw=d}function Gw(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,c,l){switch(t.calls++,c){case s.TRIANGLES:t.triangles+=l*(o/3);break;case s.LINES:t.lines+=l*(o/2);break;case s.LINE_STRIP:t.lines+=l*(o-1);break;case s.LINE_LOOP:t.lines+=l*o;break;case s.POINTS:t.points+=l*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Vw(s,e,t){const n=new WeakMap,r=new It;function o(c,l,h){const f=c.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,p=d!==void 0?d.length:0;let m=n.get(l);if(m===void 0||m.count!==p){let C=function(){D.dispose(),n.delete(l),l.removeEventListener("dispose",C)};m!==void 0&&m.texture.dispose();const v=l.morphAttributes.position!==void 0,M=l.morphAttributes.normal!==void 0,E=l.morphAttributes.color!==void 0,x=l.morphAttributes.position||[],_=l.morphAttributes.normal||[],P=l.morphAttributes.color||[];let b=0;v===!0&&(b=1),M===!0&&(b=2),E===!0&&(b=3);let I=l.attributes.position.count*b,z=1;I>e.maxTextureSize&&(z=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const O=new Float32Array(I*z*4*p),D=new Eg(O,I,z,p);D.type=Ai,D.needsUpdate=!0;const V=b*4;for(let w=0;w<p;w++){const X=x[w],J=_[w],k=P[w],te=I*z*4*w;for(let ce=0;ce<X.count;ce++){const ue=ce*V;v===!0&&(r.fromBufferAttribute(X,ce),O[te+ue+0]=r.x,O[te+ue+1]=r.y,O[te+ue+2]=r.z,O[te+ue+3]=0),M===!0&&(r.fromBufferAttribute(J,ce),O[te+ue+4]=r.x,O[te+ue+5]=r.y,O[te+ue+6]=r.z,O[te+ue+7]=0),E===!0&&(r.fromBufferAttribute(k,ce),O[te+ue+8]=r.x,O[te+ue+9]=r.y,O[te+ue+10]=r.z,O[te+ue+11]=k.itemSize===4?r.w:1)}}m={count:p,texture:D,size:new Oe(I,z)},n.set(l,m),l.addEventListener("dispose",C)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",c.morphTexture,t);else{let v=0;for(let E=0;E<f.length;E++)v+=f[E];const M=l.morphTargetsRelative?1:1-v;h.getUniforms().setValue(s,"morphTargetBaseInfluence",M),h.getUniforms().setValue(s,"morphTargetInfluences",f)}h.getUniforms().setValue(s,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}return{update:o}}function Ww(s,e,t,n){let r=new WeakMap;function o(h){const f=n.render.frame,d=h.geometry,p=e.get(h,d);if(r.get(p)!==f&&(e.update(p),r.set(p,f)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),r.get(h)!==f&&(t.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,s.ARRAY_BUFFER),r.set(h,f))),h.isSkinnedMesh){const m=h.skeleton;r.get(m)!==f&&(m.update(),r.set(m,f))}return p}function c(){r=new WeakMap}function l(h){const f=h.target;f.removeEventListener("dispose",l),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:c}}class Ig extends Qt{constructor(e,t,n,r,o,c,l,h,f,d){if(d=d!==void 0?d:Ys,d!==Ys&&d!==Qo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Ys&&(n=Qs),n===void 0&&d===Qo&&(n=ia),super(null,r,o,c,l,h,d,n,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:Ln,this.minFilter=h!==void 0?h:Ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Dg=new Qt,Ug=new Ig(1,1);Ug.compareFunction=xg;const Ng=new Eg,Og=new Lb,Fg=new Cg,sm=[],om=[],am=new Float32Array(16),cm=new Float32Array(9),lm=new Float32Array(4);function ao(s,e,t){const n=s[0];if(n<=0||n>0)return s;const r=e*t;let o=sm[r];if(o===void 0&&(o=new Float32Array(r),sm[r]=o),e!==0){n.toArray(o,0);for(let c=1,l=0;c!==e;++c)l+=t,s[c].toArray(o,l)}return o}function nn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function rn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Wc(s,e){let t=om[e];t===void 0&&(t=new Int32Array(e),om[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Xw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function qw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2fv(this.addr,e),rn(t,e)}}function Yw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;s.uniform3fv(this.addr,e),rn(t,e)}}function jw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4fv(this.addr,e),rn(t,e)}}function Kw(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,n))return;lm.set(n),s.uniformMatrix2fv(this.addr,!1,lm),rn(t,n)}}function Zw(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,n))return;cm.set(n),s.uniformMatrix3fv(this.addr,!1,cm),rn(t,n)}}function $w(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,n))return;am.set(n),s.uniformMatrix4fv(this.addr,!1,am),rn(t,n)}}function Jw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Qw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2iv(this.addr,e),rn(t,e)}}function eR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;s.uniform3iv(this.addr,e),rn(t,e)}}function tR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4iv(this.addr,e),rn(t,e)}}function nR(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function iR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2uiv(this.addr,e),rn(t,e)}}function rR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;s.uniform3uiv(this.addr,e),rn(t,e)}}function sR(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4uiv(this.addr,e),rn(t,e)}}function oR(s,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r);const o=this.type===s.SAMPLER_2D_SHADOW?Ug:Dg;t.setTexture2D(e||o,r)}function aR(s,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Og,r)}function cR(s,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Fg,r)}function lR(s,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Ng,r)}function uR(s){switch(s){case 5126:return Xw;case 35664:return qw;case 35665:return Yw;case 35666:return jw;case 35674:return Kw;case 35675:return Zw;case 35676:return $w;case 5124:case 35670:return Jw;case 35667:case 35671:return Qw;case 35668:case 35672:return eR;case 35669:case 35673:return tR;case 5125:return nR;case 36294:return iR;case 36295:return rR;case 36296:return sR;case 35678:case 36198:case 36298:case 36306:case 35682:return oR;case 35679:case 36299:case 36307:return aR;case 35680:case 36300:case 36308:case 36293:return cR;case 36289:case 36303:case 36311:case 36292:return lR}}function hR(s,e){s.uniform1fv(this.addr,e)}function fR(s,e){const t=ao(e,this.size,2);s.uniform2fv(this.addr,t)}function dR(s,e){const t=ao(e,this.size,3);s.uniform3fv(this.addr,t)}function pR(s,e){const t=ao(e,this.size,4);s.uniform4fv(this.addr,t)}function mR(s,e){const t=ao(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function gR(s,e){const t=ao(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function _R(s,e){const t=ao(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function vR(s,e){s.uniform1iv(this.addr,e)}function xR(s,e){s.uniform2iv(this.addr,e)}function yR(s,e){s.uniform3iv(this.addr,e)}function SR(s,e){s.uniform4iv(this.addr,e)}function MR(s,e){s.uniform1uiv(this.addr,e)}function ER(s,e){s.uniform2uiv(this.addr,e)}function bR(s,e){s.uniform3uiv(this.addr,e)}function TR(s,e){s.uniform4uiv(this.addr,e)}function AR(s,e,t){const n=this.cache,r=e.length,o=Wc(t,r);nn(n,o)||(s.uniform1iv(this.addr,o),rn(n,o));for(let c=0;c!==r;++c)t.setTexture2D(e[c]||Dg,o[c])}function wR(s,e,t){const n=this.cache,r=e.length,o=Wc(t,r);nn(n,o)||(s.uniform1iv(this.addr,o),rn(n,o));for(let c=0;c!==r;++c)t.setTexture3D(e[c]||Og,o[c])}function RR(s,e,t){const n=this.cache,r=e.length,o=Wc(t,r);nn(n,o)||(s.uniform1iv(this.addr,o),rn(n,o));for(let c=0;c!==r;++c)t.setTextureCube(e[c]||Fg,o[c])}function CR(s,e,t){const n=this.cache,r=e.length,o=Wc(t,r);nn(n,o)||(s.uniform1iv(this.addr,o),rn(n,o));for(let c=0;c!==r;++c)t.setTexture2DArray(e[c]||Ng,o[c])}function LR(s){switch(s){case 5126:return hR;case 35664:return fR;case 35665:return dR;case 35666:return pR;case 35674:return mR;case 35675:return gR;case 35676:return _R;case 5124:case 35670:return vR;case 35667:case 35671:return xR;case 35668:case 35672:return yR;case 35669:case 35673:return SR;case 5125:return MR;case 36294:return ER;case 36295:return bR;case 36296:return TR;case 35678:case 36198:case 36298:case 36306:case 35682:return AR;case 35679:case 36299:case 36307:return wR;case 35680:case 36300:case 36308:case 36293:return RR;case 36289:case 36303:case 36311:case 36292:return CR}}class PR{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=uR(t.type)}}class IR{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=LR(t.type)}}class DR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let o=0,c=r.length;o!==c;++o){const l=r[o];l.setValue(e,t[l.id],n)}}}const Ou=/(\w+)(\])?(\[|\.)?/g;function um(s,e){s.seq.push(e),s.map[e.id]=e}function UR(s,e,t){const n=s.name,r=n.length;for(Ou.lastIndex=0;;){const o=Ou.exec(n),c=Ou.lastIndex;let l=o[1];const h=o[2]==="]",f=o[3];if(h&&(l=l|0),f===void 0||f==="["&&c+2===r){um(t,f===void 0?new PR(l,s,e):new IR(l,s,e));break}else{let p=t.map[l];p===void 0&&(p=new DR(l),um(t,p)),t=p}}}class Cc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const o=e.getActiveUniform(t,r),c=e.getUniformLocation(t,o.name);UR(o,c,this)}}setValue(e,t,n,r){const o=this.map[t];o!==void 0&&o.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let o=0,c=t.length;o!==c;++o){const l=t[o],h=n[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,o=e.length;r!==o;++r){const c=e[r];c.id in t&&n.push(c)}return n}}function hm(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const NR=37297;let OR=0;function FR(s,e){const t=s.split(`
`),n=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let c=r;c<o;c++){const l=c+1;n.push(`${l===e?">":" "} ${l}: ${t[c]}`)}return n.join(`
`)}function BR(s){const e=Rt.getPrimaries(Rt.workingColorSpace),t=Rt.getPrimaries(s);let n;switch(e===t?n="":e===Oc&&t===Nc?n="LinearDisplayP3ToLinearSRGB":e===Nc&&t===Oc&&(n="LinearSRGBToLinearDisplayP3"),s){case ln:case Gc:return[n,"LinearTransferOETF"];case cn:case xh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function fm(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=s.getShaderInfoLog(e).trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+FR(s.getShaderSource(e),c)}else return r}function kR(s,e){const t=BR(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function zR(s,e){let t;switch(e){case DE:t="Linear";break;case UE:t="Reinhard";break;case NE:t="OptimizedCineon";break;case OE:t="ACESFilmic";break;case BE:t="AgX";break;case kE:t="Neutral";break;case FE:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function HR(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xo).join(`
`)}function GR(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function VR(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const o=s.getActiveAttrib(e,r),c=o.name;let l=1;o.type===s.FLOAT_MAT2&&(l=2),o.type===s.FLOAT_MAT3&&(l=3),o.type===s.FLOAT_MAT4&&(l=4),t[c]={type:o.type,location:s.getAttribLocation(e,c),locationSize:l}}return t}function Xo(s){return s!==""}function dm(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const WR=/^[ \t]*#include +<([\w\d./]+)>/gm;function ih(s){return s.replace(WR,qR)}const XR=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function qR(s,e){let t=ot[e];if(t===void 0){const n=XR.get(e);if(n!==void 0)t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ih(t)}const YR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mm(s){return s.replace(YR,jR)}function jR(s,e,t,n){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function gm(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function KR(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ig?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===rg?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===$i&&(e="SHADOWMAP_TYPE_VSM"),e}function ZR(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Zs:case $s:e="ENVMAP_TYPE_CUBE";break;case Hc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function $R(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case $s:e="ENVMAP_MODE_REFRACTION";break}return e}function JR(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case sg:e="ENVMAP_BLENDING_MULTIPLY";break;case PE:e="ENVMAP_BLENDING_MIX";break;case IE:e="ENVMAP_BLENDING_ADD";break}return e}function QR(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function e1(s,e,t,n){const r=s.getContext(),o=t.defines;let c=t.vertexShader,l=t.fragmentShader;const h=KR(t),f=ZR(t),d=$R(t),p=JR(t),m=QR(t),v=HR(t),M=GR(o),E=r.createProgram();let x,_,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Xo).join(`
`),x.length>0&&(x+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Xo).join(`
`),_.length>0&&(_+=`
`)):(x=[gm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xo).join(`
`),_=[gm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==tr?"#define TONE_MAPPING":"",t.toneMapping!==tr?ot.tonemapping_pars_fragment:"",t.toneMapping!==tr?zR("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,kR("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xo).join(`
`)),c=ih(c),c=dm(c,t),c=pm(c,t),l=ih(l),l=dm(l,t),l=pm(l,t),c=mm(c),l=mm(l),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,x=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,_=["#define varying in",t.glslVersion===Pp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const b=P+x+c,I=P+_+l,z=hm(r,r.VERTEX_SHADER,b),O=hm(r,r.FRAGMENT_SHADER,I);r.attachShader(E,z),r.attachShader(E,O),t.index0AttributeName!==void 0?r.bindAttribLocation(E,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function D(X){if(s.debug.checkShaderErrors){const J=r.getProgramInfoLog(E).trim(),k=r.getShaderInfoLog(z).trim(),te=r.getShaderInfoLog(O).trim();let ce=!0,ue=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(ce=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(r,E,z,O);else{const xe=fm(r,z,"vertex"),Q=fm(r,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+J+`
`+xe+`
`+Q)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(k===""||te==="")&&(ue=!1);ue&&(X.diagnostics={runnable:ce,programLog:J,vertexShader:{log:k,prefix:x},fragmentShader:{log:te,prefix:_}})}r.deleteShader(z),r.deleteShader(O),V=new Cc(r,E),C=VR(r,E)}let V;this.getUniforms=function(){return V===void 0&&D(this),V};let C;this.getAttributes=function(){return C===void 0&&D(this),C};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=r.getProgramParameter(E,NR)),w},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=OR++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=z,this.fragmentShader=O,this}let t1=0;class n1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(n),c=this._getShaderCacheForMaterial(e);return c.has(r)===!1&&(c.add(r),r.usedTimes++),c.has(o)===!1&&(c.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new i1(e),t.set(e,n)),n}}class i1{constructor(e){this.id=t1++,this.code=e,this.usedTimes=0}}function r1(s,e,t,n,r,o,c){const l=new Sh,h=new n1,f=new Set,d=[],p=r.logarithmicDepthBuffer,m=r.vertexTextures;let v=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(C){return f.add(C),C===0?"uv":`uv${C}`}function x(C,w,X,J,k){const te=J.fog,ce=k.geometry,ue=C.isMeshStandardMaterial?J.environment:null,xe=(C.isMeshStandardMaterial?t:e).get(C.envMap||ue),Q=xe&&xe.mapping===Hc?xe.image.height:null,ge=M[C.type];C.precision!==null&&(v=r.getMaxPrecision(C.precision),v!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",v,"instead."));const de=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,Ae=de!==void 0?de.length:0;let ct=0;ce.morphAttributes.position!==void 0&&(ct=1),ce.morphAttributes.normal!==void 0&&(ct=2),ce.morphAttributes.color!==void 0&&(ct=3);let bt,ie,me,Re;if(ge){const Kt=bi[ge];bt=Kt.vertexShader,ie=Kt.fragmentShader}else bt=C.vertexShader,ie=C.fragmentShader,h.update(C),me=h.getVertexShaderID(C),Re=h.getFragmentShaderID(C);const be=s.getRenderTarget(),qe=k.isInstancedMesh===!0,Ye=k.isBatchedMesh===!0,ft=!!C.map,q=!!C.matcap,Je=!!xe,Ge=!!C.aoMap,St=!!C.lightMap,ke=!!C.bumpMap,Et=!!C.normalMap,U=!!C.displacementMap,T=!!C.emissiveMap,ee=!!C.metalnessMap,se=!!C.roughnessMap,le=C.anisotropy>0,fe=C.clearcoat>0,Fe=C.iridescence>0,pe=C.sheen>0,Pe=C.transmission>0,ze=le&&!!C.anisotropyMap,_e=fe&&!!C.clearcoatMap,Me=fe&&!!C.clearcoatNormalMap,Xe=fe&&!!C.clearcoatRoughnessMap,Ce=Fe&&!!C.iridescenceMap,Le=Fe&&!!C.iridescenceThicknessMap,rt=pe&&!!C.sheenColorMap,lt=pe&&!!C.sheenRoughnessMap,vt=!!C.specularMap,dt=!!C.specularColorMap,xt=!!C.specularIntensityMap,De=Pe&&!!C.transmissionMap,y=Pe&&!!C.thicknessMap,Y=!!C.gradientMap,re=!!C.alphaMap,ve=C.alphaTest>0,Te=!!C.alphaHash,pt=!!C.extensions;let ut=tr;C.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(ut=s.toneMapping);const Ut={shaderID:ge,shaderType:C.type,shaderName:C.name,vertexShader:bt,fragmentShader:ie,defines:C.defines,customVertexShaderID:me,customFragmentShaderID:Re,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:v,batching:Ye,instancing:qe,instancingColor:qe&&k.instanceColor!==null,instancingMorph:qe&&k.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:be===null?s.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:ln,alphaToCoverage:!!C.alphaToCoverage,map:ft,matcap:q,envMap:Je,envMapMode:Je&&xe.mapping,envMapCubeUVHeight:Q,aoMap:Ge,lightMap:St,bumpMap:ke,normalMap:Et,displacementMap:m&&U,emissiveMap:T,normalMapObjectSpace:Et&&C.normalMapType===eb,normalMapTangentSpace:Et&&C.normalMapType===vg,metalnessMap:ee,roughnessMap:se,anisotropy:le,anisotropyMap:ze,clearcoat:fe,clearcoatMap:_e,clearcoatNormalMap:Me,clearcoatRoughnessMap:Xe,iridescence:Fe,iridescenceMap:Ce,iridescenceThicknessMap:Le,sheen:pe,sheenColorMap:rt,sheenRoughnessMap:lt,specularMap:vt,specularColorMap:dt,specularIntensityMap:xt,transmission:Pe,transmissionMap:De,thicknessMap:y,gradientMap:Y,opaque:C.transparent===!1&&C.blending===qs&&C.alphaToCoverage===!1,alphaMap:re,alphaTest:ve,alphaHash:Te,combine:C.combine,mapUv:ft&&E(C.map.channel),aoMapUv:Ge&&E(C.aoMap.channel),lightMapUv:St&&E(C.lightMap.channel),bumpMapUv:ke&&E(C.bumpMap.channel),normalMapUv:Et&&E(C.normalMap.channel),displacementMapUv:U&&E(C.displacementMap.channel),emissiveMapUv:T&&E(C.emissiveMap.channel),metalnessMapUv:ee&&E(C.metalnessMap.channel),roughnessMapUv:se&&E(C.roughnessMap.channel),anisotropyMapUv:ze&&E(C.anisotropyMap.channel),clearcoatMapUv:_e&&E(C.clearcoatMap.channel),clearcoatNormalMapUv:Me&&E(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xe&&E(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&E(C.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&E(C.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&E(C.sheenColorMap.channel),sheenRoughnessMapUv:lt&&E(C.sheenRoughnessMap.channel),specularMapUv:vt&&E(C.specularMap.channel),specularColorMapUv:dt&&E(C.specularColorMap.channel),specularIntensityMapUv:xt&&E(C.specularIntensityMap.channel),transmissionMapUv:De&&E(C.transmissionMap.channel),thicknessMapUv:y&&E(C.thicknessMap.channel),alphaMapUv:re&&E(C.alphaMap.channel),vertexTangents:!!ce.attributes.tangent&&(Et||le),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!ce.attributes.uv&&(ft||re),fog:!!te,useFog:C.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:k.isSkinnedMesh===!0,morphTargets:ce.morphAttributes.position!==void 0,morphNormals:ce.morphAttributes.normal!==void 0,morphColors:ce.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:ct,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:C.dithering,shadowMapEnabled:s.shadowMap.enabled&&X.length>0,shadowMapType:s.shadowMap.type,toneMapping:ut,useLegacyLights:s._useLegacyLights,decodeVideoTexture:ft&&C.map.isVideoTexture===!0&&Rt.getTransfer(C.map.colorSpace)===kt,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Ti,flipSided:C.side===Fn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:pt&&C.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:pt&&C.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return Ut.vertexUv1s=f.has(1),Ut.vertexUv2s=f.has(2),Ut.vertexUv3s=f.has(3),f.clear(),Ut}function _(C){const w=[];if(C.shaderID?w.push(C.shaderID):(w.push(C.customVertexShaderID),w.push(C.customFragmentShaderID)),C.defines!==void 0)for(const X in C.defines)w.push(X),w.push(C.defines[X]);return C.isRawShaderMaterial===!1&&(P(w,C),b(w,C),w.push(s.outputColorSpace)),w.push(C.customProgramCacheKey),w.join()}function P(C,w){C.push(w.precision),C.push(w.outputColorSpace),C.push(w.envMapMode),C.push(w.envMapCubeUVHeight),C.push(w.mapUv),C.push(w.alphaMapUv),C.push(w.lightMapUv),C.push(w.aoMapUv),C.push(w.bumpMapUv),C.push(w.normalMapUv),C.push(w.displacementMapUv),C.push(w.emissiveMapUv),C.push(w.metalnessMapUv),C.push(w.roughnessMapUv),C.push(w.anisotropyMapUv),C.push(w.clearcoatMapUv),C.push(w.clearcoatNormalMapUv),C.push(w.clearcoatRoughnessMapUv),C.push(w.iridescenceMapUv),C.push(w.iridescenceThicknessMapUv),C.push(w.sheenColorMapUv),C.push(w.sheenRoughnessMapUv),C.push(w.specularMapUv),C.push(w.specularColorMapUv),C.push(w.specularIntensityMapUv),C.push(w.transmissionMapUv),C.push(w.thicknessMapUv),C.push(w.combine),C.push(w.fogExp2),C.push(w.sizeAttenuation),C.push(w.morphTargetsCount),C.push(w.morphAttributeCount),C.push(w.numDirLights),C.push(w.numPointLights),C.push(w.numSpotLights),C.push(w.numSpotLightMaps),C.push(w.numHemiLights),C.push(w.numRectAreaLights),C.push(w.numDirLightShadows),C.push(w.numPointLightShadows),C.push(w.numSpotLightShadows),C.push(w.numSpotLightShadowsWithMaps),C.push(w.numLightProbes),C.push(w.shadowMapType),C.push(w.toneMapping),C.push(w.numClippingPlanes),C.push(w.numClipIntersection),C.push(w.depthPacking)}function b(C,w){l.disableAll(),w.supportsVertexTextures&&l.enable(0),w.instancing&&l.enable(1),w.instancingColor&&l.enable(2),w.instancingMorph&&l.enable(3),w.matcap&&l.enable(4),w.envMap&&l.enable(5),w.normalMapObjectSpace&&l.enable(6),w.normalMapTangentSpace&&l.enable(7),w.clearcoat&&l.enable(8),w.iridescence&&l.enable(9),w.alphaTest&&l.enable(10),w.vertexColors&&l.enable(11),w.vertexAlphas&&l.enable(12),w.vertexUv1s&&l.enable(13),w.vertexUv2s&&l.enable(14),w.vertexUv3s&&l.enable(15),w.vertexTangents&&l.enable(16),w.anisotropy&&l.enable(17),w.alphaHash&&l.enable(18),w.batching&&l.enable(19),C.push(l.mask),l.disableAll(),w.fog&&l.enable(0),w.useFog&&l.enable(1),w.flatShading&&l.enable(2),w.logarithmicDepthBuffer&&l.enable(3),w.skinning&&l.enable(4),w.morphTargets&&l.enable(5),w.morphNormals&&l.enable(6),w.morphColors&&l.enable(7),w.premultipliedAlpha&&l.enable(8),w.shadowMapEnabled&&l.enable(9),w.useLegacyLights&&l.enable(10),w.doubleSided&&l.enable(11),w.flipSided&&l.enable(12),w.useDepthPacking&&l.enable(13),w.dithering&&l.enable(14),w.transmission&&l.enable(15),w.sheen&&l.enable(16),w.opaque&&l.enable(17),w.pointsUvs&&l.enable(18),w.decodeVideoTexture&&l.enable(19),w.alphaToCoverage&&l.enable(20),C.push(l.mask)}function I(C){const w=M[C.type];let X;if(w){const J=bi[w];X=Gb.clone(J.uniforms)}else X=C.uniforms;return X}function z(C,w){let X;for(let J=0,k=d.length;J<k;J++){const te=d[J];if(te.cacheKey===w){X=te,++X.usedTimes;break}}return X===void 0&&(X=new e1(s,w,C,o),d.push(X)),X}function O(C){if(--C.usedTimes===0){const w=d.indexOf(C);d[w]=d[d.length-1],d.pop(),C.destroy()}}function D(C){h.remove(C)}function V(){h.dispose()}return{getParameters:x,getProgramCacheKey:_,getUniforms:I,acquireProgram:z,releaseProgram:O,releaseShaderCache:D,programs:d,dispose:V}}function s1(){let s=new WeakMap;function e(o){let c=s.get(o);return c===void 0&&(c={},s.set(o,c)),c}function t(o){s.delete(o)}function n(o,c,l){s.get(o)[c]=l}function r(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function o1(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function _m(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function vm(){const s=[];let e=0;const t=[],n=[],r=[];function o(){e=0,t.length=0,n.length=0,r.length=0}function c(p,m,v,M,E,x){let _=s[e];return _===void 0?(_={id:p.id,object:p,geometry:m,material:v,groupOrder:M,renderOrder:p.renderOrder,z:E,group:x},s[e]=_):(_.id=p.id,_.object=p,_.geometry=m,_.material=v,_.groupOrder=M,_.renderOrder=p.renderOrder,_.z=E,_.group=x),e++,_}function l(p,m,v,M,E,x){const _=c(p,m,v,M,E,x);v.transmission>0?n.push(_):v.transparent===!0?r.push(_):t.push(_)}function h(p,m,v,M,E,x){const _=c(p,m,v,M,E,x);v.transmission>0?n.unshift(_):v.transparent===!0?r.unshift(_):t.unshift(_)}function f(p,m){t.length>1&&t.sort(p||o1),n.length>1&&n.sort(m||_m),r.length>1&&r.sort(m||_m)}function d(){for(let p=e,m=s.length;p<m;p++){const v=s[p];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:r,init:o,push:l,unshift:h,finish:d,sort:f}}function a1(){let s=new WeakMap;function e(n,r){const o=s.get(n);let c;return o===void 0?(c=new vm,s.set(n,[c])):r>=o.length?(c=new vm,o.push(c)):c=o[r],c}function t(){s=new WeakMap}return{get:e,dispose:t}}function c1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ue};break;case"SpotLight":t={position:new F,direction:new F,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new F,halfWidth:new F,halfHeight:new F};break}return s[e.id]=t,t}}}function l1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let u1=0;function h1(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function f1(s){const e=new c1,t=l1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)n.probe.push(new F);const r=new F,o=new tt,c=new tt;function l(f,d){let p=0,m=0,v=0;for(let X=0;X<9;X++)n.probe[X].set(0,0,0);let M=0,E=0,x=0,_=0,P=0,b=0,I=0,z=0,O=0,D=0,V=0;f.sort(h1);const C=d===!0?Math.PI:1;for(let X=0,J=f.length;X<J;X++){const k=f[X],te=k.color,ce=k.intensity,ue=k.distance,xe=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)p+=te.r*ce*C,m+=te.g*ce*C,v+=te.b*ce*C;else if(k.isLightProbe){for(let Q=0;Q<9;Q++)n.probe[Q].addScaledVector(k.sh.coefficients[Q],ce);V++}else if(k.isDirectionalLight){const Q=e.get(k);if(Q.color.copy(k.color).multiplyScalar(k.intensity*C),k.castShadow){const ge=k.shadow,de=t.get(k);de.shadowBias=ge.bias,de.shadowNormalBias=ge.normalBias,de.shadowRadius=ge.radius,de.shadowMapSize=ge.mapSize,n.directionalShadow[M]=de,n.directionalShadowMap[M]=xe,n.directionalShadowMatrix[M]=k.shadow.matrix,b++}n.directional[M]=Q,M++}else if(k.isSpotLight){const Q=e.get(k);Q.position.setFromMatrixPosition(k.matrixWorld),Q.color.copy(te).multiplyScalar(ce*C),Q.distance=ue,Q.coneCos=Math.cos(k.angle),Q.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),Q.decay=k.decay,n.spot[x]=Q;const ge=k.shadow;if(k.map&&(n.spotLightMap[O]=k.map,O++,ge.updateMatrices(k),k.castShadow&&D++),n.spotLightMatrix[x]=ge.matrix,k.castShadow){const de=t.get(k);de.shadowBias=ge.bias,de.shadowNormalBias=ge.normalBias,de.shadowRadius=ge.radius,de.shadowMapSize=ge.mapSize,n.spotShadow[x]=de,n.spotShadowMap[x]=xe,z++}x++}else if(k.isRectAreaLight){const Q=e.get(k);Q.color.copy(te).multiplyScalar(ce),Q.halfWidth.set(k.width*.5,0,0),Q.halfHeight.set(0,k.height*.5,0),n.rectArea[_]=Q,_++}else if(k.isPointLight){const Q=e.get(k);if(Q.color.copy(k.color).multiplyScalar(k.intensity*C),Q.distance=k.distance,Q.decay=k.decay,k.castShadow){const ge=k.shadow,de=t.get(k);de.shadowBias=ge.bias,de.shadowNormalBias=ge.normalBias,de.shadowRadius=ge.radius,de.shadowMapSize=ge.mapSize,de.shadowCameraNear=ge.camera.near,de.shadowCameraFar=ge.camera.far,n.pointShadow[E]=de,n.pointShadowMap[E]=xe,n.pointShadowMatrix[E]=k.shadow.matrix,I++}n.point[E]=Q,E++}else if(k.isHemisphereLight){const Q=e.get(k);Q.skyColor.copy(k.color).multiplyScalar(ce*C),Q.groundColor.copy(k.groundColor).multiplyScalar(ce*C),n.hemi[P]=Q,P++}}_>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=m,n.ambient[2]=v;const w=n.hash;(w.directionalLength!==M||w.pointLength!==E||w.spotLength!==x||w.rectAreaLength!==_||w.hemiLength!==P||w.numDirectionalShadows!==b||w.numPointShadows!==I||w.numSpotShadows!==z||w.numSpotMaps!==O||w.numLightProbes!==V)&&(n.directional.length=M,n.spot.length=x,n.rectArea.length=_,n.point.length=E,n.hemi.length=P,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=I,n.pointShadowMap.length=I,n.spotShadow.length=z,n.spotShadowMap.length=z,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=I,n.spotLightMatrix.length=z+O-D,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=V,w.directionalLength=M,w.pointLength=E,w.spotLength=x,w.rectAreaLength=_,w.hemiLength=P,w.numDirectionalShadows=b,w.numPointShadows=I,w.numSpotShadows=z,w.numSpotMaps=O,w.numLightProbes=V,n.version=u1++)}function h(f,d){let p=0,m=0,v=0,M=0,E=0;const x=d.matrixWorldInverse;for(let _=0,P=f.length;_<P;_++){const b=f[_];if(b.isDirectionalLight){const I=n.directional[p];I.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(x),p++}else if(b.isSpotLight){const I=n.spot[v];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(x),I.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(x),v++}else if(b.isRectAreaLight){const I=n.rectArea[M];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(x),c.identity(),o.copy(b.matrixWorld),o.premultiply(x),c.extractRotation(o),I.halfWidth.set(b.width*.5,0,0),I.halfHeight.set(0,b.height*.5,0),I.halfWidth.applyMatrix4(c),I.halfHeight.applyMatrix4(c),M++}else if(b.isPointLight){const I=n.point[m];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(x),m++}else if(b.isHemisphereLight){const I=n.hemi[E];I.direction.setFromMatrixPosition(b.matrixWorld),I.direction.transformDirection(x),E++}}}return{setup:l,setupView:h,state:n}}function xm(s){const e=new f1(s),t=[],n=[];function r(){t.length=0,n.length=0}function o(d){t.push(d)}function c(d){n.push(d)}function l(d){e.setup(t,d)}function h(d){e.setupView(t,d)}return{init:r,state:{lightsArray:t,shadowsArray:n,lights:e,transmissionRenderTarget:null},setupLights:l,setupLightsView:h,pushLight:o,pushShadow:c}}function d1(s){let e=new WeakMap;function t(r,o=0){const c=e.get(r);let l;return c===void 0?(l=new xm(s),e.set(r,[l])):o>=c.length?(l=new xm(s),c.push(l)):l=c[o],l}function n(){e=new WeakMap}return{get:t,dispose:n}}class p1 extends ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=JE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class m1 extends ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const g1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_1=`uniform sampler2D shadow_pass;
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
}`;function v1(s,e,t){let n=new Mh;const r=new Oe,o=new Oe,c=new It,l=new p1({depthPacking:QE}),h=new m1,f={},d=t.maxTextureSize,p={[wi]:Fn,[Fn]:wi,[Ti]:Ti},m=new Pr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:g1,fragmentShader:_1}),v=m.clone();v.defines.HORIZONTAL_PASS=1;const M=new un;M.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new pn(M,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ig;let _=this.type;this.render=function(O,D,V){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||O.length===0)return;const C=s.getRenderTarget(),w=s.getActiveCubeFace(),X=s.getActiveMipmapLevel(),J=s.state;J.setBlending(Rr),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const k=_!==$i&&this.type===$i,te=_===$i&&this.type!==$i;for(let ce=0,ue=O.length;ce<ue;ce++){const xe=O[ce],Q=xe.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",xe,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;r.copy(Q.mapSize);const ge=Q.getFrameExtents();if(r.multiply(ge),o.copy(Q.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(o.x=Math.floor(d/ge.x),r.x=o.x*ge.x,Q.mapSize.x=o.x),r.y>d&&(o.y=Math.floor(d/ge.y),r.y=o.y*ge.y,Q.mapSize.y=o.y)),Q.map===null||k===!0||te===!0){const Ae=this.type!==$i?{minFilter:Ln,magFilter:Ln}:{};Q.map!==null&&Q.map.dispose(),Q.map=new es(r.x,r.y,Ae),Q.map.texture.name=xe.name+".shadowMap",Q.camera.updateProjectionMatrix()}s.setRenderTarget(Q.map),s.clear();const de=Q.getViewportCount();for(let Ae=0;Ae<de;Ae++){const ct=Q.getViewport(Ae);c.set(o.x*ct.x,o.y*ct.y,o.x*ct.z,o.y*ct.w),J.viewport(c),Q.updateMatrices(xe,Ae),n=Q.getFrustum(),I(D,V,Q.camera,xe,this.type)}Q.isPointLightShadow!==!0&&this.type===$i&&P(Q,V),Q.needsUpdate=!1}_=this.type,x.needsUpdate=!1,s.setRenderTarget(C,w,X)};function P(O,D){const V=e.update(E);m.defines.VSM_SAMPLES!==O.blurSamples&&(m.defines.VSM_SAMPLES=O.blurSamples,v.defines.VSM_SAMPLES=O.blurSamples,m.needsUpdate=!0,v.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new es(r.x,r.y)),m.uniforms.shadow_pass.value=O.map.texture,m.uniforms.resolution.value=O.mapSize,m.uniforms.radius.value=O.radius,s.setRenderTarget(O.mapPass),s.clear(),s.renderBufferDirect(D,null,V,m,E,null),v.uniforms.shadow_pass.value=O.mapPass.texture,v.uniforms.resolution.value=O.mapSize,v.uniforms.radius.value=O.radius,s.setRenderTarget(O.map),s.clear(),s.renderBufferDirect(D,null,V,v,E,null)}function b(O,D,V,C){let w=null;const X=V.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(X!==void 0)w=X;else if(w=V.isPointLight===!0?h:l,s.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const J=w.uuid,k=D.uuid;let te=f[J];te===void 0&&(te={},f[J]=te);let ce=te[k];ce===void 0&&(ce=w.clone(),te[k]=ce,D.addEventListener("dispose",z)),w=ce}if(w.visible=D.visible,w.wireframe=D.wireframe,C===$i?w.side=D.shadowSide!==null?D.shadowSide:D.side:w.side=D.shadowSide!==null?D.shadowSide:p[D.side],w.alphaMap=D.alphaMap,w.alphaTest=D.alphaTest,w.map=D.map,w.clipShadows=D.clipShadows,w.clippingPlanes=D.clippingPlanes,w.clipIntersection=D.clipIntersection,w.displacementMap=D.displacementMap,w.displacementScale=D.displacementScale,w.displacementBias=D.displacementBias,w.wireframeLinewidth=D.wireframeLinewidth,w.linewidth=D.linewidth,V.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const J=s.properties.get(w);J.light=V}return w}function I(O,D,V,C,w){if(O.visible===!1)return;if(O.layers.test(D.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&w===$i)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,O.matrixWorld);const k=e.update(O),te=O.material;if(Array.isArray(te)){const ce=k.groups;for(let ue=0,xe=ce.length;ue<xe;ue++){const Q=ce[ue],ge=te[Q.materialIndex];if(ge&&ge.visible){const de=b(O,ge,C,w);O.onBeforeShadow(s,O,D,V,k,de,Q),s.renderBufferDirect(V,null,k,de,O,Q),O.onAfterShadow(s,O,D,V,k,de,Q)}}}else if(te.visible){const ce=b(O,te,C,w);O.onBeforeShadow(s,O,D,V,k,ce,null),s.renderBufferDirect(V,null,k,ce,O,null),O.onAfterShadow(s,O,D,V,k,ce,null)}}const J=O.children;for(let k=0,te=J.length;k<te;k++)I(J[k],D,V,C,w)}function z(O){O.target.removeEventListener("dispose",z);for(const V in f){const C=f[V],w=O.target.uuid;w in C&&(C[w].dispose(),delete C[w])}}}function x1(s){function e(){let y=!1;const Y=new It;let re=null;const ve=new It(0,0,0,0);return{setMask:function(Te){re!==Te&&!y&&(s.colorMask(Te,Te,Te,Te),re=Te)},setLocked:function(Te){y=Te},setClear:function(Te,pt,ut,Ut,Kt){Kt===!0&&(Te*=Ut,pt*=Ut,ut*=Ut),Y.set(Te,pt,ut,Ut),ve.equals(Y)===!1&&(s.clearColor(Te,pt,ut,Ut),ve.copy(Y))},reset:function(){y=!1,re=null,ve.set(-1,0,0,0)}}}function t(){let y=!1,Y=null,re=null,ve=null;return{setTest:function(Te){Te?Re(s.DEPTH_TEST):be(s.DEPTH_TEST)},setMask:function(Te){Y!==Te&&!y&&(s.depthMask(Te),Y=Te)},setFunc:function(Te){if(re!==Te){switch(Te){case bE:s.depthFunc(s.NEVER);break;case TE:s.depthFunc(s.ALWAYS);break;case AE:s.depthFunc(s.LESS);break;case Pc:s.depthFunc(s.LEQUAL);break;case wE:s.depthFunc(s.EQUAL);break;case RE:s.depthFunc(s.GEQUAL);break;case CE:s.depthFunc(s.GREATER);break;case LE:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}re=Te}},setLocked:function(Te){y=Te},setClear:function(Te){ve!==Te&&(s.clearDepth(Te),ve=Te)},reset:function(){y=!1,Y=null,re=null,ve=null}}}function n(){let y=!1,Y=null,re=null,ve=null,Te=null,pt=null,ut=null,Ut=null,Kt=null;return{setTest:function(Tt){y||(Tt?Re(s.STENCIL_TEST):be(s.STENCIL_TEST))},setMask:function(Tt){Y!==Tt&&!y&&(s.stencilMask(Tt),Y=Tt)},setFunc:function(Tt,Vt,Wt){(re!==Tt||ve!==Vt||Te!==Wt)&&(s.stencilFunc(Tt,Vt,Wt),re=Tt,ve=Vt,Te=Wt)},setOp:function(Tt,Vt,Wt){(pt!==Tt||ut!==Vt||Ut!==Wt)&&(s.stencilOp(Tt,Vt,Wt),pt=Tt,ut=Vt,Ut=Wt)},setLocked:function(Tt){y=Tt},setClear:function(Tt){Kt!==Tt&&(s.clearStencil(Tt),Kt=Tt)},reset:function(){y=!1,Y=null,re=null,ve=null,Te=null,pt=null,ut=null,Ut=null,Kt=null}}}const r=new e,o=new t,c=new n,l=new WeakMap,h=new WeakMap;let f={},d={},p=new WeakMap,m=[],v=null,M=!1,E=null,x=null,_=null,P=null,b=null,I=null,z=null,O=new Ue(0,0,0),D=0,V=!1,C=null,w=null,X=null,J=null,k=null;const te=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ce=!1,ue=0;const xe=s.getParameter(s.VERSION);xe.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec(xe)[1]),ce=ue>=1):xe.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec(xe)[1]),ce=ue>=2);let Q=null,ge={};const de=s.getParameter(s.SCISSOR_BOX),Ae=s.getParameter(s.VIEWPORT),ct=new It().fromArray(de),bt=new It().fromArray(Ae);function ie(y,Y,re,ve){const Te=new Uint8Array(4),pt=s.createTexture();s.bindTexture(y,pt),s.texParameteri(y,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(y,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ut=0;ut<re;ut++)y===s.TEXTURE_3D||y===s.TEXTURE_2D_ARRAY?s.texImage3D(Y,0,s.RGBA,1,1,ve,0,s.RGBA,s.UNSIGNED_BYTE,Te):s.texImage2D(Y+ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Te);return pt}const me={};me[s.TEXTURE_2D]=ie(s.TEXTURE_2D,s.TEXTURE_2D,1),me[s.TEXTURE_CUBE_MAP]=ie(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[s.TEXTURE_2D_ARRAY]=ie(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),me[s.TEXTURE_3D]=ie(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Re(s.DEPTH_TEST),o.setFunc(Pc),ke(!1),Et($d),Re(s.CULL_FACE),Ge(Rr);function Re(y){f[y]!==!0&&(s.enable(y),f[y]=!0)}function be(y){f[y]!==!1&&(s.disable(y),f[y]=!1)}function qe(y,Y){return d[y]!==Y?(s.bindFramebuffer(y,Y),d[y]=Y,y===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=Y),y===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=Y),!0):!1}function Ye(y,Y){let re=m,ve=!1;if(y){re=p.get(Y),re===void 0&&(re=[],p.set(Y,re));const Te=y.textures;if(re.length!==Te.length||re[0]!==s.COLOR_ATTACHMENT0){for(let pt=0,ut=Te.length;pt<ut;pt++)re[pt]=s.COLOR_ATTACHMENT0+pt;re.length=Te.length,ve=!0}}else re[0]!==s.BACK&&(re[0]=s.BACK,ve=!0);ve&&s.drawBuffers(re)}function ft(y){return v!==y?(s.useProgram(y),v=y,!0):!1}const q={[$r]:s.FUNC_ADD,[aE]:s.FUNC_SUBTRACT,[cE]:s.FUNC_REVERSE_SUBTRACT};q[lE]=s.MIN,q[uE]=s.MAX;const Je={[hE]:s.ZERO,[fE]:s.ONE,[dE]:s.SRC_COLOR,[$u]:s.SRC_ALPHA,[xE]:s.SRC_ALPHA_SATURATE,[_E]:s.DST_COLOR,[mE]:s.DST_ALPHA,[pE]:s.ONE_MINUS_SRC_COLOR,[Ju]:s.ONE_MINUS_SRC_ALPHA,[vE]:s.ONE_MINUS_DST_COLOR,[gE]:s.ONE_MINUS_DST_ALPHA,[yE]:s.CONSTANT_COLOR,[SE]:s.ONE_MINUS_CONSTANT_COLOR,[ME]:s.CONSTANT_ALPHA,[EE]:s.ONE_MINUS_CONSTANT_ALPHA};function Ge(y,Y,re,ve,Te,pt,ut,Ut,Kt,Tt){if(y===Rr){M===!0&&(be(s.BLEND),M=!1);return}if(M===!1&&(Re(s.BLEND),M=!0),y!==oE){if(y!==E||Tt!==V){if((x!==$r||b!==$r)&&(s.blendEquation(s.FUNC_ADD),x=$r,b=$r),Tt)switch(y){case qs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Jd:s.blendFunc(s.ONE,s.ONE);break;case Qd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ep:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}else switch(y){case qs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Jd:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Qd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ep:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}_=null,P=null,I=null,z=null,O.set(0,0,0),D=0,E=y,V=Tt}return}Te=Te||Y,pt=pt||re,ut=ut||ve,(Y!==x||Te!==b)&&(s.blendEquationSeparate(q[Y],q[Te]),x=Y,b=Te),(re!==_||ve!==P||pt!==I||ut!==z)&&(s.blendFuncSeparate(Je[re],Je[ve],Je[pt],Je[ut]),_=re,P=ve,I=pt,z=ut),(Ut.equals(O)===!1||Kt!==D)&&(s.blendColor(Ut.r,Ut.g,Ut.b,Kt),O.copy(Ut),D=Kt),E=y,V=!1}function St(y,Y){y.side===Ti?be(s.CULL_FACE):Re(s.CULL_FACE);let re=y.side===Fn;Y&&(re=!re),ke(re),y.blending===qs&&y.transparent===!1?Ge(Rr):Ge(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),o.setFunc(y.depthFunc),o.setTest(y.depthTest),o.setMask(y.depthWrite),r.setMask(y.colorWrite);const ve=y.stencilWrite;c.setTest(ve),ve&&(c.setMask(y.stencilWriteMask),c.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),c.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),T(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?Re(s.SAMPLE_ALPHA_TO_COVERAGE):be(s.SAMPLE_ALPHA_TO_COVERAGE)}function ke(y){C!==y&&(y?s.frontFace(s.CW):s.frontFace(s.CCW),C=y)}function Et(y){y!==rE?(Re(s.CULL_FACE),y!==w&&(y===$d?s.cullFace(s.BACK):y===sE?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):be(s.CULL_FACE),w=y}function U(y){y!==X&&(ce&&s.lineWidth(y),X=y)}function T(y,Y,re){y?(Re(s.POLYGON_OFFSET_FILL),(J!==Y||k!==re)&&(s.polygonOffset(Y,re),J=Y,k=re)):be(s.POLYGON_OFFSET_FILL)}function ee(y){y?Re(s.SCISSOR_TEST):be(s.SCISSOR_TEST)}function se(y){y===void 0&&(y=s.TEXTURE0+te-1),Q!==y&&(s.activeTexture(y),Q=y)}function le(y,Y,re){re===void 0&&(Q===null?re=s.TEXTURE0+te-1:re=Q);let ve=ge[re];ve===void 0&&(ve={type:void 0,texture:void 0},ge[re]=ve),(ve.type!==y||ve.texture!==Y)&&(Q!==re&&(s.activeTexture(re),Q=re),s.bindTexture(y,Y||me[y]),ve.type=y,ve.texture=Y)}function fe(){const y=ge[Q];y!==void 0&&y.type!==void 0&&(s.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)}function Fe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function pe(){try{s.compressedTexImage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Pe(){try{s.texSubImage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function ze(){try{s.texSubImage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function _e(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Me(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Xe(){try{s.texStorage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Ce(){try{s.texStorage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Le(){try{s.texImage2D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function rt(){try{s.texImage3D.apply(s,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function lt(y){ct.equals(y)===!1&&(s.scissor(y.x,y.y,y.z,y.w),ct.copy(y))}function vt(y){bt.equals(y)===!1&&(s.viewport(y.x,y.y,y.z,y.w),bt.copy(y))}function dt(y,Y){let re=h.get(Y);re===void 0&&(re=new WeakMap,h.set(Y,re));let ve=re.get(y);ve===void 0&&(ve=s.getUniformBlockIndex(Y,y.name),re.set(y,ve))}function xt(y,Y){const ve=h.get(Y).get(y);l.get(Y)!==ve&&(s.uniformBlockBinding(Y,ve,y.__bindingPointIndex),l.set(Y,ve))}function De(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},Q=null,ge={},d={},p=new WeakMap,m=[],v=null,M=!1,E=null,x=null,_=null,P=null,b=null,I=null,z=null,O=new Ue(0,0,0),D=0,V=!1,C=null,w=null,X=null,J=null,k=null,ct.set(0,0,s.canvas.width,s.canvas.height),bt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:Re,disable:be,bindFramebuffer:qe,drawBuffers:Ye,useProgram:ft,setBlending:Ge,setMaterial:St,setFlipSided:ke,setCullFace:Et,setLineWidth:U,setPolygonOffset:T,setScissorTest:ee,activeTexture:se,bindTexture:le,unbindTexture:fe,compressedTexImage2D:Fe,compressedTexImage3D:pe,texImage2D:Le,texImage3D:rt,updateUBOMapping:dt,uniformBlockBinding:xt,texStorage2D:Xe,texStorage3D:Ce,texSubImage2D:Pe,texSubImage3D:ze,compressedTexSubImage2D:_e,compressedTexSubImage3D:Me,scissor:lt,viewport:vt,reset:De}}function y1(s,e,t,n,r,o,c){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Oe,d=new WeakMap;let p;const m=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(U,T){return v?new OffscreenCanvas(U,T):ta("canvas")}function E(U,T,ee){let se=1;const le=Et(U);if((le.width>ee||le.height>ee)&&(se=ee/Math.max(le.width,le.height)),se<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const fe=Math.floor(se*le.width),Fe=Math.floor(se*le.height);p===void 0&&(p=M(fe,Fe));const pe=T?M(fe,Fe):p;return pe.width=fe,pe.height=Fe,pe.getContext("2d").drawImage(U,0,0,fe,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+fe+"x"+Fe+")."),pe}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),U;return U}function x(U){return U.generateMipmaps&&U.minFilter!==Ln&&U.minFilter!==Nn}function _(U){s.generateMipmap(U)}function P(U,T,ee,se,le=!1){if(U!==null){if(s[U]!==void 0)return s[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let fe=T;if(T===s.RED&&(ee===s.FLOAT&&(fe=s.R32F),ee===s.HALF_FLOAT&&(fe=s.R16F),ee===s.UNSIGNED_BYTE&&(fe=s.R8)),T===s.RED_INTEGER&&(ee===s.UNSIGNED_BYTE&&(fe=s.R8UI),ee===s.UNSIGNED_SHORT&&(fe=s.R16UI),ee===s.UNSIGNED_INT&&(fe=s.R32UI),ee===s.BYTE&&(fe=s.R8I),ee===s.SHORT&&(fe=s.R16I),ee===s.INT&&(fe=s.R32I)),T===s.RG&&(ee===s.FLOAT&&(fe=s.RG32F),ee===s.HALF_FLOAT&&(fe=s.RG16F),ee===s.UNSIGNED_BYTE&&(fe=s.RG8)),T===s.RG_INTEGER&&(ee===s.UNSIGNED_BYTE&&(fe=s.RG8UI),ee===s.UNSIGNED_SHORT&&(fe=s.RG16UI),ee===s.UNSIGNED_INT&&(fe=s.RG32UI),ee===s.BYTE&&(fe=s.RG8I),ee===s.SHORT&&(fe=s.RG16I),ee===s.INT&&(fe=s.RG32I)),T===s.RGB&&ee===s.UNSIGNED_INT_5_9_9_9_REV&&(fe=s.RGB9_E5),T===s.RGBA){const Fe=le?Uc:Rt.getTransfer(se);ee===s.FLOAT&&(fe=s.RGBA32F),ee===s.HALF_FLOAT&&(fe=s.RGBA16F),ee===s.UNSIGNED_BYTE&&(fe=Fe===kt?s.SRGB8_ALPHA8:s.RGBA8),ee===s.UNSIGNED_SHORT_4_4_4_4&&(fe=s.RGBA4),ee===s.UNSIGNED_SHORT_5_5_5_1&&(fe=s.RGB5_A1)}return(fe===s.R16F||fe===s.R32F||fe===s.RG16F||fe===s.RG32F||fe===s.RGBA16F||fe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function b(U,T){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==Ln&&U.minFilter!==Nn?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function I(U){const T=U.target;T.removeEventListener("dispose",I),O(T),T.isVideoTexture&&d.delete(T)}function z(U){const T=U.target;T.removeEventListener("dispose",z),V(T)}function O(U){const T=n.get(U);if(T.__webglInit===void 0)return;const ee=U.source,se=m.get(ee);if(se){const le=se[T.__cacheKey];le.usedTimes--,le.usedTimes===0&&D(U),Object.keys(se).length===0&&m.delete(ee)}n.remove(U)}function D(U){const T=n.get(U);s.deleteTexture(T.__webglTexture);const ee=U.source,se=m.get(ee);delete se[T.__cacheKey],c.memory.textures--}function V(U){const T=n.get(U);if(U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(T.__webglFramebuffer[se]))for(let le=0;le<T.__webglFramebuffer[se].length;le++)s.deleteFramebuffer(T.__webglFramebuffer[se][le]);else s.deleteFramebuffer(T.__webglFramebuffer[se]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[se])}else{if(Array.isArray(T.__webglFramebuffer))for(let se=0;se<T.__webglFramebuffer.length;se++)s.deleteFramebuffer(T.__webglFramebuffer[se]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let se=0;se<T.__webglColorRenderbuffer.length;se++)T.__webglColorRenderbuffer[se]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[se]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const ee=U.textures;for(let se=0,le=ee.length;se<le;se++){const fe=n.get(ee[se]);fe.__webglTexture&&(s.deleteTexture(fe.__webglTexture),c.memory.textures--),n.remove(ee[se])}n.remove(U)}let C=0;function w(){C=0}function X(){const U=C;return U>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+r.maxTextures),C+=1,U}function J(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function k(U,T){const ee=n.get(U);if(U.isVideoTexture&&St(U),U.isRenderTargetTexture===!1&&U.version>0&&ee.__version!==U.version){const se=U.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ct(ee,U,T);return}}t.bindTexture(s.TEXTURE_2D,ee.__webglTexture,s.TEXTURE0+T)}function te(U,T){const ee=n.get(U);if(U.version>0&&ee.__version!==U.version){ct(ee,U,T);return}t.bindTexture(s.TEXTURE_2D_ARRAY,ee.__webglTexture,s.TEXTURE0+T)}function ce(U,T){const ee=n.get(U);if(U.version>0&&ee.__version!==U.version){ct(ee,U,T);return}t.bindTexture(s.TEXTURE_3D,ee.__webglTexture,s.TEXTURE0+T)}function ue(U,T){const ee=n.get(U);if(U.version>0&&ee.__version!==U.version){bt(ee,U,T);return}t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture,s.TEXTURE0+T)}const xe={[Js]:s.REPEAT,[br]:s.CLAMP_TO_EDGE,[Ic]:s.MIRRORED_REPEAT},Q={[Ln]:s.NEAREST,[ag]:s.NEAREST_MIPMAP_NEAREST,[Wo]:s.NEAREST_MIPMAP_LINEAR,[Nn]:s.LINEAR,[Rc]:s.LINEAR_MIPMAP_NEAREST,[Ji]:s.LINEAR_MIPMAP_LINEAR},ge={[tb]:s.NEVER,[ab]:s.ALWAYS,[nb]:s.LESS,[xg]:s.LEQUAL,[ib]:s.EQUAL,[ob]:s.GEQUAL,[rb]:s.GREATER,[sb]:s.NOTEQUAL};function de(U,T){if(T.type===Ai&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Nn||T.magFilter===Rc||T.magFilter===Wo||T.magFilter===Ji||T.minFilter===Nn||T.minFilter===Rc||T.minFilter===Wo||T.minFilter===Ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(U,s.TEXTURE_WRAP_S,xe[T.wrapS]),s.texParameteri(U,s.TEXTURE_WRAP_T,xe[T.wrapT]),(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)&&s.texParameteri(U,s.TEXTURE_WRAP_R,xe[T.wrapR]),s.texParameteri(U,s.TEXTURE_MAG_FILTER,Q[T.magFilter]),s.texParameteri(U,s.TEXTURE_MIN_FILTER,Q[T.minFilter]),T.compareFunction&&(s.texParameteri(U,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(U,s.TEXTURE_COMPARE_FUNC,ge[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Ln||T.minFilter!==Wo&&T.minFilter!==Ji||T.type===Ai&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const ee=e.get("EXT_texture_filter_anisotropic");s.texParameterf(U,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Ae(U,T){let ee=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",I));const se=T.source;let le=m.get(se);le===void 0&&(le={},m.set(se,le));const fe=J(T);if(fe!==U.__cacheKey){le[fe]===void 0&&(le[fe]={texture:s.createTexture(),usedTimes:0},c.memory.textures++,ee=!0),le[fe].usedTimes++;const Fe=le[U.__cacheKey];Fe!==void 0&&(le[U.__cacheKey].usedTimes--,Fe.usedTimes===0&&D(T)),U.__cacheKey=fe,U.__webglTexture=le[fe].texture}return ee}function ct(U,T,ee){let se=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(se=s.TEXTURE_3D);const le=Ae(U,T),fe=T.source;t.bindTexture(se,U.__webglTexture,s.TEXTURE0+ee);const Fe=n.get(fe);if(fe.version!==Fe.__version||le===!0){t.activeTexture(s.TEXTURE0+ee);const pe=Rt.getPrimaries(Rt.workingColorSpace),Pe=T.colorSpace===Er?null:Rt.getPrimaries(T.colorSpace),ze=T.colorSpace===Er||pe===Pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let _e=E(T.image,!1,r.maxTextureSize);_e=ke(T,_e);const Me=o.convert(T.format,T.colorSpace),Xe=o.convert(T.type);let Ce=P(T.internalFormat,Me,Xe,T.colorSpace,T.isVideoTexture);de(se,T);let Le;const rt=T.mipmaps,lt=T.isVideoTexture!==!0&&Ce!==gg,vt=Fe.__version===void 0||le===!0,dt=fe.dataReady,xt=b(T,_e);if(T.isDepthTexture)Ce=s.DEPTH_COMPONENT16,T.type===Ai?Ce=s.DEPTH_COMPONENT32F:T.type===Qs?Ce=s.DEPTH_COMPONENT24:T.type===ia&&(Ce=s.DEPTH24_STENCIL8),vt&&(lt?t.texStorage2D(s.TEXTURE_2D,1,Ce,_e.width,_e.height):t.texImage2D(s.TEXTURE_2D,0,Ce,_e.width,_e.height,0,Me,Xe,null));else if(T.isDataTexture)if(rt.length>0){lt&&vt&&t.texStorage2D(s.TEXTURE_2D,xt,Ce,rt[0].width,rt[0].height);for(let De=0,y=rt.length;De<y;De++)Le=rt[De],lt?dt&&t.texSubImage2D(s.TEXTURE_2D,De,0,0,Le.width,Le.height,Me,Xe,Le.data):t.texImage2D(s.TEXTURE_2D,De,Ce,Le.width,Le.height,0,Me,Xe,Le.data);T.generateMipmaps=!1}else lt?(vt&&t.texStorage2D(s.TEXTURE_2D,xt,Ce,_e.width,_e.height),dt&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,_e.width,_e.height,Me,Xe,_e.data)):t.texImage2D(s.TEXTURE_2D,0,Ce,_e.width,_e.height,0,Me,Xe,_e.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){lt&&vt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,xt,Ce,rt[0].width,rt[0].height,_e.depth);for(let De=0,y=rt.length;De<y;De++)Le=rt[De],T.format!==mi?Me!==null?lt?dt&&t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,De,0,0,0,Le.width,Le.height,_e.depth,Me,Le.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,De,Ce,Le.width,Le.height,_e.depth,0,Le.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?dt&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,De,0,0,0,Le.width,Le.height,_e.depth,Me,Xe,Le.data):t.texImage3D(s.TEXTURE_2D_ARRAY,De,Ce,Le.width,Le.height,_e.depth,0,Me,Xe,Le.data)}else{lt&&vt&&t.texStorage2D(s.TEXTURE_2D,xt,Ce,rt[0].width,rt[0].height);for(let De=0,y=rt.length;De<y;De++)Le=rt[De],T.format!==mi?Me!==null?lt?dt&&t.compressedTexSubImage2D(s.TEXTURE_2D,De,0,0,Le.width,Le.height,Me,Le.data):t.compressedTexImage2D(s.TEXTURE_2D,De,Ce,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?dt&&t.texSubImage2D(s.TEXTURE_2D,De,0,0,Le.width,Le.height,Me,Xe,Le.data):t.texImage2D(s.TEXTURE_2D,De,Ce,Le.width,Le.height,0,Me,Xe,Le.data)}else if(T.isDataArrayTexture)lt?(vt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,xt,Ce,_e.width,_e.height,_e.depth),dt&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,Me,Xe,_e.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ce,_e.width,_e.height,_e.depth,0,Me,Xe,_e.data);else if(T.isData3DTexture)lt?(vt&&t.texStorage3D(s.TEXTURE_3D,xt,Ce,_e.width,_e.height,_e.depth),dt&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,Me,Xe,_e.data)):t.texImage3D(s.TEXTURE_3D,0,Ce,_e.width,_e.height,_e.depth,0,Me,Xe,_e.data);else if(T.isFramebufferTexture){if(vt)if(lt)t.texStorage2D(s.TEXTURE_2D,xt,Ce,_e.width,_e.height);else{let De=_e.width,y=_e.height;for(let Y=0;Y<xt;Y++)t.texImage2D(s.TEXTURE_2D,Y,Ce,De,y,0,Me,Xe,null),De>>=1,y>>=1}}else if(rt.length>0){if(lt&&vt){const De=Et(rt[0]);t.texStorage2D(s.TEXTURE_2D,xt,Ce,De.width,De.height)}for(let De=0,y=rt.length;De<y;De++)Le=rt[De],lt?dt&&t.texSubImage2D(s.TEXTURE_2D,De,0,0,Me,Xe,Le):t.texImage2D(s.TEXTURE_2D,De,Ce,Me,Xe,Le);T.generateMipmaps=!1}else if(lt){if(vt){const De=Et(_e);t.texStorage2D(s.TEXTURE_2D,xt,Ce,De.width,De.height)}dt&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Me,Xe,_e)}else t.texImage2D(s.TEXTURE_2D,0,Ce,Me,Xe,_e);x(T)&&_(se),Fe.__version=fe.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function bt(U,T,ee){if(T.image.length!==6)return;const se=Ae(U,T),le=T.source;t.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+ee);const fe=n.get(le);if(le.version!==fe.__version||se===!0){t.activeTexture(s.TEXTURE0+ee);const Fe=Rt.getPrimaries(Rt.workingColorSpace),pe=T.colorSpace===Er?null:Rt.getPrimaries(T.colorSpace),Pe=T.colorSpace===Er||Fe===pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const ze=T.isCompressedTexture||T.image[0].isCompressedTexture,_e=T.image[0]&&T.image[0].isDataTexture,Me=[];for(let y=0;y<6;y++)!ze&&!_e?Me[y]=E(T.image[y],!0,r.maxCubemapSize):Me[y]=_e?T.image[y].image:T.image[y],Me[y]=ke(T,Me[y]);const Xe=Me[0],Ce=o.convert(T.format,T.colorSpace),Le=o.convert(T.type),rt=P(T.internalFormat,Ce,Le,T.colorSpace),lt=T.isVideoTexture!==!0,vt=fe.__version===void 0||se===!0,dt=le.dataReady;let xt=b(T,Xe);de(s.TEXTURE_CUBE_MAP,T);let De;if(ze){lt&&vt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,xt,rt,Xe.width,Xe.height);for(let y=0;y<6;y++){De=Me[y].mipmaps;for(let Y=0;Y<De.length;Y++){const re=De[Y];T.format!==mi?Ce!==null?lt?dt&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y,0,0,re.width,re.height,Ce,re.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y,rt,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y,0,0,re.width,re.height,Ce,Le,re.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y,rt,re.width,re.height,0,Ce,Le,re.data)}}}else{if(De=T.mipmaps,lt&&vt){De.length>0&&xt++;const y=Et(Me[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,xt,rt,y.width,y.height)}for(let y=0;y<6;y++)if(_e){lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,0,0,Me[y].width,Me[y].height,Ce,Le,Me[y].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,rt,Me[y].width,Me[y].height,0,Ce,Le,Me[y].data);for(let Y=0;Y<De.length;Y++){const ve=De[Y].image[y].image;lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y+1,0,0,ve.width,ve.height,Ce,Le,ve.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y+1,rt,ve.width,ve.height,0,Ce,Le,ve.data)}}else{lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,0,0,Ce,Le,Me[y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,rt,Ce,Le,Me[y]);for(let Y=0;Y<De.length;Y++){const re=De[Y];lt?dt&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y+1,0,0,Ce,Le,re.image[y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+y,Y+1,rt,Ce,Le,re.image[y])}}}x(T)&&_(s.TEXTURE_CUBE_MAP),fe.__version=le.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function ie(U,T,ee,se,le,fe){const Fe=o.convert(ee.format,ee.colorSpace),pe=o.convert(ee.type),Pe=P(ee.internalFormat,Fe,pe,ee.colorSpace);if(!n.get(T).__hasExternalTextures){const _e=Math.max(1,T.width>>fe),Me=Math.max(1,T.height>>fe);le===s.TEXTURE_3D||le===s.TEXTURE_2D_ARRAY?t.texImage3D(le,fe,Pe,_e,Me,T.depth,0,Fe,pe,null):t.texImage2D(le,fe,Pe,_e,Me,0,Fe,pe,null)}t.bindFramebuffer(s.FRAMEBUFFER,U),Ge(T)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,le,n.get(ee).__webglTexture,0,Je(T)):(le===s.TEXTURE_2D||le>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,le,n.get(ee).__webglTexture,fe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function me(U,T,ee){if(s.bindRenderbuffer(s.RENDERBUFFER,U),T.depthBuffer&&!T.stencilBuffer){let se=s.DEPTH_COMPONENT24;if(ee||Ge(T)){const le=T.depthTexture;le&&le.isDepthTexture&&(le.type===Ai?se=s.DEPTH_COMPONENT32F:le.type===Qs&&(se=s.DEPTH_COMPONENT24));const fe=Je(T);Ge(T)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe,se,T.width,T.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,se,T.width,T.height)}else s.renderbufferStorage(s.RENDERBUFFER,se,T.width,T.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,U)}else if(T.depthBuffer&&T.stencilBuffer){const se=Je(T);ee&&Ge(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,T.width,T.height):Ge(T)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,U)}else{const se=T.textures;for(let le=0;le<se.length;le++){const fe=se[le],Fe=o.convert(fe.format,fe.colorSpace),pe=o.convert(fe.type),Pe=P(fe.internalFormat,Fe,pe,fe.colorSpace),ze=Je(T);ee&&Ge(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ze,Pe,T.width,T.height):Ge(T)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ze,Pe,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Pe,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Re(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),k(T.depthTexture,0);const se=n.get(T.depthTexture).__webglTexture,le=Je(T);if(T.depthTexture.format===Ys)Ge(T)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(T.depthTexture.format===Qo)Ge(T)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function be(U){const T=n.get(U),ee=U.isWebGLCubeRenderTarget===!0;if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(ee)throw new Error("target.depthTexture not supported in Cube render targets");Re(T.__webglFramebuffer,U)}else if(ee){T.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[se]),T.__webglDepthbuffer[se]=s.createRenderbuffer(),me(T.__webglDepthbuffer[se],U,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=s.createRenderbuffer(),me(T.__webglDepthbuffer,U,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function qe(U,T,ee){const se=n.get(U);T!==void 0&&ie(se.__webglFramebuffer,U,U.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ee!==void 0&&be(U)}function Ye(U){const T=U.texture,ee=n.get(U),se=n.get(T);U.addEventListener("dispose",z);const le=U.textures,fe=U.isWebGLCubeRenderTarget===!0,Fe=le.length>1;if(Fe||(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=T.version,c.memory.textures++),fe){ee.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(T.mipmaps&&T.mipmaps.length>0){ee.__webglFramebuffer[pe]=[];for(let Pe=0;Pe<T.mipmaps.length;Pe++)ee.__webglFramebuffer[pe][Pe]=s.createFramebuffer()}else ee.__webglFramebuffer[pe]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){ee.__webglFramebuffer=[];for(let pe=0;pe<T.mipmaps.length;pe++)ee.__webglFramebuffer[pe]=s.createFramebuffer()}else ee.__webglFramebuffer=s.createFramebuffer();if(Fe)for(let pe=0,Pe=le.length;pe<Pe;pe++){const ze=n.get(le[pe]);ze.__webglTexture===void 0&&(ze.__webglTexture=s.createTexture(),c.memory.textures++)}if(U.samples>0&&Ge(U)===!1){ee.__webglMultisampledFramebuffer=s.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let pe=0;pe<le.length;pe++){const Pe=le[pe];ee.__webglColorRenderbuffer[pe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ee.__webglColorRenderbuffer[pe]);const ze=o.convert(Pe.format,Pe.colorSpace),_e=o.convert(Pe.type),Me=P(Pe.internalFormat,ze,_e,Pe.colorSpace,U.isXRRenderTarget===!0),Xe=Je(U);s.renderbufferStorageMultisample(s.RENDERBUFFER,Xe,Me,U.width,U.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,ee.__webglColorRenderbuffer[pe])}s.bindRenderbuffer(s.RENDERBUFFER,null),U.depthBuffer&&(ee.__webglDepthRenderbuffer=s.createRenderbuffer(),me(ee.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(fe){t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),de(s.TEXTURE_CUBE_MAP,T);for(let pe=0;pe<6;pe++)if(T.mipmaps&&T.mipmaps.length>0)for(let Pe=0;Pe<T.mipmaps.length;Pe++)ie(ee.__webglFramebuffer[pe][Pe],U,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Pe);else ie(ee.__webglFramebuffer[pe],U,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);x(T)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let pe=0,Pe=le.length;pe<Pe;pe++){const ze=le[pe],_e=n.get(ze);t.bindTexture(s.TEXTURE_2D,_e.__webglTexture),de(s.TEXTURE_2D,ze),ie(ee.__webglFramebuffer,U,ze,s.COLOR_ATTACHMENT0+pe,s.TEXTURE_2D,0),x(ze)&&_(s.TEXTURE_2D)}t.unbindTexture()}else{let pe=s.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(pe=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,se.__webglTexture),de(pe,T),T.mipmaps&&T.mipmaps.length>0)for(let Pe=0;Pe<T.mipmaps.length;Pe++)ie(ee.__webglFramebuffer[Pe],U,T,s.COLOR_ATTACHMENT0,pe,Pe);else ie(ee.__webglFramebuffer,U,T,s.COLOR_ATTACHMENT0,pe,0);x(T)&&_(pe),t.unbindTexture()}U.depthBuffer&&be(U)}function ft(U){const T=U.textures;for(let ee=0,se=T.length;ee<se;ee++){const le=T[ee];if(x(le)){const fe=U.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Fe=n.get(le).__webglTexture;t.bindTexture(fe,Fe),_(fe),t.unbindTexture()}}}function q(U){if(U.samples>0&&Ge(U)===!1){const T=U.textures,ee=U.width,se=U.height;let le=s.COLOR_BUFFER_BIT;const fe=[],Fe=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=n.get(U),Pe=T.length>1;if(Pe)for(let ze=0;ze<T.length;ze++)t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let ze=0;ze<T.length;ze++){fe.push(s.COLOR_ATTACHMENT0+ze),U.depthBuffer&&fe.push(Fe);const _e=pe.__ignoreDepthValues!==void 0?pe.__ignoreDepthValues:!1;if(_e===!1&&(U.depthBuffer&&(le|=s.DEPTH_BUFFER_BIT),U.stencilBuffer&&pe.__isTransmissionRenderTarget!==!0&&(le|=s.STENCIL_BUFFER_BIT)),Pe&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,pe.__webglColorRenderbuffer[ze]),_e===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Fe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Fe])),Pe){const Me=n.get(T[ze]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Me,0)}s.blitFramebuffer(0,0,ee,se,0,0,ee,se,le,s.NEAREST),h&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Pe)for(let ze=0;ze<T.length;ze++){t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.RENDERBUFFER,pe.__webglColorRenderbuffer[ze]);const _e=n.get(T[ze]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.TEXTURE_2D,_e,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}}function Je(U){return Math.min(r.maxSamples,U.samples)}function Ge(U){const T=n.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function St(U){const T=c.render.frame;d.get(U)!==T&&(d.set(U,T),U.update())}function ke(U,T){const ee=U.colorSpace,se=U.format,le=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||ee!==ln&&ee!==Er&&(Rt.getTransfer(ee)===kt?(se!==mi||le!==Cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ee)),T}function Et(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(f.width=U.naturalWidth||U.width,f.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(f.width=U.displayWidth,f.height=U.displayHeight):(f.width=U.width,f.height=U.height),f}this.allocateTextureUnit=X,this.resetTextureUnits=w,this.setTexture2D=k,this.setTexture2DArray=te,this.setTexture3D=ce,this.setTextureCube=ue,this.rebindTextures=qe,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Ge}function S1(s,e){function t(n,r=Er){let o;const c=Rt.getTransfer(r);if(n===Cr)return s.UNSIGNED_BYTE;if(n===ug)return s.UNSIGNED_SHORT_4_4_4_4;if(n===hg)return s.UNSIGNED_SHORT_5_5_5_1;if(n===VE)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===HE)return s.BYTE;if(n===GE)return s.SHORT;if(n===cg)return s.UNSIGNED_SHORT;if(n===lg)return s.INT;if(n===Qs)return s.UNSIGNED_INT;if(n===Ai)return s.FLOAT;if(n===Dc)return s.HALF_FLOAT;if(n===WE)return s.ALPHA;if(n===XE)return s.RGB;if(n===mi)return s.RGBA;if(n===qE)return s.LUMINANCE;if(n===YE)return s.LUMINANCE_ALPHA;if(n===Ys)return s.DEPTH_COMPONENT;if(n===Qo)return s.DEPTH_STENCIL;if(n===fg)return s.RED;if(n===dg)return s.RED_INTEGER;if(n===jE)return s.RG;if(n===pg)return s.RG_INTEGER;if(n===mg)return s.RGBA_INTEGER;if(n===au||n===cu||n===lu||n===uu)if(c===kt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===au)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===lu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===uu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===au)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cu)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===lu)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===uu)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===np||n===ip||n===rp||n===sp)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===np)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ip)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rp)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sp)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gg)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===op||n===ap)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===op)return c===kt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===ap)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===cp||n===lp||n===up||n===hp||n===fp||n===dp||n===pp||n===mp||n===gp||n===_p||n===vp||n===xp||n===yp||n===Sp)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===cp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===lp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===up)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===dp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===mp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_p)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sp)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===hu||n===Mp||n===Ep)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===hu)return c===kt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mp)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ep)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===KE||n===bp||n===Tp||n===Ap)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===hu)return o.COMPRESSED_RED_RGTC1_EXT;if(n===bp)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Tp)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ap)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ia?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class M1 extends Cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let Ar=class extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const E1={type:"move"};class Fu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ar,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ar,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ar,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,o=null,c=null;const l=this._targetRay,h=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){c=!0;for(const E of e.hand.values()){const x=t.getJointPose(E,n),_=this._getHandJoint(f,E);x!==null&&(_.matrix.fromArray(x.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=x.radius),_.visible=x!==null}const d=f.joints["index-finger-tip"],p=f.joints["thumb-tip"],m=d.position.distanceTo(p.position),v=.02,M=.005;f.inputState.pinching&&m>v+M?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&m<=v-M&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(E1)))}return l!==null&&(l.visible=r!==null),h!==null&&(h.visible=o!==null),f!==null&&(f.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ar;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const b1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T1=`
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

}`;class A1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Qt,o=e.properties.get(r);o.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,r=new Pr({vertexShader:b1,fragmentShader:T1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new pn(new oo(20,20),r)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class w1 extends ns{constructor(e,t){super();const n=this;let r=null,o=1,c=null,l="local-floor",h=1,f=null,d=null,p=null,m=null,v=null,M=null;const E=new A1,x=t.getContextAttributes();let _=null,P=null;const b=[],I=[],z=new Oe;let O=null;const D=new Cn;D.layers.enable(1),D.viewport=new It;const V=new Cn;V.layers.enable(2),V.viewport=new It;const C=[D,V],w=new M1;w.layers.enable(1),w.layers.enable(2);let X=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let me=b[ie];return me===void 0&&(me=new Fu,b[ie]=me),me.getTargetRaySpace()},this.getControllerGrip=function(ie){let me=b[ie];return me===void 0&&(me=new Fu,b[ie]=me),me.getGripSpace()},this.getHand=function(ie){let me=b[ie];return me===void 0&&(me=new Fu,b[ie]=me),me.getHandSpace()};function k(ie){const me=I.indexOf(ie.inputSource);if(me===-1)return;const Re=b[me];Re!==void 0&&(Re.update(ie.inputSource,ie.frame,f||c),Re.dispatchEvent({type:ie.type,data:ie.inputSource}))}function te(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",te),r.removeEventListener("inputsourceschange",ce);for(let ie=0;ie<b.length;ie++){const me=I[ie];me!==null&&(I[ie]=null,b[ie].disconnect(me))}X=null,J=null,E.reset(),e.setRenderTarget(_),v=null,m=null,p=null,r=null,P=null,bt.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(z.width,z.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){o=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){l=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||c},this.setReferenceSpace=function(ie){f=ie},this.getBaseLayer=function(){return m!==null?m:v},this.getBinding=function(){return p},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",te),r.addEventListener("inputsourceschange",ce),x.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(z),r.renderState.layers===void 0){const me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};v=new XRWebGLLayer(r,t,me),r.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),P=new es(v.framebufferWidth,v.framebufferHeight,{format:mi,type:Cr,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let me=null,Re=null,be=null;x.depth&&(be=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=x.stencil?Qo:Ys,Re=x.stencil?ia:Qs);const qe={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:o};p=new XRWebGLBinding(r,t),m=p.createProjectionLayer(qe),r.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),P=new es(m.textureWidth,m.textureHeight,{format:mi,type:Cr,depthTexture:new Ig(m.textureWidth,m.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Ye=e.properties.get(P);Ye.__ignoreDepthValues=m.ignoreDepthValues}P.isXRRenderTarget=!0,this.setFoveation(h),f=null,c=await r.requestReferenceSpace(l),bt.setContext(r),bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function ce(ie){for(let me=0;me<ie.removed.length;me++){const Re=ie.removed[me],be=I.indexOf(Re);be>=0&&(I[be]=null,b[be].disconnect(Re))}for(let me=0;me<ie.added.length;me++){const Re=ie.added[me];let be=I.indexOf(Re);if(be===-1){for(let Ye=0;Ye<b.length;Ye++)if(Ye>=I.length){I.push(Re),be=Ye;break}else if(I[Ye]===null){I[Ye]=Re,be=Ye;break}if(be===-1)break}const qe=b[be];qe&&qe.connect(Re)}}const ue=new F,xe=new F;function Q(ie,me,Re){ue.setFromMatrixPosition(me.matrixWorld),xe.setFromMatrixPosition(Re.matrixWorld);const be=ue.distanceTo(xe),qe=me.projectionMatrix.elements,Ye=Re.projectionMatrix.elements,ft=qe[14]/(qe[10]-1),q=qe[14]/(qe[10]+1),Je=(qe[9]+1)/qe[5],Ge=(qe[9]-1)/qe[5],St=(qe[8]-1)/qe[0],ke=(Ye[8]+1)/Ye[0],Et=ft*St,U=ft*ke,T=be/(-St+ke),ee=T*-St;me.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(ee),ie.translateZ(T),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert();const se=ft+T,le=q+T,fe=Et-ee,Fe=U+(be-ee),pe=Je*q/le*se,Pe=Ge*q/le*se;ie.projectionMatrix.makePerspective(fe,Fe,pe,Pe,se,le),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}function ge(ie,me){me===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(me.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;E.texture!==null&&(ie.near=E.depthNear,ie.far=E.depthFar),w.near=V.near=D.near=ie.near,w.far=V.far=D.far=ie.far,(X!==w.near||J!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),X=w.near,J=w.far,D.near=X,D.far=J,V.near=X,V.far=J,D.updateProjectionMatrix(),V.updateProjectionMatrix(),ie.updateProjectionMatrix());const me=ie.parent,Re=w.cameras;ge(w,me);for(let be=0;be<Re.length;be++)ge(Re[be],me);Re.length===2?Q(w,D,V):w.projectionMatrix.copy(D.projectionMatrix),de(ie,w,me)};function de(ie,me,Re){Re===null?ie.matrix.copy(me.matrixWorld):(ie.matrix.copy(Re.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(me.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(me.projectionMatrix),ie.projectionMatrixInverse.copy(me.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=to*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(m===null&&v===null))return h},this.setFoveation=function(ie){h=ie,m!==null&&(m.fixedFoveation=ie),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=ie)},this.hasDepthSensing=function(){return E.texture!==null};let Ae=null;function ct(ie,me){if(d=me.getViewerPose(f||c),M=me,d!==null){const Re=d.views;v!==null&&(e.setRenderTargetFramebuffer(P,v.framebuffer),e.setRenderTarget(P));let be=!1;Re.length!==w.cameras.length&&(w.cameras.length=0,be=!0);for(let Ye=0;Ye<Re.length;Ye++){const ft=Re[Ye];let q=null;if(v!==null)q=v.getViewport(ft);else{const Ge=p.getViewSubImage(m,ft);q=Ge.viewport,Ye===0&&(e.setRenderTargetTextures(P,Ge.colorTexture,m.ignoreDepthValues?void 0:Ge.depthStencilTexture),e.setRenderTarget(P))}let Je=C[Ye];Je===void 0&&(Je=new Cn,Je.layers.enable(Ye),Je.viewport=new It,C[Ye]=Je),Je.matrix.fromArray(ft.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(ft.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(q.x,q.y,q.width,q.height),Ye===0&&(w.matrix.copy(Je.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),be===!0&&w.cameras.push(Je)}const qe=r.enabledFeatures;if(qe&&qe.includes("depth-sensing")){const Ye=p.getDepthInformation(Re[0]);Ye&&Ye.isValid&&Ye.texture&&E.init(e,Ye,r.renderState)}}for(let Re=0;Re<b.length;Re++){const be=I[Re],qe=b[Re];be!==null&&qe!==void 0&&qe.update(be,me,f||c)}E.render(e,w),Ae&&Ae(ie,me),me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:me}),M=null}const bt=new Pg;bt.setAnimationLoop(ct),this.setAnimationLoop=function(ie){Ae=ie},this.dispose=function(){}}}const Yr=new Li,R1=new tt;function C1(s,e){function t(x,_){x.matrixAutoUpdate===!0&&x.updateMatrix(),_.value.copy(x.matrix)}function n(x,_){_.color.getRGB(x.fogColor.value,wg(s)),_.isFog?(x.fogNear.value=_.near,x.fogFar.value=_.far):_.isFogExp2&&(x.fogDensity.value=_.density)}function r(x,_,P,b,I){_.isMeshBasicMaterial||_.isMeshLambertMaterial?o(x,_):_.isMeshToonMaterial?(o(x,_),p(x,_)):_.isMeshPhongMaterial?(o(x,_),d(x,_)):_.isMeshStandardMaterial?(o(x,_),m(x,_),_.isMeshPhysicalMaterial&&v(x,_,I)):_.isMeshMatcapMaterial?(o(x,_),M(x,_)):_.isMeshDepthMaterial?o(x,_):_.isMeshDistanceMaterial?(o(x,_),E(x,_)):_.isMeshNormalMaterial?o(x,_):_.isLineBasicMaterial?(c(x,_),_.isLineDashedMaterial&&l(x,_)):_.isPointsMaterial?h(x,_,P,b):_.isSpriteMaterial?f(x,_):_.isShadowMaterial?(x.color.value.copy(_.color),x.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function o(x,_){x.opacity.value=_.opacity,_.color&&x.diffuse.value.copy(_.color),_.emissive&&x.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(x.map.value=_.map,t(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.bumpMap&&(x.bumpMap.value=_.bumpMap,t(_.bumpMap,x.bumpMapTransform),x.bumpScale.value=_.bumpScale,_.side===Fn&&(x.bumpScale.value*=-1)),_.normalMap&&(x.normalMap.value=_.normalMap,t(_.normalMap,x.normalMapTransform),x.normalScale.value.copy(_.normalScale),_.side===Fn&&x.normalScale.value.negate()),_.displacementMap&&(x.displacementMap.value=_.displacementMap,t(_.displacementMap,x.displacementMapTransform),x.displacementScale.value=_.displacementScale,x.displacementBias.value=_.displacementBias),_.emissiveMap&&(x.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,x.emissiveMapTransform)),_.specularMap&&(x.specularMap.value=_.specularMap,t(_.specularMap,x.specularMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest);const P=e.get(_),b=P.envMap,I=P.envMapRotation;if(b&&(x.envMap.value=b,Yr.copy(I),Yr.x*=-1,Yr.y*=-1,Yr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Yr.y*=-1,Yr.z*=-1),x.envMapRotation.value.setFromMatrix4(R1.makeRotationFromEuler(Yr)),x.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=_.reflectivity,x.ior.value=_.ior,x.refractionRatio.value=_.refractionRatio),_.lightMap){x.lightMap.value=_.lightMap;const z=s._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=_.lightMapIntensity*z,t(_.lightMap,x.lightMapTransform)}_.aoMap&&(x.aoMap.value=_.aoMap,x.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,x.aoMapTransform))}function c(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,_.map&&(x.map.value=_.map,t(_.map,x.mapTransform))}function l(x,_){x.dashSize.value=_.dashSize,x.totalSize.value=_.dashSize+_.gapSize,x.scale.value=_.scale}function h(x,_,P,b){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.size.value=_.size*P,x.scale.value=b*.5,_.map&&(x.map.value=_.map,t(_.map,x.uvTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function f(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.rotation.value=_.rotation,_.map&&(x.map.value=_.map,t(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function d(x,_){x.specular.value.copy(_.specular),x.shininess.value=Math.max(_.shininess,1e-4)}function p(x,_){_.gradientMap&&(x.gradientMap.value=_.gradientMap)}function m(x,_){x.metalness.value=_.metalness,_.metalnessMap&&(x.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,x.metalnessMapTransform)),x.roughness.value=_.roughness,_.roughnessMap&&(x.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,x.roughnessMapTransform)),_.envMap&&(x.envMapIntensity.value=_.envMapIntensity)}function v(x,_,P){x.ior.value=_.ior,_.sheen>0&&(x.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),x.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(x.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,x.sheenColorMapTransform)),_.sheenRoughnessMap&&(x.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,x.sheenRoughnessMapTransform))),_.clearcoat>0&&(x.clearcoat.value=_.clearcoat,x.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(x.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,x.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(x.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Fn&&x.clearcoatNormalScale.value.negate())),_.iridescence>0&&(x.iridescence.value=_.iridescence,x.iridescenceIOR.value=_.iridescenceIOR,x.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(x.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,x.iridescenceMapTransform)),_.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),_.transmission>0&&(x.transmission.value=_.transmission,x.transmissionSamplerMap.value=P.texture,x.transmissionSamplerSize.value.set(P.width,P.height),_.transmissionMap&&(x.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,x.transmissionMapTransform)),x.thickness.value=_.thickness,_.thicknessMap&&(x.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=_.attenuationDistance,x.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(x.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(x.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=_.specularIntensity,x.specularColor.value.copy(_.specularColor),_.specularColorMap&&(x.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,x.specularColorMapTransform)),_.specularIntensityMap&&(x.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,x.specularIntensityMapTransform))}function M(x,_){_.matcap&&(x.matcap.value=_.matcap)}function E(x,_){const P=e.get(_).light;x.referencePosition.value.setFromMatrixPosition(P.matrixWorld),x.nearDistance.value=P.shadow.camera.near,x.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function L1(s,e,t,n){let r={},o={},c=[];const l=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(P,b){const I=b.program;n.uniformBlockBinding(P,I)}function f(P,b){let I=r[P.id];I===void 0&&(M(P),I=d(P),r[P.id]=I,P.addEventListener("dispose",x));const z=b.program;n.updateUBOMapping(P,z);const O=e.render.frame;o[P.id]!==O&&(m(P),o[P.id]=O)}function d(P){const b=p();P.__bindingPointIndex=b;const I=s.createBuffer(),z=P.__size,O=P.usage;return s.bindBuffer(s.UNIFORM_BUFFER,I),s.bufferData(s.UNIFORM_BUFFER,z,O),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,I),I}function p(){for(let P=0;P<l;P++)if(c.indexOf(P)===-1)return c.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(P){const b=r[P.id],I=P.uniforms,z=P.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let O=0,D=I.length;O<D;O++){const V=Array.isArray(I[O])?I[O]:[I[O]];for(let C=0,w=V.length;C<w;C++){const X=V[C];if(v(X,O,C,z)===!0){const J=X.__offset,k=Array.isArray(X.value)?X.value:[X.value];let te=0;for(let ce=0;ce<k.length;ce++){const ue=k[ce],xe=E(ue);typeof ue=="number"||typeof ue=="boolean"?(X.__data[0]=ue,s.bufferSubData(s.UNIFORM_BUFFER,J+te,X.__data)):ue.isMatrix3?(X.__data[0]=ue.elements[0],X.__data[1]=ue.elements[1],X.__data[2]=ue.elements[2],X.__data[3]=0,X.__data[4]=ue.elements[3],X.__data[5]=ue.elements[4],X.__data[6]=ue.elements[5],X.__data[7]=0,X.__data[8]=ue.elements[6],X.__data[9]=ue.elements[7],X.__data[10]=ue.elements[8],X.__data[11]=0):(ue.toArray(X.__data,te),te+=xe.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,J,X.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function v(P,b,I,z){const O=P.value,D=b+"_"+I;if(z[D]===void 0)return typeof O=="number"||typeof O=="boolean"?z[D]=O:z[D]=O.clone(),!0;{const V=z[D];if(typeof O=="number"||typeof O=="boolean"){if(V!==O)return z[D]=O,!0}else if(V.equals(O)===!1)return V.copy(O),!0}return!1}function M(P){const b=P.uniforms;let I=0;const z=16;for(let D=0,V=b.length;D<V;D++){const C=Array.isArray(b[D])?b[D]:[b[D]];for(let w=0,X=C.length;w<X;w++){const J=C[w],k=Array.isArray(J.value)?J.value:[J.value];for(let te=0,ce=k.length;te<ce;te++){const ue=k[te],xe=E(ue),Q=I%z;Q!==0&&z-Q<xe.boundary&&(I+=z-Q),J.__data=new Float32Array(xe.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=I,I+=xe.storage}}}const O=I%z;return O>0&&(I+=z-O),P.__size=I,P.__cache={},this}function E(P){const b={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(b.boundary=4,b.storage=4):P.isVector2?(b.boundary=8,b.storage=8):P.isVector3||P.isColor?(b.boundary=16,b.storage=12):P.isVector4?(b.boundary=16,b.storage=16):P.isMatrix3?(b.boundary=48,b.storage=48):P.isMatrix4?(b.boundary=64,b.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),b}function x(P){const b=P.target;b.removeEventListener("dispose",x);const I=c.indexOf(b.__bindingPointIndex);c.splice(I,1),s.deleteBuffer(r[b.id]),delete r[b.id],delete o[b.id]}function _(){for(const P in r)s.deleteBuffer(r[P]);c=[],r={},o={}}return{bind:h,update:f,dispose:_}}class P1{constructor(e={}){const{canvas:t=bb(),context:n=null,depth:r=!0,stencil:o=!1,alpha:c=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:f=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=c;const v=new Uint32Array(4),M=new Int32Array(4);let E=null,x=null;const _=[],P=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this._useLegacyLights=!1,this.toneMapping=tr,this.toneMappingExposure=1;const b=this;let I=!1,z=0,O=0,D=null,V=-1,C=null;const w=new It,X=new It;let J=null;const k=new Ue(0);let te=0,ce=t.width,ue=t.height,xe=1,Q=null,ge=null;const de=new It(0,0,ce,ue),Ae=new It(0,0,ce,ue);let ct=!1;const bt=new Mh;let ie=!1,me=!1;const Re=new tt,be=new Oe,qe=new F,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ft(){return D===null?xe:1}let q=n;function Je(L,W){const Z=t.getContext(L,W);return Z!==null?Z:null}try{const L={alpha:!0,depth:r,stencil:o,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:f,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vh}`),t.addEventListener("webglcontextlost",Y,!1),t.addEventListener("webglcontextrestored",re,!1),t.addEventListener("webglcontextcreationerror",ve,!1),q===null){const W="webgl2";if(q=Je(W,L),q===null)throw Je(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Ge,St,ke,Et,U,T,ee,se,le,fe,Fe,pe,Pe,ze,_e,Me,Xe,Ce,Le,rt,lt,vt,dt,xt;function De(){Ge=new kw(q),Ge.init(),St=new Dw(q,Ge,e),vt=new S1(q,Ge),ke=new x1(q),Et=new Gw(q),U=new s1,T=new y1(q,Ge,ke,U,St,vt,Et),ee=new Nw(b),se=new Bw(b),le=new jb(q),dt=new Pw(q,le),fe=new zw(q,le,Et,dt),Fe=new Ww(q,fe,le,Et),Le=new Vw(q,St,T),Me=new Uw(U),pe=new r1(b,ee,se,Ge,St,dt,Me),Pe=new C1(b,U),ze=new a1,_e=new d1(Ge),Ce=new Lw(b,ee,se,ke,Fe,m,h),Xe=new v1(b,Fe,St),xt=new L1(q,Et,St,ke),rt=new Iw(q,Ge,Et),lt=new Hw(q,Ge,Et),Et.programs=pe.programs,b.capabilities=St,b.extensions=Ge,b.properties=U,b.renderLists=ze,b.shadowMap=Xe,b.state=ke,b.info=Et}De();const y=new w1(b,q);this.xr=y,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const L=Ge.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=Ge.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return xe},this.setPixelRatio=function(L){L!==void 0&&(xe=L,this.setSize(ce,ue,!1))},this.getSize=function(L){return L.set(ce,ue)},this.setSize=function(L,W,Z=!0){if(y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ce=L,ue=W,t.width=Math.floor(L*xe),t.height=Math.floor(W*xe),Z===!0&&(t.style.width=L+"px",t.style.height=W+"px"),this.setViewport(0,0,L,W)},this.getDrawingBufferSize=function(L){return L.set(ce*xe,ue*xe).floor()},this.setDrawingBufferSize=function(L,W,Z){ce=L,ue=W,xe=Z,t.width=Math.floor(L*Z),t.height=Math.floor(W*Z),this.setViewport(0,0,L,W)},this.getCurrentViewport=function(L){return L.copy(w)},this.getViewport=function(L){return L.copy(de)},this.setViewport=function(L,W,Z,$){L.isVector4?de.set(L.x,L.y,L.z,L.w):de.set(L,W,Z,$),ke.viewport(w.copy(de).multiplyScalar(xe).round())},this.getScissor=function(L){return L.copy(Ae)},this.setScissor=function(L,W,Z,$){L.isVector4?Ae.set(L.x,L.y,L.z,L.w):Ae.set(L,W,Z,$),ke.scissor(X.copy(Ae).multiplyScalar(xe).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(L){ke.setScissorTest(ct=L)},this.setOpaqueSort=function(L){Q=L},this.setTransparentSort=function(L){ge=L},this.getClearColor=function(L){return L.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(L=!0,W=!0,Z=!0){let $=0;if(L){let j=!1;if(D!==null){const Ee=D.texture.format;j=Ee===mg||Ee===pg||Ee===dg}if(j){const Ee=D.texture.type,Ne=Ee===Cr||Ee===Qs||Ee===cg||Ee===ia||Ee===ug||Ee===hg,Be=Ce.getClearColor(),je=Ce.getClearAlpha(),Ke=Be.r,Ze=Be.g,Qe=Be.b;Ne?(v[0]=Ke,v[1]=Ze,v[2]=Qe,v[3]=je,q.clearBufferuiv(q.COLOR,0,v)):(M[0]=Ke,M[1]=Ze,M[2]=Qe,M[3]=je,q.clearBufferiv(q.COLOR,0,M))}else $|=q.COLOR_BUFFER_BIT}W&&($|=q.DEPTH_BUFFER_BIT),Z&&($|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Y,!1),t.removeEventListener("webglcontextrestored",re,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),ze.dispose(),_e.dispose(),U.dispose(),ee.dispose(),se.dispose(),Fe.dispose(),dt.dispose(),xt.dispose(),pe.dispose(),y.dispose(),y.removeEventListener("sessionstart",Vt),y.removeEventListener("sessionend",Wt),Mn.stop()};function Y(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function re(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const L=Et.autoReset,W=Xe.enabled,Z=Xe.autoUpdate,$=Xe.needsUpdate,j=Xe.type;De(),Et.autoReset=L,Xe.enabled=W,Xe.autoUpdate=Z,Xe.needsUpdate=$,Xe.type=j}function ve(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Te(L){const W=L.target;W.removeEventListener("dispose",Te),pt(W)}function pt(L){ut(L),U.remove(L)}function ut(L){const W=U.get(L).programs;W!==void 0&&(W.forEach(function(Z){pe.releaseProgram(Z)}),L.isShaderMaterial&&pe.releaseShaderCache(L))}this.renderBufferDirect=function(L,W,Z,$,j,Ee){W===null&&(W=Ye);const Ne=j.isMesh&&j.matrixWorld.determinant()<0,Be=Kc(L,W,Z,$,j);ke.setMaterial($,Ne);let je=Z.index,Ke=1;if($.wireframe===!0){if(je=fe.getWireframeAttribute(Z),je===void 0)return;Ke=2}const Ze=Z.drawRange,Qe=Z.attributes.position;let Ht=Ze.start*Ke,gn=(Ze.start+Ze.count)*Ke;Ee!==null&&(Ht=Math.max(Ht,Ee.start*Ke),gn=Math.min(gn,(Ee.start+Ee.count)*Ke)),je!==null?(Ht=Math.max(Ht,0),gn=Math.min(gn,je.count)):Qe!=null&&(Ht=Math.max(Ht,0),gn=Math.min(gn,Qe.count));const qt=gn-Ht;if(qt<0||qt===1/0)return;dt.setup(j,$,Be,Z,je);let qn,Ft=rt;if(je!==null&&(qn=le.get(je),Ft=lt,Ft.setIndex(qn)),j.isMesh)$.wireframe===!0?(ke.setLineWidth($.wireframeLinewidth*ft()),Ft.setMode(q.LINES)):Ft.setMode(q.TRIANGLES);else if(j.isLine){let nt=$.linewidth;nt===void 0&&(nt=1),ke.setLineWidth(nt*ft()),j.isLineSegments?Ft.setMode(q.LINES):j.isLineLoop?Ft.setMode(q.LINE_LOOP):Ft.setMode(q.LINE_STRIP)}else j.isPoints?Ft.setMode(q.POINTS):j.isSprite&&Ft.setMode(q.TRIANGLES);if(j.isBatchedMesh)Ft.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else if(j.isInstancedMesh)Ft.renderInstances(Ht,qt,j.count);else if(Z.isInstancedBufferGeometry){const nt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,fo=Math.min(Z.instanceCount,nt);Ft.renderInstances(Ht,qt,fo)}else Ft.render(Ht,qt)};function Ut(L,W,Z){L.transparent===!0&&L.side===Ti&&L.forceSinglePass===!1?(L.side=Fn,L.needsUpdate=!0,rs(L,W,Z),L.side=wi,L.needsUpdate=!0,rs(L,W,Z),L.side=Ti):rs(L,W,Z)}this.compile=function(L,W,Z=null){Z===null&&(Z=L),x=_e.get(Z),x.init(),P.push(x),Z.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(x.pushLight(j),j.castShadow&&x.pushShadow(j))}),L!==Z&&L.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(x.pushLight(j),j.castShadow&&x.pushShadow(j))}),x.setupLights(b._useLegacyLights);const $=new Set;return L.traverse(function(j){const Ee=j.material;if(Ee)if(Array.isArray(Ee))for(let Ne=0;Ne<Ee.length;Ne++){const Be=Ee[Ne];Ut(Be,Z,j),$.add(Be)}else Ut(Ee,Z,j),$.add(Ee)}),P.pop(),x=null,$},this.compileAsync=function(L,W,Z=null){const $=this.compile(L,W,Z);return new Promise(j=>{function Ee(){if($.forEach(function(Ne){U.get(Ne).currentProgram.isReady()&&$.delete(Ne)}),$.size===0){j(L);return}setTimeout(Ee,10)}Ge.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let Kt=null;function Tt(L){Kt&&Kt(L)}function Vt(){Mn.stop()}function Wt(){Mn.start()}const Mn=new Pg;Mn.setAnimationLoop(Tt),typeof self<"u"&&Mn.setContext(self),this.setAnimationLoop=function(L){Kt=L,y.setAnimationLoop(L),L===null?Mn.stop():Mn.start()},y.addEventListener("sessionstart",Vt),y.addEventListener("sessionend",Wt),this.render=function(L,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),y.enabled===!0&&y.isPresenting===!0&&(y.cameraAutoUpdate===!0&&y.updateCamera(W),W=y.getCamera()),L.isScene===!0&&L.onBeforeRender(b,L,W,D),x=_e.get(L,P.length),x.init(),P.push(x),Re.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),bt.setFromProjectionMatrix(Re),me=this.localClippingEnabled,ie=Me.init(this.clippingPlanes,me),E=ze.get(L,_.length),E.init(),_.push(E),mn(L,W,0,b.sortObjects),E.finish(),b.sortObjects===!0&&E.sort(Q,ge),this.info.render.frame++,ie===!0&&Me.beginShadows();const Z=x.state.shadowsArray;if(Xe.render(Z,L,W),ie===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset(),(y.enabled===!1||y.isPresenting===!1||y.hasDepthSensing()===!1)&&Ce.render(E,L),x.setupLights(b._useLegacyLights),W.isArrayCamera){const $=W.cameras;for(let j=0,Ee=$.length;j<Ee;j++){const Ne=$[j];vi(E,L,Ne,Ne.viewport)}}else vi(E,L,W);D!==null&&(T.updateMultisampleRenderTarget(D),T.updateRenderTargetMipmap(D)),L.isScene===!0&&L.onAfterRender(b,L,W),dt.resetDefaultState(),V=-1,C=null,P.pop(),P.length>0?x=P[P.length-1]:x=null,_.pop(),_.length>0?E=_[_.length-1]:E=null};function mn(L,W,Z,$){if(L.visible===!1)return;if(L.layers.test(W.layers)){if(L.isGroup)Z=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(W);else if(L.isLight)x.pushLight(L),L.castShadow&&x.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||bt.intersectsSprite(L)){$&&qe.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Re);const Ne=Fe.update(L),Be=L.material;Be.visible&&E.push(L,Ne,Be,Z,qe.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||bt.intersectsObject(L))){const Ne=Fe.update(L),Be=L.material;if($&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),qe.copy(L.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),qe.copy(Ne.boundingSphere.center)),qe.applyMatrix4(L.matrixWorld).applyMatrix4(Re)),Array.isArray(Be)){const je=Ne.groups;for(let Ke=0,Ze=je.length;Ke<Ze;Ke++){const Qe=je[Ke],Ht=Be[Qe.materialIndex];Ht&&Ht.visible&&E.push(L,Ne,Ht,Z,qe.z,Qe)}}else Be.visible&&E.push(L,Ne,Be,Z,qe.z,null)}}const Ee=L.children;for(let Ne=0,Be=Ee.length;Ne<Be;Ne++)mn(Ee[Ne],W,Z,$)}function vi(L,W,Z,$){const j=L.opaque,Ee=L.transmissive,Ne=L.transparent;x.setupLightsView(Z),ie===!0&&Me.setGlobalState(b.clippingPlanes,Z),Ee.length>0&&xi(j,Ee,W,Z),$&&ke.viewport(w.copy($)),j.length>0&&Ni(j,W,Z),Ee.length>0&&Ni(Ee,W,Z),Ne.length>0&&Ni(Ne,W,Z),ke.buffers.depth.setTest(!0),ke.buffers.depth.setMask(!0),ke.buffers.color.setMask(!0),ke.setPolygonOffset(!1)}function xi(L,W,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget===null){x.state.transmissionRenderTarget=new es(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Dc:Cr,minFilter:Ji,samples:4,stencilBuffer:o});const Ke=U.get(x.state.transmissionRenderTarget);Ke.__isTransmissionRenderTarget=!0}const Ee=x.state.transmissionRenderTarget;b.getDrawingBufferSize(be),Ee.setSize(be.x,be.y);const Ne=b.getRenderTarget();b.setRenderTarget(Ee),b.getClearColor(k),te=b.getClearAlpha(),te<1&&b.setClearColor(16777215,.5),b.clear();const Be=b.toneMapping;b.toneMapping=tr,Ni(L,Z,$),T.updateMultisampleRenderTarget(Ee),T.updateRenderTargetMipmap(Ee);let je=!1;for(let Ke=0,Ze=W.length;Ke<Ze;Ke++){const Qe=W[Ke],Ht=Qe.object,gn=Qe.geometry,qt=Qe.material,qn=Qe.group;if(qt.side===Ti&&Ht.layers.test($.layers)){const Ft=qt.side;qt.side=Fn,qt.needsUpdate=!0,oa(Ht,Z,$,gn,qt,qn),qt.side=Ft,qt.needsUpdate=!0,je=!0}}je===!0&&(T.updateMultisampleRenderTarget(Ee),T.updateRenderTargetMipmap(Ee)),b.setRenderTarget(Ne),b.setClearColor(k,te),b.toneMapping=Be}function Ni(L,W,Z){const $=W.isScene===!0?W.overrideMaterial:null;for(let j=0,Ee=L.length;j<Ee;j++){const Ne=L[j],Be=Ne.object,je=Ne.geometry,Ke=$===null?Ne.material:$,Ze=Ne.group;Be.layers.test(Z.layers)&&oa(Be,W,Z,je,Ke,Ze)}}function oa(L,W,Z,$,j,Ee){L.onBeforeRender(b,W,Z,$,j,Ee),L.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),j.onBeforeRender(b,W,Z,$,L,Ee),j.transparent===!0&&j.side===Ti&&j.forceSinglePass===!1?(j.side=Fn,j.needsUpdate=!0,b.renderBufferDirect(Z,W,$,j,L,Ee),j.side=wi,j.needsUpdate=!0,b.renderBufferDirect(Z,W,$,j,L,Ee),j.side=Ti):b.renderBufferDirect(Z,W,$,j,L,Ee),L.onAfterRender(b,W,Z,$,j,Ee)}function rs(L,W,Z){W.isScene!==!0&&(W=Ye);const $=U.get(L),j=x.state.lights,Ee=x.state.shadowsArray,Ne=j.state.version,Be=pe.getParameters(L,j.state,Ee,W,Z),je=pe.getProgramCacheKey(Be);let Ke=$.programs;$.environment=L.isMeshStandardMaterial?W.environment:null,$.fog=W.fog,$.envMap=(L.isMeshStandardMaterial?se:ee).get(L.envMap||$.environment),$.envMapRotation=$.environment!==null&&L.envMap===null?W.environmentRotation:L.envMapRotation,Ke===void 0&&(L.addEventListener("dispose",Te),Ke=new Map,$.programs=Ke);let Ze=Ke.get(je);if(Ze!==void 0){if($.currentProgram===Ze&&$.lightsStateVersion===Ne)return ca(L,Be),Ze}else Be.uniforms=pe.getUniforms(L),L.onBuild(Z,Be,b),L.onBeforeCompile(Be,b),Ze=pe.acquireProgram(Be,je),Ke.set(je,Ze),$.uniforms=Be.uniforms;const Qe=$.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Qe.clippingPlanes=Me.uniform),ca(L,Be),$.needsLights=$c(L),$.lightsStateVersion=Ne,$.needsLights&&(Qe.ambientLightColor.value=j.state.ambient,Qe.lightProbe.value=j.state.probe,Qe.directionalLights.value=j.state.directional,Qe.directionalLightShadows.value=j.state.directionalShadow,Qe.spotLights.value=j.state.spot,Qe.spotLightShadows.value=j.state.spotShadow,Qe.rectAreaLights.value=j.state.rectArea,Qe.ltc_1.value=j.state.rectAreaLTC1,Qe.ltc_2.value=j.state.rectAreaLTC2,Qe.pointLights.value=j.state.point,Qe.pointLightShadows.value=j.state.pointShadow,Qe.hemisphereLights.value=j.state.hemi,Qe.directionalShadowMap.value=j.state.directionalShadowMap,Qe.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Qe.spotShadowMap.value=j.state.spotShadowMap,Qe.spotLightMatrix.value=j.state.spotLightMatrix,Qe.spotLightMap.value=j.state.spotLightMap,Qe.pointShadowMap.value=j.state.pointShadowMap,Qe.pointShadowMatrix.value=j.state.pointShadowMatrix),$.currentProgram=Ze,$.uniformsList=null,Ze}function aa(L){if(L.uniformsList===null){const W=L.currentProgram.getUniforms();L.uniformsList=Cc.seqWithValue(W.seq,L.uniforms)}return L.uniformsList}function ca(L,W){const Z=U.get(L);Z.outputColorSpace=W.outputColorSpace,Z.batching=W.batching,Z.instancing=W.instancing,Z.instancingColor=W.instancingColor,Z.instancingMorph=W.instancingMorph,Z.skinning=W.skinning,Z.morphTargets=W.morphTargets,Z.morphNormals=W.morphNormals,Z.morphColors=W.morphColors,Z.morphTargetsCount=W.morphTargetsCount,Z.numClippingPlanes=W.numClippingPlanes,Z.numIntersection=W.numClipIntersection,Z.vertexAlphas=W.vertexAlphas,Z.vertexTangents=W.vertexTangents,Z.toneMapping=W.toneMapping}function Kc(L,W,Z,$,j){W.isScene!==!0&&(W=Ye),T.resetTextureUnits();const Ee=W.fog,Ne=$.isMeshStandardMaterial?W.environment:null,Be=D===null?b.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:ln,je=($.isMeshStandardMaterial?se:ee).get($.envMap||Ne),Ke=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ze=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Qe=!!Z.morphAttributes.position,Ht=!!Z.morphAttributes.normal,gn=!!Z.morphAttributes.color;let qt=tr;$.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(qt=b.toneMapping);const qn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Ft=qn!==void 0?qn.length:0,nt=U.get($),fo=x.state.lights;if(ie===!0&&(me===!0||L!==C)){const En=L===C&&$.id===V;Me.setState($,L,En)}let Nt=!1;$.version===nt.__version?(nt.needsLights&&nt.lightsStateVersion!==fo.state.version||nt.outputColorSpace!==Be||j.isBatchedMesh&&nt.batching===!1||!j.isBatchedMesh&&nt.batching===!0||j.isInstancedMesh&&nt.instancing===!1||!j.isInstancedMesh&&nt.instancing===!0||j.isSkinnedMesh&&nt.skinning===!1||!j.isSkinnedMesh&&nt.skinning===!0||j.isInstancedMesh&&nt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&nt.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&nt.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&nt.instancingMorph===!1&&j.morphTexture!==null||nt.envMap!==je||$.fog===!0&&nt.fog!==Ee||nt.numClippingPlanes!==void 0&&(nt.numClippingPlanes!==Me.numPlanes||nt.numIntersection!==Me.numIntersection)||nt.vertexAlphas!==Ke||nt.vertexTangents!==Ze||nt.morphTargets!==Qe||nt.morphNormals!==Ht||nt.morphColors!==gn||nt.toneMapping!==qt||nt.morphTargetsCount!==Ft)&&(Nt=!0):(Nt=!0,nt.__version=$.version);let yi=nt.currentProgram;Nt===!0&&(yi=rs($,W,j));let po=!1,ir=!1,Ir=!1;const sn=yi.getUniforms(),si=nt.uniforms;if(ke.useProgram(yi.program)&&(po=!0,ir=!0,Ir=!0),$.id!==V&&(V=$.id,ir=!0),po||C!==L){sn.setValue(q,"projectionMatrix",L.projectionMatrix),sn.setValue(q,"viewMatrix",L.matrixWorldInverse);const En=sn.map.cameraPosition;En!==void 0&&En.setValue(q,qe.setFromMatrixPosition(L.matrixWorld)),St.logarithmicDepthBuffer&&sn.setValue(q,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&sn.setValue(q,"isOrthographic",L.isOrthographicCamera===!0),C!==L&&(C=L,ir=!0,Ir=!0)}if(j.isSkinnedMesh){sn.setOptional(q,j,"bindMatrix"),sn.setOptional(q,j,"bindMatrixInverse");const En=j.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),sn.setValue(q,"boneTexture",En.boneTexture,T))}j.isBatchedMesh&&(sn.setOptional(q,j,"batchingTexture"),sn.setValue(q,"batchingTexture",j._matricesTexture,T));const rr=Z.morphAttributes;if((rr.position!==void 0||rr.normal!==void 0||rr.color!==void 0)&&Le.update(j,Z,yi),(ir||nt.receiveShadow!==j.receiveShadow)&&(nt.receiveShadow=j.receiveShadow,sn.setValue(q,"receiveShadow",j.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(si.envMap.value=je,si.flipEnvMap.value=je.isCubeTexture&&je.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&W.environment!==null&&(si.envMapIntensity.value=W.environmentIntensity),ir&&(sn.setValue(q,"toneMappingExposure",b.toneMappingExposure),nt.needsLights&&Zc(si,Ir),Ee&&$.fog===!0&&Pe.refreshFogUniforms(si,Ee),Pe.refreshMaterialUniforms(si,$,xe,ue,x.state.transmissionRenderTarget),Cc.upload(q,aa(nt),si,T)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Cc.upload(q,aa(nt),si,T),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&sn.setValue(q,"center",j.center),sn.setValue(q,"modelViewMatrix",j.modelViewMatrix),sn.setValue(q,"normalMatrix",j.normalMatrix),sn.setValue(q,"modelMatrix",j.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const En=$.uniformsGroups;for(let mo=0,la=En.length;mo<la;mo++){const go=En[mo];xt.update(go,yi),xt.bind(go,yi)}}return yi}function Zc(L,W){L.ambientLightColor.needsUpdate=W,L.lightProbe.needsUpdate=W,L.directionalLights.needsUpdate=W,L.directionalLightShadows.needsUpdate=W,L.pointLights.needsUpdate=W,L.pointLightShadows.needsUpdate=W,L.spotLights.needsUpdate=W,L.spotLightShadows.needsUpdate=W,L.rectAreaLights.needsUpdate=W,L.hemisphereLights.needsUpdate=W}function $c(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(L,W,Z){U.get(L.texture).__webglTexture=W,U.get(L.depthTexture).__webglTexture=Z;const $=U.get(L);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=Z===void 0,$.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,W){const Z=U.get(L);Z.__webglFramebuffer=W,Z.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(L,W=0,Z=0){D=L,z=W,O=Z;let $=!0,j=null,Ee=!1,Ne=!1;if(L){const je=U.get(L);je.__useDefaultFramebuffer!==void 0?(ke.bindFramebuffer(q.FRAMEBUFFER,null),$=!1):je.__webglFramebuffer===void 0?T.setupRenderTarget(L):je.__hasExternalTextures&&T.rebindTextures(L,U.get(L.texture).__webglTexture,U.get(L.depthTexture).__webglTexture);const Ke=L.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Ne=!0);const Ze=U.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Ze[W])?j=Ze[W][Z]:j=Ze[W],Ee=!0):L.samples>0&&T.useMultisampledRTT(L)===!1?j=U.get(L).__webglMultisampledFramebuffer:Array.isArray(Ze)?j=Ze[Z]:j=Ze,w.copy(L.viewport),X.copy(L.scissor),J=L.scissorTest}else w.copy(de).multiplyScalar(xe).floor(),X.copy(Ae).multiplyScalar(xe).floor(),J=ct;if(ke.bindFramebuffer(q.FRAMEBUFFER,j)&&$&&ke.drawBuffers(L,j),ke.viewport(w),ke.scissor(X),ke.setScissorTest(J),Ee){const je=U.get(L.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+W,je.__webglTexture,Z)}else if(Ne){const je=U.get(L.texture),Ke=W||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,je.__webglTexture,Z||0,Ke)}V=-1},this.readRenderTargetPixels=function(L,W,Z,$,j,Ee,Ne){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=U.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Ne!==void 0&&(Be=Be[Ne]),Be){ke.bindFramebuffer(q.FRAMEBUFFER,Be);try{const je=L.texture,Ke=je.format,Ze=je.type;if(Ke!==mi&&vt.convert(Ke)!==q.getParameter(q.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Qe=Ze===Dc&&(Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float"));if(Ze!==Cr&&vt.convert(Ze)!==q.getParameter(q.IMPLEMENTATION_COLOR_READ_TYPE)&&Ze!==Ai&&!Qe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=L.width-$&&Z>=0&&Z<=L.height-j&&q.readPixels(W,Z,$,j,vt.convert(Ke),vt.convert(Ze),Ee)}finally{const je=D!==null?U.get(D).__webglFramebuffer:null;ke.bindFramebuffer(q.FRAMEBUFFER,je)}}},this.copyFramebufferToTexture=function(L,W,Z=0){const $=Math.pow(2,-Z),j=Math.floor(W.image.width*$),Ee=Math.floor(W.image.height*$);T.setTexture2D(W,0),q.copyTexSubImage2D(q.TEXTURE_2D,Z,0,0,L.x,L.y,j,Ee),ke.unbindTexture()},this.copyTextureToTexture=function(L,W,Z,$=0){const j=W.image.width,Ee=W.image.height,Ne=vt.convert(Z.format),Be=vt.convert(Z.type);T.setTexture2D(Z,0),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,Z.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,Z.unpackAlignment),W.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,$,L.x,L.y,j,Ee,Ne,Be,W.image.data):W.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,$,L.x,L.y,W.mipmaps[0].width,W.mipmaps[0].height,Ne,W.mipmaps[0].data):q.texSubImage2D(q.TEXTURE_2D,$,L.x,L.y,Ne,Be,W.image),$===0&&Z.generateMipmaps&&q.generateMipmap(q.TEXTURE_2D),ke.unbindTexture()},this.copyTextureToTexture3D=function(L,W,Z,$,j=0){const Ee=Math.round(L.max.x-L.min.x),Ne=Math.round(L.max.y-L.min.y),Be=L.max.z-L.min.z+1,je=vt.convert($.format),Ke=vt.convert($.type);let Ze;if($.isData3DTexture)T.setTexture3D($,0),Ze=q.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)T.setTexture2DArray($,0),Ze=q.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,$.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,$.unpackAlignment);const Qe=q.getParameter(q.UNPACK_ROW_LENGTH),Ht=q.getParameter(q.UNPACK_IMAGE_HEIGHT),gn=q.getParameter(q.UNPACK_SKIP_PIXELS),qt=q.getParameter(q.UNPACK_SKIP_ROWS),qn=q.getParameter(q.UNPACK_SKIP_IMAGES),Ft=Z.isCompressedTexture?Z.mipmaps[j]:Z.image;q.pixelStorei(q.UNPACK_ROW_LENGTH,Ft.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ft.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,L.min.x),q.pixelStorei(q.UNPACK_SKIP_ROWS,L.min.y),q.pixelStorei(q.UNPACK_SKIP_IMAGES,L.min.z),Z.isDataTexture||Z.isData3DTexture?q.texSubImage3D(Ze,j,W.x,W.y,W.z,Ee,Ne,Be,je,Ke,Ft.data):$.isCompressedArrayTexture?q.compressedTexSubImage3D(Ze,j,W.x,W.y,W.z,Ee,Ne,Be,je,Ft.data):q.texSubImage3D(Ze,j,W.x,W.y,W.z,Ee,Ne,Be,je,Ke,Ft),q.pixelStorei(q.UNPACK_ROW_LENGTH,Qe),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ht),q.pixelStorei(q.UNPACK_SKIP_PIXELS,gn),q.pixelStorei(q.UNPACK_SKIP_ROWS,qt),q.pixelStorei(q.UNPACK_SKIP_IMAGES,qn),j===0&&$.generateMipmaps&&q.generateMipmap(Ze),ke.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?T.setTextureCube(L,0):L.isData3DTexture?T.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?T.setTexture2DArray(L,0):T.setTexture2D(L,0),ke.unbindTexture()},this.resetState=function(){z=0,O=0,D=null,ke.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===xh?"display-p3":"srgb",t.unpackColorSpace=Rt.workingColorSpace===Gc?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class I1 extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Li,this.environmentIntensity=1,this.environmentRotation=new Li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Bg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=nh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=gi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Sg("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new F;class na{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=di(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=di(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=di(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=di(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=di(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array),o=Lt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new en(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new na(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class kg extends ii{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Bs;const Oo=new F,ks=new F,zs=new F,Hs=new Oe,Fo=new Oe,zg=new tt,gc=new F,Bo=new F,_c=new F,ym=new Oe,Bu=new Oe,Sm=new Oe;class D1 extends Mt{constructor(e=new kg){if(super(),this.isSprite=!0,this.type="Sprite",Bs===void 0){Bs=new un;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Bg(t,5);Bs.setIndex([0,1,2,0,2,3]),Bs.setAttribute("position",new na(n,3,0,!1)),Bs.setAttribute("uv",new na(n,2,3,!1))}this.geometry=Bs,this.material=e,this.center=new Oe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ks.setFromMatrixScale(this.matrixWorld),zg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),zs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ks.multiplyScalar(-zs.z);const n=this.material.rotation;let r,o;n!==0&&(o=Math.cos(n),r=Math.sin(n));const c=this.center;vc(gc.set(-.5,-.5,0),zs,c,ks,r,o),vc(Bo.set(.5,-.5,0),zs,c,ks,r,o),vc(_c.set(.5,.5,0),zs,c,ks,r,o),ym.set(0,0),Bu.set(1,0),Sm.set(1,1);let l=e.ray.intersectTriangle(gc,Bo,_c,!1,Oo);if(l===null&&(vc(Bo.set(-.5,.5,0),zs,c,ks,r,o),Bu.set(0,1),l=e.ray.intersectTriangle(gc,_c,Bo,!1,Oo),l===null))return;const h=e.ray.origin.distanceTo(Oo);h<e.near||h>e.far||t.push({distance:h,point:Oo.clone(),uv:pi.getInterpolation(Oo,gc,Bo,_c,ym,Bu,Sm,new Oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function vc(s,e,t,n,r,o){Hs.subVectors(s,t).addScalar(.5).multiply(n),r!==void 0?(Fo.x=o*Hs.x-r*Hs.y,Fo.y=r*Hs.x+o*Hs.y):Fo.copy(Hs),s.copy(e),s.x+=Fo.x,s.y+=Fo.y,s.applyMatrix4(zg)}const Mm=new F,Em=new It,bm=new It,U1=new F,Tm=new tt,xc=new F,ku=new Di,Am=new tt,zu=new so;class N1 extends pn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=tp,this.bindMatrix=new tt,this.bindMatrixInverse=new tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new _i),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,xc),this.boundingBox.expandByPoint(xc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Di),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,xc),this.boundingSphere.expandByPoint(xc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ku.copy(this.boundingSphere),ku.applyMatrix4(r),e.ray.intersectsSphere(ku)!==!1&&(Am.copy(r).invert(),zu.copy(e.ray).applyMatrix4(Am),!(this.boundingBox!==null&&zu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,zu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new It,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===tp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zE?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;Em.fromBufferAttribute(r.attributes.skinIndex,e),bm.fromBufferAttribute(r.attributes.skinWeight,e),Mm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){const c=bm.getComponent(o);if(c!==0){const l=Em.getComponent(o);Tm.multiplyMatrices(n.bones[l].matrixWorld,n.boneInverses[l]),t.addScaledVector(U1.copy(Mm).applyMatrix4(Tm),c)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Hg extends Mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Gg extends Qt{constructor(e=null,t=1,n=1,r,o,c,l,h,f=Ln,d=Ln,p,m){super(null,c,l,h,f,d,r,o,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const wm=new tt,O1=new tt;class bh{constructor(e=[],t=[]){this.uuid=gi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new tt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new tt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let o=0,c=e.length;o<c;o++){const l=e[o]?e[o].matrixWorld:O1;wm.multiplyMatrices(l,t[o]),wm.toArray(n,o*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new bh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Gg(t,e,e,mi,Ai);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const o=e.bones[n];let c=t[o];c===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),c=new Hg),this.bones.push(c),this.boneInverses.push(new tt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,o=t.length;r<o;r++){const c=t[r];e.bones.push(c.uuid);const l=n[r];e.boneInverses.push(l.toArray())}return e}}class rh extends en{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Gs=new tt,Rm=new tt,yc=[],Cm=new _i,F1=new tt,ko=new pn,zo=new Di;class B1 extends pn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,F1)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new _i),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Gs),Cm.copy(e.boundingBox).applyMatrix4(Gs),this.boundingBox.union(Cm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Di),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Gs),zo.copy(e.boundingSphere).applyMatrix4(Gs),this.boundingSphere.union(zo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,o=n.length+1,c=e*o+1;for(let l=0;l<n.length;l++)n[l]=r[c+l]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(ko.geometry=this.geometry,ko.material=this.material,ko.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zo.copy(this.boundingSphere),zo.applyMatrix4(n),e.ray.intersectsSphere(zo)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,Gs),Rm.multiplyMatrices(n,Gs),ko.matrixWorld=Rm,ko.raycast(e,yc);for(let c=0,l=yc.length;c<l;c++){const h=yc[c];h.instanceId=o,h.object=this,t.push(h)}yc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new rh(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gg(new Float32Array(r*this.count),r,this.count,fg,Ai));const o=this.morphTexture.source.data.data;let c=0;for(let f=0;f<n.length;f++)c+=n[f];const l=this.geometry.morphTargetsRelative?1:1-c,h=r*e;o[h]=l,o.set(n,h+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ra extends ii{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Lm=new F,Pm=new F,Im=new tt,Hu=new so,Sc=new Di;class Xc extends Mt{constructor(e=new un,t=new ra){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,o=t.count;r<o;r++)Lm.fromBufferAttribute(t,r-1),Pm.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Lm.distanceTo(Pm);e.setAttribute("lineDistance",new tn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sc.copy(n.boundingSphere),Sc.applyMatrix4(r),Sc.radius+=o,e.ray.intersectsSphere(Sc)===!1)return;Im.copy(r).invert(),Hu.copy(e.ray).applyMatrix4(Im);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,f=new F,d=new F,p=new F,m=new F,v=this.isLineSegments?2:1,M=n.index,x=n.attributes.position;if(M!==null){const _=Math.max(0,c.start),P=Math.min(M.count,c.start+c.count);for(let b=_,I=P-1;b<I;b+=v){const z=M.getX(b),O=M.getX(b+1);if(f.fromBufferAttribute(x,z),d.fromBufferAttribute(x,O),Hu.distanceSqToSegment(f,d,m,p)>h)continue;m.applyMatrix4(this.matrixWorld);const V=e.ray.origin.distanceTo(m);V<e.near||V>e.far||t.push({distance:V,point:p.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}else{const _=Math.max(0,c.start),P=Math.min(x.count,c.start+c.count);for(let b=_,I=P-1;b<I;b+=v){if(f.fromBufferAttribute(x,b),d.fromBufferAttribute(x,b+1),Hu.distanceSqToSegment(f,d,m,p)>h)continue;m.applyMatrix4(this.matrixWorld);const O=e.ray.origin.distanceTo(m);O<e.near||O>e.far||t.push({distance:O,point:p.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}const Dm=new F,Um=new F;class Th extends Xc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,o=t.count;r<o;r+=2)Dm.fromBufferAttribute(t,r),Um.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Dm.distanceTo(Um);e.setAttribute("lineDistance",new tn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class k1 extends Xc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Vg extends ii{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Nm=new tt,sh=new so,Mc=new Di,Ec=new F;class z1 extends Mt{constructor(e=new un,t=new Vg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,o=e.params.Points.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mc.copy(n.boundingSphere),Mc.applyMatrix4(r),Mc.radius+=o,e.ray.intersectsSphere(Mc)===!1)return;Nm.copy(r).invert(),sh.copy(e.ray).applyMatrix4(Nm);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,f=n.index,p=n.attributes.position;if(f!==null){const m=Math.max(0,c.start),v=Math.min(f.count,c.start+c.count);for(let M=m,E=v;M<E;M++){const x=f.getX(M);Ec.fromBufferAttribute(p,x),Om(Ec,x,h,r,e,t,this)}}else{const m=Math.max(0,c.start),v=Math.min(p.count,c.start+c.count);for(let M=m,E=v;M<E;M++)Ec.fromBufferAttribute(p,M),Om(Ec,M,h,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}function Om(s,e,t,n,r,o,c){const l=sh.distanceSqToPoint(s);if(l<t){const h=new F;sh.closestPointToPoint(s,h),h.applyMatrix4(n);const f=r.ray.origin.distanceTo(h);if(f<r.near||f>r.far)return;o.push({distance:f,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,object:c})}}class qc extends un{constructor(e=1,t=1,n=1,r=32,o=1,c=!1,l=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:o,openEnded:c,thetaStart:l,thetaLength:h};const f=this;r=Math.floor(r),o=Math.floor(o);const d=[],p=[],m=[],v=[];let M=0;const E=[],x=n/2;let _=0;P(),c===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new tn(p,3)),this.setAttribute("normal",new tn(m,3)),this.setAttribute("uv",new tn(v,2));function P(){const I=new F,z=new F;let O=0;const D=(t-e)/n;for(let V=0;V<=o;V++){const C=[],w=V/o,X=w*(t-e)+e;for(let J=0;J<=r;J++){const k=J/r,te=k*h+l,ce=Math.sin(te),ue=Math.cos(te);z.x=X*ce,z.y=-w*n+x,z.z=X*ue,p.push(z.x,z.y,z.z),I.set(ce,D,ue).normalize(),m.push(I.x,I.y,I.z),v.push(k,1-w),C.push(M++)}E.push(C)}for(let V=0;V<r;V++)for(let C=0;C<o;C++){const w=E[C][V],X=E[C+1][V],J=E[C+1][V+1],k=E[C][V+1];d.push(w,X,k),d.push(X,J,k),O+=6}f.addGroup(_,O,0),_+=O}function b(I){const z=M,O=new Oe,D=new F;let V=0;const C=I===!0?e:t,w=I===!0?1:-1;for(let J=1;J<=r;J++)p.push(0,x*w,0),m.push(0,w,0),v.push(.5,.5),M++;const X=M;for(let J=0;J<=r;J++){const te=J/r*h+l,ce=Math.cos(te),ue=Math.sin(te);D.x=C*ue,D.y=x*w,D.z=C*ce,p.push(D.x,D.y,D.z),m.push(0,w,0),O.x=ce*.5+.5,O.y=ue*.5*w+.5,v.push(O.x,O.y),M++}for(let J=0;J<r;J++){const k=z+J,te=X+J;I===!0?d.push(te,te+1,k):d.push(te+1,te,k),V+=3}f.addGroup(_,V,I===!0?1:2),_+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ah extends qc{constructor(e=1,t=1,n=32,r=1,o=!1,c=0,l=Math.PI*2){super(0,e,t,n,r,o,c,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:c,thetaLength:l}}static fromJSON(e){return new Ah(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yc extends un{constructor(e=1,t=32,n=16,r=0,o=Math.PI*2,c=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:o,thetaStart:c,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(c+l,Math.PI);let f=0;const d=[],p=new F,m=new F,v=[],M=[],E=[],x=[];for(let _=0;_<=n;_++){const P=[],b=_/n;let I=0;_===0&&c===0?I=.5/t:_===n&&h===Math.PI&&(I=-.5/t);for(let z=0;z<=t;z++){const O=z/t;p.x=-e*Math.cos(r+O*o)*Math.sin(c+b*l),p.y=e*Math.cos(c+b*l),p.z=e*Math.sin(r+O*o)*Math.sin(c+b*l),M.push(p.x,p.y,p.z),m.copy(p).normalize(),E.push(m.x,m.y,m.z),x.push(O+I,1-b),P.push(f++)}d.push(P)}for(let _=0;_<n;_++)for(let P=0;P<t;P++){const b=d[_][P+1],I=d[_][P],z=d[_+1][P],O=d[_+1][P+1];(_!==0||c>0)&&v.push(b,I,O),(_!==n-1||h<Math.PI)&&v.push(I,z,O)}this.setIndex(v),this.setAttribute("position",new tn(M,3)),this.setAttribute("normal",new tn(E,3)),this.setAttribute("uv",new tn(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class H1 extends ii{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ue(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class co extends ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vg,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class nr extends co{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class G1 extends ra{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function bc(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function V1(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function W1(s){function e(r,o){return s[r]-s[o]}const t=s.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Fm(s,e,t){const n=s.length,r=new s.constructor(n);for(let o=0,c=0;c!==n;++o){const l=t[o]*e;for(let h=0;h!==e;++h)r[c++]=s[l+h]}return r}function Wg(s,e,t,n){let r=1,o=s[0];for(;o!==void 0&&o[n]===void 0;)o=s[r++];if(o===void 0)return;let c=o[n];if(c!==void 0)if(Array.isArray(c))do c=o[n],c!==void 0&&(e.push(o.time),t.push.apply(t,c)),o=s[r++];while(o!==void 0);else if(c.toArray!==void 0)do c=o[n],c!==void 0&&(e.push(o.time),c.toArray(t,t.length)),o=s[r++];while(o!==void 0);else do c=o[n],c!==void 0&&(e.push(o.time),t.push(c)),o=s[r++];while(o!==void 0)}class sa{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],o=t[n-1];e:{t:{let c;n:{i:if(!(e<r)){for(let l=n+2;;){if(r===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(o=r,r=t[++n],e<r)break t}c=t.length;break n}if(!(e>=o)){const l=t[1];e<l&&(n=2,o=l);for(let h=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(r=o,o=t[--n-1],e>=o)break t}c=n,n=0;break n}break e}for(;n<c;){const l=n+c>>>1;e<t[l]?c=l:n=l+1}if(r=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,r)}return this.interpolate_(n,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r;for(let c=0;c!==r;++c)t[c]=n[o+c];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class X1 extends sa{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wp,endingEnd:wp}}intervalChanged_(e,t,n){const r=this.parameterPositions;let o=e-2,c=e+1,l=r[o],h=r[c];if(l===void 0)switch(this.getSettings_().endingStart){case Rp:o=e,l=2*t-n;break;case Cp:o=r.length-2,l=t+r[o]-r[o+1];break;default:o=e,l=n}if(h===void 0)switch(this.getSettings_().endingEnd){case Rp:c=e,h=2*n-t;break;case Cp:c=1,h=n+r[1]-r[0];break;default:c=e-1,h=t}const f=(n-t)*.5,d=this.valueSize;this._weightPrev=f/(t-l),this._weightNext=f/(h-n),this._offsetPrev=o*d,this._offsetNext=c*d}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,f=h-l,d=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,v=this._weightNext,M=(n-t)/(r-t),E=M*M,x=E*M,_=-m*x+2*m*E-m*M,P=(1+m)*x+(-1.5-2*m)*E+(-.5+m)*M+1,b=(-1-v)*x+(1.5+v)*E+.5*M,I=v*x-v*E;for(let z=0;z!==l;++z)o[z]=_*c[d+z]+P*c[f+z]+b*c[h+z]+I*c[p+z];return o}}class q1 extends sa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,f=h-l,d=(n-t)/(r-t),p=1-d;for(let m=0;m!==l;++m)o[m]=c[f+m]*p+c[h+m]*d;return o}}class Y1 extends sa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ui{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=bc(t,this.TimeBufferType),this.values=bc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:bc(e.times,Array),values:bc(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Y1(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new q1(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new X1(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ea:t=this.InterpolantFactoryMethodDiscrete;break;case eo:t=this.InterpolantFactoryMethodLinear;break;case fu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ea;case this.InterpolantFactoryMethodLinear:return eo;case this.InterpolantFactoryMethodSmooth:return fu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let o=0,c=r-1;for(;o!==r&&n[o]<e;)++o;for(;c!==-1&&n[c]>t;)--c;if(++c,o!==0||c!==r){o>=c&&(c=Math.max(c,1),o=c-1);const l=this.getValueSize();this.times=n.slice(o,c),this.values=this.values.slice(o*l,c*l)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let c=null;for(let l=0;l!==o;l++){const h=n[l];if(typeof h=="number"&&isNaN(h)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,h),e=!1;break}if(c!==null&&c>h){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,h,c),e=!1;break}c=h}if(r!==void 0&&V1(r))for(let l=0,h=r.length;l!==h;++l){const f=r[l];if(isNaN(f)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,f),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===fu,o=e.length-1;let c=1;for(let l=1;l<o;++l){let h=!1;const f=e[l],d=e[l+1];if(f!==d&&(l!==1||f!==e[0]))if(r)h=!0;else{const p=l*n,m=p-n,v=p+n;for(let M=0;M!==n;++M){const E=t[p+M];if(E!==t[m+M]||E!==t[v+M]){h=!0;break}}}if(h){if(l!==c){e[c]=e[l];const p=l*n,m=c*n;for(let v=0;v!==n;++v)t[m+v]=t[p+v]}++c}}if(o>0){e[c]=e[o];for(let l=o*n,h=c*n,f=0;f!==n;++f)t[h+f]=t[l+f];++c}return c!==e.length?(this.times=e.slice(0,c),this.values=t.slice(0,c*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Ui.prototype.TimeBufferType=Float32Array;Ui.prototype.ValueBufferType=Float32Array;Ui.prototype.DefaultInterpolation=eo;class lo extends Ui{}lo.prototype.ValueTypeName="bool";lo.prototype.ValueBufferType=Array;lo.prototype.DefaultInterpolation=ea;lo.prototype.InterpolantFactoryMethodLinear=void 0;lo.prototype.InterpolantFactoryMethodSmooth=void 0;class Xg extends Ui{}Xg.prototype.ValueTypeName="color";class io extends Ui{}io.prototype.ValueTypeName="number";class j1 extends sa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=(n-t)/(r-t);let f=e*l;for(let d=f+l;f!==d;f+=4)Ci.slerpFlat(o,0,c,f-l,c,f,h);return o}}class ts extends Ui{InterpolantFactoryMethodLinear(e){return new j1(this.times,this.values,this.getValueSize(),e)}}ts.prototype.ValueTypeName="quaternion";ts.prototype.DefaultInterpolation=eo;ts.prototype.InterpolantFactoryMethodSmooth=void 0;class uo extends Ui{}uo.prototype.ValueTypeName="string";uo.prototype.ValueBufferType=Array;uo.prototype.DefaultInterpolation=ea;uo.prototype.InterpolantFactoryMethodLinear=void 0;uo.prototype.InterpolantFactoryMethodSmooth=void 0;class ro extends Ui{}ro.prototype.ValueTypeName="vector";class K1{constructor(e="",t=-1,n=[],r=ZE){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=gi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let c=0,l=n.length;c!==l;++c)t.push($1(n[c]).scale(r));const o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,c=n.length;o!==c;++o)t.push(Ui.toJSON(n[o]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const o=t.length,c=[];for(let l=0;l<o;l++){let h=[],f=[];h.push((l+o-1)%o,l,(l+1)%o),f.push(0,1,0);const d=W1(h);h=Fm(h,1,d),f=Fm(f,1,d),!r&&h[0]===0&&(h.push(o),f.push(f[0])),c.push(new io(".morphTargetInfluences["+t[l].name+"]",h,f).scale(1/n))}return new this(e,-1,c)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},o=/^([\w-]*?)([\d]+)$/;for(let l=0,h=e.length;l<h;l++){const f=e[l],d=f.name.match(o);if(d&&d.length>1){const p=d[1];let m=r[p];m||(r[p]=m=[]),m.push(f)}}const c=[];for(const l in r)c.push(this.CreateFromMorphTargetSequence(l,r[l],t,n));return c}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(p,m,v,M,E){if(v.length!==0){const x=[],_=[];Wg(v,x,_,M),x.length!==0&&E.push(new p(m,x,_))}},r=[],o=e.name||"default",c=e.fps||30,l=e.blendMode;let h=e.length||-1;const f=e.hierarchy||[];for(let p=0;p<f.length;p++){const m=f[p].keys;if(!(!m||m.length===0))if(m[0].morphTargets){const v={};let M;for(M=0;M<m.length;M++)if(m[M].morphTargets)for(let E=0;E<m[M].morphTargets.length;E++)v[m[M].morphTargets[E]]=-1;for(const E in v){const x=[],_=[];for(let P=0;P!==m[M].morphTargets.length;++P){const b=m[M];x.push(b.time),_.push(b.morphTarget===E?1:0)}r.push(new io(".morphTargetInfluence["+E+"]",x,_))}h=v.length*c}else{const v=".bones["+t[p].name+"]";n(ro,v+".position",m,"pos",r),n(ts,v+".quaternion",m,"rot",r),n(ro,v+".scale",m,"scl",r)}}return r.length===0?null:new this(o,h,r,l)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Z1(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return io;case"vector":case"vector2":case"vector3":case"vector4":return ro;case"color":return Xg;case"quaternion":return ts;case"bool":case"boolean":return lo;case"string":return uo}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function $1(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Z1(s.type);if(s.times===void 0){const t=[],n=[];Wg(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const wr={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class J1{constructor(e,t,n){const r=this;let o=!1,c=0,l=0,h;const f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){l++,o===!1&&r.onStart!==void 0&&r.onStart(d,c,l),o=!0},this.itemEnd=function(d){c++,r.onProgress!==void 0&&r.onProgress(d,c,l),c===l&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return h?h(d):d},this.setURLModifier=function(d){return h=d,this},this.addHandler=function(d,p){return f.push(d,p),this},this.removeHandler=function(d){const p=f.indexOf(d);return p!==-1&&f.splice(p,2),this},this.getHandler=function(d){for(let p=0,m=f.length;p<m;p+=2){const v=f[p],M=f[p+1];if(v.global&&(v.lastIndex=0),v.test(d))return M}return null}}}const Q1=new J1;class is{constructor(e){this.manager=e!==void 0?e:Q1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,o){n.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}is.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zi={};class eC extends Error{constructor(e,t){super(e),this.response=t}}class Bc extends is{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=wr.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(Zi[e]!==void 0){Zi[e].push({onLoad:t,onProgress:n,onError:r});return}Zi[e]=[],Zi[e].push({onLoad:t,onProgress:n,onError:r});const c=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,h=this.responseType;fetch(c).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||f.body===void 0||f.body.getReader===void 0)return f;const d=Zi[e],p=f.body.getReader(),m=f.headers.get("Content-Length")||f.headers.get("X-File-Size"),v=m?parseInt(m):0,M=v!==0;let E=0;const x=new ReadableStream({start(_){P();function P(){p.read().then(({done:b,value:I})=>{if(b)_.close();else{E+=I.byteLength;const z=new ProgressEvent("progress",{lengthComputable:M,loaded:E,total:v});for(let O=0,D=d.length;O<D;O++){const V=d[O];V.onProgress&&V.onProgress(z)}_.enqueue(I),P()}})}}});return new Response(x)}else throw new eC(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(h){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(d=>new DOMParser().parseFromString(d,l));case"json":return f.json();default:if(l===void 0)return f.text();{const p=/charset="?([^;"\s]*)"?/i.exec(l),m=p&&p[1]?p[1].toLowerCase():void 0,v=new TextDecoder(m);return f.arrayBuffer().then(M=>v.decode(M))}}}).then(f=>{wr.add(e,f);const d=Zi[e];delete Zi[e];for(let p=0,m=d.length;p<m;p++){const v=d[p];v.onLoad&&v.onLoad(f)}}).catch(f=>{const d=Zi[e];if(d===void 0)throw this.manager.itemError(e),f;delete Zi[e];for(let p=0,m=d.length;p<m;p++){const v=d[p];v.onError&&v.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class tC extends is{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,c=wr.get(e);if(c!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(c),o.manager.itemEnd(e)},0),c;const l=ta("img");function h(){d(),wr.add(e,this),t&&t(this),o.manager.itemEnd(e)}function f(p){d(),r&&r(p),o.manager.itemError(e),o.manager.itemEnd(e)}function d(){l.removeEventListener("load",h,!1),l.removeEventListener("error",f,!1)}return l.addEventListener("load",h,!1),l.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),o.manager.itemStart(e),l.src=e,l}}class nC extends is{constructor(e){super(e)}load(e,t,n,r){const o=new Qt,c=new tC(this.manager);return c.setCrossOrigin(this.crossOrigin),c.setPath(this.path),c.load(e,function(l){o.image=l,o.needsUpdate=!0,t!==void 0&&t(o)},n,r),o}}class ho extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class iC extends ho{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Gu=new tt,Bm=new F,km=new F;class wh{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mh,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Bm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bm),km.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(km),t.updateMatrixWorld(),Gu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Gu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class rC extends wh{constructor(){super(new Cn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=to*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,o=e.distance||t.far;(n!==t.fov||r!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=r,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class sC extends ho{constructor(e,t,n=0,r=Math.PI/3,o=0,c=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=n,this.angle=r,this.penumbra=o,this.decay=c,this.map=null,this.shadow=new rC}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const zm=new tt,Ho=new F,Vu=new F;class oC extends wh{constructor(){super(new Cn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Oe(4,2),this._viewportCount=6,this._viewports=[new It(2,1,1,1),new It(0,1,1,1),new It(3,1,1,1),new It(1,1,1,1),new It(3,0,1,1),new It(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),Ho.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ho),Vu.copy(n.position),Vu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Vu),n.updateMatrixWorld(),r.makeTranslation(-Ho.x,-Ho.y,-Ho.z),zm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zm)}}class qg extends ho{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new oC}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class aC extends wh{constructor(){super(new Vc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rh extends ho{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new aC}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class cC extends ho{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class lC{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new F)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,r=e.y,o=e.z,c=this.coefficients;return t.copy(c[0]).multiplyScalar(.282095),t.addScaledVector(c[1],.488603*r),t.addScaledVector(c[2],.488603*o),t.addScaledVector(c[3],.488603*n),t.addScaledVector(c[4],1.092548*(n*r)),t.addScaledVector(c[5],1.092548*(r*o)),t.addScaledVector(c[6],.315392*(3*o*o-1)),t.addScaledVector(c[7],1.092548*(n*o)),t.addScaledVector(c[8],.546274*(n*n-r*r)),t}getIrradianceAt(e,t){const n=e.x,r=e.y,o=e.z,c=this.coefficients;return t.copy(c[0]).multiplyScalar(.886227),t.addScaledVector(c[1],2*.511664*r),t.addScaledVector(c[2],2*.511664*o),t.addScaledVector(c[3],2*.511664*n),t.addScaledVector(c[4],2*.429043*n*r),t.addScaledVector(c[5],2*.429043*r*o),t.addScaledVector(c[6],.743125*o*o-.247708),t.addScaledVector(c[7],2*.429043*n*o),t.addScaledVector(c[8],.429043*(n*n-r*r)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let r=0;r<9;r++)n[r].fromArray(e,t+r*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let r=0;r<9;r++)n[r].toArray(e,t+r*3);return e}static getBasisAt(e,t){const n=e.x,r=e.y,o=e.z;t[0]=.282095,t[1]=.488603*r,t[2]=.488603*o,t[3]=.488603*n,t[4]=1.092548*n*r,t[5]=1.092548*r*o,t[6]=.315392*(3*o*o-1),t[7]=1.092548*n*o,t[8]=.546274*(n*n-r*r)}}class uC extends ho{constructor(e=new lC,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class $o{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class hC extends is{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,c=wr.get(e);if(c!==void 0){if(o.manager.itemStart(e),c.then){c.then(f=>{t&&t(f),o.manager.itemEnd(e)}).catch(f=>{r&&r(f)});return}return setTimeout(function(){t&&t(c),o.manager.itemEnd(e)},0),c}const l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader;const h=fetch(e,l).then(function(f){return f.blob()}).then(function(f){return createImageBitmap(f,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(f){return wr.add(e,f),t&&t(f),o.manager.itemEnd(e),f}).catch(function(f){r&&r(f),wr.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});wr.add(e,h),o.manager.itemStart(e)}}const Ch="\\[\\]\\.:\\/",fC=new RegExp("["+Ch+"]","g"),Lh="[^"+Ch+"]",dC="[^"+Ch.replace("\\.","")+"]",pC=/((?:WC+[\/:])*)/.source.replace("WC",Lh),mC=/(WCOD+)?/.source.replace("WCOD",dC),gC=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lh),_C=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lh),vC=new RegExp("^"+pC+mC+gC+_C+"$"),xC=["material","materials","bones","map"];class yC{constructor(e,t,n){const r=n||Pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=n.length;r!==o;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Pt{constructor(e,t,n){this.path=t,this.parsedPath=n||Pt.parseTrackName(t),this.node=Pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Pt.Composite(e,t,n):new Pt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fC,"")}static parseTrackName(e){const t=vC.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const o=n.nodeName.substring(r+1);xC.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(o){for(let c=0;c<o.length;c++){const l=o[c];if(l.name===t||l.uuid===t)return l;const h=n(l.children);if(h)return h}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let o=t.propertyIndex;if(e||(e=Pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let f=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===f){f=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(f!==void 0){if(e[f]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[f]}}const c=e[r];if(c===void 0){const f=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+f+"."+r+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}h=this.BindingType.ArrayElement,this.resolvedProperty=c,this.propertyIndex=o}else c.fromArray!==void 0&&c.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=c):Array.isArray(c)?(h=this.BindingType.EntireArray,this.resolvedProperty=c):this.propertyName=r;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Pt.Composite=yC;Pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pt.prototype.GetterByBindingType=[Pt.prototype._getValue_direct,Pt.prototype._getValue_array,Pt.prototype._getValue_arrayElement,Pt.prototype._getValue_toArray];Pt.prototype.SetterByBindingTypeAndVersioning=[[Pt.prototype._setValue_direct,Pt.prototype._setValue_direct_setNeedsUpdate,Pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_array,Pt.prototype._setValue_array_setNeedsUpdate,Pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_arrayElement,Pt.prototype._setValue_arrayElement_setNeedsUpdate,Pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_fromArray,Pt.prototype._setValue_fromArray_setNeedsUpdate,Pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Hm=new tt;class Yg{constructor(e,t,n=0,r=1/0){this.ray=new so(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Sh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hm),this}intersectObject(e,t=!0,n=[]){return oh(e,this,n,t),n.sort(Gm),n}intersectObjects(e,t=!0,n=[]){for(let r=0,o=e.length;r<o;r++)oh(e[r],this,n,t);return n.sort(Gm),n}}function Gm(s,e){return s.distance-e.distance}function oh(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const r=s.children;for(let o=0,c=r.length;o<c;o++)oh(r[o],e,t,!0)}}class Vm{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(dn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class SC extends Th{constructor(e=10,t=10,n=4473924,r=8947848){n=new Ue(n),r=new Ue(r);const o=t/2,c=e/t,l=e/2,h=[],f=[];for(let m=0,v=0,M=-l;m<=t;m++,M+=c){h.push(-l,0,M,l,0,M),h.push(M,0,-l,M,0,l);const E=m===o?n:r;E.toArray(f,v),v+=3,E.toArray(f,v),v+=3,E.toArray(f,v),v+=3,E.toArray(f,v),v+=3}const d=new un;d.setAttribute("position",new tn(h,3)),d.setAttribute("color",new tn(f,3));const p=new ra({vertexColors:!0,toneMapped:!1});super(d,p),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class MC extends Th{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new un;r.setAttribute("position",new tn(t,3)),r.setAttribute("color",new tn(n,3));const o=new ra({vertexColors:!0,toneMapped:!1});super(r,o),this.type="AxesHelper"}setColors(e,t,n){const r=new Ue,o=this.geometry.attributes.color.array;return r.set(e),r.toArray(o,0),r.toArray(o,3),r.set(t),r.toArray(o,6),r.toArray(o,9),r.set(n),r.toArray(o,12),r.toArray(o,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vh);const Zr={antialias:!0,alpha:!0,stencil:!1,shadowMapEnabled:!0,shadowMapType:rg,toneMapping:tr,canvas:void 0};class Wm extends P1{constructor(e=Zr){super({antialias:e.antialias||Zr.antialias,alpha:e.alpha||Zr.alpha,preserveDrawingBuffer:!0,canvas:e.canvas}),this.paused=!1,this.running=!1,this.force=!1,this.preRenderCallbacks=new Map,this.postRenderCallbacks=new Map,this.setPixelRatio(window.devicePixelRatio),this.shadowMap.enabled=e.shadowMapEnabled||Zr.shadowMapEnabled,this.shadowMap.type=e.shadowMapType||Zr.shadowMapType,this.toneMapping=e.toneMapping||Zr.toneMapping,this.debug.checkShaderErrors=!1}Dispose(){this.StopRenderer(),this.dispose()}StartRenderer(e,t){this.setAnimationLoop((n,r)=>{this.internal_render(e,t,n,r)}),this.running=!0}PauseRenderer(){this.paused=!0}ResumeRenderer(){this.paused=!1}StopRenderer(){this.setAnimationLoop(null),this.running=!1}OnResize(e,t){this.setSize(e,t)}AddPreRenderCallback(e){const t=Ri.generateUUID();return this.preRenderCallbacks.set(t,e),t}RemovePreRenderCallback(e){return this.preRenderCallbacks.has(e)?(this.preRenderCallbacks.delete(e),!0):!1}AddPostRenderCallback(e){const t=Ri.generateUUID();return this.postRenderCallbacks.set(t,e),t}RemovePostRenderCallback(e){return this.postRenderCallbacks.has(e)?(this.postRenderCallbacks.delete(e),!0):!1}ForceRendering(){this.force=!0}internal_render(e,t,n,r){(this.paused||!this.running)&&!this.force||(this.preRenderCallbacks.forEach(o=>{o(n,r)}),this.render(e,t),this.postRenderCallbacks.forEach(o=>{o(n,r)}),this.force=!1)}}const EC=1,Go=2,jg=4,Kg=8,ri=16;class bC extends Mt{constructor(){super(),this.isDIVELight=!0,this.isDIVEAmbientLight=!0,this.name="DIVEAmbientLight",this._light=new cC(16777215,1),this._light.layers.mask=ri,this.add(this._light)}SetColor(e){this._light.color=e}SetIntensity(e){this._light.intensity=e}SetEnabled(e){this._light.visible=e}}const Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];function TC(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Sn[s&255]+Sn[s>>8&255]+Sn[s>>16&255]+Sn[s>>24&255]+"-"+Sn[e&255]+Sn[e>>8&255]+"-"+Sn[e>>16&15|64]+Sn[e>>24&255]+"-"+Sn[t&63|128]+Sn[t>>8&255]+"-"+Sn[t>>16&255]+Sn[t>>24&255]+Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]).toLowerCase()}const Zg="#c20017",$g="#00ab26",Jg="#0081d4",AC=Zg,wC=$g,RC=Jg,Xm=s=>s.isSelectTool!==void 0;var Tc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},qo={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */var CC=qo.exports,qm;function LC(){return qm||(qm=1,function(s,e){(function(){var t,n="4.17.21",r=200,o="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",c="Expected a function",l="Invalid `variable` option passed into `_.template`",h="__lodash_hash_undefined__",f=500,d="__lodash_placeholder__",p=1,m=2,v=4,M=1,E=2,x=1,_=2,P=4,b=8,I=16,z=32,O=64,D=128,V=256,C=512,w=30,X="...",J=800,k=16,te=1,ce=2,ue=3,xe=1/0,Q=9007199254740991,ge=17976931348623157e292,de=NaN,Ae=4294967295,ct=Ae-1,bt=Ae>>>1,ie=[["ary",D],["bind",x],["bindKey",_],["curry",b],["curryRight",I],["flip",C],["partial",z],["partialRight",O],["rearg",V]],me="[object Arguments]",Re="[object Array]",be="[object AsyncFunction]",qe="[object Boolean]",Ye="[object Date]",ft="[object DOMException]",q="[object Error]",Je="[object Function]",Ge="[object GeneratorFunction]",St="[object Map]",ke="[object Number]",Et="[object Null]",U="[object Object]",T="[object Promise]",ee="[object Proxy]",se="[object RegExp]",le="[object Set]",fe="[object String]",Fe="[object Symbol]",pe="[object Undefined]",Pe="[object WeakMap]",ze="[object WeakSet]",_e="[object ArrayBuffer]",Me="[object DataView]",Xe="[object Float32Array]",Ce="[object Float64Array]",Le="[object Int8Array]",rt="[object Int16Array]",lt="[object Int32Array]",vt="[object Uint8Array]",dt="[object Uint8ClampedArray]",xt="[object Uint16Array]",De="[object Uint32Array]",y=/\b__p \+= '';/g,Y=/\b(__p \+=) '' \+/g,re=/(__e\(.*?\)|\b__t\)) \+\n'';/g,ve=/&(?:amp|lt|gt|quot|#39);/g,Te=/[&<>"']/g,pt=RegExp(ve.source),ut=RegExp(Te.source),Ut=/<%-([\s\S]+?)%>/g,Kt=/<%([\s\S]+?)%>/g,Tt=/<%=([\s\S]+?)%>/g,Vt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Wt=/^\w*$/,Mn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,mn=/[\\^$.*+?()[\]{}|]/g,vi=RegExp(mn.source),xi=/^\s+/,Ni=/\s/,oa=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,rs=/\{\n\/\* \[wrapped with (.+)\] \*/,aa=/,? & /,ca=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,Kc=/[()=,{}\[\]\/\s]/,Zc=/\\(\\)?/g,$c=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,L=/\w*$/,W=/^[-+]0x[0-9a-f]+$/i,Z=/^0b[01]+$/i,$=/^\[object .+?Constructor\]$/,j=/^0o[0-7]+$/i,Ee=/^(?:0|[1-9]\d*)$/,Ne=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Be=/($^)/,je=/['\n\r\u2028\u2029\\]/g,Ke="\\ud800-\\udfff",Ze="\\u0300-\\u036f",Qe="\\ufe20-\\ufe2f",Ht="\\u20d0-\\u20ff",gn=Ze+Qe+Ht,qt="\\u2700-\\u27bf",qn="a-z\\xdf-\\xf6\\xf8-\\xff",Ft="\\xac\\xb1\\xd7\\xf7",nt="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",fo="\\u2000-\\u206f",Nt=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",yi="A-Z\\xc0-\\xd6\\xd8-\\xde",po="\\ufe0e\\ufe0f",ir=Ft+nt+fo+Nt,Ir="['’]",sn="["+Ke+"]",si="["+ir+"]",rr="["+gn+"]",En="\\d+",mo="["+qt+"]",la="["+qn+"]",go="[^"+Ke+ir+En+qt+qn+yi+"]",Jc="\\ud83c[\\udffb-\\udfff]",o_="(?:"+rr+"|"+Jc+")",Nh="[^"+Ke+"]",Qc="(?:\\ud83c[\\udde6-\\uddff]){2}",el="[\\ud800-\\udbff][\\udc00-\\udfff]",ss="["+yi+"]",Oh="\\u200d",Fh="(?:"+la+"|"+go+")",a_="(?:"+ss+"|"+go+")",Bh="(?:"+Ir+"(?:d|ll|m|re|s|t|ve))?",kh="(?:"+Ir+"(?:D|LL|M|RE|S|T|VE))?",zh=o_+"?",Hh="["+po+"]?",c_="(?:"+Oh+"(?:"+[Nh,Qc,el].join("|")+")"+Hh+zh+")*",l_="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",u_="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Gh=Hh+zh+c_,h_="(?:"+[mo,Qc,el].join("|")+")"+Gh,f_="(?:"+[Nh+rr+"?",rr,Qc,el,sn].join("|")+")",d_=RegExp(Ir,"g"),p_=RegExp(rr,"g"),tl=RegExp(Jc+"(?="+Jc+")|"+f_+Gh,"g"),m_=RegExp([ss+"?"+la+"+"+Bh+"(?="+[si,ss,"$"].join("|")+")",a_+"+"+kh+"(?="+[si,ss+Fh,"$"].join("|")+")",ss+"?"+Fh+"+"+Bh,ss+"+"+kh,u_,l_,En,h_].join("|"),"g"),g_=RegExp("["+Oh+Ke+gn+po+"]"),__=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,v_=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],x_=-1,Bt={};Bt[Xe]=Bt[Ce]=Bt[Le]=Bt[rt]=Bt[lt]=Bt[vt]=Bt[dt]=Bt[xt]=Bt[De]=!0,Bt[me]=Bt[Re]=Bt[_e]=Bt[qe]=Bt[Me]=Bt[Ye]=Bt[q]=Bt[Je]=Bt[St]=Bt[ke]=Bt[U]=Bt[se]=Bt[le]=Bt[fe]=Bt[Pe]=!1;var Ot={};Ot[me]=Ot[Re]=Ot[_e]=Ot[Me]=Ot[qe]=Ot[Ye]=Ot[Xe]=Ot[Ce]=Ot[Le]=Ot[rt]=Ot[lt]=Ot[St]=Ot[ke]=Ot[U]=Ot[se]=Ot[le]=Ot[fe]=Ot[Fe]=Ot[vt]=Ot[dt]=Ot[xt]=Ot[De]=!0,Ot[q]=Ot[Je]=Ot[Pe]=!1;var y_={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},S_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},M_={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},E_={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},b_=parseFloat,T_=parseInt,Vh=typeof Tc=="object"&&Tc&&Tc.Object===Object&&Tc,A_=typeof self=="object"&&self&&self.Object===Object&&self,hn=Vh||A_||Function("return this")(),nl=e&&!e.nodeType&&e,Dr=nl&&!0&&s&&!s.nodeType&&s,Wh=Dr&&Dr.exports===nl,il=Wh&&Vh.process,Yn=function(){try{var H=Dr&&Dr.require&&Dr.require("util").types;return H||il&&il.binding&&il.binding("util")}catch{}}(),Xh=Yn&&Yn.isArrayBuffer,qh=Yn&&Yn.isDate,Yh=Yn&&Yn.isMap,jh=Yn&&Yn.isRegExp,Kh=Yn&&Yn.isSet,Zh=Yn&&Yn.isTypedArray;function Bn(H,ne,K){switch(K.length){case 0:return H.call(ne);case 1:return H.call(ne,K[0]);case 2:return H.call(ne,K[0],K[1]);case 3:return H.call(ne,K[0],K[1],K[2])}return H.apply(ne,K)}function w_(H,ne,K,we){for(var $e=-1,At=H==null?0:H.length;++$e<At;){var $t=H[$e];ne(we,$t,K($t),H)}return we}function jn(H,ne){for(var K=-1,we=H==null?0:H.length;++K<we&&ne(H[K],K,H)!==!1;);return H}function R_(H,ne){for(var K=H==null?0:H.length;K--&&ne(H[K],K,H)!==!1;);return H}function $h(H,ne){for(var K=-1,we=H==null?0:H.length;++K<we;)if(!ne(H[K],K,H))return!1;return!0}function sr(H,ne){for(var K=-1,we=H==null?0:H.length,$e=0,At=[];++K<we;){var $t=H[K];ne($t,K,H)&&(At[$e++]=$t)}return At}function ua(H,ne){var K=H==null?0:H.length;return!!K&&os(H,ne,0)>-1}function rl(H,ne,K){for(var we=-1,$e=H==null?0:H.length;++we<$e;)if(K(ne,H[we]))return!0;return!1}function zt(H,ne){for(var K=-1,we=H==null?0:H.length,$e=Array(we);++K<we;)$e[K]=ne(H[K],K,H);return $e}function or(H,ne){for(var K=-1,we=ne.length,$e=H.length;++K<we;)H[$e+K]=ne[K];return H}function sl(H,ne,K,we){var $e=-1,At=H==null?0:H.length;for(we&&At&&(K=H[++$e]);++$e<At;)K=ne(K,H[$e],$e,H);return K}function C_(H,ne,K,we){var $e=H==null?0:H.length;for(we&&$e&&(K=H[--$e]);$e--;)K=ne(K,H[$e],$e,H);return K}function ol(H,ne){for(var K=-1,we=H==null?0:H.length;++K<we;)if(ne(H[K],K,H))return!0;return!1}var L_=al("length");function P_(H){return H.split("")}function I_(H){return H.match(ca)||[]}function Jh(H,ne,K){var we;return K(H,function($e,At,$t){if(ne($e,At,$t))return we=At,!1}),we}function ha(H,ne,K,we){for(var $e=H.length,At=K+(we?1:-1);we?At--:++At<$e;)if(ne(H[At],At,H))return At;return-1}function os(H,ne,K){return ne===ne?W_(H,ne,K):ha(H,Qh,K)}function D_(H,ne,K,we){for(var $e=K-1,At=H.length;++$e<At;)if(we(H[$e],ne))return $e;return-1}function Qh(H){return H!==H}function ef(H,ne){var K=H==null?0:H.length;return K?ll(H,ne)/K:de}function al(H){return function(ne){return ne==null?t:ne[H]}}function cl(H){return function(ne){return H==null?t:H[ne]}}function tf(H,ne,K,we,$e){return $e(H,function(At,$t,Dt){K=we?(we=!1,At):ne(K,At,$t,Dt)}),K}function U_(H,ne){var K=H.length;for(H.sort(ne);K--;)H[K]=H[K].value;return H}function ll(H,ne){for(var K,we=-1,$e=H.length;++we<$e;){var At=ne(H[we]);At!==t&&(K=K===t?At:K+At)}return K}function ul(H,ne){for(var K=-1,we=Array(H);++K<H;)we[K]=ne(K);return we}function N_(H,ne){return zt(ne,function(K){return[K,H[K]]})}function nf(H){return H&&H.slice(0,af(H)+1).replace(xi,"")}function kn(H){return function(ne){return H(ne)}}function hl(H,ne){return zt(ne,function(K){return H[K]})}function _o(H,ne){return H.has(ne)}function rf(H,ne){for(var K=-1,we=H.length;++K<we&&os(ne,H[K],0)>-1;);return K}function sf(H,ne){for(var K=H.length;K--&&os(ne,H[K],0)>-1;);return K}function O_(H,ne){for(var K=H.length,we=0;K--;)H[K]===ne&&++we;return we}var F_=cl(y_),B_=cl(S_);function k_(H){return"\\"+E_[H]}function z_(H,ne){return H==null?t:H[ne]}function as(H){return g_.test(H)}function H_(H){return __.test(H)}function G_(H){for(var ne,K=[];!(ne=H.next()).done;)K.push(ne.value);return K}function fl(H){var ne=-1,K=Array(H.size);return H.forEach(function(we,$e){K[++ne]=[$e,we]}),K}function of(H,ne){return function(K){return H(ne(K))}}function ar(H,ne){for(var K=-1,we=H.length,$e=0,At=[];++K<we;){var $t=H[K];($t===ne||$t===d)&&(H[K]=d,At[$e++]=K)}return At}function fa(H){var ne=-1,K=Array(H.size);return H.forEach(function(we){K[++ne]=we}),K}function V_(H){var ne=-1,K=Array(H.size);return H.forEach(function(we){K[++ne]=[we,we]}),K}function W_(H,ne,K){for(var we=K-1,$e=H.length;++we<$e;)if(H[we]===ne)return we;return-1}function X_(H,ne,K){for(var we=K+1;we--;)if(H[we]===ne)return we;return we}function cs(H){return as(H)?Y_(H):L_(H)}function oi(H){return as(H)?j_(H):P_(H)}function af(H){for(var ne=H.length;ne--&&Ni.test(H.charAt(ne)););return ne}var q_=cl(M_);function Y_(H){for(var ne=tl.lastIndex=0;tl.test(H);)++ne;return ne}function j_(H){return H.match(tl)||[]}function K_(H){return H.match(m_)||[]}var Z_=function H(ne){ne=ne==null?hn:ls.defaults(hn.Object(),ne,ls.pick(hn,v_));var K=ne.Array,we=ne.Date,$e=ne.Error,At=ne.Function,$t=ne.Math,Dt=ne.Object,dl=ne.RegExp,$_=ne.String,Kn=ne.TypeError,da=K.prototype,J_=At.prototype,us=Dt.prototype,pa=ne["__core-js_shared__"],ma=J_.toString,Ct=us.hasOwnProperty,Q_=0,cf=function(){var i=/[^.]+$/.exec(pa&&pa.keys&&pa.keys.IE_PROTO||"");return i?"Symbol(src)_1."+i:""}(),ga=us.toString,e0=ma.call(Dt),t0=hn._,n0=dl("^"+ma.call(Ct).replace(mn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),_a=Wh?ne.Buffer:t,cr=ne.Symbol,va=ne.Uint8Array,lf=_a?_a.allocUnsafe:t,xa=of(Dt.getPrototypeOf,Dt),uf=Dt.create,hf=us.propertyIsEnumerable,ya=da.splice,ff=cr?cr.isConcatSpreadable:t,vo=cr?cr.iterator:t,Ur=cr?cr.toStringTag:t,Sa=function(){try{var i=kr(Dt,"defineProperty");return i({},"",{}),i}catch{}}(),i0=ne.clearTimeout!==hn.clearTimeout&&ne.clearTimeout,r0=we&&we.now!==hn.Date.now&&we.now,s0=ne.setTimeout!==hn.setTimeout&&ne.setTimeout,Ma=$t.ceil,Ea=$t.floor,pl=Dt.getOwnPropertySymbols,o0=_a?_a.isBuffer:t,df=ne.isFinite,a0=da.join,c0=of(Dt.keys,Dt),Jt=$t.max,_n=$t.min,l0=we.now,u0=ne.parseInt,pf=$t.random,h0=da.reverse,ml=kr(ne,"DataView"),xo=kr(ne,"Map"),gl=kr(ne,"Promise"),hs=kr(ne,"Set"),yo=kr(ne,"WeakMap"),So=kr(Dt,"create"),ba=yo&&new yo,fs={},f0=zr(ml),d0=zr(xo),p0=zr(gl),m0=zr(hs),g0=zr(yo),Ta=cr?cr.prototype:t,Mo=Ta?Ta.valueOf:t,mf=Ta?Ta.toString:t;function A(i){if(Xt(i)&&!et(i)&&!(i instanceof gt)){if(i instanceof Zn)return i;if(Ct.call(i,"__wrapped__"))return gd(i)}return new Zn(i)}var ds=function(){function i(){}return function(a){if(!Gt(a))return{};if(uf)return uf(a);i.prototype=a;var u=new i;return i.prototype=t,u}}();function Aa(){}function Zn(i,a){this.__wrapped__=i,this.__actions__=[],this.__chain__=!!a,this.__index__=0,this.__values__=t}A.templateSettings={escape:Ut,evaluate:Kt,interpolate:Tt,variable:"",imports:{_:A}},A.prototype=Aa.prototype,A.prototype.constructor=A,Zn.prototype=ds(Aa.prototype),Zn.prototype.constructor=Zn;function gt(i){this.__wrapped__=i,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Ae,this.__views__=[]}function _0(){var i=new gt(this.__wrapped__);return i.__actions__=Pn(this.__actions__),i.__dir__=this.__dir__,i.__filtered__=this.__filtered__,i.__iteratees__=Pn(this.__iteratees__),i.__takeCount__=this.__takeCount__,i.__views__=Pn(this.__views__),i}function v0(){if(this.__filtered__){var i=new gt(this);i.__dir__=-1,i.__filtered__=!0}else i=this.clone(),i.__dir__*=-1;return i}function x0(){var i=this.__wrapped__.value(),a=this.__dir__,u=et(i),g=a<0,S=u?i.length:0,R=Pv(0,S,this.__views__),N=R.start,B=R.end,G=B-N,oe=g?B:N-1,ae=this.__iteratees__,he=ae.length,ye=0,Ie=_n(G,this.__takeCount__);if(!u||!g&&S==G&&Ie==G)return kf(i,this.__actions__);var Ve=[];e:for(;G--&&ye<Ie;){oe+=a;for(var st=-1,We=i[oe];++st<he;){var mt=ae[st],yt=mt.iteratee,Gn=mt.type,An=yt(We);if(Gn==ce)We=An;else if(!An){if(Gn==te)continue e;break e}}Ve[ye++]=We}return Ve}gt.prototype=ds(Aa.prototype),gt.prototype.constructor=gt;function Nr(i){var a=-1,u=i==null?0:i.length;for(this.clear();++a<u;){var g=i[a];this.set(g[0],g[1])}}function y0(){this.__data__=So?So(null):{},this.size=0}function S0(i){var a=this.has(i)&&delete this.__data__[i];return this.size-=a?1:0,a}function M0(i){var a=this.__data__;if(So){var u=a[i];return u===h?t:u}return Ct.call(a,i)?a[i]:t}function E0(i){var a=this.__data__;return So?a[i]!==t:Ct.call(a,i)}function b0(i,a){var u=this.__data__;return this.size+=this.has(i)?0:1,u[i]=So&&a===t?h:a,this}Nr.prototype.clear=y0,Nr.prototype.delete=S0,Nr.prototype.get=M0,Nr.prototype.has=E0,Nr.prototype.set=b0;function Oi(i){var a=-1,u=i==null?0:i.length;for(this.clear();++a<u;){var g=i[a];this.set(g[0],g[1])}}function T0(){this.__data__=[],this.size=0}function A0(i){var a=this.__data__,u=wa(a,i);if(u<0)return!1;var g=a.length-1;return u==g?a.pop():ya.call(a,u,1),--this.size,!0}function w0(i){var a=this.__data__,u=wa(a,i);return u<0?t:a[u][1]}function R0(i){return wa(this.__data__,i)>-1}function C0(i,a){var u=this.__data__,g=wa(u,i);return g<0?(++this.size,u.push([i,a])):u[g][1]=a,this}Oi.prototype.clear=T0,Oi.prototype.delete=A0,Oi.prototype.get=w0,Oi.prototype.has=R0,Oi.prototype.set=C0;function Fi(i){var a=-1,u=i==null?0:i.length;for(this.clear();++a<u;){var g=i[a];this.set(g[0],g[1])}}function L0(){this.size=0,this.__data__={hash:new Nr,map:new(xo||Oi),string:new Nr}}function P0(i){var a=ka(this,i).delete(i);return this.size-=a?1:0,a}function I0(i){return ka(this,i).get(i)}function D0(i){return ka(this,i).has(i)}function U0(i,a){var u=ka(this,i),g=u.size;return u.set(i,a),this.size+=u.size==g?0:1,this}Fi.prototype.clear=L0,Fi.prototype.delete=P0,Fi.prototype.get=I0,Fi.prototype.has=D0,Fi.prototype.set=U0;function Or(i){var a=-1,u=i==null?0:i.length;for(this.__data__=new Fi;++a<u;)this.add(i[a])}function N0(i){return this.__data__.set(i,h),this}function O0(i){return this.__data__.has(i)}Or.prototype.add=Or.prototype.push=N0,Or.prototype.has=O0;function ai(i){var a=this.__data__=new Oi(i);this.size=a.size}function F0(){this.__data__=new Oi,this.size=0}function B0(i){var a=this.__data__,u=a.delete(i);return this.size=a.size,u}function k0(i){return this.__data__.get(i)}function z0(i){return this.__data__.has(i)}function H0(i,a){var u=this.__data__;if(u instanceof Oi){var g=u.__data__;if(!xo||g.length<r-1)return g.push([i,a]),this.size=++u.size,this;u=this.__data__=new Fi(g)}return u.set(i,a),this.size=u.size,this}ai.prototype.clear=F0,ai.prototype.delete=B0,ai.prototype.get=k0,ai.prototype.has=z0,ai.prototype.set=H0;function gf(i,a){var u=et(i),g=!u&&Hr(i),S=!u&&!g&&dr(i),R=!u&&!g&&!S&&_s(i),N=u||g||S||R,B=N?ul(i.length,$_):[],G=B.length;for(var oe in i)(a||Ct.call(i,oe))&&!(N&&(oe=="length"||S&&(oe=="offset"||oe=="parent")||R&&(oe=="buffer"||oe=="byteLength"||oe=="byteOffset")||Hi(oe,G)))&&B.push(oe);return B}function _f(i){var a=i.length;return a?i[wl(0,a-1)]:t}function G0(i,a){return za(Pn(i),Fr(a,0,i.length))}function V0(i){return za(Pn(i))}function _l(i,a,u){(u!==t&&!ci(i[a],u)||u===t&&!(a in i))&&Bi(i,a,u)}function Eo(i,a,u){var g=i[a];(!(Ct.call(i,a)&&ci(g,u))||u===t&&!(a in i))&&Bi(i,a,u)}function wa(i,a){for(var u=i.length;u--;)if(ci(i[u][0],a))return u;return-1}function W0(i,a,u,g){return lr(i,function(S,R,N){a(g,S,u(S),N)}),g}function vf(i,a){return i&&Mi(a,on(a),i)}function X0(i,a){return i&&Mi(a,Dn(a),i)}function Bi(i,a,u){a=="__proto__"&&Sa?Sa(i,a,{configurable:!0,enumerable:!0,value:u,writable:!0}):i[a]=u}function vl(i,a){for(var u=-1,g=a.length,S=K(g),R=i==null;++u<g;)S[u]=R?t:Jl(i,a[u]);return S}function Fr(i,a,u){return i===i&&(u!==t&&(i=i<=u?i:u),a!==t&&(i=i>=a?i:a)),i}function $n(i,a,u,g,S,R){var N,B=a&p,G=a&m,oe=a&v;if(u&&(N=S?u(i,g,S,R):u(i)),N!==t)return N;if(!Gt(i))return i;var ae=et(i);if(ae){if(N=Dv(i),!B)return Pn(i,N)}else{var he=vn(i),ye=he==Je||he==Ge;if(dr(i))return Gf(i,B);if(he==U||he==me||ye&&!S){if(N=G||ye?{}:ad(i),!B)return G?Mv(i,X0(N,i)):Sv(i,vf(N,i))}else{if(!Ot[he])return S?i:{};N=Uv(i,he,B)}}R||(R=new ai);var Ie=R.get(i);if(Ie)return Ie;R.set(i,N),Od(i)?i.forEach(function(We){N.add($n(We,a,u,We,i,R))}):Ud(i)&&i.forEach(function(We,mt){N.set(mt,$n(We,a,u,mt,i,R))});var Ve=oe?G?Bl:Fl:G?Dn:on,st=ae?t:Ve(i);return jn(st||i,function(We,mt){st&&(mt=We,We=i[mt]),Eo(N,mt,$n(We,a,u,mt,i,R))}),N}function q0(i){var a=on(i);return function(u){return xf(u,i,a)}}function xf(i,a,u){var g=u.length;if(i==null)return!g;for(i=Dt(i);g--;){var S=u[g],R=a[S],N=i[S];if(N===t&&!(S in i)||!R(N))return!1}return!0}function yf(i,a,u){if(typeof i!="function")throw new Kn(c);return Lo(function(){i.apply(t,u)},a)}function bo(i,a,u,g){var S=-1,R=ua,N=!0,B=i.length,G=[],oe=a.length;if(!B)return G;u&&(a=zt(a,kn(u))),g?(R=rl,N=!1):a.length>=r&&(R=_o,N=!1,a=new Or(a));e:for(;++S<B;){var ae=i[S],he=u==null?ae:u(ae);if(ae=g||ae!==0?ae:0,N&&he===he){for(var ye=oe;ye--;)if(a[ye]===he)continue e;G.push(ae)}else R(a,he,g)||G.push(ae)}return G}var lr=Yf(Si),Sf=Yf(yl,!0);function Y0(i,a){var u=!0;return lr(i,function(g,S,R){return u=!!a(g,S,R),u}),u}function Ra(i,a,u){for(var g=-1,S=i.length;++g<S;){var R=i[g],N=a(R);if(N!=null&&(B===t?N===N&&!Hn(N):u(N,B)))var B=N,G=R}return G}function j0(i,a,u,g){var S=i.length;for(u=it(u),u<0&&(u=-u>S?0:S+u),g=g===t||g>S?S:it(g),g<0&&(g+=S),g=u>g?0:Bd(g);u<g;)i[u++]=a;return i}function Mf(i,a){var u=[];return lr(i,function(g,S,R){a(g,S,R)&&u.push(g)}),u}function fn(i,a,u,g,S){var R=-1,N=i.length;for(u||(u=Ov),S||(S=[]);++R<N;){var B=i[R];a>0&&u(B)?a>1?fn(B,a-1,u,g,S):or(S,B):g||(S[S.length]=B)}return S}var xl=jf(),Ef=jf(!0);function Si(i,a){return i&&xl(i,a,on)}function yl(i,a){return i&&Ef(i,a,on)}function Ca(i,a){return sr(a,function(u){return Gi(i[u])})}function Br(i,a){a=hr(a,i);for(var u=0,g=a.length;i!=null&&u<g;)i=i[Ei(a[u++])];return u&&u==g?i:t}function bf(i,a,u){var g=a(i);return et(i)?g:or(g,u(i))}function bn(i){return i==null?i===t?pe:Et:Ur&&Ur in Dt(i)?Lv(i):Vv(i)}function Sl(i,a){return i>a}function K0(i,a){return i!=null&&Ct.call(i,a)}function Z0(i,a){return i!=null&&a in Dt(i)}function $0(i,a,u){return i>=_n(a,u)&&i<Jt(a,u)}function Ml(i,a,u){for(var g=u?rl:ua,S=i[0].length,R=i.length,N=R,B=K(R),G=1/0,oe=[];N--;){var ae=i[N];N&&a&&(ae=zt(ae,kn(a))),G=_n(ae.length,G),B[N]=!u&&(a||S>=120&&ae.length>=120)?new Or(N&&ae):t}ae=i[0];var he=-1,ye=B[0];e:for(;++he<S&&oe.length<G;){var Ie=ae[he],Ve=a?a(Ie):Ie;if(Ie=u||Ie!==0?Ie:0,!(ye?_o(ye,Ve):g(oe,Ve,u))){for(N=R;--N;){var st=B[N];if(!(st?_o(st,Ve):g(i[N],Ve,u)))continue e}ye&&ye.push(Ve),oe.push(Ie)}}return oe}function J0(i,a,u,g){return Si(i,function(S,R,N){a(g,u(S),R,N)}),g}function To(i,a,u){a=hr(a,i),i=hd(i,a);var g=i==null?i:i[Ei(Qn(a))];return g==null?t:Bn(g,i,u)}function Tf(i){return Xt(i)&&bn(i)==me}function Q0(i){return Xt(i)&&bn(i)==_e}function ev(i){return Xt(i)&&bn(i)==Ye}function Ao(i,a,u,g,S){return i===a?!0:i==null||a==null||!Xt(i)&&!Xt(a)?i!==i&&a!==a:tv(i,a,u,g,Ao,S)}function tv(i,a,u,g,S,R){var N=et(i),B=et(a),G=N?Re:vn(i),oe=B?Re:vn(a);G=G==me?U:G,oe=oe==me?U:oe;var ae=G==U,he=oe==U,ye=G==oe;if(ye&&dr(i)){if(!dr(a))return!1;N=!0,ae=!1}if(ye&&!ae)return R||(R=new ai),N||_s(i)?rd(i,a,u,g,S,R):Rv(i,a,G,u,g,S,R);if(!(u&M)){var Ie=ae&&Ct.call(i,"__wrapped__"),Ve=he&&Ct.call(a,"__wrapped__");if(Ie||Ve){var st=Ie?i.value():i,We=Ve?a.value():a;return R||(R=new ai),S(st,We,u,g,R)}}return ye?(R||(R=new ai),Cv(i,a,u,g,S,R)):!1}function nv(i){return Xt(i)&&vn(i)==St}function El(i,a,u,g){var S=u.length,R=S,N=!g;if(i==null)return!R;for(i=Dt(i);S--;){var B=u[S];if(N&&B[2]?B[1]!==i[B[0]]:!(B[0]in i))return!1}for(;++S<R;){B=u[S];var G=B[0],oe=i[G],ae=B[1];if(N&&B[2]){if(oe===t&&!(G in i))return!1}else{var he=new ai;if(g)var ye=g(oe,ae,G,i,a,he);if(!(ye===t?Ao(ae,oe,M|E,g,he):ye))return!1}}return!0}function Af(i){if(!Gt(i)||Bv(i))return!1;var a=Gi(i)?n0:$;return a.test(zr(i))}function iv(i){return Xt(i)&&bn(i)==se}function rv(i){return Xt(i)&&vn(i)==le}function sv(i){return Xt(i)&&qa(i.length)&&!!Bt[bn(i)]}function wf(i){return typeof i=="function"?i:i==null?Un:typeof i=="object"?et(i)?Lf(i[0],i[1]):Cf(i):Kd(i)}function bl(i){if(!Co(i))return c0(i);var a=[];for(var u in Dt(i))Ct.call(i,u)&&u!="constructor"&&a.push(u);return a}function ov(i){if(!Gt(i))return Gv(i);var a=Co(i),u=[];for(var g in i)g=="constructor"&&(a||!Ct.call(i,g))||u.push(g);return u}function Tl(i,a){return i<a}function Rf(i,a){var u=-1,g=In(i)?K(i.length):[];return lr(i,function(S,R,N){g[++u]=a(S,R,N)}),g}function Cf(i){var a=zl(i);return a.length==1&&a[0][2]?ld(a[0][0],a[0][1]):function(u){return u===i||El(u,i,a)}}function Lf(i,a){return Gl(i)&&cd(a)?ld(Ei(i),a):function(u){var g=Jl(u,i);return g===t&&g===a?Ql(u,i):Ao(a,g,M|E)}}function La(i,a,u,g,S){i!==a&&xl(a,function(R,N){if(S||(S=new ai),Gt(R))av(i,a,N,u,La,g,S);else{var B=g?g(Wl(i,N),R,N+"",i,a,S):t;B===t&&(B=R),_l(i,N,B)}},Dn)}function av(i,a,u,g,S,R,N){var B=Wl(i,u),G=Wl(a,u),oe=N.get(G);if(oe){_l(i,u,oe);return}var ae=R?R(B,G,u+"",i,a,N):t,he=ae===t;if(he){var ye=et(G),Ie=!ye&&dr(G),Ve=!ye&&!Ie&&_s(G);ae=G,ye||Ie||Ve?et(B)?ae=B:Yt(B)?ae=Pn(B):Ie?(he=!1,ae=Gf(G,!0)):Ve?(he=!1,ae=Vf(G,!0)):ae=[]:Po(G)||Hr(G)?(ae=B,Hr(B)?ae=kd(B):(!Gt(B)||Gi(B))&&(ae=ad(G))):he=!1}he&&(N.set(G,ae),S(ae,G,g,R,N),N.delete(G)),_l(i,u,ae)}function Pf(i,a){var u=i.length;if(u)return a+=a<0?u:0,Hi(a,u)?i[a]:t}function If(i,a,u){a.length?a=zt(a,function(R){return et(R)?function(N){return Br(N,R.length===1?R[0]:R)}:R}):a=[Un];var g=-1;a=zt(a,kn(He()));var S=Rf(i,function(R,N,B){var G=zt(a,function(oe){return oe(R)});return{criteria:G,index:++g,value:R}});return U_(S,function(R,N){return yv(R,N,u)})}function cv(i,a){return Df(i,a,function(u,g){return Ql(i,g)})}function Df(i,a,u){for(var g=-1,S=a.length,R={};++g<S;){var N=a[g],B=Br(i,N);u(B,N)&&wo(R,hr(N,i),B)}return R}function lv(i){return function(a){return Br(a,i)}}function Al(i,a,u,g){var S=g?D_:os,R=-1,N=a.length,B=i;for(i===a&&(a=Pn(a)),u&&(B=zt(i,kn(u)));++R<N;)for(var G=0,oe=a[R],ae=u?u(oe):oe;(G=S(B,ae,G,g))>-1;)B!==i&&ya.call(B,G,1),ya.call(i,G,1);return i}function Uf(i,a){for(var u=i?a.length:0,g=u-1;u--;){var S=a[u];if(u==g||S!==R){var R=S;Hi(S)?ya.call(i,S,1):Ll(i,S)}}return i}function wl(i,a){return i+Ea(pf()*(a-i+1))}function uv(i,a,u,g){for(var S=-1,R=Jt(Ma((a-i)/(u||1)),0),N=K(R);R--;)N[g?R:++S]=i,i+=u;return N}function Rl(i,a){var u="";if(!i||a<1||a>Q)return u;do a%2&&(u+=i),a=Ea(a/2),a&&(i+=i);while(a);return u}function ht(i,a){return Xl(ud(i,a,Un),i+"")}function hv(i){return _f(vs(i))}function fv(i,a){var u=vs(i);return za(u,Fr(a,0,u.length))}function wo(i,a,u,g){if(!Gt(i))return i;a=hr(a,i);for(var S=-1,R=a.length,N=R-1,B=i;B!=null&&++S<R;){var G=Ei(a[S]),oe=u;if(G==="__proto__"||G==="constructor"||G==="prototype")return i;if(S!=N){var ae=B[G];oe=g?g(ae,G,B):t,oe===t&&(oe=Gt(ae)?ae:Hi(a[S+1])?[]:{})}Eo(B,G,oe),B=B[G]}return i}var Nf=ba?function(i,a){return ba.set(i,a),i}:Un,dv=Sa?function(i,a){return Sa(i,"toString",{configurable:!0,enumerable:!1,value:tu(a),writable:!0})}:Un;function pv(i){return za(vs(i))}function Jn(i,a,u){var g=-1,S=i.length;a<0&&(a=-a>S?0:S+a),u=u>S?S:u,u<0&&(u+=S),S=a>u?0:u-a>>>0,a>>>=0;for(var R=K(S);++g<S;)R[g]=i[g+a];return R}function mv(i,a){var u;return lr(i,function(g,S,R){return u=a(g,S,R),!u}),!!u}function Pa(i,a,u){var g=0,S=i==null?g:i.length;if(typeof a=="number"&&a===a&&S<=bt){for(;g<S;){var R=g+S>>>1,N=i[R];N!==null&&!Hn(N)&&(u?N<=a:N<a)?g=R+1:S=R}return S}return Cl(i,a,Un,u)}function Cl(i,a,u,g){var S=0,R=i==null?0:i.length;if(R===0)return 0;a=u(a);for(var N=a!==a,B=a===null,G=Hn(a),oe=a===t;S<R;){var ae=Ea((S+R)/2),he=u(i[ae]),ye=he!==t,Ie=he===null,Ve=he===he,st=Hn(he);if(N)var We=g||Ve;else oe?We=Ve&&(g||ye):B?We=Ve&&ye&&(g||!Ie):G?We=Ve&&ye&&!Ie&&(g||!st):Ie||st?We=!1:We=g?he<=a:he<a;We?S=ae+1:R=ae}return _n(R,ct)}function Of(i,a){for(var u=-1,g=i.length,S=0,R=[];++u<g;){var N=i[u],B=a?a(N):N;if(!u||!ci(B,G)){var G=B;R[S++]=N===0?0:N}}return R}function Ff(i){return typeof i=="number"?i:Hn(i)?de:+i}function zn(i){if(typeof i=="string")return i;if(et(i))return zt(i,zn)+"";if(Hn(i))return mf?mf.call(i):"";var a=i+"";return a=="0"&&1/i==-1/0?"-0":a}function ur(i,a,u){var g=-1,S=ua,R=i.length,N=!0,B=[],G=B;if(u)N=!1,S=rl;else if(R>=r){var oe=a?null:Av(i);if(oe)return fa(oe);N=!1,S=_o,G=new Or}else G=a?[]:B;e:for(;++g<R;){var ae=i[g],he=a?a(ae):ae;if(ae=u||ae!==0?ae:0,N&&he===he){for(var ye=G.length;ye--;)if(G[ye]===he)continue e;a&&G.push(he),B.push(ae)}else S(G,he,u)||(G!==B&&G.push(he),B.push(ae))}return B}function Ll(i,a){return a=hr(a,i),i=hd(i,a),i==null||delete i[Ei(Qn(a))]}function Bf(i,a,u,g){return wo(i,a,u(Br(i,a)),g)}function Ia(i,a,u,g){for(var S=i.length,R=g?S:-1;(g?R--:++R<S)&&a(i[R],R,i););return u?Jn(i,g?0:R,g?R+1:S):Jn(i,g?R+1:0,g?S:R)}function kf(i,a){var u=i;return u instanceof gt&&(u=u.value()),sl(a,function(g,S){return S.func.apply(S.thisArg,or([g],S.args))},u)}function Pl(i,a,u){var g=i.length;if(g<2)return g?ur(i[0]):[];for(var S=-1,R=K(g);++S<g;)for(var N=i[S],B=-1;++B<g;)B!=S&&(R[S]=bo(R[S]||N,i[B],a,u));return ur(fn(R,1),a,u)}function zf(i,a,u){for(var g=-1,S=i.length,R=a.length,N={};++g<S;){var B=g<R?a[g]:t;u(N,i[g],B)}return N}function Il(i){return Yt(i)?i:[]}function Dl(i){return typeof i=="function"?i:Un}function hr(i,a){return et(i)?i:Gl(i,a)?[i]:md(wt(i))}var gv=ht;function fr(i,a,u){var g=i.length;return u=u===t?g:u,!a&&u>=g?i:Jn(i,a,u)}var Hf=i0||function(i){return hn.clearTimeout(i)};function Gf(i,a){if(a)return i.slice();var u=i.length,g=lf?lf(u):new i.constructor(u);return i.copy(g),g}function Ul(i){var a=new i.constructor(i.byteLength);return new va(a).set(new va(i)),a}function _v(i,a){var u=a?Ul(i.buffer):i.buffer;return new i.constructor(u,i.byteOffset,i.byteLength)}function vv(i){var a=new i.constructor(i.source,L.exec(i));return a.lastIndex=i.lastIndex,a}function xv(i){return Mo?Dt(Mo.call(i)):{}}function Vf(i,a){var u=a?Ul(i.buffer):i.buffer;return new i.constructor(u,i.byteOffset,i.length)}function Wf(i,a){if(i!==a){var u=i!==t,g=i===null,S=i===i,R=Hn(i),N=a!==t,B=a===null,G=a===a,oe=Hn(a);if(!B&&!oe&&!R&&i>a||R&&N&&G&&!B&&!oe||g&&N&&G||!u&&G||!S)return 1;if(!g&&!R&&!oe&&i<a||oe&&u&&S&&!g&&!R||B&&u&&S||!N&&S||!G)return-1}return 0}function yv(i,a,u){for(var g=-1,S=i.criteria,R=a.criteria,N=S.length,B=u.length;++g<N;){var G=Wf(S[g],R[g]);if(G){if(g>=B)return G;var oe=u[g];return G*(oe=="desc"?-1:1)}}return i.index-a.index}function Xf(i,a,u,g){for(var S=-1,R=i.length,N=u.length,B=-1,G=a.length,oe=Jt(R-N,0),ae=K(G+oe),he=!g;++B<G;)ae[B]=a[B];for(;++S<N;)(he||S<R)&&(ae[u[S]]=i[S]);for(;oe--;)ae[B++]=i[S++];return ae}function qf(i,a,u,g){for(var S=-1,R=i.length,N=-1,B=u.length,G=-1,oe=a.length,ae=Jt(R-B,0),he=K(ae+oe),ye=!g;++S<ae;)he[S]=i[S];for(var Ie=S;++G<oe;)he[Ie+G]=a[G];for(;++N<B;)(ye||S<R)&&(he[Ie+u[N]]=i[S++]);return he}function Pn(i,a){var u=-1,g=i.length;for(a||(a=K(g));++u<g;)a[u]=i[u];return a}function Mi(i,a,u,g){var S=!u;u||(u={});for(var R=-1,N=a.length;++R<N;){var B=a[R],G=g?g(u[B],i[B],B,u,i):t;G===t&&(G=i[B]),S?Bi(u,B,G):Eo(u,B,G)}return u}function Sv(i,a){return Mi(i,Hl(i),a)}function Mv(i,a){return Mi(i,sd(i),a)}function Da(i,a){return function(u,g){var S=et(u)?w_:W0,R=a?a():{};return S(u,i,He(g,2),R)}}function ps(i){return ht(function(a,u){var g=-1,S=u.length,R=S>1?u[S-1]:t,N=S>2?u[2]:t;for(R=i.length>3&&typeof R=="function"?(S--,R):t,N&&Tn(u[0],u[1],N)&&(R=S<3?t:R,S=1),a=Dt(a);++g<S;){var B=u[g];B&&i(a,B,g,R)}return a})}function Yf(i,a){return function(u,g){if(u==null)return u;if(!In(u))return i(u,g);for(var S=u.length,R=a?S:-1,N=Dt(u);(a?R--:++R<S)&&g(N[R],R,N)!==!1;);return u}}function jf(i){return function(a,u,g){for(var S=-1,R=Dt(a),N=g(a),B=N.length;B--;){var G=N[i?B:++S];if(u(R[G],G,R)===!1)break}return a}}function Ev(i,a,u){var g=a&x,S=Ro(i);function R(){var N=this&&this!==hn&&this instanceof R?S:i;return N.apply(g?u:this,arguments)}return R}function Kf(i){return function(a){a=wt(a);var u=as(a)?oi(a):t,g=u?u[0]:a.charAt(0),S=u?fr(u,1).join(""):a.slice(1);return g[i]()+S}}function ms(i){return function(a){return sl(Yd(qd(a).replace(d_,"")),i,"")}}function Ro(i){return function(){var a=arguments;switch(a.length){case 0:return new i;case 1:return new i(a[0]);case 2:return new i(a[0],a[1]);case 3:return new i(a[0],a[1],a[2]);case 4:return new i(a[0],a[1],a[2],a[3]);case 5:return new i(a[0],a[1],a[2],a[3],a[4]);case 6:return new i(a[0],a[1],a[2],a[3],a[4],a[5]);case 7:return new i(a[0],a[1],a[2],a[3],a[4],a[5],a[6])}var u=ds(i.prototype),g=i.apply(u,a);return Gt(g)?g:u}}function bv(i,a,u){var g=Ro(i);function S(){for(var R=arguments.length,N=K(R),B=R,G=gs(S);B--;)N[B]=arguments[B];var oe=R<3&&N[0]!==G&&N[R-1]!==G?[]:ar(N,G);if(R-=oe.length,R<u)return ed(i,a,Ua,S.placeholder,t,N,oe,t,t,u-R);var ae=this&&this!==hn&&this instanceof S?g:i;return Bn(ae,this,N)}return S}function Zf(i){return function(a,u,g){var S=Dt(a);if(!In(a)){var R=He(u,3);a=on(a),u=function(B){return R(S[B],B,S)}}var N=i(a,u,g);return N>-1?S[R?a[N]:N]:t}}function $f(i){return zi(function(a){var u=a.length,g=u,S=Zn.prototype.thru;for(i&&a.reverse();g--;){var R=a[g];if(typeof R!="function")throw new Kn(c);if(S&&!N&&Ba(R)=="wrapper")var N=new Zn([],!0)}for(g=N?g:u;++g<u;){R=a[g];var B=Ba(R),G=B=="wrapper"?kl(R):t;G&&Vl(G[0])&&G[1]==(D|b|z|V)&&!G[4].length&&G[9]==1?N=N[Ba(G[0])].apply(N,G[3]):N=R.length==1&&Vl(R)?N[B]():N.thru(R)}return function(){var oe=arguments,ae=oe[0];if(N&&oe.length==1&&et(ae))return N.plant(ae).value();for(var he=0,ye=u?a[he].apply(this,oe):ae;++he<u;)ye=a[he].call(this,ye);return ye}})}function Ua(i,a,u,g,S,R,N,B,G,oe){var ae=a&D,he=a&x,ye=a&_,Ie=a&(b|I),Ve=a&C,st=ye?t:Ro(i);function We(){for(var mt=arguments.length,yt=K(mt),Gn=mt;Gn--;)yt[Gn]=arguments[Gn];if(Ie)var An=gs(We),Vn=O_(yt,An);if(g&&(yt=Xf(yt,g,S,Ie)),R&&(yt=qf(yt,R,N,Ie)),mt-=Vn,Ie&&mt<oe){var jt=ar(yt,An);return ed(i,a,Ua,We.placeholder,u,yt,jt,B,G,oe-mt)}var li=he?u:this,Wi=ye?li[i]:i;return mt=yt.length,B?yt=Wv(yt,B):Ve&&mt>1&&yt.reverse(),ae&&G<mt&&(yt.length=G),this&&this!==hn&&this instanceof We&&(Wi=st||Ro(Wi)),Wi.apply(li,yt)}return We}function Jf(i,a){return function(u,g){return J0(u,i,a(g),{})}}function Na(i,a){return function(u,g){var S;if(u===t&&g===t)return a;if(u!==t&&(S=u),g!==t){if(S===t)return g;typeof u=="string"||typeof g=="string"?(u=zn(u),g=zn(g)):(u=Ff(u),g=Ff(g)),S=i(u,g)}return S}}function Nl(i){return zi(function(a){return a=zt(a,kn(He())),ht(function(u){var g=this;return i(a,function(S){return Bn(S,g,u)})})})}function Oa(i,a){a=a===t?" ":zn(a);var u=a.length;if(u<2)return u?Rl(a,i):a;var g=Rl(a,Ma(i/cs(a)));return as(a)?fr(oi(g),0,i).join(""):g.slice(0,i)}function Tv(i,a,u,g){var S=a&x,R=Ro(i);function N(){for(var B=-1,G=arguments.length,oe=-1,ae=g.length,he=K(ae+G),ye=this&&this!==hn&&this instanceof N?R:i;++oe<ae;)he[oe]=g[oe];for(;G--;)he[oe++]=arguments[++B];return Bn(ye,S?u:this,he)}return N}function Qf(i){return function(a,u,g){return g&&typeof g!="number"&&Tn(a,u,g)&&(u=g=t),a=Vi(a),u===t?(u=a,a=0):u=Vi(u),g=g===t?a<u?1:-1:Vi(g),uv(a,u,g,i)}}function Fa(i){return function(a,u){return typeof a=="string"&&typeof u=="string"||(a=ei(a),u=ei(u)),i(a,u)}}function ed(i,a,u,g,S,R,N,B,G,oe){var ae=a&b,he=ae?N:t,ye=ae?t:N,Ie=ae?R:t,Ve=ae?t:R;a|=ae?z:O,a&=~(ae?O:z),a&P||(a&=-4);var st=[i,a,S,Ie,he,Ve,ye,B,G,oe],We=u.apply(t,st);return Vl(i)&&fd(We,st),We.placeholder=g,dd(We,i,a)}function Ol(i){var a=$t[i];return function(u,g){if(u=ei(u),g=g==null?0:_n(it(g),292),g&&df(u)){var S=(wt(u)+"e").split("e"),R=a(S[0]+"e"+(+S[1]+g));return S=(wt(R)+"e").split("e"),+(S[0]+"e"+(+S[1]-g))}return a(u)}}var Av=hs&&1/fa(new hs([,-0]))[1]==xe?function(i){return new hs(i)}:ru;function td(i){return function(a){var u=vn(a);return u==St?fl(a):u==le?V_(a):N_(a,i(a))}}function ki(i,a,u,g,S,R,N,B){var G=a&_;if(!G&&typeof i!="function")throw new Kn(c);var oe=g?g.length:0;if(oe||(a&=-97,g=S=t),N=N===t?N:Jt(it(N),0),B=B===t?B:it(B),oe-=S?S.length:0,a&O){var ae=g,he=S;g=S=t}var ye=G?t:kl(i),Ie=[i,a,u,g,S,ae,he,R,N,B];if(ye&&Hv(Ie,ye),i=Ie[0],a=Ie[1],u=Ie[2],g=Ie[3],S=Ie[4],B=Ie[9]=Ie[9]===t?G?0:i.length:Jt(Ie[9]-oe,0),!B&&a&(b|I)&&(a&=-25),!a||a==x)var Ve=Ev(i,a,u);else a==b||a==I?Ve=bv(i,a,B):(a==z||a==(x|z))&&!S.length?Ve=Tv(i,a,u,g):Ve=Ua.apply(t,Ie);var st=ye?Nf:fd;return dd(st(Ve,Ie),i,a)}function nd(i,a,u,g){return i===t||ci(i,us[u])&&!Ct.call(g,u)?a:i}function id(i,a,u,g,S,R){return Gt(i)&&Gt(a)&&(R.set(a,i),La(i,a,t,id,R),R.delete(a)),i}function wv(i){return Po(i)?t:i}function rd(i,a,u,g,S,R){var N=u&M,B=i.length,G=a.length;if(B!=G&&!(N&&G>B))return!1;var oe=R.get(i),ae=R.get(a);if(oe&&ae)return oe==a&&ae==i;var he=-1,ye=!0,Ie=u&E?new Or:t;for(R.set(i,a),R.set(a,i);++he<B;){var Ve=i[he],st=a[he];if(g)var We=N?g(st,Ve,he,a,i,R):g(Ve,st,he,i,a,R);if(We!==t){if(We)continue;ye=!1;break}if(Ie){if(!ol(a,function(mt,yt){if(!_o(Ie,yt)&&(Ve===mt||S(Ve,mt,u,g,R)))return Ie.push(yt)})){ye=!1;break}}else if(!(Ve===st||S(Ve,st,u,g,R))){ye=!1;break}}return R.delete(i),R.delete(a),ye}function Rv(i,a,u,g,S,R,N){switch(u){case Me:if(i.byteLength!=a.byteLength||i.byteOffset!=a.byteOffset)return!1;i=i.buffer,a=a.buffer;case _e:return!(i.byteLength!=a.byteLength||!R(new va(i),new va(a)));case qe:case Ye:case ke:return ci(+i,+a);case q:return i.name==a.name&&i.message==a.message;case se:case fe:return i==a+"";case St:var B=fl;case le:var G=g&M;if(B||(B=fa),i.size!=a.size&&!G)return!1;var oe=N.get(i);if(oe)return oe==a;g|=E,N.set(i,a);var ae=rd(B(i),B(a),g,S,R,N);return N.delete(i),ae;case Fe:if(Mo)return Mo.call(i)==Mo.call(a)}return!1}function Cv(i,a,u,g,S,R){var N=u&M,B=Fl(i),G=B.length,oe=Fl(a),ae=oe.length;if(G!=ae&&!N)return!1;for(var he=G;he--;){var ye=B[he];if(!(N?ye in a:Ct.call(a,ye)))return!1}var Ie=R.get(i),Ve=R.get(a);if(Ie&&Ve)return Ie==a&&Ve==i;var st=!0;R.set(i,a),R.set(a,i);for(var We=N;++he<G;){ye=B[he];var mt=i[ye],yt=a[ye];if(g)var Gn=N?g(yt,mt,ye,a,i,R):g(mt,yt,ye,i,a,R);if(!(Gn===t?mt===yt||S(mt,yt,u,g,R):Gn)){st=!1;break}We||(We=ye=="constructor")}if(st&&!We){var An=i.constructor,Vn=a.constructor;An!=Vn&&"constructor"in i&&"constructor"in a&&!(typeof An=="function"&&An instanceof An&&typeof Vn=="function"&&Vn instanceof Vn)&&(st=!1)}return R.delete(i),R.delete(a),st}function zi(i){return Xl(ud(i,t,xd),i+"")}function Fl(i){return bf(i,on,Hl)}function Bl(i){return bf(i,Dn,sd)}var kl=ba?function(i){return ba.get(i)}:ru;function Ba(i){for(var a=i.name+"",u=fs[a],g=Ct.call(fs,a)?u.length:0;g--;){var S=u[g],R=S.func;if(R==null||R==i)return S.name}return a}function gs(i){var a=Ct.call(A,"placeholder")?A:i;return a.placeholder}function He(){var i=A.iteratee||nu;return i=i===nu?wf:i,arguments.length?i(arguments[0],arguments[1]):i}function ka(i,a){var u=i.__data__;return Fv(a)?u[typeof a=="string"?"string":"hash"]:u.map}function zl(i){for(var a=on(i),u=a.length;u--;){var g=a[u],S=i[g];a[u]=[g,S,cd(S)]}return a}function kr(i,a){var u=z_(i,a);return Af(u)?u:t}function Lv(i){var a=Ct.call(i,Ur),u=i[Ur];try{i[Ur]=t;var g=!0}catch{}var S=ga.call(i);return g&&(a?i[Ur]=u:delete i[Ur]),S}var Hl=pl?function(i){return i==null?[]:(i=Dt(i),sr(pl(i),function(a){return hf.call(i,a)}))}:su,sd=pl?function(i){for(var a=[];i;)or(a,Hl(i)),i=xa(i);return a}:su,vn=bn;(ml&&vn(new ml(new ArrayBuffer(1)))!=Me||xo&&vn(new xo)!=St||gl&&vn(gl.resolve())!=T||hs&&vn(new hs)!=le||yo&&vn(new yo)!=Pe)&&(vn=function(i){var a=bn(i),u=a==U?i.constructor:t,g=u?zr(u):"";if(g)switch(g){case f0:return Me;case d0:return St;case p0:return T;case m0:return le;case g0:return Pe}return a});function Pv(i,a,u){for(var g=-1,S=u.length;++g<S;){var R=u[g],N=R.size;switch(R.type){case"drop":i+=N;break;case"dropRight":a-=N;break;case"take":a=_n(a,i+N);break;case"takeRight":i=Jt(i,a-N);break}}return{start:i,end:a}}function Iv(i){var a=i.match(rs);return a?a[1].split(aa):[]}function od(i,a,u){a=hr(a,i);for(var g=-1,S=a.length,R=!1;++g<S;){var N=Ei(a[g]);if(!(R=i!=null&&u(i,N)))break;i=i[N]}return R||++g!=S?R:(S=i==null?0:i.length,!!S&&qa(S)&&Hi(N,S)&&(et(i)||Hr(i)))}function Dv(i){var a=i.length,u=new i.constructor(a);return a&&typeof i[0]=="string"&&Ct.call(i,"index")&&(u.index=i.index,u.input=i.input),u}function ad(i){return typeof i.constructor=="function"&&!Co(i)?ds(xa(i)):{}}function Uv(i,a,u){var g=i.constructor;switch(a){case _e:return Ul(i);case qe:case Ye:return new g(+i);case Me:return _v(i,u);case Xe:case Ce:case Le:case rt:case lt:case vt:case dt:case xt:case De:return Vf(i,u);case St:return new g;case ke:case fe:return new g(i);case se:return vv(i);case le:return new g;case Fe:return xv(i)}}function Nv(i,a){var u=a.length;if(!u)return i;var g=u-1;return a[g]=(u>1?"& ":"")+a[g],a=a.join(u>2?", ":" "),i.replace(oa,`{
/* [wrapped with `+a+`] */
`)}function Ov(i){return et(i)||Hr(i)||!!(ff&&i&&i[ff])}function Hi(i,a){var u=typeof i;return a=a??Q,!!a&&(u=="number"||u!="symbol"&&Ee.test(i))&&i>-1&&i%1==0&&i<a}function Tn(i,a,u){if(!Gt(u))return!1;var g=typeof a;return(g=="number"?In(u)&&Hi(a,u.length):g=="string"&&a in u)?ci(u[a],i):!1}function Gl(i,a){if(et(i))return!1;var u=typeof i;return u=="number"||u=="symbol"||u=="boolean"||i==null||Hn(i)?!0:Wt.test(i)||!Vt.test(i)||a!=null&&i in Dt(a)}function Fv(i){var a=typeof i;return a=="string"||a=="number"||a=="symbol"||a=="boolean"?i!=="__proto__":i===null}function Vl(i){var a=Ba(i),u=A[a];if(typeof u!="function"||!(a in gt.prototype))return!1;if(i===u)return!0;var g=kl(u);return!!g&&i===g[0]}function Bv(i){return!!cf&&cf in i}var kv=pa?Gi:ou;function Co(i){var a=i&&i.constructor,u=typeof a=="function"&&a.prototype||us;return i===u}function cd(i){return i===i&&!Gt(i)}function ld(i,a){return function(u){return u==null?!1:u[i]===a&&(a!==t||i in Dt(u))}}function zv(i){var a=Wa(i,function(g){return u.size===f&&u.clear(),g}),u=a.cache;return a}function Hv(i,a){var u=i[1],g=a[1],S=u|g,R=S<(x|_|D),N=g==D&&u==b||g==D&&u==V&&i[7].length<=a[8]||g==(D|V)&&a[7].length<=a[8]&&u==b;if(!(R||N))return i;g&x&&(i[2]=a[2],S|=u&x?0:P);var B=a[3];if(B){var G=i[3];i[3]=G?Xf(G,B,a[4]):B,i[4]=G?ar(i[3],d):a[4]}return B=a[5],B&&(G=i[5],i[5]=G?qf(G,B,a[6]):B,i[6]=G?ar(i[5],d):a[6]),B=a[7],B&&(i[7]=B),g&D&&(i[8]=i[8]==null?a[8]:_n(i[8],a[8])),i[9]==null&&(i[9]=a[9]),i[0]=a[0],i[1]=S,i}function Gv(i){var a=[];if(i!=null)for(var u in Dt(i))a.push(u);return a}function Vv(i){return ga.call(i)}function ud(i,a,u){return a=Jt(a===t?i.length-1:a,0),function(){for(var g=arguments,S=-1,R=Jt(g.length-a,0),N=K(R);++S<R;)N[S]=g[a+S];S=-1;for(var B=K(a+1);++S<a;)B[S]=g[S];return B[a]=u(N),Bn(i,this,B)}}function hd(i,a){return a.length<2?i:Br(i,Jn(a,0,-1))}function Wv(i,a){for(var u=i.length,g=_n(a.length,u),S=Pn(i);g--;){var R=a[g];i[g]=Hi(R,u)?S[R]:t}return i}function Wl(i,a){if(!(a==="constructor"&&typeof i[a]=="function")&&a!="__proto__")return i[a]}var fd=pd(Nf),Lo=s0||function(i,a){return hn.setTimeout(i,a)},Xl=pd(dv);function dd(i,a,u){var g=a+"";return Xl(i,Nv(g,Xv(Iv(g),u)))}function pd(i){var a=0,u=0;return function(){var g=l0(),S=k-(g-u);if(u=g,S>0){if(++a>=J)return arguments[0]}else a=0;return i.apply(t,arguments)}}function za(i,a){var u=-1,g=i.length,S=g-1;for(a=a===t?g:a;++u<a;){var R=wl(u,S),N=i[R];i[R]=i[u],i[u]=N}return i.length=a,i}var md=zv(function(i){var a=[];return i.charCodeAt(0)===46&&a.push(""),i.replace(Mn,function(u,g,S,R){a.push(S?R.replace(Zc,"$1"):g||u)}),a});function Ei(i){if(typeof i=="string"||Hn(i))return i;var a=i+"";return a=="0"&&1/i==-1/0?"-0":a}function zr(i){if(i!=null){try{return ma.call(i)}catch{}try{return i+""}catch{}}return""}function Xv(i,a){return jn(ie,function(u){var g="_."+u[0];a&u[1]&&!ua(i,g)&&i.push(g)}),i.sort()}function gd(i){if(i instanceof gt)return i.clone();var a=new Zn(i.__wrapped__,i.__chain__);return a.__actions__=Pn(i.__actions__),a.__index__=i.__index__,a.__values__=i.__values__,a}function qv(i,a,u){(u?Tn(i,a,u):a===t)?a=1:a=Jt(it(a),0);var g=i==null?0:i.length;if(!g||a<1)return[];for(var S=0,R=0,N=K(Ma(g/a));S<g;)N[R++]=Jn(i,S,S+=a);return N}function Yv(i){for(var a=-1,u=i==null?0:i.length,g=0,S=[];++a<u;){var R=i[a];R&&(S[g++]=R)}return S}function jv(){var i=arguments.length;if(!i)return[];for(var a=K(i-1),u=arguments[0],g=i;g--;)a[g-1]=arguments[g];return or(et(u)?Pn(u):[u],fn(a,1))}var Kv=ht(function(i,a){return Yt(i)?bo(i,fn(a,1,Yt,!0)):[]}),Zv=ht(function(i,a){var u=Qn(a);return Yt(u)&&(u=t),Yt(i)?bo(i,fn(a,1,Yt,!0),He(u,2)):[]}),$v=ht(function(i,a){var u=Qn(a);return Yt(u)&&(u=t),Yt(i)?bo(i,fn(a,1,Yt,!0),t,u):[]});function Jv(i,a,u){var g=i==null?0:i.length;return g?(a=u||a===t?1:it(a),Jn(i,a<0?0:a,g)):[]}function Qv(i,a,u){var g=i==null?0:i.length;return g?(a=u||a===t?1:it(a),a=g-a,Jn(i,0,a<0?0:a)):[]}function ex(i,a){return i&&i.length?Ia(i,He(a,3),!0,!0):[]}function tx(i,a){return i&&i.length?Ia(i,He(a,3),!0):[]}function nx(i,a,u,g){var S=i==null?0:i.length;return S?(u&&typeof u!="number"&&Tn(i,a,u)&&(u=0,g=S),j0(i,a,u,g)):[]}function _d(i,a,u){var g=i==null?0:i.length;if(!g)return-1;var S=u==null?0:it(u);return S<0&&(S=Jt(g+S,0)),ha(i,He(a,3),S)}function vd(i,a,u){var g=i==null?0:i.length;if(!g)return-1;var S=g-1;return u!==t&&(S=it(u),S=u<0?Jt(g+S,0):_n(S,g-1)),ha(i,He(a,3),S,!0)}function xd(i){var a=i==null?0:i.length;return a?fn(i,1):[]}function ix(i){var a=i==null?0:i.length;return a?fn(i,xe):[]}function rx(i,a){var u=i==null?0:i.length;return u?(a=a===t?1:it(a),fn(i,a)):[]}function sx(i){for(var a=-1,u=i==null?0:i.length,g={};++a<u;){var S=i[a];g[S[0]]=S[1]}return g}function yd(i){return i&&i.length?i[0]:t}function ox(i,a,u){var g=i==null?0:i.length;if(!g)return-1;var S=u==null?0:it(u);return S<0&&(S=Jt(g+S,0)),os(i,a,S)}function ax(i){var a=i==null?0:i.length;return a?Jn(i,0,-1):[]}var cx=ht(function(i){var a=zt(i,Il);return a.length&&a[0]===i[0]?Ml(a):[]}),lx=ht(function(i){var a=Qn(i),u=zt(i,Il);return a===Qn(u)?a=t:u.pop(),u.length&&u[0]===i[0]?Ml(u,He(a,2)):[]}),ux=ht(function(i){var a=Qn(i),u=zt(i,Il);return a=typeof a=="function"?a:t,a&&u.pop(),u.length&&u[0]===i[0]?Ml(u,t,a):[]});function hx(i,a){return i==null?"":a0.call(i,a)}function Qn(i){var a=i==null?0:i.length;return a?i[a-1]:t}function fx(i,a,u){var g=i==null?0:i.length;if(!g)return-1;var S=g;return u!==t&&(S=it(u),S=S<0?Jt(g+S,0):_n(S,g-1)),a===a?X_(i,a,S):ha(i,Qh,S,!0)}function dx(i,a){return i&&i.length?Pf(i,it(a)):t}var px=ht(Sd);function Sd(i,a){return i&&i.length&&a&&a.length?Al(i,a):i}function mx(i,a,u){return i&&i.length&&a&&a.length?Al(i,a,He(u,2)):i}function gx(i,a,u){return i&&i.length&&a&&a.length?Al(i,a,t,u):i}var _x=zi(function(i,a){var u=i==null?0:i.length,g=vl(i,a);return Uf(i,zt(a,function(S){return Hi(S,u)?+S:S}).sort(Wf)),g});function vx(i,a){var u=[];if(!(i&&i.length))return u;var g=-1,S=[],R=i.length;for(a=He(a,3);++g<R;){var N=i[g];a(N,g,i)&&(u.push(N),S.push(g))}return Uf(i,S),u}function ql(i){return i==null?i:h0.call(i)}function xx(i,a,u){var g=i==null?0:i.length;return g?(u&&typeof u!="number"&&Tn(i,a,u)?(a=0,u=g):(a=a==null?0:it(a),u=u===t?g:it(u)),Jn(i,a,u)):[]}function yx(i,a){return Pa(i,a)}function Sx(i,a,u){return Cl(i,a,He(u,2))}function Mx(i,a){var u=i==null?0:i.length;if(u){var g=Pa(i,a);if(g<u&&ci(i[g],a))return g}return-1}function Ex(i,a){return Pa(i,a,!0)}function bx(i,a,u){return Cl(i,a,He(u,2),!0)}function Tx(i,a){var u=i==null?0:i.length;if(u){var g=Pa(i,a,!0)-1;if(ci(i[g],a))return g}return-1}function Ax(i){return i&&i.length?Of(i):[]}function wx(i,a){return i&&i.length?Of(i,He(a,2)):[]}function Rx(i){var a=i==null?0:i.length;return a?Jn(i,1,a):[]}function Cx(i,a,u){return i&&i.length?(a=u||a===t?1:it(a),Jn(i,0,a<0?0:a)):[]}function Lx(i,a,u){var g=i==null?0:i.length;return g?(a=u||a===t?1:it(a),a=g-a,Jn(i,a<0?0:a,g)):[]}function Px(i,a){return i&&i.length?Ia(i,He(a,3),!1,!0):[]}function Ix(i,a){return i&&i.length?Ia(i,He(a,3)):[]}var Dx=ht(function(i){return ur(fn(i,1,Yt,!0))}),Ux=ht(function(i){var a=Qn(i);return Yt(a)&&(a=t),ur(fn(i,1,Yt,!0),He(a,2))}),Nx=ht(function(i){var a=Qn(i);return a=typeof a=="function"?a:t,ur(fn(i,1,Yt,!0),t,a)});function Ox(i){return i&&i.length?ur(i):[]}function Fx(i,a){return i&&i.length?ur(i,He(a,2)):[]}function Bx(i,a){return a=typeof a=="function"?a:t,i&&i.length?ur(i,t,a):[]}function Yl(i){if(!(i&&i.length))return[];var a=0;return i=sr(i,function(u){if(Yt(u))return a=Jt(u.length,a),!0}),ul(a,function(u){return zt(i,al(u))})}function Md(i,a){if(!(i&&i.length))return[];var u=Yl(i);return a==null?u:zt(u,function(g){return Bn(a,t,g)})}var kx=ht(function(i,a){return Yt(i)?bo(i,a):[]}),zx=ht(function(i){return Pl(sr(i,Yt))}),Hx=ht(function(i){var a=Qn(i);return Yt(a)&&(a=t),Pl(sr(i,Yt),He(a,2))}),Gx=ht(function(i){var a=Qn(i);return a=typeof a=="function"?a:t,Pl(sr(i,Yt),t,a)}),Vx=ht(Yl);function Wx(i,a){return zf(i||[],a||[],Eo)}function Xx(i,a){return zf(i||[],a||[],wo)}var qx=ht(function(i){var a=i.length,u=a>1?i[a-1]:t;return u=typeof u=="function"?(i.pop(),u):t,Md(i,u)});function Ed(i){var a=A(i);return a.__chain__=!0,a}function Yx(i,a){return a(i),i}function Ha(i,a){return a(i)}var jx=zi(function(i){var a=i.length,u=a?i[0]:0,g=this.__wrapped__,S=function(R){return vl(R,i)};return a>1||this.__actions__.length||!(g instanceof gt)||!Hi(u)?this.thru(S):(g=g.slice(u,+u+(a?1:0)),g.__actions__.push({func:Ha,args:[S],thisArg:t}),new Zn(g,this.__chain__).thru(function(R){return a&&!R.length&&R.push(t),R}))});function Kx(){return Ed(this)}function Zx(){return new Zn(this.value(),this.__chain__)}function $x(){this.__values__===t&&(this.__values__=Fd(this.value()));var i=this.__index__>=this.__values__.length,a=i?t:this.__values__[this.__index__++];return{done:i,value:a}}function Jx(){return this}function Qx(i){for(var a,u=this;u instanceof Aa;){var g=gd(u);g.__index__=0,g.__values__=t,a?S.__wrapped__=g:a=g;var S=g;u=u.__wrapped__}return S.__wrapped__=i,a}function ey(){var i=this.__wrapped__;if(i instanceof gt){var a=i;return this.__actions__.length&&(a=new gt(this)),a=a.reverse(),a.__actions__.push({func:Ha,args:[ql],thisArg:t}),new Zn(a,this.__chain__)}return this.thru(ql)}function ty(){return kf(this.__wrapped__,this.__actions__)}var ny=Da(function(i,a,u){Ct.call(i,u)?++i[u]:Bi(i,u,1)});function iy(i,a,u){var g=et(i)?$h:Y0;return u&&Tn(i,a,u)&&(a=t),g(i,He(a,3))}function ry(i,a){var u=et(i)?sr:Mf;return u(i,He(a,3))}var sy=Zf(_d),oy=Zf(vd);function ay(i,a){return fn(Ga(i,a),1)}function cy(i,a){return fn(Ga(i,a),xe)}function ly(i,a,u){return u=u===t?1:it(u),fn(Ga(i,a),u)}function bd(i,a){var u=et(i)?jn:lr;return u(i,He(a,3))}function Td(i,a){var u=et(i)?R_:Sf;return u(i,He(a,3))}var uy=Da(function(i,a,u){Ct.call(i,u)?i[u].push(a):Bi(i,u,[a])});function hy(i,a,u,g){i=In(i)?i:vs(i),u=u&&!g?it(u):0;var S=i.length;return u<0&&(u=Jt(S+u,0)),Ya(i)?u<=S&&i.indexOf(a,u)>-1:!!S&&os(i,a,u)>-1}var fy=ht(function(i,a,u){var g=-1,S=typeof a=="function",R=In(i)?K(i.length):[];return lr(i,function(N){R[++g]=S?Bn(a,N,u):To(N,a,u)}),R}),dy=Da(function(i,a,u){Bi(i,u,a)});function Ga(i,a){var u=et(i)?zt:Rf;return u(i,He(a,3))}function py(i,a,u,g){return i==null?[]:(et(a)||(a=a==null?[]:[a]),u=g?t:u,et(u)||(u=u==null?[]:[u]),If(i,a,u))}var my=Da(function(i,a,u){i[u?0:1].push(a)},function(){return[[],[]]});function gy(i,a,u){var g=et(i)?sl:tf,S=arguments.length<3;return g(i,He(a,4),u,S,lr)}function _y(i,a,u){var g=et(i)?C_:tf,S=arguments.length<3;return g(i,He(a,4),u,S,Sf)}function vy(i,a){var u=et(i)?sr:Mf;return u(i,Xa(He(a,3)))}function xy(i){var a=et(i)?_f:hv;return a(i)}function yy(i,a,u){(u?Tn(i,a,u):a===t)?a=1:a=it(a);var g=et(i)?G0:fv;return g(i,a)}function Sy(i){var a=et(i)?V0:pv;return a(i)}function My(i){if(i==null)return 0;if(In(i))return Ya(i)?cs(i):i.length;var a=vn(i);return a==St||a==le?i.size:bl(i).length}function Ey(i,a,u){var g=et(i)?ol:mv;return u&&Tn(i,a,u)&&(a=t),g(i,He(a,3))}var by=ht(function(i,a){if(i==null)return[];var u=a.length;return u>1&&Tn(i,a[0],a[1])?a=[]:u>2&&Tn(a[0],a[1],a[2])&&(a=[a[0]]),If(i,fn(a,1),[])}),Va=r0||function(){return hn.Date.now()};function Ty(i,a){if(typeof a!="function")throw new Kn(c);return i=it(i),function(){if(--i<1)return a.apply(this,arguments)}}function Ad(i,a,u){return a=u?t:a,a=i&&a==null?i.length:a,ki(i,D,t,t,t,t,a)}function wd(i,a){var u;if(typeof a!="function")throw new Kn(c);return i=it(i),function(){return--i>0&&(u=a.apply(this,arguments)),i<=1&&(a=t),u}}var jl=ht(function(i,a,u){var g=x;if(u.length){var S=ar(u,gs(jl));g|=z}return ki(i,g,a,u,S)}),Rd=ht(function(i,a,u){var g=x|_;if(u.length){var S=ar(u,gs(Rd));g|=z}return ki(a,g,i,u,S)});function Cd(i,a,u){a=u?t:a;var g=ki(i,b,t,t,t,t,t,a);return g.placeholder=Cd.placeholder,g}function Ld(i,a,u){a=u?t:a;var g=ki(i,I,t,t,t,t,t,a);return g.placeholder=Ld.placeholder,g}function Pd(i,a,u){var g,S,R,N,B,G,oe=0,ae=!1,he=!1,ye=!0;if(typeof i!="function")throw new Kn(c);a=ei(a)||0,Gt(u)&&(ae=!!u.leading,he="maxWait"in u,R=he?Jt(ei(u.maxWait)||0,a):R,ye="trailing"in u?!!u.trailing:ye);function Ie(jt){var li=g,Wi=S;return g=S=t,oe=jt,N=i.apply(Wi,li),N}function Ve(jt){return oe=jt,B=Lo(mt,a),ae?Ie(jt):N}function st(jt){var li=jt-G,Wi=jt-oe,Zd=a-li;return he?_n(Zd,R-Wi):Zd}function We(jt){var li=jt-G,Wi=jt-oe;return G===t||li>=a||li<0||he&&Wi>=R}function mt(){var jt=Va();if(We(jt))return yt(jt);B=Lo(mt,st(jt))}function yt(jt){return B=t,ye&&g?Ie(jt):(g=S=t,N)}function Gn(){B!==t&&Hf(B),oe=0,g=G=S=B=t}function An(){return B===t?N:yt(Va())}function Vn(){var jt=Va(),li=We(jt);if(g=arguments,S=this,G=jt,li){if(B===t)return Ve(G);if(he)return Hf(B),B=Lo(mt,a),Ie(G)}return B===t&&(B=Lo(mt,a)),N}return Vn.cancel=Gn,Vn.flush=An,Vn}var Ay=ht(function(i,a){return yf(i,1,a)}),wy=ht(function(i,a,u){return yf(i,ei(a)||0,u)});function Ry(i){return ki(i,C)}function Wa(i,a){if(typeof i!="function"||a!=null&&typeof a!="function")throw new Kn(c);var u=function(){var g=arguments,S=a?a.apply(this,g):g[0],R=u.cache;if(R.has(S))return R.get(S);var N=i.apply(this,g);return u.cache=R.set(S,N)||R,N};return u.cache=new(Wa.Cache||Fi),u}Wa.Cache=Fi;function Xa(i){if(typeof i!="function")throw new Kn(c);return function(){var a=arguments;switch(a.length){case 0:return!i.call(this);case 1:return!i.call(this,a[0]);case 2:return!i.call(this,a[0],a[1]);case 3:return!i.call(this,a[0],a[1],a[2])}return!i.apply(this,a)}}function Cy(i){return wd(2,i)}var Ly=gv(function(i,a){a=a.length==1&&et(a[0])?zt(a[0],kn(He())):zt(fn(a,1),kn(He()));var u=a.length;return ht(function(g){for(var S=-1,R=_n(g.length,u);++S<R;)g[S]=a[S].call(this,g[S]);return Bn(i,this,g)})}),Kl=ht(function(i,a){var u=ar(a,gs(Kl));return ki(i,z,t,a,u)}),Id=ht(function(i,a){var u=ar(a,gs(Id));return ki(i,O,t,a,u)}),Py=zi(function(i,a){return ki(i,V,t,t,t,a)});function Iy(i,a){if(typeof i!="function")throw new Kn(c);return a=a===t?a:it(a),ht(i,a)}function Dy(i,a){if(typeof i!="function")throw new Kn(c);return a=a==null?0:Jt(it(a),0),ht(function(u){var g=u[a],S=fr(u,0,a);return g&&or(S,g),Bn(i,this,S)})}function Uy(i,a,u){var g=!0,S=!0;if(typeof i!="function")throw new Kn(c);return Gt(u)&&(g="leading"in u?!!u.leading:g,S="trailing"in u?!!u.trailing:S),Pd(i,a,{leading:g,maxWait:a,trailing:S})}function Ny(i){return Ad(i,1)}function Oy(i,a){return Kl(Dl(a),i)}function Fy(){if(!arguments.length)return[];var i=arguments[0];return et(i)?i:[i]}function By(i){return $n(i,v)}function ky(i,a){return a=typeof a=="function"?a:t,$n(i,v,a)}function zy(i){return $n(i,p|v)}function Hy(i,a){return a=typeof a=="function"?a:t,$n(i,p|v,a)}function Gy(i,a){return a==null||xf(i,a,on(a))}function ci(i,a){return i===a||i!==i&&a!==a}var Vy=Fa(Sl),Wy=Fa(function(i,a){return i>=a}),Hr=Tf(function(){return arguments}())?Tf:function(i){return Xt(i)&&Ct.call(i,"callee")&&!hf.call(i,"callee")},et=K.isArray,Xy=Xh?kn(Xh):Q0;function In(i){return i!=null&&qa(i.length)&&!Gi(i)}function Yt(i){return Xt(i)&&In(i)}function qy(i){return i===!0||i===!1||Xt(i)&&bn(i)==qe}var dr=o0||ou,Yy=qh?kn(qh):ev;function jy(i){return Xt(i)&&i.nodeType===1&&!Po(i)}function Ky(i){if(i==null)return!0;if(In(i)&&(et(i)||typeof i=="string"||typeof i.splice=="function"||dr(i)||_s(i)||Hr(i)))return!i.length;var a=vn(i);if(a==St||a==le)return!i.size;if(Co(i))return!bl(i).length;for(var u in i)if(Ct.call(i,u))return!1;return!0}function Zy(i,a){return Ao(i,a)}function $y(i,a,u){u=typeof u=="function"?u:t;var g=u?u(i,a):t;return g===t?Ao(i,a,t,u):!!g}function Zl(i){if(!Xt(i))return!1;var a=bn(i);return a==q||a==ft||typeof i.message=="string"&&typeof i.name=="string"&&!Po(i)}function Jy(i){return typeof i=="number"&&df(i)}function Gi(i){if(!Gt(i))return!1;var a=bn(i);return a==Je||a==Ge||a==be||a==ee}function Dd(i){return typeof i=="number"&&i==it(i)}function qa(i){return typeof i=="number"&&i>-1&&i%1==0&&i<=Q}function Gt(i){var a=typeof i;return i!=null&&(a=="object"||a=="function")}function Xt(i){return i!=null&&typeof i=="object"}var Ud=Yh?kn(Yh):nv;function Qy(i,a){return i===a||El(i,a,zl(a))}function eS(i,a,u){return u=typeof u=="function"?u:t,El(i,a,zl(a),u)}function tS(i){return Nd(i)&&i!=+i}function nS(i){if(kv(i))throw new $e(o);return Af(i)}function iS(i){return i===null}function rS(i){return i==null}function Nd(i){return typeof i=="number"||Xt(i)&&bn(i)==ke}function Po(i){if(!Xt(i)||bn(i)!=U)return!1;var a=xa(i);if(a===null)return!0;var u=Ct.call(a,"constructor")&&a.constructor;return typeof u=="function"&&u instanceof u&&ma.call(u)==e0}var $l=jh?kn(jh):iv;function sS(i){return Dd(i)&&i>=-9007199254740991&&i<=Q}var Od=Kh?kn(Kh):rv;function Ya(i){return typeof i=="string"||!et(i)&&Xt(i)&&bn(i)==fe}function Hn(i){return typeof i=="symbol"||Xt(i)&&bn(i)==Fe}var _s=Zh?kn(Zh):sv;function oS(i){return i===t}function aS(i){return Xt(i)&&vn(i)==Pe}function cS(i){return Xt(i)&&bn(i)==ze}var lS=Fa(Tl),uS=Fa(function(i,a){return i<=a});function Fd(i){if(!i)return[];if(In(i))return Ya(i)?oi(i):Pn(i);if(vo&&i[vo])return G_(i[vo]());var a=vn(i),u=a==St?fl:a==le?fa:vs;return u(i)}function Vi(i){if(!i)return i===0?i:0;if(i=ei(i),i===xe||i===-1/0){var a=i<0?-1:1;return a*ge}return i===i?i:0}function it(i){var a=Vi(i),u=a%1;return a===a?u?a-u:a:0}function Bd(i){return i?Fr(it(i),0,Ae):0}function ei(i){if(typeof i=="number")return i;if(Hn(i))return de;if(Gt(i)){var a=typeof i.valueOf=="function"?i.valueOf():i;i=Gt(a)?a+"":a}if(typeof i!="string")return i===0?i:+i;i=nf(i);var u=Z.test(i);return u||j.test(i)?T_(i.slice(2),u?2:8):W.test(i)?de:+i}function kd(i){return Mi(i,Dn(i))}function hS(i){return i?Fr(it(i),-9007199254740991,Q):i===0?i:0}function wt(i){return i==null?"":zn(i)}var fS=ps(function(i,a){if(Co(a)||In(a)){Mi(a,on(a),i);return}for(var u in a)Ct.call(a,u)&&Eo(i,u,a[u])}),zd=ps(function(i,a){Mi(a,Dn(a),i)}),ja=ps(function(i,a,u,g){Mi(a,Dn(a),i,g)}),dS=ps(function(i,a,u,g){Mi(a,on(a),i,g)}),pS=zi(vl);function mS(i,a){var u=ds(i);return a==null?u:vf(u,a)}var gS=ht(function(i,a){i=Dt(i);var u=-1,g=a.length,S=g>2?a[2]:t;for(S&&Tn(a[0],a[1],S)&&(g=1);++u<g;)for(var R=a[u],N=Dn(R),B=-1,G=N.length;++B<G;){var oe=N[B],ae=i[oe];(ae===t||ci(ae,us[oe])&&!Ct.call(i,oe))&&(i[oe]=R[oe])}return i}),_S=ht(function(i){return i.push(t,id),Bn(Hd,t,i)});function vS(i,a){return Jh(i,He(a,3),Si)}function xS(i,a){return Jh(i,He(a,3),yl)}function yS(i,a){return i==null?i:xl(i,He(a,3),Dn)}function SS(i,a){return i==null?i:Ef(i,He(a,3),Dn)}function MS(i,a){return i&&Si(i,He(a,3))}function ES(i,a){return i&&yl(i,He(a,3))}function bS(i){return i==null?[]:Ca(i,on(i))}function TS(i){return i==null?[]:Ca(i,Dn(i))}function Jl(i,a,u){var g=i==null?t:Br(i,a);return g===t?u:g}function AS(i,a){return i!=null&&od(i,a,K0)}function Ql(i,a){return i!=null&&od(i,a,Z0)}var wS=Jf(function(i,a,u){a!=null&&typeof a.toString!="function"&&(a=ga.call(a)),i[a]=u},tu(Un)),RS=Jf(function(i,a,u){a!=null&&typeof a.toString!="function"&&(a=ga.call(a)),Ct.call(i,a)?i[a].push(u):i[a]=[u]},He),CS=ht(To);function on(i){return In(i)?gf(i):bl(i)}function Dn(i){return In(i)?gf(i,!0):ov(i)}function LS(i,a){var u={};return a=He(a,3),Si(i,function(g,S,R){Bi(u,a(g,S,R),g)}),u}function PS(i,a){var u={};return a=He(a,3),Si(i,function(g,S,R){Bi(u,S,a(g,S,R))}),u}var IS=ps(function(i,a,u){La(i,a,u)}),Hd=ps(function(i,a,u,g){La(i,a,u,g)}),DS=zi(function(i,a){var u={};if(i==null)return u;var g=!1;a=zt(a,function(R){return R=hr(R,i),g||(g=R.length>1),R}),Mi(i,Bl(i),u),g&&(u=$n(u,p|m|v,wv));for(var S=a.length;S--;)Ll(u,a[S]);return u});function US(i,a){return Gd(i,Xa(He(a)))}var NS=zi(function(i,a){return i==null?{}:cv(i,a)});function Gd(i,a){if(i==null)return{};var u=zt(Bl(i),function(g){return[g]});return a=He(a),Df(i,u,function(g,S){return a(g,S[0])})}function OS(i,a,u){a=hr(a,i);var g=-1,S=a.length;for(S||(S=1,i=t);++g<S;){var R=i==null?t:i[Ei(a[g])];R===t&&(g=S,R=u),i=Gi(R)?R.call(i):R}return i}function FS(i,a,u){return i==null?i:wo(i,a,u)}function BS(i,a,u,g){return g=typeof g=="function"?g:t,i==null?i:wo(i,a,u,g)}var Vd=td(on),Wd=td(Dn);function kS(i,a,u){var g=et(i),S=g||dr(i)||_s(i);if(a=He(a,4),u==null){var R=i&&i.constructor;S?u=g?new R:[]:Gt(i)?u=Gi(R)?ds(xa(i)):{}:u={}}return(S?jn:Si)(i,function(N,B,G){return a(u,N,B,G)}),u}function zS(i,a){return i==null?!0:Ll(i,a)}function HS(i,a,u){return i==null?i:Bf(i,a,Dl(u))}function GS(i,a,u,g){return g=typeof g=="function"?g:t,i==null?i:Bf(i,a,Dl(u),g)}function vs(i){return i==null?[]:hl(i,on(i))}function VS(i){return i==null?[]:hl(i,Dn(i))}function WS(i,a,u){return u===t&&(u=a,a=t),u!==t&&(u=ei(u),u=u===u?u:0),a!==t&&(a=ei(a),a=a===a?a:0),Fr(ei(i),a,u)}function XS(i,a,u){return a=Vi(a),u===t?(u=a,a=0):u=Vi(u),i=ei(i),$0(i,a,u)}function qS(i,a,u){if(u&&typeof u!="boolean"&&Tn(i,a,u)&&(a=u=t),u===t&&(typeof a=="boolean"?(u=a,a=t):typeof i=="boolean"&&(u=i,i=t)),i===t&&a===t?(i=0,a=1):(i=Vi(i),a===t?(a=i,i=0):a=Vi(a)),i>a){var g=i;i=a,a=g}if(u||i%1||a%1){var S=pf();return _n(i+S*(a-i+b_("1e-"+((S+"").length-1))),a)}return wl(i,a)}var YS=ms(function(i,a,u){return a=a.toLowerCase(),i+(u?Xd(a):a)});function Xd(i){return eu(wt(i).toLowerCase())}function qd(i){return i=wt(i),i&&i.replace(Ne,F_).replace(p_,"")}function jS(i,a,u){i=wt(i),a=zn(a);var g=i.length;u=u===t?g:Fr(it(u),0,g);var S=u;return u-=a.length,u>=0&&i.slice(u,S)==a}function KS(i){return i=wt(i),i&&ut.test(i)?i.replace(Te,B_):i}function ZS(i){return i=wt(i),i&&vi.test(i)?i.replace(mn,"\\$&"):i}var $S=ms(function(i,a,u){return i+(u?"-":"")+a.toLowerCase()}),JS=ms(function(i,a,u){return i+(u?" ":"")+a.toLowerCase()}),QS=Kf("toLowerCase");function eM(i,a,u){i=wt(i),a=it(a);var g=a?cs(i):0;if(!a||g>=a)return i;var S=(a-g)/2;return Oa(Ea(S),u)+i+Oa(Ma(S),u)}function tM(i,a,u){i=wt(i),a=it(a);var g=a?cs(i):0;return a&&g<a?i+Oa(a-g,u):i}function nM(i,a,u){i=wt(i),a=it(a);var g=a?cs(i):0;return a&&g<a?Oa(a-g,u)+i:i}function iM(i,a,u){return u||a==null?a=0:a&&(a=+a),u0(wt(i).replace(xi,""),a||0)}function rM(i,a,u){return(u?Tn(i,a,u):a===t)?a=1:a=it(a),Rl(wt(i),a)}function sM(){var i=arguments,a=wt(i[0]);return i.length<3?a:a.replace(i[1],i[2])}var oM=ms(function(i,a,u){return i+(u?"_":"")+a.toLowerCase()});function aM(i,a,u){return u&&typeof u!="number"&&Tn(i,a,u)&&(a=u=t),u=u===t?Ae:u>>>0,u?(i=wt(i),i&&(typeof a=="string"||a!=null&&!$l(a))&&(a=zn(a),!a&&as(i))?fr(oi(i),0,u):i.split(a,u)):[]}var cM=ms(function(i,a,u){return i+(u?" ":"")+eu(a)});function lM(i,a,u){return i=wt(i),u=u==null?0:Fr(it(u),0,i.length),a=zn(a),i.slice(u,u+a.length)==a}function uM(i,a,u){var g=A.templateSettings;u&&Tn(i,a,u)&&(a=t),i=wt(i),a=ja({},a,g,nd);var S=ja({},a.imports,g.imports,nd),R=on(S),N=hl(S,R),B,G,oe=0,ae=a.interpolate||Be,he="__p += '",ye=dl((a.escape||Be).source+"|"+ae.source+"|"+(ae===Tt?$c:Be).source+"|"+(a.evaluate||Be).source+"|$","g"),Ie="//# sourceURL="+(Ct.call(a,"sourceURL")?(a.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++x_+"]")+`
`;i.replace(ye,function(We,mt,yt,Gn,An,Vn){return yt||(yt=Gn),he+=i.slice(oe,Vn).replace(je,k_),mt&&(B=!0,he+=`' +
__e(`+mt+`) +
'`),An&&(G=!0,he+=`';
`+An+`;
__p += '`),yt&&(he+=`' +
((__t = (`+yt+`)) == null ? '' : __t) +
'`),oe=Vn+We.length,We}),he+=`';
`;var Ve=Ct.call(a,"variable")&&a.variable;if(!Ve)he=`with (obj) {
`+he+`
}
`;else if(Kc.test(Ve))throw new $e(l);he=(G?he.replace(y,""):he).replace(Y,"$1").replace(re,"$1;"),he="function("+(Ve||"obj")+`) {
`+(Ve?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(B?", __e = _.escape":"")+(G?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+he+`return __p
}`;var st=jd(function(){return At(R,Ie+"return "+he).apply(t,N)});if(st.source=he,Zl(st))throw st;return st}function hM(i){return wt(i).toLowerCase()}function fM(i){return wt(i).toUpperCase()}function dM(i,a,u){if(i=wt(i),i&&(u||a===t))return nf(i);if(!i||!(a=zn(a)))return i;var g=oi(i),S=oi(a),R=rf(g,S),N=sf(g,S)+1;return fr(g,R,N).join("")}function pM(i,a,u){if(i=wt(i),i&&(u||a===t))return i.slice(0,af(i)+1);if(!i||!(a=zn(a)))return i;var g=oi(i),S=sf(g,oi(a))+1;return fr(g,0,S).join("")}function mM(i,a,u){if(i=wt(i),i&&(u||a===t))return i.replace(xi,"");if(!i||!(a=zn(a)))return i;var g=oi(i),S=rf(g,oi(a));return fr(g,S).join("")}function gM(i,a){var u=w,g=X;if(Gt(a)){var S="separator"in a?a.separator:S;u="length"in a?it(a.length):u,g="omission"in a?zn(a.omission):g}i=wt(i);var R=i.length;if(as(i)){var N=oi(i);R=N.length}if(u>=R)return i;var B=u-cs(g);if(B<1)return g;var G=N?fr(N,0,B).join(""):i.slice(0,B);if(S===t)return G+g;if(N&&(B+=G.length-B),$l(S)){if(i.slice(B).search(S)){var oe,ae=G;for(S.global||(S=dl(S.source,wt(L.exec(S))+"g")),S.lastIndex=0;oe=S.exec(ae);)var he=oe.index;G=G.slice(0,he===t?B:he)}}else if(i.indexOf(zn(S),B)!=B){var ye=G.lastIndexOf(S);ye>-1&&(G=G.slice(0,ye))}return G+g}function _M(i){return i=wt(i),i&&pt.test(i)?i.replace(ve,q_):i}var vM=ms(function(i,a,u){return i+(u?" ":"")+a.toUpperCase()}),eu=Kf("toUpperCase");function Yd(i,a,u){return i=wt(i),a=u?t:a,a===t?H_(i)?K_(i):I_(i):i.match(a)||[]}var jd=ht(function(i,a){try{return Bn(i,t,a)}catch(u){return Zl(u)?u:new $e(u)}}),xM=zi(function(i,a){return jn(a,function(u){u=Ei(u),Bi(i,u,jl(i[u],i))}),i});function yM(i){var a=i==null?0:i.length,u=He();return i=a?zt(i,function(g){if(typeof g[1]!="function")throw new Kn(c);return[u(g[0]),g[1]]}):[],ht(function(g){for(var S=-1;++S<a;){var R=i[S];if(Bn(R[0],this,g))return Bn(R[1],this,g)}})}function SM(i){return q0($n(i,p))}function tu(i){return function(){return i}}function MM(i,a){return i==null||i!==i?a:i}var EM=$f(),bM=$f(!0);function Un(i){return i}function nu(i){return wf(typeof i=="function"?i:$n(i,p))}function TM(i){return Cf($n(i,p))}function AM(i,a){return Lf(i,$n(a,p))}var wM=ht(function(i,a){return function(u){return To(u,i,a)}}),RM=ht(function(i,a){return function(u){return To(i,u,a)}});function iu(i,a,u){var g=on(a),S=Ca(a,g);u==null&&!(Gt(a)&&(S.length||!g.length))&&(u=a,a=i,i=this,S=Ca(a,on(a)));var R=!(Gt(u)&&"chain"in u)||!!u.chain,N=Gi(i);return jn(S,function(B){var G=a[B];i[B]=G,N&&(i.prototype[B]=function(){var oe=this.__chain__;if(R||oe){var ae=i(this.__wrapped__),he=ae.__actions__=Pn(this.__actions__);return he.push({func:G,args:arguments,thisArg:i}),ae.__chain__=oe,ae}return G.apply(i,or([this.value()],arguments))})}),i}function CM(){return hn._===this&&(hn._=t0),this}function ru(){}function LM(i){return i=it(i),ht(function(a){return Pf(a,i)})}var PM=Nl(zt),IM=Nl($h),DM=Nl(ol);function Kd(i){return Gl(i)?al(Ei(i)):lv(i)}function UM(i){return function(a){return i==null?t:Br(i,a)}}var NM=Qf(),OM=Qf(!0);function su(){return[]}function ou(){return!1}function FM(){return{}}function BM(){return""}function kM(){return!0}function zM(i,a){if(i=it(i),i<1||i>Q)return[];var u=Ae,g=_n(i,Ae);a=He(a),i-=Ae;for(var S=ul(g,a);++u<i;)a(u);return S}function HM(i){return et(i)?zt(i,Ei):Hn(i)?[i]:Pn(md(wt(i)))}function GM(i){var a=++Q_;return wt(i)+a}var VM=Na(function(i,a){return i+a},0),WM=Ol("ceil"),XM=Na(function(i,a){return i/a},1),qM=Ol("floor");function YM(i){return i&&i.length?Ra(i,Un,Sl):t}function jM(i,a){return i&&i.length?Ra(i,He(a,2),Sl):t}function KM(i){return ef(i,Un)}function ZM(i,a){return ef(i,He(a,2))}function $M(i){return i&&i.length?Ra(i,Un,Tl):t}function JM(i,a){return i&&i.length?Ra(i,He(a,2),Tl):t}var QM=Na(function(i,a){return i*a},1),eE=Ol("round"),tE=Na(function(i,a){return i-a},0);function nE(i){return i&&i.length?ll(i,Un):0}function iE(i,a){return i&&i.length?ll(i,He(a,2)):0}return A.after=Ty,A.ary=Ad,A.assign=fS,A.assignIn=zd,A.assignInWith=ja,A.assignWith=dS,A.at=pS,A.before=wd,A.bind=jl,A.bindAll=xM,A.bindKey=Rd,A.castArray=Fy,A.chain=Ed,A.chunk=qv,A.compact=Yv,A.concat=jv,A.cond=yM,A.conforms=SM,A.constant=tu,A.countBy=ny,A.create=mS,A.curry=Cd,A.curryRight=Ld,A.debounce=Pd,A.defaults=gS,A.defaultsDeep=_S,A.defer=Ay,A.delay=wy,A.difference=Kv,A.differenceBy=Zv,A.differenceWith=$v,A.drop=Jv,A.dropRight=Qv,A.dropRightWhile=ex,A.dropWhile=tx,A.fill=nx,A.filter=ry,A.flatMap=ay,A.flatMapDeep=cy,A.flatMapDepth=ly,A.flatten=xd,A.flattenDeep=ix,A.flattenDepth=rx,A.flip=Ry,A.flow=EM,A.flowRight=bM,A.fromPairs=sx,A.functions=bS,A.functionsIn=TS,A.groupBy=uy,A.initial=ax,A.intersection=cx,A.intersectionBy=lx,A.intersectionWith=ux,A.invert=wS,A.invertBy=RS,A.invokeMap=fy,A.iteratee=nu,A.keyBy=dy,A.keys=on,A.keysIn=Dn,A.map=Ga,A.mapKeys=LS,A.mapValues=PS,A.matches=TM,A.matchesProperty=AM,A.memoize=Wa,A.merge=IS,A.mergeWith=Hd,A.method=wM,A.methodOf=RM,A.mixin=iu,A.negate=Xa,A.nthArg=LM,A.omit=DS,A.omitBy=US,A.once=Cy,A.orderBy=py,A.over=PM,A.overArgs=Ly,A.overEvery=IM,A.overSome=DM,A.partial=Kl,A.partialRight=Id,A.partition=my,A.pick=NS,A.pickBy=Gd,A.property=Kd,A.propertyOf=UM,A.pull=px,A.pullAll=Sd,A.pullAllBy=mx,A.pullAllWith=gx,A.pullAt=_x,A.range=NM,A.rangeRight=OM,A.rearg=Py,A.reject=vy,A.remove=vx,A.rest=Iy,A.reverse=ql,A.sampleSize=yy,A.set=FS,A.setWith=BS,A.shuffle=Sy,A.slice=xx,A.sortBy=by,A.sortedUniq=Ax,A.sortedUniqBy=wx,A.split=aM,A.spread=Dy,A.tail=Rx,A.take=Cx,A.takeRight=Lx,A.takeRightWhile=Px,A.takeWhile=Ix,A.tap=Yx,A.throttle=Uy,A.thru=Ha,A.toArray=Fd,A.toPairs=Vd,A.toPairsIn=Wd,A.toPath=HM,A.toPlainObject=kd,A.transform=kS,A.unary=Ny,A.union=Dx,A.unionBy=Ux,A.unionWith=Nx,A.uniq=Ox,A.uniqBy=Fx,A.uniqWith=Bx,A.unset=zS,A.unzip=Yl,A.unzipWith=Md,A.update=HS,A.updateWith=GS,A.values=vs,A.valuesIn=VS,A.without=kx,A.words=Yd,A.wrap=Oy,A.xor=zx,A.xorBy=Hx,A.xorWith=Gx,A.zip=Vx,A.zipObject=Wx,A.zipObjectDeep=Xx,A.zipWith=qx,A.entries=Vd,A.entriesIn=Wd,A.extend=zd,A.extendWith=ja,iu(A,A),A.add=VM,A.attempt=jd,A.camelCase=YS,A.capitalize=Xd,A.ceil=WM,A.clamp=WS,A.clone=By,A.cloneDeep=zy,A.cloneDeepWith=Hy,A.cloneWith=ky,A.conformsTo=Gy,A.deburr=qd,A.defaultTo=MM,A.divide=XM,A.endsWith=jS,A.eq=ci,A.escape=KS,A.escapeRegExp=ZS,A.every=iy,A.find=sy,A.findIndex=_d,A.findKey=vS,A.findLast=oy,A.findLastIndex=vd,A.findLastKey=xS,A.floor=qM,A.forEach=bd,A.forEachRight=Td,A.forIn=yS,A.forInRight=SS,A.forOwn=MS,A.forOwnRight=ES,A.get=Jl,A.gt=Vy,A.gte=Wy,A.has=AS,A.hasIn=Ql,A.head=yd,A.identity=Un,A.includes=hy,A.indexOf=ox,A.inRange=XS,A.invoke=CS,A.isArguments=Hr,A.isArray=et,A.isArrayBuffer=Xy,A.isArrayLike=In,A.isArrayLikeObject=Yt,A.isBoolean=qy,A.isBuffer=dr,A.isDate=Yy,A.isElement=jy,A.isEmpty=Ky,A.isEqual=Zy,A.isEqualWith=$y,A.isError=Zl,A.isFinite=Jy,A.isFunction=Gi,A.isInteger=Dd,A.isLength=qa,A.isMap=Ud,A.isMatch=Qy,A.isMatchWith=eS,A.isNaN=tS,A.isNative=nS,A.isNil=rS,A.isNull=iS,A.isNumber=Nd,A.isObject=Gt,A.isObjectLike=Xt,A.isPlainObject=Po,A.isRegExp=$l,A.isSafeInteger=sS,A.isSet=Od,A.isString=Ya,A.isSymbol=Hn,A.isTypedArray=_s,A.isUndefined=oS,A.isWeakMap=aS,A.isWeakSet=cS,A.join=hx,A.kebabCase=$S,A.last=Qn,A.lastIndexOf=fx,A.lowerCase=JS,A.lowerFirst=QS,A.lt=lS,A.lte=uS,A.max=YM,A.maxBy=jM,A.mean=KM,A.meanBy=ZM,A.min=$M,A.minBy=JM,A.stubArray=su,A.stubFalse=ou,A.stubObject=FM,A.stubString=BM,A.stubTrue=kM,A.multiply=QM,A.nth=dx,A.noConflict=CM,A.noop=ru,A.now=Va,A.pad=eM,A.padEnd=tM,A.padStart=nM,A.parseInt=iM,A.random=qS,A.reduce=gy,A.reduceRight=_y,A.repeat=rM,A.replace=sM,A.result=OS,A.round=eE,A.runInContext=H,A.sample=xy,A.size=My,A.snakeCase=oM,A.some=Ey,A.sortedIndex=yx,A.sortedIndexBy=Sx,A.sortedIndexOf=Mx,A.sortedLastIndex=Ex,A.sortedLastIndexBy=bx,A.sortedLastIndexOf=Tx,A.startCase=cM,A.startsWith=lM,A.subtract=tE,A.sum=nE,A.sumBy=iE,A.template=uM,A.times=zM,A.toFinite=Vi,A.toInteger=it,A.toLength=Bd,A.toLower=hM,A.toNumber=ei,A.toSafeInteger=hS,A.toString=wt,A.toUpper=fM,A.trim=dM,A.trimEnd=pM,A.trimStart=mM,A.truncate=gM,A.unescape=_M,A.uniqueId=GM,A.upperCase=vM,A.upperFirst=eu,A.each=bd,A.eachRight=Td,A.first=yd,iu(A,function(){var i={};return Si(A,function(a,u){Ct.call(A.prototype,u)||(i[u]=a)}),i}(),{chain:!1}),A.VERSION=n,jn(["bind","bindKey","curry","curryRight","partial","partialRight"],function(i){A[i].placeholder=A}),jn(["drop","take"],function(i,a){gt.prototype[i]=function(u){u=u===t?1:Jt(it(u),0);var g=this.__filtered__&&!a?new gt(this):this.clone();return g.__filtered__?g.__takeCount__=_n(u,g.__takeCount__):g.__views__.push({size:_n(u,Ae),type:i+(g.__dir__<0?"Right":"")}),g},gt.prototype[i+"Right"]=function(u){return this.reverse()[i](u).reverse()}}),jn(["filter","map","takeWhile"],function(i,a){var u=a+1,g=u==te||u==ue;gt.prototype[i]=function(S){var R=this.clone();return R.__iteratees__.push({iteratee:He(S,3),type:u}),R.__filtered__=R.__filtered__||g,R}}),jn(["head","last"],function(i,a){var u="take"+(a?"Right":"");gt.prototype[i]=function(){return this[u](1).value()[0]}}),jn(["initial","tail"],function(i,a){var u="drop"+(a?"":"Right");gt.prototype[i]=function(){return this.__filtered__?new gt(this):this[u](1)}}),gt.prototype.compact=function(){return this.filter(Un)},gt.prototype.find=function(i){return this.filter(i).head()},gt.prototype.findLast=function(i){return this.reverse().find(i)},gt.prototype.invokeMap=ht(function(i,a){return typeof i=="function"?new gt(this):this.map(function(u){return To(u,i,a)})}),gt.prototype.reject=function(i){return this.filter(Xa(He(i)))},gt.prototype.slice=function(i,a){i=it(i);var u=this;return u.__filtered__&&(i>0||a<0)?new gt(u):(i<0?u=u.takeRight(-i):i&&(u=u.drop(i)),a!==t&&(a=it(a),u=a<0?u.dropRight(-a):u.take(a-i)),u)},gt.prototype.takeRightWhile=function(i){return this.reverse().takeWhile(i).reverse()},gt.prototype.toArray=function(){return this.take(Ae)},Si(gt.prototype,function(i,a){var u=/^(?:filter|find|map|reject)|While$/.test(a),g=/^(?:head|last)$/.test(a),S=A[g?"take"+(a=="last"?"Right":""):a],R=g||/^find/.test(a);S&&(A.prototype[a]=function(){var N=this.__wrapped__,B=g?[1]:arguments,G=N instanceof gt,oe=B[0],ae=G||et(N),he=function(mt){var yt=S.apply(A,or([mt],B));return g&&ye?yt[0]:yt};ae&&u&&typeof oe=="function"&&oe.length!=1&&(G=ae=!1);var ye=this.__chain__,Ie=!!this.__actions__.length,Ve=R&&!ye,st=G&&!Ie;if(!R&&ae){N=st?N:new gt(this);var We=i.apply(N,B);return We.__actions__.push({func:Ha,args:[he],thisArg:t}),new Zn(We,ye)}return Ve&&st?i.apply(this,B):(We=this.thru(he),Ve?g?We.value()[0]:We.value():We)})}),jn(["pop","push","shift","sort","splice","unshift"],function(i){var a=da[i],u=/^(?:push|sort|unshift)$/.test(i)?"tap":"thru",g=/^(?:pop|shift)$/.test(i);A.prototype[i]=function(){var S=arguments;if(g&&!this.__chain__){var R=this.value();return a.apply(et(R)?R:[],S)}return this[u](function(N){return a.apply(et(N)?N:[],S)})}}),Si(gt.prototype,function(i,a){var u=A[a];if(u){var g=u.name+"";Ct.call(fs,g)||(fs[g]=[]),fs[g].push({name:a,func:u})}}),fs[Ua(t,_).name]=[{name:"wrapper",func:t}],gt.prototype.clone=_0,gt.prototype.reverse=v0,gt.prototype.value=x0,A.prototype.at=jx,A.prototype.chain=Kx,A.prototype.commit=Zx,A.prototype.next=$x,A.prototype.plant=Qx,A.prototype.reverse=ey,A.prototype.toJSON=A.prototype.valueOf=A.prototype.value=ty,A.prototype.first=A.prototype.head,vo&&(A.prototype[vo]=Jx),A},ls=Z_();Dr?((Dr.exports=ls)._=ls,nl._=ls):hn._=ls}).call(CC)}(qo,qo.exports)),qo.exports}var PC=LC();class Wu{constructor(e,t){this._path=e,this._ctor=t,this._promise=null,this._instance=null}async get(){return this._instance?Promise.resolve(this._instance):this._promise?this._promise:(this._promise=(async()=>{const t=(await import(this._path))[this._ctor];if(!t)throw new Error(`DIVE: Module class ${this._ctor} not found in ${this._path}`);if(typeof t!="function")throw new Error(`DIVE: Module at ${this._path} does not export a valid constructor (${this._ctor} wanted)`);return this._instance=new t,this._instance})(),this._promise)}}const Xs=class Xs{constructor(e,t,n,r){this._mediaGenerator=new Wu("../mediacreator/MediaCreator.ts","DIVEMediaCreator"),this._io=new Wu("../io/IO.ts","DIVEIO"),this._ar=new Wu("../ar/AR.ts","DIVEAR"),this.registered=new Map,this.listeners=new Map,this._id=TC(),this.renderer=e,this.scene=t,this.controller=n,this.toolbox=r,Xs.__instances.push(this)}static get(e){const t=this.__instances.find(n=>n.id===e);return t||this.__instances.find(n=>Array.from(n.registered.values()).find(r=>r.id===e))}get id(){return this._id}DestroyInstance(){const e=Xs.__instances.findIndex(t=>t.id===this.id);return e===-1?!1:(Xs.__instances.splice(e,1),!0)}PerformAction(e,t){let n=!1;switch(e){case"GET_ALL_SCENE_DATA":{n=this.getAllSceneData(t);break}case"GET_ALL_OBJECTS":{n=this.getAllObjects(t);break}case"GET_OBJECTS":{n=this.getObjects(t);break}case"ADD_OBJECT":{n=this.addObject(t);break}case"UPDATE_OBJECT":{n=this.updateObject(t);break}case"DELETE_OBJECT":{n=this.deleteObject(t);break}case"SELECT_OBJECT":{n=this.selectObject(t);break}case"DESELECT_OBJECT":{n=this.deselectObject(t);break}case"SET_BACKGROUND":{n=this.setBackground(t);break}case"DROP_IT":{n=this.dropIt(t);break}case"PLACE_ON_FLOOR":{n=this.placeOnFloor(t);break}case"SET_CAMERA_TRANSFORM":{n=this.setCameraTransform(t);break}case"GET_CAMERA_TRANSFORM":{n=this.getCameraTransform(t);break}case"MOVE_CAMERA":{n=this.moveCamera(t);break}case"RESET_CAMERA":{n=this.resetCamera(t);break}case"COMPUTE_ENCOMPASSING_VIEW":{n=this.computeEncompassingView(t);break}case"SET_CAMERA_LAYER":{n=this.setCameraLayer(t);break}case"ZOOM_CAMERA":{n=this.zoomCamera(t);break}case"SET_GIZMO_MODE":{n=this.setGizmoMode(t);break}case"SET_GIZMO_VISIBILITY":{n=this.setGizmoVisibility(t);break}case"SET_GIZMO_SCALE_LINKED":{n=this.setGizmoScaleLinked(t);break}case"USE_TOOL":{n=this.useTool(t);break}case"MODEL_LOADED":{n=this.modelLoaded(t);break}case"UPDATE_SCENE":{n=this.updateScene(t);break}case"GENERATE_MEDIA":{n=this.generateMedia(t);break}case"SET_PARENT":{n=this.setParent(t);break}case"EXPORT_SCENE":{n=this.exportScene(t);break}case"LAUNCH_AR":{n=new Promise((r,o)=>{this._ar.get().then(c=>{r(c.Launch(t))}).catch(o)});break}default:console.warn(`DIVECommunication.PerformAction: has been executed with unknown Action type ${e}`)}return this.dispatch(e,t),n}Subscribe(e,t){return this.listeners.get(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),()=>{const n=this.listeners.get(e);if(!n)return!1;const r=n.findIndex(o=>o===t);return r===-1?!1:(n.splice(r,1),!0)}}dispatch(e,t){const n=this.listeners.get(e);n&&n.forEach(r=>r(t))}getAllSceneData(e){const t={name:this.scene.name,mediaItem:null,backgroundColor:"#"+this.scene.background.getHexString(),floorEnabled:this.scene.Floor.visible,floorColor:"#"+this.scene.Floor.material.color.getHexString(),userCamera:{position:this.controller.object.position.clone(),target:this.controller.target.clone()},spotmarks:[],lights:Array.from(this.registered.values()).filter(n=>n.entityType==="light"),objects:Array.from(this.registered.values()).filter(n=>n.entityType==="model"),cameras:Array.from(this.registered.values()).filter(n=>n.entityType==="pov"),primitives:Array.from(this.registered.values()).filter(n=>n.entityType==="primitive"),groups:Array.from(this.registered.values()).filter(n=>n.entityType==="group")};return Object.assign(e,t),t}getAllObjects(e){return Object.assign(e,this.registered),this.registered}getObjects(e){if(e.ids.length===0)return[];const t=[];return this.registered.forEach(n=>{e.ids.includes(n.id)&&t.push(n)}),t}addObject(e){return this.registered.get(e.id)?!1:(e.parentId===void 0&&(e.parentId=null),this.registered.set(e.id,e),this.scene.AddSceneObject(e),!0)}updateObject(e){const t=this.registered.get(e.id);if(!t)return!1;this.registered.set(e.id,PC.merge(t,e));const n=this.registered.get(e.id);return this.scene.UpdateSceneObject({...e,id:n.id,entityType:n.entityType}),Object.assign(e,n),!0}deleteObject(e){const t=this.registered.get(e.id);return t?(t.parentId&&this.setParent({object:{id:t.id},parent:null}),t.entityType==="group"&&this.registered.forEach(n=>{n.parentId===t.id&&this.updateObject({id:n.id,parentId:null})}),Object.assign(e,t),this.registered.delete(e.id),Array.from(this.registered.values()).forEach(n=>{n.parentId&&n.parentId===e.id&&(n.parentId=null)}),this.scene.DeleteSceneObject(t),!0):!1}selectObject(e){const t=this.registered.get(e.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n||!("isSelectable"in n))return!1;const r=this.toolbox.GetActiveTool();return r&&Xm(r)&&r.AttachGizmo(n),Object.assign(e,t),!0}deselectObject(e){const t=this.registered.get(e.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n||!("isSelectable"in n))return!1;const r=this.toolbox.GetActiveTool();return r&&Xm(r)&&r.DetachGizmo(),Object.assign(e,t),!0}setBackground(e){return this.scene.SetBackground(e.color),!0}dropIt(e){const t=this.registered.get(e.id);return t?(this.scene.GetSceneObject(t).DropIt(),!0):!1}placeOnFloor(e){const t=this.registered.get(e.id);return t?(this.scene.PlaceOnFloor(t),!0):!1}setCameraTransform(e){return this.controller.object.position.copy(e.position),this.controller.target.copy(e.target),this.controller.update(),!0}getCameraTransform(e){const t={position:this.controller.object.position.clone(),target:this.controller.target.clone()};return Object.assign(e,t),t}moveCamera(e){let t={x:0,y:0,z:0},n={x:0,y:0,z:0};return"id"in e?(t=this.registered.get(e.id).position,n=this.registered.get(e.id).target):(t=e.position,n=e.target),this.controller.MoveTo(t,n,e.duration,e.locked),!0}setCameraLayer(e){return this.controller.object.SetCameraLayer(e.layer),!0}resetCamera(e){return this.controller.RevertLast(e.duration),!0}computeEncompassingView(e){const t=this.scene.ComputeSceneBB(),n=this.controller.ComputeEncompassingView(t);return Object.assign(e,n),n}zoomCamera(e){return e.direction==="IN"&&this.controller.ZoomIn(e.by),e.direction==="OUT"&&this.controller.ZoomOut(e.by),!0}setGizmoMode(e){return this.toolbox.SetGizmoMode(e.mode),!0}setGizmoVisibility(e){return this.toolbox.SetGizmoVisibility(e),e}setGizmoScaleLinked(e){return this.toolbox.SetGizmoScaleLinked(e),e}useTool(e){return this.toolbox.UseTool(e.tool),!0}modelLoaded(e){return this.registered.get(e.id).loaded=!0,!0}updateScene(e){return e.name!==void 0&&(this.scene.name=e.name),e.backgroundColor!==void 0&&this.scene.SetBackground(e.backgroundColor),e.gridEnabled!==void 0&&this.scene.Grid.SetVisibility(e.gridEnabled),e.floorEnabled!==void 0&&this.scene.Floor.SetVisibility(e.floorEnabled),e.floorColor!==void 0&&this.scene.Floor.SetColor(e.floorColor),e.name=this.scene.name,e.backgroundColor="#"+this.scene.background.getHexString(),e.gridEnabled=this.scene.Grid.visible,e.floorEnabled=this.scene.Floor.visible,e.floorColor="#"+this.scene.Floor.material.color.getHexString(),!0}generateMedia(e){let t={x:0,y:0,z:0},n={x:0,y:0,z:0};return"id"in e?(t=this.registered.get(e.id).position,n=this.registered.get(e.id).target):(t=e.position,n=e.target),this._mediaGenerator.get().then(r=>r.GenerateMedia(t,n,e.width,e.height))}setParent(e){const t=this.registered.get(e.object.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n)return!1;if(e.parent===null)return this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0;if(e.object.id===e.parent.id)return!1;const r=this.registered.get(e.parent.id);if(!r)return this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0;const o=this.scene.GetSceneObject(r);return o?(o.attach(n),this.updateObject({id:t.id,parentId:r.id}),!0):(this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0)}exportScene(e){return new Promise((t,n)=>{this._io.get().then(r=>{t(r.Export(e.type))}).catch(n)})}};Xs.__instances=[];let On=Xs;class IC extends Mt{constructor(){super(),this.isDIVELight=!0,this.isDIVEPointLight=!0,this.isMovable=!0,this.isSelectable=!0,this.gizmo=null,this.name="DIVEPointLight",this.light=new qg(16777215,1),this.light.layers.mask=ri,this.light.castShadow=!0,this.light.shadow.mapSize.width=512,this.light.shadow.mapSize.height=512,this.add(this.light);const e=.1,t=new Yc(e,e*320,e*320),n=new Tr({color:this.light.color,transparent:!0,opacity:.8,side:wi});this.mesh=new pn(t,n),this.mesh.layers.mask=jg,this.add(this.mesh)}SetColor(e){this.light.color=e,this.mesh.material.color=e}SetIntensity(e){this.light.intensity=e,this.mesh.material.opacity=e>.8?.8:e*.8}SetEnabled(e){this.light.visible=e}onMove(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.position})}onSelect(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("SELECT_OBJECT",{id:this.userData.id})}onDeselect(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("DESELECT_OBJECT",{id:this.userData.id})}}class DC extends Mt{constructor(){super(),this.isDIVELight=!0,this.isDIVESceneLight=!0,this.name="DIVESceneLight",this._hemiLight=new iC(16777215,16777215,2),this._hemiLight.layers.mask=ri,this._hemiLight.position.set(0,50,0),this.add(this._hemiLight),this._dirLight=new Rh(16777215,3),this._dirLight.layers.mask=ri,this._dirLight.position.set(1,1.75,1),this._dirLight.position.multiplyScalar(30),this._dirLight.castShadow=!0,this._dirLight.shadow.mapSize.width=2048,this._dirLight.shadow.mapSize.height=2048;const e=5;this._dirLight.shadow.camera.left=-5,this._dirLight.shadow.camera.right=e,this._dirLight.shadow.camera.top=e,this._dirLight.shadow.camera.bottom=-5,this._dirLight.shadow.camera.far=3500,this.add(this._dirLight)}SetColor(e){this._hemiLight.color=e,this._dirLight.color=e}SetIntensity(e){this._hemiLight.intensity=e*2,this._dirLight.intensity=e*3}SetEnabled(e){this._hemiLight.visible=e,this._dirLight.visible=e}}const Ph=s=>s.parent?Ph(s.parent):s;class Ih extends Mt{constructor(){super(),this.isDIVENode=!0,this.isSelectable=!0,this.isMovable=!0,this.gizmo=null,this.layers.mask=ri,this._positionWorldBuffer=new F,this._boundingBox=new _i}SetPosition(e){if(!this.parent){this.position.set(e.x,e.y,e.z);return}const t=new F(e.x,e.y,e.z);this.position.copy(this.parent.worldToLocal(t)),"isDIVEGroup"in this.parent&&this.parent.UpdateLineTo(this)}SetRotation(e){this.rotation.set(e.x,e.y,e.z)}SetScale(e){this.scale.set(e.x,e.y,e.z)}SetVisibility(e){this.visible=e}SetToWorldOrigin(){var e;this.position.set(0,0,0),(e=On.get(this.userData.id))==null||e.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})}onMove(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})}onSelect(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("SELECT_OBJECT",{id:this.userData.id})}onDeselect(){var e;(e=On.get(this.userData.id))==null||e.PerformAction("DESELECT_OBJECT",{id:this.userData.id})}}class UC extends Ih{constructor(){super(...arguments),this.isDIVEModel=!0,this._mesh=null,this._material=null}SetModel(e){this.clear(),this._boundingBox.makeEmpty(),e.scene.traverse(t=>{t.castShadow=!0,t.receiveShadow=!0,t.layers.mask=this.layers.mask,this._boundingBox.expandByObject(t),!this._mesh&&"isMesh"in t&&(this._mesh=t,this._material?this._mesh.material=this._material:this._material=t.material)}),this.add(e.scene)}SetMaterial(e){this._material||(this._material=new co),e.vertexColors!==void 0&&(this._material.vertexColors=e.vertexColors),e.color!==void 0&&this._material.color.set(e.color),e.map!==void 0&&(this._material.map=e.map),e.normalMap!==void 0&&(this._material.normalMap=e.normalMap),e.roughness!==void 0&&(this._material.roughness=e.roughness),e.roughnessMap!==void 0&&(this._material.roughnessMap=e.roughnessMap,this._material.roughnessMap&&(this._material.roughness=1)),e.metalness!==void 0&&(this._material.metalness=e.metalness),e.metalnessMap!==void 0&&(this._material.metalnessMap=e.metalnessMap,this._material.metalnessMap&&(this._material.metalness=1)),this._mesh&&(this._mesh.material=this._material)}PlaceOnFloor(){var r,o,c,l,h;const e=this.getWorldPosition(this._positionWorldBuffer),t=e.clone();(o=(r=this._mesh)==null?void 0:r.geometry)==null||o.computeBoundingBox();const n=(l=(c=this._mesh)==null?void 0:c.geometry)==null?void 0:l.boundingBox;!n||!this._mesh||(e.y=e.y-this._mesh.localToWorld(n.min.clone()).y,e.y!==t.y&&((h=On.get(this.userData.id))==null||h.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale})))}DropIt(){if(!this.parent){console.warn("DIVEModel: DropIt() called on a model that is not in the scene.",this);return}const e=this._boundingBox.min.y*this.scale.y,t=this.localToWorld(this._boundingBox.getCenter(new F).multiply(this.scale));t.y=e+this.position.y;const n=new Yg(t,new F(0,-1,0));n.layers.mask=ri;const r=n.intersectObjects(Ph(this).Root.children,!0);if(r.length>0){const o=r[0].object;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox,l=o.localToWorld(c.max.clone()),h=this.position.clone(),f=this.position.clone().setY(l.y).sub(new F(0,e,0));if(this.position.copy(f),this.position.y===h.y)return;this.onMove()}}}const Xu=new WeakMap;class NC extends is{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,r){const o=new Bc(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,c=>{this.parse(c,t,r)},n,r)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,cn).catch(n)}decodeDracoFile(e,t,n,r,o=ln,c=()=>{}){const l={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:o};return this.decodeGeometry(e,l).then(t).catch(c)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Xu.has(e)){const h=Xu.get(e);if(h.key===n)return h.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r;const o=this.workerNextTaskID++,c=e.byteLength,l=this._getWorker(o,c).then(h=>(r=h,new Promise((f,d)=>{r._callbacks[o]={resolve:f,reject:d},r.postMessage({type:"decode",id:o,taskConfig:t,buffer:e},[e])}))).then(h=>this._createGeometry(h.geometry));return l.catch(()=>!0).then(()=>{r&&o&&this._releaseTask(r,o)}),Xu.set(e,{key:n,promise:l}),l}_createGeometry(e){const t=new un;e.index&&t.setIndex(new en(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const r=e.attributes[n],o=r.name,c=r.array,l=r.itemSize,h=new en(c,l);o==="color"&&(this._assignVertexColorSpace(h,r.vertexColorSpace),h.normalized=!(c instanceof Float32Array)),t.setAttribute(o,h)}return t}_assignVertexColorSpace(e,t){if(t!==cn)return;const n=new Ue;for(let r=0,o=e.count;r<o;r++)n.fromBufferAttribute(e,r).convertSRGBToLinear(),e.setXYZ(r,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new Bc(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((r,o)=>{n.load(e,r,void 0,o)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const r=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const o=OC.toString(),c=["/* draco decoder */",r,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([c]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(o){const c=o.data;switch(c.type){case"decode":r._callbacks[c.id].resolve(c);break;case"error":r._callbacks[c.id].reject(c);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+c.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,o){return r._taskLoad>o._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function OC(){let s,e;onmessage=function(c){const l=c.data;switch(l.type){case"init":s=l.decoderConfig,e=new Promise(function(d){s.onModuleLoaded=function(p){d({draco:p})},DracoDecoderModule(s)});break;case"decode":const h=l.buffer,f=l.taskConfig;e.then(d=>{const p=d.draco,m=new p.Decoder;try{const v=t(p,m,new Int8Array(h),f),M=v.attributes.map(E=>E.array.buffer);v.index&&M.push(v.index.array.buffer),self.postMessage({type:"decode",id:l.id,geometry:v},M)}catch(v){console.error(v),self.postMessage({type:"error",id:l.id,error:v.message})}finally{p.destroy(m)}});break}};function t(c,l,h,f){const d=f.attributeIDs,p=f.attributeTypes;let m,v;const M=l.GetEncodedGeometryType(h);if(M===c.TRIANGULAR_MESH)m=new c.Mesh,v=l.DecodeArrayToMesh(h,h.byteLength,m);else if(M===c.POINT_CLOUD)m=new c.PointCloud,v=l.DecodeArrayToPointCloud(h,h.byteLength,m);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!v.ok()||m.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+v.error_msg());const E={index:null,attributes:[]};for(const x in d){const _=self[p[x]];let P,b;if(f.useUniqueIDs)b=d[x],P=l.GetAttributeByUniqueId(m,b);else{if(b=l.GetAttributeId(m,c[d[x]]),b===-1)continue;P=l.GetAttribute(m,b)}const I=r(c,l,m,x,_,P);x==="color"&&(I.vertexColorSpace=f.vertexColorSpace),E.attributes.push(I)}return M===c.TRIANGULAR_MESH&&(E.index=n(c,l,m)),c.destroy(m),E}function n(c,l,h){const d=h.num_faces()*3,p=d*4,m=c._malloc(p);l.GetTrianglesUInt32Array(h,p,m);const v=new Uint32Array(c.HEAPF32.buffer,m,d).slice();return c._free(m),{array:v,itemSize:1}}function r(c,l,h,f,d,p){const m=p.num_components(),M=h.num_points()*m,E=M*d.BYTES_PER_ELEMENT,x=o(c,d),_=c._malloc(E);l.GetAttributeDataArrayForAllPoints(h,p,x,E,_);const P=new d(c.HEAPF32.buffer,_,M).slice();return c._free(_),{name:f,array:P,itemSize:m}}function o(c,l){switch(l){case Float32Array:return c.DT_FLOAT32;case Int8Array:return c.DT_INT8;case Int16Array:return c.DT_INT16;case Int32Array:return c.DT_INT32;case Uint8Array:return c.DT_UINT8;case Uint16Array:return c.DT_UINT16;case Uint32Array:return c.DT_UINT32}}}function Ym(s,e){if(e===$E)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===th||e===_g){let t=s.getIndex();if(t===null){const c=[],l=s.getAttribute("position");if(l!==void 0){for(let h=0;h<l.count;h++)c.push(h);s.setIndex(c),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,r=[];if(e===th)for(let c=1;c<=n;c++)r.push(t.getX(0)),r.push(t.getX(c)),r.push(t.getX(c+1));else for(let c=0;c<n;c++)c%2===0?(r.push(t.getX(c)),r.push(t.getX(c+1)),r.push(t.getX(c+2))):(r.push(t.getX(c+2)),r.push(t.getX(c+1)),r.push(t.getX(c)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const o=s.clone();return o.setIndex(r),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class FC extends is{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new GC(t)}),this.register(function(t){return new $C(t)}),this.register(function(t){return new JC(t)}),this.register(function(t){return new QC(t)}),this.register(function(t){return new WC(t)}),this.register(function(t){return new XC(t)}),this.register(function(t){return new qC(t)}),this.register(function(t){return new YC(t)}),this.register(function(t){return new HC(t)}),this.register(function(t){return new jC(t)}),this.register(function(t){return new VC(t)}),this.register(function(t){return new ZC(t)}),this.register(function(t){return new KC(t)}),this.register(function(t){return new kC(t)}),this.register(function(t){return new eL(t)}),this.register(function(t){return new tL(t)})}load(e,t,n,r){const o=this;let c;if(this.resourcePath!=="")c=this.resourcePath;else if(this.path!==""){const f=$o.extractUrlBase(e);c=$o.resolveURL(f,this.path)}else c=$o.extractUrlBase(e);this.manager.itemStart(e);const l=function(f){r?r(f):console.error(f),o.manager.itemError(e),o.manager.itemEnd(e)},h=new Bc(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(e,function(f){try{o.parse(f,c,function(d){t(d),o.manager.itemEnd(e)},l)}catch(d){l(d)}},n,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let o;const c={},l={},h=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(h.decode(new Uint8Array(e,0,4))===Qg){try{c[_t.KHR_BINARY_GLTF]=new nL(e)}catch(p){r&&r(p);return}o=JSON.parse(c[_t.KHR_BINARY_GLTF].content)}else o=JSON.parse(h.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const f=new mL(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});f.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const p=this.pluginCallbacks[d](f);p.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[p.name]=p,c[p.name]=!0}if(o.extensionsUsed)for(let d=0;d<o.extensionsUsed.length;++d){const p=o.extensionsUsed[d],m=o.extensionsRequired||[];switch(p){case _t.KHR_MATERIALS_UNLIT:c[p]=new zC;break;case _t.KHR_DRACO_MESH_COMPRESSION:c[p]=new iL(o,this.dracoLoader);break;case _t.KHR_TEXTURE_TRANSFORM:c[p]=new rL;break;case _t.KHR_MESH_QUANTIZATION:c[p]=new sL;break;default:m.indexOf(p)>=0&&l[p]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+p+'".')}}f.setExtensions(c),f.setPlugins(l),f.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,o){n.parse(e,t,r,o)})}}function BC(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const _t={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class kC{constructor(e){this.parser=e,this.name=_t.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const o=t.json,h=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e];let f;const d=new Ue(16777215);h.color!==void 0&&d.setRGB(h.color[0],h.color[1],h.color[2],ln);const p=h.range!==void 0?h.range:0;switch(h.type){case"directional":f=new Rh(d),f.target.position.set(0,0,-1),f.add(f.target);break;case"point":f=new qg(d),f.distance=p;break;case"spot":f=new sC(d),f.distance=p,h.spot=h.spot||{},h.spot.innerConeAngle=h.spot.innerConeAngle!==void 0?h.spot.innerConeAngle:0,h.spot.outerConeAngle=h.spot.outerConeAngle!==void 0?h.spot.outerConeAngle:Math.PI/4,f.angle=h.spot.outerConeAngle,f.penumbra=1-h.spot.innerConeAngle/h.spot.outerConeAngle,f.target.position.set(0,0,-1),f.add(f.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+h.type)}return f.position.set(0,0,0),f.decay=2,Mr(f,h),h.intensity!==void 0&&(f.intensity=h.intensity),f.name=t.createUniqueName(h.name||"light_"+e),r=Promise.resolve(f),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,o=n.json.nodes[e],l=(o.extensions&&o.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(h){return n._getNodeRef(t.cache,l,h)})}}class zC{constructor(){this.name=_t.KHR_MATERIALS_UNLIT}getMaterialType(){return Tr}extendParams(e,t,n){const r=[];e.color=new Ue(1,1,1),e.opacity=1;const o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){const c=o.baseColorFactor;e.color.setRGB(c[0],c[1],c[2],ln),e.opacity=c[3]}o.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",o.baseColorTexture,cn))}return Promise.all(r)}}class HC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=r.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}}class GC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];if(c.clearcoatFactor!==void 0&&(t.clearcoat=c.clearcoatFactor),c.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",c.clearcoatTexture)),c.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=c.clearcoatRoughnessFactor),c.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",c.clearcoatRoughnessTexture)),c.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",c.clearcoatNormalTexture)),c.clearcoatNormalTexture.scale!==void 0)){const l=c.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Oe(l,l)}return Promise.all(o)}}class VC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.iridescenceFactor!==void 0&&(t.iridescence=c.iridescenceFactor),c.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",c.iridescenceTexture)),c.iridescenceIor!==void 0&&(t.iridescenceIOR=c.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),c.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=c.iridescenceThicknessMinimum),c.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=c.iridescenceThicknessMaximum),c.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",c.iridescenceThicknessTexture)),Promise.all(o)}}class WC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[];t.sheenColor=new Ue(0,0,0),t.sheenRoughness=0,t.sheen=1;const c=r.extensions[this.name];if(c.sheenColorFactor!==void 0){const l=c.sheenColorFactor;t.sheenColor.setRGB(l[0],l[1],l[2],ln)}return c.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=c.sheenRoughnessFactor),c.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",c.sheenColorTexture,cn)),c.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",c.sheenRoughnessTexture)),Promise.all(o)}}class XC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.transmissionFactor!==void 0&&(t.transmission=c.transmissionFactor),c.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",c.transmissionTexture)),Promise.all(o)}}class qC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];t.thickness=c.thicknessFactor!==void 0?c.thicknessFactor:0,c.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",c.thicknessTexture)),t.attenuationDistance=c.attenuationDistance||1/0;const l=c.attenuationColor||[1,1,1];return t.attenuationColor=new Ue().setRGB(l[0],l[1],l[2],ln),Promise.all(o)}}class YC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=r.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}}class jC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];t.specularIntensity=c.specularFactor!==void 0?c.specularFactor:1,c.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",c.specularTexture));const l=c.specularColorFactor||[1,1,1];return t.specularColor=new Ue().setRGB(l[0],l[1],l[2],ln),c.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",c.specularColorTexture,cn)),Promise.all(o)}}class KC{constructor(e){this.parser=e,this.name=_t.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return t.bumpScale=c.bumpFactor!==void 0?c.bumpFactor:1,c.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",c.bumpTexture)),Promise.all(o)}}class ZC{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:nr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.anisotropyStrength!==void 0&&(t.anisotropy=c.anisotropyStrength),c.anisotropyRotation!==void 0&&(t.anisotropyRotation=c.anisotropyRotation),c.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",c.anisotropyTexture)),Promise.all(o)}}class $C{constructor(e){this.parser=e,this.name=_t.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const o=r.extensions[this.name],c=t.options.ktx2Loader;if(!c){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,c)}}class JC{constructor(e){this.parser=e,this.name=_t.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;const c=o.extensions[t],l=r.images[c.source];let h=n.textureLoader;if(l.uri){const f=n.options.manager.getHandler(l.uri);f!==null&&(h=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,c.source,h);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class QC{constructor(e){this.parser=e,this.name=_t.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;const c=o.extensions[t],l=r.images[c.source];let h=n.textureLoader;if(l.uri){const f=n.options.manager.getHandler(l.uri);f!==null&&(h=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,c.source,h);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class eL{constructor(e){this.name=_t.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],o=this.parser.getDependency("buffer",r.buffer),c=this.parser.options.meshoptDecoder;if(!c||!c.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(l){const h=r.byteOffset||0,f=r.byteLength||0,d=r.count,p=r.byteStride,m=new Uint8Array(l,h,f);return c.decodeGltfBufferAsync?c.decodeGltfBufferAsync(d,p,m,r.mode,r.filter).then(function(v){return v.buffer}):c.ready.then(function(){const v=new ArrayBuffer(d*p);return c.decodeGltfBuffer(new Uint8Array(v),d,p,m,r.mode,r.filter),v})})}else return null}}class tL{constructor(e){this.name=_t.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const f of r.primitives)if(f.mode!==ni.TRIANGLES&&f.mode!==ni.TRIANGLE_STRIP&&f.mode!==ni.TRIANGLE_FAN&&f.mode!==void 0)return null;const c=n.extensions[this.name].attributes,l=[],h={};for(const f in c)l.push(this.parser.getDependency("accessor",c[f]).then(d=>(h[f]=d,h[f])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(f=>{const d=f.pop(),p=d.isGroup?d.children:[d],m=f[0].count,v=[];for(const M of p){const E=new tt,x=new F,_=new Ci,P=new F(1,1,1),b=new B1(M.geometry,M.material,m);for(let I=0;I<m;I++)h.TRANSLATION&&x.fromBufferAttribute(h.TRANSLATION,I),h.ROTATION&&_.fromBufferAttribute(h.ROTATION,I),h.SCALE&&P.fromBufferAttribute(h.SCALE,I),b.setMatrixAt(I,E.compose(x,_,P));for(const I in h)if(I==="_COLOR_0"){const z=h[I];b.instanceColor=new rh(z.array,z.itemSize,z.normalized)}else I!=="TRANSLATION"&&I!=="ROTATION"&&I!=="SCALE"&&M.geometry.setAttribute(I,h[I]);Mt.prototype.copy.call(b,M),this.parser.assignFinalMaterial(b),v.push(b)}return d.isGroup?(d.clear(),d.add(...v),d):v[0]}))}}const Qg="glTF",Vo=12,jm={JSON:1313821514,BIN:5130562};class nL{constructor(e){this.name=_t.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Vo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Qg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-Vo,o=new DataView(e,Vo);let c=0;for(;c<r;){const l=o.getUint32(c,!0);c+=4;const h=o.getUint32(c,!0);if(c+=4,h===jm.JSON){const f=new Uint8Array(e,Vo+c,l);this.content=n.decode(f)}else if(h===jm.BIN){const f=Vo+c;this.body=e.slice(f,f+l)}c+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class iL{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=_t.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,o=e.extensions[this.name].bufferView,c=e.extensions[this.name].attributes,l={},h={},f={};for(const d in c){const p=ah[d]||d.toLowerCase();l[p]=c[d]}for(const d in e.attributes){const p=ah[d]||d.toLowerCase();if(c[d]!==void 0){const m=n.accessors[e.attributes[d]],v=Ks[m.componentType];f[p]=v.name,h[p]=m.normalized===!0}}return t.getDependency("bufferView",o).then(function(d){return new Promise(function(p,m){r.decodeDracoFile(d,function(v){for(const M in v.attributes){const E=v.attributes[M],x=h[M];x!==void 0&&(E.normalized=x)}p(v)},l,f,ln,m)})})}}class rL{constructor(){this.name=_t.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class sL{constructor(){this.name=_t.KHR_MESH_QUANTIZATION}}class e_ extends sa{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r*3+r;for(let c=0;c!==r;c++)t[c]=n[o+c];return t}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=l*2,f=l*3,d=r-t,p=(n-t)/d,m=p*p,v=m*p,M=e*f,E=M-f,x=-2*v+3*m,_=v-m,P=1-x,b=_-m+p;for(let I=0;I!==l;I++){const z=c[E+I+l],O=c[E+I+h]*d,D=c[M+I+l],V=c[M+I]*d;o[I]=P*z+b*O+x*D+_*V}return o}}const oL=new Ci;class aL extends e_{interpolate_(e,t,n,r){const o=super.interpolate_(e,t,n,r);return oL.fromArray(o).normalize().toArray(o),o}}const ni={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ks={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Km={9728:Ln,9729:Nn,9984:ag,9985:Rc,9986:Wo,9987:Ji},Zm={33071:br,33648:Ic,10497:Js},qu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ah={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},yr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},cL={CUBICSPLINE:void 0,LINEAR:eo,STEP:ea},Yu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function lL(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new co({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:wi})),s.DefaultMaterial}function jr(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Mr(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function uL(s,e,t){let n=!1,r=!1,o=!1;for(let f=0,d=e.length;f<d;f++){const p=e[f];if(p.POSITION!==void 0&&(n=!0),p.NORMAL!==void 0&&(r=!0),p.COLOR_0!==void 0&&(o=!0),n&&r&&o)break}if(!n&&!r&&!o)return Promise.resolve(s);const c=[],l=[],h=[];for(let f=0,d=e.length;f<d;f++){const p=e[f];if(n){const m=p.POSITION!==void 0?t.getDependency("accessor",p.POSITION):s.attributes.position;c.push(m)}if(r){const m=p.NORMAL!==void 0?t.getDependency("accessor",p.NORMAL):s.attributes.normal;l.push(m)}if(o){const m=p.COLOR_0!==void 0?t.getDependency("accessor",p.COLOR_0):s.attributes.color;h.push(m)}}return Promise.all([Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){const d=f[0],p=f[1],m=f[2];return n&&(s.morphAttributes.position=d),r&&(s.morphAttributes.normal=p),o&&(s.morphAttributes.color=m),s.morphTargetsRelative=!0,s})}function hL(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function fL(s){let e;const t=s.extensions&&s.extensions[_t.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ju(t.attributes):e=s.indices+":"+ju(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,r=s.targets.length;n<r;n++)e+=":"+ju(s.targets[n]);return e}function ju(s){let e="";const t=Object.keys(s).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+s[t[n]]+";";return e}function ch(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function dL(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const pL=new tt;class mL{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new BC,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,o=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,o=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&o<98?this.textureLoader=new nC(this.options.manager):this.textureLoader=new hC(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(c){return c._markDefs&&c._markDefs()}),Promise.all(this._invokeAll(function(c){return c.beforeRoot&&c.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(c){const l={scene:c[0][r.scene||0],scenes:c[0],animations:c[1],cameras:c[2],asset:r.asset,parser:n,userData:{}};return jr(o,l,r),Mr(l,r),Promise.all(n._invokeAll(function(h){return h.afterRoot&&h.afterRoot(l)})).then(function(){for(const h of l.scenes)h.updateMatrixWorld();e(l)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,o=t.length;r<o;r++){const c=t[r].joints;for(let l=0,h=c.length;l<h;l++)e[c[l]].isBone=!0}for(let r=0,o=e.length;r<o;r++){const c=e[r];c.mesh!==void 0&&(this._addNodeRef(this.meshCache,c.mesh),c.skin!==void 0&&(n[c.mesh].isSkinnedMesh=!0)),c.camera!==void 0&&this._addNodeRef(this.cameraCache,c.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),o=(c,l)=>{const h=this.associations.get(c);h!=null&&this.associations.set(l,h);for(const[f,d]of c.children.entries())o(d,l.children[f])};return o(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const o=e(t[r]);o&&n.push(o)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":r=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(o,c){return n.getDependency(e,c)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[_t.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(o,c){n.load($o.resolveURL(t.uri,r.path),o,void 0,function(){c(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const c=qu[r.type],l=Ks[r.componentType],h=r.normalized===!0,f=new l(r.count*c);return Promise.resolve(new en(f,c,h))}const o=[];return r.bufferView!==void 0?o.push(this.getDependency("bufferView",r.bufferView)):o.push(null),r.sparse!==void 0&&(o.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(o).then(function(c){const l=c[0],h=qu[r.type],f=Ks[r.componentType],d=f.BYTES_PER_ELEMENT,p=d*h,m=r.byteOffset||0,v=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,M=r.normalized===!0;let E,x;if(v&&v!==p){const _=Math.floor(m/v),P="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+_+":"+r.count;let b=t.cache.get(P);b||(E=new f(l,_*v,r.count*v/d),b=new Bg(E,v/d),t.cache.add(P,b)),x=new na(b,h,m%v/d,M)}else l===null?E=new f(r.count*h):E=new f(l,m,r.count*h),x=new en(E,h,M);if(r.sparse!==void 0){const _=qu.SCALAR,P=Ks[r.sparse.indices.componentType],b=r.sparse.indices.byteOffset||0,I=r.sparse.values.byteOffset||0,z=new P(c[1],b,r.sparse.count*_),O=new f(c[2],I,r.sparse.count*h);l!==null&&(x=new en(x.array.slice(),x.itemSize,x.normalized));for(let D=0,V=z.length;D<V;D++){const C=z[D];if(x.setX(C,O[D*h]),h>=2&&x.setY(C,O[D*h+1]),h>=3&&x.setZ(C,O[D*h+2]),h>=4&&x.setW(C,O[D*h+3]),h>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return x})}loadTexture(e){const t=this.json,n=this.options,o=t.textures[e].source,c=t.images[o];let l=this.textureLoader;if(c.uri){const h=n.manager.getHandler(c.uri);h!==null&&(l=h)}return this.loadTextureImage(e,o,l)}loadTextureImage(e,t,n){const r=this,o=this.json,c=o.textures[e],l=o.images[t],h=(l.uri||l.bufferView)+":"+c.sampler;if(this.textureCache[h])return this.textureCache[h];const f=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=c.name||l.name||"",d.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(d.name=l.uri);const m=(o.samplers||{})[c.sampler]||{};return d.magFilter=Km[m.magFilter]||Nn,d.minFilter=Km[m.minFilter]||Ji,d.wrapS=Zm[m.wrapS]||Js,d.wrapT=Zm[m.wrapT]||Js,r.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[h]=f,f}loadImageSource(e,t){const n=this,r=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(p=>p.clone());const c=r.images[e],l=self.URL||self.webkitURL;let h=c.uri||"",f=!1;if(c.bufferView!==void 0)h=n.getDependency("bufferView",c.bufferView).then(function(p){f=!0;const m=new Blob([p],{type:c.mimeType});return h=l.createObjectURL(m),h});else if(c.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(h).then(function(p){return new Promise(function(m,v){let M=m;t.isImageBitmapLoader===!0&&(M=function(E){const x=new Qt(E);x.needsUpdate=!0,m(x)}),t.load($o.resolveURL(p,o.path),M,void 0,v)})}).then(function(p){return f===!0&&l.revokeObjectURL(h),p.userData.mimeType=c.mimeType||dL(c.uri),p}).catch(function(p){throw console.error("THREE.GLTFLoader: Couldn't load texture",h),p});return this.sourceCache[e]=d,d}assignTexture(e,t,n,r){const o=this;return this.getDependency("texture",n.index).then(function(c){if(!c)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(c=c.clone(),c.channel=n.texCoord),o.extensions[_t.KHR_TEXTURE_TRANSFORM]){const l=n.extensions!==void 0?n.extensions[_t.KHR_TEXTURE_TRANSFORM]:void 0;if(l){const h=o.associations.get(c);c=o.extensions[_t.KHR_TEXTURE_TRANSFORM].extendTexture(c,l),o.associations.set(c,h)}}return r!==void 0&&(c.colorSpace=r),e[t]=c,c})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,c=t.attributes.normal===void 0;if(e.isPoints){const l="PointsMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new Vg,ii.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,h.sizeAttenuation=!1,this.cache.add(l,h)),n=h}else if(e.isLine){const l="LineBasicMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new ra,ii.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,this.cache.add(l,h)),n=h}if(r||o||c){let l="ClonedMaterial:"+n.uuid+":";r&&(l+="derivative-tangents:"),o&&(l+="vertex-colors:"),c&&(l+="flat-shading:");let h=this.cache.get(l);h||(h=n.clone(),o&&(h.vertexColors=!0),c&&(h.flatShading=!0),r&&(h.normalScale&&(h.normalScale.y*=-1),h.clearcoatNormalScale&&(h.clearcoatNormalScale.y*=-1)),this.cache.add(l,h),this.associations.set(h,this.associations.get(n))),n=h}e.material=n}getMaterialType(){return co}loadMaterial(e){const t=this,n=this.json,r=this.extensions,o=n.materials[e];let c;const l={},h=o.extensions||{},f=[];if(h[_t.KHR_MATERIALS_UNLIT]){const p=r[_t.KHR_MATERIALS_UNLIT];c=p.getMaterialType(),f.push(p.extendParams(l,o,t))}else{const p=o.pbrMetallicRoughness||{};if(l.color=new Ue(1,1,1),l.opacity=1,Array.isArray(p.baseColorFactor)){const m=p.baseColorFactor;l.color.setRGB(m[0],m[1],m[2],ln),l.opacity=m[3]}p.baseColorTexture!==void 0&&f.push(t.assignTexture(l,"map",p.baseColorTexture,cn)),l.metalness=p.metallicFactor!==void 0?p.metallicFactor:1,l.roughness=p.roughnessFactor!==void 0?p.roughnessFactor:1,p.metallicRoughnessTexture!==void 0&&(f.push(t.assignTexture(l,"metalnessMap",p.metallicRoughnessTexture)),f.push(t.assignTexture(l,"roughnessMap",p.metallicRoughnessTexture))),c=this._invokeOne(function(m){return m.getMaterialType&&m.getMaterialType(e)}),f.push(Promise.all(this._invokeAll(function(m){return m.extendMaterialParams&&m.extendMaterialParams(e,l)})))}o.doubleSided===!0&&(l.side=Ti);const d=o.alphaMode||Yu.OPAQUE;if(d===Yu.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,d===Yu.MASK&&(l.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&c!==Tr&&(f.push(t.assignTexture(l,"normalMap",o.normalTexture)),l.normalScale=new Oe(1,1),o.normalTexture.scale!==void 0)){const p=o.normalTexture.scale;l.normalScale.set(p,p)}if(o.occlusionTexture!==void 0&&c!==Tr&&(f.push(t.assignTexture(l,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&c!==Tr){const p=o.emissiveFactor;l.emissive=new Ue().setRGB(p[0],p[1],p[2],ln)}return o.emissiveTexture!==void 0&&c!==Tr&&f.push(t.assignTexture(l,"emissiveMap",o.emissiveTexture,cn)),Promise.all(f).then(function(){const p=new c(l);return o.name&&(p.name=o.name),Mr(p,o),t.associations.set(p,{materials:e}),o.extensions&&jr(r,p,o),p})}createUniqueName(e){const t=Pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function o(l){return n[_t.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,t).then(function(h){return $m(h,l,t)})}const c=[];for(let l=0,h=e.length;l<h;l++){const f=e[l],d=fL(f),p=r[d];if(p)c.push(p.promise);else{let m;f.extensions&&f.extensions[_t.KHR_DRACO_MESH_COMPRESSION]?m=o(f):m=$m(new un,f,t),r[d]={primitive:f,promise:m},c.push(m)}}return Promise.all(c)}loadMesh(e){const t=this,n=this.json,r=this.extensions,o=n.meshes[e],c=o.primitives,l=[];for(let h=0,f=c.length;h<f;h++){const d=c[h].material===void 0?lL(this.cache):this.getDependency("material",c[h].material);l.push(d)}return l.push(t.loadGeometries(c)),Promise.all(l).then(function(h){const f=h.slice(0,h.length-1),d=h[h.length-1],p=[];for(let v=0,M=d.length;v<M;v++){const E=d[v],x=c[v];let _;const P=f[v];if(x.mode===ni.TRIANGLES||x.mode===ni.TRIANGLE_STRIP||x.mode===ni.TRIANGLE_FAN||x.mode===void 0)_=o.isSkinnedMesh===!0?new N1(E,P):new pn(E,P),_.isSkinnedMesh===!0&&_.normalizeSkinWeights(),x.mode===ni.TRIANGLE_STRIP?_.geometry=Ym(_.geometry,_g):x.mode===ni.TRIANGLE_FAN&&(_.geometry=Ym(_.geometry,th));else if(x.mode===ni.LINES)_=new Th(E,P);else if(x.mode===ni.LINE_STRIP)_=new Xc(E,P);else if(x.mode===ni.LINE_LOOP)_=new k1(E,P);else if(x.mode===ni.POINTS)_=new z1(E,P);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+x.mode);Object.keys(_.geometry.morphAttributes).length>0&&hL(_,o),_.name=t.createUniqueName(o.name||"mesh_"+e),Mr(_,o),x.extensions&&jr(r,_,x),t.assignFinalMaterial(_),p.push(_)}for(let v=0,M=p.length;v<M;v++)t.associations.set(p[v],{meshes:e,primitives:v});if(p.length===1)return o.extensions&&jr(r,p[0],o),p[0];const m=new Ar;o.extensions&&jr(r,m,o),t.associations.set(m,{meshes:e});for(let v=0,M=p.length;v<M;v++)m.add(p[v]);return m})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Cn(Ri.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Vc(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Mr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,o=t.joints.length;r<o;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const o=r.pop(),c=r,l=[],h=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];if(p){l.push(p);const m=new tt;o!==null&&m.fromArray(o.array,f*16),h.push(m)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[f])}return new bh(l,h)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],o=r.name?r.name:"animation_"+e,c=[],l=[],h=[],f=[],d=[];for(let p=0,m=r.channels.length;p<m;p++){const v=r.channels[p],M=r.samplers[v.sampler],E=v.target,x=E.node,_=r.parameters!==void 0?r.parameters[M.input]:M.input,P=r.parameters!==void 0?r.parameters[M.output]:M.output;E.node!==void 0&&(c.push(this.getDependency("node",x)),l.push(this.getDependency("accessor",_)),h.push(this.getDependency("accessor",P)),f.push(M),d.push(E))}return Promise.all([Promise.all(c),Promise.all(l),Promise.all(h),Promise.all(f),Promise.all(d)]).then(function(p){const m=p[0],v=p[1],M=p[2],E=p[3],x=p[4],_=[];for(let P=0,b=m.length;P<b;P++){const I=m[P],z=v[P],O=M[P],D=E[P],V=x[P];if(I===void 0)continue;I.updateMatrix&&I.updateMatrix();const C=n._createAnimationTracks(I,z,O,D,V);if(C)for(let w=0;w<C.length;w++)_.push(C[w])}return new K1(o,void 0,_)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(o){const c=n._getNodeRef(n.meshCache,r.mesh,o);return r.weights!==void 0&&c.traverse(function(l){if(l.isMesh)for(let h=0,f=r.weights.length;h<f;h++)l.morphTargetInfluences[h]=r.weights[h]}),c})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],o=n._loadNodeShallow(e),c=[],l=r.children||[];for(let f=0,d=l.length;f<d;f++)c.push(n.getDependency("node",l[f]));const h=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([o,Promise.all(c),h]).then(function(f){const d=f[0],p=f[1],m=f[2];m!==null&&d.traverse(function(v){v.isSkinnedMesh&&v.bind(m,pL)});for(let v=0,M=p.length;v<M;v++)d.add(p[v]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const o=t.nodes[e],c=o.name?r.createUniqueName(o.name):"",l=[],h=r._invokeOne(function(f){return f.createNodeMesh&&f.createNodeMesh(e)});return h&&l.push(h),o.camera!==void 0&&l.push(r.getDependency("camera",o.camera).then(function(f){return r._getNodeRef(r.cameraCache,o.camera,f)})),r._invokeAll(function(f){return f.createNodeAttachment&&f.createNodeAttachment(e)}).forEach(function(f){l.push(f)}),this.nodeCache[e]=Promise.all(l).then(function(f){let d;if(o.isBone===!0?d=new Hg:f.length>1?d=new Ar:f.length===1?d=f[0]:d=new Mt,d!==f[0])for(let p=0,m=f.length;p<m;p++)d.add(f[p]);if(o.name&&(d.userData.name=o.name,d.name=c),Mr(d,o),o.extensions&&jr(n,d,o),o.matrix!==void 0){const p=new tt;p.fromArray(o.matrix),d.applyMatrix4(p)}else o.translation!==void 0&&d.position.fromArray(o.translation),o.rotation!==void 0&&d.quaternion.fromArray(o.rotation),o.scale!==void 0&&d.scale.fromArray(o.scale);return r.associations.has(d)||r.associations.set(d,{}),r.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,o=new Ar;n.name&&(o.name=r.createUniqueName(n.name)),Mr(o,n),n.extensions&&jr(t,o,n);const c=n.nodes||[],l=[];for(let h=0,f=c.length;h<f;h++)l.push(r.getDependency("node",c[h]));return Promise.all(l).then(function(h){for(let d=0,p=h.length;d<p;d++)o.add(h[d]);const f=d=>{const p=new Map;for(const[m,v]of r.associations)(m instanceof ii||m instanceof Qt)&&p.set(m,v);return d.traverse(m=>{const v=r.associations.get(m);v!=null&&p.set(m,v)}),p};return r.associations=f(o),o})}_createAnimationTracks(e,t,n,r,o){const c=[],l=e.name?e.name:e.uuid,h=[];yr[o.path]===yr.weights?e.traverse(function(m){m.morphTargetInfluences&&h.push(m.name?m.name:m.uuid)}):h.push(l);let f;switch(yr[o.path]){case yr.weights:f=io;break;case yr.rotation:f=ts;break;case yr.position:case yr.scale:f=ro;break;default:switch(n.itemSize){case 1:f=io;break;case 2:case 3:default:f=ro;break}break}const d=r.interpolation!==void 0?cL[r.interpolation]:eo,p=this._getArrayFromAccessor(n);for(let m=0,v=h.length;m<v;m++){const M=new f(h[m]+"."+yr[o.path],t.array,p,d);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(M),c.push(M)}return c}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ch(t.constructor),r=new Float32Array(t.length);for(let o=0,c=t.length;o<c;o++)r[o]=t[o]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof ts?aL:e_;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function gL(s,e,t){const n=e.attributes,r=new _i;if(n.POSITION!==void 0){const l=t.json.accessors[n.POSITION],h=l.min,f=l.max;if(h!==void 0&&f!==void 0){if(r.set(new F(h[0],h[1],h[2]),new F(f[0],f[1],f[2])),l.normalized){const d=ch(Ks[l.componentType]);r.min.multiplyScalar(d),r.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const o=e.targets;if(o!==void 0){const l=new F,h=new F;for(let f=0,d=o.length;f<d;f++){const p=o[f];if(p.POSITION!==void 0){const m=t.json.accessors[p.POSITION],v=m.min,M=m.max;if(v!==void 0&&M!==void 0){if(h.setX(Math.max(Math.abs(v[0]),Math.abs(M[0]))),h.setY(Math.max(Math.abs(v[1]),Math.abs(M[1]))),h.setZ(Math.max(Math.abs(v[2]),Math.abs(M[2]))),m.normalized){const E=ch(Ks[m.componentType]);h.multiplyScalar(E)}l.max(h)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(l)}s.boundingBox=r;const c=new Di;r.getCenter(c.center),c.radius=r.min.distanceTo(r.max)/2,s.boundingSphere=c}function $m(s,e,t){const n=e.attributes,r=[];function o(c,l){return t.getDependency("accessor",c).then(function(h){s.setAttribute(l,h)})}for(const c in n){const l=ah[c]||c.toLowerCase();l in s.attributes||r.push(o(n[c],l))}if(e.indices!==void 0&&!s.index){const c=t.getDependency("accessor",e.indices).then(function(l){s.setIndex(l)});r.push(c)}return Rt.workingColorSpace!==ln&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Rt.workingColorSpace}" not supported.`),Mr(s,e),gL(s,e,t),Promise.all(r).then(function(){return e.targets!==void 0?uL(s,e.targets,t):s})}class _L{constructor(){this.progress=new Map,this.gltfloader=new FC,this.dracoloader=new NC,this.dracoloader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/"),this.gltfloader.setDRACOLoader(this.dracoloader)}async LoadGLTF(e){const t=n=>{this.progress.set(e,n.loaded/n.total)};return this.progress.set(e,0),new Promise((n,r)=>{this.gltfloader.loadAsync(e,t).then(n).catch(r)})}PollProgress(){let e=0;return this.progress.forEach(t=>{e+=t}),this.progress.size===0?1:e/this.progress.size}}class vL extends Ih{constructor(){super(),this.isDIVEPrimitive=!0,this._mesh=new pn,this._mesh.layers.mask=ri,this._mesh.castShadow=!0,this._mesh.receiveShadow=!0,this._mesh.material=new co,this.add(this._mesh)}SetGeometry(e){const t=this.assembleGeometry(e);t&&(this._mesh.geometry=t,this._boundingBox.setFromObject(this._mesh))}SetMaterial(e){const t=this._mesh.material;e.vertexColors!==void 0&&(t.vertexColors=e.vertexColors),e.color!==void 0&&(t.color=new Ue(e.color)),e.map!==void 0&&(t.map=e.map),e.normalMap!==void 0&&(t.normalMap=e.normalMap),e.roughness!==void 0&&(t.roughness=e.roughness),e.roughnessMap!==void 0&&(t.roughnessMap=e.roughnessMap,t.roughnessMap&&(t.roughness=1)),e.metalness!==void 0&&(t.metalness=e.metalness),e.metalnessMap!==void 0&&(t.metalnessMap=e.metalnessMap,t.metalnessMap&&(t.metalness=0)),this._mesh&&(this._mesh.material=t)}PlaceOnFloor(){var r,o,c,l,h;const e=this.getWorldPosition(this._positionWorldBuffer),t=e.clone();(o=(r=this._mesh)==null?void 0:r.geometry)==null||o.computeBoundingBox();const n=(l=(c=this._mesh)==null?void 0:c.geometry)==null?void 0:l.boundingBox;!n||!this._mesh||(e.y=e.y-this._mesh.localToWorld(n.min.clone()).y,e.y!==t.y&&((h=On.get(this.userData.id))==null||h.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale})))}DropIt(){if(!this.parent){console.warn("DIVEPrimitive: DropIt() called on a model that is not in the scene.",this);return}const e=this._boundingBox.min.y*this.scale.y,t=this.localToWorld(this._boundingBox.getCenter(new F).multiply(this.scale));t.y=e+this.position.y;const n=new Yg(t,new F(0,-1,0));n.layers.mask=ri;const r=n.intersectObjects(Ph(this).Root.children,!0);if(r.length>0){const o=r[0].object;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox,l=o.localToWorld(c.max.clone()),h=this.position.clone(),f=this.position.clone().setY(l.y).sub(new F(0,e,0));if(this.position.copy(f),this.position.y===h.y)return;this.onMove()}}assembleGeometry(e){switch(this._mesh.material.flatShading=!1,e.name.toLowerCase()){case"cylinder":return this.createCylinderGeometry(e);case"sphere":return this.createSphereGeometry(e);case"pyramid":return this._mesh.material.flatShading=!0,this.createPyramidGeometry(e);case"cube":case"box":return this.createBoxGeometry(e);case"cone":return this.createConeGeometry(e);case"wall":return this.createWallGeometry(e);case"plane":return this.createPlaneGeometry(e);default:return console.warn("DIVEPrimitive.assembleGeometry: Invalid geometry type:",e.name.toLowerCase()),null}}createCylinderGeometry(e){const t=new qc(e.width/2,e.width/2,e.height,64);return t.translate(0,e.height/2,0),t}createSphereGeometry(e){return new Yc(e.width/2,256,256)}createPyramidGeometry(e){const t=new Float32Array([-e.width/2,0,-e.depth/2,e.width/2,0,-e.depth/2,e.width/2,0,e.depth/2,-e.width/2,0,e.depth/2,0,e.height,0]),n=new Uint16Array([0,1,2,0,2,3,0,4,1,1,4,2,2,4,3,3,4,0]),r=new un;return r.setAttribute("position",new en(t,3)),r.setIndex(new en(n,1)),r.computeVertexNormals(),r.computeBoundingBox(),r.computeBoundingSphere(),r}createBoxGeometry(e){const t=new Lr(e.width,e.height,e.depth);return t.translate(0,e.height/2,0),t}createConeGeometry(e){const t=new Ah(e.width/2,e.height,256);return t.translate(0,e.height/2,0),t}createWallGeometry(e){const t=new Lr(e.width,e.height,e.depth||.05,16);return t.translate(0,e.height/2,0),t}createPlaneGeometry(e){const t=new Lr(e.width,e.height,e.depth);return t.translate(0,e.height/2,0),t}}class xL extends Ih{constructor(){super(),this.isDIVEGroup=!0,this.name="DIVEGroup",this._members=[],this._lines=[]}get members(){return this._members}SetPosition(e){super.SetPosition(e),this._members.forEach(t=>{"isDIVENode"in t&&t.onMove()})}SetLinesVisibility(e,t){if(!t){this._lines.forEach(r=>{r.visible=e});return}const n=this._members.indexOf(t);n!==-1&&(this._lines[n].visible=e)}attach(e){if(this._members.includes(e))return this;const t=this.createLine();return this.add(t),this._lines.push(t),super.attach(e),this._members.push(e),this.updateLineTo(t,e),this.SetLinesVisibility(!0,e),this}remove(e){const t=this._members.indexOf(e);if(t===-1)return this;const n=this._lines[t];return super.remove(n),this._lines.splice(t,1),super.remove(e),this._members.splice(t,1),this}UpdateLineTo(e){const t=this._members.indexOf(e);t!==-1&&this.updateLineTo(this._lines[t],e)}createLine(){const e=new un,t=new G1({color:6710886,dashSize:.05,gapSize:.025}),n=new Xc(e,t);return n.visible=!1,n}updateLineTo(e,t){e.geometry.setFromPoints([new F(0,0,0),t.position.clone()]),e.computeLineDistances()}}class Dh extends Mt{constructor(){super(),this.isDIVERoot=!0,this.name="Root",this.loadingManager=new _L}ComputeSceneBB(){const e=new _i;return this.traverse(t=>{"isObject3D"in t&&e.expandByObject(t)}),e}GetSceneObject(e){let t;return this.traverse(n=>{t||n.userData.id===e.id&&(t=n)}),t}AddSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.updateLight(e);break}case"model":{this.updateModel(e);break}case"primitive":{this.updatePrimitive(e);break}case"group":{this.updateGroup(e);break}default:console.warn(`DIVERoot.AddSceneObject: Unknown entity type: ${e.entityType}`)}}UpdateSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.updateLight(e);break}case"model":{this.updateModel(e);break}case"primitive":{this.updatePrimitive(e);break}case"group":{this.updateGroup(e);break}default:console.warn(`DIVERoot.UpdateSceneObject: Unknown entity type: ${e.entityType}`)}}DeleteSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.deleteLight(e);break}case"model":{this.deleteModel(e);break}case"primitive":{this.deletePrimitive(e);break}case"group":{this.deleteGroup(e);break}default:console.warn(`DIVERoot.DeleteSceneObject: Unknown entity type: ${e.entityType}`)}}PlaceOnFloor(e){switch(e.entityType){case"pov":case"light":break;case"model":case"primitive":{this.placeOnFloor(e);break}default:console.warn(`DIVERoot.PlaceOnFloor: Unknown entity type: ${e.entityType}`)}}updateLight(e){let t=this.GetSceneObject(e);if(!t){switch(e.type){case"scene":{t=new DC;break}case"ambient":{t=new bC;break}case"point":{t=new IC;break}default:{console.warn(`DIVERoot.updateLight: Unknown light type: ${e.type}`);return}}t.userData.id=e.id,this.add(t)}e.name!==void 0&&e.name!==null&&(t.name=e.name),e.position!==void 0&&e.position!==null&&t.position.set(e.position.x,e.position.y,e.position.z),e.intensity!==void 0&&e.intensity!==null&&t.SetIntensity(e.intensity),e.enabled!==void 0&&e.enabled!==null&&t.SetEnabled(e.enabled),e.color!==void 0&&e.color!==null&&t.SetColor(new Ue(e.color)),e.visible!==void 0&&e.visible!==null&&(t.visible=e.visible),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updateModel(e){let t=this.GetSceneObject(e);t||(t=new UC,t.userData.id=e.id,t.userData.uri=e.uri,this.add(t)),e.uri!==void 0&&this.loadingManager.LoadGLTF(e.uri).then(n=>{var r;t.SetModel(n),(r=On.get(e.id))==null||r.PerformAction("MODEL_LOADED",{id:e.id})}),e.name!==void 0&&(t.name=e.name),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.material!==void 0&&t.SetMaterial(e.material),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updatePrimitive(e){let t=this.GetSceneObject(e);t||(t=new vL,t.userData.id=e.id,this.add(t)),e.name!==void 0&&(t.name=e.name),e.geometry!==void 0&&t.SetGeometry(e.geometry),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.material!==void 0&&t.SetMaterial(e.material),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updateGroup(e){let t=this.GetSceneObject(e);t||(t=new xL,t.userData.id=e.id,this.add(t)),e.name!==void 0&&(t.name=e.name),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.bbVisible!==void 0&&t.SetLinesVisibility(e.bbVisible),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}deleteLight(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteLight: Light with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deleteModel(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteModel: Model with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deletePrimitive(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deletePrimitive: Primitive with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deleteGroup(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteGroup: Group with id ${e.id} not found`);return}this.detachTransformControls(t);for(let n=t.members.length-1;n>=0;n--)this.attach(t.members[n]);t.parent.remove(t)}placeOnFloor(e){const t=this.GetSceneObject(e);t&&t.PlaceOnFloor()}setParent(e){const t=this.GetSceneObject(e);if(t)if(e.parentId!==null){const n=this.GetSceneObject({id:e.parentId});if(!n)return;n.attach(t)}else this.attach(t)}detachTransformControls(e){this.findScene(e).children.find(t=>{"isTransformControls"in t&&t.detach()})}findScene(e){return e.parent!==null?this.findScene(e.parent):e}}const yL="#888888",SL="#dddddd";class ML extends Mt{constructor(){super(),this.name="Grid";const e=new SC(100,100,yL,SL);e.material.depthTest=!1,e.layers.mask=Kg,this.add(e)}SetVisibility(e){this.visible=e}}class EL extends pn{constructor(){super(new oo(1e4,1e4),new co({color:new Ue(150/255,150/255,150/255)})),this.isFloor=!0,this.name="Floor",this.layers.mask=ri,this.receiveShadow=!0,this.rotateX(-Math.PI/2)}SetVisibility(e){this.visible=e}SetColor(e){this.material.color=new Ue(e)}}class bL{constructor(e,t,n,r,o){this.xrLight=e,this.renderer=t,this.lightProbe=n,this.xrWebGLBinding=null,this.estimationStartCallback=o,this.frameCallback=this.onXRFrame.bind(this);const c=t.xr.getSession();if(r&&"XRWebGLBinding"in window){const l=new Lg(16);e.environment=l.texture;const h=t.getContext();switch(c.preferredReflectionFormat){case"srgba8":h.getExtension("EXT_sRGB");break;case"rgba16f":h.getExtension("OES_texture_half_float");break}this.xrWebGLBinding=new XRWebGLBinding(c,h),this.lightProbe.addEventListener("reflectionchange",()=>{this.updateReflection()})}c.requestAnimationFrame(this.frameCallback)}updateReflection(){const e=this.renderer.properties.get(this.xrLight.environment);if(e){const t=this.xrWebGLBinding.getReflectionCubeMap(this.lightProbe);t&&(e.__webglTexture=t,this.xrLight.environment.needsPMREMUpdate=!0)}}onXRFrame(e,t){if(!this.xrLight)return;t.session.requestAnimationFrame(this.frameCallback);const r=t.getLightEstimate(this.lightProbe);if(r){this.xrLight.lightProbe.sh.fromArray(r.sphericalHarmonicsCoefficients),this.xrLight.lightProbe.intensity=1;const o=Math.max(1,Math.max(r.primaryLightIntensity.x,Math.max(r.primaryLightIntensity.y,r.primaryLightIntensity.z)));this.xrLight.directionalLight.color.setRGB(r.primaryLightIntensity.x/o,r.primaryLightIntensity.y/o,r.primaryLightIntensity.z/o),this.xrLight.directionalLight.intensity=o,this.xrLight.directionalLight.position.copy(r.primaryLightDirection),this.estimationStartCallback&&(this.estimationStartCallback(),this.estimationStartCallback=null)}}dispose(){this.xrLight=null,this.renderer=null,this.lightProbe=null,this.xrWebGLBinding=null}}class TL extends Ar{constructor(e,t=!0){super(),this.lightProbe=new uC,this.lightProbe.intensity=0,this.add(this.lightProbe),this.directionalLight=new Rh,this.directionalLight.intensity=0,this.add(this.directionalLight),this.environment=null;let n=null,r=!1;e.xr.addEventListener("sessionstart",()=>{const o=e.xr.getSession();"requestLightProbe"in o&&o.requestLightProbe({reflectionFormat:o.preferredReflectionFormat}).then(c=>{n=new bL(this,e,c,t,()=>{r=!0,this.dispatchEvent({type:"estimationstart"})})})}),e.xr.addEventListener("sessionend",()=>{n&&(n.dispose(),n=null),r&&this.dispatchEvent({type:"estimationend"})}),this.dispose=()=>{n&&(n.dispose(),n=null),this.remove(this.lightProbe),this.lightProbe=null,this.remove(this.directionalLight),this.directionalLight=null,this.environment=null}}}class AL extends Mt{constructor(e){super(),this.name="XRLightRoot",this._scene=e,this._xrLight=null,this._lightRoot=new Dh,this._lightRoot.UpdateSceneObject({id:"XRSceneLight",entityType:"light",name:"XRSceneLight",type:"scene",color:16777215,intensity:1,enabled:!0,visible:!0}),this.add(this._lightRoot)}InitLightEstimation(e){this._xrLight||(this._xrLight=new TL(e,!0),this._xrLight.layers.mask=ri,this.add(this._xrLight)),this._xrLight.addEventListener("estimationstart",()=>{this.onEstimationStart()}),this._xrLight.addEventListener("estimationend",()=>{this.onEstimationEnd()})}DisposeLightEstimation(){this._xrLight&&(this._xrLight.removeEventListener("estimationstart",()=>{this.onEstimationStart()}),this._xrLight.removeEventListener("estimationend",()=>{this.onEstimationEnd()}))}onEstimationStart(){this._lightRoot.visible=!1,this._xrLight&&this._xrLight.environment&&(this._scene.environment=this._xrLight.environment)}onEstimationEnd(){this._lightRoot.visible=!0,this._scene.environment=null,this._xrLight}}class wL extends Mt{get XRModelRoot(){return this._xrModelRoot}get XRLightRoot(){return this._xrLightRoot}get XRHandNode(){return this._xrHandNode}constructor(e){super(),this.name="XRRoot",this._xrModelRoot=new Dh,this._xrModelRoot.name="XRModelRoot",this.add(this._xrModelRoot),this._xrShadowPlane=new pn(new oo(100,100),new H1({opacity:1,transparent:!0})),this._xrModelRoot.add(this._xrShadowPlane),this._xrLightRoot=new AL(e),this._xrLightRoot.name="XRLightRoot",this.add(this._xrLightRoot),this._xrHandNode=new Mt,this._xrHandNode.name="XRHandNode",this.add(this._xrHandNode)}InitLightEstimation(e){this._xrLightRoot.InitLightEstimation(e)}DisposeLightEstimation(){this._xrLightRoot.DisposeLightEstimation()}}class RL extends I1{get Root(){return this._root}get XRRoot(){return this._xrRoot}get Floor(){return this._floor}get Grid(){return this._grid}constructor(){super(),this.background=new Ue(16777215),this._root=new Dh,this.add(this._root),this._floor=new EL,this.add(this._floor),this._grid=new ML,this.add(this._grid),this._xrRoot=new wL(this),this._xrRoot.visible=!1,this.add(this._xrRoot)}InitXR(e){this._root.visible=!1,this._xrRoot.visible=!0,this._xrRoot.InitLightEstimation(e)}DisposeXR(){this._root.visible=!0,this._xrRoot.visible=!1,this._xrRoot.DisposeLightEstimation()}SetBackground(e){this.background=new Ue(e)}ComputeSceneBB(){return this.Root.ComputeSceneBB()}GetSceneObject(e){return this.Root.GetSceneObject(e)}AddSceneObject(e){this.Root.AddSceneObject(e)}UpdateSceneObject(e){this.Root.UpdateSceneObject(e)}DeleteSceneObject(e){this.Root.DeleteSceneObject(e)}PlaceOnFloor(e){this.Root.PlaceOnFloor(e)}}const Yo={fov:70,near:.1,far:1e3},Qr=class Qr extends Cn{constructor(e=Yo){super(e.fov||Yo.fov,1,e.near||Yo.near,e.far||Yo.far),this.onSetCameraLayer=()=>{},this.layers.mask=Qr.EDITOR_VIEW_LAYER_MASK}OnResize(e,t){this.aspect=e/t,this.updateProjectionMatrix()}SetCameraLayer(e){this.layers.mask=e==="LIVE"?Qr.LIVE_VIEW_LAYER_MASK:Qr.EDITOR_VIEW_LAYER_MASK,this.onSetCameraLayer(this.layers.mask)}};Qr.EDITOR_VIEW_LAYER_MASK=EC|jg|Kg|ri,Qr.LIVE_VIEW_LAYER_MASK=ri;let lh=Qr;const Jm={type:"change"},Ku={type:"start"},Qm={type:"end"},Ac=new so,eg=new Sr,CL=Math.cos(70*Ri.DEG2RAD);class LL extends ns{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xs.ROTATE,MIDDLE:xs.DOLLY,RIGHT:xs.PAN},this.touches={ONE:ys.ROTATE,TWO:ys.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return l.phi},this.getAzimuthalAngle=function(){return l.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(y){y.addEventListener("keydown",Me),this._domElementKeyEvents=y},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Me),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Jm),n.update(),o=r.NONE},this.update=function(){const y=new F,Y=new Ci().setFromUnitVectors(e.up,new F(0,1,0)),re=Y.clone().invert(),ve=new F,Te=new Ci,pt=new F,ut=2*Math.PI;return function(Kt=null){const Tt=n.object.position;y.copy(Tt).sub(n.target),y.applyQuaternion(Y),l.setFromVector3(y),n.autoRotate&&o===r.NONE&&J(w(Kt)),n.enableDamping?(l.theta+=h.theta*n.dampingFactor,l.phi+=h.phi*n.dampingFactor):(l.theta+=h.theta,l.phi+=h.phi);let Vt=n.minAzimuthAngle,Wt=n.maxAzimuthAngle;isFinite(Vt)&&isFinite(Wt)&&(Vt<-Math.PI?Vt+=ut:Vt>Math.PI&&(Vt-=ut),Wt<-Math.PI?Wt+=ut:Wt>Math.PI&&(Wt-=ut),Vt<=Wt?l.theta=Math.max(Vt,Math.min(Wt,l.theta)):l.theta=l.theta>(Vt+Wt)/2?Math.max(Vt,l.theta):Math.min(Wt,l.theta)),l.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,l.phi)),l.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Mn=!1;if(n.zoomToCursor&&O||n.object.isOrthographicCamera)l.radius=de(l.radius);else{const mn=l.radius;l.radius=de(l.radius*f),Mn=mn!=l.radius}if(y.setFromSpherical(l),y.applyQuaternion(re),Tt.copy(n.target).add(y),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),d.set(0,0,0)),n.zoomToCursor&&O){let mn=null;if(n.object.isPerspectiveCamera){const vi=y.length();mn=de(vi*f);const xi=vi-mn;n.object.position.addScaledVector(I,xi),n.object.updateMatrixWorld(),Mn=!!xi}else if(n.object.isOrthographicCamera){const vi=new F(z.x,z.y,0);vi.unproject(n.object);const xi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),n.object.updateProjectionMatrix(),Mn=xi!==n.object.zoom;const Ni=new F(z.x,z.y,0);Ni.unproject(n.object),n.object.position.sub(Ni).add(vi),n.object.updateMatrixWorld(),mn=y.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;mn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(mn).add(n.object.position):(Ac.origin.copy(n.object.position),Ac.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Ac.direction))<CL?e.lookAt(n.target):(eg.setFromNormalAndCoplanarPoint(n.object.up,n.target),Ac.intersectPlane(eg,n.target))))}else if(n.object.isOrthographicCamera){const mn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),mn!==n.object.zoom&&(n.object.updateProjectionMatrix(),Mn=!0)}return f=1,O=!1,Mn||ve.distanceToSquared(n.object.position)>c||8*(1-Te.dot(n.object.quaternion))>c||pt.distanceToSquared(n.target)>c?(n.dispatchEvent(Jm),ve.copy(n.object.position),Te.copy(n.object.quaternion),pt.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Le),n.domElement.removeEventListener("pointerdown",ee),n.domElement.removeEventListener("pointercancel",le),n.domElement.removeEventListener("wheel",pe),n.domElement.removeEventListener("pointermove",se),n.domElement.removeEventListener("pointerup",le),n.domElement.getRootNode().removeEventListener("keydown",ze,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Me),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=r.NONE;const c=1e-6,l=new Vm,h=new Vm;let f=1;const d=new F,p=new Oe,m=new Oe,v=new Oe,M=new Oe,E=new Oe,x=new Oe,_=new Oe,P=new Oe,b=new Oe,I=new F,z=new Oe;let O=!1;const D=[],V={};let C=!1;function w(y){return y!==null?2*Math.PI/60*n.autoRotateSpeed*y:2*Math.PI/60/60*n.autoRotateSpeed}function X(y){const Y=Math.abs(y*.01);return Math.pow(.95,n.zoomSpeed*Y)}function J(y){h.theta-=y}function k(y){h.phi-=y}const te=function(){const y=new F;return function(re,ve){y.setFromMatrixColumn(ve,0),y.multiplyScalar(-re),d.add(y)}}(),ce=function(){const y=new F;return function(re,ve){n.screenSpacePanning===!0?y.setFromMatrixColumn(ve,1):(y.setFromMatrixColumn(ve,0),y.crossVectors(n.object.up,y)),y.multiplyScalar(re),d.add(y)}}(),ue=function(){const y=new F;return function(re,ve){const Te=n.domElement;if(n.object.isPerspectiveCamera){const pt=n.object.position;y.copy(pt).sub(n.target);let ut=y.length();ut*=Math.tan(n.object.fov/2*Math.PI/180),te(2*re*ut/Te.clientHeight,n.object.matrix),ce(2*ve*ut/Te.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(te(re*(n.object.right-n.object.left)/n.object.zoom/Te.clientWidth,n.object.matrix),ce(ve*(n.object.top-n.object.bottom)/n.object.zoom/Te.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function xe(y){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?f/=y:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Q(y){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?f*=y:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ge(y,Y){if(!n.zoomToCursor)return;O=!0;const re=n.domElement.getBoundingClientRect(),ve=y-re.left,Te=Y-re.top,pt=re.width,ut=re.height;z.x=ve/pt*2-1,z.y=-(Te/ut)*2+1,I.set(z.x,z.y,1).unproject(n.object).sub(n.object.position).normalize()}function de(y){return Math.max(n.minDistance,Math.min(n.maxDistance,y))}function Ae(y){p.set(y.clientX,y.clientY)}function ct(y){ge(y.clientX,y.clientX),_.set(y.clientX,y.clientY)}function bt(y){M.set(y.clientX,y.clientY)}function ie(y){m.set(y.clientX,y.clientY),v.subVectors(m,p).multiplyScalar(n.rotateSpeed);const Y=n.domElement;J(2*Math.PI*v.x/Y.clientHeight),k(2*Math.PI*v.y/Y.clientHeight),p.copy(m),n.update()}function me(y){P.set(y.clientX,y.clientY),b.subVectors(P,_),b.y>0?xe(X(b.y)):b.y<0&&Q(X(b.y)),_.copy(P),n.update()}function Re(y){E.set(y.clientX,y.clientY),x.subVectors(E,M).multiplyScalar(n.panSpeed),ue(x.x,x.y),M.copy(E),n.update()}function be(y){ge(y.clientX,y.clientY),y.deltaY<0?Q(X(y.deltaY)):y.deltaY>0&&xe(X(y.deltaY)),n.update()}function qe(y){let Y=!1;switch(y.code){case n.keys.UP:y.ctrlKey||y.metaKey||y.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ue(0,n.keyPanSpeed),Y=!0;break;case n.keys.BOTTOM:y.ctrlKey||y.metaKey||y.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ue(0,-n.keyPanSpeed),Y=!0;break;case n.keys.LEFT:y.ctrlKey||y.metaKey||y.shiftKey?J(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ue(n.keyPanSpeed,0),Y=!0;break;case n.keys.RIGHT:y.ctrlKey||y.metaKey||y.shiftKey?J(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ue(-n.keyPanSpeed,0),Y=!0;break}Y&&(y.preventDefault(),n.update())}function Ye(y){if(D.length===1)p.set(y.pageX,y.pageY);else{const Y=xt(y),re=.5*(y.pageX+Y.x),ve=.5*(y.pageY+Y.y);p.set(re,ve)}}function ft(y){if(D.length===1)M.set(y.pageX,y.pageY);else{const Y=xt(y),re=.5*(y.pageX+Y.x),ve=.5*(y.pageY+Y.y);M.set(re,ve)}}function q(y){const Y=xt(y),re=y.pageX-Y.x,ve=y.pageY-Y.y,Te=Math.sqrt(re*re+ve*ve);_.set(0,Te)}function Je(y){n.enableZoom&&q(y),n.enablePan&&ft(y)}function Ge(y){n.enableZoom&&q(y),n.enableRotate&&Ye(y)}function St(y){if(D.length==1)m.set(y.pageX,y.pageY);else{const re=xt(y),ve=.5*(y.pageX+re.x),Te=.5*(y.pageY+re.y);m.set(ve,Te)}v.subVectors(m,p).multiplyScalar(n.rotateSpeed);const Y=n.domElement;J(2*Math.PI*v.x/Y.clientHeight),k(2*Math.PI*v.y/Y.clientHeight),p.copy(m)}function ke(y){if(D.length===1)E.set(y.pageX,y.pageY);else{const Y=xt(y),re=.5*(y.pageX+Y.x),ve=.5*(y.pageY+Y.y);E.set(re,ve)}x.subVectors(E,M).multiplyScalar(n.panSpeed),ue(x.x,x.y),M.copy(E)}function Et(y){const Y=xt(y),re=y.pageX-Y.x,ve=y.pageY-Y.y,Te=Math.sqrt(re*re+ve*ve);P.set(0,Te),b.set(0,Math.pow(P.y/_.y,n.zoomSpeed)),xe(b.y),_.copy(P);const pt=(y.pageX+Y.x)*.5,ut=(y.pageY+Y.y)*.5;ge(pt,ut)}function U(y){n.enableZoom&&Et(y),n.enablePan&&ke(y)}function T(y){n.enableZoom&&Et(y),n.enableRotate&&St(y)}function ee(y){n.enabled!==!1&&(D.length===0&&(n.domElement.setPointerCapture(y.pointerId),n.domElement.addEventListener("pointermove",se),n.domElement.addEventListener("pointerup",le)),!vt(y)&&(rt(y),y.pointerType==="touch"?Xe(y):fe(y)))}function se(y){n.enabled!==!1&&(y.pointerType==="touch"?Ce(y):Fe(y))}function le(y){switch(lt(y),D.length){case 0:n.domElement.releasePointerCapture(y.pointerId),n.domElement.removeEventListener("pointermove",se),n.domElement.removeEventListener("pointerup",le),n.dispatchEvent(Qm),o=r.NONE;break;case 1:const Y=D[0],re=V[Y];Xe({pointerId:Y,pageX:re.x,pageY:re.y});break}}function fe(y){let Y;switch(y.button){case 0:Y=n.mouseButtons.LEFT;break;case 1:Y=n.mouseButtons.MIDDLE;break;case 2:Y=n.mouseButtons.RIGHT;break;default:Y=-1}switch(Y){case xs.DOLLY:if(n.enableZoom===!1)return;ct(y),o=r.DOLLY;break;case xs.ROTATE:if(y.ctrlKey||y.metaKey||y.shiftKey){if(n.enablePan===!1)return;bt(y),o=r.PAN}else{if(n.enableRotate===!1)return;Ae(y),o=r.ROTATE}break;case xs.PAN:if(y.ctrlKey||y.metaKey||y.shiftKey){if(n.enableRotate===!1)return;Ae(y),o=r.ROTATE}else{if(n.enablePan===!1)return;bt(y),o=r.PAN}break;default:o=r.NONE}o!==r.NONE&&n.dispatchEvent(Ku)}function Fe(y){switch(o){case r.ROTATE:if(n.enableRotate===!1)return;ie(y);break;case r.DOLLY:if(n.enableZoom===!1)return;me(y);break;case r.PAN:if(n.enablePan===!1)return;Re(y);break}}function pe(y){n.enabled===!1||n.enableZoom===!1||o!==r.NONE||(y.preventDefault(),n.dispatchEvent(Ku),be(Pe(y)),n.dispatchEvent(Qm))}function Pe(y){const Y=y.deltaMode,re={clientX:y.clientX,clientY:y.clientY,deltaY:y.deltaY};switch(Y){case 1:re.deltaY*=16;break;case 2:re.deltaY*=100;break}return y.ctrlKey&&!C&&(re.deltaY*=10),re}function ze(y){y.key==="Control"&&(C=!0,n.domElement.getRootNode().addEventListener("keyup",_e,{passive:!0,capture:!0}))}function _e(y){y.key==="Control"&&(C=!1,n.domElement.getRootNode().removeEventListener("keyup",_e,{passive:!0,capture:!0}))}function Me(y){n.enabled===!1||n.enablePan===!1||qe(y)}function Xe(y){switch(dt(y),D.length){case 1:switch(n.touches.ONE){case ys.ROTATE:if(n.enableRotate===!1)return;Ye(y),o=r.TOUCH_ROTATE;break;case ys.PAN:if(n.enablePan===!1)return;ft(y),o=r.TOUCH_PAN;break;default:o=r.NONE}break;case 2:switch(n.touches.TWO){case ys.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Je(y),o=r.TOUCH_DOLLY_PAN;break;case ys.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ge(y),o=r.TOUCH_DOLLY_ROTATE;break;default:o=r.NONE}break;default:o=r.NONE}o!==r.NONE&&n.dispatchEvent(Ku)}function Ce(y){switch(dt(y),o){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;St(y),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;ke(y),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;U(y),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;T(y),n.update();break;default:o=r.NONE}}function Le(y){n.enabled!==!1&&y.preventDefault()}function rt(y){D.push(y.pointerId)}function lt(y){delete V[y.pointerId];for(let Y=0;Y<D.length;Y++)if(D[Y]==y.pointerId){D.splice(Y,1);return}}function vt(y){for(let Y=0;Y<D.length;Y++)if(D[Y]==y.pointerId)return!0;return!1}function dt(y){let Y=V[y.pointerId];Y===void 0&&(Y=new Oe,V[y.pointerId]=Y),Y.set(y.pageX,y.pageY)}function xt(y){const Y=y.pointerId===D[0]?D[1]:D[0];return V[Y]}n.domElement.addEventListener("contextmenu",Le),n.domElement.addEventListener("pointerdown",ee),n.domElement.addEventListener("pointercancel",le),n.domElement.addEventListener("wheel",pe,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",ze,{passive:!0,capture:!0}),this.update()}}var er=Object.freeze({Linear:Object.freeze({None:function(s){return s},In:function(s){return s},Out:function(s){return s},InOut:function(s){return s}}),Quadratic:Object.freeze({In:function(s){return s*s},Out:function(s){return s*(2-s)},InOut:function(s){return(s*=2)<1?.5*s*s:-.5*(--s*(s-2)-1)}}),Cubic:Object.freeze({In:function(s){return s*s*s},Out:function(s){return--s*s*s+1},InOut:function(s){return(s*=2)<1?.5*s*s*s:.5*((s-=2)*s*s+2)}}),Quartic:Object.freeze({In:function(s){return s*s*s*s},Out:function(s){return 1- --s*s*s*s},InOut:function(s){return(s*=2)<1?.5*s*s*s*s:-.5*((s-=2)*s*s*s-2)}}),Quintic:Object.freeze({In:function(s){return s*s*s*s*s},Out:function(s){return--s*s*s*s*s+1},InOut:function(s){return(s*=2)<1?.5*s*s*s*s*s:.5*((s-=2)*s*s*s*s+2)}}),Sinusoidal:Object.freeze({In:function(s){return 1-Math.sin((1-s)*Math.PI/2)},Out:function(s){return Math.sin(s*Math.PI/2)},InOut:function(s){return .5*(1-Math.sin(Math.PI*(.5-s)))}}),Exponential:Object.freeze({In:function(s){return s===0?0:Math.pow(1024,s-1)},Out:function(s){return s===1?1:1-Math.pow(2,-10*s)},InOut:function(s){return s===0?0:s===1?1:(s*=2)<1?.5*Math.pow(1024,s-1):.5*(-Math.pow(2,-10*(s-1))+2)}}),Circular:Object.freeze({In:function(s){return 1-Math.sqrt(1-s*s)},Out:function(s){return Math.sqrt(1- --s*s)},InOut:function(s){return(s*=2)<1?-.5*(Math.sqrt(1-s*s)-1):.5*(Math.sqrt(1-(s-=2)*s)+1)}}),Elastic:Object.freeze({In:function(s){return s===0?0:s===1?1:-Math.pow(2,10*(s-1))*Math.sin((s-1.1)*5*Math.PI)},Out:function(s){return s===0?0:s===1?1:Math.pow(2,-10*s)*Math.sin((s-.1)*5*Math.PI)+1},InOut:function(s){return s===0?0:s===1?1:(s*=2,s<1?-.5*Math.pow(2,10*(s-1))*Math.sin((s-1.1)*5*Math.PI):.5*Math.pow(2,-10*(s-1))*Math.sin((s-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(s){var e=1.70158;return s===1?1:s*s*((e+1)*s-e)},Out:function(s){var e=1.70158;return s===0?0:--s*s*((e+1)*s+e)+1},InOut:function(s){var e=2.5949095;return(s*=2)<1?.5*(s*s*((e+1)*s-e)):.5*((s-=2)*s*((e+1)*s+e)+2)}}),Bounce:Object.freeze({In:function(s){return 1-er.Bounce.Out(1-s)},Out:function(s){return s<1/2.75?7.5625*s*s:s<2/2.75?7.5625*(s-=1.5/2.75)*s+.75:s<2.5/2.75?7.5625*(s-=2.25/2.75)*s+.9375:7.5625*(s-=2.625/2.75)*s+.984375},InOut:function(s){return s<.5?er.Bounce.In(s*2)*.5:er.Bounce.Out(s*2-1)*.5+.5}}),generatePow:function(s){return s===void 0&&(s=4),s=s<Number.EPSILON?Number.EPSILON:s,s=s>1e4?1e4:s,{In:function(e){return Math.pow(e,s)},Out:function(e){return 1-Math.pow(1-e,s)},InOut:function(e){return e<.5?Math.pow(e*2,s)/2:(1-Math.pow(2-e*2,s))/2+.5}}}}),jo=function(){return performance.now()},PL=function(){function s(){this._tweens={},this._tweensAddedDuringUpdate={}}return s.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},s.prototype.removeAll=function(){this._tweens={}},s.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},s.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},s.prototype.update=function(e,t){e===void 0&&(e=jo()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<n.length;r++){var o=this._tweens[n[r]],c=!t;o&&o.update(e,c)===!1&&!t&&delete this._tweens[n[r]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},s}(),uh={Linear:function(s,e){var t=s.length-1,n=t*e,r=Math.floor(n),o=uh.Utils.Linear;return e<0?o(s[0],s[1],n):e>1?o(s[t],s[t-1],t-n):o(s[r],s[r+1>t?t:r+1],n-r)},Utils:{Linear:function(s,e,t){return(e-s)*t+s}}},t_=function(){function s(){}return s.nextId=function(){return s._nextId++},s._nextId=0,s}(),hh=new PL,IL=function(){function s(e,t){t===void 0&&(t=hh),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=er.Linear.None,this._interpolationFunction=uh.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=t_.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return s.prototype.getId=function(){return this._id},s.prototype.isPlaying=function(){return this._isPlaying},s.prototype.isPaused=function(){return this._isPaused},s.prototype.getDuration=function(){return this._duration},s.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t<0?0:t,this},s.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},s.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},s.prototype.start=function(e,t){if(e===void 0&&(e=jo()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var n in this._valuesStartRepeat)this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var r={};for(var o in this._valuesEnd)r[o]=this._valuesEnd[o];this._valuesEnd=r}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},s.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},s.prototype._setupProperties=function(e,t,n,r,o){for(var c in n){var l=e[c],h=Array.isArray(l),f=h?"array":typeof l,d=!h&&Array.isArray(n[c]);if(!(f==="undefined"||f==="function")){if(d){var p=n[c];if(p.length===0)continue;for(var m=[l],v=0,M=p.length;v<M;v+=1){var E=this._handleRelativeValue(l,p[v]);if(isNaN(E)){d=!1,console.warn("Found invalid interpolation list. Skipping.");break}m.push(E)}d&&(n[c]=m)}if((f==="object"||h)&&l&&!d){t[c]=h?[]:{};var x=l;for(var _ in x)t[c][_]=x[_];r[c]=h?[]:{};var p=n[c];if(!this._isDynamic){var P={};for(var _ in p)P[_]=p[_];n[c]=p=P}this._setupProperties(x,t[c],p,r[c],o)}else(typeof t[c]>"u"||o)&&(t[c]=l),h||(t[c]*=1),d?r[c]=n[c].slice().reverse():r[c]=t[c]||0}}},s.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},s.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},s.prototype.pause=function(e){return e===void 0&&(e=jo()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},s.prototype.resume=function(e){return e===void 0&&(e=jo()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},s.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},s.prototype.group=function(e){return e===void 0&&(e=hh),this._group=e,this},s.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},s.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},s.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},s.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},s.prototype.easing=function(e){return e===void 0&&(e=er.Linear.None),this._easingFunction=e,this},s.prototype.interpolation=function(e){return e===void 0&&(e=uh.Linear),this._interpolationFunction=e,this},s.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},s.prototype.onStart=function(e){return this._onStartCallback=e,this},s.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},s.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},s.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},s.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},s.prototype.onStop=function(e){return this._onStopCallback=e,this},s.prototype.update=function(e,t){var n;if(e===void 0&&(e=jo()),t===void 0&&(t=!0),this._isPaused)return!0;var r=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>r)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var o=e-this._startTime,c=this._duration+((n=this._repeatDelayTime)!==null&&n!==void 0?n:this._delayTime),l=this._duration+this._repeat*c,h=this._calculateElapsedPortion(o,c,l),f=this._easingFunction(h),d=this._calculateCompletionStatus(o,c);if(d==="repeat"&&this._processRepetition(o,c),this._updateProperties(this._object,this._valuesStart,this._valuesEnd,f),d==="about-to-repeat"&&this._processRepetition(o,c),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),d==="repeat"||d==="about-to-repeat")this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1;else if(d==="completed"){this._isPlaying=!1,this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var p=0,m=this._chainedTweens.length;p<m;p++)this._chainedTweens[p].start(this._startTime+this._duration,!1)}return d!=="completed"},s.prototype._calculateElapsedPortion=function(e,t,n){if(this._duration===0||e>n)return 1;var r=e%t,o=Math.min(r/this._duration,1);return o===0&&e!==0&&e%this._duration===0?1:o},s.prototype._calculateCompletionStatus=function(e,t){return this._duration!==0&&e<this._duration?"playing":this._repeat<=0?"completed":e===this._duration?"about-to-repeat":"repeat"},s.prototype._processRepetition=function(e,t){var n=Math.min(Math.trunc((e-this._duration)/t)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=n);for(var r in this._valuesStartRepeat){var o=this._valuesEnd[r];!this._yoyo&&typeof o=="string"&&(this._valuesStartRepeat[r]=this._valuesStartRepeat[r]+parseFloat(o)),this._yoyo&&this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r]}this._yoyo&&(this._reversed=!this._reversed),this._startTime+=t*n},s.prototype._updateProperties=function(e,t,n,r){for(var o in n)if(t[o]!==void 0){var c=t[o]||0,l=n[o],h=Array.isArray(e[o]),f=Array.isArray(l),d=!h&&f;d?e[o]=this._interpolationFunction(l,r):typeof l=="object"&&l?this._updateProperties(e[o],c,l,r):(l=this._handleRelativeValue(c,l),typeof l=="number"&&(e[o]=c+(l-c)*r))}},s.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},s.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},s}();t_.nextId;var Pi=hh;Pi.getAll.bind(Pi);Pi.removeAll.bind(Pi);Pi.add.bind(Pi);Pi.remove.bind(Pi);var DL=Pi.update.bind(Pi);const Lc={enableDamping:!0,dampingFactor:.04},Jo=class Jo extends LL{constructor(e,t,n,r=Lc){super(e,t.domElement),this.last=null,this.animating=!1,this.locked=!1,this.stopMoveTo=()=>{},this.stopRevertLast=()=>{},this._removePreRenderCallback=()=>{},this.preRenderCallback=()=>{this.locked||this.update()},this._animationSystem=n,this.domElement=t.domElement,this.object=e;const o=t.AddPreRenderCallback(()=>{this.preRenderCallback()});this._removePreRenderCallback=()=>{t.RemovePreRenderCallback(o)},this.enableDamping=r.enableDamping||Lc.enableDamping,this.dampingFactor=r.dampingFactor||Lc.dampingFactor,this.object.position.set(0,2,2),this.target.copy({x:0,y:.5,z:0}),this.update()}Dispose(){this._removePreRenderCallback(),this.dispose()}ComputeEncompassingView(e){const t=e.getCenter(new F),n=e.getSize(new F),r=Math.max(n.x,n.y,n.z)*1.25;return{position:this.object.position.clone().normalize().multiplyScalar(r),target:t}}ZoomIn(e){const t=e||Jo.DEFAULT_ZOOM_FACTOR,{minDistance:n,maxDistance:r}=this;this.minDistance=this.maxDistance=Ri.clamp(this.getDistance()-t,n+t,r-t),this.update(),this.minDistance=n,this.maxDistance=r}ZoomOut(e){const t=e||Jo.DEFAULT_ZOOM_FACTOR,{minDistance:n,maxDistance:r}=this;this.minDistance=this.maxDistance=Ri.clamp(this.getDistance()+t,n+t,r-t),this.update(),this.minDistance=n,this.maxDistance=r}MoveTo(e,t,n,r){if(this.animating)return;const o=e||this.object.position.clone(),c=t||this.target.clone();this.stopRevertLast(),this.locked||(this.last={pos:this.object.position.clone(),target:this.target.clone()}),this.animating=n>0,this.locked=r,this.enabled=!1;const l=this._animationSystem.Animate(this.object.position).to(o,n).easing(er.Quadratic.Out).start(),h=this._animationSystem.Animate(this.target).to(c,n).easing(er.Quadratic.Out).onUpdate(()=>{this.object.lookAt(this.target)}).onComplete(()=>{this.animating=!1,this.enabled=!r}).start();this.stopMoveTo=()=>{l.stop(),h.stop()}}RevertLast(e){if(this.animating||!this.locked)return;this.stopMoveTo(),this.animating=e>0,this.enabled=!1;const{pos:t,target:n}=this.last,r=this._animationSystem.Animate(this.object.position).to(t,e).easing(er.Quadratic.Out).start(),o=this._animationSystem.Animate(this.target).to(n,e).easing(er.Quadratic.Out).onUpdate(()=>{this.object.lookAt(this.target)}).onComplete(()=>{this.animating=!1,this.locked=!1,this.enabled=!0}).start();this.stopRevertLast=()=>{r.stop(),o.stop()}}};Jo.DEFAULT_ZOOM_FACTOR=1;let fh=Jo;const Uh=class Uh{get selectTool(){if(!this._selectTool){const e=require("./select/SelectTool.ts").DIVESelectTool;this._selectTool=new e(this._scene,this._controller)}return this._selectTool}constructor(e,t){this._scene=e,this._controller=t,this._selectTool=null,this._activeTool=null}Dispose(){this.removeEventListeners()}GetActiveTool(){return this._activeTool}UseTool(e){var t;switch((t=this._activeTool)==null||t.Deactivate(),e){case"select":{this.addEventListeners(),this.selectTool.Activate(),this._activeTool=this.selectTool;break}case"none":{this.removeEventListeners(),this._activeTool=null;break}default:console.warn(`DIVEToolBox.UseTool: Unknown tool: ${e}`)}}SetGizmoMode(e){this.selectTool.SetGizmoMode(e)}SetGizmoVisibility(e){this.selectTool.SetGizmoVisibility(e)}SetGizmoScaleLinked(e){this.selectTool.SetGizmoScaleLinked(e)}onPointerMove(e){var t;(t=this._activeTool)==null||t.onPointerMove(e)}onPointerDown(e){var t;(t=this._activeTool)==null||t.onPointerDown(e)}onPointerUp(e){var t;(t=this._activeTool)==null||t.onPointerUp(e)}onWheel(e){var t;(t=this._activeTool)==null||t.onWheel(e)}addEventListeners(){this._controller.domElement.addEventListener("pointermove",e=>this.onPointerMove(e)),this._controller.domElement.addEventListener("pointerdown",e=>this.onPointerDown(e)),this._controller.domElement.addEventListener("pointerup",e=>this.onPointerUp(e)),this._controller.domElement.addEventListener("wheel",e=>this.onWheel(e))}removeEventListeners(){this._controller.domElement.removeEventListener("pointermove",e=>this.onPointerMove(e)),this._controller.domElement.removeEventListener("pointerdown",e=>this.onPointerDown(e)),this._controller.domElement.removeEventListener("pointerup",e=>this.onPointerUp(e)),this._controller.domElement.removeEventListener("wheel",e=>this.onWheel(e))}};Uh.DefaultTool="select";let dh=Uh;class UL{constructor(e){this._renderer=e,this._rendererCallbackId=this._renderer.AddPreRenderCallback(()=>{this.Update()})}Dispose(){this._renderer.RemovePreRenderCallback(this._rendererCallbackId)}Update(){DL()}Animate(e){return new IL(e)}}function NL(s,e,t){return e=kc(e),WL(s,n_()?Reflect.construct(e,t||[],kc(s).constructor):e.apply(s,t))}function n_(){try{var s=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(n_=function(){return!!s})()}function OL(s,e){var t=s==null?null:typeof Symbol<"u"&&s[Symbol.iterator]||s["@@iterator"];if(t!=null){var n,r,o,c,l=[],h=!0,f=!1;try{if(o=(t=t.call(s)).next,e===0){if(Object(t)!==t)return;h=!1}else for(;!(h=(n=o.call(t)).done)&&(l.push(n.value),l.length!==e);h=!0);}catch(d){f=!0,r=d}finally{try{if(!h&&t.return!=null&&(c=t.return(),Object(c)!==c))return}finally{if(f)throw r}}return l}}function FL(s,e){if(typeof s!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var n=t.call(s,e);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}function BL(s){var e=FL(s,"string");return typeof e=="symbol"?e:String(e)}function kL(s,e){if(!(s instanceof e))throw new TypeError("Cannot call a class as a function")}function zL(s,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(s,BL(n.key),n)}}function HL(s,e,t){return e&&zL(s.prototype,e),Object.defineProperty(s,"prototype",{writable:!1}),s}function GL(s,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");s.prototype=Object.create(e&&e.prototype,{constructor:{value:s,writable:!0,configurable:!0}}),Object.defineProperty(s,"prototype",{writable:!1}),e&&ph(s,e)}function kc(s){return kc=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},kc(s)}function ph(s,e){return ph=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},ph(s,e)}function VL(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function WL(s,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return VL(s)}function tg(s,e){return qL(s)||OL(s,e)||i_(s,e)||KL()}function wc(s){return XL(s)||YL(s)||i_(s)||jL()}function XL(s){if(Array.isArray(s))return mh(s)}function qL(s){if(Array.isArray(s))return s}function YL(s){if(typeof Symbol<"u"&&s[Symbol.iterator]!=null||s["@@iterator"]!=null)return Array.from(s)}function i_(s,e){if(s){if(typeof s=="string")return mh(s,e);var t=Object.prototype.toString.call(s).slice(8,-1);if(t==="Object"&&s.constructor&&(t=s.constructor.name),t==="Map"||t==="Set")return Array.from(s);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return mh(s,e)}}function mh(s,e){(e==null||e>s.length)&&(e=s.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=s[t];return n}function jL(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function KL(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Vs=typeof window<"u"&&window.THREE?window.THREE:{LinearFilter:Nn,Sprite:D1,SpriteMaterial:kg,SRGBColorSpace:cn,Texture:Qt},Zu=function(s){GL(e,s);function e(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:10,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"rgba(255, 255, 255, 1)";return kL(this,e),t=NL(this,e,[new Vs.SpriteMaterial]),t._text="".concat(n),t._textHeight=r,t._color=o,t._backgroundColor=!1,t._padding=0,t._borderWidth=0,t._borderRadius=0,t._borderColor="white",t._strokeWidth=0,t._strokeColor="white",t._fontFace="system-ui",t._fontSize=90,t._fontWeight="normal",t._canvas=document.createElement("canvas"),t._genCanvas(),t}return HL(e,[{key:"text",get:function(){return this._text},set:function(n){this._text=n,this._genCanvas()}},{key:"textHeight",get:function(){return this._textHeight},set:function(n){this._textHeight=n,this._genCanvas()}},{key:"color",get:function(){return this._color},set:function(n){this._color=n,this._genCanvas()}},{key:"backgroundColor",get:function(){return this._backgroundColor},set:function(n){this._backgroundColor=n,this._genCanvas()}},{key:"padding",get:function(){return this._padding},set:function(n){this._padding=n,this._genCanvas()}},{key:"borderWidth",get:function(){return this._borderWidth},set:function(n){this._borderWidth=n,this._genCanvas()}},{key:"borderRadius",get:function(){return this._borderRadius},set:function(n){this._borderRadius=n,this._genCanvas()}},{key:"borderColor",get:function(){return this._borderColor},set:function(n){this._borderColor=n,this._genCanvas()}},{key:"fontFace",get:function(){return this._fontFace},set:function(n){this._fontFace=n,this._genCanvas()}},{key:"fontSize",get:function(){return this._fontSize},set:function(n){this._fontSize=n,this._genCanvas()}},{key:"fontWeight",get:function(){return this._fontWeight},set:function(n){this._fontWeight=n,this._genCanvas()}},{key:"strokeWidth",get:function(){return this._strokeWidth},set:function(n){this._strokeWidth=n,this._genCanvas()}},{key:"strokeColor",get:function(){return this._strokeColor},set:function(n){this._strokeColor=n,this._genCanvas()}},{key:"_genCanvas",value:function(){var n=this,r=this._canvas,o=r.getContext("2d"),c=Array.isArray(this.borderWidth)?this.borderWidth:[this.borderWidth,this.borderWidth],l=c.map(function(D){return D*n.fontSize*.1}),h=Array.isArray(this.borderRadius)?this.borderRadius:[this.borderRadius,this.borderRadius,this.borderRadius,this.borderRadius],f=h.map(function(D){return D*n.fontSize*.1}),d=Array.isArray(this.padding)?this.padding:[this.padding,this.padding],p=d.map(function(D){return D*n.fontSize*.1}),m=this.text.split(`
`),v="".concat(this.fontWeight," ").concat(this.fontSize,"px ").concat(this.fontFace);o.font=v;var M=Math.max.apply(Math,wc(m.map(function(D){return o.measureText(D).width}))),E=this.fontSize*m.length;if(r.width=M+l[0]*2+p[0]*2,r.height=E+l[1]*2+p[1]*2,this.borderWidth){if(o.strokeStyle=this.borderColor,l[0]){var x=l[0]/2;o.lineWidth=l[0],o.beginPath(),o.moveTo(x,f[0]),o.lineTo(x,r.height-f[3]),o.moveTo(r.width-x,f[1]),o.lineTo(r.width-x,r.height-f[2]),o.stroke()}if(l[1]){var _=l[1]/2;o.lineWidth=l[1],o.beginPath(),o.moveTo(Math.max(l[0],f[0]),_),o.lineTo(r.width-Math.max(l[0],f[1]),_),o.moveTo(Math.max(l[0],f[3]),r.height-_),o.lineTo(r.width-Math.max(l[0],f[2]),r.height-_),o.stroke()}if(this.borderRadius){var P=Math.max.apply(Math,wc(l)),b=P/2;o.lineWidth=P,o.beginPath(),[!!f[0]&&[f[0],b,b,f[0]],!!f[1]&&[r.width-f[1],r.width-b,b,f[1]],!!f[2]&&[r.width-f[2],r.width-b,r.height-b,r.height-f[2]],!!f[3]&&[f[3],b,r.height-b,r.height-f[3]]].filter(function(D){return D}).forEach(function(D){var V=tg(D,4),C=V[0],w=V[1],X=V[2],J=V[3];o.moveTo(C,X),o.quadraticCurveTo(w,X,w,J)}),o.stroke()}}this.backgroundColor&&(o.fillStyle=this.backgroundColor,this.borderRadius?(o.beginPath(),o.moveTo(l[0],f[0]),[[l[0],f[0],r.width-f[1],l[1],l[1],l[1]],[r.width-l[0],r.width-l[0],r.width-l[0],l[1],f[1],r.height-f[2]],[r.width-l[0],r.width-f[2],f[3],r.height-l[1],r.height-l[1],r.height-l[1]],[l[0],l[0],l[0],r.height-l[1],r.height-f[3],f[0]]].forEach(function(D){var V=tg(D,6),C=V[0],w=V[1],X=V[2],J=V[3],k=V[4],te=V[5];o.quadraticCurveTo(C,J,w,k),o.lineTo(X,te)}),o.closePath(),o.fill()):o.fillRect(l[0],l[1],r.width-l[0]*2,r.height-l[1]*2)),o.translate.apply(o,wc(l)),o.translate.apply(o,wc(p)),o.font=v,o.fillStyle=this.color,o.textBaseline="bottom";var I=this.strokeWidth>0;I&&(o.lineWidth=this.strokeWidth*this.fontSize/10,o.strokeStyle=this.strokeColor),m.forEach(function(D,V){var C=(M-o.measureText(D).width)/2,w=(V+1)*n.fontSize;I&&o.strokeText(D,C,w),o.fillText(D,C,w)}),this.material.map&&this.material.map.dispose();var z=this.material.map=new Vs.Texture(r);z.minFilter=Vs.LinearFilter,z.colorSpace=Vs.SRGBColorSpace,z.needsUpdate=!0;var O=this.textHeight*m.length+c[1]*2+d[1]*2;this.scale.set(O*r.width/r.height,O,0)}},{key:"clone",value:function(){return new this.constructor(this.text,this.textHeight,this.color).copy(this)}},{key:"copy",value:function(n){return Vs.Sprite.prototype.copy.call(this,n),this.color=n.color,this.backgroundColor=n.backgroundColor,this.padding=n.padding,this.borderWidth=n.borderWidth,this.borderColor=n.borderColor,this.fontFace=n.fontFace,this.fontSize=n.fontSize,this.fontWeight=n.fontWeight,this.strokeWidth=n.strokeWidth,this.strokeColor=n.strokeColor,this}}]),e}(Vs.Sprite);class ng extends Vc{constructor(e,t,n){super(-1,1,1,-1,.1,100),this.layers.mask=Go,this.axesHelper=new MC(.5),this.axesHelper.layers.mask=Go,this.axesHelper.material.depthTest=!1,this.axesHelper.position.set(0,0,-1),this.axesHelper.setColors(new Ue(AC),new Ue(wC),new Ue(RC));const r=new Zu("X",.2,Zg),o=new Zu("Y",.2,$g),c=new Zu("Z",.2,Jg);r.layers.mask=Go,o.layers.mask=Go,c.layers.mask=Go,r.position.set(.7,0,0),o.position.set(0,.7,0),c.position.set(0,0,.7),this.axesHelper.add(r),this.axesHelper.add(o),this.axesHelper.add(c),this.add(this.axesHelper),this._renderer=e,this._scene=t,this._scene.add(this);const l=new It;this._renderCallbackId=e.AddPostRenderCallback(()=>{const h=t.background;t.background=null,e.getViewport(l),e.setViewport(0,0,150,150),e.autoClear=!1,this.SetFromCameraMatrix(n.object.matrix),e.render(t,this),e.setViewport(l),e.autoClear=!0,t.background=h})}Dispose(){this._renderer.RemovePostRenderCallback(this._renderCallbackId),this._scene.remove(this)}SetFromCameraMatrix(e){this.axesHelper.rotation.setFromRotationMatrix(new tt().extractRotation(e).invert())}}const gh=(s,e)=>{if(Object.keys(s).length===0&&Object.keys(e).length===0)return{};if(typeof s!="object"||typeof e!="object")return e;let t={};return Object.keys(e).forEach(n=>{if(!Object.keys(s).includes(n)){t={...t,[n]:e[n]};return}if(Array.isArray(e[n])){if(!Array.isArray(s[n])){t={...t,[n]:e[n]};return}const r=s[n],o=e[n];if(r.length===0&&o.length===0){t={...t};return}if(r.length!==o.length){t={...t,[n]:e[n]};return}const c=[];if(o.forEach((l,h)=>{const f=gh(r[h],o[h]);Object.keys(f).length&&c.push(o[h])}),Object.keys(c).length){t={...t,[n]:c};return}return}if(typeof e[n]=="object"){if(typeof s[n]!="object"){t={...t,[n]:e[n]};return}const r=gh(s[n],e[n]);if(Object.keys(r).length){t={...t,[n]:r};return}}s[n]!==e[n]&&(t={...t,[n]:e[n]})}),t},zc=class zc{static GetSystem(){const e=navigator.platform;return/Android/.test(navigator.userAgent)?"Android":/iPhone|iPad|iPod/.test(navigator.userAgent)?"iOS":e.startsWith("Win")?"Windows":e.startsWith("Mac")?"MacOS":e.startsWith("Linux")?"Linux":"Unknown"}static async GetSupportsWebXR(){if(this._supportsWebXR!==null)return this._supportsWebXR;if(!navigator.xr)return this._supportsWebXR=!1,window.isSecureContext===!1?this._webXRUnsupportedReason=1:this._webXRUnsupportedReason=0,this._supportsWebXR;try{const e=await navigator.xr.isSessionSupported("immersive-ar");e||(this._webXRUnsupportedReason=2),this._supportsWebXR=e}catch{this._supportsWebXR=!1,this._webXRUnsupportedReason=3}return this._supportsWebXR}static GetWebXRUnsupportedReason(){return this._supportsWebXR===null?(console.log("WebXR support has not been checked yet."),null):this._webXRUnsupportedReason}static GetSupportsARQuickLook(){if(document.createElement("a").relList.supports("ar"))return!0;const t=navigator.userAgent;if(!(/iPad|iPhone|iPod/.test(t)&&!window.MSStream))return!1;const r=t.match(/OS (\d+)_/);return!r||r.length<2||parseInt(r[1],10)<12?!1:!!/^((?!chrome|android).)*safari|CriOS|FxiOS/i.test(t)}static get isMobile(){return this.GetSystem()==="Android"||this.GetSystem()==="iOS"}static get isDesktop(){return!this.isMobile}static async GetIsARCapable(){return this.GetSupportsARQuickLook()?!0:await this.GetSupportsWebXR()}};zc._supportsWebXR=null,zc._webXRUnsupportedReason=null;let _h=zc;const ZL="1.18.5",$L={version:ZL};function Ii(s,e){const t=(s+"e").split("e");return+(t[0]+"e"+(+t[1]+(e||0)))}function JL(s,e=0){const t=Ii(s,+e);return Ii(Math.ceil(t),-e)}function QL(s,e=0){const t=Ii(s,+e);return Ii(Math.floor(t),-e)}function r_(s,e=0){if(s<0)return-r_(-s,e);const t=Ii(s,+e);return Ii(Math.round(t),-e)}function eP(s,e,t){return Math.atan2(s.clone().cross(e).dot(t),e.clone().dot(s))}function tP(s,e=0){const t=Ii(s,+e);return Ii(Math.round(t),-e).toFixed(e)}function nP(s,e=0){const t=Ii(s,+e);return Ii(Math.trunc(t),-e)}function iP(s){return(Ri.radToDeg(s)+360)%360}function rP(s){return Ri.degToRad(s)}const sP={ceilExp:JL,floorExp:QL,roundExp:r_,toFixedExp:tP,truncateExp:nP,signedAngleTo:eP,radToDeg:iP,degToRad:rP},s_={autoResize:!0,displayAxes:!1,renderer:Zr,perspectiveCamera:Yo,orbitControls:Lc};class jc{static QuickView(e,t){const n=new jc(t);n.Communication.PerformAction("SET_CAMERA_TRANSFORM",{position:{x:0,y:2,z:2},target:{x:0,y:.5,z:0}});const r=Ri.generateUUID();n.Communication.PerformAction("ADD_OBJECT",{entityType:"light",type:"scene",name:"light",id:r,enabled:!0,visible:!0,intensity:1,color:16777215});const o=Ri.generateUUID();return n.Communication.Subscribe("MODEL_LOADED",c=>{if(c.id!==o)return;const l=n.Communication.PerformAction("COMPUTE_ENCOMPASSING_VIEW",{});n.Communication.PerformAction("SET_CAMERA_TRANSFORM",{position:l.position,target:l.target})}),n.Communication.PerformAction("ADD_OBJECT",{entityType:"model",name:"object",id:o,position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},uri:e,visible:!0,loaded:!1}),n.Communication.PerformAction("UPDATE_SCENE",{backgroundColor:16777215,gridEnabled:!1,floorColor:16777215}),n}get Communication(){return this.communication}get Canvas(){return this.renderer.domElement}get Info(){return _h}set Settings(e){var n;const t=gh(this._settings,e);t.renderer&&(this.renderer=new Wm(this._settings.renderer)),t.perspectiveCamera&&(t.perspectiveCamera.fov!==void 0&&(this.perspectiveCamera.fov=t.perspectiveCamera.fov),t.perspectiveCamera.near!==void 0&&(this.perspectiveCamera.near=t.perspectiveCamera.near),t.perspectiveCamera.far!==void 0&&(this.perspectiveCamera.far=t.perspectiveCamera.far),this.perspectiveCamera.OnResize(this.renderer.domElement.width,this.renderer.domElement.height)),t.orbitControls&&(t.orbitControls.enableDamping!==void 0&&(this.orbitControls.enableDamping=t.orbitControls.enableDamping),t.orbitControls.dampingFactor!==void 0&&(this.orbitControls.dampingFactor=t.orbitControls.dampingFactor)),t.autoResize!==this._settings.autoResize&&(t.autoResize?this.addResizeObserver():this.removeResizeObserver()),t.displayAxes?this.axisCamera=new ng(this.renderer,this.scene,this.orbitControls):((n=this.axisCamera)==null||n.Dispose(),this.axisCamera=null),Object.assign(this._settings,e)}constructor(e){this._settings={...s_,...e!==void 0?e:{}},this._resizeObserverId="",this._width=0,this._height=0,this.renderer=new Wm(this._settings.renderer),this.scene=new RL,this.perspectiveCamera=new lh(this._settings.perspectiveCamera),this.animationSystem=new UL(this.renderer),this.orbitControls=new fh(this.perspectiveCamera,this.renderer,this.animationSystem,this._settings.orbitControls),this.toolbox=new dh(this.scene,this.orbitControls),this.communication=new On(this.renderer,this.scene,this.orbitControls,this.toolbox),this._settings.displayAxes?this.axisCamera=new ng(this.renderer,this.scene,this.orbitControls):this.axisCamera=null,this._settings.autoResize&&this.addResizeObserver(),this.renderer.StartRenderer(this.scene,this.perspectiveCamera),window.DIVE={PrintScene:()=>{console.log(this.scene)}},console.log(`DIVE ${$L.version} initialized successfully!`),console.log(`
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

        `)}Dispose(){var e;this.removeResizeObserver(),this.renderer.Dispose(),this.orbitControls.Dispose(),(e=this.axisCamera)==null||e.Dispose(),this.animationSystem.Dispose(),this.toolbox.Dispose(),this.communication.DestroyInstance()}OnResize(e,t){this.renderer.OnResize(e,t),this.perspectiveCamera.OnResize(e,t)}addResizeObserver(){this._resizeObserverId=this.renderer.AddPreRenderCallback(()=>{const e=this.renderer.domElement.parentElement;if(!e)return;const{clientWidth:t,clientHeight:n}=e;t===this._width&&n===this._height||(this.OnResize(t,n),this._width=t,this._height=n)})}removeResizeObserver(){this.renderer.RemovePreRenderCallback(this._resizeObserverId)}}exports.DIVE=jc;exports.DIVECommunication=On;exports.DIVEDefaultSettings=s_;exports.DIVEMath=sP;exports.default=jc;
//# sourceMappingURL=dive.cjs.map
