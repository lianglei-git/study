#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

vec2 rotate(vec2 v, float a){
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

void main()
{

  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  vec2 q = mod(uv, .2) - .1;
  		 // q += rotate(q, u_time * 2.);

  // float f = .2 / abs(q.x) * abs(q.y);
	float c = 1. - length(q) * 10.;
				// c += sin(u_time);

  gl_FragColor = vec4(vec3(c), 1.0);

}
