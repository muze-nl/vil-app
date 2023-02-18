function(data) {
  var store = new $rdf.graph();
  var about = this.closest("[about]");
  if (!about) {
    return data;
  }

  var subject = this.closest("[about]").getAttribute("about");
  var rdfStore = store.sym(subject);
  //    $rdf.parse(body, store, uri, mimeType)
  $rdf.parse(
    editor.pageData.profileData,
    store,
    subject,
    "text/turtle"
  );
  var namespace = this.getAttribute("property").split(":")[0];
  var property  = this.getAttribute("property").split(":")[1];
  namespace = simplyApp.actions.resolveNameSpace(this, namespace);
  var predicate = store.sym(namespace + property);

  var result = store.any(rdfStore, predicate);
  if (result) {
    if (data != result.value) {
      this.dataBinding.set(result.value);
    }
    return result.value;
  }
  return '';
}