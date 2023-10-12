#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

void main()
{

  // u_resolution
	vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

  // u_mouse
  // vec2 m = vec2(u_mouse.x * 2.0 - 1.0, u_mouse.y * 2.0 - 1.0);
  vec2 m = vec2(u_mouse.x, u_mouse.y);

	float l = length(p);
	float speed = 2.0;

	vec2 uv = gl_FragCoord.xy / u_resolution.xy + (p / l) * (cos(l * 12.0 - u_time * speed));
       uv += (cos(uv * 4.0 - u_time * 0.5) );
       uv *= 0.6;

  vec3 color = vec3(uv.x, uv.y * 0.8, uv.y * 2.5);

	gl_FragColor = vec4(color, 1.0);

}
