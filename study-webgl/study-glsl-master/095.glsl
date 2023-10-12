#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_backbuffer;

const int count = 32;

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
    float x = uv.x + 1.5 - fi * .1;
    float y = uv.y + cos(u_time * 2. + fi) * .25;
    c -= smoothstep(1., .5, sdSphere(vec2(x, y)) * 30.);
  }
  vec3 color = vec3(c);

	gl_FragColor = vec4(color, 1.0);

}
