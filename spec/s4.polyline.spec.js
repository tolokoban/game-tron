"use strict";

const Polyline = require("s4/polyline");

const IDX_X00 = 0,
      IDX_Y00 = 1,
      IDX_Z00 = 2,
      IDX_U00 = 3,
      IDX_X01 = 4,
      IDX_Y01 = 5,
      IDX_Z01 = 6,
      IDX_U01 = 7,
      IDX_X10 = 8,
      IDX_Y10 = 9,
      IDX_Z10 = 10,
      IDX_U10 = 11,
      IDX_X11 = 12,
      IDX_Y11 = 13,
      IDX_Z11 = 14,
      IDX_U11 = 15,
      // Taille en mémoire d'un segment.
      BLOCK_SIZE = 16,
      OFFSET = {
          X00: 0,
          Y00: 1,
          Z00: 2,
          U00: 3,
          X01: 4,
          Y01: 5,
          Z01: 6,
          U01: 7,
          X10: 8,
          Y10: 9,
          Z10: 10,
          U10: 11,
          X11: 12,
          Y11: 13,
          Z11: 14,
          U11: 15
      };

describe('Module s4/polyline', function() {
    describe('constructor ', function() {
        const cases = {
            X00: 100,
            Y00: 50,
            Z00: 0,
            U00: 0,
            X01: 100,
            Y01: 50,
            Z01: 1,
            U01: 0,
            X10: 100,
            Y10: 50,
            Z10: 0,
            U10: 0,
            X11: 100,
            Y11: 50,
            Z11: 1,
            U11: 0
        };
        for( const key of Object.keys(cases) ) {
            const expectedValue = cases[key],
                  offset = OFFSET[key];
            it(`should initialize ${key}`, function(){
                const poly = new Polyline( 100, 50 ),
                      data = poly.data;
                expect( data[offset] ).toBe( expectedValue );
            });
        }
        it('should initialize last point', function(){

        });
    });    

    describe('move()', function() {
        it('should not move first point', function(){
            expect(false).toBe(true);
        });
        it('should move last point', function(){

        });
    });

    describe('add()', function() {

    });
});
