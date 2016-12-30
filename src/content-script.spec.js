var chai = require('chai');
chai.use(require('chai-dom'));

describe('content-script', ()=> {

  it('should create searchbox when key shortcut registered', () => {
    new ContentScript(document);
    expect(document.querySelector('#gh-repo-findr-box')).not.to.exist
  });

});