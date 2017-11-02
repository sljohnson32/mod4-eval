process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should(); // eslint-disable-line
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


chai.use(chaiHttp);

describe('Client Routes', () => {

  it('should return the homepage with text', (done) => {
    chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.include("Amazon-Bay")
      done();
    });
  });

    it('should return a 404 for a route that doesn not exist', (done) => {
      chai.request(server)
      .get('/pancakes')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
});

describe('API Routes', () => {

  before((done) => {
    database.migrate.latest()
      .then(() => {
        done();
      })
      .catch((error) => {
        console.log('Before error: ', error); // eslint-disable-line
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => {
        console.log('Before each error: ', error);// eslint-disable-line
      });
  });

  it('should return all the inventory!', (done) => {
    chai.request(server)
      .get('/api/v1/inventory')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(4);
        done();
      });
  });

  it('should be able to return the correct data for inventory', (done)=> {
    chai.request(server)
      .get('/api/v1/inventory')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('title');
        response.body[0].title.should.equal('An actual LIVE tiger');
        response.body[0].should.have.property('description');
        response.body[0].description.should.equal('Cheeseburgers are delicious.');
        response.body[0].should.have.property('image_url');
        response.body[0].image_url.should.equal('https://cdn.pixabay.com/photo/2016/04/20/23/47/tiger-1342385_1280.jpg');
        response.body[0].should.have.property('price');
        response.body[0].price.should.equal('9999.99');
        done();
      });
  });


  it('should return all previous orders!', (done) => {
    chai.request(server)
      .get('/api/v1/order_history')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(3);
        done();
      });
  });

  it('should be able to return the correct data for order history', (done)=> {
    chai.request(server)
      .get('/api/v1/order_history')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('cost');
        response.body[0].cost.should.equal('9999.99');
        response.body[0].should.have.property('created_at');
        done();
      });
  });

  //post
  describe('POST to Order History', () => {
    let orderBody = { id: 6, cost: '1234.50' };

    it('should be able to to order history', (done) => {
      chai.request(server)
        .post('/api/v1/order_history')
        .send(orderBody)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.have.property('created_at');
          done();
        });
    });

    it('should send a 422 status if the body is not included', (done) => {
      chai.request(server)
        .post('/api/v1/order_history')
        .send({})
        .end((error, response) => {
          response.should.have.status(422);
          response.body.error.should.equal('Expected format: { cost: <Decimal> }. You did not include the cost as a property in your request.');
          done();
        });
    });
  });
});
