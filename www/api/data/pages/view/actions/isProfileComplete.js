function(profile) {
  let fields = [
    "woonplaats",
    "aow-leeftijd-behaald",
    "ouder-dan-21",
    "inkomen-per-maand",
    "vermogen",
    "alleenstaande",
    "thuiswonende-kinderen",
  ];

  var result = true;
  fields.forEach(function(field) {
    if (
      typeof profile[field] === "undefined" ||
      (profile[field] === null) || 
      (profile[field] === "")
    ) {
      result = false;
    }
  });
  return result;
}