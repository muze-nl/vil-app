function() {
  if (document.location.search.match("code")) { // removed, needed for solid-client-authn-browser
    solidClientAuthentication.default.handleIncomingRedirect() // { url: document.location.href, restorePreviousSession : true })
    .then(function() {
      document.location.hash = "#view";
    });
  } else {
    editor.pageData.page = "home";
  }
}