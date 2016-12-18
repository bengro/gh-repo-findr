# Github repository finder
a chrome extension, short gh-repo-findr.

## Installation
It is assumed, that Java is installed.

```
brew install yarn
yarn install
```

The Gulp binary will be installed `node_modules/.bin/`. To access gulp from the path:
```
PATH=$PATH:/path/to/gh-repo-findr/node_modules/.bin/
```

## Development
To bundle extension, run:
```
gulp bundle-extension
```

To run tests, run:
```
gulp test
```

## Distribution

To build the unpacked extension, run:
```
gulp dist
```

In order to create a signed chrome extension, you must provide a certificate.
Place the key in `tmp/extension_key.pem`.

## TODOs
* ✓ Use https://yarnpkg.com/
* ✓ Use Babel / ES6
* Build pipeline with gulp
* Implement content-script
