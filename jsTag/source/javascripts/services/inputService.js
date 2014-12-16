var jsTag = angular.module('jsTag');

// This service handles everything related to input (when to focus input, key pressing, breakcodeHit).
jsTag.factory('InputService', ['$filter', function($filter) {

  // Constructor
  function InputService(options) {
    this.input = "";
    this.isWaitingForInput = options.autoFocus || false;
    this.options = options;
  }

  // *** Events *** //

  // Handles an input of a new tag keydown
  InputService.prototype.onKeydown = function(inputService, tagsCollection, options) {
    var e = options.$event;
    var keycode = e.which;

    // Check if should break by breakcodes
    if ($filter("inArray")(keycode, this.options.breakCodes) !== false) {

      inputService.breakCodeHit(tagsCollection, this.options);

      // Trigger breakcodeHit event allowing extensions (used in twitter's typeahead directive)
      var $element = angular.element(e.currentTarget);
      $element.trigger('jsTag:breakcodeHit');
    } else {
      switch (keycode) {
        case 9:	// Tab

          break;
        case 37: // Left arrow
        case 8: // Backspace
          if (inputService.input === "") {
            // TODO: Call removing tag event instead of calling a method, easier to customize
            tagsCollection.setLastTagActive();
          }

          break;
      }
    }
  }

  // Handles an input of an edited tag keydown
  InputService.prototype.tagInputKeydown = function(tagsCollection, options) {
    var e = options.$event;
    var keycode = e.which;

    // Check if should break by breakcodes
    if ($filter("inArray")(keycode, this.options.breakCodes) !== false) {
      this.breakCodeHitOnEdit(tagsCollection, options);
    }
  }

  // *** Methods *** //

  InputService.prototype.resetInput = function() {
    var value = this.input;
    this.input = "";
    return value;
  }

  // Sets focus on input
  InputService.prototype.focusInput = function() {
    this.isWaitingForInput = true;
  }

  // breakCodeHit is called when finished creating tag
  InputService.prototype.breakCodeHit = function(tagsCollection, options) {
    if (this.input !== "") {
      var originalValue = this.resetInput();

      // Input is an object when using typeahead (the key is chosen by the user)
      if (originalValue instanceof Object)
      {
        originalValue = originalValue[options.tagDisplayKey || Object.keys(originalValue)[0]];
      }

      // Split value by spliter (usually ,)
      var values = originalValue.split(options.splitter);

      // Add tags to collection
      for (var key in values) {
        if ( ! values.hasOwnProperty(key)) continue;  // for IE 8
        var value = values[key];
        tagsCollection.addTag(value);
      }
    }
  }

  // breakCodeHit is called when finished editing tag
  InputService.prototype.breakCodeHitOnEdit = function(tagsCollection, options) {
    // Input is an object when using typeahead (the key is chosen by the user)
    var editedTag = tagsCollection.getEditedTag();
    if (editedTag.value instanceof Object) {
      editedTag.value = editedTag.value[options.tagDisplayKey || Object.keys(editedTag.value)[0]];
    }

    tagsCollection.unsetEditedTag();
    this.isWaitingForInput = true;
  };

  return InputService;
}]);
