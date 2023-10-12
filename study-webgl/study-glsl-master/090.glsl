#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_backbuffer;

vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d)
{
  return a + b*cos(6.28318*(c*t+d));
}

void main()
{

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // animate
  uv.x += u_time * .1;

  // compute colors
  vec3               col = pal(uv.x, vec3(.5, .5, .5), vec3(.5, .5, .5), vec3(1., 1., 1.), vec3(.0, .33, .67));
  if(uv.y>(1. / 7.)) col = pal(uv.x, vec3(.5, .5, .5), vec3(.5, .5, .5), vec3(1., 1., 1.), vec3(.0, .10, .20));
  if(uv.y>(2. / 7.)) col = pal(uv.x, vec3(.5, .5, .5), vec3(.5, .5, .5), vec3(1., 1., 1.), vec3(.3, .20, .20));
  if(uv.y>(3. / 7.)) col = pal(uv.x, vec3(.5, .5, .5), vec3(.5, .5, .5), vec3(1., 1., 0.), vec3(.8, .90, .30));
  if(uv.y>(4. / 7.)) col = pal(uv.x, vec3(.5, .5, .5), vec3(.5, .5, .5), vec3(1., 0., 0.), vec3(.0, .15, .20));
  if(uv.y>(5. / 7.)) col = pal(uv.x, vec3(.5, .5, .5), vec3(.5, .5, .5), vec3(2., 1., 0.), vec3(.5, .20, .25));
  if(uv.y>(6. / 7.)) col = pal(uv.x, vec3(.8, .5, .4), vec3(.2, .4, .2), vec3(2., 1., 1.), vec3(.0, .25, .25));

  // band
  float f = fract(uv.y * 7.);

  // borders
  col *= smoothstep(.49, .47, abs(f - .5));

  // shadowing
  col *= .5 + .5 * sqrt(4. * f * (1. - f));

  // dithering
  // col += (1. / 255.) * texture(iChannel0, fragCoord.xy / iChannelu_resolution[0].xy).xyz;

	gl_FragColor = vec4(col * .5, 1.);

}
