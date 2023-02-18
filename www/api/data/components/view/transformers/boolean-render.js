function(data) {
  this.simplyData = data;
  if (
    (data === null) ||
    (data === "")
  ) {
    return "Onbekend";
  }
  if (
    (data === true) ||
    (data === "1") ||
    (data === "true") ||
    (data === 1)
  ) {
    return "Ja";
  }
  if(
    (data === false) ||
    (data === "0") ||
    (data === "false") ||
    (data === 0)
  ) {
    return "Nee";
  }
  return "Onbekend";
}

