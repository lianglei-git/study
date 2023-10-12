#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

void main()
{
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    float s = sin(u_time * 0.5);
    float c = cos(u_time * 0.25);
    vec2 q = mat2(c, s, -s, c) * p;
    vec2 v = mod(q * 1.0, 2.0) - 1.0;
    float r = sin(length(v) * 10.0 - u_time * 5.0);
    float g = sin(length(v) * 12.5 - u_time * 3.5);
    float b = sin(length(v) * 15.0 - u_time * 2.0);
    gl_FragColor = vec4(vec3(r, g, b), 1.0);
}
