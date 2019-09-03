const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig.js');

describe('Routes', () => {
  

  describe('GET /api/users', () => {
    beforeEach(async () => {
        // guarantees that the table is cleaned out before any of the tests run
        await db('users').truncate();
    });
    it('should return JSON', () => {
      return request(server)
        .get('/api/strains')
        .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFhYXZsYWRtb2ciLCJpYXQiOjE1NjcxNTYzMTgsImV4cCI6MTU2NzE4NTExOH0.I05VZP5dwah1rX1iCuOFj9aUguctXbH_3YDFGDHReZw")
        .then(response => {
          expect(response).toHaveProperty('type', 'application/json');
        })
    });
    it('should return 200 code', () => {
        return request(server)
          .get('/api/strains')
          .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFhYXZsYWRtb2ciLCJpYXQiOjE1NjcxNTYzMTgsImV4cCI6MTU2NzE4NTExOH0.I05VZP5dwah1rX1iCuOFj9aUguctXbH_3YDFGDHReZw")
          .then(response => {
            expect(response).toHaveProperty('status', 200);
          })
      });
  });

  describe('POST /api/users/register', () => {
    it('should return JSON', () => {
      return request(server)
        .post('/api/users/register')
        .send({ username: 'vladvog', password: 'abc123', email: "vladvog@gmail.com", name: "Vlad Vog" })
        .then(response => {
            expect(response).toHaveProperty('type', 'application/json');
        })
    });
    it('should send a status code code 200', () => {
        return request(server)
            .post('/api/users/register')
            .send({ username: 'vladvog', password: 'abc123', email: "vladvog@gmail.com", name: "Vlad Vog" })
            .then(response => {
                expect(response).toHaveProperty('status', 200);
            })
    });
    it('should return JSON', () => {
        return request(server)
          .post('/api/users/login')
          .send({ email: 'vladvog@gmail.com', password: 'abc123' })
          .then(response => {
              expect(response).toHaveProperty('type', 'application/json');
            // expect(response).toHaveProperty('status', 200);
          })
      });
      it('should send a status code code 200', () => {
        return request(server)
            .post('/api/users/login')
            .send({ email: 'vladvog@gmail.com', password: 'abc123' })
            .then(response => {
                expect(response).toHaveProperty('status', 200);
        })
    });
    });

  });

//   describe('POST /api/auth/login', () => {
//     it('should return JSON', () => {
//       return request(server)
//         .post('/api/auth/login')
//         .send({ username: 'cosmo', password: 'timmy' })
//         .then(response => {
//             expect(response).toHaveProperty('type', 'application/json');
//         })
//     });
//     it('should send a status code code 200', () => {
//         return request(server)
//           .post('/api/auth/login')
//           .send({ username: 'wanda', password: 'turner' })
//           .then(response => {
//             expect(response).toHaveProperty('status', 200);
//           })
//       });
//   });
// });