"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ef="163",Bs={ROTATE:0,DOLLY:1,PAN:2},zs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},eb=0,Up=1,tb=2,qg=1,Kg=2,mr=3,Yi=0,Xn=1,Ai=2,Wr=0,fo=1,Np=2,Fp=3,Bp=4,nb=5,ps=100,ib=101,rb=102,sb=103,ob=104,ab=200,cb=201,lb=202,ub=203,Lh=204,Ih=205,hb=206,fb=207,db=208,pb=209,mb=210,gb=211,_b=212,vb=213,xb=214,yb=0,Sb=1,Mb=2,ll=3,Eb=4,bb=5,Tb=6,Ab=7,Zg=0,wb=1,Rb=2,yr=0,Cb=1,Pb=2,Lb=3,Ib=4,Db=5,Ob=6,Ub=7,zp="attached",Nb="detached",$g=300,_o=301,vo=302,Dh=303,Oh=304,xl=306,_s=1e3,gr=1001,ba=1002,zn=1003,Jg=1004,ha=1005,Wn=1006,rl=1007,_r=1008,Xr=1009,Fb=1010,Bb=1011,Qg=1012,e_=1013,xo=1014,Vi=1015,ul=1016,t_=1017,n_=1018,Ca=1020,zb=35902,kb=1021,Hb=1022,Ci=1023,Gb=1024,Vb=1025,po=1026,Ta=1027,i_=1028,r_=1029,Wb=1030,s_=1031,o_=1033,Fu=33776,Bu=33777,zu=33778,ku=33779,kp=35840,Hp=35841,Gp=35842,Vp=35843,a_=36196,Wp=37492,Xp=37496,Yp=37808,jp=37809,qp=37810,Kp=37811,Zp=37812,$p=37813,Jp=37814,Qp=37815,em=37816,tm=37817,nm=37818,im=37819,rm=37820,sm=37821,Hu=36492,om=36494,am=36495,Xb=36283,cm=36284,lm=36285,um=36286,Aa=2300,yo=2301,Gu=2302,hm=2400,fm=2401,dm=2402,Yb=2500,jb=0,c_=1,Uh=2,qb=3200,Kb=3201,l_=0,Zb=1,Fn="",ln="srgb",yn="srgb-linear",tf="display-p3",yl="display-p3-linear",hl="linear",Gt="srgb",fl="rec709",dl="p3",ks=7680,pm=519,$b=512,Jb=513,Qb=514,u_=515,eT=516,tT=517,nT=518,iT=519,Nh=35044,mm="300 es",vr=2e3,pl=2001;class ys{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let o=0,c=r.length;o<c;o++)r[o].call(this,e);e.target=null}}}const Tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let gm=1234567;const xa=Math.PI/180,So=180/Math.PI;function Pi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tn[i&255]+Tn[i>>8&255]+Tn[i>>16&255]+Tn[i>>24&255]+"-"+Tn[e&255]+Tn[e>>8&255]+"-"+Tn[e>>16&15|64]+Tn[e>>24&255]+"-"+Tn[t&63|128]+Tn[t>>8&255]+"-"+Tn[t>>16&255]+Tn[t>>24&255]+Tn[n&255]+Tn[n>>8&255]+Tn[n>>16&255]+Tn[n>>24&255]).toLowerCase()}function xn(i,e,t){return Math.max(e,Math.min(t,i))}function nf(i,e){return(i%e+e)%e}function rT(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function sT(i,e,t){return i!==e?(t-i)/(e-i):0}function ya(i,e,t){return(1-t)*i+t*e}function oT(i,e,t,n){return ya(i,e,1-Math.exp(-t*n))}function aT(i,e=1){return e-Math.abs(nf(i,e*2)-e)}function cT(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function lT(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function uT(i,e){return i+Math.floor(Math.random()*(e-i+1))}function hT(i,e){return i+Math.random()*(e-i)}function fT(i){return i*(.5-Math.random())}function dT(i){i!==void 0&&(gm=i);let e=gm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function pT(i){return i*xa}function mT(i){return i*So}function gT(i){return(i&i-1)===0&&i!==0}function _T(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function vT(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function xT(i,e,t,n,r){const o=Math.cos,c=Math.sin,l=o(t/2),h=c(t/2),f=o((e+n)/2),d=c((e+n)/2),p=o((e-n)/2),m=c((e-n)/2),x=o((n-e)/2),M=c((n-e)/2);switch(r){case"XYX":i.set(l*d,h*p,h*m,l*f);break;case"YZY":i.set(h*m,l*d,h*p,l*f);break;case"ZXZ":i.set(h*p,h*m,l*d,l*f);break;case"XZX":i.set(l*d,h*M,h*x,l*f);break;case"YXY":i.set(h*x,l*d,h*M,l*f);break;case"ZYZ":i.set(h*M,h*x,l*d,l*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function wi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ji={DEG2RAD:xa,RAD2DEG:So,generateUUID:Pi,clamp:xn,euclideanModulo:nf,mapLinear:rT,inverseLerp:sT,lerp:ya,damp:oT,pingpong:aT,smoothstep:cT,smootherstep:lT,randInt:uT,randFloat:hT,randFloatSpread:fT,seededRandom:dT,degToRad:pT,radToDeg:mT,isPowerOfTwo:gT,ceilPowerOfTwo:_T,floorPowerOfTwo:vT,setQuaternionFromProperEuler:xT,normalize:Lt,denormalize:wi};class Pe{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),o=this.x-e.x,c=this.y-e.y;return this.x=o*n-c*r+e.x,this.y=o*r+c*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ht{constructor(e,t,n,r,o,c,l,h,f){ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,c,l,h,f)}set(e,t,n,r,o,c,l,h,f){const d=this.elements;return d[0]=e,d[1]=r,d[2]=l,d[3]=t,d[4]=o,d[5]=h,d[6]=n,d[7]=c,d[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,c=n[0],l=n[3],h=n[6],f=n[1],d=n[4],p=n[7],m=n[2],x=n[5],M=n[8],A=r[0],v=r[3],_=r[6],C=r[1],b=r[4],L=r[7],k=r[2],U=r[5],O=r[8];return o[0]=c*A+l*C+h*k,o[3]=c*v+l*b+h*U,o[6]=c*_+l*L+h*O,o[1]=f*A+d*C+p*k,o[4]=f*v+d*b+p*U,o[7]=f*_+d*L+p*O,o[2]=m*A+x*C+M*k,o[5]=m*v+x*b+M*U,o[8]=m*_+x*L+M*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8];return t*c*d-t*l*f-n*o*d+n*l*h+r*o*f-r*c*h}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8],p=d*c-l*f,m=l*h-d*o,x=f*o-c*h,M=t*p+n*m+r*x;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/M;return e[0]=p*A,e[1]=(r*f-d*n)*A,e[2]=(l*n-r*c)*A,e[3]=m*A,e[4]=(d*t-r*h)*A,e[5]=(r*o-l*t)*A,e[6]=x*A,e[7]=(n*h-f*t)*A,e[8]=(c*t-n*o)*A,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,o,c,l){const h=Math.cos(o),f=Math.sin(o);return this.set(n*h,n*f,-n*(h*c+f*l)+c+e,-r*f,r*h,-r*(-f*c+h*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(Vu.makeScale(e,t)),this}rotate(e){return this.premultiply(Vu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vu=new ht;function h_(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function wa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function yT(){const i=wa("canvas");return i.style.display="block",i}const _m={};function f_(i){i in _m||(_m[i]=!0,console.warn(i))}const vm=new ht().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),xm=new ht().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Mc={[yn]:{transfer:hl,primaries:fl,toReference:i=>i,fromReference:i=>i},[ln]:{transfer:Gt,primaries:fl,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[yl]:{transfer:hl,primaries:dl,toReference:i=>i.applyMatrix3(xm),fromReference:i=>i.applyMatrix3(vm)},[tf]:{transfer:Gt,primaries:dl,toReference:i=>i.convertSRGBToLinear().applyMatrix3(xm),fromReference:i=>i.applyMatrix3(vm).convertLinearToSRGB()}},ST=new Set([yn,yl]),Ct={enabled:!0,_workingColorSpace:yn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!ST.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Mc[e].toReference,r=Mc[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Mc[i].primaries},getTransfer:function(i){return i===Fn?hl:Mc[i].transfer}};function mo(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Wu(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Hs;class MT{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Hs===void 0&&(Hs=wa("canvas")),Hs.width=e.width,Hs.height=e.height;const n=Hs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Hs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=wa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),o=r.data;for(let c=0;c<o.length;c++)o[c]=mo(o[c]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mo(t[n]/255)*255):t[n]=mo(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ET=0;class d_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ET++}),this.uuid=Pi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let c=0,l=r.length;c<l;c++)r[c].isDataTexture?o.push(Xu(r[c].image)):o.push(Xu(r[c]))}else o=Xu(r);n.url=o}return t||(e.images[this.uuid]=n),n}}function Xu(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?MT.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bT=0;class un extends ys{constructor(e=un.DEFAULT_IMAGE,t=un.DEFAULT_MAPPING,n=gr,r=gr,o=Wn,c=_r,l=Ci,h=Xr,f=un.DEFAULT_ANISOTROPY,d=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bT++}),this.uuid=Pi(),this.name="",this.source=new d_(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=c,this.anisotropy=f,this.format=l,this.internalFormat=null,this.type=h,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$g)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _s:e.x=e.x-Math.floor(e.x);break;case gr:e.x=e.x<0?0:1;break;case ba:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _s:e.y=e.y-Math.floor(e.y);break;case gr:e.y=e.y<0?0:1;break;case ba:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=$g;un.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,t=0,n=0,r=1){Dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=this.w,c=e.elements;return this.x=c[0]*t+c[4]*n+c[8]*r+c[12]*o,this.y=c[1]*t+c[5]*n+c[9]*r+c[13]*o,this.z=c[2]*t+c[6]*n+c[10]*r+c[14]*o,this.w=c[3]*t+c[7]*n+c[11]*r+c[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,o;const h=e.elements,f=h[0],d=h[4],p=h[8],m=h[1],x=h[5],M=h[9],A=h[2],v=h[6],_=h[10];if(Math.abs(d-m)<.01&&Math.abs(p-A)<.01&&Math.abs(M-v)<.01){if(Math.abs(d+m)<.1&&Math.abs(p+A)<.1&&Math.abs(M+v)<.1&&Math.abs(f+x+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(f+1)/2,L=(x+1)/2,k=(_+1)/2,U=(d+m)/4,O=(p+A)/4,I=(M+v)/4;return b>L&&b>k?b<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(b),r=U/n,o=O/n):L>k?L<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(L),n=U/r,o=I/r):k<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(k),n=O/o,r=I/o),this.set(n,r,o,t),this}let C=Math.sqrt((v-M)*(v-M)+(p-A)*(p-A)+(m-d)*(m-d));return Math.abs(C)<.001&&(C=1),this.x=(v-M)/C,this.y=(p-A)/C,this.z=(m-d)/C,this.w=Math.acos((f+x+_-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class TT extends ys{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new un(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const c=n.count;for(let l=0;l<c;l++)this.textures[l]=o.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new d_(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vs extends TT{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class p_ extends un{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=zn,this.minFilter=zn,this.wrapR=gr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class AT extends un{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=zn,this.minFilter=zn,this.wrapR=gr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class on{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,o,c,l){let h=n[r+0],f=n[r+1],d=n[r+2],p=n[r+3];const m=o[c+0],x=o[c+1],M=o[c+2],A=o[c+3];if(l===0){e[t+0]=h,e[t+1]=f,e[t+2]=d,e[t+3]=p;return}if(l===1){e[t+0]=m,e[t+1]=x,e[t+2]=M,e[t+3]=A;return}if(p!==A||h!==m||f!==x||d!==M){let v=1-l;const _=h*m+f*x+d*M+p*A,C=_>=0?1:-1,b=1-_*_;if(b>Number.EPSILON){const k=Math.sqrt(b),U=Math.atan2(k,_*C);v=Math.sin(v*U)/k,l=Math.sin(l*U)/k}const L=l*C;if(h=h*v+m*L,f=f*v+x*L,d=d*v+M*L,p=p*v+A*L,v===1-l){const k=1/Math.sqrt(h*h+f*f+d*d+p*p);h*=k,f*=k,d*=k,p*=k}}e[t]=h,e[t+1]=f,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,o,c){const l=n[r],h=n[r+1],f=n[r+2],d=n[r+3],p=o[c],m=o[c+1],x=o[c+2],M=o[c+3];return e[t]=l*M+d*p+h*x-f*m,e[t+1]=h*M+d*m+f*p-l*x,e[t+2]=f*M+d*x+l*m-h*p,e[t+3]=d*M-l*p-h*m-f*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,o=e._z,c=e._order,l=Math.cos,h=Math.sin,f=l(n/2),d=l(r/2),p=l(o/2),m=h(n/2),x=h(r/2),M=h(o/2);switch(c){case"XYZ":this._x=m*d*p+f*x*M,this._y=f*x*p-m*d*M,this._z=f*d*M+m*x*p,this._w=f*d*p-m*x*M;break;case"YXZ":this._x=m*d*p+f*x*M,this._y=f*x*p-m*d*M,this._z=f*d*M-m*x*p,this._w=f*d*p+m*x*M;break;case"ZXY":this._x=m*d*p-f*x*M,this._y=f*x*p+m*d*M,this._z=f*d*M+m*x*p,this._w=f*d*p-m*x*M;break;case"ZYX":this._x=m*d*p-f*x*M,this._y=f*x*p+m*d*M,this._z=f*d*M-m*x*p,this._w=f*d*p+m*x*M;break;case"YZX":this._x=m*d*p+f*x*M,this._y=f*x*p+m*d*M,this._z=f*d*M-m*x*p,this._w=f*d*p-m*x*M;break;case"XZY":this._x=m*d*p-f*x*M,this._y=f*x*p-m*d*M,this._z=f*d*M+m*x*p,this._w=f*d*p+m*x*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],o=t[8],c=t[1],l=t[5],h=t[9],f=t[2],d=t[6],p=t[10],m=n+l+p;if(m>0){const x=.5/Math.sqrt(m+1);this._w=.25/x,this._x=(d-h)*x,this._y=(o-f)*x,this._z=(c-r)*x}else if(n>l&&n>p){const x=2*Math.sqrt(1+n-l-p);this._w=(d-h)/x,this._x=.25*x,this._y=(r+c)/x,this._z=(o+f)/x}else if(l>p){const x=2*Math.sqrt(1+l-n-p);this._w=(o-f)/x,this._x=(r+c)/x,this._y=.25*x,this._z=(h+d)/x}else{const x=2*Math.sqrt(1+p-n-l);this._w=(c-r)/x,this._x=(o+f)/x,this._y=(h+d)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,o=e._z,c=e._w,l=t._x,h=t._y,f=t._z,d=t._w;return this._x=n*d+c*l+r*f-o*h,this._y=r*d+c*h+o*l-n*f,this._z=o*d+c*f+n*h-r*l,this._w=c*d-n*l-r*h-o*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,o=this._z,c=this._w;let l=c*e._w+n*e._x+r*e._y+o*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=c,this._x=n,this._y=r,this._z=o,this;const h=1-l*l;if(h<=Number.EPSILON){const x=1-t;return this._w=x*c+t*this._w,this._x=x*n+t*this._x,this._y=x*r+t*this._y,this._z=x*o+t*this._z,this.normalize(),this}const f=Math.sqrt(h),d=Math.atan2(f,l),p=Math.sin((1-t)*d)/f,m=Math.sin(t*d)/f;return this._w=c*p+this._w*m,this._x=n*p+this._x*m,this._y=r*p+this._y*m,this._z=o*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ym.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ym.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*r,this.y=o[1]*t+o[4]*n+o[7]*r,this.z=o[2]*t+o[5]*n+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=e.elements,c=1/(o[3]*t+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*r+o[12])*c,this.y=(o[1]*t+o[5]*n+o[9]*r+o[13])*c,this.z=(o[2]*t+o[6]*n+o[10]*r+o[14])*c,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,o=e.x,c=e.y,l=e.z,h=e.w,f=2*(c*r-l*n),d=2*(l*t-o*r),p=2*(o*n-c*t);return this.x=t+h*f+c*p-l*d,this.y=n+h*d+l*f-o*p,this.z=r+h*p+o*d-c*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r,this.y=o[1]*t+o[5]*n+o[9]*r,this.z=o[2]*t+o[6]*n+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,o=e.z,c=t.x,l=t.y,h=t.z;return this.x=r*h-o*l,this.y=o*c-n*h,this.z=n*l-r*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yu.copy(this).projectOnVector(e),this.sub(Yu)}reflect(e){return this.sub(Yu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yu=new N,ym=new on;class Ii{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let c=0,l=o.count;c<l;c++)e.isMesh===!0?e.getVertexPosition(c,Si):Si.fromBufferAttribute(o,c),Si.applyMatrix4(e.matrixWorld),this.expandByPoint(Si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ec.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ec.copy(n.boundingBox)),Ec.applyMatrix4(e.matrixWorld),this.union(Ec)}const r=e.children;for(let o=0,c=r.length;o<c;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Si),Si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($o),bc.subVectors(this.max,$o),Gs.subVectors(e.a,$o),Vs.subVectors(e.b,$o),Ws.subVectors(e.c,$o),Ir.subVectors(Vs,Gs),Dr.subVectors(Ws,Vs),is.subVectors(Gs,Ws);let t=[0,-Ir.z,Ir.y,0,-Dr.z,Dr.y,0,-is.z,is.y,Ir.z,0,-Ir.x,Dr.z,0,-Dr.x,is.z,0,-is.x,-Ir.y,Ir.x,0,-Dr.y,Dr.x,0,-is.y,is.x,0];return!ju(t,Gs,Vs,Ws,bc)||(t=[1,0,0,0,1,0,0,0,1],!ju(t,Gs,Vs,Ws,bc))?!1:(Tc.crossVectors(Ir,Dr),t=[Tc.x,Tc.y,Tc.z],ju(t,Gs,Vs,Ws,bc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(lr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),lr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),lr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),lr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),lr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),lr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),lr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),lr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(lr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const lr=[new N,new N,new N,new N,new N,new N,new N,new N],Si=new N,Ec=new Ii,Gs=new N,Vs=new N,Ws=new N,Ir=new N,Dr=new N,is=new N,$o=new N,bc=new N,Tc=new N,rs=new N;function ju(i,e,t,n,r){for(let o=0,c=i.length-3;o<=c;o+=3){rs.fromArray(i,o);const l=r.x*Math.abs(rs.x)+r.y*Math.abs(rs.y)+r.z*Math.abs(rs.z),h=e.dot(rs),f=t.dot(rs),d=n.dot(rs);if(Math.max(-Math.max(h,f,d),Math.min(h,f,d))>l)return!1}return!0}const wT=new Ii,Jo=new N,qu=new N;class Zi{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):wT.setFromPoints(e).getCenter(n);let r=0;for(let o=0,c=e.length;o<c;o++)r=Math.max(r,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Jo.subVectors(e,this.center);const t=Jo.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Jo,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Jo.copy(e.center).add(qu)),this.expandByPoint(Jo.copy(e.center).sub(qu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ur=new N,Ku=new N,Ac=new N,Or=new N,Zu=new N,wc=new N,$u=new N;class To{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ur)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ur.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ur.copy(this.origin).addScaledVector(this.direction,t),ur.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ku.copy(e).add(t).multiplyScalar(.5),Ac.copy(t).sub(e).normalize(),Or.copy(this.origin).sub(Ku);const o=e.distanceTo(t)*.5,c=-this.direction.dot(Ac),l=Or.dot(this.direction),h=-Or.dot(Ac),f=Or.lengthSq(),d=Math.abs(1-c*c);let p,m,x,M;if(d>0)if(p=c*h-l,m=c*l-h,M=o*d,p>=0)if(m>=-M)if(m<=M){const A=1/d;p*=A,m*=A,x=p*(p+c*m+2*l)+m*(c*p+m+2*h)+f}else m=o,p=Math.max(0,-(c*m+l)),x=-p*p+m*(m+2*h)+f;else m=-o,p=Math.max(0,-(c*m+l)),x=-p*p+m*(m+2*h)+f;else m<=-M?(p=Math.max(0,-(-c*o+l)),m=p>0?-o:Math.min(Math.max(-o,-h),o),x=-p*p+m*(m+2*h)+f):m<=M?(p=0,m=Math.min(Math.max(-o,-h),o),x=m*(m+2*h)+f):(p=Math.max(0,-(c*o+l)),m=p>0?o:Math.min(Math.max(-o,-h),o),x=-p*p+m*(m+2*h)+f);else m=c>0?-o:o,p=Math.max(0,-(c*m+l)),x=-p*p+m*(m+2*h)+f;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Ku).addScaledVector(Ac,m),x}intersectSphere(e,t){ur.subVectors(e.center,this.origin);const n=ur.dot(this.direction),r=ur.dot(ur)-n*n,o=e.radius*e.radius;if(r>o)return null;const c=Math.sqrt(o-r),l=n-c,h=n+c;return h<0?null:l<0?this.at(h,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,o,c,l,h;const f=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,m=this.origin;return f>=0?(n=(e.min.x-m.x)*f,r=(e.max.x-m.x)*f):(n=(e.max.x-m.x)*f,r=(e.min.x-m.x)*f),d>=0?(o=(e.min.y-m.y)*d,c=(e.max.y-m.y)*d):(o=(e.max.y-m.y)*d,c=(e.min.y-m.y)*d),n>c||o>r||((o>n||isNaN(n))&&(n=o),(c<r||isNaN(r))&&(r=c),p>=0?(l=(e.min.z-m.z)*p,h=(e.max.z-m.z)*p):(l=(e.max.z-m.z)*p,h=(e.min.z-m.z)*p),n>h||l>r)||((l>n||n!==n)&&(n=l),(h<r||r!==r)&&(r=h),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ur)!==null}intersectTriangle(e,t,n,r,o){Zu.subVectors(t,e),wc.subVectors(n,e),$u.crossVectors(Zu,wc);let c=this.direction.dot($u),l;if(c>0){if(r)return null;l=1}else if(c<0)l=-1,c=-c;else return null;Or.subVectors(this.origin,e);const h=l*this.direction.dot(wc.crossVectors(Or,wc));if(h<0)return null;const f=l*this.direction.dot(Zu.cross(Or));if(f<0||h+f>c)return null;const d=-l*Or.dot($u);return d<0?null:this.at(d/c,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,n,r,o,c,l,h,f,d,p,m,x,M,A,v){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,c,l,h,f,d,p,m,x,M,A,v)}set(e,t,n,r,o,c,l,h,f,d,p,m,x,M,A,v){const _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=r,_[1]=o,_[5]=c,_[9]=l,_[13]=h,_[2]=f,_[6]=d,_[10]=p,_[14]=m,_[3]=x,_[7]=M,_[11]=A,_[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Xs.setFromMatrixColumn(e,0).length(),o=1/Xs.setFromMatrixColumn(e,1).length(),c=1/Xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*c,t[9]=n[9]*c,t[10]=n[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,o=e.z,c=Math.cos(n),l=Math.sin(n),h=Math.cos(r),f=Math.sin(r),d=Math.cos(o),p=Math.sin(o);if(e.order==="XYZ"){const m=c*d,x=c*p,M=l*d,A=l*p;t[0]=h*d,t[4]=-h*p,t[8]=f,t[1]=x+M*f,t[5]=m-A*f,t[9]=-l*h,t[2]=A-m*f,t[6]=M+x*f,t[10]=c*h}else if(e.order==="YXZ"){const m=h*d,x=h*p,M=f*d,A=f*p;t[0]=m+A*l,t[4]=M*l-x,t[8]=c*f,t[1]=c*p,t[5]=c*d,t[9]=-l,t[2]=x*l-M,t[6]=A+m*l,t[10]=c*h}else if(e.order==="ZXY"){const m=h*d,x=h*p,M=f*d,A=f*p;t[0]=m-A*l,t[4]=-c*p,t[8]=M+x*l,t[1]=x+M*l,t[5]=c*d,t[9]=A-m*l,t[2]=-c*f,t[6]=l,t[10]=c*h}else if(e.order==="ZYX"){const m=c*d,x=c*p,M=l*d,A=l*p;t[0]=h*d,t[4]=M*f-x,t[8]=m*f+A,t[1]=h*p,t[5]=A*f+m,t[9]=x*f-M,t[2]=-f,t[6]=l*h,t[10]=c*h}else if(e.order==="YZX"){const m=c*h,x=c*f,M=l*h,A=l*f;t[0]=h*d,t[4]=A-m*p,t[8]=M*p+x,t[1]=p,t[5]=c*d,t[9]=-l*d,t[2]=-f*d,t[6]=x*p+M,t[10]=m-A*p}else if(e.order==="XZY"){const m=c*h,x=c*f,M=l*h,A=l*f;t[0]=h*d,t[4]=-p,t[8]=f*d,t[1]=m*p+A,t[5]=c*d,t[9]=x*p-M,t[2]=M*p-x,t[6]=l*d,t[10]=A*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(RT,e,CT)}lookAt(e,t,n){const r=this.elements;return Jn.subVectors(e,t),Jn.lengthSq()===0&&(Jn.z=1),Jn.normalize(),Ur.crossVectors(n,Jn),Ur.lengthSq()===0&&(Math.abs(n.z)===1?Jn.x+=1e-4:Jn.z+=1e-4,Jn.normalize(),Ur.crossVectors(n,Jn)),Ur.normalize(),Rc.crossVectors(Jn,Ur),r[0]=Ur.x,r[4]=Rc.x,r[8]=Jn.x,r[1]=Ur.y,r[5]=Rc.y,r[9]=Jn.y,r[2]=Ur.z,r[6]=Rc.z,r[10]=Jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,c=n[0],l=n[4],h=n[8],f=n[12],d=n[1],p=n[5],m=n[9],x=n[13],M=n[2],A=n[6],v=n[10],_=n[14],C=n[3],b=n[7],L=n[11],k=n[15],U=r[0],O=r[4],I=r[8],E=r[12],y=r[1],F=r[5],V=r[9],G=r[13],q=r[2],ne=r[6],se=r[10],pe=r[14],K=r[3],he=r[7],me=r[11],Me=r[15];return o[0]=c*U+l*y+h*q+f*K,o[4]=c*O+l*F+h*ne+f*he,o[8]=c*I+l*V+h*se+f*me,o[12]=c*E+l*G+h*pe+f*Me,o[1]=d*U+p*y+m*q+x*K,o[5]=d*O+p*F+m*ne+x*he,o[9]=d*I+p*V+m*se+x*me,o[13]=d*E+p*G+m*pe+x*Me,o[2]=M*U+A*y+v*q+_*K,o[6]=M*O+A*F+v*ne+_*he,o[10]=M*I+A*V+v*se+_*me,o[14]=M*E+A*G+v*pe+_*Me,o[3]=C*U+b*y+L*q+k*K,o[7]=C*O+b*F+L*ne+k*he,o[11]=C*I+b*V+L*se+k*me,o[15]=C*E+b*G+L*pe+k*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],o=e[12],c=e[1],l=e[5],h=e[9],f=e[13],d=e[2],p=e[6],m=e[10],x=e[14],M=e[3],A=e[7],v=e[11],_=e[15];return M*(+o*h*p-r*f*p-o*l*m+n*f*m+r*l*x-n*h*x)+A*(+t*h*x-t*f*m+o*c*m-r*c*x+r*f*d-o*h*d)+v*(+t*f*p-t*l*x-o*c*p+n*c*x+o*l*d-n*f*d)+_*(-r*l*d-t*h*p+t*l*m+r*c*p-n*c*m+n*h*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8],p=e[9],m=e[10],x=e[11],M=e[12],A=e[13],v=e[14],_=e[15],C=p*v*f-A*m*f+A*h*x-l*v*x-p*h*_+l*m*_,b=M*m*f-d*v*f-M*h*x+c*v*x+d*h*_-c*m*_,L=d*A*f-M*p*f+M*l*x-c*A*x-d*l*_+c*p*_,k=M*p*h-d*A*h-M*l*m+c*A*m+d*l*v-c*p*v,U=t*C+n*b+r*L+o*k;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/U;return e[0]=C*O,e[1]=(A*m*o-p*v*o-A*r*x+n*v*x+p*r*_-n*m*_)*O,e[2]=(l*v*o-A*h*o+A*r*f-n*v*f-l*r*_+n*h*_)*O,e[3]=(p*h*o-l*m*o-p*r*f+n*m*f+l*r*x-n*h*x)*O,e[4]=b*O,e[5]=(d*v*o-M*m*o+M*r*x-t*v*x-d*r*_+t*m*_)*O,e[6]=(M*h*o-c*v*o-M*r*f+t*v*f+c*r*_-t*h*_)*O,e[7]=(c*m*o-d*h*o+d*r*f-t*m*f-c*r*x+t*h*x)*O,e[8]=L*O,e[9]=(M*p*o-d*A*o-M*n*x+t*A*x+d*n*_-t*p*_)*O,e[10]=(c*A*o-M*l*o+M*n*f-t*A*f-c*n*_+t*l*_)*O,e[11]=(d*l*o-c*p*o-d*n*f+t*p*f+c*n*x-t*l*x)*O,e[12]=k*O,e[13]=(d*A*r-M*p*r+M*n*m-t*A*m-d*n*v+t*p*v)*O,e[14]=(M*l*r-c*A*r-M*n*h+t*A*h+c*n*v-t*l*v)*O,e[15]=(c*p*r-d*l*r+d*n*h-t*p*h-c*n*m+t*l*m)*O,this}scale(e){const t=this.elements,n=e.x,r=e.y,o=e.z;return t[0]*=n,t[4]*=r,t[8]*=o,t[1]*=n,t[5]*=r,t[9]*=o,t[2]*=n,t[6]*=r,t[10]*=o,t[3]*=n,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),o=1-n,c=e.x,l=e.y,h=e.z,f=o*c,d=o*l;return this.set(f*c+n,f*l-r*h,f*h+r*l,0,f*l+r*h,d*l+n,d*h-r*c,0,f*h-r*l,d*h+r*c,o*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,o,c){return this.set(1,n,o,0,e,1,c,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,o=t._x,c=t._y,l=t._z,h=t._w,f=o+o,d=c+c,p=l+l,m=o*f,x=o*d,M=o*p,A=c*d,v=c*p,_=l*p,C=h*f,b=h*d,L=h*p,k=n.x,U=n.y,O=n.z;return r[0]=(1-(A+_))*k,r[1]=(x+L)*k,r[2]=(M-b)*k,r[3]=0,r[4]=(x-L)*U,r[5]=(1-(m+_))*U,r[6]=(v+C)*U,r[7]=0,r[8]=(M+b)*O,r[9]=(v-C)*O,r[10]=(1-(m+A))*O,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let o=Xs.set(r[0],r[1],r[2]).length();const c=Xs.set(r[4],r[5],r[6]).length(),l=Xs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],Mi.copy(this);const f=1/o,d=1/c,p=1/l;return Mi.elements[0]*=f,Mi.elements[1]*=f,Mi.elements[2]*=f,Mi.elements[4]*=d,Mi.elements[5]*=d,Mi.elements[6]*=d,Mi.elements[8]*=p,Mi.elements[9]*=p,Mi.elements[10]*=p,t.setFromRotationMatrix(Mi),n.x=o,n.y=c,n.z=l,this}makePerspective(e,t,n,r,o,c,l=vr){const h=this.elements,f=2*o/(t-e),d=2*o/(n-r),p=(t+e)/(t-e),m=(n+r)/(n-r);let x,M;if(l===vr)x=-(c+o)/(c-o),M=-2*c*o/(c-o);else if(l===pl)x=-c/(c-o),M=-c*o/(c-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=f,h[4]=0,h[8]=p,h[12]=0,h[1]=0,h[5]=d,h[9]=m,h[13]=0,h[2]=0,h[6]=0,h[10]=x,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,r,o,c,l=vr){const h=this.elements,f=1/(t-e),d=1/(n-r),p=1/(c-o),m=(t+e)*f,x=(n+r)*d;let M,A;if(l===vr)M=(c+o)*p,A=-2*p;else if(l===pl)M=o*p,A=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=2*f,h[4]=0,h[8]=0,h[12]=-m,h[1]=0,h[5]=2*d,h[9]=0,h[13]=-x,h[2]=0,h[6]=0,h[10]=A,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Xs=new N,Mi=new Qe,RT=new N(0,0,0),CT=new N(1,1,1),Ur=new N,Rc=new N,Jn=new N,Sm=new Qe,Mm=new on;class Li{constructor(e=0,t=0,n=0,r=Li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,o=r[0],c=r[4],l=r[8],h=r[1],f=r[5],d=r[9],p=r[2],m=r[6],x=r[10];switch(t){case"XYZ":this._y=Math.asin(xn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,x),this._z=Math.atan2(-c,o)):(this._x=Math.atan2(m,f),this._z=0);break;case"YXZ":this._x=Math.asin(-xn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,x),this._z=Math.atan2(h,f)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(xn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,x),this._z=Math.atan2(-c,f)):(this._y=0,this._z=Math.atan2(h,o));break;case"ZYX":this._y=Math.asin(-xn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,x),this._z=Math.atan2(h,o)):(this._x=0,this._z=Math.atan2(-c,f));break;case"YZX":this._z=Math.asin(xn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,f),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(l,x));break;case"XZY":this._z=Math.asin(-xn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(m,f),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-d,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sm,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mm.setFromEuler(this),this.setFromQuaternion(Mm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Li.DEFAULT_ORDER="XYZ";class rf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let PT=0;const Em=new N,Ys=new on,hr=new Qe,Cc=new N,Qo=new N,LT=new N,IT=new on,bm=new N(1,0,0),Tm=new N(0,1,0),Am=new N(0,0,1),wm={type:"added"},DT={type:"removed"},js={type:"childadded",child:null},Ju={type:"childremoved",child:null};class mt extends ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:PT++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new N,t=new Li,n=new on,r=new N(1,1,1);function o(){n.setFromEuler(t,!1)}function c(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Qe},normalMatrix:{value:new ht}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(bm,e)}rotateY(e){return this.rotateOnAxis(Tm,e)}rotateZ(e){return this.rotateOnAxis(Am,e)}translateOnAxis(e,t){return Em.copy(e).applyQuaternion(this.quaternion),this.position.add(Em.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bm,e)}translateY(e){return this.translateOnAxis(Tm,e)}translateZ(e){return this.translateOnAxis(Am,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cc.copy(e):Cc.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hr.lookAt(Qo,Cc,this.up):hr.lookAt(Cc,Qo,this.up),this.quaternion.setFromRotationMatrix(hr),r&&(hr.extractRotation(r.matrixWorld),Ys.setFromRotationMatrix(hr),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wm),js.child=e,this.dispatchEvent(js),js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(DT),Ju.child=e,this.dispatchEvent(Ju),Ju.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hr.multiply(e.parent.matrixWorld)),e.applyMatrix4(hr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wm),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const c=this.children[n].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,e,LT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,IT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let o=0,c=r.length;o<c;o++){const l=r[o];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const h=l.shapes;if(Array.isArray(h))for(let f=0,d=h.length;f<d;f++){const p=h[f];o(e.shapes,p)}else o(e.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let h=0,f=this.material.length;h<f;h++)l.push(o(e.materials,this.material[h]));r.material=l}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const h=this.animations[l];r.animations.push(o(e.animations,h))}}if(t){const l=c(e.geometries),h=c(e.materials),f=c(e.textures),d=c(e.images),p=c(e.shapes),m=c(e.skeletons),x=c(e.animations),M=c(e.nodes);l.length>0&&(n.geometries=l),h.length>0&&(n.materials=h),f.length>0&&(n.textures=f),d.length>0&&(n.images=d),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),x.length>0&&(n.animations=x),M.length>0&&(n.nodes=M)}return n.object=r,n;function c(l){const h=[];for(const f in l){const d=l[f];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}mt.DEFAULT_UP=new N(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ei=new N,fr=new N,Qu=new N,dr=new N,qs=new N,Ks=new N,Rm=new N,eh=new N,th=new N,nh=new N;class Ri{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ei.subVectors(e,t),r.cross(Ei);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,n,r,o){Ei.subVectors(r,t),fr.subVectors(n,t),Qu.subVectors(e,t);const c=Ei.dot(Ei),l=Ei.dot(fr),h=Ei.dot(Qu),f=fr.dot(fr),d=fr.dot(Qu),p=c*f-l*l;if(p===0)return o.set(0,0,0),null;const m=1/p,x=(f*h-l*d)*m,M=(c*d-l*h)*m;return o.set(1-x-M,M,x)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,dr)===null?!1:dr.x>=0&&dr.y>=0&&dr.x+dr.y<=1}static getInterpolation(e,t,n,r,o,c,l,h){return this.getBarycoord(e,t,n,r,dr)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(o,dr.x),h.addScaledVector(c,dr.y),h.addScaledVector(l,dr.z),h)}static isFrontFacing(e,t,n,r){return Ei.subVectors(n,t),fr.subVectors(e,t),Ei.cross(fr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ei.subVectors(this.c,this.b),fr.subVectors(this.a,this.b),Ei.cross(fr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ri.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ri.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,o){return Ri.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}containsPoint(e){return Ri.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ri.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,o=this.c;let c,l;qs.subVectors(r,n),Ks.subVectors(o,n),eh.subVectors(e,n);const h=qs.dot(eh),f=Ks.dot(eh);if(h<=0&&f<=0)return t.copy(n);th.subVectors(e,r);const d=qs.dot(th),p=Ks.dot(th);if(d>=0&&p<=d)return t.copy(r);const m=h*p-d*f;if(m<=0&&h>=0&&d<=0)return c=h/(h-d),t.copy(n).addScaledVector(qs,c);nh.subVectors(e,o);const x=qs.dot(nh),M=Ks.dot(nh);if(M>=0&&x<=M)return t.copy(o);const A=x*f-h*M;if(A<=0&&f>=0&&M<=0)return l=f/(f-M),t.copy(n).addScaledVector(Ks,l);const v=d*M-x*p;if(v<=0&&p-d>=0&&x-M>=0)return Rm.subVectors(o,r),l=(p-d)/(p-d+(x-M)),t.copy(r).addScaledVector(Rm,l);const _=1/(v+A+m);return c=A*_,l=m*_,t.copy(n).addScaledVector(qs,c).addScaledVector(Ks,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const m_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nr={h:0,s:0,l:0},Pc={h:0,s:0,l:0};function ih(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ct.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ct.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Ct.workingColorSpace){if(e=nf(e,1),t=xn(t,0,1),n=xn(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,c=2*n-o;this.r=ih(c,o,e+1/3),this.g=ih(c,o,e),this.b=ih(c,o,e-1/3)}return Ct.toWorkingColorSpace(this,r),this}setStyle(e,t=ln){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const c=r[1],l=r[2];switch(c){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=r[1],c=o.length;if(c===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){const n=m_[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mo(e.r),this.g=mo(e.g),this.b=mo(e.b),this}copyLinearToSRGB(e){return this.r=Wu(e.r),this.g=Wu(e.g),this.b=Wu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return Ct.fromWorkingColorSpace(An.copy(this),e),Math.round(xn(An.r*255,0,255))*65536+Math.round(xn(An.g*255,0,255))*256+Math.round(xn(An.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.fromWorkingColorSpace(An.copy(this),t);const n=An.r,r=An.g,o=An.b,c=Math.max(n,r,o),l=Math.min(n,r,o);let h,f;const d=(l+c)/2;if(l===c)h=0,f=0;else{const p=c-l;switch(f=d<=.5?p/(c+l):p/(2-c-l),c){case n:h=(r-o)/p+(r<o?6:0);break;case r:h=(o-n)/p+2;break;case o:h=(n-r)/p+4;break}h/=6}return e.h=h,e.s=f,e.l=d,e}getRGB(e,t=Ct.workingColorSpace){return Ct.fromWorkingColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=ln){Ct.fromWorkingColorSpace(An.copy(this),e);const t=An.r,n=An.g,r=An.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Nr),this.setHSL(Nr.h+e,Nr.s+t,Nr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nr),e.getHSL(Pc);const n=ya(Nr.h,Pc.h,t),r=ya(Nr.s,Pc.s,t),o=ya(Nr.l,Pc.l,t);return this.setHSL(n,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*r,this.g=o[1]*t+o[4]*n+o[7]*r,this.b=o[2]*t+o[5]*n+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const An=new Ne;Ne.NAMES=m_;let OT=0;class mi extends ys{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:OT++}),this.uuid=Pi(),this.name="",this.type="Material",this.blending=fo,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lh,this.blendDst=Ih,this.blendEquation=ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=ll,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ks,this.stencilZFail=ks,this.stencilZPass=ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fo&&(n.blending=this.blending),this.side!==Yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Lh&&(n.blendSrc=this.blendSrc),this.blendDst!==Ih&&(n.blendDst=this.blendDst),this.blendEquation!==ps&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ll&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ks&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ks&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ks&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}if(t){const o=r(e.textures),c=r(e.images);o.length>0&&(n.textures=o),c.length>0&&(n.images=c)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wi extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Li,this.combine=Zg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const sn=new N,Lc=new Pe;class nn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Nh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return f_("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Lc.fromBufferAttribute(this,t),Lc.applyMatrix3(e),this.setXY(t,Lc.x,Lc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix3(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array),o=Lt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Nh&&(e.usage=this.usage),e}}class g_ extends nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class __ extends nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Nt extends nn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let UT=0;const hi=new Qe,rh=new mt,Zs=new N,Qn=new Ii,ea=new Ii,mn=new N;class Jt extends ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:UT++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(h_(e)?__:g_)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ht().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,n){return hi.makeTranslation(e,t,n),this.applyMatrix4(hi),this}scale(e,t,n){return hi.makeScale(e,t,n),this.applyMatrix4(hi),this}lookAt(e){return rh.lookAt(e),rh.updateMatrix(),this.applyMatrix4(rh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Nt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ii);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const o=t[n];Qn.setFromBufferAttribute(o),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,Qn.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,Qn.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(Qn.min),this.boundingBox.expandByPoint(Qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Qn.setFromBufferAttribute(e),t)for(let o=0,c=t.length;o<c;o++){const l=t[o];ea.setFromBufferAttribute(l),this.morphTargetsRelative?(mn.addVectors(Qn.min,ea.min),Qn.expandByPoint(mn),mn.addVectors(Qn.max,ea.max),Qn.expandByPoint(mn)):(Qn.expandByPoint(ea.min),Qn.expandByPoint(ea.max))}Qn.getCenter(n);let r=0;for(let o=0,c=e.count;o<c;o++)mn.fromBufferAttribute(e,o),r=Math.max(r,n.distanceToSquared(mn));if(t)for(let o=0,c=t.length;o<c;o++){const l=t[o],h=this.morphTargetsRelative;for(let f=0,d=l.count;f<d;f++)mn.fromBufferAttribute(l,f),h&&(Zs.fromBufferAttribute(e,f),mn.add(Zs)),r=Math.max(r,n.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*n.count),4));const c=this.getAttribute("tangent"),l=[],h=[];for(let I=0;I<n.count;I++)l[I]=new N,h[I]=new N;const f=new N,d=new N,p=new N,m=new Pe,x=new Pe,M=new Pe,A=new N,v=new N;function _(I,E,y){f.fromBufferAttribute(n,I),d.fromBufferAttribute(n,E),p.fromBufferAttribute(n,y),m.fromBufferAttribute(o,I),x.fromBufferAttribute(o,E),M.fromBufferAttribute(o,y),d.sub(f),p.sub(f),x.sub(m),M.sub(m);const F=1/(x.x*M.y-M.x*x.y);isFinite(F)&&(A.copy(d).multiplyScalar(M.y).addScaledVector(p,-x.y).multiplyScalar(F),v.copy(p).multiplyScalar(x.x).addScaledVector(d,-M.x).multiplyScalar(F),l[I].add(A),l[E].add(A),l[y].add(A),h[I].add(v),h[E].add(v),h[y].add(v))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let I=0,E=C.length;I<E;++I){const y=C[I],F=y.start,V=y.count;for(let G=F,q=F+V;G<q;G+=3)_(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const b=new N,L=new N,k=new N,U=new N;function O(I){k.fromBufferAttribute(r,I),U.copy(k);const E=l[I];b.copy(E),b.sub(k.multiplyScalar(k.dot(E))).normalize(),L.crossVectors(U,E);const F=L.dot(h[I])<0?-1:1;c.setXYZW(I,b.x,b.y,b.z,F)}for(let I=0,E=C.length;I<E;++I){const y=C[I],F=y.start,V=y.count;for(let G=F,q=F+V;G<q;G+=3)O(e.getX(G+0)),O(e.getX(G+1)),O(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,x=n.count;m<x;m++)n.setXYZ(m,0,0,0);const r=new N,o=new N,c=new N,l=new N,h=new N,f=new N,d=new N,p=new N;if(e)for(let m=0,x=e.count;m<x;m+=3){const M=e.getX(m+0),A=e.getX(m+1),v=e.getX(m+2);r.fromBufferAttribute(t,M),o.fromBufferAttribute(t,A),c.fromBufferAttribute(t,v),d.subVectors(c,o),p.subVectors(r,o),d.cross(p),l.fromBufferAttribute(n,M),h.fromBufferAttribute(n,A),f.fromBufferAttribute(n,v),l.add(d),h.add(d),f.add(d),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(A,h.x,h.y,h.z),n.setXYZ(v,f.x,f.y,f.z)}else for(let m=0,x=t.count;m<x;m+=3)r.fromBufferAttribute(t,m+0),o.fromBufferAttribute(t,m+1),c.fromBufferAttribute(t,m+2),d.subVectors(c,o),p.subVectors(r,o),d.cross(p),n.setXYZ(m+0,d.x,d.y,d.z),n.setXYZ(m+1,d.x,d.y,d.z),n.setXYZ(m+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mn.fromBufferAttribute(e,t),mn.normalize(),e.setXYZ(t,mn.x,mn.y,mn.z)}toNonIndexed(){function e(l,h){const f=l.array,d=l.itemSize,p=l.normalized,m=new f.constructor(h.length*d);let x=0,M=0;for(let A=0,v=h.length;A<v;A++){l.isInterleavedBufferAttribute?x=h[A]*l.data.stride+l.offset:x=h[A]*d;for(let _=0;_<d;_++)m[M++]=f[x++]}return new nn(m,d,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,n=this.index.array,r=this.attributes;for(const l in r){const h=r[l],f=e(h,n);t.setAttribute(l,f)}const o=this.morphAttributes;for(const l in o){const h=[],f=o[l];for(let d=0,p=f.length;d<p;d++){const m=f[d],x=e(m,n);h.push(x)}t.morphAttributes[l]=h}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let l=0,h=c.length;l<h;l++){const f=c[l];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const f in h)h[f]!==void 0&&(e[f]=h[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const f=n[h];e.data.attributes[h]=f.toJSON(e.data)}const r={};let o=!1;for(const h in this.morphAttributes){const f=this.morphAttributes[h],d=[];for(let p=0,m=f.length;p<m;p++){const x=f[p];d.push(x.toJSON(e.data))}d.length>0&&(r[h]=d,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const f in r){const d=r[f];this.setAttribute(f,d.clone(t))}const o=e.morphAttributes;for(const f in o){const d=[],p=o[f];for(let m=0,x=p.length;m<x;m++)d.push(p[m].clone(t));this.morphAttributes[f]=d}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let f=0,d=c.length;f<d;f++){const p=c[f];this.addGroup(p.start,p.count,p.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cm=new Qe,ss=new To,Ic=new Zi,Pm=new N,$s=new N,Js=new N,Qs=new N,sh=new N,Dc=new N,Oc=new Pe,Uc=new Pe,Nc=new Pe,Lm=new N,Im=new N,Dm=new N,Fc=new N,Bc=new N;class ye extends mt{constructor(e=new Jt,t=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,c=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(o&&l){Dc.set(0,0,0);for(let h=0,f=o.length;h<f;h++){const d=l[h],p=o[h];d!==0&&(sh.fromBufferAttribute(p,e),c?Dc.addScaledVector(sh,d):Dc.addScaledVector(sh.sub(t),d))}t.add(Dc)}return t}raycast(e,t){const n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ic.copy(n.boundingSphere),Ic.applyMatrix4(o),ss.copy(e.ray).recast(e.near),!(Ic.containsPoint(ss.origin)===!1&&(ss.intersectSphere(Ic,Pm)===null||ss.origin.distanceToSquared(Pm)>(e.far-e.near)**2))&&(Cm.copy(o).invert(),ss.copy(e.ray).applyMatrix4(Cm),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,n){let r;const o=this.geometry,c=this.material,l=o.index,h=o.attributes.position,f=o.attributes.uv,d=o.attributes.uv1,p=o.attributes.normal,m=o.groups,x=o.drawRange;if(l!==null)if(Array.isArray(c))for(let M=0,A=m.length;M<A;M++){const v=m[M],_=c[v.materialIndex],C=Math.max(v.start,x.start),b=Math.min(l.count,Math.min(v.start+v.count,x.start+x.count));for(let L=C,k=b;L<k;L+=3){const U=l.getX(L),O=l.getX(L+1),I=l.getX(L+2);r=zc(this,_,e,n,f,d,p,U,O,I),r&&(r.faceIndex=Math.floor(L/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{const M=Math.max(0,x.start),A=Math.min(l.count,x.start+x.count);for(let v=M,_=A;v<_;v+=3){const C=l.getX(v),b=l.getX(v+1),L=l.getX(v+2);r=zc(this,c,e,n,f,d,p,C,b,L),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}else if(h!==void 0)if(Array.isArray(c))for(let M=0,A=m.length;M<A;M++){const v=m[M],_=c[v.materialIndex],C=Math.max(v.start,x.start),b=Math.min(h.count,Math.min(v.start+v.count,x.start+x.count));for(let L=C,k=b;L<k;L+=3){const U=L,O=L+1,I=L+2;r=zc(this,_,e,n,f,d,p,U,O,I),r&&(r.faceIndex=Math.floor(L/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{const M=Math.max(0,x.start),A=Math.min(h.count,x.start+x.count);for(let v=M,_=A;v<_;v+=3){const C=v,b=v+1,L=v+2;r=zc(this,c,e,n,f,d,p,C,b,L),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}}}function NT(i,e,t,n,r,o,c,l){let h;if(e.side===Xn?h=n.intersectTriangle(c,o,r,!0,l):h=n.intersectTriangle(r,o,c,e.side===Yi,l),h===null)return null;Bc.copy(l),Bc.applyMatrix4(i.matrixWorld);const f=t.ray.origin.distanceTo(Bc);return f<t.near||f>t.far?null:{distance:f,point:Bc.clone(),object:i}}function zc(i,e,t,n,r,o,c,l,h,f){i.getVertexPosition(l,$s),i.getVertexPosition(h,Js),i.getVertexPosition(f,Qs);const d=NT(i,e,t,n,$s,Js,Qs,Fc);if(d){r&&(Oc.fromBufferAttribute(r,l),Uc.fromBufferAttribute(r,h),Nc.fromBufferAttribute(r,f),d.uv=Ri.getInterpolation(Fc,$s,Js,Qs,Oc,Uc,Nc,new Pe)),o&&(Oc.fromBufferAttribute(o,l),Uc.fromBufferAttribute(o,h),Nc.fromBufferAttribute(o,f),d.uv1=Ri.getInterpolation(Fc,$s,Js,Qs,Oc,Uc,Nc,new Pe)),c&&(Lm.fromBufferAttribute(c,l),Im.fromBufferAttribute(c,h),Dm.fromBufferAttribute(c,f),d.normal=Ri.getInterpolation(Fc,$s,Js,Qs,Lm,Im,Dm,new N),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:l,b:h,c:f,normal:new N,materialIndex:0};Ri.getNormal($s,Js,Qs,p.normal),d.face=p}return d}class qt extends Jt{constructor(e=1,t=1,n=1,r=1,o=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:o,depthSegments:c};const l=this;r=Math.floor(r),o=Math.floor(o),c=Math.floor(c);const h=[],f=[],d=[],p=[];let m=0,x=0;M("z","y","x",-1,-1,n,t,e,c,o,0),M("z","y","x",1,-1,n,t,-e,c,o,1),M("x","z","y",1,1,e,n,t,r,c,2),M("x","z","y",1,-1,e,n,-t,r,c,3),M("x","y","z",1,-1,e,t,n,r,o,4),M("x","y","z",-1,-1,e,t,-n,r,o,5),this.setIndex(h),this.setAttribute("position",new Nt(f,3)),this.setAttribute("normal",new Nt(d,3)),this.setAttribute("uv",new Nt(p,2));function M(A,v,_,C,b,L,k,U,O,I,E){const y=L/O,F=k/I,V=L/2,G=k/2,q=U/2,ne=O+1,se=I+1;let pe=0,K=0;const he=new N;for(let me=0;me<se;me++){const Me=me*F-G;for(let Ke=0;Ke<ne;Ke++){const ot=Ke*y-V;he[A]=ot*C,he[v]=Me*b,he[_]=q,f.push(he.x,he.y,he.z),he[A]=0,he[v]=0,he[_]=U>0?1:-1,d.push(he.x,he.y,he.z),p.push(Ke/O),p.push(1-me/I),pe+=1}}for(let me=0;me<I;me++)for(let Me=0;Me<O;Me++){const Ke=m+Me+ne*me,ot=m+Me+ne*(me+1),ie=m+(Me+1)+ne*(me+1),ge=m+(Me+1)+ne*me;h.push(Ke,ot,ge),h.push(ot,ie,ge),K+=6}l.addGroup(x,K,E),x+=K,m+=pe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Mo(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Nn(i){const e={};for(let t=0;t<i.length;t++){const n=Mo(i[t]);for(const r in n)e[r]=n[r]}return e}function FT(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function v_(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}const BT={clone:Mo,merge:Nn};var zT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yr extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zT,this.fragmentShader=kT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mo(e.uniforms),this.uniformsGroups=FT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const c=this.uniforms[r].value;c&&c.isTexture?t.uniforms[r]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[r]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[r]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[r]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[r]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[r]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[r]={type:"m4",value:c.toArray()}:t.uniforms[r]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class x_ extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=vr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fr=new N,Om=new Pe,Um=new Pe;class Bn extends x_{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=So*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return So*2*Math.atan(Math.tan(xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fr.x,Fr.y).multiplyScalar(-e/Fr.z),Fr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fr.x,Fr.y).multiplyScalar(-e/Fr.z)}getViewSize(e,t){return this.getViewBounds(e,Om,Um),t.subVectors(Um,Om)}setViewOffset(e,t,n,r,o,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xa*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,o=-.5*r;const c=this.view;if(this.view!==null&&this.view.enabled){const h=c.fullWidth,f=c.fullHeight;o+=c.offsetX*r/h,t-=c.offsetY*n/f,r*=c.width/h,n*=c.height/f}const l=this.filmOffset;l!==0&&(o+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const eo=-90,to=1;class HT extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Bn(eo,to,e,t);r.layers=this.layers,this.add(r);const o=new Bn(eo,to,e,t);o.layers=this.layers,this.add(o);const c=new Bn(eo,to,e,t);c.layers=this.layers,this.add(c);const l=new Bn(eo,to,e,t);l.layers=this.layers,this.add(l);const h=new Bn(eo,to,e,t);h.layers=this.layers,this.add(h);const f=new Bn(eo,to,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,o,c,l,h]=t;for(const f of t)this.remove(f);if(e===vr)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===pl)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,c,l,h,f,d]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,o),e.setRenderTarget(n,1,r),e.render(t,c),e.setRenderTarget(n,2,r),e.render(t,l),e.setRenderTarget(n,3,r),e.render(t,h),e.setRenderTarget(n,4,r),e.render(t,f),n.texture.generateMipmaps=A,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(p,m,x),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class y_ extends un{constructor(e,t,n,r,o,c,l,h,f,d){e=e!==void 0?e:[],t=t!==void 0?t:_o,super(e,t,n,r,o,c,l,h,f,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class S_ extends vs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new y_(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new qt(5,5,5),o=new Yr({name:"CubemapFromEquirect",uniforms:Mo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xn,blending:Wr});o.uniforms.tEquirect.value=t;const c=new ye(r,o),l=t.minFilter;return t.minFilter===_r&&(t.minFilter=Wn),new HT(1,10,this).update(e,c),t.minFilter=l,c.geometry.dispose(),c.material.dispose(),this}clear(e,t,n,r){const o=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,n,r);e.setRenderTarget(o)}}const oh=new N,GT=new N,VT=new ht;class Hr{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=oh.subVectors(n,t).cross(GT.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(oh),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||VT.getNormalMatrix(e),r=this.coplanarPoint(oh).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const os=new Zi,kc=new N;class sf{constructor(e=new Hr,t=new Hr,n=new Hr,r=new Hr,o=new Hr,c=new Hr){this.planes=[e,t,n,r,o,c]}set(e,t,n,r,o,c){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(r),l[4].copy(o),l[5].copy(c),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=vr){const n=this.planes,r=e.elements,o=r[0],c=r[1],l=r[2],h=r[3],f=r[4],d=r[5],p=r[6],m=r[7],x=r[8],M=r[9],A=r[10],v=r[11],_=r[12],C=r[13],b=r[14],L=r[15];if(n[0].setComponents(h-o,m-f,v-x,L-_).normalize(),n[1].setComponents(h+o,m+f,v+x,L+_).normalize(),n[2].setComponents(h+c,m+d,v+M,L+C).normalize(),n[3].setComponents(h-c,m-d,v-M,L-C).normalize(),n[4].setComponents(h-l,m-p,v-A,L-b).normalize(),t===vr)n[5].setComponents(h+l,m+p,v+A,L+b).normalize();else if(t===pl)n[5].setComponents(l,p,A,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(os)}intersectsSprite(e){return os.center.set(0,0,0),os.radius=.7071067811865476,os.applyMatrix4(e.matrixWorld),this.intersectsSphere(os)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(kc.x=r.normal.x>0?e.max.x:e.min.x,kc.y=r.normal.y>0?e.max.y:e.min.y,kc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(kc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function M_(){let i=null,e=!1,t=null,n=null;function r(o,c){t(o,c),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function WT(i){const e=new WeakMap;function t(l,h){const f=l.array,d=l.usage,p=f.byteLength,m=i.createBuffer();i.bindBuffer(h,m),i.bufferData(h,f,d),l.onUploadCallback();let x;if(f instanceof Float32Array)x=i.FLOAT;else if(f instanceof Uint16Array)l.isFloat16BufferAttribute?x=i.HALF_FLOAT:x=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)x=i.SHORT;else if(f instanceof Uint32Array)x=i.UNSIGNED_INT;else if(f instanceof Int32Array)x=i.INT;else if(f instanceof Int8Array)x=i.BYTE;else if(f instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:x,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:p}}function n(l,h,f){const d=h.array,p=h._updateRange,m=h.updateRanges;if(i.bindBuffer(f,l),p.count===-1&&m.length===0&&i.bufferSubData(f,0,d),m.length!==0){for(let x=0,M=m.length;x<M;x++){const A=m[x];i.bufferSubData(f,A.start*d.BYTES_PER_ELEMENT,d,A.start,A.count)}h.clearUpdateRanges()}p.count!==-1&&(i.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count),p.count=-1),h.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=e.get(l);h&&(i.deleteBuffer(h.buffer),e.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=e.get(l);(!d||d.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=e.get(l);if(f===void 0)e.set(l,t(l,h));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(f.buffer,l,h),f.version=l.version}}return{get:r,remove:o,update:c}}class Ss extends Jt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const o=e/2,c=t/2,l=Math.floor(n),h=Math.floor(r),f=l+1,d=h+1,p=e/l,m=t/h,x=[],M=[],A=[],v=[];for(let _=0;_<d;_++){const C=_*m-c;for(let b=0;b<f;b++){const L=b*p-o;M.push(L,-C,0),A.push(0,0,1),v.push(b/l),v.push(1-_/h)}}for(let _=0;_<h;_++)for(let C=0;C<l;C++){const b=C+f*_,L=C+f*(_+1),k=C+1+f*(_+1),U=C+1+f*_;x.push(b,L,U),x.push(L,k,U)}this.setIndex(x),this.setAttribute("position",new Nt(M,3)),this.setAttribute("normal",new Nt(A,3)),this.setAttribute("uv",new Nt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ss(e.width,e.height,e.widthSegments,e.heightSegments)}}var XT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,YT=`#ifdef USE_ALPHAHASH
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
#endif`,jT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ZT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$T=`#ifdef USE_AOMAP
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
#endif`,JT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,QT=`#ifdef USE_BATCHING
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
#endif`,eA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,tA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iA=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rA=`#ifdef USE_IRIDESCENCE
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
#endif`,sA=`#ifdef USE_BUMPMAP
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
#endif`,oA=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,aA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uA=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,dA=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,pA=`#define PI 3.141592653589793
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
} // validated`,mA=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gA=`vec3 transformedNormal = objectNormal;
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
#endif`,_A=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,SA="gl_FragColor = linearToOutputTexel( gl_FragColor );",MA=`
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
}`,EA=`#ifdef USE_ENVMAP
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
#endif`,bA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,TA=`#ifdef USE_ENVMAP
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
#endif`,AA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wA=`#ifdef USE_ENVMAP
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
#endif`,RA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,CA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,PA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,LA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,IA=`#ifdef USE_GRADIENTMAP
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
}`,DA=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,OA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,UA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,NA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,FA=`uniform bool receiveShadow;
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
#endif`,BA=`#ifdef USE_ENVMAP
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
#endif`,zA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,HA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,GA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,VA=`PhysicalMaterial material;
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
#endif`,WA=`struct PhysicalMaterial {
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
}`,XA=`
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
#endif`,YA=`#if defined( RE_IndirectDiffuse )
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
#endif`,jA=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qA=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,KA=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ZA=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$A=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,JA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,QA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ew=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tw=`#if defined( USE_POINTS_UV )
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
#endif`,nw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,iw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sw=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ow=`#ifdef USE_MORPHNORMALS
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
#endif`,aw=`#ifdef USE_MORPHTARGETS
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
#endif`,cw=`#ifdef USE_MORPHTARGETS
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
#endif`,lw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,uw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pw=`#ifdef USE_NORMALMAP
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
#endif`,mw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_w=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Sw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ew=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Aw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ww=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pw=`float getShadowMask() {
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
}`,Lw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Iw=`#ifdef USE_SKINNING
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
#endif`,Dw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ow=`#ifdef USE_SKINNING
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
#endif`,Uw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zw=`#ifdef USE_TRANSMISSION
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
#endif`,kw=`#ifdef USE_TRANSMISSION
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
#endif`,Hw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ww=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yw=`uniform sampler2D t2D;
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
}`,jw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$w=`#include <common>
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
}`,Jw=`#if DEPTH_PACKING == 3200
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
}`,Qw=`#define DISTANCE
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
}`,e1=`#define DISTANCE
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
}`,t1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,n1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i1=`uniform float scale;
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
}`,r1=`uniform vec3 diffuse;
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
}`,s1=`#include <common>
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
}`,o1=`uniform vec3 diffuse;
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
}`,a1=`#define LAMBERT
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
}`,c1=`#define LAMBERT
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
}`,l1=`#define MATCAP
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
}`,u1=`#define MATCAP
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
}`,h1=`#define NORMAL
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
}`,f1=`#define NORMAL
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
}`,d1=`#define PHONG
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
}`,p1=`#define PHONG
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
}`,m1=`#define STANDARD
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
}`,g1=`#define STANDARD
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
}`,_1=`#define TOON
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
}`,v1=`#define TOON
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
}`,x1=`uniform float size;
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
}`,y1=`uniform vec3 diffuse;
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
}`,S1=`#include <common>
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
}`,M1=`uniform vec3 color;
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
}`,E1=`uniform float rotation;
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
}`,b1=`uniform vec3 diffuse;
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
}`,ut={alphahash_fragment:XT,alphahash_pars_fragment:YT,alphamap_fragment:jT,alphamap_pars_fragment:qT,alphatest_fragment:KT,alphatest_pars_fragment:ZT,aomap_fragment:$T,aomap_pars_fragment:JT,batching_pars_vertex:QT,batching_vertex:eA,begin_vertex:tA,beginnormal_vertex:nA,bsdfs:iA,iridescence_fragment:rA,bumpmap_pars_fragment:sA,clipping_planes_fragment:oA,clipping_planes_pars_fragment:aA,clipping_planes_pars_vertex:cA,clipping_planes_vertex:lA,color_fragment:uA,color_pars_fragment:hA,color_pars_vertex:fA,color_vertex:dA,common:pA,cube_uv_reflection_fragment:mA,defaultnormal_vertex:gA,displacementmap_pars_vertex:_A,displacementmap_vertex:vA,emissivemap_fragment:xA,emissivemap_pars_fragment:yA,colorspace_fragment:SA,colorspace_pars_fragment:MA,envmap_fragment:EA,envmap_common_pars_fragment:bA,envmap_pars_fragment:TA,envmap_pars_vertex:AA,envmap_physical_pars_fragment:BA,envmap_vertex:wA,fog_vertex:RA,fog_pars_vertex:CA,fog_fragment:PA,fog_pars_fragment:LA,gradientmap_pars_fragment:IA,lightmap_fragment:DA,lightmap_pars_fragment:OA,lights_lambert_fragment:UA,lights_lambert_pars_fragment:NA,lights_pars_begin:FA,lights_toon_fragment:zA,lights_toon_pars_fragment:kA,lights_phong_fragment:HA,lights_phong_pars_fragment:GA,lights_physical_fragment:VA,lights_physical_pars_fragment:WA,lights_fragment_begin:XA,lights_fragment_maps:YA,lights_fragment_end:jA,logdepthbuf_fragment:qA,logdepthbuf_pars_fragment:KA,logdepthbuf_pars_vertex:ZA,logdepthbuf_vertex:$A,map_fragment:JA,map_pars_fragment:QA,map_particle_fragment:ew,map_particle_pars_fragment:tw,metalnessmap_fragment:nw,metalnessmap_pars_fragment:iw,morphinstance_vertex:rw,morphcolor_vertex:sw,morphnormal_vertex:ow,morphtarget_pars_vertex:aw,morphtarget_vertex:cw,normal_fragment_begin:lw,normal_fragment_maps:uw,normal_pars_fragment:hw,normal_pars_vertex:fw,normal_vertex:dw,normalmap_pars_fragment:pw,clearcoat_normal_fragment_begin:mw,clearcoat_normal_fragment_maps:gw,clearcoat_pars_fragment:_w,iridescence_pars_fragment:vw,opaque_fragment:xw,packing:yw,premultiplied_alpha_fragment:Sw,project_vertex:Mw,dithering_fragment:Ew,dithering_pars_fragment:bw,roughnessmap_fragment:Tw,roughnessmap_pars_fragment:Aw,shadowmap_pars_fragment:ww,shadowmap_pars_vertex:Rw,shadowmap_vertex:Cw,shadowmask_pars_fragment:Pw,skinbase_vertex:Lw,skinning_pars_vertex:Iw,skinning_vertex:Dw,skinnormal_vertex:Ow,specularmap_fragment:Uw,specularmap_pars_fragment:Nw,tonemapping_fragment:Fw,tonemapping_pars_fragment:Bw,transmission_fragment:zw,transmission_pars_fragment:kw,uv_pars_fragment:Hw,uv_pars_vertex:Gw,uv_vertex:Vw,worldpos_vertex:Ww,background_vert:Xw,background_frag:Yw,backgroundCube_vert:jw,backgroundCube_frag:qw,cube_vert:Kw,cube_frag:Zw,depth_vert:$w,depth_frag:Jw,distanceRGBA_vert:Qw,distanceRGBA_frag:e1,equirect_vert:t1,equirect_frag:n1,linedashed_vert:i1,linedashed_frag:r1,meshbasic_vert:s1,meshbasic_frag:o1,meshlambert_vert:a1,meshlambert_frag:c1,meshmatcap_vert:l1,meshmatcap_frag:u1,meshnormal_vert:h1,meshnormal_frag:f1,meshphong_vert:d1,meshphong_frag:p1,meshphysical_vert:m1,meshphysical_frag:g1,meshtoon_vert:_1,meshtoon_frag:v1,points_vert:x1,points_frag:y1,shadow_vert:S1,shadow_frag:M1,sprite_vert:E1,sprite_frag:b1},be={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},envMapRotation:{value:new ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},Hi={basic:{uniforms:Nn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:Nn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:Nn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:Nn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:Nn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:Nn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:Nn([be.points,be.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:Nn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:Nn([be.common,be.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:Nn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:Nn([be.sprite,be.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ht}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distanceRGBA:{uniforms:Nn([be.common,be.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distanceRGBA_vert,fragmentShader:ut.distanceRGBA_frag},shadow:{uniforms:Nn([be.lights,be.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};Hi.physical={uniforms:Nn([Hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};const Hc={r:0,b:0,g:0},as=new Li,T1=new Qe;function A1(i,e,t,n,r,o,c){const l=new Ne(0);let h=o===!0?0:1,f,d,p=null,m=0,x=null;function M(v,_){let C=!1,b=_.isScene===!0?_.background:null;b&&b.isTexture&&(b=(_.backgroundBlurriness>0?t:e).get(b)),b===null?A(l,h):b&&b.isColor&&(A(b,1),C=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,c):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(i.autoClear||C)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),b&&(b.isCubeTexture||b.mapping===xl)?(d===void 0&&(d=new ye(new qt(1,1,1),new Yr({name:"BackgroundCubeMaterial",uniforms:Mo(Hi.backgroundCube.uniforms),vertexShader:Hi.backgroundCube.vertexShader,fragmentShader:Hi.backgroundCube.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(k,U,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),as.copy(_.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),d.material.uniforms.envMap.value=b,d.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(T1.makeRotationFromEuler(as)),d.material.toneMapped=Ct.getTransfer(b.colorSpace)!==Gt,(p!==b||m!==b.version||x!==i.toneMapping)&&(d.material.needsUpdate=!0,p=b,m=b.version,x=i.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null)):b&&b.isTexture&&(f===void 0&&(f=new ye(new Ss(2,2),new Yr({name:"BackgroundMaterial",uniforms:Mo(Hi.background.uniforms),vertexShader:Hi.background.vertexShader,fragmentShader:Hi.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=b,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.toneMapped=Ct.getTransfer(b.colorSpace)!==Gt,b.matrixAutoUpdate===!0&&b.updateMatrix(),f.material.uniforms.uvTransform.value.copy(b.matrix),(p!==b||m!==b.version||x!==i.toneMapping)&&(f.material.needsUpdate=!0,p=b,m=b.version,x=i.toneMapping),f.layers.enableAll(),v.unshift(f,f.geometry,f.material,0,0,null))}function A(v,_){v.getRGB(Hc,v_(i)),n.buffers.color.setClear(Hc.r,Hc.g,Hc.b,_,c)}return{getClearColor:function(){return l},setClearColor:function(v,_=1){l.set(v),h=_,A(l,h)},getClearAlpha:function(){return h},setClearAlpha:function(v){h=v,A(l,h)},render:M}}function w1(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=m(null);let o=r,c=!1;function l(y,F,V,G,q){let ne=!1;const se=p(G,V,F);o!==se&&(o=se,f(o.object)),ne=x(y,G,V,q),ne&&M(y,G,V,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(ne||c)&&(c=!1,L(y,F,V,G),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function h(){return i.createVertexArray()}function f(y){return i.bindVertexArray(y)}function d(y){return i.deleteVertexArray(y)}function p(y,F,V){const G=V.wireframe===!0;let q=n[y.id];q===void 0&&(q={},n[y.id]=q);let ne=q[F.id];ne===void 0&&(ne={},q[F.id]=ne);let se=ne[G];return se===void 0&&(se=m(h()),ne[G]=se),se}function m(y){const F=[],V=[],G=[];for(let q=0;q<t;q++)F[q]=0,V[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:V,attributeDivisors:G,object:y,attributes:{},index:null}}function x(y,F,V,G){const q=o.attributes,ne=F.attributes;let se=0;const pe=V.getAttributes();for(const K in pe)if(pe[K].location>=0){const me=q[K];let Me=ne[K];if(Me===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(Me=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(Me=y.instanceColor)),me===void 0||me.attribute!==Me||Me&&me.data!==Me.data)return!0;se++}return o.attributesNum!==se||o.index!==G}function M(y,F,V,G){const q={},ne=F.attributes;let se=0;const pe=V.getAttributes();for(const K in pe)if(pe[K].location>=0){let me=ne[K];me===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(me=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(me=y.instanceColor));const Me={};Me.attribute=me,me&&me.data&&(Me.data=me.data),q[K]=Me,se++}o.attributes=q,o.attributesNum=se,o.index=G}function A(){const y=o.newAttributes;for(let F=0,V=y.length;F<V;F++)y[F]=0}function v(y){_(y,0)}function _(y,F){const V=o.newAttributes,G=o.enabledAttributes,q=o.attributeDivisors;V[y]=1,G[y]===0&&(i.enableVertexAttribArray(y),G[y]=1),q[y]!==F&&(i.vertexAttribDivisor(y,F),q[y]=F)}function C(){const y=o.newAttributes,F=o.enabledAttributes;for(let V=0,G=F.length;V<G;V++)F[V]!==y[V]&&(i.disableVertexAttribArray(V),F[V]=0)}function b(y,F,V,G,q,ne,se){se===!0?i.vertexAttribIPointer(y,F,V,q,ne):i.vertexAttribPointer(y,F,V,G,q,ne)}function L(y,F,V,G){A();const q=G.attributes,ne=V.getAttributes(),se=F.defaultAttributeValues;for(const pe in ne){const K=ne[pe];if(K.location>=0){let he=q[pe];if(he===void 0&&(pe==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),pe==="instanceColor"&&y.instanceColor&&(he=y.instanceColor)),he!==void 0){const me=he.normalized,Me=he.itemSize,Ke=e.get(he);if(Ke===void 0)continue;const ot=Ke.buffer,ie=Ke.type,ge=Ke.bytesPerElement,we=ie===i.INT||ie===i.UNSIGNED_INT||he.gpuType===e_;if(he.isInterleavedBufferAttribute){const Se=he.data,Ge=Se.stride,Xe=he.offset;if(Se.isInstancedInterleavedBuffer){for(let at=0;at<K.locationSize;at++)_(K.location+at,Se.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let at=0;at<K.locationSize;at++)v(K.location+at);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let at=0;at<K.locationSize;at++)b(K.location+at,Me/K.locationSize,ie,me,Ge*ge,(Xe+Me/K.locationSize*at)*ge,we)}else{if(he.isInstancedBufferAttribute){for(let Se=0;Se<K.locationSize;Se++)_(K.location+Se,he.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Se=0;Se<K.locationSize;Se++)v(K.location+Se);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let Se=0;Se<K.locationSize;Se++)b(K.location+Se,Me/K.locationSize,ie,me,Me*ge,Me/K.locationSize*Se*ge,we)}}else if(se!==void 0){const me=se[pe];if(me!==void 0)switch(me.length){case 2:i.vertexAttrib2fv(K.location,me);break;case 3:i.vertexAttrib3fv(K.location,me);break;case 4:i.vertexAttrib4fv(K.location,me);break;default:i.vertexAttrib1fv(K.location,me)}}}}C()}function k(){I();for(const y in n){const F=n[y];for(const V in F){const G=F[V];for(const q in G)d(G[q].object),delete G[q];delete F[V]}delete n[y]}}function U(y){if(n[y.id]===void 0)return;const F=n[y.id];for(const V in F){const G=F[V];for(const q in G)d(G[q].object),delete G[q];delete F[V]}delete n[y.id]}function O(y){for(const F in n){const V=n[F];if(V[y.id]===void 0)continue;const G=V[y.id];for(const q in G)d(G[q].object),delete G[q];delete V[y.id]}}function I(){E(),c=!0,o!==r&&(o=r,f(o.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:I,resetDefaultState:E,dispose:k,releaseStatesOfGeometry:U,releaseStatesOfProgram:O,initAttributes:A,enableAttribute:v,disableUnusedAttributes:C}}function R1(i,e,t){let n;function r(h){n=h}function o(h,f){i.drawArrays(n,h,f),t.update(f,n,1)}function c(h,f,d){d!==0&&(i.drawArraysInstanced(n,h,f,d),t.update(f,n,d))}function l(h,f,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d;m++)this.render(h[m],f[m]);else{p.multiDrawArraysWEBGL(n,h,0,f,0,d);let m=0;for(let x=0;x<d;x++)m+=f[x];t.update(m,n,1)}}this.setMode=r,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function C1(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const l=o(c);l!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",l,"instead."),c=l);const h=t.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,precision:c,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:m,maxAttributes:x,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:v,vertexTextures:_,maxSamples:C}}function P1(i){const e=this;let t=null,n=0,r=!1,o=!1;const c=new Hr,l=new ht,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const x=p.length!==0||m||n!==0||r;return r=m,n=p.length,x},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,m){t=d(p,m,0)},this.setState=function(p,m,x){const M=p.clippingPlanes,A=p.clipIntersection,v=p.clipShadows,_=i.get(p);if(!r||M===null||M.length===0||o&&!v)o?d(null):f();else{const C=o?0:n,b=C*4;let L=_.clippingState||null;h.value=L,L=d(M,m,b,x);for(let k=0;k!==b;++k)L[k]=t[k];_.clippingState=L,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=C}};function f(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(p,m,x,M){const A=p!==null?p.length:0;let v=null;if(A!==0){if(v=h.value,M!==!0||v===null){const _=x+A*4,C=m.matrixWorldInverse;l.getNormalMatrix(C),(v===null||v.length<_)&&(v=new Float32Array(_));for(let b=0,L=x;b!==A;++b,L+=4)c.copy(p[b]).applyMatrix4(C,l),c.normal.toArray(v,L),v[L+3]=c.constant}h.value=v,h.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,v}}function L1(i){let e=new WeakMap;function t(c,l){return l===Dh?c.mapping=_o:l===Oh&&(c.mapping=vo),c}function n(c){if(c&&c.isTexture){const l=c.mapping;if(l===Dh||l===Oh)if(e.has(c)){const h=e.get(c).texture;return t(h,c.mapping)}else{const h=c.image;if(h&&h.height>0){const f=new S_(h.height);return f.fromEquirectangularTexture(i,c),e.set(c,f),c.addEventListener("dispose",r),t(f.texture,c.mapping)}else return null}}return c}function r(c){const l=c.target;l.removeEventListener("dispose",r);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}class Sl extends x_{constructor(e=-1,t=1,n=1,r=-1,o=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=o,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,o,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=n-e,c=n+e,l=r+t,h=r-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,c=o+f*this.view.width,l-=d*this.view.offsetY,h=l-d*this.view.height}this.projectionMatrix.makeOrthographic(o,c,l,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const lo=4,Nm=[.125,.215,.35,.446,.526,.582],ms=20,ah=new Sl,Fm=new Ne;let ch=null,lh=0,uh=0,hh=!1;const hs=(1+Math.sqrt(5))/2,no=1/hs,Bm=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,hs,no),new N(0,hs,-no),new N(no,0,hs),new N(-no,0,hs),new N(hs,no,0),new N(-hs,no,0)];class zm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ch=this._renderer.getRenderTarget(),lh=this._renderer.getActiveCubeFace(),uh=this._renderer.getActiveMipmapLevel(),hh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ch,lh,uh),this._renderer.xr.enabled=hh,e.scissorTest=!1,Gc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_o||e.mapping===vo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ch=this._renderer.getRenderTarget(),lh=this._renderer.getActiveCubeFace(),uh=this._renderer.getActiveMipmapLevel(),hh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wn,minFilter:Wn,generateMipmaps:!1,type:ul,format:Ci,colorSpace:yn,depthBuffer:!1},r=km(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=km(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=I1(o)),this._blurMaterial=D1(o,e,t)}return r}_compileMaterial(e){const t=new ye(this._lodPlanes[0],e);this._renderer.compile(t,ah)}_sceneToCubeUV(e,t,n,r){const l=new Bn(90,1,t,n),h=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,m=d.toneMapping;d.getClearColor(Fm),d.toneMapping=yr,d.autoClear=!1;const x=new Wi({name:"PMREM.Background",side:Xn,depthWrite:!1,depthTest:!1}),M=new ye(new qt,x);let A=!1;const v=e.background;v?v.isColor&&(x.color.copy(v),e.background=null,A=!0):(x.color.copy(Fm),A=!0);for(let _=0;_<6;_++){const C=_%3;C===0?(l.up.set(0,h[_],0),l.lookAt(f[_],0,0)):C===1?(l.up.set(0,0,h[_]),l.lookAt(0,f[_],0)):(l.up.set(0,h[_],0),l.lookAt(0,0,f[_]));const b=this._cubeSize;Gc(r,C*b,_>2?b:0,b,b),d.setRenderTarget(r),A&&d.render(M,l),d.render(e,l)}M.geometry.dispose(),M.material.dispose(),d.toneMapping=m,d.autoClear=p,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===_o||e.mapping===vo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hm());const o=r?this._cubemapMaterial:this._equirectMaterial,c=new ye(this._lodPlanes[0],o),l=o.uniforms;l.envMap.value=e;const h=this._cubeSize;Gc(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(c,ah)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),c=Bm[(r-1)%Bm.length];this._blur(e,r-1,r,o,c)}t.autoClear=n}_blur(e,t,n,r,o){const c=this._pingPongRenderTarget;this._halfBlur(e,c,t,n,r,"latitudinal",o),this._halfBlur(c,e,n,n,r,"longitudinal",o)}_halfBlur(e,t,n,r,o,c,l){const h=this._renderer,f=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,p=new ye(this._lodPlanes[r],f),m=f.uniforms,x=this._sizeLods[n]-1,M=isFinite(o)?Math.PI/(2*x):2*Math.PI/(2*ms-1),A=o/M,v=isFinite(o)?1+Math.floor(d*A):ms;v>ms&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${ms}`);const _=[];let C=0;for(let O=0;O<ms;++O){const I=O/A,E=Math.exp(-I*I/2);_.push(E),O===0?C+=E:O<v&&(C+=2*E)}for(let O=0;O<_.length;O++)_[O]=_[O]/C;m.envMap.value=e.texture,m.samples.value=v,m.weights.value=_,m.latitudinal.value=c==="latitudinal",l&&(m.poleAxis.value=l);const{_lodMax:b}=this;m.dTheta.value=M,m.mipInt.value=b-n;const L=this._sizeLods[r],k=3*L*(r>b-lo?r-b+lo:0),U=4*(this._cubeSize-L);Gc(t,k,U,3*L,2*L),h.setRenderTarget(t),h.render(p,ah)}}function I1(i){const e=[],t=[],n=[];let r=i;const o=i-lo+1+Nm.length;for(let c=0;c<o;c++){const l=Math.pow(2,r);t.push(l);let h=1/l;c>i-lo?h=Nm[c-i+lo-1]:c===0&&(h=0),n.push(h);const f=1/(l-2),d=-f,p=1+f,m=[d,d,p,d,p,p,d,d,p,p,d,p],x=6,M=6,A=3,v=2,_=1,C=new Float32Array(A*M*x),b=new Float32Array(v*M*x),L=new Float32Array(_*M*x);for(let U=0;U<x;U++){const O=U%3*2/3-1,I=U>2?0:-1,E=[O,I,0,O+2/3,I,0,O+2/3,I+1,0,O,I,0,O+2/3,I+1,0,O,I+1,0];C.set(E,A*M*U),b.set(m,v*M*U);const y=[U,U,U,U,U,U];L.set(y,_*M*U)}const k=new Jt;k.setAttribute("position",new nn(C,A)),k.setAttribute("uv",new nn(b,v)),k.setAttribute("faceIndex",new nn(L,_)),e.push(k),r>lo&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function km(i,e,t){const n=new vs(i,e,t);return n.texture.mapping=xl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Gc(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function D1(i,e,t){const n=new Float32Array(ms),r=new N(0,1,0);return new Yr({name:"SphericalGaussianBlur",defines:{n:ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:of(),fragmentShader:`

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
		`,blending:Wr,depthTest:!1,depthWrite:!1})}function Hm(){return new Yr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:of(),fragmentShader:`

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
		`,blending:Wr,depthTest:!1,depthWrite:!1})}function Gm(){return new Yr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:of(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wr,depthTest:!1,depthWrite:!1})}function of(){return`

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
	`}function O1(i){let e=new WeakMap,t=null;function n(l){if(l&&l.isTexture){const h=l.mapping,f=h===Dh||h===Oh,d=h===_o||h===vo;if(f||d){let p=e.get(l);const m=p!==void 0?p.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return t===null&&(t=new zm(i)),p=f?t.fromEquirectangular(l,p):t.fromCubemap(l,p),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),p.texture;if(p!==void 0)return p.texture;{const x=l.image;return f&&x&&x.height>0||d&&x&&r(x)?(t===null&&(t=new zm(i)),p=f?t.fromEquirectangular(l):t.fromCubemap(l),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),l.addEventListener("dispose",o),p.texture):null}}}return l}function r(l){let h=0;const f=6;for(let d=0;d<f;d++)l[d]!==void 0&&h++;return h===f}function o(l){const h=l.target;h.removeEventListener("dispose",o);const f=e.get(h);f!==void 0&&(e.delete(h),f.dispose())}function c(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:c}}function U1(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function N1(i,e,t,n){const r={},o=new WeakMap;function c(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const M in m.attributes)e.remove(m.attributes[M]);for(const M in m.morphAttributes){const A=m.morphAttributes[M];for(let v=0,_=A.length;v<_;v++)e.remove(A[v])}m.removeEventListener("dispose",c),delete r[m.id];const x=o.get(m);x&&(e.remove(x),o.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function l(p,m){return r[m.id]===!0||(m.addEventListener("dispose",c),r[m.id]=!0,t.memory.geometries++),m}function h(p){const m=p.attributes;for(const M in m)e.update(m[M],i.ARRAY_BUFFER);const x=p.morphAttributes;for(const M in x){const A=x[M];for(let v=0,_=A.length;v<_;v++)e.update(A[v],i.ARRAY_BUFFER)}}function f(p){const m=[],x=p.index,M=p.attributes.position;let A=0;if(x!==null){const C=x.array;A=x.version;for(let b=0,L=C.length;b<L;b+=3){const k=C[b+0],U=C[b+1],O=C[b+2];m.push(k,U,U,O,O,k)}}else if(M!==void 0){const C=M.array;A=M.version;for(let b=0,L=C.length/3-1;b<L;b+=3){const k=b+0,U=b+1,O=b+2;m.push(k,U,U,O,O,k)}}else return;const v=new(h_(m)?__:g_)(m,1);v.version=A;const _=o.get(p);_&&e.remove(_),o.set(p,v)}function d(p){const m=o.get(p);if(m){const x=p.index;x!==null&&m.version<x.version&&f(p)}else f(p);return o.get(p)}return{get:l,update:h,getWireframeAttribute:d}}function F1(i,e,t){let n;function r(p){n=p}let o,c;function l(p){o=p.type,c=p.bytesPerElement}function h(p,m){i.drawElements(n,m,o,p*c),t.update(m,n,1)}function f(p,m,x){x!==0&&(i.drawElementsInstanced(n,m,o,p*c,x),t.update(m,n,x))}function d(p,m,x){if(x===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let A=0;A<x;A++)this.render(p[A]/c,m[A]);else{M.multiDrawElementsWEBGL(n,m,0,o,p,0,x);let A=0;for(let v=0;v<x;v++)A+=m[v];t.update(A,n,1)}}this.setMode=r,this.setIndex=l,this.render=h,this.renderInstances=f,this.renderMultiDraw=d}function B1(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,c,l){switch(t.calls++,c){case i.TRIANGLES:t.triangles+=l*(o/3);break;case i.LINES:t.lines+=l*(o/2);break;case i.LINE_STRIP:t.lines+=l*(o-1);break;case i.LINE_LOOP:t.lines+=l*o;break;case i.POINTS:t.points+=l*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function z1(i,e,t){const n=new WeakMap,r=new Dt;function o(c,l,h){const f=c.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,p=d!==void 0?d.length:0;let m=n.get(l);if(m===void 0||m.count!==p){let E=function(){O.dispose(),n.delete(l),l.removeEventListener("dispose",E)};m!==void 0&&m.texture.dispose();const x=l.morphAttributes.position!==void 0,M=l.morphAttributes.normal!==void 0,A=l.morphAttributes.color!==void 0,v=l.morphAttributes.position||[],_=l.morphAttributes.normal||[],C=l.morphAttributes.color||[];let b=0;x===!0&&(b=1),M===!0&&(b=2),A===!0&&(b=3);let L=l.attributes.position.count*b,k=1;L>e.maxTextureSize&&(k=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const U=new Float32Array(L*k*4*p),O=new p_(U,L,k,p);O.type=Vi,O.needsUpdate=!0;const I=b*4;for(let y=0;y<p;y++){const F=v[y],V=_[y],G=C[y],q=L*k*4*y;for(let ne=0;ne<F.count;ne++){const se=ne*I;x===!0&&(r.fromBufferAttribute(F,ne),U[q+se+0]=r.x,U[q+se+1]=r.y,U[q+se+2]=r.z,U[q+se+3]=0),M===!0&&(r.fromBufferAttribute(V,ne),U[q+se+4]=r.x,U[q+se+5]=r.y,U[q+se+6]=r.z,U[q+se+7]=0),A===!0&&(r.fromBufferAttribute(G,ne),U[q+se+8]=r.x,U[q+se+9]=r.y,U[q+se+10]=r.z,U[q+se+11]=G.itemSize===4?r.w:1)}}m={count:p,texture:O,size:new Pe(L,k)},n.set(l,m),l.addEventListener("dispose",E)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",c.morphTexture,t);else{let x=0;for(let A=0;A<f.length;A++)x+=f[A];const M=l.morphTargetsRelative?1:1-x;h.getUniforms().setValue(i,"morphTargetBaseInfluence",M),h.getUniforms().setValue(i,"morphTargetInfluences",f)}h.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:o}}function k1(i,e,t,n){let r=new WeakMap;function o(h){const f=n.render.frame,d=h.geometry,p=e.get(h,d);if(r.get(p)!==f&&(e.update(p),r.set(p,f)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),r.get(h)!==f&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),r.set(h,f))),h.isSkinnedMesh){const m=h.skeleton;r.get(m)!==f&&(m.update(),r.set(m,f))}return p}function c(){r=new WeakMap}function l(h){const f=h.target;f.removeEventListener("dispose",l),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:c}}class E_ extends un{constructor(e,t,n,r,o,c,l,h,f,d){if(d=d!==void 0?d:po,d!==po&&d!==Ta)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===po&&(n=xo),n===void 0&&d===Ta&&(n=Ca),super(null,r,o,c,l,h,d,n,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:zn,this.minFilter=h!==void 0?h:zn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const b_=new un,T_=new E_(1,1);T_.compareFunction=u_;const A_=new p_,w_=new AT,R_=new y_,Vm=[],Wm=[],Xm=new Float32Array(16),Ym=new Float32Array(9),jm=new Float32Array(4);function Ao(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let o=Vm[r];if(o===void 0&&(o=new Float32Array(r),Vm[r]=o),e!==0){n.toArray(o,0);for(let c=1,l=0;c!==e;++c)l+=t,i[c].toArray(o,l)}return o}function hn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function fn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ml(i,e){let t=Wm[e];t===void 0&&(t=new Int32Array(e),Wm[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function H1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function G1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;i.uniform2fv(this.addr,e),fn(t,e)}}function V1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(hn(t,e))return;i.uniform3fv(this.addr,e),fn(t,e)}}function W1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;i.uniform4fv(this.addr,e),fn(t,e)}}function X1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,n))return;jm.set(n),i.uniformMatrix2fv(this.addr,!1,jm),fn(t,n)}}function Y1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,n))return;Ym.set(n),i.uniformMatrix3fv(this.addr,!1,Ym),fn(t,n)}}function j1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,n))return;Xm.set(n),i.uniformMatrix4fv(this.addr,!1,Xm),fn(t,n)}}function q1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function K1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;i.uniform2iv(this.addr,e),fn(t,e)}}function Z1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;i.uniform3iv(this.addr,e),fn(t,e)}}function $1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;i.uniform4iv(this.addr,e),fn(t,e)}}function J1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Q1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;i.uniform2uiv(this.addr,e),fn(t,e)}}function eR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;i.uniform3uiv(this.addr,e),fn(t,e)}}function tR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;i.uniform4uiv(this.addr,e),fn(t,e)}}function nR(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const o=this.type===i.SAMPLER_2D_SHADOW?T_:b_;t.setTexture2D(e||o,r)}function iR(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||w_,r)}function rR(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||R_,r)}function sR(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||A_,r)}function oR(i){switch(i){case 5126:return H1;case 35664:return G1;case 35665:return V1;case 35666:return W1;case 35674:return X1;case 35675:return Y1;case 35676:return j1;case 5124:case 35670:return q1;case 35667:case 35671:return K1;case 35668:case 35672:return Z1;case 35669:case 35673:return $1;case 5125:return J1;case 36294:return Q1;case 36295:return eR;case 36296:return tR;case 35678:case 36198:case 36298:case 36306:case 35682:return nR;case 35679:case 36299:case 36307:return iR;case 35680:case 36300:case 36308:case 36293:return rR;case 36289:case 36303:case 36311:case 36292:return sR}}function aR(i,e){i.uniform1fv(this.addr,e)}function cR(i,e){const t=Ao(e,this.size,2);i.uniform2fv(this.addr,t)}function lR(i,e){const t=Ao(e,this.size,3);i.uniform3fv(this.addr,t)}function uR(i,e){const t=Ao(e,this.size,4);i.uniform4fv(this.addr,t)}function hR(i,e){const t=Ao(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function fR(i,e){const t=Ao(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function dR(i,e){const t=Ao(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function pR(i,e){i.uniform1iv(this.addr,e)}function mR(i,e){i.uniform2iv(this.addr,e)}function gR(i,e){i.uniform3iv(this.addr,e)}function _R(i,e){i.uniform4iv(this.addr,e)}function vR(i,e){i.uniform1uiv(this.addr,e)}function xR(i,e){i.uniform2uiv(this.addr,e)}function yR(i,e){i.uniform3uiv(this.addr,e)}function SR(i,e){i.uniform4uiv(this.addr,e)}function MR(i,e,t){const n=this.cache,r=e.length,o=Ml(t,r);hn(n,o)||(i.uniform1iv(this.addr,o),fn(n,o));for(let c=0;c!==r;++c)t.setTexture2D(e[c]||b_,o[c])}function ER(i,e,t){const n=this.cache,r=e.length,o=Ml(t,r);hn(n,o)||(i.uniform1iv(this.addr,o),fn(n,o));for(let c=0;c!==r;++c)t.setTexture3D(e[c]||w_,o[c])}function bR(i,e,t){const n=this.cache,r=e.length,o=Ml(t,r);hn(n,o)||(i.uniform1iv(this.addr,o),fn(n,o));for(let c=0;c!==r;++c)t.setTextureCube(e[c]||R_,o[c])}function TR(i,e,t){const n=this.cache,r=e.length,o=Ml(t,r);hn(n,o)||(i.uniform1iv(this.addr,o),fn(n,o));for(let c=0;c!==r;++c)t.setTexture2DArray(e[c]||A_,o[c])}function AR(i){switch(i){case 5126:return aR;case 35664:return cR;case 35665:return lR;case 35666:return uR;case 35674:return hR;case 35675:return fR;case 35676:return dR;case 5124:case 35670:return pR;case 35667:case 35671:return mR;case 35668:case 35672:return gR;case 35669:case 35673:return _R;case 5125:return vR;case 36294:return xR;case 36295:return yR;case 36296:return SR;case 35678:case 36198:case 36298:case 36306:case 35682:return MR;case 35679:case 36299:case 36307:return ER;case 35680:case 36300:case 36308:case 36293:return bR;case 36289:case 36303:case 36311:case 36292:return TR}}class wR{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=oR(t.type)}}class RR{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=AR(t.type)}}class CR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let o=0,c=r.length;o!==c;++o){const l=r[o];l.setValue(e,t[l.id],n)}}}const fh=/(\w+)(\])?(\[|\.)?/g;function qm(i,e){i.seq.push(e),i.map[e.id]=e}function PR(i,e,t){const n=i.name,r=n.length;for(fh.lastIndex=0;;){const o=fh.exec(n),c=fh.lastIndex;let l=o[1];const h=o[2]==="]",f=o[3];if(h&&(l=l|0),f===void 0||f==="["&&c+2===r){qm(t,f===void 0?new wR(l,i,e):new RR(l,i,e));break}else{let p=t.map[l];p===void 0&&(p=new CR(l),qm(t,p)),t=p}}}class sl{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const o=e.getActiveUniform(t,r),c=e.getUniformLocation(t,o.name);PR(o,c,this)}}setValue(e,t,n,r){const o=this.map[t];o!==void 0&&o.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let o=0,c=t.length;o!==c;++o){const l=t[o],h=n[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,o=e.length;r!==o;++r){const c=e[r];c.id in t&&n.push(c)}return n}}function Km(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const LR=37297;let IR=0;function DR(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let c=r;c<o;c++){const l=c+1;n.push(`${l===e?">":" "} ${l}: ${t[c]}`)}return n.join(`
`)}function OR(i){const e=Ct.getPrimaries(Ct.workingColorSpace),t=Ct.getPrimaries(i);let n;switch(e===t?n="":e===dl&&t===fl?n="LinearDisplayP3ToLinearSRGB":e===fl&&t===dl&&(n="LinearSRGBToLinearDisplayP3"),i){case yn:case yl:return[n,"LinearTransferOETF"];case ln:case tf:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Zm(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+DR(i.getShaderSource(e),c)}else return r}function UR(i,e){const t=OR(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function NR(i,e){let t;switch(e){case Cb:t="Linear";break;case Pb:t="Reinhard";break;case Lb:t="OptimizedCineon";break;case Ib:t="ACESFilmic";break;case Ob:t="AgX";break;case Ub:t="Neutral";break;case Db:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function FR(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fa).join(`
`)}function BR(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function zR(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const o=i.getActiveAttrib(e,r),c=o.name;let l=1;o.type===i.FLOAT_MAT2&&(l=2),o.type===i.FLOAT_MAT3&&(l=3),o.type===i.FLOAT_MAT4&&(l=4),t[c]={type:o.type,location:i.getAttribLocation(e,c),locationSize:l}}return t}function fa(i){return i!==""}function $m(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jm(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fh(i){return i.replace(kR,GR)}const HR=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function GR(i,e){let t=ut[e];if(t===void 0){const n=HR.get(e);if(n!==void 0)t=ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Fh(t)}const VR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qm(i){return i.replace(VR,WR)}function WR(i,e,t,n){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function eg(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function XR(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===qg?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Kg?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===mr&&(e="SHADOWMAP_TYPE_VSM"),e}function YR(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case _o:case vo:e="ENVMAP_TYPE_CUBE";break;case xl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function jR(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vo:e="ENVMAP_MODE_REFRACTION";break}return e}function qR(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Zg:e="ENVMAP_BLENDING_MULTIPLY";break;case wb:e="ENVMAP_BLENDING_MIX";break;case Rb:e="ENVMAP_BLENDING_ADD";break}return e}function KR(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ZR(i,e,t,n){const r=i.getContext(),o=t.defines;let c=t.vertexShader,l=t.fragmentShader;const h=XR(t),f=YR(t),d=jR(t),p=qR(t),m=KR(t),x=FR(t),M=BR(o),A=r.createProgram();let v,_,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(fa).join(`
`),v.length>0&&(v+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(fa).join(`
`),_.length>0&&(_+=`
`)):(v=[eg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fa).join(`
`),_=[eg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yr?"#define TONE_MAPPING":"",t.toneMapping!==yr?ut.tonemapping_pars_fragment:"",t.toneMapping!==yr?NR("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,UR("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fa).join(`
`)),c=Fh(c),c=$m(c,t),c=Jm(c,t),l=Fh(l),l=$m(l,t),l=Jm(l,t),c=Qm(c),l=Qm(l),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,v=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,_=["#define varying in",t.glslVersion===mm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const b=C+v+c,L=C+_+l,k=Km(r,r.VERTEX_SHADER,b),U=Km(r,r.FRAGMENT_SHADER,L);r.attachShader(A,k),r.attachShader(A,U),t.index0AttributeName!==void 0?r.bindAttribLocation(A,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(A,0,"position"),r.linkProgram(A);function O(F){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(A).trim(),G=r.getShaderInfoLog(k).trim(),q=r.getShaderInfoLog(U).trim();let ne=!0,se=!0;if(r.getProgramParameter(A,r.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,A,k,U);else{const pe=Zm(r,k,"vertex"),K=Zm(r,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(A,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+V+`
`+pe+`
`+K)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(G===""||q==="")&&(se=!1);se&&(F.diagnostics={runnable:ne,programLog:V,vertexShader:{log:G,prefix:v},fragmentShader:{log:q,prefix:_}})}r.deleteShader(k),r.deleteShader(U),I=new sl(r,A),E=zR(r,A)}let I;this.getUniforms=function(){return I===void 0&&O(this),I};let E;this.getAttributes=function(){return E===void 0&&O(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(A,LR)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=IR++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=k,this.fragmentShader=U,this}let $R=0;class JR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(n),c=this._getShaderCacheForMaterial(e);return c.has(r)===!1&&(c.add(r),r.usedTimes++),c.has(o)===!1&&(c.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new QR(e),t.set(e,n)),n}}class QR{constructor(e){this.id=$R++,this.code=e,this.usedTimes=0}}function eC(i,e,t,n,r,o,c){const l=new rf,h=new JR,f=new Set,d=[],p=r.logarithmicDepthBuffer,m=r.vertexTextures;let x=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(E){return f.add(E),E===0?"uv":`uv${E}`}function v(E,y,F,V,G){const q=V.fog,ne=G.geometry,se=E.isMeshStandardMaterial?V.environment:null,pe=(E.isMeshStandardMaterial?t:e).get(E.envMap||se),K=pe&&pe.mapping===xl?pe.image.height:null,he=M[E.type];E.precision!==null&&(x=r.getMaxPrecision(E.precision),x!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",x,"instead."));const me=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Me=me!==void 0?me.length:0;let Ke=0;ne.morphAttributes.position!==void 0&&(Ke=1),ne.morphAttributes.normal!==void 0&&(Ke=2),ne.morphAttributes.color!==void 0&&(Ke=3);let ot,ie,ge,we;if(he){const rn=Hi[he];ot=rn.vertexShader,ie=rn.fragmentShader}else ot=E.vertexShader,ie=E.fragmentShader,h.update(E),ge=h.getVertexShaderID(E),we=h.getFragmentShaderID(E);const Se=i.getRenderTarget(),Ge=G.isInstancedMesh===!0,Xe=G.isBatchedMesh===!0,at=!!E.map,j=!!E.matcap,$e=!!pe,ze=!!E.aoMap,bt=!!E.lightMap,He=!!E.bumpMap,Tt=!!E.normalMap,B=!!E.displacementMap,w=!!E.emissiveMap,te=!!E.metalnessMap,ae=!!E.roughnessMap,ue=E.anisotropy>0,de=E.clearcoat>0,Be=E.iridescence>0,_e=E.sheen>0,De=E.transmission>0,Ve=ue&&!!E.anisotropyMap,ve=de&&!!E.clearcoatMap,Te=de&&!!E.clearcoatNormalMap,qe=de&&!!E.clearcoatRoughnessMap,Le=Be&&!!E.iridescenceMap,Ie=Be&&!!E.iridescenceThicknessMap,ct=_e&&!!E.sheenColorMap,ft=_e&&!!E.sheenRoughnessMap,St=!!E.specularMap,gt=!!E.specularColorMap,Mt=!!E.specularIntensityMap,Ue=De&&!!E.transmissionMap,S=De&&!!E.thicknessMap,Z=!!E.gradientMap,oe=!!E.alphaMap,xe=E.alphaTest>0,Re=!!E.alphaHash,_t=!!E.extensions;let dt=yr;E.toneMapped&&(Se===null||Se.isXRRenderTarget===!0)&&(dt=i.toneMapping);const Ft={shaderID:he,shaderType:E.type,shaderName:E.name,vertexShader:ot,fragmentShader:ie,defines:E.defines,customVertexShaderID:ge,customFragmentShaderID:we,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:x,batching:Xe,instancing:Ge,instancingColor:Ge&&G.instanceColor!==null,instancingMorph:Ge&&G.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Se===null?i.outputColorSpace:Se.isXRRenderTarget===!0?Se.texture.colorSpace:yn,alphaToCoverage:!!E.alphaToCoverage,map:at,matcap:j,envMap:$e,envMapMode:$e&&pe.mapping,envMapCubeUVHeight:K,aoMap:ze,lightMap:bt,bumpMap:He,normalMap:Tt,displacementMap:m&&B,emissiveMap:w,normalMapObjectSpace:Tt&&E.normalMapType===Zb,normalMapTangentSpace:Tt&&E.normalMapType===l_,metalnessMap:te,roughnessMap:ae,anisotropy:ue,anisotropyMap:Ve,clearcoat:de,clearcoatMap:ve,clearcoatNormalMap:Te,clearcoatRoughnessMap:qe,iridescence:Be,iridescenceMap:Le,iridescenceThicknessMap:Ie,sheen:_e,sheenColorMap:ct,sheenRoughnessMap:ft,specularMap:St,specularColorMap:gt,specularIntensityMap:Mt,transmission:De,transmissionMap:Ue,thicknessMap:S,gradientMap:Z,opaque:E.transparent===!1&&E.blending===fo&&E.alphaToCoverage===!1,alphaMap:oe,alphaTest:xe,alphaHash:Re,combine:E.combine,mapUv:at&&A(E.map.channel),aoMapUv:ze&&A(E.aoMap.channel),lightMapUv:bt&&A(E.lightMap.channel),bumpMapUv:He&&A(E.bumpMap.channel),normalMapUv:Tt&&A(E.normalMap.channel),displacementMapUv:B&&A(E.displacementMap.channel),emissiveMapUv:w&&A(E.emissiveMap.channel),metalnessMapUv:te&&A(E.metalnessMap.channel),roughnessMapUv:ae&&A(E.roughnessMap.channel),anisotropyMapUv:Ve&&A(E.anisotropyMap.channel),clearcoatMapUv:ve&&A(E.clearcoatMap.channel),clearcoatNormalMapUv:Te&&A(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qe&&A(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&A(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&A(E.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&A(E.sheenColorMap.channel),sheenRoughnessMapUv:ft&&A(E.sheenRoughnessMap.channel),specularMapUv:St&&A(E.specularMap.channel),specularColorMapUv:gt&&A(E.specularColorMap.channel),specularIntensityMapUv:Mt&&A(E.specularIntensityMap.channel),transmissionMapUv:Ue&&A(E.transmissionMap.channel),thicknessMapUv:S&&A(E.thicknessMap.channel),alphaMapUv:oe&&A(E.alphaMap.channel),vertexTangents:!!ne.attributes.tangent&&(Tt||ue),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!ne.attributes.uv&&(at||oe),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:G.isSkinnedMesh===!0,morphTargets:ne.morphAttributes.position!==void 0,morphNormals:ne.morphAttributes.normal!==void 0,morphColors:ne.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Ke,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:dt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:at&&E.map.isVideoTexture===!0&&Ct.getTransfer(E.map.colorSpace)===Gt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ai,flipSided:E.side===Xn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:_t&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:_t&&E.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ft.vertexUv1s=f.has(1),Ft.vertexUv2s=f.has(2),Ft.vertexUv3s=f.has(3),f.clear(),Ft}function _(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const F in E.defines)y.push(F),y.push(E.defines[F]);return E.isRawShaderMaterial===!1&&(C(y,E),b(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function C(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function b(E,y){l.disableAll(),y.supportsVertexTextures&&l.enable(0),y.instancing&&l.enable(1),y.instancingColor&&l.enable(2),y.instancingMorph&&l.enable(3),y.matcap&&l.enable(4),y.envMap&&l.enable(5),y.normalMapObjectSpace&&l.enable(6),y.normalMapTangentSpace&&l.enable(7),y.clearcoat&&l.enable(8),y.iridescence&&l.enable(9),y.alphaTest&&l.enable(10),y.vertexColors&&l.enable(11),y.vertexAlphas&&l.enable(12),y.vertexUv1s&&l.enable(13),y.vertexUv2s&&l.enable(14),y.vertexUv3s&&l.enable(15),y.vertexTangents&&l.enable(16),y.anisotropy&&l.enable(17),y.alphaHash&&l.enable(18),y.batching&&l.enable(19),E.push(l.mask),l.disableAll(),y.fog&&l.enable(0),y.useFog&&l.enable(1),y.flatShading&&l.enable(2),y.logarithmicDepthBuffer&&l.enable(3),y.skinning&&l.enable(4),y.morphTargets&&l.enable(5),y.morphNormals&&l.enable(6),y.morphColors&&l.enable(7),y.premultipliedAlpha&&l.enable(8),y.shadowMapEnabled&&l.enable(9),y.useLegacyLights&&l.enable(10),y.doubleSided&&l.enable(11),y.flipSided&&l.enable(12),y.useDepthPacking&&l.enable(13),y.dithering&&l.enable(14),y.transmission&&l.enable(15),y.sheen&&l.enable(16),y.opaque&&l.enable(17),y.pointsUvs&&l.enable(18),y.decodeVideoTexture&&l.enable(19),y.alphaToCoverage&&l.enable(20),E.push(l.mask)}function L(E){const y=M[E.type];let F;if(y){const V=Hi[y];F=BT.clone(V.uniforms)}else F=E.uniforms;return F}function k(E,y){let F;for(let V=0,G=d.length;V<G;V++){const q=d[V];if(q.cacheKey===y){F=q,++F.usedTimes;break}}return F===void 0&&(F=new ZR(i,y,E,o),d.push(F)),F}function U(E){if(--E.usedTimes===0){const y=d.indexOf(E);d[y]=d[d.length-1],d.pop(),E.destroy()}}function O(E){h.remove(E)}function I(){h.dispose()}return{getParameters:v,getProgramCacheKey:_,getUniforms:L,acquireProgram:k,releaseProgram:U,releaseShaderCache:O,programs:d,dispose:I}}function tC(){let i=new WeakMap;function e(o){let c=i.get(o);return c===void 0&&(c={},i.set(o,c)),c}function t(o){i.delete(o)}function n(o,c,l){i.get(o)[c]=l}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function nC(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function tg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ng(){const i=[];let e=0;const t=[],n=[],r=[];function o(){e=0,t.length=0,n.length=0,r.length=0}function c(p,m,x,M,A,v){let _=i[e];return _===void 0?(_={id:p.id,object:p,geometry:m,material:x,groupOrder:M,renderOrder:p.renderOrder,z:A,group:v},i[e]=_):(_.id=p.id,_.object=p,_.geometry=m,_.material=x,_.groupOrder=M,_.renderOrder=p.renderOrder,_.z=A,_.group=v),e++,_}function l(p,m,x,M,A,v){const _=c(p,m,x,M,A,v);x.transmission>0?n.push(_):x.transparent===!0?r.push(_):t.push(_)}function h(p,m,x,M,A,v){const _=c(p,m,x,M,A,v);x.transmission>0?n.unshift(_):x.transparent===!0?r.unshift(_):t.unshift(_)}function f(p,m){t.length>1&&t.sort(p||nC),n.length>1&&n.sort(m||tg),r.length>1&&r.sort(m||tg)}function d(){for(let p=e,m=i.length;p<m;p++){const x=i[p];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:r,init:o,push:l,unshift:h,finish:d,sort:f}}function iC(){let i=new WeakMap;function e(n,r){const o=i.get(n);let c;return o===void 0?(c=new ng,i.set(n,[c])):r>=o.length?(c=new ng,o.push(c)):c=o[r],c}function t(){i=new WeakMap}return{get:e,dispose:t}}function rC(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Ne};break;case"SpotLight":t={position:new N,direction:new N,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function sC(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let oC=0;function aC(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function cC(i){const e=new rC,t=sC(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)n.probe.push(new N);const r=new N,o=new Qe,c=new Qe;function l(f,d){let p=0,m=0,x=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let M=0,A=0,v=0,_=0,C=0,b=0,L=0,k=0,U=0,O=0,I=0;f.sort(aC);const E=d===!0?Math.PI:1;for(let F=0,V=f.length;F<V;F++){const G=f[F],q=G.color,ne=G.intensity,se=G.distance,pe=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)p+=q.r*ne*E,m+=q.g*ne*E,x+=q.b*ne*E;else if(G.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(G.sh.coefficients[K],ne);I++}else if(G.isDirectionalLight){const K=e.get(G);if(K.color.copy(G.color).multiplyScalar(G.intensity*E),G.castShadow){const he=G.shadow,me=t.get(G);me.shadowBias=he.bias,me.shadowNormalBias=he.normalBias,me.shadowRadius=he.radius,me.shadowMapSize=he.mapSize,n.directionalShadow[M]=me,n.directionalShadowMap[M]=pe,n.directionalShadowMatrix[M]=G.shadow.matrix,b++}n.directional[M]=K,M++}else if(G.isSpotLight){const K=e.get(G);K.position.setFromMatrixPosition(G.matrixWorld),K.color.copy(q).multiplyScalar(ne*E),K.distance=se,K.coneCos=Math.cos(G.angle),K.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),K.decay=G.decay,n.spot[v]=K;const he=G.shadow;if(G.map&&(n.spotLightMap[U]=G.map,U++,he.updateMatrices(G),G.castShadow&&O++),n.spotLightMatrix[v]=he.matrix,G.castShadow){const me=t.get(G);me.shadowBias=he.bias,me.shadowNormalBias=he.normalBias,me.shadowRadius=he.radius,me.shadowMapSize=he.mapSize,n.spotShadow[v]=me,n.spotShadowMap[v]=pe,k++}v++}else if(G.isRectAreaLight){const K=e.get(G);K.color.copy(q).multiplyScalar(ne),K.halfWidth.set(G.width*.5,0,0),K.halfHeight.set(0,G.height*.5,0),n.rectArea[_]=K,_++}else if(G.isPointLight){const K=e.get(G);if(K.color.copy(G.color).multiplyScalar(G.intensity*E),K.distance=G.distance,K.decay=G.decay,G.castShadow){const he=G.shadow,me=t.get(G);me.shadowBias=he.bias,me.shadowNormalBias=he.normalBias,me.shadowRadius=he.radius,me.shadowMapSize=he.mapSize,me.shadowCameraNear=he.camera.near,me.shadowCameraFar=he.camera.far,n.pointShadow[A]=me,n.pointShadowMap[A]=pe,n.pointShadowMatrix[A]=G.shadow.matrix,L++}n.point[A]=K,A++}else if(G.isHemisphereLight){const K=e.get(G);K.skyColor.copy(G.color).multiplyScalar(ne*E),K.groundColor.copy(G.groundColor).multiplyScalar(ne*E),n.hemi[C]=K,C++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=be.LTC_FLOAT_1,n.rectAreaLTC2=be.LTC_FLOAT_2):(n.rectAreaLTC1=be.LTC_HALF_1,n.rectAreaLTC2=be.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=m,n.ambient[2]=x;const y=n.hash;(y.directionalLength!==M||y.pointLength!==A||y.spotLength!==v||y.rectAreaLength!==_||y.hemiLength!==C||y.numDirectionalShadows!==b||y.numPointShadows!==L||y.numSpotShadows!==k||y.numSpotMaps!==U||y.numLightProbes!==I)&&(n.directional.length=M,n.spot.length=v,n.rectArea.length=_,n.point.length=A,n.hemi.length=C,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=k,n.spotShadowMap.length=k,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=k+U-O,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=O,n.numLightProbes=I,y.directionalLength=M,y.pointLength=A,y.spotLength=v,y.rectAreaLength=_,y.hemiLength=C,y.numDirectionalShadows=b,y.numPointShadows=L,y.numSpotShadows=k,y.numSpotMaps=U,y.numLightProbes=I,n.version=oC++)}function h(f,d){let p=0,m=0,x=0,M=0,A=0;const v=d.matrixWorldInverse;for(let _=0,C=f.length;_<C;_++){const b=f[_];if(b.isDirectionalLight){const L=n.directional[p];L.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(v),p++}else if(b.isSpotLight){const L=n.spot[x];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(v),L.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(v),x++}else if(b.isRectAreaLight){const L=n.rectArea[M];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(v),c.identity(),o.copy(b.matrixWorld),o.premultiply(v),c.extractRotation(o),L.halfWidth.set(b.width*.5,0,0),L.halfHeight.set(0,b.height*.5,0),L.halfWidth.applyMatrix4(c),L.halfHeight.applyMatrix4(c),M++}else if(b.isPointLight){const L=n.point[m];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(v),m++}else if(b.isHemisphereLight){const L=n.hemi[A];L.direction.setFromMatrixPosition(b.matrixWorld),L.direction.transformDirection(v),A++}}}return{setup:l,setupView:h,state:n}}function ig(i){const e=new cC(i),t=[],n=[];function r(){t.length=0,n.length=0}function o(d){t.push(d)}function c(d){n.push(d)}function l(d){e.setup(t,d)}function h(d){e.setupView(t,d)}return{init:r,state:{lightsArray:t,shadowsArray:n,lights:e,transmissionRenderTarget:null},setupLights:l,setupLightsView:h,pushLight:o,pushShadow:c}}function lC(i){let e=new WeakMap;function t(r,o=0){const c=e.get(r);let l;return c===void 0?(l=new ig(i),e.set(r,[l])):o>=c.length?(l=new ig(i),c.push(l)):l=c[o],l}function n(){e=new WeakMap}return{get:t,dispose:n}}class uC extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hC extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const fC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dC=`uniform sampler2D shadow_pass;
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
}`;function pC(i,e,t){let n=new sf;const r=new Pe,o=new Pe,c=new Dt,l=new uC({depthPacking:Kb}),h=new hC,f={},d=t.maxTextureSize,p={[Yi]:Xn,[Xn]:Yi,[Ai]:Ai},m=new Yr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:fC,fragmentShader:dC}),x=m.clone();x.defines.HORIZONTAL_PASS=1;const M=new Jt;M.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new ye(M,m),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qg;let _=this.type;this.render=function(U,O,I){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||U.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Wr),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const G=_!==mr&&this.type===mr,q=_===mr&&this.type!==mr;for(let ne=0,se=U.length;ne<se;ne++){const pe=U[ne],K=pe.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",pe,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);const he=K.getFrameExtents();if(r.multiply(he),o.copy(K.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(o.x=Math.floor(d/he.x),r.x=o.x*he.x,K.mapSize.x=o.x),r.y>d&&(o.y=Math.floor(d/he.y),r.y=o.y*he.y,K.mapSize.y=o.y)),K.map===null||G===!0||q===!0){const Me=this.type!==mr?{minFilter:zn,magFilter:zn}:{};K.map!==null&&K.map.dispose(),K.map=new vs(r.x,r.y,Me),K.map.texture.name=pe.name+".shadowMap",K.camera.updateProjectionMatrix()}i.setRenderTarget(K.map),i.clear();const me=K.getViewportCount();for(let Me=0;Me<me;Me++){const Ke=K.getViewport(Me);c.set(o.x*Ke.x,o.y*Ke.y,o.x*Ke.z,o.y*Ke.w),V.viewport(c),K.updateMatrices(pe,Me),n=K.getFrustum(),L(O,I,K.camera,pe,this.type)}K.isPointLightShadow!==!0&&this.type===mr&&C(K,I),K.needsUpdate=!1}_=this.type,v.needsUpdate=!1,i.setRenderTarget(E,y,F)};function C(U,O){const I=e.update(A);m.defines.VSM_SAMPLES!==U.blurSamples&&(m.defines.VSM_SAMPLES=U.blurSamples,x.defines.VSM_SAMPLES=U.blurSamples,m.needsUpdate=!0,x.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new vs(r.x,r.y)),m.uniforms.shadow_pass.value=U.map.texture,m.uniforms.resolution.value=U.mapSize,m.uniforms.radius.value=U.radius,i.setRenderTarget(U.mapPass),i.clear(),i.renderBufferDirect(O,null,I,m,A,null),x.uniforms.shadow_pass.value=U.mapPass.texture,x.uniforms.resolution.value=U.mapSize,x.uniforms.radius.value=U.radius,i.setRenderTarget(U.map),i.clear(),i.renderBufferDirect(O,null,I,x,A,null)}function b(U,O,I,E){let y=null;const F=I.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(F!==void 0)y=F;else if(y=I.isPointLight===!0?h:l,i.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const V=y.uuid,G=O.uuid;let q=f[V];q===void 0&&(q={},f[V]=q);let ne=q[G];ne===void 0&&(ne=y.clone(),q[G]=ne,O.addEventListener("dispose",k)),y=ne}if(y.visible=O.visible,y.wireframe=O.wireframe,E===mr?y.side=O.shadowSide!==null?O.shadowSide:O.side:y.side=O.shadowSide!==null?O.shadowSide:p[O.side],y.alphaMap=O.alphaMap,y.alphaTest=O.alphaTest,y.map=O.map,y.clipShadows=O.clipShadows,y.clippingPlanes=O.clippingPlanes,y.clipIntersection=O.clipIntersection,y.displacementMap=O.displacementMap,y.displacementScale=O.displacementScale,y.displacementBias=O.displacementBias,y.wireframeLinewidth=O.wireframeLinewidth,y.linewidth=O.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const V=i.properties.get(y);V.light=I}return y}function L(U,O,I,E,y){if(U.visible===!1)return;if(U.layers.test(O.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&y===mr)&&(!U.frustumCulled||n.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,U.matrixWorld);const G=e.update(U),q=U.material;if(Array.isArray(q)){const ne=G.groups;for(let se=0,pe=ne.length;se<pe;se++){const K=ne[se],he=q[K.materialIndex];if(he&&he.visible){const me=b(U,he,E,y);U.onBeforeShadow(i,U,O,I,G,me,K),i.renderBufferDirect(I,null,G,me,U,K),U.onAfterShadow(i,U,O,I,G,me,K)}}}else if(q.visible){const ne=b(U,q,E,y);U.onBeforeShadow(i,U,O,I,G,ne,null),i.renderBufferDirect(I,null,G,ne,U,null),U.onAfterShadow(i,U,O,I,G,ne,null)}}const V=U.children;for(let G=0,q=V.length;G<q;G++)L(V[G],O,I,E,y)}function k(U){U.target.removeEventListener("dispose",k);for(const I in f){const E=f[I],y=U.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}function mC(i){function e(){let S=!1;const Z=new Dt;let oe=null;const xe=new Dt(0,0,0,0);return{setMask:function(Re){oe!==Re&&!S&&(i.colorMask(Re,Re,Re,Re),oe=Re)},setLocked:function(Re){S=Re},setClear:function(Re,_t,dt,Ft,rn){rn===!0&&(Re*=Ft,_t*=Ft,dt*=Ft),Z.set(Re,_t,dt,Ft),xe.equals(Z)===!1&&(i.clearColor(Re,_t,dt,Ft),xe.copy(Z))},reset:function(){S=!1,oe=null,xe.set(-1,0,0,0)}}}function t(){let S=!1,Z=null,oe=null,xe=null;return{setTest:function(Re){Re?we(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(Re){Z!==Re&&!S&&(i.depthMask(Re),Z=Re)},setFunc:function(Re){if(oe!==Re){switch(Re){case yb:i.depthFunc(i.NEVER);break;case Sb:i.depthFunc(i.ALWAYS);break;case Mb:i.depthFunc(i.LESS);break;case ll:i.depthFunc(i.LEQUAL);break;case Eb:i.depthFunc(i.EQUAL);break;case bb:i.depthFunc(i.GEQUAL);break;case Tb:i.depthFunc(i.GREATER);break;case Ab:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Re}},setLocked:function(Re){S=Re},setClear:function(Re){xe!==Re&&(i.clearDepth(Re),xe=Re)},reset:function(){S=!1,Z=null,oe=null,xe=null}}}function n(){let S=!1,Z=null,oe=null,xe=null,Re=null,_t=null,dt=null,Ft=null,rn=null;return{setTest:function(At){S||(At?we(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(At){Z!==At&&!S&&(i.stencilMask(At),Z=At)},setFunc:function(At,Kt,Zt){(oe!==At||xe!==Kt||Re!==Zt)&&(i.stencilFunc(At,Kt,Zt),oe=At,xe=Kt,Re=Zt)},setOp:function(At,Kt,Zt){(_t!==At||dt!==Kt||Ft!==Zt)&&(i.stencilOp(At,Kt,Zt),_t=At,dt=Kt,Ft=Zt)},setLocked:function(At){S=At},setClear:function(At){rn!==At&&(i.clearStencil(At),rn=At)},reset:function(){S=!1,Z=null,oe=null,xe=null,Re=null,_t=null,dt=null,Ft=null,rn=null}}}const r=new e,o=new t,c=new n,l=new WeakMap,h=new WeakMap;let f={},d={},p=new WeakMap,m=[],x=null,M=!1,A=null,v=null,_=null,C=null,b=null,L=null,k=null,U=new Ne(0,0,0),O=0,I=!1,E=null,y=null,F=null,V=null,G=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ne=!1,se=0;const pe=i.getParameter(i.VERSION);pe.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(pe)[1]),ne=se>=1):pe.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(pe)[1]),ne=se>=2);let K=null,he={};const me=i.getParameter(i.SCISSOR_BOX),Me=i.getParameter(i.VIEWPORT),Ke=new Dt().fromArray(me),ot=new Dt().fromArray(Me);function ie(S,Z,oe,xe){const Re=new Uint8Array(4),_t=i.createTexture();i.bindTexture(S,_t),i.texParameteri(S,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(S,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let dt=0;dt<oe;dt++)S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY?i.texImage3D(Z,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,Re):i.texImage2D(Z+dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Re);return _t}const ge={};ge[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),we(i.DEPTH_TEST),o.setFunc(ll),He(!1),Tt(Up),we(i.CULL_FACE),ze(Wr);function we(S){f[S]!==!0&&(i.enable(S),f[S]=!0)}function Se(S){f[S]!==!1&&(i.disable(S),f[S]=!1)}function Ge(S,Z){return d[S]!==Z?(i.bindFramebuffer(S,Z),d[S]=Z,S===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=Z),S===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=Z),!0):!1}function Xe(S,Z){let oe=m,xe=!1;if(S){oe=p.get(Z),oe===void 0&&(oe=[],p.set(Z,oe));const Re=S.textures;if(oe.length!==Re.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let _t=0,dt=Re.length;_t<dt;_t++)oe[_t]=i.COLOR_ATTACHMENT0+_t;oe.length=Re.length,xe=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,xe=!0);xe&&i.drawBuffers(oe)}function at(S){return x!==S?(i.useProgram(S),x=S,!0):!1}const j={[ps]:i.FUNC_ADD,[ib]:i.FUNC_SUBTRACT,[rb]:i.FUNC_REVERSE_SUBTRACT};j[sb]=i.MIN,j[ob]=i.MAX;const $e={[ab]:i.ZERO,[cb]:i.ONE,[lb]:i.SRC_COLOR,[Lh]:i.SRC_ALPHA,[mb]:i.SRC_ALPHA_SATURATE,[db]:i.DST_COLOR,[hb]:i.DST_ALPHA,[ub]:i.ONE_MINUS_SRC_COLOR,[Ih]:i.ONE_MINUS_SRC_ALPHA,[pb]:i.ONE_MINUS_DST_COLOR,[fb]:i.ONE_MINUS_DST_ALPHA,[gb]:i.CONSTANT_COLOR,[_b]:i.ONE_MINUS_CONSTANT_COLOR,[vb]:i.CONSTANT_ALPHA,[xb]:i.ONE_MINUS_CONSTANT_ALPHA};function ze(S,Z,oe,xe,Re,_t,dt,Ft,rn,At){if(S===Wr){M===!0&&(Se(i.BLEND),M=!1);return}if(M===!1&&(we(i.BLEND),M=!0),S!==nb){if(S!==A||At!==I){if((v!==ps||b!==ps)&&(i.blendEquation(i.FUNC_ADD),v=ps,b=ps),At)switch(S){case fo:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Np:i.blendFunc(i.ONE,i.ONE);break;case Fp:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bp:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case fo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Np:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Fp:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bp:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}_=null,C=null,L=null,k=null,U.set(0,0,0),O=0,A=S,I=At}return}Re=Re||Z,_t=_t||oe,dt=dt||xe,(Z!==v||Re!==b)&&(i.blendEquationSeparate(j[Z],j[Re]),v=Z,b=Re),(oe!==_||xe!==C||_t!==L||dt!==k)&&(i.blendFuncSeparate($e[oe],$e[xe],$e[_t],$e[dt]),_=oe,C=xe,L=_t,k=dt),(Ft.equals(U)===!1||rn!==O)&&(i.blendColor(Ft.r,Ft.g,Ft.b,rn),U.copy(Ft),O=rn),A=S,I=!1}function bt(S,Z){S.side===Ai?Se(i.CULL_FACE):we(i.CULL_FACE);let oe=S.side===Xn;Z&&(oe=!oe),He(oe),S.blending===fo&&S.transparent===!1?ze(Wr):ze(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),o.setFunc(S.depthFunc),o.setTest(S.depthTest),o.setMask(S.depthWrite),r.setMask(S.colorWrite);const xe=S.stencilWrite;c.setTest(xe),xe&&(c.setMask(S.stencilWriteMask),c.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),c.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),w(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?we(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function He(S){E!==S&&(S?i.frontFace(i.CW):i.frontFace(i.CCW),E=S)}function Tt(S){S!==eb?(we(i.CULL_FACE),S!==y&&(S===Up?i.cullFace(i.BACK):S===tb?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),y=S}function B(S){S!==F&&(ne&&i.lineWidth(S),F=S)}function w(S,Z,oe){S?(we(i.POLYGON_OFFSET_FILL),(V!==Z||G!==oe)&&(i.polygonOffset(Z,oe),V=Z,G=oe)):Se(i.POLYGON_OFFSET_FILL)}function te(S){S?we(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function ae(S){S===void 0&&(S=i.TEXTURE0+q-1),K!==S&&(i.activeTexture(S),K=S)}function ue(S,Z,oe){oe===void 0&&(K===null?oe=i.TEXTURE0+q-1:oe=K);let xe=he[oe];xe===void 0&&(xe={type:void 0,texture:void 0},he[oe]=xe),(xe.type!==S||xe.texture!==Z)&&(K!==oe&&(i.activeTexture(oe),K=oe),i.bindTexture(S,Z||ge[S]),xe.type=S,xe.texture=Z)}function de(){const S=he[K];S!==void 0&&S.type!==void 0&&(i.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function Be(){try{i.compressedTexImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function _e(){try{i.compressedTexImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function De(){try{i.texSubImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ve(){try{i.texSubImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ve(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Te(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function qe(){try{i.texStorage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Le(){try{i.texStorage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ie(){try{i.texImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ct(){try{i.texImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ft(S){Ke.equals(S)===!1&&(i.scissor(S.x,S.y,S.z,S.w),Ke.copy(S))}function St(S){ot.equals(S)===!1&&(i.viewport(S.x,S.y,S.z,S.w),ot.copy(S))}function gt(S,Z){let oe=h.get(Z);oe===void 0&&(oe=new WeakMap,h.set(Z,oe));let xe=oe.get(S);xe===void 0&&(xe=i.getUniformBlockIndex(Z,S.name),oe.set(S,xe))}function Mt(S,Z){const xe=h.get(Z).get(S);l.get(Z)!==xe&&(i.uniformBlockBinding(Z,xe,S.__bindingPointIndex),l.set(Z,xe))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},K=null,he={},d={},p=new WeakMap,m=[],x=null,M=!1,A=null,v=null,_=null,C=null,b=null,L=null,k=null,U=new Ne(0,0,0),O=0,I=!1,E=null,y=null,F=null,V=null,G=null,Ke.set(0,0,i.canvas.width,i.canvas.height),ot.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:we,disable:Se,bindFramebuffer:Ge,drawBuffers:Xe,useProgram:at,setBlending:ze,setMaterial:bt,setFlipSided:He,setCullFace:Tt,setLineWidth:B,setPolygonOffset:w,setScissorTest:te,activeTexture:ae,bindTexture:ue,unbindTexture:de,compressedTexImage2D:Be,compressedTexImage3D:_e,texImage2D:Ie,texImage3D:ct,updateUBOMapping:gt,uniformBlockBinding:Mt,texStorage2D:qe,texStorage3D:Le,texSubImage2D:De,texSubImage3D:Ve,compressedTexSubImage2D:ve,compressedTexSubImage3D:Te,scissor:ft,viewport:St,reset:Ue}}function gC(i,e,t,n,r,o,c){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Pe,d=new WeakMap;let p;const m=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(B,w){return x?new OffscreenCanvas(B,w):wa("canvas")}function A(B,w,te){let ae=1;const ue=Tt(B);if((ue.width>te||ue.height>te)&&(ae=te/Math.max(ue.width,ue.height)),ae<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const de=Math.floor(ae*ue.width),Be=Math.floor(ae*ue.height);p===void 0&&(p=M(de,Be));const _e=w?M(de,Be):p;return _e.width=de,_e.height=Be,_e.getContext("2d").drawImage(B,0,0,de,Be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+de+"x"+Be+")."),_e}else return"data"in B&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),B;return B}function v(B){return B.generateMipmaps&&B.minFilter!==zn&&B.minFilter!==Wn}function _(B){i.generateMipmap(B)}function C(B,w,te,ae,ue=!1){if(B!==null){if(i[B]!==void 0)return i[B];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let de=w;if(w===i.RED&&(te===i.FLOAT&&(de=i.R32F),te===i.HALF_FLOAT&&(de=i.R16F),te===i.UNSIGNED_BYTE&&(de=i.R8)),w===i.RED_INTEGER&&(te===i.UNSIGNED_BYTE&&(de=i.R8UI),te===i.UNSIGNED_SHORT&&(de=i.R16UI),te===i.UNSIGNED_INT&&(de=i.R32UI),te===i.BYTE&&(de=i.R8I),te===i.SHORT&&(de=i.R16I),te===i.INT&&(de=i.R32I)),w===i.RG&&(te===i.FLOAT&&(de=i.RG32F),te===i.HALF_FLOAT&&(de=i.RG16F),te===i.UNSIGNED_BYTE&&(de=i.RG8)),w===i.RG_INTEGER&&(te===i.UNSIGNED_BYTE&&(de=i.RG8UI),te===i.UNSIGNED_SHORT&&(de=i.RG16UI),te===i.UNSIGNED_INT&&(de=i.RG32UI),te===i.BYTE&&(de=i.RG8I),te===i.SHORT&&(de=i.RG16I),te===i.INT&&(de=i.RG32I)),w===i.RGB&&te===i.UNSIGNED_INT_5_9_9_9_REV&&(de=i.RGB9_E5),w===i.RGBA){const Be=ue?hl:Ct.getTransfer(ae);te===i.FLOAT&&(de=i.RGBA32F),te===i.HALF_FLOAT&&(de=i.RGBA16F),te===i.UNSIGNED_BYTE&&(de=Be===Gt?i.SRGB8_ALPHA8:i.RGBA8),te===i.UNSIGNED_SHORT_4_4_4_4&&(de=i.RGBA4),te===i.UNSIGNED_SHORT_5_5_5_1&&(de=i.RGB5_A1)}return(de===i.R16F||de===i.R32F||de===i.RG16F||de===i.RG32F||de===i.RGBA16F||de===i.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function b(B,w){return v(B)===!0||B.isFramebufferTexture&&B.minFilter!==zn&&B.minFilter!==Wn?Math.log2(Math.max(w.width,w.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?w.mipmaps.length:1}function L(B){const w=B.target;w.removeEventListener("dispose",L),U(w),w.isVideoTexture&&d.delete(w)}function k(B){const w=B.target;w.removeEventListener("dispose",k),I(w)}function U(B){const w=n.get(B);if(w.__webglInit===void 0)return;const te=B.source,ae=m.get(te);if(ae){const ue=ae[w.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&O(B),Object.keys(ae).length===0&&m.delete(te)}n.remove(B)}function O(B){const w=n.get(B);i.deleteTexture(w.__webglTexture);const te=B.source,ae=m.get(te);delete ae[w.__cacheKey],c.memory.textures--}function I(B){const w=n.get(B);if(B.depthTexture&&B.depthTexture.dispose(),B.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(w.__webglFramebuffer[ae]))for(let ue=0;ue<w.__webglFramebuffer[ae].length;ue++)i.deleteFramebuffer(w.__webglFramebuffer[ae][ue]);else i.deleteFramebuffer(w.__webglFramebuffer[ae]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[ae])}else{if(Array.isArray(w.__webglFramebuffer))for(let ae=0;ae<w.__webglFramebuffer.length;ae++)i.deleteFramebuffer(w.__webglFramebuffer[ae]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ae=0;ae<w.__webglColorRenderbuffer.length;ae++)w.__webglColorRenderbuffer[ae]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[ae]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const te=B.textures;for(let ae=0,ue=te.length;ae<ue;ae++){const de=n.get(te[ae]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),c.memory.textures--),n.remove(te[ae])}n.remove(B)}let E=0;function y(){E=0}function F(){const B=E;return B>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+r.maxTextures),E+=1,B}function V(B){const w=[];return w.push(B.wrapS),w.push(B.wrapT),w.push(B.wrapR||0),w.push(B.magFilter),w.push(B.minFilter),w.push(B.anisotropy),w.push(B.internalFormat),w.push(B.format),w.push(B.type),w.push(B.generateMipmaps),w.push(B.premultiplyAlpha),w.push(B.flipY),w.push(B.unpackAlignment),w.push(B.colorSpace),w.join()}function G(B,w){const te=n.get(B);if(B.isVideoTexture&&bt(B),B.isRenderTargetTexture===!1&&B.version>0&&te.__version!==B.version){const ae=B.image;if(ae===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ke(te,B,w);return}}t.bindTexture(i.TEXTURE_2D,te.__webglTexture,i.TEXTURE0+w)}function q(B,w){const te=n.get(B);if(B.version>0&&te.__version!==B.version){Ke(te,B,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,te.__webglTexture,i.TEXTURE0+w)}function ne(B,w){const te=n.get(B);if(B.version>0&&te.__version!==B.version){Ke(te,B,w);return}t.bindTexture(i.TEXTURE_3D,te.__webglTexture,i.TEXTURE0+w)}function se(B,w){const te=n.get(B);if(B.version>0&&te.__version!==B.version){ot(te,B,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture,i.TEXTURE0+w)}const pe={[_s]:i.REPEAT,[gr]:i.CLAMP_TO_EDGE,[ba]:i.MIRRORED_REPEAT},K={[zn]:i.NEAREST,[Jg]:i.NEAREST_MIPMAP_NEAREST,[ha]:i.NEAREST_MIPMAP_LINEAR,[Wn]:i.LINEAR,[rl]:i.LINEAR_MIPMAP_NEAREST,[_r]:i.LINEAR_MIPMAP_LINEAR},he={[$b]:i.NEVER,[iT]:i.ALWAYS,[Jb]:i.LESS,[u_]:i.LEQUAL,[Qb]:i.EQUAL,[nT]:i.GEQUAL,[eT]:i.GREATER,[tT]:i.NOTEQUAL};function me(B,w){if(w.type===Vi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Wn||w.magFilter===rl||w.magFilter===ha||w.magFilter===_r||w.minFilter===Wn||w.minFilter===rl||w.minFilter===ha||w.minFilter===_r)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(B,i.TEXTURE_WRAP_S,pe[w.wrapS]),i.texParameteri(B,i.TEXTURE_WRAP_T,pe[w.wrapT]),(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)&&i.texParameteri(B,i.TEXTURE_WRAP_R,pe[w.wrapR]),i.texParameteri(B,i.TEXTURE_MAG_FILTER,K[w.magFilter]),i.texParameteri(B,i.TEXTURE_MIN_FILTER,K[w.minFilter]),w.compareFunction&&(i.texParameteri(B,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(B,i.TEXTURE_COMPARE_FUNC,he[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===zn||w.minFilter!==ha&&w.minFilter!==_r||w.type===Vi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const te=e.get("EXT_texture_filter_anisotropic");i.texParameterf(B,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Me(B,w){let te=!1;B.__webglInit===void 0&&(B.__webglInit=!0,w.addEventListener("dispose",L));const ae=w.source;let ue=m.get(ae);ue===void 0&&(ue={},m.set(ae,ue));const de=V(w);if(de!==B.__cacheKey){ue[de]===void 0&&(ue[de]={texture:i.createTexture(),usedTimes:0},c.memory.textures++,te=!0),ue[de].usedTimes++;const Be=ue[B.__cacheKey];Be!==void 0&&(ue[B.__cacheKey].usedTimes--,Be.usedTimes===0&&O(w)),B.__cacheKey=de,B.__webglTexture=ue[de].texture}return te}function Ke(B,w,te){let ae=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ae=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ae=i.TEXTURE_3D);const ue=Me(B,w),de=w.source;t.bindTexture(ae,B.__webglTexture,i.TEXTURE0+te);const Be=n.get(de);if(de.version!==Be.__version||ue===!0){t.activeTexture(i.TEXTURE0+te);const _e=Ct.getPrimaries(Ct.workingColorSpace),De=w.colorSpace===Fn?null:Ct.getPrimaries(w.colorSpace),Ve=w.colorSpace===Fn||_e===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let ve=A(w.image,!1,r.maxTextureSize);ve=He(w,ve);const Te=o.convert(w.format,w.colorSpace),qe=o.convert(w.type);let Le=C(w.internalFormat,Te,qe,w.colorSpace,w.isVideoTexture);me(ae,w);let Ie;const ct=w.mipmaps,ft=w.isVideoTexture!==!0&&Le!==a_,St=Be.__version===void 0||ue===!0,gt=de.dataReady,Mt=b(w,ve);if(w.isDepthTexture)Le=i.DEPTH_COMPONENT16,w.type===Vi?Le=i.DEPTH_COMPONENT32F:w.type===xo?Le=i.DEPTH_COMPONENT24:w.type===Ca&&(Le=i.DEPTH24_STENCIL8),St&&(ft?t.texStorage2D(i.TEXTURE_2D,1,Le,ve.width,ve.height):t.texImage2D(i.TEXTURE_2D,0,Le,ve.width,ve.height,0,Te,qe,null));else if(w.isDataTexture)if(ct.length>0){ft&&St&&t.texStorage2D(i.TEXTURE_2D,Mt,Le,ct[0].width,ct[0].height);for(let Ue=0,S=ct.length;Ue<S;Ue++)Ie=ct[Ue],ft?gt&&t.texSubImage2D(i.TEXTURE_2D,Ue,0,0,Ie.width,Ie.height,Te,qe,Ie.data):t.texImage2D(i.TEXTURE_2D,Ue,Le,Ie.width,Ie.height,0,Te,qe,Ie.data);w.generateMipmaps=!1}else ft?(St&&t.texStorage2D(i.TEXTURE_2D,Mt,Le,ve.width,ve.height),gt&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve.width,ve.height,Te,qe,ve.data)):t.texImage2D(i.TEXTURE_2D,0,Le,ve.width,ve.height,0,Te,qe,ve.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ft&&St&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Le,ct[0].width,ct[0].height,ve.depth);for(let Ue=0,S=ct.length;Ue<S;Ue++)Ie=ct[Ue],w.format!==Ci?Te!==null?ft?gt&&t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ue,0,0,0,Ie.width,Ie.height,ve.depth,Te,Ie.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Ue,Le,Ie.width,Ie.height,ve.depth,0,Ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?gt&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Ue,0,0,0,Ie.width,Ie.height,ve.depth,Te,qe,Ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Ue,Le,Ie.width,Ie.height,ve.depth,0,Te,qe,Ie.data)}else{ft&&St&&t.texStorage2D(i.TEXTURE_2D,Mt,Le,ct[0].width,ct[0].height);for(let Ue=0,S=ct.length;Ue<S;Ue++)Ie=ct[Ue],w.format!==Ci?Te!==null?ft?gt&&t.compressedTexSubImage2D(i.TEXTURE_2D,Ue,0,0,Ie.width,Ie.height,Te,Ie.data):t.compressedTexImage2D(i.TEXTURE_2D,Ue,Le,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?gt&&t.texSubImage2D(i.TEXTURE_2D,Ue,0,0,Ie.width,Ie.height,Te,qe,Ie.data):t.texImage2D(i.TEXTURE_2D,Ue,Le,Ie.width,Ie.height,0,Te,qe,Ie.data)}else if(w.isDataArrayTexture)ft?(St&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Le,ve.width,ve.height,ve.depth),gt&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ve.width,ve.height,ve.depth,Te,qe,ve.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,ve.width,ve.height,ve.depth,0,Te,qe,ve.data);else if(w.isData3DTexture)ft?(St&&t.texStorage3D(i.TEXTURE_3D,Mt,Le,ve.width,ve.height,ve.depth),gt&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ve.width,ve.height,ve.depth,Te,qe,ve.data)):t.texImage3D(i.TEXTURE_3D,0,Le,ve.width,ve.height,ve.depth,0,Te,qe,ve.data);else if(w.isFramebufferTexture){if(St)if(ft)t.texStorage2D(i.TEXTURE_2D,Mt,Le,ve.width,ve.height);else{let Ue=ve.width,S=ve.height;for(let Z=0;Z<Mt;Z++)t.texImage2D(i.TEXTURE_2D,Z,Le,Ue,S,0,Te,qe,null),Ue>>=1,S>>=1}}else if(ct.length>0){if(ft&&St){const Ue=Tt(ct[0]);t.texStorage2D(i.TEXTURE_2D,Mt,Le,Ue.width,Ue.height)}for(let Ue=0,S=ct.length;Ue<S;Ue++)Ie=ct[Ue],ft?gt&&t.texSubImage2D(i.TEXTURE_2D,Ue,0,0,Te,qe,Ie):t.texImage2D(i.TEXTURE_2D,Ue,Le,Te,qe,Ie);w.generateMipmaps=!1}else if(ft){if(St){const Ue=Tt(ve);t.texStorage2D(i.TEXTURE_2D,Mt,Le,Ue.width,Ue.height)}gt&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,qe,ve)}else t.texImage2D(i.TEXTURE_2D,0,Le,Te,qe,ve);v(w)&&_(ae),Be.__version=de.version,w.onUpdate&&w.onUpdate(w)}B.__version=w.version}function ot(B,w,te){if(w.image.length!==6)return;const ae=Me(B,w),ue=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+te);const de=n.get(ue);if(ue.version!==de.__version||ae===!0){t.activeTexture(i.TEXTURE0+te);const Be=Ct.getPrimaries(Ct.workingColorSpace),_e=w.colorSpace===Fn?null:Ct.getPrimaries(w.colorSpace),De=w.colorSpace===Fn||Be===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Ve=w.isCompressedTexture||w.image[0].isCompressedTexture,ve=w.image[0]&&w.image[0].isDataTexture,Te=[];for(let S=0;S<6;S++)!Ve&&!ve?Te[S]=A(w.image[S],!0,r.maxCubemapSize):Te[S]=ve?w.image[S].image:w.image[S],Te[S]=He(w,Te[S]);const qe=Te[0],Le=o.convert(w.format,w.colorSpace),Ie=o.convert(w.type),ct=C(w.internalFormat,Le,Ie,w.colorSpace),ft=w.isVideoTexture!==!0,St=de.__version===void 0||ae===!0,gt=ue.dataReady;let Mt=b(w,qe);me(i.TEXTURE_CUBE_MAP,w);let Ue;if(Ve){ft&&St&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,ct,qe.width,qe.height);for(let S=0;S<6;S++){Ue=Te[S].mipmaps;for(let Z=0;Z<Ue.length;Z++){const oe=Ue[Z];w.format!==Ci?Le!==null?ft?gt&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z,0,0,oe.width,oe.height,Le,oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z,ct,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z,0,0,oe.width,oe.height,Le,Ie,oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z,ct,oe.width,oe.height,0,Le,Ie,oe.data)}}}else{if(Ue=w.mipmaps,ft&&St){Ue.length>0&&Mt++;const S=Tt(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,ct,S.width,S.height)}for(let S=0;S<6;S++)if(ve){ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Te[S].width,Te[S].height,Le,Ie,Te[S].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,ct,Te[S].width,Te[S].height,0,Le,Ie,Te[S].data);for(let Z=0;Z<Ue.length;Z++){const xe=Ue[Z].image[S].image;ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z+1,0,0,xe.width,xe.height,Le,Ie,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z+1,ct,xe.width,xe.height,0,Le,Ie,xe.data)}}else{ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Le,Ie,Te[S]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,ct,Le,Ie,Te[S]);for(let Z=0;Z<Ue.length;Z++){const oe=Ue[Z];ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z+1,0,0,Le,Ie,oe.image[S]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z+1,ct,Le,Ie,oe.image[S])}}}v(w)&&_(i.TEXTURE_CUBE_MAP),de.__version=ue.version,w.onUpdate&&w.onUpdate(w)}B.__version=w.version}function ie(B,w,te,ae,ue,de){const Be=o.convert(te.format,te.colorSpace),_e=o.convert(te.type),De=C(te.internalFormat,Be,_e,te.colorSpace);if(!n.get(w).__hasExternalTextures){const ve=Math.max(1,w.width>>de),Te=Math.max(1,w.height>>de);ue===i.TEXTURE_3D||ue===i.TEXTURE_2D_ARRAY?t.texImage3D(ue,de,De,ve,Te,w.depth,0,Be,_e,null):t.texImage2D(ue,de,De,ve,Te,0,Be,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,B),ze(w)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,ue,n.get(te).__webglTexture,0,$e(w)):(ue===i.TEXTURE_2D||ue>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ae,ue,n.get(te).__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(B,w,te){if(i.bindRenderbuffer(i.RENDERBUFFER,B),w.depthBuffer&&!w.stencilBuffer){let ae=i.DEPTH_COMPONENT24;if(te||ze(w)){const ue=w.depthTexture;ue&&ue.isDepthTexture&&(ue.type===Vi?ae=i.DEPTH_COMPONENT32F:ue.type===xo&&(ae=i.DEPTH_COMPONENT24));const de=$e(w);ze(w)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,ae,w.width,w.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,de,ae,w.width,w.height)}else i.renderbufferStorage(i.RENDERBUFFER,ae,w.width,w.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,B)}else if(w.depthBuffer&&w.stencilBuffer){const ae=$e(w);te&&ze(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,i.DEPTH24_STENCIL8,w.width,w.height):ze(w)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,i.DEPTH24_STENCIL8,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,B)}else{const ae=w.textures;for(let ue=0;ue<ae.length;ue++){const de=ae[ue],Be=o.convert(de.format,de.colorSpace),_e=o.convert(de.type),De=C(de.internalFormat,Be,_e,de.colorSpace),Ve=$e(w);te&&ze(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,De,w.width,w.height):ze(w)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ve,De,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,De,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(B,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,B),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),G(w.depthTexture,0);const ae=n.get(w.depthTexture).__webglTexture,ue=$e(w);if(w.depthTexture.format===po)ze(w)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(w.depthTexture.format===Ta)ze(w)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Se(B){const w=n.get(B),te=B.isWebGLCubeRenderTarget===!0;if(B.depthTexture&&!w.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");we(w.__webglFramebuffer,B)}else if(te){w.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[ae]),w.__webglDepthbuffer[ae]=i.createRenderbuffer(),ge(w.__webglDepthbuffer[ae],B,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=i.createRenderbuffer(),ge(w.__webglDepthbuffer,B,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(B,w,te){const ae=n.get(B);w!==void 0&&ie(ae.__webglFramebuffer,B,B.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),te!==void 0&&Se(B)}function Xe(B){const w=B.texture,te=n.get(B),ae=n.get(w);B.addEventListener("dispose",k);const ue=B.textures,de=B.isWebGLCubeRenderTarget===!0,Be=ue.length>1;if(Be||(ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture()),ae.__version=w.version,c.memory.textures++),de){te.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(w.mipmaps&&w.mipmaps.length>0){te.__webglFramebuffer[_e]=[];for(let De=0;De<w.mipmaps.length;De++)te.__webglFramebuffer[_e][De]=i.createFramebuffer()}else te.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){te.__webglFramebuffer=[];for(let _e=0;_e<w.mipmaps.length;_e++)te.__webglFramebuffer[_e]=i.createFramebuffer()}else te.__webglFramebuffer=i.createFramebuffer();if(Be)for(let _e=0,De=ue.length;_e<De;_e++){const Ve=n.get(ue[_e]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=i.createTexture(),c.memory.textures++)}if(B.samples>0&&ze(B)===!1){te.__webglMultisampledFramebuffer=i.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let _e=0;_e<ue.length;_e++){const De=ue[_e];te.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,te.__webglColorRenderbuffer[_e]);const Ve=o.convert(De.format,De.colorSpace),ve=o.convert(De.type),Te=C(De.internalFormat,Ve,ve,De.colorSpace,B.isXRRenderTarget===!0),qe=$e(B);i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,Te,B.width,B.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,te.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),B.depthBuffer&&(te.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(te.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),me(i.TEXTURE_CUBE_MAP,w);for(let _e=0;_e<6;_e++)if(w.mipmaps&&w.mipmaps.length>0)for(let De=0;De<w.mipmaps.length;De++)ie(te.__webglFramebuffer[_e][De],B,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,De);else ie(te.__webglFramebuffer[_e],B,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);v(w)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Be){for(let _e=0,De=ue.length;_e<De;_e++){const Ve=ue[_e],ve=n.get(Ve);t.bindTexture(i.TEXTURE_2D,ve.__webglTexture),me(i.TEXTURE_2D,Ve),ie(te.__webglFramebuffer,B,Ve,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,0),v(Ve)&&_(i.TEXTURE_2D)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(_e=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,ae.__webglTexture),me(_e,w),w.mipmaps&&w.mipmaps.length>0)for(let De=0;De<w.mipmaps.length;De++)ie(te.__webglFramebuffer[De],B,w,i.COLOR_ATTACHMENT0,_e,De);else ie(te.__webglFramebuffer,B,w,i.COLOR_ATTACHMENT0,_e,0);v(w)&&_(_e),t.unbindTexture()}B.depthBuffer&&Se(B)}function at(B){const w=B.textures;for(let te=0,ae=w.length;te<ae;te++){const ue=w[te];if(v(ue)){const de=B.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Be=n.get(ue).__webglTexture;t.bindTexture(de,Be),_(de),t.unbindTexture()}}}function j(B){if(B.samples>0&&ze(B)===!1){const w=B.textures,te=B.width,ae=B.height;let ue=i.COLOR_BUFFER_BIT;const de=[],Be=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(B),De=w.length>1;if(De)for(let Ve=0;Ve<w.length;Ve++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ve=0;Ve<w.length;Ve++){de.push(i.COLOR_ATTACHMENT0+Ve),B.depthBuffer&&de.push(Be);const ve=_e.__ignoreDepthValues!==void 0?_e.__ignoreDepthValues:!1;if(ve===!1&&(B.depthBuffer&&(ue|=i.DEPTH_BUFFER_BIT),B.stencilBuffer&&_e.__isTransmissionRenderTarget!==!0&&(ue|=i.STENCIL_BUFFER_BIT)),De&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[Ve]),ve===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Be]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Be])),De){const Te=n.get(w[Ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Te,0)}i.blitFramebuffer(0,0,te,ae,0,0,te,ae,ue,i.NEAREST),h&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),De)for(let Ve=0;Ve<w.length;Ve++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.RENDERBUFFER,_e.__webglColorRenderbuffer[Ve]);const ve=n.get(w[Ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.TEXTURE_2D,ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}}function $e(B){return Math.min(r.maxSamples,B.samples)}function ze(B){const w=n.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function bt(B){const w=c.render.frame;d.get(B)!==w&&(d.set(B,w),B.update())}function He(B,w){const te=B.colorSpace,ae=B.format,ue=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||te!==yn&&te!==Fn&&(Ct.getTransfer(te)===Gt?(ae!==Ci||ue!==Xr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",te)),w}function Tt(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(f.width=B.naturalWidth||B.width,f.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(f.width=B.displayWidth,f.height=B.displayHeight):(f.width=B.width,f.height=B.height),f}this.allocateTextureUnit=F,this.resetTextureUnits=y,this.setTexture2D=G,this.setTexture2DArray=q,this.setTexture3D=ne,this.setTextureCube=se,this.rebindTextures=Ge,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=ze}function _C(i,e){function t(n,r=Fn){let o;const c=Ct.getTransfer(r);if(n===Xr)return i.UNSIGNED_BYTE;if(n===t_)return i.UNSIGNED_SHORT_4_4_4_4;if(n===n_)return i.UNSIGNED_SHORT_5_5_5_1;if(n===zb)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fb)return i.BYTE;if(n===Bb)return i.SHORT;if(n===Qg)return i.UNSIGNED_SHORT;if(n===e_)return i.INT;if(n===xo)return i.UNSIGNED_INT;if(n===Vi)return i.FLOAT;if(n===ul)return i.HALF_FLOAT;if(n===kb)return i.ALPHA;if(n===Hb)return i.RGB;if(n===Ci)return i.RGBA;if(n===Gb)return i.LUMINANCE;if(n===Vb)return i.LUMINANCE_ALPHA;if(n===po)return i.DEPTH_COMPONENT;if(n===Ta)return i.DEPTH_STENCIL;if(n===i_)return i.RED;if(n===r_)return i.RED_INTEGER;if(n===Wb)return i.RG;if(n===s_)return i.RG_INTEGER;if(n===o_)return i.RGBA_INTEGER;if(n===Fu||n===Bu||n===zu||n===ku)if(c===Gt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Fu)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ku)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Fu)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bu)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zu)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ku)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===kp||n===Hp||n===Gp||n===Vp)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===kp)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Hp)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Gp)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vp)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===a_)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===Wp||n===Xp)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Wp)return c===Gt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Xp)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yp||n===jp||n===qp||n===Kp||n===Zp||n===$p||n===Jp||n===Qp||n===em||n===tm||n===nm||n===im||n===rm||n===sm)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Yp)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jp)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qp)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Kp)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zp)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$p)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Jp)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qp)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===em)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tm)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nm)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===im)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rm)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sm)return c===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hu||n===om||n===am)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Hu)return c===Gt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===om)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===am)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xb||n===cm||n===lm||n===um)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Hu)return o.COMPRESSED_RED_RGTC1_EXT;if(n===cm)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===lm)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===um)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ca?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class vC extends Bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let Xi=class extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const xC={type:"move"};class dh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,o=null,c=null;const l=this._targetRay,h=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){c=!0;for(const A of e.hand.values()){const v=t.getJointPose(A,n),_=this._getHandJoint(f,A);v!==null&&(_.matrix.fromArray(v.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=v.radius),_.visible=v!==null}const d=f.joints["index-finger-tip"],p=f.joints["thumb-tip"],m=d.position.distanceTo(p.position),x=.02,M=.005;f.inputState.pinching&&m>x+M?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&m<=x-M&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(xC)))}return l!==null&&(l.visible=r!==null),h!==null&&(h.visible=o!==null),f!==null&&(f.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Xi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const yC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SC=`
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

}`;class MC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new un,o=e.properties.get(r);o.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,r=new Yr({vertexShader:yC,fragmentShader:SC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ye(new Ss(20,20),r)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class EC extends ys{constructor(e,t){super();const n=this;let r=null,o=1,c=null,l="local-floor",h=1,f=null,d=null,p=null,m=null,x=null,M=null;const A=new MC,v=t.getContextAttributes();let _=null,C=null;const b=[],L=[],k=new Pe;let U=null;const O=new Bn;O.layers.enable(1),O.viewport=new Dt;const I=new Bn;I.layers.enable(2),I.viewport=new Dt;const E=[O,I],y=new vC;y.layers.enable(1),y.layers.enable(2);let F=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let ge=b[ie];return ge===void 0&&(ge=new dh,b[ie]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(ie){let ge=b[ie];return ge===void 0&&(ge=new dh,b[ie]=ge),ge.getGripSpace()},this.getHand=function(ie){let ge=b[ie];return ge===void 0&&(ge=new dh,b[ie]=ge),ge.getHandSpace()};function G(ie){const ge=L.indexOf(ie.inputSource);if(ge===-1)return;const we=b[ge];we!==void 0&&(we.update(ie.inputSource,ie.frame,f||c),we.dispatchEvent({type:ie.type,data:ie.inputSource}))}function q(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",ne);for(let ie=0;ie<b.length;ie++){const ge=L[ie];ge!==null&&(L[ie]=null,b[ie].disconnect(ge))}F=null,V=null,A.reset(),e.setRenderTarget(_),x=null,m=null,p=null,r=null,C=null,ot.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){o=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){l=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||c},this.setReferenceSpace=function(ie){f=ie},this.getBaseLayer=function(){return m!==null?m:x},this.getBinding=function(){return p},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",q),r.addEventListener("inputsourceschange",ne),v.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(k),r.renderState.layers===void 0){const ge={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:o};x=new XRWebGLLayer(r,t,ge),r.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),C=new vs(x.framebufferWidth,x.framebufferHeight,{format:Ci,type:Xr,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let ge=null,we=null,Se=null;v.depth&&(Se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=v.stencil?Ta:po,we=v.stencil?Ca:xo);const Ge={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:o};p=new XRWebGLBinding(r,t),m=p.createProjectionLayer(Ge),r.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),C=new vs(m.textureWidth,m.textureHeight,{format:Ci,type:Xr,depthTexture:new E_(m.textureWidth,m.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Xe=e.properties.get(C);Xe.__ignoreDepthValues=m.ignoreDepthValues}C.isXRRenderTarget=!0,this.setFoveation(h),f=null,c=await r.requestReferenceSpace(l),ot.setContext(r),ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function ne(ie){for(let ge=0;ge<ie.removed.length;ge++){const we=ie.removed[ge],Se=L.indexOf(we);Se>=0&&(L[Se]=null,b[Se].disconnect(we))}for(let ge=0;ge<ie.added.length;ge++){const we=ie.added[ge];let Se=L.indexOf(we);if(Se===-1){for(let Xe=0;Xe<b.length;Xe++)if(Xe>=L.length){L.push(we),Se=Xe;break}else if(L[Xe]===null){L[Xe]=we,Se=Xe;break}if(Se===-1)break}const Ge=b[Se];Ge&&Ge.connect(we)}}const se=new N,pe=new N;function K(ie,ge,we){se.setFromMatrixPosition(ge.matrixWorld),pe.setFromMatrixPosition(we.matrixWorld);const Se=se.distanceTo(pe),Ge=ge.projectionMatrix.elements,Xe=we.projectionMatrix.elements,at=Ge[14]/(Ge[10]-1),j=Ge[14]/(Ge[10]+1),$e=(Ge[9]+1)/Ge[5],ze=(Ge[9]-1)/Ge[5],bt=(Ge[8]-1)/Ge[0],He=(Xe[8]+1)/Xe[0],Tt=at*bt,B=at*He,w=Se/(-bt+He),te=w*-bt;ge.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(te),ie.translateZ(w),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert();const ae=at+w,ue=j+w,de=Tt-te,Be=B+(Se-te),_e=$e*j/ue*ae,De=ze*j/ue*ae;ie.projectionMatrix.makePerspective(de,Be,_e,De,ae,ue),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}function he(ie,ge){ge===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(ge.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;A.texture!==null&&(ie.near=A.depthNear,ie.far=A.depthFar),y.near=I.near=O.near=ie.near,y.far=I.far=O.far=ie.far,(F!==y.near||V!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),F=y.near,V=y.far,O.near=F,O.far=V,I.near=F,I.far=V,O.updateProjectionMatrix(),I.updateProjectionMatrix(),ie.updateProjectionMatrix());const ge=ie.parent,we=y.cameras;he(y,ge);for(let Se=0;Se<we.length;Se++)he(we[Se],ge);we.length===2?K(y,O,I):y.projectionMatrix.copy(O.projectionMatrix),me(ie,y,ge)};function me(ie,ge,we){we===null?ie.matrix.copy(ge.matrixWorld):(ie.matrix.copy(we.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(ge.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(ge.projectionMatrix),ie.projectionMatrixInverse.copy(ge.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=So*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(m===null&&x===null))return h},this.setFoveation=function(ie){h=ie,m!==null&&(m.fixedFoveation=ie),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=ie)},this.hasDepthSensing=function(){return A.texture!==null};let Me=null;function Ke(ie,ge){if(d=ge.getViewerPose(f||c),M=ge,d!==null){const we=d.views;x!==null&&(e.setRenderTargetFramebuffer(C,x.framebuffer),e.setRenderTarget(C));let Se=!1;we.length!==y.cameras.length&&(y.cameras.length=0,Se=!0);for(let Xe=0;Xe<we.length;Xe++){const at=we[Xe];let j=null;if(x!==null)j=x.getViewport(at);else{const ze=p.getViewSubImage(m,at);j=ze.viewport,Xe===0&&(e.setRenderTargetTextures(C,ze.colorTexture,m.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(C))}let $e=E[Xe];$e===void 0&&($e=new Bn,$e.layers.enable(Xe),$e.viewport=new Dt,E[Xe]=$e),$e.matrix.fromArray(at.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(at.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(j.x,j.y,j.width,j.height),Xe===0&&(y.matrix.copy($e.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Se===!0&&y.cameras.push($e)}const Ge=r.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")){const Xe=p.getDepthInformation(we[0]);Xe&&Xe.isValid&&Xe.texture&&A.init(e,Xe,r.renderState)}}for(let we=0;we<b.length;we++){const Se=L[we],Ge=b[we];Se!==null&&Ge!==void 0&&Ge.update(Se,ge,f||c)}A.render(e,y),Me&&Me(ie,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),M=null}const ot=new M_;ot.setAnimationLoop(Ke),this.setAnimationLoop=function(ie){Me=ie},this.dispose=function(){}}}const cs=new Li,bC=new Qe;function TC(i,e){function t(v,_){v.matrixAutoUpdate===!0&&v.updateMatrix(),_.value.copy(v.matrix)}function n(v,_){_.color.getRGB(v.fogColor.value,v_(i)),_.isFog?(v.fogNear.value=_.near,v.fogFar.value=_.far):_.isFogExp2&&(v.fogDensity.value=_.density)}function r(v,_,C,b,L){_.isMeshBasicMaterial||_.isMeshLambertMaterial?o(v,_):_.isMeshToonMaterial?(o(v,_),p(v,_)):_.isMeshPhongMaterial?(o(v,_),d(v,_)):_.isMeshStandardMaterial?(o(v,_),m(v,_),_.isMeshPhysicalMaterial&&x(v,_,L)):_.isMeshMatcapMaterial?(o(v,_),M(v,_)):_.isMeshDepthMaterial?o(v,_):_.isMeshDistanceMaterial?(o(v,_),A(v,_)):_.isMeshNormalMaterial?o(v,_):_.isLineBasicMaterial?(c(v,_),_.isLineDashedMaterial&&l(v,_)):_.isPointsMaterial?h(v,_,C,b):_.isSpriteMaterial?f(v,_):_.isShadowMaterial?(v.color.value.copy(_.color),v.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function o(v,_){v.opacity.value=_.opacity,_.color&&v.diffuse.value.copy(_.color),_.emissive&&v.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(v.map.value=_.map,t(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.bumpMap&&(v.bumpMap.value=_.bumpMap,t(_.bumpMap,v.bumpMapTransform),v.bumpScale.value=_.bumpScale,_.side===Xn&&(v.bumpScale.value*=-1)),_.normalMap&&(v.normalMap.value=_.normalMap,t(_.normalMap,v.normalMapTransform),v.normalScale.value.copy(_.normalScale),_.side===Xn&&v.normalScale.value.negate()),_.displacementMap&&(v.displacementMap.value=_.displacementMap,t(_.displacementMap,v.displacementMapTransform),v.displacementScale.value=_.displacementScale,v.displacementBias.value=_.displacementBias),_.emissiveMap&&(v.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,v.emissiveMapTransform)),_.specularMap&&(v.specularMap.value=_.specularMap,t(_.specularMap,v.specularMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest);const C=e.get(_),b=C.envMap,L=C.envMapRotation;if(b&&(v.envMap.value=b,cs.copy(L),cs.x*=-1,cs.y*=-1,cs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(cs.y*=-1,cs.z*=-1),v.envMapRotation.value.setFromMatrix4(bC.makeRotationFromEuler(cs)),v.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=_.reflectivity,v.ior.value=_.ior,v.refractionRatio.value=_.refractionRatio),_.lightMap){v.lightMap.value=_.lightMap;const k=i._useLegacyLights===!0?Math.PI:1;v.lightMapIntensity.value=_.lightMapIntensity*k,t(_.lightMap,v.lightMapTransform)}_.aoMap&&(v.aoMap.value=_.aoMap,v.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,v.aoMapTransform))}function c(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,_.map&&(v.map.value=_.map,t(_.map,v.mapTransform))}function l(v,_){v.dashSize.value=_.dashSize,v.totalSize.value=_.dashSize+_.gapSize,v.scale.value=_.scale}function h(v,_,C,b){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.size.value=_.size*C,v.scale.value=b*.5,_.map&&(v.map.value=_.map,t(_.map,v.uvTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function f(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.rotation.value=_.rotation,_.map&&(v.map.value=_.map,t(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function d(v,_){v.specular.value.copy(_.specular),v.shininess.value=Math.max(_.shininess,1e-4)}function p(v,_){_.gradientMap&&(v.gradientMap.value=_.gradientMap)}function m(v,_){v.metalness.value=_.metalness,_.metalnessMap&&(v.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,v.metalnessMapTransform)),v.roughness.value=_.roughness,_.roughnessMap&&(v.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,v.roughnessMapTransform)),_.envMap&&(v.envMapIntensity.value=_.envMapIntensity)}function x(v,_,C){v.ior.value=_.ior,_.sheen>0&&(v.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),v.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(v.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,v.sheenColorMapTransform)),_.sheenRoughnessMap&&(v.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,v.sheenRoughnessMapTransform))),_.clearcoat>0&&(v.clearcoat.value=_.clearcoat,v.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(v.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,v.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(v.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Xn&&v.clearcoatNormalScale.value.negate())),_.iridescence>0&&(v.iridescence.value=_.iridescence,v.iridescenceIOR.value=_.iridescenceIOR,v.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(v.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,v.iridescenceMapTransform)),_.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),_.transmission>0&&(v.transmission.value=_.transmission,v.transmissionSamplerMap.value=C.texture,v.transmissionSamplerSize.value.set(C.width,C.height),_.transmissionMap&&(v.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,v.transmissionMapTransform)),v.thickness.value=_.thickness,_.thicknessMap&&(v.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=_.attenuationDistance,v.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(v.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(v.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=_.specularIntensity,v.specularColor.value.copy(_.specularColor),_.specularColorMap&&(v.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,v.specularColorMapTransform)),_.specularIntensityMap&&(v.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,v.specularIntensityMapTransform))}function M(v,_){_.matcap&&(v.matcap.value=_.matcap)}function A(v,_){const C=e.get(_).light;v.referencePosition.value.setFromMatrixPosition(C.matrixWorld),v.nearDistance.value=C.shadow.camera.near,v.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function AC(i,e,t,n){let r={},o={},c=[];const l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(C,b){const L=b.program;n.uniformBlockBinding(C,L)}function f(C,b){let L=r[C.id];L===void 0&&(M(C),L=d(C),r[C.id]=L,C.addEventListener("dispose",v));const k=b.program;n.updateUBOMapping(C,k);const U=e.render.frame;o[C.id]!==U&&(m(C),o[C.id]=U)}function d(C){const b=p();C.__bindingPointIndex=b;const L=i.createBuffer(),k=C.__size,U=C.usage;return i.bindBuffer(i.UNIFORM_BUFFER,L),i.bufferData(i.UNIFORM_BUFFER,k,U),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,L),L}function p(){for(let C=0;C<l;C++)if(c.indexOf(C)===-1)return c.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(C){const b=r[C.id],L=C.uniforms,k=C.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let U=0,O=L.length;U<O;U++){const I=Array.isArray(L[U])?L[U]:[L[U]];for(let E=0,y=I.length;E<y;E++){const F=I[E];if(x(F,U,E,k)===!0){const V=F.__offset,G=Array.isArray(F.value)?F.value:[F.value];let q=0;for(let ne=0;ne<G.length;ne++){const se=G[ne],pe=A(se);typeof se=="number"||typeof se=="boolean"?(F.__data[0]=se,i.bufferSubData(i.UNIFORM_BUFFER,V+q,F.__data)):se.isMatrix3?(F.__data[0]=se.elements[0],F.__data[1]=se.elements[1],F.__data[2]=se.elements[2],F.__data[3]=0,F.__data[4]=se.elements[3],F.__data[5]=se.elements[4],F.__data[6]=se.elements[5],F.__data[7]=0,F.__data[8]=se.elements[6],F.__data[9]=se.elements[7],F.__data[10]=se.elements[8],F.__data[11]=0):(se.toArray(F.__data,q),q+=pe.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function x(C,b,L,k){const U=C.value,O=b+"_"+L;if(k[O]===void 0)return typeof U=="number"||typeof U=="boolean"?k[O]=U:k[O]=U.clone(),!0;{const I=k[O];if(typeof U=="number"||typeof U=="boolean"){if(I!==U)return k[O]=U,!0}else if(I.equals(U)===!1)return I.copy(U),!0}return!1}function M(C){const b=C.uniforms;let L=0;const k=16;for(let O=0,I=b.length;O<I;O++){const E=Array.isArray(b[O])?b[O]:[b[O]];for(let y=0,F=E.length;y<F;y++){const V=E[y],G=Array.isArray(V.value)?V.value:[V.value];for(let q=0,ne=G.length;q<ne;q++){const se=G[q],pe=A(se),K=L%k;K!==0&&k-K<pe.boundary&&(L+=k-K),V.__data=new Float32Array(pe.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=L,L+=pe.storage}}}const U=L%k;return U>0&&(L+=k-U),C.__size=L,C.__cache={},this}function A(C){const b={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(b.boundary=4,b.storage=4):C.isVector2?(b.boundary=8,b.storage=8):C.isVector3||C.isColor?(b.boundary=16,b.storage=12):C.isVector4?(b.boundary=16,b.storage=16):C.isMatrix3?(b.boundary=48,b.storage=48):C.isMatrix4?(b.boundary=64,b.storage=64):C.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",C),b}function v(C){const b=C.target;b.removeEventListener("dispose",v);const L=c.indexOf(b.__bindingPointIndex);c.splice(L,1),i.deleteBuffer(r[b.id]),delete r[b.id],delete o[b.id]}function _(){for(const C in r)i.deleteBuffer(r[C]);c=[],r={},o={}}return{bind:h,update:f,dispose:_}}class wC{constructor(e={}){const{canvas:t=yT(),context:n=null,depth:r=!0,stencil:o=!1,alpha:c=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:f=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=c;const x=new Uint32Array(4),M=new Int32Array(4);let A=null,v=null;const _=[],C=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this._useLegacyLights=!1,this.toneMapping=yr,this.toneMappingExposure=1;const b=this;let L=!1,k=0,U=0,O=null,I=-1,E=null;const y=new Dt,F=new Dt;let V=null;const G=new Ne(0);let q=0,ne=t.width,se=t.height,pe=1,K=null,he=null;const me=new Dt(0,0,ne,se),Me=new Dt(0,0,ne,se);let Ke=!1;const ot=new sf;let ie=!1,ge=!1;const we=new Qe,Se=new Pe,Ge=new N,Xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function at(){return O===null?pe:1}let j=n;function $e(D,Y){const Q=t.getContext(D,Y);return Q!==null?Q:null}try{const D={alpha:!0,depth:r,stencil:o,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:f,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ef}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",oe,!1),t.addEventListener("webglcontextcreationerror",xe,!1),j===null){const Y="webgl2";if(j=$e(Y,D),j===null)throw $e(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let ze,bt,He,Tt,B,w,te,ae,ue,de,Be,_e,De,Ve,ve,Te,qe,Le,Ie,ct,ft,St,gt,Mt;function Ue(){ze=new U1(j),ze.init(),bt=new C1(j,ze,e),St=new _C(j,ze),He=new mC(j),Tt=new B1(j),B=new tC,w=new gC(j,ze,He,B,bt,St,Tt),te=new L1(b),ae=new O1(b),ue=new WT(j),gt=new w1(j,ue),de=new N1(j,ue,Tt,gt),Be=new k1(j,de,ue,Tt),Ie=new z1(j,bt,w),Te=new P1(B),_e=new eC(b,te,ae,ze,bt,gt,Te),De=new TC(b,B),Ve=new iC,ve=new lC(ze),Le=new A1(b,te,ae,He,Be,m,h),qe=new pC(b,Be,bt),Mt=new AC(j,Tt,bt,He),ct=new R1(j,ze,Tt),ft=new F1(j,ze,Tt),Tt.programs=_e.programs,b.capabilities=bt,b.extensions=ze,b.properties=B,b.renderLists=Ve,b.shadowMap=qe,b.state=He,b.info=Tt}Ue();const S=new EC(b,j);this.xr=S,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const D=ze.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=ze.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(D){D!==void 0&&(pe=D,this.setSize(ne,se,!1))},this.getSize=function(D){return D.set(ne,se)},this.setSize=function(D,Y,Q=!0){if(S.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ne=D,se=Y,t.width=Math.floor(D*pe),t.height=Math.floor(Y*pe),Q===!0&&(t.style.width=D+"px",t.style.height=Y+"px"),this.setViewport(0,0,D,Y)},this.getDrawingBufferSize=function(D){return D.set(ne*pe,se*pe).floor()},this.setDrawingBufferSize=function(D,Y,Q){ne=D,se=Y,pe=Q,t.width=Math.floor(D*Q),t.height=Math.floor(Y*Q),this.setViewport(0,0,D,Y)},this.getCurrentViewport=function(D){return D.copy(y)},this.getViewport=function(D){return D.copy(me)},this.setViewport=function(D,Y,Q,ee){D.isVector4?me.set(D.x,D.y,D.z,D.w):me.set(D,Y,Q,ee),He.viewport(y.copy(me).multiplyScalar(pe).round())},this.getScissor=function(D){return D.copy(Me)},this.setScissor=function(D,Y,Q,ee){D.isVector4?Me.set(D.x,D.y,D.z,D.w):Me.set(D,Y,Q,ee),He.scissor(F.copy(Me).multiplyScalar(pe).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(D){He.setScissorTest(Ke=D)},this.setOpaqueSort=function(D){K=D},this.setTransparentSort=function(D){he=D},this.getClearColor=function(D){return D.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor.apply(Le,arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha.apply(Le,arguments)},this.clear=function(D=!0,Y=!0,Q=!0){let ee=0;if(D){let $=!1;if(O!==null){const Ae=O.texture.format;$=Ae===o_||Ae===s_||Ae===r_}if($){const Ae=O.texture.type,Fe=Ae===Xr||Ae===xo||Ae===Qg||Ae===Ca||Ae===t_||Ae===n_,ke=Le.getClearColor(),Ze=Le.getClearAlpha(),Je=ke.r,et=ke.g,nt=ke.b;Fe?(x[0]=Je,x[1]=et,x[2]=nt,x[3]=Ze,j.clearBufferuiv(j.COLOR,0,x)):(M[0]=Je,M[1]=et,M[2]=nt,M[3]=Ze,j.clearBufferiv(j.COLOR,0,M))}else ee|=j.COLOR_BUFFER_BIT}Y&&(ee|=j.DEPTH_BUFFER_BIT),Q&&(ee|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",oe,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ve.dispose(),ve.dispose(),B.dispose(),te.dispose(),ae.dispose(),Be.dispose(),gt.dispose(),Mt.dispose(),_e.dispose(),S.dispose(),S.removeEventListener("sessionstart",Kt),S.removeEventListener("sessionend",Zt),Pn.stop()};function Z(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function oe(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const D=Tt.autoReset,Y=qe.enabled,Q=qe.autoUpdate,ee=qe.needsUpdate,$=qe.type;Ue(),Tt.autoReset=D,qe.enabled=Y,qe.autoUpdate=Q,qe.needsUpdate=ee,qe.type=$}function xe(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Re(D){const Y=D.target;Y.removeEventListener("dispose",Re),_t(Y)}function _t(D){dt(D),B.remove(D)}function dt(D){const Y=B.get(D).programs;Y!==void 0&&(Y.forEach(function(Q){_e.releaseProgram(Q)}),D.isShaderMaterial&&_e.releaseShaderCache(D))}this.renderBufferDirect=function(D,Y,Q,ee,$,Ae){Y===null&&(Y=Xe);const Fe=$.isMesh&&$.matrixWorld.determinant()<0,ke=Tl(D,Y,Q,ee,$);He.setMaterial(ee,Fe);let Ze=Q.index,Je=1;if(ee.wireframe===!0){if(Ze=de.getWireframeAttribute(Q),Ze===void 0)return;Je=2}const et=Q.drawRange,nt=Q.attributes.position;let Yt=et.start*Je,Mn=(et.start+et.count)*Je;Ae!==null&&(Yt=Math.max(Yt,Ae.start*Je),Mn=Math.min(Mn,(Ae.start+Ae.count)*Je)),Ze!==null?(Yt=Math.max(Yt,0),Mn=Math.min(Mn,Ze.count)):nt!=null&&(Yt=Math.max(Yt,0),Mn=Math.min(Mn,nt.count));const Qt=Mn-Yt;if(Qt<0||Qt===1/0)return;gt.setup($,ee,ke,Q,Ze);let ni,kt=ct;if(Ze!==null&&(ni=ue.get(Ze),kt=ft,kt.setIndex(ni)),$.isMesh)ee.wireframe===!0?(He.setLineWidth(ee.wireframeLinewidth*at()),kt.setMode(j.LINES)):kt.setMode(j.TRIANGLES);else if($.isLine){let rt=ee.linewidth;rt===void 0&&(rt=1),He.setLineWidth(rt*at()),$.isLineSegments?kt.setMode(j.LINES):$.isLineLoop?kt.setMode(j.LINE_LOOP):kt.setMode(j.LINE_STRIP)}else $.isPoints?kt.setMode(j.POINTS):$.isSprite&&kt.setMode(j.TRIANGLES);if($.isBatchedMesh)kt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else if($.isInstancedMesh)kt.renderInstances(Yt,Qt,$.count);else if(Q.isInstancedBufferGeometry){const rt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Io=Math.min(Q.instanceCount,rt);kt.renderInstances(Yt,Qt,Io)}else kt.render(Yt,Qt)};function Ft(D,Y,Q){D.transparent===!0&&D.side===Ai&&D.forceSinglePass===!1?(D.side=Xn,D.needsUpdate=!0,Es(D,Y,Q),D.side=Yi,D.needsUpdate=!0,Es(D,Y,Q),D.side=Ai):Es(D,Y,Q)}this.compile=function(D,Y,Q=null){Q===null&&(Q=D),v=ve.get(Q),v.init(),C.push(v),Q.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(v.pushLight($),$.castShadow&&v.pushShadow($))}),D!==Q&&D.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(v.pushLight($),$.castShadow&&v.pushShadow($))}),v.setupLights(b._useLegacyLights);const ee=new Set;return D.traverse(function($){const Ae=$.material;if(Ae)if(Array.isArray(Ae))for(let Fe=0;Fe<Ae.length;Fe++){const ke=Ae[Fe];Ft(ke,Q,$),ee.add(ke)}else Ft(Ae,Q,$),ee.add(Ae)}),C.pop(),v=null,ee},this.compileAsync=function(D,Y,Q=null){const ee=this.compile(D,Y,Q);return new Promise($=>{function Ae(){if(ee.forEach(function(Fe){B.get(Fe).currentProgram.isReady()&&ee.delete(Fe)}),ee.size===0){$(D);return}setTimeout(Ae,10)}ze.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let rn=null;function At(D){rn&&rn(D)}function Kt(){Pn.stop()}function Zt(){Pn.start()}const Pn=new M_;Pn.setAnimationLoop(At),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(D){rn=D,S.setAnimationLoop(D),D===null?Pn.stop():Pn.start()},S.addEventListener("sessionstart",Kt),S.addEventListener("sessionend",Zt),this.render=function(D,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),S.enabled===!0&&S.isPresenting===!0&&(S.cameraAutoUpdate===!0&&S.updateCamera(Y),Y=S.getCamera()),D.isScene===!0&&D.onBeforeRender(b,D,Y,O),v=ve.get(D,C.length),v.init(),C.push(v),we.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),ot.setFromProjectionMatrix(we),ge=this.localClippingEnabled,ie=Te.init(this.clippingPlanes,ge),A=Ve.get(D,_.length),A.init(),_.push(A),Sn(D,Y,0,b.sortObjects),A.finish(),b.sortObjects===!0&&A.sort(K,he),this.info.render.frame++,ie===!0&&Te.beginShadows();const Q=v.state.shadowsArray;if(qe.render(Q,D,Y),ie===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset(),(S.enabled===!1||S.isPresenting===!1||S.hasDepthSensing()===!1)&&Le.render(A,D),v.setupLights(b._useLegacyLights),Y.isArrayCamera){const ee=Y.cameras;for(let $=0,Ae=ee.length;$<Ae;$++){const Fe=ee[$];Di(A,D,Fe,Fe.viewport)}}else Di(A,D,Y);O!==null&&(w.updateMultisampleRenderTarget(O),w.updateRenderTargetMipmap(O)),D.isScene===!0&&D.onAfterRender(b,D,Y),gt.resetDefaultState(),I=-1,E=null,C.pop(),C.length>0?v=C[C.length-1]:v=null,_.pop(),_.length>0?A=_[_.length-1]:A=null};function Sn(D,Y,Q,ee){if(D.visible===!1)return;if(D.layers.test(Y.layers)){if(D.isGroup)Q=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(Y);else if(D.isLight)v.pushLight(D),D.castShadow&&v.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||ot.intersectsSprite(D)){ee&&Ge.setFromMatrixPosition(D.matrixWorld).applyMatrix4(we);const Fe=Be.update(D),ke=D.material;ke.visible&&A.push(D,Fe,ke,Q,Ge.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||ot.intersectsObject(D))){const Fe=Be.update(D),ke=D.material;if(ee&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ge.copy(D.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),Ge.copy(Fe.boundingSphere.center)),Ge.applyMatrix4(D.matrixWorld).applyMatrix4(we)),Array.isArray(ke)){const Ze=Fe.groups;for(let Je=0,et=Ze.length;Je<et;Je++){const nt=Ze[Je],Yt=ke[nt.materialIndex];Yt&&Yt.visible&&A.push(D,Fe,Yt,Q,Ge.z,nt)}}else ke.visible&&A.push(D,Fe,ke,Q,Ge.z,null)}}const Ae=D.children;for(let Fe=0,ke=Ae.length;Fe<ke;Fe++)Sn(Ae[Fe],Y,Q,ee)}function Di(D,Y,Q,ee){const $=D.opaque,Ae=D.transmissive,Fe=D.transparent;v.setupLightsView(Q),ie===!0&&Te.setGlobalState(b.clippingPlanes,Q),Ae.length>0&&Oi($,Ae,Y,Q),ee&&He.viewport(y.copy(ee)),$.length>0&&Qi($,Y,Q),Ae.length>0&&Qi(Ae,Y,Q),Fe.length>0&&Qi(Fe,Y,Q),He.buffers.depth.setTest(!0),He.buffers.depth.setMask(!0),He.buffers.color.setMask(!0),He.setPolygonOffset(!1)}function Oi(D,Y,Q,ee){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget===null){v.state.transmissionRenderTarget=new vs(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?ul:Xr,minFilter:_r,samples:4,stencilBuffer:o});const Je=B.get(v.state.transmissionRenderTarget);Je.__isTransmissionRenderTarget=!0}const Ae=v.state.transmissionRenderTarget;b.getDrawingBufferSize(Se),Ae.setSize(Se.x,Se.y);const Fe=b.getRenderTarget();b.setRenderTarget(Ae),b.getClearColor(G),q=b.getClearAlpha(),q<1&&b.setClearColor(16777215,.5),b.clear();const ke=b.toneMapping;b.toneMapping=yr,Qi(D,Q,ee),w.updateMultisampleRenderTarget(Ae),w.updateRenderTargetMipmap(Ae);let Ze=!1;for(let Je=0,et=Y.length;Je<et;Je++){const nt=Y[Je],Yt=nt.object,Mn=nt.geometry,Qt=nt.material,ni=nt.group;if(Qt.side===Ai&&Yt.layers.test(ee.layers)){const kt=Qt.side;Qt.side=Xn,Qt.needsUpdate=!0,Da(Yt,Q,ee,Mn,Qt,ni),Qt.side=kt,Qt.needsUpdate=!0,Ze=!0}}Ze===!0&&(w.updateMultisampleRenderTarget(Ae),w.updateRenderTargetMipmap(Ae)),b.setRenderTarget(Fe),b.setClearColor(G,q),b.toneMapping=ke}function Qi(D,Y,Q){const ee=Y.isScene===!0?Y.overrideMaterial:null;for(let $=0,Ae=D.length;$<Ae;$++){const Fe=D[$],ke=Fe.object,Ze=Fe.geometry,Je=ee===null?Fe.material:ee,et=Fe.group;ke.layers.test(Q.layers)&&Da(ke,Y,Q,Ze,Je,et)}}function Da(D,Y,Q,ee,$,Ae){D.onBeforeRender(b,Y,Q,ee,$,Ae),D.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),$.onBeforeRender(b,Y,Q,ee,D,Ae),$.transparent===!0&&$.side===Ai&&$.forceSinglePass===!1?($.side=Xn,$.needsUpdate=!0,b.renderBufferDirect(Q,Y,ee,$,D,Ae),$.side=Yi,$.needsUpdate=!0,b.renderBufferDirect(Q,Y,ee,$,D,Ae),$.side=Ai):b.renderBufferDirect(Q,Y,ee,$,D,Ae),D.onAfterRender(b,Y,Q,ee,$,Ae)}function Es(D,Y,Q){Y.isScene!==!0&&(Y=Xe);const ee=B.get(D),$=v.state.lights,Ae=v.state.shadowsArray,Fe=$.state.version,ke=_e.getParameters(D,$.state,Ae,Y,Q),Ze=_e.getProgramCacheKey(ke);let Je=ee.programs;ee.environment=D.isMeshStandardMaterial?Y.environment:null,ee.fog=Y.fog,ee.envMap=(D.isMeshStandardMaterial?ae:te).get(D.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&D.envMap===null?Y.environmentRotation:D.envMapRotation,Je===void 0&&(D.addEventListener("dispose",Re),Je=new Map,ee.programs=Je);let et=Je.get(Ze);if(et!==void 0){if(ee.currentProgram===et&&ee.lightsStateVersion===Fe)return Ua(D,ke),et}else ke.uniforms=_e.getUniforms(D),D.onBuild(Q,ke,b),D.onBeforeCompile(ke,b),et=_e.acquireProgram(ke,Ze),Je.set(Ze,et),ee.uniforms=ke.uniforms;const nt=ee.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(nt.clippingPlanes=Te.uniform),Ua(D,ke),ee.needsLights=wl(D),ee.lightsStateVersion=Fe,ee.needsLights&&(nt.ambientLightColor.value=$.state.ambient,nt.lightProbe.value=$.state.probe,nt.directionalLights.value=$.state.directional,nt.directionalLightShadows.value=$.state.directionalShadow,nt.spotLights.value=$.state.spot,nt.spotLightShadows.value=$.state.spotShadow,nt.rectAreaLights.value=$.state.rectArea,nt.ltc_1.value=$.state.rectAreaLTC1,nt.ltc_2.value=$.state.rectAreaLTC2,nt.pointLights.value=$.state.point,nt.pointLightShadows.value=$.state.pointShadow,nt.hemisphereLights.value=$.state.hemi,nt.directionalShadowMap.value=$.state.directionalShadowMap,nt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,nt.spotShadowMap.value=$.state.spotShadowMap,nt.spotLightMatrix.value=$.state.spotLightMatrix,nt.spotLightMap.value=$.state.spotLightMap,nt.pointShadowMap.value=$.state.pointShadowMap,nt.pointShadowMatrix.value=$.state.pointShadowMatrix),ee.currentProgram=et,ee.uniformsList=null,et}function Oa(D){if(D.uniformsList===null){const Y=D.currentProgram.getUniforms();D.uniformsList=sl.seqWithValue(Y.seq,D.uniforms)}return D.uniformsList}function Ua(D,Y){const Q=B.get(D);Q.outputColorSpace=Y.outputColorSpace,Q.batching=Y.batching,Q.instancing=Y.instancing,Q.instancingColor=Y.instancingColor,Q.instancingMorph=Y.instancingMorph,Q.skinning=Y.skinning,Q.morphTargets=Y.morphTargets,Q.morphNormals=Y.morphNormals,Q.morphColors=Y.morphColors,Q.morphTargetsCount=Y.morphTargetsCount,Q.numClippingPlanes=Y.numClippingPlanes,Q.numIntersection=Y.numClipIntersection,Q.vertexAlphas=Y.vertexAlphas,Q.vertexTangents=Y.vertexTangents,Q.toneMapping=Y.toneMapping}function Tl(D,Y,Q,ee,$){Y.isScene!==!0&&(Y=Xe),w.resetTextureUnits();const Ae=Y.fog,Fe=ee.isMeshStandardMaterial?Y.environment:null,ke=O===null?b.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:yn,Ze=(ee.isMeshStandardMaterial?ae:te).get(ee.envMap||Fe),Je=ee.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,et=!!Q.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),nt=!!Q.morphAttributes.position,Yt=!!Q.morphAttributes.normal,Mn=!!Q.morphAttributes.color;let Qt=yr;ee.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Qt=b.toneMapping);const ni=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,kt=ni!==void 0?ni.length:0,rt=B.get(ee),Io=v.state.lights;if(ie===!0&&(ge===!0||D!==E)){const Ln=D===E&&ee.id===I;Te.setState(ee,D,Ln)}let Bt=!1;ee.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==Io.state.version||rt.outputColorSpace!==ke||$.isBatchedMesh&&rt.batching===!1||!$.isBatchedMesh&&rt.batching===!0||$.isInstancedMesh&&rt.instancing===!1||!$.isInstancedMesh&&rt.instancing===!0||$.isSkinnedMesh&&rt.skinning===!1||!$.isSkinnedMesh&&rt.skinning===!0||$.isInstancedMesh&&rt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&rt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&rt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&rt.instancingMorph===!1&&$.morphTexture!==null||rt.envMap!==Ze||ee.fog===!0&&rt.fog!==Ae||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==Te.numPlanes||rt.numIntersection!==Te.numIntersection)||rt.vertexAlphas!==Je||rt.vertexTangents!==et||rt.morphTargets!==nt||rt.morphNormals!==Yt||rt.morphColors!==Mn||rt.toneMapping!==Qt||rt.morphTargetsCount!==kt)&&(Bt=!0):(Bt=!0,rt.__version=ee.version);let Ui=rt.currentProgram;Bt===!0&&(Ui=Es(ee,Y,$));let Do=!1,Sr=!1,jr=!1;const dn=Ui.getUniforms(),gi=rt.uniforms;if(He.useProgram(Ui.program)&&(Do=!0,Sr=!0,jr=!0),ee.id!==I&&(I=ee.id,Sr=!0),Do||E!==D){dn.setValue(j,"projectionMatrix",D.projectionMatrix),dn.setValue(j,"viewMatrix",D.matrixWorldInverse);const Ln=dn.map.cameraPosition;Ln!==void 0&&Ln.setValue(j,Ge.setFromMatrixPosition(D.matrixWorld)),bt.logarithmicDepthBuffer&&dn.setValue(j,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&dn.setValue(j,"isOrthographic",D.isOrthographicCamera===!0),E!==D&&(E=D,Sr=!0,jr=!0)}if($.isSkinnedMesh){dn.setOptional(j,$,"bindMatrix"),dn.setOptional(j,$,"bindMatrixInverse");const Ln=$.skeleton;Ln&&(Ln.boneTexture===null&&Ln.computeBoneTexture(),dn.setValue(j,"boneTexture",Ln.boneTexture,w))}$.isBatchedMesh&&(dn.setOptional(j,$,"batchingTexture"),dn.setValue(j,"batchingTexture",$._matricesTexture,w));const Mr=Q.morphAttributes;if((Mr.position!==void 0||Mr.normal!==void 0||Mr.color!==void 0)&&Ie.update($,Q,Ui),(Sr||rt.receiveShadow!==$.receiveShadow)&&(rt.receiveShadow=$.receiveShadow,dn.setValue(j,"receiveShadow",$.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(gi.envMap.value=Ze,gi.flipEnvMap.value=Ze.isCubeTexture&&Ze.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&Y.environment!==null&&(gi.envMapIntensity.value=Y.environmentIntensity),Sr&&(dn.setValue(j,"toneMappingExposure",b.toneMappingExposure),rt.needsLights&&Al(gi,jr),Ae&&ee.fog===!0&&De.refreshFogUniforms(gi,Ae),De.refreshMaterialUniforms(gi,ee,pe,se,v.state.transmissionRenderTarget),sl.upload(j,Oa(rt),gi,w)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(sl.upload(j,Oa(rt),gi,w),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&dn.setValue(j,"center",$.center),dn.setValue(j,"modelViewMatrix",$.modelViewMatrix),dn.setValue(j,"normalMatrix",$.normalMatrix),dn.setValue(j,"modelMatrix",$.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const Ln=ee.uniformsGroups;for(let Oo=0,Na=Ln.length;Oo<Na;Oo++){const Uo=Ln[Oo];Mt.update(Uo,Ui),Mt.bind(Uo,Ui)}}return Ui}function Al(D,Y){D.ambientLightColor.needsUpdate=Y,D.lightProbe.needsUpdate=Y,D.directionalLights.needsUpdate=Y,D.directionalLightShadows.needsUpdate=Y,D.pointLights.needsUpdate=Y,D.pointLightShadows.needsUpdate=Y,D.spotLights.needsUpdate=Y,D.spotLightShadows.needsUpdate=Y,D.rectAreaLights.needsUpdate=Y,D.hemisphereLights.needsUpdate=Y}function wl(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(D,Y,Q){B.get(D.texture).__webglTexture=Y,B.get(D.depthTexture).__webglTexture=Q;const ee=B.get(D);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=Q===void 0,ee.__autoAllocateDepthBuffer||ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,Y){const Q=B.get(D);Q.__webglFramebuffer=Y,Q.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(D,Y=0,Q=0){O=D,k=Y,U=Q;let ee=!0,$=null,Ae=!1,Fe=!1;if(D){const Ze=B.get(D);Ze.__useDefaultFramebuffer!==void 0?(He.bindFramebuffer(j.FRAMEBUFFER,null),ee=!1):Ze.__webglFramebuffer===void 0?w.setupRenderTarget(D):Ze.__hasExternalTextures&&w.rebindTextures(D,B.get(D.texture).__webglTexture,B.get(D.depthTexture).__webglTexture);const Je=D.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(Fe=!0);const et=B.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(et[Y])?$=et[Y][Q]:$=et[Y],Ae=!0):D.samples>0&&w.useMultisampledRTT(D)===!1?$=B.get(D).__webglMultisampledFramebuffer:Array.isArray(et)?$=et[Q]:$=et,y.copy(D.viewport),F.copy(D.scissor),V=D.scissorTest}else y.copy(me).multiplyScalar(pe).floor(),F.copy(Me).multiplyScalar(pe).floor(),V=Ke;if(He.bindFramebuffer(j.FRAMEBUFFER,$)&&ee&&He.drawBuffers(D,$),He.viewport(y),He.scissor(F),He.setScissorTest(V),Ae){const Ze=B.get(D.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ze.__webglTexture,Q)}else if(Fe){const Ze=B.get(D.texture),Je=Y||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,Ze.__webglTexture,Q||0,Je)}I=-1},this.readRenderTargetPixels=function(D,Y,Q,ee,$,Ae,Fe){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=B.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Fe!==void 0&&(ke=ke[Fe]),ke){He.bindFramebuffer(j.FRAMEBUFFER,ke);try{const Ze=D.texture,Je=Ze.format,et=Ze.type;if(Je!==Ci&&St.convert(Je)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const nt=et===ul&&(ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float"));if(et!==Xr&&St.convert(et)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_TYPE)&&et!==Vi&&!nt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=D.width-ee&&Q>=0&&Q<=D.height-$&&j.readPixels(Y,Q,ee,$,St.convert(Je),St.convert(et),Ae)}finally{const Ze=O!==null?B.get(O).__webglFramebuffer:null;He.bindFramebuffer(j.FRAMEBUFFER,Ze)}}},this.copyFramebufferToTexture=function(D,Y,Q=0){const ee=Math.pow(2,-Q),$=Math.floor(Y.image.width*ee),Ae=Math.floor(Y.image.height*ee);w.setTexture2D(Y,0),j.copyTexSubImage2D(j.TEXTURE_2D,Q,0,0,D.x,D.y,$,Ae),He.unbindTexture()},this.copyTextureToTexture=function(D,Y,Q,ee=0){const $=Y.image.width,Ae=Y.image.height,Fe=St.convert(Q.format),ke=St.convert(Q.type);w.setTexture2D(Q,0),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,Q.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,Q.unpackAlignment),Y.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,ee,D.x,D.y,$,Ae,Fe,ke,Y.image.data):Y.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,ee,D.x,D.y,Y.mipmaps[0].width,Y.mipmaps[0].height,Fe,Y.mipmaps[0].data):j.texSubImage2D(j.TEXTURE_2D,ee,D.x,D.y,Fe,ke,Y.image),ee===0&&Q.generateMipmaps&&j.generateMipmap(j.TEXTURE_2D),He.unbindTexture()},this.copyTextureToTexture3D=function(D,Y,Q,ee,$=0){const Ae=Math.round(D.max.x-D.min.x),Fe=Math.round(D.max.y-D.min.y),ke=D.max.z-D.min.z+1,Ze=St.convert(ee.format),Je=St.convert(ee.type);let et;if(ee.isData3DTexture)w.setTexture3D(ee,0),et=j.TEXTURE_3D;else if(ee.isDataArrayTexture||ee.isCompressedArrayTexture)w.setTexture2DArray(ee,0),et=j.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,ee.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,ee.unpackAlignment);const nt=j.getParameter(j.UNPACK_ROW_LENGTH),Yt=j.getParameter(j.UNPACK_IMAGE_HEIGHT),Mn=j.getParameter(j.UNPACK_SKIP_PIXELS),Qt=j.getParameter(j.UNPACK_SKIP_ROWS),ni=j.getParameter(j.UNPACK_SKIP_IMAGES),kt=Q.isCompressedTexture?Q.mipmaps[$]:Q.image;j.pixelStorei(j.UNPACK_ROW_LENGTH,kt.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,kt.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,D.min.x),j.pixelStorei(j.UNPACK_SKIP_ROWS,D.min.y),j.pixelStorei(j.UNPACK_SKIP_IMAGES,D.min.z),Q.isDataTexture||Q.isData3DTexture?j.texSubImage3D(et,$,Y.x,Y.y,Y.z,Ae,Fe,ke,Ze,Je,kt.data):ee.isCompressedArrayTexture?j.compressedTexSubImage3D(et,$,Y.x,Y.y,Y.z,Ae,Fe,ke,Ze,kt.data):j.texSubImage3D(et,$,Y.x,Y.y,Y.z,Ae,Fe,ke,Ze,Je,kt),j.pixelStorei(j.UNPACK_ROW_LENGTH,nt),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Yt),j.pixelStorei(j.UNPACK_SKIP_PIXELS,Mn),j.pixelStorei(j.UNPACK_SKIP_ROWS,Qt),j.pixelStorei(j.UNPACK_SKIP_IMAGES,ni),$===0&&ee.generateMipmaps&&j.generateMipmap(et),He.unbindTexture()},this.initTexture=function(D){D.isCubeTexture?w.setTextureCube(D,0):D.isData3DTexture?w.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?w.setTexture2DArray(D,0):w.setTexture2D(D,0),He.unbindTexture()},this.resetState=function(){k=0,U=0,O=null,He.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===tf?"display-p3":"srgb",t.unpackColorSpace=Ct.workingColorSpace===yl?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class RC extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Li,this.environmentIntensity=1,this.environmentRotation=new Li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class C_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Nh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Pi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return f_("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Un=new N;class Ra{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Un.fromBufferAttribute(this,t),Un.applyMatrix4(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Un.fromBufferAttribute(this,t),Un.applyNormalMatrix(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Un.fromBufferAttribute(this,t),Un.transformDirection(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array),o=Lt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new nn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ra(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class P_ extends mi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let io;const ta=new N,ro=new N,so=new N,oo=new Pe,na=new Pe,L_=new Qe,Vc=new N,ia=new N,Wc=new N,rg=new Pe,ph=new Pe,sg=new Pe;class CC extends mt{constructor(e=new P_){if(super(),this.isSprite=!0,this.type="Sprite",io===void 0){io=new Jt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new C_(t,5);io.setIndex([0,1,2,0,2,3]),io.setAttribute("position",new Ra(n,3,0,!1)),io.setAttribute("uv",new Ra(n,2,3,!1))}this.geometry=io,this.material=e,this.center=new Pe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ro.setFromMatrixScale(this.matrixWorld),L_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),so.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ro.multiplyScalar(-so.z);const n=this.material.rotation;let r,o;n!==0&&(o=Math.cos(n),r=Math.sin(n));const c=this.center;Xc(Vc.set(-.5,-.5,0),so,c,ro,r,o),Xc(ia.set(.5,-.5,0),so,c,ro,r,o),Xc(Wc.set(.5,.5,0),so,c,ro,r,o),rg.set(0,0),ph.set(1,0),sg.set(1,1);let l=e.ray.intersectTriangle(Vc,ia,Wc,!1,ta);if(l===null&&(Xc(ia.set(-.5,.5,0),so,c,ro,r,o),ph.set(0,1),l=e.ray.intersectTriangle(Vc,Wc,ia,!1,ta),l===null))return;const h=e.ray.origin.distanceTo(ta);h<e.near||h>e.far||t.push({distance:h,point:ta.clone(),uv:Ri.getInterpolation(ta,Vc,ia,Wc,rg,ph,sg,new Pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Xc(i,e,t,n,r,o){oo.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(na.x=o*oo.x-r*oo.y,na.y=r*oo.x+o*oo.y):na.copy(oo),i.copy(e),i.x+=na.x,i.y+=na.y,i.applyMatrix4(L_)}const og=new N,ag=new Dt,cg=new Dt,PC=new N,lg=new Qe,Yc=new N,mh=new Zi,ug=new Qe,gh=new To;class LC extends ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=zp,this.bindMatrix=new Qe,this.bindMatrixInverse=new Qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ii),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Yc),this.boundingBox.expandByPoint(Yc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Zi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Yc),this.boundingSphere.expandByPoint(Yc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mh.copy(this.boundingSphere),mh.applyMatrix4(r),e.ray.intersectsSphere(mh)!==!1&&(ug.copy(r).invert(),gh.copy(e.ray).applyMatrix4(ug),!(this.boundingBox!==null&&gh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,gh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Dt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===zp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Nb?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;ag.fromBufferAttribute(r.attributes.skinIndex,e),cg.fromBufferAttribute(r.attributes.skinWeight,e),og.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){const c=cg.getComponent(o);if(c!==0){const l=ag.getComponent(o);lg.multiplyMatrices(n.bones[l].matrixWorld,n.boneInverses[l]),t.addScaledVector(PC.copy(og).applyMatrix4(lg),c)}}return t.applyMatrix4(this.bindMatrixInverse)}}class I_ extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class D_ extends un{constructor(e=null,t=1,n=1,r,o,c,l,h,f=zn,d=zn,p,m){super(null,c,l,h,f,d,r,o,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hg=new Qe,IC=new Qe;class af{constructor(e=[],t=[]){this.uuid=Pi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let o=0,c=e.length;o<c;o++){const l=e[o]?e[o].matrixWorld:IC;hg.multiplyMatrices(l,t[o]),hg.toArray(n,o*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new af(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new D_(t,e,e,Ci,Vi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const o=e.bones[n];let c=t[o];c===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),c=new I_),this.bones.push(c),this.boneInverses.push(new Qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,o=t.length;r<o;r++){const c=t[r];e.bones.push(c.uuid);const l=n[r];e.boneInverses.push(l.toArray())}return e}}class Bh extends nn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ao=new Qe,fg=new Qe,jc=[],dg=new Ii,DC=new Qe,ra=new ye,sa=new Zi;class OC extends ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,DC)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ii),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),dg.copy(e.boundingBox).applyMatrix4(ao),this.boundingBox.union(dg)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),sa.copy(e.boundingSphere).applyMatrix4(ao),this.boundingSphere.union(sa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,o=n.length+1,c=e*o+1;for(let l=0;l<n.length;l++)n[l]=r[c+l]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(ra.geometry=this.geometry,ra.material=this.material,ra.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sa.copy(this.boundingSphere),sa.applyMatrix4(n),e.ray.intersectsSphere(sa)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,ao),fg.multiplyMatrices(n,ao),ra.matrixWorld=fg,ra.raycast(e,jc);for(let c=0,l=jc.length;c<l;c++){const h=jc[c];h.instanceId=o,h.object=this,t.push(h)}jc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Bh(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new D_(new Float32Array(r*this.count),r,this.count,i_,Vi));const o=this.morphTexture.source.data.data;let c=0;for(let f=0;f<n.length;f++)c+=n[f];const l=this.geometry.morphTargetsRelative?1:1-c,h=r*e;o[h]=l,o.set(n,h+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class wo extends mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const pg=new N,mg=new N,gg=new Qe,_h=new To,qc=new Zi;class di extends mt{constructor(e=new Jt,t=new wo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,o=t.count;r<o;r++)pg.fromBufferAttribute(t,r-1),mg.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=pg.distanceTo(mg);e.setAttribute("lineDistance",new Nt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qc.copy(n.boundingSphere),qc.applyMatrix4(r),qc.radius+=o,e.ray.intersectsSphere(qc)===!1)return;gg.copy(r).invert(),_h.copy(e.ray).applyMatrix4(gg);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,f=new N,d=new N,p=new N,m=new N,x=this.isLineSegments?2:1,M=n.index,v=n.attributes.position;if(M!==null){const _=Math.max(0,c.start),C=Math.min(M.count,c.start+c.count);for(let b=_,L=C-1;b<L;b+=x){const k=M.getX(b),U=M.getX(b+1);if(f.fromBufferAttribute(v,k),d.fromBufferAttribute(v,U),_h.distanceSqToSegment(f,d,m,p)>h)continue;m.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(m);I<e.near||I>e.far||t.push({distance:I,point:p.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}else{const _=Math.max(0,c.start),C=Math.min(v.count,c.start+c.count);for(let b=_,L=C-1;b<L;b+=x){if(f.fromBufferAttribute(v,b),d.fromBufferAttribute(v,b+1),_h.distanceSqToSegment(f,d,m,p)>h)continue;m.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(m);U<e.near||U>e.far||t.push({distance:U,point:p.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}const _g=new N,vg=new N;class cf extends di{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,o=t.count;r<o;r+=2)_g.fromBufferAttribute(t,r),vg.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+_g.distanceTo(vg);e.setAttribute("lineDistance",new Nt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class UC extends di{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class O_ extends mi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xg=new Qe,zh=new To,Kc=new Zi,Zc=new N;class NC extends mt{constructor(e=new Jt,t=new O_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,o=e.params.Points.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kc.copy(n.boundingSphere),Kc.applyMatrix4(r),Kc.radius+=o,e.ray.intersectsSphere(Kc)===!1)return;xg.copy(r).invert(),zh.copy(e.ray).applyMatrix4(xg);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,f=n.index,p=n.attributes.position;if(f!==null){const m=Math.max(0,c.start),x=Math.min(f.count,c.start+c.count);for(let M=m,A=x;M<A;M++){const v=f.getX(M);Zc.fromBufferAttribute(p,v),yg(Zc,v,h,r,e,t,this)}}else{const m=Math.max(0,c.start),x=Math.min(p.count,c.start+c.count);for(let M=m,A=x;M<A;M++)Zc.fromBufferAttribute(p,M),yg(Zc,M,h,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}function yg(i,e,t,n,r,o,c){const l=zh.distanceSqToPoint(i);if(l<t){const h=new N;zh.closestPointToPoint(i,h),h.applyMatrix4(n);const f=r.ray.origin.distanceTo(h);if(f<r.near||f>r.far)return;o.push({distance:f,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,object:c})}}class gn extends Jt{constructor(e=1,t=1,n=1,r=32,o=1,c=!1,l=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:o,openEnded:c,thetaStart:l,thetaLength:h};const f=this;r=Math.floor(r),o=Math.floor(o);const d=[],p=[],m=[],x=[];let M=0;const A=[],v=n/2;let _=0;C(),c===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new Nt(p,3)),this.setAttribute("normal",new Nt(m,3)),this.setAttribute("uv",new Nt(x,2));function C(){const L=new N,k=new N;let U=0;const O=(t-e)/n;for(let I=0;I<=o;I++){const E=[],y=I/o,F=y*(t-e)+e;for(let V=0;V<=r;V++){const G=V/r,q=G*h+l,ne=Math.sin(q),se=Math.cos(q);k.x=F*ne,k.y=-y*n+v,k.z=F*se,p.push(k.x,k.y,k.z),L.set(ne,O,se).normalize(),m.push(L.x,L.y,L.z),x.push(G,1-y),E.push(M++)}A.push(E)}for(let I=0;I<r;I++)for(let E=0;E<o;E++){const y=A[E][I],F=A[E+1][I],V=A[E+1][I+1],G=A[E][I+1];d.push(y,F,G),d.push(F,V,G),U+=6}f.addGroup(_,U,0),_+=U}function b(L){const k=M,U=new Pe,O=new N;let I=0;const E=L===!0?e:t,y=L===!0?1:-1;for(let V=1;V<=r;V++)p.push(0,v*y,0),m.push(0,y,0),x.push(.5,.5),M++;const F=M;for(let V=0;V<=r;V++){const q=V/r*h+l,ne=Math.cos(q),se=Math.sin(q);O.x=E*se,O.y=v*y,O.z=E*ne,p.push(O.x,O.y,O.z),m.push(0,y,0),U.x=ne*.5+.5,U.y=se*.5*y+.5,x.push(U.x,U.y),M++}for(let V=0;V<r;V++){const G=k+V,q=F+V;L===!0?d.push(q,q+1,G):d.push(q+1,q,G),I+=3}f.addGroup(_,I,L===!0?1:2),_+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class lf extends gn{constructor(e=1,t=1,n=32,r=1,o=!1,c=0,l=Math.PI*2){super(0,e,t,n,r,o,c,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:c,thetaLength:l}}static fromJSON(e){return new lf(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class uf extends Jt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const o=[],c=[];l(r),f(n),d(),this.setAttribute("position",new Nt(o,3)),this.setAttribute("normal",new Nt(o.slice(),3)),this.setAttribute("uv",new Nt(c,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function l(C){const b=new N,L=new N,k=new N;for(let U=0;U<t.length;U+=3)x(t[U+0],b),x(t[U+1],L),x(t[U+2],k),h(b,L,k,C)}function h(C,b,L,k){const U=k+1,O=[];for(let I=0;I<=U;I++){O[I]=[];const E=C.clone().lerp(L,I/U),y=b.clone().lerp(L,I/U),F=U-I;for(let V=0;V<=F;V++)V===0&&I===U?O[I][V]=E:O[I][V]=E.clone().lerp(y,V/F)}for(let I=0;I<U;I++)for(let E=0;E<2*(U-I)-1;E++){const y=Math.floor(E/2);E%2===0?(m(O[I][y+1]),m(O[I+1][y]),m(O[I][y])):(m(O[I][y+1]),m(O[I+1][y+1]),m(O[I+1][y]))}}function f(C){const b=new N;for(let L=0;L<o.length;L+=3)b.x=o[L+0],b.y=o[L+1],b.z=o[L+2],b.normalize().multiplyScalar(C),o[L+0]=b.x,o[L+1]=b.y,o[L+2]=b.z}function d(){const C=new N;for(let b=0;b<o.length;b+=3){C.x=o[b+0],C.y=o[b+1],C.z=o[b+2];const L=v(C)/2/Math.PI+.5,k=_(C)/Math.PI+.5;c.push(L,1-k)}M(),p()}function p(){for(let C=0;C<c.length;C+=6){const b=c[C+0],L=c[C+2],k=c[C+4],U=Math.max(b,L,k),O=Math.min(b,L,k);U>.9&&O<.1&&(b<.2&&(c[C+0]+=1),L<.2&&(c[C+2]+=1),k<.2&&(c[C+4]+=1))}}function m(C){o.push(C.x,C.y,C.z)}function x(C,b){const L=C*3;b.x=e[L+0],b.y=e[L+1],b.z=e[L+2]}function M(){const C=new N,b=new N,L=new N,k=new N,U=new Pe,O=new Pe,I=new Pe;for(let E=0,y=0;E<o.length;E+=9,y+=6){C.set(o[E+0],o[E+1],o[E+2]),b.set(o[E+3],o[E+4],o[E+5]),L.set(o[E+6],o[E+7],o[E+8]),U.set(c[y+0],c[y+1]),O.set(c[y+2],c[y+3]),I.set(c[y+4],c[y+5]),k.copy(C).add(b).add(L).divideScalar(3);const F=v(k);A(U,y+0,C,F),A(O,y+2,b,F),A(I,y+4,L,F)}}function A(C,b,L,k){k<0&&C.x===1&&(c[b]=C.x-1),L.x===0&&L.z===0&&(c[b]=k/2/Math.PI+.5)}function v(C){return Math.atan2(C.z,-C.x)}function _(C){return Math.atan2(-C.y,Math.sqrt(C.x*C.x+C.z*C.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uf(e.vertices,e.indices,e.radius,e.details)}}class uo extends uf{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new uo(e.radius,e.detail)}}class Pa extends Jt{constructor(e=1,t=32,n=16,r=0,o=Math.PI*2,c=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:o,thetaStart:c,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(c+l,Math.PI);let f=0;const d=[],p=new N,m=new N,x=[],M=[],A=[],v=[];for(let _=0;_<=n;_++){const C=[],b=_/n;let L=0;_===0&&c===0?L=.5/t:_===n&&h===Math.PI&&(L=-.5/t);for(let k=0;k<=t;k++){const U=k/t;p.x=-e*Math.cos(r+U*o)*Math.sin(c+b*l),p.y=e*Math.cos(c+b*l),p.z=e*Math.sin(r+U*o)*Math.sin(c+b*l),M.push(p.x,p.y,p.z),m.copy(p).normalize(),A.push(m.x,m.y,m.z),v.push(U+L,1-b),C.push(f++)}d.push(C)}for(let _=0;_<n;_++)for(let C=0;C<t;C++){const b=d[_][C+1],L=d[_][C],k=d[_+1][C],U=d[_+1][C+1];(_!==0||c>0)&&x.push(b,L,U),(_!==n-1||h<Math.PI)&&x.push(L,k,U)}this.setIndex(x),this.setAttribute("position",new Nt(M,3)),this.setAttribute("normal",new Nt(A,3)),this.setAttribute("uv",new Nt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pa(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class gs extends Jt{constructor(e=1,t=.4,n=12,r=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:o},n=Math.floor(n),r=Math.floor(r);const c=[],l=[],h=[],f=[],d=new N,p=new N,m=new N;for(let x=0;x<=n;x++)for(let M=0;M<=r;M++){const A=M/r*o,v=x/n*Math.PI*2;p.x=(e+t*Math.cos(v))*Math.cos(A),p.y=(e+t*Math.cos(v))*Math.sin(A),p.z=t*Math.sin(v),l.push(p.x,p.y,p.z),d.x=e*Math.cos(A),d.y=e*Math.sin(A),m.subVectors(p,d).normalize(),h.push(m.x,m.y,m.z),f.push(M/r),f.push(x/n)}for(let x=1;x<=n;x++)for(let M=1;M<=r;M++){const A=(r+1)*x+M-1,v=(r+1)*(x-1)+M-1,_=(r+1)*(x-1)+M,C=(r+1)*x+M;c.push(A,v,C),c.push(v,_,C)}this.setIndex(c),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(h,3)),this.setAttribute("uv",new Nt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class FC extends mi{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ne(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Ro extends mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=l_,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $i extends Ro{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return xn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class BC extends wo{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function $c(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function zC(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function kC(i){function e(r,o){return i[r]-i[o]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Sg(i,e,t){const n=i.length,r=new i.constructor(n);for(let o=0,c=0;c!==n;++o){const l=t[o]*e;for(let h=0;h!==e;++h)r[c++]=i[l+h]}return r}function U_(i,e,t,n){let r=1,o=i[0];for(;o!==void 0&&o[n]===void 0;)o=i[r++];if(o===void 0)return;let c=o[n];if(c!==void 0)if(Array.isArray(c))do c=o[n],c!==void 0&&(e.push(o.time),t.push.apply(t,c)),o=i[r++];while(o!==void 0);else if(c.toArray!==void 0)do c=o[n],c!==void 0&&(e.push(o.time),c.toArray(t,t.length)),o=i[r++];while(o!==void 0);else do c=o[n],c!==void 0&&(e.push(o.time),t.push(c)),o=i[r++];while(o!==void 0)}class La{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],o=t[n-1];e:{t:{let c;n:{i:if(!(e<r)){for(let l=n+2;;){if(r===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(o=r,r=t[++n],e<r)break t}c=t.length;break n}if(!(e>=o)){const l=t[1];e<l&&(n=2,o=l);for(let h=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(r=o,o=t[--n-1],e>=o)break t}c=n,n=0;break n}break e}for(;n<c;){const l=n+c>>>1;e<t[l]?c=l:n=l+1}if(r=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,r)}return this.interpolate_(n,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r;for(let c=0;c!==r;++c)t[c]=n[o+c];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class HC extends La{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:hm,endingEnd:hm}}intervalChanged_(e,t,n){const r=this.parameterPositions;let o=e-2,c=e+1,l=r[o],h=r[c];if(l===void 0)switch(this.getSettings_().endingStart){case fm:o=e,l=2*t-n;break;case dm:o=r.length-2,l=t+r[o]-r[o+1];break;default:o=e,l=n}if(h===void 0)switch(this.getSettings_().endingEnd){case fm:c=e,h=2*n-t;break;case dm:c=1,h=n+r[1]-r[0];break;default:c=e-1,h=t}const f=(n-t)*.5,d=this.valueSize;this._weightPrev=f/(t-l),this._weightNext=f/(h-n),this._offsetPrev=o*d,this._offsetNext=c*d}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,f=h-l,d=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,x=this._weightNext,M=(n-t)/(r-t),A=M*M,v=A*M,_=-m*v+2*m*A-m*M,C=(1+m)*v+(-1.5-2*m)*A+(-.5+m)*M+1,b=(-1-x)*v+(1.5+x)*A+.5*M,L=x*v-x*A;for(let k=0;k!==l;++k)o[k]=_*c[d+k]+C*c[f+k]+b*c[h+k]+L*c[p+k];return o}}class GC extends La{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,f=h-l,d=(n-t)/(r-t),p=1-d;for(let m=0;m!==l;++m)o[m]=c[f+m]*p+c[h+m]*d;return o}}class VC extends La{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ji{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$c(t,this.TimeBufferType),this.values=$c(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$c(e.times,Array),values:$c(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new VC(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new GC(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new HC(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Aa:t=this.InterpolantFactoryMethodDiscrete;break;case yo:t=this.InterpolantFactoryMethodLinear;break;case Gu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Aa;case this.InterpolantFactoryMethodLinear:return yo;case this.InterpolantFactoryMethodSmooth:return Gu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let o=0,c=r-1;for(;o!==r&&n[o]<e;)++o;for(;c!==-1&&n[c]>t;)--c;if(++c,o!==0||c!==r){o>=c&&(c=Math.max(c,1),o=c-1);const l=this.getValueSize();this.times=n.slice(o,c),this.values=this.values.slice(o*l,c*l)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let c=null;for(let l=0;l!==o;l++){const h=n[l];if(typeof h=="number"&&isNaN(h)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,h),e=!1;break}if(c!==null&&c>h){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,h,c),e=!1;break}c=h}if(r!==void 0&&zC(r))for(let l=0,h=r.length;l!==h;++l){const f=r[l];if(isNaN(f)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,f),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Gu,o=e.length-1;let c=1;for(let l=1;l<o;++l){let h=!1;const f=e[l],d=e[l+1];if(f!==d&&(l!==1||f!==e[0]))if(r)h=!0;else{const p=l*n,m=p-n,x=p+n;for(let M=0;M!==n;++M){const A=t[p+M];if(A!==t[m+M]||A!==t[x+M]){h=!0;break}}}if(h){if(l!==c){e[c]=e[l];const p=l*n,m=c*n;for(let x=0;x!==n;++x)t[m+x]=t[p+x]}++c}}if(o>0){e[c]=e[o];for(let l=o*n,h=c*n,f=0;f!==n;++f)t[h+f]=t[l+f];++c}return c!==e.length?(this.times=e.slice(0,c),this.values=t.slice(0,c*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Ji.prototype.TimeBufferType=Float32Array;Ji.prototype.ValueBufferType=Float32Array;Ji.prototype.DefaultInterpolation=yo;class Co extends Ji{}Co.prototype.ValueTypeName="bool";Co.prototype.ValueBufferType=Array;Co.prototype.DefaultInterpolation=Aa;Co.prototype.InterpolantFactoryMethodLinear=void 0;Co.prototype.InterpolantFactoryMethodSmooth=void 0;class N_ extends Ji{}N_.prototype.ValueTypeName="color";class Eo extends Ji{}Eo.prototype.ValueTypeName="number";class WC extends La{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=(n-t)/(r-t);let f=e*l;for(let d=f+l;f!==d;f+=4)on.slerpFlat(o,0,c,f-l,c,f,h);return o}}class xs extends Ji{InterpolantFactoryMethodLinear(e){return new WC(this.times,this.values,this.getValueSize(),e)}}xs.prototype.ValueTypeName="quaternion";xs.prototype.DefaultInterpolation=yo;xs.prototype.InterpolantFactoryMethodSmooth=void 0;class Po extends Ji{}Po.prototype.ValueTypeName="string";Po.prototype.ValueBufferType=Array;Po.prototype.DefaultInterpolation=Aa;Po.prototype.InterpolantFactoryMethodLinear=void 0;Po.prototype.InterpolantFactoryMethodSmooth=void 0;class bo extends Ji{}bo.prototype.ValueTypeName="vector";class XC{constructor(e="",t=-1,n=[],r=Yb){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Pi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let c=0,l=n.length;c!==l;++c)t.push(jC(n[c]).scale(r));const o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,c=n.length;o!==c;++o)t.push(Ji.toJSON(n[o]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const o=t.length,c=[];for(let l=0;l<o;l++){let h=[],f=[];h.push((l+o-1)%o,l,(l+1)%o),f.push(0,1,0);const d=kC(h);h=Sg(h,1,d),f=Sg(f,1,d),!r&&h[0]===0&&(h.push(o),f.push(f[0])),c.push(new Eo(".morphTargetInfluences["+t[l].name+"]",h,f).scale(1/n))}return new this(e,-1,c)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},o=/^([\w-]*?)([\d]+)$/;for(let l=0,h=e.length;l<h;l++){const f=e[l],d=f.name.match(o);if(d&&d.length>1){const p=d[1];let m=r[p];m||(r[p]=m=[]),m.push(f)}}const c=[];for(const l in r)c.push(this.CreateFromMorphTargetSequence(l,r[l],t,n));return c}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(p,m,x,M,A){if(x.length!==0){const v=[],_=[];U_(x,v,_,M),v.length!==0&&A.push(new p(m,v,_))}},r=[],o=e.name||"default",c=e.fps||30,l=e.blendMode;let h=e.length||-1;const f=e.hierarchy||[];for(let p=0;p<f.length;p++){const m=f[p].keys;if(!(!m||m.length===0))if(m[0].morphTargets){const x={};let M;for(M=0;M<m.length;M++)if(m[M].morphTargets)for(let A=0;A<m[M].morphTargets.length;A++)x[m[M].morphTargets[A]]=-1;for(const A in x){const v=[],_=[];for(let C=0;C!==m[M].morphTargets.length;++C){const b=m[M];v.push(b.time),_.push(b.morphTarget===A?1:0)}r.push(new Eo(".morphTargetInfluence["+A+"]",v,_))}h=x.length*c}else{const x=".bones["+t[p].name+"]";n(bo,x+".position",m,"pos",r),n(xs,x+".quaternion",m,"rot",r),n(bo,x+".scale",m,"scl",r)}}return r.length===0?null:new this(o,h,r,l)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function YC(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Eo;case"vector":case"vector2":case"vector3":case"vector4":return bo;case"color":return N_;case"quaternion":return xs;case"bool":case"boolean":return Co;case"string":return Po}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function jC(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=YC(i.type);if(i.times===void 0){const t=[],n=[];U_(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Vr={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class qC{constructor(e,t,n){const r=this;let o=!1,c=0,l=0,h;const f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){l++,o===!1&&r.onStart!==void 0&&r.onStart(d,c,l),o=!0},this.itemEnd=function(d){c++,r.onProgress!==void 0&&r.onProgress(d,c,l),c===l&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return h?h(d):d},this.setURLModifier=function(d){return h=d,this},this.addHandler=function(d,p){return f.push(d,p),this},this.removeHandler=function(d){const p=f.indexOf(d);return p!==-1&&f.splice(p,2),this},this.getHandler=function(d){for(let p=0,m=f.length;p<m;p+=2){const x=f[p],M=f[p+1];if(x.global&&(x.lastIndex=0),x.test(d))return M}return null}}}const KC=new qC;let Ms=class{constructor(e){this.manager=e!==void 0?e:KC,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,o){n.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ms.DEFAULT_MATERIAL_NAME="__DEFAULT";const pr={};class ZC extends Error{constructor(e,t){super(e),this.response=t}}class ml extends Ms{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=Vr.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(pr[e]!==void 0){pr[e].push({onLoad:t,onProgress:n,onError:r});return}pr[e]=[],pr[e].push({onLoad:t,onProgress:n,onError:r});const c=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,h=this.responseType;fetch(c).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||f.body===void 0||f.body.getReader===void 0)return f;const d=pr[e],p=f.body.getReader(),m=f.headers.get("Content-Length")||f.headers.get("X-File-Size"),x=m?parseInt(m):0,M=x!==0;let A=0;const v=new ReadableStream({start(_){C();function C(){p.read().then(({done:b,value:L})=>{if(b)_.close();else{A+=L.byteLength;const k=new ProgressEvent("progress",{lengthComputable:M,loaded:A,total:x});for(let U=0,O=d.length;U<O;U++){const I=d[U];I.onProgress&&I.onProgress(k)}_.enqueue(L),C()}})}}});return new Response(v)}else throw new ZC(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(h){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(d=>new DOMParser().parseFromString(d,l));case"json":return f.json();default:if(l===void 0)return f.text();{const p=/charset="?([^;"\s]*)"?/i.exec(l),m=p&&p[1]?p[1].toLowerCase():void 0,x=new TextDecoder(m);return f.arrayBuffer().then(M=>x.decode(M))}}}).then(f=>{Vr.add(e,f);const d=pr[e];delete pr[e];for(let p=0,m=d.length;p<m;p++){const x=d[p];x.onLoad&&x.onLoad(f)}}).catch(f=>{const d=pr[e];if(d===void 0)throw this.manager.itemError(e),f;delete pr[e];for(let p=0,m=d.length;p<m;p++){const x=d[p];x.onError&&x.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class $C extends Ms{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,c=Vr.get(e);if(c!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(c),o.manager.itemEnd(e)},0),c;const l=wa("img");function h(){d(),Vr.add(e,this),t&&t(this),o.manager.itemEnd(e)}function f(p){d(),r&&r(p),o.manager.itemError(e),o.manager.itemEnd(e)}function d(){l.removeEventListener("load",h,!1),l.removeEventListener("error",f,!1)}return l.addEventListener("load",h,!1),l.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),o.manager.itemStart(e),l.src=e,l}}class F_ extends Ms{constructor(e){super(e)}load(e,t,n,r){const o=new un,c=new $C(this.manager);return c.setCrossOrigin(this.crossOrigin),c.setPath(this.path),c.load(e,function(l){o.image=l,o.needsUpdate=!0,t!==void 0&&t(o)},n,r),o}}class Lo extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class JC extends Lo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const vh=new Qe,Mg=new N,Eg=new N;class hf{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sf,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Mg.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mg),Eg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Eg),t.updateMatrixWorld(),vh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class QC extends hf{constructor(){super(new Bn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=So*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,o=e.distance||t.far;(n!==t.fov||r!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=r,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class eP extends Lo{constructor(e,t,n=0,r=Math.PI/3,o=0,c=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=r,this.penumbra=o,this.decay=c,this.map=null,this.shadow=new QC}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const bg=new Qe,oa=new N,xh=new N;class tP extends hf{constructor(){super(new Bn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new Dt(2,1,1,1),new Dt(0,1,1,1),new Dt(3,1,1,1),new Dt(1,1,1,1),new Dt(3,0,1,1),new Dt(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),oa.setFromMatrixPosition(e.matrixWorld),n.position.copy(oa),xh.copy(n.position),xh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(xh),n.updateMatrixWorld(),r.makeTranslation(-oa.x,-oa.y,-oa.z),bg.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bg)}}class B_ extends Lo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new tP}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class nP extends hf{constructor(){super(new Sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ff extends Lo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new nP}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class iP extends Lo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class rP{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new N)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,r=e.y,o=e.z,c=this.coefficients;return t.copy(c[0]).multiplyScalar(.282095),t.addScaledVector(c[1],.488603*r),t.addScaledVector(c[2],.488603*o),t.addScaledVector(c[3],.488603*n),t.addScaledVector(c[4],1.092548*(n*r)),t.addScaledVector(c[5],1.092548*(r*o)),t.addScaledVector(c[6],.315392*(3*o*o-1)),t.addScaledVector(c[7],1.092548*(n*o)),t.addScaledVector(c[8],.546274*(n*n-r*r)),t}getIrradianceAt(e,t){const n=e.x,r=e.y,o=e.z,c=this.coefficients;return t.copy(c[0]).multiplyScalar(.886227),t.addScaledVector(c[1],2*.511664*r),t.addScaledVector(c[2],2*.511664*o),t.addScaledVector(c[3],2*.511664*n),t.addScaledVector(c[4],2*.429043*n*r),t.addScaledVector(c[5],2*.429043*r*o),t.addScaledVector(c[6],.743125*o*o-.247708),t.addScaledVector(c[7],2*.429043*n*o),t.addScaledVector(c[8],.429043*(n*n-r*r)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let r=0;r<9;r++)n[r].fromArray(e,t+r*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let r=0;r<9;r++)n[r].toArray(e,t+r*3);return e}static getBasisAt(e,t){const n=e.x,r=e.y,o=e.z;t[0]=.282095,t[1]=.488603*r,t[2]=.488603*o,t[3]=.488603*n,t[4]=1.092548*n*r,t[5]=1.092548*r*o,t[6]=.315392*(3*o*o-1),t[7]=1.092548*n*o,t[8]=.546274*(n*n-r*r)}}class sP extends Lo{constructor(e=new rP,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class Sa{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class oP extends Ms{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,c=Vr.get(e);if(c!==void 0){if(o.manager.itemStart(e),c.then){c.then(f=>{t&&t(f),o.manager.itemEnd(e)}).catch(f=>{r&&r(f)});return}return setTimeout(function(){t&&t(c),o.manager.itemEnd(e)},0),c}const l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader;const h=fetch(e,l).then(function(f){return f.blob()}).then(function(f){return createImageBitmap(f,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(f){return Vr.add(e,f),t&&t(f),o.manager.itemEnd(e),f}).catch(function(f){r&&r(f),Vr.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});Vr.add(e,h),o.manager.itemStart(e)}}const df="\\[\\]\\.:\\/",aP=new RegExp("["+df+"]","g"),pf="[^"+df+"]",cP="[^"+df.replace("\\.","")+"]",lP=/((?:WC+[\/:])*)/.source.replace("WC",pf),uP=/(WCOD+)?/.source.replace("WCOD",cP),hP=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pf),fP=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pf),dP=new RegExp("^"+lP+uP+hP+fP+"$"),pP=["material","materials","bones","map"];class mP{constructor(e,t,n){const r=n||It.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=n.length;r!==o;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class It{constructor(e,t,n){this.path=t,this.parsedPath=n||It.parseTrackName(t),this.node=It.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new It.Composite(e,t,n):new It(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(aP,"")}static parseTrackName(e){const t=dP.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const o=n.nodeName.substring(r+1);pP.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(o){for(let c=0;c<o.length;c++){const l=o[c];if(l.name===t||l.uuid===t)return l;const h=n(l.children);if(h)return h}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let o=t.propertyIndex;if(e||(e=It.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let f=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===f){f=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(f!==void 0){if(e[f]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[f]}}const c=e[r];if(c===void 0){const f=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+f+"."+r+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}h=this.BindingType.ArrayElement,this.resolvedProperty=c,this.propertyIndex=o}else c.fromArray!==void 0&&c.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=c):Array.isArray(c)?(h=this.BindingType.EntireArray,this.resolvedProperty=c):this.propertyName=r;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}It.Composite=mP;It.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};It.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};It.prototype.GetterByBindingType=[It.prototype._getValue_direct,It.prototype._getValue_array,It.prototype._getValue_arrayElement,It.prototype._getValue_toArray];It.prototype.SetterByBindingTypeAndVersioning=[[It.prototype._setValue_direct,It.prototype._setValue_direct_setNeedsUpdate,It.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[It.prototype._setValue_array,It.prototype._setValue_array_setNeedsUpdate,It.prototype._setValue_array_setMatrixWorldNeedsUpdate],[It.prototype._setValue_arrayElement,It.prototype._setValue_arrayElement_setNeedsUpdate,It.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[It.prototype._setValue_fromArray,It.prototype._setValue_fromArray_setNeedsUpdate,It.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Tg=new Qe;class El{constructor(e,t,n=0,r=1/0){this.ray=new To(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new rf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Tg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tg),this}intersectObject(e,t=!0,n=[]){return kh(e,this,n,t),n.sort(Ag),n}intersectObjects(e,t=!0,n=[]){for(let r=0,o=e.length;r<o;r++)kh(e[r],this,n,t);return n.sort(Ag),n}}function Ag(i,e){return i.distance-e.distance}function kh(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let o=0,c=r.length;o<c;o++)kh(r[o],e,t,!0)}}class wg{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(xn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class gP extends cf{constructor(e=10,t=10,n=4473924,r=8947848){n=new Ne(n),r=new Ne(r);const o=t/2,c=e/t,l=e/2,h=[],f=[];for(let m=0,x=0,M=-l;m<=t;m++,M+=c){h.push(-l,0,M,l,0,M),h.push(M,0,-l,M,0,l);const A=m===o?n:r;A.toArray(f,x),x+=3,A.toArray(f,x),x+=3,A.toArray(f,x),x+=3,A.toArray(f,x),x+=3}const d=new Jt;d.setAttribute("position",new Nt(h,3)),d.setAttribute("color",new Nt(f,3));const p=new wo({vertexColors:!0,toneMapped:!1});super(d,p),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class _P extends cf{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Jt;r.setAttribute("position",new Nt(t,3)),r.setAttribute("color",new Nt(n,3));const o=new wo({vertexColors:!0,toneMapped:!1});super(r,o),this.type="AxesHelper"}setColors(e,t,n){const r=new Ne,o=this.geometry.attributes.color.array;return r.set(e),r.toArray(o,0),r.toArray(o,3),r.set(t),r.toArray(o,6),r.toArray(o,9),r.set(n),r.toArray(o,12),r.toArray(o,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ef}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ef);const fs={antialias:!0,alpha:!0,stencil:!1,shadowMapEnabled:!0,shadowMapType:Kg,toneMapping:yr,canvas:void 0};class Rg extends wC{paused=!1;running=!1;force=!1;preRenderCallbacks=new Map;postRenderCallbacks=new Map;constructor(e=fs){super({antialias:e.antialias||fs.antialias,alpha:e.alpha||fs.alpha,preserveDrawingBuffer:!0,canvas:e.canvas}),this.setPixelRatio(window.devicePixelRatio),this.shadowMap.enabled=e.shadowMapEnabled||fs.shadowMapEnabled,this.shadowMap.type=e.shadowMapType||fs.shadowMapType,this.toneMapping=e.toneMapping||fs.toneMapping,this.debug.checkShaderErrors=!1}Dispose(){this.StopRenderer(),this.dispose()}StartRenderer(e,t){this.setAnimationLoop((n,r)=>{this.internal_render(e,t,n,r)}),this.running=!0}PauseRenderer(){this.paused=!0}ResumeRenderer(){this.paused=!1}StopRenderer(){this.setAnimationLoop(null),this.running=!1}OnResize(e,t){this.setSize(e,t)}AddPreRenderCallback(e){const t=ji.generateUUID();return this.preRenderCallbacks.set(t,e),t}RemovePreRenderCallback(e){return this.preRenderCallbacks.has(e)?(this.preRenderCallbacks.delete(e),!0):!1}AddPostRenderCallback(e){const t=ji.generateUUID();return this.postRenderCallbacks.set(t,e),t}RemovePostRenderCallback(e){return this.postRenderCallbacks.has(e)?(this.postRenderCallbacks.delete(e),!0):!1}ForceRendering(){this.force=!0}internal_render(e,t,n,r){(this.paused||!this.running)&&!this.force||(this.preRenderCallbacks.forEach(o=>{o(n,r)}),this.render(e,t),this.postRenderCallbacks.forEach(o=>{o(n,r)}),this.force=!1)}}const vP=1,aa=2,mf=4,z_=8,ti=16;class xP extends mt{isDIVELight=!0;isDIVEAmbientLight=!0;_light;constructor(){super(),this.name="DIVEAmbientLight",this._light=new iP(16777215,1),this._light.layers.mask=ti,this.add(this._light)}SetColor(e){this._light.color=e}SetIntensity(e){this._light.intensity=e}SetEnabled(e){this._light.visible=e}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];function yP(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wn[i&255]+wn[i>>8&255]+wn[i>>16&255]+wn[i>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[n&255]+wn[n>>8&255]+wn[n>>16&255]+wn[n>>24&255]).toLowerCase()}function ol(i,e){return i?e in i:!1}function gl(i,e){if(i)return ol(i,e)?i:gl(i.parent,e)}class SP{POINTER_DRAG_THRESHOLD=.001;name;_canvas;_scene;_controller;_pointer;get _pointerAnyDown(){return this._pointerPrimaryDown||this._pointerMiddleDown||this._pointerSecondaryDown}_pointerPrimaryDown;_pointerMiddleDown;_pointerSecondaryDown;_lastPointerDown;_lastPointerUp;_raycaster;_intersects;_hovered;_dragging;_dragStart;_dragCurrent;_dragEnd;_dragDelta;_draggable;_dragRaycastOnObjects;constructor(e,t){this.name="BaseTool",this._canvas=t.domElement,this._scene=e,this._controller=t,this._pointer=new Pe,this._pointerPrimaryDown=!1,this._pointerMiddleDown=!1,this._pointerSecondaryDown=!1,this._lastPointerDown=new Pe,this._lastPointerUp=new Pe,this._raycaster=new El,this._raycaster.layers.mask=ti|mf,this._intersects=[],this._hovered=null,this._dragging=!1,this._dragStart=new N,this._dragCurrent=new N,this._dragEnd=new N,this._dragDelta=new N,this._draggable=null,this._dragRaycastOnObjects=null}Activate(){}Deactivate(){}onPointerDown(e){switch(e.button){case 0:{this._pointerPrimaryDown=!0;break}case 1:{this._pointerMiddleDown=!0;break}case 2:{this._pointerSecondaryDown=!0;break}default:console.warn("DIVEBaseTool.onPointerDown: Unknown button: "+e.button)}this._lastPointerDown.copy(this._pointer),this._draggable=gl(this._intersects[0]?.object,"isDraggable")||null}onDragStart(e){this._draggable&&(this._dragRaycastOnObjects!==null&&(this._intersects=this._raycaster.intersectObjects(this._dragRaycastOnObjects,!0)),this._intersects.length!==0&&(this._dragStart.copy(this._intersects[0].point.clone()),this._dragCurrent.copy(this._intersects[0].point.clone()),this._dragEnd.copy(this._dragStart.clone()),this._dragDelta.set(0,0,0),this._draggable&&this._draggable.onDragStart&&(this._draggable.onDragStart({dragStart:this._dragStart,dragCurrent:this._dragCurrent,dragEnd:this._dragEnd,dragDelta:this._dragDelta}),this._dragging=!0,this._controller.enabled=!1)))}onPointerMove(e){this._pointer.x=e.offsetX/this._canvas.clientWidth*2-1,this._pointer.y=-(e.offsetY/this._canvas.clientHeight)*2+1,this._raycaster.setFromCamera(this._pointer,this._controller.object),this._intersects=this.raycast(this._scene.children);const t=gl(this._intersects[0]?.object,"isHoverable");if(this._intersects[0]&&t){if(!this._hovered){t.onPointerEnter&&t.onPointerEnter(this._intersects[0]),this._hovered=t;return}if(this._hovered.uuid!==t.uuid){this._hovered.onPointerLeave&&this._hovered.onPointerLeave(),t.onPointerEnter&&t.onPointerEnter(this._intersects[0]),this._hovered=t;return}t.onPointerOver&&t.onPointerOver(this._intersects[0]),this._hovered=t}else this._hovered&&this._hovered.onPointerLeave&&this._hovered.onPointerLeave(),this._hovered=null;this._pointerAnyDown&&(this._dragging||this.onDragStart(e),this.onDrag(e))}onDrag(e){this._dragRaycastOnObjects!==null&&(this._intersects=this._raycaster.intersectObjects(this._dragRaycastOnObjects,!0));const t=this._intersects[0];t&&(this._dragCurrent.copy(t.point.clone()),this._dragEnd.copy(t.point.clone()),this._dragDelta.subVectors(this._dragCurrent.clone(),this._dragStart.clone()),this._draggable&&this._draggable.onDrag&&this._draggable.onDrag({dragStart:this._dragStart,dragCurrent:this._dragCurrent,dragEnd:this._dragEnd,dragDelta:this._dragDelta}))}onPointerUp(e){switch(this.pointerWasDragged()||this._dragging?this._draggable&&this.onDragEnd(e):this.onClick(e),e.button){case 0:this._pointerPrimaryDown=!1;break;case 1:this._pointerMiddleDown=!1;break;case 2:this._pointerSecondaryDown=!1;break}this._lastPointerUp.copy(this._pointer)}onClick(e){}onDragEnd(e){const t=this._intersects[0];t&&(this._dragEnd.copy(t.point.clone()),this._dragCurrent.copy(t.point.clone()),this._dragDelta.subVectors(this._dragCurrent.clone(),this._dragStart.clone())),this._draggable&&this._draggable.onDragEnd&&this._draggable.onDragEnd({dragStart:this._dragStart,dragCurrent:this._dragCurrent,dragEnd:this._dragEnd,dragDelta:this._dragDelta}),this._draggable=null,this._dragging=!1,this._dragStart.set(0,0,0),this._dragCurrent.set(0,0,0),this._dragEnd.set(0,0,0),this._dragDelta.set(0,0,0),this._controller.enabled=!0}onWheel(e){}raycast(e){return e!==void 0?this._raycaster.intersectObjects(e,!0).filter(t=>t.object.visible):this._raycaster.intersectObjects(this._scene.children,!0).filter(t=>t.object.visible)}pointerWasDragged(){return this._lastPointerDown.distanceTo(this._pointer)>this.POINTER_DRAG_THRESHOLD}}const ls=new El,Rn=new N,Br=new N,Xt=new on,Cg={X:new N(1,0,0),Y:new N(0,1,0),Z:new N(0,0,1)},yh={type:"change"},Pg={type:"mouseDown"},Lg={type:"mouseUp",mode:null},Ig={type:"objectChange"};class MP extends mt{constructor(e,t){super(),t===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),t=document),this.isTransformControls=!0,this.visible=!1,this.domElement=t,this.domElement.style.touchAction="none";const n=new RP;this._gizmo=n,this.add(n);const r=new CP;this._plane=r,this.add(r);const o=this;function c(C,b){let L=b;Object.defineProperty(o,C,{get:function(){return L!==void 0?L:b},set:function(k){L!==k&&(L=k,r[C]=k,n[C]=k,o.dispatchEvent({type:C+"-changed",value:k}),o.dispatchEvent(yh))}}),o[C]=b,r[C]=b,n[C]=b}c("camera",e),c("object",void 0),c("enabled",!0),c("axis",null),c("mode","translate"),c("translationSnap",null),c("rotationSnap",null),c("scaleSnap",null),c("space","world"),c("size",1),c("dragging",!1),c("showX",!0),c("showY",!0),c("showZ",!0);const l=new N,h=new N,f=new on,d=new on,p=new N,m=new on,x=new N,M=new N,A=new N,v=0,_=new N;c("worldPosition",l),c("worldPositionStart",h),c("worldQuaternion",f),c("worldQuaternionStart",d),c("cameraPosition",p),c("cameraQuaternion",m),c("pointStart",x),c("pointEnd",M),c("rotationAxis",A),c("rotationAngle",v),c("eye",_),this._offset=new N,this._startNorm=new N,this._endNorm=new N,this._cameraScale=new N,this._parentPosition=new N,this._parentQuaternion=new on,this._parentQuaternionInv=new on,this._parentScale=new N,this._worldScaleStart=new N,this._worldQuaternionInv=new on,this._worldScale=new N,this._positionStart=new N,this._quaternionStart=new on,this._scaleStart=new N,this._getPointer=EP.bind(this),this._onPointerDown=TP.bind(this),this._onPointerHover=bP.bind(this),this._onPointerMove=AP.bind(this),this._onPointerUp=wP.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(e){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(e)}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&ls.setFromCamera(e,this.camera);const t=Sh(this._gizmo.picker[this.mode],ls);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&ls.setFromCamera(e,this.camera);const t=Sh(this._plane,ls,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,Pg.mode=this.mode,this.dispatchEvent(Pg)}}pointerMove(e){const t=this.axis,n=this.mode,r=this.object;let o=this.space;if(n==="scale"?o="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(o="world"),r===void 0||t===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&ls.setFromCamera(e,this.camera);const c=Sh(this._plane,ls,!0);if(c){if(this.pointEnd.copy(c.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),o==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),o==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(o==="local"&&(r.position.applyQuaternion(Xt.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),o==="world"&&(r.parent&&r.position.add(Rn.setFromMatrixPosition(r.parent.matrixWorld)),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(Rn.setFromMatrixPosition(r.parent.matrixWorld))));else if(n==="scale"){if(t.search("XYZ")!==-1){let l=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(l*=-1),Br.set(l,l,l)}else Rn.copy(this.pointStart),Br.copy(this.pointEnd),Rn.applyQuaternion(this._worldQuaternionInv),Br.applyQuaternion(this._worldQuaternionInv),Br.divide(Rn),t.search("X")===-1&&(Br.x=1),t.search("Y")===-1&&(Br.y=1),t.search("Z")===-1&&(Br.z=1);r.scale.copy(this._scaleStart).multiply(Br),this.scaleSnap&&(t.search("X")!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const l=20/this.worldPosition.distanceTo(Rn.setFromMatrixPosition(this.camera.matrixWorld));let h=!1;t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Rn.copy(this.rotationAxis).cross(this.eye))*l):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(Cg[t]),Rn.copy(Cg[t]),o==="local"&&Rn.applyQuaternion(this.worldQuaternion),Rn.cross(this.eye),Rn.length()===0?h=!0:this.rotationAngle=this._offset.dot(Rn.normalize())*l),(t==="E"||h)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),o==="local"&&t!=="E"&&t!=="XYZE"?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(Xt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(Xt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(yh),this.dispatchEvent(Ig)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(Lg.mode=this.mode,this.dispatchEvent(Lg)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}attach(e){return this.object=e,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(yh),this.dispatchEvent(Ig),this.pointStart.copy(this.pointEnd))}getRaycaster(){return ls}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function EP(i){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:i.button};{const e=this.domElement.getBoundingClientRect();return{x:(i.clientX-e.left)/e.width*2-1,y:-(i.clientY-e.top)/e.height*2+1,button:i.button}}}function bP(i){if(this.enabled)switch(i.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(i));break}}function TP(i){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(i)),this.pointerDown(this._getPointer(i)))}function AP(i){this.enabled&&this.pointerMove(this._getPointer(i))}function wP(i){this.enabled&&(this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(i)))}function Sh(i,e,t){const n=e.intersectObject(i,!0);for(let r=0;r<n.length;r++)if(n[r].object.visible||t)return n[r];return!1}const Jc=new Li,Ut=new N(0,1,0),Dg=new N(0,0,0),Og=new Qe,Qc=new on,al=new on,zi=new N,Ug=new Qe,da=new N(1,0,0),ds=new N(0,1,0),pa=new N(0,0,1),el=new N,ca=new N,la=new N;class RP extends mt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new Wi({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new wo({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;const r=t.clone();r.opacity=.5;const o=e.clone();o.color.setHex(16711680);const c=e.clone();c.color.setHex(65280);const l=e.clone();l.color.setHex(255);const h=e.clone();h.color.setHex(16711680),h.opacity=.5;const f=e.clone();f.color.setHex(65280),f.opacity=.5;const d=e.clone();d.color.setHex(255),d.opacity=.5;const p=e.clone();p.opacity=.25;const m=e.clone();m.color.setHex(16776960),m.opacity=.25,e.clone().color.setHex(16776960);const M=e.clone();M.color.setHex(7895160);const A=new gn(0,.04,.1,12);A.translate(0,.05,0);const v=new qt(.08,.08,.08);v.translate(0,.04,0);const _=new Jt;_.setAttribute("position",new Nt([0,0,0,1,0,0],3));const C=new gn(.0075,.0075,.5,3);C.translate(0,.25,0);function b(ne,se){const pe=new gs(ne,.0075,3,64,se*Math.PI*2);return pe.rotateY(Math.PI/2),pe.rotateX(Math.PI/2),pe}function L(){const ne=new Jt;return ne.setAttribute("position",new Nt([0,0,0,1,1,1],3)),ne}const k={X:[[new ye(A,o),[.5,0,0],[0,0,-Math.PI/2]],[new ye(A,o),[-.5,0,0],[0,0,Math.PI/2]],[new ye(C,o),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new ye(A,c),[0,.5,0]],[new ye(A,c),[0,-.5,0],[Math.PI,0,0]],[new ye(C,c)]],Z:[[new ye(A,l),[0,0,.5],[Math.PI/2,0,0]],[new ye(A,l),[0,0,-.5],[-Math.PI/2,0,0]],[new ye(C,l),null,[Math.PI/2,0,0]]],XYZ:[[new ye(new uo(.1,0),p.clone()),[0,0,0]]],XY:[[new ye(new qt(.15,.15,.01),d.clone()),[.15,.15,0]]],YZ:[[new ye(new qt(.15,.15,.01),h.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ye(new qt(.15,.15,.01),f.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},U={X:[[new ye(new gn(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new ye(new gn(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ye(new gn(.2,0,.6,4),n),[0,.3,0]],[new ye(new gn(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ye(new gn(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new ye(new gn(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new ye(new uo(.2,0),n)]],XY:[[new ye(new qt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new ye(new qt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ye(new qt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},O={START:[[new ye(new uo(.01,2),r),null,null,null,"helper"]],END:[[new ye(new uo(.01,2),r),null,null,null,"helper"]],DELTA:[[new di(L(),r),null,null,null,"helper"]],X:[[new di(_,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new di(_,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new di(_,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},I={XYZE:[[new ye(b(.5,1),M),null,[0,Math.PI/2,0]]],X:[[new ye(b(.5,.5),o)]],Y:[[new ye(b(.5,.5),c),null,[0,0,-Math.PI/2]]],Z:[[new ye(b(.5,.5),l),null,[0,Math.PI/2,0]]],E:[[new ye(b(.75,1),m),null,[0,Math.PI/2,0]]]},E={AXIS:[[new di(_,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},y={XYZE:[[new ye(new Pa(.25,10,8),n)]],X:[[new ye(new gs(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new ye(new gs(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new ye(new gs(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new ye(new gs(.75,.1,2,24),n)]]},F={X:[[new ye(v,o),[.5,0,0],[0,0,-Math.PI/2]],[new ye(C,o),[0,0,0],[0,0,-Math.PI/2]],[new ye(v,o),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new ye(v,c),[0,.5,0]],[new ye(C,c)],[new ye(v,c),[0,-.5,0],[0,0,Math.PI]]],Z:[[new ye(v,l),[0,0,.5],[Math.PI/2,0,0]],[new ye(C,l),[0,0,0],[Math.PI/2,0,0]],[new ye(v,l),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new ye(new qt(.15,.15,.01),d),[.15,.15,0]]],YZ:[[new ye(new qt(.15,.15,.01),h),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ye(new qt(.15,.15,.01),f),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ye(new qt(.1,.1,.1),p.clone())]]},V={X:[[new ye(new gn(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new ye(new gn(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ye(new gn(.2,0,.6,4),n),[0,.3,0]],[new ye(new gn(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ye(new gn(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new ye(new gn(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new ye(new qt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new ye(new qt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ye(new qt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ye(new qt(.2,.2,.2),n),[0,0,0]]]},G={X:[[new di(_,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new di(_,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new di(_,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function q(ne){const se=new mt;for(const pe in ne)for(let K=ne[pe].length;K--;){const he=ne[pe][K][0].clone(),me=ne[pe][K][1],Me=ne[pe][K][2],Ke=ne[pe][K][3],ot=ne[pe][K][4];he.name=pe,he.tag=ot,me&&he.position.set(me[0],me[1],me[2]),Me&&he.rotation.set(Me[0],Me[1],Me[2]),Ke&&he.scale.set(Ke[0],Ke[1],Ke[2]),he.updateMatrix();const ie=he.geometry.clone();ie.applyMatrix4(he.matrix),he.geometry=ie,he.renderOrder=1/0,he.position.set(0,0,0),he.rotation.set(0,0,0),he.scale.set(1,1,1),se.add(he)}return se}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=q(k)),this.add(this.gizmo.rotate=q(I)),this.add(this.gizmo.scale=q(F)),this.add(this.picker.translate=q(U)),this.add(this.picker.rotate=q(y)),this.add(this.picker.scale=q(V)),this.add(this.helper.translate=q(O)),this.add(this.helper.rotate=q(E)),this.add(this.helper.scale=q(G)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:al;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let r=[];r=r.concat(this.picker[this.mode].children),r=r.concat(this.gizmo[this.mode].children),r=r.concat(this.helper[this.mode].children);for(let o=0;o<r.length;o++){const c=r[o];c.visible=!0,c.rotation.set(0,0,0),c.position.copy(this.worldPosition);let l;if(this.camera.isOrthographicCamera?l=(this.camera.top-this.camera.bottom)/this.camera.zoom:l=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),c.scale.set(1,1,1).multiplyScalar(l*this.size/4),c.tag==="helper"){c.visible=!1,c.name==="AXIS"?(c.visible=!!this.axis,this.axis==="X"&&(Xt.setFromEuler(Jc.set(0,0,0)),c.quaternion.copy(n).multiply(Xt),Math.abs(Ut.copy(da).applyQuaternion(n).dot(this.eye))>.9&&(c.visible=!1)),this.axis==="Y"&&(Xt.setFromEuler(Jc.set(0,0,Math.PI/2)),c.quaternion.copy(n).multiply(Xt),Math.abs(Ut.copy(ds).applyQuaternion(n).dot(this.eye))>.9&&(c.visible=!1)),this.axis==="Z"&&(Xt.setFromEuler(Jc.set(0,Math.PI/2,0)),c.quaternion.copy(n).multiply(Xt),Math.abs(Ut.copy(pa).applyQuaternion(n).dot(this.eye))>.9&&(c.visible=!1)),this.axis==="XYZE"&&(Xt.setFromEuler(Jc.set(0,Math.PI/2,0)),Ut.copy(this.rotationAxis),c.quaternion.setFromRotationMatrix(Og.lookAt(Dg,Ut,ds)),c.quaternion.multiply(Xt),c.visible=this.dragging),this.axis==="E"&&(c.visible=!1)):c.name==="START"?(c.position.copy(this.worldPositionStart),c.visible=this.dragging):c.name==="END"?(c.position.copy(this.worldPosition),c.visible=this.dragging):c.name==="DELTA"?(c.position.copy(this.worldPositionStart),c.quaternion.copy(this.worldQuaternionStart),Rn.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Rn.applyQuaternion(this.worldQuaternionStart.clone().invert()),c.scale.copy(Rn),c.visible=this.dragging):(c.quaternion.copy(n),this.dragging?c.position.copy(this.worldPositionStart):c.position.copy(this.worldPosition),this.axis&&(c.visible=this.axis.search(c.name)!==-1));continue}c.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(c.name==="X"&&Math.abs(Ut.copy(da).applyQuaternion(n).dot(this.eye))>.99&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="Y"&&Math.abs(Ut.copy(ds).applyQuaternion(n).dot(this.eye))>.99&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="Z"&&Math.abs(Ut.copy(pa).applyQuaternion(n).dot(this.eye))>.99&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="XY"&&Math.abs(Ut.copy(pa).applyQuaternion(n).dot(this.eye))<.2&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="YZ"&&Math.abs(Ut.copy(da).applyQuaternion(n).dot(this.eye))<.2&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="XZ"&&Math.abs(Ut.copy(ds).applyQuaternion(n).dot(this.eye))<.2&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1)):this.mode==="rotate"&&(Qc.copy(n),Ut.copy(this.eye).applyQuaternion(Xt.copy(n).invert()),c.name.search("E")!==-1&&c.quaternion.setFromRotationMatrix(Og.lookAt(this.eye,Dg,ds)),c.name==="X"&&(Xt.setFromAxisAngle(da,Math.atan2(-Ut.y,Ut.z)),Xt.multiplyQuaternions(Qc,Xt),c.quaternion.copy(Xt)),c.name==="Y"&&(Xt.setFromAxisAngle(ds,Math.atan2(Ut.x,Ut.z)),Xt.multiplyQuaternions(Qc,Xt),c.quaternion.copy(Xt)),c.name==="Z"&&(Xt.setFromAxisAngle(pa,Math.atan2(Ut.y,Ut.x)),Xt.multiplyQuaternions(Qc,Xt),c.quaternion.copy(Xt))),c.visible=c.visible&&(c.name.indexOf("X")===-1||this.showX),c.visible=c.visible&&(c.name.indexOf("Y")===-1||this.showY),c.visible=c.visible&&(c.name.indexOf("Z")===-1||this.showZ),c.visible=c.visible&&(c.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),c.material._color=c.material._color||c.material.color.clone(),c.material._opacity=c.material._opacity||c.material.opacity,c.material.color.copy(c.material._color),c.material.opacity=c.material._opacity,this.enabled&&this.axis&&(c.name===this.axis||this.axis.split("").some(function(h){return c.name===h}))&&(c.material.color.setHex(16776960),c.material.opacity=1)}super.updateMatrixWorld(e)}}class CP extends ye{constructor(){super(new Ss(1e5,1e5,2,2),new Wi({visible:!1,wireframe:!0,side:Ai,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),el.copy(da).applyQuaternion(t==="local"?this.worldQuaternion:al),ca.copy(ds).applyQuaternion(t==="local"?this.worldQuaternion:al),la.copy(pa).applyQuaternion(t==="local"?this.worldQuaternion:al),Ut.copy(ca),this.mode){case"translate":case"scale":switch(this.axis){case"X":Ut.copy(this.eye).cross(el),zi.copy(el).cross(Ut);break;case"Y":Ut.copy(this.eye).cross(ca),zi.copy(ca).cross(Ut);break;case"Z":Ut.copy(this.eye).cross(la),zi.copy(la).cross(Ut);break;case"XY":zi.copy(la);break;case"YZ":zi.copy(el);break;case"XZ":Ut.copy(la),zi.copy(ca);break;case"XYZ":case"E":zi.set(0,0,0);break}break;case"rotate":default:zi.set(0,0,0)}zi.length()===0?this.quaternion.copy(this.cameraQuaternion):(Ug.lookAt(Rn.set(0,0,0),zi,Ut),this.quaternion.setFromRotationMatrix(Ug)),super.updateMatrixWorld(e)}}const k_="#c20017",H_="#00ab26",G_="#0081d4",Hh=k_,Gh=H_,Vh=G_;class PP extends SP{isTransformTool=!0;_scaleLinked;_gizmo;constructor(e,t){super(e,t),this.name="DIVETransformTool",this._scaleLinked=!1,this._gizmo=this.initGizmo(),this._scene.add(this._gizmo)}Activate(){}SetGizmoMode(e){this._gizmo.mode=e}SetGizmoVisibility(e){const t=this._scene.children.includes(this._gizmo);e&&!t?(this._scene.add(this._gizmo),"isTransformControls"in this._gizmo&&this._gizmo.getRaycaster().layers.enableAll()):!e&&t&&(this._scene.remove(this._gizmo),"isTransformControls"in this._gizmo&&this._gizmo.getRaycaster().layers.disableAll())}SetGizmoScaleLinked(e){this._scaleLinked=e}initGizmo(){const e=new MP(this._controller.object,this._controller.domElement);return e.mode="translate",e.traverse(t=>{if(!("isMesh"in t))return;const n=t.material;t.name==="X"&&n.color.set(Hh),t.name==="Y"&&n.color.set(Gh),t.name==="Z"&&n.color.set(Vh),t.name==="XY"&&n.color.set(Vh),t.name==="YZ"&&n.color.set(Hh),t.name==="XZ"&&n.color.set(Gh)}),e.addEventListener("mouseDown",()=>{this._controller.enabled=!1,ol(e.object,"isMovable")&&e.object.onMoveStart&&e.object.onMoveStart()}),e.addEventListener("objectChange",()=>{if(ol(e.object,"isMovable")&&e.object.onMove&&(e.object.onMove(),this._scaleLinked)){const t=e.object.scale,n=(t.x+t.y+t.z)/3;e.object.scale.set(n,n,n)}}),e.addEventListener("mouseUp",()=>{this._controller.enabled=!0,ol(e.object,"isMovable")&&e.object.onMoveEnd&&e.object.onMoveEnd()}),e}}const Ng=i=>i.isSelectTool!==void 0;class LP extends PP{isSelectTool=!0;constructor(e,t){super(e,t),this.name="SelectTool"}Activate(){}Select(e){this.AttachGizmo(e),e.onSelect&&e.onSelect()}Deselect(e){this.DetachGizmo(),e.onDeselect&&e.onDeselect()}AttachGizmo(e){if("isMovable"in e){const t=e;this._gizmo.attach(t),this.SetGizmoVisibility(t.visible)}}DetachGizmo(){this._gizmo.detach()}onClick(e){super.onClick(e);const t=this._raycaster.intersectObjects(this._scene.Root.children,!0).filter(r=>r.object.visible)[0],n=gl(t?.object,"isSelectable");if(!t||!n){this._gizmo.object&&this.Deselect(this._gizmo.object);return}if(this._gizmo.object){if(this._gizmo.object.uuid===n.uuid)return;this.Deselect(this._gizmo.object)}this.Select(n)}}var tl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ma={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */var IP=ma.exports,Fg;function DP(){return Fg||(Fg=1,function(i,e){(function(){var t,n="4.17.21",r=200,o="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",c="Expected a function",l="Invalid `variable` option passed into `_.template`",h="__lodash_hash_undefined__",f=500,d="__lodash_placeholder__",p=1,m=2,x=4,M=1,A=2,v=1,_=2,C=4,b=8,L=16,k=32,U=64,O=128,I=256,E=512,y=30,F="...",V=800,G=16,q=1,ne=2,se=3,pe=1/0,K=9007199254740991,he=17976931348623157e292,me=NaN,Me=4294967295,Ke=Me-1,ot=Me>>>1,ie=[["ary",O],["bind",v],["bindKey",_],["curry",b],["curryRight",L],["flip",E],["partial",k],["partialRight",U],["rearg",I]],ge="[object Arguments]",we="[object Array]",Se="[object AsyncFunction]",Ge="[object Boolean]",Xe="[object Date]",at="[object DOMException]",j="[object Error]",$e="[object Function]",ze="[object GeneratorFunction]",bt="[object Map]",He="[object Number]",Tt="[object Null]",B="[object Object]",w="[object Promise]",te="[object Proxy]",ae="[object RegExp]",ue="[object Set]",de="[object String]",Be="[object Symbol]",_e="[object Undefined]",De="[object WeakMap]",Ve="[object WeakSet]",ve="[object ArrayBuffer]",Te="[object DataView]",qe="[object Float32Array]",Le="[object Float64Array]",Ie="[object Int8Array]",ct="[object Int16Array]",ft="[object Int32Array]",St="[object Uint8Array]",gt="[object Uint8ClampedArray]",Mt="[object Uint16Array]",Ue="[object Uint32Array]",S=/\b__p \+= '';/g,Z=/\b(__p \+=) '' \+/g,oe=/(__e\(.*?\)|\b__t\)) \+\n'';/g,xe=/&(?:amp|lt|gt|quot|#39);/g,Re=/[&<>"']/g,_t=RegExp(xe.source),dt=RegExp(Re.source),Ft=/<%-([\s\S]+?)%>/g,rn=/<%([\s\S]+?)%>/g,At=/<%=([\s\S]+?)%>/g,Kt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Zt=/^\w*$/,Pn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Sn=/[\\^$.*+?()[\]{}|]/g,Di=RegExp(Sn.source),Oi=/^\s+/,Qi=/\s/,Da=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Es=/\{\n\/\* \[wrapped with (.+)\] \*/,Oa=/,? & /,Ua=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,Tl=/[()=,{}\[\]\/\s]/,Al=/\\(\\)?/g,wl=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,D=/\w*$/,Y=/^[-+]0x[0-9a-f]+$/i,Q=/^0b[01]+$/i,ee=/^\[object .+?Constructor\]$/,$=/^0o[0-7]+$/i,Ae=/^(?:0|[1-9]\d*)$/,Fe=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,ke=/($^)/,Ze=/['\n\r\u2028\u2029\\]/g,Je="\\ud800-\\udfff",et="\\u0300-\\u036f",nt="\\ufe20-\\ufe2f",Yt="\\u20d0-\\u20ff",Mn=et+nt+Yt,Qt="\\u2700-\\u27bf",ni="a-z\\xdf-\\xf6\\xf8-\\xff",kt="\\xac\\xb1\\xd7\\xf7",rt="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",Io="\\u2000-\\u206f",Bt=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",Ui="A-Z\\xc0-\\xd6\\xd8-\\xde",Do="\\ufe0e\\ufe0f",Sr=kt+rt+Io+Bt,jr="['’]",dn="["+Je+"]",gi="["+Sr+"]",Mr="["+Mn+"]",Ln="\\d+",Oo="["+Qt+"]",Na="["+ni+"]",Uo="[^"+Je+Sr+Ln+Qt+ni+Ui+"]",Rl="\\ud83c[\\udffb-\\udfff]",n0="(?:"+Mr+"|"+Rl+")",yf="[^"+Je+"]",Cl="(?:\\ud83c[\\udde6-\\uddff]){2}",Pl="[\\ud800-\\udbff][\\udc00-\\udfff]",bs="["+Ui+"]",Sf="\\u200d",Mf="(?:"+Na+"|"+Uo+")",i0="(?:"+bs+"|"+Uo+")",Ef="(?:"+jr+"(?:d|ll|m|re|s|t|ve))?",bf="(?:"+jr+"(?:D|LL|M|RE|S|T|VE))?",Tf=n0+"?",Af="["+Do+"]?",r0="(?:"+Sf+"(?:"+[yf,Cl,Pl].join("|")+")"+Af+Tf+")*",s0="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",o0="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",wf=Af+Tf+r0,a0="(?:"+[Oo,Cl,Pl].join("|")+")"+wf,c0="(?:"+[yf+Mr+"?",Mr,Cl,Pl,dn].join("|")+")",l0=RegExp(jr,"g"),u0=RegExp(Mr,"g"),Ll=RegExp(Rl+"(?="+Rl+")|"+c0+wf,"g"),h0=RegExp([bs+"?"+Na+"+"+Ef+"(?="+[gi,bs,"$"].join("|")+")",i0+"+"+bf+"(?="+[gi,bs+Mf,"$"].join("|")+")",bs+"?"+Mf+"+"+Ef,bs+"+"+bf,o0,s0,Ln,a0].join("|"),"g"),f0=RegExp("["+Sf+Je+Mn+Do+"]"),d0=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,p0=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],m0=-1,Ht={};Ht[qe]=Ht[Le]=Ht[Ie]=Ht[ct]=Ht[ft]=Ht[St]=Ht[gt]=Ht[Mt]=Ht[Ue]=!0,Ht[ge]=Ht[we]=Ht[ve]=Ht[Ge]=Ht[Te]=Ht[Xe]=Ht[j]=Ht[$e]=Ht[bt]=Ht[He]=Ht[B]=Ht[ae]=Ht[ue]=Ht[de]=Ht[De]=!1;var zt={};zt[ge]=zt[we]=zt[ve]=zt[Te]=zt[Ge]=zt[Xe]=zt[qe]=zt[Le]=zt[Ie]=zt[ct]=zt[ft]=zt[bt]=zt[He]=zt[B]=zt[ae]=zt[ue]=zt[de]=zt[Be]=zt[St]=zt[gt]=zt[Mt]=zt[Ue]=!0,zt[j]=zt[$e]=zt[De]=!1;var g0={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},_0={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},v0={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},x0={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},y0=parseFloat,S0=parseInt,Rf=typeof tl=="object"&&tl&&tl.Object===Object&&tl,M0=typeof self=="object"&&self&&self.Object===Object&&self,_n=Rf||M0||Function("return this")(),Il=e&&!e.nodeType&&e,qr=Il&&!0&&i&&!i.nodeType&&i,Cf=qr&&qr.exports===Il,Dl=Cf&&Rf.process,ii=function(){try{var W=qr&&qr.require&&qr.require("util").types;return W||Dl&&Dl.binding&&Dl.binding("util")}catch{}}(),Pf=ii&&ii.isArrayBuffer,Lf=ii&&ii.isDate,If=ii&&ii.isMap,Df=ii&&ii.isRegExp,Of=ii&&ii.isSet,Uf=ii&&ii.isTypedArray;function Yn(W,re,J){switch(J.length){case 0:return W.call(re);case 1:return W.call(re,J[0]);case 2:return W.call(re,J[0],J[1]);case 3:return W.call(re,J[0],J[1],J[2])}return W.apply(re,J)}function E0(W,re,J,Ce){for(var tt=-1,wt=W==null?0:W.length;++tt<wt;){var an=W[tt];re(Ce,an,J(an),W)}return Ce}function ri(W,re){for(var J=-1,Ce=W==null?0:W.length;++J<Ce&&re(W[J],J,W)!==!1;);return W}function b0(W,re){for(var J=W==null?0:W.length;J--&&re(W[J],J,W)!==!1;);return W}function Nf(W,re){for(var J=-1,Ce=W==null?0:W.length;++J<Ce;)if(!re(W[J],J,W))return!1;return!0}function Er(W,re){for(var J=-1,Ce=W==null?0:W.length,tt=0,wt=[];++J<Ce;){var an=W[J];re(an,J,W)&&(wt[tt++]=an)}return wt}function Fa(W,re){var J=W==null?0:W.length;return!!J&&Ts(W,re,0)>-1}function Ol(W,re,J){for(var Ce=-1,tt=W==null?0:W.length;++Ce<tt;)if(J(re,W[Ce]))return!0;return!1}function Wt(W,re){for(var J=-1,Ce=W==null?0:W.length,tt=Array(Ce);++J<Ce;)tt[J]=re(W[J],J,W);return tt}function br(W,re){for(var J=-1,Ce=re.length,tt=W.length;++J<Ce;)W[tt+J]=re[J];return W}function Ul(W,re,J,Ce){var tt=-1,wt=W==null?0:W.length;for(Ce&&wt&&(J=W[++tt]);++tt<wt;)J=re(J,W[tt],tt,W);return J}function T0(W,re,J,Ce){var tt=W==null?0:W.length;for(Ce&&tt&&(J=W[--tt]);tt--;)J=re(J,W[tt],tt,W);return J}function Nl(W,re){for(var J=-1,Ce=W==null?0:W.length;++J<Ce;)if(re(W[J],J,W))return!0;return!1}var A0=Fl("length");function w0(W){return W.split("")}function R0(W){return W.match(Ua)||[]}function Ff(W,re,J){var Ce;return J(W,function(tt,wt,an){if(re(tt,wt,an))return Ce=wt,!1}),Ce}function Ba(W,re,J,Ce){for(var tt=W.length,wt=J+(Ce?1:-1);Ce?wt--:++wt<tt;)if(re(W[wt],wt,W))return wt;return-1}function Ts(W,re,J){return re===re?k0(W,re,J):Ba(W,Bf,J)}function C0(W,re,J,Ce){for(var tt=J-1,wt=W.length;++tt<wt;)if(Ce(W[tt],re))return tt;return-1}function Bf(W){return W!==W}function zf(W,re){var J=W==null?0:W.length;return J?zl(W,re)/J:me}function Fl(W){return function(re){return re==null?t:re[W]}}function Bl(W){return function(re){return W==null?t:W[re]}}function kf(W,re,J,Ce,tt){return tt(W,function(wt,an,Ot){J=Ce?(Ce=!1,wt):re(J,wt,an,Ot)}),J}function P0(W,re){var J=W.length;for(W.sort(re);J--;)W[J]=W[J].value;return W}function zl(W,re){for(var J,Ce=-1,tt=W.length;++Ce<tt;){var wt=re(W[Ce]);wt!==t&&(J=J===t?wt:J+wt)}return J}function kl(W,re){for(var J=-1,Ce=Array(W);++J<W;)Ce[J]=re(J);return Ce}function L0(W,re){return Wt(re,function(J){return[J,W[J]]})}function Hf(W){return W&&W.slice(0,Xf(W)+1).replace(Oi,"")}function jn(W){return function(re){return W(re)}}function Hl(W,re){return Wt(re,function(J){return W[J]})}function No(W,re){return W.has(re)}function Gf(W,re){for(var J=-1,Ce=W.length;++J<Ce&&Ts(re,W[J],0)>-1;);return J}function Vf(W,re){for(var J=W.length;J--&&Ts(re,W[J],0)>-1;);return J}function I0(W,re){for(var J=W.length,Ce=0;J--;)W[J]===re&&++Ce;return Ce}var D0=Bl(g0),O0=Bl(_0);function U0(W){return"\\"+x0[W]}function N0(W,re){return W==null?t:W[re]}function As(W){return f0.test(W)}function F0(W){return d0.test(W)}function B0(W){for(var re,J=[];!(re=W.next()).done;)J.push(re.value);return J}function Gl(W){var re=-1,J=Array(W.size);return W.forEach(function(Ce,tt){J[++re]=[tt,Ce]}),J}function Wf(W,re){return function(J){return W(re(J))}}function Tr(W,re){for(var J=-1,Ce=W.length,tt=0,wt=[];++J<Ce;){var an=W[J];(an===re||an===d)&&(W[J]=d,wt[tt++]=J)}return wt}function za(W){var re=-1,J=Array(W.size);return W.forEach(function(Ce){J[++re]=Ce}),J}function z0(W){var re=-1,J=Array(W.size);return W.forEach(function(Ce){J[++re]=[Ce,Ce]}),J}function k0(W,re,J){for(var Ce=J-1,tt=W.length;++Ce<tt;)if(W[Ce]===re)return Ce;return-1}function H0(W,re,J){for(var Ce=J+1;Ce--;)if(W[Ce]===re)return Ce;return Ce}function ws(W){return As(W)?V0(W):A0(W)}function _i(W){return As(W)?W0(W):w0(W)}function Xf(W){for(var re=W.length;re--&&Qi.test(W.charAt(re)););return re}var G0=Bl(v0);function V0(W){for(var re=Ll.lastIndex=0;Ll.test(W);)++re;return re}function W0(W){return W.match(Ll)||[]}function X0(W){return W.match(h0)||[]}var Y0=function W(re){re=re==null?_n:Rs.defaults(_n.Object(),re,Rs.pick(_n,p0));var J=re.Array,Ce=re.Date,tt=re.Error,wt=re.Function,an=re.Math,Ot=re.Object,Vl=re.RegExp,j0=re.String,si=re.TypeError,ka=J.prototype,q0=wt.prototype,Cs=Ot.prototype,Ha=re["__core-js_shared__"],Ga=q0.toString,Pt=Cs.hasOwnProperty,K0=0,Yf=function(){var s=/[^.]+$/.exec(Ha&&Ha.keys&&Ha.keys.IE_PROTO||"");return s?"Symbol(src)_1."+s:""}(),Va=Cs.toString,Z0=Ga.call(Ot),$0=_n._,J0=Vl("^"+Ga.call(Pt).replace(Sn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Wa=Cf?re.Buffer:t,Ar=re.Symbol,Xa=re.Uint8Array,jf=Wa?Wa.allocUnsafe:t,Ya=Wf(Ot.getPrototypeOf,Ot),qf=Ot.create,Kf=Cs.propertyIsEnumerable,ja=ka.splice,Zf=Ar?Ar.isConcatSpreadable:t,Fo=Ar?Ar.iterator:t,Kr=Ar?Ar.toStringTag:t,qa=function(){try{var s=es(Ot,"defineProperty");return s({},"",{}),s}catch{}}(),Q0=re.clearTimeout!==_n.clearTimeout&&re.clearTimeout,ev=Ce&&Ce.now!==_n.Date.now&&Ce.now,tv=re.setTimeout!==_n.setTimeout&&re.setTimeout,Ka=an.ceil,Za=an.floor,Wl=Ot.getOwnPropertySymbols,nv=Wa?Wa.isBuffer:t,$f=re.isFinite,iv=ka.join,rv=Wf(Ot.keys,Ot),cn=an.max,En=an.min,sv=Ce.now,ov=re.parseInt,Jf=an.random,av=ka.reverse,Xl=es(re,"DataView"),Bo=es(re,"Map"),Yl=es(re,"Promise"),Ps=es(re,"Set"),zo=es(re,"WeakMap"),ko=es(Ot,"create"),$a=zo&&new zo,Ls={},cv=ts(Xl),lv=ts(Bo),uv=ts(Yl),hv=ts(Ps),fv=ts(zo),Ja=Ar?Ar.prototype:t,Ho=Ja?Ja.valueOf:t,Qf=Ja?Ja.toString:t;function R(s){if($t(s)&&!it(s)&&!(s instanceof xt)){if(s instanceof oi)return s;if(Pt.call(s,"__wrapped__"))return ep(s)}return new oi(s)}var Is=function(){function s(){}return function(a){if(!jt(a))return{};if(qf)return qf(a);s.prototype=a;var u=new s;return s.prototype=t,u}}();function Qa(){}function oi(s,a){this.__wrapped__=s,this.__actions__=[],this.__chain__=!!a,this.__index__=0,this.__values__=t}R.templateSettings={escape:Ft,evaluate:rn,interpolate:At,variable:"",imports:{_:R}},R.prototype=Qa.prototype,R.prototype.constructor=R,oi.prototype=Is(Qa.prototype),oi.prototype.constructor=oi;function xt(s){this.__wrapped__=s,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Me,this.__views__=[]}function dv(){var s=new xt(this.__wrapped__);return s.__actions__=kn(this.__actions__),s.__dir__=this.__dir__,s.__filtered__=this.__filtered__,s.__iteratees__=kn(this.__iteratees__),s.__takeCount__=this.__takeCount__,s.__views__=kn(this.__views__),s}function pv(){if(this.__filtered__){var s=new xt(this);s.__dir__=-1,s.__filtered__=!0}else s=this.clone(),s.__dir__*=-1;return s}function mv(){var s=this.__wrapped__.value(),a=this.__dir__,u=it(s),g=a<0,T=u?s.length:0,P=wx(0,T,this.__views__),z=P.start,H=P.end,X=H-z,ce=g?H:z-1,le=this.__iteratees__,fe=le.length,Ee=0,Oe=En(X,this.__takeCount__);if(!u||!g&&T==X&&Oe==X)return Ed(s,this.__actions__);var Ye=[];e:for(;X--&&Ee<Oe;){ce+=a;for(var lt=-1,je=s[ce];++lt<fe;){var vt=le[lt],Et=vt.iteratee,Zn=vt.type,On=Et(je);if(Zn==ne)je=On;else if(!On){if(Zn==q)continue e;break e}}Ye[Ee++]=je}return Ye}xt.prototype=Is(Qa.prototype),xt.prototype.constructor=xt;function Zr(s){var a=-1,u=s==null?0:s.length;for(this.clear();++a<u;){var g=s[a];this.set(g[0],g[1])}}function gv(){this.__data__=ko?ko(null):{},this.size=0}function _v(s){var a=this.has(s)&&delete this.__data__[s];return this.size-=a?1:0,a}function vv(s){var a=this.__data__;if(ko){var u=a[s];return u===h?t:u}return Pt.call(a,s)?a[s]:t}function xv(s){var a=this.__data__;return ko?a[s]!==t:Pt.call(a,s)}function yv(s,a){var u=this.__data__;return this.size+=this.has(s)?0:1,u[s]=ko&&a===t?h:a,this}Zr.prototype.clear=gv,Zr.prototype.delete=_v,Zr.prototype.get=vv,Zr.prototype.has=xv,Zr.prototype.set=yv;function er(s){var a=-1,u=s==null?0:s.length;for(this.clear();++a<u;){var g=s[a];this.set(g[0],g[1])}}function Sv(){this.__data__=[],this.size=0}function Mv(s){var a=this.__data__,u=ec(a,s);if(u<0)return!1;var g=a.length-1;return u==g?a.pop():ja.call(a,u,1),--this.size,!0}function Ev(s){var a=this.__data__,u=ec(a,s);return u<0?t:a[u][1]}function bv(s){return ec(this.__data__,s)>-1}function Tv(s,a){var u=this.__data__,g=ec(u,s);return g<0?(++this.size,u.push([s,a])):u[g][1]=a,this}er.prototype.clear=Sv,er.prototype.delete=Mv,er.prototype.get=Ev,er.prototype.has=bv,er.prototype.set=Tv;function tr(s){var a=-1,u=s==null?0:s.length;for(this.clear();++a<u;){var g=s[a];this.set(g[0],g[1])}}function Av(){this.size=0,this.__data__={hash:new Zr,map:new(Bo||er),string:new Zr}}function wv(s){var a=fc(this,s).delete(s);return this.size-=a?1:0,a}function Rv(s){return fc(this,s).get(s)}function Cv(s){return fc(this,s).has(s)}function Pv(s,a){var u=fc(this,s),g=u.size;return u.set(s,a),this.size+=u.size==g?0:1,this}tr.prototype.clear=Av,tr.prototype.delete=wv,tr.prototype.get=Rv,tr.prototype.has=Cv,tr.prototype.set=Pv;function $r(s){var a=-1,u=s==null?0:s.length;for(this.__data__=new tr;++a<u;)this.add(s[a])}function Lv(s){return this.__data__.set(s,h),this}function Iv(s){return this.__data__.has(s)}$r.prototype.add=$r.prototype.push=Lv,$r.prototype.has=Iv;function vi(s){var a=this.__data__=new er(s);this.size=a.size}function Dv(){this.__data__=new er,this.size=0}function Ov(s){var a=this.__data__,u=a.delete(s);return this.size=a.size,u}function Uv(s){return this.__data__.get(s)}function Nv(s){return this.__data__.has(s)}function Fv(s,a){var u=this.__data__;if(u instanceof er){var g=u.__data__;if(!Bo||g.length<r-1)return g.push([s,a]),this.size=++u.size,this;u=this.__data__=new tr(g)}return u.set(s,a),this.size=u.size,this}vi.prototype.clear=Dv,vi.prototype.delete=Ov,vi.prototype.get=Uv,vi.prototype.has=Nv,vi.prototype.set=Fv;function ed(s,a){var u=it(s),g=!u&&ns(s),T=!u&&!g&&Lr(s),P=!u&&!g&&!T&&Ns(s),z=u||g||T||P,H=z?kl(s.length,j0):[],X=H.length;for(var ce in s)(a||Pt.call(s,ce))&&!(z&&(ce=="length"||T&&(ce=="offset"||ce=="parent")||P&&(ce=="buffer"||ce=="byteLength"||ce=="byteOffset")||sr(ce,X)))&&H.push(ce);return H}function td(s){var a=s.length;return a?s[iu(0,a-1)]:t}function Bv(s,a){return dc(kn(s),Jr(a,0,s.length))}function zv(s){return dc(kn(s))}function jl(s,a,u){(u!==t&&!xi(s[a],u)||u===t&&!(a in s))&&nr(s,a,u)}function Go(s,a,u){var g=s[a];(!(Pt.call(s,a)&&xi(g,u))||u===t&&!(a in s))&&nr(s,a,u)}function ec(s,a){for(var u=s.length;u--;)if(xi(s[u][0],a))return u;return-1}function kv(s,a,u,g){return wr(s,function(T,P,z){a(g,T,u(T),z)}),g}function nd(s,a){return s&&Fi(a,pn(a),s)}function Hv(s,a){return s&&Fi(a,Gn(a),s)}function nr(s,a,u){a=="__proto__"&&qa?qa(s,a,{configurable:!0,enumerable:!0,value:u,writable:!0}):s[a]=u}function ql(s,a){for(var u=-1,g=a.length,T=J(g),P=s==null;++u<g;)T[u]=P?t:Ru(s,a[u]);return T}function Jr(s,a,u){return s===s&&(u!==t&&(s=s<=u?s:u),a!==t&&(s=s>=a?s:a)),s}function ai(s,a,u,g,T,P){var z,H=a&p,X=a&m,ce=a&x;if(u&&(z=T?u(s,g,T,P):u(s)),z!==t)return z;if(!jt(s))return s;var le=it(s);if(le){if(z=Cx(s),!H)return kn(s,z)}else{var fe=bn(s),Ee=fe==$e||fe==ze;if(Lr(s))return Ad(s,H);if(fe==B||fe==ge||Ee&&!T){if(z=X||Ee?{}:Xd(s),!H)return X?vx(s,Hv(z,s)):_x(s,nd(z,s))}else{if(!zt[fe])return T?s:{};z=Px(s,fe,H)}}P||(P=new vi);var Oe=P.get(s);if(Oe)return Oe;P.set(s,z),yp(s)?s.forEach(function(je){z.add(ai(je,a,u,je,s,P))}):vp(s)&&s.forEach(function(je,vt){z.set(vt,ai(je,a,u,vt,s,P))});var Ye=ce?X?pu:du:X?Gn:pn,lt=le?t:Ye(s);return ri(lt||s,function(je,vt){lt&&(vt=je,je=s[vt]),Go(z,vt,ai(je,a,u,vt,s,P))}),z}function Gv(s){var a=pn(s);return function(u){return id(u,s,a)}}function id(s,a,u){var g=u.length;if(s==null)return!g;for(s=Ot(s);g--;){var T=u[g],P=a[T],z=s[T];if(z===t&&!(T in s)||!P(z))return!1}return!0}function rd(s,a,u){if(typeof s!="function")throw new si(c);return Ko(function(){s.apply(t,u)},a)}function Vo(s,a,u,g){var T=-1,P=Fa,z=!0,H=s.length,X=[],ce=a.length;if(!H)return X;u&&(a=Wt(a,jn(u))),g?(P=Ol,z=!1):a.length>=r&&(P=No,z=!1,a=new $r(a));e:for(;++T<H;){var le=s[T],fe=u==null?le:u(le);if(le=g||le!==0?le:0,z&&fe===fe){for(var Ee=ce;Ee--;)if(a[Ee]===fe)continue e;X.push(le)}else P(a,fe,g)||X.push(le)}return X}var wr=Ld(Ni),sd=Ld(Zl,!0);function Vv(s,a){var u=!0;return wr(s,function(g,T,P){return u=!!a(g,T,P),u}),u}function tc(s,a,u){for(var g=-1,T=s.length;++g<T;){var P=s[g],z=a(P);if(z!=null&&(H===t?z===z&&!Kn(z):u(z,H)))var H=z,X=P}return X}function Wv(s,a,u,g){var T=s.length;for(u=st(u),u<0&&(u=-u>T?0:T+u),g=g===t||g>T?T:st(g),g<0&&(g+=T),g=u>g?0:Mp(g);u<g;)s[u++]=a;return s}function od(s,a){var u=[];return wr(s,function(g,T,P){a(g,T,P)&&u.push(g)}),u}function vn(s,a,u,g,T){var P=-1,z=s.length;for(u||(u=Ix),T||(T=[]);++P<z;){var H=s[P];a>0&&u(H)?a>1?vn(H,a-1,u,g,T):br(T,H):g||(T[T.length]=H)}return T}var Kl=Id(),ad=Id(!0);function Ni(s,a){return s&&Kl(s,a,pn)}function Zl(s,a){return s&&ad(s,a,pn)}function nc(s,a){return Er(a,function(u){return or(s[u])})}function Qr(s,a){a=Cr(a,s);for(var u=0,g=a.length;s!=null&&u<g;)s=s[Bi(a[u++])];return u&&u==g?s:t}function cd(s,a,u){var g=a(s);return it(s)?g:br(g,u(s))}function In(s){return s==null?s===t?_e:Tt:Kr&&Kr in Ot(s)?Ax(s):zx(s)}function $l(s,a){return s>a}function Xv(s,a){return s!=null&&Pt.call(s,a)}function Yv(s,a){return s!=null&&a in Ot(s)}function jv(s,a,u){return s>=En(a,u)&&s<cn(a,u)}function Jl(s,a,u){for(var g=u?Ol:Fa,T=s[0].length,P=s.length,z=P,H=J(P),X=1/0,ce=[];z--;){var le=s[z];z&&a&&(le=Wt(le,jn(a))),X=En(le.length,X),H[z]=!u&&(a||T>=120&&le.length>=120)?new $r(z&&le):t}le=s[0];var fe=-1,Ee=H[0];e:for(;++fe<T&&ce.length<X;){var Oe=le[fe],Ye=a?a(Oe):Oe;if(Oe=u||Oe!==0?Oe:0,!(Ee?No(Ee,Ye):g(ce,Ye,u))){for(z=P;--z;){var lt=H[z];if(!(lt?No(lt,Ye):g(s[z],Ye,u)))continue e}Ee&&Ee.push(Ye),ce.push(Oe)}}return ce}function qv(s,a,u,g){return Ni(s,function(T,P,z){a(g,u(T),P,z)}),g}function Wo(s,a,u){a=Cr(a,s),s=Kd(s,a);var g=s==null?s:s[Bi(li(a))];return g==null?t:Yn(g,s,u)}function ld(s){return $t(s)&&In(s)==ge}function Kv(s){return $t(s)&&In(s)==ve}function Zv(s){return $t(s)&&In(s)==Xe}function Xo(s,a,u,g,T){return s===a?!0:s==null||a==null||!$t(s)&&!$t(a)?s!==s&&a!==a:$v(s,a,u,g,Xo,T)}function $v(s,a,u,g,T,P){var z=it(s),H=it(a),X=z?we:bn(s),ce=H?we:bn(a);X=X==ge?B:X,ce=ce==ge?B:ce;var le=X==B,fe=ce==B,Ee=X==ce;if(Ee&&Lr(s)){if(!Lr(a))return!1;z=!0,le=!1}if(Ee&&!le)return P||(P=new vi),z||Ns(s)?Gd(s,a,u,g,T,P):bx(s,a,X,u,g,T,P);if(!(u&M)){var Oe=le&&Pt.call(s,"__wrapped__"),Ye=fe&&Pt.call(a,"__wrapped__");if(Oe||Ye){var lt=Oe?s.value():s,je=Ye?a.value():a;return P||(P=new vi),T(lt,je,u,g,P)}}return Ee?(P||(P=new vi),Tx(s,a,u,g,T,P)):!1}function Jv(s){return $t(s)&&bn(s)==bt}function Ql(s,a,u,g){var T=u.length,P=T,z=!g;if(s==null)return!P;for(s=Ot(s);T--;){var H=u[T];if(z&&H[2]?H[1]!==s[H[0]]:!(H[0]in s))return!1}for(;++T<P;){H=u[T];var X=H[0],ce=s[X],le=H[1];if(z&&H[2]){if(ce===t&&!(X in s))return!1}else{var fe=new vi;if(g)var Ee=g(ce,le,X,s,a,fe);if(!(Ee===t?Xo(le,ce,M|A,g,fe):Ee))return!1}}return!0}function ud(s){if(!jt(s)||Ox(s))return!1;var a=or(s)?J0:ee;return a.test(ts(s))}function Qv(s){return $t(s)&&In(s)==ae}function ex(s){return $t(s)&&bn(s)==ue}function tx(s){return $t(s)&&xc(s.length)&&!!Ht[In(s)]}function hd(s){return typeof s=="function"?s:s==null?Vn:typeof s=="object"?it(s)?pd(s[0],s[1]):dd(s):Dp(s)}function eu(s){if(!qo(s))return rv(s);var a=[];for(var u in Ot(s))Pt.call(s,u)&&u!="constructor"&&a.push(u);return a}function nx(s){if(!jt(s))return Bx(s);var a=qo(s),u=[];for(var g in s)g=="constructor"&&(a||!Pt.call(s,g))||u.push(g);return u}function tu(s,a){return s<a}function fd(s,a){var u=-1,g=Hn(s)?J(s.length):[];return wr(s,function(T,P,z){g[++u]=a(T,P,z)}),g}function dd(s){var a=gu(s);return a.length==1&&a[0][2]?jd(a[0][0],a[0][1]):function(u){return u===s||Ql(u,s,a)}}function pd(s,a){return vu(s)&&Yd(a)?jd(Bi(s),a):function(u){var g=Ru(u,s);return g===t&&g===a?Cu(u,s):Xo(a,g,M|A)}}function ic(s,a,u,g,T){s!==a&&Kl(a,function(P,z){if(T||(T=new vi),jt(P))ix(s,a,z,u,ic,g,T);else{var H=g?g(yu(s,z),P,z+"",s,a,T):t;H===t&&(H=P),jl(s,z,H)}},Gn)}function ix(s,a,u,g,T,P,z){var H=yu(s,u),X=yu(a,u),ce=z.get(X);if(ce){jl(s,u,ce);return}var le=P?P(H,X,u+"",s,a,z):t,fe=le===t;if(fe){var Ee=it(X),Oe=!Ee&&Lr(X),Ye=!Ee&&!Oe&&Ns(X);le=X,Ee||Oe||Ye?it(H)?le=H:en(H)?le=kn(H):Oe?(fe=!1,le=Ad(X,!0)):Ye?(fe=!1,le=wd(X,!0)):le=[]:Zo(X)||ns(X)?(le=H,ns(H)?le=Ep(H):(!jt(H)||or(H))&&(le=Xd(X))):fe=!1}fe&&(z.set(X,le),T(le,X,g,P,z),z.delete(X)),jl(s,u,le)}function md(s,a){var u=s.length;if(u)return a+=a<0?u:0,sr(a,u)?s[a]:t}function gd(s,a,u){a.length?a=Wt(a,function(P){return it(P)?function(z){return Qr(z,P.length===1?P[0]:P)}:P}):a=[Vn];var g=-1;a=Wt(a,jn(We()));var T=fd(s,function(P,z,H){var X=Wt(a,function(ce){return ce(P)});return{criteria:X,index:++g,value:P}});return P0(T,function(P,z){return gx(P,z,u)})}function rx(s,a){return _d(s,a,function(u,g){return Cu(s,g)})}function _d(s,a,u){for(var g=-1,T=a.length,P={};++g<T;){var z=a[g],H=Qr(s,z);u(H,z)&&Yo(P,Cr(z,s),H)}return P}function sx(s){return function(a){return Qr(a,s)}}function nu(s,a,u,g){var T=g?C0:Ts,P=-1,z=a.length,H=s;for(s===a&&(a=kn(a)),u&&(H=Wt(s,jn(u)));++P<z;)for(var X=0,ce=a[P],le=u?u(ce):ce;(X=T(H,le,X,g))>-1;)H!==s&&ja.call(H,X,1),ja.call(s,X,1);return s}function vd(s,a){for(var u=s?a.length:0,g=u-1;u--;){var T=a[u];if(u==g||T!==P){var P=T;sr(T)?ja.call(s,T,1):ou(s,T)}}return s}function iu(s,a){return s+Za(Jf()*(a-s+1))}function ox(s,a,u,g){for(var T=-1,P=cn(Ka((a-s)/(u||1)),0),z=J(P);P--;)z[g?P:++T]=s,s+=u;return z}function ru(s,a){var u="";if(!s||a<1||a>K)return u;do a%2&&(u+=s),a=Za(a/2),a&&(s+=s);while(a);return u}function pt(s,a){return Su(qd(s,a,Vn),s+"")}function ax(s){return td(Fs(s))}function cx(s,a){var u=Fs(s);return dc(u,Jr(a,0,u.length))}function Yo(s,a,u,g){if(!jt(s))return s;a=Cr(a,s);for(var T=-1,P=a.length,z=P-1,H=s;H!=null&&++T<P;){var X=Bi(a[T]),ce=u;if(X==="__proto__"||X==="constructor"||X==="prototype")return s;if(T!=z){var le=H[X];ce=g?g(le,X,H):t,ce===t&&(ce=jt(le)?le:sr(a[T+1])?[]:{})}Go(H,X,ce),H=H[X]}return s}var xd=$a?function(s,a){return $a.set(s,a),s}:Vn,lx=qa?function(s,a){return qa(s,"toString",{configurable:!0,enumerable:!1,value:Lu(a),writable:!0})}:Vn;function ux(s){return dc(Fs(s))}function ci(s,a,u){var g=-1,T=s.length;a<0&&(a=-a>T?0:T+a),u=u>T?T:u,u<0&&(u+=T),T=a>u?0:u-a>>>0,a>>>=0;for(var P=J(T);++g<T;)P[g]=s[g+a];return P}function hx(s,a){var u;return wr(s,function(g,T,P){return u=a(g,T,P),!u}),!!u}function rc(s,a,u){var g=0,T=s==null?g:s.length;if(typeof a=="number"&&a===a&&T<=ot){for(;g<T;){var P=g+T>>>1,z=s[P];z!==null&&!Kn(z)&&(u?z<=a:z<a)?g=P+1:T=P}return T}return su(s,a,Vn,u)}function su(s,a,u,g){var T=0,P=s==null?0:s.length;if(P===0)return 0;a=u(a);for(var z=a!==a,H=a===null,X=Kn(a),ce=a===t;T<P;){var le=Za((T+P)/2),fe=u(s[le]),Ee=fe!==t,Oe=fe===null,Ye=fe===fe,lt=Kn(fe);if(z)var je=g||Ye;else ce?je=Ye&&(g||Ee):H?je=Ye&&Ee&&(g||!Oe):X?je=Ye&&Ee&&!Oe&&(g||!lt):Oe||lt?je=!1:je=g?fe<=a:fe<a;je?T=le+1:P=le}return En(P,Ke)}function yd(s,a){for(var u=-1,g=s.length,T=0,P=[];++u<g;){var z=s[u],H=a?a(z):z;if(!u||!xi(H,X)){var X=H;P[T++]=z===0?0:z}}return P}function Sd(s){return typeof s=="number"?s:Kn(s)?me:+s}function qn(s){if(typeof s=="string")return s;if(it(s))return Wt(s,qn)+"";if(Kn(s))return Qf?Qf.call(s):"";var a=s+"";return a=="0"&&1/s==-1/0?"-0":a}function Rr(s,a,u){var g=-1,T=Fa,P=s.length,z=!0,H=[],X=H;if(u)z=!1,T=Ol;else if(P>=r){var ce=a?null:Mx(s);if(ce)return za(ce);z=!1,T=No,X=new $r}else X=a?[]:H;e:for(;++g<P;){var le=s[g],fe=a?a(le):le;if(le=u||le!==0?le:0,z&&fe===fe){for(var Ee=X.length;Ee--;)if(X[Ee]===fe)continue e;a&&X.push(fe),H.push(le)}else T(X,fe,u)||(X!==H&&X.push(fe),H.push(le))}return H}function ou(s,a){return a=Cr(a,s),s=Kd(s,a),s==null||delete s[Bi(li(a))]}function Md(s,a,u,g){return Yo(s,a,u(Qr(s,a)),g)}function sc(s,a,u,g){for(var T=s.length,P=g?T:-1;(g?P--:++P<T)&&a(s[P],P,s););return u?ci(s,g?0:P,g?P+1:T):ci(s,g?P+1:0,g?T:P)}function Ed(s,a){var u=s;return u instanceof xt&&(u=u.value()),Ul(a,function(g,T){return T.func.apply(T.thisArg,br([g],T.args))},u)}function au(s,a,u){var g=s.length;if(g<2)return g?Rr(s[0]):[];for(var T=-1,P=J(g);++T<g;)for(var z=s[T],H=-1;++H<g;)H!=T&&(P[T]=Vo(P[T]||z,s[H],a,u));return Rr(vn(P,1),a,u)}function bd(s,a,u){for(var g=-1,T=s.length,P=a.length,z={};++g<T;){var H=g<P?a[g]:t;u(z,s[g],H)}return z}function cu(s){return en(s)?s:[]}function lu(s){return typeof s=="function"?s:Vn}function Cr(s,a){return it(s)?s:vu(s,a)?[s]:Qd(Rt(s))}var fx=pt;function Pr(s,a,u){var g=s.length;return u=u===t?g:u,!a&&u>=g?s:ci(s,a,u)}var Td=Q0||function(s){return _n.clearTimeout(s)};function Ad(s,a){if(a)return s.slice();var u=s.length,g=jf?jf(u):new s.constructor(u);return s.copy(g),g}function uu(s){var a=new s.constructor(s.byteLength);return new Xa(a).set(new Xa(s)),a}function dx(s,a){var u=a?uu(s.buffer):s.buffer;return new s.constructor(u,s.byteOffset,s.byteLength)}function px(s){var a=new s.constructor(s.source,D.exec(s));return a.lastIndex=s.lastIndex,a}function mx(s){return Ho?Ot(Ho.call(s)):{}}function wd(s,a){var u=a?uu(s.buffer):s.buffer;return new s.constructor(u,s.byteOffset,s.length)}function Rd(s,a){if(s!==a){var u=s!==t,g=s===null,T=s===s,P=Kn(s),z=a!==t,H=a===null,X=a===a,ce=Kn(a);if(!H&&!ce&&!P&&s>a||P&&z&&X&&!H&&!ce||g&&z&&X||!u&&X||!T)return 1;if(!g&&!P&&!ce&&s<a||ce&&u&&T&&!g&&!P||H&&u&&T||!z&&T||!X)return-1}return 0}function gx(s,a,u){for(var g=-1,T=s.criteria,P=a.criteria,z=T.length,H=u.length;++g<z;){var X=Rd(T[g],P[g]);if(X){if(g>=H)return X;var ce=u[g];return X*(ce=="desc"?-1:1)}}return s.index-a.index}function Cd(s,a,u,g){for(var T=-1,P=s.length,z=u.length,H=-1,X=a.length,ce=cn(P-z,0),le=J(X+ce),fe=!g;++H<X;)le[H]=a[H];for(;++T<z;)(fe||T<P)&&(le[u[T]]=s[T]);for(;ce--;)le[H++]=s[T++];return le}function Pd(s,a,u,g){for(var T=-1,P=s.length,z=-1,H=u.length,X=-1,ce=a.length,le=cn(P-H,0),fe=J(le+ce),Ee=!g;++T<le;)fe[T]=s[T];for(var Oe=T;++X<ce;)fe[Oe+X]=a[X];for(;++z<H;)(Ee||T<P)&&(fe[Oe+u[z]]=s[T++]);return fe}function kn(s,a){var u=-1,g=s.length;for(a||(a=J(g));++u<g;)a[u]=s[u];return a}function Fi(s,a,u,g){var T=!u;u||(u={});for(var P=-1,z=a.length;++P<z;){var H=a[P],X=g?g(u[H],s[H],H,u,s):t;X===t&&(X=s[H]),T?nr(u,H,X):Go(u,H,X)}return u}function _x(s,a){return Fi(s,_u(s),a)}function vx(s,a){return Fi(s,Vd(s),a)}function oc(s,a){return function(u,g){var T=it(u)?E0:kv,P=a?a():{};return T(u,s,We(g,2),P)}}function Ds(s){return pt(function(a,u){var g=-1,T=u.length,P=T>1?u[T-1]:t,z=T>2?u[2]:t;for(P=s.length>3&&typeof P=="function"?(T--,P):t,z&&Dn(u[0],u[1],z)&&(P=T<3?t:P,T=1),a=Ot(a);++g<T;){var H=u[g];H&&s(a,H,g,P)}return a})}function Ld(s,a){return function(u,g){if(u==null)return u;if(!Hn(u))return s(u,g);for(var T=u.length,P=a?T:-1,z=Ot(u);(a?P--:++P<T)&&g(z[P],P,z)!==!1;);return u}}function Id(s){return function(a,u,g){for(var T=-1,P=Ot(a),z=g(a),H=z.length;H--;){var X=z[s?H:++T];if(u(P[X],X,P)===!1)break}return a}}function xx(s,a,u){var g=a&v,T=jo(s);function P(){var z=this&&this!==_n&&this instanceof P?T:s;return z.apply(g?u:this,arguments)}return P}function Dd(s){return function(a){a=Rt(a);var u=As(a)?_i(a):t,g=u?u[0]:a.charAt(0),T=u?Pr(u,1).join(""):a.slice(1);return g[s]()+T}}function Os(s){return function(a){return Ul(Lp(Pp(a).replace(l0,"")),s,"")}}function jo(s){return function(){var a=arguments;switch(a.length){case 0:return new s;case 1:return new s(a[0]);case 2:return new s(a[0],a[1]);case 3:return new s(a[0],a[1],a[2]);case 4:return new s(a[0],a[1],a[2],a[3]);case 5:return new s(a[0],a[1],a[2],a[3],a[4]);case 6:return new s(a[0],a[1],a[2],a[3],a[4],a[5]);case 7:return new s(a[0],a[1],a[2],a[3],a[4],a[5],a[6])}var u=Is(s.prototype),g=s.apply(u,a);return jt(g)?g:u}}function yx(s,a,u){var g=jo(s);function T(){for(var P=arguments.length,z=J(P),H=P,X=Us(T);H--;)z[H]=arguments[H];var ce=P<3&&z[0]!==X&&z[P-1]!==X?[]:Tr(z,X);if(P-=ce.length,P<u)return Bd(s,a,ac,T.placeholder,t,z,ce,t,t,u-P);var le=this&&this!==_n&&this instanceof T?g:s;return Yn(le,this,z)}return T}function Od(s){return function(a,u,g){var T=Ot(a);if(!Hn(a)){var P=We(u,3);a=pn(a),u=function(H){return P(T[H],H,T)}}var z=s(a,u,g);return z>-1?T[P?a[z]:z]:t}}function Ud(s){return rr(function(a){var u=a.length,g=u,T=oi.prototype.thru;for(s&&a.reverse();g--;){var P=a[g];if(typeof P!="function")throw new si(c);if(T&&!z&&hc(P)=="wrapper")var z=new oi([],!0)}for(g=z?g:u;++g<u;){P=a[g];var H=hc(P),X=H=="wrapper"?mu(P):t;X&&xu(X[0])&&X[1]==(O|b|k|I)&&!X[4].length&&X[9]==1?z=z[hc(X[0])].apply(z,X[3]):z=P.length==1&&xu(P)?z[H]():z.thru(P)}return function(){var ce=arguments,le=ce[0];if(z&&ce.length==1&&it(le))return z.plant(le).value();for(var fe=0,Ee=u?a[fe].apply(this,ce):le;++fe<u;)Ee=a[fe].call(this,Ee);return Ee}})}function ac(s,a,u,g,T,P,z,H,X,ce){var le=a&O,fe=a&v,Ee=a&_,Oe=a&(b|L),Ye=a&E,lt=Ee?t:jo(s);function je(){for(var vt=arguments.length,Et=J(vt),Zn=vt;Zn--;)Et[Zn]=arguments[Zn];if(Oe)var On=Us(je),$n=I0(Et,On);if(g&&(Et=Cd(Et,g,T,Oe)),P&&(Et=Pd(Et,P,z,Oe)),vt-=$n,Oe&&vt<ce){var tn=Tr(Et,On);return Bd(s,a,ac,je.placeholder,u,Et,tn,H,X,ce-vt)}var yi=fe?u:this,cr=Ee?yi[s]:s;return vt=Et.length,H?Et=kx(Et,H):Ye&&vt>1&&Et.reverse(),le&&X<vt&&(Et.length=X),this&&this!==_n&&this instanceof je&&(cr=lt||jo(cr)),cr.apply(yi,Et)}return je}function Nd(s,a){return function(u,g){return qv(u,s,a(g),{})}}function cc(s,a){return function(u,g){var T;if(u===t&&g===t)return a;if(u!==t&&(T=u),g!==t){if(T===t)return g;typeof u=="string"||typeof g=="string"?(u=qn(u),g=qn(g)):(u=Sd(u),g=Sd(g)),T=s(u,g)}return T}}function hu(s){return rr(function(a){return a=Wt(a,jn(We())),pt(function(u){var g=this;return s(a,function(T){return Yn(T,g,u)})})})}function lc(s,a){a=a===t?" ":qn(a);var u=a.length;if(u<2)return u?ru(a,s):a;var g=ru(a,Ka(s/ws(a)));return As(a)?Pr(_i(g),0,s).join(""):g.slice(0,s)}function Sx(s,a,u,g){var T=a&v,P=jo(s);function z(){for(var H=-1,X=arguments.length,ce=-1,le=g.length,fe=J(le+X),Ee=this&&this!==_n&&this instanceof z?P:s;++ce<le;)fe[ce]=g[ce];for(;X--;)fe[ce++]=arguments[++H];return Yn(Ee,T?u:this,fe)}return z}function Fd(s){return function(a,u,g){return g&&typeof g!="number"&&Dn(a,u,g)&&(u=g=t),a=ar(a),u===t?(u=a,a=0):u=ar(u),g=g===t?a<u?1:-1:ar(g),ox(a,u,g,s)}}function uc(s){return function(a,u){return typeof a=="string"&&typeof u=="string"||(a=ui(a),u=ui(u)),s(a,u)}}function Bd(s,a,u,g,T,P,z,H,X,ce){var le=a&b,fe=le?z:t,Ee=le?t:z,Oe=le?P:t,Ye=le?t:P;a|=le?k:U,a&=~(le?U:k),a&C||(a&=-4);var lt=[s,a,T,Oe,fe,Ye,Ee,H,X,ce],je=u.apply(t,lt);return xu(s)&&Zd(je,lt),je.placeholder=g,$d(je,s,a)}function fu(s){var a=an[s];return function(u,g){if(u=ui(u),g=g==null?0:En(st(g),292),g&&$f(u)){var T=(Rt(u)+"e").split("e"),P=a(T[0]+"e"+(+T[1]+g));return T=(Rt(P)+"e").split("e"),+(T[0]+"e"+(+T[1]-g))}return a(u)}}var Mx=Ps&&1/za(new Ps([,-0]))[1]==pe?function(s){return new Ps(s)}:Ou;function zd(s){return function(a){var u=bn(a);return u==bt?Gl(a):u==ue?z0(a):L0(a,s(a))}}function ir(s,a,u,g,T,P,z,H){var X=a&_;if(!X&&typeof s!="function")throw new si(c);var ce=g?g.length:0;if(ce||(a&=-97,g=T=t),z=z===t?z:cn(st(z),0),H=H===t?H:st(H),ce-=T?T.length:0,a&U){var le=g,fe=T;g=T=t}var Ee=X?t:mu(s),Oe=[s,a,u,g,T,le,fe,P,z,H];if(Ee&&Fx(Oe,Ee),s=Oe[0],a=Oe[1],u=Oe[2],g=Oe[3],T=Oe[4],H=Oe[9]=Oe[9]===t?X?0:s.length:cn(Oe[9]-ce,0),!H&&a&(b|L)&&(a&=-25),!a||a==v)var Ye=xx(s,a,u);else a==b||a==L?Ye=yx(s,a,H):(a==k||a==(v|k))&&!T.length?Ye=Sx(s,a,u,g):Ye=ac.apply(t,Oe);var lt=Ee?xd:Zd;return $d(lt(Ye,Oe),s,a)}function kd(s,a,u,g){return s===t||xi(s,Cs[u])&&!Pt.call(g,u)?a:s}function Hd(s,a,u,g,T,P){return jt(s)&&jt(a)&&(P.set(a,s),ic(s,a,t,Hd,P),P.delete(a)),s}function Ex(s){return Zo(s)?t:s}function Gd(s,a,u,g,T,P){var z=u&M,H=s.length,X=a.length;if(H!=X&&!(z&&X>H))return!1;var ce=P.get(s),le=P.get(a);if(ce&&le)return ce==a&&le==s;var fe=-1,Ee=!0,Oe=u&A?new $r:t;for(P.set(s,a),P.set(a,s);++fe<H;){var Ye=s[fe],lt=a[fe];if(g)var je=z?g(lt,Ye,fe,a,s,P):g(Ye,lt,fe,s,a,P);if(je!==t){if(je)continue;Ee=!1;break}if(Oe){if(!Nl(a,function(vt,Et){if(!No(Oe,Et)&&(Ye===vt||T(Ye,vt,u,g,P)))return Oe.push(Et)})){Ee=!1;break}}else if(!(Ye===lt||T(Ye,lt,u,g,P))){Ee=!1;break}}return P.delete(s),P.delete(a),Ee}function bx(s,a,u,g,T,P,z){switch(u){case Te:if(s.byteLength!=a.byteLength||s.byteOffset!=a.byteOffset)return!1;s=s.buffer,a=a.buffer;case ve:return!(s.byteLength!=a.byteLength||!P(new Xa(s),new Xa(a)));case Ge:case Xe:case He:return xi(+s,+a);case j:return s.name==a.name&&s.message==a.message;case ae:case de:return s==a+"";case bt:var H=Gl;case ue:var X=g&M;if(H||(H=za),s.size!=a.size&&!X)return!1;var ce=z.get(s);if(ce)return ce==a;g|=A,z.set(s,a);var le=Gd(H(s),H(a),g,T,P,z);return z.delete(s),le;case Be:if(Ho)return Ho.call(s)==Ho.call(a)}return!1}function Tx(s,a,u,g,T,P){var z=u&M,H=du(s),X=H.length,ce=du(a),le=ce.length;if(X!=le&&!z)return!1;for(var fe=X;fe--;){var Ee=H[fe];if(!(z?Ee in a:Pt.call(a,Ee)))return!1}var Oe=P.get(s),Ye=P.get(a);if(Oe&&Ye)return Oe==a&&Ye==s;var lt=!0;P.set(s,a),P.set(a,s);for(var je=z;++fe<X;){Ee=H[fe];var vt=s[Ee],Et=a[Ee];if(g)var Zn=z?g(Et,vt,Ee,a,s,P):g(vt,Et,Ee,s,a,P);if(!(Zn===t?vt===Et||T(vt,Et,u,g,P):Zn)){lt=!1;break}je||(je=Ee=="constructor")}if(lt&&!je){var On=s.constructor,$n=a.constructor;On!=$n&&"constructor"in s&&"constructor"in a&&!(typeof On=="function"&&On instanceof On&&typeof $n=="function"&&$n instanceof $n)&&(lt=!1)}return P.delete(s),P.delete(a),lt}function rr(s){return Su(qd(s,t,ip),s+"")}function du(s){return cd(s,pn,_u)}function pu(s){return cd(s,Gn,Vd)}var mu=$a?function(s){return $a.get(s)}:Ou;function hc(s){for(var a=s.name+"",u=Ls[a],g=Pt.call(Ls,a)?u.length:0;g--;){var T=u[g],P=T.func;if(P==null||P==s)return T.name}return a}function Us(s){var a=Pt.call(R,"placeholder")?R:s;return a.placeholder}function We(){var s=R.iteratee||Iu;return s=s===Iu?hd:s,arguments.length?s(arguments[0],arguments[1]):s}function fc(s,a){var u=s.__data__;return Dx(a)?u[typeof a=="string"?"string":"hash"]:u.map}function gu(s){for(var a=pn(s),u=a.length;u--;){var g=a[u],T=s[g];a[u]=[g,T,Yd(T)]}return a}function es(s,a){var u=N0(s,a);return ud(u)?u:t}function Ax(s){var a=Pt.call(s,Kr),u=s[Kr];try{s[Kr]=t;var g=!0}catch{}var T=Va.call(s);return g&&(a?s[Kr]=u:delete s[Kr]),T}var _u=Wl?function(s){return s==null?[]:(s=Ot(s),Er(Wl(s),function(a){return Kf.call(s,a)}))}:Uu,Vd=Wl?function(s){for(var a=[];s;)br(a,_u(s)),s=Ya(s);return a}:Uu,bn=In;(Xl&&bn(new Xl(new ArrayBuffer(1)))!=Te||Bo&&bn(new Bo)!=bt||Yl&&bn(Yl.resolve())!=w||Ps&&bn(new Ps)!=ue||zo&&bn(new zo)!=De)&&(bn=function(s){var a=In(s),u=a==B?s.constructor:t,g=u?ts(u):"";if(g)switch(g){case cv:return Te;case lv:return bt;case uv:return w;case hv:return ue;case fv:return De}return a});function wx(s,a,u){for(var g=-1,T=u.length;++g<T;){var P=u[g],z=P.size;switch(P.type){case"drop":s+=z;break;case"dropRight":a-=z;break;case"take":a=En(a,s+z);break;case"takeRight":s=cn(s,a-z);break}}return{start:s,end:a}}function Rx(s){var a=s.match(Es);return a?a[1].split(Oa):[]}function Wd(s,a,u){a=Cr(a,s);for(var g=-1,T=a.length,P=!1;++g<T;){var z=Bi(a[g]);if(!(P=s!=null&&u(s,z)))break;s=s[z]}return P||++g!=T?P:(T=s==null?0:s.length,!!T&&xc(T)&&sr(z,T)&&(it(s)||ns(s)))}function Cx(s){var a=s.length,u=new s.constructor(a);return a&&typeof s[0]=="string"&&Pt.call(s,"index")&&(u.index=s.index,u.input=s.input),u}function Xd(s){return typeof s.constructor=="function"&&!qo(s)?Is(Ya(s)):{}}function Px(s,a,u){var g=s.constructor;switch(a){case ve:return uu(s);case Ge:case Xe:return new g(+s);case Te:return dx(s,u);case qe:case Le:case Ie:case ct:case ft:case St:case gt:case Mt:case Ue:return wd(s,u);case bt:return new g;case He:case de:return new g(s);case ae:return px(s);case ue:return new g;case Be:return mx(s)}}function Lx(s,a){var u=a.length;if(!u)return s;var g=u-1;return a[g]=(u>1?"& ":"")+a[g],a=a.join(u>2?", ":" "),s.replace(Da,`{
/* [wrapped with `+a+`] */
`)}function Ix(s){return it(s)||ns(s)||!!(Zf&&s&&s[Zf])}function sr(s,a){var u=typeof s;return a=a??K,!!a&&(u=="number"||u!="symbol"&&Ae.test(s))&&s>-1&&s%1==0&&s<a}function Dn(s,a,u){if(!jt(u))return!1;var g=typeof a;return(g=="number"?Hn(u)&&sr(a,u.length):g=="string"&&a in u)?xi(u[a],s):!1}function vu(s,a){if(it(s))return!1;var u=typeof s;return u=="number"||u=="symbol"||u=="boolean"||s==null||Kn(s)?!0:Zt.test(s)||!Kt.test(s)||a!=null&&s in Ot(a)}function Dx(s){var a=typeof s;return a=="string"||a=="number"||a=="symbol"||a=="boolean"?s!=="__proto__":s===null}function xu(s){var a=hc(s),u=R[a];if(typeof u!="function"||!(a in xt.prototype))return!1;if(s===u)return!0;var g=mu(u);return!!g&&s===g[0]}function Ox(s){return!!Yf&&Yf in s}var Ux=Ha?or:Nu;function qo(s){var a=s&&s.constructor,u=typeof a=="function"&&a.prototype||Cs;return s===u}function Yd(s){return s===s&&!jt(s)}function jd(s,a){return function(u){return u==null?!1:u[s]===a&&(a!==t||s in Ot(u))}}function Nx(s){var a=_c(s,function(g){return u.size===f&&u.clear(),g}),u=a.cache;return a}function Fx(s,a){var u=s[1],g=a[1],T=u|g,P=T<(v|_|O),z=g==O&&u==b||g==O&&u==I&&s[7].length<=a[8]||g==(O|I)&&a[7].length<=a[8]&&u==b;if(!(P||z))return s;g&v&&(s[2]=a[2],T|=u&v?0:C);var H=a[3];if(H){var X=s[3];s[3]=X?Cd(X,H,a[4]):H,s[4]=X?Tr(s[3],d):a[4]}return H=a[5],H&&(X=s[5],s[5]=X?Pd(X,H,a[6]):H,s[6]=X?Tr(s[5],d):a[6]),H=a[7],H&&(s[7]=H),g&O&&(s[8]=s[8]==null?a[8]:En(s[8],a[8])),s[9]==null&&(s[9]=a[9]),s[0]=a[0],s[1]=T,s}function Bx(s){var a=[];if(s!=null)for(var u in Ot(s))a.push(u);return a}function zx(s){return Va.call(s)}function qd(s,a,u){return a=cn(a===t?s.length-1:a,0),function(){for(var g=arguments,T=-1,P=cn(g.length-a,0),z=J(P);++T<P;)z[T]=g[a+T];T=-1;for(var H=J(a+1);++T<a;)H[T]=g[T];return H[a]=u(z),Yn(s,this,H)}}function Kd(s,a){return a.length<2?s:Qr(s,ci(a,0,-1))}function kx(s,a){for(var u=s.length,g=En(a.length,u),T=kn(s);g--;){var P=a[g];s[g]=sr(P,u)?T[P]:t}return s}function yu(s,a){if(!(a==="constructor"&&typeof s[a]=="function")&&a!="__proto__")return s[a]}var Zd=Jd(xd),Ko=tv||function(s,a){return _n.setTimeout(s,a)},Su=Jd(lx);function $d(s,a,u){var g=a+"";return Su(s,Lx(g,Hx(Rx(g),u)))}function Jd(s){var a=0,u=0;return function(){var g=sv(),T=G-(g-u);if(u=g,T>0){if(++a>=V)return arguments[0]}else a=0;return s.apply(t,arguments)}}function dc(s,a){var u=-1,g=s.length,T=g-1;for(a=a===t?g:a;++u<a;){var P=iu(u,T),z=s[P];s[P]=s[u],s[u]=z}return s.length=a,s}var Qd=Nx(function(s){var a=[];return s.charCodeAt(0)===46&&a.push(""),s.replace(Pn,function(u,g,T,P){a.push(T?P.replace(Al,"$1"):g||u)}),a});function Bi(s){if(typeof s=="string"||Kn(s))return s;var a=s+"";return a=="0"&&1/s==-1/0?"-0":a}function ts(s){if(s!=null){try{return Ga.call(s)}catch{}try{return s+""}catch{}}return""}function Hx(s,a){return ri(ie,function(u){var g="_."+u[0];a&u[1]&&!Fa(s,g)&&s.push(g)}),s.sort()}function ep(s){if(s instanceof xt)return s.clone();var a=new oi(s.__wrapped__,s.__chain__);return a.__actions__=kn(s.__actions__),a.__index__=s.__index__,a.__values__=s.__values__,a}function Gx(s,a,u){(u?Dn(s,a,u):a===t)?a=1:a=cn(st(a),0);var g=s==null?0:s.length;if(!g||a<1)return[];for(var T=0,P=0,z=J(Ka(g/a));T<g;)z[P++]=ci(s,T,T+=a);return z}function Vx(s){for(var a=-1,u=s==null?0:s.length,g=0,T=[];++a<u;){var P=s[a];P&&(T[g++]=P)}return T}function Wx(){var s=arguments.length;if(!s)return[];for(var a=J(s-1),u=arguments[0],g=s;g--;)a[g-1]=arguments[g];return br(it(u)?kn(u):[u],vn(a,1))}var Xx=pt(function(s,a){return en(s)?Vo(s,vn(a,1,en,!0)):[]}),Yx=pt(function(s,a){var u=li(a);return en(u)&&(u=t),en(s)?Vo(s,vn(a,1,en,!0),We(u,2)):[]}),jx=pt(function(s,a){var u=li(a);return en(u)&&(u=t),en(s)?Vo(s,vn(a,1,en,!0),t,u):[]});function qx(s,a,u){var g=s==null?0:s.length;return g?(a=u||a===t?1:st(a),ci(s,a<0?0:a,g)):[]}function Kx(s,a,u){var g=s==null?0:s.length;return g?(a=u||a===t?1:st(a),a=g-a,ci(s,0,a<0?0:a)):[]}function Zx(s,a){return s&&s.length?sc(s,We(a,3),!0,!0):[]}function $x(s,a){return s&&s.length?sc(s,We(a,3),!0):[]}function Jx(s,a,u,g){var T=s==null?0:s.length;return T?(u&&typeof u!="number"&&Dn(s,a,u)&&(u=0,g=T),Wv(s,a,u,g)):[]}function tp(s,a,u){var g=s==null?0:s.length;if(!g)return-1;var T=u==null?0:st(u);return T<0&&(T=cn(g+T,0)),Ba(s,We(a,3),T)}function np(s,a,u){var g=s==null?0:s.length;if(!g)return-1;var T=g-1;return u!==t&&(T=st(u),T=u<0?cn(g+T,0):En(T,g-1)),Ba(s,We(a,3),T,!0)}function ip(s){var a=s==null?0:s.length;return a?vn(s,1):[]}function Qx(s){var a=s==null?0:s.length;return a?vn(s,pe):[]}function ey(s,a){var u=s==null?0:s.length;return u?(a=a===t?1:st(a),vn(s,a)):[]}function ty(s){for(var a=-1,u=s==null?0:s.length,g={};++a<u;){var T=s[a];g[T[0]]=T[1]}return g}function rp(s){return s&&s.length?s[0]:t}function ny(s,a,u){var g=s==null?0:s.length;if(!g)return-1;var T=u==null?0:st(u);return T<0&&(T=cn(g+T,0)),Ts(s,a,T)}function iy(s){var a=s==null?0:s.length;return a?ci(s,0,-1):[]}var ry=pt(function(s){var a=Wt(s,cu);return a.length&&a[0]===s[0]?Jl(a):[]}),sy=pt(function(s){var a=li(s),u=Wt(s,cu);return a===li(u)?a=t:u.pop(),u.length&&u[0]===s[0]?Jl(u,We(a,2)):[]}),oy=pt(function(s){var a=li(s),u=Wt(s,cu);return a=typeof a=="function"?a:t,a&&u.pop(),u.length&&u[0]===s[0]?Jl(u,t,a):[]});function ay(s,a){return s==null?"":iv.call(s,a)}function li(s){var a=s==null?0:s.length;return a?s[a-1]:t}function cy(s,a,u){var g=s==null?0:s.length;if(!g)return-1;var T=g;return u!==t&&(T=st(u),T=T<0?cn(g+T,0):En(T,g-1)),a===a?H0(s,a,T):Ba(s,Bf,T,!0)}function ly(s,a){return s&&s.length?md(s,st(a)):t}var uy=pt(sp);function sp(s,a){return s&&s.length&&a&&a.length?nu(s,a):s}function hy(s,a,u){return s&&s.length&&a&&a.length?nu(s,a,We(u,2)):s}function fy(s,a,u){return s&&s.length&&a&&a.length?nu(s,a,t,u):s}var dy=rr(function(s,a){var u=s==null?0:s.length,g=ql(s,a);return vd(s,Wt(a,function(T){return sr(T,u)?+T:T}).sort(Rd)),g});function py(s,a){var u=[];if(!(s&&s.length))return u;var g=-1,T=[],P=s.length;for(a=We(a,3);++g<P;){var z=s[g];a(z,g,s)&&(u.push(z),T.push(g))}return vd(s,T),u}function Mu(s){return s==null?s:av.call(s)}function my(s,a,u){var g=s==null?0:s.length;return g?(u&&typeof u!="number"&&Dn(s,a,u)?(a=0,u=g):(a=a==null?0:st(a),u=u===t?g:st(u)),ci(s,a,u)):[]}function gy(s,a){return rc(s,a)}function _y(s,a,u){return su(s,a,We(u,2))}function vy(s,a){var u=s==null?0:s.length;if(u){var g=rc(s,a);if(g<u&&xi(s[g],a))return g}return-1}function xy(s,a){return rc(s,a,!0)}function yy(s,a,u){return su(s,a,We(u,2),!0)}function Sy(s,a){var u=s==null?0:s.length;if(u){var g=rc(s,a,!0)-1;if(xi(s[g],a))return g}return-1}function My(s){return s&&s.length?yd(s):[]}function Ey(s,a){return s&&s.length?yd(s,We(a,2)):[]}function by(s){var a=s==null?0:s.length;return a?ci(s,1,a):[]}function Ty(s,a,u){return s&&s.length?(a=u||a===t?1:st(a),ci(s,0,a<0?0:a)):[]}function Ay(s,a,u){var g=s==null?0:s.length;return g?(a=u||a===t?1:st(a),a=g-a,ci(s,a<0?0:a,g)):[]}function wy(s,a){return s&&s.length?sc(s,We(a,3),!1,!0):[]}function Ry(s,a){return s&&s.length?sc(s,We(a,3)):[]}var Cy=pt(function(s){return Rr(vn(s,1,en,!0))}),Py=pt(function(s){var a=li(s);return en(a)&&(a=t),Rr(vn(s,1,en,!0),We(a,2))}),Ly=pt(function(s){var a=li(s);return a=typeof a=="function"?a:t,Rr(vn(s,1,en,!0),t,a)});function Iy(s){return s&&s.length?Rr(s):[]}function Dy(s,a){return s&&s.length?Rr(s,We(a,2)):[]}function Oy(s,a){return a=typeof a=="function"?a:t,s&&s.length?Rr(s,t,a):[]}function Eu(s){if(!(s&&s.length))return[];var a=0;return s=Er(s,function(u){if(en(u))return a=cn(u.length,a),!0}),kl(a,function(u){return Wt(s,Fl(u))})}function op(s,a){if(!(s&&s.length))return[];var u=Eu(s);return a==null?u:Wt(u,function(g){return Yn(a,t,g)})}var Uy=pt(function(s,a){return en(s)?Vo(s,a):[]}),Ny=pt(function(s){return au(Er(s,en))}),Fy=pt(function(s){var a=li(s);return en(a)&&(a=t),au(Er(s,en),We(a,2))}),By=pt(function(s){var a=li(s);return a=typeof a=="function"?a:t,au(Er(s,en),t,a)}),zy=pt(Eu);function ky(s,a){return bd(s||[],a||[],Go)}function Hy(s,a){return bd(s||[],a||[],Yo)}var Gy=pt(function(s){var a=s.length,u=a>1?s[a-1]:t;return u=typeof u=="function"?(s.pop(),u):t,op(s,u)});function ap(s){var a=R(s);return a.__chain__=!0,a}function Vy(s,a){return a(s),s}function pc(s,a){return a(s)}var Wy=rr(function(s){var a=s.length,u=a?s[0]:0,g=this.__wrapped__,T=function(P){return ql(P,s)};return a>1||this.__actions__.length||!(g instanceof xt)||!sr(u)?this.thru(T):(g=g.slice(u,+u+(a?1:0)),g.__actions__.push({func:pc,args:[T],thisArg:t}),new oi(g,this.__chain__).thru(function(P){return a&&!P.length&&P.push(t),P}))});function Xy(){return ap(this)}function Yy(){return new oi(this.value(),this.__chain__)}function jy(){this.__values__===t&&(this.__values__=Sp(this.value()));var s=this.__index__>=this.__values__.length,a=s?t:this.__values__[this.__index__++];return{done:s,value:a}}function qy(){return this}function Ky(s){for(var a,u=this;u instanceof Qa;){var g=ep(u);g.__index__=0,g.__values__=t,a?T.__wrapped__=g:a=g;var T=g;u=u.__wrapped__}return T.__wrapped__=s,a}function Zy(){var s=this.__wrapped__;if(s instanceof xt){var a=s;return this.__actions__.length&&(a=new xt(this)),a=a.reverse(),a.__actions__.push({func:pc,args:[Mu],thisArg:t}),new oi(a,this.__chain__)}return this.thru(Mu)}function $y(){return Ed(this.__wrapped__,this.__actions__)}var Jy=oc(function(s,a,u){Pt.call(s,u)?++s[u]:nr(s,u,1)});function Qy(s,a,u){var g=it(s)?Nf:Vv;return u&&Dn(s,a,u)&&(a=t),g(s,We(a,3))}function eS(s,a){var u=it(s)?Er:od;return u(s,We(a,3))}var tS=Od(tp),nS=Od(np);function iS(s,a){return vn(mc(s,a),1)}function rS(s,a){return vn(mc(s,a),pe)}function sS(s,a,u){return u=u===t?1:st(u),vn(mc(s,a),u)}function cp(s,a){var u=it(s)?ri:wr;return u(s,We(a,3))}function lp(s,a){var u=it(s)?b0:sd;return u(s,We(a,3))}var oS=oc(function(s,a,u){Pt.call(s,u)?s[u].push(a):nr(s,u,[a])});function aS(s,a,u,g){s=Hn(s)?s:Fs(s),u=u&&!g?st(u):0;var T=s.length;return u<0&&(u=cn(T+u,0)),yc(s)?u<=T&&s.indexOf(a,u)>-1:!!T&&Ts(s,a,u)>-1}var cS=pt(function(s,a,u){var g=-1,T=typeof a=="function",P=Hn(s)?J(s.length):[];return wr(s,function(z){P[++g]=T?Yn(a,z,u):Wo(z,a,u)}),P}),lS=oc(function(s,a,u){nr(s,u,a)});function mc(s,a){var u=it(s)?Wt:fd;return u(s,We(a,3))}function uS(s,a,u,g){return s==null?[]:(it(a)||(a=a==null?[]:[a]),u=g?t:u,it(u)||(u=u==null?[]:[u]),gd(s,a,u))}var hS=oc(function(s,a,u){s[u?0:1].push(a)},function(){return[[],[]]});function fS(s,a,u){var g=it(s)?Ul:kf,T=arguments.length<3;return g(s,We(a,4),u,T,wr)}function dS(s,a,u){var g=it(s)?T0:kf,T=arguments.length<3;return g(s,We(a,4),u,T,sd)}function pS(s,a){var u=it(s)?Er:od;return u(s,vc(We(a,3)))}function mS(s){var a=it(s)?td:ax;return a(s)}function gS(s,a,u){(u?Dn(s,a,u):a===t)?a=1:a=st(a);var g=it(s)?Bv:cx;return g(s,a)}function _S(s){var a=it(s)?zv:ux;return a(s)}function vS(s){if(s==null)return 0;if(Hn(s))return yc(s)?ws(s):s.length;var a=bn(s);return a==bt||a==ue?s.size:eu(s).length}function xS(s,a,u){var g=it(s)?Nl:hx;return u&&Dn(s,a,u)&&(a=t),g(s,We(a,3))}var yS=pt(function(s,a){if(s==null)return[];var u=a.length;return u>1&&Dn(s,a[0],a[1])?a=[]:u>2&&Dn(a[0],a[1],a[2])&&(a=[a[0]]),gd(s,vn(a,1),[])}),gc=ev||function(){return _n.Date.now()};function SS(s,a){if(typeof a!="function")throw new si(c);return s=st(s),function(){if(--s<1)return a.apply(this,arguments)}}function up(s,a,u){return a=u?t:a,a=s&&a==null?s.length:a,ir(s,O,t,t,t,t,a)}function hp(s,a){var u;if(typeof a!="function")throw new si(c);return s=st(s),function(){return--s>0&&(u=a.apply(this,arguments)),s<=1&&(a=t),u}}var bu=pt(function(s,a,u){var g=v;if(u.length){var T=Tr(u,Us(bu));g|=k}return ir(s,g,a,u,T)}),fp=pt(function(s,a,u){var g=v|_;if(u.length){var T=Tr(u,Us(fp));g|=k}return ir(a,g,s,u,T)});function dp(s,a,u){a=u?t:a;var g=ir(s,b,t,t,t,t,t,a);return g.placeholder=dp.placeholder,g}function pp(s,a,u){a=u?t:a;var g=ir(s,L,t,t,t,t,t,a);return g.placeholder=pp.placeholder,g}function mp(s,a,u){var g,T,P,z,H,X,ce=0,le=!1,fe=!1,Ee=!0;if(typeof s!="function")throw new si(c);a=ui(a)||0,jt(u)&&(le=!!u.leading,fe="maxWait"in u,P=fe?cn(ui(u.maxWait)||0,a):P,Ee="trailing"in u?!!u.trailing:Ee);function Oe(tn){var yi=g,cr=T;return g=T=t,ce=tn,z=s.apply(cr,yi),z}function Ye(tn){return ce=tn,H=Ko(vt,a),le?Oe(tn):z}function lt(tn){var yi=tn-X,cr=tn-ce,Op=a-yi;return fe?En(Op,P-cr):Op}function je(tn){var yi=tn-X,cr=tn-ce;return X===t||yi>=a||yi<0||fe&&cr>=P}function vt(){var tn=gc();if(je(tn))return Et(tn);H=Ko(vt,lt(tn))}function Et(tn){return H=t,Ee&&g?Oe(tn):(g=T=t,z)}function Zn(){H!==t&&Td(H),ce=0,g=X=T=H=t}function On(){return H===t?z:Et(gc())}function $n(){var tn=gc(),yi=je(tn);if(g=arguments,T=this,X=tn,yi){if(H===t)return Ye(X);if(fe)return Td(H),H=Ko(vt,a),Oe(X)}return H===t&&(H=Ko(vt,a)),z}return $n.cancel=Zn,$n.flush=On,$n}var MS=pt(function(s,a){return rd(s,1,a)}),ES=pt(function(s,a,u){return rd(s,ui(a)||0,u)});function bS(s){return ir(s,E)}function _c(s,a){if(typeof s!="function"||a!=null&&typeof a!="function")throw new si(c);var u=function(){var g=arguments,T=a?a.apply(this,g):g[0],P=u.cache;if(P.has(T))return P.get(T);var z=s.apply(this,g);return u.cache=P.set(T,z)||P,z};return u.cache=new(_c.Cache||tr),u}_c.Cache=tr;function vc(s){if(typeof s!="function")throw new si(c);return function(){var a=arguments;switch(a.length){case 0:return!s.call(this);case 1:return!s.call(this,a[0]);case 2:return!s.call(this,a[0],a[1]);case 3:return!s.call(this,a[0],a[1],a[2])}return!s.apply(this,a)}}function TS(s){return hp(2,s)}var AS=fx(function(s,a){a=a.length==1&&it(a[0])?Wt(a[0],jn(We())):Wt(vn(a,1),jn(We()));var u=a.length;return pt(function(g){for(var T=-1,P=En(g.length,u);++T<P;)g[T]=a[T].call(this,g[T]);return Yn(s,this,g)})}),Tu=pt(function(s,a){var u=Tr(a,Us(Tu));return ir(s,k,t,a,u)}),gp=pt(function(s,a){var u=Tr(a,Us(gp));return ir(s,U,t,a,u)}),wS=rr(function(s,a){return ir(s,I,t,t,t,a)});function RS(s,a){if(typeof s!="function")throw new si(c);return a=a===t?a:st(a),pt(s,a)}function CS(s,a){if(typeof s!="function")throw new si(c);return a=a==null?0:cn(st(a),0),pt(function(u){var g=u[a],T=Pr(u,0,a);return g&&br(T,g),Yn(s,this,T)})}function PS(s,a,u){var g=!0,T=!0;if(typeof s!="function")throw new si(c);return jt(u)&&(g="leading"in u?!!u.leading:g,T="trailing"in u?!!u.trailing:T),mp(s,a,{leading:g,maxWait:a,trailing:T})}function LS(s){return up(s,1)}function IS(s,a){return Tu(lu(a),s)}function DS(){if(!arguments.length)return[];var s=arguments[0];return it(s)?s:[s]}function OS(s){return ai(s,x)}function US(s,a){return a=typeof a=="function"?a:t,ai(s,x,a)}function NS(s){return ai(s,p|x)}function FS(s,a){return a=typeof a=="function"?a:t,ai(s,p|x,a)}function BS(s,a){return a==null||id(s,a,pn(a))}function xi(s,a){return s===a||s!==s&&a!==a}var zS=uc($l),kS=uc(function(s,a){return s>=a}),ns=ld(function(){return arguments}())?ld:function(s){return $t(s)&&Pt.call(s,"callee")&&!Kf.call(s,"callee")},it=J.isArray,HS=Pf?jn(Pf):Kv;function Hn(s){return s!=null&&xc(s.length)&&!or(s)}function en(s){return $t(s)&&Hn(s)}function GS(s){return s===!0||s===!1||$t(s)&&In(s)==Ge}var Lr=nv||Nu,VS=Lf?jn(Lf):Zv;function WS(s){return $t(s)&&s.nodeType===1&&!Zo(s)}function XS(s){if(s==null)return!0;if(Hn(s)&&(it(s)||typeof s=="string"||typeof s.splice=="function"||Lr(s)||Ns(s)||ns(s)))return!s.length;var a=bn(s);if(a==bt||a==ue)return!s.size;if(qo(s))return!eu(s).length;for(var u in s)if(Pt.call(s,u))return!1;return!0}function YS(s,a){return Xo(s,a)}function jS(s,a,u){u=typeof u=="function"?u:t;var g=u?u(s,a):t;return g===t?Xo(s,a,t,u):!!g}function Au(s){if(!$t(s))return!1;var a=In(s);return a==j||a==at||typeof s.message=="string"&&typeof s.name=="string"&&!Zo(s)}function qS(s){return typeof s=="number"&&$f(s)}function or(s){if(!jt(s))return!1;var a=In(s);return a==$e||a==ze||a==Se||a==te}function _p(s){return typeof s=="number"&&s==st(s)}function xc(s){return typeof s=="number"&&s>-1&&s%1==0&&s<=K}function jt(s){var a=typeof s;return s!=null&&(a=="object"||a=="function")}function $t(s){return s!=null&&typeof s=="object"}var vp=If?jn(If):Jv;function KS(s,a){return s===a||Ql(s,a,gu(a))}function ZS(s,a,u){return u=typeof u=="function"?u:t,Ql(s,a,gu(a),u)}function $S(s){return xp(s)&&s!=+s}function JS(s){if(Ux(s))throw new tt(o);return ud(s)}function QS(s){return s===null}function eM(s){return s==null}function xp(s){return typeof s=="number"||$t(s)&&In(s)==He}function Zo(s){if(!$t(s)||In(s)!=B)return!1;var a=Ya(s);if(a===null)return!0;var u=Pt.call(a,"constructor")&&a.constructor;return typeof u=="function"&&u instanceof u&&Ga.call(u)==Z0}var wu=Df?jn(Df):Qv;function tM(s){return _p(s)&&s>=-9007199254740991&&s<=K}var yp=Of?jn(Of):ex;function yc(s){return typeof s=="string"||!it(s)&&$t(s)&&In(s)==de}function Kn(s){return typeof s=="symbol"||$t(s)&&In(s)==Be}var Ns=Uf?jn(Uf):tx;function nM(s){return s===t}function iM(s){return $t(s)&&bn(s)==De}function rM(s){return $t(s)&&In(s)==Ve}var sM=uc(tu),oM=uc(function(s,a){return s<=a});function Sp(s){if(!s)return[];if(Hn(s))return yc(s)?_i(s):kn(s);if(Fo&&s[Fo])return B0(s[Fo]());var a=bn(s),u=a==bt?Gl:a==ue?za:Fs;return u(s)}function ar(s){if(!s)return s===0?s:0;if(s=ui(s),s===pe||s===-1/0){var a=s<0?-1:1;return a*he}return s===s?s:0}function st(s){var a=ar(s),u=a%1;return a===a?u?a-u:a:0}function Mp(s){return s?Jr(st(s),0,Me):0}function ui(s){if(typeof s=="number")return s;if(Kn(s))return me;if(jt(s)){var a=typeof s.valueOf=="function"?s.valueOf():s;s=jt(a)?a+"":a}if(typeof s!="string")return s===0?s:+s;s=Hf(s);var u=Q.test(s);return u||$.test(s)?S0(s.slice(2),u?2:8):Y.test(s)?me:+s}function Ep(s){return Fi(s,Gn(s))}function aM(s){return s?Jr(st(s),-9007199254740991,K):s===0?s:0}function Rt(s){return s==null?"":qn(s)}var cM=Ds(function(s,a){if(qo(a)||Hn(a)){Fi(a,pn(a),s);return}for(var u in a)Pt.call(a,u)&&Go(s,u,a[u])}),bp=Ds(function(s,a){Fi(a,Gn(a),s)}),Sc=Ds(function(s,a,u,g){Fi(a,Gn(a),s,g)}),lM=Ds(function(s,a,u,g){Fi(a,pn(a),s,g)}),uM=rr(ql);function hM(s,a){var u=Is(s);return a==null?u:nd(u,a)}var fM=pt(function(s,a){s=Ot(s);var u=-1,g=a.length,T=g>2?a[2]:t;for(T&&Dn(a[0],a[1],T)&&(g=1);++u<g;)for(var P=a[u],z=Gn(P),H=-1,X=z.length;++H<X;){var ce=z[H],le=s[ce];(le===t||xi(le,Cs[ce])&&!Pt.call(s,ce))&&(s[ce]=P[ce])}return s}),dM=pt(function(s){return s.push(t,Hd),Yn(Tp,t,s)});function pM(s,a){return Ff(s,We(a,3),Ni)}function mM(s,a){return Ff(s,We(a,3),Zl)}function gM(s,a){return s==null?s:Kl(s,We(a,3),Gn)}function _M(s,a){return s==null?s:ad(s,We(a,3),Gn)}function vM(s,a){return s&&Ni(s,We(a,3))}function xM(s,a){return s&&Zl(s,We(a,3))}function yM(s){return s==null?[]:nc(s,pn(s))}function SM(s){return s==null?[]:nc(s,Gn(s))}function Ru(s,a,u){var g=s==null?t:Qr(s,a);return g===t?u:g}function MM(s,a){return s!=null&&Wd(s,a,Xv)}function Cu(s,a){return s!=null&&Wd(s,a,Yv)}var EM=Nd(function(s,a,u){a!=null&&typeof a.toString!="function"&&(a=Va.call(a)),s[a]=u},Lu(Vn)),bM=Nd(function(s,a,u){a!=null&&typeof a.toString!="function"&&(a=Va.call(a)),Pt.call(s,a)?s[a].push(u):s[a]=[u]},We),TM=pt(Wo);function pn(s){return Hn(s)?ed(s):eu(s)}function Gn(s){return Hn(s)?ed(s,!0):nx(s)}function AM(s,a){var u={};return a=We(a,3),Ni(s,function(g,T,P){nr(u,a(g,T,P),g)}),u}function wM(s,a){var u={};return a=We(a,3),Ni(s,function(g,T,P){nr(u,T,a(g,T,P))}),u}var RM=Ds(function(s,a,u){ic(s,a,u)}),Tp=Ds(function(s,a,u,g){ic(s,a,u,g)}),CM=rr(function(s,a){var u={};if(s==null)return u;var g=!1;a=Wt(a,function(P){return P=Cr(P,s),g||(g=P.length>1),P}),Fi(s,pu(s),u),g&&(u=ai(u,p|m|x,Ex));for(var T=a.length;T--;)ou(u,a[T]);return u});function PM(s,a){return Ap(s,vc(We(a)))}var LM=rr(function(s,a){return s==null?{}:rx(s,a)});function Ap(s,a){if(s==null)return{};var u=Wt(pu(s),function(g){return[g]});return a=We(a),_d(s,u,function(g,T){return a(g,T[0])})}function IM(s,a,u){a=Cr(a,s);var g=-1,T=a.length;for(T||(T=1,s=t);++g<T;){var P=s==null?t:s[Bi(a[g])];P===t&&(g=T,P=u),s=or(P)?P.call(s):P}return s}function DM(s,a,u){return s==null?s:Yo(s,a,u)}function OM(s,a,u,g){return g=typeof g=="function"?g:t,s==null?s:Yo(s,a,u,g)}var wp=zd(pn),Rp=zd(Gn);function UM(s,a,u){var g=it(s),T=g||Lr(s)||Ns(s);if(a=We(a,4),u==null){var P=s&&s.constructor;T?u=g?new P:[]:jt(s)?u=or(P)?Is(Ya(s)):{}:u={}}return(T?ri:Ni)(s,function(z,H,X){return a(u,z,H,X)}),u}function NM(s,a){return s==null?!0:ou(s,a)}function FM(s,a,u){return s==null?s:Md(s,a,lu(u))}function BM(s,a,u,g){return g=typeof g=="function"?g:t,s==null?s:Md(s,a,lu(u),g)}function Fs(s){return s==null?[]:Hl(s,pn(s))}function zM(s){return s==null?[]:Hl(s,Gn(s))}function kM(s,a,u){return u===t&&(u=a,a=t),u!==t&&(u=ui(u),u=u===u?u:0),a!==t&&(a=ui(a),a=a===a?a:0),Jr(ui(s),a,u)}function HM(s,a,u){return a=ar(a),u===t?(u=a,a=0):u=ar(u),s=ui(s),jv(s,a,u)}function GM(s,a,u){if(u&&typeof u!="boolean"&&Dn(s,a,u)&&(a=u=t),u===t&&(typeof a=="boolean"?(u=a,a=t):typeof s=="boolean"&&(u=s,s=t)),s===t&&a===t?(s=0,a=1):(s=ar(s),a===t?(a=s,s=0):a=ar(a)),s>a){var g=s;s=a,a=g}if(u||s%1||a%1){var T=Jf();return En(s+T*(a-s+y0("1e-"+((T+"").length-1))),a)}return iu(s,a)}var VM=Os(function(s,a,u){return a=a.toLowerCase(),s+(u?Cp(a):a)});function Cp(s){return Pu(Rt(s).toLowerCase())}function Pp(s){return s=Rt(s),s&&s.replace(Fe,D0).replace(u0,"")}function WM(s,a,u){s=Rt(s),a=qn(a);var g=s.length;u=u===t?g:Jr(st(u),0,g);var T=u;return u-=a.length,u>=0&&s.slice(u,T)==a}function XM(s){return s=Rt(s),s&&dt.test(s)?s.replace(Re,O0):s}function YM(s){return s=Rt(s),s&&Di.test(s)?s.replace(Sn,"\\$&"):s}var jM=Os(function(s,a,u){return s+(u?"-":"")+a.toLowerCase()}),qM=Os(function(s,a,u){return s+(u?" ":"")+a.toLowerCase()}),KM=Dd("toLowerCase");function ZM(s,a,u){s=Rt(s),a=st(a);var g=a?ws(s):0;if(!a||g>=a)return s;var T=(a-g)/2;return lc(Za(T),u)+s+lc(Ka(T),u)}function $M(s,a,u){s=Rt(s),a=st(a);var g=a?ws(s):0;return a&&g<a?s+lc(a-g,u):s}function JM(s,a,u){s=Rt(s),a=st(a);var g=a?ws(s):0;return a&&g<a?lc(a-g,u)+s:s}function QM(s,a,u){return u||a==null?a=0:a&&(a=+a),ov(Rt(s).replace(Oi,""),a||0)}function eE(s,a,u){return(u?Dn(s,a,u):a===t)?a=1:a=st(a),ru(Rt(s),a)}function tE(){var s=arguments,a=Rt(s[0]);return s.length<3?a:a.replace(s[1],s[2])}var nE=Os(function(s,a,u){return s+(u?"_":"")+a.toLowerCase()});function iE(s,a,u){return u&&typeof u!="number"&&Dn(s,a,u)&&(a=u=t),u=u===t?Me:u>>>0,u?(s=Rt(s),s&&(typeof a=="string"||a!=null&&!wu(a))&&(a=qn(a),!a&&As(s))?Pr(_i(s),0,u):s.split(a,u)):[]}var rE=Os(function(s,a,u){return s+(u?" ":"")+Pu(a)});function sE(s,a,u){return s=Rt(s),u=u==null?0:Jr(st(u),0,s.length),a=qn(a),s.slice(u,u+a.length)==a}function oE(s,a,u){var g=R.templateSettings;u&&Dn(s,a,u)&&(a=t),s=Rt(s),a=Sc({},a,g,kd);var T=Sc({},a.imports,g.imports,kd),P=pn(T),z=Hl(T,P),H,X,ce=0,le=a.interpolate||ke,fe="__p += '",Ee=Vl((a.escape||ke).source+"|"+le.source+"|"+(le===At?wl:ke).source+"|"+(a.evaluate||ke).source+"|$","g"),Oe="//# sourceURL="+(Pt.call(a,"sourceURL")?(a.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++m0+"]")+`
`;s.replace(Ee,function(je,vt,Et,Zn,On,$n){return Et||(Et=Zn),fe+=s.slice(ce,$n).replace(Ze,U0),vt&&(H=!0,fe+=`' +
__e(`+vt+`) +
'`),On&&(X=!0,fe+=`';
`+On+`;
__p += '`),Et&&(fe+=`' +
((__t = (`+Et+`)) == null ? '' : __t) +
'`),ce=$n+je.length,je}),fe+=`';
`;var Ye=Pt.call(a,"variable")&&a.variable;if(!Ye)fe=`with (obj) {
`+fe+`
}
`;else if(Tl.test(Ye))throw new tt(l);fe=(X?fe.replace(S,""):fe).replace(Z,"$1").replace(oe,"$1;"),fe="function("+(Ye||"obj")+`) {
`+(Ye?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(H?", __e = _.escape":"")+(X?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+fe+`return __p
}`;var lt=Ip(function(){return wt(P,Oe+"return "+fe).apply(t,z)});if(lt.source=fe,Au(lt))throw lt;return lt}function aE(s){return Rt(s).toLowerCase()}function cE(s){return Rt(s).toUpperCase()}function lE(s,a,u){if(s=Rt(s),s&&(u||a===t))return Hf(s);if(!s||!(a=qn(a)))return s;var g=_i(s),T=_i(a),P=Gf(g,T),z=Vf(g,T)+1;return Pr(g,P,z).join("")}function uE(s,a,u){if(s=Rt(s),s&&(u||a===t))return s.slice(0,Xf(s)+1);if(!s||!(a=qn(a)))return s;var g=_i(s),T=Vf(g,_i(a))+1;return Pr(g,0,T).join("")}function hE(s,a,u){if(s=Rt(s),s&&(u||a===t))return s.replace(Oi,"");if(!s||!(a=qn(a)))return s;var g=_i(s),T=Gf(g,_i(a));return Pr(g,T).join("")}function fE(s,a){var u=y,g=F;if(jt(a)){var T="separator"in a?a.separator:T;u="length"in a?st(a.length):u,g="omission"in a?qn(a.omission):g}s=Rt(s);var P=s.length;if(As(s)){var z=_i(s);P=z.length}if(u>=P)return s;var H=u-ws(g);if(H<1)return g;var X=z?Pr(z,0,H).join(""):s.slice(0,H);if(T===t)return X+g;if(z&&(H+=X.length-H),wu(T)){if(s.slice(H).search(T)){var ce,le=X;for(T.global||(T=Vl(T.source,Rt(D.exec(T))+"g")),T.lastIndex=0;ce=T.exec(le);)var fe=ce.index;X=X.slice(0,fe===t?H:fe)}}else if(s.indexOf(qn(T),H)!=H){var Ee=X.lastIndexOf(T);Ee>-1&&(X=X.slice(0,Ee))}return X+g}function dE(s){return s=Rt(s),s&&_t.test(s)?s.replace(xe,G0):s}var pE=Os(function(s,a,u){return s+(u?" ":"")+a.toUpperCase()}),Pu=Dd("toUpperCase");function Lp(s,a,u){return s=Rt(s),a=u?t:a,a===t?F0(s)?X0(s):R0(s):s.match(a)||[]}var Ip=pt(function(s,a){try{return Yn(s,t,a)}catch(u){return Au(u)?u:new tt(u)}}),mE=rr(function(s,a){return ri(a,function(u){u=Bi(u),nr(s,u,bu(s[u],s))}),s});function gE(s){var a=s==null?0:s.length,u=We();return s=a?Wt(s,function(g){if(typeof g[1]!="function")throw new si(c);return[u(g[0]),g[1]]}):[],pt(function(g){for(var T=-1;++T<a;){var P=s[T];if(Yn(P[0],this,g))return Yn(P[1],this,g)}})}function _E(s){return Gv(ai(s,p))}function Lu(s){return function(){return s}}function vE(s,a){return s==null||s!==s?a:s}var xE=Ud(),yE=Ud(!0);function Vn(s){return s}function Iu(s){return hd(typeof s=="function"?s:ai(s,p))}function SE(s){return dd(ai(s,p))}function ME(s,a){return pd(s,ai(a,p))}var EE=pt(function(s,a){return function(u){return Wo(u,s,a)}}),bE=pt(function(s,a){return function(u){return Wo(s,u,a)}});function Du(s,a,u){var g=pn(a),T=nc(a,g);u==null&&!(jt(a)&&(T.length||!g.length))&&(u=a,a=s,s=this,T=nc(a,pn(a)));var P=!(jt(u)&&"chain"in u)||!!u.chain,z=or(s);return ri(T,function(H){var X=a[H];s[H]=X,z&&(s.prototype[H]=function(){var ce=this.__chain__;if(P||ce){var le=s(this.__wrapped__),fe=le.__actions__=kn(this.__actions__);return fe.push({func:X,args:arguments,thisArg:s}),le.__chain__=ce,le}return X.apply(s,br([this.value()],arguments))})}),s}function TE(){return _n._===this&&(_n._=$0),this}function Ou(){}function AE(s){return s=st(s),pt(function(a){return md(a,s)})}var wE=hu(Wt),RE=hu(Nf),CE=hu(Nl);function Dp(s){return vu(s)?Fl(Bi(s)):sx(s)}function PE(s){return function(a){return s==null?t:Qr(s,a)}}var LE=Fd(),IE=Fd(!0);function Uu(){return[]}function Nu(){return!1}function DE(){return{}}function OE(){return""}function UE(){return!0}function NE(s,a){if(s=st(s),s<1||s>K)return[];var u=Me,g=En(s,Me);a=We(a),s-=Me;for(var T=kl(g,a);++u<s;)a(u);return T}function FE(s){return it(s)?Wt(s,Bi):Kn(s)?[s]:kn(Qd(Rt(s)))}function BE(s){var a=++K0;return Rt(s)+a}var zE=cc(function(s,a){return s+a},0),kE=fu("ceil"),HE=cc(function(s,a){return s/a},1),GE=fu("floor");function VE(s){return s&&s.length?tc(s,Vn,$l):t}function WE(s,a){return s&&s.length?tc(s,We(a,2),$l):t}function XE(s){return zf(s,Vn)}function YE(s,a){return zf(s,We(a,2))}function jE(s){return s&&s.length?tc(s,Vn,tu):t}function qE(s,a){return s&&s.length?tc(s,We(a,2),tu):t}var KE=cc(function(s,a){return s*a},1),ZE=fu("round"),$E=cc(function(s,a){return s-a},0);function JE(s){return s&&s.length?zl(s,Vn):0}function QE(s,a){return s&&s.length?zl(s,We(a,2)):0}return R.after=SS,R.ary=up,R.assign=cM,R.assignIn=bp,R.assignInWith=Sc,R.assignWith=lM,R.at=uM,R.before=hp,R.bind=bu,R.bindAll=mE,R.bindKey=fp,R.castArray=DS,R.chain=ap,R.chunk=Gx,R.compact=Vx,R.concat=Wx,R.cond=gE,R.conforms=_E,R.constant=Lu,R.countBy=Jy,R.create=hM,R.curry=dp,R.curryRight=pp,R.debounce=mp,R.defaults=fM,R.defaultsDeep=dM,R.defer=MS,R.delay=ES,R.difference=Xx,R.differenceBy=Yx,R.differenceWith=jx,R.drop=qx,R.dropRight=Kx,R.dropRightWhile=Zx,R.dropWhile=$x,R.fill=Jx,R.filter=eS,R.flatMap=iS,R.flatMapDeep=rS,R.flatMapDepth=sS,R.flatten=ip,R.flattenDeep=Qx,R.flattenDepth=ey,R.flip=bS,R.flow=xE,R.flowRight=yE,R.fromPairs=ty,R.functions=yM,R.functionsIn=SM,R.groupBy=oS,R.initial=iy,R.intersection=ry,R.intersectionBy=sy,R.intersectionWith=oy,R.invert=EM,R.invertBy=bM,R.invokeMap=cS,R.iteratee=Iu,R.keyBy=lS,R.keys=pn,R.keysIn=Gn,R.map=mc,R.mapKeys=AM,R.mapValues=wM,R.matches=SE,R.matchesProperty=ME,R.memoize=_c,R.merge=RM,R.mergeWith=Tp,R.method=EE,R.methodOf=bE,R.mixin=Du,R.negate=vc,R.nthArg=AE,R.omit=CM,R.omitBy=PM,R.once=TS,R.orderBy=uS,R.over=wE,R.overArgs=AS,R.overEvery=RE,R.overSome=CE,R.partial=Tu,R.partialRight=gp,R.partition=hS,R.pick=LM,R.pickBy=Ap,R.property=Dp,R.propertyOf=PE,R.pull=uy,R.pullAll=sp,R.pullAllBy=hy,R.pullAllWith=fy,R.pullAt=dy,R.range=LE,R.rangeRight=IE,R.rearg=wS,R.reject=pS,R.remove=py,R.rest=RS,R.reverse=Mu,R.sampleSize=gS,R.set=DM,R.setWith=OM,R.shuffle=_S,R.slice=my,R.sortBy=yS,R.sortedUniq=My,R.sortedUniqBy=Ey,R.split=iE,R.spread=CS,R.tail=by,R.take=Ty,R.takeRight=Ay,R.takeRightWhile=wy,R.takeWhile=Ry,R.tap=Vy,R.throttle=PS,R.thru=pc,R.toArray=Sp,R.toPairs=wp,R.toPairsIn=Rp,R.toPath=FE,R.toPlainObject=Ep,R.transform=UM,R.unary=LS,R.union=Cy,R.unionBy=Py,R.unionWith=Ly,R.uniq=Iy,R.uniqBy=Dy,R.uniqWith=Oy,R.unset=NM,R.unzip=Eu,R.unzipWith=op,R.update=FM,R.updateWith=BM,R.values=Fs,R.valuesIn=zM,R.without=Uy,R.words=Lp,R.wrap=IS,R.xor=Ny,R.xorBy=Fy,R.xorWith=By,R.zip=zy,R.zipObject=ky,R.zipObjectDeep=Hy,R.zipWith=Gy,R.entries=wp,R.entriesIn=Rp,R.extend=bp,R.extendWith=Sc,Du(R,R),R.add=zE,R.attempt=Ip,R.camelCase=VM,R.capitalize=Cp,R.ceil=kE,R.clamp=kM,R.clone=OS,R.cloneDeep=NS,R.cloneDeepWith=FS,R.cloneWith=US,R.conformsTo=BS,R.deburr=Pp,R.defaultTo=vE,R.divide=HE,R.endsWith=WM,R.eq=xi,R.escape=XM,R.escapeRegExp=YM,R.every=Qy,R.find=tS,R.findIndex=tp,R.findKey=pM,R.findLast=nS,R.findLastIndex=np,R.findLastKey=mM,R.floor=GE,R.forEach=cp,R.forEachRight=lp,R.forIn=gM,R.forInRight=_M,R.forOwn=vM,R.forOwnRight=xM,R.get=Ru,R.gt=zS,R.gte=kS,R.has=MM,R.hasIn=Cu,R.head=rp,R.identity=Vn,R.includes=aS,R.indexOf=ny,R.inRange=HM,R.invoke=TM,R.isArguments=ns,R.isArray=it,R.isArrayBuffer=HS,R.isArrayLike=Hn,R.isArrayLikeObject=en,R.isBoolean=GS,R.isBuffer=Lr,R.isDate=VS,R.isElement=WS,R.isEmpty=XS,R.isEqual=YS,R.isEqualWith=jS,R.isError=Au,R.isFinite=qS,R.isFunction=or,R.isInteger=_p,R.isLength=xc,R.isMap=vp,R.isMatch=KS,R.isMatchWith=ZS,R.isNaN=$S,R.isNative=JS,R.isNil=eM,R.isNull=QS,R.isNumber=xp,R.isObject=jt,R.isObjectLike=$t,R.isPlainObject=Zo,R.isRegExp=wu,R.isSafeInteger=tM,R.isSet=yp,R.isString=yc,R.isSymbol=Kn,R.isTypedArray=Ns,R.isUndefined=nM,R.isWeakMap=iM,R.isWeakSet=rM,R.join=ay,R.kebabCase=jM,R.last=li,R.lastIndexOf=cy,R.lowerCase=qM,R.lowerFirst=KM,R.lt=sM,R.lte=oM,R.max=VE,R.maxBy=WE,R.mean=XE,R.meanBy=YE,R.min=jE,R.minBy=qE,R.stubArray=Uu,R.stubFalse=Nu,R.stubObject=DE,R.stubString=OE,R.stubTrue=UE,R.multiply=KE,R.nth=ly,R.noConflict=TE,R.noop=Ou,R.now=gc,R.pad=ZM,R.padEnd=$M,R.padStart=JM,R.parseInt=QM,R.random=GM,R.reduce=fS,R.reduceRight=dS,R.repeat=eE,R.replace=tE,R.result=IM,R.round=ZE,R.runInContext=W,R.sample=mS,R.size=vS,R.snakeCase=nE,R.some=xS,R.sortedIndex=gy,R.sortedIndexBy=_y,R.sortedIndexOf=vy,R.sortedLastIndex=xy,R.sortedLastIndexBy=yy,R.sortedLastIndexOf=Sy,R.startCase=rE,R.startsWith=sE,R.subtract=$E,R.sum=JE,R.sumBy=QE,R.template=oE,R.times=NE,R.toFinite=ar,R.toInteger=st,R.toLength=Mp,R.toLower=aE,R.toNumber=ui,R.toSafeInteger=aM,R.toString=Rt,R.toUpper=cE,R.trim=lE,R.trimEnd=uE,R.trimStart=hE,R.truncate=fE,R.unescape=dE,R.uniqueId=BE,R.upperCase=pE,R.upperFirst=Pu,R.each=cp,R.eachRight=lp,R.first=rp,Du(R,function(){var s={};return Ni(R,function(a,u){Pt.call(R.prototype,u)||(s[u]=a)}),s}(),{chain:!1}),R.VERSION=n,ri(["bind","bindKey","curry","curryRight","partial","partialRight"],function(s){R[s].placeholder=R}),ri(["drop","take"],function(s,a){xt.prototype[s]=function(u){u=u===t?1:cn(st(u),0);var g=this.__filtered__&&!a?new xt(this):this.clone();return g.__filtered__?g.__takeCount__=En(u,g.__takeCount__):g.__views__.push({size:En(u,Me),type:s+(g.__dir__<0?"Right":"")}),g},xt.prototype[s+"Right"]=function(u){return this.reverse()[s](u).reverse()}}),ri(["filter","map","takeWhile"],function(s,a){var u=a+1,g=u==q||u==se;xt.prototype[s]=function(T){var P=this.clone();return P.__iteratees__.push({iteratee:We(T,3),type:u}),P.__filtered__=P.__filtered__||g,P}}),ri(["head","last"],function(s,a){var u="take"+(a?"Right":"");xt.prototype[s]=function(){return this[u](1).value()[0]}}),ri(["initial","tail"],function(s,a){var u="drop"+(a?"":"Right");xt.prototype[s]=function(){return this.__filtered__?new xt(this):this[u](1)}}),xt.prototype.compact=function(){return this.filter(Vn)},xt.prototype.find=function(s){return this.filter(s).head()},xt.prototype.findLast=function(s){return this.reverse().find(s)},xt.prototype.invokeMap=pt(function(s,a){return typeof s=="function"?new xt(this):this.map(function(u){return Wo(u,s,a)})}),xt.prototype.reject=function(s){return this.filter(vc(We(s)))},xt.prototype.slice=function(s,a){s=st(s);var u=this;return u.__filtered__&&(s>0||a<0)?new xt(u):(s<0?u=u.takeRight(-s):s&&(u=u.drop(s)),a!==t&&(a=st(a),u=a<0?u.dropRight(-a):u.take(a-s)),u)},xt.prototype.takeRightWhile=function(s){return this.reverse().takeWhile(s).reverse()},xt.prototype.toArray=function(){return this.take(Me)},Ni(xt.prototype,function(s,a){var u=/^(?:filter|find|map|reject)|While$/.test(a),g=/^(?:head|last)$/.test(a),T=R[g?"take"+(a=="last"?"Right":""):a],P=g||/^find/.test(a);T&&(R.prototype[a]=function(){var z=this.__wrapped__,H=g?[1]:arguments,X=z instanceof xt,ce=H[0],le=X||it(z),fe=function(vt){var Et=T.apply(R,br([vt],H));return g&&Ee?Et[0]:Et};le&&u&&typeof ce=="function"&&ce.length!=1&&(X=le=!1);var Ee=this.__chain__,Oe=!!this.__actions__.length,Ye=P&&!Ee,lt=X&&!Oe;if(!P&&le){z=lt?z:new xt(this);var je=s.apply(z,H);return je.__actions__.push({func:pc,args:[fe],thisArg:t}),new oi(je,Ee)}return Ye&&lt?s.apply(this,H):(je=this.thru(fe),Ye?g?je.value()[0]:je.value():je)})}),ri(["pop","push","shift","sort","splice","unshift"],function(s){var a=ka[s],u=/^(?:push|sort|unshift)$/.test(s)?"tap":"thru",g=/^(?:pop|shift)$/.test(s);R.prototype[s]=function(){var T=arguments;if(g&&!this.__chain__){var P=this.value();return a.apply(it(P)?P:[],T)}return this[u](function(z){return a.apply(it(z)?z:[],T)})}}),Ni(xt.prototype,function(s,a){var u=R[a];if(u){var g=u.name+"";Pt.call(Ls,g)||(Ls[g]=[]),Ls[g].push({name:a,func:u})}}),Ls[ac(t,_).name]=[{name:"wrapper",func:t}],xt.prototype.clone=dv,xt.prototype.reverse=pv,xt.prototype.value=mv,R.prototype.at=Wy,R.prototype.chain=Xy,R.prototype.commit=Yy,R.prototype.next=jy,R.prototype.plant=Ky,R.prototype.reverse=Zy,R.prototype.toJSON=R.prototype.valueOf=R.prototype.value=$y,R.prototype.first=R.prototype.head,Fo&&(R.prototype[Fo]=qy),R},Rs=Y0();qr?((qr.exports=Rs)._=Rs,Il._=Rs):_n._=Rs}).call(IP)}(ma,ma.exports)),ma.exports}var OP=DP();class Mh{constructor(e,t){this._path=e,this._ctor=t}_promise=null;_instance=null;async get(){return this._instance?Promise.resolve(this._instance):this._promise?this._promise:(this._promise=(async()=>{const t=(await import(this._path))[this._ctor];if(!t)throw new Error(`DIVE: Module class ${this._ctor} not found in ${this._path}`);if(typeof t!="function")throw new Error(`DIVE: Module at ${this._path} does not export a valid constructor (${this._ctor} wanted)`);return this._instance=new t,this._instance})(),this._promise)}}class Cn{static __instances=[];static get(e){const t=this.__instances.find(n=>n.id===e);return t||this.__instances.find(n=>Array.from(n.registered.values()).find(r=>r.id===e))}_id;get id(){return this._id}renderer;scene;controller;toolbox;_mediaGenerator=new Mh("../mediacreator/MediaCreator.ts","DIVEMediaCreator");_io=new Mh("../io/IO.ts","DIVEIO");_ar=new Mh("../ar/AR.ts","DIVEAR");registered=new Map;listeners=new Map;constructor(e,t,n,r){this._id=yP(),this.renderer=e,this.scene=t,this.controller=n,this.toolbox=r,Cn.__instances.push(this)}DestroyInstance(){const e=Cn.__instances.findIndex(t=>t.id===this.id);return e===-1?!1:(Cn.__instances.splice(e,1),!0)}PerformAction(e,t){let n=!1;switch(e){case"START_RENDER":{this.renderer.StartRenderer(this.scene,this.controller.object),n=!0;break}case"GET_ALL_SCENE_DATA":{n=this.getAllSceneData(t);break}case"GET_ALL_OBJECTS":{n=this.getAllObjects(t);break}case"GET_OBJECTS":{n=this.getObjects(t);break}case"ADD_OBJECT":{n=this.addObject(t);break}case"UPDATE_OBJECT":{n=this.updateObject(t);break}case"DELETE_OBJECT":{n=this.deleteObject(t);break}case"SELECT_OBJECT":{n=this.selectObject(t);break}case"DESELECT_OBJECT":{n=this.deselectObject(t);break}case"SET_BACKGROUND":{n=this.setBackground(t);break}case"DROP_IT":{n=this.dropIt(t);break}case"PLACE_ON_FLOOR":{n=this.placeOnFloor(t);break}case"SET_CAMERA_TRANSFORM":{n=this.setCameraTransform(t);break}case"GET_CAMERA_TRANSFORM":{n=this.getCameraTransform(t);break}case"MOVE_CAMERA":{n=this.moveCamera(t);break}case"RESET_CAMERA":{n=this.resetCamera(t);break}case"COMPUTE_ENCOMPASSING_VIEW":{n=this.computeEncompassingView(t);break}case"SET_CAMERA_LAYER":{n=this.setCameraLayer(t);break}case"ZOOM_CAMERA":{n=this.zoomCamera(t);break}case"SET_GIZMO_MODE":{n=this.setGizmoMode(t);break}case"SET_GIZMO_VISIBILITY":{n=this.setGizmoVisibility(t);break}case"SET_GIZMO_SCALE_LINKED":{n=this.setGizmoScaleLinked(t);break}case"USE_TOOL":{n=this.useTool(t);break}case"MODEL_LOADED":{n=this.modelLoaded(t);break}case"UPDATE_SCENE":{n=this.updateScene(t);break}case"GENERATE_MEDIA":{n=this.generateMedia(t);break}case"SET_PARENT":{n=this.setParent(t);break}case"EXPORT_SCENE":{n=this.exportScene(t);break}case"LAUNCH_AR":{const{uri:r,options:o}=t;n=new Promise((c,l)=>{this._ar.get().then(h=>{c(h.launch(r,o))}).catch(l)});break}default:console.warn(`DIVECommunication.PerformAction: has been executed with unknown Action type ${e}`)}return this.dispatch(e,t),n}Subscribe(e,t){return this.listeners.get(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),()=>{const n=this.listeners.get(e);if(!n)return!1;const r=n.findIndex(o=>o===t);return r===-1?!1:(n.splice(r,1),!0)}}dispatch(e,t){const n=this.listeners.get(e);n&&n.forEach(r=>r(t))}getAllSceneData(e){const t={name:this.scene.name,mediaItem:null,backgroundColor:"#"+this.scene.background.getHexString(),floorEnabled:this.scene.Floor.visible,floorColor:"#"+this.scene.Floor.material.color.getHexString(),userCamera:{position:this.controller.object.position.clone(),target:this.controller.target.clone()},spotmarks:[],lights:Array.from(this.registered.values()).filter(n=>n.entityType==="light"),objects:Array.from(this.registered.values()).filter(n=>n.entityType==="model"),cameras:Array.from(this.registered.values()).filter(n=>n.entityType==="pov"),primitives:Array.from(this.registered.values()).filter(n=>n.entityType==="primitive"),groups:Array.from(this.registered.values()).filter(n=>n.entityType==="group")};return Object.assign(e,t),t}getAllObjects(e){return Object.assign(e,this.registered),this.registered}getObjects(e){if(e.ids.length===0)return[];const t=[];return this.registered.forEach(n=>{e.ids.includes(n.id)&&t.push(n)}),t}addObject(e){return this.registered.get(e.id)?!1:(e.parentId===void 0&&(e.parentId=null),this.registered.set(e.id,e),this.scene.AddSceneObject(e),!0)}updateObject(e){const t=this.registered.get(e.id);if(!t)return!1;this.registered.set(e.id,OP.merge(t,e));const n=this.registered.get(e.id);return this.scene.UpdateSceneObject({...e,id:n.id,entityType:n.entityType}),Object.assign(e,n),!0}deleteObject(e){const t=this.registered.get(e.id);return t?(t.parentId&&this.setParent({object:{id:t.id},parent:null}),t.entityType==="group"&&this.registered.forEach(n=>{n.parentId===t.id&&this.updateObject({id:n.id,parentId:null})}),Object.assign(e,t),this.registered.delete(e.id),Array.from(this.registered.values()).forEach(n=>{n.parentId&&n.parentId===e.id&&(n.parentId=null)}),this.scene.DeleteSceneObject(t),!0):!1}selectObject(e){const t=this.registered.get(e.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n||!("isSelectable"in n))return!1;const r=this.toolbox.GetActiveTool();return r&&Ng(r)&&r.AttachGizmo(n),Object.assign(e,t),!0}deselectObject(e){const t=this.registered.get(e.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n||!("isSelectable"in n))return!1;const r=this.toolbox.GetActiveTool();return r&&Ng(r)&&r.DetachGizmo(),Object.assign(e,t),!0}setBackground(e){return this.scene.SetBackground(e.color),!0}dropIt(e){const t=this.registered.get(e.id);return t?(this.scene.GetSceneObject(t).DropIt(),!0):!1}placeOnFloor(e){const t=this.registered.get(e.id);return t?(this.scene.PlaceOnFloor(t),!0):!1}setCameraTransform(e){return this.controller.object.position.copy(e.position),this.controller.target.copy(e.target),this.controller.update(),!0}getCameraTransform(e){const t={position:this.controller.object.position.clone(),target:this.controller.target.clone()};return Object.assign(e,t),t}moveCamera(e){let t={x:0,y:0,z:0},n={x:0,y:0,z:0};return"id"in e?(t=this.registered.get(e.id).position,n=this.registered.get(e.id).target):(t=e.position,n=e.target),this.controller.MoveTo(t,n,e.duration,e.locked),!0}setCameraLayer(e){return this.controller.object.SetCameraLayer(e.layer),!0}resetCamera(e){return this.controller.RevertLast(e.duration),!0}computeEncompassingView(e){const t=this.scene.ComputeSceneBB(),n=this.controller.ComputeEncompassingView(t);return Object.assign(e,n),n}zoomCamera(e){return e.direction==="IN"&&this.controller.ZoomIn(e.by),e.direction==="OUT"&&this.controller.ZoomOut(e.by),!0}setGizmoMode(e){return this.toolbox.SetGizmoMode(e.mode),!0}setGizmoVisibility(e){return this.toolbox.SetGizmoVisibility(e),e}setGizmoScaleLinked(e){return this.toolbox.SetGizmoScaleLinked(e),e}useTool(e){return this.toolbox.UseTool(e.tool),!0}modelLoaded(e){return this.registered.get(e.id).loaded=!0,!0}updateScene(e){return e.name!==void 0&&(this.scene.name=e.name),e.backgroundColor!==void 0&&this.scene.SetBackground(e.backgroundColor),e.gridEnabled!==void 0&&this.scene.Grid.SetVisibility(e.gridEnabled),e.floorEnabled!==void 0&&this.scene.Floor.SetVisibility(e.floorEnabled),e.floorColor!==void 0&&this.scene.Floor.SetColor(e.floorColor),e.name=this.scene.name,e.backgroundColor="#"+this.scene.background.getHexString(),e.gridEnabled=this.scene.Grid.visible,e.floorEnabled=this.scene.Floor.visible,e.floorColor="#"+this.scene.Floor.material.color.getHexString(),!0}generateMedia(e){let t={x:0,y:0,z:0},n={x:0,y:0,z:0};return"id"in e?(t=this.registered.get(e.id).position,n=this.registered.get(e.id).target):(t=e.position,n=e.target),this._mediaGenerator.get().then(r=>r.GenerateMedia(t,n,e.width,e.height))}setParent(e){const t=this.registered.get(e.object.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n)return!1;if(e.parent===null)return this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0;if(e.object.id===e.parent.id)return!1;const r=this.registered.get(e.parent.id);if(!r)return this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0;const o=this.scene.GetSceneObject(r);return o?(o.attach(n),this.updateObject({id:t.id,parentId:r.id}),!0):(this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0)}exportScene(e){return new Promise((t,n)=>{this._io.get().then(r=>{t(r.Export(e.type))}).catch(n)})}}class UP extends mt{isDIVELight=!0;isDIVEPointLight=!0;isMovable=!0;isSelectable=!0;gizmo=null;light;mesh;constructor(){super(),this.name="DIVEPointLight",this.light=new B_(16777215,1),this.light.layers.mask=ti,this.light.castShadow=!0,this.light.shadow.mapSize.width=512,this.light.shadow.mapSize.height=512,this.add(this.light);const e=.1,t=new Pa(e,e*320,e*320),n=new Wi({color:this.light.color,transparent:!0,opacity:.8,side:Yi});this.mesh=new ye(t,n),this.mesh.layers.mask=mf,this.add(this.mesh)}SetColor(e){this.light.color=e,this.mesh.material.color=e}SetIntensity(e){this.light.intensity=e,this.mesh.material.opacity=e>.8?.8:e*.8}SetEnabled(e){this.light.visible=e}onMove(){Cn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.position})}onSelect(){Cn.get(this.userData.id)?.PerformAction("SELECT_OBJECT",{id:this.userData.id})}onDeselect(){Cn.get(this.userData.id)?.PerformAction("DESELECT_OBJECT",{id:this.userData.id})}}class NP extends mt{isDIVELight=!0;isDIVESceneLight=!0;_hemiLight;_dirLight;constructor(){super(),this.name="DIVESceneLight",this._hemiLight=new JC(16777215,16777215,2),this._hemiLight.layers.mask=ti,this._hemiLight.position.set(0,50,0),this.add(this._hemiLight),this._dirLight=new ff(16777215,3),this._dirLight.layers.mask=ti,this._dirLight.position.set(1,1.75,1),this._dirLight.position.multiplyScalar(30),this._dirLight.castShadow=!0,this._dirLight.shadow.mapSize.width=2048,this._dirLight.shadow.mapSize.height=2048;const e=5;this._dirLight.shadow.camera.left=-5,this._dirLight.shadow.camera.right=e,this._dirLight.shadow.camera.top=e,this._dirLight.shadow.camera.bottom=-5,this._dirLight.shadow.camera.far=3500,this.add(this._dirLight)}SetColor(e){this._hemiLight.color=e,this._dirLight.color=e}SetIntensity(e){this._hemiLight.intensity=e*2,this._dirLight.intensity=e*3}SetEnabled(e){this._hemiLight.visible=e,this._dirLight.visible=e}}const gf=i=>i.parent?gf(i.parent):i;class FP{isMovable=!0}class BP{isSelectable=!0}function zP(i,e){return e.forEach(t=>{Object.getOwnPropertyNames(t.prototype).forEach(n=>{Object.defineProperty(i.prototype,n,Object.getOwnPropertyDescriptor(t.prototype,n))})}),i}class _f extends zP(mt,[BP,FP]){isDIVENode=!0;gizmo=null;_positionWorldBuffer;_boundingBox;constructor(){super(),this.layers.mask=ti,this._positionWorldBuffer=new N,this._boundingBox=new Ii}SetPosition(e){if(!this.parent){this.position.set(e.x,e.y,e.z);return}const t=new N(e.x,e.y,e.z);this.position.copy(this.parent.worldToLocal(t)),"isDIVEGroup"in this.parent&&this.parent.UpdateLineTo(this)}SetRotation(e){this.rotation.set(e.x,e.y,e.z)}SetScale(e){this.scale.set(e.x,e.y,e.z)}SetVisibility(e){this.visible=e}SetToWorldOrigin(){this.position.set(0,0,0),Cn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})}onMove(){Cn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})}onSelect(){Cn.get(this.userData.id)?.PerformAction("SELECT_OBJECT",{id:this.userData.id})}onDeselect(){Cn.get(this.userData.id)?.PerformAction("DESELECT_OBJECT",{id:this.userData.id})}}class kP extends _f{isDIVEModel=!0;_mesh=null;_material=null;SetModel(e){this.clear(),this._boundingBox.makeEmpty(),e.traverse(t=>{t.castShadow=!0,t.receiveShadow=!0,t.layers.mask=this.layers.mask,this._boundingBox.expandByObject(t),!this._mesh&&"isMesh"in t&&(this._mesh=t,this._material?this._mesh.material=this._material:this._material=t.material)}),this.add(e)}SetMaterial(e){this._material||(this._material=new Ro),e.vertexColors!==void 0&&(this._material.vertexColors=e.vertexColors),e.color!==void 0&&this._material.color.set(e.color),e.map!==void 0&&(this._material.map=e.map),e.normalMap!==void 0&&(this._material.normalMap=e.normalMap),e.roughness!==void 0&&(this._material.roughness=e.roughness),e.roughnessMap!==void 0&&(this._material.roughnessMap=e.roughnessMap,this._material.roughnessMap&&(this._material.roughness=1)),e.metalness!==void 0&&(this._material.metalness=e.metalness),e.metalnessMap!==void 0&&(this._material.metalnessMap=e.metalnessMap,this._material.metalnessMap&&(this._material.metalness=1)),this._mesh&&(this._mesh.material=this._material)}PlaceOnFloor(){const e=this.getWorldPosition(this._positionWorldBuffer),t=e.clone();this._mesh?.geometry?.computeBoundingBox();const n=this._mesh?.geometry?.boundingBox;!n||!this._mesh||(e.y=e.y-this._mesh.localToWorld(n.min.clone()).y,e.y!==t.y&&Cn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale}))}DropIt(){if(!this.parent){console.warn("DIVEModel: DropIt() called on a model that is not in the scene.",this);return}const e=this._boundingBox.min.y*this.scale.y,t=this.localToWorld(this._boundingBox.getCenter(new N).multiply(this.scale));t.y=e+this.position.y;const n=new El(t,new N(0,-1,0));n.layers.mask=ti;const r=n.intersectObjects(gf(this).Root.children,!0);if(r.length>0){const o=r[0].object;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox,l=o.localToWorld(c.max.clone()),h=this.position.clone(),f=this.position.clone().setY(l.y).sub(new N(0,e,0));if(this.position.copy(f),this.position.y===h.y)return;this.onMove()}}}class HP extends _f{isDIVEPrimitive=!0;_mesh;constructor(){super(),this._mesh=new ye,this._mesh.layers.mask=ti,this._mesh.castShadow=!0,this._mesh.receiveShadow=!0,this._mesh.material=new Ro,this.add(this._mesh)}SetGeometry(e){const t=this.assembleGeometry(e);t&&(this._mesh.geometry=t,this._boundingBox.setFromObject(this._mesh))}SetMaterial(e){const t=this._mesh.material;e.vertexColors!==void 0&&(t.vertexColors=e.vertexColors),e.color!==void 0&&(t.color=new Ne(e.color)),e.map!==void 0&&(t.map=e.map),e.normalMap!==void 0&&(t.normalMap=e.normalMap),e.roughness!==void 0&&(t.roughness=e.roughness),e.roughnessMap!==void 0&&(t.roughnessMap=e.roughnessMap,t.roughnessMap&&(t.roughness=1)),e.metalness!==void 0&&(t.metalness=e.metalness),e.metalnessMap!==void 0&&(t.metalnessMap=e.metalnessMap,t.metalnessMap&&(t.metalness=0)),this._mesh&&(this._mesh.material=t)}PlaceOnFloor(){const e=this.getWorldPosition(this._positionWorldBuffer),t=e.clone();this._mesh?.geometry?.computeBoundingBox();const n=this._mesh?.geometry?.boundingBox;!n||!this._mesh||(e.y=e.y-this._mesh.localToWorld(n.min.clone()).y,e.y!==t.y&&Cn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale}))}DropIt(){if(!this.parent){console.warn("DIVEPrimitive: DropIt() called on a model that is not in the scene.",this);return}const e=this._boundingBox.min.y*this.scale.y,t=this.localToWorld(this._boundingBox.getCenter(new N).multiply(this.scale));t.y=e+this.position.y;const n=new El(t,new N(0,-1,0));n.layers.mask=ti;const r=n.intersectObjects(gf(this).Root.children,!0);if(r.length>0){const o=r[0].object;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox,l=o.localToWorld(c.max.clone()),h=this.position.clone(),f=this.position.clone().setY(l.y).sub(new N(0,e,0));if(this.position.copy(f),this.position.y===h.y)return;this.onMove()}}assembleGeometry(e){switch(this._mesh.material.flatShading=!1,e.name.toLowerCase()){case"cylinder":return this.createCylinderGeometry(e);case"sphere":return this.createSphereGeometry(e);case"pyramid":return this._mesh.material.flatShading=!0,this.createPyramidGeometry(e);case"cube":case"box":return this.createBoxGeometry(e);case"cone":return this.createConeGeometry(e);case"wall":return this.createWallGeometry(e);case"plane":return this.createPlaneGeometry(e);default:return console.warn("DIVEPrimitive.assembleGeometry: Invalid geometry type:",e.name.toLowerCase()),null}}createCylinderGeometry(e){const t=new gn(e.width/2,e.width/2,e.height,64);return t.translate(0,e.height/2,0),t}createSphereGeometry(e){return new Pa(e.width/2,256,256)}createPyramidGeometry(e){const t=new Float32Array([-e.width/2,0,-e.depth/2,e.width/2,0,-e.depth/2,e.width/2,0,e.depth/2,-e.width/2,0,e.depth/2,0,e.height,0]),n=new Uint16Array([0,1,2,0,2,3,0,4,1,1,4,2,2,4,3,3,4,0]),r=new Jt;return r.setAttribute("position",new nn(t,3)),r.setIndex(new nn(n,1)),r.computeVertexNormals(),r.computeBoundingBox(),r.computeBoundingSphere(),r}createBoxGeometry(e){const t=new qt(e.width,e.height,e.depth);return t.translate(0,e.height/2,0),t}createConeGeometry(e){const t=new lf(e.width/2,e.height,256);return t.translate(0,e.height/2,0),t}createWallGeometry(e){const t=new qt(e.width,e.height,e.depth||.05,16);return t.translate(0,e.height/2,0),t}createPlaneGeometry(e){const t=new qt(e.width,e.height,e.depth);return t.translate(0,e.height/2,0),t}}class GP extends _f{isDIVEGroup=!0;_members;get members(){return this._members}_lines;constructor(){super(),this.name="DIVEGroup",this._members=[],this._lines=[]}SetPosition(e){super.SetPosition(e),this._members.forEach(t=>{"isDIVENode"in t&&t.onMove()})}SetLinesVisibility(e,t){if(!t){this._lines.forEach(r=>{r.visible=e});return}const n=this._members.indexOf(t);n!==-1&&(this._lines[n].visible=e)}attach(e){if(this._members.includes(e))return this;const t=this.createLine();return this.add(t),this._lines.push(t),super.attach(e),this._members.push(e),this.updateLineTo(t,e),this.SetLinesVisibility(!0,e),this}remove(e){const t=this._members.indexOf(e);if(t===-1)return this;const n=this._lines[t];return super.remove(n),this._lines.splice(t,1),super.remove(e),this._members.splice(t,1),this}UpdateLineTo(e){const t=this._members.indexOf(e);t!==-1&&this.updateLineTo(this._lines[t],e)}createLine(){const e=new Jt,t=new BC({color:6710886,dashSize:.05,gapSize:.025}),n=new di(e,t);return n.visible=!1,n}updateLineTo(e,t){e.geometry.setFromPoints([new N(0,0,0),t.position.clone()]),e.computeLineDistances()}}function Bg(i,e){if(e===jb)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Uh||e===c_){let t=i.getIndex();if(t===null){const c=[],l=i.getAttribute("position");if(l!==void 0){for(let h=0;h<l.count;h++)c.push(h);i.setIndex(c),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===Uh)for(let c=1;c<=n;c++)r.push(t.getX(0)),r.push(t.getX(c)),r.push(t.getX(c+1));else for(let c=0;c<n;c++)c%2===0?(r.push(t.getX(c)),r.push(t.getX(c+1)),r.push(t.getX(c+2))):(r.push(t.getX(c+2)),r.push(t.getX(c+1)),r.push(t.getX(c)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const o=i.clone();return o.setIndex(r),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class VP extends Ms{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new qP(t)}),this.register(function(t){return new iL(t)}),this.register(function(t){return new rL(t)}),this.register(function(t){return new sL(t)}),this.register(function(t){return new ZP(t)}),this.register(function(t){return new $P(t)}),this.register(function(t){return new JP(t)}),this.register(function(t){return new QP(t)}),this.register(function(t){return new jP(t)}),this.register(function(t){return new eL(t)}),this.register(function(t){return new KP(t)}),this.register(function(t){return new nL(t)}),this.register(function(t){return new tL(t)}),this.register(function(t){return new XP(t)}),this.register(function(t){return new oL(t)}),this.register(function(t){return new aL(t)})}load(e,t,n,r){const o=this;let c;if(this.resourcePath!=="")c=this.resourcePath;else if(this.path!==""){const f=Sa.extractUrlBase(e);c=Sa.resolveURL(f,this.path)}else c=Sa.extractUrlBase(e);this.manager.itemStart(e);const l=function(f){r?r(f):console.error(f),o.manager.itemError(e),o.manager.itemEnd(e)},h=new ml(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(e,function(f){try{o.parse(f,c,function(d){t(d),o.manager.itemEnd(e)},l)}catch(d){l(d)}},n,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let o;const c={},l={},h=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(h.decode(new Uint8Array(e,0,4))===V_){try{c[yt.KHR_BINARY_GLTF]=new cL(e)}catch(p){r&&r(p);return}o=JSON.parse(c[yt.KHR_BINARY_GLTF].content)}else o=JSON.parse(h.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const f=new SL(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});f.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const p=this.pluginCallbacks[d](f);p.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[p.name]=p,c[p.name]=!0}if(o.extensionsUsed)for(let d=0;d<o.extensionsUsed.length;++d){const p=o.extensionsUsed[d],m=o.extensionsRequired||[];switch(p){case yt.KHR_MATERIALS_UNLIT:c[p]=new YP;break;case yt.KHR_DRACO_MESH_COMPRESSION:c[p]=new lL(o,this.dracoLoader);break;case yt.KHR_TEXTURE_TRANSFORM:c[p]=new uL;break;case yt.KHR_MESH_QUANTIZATION:c[p]=new hL;break;default:m.indexOf(p)>=0&&l[p]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+p+'".')}}f.setExtensions(c),f.setPlugins(l),f.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,o){n.parse(e,t,r,o)})}}function WP(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const yt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class XP{constructor(e){this.parser=e,this.name=yt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const o=t.json,h=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e];let f;const d=new Ne(16777215);h.color!==void 0&&d.setRGB(h.color[0],h.color[1],h.color[2],yn);const p=h.range!==void 0?h.range:0;switch(h.type){case"directional":f=new ff(d),f.target.position.set(0,0,-1),f.add(f.target);break;case"point":f=new B_(d),f.distance=p;break;case"spot":f=new eP(d),f.distance=p,h.spot=h.spot||{},h.spot.innerConeAngle=h.spot.innerConeAngle!==void 0?h.spot.innerConeAngle:0,h.spot.outerConeAngle=h.spot.outerConeAngle!==void 0?h.spot.outerConeAngle:Math.PI/4,f.angle=h.spot.outerConeAngle,f.penumbra=1-h.spot.innerConeAngle/h.spot.outerConeAngle,f.target.position.set(0,0,-1),f.add(f.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+h.type)}return f.position.set(0,0,0),f.decay=2,Gr(f,h),h.intensity!==void 0&&(f.intensity=h.intensity),f.name=t.createUniqueName(h.name||"light_"+e),r=Promise.resolve(f),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,o=n.json.nodes[e],l=(o.extensions&&o.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(h){return n._getNodeRef(t.cache,l,h)})}}class YP{constructor(){this.name=yt.KHR_MATERIALS_UNLIT}getMaterialType(){return Wi}extendParams(e,t,n){const r=[];e.color=new Ne(1,1,1),e.opacity=1;const o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){const c=o.baseColorFactor;e.color.setRGB(c[0],c[1],c[2],yn),e.opacity=c[3]}o.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",o.baseColorTexture,ln))}return Promise.all(r)}}class jP{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=r.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}}class qP{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];if(c.clearcoatFactor!==void 0&&(t.clearcoat=c.clearcoatFactor),c.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",c.clearcoatTexture)),c.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=c.clearcoatRoughnessFactor),c.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",c.clearcoatRoughnessTexture)),c.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",c.clearcoatNormalTexture)),c.clearcoatNormalTexture.scale!==void 0)){const l=c.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(l,l)}return Promise.all(o)}}class KP{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.iridescenceFactor!==void 0&&(t.iridescence=c.iridescenceFactor),c.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",c.iridescenceTexture)),c.iridescenceIor!==void 0&&(t.iridescenceIOR=c.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),c.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=c.iridescenceThicknessMinimum),c.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=c.iridescenceThicknessMaximum),c.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",c.iridescenceThicknessTexture)),Promise.all(o)}}class ZP{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;const c=r.extensions[this.name];if(c.sheenColorFactor!==void 0){const l=c.sheenColorFactor;t.sheenColor.setRGB(l[0],l[1],l[2],yn)}return c.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=c.sheenRoughnessFactor),c.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",c.sheenColorTexture,ln)),c.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",c.sheenRoughnessTexture)),Promise.all(o)}}class $P{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.transmissionFactor!==void 0&&(t.transmission=c.transmissionFactor),c.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",c.transmissionTexture)),Promise.all(o)}}class JP{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];t.thickness=c.thicknessFactor!==void 0?c.thicknessFactor:0,c.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",c.thicknessTexture)),t.attenuationDistance=c.attenuationDistance||1/0;const l=c.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(l[0],l[1],l[2],yn),Promise.all(o)}}class QP{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=r.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}}class eL{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];t.specularIntensity=c.specularFactor!==void 0?c.specularFactor:1,c.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",c.specularTexture));const l=c.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(l[0],l[1],l[2],yn),c.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",c.specularColorTexture,ln)),Promise.all(o)}}class tL{constructor(e){this.parser=e,this.name=yt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return t.bumpScale=c.bumpFactor!==void 0?c.bumpFactor:1,c.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",c.bumpTexture)),Promise.all(o)}}class nL{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$i}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.anisotropyStrength!==void 0&&(t.anisotropy=c.anisotropyStrength),c.anisotropyRotation!==void 0&&(t.anisotropyRotation=c.anisotropyRotation),c.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",c.anisotropyTexture)),Promise.all(o)}}class iL{constructor(e){this.parser=e,this.name=yt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const o=r.extensions[this.name],c=t.options.ktx2Loader;if(!c){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,c)}}class rL{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;const c=o.extensions[t],l=r.images[c.source];let h=n.textureLoader;if(l.uri){const f=n.options.manager.getHandler(l.uri);f!==null&&(h=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,c.source,h);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class sL{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;const c=o.extensions[t],l=r.images[c.source];let h=n.textureLoader;if(l.uri){const f=n.options.manager.getHandler(l.uri);f!==null&&(h=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,c.source,h);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class oL{constructor(e){this.name=yt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],o=this.parser.getDependency("buffer",r.buffer),c=this.parser.options.meshoptDecoder;if(!c||!c.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(l){const h=r.byteOffset||0,f=r.byteLength||0,d=r.count,p=r.byteStride,m=new Uint8Array(l,h,f);return c.decodeGltfBufferAsync?c.decodeGltfBufferAsync(d,p,m,r.mode,r.filter).then(function(x){return x.buffer}):c.ready.then(function(){const x=new ArrayBuffer(d*p);return c.decodeGltfBuffer(new Uint8Array(x),d,p,m,r.mode,r.filter),x})})}else return null}}class aL{constructor(e){this.name=yt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const f of r.primitives)if(f.mode!==fi.TRIANGLES&&f.mode!==fi.TRIANGLE_STRIP&&f.mode!==fi.TRIANGLE_FAN&&f.mode!==void 0)return null;const c=n.extensions[this.name].attributes,l=[],h={};for(const f in c)l.push(this.parser.getDependency("accessor",c[f]).then(d=>(h[f]=d,h[f])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(f=>{const d=f.pop(),p=d.isGroup?d.children:[d],m=f[0].count,x=[];for(const M of p){const A=new Qe,v=new N,_=new on,C=new N(1,1,1),b=new OC(M.geometry,M.material,m);for(let L=0;L<m;L++)h.TRANSLATION&&v.fromBufferAttribute(h.TRANSLATION,L),h.ROTATION&&_.fromBufferAttribute(h.ROTATION,L),h.SCALE&&C.fromBufferAttribute(h.SCALE,L),b.setMatrixAt(L,A.compose(v,_,C));for(const L in h)if(L==="_COLOR_0"){const k=h[L];b.instanceColor=new Bh(k.array,k.itemSize,k.normalized)}else L!=="TRANSLATION"&&L!=="ROTATION"&&L!=="SCALE"&&M.geometry.setAttribute(L,h[L]);mt.prototype.copy.call(b,M),this.parser.assignFinalMaterial(b),x.push(b)}return d.isGroup?(d.clear(),d.add(...x),d):x[0]}))}}const V_="glTF",ua=12,zg={JSON:1313821514,BIN:5130562};class cL{constructor(e){this.name=yt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ua),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==V_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-ua,o=new DataView(e,ua);let c=0;for(;c<r;){const l=o.getUint32(c,!0);c+=4;const h=o.getUint32(c,!0);if(c+=4,h===zg.JSON){const f=new Uint8Array(e,ua+c,l);this.content=n.decode(f)}else if(h===zg.BIN){const f=ua+c;this.body=e.slice(f,f+l)}c+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class lL{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=yt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,o=e.extensions[this.name].bufferView,c=e.extensions[this.name].attributes,l={},h={},f={};for(const d in c){const p=Wh[d]||d.toLowerCase();l[p]=c[d]}for(const d in e.attributes){const p=Wh[d]||d.toLowerCase();if(c[d]!==void 0){const m=n.accessors[e.attributes[d]],x=go[m.componentType];f[p]=x.name,h[p]=m.normalized===!0}}return t.getDependency("bufferView",o).then(function(d){return new Promise(function(p,m){r.decodeDracoFile(d,function(x){for(const M in x.attributes){const A=x.attributes[M],v=h[M];v!==void 0&&(A.normalized=v)}p(x)},l,f,yn,m)})})}}class uL{constructor(){this.name=yt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class hL{constructor(){this.name=yt.KHR_MESH_QUANTIZATION}}class W_ extends La{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r*3+r;for(let c=0;c!==r;c++)t[c]=n[o+c];return t}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=l*2,f=l*3,d=r-t,p=(n-t)/d,m=p*p,x=m*p,M=e*f,A=M-f,v=-2*x+3*m,_=x-m,C=1-v,b=_-m+p;for(let L=0;L!==l;L++){const k=c[A+L+l],U=c[A+L+h]*d,O=c[M+L+l],I=c[M+L]*d;o[L]=C*k+b*U+v*O+_*I}return o}}const fL=new on;class dL extends W_{interpolate_(e,t,n,r){const o=super.interpolate_(e,t,n,r);return fL.fromArray(o).normalize().toArray(o),o}}const fi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},go={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},kg={9728:zn,9729:Wn,9984:Jg,9985:rl,9986:ha,9987:_r},Hg={33071:gr,33648:ba,10497:_s},Eh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Wh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},zr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},pL={CUBICSPLINE:void 0,LINEAR:yo,STEP:Aa},bh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function mL(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Ro({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Yi})),i.DefaultMaterial}function us(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Gr(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function gL(i,e,t){let n=!1,r=!1,o=!1;for(let f=0,d=e.length;f<d;f++){const p=e[f];if(p.POSITION!==void 0&&(n=!0),p.NORMAL!==void 0&&(r=!0),p.COLOR_0!==void 0&&(o=!0),n&&r&&o)break}if(!n&&!r&&!o)return Promise.resolve(i);const c=[],l=[],h=[];for(let f=0,d=e.length;f<d;f++){const p=e[f];if(n){const m=p.POSITION!==void 0?t.getDependency("accessor",p.POSITION):i.attributes.position;c.push(m)}if(r){const m=p.NORMAL!==void 0?t.getDependency("accessor",p.NORMAL):i.attributes.normal;l.push(m)}if(o){const m=p.COLOR_0!==void 0?t.getDependency("accessor",p.COLOR_0):i.attributes.color;h.push(m)}}return Promise.all([Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){const d=f[0],p=f[1],m=f[2];return n&&(i.morphAttributes.position=d),r&&(i.morphAttributes.normal=p),o&&(i.morphAttributes.color=m),i.morphTargetsRelative=!0,i})}function _L(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function vL(i){let e;const t=i.extensions&&i.extensions[yt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Th(t.attributes):e=i.indices+":"+Th(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Th(i.targets[n]);return e}function Th(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Xh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xL(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const yL=new Qe;class SL{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new WP,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,o=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,o=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&o<98?this.textureLoader=new F_(this.options.manager):this.textureLoader=new oP(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ml(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(c){return c._markDefs&&c._markDefs()}),Promise.all(this._invokeAll(function(c){return c.beforeRoot&&c.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(c){const l={scene:c[0][r.scene||0],scenes:c[0],animations:c[1],cameras:c[2],asset:r.asset,parser:n,userData:{}};return us(o,l,r),Gr(l,r),Promise.all(n._invokeAll(function(h){return h.afterRoot&&h.afterRoot(l)})).then(function(){for(const h of l.scenes)h.updateMatrixWorld();e(l)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,o=t.length;r<o;r++){const c=t[r].joints;for(let l=0,h=c.length;l<h;l++)e[c[l]].isBone=!0}for(let r=0,o=e.length;r<o;r++){const c=e[r];c.mesh!==void 0&&(this._addNodeRef(this.meshCache,c.mesh),c.skin!==void 0&&(n[c.mesh].isSkinnedMesh=!0)),c.camera!==void 0&&this._addNodeRef(this.cameraCache,c.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),o=(c,l)=>{const h=this.associations.get(c);h!=null&&this.associations.set(l,h);for(const[f,d]of c.children.entries())o(d,l.children[f])};return o(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const o=e(t[r]);o&&n.push(o)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":r=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(o,c){return n.getDependency(e,c)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[yt.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(o,c){n.load(Sa.resolveURL(t.uri,r.path),o,void 0,function(){c(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const c=Eh[r.type],l=go[r.componentType],h=r.normalized===!0,f=new l(r.count*c);return Promise.resolve(new nn(f,c,h))}const o=[];return r.bufferView!==void 0?o.push(this.getDependency("bufferView",r.bufferView)):o.push(null),r.sparse!==void 0&&(o.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(o).then(function(c){const l=c[0],h=Eh[r.type],f=go[r.componentType],d=f.BYTES_PER_ELEMENT,p=d*h,m=r.byteOffset||0,x=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,M=r.normalized===!0;let A,v;if(x&&x!==p){const _=Math.floor(m/x),C="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+_+":"+r.count;let b=t.cache.get(C);b||(A=new f(l,_*x,r.count*x/d),b=new C_(A,x/d),t.cache.add(C,b)),v=new Ra(b,h,m%x/d,M)}else l===null?A=new f(r.count*h):A=new f(l,m,r.count*h),v=new nn(A,h,M);if(r.sparse!==void 0){const _=Eh.SCALAR,C=go[r.sparse.indices.componentType],b=r.sparse.indices.byteOffset||0,L=r.sparse.values.byteOffset||0,k=new C(c[1],b,r.sparse.count*_),U=new f(c[2],L,r.sparse.count*h);l!==null&&(v=new nn(v.array.slice(),v.itemSize,v.normalized));for(let O=0,I=k.length;O<I;O++){const E=k[O];if(v.setX(E,U[O*h]),h>=2&&v.setY(E,U[O*h+1]),h>=3&&v.setZ(E,U[O*h+2]),h>=4&&v.setW(E,U[O*h+3]),h>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return v})}loadTexture(e){const t=this.json,n=this.options,o=t.textures[e].source,c=t.images[o];let l=this.textureLoader;if(c.uri){const h=n.manager.getHandler(c.uri);h!==null&&(l=h)}return this.loadTextureImage(e,o,l)}loadTextureImage(e,t,n){const r=this,o=this.json,c=o.textures[e],l=o.images[t],h=(l.uri||l.bufferView)+":"+c.sampler;if(this.textureCache[h])return this.textureCache[h];const f=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=c.name||l.name||"",d.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(d.name=l.uri);const m=(o.samplers||{})[c.sampler]||{};return d.magFilter=kg[m.magFilter]||Wn,d.minFilter=kg[m.minFilter]||_r,d.wrapS=Hg[m.wrapS]||_s,d.wrapT=Hg[m.wrapT]||_s,r.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[h]=f,f}loadImageSource(e,t){const n=this,r=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(p=>p.clone());const c=r.images[e],l=self.URL||self.webkitURL;let h=c.uri||"",f=!1;if(c.bufferView!==void 0)h=n.getDependency("bufferView",c.bufferView).then(function(p){f=!0;const m=new Blob([p],{type:c.mimeType});return h=l.createObjectURL(m),h});else if(c.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(h).then(function(p){return new Promise(function(m,x){let M=m;t.isImageBitmapLoader===!0&&(M=function(A){const v=new un(A);v.needsUpdate=!0,m(v)}),t.load(Sa.resolveURL(p,o.path),M,void 0,x)})}).then(function(p){return f===!0&&l.revokeObjectURL(h),p.userData.mimeType=c.mimeType||xL(c.uri),p}).catch(function(p){throw console.error("THREE.GLTFLoader: Couldn't load texture",h),p});return this.sourceCache[e]=d,d}assignTexture(e,t,n,r){const o=this;return this.getDependency("texture",n.index).then(function(c){if(!c)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(c=c.clone(),c.channel=n.texCoord),o.extensions[yt.KHR_TEXTURE_TRANSFORM]){const l=n.extensions!==void 0?n.extensions[yt.KHR_TEXTURE_TRANSFORM]:void 0;if(l){const h=o.associations.get(c);c=o.extensions[yt.KHR_TEXTURE_TRANSFORM].extendTexture(c,l),o.associations.set(c,h)}}return r!==void 0&&(c.colorSpace=r),e[t]=c,c})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,c=t.attributes.normal===void 0;if(e.isPoints){const l="PointsMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new O_,mi.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,h.sizeAttenuation=!1,this.cache.add(l,h)),n=h}else if(e.isLine){const l="LineBasicMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new wo,mi.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,this.cache.add(l,h)),n=h}if(r||o||c){let l="ClonedMaterial:"+n.uuid+":";r&&(l+="derivative-tangents:"),o&&(l+="vertex-colors:"),c&&(l+="flat-shading:");let h=this.cache.get(l);h||(h=n.clone(),o&&(h.vertexColors=!0),c&&(h.flatShading=!0),r&&(h.normalScale&&(h.normalScale.y*=-1),h.clearcoatNormalScale&&(h.clearcoatNormalScale.y*=-1)),this.cache.add(l,h),this.associations.set(h,this.associations.get(n))),n=h}e.material=n}getMaterialType(){return Ro}loadMaterial(e){const t=this,n=this.json,r=this.extensions,o=n.materials[e];let c;const l={},h=o.extensions||{},f=[];if(h[yt.KHR_MATERIALS_UNLIT]){const p=r[yt.KHR_MATERIALS_UNLIT];c=p.getMaterialType(),f.push(p.extendParams(l,o,t))}else{const p=o.pbrMetallicRoughness||{};if(l.color=new Ne(1,1,1),l.opacity=1,Array.isArray(p.baseColorFactor)){const m=p.baseColorFactor;l.color.setRGB(m[0],m[1],m[2],yn),l.opacity=m[3]}p.baseColorTexture!==void 0&&f.push(t.assignTexture(l,"map",p.baseColorTexture,ln)),l.metalness=p.metallicFactor!==void 0?p.metallicFactor:1,l.roughness=p.roughnessFactor!==void 0?p.roughnessFactor:1,p.metallicRoughnessTexture!==void 0&&(f.push(t.assignTexture(l,"metalnessMap",p.metallicRoughnessTexture)),f.push(t.assignTexture(l,"roughnessMap",p.metallicRoughnessTexture))),c=this._invokeOne(function(m){return m.getMaterialType&&m.getMaterialType(e)}),f.push(Promise.all(this._invokeAll(function(m){return m.extendMaterialParams&&m.extendMaterialParams(e,l)})))}o.doubleSided===!0&&(l.side=Ai);const d=o.alphaMode||bh.OPAQUE;if(d===bh.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,d===bh.MASK&&(l.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&c!==Wi&&(f.push(t.assignTexture(l,"normalMap",o.normalTexture)),l.normalScale=new Pe(1,1),o.normalTexture.scale!==void 0)){const p=o.normalTexture.scale;l.normalScale.set(p,p)}if(o.occlusionTexture!==void 0&&c!==Wi&&(f.push(t.assignTexture(l,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&c!==Wi){const p=o.emissiveFactor;l.emissive=new Ne().setRGB(p[0],p[1],p[2],yn)}return o.emissiveTexture!==void 0&&c!==Wi&&f.push(t.assignTexture(l,"emissiveMap",o.emissiveTexture,ln)),Promise.all(f).then(function(){const p=new c(l);return o.name&&(p.name=o.name),Gr(p,o),t.associations.set(p,{materials:e}),o.extensions&&us(r,p,o),p})}createUniqueName(e){const t=It.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function o(l){return n[yt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,t).then(function(h){return Gg(h,l,t)})}const c=[];for(let l=0,h=e.length;l<h;l++){const f=e[l],d=vL(f),p=r[d];if(p)c.push(p.promise);else{let m;f.extensions&&f.extensions[yt.KHR_DRACO_MESH_COMPRESSION]?m=o(f):m=Gg(new Jt,f,t),r[d]={primitive:f,promise:m},c.push(m)}}return Promise.all(c)}loadMesh(e){const t=this,n=this.json,r=this.extensions,o=n.meshes[e],c=o.primitives,l=[];for(let h=0,f=c.length;h<f;h++){const d=c[h].material===void 0?mL(this.cache):this.getDependency("material",c[h].material);l.push(d)}return l.push(t.loadGeometries(c)),Promise.all(l).then(function(h){const f=h.slice(0,h.length-1),d=h[h.length-1],p=[];for(let x=0,M=d.length;x<M;x++){const A=d[x],v=c[x];let _;const C=f[x];if(v.mode===fi.TRIANGLES||v.mode===fi.TRIANGLE_STRIP||v.mode===fi.TRIANGLE_FAN||v.mode===void 0)_=o.isSkinnedMesh===!0?new LC(A,C):new ye(A,C),_.isSkinnedMesh===!0&&_.normalizeSkinWeights(),v.mode===fi.TRIANGLE_STRIP?_.geometry=Bg(_.geometry,c_):v.mode===fi.TRIANGLE_FAN&&(_.geometry=Bg(_.geometry,Uh));else if(v.mode===fi.LINES)_=new cf(A,C);else if(v.mode===fi.LINE_STRIP)_=new di(A,C);else if(v.mode===fi.LINE_LOOP)_=new UC(A,C);else if(v.mode===fi.POINTS)_=new NC(A,C);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+v.mode);Object.keys(_.geometry.morphAttributes).length>0&&_L(_,o),_.name=t.createUniqueName(o.name||"mesh_"+e),Gr(_,o),v.extensions&&us(r,_,v),t.assignFinalMaterial(_),p.push(_)}for(let x=0,M=p.length;x<M;x++)t.associations.set(p[x],{meshes:e,primitives:x});if(p.length===1)return o.extensions&&us(r,p[0],o),p[0];const m=new Xi;o.extensions&&us(r,m,o),t.associations.set(m,{meshes:e});for(let x=0,M=p.length;x<M;x++)m.add(p[x]);return m})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Bn(ji.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Sl(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Gr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,o=t.joints.length;r<o;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const o=r.pop(),c=r,l=[],h=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];if(p){l.push(p);const m=new Qe;o!==null&&m.fromArray(o.array,f*16),h.push(m)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[f])}return new af(l,h)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],o=r.name?r.name:"animation_"+e,c=[],l=[],h=[],f=[],d=[];for(let p=0,m=r.channels.length;p<m;p++){const x=r.channels[p],M=r.samplers[x.sampler],A=x.target,v=A.node,_=r.parameters!==void 0?r.parameters[M.input]:M.input,C=r.parameters!==void 0?r.parameters[M.output]:M.output;A.node!==void 0&&(c.push(this.getDependency("node",v)),l.push(this.getDependency("accessor",_)),h.push(this.getDependency("accessor",C)),f.push(M),d.push(A))}return Promise.all([Promise.all(c),Promise.all(l),Promise.all(h),Promise.all(f),Promise.all(d)]).then(function(p){const m=p[0],x=p[1],M=p[2],A=p[3],v=p[4],_=[];for(let C=0,b=m.length;C<b;C++){const L=m[C],k=x[C],U=M[C],O=A[C],I=v[C];if(L===void 0)continue;L.updateMatrix&&L.updateMatrix();const E=n._createAnimationTracks(L,k,U,O,I);if(E)for(let y=0;y<E.length;y++)_.push(E[y])}return new XC(o,void 0,_)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(o){const c=n._getNodeRef(n.meshCache,r.mesh,o);return r.weights!==void 0&&c.traverse(function(l){if(l.isMesh)for(let h=0,f=r.weights.length;h<f;h++)l.morphTargetInfluences[h]=r.weights[h]}),c})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],o=n._loadNodeShallow(e),c=[],l=r.children||[];for(let f=0,d=l.length;f<d;f++)c.push(n.getDependency("node",l[f]));const h=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([o,Promise.all(c),h]).then(function(f){const d=f[0],p=f[1],m=f[2];m!==null&&d.traverse(function(x){x.isSkinnedMesh&&x.bind(m,yL)});for(let x=0,M=p.length;x<M;x++)d.add(p[x]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const o=t.nodes[e],c=o.name?r.createUniqueName(o.name):"",l=[],h=r._invokeOne(function(f){return f.createNodeMesh&&f.createNodeMesh(e)});return h&&l.push(h),o.camera!==void 0&&l.push(r.getDependency("camera",o.camera).then(function(f){return r._getNodeRef(r.cameraCache,o.camera,f)})),r._invokeAll(function(f){return f.createNodeAttachment&&f.createNodeAttachment(e)}).forEach(function(f){l.push(f)}),this.nodeCache[e]=Promise.all(l).then(function(f){let d;if(o.isBone===!0?d=new I_:f.length>1?d=new Xi:f.length===1?d=f[0]:d=new mt,d!==f[0])for(let p=0,m=f.length;p<m;p++)d.add(f[p]);if(o.name&&(d.userData.name=o.name,d.name=c),Gr(d,o),o.extensions&&us(n,d,o),o.matrix!==void 0){const p=new Qe;p.fromArray(o.matrix),d.applyMatrix4(p)}else o.translation!==void 0&&d.position.fromArray(o.translation),o.rotation!==void 0&&d.quaternion.fromArray(o.rotation),o.scale!==void 0&&d.scale.fromArray(o.scale);return r.associations.has(d)||r.associations.set(d,{}),r.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,o=new Xi;n.name&&(o.name=r.createUniqueName(n.name)),Gr(o,n),n.extensions&&us(t,o,n);const c=n.nodes||[],l=[];for(let h=0,f=c.length;h<f;h++)l.push(r.getDependency("node",c[h]));return Promise.all(l).then(function(h){for(let d=0,p=h.length;d<p;d++)o.add(h[d]);const f=d=>{const p=new Map;for(const[m,x]of r.associations)(m instanceof mi||m instanceof un)&&p.set(m,x);return d.traverse(m=>{const x=r.associations.get(m);x!=null&&p.set(m,x)}),p};return r.associations=f(o),o})}_createAnimationTracks(e,t,n,r,o){const c=[],l=e.name?e.name:e.uuid,h=[];zr[o.path]===zr.weights?e.traverse(function(m){m.morphTargetInfluences&&h.push(m.name?m.name:m.uuid)}):h.push(l);let f;switch(zr[o.path]){case zr.weights:f=Eo;break;case zr.rotation:f=xs;break;case zr.position:case zr.scale:f=bo;break;default:switch(n.itemSize){case 1:f=Eo;break;case 2:case 3:default:f=bo;break}break}const d=r.interpolation!==void 0?pL[r.interpolation]:yo,p=this._getArrayFromAccessor(n);for(let m=0,x=h.length;m<x;m++){const M=new f(h[m]+"."+zr[o.path],t.array,p,d);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(M),c.push(M)}return c}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Xh(t.constructor),r=new Float32Array(t.length);for(let o=0,c=t.length;o<c;o++)r[o]=t[o]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof xs?dL:W_;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function ML(i,e,t){const n=e.attributes,r=new Ii;if(n.POSITION!==void 0){const l=t.json.accessors[n.POSITION],h=l.min,f=l.max;if(h!==void 0&&f!==void 0){if(r.set(new N(h[0],h[1],h[2]),new N(f[0],f[1],f[2])),l.normalized){const d=Xh(go[l.componentType]);r.min.multiplyScalar(d),r.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const o=e.targets;if(o!==void 0){const l=new N,h=new N;for(let f=0,d=o.length;f<d;f++){const p=o[f];if(p.POSITION!==void 0){const m=t.json.accessors[p.POSITION],x=m.min,M=m.max;if(x!==void 0&&M!==void 0){if(h.setX(Math.max(Math.abs(x[0]),Math.abs(M[0]))),h.setY(Math.max(Math.abs(x[1]),Math.abs(M[1]))),h.setZ(Math.max(Math.abs(x[2]),Math.abs(M[2]))),m.normalized){const A=Xh(go[m.componentType]);h.multiplyScalar(A)}l.max(h)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(l)}i.boundingBox=r;const c=new Zi;r.getCenter(c.center),c.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=c}function Gg(i,e,t){const n=e.attributes,r=[];function o(c,l){return t.getDependency("accessor",c).then(function(h){i.setAttribute(l,h)})}for(const c in n){const l=Wh[c]||c.toLowerCase();l in i.attributes||r.push(o(n[c],l))}if(e.indices!==void 0&&!i.index){const c=t.getDependency("accessor",e.indices).then(function(l){i.setIndex(l)});r.push(c)}return Ct.workingColorSpace!==yn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ct.workingColorSpace}" not supported.`),Gr(i,e),ML(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?gL(i,e.targets,t):i})}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var ei=Uint8Array,ho=Uint16Array,EL=Int32Array,X_=new ei([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Y_=new ei([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),bL=new ei([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),j_=function(i,e){for(var t=new ho(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new EL(t[30]),n=1;n<30;++n)for(var o=t[n];o<t[n+1];++o)r[o]=o-t[n]<<5|n;return{b:t,r}},q_=j_(X_,2),K_=q_.b,TL=q_.r;K_[28]=258,TL[258]=28;var AL=j_(Y_,0),wL=AL.b,Yh=new ho(32768);for(var Vt=0;Vt<32768;++Vt){var kr=(Vt&43690)>>1|(Vt&21845)<<1;kr=(kr&52428)>>2|(kr&13107)<<2,kr=(kr&61680)>>4|(kr&3855)<<4,Yh[Vt]=((kr&65280)>>8|(kr&255)<<8)>>1}var Ma=function(i,e,t){for(var n=i.length,r=0,o=new ho(e);r<n;++r)i[r]&&++o[i[r]-1];var c=new ho(e);for(r=1;r<e;++r)c[r]=c[r-1]+o[r-1]<<1;var l;if(t){l=new ho(1<<e);var h=15-e;for(r=0;r<n;++r)if(i[r])for(var f=r<<4|i[r],d=e-i[r],p=c[i[r]-1]++<<d,m=p|(1<<d)-1;p<=m;++p)l[Yh[p]>>h]=f}else for(l=new ho(n),r=0;r<n;++r)i[r]&&(l[r]=Yh[c[i[r]-1]++]>>15-i[r]);return l},Ia=new ei(288);for(var Vt=0;Vt<144;++Vt)Ia[Vt]=8;for(var Vt=144;Vt<256;++Vt)Ia[Vt]=9;for(var Vt=256;Vt<280;++Vt)Ia[Vt]=7;for(var Vt=280;Vt<288;++Vt)Ia[Vt]=8;var Z_=new ei(32);for(var Vt=0;Vt<32;++Vt)Z_[Vt]=5;var RL=Ma(Ia,9,1),CL=Ma(Z_,5,1),Ah=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},bi=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},wh=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},PL=function(i){return(i+7)/8|0},vf=function(i,e,t){return(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length),new ei(i.subarray(e,t))},LL=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],pi=function(i,e,t){var n=new Error(e||LL[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,pi),!t)throw n;return n},IL=function(i,e,t,n){var r=i.length,o=n?n.length:0;if(!r||e.f&&!e.l)return t||new ei(0);var c=!t,l=c||e.i!=2,h=e.i;c&&(t=new ei(r*3));var f=function(j){var $e=t.length;if(j>$e){var ze=new ei(Math.max($e*2,j));ze.set(t),t=ze}},d=e.f||0,p=e.p||0,m=e.b||0,x=e.l,M=e.d,A=e.m,v=e.n,_=r*8;do{if(!x){d=bi(i,p,1);var C=bi(i,p+1,3);if(p+=3,C)if(C==1)x=RL,M=CL,A=9,v=5;else if(C==2){var U=bi(i,p,31)+257,O=bi(i,p+10,15)+4,I=U+bi(i,p+5,31)+1;p+=14;for(var E=new ei(I),y=new ei(19),F=0;F<O;++F)y[bL[F]]=bi(i,p+F*3,7);p+=O*3;for(var V=Ah(y),G=(1<<V)-1,q=Ma(y,V,1),F=0;F<I;){var ne=q[bi(i,p,G)];p+=ne&15;var b=ne>>4;if(b<16)E[F++]=b;else{var se=0,pe=0;for(b==16?(pe=3+bi(i,p,3),p+=2,se=E[F-1]):b==17?(pe=3+bi(i,p,7),p+=3):b==18&&(pe=11+bi(i,p,127),p+=7);pe--;)E[F++]=se}}var K=E.subarray(0,U),he=E.subarray(U);A=Ah(K),v=Ah(he),x=Ma(K,A,1),M=Ma(he,v,1)}else pi(1);else{var b=PL(p)+4,L=i[b-4]|i[b-3]<<8,k=b+L;if(k>r){h&&pi(0);break}l&&f(m+L),t.set(i.subarray(b,k),m),e.b=m+=L,e.p=p=k*8,e.f=d;continue}if(p>_){h&&pi(0);break}}l&&f(m+131072);for(var me=(1<<A)-1,Me=(1<<v)-1,Ke=p;;Ke=p){var se=x[wh(i,p)&me],ot=se>>4;if(p+=se&15,p>_){h&&pi(0);break}if(se||pi(2),ot<256)t[m++]=ot;else if(ot==256){Ke=p,x=null;break}else{var ie=ot-254;if(ot>264){var F=ot-257,ge=X_[F];ie=bi(i,p,(1<<ge)-1)+K_[F],p+=ge}var we=M[wh(i,p)&Me],Se=we>>4;we||pi(3),p+=we&15;var he=wL[Se];if(Se>3){var ge=Y_[Se];he+=wh(i,p)&(1<<ge)-1,p+=ge}if(p>_){h&&pi(0);break}l&&f(m+131072);var Ge=m+ie;if(m<he){var Xe=o-he,at=Math.min(he,Ge);for(Xe+m<0&&pi(3);m<at;++m)t[m]=n[Xe+m]}for(;m<Ge;++m)t[m]=t[m-he]}}e.l=x,e.p=Ke,e.b=m,e.f=d,x&&(d=1,e.m=A,e.d=M,e.n=v)}while(!d);return m!=t.length&&c?vf(t,0,m):t.subarray(0,m)},DL=new ei(0),Gi=function(i,e){return i[e]|i[e+1]<<8},Ti=function(i,e){return(i[e]|i[e+1]<<8|i[e+2]<<16|i[e+3]<<24)>>>0},Rh=function(i,e){return Ti(i,e)+Ti(i,e+4)*4294967296};function OL(i,e){return IL(i,{i:2},e&&e.out,e&&e.dictionary)}var jh=typeof TextDecoder<"u"&&new TextDecoder,UL=0;try{jh.decode(DL,{stream:!0}),UL=1}catch{}var NL=function(i){for(var e="",t=0;;){var n=i[t++],r=(n>127)+(n>223)+(n>239);if(t+r>i.length)return{s:e,r:vf(i,t-1)};r?r==3?(n=((n&15)<<18|(i[t++]&63)<<12|(i[t++]&63)<<6|i[t++]&63)-65536,e+=String.fromCharCode(55296|n>>10,56320|n&1023)):r&1?e+=String.fromCharCode((n&31)<<6|i[t++]&63):e+=String.fromCharCode((n&15)<<12|(i[t++]&63)<<6|i[t++]&63):e+=String.fromCharCode(n)}};function qh(i,e){if(e){for(var t="",n=0;n<i.length;n+=16384)t+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return t}else{if(jh)return jh.decode(i);var r=NL(i),o=r.s,t=r.r;return t.length&&pi(8),o}}var FL=function(i,e){return e+30+Gi(i,e+26)+Gi(i,e+28)},BL=function(i,e,t){var n=Gi(i,e+28),r=qh(i.subarray(e+46,e+46+n),!(Gi(i,e+8)&2048)),o=e+46+n,c=Ti(i,e+20),l=t&&c==4294967295?zL(i,o):[c,Ti(i,e+24),Ti(i,e+42)],h=l[0],f=l[1],d=l[2];return[Gi(i,e+10),h,f,r,o+Gi(i,e+30)+Gi(i,e+32),d]},zL=function(i,e){for(;Gi(i,e)!=1;e+=4+Gi(i,e+2));return[Rh(i,e+12),Rh(i,e+4),Rh(i,e+20)]};function kL(i,e){for(var t={},n=i.length-22;Ti(i,n)!=101010256;--n)(!n||i.length-n>65558)&&pi(13);var r=Gi(i,n+8);if(!r)return{};var o=Ti(i,n+16),c=o==4294967295||r==65535;if(c){var l=Ti(i,n-12);c=Ti(i,l)==101075792,c&&(r=Ti(i,l+32),o=Ti(i,l+48))}for(var h=0;h<r;++h){var f=BL(i,o,c),d=f[0],p=f[1],m=f[2],x=f[3],M=f[4],A=f[5],v=FL(i,A);o=M,d?d==8?t[x]=OL(i.subarray(v,v+p),{out:new ei(m)}):pi(14,"unknown compression type "+d):t[x]=vf(i,v,v+p)}return t}class HL{parse(e){const t={},n=e.split(`
`);let r=null,o=t;const c=[t];for(const l of n)if(l.includes("=")){const h=l.split("="),f=h[0].trim(),d=h[1].trim();if(d.endsWith("{")){const p={};c.push(p),o[f]=p,o=p}else o[f]=d}else if(l.endsWith("{")){const h=o[r]||{};c.push(h),o[r]=h,o=h}else if(l.endsWith("}")){if(c.pop(),c.length===0)continue;o=c[c.length-1]}else if(l.endsWith("(")){const h={};c.push(h),r=l.split("(")[0].trim()||r,o[r]=h,o=h}else l.endsWith(")")?(c.pop(),o=c[c.length-1]):r=l.trim();return t}}class GL extends Ms{constructor(e){super(e)}load(e,t,n,r){const o=this,c=new ml(o.manager);c.setPath(o.path),c.setResponseType("arraybuffer"),c.setRequestHeader(o.requestHeader),c.setWithCredentials(o.withCredentials),c.load(e,function(l){try{t(o.parse(l))}catch(h){r?r(h):console.error(h),o.manager.itemError(e)}},n,r)}parse(e){const t=new HL;function n(I){const E={};new ml().setResponseType("arraybuffer");for(const F in I){if(F.endsWith("png")){const V=new Blob([I[F]],{type:{type:"image/png"}});E[F]=URL.createObjectURL(V)}if(F.endsWith("usd")||F.endsWith("usda")){if(r(I[F])){console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");continue}const V=qh(I[F]);E[F]=t.parse(V)}}return E}function r(I){const E=I.slice(0,7),y=new Uint8Array([80,88,82,45,85,83,68,67]);return E.every((F,V)=>F===y[V])}function o(I){if(I.length<1)return;const E=Object.keys(I)[0];let y=!1;if(E.endsWith("usda"))return I[E];if(E.endsWith("usdc"))y=!0;else if(E.endsWith("usd"))if(r(I[E]))y=!0;else return I[E];y&&console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.")}const c=kL(new Uint8Array(e)),l=n(c),h=o(c);if(h===void 0)return console.warn("THREE.USDZLoader: No usda file found."),new Xi;const f=qh(h),d=t.parse(f);function p(I){if(I){if("prepend references"in I){const y=I["prepend references"].split("@"),F=y[1].replace(/^.\//,""),V=y[2].replace(/^<\//,"").replace(/>$/,"");return m(l[F],V)}return m(I)}}function m(I,E){if(I){if(E!==void 0){const y=`def Mesh "${E}"`;if(y in I)return I[y]}for(const y in I){const F=I[y];if(y.startsWith("def Mesh"))return"point3f[] points"in I&&(F["point3f[] points"]=I["point3f[] points"]),"texCoord2f[] primvars:st"in I&&(F["texCoord2f[] primvars:st"]=I["texCoord2f[] primvars:st"]),"int[] primvars:st:indices"in I&&(F["int[] primvars:st:indices"]=I["int[] primvars:st:indices"]),F;if(typeof F=="object"){const V=m(F);if(V)return V}}}}function x(I){if(!I)return;let E=new Jt;if("int[] faceVertexIndices"in I){const y=JSON.parse(I["int[] faceVertexIndices"]);E.setIndex(y)}if("point3f[] points"in I){const y=JSON.parse(I["point3f[] points"].replace(/[()]*/g,"")),F=new nn(new Float32Array(y),3);E.setAttribute("position",F)}if("normal3f[] normals"in I){const y=JSON.parse(I["normal3f[] normals"].replace(/[()]*/g,"")),F=new nn(new Float32Array(y),3);E.setAttribute("normal",F)}else E.computeVertexNormals();if("float2[] primvars:st"in I&&(I["texCoord2f[] primvars:st"]=I["float2[] primvars:st"]),"texCoord2f[] primvars:st"in I){const y=JSON.parse(I["texCoord2f[] primvars:st"].replace(/[()]*/g,"")),F=new nn(new Float32Array(y),2);if("int[] primvars:st:indices"in I){E=E.toNonIndexed();const V=JSON.parse(I["int[] primvars:st:indices"]);E.setAttribute("uv",M(F,V))}else E.setAttribute("uv",F)}return E}function M(I,E){const y=I.array,F=I.itemSize,V=new y.constructor(E.length*F);let G=0,q=0;for(let ne=0,se=E.length;ne<se;ne++){G=E[ne]*F;for(let pe=0;pe<F;pe++)V[q++]=y[G++]}return new nn(V,F)}function A(I){if(I){if("rel material:binding"in I){const F=I["rel material:binding"].replace(/^<\//,"").replace(/>$/,"").split("/");return v(d,` "${F[1]}"`)}return v(I)}}function v(I,E=""){for(const y in I){const F=I[y];if(y.startsWith("def Material"+E))return F;if(typeof F=="object"){const V=v(F,E);if(V)return V}}}function _(I,E){E["float inputs:rotation"]&&(I.rotation=parseFloat(E["float inputs:rotation"])),E["float2 inputs:scale"]&&(I.repeat=new Pe().fromArray(JSON.parse("["+E["float2 inputs:scale"].replace(/[()]*/g,"")+"]"))),E["float2 inputs:translation"]&&(I.offset=new Pe().fromArray(JSON.parse("["+E["float2 inputs:translation"].replace(/[()]*/g,"")+"]")))}function C(I){const E=new $i;if(I!==void 0){if('def Shader "PreviewSurface"'in I){const y=I['def Shader "PreviewSurface"'];if("color3f inputs:diffuseColor.connect"in y){const F=y["color3f inputs:diffuseColor.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.map=L(V),E.map.colorSpace=ln,'def Shader "Transform2d_diffuse"'in I&&_(E.map,I['def Shader "Transform2d_diffuse"'])}else if("color3f inputs:diffuseColor"in y){const F=y["color3f inputs:diffuseColor"].replace(/[()]*/g,"");E.color.fromArray(JSON.parse("["+F+"]"))}if("color3f inputs:emissiveColor.connect"in y){const F=y["color3f inputs:emissiveColor.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.emissiveMap=L(V),E.emissiveMap.colorSpace=ln,E.emissive.set(16777215),'def Shader "Transform2d_emissive"'in I&&_(E.emissiveMap,I['def Shader "Transform2d_emissive"'])}else if("color3f inputs:emissiveColor"in y){const F=y["color3f inputs:emissiveColor"].replace(/[()]*/g,"");E.emissive.fromArray(JSON.parse("["+F+"]"))}if("normal3f inputs:normal.connect"in y){const F=y["normal3f inputs:normal.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.normalMap=L(V),E.normalMap.colorSpace=Fn,'def Shader "Transform2d_normal"'in I&&_(E.normalMap,I['def Shader "Transform2d_normal"'])}if("float inputs:roughness.connect"in y){const F=y["float inputs:roughness.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.roughness=1,E.roughnessMap=L(V),E.roughnessMap.colorSpace=Fn,'def Shader "Transform2d_roughness"'in I&&_(E.roughnessMap,I['def Shader "Transform2d_roughness"'])}else"float inputs:roughness"in y&&(E.roughness=parseFloat(y["float inputs:roughness"]));if("float inputs:metallic.connect"in y){const F=y["float inputs:metallic.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.metalness=1,E.metalnessMap=L(V),E.metalnessMap.colorSpace=Fn,'def Shader "Transform2d_metallic"'in I&&_(E.metalnessMap,I['def Shader "Transform2d_metallic"'])}else"float inputs:metallic"in y&&(E.metalness=parseFloat(y["float inputs:metallic"]));if("float inputs:clearcoat.connect"in y){const F=y["float inputs:clearcoat.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.clearcoat=1,E.clearcoatMap=L(V),E.clearcoatMap.colorSpace=Fn,'def Shader "Transform2d_clearcoat"'in I&&_(E.clearcoatMap,I['def Shader "Transform2d_clearcoat"'])}else"float inputs:clearcoat"in y&&(E.clearcoat=parseFloat(y["float inputs:clearcoat"]));if("float inputs:clearcoatRoughness.connect"in y){const F=y["float inputs:clearcoatRoughness.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.clearcoatRoughness=1,E.clearcoatRoughnessMap=L(V),E.clearcoatRoughnessMap.colorSpace=Fn,'def Shader "Transform2d_clearcoatRoughness"'in I&&_(E.clearcoatRoughnessMap,I['def Shader "Transform2d_clearcoatRoughness"'])}else"float inputs:clearcoatRoughness"in y&&(E.clearcoatRoughness=parseFloat(y["float inputs:clearcoatRoughness"]));if("float inputs:ior"in y&&(E.ior=parseFloat(y["float inputs:ior"])),"float inputs:occlusion.connect"in y){const F=y["float inputs:occlusion.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.aoMap=L(V),E.aoMap.colorSpace=Fn,'def Shader "Transform2d_occlusion"'in I&&_(E.aoMap,I['def Shader "Transform2d_occlusion"'])}}if('def Shader "diffuseColor_texture"'in I){const y=I['def Shader "diffuseColor_texture"'];E.map=L(y),E.map.colorSpace=ln}if('def Shader "normal_texture"'in I){const y=I['def Shader "normal_texture"'];E.normalMap=L(y),E.normalMap.colorSpace=Fn}}return E}function b(I,E){for(const y in I){const F=I[y];if(y.startsWith(`def Shader "${E}"`))return F;if(typeof F=="object"){const V=b(F,E);if(V)return V}}}function L(I){if("asset inputs:file"in I){const E=I["asset inputs:file"].replace(/@*/g,""),F=new F_().load(l[E]),V={'"clamp"':gr,'"mirror"':ba,'"repeat"':_s};return"token inputs:wrapS"in I&&(F.wrapS=V[I["token inputs:wrapS"]]),"token inputs:wrapT"in I&&(F.wrapT=V[I["token inputs:wrapT"]]),F}return null}function k(I){const E=x(p(I)),y=C(A(I)),F=E?new ye(E,y):new mt;if("matrix4d xformOp:transform"in I){const V=JSON.parse("["+I["matrix4d xformOp:transform"].replace(/[()]*/g,"")+"]");F.matrix.fromArray(V),F.matrix.decompose(F.position,F.quaternion,F.scale)}return F}function U(I,E){for(const y in I)if(y.startsWith("def Scope"))U(I[y],E);else if(y.startsWith("def Xform")){const F=k(I[y]);/def Xform "(\w+)"/.test(y)&&(F.name=/def Xform "(\w+)"/.exec(y)[1]),E.add(F),U(I[y],F)}}const O=new Xi;return U(d,O),O}}const VL={glb:{key:"glb",extension:".glb",options:{}},gltf:{key:"gltf",extension:".gltf",options:{}},usdz:{key:"usdz",extension:".usdz",options:{}}},WL=Object.values(VL).map(i=>i.extension);class XL{_gltfLoader;_usdzLoader;constructor(){this._gltfLoader=new VP,this._usdzLoader=new GL}async load(e){const t=this._getFileTypeFromUri(e);return this._load(e,t)}_getFileTypeFromUri(e){const t=e.split(".").pop()?.toLowerCase();if(!t||!WL.includes(t))throw new Error(`Unsupported file type: ${t}`);return t}async _load(e,t){switch(t){case"glb":case"gltf":return this._loadGltf(e);case"usdz":return this._loadUsdz(e)}}async _loadGltf(e){return(await this._gltfLoader.loadAsync(e)).scene}async _loadUsdz(e){return this._usdzLoader.loadAsync(e)}}class xf extends mt{isDIVERoot=!0;loader;constructor(){super(),this.name="Root",this.loader=new XL}ComputeSceneBB(){const e=new Ii;return this.traverse(t=>{"isObject3D"in t&&e.expandByObject(t)}),e}GetSceneObject(e){let t;return this.traverse(n=>{t||n.userData.id===e.id&&(t=n)}),t}AddSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.updateLight(e);break}case"model":{this.updateModel(e);break}case"primitive":{this.updatePrimitive(e);break}case"group":{this.updateGroup(e);break}default:console.warn(`DIVERoot.AddSceneObject: Unknown entity type: ${e.entityType}`)}}UpdateSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.updateLight(e);break}case"model":{this.updateModel(e);break}case"primitive":{this.updatePrimitive(e);break}case"group":{this.updateGroup(e);break}default:console.warn(`DIVERoot.UpdateSceneObject: Unknown entity type: ${e.entityType}`)}}DeleteSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.deleteLight(e);break}case"model":{this.deleteModel(e);break}case"primitive":{this.deletePrimitive(e);break}case"group":{this.deleteGroup(e);break}default:console.warn(`DIVERoot.DeleteSceneObject: Unknown entity type: ${e.entityType}`)}}PlaceOnFloor(e){switch(e.entityType){case"pov":case"light":break;case"model":case"primitive":{this.placeOnFloor(e);break}default:console.warn(`DIVERoot.PlaceOnFloor: Unknown entity type: ${e.entityType}`)}}updateLight(e){let t=this.GetSceneObject(e);if(!t){switch(e.type){case"scene":{t=new NP;break}case"ambient":{t=new xP;break}case"point":{t=new UP;break}default:{console.warn(`DIVERoot.updateLight: Unknown light type: ${e.type}`);return}}t.userData.id=e.id,this.add(t)}e.name!==void 0&&e.name!==null&&(t.name=e.name),e.position!==void 0&&e.position!==null&&t.position.set(e.position.x,e.position.y,e.position.z),e.intensity!==void 0&&e.intensity!==null&&t.SetIntensity(e.intensity),e.enabled!==void 0&&e.enabled!==null&&t.SetEnabled(e.enabled),e.color!==void 0&&e.color!==null&&t.SetColor(new Ne(e.color)),e.visible!==void 0&&e.visible!==null&&(t.visible=e.visible),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updateModel(e){let t=this.GetSceneObject(e);t||(t=new kP,t.userData.id=e.id,t.userData.uri=e.uri,this.add(t)),e.uri!==void 0&&this.loader.load(e.uri).then(n=>{t.SetModel(n),Cn.get(e.id)?.PerformAction("MODEL_LOADED",{id:e.id})}),e.name!==void 0&&(t.name=e.name),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.material!==void 0&&t.SetMaterial(e.material),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updatePrimitive(e){let t=this.GetSceneObject(e);t||(t=new HP,t.userData.id=e.id,this.add(t)),e.name!==void 0&&(t.name=e.name),e.geometry!==void 0&&t.SetGeometry(e.geometry),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.material!==void 0&&t.SetMaterial(e.material),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updateGroup(e){let t=this.GetSceneObject(e);t||(t=new GP,t.userData.id=e.id,this.add(t)),e.name!==void 0&&(t.name=e.name),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.bbVisible!==void 0&&t.SetLinesVisibility(e.bbVisible),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}deleteLight(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteLight: Light with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deleteModel(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteModel: Model with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deletePrimitive(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deletePrimitive: Primitive with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deleteGroup(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteGroup: Group with id ${e.id} not found`);return}this.detachTransformControls(t);for(let n=t.members.length-1;n>=0;n--)this.attach(t.members[n]);t.parent.remove(t)}placeOnFloor(e){const t=this.GetSceneObject(e);t&&t.PlaceOnFloor()}setParent(e){const t=this.GetSceneObject(e);if(t)if(e.parentId!==null){const n=this.GetSceneObject({id:e.parentId});if(!n)return;n.attach(t)}else this.attach(t)}detachTransformControls(e){this.findScene(e).children.find(t=>{"isTransformControls"in t&&t.detach()})}findScene(e){return e.parent!==null?this.findScene(e.parent):e}}const YL="#888888",jL="#dddddd";class qL extends mt{constructor(){super(),this.name="Grid";const e=new gP(100,100,YL,jL);e.material.depthTest=!1,e.layers.mask=z_,this.add(e)}SetVisibility(e){this.visible=e}}class KL extends ye{isFloor=!0;constructor(){super(new Ss(1e4,1e4),new Ro({color:new Ne(150/255,150/255,150/255)})),this.name="Floor",this.layers.mask=ti,this.receiveShadow=!0,this.rotateX(-Math.PI/2)}SetVisibility(e){this.visible=e}SetColor(e){this.material.color=new Ne(e)}}class ZL{constructor(e,t,n,r,o){this.xrLight=e,this.renderer=t,this.lightProbe=n,this.xrWebGLBinding=null,this.estimationStartCallback=o,this.frameCallback=this.onXRFrame.bind(this);const c=t.xr.getSession();if(r&&"XRWebGLBinding"in window){const l=new S_(16);e.environment=l.texture;const h=t.getContext();switch(c.preferredReflectionFormat){case"srgba8":h.getExtension("EXT_sRGB");break;case"rgba16f":h.getExtension("OES_texture_half_float");break}this.xrWebGLBinding=new XRWebGLBinding(c,h),this.lightProbe.addEventListener("reflectionchange",()=>{this.updateReflection()})}c.requestAnimationFrame(this.frameCallback)}updateReflection(){const e=this.renderer.properties.get(this.xrLight.environment);if(e){const t=this.xrWebGLBinding.getReflectionCubeMap(this.lightProbe);t&&(e.__webglTexture=t,this.xrLight.environment.needsPMREMUpdate=!0)}}onXRFrame(e,t){if(!this.xrLight)return;t.session.requestAnimationFrame(this.frameCallback);const r=t.getLightEstimate(this.lightProbe);if(r){this.xrLight.lightProbe.sh.fromArray(r.sphericalHarmonicsCoefficients),this.xrLight.lightProbe.intensity=1;const o=Math.max(1,Math.max(r.primaryLightIntensity.x,Math.max(r.primaryLightIntensity.y,r.primaryLightIntensity.z)));this.xrLight.directionalLight.color.setRGB(r.primaryLightIntensity.x/o,r.primaryLightIntensity.y/o,r.primaryLightIntensity.z/o),this.xrLight.directionalLight.intensity=o,this.xrLight.directionalLight.position.copy(r.primaryLightDirection),this.estimationStartCallback&&(this.estimationStartCallback(),this.estimationStartCallback=null)}}dispose(){this.xrLight=null,this.renderer=null,this.lightProbe=null,this.xrWebGLBinding=null}}class $L extends Xi{constructor(e,t=!0){super(),this.lightProbe=new sP,this.lightProbe.intensity=0,this.add(this.lightProbe),this.directionalLight=new ff,this.directionalLight.intensity=0,this.add(this.directionalLight),this.environment=null;let n=null,r=!1;e.xr.addEventListener("sessionstart",()=>{const o=e.xr.getSession();"requestLightProbe"in o&&o.requestLightProbe({reflectionFormat:o.preferredReflectionFormat}).then(c=>{n=new ZL(this,e,c,t,()=>{r=!0,this.dispatchEvent({type:"estimationstart"})})})}),e.xr.addEventListener("sessionend",()=>{n&&(n.dispose(),n=null),r&&this.dispatchEvent({type:"estimationend"})}),this.dispose=()=>{n&&(n.dispose(),n=null),this.remove(this.lightProbe),this.lightProbe=null,this.remove(this.directionalLight),this.directionalLight=null,this.environment=null}}}class JL extends mt{_scene;_xrLight;_lightRoot;constructor(e){super(),this.name="XRLightRoot",this._scene=e,this._xrLight=null,this._lightRoot=new xf,this._lightRoot.UpdateSceneObject({id:"XRSceneLight",entityType:"light",name:"XRSceneLight",type:"scene",color:16777215,intensity:1,enabled:!0,visible:!0}),this.add(this._lightRoot)}InitLightEstimation(e){this._xrLight||(this._xrLight=new $L(e,!0),this._xrLight.layers.mask=ti,this.add(this._xrLight)),this._xrLight.addEventListener("estimationstart",()=>{this.onEstimationStart()}),this._xrLight.addEventListener("estimationend",()=>{this.onEstimationEnd()})}DisposeLightEstimation(){this._xrLight&&(this._xrLight.removeEventListener("estimationstart",()=>{this.onEstimationStart()}),this._xrLight.removeEventListener("estimationend",()=>{this.onEstimationEnd()}))}onEstimationStart(){this._lightRoot.visible=!1,this._xrLight&&this._xrLight.environment&&(this._scene.environment=this._xrLight.environment)}onEstimationEnd(){this._lightRoot.visible=!0,this._scene.environment=null,this._xrLight}}class QL extends mt{_xrLightRoot;_xrModelRoot;_xrHandNode;get XRModelRoot(){return this._xrModelRoot}get XRLightRoot(){return this._xrLightRoot}get XRHandNode(){return this._xrHandNode}_xrShadowPlane;constructor(e){super(),this.name="XRRoot",this._xrModelRoot=new xf,this._xrModelRoot.name="XRModelRoot",this.add(this._xrModelRoot),this._xrShadowPlane=new ye(new Ss(100,100),new FC({opacity:1,transparent:!0})),this._xrModelRoot.add(this._xrShadowPlane),this._xrLightRoot=new JL(e),this._xrLightRoot.name="XRLightRoot",this.add(this._xrLightRoot),this._xrHandNode=new mt,this._xrHandNode.name="XRHandNode",this.add(this._xrHandNode)}InitLightEstimation(e){this._xrLightRoot.InitLightEstimation(e)}DisposeLightEstimation(){this._xrLightRoot.DisposeLightEstimation()}}class eI extends RC{_root;_floor;_grid;get Root(){return this._root}_xrRoot;get XRRoot(){return this._xrRoot}get Floor(){return this._floor}get Grid(){return this._grid}constructor(){super(),this.background=new Ne(16777215),this._root=new xf,this.add(this._root),this._floor=new KL,this.add(this._floor),this._grid=new qL,this.add(this._grid),this._xrRoot=new QL(this),this._xrRoot.visible=!1,this.add(this._xrRoot)}InitXR(e){this._root.visible=!1,this._xrRoot.visible=!0,this._xrRoot.InitLightEstimation(e)}DisposeXR(){this._root.visible=!0,this._xrRoot.visible=!1,this._xrRoot.DisposeLightEstimation()}SetBackground(e){this.background=new Ne(e)}ComputeSceneBB(){return this.Root.ComputeSceneBB()}GetSceneObject(e){return this.Root.GetSceneObject(e)}AddSceneObject(e){this.Root.AddSceneObject(e)}UpdateSceneObject(e){this.Root.UpdateSceneObject(e)}DeleteSceneObject(e){this.Root.DeleteSceneObject(e)}PlaceOnFloor(e){this.Root.PlaceOnFloor(e)}}const ga={fov:70,near:.1,far:1e3};class Ea extends Bn{static EDITOR_VIEW_LAYER_MASK=vP|mf|z_|ti;static LIVE_VIEW_LAYER_MASK=ti;onSetCameraLayer=()=>{};constructor(e=ga){super(e.fov||ga.fov,1,e.near||ga.near,e.far||ga.far),this.layers.mask=Ea.EDITOR_VIEW_LAYER_MASK}OnResize(e,t){this.aspect=e/t,this.updateProjectionMatrix()}SetCameraLayer(e){this.layers.mask=e==="LIVE"?Ea.LIVE_VIEW_LAYER_MASK:Ea.EDITOR_VIEW_LAYER_MASK,this.onSetCameraLayer(this.layers.mask)}}const Vg={type:"change"},Ch={type:"start"},Wg={type:"end"},nl=new To,Xg=new Hr,tI=Math.cos(70*ji.DEG2RAD);class nI extends ys{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bs.ROTATE,MIDDLE:Bs.DOLLY,RIGHT:Bs.PAN},this.touches={ONE:zs.ROTATE,TWO:zs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return l.phi},this.getAzimuthalAngle=function(){return l.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(S){S.addEventListener("keydown",Te),this._domElementKeyEvents=S},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Te),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Vg),n.update(),o=r.NONE},this.update=function(){const S=new N,Z=new on().setFromUnitVectors(e.up,new N(0,1,0)),oe=Z.clone().invert(),xe=new N,Re=new on,_t=new N,dt=2*Math.PI;return function(rn=null){const At=n.object.position;S.copy(At).sub(n.target),S.applyQuaternion(Z),l.setFromVector3(S),n.autoRotate&&o===r.NONE&&V(y(rn)),n.enableDamping?(l.theta+=h.theta*n.dampingFactor,l.phi+=h.phi*n.dampingFactor):(l.theta+=h.theta,l.phi+=h.phi);let Kt=n.minAzimuthAngle,Zt=n.maxAzimuthAngle;isFinite(Kt)&&isFinite(Zt)&&(Kt<-Math.PI?Kt+=dt:Kt>Math.PI&&(Kt-=dt),Zt<-Math.PI?Zt+=dt:Zt>Math.PI&&(Zt-=dt),Kt<=Zt?l.theta=Math.max(Kt,Math.min(Zt,l.theta)):l.theta=l.theta>(Kt+Zt)/2?Math.max(Kt,l.theta):Math.min(Zt,l.theta)),l.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,l.phi)),l.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Pn=!1;if(n.zoomToCursor&&U||n.object.isOrthographicCamera)l.radius=me(l.radius);else{const Sn=l.radius;l.radius=me(l.radius*f),Pn=Sn!=l.radius}if(S.setFromSpherical(l),S.applyQuaternion(oe),At.copy(n.target).add(S),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),d.set(0,0,0)),n.zoomToCursor&&U){let Sn=null;if(n.object.isPerspectiveCamera){const Di=S.length();Sn=me(Di*f);const Oi=Di-Sn;n.object.position.addScaledVector(L,Oi),n.object.updateMatrixWorld(),Pn=!!Oi}else if(n.object.isOrthographicCamera){const Di=new N(k.x,k.y,0);Di.unproject(n.object);const Oi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),n.object.updateProjectionMatrix(),Pn=Oi!==n.object.zoom;const Qi=new N(k.x,k.y,0);Qi.unproject(n.object),n.object.position.sub(Qi).add(Di),n.object.updateMatrixWorld(),Sn=S.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Sn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Sn).add(n.object.position):(nl.origin.copy(n.object.position),nl.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(nl.direction))<tI?e.lookAt(n.target):(Xg.setFromNormalAndCoplanarPoint(n.object.up,n.target),nl.intersectPlane(Xg,n.target))))}else if(n.object.isOrthographicCamera){const Sn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),Sn!==n.object.zoom&&(n.object.updateProjectionMatrix(),Pn=!0)}return f=1,U=!1,Pn||xe.distanceToSquared(n.object.position)>c||8*(1-Re.dot(n.object.quaternion))>c||_t.distanceToSquared(n.target)>c?(n.dispatchEvent(Vg),xe.copy(n.object.position),Re.copy(n.object.quaternion),_t.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ie),n.domElement.removeEventListener("pointerdown",te),n.domElement.removeEventListener("pointercancel",ue),n.domElement.removeEventListener("wheel",_e),n.domElement.removeEventListener("pointermove",ae),n.domElement.removeEventListener("pointerup",ue),n.domElement.getRootNode().removeEventListener("keydown",Ve,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Te),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=r.NONE;const c=1e-6,l=new wg,h=new wg;let f=1;const d=new N,p=new Pe,m=new Pe,x=new Pe,M=new Pe,A=new Pe,v=new Pe,_=new Pe,C=new Pe,b=new Pe,L=new N,k=new Pe;let U=!1;const O=[],I={};let E=!1;function y(S){return S!==null?2*Math.PI/60*n.autoRotateSpeed*S:2*Math.PI/60/60*n.autoRotateSpeed}function F(S){const Z=Math.abs(S*.01);return Math.pow(.95,n.zoomSpeed*Z)}function V(S){h.theta-=S}function G(S){h.phi-=S}const q=function(){const S=new N;return function(oe,xe){S.setFromMatrixColumn(xe,0),S.multiplyScalar(-oe),d.add(S)}}(),ne=function(){const S=new N;return function(oe,xe){n.screenSpacePanning===!0?S.setFromMatrixColumn(xe,1):(S.setFromMatrixColumn(xe,0),S.crossVectors(n.object.up,S)),S.multiplyScalar(oe),d.add(S)}}(),se=function(){const S=new N;return function(oe,xe){const Re=n.domElement;if(n.object.isPerspectiveCamera){const _t=n.object.position;S.copy(_t).sub(n.target);let dt=S.length();dt*=Math.tan(n.object.fov/2*Math.PI/180),q(2*oe*dt/Re.clientHeight,n.object.matrix),ne(2*xe*dt/Re.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(q(oe*(n.object.right-n.object.left)/n.object.zoom/Re.clientWidth,n.object.matrix),ne(xe*(n.object.top-n.object.bottom)/n.object.zoom/Re.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function pe(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?f/=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function K(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?f*=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function he(S,Z){if(!n.zoomToCursor)return;U=!0;const oe=n.domElement.getBoundingClientRect(),xe=S-oe.left,Re=Z-oe.top,_t=oe.width,dt=oe.height;k.x=xe/_t*2-1,k.y=-(Re/dt)*2+1,L.set(k.x,k.y,1).unproject(n.object).sub(n.object.position).normalize()}function me(S){return Math.max(n.minDistance,Math.min(n.maxDistance,S))}function Me(S){p.set(S.clientX,S.clientY)}function Ke(S){he(S.clientX,S.clientX),_.set(S.clientX,S.clientY)}function ot(S){M.set(S.clientX,S.clientY)}function ie(S){m.set(S.clientX,S.clientY),x.subVectors(m,p).multiplyScalar(n.rotateSpeed);const Z=n.domElement;V(2*Math.PI*x.x/Z.clientHeight),G(2*Math.PI*x.y/Z.clientHeight),p.copy(m),n.update()}function ge(S){C.set(S.clientX,S.clientY),b.subVectors(C,_),b.y>0?pe(F(b.y)):b.y<0&&K(F(b.y)),_.copy(C),n.update()}function we(S){A.set(S.clientX,S.clientY),v.subVectors(A,M).multiplyScalar(n.panSpeed),se(v.x,v.y),M.copy(A),n.update()}function Se(S){he(S.clientX,S.clientY),S.deltaY<0?K(F(S.deltaY)):S.deltaY>0&&pe(F(S.deltaY)),n.update()}function Ge(S){let Z=!1;switch(S.code){case n.keys.UP:S.ctrlKey||S.metaKey||S.shiftKey?G(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):se(0,n.keyPanSpeed),Z=!0;break;case n.keys.BOTTOM:S.ctrlKey||S.metaKey||S.shiftKey?G(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):se(0,-n.keyPanSpeed),Z=!0;break;case n.keys.LEFT:S.ctrlKey||S.metaKey||S.shiftKey?V(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):se(n.keyPanSpeed,0),Z=!0;break;case n.keys.RIGHT:S.ctrlKey||S.metaKey||S.shiftKey?V(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):se(-n.keyPanSpeed,0),Z=!0;break}Z&&(S.preventDefault(),n.update())}function Xe(S){if(O.length===1)p.set(S.pageX,S.pageY);else{const Z=Mt(S),oe=.5*(S.pageX+Z.x),xe=.5*(S.pageY+Z.y);p.set(oe,xe)}}function at(S){if(O.length===1)M.set(S.pageX,S.pageY);else{const Z=Mt(S),oe=.5*(S.pageX+Z.x),xe=.5*(S.pageY+Z.y);M.set(oe,xe)}}function j(S){const Z=Mt(S),oe=S.pageX-Z.x,xe=S.pageY-Z.y,Re=Math.sqrt(oe*oe+xe*xe);_.set(0,Re)}function $e(S){n.enableZoom&&j(S),n.enablePan&&at(S)}function ze(S){n.enableZoom&&j(S),n.enableRotate&&Xe(S)}function bt(S){if(O.length==1)m.set(S.pageX,S.pageY);else{const oe=Mt(S),xe=.5*(S.pageX+oe.x),Re=.5*(S.pageY+oe.y);m.set(xe,Re)}x.subVectors(m,p).multiplyScalar(n.rotateSpeed);const Z=n.domElement;V(2*Math.PI*x.x/Z.clientHeight),G(2*Math.PI*x.y/Z.clientHeight),p.copy(m)}function He(S){if(O.length===1)A.set(S.pageX,S.pageY);else{const Z=Mt(S),oe=.5*(S.pageX+Z.x),xe=.5*(S.pageY+Z.y);A.set(oe,xe)}v.subVectors(A,M).multiplyScalar(n.panSpeed),se(v.x,v.y),M.copy(A)}function Tt(S){const Z=Mt(S),oe=S.pageX-Z.x,xe=S.pageY-Z.y,Re=Math.sqrt(oe*oe+xe*xe);C.set(0,Re),b.set(0,Math.pow(C.y/_.y,n.zoomSpeed)),pe(b.y),_.copy(C);const _t=(S.pageX+Z.x)*.5,dt=(S.pageY+Z.y)*.5;he(_t,dt)}function B(S){n.enableZoom&&Tt(S),n.enablePan&&He(S)}function w(S){n.enableZoom&&Tt(S),n.enableRotate&&bt(S)}function te(S){n.enabled!==!1&&(O.length===0&&(n.domElement.setPointerCapture(S.pointerId),n.domElement.addEventListener("pointermove",ae),n.domElement.addEventListener("pointerup",ue)),!St(S)&&(ct(S),S.pointerType==="touch"?qe(S):de(S)))}function ae(S){n.enabled!==!1&&(S.pointerType==="touch"?Le(S):Be(S))}function ue(S){switch(ft(S),O.length){case 0:n.domElement.releasePointerCapture(S.pointerId),n.domElement.removeEventListener("pointermove",ae),n.domElement.removeEventListener("pointerup",ue),n.dispatchEvent(Wg),o=r.NONE;break;case 1:const Z=O[0],oe=I[Z];qe({pointerId:Z,pageX:oe.x,pageY:oe.y});break}}function de(S){let Z;switch(S.button){case 0:Z=n.mouseButtons.LEFT;break;case 1:Z=n.mouseButtons.MIDDLE;break;case 2:Z=n.mouseButtons.RIGHT;break;default:Z=-1}switch(Z){case Bs.DOLLY:if(n.enableZoom===!1)return;Ke(S),o=r.DOLLY;break;case Bs.ROTATE:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enablePan===!1)return;ot(S),o=r.PAN}else{if(n.enableRotate===!1)return;Me(S),o=r.ROTATE}break;case Bs.PAN:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enableRotate===!1)return;Me(S),o=r.ROTATE}else{if(n.enablePan===!1)return;ot(S),o=r.PAN}break;default:o=r.NONE}o!==r.NONE&&n.dispatchEvent(Ch)}function Be(S){switch(o){case r.ROTATE:if(n.enableRotate===!1)return;ie(S);break;case r.DOLLY:if(n.enableZoom===!1)return;ge(S);break;case r.PAN:if(n.enablePan===!1)return;we(S);break}}function _e(S){n.enabled===!1||n.enableZoom===!1||o!==r.NONE||(S.preventDefault(),n.dispatchEvent(Ch),Se(De(S)),n.dispatchEvent(Wg))}function De(S){const Z=S.deltaMode,oe={clientX:S.clientX,clientY:S.clientY,deltaY:S.deltaY};switch(Z){case 1:oe.deltaY*=16;break;case 2:oe.deltaY*=100;break}return S.ctrlKey&&!E&&(oe.deltaY*=10),oe}function Ve(S){S.key==="Control"&&(E=!0,n.domElement.getRootNode().addEventListener("keyup",ve,{passive:!0,capture:!0}))}function ve(S){S.key==="Control"&&(E=!1,n.domElement.getRootNode().removeEventListener("keyup",ve,{passive:!0,capture:!0}))}function Te(S){n.enabled===!1||n.enablePan===!1||Ge(S)}function qe(S){switch(gt(S),O.length){case 1:switch(n.touches.ONE){case zs.ROTATE:if(n.enableRotate===!1)return;Xe(S),o=r.TOUCH_ROTATE;break;case zs.PAN:if(n.enablePan===!1)return;at(S),o=r.TOUCH_PAN;break;default:o=r.NONE}break;case 2:switch(n.touches.TWO){case zs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;$e(S),o=r.TOUCH_DOLLY_PAN;break;case zs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ze(S),o=r.TOUCH_DOLLY_ROTATE;break;default:o=r.NONE}break;default:o=r.NONE}o!==r.NONE&&n.dispatchEvent(Ch)}function Le(S){switch(gt(S),o){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;bt(S),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;He(S),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;B(S),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;w(S),n.update();break;default:o=r.NONE}}function Ie(S){n.enabled!==!1&&S.preventDefault()}function ct(S){O.push(S.pointerId)}function ft(S){delete I[S.pointerId];for(let Z=0;Z<O.length;Z++)if(O[Z]==S.pointerId){O.splice(Z,1);return}}function St(S){for(let Z=0;Z<O.length;Z++)if(O[Z]==S.pointerId)return!0;return!1}function gt(S){let Z=I[S.pointerId];Z===void 0&&(Z=new Pe,I[S.pointerId]=Z),Z.set(S.pageX,S.pageY)}function Mt(S){const Z=S.pointerId===O[0]?O[1]:O[0];return I[Z]}n.domElement.addEventListener("contextmenu",Ie),n.domElement.addEventListener("pointerdown",te),n.domElement.addEventListener("pointercancel",ue),n.domElement.addEventListener("wheel",_e,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Ve,{passive:!0,capture:!0}),this.update()}}var xr=Object.freeze({Linear:Object.freeze({None:function(i){return i},In:function(i){return i},Out:function(i){return i},InOut:function(i){return i}}),Quadratic:Object.freeze({In:function(i){return i*i},Out:function(i){return i*(2-i)},InOut:function(i){return(i*=2)<1?.5*i*i:-.5*(--i*(i-2)-1)}}),Cubic:Object.freeze({In:function(i){return i*i*i},Out:function(i){return--i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i:.5*((i-=2)*i*i+2)}}),Quartic:Object.freeze({In:function(i){return i*i*i*i},Out:function(i){return 1- --i*i*i*i},InOut:function(i){return(i*=2)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2)}}),Quintic:Object.freeze({In:function(i){return i*i*i*i*i},Out:function(i){return--i*i*i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2)}}),Sinusoidal:Object.freeze({In:function(i){return 1-Math.sin((1-i)*Math.PI/2)},Out:function(i){return Math.sin(i*Math.PI/2)},InOut:function(i){return .5*(1-Math.sin(Math.PI*(.5-i)))}}),Exponential:Object.freeze({In:function(i){return i===0?0:Math.pow(1024,i-1)},Out:function(i){return i===1?1:1-Math.pow(2,-10*i)},InOut:function(i){return i===0?0:i===1?1:(i*=2)<1?.5*Math.pow(1024,i-1):.5*(-Math.pow(2,-10*(i-1))+2)}}),Circular:Object.freeze({In:function(i){return 1-Math.sqrt(1-i*i)},Out:function(i){return Math.sqrt(1- --i*i)},InOut:function(i){return(i*=2)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1)}}),Elastic:Object.freeze({In:function(i){return i===0?0:i===1?1:-Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI)},Out:function(i){return i===0?0:i===1?1:Math.pow(2,-10*i)*Math.sin((i-.1)*5*Math.PI)+1},InOut:function(i){return i===0?0:i===1?1:(i*=2,i<1?-.5*Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI):.5*Math.pow(2,-10*(i-1))*Math.sin((i-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(i){var e=1.70158;return i===1?1:i*i*((e+1)*i-e)},Out:function(i){var e=1.70158;return i===0?0:--i*i*((e+1)*i+e)+1},InOut:function(i){var e=2.5949095;return(i*=2)<1?.5*(i*i*((e+1)*i-e)):.5*((i-=2)*i*((e+1)*i+e)+2)}}),Bounce:Object.freeze({In:function(i){return 1-xr.Bounce.Out(1-i)},Out:function(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},InOut:function(i){return i<.5?xr.Bounce.In(i*2)*.5:xr.Bounce.Out(i*2-1)*.5+.5}}),generatePow:function(i){return i===void 0&&(i=4),i=i<Number.EPSILON?Number.EPSILON:i,i=i>1e4?1e4:i,{In:function(e){return Math.pow(e,i)},Out:function(e){return 1-Math.pow(1-e,i)},InOut:function(e){return e<.5?Math.pow(e*2,i)/2:(1-Math.pow(2-e*2,i))/2+.5}}}}),_a=function(){return performance.now()},iI=function(){function i(){this._tweens={},this._tweensAddedDuringUpdate={}}return i.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},i.prototype.removeAll=function(){this._tweens={}},i.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},i.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},i.prototype.update=function(e,t){e===void 0&&(e=_a()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<n.length;r++){var o=this._tweens[n[r]],c=!t;o&&o.update(e,c)===!1&&!t&&delete this._tweens[n[r]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},i}(),Kh={Linear:function(i,e){var t=i.length-1,n=t*e,r=Math.floor(n),o=Kh.Utils.Linear;return e<0?o(i[0],i[1],n):e>1?o(i[t],i[t-1],t-n):o(i[r],i[r+1>t?t:r+1],n-r)},Utils:{Linear:function(i,e,t){return(e-i)*t+i}}},$_=function(){function i(){}return i.nextId=function(){return i._nextId++},i._nextId=0,i}(),Zh=new iI,rI=function(){function i(e,t){t===void 0&&(t=Zh),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=xr.Linear.None,this._interpolationFunction=Kh.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=$_.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return i.prototype.getId=function(){return this._id},i.prototype.isPlaying=function(){return this._isPlaying},i.prototype.isPaused=function(){return this._isPaused},i.prototype.getDuration=function(){return this._duration},i.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t<0?0:t,this},i.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},i.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},i.prototype.start=function(e,t){if(e===void 0&&(e=_a()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var n in this._valuesStartRepeat)this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var r={};for(var o in this._valuesEnd)r[o]=this._valuesEnd[o];this._valuesEnd=r}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},i.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},i.prototype._setupProperties=function(e,t,n,r,o){for(var c in n){var l=e[c],h=Array.isArray(l),f=h?"array":typeof l,d=!h&&Array.isArray(n[c]);if(!(f==="undefined"||f==="function")){if(d){var p=n[c];if(p.length===0)continue;for(var m=[l],x=0,M=p.length;x<M;x+=1){var A=this._handleRelativeValue(l,p[x]);if(isNaN(A)){d=!1,console.warn("Found invalid interpolation list. Skipping.");break}m.push(A)}d&&(n[c]=m)}if((f==="object"||h)&&l&&!d){t[c]=h?[]:{};var v=l;for(var _ in v)t[c][_]=v[_];r[c]=h?[]:{};var p=n[c];if(!this._isDynamic){var C={};for(var _ in p)C[_]=p[_];n[c]=p=C}this._setupProperties(v,t[c],p,r[c],o)}else(typeof t[c]>"u"||o)&&(t[c]=l),h||(t[c]*=1),d?r[c]=n[c].slice().reverse():r[c]=t[c]||0}}},i.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},i.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},i.prototype.pause=function(e){return e===void 0&&(e=_a()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},i.prototype.resume=function(e){return e===void 0&&(e=_a()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},i.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},i.prototype.group=function(e){return e===void 0&&(e=Zh),this._group=e,this},i.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},i.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},i.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},i.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},i.prototype.easing=function(e){return e===void 0&&(e=xr.Linear.None),this._easingFunction=e,this},i.prototype.interpolation=function(e){return e===void 0&&(e=Kh.Linear),this._interpolationFunction=e,this},i.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},i.prototype.onStart=function(e){return this._onStartCallback=e,this},i.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},i.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},i.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},i.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},i.prototype.onStop=function(e){return this._onStopCallback=e,this},i.prototype.update=function(e,t){var n;if(e===void 0&&(e=_a()),t===void 0&&(t=!0),this._isPaused)return!0;var r=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>r)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var o=e-this._startTime,c=this._duration+((n=this._repeatDelayTime)!==null&&n!==void 0?n:this._delayTime),l=this._duration+this._repeat*c,h=this._calculateElapsedPortion(o,c,l),f=this._easingFunction(h),d=this._calculateCompletionStatus(o,c);if(d==="repeat"&&this._processRepetition(o,c),this._updateProperties(this._object,this._valuesStart,this._valuesEnd,f),d==="about-to-repeat"&&this._processRepetition(o,c),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),d==="repeat"||d==="about-to-repeat")this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1;else if(d==="completed"){this._isPlaying=!1,this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var p=0,m=this._chainedTweens.length;p<m;p++)this._chainedTweens[p].start(this._startTime+this._duration,!1)}return d!=="completed"},i.prototype._calculateElapsedPortion=function(e,t,n){if(this._duration===0||e>n)return 1;var r=e%t,o=Math.min(r/this._duration,1);return o===0&&e!==0&&e%this._duration===0?1:o},i.prototype._calculateCompletionStatus=function(e,t){return this._duration!==0&&e<this._duration?"playing":this._repeat<=0?"completed":e===this._duration?"about-to-repeat":"repeat"},i.prototype._processRepetition=function(e,t){var n=Math.min(Math.trunc((e-this._duration)/t)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=n);for(var r in this._valuesStartRepeat){var o=this._valuesEnd[r];!this._yoyo&&typeof o=="string"&&(this._valuesStartRepeat[r]=this._valuesStartRepeat[r]+parseFloat(o)),this._yoyo&&this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r]}this._yoyo&&(this._reversed=!this._reversed),this._startTime+=t*n},i.prototype._updateProperties=function(e,t,n,r){for(var o in n)if(t[o]!==void 0){var c=t[o]||0,l=n[o],h=Array.isArray(e[o]),f=Array.isArray(l),d=!h&&f;d?e[o]=this._interpolationFunction(l,r):typeof l=="object"&&l?this._updateProperties(e[o],c,l,r):(l=this._handleRelativeValue(c,l),typeof l=="number"&&(e[o]=c+(l-c)*r))}},i.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},i.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},i}();$_.nextId;var qi=Zh;qi.getAll.bind(qi);qi.removeAll.bind(qi);qi.add.bind(qi);qi.remove.bind(qi);var sI=qi.update.bind(qi);const cl={enableDamping:!0,dampingFactor:.04};class _l extends nI{static DEFAULT_ZOOM_FACTOR=1;_animationSystem;last=null;animating=!1;locked=!1;stopMoveTo=()=>{};stopRevertLast=()=>{};object;domElement;_removePreRenderCallback=()=>{};constructor(e,t,n,r=cl){super(e,t.domElement),this._animationSystem=n,this.domElement=t.domElement,this.object=e;const o=t.AddPreRenderCallback(()=>{this.preRenderCallback()});this._removePreRenderCallback=()=>{t.RemovePreRenderCallback(o)},this.enableDamping=r.enableDamping||cl.enableDamping,this.dampingFactor=r.dampingFactor||cl.dampingFactor,this.object.position.set(0,2,2),this.target.copy({x:0,y:.5,z:0}),this.update()}Dispose(){this._removePreRenderCallback(),this.dispose()}ComputeEncompassingView(e){const t=e.getCenter(new N),n=e.getSize(new N),r=Math.max(n.x,n.y,n.z)*1.25;return{position:this.object.position.clone().normalize().multiplyScalar(r),target:t}}ZoomIn(e){const t=e||_l.DEFAULT_ZOOM_FACTOR,{minDistance:n,maxDistance:r}=this;this.minDistance=this.maxDistance=ji.clamp(this.getDistance()-t,n+t,r-t),this.update(),this.minDistance=n,this.maxDistance=r}ZoomOut(e){const t=e||_l.DEFAULT_ZOOM_FACTOR,{minDistance:n,maxDistance:r}=this;this.minDistance=this.maxDistance=ji.clamp(this.getDistance()+t,n+t,r-t),this.update(),this.minDistance=n,this.maxDistance=r}MoveTo(e,t,n,r){if(this.animating)return;const o=e||this.object.position.clone(),c=t||this.target.clone();this.stopRevertLast(),this.locked||(this.last={pos:this.object.position.clone(),target:this.target.clone()}),this.animating=n>0,this.locked=r,this.enabled=!1;const l=this._animationSystem.Animate(this.object.position).to(o,n).easing(xr.Quadratic.Out).start(),h=this._animationSystem.Animate(this.target).to(c,n).easing(xr.Quadratic.Out).onUpdate(()=>{this.object.lookAt(this.target)}).onComplete(()=>{this.animating=!1,this.enabled=!r}).start();this.stopMoveTo=()=>{l.stop(),h.stop()}}RevertLast(e){if(this.animating||!this.locked)return;this.stopMoveTo(),this.animating=e>0,this.enabled=!1;const{pos:t,target:n}=this.last,r=this._animationSystem.Animate(this.object.position).to(t,e).easing(xr.Quadratic.Out).start(),o=this._animationSystem.Animate(this.target).to(n,e).easing(xr.Quadratic.Out).onUpdate(()=>{this.object.lookAt(this.target)}).onComplete(()=>{this.animating=!1,this.locked=!1,this.enabled=!0}).start();this.stopRevertLast=()=>{r.stop(),o.stop()}}preRenderCallback=()=>{this.locked||this.update()}}class oI{static DefaultTool="select";_scene;_controller;_activeTool;_selectTool;get selectTool(){return this._selectTool||(this._selectTool=new LP(this._scene,this._controller)),this._selectTool}constructor(e,t){this._scene=e,this._controller=t,this._selectTool=null,this._activeTool=null}Dispose(){this.removeEventListeners()}GetActiveTool(){return this._activeTool}UseTool(e){switch(this._activeTool?.Deactivate(),e){case"select":{this.addEventListeners(),this.selectTool.Activate(),this._activeTool=this.selectTool;break}case"none":{this.removeEventListeners(),this._activeTool=null;break}default:console.warn(`DIVEToolBox.UseTool: Unknown tool: ${e}`)}}SetGizmoMode(e){this.selectTool.SetGizmoMode(e)}SetGizmoVisibility(e){this.selectTool.SetGizmoVisibility(e)}SetGizmoScaleLinked(e){this.selectTool.SetGizmoScaleLinked(e)}onPointerMove(e){this._activeTool?.onPointerMove(e)}onPointerDown(e){this._activeTool?.onPointerDown(e)}onPointerUp(e){this._activeTool?.onPointerUp(e)}onWheel(e){this._activeTool?.onWheel(e)}addEventListeners(){this._controller.domElement.addEventListener("pointermove",e=>this.onPointerMove(e)),this._controller.domElement.addEventListener("pointerdown",e=>this.onPointerDown(e)),this._controller.domElement.addEventListener("pointerup",e=>this.onPointerUp(e)),this._controller.domElement.addEventListener("wheel",e=>this.onWheel(e))}removeEventListeners(){this._controller.domElement.removeEventListener("pointermove",e=>this.onPointerMove(e)),this._controller.domElement.removeEventListener("pointerdown",e=>this.onPointerDown(e)),this._controller.domElement.removeEventListener("pointerup",e=>this.onPointerUp(e)),this._controller.domElement.removeEventListener("wheel",e=>this.onWheel(e))}}class aI{_renderer;_rendererCallbackId;constructor(e){this._renderer=e,this._rendererCallbackId=this._renderer.AddPreRenderCallback(()=>{this.Update()})}Dispose(){this._renderer.RemovePreRenderCallback(this._rendererCallbackId)}Update(){sI()}Animate(e){return new rI(e)}}function cI(i,e,t){return e=vl(e),_I(i,J_()?Reflect.construct(e,t||[],vl(i).constructor):e.apply(i,t))}function J_(){try{var i=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(J_=function(){return!!i})()}function lI(i,e){var t=i==null?null:typeof Symbol<"u"&&i[Symbol.iterator]||i["@@iterator"];if(t!=null){var n,r,o,c,l=[],h=!0,f=!1;try{if(o=(t=t.call(i)).next,e===0){if(Object(t)!==t)return;h=!1}else for(;!(h=(n=o.call(t)).done)&&(l.push(n.value),l.length!==e);h=!0);}catch(d){f=!0,r=d}finally{try{if(!h&&t.return!=null&&(c=t.return(),Object(c)!==c))return}finally{if(f)throw r}}return l}}function uI(i,e){if(typeof i!="object"||!i)return i;var t=i[Symbol.toPrimitive];if(t!==void 0){var n=t.call(i,e);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(i)}function hI(i){var e=uI(i,"string");return typeof e=="symbol"?e:String(e)}function fI(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}function dI(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,hI(n.key),n)}}function pI(i,e,t){return e&&dI(i.prototype,e),Object.defineProperty(i,"prototype",{writable:!1}),i}function mI(i,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");i.prototype=Object.create(e&&e.prototype,{constructor:{value:i,writable:!0,configurable:!0}}),Object.defineProperty(i,"prototype",{writable:!1}),e&&$h(i,e)}function vl(i){return vl=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},vl(i)}function $h(i,e){return $h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},$h(i,e)}function gI(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function _I(i,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return gI(i)}function Yg(i,e){return xI(i)||lI(i,e)||Q_(i,e)||MI()}function il(i){return vI(i)||yI(i)||Q_(i)||SI()}function vI(i){if(Array.isArray(i))return Jh(i)}function xI(i){if(Array.isArray(i))return i}function yI(i){if(typeof Symbol<"u"&&i[Symbol.iterator]!=null||i["@@iterator"]!=null)return Array.from(i)}function Q_(i,e){if(i){if(typeof i=="string")return Jh(i,e);var t=Object.prototype.toString.call(i).slice(8,-1);if(t==="Object"&&i.constructor&&(t=i.constructor.name),t==="Map"||t==="Set")return Array.from(i);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Jh(i,e)}}function Jh(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=i[t];return n}function SI(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function MI(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var co=typeof window<"u"&&window.THREE?window.THREE:{LinearFilter:Wn,Sprite:CC,SpriteMaterial:P_,SRGBColorSpace:ln,Texture:un},Ph=function(i){mI(e,i);function e(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:10,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"rgba(255, 255, 255, 1)";return fI(this,e),t=cI(this,e,[new co.SpriteMaterial]),t._text="".concat(n),t._textHeight=r,t._color=o,t._backgroundColor=!1,t._padding=0,t._borderWidth=0,t._borderRadius=0,t._borderColor="white",t._strokeWidth=0,t._strokeColor="white",t._fontFace="system-ui",t._fontSize=90,t._fontWeight="normal",t._canvas=document.createElement("canvas"),t._genCanvas(),t}return pI(e,[{key:"text",get:function(){return this._text},set:function(n){this._text=n,this._genCanvas()}},{key:"textHeight",get:function(){return this._textHeight},set:function(n){this._textHeight=n,this._genCanvas()}},{key:"color",get:function(){return this._color},set:function(n){this._color=n,this._genCanvas()}},{key:"backgroundColor",get:function(){return this._backgroundColor},set:function(n){this._backgroundColor=n,this._genCanvas()}},{key:"padding",get:function(){return this._padding},set:function(n){this._padding=n,this._genCanvas()}},{key:"borderWidth",get:function(){return this._borderWidth},set:function(n){this._borderWidth=n,this._genCanvas()}},{key:"borderRadius",get:function(){return this._borderRadius},set:function(n){this._borderRadius=n,this._genCanvas()}},{key:"borderColor",get:function(){return this._borderColor},set:function(n){this._borderColor=n,this._genCanvas()}},{key:"fontFace",get:function(){return this._fontFace},set:function(n){this._fontFace=n,this._genCanvas()}},{key:"fontSize",get:function(){return this._fontSize},set:function(n){this._fontSize=n,this._genCanvas()}},{key:"fontWeight",get:function(){return this._fontWeight},set:function(n){this._fontWeight=n,this._genCanvas()}},{key:"strokeWidth",get:function(){return this._strokeWidth},set:function(n){this._strokeWidth=n,this._genCanvas()}},{key:"strokeColor",get:function(){return this._strokeColor},set:function(n){this._strokeColor=n,this._genCanvas()}},{key:"_genCanvas",value:function(){var n=this,r=this._canvas,o=r.getContext("2d"),c=Array.isArray(this.borderWidth)?this.borderWidth:[this.borderWidth,this.borderWidth],l=c.map(function(O){return O*n.fontSize*.1}),h=Array.isArray(this.borderRadius)?this.borderRadius:[this.borderRadius,this.borderRadius,this.borderRadius,this.borderRadius],f=h.map(function(O){return O*n.fontSize*.1}),d=Array.isArray(this.padding)?this.padding:[this.padding,this.padding],p=d.map(function(O){return O*n.fontSize*.1}),m=this.text.split(`
`),x="".concat(this.fontWeight," ").concat(this.fontSize,"px ").concat(this.fontFace);o.font=x;var M=Math.max.apply(Math,il(m.map(function(O){return o.measureText(O).width}))),A=this.fontSize*m.length;if(r.width=M+l[0]*2+p[0]*2,r.height=A+l[1]*2+p[1]*2,this.borderWidth){if(o.strokeStyle=this.borderColor,l[0]){var v=l[0]/2;o.lineWidth=l[0],o.beginPath(),o.moveTo(v,f[0]),o.lineTo(v,r.height-f[3]),o.moveTo(r.width-v,f[1]),o.lineTo(r.width-v,r.height-f[2]),o.stroke()}if(l[1]){var _=l[1]/2;o.lineWidth=l[1],o.beginPath(),o.moveTo(Math.max(l[0],f[0]),_),o.lineTo(r.width-Math.max(l[0],f[1]),_),o.moveTo(Math.max(l[0],f[3]),r.height-_),o.lineTo(r.width-Math.max(l[0],f[2]),r.height-_),o.stroke()}if(this.borderRadius){var C=Math.max.apply(Math,il(l)),b=C/2;o.lineWidth=C,o.beginPath(),[!!f[0]&&[f[0],b,b,f[0]],!!f[1]&&[r.width-f[1],r.width-b,b,f[1]],!!f[2]&&[r.width-f[2],r.width-b,r.height-b,r.height-f[2]],!!f[3]&&[f[3],b,r.height-b,r.height-f[3]]].filter(function(O){return O}).forEach(function(O){var I=Yg(O,4),E=I[0],y=I[1],F=I[2],V=I[3];o.moveTo(E,F),o.quadraticCurveTo(y,F,y,V)}),o.stroke()}}this.backgroundColor&&(o.fillStyle=this.backgroundColor,this.borderRadius?(o.beginPath(),o.moveTo(l[0],f[0]),[[l[0],f[0],r.width-f[1],l[1],l[1],l[1]],[r.width-l[0],r.width-l[0],r.width-l[0],l[1],f[1],r.height-f[2]],[r.width-l[0],r.width-f[2],f[3],r.height-l[1],r.height-l[1],r.height-l[1]],[l[0],l[0],l[0],r.height-l[1],r.height-f[3],f[0]]].forEach(function(O){var I=Yg(O,6),E=I[0],y=I[1],F=I[2],V=I[3],G=I[4],q=I[5];o.quadraticCurveTo(E,V,y,G),o.lineTo(F,q)}),o.closePath(),o.fill()):o.fillRect(l[0],l[1],r.width-l[0]*2,r.height-l[1]*2)),o.translate.apply(o,il(l)),o.translate.apply(o,il(p)),o.font=x,o.fillStyle=this.color,o.textBaseline="bottom";var L=this.strokeWidth>0;L&&(o.lineWidth=this.strokeWidth*this.fontSize/10,o.strokeStyle=this.strokeColor),m.forEach(function(O,I){var E=(M-o.measureText(O).width)/2,y=(I+1)*n.fontSize;L&&o.strokeText(O,E,y),o.fillText(O,E,y)}),this.material.map&&this.material.map.dispose();var k=this.material.map=new co.Texture(r);k.minFilter=co.LinearFilter,k.colorSpace=co.SRGBColorSpace,k.needsUpdate=!0;var U=this.textHeight*m.length+c[1]*2+d[1]*2;this.scale.set(U*r.width/r.height,U,0)}},{key:"clone",value:function(){return new this.constructor(this.text,this.textHeight,this.color).copy(this)}},{key:"copy",value:function(n){return co.Sprite.prototype.copy.call(this,n),this.color=n.color,this.backgroundColor=n.backgroundColor,this.padding=n.padding,this.borderWidth=n.borderWidth,this.borderColor=n.borderColor,this.fontFace=n.fontFace,this.fontSize=n.fontSize,this.fontWeight=n.fontWeight,this.strokeWidth=n.strokeWidth,this.strokeColor=n.strokeColor,this}}]),e}(co.Sprite);class jg extends Sl{axesHelper;_renderer;_scene;_renderCallbackId;constructor(e,t,n){super(-1,1,1,-1,.1,100),this.layers.mask=aa,this.axesHelper=new _P(.5),this.axesHelper.layers.mask=aa,this.axesHelper.material.depthTest=!1,this.axesHelper.position.set(0,0,-1),this.axesHelper.setColors(new Ne(Hh),new Ne(Gh),new Ne(Vh));const r=new Ph("X",.2,k_),o=new Ph("Y",.2,H_),c=new Ph("Z",.2,G_);r.layers.mask=aa,o.layers.mask=aa,c.layers.mask=aa,r.position.set(.7,0,0),o.position.set(0,.7,0),c.position.set(0,0,.7),this.axesHelper.add(r),this.axesHelper.add(o),this.axesHelper.add(c),this.add(this.axesHelper),this._renderer=e,this._scene=t,this._scene.add(this);const l=new Dt;this._renderCallbackId=e.AddPostRenderCallback(()=>{const h=t.background;t.background=null,e.getViewport(l),e.setViewport(0,0,150,150),e.autoClear=!1,this.SetFromCameraMatrix(n.object.matrix),e.render(t,this),e.setViewport(l),e.autoClear=!0,t.background=h})}Dispose(){this._renderer.RemovePostRenderCallback(this._renderCallbackId),this._scene.remove(this)}SetFromCameraMatrix(e){this.axesHelper.rotation.setFromRotationMatrix(new Qe().extractRotation(e).invert())}}const Qh=(i,e)=>{if(Object.keys(i).length===0&&Object.keys(e).length===0)return{};if(typeof i!="object"||typeof e!="object")return e;let t={};return Object.keys(e).forEach(n=>{if(!Object.keys(i).includes(n)){t={...t,[n]:e[n]};return}if(Array.isArray(e[n])){if(!Array.isArray(i[n])){t={...t,[n]:e[n]};return}const r=i[n],o=e[n];if(r.length===0&&o.length===0){t={...t};return}if(r.length!==o.length){t={...t,[n]:e[n]};return}const c=[];if(o.forEach((l,h)=>{const f=Qh(r[h],o[h]);Object.keys(f).length&&c.push(o[h])}),Object.keys(c).length){t={...t,[n]:c};return}return}if(typeof e[n]=="object"){if(typeof i[n]!="object"){t={...t,[n]:e[n]};return}const r=Qh(i[n],e[n]);if(Object.keys(r).length){t={...t,[n]:r};return}}i[n]!==e[n]&&(t={...t,[n]:e[n]})}),t};var ki=(i=>(i.IOS="iOS",i.ANDROID="Android",i.WINDOWS="Windows",i.MACOS="MacOS",i.LINUX="Linux",i.UNKNOWN="Unknown",i))(ki||{}),va=(i=>(i.NO_WEBXR_API="NO_WEBXR_API",i.NO_HTTPS="NO_HTTPS",i.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE="IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE",i.AR_PERMISSION_DENIED="AR_PERMISSION_DENIED",i.UNKNOWN_ERROR="UNKNOWN_ERROR",i))(va||{});class EI{static _supportsWebXR=!1;static _webXRUnsupportedReason=null;static GetSystem(){if(typeof window>"u"||!window.navigator)return ki.UNKNOWN;const e=window.navigator.userAgent.toLowerCase();return e.includes("iphone")||e.includes("ipad")?ki.IOS:e.includes("android")?ki.ANDROID:e.includes("windows")?ki.WINDOWS:e.includes("macintosh")?ki.MACOS:e.includes("linux")?ki.LINUX:ki.UNKNOWN}static async GetSupportsWebXR(){if(this._supportsWebXR!==!1)return this._supportsWebXR;if(!window.isSecureContext)return this._supportsWebXR=!1,this._webXRUnsupportedReason=va.NO_HTTPS,this._supportsWebXR;if(!navigator.xr)return this._supportsWebXR=!1,this._webXRUnsupportedReason=va.NO_WEBXR_API,this._supportsWebXR;try{const e=await navigator.xr.isSessionSupported("immersive-ar");this._supportsWebXR=e,this._supportsWebXR||(this._webXRUnsupportedReason=va.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE)}catch{this._supportsWebXR=!1,this._webXRUnsupportedReason=va.AR_PERMISSION_DENIED}return this._supportsWebXR}static GetWebXRUnsupportedReason(){return this._supportsWebXR?(console.log("WebXR is supported."),null):this._webXRUnsupportedReason}static GetSupportsARQuickLook(){return document.createElement("a").relList.supports("ar")}static GetSupportsSceneViewer(){if(typeof window>"u"||!window.navigator)return!1;const e=window.navigator.userAgent.toLowerCase();if(!e.includes("android")||!e.includes("chrome"))return!1;const t=e.match(/chrome\/(\d+)/);return!(!t||parseInt(t[1])<89)}static get isMobile(){return this.GetSystem()===ki.ANDROID||this.GetSystem()===ki.IOS}static get isDesktop(){return!this.isMobile}static async GetIsARCapable(){return this.GetSupportsARQuickLook()?!0:await this.GetSupportsWebXR()}}const bI="1.19.1-beta.0",TI={version:bI};function Ki(i,e){const t=(i+"e").split("e");return+(t[0]+"e"+(+t[1]+(e||0)))}function AI(i,e=0){const t=Ki(i,+e);return Ki(Math.ceil(t),-e)}function wI(i,e=0){const t=Ki(i,+e);return Ki(Math.floor(t),-e)}function e0(i,e=0){if(i<0)return-e0(-i,e);const t=Ki(i,+e);return Ki(Math.round(t),-e)}function RI(i,e,t){return Math.atan2(i.clone().cross(e).dot(t),e.clone().dot(i))}function CI(i,e=0){const t=Ki(i,+e);return Ki(Math.round(t),-e).toFixed(e)}function PI(i,e=0){const t=Ki(i,+e);return Ki(Math.trunc(t),-e)}function LI(i){return(ji.radToDeg(i)+360)%360}function II(i){return ji.degToRad(i)}const DI={ceilExp:AI,floorExp:wI,roundExp:e0,toFixedExp:CI,truncateExp:PI,signedAngleTo:RI,radToDeg:LI,degToRad:II},t0={autoResize:!0,autoStart:!0,displayAxes:!1,renderer:fs,perspectiveCamera:ga,orbitControls:cl};class bl{static QuickView(e,t){const n=new bl(t);n.Communication.PerformAction("SET_CAMERA_TRANSFORM",{position:{x:0,y:2,z:2},target:{x:0,y:.5,z:0}});const r=ji.generateUUID();n.Communication.PerformAction("ADD_OBJECT",{entityType:"light",type:"scene",name:"light",id:r,enabled:!0,visible:!0,intensity:1,color:16777215});const o=ji.generateUUID();return n.Communication.Subscribe("MODEL_LOADED",c=>{if(c.id!==o)return;const l=n.Communication.PerformAction("COMPUTE_ENCOMPASSING_VIEW",{});n.Communication.PerformAction("SET_CAMERA_TRANSFORM",{position:l.position,target:l.target})}),n.Communication.PerformAction("ADD_OBJECT",{entityType:"model",name:"object",id:o,position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},uri:e,visible:!0,loaded:!1}),n.Communication.PerformAction("UPDATE_SCENE",{backgroundColor:16777215,gridEnabled:!1,floorColor:16777215}),n}_settings;_resizeObserverId;_width;_height;renderer;scene;perspectiveCamera;orbitControls;toolbox;communication;animationSystem;axisCamera;get Communication(){return this.communication}get Canvas(){return this.renderer.domElement}get Info(){return EI}set Settings(e){const t=Qh(this._settings,e);t.renderer&&(this.renderer=new Rg(this._settings.renderer)),t.perspectiveCamera&&(t.perspectiveCamera.fov!==void 0&&(this.perspectiveCamera.fov=t.perspectiveCamera.fov),t.perspectiveCamera.near!==void 0&&(this.perspectiveCamera.near=t.perspectiveCamera.near),t.perspectiveCamera.far!==void 0&&(this.perspectiveCamera.far=t.perspectiveCamera.far),this.perspectiveCamera.OnResize(this.renderer.domElement.width,this.renderer.domElement.height)),t.orbitControls&&(t.orbitControls.enableDamping!==void 0&&(this.orbitControls.enableDamping=t.orbitControls.enableDamping),t.orbitControls.dampingFactor!==void 0&&(this.orbitControls.dampingFactor=t.orbitControls.dampingFactor)),t.autoResize!==this._settings.autoResize&&(t.autoResize?this.addResizeObserver():this.removeResizeObserver()),t.displayAxes?this.axisCamera=new jg(this.renderer,this.scene,this.orbitControls):(this.axisCamera?.Dispose(),this.axisCamera=null),Object.assign(this._settings,e)}constructor(e){this._settings={...t0,...e!==void 0?e:{}},this._resizeObserverId="",this._width=0,this._height=0,this.renderer=new Rg(this._settings.renderer),this.scene=new eI,this.perspectiveCamera=new Ea(this._settings.perspectiveCamera),this.animationSystem=new aI(this.renderer),this.orbitControls=new _l(this.perspectiveCamera,this.renderer,this.animationSystem,this._settings.orbitControls),this.toolbox=new oI(this.scene,this.orbitControls),this.communication=new Cn(this.renderer,this.scene,this.orbitControls,this.toolbox),this._settings.displayAxes?this.axisCamera=new jg(this.renderer,this.scene,this.orbitControls):this.axisCamera=null,this._settings.autoResize&&this.addResizeObserver(),window.DIVE={PrintScene:()=>{console.log(this.scene)}},console.log(`DIVE ${TI.version} initialized successfully!`),console.log(`
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

        `),this._settings.autoStart&&this.renderer.StartRenderer(this.scene,this.perspectiveCamera)}Dispose(){this.removeResizeObserver(),this.renderer.Dispose(),this.orbitControls.Dispose(),this.axisCamera?.Dispose(),this.animationSystem.Dispose(),this.toolbox.Dispose(),this.communication.DestroyInstance()}OnResize(e,t){this.renderer.OnResize(e,t),this.perspectiveCamera.OnResize(e,t)}addResizeObserver(){this._resizeObserverId=this.renderer.AddPreRenderCallback(()=>{const e=this.renderer.domElement.parentElement;if(!e)return;const{clientWidth:t,clientHeight:n}=e;t===this._width&&n===this._height||(this.OnResize(t,n),this._width=t,this._height=n)})}removeResizeObserver(){this.renderer.RemovePreRenderCallback(this._resizeObserverId)}}exports.DIVE=bl;exports.DIVECommunication=Cn;exports.DIVEDefaultSettings=t0;exports.DIVEMath=DI;exports.default=bl;
//# sourceMappingURL=dive.cjs.map
