#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif


uniform sampler2D uniTex0;
uniform sampler2D uniTex1;
uniform float uniEnergy0;
uniform float uniEnergy1;

varying vec2 varUV;

void main() {
    vec4 color0 = texture2D( uniTex0, varUV );
    vec4 color1 = texture2D( uniTex1, varUV );
    gl_FragColor = uniEnergy0 * color0 + uniEnergy1 * color1;
}
