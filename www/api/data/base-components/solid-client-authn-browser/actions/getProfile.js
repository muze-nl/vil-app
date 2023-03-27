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
          return simplyApp.actions.getStoragePath(editor.pageData.webId, profile);
        })
        .then(function(storagePath) {
          editor.pageData.storagePath = storagePath;
          var vilPath = storagePath + "vil-profile.ttl";
          editor.pageData.vilPath = vilPath;
          return solidClientAuthentication.default.fetch(vilPath);
        })
        .then(function(response) {
          if (response.status > 199 && response.status < 300) {
            // something in the 200s is ok;
            return response.text();
          } else {
            return '';
          }
        })
        .then(function(vilProfile) {
          editor.pageData.profileData = vilProfile;
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