function(data) {
  if (data === "Ja") {
    return true;
  }
  if (data === "Nee") {
	return false;
  }
  return this.simplyData;
}