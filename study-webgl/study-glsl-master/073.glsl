#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

const float num = 5.;

vec4 ball(float i, float j){
	float x = u_resolution.x / 2. * (1. + cos(1. * u_time + (3. * i + 4. * j)));
	float y = u_resolution.y / 2. * (1. + sin(2. * u_time + (3. * i + 4. * j)));
	float size = 3. - 2. * sin(u_time);
	vec2 p = vec2(x, y);
	float dist = length(gl_FragCoord.xy - p);
	float intensity = pow(size / dist, 2.);

	vec4 color = vec4(0.);
	// color.r = 0.5 + cos(u_time * i);
	// color.g = 0.5 + sin(u_time * j);
	// color.b = 0.5 + sin(j);
  color.r = .5;
  color.g = .5;
  color.b = .5;

	return color * intensity;
}

void main()
{

	vec4 color = vec4(0.0);
	for (float i = 0.; i < num; ++i){
		for (float j = 0.; j < num; ++j){
			color += ball(i, j);
		}
	}

  // vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
	vec2 uv = vec2(gl_FragCoord.xy / u_resolution);
	vec4 b = texture2D(u_backbuffer, uv) * 0.9;
	gl_FragColor = color + b;

}
