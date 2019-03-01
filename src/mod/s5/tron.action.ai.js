"use strict";


const { readonly } = require( "common" );

const NONE = 0,
      LEFT = 1,
      RIGHT = 2,
      ACCEL = 3;

const DEFAULT_REACTION_TIME = 150,
      DEFAULT_FRONT_RADAR = 10,
      DEFAULT_SIDE_RADAR = 20;

const DICE_MAX_VALUE = 1000,
      HALF = 0.5;


class Ai {

    /**
     * @param {array}  cars - Tableau des  véhicules (objets de  type Car). Utile pour  éviter leurs
     * murs.
     * @param {array} boundaries  - Tableau des murs  d'enceinte qu'il faut éviter  aussi (objets de
     * type Polyline).
     * @param {int} reaction - Temps minimal entre deux prises de décision (en millisecondes).
     */
    constructor({
        car,
        cars,
        boundaries,
        reaction = DEFAULT_REACTION_TIME,
        frontRadar = DEFAULT_FRONT_RADAR,
        sideRadar = DEFAULT_SIDE_RADAR
    }) {
        const that = this;

        this.status = NONE;
        this.car = car;
        this.cars = cars;
        this.boundaries = boundaries;
        this.lastTime = 0;

        readonly( this, {
            reaction,
            frontRadar,
            sideRadar,

            actionRight() {
                return that.status === RIGHT;
            },
            actionLeft() {
                return that.status === LEFT;
            },
            actionAccel() {
                return that.status === ACCEL;
            }
        });
    }

    process( time ) {
        if ( time - this.lastTime < this.reaction ) {
            this.status = NONE;
            return;
        }

        const car = this.car,
              x0 = car.polyline.lastX,
              y0 = car.polyline.lastY,
              x1 = x0 + car.vx * this.frontRadar,
              y1 = y0 + car.vy * this.frontRadar;

        if( this.collide( x0, y0, x1, y1 ) ) {
            if( rollDice() < DICE_MAX_VALUE * HALF ) this.turnRightIfSafe();
            else this.turnLeftIfSafe();
        } else {
            const rnd = rollDice();
            if( rnd < 3 ) this.turnRightIfSafe();
            else if( rnd < 6 ) this.turnLeftIfSafe();
            else if( rnd < 8 ) this.status = ACCEL;
            else this.status = NONE;
        }

        if( this.status !== NONE ) {
            this.lastTime = time;
        }
    }

    turnRightIfSafe() {
        const car = this.car,
              x0 = car.polyline.lastX,
              y0 = car.polyline.lastY,
              x1R = x0 + car.vxRight * this.sideRadar,
              y1R = y0 + car.vyRight * this.sideRadar;
        this.status = this.collide( x0, y0, x1R, y1R ) ? NONE : RIGHT;
    }

    turnLeftIfSafe() {
        const car = this.car,
              x0 = car.polyline.lastX,
              y0 = car.polyline.lastY,
              x1L = x0 + car.vxLeft * this.sideRadar,
              y1L = y0 + car.vyLeft * this.sideRadar;
        this.status = this.collide( x0, y0, x1L, y1L ) ? NONE : LEFT;
    }

    collide( x0, y0, x1, y1 ) {
        for( const obstacle of this.cars ) {
            if( obstacle.isDead ) continue;
            if( obstacle.polyline.collide( x0, y0, x1, y1 ) ) {
                return true;
            }
        }

        for( const boundary of this.boundaries ) {
            if( boundary.collide( x0, y0, x1, y1 ) ) {
                return true;
            }
        }
        return false;
    }
}


function rollDice() {
    return Math.random() * DICE_MAX_VALUE;
}

exports.create = function( args ) {
    return new Ai( args );
};
