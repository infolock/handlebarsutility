(function() {
    'use strict';

    var AsyncCollection = {
        items: [
            {
                name: 'Hello'
            },
            {
                name: 'World!'
            },
            {
                name: 'I was loaded Asynchronously and *before* the synchronousCollection...'
            },
            {
                name: 'And yet, I may appear *after* the synchronousCollection!'
            }
        ]
    };

    var appendContent = function( html ) {
        $( '#content' ).append( html );
    };

    // Load the body template asynchronously
    hbu.renderAsync( 'static/body.html', AsyncCollection, appendContent )

    // Load the body template synchronously
    appendContent( hbu.render( 'static/body.html', { items: [ { name: 'I was loaded synchronously.' } ] } ) );
}());