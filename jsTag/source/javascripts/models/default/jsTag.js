var jsTag = angular.module('jsTag');

// Tag Model
jsTag.factory('JSTag', function() {
  function JSTag(value, id) {
    this.value = value;
    this.id = id;
  }
  
  return JSTag;
});