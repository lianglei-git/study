precision highp float;

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

const vec3 light_pos = vec3(.5, .5, -.5);

const float PI = acos(-1.);
const float PI2 = PI * 2.;

float random(vec2 st){
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

//	Simplex 4D Noise 
//	by Ian McEwan, Ashima Arts
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

vec4 grad4(float j, vec4 ip){
	const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
	vec4 p,s;
	p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
	p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
	s = vec4(lessThan(p, vec4(0.0)));
	p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; 
	return p;
}

float snoise(vec4 v){
	const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
							0.309016994374947451); // (sqrt(5) - 1)/4   F4
	// First corner
	vec4 i  = floor(v + dot(v, C.yyyy) );
	vec4 x0 = v -   i + dot(i, C.xxxx);
	// Other corners
	// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
	vec4 i0;
	vec3 isX = step( x0.yzw, x0.xxx );
	vec3 isYZ = step( x0.zww, x0.yyz );
	//  i0.x = dot( isX, vec3( 1.0 ) );
	i0.x = isX.x + isX.y + isX.z;
	i0.yzw = 1.0 - isX;
	//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
	i0.y += isYZ.x + isYZ.y;
	i0.zw += 1.0 - isYZ.xy;
	i0.z += isYZ.z;
	i0.w += 1.0 - isYZ.z;
	// i0 now contains the unique values 0,1,2,3 in each channel
	vec4 i3 = clamp( i0, 0.0, 1.0 );
	vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
	vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );
	//  x0 = x0 - 0.0 + 0.0 * C 
	vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
	vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
	vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
	vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;
	// Permutations
	i = mod(i, 289.0); 
	float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
	vec4 j1 = permute( permute( permute( permute (
				i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
			+ i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
			+ i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
			+ i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
	// Gradients
	// ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
	// 7*7*6 = 294, which is close to the ring size 17*17 = 289.
	vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
	vec4 p0 = grad4(j0,   ip);
	vec4 p1 = grad4(j1.x, ip);
	vec4 p2 = grad4(j1.y, ip);
	vec4 p3 = grad4(j1.z, ip);
	vec4 p4 = grad4(j1.w, ip);
	// Normalise gradients
	vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
	p0 *= norm.x;
	p1 *= norm.y;
	p2 *= norm.z;
	p3 *= norm.w;
	p4 *= taylorInvSqrt(dot(p4,p4));
	// Mix contributions from the five corners
	vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
	vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
	m0 = m0 * m0;
	m1 = m1 * m1;
	return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
				+ dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

vec3 foldX(vec3 p) {
    p.x = abs(p.x);
    return p;
}

mat2 rot2(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c,s,-s,c);
}

float sdSphere(vec3 p, float s){
	return length(p) - s;
}

float map(vec3 p){

	// @@@
	float t = u_time * .001;
	// float n = snoise(vec4(normalize(p), t));
	float n = random(vec2(p.y, p.x) * .01 + t);

	float sphere = sdSphere(p, n);
	float d = sphere;
	return d;

}

vec3 calcNormal(vec3 p){
    float d = .0001;
    return normalize(vec3(
        map(p + vec3(  d, 0.0, 0.0)) - map(p + vec3( -d, 0.0, 0.0)),
        map(p + vec3(0.0,   d, 0.0)) - map(p + vec3(0.0,  -d, 0.0)),
        map(p + vec3(0.0, 0.0,   d)) - map(p + vec3(0.0, 0.0,  -d))
    ));
}

float calcAO(in vec3 pos, in vec3 nor){
	float occ = 0.;
    float sca = 1.;
    for(int i = 0; i < 5; i++){
        float hr = .01 + .12 * float(i) / 4.;
        vec3 aopos = nor * hr + pos;
        // float dd = map(aopos).x;
		float dd = float(map(aopos));
        occ += -(dd - hr) * sca;
        sca *= .95;
    }
    return clamp(1. - 3. * occ, 0., 1.) * (.5 + .5 * nor.y);
}

vec3 render(vec3 c_pos, vec3 ray_dir){
    
    float depth = 1.;
    
    vec3 col = vec3(1.);
    
    for(int i = 0; i < 2; i++){
        
        // vec3 ray = c_pos + ray_dir * depth;
		vec3 ray = c_pos + ray_dir;
		float dist = map(ray);

		// if(abs(dist) < .0001){}

		// add normal
		vec3 normal = calcNormal(ray);
		// col += 1. - normal * .25;

		// float ao = calcAO(ray, normal);
		float diff = clamp(dot(light_pos, normal), .1, 1.);
		// col *= 1. - vec3(diff);

		// add stripe
		float dot = dot(vec3(.4), normal);
		float stripe = cos(dot * PI * 8.);
		col *= smoothstep(.1, .99, stripe);
        
        // depth += dist;
        
    }
    
    return col;
    
}

void main(){

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2. - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    vec3 c_pos = vec3(0., 0., -3.);
	vec3 c_dir = vec3(0., 0., -1.);
	vec3 c_up = vec3(0., 1., 0.);
	vec3 c_side = cross(c_dir, c_up);
    
	vec3 ray_dir = normalize(vec3(p, 1.));
	// ray_dir = foldX(ray_dir);

    vec3 col = render(c_pos, ray_dir);
    
    gl_FragColor = vec4(col, 1.);
    
}