#define PI 3.14159265359

uniform float uThickness;
uniform float uAlpha;
uniform float uWaveThickness;
uniform float uTime;
uniform vec2 uCenter;
uniform float uMode;

varying vec2 vUv;


void main()
{

    float angle = (atan(vUv.x * sin(uTime * 0.1) - (0.5 + sin(uTime * 0.2)), vUv.y* cos(uTime * 0.3) - (0.5 + cos(uTime * 0.05))) / (PI * 2.0));
    float radius = 0.25 + sin(angle * PI * 100.0 ) * 0.02 * (uWaveThickness  - cos(uTime * 0.5));
    float strength = 1.0 - step(uThickness, abs(distance(vUv, uCenter) - radius));
    vec3 uvColor = vec3(vUv, 1.0);
// strength - uAlpha
    gl_FragColor = vec4(uvColor * uMode, strength);
}