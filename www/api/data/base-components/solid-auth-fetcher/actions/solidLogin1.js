function(webIdProvider, returnPage) {
  var session = solidAuthFetcher.getSession()
  .then(function(session) {
    if (session) {
      editor.pageData.webId = session.webId;
      document.location.href = returnPage;
    } else {
      solidAuthFetcher.login({
        oidcIssuer: webIdProvider,
        redirect: document.location.href // returnPage
      })
      .then(function(session) {
        editor.pageData.webId = session.webId;
      });
    }
  });
}