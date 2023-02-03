function() {
  var session = solidAuthFetcher.getSession()
  .then(function(session) {
    if (session) {
      editor.pageData.webId = session.webId;
      solidAuthFetcher.fetch(session.webId)
      .then(function(response) {
        return response.text();
      })
      .then(function(profile) {
        console.log(profile);
      });
    }
  }); 
}