function(data) {
  return editor.transformers['rdf'].extract.call(this, 
    editor.transformers['boolean'].extract.call(this, data)
  );
}