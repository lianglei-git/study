#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

float random(vec2 st){
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st){
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale;
    return smoothstep(0.0, .5 + b * .5, ceil((sin(pos.x*3.1415)+b*2.0))*.5);
}

void main()
{
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
       p *= 1.0;
  vec2 pos = p.xy * vec2(1.0, 1.0);
  float pattern = 0.0;
  pos = rotate2d(noise(pos * 0.5 + u_time * 0.2) * 3.0) * pos;
  pattern = 1.0 - lines(pos, 0.2) * 2.0;
  vec3 color = vec3(pattern, pattern, pattern) * vec3(1.0, 1.0, 1.0);
  gl_FragColor = vec4(vec3(color), 1.0);
}
