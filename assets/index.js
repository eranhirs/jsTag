// mgcrea.ngStrap.typeahead - used for typeahead
var demoApp = angular.module('demoApp', ['jsTag']);

demoApp.controller('MoreControlController', ['$scope', 'JSTagsCollection', function($scope, JSTagsCollection) {
  // Build JSTagsCollection
  $scope.tags = new JSTagsCollection(["jsTag", "angularJS"]);

  // Export jsTags options, inlcuding our own tags object
  $scope.jsTagOptions = {
    "tags": $scope.tags
  };
}]);

demoApp.controller('CustomizedController', ['$scope', function($scope) {
  $scope.jsTagOptions = {
    "texts": {
      "inputPlaceHolder": "Type text here"
    },
    "defaultTags": ["Default Tag #1", "Default Tag #2"]
  };
}]);

demoApp.controller('TypeaheadController', ['$scope', 'JSTagsCollection', function($scope, JSTagsCollection) {
  // Build JSTagsCollection
  $scope.tags = new JSTagsCollection(["jsTag", "angularJS"]);
  
  // Build list of suggestions
  var typeahead = {
    source: ['jsTag', 'c#', 'java', 'javascript', 'jquery', 'android' , 'php', 'c++', 'python', 'c++', 'asp.net', 'ios', 'mysql', 'iphone', 'sql', 'html', 'css', 'objective-c', 'ruby-on-rails', 'c', 'sql-server', 'ajax', 'xml', '.net', 'ruby', 'regex', 'database', 'vb.net', 'arrays', 'eclipse', 'json', 'django', 'linux', 'xcode', 'windows', 'html5', 'winforms', 'r', 'wcf', 'visual-studio-2010', 'forms', 'performance', 'excel', 'spring', 'node.js', 'git', 'apache', 'entity-framework', 'asp.net', 'web-services', 'linq', 'perl', 'oracle', 'action-script', 'wordpress', 'delphi', 'jquery-ui', 'tsql', 'mongodb', 'neo4j', 'angularJS', 'unit-testing', 'postgresql', 'scala', 'xaml', 'http', 'validation', 'rest', 'bash', 'css', 'django', 'silverlight', 'cake-php', 'elgg', 'oracle', 'cocoa', 'swing', 'mocha', 'amazon-web-services']
  };

  // Export jsTags options, inlcuding our own tags object
  $scope.jsTagOptions = {
    "tags": $scope.tags,
    "typeahead": typeahead
  };
}]);
