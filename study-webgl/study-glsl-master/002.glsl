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

  float posX = p.x + sin(u_time * 2.0) * 0.5;
  float posY = p.y + cos(u_time * 2.0) * 0.5;

  // float orb = 0.1 / length(u_mouse - p);
  // float orb = 0.1 / length(p);
  float orb = 0.1 / length(vec2(posX, posY));

  gl_FragColor = vec4(vec3(orb), 1.0);

}
