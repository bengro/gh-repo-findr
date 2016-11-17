export default class GithubService {

  constructor(token) {
    this.token = token;
  }

  fetchRepositories() {
    console.log('fetching repositories')

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
      xhr.setRequestHeader('Authorization', 'this.token ' + this.token);
      xhr.send(null);
    });
  }

}
