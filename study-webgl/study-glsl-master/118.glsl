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

  float r = random(vec2(tUv.y, mod(u_time, 10.)));

  if (r < .1){

    tUv.x -= r * 10.;

    // gl_FragColor.r += texture2D(cat1, tUv + vec2(0., 0.)).b;
    // gl_FragColor.b += texture2D(cat1, tUv - vec2(0., 0.)).g;

  } else {

    vec4 tex = texture2D(cat1, tUv * r);
    vec3 color = 1. - vec3(tex.r, tex.g, tex.b);

    gl_FragColor = vec4(color, 1.);
    // gl_FragColor = vec4(vec3(1.), 1.);

  }

}
