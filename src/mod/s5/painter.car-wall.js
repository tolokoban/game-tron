"use strict";


const { readonly } = require("common"),
      Program = require("webgl/program");


const NB_ATTRIBUTES = 5,
      WALL_HEIGHT = 1;

class Painter {
    constructor( gl, car ) {
        const ready = this.init( gl );
        readonly( this, {
            gl,
            car,
            ready
        });
    }

    init( gl ) {
        const that = this;

        return new Promise(function (resolve, reject) {
            const prg = new Program( gl, GLOBAL ),
                  vertBuff = gl.createBuffer(),
                  vertArray = createVertArrayFromPolyline( that.car.polyline );
            readonly( that, { prg, verBuff, vertArray });

            gl.bindBuffer( gl.ARRAY_BUFFER, vertBuff );
            gl.bufferData( gl.ARRAY_BUFFER, vertArray );
            resolve( that );
        });
    }

    paint( time, delta ) {
        const { gl, prg, vertBuff } = this;

        prg.use();
        prg.bindAttribs( vertBuff, "attPoint", "attUV" );
    }
}


/**
 * Le mur est vertical posé en Z=0 et atteignant la hauteur de Z=WALL_HEIGHT
 * @param {Polyline} polyline - Lignes 2D que l'on va convertir en 3D.
 */
function createVertArrayFromPolyline( polyline ) {
    const arr = new Float32Array( polyline.capacity * NB_ATTRIBUTES );
    
}


module.exports = Painter;
