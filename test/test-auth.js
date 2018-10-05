// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { User } = require('../users/models');


// const expect = chai.expect;


// const { app, runServer, closeServer } = require('../server');
// const { TEST_DATABASE_URL, JWT_SECRET} = require('../config');

// chai.use(chaiHttp);

// describe('Integration tests for API', function() {

//   const username = 'exampleUser1';
//   const password = 'examplePass';
//   const firstName = 'Example';
//   const lastName = 'User';

//   before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   after(function () {
//     return closeServer();
//   });

//   beforeEach(function () {
//     return User.hashPassword(password).then(password =>
//       User.create({
//         username,
//         password,
//         firstName,
//         lastName
//       })
//     );
//   });

//   afterEach(function () {
//     return User.remove({});
//   });

//    describe('/flashdeck/signin', function () {
//     it('Should reject requests with no credentials', function () {
//       return chai
//         .request(app)
//         .post('/flashdeck/signin')
//         .then(() =>
//           expect.fail(null, null, 'Request should not succeed')
//         )
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(400);
//         });
//     });
//   });









//   // describe('GET endpoint', () => {
//   //   it('should 200 on GET requests', function() {
//   //     return chai.request(app)
//   //       .get('/')
//   //       .then(function(res) {
//   //         res.should.have.status(200);
//   //         res.should.be.json;
//   //       });
//   //   });
//   // })







//   // describe('flashdeck/dashboard', function () {
//   //   it("should list items on GET", function() {
//   //     return chai
//   //       .request(app)
//   //       .get("/dashboard")
//   //       .then(function(res) {
//   //         expect(res).to.have.status(200);
//   //         expect(res).to.be.json;
//   //         expect(res.body).to.be.a("array");
//   //         expect(res.body.length).to.be.above(0);
//   //         res.body.forEach(function(item) {
//   //           expect(item).to.be.a("object");
//   //           expect(item).to.have.all.keys(
//   //             "id",
//   //             "deckTitle",
//   //             "deckCards",
//   //           );
//   //         });
//   //       });
//   //   });
//   // })




// });
