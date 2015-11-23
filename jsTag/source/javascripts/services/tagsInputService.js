var jsTag = angular.module('jsTag');

// TagsCollection Model
jsTag.factory('TagsInputService', ['JSTag', 'JSTagsCollection', function(JSTag, JSTagsCollection) {
  // Constructor
  function TagsHandler(options) {
    this.options = options;
    var tags = options.tags;

    // Received ready JSTagsCollection
    if (tags && Object.getPrototypeOf(tags) === JSTagsCollection.prototype) {
      this.tagsCollection = tags;
    }
    // Received array with default tags or did not receive tags
    else {
      var defaultTags = options.defaultTags;
      this.tagsCollection = new JSTagsCollection(defaultTags);
    }
    this.shouldBlurActiveTag = true;
  }

  // *** Methods *** //

  TagsHandler.prototype.tagClicked = function(tag) {
    this.tagsCollection.setActiveTag(tag);
  };

  TagsHandler.prototype.tagDblClicked = function(tag) {
    var editAllowed = this.options.edit;
    if (editAllowed) {
      // Set tag as edit
      this.tagsCollection.setEditedTag(tag);
    }
  };

  // Keydown was pressed while a tag was active.
  // Important Note: The target of the event is actually a fake input used to capture the keydown.
  TagsHandler.prototype.onActiveTagKeydown = function(inputService, options) {
    var activeTag = this.tagsCollection.getActiveTag();

    // Do nothing in unexpected situations
    if (activeTag !== null) {
      var e = options.$event;

      // Mimics blur of the active tag though the focus is on the input.
      // This will cause expected features like unseting active tag
      var blurActiveTag = function() {
        // Expose the option not to blur the active tag
        if (this.shouldBlurActiveTag) {
          this.onActiveTagBlur(options);
        }
      };

      switch (e.which) {
        case 13: // Return
          var editAllowed = this.options.edit;
          if (editAllowed) {
            blurActiveTag.apply(this);
            this.tagsCollection.setEditedTag(activeTag);
          }

          break;
        case 8: // Backspace
          this.tagsCollection.removeTag(activeTag.id);
          inputService.isWaitingForInput = true;

          break;
        case 37: // Left arrow
          blurActiveTag.apply(this);
          var previousTag = this.tagsCollection.getPreviousTag(activeTag);
          this.tagsCollection.setActiveTag(previousTag);

          break;
        case 39: // Right arrow
          blurActiveTag.apply(this);

          var nextTag = this.tagsCollection.getNextTag(activeTag);
          if (nextTag !== activeTag) {
            this.tagsCollection.setActiveTag(nextTag);
          } else {
            inputService.isWaitingForInput = true;
          }

          break;
      }
    }
  };

  // Jumps when active tag calls blur event.
  // Because the focus is not on the tag's div itself but a fake input,
  // this is called also when clicking the active tag.
  // (Which is good because we want the tag to be unactive, then it will be reactivated on the click event)
  // It is also called when entering edit mode (ex. when pressing enter while active, it will call blur)
  TagsHandler.prototype.onActiveTagBlur = function(options) {
    var activeTag = this.tagsCollection.getActiveTag();

    // Do nothing in unexpected situations
    if (activeTag !== null) {
      this.tagsCollection.unsetActiveTag(activeTag);
    }
  };

  // Jumps when an edited tag calls blur event
  TagsHandler.prototype.onEditTagBlur = function(tagsCollection, inputService) {
    tagsCollection.unsetEditedTag();
    this.isWaitingForInput = true;
  };

  return TagsHandler;
}]);
