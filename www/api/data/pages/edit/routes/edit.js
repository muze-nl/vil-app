function(params) {
  simplyApp.actions.getProfile()
  .then(function(profile) {
    editor.pageData.profile = profile;
    editor.pageData.page = "edit";
  });
}