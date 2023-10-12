#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

uniform sampler2D cat1;

void main()
{

  vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
  vec2 tUv = gl_FragCoord.xy / u_resolution;

  tUv += mod(tUv, .1) - .05;

  vec4 t = texture2D(cat1, tUv);

  // tex
  vec3 tex = vec3(t.r, t.g, t.b);

  // mono
  float mono = t.r + t.g + t.b - 1.;
  vec3 texMono = vec3(mono);

  gl_FragColor = vec4(tex, 1.);

}
