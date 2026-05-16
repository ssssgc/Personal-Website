const wglMouse = { x: 0.5, y: 0.5 };
addEventListener('mousemove', e => { wglMouse.x = e.clientX / innerWidth; wglMouse.y = e.clientY / innerHeight; });

const WGL_VS = `attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}`;

const WGL_FS_DARK = `precision highp float;
uniform vec2 u_resolution;uniform float u_time;uniform vec2 u_mouse;
vec3 palette(float t,vec3 a,vec3 b,vec3 c,vec3 d){return a+b*cos(6.28318*(c*t+d));}
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;
  vec2 p=uv*2.0-1.0;p.x*=u_resolution.x/u_resolution.y;
  vec2 m=u_mouse*2.0-1.0;m.x*=u_resolution.x/u_resolution.y;
  float md=length(p-m);
  float mr=sin(md*15.0-u_time*4.0)*exp(-md*3.0);p+=mr*0.08;
  vec2 p0=p;
  for(float i=1.0;i<4.0;i++){
    p.x+=0.1/i*sin(i*3.0*p.y+u_time*0.4)+0.05;
    p.y+=0.1/i*cos(i*2.0*p.x+u_time*0.3)-0.05;
  }
  float r=length(p);float ang=atan(p.y,p.x);
  vec3 a=vec3(0.08,0.08,0.09);
  vec3 b=vec3(0.02,0.03,0.04);
  vec3 c=vec3(1.0,1.0,1.0);
  vec3 d=vec3(0.1,0.2,0.4);
  vec3 col=palette(r*1.5+p0.x*0.5+u_time*0.1,a,b,c,d);
  float disp=sin(r*25.0-u_time*1.5+ang*2.0)*0.5+0.5;
  col+=vec3(disp*0.012,disp*0.008,disp*0.015);
  float hi=pow(sin(p.x*4.0+p.y*3.0+u_time)*0.5+0.5,8.0);
  col+=hi*0.05;
  vec3 base=vec3(0.03,0.03,0.04);
  col=mix(base,col,0.88);
  gl_FragColor=vec4(col,1.0);
}`;

const WGL_FS_LIGHT = `precision highp float;
uniform vec2 u_resolution;uniform float u_time;uniform vec2 u_mouse;
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;
  vec2 p=uv;p.x*=u_resolution.x/u_resolution.y;
  vec2 m=u_mouse;m.x*=u_resolution.x/u_resolution.y;
  vec2 md=p-m;float dl=length(md);
  float ripple=exp(-dl*4.5)*sin(dl*18.0-u_time*2.0)*0.006;
  p+=normalize(md+vec2(0.0001))*ripple;
  float band1=sin(p.x*2.2+u_time*0.1)*cos(p.y*1.6+u_time*0.07)*0.016;
  float band2=sin(p.x*1.4+p.y*1.0+u_time*0.05)*0.012;
  float band3=cos(p.y*2.8-p.x*0.8+u_time*0.09)*0.010;
  float gloss=pow(abs(sin(p.x*5.0+p.y*2.0+u_time*0.07)),4.0)*0.025;
  gloss+=pow(abs(sin(p.x*3.5-p.y*3.0-u_time*0.05)),5.0)*0.018;
  float breath=sin(u_time*0.22)*0.015+0.015;
  float motion=band1+band2+band3+breath;
  float centerDist=length(uv-0.5)*1.3;
  float centerGlow=(1.0-smoothstep(0.0,1.0,centerDist))*0.025;
  vec3 col=vec3(0.973,0.976,0.322);
  col+=motion*0.04+vec3(gloss)+centerGlow;
  col=clamp(col,0.0,1.0);
  gl_FragColor=vec4(col,1.0);
}`;

function wglBoot(canvasId, fsSrc) {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext('webgl', { alpha: false, antialias: true });
  if (!gl) return () => false;
  const mk = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return sh; };
  const prog = gl.createProgram();
  gl.attachShader(prog, mk(gl.VERTEX_SHADER, WGL_VS));
  gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'position');
  gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const lRes = gl.getUniformLocation(prog, 'u_resolution');
  const lT = gl.getUniformLocation(prog, 'u_time');
  const lM = gl.getUniformLocation(prog, 'u_mouse');
  const resize = () => {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * d; canvas.height = innerHeight * d;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  addEventListener('resize', resize); resize();
  return (tSec) => {
    gl.uniform2f(lRes, canvas.width, canvas.height);
    gl.uniform1f(lT, tSec);
    gl.uniform2f(lM, wglMouse.x, 1 - wglMouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    return true;
  };
}
const wglDrawDark = wglBoot('bg-dark', WGL_FS_DARK);
const wglDrawLight = wglBoot('bg-light', WGL_FS_LIGHT);
const wglT0 = Date.now();
(function wglLoop() {
  const t = (Date.now() - wglT0) / 1000;
  wglDrawDark(t);
  requestAnimationFrame(wglLoop);
})();
