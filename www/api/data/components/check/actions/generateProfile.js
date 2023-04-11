function() {
  var store = new $rdf.graph();
  var storeBaseUrl = "<" + editor.pageData.webId + ">";

  var subject = store.sym(editor.pageData.webId);
  var doc = subject.doc();
  var vil2 = new $rdf.Namespace('http://vil.app/#');
  
  store.add(subject, vil2('leeftijd'), editor.pageData.profile['leeftijd']);
  store.add(subject, vil2('thuiswonendeKinderen'), editor.pageData.profile['thuiswonendeKinderen']);
  store.add(subject, vil2('ouderDan21'), editor.pageData.profile['ouder-dan-21']);
  store.add(subject, vil2('aowLeeftijdBehaald'), editor.pageData.profile['aow-leeftijd-behaald']);
  store.add(subject, vil2('vermogen'), editor.pageData.profile['vermogen']);
  store.add(subject, vil2('inkomenPerMaand'), editor.pageData.profile['inkomen-per-maand']);
  store.add(subject, vil2('alleenstaande'), editor.pageData.profile['alleenstaande']);
  store.add(subject, vil2('woonplaats'), editor.pageData.profile['woonplaats']);
 
  return $rdf.serialize(null, store, storeBaseUrl, 'text/turtle');
}