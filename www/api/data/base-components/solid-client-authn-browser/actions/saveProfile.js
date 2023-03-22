function(webId, changes) {
  var parts = []; 
  var counter = 1;
  changes.forEach(function(change) {
    switch (change.type) {
      case "insert":
        parts.push(
          "_:" + counter + " a <http://www.w3.org/ns/solid/terms#InsertDeletePatch>;" +
          "<http://www.w3.org/ns/solid/terms#inserts> { " +
          "<" + change.subject + "> <" + change.predicate + "> \"" + change.value + "\"." +
          "}."
        );
        counter++;
      break;
      case "delete":
        parts.push(
          "_:" + counter + " a <http://www.w3.org/ns/solid/terms#InsertDeletePatch>;" +
          "<http://www.w3.org/ns/solid/terms#deletes> { " +
          "<" + change.subject + "> <" + change.predicate + "> \"" + change.value + "\"." +
          "}."
        );
        counter++;
      break;
    }
  });
  var promises = [];
  parts.forEach(function(body) {
    promises.push(
      solidClientAuthentication.default.fetch(webId, {
        method: 'PATCH',
        headers: {
          "Content-Type": "text/n3"
        },
        body: body
      })
    );
  });
  
  return Promise.all(promises);
}
                     