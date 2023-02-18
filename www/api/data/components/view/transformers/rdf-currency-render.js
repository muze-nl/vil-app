function(data) {
  return editor.transformers['currency'].render.call(this,
    editor.transformers['rdf'].render.call(this, data)
  );
}