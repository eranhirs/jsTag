var jsTag = angular.module('jsTag', []);

// Defaults for jsTag (can be overriden as shown in example)
jsTag.constant('jsTagDefaults', {
  'defaultTags': [],
  'breakCodes': [
    13, // Return
    44 // Comma
  ],
  'texts': {
    'inputPlaceHolder': "Input text",
    'removeSymbol': String.fromCharCode(215)
  }
});