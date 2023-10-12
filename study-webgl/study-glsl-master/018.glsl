#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float map(vec3 p){
	return length(mod(p, 2.0) - 1.0) - 0.3;
}

vec2 rot(vec2 p, float a){
	return vec2(
	cos(a) * p.x - sin(a) * p.y,
	sin(a) * p.x + cos(a) * p.y);
}

void main( void ){
	vec2 uv = ( gl_FragCoord.xy / u_resolution.xy ) * 2.0 - 1.0;

	uv.x *= u_resolution.x / u_resolution.y;

	vec3 pos = vec3(0, 0, u_time);
	vec3 dir = normalize(vec3(uv, 1.0));
	dir.xy = rot(dir.xy, u_time * 0.05);
	dir.zy = rot(dir.zy, u_time * 0.05);

	float t = 0.0;
	for(int i = 0 ; i < 75; i++){
		t += map(t * dir + pos);
	}

	vec3 ip = t * dir + pos;
	gl_FragColor = vec4(vec3(t * 0.03) + map(ip + 0.1) + dir * 0.3, 1.0);
	float V = max(1.0 - dot(uv * 0.3, uv), 0.0);
	gl_FragColor.xyz *= V;

}
