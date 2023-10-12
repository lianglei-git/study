
// 基本的渲染染色
void main(void) {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    vec2 xy = gl_FragCoord.xy;
    xy.x = xy.x / iResolution.x;
    if(gl_FragCoord.x > 0.5) {
        gl_FragColor.x = 0.2;
    }
    
}