#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_backbuffer;

float sphere(vec2 p)
{
	return length(p);
}

void main()
{

	vec2 uv = (gl_FragCoord.xy * 2. - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

	vec2 q1 = mod(vec2(uv.x), .4) - .2;
	vec2 q2 = mod(vec2(uv.y), .4) - .2;

	float c1 = float(step(q1, vec2(0.)));
	float c2 = float(step(q2, vec2(0.)));

	vec3 dest = vec3(c1 + c2) * .5;

	gl_FragColor = vec4(dest, 1.);

}
