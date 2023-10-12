#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main()
{

  vec2 u_mouse = vec2(u_mouse.x * 2.0 - 1.0, u_mouse.y * 2.0 - 1.0);
  
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float pos1 = step(1.0 * sin(u_time * 4.0), 1.0 - p.x) * 0.8;
  float pos2 = step(1.0 * cos(u_time * 3.0),       p.x) * 0.8;
  float pos3 = step(1.0 * sin(u_time * 2.0), 1.0 - p.x) * step(-1.0 * cos(u_time * 2.0), p.x) * 0.8;

  gl_FragColor = vec4(vec3(pos1 + pos3, pos1 + pos2, pos2 + pos3),1.0);

}
