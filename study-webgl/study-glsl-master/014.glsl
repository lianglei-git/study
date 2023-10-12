#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// foked http://glslsandbox.com/e#47147.0

#define N .45

void main()
{

  vec2 m = vec2(u_mouse.x * 2.0 - 1.0, u_mouse.y * 2.0 - 1.0);
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // float ring = 0.01 / abs(0.5 - length(p));

  float sphere = 512.0 / length(p);
  // sphere = floor(sphere);

  sphere = fract(sphere - (u_time * 0.1));

	gl_FragColor = vec4(vec3(sphere, 0.5, 1.0), 1.0);

}
