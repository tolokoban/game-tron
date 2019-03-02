"use strict";

const Keyboard = require( "s3.tron.action.keyboard" );
const ArtificialIntelligence = require( "s3.tron.action.ai" );

exports.create = function ( args ) {
    switch ( args.type ) {
    case 'keyboard':
        return Keyboard.create( args );
    case 'ai':
        return ArtificialIntelligence.create( args );
    default:
        return null;
    }
};
