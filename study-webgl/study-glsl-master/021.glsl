#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//おまけ。これもマーキュリーのシェーダーから
//ノイズ書くの面倒ですぐプレビズ作りたい場合は、以下のperlinnoiseが便利です(出典はURLから)
//http://www.pouet.net/topic.php?which=7920&page=18&x=31&y=14

#define pi 3.14159265
float perlin(vec3 p){
  vec3 i = floor(p);
  vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
  vec3 f = cos((p-i)*pi)*(-.5)+.5;
  a = mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)), f.x);
  a.xy = mix(a.xz, a.yw, f.y);
  return mix(a.x, a.y, f.z);
}

void main( void ){
  vec2 p = ( gl_FragCoord.xy / u_resolution.xy ) + u_mouse / 4.0;
  gl_FragColor = vec4(vec3(perlin(p.xyy * 64.0)), 1.0);
}
