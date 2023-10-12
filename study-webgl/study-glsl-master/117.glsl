#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;
uniform sampler2D cat1;

// https://nogson2.hatenablog.com/entry/2017/12/12/192100

float random(vec2 st)
{
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main()
{
  vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
  vec2 tUv = gl_FragCoord.xy / u_resolution;

  // float r = random(vec2(tUv.y, mod(u_time * 1., 1.)));
  float r = random(tUv + cos(u_time));

  vec4 t = texture2D(cat1, vec2(tUv.x + r * .1 - .05, tUv.y));
  vec3 color = 1. - vec3(t.r, t.g, t.b);

  gl_FragColor = vec4(color, 1.);

}
