#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main()
{

  vec2 u_mouse = vec2(u_mouse.x * 2.0 - 1.0, u_mouse.y * 2.0 - 1.0);

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // カウンタ
  int count = 0;

  // 原点を少しずらす
  vec2 originPos = p + vec2(-0.5, 0.0);

  // マウス座標を使って拡大度を変更
  float zoom = 1.5 - u_mouse.x * 0.5;

  // 漸化式Zの初期値
  vec2 initial = vec2(0.0, 0.0);

  // 漸化式の繰り返し処理（今回は360回ループ）
  for(int i = 0; i < 360; i++){
    count++;
    if(length(initial) > 2.0){
      break;
    }
    initial = vec2(initial.x * initial.x - initial.y * initial.y, 2.0 * initial.x * initial.y) + originPos * zoom;
  }

  // 漸化式で繰り返した回数をもとに輝度を決める
  float color = float(count) / 360.0;

  // 最終的な色の出力
  gl_FragColor = vec4(vec3(color, 0.0, 0.0), 1.0);

}
