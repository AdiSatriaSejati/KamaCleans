varying vec2 vUv;
varying float vWave;

uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

void main() {
  float wave = vWave * 0.2;
  vec3 color = mix(uColorStart, uColorEnd, vUv.x + wave);
  gl_FragColor = vec4(color, 1.0);
} 