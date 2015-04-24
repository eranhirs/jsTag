jsTag
=====
Pure Angular Input Tags project.

Demo
----
Available [here](http://eranhirs.github.io/jsTag/ "jsTag Demo").

Features
--------
 * Editing tags
 * Integration with [Twitter's typeahead](http://twitter.github.io/typeahead.js/ "Twitter's typeahead github")
 * Tags are binded to javascript
 * Easy to customize for your own needs!

Usage
-----
See demo for usage.

Customization
-----
jsTag is very customizable, just pass in an object with your customization into the directive.
```HTML
<js-tag js-tag-options="jsTagOptions"></js-tag>
```

The default options object looks like this but any parameters passed in replaces the original.
```js
{
  'edit': true,
  'defaultTags': [],
  'breakCodes': [
    13, // Return
    44 // Comma
  ],
  'splitter': ',',
  'texts': {
    'inputPlaceHolder': "Input text",
    'removeSymbol': String.fromCharCode(215)
  }
}
```

About
-----
jsTag is an open source project for editing tags (aka tokenizer) based on pure angularJS.
The project was created by eranhirs for inner purpose.
Any contribution to the project is more than welcome.

Hope you enjoy, feedback is more than welcome.
