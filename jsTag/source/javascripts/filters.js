var jsTag = angular.module('jsTag');

// Checks if item (needle) exists in array (haystack)
jsTag.filter('inArray', function() {
  return function(needle, haystack) {
    for(var key in haystack)
    {
      if (needle === haystack[key])
      {
        return true;
      }
    }

    return false;
  };
});

// TODO: Currently the tags in JSTagsCollection is an object with indexes,
// and this filter turns it into an array so we can sort them in ng-repeat.
// An array should be used from the beginning.
jsTag.filter('toArray', function() {
  return function(input) {
    var objectsAsArray = [];
    for (var key in input) {
      var value = input[key];
      objectsAsArray.push(value);
    }
  
    return objectsAsArray;
  };
});