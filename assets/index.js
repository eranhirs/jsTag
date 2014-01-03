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