(function() {
    'use strict';

    var UNDEF = 'undefined';
    var root  = this;
    var $hbu = root.hbu || null;

    var hbu = function( obj ) {
        if( obj instanceof hbu ) return obj;
        if( !( this instanceof hbu ) ) {
            return new hbu( obj );
        }

        this.wrappedHB = obj;
    };

    if( typeof exports !== UNDEF ) {
        if( typeof module !== UNDEF && module.exports ) {
            exports = module.exports = hbu;
        }
        exports.hbu = hbu;
    } else {
        root.hbu = hbu;
    }

    hbu.version = '0.0.1';
    hbu.cache || ( hbu.cache = {} );

    hbu.compile = function( source ) {
        return Handlebars.compile( source );
    };

    hbu.request = function( url, async ) {

        return $.ajax({
            url: url,
            method: 'GET',
            async: !!async,
        });

    };

    hbu.render = function( url, data ) {
        if( !url || !_.isString( url ) ) {
            return;
        }

        data || ( data = {} );

        if ( !hbu.cache[url] ) {

            hbu.request( url ).done( function( source ) {
                hbu.cache[url] = hbu.compile( source );
            });

        }

        return hbu.cache[url]( data );
    };

    hbu.renderAsync = function( url, data, cb ) {
        if( !url || !_.isString( url ) ) {
            return;
        }

        data || ( data = {} );

        if( !cb || !_.isFunction( cb ) ) {
             console.log( "hbu.renderAsync requires a callback method to be passed in." );
            return false;
        }

        if ( hbu.cache[url] ) {
            cb( hbu.cache[url]( data ) );
            return;
        }

        hbu.request( url, false ).done( function( source ) {
            hbu.cache[url] = hbu.compile( source );
            cb( hbu.cache[url]( data ) );
        });
    };

    if( typeof define === 'function' && define.amd ) {
        define( 'handlebarsUtility', [], function() {
            return hbu;
        });
    }

}.call( this ) );
