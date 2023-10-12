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

  // vec2 v = (gl_FragCoord.xy - u_resolution / 2.0) / min(u_resolution.y,u_resolution.x) * 20.0;
  vec2 v = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

	float rsum = 0.0;
	float pi2 = 3.1415926535 * 2.0;
	float C = asin(sin(u_time * 0.02));
	float S = acos(cos(u_time * 0.02));
	vec2 shift = vec2(0.2, 1.0);
	float zoom = (0.0 * 1.0 + 1.0);

	for (float i = 0.0; i < N; i+=0.1 ){
		float rr = v.x * v.x + v.y * v.y;
		if(dot(rr,rr) == 0.0) break;
		if(rr > 1.0 ){
			rr = 1.0 / rr;
			v.x = v.x * rr;
			v.y = v.y * rr;
		}
		rsum *= 0.99;
		rsum += rr;
		v = vec2(C * v.x - S * v.y, S * v.x + C * v.y) * zoom + shift;
	}

	float color = rsum * 0.5;

	gl_FragColor = vec4(cos(color * 1.0), cos(color * 2.0), cos(color * 4.0), 1.0 );

}
