#iChannel0 file://./_image/cat_01.jpg

void mainImage(out vec4 fragColor, in vec2 p) {

    vec2 pos = p;
    pos -= vec2(.5, .5);
    pos.x = pos.x;
    pos /= 5. * (.75 - distance(pos, vec2(0., 0.)));
    fragColor = texture2D(iChannel0, pos + vec2(.5, .5));
    
}

void main(){

    // vec2 p = (gl_FragCoord.xy * 2. - iu_resolution.xy) / min(iu_resolution.x, iu_resolution.y);
    vec2 p = gl_FragCoord.xy / iu_resolution.xy;

    vec4 col;
    mainImage(col, p);
    gl_FragColor = col;

}