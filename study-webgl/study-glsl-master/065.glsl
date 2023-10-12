#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

vec2 tex(vec2 uv){
    return texture2D(u_backbuffer, uv).xy - 0.5;
}

void main( void ){

  // vec2 pos = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.x - u_mouse.xy + 0.5;

  vec2 pos = (gl_FragCoord.xy * 2.0 - u_resolution);
       pos /= min(u_resolution.x, u_resolution.y);
       // pos /= vec2(u_mouse.x, u_mouse.y);
       // pos /= u_resolution.y - u_mouse.xy + 0.5;

  vec2 u_mouse = vec2(u_mouse.x * 2.0 - 1.0, u_mouse.y * 2.0 - 1.0) * 10.;

  vec2 uv =  (gl_FragCoord.xy / u_resolution.xy);
  vec2 prev = tex(uv);
  vec2 pixel = 2. / u_resolution;

  // ラプラシアンフィルタで加速度を計算
  float accel =
      tex(uv + pixel * vec2(1, 0)).x +
      tex(uv - pixel * vec2(1, 0)).x +
      tex(uv + pixel * vec2(0, 1)).x +
      tex(uv - pixel * vec2(0, 1)).x -
      prev.x * 4.;

  // 伝播速度を掛ける
  accel *= .2;

  // 現在の速度に加速度を足し、さらに減衰率を掛ける
  float velocity = (prev.y + accel) * 0.95;

  // 高さを更新
  float height = prev.x + velocity;

  // マウス位置に波紋を出す
  // height += max(0., 1. - length(pos) * 30.) + .5;

  // これはこれでかっこいい
  height += max(0., 1. - length(pos * u_mouse) * 30.) + .5;

  gl_FragColor = vec4(height, velocity + .5, 0., 1.);

}
