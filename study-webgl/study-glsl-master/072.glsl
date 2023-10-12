#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

const float num = 10.;

void main()
{

  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  //
  // 01
  // // float x = uv.x + sin(u_time * 2.) * .5;
  // // float y = uv.y + cos(u_time * 2.) * .5;
  // float x = uv.x;
  // float y = uv.y;
  // float color = .1 / length(vec2(x, y));

  //
  // 02
  float color = 0.;

  for(float i = 0.; i < num; i++)
  {

    // float ii = i + 1.0;
    // float x = uv.x * 2. + sin(u_time * ii);
    // float y = uv.y * 2. + cos(u_time * ii);
    // color += .1 / length(vec2(x, y));

    for(float j = 0.; j < num; j++)
    {

      float ii = i + 1.;
      float jj = j + 1.;

      float x = uv.x + ii * .2 - 1.1;
      float y = uv.y + jj * .2 - 1.1;

      color += .1 / length(vec2(x, y)) * .02;

    }
  }

  // for(float i = 0.; i < 10.; i++)
  // {
  //   float j = i + 1.;
  //   vec2 q = uv + vec2(cos(u_time * j), sin(u_time * j)) * 0.5;
  //   color += 0.05 / length(q);
  // }

  vec3 dest = vec3(color);
  gl_FragColor = vec4(dest, 1.);


}
