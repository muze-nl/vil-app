function(params) {
  simplyApp.actions.getProfile()
  .then(function(profile) {
    editor.pageData.profile = profile;
    return simplyApp.actions.checkEligability(profile);
  })
  .then(function(eligable) {
    editor.pageData.eligable = eligable;
    editor.pageData.page = "check";
  });
}