void mainImage(out vec4 fragColor, in vec2 p) {

    float reso = 16.;

    vec2 cell = floor(p * reso);
    vec2 center = (cell + .5) / reso;

    float t = iTime + cell.x + cell.y;
    t *= 4.;

    float l = distance(p, center);
    float r = (.4 + sin(t) * .4) / reso;

    vec3 rgb = vec3((l - r) * reso);
    rgb *= 2.;

    fragColor = vec4(rgb, 1.);
    
}

void main(){

    vec2 p = (gl_FragCoord.xy * 2. - iu_resolution.xy) / min(iu_resolution.x, iu_resolution.y);
    vec4 col;
    mainImage(col, p);
    gl_FragColor = col;
    
}