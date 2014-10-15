handlebarsutility
=================

Making a simple solution more useful

This is a utility class built to work with handlebars inspired mostly in part by a [slick solution for loading underscore template files](http://stackoverflow.com/a/10136935/1244184) on demand via ajax.


**Required Libraries**
* [underscorejs](http://underscorejs.org/)
* [jQuery](http://jquery.com)
* [Handlebars](http://handlebarsjs.com/)


## Examples

> Checkout the included `example` folder for a full example using both the `Async` and `Sync` loading options.

All examples below assume we have a `templates` folder in the root of our **www** folder that contatins a handlebars template file `user-list.html`.  This template's source would be something simple like:
```html
<ul>
{{#users}}
    <li>{{username}}</li>
{{/users}}
</ul>
```


#### Non-async Example
```js
(function() {
    'use strict';

    var data = {
        users: [
            {
                "username": "jon"
            },
            {
                "username": "sally"
            }
        ]
    };

    var $userList = hbu.render( '/templates/user-list.html', data );

    $( function() {
        $( 'body' ).append( $userList );
    });

}());
```

#### Async Example
```js
(function() {
    'use strict';

    var data = {
        users: [
            {
                "username": "jon"
            },
            {
                "username": "sally"
            }
        ]
    };

    $( function() {
        hbu.renderAsync( '/templates/user-list.html', data, function( $userList ) {
            $( 'body' ).append( $userList );
        });
    });
    /*
    The above could also be written:

    hbu.renderAsync( '/template.php', data, function( $userList ) {
        $( function() {
            $( '#output' ).append( $userList );
        });
    });
    
    along with any number of other ways....
    */

}());
```


## Methods

<a name="hbu-compile"></a>
[`hbu.compile()`](#hbu-compile "hbu.compile") is just a basic shortcut to `Handlebars.Compile()`

<a name="hbu-render"></a>
[`hbu.render( url, data )`](#hbu-render "hbu.render( url, data )") Attempts to fetch a template by the given `url`, compile it, and then return the HTML string result with the received `data` objected is interpolated with the compiled template.

<a name="hbu-renderAsync"></a>
[`hbu.renderAsync( url, data, cb )`](#hbu-renderAsync "hbu.renderAsync( url, data, cb )") does the same as [hb.render](#hbu-render) above, except the HTML is returned as part of the payload via the received `cb` (*callback*)

<a name="hbu-request"></a>
[`hbu.request( url, async )`](#hbu-request "hbu.request( url, async )") performs a basic `jQuery.ajax()` call and returns the `jqXHR` (promise) as a result.  By default, this method performs all requests `synchronously`.  Pass in `true` for the `async` parameter to have it perform the requests `asynchronously`. 

> Note: right now, only the `hbu-renderAsync` method actually benefits from using this param.  I'm anticiapting this changing which is why this parameter (and method) is part of the public scope...

#### Final Thoughts
Used the same structure as [underscorejs](http://underscorejs.org/) for this utility (definition-wise)

Hopefully this small/simple utility can serve a simple purpose well.  The code in this utility will, without a doubt, continue to grow as use cases present themselves.
