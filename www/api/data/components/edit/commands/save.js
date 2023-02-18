function(el) {
  var about = el.closest("[about]");
  var subject = editor.pageData.webId;
  var changes = [];
  var store = new $rdf.graph();
  $rdf.parse(
    editor.pageData.profileData,
    store,
    subject,
    "text/turtle"
  );

  var fields = about.querySelectorAll("[property]");
  fields.forEach(function(field) {
    var property = field.getAttribute("property");
    var value = field.dataBinding.get();
    var namespace = property.split(":")[0];
    var property  = property.split(":")[1];
    namespace = simplyApp.actions.resolveNameSpace(field, namespace);
    var predicate = namespace + property;
    var subjectSym = store.sym(subject);
    var predicateSym = store.sym(predicate);
    var currentValue = store.any(subjectSym, predicateSym);
    if ((currentValue) && (value != currentValue.value)) {
      changes.push({"type" : "delete", "subject" : subject, "predicate" : predicate, "value" : currentValue.value});
      changes.push({"type" : "insert", "subject" : subject, "predicate" : predicate, "value" : value});
    } else if (!currentValue) {
      changes.push({"type" : "insert", "subject" : subject, "predicate" : predicate, "value" : value});
    }
  });
  
  simplyApp.actions.saveProfile(editor.pageData.webId, changes)
  .then(function() {
    delete editor.pageData.profileData;
    delete editor.pageData.profileLoaded;
    
    document.location.hash="#view";
  });
}