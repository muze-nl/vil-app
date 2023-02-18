function() {
  if (false && document.location.search.match("code")) { // removed, needed for solid-client-authn-browser
    solidClientAuthentication.default.handleIncomingRedirect({ restorePreviousSession : true })
    .then(function() {
      document.location.hash = "#view";
    });
  } else {
    editor.pageData.page = "home";
  }
}