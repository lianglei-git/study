#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

vec2 circle(vec2 p)
{
  return vec2(length(p), .5);
}


vec2 hash(float p)
{
  vec3 p3 = fract(vec3(p) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.xx+p3.yz) * p3.zy);
}

float random(vec2 st)
{
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main()
{

  vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  // pow
  // float t = fract(u_time);
  // uv.y += mix(.5, -.5, pow(t, .6));

  // epx
  // float t = fract(u_time);
  // uv.y += mix(.5, -.5, 1. - exp(-6. * t));

  // exp(shake)
  uv += (hash(u_time) * 10. - 5.) * .1 * exp(-6.5 * fract(u_time));


  vec2 c = circle(uv);
  vec3 color = vec3(1.);
  if(float(c) < .4){
    color = vec3(0.);
  }
  gl_FragColor = vec4(color, 1.);

}
