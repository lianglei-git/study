#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// float
float random(in float x){
  return fract(sin(x)*1e4);
}

// vec2
float random(in vec2 st){
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

// series
float randomSerie(float x, float freq, float t){
  return step(.8,random(floor(x*freq)-floor(t)));
}

void main()
{

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

  vec3 color = vec3(0.0);

  // 分割カラム数
  float cols = 4.0;

  // 色収差
  float offset = 0.0;

  // 周波数
  float freq = random(floor(u_time)) + abs(atan(u_time) * 0.1);

  // タイミング?
  float t = 60.0 + u_time * (1.0 - freq) * 30.0;

  // タイミング?のパラメータ?
  // if (fract(p.y * cols * 0.5) < 0.5){
  //   t *= -1.0;
  // }

  // 分割カラムの適用
  freq += random(floor(p.y * cols));

  color = vec3(
    randomSerie(p.x, freq * 100.0, t + offset),
    randomSerie(p.x, freq * 100.0, t),
    randomSerie(p.x, freq * 100.0, t - offset)
  );

  gl_FragColor = vec4(color * 0.2, 1.0);

}
