var jsTag = angular.module('jsTag');

// TODO: Maybe add A to 'restrict: E' for support in IE 8?
jsTag.directive('jsTag', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: function($element, $attrs, jsTagDefaults) {
			var jsTagOptions = $attrs.jsTagOptions;
		
			if ((jsTagOptions !== undefined) &&
				(jsTagOptions.template !== "") &&
				(jsTagOptions.template !== undefined)) {
				return template;
			} else {
				return 'jsTag/source/templates/default/js-tag.html';
			}
		},
		controller: ['$scope', '$attrs', function ($scope, $attrs) {
			// Passes to the actual controller the user options from the html.
			// TODO: Pretty much a hack, find a better solution.
			$scope.userOptions = $attrs.jsTagOptions;
		}]
	}
});

// TODO: Replace this custom directive by a supported angular-js directive for blur
jsTag.directive('ngBlur', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
					// this next line will convert the string
					// function name into an actual function
				  var functionToCall = $parse(attrs.ngBlur);
					elem.bind('blur', function(event) {
					
						// on the blur event, call my function
						scope.$apply(function() {
							functionToCall(scope, {$event:event});
						});
					});
        }
    };
});


// Notice that focus me also sets the value to false when blur is called
// TODO: Replace this custom directive by a supported angular-js directive for focus
// http://stackoverflow.com/questions/14833326/how-to-set-focus-in-angularjs
jsTag.directive('focusMe', function($parse, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.focusMe);
			scope.$watch(model, function(value) {
				if (value === true) {
					$timeout(function() {
						element[0].focus(); 
					});
				}
			});
			
			// to address @blesh's comment, set attribute value to 'false'
			// on blur event:
			element.bind('blur', function() {
				scope.$apply(model.assign(scope, false));
			});
		}
	};
});

// focusOnce is used to focus an element once when first appearing
// Not like focusMe that binds to an input boolean and keeps focusing by it
jsTag.directive('focusOnce', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$timeout(function() {
				element[0].select();
			});
		}
	};
});

// auto-grow directive by the "shadow" tag concept
jsTag.directive('autoGrow', function($timeout) {
	return {
		link: function(scope, element, attr){
			var paddingLeft = element.css('paddingLeft'),
					paddingRight = element.css('paddingRight');
	 
			var minWidth = 60;
	 
			var $shadow = angular.element('<span></span>').css({
				'position': 'absolute',
				'top': '-10000px',
				'left': '-10000px',
				'fontSize': element.css('fontSize'),
				'fontFamily': element.css('fontFamily'),
				'white-space': 'pre'
			});
			element.after($shadow);
	 
			var update = function() {
				var val = element.val()
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/&/g, '&amp;')
				;
				
				// If empty calculate by placeholder
				if (val !== "") {
					$shadow.html(val);
				} else {
					$shadow.html(element[0].placeholder);
				}
				
				var newWidth = ($shadow[0].offsetWidth + 10) + "px";
				element.css('width', newWidth);
			}
	 
			element.bind('keyup keydown', update);
			
			// Update on the first link
			// $timeout is needed because the value of element is updated only after the $digest cycle
			// TODO: Maybe on compile time if we call update we won't need $timeout
			$timeout(update);
		}
	}
});