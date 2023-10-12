#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float lengthN(vec2 v, float n){
  vec2 tmp = pow(abs(v), vec2(n));
  return pow(tmp.x+tmp.y, 1.0/n);
}

float rings(vec2 p){

  // ring
  // return sin(length(p) * 16.0);

  // radius
  // return sin(lengthN(p, 4.0) * 16.0);

  vec2 c = mod(p * 8.0, 4.0) - 2.0;
  return sin(length(c) * 16.0);

}

vec2 trans(vec2 p){

  // 極座標
  // float theta = atan(p.y, p.x);
  // float r = length(p);
  // return vec2(theta, r);

  // 極座標
  // float theta = atan(p.y, p.x);
  // float r = length(p);
  // const float radius = 1.0;
  // return vec2(theta, radius/r);

  // sphere
  float tx = acos(-p.x / sqrt(1.0 - p.y * p.y)) + u_time;
  float ty = asin(p.y);
  float r = length(p);
  return (r > 0.0 && r < 1.0) ? vec2(tx, ty) : p;

}

void main()
{

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution);
       p /= min(u_resolution.x, u_resolution.y);

  vec3 dest = vec3(rings(trans(p)));

  gl_FragColor = vec4(dest, 1.0);
}
