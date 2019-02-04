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
        const that = this;
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
                return that._length >> 1;
            },

            firstX() {
                return this._arr[this._start];
            },

            firstY() {
                return this._arr[this._start + 1];
            }
        });
    }

    /**
     * @param {function} callback - Fonction appelée pour chaque point de la fin d'un segment.
     * Les argument passés sont `(x, y)`.
     */
    foreachTail(callback) {
        const arr = this._arr;
        for( let k = 2; k < this._length; k += 2 ) {
            const index = (k + this._start) % this._length;
            callback( arr[index], arr[index + 1] );
        }
    }

    /**
     * Déplace le point libre du dernier pan de mur.
     * @param {float} x - Abscisse.
     * @param {float} y - Ordonnée.
     */
    move(x, y) {
        const index = (this._start + this._length - DIM2) % this._capacity;
        this._arr[index] = x;
        this._arr[index + 1] = y;
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
            this._start = (this._start) % this._capacity;
        }
    }
}


module.exports = Polyline;
