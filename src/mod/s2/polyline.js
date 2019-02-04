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
      },

      lastX() {
        return this._arr[(this._start + this._length) % this._capacity];
      },

      lastY() {
        return this._arr[(this._start + this._length + 1) % this._capacity];
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
 */
function collideVertical( x, y0, y1 ) {
  const arr = this._arr,
        ya = Math.min( y0, y1 ),
        yb = Math.max( y0, y1 );
  let xx0 = this.startX,
      yy = this.startY;

  for( let k = 2; k < this._length; k += 2 ) {
    // On ne teste que les segments horizonzaux de murs.
    const index = (k + this._start) % this._length,
          xx1 = arr[index];
    if( xx1 === xx0 ) {
      yy = arr[index + 1];
      continue;
    }
    const xMin = Math.min( xx0, xx1 ),
          xMax = Math.max( xx0, xx1 );
    xx0 = xx1;
    if( ( x < xMin ) || ( x > xMax ) ) continue;
    if( ( yy < ya ) || ( yy > yb ) ) continue;
    return true;
  }
  return false;
}


function collideHorizontal( y, x0, y0 ) {
  return false;
}
