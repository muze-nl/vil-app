function(endpoint, params={}) {
  if (!params.token && editor.pageData.token) {
    params.token = editor.pageData.token;
  }
  if (params.token) {
    this.headers['Authorization'] = "Bearer " + params.token;
    delete params.token;
  } else {
    delete this.headers.Authentication;
  }
  return fetch(simplyRawApi.url + endpoint + "/" + simplyRawApi.encodeGetParams(params), {
    mode : 'cors',
    headers: this.headers
  })
  .then(function(response) {
    return simplyRawApi.handleResponse(response);
  });
}