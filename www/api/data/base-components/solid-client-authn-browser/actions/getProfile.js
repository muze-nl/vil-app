function() {
  return solidClientAuthentication.default.handleIncomingRedirect({ restorePreviousSession : true })
  .then(function() {
    if (solidClientAuthentication.default.getDefaultSession().info.isLoggedIn) {
      editor.pageData.webId = solidClientAuthentication.default.getDefaultSession().info.webId;
      if (!editor.pageData.profileLoaded) {
        return solidClientAuthentication.default.fetch(editor.pageData.webId)
          .then(function(response) {
          return response.text();
        })
          .then(function(profile) {
          editor.pageData.profileData = profile;
          editor.pageData.profileLoaded = true;
          return {}; // return empty, the rdf transformer will fill the profile data.
        });
      } else {
        return new Promise(function(resolve, reject) {
          resolve(editor.pageData.profile);
        });
      }
    }
  });
}