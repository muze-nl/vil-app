function(data) {
  return editor.transformers['boolean'].render.call(this,
    editor.transformers['rdf'].render.call(this, data)
  );
}