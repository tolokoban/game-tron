"use strict";

const Polyline = require("s4.polyline");

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

describe('Module s4.polyline', function() {
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
    });

    describe('move() vertically first segment', function() {
        const poly = new Polyline( 100, 50 ),
              data = poly.data;
        poly.move( 0, 100 );
        const cases = [
            ['X00', 100],
            ['Y00', 50],
            ['Z00', 0],
            ['U00', 0],
            ['X01', 100],
            ['Y01', 50],
            ['Z01', 1],
            ['U01', 0],
            ['X10', 100],
            ['Y10', 150],
            ['Z10', 0],
            ['U10', 100],
            ['X11', 100],
            ['Y11', 150],
            ['Z11', 1],
            ['U11', 100]
        ];
        for( const [key, expectedValue] of cases ) {
            it(`should set ${key} to ${expectedValue}`, function(){
                expect( data[OFFSET[key]] ).toBe( expectedValue );
            });
        }
    });

    describe('move() vertically first segment', function() {
        const poly = new Polyline( 100, 50 ),
              data = poly.data;
        poly.move( 0, 100 );
        const cases = [
            ['X00', 100],
            ['Y00', 50],
            ['Z00', 0],
            ['U00', 0],
            ['X01', 100],
            ['Y01', 50],
            ['Z01', 1],
            ['U01', 0],
            ['X10', 100],
            ['Y10', 150],
            ['Z10', 0],
            ['U10', 100],
            ['X11', 100],
            ['Y11', 150],
            ['Z11', 1],
            ['U11', 100]
        ];
        for( const [key, expectedValue] of cases ) {
            it(`should set ${key} to ${expectedValue}`, function(){
                expect( data[OFFSET[key]] ).toBe( expectedValue );
            });
        }
    });

    describe('move() vertically first segment', function() {
        const poly = new Polyline( 100, 50 ),
              data = poly.data;
        poly.move( 0, 100 );
        const cases = [
            ['X00', 100],
            ['Y00', 50],
            ['Z00', 0],
            ['U00', 0],
            ['X01', 100],
            ['Y01', 50],
            ['Z01', 1],
            ['U01', 0],
            ['X10', 100],
            ['Y10', 150],
            ['Z10', 0],
            ['U10', 100],
            ['X11', 100],
            ['Y11', 150],
            ['Z11', 1],
            ['U11', 100]
        ];
        for( const [key, expectedValue] of cases ) {
            it(`should set ${key} to ${expectedValue}`, function(){
                expect( data[OFFSET[key]] ).toBe( expectedValue );
            });
        }
    });

    describe('move() horizontally (backward) first segment (two times)', function() {
        const poly = new Polyline( 100, 50 ),
              data = poly.data;
        poly.move( -70, 0 );
        poly.move( 50, 0 );
        const cases = [
            ['X00', 100],
            ['Y00', 50],
            ['Z00', 0],
            ['U00', 0],
            ['X01', 100],
            ['Y01', 50],
            ['Z01', 1],
            ['U01', 0],
            ['X10', 80],
            ['Y10', 50],
            ['Z10', 0],
            ['U10', 20],
            ['X11', 80],
            ['Y11', 50],
            ['Z11', 1],
            ['U11', 20]
        ];
        for( const [key, expectedValue] of cases ) {
            it(`should set ${key} to ${expectedValue}`, function(){
                expect( data[OFFSET[key]] ).toBe( expectedValue );
            });
        }
    });

    describe('add() one time', function() {
        const poly = new Polyline( 100, 50 ),
              data = poly.data;
        poly.move( 100, 0 );
        poly.add();
        const cases = [
            ['X00', 200], ['X10', 200],
            ['Y00', 50],  ['Y10', 50],
            ['Z00', 0],   ['Z10', 0],
            ['U00', 100], ['U10', 100],
            ['X01', 200], ['X11', 200],
            ['Y01', 50],  ['Y11', 50],
            ['Z01', 1],   ['Z11', 1],
            ['U01', 100], ['U11', 100]
        ];
        for( const [key, expectedValue] of cases ) {
            it(`should set ${key} to ${expectedValue}`, function(){
                expect( data[OFFSET[key] + BLOCK_SIZE] ).toBe( expectedValue );
            });
        }
    });

    describe('add() two times', function() {
        const poly = new Polyline( 100, 50 ),
              data = poly.data;
        poly.move( 100, 0 );
        poly.add();
        poly.move( 0, -30 );
        poly.add();

        it(`should have a length of 3 * BLOCK_SIZE = ${3 * BLOCK_SIZE}`, function() {
            expect( poly.length ).toBe( 3 * BLOCK_SIZE );
        });

        const cases = [
            ['X00', 200], ['X10', 200],
            ['Y00', 20], ['Y10', 20],
            ['Z00', 0], ['Z10', 0],
            ['U00', 130], ['U10', 130],
            ['X01', 200], ['X11', 200],
            ['Y01', 20], ['Y11', 20],
            ['Z01', 1], ['Z11', 1],
            ['U01', 130], ['U11', 130]
        ];
        for( const [key, expectedValue] of cases ) {
            it(`should set ${key} to ${expectedValue}`, function(){
                expect( data[OFFSET[key] + 2 * BLOCK_SIZE] ).toBe( expectedValue );
            });
        }
    });

    describe('collide() single vertical segment', function() {
        const poly = new Polyline( 100, 50 );
        poly.move( 0, 100 );
        const casesTrue = [
            [50,100, 150,100],
            [150,100, 50,100]
        ];
        casesTrue.forEach(function (segment) {
            it(`should be true for ${JSON.stringify(segment)}`, function(){
                expect( poly.collide( ...segment ) ).toBe(true);
            });
        });
        const casesFalse = [
            [250,100, 150,100],
            [150,100, 150,200]
        ];
        casesFalse.forEach(function (segment) {
            it(`should be false for ${JSON.stringify(segment)}`, function(){
                expect( poly.collide( ...segment ) ).toBe(false);
            });
        });
    });
});
