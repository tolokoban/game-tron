"use strict";

const MINUS_ONE = -1;
const DIRECTIONS = [ [0, MINUS_ONE], [1, 0], [0, 1], [MINUS_ONE, 0] ];
const RIGHT = 1;
const LEFT = 3;
const DEFAULT_X = 0;
const DEFAULT_Y = 256;

class Car {
    constructor( action, x = DEFAULT_X, y = DEFAULT_Y, dir = RIGHT ) {
        this.action = action;
        this.walls = [x, y, x, y];
        this.minSpeed = 0.050;
        this.speed = this.minSpeed;
        this.maxSpeed = 0.250;
        this.break = 0.0005;
        this.lastTime = 0;
        this.dir = dir;
    }

    move( time ) {
        if( this.lastTime === 0 ) {
            this.lastTime = time;
            return;
        }
        const delta = time - this.lastTime,
              x0 = this.walls[0],
              y0 = this.walls[1],
              dirV = DIRECTIONS[this.dir],
              x1 = x0 + this.speed * delta * dirV[0],
              y1 = y0 + this.speed * delta * dirV[1];
        this.x = x1;
        this.y = y1;
        this.walls[0] = x1;
        this.walls[1] = y1;

        // -------------
        // Décelération.
        if( this.speed > this.minSpeed ) {
            this.speed = Math.max( this.minSpeed, this.speed - this.break * delta );
        }

        // --------------------
        // Gestion des touches.
        const action = this.action;
        if( action.actionRight ) {
            this.addSegmentToWalls();
            this.dir = (this.dir + RIGHT) % DIRECTIONS.length;
        } else if( action.actionLeft ) {
            this.addSegmentToWalls();
            this.dir = (this.dir + LEFT) % DIRECTIONS.length;
        }
        if( action.actionAccel ) {
            this.speed = this.maxSpeed;
        }

        this.lastTime = time;
    }

    addSegmentToWalls() {
        const [x, y] = this.walls;
        this.walls.unshift( x, y );
    }
}


module.exports = Car;
