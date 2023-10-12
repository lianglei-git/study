#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

// https://nogson2.hatenablog.com/entry/2017/12/12/192100

float random(vec2 st)
{
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}
¥
void main()
{
  vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  float r1 = random(vec2(uv.x, mod(u_time, 1.)));
  float r2 = random(vec2(uv.y, mod(u_time, 1.)));

  // gl_FragColor = vec4(vec3(r1 * r2), 1.);
  gl_FragColor = vec4(vec3(step(r1, r2)), 1.);

}
