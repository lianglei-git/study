#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 boxSize = vec2(500.0,300.0);
void main()
{
  // 我们首先计算了归一化的纹理坐标 uv，通过将当前像素的坐标 gl_FragCoord.xy 除以画布的分辨率 u_resolution.xy 来实现。这样可以确保我们的纹理坐标在0到1的范围内。
  vec2 uv = gl_FragCoord.xy / boxSize.xy;
  vec3 color = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0, 2, 4));
  gl_FragColor = vec4(color, 1.0);
}
