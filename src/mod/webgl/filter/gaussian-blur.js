"use strict";

const
    Base = require("webgl.filter.base"),
    MathGL = require("webgl.math");


class GaussianBlur extends Base {
    constructor({
        gl,
        texture,
        size = 11, // Number of fragments to use in the average.
        energy = 1, // Resulting energy of the fragment. 1 is 100%.
        width = -1, // Texture width.
        height = -1, // Texture height.
        horizontal = true // Wether you need an horizontal or vertical bluring.
    }) {
        super(gl, createFragmentShaderCode(size, energy, horizontal));
        this.gl = gl;
        this.size = size;
        this.energy = energy;
        this.texture = texture;
        this.width = width > 0 ? width : gl.canvas.width;
        this.height = height > 0 ? height : gl.canvas.height;
        this.horizontal = horizontal;
    }

    paint(time, delta) {
        const { gl, prg, horizontal, texture, width, height } = this;

        prg.use();
        prg.$uniTexture = 0;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        prg.$uniStep = 1 / (horizontal ? width : height);

        super.paint(time, delta);
    }
}

const HEADER = `#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform sampler2D uniTexture;
uniform float uniStep;

varying vec2 varUV;

void main() {
    gl_FragColor = `;


/**
 * Create an optimized GLSL code for a gaussian blur of a given
 * size, energy and direction (hozizontal or vertical).
 *
 * @param {int} size - Number of fragments to use in the bluring. Minimum is 1 and that means
 * no bluring at all.
 * @param {double} energy - If the energy is 1, the whole blured image will keep the same
 * energy, i.e. the same luminosity. If it is set to 0.5 all resulting fragments will
 * get 50% energy.
 * @param {bool} horizontal - The bluring is either horizontal or vertical.
 *
 * @return {string} A GLSL code specific to this kind of bluring.
 */
function createFragmentShaderCode(size, energy, horizontal) {
    const tex = horizontal ? texH : texV;
    const binom = MathGL.computeBinomialCoeffs(size + 4);
    const subset = binom.slice(2, size + 2);
    const sum = subset.reduce((a, b) => a + b);
    const gauss = subset.map(x => (x * energy) / sum);
    const statements = [];
    const center = Math.floor(size / 2);

    if (size % 2 === 1) {
        // Odd number of elements. We have a central element.
        statements.push(tex(0, gauss[center]));
    }

    // Max value for Y.
    const radius = size / 2;

    for (let k = 0; k < center; k += 2) {
        const
            g0 = gauss[k],
            g1 = gauss[k + 1],
            x = radius - k - 2 * g1 / (g0 + g1),
            weight = g0 + g1;
        statements.push(tex(x, weight), tex(-x, weight));
    }

    return `${HEADER}${statements.join(" +\n        ")};\n}`;
}

/**
 * Create a statement for texture reading in horizontal mode.
 *
 * @param {double} x - X position relative to current one.
 * @param {double} w - Pixel weight.
 *
 * @return {string} GLSL code.
 */
function texH(x, w) {
    if (x === 0) {
        return `texture2D( uniTexture, varUV ) * ${w}`;
    }
    return `texture2D( uniTexture, vec2(varUV.x + uniStep * ${x}, varUV.y) ) * ${w}`;
}

/**
 * Create a statement for texture reading in vertical mode.
 *
 * @param {double} y - Y position relative to current one.
 * @param {double} w - Pixel weight.
 *
 * @return {string} GLSL code.
 */
function texV(y, w) {
    if (y === 0) {
        return `texture2D( uniTexture, varUV ) * ${w}`;
    }
    return `texture2D( uniTexture, vec2(varUV.x, varUV.y + uniStep * ${y}) ) * ${w}`;
}

module.exports = GaussianBlur;