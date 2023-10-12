#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

vec2 circle(vec2 p)
{
  return vec2(length(p), .5);
}

vec2 spuare(vec2 p)
{
  return vec2(abs(p.x) + abs(p.y), .5);
}

vec2 hex(vec2 p, float s)
{
  vec2 q = abs(p);
  return vec2(max(q.x * .57735 + q.y - 1. * s, q.x - .866 * s), .5);
  // p.x *= 0.57735*2.0;
	// p.y += mod(floor(p.x), 2.0)*0.5;
	// p = abs((mod(p, 1.0) - 0.5));
	// return vec2(abs(max(p.x*1.5 + p.y, p.y*2.0) - 1.0), .5);
}

vec2 morphing(vec2 p)
{

  float t = u_time * 2.5;

  int pair = int(floor(mod(t, 3.)));

  float a = smoothstep(.2, .8, mod(t, 1.));

  if(pair == 0) return mix(circle(p), spuare(p), a);
  if(pair == 1) return mix(spuare(p), hex(p, .1), a);
    else return mix(hex(p, .1), circle(p), a);

}

vec4 render(vec2 p)
{

  vec2 c = circle(p);
  vec3 color = mix(vec3(1.), vec3(0.), step(1. - float(c), .5));
  return vec4(vec3(color), 1.);

}


void main()
{

  vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  // 01
  // vec2 c = circle(uv);
  // vec3 color = vec3(1.);
  // if(float(c) < .8){
  //   color = vec3(0.);
  // }
  // gl_FragColor = vec4(vec3(color), 1.);

  // 02
  // vec2 c = circle(uv);
  // vec3 color = mix(vec3(1.), vec3(0.), step(float(c), .8));
  // gl_FragColor = vec4(vec3(color), 1.);

  // 03
  // float a = sin(u_time * 5.) * .5 + .5;
  // vec2 c = circle(uv);
  // vec2 s = spuare(uv);
  // vec2 h = hex(uv, .2);
  // vec2 d = mix(c, h, a);
  // vec3 color = mix(vec3(1.), vec3(0.), step(d.x, d.y));
  // gl_FragColor = vec4(vec3(color), 1.);

  // 04 morphing & anti-aliasing
  vec2 d = morphing(uv);
  vec3 color = mix(vec3(1.), vec3(0.), smoothstep(.49, .5, d.x));
  gl_FragColor = vec4(vec3(color), 1.);

  // 05 anti-aliasing
  // vec2 d = circle(uv);
  // vec3 color = vec3(1. - smoothstep(.49, .5, d.x));
  // gl_FragColor = vec4(vec3(color), 1.);

  // vec4 color = vec4(0.);
  // const int iter = 4;
  // for(int i = 0; i < iter; i++)
  // {
  //   float fi = float(i);
  //   vec2 offset = vec2(step(fi, 2.), mod(fi, 2.) - .5) * .0015;
  //   color += render(uv + offset);
  // }
  // color /= float(iter);
  // gl_FragColor = color;

}
