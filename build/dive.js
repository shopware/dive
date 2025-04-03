var dive=function(jr){"use strict";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Al="163",bs={ROTATE:0,DOLLY:1,PAN:2},Ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},i0=0,Sf=1,r0=2,Mf=1,Ef=2,Qi=3,Di=0,kn=1,gi=2,Sr=0,As=1,bf=2,Tf=3,Af=4,s0=5,qr=100,o0=101,a0=102,c0=103,l0=104,u0=200,h0=201,f0=202,d0=203,wl=204,Rl=205,p0=206,m0=207,g0=208,_0=209,v0=210,x0=211,y0=212,S0=213,M0=214,E0=0,b0=1,T0=2,Oa=3,A0=4,w0=5,R0=6,C0=7,wf=0,P0=1,L0=2,er=0,I0=1,D0=2,O0=3,U0=4,N0=5,F0=6,B0=7,Rf="attached",z0="detached",Cf=300,ws=301,Rs=302,Cl=303,Pl=304,Ua=306,Kr=1e3,tr=1001,Do=1002,Pn=1003,Pf=1004,Oo=1005,Hn=1006,Na=1007,nr=1008,Mr=1009,k0=1010,H0=1011,Lf=1012,If=1013,Cs=1014,Oi=1015,Fa=1016,Df=1017,Of=1018,Uo=1020,G0=35902,V0=1021,W0=1022,_i=1023,X0=1024,Y0=1025,Ps=1026,No=1027,Uf=1028,Nf=1029,j0=1030,Ff=1031,Bf=1033,Ll=33776,Il=33777,Dl=33778,Ol=33779,zf=35840,kf=35841,Hf=35842,Gf=35843,Vf=36196,Wf=37492,Xf=37496,Yf=37808,jf=37809,qf=37810,Kf=37811,Zf=37812,$f=37813,Jf=37814,Qf=37815,ed=37816,td=37817,nd=37818,id=37819,rd=37820,sd=37821,Ul=36492,od=36494,ad=36495,q0=36283,cd=36284,ld=36285,ud=36286,Fo=2300,Ls=2301,Nl=2302,hd=2400,fd=2401,dd=2402,K0=2500,Z0=0,pd=1,Fl=2,$0=3200,J0=3201,md=0,Q0=1,Ln="",an="srgb",_n="srgb-linear",Bl="display-p3",Ba="display-p3-linear",za="linear",kt="srgb",ka="rec709",Ha="p3",Is=7680,gd=519,ev=512,tv=513,nv=514,_d=515,iv=516,rv=517,sv=518,ov=519,zl=35044,vd="300 es",ir=2e3,Ga=2001;class Zr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let o=0,c=r.length;o<c;o++)r[o].call(this,e);e.target=null}}}const Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xd=1234567;const Bo=Math.PI/180,Ds=180/Math.PI;function vi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Sn[i&255]+Sn[i>>8&255]+Sn[i>>16&255]+Sn[i>>24&255]+"-"+Sn[e&255]+Sn[e>>8&255]+"-"+Sn[e>>16&15|64]+Sn[e>>24&255]+"-"+Sn[t&63|128]+Sn[t>>8&255]+"-"+Sn[t>>16&255]+Sn[t>>24&255]+Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]).toLowerCase()}function vn(i,e,t){return Math.max(e,Math.min(t,i))}function kl(i,e){return(i%e+e)%e}function av(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function cv(i,e,t){return i!==e?(t-i)/(e-i):0}function zo(i,e,t){return(1-t)*i+t*e}function lv(i,e,t,n){return zo(i,e,1-Math.exp(-t*n))}function uv(i,e=1){return e-Math.abs(kl(i,e*2)-e)}function hv(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function fv(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function dv(i,e){return i+Math.floor(Math.random()*(e-i+1))}function pv(i,e){return i+Math.random()*(e-i)}function mv(i){return i*(.5-Math.random())}function gv(i){i!==void 0&&(xd=i);let e=xd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function _v(i){return i*Bo}function vv(i){return i*Ds}function xv(i){return(i&i-1)===0&&i!==0}function yv(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Sv(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Mv(i,e,t,n,r){const o=Math.cos,c=Math.sin,l=o(t/2),h=c(t/2),f=o((e+n)/2),d=c((e+n)/2),p=o((e-n)/2),m=c((e-n)/2),x=o((n-e)/2),M=c((n-e)/2);switch(r){case"XYX":i.set(l*d,h*p,h*m,l*f);break;case"YZY":i.set(h*m,l*d,h*p,l*f);break;case"ZXZ":i.set(h*p,h*m,l*d,l*f);break;case"XZX":i.set(l*d,h*M,h*x,l*f);break;case"YXY":i.set(h*x,l*d,h*M,l*f);break;case"ZYZ":i.set(h*M,h*x,l*d,l*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function xi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ui={DEG2RAD:Bo,RAD2DEG:Ds,generateUUID:vi,clamp:vn,euclideanModulo:kl,mapLinear:av,inverseLerp:cv,lerp:zo,damp:lv,pingpong:uv,smoothstep:hv,smootherstep:fv,randInt:dv,randFloat:pv,randFloatSpread:mv,seededRandom:gv,degToRad:_v,radToDeg:vv,isPowerOfTwo:xv,ceilPowerOfTwo:yv,floorPowerOfTwo:Sv,setQuaternionFromProperEuler:Mv,normalize:Pt,denormalize:xi};class Pe{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),o=this.x-e.x,c=this.y-e.y;return this.x=o*n-c*r+e.x,this.y=o*r+c*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ot{constructor(e,t,n,r,o,c,l,h,f){ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,c,l,h,f)}set(e,t,n,r,o,c,l,h,f){const d=this.elements;return d[0]=e,d[1]=r,d[2]=l,d[3]=t,d[4]=o,d[5]=h,d[6]=n,d[7]=c,d[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,c=n[0],l=n[3],h=n[6],f=n[1],d=n[4],p=n[7],m=n[2],x=n[5],M=n[8],A=r[0],v=r[3],_=r[6],C=r[1],b=r[4],L=r[7],k=r[2],U=r[5],O=r[8];return o[0]=c*A+l*C+h*k,o[3]=c*v+l*b+h*U,o[6]=c*_+l*L+h*O,o[1]=f*A+d*C+p*k,o[4]=f*v+d*b+p*U,o[7]=f*_+d*L+p*O,o[2]=m*A+x*C+M*k,o[5]=m*v+x*b+M*U,o[8]=m*_+x*L+M*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8];return t*c*d-t*l*f-n*o*d+n*l*h+r*o*f-r*c*h}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8],p=d*c-l*f,m=l*h-d*o,x=f*o-c*h,M=t*p+n*m+r*x;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/M;return e[0]=p*A,e[1]=(r*f-d*n)*A,e[2]=(l*n-r*c)*A,e[3]=m*A,e[4]=(d*t-r*h)*A,e[5]=(r*o-l*t)*A,e[6]=x*A,e[7]=(n*h-f*t)*A,e[8]=(c*t-n*o)*A,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,o,c,l){const h=Math.cos(o),f=Math.sin(o);return this.set(n*h,n*f,-n*(h*c+f*l)+c+e,-r*f,r*h,-r*(-f*c+h*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(Hl.makeScale(e,t)),this}rotate(e){return this.premultiply(Hl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Hl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hl=new ot;function yd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ko(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ev(){const i=ko("canvas");return i.style.display="block",i}const Sd={};function Md(i){i in Sd||(Sd[i]=!0,console.warn(i))}const Ed=new ot().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),bd=new ot().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Va={[_n]:{transfer:za,primaries:ka,toReference:i=>i,fromReference:i=>i},[an]:{transfer:kt,primaries:ka,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ba]:{transfer:za,primaries:Ha,toReference:i=>i.applyMatrix3(bd),fromReference:i=>i.applyMatrix3(Ed)},[Bl]:{transfer:kt,primaries:Ha,toReference:i=>i.convertSRGBToLinear().applyMatrix3(bd),fromReference:i=>i.applyMatrix3(Ed).convertLinearToSRGB()}},bv=new Set([_n,Ba]),Rt={enabled:!0,_workingColorSpace:_n,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!bv.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Va[e].toReference,r=Va[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Va[i].primaries},getTransfer:function(i){return i===Ln?za:Va[i].transfer}};function Os(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gl(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Us;class Tv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Us===void 0&&(Us=ko("canvas")),Us.width=e.width,Us.height=e.height;const n=Us.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Us}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ko("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),o=r.data;for(let c=0;c<o.length;c++)o[c]=Os(o[c]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Os(t[n]/255)*255):t[n]=Os(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Av=0;class Td{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Av++}),this.uuid=vi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let c=0,l=r.length;c<l;c++)r[c].isDataTexture?o.push(Vl(r[c].image)):o.push(Vl(r[c]))}else o=Vl(r);n.url=o}return t||(e.images[this.uuid]=n),n}}function Vl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Tv.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wv=0;class cn extends Zr{constructor(e=cn.DEFAULT_IMAGE,t=cn.DEFAULT_MAPPING,n=tr,r=tr,o=Hn,c=nr,l=_i,h=Mr,f=cn.DEFAULT_ANISOTROPY,d=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wv++}),this.uuid=vi(),this.name="",this.source=new Td(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=c,this.anisotropy=f,this.format=l,this.internalFormat=null,this.type=h,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Kr:e.x=e.x-Math.floor(e.x);break;case tr:e.x=e.x<0?0:1;break;case Do:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Kr:e.y=e.y-Math.floor(e.y);break;case tr:e.y=e.y<0?0:1;break;case Do:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null,cn.DEFAULT_MAPPING=Cf,cn.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,t=0,n=0,r=1){Dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=this.w,c=e.elements;return this.x=c[0]*t+c[4]*n+c[8]*r+c[12]*o,this.y=c[1]*t+c[5]*n+c[9]*r+c[13]*o,this.z=c[2]*t+c[6]*n+c[10]*r+c[14]*o,this.w=c[3]*t+c[7]*n+c[11]*r+c[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,o;const h=e.elements,f=h[0],d=h[4],p=h[8],m=h[1],x=h[5],M=h[9],A=h[2],v=h[6],_=h[10];if(Math.abs(d-m)<.01&&Math.abs(p-A)<.01&&Math.abs(M-v)<.01){if(Math.abs(d+m)<.1&&Math.abs(p+A)<.1&&Math.abs(M+v)<.1&&Math.abs(f+x+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(f+1)/2,L=(x+1)/2,k=(_+1)/2,U=(d+m)/4,O=(p+A)/4,I=(M+v)/4;return b>L&&b>k?b<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(b),r=U/n,o=O/n):L>k?L<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(L),n=U/r,o=I/r):k<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(k),n=O/o,r=I/o),this.set(n,r,o,t),this}let C=Math.sqrt((v-M)*(v-M)+(p-A)*(p-A)+(m-d)*(m-d));return Math.abs(C)<.001&&(C=1),this.x=(v-M)/C,this.y=(p-A)/C,this.z=(m-d)/C,this.w=Math.acos((f+x+_-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rv extends Zr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new cn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const c=n.count;for(let l=0;l<c;l++)this.textures[l]=o.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Td(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $r extends Rv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ad extends cn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=tr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cv extends cn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=tr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,o,c,l){let h=n[r+0],f=n[r+1],d=n[r+2],p=n[r+3];const m=o[c+0],x=o[c+1],M=o[c+2],A=o[c+3];if(l===0){e[t+0]=h,e[t+1]=f,e[t+2]=d,e[t+3]=p;return}if(l===1){e[t+0]=m,e[t+1]=x,e[t+2]=M,e[t+3]=A;return}if(p!==A||h!==m||f!==x||d!==M){let v=1-l;const _=h*m+f*x+d*M+p*A,C=_>=0?1:-1,b=1-_*_;if(b>Number.EPSILON){const k=Math.sqrt(b),U=Math.atan2(k,_*C);v=Math.sin(v*U)/k,l=Math.sin(l*U)/k}const L=l*C;if(h=h*v+m*L,f=f*v+x*L,d=d*v+M*L,p=p*v+A*L,v===1-l){const k=1/Math.sqrt(h*h+f*f+d*d+p*p);h*=k,f*=k,d*=k,p*=k}}e[t]=h,e[t+1]=f,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,o,c){const l=n[r],h=n[r+1],f=n[r+2],d=n[r+3],p=o[c],m=o[c+1],x=o[c+2],M=o[c+3];return e[t]=l*M+d*p+h*x-f*m,e[t+1]=h*M+d*m+f*p-l*x,e[t+2]=f*M+d*x+l*m-h*p,e[t+3]=d*M-l*p-h*m-f*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,o=e._z,c=e._order,l=Math.cos,h=Math.sin,f=l(n/2),d=l(r/2),p=l(o/2),m=h(n/2),x=h(r/2),M=h(o/2);switch(c){case"XYZ":this._x=m*d*p+f*x*M,this._y=f*x*p-m*d*M,this._z=f*d*M+m*x*p,this._w=f*d*p-m*x*M;break;case"YXZ":this._x=m*d*p+f*x*M,this._y=f*x*p-m*d*M,this._z=f*d*M-m*x*p,this._w=f*d*p+m*x*M;break;case"ZXY":this._x=m*d*p-f*x*M,this._y=f*x*p+m*d*M,this._z=f*d*M+m*x*p,this._w=f*d*p-m*x*M;break;case"ZYX":this._x=m*d*p-f*x*M,this._y=f*x*p+m*d*M,this._z=f*d*M-m*x*p,this._w=f*d*p+m*x*M;break;case"YZX":this._x=m*d*p+f*x*M,this._y=f*x*p+m*d*M,this._z=f*d*M-m*x*p,this._w=f*d*p-m*x*M;break;case"XZY":this._x=m*d*p-f*x*M,this._y=f*x*p-m*d*M,this._z=f*d*M+m*x*p,this._w=f*d*p+m*x*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],o=t[8],c=t[1],l=t[5],h=t[9],f=t[2],d=t[6],p=t[10],m=n+l+p;if(m>0){const x=.5/Math.sqrt(m+1);this._w=.25/x,this._x=(d-h)*x,this._y=(o-f)*x,this._z=(c-r)*x}else if(n>l&&n>p){const x=2*Math.sqrt(1+n-l-p);this._w=(d-h)/x,this._x=.25*x,this._y=(r+c)/x,this._z=(o+f)/x}else if(l>p){const x=2*Math.sqrt(1+l-n-p);this._w=(o-f)/x,this._x=(r+c)/x,this._y=.25*x,this._z=(h+d)/x}else{const x=2*Math.sqrt(1+p-n-l);this._w=(c-r)/x,this._x=(o+f)/x,this._y=(h+d)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,o=e._z,c=e._w,l=t._x,h=t._y,f=t._z,d=t._w;return this._x=n*d+c*l+r*f-o*h,this._y=r*d+c*h+o*l-n*f,this._z=o*d+c*f+n*h-r*l,this._w=c*d-n*l-r*h-o*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,o=this._z,c=this._w;let l=c*e._w+n*e._x+r*e._y+o*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=c,this._x=n,this._y=r,this._z=o,this;const h=1-l*l;if(h<=Number.EPSILON){const x=1-t;return this._w=x*c+t*this._w,this._x=x*n+t*this._x,this._y=x*r+t*this._y,this._z=x*o+t*this._z,this.normalize(),this}const f=Math.sqrt(h),d=Math.atan2(f,l),p=Math.sin((1-t)*d)/f,m=Math.sin(t*d)/f;return this._w=c*p+this._w*m,this._x=n*p+this._x*m,this._y=r*p+this._y*m,this._z=o*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*r,this.y=o[1]*t+o[4]*n+o[7]*r,this.z=o[2]*t+o[5]*n+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=e.elements,c=1/(o[3]*t+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*r+o[12])*c,this.y=(o[1]*t+o[5]*n+o[9]*r+o[13])*c,this.z=(o[2]*t+o[6]*n+o[10]*r+o[14])*c,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,o=e.x,c=e.y,l=e.z,h=e.w,f=2*(c*r-l*n),d=2*(l*t-o*r),p=2*(o*n-c*t);return this.x=t+h*f+c*p-l*d,this.y=n+h*d+l*f-o*p,this.z=r+h*p+o*d-c*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r,this.y=o[1]*t+o[5]*n+o[9]*r,this.z=o[2]*t+o[6]*n+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,o=e.z,c=t.x,l=t.y,h=t.z;return this.x=r*h-o*l,this.y=o*c-n*h,this.z=n*l-r*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wl.copy(this).projectOnVector(e),this.sub(Wl)}reflect(e){return this.sub(Wl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wl=new N,wd=new rn;class yi{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let c=0,l=o.count;c<l;c++)e.isMesh===!0?e.getVertexPosition(c,Si):Si.fromBufferAttribute(o,c),Si.applyMatrix4(e.matrixWorld),this.expandByPoint(Si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Wa.copy(n.boundingBox)),Wa.applyMatrix4(e.matrixWorld),this.union(Wa)}const r=e.children;for(let o=0,c=r.length;o<c;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Si),Si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ho),Xa.subVectors(this.max,Ho),Ns.subVectors(e.a,Ho),Fs.subVectors(e.b,Ho),Bs.subVectors(e.c,Ho),Er.subVectors(Fs,Ns),br.subVectors(Bs,Fs),Jr.subVectors(Ns,Bs);let t=[0,-Er.z,Er.y,0,-br.z,br.y,0,-Jr.z,Jr.y,Er.z,0,-Er.x,br.z,0,-br.x,Jr.z,0,-Jr.x,-Er.y,Er.x,0,-br.y,br.x,0,-Jr.y,Jr.x,0];return!Xl(t,Ns,Fs,Bs,Xa)||(t=[1,0,0,0,1,0,0,0,1],!Xl(t,Ns,Fs,Bs,Xa))?!1:(Ya.crossVectors(Er,br),t=[Ya.x,Ya.y,Ya.z],Xl(t,Ns,Fs,Bs,Xa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const rr=[new N,new N,new N,new N,new N,new N,new N,new N],Si=new N,Wa=new yi,Ns=new N,Fs=new N,Bs=new N,Er=new N,br=new N,Jr=new N,Ho=new N,Xa=new N,Ya=new N,Qr=new N;function Xl(i,e,t,n,r){for(let o=0,c=i.length-3;o<=c;o+=3){Qr.fromArray(i,o);const l=r.x*Math.abs(Qr.x)+r.y*Math.abs(Qr.y)+r.z*Math.abs(Qr.z),h=e.dot(Qr),f=t.dot(Qr),d=n.dot(Qr);if(Math.max(-Math.max(h,f,d),Math.min(h,f,d))>l)return!1}return!0}const Pv=new yi,Go=new N,Yl=new N;class Ni{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Pv.setFromPoints(e).getCenter(n);let r=0;for(let o=0,c=e.length;o<c;o++)r=Math.max(r,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Go.subVectors(e,this.center);const t=Go.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Go,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Go.copy(e.center).add(Yl)),this.expandByPoint(Go.copy(e.center).sub(Yl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sr=new N,jl=new N,ja=new N,Tr=new N,ql=new N,qa=new N,Kl=new N;class zs{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,sr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=sr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(sr.copy(this.origin).addScaledVector(this.direction,t),sr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){jl.copy(e).add(t).multiplyScalar(.5),ja.copy(t).sub(e).normalize(),Tr.copy(this.origin).sub(jl);const o=e.distanceTo(t)*.5,c=-this.direction.dot(ja),l=Tr.dot(this.direction),h=-Tr.dot(ja),f=Tr.lengthSq(),d=Math.abs(1-c*c);let p,m,x,M;if(d>0)if(p=c*h-l,m=c*l-h,M=o*d,p>=0)if(m>=-M)if(m<=M){const A=1/d;p*=A,m*=A,x=p*(p+c*m+2*l)+m*(c*p+m+2*h)+f}else m=o,p=Math.max(0,-(c*m+l)),x=-p*p+m*(m+2*h)+f;else m=-o,p=Math.max(0,-(c*m+l)),x=-p*p+m*(m+2*h)+f;else m<=-M?(p=Math.max(0,-(-c*o+l)),m=p>0?-o:Math.min(Math.max(-o,-h),o),x=-p*p+m*(m+2*h)+f):m<=M?(p=0,m=Math.min(Math.max(-o,-h),o),x=m*(m+2*h)+f):(p=Math.max(0,-(c*o+l)),m=p>0?o:Math.min(Math.max(-o,-h),o),x=-p*p+m*(m+2*h)+f);else m=c>0?-o:o,p=Math.max(0,-(c*m+l)),x=-p*p+m*(m+2*h)+f;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(jl).addScaledVector(ja,m),x}intersectSphere(e,t){sr.subVectors(e.center,this.origin);const n=sr.dot(this.direction),r=sr.dot(sr)-n*n,o=e.radius*e.radius;if(r>o)return null;const c=Math.sqrt(o-r),l=n-c,h=n+c;return h<0?null:l<0?this.at(h,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,o,c,l,h;const f=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,m=this.origin;return f>=0?(n=(e.min.x-m.x)*f,r=(e.max.x-m.x)*f):(n=(e.max.x-m.x)*f,r=(e.min.x-m.x)*f),d>=0?(o=(e.min.y-m.y)*d,c=(e.max.y-m.y)*d):(o=(e.max.y-m.y)*d,c=(e.min.y-m.y)*d),n>c||o>r||((o>n||isNaN(n))&&(n=o),(c<r||isNaN(r))&&(r=c),p>=0?(l=(e.min.z-m.z)*p,h=(e.max.z-m.z)*p):(l=(e.max.z-m.z)*p,h=(e.min.z-m.z)*p),n>h||l>r)||((l>n||n!==n)&&(n=l),(h<r||r!==r)&&(r=h),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,sr)!==null}intersectTriangle(e,t,n,r,o){ql.subVectors(t,e),qa.subVectors(n,e),Kl.crossVectors(ql,qa);let c=this.direction.dot(Kl),l;if(c>0){if(r)return null;l=1}else if(c<0)l=-1,c=-c;else return null;Tr.subVectors(this.origin,e);const h=l*this.direction.dot(qa.crossVectors(Tr,qa));if(h<0)return null;const f=l*this.direction.dot(ql.cross(Tr));if(f<0||h+f>c)return null;const d=-l*Tr.dot(Kl);return d<0?null:this.at(d/c,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,n,r,o,c,l,h,f,d,p,m,x,M,A,v){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,c,l,h,f,d,p,m,x,M,A,v)}set(e,t,n,r,o,c,l,h,f,d,p,m,x,M,A,v){const _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=r,_[1]=o,_[5]=c,_[9]=l,_[13]=h,_[2]=f,_[6]=d,_[10]=p,_[14]=m,_[3]=x,_[7]=M,_[11]=A,_[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ks.setFromMatrixColumn(e,0).length(),o=1/ks.setFromMatrixColumn(e,1).length(),c=1/ks.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*c,t[9]=n[9]*c,t[10]=n[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,o=e.z,c=Math.cos(n),l=Math.sin(n),h=Math.cos(r),f=Math.sin(r),d=Math.cos(o),p=Math.sin(o);if(e.order==="XYZ"){const m=c*d,x=c*p,M=l*d,A=l*p;t[0]=h*d,t[4]=-h*p,t[8]=f,t[1]=x+M*f,t[5]=m-A*f,t[9]=-l*h,t[2]=A-m*f,t[6]=M+x*f,t[10]=c*h}else if(e.order==="YXZ"){const m=h*d,x=h*p,M=f*d,A=f*p;t[0]=m+A*l,t[4]=M*l-x,t[8]=c*f,t[1]=c*p,t[5]=c*d,t[9]=-l,t[2]=x*l-M,t[6]=A+m*l,t[10]=c*h}else if(e.order==="ZXY"){const m=h*d,x=h*p,M=f*d,A=f*p;t[0]=m-A*l,t[4]=-c*p,t[8]=M+x*l,t[1]=x+M*l,t[5]=c*d,t[9]=A-m*l,t[2]=-c*f,t[6]=l,t[10]=c*h}else if(e.order==="ZYX"){const m=c*d,x=c*p,M=l*d,A=l*p;t[0]=h*d,t[4]=M*f-x,t[8]=m*f+A,t[1]=h*p,t[5]=A*f+m,t[9]=x*f-M,t[2]=-f,t[6]=l*h,t[10]=c*h}else if(e.order==="YZX"){const m=c*h,x=c*f,M=l*h,A=l*f;t[0]=h*d,t[4]=A-m*p,t[8]=M*p+x,t[1]=p,t[5]=c*d,t[9]=-l*d,t[2]=-f*d,t[6]=x*p+M,t[10]=m-A*p}else if(e.order==="XZY"){const m=c*h,x=c*f,M=l*h,A=l*f;t[0]=h*d,t[4]=-p,t[8]=f*d,t[1]=m*p+A,t[5]=c*d,t[9]=x*p-M,t[2]=M*p-x,t[6]=l*d,t[10]=A*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lv,e,Iv)}lookAt(e,t,n){const r=this.elements;return Yn.subVectors(e,t),Yn.lengthSq()===0&&(Yn.z=1),Yn.normalize(),Ar.crossVectors(n,Yn),Ar.lengthSq()===0&&(Math.abs(n.z)===1?Yn.x+=1e-4:Yn.z+=1e-4,Yn.normalize(),Ar.crossVectors(n,Yn)),Ar.normalize(),Ka.crossVectors(Yn,Ar),r[0]=Ar.x,r[4]=Ka.x,r[8]=Yn.x,r[1]=Ar.y,r[5]=Ka.y,r[9]=Yn.y,r[2]=Ar.z,r[6]=Ka.z,r[10]=Yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,c=n[0],l=n[4],h=n[8],f=n[12],d=n[1],p=n[5],m=n[9],x=n[13],M=n[2],A=n[6],v=n[10],_=n[14],C=n[3],b=n[7],L=n[11],k=n[15],U=r[0],O=r[4],I=r[8],E=r[12],y=r[1],F=r[5],V=r[9],G=r[13],q=r[2],ne=r[6],se=r[10],pe=r[14],K=r[3],he=r[7],me=r[11],Ee=r[15];return o[0]=c*U+l*y+h*q+f*K,o[4]=c*O+l*F+h*ne+f*he,o[8]=c*I+l*V+h*se+f*me,o[12]=c*E+l*G+h*pe+f*Ee,o[1]=d*U+p*y+m*q+x*K,o[5]=d*O+p*F+m*ne+x*he,o[9]=d*I+p*V+m*se+x*me,o[13]=d*E+p*G+m*pe+x*Ee,o[2]=M*U+A*y+v*q+_*K,o[6]=M*O+A*F+v*ne+_*he,o[10]=M*I+A*V+v*se+_*me,o[14]=M*E+A*G+v*pe+_*Ee,o[3]=C*U+b*y+L*q+k*K,o[7]=C*O+b*F+L*ne+k*he,o[11]=C*I+b*V+L*se+k*me,o[15]=C*E+b*G+L*pe+k*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],o=e[12],c=e[1],l=e[5],h=e[9],f=e[13],d=e[2],p=e[6],m=e[10],x=e[14],M=e[3],A=e[7],v=e[11],_=e[15];return M*(+o*h*p-r*f*p-o*l*m+n*f*m+r*l*x-n*h*x)+A*(+t*h*x-t*f*m+o*c*m-r*c*x+r*f*d-o*h*d)+v*(+t*f*p-t*l*x-o*c*p+n*c*x+o*l*d-n*f*d)+_*(-r*l*d-t*h*p+t*l*m+r*c*p-n*c*m+n*h*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],c=e[4],l=e[5],h=e[6],f=e[7],d=e[8],p=e[9],m=e[10],x=e[11],M=e[12],A=e[13],v=e[14],_=e[15],C=p*v*f-A*m*f+A*h*x-l*v*x-p*h*_+l*m*_,b=M*m*f-d*v*f-M*h*x+c*v*x+d*h*_-c*m*_,L=d*A*f-M*p*f+M*l*x-c*A*x-d*l*_+c*p*_,k=M*p*h-d*A*h-M*l*m+c*A*m+d*l*v-c*p*v,U=t*C+n*b+r*L+o*k;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/U;return e[0]=C*O,e[1]=(A*m*o-p*v*o-A*r*x+n*v*x+p*r*_-n*m*_)*O,e[2]=(l*v*o-A*h*o+A*r*f-n*v*f-l*r*_+n*h*_)*O,e[3]=(p*h*o-l*m*o-p*r*f+n*m*f+l*r*x-n*h*x)*O,e[4]=b*O,e[5]=(d*v*o-M*m*o+M*r*x-t*v*x-d*r*_+t*m*_)*O,e[6]=(M*h*o-c*v*o-M*r*f+t*v*f+c*r*_-t*h*_)*O,e[7]=(c*m*o-d*h*o+d*r*f-t*m*f-c*r*x+t*h*x)*O,e[8]=L*O,e[9]=(M*p*o-d*A*o-M*n*x+t*A*x+d*n*_-t*p*_)*O,e[10]=(c*A*o-M*l*o+M*n*f-t*A*f-c*n*_+t*l*_)*O,e[11]=(d*l*o-c*p*o-d*n*f+t*p*f+c*n*x-t*l*x)*O,e[12]=k*O,e[13]=(d*A*r-M*p*r+M*n*m-t*A*m-d*n*v+t*p*v)*O,e[14]=(M*l*r-c*A*r-M*n*h+t*A*h+c*n*v-t*l*v)*O,e[15]=(c*p*r-d*l*r+d*n*h-t*p*h-c*n*m+t*l*m)*O,this}scale(e){const t=this.elements,n=e.x,r=e.y,o=e.z;return t[0]*=n,t[4]*=r,t[8]*=o,t[1]*=n,t[5]*=r,t[9]*=o,t[2]*=n,t[6]*=r,t[10]*=o,t[3]*=n,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),o=1-n,c=e.x,l=e.y,h=e.z,f=o*c,d=o*l;return this.set(f*c+n,f*l-r*h,f*h+r*l,0,f*l+r*h,d*l+n,d*h-r*c,0,f*h-r*l,d*h+r*c,o*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,o,c){return this.set(1,n,o,0,e,1,c,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,o=t._x,c=t._y,l=t._z,h=t._w,f=o+o,d=c+c,p=l+l,m=o*f,x=o*d,M=o*p,A=c*d,v=c*p,_=l*p,C=h*f,b=h*d,L=h*p,k=n.x,U=n.y,O=n.z;return r[0]=(1-(A+_))*k,r[1]=(x+L)*k,r[2]=(M-b)*k,r[3]=0,r[4]=(x-L)*U,r[5]=(1-(m+_))*U,r[6]=(v+C)*U,r[7]=0,r[8]=(M+b)*O,r[9]=(v-C)*O,r[10]=(1-(m+A))*O,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let o=ks.set(r[0],r[1],r[2]).length();const c=ks.set(r[4],r[5],r[6]).length(),l=ks.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],Mi.copy(this);const f=1/o,d=1/c,p=1/l;return Mi.elements[0]*=f,Mi.elements[1]*=f,Mi.elements[2]*=f,Mi.elements[4]*=d,Mi.elements[5]*=d,Mi.elements[6]*=d,Mi.elements[8]*=p,Mi.elements[9]*=p,Mi.elements[10]*=p,t.setFromRotationMatrix(Mi),n.x=o,n.y=c,n.z=l,this}makePerspective(e,t,n,r,o,c,l=ir){const h=this.elements,f=2*o/(t-e),d=2*o/(n-r),p=(t+e)/(t-e),m=(n+r)/(n-r);let x,M;if(l===ir)x=-(c+o)/(c-o),M=-2*c*o/(c-o);else if(l===Ga)x=-c/(c-o),M=-c*o/(c-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=f,h[4]=0,h[8]=p,h[12]=0,h[1]=0,h[5]=d,h[9]=m,h[13]=0,h[2]=0,h[6]=0,h[10]=x,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,r,o,c,l=ir){const h=this.elements,f=1/(t-e),d=1/(n-r),p=1/(c-o),m=(t+e)*f,x=(n+r)*d;let M,A;if(l===ir)M=(c+o)*p,A=-2*p;else if(l===Ga)M=o*p,A=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=2*f,h[4]=0,h[8]=0,h[12]=-m,h[1]=0,h[5]=2*d,h[9]=0,h[13]=-x,h[2]=0,h[6]=0,h[10]=A,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ks=new N,Mi=new Qe,Lv=new N(0,0,0),Iv=new N(1,1,1),Ar=new N,Ka=new N,Yn=new N,Rd=new Qe,Cd=new rn;class Ei{constructor(e=0,t=0,n=0,r=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,o=r[0],c=r[4],l=r[8],h=r[1],f=r[5],d=r[9],p=r[2],m=r[6],x=r[10];switch(t){case"XYZ":this._y=Math.asin(vn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,x),this._z=Math.atan2(-c,o)):(this._x=Math.atan2(m,f),this._z=0);break;case"YXZ":this._x=Math.asin(-vn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,x),this._z=Math.atan2(h,f)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(vn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,x),this._z=Math.atan2(-c,f)):(this._y=0,this._z=Math.atan2(h,o));break;case"ZYX":this._y=Math.asin(-vn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,x),this._z=Math.atan2(h,o)):(this._x=0,this._z=Math.atan2(-c,f));break;case"YZX":this._z=Math.asin(vn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,f),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(l,x));break;case"XZY":this._z=Math.asin(-vn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(m,f),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-d,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cd.setFromEuler(this),this.setFromQuaternion(Cd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class Zl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Dv=0;const Pd=new N,Hs=new rn,or=new Qe,Za=new N,Vo=new N,Ov=new N,Uv=new rn,Ld=new N(1,0,0),Id=new N(0,1,0),Dd=new N(0,0,1),Od={type:"added"},Nv={type:"removed"},Gs={type:"childadded",child:null},$l={type:"childremoved",child:null};class mt extends Zr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dv++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new N,t=new Ei,n=new rn,r=new N(1,1,1);function o(){n.setFromEuler(t,!1)}function c(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Qe},normalMatrix:{value:new ot}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.multiply(Hs),this}rotateOnWorldAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.premultiply(Hs),this}rotateX(e){return this.rotateOnAxis(Ld,e)}rotateY(e){return this.rotateOnAxis(Id,e)}rotateZ(e){return this.rotateOnAxis(Dd,e)}translateOnAxis(e,t){return Pd.copy(e).applyQuaternion(this.quaternion),this.position.add(Pd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ld,e)}translateY(e){return this.translateOnAxis(Id,e)}translateZ(e){return this.translateOnAxis(Dd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(or.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Za.copy(e):Za.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?or.lookAt(Vo,Za,this.up):or.lookAt(Za,Vo,this.up),this.quaternion.setFromRotationMatrix(or),r&&(or.extractRotation(r.matrixWorld),Hs.setFromRotationMatrix(or),this.quaternion.premultiply(Hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Od),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nv),$l.child=e,this.dispatchEvent($l),$l.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),or.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),or.multiply(e.parent.matrixWorld)),e.applyMatrix4(or),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Od),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const c=this.children[n].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,e,Ov),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,Uv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let o=0,c=r.length;o<c;o++){const l=r[o];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const h=l.shapes;if(Array.isArray(h))for(let f=0,d=h.length;f<d;f++){const p=h[f];o(e.shapes,p)}else o(e.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let h=0,f=this.material.length;h<f;h++)l.push(o(e.materials,this.material[h]));r.material=l}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const h=this.animations[l];r.animations.push(o(e.animations,h))}}if(t){const l=c(e.geometries),h=c(e.materials),f=c(e.textures),d=c(e.images),p=c(e.shapes),m=c(e.skeletons),x=c(e.animations),M=c(e.nodes);l.length>0&&(n.geometries=l),h.length>0&&(n.materials=h),f.length>0&&(n.textures=f),d.length>0&&(n.images=d),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),x.length>0&&(n.animations=x),M.length>0&&(n.nodes=M)}return n.object=r,n;function c(l){const h=[];for(const f in l){const d=l[f];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}mt.DEFAULT_UP=new N(0,1,0),mt.DEFAULT_MATRIX_AUTO_UPDATE=!0,mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bi=new N,ar=new N,Jl=new N,cr=new N,Vs=new N,Ws=new N,Ud=new N,Ql=new N,eu=new N,tu=new N;class Ti{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),bi.subVectors(e,t),r.cross(bi);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,n,r,o){bi.subVectors(r,t),ar.subVectors(n,t),Jl.subVectors(e,t);const c=bi.dot(bi),l=bi.dot(ar),h=bi.dot(Jl),f=ar.dot(ar),d=ar.dot(Jl),p=c*f-l*l;if(p===0)return o.set(0,0,0),null;const m=1/p,x=(f*h-l*d)*m,M=(c*d-l*h)*m;return o.set(1-x-M,M,x)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,cr)===null?!1:cr.x>=0&&cr.y>=0&&cr.x+cr.y<=1}static getInterpolation(e,t,n,r,o,c,l,h){return this.getBarycoord(e,t,n,r,cr)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(o,cr.x),h.addScaledVector(c,cr.y),h.addScaledVector(l,cr.z),h)}static isFrontFacing(e,t,n,r){return bi.subVectors(n,t),ar.subVectors(e,t),bi.cross(ar).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),ar.subVectors(this.a,this.b),bi.cross(ar).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(.3333333333333333)}getNormal(e){return Ti.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ti.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,o){return Ti.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}containsPoint(e){return Ti.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ti.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,o=this.c;let c,l;Vs.subVectors(r,n),Ws.subVectors(o,n),Ql.subVectors(e,n);const h=Vs.dot(Ql),f=Ws.dot(Ql);if(h<=0&&f<=0)return t.copy(n);eu.subVectors(e,r);const d=Vs.dot(eu),p=Ws.dot(eu);if(d>=0&&p<=d)return t.copy(r);const m=h*p-d*f;if(m<=0&&h>=0&&d<=0)return c=h/(h-d),t.copy(n).addScaledVector(Vs,c);tu.subVectors(e,o);const x=Vs.dot(tu),M=Ws.dot(tu);if(M>=0&&x<=M)return t.copy(o);const A=x*f-h*M;if(A<=0&&f>=0&&M<=0)return l=f/(f-M),t.copy(n).addScaledVector(Ws,l);const v=d*M-x*p;if(v<=0&&p-d>=0&&x-M>=0)return Ud.subVectors(o,r),l=(p-d)/(p-d+(x-M)),t.copy(r).addScaledVector(Ud,l);const _=1/(v+A+m);return c=A*_,l=m*_,t.copy(n).addScaledVector(Vs,c).addScaledVector(Ws,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wr={h:0,s:0,l:0},$a={h:0,s:0,l:0};function nu(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<.16666666666666666?i+(e-i)*6*t:t<.5?e:t<.6666666666666666?i+(e-i)*6*(.6666666666666666-t):i}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Rt.workingColorSpace){if(e=kl(e,1),t=vn(t,0,1),n=vn(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,c=2*n-o;this.r=nu(c,o,e+.3333333333333333),this.g=nu(c,o,e),this.b=nu(c,o,e-.3333333333333333)}return Rt.toWorkingColorSpace(this,r),this}setStyle(e,t=an){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const c=r[1],l=r[2];switch(c){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=r[1],c=o.length;if(c===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){const n=Nd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}copyLinearToSRGB(e){return this.r=Gl(e.r),this.g=Gl(e.g),this.b=Gl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return Rt.fromWorkingColorSpace(Mn.copy(this),e),Math.round(vn(Mn.r*255,0,255))*65536+Math.round(vn(Mn.g*255,0,255))*256+Math.round(vn(Mn.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.fromWorkingColorSpace(Mn.copy(this),t);const n=Mn.r,r=Mn.g,o=Mn.b,c=Math.max(n,r,o),l=Math.min(n,r,o);let h,f;const d=(l+c)/2;if(l===c)h=0,f=0;else{const p=c-l;switch(f=d<=.5?p/(c+l):p/(2-c-l),c){case n:h=(r-o)/p+(r<o?6:0);break;case r:h=(o-n)/p+2;break;case o:h=(n-r)/p+4;break}h/=6}return e.h=h,e.s=f,e.l=d,e}getRGB(e,t=Rt.workingColorSpace){return Rt.fromWorkingColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=an){Rt.fromWorkingColorSpace(Mn.copy(this),e);const t=Mn.r,n=Mn.g,r=Mn.b;return e!==an?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(wr),this.setHSL(wr.h+e,wr.s+t,wr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wr),e.getHSL($a);const n=zo(wr.h,$a.h,t),r=zo(wr.s,$a.s,t),o=zo(wr.l,$a.l,t);return this.setHSL(n,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*r,this.g=o[1]*t+o[4]*n+o[7]*r,this.b=o[2]*t+o[5]*n+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mn=new Ne;Ne.NAMES=Nd;let Fv=0;class ni extends Zr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fv++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=As,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wl,this.blendDst=Rl,this.blendEquation=qr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Oa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Is,this.stencilZFail=Is,this.stencilZPass=Is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==As&&(n.blending=this.blending),this.side!==Di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wl&&(n.blendSrc=this.blendSrc),this.blendDst!==Rl&&(n.blendDst=this.blendDst),this.blendEquation!==qr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Is&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Is&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Is&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}if(t){const o=r(e.textures),c=r(e.images);o.length>0&&(n.textures=o),c.length>0&&(n.images=c)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Fi extends ni{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=wf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const sn=new N,Ja=new Pe;class Qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=zl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Md("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ja.fromBufferAttribute(this,t),Ja.applyMatrix3(e),this.setXY(t,Ja.x,Ja.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix3(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),o=Pt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zl&&(e.usage=this.usage),e}}class Fd extends Qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Bd extends Qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ot extends Qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Bv=0;const ii=new Qe,iu=new mt,Xs=new N,jn=new yi,Wo=new yi,dn=new N;class Kt extends Zr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bv++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yd(e)?Bd:Fd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ot().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ii.makeRotationFromQuaternion(e),this.applyMatrix4(ii),this}rotateX(e){return ii.makeRotationX(e),this.applyMatrix4(ii),this}rotateY(e){return ii.makeRotationY(e),this.applyMatrix4(ii),this}rotateZ(e){return ii.makeRotationZ(e),this.applyMatrix4(ii),this}translate(e,t,n){return ii.makeTranslation(e,t,n),this.applyMatrix4(ii),this}scale(e,t,n){return ii.makeScale(e,t,n),this.applyMatrix4(ii),this}lookAt(e){return iu.lookAt(e),iu.updateMatrix(),this.applyMatrix4(iu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xs).negate(),this.translate(Xs.x,Xs.y,Xs.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Ot(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const o=t[n];jn.setFromBufferAttribute(o),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(jn.setFromBufferAttribute(e),t)for(let o=0,c=t.length;o<c;o++){const l=t[o];Wo.setFromBufferAttribute(l),this.morphTargetsRelative?(dn.addVectors(jn.min,Wo.min),jn.expandByPoint(dn),dn.addVectors(jn.max,Wo.max),jn.expandByPoint(dn)):(jn.expandByPoint(Wo.min),jn.expandByPoint(Wo.max))}jn.getCenter(n);let r=0;for(let o=0,c=e.count;o<c;o++)dn.fromBufferAttribute(e,o),r=Math.max(r,n.distanceToSquared(dn));if(t)for(let o=0,c=t.length;o<c;o++){const l=t[o],h=this.morphTargetsRelative;for(let f=0,d=l.count;f<d;f++)dn.fromBufferAttribute(l,f),h&&(Xs.fromBufferAttribute(e,f),dn.add(Xs)),r=Math.max(r,n.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qt(new Float32Array(4*n.count),4));const c=this.getAttribute("tangent"),l=[],h=[];for(let I=0;I<n.count;I++)l[I]=new N,h[I]=new N;const f=new N,d=new N,p=new N,m=new Pe,x=new Pe,M=new Pe,A=new N,v=new N;function _(I,E,y){f.fromBufferAttribute(n,I),d.fromBufferAttribute(n,E),p.fromBufferAttribute(n,y),m.fromBufferAttribute(o,I),x.fromBufferAttribute(o,E),M.fromBufferAttribute(o,y),d.sub(f),p.sub(f),x.sub(m),M.sub(m);const F=1/(x.x*M.y-M.x*x.y);isFinite(F)&&(A.copy(d).multiplyScalar(M.y).addScaledVector(p,-x.y).multiplyScalar(F),v.copy(p).multiplyScalar(x.x).addScaledVector(d,-M.x).multiplyScalar(F),l[I].add(A),l[E].add(A),l[y].add(A),h[I].add(v),h[E].add(v),h[y].add(v))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let I=0,E=C.length;I<E;++I){const y=C[I],F=y.start,V=y.count;for(let G=F,q=F+V;G<q;G+=3)_(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const b=new N,L=new N,k=new N,U=new N;function O(I){k.fromBufferAttribute(r,I),U.copy(k);const E=l[I];b.copy(E),b.sub(k.multiplyScalar(k.dot(E))).normalize(),L.crossVectors(U,E);const F=L.dot(h[I])<0?-1:1;c.setXYZW(I,b.x,b.y,b.z,F)}for(let I=0,E=C.length;I<E;++I){const y=C[I],F=y.start,V=y.count;for(let G=F,q=F+V;G<q;G+=3)O(e.getX(G+0)),O(e.getX(G+1)),O(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,x=n.count;m<x;m++)n.setXYZ(m,0,0,0);const r=new N,o=new N,c=new N,l=new N,h=new N,f=new N,d=new N,p=new N;if(e)for(let m=0,x=e.count;m<x;m+=3){const M=e.getX(m+0),A=e.getX(m+1),v=e.getX(m+2);r.fromBufferAttribute(t,M),o.fromBufferAttribute(t,A),c.fromBufferAttribute(t,v),d.subVectors(c,o),p.subVectors(r,o),d.cross(p),l.fromBufferAttribute(n,M),h.fromBufferAttribute(n,A),f.fromBufferAttribute(n,v),l.add(d),h.add(d),f.add(d),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(A,h.x,h.y,h.z),n.setXYZ(v,f.x,f.y,f.z)}else for(let m=0,x=t.count;m<x;m+=3)r.fromBufferAttribute(t,m+0),o.fromBufferAttribute(t,m+1),c.fromBufferAttribute(t,m+2),d.subVectors(c,o),p.subVectors(r,o),d.cross(p),n.setXYZ(m+0,d.x,d.y,d.z),n.setXYZ(m+1,d.x,d.y,d.z),n.setXYZ(m+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(l,h){const f=l.array,d=l.itemSize,p=l.normalized,m=new f.constructor(h.length*d);let x=0,M=0;for(let A=0,v=h.length;A<v;A++){l.isInterleavedBufferAttribute?x=h[A]*l.data.stride+l.offset:x=h[A]*d;for(let _=0;_<d;_++)m[M++]=f[x++]}return new Qt(m,d,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,n=this.index.array,r=this.attributes;for(const l in r){const h=r[l],f=e(h,n);t.setAttribute(l,f)}const o=this.morphAttributes;for(const l in o){const h=[],f=o[l];for(let d=0,p=f.length;d<p;d++){const m=f[d],x=e(m,n);h.push(x)}t.morphAttributes[l]=h}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let l=0,h=c.length;l<h;l++){const f=c[l];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const f in h)h[f]!==void 0&&(e[f]=h[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const f=n[h];e.data.attributes[h]=f.toJSON(e.data)}const r={};let o=!1;for(const h in this.morphAttributes){const f=this.morphAttributes[h],d=[];for(let p=0,m=f.length;p<m;p++){const x=f[p];d.push(x.toJSON(e.data))}d.length>0&&(r[h]=d,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const f in r){const d=r[f];this.setAttribute(f,d.clone(t))}const o=e.morphAttributes;for(const f in o){const d=[],p=o[f];for(let m=0,x=p.length;m<x;m++)d.push(p[m].clone(t));this.morphAttributes[f]=d}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let f=0,d=c.length;f<d;f++){const p=c[f];this.addGroup(p.start,p.count,p.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zd=new Qe,es=new zs,Qa=new Ni,kd=new N,Ys=new N,js=new N,qs=new N,ru=new N,ec=new N,tc=new Pe,nc=new Pe,ic=new Pe,Hd=new N,Gd=new N,Vd=new N,rc=new N,sc=new N;class ye extends mt{constructor(e=new Kt,t=new Fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,c=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(o&&l){ec.set(0,0,0);for(let h=0,f=o.length;h<f;h++){const d=l[h],p=o[h];d!==0&&(ru.fromBufferAttribute(p,e),c?ec.addScaledVector(ru,d):ec.addScaledVector(ru.sub(t),d))}t.add(ec)}return t}raycast(e,t){const n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qa.copy(n.boundingSphere),Qa.applyMatrix4(o),es.copy(e.ray).recast(e.near),!(Qa.containsPoint(es.origin)===!1&&(es.intersectSphere(Qa,kd)===null||es.origin.distanceToSquared(kd)>(e.far-e.near)**2))&&(zd.copy(o).invert(),es.copy(e.ray).applyMatrix4(zd),!(n.boundingBox!==null&&es.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,es)))}_computeIntersections(e,t,n){let r;const o=this.geometry,c=this.material,l=o.index,h=o.attributes.position,f=o.attributes.uv,d=o.attributes.uv1,p=o.attributes.normal,m=o.groups,x=o.drawRange;if(l!==null)if(Array.isArray(c))for(let M=0,A=m.length;M<A;M++){const v=m[M],_=c[v.materialIndex],C=Math.max(v.start,x.start),b=Math.min(l.count,Math.min(v.start+v.count,x.start+x.count));for(let L=C,k=b;L<k;L+=3){const U=l.getX(L),O=l.getX(L+1),I=l.getX(L+2);r=oc(this,_,e,n,f,d,p,U,O,I),r&&(r.faceIndex=Math.floor(L/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{const M=Math.max(0,x.start),A=Math.min(l.count,x.start+x.count);for(let v=M,_=A;v<_;v+=3){const C=l.getX(v),b=l.getX(v+1),L=l.getX(v+2);r=oc(this,c,e,n,f,d,p,C,b,L),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}else if(h!==void 0)if(Array.isArray(c))for(let M=0,A=m.length;M<A;M++){const v=m[M],_=c[v.materialIndex],C=Math.max(v.start,x.start),b=Math.min(h.count,Math.min(v.start+v.count,x.start+x.count));for(let L=C,k=b;L<k;L+=3){const U=L,O=L+1,I=L+2;r=oc(this,_,e,n,f,d,p,U,O,I),r&&(r.faceIndex=Math.floor(L/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{const M=Math.max(0,x.start),A=Math.min(h.count,x.start+x.count);for(let v=M,_=A;v<_;v+=3){const C=v,b=v+1,L=v+2;r=oc(this,c,e,n,f,d,p,C,b,L),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}}}function zv(i,e,t,n,r,o,c,l){let h;if(e.side===kn?h=n.intersectTriangle(c,o,r,!0,l):h=n.intersectTriangle(r,o,c,e.side===Di,l),h===null)return null;sc.copy(l),sc.applyMatrix4(i.matrixWorld);const f=t.ray.origin.distanceTo(sc);return f<t.near||f>t.far?null:{distance:f,point:sc.clone(),object:i}}function oc(i,e,t,n,r,o,c,l,h,f){i.getVertexPosition(l,Ys),i.getVertexPosition(h,js),i.getVertexPosition(f,qs);const d=zv(i,e,t,n,Ys,js,qs,rc);if(d){r&&(tc.fromBufferAttribute(r,l),nc.fromBufferAttribute(r,h),ic.fromBufferAttribute(r,f),d.uv=Ti.getInterpolation(rc,Ys,js,qs,tc,nc,ic,new Pe)),o&&(tc.fromBufferAttribute(o,l),nc.fromBufferAttribute(o,h),ic.fromBufferAttribute(o,f),d.uv1=Ti.getInterpolation(rc,Ys,js,qs,tc,nc,ic,new Pe)),c&&(Hd.fromBufferAttribute(c,l),Gd.fromBufferAttribute(c,h),Vd.fromBufferAttribute(c,f),d.normal=Ti.getInterpolation(rc,Ys,js,qs,Hd,Gd,Vd,new N),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:l,b:h,c:f,normal:new N,materialIndex:0};Ti.getNormal(Ys,js,qs,p.normal),d.face=p}return d}class Yt extends Kt{constructor(e=1,t=1,n=1,r=1,o=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:o,depthSegments:c};const l=this;r=Math.floor(r),o=Math.floor(o),c=Math.floor(c);const h=[],f=[],d=[],p=[];let m=0,x=0;M("z","y","x",-1,-1,n,t,e,c,o,0),M("z","y","x",1,-1,n,t,-e,c,o,1),M("x","z","y",1,1,e,n,t,r,c,2),M("x","z","y",1,-1,e,n,-t,r,c,3),M("x","y","z",1,-1,e,t,n,r,o,4),M("x","y","z",-1,-1,e,t,-n,r,o,5),this.setIndex(h),this.setAttribute("position",new Ot(f,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(p,2));function M(A,v,_,C,b,L,k,U,O,I,E){const y=L/O,F=k/I,V=L/2,G=k/2,q=U/2,ne=O+1,se=I+1;let pe=0,K=0;const he=new N;for(let me=0;me<se;me++){const Ee=me*F-G;for(let Ke=0;Ke<ne;Ke++){const ct=Ke*y-V;he[A]=ct*C,he[v]=Ee*b,he[_]=q,f.push(he.x,he.y,he.z),he[A]=0,he[v]=0,he[_]=U>0?1:-1,d.push(he.x,he.y,he.z),p.push(Ke/O),p.push(1-me/I),pe+=1}}for(let me=0;me<I;me++)for(let Ee=0;Ee<O;Ee++){const Ke=m+Ee+ne*me,ct=m+Ee+ne*(me+1),ie=m+(Ee+1)+ne*(me+1),ge=m+(Ee+1)+ne*me;h.push(Ke,ct,ge),h.push(ct,ie,ge),K+=6}l.addGroup(x,K,E),x+=K,m+=pe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ks(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function In(i){const e={};for(let t=0;t<i.length;t++){const n=Ks(i[t]);for(const r in n)e[r]=n[r]}return e}function kv(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Wd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const Hv={clone:Ks,merge:In};var Gv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rr extends ni{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gv,this.fragmentShader=Vv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=kv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const c=this.uniforms[r].value;c&&c.isTexture?t.uniforms[r]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[r]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[r]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[r]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[r]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[r]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[r]={type:"m4",value:c.toArray()}:t.uniforms[r]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Xd extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=ir}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cr=new N,Yd=new Pe,jd=new Pe;class Dn extends Xd{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ds*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ds*2*Math.atan(Math.tan(Bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z),Cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z)}getViewSize(e,t){return this.getViewBounds(e,Yd,jd),t.subVectors(jd,Yd)}setViewOffset(e,t,n,r,o,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Bo*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,o=-.5*r;const c=this.view;if(this.view!==null&&this.view.enabled){const h=c.fullWidth,f=c.fullHeight;o+=c.offsetX*r/h,t-=c.offsetY*n/f,r*=c.width/h,n*=c.height/f}const l=this.filmOffset;l!==0&&(o+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Zs=-90,$s=1;class Wv extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Dn(Zs,$s,e,t);r.layers=this.layers,this.add(r);const o=new Dn(Zs,$s,e,t);o.layers=this.layers,this.add(o);const c=new Dn(Zs,$s,e,t);c.layers=this.layers,this.add(c);const l=new Dn(Zs,$s,e,t);l.layers=this.layers,this.add(l);const h=new Dn(Zs,$s,e,t);h.layers=this.layers,this.add(h);const f=new Dn(Zs,$s,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,o,c,l,h]=t;for(const f of t)this.remove(f);if(e===ir)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Ga)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,c,l,h,f,d]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,o),e.setRenderTarget(n,1,r),e.render(t,c),e.setRenderTarget(n,2,r),e.render(t,l),e.setRenderTarget(n,3,r),e.render(t,h),e.setRenderTarget(n,4,r),e.render(t,f),n.texture.generateMipmaps=A,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(p,m,x),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class qd extends cn{constructor(e,t,n,r,o,c,l,h,f,d){e=e!==void 0?e:[],t=t!==void 0?t:ws,super(e,t,n,r,o,c,l,h,f,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Kd extends $r{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new qd(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Hn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Yt(5,5,5),o=new Rr({name:"CubemapFromEquirect",uniforms:Ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kn,blending:Sr});o.uniforms.tEquirect.value=t;const c=new ye(r,o),l=t.minFilter;return t.minFilter===nr&&(t.minFilter=Hn),new Wv(1,10,this).update(e,c),t.minFilter=l,c.geometry.dispose(),c.material.dispose(),this}clear(e,t,n,r){const o=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,n,r);e.setRenderTarget(o)}}const su=new N,Xv=new N,Yv=new ot;class Pr{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=su.subVectors(n,t).cross(Xv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(su),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yv.getNormalMatrix(e),r=this.coplanarPoint(su).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ts=new Ni,ac=new N;class ou{constructor(e=new Pr,t=new Pr,n=new Pr,r=new Pr,o=new Pr,c=new Pr){this.planes=[e,t,n,r,o,c]}set(e,t,n,r,o,c){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(r),l[4].copy(o),l[5].copy(c),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ir){const n=this.planes,r=e.elements,o=r[0],c=r[1],l=r[2],h=r[3],f=r[4],d=r[5],p=r[6],m=r[7],x=r[8],M=r[9],A=r[10],v=r[11],_=r[12],C=r[13],b=r[14],L=r[15];if(n[0].setComponents(h-o,m-f,v-x,L-_).normalize(),n[1].setComponents(h+o,m+f,v+x,L+_).normalize(),n[2].setComponents(h+c,m+d,v+M,L+C).normalize(),n[3].setComponents(h-c,m-d,v-M,L-C).normalize(),n[4].setComponents(h-l,m-p,v-A,L-b).normalize(),t===ir)n[5].setComponents(h+l,m+p,v+A,L+b).normalize();else if(t===Ga)n[5].setComponents(l,p,A,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ts.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ts.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ts)}intersectsSprite(e){return ts.center.set(0,0,0),ts.radius=.7071067811865476,ts.applyMatrix4(e.matrixWorld),this.intersectsSphere(ts)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ac.x=r.normal.x>0?e.max.x:e.min.x,ac.y=r.normal.y>0?e.max.y:e.min.y,ac.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ac)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zd(){let i=null,e=!1,t=null,n=null;function r(o,c){t(o,c),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function jv(i){const e=new WeakMap;function t(l,h){const f=l.array,d=l.usage,p=f.byteLength,m=i.createBuffer();i.bindBuffer(h,m),i.bufferData(h,f,d),l.onUploadCallback();let x;if(f instanceof Float32Array)x=i.FLOAT;else if(f instanceof Uint16Array)l.isFloat16BufferAttribute?x=i.HALF_FLOAT:x=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)x=i.SHORT;else if(f instanceof Uint32Array)x=i.UNSIGNED_INT;else if(f instanceof Int32Array)x=i.INT;else if(f instanceof Int8Array)x=i.BYTE;else if(f instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:x,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:p}}function n(l,h,f){const d=h.array,p=h._updateRange,m=h.updateRanges;if(i.bindBuffer(f,l),p.count===-1&&m.length===0&&i.bufferSubData(f,0,d),m.length!==0){for(let x=0,M=m.length;x<M;x++){const A=m[x];i.bufferSubData(f,A.start*d.BYTES_PER_ELEMENT,d,A.start,A.count)}h.clearUpdateRanges()}p.count!==-1&&(i.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count),p.count=-1),h.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=e.get(l);h&&(i.deleteBuffer(h.buffer),e.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=e.get(l);(!d||d.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=e.get(l);if(f===void 0)e.set(l,t(l,h));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(f.buffer,l,h),f.version=l.version}}return{get:r,remove:o,update:c}}class ns extends Kt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const o=e/2,c=t/2,l=Math.floor(n),h=Math.floor(r),f=l+1,d=h+1,p=e/l,m=t/h,x=[],M=[],A=[],v=[];for(let _=0;_<d;_++){const C=_*m-c;for(let b=0;b<f;b++){const L=b*p-o;M.push(L,-C,0),A.push(0,0,1),v.push(b/l),v.push(1-_/h)}}for(let _=0;_<h;_++)for(let C=0;C<l;C++){const b=C+f*_,L=C+f*(_+1),k=C+1+f*(_+1),U=C+1+f*_;x.push(b,L,U),x.push(L,k,U)}this.setIndex(x),this.setAttribute("position",new Ot(M,3)),this.setAttribute("normal",new Ot(A,3)),this.setAttribute("uv",new Ot(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ns(e.width,e.height,e.widthSegments,e.heightSegments)}}var qv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kv=`#ifdef USE_ALPHAHASH
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
#endif`,Zv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$v=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ex=`#ifdef USE_AOMAP
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
#endif`,tx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nx=`#ifdef USE_BATCHING
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
#endif`,ix=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,rx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ox=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ax=`#ifdef USE_IRIDESCENCE
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
#endif`,cx=`#ifdef USE_BUMPMAP
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
#endif`,lx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ux=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,px=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,gx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,_x=`#define PI 3.141592653589793
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
} // validated`,vx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xx=`vec3 transformedNormal = objectNormal;
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
#endif`,yx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ex=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tx=`
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
}`,Ax=`#ifdef USE_ENVMAP
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
#endif`,wx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rx=`#ifdef USE_ENVMAP
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
#endif`,Cx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Px=`#ifdef USE_ENVMAP
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
#endif`,Lx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ix=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ox=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ux=`#ifdef USE_GRADIENTMAP
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
}`,Nx=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Fx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kx=`uniform bool receiveShadow;
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
#endif`,Hx=`#ifdef USE_ENVMAP
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
#endif`,Gx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yx=`PhysicalMaterial material;
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
#endif`,jx=`struct PhysicalMaterial {
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
}`,qx=`
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
#endif`,Kx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$x=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ey=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ty=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ny=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ry=`#if defined( USE_POINTS_UV )
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
#endif`,sy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,oy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ay=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ly=`#ifdef USE_MORPHNORMALS
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
#endif`,uy=`#ifdef USE_MORPHTARGETS
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
#endif`,hy=`#ifdef USE_MORPHTARGETS
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
#endif`,fy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,py=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,my=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_y=`#ifdef USE_NORMALMAP
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
#endif`,vy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,My=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ey=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,by=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ty=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ay=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ry=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Py=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ly=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Iy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dy=`float getShadowMask() {
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
}`,Oy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uy=`#ifdef USE_SKINNING
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
#endif`,Ny=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fy=`#ifdef USE_SKINNING
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
#endif`,By=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ky=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gy=`#ifdef USE_TRANSMISSION
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
#endif`,Vy=`#ifdef USE_TRANSMISSION
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
#endif`,Wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const at={alphahash_fragment:qv,alphahash_pars_fragment:Kv,alphamap_fragment:Zv,alphamap_pars_fragment:$v,alphatest_fragment:Jv,alphatest_pars_fragment:Qv,aomap_fragment:ex,aomap_pars_fragment:tx,batching_pars_vertex:nx,batching_vertex:ix,begin_vertex:rx,beginnormal_vertex:sx,bsdfs:ox,iridescence_fragment:ax,bumpmap_pars_fragment:cx,clipping_planes_fragment:lx,clipping_planes_pars_fragment:ux,clipping_planes_pars_vertex:hx,clipping_planes_vertex:fx,color_fragment:dx,color_pars_fragment:px,color_pars_vertex:mx,color_vertex:gx,common:_x,cube_uv_reflection_fragment:vx,defaultnormal_vertex:xx,displacementmap_pars_vertex:yx,displacementmap_vertex:Sx,emissivemap_fragment:Mx,emissivemap_pars_fragment:Ex,colorspace_fragment:bx,colorspace_pars_fragment:Tx,envmap_fragment:Ax,envmap_common_pars_fragment:wx,envmap_pars_fragment:Rx,envmap_pars_vertex:Cx,envmap_physical_pars_fragment:Hx,envmap_vertex:Px,fog_vertex:Lx,fog_pars_vertex:Ix,fog_fragment:Dx,fog_pars_fragment:Ox,gradientmap_pars_fragment:Ux,lightmap_fragment:Nx,lightmap_pars_fragment:Fx,lights_lambert_fragment:Bx,lights_lambert_pars_fragment:zx,lights_pars_begin:kx,lights_toon_fragment:Gx,lights_toon_pars_fragment:Vx,lights_phong_fragment:Wx,lights_phong_pars_fragment:Xx,lights_physical_fragment:Yx,lights_physical_pars_fragment:jx,lights_fragment_begin:qx,lights_fragment_maps:Kx,lights_fragment_end:Zx,logdepthbuf_fragment:$x,logdepthbuf_pars_fragment:Jx,logdepthbuf_pars_vertex:Qx,logdepthbuf_vertex:ey,map_fragment:ty,map_pars_fragment:ny,map_particle_fragment:iy,map_particle_pars_fragment:ry,metalnessmap_fragment:sy,metalnessmap_pars_fragment:oy,morphinstance_vertex:ay,morphcolor_vertex:cy,morphnormal_vertex:ly,morphtarget_pars_vertex:uy,morphtarget_vertex:hy,normal_fragment_begin:fy,normal_fragment_maps:dy,normal_pars_fragment:py,normal_pars_vertex:my,normal_vertex:gy,normalmap_pars_fragment:_y,clearcoat_normal_fragment_begin:vy,clearcoat_normal_fragment_maps:xy,clearcoat_pars_fragment:yy,iridescence_pars_fragment:Sy,opaque_fragment:My,packing:Ey,premultiplied_alpha_fragment:by,project_vertex:Ty,dithering_fragment:Ay,dithering_pars_fragment:wy,roughnessmap_fragment:Ry,roughnessmap_pars_fragment:Cy,shadowmap_pars_fragment:Py,shadowmap_pars_vertex:Ly,shadowmap_vertex:Iy,shadowmask_pars_fragment:Dy,skinbase_vertex:Oy,skinning_pars_vertex:Uy,skinning_vertex:Ny,skinnormal_vertex:Fy,specularmap_fragment:By,specularmap_pars_fragment:zy,tonemapping_fragment:ky,tonemapping_pars_fragment:Hy,transmission_fragment:Gy,transmission_pars_fragment:Vy,uv_pars_fragment:Wy,uv_pars_vertex:Xy,uv_vertex:Yy,worldpos_vertex:jy,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
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
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
}`,distanceRGBA_vert:`#define DISTANCE
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
}`,distanceRGBA_frag:`#define DISTANCE
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
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
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
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
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
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},Me={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},Bi={basic:{uniforms:In([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:In([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ne(0)}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:In([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:In([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:In([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Ne(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:In([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:In([Me.points,Me.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:In([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:In([Me.common,Me.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:In([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:In([Me.sprite,Me.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distanceRGBA:{uniforms:In([Me.common,Me.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distanceRGBA_vert,fragmentShader:at.distanceRGBA_frag},shadow:{uniforms:In([Me.lights,Me.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};Bi.physical={uniforms:In([Bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const cc={r:0,b:0,g:0},is=new Ei,qy=new Qe;function Ky(i,e,t,n,r,o,c){const l=new Ne(0);let h=o===!0?0:1,f,d,p=null,m=0,x=null;function M(v,_){let C=!1,b=_.isScene===!0?_.background:null;b&&b.isTexture&&(b=(_.backgroundBlurriness>0?t:e).get(b)),b===null?A(l,h):b&&b.isColor&&(A(b,1),C=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,c):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(i.autoClear||C)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Ua)?(d===void 0&&(d=new ye(new Yt(1,1,1),new Rr({name:"BackgroundCubeMaterial",uniforms:Ks(Bi.backgroundCube.uniforms),vertexShader:Bi.backgroundCube.vertexShader,fragmentShader:Bi.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(k,U,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),is.copy(_.backgroundRotation),is.x*=-1,is.y*=-1,is.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),d.material.uniforms.envMap.value=b,d.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(qy.makeRotationFromEuler(is)),d.material.toneMapped=Rt.getTransfer(b.colorSpace)!==kt,(p!==b||m!==b.version||x!==i.toneMapping)&&(d.material.needsUpdate=!0,p=b,m=b.version,x=i.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null)):b&&b.isTexture&&(f===void 0&&(f=new ye(new ns(2,2),new Rr({name:"BackgroundMaterial",uniforms:Ks(Bi.background.uniforms),vertexShader:Bi.background.vertexShader,fragmentShader:Bi.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=b,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.toneMapped=Rt.getTransfer(b.colorSpace)!==kt,b.matrixAutoUpdate===!0&&b.updateMatrix(),f.material.uniforms.uvTransform.value.copy(b.matrix),(p!==b||m!==b.version||x!==i.toneMapping)&&(f.material.needsUpdate=!0,p=b,m=b.version,x=i.toneMapping),f.layers.enableAll(),v.unshift(f,f.geometry,f.material,0,0,null))}function A(v,_){v.getRGB(cc,Wd(i)),n.buffers.color.setClear(cc.r,cc.g,cc.b,_,c)}return{getClearColor:function(){return l},setClearColor:function(v,_=1){l.set(v),h=_,A(l,h)},getClearAlpha:function(){return h},setClearAlpha:function(v){h=v,A(l,h)},render:M}}function Zy(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=m(null);let o=r,c=!1;function l(y,F,V,G,q){let ne=!1;const se=p(G,V,F);o!==se&&(o=se,f(o.object)),ne=x(y,G,V,q),ne&&M(y,G,V,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(ne||c)&&(c=!1,L(y,F,V,G),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function h(){return i.createVertexArray()}function f(y){return i.bindVertexArray(y)}function d(y){return i.deleteVertexArray(y)}function p(y,F,V){const G=V.wireframe===!0;let q=n[y.id];q===void 0&&(q={},n[y.id]=q);let ne=q[F.id];ne===void 0&&(ne={},q[F.id]=ne);let se=ne[G];return se===void 0&&(se=m(h()),ne[G]=se),se}function m(y){const F=[],V=[],G=[];for(let q=0;q<t;q++)F[q]=0,V[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:V,attributeDivisors:G,object:y,attributes:{},index:null}}function x(y,F,V,G){const q=o.attributes,ne=F.attributes;let se=0;const pe=V.getAttributes();for(const K in pe)if(pe[K].location>=0){const me=q[K];let Ee=ne[K];if(Ee===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(Ee=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(Ee=y.instanceColor)),me===void 0||me.attribute!==Ee||Ee&&me.data!==Ee.data)return!0;se++}return o.attributesNum!==se||o.index!==G}function M(y,F,V,G){const q={},ne=F.attributes;let se=0;const pe=V.getAttributes();for(const K in pe)if(pe[K].location>=0){let me=ne[K];me===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(me=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(me=y.instanceColor));const Ee={};Ee.attribute=me,me&&me.data&&(Ee.data=me.data),q[K]=Ee,se++}o.attributes=q,o.attributesNum=se,o.index=G}function A(){const y=o.newAttributes;for(let F=0,V=y.length;F<V;F++)y[F]=0}function v(y){_(y,0)}function _(y,F){const V=o.newAttributes,G=o.enabledAttributes,q=o.attributeDivisors;V[y]=1,G[y]===0&&(i.enableVertexAttribArray(y),G[y]=1),q[y]!==F&&(i.vertexAttribDivisor(y,F),q[y]=F)}function C(){const y=o.newAttributes,F=o.enabledAttributes;for(let V=0,G=F.length;V<G;V++)F[V]!==y[V]&&(i.disableVertexAttribArray(V),F[V]=0)}function b(y,F,V,G,q,ne,se){se===!0?i.vertexAttribIPointer(y,F,V,q,ne):i.vertexAttribPointer(y,F,V,G,q,ne)}function L(y,F,V,G){A();const q=G.attributes,ne=V.getAttributes(),se=F.defaultAttributeValues;for(const pe in ne){const K=ne[pe];if(K.location>=0){let he=q[pe];if(he===void 0&&(pe==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),pe==="instanceColor"&&y.instanceColor&&(he=y.instanceColor)),he!==void 0){const me=he.normalized,Ee=he.itemSize,Ke=e.get(he);if(Ke===void 0)continue;const ct=Ke.buffer,ie=Ke.type,ge=Ke.bytesPerElement,we=ie===i.INT||ie===i.UNSIGNED_INT||he.gpuType===If;if(he.isInterleavedBufferAttribute){const Se=he.data,Ge=Se.stride,Xe=he.offset;if(Se.isInstancedInterleavedBuffer){for(let lt=0;lt<K.locationSize;lt++)_(K.location+lt,Se.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let lt=0;lt<K.locationSize;lt++)v(K.location+lt);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let lt=0;lt<K.locationSize;lt++)b(K.location+lt,Ee/K.locationSize,ie,me,Ge*ge,(Xe+Ee/K.locationSize*lt)*ge,we)}else{if(he.isInstancedBufferAttribute){for(let Se=0;Se<K.locationSize;Se++)_(K.location+Se,he.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Se=0;Se<K.locationSize;Se++)v(K.location+Se);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let Se=0;Se<K.locationSize;Se++)b(K.location+Se,Ee/K.locationSize,ie,me,Ee*ge,Ee/K.locationSize*Se*ge,we)}}else if(se!==void 0){const me=se[pe];if(me!==void 0)switch(me.length){case 2:i.vertexAttrib2fv(K.location,me);break;case 3:i.vertexAttrib3fv(K.location,me);break;case 4:i.vertexAttrib4fv(K.location,me);break;default:i.vertexAttrib1fv(K.location,me)}}}}C()}function k(){I();for(const y in n){const F=n[y];for(const V in F){const G=F[V];for(const q in G)d(G[q].object),delete G[q];delete F[V]}delete n[y]}}function U(y){if(n[y.id]===void 0)return;const F=n[y.id];for(const V in F){const G=F[V];for(const q in G)d(G[q].object),delete G[q];delete F[V]}delete n[y.id]}function O(y){for(const F in n){const V=n[F];if(V[y.id]===void 0)continue;const G=V[y.id];for(const q in G)d(G[q].object),delete G[q];delete V[y.id]}}function I(){E(),c=!0,o!==r&&(o=r,f(o.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:I,resetDefaultState:E,dispose:k,releaseStatesOfGeometry:U,releaseStatesOfProgram:O,initAttributes:A,enableAttribute:v,disableUnusedAttributes:C}}function $y(i,e,t){let n;function r(h){n=h}function o(h,f){i.drawArrays(n,h,f),t.update(f,n,1)}function c(h,f,d){d!==0&&(i.drawArraysInstanced(n,h,f,d),t.update(f,n,d))}function l(h,f,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d;m++)this.render(h[m],f[m]);else{p.multiDrawArraysWEBGL(n,h,0,f,0,d);let m=0;for(let x=0;x<d;x++)m+=f[x];t.update(m,n,1)}}this.setMode=r,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Jy(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const l=o(c);l!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",l,"instead."),c=l);const h=t.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,precision:c,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:m,maxAttributes:x,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:v,vertexTextures:_,maxSamples:C}}function Qy(i){const e=this;let t=null,n=0,r=!1,o=!1;const c=new Pr,l=new ot,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const x=p.length!==0||m||n!==0||r;return r=m,n=p.length,x},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,m){t=d(p,m,0)},this.setState=function(p,m,x){const M=p.clippingPlanes,A=p.clipIntersection,v=p.clipShadows,_=i.get(p);if(!r||M===null||M.length===0||o&&!v)o?d(null):f();else{const C=o?0:n,b=C*4;let L=_.clippingState||null;h.value=L,L=d(M,m,b,x);for(let k=0;k!==b;++k)L[k]=t[k];_.clippingState=L,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=C}};function f(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(p,m,x,M){const A=p!==null?p.length:0;let v=null;if(A!==0){if(v=h.value,M!==!0||v===null){const _=x+A*4,C=m.matrixWorldInverse;l.getNormalMatrix(C),(v===null||v.length<_)&&(v=new Float32Array(_));for(let b=0,L=x;b!==A;++b,L+=4)c.copy(p[b]).applyMatrix4(C,l),c.normal.toArray(v,L),v[L+3]=c.constant}h.value=v,h.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,v}}function eS(i){let e=new WeakMap;function t(c,l){return l===Cl?c.mapping=ws:l===Pl&&(c.mapping=Rs),c}function n(c){if(c&&c.isTexture){const l=c.mapping;if(l===Cl||l===Pl)if(e.has(c)){const h=e.get(c).texture;return t(h,c.mapping)}else{const h=c.image;if(h&&h.height>0){const f=new Kd(h.height);return f.fromEquirectangularTexture(i,c),e.set(c,f),c.addEventListener("dispose",r),t(f.texture,c.mapping)}else return null}}return c}function r(c){const l=c.target;l.removeEventListener("dispose",r);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}class lc extends Xd{constructor(e=-1,t=1,n=1,r=-1,o=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=o,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,o,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=n-e,c=n+e,l=r+t,h=r-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,c=o+f*this.view.width,l-=d*this.view.offsetY,h=l-d*this.view.height}this.projectionMatrix.makeOrthographic(o,c,l,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Js=4,$d=[.125,.215,.35,.446,.526,.582],rs=20,au=new lc,Jd=new Ne;let cu=null,lu=0,uu=0,hu=!1;const ss=(1+Math.sqrt(5))/2,Qs=1/ss,Qd=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,ss,Qs),new N(0,ss,-Qs),new N(Qs,0,ss),new N(-Qs,0,ss),new N(ss,Qs,0),new N(-ss,Qs,0)];class ep{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){cu=this._renderer.getRenderTarget(),lu=this._renderer.getActiveCubeFace(),uu=this._renderer.getActiveMipmapLevel(),hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ip(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=np(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(cu,lu,uu),this._renderer.xr.enabled=hu,e.scissorTest=!1,uc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ws||e.mapping===Rs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),cu=this._renderer.getRenderTarget(),lu=this._renderer.getActiveCubeFace(),uu=this._renderer.getActiveMipmapLevel(),hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:Fa,format:_i,colorSpace:_n,depthBuffer:!1},r=tp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tp(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tS(o)),this._blurMaterial=nS(o,e,t)}return r}_compileMaterial(e){const t=new ye(this._lodPlanes[0],e);this._renderer.compile(t,au)}_sceneToCubeUV(e,t,n,r){const l=new Dn(90,1,t,n),h=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,m=d.toneMapping;d.getClearColor(Jd),d.toneMapping=er,d.autoClear=!1;const x=new Fi({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),M=new ye(new Yt,x);let A=!1;const v=e.background;v?v.isColor&&(x.color.copy(v),e.background=null,A=!0):(x.color.copy(Jd),A=!0);for(let _=0;_<6;_++){const C=_%3;C===0?(l.up.set(0,h[_],0),l.lookAt(f[_],0,0)):C===1?(l.up.set(0,0,h[_]),l.lookAt(0,f[_],0)):(l.up.set(0,h[_],0),l.lookAt(0,0,f[_]));const b=this._cubeSize;uc(r,C*b,_>2?b:0,b,b),d.setRenderTarget(r),A&&d.render(M,l),d.render(e,l)}M.geometry.dispose(),M.material.dispose(),d.toneMapping=m,d.autoClear=p,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===ws||e.mapping===Rs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ip()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=np());const o=r?this._cubemapMaterial:this._equirectMaterial,c=new ye(this._lodPlanes[0],o),l=o.uniforms;l.envMap.value=e;const h=this._cubeSize;uc(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(c,au)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),c=Qd[(r-1)%Qd.length];this._blur(e,r-1,r,o,c)}t.autoClear=n}_blur(e,t,n,r,o){const c=this._pingPongRenderTarget;this._halfBlur(e,c,t,n,r,"latitudinal",o),this._halfBlur(c,e,n,n,r,"longitudinal",o)}_halfBlur(e,t,n,r,o,c,l){const h=this._renderer,f=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,p=new ye(this._lodPlanes[r],f),m=f.uniforms,x=this._sizeLods[n]-1,M=isFinite(o)?Math.PI/(2*x):2*Math.PI/(2*rs-1),A=o/M,v=isFinite(o)?1+Math.floor(d*A):rs;v>rs&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${rs}`);const _=[];let C=0;for(let O=0;O<rs;++O){const I=O/A,E=Math.exp(-I*I/2);_.push(E),O===0?C+=E:O<v&&(C+=2*E)}for(let O=0;O<_.length;O++)_[O]=_[O]/C;m.envMap.value=e.texture,m.samples.value=v,m.weights.value=_,m.latitudinal.value=c==="latitudinal",l&&(m.poleAxis.value=l);const{_lodMax:b}=this;m.dTheta.value=M,m.mipInt.value=b-n;const L=this._sizeLods[r],k=3*L*(r>b-Js?r-b+Js:0),U=4*(this._cubeSize-L);uc(t,k,U,3*L,2*L),h.setRenderTarget(t),h.render(p,au)}}function tS(i){const e=[],t=[],n=[];let r=i;const o=i-Js+1+$d.length;for(let c=0;c<o;c++){const l=Math.pow(2,r);t.push(l);let h=1/l;c>i-Js?h=$d[c-i+Js-1]:c===0&&(h=0),n.push(h);const f=1/(l-2),d=-f,p=1+f,m=[d,d,p,d,p,p,d,d,p,p,d,p],x=6,M=6,A=3,v=2,_=1,C=new Float32Array(A*M*x),b=new Float32Array(v*M*x),L=new Float32Array(_*M*x);for(let U=0;U<x;U++){const O=U%3*2/3-1,I=U>2?0:-1,E=[O,I,0,O+2/3,I,0,O+2/3,I+1,0,O,I,0,O+2/3,I+1,0,O,I+1,0];C.set(E,A*M*U),b.set(m,v*M*U);const y=[U,U,U,U,U,U];L.set(y,_*M*U)}const k=new Kt;k.setAttribute("position",new Qt(C,A)),k.setAttribute("uv",new Qt(b,v)),k.setAttribute("faceIndex",new Qt(L,_)),e.push(k),r>Js&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function tp(i,e,t){const n=new $r(i,e,t);return n.texture.mapping=Ua,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function uc(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function nS(i,e,t){const n=new Float32Array(rs),r=new N(0,1,0);return new Rr({name:"SphericalGaussianBlur",defines:{n:rs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:fu(),fragmentShader:`

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
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function np(){return new Rr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fu(),fragmentShader:`

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
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function ip(){return new Rr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function fu(){return`

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
	`}function iS(i){let e=new WeakMap,t=null;function n(l){if(l&&l.isTexture){const h=l.mapping,f=h===Cl||h===Pl,d=h===ws||h===Rs;if(f||d){let p=e.get(l);const m=p!==void 0?p.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return t===null&&(t=new ep(i)),p=f?t.fromEquirectangular(l,p):t.fromCubemap(l,p),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),p.texture;if(p!==void 0)return p.texture;{const x=l.image;return f&&x&&x.height>0||d&&x&&r(x)?(t===null&&(t=new ep(i)),p=f?t.fromEquirectangular(l):t.fromCubemap(l),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),l.addEventListener("dispose",o),p.texture):null}}}return l}function r(l){let h=0;const f=6;for(let d=0;d<f;d++)l[d]!==void 0&&h++;return h===f}function o(l){const h=l.target;h.removeEventListener("dispose",o);const f=e.get(h);f!==void 0&&(e.delete(h),f.dispose())}function c(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:c}}function rS(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function sS(i,e,t,n){const r={},o=new WeakMap;function c(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const M in m.attributes)e.remove(m.attributes[M]);for(const M in m.morphAttributes){const A=m.morphAttributes[M];for(let v=0,_=A.length;v<_;v++)e.remove(A[v])}m.removeEventListener("dispose",c),delete r[m.id];const x=o.get(m);x&&(e.remove(x),o.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function l(p,m){return r[m.id]===!0||(m.addEventListener("dispose",c),r[m.id]=!0,t.memory.geometries++),m}function h(p){const m=p.attributes;for(const M in m)e.update(m[M],i.ARRAY_BUFFER);const x=p.morphAttributes;for(const M in x){const A=x[M];for(let v=0,_=A.length;v<_;v++)e.update(A[v],i.ARRAY_BUFFER)}}function f(p){const m=[],x=p.index,M=p.attributes.position;let A=0;if(x!==null){const C=x.array;A=x.version;for(let b=0,L=C.length;b<L;b+=3){const k=C[b+0],U=C[b+1],O=C[b+2];m.push(k,U,U,O,O,k)}}else if(M!==void 0){const C=M.array;A=M.version;for(let b=0,L=C.length/3-1;b<L;b+=3){const k=b+0,U=b+1,O=b+2;m.push(k,U,U,O,O,k)}}else return;const v=new(yd(m)?Bd:Fd)(m,1);v.version=A;const _=o.get(p);_&&e.remove(_),o.set(p,v)}function d(p){const m=o.get(p);if(m){const x=p.index;x!==null&&m.version<x.version&&f(p)}else f(p);return o.get(p)}return{get:l,update:h,getWireframeAttribute:d}}function oS(i,e,t){let n;function r(p){n=p}let o,c;function l(p){o=p.type,c=p.bytesPerElement}function h(p,m){i.drawElements(n,m,o,p*c),t.update(m,n,1)}function f(p,m,x){x!==0&&(i.drawElementsInstanced(n,m,o,p*c,x),t.update(m,n,x))}function d(p,m,x){if(x===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let A=0;A<x;A++)this.render(p[A]/c,m[A]);else{M.multiDrawElementsWEBGL(n,m,0,o,p,0,x);let A=0;for(let v=0;v<x;v++)A+=m[v];t.update(A,n,1)}}this.setMode=r,this.setIndex=l,this.render=h,this.renderInstances=f,this.renderMultiDraw=d}function aS(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,c,l){switch(t.calls++,c){case i.TRIANGLES:t.triangles+=l*(o/3);break;case i.LINES:t.lines+=l*(o/2);break;case i.LINE_STRIP:t.lines+=l*(o-1);break;case i.LINE_LOOP:t.lines+=l*o;break;case i.POINTS:t.points+=l*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function cS(i,e,t){const n=new WeakMap,r=new Dt;function o(c,l,h){const f=c.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,p=d!==void 0?d.length:0;let m=n.get(l);if(m===void 0||m.count!==p){let E=function(){O.dispose(),n.delete(l),l.removeEventListener("dispose",E)};m!==void 0&&m.texture.dispose();const x=l.morphAttributes.position!==void 0,M=l.morphAttributes.normal!==void 0,A=l.morphAttributes.color!==void 0,v=l.morphAttributes.position||[],_=l.morphAttributes.normal||[],C=l.morphAttributes.color||[];let b=0;x===!0&&(b=1),M===!0&&(b=2),A===!0&&(b=3);let L=l.attributes.position.count*b,k=1;L>e.maxTextureSize&&(k=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const U=new Float32Array(L*k*4*p),O=new Ad(U,L,k,p);O.type=Oi,O.needsUpdate=!0;const I=b*4;for(let y=0;y<p;y++){const F=v[y],V=_[y],G=C[y],q=L*k*4*y;for(let ne=0;ne<F.count;ne++){const se=ne*I;x===!0&&(r.fromBufferAttribute(F,ne),U[q+se+0]=r.x,U[q+se+1]=r.y,U[q+se+2]=r.z,U[q+se+3]=0),M===!0&&(r.fromBufferAttribute(V,ne),U[q+se+4]=r.x,U[q+se+5]=r.y,U[q+se+6]=r.z,U[q+se+7]=0),A===!0&&(r.fromBufferAttribute(G,ne),U[q+se+8]=r.x,U[q+se+9]=r.y,U[q+se+10]=r.z,U[q+se+11]=G.itemSize===4?r.w:1)}}m={count:p,texture:O,size:new Pe(L,k)},n.set(l,m),l.addEventListener("dispose",E)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",c.morphTexture,t);else{let x=0;for(let A=0;A<f.length;A++)x+=f[A];const M=l.morphTargetsRelative?1:1-x;h.getUniforms().setValue(i,"morphTargetBaseInfluence",M),h.getUniforms().setValue(i,"morphTargetInfluences",f)}h.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:o}}function lS(i,e,t,n){let r=new WeakMap;function o(h){const f=n.render.frame,d=h.geometry,p=e.get(h,d);if(r.get(p)!==f&&(e.update(p),r.set(p,f)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),r.get(h)!==f&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),r.set(h,f))),h.isSkinnedMesh){const m=h.skeleton;r.get(m)!==f&&(m.update(),r.set(m,f))}return p}function c(){r=new WeakMap}function l(h){const f=h.target;f.removeEventListener("dispose",l),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:c}}class rp extends cn{constructor(e,t,n,r,o,c,l,h,f,d){if(d=d!==void 0?d:Ps,d!==Ps&&d!==No)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Ps&&(n=Cs),n===void 0&&d===No&&(n=Uo),super(null,r,o,c,l,h,d,n,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:Pn,this.minFilter=h!==void 0?h:Pn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const sp=new cn,op=new rp(1,1);op.compareFunction=_d;const ap=new Ad,cp=new Cv,lp=new qd,up=[],hp=[],fp=new Float32Array(16),dp=new Float32Array(9),pp=new Float32Array(4);function eo(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let o=up[r];if(o===void 0&&(o=new Float32Array(r),up[r]=o),e!==0){n.toArray(o,0);for(let c=1,l=0;c!==e;++c)l+=t,i[c].toArray(o,l)}return o}function ln(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function un(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hc(i,e){let t=hp[e];t===void 0&&(t=new Int32Array(e),hp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function uS(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function hS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;i.uniform2fv(this.addr,e),un(t,e)}}function fS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ln(t,e))return;i.uniform3fv(this.addr,e),un(t,e)}}function dS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;i.uniform4fv(this.addr,e),un(t,e)}}function pS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),un(t,e)}else{if(ln(t,n))return;pp.set(n),i.uniformMatrix2fv(this.addr,!1,pp),un(t,n)}}function mS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),un(t,e)}else{if(ln(t,n))return;dp.set(n),i.uniformMatrix3fv(this.addr,!1,dp),un(t,n)}}function gS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),un(t,e)}else{if(ln(t,n))return;fp.set(n),i.uniformMatrix4fv(this.addr,!1,fp),un(t,n)}}function _S(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function vS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;i.uniform2iv(this.addr,e),un(t,e)}}function xS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ln(t,e))return;i.uniform3iv(this.addr,e),un(t,e)}}function yS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;i.uniform4iv(this.addr,e),un(t,e)}}function SS(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function MS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;i.uniform2uiv(this.addr,e),un(t,e)}}function ES(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ln(t,e))return;i.uniform3uiv(this.addr,e),un(t,e)}}function bS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;i.uniform4uiv(this.addr,e),un(t,e)}}function TS(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const o=this.type===i.SAMPLER_2D_SHADOW?op:sp;t.setTexture2D(e||o,r)}function AS(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cp,r)}function wS(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||lp,r)}function RS(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ap,r)}function CS(i){switch(i){case 5126:return uS;case 35664:return hS;case 35665:return fS;case 35666:return dS;case 35674:return pS;case 35675:return mS;case 35676:return gS;case 5124:case 35670:return _S;case 35667:case 35671:return vS;case 35668:case 35672:return xS;case 35669:case 35673:return yS;case 5125:return SS;case 36294:return MS;case 36295:return ES;case 36296:return bS;case 35678:case 36198:case 36298:case 36306:case 35682:return TS;case 35679:case 36299:case 36307:return AS;case 35680:case 36300:case 36308:case 36293:return wS;case 36289:case 36303:case 36311:case 36292:return RS}}function PS(i,e){i.uniform1fv(this.addr,e)}function LS(i,e){const t=eo(e,this.size,2);i.uniform2fv(this.addr,t)}function IS(i,e){const t=eo(e,this.size,3);i.uniform3fv(this.addr,t)}function DS(i,e){const t=eo(e,this.size,4);i.uniform4fv(this.addr,t)}function OS(i,e){const t=eo(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function US(i,e){const t=eo(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function NS(i,e){const t=eo(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function FS(i,e){i.uniform1iv(this.addr,e)}function BS(i,e){i.uniform2iv(this.addr,e)}function zS(i,e){i.uniform3iv(this.addr,e)}function kS(i,e){i.uniform4iv(this.addr,e)}function HS(i,e){i.uniform1uiv(this.addr,e)}function GS(i,e){i.uniform2uiv(this.addr,e)}function VS(i,e){i.uniform3uiv(this.addr,e)}function WS(i,e){i.uniform4uiv(this.addr,e)}function XS(i,e,t){const n=this.cache,r=e.length,o=hc(t,r);ln(n,o)||(i.uniform1iv(this.addr,o),un(n,o));for(let c=0;c!==r;++c)t.setTexture2D(e[c]||sp,o[c])}function YS(i,e,t){const n=this.cache,r=e.length,o=hc(t,r);ln(n,o)||(i.uniform1iv(this.addr,o),un(n,o));for(let c=0;c!==r;++c)t.setTexture3D(e[c]||cp,o[c])}function jS(i,e,t){const n=this.cache,r=e.length,o=hc(t,r);ln(n,o)||(i.uniform1iv(this.addr,o),un(n,o));for(let c=0;c!==r;++c)t.setTextureCube(e[c]||lp,o[c])}function qS(i,e,t){const n=this.cache,r=e.length,o=hc(t,r);ln(n,o)||(i.uniform1iv(this.addr,o),un(n,o));for(let c=0;c!==r;++c)t.setTexture2DArray(e[c]||ap,o[c])}function KS(i){switch(i){case 5126:return PS;case 35664:return LS;case 35665:return IS;case 35666:return DS;case 35674:return OS;case 35675:return US;case 35676:return NS;case 5124:case 35670:return FS;case 35667:case 35671:return BS;case 35668:case 35672:return zS;case 35669:case 35673:return kS;case 5125:return HS;case 36294:return GS;case 36295:return VS;case 36296:return WS;case 35678:case 36198:case 36298:case 36306:case 35682:return XS;case 35679:case 36299:case 36307:return YS;case 35680:case 36300:case 36308:case 36293:return jS;case 36289:case 36303:case 36311:case 36292:return qS}}class ZS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=CS(t.type)}}class $S{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=KS(t.type)}}class JS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let o=0,c=r.length;o!==c;++o){const l=r[o];l.setValue(e,t[l.id],n)}}}const du=/(\w+)(\])?(\[|\.)?/g;function mp(i,e){i.seq.push(e),i.map[e.id]=e}function QS(i,e,t){const n=i.name,r=n.length;for(du.lastIndex=0;;){const o=du.exec(n),c=du.lastIndex;let l=o[1];const h=o[2]==="]",f=o[3];if(h&&(l=l|0),f===void 0||f==="["&&c+2===r){mp(t,f===void 0?new ZS(l,i,e):new $S(l,i,e));break}else{let p=t.map[l];p===void 0&&(p=new JS(l),mp(t,p)),t=p}}}class fc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const o=e.getActiveUniform(t,r),c=e.getUniformLocation(t,o.name);QS(o,c,this)}}setValue(e,t,n,r){const o=this.map[t];o!==void 0&&o.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let o=0,c=t.length;o!==c;++o){const l=t[o],h=n[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,o=e.length;r!==o;++r){const c=e[r];c.id in t&&n.push(c)}return n}}function gp(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const eM=37297;let tM=0;function nM(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let c=r;c<o;c++){const l=c+1;n.push(`${l===e?">":" "} ${l}: ${t[c]}`)}return n.join(`
`)}function iM(i){const e=Rt.getPrimaries(Rt.workingColorSpace),t=Rt.getPrimaries(i);let n;switch(e===t?n="":e===Ha&&t===ka?n="LinearDisplayP3ToLinearSRGB":e===ka&&t===Ha&&(n="LinearSRGBToLinearDisplayP3"),i){case _n:case Ba:return[n,"LinearTransferOETF"];case an:case Bl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function _p(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+nM(i.getShaderSource(e),c)}else return r}function rM(i,e){const t=iM(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function sM(i,e){let t;switch(e){case I0:t="Linear";break;case D0:t="Reinhard";break;case O0:t="OptimizedCineon";break;case U0:t="ACESFilmic";break;case F0:t="AgX";break;case B0:t="Neutral";break;case N0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function oM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xo).join(`
`)}function aM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const o=i.getActiveAttrib(e,r),c=o.name;let l=1;o.type===i.FLOAT_MAT2&&(l=2),o.type===i.FLOAT_MAT3&&(l=3),o.type===i.FLOAT_MAT4&&(l=4),t[c]={type:o.type,location:i.getAttribLocation(e,c),locationSize:l}}return t}function Xo(i){return i!==""}function vp(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lM=/^[ \t]*#include +<([\w\d./]+)>/gm;function pu(i){return i.replace(lM,hM)}const uM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function hM(i,e){let t=at[e];if(t===void 0){const n=uM.get(e);if(n!==void 0)t=at[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return pu(t)}const fM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yp(i){return i.replace(fM,dM)}function dM(i,e,t,n){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Sp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function pM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Mf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ef?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qi&&(e="SHADOWMAP_TYPE_VSM"),e}function mM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ws:case Rs:e="ENVMAP_TYPE_CUBE";break;case Ua:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gM(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Rs:e="ENVMAP_MODE_REFRACTION";break}return e}function _M(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case wf:e="ENVMAP_BLENDING_MULTIPLY";break;case P0:e="ENVMAP_BLENDING_MIX";break;case L0:e="ENVMAP_BLENDING_ADD";break}return e}function vM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function xM(i,e,t,n){const r=i.getContext(),o=t.defines;let c=t.vertexShader,l=t.fragmentShader;const h=pM(t),f=mM(t),d=gM(t),p=_M(t),m=vM(t),x=oM(t),M=aM(o),A=r.createProgram();let v,_,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Xo).join(`
`),v.length>0&&(v+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Xo).join(`
`),_.length>0&&(_+=`
`)):(v=[Sp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xo).join(`
`),_=[Sp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==er?"#define TONE_MAPPING":"",t.toneMapping!==er?at.tonemapping_pars_fragment:"",t.toneMapping!==er?sM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,rM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xo).join(`
`)),c=pu(c),c=vp(c,t),c=xp(c,t),l=pu(l),l=vp(l,t),l=xp(l,t),c=yp(c),l=yp(l),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,v=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,_=["#define varying in",t.glslVersion===vd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===vd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const b=C+v+c,L=C+_+l,k=gp(r,r.VERTEX_SHADER,b),U=gp(r,r.FRAGMENT_SHADER,L);r.attachShader(A,k),r.attachShader(A,U),t.index0AttributeName!==void 0?r.bindAttribLocation(A,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(A,0,"position"),r.linkProgram(A);function O(F){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(A).trim(),G=r.getShaderInfoLog(k).trim(),q=r.getShaderInfoLog(U).trim();let ne=!0,se=!0;if(r.getProgramParameter(A,r.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,A,k,U);else{const pe=_p(r,k,"vertex"),K=_p(r,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(A,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+V+`
`+pe+`
`+K)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(G===""||q==="")&&(se=!1);se&&(F.diagnostics={runnable:ne,programLog:V,vertexShader:{log:G,prefix:v},fragmentShader:{log:q,prefix:_}})}r.deleteShader(k),r.deleteShader(U),I=new fc(r,A),E=cM(r,A)}let I;this.getUniforms=function(){return I===void 0&&O(this),I};let E;this.getAttributes=function(){return E===void 0&&O(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(A,eM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tM++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=k,this.fragmentShader=U,this}let yM=0;class SM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(n),c=this._getShaderCacheForMaterial(e);return c.has(r)===!1&&(c.add(r),r.usedTimes++),c.has(o)===!1&&(c.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new MM(e),t.set(e,n)),n}}class MM{constructor(e){this.id=yM++,this.code=e,this.usedTimes=0}}function EM(i,e,t,n,r,o,c){const l=new Zl,h=new SM,f=new Set,d=[],p=r.logarithmicDepthBuffer,m=r.vertexTextures;let x=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(E){return f.add(E),E===0?"uv":`uv${E}`}function v(E,y,F,V,G){const q=V.fog,ne=G.geometry,se=E.isMeshStandardMaterial?V.environment:null,pe=(E.isMeshStandardMaterial?t:e).get(E.envMap||se),K=pe&&pe.mapping===Ua?pe.image.height:null,he=M[E.type];E.precision!==null&&(x=r.getMaxPrecision(E.precision),x!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",x,"instead."));const me=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Ee=me!==void 0?me.length:0;let Ke=0;ne.morphAttributes.position!==void 0&&(Ke=1),ne.morphAttributes.normal!==void 0&&(Ke=2),ne.morphAttributes.color!==void 0&&(Ke=3);let ct,ie,ge,we;if(he){const on=Bi[he];ct=on.vertexShader,ie=on.fragmentShader}else ct=E.vertexShader,ie=E.fragmentShader,h.update(E),ge=h.getVertexShaderID(E),we=h.getFragmentShaderID(E);const Se=i.getRenderTarget(),Ge=G.isInstancedMesh===!0,Xe=G.isBatchedMesh===!0,lt=!!E.map,j=!!E.matcap,$e=!!pe,ze=!!E.aoMap,bt=!!E.lightMap,He=!!E.bumpMap,Tt=!!E.normalMap,B=!!E.displacementMap,w=!!E.emissiveMap,te=!!E.metalnessMap,ae=!!E.roughnessMap,ue=E.anisotropy>0,de=E.clearcoat>0,Be=E.iridescence>0,_e=E.sheen>0,De=E.transmission>0,Ve=ue&&!!E.anisotropyMap,ve=de&&!!E.clearcoatMap,Te=de&&!!E.clearcoatNormalMap,qe=de&&!!E.clearcoatRoughnessMap,Le=Be&&!!E.iridescenceMap,Ie=Be&&!!E.iridescenceThicknessMap,ut=_e&&!!E.sheenColorMap,ft=_e&&!!E.sheenRoughnessMap,St=!!E.specularMap,gt=!!E.specularColorMap,Mt=!!E.specularIntensityMap,Ue=De&&!!E.transmissionMap,S=De&&!!E.thicknessMap,Z=!!E.gradientMap,oe=!!E.alphaMap,xe=E.alphaTest>0,Re=!!E.alphaHash,_t=!!E.extensions;let dt=er;E.toneMapped&&(Se===null||Se.isXRRenderTarget===!0)&&(dt=i.toneMapping);const Ft={shaderID:he,shaderType:E.type,shaderName:E.name,vertexShader:ct,fragmentShader:ie,defines:E.defines,customVertexShaderID:ge,customFragmentShaderID:we,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:x,batching:Xe,instancing:Ge,instancingColor:Ge&&G.instanceColor!==null,instancingMorph:Ge&&G.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Se===null?i.outputColorSpace:Se.isXRRenderTarget===!0?Se.texture.colorSpace:_n,alphaToCoverage:!!E.alphaToCoverage,map:lt,matcap:j,envMap:$e,envMapMode:$e&&pe.mapping,envMapCubeUVHeight:K,aoMap:ze,lightMap:bt,bumpMap:He,normalMap:Tt,displacementMap:m&&B,emissiveMap:w,normalMapObjectSpace:Tt&&E.normalMapType===Q0,normalMapTangentSpace:Tt&&E.normalMapType===md,metalnessMap:te,roughnessMap:ae,anisotropy:ue,anisotropyMap:Ve,clearcoat:de,clearcoatMap:ve,clearcoatNormalMap:Te,clearcoatRoughnessMap:qe,iridescence:Be,iridescenceMap:Le,iridescenceThicknessMap:Ie,sheen:_e,sheenColorMap:ut,sheenRoughnessMap:ft,specularMap:St,specularColorMap:gt,specularIntensityMap:Mt,transmission:De,transmissionMap:Ue,thicknessMap:S,gradientMap:Z,opaque:E.transparent===!1&&E.blending===As&&E.alphaToCoverage===!1,alphaMap:oe,alphaTest:xe,alphaHash:Re,combine:E.combine,mapUv:lt&&A(E.map.channel),aoMapUv:ze&&A(E.aoMap.channel),lightMapUv:bt&&A(E.lightMap.channel),bumpMapUv:He&&A(E.bumpMap.channel),normalMapUv:Tt&&A(E.normalMap.channel),displacementMapUv:B&&A(E.displacementMap.channel),emissiveMapUv:w&&A(E.emissiveMap.channel),metalnessMapUv:te&&A(E.metalnessMap.channel),roughnessMapUv:ae&&A(E.roughnessMap.channel),anisotropyMapUv:Ve&&A(E.anisotropyMap.channel),clearcoatMapUv:ve&&A(E.clearcoatMap.channel),clearcoatNormalMapUv:Te&&A(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qe&&A(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&A(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&A(E.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&A(E.sheenColorMap.channel),sheenRoughnessMapUv:ft&&A(E.sheenRoughnessMap.channel),specularMapUv:St&&A(E.specularMap.channel),specularColorMapUv:gt&&A(E.specularColorMap.channel),specularIntensityMapUv:Mt&&A(E.specularIntensityMap.channel),transmissionMapUv:Ue&&A(E.transmissionMap.channel),thicknessMapUv:S&&A(E.thicknessMap.channel),alphaMapUv:oe&&A(E.alphaMap.channel),vertexTangents:!!ne.attributes.tangent&&(Tt||ue),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!ne.attributes.uv&&(lt||oe),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:G.isSkinnedMesh===!0,morphTargets:ne.morphAttributes.position!==void 0,morphNormals:ne.morphAttributes.normal!==void 0,morphColors:ne.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ke,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:dt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:lt&&E.map.isVideoTexture===!0&&Rt.getTransfer(E.map.colorSpace)===kt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===gi,flipSided:E.side===kn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:_t&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:_t&&E.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ft.vertexUv1s=f.has(1),Ft.vertexUv2s=f.has(2),Ft.vertexUv3s=f.has(3),f.clear(),Ft}function _(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const F in E.defines)y.push(F),y.push(E.defines[F]);return E.isRawShaderMaterial===!1&&(C(y,E),b(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function C(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function b(E,y){l.disableAll(),y.supportsVertexTextures&&l.enable(0),y.instancing&&l.enable(1),y.instancingColor&&l.enable(2),y.instancingMorph&&l.enable(3),y.matcap&&l.enable(4),y.envMap&&l.enable(5),y.normalMapObjectSpace&&l.enable(6),y.normalMapTangentSpace&&l.enable(7),y.clearcoat&&l.enable(8),y.iridescence&&l.enable(9),y.alphaTest&&l.enable(10),y.vertexColors&&l.enable(11),y.vertexAlphas&&l.enable(12),y.vertexUv1s&&l.enable(13),y.vertexUv2s&&l.enable(14),y.vertexUv3s&&l.enable(15),y.vertexTangents&&l.enable(16),y.anisotropy&&l.enable(17),y.alphaHash&&l.enable(18),y.batching&&l.enable(19),E.push(l.mask),l.disableAll(),y.fog&&l.enable(0),y.useFog&&l.enable(1),y.flatShading&&l.enable(2),y.logarithmicDepthBuffer&&l.enable(3),y.skinning&&l.enable(4),y.morphTargets&&l.enable(5),y.morphNormals&&l.enable(6),y.morphColors&&l.enable(7),y.premultipliedAlpha&&l.enable(8),y.shadowMapEnabled&&l.enable(9),y.useLegacyLights&&l.enable(10),y.doubleSided&&l.enable(11),y.flipSided&&l.enable(12),y.useDepthPacking&&l.enable(13),y.dithering&&l.enable(14),y.transmission&&l.enable(15),y.sheen&&l.enable(16),y.opaque&&l.enable(17),y.pointsUvs&&l.enable(18),y.decodeVideoTexture&&l.enable(19),y.alphaToCoverage&&l.enable(20),E.push(l.mask)}function L(E){const y=M[E.type];let F;if(y){const V=Bi[y];F=Hv.clone(V.uniforms)}else F=E.uniforms;return F}function k(E,y){let F;for(let V=0,G=d.length;V<G;V++){const q=d[V];if(q.cacheKey===y){F=q,++F.usedTimes;break}}return F===void 0&&(F=new xM(i,y,E,o),d.push(F)),F}function U(E){if(--E.usedTimes===0){const y=d.indexOf(E);d[y]=d[d.length-1],d.pop(),E.destroy()}}function O(E){h.remove(E)}function I(){h.dispose()}return{getParameters:v,getProgramCacheKey:_,getUniforms:L,acquireProgram:k,releaseProgram:U,releaseShaderCache:O,programs:d,dispose:I}}function bM(){let i=new WeakMap;function e(o){let c=i.get(o);return c===void 0&&(c={},i.set(o,c)),c}function t(o){i.delete(o)}function n(o,c,l){i.get(o)[c]=l}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function TM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Mp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ep(){const i=[];let e=0;const t=[],n=[],r=[];function o(){e=0,t.length=0,n.length=0,r.length=0}function c(p,m,x,M,A,v){let _=i[e];return _===void 0?(_={id:p.id,object:p,geometry:m,material:x,groupOrder:M,renderOrder:p.renderOrder,z:A,group:v},i[e]=_):(_.id=p.id,_.object=p,_.geometry=m,_.material=x,_.groupOrder=M,_.renderOrder=p.renderOrder,_.z=A,_.group=v),e++,_}function l(p,m,x,M,A,v){const _=c(p,m,x,M,A,v);x.transmission>0?n.push(_):x.transparent===!0?r.push(_):t.push(_)}function h(p,m,x,M,A,v){const _=c(p,m,x,M,A,v);x.transmission>0?n.unshift(_):x.transparent===!0?r.unshift(_):t.unshift(_)}function f(p,m){t.length>1&&t.sort(p||TM),n.length>1&&n.sort(m||Mp),r.length>1&&r.sort(m||Mp)}function d(){for(let p=e,m=i.length;p<m;p++){const x=i[p];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:r,init:o,push:l,unshift:h,finish:d,sort:f}}function AM(){let i=new WeakMap;function e(n,r){const o=i.get(n);let c;return o===void 0?(c=new Ep,i.set(n,[c])):r>=o.length?(c=new Ep,o.push(c)):c=o[r],c}function t(){i=new WeakMap}return{get:e,dispose:t}}function wM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Ne};break;case"SpotLight":t={position:new N,direction:new N,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function RM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let CM=0;function PM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function LM(i){const e=new wM,t=RM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)n.probe.push(new N);const r=new N,o=new Qe,c=new Qe;function l(f,d){let p=0,m=0,x=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let M=0,A=0,v=0,_=0,C=0,b=0,L=0,k=0,U=0,O=0,I=0;f.sort(PM);const E=d===!0?Math.PI:1;for(let F=0,V=f.length;F<V;F++){const G=f[F],q=G.color,ne=G.intensity,se=G.distance,pe=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)p+=q.r*ne*E,m+=q.g*ne*E,x+=q.b*ne*E;else if(G.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(G.sh.coefficients[K],ne);I++}else if(G.isDirectionalLight){const K=e.get(G);if(K.color.copy(G.color).multiplyScalar(G.intensity*E),G.castShadow){const he=G.shadow,me=t.get(G);me.shadowBias=he.bias,me.shadowNormalBias=he.normalBias,me.shadowRadius=he.radius,me.shadowMapSize=he.mapSize,n.directionalShadow[M]=me,n.directionalShadowMap[M]=pe,n.directionalShadowMatrix[M]=G.shadow.matrix,b++}n.directional[M]=K,M++}else if(G.isSpotLight){const K=e.get(G);K.position.setFromMatrixPosition(G.matrixWorld),K.color.copy(q).multiplyScalar(ne*E),K.distance=se,K.coneCos=Math.cos(G.angle),K.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),K.decay=G.decay,n.spot[v]=K;const he=G.shadow;if(G.map&&(n.spotLightMap[U]=G.map,U++,he.updateMatrices(G),G.castShadow&&O++),n.spotLightMatrix[v]=he.matrix,G.castShadow){const me=t.get(G);me.shadowBias=he.bias,me.shadowNormalBias=he.normalBias,me.shadowRadius=he.radius,me.shadowMapSize=he.mapSize,n.spotShadow[v]=me,n.spotShadowMap[v]=pe,k++}v++}else if(G.isRectAreaLight){const K=e.get(G);K.color.copy(q).multiplyScalar(ne),K.halfWidth.set(G.width*.5,0,0),K.halfHeight.set(0,G.height*.5,0),n.rectArea[_]=K,_++}else if(G.isPointLight){const K=e.get(G);if(K.color.copy(G.color).multiplyScalar(G.intensity*E),K.distance=G.distance,K.decay=G.decay,G.castShadow){const he=G.shadow,me=t.get(G);me.shadowBias=he.bias,me.shadowNormalBias=he.normalBias,me.shadowRadius=he.radius,me.shadowMapSize=he.mapSize,me.shadowCameraNear=he.camera.near,me.shadowCameraFar=he.camera.far,n.pointShadow[A]=me,n.pointShadowMap[A]=pe,n.pointShadowMatrix[A]=G.shadow.matrix,L++}n.point[A]=K,A++}else if(G.isHemisphereLight){const K=e.get(G);K.skyColor.copy(G.color).multiplyScalar(ne*E),K.groundColor.copy(G.groundColor).multiplyScalar(ne*E),n.hemi[C]=K,C++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=m,n.ambient[2]=x;const y=n.hash;(y.directionalLength!==M||y.pointLength!==A||y.spotLength!==v||y.rectAreaLength!==_||y.hemiLength!==C||y.numDirectionalShadows!==b||y.numPointShadows!==L||y.numSpotShadows!==k||y.numSpotMaps!==U||y.numLightProbes!==I)&&(n.directional.length=M,n.spot.length=v,n.rectArea.length=_,n.point.length=A,n.hemi.length=C,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=k,n.spotShadowMap.length=k,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=k+U-O,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=O,n.numLightProbes=I,y.directionalLength=M,y.pointLength=A,y.spotLength=v,y.rectAreaLength=_,y.hemiLength=C,y.numDirectionalShadows=b,y.numPointShadows=L,y.numSpotShadows=k,y.numSpotMaps=U,y.numLightProbes=I,n.version=CM++)}function h(f,d){let p=0,m=0,x=0,M=0,A=0;const v=d.matrixWorldInverse;for(let _=0,C=f.length;_<C;_++){const b=f[_];if(b.isDirectionalLight){const L=n.directional[p];L.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(v),p++}else if(b.isSpotLight){const L=n.spot[x];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(v),L.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(v),x++}else if(b.isRectAreaLight){const L=n.rectArea[M];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(v),c.identity(),o.copy(b.matrixWorld),o.premultiply(v),c.extractRotation(o),L.halfWidth.set(b.width*.5,0,0),L.halfHeight.set(0,b.height*.5,0),L.halfWidth.applyMatrix4(c),L.halfHeight.applyMatrix4(c),M++}else if(b.isPointLight){const L=n.point[m];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(v),m++}else if(b.isHemisphereLight){const L=n.hemi[A];L.direction.setFromMatrixPosition(b.matrixWorld),L.direction.transformDirection(v),A++}}}return{setup:l,setupView:h,state:n}}function bp(i){const e=new LM(i),t=[],n=[];function r(){t.length=0,n.length=0}function o(d){t.push(d)}function c(d){n.push(d)}function l(d){e.setup(t,d)}function h(d){e.setupView(t,d)}return{init:r,state:{lightsArray:t,shadowsArray:n,lights:e,transmissionRenderTarget:null},setupLights:l,setupLightsView:h,pushLight:o,pushShadow:c}}function IM(i){let e=new WeakMap;function t(r,o=0){const c=e.get(r);let l;return c===void 0?(l=new bp(i),e.set(r,[l])):o>=c.length?(l=new bp(i),c.push(l)):l=c[o],l}function n(){e=new WeakMap}return{get:t,dispose:n}}class DM extends ni{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class OM extends ni{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const UM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NM=`uniform sampler2D shadow_pass;
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
}`;function FM(i,e,t){let n=new ou;const r=new Pe,o=new Pe,c=new Dt,l=new DM({depthPacking:J0}),h=new OM,f={},d=t.maxTextureSize,p={[Di]:kn,[kn]:Di,[gi]:gi},m=new Rr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:UM,fragmentShader:NM}),x=m.clone();x.defines.HORIZONTAL_PASS=1;const M=new Kt;M.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new ye(M,m),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mf;let _=this.type;this.render=function(U,O,I){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||U.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Sr),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const G=_!==Qi&&this.type===Qi,q=_===Qi&&this.type!==Qi;for(let ne=0,se=U.length;ne<se;ne++){const pe=U[ne],K=pe.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",pe,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);const he=K.getFrameExtents();if(r.multiply(he),o.copy(K.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(o.x=Math.floor(d/he.x),r.x=o.x*he.x,K.mapSize.x=o.x),r.y>d&&(o.y=Math.floor(d/he.y),r.y=o.y*he.y,K.mapSize.y=o.y)),K.map===null||G===!0||q===!0){const Ee=this.type!==Qi?{minFilter:Pn,magFilter:Pn}:{};K.map!==null&&K.map.dispose(),K.map=new $r(r.x,r.y,Ee),K.map.texture.name=pe.name+".shadowMap",K.camera.updateProjectionMatrix()}i.setRenderTarget(K.map),i.clear();const me=K.getViewportCount();for(let Ee=0;Ee<me;Ee++){const Ke=K.getViewport(Ee);c.set(o.x*Ke.x,o.y*Ke.y,o.x*Ke.z,o.y*Ke.w),V.viewport(c),K.updateMatrices(pe,Ee),n=K.getFrustum(),L(O,I,K.camera,pe,this.type)}K.isPointLightShadow!==!0&&this.type===Qi&&C(K,I),K.needsUpdate=!1}_=this.type,v.needsUpdate=!1,i.setRenderTarget(E,y,F)};function C(U,O){const I=e.update(A);m.defines.VSM_SAMPLES!==U.blurSamples&&(m.defines.VSM_SAMPLES=U.blurSamples,x.defines.VSM_SAMPLES=U.blurSamples,m.needsUpdate=!0,x.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new $r(r.x,r.y)),m.uniforms.shadow_pass.value=U.map.texture,m.uniforms.resolution.value=U.mapSize,m.uniforms.radius.value=U.radius,i.setRenderTarget(U.mapPass),i.clear(),i.renderBufferDirect(O,null,I,m,A,null),x.uniforms.shadow_pass.value=U.mapPass.texture,x.uniforms.resolution.value=U.mapSize,x.uniforms.radius.value=U.radius,i.setRenderTarget(U.map),i.clear(),i.renderBufferDirect(O,null,I,x,A,null)}function b(U,O,I,E){let y=null;const F=I.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(F!==void 0)y=F;else if(y=I.isPointLight===!0?h:l,i.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const V=y.uuid,G=O.uuid;let q=f[V];q===void 0&&(q={},f[V]=q);let ne=q[G];ne===void 0&&(ne=y.clone(),q[G]=ne,O.addEventListener("dispose",k)),y=ne}if(y.visible=O.visible,y.wireframe=O.wireframe,E===Qi?y.side=O.shadowSide!==null?O.shadowSide:O.side:y.side=O.shadowSide!==null?O.shadowSide:p[O.side],y.alphaMap=O.alphaMap,y.alphaTest=O.alphaTest,y.map=O.map,y.clipShadows=O.clipShadows,y.clippingPlanes=O.clippingPlanes,y.clipIntersection=O.clipIntersection,y.displacementMap=O.displacementMap,y.displacementScale=O.displacementScale,y.displacementBias=O.displacementBias,y.wireframeLinewidth=O.wireframeLinewidth,y.linewidth=O.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const V=i.properties.get(y);V.light=I}return y}function L(U,O,I,E,y){if(U.visible===!1)return;if(U.layers.test(O.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&y===Qi)&&(!U.frustumCulled||n.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,U.matrixWorld);const G=e.update(U),q=U.material;if(Array.isArray(q)){const ne=G.groups;for(let se=0,pe=ne.length;se<pe;se++){const K=ne[se],he=q[K.materialIndex];if(he&&he.visible){const me=b(U,he,E,y);U.onBeforeShadow(i,U,O,I,G,me,K),i.renderBufferDirect(I,null,G,me,U,K),U.onAfterShadow(i,U,O,I,G,me,K)}}}else if(q.visible){const ne=b(U,q,E,y);U.onBeforeShadow(i,U,O,I,G,ne,null),i.renderBufferDirect(I,null,G,ne,U,null),U.onAfterShadow(i,U,O,I,G,ne,null)}}const V=U.children;for(let G=0,q=V.length;G<q;G++)L(V[G],O,I,E,y)}function k(U){U.target.removeEventListener("dispose",k);for(const I in f){const E=f[I],y=U.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}function BM(i){function e(){let S=!1;const Z=new Dt;let oe=null;const xe=new Dt(0,0,0,0);return{setMask:function(Re){oe!==Re&&!S&&(i.colorMask(Re,Re,Re,Re),oe=Re)},setLocked:function(Re){S=Re},setClear:function(Re,_t,dt,Ft,on){on===!0&&(Re*=Ft,_t*=Ft,dt*=Ft),Z.set(Re,_t,dt,Ft),xe.equals(Z)===!1&&(i.clearColor(Re,_t,dt,Ft),xe.copy(Z))},reset:function(){S=!1,oe=null,xe.set(-1,0,0,0)}}}function t(){let S=!1,Z=null,oe=null,xe=null;return{setTest:function(Re){Re?we(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(Re){Z!==Re&&!S&&(i.depthMask(Re),Z=Re)},setFunc:function(Re){if(oe!==Re){switch(Re){case E0:i.depthFunc(i.NEVER);break;case b0:i.depthFunc(i.ALWAYS);break;case T0:i.depthFunc(i.LESS);break;case Oa:i.depthFunc(i.LEQUAL);break;case A0:i.depthFunc(i.EQUAL);break;case w0:i.depthFunc(i.GEQUAL);break;case R0:i.depthFunc(i.GREATER);break;case C0:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Re}},setLocked:function(Re){S=Re},setClear:function(Re){xe!==Re&&(i.clearDepth(Re),xe=Re)},reset:function(){S=!1,Z=null,oe=null,xe=null}}}function n(){let S=!1,Z=null,oe=null,xe=null,Re=null,_t=null,dt=null,Ft=null,on=null;return{setTest:function(At){S||(At?we(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(At){Z!==At&&!S&&(i.stencilMask(At),Z=At)},setFunc:function(At,Zt,$t){(oe!==At||xe!==Zt||Re!==$t)&&(i.stencilFunc(At,Zt,$t),oe=At,xe=Zt,Re=$t)},setOp:function(At,Zt,$t){(_t!==At||dt!==Zt||Ft!==$t)&&(i.stencilOp(At,Zt,$t),_t=At,dt=Zt,Ft=$t)},setLocked:function(At){S=At},setClear:function(At){on!==At&&(i.clearStencil(At),on=At)},reset:function(){S=!1,Z=null,oe=null,xe=null,Re=null,_t=null,dt=null,Ft=null,on=null}}}const r=new e,o=new t,c=new n,l=new WeakMap,h=new WeakMap;let f={},d={},p=new WeakMap,m=[],x=null,M=!1,A=null,v=null,_=null,C=null,b=null,L=null,k=null,U=new Ne(0,0,0),O=0,I=!1,E=null,y=null,F=null,V=null,G=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ne=!1,se=0;const pe=i.getParameter(i.VERSION);pe.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(pe)[1]),ne=se>=1):pe.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(pe)[1]),ne=se>=2);let K=null,he={};const me=i.getParameter(i.SCISSOR_BOX),Ee=i.getParameter(i.VIEWPORT),Ke=new Dt().fromArray(me),ct=new Dt().fromArray(Ee);function ie(S,Z,oe,xe){const Re=new Uint8Array(4),_t=i.createTexture();i.bindTexture(S,_t),i.texParameteri(S,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(S,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let dt=0;dt<oe;dt++)S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY?i.texImage3D(Z,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,Re):i.texImage2D(Z+dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Re);return _t}const ge={};ge[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),we(i.DEPTH_TEST),o.setFunc(Oa),He(!1),Tt(Sf),we(i.CULL_FACE),ze(Sr);function we(S){f[S]!==!0&&(i.enable(S),f[S]=!0)}function Se(S){f[S]!==!1&&(i.disable(S),f[S]=!1)}function Ge(S,Z){return d[S]!==Z?(i.bindFramebuffer(S,Z),d[S]=Z,S===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=Z),S===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=Z),!0):!1}function Xe(S,Z){let oe=m,xe=!1;if(S){oe=p.get(Z),oe===void 0&&(oe=[],p.set(Z,oe));const Re=S.textures;if(oe.length!==Re.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let _t=0,dt=Re.length;_t<dt;_t++)oe[_t]=i.COLOR_ATTACHMENT0+_t;oe.length=Re.length,xe=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,xe=!0);xe&&i.drawBuffers(oe)}function lt(S){return x!==S?(i.useProgram(S),x=S,!0):!1}const j={[qr]:i.FUNC_ADD,[o0]:i.FUNC_SUBTRACT,[a0]:i.FUNC_REVERSE_SUBTRACT};j[c0]=i.MIN,j[l0]=i.MAX;const $e={[u0]:i.ZERO,[h0]:i.ONE,[f0]:i.SRC_COLOR,[wl]:i.SRC_ALPHA,[v0]:i.SRC_ALPHA_SATURATE,[g0]:i.DST_COLOR,[p0]:i.DST_ALPHA,[d0]:i.ONE_MINUS_SRC_COLOR,[Rl]:i.ONE_MINUS_SRC_ALPHA,[_0]:i.ONE_MINUS_DST_COLOR,[m0]:i.ONE_MINUS_DST_ALPHA,[x0]:i.CONSTANT_COLOR,[y0]:i.ONE_MINUS_CONSTANT_COLOR,[S0]:i.CONSTANT_ALPHA,[M0]:i.ONE_MINUS_CONSTANT_ALPHA};function ze(S,Z,oe,xe,Re,_t,dt,Ft,on,At){if(S===Sr){M===!0&&(Se(i.BLEND),M=!1);return}if(M===!1&&(we(i.BLEND),M=!0),S!==s0){if(S!==A||At!==I){if((v!==qr||b!==qr)&&(i.blendEquation(i.FUNC_ADD),v=qr,b=qr),At)switch(S){case As:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bf:i.blendFunc(i.ONE,i.ONE);break;case Tf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Af:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case As:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bf:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Tf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Af:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}_=null,C=null,L=null,k=null,U.set(0,0,0),O=0,A=S,I=At}return}Re=Re||Z,_t=_t||oe,dt=dt||xe,(Z!==v||Re!==b)&&(i.blendEquationSeparate(j[Z],j[Re]),v=Z,b=Re),(oe!==_||xe!==C||_t!==L||dt!==k)&&(i.blendFuncSeparate($e[oe],$e[xe],$e[_t],$e[dt]),_=oe,C=xe,L=_t,k=dt),(Ft.equals(U)===!1||on!==O)&&(i.blendColor(Ft.r,Ft.g,Ft.b,on),U.copy(Ft),O=on),A=S,I=!1}function bt(S,Z){S.side===gi?Se(i.CULL_FACE):we(i.CULL_FACE);let oe=S.side===kn;Z&&(oe=!oe),He(oe),S.blending===As&&S.transparent===!1?ze(Sr):ze(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),o.setFunc(S.depthFunc),o.setTest(S.depthTest),o.setMask(S.depthWrite),r.setMask(S.colorWrite);const xe=S.stencilWrite;c.setTest(xe),xe&&(c.setMask(S.stencilWriteMask),c.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),c.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),w(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?we(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function He(S){E!==S&&(S?i.frontFace(i.CW):i.frontFace(i.CCW),E=S)}function Tt(S){S!==i0?(we(i.CULL_FACE),S!==y&&(S===Sf?i.cullFace(i.BACK):S===r0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),y=S}function B(S){S!==F&&(ne&&i.lineWidth(S),F=S)}function w(S,Z,oe){S?(we(i.POLYGON_OFFSET_FILL),(V!==Z||G!==oe)&&(i.polygonOffset(Z,oe),V=Z,G=oe)):Se(i.POLYGON_OFFSET_FILL)}function te(S){S?we(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function ae(S){S===void 0&&(S=i.TEXTURE0+q-1),K!==S&&(i.activeTexture(S),K=S)}function ue(S,Z,oe){oe===void 0&&(K===null?oe=i.TEXTURE0+q-1:oe=K);let xe=he[oe];xe===void 0&&(xe={type:void 0,texture:void 0},he[oe]=xe),(xe.type!==S||xe.texture!==Z)&&(K!==oe&&(i.activeTexture(oe),K=oe),i.bindTexture(S,Z||ge[S]),xe.type=S,xe.texture=Z)}function de(){const S=he[K];S!==void 0&&S.type!==void 0&&(i.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function Be(){try{i.compressedTexImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function _e(){try{i.compressedTexImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function De(){try{i.texSubImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ve(){try{i.texSubImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ve(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Te(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function qe(){try{i.texStorage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Le(){try{i.texStorage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ie(){try{i.texImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ut(){try{i.texImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ft(S){Ke.equals(S)===!1&&(i.scissor(S.x,S.y,S.z,S.w),Ke.copy(S))}function St(S){ct.equals(S)===!1&&(i.viewport(S.x,S.y,S.z,S.w),ct.copy(S))}function gt(S,Z){let oe=h.get(Z);oe===void 0&&(oe=new WeakMap,h.set(Z,oe));let xe=oe.get(S);xe===void 0&&(xe=i.getUniformBlockIndex(Z,S.name),oe.set(S,xe))}function Mt(S,Z){const xe=h.get(Z).get(S);l.get(Z)!==xe&&(i.uniformBlockBinding(Z,xe,S.__bindingPointIndex),l.set(Z,xe))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},K=null,he={},d={},p=new WeakMap,m=[],x=null,M=!1,A=null,v=null,_=null,C=null,b=null,L=null,k=null,U=new Ne(0,0,0),O=0,I=!1,E=null,y=null,F=null,V=null,G=null,Ke.set(0,0,i.canvas.width,i.canvas.height),ct.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:we,disable:Se,bindFramebuffer:Ge,drawBuffers:Xe,useProgram:lt,setBlending:ze,setMaterial:bt,setFlipSided:He,setCullFace:Tt,setLineWidth:B,setPolygonOffset:w,setScissorTest:te,activeTexture:ae,bindTexture:ue,unbindTexture:de,compressedTexImage2D:Be,compressedTexImage3D:_e,texImage2D:Ie,texImage3D:ut,updateUBOMapping:gt,uniformBlockBinding:Mt,texStorage2D:qe,texStorage3D:Le,texSubImage2D:De,texSubImage3D:Ve,compressedTexSubImage2D:ve,compressedTexSubImage3D:Te,scissor:ft,viewport:St,reset:Ue}}function zM(i,e,t,n,r,o,c){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Pe,d=new WeakMap;let p;const m=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(B,w){return x?new OffscreenCanvas(B,w):ko("canvas")}function A(B,w,te){let ae=1;const ue=Tt(B);if((ue.width>te||ue.height>te)&&(ae=te/Math.max(ue.width,ue.height)),ae<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const de=Math.floor(ae*ue.width),Be=Math.floor(ae*ue.height);p===void 0&&(p=M(de,Be));const _e=w?M(de,Be):p;return _e.width=de,_e.height=Be,_e.getContext("2d").drawImage(B,0,0,de,Be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+de+"x"+Be+")."),_e}else return"data"in B&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),B;return B}function v(B){return B.generateMipmaps&&B.minFilter!==Pn&&B.minFilter!==Hn}function _(B){i.generateMipmap(B)}function C(B,w,te,ae,ue=!1){if(B!==null){if(i[B]!==void 0)return i[B];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let de=w;if(w===i.RED&&(te===i.FLOAT&&(de=i.R32F),te===i.HALF_FLOAT&&(de=i.R16F),te===i.UNSIGNED_BYTE&&(de=i.R8)),w===i.RED_INTEGER&&(te===i.UNSIGNED_BYTE&&(de=i.R8UI),te===i.UNSIGNED_SHORT&&(de=i.R16UI),te===i.UNSIGNED_INT&&(de=i.R32UI),te===i.BYTE&&(de=i.R8I),te===i.SHORT&&(de=i.R16I),te===i.INT&&(de=i.R32I)),w===i.RG&&(te===i.FLOAT&&(de=i.RG32F),te===i.HALF_FLOAT&&(de=i.RG16F),te===i.UNSIGNED_BYTE&&(de=i.RG8)),w===i.RG_INTEGER&&(te===i.UNSIGNED_BYTE&&(de=i.RG8UI),te===i.UNSIGNED_SHORT&&(de=i.RG16UI),te===i.UNSIGNED_INT&&(de=i.RG32UI),te===i.BYTE&&(de=i.RG8I),te===i.SHORT&&(de=i.RG16I),te===i.INT&&(de=i.RG32I)),w===i.RGB&&te===i.UNSIGNED_INT_5_9_9_9_REV&&(de=i.RGB9_E5),w===i.RGBA){const Be=ue?za:Rt.getTransfer(ae);te===i.FLOAT&&(de=i.RGBA32F),te===i.HALF_FLOAT&&(de=i.RGBA16F),te===i.UNSIGNED_BYTE&&(de=Be===kt?i.SRGB8_ALPHA8:i.RGBA8),te===i.UNSIGNED_SHORT_4_4_4_4&&(de=i.RGBA4),te===i.UNSIGNED_SHORT_5_5_5_1&&(de=i.RGB5_A1)}return(de===i.R16F||de===i.R32F||de===i.RG16F||de===i.RG32F||de===i.RGBA16F||de===i.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function b(B,w){return v(B)===!0||B.isFramebufferTexture&&B.minFilter!==Pn&&B.minFilter!==Hn?Math.log2(Math.max(w.width,w.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?w.mipmaps.length:1}function L(B){const w=B.target;w.removeEventListener("dispose",L),U(w),w.isVideoTexture&&d.delete(w)}function k(B){const w=B.target;w.removeEventListener("dispose",k),I(w)}function U(B){const w=n.get(B);if(w.__webglInit===void 0)return;const te=B.source,ae=m.get(te);if(ae){const ue=ae[w.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&O(B),Object.keys(ae).length===0&&m.delete(te)}n.remove(B)}function O(B){const w=n.get(B);i.deleteTexture(w.__webglTexture);const te=B.source,ae=m.get(te);delete ae[w.__cacheKey],c.memory.textures--}function I(B){const w=n.get(B);if(B.depthTexture&&B.depthTexture.dispose(),B.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(w.__webglFramebuffer[ae]))for(let ue=0;ue<w.__webglFramebuffer[ae].length;ue++)i.deleteFramebuffer(w.__webglFramebuffer[ae][ue]);else i.deleteFramebuffer(w.__webglFramebuffer[ae]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[ae])}else{if(Array.isArray(w.__webglFramebuffer))for(let ae=0;ae<w.__webglFramebuffer.length;ae++)i.deleteFramebuffer(w.__webglFramebuffer[ae]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ae=0;ae<w.__webglColorRenderbuffer.length;ae++)w.__webglColorRenderbuffer[ae]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[ae]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const te=B.textures;for(let ae=0,ue=te.length;ae<ue;ae++){const de=n.get(te[ae]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),c.memory.textures--),n.remove(te[ae])}n.remove(B)}let E=0;function y(){E=0}function F(){const B=E;return B>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+r.maxTextures),E+=1,B}function V(B){const w=[];return w.push(B.wrapS),w.push(B.wrapT),w.push(B.wrapR||0),w.push(B.magFilter),w.push(B.minFilter),w.push(B.anisotropy),w.push(B.internalFormat),w.push(B.format),w.push(B.type),w.push(B.generateMipmaps),w.push(B.premultiplyAlpha),w.push(B.flipY),w.push(B.unpackAlignment),w.push(B.colorSpace),w.join()}function G(B,w){const te=n.get(B);if(B.isVideoTexture&&bt(B),B.isRenderTargetTexture===!1&&B.version>0&&te.__version!==B.version){const ae=B.image;if(ae===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ke(te,B,w);return}}t.bindTexture(i.TEXTURE_2D,te.__webglTexture,i.TEXTURE0+w)}function q(B,w){const te=n.get(B);if(B.version>0&&te.__version!==B.version){Ke(te,B,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,te.__webglTexture,i.TEXTURE0+w)}function ne(B,w){const te=n.get(B);if(B.version>0&&te.__version!==B.version){Ke(te,B,w);return}t.bindTexture(i.TEXTURE_3D,te.__webglTexture,i.TEXTURE0+w)}function se(B,w){const te=n.get(B);if(B.version>0&&te.__version!==B.version){ct(te,B,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture,i.TEXTURE0+w)}const pe={[Kr]:i.REPEAT,[tr]:i.CLAMP_TO_EDGE,[Do]:i.MIRRORED_REPEAT},K={[Pn]:i.NEAREST,[Pf]:i.NEAREST_MIPMAP_NEAREST,[Oo]:i.NEAREST_MIPMAP_LINEAR,[Hn]:i.LINEAR,[Na]:i.LINEAR_MIPMAP_NEAREST,[nr]:i.LINEAR_MIPMAP_LINEAR},he={[ev]:i.NEVER,[ov]:i.ALWAYS,[tv]:i.LESS,[_d]:i.LEQUAL,[nv]:i.EQUAL,[sv]:i.GEQUAL,[iv]:i.GREATER,[rv]:i.NOTEQUAL};function me(B,w){if(w.type===Oi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Hn||w.magFilter===Na||w.magFilter===Oo||w.magFilter===nr||w.minFilter===Hn||w.minFilter===Na||w.minFilter===Oo||w.minFilter===nr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(B,i.TEXTURE_WRAP_S,pe[w.wrapS]),i.texParameteri(B,i.TEXTURE_WRAP_T,pe[w.wrapT]),(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)&&i.texParameteri(B,i.TEXTURE_WRAP_R,pe[w.wrapR]),i.texParameteri(B,i.TEXTURE_MAG_FILTER,K[w.magFilter]),i.texParameteri(B,i.TEXTURE_MIN_FILTER,K[w.minFilter]),w.compareFunction&&(i.texParameteri(B,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(B,i.TEXTURE_COMPARE_FUNC,he[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Pn||w.minFilter!==Oo&&w.minFilter!==nr||w.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const te=e.get("EXT_texture_filter_anisotropic");i.texParameterf(B,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Ee(B,w){let te=!1;B.__webglInit===void 0&&(B.__webglInit=!0,w.addEventListener("dispose",L));const ae=w.source;let ue=m.get(ae);ue===void 0&&(ue={},m.set(ae,ue));const de=V(w);if(de!==B.__cacheKey){ue[de]===void 0&&(ue[de]={texture:i.createTexture(),usedTimes:0},c.memory.textures++,te=!0),ue[de].usedTimes++;const Be=ue[B.__cacheKey];Be!==void 0&&(ue[B.__cacheKey].usedTimes--,Be.usedTimes===0&&O(w)),B.__cacheKey=de,B.__webglTexture=ue[de].texture}return te}function Ke(B,w,te){let ae=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ae=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ae=i.TEXTURE_3D);const ue=Ee(B,w),de=w.source;t.bindTexture(ae,B.__webglTexture,i.TEXTURE0+te);const Be=n.get(de);if(de.version!==Be.__version||ue===!0){t.activeTexture(i.TEXTURE0+te);const _e=Rt.getPrimaries(Rt.workingColorSpace),De=w.colorSpace===Ln?null:Rt.getPrimaries(w.colorSpace),Ve=w.colorSpace===Ln||_e===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let ve=A(w.image,!1,r.maxTextureSize);ve=He(w,ve);const Te=o.convert(w.format,w.colorSpace),qe=o.convert(w.type);let Le=C(w.internalFormat,Te,qe,w.colorSpace,w.isVideoTexture);me(ae,w);let Ie;const ut=w.mipmaps,ft=w.isVideoTexture!==!0&&Le!==Vf,St=Be.__version===void 0||ue===!0,gt=de.dataReady,Mt=b(w,ve);if(w.isDepthTexture)Le=i.DEPTH_COMPONENT16,w.type===Oi?Le=i.DEPTH_COMPONENT32F:w.type===Cs?Le=i.DEPTH_COMPONENT24:w.type===Uo&&(Le=i.DEPTH24_STENCIL8),St&&(ft?t.texStorage2D(i.TEXTURE_2D,1,Le,ve.width,ve.height):t.texImage2D(i.TEXTURE_2D,0,Le,ve.width,ve.height,0,Te,qe,null));else if(w.isDataTexture)if(ut.length>0){ft&&St&&t.texStorage2D(i.TEXTURE_2D,Mt,Le,ut[0].width,ut[0].height);for(let Ue=0,S=ut.length;Ue<S;Ue++)Ie=ut[Ue],ft?gt&&t.texSubImage2D(i.TEXTURE_2D,Ue,0,0,Ie.width,Ie.height,Te,qe,Ie.data):t.texImage2D(i.TEXTURE_2D,Ue,Le,Ie.width,Ie.height,0,Te,qe,Ie.data);w.generateMipmaps=!1}else ft?(St&&t.texStorage2D(i.TEXTURE_2D,Mt,Le,ve.width,ve.height),gt&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve.width,ve.height,Te,qe,ve.data)):t.texImage2D(i.TEXTURE_2D,0,Le,ve.width,ve.height,0,Te,qe,ve.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ft&&St&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Le,ut[0].width,ut[0].height,ve.depth);for(let Ue=0,S=ut.length;Ue<S;Ue++)Ie=ut[Ue],w.format!==_i?Te!==null?ft?gt&&t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ue,0,0,0,Ie.width,Ie.height,ve.depth,Te,Ie.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Ue,Le,Ie.width,Ie.height,ve.depth,0,Ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?gt&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Ue,0,0,0,Ie.width,Ie.height,ve.depth,Te,qe,Ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Ue,Le,Ie.width,Ie.height,ve.depth,0,Te,qe,Ie.data)}else{ft&&St&&t.texStorage2D(i.TEXTURE_2D,Mt,Le,ut[0].width,ut[0].height);for(let Ue=0,S=ut.length;Ue<S;Ue++)Ie=ut[Ue],w.format!==_i?Te!==null?ft?gt&&t.compressedTexSubImage2D(i.TEXTURE_2D,Ue,0,0,Ie.width,Ie.height,Te,Ie.data):t.compressedTexImage2D(i.TEXTURE_2D,Ue,Le,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?gt&&t.texSubImage2D(i.TEXTURE_2D,Ue,0,0,Ie.width,Ie.height,Te,qe,Ie.data):t.texImage2D(i.TEXTURE_2D,Ue,Le,Ie.width,Ie.height,0,Te,qe,Ie.data)}else if(w.isDataArrayTexture)ft?(St&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Le,ve.width,ve.height,ve.depth),gt&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ve.width,ve.height,ve.depth,Te,qe,ve.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,ve.width,ve.height,ve.depth,0,Te,qe,ve.data);else if(w.isData3DTexture)ft?(St&&t.texStorage3D(i.TEXTURE_3D,Mt,Le,ve.width,ve.height,ve.depth),gt&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ve.width,ve.height,ve.depth,Te,qe,ve.data)):t.texImage3D(i.TEXTURE_3D,0,Le,ve.width,ve.height,ve.depth,0,Te,qe,ve.data);else if(w.isFramebufferTexture){if(St)if(ft)t.texStorage2D(i.TEXTURE_2D,Mt,Le,ve.width,ve.height);else{let Ue=ve.width,S=ve.height;for(let Z=0;Z<Mt;Z++)t.texImage2D(i.TEXTURE_2D,Z,Le,Ue,S,0,Te,qe,null),Ue>>=1,S>>=1}}else if(ut.length>0){if(ft&&St){const Ue=Tt(ut[0]);t.texStorage2D(i.TEXTURE_2D,Mt,Le,Ue.width,Ue.height)}for(let Ue=0,S=ut.length;Ue<S;Ue++)Ie=ut[Ue],ft?gt&&t.texSubImage2D(i.TEXTURE_2D,Ue,0,0,Te,qe,Ie):t.texImage2D(i.TEXTURE_2D,Ue,Le,Te,qe,Ie);w.generateMipmaps=!1}else if(ft){if(St){const Ue=Tt(ve);t.texStorage2D(i.TEXTURE_2D,Mt,Le,Ue.width,Ue.height)}gt&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,qe,ve)}else t.texImage2D(i.TEXTURE_2D,0,Le,Te,qe,ve);v(w)&&_(ae),Be.__version=de.version,w.onUpdate&&w.onUpdate(w)}B.__version=w.version}function ct(B,w,te){if(w.image.length!==6)return;const ae=Ee(B,w),ue=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+te);const de=n.get(ue);if(ue.version!==de.__version||ae===!0){t.activeTexture(i.TEXTURE0+te);const Be=Rt.getPrimaries(Rt.workingColorSpace),_e=w.colorSpace===Ln?null:Rt.getPrimaries(w.colorSpace),De=w.colorSpace===Ln||Be===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Ve=w.isCompressedTexture||w.image[0].isCompressedTexture,ve=w.image[0]&&w.image[0].isDataTexture,Te=[];for(let S=0;S<6;S++)!Ve&&!ve?Te[S]=A(w.image[S],!0,r.maxCubemapSize):Te[S]=ve?w.image[S].image:w.image[S],Te[S]=He(w,Te[S]);const qe=Te[0],Le=o.convert(w.format,w.colorSpace),Ie=o.convert(w.type),ut=C(w.internalFormat,Le,Ie,w.colorSpace),ft=w.isVideoTexture!==!0,St=de.__version===void 0||ae===!0,gt=ue.dataReady;let Mt=b(w,qe);me(i.TEXTURE_CUBE_MAP,w);let Ue;if(Ve){ft&&St&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,ut,qe.width,qe.height);for(let S=0;S<6;S++){Ue=Te[S].mipmaps;for(let Z=0;Z<Ue.length;Z++){const oe=Ue[Z];w.format!==_i?Le!==null?ft?gt&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z,0,0,oe.width,oe.height,Le,oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z,ut,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z,0,0,oe.width,oe.height,Le,Ie,oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z,ut,oe.width,oe.height,0,Le,Ie,oe.data)}}}else{if(Ue=w.mipmaps,ft&&St){Ue.length>0&&Mt++;const S=Tt(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,ut,S.width,S.height)}for(let S=0;S<6;S++)if(ve){ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Te[S].width,Te[S].height,Le,Ie,Te[S].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,ut,Te[S].width,Te[S].height,0,Le,Ie,Te[S].data);for(let Z=0;Z<Ue.length;Z++){const xe=Ue[Z].image[S].image;ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z+1,0,0,xe.width,xe.height,Le,Ie,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z+1,ut,xe.width,xe.height,0,Le,Ie,xe.data)}}else{ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Le,Ie,Te[S]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,ut,Le,Ie,Te[S]);for(let Z=0;Z<Ue.length;Z++){const oe=Ue[Z];ft?gt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z+1,0,0,Le,Ie,oe.image[S]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+S,Z+1,ut,Le,Ie,oe.image[S])}}}v(w)&&_(i.TEXTURE_CUBE_MAP),de.__version=ue.version,w.onUpdate&&w.onUpdate(w)}B.__version=w.version}function ie(B,w,te,ae,ue,de){const Be=o.convert(te.format,te.colorSpace),_e=o.convert(te.type),De=C(te.internalFormat,Be,_e,te.colorSpace);if(!n.get(w).__hasExternalTextures){const ve=Math.max(1,w.width>>de),Te=Math.max(1,w.height>>de);ue===i.TEXTURE_3D||ue===i.TEXTURE_2D_ARRAY?t.texImage3D(ue,de,De,ve,Te,w.depth,0,Be,_e,null):t.texImage2D(ue,de,De,ve,Te,0,Be,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,B),ze(w)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,ue,n.get(te).__webglTexture,0,$e(w)):(ue===i.TEXTURE_2D||ue>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ae,ue,n.get(te).__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(B,w,te){if(i.bindRenderbuffer(i.RENDERBUFFER,B),w.depthBuffer&&!w.stencilBuffer){let ae=i.DEPTH_COMPONENT24;if(te||ze(w)){const ue=w.depthTexture;ue&&ue.isDepthTexture&&(ue.type===Oi?ae=i.DEPTH_COMPONENT32F:ue.type===Cs&&(ae=i.DEPTH_COMPONENT24));const de=$e(w);ze(w)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,ae,w.width,w.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,de,ae,w.width,w.height)}else i.renderbufferStorage(i.RENDERBUFFER,ae,w.width,w.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,B)}else if(w.depthBuffer&&w.stencilBuffer){const ae=$e(w);te&&ze(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,i.DEPTH24_STENCIL8,w.width,w.height):ze(w)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,i.DEPTH24_STENCIL8,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,B)}else{const ae=w.textures;for(let ue=0;ue<ae.length;ue++){const de=ae[ue],Be=o.convert(de.format,de.colorSpace),_e=o.convert(de.type),De=C(de.internalFormat,Be,_e,de.colorSpace),Ve=$e(w);te&&ze(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,De,w.width,w.height):ze(w)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ve,De,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,De,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(B,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,B),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),G(w.depthTexture,0);const ae=n.get(w.depthTexture).__webglTexture,ue=$e(w);if(w.depthTexture.format===Ps)ze(w)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(w.depthTexture.format===No)ze(w)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Se(B){const w=n.get(B),te=B.isWebGLCubeRenderTarget===!0;if(B.depthTexture&&!w.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");we(w.__webglFramebuffer,B)}else if(te){w.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[ae]),w.__webglDepthbuffer[ae]=i.createRenderbuffer(),ge(w.__webglDepthbuffer[ae],B,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=i.createRenderbuffer(),ge(w.__webglDepthbuffer,B,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(B,w,te){const ae=n.get(B);w!==void 0&&ie(ae.__webglFramebuffer,B,B.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),te!==void 0&&Se(B)}function Xe(B){const w=B.texture,te=n.get(B),ae=n.get(w);B.addEventListener("dispose",k);const ue=B.textures,de=B.isWebGLCubeRenderTarget===!0,Be=ue.length>1;if(Be||(ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture()),ae.__version=w.version,c.memory.textures++),de){te.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(w.mipmaps&&w.mipmaps.length>0){te.__webglFramebuffer[_e]=[];for(let De=0;De<w.mipmaps.length;De++)te.__webglFramebuffer[_e][De]=i.createFramebuffer()}else te.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){te.__webglFramebuffer=[];for(let _e=0;_e<w.mipmaps.length;_e++)te.__webglFramebuffer[_e]=i.createFramebuffer()}else te.__webglFramebuffer=i.createFramebuffer();if(Be)for(let _e=0,De=ue.length;_e<De;_e++){const Ve=n.get(ue[_e]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=i.createTexture(),c.memory.textures++)}if(B.samples>0&&ze(B)===!1){te.__webglMultisampledFramebuffer=i.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let _e=0;_e<ue.length;_e++){const De=ue[_e];te.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,te.__webglColorRenderbuffer[_e]);const Ve=o.convert(De.format,De.colorSpace),ve=o.convert(De.type),Te=C(De.internalFormat,Ve,ve,De.colorSpace,B.isXRRenderTarget===!0),qe=$e(B);i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,Te,B.width,B.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,te.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),B.depthBuffer&&(te.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(te.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),me(i.TEXTURE_CUBE_MAP,w);for(let _e=0;_e<6;_e++)if(w.mipmaps&&w.mipmaps.length>0)for(let De=0;De<w.mipmaps.length;De++)ie(te.__webglFramebuffer[_e][De],B,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,De);else ie(te.__webglFramebuffer[_e],B,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);v(w)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Be){for(let _e=0,De=ue.length;_e<De;_e++){const Ve=ue[_e],ve=n.get(Ve);t.bindTexture(i.TEXTURE_2D,ve.__webglTexture),me(i.TEXTURE_2D,Ve),ie(te.__webglFramebuffer,B,Ve,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,0),v(Ve)&&_(i.TEXTURE_2D)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(_e=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,ae.__webglTexture),me(_e,w),w.mipmaps&&w.mipmaps.length>0)for(let De=0;De<w.mipmaps.length;De++)ie(te.__webglFramebuffer[De],B,w,i.COLOR_ATTACHMENT0,_e,De);else ie(te.__webglFramebuffer,B,w,i.COLOR_ATTACHMENT0,_e,0);v(w)&&_(_e),t.unbindTexture()}B.depthBuffer&&Se(B)}function lt(B){const w=B.textures;for(let te=0,ae=w.length;te<ae;te++){const ue=w[te];if(v(ue)){const de=B.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Be=n.get(ue).__webglTexture;t.bindTexture(de,Be),_(de),t.unbindTexture()}}}function j(B){if(B.samples>0&&ze(B)===!1){const w=B.textures,te=B.width,ae=B.height;let ue=i.COLOR_BUFFER_BIT;const de=[],Be=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(B),De=w.length>1;if(De)for(let Ve=0;Ve<w.length;Ve++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ve=0;Ve<w.length;Ve++){de.push(i.COLOR_ATTACHMENT0+Ve),B.depthBuffer&&de.push(Be);const ve=_e.__ignoreDepthValues!==void 0?_e.__ignoreDepthValues:!1;if(ve===!1&&(B.depthBuffer&&(ue|=i.DEPTH_BUFFER_BIT),B.stencilBuffer&&_e.__isTransmissionRenderTarget!==!0&&(ue|=i.STENCIL_BUFFER_BIT)),De&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[Ve]),ve===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Be]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Be])),De){const Te=n.get(w[Ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Te,0)}i.blitFramebuffer(0,0,te,ae,0,0,te,ae,ue,i.NEAREST),h&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),De)for(let Ve=0;Ve<w.length;Ve++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.RENDERBUFFER,_e.__webglColorRenderbuffer[Ve]);const ve=n.get(w[Ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.TEXTURE_2D,ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}}function $e(B){return Math.min(r.maxSamples,B.samples)}function ze(B){const w=n.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function bt(B){const w=c.render.frame;d.get(B)!==w&&(d.set(B,w),B.update())}function He(B,w){const te=B.colorSpace,ae=B.format,ue=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||te!==_n&&te!==Ln&&(Rt.getTransfer(te)===kt?(ae!==_i||ue!==Mr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",te)),w}function Tt(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(f.width=B.naturalWidth||B.width,f.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(f.width=B.displayWidth,f.height=B.displayHeight):(f.width=B.width,f.height=B.height),f}this.allocateTextureUnit=F,this.resetTextureUnits=y,this.setTexture2D=G,this.setTexture2DArray=q,this.setTexture3D=ne,this.setTextureCube=se,this.rebindTextures=Ge,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=ze}function kM(i,e){function t(n,r=Ln){let o;const c=Rt.getTransfer(r);if(n===Mr)return i.UNSIGNED_BYTE;if(n===Df)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Of)return i.UNSIGNED_SHORT_5_5_5_1;if(n===G0)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===k0)return i.BYTE;if(n===H0)return i.SHORT;if(n===Lf)return i.UNSIGNED_SHORT;if(n===If)return i.INT;if(n===Cs)return i.UNSIGNED_INT;if(n===Oi)return i.FLOAT;if(n===Fa)return i.HALF_FLOAT;if(n===V0)return i.ALPHA;if(n===W0)return i.RGB;if(n===_i)return i.RGBA;if(n===X0)return i.LUMINANCE;if(n===Y0)return i.LUMINANCE_ALPHA;if(n===Ps)return i.DEPTH_COMPONENT;if(n===No)return i.DEPTH_STENCIL;if(n===Uf)return i.RED;if(n===Nf)return i.RED_INTEGER;if(n===j0)return i.RG;if(n===Ff)return i.RG_INTEGER;if(n===Bf)return i.RGBA_INTEGER;if(n===Ll||n===Il||n===Dl||n===Ol)if(c===kt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Ll)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Il)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Dl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ol)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Ll)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Il)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Dl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ol)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zf||n===kf||n===Hf||n===Gf)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===zf)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===kf)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hf)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gf)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vf)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===Wf||n===Xf)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Wf)return c===kt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Xf)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yf||n===jf||n===qf||n===Kf||n===Zf||n===$f||n===Jf||n===Qf||n===ed||n===td||n===nd||n===id||n===rd||n===sd)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Yf)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jf)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qf)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Kf)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zf)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$f)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Jf)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qf)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ed)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===td)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nd)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===id)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rd)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sd)return c===kt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ul||n===od||n===ad)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Ul)return c===kt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===od)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ad)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===q0||n===cd||n===ld||n===ud)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Ul)return o.COMPRESSED_RED_RGTC1_EXT;if(n===cd)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ld)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ud)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Uo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class HM extends Dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let zi=class extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const GM={type:"move"};class mu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,o=null,c=null;const l=this._targetRay,h=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){c=!0;for(const A of e.hand.values()){const v=t.getJointPose(A,n),_=this._getHandJoint(f,A);v!==null&&(_.matrix.fromArray(v.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=v.radius),_.visible=v!==null}const d=f.joints["index-finger-tip"],p=f.joints["thumb-tip"],m=d.position.distanceTo(p.position),x=.02,M=.005;f.inputState.pinching&&m>x+M?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&m<=x-M&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(GM)))}return l!==null&&(l.visible=r!==null),h!==null&&(h.visible=o!==null),f!==null&&(f.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const VM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,WM=`
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

}`;class XM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new cn,o=e.properties.get(r);o.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,r=new Rr({vertexShader:VM,fragmentShader:WM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ye(new ns(20,20),r)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class YM extends Zr{constructor(e,t){super();const n=this;let r=null,o=1,c=null,l="local-floor",h=1,f=null,d=null,p=null,m=null,x=null,M=null;const A=new XM,v=t.getContextAttributes();let _=null,C=null;const b=[],L=[],k=new Pe;let U=null;const O=new Dn;O.layers.enable(1),O.viewport=new Dt;const I=new Dn;I.layers.enable(2),I.viewport=new Dt;const E=[O,I],y=new HM;y.layers.enable(1),y.layers.enable(2);let F=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let ge=b[ie];return ge===void 0&&(ge=new mu,b[ie]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(ie){let ge=b[ie];return ge===void 0&&(ge=new mu,b[ie]=ge),ge.getGripSpace()},this.getHand=function(ie){let ge=b[ie];return ge===void 0&&(ge=new mu,b[ie]=ge),ge.getHandSpace()};function G(ie){const ge=L.indexOf(ie.inputSource);if(ge===-1)return;const we=b[ge];we!==void 0&&(we.update(ie.inputSource,ie.frame,f||c),we.dispatchEvent({type:ie.type,data:ie.inputSource}))}function q(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",ne);for(let ie=0;ie<b.length;ie++){const ge=L[ie];ge!==null&&(L[ie]=null,b[ie].disconnect(ge))}F=null,V=null,A.reset(),e.setRenderTarget(_),x=null,m=null,p=null,r=null,C=null,ct.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){o=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){l=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||c},this.setReferenceSpace=function(ie){f=ie},this.getBaseLayer=function(){return m!==null?m:x},this.getBinding=function(){return p},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",q),r.addEventListener("inputsourceschange",ne),v.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(k),r.renderState.layers===void 0){const ge={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:o};x=new XRWebGLLayer(r,t,ge),r.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),C=new $r(x.framebufferWidth,x.framebufferHeight,{format:_i,type:Mr,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let ge=null,we=null,Se=null;v.depth&&(Se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=v.stencil?No:Ps,we=v.stencil?Uo:Cs);const Ge={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:o};p=new XRWebGLBinding(r,t),m=p.createProjectionLayer(Ge),r.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),C=new $r(m.textureWidth,m.textureHeight,{format:_i,type:Mr,depthTexture:new rp(m.textureWidth,m.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Xe=e.properties.get(C);Xe.__ignoreDepthValues=m.ignoreDepthValues}C.isXRRenderTarget=!0,this.setFoveation(h),f=null,c=await r.requestReferenceSpace(l),ct.setContext(r),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function ne(ie){for(let ge=0;ge<ie.removed.length;ge++){const we=ie.removed[ge],Se=L.indexOf(we);Se>=0&&(L[Se]=null,b[Se].disconnect(we))}for(let ge=0;ge<ie.added.length;ge++){const we=ie.added[ge];let Se=L.indexOf(we);if(Se===-1){for(let Xe=0;Xe<b.length;Xe++)if(Xe>=L.length){L.push(we),Se=Xe;break}else if(L[Xe]===null){L[Xe]=we,Se=Xe;break}if(Se===-1)break}const Ge=b[Se];Ge&&Ge.connect(we)}}const se=new N,pe=new N;function K(ie,ge,we){se.setFromMatrixPosition(ge.matrixWorld),pe.setFromMatrixPosition(we.matrixWorld);const Se=se.distanceTo(pe),Ge=ge.projectionMatrix.elements,Xe=we.projectionMatrix.elements,lt=Ge[14]/(Ge[10]-1),j=Ge[14]/(Ge[10]+1),$e=(Ge[9]+1)/Ge[5],ze=(Ge[9]-1)/Ge[5],bt=(Ge[8]-1)/Ge[0],He=(Xe[8]+1)/Xe[0],Tt=lt*bt,B=lt*He,w=Se/(-bt+He),te=w*-bt;ge.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(te),ie.translateZ(w),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert();const ae=lt+w,ue=j+w,de=Tt-te,Be=B+(Se-te),_e=$e*j/ue*ae,De=ze*j/ue*ae;ie.projectionMatrix.makePerspective(de,Be,_e,De,ae,ue),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}function he(ie,ge){ge===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(ge.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;A.texture!==null&&(ie.near=A.depthNear,ie.far=A.depthFar),y.near=I.near=O.near=ie.near,y.far=I.far=O.far=ie.far,(F!==y.near||V!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),F=y.near,V=y.far,O.near=F,O.far=V,I.near=F,I.far=V,O.updateProjectionMatrix(),I.updateProjectionMatrix(),ie.updateProjectionMatrix());const ge=ie.parent,we=y.cameras;he(y,ge);for(let Se=0;Se<we.length;Se++)he(we[Se],ge);we.length===2?K(y,O,I):y.projectionMatrix.copy(O.projectionMatrix),me(ie,y,ge)};function me(ie,ge,we){we===null?ie.matrix.copy(ge.matrixWorld):(ie.matrix.copy(we.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(ge.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(ge.projectionMatrix),ie.projectionMatrixInverse.copy(ge.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Ds*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(m===null&&x===null))return h},this.setFoveation=function(ie){h=ie,m!==null&&(m.fixedFoveation=ie),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=ie)},this.hasDepthSensing=function(){return A.texture!==null};let Ee=null;function Ke(ie,ge){if(d=ge.getViewerPose(f||c),M=ge,d!==null){const we=d.views;x!==null&&(e.setRenderTargetFramebuffer(C,x.framebuffer),e.setRenderTarget(C));let Se=!1;we.length!==y.cameras.length&&(y.cameras.length=0,Se=!0);for(let Xe=0;Xe<we.length;Xe++){const lt=we[Xe];let j=null;if(x!==null)j=x.getViewport(lt);else{const ze=p.getViewSubImage(m,lt);j=ze.viewport,Xe===0&&(e.setRenderTargetTextures(C,ze.colorTexture,m.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(C))}let $e=E[Xe];$e===void 0&&($e=new Dn,$e.layers.enable(Xe),$e.viewport=new Dt,E[Xe]=$e),$e.matrix.fromArray(lt.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(lt.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(j.x,j.y,j.width,j.height),Xe===0&&(y.matrix.copy($e.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Se===!0&&y.cameras.push($e)}const Ge=r.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")){const Xe=p.getDepthInformation(we[0]);Xe&&Xe.isValid&&Xe.texture&&A.init(e,Xe,r.renderState)}}for(let we=0;we<b.length;we++){const Se=L[we],Ge=b[we];Se!==null&&Ge!==void 0&&Ge.update(Se,ge,f||c)}A.render(e,y),Ee&&Ee(ie,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),M=null}const ct=new Zd;ct.setAnimationLoop(Ke),this.setAnimationLoop=function(ie){Ee=ie},this.dispose=function(){}}}const os=new Ei,jM=new Qe;function qM(i,e){function t(v,_){v.matrixAutoUpdate===!0&&v.updateMatrix(),_.value.copy(v.matrix)}function n(v,_){_.color.getRGB(v.fogColor.value,Wd(i)),_.isFog?(v.fogNear.value=_.near,v.fogFar.value=_.far):_.isFogExp2&&(v.fogDensity.value=_.density)}function r(v,_,C,b,L){_.isMeshBasicMaterial||_.isMeshLambertMaterial?o(v,_):_.isMeshToonMaterial?(o(v,_),p(v,_)):_.isMeshPhongMaterial?(o(v,_),d(v,_)):_.isMeshStandardMaterial?(o(v,_),m(v,_),_.isMeshPhysicalMaterial&&x(v,_,L)):_.isMeshMatcapMaterial?(o(v,_),M(v,_)):_.isMeshDepthMaterial?o(v,_):_.isMeshDistanceMaterial?(o(v,_),A(v,_)):_.isMeshNormalMaterial?o(v,_):_.isLineBasicMaterial?(c(v,_),_.isLineDashedMaterial&&l(v,_)):_.isPointsMaterial?h(v,_,C,b):_.isSpriteMaterial?f(v,_):_.isShadowMaterial?(v.color.value.copy(_.color),v.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function o(v,_){v.opacity.value=_.opacity,_.color&&v.diffuse.value.copy(_.color),_.emissive&&v.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(v.map.value=_.map,t(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.bumpMap&&(v.bumpMap.value=_.bumpMap,t(_.bumpMap,v.bumpMapTransform),v.bumpScale.value=_.bumpScale,_.side===kn&&(v.bumpScale.value*=-1)),_.normalMap&&(v.normalMap.value=_.normalMap,t(_.normalMap,v.normalMapTransform),v.normalScale.value.copy(_.normalScale),_.side===kn&&v.normalScale.value.negate()),_.displacementMap&&(v.displacementMap.value=_.displacementMap,t(_.displacementMap,v.displacementMapTransform),v.displacementScale.value=_.displacementScale,v.displacementBias.value=_.displacementBias),_.emissiveMap&&(v.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,v.emissiveMapTransform)),_.specularMap&&(v.specularMap.value=_.specularMap,t(_.specularMap,v.specularMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest);const C=e.get(_),b=C.envMap,L=C.envMapRotation;if(b&&(v.envMap.value=b,os.copy(L),os.x*=-1,os.y*=-1,os.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),v.envMapRotation.value.setFromMatrix4(jM.makeRotationFromEuler(os)),v.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=_.reflectivity,v.ior.value=_.ior,v.refractionRatio.value=_.refractionRatio),_.lightMap){v.lightMap.value=_.lightMap;const k=i._useLegacyLights===!0?Math.PI:1;v.lightMapIntensity.value=_.lightMapIntensity*k,t(_.lightMap,v.lightMapTransform)}_.aoMap&&(v.aoMap.value=_.aoMap,v.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,v.aoMapTransform))}function c(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,_.map&&(v.map.value=_.map,t(_.map,v.mapTransform))}function l(v,_){v.dashSize.value=_.dashSize,v.totalSize.value=_.dashSize+_.gapSize,v.scale.value=_.scale}function h(v,_,C,b){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.size.value=_.size*C,v.scale.value=b*.5,_.map&&(v.map.value=_.map,t(_.map,v.uvTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function f(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.rotation.value=_.rotation,_.map&&(v.map.value=_.map,t(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function d(v,_){v.specular.value.copy(_.specular),v.shininess.value=Math.max(_.shininess,1e-4)}function p(v,_){_.gradientMap&&(v.gradientMap.value=_.gradientMap)}function m(v,_){v.metalness.value=_.metalness,_.metalnessMap&&(v.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,v.metalnessMapTransform)),v.roughness.value=_.roughness,_.roughnessMap&&(v.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,v.roughnessMapTransform)),_.envMap&&(v.envMapIntensity.value=_.envMapIntensity)}function x(v,_,C){v.ior.value=_.ior,_.sheen>0&&(v.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),v.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(v.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,v.sheenColorMapTransform)),_.sheenRoughnessMap&&(v.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,v.sheenRoughnessMapTransform))),_.clearcoat>0&&(v.clearcoat.value=_.clearcoat,v.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(v.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,v.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(v.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===kn&&v.clearcoatNormalScale.value.negate())),_.iridescence>0&&(v.iridescence.value=_.iridescence,v.iridescenceIOR.value=_.iridescenceIOR,v.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(v.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,v.iridescenceMapTransform)),_.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),_.transmission>0&&(v.transmission.value=_.transmission,v.transmissionSamplerMap.value=C.texture,v.transmissionSamplerSize.value.set(C.width,C.height),_.transmissionMap&&(v.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,v.transmissionMapTransform)),v.thickness.value=_.thickness,_.thicknessMap&&(v.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=_.attenuationDistance,v.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(v.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(v.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=_.specularIntensity,v.specularColor.value.copy(_.specularColor),_.specularColorMap&&(v.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,v.specularColorMapTransform)),_.specularIntensityMap&&(v.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,v.specularIntensityMapTransform))}function M(v,_){_.matcap&&(v.matcap.value=_.matcap)}function A(v,_){const C=e.get(_).light;v.referencePosition.value.setFromMatrixPosition(C.matrixWorld),v.nearDistance.value=C.shadow.camera.near,v.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function KM(i,e,t,n){let r={},o={},c=[];const l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(C,b){const L=b.program;n.uniformBlockBinding(C,L)}function f(C,b){let L=r[C.id];L===void 0&&(M(C),L=d(C),r[C.id]=L,C.addEventListener("dispose",v));const k=b.program;n.updateUBOMapping(C,k);const U=e.render.frame;o[C.id]!==U&&(m(C),o[C.id]=U)}function d(C){const b=p();C.__bindingPointIndex=b;const L=i.createBuffer(),k=C.__size,U=C.usage;return i.bindBuffer(i.UNIFORM_BUFFER,L),i.bufferData(i.UNIFORM_BUFFER,k,U),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,L),L}function p(){for(let C=0;C<l;C++)if(c.indexOf(C)===-1)return c.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(C){const b=r[C.id],L=C.uniforms,k=C.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let U=0,O=L.length;U<O;U++){const I=Array.isArray(L[U])?L[U]:[L[U]];for(let E=0,y=I.length;E<y;E++){const F=I[E];if(x(F,U,E,k)===!0){const V=F.__offset,G=Array.isArray(F.value)?F.value:[F.value];let q=0;for(let ne=0;ne<G.length;ne++){const se=G[ne],pe=A(se);typeof se=="number"||typeof se=="boolean"?(F.__data[0]=se,i.bufferSubData(i.UNIFORM_BUFFER,V+q,F.__data)):se.isMatrix3?(F.__data[0]=se.elements[0],F.__data[1]=se.elements[1],F.__data[2]=se.elements[2],F.__data[3]=0,F.__data[4]=se.elements[3],F.__data[5]=se.elements[4],F.__data[6]=se.elements[5],F.__data[7]=0,F.__data[8]=se.elements[6],F.__data[9]=se.elements[7],F.__data[10]=se.elements[8],F.__data[11]=0):(se.toArray(F.__data,q),q+=pe.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function x(C,b,L,k){const U=C.value,O=b+"_"+L;if(k[O]===void 0)return typeof U=="number"||typeof U=="boolean"?k[O]=U:k[O]=U.clone(),!0;{const I=k[O];if(typeof U=="number"||typeof U=="boolean"){if(I!==U)return k[O]=U,!0}else if(I.equals(U)===!1)return I.copy(U),!0}return!1}function M(C){const b=C.uniforms;let L=0;const k=16;for(let O=0,I=b.length;O<I;O++){const E=Array.isArray(b[O])?b[O]:[b[O]];for(let y=0,F=E.length;y<F;y++){const V=E[y],G=Array.isArray(V.value)?V.value:[V.value];for(let q=0,ne=G.length;q<ne;q++){const se=G[q],pe=A(se),K=L%k;K!==0&&k-K<pe.boundary&&(L+=k-K),V.__data=new Float32Array(pe.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=L,L+=pe.storage}}}const U=L%k;return U>0&&(L+=k-U),C.__size=L,C.__cache={},this}function A(C){const b={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(b.boundary=4,b.storage=4):C.isVector2?(b.boundary=8,b.storage=8):C.isVector3||C.isColor?(b.boundary=16,b.storage=12):C.isVector4?(b.boundary=16,b.storage=16):C.isMatrix3?(b.boundary=48,b.storage=48):C.isMatrix4?(b.boundary=64,b.storage=64):C.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",C),b}function v(C){const b=C.target;b.removeEventListener("dispose",v);const L=c.indexOf(b.__bindingPointIndex);c.splice(L,1),i.deleteBuffer(r[b.id]),delete r[b.id],delete o[b.id]}function _(){for(const C in r)i.deleteBuffer(r[C]);c=[],r={},o={}}return{bind:h,update:f,dispose:_}}class ZM{constructor(e={}){const{canvas:t=Ev(),context:n=null,depth:r=!0,stencil:o=!1,alpha:c=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:f=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=c;const x=new Uint32Array(4),M=new Int32Array(4);let A=null,v=null;const _=[],C=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=an,this._useLegacyLights=!1,this.toneMapping=er,this.toneMappingExposure=1;const b=this;let L=!1,k=0,U=0,O=null,I=-1,E=null;const y=new Dt,F=new Dt;let V=null;const G=new Ne(0);let q=0,ne=t.width,se=t.height,pe=1,K=null,he=null;const me=new Dt(0,0,ne,se),Ee=new Dt(0,0,ne,se);let Ke=!1;const ct=new ou;let ie=!1,ge=!1;const we=new Qe,Se=new Pe,Ge=new N,Xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function lt(){return O===null?pe:1}let j=n;function $e(D,Y){const Q=t.getContext(D,Y);return Q!==null?Q:null}try{const D={alpha:!0,depth:r,stencil:o,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:f,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Al}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",oe,!1),t.addEventListener("webglcontextcreationerror",xe,!1),j===null){const Y="webgl2";if(j=$e(Y,D),j===null)throw $e(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let ze,bt,He,Tt,B,w,te,ae,ue,de,Be,_e,De,Ve,ve,Te,qe,Le,Ie,ut,ft,St,gt,Mt;function Ue(){ze=new rS(j),ze.init(),bt=new Jy(j,ze,e),St=new kM(j,ze),He=new BM(j),Tt=new aS(j),B=new bM,w=new zM(j,ze,He,B,bt,St,Tt),te=new eS(b),ae=new iS(b),ue=new jv(j),gt=new Zy(j,ue),de=new sS(j,ue,Tt,gt),Be=new lS(j,de,ue,Tt),Ie=new cS(j,bt,w),Te=new Qy(B),_e=new EM(b,te,ae,ze,bt,gt,Te),De=new qM(b,B),Ve=new AM,ve=new IM(ze),Le=new Ky(b,te,ae,He,Be,m,h),qe=new FM(b,Be,bt),Mt=new KM(j,Tt,bt,He),ut=new $y(j,ze,Tt),ft=new oS(j,ze,Tt),Tt.programs=_e.programs,b.capabilities=bt,b.extensions=ze,b.properties=B,b.renderLists=Ve,b.shadowMap=qe,b.state=He,b.info=Tt}Ue();const S=new YM(b,j);this.xr=S,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const D=ze.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=ze.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(D){D!==void 0&&(pe=D,this.setSize(ne,se,!1))},this.getSize=function(D){return D.set(ne,se)},this.setSize=function(D,Y,Q=!0){if(S.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ne=D,se=Y,t.width=Math.floor(D*pe),t.height=Math.floor(Y*pe),Q===!0&&(t.style.width=D+"px",t.style.height=Y+"px"),this.setViewport(0,0,D,Y)},this.getDrawingBufferSize=function(D){return D.set(ne*pe,se*pe).floor()},this.setDrawingBufferSize=function(D,Y,Q){ne=D,se=Y,pe=Q,t.width=Math.floor(D*Q),t.height=Math.floor(Y*Q),this.setViewport(0,0,D,Y)},this.getCurrentViewport=function(D){return D.copy(y)},this.getViewport=function(D){return D.copy(me)},this.setViewport=function(D,Y,Q,ee){D.isVector4?me.set(D.x,D.y,D.z,D.w):me.set(D,Y,Q,ee),He.viewport(y.copy(me).multiplyScalar(pe).round())},this.getScissor=function(D){return D.copy(Ee)},this.setScissor=function(D,Y,Q,ee){D.isVector4?Ee.set(D.x,D.y,D.z,D.w):Ee.set(D,Y,Q,ee),He.scissor(F.copy(Ee).multiplyScalar(pe).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(D){He.setScissorTest(Ke=D)},this.setOpaqueSort=function(D){K=D},this.setTransparentSort=function(D){he=D},this.getClearColor=function(D){return D.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor.apply(Le,arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha.apply(Le,arguments)},this.clear=function(D=!0,Y=!0,Q=!0){let ee=0;if(D){let $=!1;if(O!==null){const Ae=O.texture.format;$=Ae===Bf||Ae===Ff||Ae===Nf}if($){const Ae=O.texture.type,Fe=Ae===Mr||Ae===Cs||Ae===Lf||Ae===Uo||Ae===Df||Ae===Of,ke=Le.getClearColor(),Ze=Le.getClearAlpha(),Je=ke.r,et=ke.g,nt=ke.b;Fe?(x[0]=Je,x[1]=et,x[2]=nt,x[3]=Ze,j.clearBufferuiv(j.COLOR,0,x)):(M[0]=Je,M[1]=et,M[2]=nt,M[3]=Ze,j.clearBufferiv(j.COLOR,0,M))}else ee|=j.COLOR_BUFFER_BIT}Y&&(ee|=j.DEPTH_BUFFER_BIT),Q&&(ee|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",oe,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ve.dispose(),ve.dispose(),B.dispose(),te.dispose(),ae.dispose(),Be.dispose(),gt.dispose(),Mt.dispose(),_e.dispose(),S.dispose(),S.removeEventListener("sessionstart",Zt),S.removeEventListener("sessionend",$t),Un.stop()};function Z(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function oe(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const D=Tt.autoReset,Y=qe.enabled,Q=qe.autoUpdate,ee=qe.needsUpdate,$=qe.type;Ue(),Tt.autoReset=D,qe.enabled=Y,qe.autoUpdate=Q,qe.needsUpdate=ee,qe.type=$}function xe(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Re(D){const Y=D.target;Y.removeEventListener("dispose",Re),_t(Y)}function _t(D){dt(D),B.remove(D)}function dt(D){const Y=B.get(D).programs;Y!==void 0&&(Y.forEach(function(Q){_e.releaseProgram(Q)}),D.isShaderMaterial&&_e.releaseShaderCache(D))}this.renderBufferDirect=function(D,Y,Q,ee,$,Ae){Y===null&&(Y=Xe);const Fe=$.isMesh&&$.matrixWorld.determinant()<0,ke=ch(D,Y,Q,ee,$);He.setMaterial(ee,Fe);let Ze=Q.index,Je=1;if(ee.wireframe===!0){if(Ze=de.getWireframeAttribute(Q),Ze===void 0)return;Je=2}const et=Q.drawRange,nt=Q.attributes.position;let jt=et.start*Je,wn=(et.start+et.count)*Je;Ae!==null&&(jt=Math.max(jt,Ae.start*Je),wn=Math.min(wn,(Ae.start+Ae.count)*Je)),Ze!==null?(jt=Math.max(jt,0),wn=Math.min(wn,Ze.count)):nt!=null&&(jt=Math.max(jt,0),wn=Math.min(wn,nt.count));const en=wn-jt;if(en<0||en===1/0)return;gt.setup($,ee,ke,Q,Ze);let ai,Gt=ut;if(Ze!==null&&(ai=ue.get(Ze),Gt=ft,Gt.setIndex(ai)),$.isMesh)ee.wireframe===!0?(He.setLineWidth(ee.wireframeLinewidth*lt()),Gt.setMode(j.LINES)):Gt.setMode(j.TRIANGLES);else if($.isLine){let rt=ee.linewidth;rt===void 0&&(rt=1),He.setLineWidth(rt*lt()),$.isLineSegments?Gt.setMode(j.LINES):$.isLineLoop?Gt.setMode(j.LINE_LOOP):Gt.setMode(j.LINE_STRIP)}else $.isPoints?Gt.setMode(j.POINTS):$.isSprite&&Gt.setMode(j.TRIANGLES);if($.isBatchedMesh)Gt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else if($.isInstancedMesh)Gt.renderInstances(jt,en,$.count);else if(Q.isInstancedBufferGeometry){const rt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,ma=Math.min(Q.instanceCount,rt);Gt.renderInstances(jt,en,ma)}else Gt.render(jt,en)};function Ft(D,Y,Q){D.transparent===!0&&D.side===gi&&D.forceSinglePass===!1?(D.side=kn,D.needsUpdate=!0,vo(D,Y,Q),D.side=Di,D.needsUpdate=!0,vo(D,Y,Q),D.side=gi):vo(D,Y,Q)}this.compile=function(D,Y,Q=null){Q===null&&(Q=D),v=ve.get(Q),v.init(),C.push(v),Q.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(v.pushLight($),$.castShadow&&v.pushShadow($))}),D!==Q&&D.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(v.pushLight($),$.castShadow&&v.pushShadow($))}),v.setupLights(b._useLegacyLights);const ee=new Set;return D.traverse(function($){const Ae=$.material;if(Ae)if(Array.isArray(Ae))for(let Fe=0;Fe<Ae.length;Fe++){const ke=Ae[Fe];Ft(ke,Q,$),ee.add(ke)}else Ft(Ae,Q,$),ee.add(Ae)}),C.pop(),v=null,ee},this.compileAsync=function(D,Y,Q=null){const ee=this.compile(D,Y,Q);return new Promise($=>{function Ae(){if(ee.forEach(function(Fe){B.get(Fe).currentProgram.isReady()&&ee.delete(Fe)}),ee.size===0){$(D);return}setTimeout(Ae,10)}ze.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let on=null;function At(D){on&&on(D)}function Zt(){Un.stop()}function $t(){Un.start()}const Un=new Zd;Un.setAnimationLoop(At),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(D){on=D,S.setAnimationLoop(D),D===null?Un.stop():Un.start()},S.addEventListener("sessionstart",Zt),S.addEventListener("sessionend",$t),this.render=function(D,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),S.enabled===!0&&S.isPresenting===!0&&(S.cameraAutoUpdate===!0&&S.updateCamera(Y),Y=S.getCamera()),D.isScene===!0&&D.onBeforeRender(b,D,Y,O),v=ve.get(D,C.length),v.init(),C.push(v),we.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),ct.setFromProjectionMatrix(we),ge=this.localClippingEnabled,ie=Te.init(this.clippingPlanes,ge),A=Ve.get(D,_.length),A.init(),_.push(A),An(D,Y,0,b.sortObjects),A.finish(),b.sortObjects===!0&&A.sort(K,he),this.info.render.frame++,ie===!0&&Te.beginShadows();const Q=v.state.shadowsArray;if(qe.render(Q,D,Y),ie===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset(),(S.enabled===!1||S.isPresenting===!1||S.hasDepthSensing()===!1)&&Le.render(A,D),v.setupLights(b._useLegacyLights),Y.isArrayCamera){const ee=Y.cameras;for(let $=0,Ae=ee.length;$<Ae;$++){const Fe=ee[$];ji(A,D,Fe,Fe.viewport)}}else ji(A,D,Y);O!==null&&(w.updateMultisampleRenderTarget(O),w.updateRenderTargetMipmap(O)),D.isScene===!0&&D.onAfterRender(b,D,Y),gt.resetDefaultState(),I=-1,E=null,C.pop(),C.length>0?v=C[C.length-1]:v=null,_.pop(),_.length>0?A=_[_.length-1]:A=null};function An(D,Y,Q,ee){if(D.visible===!1)return;if(D.layers.test(Y.layers)){if(D.isGroup)Q=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(Y);else if(D.isLight)v.pushLight(D),D.castShadow&&v.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||ct.intersectsSprite(D)){ee&&Ge.setFromMatrixPosition(D.matrixWorld).applyMatrix4(we);const Fe=Be.update(D),ke=D.material;ke.visible&&A.push(D,Fe,ke,Q,Ge.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||ct.intersectsObject(D))){const Fe=Be.update(D),ke=D.material;if(ee&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ge.copy(D.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),Ge.copy(Fe.boundingSphere.center)),Ge.applyMatrix4(D.matrixWorld).applyMatrix4(we)),Array.isArray(ke)){const Ze=Fe.groups;for(let Je=0,et=Ze.length;Je<et;Je++){const nt=Ze[Je],jt=ke[nt.materialIndex];jt&&jt.visible&&A.push(D,Fe,jt,Q,Ge.z,nt)}}else ke.visible&&A.push(D,Fe,ke,Q,Ge.z,null)}}const Ae=D.children;for(let Fe=0,ke=Ae.length;Fe<ke;Fe++)An(Ae[Fe],Y,Q,ee)}function ji(D,Y,Q,ee){const $=D.opaque,Ae=D.transmissive,Fe=D.transparent;v.setupLightsView(Q),ie===!0&&Te.setGlobalState(b.clippingPlanes,Q),Ae.length>0&&qi($,Ae,Y,Q),ee&&He.viewport(y.copy(ee)),$.length>0&&hr($,Y,Q),Ae.length>0&&hr(Ae,Y,Q),Fe.length>0&&hr(Fe,Y,Q),He.buffers.depth.setTest(!0),He.buffers.depth.setMask(!0),He.buffers.color.setMask(!0),He.setPolygonOffset(!1)}function qi(D,Y,Q,ee){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget===null){v.state.transmissionRenderTarget=new $r(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?Fa:Mr,minFilter:nr,samples:4,stencilBuffer:o});const Je=B.get(v.state.transmissionRenderTarget);Je.__isTransmissionRenderTarget=!0}const Ae=v.state.transmissionRenderTarget;b.getDrawingBufferSize(Se),Ae.setSize(Se.x,Se.y);const Fe=b.getRenderTarget();b.setRenderTarget(Ae),b.getClearColor(G),q=b.getClearAlpha(),q<1&&b.setClearColor(16777215,.5),b.clear();const ke=b.toneMapping;b.toneMapping=er,hr(D,Q,ee),w.updateMultisampleRenderTarget(Ae),w.updateRenderTargetMipmap(Ae);let Ze=!1;for(let Je=0,et=Y.length;Je<et;Je++){const nt=Y[Je],jt=nt.object,wn=nt.geometry,en=nt.material,ai=nt.group;if(en.side===gi&&jt.layers.test(ee.layers)){const Gt=en.side;en.side=kn,en.needsUpdate=!0,Fc(jt,Q,ee,wn,en,ai),en.side=Gt,en.needsUpdate=!0,Ze=!0}}Ze===!0&&(w.updateMultisampleRenderTarget(Ae),w.updateRenderTargetMipmap(Ae)),b.setRenderTarget(Fe),b.setClearColor(G,q),b.toneMapping=ke}function hr(D,Y,Q){const ee=Y.isScene===!0?Y.overrideMaterial:null;for(let $=0,Ae=D.length;$<Ae;$++){const Fe=D[$],ke=Fe.object,Ze=Fe.geometry,Je=ee===null?Fe.material:ee,et=Fe.group;ke.layers.test(Q.layers)&&Fc(ke,Y,Q,Ze,Je,et)}}function Fc(D,Y,Q,ee,$,Ae){D.onBeforeRender(b,Y,Q,ee,$,Ae),D.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),$.onBeforeRender(b,Y,Q,ee,D,Ae),$.transparent===!0&&$.side===gi&&$.forceSinglePass===!1?($.side=kn,$.needsUpdate=!0,b.renderBufferDirect(Q,Y,ee,$,D,Ae),$.side=Di,$.needsUpdate=!0,b.renderBufferDirect(Q,Y,ee,$,D,Ae),$.side=gi):b.renderBufferDirect(Q,Y,ee,$,D,Ae),D.onAfterRender(b,Y,Q,ee,$,Ae)}function vo(D,Y,Q){Y.isScene!==!0&&(Y=Xe);const ee=B.get(D),$=v.state.lights,Ae=v.state.shadowsArray,Fe=$.state.version,ke=_e.getParameters(D,$.state,Ae,Y,Q),Ze=_e.getProgramCacheKey(ke);let Je=ee.programs;ee.environment=D.isMeshStandardMaterial?Y.environment:null,ee.fog=Y.fog,ee.envMap=(D.isMeshStandardMaterial?ae:te).get(D.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&D.envMap===null?Y.environmentRotation:D.envMapRotation,Je===void 0&&(D.addEventListener("dispose",Re),Je=new Map,ee.programs=Je);let et=Je.get(Ze);if(et!==void 0){if(ee.currentProgram===et&&ee.lightsStateVersion===Fe)return zc(D,ke),et}else ke.uniforms=_e.getUniforms(D),D.onBuild(Q,ke,b),D.onBeforeCompile(ke,b),et=_e.acquireProgram(ke,Ze),Je.set(Ze,et),ee.uniforms=ke.uniforms;const nt=ee.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(nt.clippingPlanes=Te.uniform),zc(D,ke),ee.needsLights=uh(D),ee.lightsStateVersion=Fe,ee.needsLights&&(nt.ambientLightColor.value=$.state.ambient,nt.lightProbe.value=$.state.probe,nt.directionalLights.value=$.state.directional,nt.directionalLightShadows.value=$.state.directionalShadow,nt.spotLights.value=$.state.spot,nt.spotLightShadows.value=$.state.spotShadow,nt.rectAreaLights.value=$.state.rectArea,nt.ltc_1.value=$.state.rectAreaLTC1,nt.ltc_2.value=$.state.rectAreaLTC2,nt.pointLights.value=$.state.point,nt.pointLightShadows.value=$.state.pointShadow,nt.hemisphereLights.value=$.state.hemi,nt.directionalShadowMap.value=$.state.directionalShadowMap,nt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,nt.spotShadowMap.value=$.state.spotShadowMap,nt.spotLightMatrix.value=$.state.spotLightMatrix,nt.spotLightMap.value=$.state.spotLightMap,nt.pointShadowMap.value=$.state.pointShadowMap,nt.pointShadowMatrix.value=$.state.pointShadowMatrix),ee.currentProgram=et,ee.uniformsList=null,et}function Bc(D){if(D.uniformsList===null){const Y=D.currentProgram.getUniforms();D.uniformsList=fc.seqWithValue(Y.seq,D.uniforms)}return D.uniformsList}function zc(D,Y){const Q=B.get(D);Q.outputColorSpace=Y.outputColorSpace,Q.batching=Y.batching,Q.instancing=Y.instancing,Q.instancingColor=Y.instancingColor,Q.instancingMorph=Y.instancingMorph,Q.skinning=Y.skinning,Q.morphTargets=Y.morphTargets,Q.morphNormals=Y.morphNormals,Q.morphColors=Y.morphColors,Q.morphTargetsCount=Y.morphTargetsCount,Q.numClippingPlanes=Y.numClippingPlanes,Q.numIntersection=Y.numClipIntersection,Q.vertexAlphas=Y.vertexAlphas,Q.vertexTangents=Y.vertexTangents,Q.toneMapping=Y.toneMapping}function ch(D,Y,Q,ee,$){Y.isScene!==!0&&(Y=Xe),w.resetTextureUnits();const Ae=Y.fog,Fe=ee.isMeshStandardMaterial?Y.environment:null,ke=O===null?b.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:_n,Ze=(ee.isMeshStandardMaterial?ae:te).get(ee.envMap||Fe),Je=ee.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,et=!!Q.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),nt=!!Q.morphAttributes.position,jt=!!Q.morphAttributes.normal,wn=!!Q.morphAttributes.color;let en=er;ee.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(en=b.toneMapping);const ai=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Gt=ai!==void 0?ai.length:0,rt=B.get(ee),ma=v.state.lights;if(ie===!0&&(ge===!0||D!==E)){const Nn=D===E&&ee.id===I;Te.setState(ee,D,Nn)}let Bt=!1;ee.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==ma.state.version||rt.outputColorSpace!==ke||$.isBatchedMesh&&rt.batching===!1||!$.isBatchedMesh&&rt.batching===!0||$.isInstancedMesh&&rt.instancing===!1||!$.isInstancedMesh&&rt.instancing===!0||$.isSkinnedMesh&&rt.skinning===!1||!$.isSkinnedMesh&&rt.skinning===!0||$.isInstancedMesh&&rt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&rt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&rt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&rt.instancingMorph===!1&&$.morphTexture!==null||rt.envMap!==Ze||ee.fog===!0&&rt.fog!==Ae||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==Te.numPlanes||rt.numIntersection!==Te.numIntersection)||rt.vertexAlphas!==Je||rt.vertexTangents!==et||rt.morphTargets!==nt||rt.morphNormals!==jt||rt.morphColors!==wn||rt.toneMapping!==en||rt.morphTargetsCount!==Gt)&&(Bt=!0):(Bt=!0,rt.__version=ee.version);let Ki=rt.currentProgram;Bt===!0&&(Ki=vo(ee,Y,$));let ga=!1,Nr=!1,ps=!1;const mn=Ki.getUniforms(),Ri=rt.uniforms;if(He.useProgram(Ki.program)&&(ga=!0,Nr=!0,ps=!0),ee.id!==I&&(I=ee.id,Nr=!0),ga||E!==D){mn.setValue(j,"projectionMatrix",D.projectionMatrix),mn.setValue(j,"viewMatrix",D.matrixWorldInverse);const Nn=mn.map.cameraPosition;Nn!==void 0&&Nn.setValue(j,Ge.setFromMatrixPosition(D.matrixWorld)),bt.logarithmicDepthBuffer&&mn.setValue(j,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&mn.setValue(j,"isOrthographic",D.isOrthographicCamera===!0),E!==D&&(E=D,Nr=!0,ps=!0)}if($.isSkinnedMesh){mn.setOptional(j,$,"bindMatrix"),mn.setOptional(j,$,"bindMatrixInverse");const Nn=$.skeleton;Nn&&(Nn.boneTexture===null&&Nn.computeBoneTexture(),mn.setValue(j,"boneTexture",Nn.boneTexture,w))}$.isBatchedMesh&&(mn.setOptional(j,$,"batchingTexture"),mn.setValue(j,"batchingTexture",$._matricesTexture,w));const Fr=Q.morphAttributes;if((Fr.position!==void 0||Fr.normal!==void 0||Fr.color!==void 0)&&Ie.update($,Q,Ki),(Nr||rt.receiveShadow!==$.receiveShadow)&&(rt.receiveShadow=$.receiveShadow,mn.setValue(j,"receiveShadow",$.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(Ri.envMap.value=Ze,Ri.flipEnvMap.value=Ze.isCubeTexture&&Ze.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&Y.environment!==null&&(Ri.envMapIntensity.value=Y.environmentIntensity),Nr&&(mn.setValue(j,"toneMappingExposure",b.toneMappingExposure),rt.needsLights&&lh(Ri,ps),Ae&&ee.fog===!0&&De.refreshFogUniforms(Ri,Ae),De.refreshMaterialUniforms(Ri,ee,pe,se,v.state.transmissionRenderTarget),fc.upload(j,Bc(rt),Ri,w)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(fc.upload(j,Bc(rt),Ri,w),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&mn.setValue(j,"center",$.center),mn.setValue(j,"modelViewMatrix",$.modelViewMatrix),mn.setValue(j,"normalMatrix",$.normalMatrix),mn.setValue(j,"modelMatrix",$.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const Nn=ee.uniformsGroups;for(let _a=0,kc=Nn.length;_a<kc;_a++){const va=Nn[_a];Mt.update(va,Ki),Mt.bind(va,Ki)}}return Ki}function lh(D,Y){D.ambientLightColor.needsUpdate=Y,D.lightProbe.needsUpdate=Y,D.directionalLights.needsUpdate=Y,D.directionalLightShadows.needsUpdate=Y,D.pointLights.needsUpdate=Y,D.pointLightShadows.needsUpdate=Y,D.spotLights.needsUpdate=Y,D.spotLightShadows.needsUpdate=Y,D.rectAreaLights.needsUpdate=Y,D.hemisphereLights.needsUpdate=Y}function uh(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(D,Y,Q){B.get(D.texture).__webglTexture=Y,B.get(D.depthTexture).__webglTexture=Q;const ee=B.get(D);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=Q===void 0,ee.__autoAllocateDepthBuffer||ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,Y){const Q=B.get(D);Q.__webglFramebuffer=Y,Q.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(D,Y=0,Q=0){O=D,k=Y,U=Q;let ee=!0,$=null,Ae=!1,Fe=!1;if(D){const Ze=B.get(D);Ze.__useDefaultFramebuffer!==void 0?(He.bindFramebuffer(j.FRAMEBUFFER,null),ee=!1):Ze.__webglFramebuffer===void 0?w.setupRenderTarget(D):Ze.__hasExternalTextures&&w.rebindTextures(D,B.get(D.texture).__webglTexture,B.get(D.depthTexture).__webglTexture);const Je=D.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(Fe=!0);const et=B.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(et[Y])?$=et[Y][Q]:$=et[Y],Ae=!0):D.samples>0&&w.useMultisampledRTT(D)===!1?$=B.get(D).__webglMultisampledFramebuffer:Array.isArray(et)?$=et[Q]:$=et,y.copy(D.viewport),F.copy(D.scissor),V=D.scissorTest}else y.copy(me).multiplyScalar(pe).floor(),F.copy(Ee).multiplyScalar(pe).floor(),V=Ke;if(He.bindFramebuffer(j.FRAMEBUFFER,$)&&ee&&He.drawBuffers(D,$),He.viewport(y),He.scissor(F),He.setScissorTest(V),Ae){const Ze=B.get(D.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ze.__webglTexture,Q)}else if(Fe){const Ze=B.get(D.texture),Je=Y||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,Ze.__webglTexture,Q||0,Je)}I=-1},this.readRenderTargetPixels=function(D,Y,Q,ee,$,Ae,Fe){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=B.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Fe!==void 0&&(ke=ke[Fe]),ke){He.bindFramebuffer(j.FRAMEBUFFER,ke);try{const Ze=D.texture,Je=Ze.format,et=Ze.type;if(Je!==_i&&St.convert(Je)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const nt=et===Fa&&(ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float"));if(et!==Mr&&St.convert(et)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_TYPE)&&et!==Oi&&!nt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=D.width-ee&&Q>=0&&Q<=D.height-$&&j.readPixels(Y,Q,ee,$,St.convert(Je),St.convert(et),Ae)}finally{const Ze=O!==null?B.get(O).__webglFramebuffer:null;He.bindFramebuffer(j.FRAMEBUFFER,Ze)}}},this.copyFramebufferToTexture=function(D,Y,Q=0){const ee=Math.pow(2,-Q),$=Math.floor(Y.image.width*ee),Ae=Math.floor(Y.image.height*ee);w.setTexture2D(Y,0),j.copyTexSubImage2D(j.TEXTURE_2D,Q,0,0,D.x,D.y,$,Ae),He.unbindTexture()},this.copyTextureToTexture=function(D,Y,Q,ee=0){const $=Y.image.width,Ae=Y.image.height,Fe=St.convert(Q.format),ke=St.convert(Q.type);w.setTexture2D(Q,0),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,Q.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,Q.unpackAlignment),Y.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,ee,D.x,D.y,$,Ae,Fe,ke,Y.image.data):Y.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,ee,D.x,D.y,Y.mipmaps[0].width,Y.mipmaps[0].height,Fe,Y.mipmaps[0].data):j.texSubImage2D(j.TEXTURE_2D,ee,D.x,D.y,Fe,ke,Y.image),ee===0&&Q.generateMipmaps&&j.generateMipmap(j.TEXTURE_2D),He.unbindTexture()},this.copyTextureToTexture3D=function(D,Y,Q,ee,$=0){const Ae=Math.round(D.max.x-D.min.x),Fe=Math.round(D.max.y-D.min.y),ke=D.max.z-D.min.z+1,Ze=St.convert(ee.format),Je=St.convert(ee.type);let et;if(ee.isData3DTexture)w.setTexture3D(ee,0),et=j.TEXTURE_3D;else if(ee.isDataArrayTexture||ee.isCompressedArrayTexture)w.setTexture2DArray(ee,0),et=j.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,ee.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,ee.unpackAlignment);const nt=j.getParameter(j.UNPACK_ROW_LENGTH),jt=j.getParameter(j.UNPACK_IMAGE_HEIGHT),wn=j.getParameter(j.UNPACK_SKIP_PIXELS),en=j.getParameter(j.UNPACK_SKIP_ROWS),ai=j.getParameter(j.UNPACK_SKIP_IMAGES),Gt=Q.isCompressedTexture?Q.mipmaps[$]:Q.image;j.pixelStorei(j.UNPACK_ROW_LENGTH,Gt.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Gt.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,D.min.x),j.pixelStorei(j.UNPACK_SKIP_ROWS,D.min.y),j.pixelStorei(j.UNPACK_SKIP_IMAGES,D.min.z),Q.isDataTexture||Q.isData3DTexture?j.texSubImage3D(et,$,Y.x,Y.y,Y.z,Ae,Fe,ke,Ze,Je,Gt.data):ee.isCompressedArrayTexture?j.compressedTexSubImage3D(et,$,Y.x,Y.y,Y.z,Ae,Fe,ke,Ze,Gt.data):j.texSubImage3D(et,$,Y.x,Y.y,Y.z,Ae,Fe,ke,Ze,Je,Gt),j.pixelStorei(j.UNPACK_ROW_LENGTH,nt),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,jt),j.pixelStorei(j.UNPACK_SKIP_PIXELS,wn),j.pixelStorei(j.UNPACK_SKIP_ROWS,en),j.pixelStorei(j.UNPACK_SKIP_IMAGES,ai),$===0&&ee.generateMipmaps&&j.generateMipmap(et),He.unbindTexture()},this.initTexture=function(D){D.isCubeTexture?w.setTextureCube(D,0):D.isData3DTexture?w.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?w.setTexture2DArray(D,0):w.setTexture2D(D,0),He.unbindTexture()},this.resetState=function(){k=0,U=0,O=null,He.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ir}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Bl?"display-p3":"srgb",t.unpackColorSpace=Rt.workingColorSpace===Ba?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class $M extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Tp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=zl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=vi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Md("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const On=new N;class Yo{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)On.fromBufferAttribute(this,t),On.applyMatrix4(e),this.setXYZ(t,On.x,On.y,On.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)On.fromBufferAttribute(this,t),On.applyNormalMatrix(e),this.setXYZ(t,On.x,On.y,On.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)On.fromBufferAttribute(this,t),On.transformDirection(e),this.setXYZ(t,On.x,On.y,On.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),o=Pt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new Qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Yo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ap extends ni{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let to;const jo=new N,no=new N,io=new N,ro=new Pe,qo=new Pe,wp=new Qe,dc=new N,Ko=new N,pc=new N,Rp=new Pe,gu=new Pe,Cp=new Pe;class JM extends mt{constructor(e=new Ap){if(super(),this.isSprite=!0,this.type="Sprite",to===void 0){to=new Kt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Tp(t,5);to.setIndex([0,1,2,0,2,3]),to.setAttribute("position",new Yo(n,3,0,!1)),to.setAttribute("uv",new Yo(n,2,3,!1))}this.geometry=to,this.material=e,this.center=new Pe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),no.setFromMatrixScale(this.matrixWorld),wp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),io.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&no.multiplyScalar(-io.z);const n=this.material.rotation;let r,o;n!==0&&(o=Math.cos(n),r=Math.sin(n));const c=this.center;mc(dc.set(-.5,-.5,0),io,c,no,r,o),mc(Ko.set(.5,-.5,0),io,c,no,r,o),mc(pc.set(.5,.5,0),io,c,no,r,o),Rp.set(0,0),gu.set(1,0),Cp.set(1,1);let l=e.ray.intersectTriangle(dc,Ko,pc,!1,jo);if(l===null&&(mc(Ko.set(-.5,.5,0),io,c,no,r,o),gu.set(0,1),l=e.ray.intersectTriangle(dc,pc,Ko,!1,jo),l===null))return;const h=e.ray.origin.distanceTo(jo);h<e.near||h>e.far||t.push({distance:h,point:jo.clone(),uv:Ti.getInterpolation(jo,dc,Ko,pc,Rp,gu,Cp,new Pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function mc(i,e,t,n,r,o){ro.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(qo.x=o*ro.x-r*ro.y,qo.y=r*ro.x+o*ro.y):qo.copy(ro),i.copy(e),i.x+=qo.x,i.y+=qo.y,i.applyMatrix4(wp)}const Pp=new N,Lp=new Dt,Ip=new Dt,QM=new N,Dp=new Qe,gc=new N,_u=new Ni,Op=new Qe,vu=new zs;class eE extends ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Rf,this.bindMatrix=new Qe,this.bindMatrixInverse=new Qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new yi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,gc),this.boundingBox.expandByPoint(gc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ni),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,gc),this.boundingSphere.expandByPoint(gc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_u.copy(this.boundingSphere),_u.applyMatrix4(r),e.ray.intersectsSphere(_u)!==!1&&(Op.copy(r).invert(),vu.copy(e.ray).applyMatrix4(Op),!(this.boundingBox!==null&&vu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,vu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Dt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Rf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===z0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;Lp.fromBufferAttribute(r.attributes.skinIndex,e),Ip.fromBufferAttribute(r.attributes.skinWeight,e),Pp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){const c=Ip.getComponent(o);if(c!==0){const l=Lp.getComponent(o);Dp.multiplyMatrices(n.bones[l].matrixWorld,n.boneInverses[l]),t.addScaledVector(QM.copy(Pp).applyMatrix4(Dp),c)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Up extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Np extends cn{constructor(e=null,t=1,n=1,r,o,c,l,h,f=Pn,d=Pn,p,m){super(null,c,l,h,f,d,r,o,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fp=new Qe,tE=new Qe;class xu{constructor(e=[],t=[]){this.uuid=vi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let o=0,c=e.length;o<c;o++){const l=e[o]?e[o].matrixWorld:tE;Fp.multiplyMatrices(l,t[o]),Fp.toArray(n,o*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new xu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Np(t,e,e,_i,Oi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const o=e.bones[n];let c=t[o];c===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),c=new Up),this.bones.push(c),this.boneInverses.push(new Qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,o=t.length;r<o;r++){const c=t[r];e.bones.push(c.uuid);const l=n[r];e.boneInverses.push(l.toArray())}return e}}class yu extends Qt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const so=new Qe,Bp=new Qe,_c=[],zp=new yi,nE=new Qe,Zo=new ye,$o=new Ni;class iE extends ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yu(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,nE)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,so),zp.copy(e.boundingBox).applyMatrix4(so),this.boundingBox.union(zp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ni),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,so),$o.copy(e.boundingSphere).applyMatrix4(so),this.boundingSphere.union($o)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,o=n.length+1,c=e*o+1;for(let l=0;l<n.length;l++)n[l]=r[c+l]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Zo.geometry=this.geometry,Zo.material=this.material,Zo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$o.copy(this.boundingSphere),$o.applyMatrix4(n),e.ray.intersectsSphere($o)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,so),Bp.multiplyMatrices(n,so),Zo.matrixWorld=Bp,Zo.raycast(e,_c);for(let c=0,l=_c.length;c<l;c++){const h=_c[c];h.instanceId=o,h.object=this,t.push(h)}_c.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new yu(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Np(new Float32Array(r*this.count),r,this.count,Uf,Oi));const o=this.morphTexture.source.data.data;let c=0;for(let f=0;f<n.length;f++)c+=n[f];const l=this.geometry.morphTargetsRelative?1:1-c,h=r*e;o[h]=l,o.set(n,h+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class oo extends ni{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const kp=new N,Hp=new N,Gp=new Qe,Su=new zs,vc=new Ni;class ri extends mt{constructor(e=new Kt,t=new oo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,o=t.count;r<o;r++)kp.fromBufferAttribute(t,r-1),Hp.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=kp.distanceTo(Hp);e.setAttribute("lineDistance",new Ot(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vc.copy(n.boundingSphere),vc.applyMatrix4(r),vc.radius+=o,e.ray.intersectsSphere(vc)===!1)return;Gp.copy(r).invert(),Su.copy(e.ray).applyMatrix4(Gp);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,f=new N,d=new N,p=new N,m=new N,x=this.isLineSegments?2:1,M=n.index,v=n.attributes.position;if(M!==null){const _=Math.max(0,c.start),C=Math.min(M.count,c.start+c.count);for(let b=_,L=C-1;b<L;b+=x){const k=M.getX(b),U=M.getX(b+1);if(f.fromBufferAttribute(v,k),d.fromBufferAttribute(v,U),Su.distanceSqToSegment(f,d,m,p)>h)continue;m.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(m);I<e.near||I>e.far||t.push({distance:I,point:p.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}else{const _=Math.max(0,c.start),C=Math.min(v.count,c.start+c.count);for(let b=_,L=C-1;b<L;b+=x){if(f.fromBufferAttribute(v,b),d.fromBufferAttribute(v,b+1),Su.distanceSqToSegment(f,d,m,p)>h)continue;m.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(m);U<e.near||U>e.far||t.push({distance:U,point:p.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}const Vp=new N,Wp=new N;class Mu extends ri{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,o=t.count;r<o;r+=2)Vp.fromBufferAttribute(t,r),Wp.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Vp.distanceTo(Wp);e.setAttribute("lineDistance",new Ot(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rE extends ri{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Xp extends ni{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Yp=new Qe,Eu=new zs,xc=new Ni,yc=new N;class sE extends mt{constructor(e=new Kt,t=new Xp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,o=e.params.Points.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xc.copy(n.boundingSphere),xc.applyMatrix4(r),xc.radius+=o,e.ray.intersectsSphere(xc)===!1)return;Yp.copy(r).invert(),Eu.copy(e.ray).applyMatrix4(Yp);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,f=n.index,p=n.attributes.position;if(f!==null){const m=Math.max(0,c.start),x=Math.min(f.count,c.start+c.count);for(let M=m,A=x;M<A;M++){const v=f.getX(M);yc.fromBufferAttribute(p,v),jp(yc,v,h,r,e,t,this)}}else{const m=Math.max(0,c.start),x=Math.min(p.count,c.start+c.count);for(let M=m,A=x;M<A;M++)yc.fromBufferAttribute(p,M),jp(yc,M,h,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}function jp(i,e,t,n,r,o,c){const l=Eu.distanceSqToPoint(i);if(l<t){const h=new N;Eu.closestPointToPoint(i,h),h.applyMatrix4(n);const f=r.ray.origin.distanceTo(h);if(f<r.near||f>r.far)return;o.push({distance:f,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,object:c})}}class pn extends Kt{constructor(e=1,t=1,n=1,r=32,o=1,c=!1,l=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:o,openEnded:c,thetaStart:l,thetaLength:h};const f=this;r=Math.floor(r),o=Math.floor(o);const d=[],p=[],m=[],x=[];let M=0;const A=[],v=n/2;let _=0;C(),c===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new Ot(p,3)),this.setAttribute("normal",new Ot(m,3)),this.setAttribute("uv",new Ot(x,2));function C(){const L=new N,k=new N;let U=0;const O=(t-e)/n;for(let I=0;I<=o;I++){const E=[],y=I/o,F=y*(t-e)+e;for(let V=0;V<=r;V++){const G=V/r,q=G*h+l,ne=Math.sin(q),se=Math.cos(q);k.x=F*ne,k.y=-y*n+v,k.z=F*se,p.push(k.x,k.y,k.z),L.set(ne,O,se).normalize(),m.push(L.x,L.y,L.z),x.push(G,1-y),E.push(M++)}A.push(E)}for(let I=0;I<r;I++)for(let E=0;E<o;E++){const y=A[E][I],F=A[E+1][I],V=A[E+1][I+1],G=A[E][I+1];d.push(y,F,G),d.push(F,V,G),U+=6}f.addGroup(_,U,0),_+=U}function b(L){const k=M,U=new Pe,O=new N;let I=0;const E=L===!0?e:t,y=L===!0?1:-1;for(let V=1;V<=r;V++)p.push(0,v*y,0),m.push(0,y,0),x.push(.5,.5),M++;const F=M;for(let V=0;V<=r;V++){const q=V/r*h+l,ne=Math.cos(q),se=Math.sin(q);O.x=E*se,O.y=v*y,O.z=E*ne,p.push(O.x,O.y,O.z),m.push(0,y,0),U.x=ne*.5+.5,U.y=se*.5*y+.5,x.push(U.x,U.y),M++}for(let V=0;V<r;V++){const G=k+V,q=F+V;L===!0?d.push(q,q+1,G):d.push(q+1,q,G),I+=3}f.addGroup(_,I,L===!0?1:2),_+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bu extends pn{constructor(e=1,t=1,n=32,r=1,o=!1,c=0,l=Math.PI*2){super(0,e,t,n,r,o,c,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:c,thetaLength:l}}static fromJSON(e){return new bu(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Tu extends Kt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const o=[],c=[];l(r),f(n),d(),this.setAttribute("position",new Ot(o,3)),this.setAttribute("normal",new Ot(o.slice(),3)),this.setAttribute("uv",new Ot(c,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function l(C){const b=new N,L=new N,k=new N;for(let U=0;U<t.length;U+=3)x(t[U+0],b),x(t[U+1],L),x(t[U+2],k),h(b,L,k,C)}function h(C,b,L,k){const U=k+1,O=[];for(let I=0;I<=U;I++){O[I]=[];const E=C.clone().lerp(L,I/U),y=b.clone().lerp(L,I/U),F=U-I;for(let V=0;V<=F;V++)V===0&&I===U?O[I][V]=E:O[I][V]=E.clone().lerp(y,V/F)}for(let I=0;I<U;I++)for(let E=0;E<2*(U-I)-1;E++){const y=Math.floor(E/2);E%2===0?(m(O[I][y+1]),m(O[I+1][y]),m(O[I][y])):(m(O[I][y+1]),m(O[I+1][y+1]),m(O[I+1][y]))}}function f(C){const b=new N;for(let L=0;L<o.length;L+=3)b.x=o[L+0],b.y=o[L+1],b.z=o[L+2],b.normalize().multiplyScalar(C),o[L+0]=b.x,o[L+1]=b.y,o[L+2]=b.z}function d(){const C=new N;for(let b=0;b<o.length;b+=3){C.x=o[b+0],C.y=o[b+1],C.z=o[b+2];const L=v(C)/2/Math.PI+.5,k=_(C)/Math.PI+.5;c.push(L,1-k)}M(),p()}function p(){for(let C=0;C<c.length;C+=6){const b=c[C+0],L=c[C+2],k=c[C+4],U=Math.max(b,L,k),O=Math.min(b,L,k);U>.9&&O<.1&&(b<.2&&(c[C+0]+=1),L<.2&&(c[C+2]+=1),k<.2&&(c[C+4]+=1))}}function m(C){o.push(C.x,C.y,C.z)}function x(C,b){const L=C*3;b.x=e[L+0],b.y=e[L+1],b.z=e[L+2]}function M(){const C=new N,b=new N,L=new N,k=new N,U=new Pe,O=new Pe,I=new Pe;for(let E=0,y=0;E<o.length;E+=9,y+=6){C.set(o[E+0],o[E+1],o[E+2]),b.set(o[E+3],o[E+4],o[E+5]),L.set(o[E+6],o[E+7],o[E+8]),U.set(c[y+0],c[y+1]),O.set(c[y+2],c[y+3]),I.set(c[y+4],c[y+5]),k.copy(C).add(b).add(L).divideScalar(3);const F=v(k);A(U,y+0,C,F),A(O,y+2,b,F),A(I,y+4,L,F)}}function A(C,b,L,k){k<0&&C.x===1&&(c[b]=C.x-1),L.x===0&&L.z===0&&(c[b]=k/2/Math.PI+.5)}function v(C){return Math.atan2(C.z,-C.x)}function _(C){return Math.atan2(-C.y,Math.sqrt(C.x*C.x+C.z*C.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tu(e.vertices,e.indices,e.radius,e.details)}}class ao extends Tu{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ao(e.radius,e.detail)}}class Jo extends Kt{constructor(e=1,t=32,n=16,r=0,o=Math.PI*2,c=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:o,thetaStart:c,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(c+l,Math.PI);let f=0;const d=[],p=new N,m=new N,x=[],M=[],A=[],v=[];for(let _=0;_<=n;_++){const C=[],b=_/n;let L=0;_===0&&c===0?L=.5/t:_===n&&h===Math.PI&&(L=-.5/t);for(let k=0;k<=t;k++){const U=k/t;p.x=-e*Math.cos(r+U*o)*Math.sin(c+b*l),p.y=e*Math.cos(c+b*l),p.z=e*Math.sin(r+U*o)*Math.sin(c+b*l),M.push(p.x,p.y,p.z),m.copy(p).normalize(),A.push(m.x,m.y,m.z),v.push(U+L,1-b),C.push(f++)}d.push(C)}for(let _=0;_<n;_++)for(let C=0;C<t;C++){const b=d[_][C+1],L=d[_][C],k=d[_+1][C],U=d[_+1][C+1];(_!==0||c>0)&&x.push(b,L,U),(_!==n-1||h<Math.PI)&&x.push(L,k,U)}this.setIndex(x),this.setAttribute("position",new Ot(M,3)),this.setAttribute("normal",new Ot(A,3)),this.setAttribute("uv",new Ot(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class as extends Kt{constructor(e=1,t=.4,n=12,r=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:o},n=Math.floor(n),r=Math.floor(r);const c=[],l=[],h=[],f=[],d=new N,p=new N,m=new N;for(let x=0;x<=n;x++)for(let M=0;M<=r;M++){const A=M/r*o,v=x/n*Math.PI*2;p.x=(e+t*Math.cos(v))*Math.cos(A),p.y=(e+t*Math.cos(v))*Math.sin(A),p.z=t*Math.sin(v),l.push(p.x,p.y,p.z),d.x=e*Math.cos(A),d.y=e*Math.sin(A),m.subVectors(p,d).normalize(),h.push(m.x,m.y,m.z),f.push(M/r),f.push(x/n)}for(let x=1;x<=n;x++)for(let M=1;M<=r;M++){const A=(r+1)*x+M-1,v=(r+1)*(x-1)+M-1,_=(r+1)*(x-1)+M,C=(r+1)*x+M;c.push(A,v,C),c.push(v,_,C)}this.setIndex(c),this.setAttribute("position",new Ot(l,3)),this.setAttribute("normal",new Ot(h,3)),this.setAttribute("uv",new Ot(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class oE extends ni{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ne(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class co extends ni{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=md,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ki extends co{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return vn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class aE extends oo{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Sc(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function cE(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function lE(i){function e(r,o){return i[r]-i[o]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function qp(i,e,t){const n=i.length,r=new i.constructor(n);for(let o=0,c=0;c!==n;++o){const l=t[o]*e;for(let h=0;h!==e;++h)r[c++]=i[l+h]}return r}function Kp(i,e,t,n){let r=1,o=i[0];for(;o!==void 0&&o[n]===void 0;)o=i[r++];if(o===void 0)return;let c=o[n];if(c!==void 0)if(Array.isArray(c))do c=o[n],c!==void 0&&(e.push(o.time),t.push.apply(t,c)),o=i[r++];while(o!==void 0);else if(c.toArray!==void 0)do c=o[n],c!==void 0&&(e.push(o.time),c.toArray(t,t.length)),o=i[r++];while(o!==void 0);else do c=o[n],c!==void 0&&(e.push(o.time),t.push(c)),o=i[r++];while(o!==void 0)}class Qo{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],o=t[n-1];e:{t:{let c;n:{i:if(!(e<r)){for(let l=n+2;;){if(r===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(o=r,r=t[++n],e<r)break t}c=t.length;break n}if(!(e>=o)){const l=t[1];e<l&&(n=2,o=l);for(let h=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(r=o,o=t[--n-1],e>=o)break t}c=n,n=0;break n}break e}for(;n<c;){const l=n+c>>>1;e<t[l]?c=l:n=l+1}if(r=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,r)}return this.interpolate_(n,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r;for(let c=0;c!==r;++c)t[c]=n[o+c];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class uE extends Qo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:hd,endingEnd:hd}}intervalChanged_(e,t,n){const r=this.parameterPositions;let o=e-2,c=e+1,l=r[o],h=r[c];if(l===void 0)switch(this.getSettings_().endingStart){case fd:o=e,l=2*t-n;break;case dd:o=r.length-2,l=t+r[o]-r[o+1];break;default:o=e,l=n}if(h===void 0)switch(this.getSettings_().endingEnd){case fd:c=e,h=2*n-t;break;case dd:c=1,h=n+r[1]-r[0];break;default:c=e-1,h=t}const f=(n-t)*.5,d=this.valueSize;this._weightPrev=f/(t-l),this._weightNext=f/(h-n),this._offsetPrev=o*d,this._offsetNext=c*d}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,f=h-l,d=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,x=this._weightNext,M=(n-t)/(r-t),A=M*M,v=A*M,_=-m*v+2*m*A-m*M,C=(1+m)*v+(-1.5-2*m)*A+(-.5+m)*M+1,b=(-1-x)*v+(1.5+x)*A+.5*M,L=x*v-x*A;for(let k=0;k!==l;++k)o[k]=_*c[d+k]+C*c[f+k]+b*c[h+k]+L*c[p+k];return o}}class hE extends Qo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,f=h-l,d=(n-t)/(r-t),p=1-d;for(let m=0;m!==l;++m)o[m]=c[f+m]*p+c[h+m]*d;return o}}class fE extends Qo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Hi{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Sc(t,this.TimeBufferType),this.values=Sc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Sc(e.times,Array),values:Sc(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new fE(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hE(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uE(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fo:t=this.InterpolantFactoryMethodDiscrete;break;case Ls:t=this.InterpolantFactoryMethodLinear;break;case Nl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fo;case this.InterpolantFactoryMethodLinear:return Ls;case this.InterpolantFactoryMethodSmooth:return Nl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let o=0,c=r-1;for(;o!==r&&n[o]<e;)++o;for(;c!==-1&&n[c]>t;)--c;if(++c,o!==0||c!==r){o>=c&&(c=Math.max(c,1),o=c-1);const l=this.getValueSize();this.times=n.slice(o,c),this.values=this.values.slice(o*l,c*l)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let c=null;for(let l=0;l!==o;l++){const h=n[l];if(typeof h=="number"&&isNaN(h)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,h),e=!1;break}if(c!==null&&c>h){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,h,c),e=!1;break}c=h}if(r!==void 0&&cE(r))for(let l=0,h=r.length;l!==h;++l){const f=r[l];if(isNaN(f)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,f),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Nl,o=e.length-1;let c=1;for(let l=1;l<o;++l){let h=!1;const f=e[l],d=e[l+1];if(f!==d&&(l!==1||f!==e[0]))if(r)h=!0;else{const p=l*n,m=p-n,x=p+n;for(let M=0;M!==n;++M){const A=t[p+M];if(A!==t[m+M]||A!==t[x+M]){h=!0;break}}}if(h){if(l!==c){e[c]=e[l];const p=l*n,m=c*n;for(let x=0;x!==n;++x)t[m+x]=t[p+x]}++c}}if(o>0){e[c]=e[o];for(let l=o*n,h=c*n,f=0;f!==n;++f)t[h+f]=t[l+f];++c}return c!==e.length?(this.times=e.slice(0,c),this.values=t.slice(0,c*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Hi.prototype.TimeBufferType=Float32Array,Hi.prototype.ValueBufferType=Float32Array,Hi.prototype.DefaultInterpolation=Ls;class lo extends Hi{}lo.prototype.ValueTypeName="bool",lo.prototype.ValueBufferType=Array,lo.prototype.DefaultInterpolation=Fo,lo.prototype.InterpolantFactoryMethodLinear=void 0,lo.prototype.InterpolantFactoryMethodSmooth=void 0;class Zp extends Hi{}Zp.prototype.ValueTypeName="color";class uo extends Hi{}uo.prototype.ValueTypeName="number";class dE extends Qo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=(n-t)/(r-t);let f=e*l;for(let d=f+l;f!==d;f+=4)rn.slerpFlat(o,0,c,f-l,c,f,h);return o}}class cs extends Hi{InterpolantFactoryMethodLinear(e){return new dE(this.times,this.values,this.getValueSize(),e)}}cs.prototype.ValueTypeName="quaternion",cs.prototype.DefaultInterpolation=Ls,cs.prototype.InterpolantFactoryMethodSmooth=void 0;class ho extends Hi{}ho.prototype.ValueTypeName="string",ho.prototype.ValueBufferType=Array,ho.prototype.DefaultInterpolation=Fo,ho.prototype.InterpolantFactoryMethodLinear=void 0,ho.prototype.InterpolantFactoryMethodSmooth=void 0;class fo extends Hi{}fo.prototype.ValueTypeName="vector";class pE{constructor(e="",t=-1,n=[],r=K0){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=vi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let c=0,l=n.length;c!==l;++c)t.push(gE(n[c]).scale(r));const o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,c=n.length;o!==c;++o)t.push(Hi.toJSON(n[o]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const o=t.length,c=[];for(let l=0;l<o;l++){let h=[],f=[];h.push((l+o-1)%o,l,(l+1)%o),f.push(0,1,0);const d=lE(h);h=qp(h,1,d),f=qp(f,1,d),!r&&h[0]===0&&(h.push(o),f.push(f[0])),c.push(new uo(".morphTargetInfluences["+t[l].name+"]",h,f).scale(1/n))}return new this(e,-1,c)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},o=/^([\w-]*?)([\d]+)$/;for(let l=0,h=e.length;l<h;l++){const f=e[l],d=f.name.match(o);if(d&&d.length>1){const p=d[1];let m=r[p];m||(r[p]=m=[]),m.push(f)}}const c=[];for(const l in r)c.push(this.CreateFromMorphTargetSequence(l,r[l],t,n));return c}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(p,m,x,M,A){if(x.length!==0){const v=[],_=[];Kp(x,v,_,M),v.length!==0&&A.push(new p(m,v,_))}},r=[],o=e.name||"default",c=e.fps||30,l=e.blendMode;let h=e.length||-1;const f=e.hierarchy||[];for(let p=0;p<f.length;p++){const m=f[p].keys;if(!(!m||m.length===0))if(m[0].morphTargets){const x={};let M;for(M=0;M<m.length;M++)if(m[M].morphTargets)for(let A=0;A<m[M].morphTargets.length;A++)x[m[M].morphTargets[A]]=-1;for(const A in x){const v=[],_=[];for(let C=0;C!==m[M].morphTargets.length;++C){const b=m[M];v.push(b.time),_.push(b.morphTarget===A?1:0)}r.push(new uo(".morphTargetInfluence["+A+"]",v,_))}h=x.length*c}else{const x=".bones["+t[p].name+"]";n(fo,x+".position",m,"pos",r),n(cs,x+".quaternion",m,"rot",r),n(fo,x+".scale",m,"scl",r)}}return r.length===0?null:new this(o,h,r,l)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function mE(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return uo;case"vector":case"vector2":case"vector3":case"vector4":return fo;case"color":return Zp;case"quaternion":return cs;case"bool":case"boolean":return lo;case"string":return ho}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function gE(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=mE(i.type);if(i.times===void 0){const t=[],n=[];Kp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Lr={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class _E{constructor(e,t,n){const r=this;let o=!1,c=0,l=0,h;const f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){l++,o===!1&&r.onStart!==void 0&&r.onStart(d,c,l),o=!0},this.itemEnd=function(d){c++,r.onProgress!==void 0&&r.onProgress(d,c,l),c===l&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return h?h(d):d},this.setURLModifier=function(d){return h=d,this},this.addHandler=function(d,p){return f.push(d,p),this},this.removeHandler=function(d){const p=f.indexOf(d);return p!==-1&&f.splice(p,2),this},this.getHandler=function(d){for(let p=0,m=f.length;p<m;p+=2){const x=f[p],M=f[p+1];if(x.global&&(x.lastIndex=0),x.test(d))return M}return null}}}const vE=new _E;let ls=class{constructor(e){this.manager=e!==void 0?e:vE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,o){n.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ls.DEFAULT_MATERIAL_NAME="__DEFAULT";const lr={};class xE extends Error{constructor(e,t){super(e),this.response=t}}class Mc extends ls{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=Lr.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(lr[e]!==void 0){lr[e].push({onLoad:t,onProgress:n,onError:r});return}lr[e]=[],lr[e].push({onLoad:t,onProgress:n,onError:r});const c=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,h=this.responseType;fetch(c).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||f.body===void 0||f.body.getReader===void 0)return f;const d=lr[e],p=f.body.getReader(),m=f.headers.get("Content-Length")||f.headers.get("X-File-Size"),x=m?parseInt(m):0,M=x!==0;let A=0;const v=new ReadableStream({start(_){C();function C(){p.read().then(({done:b,value:L})=>{if(b)_.close();else{A+=L.byteLength;const k=new ProgressEvent("progress",{lengthComputable:M,loaded:A,total:x});for(let U=0,O=d.length;U<O;U++){const I=d[U];I.onProgress&&I.onProgress(k)}_.enqueue(L),C()}})}}});return new Response(v)}else throw new xE(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(h){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(d=>new DOMParser().parseFromString(d,l));case"json":return f.json();default:if(l===void 0)return f.text();{const p=/charset="?([^;"\s]*)"?/i.exec(l),m=p&&p[1]?p[1].toLowerCase():void 0,x=new TextDecoder(m);return f.arrayBuffer().then(M=>x.decode(M))}}}).then(f=>{Lr.add(e,f);const d=lr[e];delete lr[e];for(let p=0,m=d.length;p<m;p++){const x=d[p];x.onLoad&&x.onLoad(f)}}).catch(f=>{const d=lr[e];if(d===void 0)throw this.manager.itemError(e),f;delete lr[e];for(let p=0,m=d.length;p<m;p++){const x=d[p];x.onError&&x.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class yE extends ls{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,c=Lr.get(e);if(c!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(c),o.manager.itemEnd(e)},0),c;const l=ko("img");function h(){d(),Lr.add(e,this),t&&t(this),o.manager.itemEnd(e)}function f(p){d(),r&&r(p),o.manager.itemError(e),o.manager.itemEnd(e)}function d(){l.removeEventListener("load",h,!1),l.removeEventListener("error",f,!1)}return l.addEventListener("load",h,!1),l.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),o.manager.itemStart(e),l.src=e,l}}class $p extends ls{constructor(e){super(e)}load(e,t,n,r){const o=new cn,c=new yE(this.manager);return c.setCrossOrigin(this.crossOrigin),c.setPath(this.path),c.load(e,function(l){o.image=l,o.needsUpdate=!0,t!==void 0&&t(o)},n,r),o}}class po extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class SE extends po{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Au=new Qe,Jp=new N,Qp=new N;class wu{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ou,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Jp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jp),Qp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qp),t.updateMatrixWorld(),Au.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Au),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Au)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ME extends wu{constructor(){super(new Dn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ds*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,o=e.distance||t.far;(n!==t.fov||r!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=r,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class EE extends po{constructor(e,t,n=0,r=Math.PI/3,o=0,c=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=r,this.penumbra=o,this.decay=c,this.map=null,this.shadow=new ME}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const em=new Qe,ea=new N,Ru=new N;class bE extends wu{constructor(){super(new Dn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new Dt(2,1,1,1),new Dt(0,1,1,1),new Dt(3,1,1,1),new Dt(1,1,1,1),new Dt(3,0,1,1),new Dt(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),ea.setFromMatrixPosition(e.matrixWorld),n.position.copy(ea),Ru.copy(n.position),Ru.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ru),n.updateMatrixWorld(),r.makeTranslation(-ea.x,-ea.y,-ea.z),em.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(em)}}class tm extends po{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new bE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class TE extends wu{constructor(){super(new lc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cu extends po{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new TE}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class AE extends po{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class wE{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new N)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,r=e.y,o=e.z,c=this.coefficients;return t.copy(c[0]).multiplyScalar(.282095),t.addScaledVector(c[1],.488603*r),t.addScaledVector(c[2],.488603*o),t.addScaledVector(c[3],.488603*n),t.addScaledVector(c[4],1.092548*(n*r)),t.addScaledVector(c[5],1.092548*(r*o)),t.addScaledVector(c[6],.315392*(3*o*o-1)),t.addScaledVector(c[7],1.092548*(n*o)),t.addScaledVector(c[8],.546274*(n*n-r*r)),t}getIrradianceAt(e,t){const n=e.x,r=e.y,o=e.z,c=this.coefficients;return t.copy(c[0]).multiplyScalar(.886227),t.addScaledVector(c[1],1.023328*r),t.addScaledVector(c[2],1.023328*o),t.addScaledVector(c[3],1.023328*n),t.addScaledVector(c[4],.858086*n*r),t.addScaledVector(c[5],.858086*r*o),t.addScaledVector(c[6],.743125*o*o-.247708),t.addScaledVector(c[7],.858086*n*o),t.addScaledVector(c[8],.429043*(n*n-r*r)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let r=0;r<9;r++)n[r].fromArray(e,t+r*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let r=0;r<9;r++)n[r].toArray(e,t+r*3);return e}static getBasisAt(e,t){const n=e.x,r=e.y,o=e.z;t[0]=.282095,t[1]=.488603*r,t[2]=.488603*o,t[3]=.488603*n,t[4]=1.092548*n*r,t[5]=1.092548*r*o,t[6]=.315392*(3*o*o-1),t[7]=1.092548*n*o,t[8]=.546274*(n*n-r*r)}}class RE extends po{constructor(e=new wE,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class ta{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class CE extends ls{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,c=Lr.get(e);if(c!==void 0){if(o.manager.itemStart(e),c.then){c.then(f=>{t&&t(f),o.manager.itemEnd(e)}).catch(f=>{r&&r(f)});return}return setTimeout(function(){t&&t(c),o.manager.itemEnd(e)},0),c}const l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader;const h=fetch(e,l).then(function(f){return f.blob()}).then(function(f){return createImageBitmap(f,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(f){return Lr.add(e,f),t&&t(f),o.manager.itemEnd(e),f}).catch(function(f){r&&r(f),Lr.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});Lr.add(e,h),o.manager.itemStart(e)}}const Pu="\\[\\]\\.:\\/",PE=new RegExp("["+Pu+"]","g"),Lu="[^"+Pu+"]",LE="[^"+Pu.replace("\\.","")+"]",IE=/((?:WC+[\/:])*)/.source.replace("WC",Lu),DE=/(WCOD+)?/.source.replace("WCOD",LE),OE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lu),UE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lu),NE=new RegExp("^"+IE+DE+OE+UE+"$"),FE=["material","materials","bones","map"];class BE{constructor(e,t,n){const r=n||Lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=n.length;r!==o;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Lt{constructor(e,t,n){this.path=t,this.parsedPath=n||Lt.parseTrackName(t),this.node=Lt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Lt.Composite(e,t,n):new Lt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(PE,"")}static parseTrackName(e){const t=NE.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const o=n.nodeName.substring(r+1);FE.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(o){for(let c=0;c<o.length;c++){const l=o[c];if(l.name===t||l.uuid===t)return l;const h=n(l.children);if(h)return h}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let o=t.propertyIndex;if(e||(e=Lt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let f=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===f){f=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(f!==void 0){if(e[f]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[f]}}const c=e[r];if(c===void 0){const f=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+f+"."+r+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}h=this.BindingType.ArrayElement,this.resolvedProperty=c,this.propertyIndex=o}else c.fromArray!==void 0&&c.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=c):Array.isArray(c)?(h=this.BindingType.EntireArray,this.resolvedProperty=c):this.propertyName=r;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Lt.Composite=BE,Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray],Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const nm=new Qe;class Ec{constructor(e,t,n=0,r=1/0){this.ray=new zs(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Zl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return nm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(nm),this}intersectObject(e,t=!0,n=[]){return Iu(e,this,n,t),n.sort(im),n}intersectObjects(e,t=!0,n=[]){for(let r=0,o=e.length;r<o;r++)Iu(e[r],this,n,t);return n.sort(im),n}}function im(i,e){return i.distance-e.distance}function Iu(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let o=0,c=r.length;o<c;o++)Iu(r[o],e,t,!0)}}class rm{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(vn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class zE extends Mu{constructor(e=10,t=10,n=4473924,r=8947848){n=new Ne(n),r=new Ne(r);const o=t/2,c=e/t,l=e/2,h=[],f=[];for(let m=0,x=0,M=-l;m<=t;m++,M+=c){h.push(-l,0,M,l,0,M),h.push(M,0,-l,M,0,l);const A=m===o?n:r;A.toArray(f,x),x+=3,A.toArray(f,x),x+=3,A.toArray(f,x),x+=3,A.toArray(f,x),x+=3}const d=new Kt;d.setAttribute("position",new Ot(h,3)),d.setAttribute("color",new Ot(f,3));const p=new oo({vertexColors:!0,toneMapped:!1});super(d,p),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class kE extends Mu{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Kt;r.setAttribute("position",new Ot(t,3)),r.setAttribute("color",new Ot(n,3));const o=new oo({vertexColors:!0,toneMapped:!1});super(r,o),this.type="AxesHelper"}setColors(e,t,n){const r=new Ne,o=this.geometry.attributes.color.array;return r.set(e),r.toArray(o,0),r.toArray(o,3),r.set(t),r.toArray(o,6),r.toArray(o,9),r.set(n),r.toArray(o,12),r.toArray(o,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Al}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Al);const us={antialias:!0,alpha:!0,stencil:!1,shadowMapEnabled:!0,shadowMapType:Ef,toneMapping:er,canvas:void 0};class sm extends ZM{paused=!1;running=!1;force=!1;preRenderCallbacks=new Map;postRenderCallbacks=new Map;constructor(e=us){super({antialias:e.antialias||us.antialias,alpha:e.alpha||us.alpha,preserveDrawingBuffer:!0,canvas:e.canvas}),this.setPixelRatio(window.devicePixelRatio),this.shadowMap.enabled=e.shadowMapEnabled||us.shadowMapEnabled,this.shadowMap.type=e.shadowMapType||us.shadowMapType,this.toneMapping=e.toneMapping||us.toneMapping,this.debug.checkShaderErrors=!1}Dispose(){this.StopRenderer(),this.dispose()}StartRenderer(e,t){this.setAnimationLoop((n,r)=>{this.internal_render(e,t,n,r)}),this.running=!0}PauseRenderer(){this.paused=!0}ResumeRenderer(){this.paused=!1}StopRenderer(){this.setAnimationLoop(null),this.running=!1}OnResize(e,t){this.setSize(e,t)}AddPreRenderCallback(e){const t=Ui.generateUUID();return this.preRenderCallbacks.set(t,e),t}RemovePreRenderCallback(e){return this.preRenderCallbacks.has(e)?(this.preRenderCallbacks.delete(e),!0):!1}AddPostRenderCallback(e){const t=Ui.generateUUID();return this.postRenderCallbacks.set(t,e),t}RemovePostRenderCallback(e){return this.postRenderCallbacks.has(e)?(this.postRenderCallbacks.delete(e),!0):!1}ForceRendering(){this.force=!0}internal_render(e,t,n,r){(this.paused||!this.running)&&!this.force||(this.preRenderCallbacks.forEach(o=>{o(n,r)}),this.render(e,t),this.postRenderCallbacks.forEach(o=>{o(n,r)}),this.force=!1)}}const HE=1,na=2,Du=4,om=8,qn=16;class GE extends mt{isDIVELight=!0;isDIVEAmbientLight=!0;_light;constructor(){super(),this.name="DIVEAmbientLight",this._light=new AE(16777215,1),this._light.layers.mask=qn,this.add(this._light)}SetColor(e){this._light.color=e}SetIntensity(e){this._light.intensity=e}SetEnabled(e){this._light.visible=e}}const En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];function VE(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(En[i&255]+En[i>>8&255]+En[i>>16&255]+En[i>>24&255]+"-"+En[e&255]+En[e>>8&255]+"-"+En[e>>16&15|64]+En[e>>24&255]+"-"+En[t&63|128]+En[t>>8&255]+"-"+En[t>>16&255]+En[t>>24&255]+En[n&255]+En[n>>8&255]+En[n>>16&255]+En[n>>24&255]).toLowerCase()}function bc(i,e){return i?e in i:!1}function Tc(i,e){if(i)return bc(i,e)?i:Tc(i.parent,e)}class WE{POINTER_DRAG_THRESHOLD=.001;name;_canvas;_scene;_controller;_pointer;get _pointerAnyDown(){return this._pointerPrimaryDown||this._pointerMiddleDown||this._pointerSecondaryDown}_pointerPrimaryDown;_pointerMiddleDown;_pointerSecondaryDown;_lastPointerDown;_lastPointerUp;_raycaster;_intersects;_hovered;_dragging;_dragStart;_dragCurrent;_dragEnd;_dragDelta;_draggable;_dragRaycastOnObjects;constructor(e,t){this.name="BaseTool",this._canvas=t.domElement,this._scene=e,this._controller=t,this._pointer=new Pe,this._pointerPrimaryDown=!1,this._pointerMiddleDown=!1,this._pointerSecondaryDown=!1,this._lastPointerDown=new Pe,this._lastPointerUp=new Pe,this._raycaster=new Ec,this._raycaster.layers.mask=qn|Du,this._intersects=[],this._hovered=null,this._dragging=!1,this._dragStart=new N,this._dragCurrent=new N,this._dragEnd=new N,this._dragDelta=new N,this._draggable=null,this._dragRaycastOnObjects=null}Activate(){}Deactivate(){}onPointerDown(e){switch(e.button){case 0:{this._pointerPrimaryDown=!0;break}case 1:{this._pointerMiddleDown=!0;break}case 2:{this._pointerSecondaryDown=!0;break}default:console.warn("DIVEBaseTool.onPointerDown: Unknown button: "+e.button)}this._lastPointerDown.copy(this._pointer),this._draggable=Tc(this._intersects[0]?.object,"isDraggable")||null}onDragStart(e){this._draggable&&(this._dragRaycastOnObjects!==null&&(this._intersects=this._raycaster.intersectObjects(this._dragRaycastOnObjects,!0)),this._intersects.length!==0&&(this._dragStart.copy(this._intersects[0].point.clone()),this._dragCurrent.copy(this._intersects[0].point.clone()),this._dragEnd.copy(this._dragStart.clone()),this._dragDelta.set(0,0,0),this._draggable&&this._draggable.onDragStart&&(this._draggable.onDragStart({dragStart:this._dragStart,dragCurrent:this._dragCurrent,dragEnd:this._dragEnd,dragDelta:this._dragDelta}),this._dragging=!0,this._controller.enabled=!1)))}onPointerMove(e){this._pointer.x=e.offsetX/this._canvas.clientWidth*2-1,this._pointer.y=-(e.offsetY/this._canvas.clientHeight)*2+1,this._raycaster.setFromCamera(this._pointer,this._controller.object),this._intersects=this.raycast(this._scene.children);const t=Tc(this._intersects[0]?.object,"isHoverable");if(this._intersects[0]&&t){if(!this._hovered){t.onPointerEnter&&t.onPointerEnter(this._intersects[0]),this._hovered=t;return}if(this._hovered.uuid!==t.uuid){this._hovered.onPointerLeave&&this._hovered.onPointerLeave(),t.onPointerEnter&&t.onPointerEnter(this._intersects[0]),this._hovered=t;return}t.onPointerOver&&t.onPointerOver(this._intersects[0]),this._hovered=t}else this._hovered&&this._hovered.onPointerLeave&&this._hovered.onPointerLeave(),this._hovered=null;this._pointerAnyDown&&(this._dragging||this.onDragStart(e),this.onDrag(e))}onDrag(e){this._dragRaycastOnObjects!==null&&(this._intersects=this._raycaster.intersectObjects(this._dragRaycastOnObjects,!0));const t=this._intersects[0];t&&(this._dragCurrent.copy(t.point.clone()),this._dragEnd.copy(t.point.clone()),this._dragDelta.subVectors(this._dragCurrent.clone(),this._dragStart.clone()),this._draggable&&this._draggable.onDrag&&this._draggable.onDrag({dragStart:this._dragStart,dragCurrent:this._dragCurrent,dragEnd:this._dragEnd,dragDelta:this._dragDelta}))}onPointerUp(e){switch(this.pointerWasDragged()||this._dragging?this._draggable&&this.onDragEnd(e):this.onClick(e),e.button){case 0:this._pointerPrimaryDown=!1;break;case 1:this._pointerMiddleDown=!1;break;case 2:this._pointerSecondaryDown=!1;break}this._lastPointerUp.copy(this._pointer)}onClick(e){}onDragEnd(e){const t=this._intersects[0];t&&(this._dragEnd.copy(t.point.clone()),this._dragCurrent.copy(t.point.clone()),this._dragDelta.subVectors(this._dragCurrent.clone(),this._dragStart.clone())),this._draggable&&this._draggable.onDragEnd&&this._draggable.onDragEnd({dragStart:this._dragStart,dragCurrent:this._dragCurrent,dragEnd:this._dragEnd,dragDelta:this._dragDelta}),this._draggable=null,this._dragging=!1,this._dragStart.set(0,0,0),this._dragCurrent.set(0,0,0),this._dragEnd.set(0,0,0),this._dragDelta.set(0,0,0),this._controller.enabled=!0}onWheel(e){}raycast(e){return e!==void 0?this._raycaster.intersectObjects(e,!0).filter(t=>t.object.visible):this._raycaster.intersectObjects(this._scene.children,!0).filter(t=>t.object.visible)}pointerWasDragged(){return this._lastPointerDown.distanceTo(this._pointer)>this.POINTER_DRAG_THRESHOLD}}const hs=new Ec,bn=new N,Ir=new N,Wt=new rn,am={X:new N(1,0,0),Y:new N(0,1,0),Z:new N(0,0,1)},Ou={type:"change"},cm={type:"mouseDown"},lm={type:"mouseUp",mode:null},um={type:"objectChange"};class XE extends mt{constructor(e,t){super(),t===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),t=document),this.isTransformControls=!0,this.visible=!1,this.domElement=t,this.domElement.style.touchAction="none";const n=new $E;this._gizmo=n,this.add(n);const r=new JE;this._plane=r,this.add(r);const o=this;function c(C,b){let L=b;Object.defineProperty(o,C,{get:function(){return L!==void 0?L:b},set:function(k){L!==k&&(L=k,r[C]=k,n[C]=k,o.dispatchEvent({type:C+"-changed",value:k}),o.dispatchEvent(Ou))}}),o[C]=b,r[C]=b,n[C]=b}c("camera",e),c("object",void 0),c("enabled",!0),c("axis",null),c("mode","translate"),c("translationSnap",null),c("rotationSnap",null),c("scaleSnap",null),c("space","world"),c("size",1),c("dragging",!1),c("showX",!0),c("showY",!0),c("showZ",!0);const l=new N,h=new N,f=new rn,d=new rn,p=new N,m=new rn,x=new N,M=new N,A=new N,v=0,_=new N;c("worldPosition",l),c("worldPositionStart",h),c("worldQuaternion",f),c("worldQuaternionStart",d),c("cameraPosition",p),c("cameraQuaternion",m),c("pointStart",x),c("pointEnd",M),c("rotationAxis",A),c("rotationAngle",v),c("eye",_),this._offset=new N,this._startNorm=new N,this._endNorm=new N,this._cameraScale=new N,this._parentPosition=new N,this._parentQuaternion=new rn,this._parentQuaternionInv=new rn,this._parentScale=new N,this._worldScaleStart=new N,this._worldQuaternionInv=new rn,this._worldScale=new N,this._positionStart=new N,this._quaternionStart=new rn,this._scaleStart=new N,this._getPointer=YE.bind(this),this._onPointerDown=qE.bind(this),this._onPointerHover=jE.bind(this),this._onPointerMove=KE.bind(this),this._onPointerUp=ZE.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(e){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(e)}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&hs.setFromCamera(e,this.camera);const t=Uu(this._gizmo.picker[this.mode],hs);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&hs.setFromCamera(e,this.camera);const t=Uu(this._plane,hs,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,cm.mode=this.mode,this.dispatchEvent(cm)}}pointerMove(e){const t=this.axis,n=this.mode,r=this.object;let o=this.space;if(n==="scale"?o="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(o="world"),r===void 0||t===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&hs.setFromCamera(e,this.camera);const c=Uu(this._plane,hs,!0);if(c){if(this.pointEnd.copy(c.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),o==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),o==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(o==="local"&&(r.position.applyQuaternion(Wt.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),o==="world"&&(r.parent&&r.position.add(bn.setFromMatrixPosition(r.parent.matrixWorld)),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(bn.setFromMatrixPosition(r.parent.matrixWorld))));else if(n==="scale"){if(t.search("XYZ")!==-1){let l=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(l*=-1),Ir.set(l,l,l)}else bn.copy(this.pointStart),Ir.copy(this.pointEnd),bn.applyQuaternion(this._worldQuaternionInv),Ir.applyQuaternion(this._worldQuaternionInv),Ir.divide(bn),t.search("X")===-1&&(Ir.x=1),t.search("Y")===-1&&(Ir.y=1),t.search("Z")===-1&&(Ir.z=1);r.scale.copy(this._scaleStart).multiply(Ir),this.scaleSnap&&(t.search("X")!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const l=20/this.worldPosition.distanceTo(bn.setFromMatrixPosition(this.camera.matrixWorld));let h=!1;t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(bn.copy(this.rotationAxis).cross(this.eye))*l):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(am[t]),bn.copy(am[t]),o==="local"&&bn.applyQuaternion(this.worldQuaternion),bn.cross(this.eye),bn.length()===0?h=!0:this.rotationAngle=this._offset.dot(bn.normalize())*l),(t==="E"||h)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),o==="local"&&t!=="E"&&t!=="XYZE"?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(Wt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(Wt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Ou),this.dispatchEvent(um)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(lm.mode=this.mode,this.dispatchEvent(lm)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}attach(e){return this.object=e,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Ou),this.dispatchEvent(um),this.pointStart.copy(this.pointEnd))}getRaycaster(){return hs}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function YE(i){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:i.button};{const e=this.domElement.getBoundingClientRect();return{x:(i.clientX-e.left)/e.width*2-1,y:-(i.clientY-e.top)/e.height*2+1,button:i.button}}}function jE(i){if(this.enabled)switch(i.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(i));break}}function qE(i){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(i)),this.pointerDown(this._getPointer(i)))}function KE(i){this.enabled&&this.pointerMove(this._getPointer(i))}function ZE(i){this.enabled&&(this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(i)))}function Uu(i,e,t){const n=e.intersectObject(i,!0);for(let r=0;r<n.length;r++)if(n[r].object.visible||t)return n[r];return!1}const Ac=new Ei,Ut=new N(0,1,0),hm=new N(0,0,0),fm=new Qe,wc=new rn,Rc=new rn,Gi=new N,dm=new Qe,ia=new N(1,0,0),fs=new N(0,1,0),ra=new N(0,0,1),Cc=new N,sa=new N,oa=new N;class $E extends mt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new Fi({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new oo({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;const r=t.clone();r.opacity=.5;const o=e.clone();o.color.setHex(16711680);const c=e.clone();c.color.setHex(65280);const l=e.clone();l.color.setHex(255);const h=e.clone();h.color.setHex(16711680),h.opacity=.5;const f=e.clone();f.color.setHex(65280),f.opacity=.5;const d=e.clone();d.color.setHex(255),d.opacity=.5;const p=e.clone();p.opacity=.25;const m=e.clone();m.color.setHex(16776960),m.opacity=.25,e.clone().color.setHex(16776960);const M=e.clone();M.color.setHex(7895160);const A=new pn(0,.04,.1,12);A.translate(0,.05,0);const v=new Yt(.08,.08,.08);v.translate(0,.04,0);const _=new Kt;_.setAttribute("position",new Ot([0,0,0,1,0,0],3));const C=new pn(.0075,.0075,.5,3);C.translate(0,.25,0);function b(ne,se){const pe=new as(ne,.0075,3,64,se*Math.PI*2);return pe.rotateY(Math.PI/2),pe.rotateX(Math.PI/2),pe}function L(){const ne=new Kt;return ne.setAttribute("position",new Ot([0,0,0,1,1,1],3)),ne}const k={X:[[new ye(A,o),[.5,0,0],[0,0,-Math.PI/2]],[new ye(A,o),[-.5,0,0],[0,0,Math.PI/2]],[new ye(C,o),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new ye(A,c),[0,.5,0]],[new ye(A,c),[0,-.5,0],[Math.PI,0,0]],[new ye(C,c)]],Z:[[new ye(A,l),[0,0,.5],[Math.PI/2,0,0]],[new ye(A,l),[0,0,-.5],[-Math.PI/2,0,0]],[new ye(C,l),null,[Math.PI/2,0,0]]],XYZ:[[new ye(new ao(.1,0),p.clone()),[0,0,0]]],XY:[[new ye(new Yt(.15,.15,.01),d.clone()),[.15,.15,0]]],YZ:[[new ye(new Yt(.15,.15,.01),h.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ye(new Yt(.15,.15,.01),f.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},U={X:[[new ye(new pn(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new ye(new pn(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ye(new pn(.2,0,.6,4),n),[0,.3,0]],[new ye(new pn(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ye(new pn(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new ye(new pn(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new ye(new ao(.2,0),n)]],XY:[[new ye(new Yt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new ye(new Yt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ye(new Yt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},O={START:[[new ye(new ao(.01,2),r),null,null,null,"helper"]],END:[[new ye(new ao(.01,2),r),null,null,null,"helper"]],DELTA:[[new ri(L(),r),null,null,null,"helper"]],X:[[new ri(_,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new ri(_,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new ri(_,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},I={XYZE:[[new ye(b(.5,1),M),null,[0,Math.PI/2,0]]],X:[[new ye(b(.5,.5),o)]],Y:[[new ye(b(.5,.5),c),null,[0,0,-Math.PI/2]]],Z:[[new ye(b(.5,.5),l),null,[0,Math.PI/2,0]]],E:[[new ye(b(.75,1),m),null,[0,Math.PI/2,0]]]},E={AXIS:[[new ri(_,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},y={XYZE:[[new ye(new Jo(.25,10,8),n)]],X:[[new ye(new as(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new ye(new as(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new ye(new as(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new ye(new as(.75,.1,2,24),n)]]},F={X:[[new ye(v,o),[.5,0,0],[0,0,-Math.PI/2]],[new ye(C,o),[0,0,0],[0,0,-Math.PI/2]],[new ye(v,o),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new ye(v,c),[0,.5,0]],[new ye(C,c)],[new ye(v,c),[0,-.5,0],[0,0,Math.PI]]],Z:[[new ye(v,l),[0,0,.5],[Math.PI/2,0,0]],[new ye(C,l),[0,0,0],[Math.PI/2,0,0]],[new ye(v,l),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new ye(new Yt(.15,.15,.01),d),[.15,.15,0]]],YZ:[[new ye(new Yt(.15,.15,.01),h),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ye(new Yt(.15,.15,.01),f),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ye(new Yt(.1,.1,.1),p.clone())]]},V={X:[[new ye(new pn(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new ye(new pn(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ye(new pn(.2,0,.6,4),n),[0,.3,0]],[new ye(new pn(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ye(new pn(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new ye(new pn(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new ye(new Yt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new ye(new Yt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ye(new Yt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ye(new Yt(.2,.2,.2),n),[0,0,0]]]},G={X:[[new ri(_,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new ri(_,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new ri(_,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function q(ne){const se=new mt;for(const pe in ne)for(let K=ne[pe].length;K--;){const he=ne[pe][K][0].clone(),me=ne[pe][K][1],Ee=ne[pe][K][2],Ke=ne[pe][K][3],ct=ne[pe][K][4];he.name=pe,he.tag=ct,me&&he.position.set(me[0],me[1],me[2]),Ee&&he.rotation.set(Ee[0],Ee[1],Ee[2]),Ke&&he.scale.set(Ke[0],Ke[1],Ke[2]),he.updateMatrix();const ie=he.geometry.clone();ie.applyMatrix4(he.matrix),he.geometry=ie,he.renderOrder=1/0,he.position.set(0,0,0),he.rotation.set(0,0,0),he.scale.set(1,1,1),se.add(he)}return se}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=q(k)),this.add(this.gizmo.rotate=q(I)),this.add(this.gizmo.scale=q(F)),this.add(this.picker.translate=q(U)),this.add(this.picker.rotate=q(y)),this.add(this.picker.scale=q(V)),this.add(this.helper.translate=q(O)),this.add(this.helper.rotate=q(E)),this.add(this.helper.scale=q(G)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:Rc;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let r=[];r=r.concat(this.picker[this.mode].children),r=r.concat(this.gizmo[this.mode].children),r=r.concat(this.helper[this.mode].children);for(let o=0;o<r.length;o++){const c=r[o];c.visible=!0,c.rotation.set(0,0,0),c.position.copy(this.worldPosition);let l;if(this.camera.isOrthographicCamera?l=(this.camera.top-this.camera.bottom)/this.camera.zoom:l=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),c.scale.set(1,1,1).multiplyScalar(l*this.size/4),c.tag==="helper"){c.visible=!1,c.name==="AXIS"?(c.visible=!!this.axis,this.axis==="X"&&(Wt.setFromEuler(Ac.set(0,0,0)),c.quaternion.copy(n).multiply(Wt),Math.abs(Ut.copy(ia).applyQuaternion(n).dot(this.eye))>.9&&(c.visible=!1)),this.axis==="Y"&&(Wt.setFromEuler(Ac.set(0,0,Math.PI/2)),c.quaternion.copy(n).multiply(Wt),Math.abs(Ut.copy(fs).applyQuaternion(n).dot(this.eye))>.9&&(c.visible=!1)),this.axis==="Z"&&(Wt.setFromEuler(Ac.set(0,Math.PI/2,0)),c.quaternion.copy(n).multiply(Wt),Math.abs(Ut.copy(ra).applyQuaternion(n).dot(this.eye))>.9&&(c.visible=!1)),this.axis==="XYZE"&&(Wt.setFromEuler(Ac.set(0,Math.PI/2,0)),Ut.copy(this.rotationAxis),c.quaternion.setFromRotationMatrix(fm.lookAt(hm,Ut,fs)),c.quaternion.multiply(Wt),c.visible=this.dragging),this.axis==="E"&&(c.visible=!1)):c.name==="START"?(c.position.copy(this.worldPositionStart),c.visible=this.dragging):c.name==="END"?(c.position.copy(this.worldPosition),c.visible=this.dragging):c.name==="DELTA"?(c.position.copy(this.worldPositionStart),c.quaternion.copy(this.worldQuaternionStart),bn.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),bn.applyQuaternion(this.worldQuaternionStart.clone().invert()),c.scale.copy(bn),c.visible=this.dragging):(c.quaternion.copy(n),this.dragging?c.position.copy(this.worldPositionStart):c.position.copy(this.worldPosition),this.axis&&(c.visible=this.axis.search(c.name)!==-1));continue}c.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(c.name==="X"&&Math.abs(Ut.copy(ia).applyQuaternion(n).dot(this.eye))>.99&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="Y"&&Math.abs(Ut.copy(fs).applyQuaternion(n).dot(this.eye))>.99&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="Z"&&Math.abs(Ut.copy(ra).applyQuaternion(n).dot(this.eye))>.99&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="XY"&&Math.abs(Ut.copy(ra).applyQuaternion(n).dot(this.eye))<.2&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="YZ"&&Math.abs(Ut.copy(ia).applyQuaternion(n).dot(this.eye))<.2&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1),c.name==="XZ"&&Math.abs(Ut.copy(fs).applyQuaternion(n).dot(this.eye))<.2&&(c.scale.set(1e-10,1e-10,1e-10),c.visible=!1)):this.mode==="rotate"&&(wc.copy(n),Ut.copy(this.eye).applyQuaternion(Wt.copy(n).invert()),c.name.search("E")!==-1&&c.quaternion.setFromRotationMatrix(fm.lookAt(this.eye,hm,fs)),c.name==="X"&&(Wt.setFromAxisAngle(ia,Math.atan2(-Ut.y,Ut.z)),Wt.multiplyQuaternions(wc,Wt),c.quaternion.copy(Wt)),c.name==="Y"&&(Wt.setFromAxisAngle(fs,Math.atan2(Ut.x,Ut.z)),Wt.multiplyQuaternions(wc,Wt),c.quaternion.copy(Wt)),c.name==="Z"&&(Wt.setFromAxisAngle(ra,Math.atan2(Ut.y,Ut.x)),Wt.multiplyQuaternions(wc,Wt),c.quaternion.copy(Wt))),c.visible=c.visible&&(c.name.indexOf("X")===-1||this.showX),c.visible=c.visible&&(c.name.indexOf("Y")===-1||this.showY),c.visible=c.visible&&(c.name.indexOf("Z")===-1||this.showZ),c.visible=c.visible&&(c.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),c.material._color=c.material._color||c.material.color.clone(),c.material._opacity=c.material._opacity||c.material.opacity,c.material.color.copy(c.material._color),c.material.opacity=c.material._opacity,this.enabled&&this.axis&&(c.name===this.axis||this.axis.split("").some(function(h){return c.name===h}))&&(c.material.color.setHex(16776960),c.material.opacity=1)}super.updateMatrixWorld(e)}}class JE extends ye{constructor(){super(new ns(1e5,1e5,2,2),new Fi({visible:!1,wireframe:!0,side:gi,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),Cc.copy(ia).applyQuaternion(t==="local"?this.worldQuaternion:Rc),sa.copy(fs).applyQuaternion(t==="local"?this.worldQuaternion:Rc),oa.copy(ra).applyQuaternion(t==="local"?this.worldQuaternion:Rc),Ut.copy(sa),this.mode){case"translate":case"scale":switch(this.axis){case"X":Ut.copy(this.eye).cross(Cc),Gi.copy(Cc).cross(Ut);break;case"Y":Ut.copy(this.eye).cross(sa),Gi.copy(sa).cross(Ut);break;case"Z":Ut.copy(this.eye).cross(oa),Gi.copy(oa).cross(Ut);break;case"XY":Gi.copy(oa);break;case"YZ":Gi.copy(Cc);break;case"XZ":Ut.copy(oa),Gi.copy(sa);break;case"XYZ":case"E":Gi.set(0,0,0);break}break;case"rotate":default:Gi.set(0,0,0)}Gi.length()===0?this.quaternion.copy(this.cameraQuaternion):(dm.lookAt(bn.set(0,0,0),Gi,Ut),this.quaternion.setFromRotationMatrix(dm)),super.updateMatrixWorld(e)}}const pm="#c20017",mm="#00ab26",gm="#0081d4",Nu=pm,Fu=mm,Bu=gm;class QE extends WE{isTransformTool=!0;_scaleLinked;_gizmo;constructor(e,t){super(e,t),this.name="DIVETransformTool",this._scaleLinked=!1,this._gizmo=this.initGizmo(),this._scene.add(this._gizmo)}Activate(){}SetGizmoMode(e){this._gizmo.mode=e}SetGizmoVisibility(e){const t=this._scene.children.includes(this._gizmo);e&&!t?(this._scene.add(this._gizmo),"isTransformControls"in this._gizmo&&this._gizmo.getRaycaster().layers.enableAll()):!e&&t&&(this._scene.remove(this._gizmo),"isTransformControls"in this._gizmo&&this._gizmo.getRaycaster().layers.disableAll())}SetGizmoScaleLinked(e){this._scaleLinked=e}initGizmo(){const e=new XE(this._controller.object,this._controller.domElement);return e.mode="translate",e.traverse(t=>{if(!("isMesh"in t))return;const n=t.material;t.name==="X"&&n.color.set(Nu),t.name==="Y"&&n.color.set(Fu),t.name==="Z"&&n.color.set(Bu),t.name==="XY"&&n.color.set(Bu),t.name==="YZ"&&n.color.set(Nu),t.name==="XZ"&&n.color.set(Fu)}),e.addEventListener("mouseDown",()=>{this._controller.enabled=!1,bc(e.object,"isMovable")&&e.object.onMoveStart&&e.object.onMoveStart()}),e.addEventListener("objectChange",()=>{if(bc(e.object,"isMovable")&&e.object.onMove&&(e.object.onMove(),this._scaleLinked)){const t=e.object.scale,n=(t.x+t.y+t.z)/3;e.object.scale.set(n,n,n)}}),e.addEventListener("mouseUp",()=>{this._controller.enabled=!0,bc(e.object,"isMovable")&&e.object.onMoveEnd&&e.object.onMoveEnd()}),e}}const _m=i=>i.isSelectTool!==void 0;class eb extends QE{isSelectTool=!0;constructor(e,t){super(e,t),this.name="SelectTool"}Activate(){}Select(e){this.AttachGizmo(e),e.onSelect&&e.onSelect()}Deselect(e){this.DetachGizmo(),e.onDeselect&&e.onDeselect()}AttachGizmo(e){if("isMovable"in e){const t=e;this._gizmo.attach(t),this.SetGizmoVisibility(t.visible)}}DetachGizmo(){this._gizmo.detach()}onClick(e){super.onClick(e);const t=this._raycaster.intersectObjects(this._scene.Root.children,!0).filter(r=>r.object.visible)[0],n=Tc(t?.object,"isSelectable");if(!t||!n){this._gizmo.object&&this.Deselect(this._gizmo.object);return}if(this._gizmo.object){if(this._gizmo.object.uuid===n.uuid)return;this.Deselect(this._gizmo.object)}this.Select(n)}}var Pc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},aa={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */var tb=aa.exports,vm;function nb(){return vm||(vm=1,function(i,e){(function(){var t,n="4.17.21",r=200,o="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",c="Expected a function",l="Invalid `variable` option passed into `_.template`",h="__lodash_hash_undefined__",f=500,d="__lodash_placeholder__",p=1,m=2,x=4,M=1,A=2,v=1,_=2,C=4,b=8,L=16,k=32,U=64,O=128,I=256,E=512,y=30,F="...",V=800,G=16,q=1,ne=2,se=3,pe=1/0,K=9007199254740991,he=17976931348623157e292,me=NaN,Ee=4294967295,Ke=Ee-1,ct=Ee>>>1,ie=[["ary",O],["bind",v],["bindKey",_],["curry",b],["curryRight",L],["flip",E],["partial",k],["partialRight",U],["rearg",I]],ge="[object Arguments]",we="[object Array]",Se="[object AsyncFunction]",Ge="[object Boolean]",Xe="[object Date]",lt="[object DOMException]",j="[object Error]",$e="[object Function]",ze="[object GeneratorFunction]",bt="[object Map]",He="[object Number]",Tt="[object Null]",B="[object Object]",w="[object Promise]",te="[object Proxy]",ae="[object RegExp]",ue="[object Set]",de="[object String]",Be="[object Symbol]",_e="[object Undefined]",De="[object WeakMap]",Ve="[object WeakSet]",ve="[object ArrayBuffer]",Te="[object DataView]",qe="[object Float32Array]",Le="[object Float64Array]",Ie="[object Int8Array]",ut="[object Int16Array]",ft="[object Int32Array]",St="[object Uint8Array]",gt="[object Uint8ClampedArray]",Mt="[object Uint16Array]",Ue="[object Uint32Array]",S=/\b__p \+= '';/g,Z=/\b(__p \+=) '' \+/g,oe=/(__e\(.*?\)|\b__t\)) \+\n'';/g,xe=/&(?:amp|lt|gt|quot|#39);/g,Re=/[&<>"']/g,_t=RegExp(xe.source),dt=RegExp(Re.source),Ft=/<%-([\s\S]+?)%>/g,on=/<%([\s\S]+?)%>/g,At=/<%=([\s\S]+?)%>/g,Zt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,$t=/^\w*$/,Un=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,An=/[\\^$.*+?()[\]{}|]/g,ji=RegExp(An.source),qi=/^\s+/,hr=/\s/,Fc=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,vo=/\{\n\/\* \[wrapped with (.+)\] \*/,Bc=/,? & /,zc=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,ch=/[()=,{}\[\]\/\s]/,lh=/\\(\\)?/g,uh=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,D=/\w*$/,Y=/^[-+]0x[0-9a-f]+$/i,Q=/^0b[01]+$/i,ee=/^\[object .+?Constructor\]$/,$=/^0o[0-7]+$/i,Ae=/^(?:0|[1-9]\d*)$/,Fe=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,ke=/($^)/,Ze=/['\n\r\u2028\u2029\\]/g,Je="\\ud800-\\udfff",et="\\u0300-\\u036f",nt="\\ufe20-\\ufe2f",jt="\\u20d0-\\u20ff",wn=et+nt+jt,en="\\u2700-\\u27bf",ai="a-z\\xdf-\\xf6\\xf8-\\xff",Gt="\\xac\\xb1\\xd7\\xf7",rt="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",ma="\\u2000-\\u206f",Bt=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",Ki="A-Z\\xc0-\\xd6\\xd8-\\xde",ga="\\ufe0e\\ufe0f",Nr=Gt+rt+ma+Bt,ps="['’]",mn="["+Je+"]",Ri="["+Nr+"]",Fr="["+wn+"]",Nn="\\d+",_a="["+en+"]",kc="["+ai+"]",va="[^"+Je+Nr+Nn+en+ai+Ki+"]",hh="\\ud83c[\\udffb-\\udfff]",tA="(?:"+Fr+"|"+hh+")",Gm="[^"+Je+"]",fh="(?:\\ud83c[\\udde6-\\uddff]){2}",dh="[\\ud800-\\udbff][\\udc00-\\udfff]",xo="["+Ki+"]",Vm="\\u200d",Wm="(?:"+kc+"|"+va+")",nA="(?:"+xo+"|"+va+")",Xm="(?:"+ps+"(?:d|ll|m|re|s|t|ve))?",Ym="(?:"+ps+"(?:D|LL|M|RE|S|T|VE))?",jm=tA+"?",qm="["+ga+"]?",iA="(?:"+Vm+"(?:"+[Gm,fh,dh].join("|")+")"+qm+jm+")*",rA="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",sA="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Km=qm+jm+iA,oA="(?:"+[_a,fh,dh].join("|")+")"+Km,aA="(?:"+[Gm+Fr+"?",Fr,fh,dh,mn].join("|")+")",cA=RegExp(ps,"g"),lA=RegExp(Fr,"g"),ph=RegExp(hh+"(?="+hh+")|"+aA+Km,"g"),uA=RegExp([xo+"?"+kc+"+"+Xm+"(?="+[Ri,xo,"$"].join("|")+")",nA+"+"+Ym+"(?="+[Ri,xo+Wm,"$"].join("|")+")",xo+"?"+Wm+"+"+Xm,xo+"+"+Ym,sA,rA,Nn,oA].join("|"),"g"),hA=RegExp("["+Vm+Je+wn+ga+"]"),fA=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,dA=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],pA=-1,Vt={};Vt[qe]=Vt[Le]=Vt[Ie]=Vt[ut]=Vt[ft]=Vt[St]=Vt[gt]=Vt[Mt]=Vt[Ue]=!0,Vt[ge]=Vt[we]=Vt[ve]=Vt[Ge]=Vt[Te]=Vt[Xe]=Vt[j]=Vt[$e]=Vt[bt]=Vt[He]=Vt[B]=Vt[ae]=Vt[ue]=Vt[de]=Vt[De]=!1;var zt={};zt[ge]=zt[we]=zt[ve]=zt[Te]=zt[Ge]=zt[Xe]=zt[qe]=zt[Le]=zt[Ie]=zt[ut]=zt[ft]=zt[bt]=zt[He]=zt[B]=zt[ae]=zt[ue]=zt[de]=zt[Be]=zt[St]=zt[gt]=zt[Mt]=zt[Ue]=!0,zt[j]=zt[$e]=zt[De]=!1;var mA={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},gA={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_A={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},vA={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},xA=parseFloat,yA=parseInt,Zm=typeof Pc=="object"&&Pc&&Pc.Object===Object&&Pc,SA=typeof self=="object"&&self&&self.Object===Object&&self,xn=Zm||SA||Function("return this")(),mh=e&&!e.nodeType&&e,ms=mh&&!0&&i&&!i.nodeType&&i,$m=ms&&ms.exports===mh,gh=$m&&Zm.process,ci=function(){try{var W=ms&&ms.require&&ms.require("util").types;return W||gh&&gh.binding&&gh.binding("util")}catch{}}(),Jm=ci&&ci.isArrayBuffer,Qm=ci&&ci.isDate,eg=ci&&ci.isMap,tg=ci&&ci.isRegExp,ng=ci&&ci.isSet,ig=ci&&ci.isTypedArray;function Zn(W,re,J){switch(J.length){case 0:return W.call(re);case 1:return W.call(re,J[0]);case 2:return W.call(re,J[0],J[1]);case 3:return W.call(re,J[0],J[1],J[2])}return W.apply(re,J)}function MA(W,re,J,Ce){for(var tt=-1,wt=W==null?0:W.length;++tt<wt;){var hn=W[tt];re(Ce,hn,J(hn),W)}return Ce}function li(W,re){for(var J=-1,Ce=W==null?0:W.length;++J<Ce&&re(W[J],J,W)!==!1;);return W}function EA(W,re){for(var J=W==null?0:W.length;J--&&re(W[J],J,W)!==!1;);return W}function rg(W,re){for(var J=-1,Ce=W==null?0:W.length;++J<Ce;)if(!re(W[J],J,W))return!1;return!0}function Br(W,re){for(var J=-1,Ce=W==null?0:W.length,tt=0,wt=[];++J<Ce;){var hn=W[J];re(hn,J,W)&&(wt[tt++]=hn)}return wt}function Hc(W,re){var J=W==null?0:W.length;return!!J&&yo(W,re,0)>-1}function _h(W,re,J){for(var Ce=-1,tt=W==null?0:W.length;++Ce<tt;)if(J(re,W[Ce]))return!0;return!1}function Xt(W,re){for(var J=-1,Ce=W==null?0:W.length,tt=Array(Ce);++J<Ce;)tt[J]=re(W[J],J,W);return tt}function zr(W,re){for(var J=-1,Ce=re.length,tt=W.length;++J<Ce;)W[tt+J]=re[J];return W}function vh(W,re,J,Ce){var tt=-1,wt=W==null?0:W.length;for(Ce&&wt&&(J=W[++tt]);++tt<wt;)J=re(J,W[tt],tt,W);return J}function bA(W,re,J,Ce){var tt=W==null?0:W.length;for(Ce&&tt&&(J=W[--tt]);tt--;)J=re(J,W[tt],tt,W);return J}function xh(W,re){for(var J=-1,Ce=W==null?0:W.length;++J<Ce;)if(re(W[J],J,W))return!0;return!1}var TA=yh("length");function AA(W){return W.split("")}function wA(W){return W.match(zc)||[]}function sg(W,re,J){var Ce;return J(W,function(tt,wt,hn){if(re(tt,wt,hn))return Ce=wt,!1}),Ce}function Gc(W,re,J,Ce){for(var tt=W.length,wt=J+(Ce?1:-1);Ce?wt--:++wt<tt;)if(re(W[wt],wt,W))return wt;return-1}function yo(W,re,J){return re===re?zA(W,re,J):Gc(W,og,J)}function RA(W,re,J,Ce){for(var tt=J-1,wt=W.length;++tt<wt;)if(Ce(W[tt],re))return tt;return-1}function og(W){return W!==W}function ag(W,re){var J=W==null?0:W.length;return J?Mh(W,re)/J:me}function yh(W){return function(re){return re==null?t:re[W]}}function Sh(W){return function(re){return W==null?t:W[re]}}function cg(W,re,J,Ce,tt){return tt(W,function(wt,hn,Nt){J=Ce?(Ce=!1,wt):re(J,wt,hn,Nt)}),J}function CA(W,re){var J=W.length;for(W.sort(re);J--;)W[J]=W[J].value;return W}function Mh(W,re){for(var J,Ce=-1,tt=W.length;++Ce<tt;){var wt=re(W[Ce]);wt!==t&&(J=J===t?wt:J+wt)}return J}function Eh(W,re){for(var J=-1,Ce=Array(W);++J<W;)Ce[J]=re(J);return Ce}function PA(W,re){return Xt(re,function(J){return[J,W[J]]})}function lg(W){return W&&W.slice(0,dg(W)+1).replace(qi,"")}function $n(W){return function(re){return W(re)}}function bh(W,re){return Xt(re,function(J){return W[J]})}function xa(W,re){return W.has(re)}function ug(W,re){for(var J=-1,Ce=W.length;++J<Ce&&yo(re,W[J],0)>-1;);return J}function hg(W,re){for(var J=W.length;J--&&yo(re,W[J],0)>-1;);return J}function LA(W,re){for(var J=W.length,Ce=0;J--;)W[J]===re&&++Ce;return Ce}var IA=Sh(mA),DA=Sh(gA);function OA(W){return"\\"+vA[W]}function UA(W,re){return W==null?t:W[re]}function So(W){return hA.test(W)}function NA(W){return fA.test(W)}function FA(W){for(var re,J=[];!(re=W.next()).done;)J.push(re.value);return J}function Th(W){var re=-1,J=Array(W.size);return W.forEach(function(Ce,tt){J[++re]=[tt,Ce]}),J}function fg(W,re){return function(J){return W(re(J))}}function kr(W,re){for(var J=-1,Ce=W.length,tt=0,wt=[];++J<Ce;){var hn=W[J];(hn===re||hn===d)&&(W[J]=d,wt[tt++]=J)}return wt}function Vc(W){var re=-1,J=Array(W.size);return W.forEach(function(Ce){J[++re]=Ce}),J}function BA(W){var re=-1,J=Array(W.size);return W.forEach(function(Ce){J[++re]=[Ce,Ce]}),J}function zA(W,re,J){for(var Ce=J-1,tt=W.length;++Ce<tt;)if(W[Ce]===re)return Ce;return-1}function kA(W,re,J){for(var Ce=J+1;Ce--;)if(W[Ce]===re)return Ce;return Ce}function Mo(W){return So(W)?GA(W):TA(W)}function Ci(W){return So(W)?VA(W):AA(W)}function dg(W){for(var re=W.length;re--&&hr.test(W.charAt(re)););return re}var HA=Sh(_A);function GA(W){for(var re=ph.lastIndex=0;ph.test(W);)++re;return re}function VA(W){return W.match(ph)||[]}function WA(W){return W.match(uA)||[]}var XA=function W(re){re=re==null?xn:Eo.defaults(xn.Object(),re,Eo.pick(xn,dA));var J=re.Array,Ce=re.Date,tt=re.Error,wt=re.Function,hn=re.Math,Nt=re.Object,Ah=re.RegExp,YA=re.String,ui=re.TypeError,Wc=J.prototype,jA=wt.prototype,bo=Nt.prototype,Xc=re["__core-js_shared__"],Yc=jA.toString,It=bo.hasOwnProperty,qA=0,pg=function(){var s=/[^.]+$/.exec(Xc&&Xc.keys&&Xc.keys.IE_PROTO||"");return s?"Symbol(src)_1."+s:""}(),jc=bo.toString,KA=Yc.call(Nt),ZA=xn._,$A=Ah("^"+Yc.call(It).replace(An,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),qc=$m?re.Buffer:t,Hr=re.Symbol,Kc=re.Uint8Array,mg=qc?qc.allocUnsafe:t,Zc=fg(Nt.getPrototypeOf,Nt),gg=Nt.create,_g=bo.propertyIsEnumerable,$c=Wc.splice,vg=Hr?Hr.isConcatSpreadable:t,ya=Hr?Hr.iterator:t,gs=Hr?Hr.toStringTag:t,Jc=function(){try{var s=Ss(Nt,"defineProperty");return s({},"",{}),s}catch{}}(),JA=re.clearTimeout!==xn.clearTimeout&&re.clearTimeout,QA=Ce&&Ce.now!==xn.Date.now&&Ce.now,ew=re.setTimeout!==xn.setTimeout&&re.setTimeout,Qc=hn.ceil,el=hn.floor,wh=Nt.getOwnPropertySymbols,tw=qc?qc.isBuffer:t,xg=re.isFinite,nw=Wc.join,iw=fg(Nt.keys,Nt),fn=hn.max,Rn=hn.min,rw=Ce.now,sw=re.parseInt,yg=hn.random,ow=Wc.reverse,Rh=Ss(re,"DataView"),Sa=Ss(re,"Map"),Ch=Ss(re,"Promise"),To=Ss(re,"Set"),Ma=Ss(re,"WeakMap"),Ea=Ss(Nt,"create"),tl=Ma&&new Ma,Ao={},aw=Ms(Rh),cw=Ms(Sa),lw=Ms(Ch),uw=Ms(To),hw=Ms(Ma),nl=Hr?Hr.prototype:t,ba=nl?nl.valueOf:t,Sg=nl?nl.toString:t;function R(s){if(Jt(s)&&!it(s)&&!(s instanceof yt)){if(s instanceof hi)return s;if(It.call(s,"__wrapped__"))return M_(s)}return new hi(s)}var wo=function(){function s(){}return function(a){if(!qt(a))return{};if(gg)return gg(a);s.prototype=a;var u=new s;return s.prototype=t,u}}();function il(){}function hi(s,a){this.__wrapped__=s,this.__actions__=[],this.__chain__=!!a,this.__index__=0,this.__values__=t}R.templateSettings={escape:Ft,evaluate:on,interpolate:At,variable:"",imports:{_:R}},R.prototype=il.prototype,R.prototype.constructor=R,hi.prototype=wo(il.prototype),hi.prototype.constructor=hi;function yt(s){this.__wrapped__=s,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Ee,this.__views__=[]}function fw(){var s=new yt(this.__wrapped__);return s.__actions__=Gn(this.__actions__),s.__dir__=this.__dir__,s.__filtered__=this.__filtered__,s.__iteratees__=Gn(this.__iteratees__),s.__takeCount__=this.__takeCount__,s.__views__=Gn(this.__views__),s}function dw(){if(this.__filtered__){var s=new yt(this);s.__dir__=-1,s.__filtered__=!0}else s=this.clone(),s.__dir__*=-1;return s}function pw(){var s=this.__wrapped__.value(),a=this.__dir__,u=it(s),g=a<0,T=u?s.length:0,P=A1(0,T,this.__views__),z=P.start,H=P.end,X=H-z,ce=g?H:z-1,le=this.__iteratees__,fe=le.length,be=0,Oe=Rn(X,this.__takeCount__);if(!u||!g&&T==X&&Oe==X)return Xg(s,this.__actions__);var Ye=[];e:for(;X--&&be<Oe;){ce+=a;for(var ht=-1,je=s[ce];++ht<fe;){var vt=le[ht],Et=vt.iteratee,ei=vt.type,zn=Et(je);if(ei==ne)je=zn;else if(!zn){if(ei==q)continue e;break e}}Ye[be++]=je}return Ye}yt.prototype=wo(il.prototype),yt.prototype.constructor=yt;function _s(s){var a=-1,u=s==null?0:s.length;for(this.clear();++a<u;){var g=s[a];this.set(g[0],g[1])}}function mw(){this.__data__=Ea?Ea(null):{},this.size=0}function gw(s){var a=this.has(s)&&delete this.__data__[s];return this.size-=a?1:0,a}function _w(s){var a=this.__data__;if(Ea){var u=a[s];return u===h?t:u}return It.call(a,s)?a[s]:t}function vw(s){var a=this.__data__;return Ea?a[s]!==t:It.call(a,s)}function xw(s,a){var u=this.__data__;return this.size+=this.has(s)?0:1,u[s]=Ea&&a===t?h:a,this}_s.prototype.clear=mw,_s.prototype.delete=gw,_s.prototype.get=_w,_s.prototype.has=vw,_s.prototype.set=xw;function fr(s){var a=-1,u=s==null?0:s.length;for(this.clear();++a<u;){var g=s[a];this.set(g[0],g[1])}}function yw(){this.__data__=[],this.size=0}function Sw(s){var a=this.__data__,u=rl(a,s);if(u<0)return!1;var g=a.length-1;return u==g?a.pop():$c.call(a,u,1),--this.size,!0}function Mw(s){var a=this.__data__,u=rl(a,s);return u<0?t:a[u][1]}function Ew(s){return rl(this.__data__,s)>-1}function bw(s,a){var u=this.__data__,g=rl(u,s);return g<0?(++this.size,u.push([s,a])):u[g][1]=a,this}fr.prototype.clear=yw,fr.prototype.delete=Sw,fr.prototype.get=Mw,fr.prototype.has=Ew,fr.prototype.set=bw;function dr(s){var a=-1,u=s==null?0:s.length;for(this.clear();++a<u;){var g=s[a];this.set(g[0],g[1])}}function Tw(){this.size=0,this.__data__={hash:new _s,map:new(Sa||fr),string:new _s}}function Aw(s){var a=gl(this,s).delete(s);return this.size-=a?1:0,a}function ww(s){return gl(this,s).get(s)}function Rw(s){return gl(this,s).has(s)}function Cw(s,a){var u=gl(this,s),g=u.size;return u.set(s,a),this.size+=u.size==g?0:1,this}dr.prototype.clear=Tw,dr.prototype.delete=Aw,dr.prototype.get=ww,dr.prototype.has=Rw,dr.prototype.set=Cw;function vs(s){var a=-1,u=s==null?0:s.length;for(this.__data__=new dr;++a<u;)this.add(s[a])}function Pw(s){return this.__data__.set(s,h),this}function Lw(s){return this.__data__.has(s)}vs.prototype.add=vs.prototype.push=Pw,vs.prototype.has=Lw;function Pi(s){var a=this.__data__=new fr(s);this.size=a.size}function Iw(){this.__data__=new fr,this.size=0}function Dw(s){var a=this.__data__,u=a.delete(s);return this.size=a.size,u}function Ow(s){return this.__data__.get(s)}function Uw(s){return this.__data__.has(s)}function Nw(s,a){var u=this.__data__;if(u instanceof fr){var g=u.__data__;if(!Sa||g.length<r-1)return g.push([s,a]),this.size=++u.size,this;u=this.__data__=new dr(g)}return u.set(s,a),this.size=u.size,this}Pi.prototype.clear=Iw,Pi.prototype.delete=Dw,Pi.prototype.get=Ow,Pi.prototype.has=Uw,Pi.prototype.set=Nw;function Mg(s,a){var u=it(s),g=!u&&Es(s),T=!u&&!g&&Yr(s),P=!u&&!g&&!T&&Lo(s),z=u||g||T||P,H=z?Eh(s.length,YA):[],X=H.length;for(var ce in s)(a||It.call(s,ce))&&!(z&&(ce=="length"||T&&(ce=="offset"||ce=="parent")||P&&(ce=="buffer"||ce=="byteLength"||ce=="byteOffset")||_r(ce,X)))&&H.push(ce);return H}function Eg(s){var a=s.length;return a?s[kh(0,a-1)]:t}function Fw(s,a){return _l(Gn(s),xs(a,0,s.length))}function Bw(s){return _l(Gn(s))}function Ph(s,a,u){(u!==t&&!Li(s[a],u)||u===t&&!(a in s))&&pr(s,a,u)}function Ta(s,a,u){var g=s[a];(!(It.call(s,a)&&Li(g,u))||u===t&&!(a in s))&&pr(s,a,u)}function rl(s,a){for(var u=s.length;u--;)if(Li(s[u][0],a))return u;return-1}function zw(s,a,u,g){return Gr(s,function(T,P,z){a(g,T,u(T),z)}),g}function bg(s,a){return s&&$i(a,gn(a),s)}function kw(s,a){return s&&$i(a,Wn(a),s)}function pr(s,a,u){a=="__proto__"&&Jc?Jc(s,a,{configurable:!0,enumerable:!0,value:u,writable:!0}):s[a]=u}function Lh(s,a){for(var u=-1,g=a.length,T=J(g),P=s==null;++u<g;)T[u]=P?t:ff(s,a[u]);return T}function xs(s,a,u){return s===s&&(u!==t&&(s=s<=u?s:u),a!==t&&(s=s>=a?s:a)),s}function fi(s,a,u,g,T,P){var z,H=a&p,X=a&m,ce=a&x;if(u&&(z=T?u(s,g,T,P):u(s)),z!==t)return z;if(!qt(s))return s;var le=it(s);if(le){if(z=R1(s),!H)return Gn(s,z)}else{var fe=Cn(s),be=fe==$e||fe==ze;if(Yr(s))return qg(s,H);if(fe==B||fe==ge||be&&!T){if(z=X||be?{}:d_(s),!H)return X?_1(s,kw(z,s)):g1(s,bg(z,s))}else{if(!zt[fe])return T?s:{};z=C1(s,fe,H)}}P||(P=new Pi);var Oe=P.get(s);if(Oe)return Oe;P.set(s,z),G_(s)?s.forEach(function(je){z.add(fi(je,a,u,je,s,P))}):k_(s)&&s.forEach(function(je,vt){z.set(vt,fi(je,a,u,vt,s,P))});var Ye=ce?X?$h:Zh:X?Wn:gn,ht=le?t:Ye(s);return li(ht||s,function(je,vt){ht&&(vt=je,je=s[vt]),Ta(z,vt,fi(je,a,u,vt,s,P))}),z}function Hw(s){var a=gn(s);return function(u){return Tg(u,s,a)}}function Tg(s,a,u){var g=u.length;if(s==null)return!g;for(s=Nt(s);g--;){var T=u[g],P=a[T],z=s[T];if(z===t&&!(T in s)||!P(z))return!1}return!0}function Ag(s,a,u){if(typeof s!="function")throw new ui(c);return Ia(function(){s.apply(t,u)},a)}function Aa(s,a,u,g){var T=-1,P=Hc,z=!0,H=s.length,X=[],ce=a.length;if(!H)return X;u&&(a=Xt(a,$n(u))),g?(P=_h,z=!1):a.length>=r&&(P=xa,z=!1,a=new vs(a));e:for(;++T<H;){var le=s[T],fe=u==null?le:u(le);if(le=g||le!==0?le:0,z&&fe===fe){for(var be=ce;be--;)if(a[be]===fe)continue e;X.push(le)}else P(a,fe,g)||X.push(le)}return X}var Gr=Qg(Zi),wg=Qg(Dh,!0);function Gw(s,a){var u=!0;return Gr(s,function(g,T,P){return u=!!a(g,T,P),u}),u}function sl(s,a,u){for(var g=-1,T=s.length;++g<T;){var P=s[g],z=a(P);if(z!=null&&(H===t?z===z&&!Qn(z):u(z,H)))var H=z,X=P}return X}function Vw(s,a,u,g){var T=s.length;for(u=st(u),u<0&&(u=-u>T?0:T+u),g=g===t||g>T?T:st(g),g<0&&(g+=T),g=u>g?0:W_(g);u<g;)s[u++]=a;return s}function Rg(s,a){var u=[];return Gr(s,function(g,T,P){a(g,T,P)&&u.push(g)}),u}function yn(s,a,u,g,T){var P=-1,z=s.length;for(u||(u=L1),T||(T=[]);++P<z;){var H=s[P];a>0&&u(H)?a>1?yn(H,a-1,u,g,T):zr(T,H):g||(T[T.length]=H)}return T}var Ih=e_(),Cg=e_(!0);function Zi(s,a){return s&&Ih(s,a,gn)}function Dh(s,a){return s&&Cg(s,a,gn)}function ol(s,a){return Br(a,function(u){return vr(s[u])})}function ys(s,a){a=Wr(a,s);for(var u=0,g=a.length;s!=null&&u<g;)s=s[Ji(a[u++])];return u&&u==g?s:t}function Pg(s,a,u){var g=a(s);return it(s)?g:zr(g,u(s))}function Fn(s){return s==null?s===t?_e:Tt:gs&&gs in Nt(s)?T1(s):B1(s)}function Oh(s,a){return s>a}function Ww(s,a){return s!=null&&It.call(s,a)}function Xw(s,a){return s!=null&&a in Nt(s)}function Yw(s,a,u){return s>=Rn(a,u)&&s<fn(a,u)}function Uh(s,a,u){for(var g=u?_h:Hc,T=s[0].length,P=s.length,z=P,H=J(P),X=1/0,ce=[];z--;){var le=s[z];z&&a&&(le=Xt(le,$n(a))),X=Rn(le.length,X),H[z]=!u&&(a||T>=120&&le.length>=120)?new vs(z&&le):t}le=s[0];var fe=-1,be=H[0];e:for(;++fe<T&&ce.length<X;){var Oe=le[fe],Ye=a?a(Oe):Oe;if(Oe=u||Oe!==0?Oe:0,!(be?xa(be,Ye):g(ce,Ye,u))){for(z=P;--z;){var ht=H[z];if(!(ht?xa(ht,Ye):g(s[z],Ye,u)))continue e}be&&be.push(Ye),ce.push(Oe)}}return ce}function jw(s,a,u,g){return Zi(s,function(T,P,z){a(g,u(T),P,z)}),g}function wa(s,a,u){a=Wr(a,s),s=__(s,a);var g=s==null?s:s[Ji(pi(a))];return g==null?t:Zn(g,s,u)}function Lg(s){return Jt(s)&&Fn(s)==ge}function qw(s){return Jt(s)&&Fn(s)==ve}function Kw(s){return Jt(s)&&Fn(s)==Xe}function Ra(s,a,u,g,T){return s===a?!0:s==null||a==null||!Jt(s)&&!Jt(a)?s!==s&&a!==a:Zw(s,a,u,g,Ra,T)}function Zw(s,a,u,g,T,P){var z=it(s),H=it(a),X=z?we:Cn(s),ce=H?we:Cn(a);X=X==ge?B:X,ce=ce==ge?B:ce;var le=X==B,fe=ce==B,be=X==ce;if(be&&Yr(s)){if(!Yr(a))return!1;z=!0,le=!1}if(be&&!le)return P||(P=new Pi),z||Lo(s)?u_(s,a,u,g,T,P):E1(s,a,X,u,g,T,P);if(!(u&M)){var Oe=le&&It.call(s,"__wrapped__"),Ye=fe&&It.call(a,"__wrapped__");if(Oe||Ye){var ht=Oe?s.value():s,je=Ye?a.value():a;return P||(P=new Pi),T(ht,je,u,g,P)}}return be?(P||(P=new Pi),b1(s,a,u,g,T,P)):!1}function $w(s){return Jt(s)&&Cn(s)==bt}function Nh(s,a,u,g){var T=u.length,P=T,z=!g;if(s==null)return!P;for(s=Nt(s);T--;){var H=u[T];if(z&&H[2]?H[1]!==s[H[0]]:!(H[0]in s))return!1}for(;++T<P;){H=u[T];var X=H[0],ce=s[X],le=H[1];if(z&&H[2]){if(ce===t&&!(X in s))return!1}else{var fe=new Pi;if(g)var be=g(ce,le,X,s,a,fe);if(!(be===t?Ra(le,ce,M|A,g,fe):be))return!1}}return!0}function Ig(s){if(!qt(s)||D1(s))return!1;var a=vr(s)?$A:ee;return a.test(Ms(s))}function Jw(s){return Jt(s)&&Fn(s)==ae}function Qw(s){return Jt(s)&&Cn(s)==ue}function e1(s){return Jt(s)&&El(s.length)&&!!Vt[Fn(s)]}function Dg(s){return typeof s=="function"?s:s==null?Xn:typeof s=="object"?it(s)?Ng(s[0],s[1]):Ug(s):t0(s)}function Fh(s){if(!La(s))return iw(s);var a=[];for(var u in Nt(s))It.call(s,u)&&u!="constructor"&&a.push(u);return a}function t1(s){if(!qt(s))return F1(s);var a=La(s),u=[];for(var g in s)g=="constructor"&&(a||!It.call(s,g))||u.push(g);return u}function Bh(s,a){return s<a}function Og(s,a){var u=-1,g=Vn(s)?J(s.length):[];return Gr(s,function(T,P,z){g[++u]=a(T,P,z)}),g}function Ug(s){var a=Qh(s);return a.length==1&&a[0][2]?m_(a[0][0],a[0][1]):function(u){return u===s||Nh(u,s,a)}}function Ng(s,a){return tf(s)&&p_(a)?m_(Ji(s),a):function(u){var g=ff(u,s);return g===t&&g===a?df(u,s):Ra(a,g,M|A)}}function al(s,a,u,g,T){s!==a&&Ih(a,function(P,z){if(T||(T=new Pi),qt(P))n1(s,a,z,u,al,g,T);else{var H=g?g(rf(s,z),P,z+"",s,a,T):t;H===t&&(H=P),Ph(s,z,H)}},Wn)}function n1(s,a,u,g,T,P,z){var H=rf(s,u),X=rf(a,u),ce=z.get(X);if(ce){Ph(s,u,ce);return}var le=P?P(H,X,u+"",s,a,z):t,fe=le===t;if(fe){var be=it(X),Oe=!be&&Yr(X),Ye=!be&&!Oe&&Lo(X);le=X,be||Oe||Ye?it(H)?le=H:tn(H)?le=Gn(H):Oe?(fe=!1,le=qg(X,!0)):Ye?(fe=!1,le=Kg(X,!0)):le=[]:Da(X)||Es(X)?(le=H,Es(H)?le=X_(H):(!qt(H)||vr(H))&&(le=d_(X))):fe=!1}fe&&(z.set(X,le),T(le,X,g,P,z),z.delete(X)),Ph(s,u,le)}function Fg(s,a){var u=s.length;if(u)return a+=a<0?u:0,_r(a,u)?s[a]:t}function Bg(s,a,u){a.length?a=Xt(a,function(P){return it(P)?function(z){return ys(z,P.length===1?P[0]:P)}:P}):a=[Xn];var g=-1;a=Xt(a,$n(We()));var T=Og(s,function(P,z,H){var X=Xt(a,function(ce){return ce(P)});return{criteria:X,index:++g,value:P}});return CA(T,function(P,z){return m1(P,z,u)})}function i1(s,a){return zg(s,a,function(u,g){return df(s,g)})}function zg(s,a,u){for(var g=-1,T=a.length,P={};++g<T;){var z=a[g],H=ys(s,z);u(H,z)&&Ca(P,Wr(z,s),H)}return P}function r1(s){return function(a){return ys(a,s)}}function zh(s,a,u,g){var T=g?RA:yo,P=-1,z=a.length,H=s;for(s===a&&(a=Gn(a)),u&&(H=Xt(s,$n(u)));++P<z;)for(var X=0,ce=a[P],le=u?u(ce):ce;(X=T(H,le,X,g))>-1;)H!==s&&$c.call(H,X,1),$c.call(s,X,1);return s}function kg(s,a){for(var u=s?a.length:0,g=u-1;u--;){var T=a[u];if(u==g||T!==P){var P=T;_r(T)?$c.call(s,T,1):Vh(s,T)}}return s}function kh(s,a){return s+el(yg()*(a-s+1))}function s1(s,a,u,g){for(var T=-1,P=fn(Qc((a-s)/(u||1)),0),z=J(P);P--;)z[g?P:++T]=s,s+=u;return z}function Hh(s,a){var u="";if(!s||a<1||a>K)return u;do a%2&&(u+=s),a=el(a/2),a&&(s+=s);while(a);return u}function pt(s,a){return sf(g_(s,a,Xn),s+"")}function o1(s){return Eg(Io(s))}function a1(s,a){var u=Io(s);return _l(u,xs(a,0,u.length))}function Ca(s,a,u,g){if(!qt(s))return s;a=Wr(a,s);for(var T=-1,P=a.length,z=P-1,H=s;H!=null&&++T<P;){var X=Ji(a[T]),ce=u;if(X==="__proto__"||X==="constructor"||X==="prototype")return s;if(T!=z){var le=H[X];ce=g?g(le,X,H):t,ce===t&&(ce=qt(le)?le:_r(a[T+1])?[]:{})}Ta(H,X,ce),H=H[X]}return s}var Hg=tl?function(s,a){return tl.set(s,a),s}:Xn,c1=Jc?function(s,a){return Jc(s,"toString",{configurable:!0,enumerable:!1,value:mf(a),writable:!0})}:Xn;function l1(s){return _l(Io(s))}function di(s,a,u){var g=-1,T=s.length;a<0&&(a=-a>T?0:T+a),u=u>T?T:u,u<0&&(u+=T),T=a>u?0:u-a>>>0,a>>>=0;for(var P=J(T);++g<T;)P[g]=s[g+a];return P}function u1(s,a){var u;return Gr(s,function(g,T,P){return u=a(g,T,P),!u}),!!u}function cl(s,a,u){var g=0,T=s==null?g:s.length;if(typeof a=="number"&&a===a&&T<=ct){for(;g<T;){var P=g+T>>>1,z=s[P];z!==null&&!Qn(z)&&(u?z<=a:z<a)?g=P+1:T=P}return T}return Gh(s,a,Xn,u)}function Gh(s,a,u,g){var T=0,P=s==null?0:s.length;if(P===0)return 0;a=u(a);for(var z=a!==a,H=a===null,X=Qn(a),ce=a===t;T<P;){var le=el((T+P)/2),fe=u(s[le]),be=fe!==t,Oe=fe===null,Ye=fe===fe,ht=Qn(fe);if(z)var je=g||Ye;else ce?je=Ye&&(g||be):H?je=Ye&&be&&(g||!Oe):X?je=Ye&&be&&!Oe&&(g||!ht):Oe||ht?je=!1:je=g?fe<=a:fe<a;je?T=le+1:P=le}return Rn(P,Ke)}function Gg(s,a){for(var u=-1,g=s.length,T=0,P=[];++u<g;){var z=s[u],H=a?a(z):z;if(!u||!Li(H,X)){var X=H;P[T++]=z===0?0:z}}return P}function Vg(s){return typeof s=="number"?s:Qn(s)?me:+s}function Jn(s){if(typeof s=="string")return s;if(it(s))return Xt(s,Jn)+"";if(Qn(s))return Sg?Sg.call(s):"";var a=s+"";return a=="0"&&1/s==-1/0?"-0":a}function Vr(s,a,u){var g=-1,T=Hc,P=s.length,z=!0,H=[],X=H;if(u)z=!1,T=_h;else if(P>=r){var ce=a?null:S1(s);if(ce)return Vc(ce);z=!1,T=xa,X=new vs}else X=a?[]:H;e:for(;++g<P;){var le=s[g],fe=a?a(le):le;if(le=u||le!==0?le:0,z&&fe===fe){for(var be=X.length;be--;)if(X[be]===fe)continue e;a&&X.push(fe),H.push(le)}else T(X,fe,u)||(X!==H&&X.push(fe),H.push(le))}return H}function Vh(s,a){return a=Wr(a,s),s=__(s,a),s==null||delete s[Ji(pi(a))]}function Wg(s,a,u,g){return Ca(s,a,u(ys(s,a)),g)}function ll(s,a,u,g){for(var T=s.length,P=g?T:-1;(g?P--:++P<T)&&a(s[P],P,s););return u?di(s,g?0:P,g?P+1:T):di(s,g?P+1:0,g?T:P)}function Xg(s,a){var u=s;return u instanceof yt&&(u=u.value()),vh(a,function(g,T){return T.func.apply(T.thisArg,zr([g],T.args))},u)}function Wh(s,a,u){var g=s.length;if(g<2)return g?Vr(s[0]):[];for(var T=-1,P=J(g);++T<g;)for(var z=s[T],H=-1;++H<g;)H!=T&&(P[T]=Aa(P[T]||z,s[H],a,u));return Vr(yn(P,1),a,u)}function Yg(s,a,u){for(var g=-1,T=s.length,P=a.length,z={};++g<T;){var H=g<P?a[g]:t;u(z,s[g],H)}return z}function Xh(s){return tn(s)?s:[]}function Yh(s){return typeof s=="function"?s:Xn}function Wr(s,a){return it(s)?s:tf(s,a)?[s]:S_(Ct(s))}var h1=pt;function Xr(s,a,u){var g=s.length;return u=u===t?g:u,!a&&u>=g?s:di(s,a,u)}var jg=JA||function(s){return xn.clearTimeout(s)};function qg(s,a){if(a)return s.slice();var u=s.length,g=mg?mg(u):new s.constructor(u);return s.copy(g),g}function jh(s){var a=new s.constructor(s.byteLength);return new Kc(a).set(new Kc(s)),a}function f1(s,a){var u=a?jh(s.buffer):s.buffer;return new s.constructor(u,s.byteOffset,s.byteLength)}function d1(s){var a=new s.constructor(s.source,D.exec(s));return a.lastIndex=s.lastIndex,a}function p1(s){return ba?Nt(ba.call(s)):{}}function Kg(s,a){var u=a?jh(s.buffer):s.buffer;return new s.constructor(u,s.byteOffset,s.length)}function Zg(s,a){if(s!==a){var u=s!==t,g=s===null,T=s===s,P=Qn(s),z=a!==t,H=a===null,X=a===a,ce=Qn(a);if(!H&&!ce&&!P&&s>a||P&&z&&X&&!H&&!ce||g&&z&&X||!u&&X||!T)return 1;if(!g&&!P&&!ce&&s<a||ce&&u&&T&&!g&&!P||H&&u&&T||!z&&T||!X)return-1}return 0}function m1(s,a,u){for(var g=-1,T=s.criteria,P=a.criteria,z=T.length,H=u.length;++g<z;){var X=Zg(T[g],P[g]);if(X){if(g>=H)return X;var ce=u[g];return X*(ce=="desc"?-1:1)}}return s.index-a.index}function $g(s,a,u,g){for(var T=-1,P=s.length,z=u.length,H=-1,X=a.length,ce=fn(P-z,0),le=J(X+ce),fe=!g;++H<X;)le[H]=a[H];for(;++T<z;)(fe||T<P)&&(le[u[T]]=s[T]);for(;ce--;)le[H++]=s[T++];return le}function Jg(s,a,u,g){for(var T=-1,P=s.length,z=-1,H=u.length,X=-1,ce=a.length,le=fn(P-H,0),fe=J(le+ce),be=!g;++T<le;)fe[T]=s[T];for(var Oe=T;++X<ce;)fe[Oe+X]=a[X];for(;++z<H;)(be||T<P)&&(fe[Oe+u[z]]=s[T++]);return fe}function Gn(s,a){var u=-1,g=s.length;for(a||(a=J(g));++u<g;)a[u]=s[u];return a}function $i(s,a,u,g){var T=!u;u||(u={});for(var P=-1,z=a.length;++P<z;){var H=a[P],X=g?g(u[H],s[H],H,u,s):t;X===t&&(X=s[H]),T?pr(u,H,X):Ta(u,H,X)}return u}function g1(s,a){return $i(s,ef(s),a)}function _1(s,a){return $i(s,h_(s),a)}function ul(s,a){return function(u,g){var T=it(u)?MA:zw,P=a?a():{};return T(u,s,We(g,2),P)}}function Ro(s){return pt(function(a,u){var g=-1,T=u.length,P=T>1?u[T-1]:t,z=T>2?u[2]:t;for(P=s.length>3&&typeof P=="function"?(T--,P):t,z&&Bn(u[0],u[1],z)&&(P=T<3?t:P,T=1),a=Nt(a);++g<T;){var H=u[g];H&&s(a,H,g,P)}return a})}function Qg(s,a){return function(u,g){if(u==null)return u;if(!Vn(u))return s(u,g);for(var T=u.length,P=a?T:-1,z=Nt(u);(a?P--:++P<T)&&g(z[P],P,z)!==!1;);return u}}function e_(s){return function(a,u,g){for(var T=-1,P=Nt(a),z=g(a),H=z.length;H--;){var X=z[s?H:++T];if(u(P[X],X,P)===!1)break}return a}}function v1(s,a,u){var g=a&v,T=Pa(s);function P(){var z=this&&this!==xn&&this instanceof P?T:s;return z.apply(g?u:this,arguments)}return P}function t_(s){return function(a){a=Ct(a);var u=So(a)?Ci(a):t,g=u?u[0]:a.charAt(0),T=u?Xr(u,1).join(""):a.slice(1);return g[s]()+T}}function Co(s){return function(a){return vh(Q_(J_(a).replace(cA,"")),s,"")}}function Pa(s){return function(){var a=arguments;switch(a.length){case 0:return new s;case 1:return new s(a[0]);case 2:return new s(a[0],a[1]);case 3:return new s(a[0],a[1],a[2]);case 4:return new s(a[0],a[1],a[2],a[3]);case 5:return new s(a[0],a[1],a[2],a[3],a[4]);case 6:return new s(a[0],a[1],a[2],a[3],a[4],a[5]);case 7:return new s(a[0],a[1],a[2],a[3],a[4],a[5],a[6])}var u=wo(s.prototype),g=s.apply(u,a);return qt(g)?g:u}}function x1(s,a,u){var g=Pa(s);function T(){for(var P=arguments.length,z=J(P),H=P,X=Po(T);H--;)z[H]=arguments[H];var ce=P<3&&z[0]!==X&&z[P-1]!==X?[]:kr(z,X);if(P-=ce.length,P<u)return o_(s,a,hl,T.placeholder,t,z,ce,t,t,u-P);var le=this&&this!==xn&&this instanceof T?g:s;return Zn(le,this,z)}return T}function n_(s){return function(a,u,g){var T=Nt(a);if(!Vn(a)){var P=We(u,3);a=gn(a),u=function(H){return P(T[H],H,T)}}var z=s(a,u,g);return z>-1?T[P?a[z]:z]:t}}function i_(s){return gr(function(a){var u=a.length,g=u,T=hi.prototype.thru;for(s&&a.reverse();g--;){var P=a[g];if(typeof P!="function")throw new ui(c);if(T&&!z&&ml(P)=="wrapper")var z=new hi([],!0)}for(g=z?g:u;++g<u;){P=a[g];var H=ml(P),X=H=="wrapper"?Jh(P):t;X&&nf(X[0])&&X[1]==(O|b|k|I)&&!X[4].length&&X[9]==1?z=z[ml(X[0])].apply(z,X[3]):z=P.length==1&&nf(P)?z[H]():z.thru(P)}return function(){var ce=arguments,le=ce[0];if(z&&ce.length==1&&it(le))return z.plant(le).value();for(var fe=0,be=u?a[fe].apply(this,ce):le;++fe<u;)be=a[fe].call(this,be);return be}})}function hl(s,a,u,g,T,P,z,H,X,ce){var le=a&O,fe=a&v,be=a&_,Oe=a&(b|L),Ye=a&E,ht=be?t:Pa(s);function je(){for(var vt=arguments.length,Et=J(vt),ei=vt;ei--;)Et[ei]=arguments[ei];if(Oe)var zn=Po(je),ti=LA(Et,zn);if(g&&(Et=$g(Et,g,T,Oe)),P&&(Et=Jg(Et,P,z,Oe)),vt-=ti,Oe&&vt<ce){var nn=kr(Et,zn);return o_(s,a,hl,je.placeholder,u,Et,nn,H,X,ce-vt)}var Ii=fe?u:this,yr=be?Ii[s]:s;return vt=Et.length,H?Et=z1(Et,H):Ye&&vt>1&&Et.reverse(),le&&X<vt&&(Et.length=X),this&&this!==xn&&this instanceof je&&(yr=ht||Pa(yr)),yr.apply(Ii,Et)}return je}function r_(s,a){return function(u,g){return jw(u,s,a(g),{})}}function fl(s,a){return function(u,g){var T;if(u===t&&g===t)return a;if(u!==t&&(T=u),g!==t){if(T===t)return g;typeof u=="string"||typeof g=="string"?(u=Jn(u),g=Jn(g)):(u=Vg(u),g=Vg(g)),T=s(u,g)}return T}}function qh(s){return gr(function(a){return a=Xt(a,$n(We())),pt(function(u){var g=this;return s(a,function(T){return Zn(T,g,u)})})})}function dl(s,a){a=a===t?" ":Jn(a);var u=a.length;if(u<2)return u?Hh(a,s):a;var g=Hh(a,Qc(s/Mo(a)));return So(a)?Xr(Ci(g),0,s).join(""):g.slice(0,s)}function y1(s,a,u,g){var T=a&v,P=Pa(s);function z(){for(var H=-1,X=arguments.length,ce=-1,le=g.length,fe=J(le+X),be=this&&this!==xn&&this instanceof z?P:s;++ce<le;)fe[ce]=g[ce];for(;X--;)fe[ce++]=arguments[++H];return Zn(be,T?u:this,fe)}return z}function s_(s){return function(a,u,g){return g&&typeof g!="number"&&Bn(a,u,g)&&(u=g=t),a=xr(a),u===t?(u=a,a=0):u=xr(u),g=g===t?a<u?1:-1:xr(g),s1(a,u,g,s)}}function pl(s){return function(a,u){return typeof a=="string"&&typeof u=="string"||(a=mi(a),u=mi(u)),s(a,u)}}function o_(s,a,u,g,T,P,z,H,X,ce){var le=a&b,fe=le?z:t,be=le?t:z,Oe=le?P:t,Ye=le?t:P;a|=le?k:U,a&=~(le?U:k),a&C||(a&=-4);var ht=[s,a,T,Oe,fe,Ye,be,H,X,ce],je=u.apply(t,ht);return nf(s)&&v_(je,ht),je.placeholder=g,x_(je,s,a)}function Kh(s){var a=hn[s];return function(u,g){if(u=mi(u),g=g==null?0:Rn(st(g),292),g&&xg(u)){var T=(Ct(u)+"e").split("e"),P=a(T[0]+"e"+(+T[1]+g));return T=(Ct(P)+"e").split("e"),+(T[0]+"e"+(+T[1]-g))}return a(u)}}var S1=To&&1/Vc(new To([,-0]))[1]==pe?function(s){return new To(s)}:vf;function a_(s){return function(a){var u=Cn(a);return u==bt?Th(a):u==ue?BA(a):PA(a,s(a))}}function mr(s,a,u,g,T,P,z,H){var X=a&_;if(!X&&typeof s!="function")throw new ui(c);var ce=g?g.length:0;if(ce||(a&=-97,g=T=t),z=z===t?z:fn(st(z),0),H=H===t?H:st(H),ce-=T?T.length:0,a&U){var le=g,fe=T;g=T=t}var be=X?t:Jh(s),Oe=[s,a,u,g,T,le,fe,P,z,H];if(be&&N1(Oe,be),s=Oe[0],a=Oe[1],u=Oe[2],g=Oe[3],T=Oe[4],H=Oe[9]=Oe[9]===t?X?0:s.length:fn(Oe[9]-ce,0),!H&&a&(b|L)&&(a&=-25),!a||a==v)var Ye=v1(s,a,u);else a==b||a==L?Ye=x1(s,a,H):(a==k||a==(v|k))&&!T.length?Ye=y1(s,a,u,g):Ye=hl.apply(t,Oe);var ht=be?Hg:v_;return x_(ht(Ye,Oe),s,a)}function c_(s,a,u,g){return s===t||Li(s,bo[u])&&!It.call(g,u)?a:s}function l_(s,a,u,g,T,P){return qt(s)&&qt(a)&&(P.set(a,s),al(s,a,t,l_,P),P.delete(a)),s}function M1(s){return Da(s)?t:s}function u_(s,a,u,g,T,P){var z=u&M,H=s.length,X=a.length;if(H!=X&&!(z&&X>H))return!1;var ce=P.get(s),le=P.get(a);if(ce&&le)return ce==a&&le==s;var fe=-1,be=!0,Oe=u&A?new vs:t;for(P.set(s,a),P.set(a,s);++fe<H;){var Ye=s[fe],ht=a[fe];if(g)var je=z?g(ht,Ye,fe,a,s,P):g(Ye,ht,fe,s,a,P);if(je!==t){if(je)continue;be=!1;break}if(Oe){if(!xh(a,function(vt,Et){if(!xa(Oe,Et)&&(Ye===vt||T(Ye,vt,u,g,P)))return Oe.push(Et)})){be=!1;break}}else if(!(Ye===ht||T(Ye,ht,u,g,P))){be=!1;break}}return P.delete(s),P.delete(a),be}function E1(s,a,u,g,T,P,z){switch(u){case Te:if(s.byteLength!=a.byteLength||s.byteOffset!=a.byteOffset)return!1;s=s.buffer,a=a.buffer;case ve:return!(s.byteLength!=a.byteLength||!P(new Kc(s),new Kc(a)));case Ge:case Xe:case He:return Li(+s,+a);case j:return s.name==a.name&&s.message==a.message;case ae:case de:return s==a+"";case bt:var H=Th;case ue:var X=g&M;if(H||(H=Vc),s.size!=a.size&&!X)return!1;var ce=z.get(s);if(ce)return ce==a;g|=A,z.set(s,a);var le=u_(H(s),H(a),g,T,P,z);return z.delete(s),le;case Be:if(ba)return ba.call(s)==ba.call(a)}return!1}function b1(s,a,u,g,T,P){var z=u&M,H=Zh(s),X=H.length,ce=Zh(a),le=ce.length;if(X!=le&&!z)return!1;for(var fe=X;fe--;){var be=H[fe];if(!(z?be in a:It.call(a,be)))return!1}var Oe=P.get(s),Ye=P.get(a);if(Oe&&Ye)return Oe==a&&Ye==s;var ht=!0;P.set(s,a),P.set(a,s);for(var je=z;++fe<X;){be=H[fe];var vt=s[be],Et=a[be];if(g)var ei=z?g(Et,vt,be,a,s,P):g(vt,Et,be,s,a,P);if(!(ei===t?vt===Et||T(vt,Et,u,g,P):ei)){ht=!1;break}je||(je=be=="constructor")}if(ht&&!je){var zn=s.constructor,ti=a.constructor;zn!=ti&&"constructor"in s&&"constructor"in a&&!(typeof zn=="function"&&zn instanceof zn&&typeof ti=="function"&&ti instanceof ti)&&(ht=!1)}return P.delete(s),P.delete(a),ht}function gr(s){return sf(g_(s,t,T_),s+"")}function Zh(s){return Pg(s,gn,ef)}function $h(s){return Pg(s,Wn,h_)}var Jh=tl?function(s){return tl.get(s)}:vf;function ml(s){for(var a=s.name+"",u=Ao[a],g=It.call(Ao,a)?u.length:0;g--;){var T=u[g],P=T.func;if(P==null||P==s)return T.name}return a}function Po(s){var a=It.call(R,"placeholder")?R:s;return a.placeholder}function We(){var s=R.iteratee||gf;return s=s===gf?Dg:s,arguments.length?s(arguments[0],arguments[1]):s}function gl(s,a){var u=s.__data__;return I1(a)?u[typeof a=="string"?"string":"hash"]:u.map}function Qh(s){for(var a=gn(s),u=a.length;u--;){var g=a[u],T=s[g];a[u]=[g,T,p_(T)]}return a}function Ss(s,a){var u=UA(s,a);return Ig(u)?u:t}function T1(s){var a=It.call(s,gs),u=s[gs];try{s[gs]=t;var g=!0}catch{}var T=jc.call(s);return g&&(a?s[gs]=u:delete s[gs]),T}var ef=wh?function(s){return s==null?[]:(s=Nt(s),Br(wh(s),function(a){return _g.call(s,a)}))}:xf,h_=wh?function(s){for(var a=[];s;)zr(a,ef(s)),s=Zc(s);return a}:xf,Cn=Fn;(Rh&&Cn(new Rh(new ArrayBuffer(1)))!=Te||Sa&&Cn(new Sa)!=bt||Ch&&Cn(Ch.resolve())!=w||To&&Cn(new To)!=ue||Ma&&Cn(new Ma)!=De)&&(Cn=function(s){var a=Fn(s),u=a==B?s.constructor:t,g=u?Ms(u):"";if(g)switch(g){case aw:return Te;case cw:return bt;case lw:return w;case uw:return ue;case hw:return De}return a});function A1(s,a,u){for(var g=-1,T=u.length;++g<T;){var P=u[g],z=P.size;switch(P.type){case"drop":s+=z;break;case"dropRight":a-=z;break;case"take":a=Rn(a,s+z);break;case"takeRight":s=fn(s,a-z);break}}return{start:s,end:a}}function w1(s){var a=s.match(vo);return a?a[1].split(Bc):[]}function f_(s,a,u){a=Wr(a,s);for(var g=-1,T=a.length,P=!1;++g<T;){var z=Ji(a[g]);if(!(P=s!=null&&u(s,z)))break;s=s[z]}return P||++g!=T?P:(T=s==null?0:s.length,!!T&&El(T)&&_r(z,T)&&(it(s)||Es(s)))}function R1(s){var a=s.length,u=new s.constructor(a);return a&&typeof s[0]=="string"&&It.call(s,"index")&&(u.index=s.index,u.input=s.input),u}function d_(s){return typeof s.constructor=="function"&&!La(s)?wo(Zc(s)):{}}function C1(s,a,u){var g=s.constructor;switch(a){case ve:return jh(s);case Ge:case Xe:return new g(+s);case Te:return f1(s,u);case qe:case Le:case Ie:case ut:case ft:case St:case gt:case Mt:case Ue:return Kg(s,u);case bt:return new g;case He:case de:return new g(s);case ae:return d1(s);case ue:return new g;case Be:return p1(s)}}function P1(s,a){var u=a.length;if(!u)return s;var g=u-1;return a[g]=(u>1?"& ":"")+a[g],a=a.join(u>2?", ":" "),s.replace(Fc,`{
/* [wrapped with `+a+`] */
`)}function L1(s){return it(s)||Es(s)||!!(vg&&s&&s[vg])}function _r(s,a){var u=typeof s;return a=a??K,!!a&&(u=="number"||u!="symbol"&&Ae.test(s))&&s>-1&&s%1==0&&s<a}function Bn(s,a,u){if(!qt(u))return!1;var g=typeof a;return(g=="number"?Vn(u)&&_r(a,u.length):g=="string"&&a in u)?Li(u[a],s):!1}function tf(s,a){if(it(s))return!1;var u=typeof s;return u=="number"||u=="symbol"||u=="boolean"||s==null||Qn(s)?!0:$t.test(s)||!Zt.test(s)||a!=null&&s in Nt(a)}function I1(s){var a=typeof s;return a=="string"||a=="number"||a=="symbol"||a=="boolean"?s!=="__proto__":s===null}function nf(s){var a=ml(s),u=R[a];if(typeof u!="function"||!(a in yt.prototype))return!1;if(s===u)return!0;var g=Jh(u);return!!g&&s===g[0]}function D1(s){return!!pg&&pg in s}var O1=Xc?vr:yf;function La(s){var a=s&&s.constructor,u=typeof a=="function"&&a.prototype||bo;return s===u}function p_(s){return s===s&&!qt(s)}function m_(s,a){return function(u){return u==null?!1:u[s]===a&&(a!==t||s in Nt(u))}}function U1(s){var a=Sl(s,function(g){return u.size===f&&u.clear(),g}),u=a.cache;return a}function N1(s,a){var u=s[1],g=a[1],T=u|g,P=T<(v|_|O),z=g==O&&u==b||g==O&&u==I&&s[7].length<=a[8]||g==(O|I)&&a[7].length<=a[8]&&u==b;if(!(P||z))return s;g&v&&(s[2]=a[2],T|=u&v?0:C);var H=a[3];if(H){var X=s[3];s[3]=X?$g(X,H,a[4]):H,s[4]=X?kr(s[3],d):a[4]}return H=a[5],H&&(X=s[5],s[5]=X?Jg(X,H,a[6]):H,s[6]=X?kr(s[5],d):a[6]),H=a[7],H&&(s[7]=H),g&O&&(s[8]=s[8]==null?a[8]:Rn(s[8],a[8])),s[9]==null&&(s[9]=a[9]),s[0]=a[0],s[1]=T,s}function F1(s){var a=[];if(s!=null)for(var u in Nt(s))a.push(u);return a}function B1(s){return jc.call(s)}function g_(s,a,u){return a=fn(a===t?s.length-1:a,0),function(){for(var g=arguments,T=-1,P=fn(g.length-a,0),z=J(P);++T<P;)z[T]=g[a+T];T=-1;for(var H=J(a+1);++T<a;)H[T]=g[T];return H[a]=u(z),Zn(s,this,H)}}function __(s,a){return a.length<2?s:ys(s,di(a,0,-1))}function z1(s,a){for(var u=s.length,g=Rn(a.length,u),T=Gn(s);g--;){var P=a[g];s[g]=_r(P,u)?T[P]:t}return s}function rf(s,a){if(!(a==="constructor"&&typeof s[a]=="function")&&a!="__proto__")return s[a]}var v_=y_(Hg),Ia=ew||function(s,a){return xn.setTimeout(s,a)},sf=y_(c1);function x_(s,a,u){var g=a+"";return sf(s,P1(g,k1(w1(g),u)))}function y_(s){var a=0,u=0;return function(){var g=rw(),T=G-(g-u);if(u=g,T>0){if(++a>=V)return arguments[0]}else a=0;return s.apply(t,arguments)}}function _l(s,a){var u=-1,g=s.length,T=g-1;for(a=a===t?g:a;++u<a;){var P=kh(u,T),z=s[P];s[P]=s[u],s[u]=z}return s.length=a,s}var S_=U1(function(s){var a=[];return s.charCodeAt(0)===46&&a.push(""),s.replace(Un,function(u,g,T,P){a.push(T?P.replace(lh,"$1"):g||u)}),a});function Ji(s){if(typeof s=="string"||Qn(s))return s;var a=s+"";return a=="0"&&1/s==-1/0?"-0":a}function Ms(s){if(s!=null){try{return Yc.call(s)}catch{}try{return s+""}catch{}}return""}function k1(s,a){return li(ie,function(u){var g="_."+u[0];a&u[1]&&!Hc(s,g)&&s.push(g)}),s.sort()}function M_(s){if(s instanceof yt)return s.clone();var a=new hi(s.__wrapped__,s.__chain__);return a.__actions__=Gn(s.__actions__),a.__index__=s.__index__,a.__values__=s.__values__,a}function H1(s,a,u){(u?Bn(s,a,u):a===t)?a=1:a=fn(st(a),0);var g=s==null?0:s.length;if(!g||a<1)return[];for(var T=0,P=0,z=J(Qc(g/a));T<g;)z[P++]=di(s,T,T+=a);return z}function G1(s){for(var a=-1,u=s==null?0:s.length,g=0,T=[];++a<u;){var P=s[a];P&&(T[g++]=P)}return T}function V1(){var s=arguments.length;if(!s)return[];for(var a=J(s-1),u=arguments[0],g=s;g--;)a[g-1]=arguments[g];return zr(it(u)?Gn(u):[u],yn(a,1))}var W1=pt(function(s,a){return tn(s)?Aa(s,yn(a,1,tn,!0)):[]}),X1=pt(function(s,a){var u=pi(a);return tn(u)&&(u=t),tn(s)?Aa(s,yn(a,1,tn,!0),We(u,2)):[]}),Y1=pt(function(s,a){var u=pi(a);return tn(u)&&(u=t),tn(s)?Aa(s,yn(a,1,tn,!0),t,u):[]});function j1(s,a,u){var g=s==null?0:s.length;return g?(a=u||a===t?1:st(a),di(s,a<0?0:a,g)):[]}function q1(s,a,u){var g=s==null?0:s.length;return g?(a=u||a===t?1:st(a),a=g-a,di(s,0,a<0?0:a)):[]}function K1(s,a){return s&&s.length?ll(s,We(a,3),!0,!0):[]}function Z1(s,a){return s&&s.length?ll(s,We(a,3),!0):[]}function $1(s,a,u,g){var T=s==null?0:s.length;return T?(u&&typeof u!="number"&&Bn(s,a,u)&&(u=0,g=T),Vw(s,a,u,g)):[]}function E_(s,a,u){var g=s==null?0:s.length;if(!g)return-1;var T=u==null?0:st(u);return T<0&&(T=fn(g+T,0)),Gc(s,We(a,3),T)}function b_(s,a,u){var g=s==null?0:s.length;if(!g)return-1;var T=g-1;return u!==t&&(T=st(u),T=u<0?fn(g+T,0):Rn(T,g-1)),Gc(s,We(a,3),T,!0)}function T_(s){var a=s==null?0:s.length;return a?yn(s,1):[]}function J1(s){var a=s==null?0:s.length;return a?yn(s,pe):[]}function Q1(s,a){var u=s==null?0:s.length;return u?(a=a===t?1:st(a),yn(s,a)):[]}function eR(s){for(var a=-1,u=s==null?0:s.length,g={};++a<u;){var T=s[a];g[T[0]]=T[1]}return g}function A_(s){return s&&s.length?s[0]:t}function tR(s,a,u){var g=s==null?0:s.length;if(!g)return-1;var T=u==null?0:st(u);return T<0&&(T=fn(g+T,0)),yo(s,a,T)}function nR(s){var a=s==null?0:s.length;return a?di(s,0,-1):[]}var iR=pt(function(s){var a=Xt(s,Xh);return a.length&&a[0]===s[0]?Uh(a):[]}),rR=pt(function(s){var a=pi(s),u=Xt(s,Xh);return a===pi(u)?a=t:u.pop(),u.length&&u[0]===s[0]?Uh(u,We(a,2)):[]}),sR=pt(function(s){var a=pi(s),u=Xt(s,Xh);return a=typeof a=="function"?a:t,a&&u.pop(),u.length&&u[0]===s[0]?Uh(u,t,a):[]});function oR(s,a){return s==null?"":nw.call(s,a)}function pi(s){var a=s==null?0:s.length;return a?s[a-1]:t}function aR(s,a,u){var g=s==null?0:s.length;if(!g)return-1;var T=g;return u!==t&&(T=st(u),T=T<0?fn(g+T,0):Rn(T,g-1)),a===a?kA(s,a,T):Gc(s,og,T,!0)}function cR(s,a){return s&&s.length?Fg(s,st(a)):t}var lR=pt(w_);function w_(s,a){return s&&s.length&&a&&a.length?zh(s,a):s}function uR(s,a,u){return s&&s.length&&a&&a.length?zh(s,a,We(u,2)):s}function hR(s,a,u){return s&&s.length&&a&&a.length?zh(s,a,t,u):s}var fR=gr(function(s,a){var u=s==null?0:s.length,g=Lh(s,a);return kg(s,Xt(a,function(T){return _r(T,u)?+T:T}).sort(Zg)),g});function dR(s,a){var u=[];if(!(s&&s.length))return u;var g=-1,T=[],P=s.length;for(a=We(a,3);++g<P;){var z=s[g];a(z,g,s)&&(u.push(z),T.push(g))}return kg(s,T),u}function of(s){return s==null?s:ow.call(s)}function pR(s,a,u){var g=s==null?0:s.length;return g?(u&&typeof u!="number"&&Bn(s,a,u)?(a=0,u=g):(a=a==null?0:st(a),u=u===t?g:st(u)),di(s,a,u)):[]}function mR(s,a){return cl(s,a)}function gR(s,a,u){return Gh(s,a,We(u,2))}function _R(s,a){var u=s==null?0:s.length;if(u){var g=cl(s,a);if(g<u&&Li(s[g],a))return g}return-1}function vR(s,a){return cl(s,a,!0)}function xR(s,a,u){return Gh(s,a,We(u,2),!0)}function yR(s,a){var u=s==null?0:s.length;if(u){var g=cl(s,a,!0)-1;if(Li(s[g],a))return g}return-1}function SR(s){return s&&s.length?Gg(s):[]}function MR(s,a){return s&&s.length?Gg(s,We(a,2)):[]}function ER(s){var a=s==null?0:s.length;return a?di(s,1,a):[]}function bR(s,a,u){return s&&s.length?(a=u||a===t?1:st(a),di(s,0,a<0?0:a)):[]}function TR(s,a,u){var g=s==null?0:s.length;return g?(a=u||a===t?1:st(a),a=g-a,di(s,a<0?0:a,g)):[]}function AR(s,a){return s&&s.length?ll(s,We(a,3),!1,!0):[]}function wR(s,a){return s&&s.length?ll(s,We(a,3)):[]}var RR=pt(function(s){return Vr(yn(s,1,tn,!0))}),CR=pt(function(s){var a=pi(s);return tn(a)&&(a=t),Vr(yn(s,1,tn,!0),We(a,2))}),PR=pt(function(s){var a=pi(s);return a=typeof a=="function"?a:t,Vr(yn(s,1,tn,!0),t,a)});function LR(s){return s&&s.length?Vr(s):[]}function IR(s,a){return s&&s.length?Vr(s,We(a,2)):[]}function DR(s,a){return a=typeof a=="function"?a:t,s&&s.length?Vr(s,t,a):[]}function af(s){if(!(s&&s.length))return[];var a=0;return s=Br(s,function(u){if(tn(u))return a=fn(u.length,a),!0}),Eh(a,function(u){return Xt(s,yh(u))})}function R_(s,a){if(!(s&&s.length))return[];var u=af(s);return a==null?u:Xt(u,function(g){return Zn(a,t,g)})}var OR=pt(function(s,a){return tn(s)?Aa(s,a):[]}),UR=pt(function(s){return Wh(Br(s,tn))}),NR=pt(function(s){var a=pi(s);return tn(a)&&(a=t),Wh(Br(s,tn),We(a,2))}),FR=pt(function(s){var a=pi(s);return a=typeof a=="function"?a:t,Wh(Br(s,tn),t,a)}),BR=pt(af);function zR(s,a){return Yg(s||[],a||[],Ta)}function kR(s,a){return Yg(s||[],a||[],Ca)}var HR=pt(function(s){var a=s.length,u=a>1?s[a-1]:t;return u=typeof u=="function"?(s.pop(),u):t,R_(s,u)});function C_(s){var a=R(s);return a.__chain__=!0,a}function GR(s,a){return a(s),s}function vl(s,a){return a(s)}var VR=gr(function(s){var a=s.length,u=a?s[0]:0,g=this.__wrapped__,T=function(P){return Lh(P,s)};return a>1||this.__actions__.length||!(g instanceof yt)||!_r(u)?this.thru(T):(g=g.slice(u,+u+(a?1:0)),g.__actions__.push({func:vl,args:[T],thisArg:t}),new hi(g,this.__chain__).thru(function(P){return a&&!P.length&&P.push(t),P}))});function WR(){return C_(this)}function XR(){return new hi(this.value(),this.__chain__)}function YR(){this.__values__===t&&(this.__values__=V_(this.value()));var s=this.__index__>=this.__values__.length,a=s?t:this.__values__[this.__index__++];return{done:s,value:a}}function jR(){return this}function qR(s){for(var a,u=this;u instanceof il;){var g=M_(u);g.__index__=0,g.__values__=t,a?T.__wrapped__=g:a=g;var T=g;u=u.__wrapped__}return T.__wrapped__=s,a}function KR(){var s=this.__wrapped__;if(s instanceof yt){var a=s;return this.__actions__.length&&(a=new yt(this)),a=a.reverse(),a.__actions__.push({func:vl,args:[of],thisArg:t}),new hi(a,this.__chain__)}return this.thru(of)}function ZR(){return Xg(this.__wrapped__,this.__actions__)}var $R=ul(function(s,a,u){It.call(s,u)?++s[u]:pr(s,u,1)});function JR(s,a,u){var g=it(s)?rg:Gw;return u&&Bn(s,a,u)&&(a=t),g(s,We(a,3))}function QR(s,a){var u=it(s)?Br:Rg;return u(s,We(a,3))}var eC=n_(E_),tC=n_(b_);function nC(s,a){return yn(xl(s,a),1)}function iC(s,a){return yn(xl(s,a),pe)}function rC(s,a,u){return u=u===t?1:st(u),yn(xl(s,a),u)}function P_(s,a){var u=it(s)?li:Gr;return u(s,We(a,3))}function L_(s,a){var u=it(s)?EA:wg;return u(s,We(a,3))}var sC=ul(function(s,a,u){It.call(s,u)?s[u].push(a):pr(s,u,[a])});function oC(s,a,u,g){s=Vn(s)?s:Io(s),u=u&&!g?st(u):0;var T=s.length;return u<0&&(u=fn(T+u,0)),bl(s)?u<=T&&s.indexOf(a,u)>-1:!!T&&yo(s,a,u)>-1}var aC=pt(function(s,a,u){var g=-1,T=typeof a=="function",P=Vn(s)?J(s.length):[];return Gr(s,function(z){P[++g]=T?Zn(a,z,u):wa(z,a,u)}),P}),cC=ul(function(s,a,u){pr(s,u,a)});function xl(s,a){var u=it(s)?Xt:Og;return u(s,We(a,3))}function lC(s,a,u,g){return s==null?[]:(it(a)||(a=a==null?[]:[a]),u=g?t:u,it(u)||(u=u==null?[]:[u]),Bg(s,a,u))}var uC=ul(function(s,a,u){s[u?0:1].push(a)},function(){return[[],[]]});function hC(s,a,u){var g=it(s)?vh:cg,T=arguments.length<3;return g(s,We(a,4),u,T,Gr)}function fC(s,a,u){var g=it(s)?bA:cg,T=arguments.length<3;return g(s,We(a,4),u,T,wg)}function dC(s,a){var u=it(s)?Br:Rg;return u(s,Ml(We(a,3)))}function pC(s){var a=it(s)?Eg:o1;return a(s)}function mC(s,a,u){(u?Bn(s,a,u):a===t)?a=1:a=st(a);var g=it(s)?Fw:a1;return g(s,a)}function gC(s){var a=it(s)?Bw:l1;return a(s)}function _C(s){if(s==null)return 0;if(Vn(s))return bl(s)?Mo(s):s.length;var a=Cn(s);return a==bt||a==ue?s.size:Fh(s).length}function vC(s,a,u){var g=it(s)?xh:u1;return u&&Bn(s,a,u)&&(a=t),g(s,We(a,3))}var xC=pt(function(s,a){if(s==null)return[];var u=a.length;return u>1&&Bn(s,a[0],a[1])?a=[]:u>2&&Bn(a[0],a[1],a[2])&&(a=[a[0]]),Bg(s,yn(a,1),[])}),yl=QA||function(){return xn.Date.now()};function yC(s,a){if(typeof a!="function")throw new ui(c);return s=st(s),function(){if(--s<1)return a.apply(this,arguments)}}function I_(s,a,u){return a=u?t:a,a=s&&a==null?s.length:a,mr(s,O,t,t,t,t,a)}function D_(s,a){var u;if(typeof a!="function")throw new ui(c);return s=st(s),function(){return--s>0&&(u=a.apply(this,arguments)),s<=1&&(a=t),u}}var cf=pt(function(s,a,u){var g=v;if(u.length){var T=kr(u,Po(cf));g|=k}return mr(s,g,a,u,T)}),O_=pt(function(s,a,u){var g=v|_;if(u.length){var T=kr(u,Po(O_));g|=k}return mr(a,g,s,u,T)});function U_(s,a,u){a=u?t:a;var g=mr(s,b,t,t,t,t,t,a);return g.placeholder=U_.placeholder,g}function N_(s,a,u){a=u?t:a;var g=mr(s,L,t,t,t,t,t,a);return g.placeholder=N_.placeholder,g}function F_(s,a,u){var g,T,P,z,H,X,ce=0,le=!1,fe=!1,be=!0;if(typeof s!="function")throw new ui(c);a=mi(a)||0,qt(u)&&(le=!!u.leading,fe="maxWait"in u,P=fe?fn(mi(u.maxWait)||0,a):P,be="trailing"in u?!!u.trailing:be);function Oe(nn){var Ii=g,yr=T;return g=T=t,ce=nn,z=s.apply(yr,Ii),z}function Ye(nn){return ce=nn,H=Ia(vt,a),le?Oe(nn):z}function ht(nn){var Ii=nn-X,yr=nn-ce,n0=a-Ii;return fe?Rn(n0,P-yr):n0}function je(nn){var Ii=nn-X,yr=nn-ce;return X===t||Ii>=a||Ii<0||fe&&yr>=P}function vt(){var nn=yl();if(je(nn))return Et(nn);H=Ia(vt,ht(nn))}function Et(nn){return H=t,be&&g?Oe(nn):(g=T=t,z)}function ei(){H!==t&&jg(H),ce=0,g=X=T=H=t}function zn(){return H===t?z:Et(yl())}function ti(){var nn=yl(),Ii=je(nn);if(g=arguments,T=this,X=nn,Ii){if(H===t)return Ye(X);if(fe)return jg(H),H=Ia(vt,a),Oe(X)}return H===t&&(H=Ia(vt,a)),z}return ti.cancel=ei,ti.flush=zn,ti}var SC=pt(function(s,a){return Ag(s,1,a)}),MC=pt(function(s,a,u){return Ag(s,mi(a)||0,u)});function EC(s){return mr(s,E)}function Sl(s,a){if(typeof s!="function"||a!=null&&typeof a!="function")throw new ui(c);var u=function(){var g=arguments,T=a?a.apply(this,g):g[0],P=u.cache;if(P.has(T))return P.get(T);var z=s.apply(this,g);return u.cache=P.set(T,z)||P,z};return u.cache=new(Sl.Cache||dr),u}Sl.Cache=dr;function Ml(s){if(typeof s!="function")throw new ui(c);return function(){var a=arguments;switch(a.length){case 0:return!s.call(this);case 1:return!s.call(this,a[0]);case 2:return!s.call(this,a[0],a[1]);case 3:return!s.call(this,a[0],a[1],a[2])}return!s.apply(this,a)}}function bC(s){return D_(2,s)}var TC=h1(function(s,a){a=a.length==1&&it(a[0])?Xt(a[0],$n(We())):Xt(yn(a,1),$n(We()));var u=a.length;return pt(function(g){for(var T=-1,P=Rn(g.length,u);++T<P;)g[T]=a[T].call(this,g[T]);return Zn(s,this,g)})}),lf=pt(function(s,a){var u=kr(a,Po(lf));return mr(s,k,t,a,u)}),B_=pt(function(s,a){var u=kr(a,Po(B_));return mr(s,U,t,a,u)}),AC=gr(function(s,a){return mr(s,I,t,t,t,a)});function wC(s,a){if(typeof s!="function")throw new ui(c);return a=a===t?a:st(a),pt(s,a)}function RC(s,a){if(typeof s!="function")throw new ui(c);return a=a==null?0:fn(st(a),0),pt(function(u){var g=u[a],T=Xr(u,0,a);return g&&zr(T,g),Zn(s,this,T)})}function CC(s,a,u){var g=!0,T=!0;if(typeof s!="function")throw new ui(c);return qt(u)&&(g="leading"in u?!!u.leading:g,T="trailing"in u?!!u.trailing:T),F_(s,a,{leading:g,maxWait:a,trailing:T})}function PC(s){return I_(s,1)}function LC(s,a){return lf(Yh(a),s)}function IC(){if(!arguments.length)return[];var s=arguments[0];return it(s)?s:[s]}function DC(s){return fi(s,x)}function OC(s,a){return a=typeof a=="function"?a:t,fi(s,x,a)}function UC(s){return fi(s,p|x)}function NC(s,a){return a=typeof a=="function"?a:t,fi(s,p|x,a)}function FC(s,a){return a==null||Tg(s,a,gn(a))}function Li(s,a){return s===a||s!==s&&a!==a}var BC=pl(Oh),zC=pl(function(s,a){return s>=a}),Es=Lg(function(){return arguments}())?Lg:function(s){return Jt(s)&&It.call(s,"callee")&&!_g.call(s,"callee")},it=J.isArray,kC=Jm?$n(Jm):qw;function Vn(s){return s!=null&&El(s.length)&&!vr(s)}function tn(s){return Jt(s)&&Vn(s)}function HC(s){return s===!0||s===!1||Jt(s)&&Fn(s)==Ge}var Yr=tw||yf,GC=Qm?$n(Qm):Kw;function VC(s){return Jt(s)&&s.nodeType===1&&!Da(s)}function WC(s){if(s==null)return!0;if(Vn(s)&&(it(s)||typeof s=="string"||typeof s.splice=="function"||Yr(s)||Lo(s)||Es(s)))return!s.length;var a=Cn(s);if(a==bt||a==ue)return!s.size;if(La(s))return!Fh(s).length;for(var u in s)if(It.call(s,u))return!1;return!0}function XC(s,a){return Ra(s,a)}function YC(s,a,u){u=typeof u=="function"?u:t;var g=u?u(s,a):t;return g===t?Ra(s,a,t,u):!!g}function uf(s){if(!Jt(s))return!1;var a=Fn(s);return a==j||a==lt||typeof s.message=="string"&&typeof s.name=="string"&&!Da(s)}function jC(s){return typeof s=="number"&&xg(s)}function vr(s){if(!qt(s))return!1;var a=Fn(s);return a==$e||a==ze||a==Se||a==te}function z_(s){return typeof s=="number"&&s==st(s)}function El(s){return typeof s=="number"&&s>-1&&s%1==0&&s<=K}function qt(s){var a=typeof s;return s!=null&&(a=="object"||a=="function")}function Jt(s){return s!=null&&typeof s=="object"}var k_=eg?$n(eg):$w;function qC(s,a){return s===a||Nh(s,a,Qh(a))}function KC(s,a,u){return u=typeof u=="function"?u:t,Nh(s,a,Qh(a),u)}function ZC(s){return H_(s)&&s!=+s}function $C(s){if(O1(s))throw new tt(o);return Ig(s)}function JC(s){return s===null}function QC(s){return s==null}function H_(s){return typeof s=="number"||Jt(s)&&Fn(s)==He}function Da(s){if(!Jt(s)||Fn(s)!=B)return!1;var a=Zc(s);if(a===null)return!0;var u=It.call(a,"constructor")&&a.constructor;return typeof u=="function"&&u instanceof u&&Yc.call(u)==KA}var hf=tg?$n(tg):Jw;function eP(s){return z_(s)&&s>=-9007199254740991&&s<=K}var G_=ng?$n(ng):Qw;function bl(s){return typeof s=="string"||!it(s)&&Jt(s)&&Fn(s)==de}function Qn(s){return typeof s=="symbol"||Jt(s)&&Fn(s)==Be}var Lo=ig?$n(ig):e1;function tP(s){return s===t}function nP(s){return Jt(s)&&Cn(s)==De}function iP(s){return Jt(s)&&Fn(s)==Ve}var rP=pl(Bh),sP=pl(function(s,a){return s<=a});function V_(s){if(!s)return[];if(Vn(s))return bl(s)?Ci(s):Gn(s);if(ya&&s[ya])return FA(s[ya]());var a=Cn(s),u=a==bt?Th:a==ue?Vc:Io;return u(s)}function xr(s){if(!s)return s===0?s:0;if(s=mi(s),s===pe||s===-1/0){var a=s<0?-1:1;return a*he}return s===s?s:0}function st(s){var a=xr(s),u=a%1;return a===a?u?a-u:a:0}function W_(s){return s?xs(st(s),0,Ee):0}function mi(s){if(typeof s=="number")return s;if(Qn(s))return me;if(qt(s)){var a=typeof s.valueOf=="function"?s.valueOf():s;s=qt(a)?a+"":a}if(typeof s!="string")return s===0?s:+s;s=lg(s);var u=Q.test(s);return u||$.test(s)?yA(s.slice(2),u?2:8):Y.test(s)?me:+s}function X_(s){return $i(s,Wn(s))}function oP(s){return s?xs(st(s),-9007199254740991,K):s===0?s:0}function Ct(s){return s==null?"":Jn(s)}var aP=Ro(function(s,a){if(La(a)||Vn(a)){$i(a,gn(a),s);return}for(var u in a)It.call(a,u)&&Ta(s,u,a[u])}),Y_=Ro(function(s,a){$i(a,Wn(a),s)}),Tl=Ro(function(s,a,u,g){$i(a,Wn(a),s,g)}),cP=Ro(function(s,a,u,g){$i(a,gn(a),s,g)}),lP=gr(Lh);function uP(s,a){var u=wo(s);return a==null?u:bg(u,a)}var hP=pt(function(s,a){s=Nt(s);var u=-1,g=a.length,T=g>2?a[2]:t;for(T&&Bn(a[0],a[1],T)&&(g=1);++u<g;)for(var P=a[u],z=Wn(P),H=-1,X=z.length;++H<X;){var ce=z[H],le=s[ce];(le===t||Li(le,bo[ce])&&!It.call(s,ce))&&(s[ce]=P[ce])}return s}),fP=pt(function(s){return s.push(t,l_),Zn(j_,t,s)});function dP(s,a){return sg(s,We(a,3),Zi)}function pP(s,a){return sg(s,We(a,3),Dh)}function mP(s,a){return s==null?s:Ih(s,We(a,3),Wn)}function gP(s,a){return s==null?s:Cg(s,We(a,3),Wn)}function _P(s,a){return s&&Zi(s,We(a,3))}function vP(s,a){return s&&Dh(s,We(a,3))}function xP(s){return s==null?[]:ol(s,gn(s))}function yP(s){return s==null?[]:ol(s,Wn(s))}function ff(s,a,u){var g=s==null?t:ys(s,a);return g===t?u:g}function SP(s,a){return s!=null&&f_(s,a,Ww)}function df(s,a){return s!=null&&f_(s,a,Xw)}var MP=r_(function(s,a,u){a!=null&&typeof a.toString!="function"&&(a=jc.call(a)),s[a]=u},mf(Xn)),EP=r_(function(s,a,u){a!=null&&typeof a.toString!="function"&&(a=jc.call(a)),It.call(s,a)?s[a].push(u):s[a]=[u]},We),bP=pt(wa);function gn(s){return Vn(s)?Mg(s):Fh(s)}function Wn(s){return Vn(s)?Mg(s,!0):t1(s)}function TP(s,a){var u={};return a=We(a,3),Zi(s,function(g,T,P){pr(u,a(g,T,P),g)}),u}function AP(s,a){var u={};return a=We(a,3),Zi(s,function(g,T,P){pr(u,T,a(g,T,P))}),u}var wP=Ro(function(s,a,u){al(s,a,u)}),j_=Ro(function(s,a,u,g){al(s,a,u,g)}),RP=gr(function(s,a){var u={};if(s==null)return u;var g=!1;a=Xt(a,function(P){return P=Wr(P,s),g||(g=P.length>1),P}),$i(s,$h(s),u),g&&(u=fi(u,p|m|x,M1));for(var T=a.length;T--;)Vh(u,a[T]);return u});function CP(s,a){return q_(s,Ml(We(a)))}var PP=gr(function(s,a){return s==null?{}:i1(s,a)});function q_(s,a){if(s==null)return{};var u=Xt($h(s),function(g){return[g]});return a=We(a),zg(s,u,function(g,T){return a(g,T[0])})}function LP(s,a,u){a=Wr(a,s);var g=-1,T=a.length;for(T||(T=1,s=t);++g<T;){var P=s==null?t:s[Ji(a[g])];P===t&&(g=T,P=u),s=vr(P)?P.call(s):P}return s}function IP(s,a,u){return s==null?s:Ca(s,a,u)}function DP(s,a,u,g){return g=typeof g=="function"?g:t,s==null?s:Ca(s,a,u,g)}var K_=a_(gn),Z_=a_(Wn);function OP(s,a,u){var g=it(s),T=g||Yr(s)||Lo(s);if(a=We(a,4),u==null){var P=s&&s.constructor;T?u=g?new P:[]:qt(s)?u=vr(P)?wo(Zc(s)):{}:u={}}return(T?li:Zi)(s,function(z,H,X){return a(u,z,H,X)}),u}function UP(s,a){return s==null?!0:Vh(s,a)}function NP(s,a,u){return s==null?s:Wg(s,a,Yh(u))}function FP(s,a,u,g){return g=typeof g=="function"?g:t,s==null?s:Wg(s,a,Yh(u),g)}function Io(s){return s==null?[]:bh(s,gn(s))}function BP(s){return s==null?[]:bh(s,Wn(s))}function zP(s,a,u){return u===t&&(u=a,a=t),u!==t&&(u=mi(u),u=u===u?u:0),a!==t&&(a=mi(a),a=a===a?a:0),xs(mi(s),a,u)}function kP(s,a,u){return a=xr(a),u===t?(u=a,a=0):u=xr(u),s=mi(s),Yw(s,a,u)}function HP(s,a,u){if(u&&typeof u!="boolean"&&Bn(s,a,u)&&(a=u=t),u===t&&(typeof a=="boolean"?(u=a,a=t):typeof s=="boolean"&&(u=s,s=t)),s===t&&a===t?(s=0,a=1):(s=xr(s),a===t?(a=s,s=0):a=xr(a)),s>a){var g=s;s=a,a=g}if(u||s%1||a%1){var T=yg();return Rn(s+T*(a-s+xA("1e-"+((T+"").length-1))),a)}return kh(s,a)}var GP=Co(function(s,a,u){return a=a.toLowerCase(),s+(u?$_(a):a)});function $_(s){return pf(Ct(s).toLowerCase())}function J_(s){return s=Ct(s),s&&s.replace(Fe,IA).replace(lA,"")}function VP(s,a,u){s=Ct(s),a=Jn(a);var g=s.length;u=u===t?g:xs(st(u),0,g);var T=u;return u-=a.length,u>=0&&s.slice(u,T)==a}function WP(s){return s=Ct(s),s&&dt.test(s)?s.replace(Re,DA):s}function XP(s){return s=Ct(s),s&&ji.test(s)?s.replace(An,"\\$&"):s}var YP=Co(function(s,a,u){return s+(u?"-":"")+a.toLowerCase()}),jP=Co(function(s,a,u){return s+(u?" ":"")+a.toLowerCase()}),qP=t_("toLowerCase");function KP(s,a,u){s=Ct(s),a=st(a);var g=a?Mo(s):0;if(!a||g>=a)return s;var T=(a-g)/2;return dl(el(T),u)+s+dl(Qc(T),u)}function ZP(s,a,u){s=Ct(s),a=st(a);var g=a?Mo(s):0;return a&&g<a?s+dl(a-g,u):s}function $P(s,a,u){s=Ct(s),a=st(a);var g=a?Mo(s):0;return a&&g<a?dl(a-g,u)+s:s}function JP(s,a,u){return u||a==null?a=0:a&&(a=+a),sw(Ct(s).replace(qi,""),a||0)}function QP(s,a,u){return(u?Bn(s,a,u):a===t)?a=1:a=st(a),Hh(Ct(s),a)}function eL(){var s=arguments,a=Ct(s[0]);return s.length<3?a:a.replace(s[1],s[2])}var tL=Co(function(s,a,u){return s+(u?"_":"")+a.toLowerCase()});function nL(s,a,u){return u&&typeof u!="number"&&Bn(s,a,u)&&(a=u=t),u=u===t?Ee:u>>>0,u?(s=Ct(s),s&&(typeof a=="string"||a!=null&&!hf(a))&&(a=Jn(a),!a&&So(s))?Xr(Ci(s),0,u):s.split(a,u)):[]}var iL=Co(function(s,a,u){return s+(u?" ":"")+pf(a)});function rL(s,a,u){return s=Ct(s),u=u==null?0:xs(st(u),0,s.length),a=Jn(a),s.slice(u,u+a.length)==a}function sL(s,a,u){var g=R.templateSettings;u&&Bn(s,a,u)&&(a=t),s=Ct(s),a=Tl({},a,g,c_);var T=Tl({},a.imports,g.imports,c_),P=gn(T),z=bh(T,P),H,X,ce=0,le=a.interpolate||ke,fe="__p += '",be=Ah((a.escape||ke).source+"|"+le.source+"|"+(le===At?uh:ke).source+"|"+(a.evaluate||ke).source+"|$","g"),Oe="//# sourceURL="+(It.call(a,"sourceURL")?(a.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++pA+"]")+`
`;s.replace(be,function(je,vt,Et,ei,zn,ti){return Et||(Et=ei),fe+=s.slice(ce,ti).replace(Ze,OA),vt&&(H=!0,fe+=`' +
__e(`+vt+`) +
'`),zn&&(X=!0,fe+=`';
`+zn+`;
__p += '`),Et&&(fe+=`' +
((__t = (`+Et+`)) == null ? '' : __t) +
'`),ce=ti+je.length,je}),fe+=`';
`;var Ye=It.call(a,"variable")&&a.variable;if(!Ye)fe=`with (obj) {
`+fe+`
}
`;else if(ch.test(Ye))throw new tt(l);fe=(X?fe.replace(S,""):fe).replace(Z,"$1").replace(oe,"$1;"),fe="function("+(Ye||"obj")+`) {
`+(Ye?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(H?", __e = _.escape":"")+(X?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+fe+`return __p
}`;var ht=e0(function(){return wt(P,Oe+"return "+fe).apply(t,z)});if(ht.source=fe,uf(ht))throw ht;return ht}function oL(s){return Ct(s).toLowerCase()}function aL(s){return Ct(s).toUpperCase()}function cL(s,a,u){if(s=Ct(s),s&&(u||a===t))return lg(s);if(!s||!(a=Jn(a)))return s;var g=Ci(s),T=Ci(a),P=ug(g,T),z=hg(g,T)+1;return Xr(g,P,z).join("")}function lL(s,a,u){if(s=Ct(s),s&&(u||a===t))return s.slice(0,dg(s)+1);if(!s||!(a=Jn(a)))return s;var g=Ci(s),T=hg(g,Ci(a))+1;return Xr(g,0,T).join("")}function uL(s,a,u){if(s=Ct(s),s&&(u||a===t))return s.replace(qi,"");if(!s||!(a=Jn(a)))return s;var g=Ci(s),T=ug(g,Ci(a));return Xr(g,T).join("")}function hL(s,a){var u=y,g=F;if(qt(a)){var T="separator"in a?a.separator:T;u="length"in a?st(a.length):u,g="omission"in a?Jn(a.omission):g}s=Ct(s);var P=s.length;if(So(s)){var z=Ci(s);P=z.length}if(u>=P)return s;var H=u-Mo(g);if(H<1)return g;var X=z?Xr(z,0,H).join(""):s.slice(0,H);if(T===t)return X+g;if(z&&(H+=X.length-H),hf(T)){if(s.slice(H).search(T)){var ce,le=X;for(T.global||(T=Ah(T.source,Ct(D.exec(T))+"g")),T.lastIndex=0;ce=T.exec(le);)var fe=ce.index;X=X.slice(0,fe===t?H:fe)}}else if(s.indexOf(Jn(T),H)!=H){var be=X.lastIndexOf(T);be>-1&&(X=X.slice(0,be))}return X+g}function fL(s){return s=Ct(s),s&&_t.test(s)?s.replace(xe,HA):s}var dL=Co(function(s,a,u){return s+(u?" ":"")+a.toUpperCase()}),pf=t_("toUpperCase");function Q_(s,a,u){return s=Ct(s),a=u?t:a,a===t?NA(s)?WA(s):wA(s):s.match(a)||[]}var e0=pt(function(s,a){try{return Zn(s,t,a)}catch(u){return uf(u)?u:new tt(u)}}),pL=gr(function(s,a){return li(a,function(u){u=Ji(u),pr(s,u,cf(s[u],s))}),s});function mL(s){var a=s==null?0:s.length,u=We();return s=a?Xt(s,function(g){if(typeof g[1]!="function")throw new ui(c);return[u(g[0]),g[1]]}):[],pt(function(g){for(var T=-1;++T<a;){var P=s[T];if(Zn(P[0],this,g))return Zn(P[1],this,g)}})}function gL(s){return Hw(fi(s,p))}function mf(s){return function(){return s}}function _L(s,a){return s==null||s!==s?a:s}var vL=i_(),xL=i_(!0);function Xn(s){return s}function gf(s){return Dg(typeof s=="function"?s:fi(s,p))}function yL(s){return Ug(fi(s,p))}function SL(s,a){return Ng(s,fi(a,p))}var ML=pt(function(s,a){return function(u){return wa(u,s,a)}}),EL=pt(function(s,a){return function(u){return wa(s,u,a)}});function _f(s,a,u){var g=gn(a),T=ol(a,g);u==null&&!(qt(a)&&(T.length||!g.length))&&(u=a,a=s,s=this,T=ol(a,gn(a)));var P=!(qt(u)&&"chain"in u)||!!u.chain,z=vr(s);return li(T,function(H){var X=a[H];s[H]=X,z&&(s.prototype[H]=function(){var ce=this.__chain__;if(P||ce){var le=s(this.__wrapped__),fe=le.__actions__=Gn(this.__actions__);return fe.push({func:X,args:arguments,thisArg:s}),le.__chain__=ce,le}return X.apply(s,zr([this.value()],arguments))})}),s}function bL(){return xn._===this&&(xn._=ZA),this}function vf(){}function TL(s){return s=st(s),pt(function(a){return Fg(a,s)})}var AL=qh(Xt),wL=qh(rg),RL=qh(xh);function t0(s){return tf(s)?yh(Ji(s)):r1(s)}function CL(s){return function(a){return s==null?t:ys(s,a)}}var PL=s_(),LL=s_(!0);function xf(){return[]}function yf(){return!1}function IL(){return{}}function DL(){return""}function OL(){return!0}function UL(s,a){if(s=st(s),s<1||s>K)return[];var u=Ee,g=Rn(s,Ee);a=We(a),s-=Ee;for(var T=Eh(g,a);++u<s;)a(u);return T}function NL(s){return it(s)?Xt(s,Ji):Qn(s)?[s]:Gn(S_(Ct(s)))}function FL(s){var a=++qA;return Ct(s)+a}var BL=fl(function(s,a){return s+a},0),zL=Kh("ceil"),kL=fl(function(s,a){return s/a},1),HL=Kh("floor");function GL(s){return s&&s.length?sl(s,Xn,Oh):t}function VL(s,a){return s&&s.length?sl(s,We(a,2),Oh):t}function WL(s){return ag(s,Xn)}function XL(s,a){return ag(s,We(a,2))}function YL(s){return s&&s.length?sl(s,Xn,Bh):t}function jL(s,a){return s&&s.length?sl(s,We(a,2),Bh):t}var qL=fl(function(s,a){return s*a},1),KL=Kh("round"),ZL=fl(function(s,a){return s-a},0);function $L(s){return s&&s.length?Mh(s,Xn):0}function JL(s,a){return s&&s.length?Mh(s,We(a,2)):0}return R.after=yC,R.ary=I_,R.assign=aP,R.assignIn=Y_,R.assignInWith=Tl,R.assignWith=cP,R.at=lP,R.before=D_,R.bind=cf,R.bindAll=pL,R.bindKey=O_,R.castArray=IC,R.chain=C_,R.chunk=H1,R.compact=G1,R.concat=V1,R.cond=mL,R.conforms=gL,R.constant=mf,R.countBy=$R,R.create=uP,R.curry=U_,R.curryRight=N_,R.debounce=F_,R.defaults=hP,R.defaultsDeep=fP,R.defer=SC,R.delay=MC,R.difference=W1,R.differenceBy=X1,R.differenceWith=Y1,R.drop=j1,R.dropRight=q1,R.dropRightWhile=K1,R.dropWhile=Z1,R.fill=$1,R.filter=QR,R.flatMap=nC,R.flatMapDeep=iC,R.flatMapDepth=rC,R.flatten=T_,R.flattenDeep=J1,R.flattenDepth=Q1,R.flip=EC,R.flow=vL,R.flowRight=xL,R.fromPairs=eR,R.functions=xP,R.functionsIn=yP,R.groupBy=sC,R.initial=nR,R.intersection=iR,R.intersectionBy=rR,R.intersectionWith=sR,R.invert=MP,R.invertBy=EP,R.invokeMap=aC,R.iteratee=gf,R.keyBy=cC,R.keys=gn,R.keysIn=Wn,R.map=xl,R.mapKeys=TP,R.mapValues=AP,R.matches=yL,R.matchesProperty=SL,R.memoize=Sl,R.merge=wP,R.mergeWith=j_,R.method=ML,R.methodOf=EL,R.mixin=_f,R.negate=Ml,R.nthArg=TL,R.omit=RP,R.omitBy=CP,R.once=bC,R.orderBy=lC,R.over=AL,R.overArgs=TC,R.overEvery=wL,R.overSome=RL,R.partial=lf,R.partialRight=B_,R.partition=uC,R.pick=PP,R.pickBy=q_,R.property=t0,R.propertyOf=CL,R.pull=lR,R.pullAll=w_,R.pullAllBy=uR,R.pullAllWith=hR,R.pullAt=fR,R.range=PL,R.rangeRight=LL,R.rearg=AC,R.reject=dC,R.remove=dR,R.rest=wC,R.reverse=of,R.sampleSize=mC,R.set=IP,R.setWith=DP,R.shuffle=gC,R.slice=pR,R.sortBy=xC,R.sortedUniq=SR,R.sortedUniqBy=MR,R.split=nL,R.spread=RC,R.tail=ER,R.take=bR,R.takeRight=TR,R.takeRightWhile=AR,R.takeWhile=wR,R.tap=GR,R.throttle=CC,R.thru=vl,R.toArray=V_,R.toPairs=K_,R.toPairsIn=Z_,R.toPath=NL,R.toPlainObject=X_,R.transform=OP,R.unary=PC,R.union=RR,R.unionBy=CR,R.unionWith=PR,R.uniq=LR,R.uniqBy=IR,R.uniqWith=DR,R.unset=UP,R.unzip=af,R.unzipWith=R_,R.update=NP,R.updateWith=FP,R.values=Io,R.valuesIn=BP,R.without=OR,R.words=Q_,R.wrap=LC,R.xor=UR,R.xorBy=NR,R.xorWith=FR,R.zip=BR,R.zipObject=zR,R.zipObjectDeep=kR,R.zipWith=HR,R.entries=K_,R.entriesIn=Z_,R.extend=Y_,R.extendWith=Tl,_f(R,R),R.add=BL,R.attempt=e0,R.camelCase=GP,R.capitalize=$_,R.ceil=zL,R.clamp=zP,R.clone=DC,R.cloneDeep=UC,R.cloneDeepWith=NC,R.cloneWith=OC,R.conformsTo=FC,R.deburr=J_,R.defaultTo=_L,R.divide=kL,R.endsWith=VP,R.eq=Li,R.escape=WP,R.escapeRegExp=XP,R.every=JR,R.find=eC,R.findIndex=E_,R.findKey=dP,R.findLast=tC,R.findLastIndex=b_,R.findLastKey=pP,R.floor=HL,R.forEach=P_,R.forEachRight=L_,R.forIn=mP,R.forInRight=gP,R.forOwn=_P,R.forOwnRight=vP,R.get=ff,R.gt=BC,R.gte=zC,R.has=SP,R.hasIn=df,R.head=A_,R.identity=Xn,R.includes=oC,R.indexOf=tR,R.inRange=kP,R.invoke=bP,R.isArguments=Es,R.isArray=it,R.isArrayBuffer=kC,R.isArrayLike=Vn,R.isArrayLikeObject=tn,R.isBoolean=HC,R.isBuffer=Yr,R.isDate=GC,R.isElement=VC,R.isEmpty=WC,R.isEqual=XC,R.isEqualWith=YC,R.isError=uf,R.isFinite=jC,R.isFunction=vr,R.isInteger=z_,R.isLength=El,R.isMap=k_,R.isMatch=qC,R.isMatchWith=KC,R.isNaN=ZC,R.isNative=$C,R.isNil=QC,R.isNull=JC,R.isNumber=H_,R.isObject=qt,R.isObjectLike=Jt,R.isPlainObject=Da,R.isRegExp=hf,R.isSafeInteger=eP,R.isSet=G_,R.isString=bl,R.isSymbol=Qn,R.isTypedArray=Lo,R.isUndefined=tP,R.isWeakMap=nP,R.isWeakSet=iP,R.join=oR,R.kebabCase=YP,R.last=pi,R.lastIndexOf=aR,R.lowerCase=jP,R.lowerFirst=qP,R.lt=rP,R.lte=sP,R.max=GL,R.maxBy=VL,R.mean=WL,R.meanBy=XL,R.min=YL,R.minBy=jL,R.stubArray=xf,R.stubFalse=yf,R.stubObject=IL,R.stubString=DL,R.stubTrue=OL,R.multiply=qL,R.nth=cR,R.noConflict=bL,R.noop=vf,R.now=yl,R.pad=KP,R.padEnd=ZP,R.padStart=$P,R.parseInt=JP,R.random=HP,R.reduce=hC,R.reduceRight=fC,R.repeat=QP,R.replace=eL,R.result=LP,R.round=KL,R.runInContext=W,R.sample=pC,R.size=_C,R.snakeCase=tL,R.some=vC,R.sortedIndex=mR,R.sortedIndexBy=gR,R.sortedIndexOf=_R,R.sortedLastIndex=vR,R.sortedLastIndexBy=xR,R.sortedLastIndexOf=yR,R.startCase=iL,R.startsWith=rL,R.subtract=ZL,R.sum=$L,R.sumBy=JL,R.template=sL,R.times=UL,R.toFinite=xr,R.toInteger=st,R.toLength=W_,R.toLower=oL,R.toNumber=mi,R.toSafeInteger=oP,R.toString=Ct,R.toUpper=aL,R.trim=cL,R.trimEnd=lL,R.trimStart=uL,R.truncate=hL,R.unescape=fL,R.uniqueId=FL,R.upperCase=dL,R.upperFirst=pf,R.each=P_,R.eachRight=L_,R.first=A_,_f(R,function(){var s={};return Zi(R,function(a,u){It.call(R.prototype,u)||(s[u]=a)}),s}(),{chain:!1}),R.VERSION=n,li(["bind","bindKey","curry","curryRight","partial","partialRight"],function(s){R[s].placeholder=R}),li(["drop","take"],function(s,a){yt.prototype[s]=function(u){u=u===t?1:fn(st(u),0);var g=this.__filtered__&&!a?new yt(this):this.clone();return g.__filtered__?g.__takeCount__=Rn(u,g.__takeCount__):g.__views__.push({size:Rn(u,Ee),type:s+(g.__dir__<0?"Right":"")}),g},yt.prototype[s+"Right"]=function(u){return this.reverse()[s](u).reverse()}}),li(["filter","map","takeWhile"],function(s,a){var u=a+1,g=u==q||u==se;yt.prototype[s]=function(T){var P=this.clone();return P.__iteratees__.push({iteratee:We(T,3),type:u}),P.__filtered__=P.__filtered__||g,P}}),li(["head","last"],function(s,a){var u="take"+(a?"Right":"");yt.prototype[s]=function(){return this[u](1).value()[0]}}),li(["initial","tail"],function(s,a){var u="drop"+(a?"":"Right");yt.prototype[s]=function(){return this.__filtered__?new yt(this):this[u](1)}}),yt.prototype.compact=function(){return this.filter(Xn)},yt.prototype.find=function(s){return this.filter(s).head()},yt.prototype.findLast=function(s){return this.reverse().find(s)},yt.prototype.invokeMap=pt(function(s,a){return typeof s=="function"?new yt(this):this.map(function(u){return wa(u,s,a)})}),yt.prototype.reject=function(s){return this.filter(Ml(We(s)))},yt.prototype.slice=function(s,a){s=st(s);var u=this;return u.__filtered__&&(s>0||a<0)?new yt(u):(s<0?u=u.takeRight(-s):s&&(u=u.drop(s)),a!==t&&(a=st(a),u=a<0?u.dropRight(-a):u.take(a-s)),u)},yt.prototype.takeRightWhile=function(s){return this.reverse().takeWhile(s).reverse()},yt.prototype.toArray=function(){return this.take(Ee)},Zi(yt.prototype,function(s,a){var u=/^(?:filter|find|map|reject)|While$/.test(a),g=/^(?:head|last)$/.test(a),T=R[g?"take"+(a=="last"?"Right":""):a],P=g||/^find/.test(a);T&&(R.prototype[a]=function(){var z=this.__wrapped__,H=g?[1]:arguments,X=z instanceof yt,ce=H[0],le=X||it(z),fe=function(vt){var Et=T.apply(R,zr([vt],H));return g&&be?Et[0]:Et};le&&u&&typeof ce=="function"&&ce.length!=1&&(X=le=!1);var be=this.__chain__,Oe=!!this.__actions__.length,Ye=P&&!be,ht=X&&!Oe;if(!P&&le){z=ht?z:new yt(this);var je=s.apply(z,H);return je.__actions__.push({func:vl,args:[fe],thisArg:t}),new hi(je,be)}return Ye&&ht?s.apply(this,H):(je=this.thru(fe),Ye?g?je.value()[0]:je.value():je)})}),li(["pop","push","shift","sort","splice","unshift"],function(s){var a=Wc[s],u=/^(?:push|sort|unshift)$/.test(s)?"tap":"thru",g=/^(?:pop|shift)$/.test(s);R.prototype[s]=function(){var T=arguments;if(g&&!this.__chain__){var P=this.value();return a.apply(it(P)?P:[],T)}return this[u](function(z){return a.apply(it(z)?z:[],T)})}}),Zi(yt.prototype,function(s,a){var u=R[a];if(u){var g=u.name+"";It.call(Ao,g)||(Ao[g]=[]),Ao[g].push({name:a,func:u})}}),Ao[hl(t,_).name]=[{name:"wrapper",func:t}],yt.prototype.clone=fw,yt.prototype.reverse=dw,yt.prototype.value=pw,R.prototype.at=VR,R.prototype.chain=WR,R.prototype.commit=XR,R.prototype.next=YR,R.prototype.plant=qR,R.prototype.reverse=KR,R.prototype.toJSON=R.prototype.valueOf=R.prototype.value=ZR,R.prototype.first=R.prototype.head,ya&&(R.prototype[ya]=jR),R},Eo=XA();ms?((ms.exports=Eo)._=Eo,mh._=Eo):xn._=Eo}).call(tb)}(aa,aa.exports)),aa.exports}var ib=nb();class zu{constructor(e,t){this._path=e,this._ctor=t}_promise=null;_instance=null;async get(){return this._instance?Promise.resolve(this._instance):this._promise?this._promise:(this._promise=(async()=>{const t=(await import(this._path))[this._ctor];if(!t)throw new Error(`DIVE: Module class ${this._ctor} not found in ${this._path}`);if(typeof t!="function")throw new Error(`DIVE: Module at ${this._path} does not export a valid constructor (${this._ctor} wanted)`);return this._instance=new t,this._instance})(),this._promise)}}class Tn{static __instances=[];static get(e){const t=this.__instances.find(n=>n.id===e);return t||this.__instances.find(n=>Array.from(n.registered.values()).find(r=>r.id===e))}_id;get id(){return this._id}renderer;scene;controller;toolbox;_mediaGenerator=new zu("../mediacreator/MediaCreator.ts","DIVEMediaCreator");_io=new zu("../io/IO.ts","DIVEIO");_ar=new zu("../ar/AR.ts","DIVEAR");registered=new Map;listeners=new Map;constructor(e,t,n,r){this._id=VE(),this.renderer=e,this.scene=t,this.controller=n,this.toolbox=r,Tn.__instances.push(this)}DestroyInstance(){const e=Tn.__instances.findIndex(t=>t.id===this.id);return e===-1?!1:(Tn.__instances.splice(e,1),!0)}PerformAction(e,t){let n=!1;switch(e){case"START_RENDER":{this.renderer.StartRenderer(this.scene,this.controller.object),n=!0;break}case"GET_ALL_SCENE_DATA":{n=this.getAllSceneData(t);break}case"GET_ALL_OBJECTS":{n=this.getAllObjects(t);break}case"GET_OBJECTS":{n=this.getObjects(t);break}case"ADD_OBJECT":{n=this.addObject(t);break}case"UPDATE_OBJECT":{n=this.updateObject(t);break}case"DELETE_OBJECT":{n=this.deleteObject(t);break}case"SELECT_OBJECT":{n=this.selectObject(t);break}case"DESELECT_OBJECT":{n=this.deselectObject(t);break}case"SET_BACKGROUND":{n=this.setBackground(t);break}case"DROP_IT":{n=this.dropIt(t);break}case"PLACE_ON_FLOOR":{n=this.placeOnFloor(t);break}case"SET_CAMERA_TRANSFORM":{n=this.setCameraTransform(t);break}case"GET_CAMERA_TRANSFORM":{n=this.getCameraTransform(t);break}case"MOVE_CAMERA":{n=this.moveCamera(t);break}case"RESET_CAMERA":{n=this.resetCamera(t);break}case"COMPUTE_ENCOMPASSING_VIEW":{n=this.computeEncompassingView(t);break}case"SET_CAMERA_LAYER":{n=this.setCameraLayer(t);break}case"ZOOM_CAMERA":{n=this.zoomCamera(t);break}case"SET_GIZMO_MODE":{n=this.setGizmoMode(t);break}case"SET_GIZMO_VISIBILITY":{n=this.setGizmoVisibility(t);break}case"SET_GIZMO_SCALE_LINKED":{n=this.setGizmoScaleLinked(t);break}case"USE_TOOL":{n=this.useTool(t);break}case"MODEL_LOADED":{n=this.modelLoaded(t);break}case"UPDATE_SCENE":{n=this.updateScene(t);break}case"GENERATE_MEDIA":{n=this.generateMedia(t);break}case"SET_PARENT":{n=this.setParent(t);break}case"EXPORT_SCENE":{n=this.exportScene(t);break}case"LAUNCH_AR":{const{uri:r,options:o}=t;n=new Promise((c,l)=>{this._ar.get().then(h=>{c(h.launch(r,o))}).catch(l)});break}default:console.warn(`DIVECommunication.PerformAction: has been executed with unknown Action type ${e}`)}return this.dispatch(e,t),n}Subscribe(e,t){return this.listeners.get(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),()=>{const n=this.listeners.get(e);if(!n)return!1;const r=n.findIndex(o=>o===t);return r===-1?!1:(n.splice(r,1),!0)}}dispatch(e,t){const n=this.listeners.get(e);n&&n.forEach(r=>r(t))}getAllSceneData(e){const t={name:this.scene.name,mediaItem:null,backgroundColor:"#"+this.scene.background.getHexString(),floorEnabled:this.scene.Floor.visible,floorColor:"#"+this.scene.Floor.material.color.getHexString(),userCamera:{position:this.controller.object.position.clone(),target:this.controller.target.clone()},spotmarks:[],lights:Array.from(this.registered.values()).filter(n=>n.entityType==="light"),objects:Array.from(this.registered.values()).filter(n=>n.entityType==="model"),cameras:Array.from(this.registered.values()).filter(n=>n.entityType==="pov"),primitives:Array.from(this.registered.values()).filter(n=>n.entityType==="primitive"),groups:Array.from(this.registered.values()).filter(n=>n.entityType==="group")};return Object.assign(e,t),t}getAllObjects(e){return Object.assign(e,this.registered),this.registered}getObjects(e){if(e.ids.length===0)return[];const t=[];return this.registered.forEach(n=>{e.ids.includes(n.id)&&t.push(n)}),t}addObject(e){return this.registered.get(e.id)?!1:(e.parentId===void 0&&(e.parentId=null),this.registered.set(e.id,e),this.scene.AddSceneObject(e),!0)}updateObject(e){const t=this.registered.get(e.id);if(!t)return!1;this.registered.set(e.id,ib.merge(t,e));const n=this.registered.get(e.id);return this.scene.UpdateSceneObject({...e,id:n.id,entityType:n.entityType}),Object.assign(e,n),!0}deleteObject(e){const t=this.registered.get(e.id);return t?(t.parentId&&this.setParent({object:{id:t.id},parent:null}),t.entityType==="group"&&this.registered.forEach(n=>{n.parentId===t.id&&this.updateObject({id:n.id,parentId:null})}),Object.assign(e,t),this.registered.delete(e.id),Array.from(this.registered.values()).forEach(n=>{n.parentId&&n.parentId===e.id&&(n.parentId=null)}),this.scene.DeleteSceneObject(t),!0):!1}selectObject(e){const t=this.registered.get(e.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n||!("isSelectable"in n))return!1;const r=this.toolbox.GetActiveTool();return r&&_m(r)&&r.AttachGizmo(n),Object.assign(e,t),!0}deselectObject(e){const t=this.registered.get(e.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n||!("isSelectable"in n))return!1;const r=this.toolbox.GetActiveTool();return r&&_m(r)&&r.DetachGizmo(),Object.assign(e,t),!0}setBackground(e){return this.scene.SetBackground(e.color),!0}dropIt(e){const t=this.registered.get(e.id);return t?(this.scene.GetSceneObject(t).DropIt(),!0):!1}placeOnFloor(e){const t=this.registered.get(e.id);return t?(this.scene.PlaceOnFloor(t),!0):!1}setCameraTransform(e){return this.controller.object.position.copy(e.position),this.controller.target.copy(e.target),this.controller.update(),!0}getCameraTransform(e){const t={position:this.controller.object.position.clone(),target:this.controller.target.clone()};return Object.assign(e,t),t}moveCamera(e){let t={x:0,y:0,z:0},n={x:0,y:0,z:0};return"id"in e?(t=this.registered.get(e.id).position,n=this.registered.get(e.id).target):(t=e.position,n=e.target),this.controller.MoveTo(t,n,e.duration,e.locked),!0}setCameraLayer(e){return this.controller.object.SetCameraLayer(e.layer),!0}resetCamera(e){return this.controller.RevertLast(e.duration),!0}computeEncompassingView(e){const t=this.scene.ComputeSceneBB(),n=this.controller.ComputeEncompassingView(t);return Object.assign(e,n),n}zoomCamera(e){return e.direction==="IN"&&this.controller.ZoomIn(e.by),e.direction==="OUT"&&this.controller.ZoomOut(e.by),!0}setGizmoMode(e){return this.toolbox.SetGizmoMode(e.mode),!0}setGizmoVisibility(e){return this.toolbox.SetGizmoVisibility(e),e}setGizmoScaleLinked(e){return this.toolbox.SetGizmoScaleLinked(e),e}useTool(e){return this.toolbox.UseTool(e.tool),!0}modelLoaded(e){return this.registered.get(e.id).loaded=!0,!0}updateScene(e){return e.name!==void 0&&(this.scene.name=e.name),e.backgroundColor!==void 0&&this.scene.SetBackground(e.backgroundColor),e.gridEnabled!==void 0&&this.scene.Grid.SetVisibility(e.gridEnabled),e.floorEnabled!==void 0&&this.scene.Floor.SetVisibility(e.floorEnabled),e.floorColor!==void 0&&this.scene.Floor.SetColor(e.floorColor),e.name=this.scene.name,e.backgroundColor="#"+this.scene.background.getHexString(),e.gridEnabled=this.scene.Grid.visible,e.floorEnabled=this.scene.Floor.visible,e.floorColor="#"+this.scene.Floor.material.color.getHexString(),!0}generateMedia(e){let t={x:0,y:0,z:0},n={x:0,y:0,z:0};return"id"in e?(t=this.registered.get(e.id).position,n=this.registered.get(e.id).target):(t=e.position,n=e.target),this._mediaGenerator.get().then(r=>r.GenerateMedia(t,n,e.width,e.height))}setParent(e){const t=this.registered.get(e.object.id);if(!t)return!1;const n=this.scene.GetSceneObject(t);if(!n)return!1;if(e.parent===null)return this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0;if(e.object.id===e.parent.id)return!1;const r=this.registered.get(e.parent.id);if(!r)return this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0;const o=this.scene.GetSceneObject(r);return o?(o.attach(n),this.updateObject({id:t.id,parentId:r.id}),!0):(this.scene.Root.attach(n),this.updateObject({id:t.id,parentId:null}),!0)}exportScene(e){return new Promise((t,n)=>{this._io.get().then(r=>{t(r.Export(e.type))}).catch(n)})}}class rb extends mt{isDIVELight=!0;isDIVEPointLight=!0;isMovable=!0;isSelectable=!0;gizmo=null;light;mesh;constructor(){super(),this.name="DIVEPointLight",this.light=new tm(16777215,1),this.light.layers.mask=qn,this.light.castShadow=!0,this.light.shadow.mapSize.width=512,this.light.shadow.mapSize.height=512,this.add(this.light);const e=.1,t=new Jo(e,e*320,e*320),n=new Fi({color:this.light.color,transparent:!0,opacity:.8,side:Di});this.mesh=new ye(t,n),this.mesh.layers.mask=Du,this.add(this.mesh)}SetColor(e){this.light.color=e,this.mesh.material.color=e}SetIntensity(e){this.light.intensity=e,this.mesh.material.opacity=e>.8?.8:e*.8}SetEnabled(e){this.light.visible=e}onMove(){Tn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.position})}onSelect(){Tn.get(this.userData.id)?.PerformAction("SELECT_OBJECT",{id:this.userData.id})}onDeselect(){Tn.get(this.userData.id)?.PerformAction("DESELECT_OBJECT",{id:this.userData.id})}}class sb extends mt{isDIVELight=!0;isDIVESceneLight=!0;_hemiLight;_dirLight;constructor(){super(),this.name="DIVESceneLight",this._hemiLight=new SE(16777215,16777215,2),this._hemiLight.layers.mask=qn,this._hemiLight.position.set(0,50,0),this.add(this._hemiLight),this._dirLight=new Cu(16777215,3),this._dirLight.layers.mask=qn,this._dirLight.position.set(1,1.75,1),this._dirLight.position.multiplyScalar(30),this._dirLight.castShadow=!0,this._dirLight.shadow.mapSize.width=2048,this._dirLight.shadow.mapSize.height=2048;const e=5;this._dirLight.shadow.camera.left=-5,this._dirLight.shadow.camera.right=e,this._dirLight.shadow.camera.top=e,this._dirLight.shadow.camera.bottom=-5,this._dirLight.shadow.camera.far=3500,this.add(this._dirLight)}SetColor(e){this._hemiLight.color=e,this._dirLight.color=e}SetIntensity(e){this._hemiLight.intensity=e*2,this._dirLight.intensity=e*3}SetEnabled(e){this._hemiLight.visible=e,this._dirLight.visible=e}}const ku=i=>i.parent?ku(i.parent):i;class ob{isMovable=!0}class ab{isSelectable=!0}function cb(i,e){return e.forEach(t=>{Object.getOwnPropertyNames(t.prototype).forEach(n=>{Object.defineProperty(i.prototype,n,Object.getOwnPropertyDescriptor(t.prototype,n))})}),i}class Hu extends cb(mt,[ab,ob]){isDIVENode=!0;gizmo=null;_positionWorldBuffer;_boundingBox;constructor(){super(),this.layers.mask=qn,this._positionWorldBuffer=new N,this._boundingBox=new yi}SetPosition(e){if(!this.parent){this.position.set(e.x,e.y,e.z);return}const t=new N(e.x,e.y,e.z);this.position.copy(this.parent.worldToLocal(t)),"isDIVEGroup"in this.parent&&this.parent.UpdateLineTo(this)}SetRotation(e){this.rotation.set(e.x,e.y,e.z)}SetScale(e){this.scale.set(e.x,e.y,e.z)}SetVisibility(e){this.visible=e}SetToWorldOrigin(){this.position.set(0,0,0),Tn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})}onMove(){Tn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})}onSelect(){Tn.get(this.userData.id)?.PerformAction("SELECT_OBJECT",{id:this.userData.id})}onDeselect(){Tn.get(this.userData.id)?.PerformAction("DESELECT_OBJECT",{id:this.userData.id})}}class lb extends Hu{isDIVEModel=!0;_mesh=null;_material=null;SetModel(e){this.clear(),this._boundingBox.makeEmpty(),e.traverse(t=>{t.castShadow=!0,t.receiveShadow=!0,t.layers.mask=this.layers.mask,this._boundingBox.expandByObject(t),!this._mesh&&"isMesh"in t&&(this._mesh=t,this._material?this._mesh.material=this._material:this._material=t.material)}),this.add(e)}SetMaterial(e){this._material||(this._material=new co),e.vertexColors!==void 0&&(this._material.vertexColors=e.vertexColors),e.color!==void 0&&this._material.color.set(e.color),e.map!==void 0&&(this._material.map=e.map),e.normalMap!==void 0&&(this._material.normalMap=e.normalMap),e.roughness!==void 0&&(this._material.roughness=e.roughness),e.roughnessMap!==void 0&&(this._material.roughnessMap=e.roughnessMap,this._material.roughnessMap&&(this._material.roughness=1)),e.metalness!==void 0&&(this._material.metalness=e.metalness),e.metalnessMap!==void 0&&(this._material.metalnessMap=e.metalnessMap,this._material.metalnessMap&&(this._material.metalness=1)),this._mesh&&(this._mesh.material=this._material)}PlaceOnFloor(){const e=this.getWorldPosition(this._positionWorldBuffer),t=e.clone();this._mesh?.geometry?.computeBoundingBox();const n=this._mesh?.geometry?.boundingBox;!n||!this._mesh||(e.y=e.y-this._mesh.localToWorld(n.min.clone()).y,e.y!==t.y&&Tn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale}))}DropIt(){if(!this.parent){console.warn("DIVEModel: DropIt() called on a model that is not in the scene.",this);return}const e=this._boundingBox.min.y*this.scale.y,t=this.localToWorld(this._boundingBox.getCenter(new N).multiply(this.scale));t.y=e+this.position.y;const n=new Ec(t,new N(0,-1,0));n.layers.mask=qn;const r=n.intersectObjects(ku(this).Root.children,!0);if(r.length>0){const o=r[0].object;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox,l=o.localToWorld(c.max.clone()),h=this.position.clone(),f=this.position.clone().setY(l.y).sub(new N(0,e,0));if(this.position.copy(f),this.position.y===h.y)return;this.onMove()}}}class ub extends Hu{isDIVEPrimitive=!0;_mesh;constructor(){super(),this._mesh=new ye,this._mesh.layers.mask=qn,this._mesh.castShadow=!0,this._mesh.receiveShadow=!0,this._mesh.material=new co,this.add(this._mesh)}SetGeometry(e){const t=this.assembleGeometry(e);t&&(this._mesh.geometry=t,this._boundingBox.setFromObject(this._mesh))}SetMaterial(e){const t=this._mesh.material;e.vertexColors!==void 0&&(t.vertexColors=e.vertexColors),e.color!==void 0&&(t.color=new Ne(e.color)),e.map!==void 0&&(t.map=e.map),e.normalMap!==void 0&&(t.normalMap=e.normalMap),e.roughness!==void 0&&(t.roughness=e.roughness),e.roughnessMap!==void 0&&(t.roughnessMap=e.roughnessMap,t.roughnessMap&&(t.roughness=1)),e.metalness!==void 0&&(t.metalness=e.metalness),e.metalnessMap!==void 0&&(t.metalnessMap=e.metalnessMap,t.metalnessMap&&(t.metalness=0)),this._mesh&&(this._mesh.material=t)}PlaceOnFloor(){const e=this.getWorldPosition(this._positionWorldBuffer),t=e.clone();this._mesh?.geometry?.computeBoundingBox();const n=this._mesh?.geometry?.boundingBox;!n||!this._mesh||(e.y=e.y-this._mesh.localToWorld(n.min.clone()).y,e.y!==t.y&&Tn.get(this.userData.id)?.PerformAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale}))}DropIt(){if(!this.parent){console.warn("DIVEPrimitive: DropIt() called on a model that is not in the scene.",this);return}const e=this._boundingBox.min.y*this.scale.y,t=this.localToWorld(this._boundingBox.getCenter(new N).multiply(this.scale));t.y=e+this.position.y;const n=new Ec(t,new N(0,-1,0));n.layers.mask=qn;const r=n.intersectObjects(ku(this).Root.children,!0);if(r.length>0){const o=r[0].object;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox,l=o.localToWorld(c.max.clone()),h=this.position.clone(),f=this.position.clone().setY(l.y).sub(new N(0,e,0));if(this.position.copy(f),this.position.y===h.y)return;this.onMove()}}assembleGeometry(e){switch(this._mesh.material.flatShading=!1,e.name.toLowerCase()){case"cylinder":return this.createCylinderGeometry(e);case"sphere":return this.createSphereGeometry(e);case"pyramid":return this._mesh.material.flatShading=!0,this.createPyramidGeometry(e);case"cube":case"box":return this.createBoxGeometry(e);case"cone":return this.createConeGeometry(e);case"wall":return this.createWallGeometry(e);case"plane":return this.createPlaneGeometry(e);default:return console.warn("DIVEPrimitive.assembleGeometry: Invalid geometry type:",e.name.toLowerCase()),null}}createCylinderGeometry(e){const t=new pn(e.width/2,e.width/2,e.height,64);return t.translate(0,e.height/2,0),t}createSphereGeometry(e){return new Jo(e.width/2,256,256)}createPyramidGeometry(e){const t=new Float32Array([-e.width/2,0,-e.depth/2,e.width/2,0,-e.depth/2,e.width/2,0,e.depth/2,-e.width/2,0,e.depth/2,0,e.height,0]),n=new Uint16Array([0,1,2,0,2,3,0,4,1,1,4,2,2,4,3,3,4,0]),r=new Kt;return r.setAttribute("position",new Qt(t,3)),r.setIndex(new Qt(n,1)),r.computeVertexNormals(),r.computeBoundingBox(),r.computeBoundingSphere(),r}createBoxGeometry(e){const t=new Yt(e.width,e.height,e.depth);return t.translate(0,e.height/2,0),t}createConeGeometry(e){const t=new bu(e.width/2,e.height,256);return t.translate(0,e.height/2,0),t}createWallGeometry(e){const t=new Yt(e.width,e.height,e.depth||.05,16);return t.translate(0,e.height/2,0),t}createPlaneGeometry(e){const t=new Yt(e.width,e.height,e.depth);return t.translate(0,e.height/2,0),t}}class hb extends Hu{isDIVEGroup=!0;_members;get members(){return this._members}_lines;constructor(){super(),this.name="DIVEGroup",this._members=[],this._lines=[]}SetPosition(e){super.SetPosition(e),this._members.forEach(t=>{"isDIVENode"in t&&t.onMove()})}SetLinesVisibility(e,t){if(!t){this._lines.forEach(r=>{r.visible=e});return}const n=this._members.indexOf(t);n!==-1&&(this._lines[n].visible=e)}attach(e){if(this._members.includes(e))return this;const t=this.createLine();return this.add(t),this._lines.push(t),super.attach(e),this._members.push(e),this.updateLineTo(t,e),this.SetLinesVisibility(!0,e),this}remove(e){const t=this._members.indexOf(e);if(t===-1)return this;const n=this._lines[t];return super.remove(n),this._lines.splice(t,1),super.remove(e),this._members.splice(t,1),this}UpdateLineTo(e){const t=this._members.indexOf(e);t!==-1&&this.updateLineTo(this._lines[t],e)}createLine(){const e=new Kt,t=new aE({color:6710886,dashSize:.05,gapSize:.025}),n=new ri(e,t);return n.visible=!1,n}updateLineTo(e,t){e.geometry.setFromPoints([new N(0,0,0),t.position.clone()]),e.computeLineDistances()}}function xm(i,e){if(e===Z0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Fl||e===pd){let t=i.getIndex();if(t===null){const c=[],l=i.getAttribute("position");if(l!==void 0){for(let h=0;h<l.count;h++)c.push(h);i.setIndex(c),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===Fl)for(let c=1;c<=n;c++)r.push(t.getX(0)),r.push(t.getX(c)),r.push(t.getX(c+1));else for(let c=0;c<n;c++)c%2===0?(r.push(t.getX(c)),r.push(t.getX(c+1)),r.push(t.getX(c+2))):(r.push(t.getX(c+2)),r.push(t.getX(c+1)),r.push(t.getX(c)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const o=i.clone();return o.setIndex(r),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class fb extends ls{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new _b(t)}),this.register(function(t){return new Ab(t)}),this.register(function(t){return new wb(t)}),this.register(function(t){return new Rb(t)}),this.register(function(t){return new xb(t)}),this.register(function(t){return new yb(t)}),this.register(function(t){return new Sb(t)}),this.register(function(t){return new Mb(t)}),this.register(function(t){return new gb(t)}),this.register(function(t){return new Eb(t)}),this.register(function(t){return new vb(t)}),this.register(function(t){return new Tb(t)}),this.register(function(t){return new bb(t)}),this.register(function(t){return new pb(t)}),this.register(function(t){return new Cb(t)}),this.register(function(t){return new Pb(t)})}load(e,t,n,r){const o=this;let c;if(this.resourcePath!=="")c=this.resourcePath;else if(this.path!==""){const f=ta.extractUrlBase(e);c=ta.resolveURL(f,this.path)}else c=ta.extractUrlBase(e);this.manager.itemStart(e);const l=function(f){r?r(f):console.error(f),o.manager.itemError(e),o.manager.itemEnd(e)},h=new Mc(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(e,function(f){try{o.parse(f,c,function(d){t(d),o.manager.itemEnd(e)},l)}catch(d){l(d)}},n,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let o;const c={},l={},h=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(h.decode(new Uint8Array(e,0,4))===ym){try{c[xt.KHR_BINARY_GLTF]=new Lb(e)}catch(p){r&&r(p);return}o=JSON.parse(c[xt.KHR_BINARY_GLTF].content)}else o=JSON.parse(h.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const f=new Wb(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});f.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const p=this.pluginCallbacks[d](f);p.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[p.name]=p,c[p.name]=!0}if(o.extensionsUsed)for(let d=0;d<o.extensionsUsed.length;++d){const p=o.extensionsUsed[d],m=o.extensionsRequired||[];switch(p){case xt.KHR_MATERIALS_UNLIT:c[p]=new mb;break;case xt.KHR_DRACO_MESH_COMPRESSION:c[p]=new Ib(o,this.dracoLoader);break;case xt.KHR_TEXTURE_TRANSFORM:c[p]=new Db;break;case xt.KHR_MESH_QUANTIZATION:c[p]=new Ob;break;default:m.indexOf(p)>=0&&l[p]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+p+'".')}}f.setExtensions(c),f.setPlugins(l),f.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,o){n.parse(e,t,r,o)})}}function db(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const xt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class pb{constructor(e){this.parser=e,this.name=xt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const o=t.json,h=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e];let f;const d=new Ne(16777215);h.color!==void 0&&d.setRGB(h.color[0],h.color[1],h.color[2],_n);const p=h.range!==void 0?h.range:0;switch(h.type){case"directional":f=new Cu(d),f.target.position.set(0,0,-1),f.add(f.target);break;case"point":f=new tm(d),f.distance=p;break;case"spot":f=new EE(d),f.distance=p,h.spot=h.spot||{},h.spot.innerConeAngle=h.spot.innerConeAngle!==void 0?h.spot.innerConeAngle:0,h.spot.outerConeAngle=h.spot.outerConeAngle!==void 0?h.spot.outerConeAngle:Math.PI/4,f.angle=h.spot.outerConeAngle,f.penumbra=1-h.spot.innerConeAngle/h.spot.outerConeAngle,f.target.position.set(0,0,-1),f.add(f.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+h.type)}return f.position.set(0,0,0),f.decay=2,Or(f,h),h.intensity!==void 0&&(f.intensity=h.intensity),f.name=t.createUniqueName(h.name||"light_"+e),r=Promise.resolve(f),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,o=n.json.nodes[e],l=(o.extensions&&o.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(h){return n._getNodeRef(t.cache,l,h)})}}class mb{constructor(){this.name=xt.KHR_MATERIALS_UNLIT}getMaterialType(){return Fi}extendParams(e,t,n){const r=[];e.color=new Ne(1,1,1),e.opacity=1;const o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){const c=o.baseColorFactor;e.color.setRGB(c[0],c[1],c[2],_n),e.opacity=c[3]}o.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",o.baseColorTexture,an))}return Promise.all(r)}}class gb{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=r.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}}class _b{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];if(c.clearcoatFactor!==void 0&&(t.clearcoat=c.clearcoatFactor),c.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",c.clearcoatTexture)),c.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=c.clearcoatRoughnessFactor),c.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",c.clearcoatRoughnessTexture)),c.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",c.clearcoatNormalTexture)),c.clearcoatNormalTexture.scale!==void 0)){const l=c.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(l,l)}return Promise.all(o)}}class vb{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.iridescenceFactor!==void 0&&(t.iridescence=c.iridescenceFactor),c.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",c.iridescenceTexture)),c.iridescenceIor!==void 0&&(t.iridescenceIOR=c.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),c.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=c.iridescenceThicknessMinimum),c.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=c.iridescenceThicknessMaximum),c.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",c.iridescenceThicknessTexture)),Promise.all(o)}}class xb{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;const c=r.extensions[this.name];if(c.sheenColorFactor!==void 0){const l=c.sheenColorFactor;t.sheenColor.setRGB(l[0],l[1],l[2],_n)}return c.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=c.sheenRoughnessFactor),c.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",c.sheenColorTexture,an)),c.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",c.sheenRoughnessTexture)),Promise.all(o)}}class yb{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.transmissionFactor!==void 0&&(t.transmission=c.transmissionFactor),c.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",c.transmissionTexture)),Promise.all(o)}}class Sb{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];t.thickness=c.thicknessFactor!==void 0?c.thicknessFactor:0,c.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",c.thicknessTexture)),t.attenuationDistance=c.attenuationDistance||1/0;const l=c.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(l[0],l[1],l[2],_n),Promise.all(o)}}class Mb{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=r.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}}class Eb{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];t.specularIntensity=c.specularFactor!==void 0?c.specularFactor:1,c.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",c.specularTexture));const l=c.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(l[0],l[1],l[2],_n),c.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",c.specularColorTexture,an)),Promise.all(o)}}class bb{constructor(e){this.parser=e,this.name=xt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return t.bumpScale=c.bumpFactor!==void 0?c.bumpFactor:1,c.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",c.bumpTexture)),Promise.all(o)}}class Tb{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ki}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],c=r.extensions[this.name];return c.anisotropyStrength!==void 0&&(t.anisotropy=c.anisotropyStrength),c.anisotropyRotation!==void 0&&(t.anisotropyRotation=c.anisotropyRotation),c.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",c.anisotropyTexture)),Promise.all(o)}}class Ab{constructor(e){this.parser=e,this.name=xt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const o=r.extensions[this.name],c=t.options.ktx2Loader;if(!c){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,c)}}class wb{constructor(e){this.parser=e,this.name=xt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;const c=o.extensions[t],l=r.images[c.source];let h=n.textureLoader;if(l.uri){const f=n.options.manager.getHandler(l.uri);f!==null&&(h=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,c.source,h);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Rb{constructor(e){this.parser=e,this.name=xt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;const c=o.extensions[t],l=r.images[c.source];let h=n.textureLoader;if(l.uri){const f=n.options.manager.getHandler(l.uri);f!==null&&(h=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,c.source,h);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Cb{constructor(e){this.name=xt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],o=this.parser.getDependency("buffer",r.buffer),c=this.parser.options.meshoptDecoder;if(!c||!c.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(l){const h=r.byteOffset||0,f=r.byteLength||0,d=r.count,p=r.byteStride,m=new Uint8Array(l,h,f);return c.decodeGltfBufferAsync?c.decodeGltfBufferAsync(d,p,m,r.mode,r.filter).then(function(x){return x.buffer}):c.ready.then(function(){const x=new ArrayBuffer(d*p);return c.decodeGltfBuffer(new Uint8Array(x),d,p,m,r.mode,r.filter),x})})}else return null}}class Pb{constructor(e){this.name=xt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const f of r.primitives)if(f.mode!==si.TRIANGLES&&f.mode!==si.TRIANGLE_STRIP&&f.mode!==si.TRIANGLE_FAN&&f.mode!==void 0)return null;const c=n.extensions[this.name].attributes,l=[],h={};for(const f in c)l.push(this.parser.getDependency("accessor",c[f]).then(d=>(h[f]=d,h[f])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(f=>{const d=f.pop(),p=d.isGroup?d.children:[d],m=f[0].count,x=[];for(const M of p){const A=new Qe,v=new N,_=new rn,C=new N(1,1,1),b=new iE(M.geometry,M.material,m);for(let L=0;L<m;L++)h.TRANSLATION&&v.fromBufferAttribute(h.TRANSLATION,L),h.ROTATION&&_.fromBufferAttribute(h.ROTATION,L),h.SCALE&&C.fromBufferAttribute(h.SCALE,L),b.setMatrixAt(L,A.compose(v,_,C));for(const L in h)if(L==="_COLOR_0"){const k=h[L];b.instanceColor=new yu(k.array,k.itemSize,k.normalized)}else L!=="TRANSLATION"&&L!=="ROTATION"&&L!=="SCALE"&&M.geometry.setAttribute(L,h[L]);mt.prototype.copy.call(b,M),this.parser.assignFinalMaterial(b),x.push(b)}return d.isGroup?(d.clear(),d.add(...x),d):x[0]}))}}const ym="glTF",ca=12,Sm={JSON:1313821514,BIN:5130562};class Lb{constructor(e){this.name=xt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ca),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ym)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-ca,o=new DataView(e,ca);let c=0;for(;c<r;){const l=o.getUint32(c,!0);c+=4;const h=o.getUint32(c,!0);if(c+=4,h===Sm.JSON){const f=new Uint8Array(e,ca+c,l);this.content=n.decode(f)}else if(h===Sm.BIN){const f=ca+c;this.body=e.slice(f,f+l)}c+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ib{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=xt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,o=e.extensions[this.name].bufferView,c=e.extensions[this.name].attributes,l={},h={},f={};for(const d in c){const p=Vu[d]||d.toLowerCase();l[p]=c[d]}for(const d in e.attributes){const p=Vu[d]||d.toLowerCase();if(c[d]!==void 0){const m=n.accessors[e.attributes[d]],x=mo[m.componentType];f[p]=x.name,h[p]=m.normalized===!0}}return t.getDependency("bufferView",o).then(function(d){return new Promise(function(p,m){r.decodeDracoFile(d,function(x){for(const M in x.attributes){const A=x.attributes[M],v=h[M];v!==void 0&&(A.normalized=v)}p(x)},l,f,_n,m)})})}}class Db{constructor(){this.name=xt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Ob{constructor(){this.name=xt.KHR_MESH_QUANTIZATION}}class Mm extends Qo{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r*3+r;for(let c=0;c!==r;c++)t[c]=n[o+c];return t}interpolate_(e,t,n,r){const o=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=l*2,f=l*3,d=r-t,p=(n-t)/d,m=p*p,x=m*p,M=e*f,A=M-f,v=-2*x+3*m,_=x-m,C=1-v,b=_-m+p;for(let L=0;L!==l;L++){const k=c[A+L+l],U=c[A+L+h]*d,O=c[M+L+l],I=c[M+L]*d;o[L]=C*k+b*U+v*O+_*I}return o}}const Ub=new rn;class Nb extends Mm{interpolate_(e,t,n,r){const o=super.interpolate_(e,t,n,r);return Ub.fromArray(o).normalize().toArray(o),o}}const si={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},mo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Em={9728:Pn,9729:Hn,9984:Pf,9985:Na,9986:Oo,9987:nr},bm={33071:tr,33648:Do,10497:Kr},Gu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Vu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Dr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Fb={CUBICSPLINE:void 0,LINEAR:Ls,STEP:Fo},Wu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Bb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new co({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Di})),i.DefaultMaterial}function ds(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Or(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function zb(i,e,t){let n=!1,r=!1,o=!1;for(let f=0,d=e.length;f<d;f++){const p=e[f];if(p.POSITION!==void 0&&(n=!0),p.NORMAL!==void 0&&(r=!0),p.COLOR_0!==void 0&&(o=!0),n&&r&&o)break}if(!n&&!r&&!o)return Promise.resolve(i);const c=[],l=[],h=[];for(let f=0,d=e.length;f<d;f++){const p=e[f];if(n){const m=p.POSITION!==void 0?t.getDependency("accessor",p.POSITION):i.attributes.position;c.push(m)}if(r){const m=p.NORMAL!==void 0?t.getDependency("accessor",p.NORMAL):i.attributes.normal;l.push(m)}if(o){const m=p.COLOR_0!==void 0?t.getDependency("accessor",p.COLOR_0):i.attributes.color;h.push(m)}}return Promise.all([Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){const d=f[0],p=f[1],m=f[2];return n&&(i.morphAttributes.position=d),r&&(i.morphAttributes.normal=p),o&&(i.morphAttributes.color=m),i.morphTargetsRelative=!0,i})}function kb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Hb(i){let e;const t=i.extensions&&i.extensions[xt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Xu(t.attributes):e=i.indices+":"+Xu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Xu(i.targets[n]);return e}function Xu(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Yu(i){switch(i){case Int8Array:return .007874015748031496;case Uint8Array:return .00392156862745098;case Int16Array:return 3051850947599719e-20;case Uint16Array:return 15259021896696422e-21;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Gb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Vb=new Qe;class Wb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new db,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,o=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,o=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&o<98?this.textureLoader=new $p(this.options.manager):this.textureLoader=new CE(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Mc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(c){return c._markDefs&&c._markDefs()}),Promise.all(this._invokeAll(function(c){return c.beforeRoot&&c.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(c){const l={scene:c[0][r.scene||0],scenes:c[0],animations:c[1],cameras:c[2],asset:r.asset,parser:n,userData:{}};return ds(o,l,r),Or(l,r),Promise.all(n._invokeAll(function(h){return h.afterRoot&&h.afterRoot(l)})).then(function(){for(const h of l.scenes)h.updateMatrixWorld();e(l)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,o=t.length;r<o;r++){const c=t[r].joints;for(let l=0,h=c.length;l<h;l++)e[c[l]].isBone=!0}for(let r=0,o=e.length;r<o;r++){const c=e[r];c.mesh!==void 0&&(this._addNodeRef(this.meshCache,c.mesh),c.skin!==void 0&&(n[c.mesh].isSkinnedMesh=!0)),c.camera!==void 0&&this._addNodeRef(this.cameraCache,c.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),o=(c,l)=>{const h=this.associations.get(c);h!=null&&this.associations.set(l,h);for(const[f,d]of c.children.entries())o(d,l.children[f])};return o(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const o=e(t[r]);o&&n.push(o)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":r=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(o,c){return n.getDependency(e,c)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[xt.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(o,c){n.load(ta.resolveURL(t.uri,r.path),o,void 0,function(){c(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const c=Gu[r.type],l=mo[r.componentType],h=r.normalized===!0,f=new l(r.count*c);return Promise.resolve(new Qt(f,c,h))}const o=[];return r.bufferView!==void 0?o.push(this.getDependency("bufferView",r.bufferView)):o.push(null),r.sparse!==void 0&&(o.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(o).then(function(c){const l=c[0],h=Gu[r.type],f=mo[r.componentType],d=f.BYTES_PER_ELEMENT,p=d*h,m=r.byteOffset||0,x=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,M=r.normalized===!0;let A,v;if(x&&x!==p){const _=Math.floor(m/x),C="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+_+":"+r.count;let b=t.cache.get(C);b||(A=new f(l,_*x,r.count*x/d),b=new Tp(A,x/d),t.cache.add(C,b)),v=new Yo(b,h,m%x/d,M)}else l===null?A=new f(r.count*h):A=new f(l,m,r.count*h),v=new Qt(A,h,M);if(r.sparse!==void 0){const _=Gu.SCALAR,C=mo[r.sparse.indices.componentType],b=r.sparse.indices.byteOffset||0,L=r.sparse.values.byteOffset||0,k=new C(c[1],b,r.sparse.count*_),U=new f(c[2],L,r.sparse.count*h);l!==null&&(v=new Qt(v.array.slice(),v.itemSize,v.normalized));for(let O=0,I=k.length;O<I;O++){const E=k[O];if(v.setX(E,U[O*h]),h>=2&&v.setY(E,U[O*h+1]),h>=3&&v.setZ(E,U[O*h+2]),h>=4&&v.setW(E,U[O*h+3]),h>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return v})}loadTexture(e){const t=this.json,n=this.options,o=t.textures[e].source,c=t.images[o];let l=this.textureLoader;if(c.uri){const h=n.manager.getHandler(c.uri);h!==null&&(l=h)}return this.loadTextureImage(e,o,l)}loadTextureImage(e,t,n){const r=this,o=this.json,c=o.textures[e],l=o.images[t],h=(l.uri||l.bufferView)+":"+c.sampler;if(this.textureCache[h])return this.textureCache[h];const f=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=c.name||l.name||"",d.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(d.name=l.uri);const m=(o.samplers||{})[c.sampler]||{};return d.magFilter=Em[m.magFilter]||Hn,d.minFilter=Em[m.minFilter]||nr,d.wrapS=bm[m.wrapS]||Kr,d.wrapT=bm[m.wrapT]||Kr,r.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[h]=f,f}loadImageSource(e,t){const n=this,r=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(p=>p.clone());const c=r.images[e],l=self.URL||self.webkitURL;let h=c.uri||"",f=!1;if(c.bufferView!==void 0)h=n.getDependency("bufferView",c.bufferView).then(function(p){f=!0;const m=new Blob([p],{type:c.mimeType});return h=l.createObjectURL(m),h});else if(c.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(h).then(function(p){return new Promise(function(m,x){let M=m;t.isImageBitmapLoader===!0&&(M=function(A){const v=new cn(A);v.needsUpdate=!0,m(v)}),t.load(ta.resolveURL(p,o.path),M,void 0,x)})}).then(function(p){return f===!0&&l.revokeObjectURL(h),p.userData.mimeType=c.mimeType||Gb(c.uri),p}).catch(function(p){throw console.error("THREE.GLTFLoader: Couldn't load texture",h),p});return this.sourceCache[e]=d,d}assignTexture(e,t,n,r){const o=this;return this.getDependency("texture",n.index).then(function(c){if(!c)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(c=c.clone(),c.channel=n.texCoord),o.extensions[xt.KHR_TEXTURE_TRANSFORM]){const l=n.extensions!==void 0?n.extensions[xt.KHR_TEXTURE_TRANSFORM]:void 0;if(l){const h=o.associations.get(c);c=o.extensions[xt.KHR_TEXTURE_TRANSFORM].extendTexture(c,l),o.associations.set(c,h)}}return r!==void 0&&(c.colorSpace=r),e[t]=c,c})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,c=t.attributes.normal===void 0;if(e.isPoints){const l="PointsMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new Xp,ni.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,h.sizeAttenuation=!1,this.cache.add(l,h)),n=h}else if(e.isLine){const l="LineBasicMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new oo,ni.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,this.cache.add(l,h)),n=h}if(r||o||c){let l="ClonedMaterial:"+n.uuid+":";r&&(l+="derivative-tangents:"),o&&(l+="vertex-colors:"),c&&(l+="flat-shading:");let h=this.cache.get(l);h||(h=n.clone(),o&&(h.vertexColors=!0),c&&(h.flatShading=!0),r&&(h.normalScale&&(h.normalScale.y*=-1),h.clearcoatNormalScale&&(h.clearcoatNormalScale.y*=-1)),this.cache.add(l,h),this.associations.set(h,this.associations.get(n))),n=h}e.material=n}getMaterialType(){return co}loadMaterial(e){const t=this,n=this.json,r=this.extensions,o=n.materials[e];let c;const l={},h=o.extensions||{},f=[];if(h[xt.KHR_MATERIALS_UNLIT]){const p=r[xt.KHR_MATERIALS_UNLIT];c=p.getMaterialType(),f.push(p.extendParams(l,o,t))}else{const p=o.pbrMetallicRoughness||{};if(l.color=new Ne(1,1,1),l.opacity=1,Array.isArray(p.baseColorFactor)){const m=p.baseColorFactor;l.color.setRGB(m[0],m[1],m[2],_n),l.opacity=m[3]}p.baseColorTexture!==void 0&&f.push(t.assignTexture(l,"map",p.baseColorTexture,an)),l.metalness=p.metallicFactor!==void 0?p.metallicFactor:1,l.roughness=p.roughnessFactor!==void 0?p.roughnessFactor:1,p.metallicRoughnessTexture!==void 0&&(f.push(t.assignTexture(l,"metalnessMap",p.metallicRoughnessTexture)),f.push(t.assignTexture(l,"roughnessMap",p.metallicRoughnessTexture))),c=this._invokeOne(function(m){return m.getMaterialType&&m.getMaterialType(e)}),f.push(Promise.all(this._invokeAll(function(m){return m.extendMaterialParams&&m.extendMaterialParams(e,l)})))}o.doubleSided===!0&&(l.side=gi);const d=o.alphaMode||Wu.OPAQUE;if(d===Wu.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,d===Wu.MASK&&(l.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&c!==Fi&&(f.push(t.assignTexture(l,"normalMap",o.normalTexture)),l.normalScale=new Pe(1,1),o.normalTexture.scale!==void 0)){const p=o.normalTexture.scale;l.normalScale.set(p,p)}if(o.occlusionTexture!==void 0&&c!==Fi&&(f.push(t.assignTexture(l,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&c!==Fi){const p=o.emissiveFactor;l.emissive=new Ne().setRGB(p[0],p[1],p[2],_n)}return o.emissiveTexture!==void 0&&c!==Fi&&f.push(t.assignTexture(l,"emissiveMap",o.emissiveTexture,an)),Promise.all(f).then(function(){const p=new c(l);return o.name&&(p.name=o.name),Or(p,o),t.associations.set(p,{materials:e}),o.extensions&&ds(r,p,o),p})}createUniqueName(e){const t=Lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function o(l){return n[xt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,t).then(function(h){return Tm(h,l,t)})}const c=[];for(let l=0,h=e.length;l<h;l++){const f=e[l],d=Hb(f),p=r[d];if(p)c.push(p.promise);else{let m;f.extensions&&f.extensions[xt.KHR_DRACO_MESH_COMPRESSION]?m=o(f):m=Tm(new Kt,f,t),r[d]={primitive:f,promise:m},c.push(m)}}return Promise.all(c)}loadMesh(e){const t=this,n=this.json,r=this.extensions,o=n.meshes[e],c=o.primitives,l=[];for(let h=0,f=c.length;h<f;h++){const d=c[h].material===void 0?Bb(this.cache):this.getDependency("material",c[h].material);l.push(d)}return l.push(t.loadGeometries(c)),Promise.all(l).then(function(h){const f=h.slice(0,h.length-1),d=h[h.length-1],p=[];for(let x=0,M=d.length;x<M;x++){const A=d[x],v=c[x];let _;const C=f[x];if(v.mode===si.TRIANGLES||v.mode===si.TRIANGLE_STRIP||v.mode===si.TRIANGLE_FAN||v.mode===void 0)_=o.isSkinnedMesh===!0?new eE(A,C):new ye(A,C),_.isSkinnedMesh===!0&&_.normalizeSkinWeights(),v.mode===si.TRIANGLE_STRIP?_.geometry=xm(_.geometry,pd):v.mode===si.TRIANGLE_FAN&&(_.geometry=xm(_.geometry,Fl));else if(v.mode===si.LINES)_=new Mu(A,C);else if(v.mode===si.LINE_STRIP)_=new ri(A,C);else if(v.mode===si.LINE_LOOP)_=new rE(A,C);else if(v.mode===si.POINTS)_=new sE(A,C);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+v.mode);Object.keys(_.geometry.morphAttributes).length>0&&kb(_,o),_.name=t.createUniqueName(o.name||"mesh_"+e),Or(_,o),v.extensions&&ds(r,_,v),t.assignFinalMaterial(_),p.push(_)}for(let x=0,M=p.length;x<M;x++)t.associations.set(p[x],{meshes:e,primitives:x});if(p.length===1)return o.extensions&&ds(r,p[0],o),p[0];const m=new zi;o.extensions&&ds(r,m,o),t.associations.set(m,{meshes:e});for(let x=0,M=p.length;x<M;x++)m.add(p[x]);return m})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Dn(Ui.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new lc(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Or(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,o=t.joints.length;r<o;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const o=r.pop(),c=r,l=[],h=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];if(p){l.push(p);const m=new Qe;o!==null&&m.fromArray(o.array,f*16),h.push(m)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[f])}return new xu(l,h)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],o=r.name?r.name:"animation_"+e,c=[],l=[],h=[],f=[],d=[];for(let p=0,m=r.channels.length;p<m;p++){const x=r.channels[p],M=r.samplers[x.sampler],A=x.target,v=A.node,_=r.parameters!==void 0?r.parameters[M.input]:M.input,C=r.parameters!==void 0?r.parameters[M.output]:M.output;A.node!==void 0&&(c.push(this.getDependency("node",v)),l.push(this.getDependency("accessor",_)),h.push(this.getDependency("accessor",C)),f.push(M),d.push(A))}return Promise.all([Promise.all(c),Promise.all(l),Promise.all(h),Promise.all(f),Promise.all(d)]).then(function(p){const m=p[0],x=p[1],M=p[2],A=p[3],v=p[4],_=[];for(let C=0,b=m.length;C<b;C++){const L=m[C],k=x[C],U=M[C],O=A[C],I=v[C];if(L===void 0)continue;L.updateMatrix&&L.updateMatrix();const E=n._createAnimationTracks(L,k,U,O,I);if(E)for(let y=0;y<E.length;y++)_.push(E[y])}return new pE(o,void 0,_)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(o){const c=n._getNodeRef(n.meshCache,r.mesh,o);return r.weights!==void 0&&c.traverse(function(l){if(l.isMesh)for(let h=0,f=r.weights.length;h<f;h++)l.morphTargetInfluences[h]=r.weights[h]}),c})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],o=n._loadNodeShallow(e),c=[],l=r.children||[];for(let f=0,d=l.length;f<d;f++)c.push(n.getDependency("node",l[f]));const h=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([o,Promise.all(c),h]).then(function(f){const d=f[0],p=f[1],m=f[2];m!==null&&d.traverse(function(x){x.isSkinnedMesh&&x.bind(m,Vb)});for(let x=0,M=p.length;x<M;x++)d.add(p[x]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const o=t.nodes[e],c=o.name?r.createUniqueName(o.name):"",l=[],h=r._invokeOne(function(f){return f.createNodeMesh&&f.createNodeMesh(e)});return h&&l.push(h),o.camera!==void 0&&l.push(r.getDependency("camera",o.camera).then(function(f){return r._getNodeRef(r.cameraCache,o.camera,f)})),r._invokeAll(function(f){return f.createNodeAttachment&&f.createNodeAttachment(e)}).forEach(function(f){l.push(f)}),this.nodeCache[e]=Promise.all(l).then(function(f){let d;if(o.isBone===!0?d=new Up:f.length>1?d=new zi:f.length===1?d=f[0]:d=new mt,d!==f[0])for(let p=0,m=f.length;p<m;p++)d.add(f[p]);if(o.name&&(d.userData.name=o.name,d.name=c),Or(d,o),o.extensions&&ds(n,d,o),o.matrix!==void 0){const p=new Qe;p.fromArray(o.matrix),d.applyMatrix4(p)}else o.translation!==void 0&&d.position.fromArray(o.translation),o.rotation!==void 0&&d.quaternion.fromArray(o.rotation),o.scale!==void 0&&d.scale.fromArray(o.scale);return r.associations.has(d)||r.associations.set(d,{}),r.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,o=new zi;n.name&&(o.name=r.createUniqueName(n.name)),Or(o,n),n.extensions&&ds(t,o,n);const c=n.nodes||[],l=[];for(let h=0,f=c.length;h<f;h++)l.push(r.getDependency("node",c[h]));return Promise.all(l).then(function(h){for(let d=0,p=h.length;d<p;d++)o.add(h[d]);const f=d=>{const p=new Map;for(const[m,x]of r.associations)(m instanceof ni||m instanceof cn)&&p.set(m,x);return d.traverse(m=>{const x=r.associations.get(m);x!=null&&p.set(m,x)}),p};return r.associations=f(o),o})}_createAnimationTracks(e,t,n,r,o){const c=[],l=e.name?e.name:e.uuid,h=[];Dr[o.path]===Dr.weights?e.traverse(function(m){m.morphTargetInfluences&&h.push(m.name?m.name:m.uuid)}):h.push(l);let f;switch(Dr[o.path]){case Dr.weights:f=uo;break;case Dr.rotation:f=cs;break;case Dr.position:case Dr.scale:f=fo;break;default:switch(n.itemSize){case 1:f=uo;break;case 2:case 3:default:f=fo;break}break}const d=r.interpolation!==void 0?Fb[r.interpolation]:Ls,p=this._getArrayFromAccessor(n);for(let m=0,x=h.length;m<x;m++){const M=new f(h[m]+"."+Dr[o.path],t.array,p,d);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(M),c.push(M)}return c}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Yu(t.constructor),r=new Float32Array(t.length);for(let o=0,c=t.length;o<c;o++)r[o]=t[o]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof cs?Nb:Mm;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Xb(i,e,t){const n=e.attributes,r=new yi;if(n.POSITION!==void 0){const l=t.json.accessors[n.POSITION],h=l.min,f=l.max;if(h!==void 0&&f!==void 0){if(r.set(new N(h[0],h[1],h[2]),new N(f[0],f[1],f[2])),l.normalized){const d=Yu(mo[l.componentType]);r.min.multiplyScalar(d),r.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const o=e.targets;if(o!==void 0){const l=new N,h=new N;for(let f=0,d=o.length;f<d;f++){const p=o[f];if(p.POSITION!==void 0){const m=t.json.accessors[p.POSITION],x=m.min,M=m.max;if(x!==void 0&&M!==void 0){if(h.setX(Math.max(Math.abs(x[0]),Math.abs(M[0]))),h.setY(Math.max(Math.abs(x[1]),Math.abs(M[1]))),h.setZ(Math.max(Math.abs(x[2]),Math.abs(M[2]))),m.normalized){const A=Yu(mo[m.componentType]);h.multiplyScalar(A)}l.max(h)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(l)}i.boundingBox=r;const c=new Ni;r.getCenter(c.center),c.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=c}function Tm(i,e,t){const n=e.attributes,r=[];function o(c,l){return t.getDependency("accessor",c).then(function(h){i.setAttribute(l,h)})}for(const c in n){const l=Vu[c]||c.toLowerCase();l in i.attributes||r.push(o(n[c],l))}if(e.indices!==void 0&&!i.index){const c=t.getDependency("accessor",e.indices).then(function(l){i.setIndex(l)});r.push(c)}return Rt.workingColorSpace!==_n&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Rt.workingColorSpace}" not supported.`),Or(i,e),Xb(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?zb(i,e.targets,t):i})}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var Kn=Uint8Array,go=Uint16Array,Yb=Int32Array,Am=new Kn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),wm=new Kn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),jb=new Kn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Rm=function(i,e){for(var t=new go(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new Yb(t[30]),n=1;n<30;++n)for(var o=t[n];o<t[n+1];++o)r[o]=o-t[n]<<5|n;return{b:t,r}},Cm=Rm(Am,2),Pm=Cm.b,qb=Cm.r;Pm[28]=258,qb[258]=28;for(var Kb=Rm(wm,0),Zb=Kb.b,ju=new go(32768),Ht=0;Ht<32768;++Ht){var Ur=(Ht&43690)>>1|(Ht&21845)<<1;Ur=(Ur&52428)>>2|(Ur&13107)<<2,Ur=(Ur&61680)>>4|(Ur&3855)<<4,ju[Ht]=((Ur&65280)>>8|(Ur&255)<<8)>>1}for(var la=function(i,e,t){for(var n=i.length,r=0,o=new go(e);r<n;++r)i[r]&&++o[i[r]-1];var c=new go(e);for(r=1;r<e;++r)c[r]=c[r-1]+o[r-1]<<1;var l;if(t){l=new go(1<<e);var h=15-e;for(r=0;r<n;++r)if(i[r])for(var f=r<<4|i[r],d=e-i[r],p=c[i[r]-1]++<<d,m=p|(1<<d)-1;p<=m;++p)l[ju[p]>>h]=f}else for(l=new go(n),r=0;r<n;++r)i[r]&&(l[r]=ju[c[i[r]-1]++]>>15-i[r]);return l},ua=new Kn(288),Ht=0;Ht<144;++Ht)ua[Ht]=8;for(var Ht=144;Ht<256;++Ht)ua[Ht]=9;for(var Ht=256;Ht<280;++Ht)ua[Ht]=7;for(var Ht=280;Ht<288;++Ht)ua[Ht]=8;for(var Lm=new Kn(32),Ht=0;Ht<32;++Ht)Lm[Ht]=5;var $b=la(ua,9,1),Jb=la(Lm,5,1),qu=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},Ai=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Ku=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},Qb=function(i){return(i+7)/8|0},Zu=function(i,e,t){return(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length),new Kn(i.subarray(e,t))},eT=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],oi=function(i,e,t){var n=new Error(e||eT[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,oi),!t)throw n;return n},tT=function(i,e,t,n){var r=i.length,o=n?n.length:0;if(!r||e.f&&!e.l)return t||new Kn(0);var c=!t,l=c||e.i!=2,h=e.i;c&&(t=new Kn(r*3));var f=function(j){var $e=t.length;if(j>$e){var ze=new Kn(Math.max($e*2,j));ze.set(t),t=ze}},d=e.f||0,p=e.p||0,m=e.b||0,x=e.l,M=e.d,A=e.m,v=e.n,_=r*8;do{if(!x){d=Ai(i,p,1);var C=Ai(i,p+1,3);if(p+=3,C)if(C==1)x=$b,M=Jb,A=9,v=5;else if(C==2){var U=Ai(i,p,31)+257,O=Ai(i,p+10,15)+4,I=U+Ai(i,p+5,31)+1;p+=14;for(var E=new Kn(I),y=new Kn(19),F=0;F<O;++F)y[jb[F]]=Ai(i,p+F*3,7);p+=O*3;for(var V=qu(y),G=(1<<V)-1,q=la(y,V,1),F=0;F<I;){var ne=q[Ai(i,p,G)];p+=ne&15;var b=ne>>4;if(b<16)E[F++]=b;else{var se=0,pe=0;for(b==16?(pe=3+Ai(i,p,3),p+=2,se=E[F-1]):b==17?(pe=3+Ai(i,p,7),p+=3):b==18&&(pe=11+Ai(i,p,127),p+=7);pe--;)E[F++]=se}}var K=E.subarray(0,U),he=E.subarray(U);A=qu(K),v=qu(he),x=la(K,A,1),M=la(he,v,1)}else oi(1);else{var b=Qb(p)+4,L=i[b-4]|i[b-3]<<8,k=b+L;if(k>r){h&&oi(0);break}l&&f(m+L),t.set(i.subarray(b,k),m),e.b=m+=L,e.p=p=k*8,e.f=d;continue}if(p>_){h&&oi(0);break}}l&&f(m+131072);for(var me=(1<<A)-1,Ee=(1<<v)-1,Ke=p;;Ke=p){var se=x[Ku(i,p)&me],ct=se>>4;if(p+=se&15,p>_){h&&oi(0);break}if(se||oi(2),ct<256)t[m++]=ct;else if(ct==256){Ke=p,x=null;break}else{var ie=ct-254;if(ct>264){var F=ct-257,ge=Am[F];ie=Ai(i,p,(1<<ge)-1)+Pm[F],p+=ge}var we=M[Ku(i,p)&Ee],Se=we>>4;we||oi(3),p+=we&15;var he=Zb[Se];if(Se>3){var ge=wm[Se];he+=Ku(i,p)&(1<<ge)-1,p+=ge}if(p>_){h&&oi(0);break}l&&f(m+131072);var Ge=m+ie;if(m<he){var Xe=o-he,lt=Math.min(he,Ge);for(Xe+m<0&&oi(3);m<lt;++m)t[m]=n[Xe+m]}for(;m<Ge;++m)t[m]=t[m-he]}}e.l=x,e.p=Ke,e.b=m,e.f=d,x&&(d=1,e.m=A,e.d=M,e.n=v)}while(!d);return m!=t.length&&c?Zu(t,0,m):t.subarray(0,m)},nT=new Kn(0),Vi=function(i,e){return i[e]|i[e+1]<<8},wi=function(i,e){return(i[e]|i[e+1]<<8|i[e+2]<<16|i[e+3]<<24)>>>0},$u=function(i,e){return wi(i,e)+wi(i,e+4)*4294967296};function iT(i,e){return tT(i,{i:2},e&&e.out,e&&e.dictionary)}var Ju=typeof TextDecoder<"u"&&new TextDecoder,rT=0;try{Ju.decode(nT,{stream:!0}),rT=1}catch{}var sT=function(i){for(var e="",t=0;;){var n=i[t++],r=(n>127)+(n>223)+(n>239);if(t+r>i.length)return{s:e,r:Zu(i,t-1)};r?r==3?(n=((n&15)<<18|(i[t++]&63)<<12|(i[t++]&63)<<6|i[t++]&63)-65536,e+=String.fromCharCode(55296|n>>10,56320|n&1023)):r&1?e+=String.fromCharCode((n&31)<<6|i[t++]&63):e+=String.fromCharCode((n&15)<<12|(i[t++]&63)<<6|i[t++]&63):e+=String.fromCharCode(n)}};function Qu(i,e){if(e){for(var t="",n=0;n<i.length;n+=16384)t+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return t}else{if(Ju)return Ju.decode(i);var r=sT(i),o=r.s,t=r.r;return t.length&&oi(8),o}}var oT=function(i,e){return e+30+Vi(i,e+26)+Vi(i,e+28)},aT=function(i,e,t){var n=Vi(i,e+28),r=Qu(i.subarray(e+46,e+46+n),!(Vi(i,e+8)&2048)),o=e+46+n,c=wi(i,e+20),l=t&&c==4294967295?cT(i,o):[c,wi(i,e+24),wi(i,e+42)],h=l[0],f=l[1],d=l[2];return[Vi(i,e+10),h,f,r,o+Vi(i,e+30)+Vi(i,e+32),d]},cT=function(i,e){for(;Vi(i,e)!=1;e+=4+Vi(i,e+2));return[$u(i,e+12),$u(i,e+4),$u(i,e+20)]};function lT(i,e){for(var t={},n=i.length-22;wi(i,n)!=101010256;--n)(!n||i.length-n>65558)&&oi(13);var r=Vi(i,n+8);if(!r)return{};var o=wi(i,n+16),c=o==4294967295||r==65535;if(c){var l=wi(i,n-12);c=wi(i,l)==101075792,c&&(r=wi(i,l+32),o=wi(i,l+48))}for(var h=0;h<r;++h){var f=aT(i,o,c),d=f[0],p=f[1],m=f[2],x=f[3],M=f[4],A=f[5],v=oT(i,A);o=M,d?d==8?t[x]=iT(i.subarray(v,v+p),{out:new Kn(m)}):oi(14,"unknown compression type "+d):t[x]=Zu(i,v,v+p)}return t}class uT{parse(e){const t={},n=e.split(`
`);let r=null,o=t;const c=[t];for(const l of n)if(l.includes("=")){const h=l.split("="),f=h[0].trim(),d=h[1].trim();if(d.endsWith("{")){const p={};c.push(p),o[f]=p,o=p}else o[f]=d}else if(l.endsWith("{")){const h=o[r]||{};c.push(h),o[r]=h,o=h}else if(l.endsWith("}")){if(c.pop(),c.length===0)continue;o=c[c.length-1]}else if(l.endsWith("(")){const h={};c.push(h),r=l.split("(")[0].trim()||r,o[r]=h,o=h}else l.endsWith(")")?(c.pop(),o=c[c.length-1]):r=l.trim();return t}}class hT extends ls{constructor(e){super(e)}load(e,t,n,r){const o=this,c=new Mc(o.manager);c.setPath(o.path),c.setResponseType("arraybuffer"),c.setRequestHeader(o.requestHeader),c.setWithCredentials(o.withCredentials),c.load(e,function(l){try{t(o.parse(l))}catch(h){r?r(h):console.error(h),o.manager.itemError(e)}},n,r)}parse(e){const t=new uT;function n(I){const E={};new Mc().setResponseType("arraybuffer");for(const F in I){if(F.endsWith("png")){const V=new Blob([I[F]],{type:{type:"image/png"}});E[F]=URL.createObjectURL(V)}if(F.endsWith("usd")||F.endsWith("usda")){if(r(I[F])){console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");continue}const V=Qu(I[F]);E[F]=t.parse(V)}}return E}function r(I){const E=I.slice(0,7),y=new Uint8Array([80,88,82,45,85,83,68,67]);return E.every((F,V)=>F===y[V])}function o(I){if(I.length<1)return;const E=Object.keys(I)[0];let y=!1;if(E.endsWith("usda"))return I[E];if(E.endsWith("usdc"))y=!0;else if(E.endsWith("usd"))if(r(I[E]))y=!0;else return I[E];y&&console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.")}const c=lT(new Uint8Array(e)),l=n(c),h=o(c);if(h===void 0)return console.warn("THREE.USDZLoader: No usda file found."),new zi;const f=Qu(h),d=t.parse(f);function p(I){if(I){if("prepend references"in I){const y=I["prepend references"].split("@"),F=y[1].replace(/^.\//,""),V=y[2].replace(/^<\//,"").replace(/>$/,"");return m(l[F],V)}return m(I)}}function m(I,E){if(I){if(E!==void 0){const y=`def Mesh "${E}"`;if(y in I)return I[y]}for(const y in I){const F=I[y];if(y.startsWith("def Mesh"))return"point3f[] points"in I&&(F["point3f[] points"]=I["point3f[] points"]),"texCoord2f[] primvars:st"in I&&(F["texCoord2f[] primvars:st"]=I["texCoord2f[] primvars:st"]),"int[] primvars:st:indices"in I&&(F["int[] primvars:st:indices"]=I["int[] primvars:st:indices"]),F;if(typeof F=="object"){const V=m(F);if(V)return V}}}}function x(I){if(!I)return;let E=new Kt;if("int[] faceVertexIndices"in I){const y=JSON.parse(I["int[] faceVertexIndices"]);E.setIndex(y)}if("point3f[] points"in I){const y=JSON.parse(I["point3f[] points"].replace(/[()]*/g,"")),F=new Qt(new Float32Array(y),3);E.setAttribute("position",F)}if("normal3f[] normals"in I){const y=JSON.parse(I["normal3f[] normals"].replace(/[()]*/g,"")),F=new Qt(new Float32Array(y),3);E.setAttribute("normal",F)}else E.computeVertexNormals();if("float2[] primvars:st"in I&&(I["texCoord2f[] primvars:st"]=I["float2[] primvars:st"]),"texCoord2f[] primvars:st"in I){const y=JSON.parse(I["texCoord2f[] primvars:st"].replace(/[()]*/g,"")),F=new Qt(new Float32Array(y),2);if("int[] primvars:st:indices"in I){E=E.toNonIndexed();const V=JSON.parse(I["int[] primvars:st:indices"]);E.setAttribute("uv",M(F,V))}else E.setAttribute("uv",F)}return E}function M(I,E){const y=I.array,F=I.itemSize,V=new y.constructor(E.length*F);let G=0,q=0;for(let ne=0,se=E.length;ne<se;ne++){G=E[ne]*F;for(let pe=0;pe<F;pe++)V[q++]=y[G++]}return new Qt(V,F)}function A(I){if(I){if("rel material:binding"in I){const F=I["rel material:binding"].replace(/^<\//,"").replace(/>$/,"").split("/");return v(d,` "${F[1]}"`)}return v(I)}}function v(I,E=""){for(const y in I){const F=I[y];if(y.startsWith("def Material"+E))return F;if(typeof F=="object"){const V=v(F,E);if(V)return V}}}function _(I,E){E["float inputs:rotation"]&&(I.rotation=parseFloat(E["float inputs:rotation"])),E["float2 inputs:scale"]&&(I.repeat=new Pe().fromArray(JSON.parse("["+E["float2 inputs:scale"].replace(/[()]*/g,"")+"]"))),E["float2 inputs:translation"]&&(I.offset=new Pe().fromArray(JSON.parse("["+E["float2 inputs:translation"].replace(/[()]*/g,"")+"]")))}function C(I){const E=new ki;if(I!==void 0){if('def Shader "PreviewSurface"'in I){const y=I['def Shader "PreviewSurface"'];if("color3f inputs:diffuseColor.connect"in y){const F=y["color3f inputs:diffuseColor.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.map=L(V),E.map.colorSpace=an,'def Shader "Transform2d_diffuse"'in I&&_(E.map,I['def Shader "Transform2d_diffuse"'])}else if("color3f inputs:diffuseColor"in y){const F=y["color3f inputs:diffuseColor"].replace(/[()]*/g,"");E.color.fromArray(JSON.parse("["+F+"]"))}if("color3f inputs:emissiveColor.connect"in y){const F=y["color3f inputs:emissiveColor.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.emissiveMap=L(V),E.emissiveMap.colorSpace=an,E.emissive.set(16777215),'def Shader "Transform2d_emissive"'in I&&_(E.emissiveMap,I['def Shader "Transform2d_emissive"'])}else if("color3f inputs:emissiveColor"in y){const F=y["color3f inputs:emissiveColor"].replace(/[()]*/g,"");E.emissive.fromArray(JSON.parse("["+F+"]"))}if("normal3f inputs:normal.connect"in y){const F=y["normal3f inputs:normal.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.normalMap=L(V),E.normalMap.colorSpace=Ln,'def Shader "Transform2d_normal"'in I&&_(E.normalMap,I['def Shader "Transform2d_normal"'])}if("float inputs:roughness.connect"in y){const F=y["float inputs:roughness.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.roughness=1,E.roughnessMap=L(V),E.roughnessMap.colorSpace=Ln,'def Shader "Transform2d_roughness"'in I&&_(E.roughnessMap,I['def Shader "Transform2d_roughness"'])}else"float inputs:roughness"in y&&(E.roughness=parseFloat(y["float inputs:roughness"]));if("float inputs:metallic.connect"in y){const F=y["float inputs:metallic.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.metalness=1,E.metalnessMap=L(V),E.metalnessMap.colorSpace=Ln,'def Shader "Transform2d_metallic"'in I&&_(E.metalnessMap,I['def Shader "Transform2d_metallic"'])}else"float inputs:metallic"in y&&(E.metalness=parseFloat(y["float inputs:metallic"]));if("float inputs:clearcoat.connect"in y){const F=y["float inputs:clearcoat.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.clearcoat=1,E.clearcoatMap=L(V),E.clearcoatMap.colorSpace=Ln,'def Shader "Transform2d_clearcoat"'in I&&_(E.clearcoatMap,I['def Shader "Transform2d_clearcoat"'])}else"float inputs:clearcoat"in y&&(E.clearcoat=parseFloat(y["float inputs:clearcoat"]));if("float inputs:clearcoatRoughness.connect"in y){const F=y["float inputs:clearcoatRoughness.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.clearcoatRoughness=1,E.clearcoatRoughnessMap=L(V),E.clearcoatRoughnessMap.colorSpace=Ln,'def Shader "Transform2d_clearcoatRoughness"'in I&&_(E.clearcoatRoughnessMap,I['def Shader "Transform2d_clearcoatRoughness"'])}else"float inputs:clearcoatRoughness"in y&&(E.clearcoatRoughness=parseFloat(y["float inputs:clearcoatRoughness"]));if("float inputs:ior"in y&&(E.ior=parseFloat(y["float inputs:ior"])),"float inputs:occlusion.connect"in y){const F=y["float inputs:occlusion.connect"],V=b(d,/(\w+).output/.exec(F)[1]);E.aoMap=L(V),E.aoMap.colorSpace=Ln,'def Shader "Transform2d_occlusion"'in I&&_(E.aoMap,I['def Shader "Transform2d_occlusion"'])}}if('def Shader "diffuseColor_texture"'in I){const y=I['def Shader "diffuseColor_texture"'];E.map=L(y),E.map.colorSpace=an}if('def Shader "normal_texture"'in I){const y=I['def Shader "normal_texture"'];E.normalMap=L(y),E.normalMap.colorSpace=Ln}}return E}function b(I,E){for(const y in I){const F=I[y];if(y.startsWith(`def Shader "${E}"`))return F;if(typeof F=="object"){const V=b(F,E);if(V)return V}}}function L(I){if("asset inputs:file"in I){const E=I["asset inputs:file"].replace(/@*/g,""),F=new $p().load(l[E]),V={'"clamp"':tr,'"mirror"':Do,'"repeat"':Kr};return"token inputs:wrapS"in I&&(F.wrapS=V[I["token inputs:wrapS"]]),"token inputs:wrapT"in I&&(F.wrapT=V[I["token inputs:wrapT"]]),F}return null}function k(I){const E=x(p(I)),y=C(A(I)),F=E?new ye(E,y):new mt;if("matrix4d xformOp:transform"in I){const V=JSON.parse("["+I["matrix4d xformOp:transform"].replace(/[()]*/g,"")+"]");F.matrix.fromArray(V),F.matrix.decompose(F.position,F.quaternion,F.scale)}return F}function U(I,E){for(const y in I)if(y.startsWith("def Scope"))U(I[y],E);else if(y.startsWith("def Xform")){const F=k(I[y]);/def Xform "(\w+)"/.test(y)&&(F.name=/def Xform "(\w+)"/.exec(y)[1]),E.add(F),U(I[y],F)}}const O=new zi;return U(d,O),O}}const fT=Object.values({glb:{key:"glb",extension:".glb",options:{}},gltf:{key:"gltf",extension:".gltf",options:{}},usdz:{key:"usdz",extension:".usdz",options:{}}}).map(i=>i.extension);class dT{_gltfLoader;_usdzLoader;constructor(){this._gltfLoader=new fb,this._usdzLoader=new hT}async load(e){const t=this._getFileTypeFromUri(e);return this._load(e,t)}_getFileTypeFromUri(e){const t=e.split(".").pop()?.toLowerCase();if(!t||!fT.includes(t))throw new Error(`Unsupported file type: ${t}`);return t}async _load(e,t){switch(t){case"glb":case"gltf":return this._loadGltf(e);case"usdz":return this._loadUsdz(e)}}async _loadGltf(e){return(await this._gltfLoader.loadAsync(e)).scene}async _loadUsdz(e){return this._usdzLoader.loadAsync(e)}}class eh extends mt{isDIVERoot=!0;loader;constructor(){super(),this.name="Root",this.loader=new dT}ComputeSceneBB(){const e=new yi;return this.traverse(t=>{"isObject3D"in t&&e.expandByObject(t)}),e}GetSceneObject(e){let t;return this.traverse(n=>{t||n.userData.id===e.id&&(t=n)}),t}AddSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.updateLight(e);break}case"model":{this.updateModel(e);break}case"primitive":{this.updatePrimitive(e);break}case"group":{this.updateGroup(e);break}default:console.warn(`DIVERoot.AddSceneObject: Unknown entity type: ${e.entityType}`)}}UpdateSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.updateLight(e);break}case"model":{this.updateModel(e);break}case"primitive":{this.updatePrimitive(e);break}case"group":{this.updateGroup(e);break}default:console.warn(`DIVERoot.UpdateSceneObject: Unknown entity type: ${e.entityType}`)}}DeleteSceneObject(e){switch(e.entityType){case"pov":break;case"light":{this.deleteLight(e);break}case"model":{this.deleteModel(e);break}case"primitive":{this.deletePrimitive(e);break}case"group":{this.deleteGroup(e);break}default:console.warn(`DIVERoot.DeleteSceneObject: Unknown entity type: ${e.entityType}`)}}PlaceOnFloor(e){switch(e.entityType){case"pov":case"light":break;case"model":case"primitive":{this.placeOnFloor(e);break}default:console.warn(`DIVERoot.PlaceOnFloor: Unknown entity type: ${e.entityType}`)}}updateLight(e){let t=this.GetSceneObject(e);if(!t){switch(e.type){case"scene":{t=new sb;break}case"ambient":{t=new GE;break}case"point":{t=new rb;break}default:{console.warn(`DIVERoot.updateLight: Unknown light type: ${e.type}`);return}}t.userData.id=e.id,this.add(t)}e.name!==void 0&&e.name!==null&&(t.name=e.name),e.position!==void 0&&e.position!==null&&t.position.set(e.position.x,e.position.y,e.position.z),e.intensity!==void 0&&e.intensity!==null&&t.SetIntensity(e.intensity),e.enabled!==void 0&&e.enabled!==null&&t.SetEnabled(e.enabled),e.color!==void 0&&e.color!==null&&t.SetColor(new Ne(e.color)),e.visible!==void 0&&e.visible!==null&&(t.visible=e.visible),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updateModel(e){let t=this.GetSceneObject(e);t||(t=new lb,t.userData.id=e.id,t.userData.uri=e.uri,this.add(t)),e.uri!==void 0&&this.loader.load(e.uri).then(n=>{t.SetModel(n),Tn.get(e.id)?.PerformAction("MODEL_LOADED",{id:e.id})}),e.name!==void 0&&(t.name=e.name),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.material!==void 0&&t.SetMaterial(e.material),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updatePrimitive(e){let t=this.GetSceneObject(e);t||(t=new ub,t.userData.id=e.id,this.add(t)),e.name!==void 0&&(t.name=e.name),e.geometry!==void 0&&t.SetGeometry(e.geometry),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.material!==void 0&&t.SetMaterial(e.material),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}updateGroup(e){let t=this.GetSceneObject(e);t||(t=new hb,t.userData.id=e.id,this.add(t)),e.name!==void 0&&(t.name=e.name),e.position!==void 0&&t.SetPosition(e.position),e.rotation!==void 0&&t.SetRotation(e.rotation),e.scale!==void 0&&t.SetScale(e.scale),e.visible!==void 0&&t.SetVisibility(e.visible),e.bbVisible!==void 0&&t.SetLinesVisibility(e.bbVisible),e.parentId!==void 0&&this.setParent({...e,parentId:e.parentId})}deleteLight(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteLight: Light with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deleteModel(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteModel: Model with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deletePrimitive(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deletePrimitive: Primitive with id ${e.id} not found`);return}this.detachTransformControls(t),t.parent.remove(t)}deleteGroup(e){const t=this.GetSceneObject(e);if(!t){console.warn(`DIVERoot.deleteGroup: Group with id ${e.id} not found`);return}this.detachTransformControls(t);for(let n=t.members.length-1;n>=0;n--)this.attach(t.members[n]);t.parent.remove(t)}placeOnFloor(e){const t=this.GetSceneObject(e);t&&t.PlaceOnFloor()}setParent(e){const t=this.GetSceneObject(e);if(t)if(e.parentId!==null){const n=this.GetSceneObject({id:e.parentId});if(!n)return;n.attach(t)}else this.attach(t)}detachTransformControls(e){this.findScene(e).children.find(t=>{"isTransformControls"in t&&t.detach()})}findScene(e){return e.parent!==null?this.findScene(e.parent):e}}const pT="#888888",mT="#dddddd";class gT extends mt{constructor(){super(),this.name="Grid";const e=new zE(100,100,pT,mT);e.material.depthTest=!1,e.layers.mask=om,this.add(e)}SetVisibility(e){this.visible=e}}class _T extends ye{isFloor=!0;constructor(){super(new ns(1e4,1e4),new co({color:new Ne(.5882352941176471,.5882352941176471,.5882352941176471)})),this.name="Floor",this.layers.mask=qn,this.receiveShadow=!0,this.rotateX(-Math.PI/2)}SetVisibility(e){this.visible=e}SetColor(e){this.material.color=new Ne(e)}}class vT{constructor(e,t,n,r,o){this.xrLight=e,this.renderer=t,this.lightProbe=n,this.xrWebGLBinding=null,this.estimationStartCallback=o,this.frameCallback=this.onXRFrame.bind(this);const c=t.xr.getSession();if(r&&"XRWebGLBinding"in window){const l=new Kd(16);e.environment=l.texture;const h=t.getContext();switch(c.preferredReflectionFormat){case"srgba8":h.getExtension("EXT_sRGB");break;case"rgba16f":h.getExtension("OES_texture_half_float");break}this.xrWebGLBinding=new XRWebGLBinding(c,h),this.lightProbe.addEventListener("reflectionchange",()=>{this.updateReflection()})}c.requestAnimationFrame(this.frameCallback)}updateReflection(){const e=this.renderer.properties.get(this.xrLight.environment);if(e){const t=this.xrWebGLBinding.getReflectionCubeMap(this.lightProbe);t&&(e.__webglTexture=t,this.xrLight.environment.needsPMREMUpdate=!0)}}onXRFrame(e,t){if(!this.xrLight)return;t.session.requestAnimationFrame(this.frameCallback);const r=t.getLightEstimate(this.lightProbe);if(r){this.xrLight.lightProbe.sh.fromArray(r.sphericalHarmonicsCoefficients),this.xrLight.lightProbe.intensity=1;const o=Math.max(1,Math.max(r.primaryLightIntensity.x,Math.max(r.primaryLightIntensity.y,r.primaryLightIntensity.z)));this.xrLight.directionalLight.color.setRGB(r.primaryLightIntensity.x/o,r.primaryLightIntensity.y/o,r.primaryLightIntensity.z/o),this.xrLight.directionalLight.intensity=o,this.xrLight.directionalLight.position.copy(r.primaryLightDirection),this.estimationStartCallback&&(this.estimationStartCallback(),this.estimationStartCallback=null)}}dispose(){this.xrLight=null,this.renderer=null,this.lightProbe=null,this.xrWebGLBinding=null}}class xT extends zi{constructor(e,t=!0){super(),this.lightProbe=new RE,this.lightProbe.intensity=0,this.add(this.lightProbe),this.directionalLight=new Cu,this.directionalLight.intensity=0,this.add(this.directionalLight),this.environment=null;let n=null,r=!1;e.xr.addEventListener("sessionstart",()=>{const o=e.xr.getSession();"requestLightProbe"in o&&o.requestLightProbe({reflectionFormat:o.preferredReflectionFormat}).then(c=>{n=new vT(this,e,c,t,()=>{r=!0,this.dispatchEvent({type:"estimationstart"})})})}),e.xr.addEventListener("sessionend",()=>{n&&(n.dispose(),n=null),r&&this.dispatchEvent({type:"estimationend"})}),this.dispose=()=>{n&&(n.dispose(),n=null),this.remove(this.lightProbe),this.lightProbe=null,this.remove(this.directionalLight),this.directionalLight=null,this.environment=null}}}class yT extends mt{_scene;_xrLight;_lightRoot;constructor(e){super(),this.name="XRLightRoot",this._scene=e,this._xrLight=null,this._lightRoot=new eh,this._lightRoot.UpdateSceneObject({id:"XRSceneLight",entityType:"light",name:"XRSceneLight",type:"scene",color:16777215,intensity:1,enabled:!0,visible:!0}),this.add(this._lightRoot)}InitLightEstimation(e){this._xrLight||(this._xrLight=new xT(e,!0),this._xrLight.layers.mask=qn,this.add(this._xrLight)),this._xrLight.addEventListener("estimationstart",()=>{this.onEstimationStart()}),this._xrLight.addEventListener("estimationend",()=>{this.onEstimationEnd()})}DisposeLightEstimation(){this._xrLight&&(this._xrLight.removeEventListener("estimationstart",()=>{this.onEstimationStart()}),this._xrLight.removeEventListener("estimationend",()=>{this.onEstimationEnd()}))}onEstimationStart(){this._lightRoot.visible=!1,this._xrLight&&this._xrLight.environment&&(this._scene.environment=this._xrLight.environment)}onEstimationEnd(){this._lightRoot.visible=!0,this._scene.environment=null,this._xrLight}}class ST extends mt{_xrLightRoot;_xrModelRoot;_xrHandNode;get XRModelRoot(){return this._xrModelRoot}get XRLightRoot(){return this._xrLightRoot}get XRHandNode(){return this._xrHandNode}_xrShadowPlane;constructor(e){super(),this.name="XRRoot",this._xrModelRoot=new eh,this._xrModelRoot.name="XRModelRoot",this.add(this._xrModelRoot),this._xrShadowPlane=new ye(new ns(100,100),new oE({opacity:1,transparent:!0})),this._xrModelRoot.add(this._xrShadowPlane),this._xrLightRoot=new yT(e),this._xrLightRoot.name="XRLightRoot",this.add(this._xrLightRoot),this._xrHandNode=new mt,this._xrHandNode.name="XRHandNode",this.add(this._xrHandNode)}InitLightEstimation(e){this._xrLightRoot.InitLightEstimation(e)}DisposeLightEstimation(){this._xrLightRoot.DisposeLightEstimation()}}class MT extends $M{_root;_floor;_grid;get Root(){return this._root}_xrRoot;get XRRoot(){return this._xrRoot}get Floor(){return this._floor}get Grid(){return this._grid}constructor(){super(),this.background=new Ne(16777215),this._root=new eh,this.add(this._root),this._floor=new _T,this.add(this._floor),this._grid=new gT,this.add(this._grid),this._xrRoot=new ST(this),this._xrRoot.visible=!1,this.add(this._xrRoot)}InitXR(e){this._root.visible=!1,this._xrRoot.visible=!0,this._xrRoot.InitLightEstimation(e)}DisposeXR(){this._root.visible=!0,this._xrRoot.visible=!1,this._xrRoot.DisposeLightEstimation()}SetBackground(e){this.background=new Ne(e)}ComputeSceneBB(){return this.Root.ComputeSceneBB()}GetSceneObject(e){return this.Root.GetSceneObject(e)}AddSceneObject(e){this.Root.AddSceneObject(e)}UpdateSceneObject(e){this.Root.UpdateSceneObject(e)}DeleteSceneObject(e){this.Root.DeleteSceneObject(e)}PlaceOnFloor(e){this.Root.PlaceOnFloor(e)}}const ha={fov:70,near:.1,far:1e3};class fa extends Dn{static EDITOR_VIEW_LAYER_MASK=HE|Du|om|qn;static LIVE_VIEW_LAYER_MASK=qn;onSetCameraLayer=()=>{};constructor(e=ha){super(e.fov||ha.fov,1,e.near||ha.near,e.far||ha.far),this.layers.mask=fa.EDITOR_VIEW_LAYER_MASK}OnResize(e,t){this.aspect=e/t,this.updateProjectionMatrix()}SetCameraLayer(e){this.layers.mask=e==="LIVE"?fa.LIVE_VIEW_LAYER_MASK:fa.EDITOR_VIEW_LAYER_MASK,this.onSetCameraLayer(this.layers.mask)}}const Im={type:"change"},th={type:"start"},Dm={type:"end"},Lc=new zs,Om=new Pr,ET=Math.cos(70*Ui.DEG2RAD);class bT extends Zr{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bs.ROTATE,MIDDLE:bs.DOLLY,RIGHT:bs.PAN},this.touches={ONE:Ts.ROTATE,TWO:Ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return l.phi},this.getAzimuthalAngle=function(){return l.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(S){S.addEventListener("keydown",Te),this._domElementKeyEvents=S},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Te),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Im),n.update(),o=r.NONE},this.update=function(){const S=new N,Z=new rn().setFromUnitVectors(e.up,new N(0,1,0)),oe=Z.clone().invert(),xe=new N,Re=new rn,_t=new N,dt=2*Math.PI;return function(on=null){const At=n.object.position;S.copy(At).sub(n.target),S.applyQuaternion(Z),l.setFromVector3(S),n.autoRotate&&o===r.NONE&&V(y(on)),n.enableDamping?(l.theta+=h.theta*n.dampingFactor,l.phi+=h.phi*n.dampingFactor):(l.theta+=h.theta,l.phi+=h.phi);let Zt=n.minAzimuthAngle,$t=n.maxAzimuthAngle;isFinite(Zt)&&isFinite($t)&&(Zt<-Math.PI?Zt+=dt:Zt>Math.PI&&(Zt-=dt),$t<-Math.PI?$t+=dt:$t>Math.PI&&($t-=dt),Zt<=$t?l.theta=Math.max(Zt,Math.min($t,l.theta)):l.theta=l.theta>(Zt+$t)/2?Math.max(Zt,l.theta):Math.min($t,l.theta)),l.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,l.phi)),l.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Un=!1;if(n.zoomToCursor&&U||n.object.isOrthographicCamera)l.radius=me(l.radius);else{const An=l.radius;l.radius=me(l.radius*f),Un=An!=l.radius}if(S.setFromSpherical(l),S.applyQuaternion(oe),At.copy(n.target).add(S),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),d.set(0,0,0)),n.zoomToCursor&&U){let An=null;if(n.object.isPerspectiveCamera){const ji=S.length();An=me(ji*f);const qi=ji-An;n.object.position.addScaledVector(L,qi),n.object.updateMatrixWorld(),Un=!!qi}else if(n.object.isOrthographicCamera){const ji=new N(k.x,k.y,0);ji.unproject(n.object);const qi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),n.object.updateProjectionMatrix(),Un=qi!==n.object.zoom;const hr=new N(k.x,k.y,0);hr.unproject(n.object),n.object.position.sub(hr).add(ji),n.object.updateMatrixWorld(),An=S.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;An!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(An).add(n.object.position):(Lc.origin.copy(n.object.position),Lc.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Lc.direction))<ET?e.lookAt(n.target):(Om.setFromNormalAndCoplanarPoint(n.object.up,n.target),Lc.intersectPlane(Om,n.target))))}else if(n.object.isOrthographicCamera){const An=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),An!==n.object.zoom&&(n.object.updateProjectionMatrix(),Un=!0)}return f=1,U=!1,Un||xe.distanceToSquared(n.object.position)>c||8*(1-Re.dot(n.object.quaternion))>c||_t.distanceToSquared(n.target)>c?(n.dispatchEvent(Im),xe.copy(n.object.position),Re.copy(n.object.quaternion),_t.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ie),n.domElement.removeEventListener("pointerdown",te),n.domElement.removeEventListener("pointercancel",ue),n.domElement.removeEventListener("wheel",_e),n.domElement.removeEventListener("pointermove",ae),n.domElement.removeEventListener("pointerup",ue),n.domElement.getRootNode().removeEventListener("keydown",Ve,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Te),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=r.NONE;const c=1e-6,l=new rm,h=new rm;let f=1;const d=new N,p=new Pe,m=new Pe,x=new Pe,M=new Pe,A=new Pe,v=new Pe,_=new Pe,C=new Pe,b=new Pe,L=new N,k=new Pe;let U=!1;const O=[],I={};let E=!1;function y(S){return S!==null?2*Math.PI/60*n.autoRotateSpeed*S:2*Math.PI/60/60*n.autoRotateSpeed}function F(S){const Z=Math.abs(S*.01);return Math.pow(.95,n.zoomSpeed*Z)}function V(S){h.theta-=S}function G(S){h.phi-=S}const q=function(){const S=new N;return function(oe,xe){S.setFromMatrixColumn(xe,0),S.multiplyScalar(-oe),d.add(S)}}(),ne=function(){const S=new N;return function(oe,xe){n.screenSpacePanning===!0?S.setFromMatrixColumn(xe,1):(S.setFromMatrixColumn(xe,0),S.crossVectors(n.object.up,S)),S.multiplyScalar(oe),d.add(S)}}(),se=function(){const S=new N;return function(oe,xe){const Re=n.domElement;if(n.object.isPerspectiveCamera){const _t=n.object.position;S.copy(_t).sub(n.target);let dt=S.length();dt*=Math.tan(n.object.fov/2*Math.PI/180),q(2*oe*dt/Re.clientHeight,n.object.matrix),ne(2*xe*dt/Re.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(q(oe*(n.object.right-n.object.left)/n.object.zoom/Re.clientWidth,n.object.matrix),ne(xe*(n.object.top-n.object.bottom)/n.object.zoom/Re.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function pe(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?f/=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function K(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?f*=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function he(S,Z){if(!n.zoomToCursor)return;U=!0;const oe=n.domElement.getBoundingClientRect(),xe=S-oe.left,Re=Z-oe.top,_t=oe.width,dt=oe.height;k.x=xe/_t*2-1,k.y=-(Re/dt)*2+1,L.set(k.x,k.y,1).unproject(n.object).sub(n.object.position).normalize()}function me(S){return Math.max(n.minDistance,Math.min(n.maxDistance,S))}function Ee(S){p.set(S.clientX,S.clientY)}function Ke(S){he(S.clientX,S.clientX),_.set(S.clientX,S.clientY)}function ct(S){M.set(S.clientX,S.clientY)}function ie(S){m.set(S.clientX,S.clientY),x.subVectors(m,p).multiplyScalar(n.rotateSpeed);const Z=n.domElement;V(2*Math.PI*x.x/Z.clientHeight),G(2*Math.PI*x.y/Z.clientHeight),p.copy(m),n.update()}function ge(S){C.set(S.clientX,S.clientY),b.subVectors(C,_),b.y>0?pe(F(b.y)):b.y<0&&K(F(b.y)),_.copy(C),n.update()}function we(S){A.set(S.clientX,S.clientY),v.subVectors(A,M).multiplyScalar(n.panSpeed),se(v.x,v.y),M.copy(A),n.update()}function Se(S){he(S.clientX,S.clientY),S.deltaY<0?K(F(S.deltaY)):S.deltaY>0&&pe(F(S.deltaY)),n.update()}function Ge(S){let Z=!1;switch(S.code){case n.keys.UP:S.ctrlKey||S.metaKey||S.shiftKey?G(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):se(0,n.keyPanSpeed),Z=!0;break;case n.keys.BOTTOM:S.ctrlKey||S.metaKey||S.shiftKey?G(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):se(0,-n.keyPanSpeed),Z=!0;break;case n.keys.LEFT:S.ctrlKey||S.metaKey||S.shiftKey?V(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):se(n.keyPanSpeed,0),Z=!0;break;case n.keys.RIGHT:S.ctrlKey||S.metaKey||S.shiftKey?V(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):se(-n.keyPanSpeed,0),Z=!0;break}Z&&(S.preventDefault(),n.update())}function Xe(S){if(O.length===1)p.set(S.pageX,S.pageY);else{const Z=Mt(S),oe=.5*(S.pageX+Z.x),xe=.5*(S.pageY+Z.y);p.set(oe,xe)}}function lt(S){if(O.length===1)M.set(S.pageX,S.pageY);else{const Z=Mt(S),oe=.5*(S.pageX+Z.x),xe=.5*(S.pageY+Z.y);M.set(oe,xe)}}function j(S){const Z=Mt(S),oe=S.pageX-Z.x,xe=S.pageY-Z.y,Re=Math.sqrt(oe*oe+xe*xe);_.set(0,Re)}function $e(S){n.enableZoom&&j(S),n.enablePan&&lt(S)}function ze(S){n.enableZoom&&j(S),n.enableRotate&&Xe(S)}function bt(S){if(O.length==1)m.set(S.pageX,S.pageY);else{const oe=Mt(S),xe=.5*(S.pageX+oe.x),Re=.5*(S.pageY+oe.y);m.set(xe,Re)}x.subVectors(m,p).multiplyScalar(n.rotateSpeed);const Z=n.domElement;V(2*Math.PI*x.x/Z.clientHeight),G(2*Math.PI*x.y/Z.clientHeight),p.copy(m)}function He(S){if(O.length===1)A.set(S.pageX,S.pageY);else{const Z=Mt(S),oe=.5*(S.pageX+Z.x),xe=.5*(S.pageY+Z.y);A.set(oe,xe)}v.subVectors(A,M).multiplyScalar(n.panSpeed),se(v.x,v.y),M.copy(A)}function Tt(S){const Z=Mt(S),oe=S.pageX-Z.x,xe=S.pageY-Z.y,Re=Math.sqrt(oe*oe+xe*xe);C.set(0,Re),b.set(0,Math.pow(C.y/_.y,n.zoomSpeed)),pe(b.y),_.copy(C);const _t=(S.pageX+Z.x)*.5,dt=(S.pageY+Z.y)*.5;he(_t,dt)}function B(S){n.enableZoom&&Tt(S),n.enablePan&&He(S)}function w(S){n.enableZoom&&Tt(S),n.enableRotate&&bt(S)}function te(S){n.enabled!==!1&&(O.length===0&&(n.domElement.setPointerCapture(S.pointerId),n.domElement.addEventListener("pointermove",ae),n.domElement.addEventListener("pointerup",ue)),!St(S)&&(ut(S),S.pointerType==="touch"?qe(S):de(S)))}function ae(S){n.enabled!==!1&&(S.pointerType==="touch"?Le(S):Be(S))}function ue(S){switch(ft(S),O.length){case 0:n.domElement.releasePointerCapture(S.pointerId),n.domElement.removeEventListener("pointermove",ae),n.domElement.removeEventListener("pointerup",ue),n.dispatchEvent(Dm),o=r.NONE;break;case 1:const Z=O[0],oe=I[Z];qe({pointerId:Z,pageX:oe.x,pageY:oe.y});break}}function de(S){let Z;switch(S.button){case 0:Z=n.mouseButtons.LEFT;break;case 1:Z=n.mouseButtons.MIDDLE;break;case 2:Z=n.mouseButtons.RIGHT;break;default:Z=-1}switch(Z){case bs.DOLLY:if(n.enableZoom===!1)return;Ke(S),o=r.DOLLY;break;case bs.ROTATE:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enablePan===!1)return;ct(S),o=r.PAN}else{if(n.enableRotate===!1)return;Ee(S),o=r.ROTATE}break;case bs.PAN:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enableRotate===!1)return;Ee(S),o=r.ROTATE}else{if(n.enablePan===!1)return;ct(S),o=r.PAN}break;default:o=r.NONE}o!==r.NONE&&n.dispatchEvent(th)}function Be(S){switch(o){case r.ROTATE:if(n.enableRotate===!1)return;ie(S);break;case r.DOLLY:if(n.enableZoom===!1)return;ge(S);break;case r.PAN:if(n.enablePan===!1)return;we(S);break}}function _e(S){n.enabled===!1||n.enableZoom===!1||o!==r.NONE||(S.preventDefault(),n.dispatchEvent(th),Se(De(S)),n.dispatchEvent(Dm))}function De(S){const Z=S.deltaMode,oe={clientX:S.clientX,clientY:S.clientY,deltaY:S.deltaY};switch(Z){case 1:oe.deltaY*=16;break;case 2:oe.deltaY*=100;break}return S.ctrlKey&&!E&&(oe.deltaY*=10),oe}function Ve(S){S.key==="Control"&&(E=!0,n.domElement.getRootNode().addEventListener("keyup",ve,{passive:!0,capture:!0}))}function ve(S){S.key==="Control"&&(E=!1,n.domElement.getRootNode().removeEventListener("keyup",ve,{passive:!0,capture:!0}))}function Te(S){n.enabled===!1||n.enablePan===!1||Ge(S)}function qe(S){switch(gt(S),O.length){case 1:switch(n.touches.ONE){case Ts.ROTATE:if(n.enableRotate===!1)return;Xe(S),o=r.TOUCH_ROTATE;break;case Ts.PAN:if(n.enablePan===!1)return;lt(S),o=r.TOUCH_PAN;break;default:o=r.NONE}break;case 2:switch(n.touches.TWO){case Ts.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;$e(S),o=r.TOUCH_DOLLY_PAN;break;case Ts.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ze(S),o=r.TOUCH_DOLLY_ROTATE;break;default:o=r.NONE}break;default:o=r.NONE}o!==r.NONE&&n.dispatchEvent(th)}function Le(S){switch(gt(S),o){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;bt(S),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;He(S),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;B(S),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;w(S),n.update();break;default:o=r.NONE}}function Ie(S){n.enabled!==!1&&S.preventDefault()}function ut(S){O.push(S.pointerId)}function ft(S){delete I[S.pointerId];for(let Z=0;Z<O.length;Z++)if(O[Z]==S.pointerId){O.splice(Z,1);return}}function St(S){for(let Z=0;Z<O.length;Z++)if(O[Z]==S.pointerId)return!0;return!1}function gt(S){let Z=I[S.pointerId];Z===void 0&&(Z=new Pe,I[S.pointerId]=Z),Z.set(S.pageX,S.pageY)}function Mt(S){const Z=S.pointerId===O[0]?O[1]:O[0];return I[Z]}n.domElement.addEventListener("contextmenu",Ie),n.domElement.addEventListener("pointerdown",te),n.domElement.addEventListener("pointercancel",ue),n.domElement.addEventListener("wheel",_e,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Ve,{passive:!0,capture:!0}),this.update()}}var ur=Object.freeze({Linear:Object.freeze({None:function(i){return i},In:function(i){return i},Out:function(i){return i},InOut:function(i){return i}}),Quadratic:Object.freeze({In:function(i){return i*i},Out:function(i){return i*(2-i)},InOut:function(i){return(i*=2)<1?.5*i*i:-.5*(--i*(i-2)-1)}}),Cubic:Object.freeze({In:function(i){return i*i*i},Out:function(i){return--i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i:.5*((i-=2)*i*i+2)}}),Quartic:Object.freeze({In:function(i){return i*i*i*i},Out:function(i){return 1- --i*i*i*i},InOut:function(i){return(i*=2)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2)}}),Quintic:Object.freeze({In:function(i){return i*i*i*i*i},Out:function(i){return--i*i*i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2)}}),Sinusoidal:Object.freeze({In:function(i){return 1-Math.sin((1-i)*Math.PI/2)},Out:function(i){return Math.sin(i*Math.PI/2)},InOut:function(i){return .5*(1-Math.sin(Math.PI*(.5-i)))}}),Exponential:Object.freeze({In:function(i){return i===0?0:Math.pow(1024,i-1)},Out:function(i){return i===1?1:1-Math.pow(2,-10*i)},InOut:function(i){return i===0?0:i===1?1:(i*=2)<1?.5*Math.pow(1024,i-1):.5*(-Math.pow(2,-10*(i-1))+2)}}),Circular:Object.freeze({In:function(i){return 1-Math.sqrt(1-i*i)},Out:function(i){return Math.sqrt(1- --i*i)},InOut:function(i){return(i*=2)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1)}}),Elastic:Object.freeze({In:function(i){return i===0?0:i===1?1:-Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI)},Out:function(i){return i===0?0:i===1?1:Math.pow(2,-10*i)*Math.sin((i-.1)*5*Math.PI)+1},InOut:function(i){return i===0?0:i===1?1:(i*=2,i<1?-.5*Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI):.5*Math.pow(2,-10*(i-1))*Math.sin((i-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(i){var e=1.70158;return i===1?1:i*i*((e+1)*i-e)},Out:function(i){var e=1.70158;return i===0?0:--i*i*((e+1)*i+e)+1},InOut:function(i){var e=2.5949095;return(i*=2)<1?.5*(i*i*((e+1)*i-e)):.5*((i-=2)*i*((e+1)*i+e)+2)}}),Bounce:Object.freeze({In:function(i){return 1-ur.Bounce.Out(1-i)},Out:function(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},InOut:function(i){return i<.5?ur.Bounce.In(i*2)*.5:ur.Bounce.Out(i*2-1)*.5+.5}}),generatePow:function(i){return i===void 0&&(i=4),i=i<Number.EPSILON?Number.EPSILON:i,i=i>1e4?1e4:i,{In:function(e){return Math.pow(e,i)},Out:function(e){return 1-Math.pow(1-e,i)},InOut:function(e){return e<.5?Math.pow(e*2,i)/2:(1-Math.pow(2-e*2,i))/2+.5}}}}),da=function(){return performance.now()},TT=function(){function i(){this._tweens={},this._tweensAddedDuringUpdate={}}return i.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},i.prototype.removeAll=function(){this._tweens={}},i.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},i.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},i.prototype.update=function(e,t){e===void 0&&(e=da()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<n.length;r++){var o=this._tweens[n[r]],c=!t;o&&o.update(e,c)===!1&&!t&&delete this._tweens[n[r]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},i}(),nh={Linear:function(i,e){var t=i.length-1,n=t*e,r=Math.floor(n),o=nh.Utils.Linear;return e<0?o(i[0],i[1],n):e>1?o(i[t],i[t-1],t-n):o(i[r],i[r+1>t?t:r+1],n-r)},Utils:{Linear:function(i,e,t){return(e-i)*t+i}}},Um=function(){function i(){}return i.nextId=function(){return i._nextId++},i._nextId=0,i}(),ih=new TT,AT=function(){function i(e,t){t===void 0&&(t=ih),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=ur.Linear.None,this._interpolationFunction=nh.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=Um.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return i.prototype.getId=function(){return this._id},i.prototype.isPlaying=function(){return this._isPlaying},i.prototype.isPaused=function(){return this._isPaused},i.prototype.getDuration=function(){return this._duration},i.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t<0?0:t,this},i.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},i.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},i.prototype.start=function(e,t){if(e===void 0&&(e=da()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var n in this._valuesStartRepeat)this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var r={};for(var o in this._valuesEnd)r[o]=this._valuesEnd[o];this._valuesEnd=r}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},i.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},i.prototype._setupProperties=function(e,t,n,r,o){for(var c in n){var l=e[c],h=Array.isArray(l),f=h?"array":typeof l,d=!h&&Array.isArray(n[c]);if(!(f==="undefined"||f==="function")){if(d){var p=n[c];if(p.length===0)continue;for(var m=[l],x=0,M=p.length;x<M;x+=1){var A=this._handleRelativeValue(l,p[x]);if(isNaN(A)){d=!1,console.warn("Found invalid interpolation list. Skipping.");break}m.push(A)}d&&(n[c]=m)}if((f==="object"||h)&&l&&!d){t[c]=h?[]:{};var v=l;for(var _ in v)t[c][_]=v[_];r[c]=h?[]:{};var p=n[c];if(!this._isDynamic){var C={};for(var _ in p)C[_]=p[_];n[c]=p=C}this._setupProperties(v,t[c],p,r[c],o)}else(typeof t[c]>"u"||o)&&(t[c]=l),h||(t[c]*=1),d?r[c]=n[c].slice().reverse():r[c]=t[c]||0}}},i.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},i.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},i.prototype.pause=function(e){return e===void 0&&(e=da()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},i.prototype.resume=function(e){return e===void 0&&(e=da()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},i.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},i.prototype.group=function(e){return e===void 0&&(e=ih),this._group=e,this},i.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},i.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},i.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},i.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},i.prototype.easing=function(e){return e===void 0&&(e=ur.Linear.None),this._easingFunction=e,this},i.prototype.interpolation=function(e){return e===void 0&&(e=nh.Linear),this._interpolationFunction=e,this},i.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},i.prototype.onStart=function(e){return this._onStartCallback=e,this},i.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},i.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},i.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},i.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},i.prototype.onStop=function(e){return this._onStopCallback=e,this},i.prototype.update=function(e,t){var n;if(e===void 0&&(e=da()),t===void 0&&(t=!0),this._isPaused)return!0;var r=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>r)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var o=e-this._startTime,c=this._duration+((n=this._repeatDelayTime)!==null&&n!==void 0?n:this._delayTime),l=this._duration+this._repeat*c,h=this._calculateElapsedPortion(o,c,l),f=this._easingFunction(h),d=this._calculateCompletionStatus(o,c);if(d==="repeat"&&this._processRepetition(o,c),this._updateProperties(this._object,this._valuesStart,this._valuesEnd,f),d==="about-to-repeat"&&this._processRepetition(o,c),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),d==="repeat"||d==="about-to-repeat")this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1;else if(d==="completed"){this._isPlaying=!1,this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var p=0,m=this._chainedTweens.length;p<m;p++)this._chainedTweens[p].start(this._startTime+this._duration,!1)}return d!=="completed"},i.prototype._calculateElapsedPortion=function(e,t,n){if(this._duration===0||e>n)return 1;var r=e%t,o=Math.min(r/this._duration,1);return o===0&&e!==0&&e%this._duration===0?1:o},i.prototype._calculateCompletionStatus=function(e,t){return this._duration!==0&&e<this._duration?"playing":this._repeat<=0?"completed":e===this._duration?"about-to-repeat":"repeat"},i.prototype._processRepetition=function(e,t){var n=Math.min(Math.trunc((e-this._duration)/t)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=n);for(var r in this._valuesStartRepeat){var o=this._valuesEnd[r];!this._yoyo&&typeof o=="string"&&(this._valuesStartRepeat[r]=this._valuesStartRepeat[r]+parseFloat(o)),this._yoyo&&this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r]}this._yoyo&&(this._reversed=!this._reversed),this._startTime+=t*n},i.prototype._updateProperties=function(e,t,n,r){for(var o in n)if(t[o]!==void 0){var c=t[o]||0,l=n[o],h=Array.isArray(e[o]),f=Array.isArray(l),d=!h&&f;d?e[o]=this._interpolationFunction(l,r):typeof l=="object"&&l?this._updateProperties(e[o],c,l,r):(l=this._handleRelativeValue(c,l),typeof l=="number"&&(e[o]=c+(l-c)*r))}},i.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},i.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},i}();Um.nextId;var Wi=ih;Wi.getAll.bind(Wi),Wi.removeAll.bind(Wi),Wi.add.bind(Wi),Wi.remove.bind(Wi);var wT=Wi.update.bind(Wi);const Ic={enableDamping:!0,dampingFactor:.04};class Dc extends bT{static DEFAULT_ZOOM_FACTOR=1;_animationSystem;last=null;animating=!1;locked=!1;stopMoveTo=()=>{};stopRevertLast=()=>{};object;domElement;_removePreRenderCallback=()=>{};constructor(e,t,n,r=Ic){super(e,t.domElement),this._animationSystem=n,this.domElement=t.domElement,this.object=e;const o=t.AddPreRenderCallback(()=>{this.preRenderCallback()});this._removePreRenderCallback=()=>{t.RemovePreRenderCallback(o)},this.enableDamping=r.enableDamping||Ic.enableDamping,this.dampingFactor=r.dampingFactor||Ic.dampingFactor,this.object.position.set(0,2,2),this.target.copy({x:0,y:.5,z:0}),this.update()}Dispose(){this._removePreRenderCallback(),this.dispose()}ComputeEncompassingView(e){const t=e.getCenter(new N),n=e.getSize(new N),r=Math.max(n.x,n.y,n.z)*1.25;return{position:this.object.position.clone().normalize().multiplyScalar(r),target:t}}ZoomIn(e){const t=e||Dc.DEFAULT_ZOOM_FACTOR,{minDistance:n,maxDistance:r}=this;this.minDistance=this.maxDistance=Ui.clamp(this.getDistance()-t,n+t,r-t),this.update(),this.minDistance=n,this.maxDistance=r}ZoomOut(e){const t=e||Dc.DEFAULT_ZOOM_FACTOR,{minDistance:n,maxDistance:r}=this;this.minDistance=this.maxDistance=Ui.clamp(this.getDistance()+t,n+t,r-t),this.update(),this.minDistance=n,this.maxDistance=r}MoveTo(e,t,n,r){if(this.animating)return;const o=e||this.object.position.clone(),c=t||this.target.clone();this.stopRevertLast(),this.locked||(this.last={pos:this.object.position.clone(),target:this.target.clone()}),this.animating=n>0,this.locked=r,this.enabled=!1;const l=this._animationSystem.Animate(this.object.position).to(o,n).easing(ur.Quadratic.Out).start(),h=this._animationSystem.Animate(this.target).to(c,n).easing(ur.Quadratic.Out).onUpdate(()=>{this.object.lookAt(this.target)}).onComplete(()=>{this.animating=!1,this.enabled=!r}).start();this.stopMoveTo=()=>{l.stop(),h.stop()}}RevertLast(e){if(this.animating||!this.locked)return;this.stopMoveTo(),this.animating=e>0,this.enabled=!1;const{pos:t,target:n}=this.last,r=this._animationSystem.Animate(this.object.position).to(t,e).easing(ur.Quadratic.Out).start(),o=this._animationSystem.Animate(this.target).to(n,e).easing(ur.Quadratic.Out).onUpdate(()=>{this.object.lookAt(this.target)}).onComplete(()=>{this.animating=!1,this.locked=!1,this.enabled=!0}).start();this.stopRevertLast=()=>{r.stop(),o.stop()}}preRenderCallback=()=>{this.locked||this.update()}}class RT{static DefaultTool="select";_scene;_controller;_activeTool;_selectTool;get selectTool(){return this._selectTool||(this._selectTool=new eb(this._scene,this._controller)),this._selectTool}constructor(e,t){this._scene=e,this._controller=t,this._selectTool=null,this._activeTool=null}Dispose(){this.removeEventListeners()}GetActiveTool(){return this._activeTool}UseTool(e){switch(this._activeTool?.Deactivate(),e){case"select":{this.addEventListeners(),this.selectTool.Activate(),this._activeTool=this.selectTool;break}case"none":{this.removeEventListeners(),this._activeTool=null;break}default:console.warn(`DIVEToolBox.UseTool: Unknown tool: ${e}`)}}SetGizmoMode(e){this.selectTool.SetGizmoMode(e)}SetGizmoVisibility(e){this.selectTool.SetGizmoVisibility(e)}SetGizmoScaleLinked(e){this.selectTool.SetGizmoScaleLinked(e)}onPointerMove(e){this._activeTool?.onPointerMove(e)}onPointerDown(e){this._activeTool?.onPointerDown(e)}onPointerUp(e){this._activeTool?.onPointerUp(e)}onWheel(e){this._activeTool?.onWheel(e)}addEventListeners(){this._controller.domElement.addEventListener("pointermove",e=>this.onPointerMove(e)),this._controller.domElement.addEventListener("pointerdown",e=>this.onPointerDown(e)),this._controller.domElement.addEventListener("pointerup",e=>this.onPointerUp(e)),this._controller.domElement.addEventListener("wheel",e=>this.onWheel(e))}removeEventListeners(){this._controller.domElement.removeEventListener("pointermove",e=>this.onPointerMove(e)),this._controller.domElement.removeEventListener("pointerdown",e=>this.onPointerDown(e)),this._controller.domElement.removeEventListener("pointerup",e=>this.onPointerUp(e)),this._controller.domElement.removeEventListener("wheel",e=>this.onWheel(e))}}class CT{_renderer;_rendererCallbackId;constructor(e){this._renderer=e,this._rendererCallbackId=this._renderer.AddPreRenderCallback(()=>{this.Update()})}Dispose(){this._renderer.RemovePreRenderCallback(this._rendererCallbackId)}Update(){wT()}Animate(e){return new AT(e)}}function PT(i,e,t){return e=Oc(e),zT(i,Nm()?Reflect.construct(e,t||[],Oc(i).constructor):e.apply(i,t))}function Nm(){try{var i=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Nm=function(){return!!i})()}function LT(i,e){var t=i==null?null:typeof Symbol<"u"&&i[Symbol.iterator]||i["@@iterator"];if(t!=null){var n,r,o,c,l=[],h=!0,f=!1;try{if(o=(t=t.call(i)).next,e===0){if(Object(t)!==t)return;h=!1}else for(;!(h=(n=o.call(t)).done)&&(l.push(n.value),l.length!==e);h=!0);}catch(d){f=!0,r=d}finally{try{if(!h&&t.return!=null&&(c=t.return(),Object(c)!==c))return}finally{if(f)throw r}}return l}}function IT(i,e){if(typeof i!="object"||!i)return i;var t=i[Symbol.toPrimitive];if(t!==void 0){var n=t.call(i,e);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(i)}function DT(i){var e=IT(i,"string");return typeof e=="symbol"?e:String(e)}function OT(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}function UT(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,DT(n.key),n)}}function NT(i,e,t){return e&&UT(i.prototype,e),Object.defineProperty(i,"prototype",{writable:!1}),i}function FT(i,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");i.prototype=Object.create(e&&e.prototype,{constructor:{value:i,writable:!0,configurable:!0}}),Object.defineProperty(i,"prototype",{writable:!1}),e&&rh(i,e)}function Oc(i){return Oc=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Oc(i)}function rh(i,e){return rh=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},rh(i,e)}function BT(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function zT(i,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return BT(i)}function Fm(i,e){return HT(i)||LT(i,e)||Bm(i,e)||WT()}function Uc(i){return kT(i)||GT(i)||Bm(i)||VT()}function kT(i){if(Array.isArray(i))return sh(i)}function HT(i){if(Array.isArray(i))return i}function GT(i){if(typeof Symbol<"u"&&i[Symbol.iterator]!=null||i["@@iterator"]!=null)return Array.from(i)}function Bm(i,e){if(i){if(typeof i=="string")return sh(i,e);var t=Object.prototype.toString.call(i).slice(8,-1);if(t==="Object"&&i.constructor&&(t=i.constructor.name),t==="Map"||t==="Set")return Array.from(i);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return sh(i,e)}}function sh(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=i[t];return n}function VT(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function WT(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var _o=typeof window<"u"&&window.THREE?window.THREE:{LinearFilter:Hn,Sprite:JM,SpriteMaterial:Ap,SRGBColorSpace:an,Texture:cn},oh=function(i){FT(e,i);function e(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:10,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"rgba(255, 255, 255, 1)";return OT(this,e),t=PT(this,e,[new _o.SpriteMaterial]),t._text="".concat(n),t._textHeight=r,t._color=o,t._backgroundColor=!1,t._padding=0,t._borderWidth=0,t._borderRadius=0,t._borderColor="white",t._strokeWidth=0,t._strokeColor="white",t._fontFace="system-ui",t._fontSize=90,t._fontWeight="normal",t._canvas=document.createElement("canvas"),t._genCanvas(),t}return NT(e,[{key:"text",get:function(){return this._text},set:function(n){this._text=n,this._genCanvas()}},{key:"textHeight",get:function(){return this._textHeight},set:function(n){this._textHeight=n,this._genCanvas()}},{key:"color",get:function(){return this._color},set:function(n){this._color=n,this._genCanvas()}},{key:"backgroundColor",get:function(){return this._backgroundColor},set:function(n){this._backgroundColor=n,this._genCanvas()}},{key:"padding",get:function(){return this._padding},set:function(n){this._padding=n,this._genCanvas()}},{key:"borderWidth",get:function(){return this._borderWidth},set:function(n){this._borderWidth=n,this._genCanvas()}},{key:"borderRadius",get:function(){return this._borderRadius},set:function(n){this._borderRadius=n,this._genCanvas()}},{key:"borderColor",get:function(){return this._borderColor},set:function(n){this._borderColor=n,this._genCanvas()}},{key:"fontFace",get:function(){return this._fontFace},set:function(n){this._fontFace=n,this._genCanvas()}},{key:"fontSize",get:function(){return this._fontSize},set:function(n){this._fontSize=n,this._genCanvas()}},{key:"fontWeight",get:function(){return this._fontWeight},set:function(n){this._fontWeight=n,this._genCanvas()}},{key:"strokeWidth",get:function(){return this._strokeWidth},set:function(n){this._strokeWidth=n,this._genCanvas()}},{key:"strokeColor",get:function(){return this._strokeColor},set:function(n){this._strokeColor=n,this._genCanvas()}},{key:"_genCanvas",value:function(){var n=this,r=this._canvas,o=r.getContext("2d"),c=Array.isArray(this.borderWidth)?this.borderWidth:[this.borderWidth,this.borderWidth],l=c.map(function(O){return O*n.fontSize*.1}),h=Array.isArray(this.borderRadius)?this.borderRadius:[this.borderRadius,this.borderRadius,this.borderRadius,this.borderRadius],f=h.map(function(O){return O*n.fontSize*.1}),d=Array.isArray(this.padding)?this.padding:[this.padding,this.padding],p=d.map(function(O){return O*n.fontSize*.1}),m=this.text.split(`
`),x="".concat(this.fontWeight," ").concat(this.fontSize,"px ").concat(this.fontFace);o.font=x;var M=Math.max.apply(Math,Uc(m.map(function(O){return o.measureText(O).width}))),A=this.fontSize*m.length;if(r.width=M+l[0]*2+p[0]*2,r.height=A+l[1]*2+p[1]*2,this.borderWidth){if(o.strokeStyle=this.borderColor,l[0]){var v=l[0]/2;o.lineWidth=l[0],o.beginPath(),o.moveTo(v,f[0]),o.lineTo(v,r.height-f[3]),o.moveTo(r.width-v,f[1]),o.lineTo(r.width-v,r.height-f[2]),o.stroke()}if(l[1]){var _=l[1]/2;o.lineWidth=l[1],o.beginPath(),o.moveTo(Math.max(l[0],f[0]),_),o.lineTo(r.width-Math.max(l[0],f[1]),_),o.moveTo(Math.max(l[0],f[3]),r.height-_),o.lineTo(r.width-Math.max(l[0],f[2]),r.height-_),o.stroke()}if(this.borderRadius){var C=Math.max.apply(Math,Uc(l)),b=C/2;o.lineWidth=C,o.beginPath(),[!!f[0]&&[f[0],b,b,f[0]],!!f[1]&&[r.width-f[1],r.width-b,b,f[1]],!!f[2]&&[r.width-f[2],r.width-b,r.height-b,r.height-f[2]],!!f[3]&&[f[3],b,r.height-b,r.height-f[3]]].filter(function(O){return O}).forEach(function(O){var I=Fm(O,4),E=I[0],y=I[1],F=I[2],V=I[3];o.moveTo(E,F),o.quadraticCurveTo(y,F,y,V)}),o.stroke()}}this.backgroundColor&&(o.fillStyle=this.backgroundColor,this.borderRadius?(o.beginPath(),o.moveTo(l[0],f[0]),[[l[0],f[0],r.width-f[1],l[1],l[1],l[1]],[r.width-l[0],r.width-l[0],r.width-l[0],l[1],f[1],r.height-f[2]],[r.width-l[0],r.width-f[2],f[3],r.height-l[1],r.height-l[1],r.height-l[1]],[l[0],l[0],l[0],r.height-l[1],r.height-f[3],f[0]]].forEach(function(O){var I=Fm(O,6),E=I[0],y=I[1],F=I[2],V=I[3],G=I[4],q=I[5];o.quadraticCurveTo(E,V,y,G),o.lineTo(F,q)}),o.closePath(),o.fill()):o.fillRect(l[0],l[1],r.width-l[0]*2,r.height-l[1]*2)),o.translate.apply(o,Uc(l)),o.translate.apply(o,Uc(p)),o.font=x,o.fillStyle=this.color,o.textBaseline="bottom";var L=this.strokeWidth>0;L&&(o.lineWidth=this.strokeWidth*this.fontSize/10,o.strokeStyle=this.strokeColor),m.forEach(function(O,I){var E=(M-o.measureText(O).width)/2,y=(I+1)*n.fontSize;L&&o.strokeText(O,E,y),o.fillText(O,E,y)}),this.material.map&&this.material.map.dispose();var k=this.material.map=new _o.Texture(r);k.minFilter=_o.LinearFilter,k.colorSpace=_o.SRGBColorSpace,k.needsUpdate=!0;var U=this.textHeight*m.length+c[1]*2+d[1]*2;this.scale.set(U*r.width/r.height,U,0)}},{key:"clone",value:function(){return new this.constructor(this.text,this.textHeight,this.color).copy(this)}},{key:"copy",value:function(n){return _o.Sprite.prototype.copy.call(this,n),this.color=n.color,this.backgroundColor=n.backgroundColor,this.padding=n.padding,this.borderWidth=n.borderWidth,this.borderColor=n.borderColor,this.fontFace=n.fontFace,this.fontSize=n.fontSize,this.fontWeight=n.fontWeight,this.strokeWidth=n.strokeWidth,this.strokeColor=n.strokeColor,this}}]),e}(_o.Sprite);class zm extends lc{axesHelper;_renderer;_scene;_renderCallbackId;constructor(e,t,n){super(-1,1,1,-1,.1,100),this.layers.mask=na,this.axesHelper=new kE(.5),this.axesHelper.layers.mask=na,this.axesHelper.material.depthTest=!1,this.axesHelper.position.set(0,0,-1),this.axesHelper.setColors(new Ne(Nu),new Ne(Fu),new Ne(Bu));const r=new oh("X",.2,pm),o=new oh("Y",.2,mm),c=new oh("Z",.2,gm);r.layers.mask=na,o.layers.mask=na,c.layers.mask=na,r.position.set(.7,0,0),o.position.set(0,.7,0),c.position.set(0,0,.7),this.axesHelper.add(r),this.axesHelper.add(o),this.axesHelper.add(c),this.add(this.axesHelper),this._renderer=e,this._scene=t,this._scene.add(this);const l=new Dt;this._renderCallbackId=e.AddPostRenderCallback(()=>{const h=t.background;t.background=null,e.getViewport(l),e.setViewport(0,0,150,150),e.autoClear=!1,this.SetFromCameraMatrix(n.object.matrix),e.render(t,this),e.setViewport(l),e.autoClear=!0,t.background=h})}Dispose(){this._renderer.RemovePostRenderCallback(this._renderCallbackId),this._scene.remove(this)}SetFromCameraMatrix(e){this.axesHelper.rotation.setFromRotationMatrix(new Qe().extractRotation(e).invert())}}const ah=(i,e)=>{if(Object.keys(i).length===0&&Object.keys(e).length===0)return{};if(typeof i!="object"||typeof e!="object")return e;let t={};return Object.keys(e).forEach(n=>{if(!Object.keys(i).includes(n)){t={...t,[n]:e[n]};return}if(Array.isArray(e[n])){if(!Array.isArray(i[n])){t={...t,[n]:e[n]};return}const r=i[n],o=e[n];if(r.length===0&&o.length===0){t={...t};return}if(r.length!==o.length){t={...t,[n]:e[n]};return}const c=[];if(o.forEach((l,h)=>{const f=ah(r[h],o[h]);Object.keys(f).length&&c.push(o[h])}),Object.keys(c).length){t={...t,[n]:c};return}return}if(typeof e[n]=="object"){if(typeof i[n]!="object"){t={...t,[n]:e[n]};return}const r=ah(i[n],e[n]);if(Object.keys(r).length){t={...t,[n]:r};return}}i[n]!==e[n]&&(t={...t,[n]:e[n]})}),t};var Xi=(i=>(i.IOS="iOS",i.ANDROID="Android",i.WINDOWS="Windows",i.MACOS="MacOS",i.LINUX="Linux",i.UNKNOWN="Unknown",i))(Xi||{}),pa=(i=>(i.NO_WEBXR_API="NO_WEBXR_API",i.NO_HTTPS="NO_HTTPS",i.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE="IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE",i.AR_PERMISSION_DENIED="AR_PERMISSION_DENIED",i.UNKNOWN_ERROR="UNKNOWN_ERROR",i))(pa||{});class XT{static _supportsWebXR=!1;static _webXRUnsupportedReason=null;static GetSystem(){if(typeof window>"u"||!window.navigator)return Xi.UNKNOWN;const e=window.navigator.userAgent.toLowerCase();return e.includes("iphone")||e.includes("ipad")?Xi.IOS:e.includes("android")?Xi.ANDROID:e.includes("windows")?Xi.WINDOWS:e.includes("macintosh")?Xi.MACOS:e.includes("linux")?Xi.LINUX:Xi.UNKNOWN}static async GetSupportsWebXR(){if(this._supportsWebXR!==!1)return this._supportsWebXR;if(!window.isSecureContext)return this._supportsWebXR=!1,this._webXRUnsupportedReason=pa.NO_HTTPS,this._supportsWebXR;if(!navigator.xr)return this._supportsWebXR=!1,this._webXRUnsupportedReason=pa.NO_WEBXR_API,this._supportsWebXR;try{const e=await navigator.xr.isSessionSupported("immersive-ar");this._supportsWebXR=e,this._supportsWebXR||(this._webXRUnsupportedReason=pa.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE)}catch{this._supportsWebXR=!1,this._webXRUnsupportedReason=pa.AR_PERMISSION_DENIED}return this._supportsWebXR}static GetWebXRUnsupportedReason(){return this._supportsWebXR?(console.log("WebXR is supported."),null):this._webXRUnsupportedReason}static GetSupportsARQuickLook(){return document.createElement("a").relList.supports("ar")}static GetSupportsSceneViewer(){if(typeof window>"u"||!window.navigator)return!1;const e=window.navigator.userAgent.toLowerCase();if(!e.includes("android")||!e.includes("chrome"))return!1;const t=e.match(/chrome\/(\d+)/);return!(!t||parseInt(t[1])<89)}static get isMobile(){return this.GetSystem()===Xi.ANDROID||this.GetSystem()===Xi.IOS}static get isDesktop(){return!this.isMobile}static async GetIsARCapable(){return this.GetSupportsARQuickLook()?!0:await this.GetSupportsWebXR()}}const YT={version:"1.19.1-beta.0"};function Yi(i,e){const t=(i+"e").split("e");return+(t[0]+"e"+(+t[1]+(e||0)))}function jT(i,e=0){const t=Yi(i,+e);return Yi(Math.ceil(t),-e)}function qT(i,e=0){const t=Yi(i,+e);return Yi(Math.floor(t),-e)}function km(i,e=0){if(i<0)return-km(-i,e);const t=Yi(i,+e);return Yi(Math.round(t),-e)}function KT(i,e,t){return Math.atan2(i.clone().cross(e).dot(t),e.clone().dot(i))}function ZT(i,e=0){const t=Yi(i,+e);return Yi(Math.round(t),-e).toFixed(e)}function $T(i,e=0){const t=Yi(i,+e);return Yi(Math.trunc(t),-e)}function JT(i){return(Ui.radToDeg(i)+360)%360}function QT(i){return Ui.degToRad(i)}const eA={ceilExp:jT,floorExp:qT,roundExp:km,toFixedExp:ZT,truncateExp:$T,signedAngleTo:KT,radToDeg:JT,degToRad:QT},Hm={autoResize:!0,autoStart:!0,displayAxes:!1,renderer:us,perspectiveCamera:ha,orbitControls:Ic};class Nc{static QuickView(e,t){const n=new Nc(t);n.Communication.PerformAction("SET_CAMERA_TRANSFORM",{position:{x:0,y:2,z:2},target:{x:0,y:.5,z:0}});const r=Ui.generateUUID();n.Communication.PerformAction("ADD_OBJECT",{entityType:"light",type:"scene",name:"light",id:r,enabled:!0,visible:!0,intensity:1,color:16777215});const o=Ui.generateUUID();return n.Communication.Subscribe("MODEL_LOADED",c=>{if(c.id!==o)return;const l=n.Communication.PerformAction("COMPUTE_ENCOMPASSING_VIEW",{});n.Communication.PerformAction("SET_CAMERA_TRANSFORM",{position:l.position,target:l.target})}),n.Communication.PerformAction("ADD_OBJECT",{entityType:"model",name:"object",id:o,position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},uri:e,visible:!0,loaded:!1}),n.Communication.PerformAction("UPDATE_SCENE",{backgroundColor:16777215,gridEnabled:!1,floorColor:16777215}),n}_settings;_resizeObserverId;_width;_height;renderer;scene;perspectiveCamera;orbitControls;toolbox;communication;animationSystem;axisCamera;get Communication(){return this.communication}get Canvas(){return this.renderer.domElement}get Info(){return XT}set Settings(e){const t=ah(this._settings,e);t.renderer&&(this.renderer=new sm(this._settings.renderer)),t.perspectiveCamera&&(t.perspectiveCamera.fov!==void 0&&(this.perspectiveCamera.fov=t.perspectiveCamera.fov),t.perspectiveCamera.near!==void 0&&(this.perspectiveCamera.near=t.perspectiveCamera.near),t.perspectiveCamera.far!==void 0&&(this.perspectiveCamera.far=t.perspectiveCamera.far),this.perspectiveCamera.OnResize(this.renderer.domElement.width,this.renderer.domElement.height)),t.orbitControls&&(t.orbitControls.enableDamping!==void 0&&(this.orbitControls.enableDamping=t.orbitControls.enableDamping),t.orbitControls.dampingFactor!==void 0&&(this.orbitControls.dampingFactor=t.orbitControls.dampingFactor)),t.autoResize!==this._settings.autoResize&&(t.autoResize?this.addResizeObserver():this.removeResizeObserver()),t.displayAxes?this.axisCamera=new zm(this.renderer,this.scene,this.orbitControls):(this.axisCamera?.Dispose(),this.axisCamera=null),Object.assign(this._settings,e)}constructor(e){this._settings={...Hm,...e!==void 0?e:{}},this._resizeObserverId="",this._width=0,this._height=0,this.renderer=new sm(this._settings.renderer),this.scene=new MT,this.perspectiveCamera=new fa(this._settings.perspectiveCamera),this.animationSystem=new CT(this.renderer),this.orbitControls=new Dc(this.perspectiveCamera,this.renderer,this.animationSystem,this._settings.orbitControls),this.toolbox=new RT(this.scene,this.orbitControls),this.communication=new Tn(this.renderer,this.scene,this.orbitControls,this.toolbox),this._settings.displayAxes?this.axisCamera=new zm(this.renderer,this.scene,this.orbitControls):this.axisCamera=null,this._settings.autoResize&&this.addResizeObserver(),window.DIVE={PrintScene:()=>{console.log(this.scene)}},console.log(`DIVE ${YT.version} initialized successfully!`),console.log(`
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

        `),this._settings.autoStart&&this.renderer.StartRenderer(this.scene,this.perspectiveCamera)}Dispose(){this.removeResizeObserver(),this.renderer.Dispose(),this.orbitControls.Dispose(),this.axisCamera?.Dispose(),this.animationSystem.Dispose(),this.toolbox.Dispose(),this.communication.DestroyInstance()}OnResize(e,t){this.renderer.OnResize(e,t),this.perspectiveCamera.OnResize(e,t)}addResizeObserver(){this._resizeObserverId=this.renderer.AddPreRenderCallback(()=>{const e=this.renderer.domElement.parentElement;if(!e)return;const{clientWidth:t,clientHeight:n}=e;t===this._width&&n===this._height||(this.OnResize(t,n),this._width=t,this._height=n)})}removeResizeObserver(){this.renderer.RemovePreRenderCallback(this._resizeObserverId)}}return jr.DIVE=Nc,jr.DIVECommunication=Tn,jr.DIVEDefaultSettings=Hm,jr.DIVEMath=eA,jr.default=Nc,Object.defineProperties(jr,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),jr}({});
//# sourceMappingURL=dive.js.map
