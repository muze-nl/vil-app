function(params) {
  simplyApp.actions.getProfile()
  .then(function(profile) {
    editor.pageData.profile = profile;    
    editor.pageData.eligable = "checking";
    editor.pageData.page = "check";
    return simplyApp.actions.evaluate(editor.pageData.profile);
  })
  .then(function(eligableAmount) {
    if (eligableAmount > 0) {
      editor.pageData.eligable = "eligable";
    } else {
      editor.pageData.eligable = "not-eligable";
    }
    editor.pageData.eligableAmount = eligableAmount;
  });
}