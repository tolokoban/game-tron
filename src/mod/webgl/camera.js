"use strict";


const MathGL = require("webgl.math").m4;

const HALF_TURN_IN_DEG = 180,
      DEG_TO_RAD = Math.PI / 180;


class Camera {
  /**
   * @param {float} _args.angle - Field of view in degrees.
   * @param {number} _args.aspect - (width / height) of the canvas.
   * @param {number} _args.near - Clip every Z lower than `near`.
   * @param {number} _args.far - Clip every Z greater than `far`.
   */
  constructor(_args) {
    const that = this,
          args = typeof _args === 'undefined' ? {} : _args;

    if( typeof args.angle === 'undefined' ) args.angle = 35;
    if( typeof args.aspect === 'undefined' ) args.aspect = 1;
    if( typeof args.near === 'undefined' ) args.near = 0.5;
    if( typeof args.far === 'undefined' ) args.far = 2000;

    this._angle = args.angle;
    this._aspect = args.aspect;
    this._near = args.near;
    this._far = args.far;
    this._perspectiveIsOutOfDate = false;
    this._perspective = MathGL.perspective( args.angle * DEG_TO_RAD, args.aspect, args.near, args.far );

    this._transform = MathGL.identity();
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
        return that._matrix;
      }
    });
  }

  /**
   * `orbit( 0,0,0, 1, 0,0 )` will set your camera at (1,0,0) looking at (0,0,0) with the top of the
   * screen along Z axis.
   * `orbit( 0,0,0, 1, 0,0 )` will set your camera at (1,0,0) looking at (0,0,0) with the top of the
   * screen along Z axis.
   */
  orbit( x, y, z, distance, latitude, longitude ) {
    MathGL.cameraPolar( x, y, z, distance, latitude, longitude, this._transform );
    this.updateMatrix();
  }

  updatePerspective() {
    MathGL.perspective( this._angle * DEG_TO_RAD, this._aspect, this._near, this._far, this._perspective );
    this._perspectiveIsOutOfDate = false;
  }

  updateMatrix() {
    MathGL.mul( this.perspective, this._transform, this._matrix );
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
