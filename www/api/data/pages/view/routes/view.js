function(params) {
  simplyApp.actions.getProfile()
  .then(function(profile) {
    console.log(profile);
    editor.pageData.profile = profile;
    editor.pageData.profileFieldsComplete = simplyApp.actions.isProfileComplete(profile);
    editor.pageData.page = "view";
  });
}