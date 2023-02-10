function(el) {
  simplyApp.actions.saveProfile()
  .then(function() {
    document.location.hash="#view";
  });
}