#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

void main(){

  vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  uv = fract(uv * 8.) * 2. - 1.;
  uv.x += pow(sin(u_time), 2.);

  float l = 1. - length(uv);

  vec4 dest = vec4(vec3(l), 1.);

  gl_FragColor = dest;

}