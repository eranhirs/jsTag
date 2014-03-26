var jsTag = angular.module('jsTag');

// This service handles everything related to input (when to focus input, key pressing, breakcodeHit).
jsTag.factory('InputHandler', ['$filter', function($filter) {
  
  // Constructor
  function InputHandler(options) {
    this.input = "";
    this.isWaitingForInput = options.autoFocus || false;
    this.options = options;
    
    // If we are working with typeahead, we will let typeahead updater's function call our break function
    if (options.typeahead !== undefined) {
      options.cancelNormalBreak = true;
    }
  }
  
  // *** Events *** //
  
  // Handles an input of a new tag keydown
  InputHandler.prototype.onKeydown = function(inputHandler, tagsCollection, options) {
    var e = options.$event;
    var keycode = e.which;
  
    // Check if should break by breakcodes && Check if the user didn't cancel normal break
    if ($filter("inArray")(keycode, this.options.breakCodes) !== false &&
        !this.options.cancelNormalBreak) {
      // TODO: Call event instead of calling a method, easier to customize: this.scope.$broadcast("jt.breakCodeHit");
      inputHandler.breakCodeHit(tagsCollection);
    } else {
      switch (keycode) {
        case 9:	// Tab
          
          break;
        case 37: // Left arrow
        case 8: // Backspace
          if (inputHandler.input === "") {
            // TODO: Call removing tag event instead of calling a method, easier to customize
            tagsCollection.setLastTagActive();
          }
          
          break;
      }
    }
  }
  
  // Handles an input of an edited tag keydown
  InputHandler.prototype.tagInputKeydown = function(tagsCollection, options) {
    var e = options.$event;
    var keycode = e.which;
    
    // Check if should break by breakcodes && Check if the user didn't cancel normal break
    if ($filter("inArray")(keycode, this.options.breakCodes) !== false &&
        !this.options.cancelNormalBreak) {
        this.breakCodeHitOnEdit(tagsCollection);
    }
  }
  
  // *** Methods *** //
  
  InputHandler.prototype.resetInput = function() {
    var value = this.input;
    this.input = "";
    return value;
  }
  
  // Sets focus on input
  InputHandler.prototype.focusInput = function() {
    this.isWaitingForInput = true;
  }
  
  // breakCodeHit is called when finished creating tag
  InputHandler.prototype.breakCodeHit = function(tagsCollection) {
    if (this.input !== "") {
      var value = this.resetInput();
      
      // Add to tags array
      tagsCollection.addTag(value);
    }
  }
  
  // breakCodeHit is called when finished editing tag
  InputHandler.prototype.breakCodeHitOnEdit = function(tagsCollection) {
    tagsCollection.unsetEditedTag();
    this.isWaitingForInput = true;
  };
    
  return InputHandler;
}]);