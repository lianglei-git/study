#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_strength;
uniform float u_random;



// 在GLSL（OpenGL Shading Language）中，以下是这些变量的常见含义：

// u_resolution：表示画布（或屏幕）的分辨率，通常是一个vec2类型的变量，包含了画布的宽度和高度。可以使用它来进行坐标映射和屏幕适配。

// u_time：表示当前的时间，通常是一个浮点数变量。它可以用于创建动画效果、模拟物理效果或根据时间变化调整着色器的外观。

// u_mouse：表示鼠标的位置，通常是一个vec2类型的变量，包含了鼠标在画布上的坐标。可以使用它来实现与鼠标交互相关的效果，例如根据鼠标位置改变着色器的行为。

// u_camera：表示相机的参数或视图矩阵，通常是一个mat4类型的变量。它用于控制场景的视角和相机的位置、旋转和缩放等参数。

// u_trails[10]：表示一个包含10个元素的数组，用于存储轨迹或路径的数据。每个元素可以是一个vec3或vec4类型的变量，表示一个点的位置或颜色等信息。这个变量可以用于实现轨迹效果或记录和展示之前的路径信息。

// 需要注意的是，GLSL中的变量名并没有固定的含义，它们的具体用途可以根据着色器的实现和需求而变化。上述的含义是常见的用法，但具体的含义还是要根据具体的着色器代码来确定。

void main()
{
  // vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // float b = sin(u_time * 1.0);
  // gl_FragColor = vec4(u_random * u_time, u_strength, b, 1.0);
  vec2 kk = vec2(100.0,1000.0);
  if(gl_FragCoord.x < kk.x && gl_FragCoord.y > kk.y) {
  gl_FragColor = vec4(0,1,cos(u_time + gl_FragCoord.y / 1200.0),1);
  }
}
