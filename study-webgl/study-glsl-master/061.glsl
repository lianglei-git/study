#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main()
{
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
       uv *= 1.2;
  vec3 dest = vec3(1. - uv, 1.);
  gl_FragColor = vec4(dest, 1.);
}
