"use strict";

const { readonly } = require("common");

const DIM2 = 2,
      IDX_X0 = 0,
      IDX_Y0 = 1,
      IDX_X1 = 2,
      IDX_Y1 = 3,
      DEFAULT_CAPACITY = 128;


class Polyline {

    /**
     * @param {float} x - Abscisse du premier point.
     * @param {float} y - Ordonnée du premier point.
     * @param {int} capacity - Nombre maximal de points.
     */
    constructor(x, y, capacity = DEFAULT_CAPACITY) {
        // On multiplie la capacité par 2 car il y a deux éléments par point (x et y).
        const arr = new Float32Array( capacity << 1 );
        arr[IDX_X0] = x;
        arr[IDX_Y0] = y;
        arr[IDX_X1] = x;
        arr[IDX_Y1] = y;
        this._arr = arr;
        this._start = 0;
        this._length = DIM2 << 1;
        this._capacity = capacity << 1;


        readonly( this, {
            length() {
                // Diviser par deux.
                return this._length >> 1;
            },

            firstX() {
                return this._arr[this._start];
            },

            firstY() {
                return this._arr[this._start + 1];
            },

            lastX() {
                return this._arr[(this._start + this._length - DIM2) % this._capacity];
            },

            lastY() {
                return this._arr[(this._start + this._length - DIM2 + 1) % this._capacity];
            }
        });
    }

    /**
     * @param {function} callback - Fonction appelée pour chaque point de la fin d'un segment.
     * Les argument passés sont `(x, y)`.
     */
    foreachTail(callback) {
        const arr = this._arr;
        for( let k = DIM2; k < this._length; k += DIM2 ) {
            const index = (k + this._start) % this._length;
            callback( arr[index], arr[index + 1] );
        }
    }

    /**
     * Déplace le point libre du dernier pan de mur.
     * @param {float} dx - Valeur à ajouter à l'abscisse.
     * @param {float} dy - Valeur à ajouter à l'ordonnée.
     */
    move(dx, dy) {
        const index = (this._start + this._length - DIM2) % this._capacity;
        this._arr[index] += dx;
        this._arr[index + 1] += dy;
    }

    /**
     * Ajoute un nouveau segment de mur.
     * Pour commencer, il aura une taille nulle.
     */
    add() {
        const index = (this._start + this._length - DIM2) % this._capacity,
              arr = this._arr,
              x = arr[index],
              y = arr[index + 1];
        if( this._length < this._capacity ) {
            const nextIdx = (index + DIM2) % this._capacity;
            arr[nextIdx] = x;
            arr[nextIdx + 1] = y;
            this._length += DIM2;
        } else {
            // Le buffer est plein, on écrase le plus ancien point.
            const startIdx = this._start;
            arr[startIdx] = x;
            arr[startIdx + 1] = y;
            this._start = (this._start + DIM2) % this._capacity;
        }
    }

    collide( x0, y0, x1, y1 ) {
        if( x0 === x1 ) return collideVertical.call( this, x0, y0, y1 );
        return collideHorizontal.call( this, y0, x0, x1 );
    }
}


module.exports = Polyline;


/**
 * On recherche une collision entre un segment vertical et au moins un des murs horizonzaux.
 * @this Polyline
 */
function collideVertical( x, _y0, _y1 ) {    
    if( _y0 === _y1 ) {
        // L'objet qui veut tester la collision est immobile.
        return false;
    }
    
    const arr = this._arr,
          idx = (this._start + DIM2) % this._capacity,
          offset = this.firstX === arr[idx] ? DIM2 : 0,
          y0 = Math.min( _y0, _y1 ),
          y1 = Math.max( _y0, _y1 );

    for( let k = offset; k < this._length; k += DIM2 + DIM2 ) {
        // On ne teste que les segments horizonzaux de murs.
        const idx0 = (k + this._start) % this._length,
              xx0 = arr[idx0],
              // Inutile de lire Y  pour les deux extrémités du segment : ce  sont les mêmes pour un
              // segment horizontal.
              yy = arr[idx0 + 1],
              idx1 = (idx0 + DIM2) % this._length,
              xx1 = arr[idx1];        
        if( xx0 === xx1 ) {
            // Ce mur est réduit à un point. On peut donc arrêter les tests.
            break;
        }
        const xMin = Math.min( xx0, xx1 ),
              xMax = Math.max( xx0, xx1 );
        if( ( x <= xMin ) || ( x >= xMax ) ) continue;
        if( ( yy < y0 ) || ( yy > y1 ) ) continue;
        return true;
    }
    return false;
}


function collideHorizontal( y, _x0, _x1 ) {
    if( _x0 === _x1 ) {
        // L'objet qui veut tester la collision est immobile.
        return false;
    }
    
    const arr = this._arr,
          idx = (this._start + DIM2 + 1) % this._capacity,
          offset = this.firstY === arr[idx] ? DIM2 : 0,
          x0 = Math.min( _x0, _x1 ),
          x1 = Math.max( _x0, _x1 );

    for( let k = offset; k < this._length; k += DIM2 + DIM2 ) {
        // On ne teste que les segments horizonzaux de murs.
        const idx0 = (k + this._start) % this._length,
              yy0 = arr[idx0 + 1],
              // Inutile de lire X  pour les deux extrémités du segment : ce  sont les mêmes pour un
              // segment vertical.
              xx = arr[idx0],
              idx1 = (idx0 + DIM2) % this._length,
              yy1 = arr[idx1 + 1];        
        if( yy0 === yy1 ) {
            // Ce mur est réduit à un point. On peut donc arrêter les tests.
            break;
        }
        const yMin = Math.min( yy0, yy1 ),
              yMax = Math.max( yy0, yy1 );
        if( ( y <= yMin ) || ( y >= yMax ) ) continue;
        if( ( xx < x0 ) || ( xx > x1 ) ) continue;
        return true;
    }
    return false;
}
