var chai = require('chai');
chai.use(require('chai-dom'));

describe('content-script', ()=> {

  it('should not show search box when not triggered', () => {
    new ContentScript(document);
    expect(document.querySelector('#gh-repo-findr-box')).not.to.exist
  });

  it('should show search box when triggered', () => {
    new ContentScript(document);
    // keypress: SHIFT+ENTER

    expect(document.querySelector('#gh-repo-findr-box')).to.exist
  });

});