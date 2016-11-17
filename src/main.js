import GithubService from './github_service'

let githubService = new GithubService('ad21488ee1d3dc134fa4fb5a57be583dd45c3fd7');

githubService
  .fetchRepositories()
  .then(function (repositories) {
    console.log(repositories)
  });
