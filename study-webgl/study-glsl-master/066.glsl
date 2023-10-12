#ifdef GL_ES
precision mediump float;
#endif

// https://www.shadertoy.com/view/MstXWS

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

void main( void ){

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy);
       p /= min(u_resolution.x, u_resolution.y);

  float px = p.x + sin(u_time * 0.);
  float py = p.y + cos(u_time * 0.);

  float c1 = length(px * py);

  float c2 = fract(px * py);

  // float c2 = length(1.0) * .5;
  //       c2 = c2 + sin(u_time * 2.);

  vec3 dest = vec3(p + c1 + c2, 1.) * .7;

  gl_FragColor = vec4(dest, 1);

}
