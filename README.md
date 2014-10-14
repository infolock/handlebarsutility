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

**hbu.compile()**
Shortcut to Handlebars.Compile()


**hbu.render( url, data ) __returns HTML__**
Attemplates to fetch a template by the given `url`, compile it, and then returns the HTML string output after the received `data` objected is interpolated with the compiled template.

* url:  full path to the template ( i.e., /templates/user-list.html )
* data: the object to be interpolated


**hbu.renderAsync( url, data, cb )**
Does the same as `render` above, except the HTML is returned as part of the payload to the `cb` (*callback*) method

* url:  full path to the template ( i.e., /templates/user-list.html )
* data: the object to be interpolated
* cb: the callback function to receive the final HTML string output



#### Final Thoughts
Considering I'm a huge fan-boy of [underscorejs](http://underscorejs.org/), it should then also come as no surprise that this utlity to have been strutured the same way.

Hopefully this small/simple utility can serve a simple purpose well.  The code in this utility will, without a doubt, continue to grow as use cases present themselves.
