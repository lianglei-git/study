void mainImage(out vec4 fragColor, in vec2 p) {

    float t = .01 / abs(.5 - length(p));
    vec3 col = vec3(t);
    fragColor = vec4(col, 1);

}

void main(){

    vec2 p = (gl_FragCoord.xy * 2. - iu_resolution.xy) / min(iu_resolution.x, iu_resolution.y);
    vec4 col;
    mainImage(col, p);
    gl_FragColor = col;

}