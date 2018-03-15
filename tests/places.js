'use strict';

const request = require('supertest');
require('chai').should();

const app = require('../api/index');

describe('places API tests', () => {
    afterEach(async () => {
        await request(app).delete('/places');
    });

    it('POST and GET', async () => {
        await request(app)
            .post('/places')
            .send({ title: 'Moscow', description: 'description' })
            .expect(201)
            .expect(res => res.body.id.should.match(/\d+/));

        await request(app)
            .get('/places/0')
            .expect(200)
            .expect(res => {
                res.body.title.should.equal('Moscow');
                res.body.description.should.equal('description');
                res.body.visited.should.be.equal(false);
            });
    });

    it('PATCH', async () => {
        await request(app)
            .post('/places')
            .send({ title: 'Moscow', description: 'description' })
            .expect(201);

        await request(app)
            .patch('/places/0')
            .send({ description: 'new description' })
            .expect(204);

        await request(app)
            .get('/places/0')
            .expect(res => {
                res.body.description.should.equal('new description');
            });
    });
});
