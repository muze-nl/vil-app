function(element, namespace) {
  var xmlNamespace = "xmlns:" + namespace;
  return document.body.closest("[" + CSS.escape(xmlNamespace) + "]").getAttribute(xmlNamespace);
}