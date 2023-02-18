function(params) {
  simplyApp.actions.getProfile()
  .then(function(profile) {
    editor.pageData.profile = profile;
    editor.pageData.page = "view";
    setTimeout(function() {
      editor.pageData.profileFieldsComplete = simplyApp.actions.isProfileComplete(editor.pageData.profile);
    });
  });
}