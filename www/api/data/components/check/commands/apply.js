function(el) {
  return simplyApp.actions.apply()
  .then(function(requestId) {
    document.location.hash="#close/" + requestId;
  })
  .catch(function() {
    // FIXME: more elegant error handling?
	document.location.hash="#check";
  });
}