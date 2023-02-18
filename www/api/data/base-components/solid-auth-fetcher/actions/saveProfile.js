function(webId, changes) {
  console.log(changes);

  /*
  var sparql = [];
  var inserts = [];
  var deletes = [];
  changes.forEach(function(change) {
    switch (change.type) {
      case "insert":
        sparql.push("INSERT DATA { <" + change.subject + "> <" + change.predicate + "> \"" + change.value + "\" . };");
      break;
      case "delete":
        sparql.push("DELETE DATA { <" + change.subject + "> <" + change.predicate + "> \"" + change.value + "\" . };");
      break;
    }
  });
  console.log(sparql);
  
  return solidAuthFetcher.fetch(webId, {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/sparql-update"
    },
    body: sparql.join("\n")
  });
  */
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
      solidAuthFetcher.fetch(webId, {
        method: 'PATCH',
        headers: {
          "Content-Type": "text/n3"
        },
        body: body
      })
    );
  });
  
  return Promise.all(promises);
/*
  return solidAuthFetcher.fetch(webId, {
    method: 'PATCH',
    headers: {
      "Content-Type": "text/n3"
    },
    body: parts.join("\n")
  });
*/
}
                     