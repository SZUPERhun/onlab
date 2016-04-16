import { expect } from 'chai';
import request from 'supertest-as-promised';
import chanceModule from 'chance';

import app from '../app';
import User from '../models/user.js';

const chance = new chanceModule();

beforeEach(() => {
  User.collection.drop();
});

describe('Users', () => {
  const initUserName = chance.name();

  beforeEach(function(done) {
    const testUser = new User({
      name: initUserName,
    });
    testUser.save(function() {
      done();
    });
  });
  it('should list ALL users on /users GET', async function(done) {
    const res = await request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('array');
    expect(res.body[0]).to.have.property('_id');
    expect(res.body[0]).to.have.property('name', initUserName);
    done();
  });
  it('should add a SINGLE User on /users POST', async function(done) {
    const postUserName = chance.name();
    const res = await request(app)
      .post('/users')
      .send({ 'name': postUserName })
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('name', postUserName);
    done();
  });
  it('should list a SINGLE User on /users/<id> GET', async function() {
    const getUserName = chance.name();
    const testUser = new User({
      name: getUserName,
    });
    const data = await testUser.save();
    const res = await request(app)
      .get('/users/' + data.id)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('_id', data.id);
    expect(res.body).to.have.property('name', getUserName);
  });

  it('should update a SINGLE User on /users/<id> PUT', async function(done) {
    const putUserName = chance.name();
    const response = await request(app)
      .get('/users')
      .expect(200);
    expect(response.body[0]).to.have.property('_id');
    const res = await request(app)
      .put('/users/' + response.body[0]._id)
      .send({ 'name': putUserName })
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('name', putUserName);
    expect(res.body).to.have.property('_id');
    done();
  });
  it('should delete a SINGLE User on /users/<id> DELETE', async function(done) {
    const response = await request(app)
      .get('/users')
      .expect(200);
    expect(response.body[0]).to.have.property('_id');
    const res = await request(app)
      .delete('/users/' + response.body[0]._id)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('name', initUserName);
    done();
  });
});