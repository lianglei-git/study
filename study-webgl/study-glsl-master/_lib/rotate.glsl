#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

// rotate 2D
vec2 rotate(vec2 v, float a){
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

//	rotate 3D
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

mat2 rot2d(float a)
{
  float s = sin(a);
  float c = cos(a);
  return mat2(c, s, -s, c);
}

mat3 rotX(float a)
{
  float s = sin(a);
  float c = cos(a);
  return mat3(
    1, 0, 0,
    0, c, -s,
    0, s, c
  );
}

mat3 rotY(float a)
{
  float s = sin(a);
  float c = cos(a);
  return mat3(
    c, 0, -s,
    0, 1, 0,
    s, 0, c
  );
}

mat3 rotZ(float a)
{
  float s = sin(a);
  float c = cos(a);
  return mat3(
    c, -s, 0,
    s, c, 0,
    0,0, 1
  );
}
