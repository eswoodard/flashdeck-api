const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Integration tests for API', function() {

  before(function() {
    return runServer(true);
  });

  after(function() {
    return closeServer();
  });

  it('should 200 on GET requests', function() {
    chai.request(app)
      .get('/')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        expect(res.text).to.have.string('<!DOCTYPE html>');
      });
  });
});
