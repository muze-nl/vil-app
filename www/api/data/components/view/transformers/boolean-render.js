function(data) {
  this.simplyData = data;
  if (data === null) {
    return "Onbekend";
  }
  if (data === true) {
    return "Ja";
  }
  if (data === false) {
    return "Nee";
  }
  return "Onbekend";
}

