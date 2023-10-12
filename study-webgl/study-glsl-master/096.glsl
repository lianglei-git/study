#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_backbuffer;

const int count = 128;

float rnd(vec2 n){
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float sdSphere(vec2 p)
{
  return length(p);
}

void main()
{

  vec2 uv = (gl_FragCoord.xy * 2. - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float c = 1.;

  for(int i = 0; i < count; i++)
  {
    float fi = float(i);
    float x = uv.x + sin(u_time * fi + 1.) * .2;
    float y = uv.y + cos(u_time * fi + 1.) * .2;
    c -= smoothstep(1., .2, sdSphere(vec2(x, y)) * 2.);
  }

  float a = .5;
  vec3 color = vec3(c, c + a, c);

	gl_FragColor = vec4(color, 1.0);

}
