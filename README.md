handlebarsutility
=================

Making a simple solution more useful

This is a utility class built to work with handlebars inspired mostly in part by a [slick solution for loading handlebar template files](http://stackoverflow.com/a/10136935/1244184) on demand via ajax.


**Required Libraries**
* [underscorejs](http://underscorejs.org/)
* [jQuery](http://jquery.com)
* [Handlebars](http://handlebarsjs.com/)


## Examples

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
        $( body ).append( $userList );
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

        hbu.render( '/templates/user-list.html', data, function( $userList ) {
            $( body ).append( $userList );
        });

    });

}());
```


## Methods

<a name="hbu-compile"></a>
[`hbu.compile()`](#hbu-compile "hbu.compile") is just a basic shortcut to Handlebars.Compile()

<a name="hbu-render"></a>
[`hbu.render( url, data )`](#hbu-render "hbu.render( url, data )") Attemplates to fetch a template by the given `url`, compile it, and then returns the HTML string output after the received `data` objected is interpolated with the compiled template.

<a name="hbu-renderAsync"></a>
[`hbu.renderAsync( url, data, cb )`](#hbu-renderAsync "hbu.renderAsync( url, data, cb )") does the same as [hb.render](#hbu-render) above, except the HTML is returned as part of the payload via the received `cb` (*callback*)

<a name="hbu-request"></a>
[`hbu.request( url, async )`](#hbu-request "hbu.request( url, async )") performs a basic `jQuery.ajax()` call and returns the `jqXHR` (promise) as a resule.  By default, this method performs all requests `synchronously`.  Pass in `true` for the `async` parameter to have it perform the requests `asynchronously`. 

> Note: right now, only the `hbu-renderAsync` method actually benefits from using this param.  I'm anticiapting this changing which is why this parameter (and method) is part of the public scope...

#### Final Thoughts
Considering I'm a huge fan-boy of [underscorejs](http://underscorejs.org/), it should then also come as no surprise that this utlity to have been strutured the same way.

Hopefully this small/simple utility can serve a simple purpose well.  The code in this utility will, without a doubt, continue to grow as use cases present themselves.
