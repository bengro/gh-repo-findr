function fetchRepositories(token) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject();
      }
    };
    xhr.open('GET', 'https://api.github.com/user/repos?per_page=200', true);
    xhr.setRequestHeader('Authorization', 'token ' + token);
    xhr.send(null);
  });
}

var repositories = fetchRepositories('ad21488ee1d3dc134fa4fb5a57be583dd45c3fd7');
repositories.then(function (repositories) {
  console.log(repositories)
});
