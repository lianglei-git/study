#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;
uniform sampler2D japan1;
uniform sampler2D japan2;

float remap(float value, float inputMin, float inputMax, float outputMin, float outputMax) {
  return (value - inputMin) * ((outputMax - outputMin) / (inputMax - inputMin)) + outputMin;
}

const float PI = 3.14159265358979323846;

void main(){

  vec2 tUv = gl_FragCoord.xy / u_resolution.xy;

  float w = (.5 - (tUv.x)) * (u_resolution.x / u_resolution.y);
  float h = .5 - tUv.y;
  float distanceFromCenter = sqrt(w * w + h * h);
  float angle = remap(atan(h, w), -PI, PI, 0., 1.);
  vec2 polar = vec2(angle, distanceFromCenter);

  vec4 tex = texture2D(japan2, polar);

	gl_FragColor = tex;

}
