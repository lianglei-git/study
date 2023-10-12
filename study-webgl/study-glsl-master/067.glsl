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
       // p /= min(u_resolution.x, u_resolution.y);

  float trans = sin(u_time * 2.) + cos(u_time * 2.);

  vec3 color = vec3(p, p.y) * p.x * .0001;

  vec3 dest = vec3(color * trans);

  gl_FragColor = vec4(dest, 1);

}
