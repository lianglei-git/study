#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

const float PI = 3.14159265;
const float angle = 60.;
const float fov = angle * .5 / PI / 180.;

const vec3 lightDir = normalize(vec3(-.5, .5, .5));
const vec3 ambient = vec3(.05, .05, .05);

vec3 rotate(vec3 p, float angle, vec3 axis){
  vec3 a = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float r = 1.0 - c;
  mat3 m = mat3(
    a.x * a.x * r + c,
    a.y * a.x * r + a.z * s,
    a.z * a.x * r - a.y * s,
    a.x * a.y * r - a.z * s,
    a.y * a.y * r + c,
    a.z * a.y * r + a.x * s,
    a.x * a.z * r + a.y * s,
    a.y * a.z * r - a.x * s,
    a.z * a.z * r + c
  );
  return m * p;
}

float smoothMin(float d1, float d2, float k){
  float h = exp(-k * d1) + exp(-k * d2);
  return -log(h) / k;
}

float sdSphere(vec3 p, float s){
  return length(p) - s;
}

float sdTorus(vec3 p, vec2 t){
  vec2 q = vec2(length(p.xy) - t.x, p.z);
  return length(q)-t.y;
}

float distanceFunc(vec3 p){
  vec3 r = rotate(p, radians(u_time * 50.), vec3(1., 1., 1.));

  float s1 = sdSphere(r, 1.);
  float t1 = sdTorus(r, vec2(1., .5));

  float d1 =
    (sin(.8 * r.x * 10.0)) *
    (sin(.8 * r.y * 10.0)) *
    (sin(.8 * r.z * 10.0));

  // return smoothMin(t1 + d1, t1 - d1, .1);

  // noise
  // return (t1 * d1);

  return t1;

}

vec3 getNormal(vec3 p){
  float d = .0001;
  return normalize(vec3(
    distanceFunc(p + vec3( d, .0, .0)) - distanceFunc(p + vec3(-d, .0, .0)),
    distanceFunc(p + vec3(.0,  d, .0)) - distanceFunc(p + vec3(.0, -d, .0)),
    distanceFunc(p + vec3(.0, .0,  d)) - distanceFunc(p + vec3(.0, .0, -d))
  ));
}

void main()
{

  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution);
       uv /= min(u_resolution.x, u_resolution.y);

  vec3 ray = normalize(vec3(sin(fov) * uv.x, sin(fov) * uv.y, -cos(fov)));

  float d = .0;
  float rLen = .0;

  vec3 cPos = vec3(.0, .0, 50.);
  vec3 rPos = cPos;

  for(int i = 0; i < 128; i++){
    d = distanceFunc(rPos);
    rLen += d;
    rPos = cPos + ray * rLen;
  }

  if(abs(d) < .001){

    vec3 normal = getNormal(rPos);

    // lambert
    // float diffuse = clamp(dot(lightDir, normal), .1, 1.);

    // phong
    float diffuse = max(dot(lightDir, normal), 0.);

    float specular = max(dot(normal, lightDir), 0.);
          specular = pow(specular, 12.) * .8;

    vec3 ambientColor = min(ambient + diffuse, 1.);

    vec3 color = vec3(.1);

    vec3 dest = (color * ambientColor) + vec3(specular);

    gl_FragColor = vec4(dest, 1.);

  } else {

    vec3 color = vec3(.1);

    float vignette = 1.5 - length(uv) * .5;
    color *= vignette;

    gl_FragColor = vec4(color, 1.);

  }

}
