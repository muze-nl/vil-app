function() {
  return solidAuthFetcher.getSession()
  .then(function(session) {
    if (session) {
      editor.pageData.webId = session.webId;
      if (!editor.pageData.profileLoaded) {
        console.log("fetching profile");
        return solidAuthFetcher.fetch(session.webId)
        .then(function(response) {
          return response.text();
        })
        .then(function(profile) {
          editor.pageData.profileData = profile;
          editor.pageData.profileLoaded = true;
          return {};
/*
		  return {
            "woonplaats" : "Utrecht",
            "aow-leeftijd-behaald" : false,
            "ouder-dan-21" : true,
            "alleenstaande" : true,
            "thuiswonende-kinderen" : true,
            "vermogen" : null,
            "inkomen-per-maand" : null
          }
*/
        });
      } else {
        console.log("returning cached profile");
        return editor.pageData.profile;
      }
    }
  }); 
}