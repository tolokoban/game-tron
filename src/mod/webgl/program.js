"use strict";

const BPE = ( new Float32Array() ).BYTES_PER_ELEMENT;

const NOT_FOUND = -1,
      FLOAT_VEC2_SIZE = 2,
      FLOAT_VEC3_SIZE = 3,
      FLOAT_VEC4_SIZE = 4;


/**
 * Creating  a  WebGL  program  for shaders  is  painful.  This  class
 * simplifies the process.
 *
 * @class Program
 *
 * Object properties starting with `$` are WebGL uniforms or attributes.
 * Uniforms behave as expected: you can read/write a value.
 * Attributes when read, return the location. And when written, enable/disabled
 * this attribute. So you read integers and writte booleans.
 *
 * @param gl - WebGL context.
 * @param _codes  - Object  with two  mandatory attributes:  `vert` for
 * vertex shader and `frag` for fragment shader.
 * @param  includes  -  (optional)  If  defined,  the  `#include  foo`
 * directives  of  shaders   will  be  replaced  by   the  content  of
 * `includes.foo`.
 */
class Program {
    constructor( gl, _codes, includes ) {
        if ( typeof _codes.vert !== 'string' ) {
            throw Error( '[webgl.program] Missing attribute `vert` in argument `codes`!' );
        }
        if ( typeof _codes.frag !== 'string' ) {
            throw Error( '[webgl.program] Missing attribute `frag` in argument `codes`!' );
        }

        const codes = parseIncludes( _codes, includes );

        this.gl = gl;
        Object.freeze( this.gl );
        this.BPE = BPE;
        Object.freeze( this.BPE );

        this._typesNamesLookup = getTypesNamesLookup( gl );

        const shaderProgram = gl.createProgram();
        gl.attachShader( shaderProgram, getVertexShader( gl, codes.vert ) );
        gl.attachShader( shaderProgram, getFragmentShader( gl, codes.frag ) );
        gl.linkProgram( shaderProgram );

        this.program = shaderProgram;
        Object.freeze( this.program );

        this.use = function () {
            gl.useProgram( shaderProgram );
        };
        this.use();

        createAttributes.call( this, gl, shaderProgram );
        createUniforms.call( this, gl, shaderProgram );
    }

    getTypeName( typeId ) {
        return this._typesNamesLookup[ typeId ];
    }

    bindAttribs( buffer, ...names ) {
        const gl = this.gl;
        gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
        let totalSize = 0;
        for( const name of names ) {
            const attrib = this.attribs[ name ];
            if ( !attrib ) {
                throw Error(`Cannot find attribute "${name}"!\n` +
                            `It may be not active because unused in the shader.\n` +
                            `Available attributes are: ${
                            Object.keys( this.attribs ).map( JSON.stringify ).join( ", " )}`);
            }
            totalSize += ( attrib.size * attrib.length ) * BPE;
        }
        let offset = 0;
        names.forEach( function ( name ) {
            const attrib = this.attribs[ name ];
            gl.enableVertexAttribArray( attrib.location );
            gl.vertexAttribPointer(
                attrib.location,
                attrib.size * attrib.length,
                gl.FLOAT,
                false, // No normalisation.
                totalSize,
                offset
            );
            offset += ( attrib.size * attrib.length ) * BPE;
        }, this );
    }

    readonly( target, name, value ) {
        return readonly( taget, name, value );
    }
}

module.exports = Program;


/**
 * @this Program
 */
function createAttributes( gl, shaderProgram ) {
    const attribs = {};
    const attribsCount = gl.getProgramParameter( shaderProgram, gl.ACTIVE_ATTRIBUTES );
    for ( let index = 0; index < attribsCount; index++ ) {
        const item = gl.getActiveAttrib( shaderProgram, index );
        item.typeName = this.getTypeName( item.type );
        item.length = getSize( gl, item );
        item.location = gl.getAttribLocation( shaderProgram, item.name );
        attribs[ item.name ] = item;
    }

    this.attribs = attribs;
    Object.freeze( this.attribs );
}


/**
 * @this Program
 */
function createUniforms( gl, shaderProgram ) {
    const uniforms = {};
    const uniformsCount = gl.getProgramParameter( shaderProgram, gl.ACTIVE_UNIFORMS );
    for ( let index = 0; index < uniformsCount; index++ ) {
        const item = gl.getActiveUniform( shaderProgram, index );
        uniforms[ item.name ] = gl.getUniformLocation( shaderProgram, item.name );
        Object.defineProperty( this, `$${item.name}`, {
            set: createUniformSetter.call( this, gl, item, uniforms[ item.name ], this._typesNamesLookup ),
            get: createUniformGetter.call( this, item ),
            enumerable: true,
            configurable: false
        } );
    }
    this.uniforms = uniforms;
    Object.freeze( this.uniforms );
}

/**
 * This is a preprocessor for shaders.
 * Directives  `#include`  will be  replaced  by  the content  of  the
 * correspondent attribute in `includes`.
 */
function parseIncludes( codes, includes ) {
    const result = {};
    for ( const id of Object.keys( codes ) ) {
        const code = codes[ id ];
        result[ id ] = code.split( '\n' ).map( function ( line ) {
            if ( line.trim().substr( 0, '#include'.length ) !== '#include' ) return line;
            const pos = line.indexOf( '#include' ) + '#include'.length;
            let includeName = line.substr( pos ).trim();
            // We accept all this systaxes:
            // #include foo
            // #include 'foo'
            // #include <foo>
            // #include "foo"
            if ( "'<\"".indexOf( includeName.charAt( 0 ) ) > NOT_FOUND ) {
                includeName = includeName.substr( 1, includeName.length - '<>'.length );
            }
            const snippet = includes[ includeName ];
            if ( typeof snippet !== 'string' ) {
                console.error( `Include <${includeName}> not found in `, includes );
                throw Error( `Include not found in shader: ${includeName}` );
            }
            return snippet;
        } ).join( "\n" );
    }
    return result;
}


/**
 * @this Program
 */
function createUniformSetterInteger( gl, item, nameGL, nameJS ) {
    const that = this;
    if ( item.size === 1 ) {
        return function ( v ) {
            gl.uniform1i( nameGL, v );
            that[ nameJS ] = v;
        };
    }
    return function ( v ) {
        gl.uniform1iv( nameGL, v );
        that[ nameJS ] = v;
    };
}


/**
 * @this Program
 */
function createUniformSetterFloat( gl, item, nameGL, nameJS ) {
    const that = this;
    if ( item.size === 1 ) {
        return function ( v ) {
            gl.uniform1f( nameGL, v );
            that[ nameJS ] = v;
        };
    }
    return function ( v ) {
        gl.uniform1fv( nameGL, v );
        that[ nameJS ] = v;
    };
}


/**
 * @this Program
 */
function createUniformSetterFloatVec2( gl, item, nameGL, nameJS ) {
    const that = this;
    if ( item.size === 1 ) {
        return function ( v ) {
            gl.uniform2fv( nameGL, v );
            that[ nameJS ] = v;
        };
    }
    throw Error(`[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC2 in uniform \`${
            item.name}'!'`);
}


/**
 * @this Program
 */
function createUniformSetterFloatVec3( gl, item, nameGL, nameJS ) {
    const that = this;
    if ( item.size === 1 ) {
        return function ( v ) {
            gl.uniform3fv( nameGL, v );
            that[ nameJS ] = v;
        };
    }
    throw Error(`[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC3 in uniform \`${
                item.name}'!'`);
}


/**
 * @this Program
 */
function createUniformSetterFloatVec4( gl, item, nameGL, nameJS ) {
    const that = this;
    if ( item.size === 1 ) {
        return function ( v ) {
            gl.uniform4fv( nameGL, v );
            that[ nameJS ] = v;
        };
    }
    throw Error(`[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC4 in uniform \`${
                item.name}'!'`);
}


/**
 * @this Program
 */
function createUniformSetterFloatMat2( gl, item, nameGL, nameJS ) {
    const that = this;
    if ( item.size === 1 ) {
        return function ( v ) {
            gl.uniformMatrix2fv( nameGL, false, v );
            that[ nameJS ] = v;
        };
    }
    throw Error(`[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT2 in uniform \`${
                    item.name}'!'`);
}


/**
 * @this Program
 */
function createUniformSetterFloatMat3( gl, item, nameGL, nameJS ) {
    const that = this;
    if ( item.size === 1 ) {
        return function ( v ) {
            gl.uniformMatrix3fv( nameGL, false, v );
            that[ nameJS ] = v;
        };
    }
    throw Error(`[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT3 in uniform \`${
                    item.name}'!'`);
}


/**
 * @this Program
 */
function createUniformSetterFloatMat4( gl, item, nameGL, nameJS ) {
    const that = this;
    if ( item.size === 1 ) {
        return function ( v ) {
            gl.uniformMatrix4fv( nameGL, false, v );
            that[ nameJS ] = v;
        };
    }
    throw Error(`[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT4 in uniform \`${
                    item.name}'!'`);
}


/**
 * @this Program
 */
function createUniformSetter( gl, item, nameGL, lookup ) {
    const nameJS = `_$${item.name}`;

    switch ( item.type ) {
    case gl.BYTE:
    case gl.UNSIGNED_BYTE:
    case gl.SHORT:
    case gl.UNSIGNED_SHORT:
    case gl.INT:
    case gl.UNSIGNED_INT:
    case gl.SAMPLER_2D: // For textures, we specify the texture unit.
        return createUniformSetterInteger.call( this, gl, item, nameGL, nameJS );
    case gl.FLOAT:
        return createUniformSetterFloat.call( this, gl, item, nameGL, nameJS );
    case gl.FLOAT_VEC2:
        return createUniformSetterFloatVec2.call( this, gl, item, nameGL, nameJS );
    case gl.FLOAT_VEC3:
        return createUniformSetterFloatVec3.call( this, gl, item, nameGL, nameJS );
    case gl.FLOAT_VEC4:
        return createUniformSetterFloatVec4.call( this, gl, item, nameGL, nameJS );
    case gl.FLOAT_MAT2:
        return createUniformSetterFloatMat2.call( this, gl, item, nameGL, nameJS );
    case gl.FLOAT_MAT3:
        return createUniformSetterFloatMat3.call( this, gl, item, nameGL, nameJS );
    case gl.FLOAT_MAT4:
        return createUniformSetterFloatMat4.call( this, gl, item, nameGL, nameJS );
    default:
        throw Error(`[webgl.program.createUniformSetter] Don't know how to deal with uniform \`${
                item.name}\` of type ${lookup[ item.type ]}!`);
    }
}

/**
 * @this Program
 */
function createUniformGetter( item ) {
    const that = this,
          name = `_$${item.name}`;
    return function () {
        return that[ name ];
    };
}


function getShader( type, gl, code ) {
    const shader = gl.createShader( type );
    gl.shaderSource( shader, code );
    gl.compileShader( shader );
    if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
        console.error( `An error occurred compiling the shader: ${gl.getShaderInfoLog( shader )}` );
        console.warn( code );
        return null;
    }

    return shader;
}

function getFragmentShader( gl, code ) {
    return getShader( gl.FRAGMENT_SHADER, gl, code );
}

function getVertexShader( gl, code ) {
    return getShader( gl.VERTEX_SHADER, gl, code );
}

function getTypesNamesLookup( gl ) {
    const lookup = {};
    for ( const k of Object.keys( gl ) ) {
        const v = gl[ k ];
        if ( typeof v === 'number' ) {
            lookup[ v ] = k;
        }
    }
    return lookup;
}

function getTypeName( gl, type ) {
    return getTypesNamesLookup( gl )[type];
}

function getSize( gl, item ) {
    switch ( item.type ) {
    case gl.FLOAT_VEC4:
        return FLOAT_VEC4_SIZE;
    case gl.FLOAT_VEC3:
        return FLOAT_VEC3_SIZE;
    case gl.FLOAT_VEC2:
        return FLOAT_VEC2_SIZE;
    case gl.FLOAT:
        return 1;
    default:
        throw Error(`[webgl.program:getSize] I don't know the size of the attribute '${item.name
            }' because I don't know the type ${getTypeName( item.type )}!`);
    }
}


function readonly( target, name, value ) {
    if ( typeof name !== 'string' ) {
        Object.keys( name ).forEach( function ( key ) {
            readonly( target, key, name[ key ] );
        } );
        return;
    }

    if ( typeof value === 'function' ) {
        Object.defineProperty( target, name, {
            get: value,
            set() {
                throw Error(`The attribute "${name}" is read onyl!`);
            },
            configurable: false,
            enumerable: true
        } );
    } else {
        Object.defineProperty( target, name, {
            value,
            writable: false,
            configurable: false,
            enumerable: true
        } );
    }
}
