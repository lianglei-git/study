#iChannel0 file://./_image/cat_01.jpg

float noise(in vec3 x){
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);

	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = textureLod(iChannel0, (uv+ 0.5)/256.0, 0.0).yx;
	return mix(rg.x, rg.y, f.z);
}

vec4 map(vec3 p){
	float den = 0.2 - p.y;

    // invert space	
	p = -7.0*p/dot(p,p);

    // twist space	
	float co = cos(den - 0.25*iTime);
	float si = sin(den - 0.25*iTime);
	p.xz = mat2(co,-si,si,co)*p.xz;

    // smoke	
	float f;
	vec3 q =                          - vec3(0.0,1.0,0.0)*iTime;;
    f  = 0.50000*noise(q); q = q*2.02 - vec3(0.0,1.0,0.0)*iTime;
    f += 0.25000*noise(q); q = q*2.03 - vec3(0.0,1.0,0.0)*iTime;
    f += 0.12500*noise(q); q = q*2.01 - vec3(0.0,1.0,0.0)*iTime;
    f += 0.06250*noise(q); q = q*2.02 - vec3(0.0,1.0,0.0)*iTime;
    f += 0.03125*noise(q);

	den = clamp(den + 4.0*f, 0.0, 1.0);
	
	vec3 col = mix(vec3(1.0,0.9,0.8), vec3(0.4,0.15,0.1), den) + 0.05*sin(p);
	
	return vec4(col, den);
}

vec3 raymarch(in vec3 ro, in vec3 rd, in vec2 pixel){
	vec4 sum = vec4(0.0);

	float t = 0.0;

    // dithering	
	t += 0.05*textureLod(iChannel0, pixel.xy/iChannelu_resolution[0].x, 0.0).x;
	
	for(int i=0; i<100; i++)
	{
		if(sum.a > 0.99) break;
		
		vec3 pos = ro + t*rd;
		vec4 col = map(pos);
		
		col.xyz *= mix(3.1*vec3(1.0,0.5,0.05), vec3(0.48,0.53,0.5), clamp((pos.y-0.2)/2.0, 0.0, 1.0));
		
		col.a *= 0.6;
		col.rgb *= col.a;

		sum = sum + col*(1.0 - sum.a);	

		t += 0.05;
	}

	return clamp(sum.xyz, 0.0, 1.0);
}

void mainImage(out vec4 fragColor, in vec2 q) {
    
    vec2 p = -1. + 2. * q;
    p.x *= iu_resolution.x / iu_resolution.y;
	
    vec2 mo = iMouse.xy / iu_resolution.xy;
    if(iMouse.w <= .00001) mo = vec2(0.);
	
    // camera
    vec3 ro = 4. * normalize(vec3(cos(3. * mo.x), 1.4 - 1. *(mo.y - .1), sin(3. * mo.x)));
	vec3 ta = vec3(0., 1., 0.);
	float cr = .5 * cos(.7 * iTime);
	
    // shake		
	ro += .1 * (-1. + 2. * textureLod(iChannel0, iTime * vec2(.010, .014), 0.).xyz);
	ta += .1 * (-1. + 2. * textureLod(iChannel0, iTime * vec2(.013, .008), 0.).xyz);
	
	// build ray
    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(vec3(sin(cr), cos(cr), 0.), ww));
    vec3 vv = normalize(cross(ww, uu));
    vec3 rd = normalize(p.x * uu + p.y * vv + 2. * ww);
	
    // raymarch	
	vec3 col = raymarch(ro, rd, gl_FragCoord.xy);
	
	// contrast and vignetting	
	col = col * .5 + .5 * col * col * (3. - 2. * col);
	col *= .25 + .75 * pow(16. * q.x * q.y * (1. - q.x) * (1. - q.y), .1);
	
    fragColor = vec4(col, 1.);

}


void main(){

    // vec2 p = (gl_FragCoord.xy * 2. - iu_resolution.xy) / min(iu_resolution.x, iu_resolution.y);
    // vec2 p = gl_FragCoord.xy / iu_resolution.xy;
    vec2 p = gl_FragCoord.xy / iu_resolution.xy;

    vec4 col;
    mainImage(col, p);
    gl_FragColor = col;

}