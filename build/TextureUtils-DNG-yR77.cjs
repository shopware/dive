"use strict";const n=require("./dive-_-yiZbhn.cjs");let l,m,t,o;function g(e,v=1/0,a=null){m||(m=new n.PlaneGeometry(2,2,1,1)),t||(t=new n.ShaderMaterial({uniforms:{blitTexture:new n.Uniform(e)},vertexShader:`
			varying vec2 vUv;
			void main(){
				vUv = uv;
				gl_Position = vec4(position.xy * 1.0,0.,.999999);
			}`,fragmentShader:`
			uniform sampler2D blitTexture; 
			varying vec2 vUv;

			void main(){ 
				gl_FragColor = vec4(vUv.xy, 0, 1);
				
				#ifdef IS_SRGB
				gl_FragColor = LinearTosRGB( texture2D( blitTexture, vUv) );
				#else
				gl_FragColor = texture2D( blitTexture, vUv);
				#endif
			}`})),t.uniforms.blitTexture.value=e,t.defines.IS_SRGB=e.colorSpace==n.SRGBColorSpace,t.needsUpdate=!0,o||(o=new n.Mesh(m,t),o.frustumCulled=!1);const f=new n.PerspectiveCamera,d=new n.Scene;d.add(o),a===null&&(a=l=new n.WebGLRenderer({antialias:!1}));const s=Math.min(e.image.width,v),c=Math.min(e.image.height,v);a.setSize(s,c),a.clear(),a.render(d,f);const r=document.createElement("canvas"),u=r.getContext("2d");r.width=s,r.height=c,u.drawImage(a.domElement,0,0,s,c);const i=new n.CanvasTexture(r);return i.minFilter=e.minFilter,i.magFilter=e.magFilter,i.wrapS=e.wrapS,i.wrapT=e.wrapT,i.name=e.name,l&&(l.forceContextLoss(),l.dispose(),l=null),i}exports.decompress=g;
//# sourceMappingURL=TextureUtils-DNG-yR77.cjs.map
