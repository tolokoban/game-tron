"use strict";


const MathGL = require("webgl/math").m4;

const HALF_TURN_IN_DEG = 180,
      DEG_TO_RAD = Math.PI / 180;


class Camera {
    /**
     * @param {float} angle - Field of view in degrees.
     * @param {number} aspect - (width / height) of the canvas.
     * @param {number} near - Clip every Z lower than `near`.
     * @param {number} far - Clip every Z greater than `far`.
     */
    constructor({ angle: 35, aspect: 1, near: 0.5, far: 100}) {
        const that = this;

        this._angle = angle;
        this._aspect = aspect;
        this._near = near;
        this._far = far;
        this._perspectiveIsOutOfDate = false;
        this._perspective = MathGL.perspective( angle * DEG_TO_RAD, aspect, near, far );

        this._transform = MathGL.identity();

        this._matrixIsOutOdDate = false;
        this._matrix = MathGL.mul( this._perspective, this._transform );
        

        ['angle', 'aspect', 'near', 'far'].forEach(name => Object.defineProperty( this, name, {
            get() { return that[`_${name}`]; },
            set( v ) {
                if( v === that[`_${name}`] ) return;
                that[`_${name}`] = v;
                that._perspectiveIsOutOfDate = true;
            }
        }));

        readonly( this, {
            perspective() {
                if( that._perspectiveIsOutOfDate ) {
                    that.updatePerspective();
                }
                return that._perspective;
            },
            transform() { return that._transform; },
            matrix() {
                if( that._perspectiveIsOutOfDate ) {
                    that.updatePerspective();
                }
                return that._perspective;
            }
        });
    }

    updatePerspective() {
        MathGL.perspective( this._angle * DEG_TO_RAD, this._aspect, this._near, this._far, this._perspective );
        this._perspectiveIsOutOfDate = false;
    }
}


/**
 * Add read only properties to a target object.
 *
 * @param {object} target - The target object.
 * @param {string} name - Property name.
 * @param {any|function} value - Valeur de la propriété. Si c'est une fonction,
 * elle sera évaluée à chaque fois que la propriété sera lue.
 * @return {undefined}
 */
function readonly( target, name, value ) {
    if ( typeof name !== 'string' ) {
        Object.keys( name ).forEach( function ( key ) {
            readonly( target, key, name[ key ] );
        } );
        return;
    }

    if ( typeof value === 'function' ) {
        Object.defineProperty( target, name, {
            get: value,
            set() {
                throw Error(`Property "${name}" is read only!`);
            },
            configurable: false,
            enumerable: true
        } );
    } else {
        Object.defineProperty( target, name, {
            value,
            writable: false,
            configurable: false,
            enumerable: true
        } );
    }
}


module.exports = Camera;