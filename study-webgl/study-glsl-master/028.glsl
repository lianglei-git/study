#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

void main()
{

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

  float horizon = 0.0;
  float fov = 1.0;
  float scale = 0.1;
  vec3 position = vec3(p.x, fov, p.y - horizon);
  vec2 s = vec2(position.x / position.z, position.y / position.z) * scale + (u_time * 0.01);
  float color = sign((mod(s.x, 0.1) - 0.05) * (mod(s.y, 0.1) - 0.05));
        color *= position.z * position.z * 10.0;
  vec3 dest = vec3(color, color, color);

  gl_FragColor = vec4(dest, 1.0);
}
