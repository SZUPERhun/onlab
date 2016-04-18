import { expect } from 'chai';
import request from 'supertest-as-promised';
import chanceModule from 'chance';

import app from '../server';
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

  it('should list ALL users on /api/users GET', async function() {
    const res = await request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('array');
    expect(res.body[0]).to.have.property('_id');
    expect(res.body[0]).to.have.property('name', initUserName);
  });

  it('should add a SINGLE User on /api/users POST', async function() {
    const postUserName = chance.name();
    const res = await request(app)
      .post('/api/users')
      .send({ 'name': postUserName })
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('name', postUserName);
  });

  it('should list a SINGLE User on /api/users/<id> GET', async function() {
    const getUserName = chance.name();
    const testUser = new User({
      name: getUserName,
    });
    const data = await testUser.save();
    const res = await request(app)
      .get('/api/users/' + data.id)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('_id', data.id);
    expect(res.body).to.have.property('name', getUserName);
  });

  it('should update a SINGLE User on /api/users/<id> PUT', async function() {
    const putUserName = chance.name();
    const response = await request(app)
      .get('/api/users')
      .expect(200);
    expect(response.body[0]).to.have.property('_id');
    const res = await request(app)
      .put('/api/users/' + response.body[0]._id)
      .send({ 'name': putUserName })
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('name', putUserName);
    expect(res.body).to.have.property('_id');
  });

  it('should delete a SINGLE User on /api/users/<id> DELETE', async function() {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
    expect(response.body[0]).to.have.property('_id');
    const res = await request(app)
      .delete('/api/users/' + response.body[0]._id)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('name', initUserName);
  });

});