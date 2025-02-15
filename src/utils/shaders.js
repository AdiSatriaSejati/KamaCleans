export const vertexShader = `
  varying vec2 vUv;
  varying float vWave;

  uniform float uTime;

  void main() {
    vUv = uv;
    
    vec3 pos = position;
    float noiseFreq = 2.0;
    float noiseAmp = 0.4;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    pos.z += sin(noisePos.x) * noiseAmp;
    vWave = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = `
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
`; 