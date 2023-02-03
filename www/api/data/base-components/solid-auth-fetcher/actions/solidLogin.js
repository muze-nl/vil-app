function(webIdProvider, returnPage) {
  var session = solidAuthFetcher.getSession()
  .then(function(session) {
    if (session) {
      console.log(session.webId);
      editor.pageData.webId = session.webId;
      document.location.href = returnPage;
    } else {
      console.log(editor.pageData.webIdProvider);
      solidAuthFetcher.login({
        oidcIssuer: webIdProvider,
        redirect: returnPage
      })
      .then(function(session) {
        console.log(session.webId);
        editor.pageData.webId = session.webId;
      });
    }
  });
}