function() {
  return simplyApp.actions.getProfile()
  .then(function(profile) {
    editor.pageData.profile = profile;    
    return simplyApp.actions.evaluate(editor.pageData.profile);
  })
  .then(function(eligableAmount) {
    if (eligableAmount > 0) {
      var inboxUrl = "https://mijnsolidpod.nl/ylebre2/inbox/";
      let body = simplyApp.actions.generateProfile();
      return solidClientAuthentication.default.fetch(inboxUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "text/turtle"
        },
        body: body
      })
      .then(function(response) {
        var location = response.headers.get('Location');
        var requestId = location.replace(inboxUrl, '');
        return requestId;
      });
	
    } else {
      throw new Exception("Not eligable");
    }
  });
}