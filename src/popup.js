var popup = document.getElementById('popup');
var success = document.getElementById('success');
var setup = document.getElementById('setup');

document.addEventListener('DOMContentLoaded', function() {
  console.log('popup loaded')
});

// talk to content-script... when repositories are requested...
// https://developer.chrome.com/extensions/messaging#connect

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('clicked on extensions icon');
});