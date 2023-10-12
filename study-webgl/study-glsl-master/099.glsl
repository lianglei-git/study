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

	vec2 uv = floor(5. * gl_FragCoord.xy * vec2(u_resolution.x / u_resolution.y, 1.) / u_resolution.xy);
	float q = mod(uv.x + uv.y, 2.);

	vec3 dest = vec3(q);
	gl_FragColor = vec4(dest, 1.);

}
