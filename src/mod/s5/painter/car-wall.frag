precision mediump float;

uniform vec3 uniColor;
varying vec2 varUV;


void main() {
  gl_FragColor = vec4(uniColor * (.5 + varUV.y), 1);
}
