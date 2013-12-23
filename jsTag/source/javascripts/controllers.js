var jsTag = angular.module('jsTag');

jsTag.controller('MainCtrl', ['$scope', 'InputHandler', 'TagsHandler', 'jsTagDefaults', function($scope, InputHandler, TagsHandler, jsTagDefaults) {
	// Parse user options and merge with defaults
	var userOptions = {};
	try {
		userOptions = JSON.parse($scope.userOptions);
	} catch(e) {
		console.log("jsTag Error: Invalid user options, using defaults only");
	}
	
	// Copy so we don't override original values
	var options = angular.copy(jsTagDefaults);
	angular.extend(options, userOptions);
	$scope.options = options;
	
	// Export handlers to view
	$scope.tagsHandler = new TagsHandler($scope.options);
	$scope.inputHandler = new InputHandler($scope.options);
	
	// Export tagsCollection separately since it's used alot
	var tagsCollection = $scope.tagsHandler.tagsCollection;
	$scope.tagsCollection = tagsCollection;
		
	// TODO: Should be inside inside tagsCollection.js
	// On every change to editedTags keep isThereAnEditedTag posted
	$scope.$watch('tagsCollection._editedTag', function(newValue, oldValue) {
		$scope.isThereAnEditedTag = newValue !== null;
	});
	
	// TODO: Should be inside inside tagsCollection.js
	// On every change to activeTags keep isThereAnActiveTag posted
	$scope.$watchCollection('tagsCollection._activeTags', function(newValue, oldValue) {
		$scope.isThereAnActiveTag = newValue.length > 0;
	});
}]);