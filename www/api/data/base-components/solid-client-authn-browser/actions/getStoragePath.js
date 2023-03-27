function(webId, profileData) {
  var store = new $rdf.graph();
  var rdfStore = store.sym(webId);
  $rdf.parse(
    profileData,
    store,
    webId,
    "text/turtle"
  );
  var predicate = store.sym("http://www.w3.org/ns/pim/space#storage");
  var result = store.any(rdfStore, predicate);
  return result.value;   
}
