'use strict';

var HttpStatus = require('http-status-codes');
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
            .expect(HttpStatus.CREATED)
            .expect(res => res.body.id.should.match(/\d+/));

        await request(app)
            .get('/places/0')
            .expect(HttpStatus.OK)
            .expect(res => {
                res.body.title.should.equal('Moscow');
                res.body.description.should.equal('description');
                res.body.visited.should.equal(false);
            });
    });

    it('PATCH', async () => {
        await request(app)
            .post('/places')
            .send({ title: 'Moscow', description: 'description' })
            .expect(HttpStatus.CREATED);

        await request(app)
            .patch('/places/0')
            .send({ description: 'new description' })
            .expect(HttpStatus.NO_CONTENT);

        await request(app)
            .get('/places/0')
            .expect(res => {
                res.body.description.should.equal('new description');
            });
    });


    it('GET query', async () => {
        await request(app)
            .post('/places')
            .send({ title: 'Moscow', description: 'first' })
            .expect(HttpStatus.CREATED);

        await request(app)
            .post('/places')
            .send({ title: 'Ekb', description: 'secOOOnd' })
            .expect(HttpStatus.CREATED);

        await request(app)
            .get('/places?contains=OOO')
            .expect(res => {
                res.body[0].description.should.equal('secOOOnd');
                res.body.length.should.equal(1);
            });
    });

    it('PATCH order', async () => {
        await request(app)
            .post('/places')
            .send({ title: 'Moscow', description: '0' })
            .expect(HttpStatus.CREATED);

        await request(app)
            .post('/places')
            .send({ title: 'Ekb', description: '1' })
            .expect(HttpStatus.CREATED);


        await request(app)
            .post('/places')
            .send({ title: 'Tagil', description: '2' })
            .expect(HttpStatus.CREATED);

        await request(app)
            .patch('/places/order')
            .send({
                oldIndex: 1,
                newIndex: 2
            })
            .expect(HttpStatus.NO_CONTENT);

        await request(app)
            .patch('/places/order')
            .send({
                oldIndex: 1,
                newIndex: 0
            })
            .expect(HttpStatus.NO_CONTENT);

        await request(app)
            .get('/places')
            .expect(res => {
                res.body[0].description.should.equal('2');
                res.body[1].description.should.equal('0');
                res.body[2].description.should.equal('1');
            });
    });
});
