function(data) {
  this.simplyData = data;
  if (data === null) {
    return "Onbekend";
  }
  if (data === true) {
    return "U kunt op basis van deze gegevens in aanmerking komen voor een inkomentoeslag.";
  }
  if (data === false) {
    return "U kunt op basis van deze gegevens niet in aanmerking komen voor een inkomentoeslag.";
  }
  return "Onbekend";
}