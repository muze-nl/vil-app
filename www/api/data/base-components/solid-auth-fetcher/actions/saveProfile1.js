function(webId, sparql) {
  console.log(sparql);
  return solidAuthFetcher.fetch(webId, {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/sparql-update"
    },
    body: sparql.join("\n")
  });
}
                     