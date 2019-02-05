"use strict";


const { readonly } = require( "common" );

const NONE = 0,
      LEFT = 1,
      RIGHT = 2,
      ACCEL = 3;


class Ai {
    constructor({ car, cars, boundaries }) {
        const that = this;

        this.status = NONE;
        this.car = car;
        this.cars = cars;
        this.boundaries = boundaries;
        this.lastTime = 0;
        
        readonly( this, {
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
        if ( time - this.lastTime < 100 ) {
            this.status = NONE;
            return;
        }
        
        const car = this.car,
              x0 = car.polyline.lastX,
              y0 = car.polyline.lastY,
              x1 = x0 + car.vx * 10,
              y1 = y0 + car.vy * 10;

        if( this.collide( x0, y0, x1, y1 ) ) {
            const rnd = Math.random() * 1000;
            if( rnd < 500 ) {
                const x1R = x0 + car.vxRight * 15,
                      y1R = y0 + car.vyRight * 15;
                this.status = this.collide( x0, y0, x1R, y1R ) ? LEFT : RIGHT;
            } else {
                const x1L = x0 + car.vxLeft * 15,
                      y1L = y0 + car.vyLeft * 15;
                this.status = this.collide( x0, y0, x1L, y1L ) ? LEFT : RIGHT;
            }
        } else {
            this.status = NONE;

            const rnd = Math.random() * 1000;
            if( rnd > 995 ) {
                this.status = RIGHT;
            } else if( rnd > 990 ) {
                this.status = LEFT;
            } else if( rnd > 988 ) {
                this.status = ACCEL;
            } else {
                this.status = NONE;
            }
        }

        if( this.status !== NONE ) {
            this.lastTime = time;
        }
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


exports.create = function( args ) {
    return new Ai( args );
};
