"use strict";

const { readonly } = require( "common" );

const Context = {
    isLoaded: false,
    rightPressed: false,
    leftPressed: false,
    accelPressed: false
};

module.exports = {
    RightKey: "ArrowRight",
    LeftKey: "ArrowLeft",
    AccelKey: " "
};

exports.create = create;


class Keyboard {
    constructor() {
        readonly( this, {
            actionRight() {
                const isPressed = Context.rightPressed;
                // Quand une touche a été enfoncée, on la considère virtuellement
                // enfoncée tant qu'on n'a pas lu son état. Ensuite, même si elle
                // est physiquement toujours enfoncée, on la considère relâchées.
                Context.rightPressed = false;
                return isPressed;
            },
            actionLeft() {
                const isPressed = Context.leftPressed;
                Context.leftPressed = false;
                return isPressed;
            },
            actionAccel() {
                const isPressed = Context.accelPressed;
                Context.accelPressed = false;
                return isPressed;
            }
        } );
        ensureKeysListenerIsAttached();
    }
}

/**
 * @param {any} args - Arguments spécifiques aux actions à observer.
 * @return {Keyboard} Un objet gérant les actions provenant du clavier.
 */
function create( args ) {
    return new Keyboard( args );
}

/**
 * Si besoin, ajouter un Listener pour les touches du clavier.
 * @return {undefined}
 */
function ensureKeysListenerIsAttached() {
    if ( Context.isLoaded ) return;
    Context.isLoaded = true;

    document.addEventListener( "keydown", evt => {
        // Quand on garde une touche enfoncée, on peut activer le mode répétition
        // qui envoie plusieurs événements "keydown" consécutifs pour la même touche.
        // Si on ne tient pas compte de cela, on risque de tourner plusieurs fois à
        // angle droit simplement parce qu'on n'a pas relâché la touche.
        if ( evt.repeat ) return;

        switch ( evt.key ) {
        case module.exports.RightKey:
            Context.rightPressed = true;
            evt.preventDefault();
            break;
        case module.exports.LeftKey:
            Context.leftPressed = true;
            evt.preventDefault();
            break;
        case module.exports.AccelKey:
            Context.accelPressed = true;
            evt.preventDefault();
            break;
        default:
            // Rien à faire pour les autres touches.
        }
    }, true );
    document.addEventListener( "keyup", evt => {
        switch ( evt.key ) {
        case Context.RightKey:
        case Context.LeftKey:
        case Context.AccelKey:
            evt.preventDefault();
            break;
        default:
            // Rien à faire pour les autres touches.
        }
    }, true );
}