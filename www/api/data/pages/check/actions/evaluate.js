function(profile) {
  return simplyDataApi.evaluate(profile)
  .catch(function() {
    return 0;
  });
}