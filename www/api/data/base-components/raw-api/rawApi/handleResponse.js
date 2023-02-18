function(response) {
  return new Promise(function(resolve, reject) {
   if (response.status >= 200 && response.status <= 299) {
      var contentType = response.headers.get('content-type');
      switch (contentType) {
        case "application/json":
          resolve(response.json());
          break;
        default:
          resolve(response.text());
          break;
      }
    } else {    
      reject("Response is not ok");
    }
  });
}