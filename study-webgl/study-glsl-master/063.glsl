#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

vec3 Hue(float hue){
	vec3 rgb = fract(hue + vec3(0.0,2.0/3.0,1.0/3.0));
	rgb = abs(rgb*2.0-1.0);
	return clamp(rgb*3.0-1.0,0.0,1.0);
}

vec3 HSVtoRGB(vec3 hsv){
	return ((Hue(hsv.x)-1.0)*hsv.y+1.0) * hsv.z;
}

void main()
{

  float h = gl_FragCoord.x / u_resolution.x;
  float s = gl_FragCoord.y / u_resolution.y;
  float v = 1.0;

  vec3 rgb = vec3(h, s, v);
  vec3 hsv = HSVtoRGB(vec3(h, s, v));

  gl_FragColor = vec4(hsv, 1.);

}
