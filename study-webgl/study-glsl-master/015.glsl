#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main()
{

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float posX1 = p.x + sin(u_time * 1.0) * 0.1;
  float posX2 = p.x + sin(u_time * 4.0) * 0.1;
  float posX3 = p.x + sin(u_time * 4.0) * 0.1;

  float posY1 = p.y + tan(u_time * 1.0) * 0.1;
  float posY2 = p.y + tan(u_time * 3.0) * 0.1;
  float posY3 = p.y + tan(u_time * 3.0) * 0.1;

  float orb1 = 0.1 / length(vec2(posX1, posY1));
  float orb2 = 0.1 / length(vec2(posX2, posY2));
  float orb3 = 0.1 / length(vec2(posX3, posY3));

  float r = abs(orb1 + orb2 + orb3) * 1.0;
  float g = abs(orb1 + orb2 + orb3) * 0.8;
  float b = abs(orb1 + orb2 + orb3) * 0.5;

  gl_FragColor = vec4(vec3(r, b, g), 1.0);
}
