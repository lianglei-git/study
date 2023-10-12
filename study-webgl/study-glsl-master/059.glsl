#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rings(vec2 p){
  vec2 c = mod(p * 8.0, 4.0) - 2.0;
  return sin(length(c * 2.0) * 16.0);
}

void main()
{

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution);
       p /= min(u_resolution.x, u_resolution.y);

  vec3 dest = vec3(rings(p * 10.0 + (u_time * 0.02)));

  // vec3 color = vec3(.9 + p.x, .9 + p.y, 1.0);
  vec3 color = vec3(1., 1., 1.);

  gl_FragColor = vec4(dest * color, 1.0);
}
