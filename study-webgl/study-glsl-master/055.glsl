#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plasma(vec2 p, float q){
  p *= q;
  return(sin(p.x) * 0.25 + 0.25) + (sin(p.y) * 0.25 + 0.25);
}

void main()
{

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  vec3 dest = vec3(plasma(p + (u_time * 0.2), 10.0));
  gl_FragColor = vec4(dest, 1.0);
}
