"use strict";

const Polyline = require("s3/polyline"),
      { readonly } = require("common");

const IDX_X = 0;
const IDX_Y = 1;
const MINUS_ONE = -1;
const DIRECTIONS = [ [0, MINUS_ONE], [1, 0], [0, 1], [MINUS_ONE, 0] ];
const NB_DIRS = DIRECTIONS.length;
const RIGHT = 1;
const LEFT = 3;
const DEFAULT_X = 0;
const DEFAULT_Y = 256;
const MIN_SPEED = 0.050;
const MAX_SPEED = 0.250;
const BREAK = 0.0005;


class Car {
    constructor({
        action,
        x = DEFAULT_X,
        y = DEFAULT_Y,
        dir = RIGHT,
        color = "cyan",
        minSpeed = MIN_SPEED,
        maxSpeed = MAX_SPEED,
        breakPower = BREAK
    }) {
        const that = this;

        this.action = action;
        this.speed = minSpeed;
        this.lastTime = 0;
        this.dir = dir;

        readonly( this, {
            minSpeed,
            maxSpeed,
            breakPower,
            color,
            polyline: new Polyline( x, y ),
            dirRight() {
                return (that.dir + RIGHT) % NB_DIRS;
            },
            dirLeft() {
                return (that.dir + LEFT) % NB_DIRS;
            },
            vx() {
                return DIRECTIONS[that.dir][IDX_X];
            },
            vy() {
                return DIRECTIONS[that.dir][IDX_Y];
            },
            vxRight() {
                return DIRECTIONS[that.dirRight][IDX_X];
            },
            vyRight() {
                return DIRECTIONS[that.dirRight][IDX_Y];
            },
            vxLeft() {
                return DIRECTIONS[that.dirLeft][IDX_X];
            },
            vyLeft() {
                return DIRECTIONS[that.dirLeft][IDX_Y];
            }
        });
    }

    move( time ) {
        if( this.lastTime === 0 ) {
            this.lastTime = time;
            return;
        }

        const delta = time - this.lastTime;
        this.lastTime = time;

        this.action.process( time, delta );

        // -------------
        // Décelération.
        if( this.speed > this.minSpeed ) {
            this.speed = Math.max( this.minSpeed, this.speed - this.breakPower * delta );
        }

        // --------------------
        // Gestion des touches.
        const action = this.action;
        if( action.actionRight ) {
            this.polyline.add();
            this.dir = (this.dir + RIGHT) % DIRECTIONS.length;
        } else if( action.actionLeft ) {
            this.polyline.add();
            this.dir = (this.dir + LEFT) % DIRECTIONS.length;
        }
        if( action.actionAccel ) {
            this.speed = this.maxSpeed;
        }


        const dirV = DIRECTIONS[this.dir],
              vx = this.speed * delta * dirV[0],
              vy = this.speed * delta * dirV[1];
        this.polyline.move( vx, vy );
    }
}


module.exports = Car;
