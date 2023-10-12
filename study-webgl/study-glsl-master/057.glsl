#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

void main()
{

  // vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  //
  // float posX = p.x + sin(u_time * 2.0) * 0.5;
  // float posY = p.y + cos(u_time * 2.0) * 0.5;
  //
  // float orb = 0.1 / length(vec2(posX, posY));
  //
  // gl_FragColor = vec4(vec3(orb), 1.0);

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float px = cos(u_time * 2.0);
  float py = sin(u_time * 6.0);
  vec2 pos = vec2(px, py) * 0.5;

  vec2 uv = vec2(gl_FragCoord.xy / u_resolution);

  if(distance(p, pos) < 0.2){
    gl_FragColor = vec4(0.1 / length(pos * uv));
  } else {
    gl_FragColor = texture2D(u_backbuffer, uv) * .9;
  }

}
