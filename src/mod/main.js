"use strict";

exports.start = start;

const Action = require( "tron.action" );

/**
 * @return {undefined}
 */
function start() {
    const action = Action.create( { type: 'keyboard' } );
}

/**
 * @this {Action}
 * @return {undefined}
 */
function test() {}